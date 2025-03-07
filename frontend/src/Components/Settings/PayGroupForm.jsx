import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const PayGroupForm = () => {
  const {group_id} = useParams();
  const navigate = useNavigate();
  const {companyData,payGroups,fetchPayGroups} = useCompanyContext();
  const [data, setData] = useState({
    paygroup : "",
    status : "Active"
  });

  useEffect(() => {
    fetchPayGroups();
  },[]);
  useEffect(() => {
    if (group_id) {
      const selected_group = payGroups.find(
        (ele) => ele.id === parseInt(group_id) 
      );
      if (selected_group) {
        setData({
          paygroup: selected_group["Pay Group"],
          status: selected_group["Status"],
        });
      }
    }
  }, [group_id, payGroups]);
  
  const fields = [
    {
      name: "paygroup",
      label: "Pay Group",
      type: "text",
      required : true

    },
    {
      name: "status",
      label: "Select status",
      type: "select",
      options :[{label : 'Active',value :'Active'},{label : 'Inactive',value : 'Inactive'}],
      required : true

    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(payGroups.find((ele) => ele['Pay Group'].toLowerCase() === data.paygroup.toLowerCase())){
      alert('The entered Pay Group already exixts!');
      return;
    }
    const isUpdate = Boolean(group_id);
    const send_data = isUpdate ? {...data,isUpdate,group_id} : {...data,isUpdate};
    try{
       const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/addPayGroup/${companyData[0].id}`,send_data);
       if(response.status === 201){
        setData({});
        navigate('/hrms/settings/vw-paygroup');
       }
    }
    catch(err){

    }
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="fas fa-money-bill-wave"
        title="New Pay Group"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PayGroupForm;
