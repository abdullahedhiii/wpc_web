const express = require('express');
const { addJobListed, getJobsListed, addJobPosted, getJobsPosted, 
    getJobDetails, getJobData, applyJob, getCandidates, getCandidate, updateStatus, getAllCandidates, deleteJobPosted } = require('../controllers/job.controller');
const router = express.Router();
const {CandidateUpload} = require('../config/multerConfig');
const {authenticateUser} = require('../middleware/Authenticate');

router.get('/getJobsListed/:id',authenticateUser,getJobsListed);
router.post('/addJobListed/:id',authenticateUser,addJobListed);
router.post('/addJobPosted/:id',authenticateUser,addJobPosted);
router.get('/getJobsPosted/:id',authenticateUser,getJobsPosted);
router.get('/getJobDetails/:id',authenticateUser,getJobDetails);
router.get('/getJobData/:id',getJobData);

router.post('/applyJob/:id',CandidateUpload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }]), applyJob);

router.get('/getCandidates/:id',authenticateUser,getCandidates)
router.get('/getCandidate/:id',authenticateUser,getCandidate)
router.post('/updateCandidateStatus/:id',authenticateUser,updateStatus);
router.get('/getAllCandidates/:id',authenticateUser,getAllCandidates);
router.post('/deleteJobPosted/:id',authenticateUser,deleteJobPosted)
module.exports = router;