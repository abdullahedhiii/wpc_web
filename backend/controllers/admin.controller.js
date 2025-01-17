const {User,Organisation} = require('../config/sequelize');


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
  
      const logoPath = req.file ? `/uploads/${req.file.filename}` : null;
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
  