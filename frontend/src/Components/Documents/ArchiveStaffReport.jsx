import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import PDFGenerator from "../../PDFGenerator"
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const ArchiveStaffReport = () => {
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
              const response = await axiosInstance.get(`/api/getPastStaffData/${companyData[0].id}`);
              setData(response.data);
         }
         catch(err){

         }
      }
      useEffect(() => {
          fetchData();
      },[]);
      return (
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home <span className="text-tt"> / Employees Left</span>
        </p>
        <DataTable
          title="Staff Report"
          fields={headings}
          data={data}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
          buttonTitle = "Download report in pdf"
        />
      </div>
    )
    };

export default ArchiveStaffReport;