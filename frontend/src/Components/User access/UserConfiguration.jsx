import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';
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
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                User Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-yellow-100 text-sm"
              >
                Add users to your organisation
              </motion.p>
            </div>
          </div>
        </div>
        <div className="p-16">
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
          </div>
          
  
      );
}

export default UserConfiguration;