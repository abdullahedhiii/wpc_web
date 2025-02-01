const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadPath = path.join(__dirname, "../uploads");


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

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", "image/png", "image/gif",  
    "application/pdf",                    
    "text/csv"                             
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, GIF, PDF, and CSV files are allowed!"), false);
  }
};

const orgUpload = multer({
  storage: orgStorage,
  limits: { fileSize: 2 * 1024 * 1024 },  // 2MB file size limit
  fileFilter
});

const empUpload = multer({
  storage: empStorage,
  limits: { fileSize: 2 * 1024 * 1024 },  // 2MB file size limit
  fileFilter
});

const attendanceUpload = multer({
  storage: attendanceStorage,
  limits: { fileSize: 2 * 1024 * 1024 },  // 2MB file size limit
  fileFilter
});
module.exports = { orgUpload, empUpload,attendanceUpload};
