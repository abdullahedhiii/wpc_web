const express = require('express');
const { Login, Register, getModules, 
    fetchSponsorsFromFile,retrieveCookie, getUserOrganisation, 
    logout, getSponsors, 
    createPaymentIntent,
    changeAdminPassword,
    SendResetLink,
    validateHash,
    sendConfirmationEmail} = require('../controllers/user.controller');
const router = express.Router();
const {authenticateUser} = require('../middleware/Authenticate');

router.post('/login',Login);
router.post('/logout',logout);

router.post('/register',Register);
router.get('/getModules/:id',getModules);
router.get('/check-session',retrieveCookie);
router.get('/getUserOrganisation/:id',getUserOrganisation);
router.get('/getSponsors',getSponsors);
// router.get('/fetchSponsorsFromFile',fetchSponsorsFromFile);
router.get('/cron/sync-sponsors',fetchSponsorsFromFile);
router.post('/create-payment-intent',createPaymentIntent);
router.post('/forgot-password',SendResetLink)
router.post('/changePassword',changeAdminPassword);
router.get('/validate-hash',validateHash)
router.get('/send-confirmation-email/:id',sendConfirmationEmail)
module.exports = router;