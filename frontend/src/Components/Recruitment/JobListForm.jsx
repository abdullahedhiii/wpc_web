import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";

import TextEditor from "./TextEditor";
import axiosInstance from "../../../axiosInstance";
import { data, useNavigate } from "react-router-dom";

const JobListForm = () => {
  const { isSideBarOpen } = useSidebarContext();
  const {companyData} = useCompanyContext();
  const [content, setContent] = useState("");
  const [jobsListed,setListed] = useState([]);
  useEffect(( ) => {
         const fetchListed = async() => {
                 try{
                  const response = await axiosInstance.get(`/api/getJobsListed/${companyData[0].id}`);
                  setListed(response.data);
                 }
                 catch(err){

                 }
         };
         fetchListed();
  },[]);
  const formFields = [
    {
      label: "Job Type",
      type: "select",
      stateAttribute: "jobType",
      options: [
        { value: "Existing", label: "Existing" },
        { value: "New", label: "New" },
      ],
      required : true,
    },
    {
      label: "SOC Code",
      type: "text",
      stateAttribute: "socCode",
      required : true

    },
    {
      label: "Department",
      type: "text",
      stateAttribute: "department",
      required : true

    },
    {
      label: "Job Title",
      type: "text",
      stateAttribute: "jobTitle",
      required : true
    },
  ];

  const [formData, setFormData] = useState({
    jobType: "",
    socCode: "",
    department: "",
    jobTitle: "",
    status : "Listed"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   
  const navigate = useNavigate();
  const handleJobPost = async(e) => {
    e.preventDefault();
    if(jobsListed.find((ele) => ele['SOC CODE'].toLowerCase() === formData.socCode.toLowerCase() )){
      alert('SOC Code must be unique, job with this code exists');
      return;
    }
    else if(jobsListed.find((ele) => ele.department.toLowerCase() === formData.department.toLowerCase() 
      && ele["Job Title"].toLowerCase() === formData.jobTitle.toLowerCase())){
       alert('A job with this title is already listed,try updating');
       return;
      }
    try{
       const response = await axiosInstance.post(`/api/addJobListed/${companyData[0].id}`,{formData,content});
       if(response.status === 200)
          navigate('/hrms/recruitment/job-list');
    }
    catch(err){
    }
  }

  return (
    <div className="m-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Job List
        <span className="mx-2 text-tt">/ New Job List</span>
      </p>

      <div
        className={`mt-4 border-t-4 border-yellow-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w-[1400px]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-yellow-900"></i>
          <h1 className="text-yellow-900 text-lg font-medium">Add Job List</h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />

        <div className="p-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.stateAttribute}
                    value={formData[field.stateAttribute]}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400  hover:border-b-4"
                  >
                    <option disabled value =''>Select</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
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
                    className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-yellow-400 focus:border-b-4 hover:border-yellow-400 hover:border-b-4"
                     required = {field.required}
                    />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-[12px] font-semibold text-gray-600 ">
              Job Descriptions
            </label>
            <TextEditor 
               content={content}
               setContent={setContent}
            />
          </div>

            <button onClick={handleJobPost} className="rounded mt-2 px-4 py-2 bg-yellow-900 text-white">submit </button>

        </div>

      </div>
    </div>
  );
};

export default JobListForm;
