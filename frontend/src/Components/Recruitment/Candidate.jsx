import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { motion } from 'framer-motion';
import { UserRound, Download, FileText, BadgeCheck, CalendarClock, Mail, Phone, MapPin, GraduationCap, Briefcase, FileSignature, ArrowRight, ArrowLeft } from 'lucide-react';

const CandidateStatus = ({ details, selectedStatus, setSelectedStatus, fetchAgain }) => {
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
      if (selectedStatus === details.status) {
        alert('To submit, please select an updated status for Candidate');
        return;
      }
      if (isInterviewRelated) {
        payload.interviewDate = interviewDate;
        payload.timeFrom = timeFrom;
        payload.timeTo = timeTo;
      }
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/updateCandidateStatus/${details.id}`, payload);
      fetchAgain();
      alert(`Candidate status updated to ${payload.status}`)
    } catch (err) {
      alert("Failed to update status");
    }
    finally {
      setInterviewDate(""); setToTime(""); settimeFrom("");
    }
  };
  const statuses = [
    "Application Received",
    "Short listed",
    "Online Screen Test",
    "Written Test",
    "Interview",
    "Telephone Interview",
    "Face to Face Interview",
    "Job Offered",
    "Hired",
    "Hold",
    "Rejected"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <BadgeCheck className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-800">Update Recruitment Stage</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Recruitment Stage
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
            required
          >
            <option value="" disabled>Select</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        {isInterviewRelated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Date
              </label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Time
              </label>
              <input
                type="time"
                value={timeFrom}
                onChange={(e) => settimeFrom(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Time
              </label>
              <input
                type="time"
                value={timeTo}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                required
              />
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleStatusUpdate}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
          >
            <BadgeCheck className="w-4 h-4" />
            Update Status
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Candidate = () => {
  const { candidate_id } = useParams();
  const [details, setDetails] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const { isSideBarOpen } = useSidebarContext();

  const fetchCandidateDetails = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCandidate/${candidate_id}`);
      setDetails(response.data);
      setSelectedStatus(response.data.status);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchCandidateDetails();
  }, [candidate_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg">
              <UserRound className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Candidate Details</h1>
              <p className="text-yellow-100 text-sm">View Job Candidate Details</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden ${isSideBarOpen ? "max-w-2xl" : "max-w-4xl"}`}
        >
          <div className="border-b border-gray-100 bg-yellow-50/50">
            <div className="px-6 py-4 flex items-center gap-3">
              <UserRound className="w-5 h-5 text-yellow-600" />
              <h2 className="text-lg font-semibold text-gray-800">Candidate Details</h2>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-[15px]">
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-yellow-700" /><span><strong>Name:</strong> {details.name}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-yellow-700" /><span><strong>Email:</strong> {details.email}</span></div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-yellow-700" /><span><strong>Contact:</strong> {details.contactNo}</span></div>
            <div className="flex items-center gap-2"><UserRound className="w-4 h-4 text-yellow-700" /><span><strong>Gender:</strong> {details.gender}</span></div>
            <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-yellow-700" /><span><strong>Education:</strong> {details.education}</span></div>
            <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-yellow-700" /><span><strong>Experience:</strong> {details.experienceYear} years</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-700" /><span><strong>Current Location:</strong> {details.currentLocation}</span></div>
            <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-yellow-700" /><span><strong>Status:</strong> {details.status}</span></div>
            <div className="flex items-center gap-2"><CalendarClock className="w-4 h-4 text-yellow-700" /><span><strong>Applied Date:</strong> {details.applyDate ? new Date(details.applyDate).toLocaleDateString() : ''}</span></div>
            <div className="flex items-center gap-2"><Download className="w-4 h-4 text-yellow-700" /><span><strong>Resume:</strong> <a href={details.resume} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline ml-1">Download</a></span></div>
            <div className="flex items-center gap-2"><FileSignature className="w-4 h-4 text-yellow-700" /><span><strong>Cover Letter:</strong> <a href={details.coverLetter} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline ml-1">Download</a></span></div>
          </div>
          <CandidateStatus details={details} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} fetchAgain={fetchCandidateDetails} />
        </motion.div>
      </div>
    </div>
  );
};

export default Candidate;
