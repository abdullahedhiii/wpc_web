import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const UserConfiguration = () => {
    const {companyData} = useCompanyContext();
    const columns = [
        "Sl. No.",
        "Employee Code",
        "Name",
        "Email",
        "Password",
        "Action"
      ];
    
      const [data,setData] = useState([]);

      const fetchUsers = async () => {
          try{
               const response  = await axiosInstance.get(`/api/getUsers/${companyData[0].id}`);
               setData(response.data);
          }
          catch(err){

          }
      }
      
      useEffect(() => {
           fetchUsers();
      },[]);

      return (
        <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / User Configuration</span>
          </p>
          <DataTable
            title="User Configuration"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle="Add New User"
          />
        </div>
      );
}

export default UserConfiguration;