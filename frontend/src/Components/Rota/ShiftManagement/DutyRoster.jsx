import { useState,useEffect} from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import DataTable from "../../DataTable";
import axiosInstance from "../../../../axiosInstance";
import {motion} from 'framer-motion';

const DutyRoster = () => {
    const columns = [
        'Department','Designation','Employee Name',
        'Shift Code','Work In Time','Work Out Time',
        'Break Time From', 'Break Time To',
        'From Date','To Date'
    ]
    const [data,setData] = useState([]);
    const { companyData, departmentData, designationData, shifts, employees }  = useCompanyContext();
    const {isSideBarOpen} = useSidebarContext();
    // console.log(departmentData,designationData,employees);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [shiftOptions, setShiftOptions] = useState([]);
    const [employeeCodes, setCodes] = useState([]);
    
    const [formData,setFormData] = useState({
        department_id : '',
        designation_id : '',
        employee_code : '',
        fromDate : '',
        toDate : ''
    })

     useEffect(() => {
        if (formData.department_id) {
          const filteredDesignations = designationData
            .filter(
              (designation) =>
                designation.department_id === parseInt(formData.department_id)
            )
            .map((ele) => ({ label: ele["Designation"] , value : ele.id}));
          setDesignationOptions(filteredDesignations);
        }
      }, [formData.department_id]);
    
       const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        };
      
        useEffect(() => {
          if (formData.department_id && formData.designation_id) {

            const filteredEmployees = employees
              .filter(
                (ele) =>
                  ele.Department_id === parseInt(formData.department_id) &&
                  ele.Designation_id === parseInt(formData.designation_id)
              )
              .map((ele) => ({ name: ele.employee_code }));
            setCodes(filteredEmployees);
          }
        }, [formData.department_id, formData.designation_id]);
    
    const handleView = async (e) => {
        e.preventDefault();
        setData([])
        try{
            const response = await axiosInstance.get(`/api/getDutiesAssigned`,{
                params : formData
            });
            setData(response.data);
        }
        catch(err){

        }
    }
    return (
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
               Assign Duties
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Add and Manage Employee Duties
            </motion.p>
          </div>
        </div>
        
      </div>
          <div className={`mt-16 mr-16 ml-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departmentData.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept['Department Name']}
                    </option>
                  ))}
                </select>
              </div>
    
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  Designation
                </label>
                <select
                  name="designation_id"
                  value={formData.designation_id}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select a designation
                  </option>
                  {designationOptions.map((desig,index) => (
                    <option key={index} value={desig.value}>
                      {desig.label}
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
                  <option value="" disabled></option>
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
            <div className="flex space-x-4">
            <button
              className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
              onClick={handleView}
            >
              View Schedule
            </button>
<button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
              onClick={ () => {
                   setFormData({
                    department_id : '',
                    designation_id : '',
                    employee_code : '',
                    fromDate : '',
                    toDate : ''
                })
                setDesignationOptions([])
                setCodes([])
                setData([])
              }
             
              }
            >
              Reset
            </button>            
            </div>
         
          </div>

          <div className="p-16">
        <DataTable 
          title="Shift Schedule"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable = {false}
          addMore = {true}
          buttonTitle="Add department wise roster"
          addEmployeeWise = {true}
          buttonEmployee = "Add employee wise roster"
          employeePath = "rota/add-employee-duty"
        />
      </div>

    </div>
    );
};


export default DutyRoster;