const express = require('express');
const { Login, Register, getModules, retrieveCookie, getUserOrganisation, logout, getSponsors } = require('../controllers/user.controller');
const router = express.Router();

router.post('/login',Login);
router.post('/logout',logout);

router.post('/register',Register);
router.get('/getModules/:id',getModules);
router.get('/check-session',retrieveCookie);
router.get('/getUserOrganisation/:id',getUserOrganisation);
router.get('/getSponsors',getSponsors);
router.get('/fetchSponsorsFromFile',fetchSponsorsFromFile);
module.exports = router;