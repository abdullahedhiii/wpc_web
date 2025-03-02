
import { useEffect } from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";
import {motion} from 'framer-motion'
const ShiftManagement = () =>{
   const columns = ['Shift Code','Shift Description','Work In Time','Work Out Time','Break Time From','Break Time To','Action'];
   const {shifts,fetchShifts} = useCompanyContext();
   console.log(shifts);
   useEffect(() => {
       fetchShifts();
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
            Shift Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            Add and manage shifts(department and designation wise)
          </motion.p>
        </div>
      </div>
      
    </div>
    <div className="p-16">
    <DataTable
      title="Shift Management"
      fields={columns}
      data={shifts}
      showEntries
      searchable
      downloadable={false}
      addMore={true}
      buttonTitle = "Add Shift Management"
    />
    </div>
  </div>
   )
};

export default ShiftManagement;