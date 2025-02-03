
import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const LeaveRule = () => {
  const columns = ["Sl. No.", "Employee Type",
    "Leave Type", "Max. No.","Effective From","Effective To", "Action"];
  const {leaveRules,fetchLeaveRules} = useCompanyContext();

  useEffect(() => {
    fetchLeaveRules()
  },[]);;

  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home <span className="text-tt"> / Leave Rule</span>
      </p>
      <DataTable
        title="Leave Rule"
        fields={columns}
        data={leaveRules}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Add New Leave Rule"
      />
    </div>
  );
};

export default LeaveRule;
