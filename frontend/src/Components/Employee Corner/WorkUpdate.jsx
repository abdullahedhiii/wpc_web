import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion';

const WorkUpdate = () => {
    const {user} = useSelector((state) => state.user); 
    const columns = ["Sl. No.","Date","From Time",
        "To Time", "Time","Remarks","Attachment"
    ];
    const [data,setData] = useState([]);

    const fetchWork = async() => {
        try{
           const response = await axiosInstance.get(`/api/getWorkUpdates/${user.employee_code}`);
           setData(response.data);
        }
        catch(err){

        }
    }

    useEffect(() => {
      fetchWork();
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
                Daily Work Update
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-yellow-100 text-sm"
              >
                Provide updates for your tasks
              </motion.p>
            </div>
          </div>
          
        </div>
        <div className="p-16">
          <DataTable
            title="Daily Work Update"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable={false}
            addMore={true}
            buttonTitle = "Add Work Update"
          />
        </div>
        </div>
      );
};

export default WorkUpdate;