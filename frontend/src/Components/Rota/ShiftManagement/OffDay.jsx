import { useEffect } from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";
import {motion} from 'framer-motion';

const OffDay = () => {
    const columns = ['Department','Designation','Shift Name','Sunday',
                     'Monday' ,'Tuesday','Wednesday','Thursday',
                     'Friday','Saturday','Action'
    ];

    const {shifts,fetchShifts} = useCompanyContext();
    const filteredShifts = shifts.filter((shift) => {
        return Object.keys(shift['Off Days']).length > 0; 
    });
  
    const mappedShifts = filteredShifts.map((shift) => ({
      Department: shift.Department || "-",
      Designation: shift.Designation || "-",
      "Shift Name": shift["Shift Name"] || "-",
      Sunday: shift["Off Days"]["Sunday"] ? "Off" : "Working",
      Monday: shift["Off Days"]["Monday"] ? "Off" : "Working",
      Tuesday: shift["Off Days"]["Tuesday"] ? "Off" : "Working",
      Wednesday: shift["Off Days"]["Wednesday"] ? "Off" : "Working",
      Thursday: shift["Off Days"]["Thursday"] ? "Off" : "Working",
      Friday: shift["Off Days"]["Friday"] ? "Off" : "Working",
      Saturday: shift["Off Days"]["Saturday"] ? "Off" : "Working",
      Action: "Edit", 
  "Shift Code" : shift['Shift Code'],
    }));
  
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
              Shift off-days
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Add and manage shift off-days
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16">
        <DataTable
          title="Day Off"
          fields={columns}
          data={mappedShifts}
          showEntries
          searchable
          downloadable={false}
          addMore={true}
          buttonTitle = "Add OffDay"
        />
      </div>
      </div>
    )
};

export default OffDay;