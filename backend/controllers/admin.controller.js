const { type } = require("os");
const { Op, BOOLEAN } = require("sequelize"); // Import Sequelize operators
const {Sequelize} = require('sequelize')
const moment = require("moment");

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
  LatePolicy,
  ShiftOffDay,
  OrgDocument,
  Employee,
  ServiceDetail,
  JobDetail,
  Employees,
  PersonalDetail,
  PassportDetail,
  VisaDetail,
  ContactInfo,
  EducationDetail,
  KeyResponsibility,
  TrainingDetail,
  KinDetail,
  Certification,
  EmployeeOtherDocument,
  EsusDetail,
  DBSDetail,
  NationalDetail,
  PayDetail,
  EmployeeOtherDetail,
  PayStructure,
  COCOtherDetail,
  LeaveType,
  LeaveRule,
  LeaveAllocation,
  UserRole,
  Module,
  SubModule,
  Feature,
  Job,
  InterviewForm,
  Duty,
  WorkUpdate,
  LeaveRequest,
  Attendance,
} = require("../config/sequelize");
require("dotenv").config({ path: process.env.ENV_FILE || ".env" });
const crypto = require("crypto");
const { query } = require("express");

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
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${companyLogo}`
      : null;
    const authorizingProofIdPath = authorizingProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${authorizingProofId}`
      : null;
    const keyContactProofIdPath = keyContactProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${keyContactProofId}`
      : null;
    const level1ProofIdPath = level1ProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${level1ProofId}`
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
  console.log("in update ", req.params.id);
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
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${companyLogo}`
      : undefined; // Will be undefined if not updated
    const authorizingProofIdPath = authorizingProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${authorizingProofId}`
      : undefined; // Will be undefined if not updated
    const keyContactProofIdPath = keyContactProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${keyContactProofId}`
      : undefined; // Will be undefined if not updated
    const level1ProofIdPath = level1ProofId
      ? `${process.env.BACKEND_URL}/uploads/${Company_name}/${level1ProofId}`
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
      Authorizing_proof_id:
        authorizingProofIdPath || existingCompany.Authorizing_proof_id,
      Authorizing_history,

      KeyContact_check,
      KeyContact_fname,
      KeyContact_lname,
      KeyContact_designation,
      KeyContact_email,
      KeyContact_phone,
      KeyContact_proof_id:
        keyContactProofIdPath || existingCompany.KeyContact_proof_id,
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

//   const logoPath = req.file ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}` : null;
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
    const organisation = await Organisation.findOne({
      where: { admin_id : req.params.id},
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
       [organisation.Address_Line1 ,
        organisation.Address_Line2 ,
        organisation.Address_Line3 ,
        organisation.Address_City_County ,
        organisation.Address_Postcode ,
        organisation.Address_Country].filter(Boolean).join(' '),
      Website: organisation.Company_Website,
      "Email ID": organisation.Company_OrganisationEmail,
      "Phone No.": organisation.Company_Contact,
      Action: "Edit",
      year_created: new Date(organisation.createdAt).getFullYear()
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

    const company_documents = await OrgDocument.findAll({
      where: { organisation_id: id },
    });
    const response = {
      allData: companyDetails,
      tradingHours,
      company_documents,
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
        department.department_name = department_name;
        await department.save();
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
          attributes: ["department_name", "organisation_id","id"],
          where: { organisation_id: companyId },
        },
      ],
      order: [["id", "ASC"]],
    });
    const formattedData = designations.map((designation, index) => {
      console.log(designation.department.id);
      return {
        id: designation.id,
        department_id : designation.department.id,
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
        type.employment_type = Employment_Type;
        await type.save();
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
        group.paygroup = paygroup;
        group.status = status;
        await group.save();
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
  const { annual_pay, paygroup, isUpdate, annual_id } = req.body;
  try {
    if (isUpdate) {
      const annual = await AnnualPay.findOne({
        where: {
          id: annual_id,
        },
      });
      if (annual) {
        annual.annual_pay = annual_pay;
        annual.paygroup_id = req.param.id;
        await annual.save();
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
        "Pay Group": pay.paygroups.paygroup,
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
        bank.bank_name = Bank_Name;
        await bank.save();
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
        code.bank_id = id;
        code.sort_code = sort_code;
        await code.save();
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
        master.percentage = percentage;
        master.tax_code = tax_code;
        master.reference = reference;
        await master.save();
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
        (holiday.year = year), (holiday.day = day);
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
        "No. of Days": 1,
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

module.exports.getVisitors = async (req, res) => {
  const id = req.params.id;
  try {
    const visitors = await Visitor.findAll({ where: { organisation_id: id } });
    const formattedData = visitors.map((visitor, index) => {
      return {
        id: visitor.id,
        "Sl. No.": index + 1,
        Name: visitor.name,
        Designation: visitor.designation,
        "Email ID": visitor.email,
        "Contact No": visitor.contact,
        Address: visitor.address,
        Description: visitor.description,
        Date: visitor.date,
        Time: visitor.time,
        Reference: visitor.reference,
      };
    });
    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addShift = async (req, res) => {
  const organisation_id = req.params.id; // Fix: Changed from req.param.id to req.params.id
  const { data, dep_id, des_id } = req.body;

  try {
    // Check if a shift already exists for the given department and designation
    const existingShift = await Shift.findOne({
      where: { department_id: dep_id, designation_id: des_id },
    });

    if (existingShift) {
      await existingShift.update({
        work_in: data.work_in,
        work_out: data.work_out,
        break_start: data.break_start,
        break_end: data.break_end,
        description: data.description,
      });

      return res.status(201).json({
        message: "Shift updated successfully",
        shift: existingShift,
      });
    } else {
      const newShift = await Shift.create({
        department_id: dep_id,
        designation_id: des_id,
        work_in: data.work_in,
        work_out: data.work_out,
        break_start: data.break_start,
        break_end: data.break_end,
        description: data.description,
      });

      return res.status(201).json({
        message: "New shift created successfully",
        shift: newShift,
      });
    }
  } catch (error) {
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
      return res
        .status(404)
        .json({ message: "No departments found for this organization." });
    }

    const departmentIds = departments.map((dept) => dept.id);

    const designations = await Designation.findAll({
      where: { department_id: departmentIds },
      attributes: ["id", "designation_name"],
    });

    if (!designations.length) {
      return res
        .status(404)
        .json({ message: "No designations found for these departments." });
    }

    const designationIds = designations.map((des) => des.id);

    const shifts = await Shift.findAll({
      where: { designation_id: designationIds },
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["department_name","id"],
        },
        {
          model: Designation,
          as: "designation",
          attributes: ["designation_name","id"],
        },
      ],
    });

    if (!shifts.length) {
      return res
        .status(404)
        .json({ message: "No shifts found for these designations." });
    }

    const shiftDetails = await Promise.all(
      shifts.map(async (shift, index) => {
        const offDay = await ShiftOffDay.findOne({
          where: { shift_code: shift.shift_code },
        });
        const shiftDetail = {
          "Sl. No.": index + 1,
          "Shift Code": shift.shift_code,
          Department: shift.department?.department_name,
          Designation: shift.designation?.designation_name,
          "Shift Description": shift.description,
          "Work In Time": shift.work_in,
          "Work Out Time": shift.work_out,
          "Break Time From": shift.break_start,
          "Break Time To": shift.break_end,
          Action: "",
          "Designation ID": shift.designation_id,
          "Department_id" : shift.department.id,
          "Shift Name": shift.shift_code + "(" + shift.description + ")",
          "Off Days": offDay
            ? {
                Monday: offDay.monday,
                Tuesday: offDay.tuesday,
                Wednesday: offDay.wednesday,
                Thursday: offDay.thursday,
                Friday: offDay.friday,
                Saturday: offDay.saturday,
                Sunday: offDay.sunday,
              }
            : {},
          "Action" : "Edit",
        };

        return shiftDetail;
      })
    );

    return res.status(200).json(shiftDetails);
  } catch (error) {
    console.error("Error fetching shifts:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.addLatePolicy = async (req, res) => {
  const { data, dep_id, des_id } = req.body;
  console.log('Adding late policy:', data, dep_id, des_id);

  try {
    // Check if a policy already exists
    let existingPolicy = await LatePolicy.findOne({
      where: {
        department_id: dep_id,
        designation_id: des_id,
        shift_code: data.shift_code,
      },
    });

    if (existingPolicy) {
      // Update the existing policy
      await existingPolicy.update({
        days: data.days,
        period: data.period,
        salary_days: data.salary_days,
      });

      console.log('Late policy updated');
      return res.status(200).json({
        message: "Late policy updated successfully",
        policy: existingPolicy,
      });
    } else {
      // Create a new policy
      const newPolicy = await LatePolicy.create({
        department_id: dep_id,
        designation_id: des_id,
        shift_code: data.shift_code,
        days: data.days,
        period: data.period,
        salary_days: data.salary_days,
      });

      console.log('Late policy created');
      return res.status(201).json({
        message: "New late policy created successfully",
        policy: newPolicy,
      });
    }
  } catch (error) {
    console.error('Error in late policy:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getLatePolicies = async (req, res) => {
  try {
    const orgId = req.params.id;

    const departments = await Department.findAll({
      where: { organisation_id: orgId },
    });

    const result = [];

    for (const department of departments) {
      const designations = await Designation.findAll({
        where: { department_id: department.id },
      });

      for (const designation of designations) {
        const shifts = await Shift.findAll({
          where: { designation_id: designation.id },
        });

        for (const shift of shifts) {
          const latePolicy = await LatePolicy.findOne({
            where: {
              department_id: department.id,
              designation_id: designation.id,
              shift_code: shift.shift_code,
            },
          });

          if (latePolicy) {
            result.push({
              id: latePolicy.id,
              Department: department.department_name,
              Designation: designation.designation_name,
              "Shift Code": shift.shift_code,
              "Max Grace Period": latePolicy.period,
              "No. of Days Allowed": latePolicy.days,
              "No. of Day Salary Deducted": latePolicy.salary_days,
              Action: "Edit",
            });
          }
        }
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.addOffDay = async (req, res) => {
  const id = req.params.id;
  const { data } = req.body;

  try {
    // Check if off day entry already exists for the given shift_code
    let existingEntry = await ShiftOffDay.findOne({
      where: { shift_code: data.shift_code },
    });

    if (existingEntry) {
      // Update existing record
      await existingEntry.update({
        monday: data.Monday,
        tuesday: data.Tuesday,
        wednesday: data.Wednesday,
        thursday: data.Thursday,
        friday: data.Friday,
        saturday: data.Saturday,
        sunday: data.Sunday,
      });

      return res.status(201).json({
        message: "Shift off days updated successfully",
        days: existingEntry,
      });
    } else {
      // Create a new entry if not found
      const newEntry = await ShiftOffDay.create({
        shift_code: data.shift_code,
        monday: data.Monday,
        tuesday: data.Tuesday,
        wednesday: data.Wednesday,
        thursday: data.Thursday,
        friday: data.Friday,
        saturday: data.Saturday,
        sunday: data.Sunday,
      });

      return res.status(201).json({
        message: "New shift off day created successfully",
        days: newEntry,
      });
    }
  } catch (error) {
    console.error("Error in adding/updating shift off days:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.uploadDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType, Company_name } = req.body;
    const organisation_id = id;
    const url = `${process.env.BACKEND_URL}/uploads/${Company_name}/${req.file.filename}`;

    // Create a new entry in OrgDocument
    const newDocument = await OrgDocument.create({
      document_type: documentType,
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

module.exports.get_next_id = async (req, res) => {
  const lastEmployee = await Employee.findOne({
    order: [["employee_code", "DESC"]],
    attributes: ["employee_code"],
  });
  let result;
  if (lastEmployee) {
    const lastCodeNumber = parseInt(
      lastEmployee.employee_code.split("-")[1],
      10
    );
    const nextCodeNumber = (lastCodeNumber + 1).toString().padStart(3, "0");
    result = `MAR-${nextCodeNumber}`;
  } else {
    result = "MAR-001";
  }
  return res.status(200).json(result);
};

const generateLink = (employee_code) => {
  try {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.EMP_SECRET_KEY;

    if (!secretKey || secretKey.length !== 64) {
      console.log("key error it is");
      throw new Error(
        "Secret key must be 64 hex characters (32 bytes in length)"
      );
    }
    console.log("trying to encrypttt");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      iv
    );

    let encrypted = cipher.update(employee_code, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + encrypted;
  } catch (error) {
    console.error("Encryption Error:", error.message);
    return null;
  }
};


module.exports.getAllEmployees = async (req, res) => {
  console.log("get employees hit ", req.params.id);
  const org_id = req.params.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const emp = await Employee.findAll({
      where: { organisation_id: org_id },
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          attributes: ["fname", "mname", "lname"],
        },
        {
          model: JobDetail,
          as: "jobdetails",
          attributes: ["title"],
        },
        {
          model: ServiceDetail,
          as: "servicedetail",
          attributes: ["type", "department","designation_id","department_id","designation","employment_type_id"],
          where: {
            [Op.or]: [
              { end_if: null }, // Employees still active with no end date
              { end_if: { [Op.gte]: today } } // Employees with a future end date
            ]
          }
        },
        {
          model: Organisation,
          as: "organisation",
          attributes: [
            "Company_name",
            "Address_Line1",
            "Address_Line2",
            "Address_Line3",
            "Address_City_County",
            "Address_Country",
          ],
        },
      ],
    });


   console.log(emp);
    const formattedResponse = emp.map((employee, index) => {
   //   console.log(employee,index,'indexxx')
      const employeeLink = employee.has_filled_out_form ? null : generateLink(employee.employee_code);

      return {
        "Sl. No.": index + 1,
        "Organisation Name": employee.organisation?.Company_name,
        "Organisation Address": [
          employee.organisation?.Address_Line1,
          employee.organisation?.Address_Line2,
          employee.organisation?.Address_Line3,
          employee.organisation?.Address_City_County,
          employee.organisation?.Address_Country,
        ]
          .filter(Boolean)
          .join(", "), // Filter out null values
        "Employee Name": [
          employee.personaldetail.fname,
          employee.personaldetail.mname,
          employee.personaldetail.lname,
        ]
          .filter(Boolean)
          .join(" "),
        Department: employee.servicedetail?.department,
        "Job Type": employee.servicedetail?.type,
        "Job Title": employee.jobdetails?.title,
        "Employee Link": employeeLink
          ? `${process.env.FRONTEND_URL}/employeelink/${employeeLink}`
          : "Form filled out already",
        Designation : employee.servicedetail?.designation,
        Designation_id : employee.servicedetail?.designation_id,
        Department_id : employee.servicedetail?.department_id,
        employment_type_id : employee.servicedetail?.employment_type_id,
        employee_code : employee.employee_code
      };
    });

    return res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error fetching employees:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.getEmployeePage = async (req, res) => {
  console.log("get employees hit ", req.params.id);
  const org_id = req.params.id;

  try {
    const emp = await Employee.findAll({
      where: { organisation_id: org_id },
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          attributes: [
            "fname",
            "mname",
            "lname",
            "dob",
            "email",
            "contact_1",
            "Nationality",
            "nationality_no",
          ],
        },
        {
          model: ServiceDetail,
          as: "servicedetail",
          attributes: ["designation"],
        },
        {
          model: PassportDetail,
          as: "passportdetail",
          attributes: ["passport_no"],
        },
        {
          model: VisaDetail,
          as: "visadetail",
          attributes: ["expiry_date", "current"],
        },
        {
          model: ContactInfo,
          as: "contact",
          attributes: ["line1", "line2", "line3", "city", "country"],
        },
      ],
    });

    const formattedResponse = emp.map((employee, index) => {
      console.log(employee);
      return {
        "Employee ID": employee.employee_code,
        "Employee Name": [
          employee.personaldetail.fname,
          employee.personaldetail.mname,
          employee.personaldetail.lname,
        ]
          .filter(Boolean)
          .join(" "),
        DOB: employee.personaldetail.dob,
        Mobile: employee.personaldetail.contact_1,
        Email: employee.personaldetail.email,
        Designation: employee.servicedetail?.designation,
        Nationality: employee.personaldetail?.Nationality,
        "NI Number": employee.personaldetail.nationality_no,
        "Visa Expired": employee.visadetail?.current
          ? employee.visadetail?.expiry_date
          : "expired",
        "Passport No": employee.passportdetail?.passport_no,
        Address: [
          employee.contact?.line1,
          employee.contact?.line2,
          employee.contact?.line3,
          employee.contact?.city,
          employee.contact?.country,
        ]
          .filter(Boolean)
          .join(", "),
        Action: [
          { label: "Edit", route: `addEmployee/${employee.employee_code}` },
        ],
      };
    });

    return res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error fetching employees:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.getEmployeeData = async (req, res) => {
  const code = req.params.id;
  try {
    const personal_details = await PersonalDetail.findOne({
      where: { employee_code: code },
    });
    const service_details = await ServiceDetail.findOne({
      where: { employee_code: code },
    });
    const education_details = await EducationDetail.findAll({
      where: { employee_code: code },
    });
    const job_details = await JobDetail.findOne({
      where: { employee_code: code },
    });
    const key_responsibilities = await KeyResponsibility.findAll({
      where: { employee_code: code },
    });
    const training_details = await TrainingDetail.findAll({
      where: { employee_code: code },
    });
    const kin_details = await KinDetail.findOne({
      where: { employee_code: code },
    });
    const certification = await Certification.findOne({
      where: { employee_code: code },
    });
    const contact_info = await ContactInfo.findOne({
      where: { employee_code: code },
    });
    const other_documents = await EmployeeOtherDocument.findAll({
      where: { employee_code: code },
    });
    const passport_details = await PassportDetail.findOne({
      where: { employee_code: code },
    });
    const esus = await EsusDetail.findOne({ where: { employee_code: code } });
    const dbs = await DBSDetail.findOne({ where: { employee_code: code } });
    const visa = await VisaDetail.findOne({ where: { employee_code: code } });
    const national = await NationalDetail.findOne({
      where: { employee_code: code },
    });
    const pay_details = await PayDetail.findOne({
      where: { employee_code: code },
    });
    const other_details = await EmployeeOtherDetail.findAll({
      where: { employee_code: code },
    });
    const pay_structure = await PayStructure.findOne({
      where: { employee_code: code },
    });

    // Format pay_structure to match frontend state
    const formatted_pay_structure = pay_structure
      ? {
          payments: {
            dearnessAllowance: pay_structure.dearnessAllowance || false,
            houseRentAllowance: pay_structure.houseRentAllowance || false,
            conveyanceAllowance: pay_structure.conveyanceAllowance || false,
            performanceAllowance: pay_structure.performanceAllowance || false,
            monthlyFixedAllowance: pay_structure.monthlyFixedAllowance || false,
          },
          deductions: {
            niDeduction: pay_structure.niDeduction || false,
            incomeTaxDeduction: pay_structure.incomeTaxDeduction || false,
            incomeTaxCess: pay_structure.incomeTaxCess || false,
            esi: pay_structure.esi || false,
            profTax: pay_structure.profTax || false,
          },
        }
      : {
          payments: {
            dearnessAllowance: false,
            houseRentAllowance: false,
            conveyanceAllowance: false,
            performanceAllowance: false,
            monthlyFixedAllowance: false,
          },
          deductions: {
            niDeduction: false,
            incomeTaxDeduction: false,
            incomeTaxCess: false,
            esi: false,
            profTax: false,
          },
        };

    // Construct response object
    const response = {
      personal_details,
      service_details,
      education_details,
      job_details,
      key_responsibilities,
      training_details,
      kin_details,
      certification,
      contact_info,
      other_documents,
      passport_details,
      esus,
      dbs,
      visa,
      national,
      pay_details,
      other_details,
      pay_structure: formatted_pay_structure,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching employee data:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.getCOCData = async (req, res) => {
  const id = req.params.id;
  console.log('coc data hit  ',id);
  try {
    console.log('executing this ? ');
    const employees = await Employee.findAll({
      where: { organisation_id: id },
      include: [
        {
          model: JobDetail,
          as: "jobdetails",
          attributes: ["title"],
        },
        {
          model : PersonalDetail,
          as : "personaldetail",
          attributes : ['fname','lname','mname','contact_1','Nationality','nationality_no']
        }
      ],
    });
    console.log('error here??????')
    const employeesWithDetails = await Promise.all(
      employees.map(async (emp) => {
        const employee_code = emp.employee_code;
        const employee ={
           full_name : [emp.personaldetail.fname,emp.personaldetail.lname].filter(Boolean).join(' ') + '(' + employee_code + ')' ,
           employee_code ,
           name: [emp.personaldetail?.fname,emp.personaldetail?.mname,emp.personaldetail?.lname].filter(Boolean).join(' '),
           fname :emp.personaldetail?.fname ,
           lname:emp.personaldetail?.lname,
           mname: emp.personaldetail?.mname,
           title : emp.jobdetails?.title,
           contact_1 : emp.personaldetail.contact_1,
           Nationality : emp.personaldetail.Nationality,
           nationality_no: emp.personaldetail.nationality_no
          };
        const contact_info = await ContactInfo.findOne({where: { employee_code }});
        const passport_details = await PassportDetail.findOne({where: { employee_code },});
        const esus = await EsusDetail.findOne({ where: { employee_code } });
        const dbs = await DBSDetail.findOne({ where: { employee_code } });
        const visa = await VisaDetail.findOne({ where: { employee_code } });
        const national = await NationalDetail.findOne({
          where: { employee_code },
        });
        const other_details = await COCOtherDetail.findOne({
          where: { employee_code },
        });

        return {
          employee,
          contact_info,
          passport_details,
          esus,
          dbs,
          visa,
          national,
          other_details,
        };
      })
    );

    return res.status(200).json(employeesWithDetails);
  } catch (err) {
    console.error("???????????????????Error fetching employee COC data:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.getCOCTable = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Employee.findAll({
      where: { organisation_id: id },
      include: [
        {
          model: COCOtherDetail,
          as: 'cocdetails',
          attributes: ['changeDate', 'remarks', 'awareContact', 'awareInterview'],
        },
        {
          model: PersonalDetail,
          as: 'personaldetail',
          attributes: [
            'Nationality',
            'fname',
            'lname',
            'mname','contact_1'
          ],
        },
        {
            model : ContactInfo,
            as : 'contact',
            attributes : [
              'line1',
              'line2',
              'line3',
              'country',
              'city',]
        },
        {
          model: ServiceDetail,
          as: 'servicedetail',
          attributes: ['type'],
        },
        {
          model: JobDetail,
          as: 'jobdetails',
          attributes: ['title'],
        },
        {
          model: VisaDetail,
          as: 'visadetail',
          attributes: ['visa_no', 'expiry_date'],
        },
        {
          model: PassportDetail,
          as: 'passportdetail',
          attributes: ['passport_no'],
        },
      ],
    });

    const formattedData = data.map((emp) => {
      return {
        'Updated Date': emp.cocdetails?.changeDate,
        'Employment Type': emp.servicedetail?.type,
        'Employee ID': emp.employee_code,
        'Name Of Member Of The Staff': [emp.personaldetail.fname, emp.personaldetail.mname, emp.personaldetail.lname]
          .filter(Boolean)
          .join(' '),
        'Job Title': emp.jobdetails?.title,
        'Address': [
          emp.contact?.line1,
          emp.contact?.line2,
          emp.contact?.line3,
          emp.contact?.city,
          emp.contact?.country,
        ]
          .filter(Boolean)
          .join(' '),
        'Contact Number': emp.personaldetail.contact_1,
        Nationality: emp.personaldetail.Nationality,
        'BRP Number': emp.visadetail?.visa_no,
        'Visa Expired': emp.visadetail?.expiry_date,
        'Remarks/Restriction to work': emp.cocdetails?.remarks,
        'Passport No': emp.passportdetail?.passport_no,
        'ESUS Details': 'no',
        'DBS Details': 'no',
        'National Id Details': 'no',
        'Other Documents': 'no',
        'Are Sponsored migrants aware that they must inform[HR/line manager] promptly of changes in contact Details?':
          emp.cocdetails?.awareContact ? 'Yes' : 'No',
        'Are Sponsore migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview(In applicable cases)?':
          emp.cocdetails?.awareInterview ? 'Yes' : 'No',
        Action: '', // Add the necessary action if required
      };
    });

    return res.status(200).json(formattedData);
  } catch (err) {
    console.log(err,'coc');
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports.getCOCEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const emp = await Employee.findOne({
      where: { 
        organisation_id: id,
        employee_code : req.query.data
      },
      include: [
        {
          model: COCOtherDetail,
          as: 'cocdetails',
          attributes: ['changeDate', 'remarks', 'awareContact', 'awareInterview'],
        },
        {
          model: PersonalDetail,
          as: 'personaldetail',
          attributes: [
            'Nationality',
            'fname',
            'lname',
            'mname','contact_1'
          ],
        },
        {
            model : ContactInfo,
            as : 'contact',
            attributes : [
              'line1',
              'line2',
              'line3',
              'country',
              'city',]
        },
        {
          model: ServiceDetail,
          as: 'servicedetail',
          attributes: ['type'],
        },
        {
          model: JobDetail,
          as: 'jobdetails',
          attributes: ['title'],
        },
        {
          model: VisaDetail,
          as: 'visadetail',
          attributes: ['visa_no', 'expiry_date'],
        },
        {
          model: PassportDetail,
          as: 'passportdetail',
          attributes: ['passport_no'],
        },
      ],
    });

    const formattedData = {
        'Updated Date': emp.cocdetails?.changeDate,
        'Employment Type': emp.servicedetail?.type,
        'Employee ID': emp.employee_code,
        'Name Of Member Of The Staff': [emp.personaldetail.fname, emp.personaldetail.mname, emp.personaldetail.lname]
          .filter(Boolean)
          .join(' '),
        'Job Title': emp.jobdetails?.title,
        'Address': [
          emp.contact?.line1,
          emp.contact?.line2,
          emp.contact?.line3,
          emp.contact?.city,
          emp.contact?.country,
        ]
          .filter(Boolean)
          .join(' '),
        'Contact Number': emp.personaldetail.contact_1,
        Nationality: emp.personaldetail.Nationality,
        'BRP Number': emp.visadetail?.visa_no,
        'Visa Expired': emp.visadetail?.expiry_date,
        'Remarks/Restriction to work': emp.cocdetails?.remarks,
        'Passport No': emp.passportdetail?.passport_no,
        'ESUS Details': 'no',
        'DBS Details': 'no',
        'National Id Details': 'no',
        'Other Documents': 'no',
        'Are Sponsored migrants aware that they must inform[HR/line manager] promptly of changes in contact Details?':
          emp.cocdetails?.awareContact ? 'Yes' : 'No',
        'Are Sponsore migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview(In applicable cases)?':
          emp.cocdetails?.awareInterview ? 'Yes' : 'No',
        "Annual Reminder Date": '', 
    };

    return res.status(200).json([formattedData]);
  } catch (err) {
    console.log(err,'coc');
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


module.exports.addLeaveType = async(req,res) => {
  const id = req.params.id;

  const { leave_type, isUpdate, remarks,sort_code,leave_type_id } = req.body;

  try {
    if (isUpdate) {
      const type = await LeaveType.findOne({
        where: {
          id: leave_type_id,
          organisation_id : id
        },
      });
      if (type) {
        type.leave_type = leave_type;
        type.remarks = remarks || "N/A"
        type.sort_code = sort_code
        await type.save();
        return res.status(201).json({
          message: "leave type updated successfully",
          type,
        });
      } else {
        return res.status(404).json({ message: "leave type not found" });
      }
    } else {
      const newLeave = await LeaveType.create({
        organisation_id: id,
        leave_type,sort_code,remarks
      });

      return res.status(201).json({
        message: "type created successfully",
        leave: newLeave,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.getLeaveTypes = async (req,res) => {
     const id = req.params.id;
     try{
        const leaveTypes = await LeaveType.findAll({
        where : {organisation_id : id}
     });
       const formattedResponse = leaveTypes.map((leave,index) => {
          return {
             "id" : leave.id,
             "Sl. No." : index+1,
             "Leave Type" : leave.leave_type,
             "Remarks" : leave.remarks || "N/A",
             "Leave Type Sort Code" : leave.sort_code,
             "Action" : "Edit"
          }
       })
       return res.status(200).json(formattedResponse);
     }
     catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.addLeaveRule = async(req,res) => {
  const id = req.params.id;

  const {rule_id,isUpdate,leave_type_id,employment_type_id,leave_type,max,from,to} = req.body;

  try {
    if (isUpdate) {
      const type = await LeaveRule.findOne({
        where: {
          id: rule_id,
          organisation_id : id
        },
      });
      if (type) {
        type.leave_type = leave_type 
        type.max = max
        type.from = from
        type.to = to
        type.leave_type_id = leave_type_id
        type.employment_type_id = employment_type_id
        await type.save();
        return res.status(201).json({
          message: "leave rule updated successfully",
          type,
        });
      } else {
        return res.status(404).json({ message: "leave rule not found" });
      }
    } else {
      const newRule = await LeaveRule.create({
        organisation_id: id,
        leave_type_id,employment_type_id,leave_type,max,from,to
            });

      return res.status(201).json({
        message: "new rule created successfully",
        leave: newRule,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.getLeaveRules = async (req, res) => {
  const id = req.params.id;
  try {
    const rules = await LeaveRule.findAll({
      where: { organisation_id: id },
      include: [
        {
          model: LeaveType,
          as: 'leavetype',
          attributes: ['leave_type'],
          foreignKey : 'leave_type_id',
        },
      ],
    });

    // Use Promise.all to wait for all promises inside map to resolve
    const formattedResponse = await Promise.all(
      rules.map(async (rule, index) => {
        const employeetypes = await EmploymentType.findOne({
          where: { id: rule.employment_type_id },
        });

        return {
          id: rule.id,
          "Sl. No.": index + 1,
          "Employee Type": employeetypes?.employment_type,  // Use optional chaining to avoid null errors
          "Leave Type": rule.leavetype.leave_type,
          "Max. No.": rule.max,
          "Effective From": rule.from,
          "Effective To": rule.to,
          Action: "Edit",
        };
      })
    );

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.allocateLeave = async (req, res) => {
  console.log('hit allocated leave ');
  const id = req.params.id;

  try {
    const [a, b] = req.body.year.includes('/') ? req.body.year.split('/') : [null, null];
    
    const leave_type = await LeaveType.findOne({
      where: { id: req.body.leave_type_id }
    });
    const leave_rule = await LeaveRule.findOne({
      where: { leave_type_id: req.body.leave_type_id }
    });
    const year = b ? b : req.body.year;

    // Check if leave allocation already exists
    const existingLeave = await LeaveAllocation.findOne({
      where: {
        employee_code: req.body.employee_code,
        leave_type_id: req.body.leave_type_id,
        year: year
      }
    });

    if (existingLeave) {
      // Update existing leave allocation
      await LeaveAllocation.update(
        { leave_in_hand: leave_rule.leave_in_hand },
        { where: { id: existingLeave.id } }
      );
    } else {
      // Create a new leave allocation if it doesn't exist
      await LeaveAllocation.create({
        employee_code: req.body.employee_code,
        employment_type_id: req.body.employment_type_id,
        leave_type_id: req.body.leave_type_id,
        year: year,
        leave_in_hand: leave_rule.max
      });
    }

    // Construct response
    const response = {
      'Select': '-',
      'Employment Type': req.body.employment_type,
      'Employee Code': req.body.employee_code,
      'Leave Name': leave_type?.leave_type,
      'Maximum No.': leave_rule.max,
      'Leave in hand': leave_rule.max,
      'Effective Year': req.body.year
    };

    return res.status(existingLeave ? 200 : 201).json(response);
  } catch (error) {
    console.error("Error in allocateLeave:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports.getLeaveAllocated = async(req,res) => {
    const allocation_id = req.params.id;
    try{
       const leave_allocated = await LeaveAllocation.findOne({
        where : {id : allocation_id}
       });
       const leave_type = await LeaveType.findOne({
        where : {id : leave_allocated.leave_type_id},
        include : [
          {
            model : LeaveRule,
            as : 'leaverules',
            attributes :['max']
          }
        ]
       });
       const employee_type = await EmploymentType.findOne({where : {id : leave_allocated.employment_type_id}})
       const data = {
           leave_type : leave_type.leave_type,
           employee_code : leave_allocated.employee_code,
           max : leave_type.leaverules[0].max,
           employee_type: employee_type.employment_type,
           leave_in_hand : leave_allocated.leave_in_hand,
           year : '01/'+leave_allocated.year,
           employment_type_id : leave_allocated.employment_type_id,
       };
       return res.status(200).json(data);
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getLeavesAllocated = async (req, res) => {
  const id = req.params.id;
  console.log('id in leaves:', id);

  try {
      const employees = await Employee.findAll({
          where: { organisation_id: id },
          include: [
              {
                  model: PersonalDetail, 
                  as: 'personaldetail',
                  attributes: ['fname', 'mname', 'lname']
              }
          ]
      });

      const records = [];
      let index = 1;

      for (const employee of employees) {
          const employee_code = employee.employee_code;

          // Fetch all leave allocations for the employee for all years
          const leave_allocations = await LeaveAllocation.findAll({
              where: { employee_code: employee_code }
          });

          console.log(leave_allocations);

          for (const leave_allocated of leave_allocations) {
              const leave_type = await LeaveType.findOne({
                  where: { id: leave_allocated.leave_type_id },
                  include: [
                      {
                          model: LeaveRule,
                          as: 'leaverules',
                          attributes: ['max']
                      }
                  ]
              });

              console.log(leave_type?.leaverules);

              const employee_type = await EmploymentType.findOne({
                  where: { id: leave_allocated.employment_type_id }
              });

              records.push({
                   id : leave_allocated.id,
                  "Sl. No.": index++,
                  "Employee Type": employee_type?.employment_type || 'N/A',
                  "Employee Code": employee_code,
                  "Leave Type": leave_type?.leave_type || 'N/A',
                  "Employee Name": [employee.personaldetail.fname, employee.personaldetail.mname, employee.personaldetail.lname]
                      .filter(Boolean)
                      .join(' '),
                  "Max. No Of Leave": leave_type?.leaverules?.[0]?.max || 0, // Fixed accessing `.max`
                  "Leave In Hand": leave_allocated.leave_in_hand,
                  "Effective Year": '01/' + leave_allocated.year,
                  "Action": "Edit",
                  employment_type_id : leave_allocated.employment_type_id
              });
          }
      }

      return res.status(200).json(records);
  } catch (err) {
      console.error("Error fetching leaves allocated:", err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.getOrgDocuments = async(req,res) => {
     const id = req.params.id;

     try{
         const documents = await OrgDocument.findAll({where : {organisation_id : id}});
         return res.status(200).json(documents);
     }
     catch (err) {
      console.error("Error fetching documents:", err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports.createUser = async (req,res) => {

  try{
  const existingUser = await User.findOne({ where: { email:req.body.email,employee_code : req.body.employee_code } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
  }
  const newUser = await User.create({
    ...req.body,
    organisation_id : req.params.id,
  }); 
  return res.status(201).json({ message: 'User registered successfully.',newUser});
  } 
  catch (error) {
    console.error('Error in user creation:', error);
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }

};

module.exports.updateUser = async (req,res) => {

};


// const columns = [
//   "Sl. No.",
//   "Employee Code ",
//   "Name",
//   "Email",
//   "Password",
//   "Action"
// ];

module.exports.getUserData = async (req,res) => {
    const id = req.params.id;
    try{
       const user = await User.findOne({where : {id : id}});
       const response = {id : user.id,employee_code : user.employee_code, email : user.email,password : '***', employee_name : user.employee_name};
       return res.status(200).json(response);
    }
    catch(err){
      return res.status(500).json({message : 'Internal Server Error'});
    }
};

module.exports.getUsers = async (req,res) => {
     const id = req.params.id;
     try{
          const users = await User.findAll({where : {organisation_id : id}});
          const formattedResponse = await Promise.all(
            users.map(async (user, index) => {
              const details = await PersonalDetail.findOne({where: {employee_code : user.employee_code }})
                return{
                    id : user.id,
                    "Sl. No." : index+1,
                    "Employee Code" : user.employee_code,
                    "Name" : [details.fname,details.mname,details.lname].filter(Boolean).join(' '),
                    "Email" : user.email,
                    "Password" : "****",
                    "Action" :"Edit"
                }
            }));
            return res.status(200).json(formattedResponse);

     }
     catch(err){
         return res.status(500).json({error : 'Internal server error'});
     }
}
module.exports.grantRights = async (req, res) => {
  console.log(req.body);
  
  try {
    // Check if the user role already exists
    const existingRole = await UserRole.findOne({
      where: {
        user_id: req.body.email,
        sub_module_id: req.body.module,
        feature_id: req.body.feature,
        right: req.body.right
      }
    });

    if (existingRole) {
      console.log('role existss');
      return res.status(400).json({ message: "User role already assigned!" });
    }

    // Create a new user role if it does not exist
    await UserRole.create({
      user_id: req.body.email,
      sub_module_id: req.body.module,
      feature_id: req.body.feature,
      right: req.body.right
    });

    return res.status(200).json({ message: "User role created" });

  } catch (err) {
    console.error("Error granting rights:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.getUserRoles = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findAll({
      where: { organisation_id: id },
      include: [
        {
          model: UserRole,
          as: 'roles',
          include: [
            {
              model: Feature,
              as: 'feature',
            },
            {
              model: SubModule,
              as: 'submodule',
            }
          ],
        },
      ],
    });

    const formattedResponse = data.flatMap((user, index) =>
      user.roles.map((role) => ({
        "Sl. No.": index + 1,  
        "User Id": user.email,
        "Module Name": role.submodule ? role.submodule.name : "N/A",
        "Menu": role.feature ? role.feature.name : "N/A",
        "Rights": role.right,
        "Action": "Delete", 
      }))
    );

    return res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error fetching user roles:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.getJobOpen = async (req, res) => {
  try {
      const { id } = req.params; // Assuming organisation_id is passed in request params
      const today = new Date(); // Get today's date

      const jobs = await Job.findAll({
          where: {
              [Op.and]: [
                  { organisation_id: id },
                  { jobClosingDate: { [Op.gt]: today } } // Check if closing date is greater than today
              ]
          }
      });

      res.status(200).json({ message: "Jobs retrieved successfully", jobs });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports.addForm = async (req, res) => {
  try {
    const { id, job_position, ...rest } = req.body;

    if (id) {
      // Update existing form
      const [updated] = await InterviewForm.update(
        { job_id: job_position, ...rest },
        { where: { id } }
      );

      if (updated) {
        return res.status(200).json({ message: "Form updated successfully" });
      } else {
        return res.status(404).json({ message: "Form not found" });
      }
    } else {
      // Create new form
      await InterviewForm.create({ job_id: job_position, ...rest });
      return res.status(201).json({ message: "Form added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


module.exports.getForms = async(req,res) => {
    const id = req.params.id;
    const today = new Date(); // Get today's date

    try{
         const jobs = await Job.findAll({
          where : {
            [Op.and]: [
              { organisation_id: id },
              { jobClosingDate: { [Op.gt]: today } } // Check if closing date is greater than today
          ]
          },
          include : [
           { 
            model: InterviewForm,
            as : "form"
          }
          ]
         });
         console.log(jobs);
         const formattedData = jobs.map((job,index) => (
          job.form ? {
            id : job.form?.id,
            job_id : job.form?.job_id,
            "Sl. No." : index+1,
            "Job Title" : job.jobTitle,
            "Form Name" : job.form?.form_name,
            "Industry" : job.form?.industry,
            "Scaling" : job.form?.scaling,
            "Action" : "Edit"
          } : null
         ));
         return res.status(200).json(formattedData);
    }

    catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports.getJobForm = async (req,res) => {
   try{
       const form = await InterviewForm.findOne({
        where : {id : req.params.id}
       });
       const job = await Job.findOne({
        where : {id : form.job_id}
       });
       form.job_position = job.jobTitle;
       return res.status(200).json(form);
      }
  
      catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
      }
};

module.exports.assignDuty = async(req,res) => {
    try{
      await Duty.create({
        ...req.body
    });
    res.status(200).json({ message: "form added"});
    }
    catch(err){
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
}
module.exports.getDuties = async (req, res) => {
  try {
    const { department_id, designation_id, fromDate, toDate, employee_code } = req.query;
    
    const employee_detail = employee_code ? await ServiceDetail.findOne({
      where : {employee_code : employee_code}
    }) : null;

    console.log("Request Params:", { department_id, designation_id, fromDate, toDate, employee_code });

    const dutyWhereClause = {
      fromDate: { [Op.gte]: fromDate },
      toDate: { [Op.lte]: toDate },
      department_id,
      designation_id,
    };

    if (employee_code) dutyWhereClause.employee_code = employee_code;

    console.log("Duty Query:", dutyWhereClause);
    let duties;
    duties = await Duty.findAll({ where: dutyWhereClause });
    console.log("Duties Retrieved:", duties);
    if(employee_code && duties.length === 0){
      console.log('employee code hut duties null')    
      duties = await Duty.findAll({
            where : {
              fromDate: { [Op.gte]: fromDate },
              toDate: { [Op.lte]: toDate },
              department_id : employee_detail.department_id,
              designation_id: employee_detail.designation_id,
            }
          });
          console.log(duties);
    }

    const shift = await Shift.findOne({
      where: { department_id, designation_id },
      include: [
        { model: Department, as: "department", attributes: ["id", "department_name"] },
        { model: Designation, as: "designation", attributes: ["id", "designation_name"] },
      ],
    });

    console.log("Shift Retrieved:", shift);

    const employeeWhereClause = employee_code ? { employee_code } : {  };
    console.log(employeeWhereClause);
    const employeeRecords = await Employee.findAll({
      where: employeeWhereClause,
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          attributes: ["fname", "mname", "lname", "employee_code"],
        },
        {
          model: ServiceDetail,
          as: "servicedetail",
          where: { department_id, designation_id },
        },
      ],
    });

    console.log("Employee Records Retrieved:", employeeRecords);


    // Step 4: Format Duties Per Employee
    const formattedDuties = duties.map((duty) => {
      const employeeDetails =
        employeeRecords.find((emp) => emp.personaldetail?.employee_code === duty.employee_code) ||
        employeeRecords[0] || {}; // If no match, use first available employee

      return {
        Department: shift?.department?.department_name || "N/A",
        Designation: shift?.designation?.designation_name || "N/A",
        "Employee Name": [employeeDetails.personaldetail?.fname, employeeDetails.personaldetail?.mname, employeeDetails.personaldetail?.lname]
          .filter(Boolean)
          .join(" ") || "N/A",
        EmployeeCode: employeeDetails.personaldetail?.employee_code || "N/A",
        "Shift Code": shift?.shift_code || "N/A",
        "Work In Time": shift?.work_in || "N/A",
        "Work Out Time": shift?.work_out || "N/A",
        "Break Time From": shift?.break_start || "N/A",
        "Break Time To": shift?.break_end || "N/A",
        "From Date": duty.fromDate || "N/A",
        "To Date": duty.toDate || "N/A",
      };
    });

    // Step 5: Send response
    return res.status(200).json(formattedDuties);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


module.exports.getTasks = async (req, res) => {
    const { employee_code, fromDate, toDate } = req.query;

    try {
        const employee = await Employee.findOne({
            where: { employee_code },
            include: [
                {
                    model: PersonalDetail,
                    as: "personaldetail",
                    attributes: ["fname", "mname", "lname", "employee_code"],
                },
            ],
        });

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        const tasks = await WorkUpdate.findAll({
            where: {
                employee_code,
                update_date: { [Op.gte]: fromDate },
                update_date :{ [Op.lte]: toDate },
            },
        });

        const formattedTasks = tasks.map((task, index) => ({
            "Sl No": index + 1,
            "Employee Name": `${employee.personaldetail.fname} ${employee.personaldetail.mname || ""} ${employee.personaldetail.lname}`.trim(),
            "Date": task.update_date,
            "From Time": task.fromTime, 
            "To Time": task.toTime, 
            "Task Performed": task.update || "N/A",
            "Task Update": task.update || "N/A",
            "Uploaded File": task.file || "N/A", 
        }));

        // Return response
        return res.status(200).json(formattedTasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports.getLeavesRequested = async (req, res) => {
  try {
    console.log('Oragnisation id ',req.params.id);
    const leaves = await Employee.findAll({
      where: {
        organisation_id: req.params.id,
      },
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          foreignKey : 'employee_code',
        },
        {
          model: ServiceDetail,
          as: "servicedetail",
          foreignKey : 'employee_code'
        },
        {
          model: LeaveRequest,
          as: "leave_requests",
          foreignKey: "employeeCode", 
        },
      ],
    });
console.log(leaves);
    const formattedTasks = await Promise.all(
      leaves.flatMap((leave, index) =>
        leave.leave_requests.map(async (leaveRequest) => {
 console.log(leaveRequest);
          const leave_type = await LeaveType.findOne({
            where: {
              id: leaveRequest.leave_type_id,
            },
          });

          return {
            id: leaveRequest.id,
            "Sl. No.": index + 1,
            "Employment Type": leave.servicedetail?.type || "N/A",
            "Employee Code": leaveRequest.employeeCode, // Use correct column
            "Name": [leave.personaldetail?.fname, leave.personaldetail?.mname, leave.personaldetail?.lname]
              .filter(Boolean)
              .join(" "),
            "Leave Type": leave_type?.leave_type || "N/A",
            "From Date": leaveRequest.fromDate,
            "To Date": leaveRequest.toDate,
            "Date Of Application": leaveRequest.applicationDate,
            "No. Of Leave": leaveRequest.days,
            "Status": leaveRequest.status,
            "Action" : [
              {label : 'approve',route :'Approved'},
              {label :'reject',route :'Rejected'}]
          };
        })
      )
    );

    res.status(200).json(formattedTasks );
  } catch (err) {
    console.error("Error fetching leave requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateLeaveRequest = async (req, res) => {
  try {
    const updatedRows = await LeaveRequest.update(
      { status: req.body.status },
      { where: { id: req.body.request_id } }
    );

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const updatedRequest = await LeaveRequest.findOne({
      where: { id: req.body.request_id },
    });

    if (!updatedRequest) {
      return res.status(404).json({ message: "Updated leave request not found" });
    }

    const num_days = updatedRequest.days;
    const leaveType = await LeaveAllocation.findOne({
      where: {
        employee_code: updatedRequest.employeeCode,
        leave_type_id: updatedRequest.leave_type_id,
      },
    });

    // Check if leaveType exists
    if (!leaveType) {
      return res.status(404).json({ message: "Leave allocation record not found" });
    }

    if(req.body.status !== 'rejected'){
          await LeaveAllocation.update(
      { leave_in_hand: leaveType.leave_in_hand - num_days },
      {
        where: {
          employee_code: updatedRequest.employeeCode,
          leave_type_id: updatedRequest.leave_type_id,
        },
      }
    );

    }

    return res.status(200).json({ message: "Request updated successfully" });
  } catch (err) {
    console.error("Error updating leave request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getLeaveReportEmployee = async (req, res) => {
  const { year, employee_code } = req.query;

  if (!year || !employee_code) {
    return res.status(400).json({ error: "Year and employee_code are required" });
  }

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const records = await LeaveRequest.findAll({
      where: {
        employeeCode: employee_code, // Make sure column name matches DB schema
        [Op.or]: [
          { fromDate: { [Op.between]: [startDate, endDate] } },
          { toDate: { [Op.between]: [startDate, endDate] } }
        ]
      }
    });

    const emp = await PersonalDetail.findOne({
      where: { employee_code : employee_code }
    });

    if (!emp) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const formattedData = await Promise.all(
      records.map(async (record, index) => {
        const leave_type = await LeaveType.findOne({
          where: { id: record.leave_type_id }
        });

        return {
          "Sl No.": index + 1,
          "Employee Code": record.employeeCode,
          "Employee Name": [emp.fname, emp.mname, emp.lname].filter(Boolean).join(" "),
          "Leave Type": leave_type ? leave_type.leave_type : "Unknown",
          "Date of Application": record.applicationDate,
          "Date(s)": `${record.fromDate} - ${record.toDate}`,
          "Duration (Days)": record.days,
          "Status": record.status
        };
      })
    );

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.getPastStaffData = async (req, res) => {
  const id = req.params.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const organisation = await Organisation.findOne({ where: { id: id } });

    const staff = await Employee.findAll({
      where: { organisation_id: id },
      include: [
        { model: PersonalDetail, as: "personaldetail", attributes: ["fname", "mname", "lname", "dob", "nationality_no", "Nationality", "contact_1"] },
        { model: JobDetail, as: "jobdetails", attributes: ["start"] },
        { model: ServiceDetail, as: "servicedetail", attributes: ["end_if"], where: { end_if: { [Op.lt]: today } } }, // Filter past employees
        { model: VisaDetail, as: "visadetail", attributes: ["expiry_date", "review_date"] },
        { model: PassportDetail, as: "passportdetail" },
        { model: EsusDetail, as: "esusdetail", attributes: ["expiry"] },
        { model: DBSDetail, as: "dbsdetail", attributes: ["expiry"] },
        { model: NationalDetail, as: "nationaldetail" },
        { model: ContactInfo, as: "contact" },
      ],
    });

    const formattedData = staff.map((emp, index) => ({
      "Staff Code": emp.employee_code || "=",
      "Staff Name": [emp.personaldetail.fname, emp.personaldetail.mname, emp.personaldetail.lname].filter(Boolean).join(" "),
      "Address": [emp.contact.line1, emp.contact.line2, emp.contact.line3, emp.contact.city, emp.contact.country, emp.contact.post_code].filter(Boolean).join(" "),
      "DOB": emp.personaldetail.dob,
      "Job Start Date": emp.jobdetails?.start || "N/A",
      "Service End Date": emp.servicedetail?.end_if || "N/A", // Display when they left
      "Telephone": emp.personaldetail.contact_1,
      "Nationality": emp.personaldetail.Nationality || emp.nationaldetail?.nationality || "N/A",
      "NI Number": emp.nationaldetail?.national_id || "N/A",
      "Visa Expiry": emp.visadetail?.expiry_date ? `Expires on ${emp.visadetail.expiry_date}` : "N/A",
      "Visa Review": emp.visadetail?.review_date ? `Review on ${emp.visadetail.review_date}` : "N/A",
      "Passport No": emp.passportdetail?.passport_no || "N/A",
      "Passport Expiry Date": emp.passportdetail?.expiry_date ? `Expires on ${emp.passportdetail.expiry_date}` : "N/A",
      "EUSS Details": emp.esusdetail?.expiry ? `Expires on ${emp.esusdetail.expiry}` : "N/A",
      "DBS Details": emp.dbsdetail?.expiry ? `Expires on ${emp.dbsdetail.expiry}` : "N/A",
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.processAttendance = async (req, res) => {
  try {
    const { department_id, designation_id, fromDate, toDate, employee_code } = req.query;
    const Dept = await Department.findOne({
      where : {id : department_id}
    });

    const Desg = await Designation.findOne({
      where : {id : designation_id}
    })
    const workingArray = [];
    const leaveArray = [];
    const absentArray = [];
    const presentArray = []
    const shift = await Shift.findOne({
      where: { department_id, designation_id },
    });

    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    const shiftOffDays = await ShiftOffDay.findOne({
      where: { shift_code: shift.shift_code },
    });

    if (!shiftOffDays) {
      return res.status(404).json({ message: "Shift off days not found" });
    }

    const startDate = moment(fromDate, "YYYY-MM-DD");
    const endDate = moment(toDate, "YYYY-MM-DD");

    if (!startDate.isValid() || !endDate.isValid()) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const employee_leaves = await LeaveRequest.findAll({
      where: {
        employee_code,
        status: "Approved",
        [Op.or]: [
          { fromDate: { [Op.between]: [fromDate, toDate] } },
          { toDate: { [Op.between]: [fromDate, toDate] } },
        ],
      },
    });

    const leaveDates = new Set();
    employee_leaves.forEach((leave) => {
      const leaveStart = moment(leave.fromDate, "YYYY-MM-DD");
      const leaveEnd = moment(leave.toDate, "YYYY-MM-DD");

      for (let date = leaveStart.clone(); date.isSameOrBefore(leaveEnd); date.add(1, "day")) {
        leaveDates.add(date.format("YYYY-MM-DD"));
      }
    });

    const employee_attendance = await Attendance.findAll({
      where: {
        employee_code,
        date: { [Op.between]: [fromDate, toDate] },
      },
    });

    const attendedDates = new Map();
    employee_attendance.forEach((record) => {
      attendedDates.set(moment(record.date).format("YYYY-MM-DD"), {
        status: record.status,
        grace_period_exceeded: record.grace_period_exceeded
      });
    });
    

    let workingDays = 0,salary_deducted = 0;

    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "day")) {
      const formattedDate = date.format("YYYY-MM-DD");
      const dayName = date.format("dddd").toLowerCase(); 

      if (shiftOffDays[dayName]) {
        continue;
      }

      workingDays++;
      workingArray.push(formattedDate);

      if (leaveDates.has(formattedDate)) {
        leaveArray.push(formattedDate);
      } else if (!attendedDates.has(formattedDate)) {
        absentArray.push(formattedDate); 
      } else {
        const {status,grace_period_exceeded} = attendedDates.get(formattedDate);
        if (status !== "Present" && status !== "Incomplete Hours") {
          absentArray.push(formattedDate); 
        }else presentArray.push(formattedDate);
        if(grace_period_exceeded) salary_deducted++;
      }
    }
    const emp = await PersonalDetail.findOne({
      where : {employee_code}
    })
    const response = [{
      'Department' : Dept.department_name, 
      'Designation': Desg.designation_name,
      'Employee Code' : employee_code,
      'Employee Name': [emp.fname,emp.mname,emp.lname].filter(BOOLEAN).join(' '),
      'No. of working days' : workingDays,
      'No. of Present days' : presentArray.length,
      'No. of absent days' : absentArray.length,
      'Leaves Taken' : leaveArray.length,
      'No. of days salary deducted' : salary_deducted
    }]
    return res.status(200).json(response);

  } catch (err) {
    console.error("Error processing attendance:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
module.exports.processAbsentReport = async (req, res) => {
  try {
    const { department_id, designation_id, employee_code, year } = req.query;

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const Dept = await Department.findOne({ where: { id: department_id } });
    const Desg = await Designation.findOne({ where: { id: designation_id } });
    const shift = await Shift.findOne({ where: { department_id, designation_id } });

    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    const shiftOffDays = await ShiftOffDay.findOne({ where: { shift_code: shift.shift_code } });

    if (!shiftOffDays) {
      return res.status(404).json({ message: "Shift off days not found" });
    }

    const emp = await PersonalDetail.findOne({ where: { employee_code } });

    const currentYear = moment().year();
    const currentMonth = moment().month() + 1; // Month is 0-based, so add 1
    const monthsToProcess = year == currentYear ? currentMonth : 12;

    const reportData = [];

    for (let month = 0; month < monthsToProcess; month++) {
      const startDate = moment(`${year}-${month + 1}-01`, "YYYY-MM-DD").startOf("month");
      const endDate = moment(startDate).endOf("month");

      const leaveArray = [];
      const absentArray = [];
      const presentArray = [];
      let workingDays = 0;
      let salary_deducted = 0;

      // Fetch approved leaves in the month
      const employee_leaves = await LeaveRequest.findAll({
        where: {
          employee_code,
          status: "Approved",
          [Op.or]: [
            { fromDate: { [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")] } },
            { toDate: { [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")] } },
          ],
        },
      });

      // Store leave dates
      const leaveDates = new Set();
      employee_leaves.forEach((leave) => {
        const leaveStart = moment(leave.fromDate, "YYYY-MM-DD");
        const leaveEnd = moment(leave.toDate, "YYYY-MM-DD");

        for (let date = leaveStart.clone(); date.isSameOrBefore(leaveEnd); date.add(1, "day")) {
          leaveDates.add(date.format("YYYY-MM-DD"));
        }
      });

      // Fetch attendance records for the month
      const employee_attendance = await Attendance.findAll({
        where: {
          employee_code,
          date: { [Op.between]: [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")] },
        },
      });

      // Store attended dates
      const attendedDates = new Map();
      employee_attendance.forEach((record) => {
        attendedDates.set(moment(record.date).format("YYYY-MM-DD"), {
          status: record.status,
          grace_period_exceeded: record.grace_period_exceeded,
        });
      });

      for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "day")) {
        const formattedDate = date.format("YYYY-MM-DD");
        const dayName = date.format("dddd").toLowerCase();

        if (shiftOffDays[dayName]) {
          continue; // Skip non-working days
        }

        workingDays++;

        if (leaveDates.has(formattedDate)) {
          leaveArray.push(formattedDate);
        } else if (!attendedDates.has(formattedDate)) {
          absentArray.push(formattedDate);
        } else {
          const { status, grace_period_exceeded } = attendedDates.get(formattedDate);
          if (status !== "Present" && status !== "Incomplete Hours") {
            absentArray.push(formattedDate);
          } else {
            presentArray.push(formattedDate);
          }

          if (grace_period_exceeded) salary_deducted++;
        }
      }

      // Store the formatted row for the current month
      reportData.push({
        "Employee Code" : employee_code,
       "Employee Name": [emp?.fname, emp?.mname, emp?.lname].filter(Boolean).join(" "),
        "Month":startDate.format("MMMM"), // Full month name
        "No. of working days": workingDays,
       "No. of Present days": presentArray.length,
       "No. of absent days":  absentArray.length,
       "Leaves Taken": leaveArray.length,
       "No. of days salary deducted": salary_deducted,
    });
    }

    return res.status(200).json(reportData);
  } catch (err) {
    console.error("Error processing AbsentReport:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};