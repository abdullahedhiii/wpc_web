import { useEffect, useState } from "react";
import { Calendar, Home, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

const LeaveApplication = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetchLeaveTypes();
  // }, []);
  
  const [formData, setFormData] = useState({
    company_id : user.company_id,
    employmentType: user.type,
    employeeCode: user.employee_code,
    employeeName: user.first_name + " " + user.last_name,
    applicationDate: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    leave_in_hand: 0,
    days: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchMyleave = async () => {
    try {
      const year = new Date().getFullYear();
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/getMyLeaves/${user.employee_code}.${formData.leaveType}.${year}`
      );
      if(response.data.message){
        window.alert(response.data.message);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        leave_in_hand: response.data,
      }));
    } catch (err) {
    }
  };

  
  useEffect(() => {
    if (formData.leaveType !== "") {
      setFormData((prev) => ({
        ...prev,
        leave_in_hand : 0,
      }))
      fetchMyleave();
    }
  }, [formData.leaveType]);

  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);

      if (to > from) {
        const timeDiff = to.getTime() - from.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Including start day
        setFormData((prev) => ({ ...prev, days: dayDiff }));
      } else {
        setFormData((prev) => ({ ...prev, fromDate: "",
          toDate: "", days: 0 }));
        alert('Please enter valid dates');
        return;
      }
    }
  }, [formData.fromDate, formData.toDate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   // Handle form reset
   const handleReset = () => {
    setFormData({
      employmentType: user.type,
      employeeCode: user.employee_code,
      employeeName: user.first_name + " " + user.last_name,
      applicationDate: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      leave_in_hand: 0,
      days: 0,
    });
  };
  const handleApply = async (e) => {
    e.preventDefault();
    if(submitting) return;
    setSubmitting(true);
    if(formData.days > formData.leave_in_hand){
      window.alert('You dont have enough leaves left for this holiday type');
      setSubmitting(false);
      return;
    };
    const current_year = new Date().getFullYear();
    const from = new Date(formData.fromDate).getFullYear();
    if (from !== current_year){
      alert('You can apply for past leaves in the current year only');
      setSubmitting(false);
      return;
    }

    try{
       const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/applyLeave`,formData);
       if(response.data.message){
        window.alert(response.data.message);
        setSubmitting(false);
        return;
       }
       window.alert('Leave application submitted');
       navigate('/hrms/employee-corner/leave-applications');
       handleReset();
    }
    catch(err){
        window.alert(err.response?.data?.message || 'An error occurred');
    }
    finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Home size={18} className="text-gray-700" />
        <ChevronRight size={16} />
        <span>Employee Access</span>
        <ChevronRight size={16} />
        <span className="font-semibold text-gray-900">Leave Application</span>
      </div>

      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Leave Application</h1>
        {/* <a target="_blank" rel="noopener noreferrer" href="/hrms/employee-corner/holiday" className="flex items-center text-blue-600 font-medium hover:underline">
          <Calendar size={20} />
          <span className="ml-2">Holiday Calendar</span>
        </a> */}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-500 mb-1">Employment Type</div>
          <div className="font-semibold text-gray-800">{formData.employmentType}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-500 mb-1">Employee Code</div>
          <div className="font-semibold text-gray-800">{formData.employeeCode}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-500 mb-1">Employee Name</div>
          <div className="font-semibold text-gray-800">{formData.employeeName}</div>
        </div>
      </div>

      <form onSubmit={handleApply} className="bg-white rounded-xl shadow p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-50"
              required
            >
              <option value="" disabled>Select Leave Type</option>
              <option value ="Holiday">Holiday Leave</option>
              <option value ="Medical">Medical Leave</option>
              <option value ="Maternity">Maternity Leave (if applicable)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Leave In Hand</label>
            <input
              type="text"
              disabled
              value={formData.leave_in_hand}
              className="mt-1 px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg w-full text-gray-700"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-medium mb-1">Number of Days</label>
            <input
              type="text"
              disabled
              value={formData.days}
              className="mt-1 px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg w-full text-gray-700"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            className={`px-8 py-3 rounded-lg font-semibold text-white transition duration-200 ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Applying...' : 'Apply'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition duration-200"
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplication;
