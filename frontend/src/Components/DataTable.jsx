import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";

const DataTable = ({title,fields,data,showEntries = true,searchable = true,downloadable = true,addMore,}) => {
  const {selectedFeature} = useModuleContext();
  console.log(selectedFeature);
  const navigate = useNavigate();
  const [numentries, setNumentries] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortField] = useState({ field: "", order: "" });
  


  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        searchQuery === "" ||
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [data, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortBy.field) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortBy.field];
      const valueB = b[sortBy.field];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortBy.order === "Ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortBy.order === "Ascending" ? valueA - valueB : valueB - valueA;
      }

      return sortBy.order === "Ascending"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });
  }, [filteredData, sortBy]);

  const displayedData = useMemo(
    () => sortedData.slice(0, numentries),
    [sortedData, numentries]
  );

  const handleClickSort = (field, order) => {
    setSortField({ field, order });
  };

  const filteredFields = fields.filter((field) => field !== "id");

  return (
    <div className="m-8 w-full p-4 border-t-4 border-tt bg-white rounded-lg shadow-md">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {selectedFeature && <i className={`la ${selectedFeature.icon} text-2xl`}></i> }
            {!selectedFeature && <i className="la la-building text-2xl"></i>}
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
          {addMore && (
            <button
              title="Export Data"
              className="bg-background text-white w-10 h-10 border rounded-full hover:text-blue-700"
            >
              <i className="la la-plus text-2xl"></i>
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
                  className="relative px-4 py-1 text-left text-sm font-semibold text-white bg-background"
                >
                  <div className="flex justify-between items-start">
                    {field}
                    <div className="absolute text-xs top-0 right-0 space-y-1 pr-1">
                      <i
                        className="la la-arrow-up text-white block cursor-pointer"
                        onClick={() => handleClickSort(field, "Ascending")}
                      ></i>
                      <i
                        className="la la-arrow-down text-white block cursor-pointer"
                        onClick={() => handleClickSort(field, "Descending")}
                      ></i>
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
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {filteredFields.map((field, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-1 border text-sm text-gray-600"
                    >
                      {field === "Action" ? (
                        row["Action"] === "Edit" ? (
                          <li
                            className="la la-edit text-2xl text-tt cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/hrms/company-profile/edit-company/${row["id"]}`
                              )
                            }
                          ></li>
                        ) : row["Action"] === "Delete" ? (
                          <li
                            className="la la-trash text-2xl text-tt cursor-pointer"
                            onClick={() => {}}
                          ></li>
                        ) : null
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
          Showing {Math.min(filteredData.length, numentries)} of{" "}
          {filteredData.length} entries
        </div>
      </div>
    </div>
  );
};

export default DataTable;
