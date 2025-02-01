import React, { useEffect } from 'react';
import DataTable from '../DataTable';
import { useCompanyContext } from '../../contexts/CompanyContext';

const EmployeeLink = () => {
  const {employees,fetchEmployeesLink} = useCompanyContext();
  const columns = [
    "Sl. No.",
    "Organisation Name",
    "Organisation Address",
    "Employee Name",
    "Department",
    "Job Type",
    "Job Title",
    "Employee Link"
  ];

  useEffect(() => {
    fetchEmployeesLink();
  },[]);
  return (
    <>
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Employee Creation Link</span>
      </p>
      <DataTable
        title="Employee Creation Link"
        fields={columns}
        data={employees}
        showEntries
        searchable
        downloadable
        
      /></div>
    </>
  );
};

export default EmployeeLink;
