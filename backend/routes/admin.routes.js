const express = require('express');
const upload = require("../config/multerConfig");

const router = express.Router();
const {submitCompanyForm, getOrganisations, getFormDetails} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',upload.single("Logo"),submitCompanyForm);
router.get('/getOrganisations',getOrganisations);
router.get('/getCompanyDetails',getFormDetails);
module.exports = router;