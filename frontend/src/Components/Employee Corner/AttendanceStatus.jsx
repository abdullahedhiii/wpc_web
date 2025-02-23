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
        try{
           const response  = await axiosInstance.get(`/api/getMyAttendance`,{
            params : formData
           });
           console.log(response.data);
           setAttendance(response.data);
        }
        catch(err){

        }
    }
  return (
    <div className="m-20 max-w-7xl bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Home size={18} />
        <ChevronRight size={16} />
        <span>Employee Access Value</span>
        <ChevronRight size={16} />
        <span className="text-gray-900">Attendance Status</span>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="text-blue-500" size={24} />
          <h1 className="text-xl text-blue-500 font-medium">Attendance Status</h1>
        </div>

        <div className="flex items-center gap-6 text-[13px]">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 ">
              <label className="text-gray-600">From Date</label>
              <div className="relative">
              <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
            />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600">To Date</label>
              <div className="relative">
              <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
            />
              </div>
            </div>

          </div>
          
        </div>
        <button 
           className="bg-blue-700 text-white font-semibold text-[12px] px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors mt-6"
           onClick={handleView}
        >
              View
        </button>
      </div>

      <div className="mt-5">
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

