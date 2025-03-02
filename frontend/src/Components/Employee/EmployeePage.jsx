import { useState, useEffect, useRef } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';
const EmployeePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState(true); 
  const {companyData} = useCompanyContext();
  const columns = [
    "Employee ID",
    "Employee Name",
    "DOB",
    "Mobile",
    "Email",
    "Designation",
    "Nationality",
    "NI Number",
    "Visa Expired",
    "Passport No.",
    "Address.",
    "Action"
  ];


  const hasFetched = useRef(false); 
  useEffect(() => {
    const fetchEmployees = async () => {
      if (hasFetched.current) return; 
      hasFetched.current = true;

      try {
        const response = await axiosInstance.get(`/api/getEmployeePage/${companyData[0].id}`); 
        setEmployeeDetails(response.data); 
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployeeDetails([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
    {/* Header Section */}
    <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Employees 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            View Organisation's Employees
          </motion.p>
        </div>
      </div>
      </div>
<div className = 'p-16'>
        <DataTable
          title="Employee"
          fields={columns}
          data={employeeDetails ? employeeDetails : []}
          showEntries
          searchable
          downloadable={false}
          addMore={true}
          icon="far fa-user"
          buttonTitle="Add New Employee"
          isDashboard={true}
        />
    </div>
    </div>
  );
};

export default EmployeePage;
