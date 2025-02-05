
import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const LeaveAllocation = () => {
  const columns = ["Sl. No.", "Employee Type","Employee Name","Employee Code",
    "Leave Type", "Max. No Of Leave","Leave In Hand","Effective Year", "Action"];
  const {leavesAllocated,fetchLeavesAllocated} = useCompanyContext();

  useEffect(() => {
    fetchLeavesAllocated();
  },[]);
  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home <span className="text-tt"> / Leave Allocation</span>
      </p>
      <DataTable
        title="Leave Allocation"
        fields={columns}
        data={leavesAllocated}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Add New Leave Allocation"
      />
    </div>
  );
};

export default LeaveAllocation;
