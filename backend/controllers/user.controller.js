const {sequelize,User,Admin,Module,SubModule,Feature,Dashboard, Organisation, Employee, PersonalDetail, ServiceDetail, ContactInfo, UserRole, Sponsor} = require('../config/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 
const {Sequelize} = require('sequelize');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const Op = require('sequelize').Op;

module.exports.Register = async (req, res) => {
 

    const { companyName,firstName, lastName, email, contactNumber,password } = req.body;
    let transaction;  // Declare transaction outside try block
    try {
      
      transaction = await sequelize.transaction();
    
      const existingUser = await Admin.findOne({ 
        where: { email, phone_number: contactNumber }, 
        attributes: { exclude: ['password'] } 
      });
    
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    
      const newUser = await Admin.create(
        {
          company_name: companyName,
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: contactNumber,
          password,
        },
        { transaction }
      );
    
      await Organisation.create(
        {
          Company_name: companyName,
          admin_id: newUser.id,
        },
        { transaction }
      );
    
      await transaction.commit();
      return res.status(201).json({ message: 'User registered successfully.' });
    
    }  catch (error) {
      
     if (error instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ 
        message: "The entered email or phone number has been registered already" 
      });
    }
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
};

module.exports.Login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    let existingUser ,isAdmin;
    existingUser = await Admin.findOne({ where: { email }, raw: true });
    if (existingUser) isAdmin = true;
    else{
      existingUser = await User.findOne({ where: { email }, raw: true });
      if(existingUser) isAdmin = false;
    }
    
    if(!existingUser){
      
      return res.status(400).json({ error: 'Email not found, try again' });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      
      return res.status(400).json({ error: 'Incorrect password, try again' });
    }

    const { password: _, ...userDetails } = existingUser;
    let org,employee;
    if(isAdmin) org = await Organisation.findOne({where : {admin_id : userDetails.id}})
    else{
       employee = await Employee.findOne({where : {employee_code : existingUser.employee_code},
            include : [
              {
                 model : Organisation,
                 as : 'organisation',
                 attributes : ['Company_name',"id"]
              },
              {
                model : PersonalDetail,
                as : 'personaldetail',
                attributes : ['fname','mname','lname','contact_1']
              },
              {
                model : ServiceDetail,
                as : 'servicedetail',
                attributes : ['profile_pic','type']
              },

            ]
      })
    }
    const token = jwt.sign(
      { id: userDetails.id, email: userDetails.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
    
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    
    const response  = isAdmin ? {...userDetails, profile_image : org?.Company_Logo || null,isAdmin} :
    {
           company_name : employee.organisation.Company_name,
           company_id : employee.organisation.id,
           email : userDetails.email,
           phone_number : employee.personaldetail.contact_1,
           first_name : [employee.personaldetail.fname,employee.personaldetail.mname].filter(Boolean).join(' '),
           id : userDetails.id,
           last_name : employee.personaldetail.lname || '',
           profile_image : employee.servicedetail.profile_pic || null,
           isAdmin,
           employee_code : employee.employee_code,
           type : employee.servicedetail.type,
    };
    return res.status(200).json({
      user: response, 
    });
  } catch (error) {
    
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,  
      sameSite: "None",  
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    
    return res.status(500).json({ error: "An error occurred while logging out" });
  }
};

module.exports.getSponsors = async (req, res) => {
  
  try {
    const sponsors = await Sponsor.findAll();

    let newCount = 0;
    let updatedCount = 0;

    const formattedData = sponsors.map((sponsor) => {
      if (sponsor.newSponsor) newCount++; // Count new sponsors
      if (sponsor.status === 'updated') updatedCount++; // Count updated sponsors

      return {
        id: sponsor.id,
        company: sponsor.organisationName,
        location: [sponsor.townCity, sponsor.country].filter(Boolean).join(' '),
        licenseTier: sponsor.licenseTier,
        status: sponsor.status,
      };
    });

    return res.status(200).json({
      sponsors: formattedData,
      newCount,
      updatedCount
    });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while fetching sponsors", err });
  }
};


