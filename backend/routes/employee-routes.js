const express = require('express');
const { getProfile, addWorkUpdate, getWorkUpdates, getAttendance, getInHand, applyLeave, 
    getCOC,getCOCFormEmp, 
    getLinkFormDetails,
    setFormStatus,
    getApplications} = require('../controllers/employee.controller');
const router = express.Router();
const {empUpload} = require('../config/multerConfig');
const {authenticateUser} = require('../middleware/Authenticate');


router.get('/fetchMyProfile/:id',authenticateUser,getProfile);
router.post('/updateWork/:id',authenticateUser,empUpload.single('file'),addWorkUpdate);
router.get('/getWorkUpdates/:id',authenticateUser,getWorkUpdates);
router.get('/getMyAttendance',authenticateUser,getAttendance);
router.get('/getMyLeaves/:id',authenticateUser,getInHand);
router.post('/applyLeave',authenticateUser,applyLeave);
router.get('/getMyCOC/:id',authenticateUser,getCOC);
router.get('/getCOCDetailsEmp/:id',authenticateUser,getCOCFormEmp);
router.get('/getEmployeeFormInfoOnline/:id',authenticateUser,getLinkFormDetails);
router.post('/updateFormStatus/:id',authenticateUser,setFormStatus);
router.get('/fetchMyApplications',authenticateUser,getApplications)
module.exports = router;