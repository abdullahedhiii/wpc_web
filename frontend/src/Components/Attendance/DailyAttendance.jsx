import { useState,useMemo,useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";

const DailyAttendance = () => {
    const {isSideBarOpen} = useSidebarContext();
    const columns = ['Sl No.','Department','Designation','Employee Code','Employee Name','Date','Clock In','Clock In Location','Clock Out','Clock Out Location','Duty Hours','Action'];
    const [attendance,setAttendance] = useState([]);
    const {companyData,employees,departmentData,designationData,fetchEmployeesLink,fetchDepartments,fetchDesignations} = useCompanyContext();
    
    useEffect(() => {
       fetchDepartments();
       fetchDesignations();
       fetchEmployeesLink();
    },[]);
    
    const [formData,setFormData] = useState({
        department : '',
        designation : '',
        date: '',
        employeeCode: ''
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
        if(!formData.department || !formData.designation || !formData.employeeCode || !formData.date){
            window.alert('all fields are required');
            return;
        }
        setAttendance([])
        try{
            console.log('sendingg ',formData);
           const response = await axiosInstance.get(`/api/getDailyAttendance`,{params : {data : formData}});
           setAttendance(response.data);
           console.log('response of dailu ',response.data);
        }
        catch{
           console.log('error fetching attendance');
        }
    };

    return(
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Daily Attendance</span>
      </p>
      <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            />
          </div>

        </div>
        <div className="flex space-x-3"> 
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={handleGenerate}
        >
          View
        </button>
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={() => {
            setFormData({
                department :'',designation :'',employeeCode: '',date :''
            })
            setAttendance([])
          }}
        >
          Reset
        </button>
        </div>
       
      </div>
      <div className="mt-8">
        <DataTable 
          title="Daily Attendance"
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

export default DailyAttendance;