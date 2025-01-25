import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";


const AuthorizingOfficer = () => {
  const { authorizingDetails } = useCompanyContext();
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

  const mappedData = authorizingDetails.map((detail, index) => ({
    id: index + 1, 
    "Sl. No.": index + 1, 
    Name: `${detail.Authorizing_fname} ${detail.Authorizing_lname}`,
    Designation: detail.Authorizing_designation,
    "Phone No": detail.Authorizing_phone,
    "Email ID": detail.Authorizing_email,
    "Do you have a history of criminal conviction/Bankrupcy": detail.Authorizing_history,
    "Proof of Id": detail.Authorizing_proof_id,
  }));
  

  return (
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
        <a href="/hrms/companydashboard">Home</a> / <span className="text-tt">Authorizing Officer</span>
      </p>
      <DataTable
        title="Authorizing Officer"
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

export default AuthorizingOfficer;
