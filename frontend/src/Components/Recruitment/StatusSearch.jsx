import { useState, useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";
import {motion} from 'framer-motion'
const StatusSearch = () => {
  const columns = [
    "Job Code",
    "Job Title",
    "Candidate",
    "Email",
    "Contact Number",
    "Status",
    "Date",
    "Action",
  ];
  const [candidates, setCandidates] = useState([]); 
  const { companyData } = useCompanyContext();
  const [titleOptions, setTitleOptions] = useState([]);
  const [dataToShow,setData] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/getAllCandidates/${companyData[0].id}`
      );
      setCandidates(response.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [companyData]);

  const { isSideBarOpen } = useSidebarContext();
  const [formData, setFormData] = useState({
    title: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (Array.isArray(candidates) && candidates.length > 0) {
      const uniqueTitles = [
        ...new Set(candidates.map((candidate) => candidate["Job Title"])),
      ];
      setTitleOptions(uniqueTitles);
    }
  }, [candidates, formData.stage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    if ( !formData.title || !formData.fromDate || !formData.toDate) {
      alert("Please fill in all fields.");
      return;
    }
    setData([]);
    const filteredCandidates = candidates.filter((candidate) => {
    const isTitleMatch = candidate["Job Title"] === formData.title;
    const candidateDate = new Date(candidate.Date);
    const fromDate = new Date(formData.fromDate);
    const toDate = new Date(formData.toDate);
    const isDateInRange = candidateDate >= fromDate && candidateDate <= toDate;
      
      return isTitleMatch && isDateInRange;
    });
  
    setData(filteredCandidates); 
  };
  

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
            Job Status Search
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            Manage Jobs
          </motion.p>
        </div>
      </div>
      
    </div>
      <div
        className={`mr-16 mt-16 ml-16 border-t-4 border-yellow-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-[800px]" : "w[1300px]"
        } `}
      >
        <form onSubmit={handleGenerate}>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Job Title
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            >
              <option value="" disabled>
                Select
              </option>
              {titleOptions.map((title, id) => (
                <option key={id} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              From Date
            </label>
            <input
              name="fromDate"
              value={formData.fromDate}
              type="date"
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-yellow-400 hover:border-b-4 hover:border-yellow-400 rounded-md"
              required
            />
          </div>
          </div>
           <button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-yellow-700 rounded text-white mb-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      
      </div>
      <div className="p-16">
        <DataTable
          title="Status Search"
          fields={columns}
          data={dataToShow}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        />
      </div>
    </div>
  );
};

export default StatusSearch;
