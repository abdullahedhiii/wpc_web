import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const COCView = () => {
    const {isSideBarOpen} = useSidebarContext();
    const {employeeTypes,employees,companyData} = useCompanyContext();
    const [filteredEmployees,setFiltered] = useState([])
    const [formData,setFormData] = useState({employee_code : '',employment_type: ''});
    const [data,setData] = useState([]);
    const columns = [
        "Updated Date",
        "Employment Type",
        "Employee ID",
        "Name Of Member Of The Staff",
        "Job Title",
        "Address",
        "Contact Number",
        "Nationality",
        "BRP Number",
        "Visa Expired",
        "Remarks/Restriction to work",
        "Passport No",
        "ESUS Details",
        "DBS Details",
        "National Id Details",
        "Other Documents",
        "Are Sponsored migrants aware that they must inform[HR/line manager] promptly of changes in contact Details?",
        "Are Sponsore migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview(In applicable cases)?",
        "Annual Reminder Date"
      ];

    useEffect(() => {
      if(formData.employment_type){  
        const type =  employeeTypes.find((ele) => ele['Employment Type'] === formData.employment_type);
        const checkk = employees.filter((ele) => ele.employment_type_id === type["id"]);
        setFiltered(checkk)}
    },[formData.employment_type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData([])
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
    const handleGenerate = async () => {
        const data = formData.employee_code;
        try{
            const response = await axiosInstance.get(`/api/getSpecificCOC/${companyData[0].id}`,{params : {data}});
            setData(response.data);
        }
        catch(err){
            console.log('Error fetching employee COC',err);
        }
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
                <option>Select</option>
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
          fields={columns}
          data={data}
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