
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

  // Filter employees based on search term
  const filteredEmployees = employeeDetails.filter(
    (employee) =>
      employee.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_code?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header Section - Kept as is */}
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

      {/* Employee Cards Section */}
      <div className="p-4 md:p-8 lg:p-16">
        {/* Search and Add Employee Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/hrms/addemployee"
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <FaUserPlus />
            <span>Add New Employee</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No employees found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-yellow-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">ID: {employee.employee_code}</span>
                        <button className="text-white hover:bg-yellow-600 rounded-full p-1">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden mr-4 border-2 border-yellow-300">
                        {employee.picture ? (
                          <img
                            src={employee.picture || "/images/user-image.png"}
                            alt={employee.employee_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-yellow-500 text-2xl font-bold">
                            {employee.employee_name?.charAt(0) || "E"}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{employee.employee_name}</h3>
                        <p className="text-gray-600 text-sm">{employee.designation || "Employee"}</p>
                      </div>
                    </div>
                    <div className="border-t border-yellow-100 p-4 bg-yellow-50">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-gray-700 truncate">{employee.email || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Mobile</p>
                          <p className="text-gray-700">{employee.mobile || "N/A"}</p>
                        </div>
                      </div>
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

