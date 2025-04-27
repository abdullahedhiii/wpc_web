import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const LeaveReportEmployee = () =>{
    const {isSideBarOpen} = useSidebarContext();
    const {companyData,fetchEmployeesLink,employees} = useCompanyContext();
  const[submitting,setSubmitting] = useState(false);
    const startYear = companyData[0]?.year_created || new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const [formData,setData] = useState({
        year : '',
        employee_code : ''
    })
    useEffect(() => {
        fetchEmployeesLink();
    },[]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    const [report,setReport] = useState([]);

    const handleView = async(e) => {
      setSubmitting(true);
      e.preventDefault();
       try{
          const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getLeaveReportEmployee`,{
            params : formData
          });
          setReport(response.data);
       }
       catch(err){

       }
       finally{
        setSubmitting(false);
       }
    };
    
    const columns = ['Sl No.','Employee Code','Employee Name','Leave Type','Date of Application','Date(s)','Duration (Days)','Status']

   return(
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
            View Employee Leave Report(date range)
          </motion.p>
        </div>
      </div>
      
    </div>
    <div className={`mt-16 mr-16 ml-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
      <form onSubmit={handleView}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-gray-700">
            Year
          </label>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
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

        <div>
          <label className="block text-[12px] font-medium text-gray-700">
            Employee Code
          </label>
          <select
            name="employee_code"
            value={formData.employee_code}
            onChange={handleInputChange}
            className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
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
<div className="flex space-x-3"> 
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
          onClick={handleView}
          disabled={submitting}
        >
          {submitting ? 'Generating...' : 'View'}
        </button>
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
          onClick={() => {
            setData({
                year :'',employee_code :''
            })
            setReport([])
          }}
        >
          Reset
        </button>
        
        </div></form>
</div>
<div className="p-16">
        <DataTable
          title="Employee Leave Report"
          fields={columns}
          data={report}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
        />
      </div>
</div>
   )

}

export default LeaveReportEmployee;