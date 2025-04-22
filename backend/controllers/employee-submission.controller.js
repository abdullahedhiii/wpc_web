const {
  Employee,
  PersonalDetail,
  NationalDetail,
  ServiceDetail,
  EducationDetail,
  JobDetail,
  KeyResponsibility,
  Detail,
  KinDetail,
  Certification,
  ContactInfo,
  PayDetail,
  PayStructure,
  PassportDetail,
  VisaDetail,
  EsusDetail,
  DBSDetail,
  EmployeeOtherDetail,
  EmployeeOtherDocument,
  TrainingDetail,
  COCOtherDetail,
  LeaveAllocation,
} = require("../config/sequelize");
const axios = require('axios');

const isValidDate = (date) => {
  if (!date || date.trim() === "") return false; // Handle empty or null values
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};


module.exports.addPersonalDetails = async (req, res) => {
  try {
    
    const [organisationId, employeeCode] = req.params.id.split(".");

    const [employee, created] = await Employee.findOrCreate({
      where: { organisation_id: parseInt(organisationId), employee_code: employeeCode },
      defaults: { organisation_id: parseInt(organisationId) },
    });

    const existingPersonalDetail = await PersonalDetail.findOne({
      where: { employee_code: employeeCode },
    });

    let personalDetail;
    let message;
    req.body.dob = isValidDate(req.body.dob) ? req.body.dob : null;
    if (existingPersonalDetail) {
      await existingPersonalDetail.update({
        ...req.body,
      });

      personalDetail = existingPersonalDetail;
      message = "Personal details updated";
    } else {
      personalDetail = await PersonalDetail.create({
        employee_code: employeeCode,
        ...req.body,
      });

      message = "Personal details added";
    }

    return res.status(200).json({
      message,
      code: employeeCode,
      personalDetail,
    });

  } catch (err) {
if (err instanceof Sequelize.UniqueConstraintError) {
  return res.status(400).json({ 
    message: "Personal Details Error : Employee details like nationality number or contact numbers must be unique!" 
  });
}
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addServiceDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    let existingServiceDetail = await ServiceDetail.findOne({
      where: { employee_code: employeeCode },
    });

    let serviceDetail;
    let message;
    const {department,designation,type} = req.body;
    const b = {department_name : department};
    await axios.post(`${process.env.BACKEND_URL}/api/addDepartment/${organisationId}`,b);
    console.log('Department added');
    const c = {department_name : department,designation_name : designation};
    await axios.post(`${process.env.BACKEND_URL}/api/addDesignation/${organisationId}`,c);
    console.log('Designation added');
    d = {employment_type : type}
    await axios.post(`${process.env.BACKEND_URL}/api/addEmployeeType/${organisationId}`,d)
console.log("employment type added");
    if (existingServiceDetail) {
      await existingServiceDetail.update({
        profile_pic: fileUrl,
        start: isValidDate(req.body.start) ? req.body.start : null,
        end_if: isValidDate(req.body.end_if) ?  req.body.end_if : null,
        ...req.body,
      });

      serviceDetail = existingServiceDetail;
      message = "Service detail updated";
    } else {
      serviceDetail = await ServiceDetail.create({
        employee_code: employeeCode,
        profile_pic: fileUrl,
        start: isValidDate(req.body.start) ? req.body.start : null,
        end_if: isValidDate(req.body.end_if) ?  req.body.end_if : null,
        ...req.body,
      });

      message = "Service detail added";
    }

    return res.status(200).json({ message, serviceDetail });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addEducationalDetails = async (req, res) => {
  

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const isDefault = req.body.isDefault; 
    console.log('In emp updatee : ',req.files,' is default ? ',isDefault);
    const file1 = req.files?.transcript_document ? req.files.transcript_document[0].filename : null;
    const file2 = req.files?.certificate_document ? req.files.certificate_document[0].filename : null;

    const f1 = file1
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${file1}`
      : null;

    const f2 = file2
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${file2}`
      : null;

    const { id, ...otherDetails } = req.body;
    let document;
    let message;

    if (isDefault) {
      // Find the default record for this employee
      let defaultRecord = await EducationDetail.findOne({
        where: { employee_code: employeeCode },
      });

      if (defaultRecord) {
        // Update the default record
        await defaultRecord.update({
          transcript_document: f1 || defaultRecord.transcript_document,
          certificate_document: f2 || defaultRecord.certificate_document,
          ...otherDetails,
        });

        document = defaultRecord;
        message = "Default educational details updated successfully.";
      }
      else {
        document = await EducationDetail.create({
          employee_code: employeeCode,
          transcript_document: f1,
          certificate_document: f2,
          ...otherDetails,
        });
      } 
    } else {
      // If not default, check if ID exists (update) or create new
      if (id) {
        document = await EducationDetail.findByPk(id);
        if (document) {
          await document.update({
            transcript_document: f1 || document.transcript_document,
            certificate_document: f2 || document.certificate_document,
            ...otherDetails,
          });

          message = "Educational details updated successfully.";
        } else {
          return res.status(404).json({ message: "Record not found for update." });
        }
      } else {
        // Create a new record if it's not an update
        document = await EducationDetail.create({
          employee_code: employeeCode,
          transcript_document: f1,
          certificate_document: f2,
          ...otherDetails,
        });

        message = "Educational details added successfully.";
      }
    }

    console.log('in edu ',message, document);
    return res.status(200).json({ message, document });

  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addJobDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    

    const jobData = {
      employee_code: employeeCode,
      start: isValidDate(req.body.start) ? req.body.start : null,
      end: isValidDate(req.body.end) ? req.body.end : null,
      title: req.body.title,
      experience: req.body.experience,
      description: req.body.description
    };

    // Check if the job detail already exists for the given employee
    let jobDetail = await JobDetail.findOne({ where: { employee_code: employeeCode } });

    if (jobDetail) {
      // Update the existing job detail
      await jobDetail.update(jobData);
      return res.status(200).json({ message: "Job detail updated" });
    } else {
      // Create a new job detail record
      jobDetail = await JobDetail.create(jobData);
      return res.status(201).json({ message: "Job detail added", jobDetail });
    }
  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports.addKeyResponsibility = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];
    const { id, isDefault, ...otherDetails } = req.body;

    let keyResponsibility;

    if (isDefault) {
      keyResponsibility = await KeyResponsibility.findOne({
        where: { employee_code: employeeCode},
      });

      if (keyResponsibility) {
        await keyResponsibility.update(otherDetails);
        return res.status(200).json({
          message: "Default key responsibility updated successfully.",
          keyResponsibility,
        });
      }
    }

    if (id) {
      // Check if a record with the provided ID exists
      keyResponsibility = await KeyResponsibility.findOne({ where: { id } });

      if (keyResponsibility) {
        // Update the existing record
        await keyResponsibility.update(otherDetails);
        return res.status(200).json({
          message: "Key responsibility updated successfully.",
          keyResponsibility,
        });
      }
    }

    // If no default record found and no existing record with ID, create a new one
    keyResponsibility = await KeyResponsibility.create({
      employee_code: employeeCode,
      ...otherDetails,
    });

    return res.status(201).json({
      message: isDefault
        ? "Default key responsibility created."
        : "Key responsibility added successfully.",
      keyResponsibility,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports.addTrainingData = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];
    req.body.start = isValidDate(req.body.start) ? req.body.start : null;
    req.body.end = isValidDate(req.body.end) ? req.body.end : null;
    const { id, isDefault, ...otherDetails } = req.body;
    
    let trainingDetail;

    if (isDefault) {
      trainingDetail = await TrainingDetail.findOne({
        where: { employee_code: employeeCode },
      });

      if (trainingDetail) {
        await trainingDetail.update(otherDetails);
        return res.status(200).json({
          message: "Default training detail updated successfully.",
          trainingDetail,
        });
      }
    }

    if (id) {
      trainingDetail = await TrainingDetail.findOne({ where: { id } });

      if (trainingDetail) {
        await trainingDetail.update(otherDetails);
        return res.status(200).json({
          message: "Training detail updated successfully.",
          trainingDetail,
        });
      }
    }

    // If no default record found and no existing record with ID, create a new one
    trainingDetail = await TrainingDetail.create({
      employee_code: employeeCode,
      ...otherDetails,
    });

    return res.status(201).json({
      message: isDefault
        ? "Default training detail created."
        : "Training detail added successfully.",
      trainingDetail,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addKinData = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];

    // Check if kin details already exist
    const existingKin = await KinDetail.findOne({ where: { employee_code: employeeCode } });

    if (existingKin) {
      // Update existing record
      await existingKin.update(req.body);
      return res.status(200).json({ message: "Kin detail updated" });
    }

    // Create new record if not found
    await KinDetail.create({ employee_code: employeeCode, ...req.body });
    return res.status(201).json({ message: "Kin detail added" });

  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addCertification = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];

    const certificationData = {
      employee_code: employeeCode,
      start: isValidDate(req.body.start) ? req.body.start : null,
      end: isValidDate(req.body.end) ? req.body.end : null,
      title: req.body.title,
      license: req.body.license,
    };

    // Check if certification exists for the employee
    const existingCertification = await Certification.findOne({ where: { employee_code: employeeCode } });

    if (existingCertification) {
      // Update existing certification
      await existingCertification.update(certificationData);

      return res.status(200).json("Certification detail updated");
    }

    // Create new certification record if not found
    await Certification.create(certificationData);

    return res.status(201).json("Certification detail added");

  } catch (err) {
    
    return res.status(500).json("Internal server error");
  }
};

module.exports.addContact = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Construct file URL if a new file is uploaded
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    // Check if contact details exist
    const existingContact = await ContactInfo.findOne({ where: { employee_code: employeeCode } });

    if (existingContact) {
      // Update existing record
      await existingContact.update({
        proof: fileUrl || existingContact.proof, // Keep old file if no new file is uploaded
        ...req.body,
      });

      return res.status(200).json({ message: "Contact details updated", document: existingContact });
    }

    // Create new record if not found
    const document = await ContactInfo.create({
      employee_code: employeeCode,
      proof: fileUrl,
      ...req.body,
    });

    return res.status(201).json({ message: "Contact detail added", document });

  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports.addPayDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    const payDetailData = {
      employee_code: employeeCode,
      ...req.body,
    };

    // Check if pay detail exists for the employee
    const existingPayDetail = await PayDetail.findOne({ where: { employee_code: employeeCode } });

    if (existingPayDetail) {
      // Update existing pay detail
      await existingPayDetail.update(payDetailData);
      return res.status(200).json("Pay detail updated");
    }

    // Create new pay detail record if not found
    await PayDetail.create(payDetailData);
    return res.status(201).json("Pay detail added");

  } catch (err) {
    
    return res.status(500).json("Internal server error");
  }
};


  module.exports.addPayStructure = async (req, res) => {
    
    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      const { payments, deductions } = req.body;
  
      const payStructureData = {
        employee_code: employeeCode,
        ...payments,
        ...deductions,
      };
  
      const existingPayStructure = await PayStructure.findOne({
        where: { employee_code: employeeCode }
      });
      
      if (existingPayStructure) {
        await existingPayStructure.update(payStructureData);
        return res.status(200).json("Pay structure updated successfully");
      } else {
        await PayStructure.create(payStructureData);
        return res.status(201).json("Pay structure added successfully");
      }
      
  
    } catch (err) {
      
      return res.status(500).json("Internal server error");
    }
  };
  

