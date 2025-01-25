import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";


const Level1User = () => {
  const { level1Details } = useCompanyContext();
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

  const mappedData = level1Details.map((detail, index) => ({
    id: index + 1, 
    "Sl. No.": index + 1, 
    Name: `${detail.Level1_fname} ${detail.Level1_lname}`,
    Designation: detail.Level1_designation,
    "Phone No": detail.Level1_phone,
    "Email ID": detail.Level1_email,
    "Do you have a history of criminal conviction/Bankrupcy": detail.Level1_history,
    "Proof of Id": detail.Level1_proof_id,
  }));
  

  return (
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
      <a href="/hrms/companydashboard">Home</a>  / <span className="text-tt">Level 1 User</span>
      </p>
      <DataTable
        title="Level 1 user"
        fields={columns}
        data={mappedData}
        showEntries
        searchable
        downloadable
        icon="la la-user"
        isDashboard = {true}

      />
    </div>
  );
};

export default Level1User;
