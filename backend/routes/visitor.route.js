const express = require('express');
const { gethashykey, registerVisit, SendContactEmail } = require('../controllers/visitor.controller');
const router = express.Router();


router.get('/getKey/:id',gethashykey);
router.post('/registerVisitor',registerVisit);
router.post('/contact-email',SendContactEmail);

module.exports = router;