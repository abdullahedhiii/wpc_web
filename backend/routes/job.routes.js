const express = require('express');
const { addJobListed, getJobsListed, addJobPosted, getJobsPosted, getJobDetails, getJobData, applyJob, getCandidates, getCandidate, updateStatus, getAllCandidates } = require('../controllers/job.controller');
const router = express.Router();
const {CandidateUpload} = require('../config/multerConfig');

router.get('/getJobsListed/:id',getJobsListed);
router.post('/addJobListed/:id',addJobListed);
router.post('/addJobPosted/:id',addJobPosted);
router.get('/getJobsPosted/:id',getJobsPosted);
router.get('/getJobDetails/:id',getJobDetails);
router.get('/getJobData/:id',getJobData);

router.post('/applyJob/:id',CandidateUpload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }]), applyJob);

router.get('/getCandidates/:id',getCandidates)
router.get('/getCandidate/:id',getCandidate)
router.post('/updateCandidateStatus/:id',updateStatus);
router.get('/getAllCandidates/:id',getAllCandidates);
module.exports = router;