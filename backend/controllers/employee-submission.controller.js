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
} = require("../config/sequelize");

module.exports.addPersonalDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    const [employee, created] = await Employee.findOrCreate({
      where: { organisation_id: parseInt(organisationId), employee_code: employeeCode },
      defaults: { organisation_id: parseInt(organisationId) },
    });


    const [personalDetail, personalCreated] = await PersonalDetail.upsert(
      {
        employee_code: employeeCode,
        ...req.body,
      },
      {
        where: { employee_code: employeeCode },
        returning: true, 
      }
    );

    return res.status(200).json({
      message: personalCreated ? "Personal details added" : "Personal details updated",
      code: employeeCode,
      personalDetail,
    });
  } catch (err) {
    console.error("Error processing personal details:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addServiceDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `http://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;


    // Prepare the data to be inserted or updated
    const serviceDetailsData = {
      employee_code: employeeCode,
      profile_pic: fileUrl,
      ...req.body,
    };

    // Perform the upsert operation
    const [document, created] = await ServiceDetail.upsert(serviceDetailsData);

    if (created) {
      return res.status(200).json({ message: "Service detail added", document });
    } else {
      return res.status(200).json({ message: "Service detail updated", document });
    }
  } catch (err) {
    console.error("Error adding or updating document:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addEducationalDetails = async (req, res) => {
  console.log("Educational hit ", req.params.id, req.body);

  try {
    const file1 = req.files?.transcript_document ? req.files.transcript_document[0].filename : null;
    const file2 = req.files?.certificate_document ? req.files.certificate_document[0].filename : null;
    const [organisationId, employeeCode] = req.params.id.split(".");

    const f1 = file1
      ? `http://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/${employeeCode}/${file1}`
      : null;

    const f2 = file2
      ? `http://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/${employeeCode}/${file2}`
      : null;

    // Check if an ID is provided to determine whether to update or create
    const { id, ...otherDetails } = req.body;

    // Prepare the data for upsert (insert or update)
    const educationalDetails = {
      id: id || null, // If ID exists, use it for updating; otherwise, create new
      employee_code: employeeCode,
      transcript_document: f1,
      certificate_document: f2,
      ...otherDetails,
    };

    // Perform the upsert
    const [document, created] = await EducationDetail.upsert(educationalDetails);

    const message = created
      ? "Educational details added successfully."
      : "Educational details updated successfully.";

    return res.status(200).json({ message, document });
  } catch (err) {
    console.error("Error adding or updating document:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports.addJobDetails = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Prepare the data to be inserted or updated
    const jobData = {
      employee_code: employeeCode,
      ...req.body,
    };

    const existingJob = await JobDetail.findOne({
      where: { employee_code: employeeCode },
    });
    
    if (existingJob) {
      await JobDetail.update(req.body, {
        where: { employee_code: employeeCode },
      });
      return res.status(200).json("Job detail updated");
    } else {
      await JobDetail.create(jobData);
      return res.status(200).json("Job detail added");
    }
    
  } catch (err) {
    console.error("Error processing job details:", err);
    return res.status(500).json("Internal server error");
  }
};


module.exports.addKeyResponsibility = async (req, res) => {

  try {
    const employeeCode = req.params.id.split(".")[1];

    const { id, ...otherDetails } = req.body;

    // Prepare the responsibility data
    const keyResponsibilityData = {
      id: id || null, // If ID exists, use it for updating; otherwise, create new
      employee_code: employeeCode,
      ...otherDetails,
    };

    // Perform upsert (insert or update)
    const [keyResponsibility, created] = await KeyResponsibility.upsert(keyResponsibilityData);

    const message = created
      ? "Key responsibility added successfully."
      : "Key responsibility updated successfully.";

    return res.status(200).json({ message, keyResponsibility });
  } catch (err) {
    console.error("Error adding or updating key responsibility:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports.addTrainingData = async (req, res) => {
  try {
    const train = await TrainingDetail.upsert({
      employee_code: req.params.id.split(".")[1],
      ...req.body,
    });
    return res.status(200).json("training detail added ");
  } catch (err) {
    return res.status(500).json("internal server error ");
  }
};

module.exports.addKinData = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];

    const [kin, kinCreated] = await KinDetail.upsert({
      employee_code: employeeCode,
      ...req.body,
    });

    return res.status(200).json({
      message: kinCreated ? "Kin detail added" : "Kin detail updated",
    });
  } catch (err) {
    console.error("Error adding/updating kin details:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};


module.exports.addCertification = async (req, res) => {
  try {
    const employeeCode = req.params.id.split(".")[1];

    const [certification, certificationCreated] = await Certification.upsert({
      employee_code: employeeCode,
      ...req.body,
    });

    return res.status(200).json(`${certificationCreated ? "Certification detail added" : "Certification detail updated"}`);
  } catch (err) {
    console.error("Error adding/updating certification details:", err);
    return res.status(500).json("Internal server error");
  }
};

module.exports.addContact = async (req, res) => {
    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      const fileUrl = req.file
        ? `http://localhost:${
            process.env.PORT || 3000
          }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
        : null;
  
  
      // Check if contact info already exists for the given employee code
      const existingContact = await ContactInfo.findOne({
        where: { employee_code: employeeCode },
      });
  
      let document;
  
      if (existingContact) {
        // If the contact exists, update it
        document = await existingContact.update({
          proof: fileUrl || existingContact.proof, // Update file URL if a new file is provided
          ...req.body, // Update other fields with the provided data
        });
  
        return res.status(200).json({ message: "Contact details updated", document });
      } else {
        // If the contact doesn't exist, create a new one
        document = await ContactInfo.create({
          employee_code: employeeCode,
          proof: fileUrl,
          ...req.body,
        });
  
        return res.status(200).json({ message: "Contact detail added", document });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
  };
  

  module.exports.addPayDetails = async (req, res) => {
    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      const [payDetail, created] = await PayDetail.upsert({
        employee_code: employeeCode,
        ...req.body,
      });
  
      if (created) {
        return res.status(200).json("Pay detail added");
      } else {
        return res.status(200).json("Pay detail updated");
      }
    } catch (err) {
      console.error("Error processing pay details:", err);
      return res.status(500).json("Internal server error");
    }
  };
  

  module.exports.addPayStructure = async (req, res) => {
    console.log("structure hit ", req.params.id, req.body);
    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      const {payments,deductions} = req.body;
      const existingPayStructure = await PayStructure.findOne({
        where: { employee_code: employeeCode },
      });
  
      if (existingPayStructure) {
        console.log('upading pay');
        await existingPayStructure.update({...payments,...deductions});
        return res.status(200).json("Pay structure updated successfully");
      } else {
        
        await PayStructure.create({
          employee_code: employeeCode,
          ...payments,
          ...deductions
        });
        return res.status(201).json("Pay structure added successfully");
      }
    } catch (err) {
      console.error("Error processing pay structure:", err);
      return res.status(500).json("Internal server error");
    }
  };
  

module.exports.addPassport = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
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
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${frontFileName}`
      : null;

    const backUrl = backFileName
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${backFileName}`
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
    console.error("Error adding/updating Visa details:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports.addEsus = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
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
    console.error("Error adding/updating Esus detail:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addDBS = async (req, res) => {
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
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
    console.error("Error handling DBS detail:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.add_other_details = async (req, res) => {

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Construct file URL if a new file is uploaded
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    // Check if record with provided ID exists
    const existingDetail = await EmployeeOtherDetail.findOne({
      where: { id: req.body.id },
    });

    if (existingDetail) {
      // Update the existing record
      await existingDetail.update({
        document: fileUrl || existingDetail.document, // Keep old file if no new file is uploaded
        ...req.body,
      });

      return res.status(200).json({
        message: "Other detail updated successfully",
        document: existingDetail,
      });
    }

    // Create a new record if not found
    const document = await EmployeeOtherDetail.create({
      employee_code: employeeCode,
      document: fileUrl,
      ...req.body,
    });

    return res.status(200).json({ message: "Other detail added", document });
  } catch (err) {
    console.error("Error adding/updating document:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};


module.exports.national_data = async (req, res) => {

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
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
    console.error("Error adding/updating national details:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports.add_other_document = async (req, res) => {

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Construct file URL if a new file is uploaded
    const fileUrl = req.file
      ? `http://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    // Check if record with provided ID exists
    const existingDocument = await EmployeeOtherDocument.findOne({
      where: { id: req.body.id },
    });

    if (existingDocument) {
      // Update the existing record
      await existingDocument.update({
        doc_url: fileUrl || existingDocument.doc_url, // Keep old file if no new file is uploaded
        ...req.body,
      });

      return res.status(200).json({
        message: "Other document updated successfully",
        document: existingDocument,
      });
    }

    // Create a new record if not found
    const document = await EmployeeOtherDocument.create({
      employee_code: employeeCode,
      doc_url: fileUrl,
      ...req.body,
    });

    return res
      .status(200)
      .json({ message: "Other document detail added", document });
  } catch (err) {
    console.error("Error adding/updating document:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
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
      console.error("Error adding/updating cocother  details:", err);
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
    console.error("Error fetching documents:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
