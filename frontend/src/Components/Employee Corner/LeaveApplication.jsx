import { useEffect, useState } from "react";
import { Calendar, Home, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const LeaveApplication = () => {
  const { user } = useSelector((state) => state.user);
  const { leaveTypes,fetchLeaveTypes } = useCompanyContext();

  useEffect(() => {
    fetchLeaveTypes();
  }, []);
  
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

  const fetchMyleave = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/getMyLeaves/${user.employee_code}.${formData.leaveType}`
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

      if (to >= from) {
        const timeDiff = to.getTime() - from.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Including start day
        setFormData((prev) => ({ ...prev, days: dayDiff }));
      } else {
        setFormData((prev) => ({ ...prev, days: 0 }));
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
  const handleApply = async () => {
    if(formData.days > formData.leave_in_hand){
      window.alert('You dont have enough leaves left for this holiday type');
      return;
    };
    const current_year = new Date().getFullYear()
    const from = new Date(formData.fromDate).getFullYear()
    if (from != current_year){
      alert('You can apply for past leaves in the current year only');
    }

    try{
       const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/applyLeave`,formData);
       if(response.data.message){
        window.alert(response.data.message);
        return;
       }
       window.alert('Leave application submittedd');
       handleReset()
    }
    catch(err){
        window.alert(err.response.data.message);
    }
  }
 

  return (
    <div className="m-12 max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Home size={18} className="text-gray-700" />
        <ChevronRight size={16} />
        <span>Employee Access Value</span>
        <ChevronRight size={16} />
        <span className="font-semibold text-gray-900">Leave Application</span>
      </div>

      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Leave Application</h1>
        <div className="flex items-center text-green-600 font-medium cursor-pointer">
          <Calendar size={20} />
         <a target="_blank" href="/hrms/employee-corner/holiday"> <span className="ml-2">Holiday Calendar</span> </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <p className="text-gray-700 font-medium">
          Employment Type: <span className="text-yellow-600">{formData.employmentType}</span>
        </p>
        <p className="text-gray-700 font-medium">
          Employee Code: <span className="text-yellow-600">{formData.employeeCode}</span>
        </p>
        <p className="text-gray-700 font-medium">
          Employee Name: <span className="text-yellow-600">{formData.employeeName}</span>
        </p>
      </div>

<form onSubmit={handleApply}>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            required
            >
              <option value="" disabled>Select Leave Type</option>
              {leaveTypes.map((holiday) => (
                <option key={holiday.id} value={holiday.id}>
                  {holiday["Leave Type"]}
                </option>
              ))}

            </select>
          </div>

                    <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Leave In Hand</label>
            <input
              type="text"
              disabled
              value={formData.leave_in_hand}
              require
              className="mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
            <label className="text-gray-700 font-medium">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            />
          </div>

                    <div className="flex flex-col">
            <label className="text-gray-700 font-medium">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Number of days</label>
            <input
              type="text"
              disabled
              value={formData.days}
              className="mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl w-full"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-yellow-700 transition duration-300"
           type="submit"
>
            Apply
          </button>
          <button
          type="button"
            onClick={handleReset}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default LeaveApplication;
