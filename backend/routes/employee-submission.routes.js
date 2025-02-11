const express = require('express');
const { addPersonalDetails, addServiceDetails, addEducationalDetails, 
    addJobDetails, addKeyResponsibility,
    addTrainingData,addKinData,addCertification,
    addContact, addPayDetails,addPayStructure,
    add_other_details, national_data, addDBS,  addEsus,addVisa,  addPassport, add_other_document,
    addOtherCocDetail,
    getDocuments
} = require('../controllers/employee-submission.controller');

const {empUpload,parseForm} = require('../config/multerConfig');
const router = express.Router();

router.post('/submit-personal-details/:id',addPersonalDetails);
router.post("/submit-service-details/:id", empUpload.single("profile_pic"), addServiceDetails);
  
  
router.post('/submit-education-details/:id',empUpload.fields([
    { name: 'transcript_document', maxCount: 1 },
    { name: 'certificate_document', maxCount: 1 }]),addEducationalDetails);

router.post('/submit-job-details/:id',addJobDetails);
router.post('/submit-key-responsibilities/:id',addKeyResponsibility);
router.post('/submit-training-data/:id',addTrainingData);
router.post('/submit-kin-details/:id',addKinData);
router.post('/submit-certifications/:id',addCertification);
router.post('/submit-contact/:id',empUpload.single('proof'),addContact);
router.post('/submit-pay-details/:id',addPayDetails);
router.post('/submit-pay-structure/:id',addPayStructure);
router.post('/submit-other-data/:id',empUpload.single('document'),add_other_details);
router.post('/submit-national/:id',empUpload.single('document'),national_data);
router.post('/submit-dbs/:id',empUpload.single('document'),addDBS);
router.post('/submit-esus/:id',empUpload.single('document'),addEsus);
router.post('/submit-visa/:id',empUpload.fields([
    {name : 'front',maxCount:1},
    {name: 'back',maxCount:1}
]),addVisa);
router.post('/submit-passport/:id',empUpload.single('picture'),addPassport);
router.post('/submit-otherdocument/:id',empUpload.single('doc'),add_other_document);
router.post('/submit-other-coc-details/:id',addOtherCocDetail);
router.get('/getEmployeeDocuments/:id',getDocuments);
module.exports = router;