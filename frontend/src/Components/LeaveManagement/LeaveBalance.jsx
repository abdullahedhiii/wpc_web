import { useEffect,useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const LeaveBalance = () => {
   const {leavesAllocated} = useCompanyContext();
   const [data,setData] = useState([])
   const columns = ["Sl. No.", "Employee Code","Employee Name",
    "Leave Type","Leave Balance"];
   
   useEffect(() => {
      const d = leavesAllocated.map((leave) => ({
          "Sl. No." : leave["Sl. No."],
          "Employee Code" : leave['Employee Code'],
          "Employee Name": leave['Employee Name'],
          "Leave Type": leave['Leave Type'],
          "Leave Balance" : leave['Max. No Of Leave'] - leave["Leave In Hand"],
      }));
      setData(d);
   },[]);
  
  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home <span className="text-tt"> / Leave Allocation</span>
      </p>
      <DataTable
        title="Leave Allocation"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Add New Leave Allocation"
      />
    </div>
  );
};

export default LeaveBalance;