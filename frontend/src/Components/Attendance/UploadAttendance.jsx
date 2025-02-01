import { useState } from "react";
import {useSidebarContext} from "../../contexts/SidebarContext";
import {useCompanyContext} from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

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
        console.log("Uploading file:", file);
        const formData = new FormData();
        formData.append("attendance", file);
        try{
             const response = await axiosInstance.post(`/api/submitCSV/${companyData[0].id}`,formData);
        }
        catch(err){

        }
    }

    const handleReset = () => {
        setFile(null);
        document.getElementById("fileInput").value = "";
    };

    return (
        <div className="p-12">
            <p className="text-[12px] text-gray-600">
                Home
                <span className="mx-2 text-tt">/ Upload Attendance</span>
            </p>
            <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-6 ${isSideBarOpen ? "max-w-[1200px]" : "max-w-[1300px]"}`}>
                <input 
                    type="file" 
                    onChange={handleChange} 
                    id = "fileInput"
                />
                <p>* CSV Size Less Than 2MB</p>
                <div className="mt-4 space-x-2">
                    <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
                    <button onClick={handleReset} className="px-4 py-2 bg-blue-600 text-white rounded">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default UploadAttendance;