import { useCompanyContext } from "../../contexts/CompanyContext";
import { useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { motion } from 'framer-motion';
import { CalendarCheck, Download } from 'lucide-react';

const LeaveReport = () => {
    const { companyData } = useCompanyContext();
    const [year, setYear] = useState(2025);
    const { isSideBarOpen } = useSidebarContext();
    const [submitting, setSubmitting] = useState(false);

    const startYear = companyData[0]?.year_created || new Date().getFullYear();
    const currentYear = new Date().getFullYear();

    const handleGenerate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCompleteLeaveReport/${companyData[0].id}`, {
                params: { year }
            });
            const pdfUrl = response.data.url;
            if (pdfUrl) {
                window.open(pdfUrl, "_blank");
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setSubmitting(false);
        }
    }
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
                            <p className="text-yellow-100 text-sm">View Employee Leave Report (year wise)</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${isSideBarOpen ? "max-w-2xl" : "max-w-3xl"}`}
                >
                    <form onSubmit={handleGenerate} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-gray-700 font-semibold">Choose Year</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-64 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 hover:bg-gray-50 transition"
                                required
                            >
                                <option value="" disabled>Choose Year</option>
                                {Array.from({ length: currentYear - startYear + 1 }, (_, i) => (
                                    <option key={i} value={startYear + i}>
                                        {startYear + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${submitting ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"}`}
                                type="submit"
                                disabled={submitting}
                            >
                                <Download className="w-4 h-4" />
                                {!submitting ? 'View Report' : 'Generating...'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default LeaveReport;
