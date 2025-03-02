import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useEffect,useState } from "react";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const HiredList = () => {
    const [data,setData] = useState([]);
    const columns = ['Job Code','Job Title','Candidate','Email','Contact Number','Status','Date','Action'];
    const {companyData} = useCompanyContext();

    const fetchCandidates = async () => {
        try{
           const response = await axiosInstance.get(`/api/getCandidates/${companyData[0].id}`,{params : {status : 'Hired'}});
           setData(response.data);
        }
        catch(err){
            console.log(err);
        }
    };
    
    useEffect(() => {
          fetchCandidates();
    },[]);
    return(
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
              Candidate Details
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              View Job Candidate(Hiring Stage)
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16" >

        <DataTable
          title="Hired"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        />      </div>

      </div>
    )
    
};

export default HiredList;