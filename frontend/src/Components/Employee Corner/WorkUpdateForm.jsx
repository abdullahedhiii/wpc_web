import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";

const WorkUpdateForm = () => {  
const {user} = useSelector((state) => state.user);
const navigate = useNavigate();  
const [data, setData] = useState({
    update_date: new Date().toISOString().split("T")[0], // Full Date (YYYY-MM-DD)
    fromTime: "",
    toTime: "",
    hours: "",
    minutes: "",
    file: null,
    update: "",
  });
  const calculateTimeDifference = (fromTime, toTime) => {
    if (!fromTime || !toTime) return { hours: "", minutes: "" };
  
    const from = new Date(`1970-01-01T${fromTime}`);
    const to = new Date(`1970-01-01T${toTime}`);
  
    let diffMs = to - from;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; 
  
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return { hours, minutes };
  };
  
  useEffect(() => {
    if (data.fromTime && data.toTime) {
      const { hours, minutes } = calculateTimeDifference(data.fromTime, data.toTime);
      setData((prevData) => ({ ...prevData, hours, minutes }));
    }
  }, [data.fromTime, data.toTime]);
  
  const fields = [
    {name: "update_date",label: "Date",type : 'date', readOnly : true,},
    {name: "fromTime",label: "From Time",type : 'time',},
    {name: "toTime",label: "To Time",type : 'time',},
    {name: "hours",label: "Time(hours)",type : 'number', readOnly : data.fromTime !== '' && data.toTime !== ''},
    {name: "minutes",label: "Time(minutes)",type : 'number', readOnly : data.fromTime !== '' && data.toTime !== ''},
   {name : "file",label : 'Upload File',type : "file"},
   {name : 'update',label : 'Work Update',type : "textarea"}
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("update_date", data.update_date);
    formData.append("fromTime", data.fromTime);
    formData.append("toTime", data.toTime);
    formData.append("hours", data.hours);
    formData.append("minutes", data.minutes);
    formData.append("update", data.update);
  
    if (data.file) {
      formData.append("file", data.file);
    }
  
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/updateWork/${user.company_id}.${user.employee_code}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      navigate(`/hrms/employee-corner/work-update`);
    } catch (err) {
    }
  };
  


  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="fas fa-briefcase"
        title="Tasks"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default WorkUpdateForm;
