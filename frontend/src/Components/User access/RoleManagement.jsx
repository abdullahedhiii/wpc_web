import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";

const RoleManagement = () => {
    const columns = [
        "Sl. No.",
        "User Id",
        "Module Name",
        "Menu",
        "Rights",
        "Action"
      ];
      const {companyData} = useCompanyContext();
      const [data,setData] = useState([]);
      const fetchRoles = async () => {
          try{
                const response  = await axiosInstance.get(`/api/getUserRoles/${companyData[0].id}`);
                setData(response.data);
          }
          catch(err){

          }
      };
      
      useEffect(() => {
           fetchRoles();
      },[]);

      return (
        <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / User Configuration</span>
          </p>
          <DataTable
            title="Role Management"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
        </div>
      );
}

export default RoleManagement;