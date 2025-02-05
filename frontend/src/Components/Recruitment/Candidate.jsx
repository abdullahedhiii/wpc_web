import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { FaDownload } from "react-icons/fa";
import { useSidebarContext } from "../../contexts/SidebarContext";

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
        className="text-[12px] w-full p-2 mt-2 border rounded-md focus:outline-none focus:border-blue-200 focus:border-b-4"
      >
        <option value="">Select</option>
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
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-blue-200 focus:border-b-4"
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
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-blue-200 focus:border-b-4"
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
        className="text-[12px] w-full p-2 border rounded-md focus:outline-none focus:border-blue-200 focus:border-b-4"
      />
    </div>
  </div>
)}

      <button
        onClick={handleStatusUpdate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home <span className="mx-2">/</span> Employee <span className="mx-2 text-tt">/ Candidate Details</span>
      </p>
      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-4 ${isSideBarOpen ? "max-w-[1200px]" : "max-w-[1300px]"}`}
      >
        <div className="flex items-center space-x-2">
          <i className="fas fa-user-tie text-blue-800 text-[18px]"></i>
          <p className="text-blue-800 text-[18px]">Candidate Details</p>
        </div>

        <div className="text-[14px] mt-12 bg-blue-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-sm shadow-md">
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
            <a href={details.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <FaDownload className="inline-block ml-2" />
            </a>
          </p>

          <p>
            <strong>Cover Letter:</strong>{" "}
            <a href={details.coverLetter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
