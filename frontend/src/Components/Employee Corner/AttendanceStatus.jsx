import { Eye, Home, ChevronRight, Calendar } from "lucide-react"
import { useState } from "react";
import DataTable from "../DataTable";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";

const AttendanceStatus = () => {
    const {user} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        employeeCode: user.employee_code,
        fromDate: "",
        toDate: "",
      });
    
    const columns = ['Sl No.','Date','Clock In','Clock In Location',
        'Clock Out','Clock Out Location','Duty Hours'
    ]
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
     const [attendance,setAttendance] = useState([]);
    const handleView = async(e) => {
      const t = new Date(formData.fromDate);
      const w = new Date(formData.toDate);
      if(w < t){
        alert('Enter valid from and to dates!');
        return;
      }
        try{
           const response  = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getMyAttendance`,{
            params : formData
           });
           setAttendance(response.data);
        }
        catch(err){

        }
    }
  return (
    <div className="py-12 px-4 max-w-5xl mx-auto min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Home size={18} />
        <ChevronRight size={16} />
        <span>Employee Access</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-semibold">Attendance Status</span>
      </div>

      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="text-yellow-500" size={28} />
          <h1 className="text-2xl text-gray-900 font-bold tracking-wide">Attendance Status</h1>
        </div>

        <form
          onSubmit={e => { e.preventDefault(); handleView(); }}
          className="flex flex-col md:flex-row md:items-end gap-6 mb-4"
        >
          <div className="flex flex-col gap-1 w-full md:w-1/3">
            <label className="text-gray-600 font-medium mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full bg-gray-50"
            />
          </div>

          <div className="flex flex-col gap-1 w-full md:w-1/3">
            <label className="text-gray-600 font-medium mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full bg-gray-50"
            />
          </div>

          <button 
            type="submit"
            className="bg-yellow-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-yellow-700 transition-colors mt-4 md:mt-0 md:ml-4 shadow"
          >
            View
          </button>
        </form>
      </div>

      <div className="bg-white/90 rounded-2xl shadow-xl p-6">
        <DataTable
          title="Attendance"
          fields={columns}
          data={attendance}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
          buttonTitle = "Add New Leave Allocation"
        />
      </div>
    </div>
  )
}

export default AttendanceStatus

