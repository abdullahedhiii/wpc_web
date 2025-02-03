import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const HolidayTypeForm = () => {
    const navigate = useNavigate();
  const {companyData,holidayData} = useCompanyContext();
  const {h_id} = useParams();

  const [data, setData] = useState({
    holiday_type : ''
  });
  const fields = [
    {
      label: "Holiday Type",
      type: "text",
      name: "holiday_type",
    },
  ];
  
  useEffect(() => {
      if(h_id){
          const selected_holiday = holidayData.find((ele) => ele.id === parseInt(h_id));
          if(selected_holiday){
            setData({
                holiday_type : selected_holiday['Holiday Type']
            })
          }
      }
  },[h_id]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const isUpdate = Boolean(h_id);
      const send_data = isUpdate ? {...data,isUpdate,h_id} : {...data,isUpdate};
      try{
         const response = await axiosInstance.post(`/api/addHolidayType/${companyData[0].id}`,send_data);
         if(response.status === 201){
            navigate('/hrms/holiday-type');
         } 
      }
      catch(err){

      }
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="fas fa-calendar"
        title="Add Holiday Type"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HolidayTypeForm;
