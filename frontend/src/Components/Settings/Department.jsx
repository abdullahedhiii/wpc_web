import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axios from "axios";

const Department = () => {
    const {companyData,fetchDepartments,departmentData} = useCompanyContext();
    const columns = [
        "Sl. No.",
        "Department Name",
        "Action",
      ];
    useEffect(() => {
         fetchDepartments();
    },[companyData])
    
    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home / HCM Master<span className="text-tt"> / Department</span>
          </p>
          <DataTable
            title="Department"
            fields={columns}
            data={departmentData}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
          </div>
        </>
      );
};

export default Department;