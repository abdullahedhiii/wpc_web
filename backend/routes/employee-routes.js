const express = require('express');
const { getProfile, addWorkUpdate, getWorkUpdates, getAttendance, getInHand, applyLeave, 
    getCOC,getCOCFormEmp } = require('../controllers/employee.controller');
const router = express.Router();
const {empUpload} = require('../config/multerConfig');


router.get('/fetchMyProfile/:id',getProfile);
router.post('/updateWork/:id',empUpload.single('file'),addWorkUpdate);
router.get('/getWorkUpdates/:id',getWorkUpdates);
router.get('/getMyAttendance',getAttendance);
router.get('/getMyLeaves/:id',getInHand);
router.post('/applyLeave',applyLeave);
router.get('/getMyCOC/:id',getCOC);
router.get('/getCOCDetailsEmp/:id',getCOCFormEmp);
module.exports = router;