import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { motion } from 'framer-motion';
import { Download, FileText, AlertCircle } from 'lucide-react';

const OrganisationReport = () => {   
   const { isSideBarOpen } = useSidebarContext();
   const {companyData} = useCompanyContext();
   const [documents, setDocuments] = useState([]);
   const [options, setOptions] = useState([]);
   const [formData, setFormData] = useState({ document_type: '' });
   const [isLoading, setIsLoading] = useState(false);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
  
   const fetchDocuments = async () => {
      setIsLoading(true);
      const id = companyData[0].id;
      try {
         const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getOrganisationDocuments/${id}`);
         setDocuments(response.data);
         const opt = response.data.map((ele) => ({
            label: ele.document_type,
            value: ele.document_type
         }));
         setOptions(opt);
      } catch (err) {
         console.error("Error fetching documents:", err);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchDocuments();
   }, []);
   
   const handleSubmit = async () => {
      if (!formData.document_type) {
         return;
      }
   
      const selectedDocument = documents.find(
         (doc) => doc.document_type === formData.document_type
      );
   
      if (selectedDocument && selectedDocument.document_url) {
         setIsLoading(true);
         try {
            const response = await fetch(selectedDocument.document_url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
   
            // Try to get the original filename from the URL
            const urlParts = selectedDocument.document_url.split('/');
            const originalFileName = urlParts[urlParts.length - 1].split('?')[0]; // Remove query string if any
   
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = originalFileName || `${selectedDocument.document_type}`; // fallback
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
         } catch (err) {
            console.error("Error downloading document:", err);
         } finally {
            setIsLoading(false);
         }
      }
   };
   
 
   return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
         <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4"
               >
                  <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg">
                     <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-white">Organisation Documents</h1>
                     <p className="text-yellow-100 text-sm">View and download company documents</p>
                  </div>
               </motion.div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  isSideBarOpen ? "max-w-2xl" : "max-w-3xl"
               }`}
            >
               <div className="border-b border-gray-100 bg-yellow-50/50">
                  <div className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                           <FileText className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Select Document</h2>
                     </div>
                  </div>
               </div>

               <div className="p-6">
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                           Document Type
                        </label>
                        <select
                           name="document_type"
                           value={formData.document_type}
                           onChange={handleInputChange}
                           className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                           required
                        >
                           <option value="" disabled>Select Document Type</option>
                           {options.map((option, index) => (
                              <option key={index} value={option.value}>
                                 {option.label}
                              </option>
                           ))}
                        </select>
                     </div>

                     {options.length === 0 && !isLoading && (
                        <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
                           <AlertCircle className="w-5 h-5 text-yellow-600" />
                           <p className="text-sm text-yellow-700">No documents have been uploaded</p>
                        </div>
                     )}

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-end"
                     >
                        <button
                           onClick={handleSubmit}
                           disabled={options.length === 0 || isLoading}
                           className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                              options.length === 0 || isLoading
                                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                 : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200"
                           }`}
                        >
                           <Download className="w-4 h-4" />
                           {isLoading ? "Downloading..." : "Download Document"}
                        </button>
                     </motion.div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default OrganisationReport;
