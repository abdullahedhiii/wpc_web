const { Job } = require("../config/sequelize");
const crypto = require('crypto');

const generateLink = (job_id) => {
  try {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.JOB_SECRET_KEY;

    if (!secretKey || secretKey.length !== 64) {
      console.log("Key error");
      throw new Error("Secret key must be 64 hex characters (32 bytes in length)");
    }
    console.log("Trying to encrypt");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      iv
    );

    let encrypted = cipher.update(job_id.toString(), "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + encrypted;
  } catch (error) {
    console.error("Encryption Error:", error.message);
    return null;
  }
};

module.exports.getJobsListed = async(req,res) => {
    const id = req.params.id;
    try{
        console.log('trying to find jobs listed');
        const jobs = await Job.findAll({
            where :{ organisation_id : id , status : 'Listed'}
        });
        console.log('is error here ?');
        const formattedResponse  = jobs.map((job,index) => {
            return {
                "id" : job.id,
                "Sl. No." : index+1,
                "SOC CODE": job.socCode,
                "Job Title" : job.jobTitle,
                "Action" : "Edit",
                "jobDescription" : job.jobDescription,
            }
        })
        return res.status(200).json(formattedResponse);
    }
    catch(err){
        console.log('error getting jobs ',err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};

module.exports.addJobListed = async(req,res) => {
    const id = req.params.id;
    try{
      const job = await Job.create({
        organisation_id : id,
        jobDescription : req.body.content,
        ...req.body.formData
      })
     return res.status(200).json({ message: "job listed added", job });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
}
module.exports.addJobPosted = async (req, res) => {
    const id = req.params.id;
    try {
      const { job_id } = req.body.formData;  
    const job = await Job.findOne({ where: { id: job_id } });
  
      console.log('is error heree ? ', job);
        if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
        await job.update({
        jobDescription: req.body.content,
        ...req.body.formData,
      });
        return res.status(200).json({ message: "Job posted successfully", job });
    } catch (err) {
      // Log error
      console.log('Error: ', err);
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  };
  

module.exports.getJobsPosted = async(req,res) => {
    const id = req.params.id;
    try{
        console.log('trying to find jobs listed');
        const jobs = await Job.findAll({
            where :{ organisation_id : id , status : 'Posted'}
        });
        console.log('is error here ?');
        const formattedResponse  = jobs.map((job,index) => {
          const hash = generateLink(job.id);
            return {
                "id" : job.id,
                "Sl. No." : index+1,
                "SOC Code": job.socCode,
                "Job Title" : job.jobTitle,
                "Job Link": `http://localhost:5173/careers/${hash}`,
                "Vacancy" : job.numVacancies,
                "Job Location": job.jobLocation,
                "Job Posted Date" : job.jobPostingDate,
                "Closing Date" : job.jobClosingDate,
                "Email" : job.email,
                "Phone No." :job.contactNumber,
                "Status" : "Posted",
                "Action" : "Edit",
                "jobDescription" : job.jobDescription
            }
        })
        return res.status(200).json(formattedResponse);
    }
    catch(err){
        console.log('error getting jobs ',err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};

module.exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findOne({ where: { id: req.params.id } });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const jobData = job.get();
    const response = { job_id: job.id, ...jobData };

    return res.status(200).json(response);

  } catch (err) {
    console.log('Error getting job details:', err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
