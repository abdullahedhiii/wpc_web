import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosInstance";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";

const VisitorList = () => {
     const {visitors,fetchVisitors} = useCompanyContext();
     const columns = ['Sl. No.','Name','Designation','Email ID','Contact No','Address','Description','Date','Time','Reference'];
     console.log('Visitors ',visitors);
     useEffect(() => {
         fetchVisitors();
     },[]);
     
     return(
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home / HCM Master<span className="text-tt"> / Visitor Register</span>
        </p>
        <DataTable
          title="Visitor Register"
          fields={columns}
          data={visitors}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
          buttonTitle = ""
        />
      </div>
     )
};
export default VisitorList;