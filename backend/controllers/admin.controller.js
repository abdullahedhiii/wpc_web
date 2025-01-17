const {User,Organisation} = require('../config/sequelize');
require('dotenv').config();

module.exports.submitCompanyForm = async (req, res) => {
    try {
      console.log("Organisation form endpoint hit", req.body);
  
      const {
        admin_id,
        Name,
        Type,
        RegNo,
        Contact,
        Email,
        OrganisationEmail,
        Website,
        Landline,
        TradingName,
        Period,
        Sector,
        NameChanged,
        Penalty,
      } = req.body;
  
      const logoPath = req.file ? `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` : null;
      console.log(logoPath);
      const newOrganisation = await Organisation.create({
        Name,
        Type,
        RegNo,
        Contact,
        Email,
        OrganisationEmail,
        Website,
        Landline,
        TradingName,
        Period,
        Sector,
        NameChanged,
        Penalty,
        admin_id,
        Logo: logoPath, 
      });
  
      return res.status(201).json({
        message: "Organisation registered successfully",
        organisation: newOrganisation,
      });
    } catch (error) {
      console.error("Error registering organisation:", error.message);
  
      return res.status(500).json({
        error: "An error occurred while registering the organisation",
        details: error.message,
      });
    }
  };

  module.exports.getOrganisations = async (req, res) => {
    try {
      const { admin_id } = req.query; 
      const organisations = await Organisation.findAll({
        where: { admin_id },
        attributes: [
          'id',
          'Name', 
          'Address',
          'Website',
          'OrganisationEmail',
          'Contact', 
        ],
      });
  
      if (organisations.length === 0) {
        return res.status(200).json({
          message: "No organisations found",
          data: [], 
        });
      }
  
      const responseData = organisations.map((org, index) => ({
         id,
        "Sl. No.": index + 1, 
        "Organisation Name": org.Name,
        "Organisation Address": org.Address || "empty to be done", 
        "Website": org.Website,
        "Email ID": org.OrganisationEmail,
        "Phone No.": org.Contact,
      }));
  
      return res.status(200).json({
        message: "Organisations fetched successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("Error fetching organisations:", error.message);
      return res.status(500).json({
        error: "An error occurred while fetching the organisations",
        details: error.message,
      });
    }
  };
  