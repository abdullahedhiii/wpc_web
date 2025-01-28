const {
  User,
  Organisation,
  TradingHour,
  Department,
  Designation,
  EmploymentType,
  PayGroup,
  AnnualPay,
  Bank,
  BankSortCode,
  TaxMaster,
  PaymentType,
  HolidayType,
  Holiday,
  Visitor,
  Shift,
  LatePolicy,ShiftOffDay,OrgDocument
} = require("../config/sequelize");
require("dotenv").config({ path: process.env.ENV_FILE || ".env" });

module.exports.submitCompanyForm = async (req, res) => {
  try {
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
    const companyLogo = req.files["Company_Logo"]
      ? req.files["Company_Logo"][0].filename
      : null;
    const authorizingProofId = req.files["Authorizing_proof_id"]
      ? req.files["Authorizing_proof_id"][0].filename
      : null;
    const keyContactProofId = req.files["KeyContact_proof_id"]
      ? req.files["KeyContact_proof_id"][0].filename
      : null;
    const level1ProofId = req.files["Level1_proof_id"]
      ? req.files["Level1_proof_id"][0].filename
      : null;

    const companyLogoPath = companyLogo
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${companyLogo}`
      : null;
    const authorizingProofIdPath = authorizingProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${authorizingProofId}`
      : null;
    const keyContactProofIdPath = keyContactProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${keyContactProofId}`
      : null;
    const level1ProofIdPath = level1ProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${level1ProofId}`
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
      Company_Logo: companyLogoPath,

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
      KeyContact_proof_id: keyContactProofIdPath,
      KeyContact_history,

      Level1_check,
      Level1_fname,
      Level1_lname,
      Level1_designation,
      Level1_email,
      Level1_phone,
      Level1_proof_id: level1ProofIdPath,
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
      message: "Organisation and Trading Hours created successfully.",
      organisation,
      tradingHours: tradingHoursData,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({
      message: "Failed to create Organisation or Trading Hours.",
      error: error.message,
    });
  }
};

