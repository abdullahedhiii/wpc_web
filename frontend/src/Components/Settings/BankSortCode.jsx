import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';

const BankSortCode = () => {
    const columns = [
        "Sl. No.",
        "Bank Name",
        "Bank Sort Code",
        "Action",
      ];
    
    const {bankSortCodes,fetchCodes} = useCompanyContext();
    useEffect(() => {
        fetchCodes();
    },[]);
    
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              Bank SortCodes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Add and manage sort codes
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16" >
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
          </div></div>
        </>
      );
};

export default BankSortCode;