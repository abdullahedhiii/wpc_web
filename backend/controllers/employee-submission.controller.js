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
  console.log("Personal details endpoint hit", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Check if the employee already exists
    const [employee, created] = await Employee.findOrCreate({
      where: { organisation_id: parseInt(organisationId), employee_code: employeeCode },
      defaults: { organisation_id: parseInt(organisationId) },
    });

    if (!created) {
      console.log("Employee already exists, updating personal details.");
    }

    // Upsert personal details
    const [personalDetail, personalCreated] = await PersonalDetail.upsert(
      {
        employee_code: employeeCode,
        ...req.body,
      },
      {
        where: { employee_code: employeeCode },
        returning: true, // This will return the updated or created instance
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
  console.log("Service hit checking key", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    console.log("Generated file URL:", fileUrl);

    // Prepare the data to be inserted or updated
    const serviceDetailsData = {
      employee_code: employeeCode,
      profile_pic: fileUrl,
      ...req.body,
    };

    // Perform the upsert operation
    const [document, created] = await ServiceDetail.upsert(serviceDetailsData);

    if (created) {
      console.log("Document added:", document);
      return res.status(200).json({ message: "Service detail added", document });
    } else {
      console.log("Document updated:", document);
      return res.status(200).json({ message: "Service detail updated", document });
    }
  } catch (err) {
    console.error("Error adding or updating document:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.addEducationalDetails = async (req, res) => {
  console.log("educational hit ", req.params.id, req.body);
  try {
    const file1 = req.file ? req.files.transcript_document[0].filename : null;
    const file2 = req.file ? req.files.certificate_document[0].filename : null;
    const [organisationId, employeeCode] = req.params.id.split(".");
    const f1 = file1
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${file1}`
      : null;
    const f2 = file2
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${file2}`
      : null;
    const document = await EducationDetail.create({
      employee_code: employeeCode,
      transcript_document: f1,
      certificate_document: f2,
      ...req.body,
    });

    return res
      .status(200)
      .json({ message: "educational details added", document });
  } catch (err) {
    console.error("Error adding document:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addJobDetails = async (req, res) => {
  console.log("job hit ", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");

    // Prepare the data to be inserted or updated
    const jobData = {
      employee_code: employeeCode,
      ...req.body,
    };

    // Perform the upsert operation
    const [job, created] = await JobDetail.upsert(jobData);

    if (created) {
      console.log("Job detail added:", job);
      return res.status(200).json("Job detail added");
    } else {
      console.log("Job detail updated:", job);
      return res.status(200).json("Job detail updated");
    }
  } catch (err) {
    console.error("Error processing job details:", err);
    return res.status(500).json("Internal server error");
  }
};


module.exports.addKeyResponsibility = async (req, res) => {
  console.log("key hit ", req.params.id, req.body);
  try {
    const key = await KeyResponsibility.create({
      employee_code: req.params.id.split(".")[1],
      ...req.body,
    });
    return res.status(200).json("key detail added ");
  } catch (err) {
    return res.status(500).json("internal server error ");
  }
};

module.exports.addTrainingData = async (req, res) => {
  console.log("tra hit ", req.params.id, req.body);
  try {
    console.log("error here ? ");
    const train = await TrainingDetail.create({
      employee_code: req.params.id.split(".")[1],
      ...req.body,
    });
    return res.status(200).json("training detail added ");
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error ");
  }
};

module.exports.addKinData = async (req, res) => {
  console.log("Kin hit:", req.params.id, req.body);
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
  console.log("Cert hit", req.params.id, req.body);
  try {
    const employeeCode = req.params.id.split(".")[1];

    const [certification, certificationCreated] = await Certification.upsert({
      employee_code: employeeCode,
      ...req.body,
    });

    console.log(`${certificationCreated ? "Certification detail added" : "Certification detail updated"}`);
    return res.status(200).json(`${certificationCreated ? "Certification detail added" : "Certification detail updated"}`);
  } catch (err) {
    console.error("Error adding/updating certification details:", err);
    return res.status(500).json("Internal server error");
  }
};

module.exports.addContact = async (req, res) => {
    console.log("contact hit", req.params.id, req.body);
    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      const fileUrl = req.file
        ? `https://localhost:${
            process.env.PORT || 3000
          }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
        : null;
  
      console.log("Generated file URL:", fileUrl);
  
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
      console.error("Error adding/updating document:", err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
  };
  

  module.exports.addPayDetails = async (req, res) => {
    console.log("pay hit ", req.params.id, req.body);
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
    const [payStructure, created] = await PayStructure.upsert({
      employee_code: employeeCode,
      ...req.body,
    });

    if (created) {
      return res.status(200).json("Pay structure added");
    } else {
      return res.status(200).json("Pay structure updated");
    }
  } catch (err) {
    console.error("Error processing pay structure:", err);
    return res.status(500).json("Internal server error");
  }
};


module.exports.addPassport = async (req, res) => {
  console.log("passport hit", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
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
    console.error("Error adding/updating passport detail:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addVisa = async (req, res) => {
  console.log("Visa hit", req.params.id, req.body);
  console.log("Received Files:", req.files); // Debugging line

  try {
    const frontFileName = req.files?.front?.[0]?.filename || null;
    const backFileName = req.files?.back?.[0]?.filename || null;
    const [organisationId, employeeCode] = req.params.id.split(".");

    const frontUrl = frontFileName
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${frontFileName}`
      : null;

    const backUrl = backFileName
      ? `https://localhost:${
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
  console.log("esus hit", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    let document = await EsusDetail.findOne({
      where: { employee_code: employeeCode },
    });
    console.log('trying to update esus? ',document);
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
  console.log("DBS hit:", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
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
  console.log("other hit ", req.params.id, req.body);
  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    const document = await EmployeeOtherDetail.create({
      employee_code: employeeCode,
      document: fileUrl,
      ...req.body,
    });

    return res.status(200).json({ message: "other detail added", document });
  } catch (err) {
    console.error("Error adding document:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.national_data = async (req, res) => {
  console.log("National document hit", req.params.id, req.body);

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    if (!employeeCode) {
      return res.status(400).json({ message: "Invalid Employee Code" });
    }

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
  console.log("other doc hit", req.params.id, req.body);

  try {
    const [organisationId, employeeCode] = req.params.id.split(".");
    const fileUrl = req.file
      ? `https://localhost:${
          process.env.PORT || 3000
        }/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
      : null;

    const document = await EmployeeOtherDocument.create({
      employee_code: employeeCode,
      doc_url: fileUrl,
      ...req.body,
    });

    return res
      .status(200)
      .json({ message: "other document detail added", document });
  } catch (err) {
    console.error("Error adding document:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports.addOtherCocDetail = async(req,res)=>{
    console.log("other coc document hit", req.params.id, req.body);

    try {
      const [organisationId, employeeCode] = req.params.id.split(".");
      let document = await COCOtherDetail.findOne({
        where: { employee_code: employeeCode },
      });
     console.log('was document found ? ',document,req.body);
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
}