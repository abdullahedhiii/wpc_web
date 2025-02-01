const express = require('express');
const { addJobListed, getJobsListed, addJobPosted, getJobsPosted, getJobDetails } = require('../controllers/job.controller');
const router = express.Router();

router.get('/getJobsListed/:id',getJobsListed);
router.post('/addJobListed/:id',addJobListed);
router.post('/addJobPosted/:id',addJobPosted);
router.get('/getJobsPosted/:id',getJobsPosted);
router.get('/getJobDetails/:id',getJobDetails);
module.exports = router;