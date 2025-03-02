import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const BankMasterForm = () => {
  const navigate = useNavigate();
  const {bank_id} = useParams();
  const {companyData,fetchBanks,orgBanks} = useCompanyContext();
 
  useEffect(() => {
   fetchBanks()
  },[])
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
        type : "text",
        required : true

    }
  ];
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!bank_id && orgBanks.find((ele) => ele["Bank Name"].toLowerCase() === data.Bank_Name.toLowerCase())){
      alert('Bank with this name already exists in your organisation');
      return;
    }
    const isUpdate = Boolean(bank_id);
    const send_data = isUpdate ? {...data,isUpdate,bank_id} : {...data,isUpdate};
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
