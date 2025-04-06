const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const csv = require("csv-parser");
const { Sponsor } = require("../config/sequelize");
const { Op, BOOLEAN } = require("sequelize"); 
const { Sequelize } = require("sequelize");

const BASE_URL = "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers";
const DOWNLOAD_DIR = "./downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const processCSV = async (csvFilePath) => {
  try {
    const existingSponsors = await Sponsor.findAll();
    const existingMap = new Map(existingSponsors.map(s => [s.organisationName, s]));
    
    const sponsorRecords = new Map(); 
    const currentSponsors = new Set();

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          const orgName = row["Organisation Name"];
          if (!orgName) return; 
          
          const typeAndRating = row["Type & Rating"] || "";
          const route = row["Route"] || "";
          const licenseEntry = `${typeAndRating} - ${route}`; 

          if (!sponsorRecords.has(orgName)) {
            sponsorRecords.set(orgName, {
              organisationName: orgName,
              townCity: row["Town/City"] || "",
              county: row["County"] || "",
              licenseTier: new Set(), 
            });
          }
          
          sponsorRecords.get(orgName).licenseTier.add(licenseEntry);
          
          currentSponsors.add(orgName);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(`Found ${sponsorRecords.size} unique organizations in CSV`);

    const newSponsors = [];
    const sponsorsToUpdate = [];
    const reactivatedSponsors = [];
    
    for (const [orgName, sponsorData] of sponsorRecords.entries()) {
      sponsorData.licenseTier = Array.from(sponsorData.licenseTier)
        .filter(entry => entry && entry.trim() !== "")
        .join("; ");

      if (existingMap.has(orgName)) {
        const existingSponsor = existingMap.get(orgName);
        
        if (existingSponsor.status === "removed") {
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
          sponsorsToUpdate.push({
            id: existingSponsor.id,
            status: "active",
            newSponsor: false
          });
        }
      } else {
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

    const sponsorsToRemove = existingSponsors
      .filter(sponsor => 
        !currentSponsors.has(sponsor.organisationName) && 
        sponsor.status !== "removed"
      )
      .map(sponsor => sponsor.id);

    const transaction = await Sponsor.sequelize.transaction();
    
    try {
      if (newSponsors.length > 0) {
        console.log(`Creating ${newSponsors.length} new sponsors`);
        await Sponsor.bulkCreate(newSponsors, { transaction });
      }
      
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
      
      await transaction.commit();
      console.log("CSV processing completed successfully.");
    } catch (error) {
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

const runSponsorUpdate = async () => {
  try {
    console.log("Starting sponsor update process...");
    await downloadCSV();
    console.log("Sponsor update process completed successfully");
  } catch (error) {
    console.error("Sponsor update process failed:", error);
  }
};

if (require.main === module) {
  runSponsorUpdate();
  cron.schedule("0 0 * * *", () => {
    console.log("Running scheduled sponsor update...");
    runSponsorUpdate();
  });
}

module.exports = { runSponsorUpdate };