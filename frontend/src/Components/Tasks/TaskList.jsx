import { useState,useEffect} from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';
const TaskList = () => {
    const columns = [
        'Sl No','Employee Name','Date','From Time','To Time',
        'Task Performed','Task Update','Uploaded File'
    ]
    const [data,setData] = useState([]);
    const { companyData, employees }  = useCompanyContext();
    const {isSideBarOpen} = useSidebarContext();
    
    const [formData,setFormData] = useState({
        employee_code : '',
        fromDate : '',
        toDate : ''
    });
    
       const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        };
      
    
    const handleView = async (e) => {
        e.preventDefault();
        setData([]);
        try{
            const tasks = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getTasks`,{
                params : formData
            });
            setData(tasks.data);
        }
        catch(err){

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
              Task Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Track Employee Task Progress
            </motion.p>
          </div>
        </div>
        
      </div>
          <div className={`ml-16 mt-16 mr-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${isSideBarOpen ? "w-[800px]" : "w[1300px]"} `}>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    
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
                  <option value="" disabled></option>
                  {employees.map((dd,index) => (
                    <option key={index} value={dd.employee_code}>
                      {dd.employee_code}
                    </option>
                  ))}
                </select>
              </div>
    
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
                  required
                />
              </div>
    
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
                  required
                />
              </div>
    
            </div>
            <div className="flex space-x-4">
            <button
              className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
              onClick={handleView}
            >
              View Tasks
            </button>        
            </div>
         
          </div>

          <div className="p-16">
          <DataTable 
          title="Tasks"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
      
        />
      </div>

    </div>
    );
};


export default TaskList;