import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";


const LeaveReportEmployee = () =>{
    const {isSideBarOpen} = useSidebarContext();
    const {companyData,fetchEmployeesLink,employees} = useCompanyContext();
  
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

    const handleView = async() => {
       try{
          const response = await axiosInstance.get(`/api/getLeaveReportEmployee`,{
            params : formData
          });
          setReport(response.data);
       }
       catch(err){

       }
    };
    
    const columns = ['Sl No.','Employee Code','Employee Name','Leave Type','Date of Application','Date(s)','Duration (Days)','Status']

   return(
    <div className="p-12">
    <p className="text-[12px] text-gray-600">
      Home
      <span className="mx-2">/</span>
      Employee
      <span className="mx-2 text-tt">/ Leave Report Employee Wise</span>
    </p>
    <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-gray-700">
            Year
          </label>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
            className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
            required
          >
            <option value="" disabled>
              Select Employee
            </option>
            {employees.map((desig) => (
              <option key={desig.employee_code} value={desig.employee_code}>
                {desig.employee_code}
              </option>
            ))}
          </select>
        </div>
</div>
<div className="flex space-x-3"> 
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={handleView}
        >
          View
        </button>
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={() => {
            setData({
                year :'',employee_code :''
            })
            setReport([])
          }}
        >
          Reset
        </button>
        </div>
</div>
<div className="mt-8">
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