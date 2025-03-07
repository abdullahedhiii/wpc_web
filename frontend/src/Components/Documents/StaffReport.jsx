import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import PDFGenerator from "../../PDFGenerator"
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion';

const StaffReport = () => {
      const [data,setData] = useState([]);
      const {companyData} = useCompanyContext();
      const headings = [
        "Staff Code",
        "Staff Name",
        "Address",
        "DOB",
        "Job Start Date",
        "Telephone",
        "Nationality",
        "NI Number",
        "Visa Expiry",
        "Visa Review",
        "Passport Expiry Date",
        "EUSS Details",
        "DBS Details",
      ];
      
      const fetchData = async() => {
         try{
              const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getStaffData/${companyData[0].id}`);
              setData(response.data);
         }
         catch(err){

         }
      }
      useEffect(() => {
          fetchData();
      },[]);
      return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                Staff Report
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-yellow-100 text-sm"
              >
                Report of current employees
              </motion.p>
            </div>
          </div>
          
        </div>
        <div className="p-16">
        <DataTable
          title="Staff Report"
          fields={headings}
          data={data}
          showEntries
          searchable
          downloadable={true}
          addMore={false}
          buttonTitle = "Download report in pdf"
        /></div>
      </div>
    )
    };

export default StaffReport;