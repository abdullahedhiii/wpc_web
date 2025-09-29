import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useCompanyContext } from "../contexts/CompanyContext";

import { useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { toast } from 'react-toastify';

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
  employeePath,
  setData,
  action_route,
  setFetch
}) => {
  const { selectedFeature,subModule } = useModuleContext();
  const {companyData} = useCompanyContext();
  const navigate = useNavigate();
  const [numentries, setNumentries] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortField] = useState({ field: "", order: "Ascending" });
  const {user} = useSelector((state) => state.user);
  const [isDownloading,setIsDownloading] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false);
  const [isUpdating,setIsUpdating] = useState(false);
  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        searchQuery === "" ||
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [data, searchQuery]);
  
  const  handleDeleteAttendance = async(employee_code,date) => {
    try{
      setIsDeleting(true);
        const route = `${import.meta.env.VITE_API_URL}/api/deleteAttendance/${companyData[0].id}/${employee_code}/${date}`;
      const response = await axiosInstance.delete(route);
     setFetch({employee_code,date });

    }
  catch(err){
    // console.log(err);
    toast.error('Error in deleting attendance ',err);
  }
  finally{
    setIsDeleting(false);
  }
}

  const handleDelete = async(delete_route,id) => {
    try{
      setIsDeleting(true);
      // console.log(id);
      const route = `${import.meta.env.VITE_API_URL}/api/${delete_route}/${companyData[0].id}`;
      // console.log(route);
       const response = await axiosInstance.post(route,{},{
        params : {
          job_id : id,
        }
       });
       setFetch();
       toast.success(response?.data?.message);
    }
    catch(err){
       
    }
    finally{
      setIsDeleting(false);
    }

  } 

  useEffect(() => {

  },[data]);
  const handleDownload = async () => {
    // console.log(selectedFeature);
    setIsDownloading(true);
     const routee = selectedFeature ? `${import.meta.env.VITE_API_URL}/api/${selectedFeature.download_api_route}/${companyData[0].id}`
     : `${import.meta.env.VITE_API_URL}/api/${subModule.download_api_route}/${companyData[0].id}`;
     try {
      // console.log(routee);
      const response = await axiosInstance.get(routee);

      if (response.data.pdf_url) {
        window.open(response.data.pdf_url, "_blank"); 
      } else {
      }
    } catch (err) {
      toast.error('Network error downloading pdf',err);
    }
    finally{
      setIsDownloading(false);
    }
  };
  
  useEffect(() => {

  },[data])
  
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

  const handleRequestUpdate = async (status, request_id) => {
      setIsUpdating(true);
    try {
      const y = new Date().getFullYear()
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/updateLeaveRequest`, {
            status: status,
            request_id: request_id,
            year : y,
        });
        setFetch()
        toast.success(`Leave Request status set to ${status}`)
    } catch (err) {
      toast.error('Error in updating leave status ',err);
    }
    finally{
      setIsUpdating(false);
    }
};

return (
  <div className={`${
    isSidebarOpen ? "w-[1150px]" : "w-[1350px]"
  } bg-white rounded-lg shadow-lg border border-yellow-100 overflow-hidden`}>
    {title && (
      <div className="flex justify-between items-center p-4 border-b border-yellow-100 bg-yellow-50">
        <div className="flex items-center gap-2">
          {!isDashboard && selectedFeature && <i className={`la ${selectedFeature.icon} text-yellow-500 text-lg`} />}
          {isDashboard && <i className={`${icon} text-yellow-500 text-lg`} />}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {downloadable && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 bg-yellow-500 text-white shadow hover:bg-yellow-600 h-9 px-4 transform hover:scale-105"
            >
              <i className="la la-download mr-2" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </button>
          )}
          {addMore && (
            <div className="flex items-center gap-4">
              {addEmployeeWise && (
                <button
                  onClick={() => navigate(`/hrms/${employeePath}`)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 bg-yellow-300 text-yellow-500 shadow-sm hover:bg-yellow-200 h-9 px-4 transform hover:scale-105"
                  title={buttonEmployee}
                >
                  <i className="la la-user mr-2" />
                  Add Employee
                </button>
              )}
              <button
                title={buttonTitle}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-white shadow hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
                onClick={() => {
                  if(action_route){
                    navigate(action_route);
                  }            
                  else if (selectedFeature && selectedFeature.plus_icon_route) {
                    navigate(`/hrms/${selectedFeature.plus_icon_route}`)
                  } 
                }}
                disabled={user?.isAdmin ? false : !selectedFeature.can_add}
              >
                <i className="la la-plus text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="p-6 overflow-hidden">
      {(showEntries || searchable) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {showEntries && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Show</label>
              <select
                value={numentries}
                onChange={(e) => {
                  setNumentries(Number.parseInt(e.target.value, 10))
                  setCurrentPage(1)
                }}
                className="h-9 rounded-md border border-yellow-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 hover:border-yellow-300"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span className="text-sm text-gray-500">entries</span>
            </div>
          )}
          {searchable && (
            <div className="relative w-full sm:w-auto">
              <i className="la la-search absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full sm:w-[250px] rounded-md border border-yellow-200 bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 hover:border-yellow-300"
                placeholder="Search in table..."
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-yellow-100 rounded-lg">
            <table className="min-w-full divide-y divide-yellow-100">
              <thead className="bg-yellow-50">
                <tr>
                  {filteredFields.map((field, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {field}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleClickSort(field, "Ascending")}
                            className={`h-3 w-3 transition-colors ${
                              sortBy.order === "Ascending" ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"
                            }`}
                          >
                            <i className="la la-arrow-up text-xs" />
                          </button>
                          <button
                            onClick={() => handleClickSort(field, "Descending")}
                            className={`h-3 w-3 transition-colors ${
                              sortBy.order === "Descending"
                                ? "text-yellow-500"
                                : "text-gray-400 hover:text-yellow-400"
                            }`}
                          >
                            <i className="la la-arrow-down text-xs" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-yellow-100">
                {dataToshow.length > 0 ? (
                  dataToshow.map((row, rowIndex) => (
                    <tr key={rowIndex} className="transition-colors hover:bg-yellow-50/50">
                      {filteredFields.map((field, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {field === "Action" || field === "Edit" || field === "Delete" ? (
                            <>
                            {field === "Action" && Array.isArray(row["Action"]) && (
                              <select
                                className="h-9 rounded-xl border border-yellow-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 hover:border-yellow-300"
                                disabled={isUpdating}
                                onChange={(e) => {
                                  if (location.pathname.includes("leave-approver")) {
                                    handleRequestUpdate(e.target.value, row.id)
                                  } else {
                                    navigate(`/hrms/${e.target.value}`)
                                  }
                                }}
                              >
                               <option value="">View Options</option>
                                {row["Action"].map((option, optionIndex) => (
                                  <option key={optionIndex} value={option.route}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) }
                            
                            {(field === "Action" && !Array.isArray(row["Action"]) && row['Action'] !== null ) && (
                              <button
                                onClick={() => {
                                  if (
                                    location.pathname.includes("rota/shift-management") ||
                                    location.pathname.includes("rota/offday")
                                  ) {
                                    navigate(`/hrms/${selectedFeature.action_route}/${row["Shift Code"]}`)
                                  } else {
                                    navigate(`/hrms/${selectedFeature.action_route}/${row["id"]}`)
                                  }
                                }}
                                disabled={user?.isAdmin ? false : !selectedFeature.can_edit}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-yellow-100 transition-all duration-200"
                                title="Edit"
                              >
                                <i className="la la-edit text-lg text-yellow-500" />
                              </button>
                            )}
                            {
                              field === "Delete" && action_route === "deleteAttendance" && ( 
                                <button
                                  onClick={() => handleDeleteAttendance(row["Employee Code"],row["Date"])}
                                  disabled={user?.isAdmin ? false : !selectedFeature.can_edit || isDeleting}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-red-100 transition-all duration-200"
                                  title="Delete"
                                >
                                  {isDeleting ? <i className="la la-spinner animate-spin text-lg text-red-500" /> : <i className="la la-trash text-lg text-red-500" />}
                                </button>
                              )
                            }
                            {field === "Delete" && !action_route === "deleteAttendance" && (
                              <button
                                onClick={() => handleDelete(row["delete_route"],row["id"])}
                                disabled={user?.isAdmin ? false : !selectedFeature.can_edit || isDeleting}

                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-red-100 transition-all duration-200"
                                title="Delete"
                              >
                                {isDeleting ? <i className="la la-spinner animate-spin text-lg text-red-500" /> : <i className="la la-trash text-lg text-red-500" />}
                              </button>
                            )}
</>

                          ) : (field === "Visitor Link" || field === "Website" || field === "Employee Link" || field === "Job Link" || field === "View Letter") &&
                          row[field] ? (
                            row[field] === 'Job Closed' ?                             <span className="text-sm text-gray-600">{row[field]}</span>
                            :  row[field] === 'Form filled out already' ?  <span>-</span>
:                            <a
                              href={row[field]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block"
                            >
                              <button
                                className="px-3 py-1 text-white bg-yellow-500 rounded-md text-sm hover:bg-yellow-600 transition-all"
                              >
                                View
                              </button>
                            </a>
                          ) : row[field] &&
                            typeof row[field] === "string" &&
                            row[field].startsWith("http") &&
                            /\.(jpg|jpeg|png|gif|svg)$/i.test(row[field]) ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-yellow-100 transition-transform hover:scale-110">
                              <img
                                src={row[field] || "/placeholder.svg"}
                                alt="Content"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-gray-600">{row[field]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={filteredFields.length}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-500">
  Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * numentries + 1} 
  {" "}to {Math.min(currentPage * numentries, filteredData.length)} 
  {" "}of {filteredData.length} entries
</p>

        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-200 bg-white text-gray-700 shadow-sm hover:bg-yellow-50 h-9 px-4 transform hover:scale-105"
          >
            Previous
          </button>
          {currentPage > 1 && (
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-yellow-500 text-white shadow hover:bg-yellow-600 h-9 px-4 transform hover:scale-105 transition-all duration-200">
              {currentPage}
            </button>
          )}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-200 bg-white text-gray-700 shadow-sm hover:bg-yellow-50 h-9 px-4 transform hover:scale-105"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
)
};

export default DataTable;
