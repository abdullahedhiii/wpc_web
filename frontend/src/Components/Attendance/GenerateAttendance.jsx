import { useState, useEffect, useMemo } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useSidebarContext } from "../../contexts/SidebarContext";

const GenerateAttendance = () => {
  const { companyData, departmentData, designationData, shifts, employees } =
    useCompanyContext();
  const [attendance, setAttendance] = useState([]);

  const departmentOptions = useMemo(() => {
    return departmentData.map((ele) => ({ name: ele["Department Name"] }));
  }, [departmentData]);

  const [designationOptions, setDesignationOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [employeeCodes, setCodes] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    designation: "",
    employeeCode: "",
    fromDate: "",
    toDate: "",
    shift: "",
  });

  useEffect(() => {
    if (formData.department) {
      const filteredDesignations = designationData
        .filter(
          (designation) =>
            designation["Department Name"] === formData.department
        )
        .map((ele) => ({ name: ele["Designation"] }));
      setDesignationOptions(filteredDesignations);
    }
  }, [formData.department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.department && formData.designation) {
      const filteredShifts = shifts
        .filter(
          (ele) =>
            ele.Department === formData.department &&
            ele.Designation === formData.designation
        )
        .map((ele) => ({ name: ele["Shift Code"] }));
      setShiftOptions(filteredShifts);

      const filteredEmployees = employees
        .filter(
          (ele) =>
            ele.Department === formData.department &&
            ele.Designation === formData.designation
        )
        .map((ele) => ({ name: ele.employee_code }));
      setCodes(filteredEmployees);
    }
  }, [formData.department, formData.designation, shifts]);

  const handleGenerate = async () => {
    if(!formData.department || !formData.designation || !formData.employeeCode || !formData.fromDate || !formData.shift || !formData.toDate){
        window.alert('all fields are required');
        return;
    }
    try {
      console.log("sendingg ", formData);
      const response = await axiosInstance.get(
        `/api/getAttendance/${companyData[0].id}`,
        { params: { data: formData } }
      );
      console.log("response of attendance ", response.data);
      setAttendance(response.data);
    } catch (err) {
      console.log("error fetching attendance");
    }
  };
  
  const [totalPages,setTotalPages] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [dataToshow,setDataToShow] = useState([]);
  const per_page = 10;

  useEffect(() => {
       if(attendance.length > 0){
           const total = Math.ceil(attendance.length / per_page);
           setTotalPages(total);
           console.log('total pages ',total)
       }
  },[attendance]);
  

  useEffect(() => {
    const startIndex = (currentPage - 1) * per_page;
    const endIndex = startIndex + per_page;
    const currentData = attendance.slice(startIndex, endIndex);
    setDataToShow(currentData);
  }, [currentPage, attendance]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const {isSideBarOpen} = useSidebarContext();

  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Generate Attendance</span>
      </p>
      <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select a designation
              </option>
              {designationOptions.map((desig) => (
                <option key={desig.id} value={desig.name}>
                  {desig.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Code
            </label>
            <select
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled></option>
              {employeeCodes.map((dd) => (
                <option key={dd.id} value={dd.name}>
                  {dd.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-[12px] block font-medium text-gray-700">
              Shift
            </label>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="" disabled></option>
              {shiftOptions.map((shift) => (
                <option key={shift.id} value={shift.name}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={handleGenerate}
        >
          Go
        </button>
      </div>

      <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-cog text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-[15px] font-medium">
            Generate Attendance
          </h1>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-600 text-[12px] text-left">
                <th className="px-4 py-2">Sl No.</th>
                <th className="px-4 py-2">Employee Code</th>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Clock In</th>
                <th className="px-4 py-2">Clock In Location</th>
                <th className="px-4 py-2">Clock Out</th>
                <th className="px-4 py-2">Clock Out Location</th>
                <th className="px-4 py-2">Duty Hours</th>
              </tr>
            </thead>
            <tbody>
              {dataToshow.length > 0 ? (
                dataToshow.map((attend, index) => (
                  <tr key={index} className="text-[12px] text-gray-800">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{attend["Employee Code"]}</td>
                    <td className="px-4 py-2">{attend["Employee Name"]}</td>
                    <td className="px-4 py-2">{attend["Date"]}</td>
                    <td className="px-4 py-2">{attend["Clock In"]}</td>
                    <td className="px-4 py-2">{attend["Clock In Location"]}</td>
                    <td className="px-4 py-2">{attend["Clock Out"]}</td>
                    <td className="px-4 py-2">
                      {attend["Clock Out Location"]}
                    </td>
                    <td className="px-4 py-2">{attend["Duty hours"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end space-x-3 text-white text-[12px]">
                <button className={`w-10 h-10 rounded-full ${ currentPage === 1 ? "bg-gray-400 text-gray-600" :"bg-tt" }`} 
                onClick={handlePrevPage}>prev</button>
                <button className="w-10 h-10 rounded-full  bg-tt">{currentPage}</button>
                <button className={`w-10 h-10 rounded-full ${ currentPage === totalPages ? "bg-gray-400 text-gray-600" : "bg-tt"}`}
                     onClick={handleNextPage}
                >next</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateAttendance;
