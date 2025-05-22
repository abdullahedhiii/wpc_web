import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion';
import { UserCog, Mail, Lock, Save, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const UserForm = () => {
  const navigate = useNavigate();
  const {isSideBarOpen} = useSidebarContext();
  const {id} = useParams();
  const {employees,fetchEmployeesLink,companyData} = useCompanyContext();
  const [submitting,setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData,setFormData] = useState({
    employee_code:'',
    employee_name : '',
    email : '',
    password: '',
  });

  useEffect(() => {
    fetchEmployeesLink();
  },[]);
  
  useEffect(() => {

  })
  const fetchUser = async(req,res) => {
      try{
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getUserData/${id}`);
        setFormData(response.data);
        console.log(response.data)
     
      }
      catch(err){

      }
  };
  
  useEffect(() => {
    if(id) fetchUser();
  },[]);

  useEffect(() => {
    if (!id && formData.employee_code) {
      const emp = employees.find((ele) => ele.employee_code == formData.employee_code);
      if (emp) {
        setFormData((prev) => ({
          ...prev,
          employee_code: emp.employee_code,
          employee_name: emp['Employee Name']
        }));
      }
    }
  }, [formData.employee_code, id, employees]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setSubmitting(true);
    if (formData.password.length < 8){
      toast.error('The password should be of length 8 or more');
      setSubmitting(false);
      return;
    }
    try{

        const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/createUser/${companyData[0].id}`,formData);
        toast.success(response.data.message)
        navigate('/hrms/role/vw-users');
        
     }
     catch(err){
        toast.error(err.response.data.message|| 'An error occured');
     }
     finally{
      setSubmitting(false);
     }
  };

  const handleDelete = async(id) => {
    try {
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/deleteUser/${id}`,{
        company_id: companyData[0].id
      });
      navigate('/hrms/role/vw-users');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
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
          <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employee Code
                </label>
                <select
                  name="employee_code"
                  value={formData.employee_code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                >
                  <option value="" disabled>Select Employee Code</option>
                  {employees.map((emp) => !emp.has_account && (
                    <option key={emp.id} value={emp.employee_code}>
                      {emp.employee_code}
                    </option>
                  ))}
                </select>
              </div>
  
                            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employee Name
                </label>
                <input
                  type="text"
                  name="employee_name"
                  value={formData.employee_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                  readOnly
                />
              </div>
  
                            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>
              </div>
  
                            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  User Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>
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
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              {id && (
                <button
                  onClick={() => handleDelete(id)}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 ml-4"
                >
                  <i className="la la-trash w-4 h-4" />
                  Delete User
                </button>
              )}
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
            <span>Role updated successfully!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserForm;