const crypto = require('crypto');
require('dotenv').config();
const {Visitor} = require('../config/sequelize');

const encryptKey = (organisation_id) => {
  const algorithm = 'aes-256-cbc';
  const secretKey = process.env.SECRET_KEY;

  // Ensure the secretKey is 32 bytes
  if (secretKey.length !== 64) {
    throw new Error('Secret key must be 32 bytes (256 bits) in length');
  }

  const iv = crypto.randomBytes(16);  // 16-byte IV for AES

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(organisation_id, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + encrypted; // Return iv and encrypted text concatenated
};

module.exports.gethashykey = (req, res) => {
  const company_id = req.params.id;

  if (!company_id) {
    return res.status(400).json({ error: "Company ID is required" });
  }
  console.log('trying to encrypt ');
  try {
    const encryptedKey = encryptKey(company_id);
    res.status(201).json({
      success: true,
      key: encryptedKey
    });
  } catch (err) {
    console.error("Error during encryption:", err);
    res.status(500).json({ error: err.message });
  }
};

const decryptKey = (encryptedKey) => {
    const algorithm = 'aes-256-cbc';
    const secretKey = process.env.SECRET_KEY; 
    
    // Ensure the secretKey is 32 bytes (256 bits)
    if (secretKey.length !== 64) {
      throw new Error('Secret key must be 32 bytes (256 bits) in length');
    }
    
    const iv = Buffer.from(encryptedKey.slice(0, 32), 'hex');  // Extract IV from the first 16 bytes
    const encryptedText = encryptedKey.slice(32);  // Remaining part is the encrypted text
  
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  
    return decrypted;
};

module.exports.registerVisit = async (req, res) => {
    console.log('register hitt ',req.body);
  const { name,email,contact,address,description,designation,date,time,reference, key } = req.body;
  console.log('register hitt ',req.body);
  try {
    const decryptedId = decryptKey(key);
    console.log('Decrypted ID:', decryptedId, 'organisation  '); 
    
    const newVisitor = await Visitor.create({
      organisation_id: decryptedId, 
      name,email,contact,address,description,designation,date,time,reference
    });

    res.status(201).json({
      success: true,
      message: 'Visitor registered successfully',
      visitor: newVisitor
    });
  } catch (err) {
    console.error("Error registering visitor:", err);
    res.status(500).json({ error: "An error occurred while registering the visitor" });
  }
};
