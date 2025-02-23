import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmployeeCOC = () => {
    const {user} = useSelector((state) => state.user);
    const [data,setData] = useState([]);
    const navigate = useNavigate();
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



    const handleGenerate = async () => {
        try{
            const response = await axiosInstance.get(`/api/getMyCOC/${user.employee_code}`);
            setData(response.data);
        }
        catch(err){
            console.log('Error fetching employee COC',err);
        }
    }

    useEffect(() => {
      handleGenerate()
    },[]);

    return (
        <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee Corner
        <span className="mx-2 text-tt">/ Change Of Circumstances</span>
      </p>
      <div className="mt-8">
        <DataTable 
          title="Change Of Circumstances"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
        />
      </div>
      <button 
      className="mt-2 px-3 py-3 rounded-xl bg-yellow-100 border text-[12px] font-semibold  border-yellow-200"
      onClick={() => navigate(`/hrms/employee-corner/update-COC`)}
      >Update Change Of Circumstances</button>
     
     </div>
     
    )
};

export default EmployeeCOC;