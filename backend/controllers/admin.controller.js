const {User,Organisation,TradingHour,Department,Designation,EmploymentType} = require('../config/sequelize');
require('dotenv').config({ path: process.env.ENV_FILE || '.env' });

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
      console.log('here to find organisation ' ,admin_id);
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
  
      // Fetch company details
      const companyDetails = await Organisation.findOne({
        where: { id }
      });
  
      if (!companyDetails) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      const tradingHours = await TradingHour.findAll({
        where: { organisation_id: id } 
      });
  
      const response = {
        allData : companyDetails,
        tradingHours
      };
  
      return res.status(200).json(response);
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

  module.exports.addDepartment = async (req, res) => {
    const id = req.params.id;
    console.log('Add/Update department hit', id, req.body);

    const { department_name, isUpdate, department_id } = req.body;

    try {
        if (isUpdate) {
          const department = await Department.findOne({
            where: {
                id: department_id,
            }
        });
            if (department) {
              console.log('updating department ',department);
                department.department_name = department_name;
                await department.save();
                console.log('department updatedd');
                return res.status(201).json({
                    message: 'Department updated successfully',
                    department,
                });
            } else {
                return res.status(404).json({ message: 'Department not found' });
            }
        } else {
            const newDepartment = await Department.create({
                department_name,
                organisation_id: id,
            });

            return res.status(201).json({
                message: 'Department created successfully',
                department: newDepartment,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.getDepartments = async (req, res) => {
  console.log(req.params.id, 'hit departments get');
  
  try {
    const departments = await Department.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = departments.map((department, index) => {
      return {
        id: department.id,
        "Sl. No.": index + 1,
        "Department Name": department.department_name,
        Action: "Edit", 
      };
    });

    res.status(200).json(formattedData);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.addDesignation = async (req, res) => {
  const id = req.params.id; 
  console.log("Add/Update designation hit", id, req.body);
  const { designation_name, department_name, isUpdate, designation_id } = req.body;

  try {
    if (isUpdate) {
      const designationToUpdate = await Designation.findOne({
        where: { id: designation_id },
      });

      if (!designationToUpdate) {
        return res.status(404).json({
          message: "Designation not found for update",
        });
      }

      const updatedDesignation = await designationToUpdate.update({
        designation_name: designation_name,
        department_id: id, 
      });

      return res.status(201).json({
        message: "Designation updated successfully",
        designation: updatedDesignation,
      });
    } else {
      const newDesignation = await Designation.create({
        designation_name: designation_name,
        department_id: id,
      });

      return res.status(201).json({
        message: "Designation created successfully",
        designation: newDesignation,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


  // try {
  //     if (isUpdate) {
  //       const department = await Department.findOne({
  //         where: {
  //             id: department_id,
  //         }
  //     });
  //         if (department) {
  //           console.log('updating department ',department);
  //             department.department_name = department_name;
  //             await department.save();
  //             console.log('department updatedd');
  //             return res.status(201).json({
  //                 message: 'Department updated successfully',
  //                 department,
  //             });
  //         } else {
  //             return res.status(404).json({ message: 'Department not found' });
  //         }
  //     } else {
  //         const newDepartment = await Department.create({
  //             department_name,
  //             organisation_id: id,
  //         });

  //         return res.status(201).json({
  //             message: 'Department created successfully',
  //             department: newDepartment,
  //         });
  //     }
  // } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Internal server error' });
  // }

  module.exports.getDesignations = async (req, res) => {
    const companyId = req.params.id; 
    console.log(companyId, "hit designation get");
  
    try {
      const designations = await Designation.findAll({
        include: [
          {
            model: Department,
            as: "department",
            attributes: ["department_name", "organisation_id"], 
            where: { organisation_id: companyId },
          },
        ],
        order: [["id", "ASC"]], 
      });
      const formattedData = designations.map((designation, index) => {
        return {
          id: designation.id,
          "Sl. No.": index + 1,
          "Department Name": designation.department.department_name, 
          "Designation": designation.designation_name,
          Action: "Edit",
        };
      });
  
      res.status(200).json(formattedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports.addEmployeeType = async(req,res) => {
  const id = req.params.id; //company id
  console.log('Add/Update employee type hit', id, req.body);

  const { Employment_Type, isUpdate, type_id } = req.body;

  try {
      if (isUpdate) {
        const type = await EmploymentType.findOne({
          where: {
              id: type_id,
          }
      });
          if (type) {
            console.log('updating type ',type);
              type.employment_type = Employment_Type;
              await type.save();
              console.log('employee type updatedd');
              return res.status(201).json({
                  message: 'type updated successfully',
                  type,
              });
          } else {
              return res.status(404).json({ message: 'Employee Type not found' });
          }
      } else {
          const newType = await EmploymentType.create({
              employment_type : Employment_Type,
              organisation_id: id,
          });

          return res.status(201).json({
              message: 'Employee type created successfully',
              employeeType: newType,
          });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.getEmployeeTypes = async (req,res) => {
  console.log(req.params.id, 'hit employee type get');
  
  try {
    const types = await EmploymentType.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = types.map((type, index) => {
      return {
        id: type.id,
        "Sl. No.": index + 1,
        "Employment Type": type.employment_type,
        Action: "Edit", 
      };
    });

    res.status(200).json(formattedData);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.uploadDocuments = (req,res) => {
   console.log('upload documents hittt ' ,id,req.file.filename);
}

