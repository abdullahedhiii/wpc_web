const express = require('express');
const upload = require("../config/multerConfig");

const router = express.Router();
const {submitCompanyForm} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',upload.single("Logo"),submitCompanyForm);

module.exports = router;