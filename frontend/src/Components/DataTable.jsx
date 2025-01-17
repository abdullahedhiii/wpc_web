import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataTable = ({ title, fields, data, showEntries = true, searchable = true, downloadable = true }) => {
  const navigate = useNavigate();
  const [numentries, setNumentries] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(row => 
    searchQuery === "" ||
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const displayedData = filteredData.slice(0, numentries);

  // Remove "id" from fields for display
  const filteredFields = fields.filter(field => field !== "id");

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <i className="la la-database text-2xl"></i>
            <h2 className="text-lg">{title}</h2>
          </div>
          {downloadable && (
            <button
              title="Export Data"
              className="bg-background text-white w-10 h-10 border rounded-full hover:text-blue-700"
            >
              <i className="la la-download text-2xl"></i>
            </button>
          )}
        </div>
      )}

      {(showEntries || searchable) && (
        <div className="flex justify-between items-center mb-4">
          {showEntries && (
            <div>
              <label htmlFor="entries" className="mr-2">
                Show
              </label>
              <select
                id="entries"
                value={numentries}
                onChange={(e) => setNumentries(parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
          )}
          {searchable && (
            <div>
              <label htmlFor="search" className="mr-2">
                Search:
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="Search here..."
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-spacing-0.5 border-separate">
          <thead>
            <tr className="bg-gray-100">
              {filteredFields.map((field, index) => (
                <th
                  key={index}
                  className="relative px-4 py-1 text-left text-sm font-semibold text-gray-700 bg-background"
                >
                  <div className="flex justify-between items-start">
                    {field}
                    <div className="absolute text-xs top-0 right-0 space-y-1 pr-1">
                      <i className="la la-arrow-up text-white block"></i>
                      <i className="la la-arrow-down text-white block"></i>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {filteredFields.map((field, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-1 border text-sm text-gray-600"
                    >
                      {field === "Action" ? (
                        <li 
                          className="la la-edit text-2xl text-tt cursor-pointer"
                          onClick={() => navigate(`/hcms/company-profile/edit-company/${row["id"]}`)}
                        ></li>
                      ) : (
                        row[field] || "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={filteredFields.length}
                  className="px-6 py-2 text-center text-gray-500 border"
                >
                  No data available in the table.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {Math.min(filteredData.length, numentries)} of {filteredData.length} entries
        </div>
      </div>
    </div>
  );
};

export default DataTable;
