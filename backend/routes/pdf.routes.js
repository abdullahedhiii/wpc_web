const express = require('express');
const { generateOrganisationReport, generateStaffReport, getStaffData, generateCompleteLeaveReport } = require('../controllers/pdf.controller');
const router = express.Router()


router.get('/getOrganisationReport/:id',generateOrganisationReport);

router.get('/getStaffReport/:id',generateStaffReport);
router.get('/getStaffData/:id',getStaffData);
router.get('/getCompleteLeaveReport/:id',generateCompleteLeaveReport);
module.exports = router;
