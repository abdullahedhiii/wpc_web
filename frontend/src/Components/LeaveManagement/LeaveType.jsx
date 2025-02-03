
import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const LeaveType = () => {
  const columns = ["Sl. No.", "Leave Type","Leave Type Sort Code", "Remarks", "Action"];
  const {leaveTypes,fetchLeaveTypes} = useCompanyContext();

  useEffect(() => {
   fetchLeaveTypes();
  },[]);

  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home <span className="text-tt"> / Manage Leave Type</span>
      </p>
      <DataTable
        title="Leave Type"
        fields={columns}
        data={leaveTypes}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Manage Leave Type"
      />
    </div>
  );
};

export default LeaveType;
