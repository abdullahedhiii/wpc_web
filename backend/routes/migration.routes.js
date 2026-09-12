const express = require('express');
const { RequestMigration } = require('../controllers/migration.controller');
const router = express.Router();

router.post('/ukg-migration', RequestMigration);

module.exports = router;
