import { useState, useEffect, useMemo } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { motion } from 'framer-motion';
import { CalendarCheck, User, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const GenerateAttendance = () => {
  const { companyData, fetchDepartments, fetchDesignations, fetchEmployeesLink, departmentData, designationData, employees } = useCompanyContext();
  const [attendance, setAttendance] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    fetchDepartments();
  }, []);

  const [formData, setFormData] = useState({
    employeeCode: "",
    fromDate: "",
    toDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!formData.employeeCode || !formData.fromDate || !formData.toDate) {
      toast.error('All fields are required');
      setSubmitted(false);
      return;
    }
    const t = new Date(formData.fromDate);
    const w = new Date(formData.toDate);
    if (w < t) {
      toast.error('Enter valid from and to dates!');
      setSubmitted(false);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/getAttendance/${companyData[0].id}`,
        { params: { data: formData } }
      );
      setAttendance(response.data);
    } catch (err) {
    } finally {
      setSubmitted(false);
    }
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToshow, setDataToShow] = useState([]);
  const per_page = 10;

  useEffect(() => {
    if (attendance.length > 0) {
      const total = Math.ceil(attendance.length / per_page);
      setTotalPages(total);
    }
  }, [attendance]);

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

  const { isSideBarOpen } = useSidebarContext();

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
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Generate Attendance</h1>
              <p className="text-yellow-100 text-sm">View Attendance (date range)</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden ${isSideBarOpen ? "max-w-2xl" : "max-w-4xl"}`}
        >
          <div className="border-b border-gray-100 bg-yellow-50/50">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Select Employee and Date Range</h2>
              </div>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Employee Code</label>
                <select
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                >
                  <option value="" disabled>Select Employee</option>
                  {employees.map((dd) => (
                    <option key={dd.employee_code} value={dd.employee_code}>
                      {`${dd['Employee Name']} (${dd.employee_code})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${submitted ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"}`}
                type="submit"
                disabled={submitted}
              >
                <CalendarCheck className="w-4 h-4" />
                {submitted ? 'Generating...' : 'Go'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white rounded-xl shadow-lg overflow-x-auto ${isSideBarOpen ? "max-w-3xl" : "max-w-6xl"}`}
        >
          <div className="flex items-center gap-2 pl-6 pt-6">
            <CalendarCheck className="w-5 h-5 text-yellow-700" />
            <h1 className="text-yellow-900 text-[15px] font-medium">Attendance Results</h1>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="min-w-full">
              <thead>
                <tr className="text-gray-600 text-[12px] text-left">
                  <th className="px-4 py-2">Sl No.</th>
                  <th className="px-4 py-2">Employee Code</th>
                  <th className="px-4 py-2">Employee Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Clock In</th>
                  {/* <th className="px-4 py-2">Clock In Location</th> */}
                  <th className="px-4 py-2">Clock Out</th>
                 <th className="px-4 py-2">Location</th>
                  {/* <th className="px-4 py-2">Clock Out Location</th> */}
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
                      {/* <td className="px-4 py-2">{attend["Clock In Location"]}</td> */}
                      <td className="px-4 py-2">{attend["Clock Out"]}</td>
                      <td className="px-4 py-2">{attend["Location"]}</td>
                      {/* <td className="px-4 py-2">{attend["Clock Out Location"]}</td> */}
                      <td className="px-4 py-2">{attend["Duty hours"]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-2 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end space-x-3 text-white text-[12px]">
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === 1 ? "bg-gray-400 text-gray-600" : "bg-yellow-400"}`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-400 text-gray-900">{currentPage}</span>
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === totalPages ? "bg-gray-400 text-gray-600" : "bg-yellow-400"}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateAttendance;
