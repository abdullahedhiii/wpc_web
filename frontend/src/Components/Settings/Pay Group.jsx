import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const PayGroup = () => {
  const columns = ["Sl. No.", "Pay Group", "Action"];
  const { payGroups, fetchPayGroups } = useCompanyContext();

  useEffect(() => {
    fetchPayGroups();
  }, []);

  return (
    <div className="m-12">
      <p className="text-[12px] text-gray-400 mb-4">
        Home / HCM Master<span className="text-tt"> / Pay Group</span>
      </p>
      <DataTable
        title="Pay Group"
        fields={columns}
        data={payGroups}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
        buttonTitle = "Add New PayGroup"

      />
    </div>
  );
};

export default PayGroup;
