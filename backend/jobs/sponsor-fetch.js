const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const csv = require("csv-parser");
const { Sponsor } = require("../config/sequelize");

const BASE_URL = "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers";
const DOWNLOAD_DIR = "./downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const processCSV = async (csvFilePath) => {
    try {
      const existingSponsors = await Sponsor.findAll();
      const existingMap = new Map(existingSponsors.map(s => [s.organisationName, s]));
  
      const newSponsors = new Set();  // Track new CSV sponsor names
      const updates = [];
  
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          const orgName = row["Organisation Name"];
          const typeAndRating = row["Type & Rating"];
          const route = row["Route"];
  
          newSponsors.add(orgName);
  
          const sponsorData = {
            organisationName: orgName,
            townCity: row["Town/City"],
            county: row["County"],
            typeAndRating,
            route,
            status: "active",
            newSponsor: false, // Default false unless actually new
          };
  
          if (existingMap.has(orgName)) {
            const existingSponsor = existingMap.get(orgName);
  
            // Only update if typeAndRating or route changed
            if (existingSponsor.typeAndRating !== typeAndRating || existingSponsor.route !== route) {
              sponsorData.status = "updated";
              updates.push(Sponsor.update(sponsorData, { where: { organisationName: orgName } }));
            }
          } else {
            // New sponsor, mark as new
            sponsorData.newSponsor = true;
            updates.push(Sponsor.create(sponsorData));
          }
        })
        .on("end", async () => {
          await Promise.all(updates);
  
          // Mark missing sponsors as "removed"
          await Sponsor.update({ status: "removed", newSponsor: false }, {
            where: {
              organisationName: {
                [sequelize.Sequelize.Op.notIn]: Array.from(newSponsors),
              },
            },
          });
  
          console.log("CSV processing completed.");
        });
    } catch (error) {
      console.error("Error processing CSV:", error);
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
    const csvUrl = await getCSVUrl();
    if (!csvUrl) return;

    const response = await axios.get(csvUrl, { responseType: "stream" });

    const fileName = path.basename(csvUrl);
    const filePath = path.join(DOWNLOAD_DIR, fileName);

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish",async () =>{ 
        console.log(`CSV downloaded: ${filePath}`)
        await processCSV(filePath); // Call CSV processing

    });
    writer.on("error", (err) => console.error("Error writing file:", err));
  } catch (error) {
    console.error("Error downloading CSV:", error);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled CSV fetch...");
  downloadCSV();
});

module.exports = {
  downloadCSV,
};