module.exports.getModules = async (req, res) => {
  
  const { isAdmin } = req.query;
  const userId = req.params.id;

  try {
    const modules = await Module.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Dashboard,
          as: "dashboard",
          attributes: [
            "id",
            "name",
            "completed",
            "color",
            "icon",
            "count",
            "percentage",
            "view_route",
          ],
          separate: true,
          order: [["id", "ASC"]],
        },
        {
          model: SubModule,
          as: "subModules",
          include: [
            {
              model: Feature,
              as: "features",
              attributes: [
                "id",
                "name",
                "next_route",
                "plus_icon_route",
                "action_route",
                "download_api_route",
                "icon",
              ],
              separate: true,
              order: [["id", "ASC"]],
            },
          ],
          attributes: ["id", "name", "main_route", "icon","download_api_route"],
          separate: true,
          order: [["id", "ASC"]],
        },
      ],
    });

    if (isAdmin === 'true') {
      
      
      return res.status(200).json(
        modules.filter((m) => ![16].includes(m.id)).map((module) => ({
          id: module.id,
          name: module.name,
          icon_image: module.icon_image,
          next_route: module.next_route,
          button_title: module.button_title,
          dashboard: module.dashboard.map((d) => ({
            name: d.name,
            completed: d.completed,
            color: d.color,
            icon: d.icon || "",
            count: d.count || -1,
            percentage: d.percentage || -1,
            view_route: d.view_route,
            id: d.id,
          })),
          subModules: module.subModules.map((subModule) => ({
            id: subModule.id,
            name: subModule.name,
            main_route: subModule.main_route,
            icon: subModule.icon,
            download_api_route: subModule.download_api_route,
            features: subModule.features
              .filter((feature) => ![56, 58, 59, 60,55,26].includes(feature.id)) 
              .map((feature) => ({
                name: feature.name,
                next_route: feature.next_route,
                icon: feature.icon || "",
                plus_icon_route: feature.plus_icon_route,
                action_route: feature.action_route,
                id: feature.id,
                download_api_route: feature.download_api_route,
              })),
          })),
        }))
      );
    }
    
    const userRoles = await UserRole.findAll({
      where: { user_id: userId },
      attributes: ["sub_module_id", "feature_id", "right"],
    });
    
    const userFeatureAccess = new Map();
    const userSubModuleAccess = new Set();
    
    userRoles.forEach(({ sub_module_id, feature_id, right }) => {
      const featureId = String(feature_id); 
    
      if (!userFeatureAccess.has(featureId)) {
        userFeatureAccess.set(featureId, { can_add: false, can_edit: false });
      }
    
      if (right === "add") userFeatureAccess.get(featureId).can_add = true;
      if (right === "edit") userFeatureAccess.get(featureId).can_edit = true;
    
      userSubModuleAccess.add(sub_module_id);
    });
    
    const formattedModules = modules.map((module) => {
      let moduleHasAccess = false;
    
      const subModules = module.subModules
        .map((subModule) => {
          let subModuleHasAccess = userSubModuleAccess.has(subModule.id);
    
          const features = subModule.features
            .map((feature) => {
              const featureId = String(feature.id);
              let featureAccess = userFeatureAccess.get(featureId) || { can_add: false, can_edit: false };
              let can_access = !!userFeatureAccess.has(featureId);
    
              if (module.name === "Employee Corner") {
                moduleHasAccess = true;
                subModuleHasAccess = true;
                can_access = true;
                featureAccess = { ...featureAccess, can_add: true };
              }
    
              return { ...feature.get(), ...featureAccess, can_access };
            })
            .filter((feature) => feature.can_access); 
    
          if (features.length > 0) {
            subModuleHasAccess = true;
          }
    
          if (subModuleHasAccess) moduleHasAccess = true;
    
          return subModuleHasAccess ? { ...subModule.get(), features, can_access: true } : null;
        })
        .filter(Boolean); 
    
      return moduleHasAccess ? { ...module.get(), subModules, can_access: true } : null;
    }).filter(Boolean); 
    
    
    return res.status(200).json(formattedModules);
    
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
};

