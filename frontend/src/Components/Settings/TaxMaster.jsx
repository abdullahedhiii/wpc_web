import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const TaxMaster = () => {
    const columns = [
        "Sl. No.",
        "Tax Code",
        "Percentage of Deduction",
        "Tax Reference",
        "Action",
    ];
    const {taxMasters,fetchTaxMasters} = useCompanyContext();
    
    useEffect(() => {
      fetchTaxMasters();
    },[]);

    return(
        <div className="m-12">
        <p className="text-gray-400 mb-4 text-[12px]">
          Home / HCM Master<span className="text-tt"> /Tax Master</span>
        </p>
        <DataTable
          title="Tax Master"
          fields={columns}
          data={taxMasters}
          showEntries
          searchable
          downloadable = {false}
          addMore = {true}
          buttonTitle = "Add New Tax Master"

        />
        </div> 

    );
};

export default TaxMaster;