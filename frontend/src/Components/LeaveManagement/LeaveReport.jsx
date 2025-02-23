import { useCompanyContext } from "../../contexts/CompanyContext";
import { useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";

const LeaveReport = () => {
    const { companyData } = useCompanyContext();
    const [year, setYear] = useState(2025);
    const { isSideBarOpen } = useSidebarContext();

    // Get starting year from company data (fallback to current year if undefined)
    const startYear = companyData[0]?.year_created || new Date().getFullYear();
    const currentYear = new Date().getFullYear();

    const handleGenerate = async () => {
        try{
           const response  = await axiosInstance.get(`/api/getCompleteLeaveReport/${companyData[0].id}`,{
            params : {year}
           });
           const pdfUrl = response.data.url;
           if (pdfUrl) {
               window.open(pdfUrl, "_blank");
           }        
    }
        catch(err){

        }
    }
    return (
        <div className="p-8">
            <p className="text-sm text-gray-500">
                Home <span className="mx-2 text-blue-600">/ Leave Report</span>
            </p>

            <div className={`mt-6 border-l-4 border-yellow-600 bg-white rounded-lg shadow-md p-6 ${isSideBarOpen ? "max-w-[1200px]" : "max-w-[1300px]"}`}>
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-semibold">Choose Year</label>
                    <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="w-64 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 transition"
                    >
                        <option value="">Choose Year</option>
                        {Array.from({ length: currentYear - startYear + 1 }, (_, i) => (
                            <option key={i} value={startYear + i}>
                                {startYear + i}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                  className="rounded-xl text-white text-[12px] px-2 py-2 bg-yellow-400 mt-4"
                  onClick={handleGenerate}
                >

                    View Report
                </button>
            </div>
        </div>
    );
}

export default LeaveReport;
