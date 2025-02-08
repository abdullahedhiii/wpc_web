import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const {isSideBarOpen} = useSidebarContext();
  const {id} = useParams();
  const {employees,companyData} = useCompanyContext();
  const [formData,setFormData] = useState({
    employee_code: '',
    employee_name : '',
    email : '',
    password: '',
  });
  
  const fetchUser = async(req,res) => {
      try{
        const response = await axiosInstance.get(`/api/getUserData/${id}`);
        setFormData(response.data);
      }
      catch(err){

      }
  };
  
  useEffect(() => {
    if(id) fetchUser();
  },[]);

  useEffect(() => {
      const emp = employees.find((ele) => ele.employee_code == formData.employee_code);
      if(emp){
         setFormData((prev) => ({
        ...prev,
        employee_name : emp['Employee Name']
      }))
      }
     
  },[formData.employee_code]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async(e) =>{
     console.log(formData);
     try{
        const response = await axiosInstance.post(`/api/createUser/${companyData[0].id}`,formData);
        navigate('/hrms/role/vw-users');
        
     }
     catch(err){

     }
  };

  return(
      <>
      <div className="p-12">
      <p className="text-[10px] text-gray-600">
        Home
        <span className="mx-2 text-tt">/ User Configuration</span>
      </p>
      <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
      <div className="p-2 flex items-center space-x-2">
          <i className="pl-2 fas fa-user text-[14px]  text-blue-900"></i>
          <h2 className="text-[14px] font-semibold text-blue-900">Add User Configuration</h2>
      </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Code
            </label>
            <select
              name="employee_code"
              value={formData.employee_code}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled>
                
              </option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_code}>
                  {emp.employee_code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              name="employee_name"
              value={formData.employee_name}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border bg-gray-200 focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
              readOnly = {true}
           />
                 
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
           />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              User Password
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
           />
               
          </div>
      </div>
      <button onClick={handleSubmit} className="text-white ml-4 px-2 py-1 bg-blue-700 rounded-md mb-2">Submit</button>


</div>
</div>
      </>
    );
}

export default UserForm;