import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const AnnualPayForm = () => {
  const navigate = useNavigate();
  const {annual_id} = useParams();
  const { payGroups,annualPays } = useCompanyContext();
  console.log(payGroups, ' in annual pay form ');

  const [data, setData] = useState({
    paygroup: payGroups[0]['Pay Group'],
    annual_pay: 0,
  });
  
  useEffect(() => {
    if (annual_id) {
        console.log('trying to find ',annual_id,' in ',annualPays);
        const selectedAnnualPay = annualPays.find(
        (ele) => ele.id === parseInt(annual_id) 
      );
      if (selectedAnnualPay) {
        setData({
          paygroup: selectedAnnualPay["Pay Group"],
          annual_pay: selectedAnnualPay["Annual Pay"],
        });
      }
    }
  },[annual_id,annualPays]);
  
  const fields = [
    {
      name: "paygroup",
      label: "Paygroup Code",
      type: "select",
      options: payGroups.map((group, index) => ({
        label: group["Pay Group"],
        value: group["Pay Group"],
      })),
    },
    {
      name: "annual_pay",
      label: "Annual Pay",
      type: "text",
    },
  ];

  const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('annual pay submit hit ',data);
        const isUpdate = Boolean(annual_id);
        const data_send = isUpdate ? {...data,isUpdate,annual_id} : {...data,isUpdate};
        const group = payGroups.find((ele) => ele['Pay Group'] === data.paygroup);
        try{
           const response = await axiosInstance.post(`/api/addAnnualPay/${group.id}`,data_send);
           if(response.status === 201){
               navigate('/hrms/settings/vw-annualpay');
           }
        }
        catch(err){

        }
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="fas fa-money-bill-wave"
        title="Annual Pay"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AnnualPayForm;
