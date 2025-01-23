const express = require('express');
const { Login, Register, getModules } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login',Login);
router.post('/register',Register);
router.get('/getModules',getModules);

module.exports = router;