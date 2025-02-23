import { useEffect,useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const LeaveBalance = () => {
   const {fetchLeavesAllocated,leavesAllocated} = useCompanyContext();
   useEffect(() => {
     fetchLeavesAllocated();
   },[]);

   console.log(leavesAllocated);
   const [data,setData] = useState([])
   const columns = ["Sl. No.", "Employee Code","Employee Name",
    "Leave Type","Leave Balance"];
   
   useEffect(() => {
      const d = leavesAllocated.map((leave) => ({
          "Sl. No." : leave["Sl. No."],
          "Employee Code" : leave['Employee Code'],
          "Employee Name": leave['Employee Name'],
          "Leave Type": leave['Leave Type'],
          "Leave Balance" : leave["Leave In Hand"] === 0 ? 'Zero leaves left' : leave["Leave In Hand"],
      }));
      setData(d);
   },[leavesAllocated]);
  
  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home <span className="text-tt"> / Leave Balance</span>
      </p>
      <DataTable
        title="Leave Balance"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable={false}
        addMore={false}
       
      />
    </div>
  );
};

export default LeaveBalance;