import React, { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";

import TextEditor from "./TextEditor";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const JobPostingForm = () => {
  const {id} = useParams();
  const { isSideBarOpen } = useSidebarContext();
  const { companyData } = useCompanyContext();
  const [content, setContent] = useState("");
  const [jobs,setJobs] = useState();

  const [formData, setFormData] = useState({
    job_id: -1,
    jobType : "",
    jobCode: "",
    jobContractType: "",
    socCode: "",
    department: "",
    jobTitle: "",
    status: "Posted",
    workingHours: 0,
    jobExperienceMin: 0,
    jobExperienceMax: 0,
    basicSalaryMin: 0,
    basicSalaryMax: 0,
    salaryPeriod: "",
    numVacancies: 0,
    jobLocation: "",
    qualifications: "",
    skillSet: "",
    ageMin: 15,
    ageMax: 15,
    gender: '',
    newRole : "",
    language : "",
    jobPostingDate: '',
    jobClosingDate: '',
    authorisingOfficer : '',
    authorisingOfficerDesignation : '',
    contactNumber: '',
    email :''
  });

  const [socCodeOptions,setSocOptions] = useState([]);
  const [titleOptions,setTitleOptions] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchJobsPosted = async () => {
      try {
        const response = await axiosInstance.get(`/api/getJobsListed/${companyData[0].id}`);
        setJobs(response.data);
        console.log('response of jobs ',response.data);
        const options = [{label : "",value : ""},...response.data.map((ele) =>({
            value: ele['SOC CODE'], 
            label: ele['SOC CODE']
          }))];
        setSocOptions(options);
      } catch (err) {
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    };
    if(!id) fetchJobsPosted();
  }, []); 

  useEffect(() => {
   console.log('form data changed ',formData);
  },[formData]);

  useEffect(() => {
     const fetchJobDetail = async () =>{
        try{
            const response  = await axiosInstance.get(`/api/getJobDetails/${id}`);
            console.log('rresponse of detail ',response.data);
            setFormData(response.data);
            setContent(response.data.jobDescription)
            setSocOptions([{label : response.data.socCode, value : response.data.socCode}]);
            setTitleOptions([{label : response.data.jobTitle, value : response.data.jobTitle}]);

        }
        catch(err){

        }
        finally{
          setLoading(false)
        }
     };
      if(id){
       fetchJobDetail();
     }
  },[]);

  useEffect(() => {
    if (!id && formData.socCode) {
      const filteredTitles = [{label : "",value: ""},...jobs
        .filter((ele) => ele['SOC CODE'] === formData.socCode)
        .map((ele) => ({
          value: ele['Job Title'], 
          label: ele['Job Title']
        }))];
      setTitleOptions(filteredTitles);
    }
  }, [formData.socCode, jobs]);  
  
  useEffect(() => {
    if(!id && Array.isArray(jobs) && formData.socCode && formData.jobTitle){
     const selected_job = jobs.find((ele) => ele['SOC CODE'] === formData.socCode && ele['Job Title'] === formData.jobTitle);
     setFormData((prev) => ({
        ...prev,
        job_id : selected_job.id
     }));
     console.log('selected job ',selected_job);
     setContent(selected_job.jobDescription)
    }
 
  },[formData.socCode,formData.jobTitle]);

  const formFields = [
    {
      label: "SOC Code",
      type: "select",
      stateAttribute: "socCode",
      options: socCodeOptions,
    },
    {
      label: "Job Title",
      type: "select",
      stateAttribute: "jobTitle",
      options: titleOptions,

    },
    {
      label: "Department",
      type: "text",
      stateAttribute: "department",
    },
    {
      label: "Job Code",
      type: "text",
      stateAttribute: "jobCode",

    },
    {
      label: "Job Description",
    },
    {
      label: "Job Type",
      type: "select",
      stateAttribute: "jobContractType",
      options: [
        { value: "", label: "" },
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Contractual", label: "Contractual" },
      ],
    },
    {
      label: "Working Hours (Weekly)",
      type: "select",
      stateAttribute: "workingHours",
      options: [
        { value: "", label: "" },
        ...Array.from({ length: 80 }, (_, i) => ({
          value: (i + 1) * 0.5,
          label: (i + 1) * 0.5,
        })),
      ],
    },
    {
      label: "Job Experience (Min)",
      type: "select",
      stateAttribute: "jobExperienceMin",
      options: [
        { value: "", label: "" },
        ...Array.from({ length: 16 }, (_, i) => ({
          value: i,
          label: i,
        })),
      ],
    },
    {
      label: "Job Experience (Max)",
      type: "select",
      stateAttribute: "jobExperienceMax",
      options: [
        { value: "", label: "" },
        ...Array.from({ length: 16 }, (_, i) => ({
          value: i,
          label: i,
        })),
      ],
    },
    {
      label: "Basic Salary (Min)",
      type: "text",
      stateAttribute: "basicSalaryMin",
    },
    {
      label: "Basic Salary (Max)",
      type: "text",
      stateAttribute: "basicSalaryMax",
    },
    {
      label: "Salary Period",
      type: "select",
      stateAttribute: "salaryPeriod",
      options: [
        { value: "", label: "" },
        { value: "annually", label: "Annually" },
        { value: "monthly", label: "Monthly" },
        { value: "weekly", label: "Weekly" },
      ],
    },
    {
      label: "Number of Vacancies",
      type: "text",
      stateAttribute: "numVacancies",
    },
    {
      label: "Job Location",
      type: "text",
      stateAttribute: "jobLocation",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('here to change name,value ',name,value,formData)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    console.log(content, formData);
    try {
      const response = await axiosInstance.post(
        `/api/addJobPosted/${companyData[0].id}`,
        { formData, content }
      );
      if (response.status === 200) navigate("/hrms/recruitment/job-posting");
    } catch (err) {
      console.log("error posting job list");
    }
  };

  return (
    loading ? (<p>loading...</p>)
        : 
            <div className="m-12">

      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Job List
        <span className="mx-2 text-tt">/ New Job Posting</span>
      </p>

      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w-[1400px]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">Add Job Posting</h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />

        <div className="p-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formFields.map((field, index) => (
              <React.Fragment key={index}>
                {field.label === "Job Description" ? (
                  <div className="col-span-full mt-4">
                    <label className="text-[12px] font-semibold text-gray-600 mb-2">
                      {field.label}
                    </label>
                    <TextEditor content={content} setContent={setContent} />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <label className="text-[12px] font-semibold text-gray-600 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.stateAttribute}
                        value={formData[field.stateAttribute]}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md text-[14px] text-gray-600 focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                      >
                        {field.options.map((option, i) => (
                          <option
                            key={i}
                            value={option.value}
                            className="text-[12px]"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.stateAttribute}
                        value={formData[field.stateAttribute]}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                        readOnly = {field.readOnly}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-tt mb-4">
              Desired Candidate Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Qualifications
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4 "
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Skill Set
                </label>
                <input
                  type="text"
                  name="skillSet"
                  value={formData.skillSet}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Age (Min)
                </label>
                <select
                  name="ageMin"
                  value={formData.ageMin}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                >
                  <option value=""></option>
                  {Array.from({ length: 21 }, (_, i) => i + 15).map((age) => (
                    <option key={age} value={age}  className="text-[12px]">
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Age (Max)
                </label>
                <select
                  name="ageMax"
                  value={formData.ageMax}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                >
                  <option value=""></option>
                  {Array.from({ length: 21 }, (_, i) => i + 15).map((age) => (
                    <option key={age} value={age} className="text-[12px]">
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-[14px] ">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 text-[14px] ">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Job Posting Date
                </label>
                <input
                  type="date"
                  name="jobPostingDate"
                  value={formData.jobPostingDate}
                  onChange={handleChange}
                  className="p-2 border rounded-md text-[12px]  focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Closing Date
                </label>
                <input
                  type="date"
                  name="jobClosingDate"
                  value={formData.jobClosingDate}
                  onChange={handleChange}
                  className="p-2 border text-[12px] rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Authorising Officer
                </label>
                <input
                  type="text"
                  name="authorisingOfficer"
                  value={formData.authorisingOfficer}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Authorising Officer’s Designation
                </label>
                <input
                  type="text"
                  name="authorisingOfficerDesignation"
                  value={formData.authorisingOfficerDesignation}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Is this a new role
                </label>
                <select
                  name="newRole"
                  value={formData.newRole}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                >
                  <option value="" className="text-[12px]"></option>
                  <option value="Yes"  className="text-[12px]">Yes</option>
                  <option value="No"  className="text-[12px]">No</option>

                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  Language Requirments
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="p-2 border rounded-md text-[14px] 
                  focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                >
                  <option value="" className="text-[12px]"></option>
                  <option value="English Proficiency - Minimum of UKVI IELTS 4 or equivalent for international students only" 
                   className="text-[12px]">English Proficiency - Minimum of UKVI IELTS 4 or equivalent for international students only</option>
                  <option value="Not required"  className="text-[12px]">Not required</option>
                  <option value="Other"  className="text-[12px]">Others</option>

                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleJobPost}
            className="rounded mt-2 px-4 py-2 bg-blue-900 text-white"
          >
            Submit
          </button>
        </div> 
      </div>      

    </div> 
  );
};

export default JobPostingForm;
