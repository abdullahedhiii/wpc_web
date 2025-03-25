"use client";

import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCompanyContext } from "../contexts/CompanyContext";
import { motion } from "framer-motion";
import { Building2, Search, Download, Filter, Plus } from 'lucide-react';

const OrganisationProfile = () => {
  const { companyData, fetchOrganisation } = useCompanyContext();
  const { user } = useSelector((state) => state.user);
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
    const fetchData = async () => {
      await fetchOrganisation(); 
    };
    fetchData();
  }, []); 
  
  useEffect(() => {
    if (companyData.length === 0) {
      navigate('/hrms/company-profile/edit-company');
    }
  }, [companyData]);
  

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
              Organisation Profile
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-yellow-100 text-sm"
            >
              Manage your organisation details and information
            </motion.p>
          </div>
        </div>
      </div>

    

          <div className="p-16">
            <DataTable
              title="Organisation"
              fields={columns}
              data={companyData}
              showEntries
              searchable
              downloadable
            />
          </div>
      </div>
  );
};

export default OrganisationProfile;