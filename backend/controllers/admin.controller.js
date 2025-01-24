const {User,Organisation,TradingHour} = require('../config/sequelize');
require('dotenv').config();

module.exports.submitCompanyForm = async (req, res) => {
  try {
    console.log(req.body);
    const {
      Company_admin_id,
      Company_name,
      Company_Type,
      Company_RegNo,
      Company_Contact,
      Company_Email,
      Company_OrganisationEmail,
      Company_Website,
      Company_Landline,
      Company_TradingName,
      Company_Period,
      Company_Sector,
      Company_NameChanged,
      Company_Penalty,
      Company_Logo,

      Authorizing_fname,
      Authorizing_lname,
      Authorizing_designation,
      Authorizing_email,
      Authorizing_phone,
      Authorizing_proof_id,
      Authorizing_history,

      KeyContact_check,
      KeyContact_fname,
      KeyContact_lname,
      KeyContact_designation,
      KeyContact_email,
      KeyContact_phone,
      KeyContact_proof_id,
      KeyContact_history,
      Level1_check,
      Level1_fname,
      Level1_lname,
      Level1_designation,
      Level1_email,
      Level1_phone,
      Level1_proof_id,
      Level1_history,

      Address_Postcode,
      Address_Select,
      Address_Line1,
      Address_Line2,
      Address_Line3,
      Address_City_County,
      Address_Country,
      RTI_fname,
      RTI_department,
      RTI_job_type,
      RTI_job_title,
      RTI_Immigration_status,
    } = req.body;

    // Parse and map trading hours
    const tradingHours = req.body.tradingHours.map((item) => JSON.parse(item));
    const companyLogo = req.files['Company_Logo'] ? req.files['Company_Logo'][0].filename : null;
    const authorizingProofId = req.files['Authorizing_proof_id'] ? req.files['Authorizing_proof_id'][0].filename : null;
    const keyContactProofId = req.files['KeyContact_proof_id'] ? req.files['KeyContact_proof_id'][0].filename : null;
    const level1ProofId = req.files['Level1_proof_id'] ? req.files['Level1_proof_id'][0].filename : null;

    const companyLogoPath = companyLogo ? `http://localhost:${process.env.PORT}/uploads/${companyLogo}` : null;
    const authorizingProofIdPath = authorizingProofId
      ? `http://localhost:${process.env.PORT}/uploads/${authorizingProofId}`
      : null;
    const keyContactProofIdPath = keyContactProofId
      ? `http://localhost:${process.env.PORT}/uploads/${keyContactProofId}`
      : null;
    const level1ProofIdPath = level1ProofId
      ? `http://localhost:${process.env.PORT}/uploads/${level1ProofId}`
      : null;

    // Create Organisation
    const organisation = await Organisation.create({
      admin_id: Company_admin_id,
      Company_name,
      Company_Type,
      Company_RegNo,
      Company_Contact,
      Company_Email,
      Company_OrganisationEmail,
      Company_Website,
      Company_Landline,
      Company_TradingName,
      Company_Period,
      Company_Sector,
      Company_NameChanged,
      Company_Penalty,
      Company_Logo : companyLogoPath,

      Authorizing_fname,
      Authorizing_lname,
      Authorizing_designation,
      Authorizing_email,
      Authorizing_phone,
      Authorizing_proof_id: authorizingProofIdPath,
      Authorizing_history,

      KeyContact_check,
      KeyContact_fname,
      KeyContact_lname,
      KeyContact_designation,
      KeyContact_email,
      KeyContact_phone,
      KeyContact_proof_id : keyContactProofIdPath,
      KeyContact_history,

      Level1_check,
      Level1_fname,
      Level1_lname,
      Level1_designation,
      Level1_email,
      Level1_phone,
      Level1_proof_id : level1ProofIdPath,
      Level1_history,

      Address_Postcode,
      Address_Select,
      Address_Line1,
      Address_Line2,
      Address_Line3,
      Address_City_County,
      Address_Country,
      RTI_fname,
      RTI_department,
      RTI_job_type,
      RTI_job_title,
      RTI_Immigration_status,
    });

    // Insert TradingHours using Organisation's ID
    const tradingHoursData = tradingHours.map((tradingHour) => ({
      day: tradingHour.day,
      status: tradingHour.status,
      openingTime: tradingHour.openingTime,
      closingTime: tradingHour.closingTime,
      organisation_id: organisation.id, // Use the ID from the created organisation
    }));

    await TradingHour.bulkCreate(tradingHoursData);

    // Respond with success
    res.status(201).json({
      message: 'Organisation and Trading Hours created successfully.',
      organisation,
      tradingHours: tradingHoursData,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({
      message: 'Failed to create Organisation or Trading Hours.',
      error: error.message,
    });
  }
};

 
  // try {
    //   console.log("Organisation form endpoint hit", req.body);
  
    //   const {
    //     admin_id,
    //     Name,
    //     Type,
    //     RegNo,
    //     Contact,
    //     Email,
    //     OrganisationEmail,
    //     Website,
    //     Landline,
    //     TradingName,
    //     Period,
    //     Sector,
    //     NameChanged,
    //     Penalty,
    //   } = req.body;
  
    //   const logoPath = req.file ? `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` : null;
    //   console.log(logoPath);
    //   const newOrganisation = await Organisation.create({
    //     Name,
    //     Type,
    //     RegNo,
    //     Contact,
    //     Email,
    //     OrganisationEmail,
    //     Website,
    //     Landline,
    //     TradingName,
    //     Period,
    //     Sector,
    //     NameChanged,
    //     Penalty,
    //     admin_id,
    //     Logo: logoPath, 
    //   });
  
    //   return res.status(201).json({
    //     message: "Organisation registered successfully",
    //     organisation: newOrganisation,
    //   });
    // } catch (error) {
    //   console.error("Error registering organisation:", error.message);
  
    //   return res.status(500).json({
    //     error: "An error occurred while registering the organisation",
    //     details: error.message,
    //   });
    // }


  module.exports.getOrganisations = async (req, res) => {
    try {
      const { admin_id } = req.query; 
      console.log(admin_id);
      const organisation = await Organisation.findOne({
        where: { admin_id },
        attributes: [
          'id',
          'Company_name', 
          'Company_Website',
          'Company_OrganisationEmail',
          'Company_Contact', 
          'Address_Line1',
          'Address_Line2',
          'Address_Line3',
          'Address_Postcode',
          'Address_City_County',
          'Address_Country',
        ],
      });
      console.log(organisation,'query result');
      if (!organisation) {
        return res.status(200).json({
          message: "No organisations found",
          data: [], 
        });
      }
  
      const responseData ={
        "id" : organisation.id,
        "Sl. No.": 1, 
        "Organisation Name": organisation.Company_name,
        "Organisation Address": organisation.Address_Line1 + ',' + organisation.Address_Line2 + ',' + organisation.Address_Line3 + ',' + organisation.Address_City_County + ',' + organisation.Address_Postcode + ',' + organisation.Address_Country , 
        "Website": organisation.Company_Website,
        "Email ID": organisation.Company_OrganisationEmail,
        "Phone No.": organisation.Company_Contact,
        "Action" : "Edit"
      };
      console.log('responding with' ,responseData);
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