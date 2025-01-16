import React from 'react';

const DataTable = ({ columns, fields }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto border-spacing-0.5 border-separate"> {/* Add border-spacing */}
      <thead>
          <tr className="bg-gray-100">
            {fields.map((field, index) => (
              <th key={index} className="px-4 py-2 text-left font-semibold text-gray-700 bg-background">
                {field} 
              </th>
            ))}
          </tr>
        </thead>

     
      </table>
    </div>
  );
};

export default DataTable;
