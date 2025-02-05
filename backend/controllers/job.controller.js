const { Job, Organisation, Candidate } = require("../config/sequelize");
const crypto = require("crypto");

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

const decryptKey = (encryptedKey) => {
  try {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.JOB_SECRET_KEY;

    if (!secretKey || secretKey.length !== 64) {
      throw new Error("Secret key must be 64 hex characters (32 bytes in length)");
    }
    const iv = Buffer.from(encryptedKey.slice(0, 32), "hex"); // First 16 bytes = IV
    const encryptedText = encryptedKey.slice(32); // The rest is the encrypted job_id
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return null;
  }
};

module.exports.getJobData = async (req, res) => {
  const job_hash = req.params.id;

  const job_id = decryptKey(job_hash);
  
  if (job_id) {
    console.log("Decrypted Job ID:", job_id);
    res.status(200).json({ job_id });
  } else {
    res.status(400).json({ error: "Invalid job hash" });
  }
};

//    const jobData = {
//     company: "Work Permit Cloud Ltd",
//     jobTitle: "Help Desk Technician",
//     code: "WP0021",
//     experience: "1-2 Years",
//     description:
//       "A Help Desk Technician that would provide technical customer support and troubleshooting services to end-users meeting help with their computer hardware or software. Write or update training manuals. Testing of use and finding fixing and then users can get satisfied results and functions. Providing technical support over the phone or in person. Diagnosing and resolving software and hardware issues. Diagnosing system errors and other issues. Following up with customers to ensure full resolution of issues within stipulated timeline. Requires reports to analyze common complaints and problems. Install or change software to fix issues by remotely accessing hardware or software for clients to make changes and fix problems.",
//     qualifications: "MQ/LEVEL 6 OR EQUIVALENT",
//     skillSet:
//       "Strong Computer Skills and the Ability to Troubleshoot and Diagnose Problems, the ability to analyze, interpret and explain employment law applicable for Small and Medium Size Enterprises (SMEs)",
//     jobType: "Full Time",
//     workingHours: "32 hours weekly",
//     gender: "Male, Female",
//     languageRequirements: "Not Required",
//     salary: "£2800 - £3800",
//   }

module.exports.getJobData = async(req, res) => {
  const job_hash = req.params.id;
  const job_id = decryptKey(job_hash);

  try {
    const job = await Job.findOne({ where: { id: job_id } });
    const company = await Organisation.findOne({ where: { id: job.organisation_id } });

    const jobData = job.get();
    const response = {
      job_id,
      organisation_id: jobData.organisation_id,
      company: company.Company_name,
      jobTitle: jobData.jobTitle,
      code: jobData.jobCode,
      experience: `${String(jobData.jobExperienceMin)}-${String(jobData.jobExperienceMax)} years`,
      description: jobData.jobDescription,
      skillSet: jobData.skillSet,
      jobType: jobData.jobContractType,
      workingHours: jobData.workingHours,
      gender: jobData.gender,
      languageRequirements: jobData.language,
      salary: `£${String(jobData.basicSalaryMin)} - £${String(jobData.basicSalaryMax)}`
    };

    res.status(200).json(response);

  } catch (err) {
    console.log('Error getting job details:', err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
}

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


module.exports.applyJob = async (req, res) => {
  const [organisationId, job_id, email] = req.params.id.split('.');
  
  const resumeFile = req.files && req.files.resume ? req.files.resume[0].filename : null;
  const coverLetterFile = req.files && req.files.coverLetter ? req.files.coverLetter[0].filename : null;
  
  const resumeUrl = resumeFile
    ? `http://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/JobCandidates/${job_id}/${email}/${resumeFile}`
    : null;
  
  const coverLetterUrl = coverLetterFile
    ? `http://localhost:${process.env.PORT || 3000}/uploads/${organisationId}/JobCandidates/${job_id}/${email}/${coverLetterFile}`
    : null;
  
  try {
    const candidate = await Candidate.create({
      organisation_id : organisationId,
      job_id,
      coverLetter: coverLetterUrl,
      resume: resumeUrl,
      ...req.body, 
    });

    return res.status(200).json({ message: 'Applied for job successfully', candidate });
  } catch (err) {
    console.error('Error applying for job:', err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
};


module.exports.getCandidates = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  try {
      const candidates = await Candidate.findAll({
          where: { organisation_id: id, status: status },
          include: [{
              model: Job,
              as: "job",
              attributes: ["jobCode", "jobTitle"]
          }]
      });
      // ['Job Code','Job Title','Candidate','Email','Contact Number','Status','Date','Action'];
      const formattedResponse = candidates.map((candidate) => {
        return {
             id : candidate.id,
            'Job Code' : candidate.job.jobCode,
            'Job Title' : candidate.job.jobTitle,
            'Candidate' : candidate.name,
            'Email' : candidate.email,
            'Contact Number':candidate.contactNo,
            'Status' : candidate.status,
            'Date' : candidate.applyDate,
            'Action' : 'Edit'  
        }
      })
      console.log(formattedResponse);
      return res.status(200).json(formattedResponse);
  } 
  catch (err) {
      console.error("Error fetching candidates:", err);
      return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.getCandidate = async(req,res) => {
  const c_id = req.params.id;
  try{
      const response = await Candidate.findOne({where : {id : c_id}});
      console.log(response);
      return res.status(200).json(response);

  }
  catch(err){
    console.error("Error fetching candidates:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
}

module.exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status, interviewDate, timeFrom, timeTo } = req.body;

  try {
      const candidate = await Candidate.findOne({ where: { id } });

      if (!candidate) {
          return res.status(404).json({ message: "Candidate not found" });
      }

      const updateData = { status };

      if (["Interview", "Online Screen Test", "Written Test", "Telephone Interview", "Face to Face Interview"].includes(status)) {
          updateData.interviewDate = interviewDate;
          updateData.timeFrom = timeFrom;
          updateData.timeTo = timeTo;
      }

      await Candidate.update(updateData, { where: { id } });

      return res.status(200).json({ message: "Candidate status updated successfully" });
  } catch (err) {
      console.error("Error updating candidate status:", err);
      return res.status(500).json({ message: "Internal server error", error: err });
  }
};

module.exports.getAllCandidates = async(req,res) => {
    const id = req.params.id;
    try{
      const candidates = await Candidate.findAll({
        where: { organisation_id: id, },
        include: [{
            model: Job,
            as: "job",
            attributes: ["jobCode", "jobTitle"]
        }]
    });

    const formattedResponse = candidates.map((candidate) => {
      return {
           id : candidate.id,
          'Job Code' : candidate.job.jobCode,
          'Job Title' : candidate.job.jobTitle,
          'Candidate' : candidate.name,
          'Email' : candidate.email,
          'Contact Number':candidate.contactNo,
          'Status' : candidate.status,
          'Date' : candidate.applyDate,
          'Action' : 'Edit'  
      }
    })
    return res.status(200).json(formattedResponse);
  } 
  catch (err) {
      console.error("Error fetching candidates:", err);
      return res.status(500).json({ message: "Internal server error", error: err });
  }
}