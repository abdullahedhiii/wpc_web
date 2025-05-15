const express = require('express');
const { Login, Register, getModules, 
    fetchSponsorsFromFile,retrieveCookie, getUserOrganisation, 
    logout, getSponsors } = require('../controllers/user.controller');
const router = express.Router();
const {authenticateUser} = require('../middleware/Authenticate');

router.post('/login',Login);
router.post('/logout',logout);

router.post('/register',Register);
router.get('/getModules/:id',authenticateUser,getModules);
router.get('/check-session',authenticateUser,retrieveCookie);
router.get('/getUserOrganisation/:id',authenticateUser,getUserOrganisation);
router.get('/getSponsors',getSponsors);
// router.get('/fetchSponsorsFromFile',fetchSponsorsFromFile);
router.get('/cron/sync-sponsors',fetchSponsorsFromFile);

module.exports = router;