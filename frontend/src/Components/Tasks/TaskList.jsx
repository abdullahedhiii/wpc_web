import { useState,useEffect} from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";

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
            const tasks = await axiosInstance.get(`/api/getTasks`,{
                params : formData
            });
            console.log(tasks.data);
            setData(tasks.data);
        }
        catch(err){

        }
    }
    return (
        <div className="p-12">
          <p className="text-[12px] text-gray-600">
            Home
            <span className="mx-2">/</span>
            Employee
            <span className="mx-2 text-tt">/ Task List</span>
          </p>
          <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  Employee Code
                </label>
                <select
                  name="employee_code"
                  value={formData.employee_code}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                  required
                />
              </div>
    
            </div>
            <div className="flex space-x-4">
            <button
              className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
              onClick={handleView}
            >
              View Tasks
            </button>        
            </div>
         
          </div>

          <div className="mt-8">
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