import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import {motion} from 'framer-motion';

const ApproveList  = () => {
    const [leaves,setLeaves] = useState([]);
    const [fetchAgain,setAgain] = useState(false);
    const columns = ['Sl. No.','Employment Type',
        'Employee Code','Name','Leave Type','From Date',
        'To Date','Date Of Application',
        'No. Of Leave','Status','Action'
    ];

    const {companyData} = useCompanyContext();
    const fetchLeaveList = async() =>{
      try{
          const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getLeavesList/${companyData[0].id}`);
          setLeaves(response.data);
      }
      catch(err){

      }
    };

    useEffect(() => {
        fetchLeaveList();
    },[]);
    
    useEffect(() => {
      if(setAgain){
        fetchLeaveList();
        setAgain(false)
      }
    },[setAgain]);
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
              Leave Request Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              View Leaves Taken
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16">
        <DataTable
          title="Leave Request List"
          fields={columns}
          data={leaves}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
          buttonTitle = "Add New Leave Allocation"
          setData={setLeaves}
          setAgain = {setAgain}
        />
        </div>
      </div>
    )
};

export default ApproveList;