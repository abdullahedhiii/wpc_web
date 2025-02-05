
import { useEffect, useState } from "react"
import ApplicationForm from "./ApplicationForm"
import { useParams } from "react-router-dom"
import axios from "axios";

export default function JobForm() {
  const [showApplication, setShowApplication] = useState(false)
  const {id} = useParams();
  const [jobData,setJobData] = useState({});
  useEffect(() => {
      const fetchJobDetails = async() => {
          try{
              const response = await axios.get(`/api/getJobData/${id}`);
              setJobData(response.data);
          }
          catch(err){
              console.log('error getting job data ',jobData);
          }
      }
      fetchJobDetails();
  },[]);

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
  
  
  if (showApplication) {
    console.log('showing form ',jobData);
    return <ApplicationForm onBack={() => setShowApplication(false)} job_id={jobData.job_id} jobTitle={jobData.jobTitle} organisation_id = {jobData.organisation_id} />
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto p-6 bg-[#FFF4F4] shadow-lg rounded-lg">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-600">{jobData.company}</h1>
          <div className="text-sm text-gray-500">
            <span>Job Title - {jobData.jobTitle}</span>
            <span className="mx-2">|</span>
            <span>Code: {jobData.code}</span>
          </div>
          <div className="text-sm text-gray-500">Experience: {jobData.experience}</div>
        </div>

        <div className="space-y-4">
  <section>
    <h2 className="text-lg font-semibold mb-2">Job Description / Responsibilities:</h2>
    <p 
      className="text-gray-700 text-sm leading-relaxed" 
      dangerouslySetInnerHTML={{ __html: jobData.description }}
    />
  </section>


          <section>
            <h2 className="text-lg font-semibold mb-2">Educational Qualification:</h2>
            <p className="text-gray-700">{jobData.qualifications}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Skill Set:</h2>
            <p className="text-gray-700 text-sm">{jobData.skillSet}</p>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section>
              <h2 className="text-lg font-semibold mb-2">Job Type:</h2>
              <p className="text-gray-700">{jobData.jobType}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Working Hours:</h2>
              <p className="text-gray-700">{jobData.workingHours}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Gender:</h2>
              <p className="text-gray-700">{jobData.gender}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Language Requirements:</h2>
              <p className="text-gray-700">{jobData.languageRequirements}</p>
            </section>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-2">Salary:</h2>
            <p className="text-gray-700">{jobData.salary}</p>
          </section>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={() => setShowApplication(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

