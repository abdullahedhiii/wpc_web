const express = require('express');
const upload = require("../config/multerConfig");

const router = express.Router();
const {submitCompanyForm, getOrganisations, getFormDetails,updateCompany,uploadDocuments} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',upload.fields([
    { name: 'Company_Logo', maxCount: 1 },
    { name: 'KeyContact_proof_id', maxCount: 1 },
    { name: 'Authorizing_proof_id', maxCount: 1 },
    { name: 'Level1_proof_id', maxCount: 1 }
  ]), submitCompanyForm,submitCompanyForm);
router.get('/getOrganisations',getOrganisations);
router.get('/getCompanyDetails',getFormDetails);
router.post('/updateCompany/:company_id', upload.single("Logo"), updateCompany);
router.post('/uploadDocument',upload.single('document'),uploadDocuments);
module.exports = router;