import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";


const RTIEmployee = () => {
  const { rtiDetails } = useCompanyContext();
  const columns = [
    "id",
    "Sl. No.",
    "Employee Name",
    "Department",
    "Job Type",
    "Job Title",
    "Immigration Status",
  ];

  const mappedData = rtiDetails.map((detail, index) => ({
    id: index + 1, 
    "Sl. No.": index + 1, 
    Name: `${detail.RTI_fname}`,
    Department: detail.RTI_department,
    "Job Type": detail.RTI_job_type,
    "Job Title": detail.RTI_job_title,
    "Immigration status" : detail.RTI_Immigration_Status
  }));
  

  return (
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
      <a href="/hrms/companydashboard">Home</a>  / <span className="text-tt">Employees According to RTI</span>
      </p>
      <DataTable
        title="Employees According to RTI"
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

export default RTIEmployee;
