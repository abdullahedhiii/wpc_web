import { useCompanyContext } from "../../contexts/CompanyContext";
import { useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const LeaveReport = () => {
    const { companyData } = useCompanyContext();
    const [year, setYear] = useState(2025);
    const { isSideBarOpen } = useSidebarContext();

    const startYear = companyData[0]?.year_created || new Date().getFullYear();
    const currentYear = new Date().getFullYear();

    const handleGenerate = async () => {
        try{
           const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCompleteLeaveReport/${companyData[0].id}`,{
            params : {year}
           });
           console.log(pdfUrl,'From backend')
           const pdfUrl = response.data.url;
           if (pdfUrl) {
               window.open(pdfUrl, "_blank");
           }        
    }
        catch(err){
             console.log(err);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Leave Report
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-yellow-100 text-sm"
              >
                View Employee Leave Report(year wise)
              </motion.p>
            </div>
          </div>
          
        </div>

            <div className={`mt-16 mr-16 ml-16 border-l-4 border-yellow-600 bg-white rounded-lg shadow-md p-6 ${isSideBarOpen ? "max-w-[1200px]" : "max-w-[1300px]"}`}>
                <form onSubmit={handleGenerate}>
                <div className="flex flex-col space-y-2">
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
                <button
                  className="rounded-xl text-white text-[12px] px-2 py-2 bg-yellow-400 hover:bg-yellow-500 mt-4"
                  type="submit"
                >

                    View Report
                </button>
                </form>
            </div>
            
        </div>
    );
}

export default LeaveReport;
