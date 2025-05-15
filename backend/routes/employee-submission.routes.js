const express = require('express');
const { addPersonalDetails, addServiceDetails, addEducationalDetails, 
    addJobDetails, addKeyResponsibility,
    addTrainingData,addKinData,addCertification,
    addContact, addPayDetails,addPayStructure,
    add_other_details, national_data, addDBS,  addEsus,addVisa,  addPassport, add_other_document,
    addOtherCocDetail,
    getDocuments,
    submitLeaveallocation
} = require('../controllers/employee-submission.controller');
const {authenticateUser} = require('../middleware/Authenticate');

const {empUpload,parseForm} = require('../config/multerConfig');
const router = express.Router();

router.post('/submit-personal-details/:id',authenticateUser,addPersonalDetails);
router.post("/submit-service-details/:id",authenticateUser, empUpload.single("profile_pic"), addServiceDetails);
  
  
router.post('/submit-education-details/:id',authenticateUser,empUpload.fields([
    { name: 'transcript_document', maxCount: 1 },
    { name: 'certificate_document', maxCount: 1 }]),addEducationalDetails);

router.post('/submit-job-details/:id',authenticateUser,addJobDetails);
router.post('/submit-key-responsibilities/:id',authenticateUser,addKeyResponsibility);
router.post('/submit-training-data/:id',authenticateUser,addTrainingData);
router.post('/submit-kin-details/:id',authenticateUser,addKinData);
router.post('/submit-certifications/:id',authenticateUser,addCertification);
router.post('/submit-contact/:id',authenticateUser,empUpload.single('proof'),addContact);
router.post('/submit-pay-details/:id',authenticateUser,addPayDetails);
router.post('/submit-pay-structure/:id',authenticateUser,addPayStructure);
router.post('/submit-other-data/:id',authenticateUser,empUpload.single('document'),add_other_details);
router.post('/submit-national/:id',authenticateUser,empUpload.single('document'),national_data);
router.post('/submit-dbs/:id',authenticateUser,empUpload.single('document'),addDBS);
router.post('/submit-esus/:id',authenticateUser,empUpload.single('document'),addEsus);
router.post('/submit-visa/:id',authenticateUser,empUpload.fields([
    {name : 'front',maxCount:1},
    {name: 'back',maxCount:1}
]),addVisa);
router.post('/submit-passport/:id',authenticateUser,empUpload.single('picture'),addPassport);
router.post('/submit-otherdocument/:id',authenticateUser,empUpload.single('doc'),add_other_document);
router.post('/submit-other-coc-details/:id',authenticateUser,addOtherCocDetail);
router.get('/getEmployeeDocuments/:id',authenticateUser,getDocuments);

router.post('/submit-leave-allocation/:id',authenticateUser,submitLeaveallocation);
module.exports = router;