module.exports.addPassport = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : undefined;

    // Check if a PassportDetail record already exists
    let document = await PassportDetail.findOne({
      where: { employee_code: employeeCode },
    });

    if (document) {
      await document.update({
        ...req.body,
        picture: fileUrl || document.picture, // Preserve old picture if no new file is uploaded
      });
      return res
        .status(200)
        .json({ message: "Passport detail updated", document });
    } else {
      // Create new record
      document = await PassportDetail.create({
        employee_code: employeeCode,
        picture: fileUrl,
        ...req.body,
      });
      return res
        .status(201)
        .json({ message: "Passport detail added", document });
    }
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ 
        message: "Passport Details Error : Passport number must be unique!" 
      });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addVisa = async (req, res) => {

  try {
    const frontFileName = req.files?.front?.[0]?.filename || null;
    const backFileName = req.files?.back?.[0]?.filename || null;
    const [organisationId, employeeCode] = req.params.id.split(".");

    const frontUrl = frontFileName
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${frontFileName}`
      : null;

    const backUrl = backFileName
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${backFileName}`
      : null;

    // Ensure employeeCode exists
    if (!employeeCode) {
      return res.status(400).json({ message: "Invalid Employee Code" });
    }

    // Check if a VisaDetail record already exists
    let document = await VisaDetail.findOne({
      where: { employee_code: employeeCode },
    });

    if (document) {
      await document.update({
        ...req.body,
        front: frontUrl || document.front, // Preserve old front if no new file is uploaded
        back: backUrl || document.back, // Preserve old back if no new file is uploaded
      });
      return res
        .status(200)
        .json({ message: "Visa details updated", document });
    } else {
      // Create new record
      document = await VisaDetail.create({
        employee_code: employeeCode,
        front: frontUrl,
        back: backUrl,
        ...req.body,
      });
      return res.status(201).json({ message: "Visa details added", document });
    }
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ 
        message: "Visa Details Error : Visa number must be unique!" 
      });
    }    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports.addEsus = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    let document = await EsusDetail.findOne({
      where: { employee_code: employeeCode },
    });
    if (document) {
      await document.update({
        ...req.body,
        document: fileUrl || document.document, 
      }); 

      return res.status(200).json({ message: "Esus detail updated", document });
    } else {
      // Create new record
      document = await EsusDetail.create({
        employee_code: employeeCode,
        document: fileUrl,
        ...req.body,
      });
      return res.status(201).json({ message: "Esus detail added", document });
    }
  } catch (err) {
    
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addDBS = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    // Check if an entry already exists for the employee
    let existingRecord = await DBSDetail.findOne({
      where: { employee_code: employeeCode },
    });

    if (existingRecord) {
        const {employee_code,otherDetails} = req.body;
      await existingRecord.update({
        document: fileUrl || existingRecord.document, // Preserve old file if no new file is uploaded
        ...req.body,
      });
      return res
        .status(200)
        .json({ message: "DBS detail updated", document: existingRecord });
    } else {
      // Create new record
      const newDocument = await DBSDetail.create({
        employee_code: employeeCode,
        document: fileUrl,
        ...req.body,
      });
      return res
        .status(201)
        .json({ message: "DBS detail added", document: newDocument });
    }
  } catch (err) {
    
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
module.exports.add_other_details = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const { id, isDefault, ...otherDetails } = req.body;

    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    let existingDetail;

    if (isDefault) {
      // Check if a default record exists
      existingDetail = await EmployeeOtherDetail.findOne({
        where: { employee_code: employeeCode },
      });

      if (existingDetail) {
        // Update the existing default record
        await existingDetail.update({
          document: fileUrl || existingDetail.document, // Keep old file if no new file is uploaded
          ...otherDetails,
        });

        return res.status(200).json({
          message: "Default other detail updated successfully",
          document: existingDetail,
        });
      }
    }

    if (id) {
      // Check if a record with the provided ID exists
      existingDetail = await EmployeeOtherDetail.findOne({ where: { id } });

      if (existingDetail) {
        // Update the existing record
        await existingDetail.update({
          document: fileUrl || existingDetail.document,
          ...otherDetails,
        });

        return res.status(200).json({
          message: "Other detail updated successfully",
          document: existingDetail,
        });
      }
    }

    // If no default record is found and no existing record with ID, create a new one
    const document = await EmployeeOtherDetail.create({
      employee_code: employeeCode,
      document: fileUrl,
      ...otherDetails,
    });

    return res.status(201).json({
      message: isDefault ? "Default other detail created." : "Other detail added successfully.",
      document,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.national_data = async (req, res) => {

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;



    // Check if a national detail record already exists
    let document = await NationalDetail.findOne({
      where: { employee_code: employeeCode },
    });

    if (document) {
        //const {employee_code,otherDetails} = req.body;
      await document.update({
        ...req.body,
        document: fileUrl || document.document, // Preserve old document if no new file is uploaded
      });

      return res
        .status(200)
        .json({ message: "National details updated", document });
    } else {
      // Create new record
      document = await NationalDetail.create({
        employee_code: employeeCode,
        document: fileUrl,
        ...req.body,
      });

      return res
        .status(201)
        .json({ message: "National details added", document });
    }
  } catch (err) {
    
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
module.exports.add_other_document = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const { id, isDefault, ...otherDetails } = req.body;

    // Construct file URL if a new file is uploaded
    const fileUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    let existingDocument;

    if (isDefault) {
      // Check if a default record exists
      existingDocument = await EmployeeOtherDocument.findOne({
        where: { employee_code: employeeCode},
      });

      if (existingDocument) {
        // Update the existing default record
        await existingDocument.update({
          doc_url: fileUrl || existingDocument.doc_url, // Keep old file if no new file is uploaded
          ...otherDetails,
        });

        return res.status(200).json({
          message: "Default other document updated successfully",
          document: existingDocument,
        });
      }
    }

    if (id) {
      // Check if a record with the provided ID exists
      existingDocument = await EmployeeOtherDocument.findOne({ where: { id } });

      if (existingDocument) {
        // Update the existing record
        await existingDocument.update({
          doc_url: fileUrl || existingDocument.doc_url,
          ...otherDetails,
        });

        return res.status(200).json({
          message: "Other document updated successfully",
          document: existingDocument,
        });
      }
    }

    // If no default record is found and no existing record with ID, create a new one
    const document = await EmployeeOtherDocument.create({
      employee_code: employeeCode,
      doc_url: fileUrl,
      ...otherDetails,
    });

    return res.status(201).json({
      message: isDefault ? "Default other document created." : "Other document added successfully.",
      document,
    });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};



module.exports.addOtherCocDetail = async(req,res)=>{

    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      let document = await COCOtherDetail.findOne({
        where: { employee_code: employeeCode },
      });
      if (document) {
        await document.update({
            ...req.body,
        });
         
        return res
          .status(200)
          .json({ message: "COC other details updated", document });
      } else {
        document = await COCOtherDetail.create({
          employee_code : employeeCode,
          ...req.body,
        });
  
        return res
          .status(201)
          .json({ message: "coc other details added", document });
      }
    } catch (err) {
      
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
};
module.exports.getDocuments = async (req, res) => {
  const employee_code = req.params.id;
  try {
    const educational_documents = await EducationDetail.findAll({
      where: { employee_code: employee_code },
    });
    const contact_doc = await ContactInfo.findOne({
      where: { employee_code: employee_code },
    });
    const other_data = await EmployeeOtherDetail.findAll({
      where: { employee_code: employee_code },
    });
    const other_details = await EmployeeOtherDocument.findAll({
      where: { employee_code: employee_code },
    });
    const visa = await VisaDetail.findOne({
      where: { employee_code: employee_code },
    });
    const passport = await PassportDetail.findOne({
      where: { employee_code: employee_code },
    });
    const national = await NationalDetail.findOne({
      where: { employee_code: employee_code },
    });
    const esus = await EsusDetail.findOne({
      where: { employee_code: employee_code },
    });
    const dbs = await DBSDetail.findOne({
      where: { employee_code: employee_code },
    });

    // Format the response
    const formattedResponse = [
      ...(educational_documents?.flatMap((doc) => [
        doc.transcript_document
          ? {
              document_type: doc.qualification + " transcript document",
              document_url: doc.transcript_document,
            }
          : null,
        doc.certificate_document
          ? {
              document_type: doc.qualification + " certificate document",
              document_url: doc.certificate_document,
            }
          : null,
      ]) || []),
      contact_doc?.proof && {
        document_type: "Contact Document (proof of correspondence)",
        document_url: contact_doc.proof,
      },
      ...(other_data?.flatMap((doc) =>
        doc.document
          ? [
              {
                document_type: doc.name + " document",
                document_url: doc.document,
              },
            ]
          : []
      ) || []),
      ...(other_details?.flatMap((doc) =>
        doc.doc_url
          ? [
              {
                document_type: doc.type,
                document_url: doc.doc_url,
              },
            ]
          : []
      ) || []),
      visa?.front && {
        document_type: "Visa Front Picture",
        document_url: visa.front,
      },
      visa?.back && {
        document_type: "Visa Back Picture",
        document_url: visa.back, // Fixed issue here
      },
      passport?.picture && {
        document_type: "Passport Document",
        document_url: passport.picture,
      },
      national?.document && {
        document_type: "National Document",
        document_url: national.document,
      },
      esus?.document && {
        document_type: "EUSS Document",
        document_url: esus.document,
      },
      dbs?.document && {
        document_type: "DBS Document",
        document_url: dbs.document,
      },
    ].filter(Boolean); 

    return res.status(200).json(formattedResponse);
  } catch (err) {
    
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.submitLeaveallocation = async (req, res) => {
  try {
    const employee_code = req.params.id;
    const { medical_leave, holiday_leave, maternity_leave, year } = req.body;

    let record = await LeaveAllocation.findOne({
      where: {
        employee_code,
        year,
      },
    });

    if (record) {
      await record.update({
        medical_max_leaves :medical_leave,
        holiday_max_leaves : holiday_leave,
        maternity_max_leaves : maternity_leave,
      });

      return res.status(200).json({
        success: true,
        message: "Leave allocation updated successfully",
      });
    } else {
      await LeaveAllocation.create({
        employee_code,
        medical_leaves_in_hand: medical_leave,
        medical_max_leaves :medical_leave,
        holiday_leaves_in_hand: holiday_leave,
        holiday_max_leaves : holiday_leave,
        maternity_leaves_in_hand: maternity_leave,
        maternity_max_leaves : maternity_leave,
        year,
      });

      return res.status(201).json({
        success: true,
        message: "Leave allocation created successfully",
      });
    }
  } catch (err) {
    console.error("Error in submitLeaveallocation:", err);
    return res.status(500).json({
      message: err
    });
  }
};