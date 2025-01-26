import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const BankSortCode = () => {
    const columns = [
        "Sl. No.",
        "Bank Name",
        "Bank Sort Code",
        "Action",
      ];
    
    const {bankSortCodes,fetchCodes} = useCompanyContext();
    console.log('bank sort codes ',bankSortCodes);
    useEffect(() => {
        fetchCodes();
    },[]);
    
    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home / HCM Master<span className="text-tt"> / Bank SortCode</span>
          </p>
          <DataTable
            title="Employee Bank Sortcode"
            fields={columns}
            data={bankSortCodes}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Add New Bank Sortcode"

          />
          </div>
        </>
      );
};

export default BankSortCode;