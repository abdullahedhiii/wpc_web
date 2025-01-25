import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const PayGroupForm = () => {
  const {group_id} = useParams();
  const navigate = useNavigate();
  const {companyData,payGroups} = useCompanyContext();
  const [data, setData] = useState({
    paygroup : "",
    status : ""
  });

  
  useEffect(() => {
    if (group_id) {
        console.log('trying to find ',group_id,' in ',payGroups);
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
    },
    {
      name: "status",
      label: "Select status",
      type: "select",
      options :[{label : 'Active',value :'Active'},{label : 'Inactive',value : 'Inactive'}]
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data, "pay group submit");
    const isUpdate = Boolean(group_id);
    const send_data = isUpdate ? {...data,isUpdate,group_id} : {...data,isUpdate};
    try{
       const response = await axiosInstance.post(`/api/addPayGroup/${companyData[0].id}`,send_data);
       if(response.status === 201){
        setData({});
        navigate('/hrms/settings/vw-paygroup');
       }
    }
    catch(err){

    }
  };

  return (
    <div className="m-12 pt-12">
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
