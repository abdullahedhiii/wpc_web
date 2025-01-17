const express = require('express');
const upload = require("../config/multerConfig");

const router = express.Router();
const {submitCompanyForm, getOrganisations, getFormDetails,updateCompany} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',upload.single("Logo"),submitCompanyForm);
router.get('/getOrganisations',getOrganisations);
router.get('/getCompanyDetails',getFormDetails);
router.post('/updateCompany/:company_id', upload.single("Logo"), updateCompany);

module.exports = router;