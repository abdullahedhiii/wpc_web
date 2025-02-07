import { useState, useEffect, useRef } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";

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
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4 text-[12px]">
        Home /<span className="text-tt px-3"> Employee</span>
      </p>

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
  );
};

export default EmployeePage;
