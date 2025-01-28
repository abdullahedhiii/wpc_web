
import { useEffect } from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";

const ShiftManagement = () =>{
   const columns = ['Shift Code','Shift Description','Work In Time','Work Out Time','Break Time From','Break Time To','Action'];
   const {shifts,fetchShifts} = useCompanyContext();
   
   useEffect(() => {
       fetchShifts();
   },[]);

   return(
    <div className="m-16">
    <p className="text-[14px] text-gray-400 mb-4">
      Home <span className="text-tt"> / Shift Management</span>
    </p>
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
   )
};

export default ShiftManagement;