module.exports.updateCompany = async (req, res) => {
  console.log('in update ',req.params.id);
  try {
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
      Company_Logo,
      Company_Penalty,

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

    const tradingHours = req.body.tradingHours.map((item) => JSON.parse(item));

    const companyLogo = req.files["Company_Logo"]
      ? req.files["Company_Logo"][0].filename
      : null;
    const authorizingProofId = req.files["Authorizing_proof_id"]
      ? req.files["Authorizing_proof_id"][0].filename
      : null;
    const keyContactProofId = req.files["KeyContact_proof_id"]
      ? req.files["KeyContact_proof_id"][0].filename
      : null;
    const level1ProofId = req.files["Level1_proof_id"]
      ? req.files["Level1_proof_id"][0].filename
      : null;

    const companyLogoPath = companyLogo
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${companyLogo}`
      : undefined; // Will be undefined if not updated
    const authorizingProofIdPath = authorizingProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${authorizingProofId}`
      : undefined; // Will be undefined if not updated
    const keyContactProofIdPath = keyContactProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${keyContactProofId}`
      : undefined; // Will be undefined if not updated
    const level1ProofIdPath = level1ProofId
      ? `http://localhost:${process.env.PORT}/uploads/${Company_name}/${level1ProofId}`
      : undefined;

    const existingCompany = await Organisation.findByPk(req.params.id);
    if (!existingCompany) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    // Update Company record
    const updatedCompany = await existingCompany.update({
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
      Company_Logo: companyLogoPath || existingCompany.Company_Logo, // Keep the old value if no new file
    });

    // Update Proof Id fields if new files are provided
    await existingCompany.update({
      Authorizing_fname,
      Authorizing_lname,
      Authorizing_designation,
      Authorizing_email,
      Authorizing_phone,
      Authorizing_proof_id: authorizingProofIdPath || existingCompany.Authorizing_proof_id,
      Authorizing_history,

      KeyContact_check,
      KeyContact_fname,
      KeyContact_lname,
      KeyContact_designation,
      KeyContact_email,
      KeyContact_phone,
      KeyContact_proof_id: keyContactProofIdPath || existingCompany.KeyContact_proof_id,
      KeyContact_history,

      Level1_check,
      Level1_fname,
      Level1_lname,
      Level1_designation,
      Level1_email,
      Level1_phone,
      Level1_proof_id: level1ProofIdPath || existingCompany.Level1_proof_id,
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

    // Update TradingHours if necessary
    if (tradingHours && tradingHours.length > 0) {
      // Delete existing trading hours
      await TradingHour.destroy({
        where: {
          organisation_id: existingCompany.id,
        },
      });

      // Insert new trading hours
      const tradingHoursData = tradingHours.map((tradingHour) => ({
        day: tradingHour.day,
        status: tradingHour.status,
        openingTime: tradingHour.openingTime,
        closingTime: tradingHour.closingTime,
        organisation_id: existingCompany.id, // Use the ID from the existing company
      }));

      await TradingHour.bulkCreate(tradingHoursData);
    }

    // Respond with success
    res.status(200).json({
      message: "Company information updated successfully.",
      company: updatedCompany,
      tradingHours: tradingHours || [],
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      message: "Failed to update company information.",
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
    const organisation = await Organisation.findOne({
      where: { admin_id },
      attributes: [
        "id",
        "Company_name",
        "Company_Website",
        "Company_OrganisationEmail",
        "Company_Contact",
        "Address_Line1",
        "Address_Line2",
        "Address_Line3",
        "Address_Postcode",
        "Address_City_County",
        "Address_Country",
      ],
    });
    if (!organisation) {
      return res.status(200).json({
        message: "No organisations found",
        data: [],
      });
    }

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
      where: { id },
    });

    if (!companyDetails) {
      return res.status(404).json({ message: "Company not found" });
    }

    const tradingHours = await TradingHour.findAll({
      where: { organisation_id: id },
    });
    
    const company_documents = await OrgDocument.findAll({where : {organisation_id :id}});
    const response = {
      allData: companyDetails,
      tradingHours,
      company_documents
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching company details:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



module.exports.addDepartment = async (req, res) => {
  const id = req.params.id;

  const { department_name, isUpdate, department_id } = req.body;

  try {
    if (isUpdate) {
      const department = await Department.findOne({
        where: {
          id: department_id,
        },
      });
      if (department) {
        console.log("updating department ", department);
        department.department_name = department_name;
        await department.save();
        console.log("department updatedd");
        return res.status(201).json({
          message: "Department updated successfully",
          department,
        });
      } else {
        return res.status(404).json({ message: "Department not found" });
      }
    } else {
      const newDepartment = await Department.create({
        department_name,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "Department created successfully",
        department: newDepartment,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getDepartments = async (req, res) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addDesignation = async (req, res) => {
  const { designation_name, department_name, isUpdate, designation_id } =
    req.body;
  console.log(
    "here to update designations ",
    designation_name,
    department_name,
    designation_id,
    "department id ",
    req.params.id
  );

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

      designationToUpdate.designation_name = designation_name;
      designationToUpdate.department_id = req.params.id; // Ensure department_id is updated here
      console.log("designation updated ", designationToUpdate);
      await designationToUpdate.save();

      return res.status(201).json({
        message: "Designation updated successfully",
        designation: designationToUpdate,
      });
    } else {
      const newDesignation = await Designation.create({
        designation_name: designation_name,
        department_id: req.params.id, // Correctly assign department_id here
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
        Designation: designation.designation_name,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addEmployeeType = async (req, res) => {
  const id = req.params.id; //company id

  const { Employment_Type, isUpdate, type_id } = req.body;

  try {
    if (isUpdate) {
      const type = await EmploymentType.findOne({
        where: {
          id: type_id,
        },
      });
      if (type) {
        console.log("updating type ", type);
        type.employment_type = Employment_Type;
        await type.save();
        console.log("employee type updatedd");
        return res.status(201).json({
          message: "type updated successfully",
          type,
        });
      } else {
        return res.status(404).json({ message: "Employee Type not found" });
      }
    } else {
      const newType = await EmploymentType.create({
        employment_type: Employment_Type,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "Employee type created successfully",
        employeeType: newType,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getEmployeeTypes = async (req, res) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addPayGroup = async (req, res) => {
  const id = req.params.id; //company id

  const { paygroup, status, isUpdate, group_id } = req.body;
  try {
    if (isUpdate) {
      const group = await PayGroup.findOne({
        where: {
          id: group_id,
        },
      });
      if (group) {
        console.log("updating group ", group);
        group.paygroup = paygroup;
        group.status = status;
        await group.save();
        console.log("pay group updatedd");
        return res.status(201).json({
          message: "group updated successfully",
          group,
        });
      } else {
        return res.status(404).json({ message: "pay group not found" });
      }
    } else {
      const newGroup = await PayGroup.create({
        paygroup,
        status,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "Paygroup created successfully",
        group: newGroup,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getPayGroups = async (req, res) => {
  try {
    const paygroups = await PayGroup.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = paygroups.map((group, index) => {
      return {
        id: group.id,
        "Sl. No.": index + 1,
        "Pay Group": group.paygroup,
        Status: group.status,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addAnnualPay = async (req, res) => {
  console.log(
    "add annual pay hitt for group ",
    req.params.id,
    "data ",
    req.body
  );
  const { annual_pay, paygroup, isUpdate, annual_id } = req.body;
  try {
    if (isUpdate) {
      const annual = await AnnualPay.findOne({
        where: {
          id: annual_id,
        },
      });
      if (annual) {
        console.log("updating annual pay ", annual);
        annual.annual_pay = annual_pay;
        annual.paygroup_id = req.param.id;
        await annual.save();
        console.log("annual pay updatedd");
        return res.status(201).json({
          message: "annual pay updated successfully",
          annual,
        });
      } else {
        return res.status(404).json({ message: "annual pay group not found" });
      }
    } else {
      const newAnnualPay = await AnnualPay.create({
        paygroup_id: req.params.id,
        annual_pay: annual_pay,
      });

      return res.status(201).json({
        message: "AnnualPay created successfully",
        pay: newAnnualPay,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAnnualPays = async (req, res) => {
  const companyId = req.params.id;
  try {
    const annualPays = await AnnualPay.findAll({
      include: [
        {
          model: PayGroup,
          as: "paygroups",
          attributes: ["paygroup", "organisation_id"],
          where: { organisation_id: companyId },
        },
      ],
      order: [["id", "ASC"]],
    });
    const formattedData = annualPays.map((pay, index) => {
      return {
        id: pay.id,
        "Sl. No.": index + 1,
        "Pay Group": pay.paygroup,
        "Annual Pay": pay.annual_pay,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCompanyBanks = async (req, res) => {
  try {
    const banks = await Bank.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = banks.map((bank, index) => {
      return {
        id: bank.id,
        "Sl. No.": index + 1,
        "Bank Name": bank.bank_name,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addCompanyBank = async (req, res) => {
  const id = req.params.id; //company id

  const { Bank_Name, isUpdate, bank_id } = req.body;
  try {
    if (isUpdate) {
      const bank = await Bank.findOne({
        where: {
          id: bank_id,
        },
      });
      if (bank) {
        console.log("updating bank ", bank);
        bank.bank_name = Bank_Name;
        await bank.save();
        console.log("bank updatedd");
        return res.status(201).json({
          message: "bank updated successfully",
          bank,
        });
      } else {
        return res.status(404).json({ message: "bank not found" });
      }
    } else {
      const newBank = await Bank.create({
        bank_name: Bank_Name,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "Bank created successfully",
        bank: newBank,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getBankSortCodes = async (req, res) => {
  const organisation_id = req.params.id;
  console.log("trying to find ", organisation_id);
  try {
    const sortcodes = await BankSortCode.findAll({
      include: [
        {
          model: Bank,
          as: "bank",
          attributes: ["bank_name", "id"],
          where: { organisation_id: organisation_id },
        },
      ],
      order: [["id", "ASC"]],
    });
    console.log(sortcodes, "result of query");
    const formattedData = sortcodes.map((code, index) => {
      return {
        id: code.id,
        "Sl. No.": index + 1,
        "Bank Name": code.bank.bank_name,
        "Bank Sort Code": code.sort_code,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addBankSortCode = async (req, res) => {
  const id = req.params.id; //bank id

  const { bank_name, sort_code, sortcode_id, isUpdate } = req.body;
  try {
    if (isUpdate) {
      const code = await BankSortCode.findOne({
        where: {
          id: sortcode_id,
        },
      });
      if (code) {
        console.log("updating code ", code);
        code.bank_id = id;
        code.sort_code = sort_code;
        await code.save();
        console.log("code updatedd");
        return res.status(201).json({
          message: "code updated successfully",
          code,
        });
      } else {
        return res.status(404).json({ message: "code not found" });
      }
    } else {
      const newCode = await BankSortCode.create({
        sort_code: sort_code,
        bank_id: id,
      });

      return res.status(201).json({
        message: "Bank sort code created successfully",
        code: newCode,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getTaxMasters = async (req, res) => {
  try {
    const masters = await TaxMaster.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = masters.map((master, index) => {
      return {
        id: master.id,
        "Sl. No.": index + 1,
        "Tax Code": master.tax_code,
        "Percentage of Deduction": master.percentage,
        "Tax Reference": master.reference,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addTaxMaster = async (req, res) => {
  const id = req.params.id; //company id

  const { tax_code, percentage, reference, tax_id, isUpdate } = req.body;
  try {
    if (isUpdate) {
      const master = await TaxMaster.findOne({
        where: {
          id: tax_id,
        },
      });
      if (master) {
        console.log("updating master ", master);
        master.percentage = percentage;
        master.tax_code = tax_code;
        master.reference = reference;
        await master.save();
        console.log("master updatedd");
        return res.status(201).json({
          message: "master updated successfully",
          master,
        });
      } else {
        return res.status(404).json({ message: "master not found" });
      }
    } else {
      const newMaster = await TaxMaster.create({
        tax_code,
        reference,
        percentage,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "master created successfully",
        master: newMaster,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getPaymentTypes = async (req, res) => {
  try {
    const types = await PaymentType.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = types.map((type, index) => {
      return {
        id: type.id,
        "Sl. No.": index + 1,
        "Payment Type": type.payment_type,
        "Minimum Working Hour": type.min_hours,
        Rate: type.rate,
        Action: "Edit",
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addPaymentType = async (req, res) => {
  const id = req.params.id; //company id

  const { payment_type, min_hours, rate, p_id, isUpdate } = req.body;
  try {
    if (isUpdate) {
      const type = await PaymentType.findOne({
        where: {
          id: p_id,
        },
      });
      if (type) {
        console.log("updating type ", type);
        type.min_hours = min_hours;
        type.rate = rate;
        type.payment_type = payment_type;
        await type.save();
        return res.status(201).json({
          message: "payment type updated successfully",
          type,
        });
      } else {
        return res.status(404).json({ message: "master not found" });
      }
    } else {
      const newPayment = await PaymentType.create({
        min_hours,
        rate,
        payment_type,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "new payment type created successfully",
        type: newPayment,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addHolidayType = async (req, res) => {
  const id = req.params.id; //company id
  const { holiday_type, h_id, isUpdate } = req.body;
  try {
    if (isUpdate) {
      const type = await HolidayType.findOne({
        where: {
          id: h_id,
        },
      });
      if (type) {
        console.log("updating type ", type);
        type.holiday_type = holiday_type;
        await type.save();
        return res.status(201).json({
          message: "holiday type updated successfully",
          type,
        });
      } else {
        return res.status(404).json({ message: "holiday type not found" });
      }
    } else {
      const newHoliday = await HolidayType.create({
        holiday_type,
        organisation_id: id,
      });

      return res.status(201).json({
        message: "new holiday type created successfully",
        type: newHoliday,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getHolidayTypes = async (req, res) => {
  try {
    const types = await HolidayType.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = types.map((type, index) => {
      return {
        id: type.id,
        "Sl. No.": index + 1,
        "Holiday Type": type.holiday_type,
        Action: "Edit",
      };
    });
    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addHoliday = async (req, res) => {
  const id = req.params.id;
  const {
    year,
    day,
    start_date,
    end_date,
    description,
    holiday_type,
    isUpdate,
    ho_id,
  } = req.body;
  try {
    if (isUpdate) {
      const holiday = await Holiday.findOne({ where: { id: ho_id } });
      if (holiday) {
        holiday.year = year,
        holiday.day = day;
        holiday.start_date = start_date;
        holiday.end_date = end_date;
        holiday.holiday_type = holiday_type;
        holiday.description = description;
        await holiday.save();
        return res.status(201).json({
          message: "holiday updated successfully",
          holiday,
        });
      } else {
        return res.status(404).json({ message: "holiday  not found" });
      }
    } else {
      const holiday = await Holiday.create({
        organisation_id: id,
        year,
        day,
        start_date,
        end_date,
        description,
        holiday_type,
      });
      return res.status(201).json({
        message: "new holiday created successfully",
        holiday: holiday,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getHolidayList = async (req, res) => {
  try {
    const holidays = await Holiday.findAll({
      where: { organisation_id: req.params.id },
    });

    const formattedData = holidays.map((holiday, index) => {
      return {
        id: holiday.id,
        "Sl. No.": index + 1,
        Year: holiday.year,
        Date: holiday.start_date + " - " + holiday.end_date,
        "No. of Days" : 1,
        "Holiday Description": holiday.description,
        "Day of Week": holiday.day,
        "Holiday Type": holiday.holiday_type,
        Edit: "Edit",
        Delete: "Delete",
      };
    });
    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getVisitors = async(req,res) => {
    const id = req.params.id;
    try{
        const visitors = await Visitor.findAll({where : {organisation_id :id}});
        const formattedData = visitors.map((visitor, index) => {
          console.log('eacjh visitor ',visitor);
          return {
            id: visitor.id,
            "Sl. No.": index + 1,
            Name: visitor.name,
            Designation: visitor.designation,
            "Email ID" : visitor.email,
            "Contact No": visitor.contact,
            "Address": visitor.address,
            "Description": visitor.description,
             "Date" : visitor.date,
             "Time" : visitor.time,
             "Reference" : visitor.reference
          };
        });
        res.status(200).json(formattedData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
};


module.exports.addShift = async(req,res) => {
    const organisation_id = req.param.id;
    const {data,dep_id,des_id} =  req.body
    try{
         const newShift = await Shift.create({
             department_id : dep_id,
             designation_id : des_id,
            work_in : data.work_in,
            work_out : data.work_out,
            break_start : data.break_start,
            break_end : data.break_end,
            description : data.description
         });
         return res.status(201).json({
          message: "new shift created successfully",
          shift : newShift
        });
      }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getShifts = async (req, res) => {
  const orgId = req.params.id;

  try {
    const departments = await Department.findAll({
      where: { organisation_id: orgId },
      attributes: ["id", "department_name"],
    });

    if (!departments.length) {
      return res.status(404).json({ message: "No departments found for this organization." });
    }

    const departmentIds = departments.map((dept) => dept.id);

    const designations = await Designation.findAll({
      where: { department_id: departmentIds },
      attributes: ["id", "designation_name"],
    });

    if (!designations.length) {
      return res.status(404).json({ message: "No designations found for these departments." });
    }

    const designationIds = designations.map((des) => des.id);

    const shifts = await Shift.findAll({
      where: { designation_id: designationIds },
      include: [
        {
          model: Department,
          as:'department',
          attributes: ['department_name'],
          
        },
        {
          model: Designation,
           as : 'designation',
          attributes: ['designation_name'],
         
        },
      ],
    });

    if (!shifts.length) {
      return res.status(404).json({ message: "No shifts found for these designations." });
    }

    const shiftDetails = await Promise.all(shifts.map(async (shift, index) => {
      const offDay = await ShiftOffDay.findOne({
        where: { shift_code: shift.shift_code },
      });
     console.log(shift.department,shift.designation);
      const shiftDetail = {
        "Sl. No.": index + 1,
        "Shift Code": shift.shift_code,
        "Department": shift.department?.department_name, 
        "Designation": shift.designation?.designation_name, 
        "Shift Description": shift.description,
        "Work In Time": shift.work_in,
        "Work Out Time": shift.work_out,
        "Break Time From": shift.break_start,
        "Break Time To": shift.break_end,
        "Action": '',
        "Designation ID": shift.designation_id,
        "Shift Name": shift.shift_code + '(' + shift.description + ')',
        "Off Days": offDay ? {
          Monday: offDay.monday,
          Tuesday: offDay.tuesday,
          Wednesday: offDay.wednesday,
          Thursday: offDay.thursday,
          Friday: offDay.friday,
          Saturday: offDay.saturday,
          Sunday: offDay.sunday,
        } : {},
      };

      return shiftDetail;
    }));

    return res.status(200).json(shiftDetails);
  } catch (error) {
    console.error("Error fetching shifts:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports.addLatePolicy = async (req,res) => {
   const {data,dep_id,des_id} = req.body;
   try{
     const newPolicy = await LatePolicy.create({
         department_id : dep_id,
         designation_id : des_id,
         shift_code: data.shift_code,
         days: data.days,
         period: data.period,
         salary_days : data.salary_days,
     })
    return res.status(201).json({
      message: "new shift created successfully",
      policy : newPolicy
    });
  }
catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}
};

module.exports.getLatePolicies = async (req, res) => {
  try {
    const orgId = req.params.id;

    const departments = await Department.findAll({ where: {organisation_id : orgId }});

    const result = [];

    for (const department of departments) {
      const designations = await Designation.findAll({ where: { department_id: department.id }});

      for (const designation of designations) {
        const shifts = await Shift.findAll({where :{ designation_id: designation.id }});

        for (const shift of shifts) {
          const latePolicy = await LatePolicy.findOne({where :{
            department_id: department.id,
            designation_id: designation.id,
            shift_code: shift.shift_code
          }});

          if (latePolicy) {
            result.push({
              id : LatePolicy.id,
              "Department": department.department_name,
              "Designation": designation.designation_name,
              'Shift Code': shift.shift_code,
              'Max Grace Period': latePolicy.period,
              'No. of Days Allowed': latePolicy.days,
              'No. of Day Salary Deducted': latePolicy.salary_days,
              Action: ''
            });
          }
        }
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.addOffDay = async(req,res) => {
    const id = req.params.id ;
    const {data}  = req.body;
    console.log(req.body,data);
    try{
        const new_entry = await ShiftOffDay.create({
            shift_code : data.shift_code,
            monday : data.Monday,
            tuesday : data.Tuesday,
            wednesday: data.Wednesday,
            thursday : data.Thursday,
            friday : data.Friday,
            saturday : data.Saturday,
            sunday : data.Sunday
        });
        return res.status(201).json({
          message: "new shift off day created successfully",
          days : new_entry
        });
      }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports.uploadDocuments = async (req, res) => {
  try {
    console.log(
      "Upload documents hit: ",
      req.file.filename,
      req.body,
      req.params.id
    );

    const { id } = req.params; 
    const { documentType,Company_name } = req.body;
    const organisation_id = id; 
    const url = `http://localhost:${process.env.PORT}/uploads/${Company_name}/${req.file.filename}`;

    // Create a new entry in OrgDocument
    const newDocument = await OrgDocument.create({
      document_type:documentType,
      document_url: url,
      organisation_id,
    });

    res.status(200).json({
      message: "Document uploaded and entry created successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({
      message: "Error uploading document",
      error: error.message,
    });
  }
};