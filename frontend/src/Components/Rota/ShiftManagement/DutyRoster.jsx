import { useState,useEffect} from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import DataTable from "../../DataTable";
import axiosInstance from "../../../../axiosInstance";

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
        <div className="p-12">
          <p className="text-[12px] text-gray-600">
            Home
            <span className="mx-2">/</span>
            Employee
            <span className="mx-2 text-tt">/ Duty Roster</span>
          </p>
          <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
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
              View Schedule
            </button>
<button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
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

          <div className="mt-8">
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