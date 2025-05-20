const { Job, Organisation, Candidate } = require("../config/sequelize");
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const moment = require('moment');
const {Sequelize} = require('sequelize');

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

// module.exports.getJobData = async (req, res) => {
//   const job_hash = req.params.id;

//   const job_id = decryptKey(job_hash);
  
//   if (job_id) {
//     console.log("Decrypted Job ID:", job_id);
//     res.status(200).json({ job_id });
//   } else {
//     res.status(400).json({ error: "Invalid job hash" });
//   }
// };

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
      qualifications:jobData.qualifications,
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
                department : job.department,
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
      if(!job_id){
        const check_unique = await Job.findOne({
          where : {
            socCode : req.body.formData.socCode,
            organisation_id : id,
          }
        })
        if(check_unique){
          return res.status(500).json({message : 'Job SOC code must be unique'});
        }
  
        const check_2 = await Job.findOne({
          where : {
            jobCode : req.body.formData.jobCode,
            organisation_id : id,
  
          }
        })
        if(check_2){
          return res.status(500).json({message : 'Job code must be unique'});
        }
  
      }
    
      if(job_id){
        const job = await Job.findOne({ where: { id: job_id  } });
        await job.update({
          jobDescription: req.body.content,
          ...req.body.formData,
        });
      }
      else{
        await Job.create({
          jobDescription: req.body.content,
          organisation_id : id,
          ...req.body.formData,
        })
      }
       
        return res.status(200).json({ message: "Job posted successfully" });
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
          const isClosed = job.jobClosingDate && moment(job.jobClosingDate).isBefore(moment()); 
        
            return {
                "id" : job.id,
                "Sl. No." : index+1,
                "SOC Code": job.socCode,
                "Job Title" : job.jobTitle,
                "Job Link": isClosed? 'Job Closed' : `${process.env.FRONTEND_URL}/careers/${hash}`,
                "Vacancy" : job.numVacancies,
                "Job Location": job.jobLocation,
                "Job Posted Date" : job.jobPostingDate,
                "Closing Date" : job.jobClosingDate,
                "Email" : job.email,
                "Phone No." :job.contactNumber,
                "Status" : "Posted",
                "Action" : "Edit",
                "Delete" : "Delete",
                "delete_route" : 'deleteJobPosted',
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

module.exports.deleteJobPosted = async (req, res) => {
  try {
    const organisation_id = req.params.id;
    const { job_id } = req.query;
    
    console.log('In delete Job ',organisation_id,job_id);
    const deletedCount = await Job.destroy({
      where: {
        organisation_id,
        id: job_id,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Job not found or already deleted' });
    }

    return res.status(200).json({ message: 'Job Deleted Successfully' });
  } catch (err) {
    console.log(err,' in job delete');
    return res.status(500).json({ message: 'Internal Server Error', error: err });
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
  const organisationId = parseInt(req.params.id.split('.')[0], 10);
  const job_id = parseInt(req.params.id.split('.')[1], 10);
  const email = req.params.id.split('.')[2];
  
  console.log("Parsed values:", { organisationId, job_id, email });
  
  const resumeFile = req.files?.resume ? req.files.resume[0].filename : null;
  const coverLetterFile = req.files?.coverLetter ? req.files.coverLetter[0].filename : null;

  const resumeUrl = resumeFile
    ? `${process.env.BACKEND_URL}/uploads/${organisationId}/JobCandidates/${job_id}/${email}/${resumeFile}`
    : null;

  const coverLetterUrl = coverLetterFile
    ? `${process.env.BACKEND_URL}/uploads/${organisationId}/JobCandidates/${job_id}/${email}/${coverLetterFile}`
    : null;

  try {
    const requestBody = typeof req.body === 'object' && req.body !== null ? req.body : {}; 
    console.log(requestBody);
    const candidate = await Candidate.create({
     organisation_id: organisationId,
     job_id,
  email, 
  coverLetter: coverLetterUrl,
  resume: resumeUrl,
  ...requestBody,  
});


    return res.status(200).json({ message: "Applied for job successfully", candidate });
  } catch (err) {
    console.error("Error applying for job:", err);

    if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ 
        message: "You have already applied for this job with this email." 
      });
    }

    return res.status(500).json({ message: "Internal server error", error: err });
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
            'View Letter' : candidate.offer_letter_url,
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

      if (status === "Job Offered") {
        const job = await Job.findOne({
          where : {
            id : candidate.job_id
          }
        });
        const org = await Organisation.findOne({
          where : {
            id : candidate.organisation_id
          }
        })
        try {
        const outputDir = path.join(__dirname, "../uploads", candidate.organisation_id.toString(),'JobCandidates',candidate.job_id.toString());
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        const filePath = path.join(outputDir, `OfferLetter_${candidate.id}.pdf`);
        // Create PDF
        const doc = new PDFDocument({ 
          margin: 50, 
          size: 'A4',
          bufferPages: true
        });

        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Helper function to draw table cell
        const drawTableCell = (text, x, y, width, height, options = {}) => {
          const defaultOptions = {
            align: 'left',
            valign: 'center',
            padding: 5,
            fontSize: 10,
            textColor: 'black',
            backgroundColor: null,
            border: true
          };

          const opts = { ...defaultOptions, ...options };

          if (opts.backgroundColor) {
            doc.fillColor(opts.backgroundColor)
               .rect(x, y, width, height)
               .fill();
          }

          if (opts.border) {
            doc.strokeColor('#cccccc')
               .lineWidth(0.5)
               .rect(x, y, width, height)
               .stroke();
          }

          doc.fillColor(opts.textColor)
             .fontSize(opts.fontSize);

          const textOptions = {
            width: width - (opts.padding * 2),
            align: opts.align,
            lineBreak: true
          };

          const textHeight = doc.heightOfString(text, textOptions);
          const textY = y + (height - textHeight) / 2;

          doc.text(text, x + opts.padding, textY, textOptions);
        };

        // Add logo and header
        if (org.Company_Logo) {
          const logoFilename = path.basename(org.Company_Logo);
          const logoPath = path.join(__dirname, `../uploads/${org.Company_name}/`, logoFilename);

          if (fs.existsSync(logoPath)) {
            doc.save()
               .circle(75, 75, 50)
               .clip()
               .image(logoPath, 25, 25, { width: 100, height: 100 })
               .restore();
          }
        }

        // Header
        doc.fontSize(16)
           .font('Helvetica-Bold')
           .text(org.Company_name.toUpperCase(), { align: 'center' })
           .fontSize(12)
           .font('Helvetica')
           .text(`${org.Address_Line1 || ''}`, { align: 'center' })
           .text(`${org.Address_City_County || ''}, ${org.Address_Country || ''}`, { align: 'center' })
           .moveDown()
           .fontSize(14)
           .font('Helvetica-Bold')
           .text('OFFER LETTER', { align: 'center' })
           .moveDown(2);

        // Date
        doc.fontSize(10)
           .font('Helvetica')
           .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' })
           .moveDown(2);

        // Candidate Details
        doc.font('Helvetica')
           .text(`Dear ${candidate.name},`)
           .moveDown()
           .text('We are pleased to offer you employment with our organization. The details of the offer are as follows:')
           .moveDown(2);

        // Job Details Table
        const startX = 50;
        let startY = doc.y;
        const colWidth = 250;
        const rowHeight = 30;

        // Table Headers
        drawTableCell(
          'Employment Details',
          startX,
          startY,
          colWidth * 2,
          rowHeight,
          {
            backgroundColor: '#f3c06b',
            textColor: 'black',
            fontSize: 12,
            align: 'center'
          }
        );

        startY += rowHeight;

        // Table Rows
        const details = [
          ['Position', job.jobTitle],
          ['Department', job.department],
          ['Location', job.jobLocation],
          ['Working Hours', `${job.workingHours} hours per week`],
          ['Contract Type', job.jobContractType],
          ['Salary Range', `${job.basicSalaryMin} - ${job.basicSalaryMax}`],
        ];

        details.forEach(([label, value]) => {
          drawTableCell(label, startX, startY, colWidth, rowHeight, { backgroundColor: '#fff9e6' });
          drawTableCell(value || 'N/A', startX + colWidth, startY, colWidth, rowHeight);
          startY += rowHeight;
        });

        doc.moveDown(2);

        // Terms and Conditions
        doc.font('Helvetica-Bold')
           .text('Terms and Conditions:', { underline: true })
           .moveDown()
           .font('Helvetica')
           .text([
             '1. This offer is subject to satisfactory reference checks and required documentation.',
             '2. Your employment will be governed by the company\'s policies and procedures.',
             '3. The notice period for resignation will be as per company policy.',
             '4. This offer is valid for 7 days from the date of issue.',
           ].join('\n\n'))
           .moveDown(2);

        // Signature Section
        doc.text('Please indicate your acceptance by signing and returning this letter.')
           .moveDown(3)
           .text('For ' + org.Company_name)
           .moveDown()
           .text(job.authorisingOfficer)
           .text(job.authorisingOfficerDesignation)
           .moveDown(2)
           .text('_______________________', { align: 'right' })
           .text('Candidate Signature', { align: 'right' });

        // Add page numbers
        let pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          doc.fontSize(8)
             .text(
               `Page ${i + 1} of ${pages.count}`,
               0,
               doc.page.height - 20,
               { align: 'center' }
             );
        }

        doc.end();

        // Wait for the file to be written
        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        // Update the offer letter URL in the database
        updateData.offer_letter_url =  `${process.env.BACKEND_URL}/uploads/${org.id}/JobCandidates/${candidate.job_id}/OfferLetter_${candidate.id}.pdf`;

        } catch (error) {
          console.error("Error generating offer letter:", error);
          return res.status(500).json({ message: "Error generating offer letter" });
        }
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