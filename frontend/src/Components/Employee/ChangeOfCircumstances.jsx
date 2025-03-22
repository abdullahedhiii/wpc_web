import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import {useCompanyContext} from '../../contexts/CompanyContext';
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';
const ChangeOfCircumstances = () => {
    //fetch COC dataaa
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const {companyData} = useCompanyContext();
    useEffect(() => {
       const fetchData = async () => {
            try{

            const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCOCTable/${companyData[0].id}`);
            setData(response.data);
            }
            catch(err){
            }
            finally{
                setLoading(false);
            }

       };
       fetchData();
    },[]);

    const columns = [
        // "Updated Date",
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
        "Action"
      ];

    return (
      <>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Employees 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            Change of Circumstances(add)
          </motion.p>
        </div>
      </div>
      </div>
      <div className="p-16">
          <DataTable
            title="Change of Circumstances"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Change of Circumstances"
          />
          </div></div>
         
       
        </>
      );
}

export default ChangeOfCircumstances;