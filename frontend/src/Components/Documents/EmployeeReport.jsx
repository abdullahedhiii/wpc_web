import { useState, useEffect } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { FileText, User, Download, AlertCircle } from 'lucide-react';

const EmployeeReport = () => {
  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const { companyData, fetchEmployeesLink, employees } = useCompanyContext();
  const { isSideBarOpen } = useSidebarContext();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    employee_code: "",
    document_type: "",
  });
  
  useEffect(() => {
    fetchEmployeesLink();
  }, []);

  const fetchDocuments = async () => {
    if (!formData.employee_code) return;
    
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getEmployeeDocuments/${formData.employee_code}`);
      setDocuments(response.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.employee_code) {
      fetchDocuments();
    } else {
      setDocuments([]);
    }
  }, [formData.employee_code]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleView = async (e) => {
    e.preventDefault();
    
    if (!formData.document_type) {
      return;
    }
  
    const selectedDoc = documents.find(doc => doc.document_type === formData.document_type);
  
    if (selectedDoc && selectedDoc.document_url) {
      setIsLoading(true);
      try {
        window.open(selectedDoc.document_url, "_blank");
      } catch (err) {
        console.error("Error opening document:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Employee Documents</h1>
              <p className="text-yellow-100 text-sm">View and download employee documents</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden ${
            isSideBarOpen ? "max-w-2xl" : "max-w-3xl"
          }`}
        >
          <div className="border-b border-gray-100 bg-yellow-50/50">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Select Employee and Document</h2>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Employee
                  </label>
                  <select
                    name="employee_code"
                    value={formData.employee_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.employee_code} value={employee.employee_code}>
                        {`${employee['Employee Name']} (${employee.employee_code})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Document Type
                  </label>
                  <select
                    name="document_type"
                    value={formData.document_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                    disabled={!formData.employee_code || documents.length === 0}
                  >
                    <option value="" disabled>Select document type</option>
                    {documents.map((doc, index) => (
                      <option key={index} value={doc.document_type}>
                        {doc.document_type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {documents.length === 0 && formData.employee_code && !isLoading && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm text-yellow-700">No documents found for this employee</p>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-end"
              >
                <button
                  onClick={handleView}
                  disabled={!formData.document_type || isLoading}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                    !formData.document_type || isLoading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  {isLoading ? "Opening..." : "View Document"}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeReport;
