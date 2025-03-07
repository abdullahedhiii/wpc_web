import React, { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { ChevronRight, Home } from 'lucide-react'

import TextEditor from "./TextEditor";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, useParams,Link} from "react-router-dom";

const JobPostingForm = () => {
  const {id} = useParams();
  const { isSideBarOpen } = useSidebarContext();
  const { companyData } = useCompanyContext();
  const [content, setContent] = useState("");
  const [jobs,setJobs] = useState([]);

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
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getJobsListed/${companyData[0].id}`);
        setJobs(response.data);
      } catch (err) {
      }
      finally{
        setLoading(false);
      }
    };
    if(!id) fetchJobsPosted();
  }, []); 

  useEffect(() => {
    if (!Array.isArray(jobs)) {
      setSocOptions([]); // Set an empty array if jobs is not an array
      return;
    }
  
    const options = jobs.length > 0 
      ? [{ label: "", value: "" }, ...jobs.map((ele) => ({
          value: ele["SOC CODE"], 
          label: ele["SOC CODE"]
        }))]
      : [];
  
    setSocOptions(options);
  
  }, [jobs]);
  

  useEffect(() => {
     const fetchJobDetail = async () =>{
        try{
            const response  = await axiosInstance.get(`/api/getJobDetails/${id}`);
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
     setContent(selected_job.jobDescription)
    }
 
  },[formData.socCode,formData.jobTitle]);

  const formFields = [
    {
      label: "SOC Code",
      type: "select",
      stateAttribute: "socCode",
      options: socCodeOptions,
      required : true

    },
    {
      label: "Job Title",
      type: "select",
      stateAttribute: "jobTitle",
      options: titleOptions,
      required : true

    },
    {
      label: "Department",
      type: "text",
      stateAttribute: "department",
      required : true

    },
    {
      label: "Job Code",
      type: "text",
      stateAttribute: "jobCode",
      required : true

    },
    {
      label: "Job Description",
      required : true

    },
    {
      label: "Job Type",
      type: "select",
      stateAttribute: "jobContractType",
      options: [
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Contractual", label: "Contractual" },
      ],
      required : true

    },
    {
      label: "Working Hours (Weekly)",
      type: "select",
      stateAttribute: "workingHours",
      options: 
        Array.from({ length: 80 }, (_, i) => ({
          value: (i + 1) * 0.5,
          label: (i + 1) * 0.5,
        })),
  
      required : true

    },
    {
      label: "Job Experience (Min)",
      type: "select",
      stateAttribute: "jobExperienceMin",
      options: 
        Array.from({ length: 16 }, (_, i) => ({
          value: i,
          label: i,
        })),
  
      required : true

    },
    {
      label: "Job Experience (Max)",
      type: "select",
      stateAttribute: "jobExperienceMax",
      options: 
        Array.from({ length: 16 }, (_, i) => ({
          value: i,
          label: i,
        })),
  
      required : true

    },

    {
      label: "Basic Salary (Min)",
      type: "text",
      stateAttribute: "basicSalaryMin",
      required : true

    },
    {
      label: "Basic Salary (Max)",
      type: "text",
      stateAttribute: "basicSalaryMax",
      required : true

    },
    {
      label: "Salary Period",
      type: "select",
      stateAttribute: "salaryPeriod",
      options: [
        { value: "annually", label: "Annually" },
        { value: "monthly", label: "Monthly" },
        { value: "weekly", label: "Weekly" },
      ],
      required : true

    },
    {
      label: "Number of Vacancies",
      type: "text",
      stateAttribute: "numVacancies",
      required : true

    },
    {
      label: "Job Location",
      type: "text",
      stateAttribute: "jobLocation",
      required : true

    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/addJobPosted/${companyData[0].id}`,
        { formData, content }
      );
      if (response.status === 200) navigate("/hrms/recruitment/job-posting");
    } catch (err) {
    }
  };

  return (
  
            <div className="m-12">

<nav className="flex items-center space-x-1 text-sm font-medium text-gray-500 mb-6">
        <Link to="/hrms/employeeDashboard" className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-600 transition-colors">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/hrms/recruitmentdashboard" className="text-gray-500 hover:text-yellow-600 transition-colors">
          Recruitment
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">Job Posting Form</span>
      </nav>

      <div
        className={`mt-4 border-t-4 border-yellow-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w-[1400px]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-yellow-900"></i>
          <h1 className="text-yellow-900 text-lg font-medium">Add Job Posting</h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />

        <form onSubmit={handleJobPost} className="p-4 mt-4">
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
                        required = {field.required}
                        className="mt-1 p-2 border rounded-md text-[14px] text-gray-600 focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                      >
                        <option value = '' disabled>Select </option>
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
                        required ={field.required}
                        className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4 "
                  required

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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                  required

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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
                  required

>
                  <option value="" diasbled></option>
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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
                  required

>
                  <option value="" diasbled></option>
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
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 text-[14px] ">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-2 text-[14px] ">
                    <input
                      type="radio"
                      name="gender"
                      value="male/female"
                      checked={formData.gender === "male/female"}
                      onChange={handleChange}
                    />
                    Both
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
                  className="p-2 border rounded-md text-[12px]  focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                  required

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
                  className="p-2 border text-[12px] rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                  required

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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
              
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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                
                  required
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
                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                  required

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
                  required

                  className="p-2 border rounded-md focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
                >
                  <option value="" diasbled className="text-[12px]">Select</option>
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
                  focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
                  required
               >
                  <option value="" className="text-[12px]" diasbled></option>
                  <option value="English Proficiency - Minimum of UKVI IELTS 4 or equivalent for international students only" 
                   className="text-[12px]">English Proficiency - Minimum of UKVI IELTS 4 or equivalent for international students only</option>
                  <option value="Not required"  className="text-[12px]">Not required</option>
                  <option value="Other"  className="text-[12px]">Others</option>

                </select>
              </div>
            </div>
          </div>

          <button
type="submit"
className="rounded mt-2 px-4 py-2 bg-yellow-900 text-white"
          >
            Submit
          </button>
        </form> 
      </div>      

    </div> 
  );
};

export default JobPostingForm;
