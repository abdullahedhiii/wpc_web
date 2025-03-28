const express = require('express');
const { generateOrganisationReport, generateStaffReport, getStaffData, generateCompleteLeaveReport, generateEmployeePDF } = require('../controllers/pdf.controller');
const router = express.Router()


router.get('/getOrganisationReport/:id',generateOrganisationReport);

router.get('/getStaffReport/:id',generateStaffReport);
router.get('/getStaffData/:id',getStaffData);
router.get('/getCompleteLeaveReport/:id',generateCompleteLeaveReport);
router.get('/getEmployeePDF/:employee_code',generateEmployeePDF);

module.exports = router;
