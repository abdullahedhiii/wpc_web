import { useState, useEffect, useMemo } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const GenerateAttendance = () => {
  const { companyData, departmentData, designationData, shifts, employees } = useCompanyContext();
  const [attendance, setAttendance] = useState([]);

  const departmentOptions = useMemo(() => {
    return departmentData.map((ele) => ({ name: ele['Department Name'] }));
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
      const filteredDesignations = designationData.filter(
        (designation) => designation['Department Name'] === formData.department
      ).map((ele) => ({ name: ele['Designation'] }));
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
        .map((ele) => ({ name: ele['Shift Code'] }));
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
    try {
      const response = await axiosInstance.get(`/api/getAttendance/${companyData[0].id}`, { params: { data: formData } });
      console.log('response of attendance ', response.data);
      setAttendance(response.data);
    }
    catch (err) {
      console.log('error fetching attendance');
    }
  };

  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Generate Attendance</span>
      </p>
      <div className="mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 max-w-[1200px] mx-auto">
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Form Fields */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400  rounded-md"
              required
            >
              <option value=""></option>
              {departmentOptions.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value=""></option>
              {designationOptions.map((desig) => (
                <option key={desig.id} value={desig.name}>
                  {desig.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">Employee Code</label>
            <select
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value=""></option>
              {employeeCodes.map((dd) => (
                <option key={dd.id} value={dd.name}>
                  {dd.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">From Date</label>
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
            <label className="block text-[12px] font-medium text-gray-700">To Date</label>
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
            <label className="text-[12px] block font-medium text-gray-700">Shift</label>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value=""></option>
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

      <div className="mt-8 border-t-4 border-blue-600 rounded shadow-md p-2 max-w-[1200px] mx-auto">
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
              {attendance.length > 0 ? (
                attendance.map((attend, index) => (
                  <tr key={index} className="text-[12px] text-gray-800">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{attend['Employee Code']}</td>
                    <td className="px-4 py-2">{attend['Employee Name']}</td>
                    <td className="px-4 py-2">{attend['Date']}</td>
                    <td className="px-4 py-2">{attend['Clock In']}</td>
                    <td className="px-4 py-2">{attend['Clock In Location']}</td>
                    <td className="px-4 py-2">{attend['Clock Out']}</td>
                    <td className="px-4 py-2">{attend['Clock Out Location']}</td>
                    <td className="px-4 py-2">{attend['Duty hours']}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-2 text-center text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenerateAttendance;
