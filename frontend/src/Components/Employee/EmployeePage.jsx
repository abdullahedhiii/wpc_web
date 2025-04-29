import { useState, useEffect, useRef } from "react"
import axiosInstance from "../../../axiosInstance"
import { useCompanyContext } from "../../contexts/CompanyContext"
import { motion } from "framer-motion"
import { FaUserPlus, FaEllipsisV } from "react-icons/fa"
import { Link } from "react-router-dom"

const EmployeePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { companyData } = useCompanyContext()

  const hasFetched = useRef(false)
  useEffect(() => {
    const fetchEmployees = async () => {
      if (hasFetched.current) return
      hasFetched.current = true

      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/api/getEmployeePage/${companyData[0].id}`,
        )
        setEmployeeDetails(response.data)
      } catch (error) {
        setEmployeeDetails([])
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const handleDownloadPDF = async(employee_code) => {
     const routee = `${import.meta.env.VITE_API_URL}/api/getEmployeePDF/${employee_code}`;
     try {
      const response = await axiosInstance.get(routee);
      if (response.data.url) {
        window.open(response.data.url, "_blank"); 
      } 
    } catch (err) {
      alert('Network error downloading pdf',err);
    }
  }

  const filteredEmployees = employeeDetails.filter(
    (employee) =>
      employee.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_code?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5 shadow-md">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg"
            >
              Employees
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-base mt-1"
            >
              View Organisation's Employees
            </motion.p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full px-5 py-3 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white shadow-sm text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/hrms/addemployee"
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-colors duration-200 text-base"
          >
            <FaUserPlus className="text-lg" />
            <span>Add New Employee</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No employees found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-yellow-200 hover:shadow-2xl transition-shadow duration-200 group"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 flex justify-between items-center">
                      <span className="text-white font-semibold tracking-wide text-base">ID: {employee.employee_code}</span>
                    </div>

                    <div className="p-6 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden border-4 border-yellow-200 shadow-md">
                        {employee.Picture ? (
                          <img
                            src={employee.Picture}
                            alt={employee.employee_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-yellow-500 text-3xl font-bold">
                            {employee.employee_name?.charAt(0) || "E"}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-xl truncate">{employee.employee_name}</h3>
                        <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full shadow-sm">
                          {employee.designation || "Employee"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-yellow-100 p-4 bg-yellow-50 flex flex-col sm:flex-row justify-between items-center gap-2">
                      <Link
                        to={`/hrms/addEmployee/${employee.employee_code}`}
                        className="flex items-center gap-1 text-yellow-700 hover:text-yellow-900 font-semibold transition-colors text-base"
                      >
                        <FaEllipsisV className="text-sm" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDownloadPDF(employee.employee_code)}
                        className="flex items-center gap-1 text-yellow-700 hover:text-yellow-900 font-semibold transition-colors text-base"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Download PDF
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EmployeePage

