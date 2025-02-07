import { useEffect, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";

const OrganisationReport = () => {   
   const { isSideBarOpen } = useSidebarContext();
   const {companyData} = useCompanyContext();
   const [documents, setDocuments] = useState([]);
   const [options, setOptions] = useState([]);
   const [formData, setFormData] = useState({ document_type: '' });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
  
   const fetchDocuments = async () => {

      const id = companyData[0].id;
      try {
         const response = await axiosInstance.get(`/api/getOrganisationDocuments/${id}`);
         setDocuments(response.data);
        console.log(response.data);
         const opt = response.data.map((ele) => ({
            label: ele.document_type,
            value: ele.document_type
         }));
         setOptions(opt);
      } catch (err) {
         console.error("Error fetching documents:", err);
      }
   };

   useEffect(() => {
      fetchDocuments();
   }, []);
   
   const handleSubmit = () => {
    if (!formData.document_type) {
       alert("Please select a document type.");
       return;
    }
 
    // Find the selected document in the documents list
    const selectedDocument = documents.find(
       (doc) => doc.document_type === formData.document_type
    );
 
    if (selectedDocument && selectedDocument.document_url) {
       // Fetch the file as a blob to force download
       fetch(selectedDocument.document_url)
          .then(response => response.blob())
          .then(blob => {
             const blobUrl = window.URL.createObjectURL(blob);
             const link = document.createElement("a");
             link.href = blobUrl;
             link.download = `${selectedDocument.document_type}.pdf`; // Set filename
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
             window.URL.revokeObjectURL(blobUrl); // Clean up memory
          })
          .catch(err => console.error("Error downloading file:", err));
    } else {
       alert("Document URL not found!");
    }
 };
 
   return (
      <div className="p-12">
         <p className="text-[12px] text-gray-600">
            Home <span className="mx-2">/ Organisation Report</span>
         </p>
         <div className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"} `}>
            <div className="w-auto p-4">
               <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-2">
                     Organisation Document
                  </label>
                  <select
                     name="document_type"
                     value={formData.document_type}
                     onChange={handleInputChange}
                     className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
                     required
                  >
                     <option value="" disabled>
                        Select Document Type
                     </option>
                     {options.map((option, index) => (
                        <option key={index} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </select>
               </div>
               <button onClick={handleSubmit} className="mt-4 rounded-md bg-blue-800 text-white px-3 py-1">Submit</button>
            </div>
         </div>
      </div>
   );
};

export default OrganisationReport;
