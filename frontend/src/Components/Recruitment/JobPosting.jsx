
import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';

const JobPosting = () => {
    const columns = ["Sl. No.", "SOC Code", "Job Title", "Job Link","Vacancy","Job Location","Job Posted Date","Closing Date",
        "Email","Phone No.","Status","Action", 
    ];
    const [loading,setLoading] = useState(true);
    const [jobsPosted,setPosted] = useState([]);
    const {companyData} = useCompanyContext();
    useEffect(( ) => {
           const fetchPosted = async() => {
                   try{
                    const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getJobsPosted/${companyData[0].id}`);
                    setPosted(response.data);
                   }
                   catch(err){

                   }
                   finally{
                    setLoading(false);
                   }
           };
           fetchPosted();
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
              Jobs Posted
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              View Jobs (Recruiting)
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16">

          <DataTable
            title="Job Posted"
            fields={columns}
            data={jobsPosted}
            showEntries
            searchable
            downloadable={false}
            addMore={true}
            buttonTitle="Add New Job"
          />      </div>

        </div>
      
    );
    
};

export default JobPosting;