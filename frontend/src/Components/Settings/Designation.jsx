import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const Designation = () => {
  const {designationData,fetchDesignations} = useCompanyContext();
    const columns = [
        "id",
        "Sl. No.",
        "Department Name",
        "Designation",
        "Action",
      ];
    useEffect(() => {
        fetchDesignations();
    },[]);

      return (
        <>
        <div className="m-12">
           <p className="text-gray-400 mb-4 text-[12px]">
            Home / HCM Master<span className="text-tt"> / Designation</span>
          </p>
          <DataTable
            title="Designation"
            fields={columns}
            data={designationData}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
        </div>      
        </>
      );
};

export default Designation;