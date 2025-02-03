import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";

const COCView = () => {
    const {isSideBarOpen} = useSidebarContext();
    const {employeeTypes,employees} = useCompanyContext();
    const [filteredEmployees,setFiltered] = useState([])
    const [formData,setFormData] = useState({employee_code : '',employment_type: ''});

    useEffect(() => {
      if(formData.employment_type){  
        const type =  employeeTypes.find((ele) => ele['Employment Type'] === formData.employment_type);
        const checkk = employees.filter((ele) => ele.employment_type_id === type["id"]);
        setFiltered(checkk)}
    },[formData.employment_type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('here to change ',name,value)
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
    const handleGenerate = async () => {

    }
    return (
        <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Change Of Circumstances(View)</span>
      </p>
      <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Employment Type
            </label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
                <option>select</option>
              {employeeTypes.map((type) => (
                <option key={type.id} value={type['Employment Type']}>
                  {type['Employment Type']}
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
              <option >
                Select
              </option>
              {Array.isArray(filteredEmployees) && filteredEmployees.map((emp) => (
                <option key={emp.id} value={emp.employee_code}>
                  {emp.employee_code}
                </option>
              ))}
            </select>
          </div>

        </div>
        <div className="flex space-x-3"> 
        <button
          className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
          onClick={handleGenerate}
        >
          View
        </button>
        </div>
       
      </div>
      <div className="mt-8">
        <DataTable 
          title="Change Of Circumstances(View)"
          fields={[]}
          data={[]}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
        />
      </div>
      </div>
     
    )
};

export default COCView;