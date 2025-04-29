import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyContext } from "../contexts/CompanyContext";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, Globe, MapPin, Edit2 } from 'lucide-react';

const OrganisationProfile = () => {
  const { companyData } = useCompanyContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (companyData.length === 0) {
      navigate('/hrms/company-profile/edit-company');
    }
  }, [companyData, navigate]);

  if (!companyData.length) return null;
  const org = companyData[0];

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

      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="text-yellow-700 w-8 h-8" />
              <h2 className="text-xl font-bold text-yellow-900">{org["Organisation Name"]}</h2>
            </div>
            <button
              className="flex items-center gap-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
              onClick={() => navigate('/hrms/company-profile/edit-company')}
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-yellow-500" />
              <span>{org["Organisation Address"]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Globe className="w-5 h-5 text-yellow-500" />
              <span>{org.Website}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-yellow-500" />
              <span>{org["Email ID"]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-yellow-500" />
              <span>{org["Phone No."]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Year Created: {org.year_created}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganisationProfile;