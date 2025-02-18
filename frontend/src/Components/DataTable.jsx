import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useSelector } from "react-redux";

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
  addEmployeeWise = false,
  buttonEmployee,
  employeePath
}) => {
  const { selectedFeature } = useModuleContext();
  const navigate = useNavigate();
  const [numentries, setNumentries] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortField] = useState({ field: "", order: "Ascending" });
  const {user} = useSelector((state) => state.user);
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
  const { isSidebarOpen } = useSidebarContext();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToshow, setDataToShow] = useState([]);

  useEffect(() => {
    if (sortedData.length > 0) {
      const total = Math.ceil(sortedData.length / numentries);
      setTotalPages(total);
    }
  }, [sortedData,numentries]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * numentries;
    const endIndex = startIndex + numentries;
    const currentData = sortedData.slice(startIndex, endIndex);
    setDataToShow(currentData);
  }, [currentPage, sortedData,numentries]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-[1180px]" : "w-[1360px]"
      } border-t-4 border-tt bg-white rounded-md shadow-md`}
    >
      {title && (
        <div className="flex justify-between items-center mb-3 border-b-2 border-b-gray-200">
          <div className="p-2 flex items-center space-x-2">
            {!isDashboard && selectedFeature && (
              <i className={`la ${selectedFeature.icon} pl-2 text-[14px] text-blue-900`}></i>
            )}
            {isDashboard && (
              <i className={`pl-2 ${icon} text-[14px]  text-blue-900`}></i>
            )}
            <h2 className="text-[14px] font-semibold text-blue-900">{title}</h2>
          </div>
          <div className="flex items-center space-x-2 pr-6">
            {downloadable && (
             
                <img src="/images/dnld.png" 
                className="h-6 w-6 cursor-pointer"
              />              
  
            )}
            {addMore && (
              <div className="flex space-x-4">
                {
                  addEmployeeWise && 
                  <img 
                    src="/images/user-image.png"
                    className="h-6 w-6 cursor-pointer"
                    title={buttonEmployee}
                    onClick={() => navigate(`/hrms/${employeePath}`)}
                  />
                }
              <button
                title={buttonTitle}
                className="bg-background text-white w-6 h-6 border rounded-full hover:text-blue-700"
                onClick={() => {
                  if (selectedFeature && selectedFeature.plus_icon_route) {
                    navigate(`/hrms/${selectedFeature.plus_icon_route}`);
                    
                  } else {
                    navigate("/hrms/addemployee");
                  }
                }}
                disabled = {user.isAdmin ? false : !selectedFeature.can_add}

              >
                <i className="la la-plus text-xl"></i>
              </button>
              </div>
            )}
          </div>
        </div>
      )}

<div className="w-full overflow-x-auto p-8">
  <div className="w-full">
          {(showEntries || searchable) && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
              {showEntries && (
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <label htmlFor="entries">Show</label>
                  <select
                    id="entries"
                    value={numentries}
                    onChange={(e) =>{
                      setNumentries(parseInt(e.target.value, 10))
                      setCurrentPage(1)}
                    }
                    className="border rounded px-4 py-1"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <span>entries</span>
                </div>
              )}
              {searchable && (
                <div className="flex items-center space-x-2  md:w-auto">
                  <label htmlFor="search">Search:</label>
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded px-2 py-1 w-full md:w-auto"
                    placeholder="Search here..."
                  />
                </div>
              )}
            </div>
          )}

<div className="w-full overflow-x-auto">
<table className="w-full table-auto border-spacing-0.5 border-separate">     
  <thead>       
              <tr className="bg-gray-100">
                {filteredFields.map((field, index) => (
                  <th
                    key={index}
                    className="relative px-3 py-1 text-left text-[14px] font-semibold text-white bg-blue-400  break-words whitespace-nowrap"
                  >
                    <div className="flex justify-between items-start">
                      {field}
                      <div className="absolute text-xs top-0 right-[-4px] space-y-1 pr-1">
                        <i
                          className={`la la-arrow-up ${sortBy.order === 'Ascending' ? 'text-white' : 'text-gray-100'} block cursor-pointer`}
                          onClick={() => handleClickSort(field, "Ascending")}
                        ></i>
                        <i
                          className={`la la-arrow-down ${sortBy.order === 'Descending' ? 'text-white' : 'text-gray-100'} block cursor-pointer`}
                          onClick={() => handleClickSort(field, "Descending")}
                        ></i>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataToshow.length > 0 ? (
                dataToshow.map((row, rowIndex) => (
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
                        className="px-2 py-1 border text-[14px] text-gray-600 max-w-[200px] "
                      >
                        {field === "Action" ||
                        field === "Edit" ||
                        field === "Delete" ? (
                          Array.isArray(row["Action"]) ? (
                            <select
                              className="border rounded py-1 bg-blue-600 text-white hover:bg-blue-700"
                              onChange={(e) =>
                                navigate(`/hrms/${e.target.value}`)
                              }
                            >
                              <option>Action</option>
                              {row["Action"].map((option, optionIndex) => (
                                <option key={optionIndex} value={option.route}>
                                  {option.label}
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
                              disabled = {user.isAdmin ? false : !selectedFeature.can_edit}
                              title="Edit"
                            />
                          ) : row["Action"] === "Delete" ||
                            field === "Delete" ? (
                            <img
                              src="/images/delete.png"
                              className="h-4 w-4 cursor-pointer"
                              onClick={() => {}}
                              title="Delete"
                              disabled = {user.isAdmin ? false : !selectedFeature.can_edit}

                            />
                          ) : null
                        ) : (field === "Visitor Link" ||
                            field === "Employee Link" ||
                            field === "Job Link") &&
                          row[field] ? (
                          <a
                            href={row[field]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-center break-words"
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
          <div className="pt-2 flex flex-col md:flex-row justify-between items-start md:items-center mb-2 mt-2">
            <div >
              Showing {Math.min(filteredData.length, numentries)} of{" "}
              {filteredData.length} entries
            </div>
            <div className="flex space-x-3">
              <button
                className={`border border-1 rounded-full px-4 py-2 ${
                  currentPage === 1 ? "bg-white text-gray-600" : "bg-tt text-white"
                }`}
                onClick={handlePrevPage}
              >
                Previous
              </button>
              <button
                className={`border border-1 rounded-full px-4 py-2 ${
                  currentPage === 1 ? "hidden" : "bg-tt text-white"
                }`}
              >
                {currentPage}
              </button>
              <button
                className={`border border-1 rounded-full px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-white text-gray-600"
                    : "bg-tt text-white"
                }`}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
