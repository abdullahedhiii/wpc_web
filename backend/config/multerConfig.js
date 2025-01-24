const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
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

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and GIF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, 
  },
  fileFilter,
});

module.exports = upload;
