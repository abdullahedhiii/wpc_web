import { useState,useMemo,useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const AttendanceHistory = () => {
    const {isSideBarOpen} = useSidebarContext();
    const columns = ['Sl No.','Department','Designation','Employee Code','Employee Name','Date','Clock In','Clock In Location','Clock Out','Clock Out Location','Duty Hours'];
    const [attendance,setAttendance] = useState([]);
    const {companyData,fetchEmployeesLink,fetchDepartments,fetchDesignations,employees,departmentData,designationData} = useCompanyContext();
    
    useEffect(() => {
       fetchDepartments();
       fetchDesignations();
       fetchEmployeesLink();
    },[]);
    const [formData,setFormData] = useState({
        department : '',
        designation : '',
        fromDate: '',
        employeeCode: '',
        toDate : ''
    });
    
    const departmentOptions = useMemo(() => {
        return departmentData.map((ele) => ({ name: ele["Department Name"] }));
    }, [departmentData]);
    
    const [designationOptions, setDesignationOptions] = useState([]);
    const [employeeCodes, setCodes] = useState([]);


    useEffect(() => {
        if (formData.department) {
          const filteredDesignations = designationData
            .filter(
              (designation) =>
                designation["Department Name"] === formData.department
            )
            .map((ele) => ({ name: ele["Designation"] }));
          setDesignationOptions(filteredDesignations);
        }
      }, [formData.department]);
    
     useEffect(() => {
        if (formData.department && formData.designation) {
          const filteredEmployees = employees
            .filter(
              (ele) =>
                ele.Department === formData.department &&
                ele.Designation === formData.designation
            )
            .map((ele) => ({ name: ele.employee_code }));
          setCodes(filteredEmployees);
        }
      }, [formData.department, formData.designation]);
      
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
    const handleGenerate = async () => {
        if(!formData.department || !formData.designation || !formData.employeeCode || !formData.fromDate || !formData.toDate){
            window.alert('all fields are required');
            return;
        }
        setAttendance([])
        try{
            console.log('sendingg ',formData);
           const response = await axiosInstance.get(`/api/getAttendanceHistory`,{params : {data : formData}});
           setAttendance(response.data);
           console.log('response of dailu ',response.data);
        }
        catch{
           console.log('error fetching attendance');
        }
    };

    return(
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              Attendance History
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              View Employee Attendance History
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className={`mt-16 ml-16 mr-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${isSideBarOpen ? "w-[800px]" : "w[1300px]"} `}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select a designation
              </option>
              {designationOptions.map((desig) => (
                <option key={desig.id} value={desig.name}>
                  {desig.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employee Code
            </label>
            <select
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>Select Employee</option>
              {employeeCodes.map((dd) => (
                <option key={dd.id} value={dd.name}>
                  {dd.name}
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
        <div className="flex space-x-3"> 
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
          onClick={handleGenerate}
        >
          View
        </button>
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
          onClick={() => {
            setFormData({
                department :'',designation :'',employeeCode: '',fromDate :'',toDate : ''
            })
            setAttendance([])
          }}
        >
          Reset
        </button>
        </div>
       
      </div>
      <div className="p-16">
        <DataTable 
          title="Attendance History"
          fields={columns}
          data={attendance}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
        />
      </div>
      </div>
     
    )
};

export default AttendanceHistory;