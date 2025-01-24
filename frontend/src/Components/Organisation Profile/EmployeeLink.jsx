import React from 'react';
import DataTable from '../DataTable';

const EmployeeLink = () => {
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

  const data = []; 

  return (
    <>
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Employee Creation Link</span>
      </p>
      <DataTable
        title="Employee Creation Link"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable
      /></div>
    </>
  );
};

export default EmployeeLink;
