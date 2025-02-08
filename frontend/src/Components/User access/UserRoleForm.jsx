import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useModuleContext } from "../../contexts/ModuleContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";


const UserRoleForm = () => {
    const navigate = useNavigate();
    const {isSideBarOpen} = useSidebarContext();
    const {modules} = useModuleContext();
    const {companyData} = useCompanyContext();
    const [featureOptions,setOptions] = useState([]);
    const [moduleOptions, setModuleOptions] = useState([]);
    const [users,setUsers] = useState([]);

    const fetchUsers = async () => {
      try{
           const response  = await axiosInstance.get(`/api/getUsers/${companyData[0].id}`);
           setUsers(response.data);
      }
      catch(err){

      }
    }

    useEffect(() => {
      fetchUsers()
    },[]);

    useEffect(() => {
      const allSubModules = modules.flatMap(module => module.subModules);
      setModuleOptions(allSubModules);
    }, [modules]);

    const [formData,setFormData] = useState({
      module : 0,
      feature : '',
      email : '',
      right : ''
    });
    
    useEffect(() => {
        if (formData.module) {
          const m = moduleOptions.find((ele) => ele.id === parseInt(formData.module));
          if (m) {
            setOptions(m.features || []);
          }
        } else {
          setOptions([]); 
        }
      }, [formData.module, modules]);
      

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
      ...prev,
      [name]: value,
      }));
    };
    
    const handleSubmit = async (e) => {
       console.log('submit hjit ',formData);
       try{
          const response = await axiosInstance.post(`/api/grantRights`,formData);
          navigate('/hrms/role/view-users-role');
       }
       catch(err){

       }
    };

    return(
        <>
        <div className="p-12">
        <p className="text-[10px] text-gray-600">
          Home
          <span className="mx-2">/</span>
          Role Management
          <span className="mx-2 text-tt">/ User Configuration</span>
        </p>
        <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
        <div className="p-2 flex items-center space-x-2">
            <i className="pl-2 fas fa-user text-[14px]  text-blue-900"></i>
            <h2 className="text-[14px] font-semibold text-blue-900">Add User Role</h2>
        </div>
  
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Select Module
              </label>
              <select
                name="module"
                value={formData.module}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Module
                </option>
                {moduleOptions.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Menu
              </label>
              <select
                name="feature"
                value={formData.feature}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Menu
                </option>
                {featureOptions.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Rights
              </label>
              <select
                name="right"
                value={formData.right}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Nothing selected
                </option>
                <option value="add">add</option>
                <option value="edit">edit</option>

              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-700">
                Select User ID
              </label>
              <select
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Nothing selected
                </option>
                {users.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.Email}
                  </option>
                ))}
              </select>
            </div>
        </div>
        <button onClick={handleSubmit} className="text-white ml-4 px-2 py-1 bg-blue-700 rounded-md mb-2">Submit</button>
  
  
  </div>
  </div>
        </>
      );
}

export default UserRoleForm;