import { useEffect, useMemo, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";

const AbsentReport = () => {
  const {
    fetchEmployeesLink,
    fetchDepartments,
    fetchDesignations,
    employees,
    departmentData,
    designationData,
    companyData
  } = useCompanyContext();

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
    fetchEmployeesLink();
  }, []);
  //    console.log(departmentData,designationData,employees);
  const [formData, setFormData] = useState({
    department_id: "",
    designation_id: "",
    year : "",
    employee_code: "",
  });
  const startYear = companyData[0]?.year_created || new Date().getFullYear();
  const currentYear = new Date().getFullYear()

  const [filteredDesignations, setFiltered] = useState([]);
  const [employeeCodes, setCodes] = useState([]);

  useEffect(() => {
    if (formData.department_id) {
      const filteredDesignations = designationData
        .filter(
          (designation) => designation.department_id === parseInt(formData.department_id)
        );
        console.log(filteredDesignations);
      setFiltered(filteredDesignations);
    }
  }, [formData.department_id]);

  useEffect(() => {
    if (formData.department_id && formData.designation_id) {
      const filteredEmployees = employees
        .filter(
          (ele) =>
            ele.Department_id === parseInt(formData.department_id) &&
            ele.Designation_id === parseInt(formData.designation_id)
        )
        .map((ele) => ({ name: ele.employee_code }));
      setCodes(filteredEmployees);
    }
  }, [formData.department_id, formData.designation_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [attendance, setAttendance] = useState([]);

  const handleGenerate = async () => {
     try{
         const response = await axiosInstance.get(`/api/absentReport`,
            {
                params : formData
            }
         );
         setAttendance(response.data)
     }
     catch(err){

     }

  };
  
  const {isSideBarOpen} = useSidebarContext();
  const columns = ['Employee Code','Employee Name','No. of working days','Month','No. of Present days','No. of absent days','Leaves Taken','No. of days salary deducted']
  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Daily Attendance</span>
      </p>
      <div
        className={`mt-4 border-t-4 border-yellow-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"
        } `}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Department
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departmentData.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept["Department Name"]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Designation
            </label>
            <select
              name="designation_id"
              value={formData.designation_id}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select a designation
              </option>
              {filteredDesignations.map((desig) => (
                <option key={desig.id} value={desig.id}>
                  {desig['Designation']}
                </option>
              ))}
            </select>
          </div>

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
              <option value="" disabled>
                Select Employee
              </option>
              {employeeCodes.map((dd) => (
                <option key={dd.id} value={dd.name}>
                  {dd.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select Year
              </option>
                {Array.from({ length: currentYear - startYear + 1 }, (_, i) => (
                    <option key={i} value={startYear + i}>
                        {startYear + i}
                    </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
            onClick={handleGenerate}
          >
            View
          </button>
          <button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
            onClick={() => {
              setFormData({
                department: "",
                designation: "",
                employeeCode: "",
                date: "",
              });
              setAttendance([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-8">
        <DataTable
          title="Process Attendance"
          fields={columns}
          data={attendance}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        />
      </div>
    </div>
  );
};

export default  AbsentReport;