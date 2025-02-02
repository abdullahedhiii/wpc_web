
const express = require('express');
const { getAttendance,submitCSV, getDailyAttendance, getAttendanceHistory } = require('../controllers/attendance.controller');
const router = express.Router();
const {attendanceUpload} = require('../config/multerConfig');

router.post('/submitCSV/:id',attendanceUpload.single('attendance'),submitCSV);
router.get('/getAttendance/:id',getAttendance);
router.get('/getDailyAttendance',getDailyAttendance);
router.get('/getAttendanceHistory',getAttendanceHistory)
module.exports = router;