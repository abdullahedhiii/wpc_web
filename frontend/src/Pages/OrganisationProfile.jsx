import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import { useSelector } from "react-redux"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { useCompanyContext } from "../contexts/CompanyContext";

const OrganisationProfile = () => {
  const {companyData} = useCompanyContext();
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const columns = [
    "id",
    "Sl. No.",
    "Organisation Name",
    "Organisation Address",
    "Website",
    "Email ID",
    "Phone No.",
    "Action",
  ];


  useEffect(() => {
    if(companyData.length === 0){
    navigate('/hrms/company-profile/edit-company');
   }
  }, [user]);

  return (
    <>
    <div className="p-6">
       <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Organisation</span>
      </p>
      <DataTable
        title="Organisation"
        fields={columns}
        data={companyData}
        showEntries
        searchable
        downloadable
      />
    </div>
     
    </>
  );
};

export default OrganisationProfile;
