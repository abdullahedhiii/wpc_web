import { useState,useEffect} from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import DataTable from "../../DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";

const DutyRosterForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEmployee = location.pathname.includes('rota/add-employee-duty')
    const { companyData, departmentData, designationData, shifts, employees }  = useCompanyContext();
    const {isSideBarOpen} = useSidebarContext();
    // console.log(departmentData,designationData,employees);
    const [designationOptions, setDesignationOptions] = useState([]);
    const [shiftOptions, setShiftOptions] = useState([]);
    const [employeeCodes, setCodes] = useState([]);
    const [formData,setFormData] = useState({
        department_id : '',
        designation_id : '',
        fromDate : '',
        toDate : '',
        shift_code : isEmployee ? undefined : '',
        employee_code : isEmployee ? '' : undefined,
        duty_assigned_to : isEmployee ? 'employee' : 'department'
    })

     useEffect(() => {
        if (formData.department_id) {
            console.log(formData.department_id);
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
            console.log(formData.department_id,formData.designation_id)
            const filteredShifts = shifts
            .filter(
              (ele) =>
                ele.Department_id === parseInt(formData.department_id) &&
                ele['Designation ID'] === parseInt(formData.designation_id)
            )
            .map((ele) => ({ label: ele['Shift Name'],value: ele["Shift Code"] }));
          setShiftOptions(filteredShifts);

          
          console.log(employees,formData.department_id,formData.designation_id);
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
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(formData);
            try{
                await axiosInstance.post(`/api/assignDuty`,formData);
                navigate("/hrms/rota/add-duty-roster");
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
            <span className="mx-2 text-tt">/ Duty Roster</span>
          </p>
          <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
          <div className="p-2 flex items-center space-x-2">
              <i className={`pl-2 ${isEmployee ? "fa fa-users": "fas fa-cogs"} text-[14px]  text-blue-900`}></i>
        
            <h2 className="text-[14px] font-semibold text-blue-900">Duty Roster { isEmployee ? "(Employee Wise)": "(Department Wise)"}</h2>
          </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
                  {isEmployee ? "Employee Code" : "Shift"}
                </label>
                <select
                  name= {isEmployee ? "employee_code" : "shift_code"}
                  value={isEmployee ? formData.employee_code : formData.shift_code}
                  onChange={handleInputChange}
                  className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                  required
                >
                  <option value="" disabled></option>
                  { isEmployee ? 
                  (  employeeCodes.map((dd) => (
                    <option key={dd.id} value={dd.name}>
                      {dd.name}
                    </option>
                  )) ): 
                   shiftOptions.map((dd,index) => (
                    <option key={index} value={dd.value}>
                      {dd.label}
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
            <div className="flex space-x-6">
            <button
              className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
              onClick={ () => {
                setFormData({
                    department_id : '',
                    designation_id : '',
                    fromDate : '',
                    toDate : '',
                    shift : '',
                });
                setDesignationOptions([])
                setShiftOptions([])
                setCodes([])
              }}
            >
              Reset
            </button>
            </div>
           
          </div>

        

    </div>
    );
};


export default DutyRosterForm;