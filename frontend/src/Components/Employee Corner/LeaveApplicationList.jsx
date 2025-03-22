import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { motion } from "framer-motion";
import DataTable from "../DataTable";
import { useNavigate } from "react-router-dom";

const LeaveApplicationList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/fetchMyApplications`,
        {
          params: {
            employee_code: user.employee_code,
          },
        }
      );
      setApplications(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    "Leave Type",
    "Requested On",
    "Number of days",
    "Dates",
    "Status",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              View your Leave Applications
            </motion.h1>
            <button
              className="px-4 py-2 bg-yellow-100 border border-yellow-200 text-[14px] font-semibold rounded-lg"
              onClick={() => navigate(`/hrms/employee-corner/leave-apply`)}
            >
              Apply For Leave
            </button>
          </div>
        </div>
      </div>

      <div className="p-16">
        <DataTable
          title="Your Leave Applications"
          fields={columns}
          data={applications}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        />
      </div>
    </div>
  );
};

export default LeaveApplicationList;
