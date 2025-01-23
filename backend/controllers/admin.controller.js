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
        "id" : org.id,
        "Sl. No.": index + 1, 
        "Organisation Name": org.Name,
        "Organisation Address": "empty to be done", 
        "Website": org.Website,
        "Email ID": org.OrganisationEmail,
        "Phone No.": org.Contact,
        "Action" : "Edit"
      }));
  
      return res.status(200).json(responseData);
    } catch (error) {
      console.error("Error fetching organisations:", error.message);
      return res.status(500).json({
        error: "An error occurred while fetching the organisations",
        details: error.message,
      });
    }
  };
  

  module.exports.getFormDetails = async (req, res) => {
    try {
      const { id } = req.query;
  
      const companyDetails = await Organisation.findOne({where : {id}});
  
      if (!companyDetails) {
        return res.status(404).json({ message: 'Company not found' });
      }
      console.log(companyDetails);
      return res.status(200).json(companyDetails);
    } catch (err) {
      console.error("Error fetching company details:", err);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports.updateCompany = async (req, res) => {
    try {
      const { company_id } = req.params;
      const { Name, Type, RegNo, Contact, Email, OrganisationEmail, Website, Landline, TradingName, Period, Sector, NameChanged, Penalty, Logo } = req.body;
  
      const updatedLogoPath = req.file ? `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` : Logo;
  
      const company = await Organisation.findByPk(company_id);
  
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
  
      const updatedCompany = await company.update({
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
        Logo: updatedLogoPath,  
      });
  
      return res.status(200).json({
        message: "Company updated successfully",
        company: updatedCompany,
      });
    } catch (error) {
      console.error("Error updating company:", error.message);
      return res.status(500).json({
        error: "An error occurred while updating the company",
        details: error.message,
      });
    }
  };