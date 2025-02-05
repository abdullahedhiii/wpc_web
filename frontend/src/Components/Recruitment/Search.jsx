import { useState, useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
import { useSidebarContext } from "../../contexts/SidebarContext";
import axiosInstance from "../../../axiosInstance";

const Search = () => {
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
      console.error(err); 
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [companyData]);

  const { isSideBarOpen } = useSidebarContext();
  const [formData, setFormData] = useState({
    stage: "",
    title: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (Array.isArray(candidates) && candidates.length > 0) {
      const filtered = candidates.filter(
        (candidate) => candidate.Status === formData.stage
      );
      const uniqueTitles = [
        ...new Set(filtered.map((candidate) => candidate["Job Title"])),
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
    if (!formData.stage || !formData.title || !formData.fromDate || !formData.toDate) {
      alert("Please fill in all fields.");
      return;
    }
    setData([]);
    const filteredCandidates = candidates.filter((candidate) => {
    const isStatusMatch = candidate.Status === formData.stage;
    const isTitleMatch = candidate["Job Title"] === formData.title;
    const candidateDate = new Date(candidate.Date);
    const fromDate = new Date(formData.fromDate);
    const toDate = new Date(formData.toDate);
    const isDateInRange = candidateDate >= fromDate && candidateDate <= toDate;
      
      return isStatusMatch && isTitleMatch && isDateInRange;
    });
  
    console.log(filteredCandidates); 
    setData(filteredCandidates); 
  };
  

  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Search</span>
      </p>
      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"
        } `}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Current Stage Of Recruitment
            </label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="Application Received">Application Received</option>
              <option value="Short listed">Short listed</option>
              <option value="Interview">Interview</option>
              <option value="Online Screen Test">Online Screen Test</option>
              <option value="Written Test">Written Test</option>
              <option value="Telephone Interview">Telephone Interview</option>
              <option value="Face to Face Interview">
                Face to Face Interview
              </option>
              <option value="Job Offered">Job Offered</option>
              <option value="Hired">Hired</option>
              <option value="Hold">Hold</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700">
              Job Title
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
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
              className="text-[13px] mt-1 block w-full px-3 py-2 border focus:outline-none focus:border-b-4 focus:border-blue-400 hover:border-b-4 hover:border-blue-400 rounded-md"
              required
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className="ml-4 px-4 py-2 text-[14px] font-semibold bg-blue-700 rounded text-white mb-4"
            onClick={handleGenerate}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-8">
        <DataTable
          title="Search"
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

export default Search;
