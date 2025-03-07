import { useState } from "react";
import {useSidebarContext} from "../../contexts/SidebarContext";
import {useCompanyContext} from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const UploadAttendance = () => {
    const [file, setFile] = useState(null);
    const {isSideBarOpen} = useSidebarContext();
    const {companyData} = useCompanyContext();

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
        if (!file) {
            alert("Please select a file to upload");
            return;
        }
        const formData = new FormData();
        formData.append("attendance", file);
        try{
             const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submitCSV/${companyData[0].id}`,formData);
             alert(response.data.message);
        }
        catch(err){
        alert(err.message );
        }
    }

    const handleReset = () => {
        setFile(null);
        document.getElementById("fileInput").value = "";
    };
    const handleDownloadSample = () => {
        const sampleData = [
          ["Employee Code", "Shift Code", "Date", "Clock in", "Clock out", "Clock in location", "Clock out location"],
          ["MAR-001", "SHIFT-001", "2-1-2025", "08:00 AM", "17:00 PM", "Office", "Office"],
          ["MAR-002", "SHIFT-002", "3-1-2025", "09:00 AM", "18:00 PM", "Remote", "Remote"],
        ];
    
        let csvContent =
          "data:text/csv;charset=utf-8," +
          sampleData.map((e) => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sample_attendance.csv");
        document.body.appendChild(link);
        link.click();
      };
    return (
    
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col items-center">
              <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 w-full py-6 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white"
                  >
                    Upload Attendance
                  </motion.h1>
                </div>
              </div>
        
              <div
                className={`mt-12 border-t-4 border-yellow-600 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center ${
                  isSideBarOpen ? "w-[700px]" : "w-[900px]"
                }`}
              >
                <label className="text-lg font-semibold text-gray-700 mb-2">Upload CSV File</label>
                <input
                  type="file"
                  onChange={handleChange}
                  id="fileInput"
                  required
                  className="mb-2 p-2 border border-gray-300 rounded-lg w-full max-w-md"
                />
                <p className="text-sm text-gray-500">* CSV Size Less Than 2MB</p>
        
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition"
                  >
                    Upload
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleDownloadSample}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    Download Sample File
                  </button>
                </div>
              </div>
            </div>
          );
};

export default UploadAttendance;