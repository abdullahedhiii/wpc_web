const express = require('express');
const { addPersonalDetails, addServiceDetails, addEducationalDetails, 
    addJobDetails, addKeyResponsibility,
    addTrainingData,addKinData,addCertification,
    addContact, addPayDetails,addPayStructure,
    add_other_details, national_data, addDBS,  addEsus,addVisa,  addPassport, add_other_document
} = require('../controllers/employee-submission.controller');

const {empUpload,parseForm} = require('../config/multerConfig');
const router = express.Router();

router.post('/submit-personal-details/:id',empUpload.any(),addPersonalDetails);
router.post("/submit-service-details/:id", empUpload.single("profile_picture"), addServiceDetails);
  
  
router.post('/submit-education-details/:id',empUpload.fields([
    { name: 'transcript_document', maxCount: 1 },
    { name: 'certificate_document', maxCount: 1 }]),addEducationalDetails);

router.post('/submit-job-details/:id',empUpload.any(),addJobDetails);
router.post('/submit-key-responsibilities/:id',empUpload.any(),addKeyResponsibility);
router.post('/submit-training-data/:id',empUpload.any(),addTrainingData);
router.post('/submit-kin-details/:id',empUpload.any(),addKinData);
router.post('/submit-certifications/:id',empUpload.any(),addCertification);
router.post('/submit-contact/:id',empUpload.any(),addContact);
router.post('/submit-pay-details/:id',empUpload.any(),addPayDetails);
router.post('/submit-pay-structure/:id',empUpload.any(),addPayStructure);
router.post('/submit-other-data/:id',empUpload.single('document'),add_other_details);
router.post('/submit-national/:id',empUpload.single('document'),national_data);
router.post('/submit-dbs/:id',empUpload.single('document'),addDBS);
router.post('/submit-esus/:id',empUpload.single('document'),addEsus);
router.post('/submit-visa/:id',empUpload.fields([
    {name : 'front',maxCount:1},
    {name: 'back',maxCount:1}
]),addVisa);
router.post('/submit-passport/:id',empUpload.single('document'),addPassport);
router.post('/submit-otherdocument/:id',empUpload.single('doc'),add_other_document);

module.exports = router;