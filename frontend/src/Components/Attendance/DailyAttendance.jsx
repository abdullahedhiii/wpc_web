import { useState, useMemo, useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { motion } from 'framer-motion';
import { CalendarDays, User, RefreshCw } from 'lucide-react';

const DailyAttendance = () => {
    const { isSideBarOpen } = useSidebarContext();
    const columns = ['Sl No.','Department','Designation','Employee Code','Employee Name','Date','Clock In','Clock Out','Location','Duty Hours'];
    const [attendance, setAttendance] = useState([]);
    const { companyData, employees, departmentData, designationData, fetchEmployeesLink, fetchDepartments, fetchDesignations } = useCompanyContext();
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        fetchEmployeesLink();
    }, []);

    const [formData, setFormData] = useState({
        date: '',
        employeeCode: ''
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
        if (!formData.employeeCode || !formData.date) {
            window.alert('All fields are required');
            setSubmitted(false);
            return;
        }
        setAttendance([]);
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getDailyAttendance`, { params: { data: formData } });
            setAttendance(response.data);
        } catch {
        } finally {
            setSubmitted(false);
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
                            <CalendarDays className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Daily Attendance</h1>
                            <p className="text-yellow-100 text-sm">View Employee Daily Attendance</p>
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
                                <h2 className="text-lg font-semibold text-gray-800">Select Employee and Date</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleGenerate} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
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
                                <CalendarDays className="w-4 h-4" />
                                {submitted ? 'Generating...' : 'View'}
                            </button>
                            <button
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                                type="button"
                                onClick={() => {
                                    setFormData({ employeeCode: '', date: '' });
                                    setAttendance([]);
                                }}
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reset
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
                        <CalendarDays className="w-5 h-5 text-yellow-700" />
                        <h1 className="text-yellow-900 text-[15px] font-medium">Attendance Results</h1>
                    </div>
                    <div className="p-6">
                        <DataTable
                            title="Daily Attendance"
                            fields={columns}
                            data={attendance}
                            showEntries
                            searchable
                            downloadable={false}
                            addMore={false}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DailyAttendance;