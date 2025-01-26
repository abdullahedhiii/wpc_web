import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const BankMaster = () => {
  const columns = ["Sl. No.", "Bank Name", "Action"];
  const {orgBanks,fetchBanks} = useCompanyContext();
  
  useEffect(() => {
      fetchBanks();
  },[]);
  
  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home / HCM Master<span className="text-tt"> / Bank Master</span>
      </p>
      <DataTable
        title="Employee Bank"
        fields={columns}
        data={orgBanks}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Add New Bank"
      />
    </div>
  );
};

export default BankMaster;