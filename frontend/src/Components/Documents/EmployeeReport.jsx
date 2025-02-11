import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { useLocation } from "react-router-dom";

const EmployeeReport = () => {
  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const { companyData, employees } = useCompanyContext();
  const { isSideBarOpen } = useSidebarContext();
  console.log(employees);
  const [formData, setFormData] = useState({
    employee_code: "",
    document_type: "",
  });
  
  const fetchDocuments = async(req,res) => {
     try{
       const response = await axiosInstance.get(`/api/getEmployeeDocuments/${formData.employee_code}`);
       setDocuments(response.data);
       console.log(response.data);
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
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Employee {location.pathname.includes('employee-archive-report') && "Archive "}Report</span>
      </p>
      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled></option>
              {employees?.map((dd, index) => (
                <option key={index} value={dd.employee_code}>
                  {dd.employee_code}
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
        </div>
        <button 
          className="text-[12px] p-2 ml-4 mb-2 rounded-md text-white bg-blue-700"
          onClick={handleView}  
        >
          View Document
          
        </button>
      </div>
    </div>
  );
};

export default EmployeeReport;
