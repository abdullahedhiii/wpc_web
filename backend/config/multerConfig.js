const fs = require("fs");
const path = require("path");
const multer = require("multer");
require('dotenv').config();
const uploadPath = process.env.DOC_PATH ;


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const orgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const companyName = req.body.Company_name;
    if (!companyName) {
      return cb(new Error("Company name is required"));
    }

    const dir = path.join(uploadPath, companyName); 
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); 
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname); 
    cb(null, fileName);
  }
});

const empStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const det = req.params.id.split('.');  
    const company_id = det[0],employeeCode = det[1];
    console.log('trying to dp something with dara ',company_id,employeeCode)
    if (!company_id || !employeeCode) {
      return cb(new Error("Company name and employee code are required"));
    }

    const dir = path.join(uploadPath, company_id, employeeCode);  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); 
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);  
    cb(null, fileName);
  }
});

const attendanceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const company_id = req.params.id;
    if (!company_id) {
      return cb(new Error("Company id is required"));
    }

    const dir = path.join(uploadPath, "Attendance",company_id);  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); 
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);  
    cb(null, fileName);
  }
});

const candidateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const [organisation_id,job_id,email]= req.params.id.split('.');
    if (!job_id) {
      return cb(new Error("job id is required"));
    }

    const dir = path.join(uploadPath,organisation_id,'JobCandidates',job_id,email);  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); 
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);  
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/png", "image/gif",  
    "application/pdf",                    
    "text/xlsx"                             
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, GIF, PDF, and Excel files are allowed!"), false);
  }
};

const orgUpload = multer({
  storage: orgStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 2MB file size limit
});

const empUpload = multer({
  storage: empStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 2MB file size limit
});

const attendanceUpload = multer({
  storage: attendanceStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 2MB file size limit
  });

const CandidateUpload = multer({
  storage: candidateStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 2MB file size limit
})
module.exports = { orgUpload, empUpload,attendanceUpload,CandidateUpload};
