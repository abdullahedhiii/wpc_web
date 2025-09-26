
const express = require('express');
const { getAttendance,submitCSV, getDailyAttendance, getAttendanceHistory, deleteAttendance } = require('../controllers/attendance.controller');
const router = express.Router();
const {attendanceUpload} = require('../config/multerConfig');
const {authenticateUser} = require('../middleware/Authenticate');

router.post('/submitCSV/:id',authenticateUser,attendanceUpload.single('attendance'),submitCSV);
router.get('/getAttendance/:id',authenticateUser,getAttendance);
router.get('/getDailyAttendance',authenticateUser,getDailyAttendance);
router.get('/getAttendanceHistory',authenticateUser,getAttendanceHistory)
router.delete('/deleteAttendance/:company_id/:employee_code/:date',authenticateUser,deleteAttendance);
module.exports = router;