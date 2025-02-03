import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const BankMasterForm = () => {
  const navigate = useNavigate();
  const {bank_id} = useParams();
  const {companyData,orgBanks} = useCompanyContext();

  const [data,setData] = useState({
    Bank_Name : ""
  });
  
  useEffect(() => {
    if(bank_id){
        const selected_bank = orgBanks.find((ele) => ele.id === parseInt(bank_id));
        if(selected_bank){
            setData({
                Bank_Name : selected_bank['Bank Name']
            })
        }
    }
  },[bank_id,orgBanks]);

  const fields = [
    {
        name : "Bank_Name",
        label : "Bank Name",
        type : "text"
    }
  ];
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const isUpdate = Boolean(bank_id);
    const send_data = isUpdate ? {...data,isUpdate,bank_id} : {...data,isUpdate};
    console.log('sending data  ',send_data);
    try{
       const response = await axiosInstance.post(`/api/addCompanyBank/${companyData[0].id}`,send_data);
       if(response.status === 201){
           navigate('/hrms/settings/vw-bank');
       }
    }catch(err){

    }
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="fas fa-university"
        title="Add Bank Master"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BankMasterForm;
