
const express = require('express');
const { getAttendance,submitCSV } = require('../controllers/attendance.controller');
const router = express.Router();
const {attendanceUpload} = require('../config/multerConfig');

router.post('/submitCSV/:id',attendanceUpload.single('attendance'),submitCSV);
router.get('/getAttendance/:id',getAttendance);
module.exports = router;