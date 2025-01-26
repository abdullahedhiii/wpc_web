import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const AnnualPay = () => {
  const columns = ["Sl. No.", "Annual Pay", "Action"];

  const { annualPays,fetchAnnualPays } = useCompanyContext();
  
  useEffect(() => {
    fetchAnnualPays();
  },[]);

  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home / HCM Master<span className="text-tt"> / Annual Pay</span>
      </p>
      <DataTable
        title="Annual Pay"
        fields={columns}
        data={annualPays}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
      />
    </div>
  );
};

export default AnnualPay;
