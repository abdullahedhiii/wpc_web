import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion'

const KeyContact = () => {
  const { keyContactDetails } = useCompanyContext();
  const columns = [
    "id",
    "Sl. No.",
    "Name",
    "Designation",
    "Phone No",
    "Email ID",
    "Do you have a history of criminal conviction/Bankrupcy",
    "Proof of Id",
  ];

  const mappedData = keyContactDetails.map((detail, index) => ({
    id: index + 1, 
    "Sl. No.": index + 1, 
    Name: `${detail.KeyContact_fname} ${detail.KeyContact_lname}`,
    Designation: detail.KeyContact_designation,
    "Phone No": detail.KeyContact_phone,
    "Email ID": detail.KeyContact_email,
    "Do you have a history of criminal conviction/Bankrupcy": detail.KeyContact_history,
    "Proof of Id": detail.KeyContact_proof_id,
  }));
  

  return (
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
            Organisation's Key Contact
          </motion.h1>
        
        </div>
      </div>
      
    </div>
    <div className="p-16">
      <DataTable
        title="Key Contact"
        fields={columns}
        data={mappedData}
        showEntries
        searchable
        downloadable
        icon="la la-user"
        isDashboard = {true}

      />
    </div>
    </div>
  );
};

export default KeyContact;
