const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const csv = require("csv-parser");
const { Sponsor, Sequelize } = require("../config/sequelize");
const Op = Sequelize.Op;

const BASE_URL = "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers";
const DOWNLOAD_DIR = "./downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const processCSV = async (csvFilePath) => {
  try {
    // Get all existing sponsors from the database
    const existingSponsors = await Sponsor.findAll();
    
    // Create a map for quick lookup by organization name
    const existingMap = new Map(existingSponsors.map(s => [s.organisationName, s]));
    
    // To store all CSV entries grouped by organisationName
    const sponsorRecords = new Map();
    
    // To track which organizations are in the current CSV
    const currentSponsors = new Set();

    // Step 1: Read CSV and group by organisationName
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          const orgName = row["Organisation Name"];
          if (!orgName) return; // Skip rows without organization name
          
          const typeAndRating = row["Type & Rating"] || "";
          const route = row["Route"] || "";
          const licenseEntry = `${typeAndRating} - ${route}`; // Concatenating values

          if (!sponsorRecords.has(orgName)) {
            sponsorRecords.set(orgName, {
              organisationName: orgName,
              townCity: row["Town/City"] || "",
              county: row["County"] || "",
              licenseTier: new Set(), // Using Set to avoid duplicates
            });
          }
          
          // Add this license entry to the set
          sponsorRecords.get(orgName).licenseTier.add(licenseEntry);
          
          // Mark this organization as present in current CSV
          currentSponsors.add(orgName);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`Found ${sponsorRecords.size} unique organizations in CSV`);

    // Prepare arrays for bulk operations
    const newSponsors = [];
    const sponsorsToUpdate = [];
    const reactivatedSponsors = [];
    
    // Step 2: Process each sponsor from the CSV
    for (const [orgName, sponsorData] of sponsorRecords.entries()) {
      // Convert Set of license tiers to string
      sponsorData.licenseTier = Array.from(sponsorData.licenseTier)
        .filter(entry => entry && entry.trim() !== "")
        .join("; ");

      if (existingMap.has(orgName)) {
        // Organization exists in database
        const existingSponsor = existingMap.get(orgName);
        
        if (existingSponsor.status === "removed") {
          // If it was previously removed, mark as new again
          reactivatedSponsors.push({
            id: existingSponsor.id,
            organisationName: orgName,
            townCity: sponsorData.townCity,
            county: sponsorData.county,
            licenseTier: sponsorData.licenseTier,
            status: "active",
            newSponsor: true
          });
        } else if (existingSponsor.licenseTier !== sponsorData.licenseTier) {
          // If license tier changed, mark as updated
          sponsorsToUpdate.push({
            id: existingSponsor.id,
            organisationName: orgName,
            townCity: sponsorData.townCity,
            county: sponsorData.county,
            licenseTier: sponsorData.licenseTier,
            status: "updated",
            newSponsor: false
          });
        } else if (existingSponsor.status !== "active") {
          // No changes in license tier, but ensure status is active if it wasn't
          sponsorsToUpdate.push({
            id: existingSponsor.id,
            status: "active",
            newSponsor: false
          });
        }
      } else {
        // New organization, not in database
        newSponsors.push({
          organisationName: orgName,
          townCity: sponsorData.townCity,
          county: sponsorData.county,
          licenseTier: sponsorData.licenseTier,
          status: "active",
          newSponsor: true
        });
      }
    }

    // Step 3: Identify sponsors to mark as removed
    const sponsorsToRemove = existingSponsors
      .filter(sponsor => 
        !currentSponsors.has(sponsor.organisationName) && 
        sponsor.status !== "removed"
      )
      .map(sponsor => sponsor.id);

    // Execute bulk operations within a transaction
    const transaction = await Sponsor.sequelize.transaction();
    
    try {
      // Bulk create new sponsors
      if (newSponsors.length > 0) {
        console.log(`Creating ${newSponsors.length} new sponsors`);
        await Sponsor.bulkCreate(newSponsors, { transaction });
      }
      
      // Bulk update sponsors with changed license tiers
      if (sponsorsToUpdate.length > 0) {
        console.log(`Updating ${sponsorsToUpdate.length} existing sponsors`);
        await Promise.all(
          sponsorsToUpdate.map(sponsor => 
            Sponsor.update(
              {
                townCity: sponsor.townCity,
                county: sponsor.county,
                licenseTier: sponsor.licenseTier,
                status: sponsor.status,
                newSponsor: sponsor.newSponsor
              },
              { 
                where: { id: sponsor.id },
                transaction
              }
            )
          )
        );
      }
      
      // Bulk update reactivated sponsors
      if (reactivatedSponsors.length > 0) {
        console.log(`Reactivating ${reactivatedSponsors.length} previously removed sponsors`);
        await Promise.all(
          reactivatedSponsors.map(sponsor => 
            Sponsor.update(
              {
                townCity: sponsor.townCity,
                county: sponsor.county,
                licenseTier: sponsor.licenseTier,
                status: sponsor.status,
                newSponsor: sponsor.newSponsor
              },
              { 
                where: { id: sponsor.id },
                transaction
              }
            )
          )
        );
      }
      
      // Bulk update sponsors to mark as removed
      if (sponsorsToRemove.length > 0) {
        console.log(`Marking ${sponsorsToRemove.length} sponsors as removed`);
        await Sponsor.update(
          { status: "removed", newSponsor: false },
          { 
            where: { id: { [Op.in]: sponsorsToRemove } },
            transaction
          }
        );
      }
      
      // Commit the transaction
      await transaction.commit();
      console.log("CSV processing completed successfully.");
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      console.error("Transaction failed:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error processing CSV:", error);
    throw error;
  }
};
  
const getCSVUrl = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const $ = cheerio.load(response.data);

    const csvLink = $("a:contains('Register of Worker and Temporary Worker licensed sponsors')")
      .attr("href");

    if (!csvLink) {
      throw new Error("CSV link not found!");
    }

    return csvLink.startsWith("http") ? csvLink : `https://www.gov.uk${csvLink}`;
  } catch (error) {
    console.error("Error fetching CSV URL:", error);
    return null;
  }
};

const downloadCSV = async () => {
  try {
    console.log("Fetching CSV URL...");
    const csvUrl = await getCSVUrl();
    if (!csvUrl) {
      console.error("Failed to get CSV URL");
      return;
    }

    console.log(`Downloading CSV from: ${csvUrl}`);
    const response = await axios.get(csvUrl, { responseType: "stream" });

    const fileName = path.basename(csvUrl);
    const filePath = path.join(DOWNLOAD_DIR, fileName);

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", async () => { 
        console.log(`CSV downloaded: ${filePath}`);
        try {
          await processCSV(filePath);
          resolve(filePath);
        } catch (err) {
          reject(err);
        }
      });
      writer.on("error", (err) => {
        console.error("Error writing file:", err);
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error downloading CSV:", error);
    throw error;
  }
};

// Function to run the entire process
const runSponsorUpdate = async () => {
  try {
    console.log("Starting sponsor update process...");
    await downloadCSV();
    console.log("Sponsor update process completed successfully");
  } catch (error) {
    console.error("Sponsor update process failed:", error);
  }
};

// Run immediately on startup
runSponsorUpdate();

// Schedule to run at midnight every day
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled sponsor update...");
  runSponsorUpdate();
});

module.exports = { runSponsorUpdate };