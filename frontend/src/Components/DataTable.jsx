import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";

const DataTable = ({
  title,
  fields,
  data,
  showEntries = true,
  searchable = true,
  downloadable = true,
  addMore,
  icon,
  isDashboard,
  buttonTitle,
  isMain
}) => {
  const { selectedFeature } = useModuleContext();
  console.log("in data table ", data);

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
    
    <div className="x-2 border-t-4 border-tt bg-white rounded-md shadow-md ">
      {title && (
        <div className="flex justify-between items-center mb-3 border-b-2 border-b-gray-200">
          <div className="p-2 flex items-center space-x-2">
            {!isDashboard && selectedFeature && (
              <i className={`la ${selectedFeature.icon} pl-2 text-xl`}></i>
            )}

            {isDashboard && <i className={`pl-2 ${icon} text-[18px] text-blue-900`}></i>}
            <h2 className="text-[14px] font-semibold text-blue-900">{title}</h2>
          </div>
          {downloadable && (
            <div className="pr-2">
              <button
                title="Export Data"
                className="bg-background text-white w-8 h-8 border rounded-full hover:text-blue-700"
              >
                <i className="la la-download text-[20px]"></i>
              </button>
            </div>
          )}
          {addMore && (
            <button
              title={buttonTitle}
              className="m-3 bg-background text-white w-6 h-6 border rounded-full hover:text-blue-700"
              onClick={() =>
               selectedFeature ? navigate(`/hrms/${selectedFeature.plus_icon_route}`)
               : title === 'Employee' ? navigate("/hrms/addemployee") : undefined
              }
            >
              <i className="la la-plus text-xl"></i>
            </button>
          )}
        </div>
      )}

      {(showEntries || searchable) && (
        <div className="px-8 flex justify-between items-center mb-2">
          {showEntries && (
            <div>
              <label htmlFor="entries" className="mr-2">
                Show
              </label>
              <select
                id="entries"
                value={numentries}
                onChange={(e) => setNumentries(parseInt(e.target.value, 10))}
                className="border rounded px-4 py-1"
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

      <div className="relative w-full overflow-x-auto">
        <table className="px-8 w-full table-auto border-spacing-0.5 border-separate">
          <thead>
            <tr className="bg-gray-100">
              {filteredFields.map((field, index) => (
                <th
                  key={index}
                  className="relative px-4  py-1 text-left text-[12px] font-semibold text-white bg-background"
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
                  className={
                    rowIndex % 2 !== 0
                      ? "bg-white hover:bg-gray-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                >
                  {filteredFields.map((field, colIndex) => (
                    <td
                    key={colIndex}
                    className="px-6 py-1 border text-[10px] text-gray-600 break-words whitespace-normal max-w-[100px]"
                  >
                  
                      {field === "Action" ||
                      field === "Edit" ||
                      field === "Delete" ? (
                        Array.isArray(row["Action"]) ? (
                          <select className="border rounded  py-1 bg-purple-600 text-white hover:bg-blue-700">
                            {row["Action"].map((option, optionIndex) => (
                              <option key={optionIndex} value={option} className="text-white">
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : row["Action"] === "Edit" || field === "Edit" ? (
                          <img
                            src="/images/edit.png"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/hrms/${selectedFeature.action_route}/${row["id"]}`
                              )
                            }
                            title="Edit"
                          />
                        ) : row["Action"] === "Delete" || field === "Delete" ? (
                          <img
                            src="/images/delete.png"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {}}
                            title="Delete"
                          />
                        ) : null
                      ) : field === "Visitor Link" && row[field] ? (
                        <a
                          href={row[field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline ml-48 text-center"
                        >
                          {row[field]}
                        </a>
                      ) : row[field] &&
                        typeof row[field] === "string" &&
                        row[field].startsWith("http") &&
                        /\.(jpg|jpeg|png|gif|svg)$/i.test(row[field]) ? (
                        <img
                          src={row[field]}
                          alt="Dynamic Content"
                          className="h-12 w-12 object-cover rounded"
                        />
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

      <div className="px-8 py-2 flex justify-between items-center mt-2">
        <div>
          Showing {Math.min(filteredData.length, numentries)} of{" "}
          {filteredData.length} entries
        </div>
      </div>
    </div>
  );
};

export default DataTable;
