import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const HolidayListForm = () => {
  const navigate = useNavigate();
  const {ho_id} = useParams();
  const {holidayList,holidayData,companyData} = useCompanyContext();
  const [data, setData] = useState({
    year : new Date().getFullYear(),
    day: 'Monday',
    start_date : '',
    end_date : '',
    description : '',
    holiday_type : holidayData[0]['Holiday Type'],
    num_days : NaN
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const day_options = days.map((day) => ({ label: day, value: day }));
  
  useEffect(() => {
       if(ho_id){
           const selected_holiday = holidayList.find((ele) => ele.id === parseInt(ho_id));
           if (selected_holiday) {
            const [s, e] = selected_holiday['Date'].split(' - '); 
            setData({
              year: selected_holiday['Year'],
              day: selected_holiday['Day of Week'],
              start_date: s, 
              end_date: e,    
              description: selected_holiday['Holiday Description'],
              holiday_type: selected_holiday['Holiday Type'],
            });
          }
       }
  },[]);

  const fields = [
    {
        label: "From Date",
        type: "date",
        name: "start_date",
    },
    {
        label: "To Date",
        type: "date",
        name: "end_date",
    },
    {
        label : "Day",
        type : "select",
        name :"day",
        options : day_options
    },
    {
      label: "Holiday Type",
      type: "select",
      name: "holiday_type",
      options : holidayData.map((type,index) => {
         return{
            label : type['Holiday Type'],
            value : type['Holiday Type']
         }
      })
    },
    {
        label : 'No. of Days',
        type : 'text',
        readOnly : true,
        name : 'num_days'
    },
    {
        label : 'Holiday Description',
        type : 'text',
        name : 'description'
    },
  ];


  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('hit submit ',data);
      const isUpdate = Boolean(ho_id);
      const send_data = ho_id ? {...data,isUpdate,ho_id} : {...data,isUpdate};
      try{
         const response = await axiosInstance.post(`/api/addHoliday/${companyData[0].id}`,send_data);
         if(response.status === 201){
            navigate('/hrms/holidays');
         }
      }
      catch(err){

      }
  };

  return (
    <div className="m-12 pt-12">
      <NewForm
        icon="fas fa-calendar"
        title="Add Holiday List"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HolidayListForm;
