
import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
    // fetchDepartments(response.data.id);
      // fetchDesignations(response.data.id);
      // fetchTypes(response.data.id);
      // fetchPayGroups(response.data.id);
      // fetchAnnualPays(response.data.id);
      // fetchBanks(response.data.id);
      // fetchCodes(response.data.id);
      // fetchTaxMasters(response.data.id);
      // fetchPaymentTypes(response.data.id);
      // fetchHolidays(response.data.id);
      // fetchHolidayList(response.data.id);
      // fetchVisitors(response.data.id);
      // fetchShifts(response.data.id);
      // fetchPolicies(response.data.id);
      // fetchEmployeesLink(response.data.id);
      // fetchLeaveTypes(response.data.id);
      // fetchLeaveRules(response.data.id);
      // fetchLeavesAllocated(response.data.id);
const LeaveRule = () => {
  const columns = ["Sl. No.", "Employee Type",
    "Leave Type", "Max. No.","Effective From","Effective To", "Action"];
  const {leaveRules,fetchLeaveRules} = useCompanyContext();

  useEffect(() => {
    fetchLeaveRules()
  },[])

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
