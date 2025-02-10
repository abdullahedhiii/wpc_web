import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

const AddInterviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: "",
    form_name: "",
    scaling: "",
    industry: "",
    status: "",
    capstone_title : '',
    capstone_weightage : '',
    cognitive_factor : '',
    cognitive_weightage: ''
  });
  const { companyData} = useCompanyContext();

  const [jobs,setJobs] = useState([]);
  const fetchCandidates = async () => {
    try{
       const response = await axiosInstance.get(`/api/getJobsOpen/${companyData[0].id}`);
       console.log(response.data.jobs);
       setJobs(response.data.jobs);
    }
    catch(err){
        console.log(err);
    }
};

useEffect(() => {
      fetchCandidates();
},[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
       e.preventDefault();
       try{
          await axiosInstance.post(`/api/addForm`,formData);
          navigate("/recruitment/interview-forms");
       }
       catch(err){

       }
  };

  const { isSideBarOpen } = useSidebarContext();
  return (
    <>
      <div className="p-12">
        <p className="text-[10px] text-gray-600">
          Home
          <span className="mx-2 text-tt">
            / Interview Forms / New Interview Form
          </span>
        </p>
        <div
          className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
            isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"
          } `}
        >
          <div className="p-2 flex items-center space-x-2">
            <i className="pl-2 fas fa-briefcase text-[14px]  text-blue-900"></i>
            <h2 className="text-[14px] font-semibold text-blue-900">
              Add Interview Form
            </h2>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Job Position
              </label>
              <select
                name="job_position"
                value={formData.position}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled></option>
                {Array.isArray(jobs) && jobs.length > 0
      ? jobs.map((ele) => (
          <option key={ele.id} value={ele.id}>
            {ele.jobTitle}
          </option>
        ))
      : null}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Form Name
              </label>
              <input
                type="text"
                name="form_name"
                value={formData.form_name}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Scaling
              </label>
              <input
                type="number"
                name="scaling"
                value={formData.scaling}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Industry
                </option>
                <option value="002- Fitted Q&A">002- Fitted Q&A</option>
                <option value="003- Care Homes">003- Care Homes</option>
                <option value="099- PostVisa Q&A">099- PostVisa Q&A</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="InActive">Inactive</option>
              </select>
            </div>
</div>
            <div class="flex items-center my-4">
              <div class="flex-grow border-t-2 border-blue-400"></div>
              <span class="px-4 text-xl text-gray-600 font-semibold">Capstones</span>
              <div class="flex-grow border-t-2 border-blue-400"></div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Capstone Title
              </label>
              <input
                type="text"
                name="capstone_title"
                value={formData.capstone_title}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Weightage%
              </label>
              <input
                type="number"
                name="capstone_weightage"
                value={formData.capstone_weightage}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>
            </div>
            <div class="flex items-center my-4">
              <div class="flex-grow border-t-2 border-blue-400"></div>
              <span class="px-4 text-xl text-gray-600 font-semibold">Cognitive Abilitiy</span>
              <div class="flex-grow border-t-2 border-blue-400"></div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Factor Name
              </label>
              <input
                type="text"
                name="cognitive_factor"
                value={formData.cognitive_factor}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Weightage%
              </label>
              <input
                type="number"
                name="cognitive_weightage"
                value={formData.cognitive_weightage}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              />
            </div>
</div>

<button
            onClick={handleSubmit}
            className="text-white ml-4 px-2 py-1 bg-blue-700 rounded-md mb-2"
          >
            Submit
          </button>
          </div>
        </div>
    </>
  );
};

export default AddInterviewForm;
