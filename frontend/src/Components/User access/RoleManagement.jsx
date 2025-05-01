import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';
const RoleManagement = () => {
    const columns = [
        "Sl. No.",
        "User Id",
        "Module Name",
        "Menu",
        // "Rights",
        "Action"
      ];
      const {companyData} = useCompanyContext();
      const [data,setData] = useState([]);
      const fetchRoles = async () => {
          try{
                const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getUserRoles/${companyData[0].id}`);
                setData(response.data);
          }
          catch(err){

          }
      };
      
      useEffect(() => {
           fetchRoles();
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
              Role Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Manage roles of employees within your organisation
            </motion.p>
          </div>
        </div>
      </div>
      <div className="p-16">
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
        </div>
        

      );
}

export default RoleManagement;