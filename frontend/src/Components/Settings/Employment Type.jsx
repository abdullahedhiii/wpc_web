import { useEffect } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const EmploymentType = () => {
  const {fetchTypes,employeeTypes} = useCompanyContext();  
  const columns = [
        "Sl. No.",
        "Employment Type",
        "Action",
      ];
    
      useEffect(() => {
          fetchTypes();
      },[]);
    
      return (
        <div className="m-12">
          <p className="text-[12px] text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Employment Type</span>
          </p>
          <DataTable
            title="Employment Type"
            fields={columns}
            data={employeeTypes}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
        </div>
      );
};

export default EmploymentType;