import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const LeaveTypeForm = () => {
  const {leave_id} = useParams();
  const navigate = useNavigate();
  const {fetchLeaveTypes,leaveTypes,companyData} = useCompanyContext();
  useEffect(() => {
      fetchLeaveTypes();
  },[]);
  // console.log(leaveTypes,'in form',leave_id);
  const [data, setData] = useState({
      leave_type : '',
      sort_code : '',
  });
  
  
  useEffect(() => {
    if(leave_id){
        const selected_leave = leaveTypes.find((ele) => ele.id === parseInt(leave_id));
        setData({
           id : selected_leave.id,
           leave_type : selected_leave['Leave Type'],
           sort_code : selected_leave['Leave Type Sort Code'],
           remarks : selected_leave['remarks']
        })
    }
  },[]);

 
  const fields = [
    {
      name: "leave_type",
      label: "Leave Type",
      type : 'text',
      required : true

    },
    {
      name: "sort_code",
      label: "Leave Type Sort Code",
      type: "text",
      required : true

    },
    {
      name: "remarks",
      label: "Remarks",
      type: "text",

    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!leave_id && leaveTypes.find(ele => ele['Leave Type'] === data.leave_type || ele['Leave Type Sort Code'] == data.sort_code) ){
      alert('Leave Type already exists or another leave type is associated witht this sort code');
      return;
    }

    const isUpdate = Boolean(leave_id);
    const dataTo = isUpdate ? {...data, leave_id} : {...data};

    try {
        await axiosInstance.post(`/api/addLeaveType/${companyData[0].id}`, dataTo);
        navigate('/hrms/leave-management/leave-type-listing');
    } catch (err) {
    }
};


  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="far fa-calendar"
        title="Add Leave Type"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LeaveTypeForm;
