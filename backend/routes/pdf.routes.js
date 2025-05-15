const express = require('express');
const { generateOrganisationReport, generateStaffReport, getStaffData, generateCompleteLeaveReport, generateEmployeePDF } = require('../controllers/pdf.controller');
const router = express.Router()

const {authenticateUser} = require('../middleware/Authenticate');

router.get('/getOrganisationReport/:id',authenticateUser,generateOrganisationReport);

router.get('/getStaffReport/:id',authenticateUser,generateStaffReport);
router.get('/getStaffData/:id',authenticateUser,getStaffData);
router.get('/getCompleteLeaveReport/:id',authenticateUser,generateCompleteLeaveReport);
router.get('/getEmployeePDF/:employee_code',authenticateUser,generateEmployeePDF);

module.exports = router;
