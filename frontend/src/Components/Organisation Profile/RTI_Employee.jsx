import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import {motion} from 'framer-motion'

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Organisation's RTI Employee
          </motion.h1>
         
        </div>
      </div>
      
    </div>
    <div className="p-16">
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
    </div>
  );
};

export default RTIEmployee;
