import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';
const JobApplied = () => {
    const [data,setData] = useState([]);
    const columns = ['Job Code','Job Title','Candidate','Email','Contact Number','Status','Date','Action'];
    const {companyData} = useCompanyContext();

    const fetchCandidates = async () => {
        try{
           const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCandidates/${companyData[0].id}`,{params : {status : 'Applied'}});
           setData(response.data);
        }
        catch(err){

        }
    };
    
    useEffect(() => {
          fetchCandidates();
    },[]);
    return(
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              Candidate Details
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              View Job Candidates
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16" >
        <DataTable
          title="Job Applied"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        /></div>
      </div>
    )
    
};

export default JobApplied;