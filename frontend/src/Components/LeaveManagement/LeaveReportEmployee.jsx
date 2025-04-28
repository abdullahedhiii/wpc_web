import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { motion } from 'framer-motion';
import { CalendarCheck, User, RefreshCw, Search } from 'lucide-react';

const LeaveReportEmployee = () => {
    const { isSideBarOpen } = useSidebarContext();
    const { companyData, fetchEmployeesLink, employees } = useCompanyContext();
    const [submitting, setSubmitting] = useState(false);
    const startYear = companyData[0]?.year_created || new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const [formData, setData] = useState({
        year: '',
        employee_code: ''
    });
    useEffect(() => {
        fetchEmployeesLink();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [report, setReport] = useState([]);

    const handleView = async (e) => {
        setSubmitting(true);
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getLeaveReportEmployee`, {
                params: formData
            });
            setReport(response.data);
        }
        catch (err) {
        }
        finally {
            setSubmitting(false);
        }
    };

    const columns = ['Sl No.', 'Employee Code', 'Employee Name', 'Leave Type', 'Date of Application', 'Date(s)', 'Duration (Days)', 'Status'];

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
                            <h1 className="text-2xl font-bold text-white">Leave Report</h1>
                            <p className="text-yellow-100 text-sm">View Employee Leave Report (date range)</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${isSideBarOpen ? "max-w-3xl" : "max-w-4xl"}`}
                >
                    <form onSubmit={handleView} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Year</label>
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                                    required
                                >
                                    <option value="">Choose Year</option>
                                    {Array.from({ length: currentYear - startYear + 1 }, (_, i) => (
                                        <option key={i} value={startYear + i}>
                                            {startYear + i}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Employee Code</label>
                                <select
                                    name="employee_code"
                                    value={formData.employee_code}
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
                        </div>
                        <div className="flex flex-wrap gap-3 justify-end">
                            <button
                                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${submitting ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"}`}
                                type="submit"
                                disabled={submitting}
                            >
                                <Search className="w-4 h-4" />
                                {submitting ? 'Generating...' : 'View'}
                            </button>
                            <button
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                                type="button"
                                onClick={() => {
                                    setData({ year: '', employee_code: '' });
                                    setReport([]);
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
                    className={`bg-white rounded-xl shadow-lg overflow-x-auto ${isSideBarOpen ? "max-w-5xl" : "max-w-6xl"}`}
                >
                    <div className="flex items-center gap-2 pl-6 pt-6">
                        <CalendarCheck className="w-5 h-5 text-yellow-700" />
                        <h1 className="text-yellow-900 text-[15px] font-medium">Employee Leave Report</h1>
                    </div>
                    <div className="p-6">
                        <DataTable
                            title="Employee Leave Report"
                            fields={columns}
                            data={report}
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
}

export default LeaveReportEmployee;