module.exports.retrieveCookie = async (req, res) => {
  const token = req.cookies.access_token; 
  try {
    if (!token) {
      return res.status(200).json({ found:false,message: 'No cookie found to retrieve -new session' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err || !decoded.id) {
        return res.status(200).json({found:false, message: 'Token expired or invalid - new session' }); 
      }

      try {
        let existingUser ,isAdmin;
        existingUser = await Admin.findOne({ where: { email : decoded.email }, raw: true });
        if (existingUser) isAdmin = true;
        else{
          existingUser = await User.findOne({ where: {email: decoded.email }, raw: true });
          if(existingUser) isAdmin = false;
        }
        const { password: _, ...userDetails } = existingUser;

        let org,employee;
        if(isAdmin) org = await Organisation.findOne({where : {admin_id : userDetails.id}})
        else{
           employee = await Employee.findOne({where : {employee_code : existingUser.employee_code},
                include : [
                  {
                     model : Organisation,
                     as : 'organisation',
                     attributes : ['Company_name',"id"]
                  },
                  {
                    model : PersonalDetail,
                    as : 'personaldetail',
                    attributes : ['fname','mname','lname','contact_1']
                  },
                  {
                    model : ServiceDetail,
                    as : 'servicedetail',
                    attributes : ['profile_pic','type']
                  },
    
                ]
          })
        }
        const response  = isAdmin ? {...userDetails, profile_image : org?.Company_Logo || null,isAdmin} :
        {
               company_name : employee.organisation.Company_name,
               company_id : employee.organisation.id,
               email : userDetails.email,
               phone_number : employee.personaldetail.contact_1,
               first_name : [employee.personaldetail.fname,employee.personaldetail.mname].filter(Boolean).join(' '),
               id : userDetails.id,
               last_name : employee.personaldetail.lname || '',
               profile_image : employee.servicedetail.profile_pic || null,
               isAdmin,
               employee_code : employee.employee_code,
               type : employee.servicedetail.type,
        };
        return res.status(200).json({found:true,user : response});
      } catch (err) {
        
        return res.status(500).json({ message: 'Internal server error' }); 
      }
    });
  } catch (err) {
    
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};

module.exports.getUserOrganisation = async(req,res) => {
    try{
        const user = await User.findOne({where : {id : req.params.id}});
        const org_id = user.organisation_id;
        const organisation = await Organisation.findOne(
          {
            where : {id : org_id},
          });
      
    const responseData = {
      id: organisation.id,
      "Sl. No.": 1,
      "Organisation Name": organisation.Company_name,
      "Organisation Address":
        organisation.Address_Line1 +
        "," +
        organisation.Address_Line2 +
        "," +
        organisation.Address_Line3 +
        "," +
        organisation.Address_City_County +
        "," +
        organisation.Address_Postcode +
        "," +
        organisation.Address_Country,
      Website: organisation.Company_Website,
      "Email ID": organisation.Company_OrganisationEmail,
      "Phone No.": organisation.Company_Contact,
      Action: "Edit",
      year_created: new Date(organisation.createdAt).getFullYear()

    };
    return res.status(200).json(responseData);
    }
    catch(err){
      
      return res.status(500).json({ message: 'Internal server error' }); 
    }
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

const BASE_URL = "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers";
const DOWNLOAD_DIR = "./downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

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


module.exports.fetchSponsorsFromFile = async(req,res) => {
  try{
    console.log("Starting sponsor update process...");
    await downloadCSV();
    console.log("Sponsor update process completed successfully");
    return res.status(200).json({ message: 'Sponsors updated successfully' });
  }
  catch(err){
    console.error("Error fetching sponsors from file:", err);
    return res.status(500).json({ message: 'Internal server error' }); 
  }
}

