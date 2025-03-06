import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import {motion} from 'framer-motion';
const TaxMaster = () => {
    const columns = [
        "Sl. No.",
        "Tax Code",
        "Percentage of Deduction",
        "Tax Reference",
        "Action",
    ];
    const {taxMasters,fetchTaxMasters} = useCompanyContext();
    
    useEffect(() => {
      fetchTaxMasters();
    },[]);

    return(
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              Tax Masters
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Add And Manage Tax Masters
            </motion.p>
          </div>
        </div>
        
      </div>
      <div className="p-16">
        <DataTable
          title="Tax Master"
          fields={columns}
          data={taxMasters}
          showEntries
          searchable
          downloadable = {false}
          addMore = {true}
          buttonTitle = "Add New Tax Master"

        /></div>
        </div> 

    );
};

export default TaxMaster;