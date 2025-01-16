import React from 'react';

const DataTable = ({ fields, data }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto border-spacing-0.5 border-separate">
        <thead>
          <tr className="bg-gray-100">
            {fields.map((field, index) => (
              <th
                key={index}
                className="px-4 py-1 text-left text-sm font-semibold text-gray-700 bg-background"
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {fields.map((field, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-1 border text-sm text-gray-600"
                  >
                    {field === 'Action' ? (
                      <button
                        title="Edit"
                        className="text-tt hover:text-blue-700"
                      >
                        <i className="la la-edit text-xl"></i>
                      </button>
                    ) : (
                      row[field] || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={fields.length}
                className="px-6 py-2 text-center text-gray-500 border"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
