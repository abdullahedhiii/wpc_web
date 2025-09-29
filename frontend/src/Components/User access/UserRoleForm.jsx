import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useModuleContext } from "../../contexts/ModuleContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Settings, UserPlus, UserCog, Save, CheckCircle, Loader2 } from 'lucide-react';
import {motion} from 'framer-motion';
import { useParams } from 'react-router-dom';

const UserRoleForm = () => {
    const navigate = useNavigate();
    const {isSideBarOpen} = useSidebarContext();
    const {modules} = useModuleContext();
    const {companyData} = useCompanyContext();
  // const [moduleOptions,setModuleOptions] = useState([]);
    const [featureOptions,setOptions] = useState([]);
    const [moduleOptions, setModuleOptions] = useState([]);
    const [subModuleOptions, setSubModuleOptions] = useState([]);
    const [users,setUsers] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitting,setSubmitting] = useState(false);
    const fetchUsers = async () => {
      try{
           const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getUsers/${companyData[0].id}`);
           setUsers(response.data);
      }
      catch(err){
          // console.error("Error fetching users:", err);
      }
    }

    useEffect(() => {
      fetchUsers()
    },[]);

    const [formData,setFormData] = useState({
      module : 0,
      submodule: 0,
      feature : 0,
      email : '',
      right : 'add'
    });

    useEffect(() => {
      const filteredModules = modules
        .filter(module => !["Settings", "Holiday", "Rota", "Tasks"].includes(module.name))
        // .map(module => ({
        //   ...module,
        //   subModules: module.subModules?.filter(subModule => !["Time Shift Management", "Archive"].includes(subModule.name))
        // }));
     // const allSubModules = filteredModules.flatMap(module => module.subModules || []);
     // setModuleOptions(allSubModules);
     setModuleOptions(filteredModules);
    }, [modules]);
    
    
    useEffect(() => {
      setSubModuleOptions([]);
      setOptions([]); // Reset features when module changes
      if (formData.module) {
        const selectedModule = modules.find(module => module.id == formData.module);
        if (selectedModule && selectedModule.subModules) {
          const validSubModules = selectedModule.subModules.filter(subModule => subModule && subModule.id && subModule.name);
          setSubModuleOptions(validSubModules);
          // Auto-select if only one submodule
          if (validSubModules.length === 1) {
            setFormData(prev => ({ ...prev, submodule: validSubModules[0].id }));
          } else {
            setFormData(prev => ({ ...prev, submodule: '' }));
          }
        } else {
          setSubModuleOptions([]);
          setFormData(prev => ({ ...prev, submodule: '' }));
        }
      } else {
        setSubModuleOptions([]);
        setFormData(prev => ({ ...prev, submodule: '' }));
      }
    }, [formData.module, modules]);
    
    useEffect(() => {
      setOptions([]);
      if (formData.submodule) {
        const selectedSubModule = subModuleOptions.find(subModule => subModule.id == formData.submodule);
        if (selectedSubModule && selectedSubModule.features) {
          const validFeatures = selectedSubModule.features.filter(feature => feature && feature.id && feature.name);
          setOptions(validFeatures);
          // Auto-select if only one feature
          if (validFeatures.length === 1) {
            setFormData(prev => ({ ...prev, feature: validFeatures[0].id }));
          } else {
            setFormData(prev => ({ ...prev, feature: '' }));
          }
        } else {
          setOptions([]);
          setFormData(prev => ({ ...prev, feature: '' }));
        }
      } else {
        setOptions([]);
        setFormData(prev => ({ ...prev, feature: '' }));
      }
    }, [formData.submodule, subModuleOptions]);


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
      ...prev,
      [name]: value,
      }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      setSubmitting(true);
       try{
          const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/grantRights`,formData);
          navigate('/hrms/role/view-users-role');
       }
       catch(err){
          alert(err.response?.data?.message || 'An error occurred');
       }
       finally{
        setSubmitting(false);
       }
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Role Management</h1>
              <p className="text-yellow-100 text-sm">
                Manage roles of employees within your organisation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
  
    
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
                        <div className="border-b border-gray-100 bg-yellow-50/50">
              <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <UserPlus className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Add User Role
                  </h2>
                </div>
              </div>
            </div>
    <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Module
                  </label>
                  <select
                    name="module"
                    value={formData.module}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Select Module</option>
                    {moduleOptions.map((module) => (
                      <option key={module.id} value={module.id}>
                        {module.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Sub Module
                  </label>
                  <select
                    name="submodule"
                    value={formData.submodule}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Select Sub Module</option>
                    {subModuleOptions.map((subModule) => (
                      <option key={subModule.id} value={subModule.id}>
                        {subModule.name}
                      </option>
                    ))}
                  </select>
                </div>
                                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Menu
                  </label>
                  <select
                    name="feature"
                    value={formData.feature}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required = {featureOptions.length > 0}
                  >
                    <option value="" disabled>Select Feature</option>
                    {featureOptions.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
    
                                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rights
                  </label>
                  <select
                    name="right"
                    value={formData.right}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Select Rights</option>
                    <option value="add">Add</option>
                    <option value="edit">Edit</option>
                  </select>
                </div>
     */}
                                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select User ID
                  </label>
                  <select
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required 
                  >
                    <option value="" disabled>Select User</option>
                    {users.map((e) => (
                      <option key={e.id} value={e.Email}>
                        {e.Email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
    
                            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex justify-end"
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {submitting ? 'Saving...' : 'Save Configuration'}
                </button>
              </motion.div>
            </div>
            </form>
          </motion.div>
    
                    {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>User role configuration saved successfully!</span>
            </motion.div>
          )}
        </div>
      </div>
    );
}

export default UserRoleForm;