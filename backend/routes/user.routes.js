const express = require('express');
const { Login, Register, getModules, retrieveCookie } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login',Login);
router.post('/register',Register);
router.get('/getModules/:id',getModules);
router.get('/check-session',retrieveCookie);
module.exports = router;