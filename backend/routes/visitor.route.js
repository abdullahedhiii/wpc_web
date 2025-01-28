const express = require('express');
const { gethashykey, registerVisit } = require('../controllers/visitor.controller');
const router = express.Router();


router.get('/getKey/:id',gethashykey);
router.post('/registerVisitor',registerVisit);
module.exports = router;