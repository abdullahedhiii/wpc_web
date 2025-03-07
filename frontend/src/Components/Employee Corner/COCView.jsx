import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

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
            const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getMyCOC/${user.employee_code}`);
            setData(response.data);
        }
        catch(err){
        }
    }

    useEffect(() => {
      handleGenerate()
    },[]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              View your Change of circumstances
            </motion.h1>
           
          </div>
        </div>
        
      </div>
      <div className="p-16">
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
      className="mr-16 mt-16 ml-16 px-3 py-3 rounded-xl bg-yellow-100 border text-[12px] font-semibold  border-yellow-200"
      onClick={() => navigate(`/hrms/employee-corner/update-COC`)}
      >Update Change Of Circumstances</button>
     
     </div>
     
    )
};

export default EmployeeCOC;