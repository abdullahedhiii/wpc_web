import { useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { motion } from 'framer-motion';
import { Upload, RefreshCw, Download, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const UploadAttendance = () => {
    const [file, setFile] = useState(null);
    const { isSideBarOpen } = useSidebarContext();
    const { companyData } = useCompanyContext();
    const [submitting, setSubmitting] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.name.split('.').pop().toLowerCase();
            if (fileType !== "csv") {
                alert("Only CSV files are allowed");
                setFile(null);
                event.target.value = "";
                return;
            }
            if (selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size must be less than 2MB");
                setFile(null);
                event.target.value = "";
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        setSubmitting(true);
        setErrorDetails(null);
        if (!file) {
            toast.error("Please select a file to upload");
            setSubmitting(false);
            return;
        }
        const formData = new FormData();
        formData.append("attendance", file);
        try {
            const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submitCSV/${companyData[0].id}`, formData);
            toast.success(response.data.message);
            // console.log(response.data.details);
            setErrorDetails(response.data.details);
        } catch (err) {
            
            toast.error(err.response.data.fileError? err.response.data.fileError : err.response.data.message);
            setErrorDetails(err.response.data.details);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setErrorDetails(null);
        document.getElementById("fileInput").value = "";
    };
    
    const handleDownloadSample = () => {
        const link = document.createElement("a");
        link.href = "/sample_documents/sample_attendance.csv";
        link.download = "sample_attendance.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Upload Attendance</h1>
                            <p className="text-yellow-100 text-sm">Upload employee attendance records</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                        isSideBarOpen ? "max-w-2xl" : "max-w-3xl"
                    }`}
                >
                    <div className="border-b border-gray-100 bg-yellow-50/50">
                        <div className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Upload className="w-5 h-5 text-yellow-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">Upload CSV File</h2>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-col items-center justify-center w-full">
                                    <label
                                        htmlFor="fileInput"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">CSV files only (Max. 2MB)</p>
                                        </div>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            className="hidden"
                                            onChange={handleChange}
                                            accept=".csv"
                                        />
                                    </label>
                                </div>

                                {file && (
                                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                        <FileText className="w-5 h-5 text-green-600" />
                                        <p className="text-sm text-green-700">{file.name}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center">
                                <button
                                    onClick={handleUpload}
                                    disabled={submitting}
                                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                                        submitting || !file
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"
                                    }`}
                                >
                                    <Upload className="w-4 h-4" />
                                    {submitting ? "Uploading..." : "Upload File"}
                                </button>

                                <button
                                    onClick={handleReset}
                                    disabled={submitting}
                                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                                        submitting
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-200"
                                    }`}
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Reset
                                </button>

                                <button
                                    onClick={handleDownloadSample}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Sample
                                </button>
                            </div>

                            {errorDetails && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <h3 className="font-semibold text-red-700">Error Details</h3>
                                    </div>
                                    <ul className="space-y-1 text-sm text-red-600">
                                        {Object.entries(errorDetails).map(([key, value]) => (
                                            <li key={key} className="flex gap-2">
                                                <span className="font-medium">{key}:</span>
                                                <span>{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UploadAttendance;