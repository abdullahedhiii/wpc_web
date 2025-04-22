import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { useLocation } from "react-router-dom";
import {motion} from 'framer-motion';

const EmployeeReport = () => {
  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const { companyData,fetchEmployeesLink, employees } = useCompanyContext();
  const { isSideBarOpen } = useSidebarContext();

  const [formData, setFormData] = useState({
    employee_code: "",
    document_type: "",
  });
  
  useEffect(() => {
   fetchEmployeesLink();
  },[]);
  const fetchDocuments = async(req,res) => {
     try{
       const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getEmployeeDocuments/${formData.employee_code}`);
       setDocuments(response.data);
     }
     catch(err){

     }
  };

  useEffect(() =>{
    if(formData.employee_code != ""){
            fetchDocuments();
            setDocuments([])
    }
  },[formData.employee_code]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleView = (e) => {
    e.preventDefault();
    
    if (!formData.document_type) {
      alert("Please select a document type.");
      return;
    }
  
    const selectedDoc = documents.find(doc => doc.document_type === formData.document_type);
  
    if (selectedDoc && selectedDoc.document_url) {
      window.open(selectedDoc.document_url, "_blank"); 
    } else {
      alert("Document not found.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Employee Report
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            View Documents of Employee
          </motion.p>
        </div>
      </div>
      
    </div>
      <div
        className={`mt-16 mr-16 ml-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-[800px]" : "w[1300px]"
        } `}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Code
            </label>
            <select
              name="employee_code"
              value={formData.employee_code}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled></option>
              {employees.map((dd) => (
                <option key={dd.employee_code} value={dd.employee_code}>
                  {`${dd['Employee Name']} (${dd.employee_code})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Document
            </label>
            <select
              name="document_type"
              value={formData.document_type}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" ></option>
              {documents?.map((dd, index) => (
                <option key={index} value={dd.document_type}>
                  {dd.document_type}
                </option>
              ))}
            </select>
          </div>
          { documents.length === 0 ? <p>No employee documents have been uploaded</p> : null}

        </div>
        <button 
        disabled = {documents.length === 0}
          className="text-[12px] p-2 ml-4 mb-2 rounded-md text-white bg-yellow-700"
          onClick={handleView}  
        >
          View Document
          
        </button>
      </div>
    </div>
  );
};

export default EmployeeReport;
