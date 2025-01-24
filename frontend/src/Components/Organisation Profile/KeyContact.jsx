import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";


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
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
      <a href="/hrms/companydashboard">Home</a> / <span className="text-tt">Key Contact</span>
      </p>
      <DataTable
        title="Key Contact"
        fields={columns}
        data={mappedData}
        showEntries
        searchable
        downloadable
      />
    </div>
  );
};

export default KeyContact;
