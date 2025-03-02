import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { FaDownload } from "react-icons/fa";
import { useSidebarContext } from "../../contexts/SidebarContext";
import {motion} from 'framer-motion';

const CandidateStatus = ({ details, selectedStatus, setSelectedStatus,fetchAgain }) => {
  const [interviewDate, setInterviewDate] = useState(details.interviewDate);
  const [timeFrom, settimeFrom] = useState(details.timeFrom);
  const [timeTo, setToTime] = useState(details.timeTo);

  const isInterviewRelated = [
    "Interview",
    "Online Screen Test",
    "Written Test",
    "Telephone Interview",
    "Face to Face Interview",
  ].includes(selectedStatus);
  
  const handleStatusUpdate = async () => {
    try {
      const payload = { status: selectedStatus };

      if (isInterviewRelated) {
        payload.interviewDate = interviewDate;
        payload.timeFrom = timeFrom;
        payload.timeTo = timeTo;
      }
      console.log(payload);
      await axiosInstance.post(`/api/updateCandidateStatus/${details.id}`, payload);
     fetchAgain();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
    finally{
      setInterviewDate(""); setToTime(""); settimeFrom("");

    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <label className="block text-[13px] font-medium text-gray-700">
        Current Recruitment Stage:
      </label>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="text-[12px] w-full p-2 mt-2 border rounded-md focus:outline-none focus:border-yellow-200 focus:border-b-4"
        required
      >
        <option value="" disabled>Select</option>
        <option value="Application Received">Application Received</option>
        <option value="Short listed">Short listed</option>
        <option value="Interview">Interview</option>
        <option value="Online Screen Test">Online Screen Test</option>
        <option value="Written Test">Written Test</option>
        <option value="Telephone Interview">Telephone Interview</option>
        <option value="Face to Face Interview">Face to Face Interview</option>
        <option value="Job Offered">Job Offered</option>
        <option value="Hired">Hired</option>
        <option value="Hold">Hold</option>
        <option value="Rejected">Rejected</option>
      </select>

      {isInterviewRelated && (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-[13px] font-medium text-gray-700">
        Interview Date
      </label>
      <input
        type="date"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-yellow-200 focus:border-b-4"
        required
      />
    </div>

    <div>
      <label className="block text-[13px] font-medium text-gray-700">
        From Time
      </label>
      <input
        type="time"
        value={timeFrom}
        onChange={(e) => settimeFrom(e.target.value)}
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-yellow-200 focus:border-b-4"
        required
      />
    </div>

    <div>
      <label className="block text-[13px] font-medium text-gray-700">
        To Time
      </label>
      <input
        type="time"
        value={timeTo}
        onChange={(e) => setToTime(e.target.value)}
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-yellow-200 focus:border-b-4"
        required
      />
    </div>
  </div>
)}

      <button
        onClick={handleStatusUpdate}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
      >
        Update Status
      </button>
    </div>
  );
};

const Candidate = () => {
  const { candidate_id } = useParams();
  const [details, setDetails] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(""); // Added state for selectedStatus
  const { isSideBarOpen } = useSidebarContext();

  const fetchCandidateDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/getCandidate/${candidate_id}`);
      setDetails(response.data);
      setSelectedStatus(response.data.status); // Set the initial status
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidateDetails();
  }, [candidate_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
    {/* Header Section */}
    <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Candidate Details
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-yellow-100 text-sm"
          >
            View Job Candidate Details
          </motion.p>
        </div>
      </div>
      
    </div>
      <div
        className={`mr-16 mt-16 ml-16 border-t-4 border-yellow-600 rounded shadow-md p-4 ${isSideBarOpen ? "w-[800px]" : "w[1300px]"}`}
      >
        <div className="flex items-center space-x-2">
          <i className="fas fa-user-tie text-yellow-800 text-[18px]"></i>
          <p className="text-yellow-800 text-[18px]">Candidate Details</p>
        </div>

        <div className="text-[14px] mt-12 bg-yellow-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-sm shadow-md">
          <p><strong>Name:</strong> {details.name}</p>
          <p><strong>Email:</strong> {details.email}</p>
          <p><strong>Contact:</strong> {details.contactNo}</p>
          <p><strong>Gender:</strong> {details.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(details.dob).toLocaleDateString()}</p>
          <p><strong>Education:</strong> {details.education}</p>
          <p><strong>Experience:</strong> {details.experienceYear} years, {details.experienceMonth} months</p>
          <p><strong>Current Location:</strong> {details.currentLocation}</p>
          <p><strong>Recent Position:</strong> {details.recentPosition}</p>
          <p><strong>Next Job Title:</strong> {details.nextJobTitle || "N/A"}</p>
          <p><strong>Status:</strong> {details.status}</p>
          <p><strong>Applied Date:</strong> {new Date(details.applyDate).toLocaleDateString()}</p>

          <p>
            <strong>Resume:</strong>{" "}
            <a href={details.resume} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
              <FaDownload className="inline-block ml-2" />
            </a>
          </p>

          <p>
            <strong>Cover Letter:</strong>{" "}
            <a href={details.coverLetter} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
              <FaDownload className="inline-block ml-2" />
            </a>
          </p>
        </div>

          <CandidateStatus details= { details} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} fetchAgain = {fetchCandidateDetails} />
      </div>
    </div>
  );
};

export default Candidate;
