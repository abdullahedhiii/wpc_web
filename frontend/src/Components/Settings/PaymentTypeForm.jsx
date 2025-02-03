import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import NewForm from "../NewForm";

const PaymentTypeForm = () => {
    const {p_id} = useParams();
    const navigate = useNavigate();
    const {paymentTypes,companyData} = useCompanyContext();

    const [data,setData] = useState({
        payment_type: '',
        min_hours: 0,
        rate:0,
    })
    const fields = [
        {
            label : 'Payment Type',
            type : 'text',
            name : 'payment_type'
        },
        {
            label : 'Min.Working Hour',
            type : 'text',
            name : 'min_hours'
        },
        {
            label : 'Rate',
            type : 'text',
            name : 'rate'
        }
    ];

       useEffect(() => {
            if(p_id){
                const selected_type = paymentTypes.find((ele) => ele.id === parseInt(p_id));
                console.log('p _ id ',p_id ,'found ',selected_type);
                if(selected_type){
                    setData({
                        payment_type : selected_type['Payment Type'],
                        min_hours : selected_type['Minimum Working Hour'],
                        rate : selected_type['Rate']
                    });
                }
            }
        },[p_id,paymentTypes]);

    const handleSubmit = async(e) => {
       e.preventDefault();
       const isUpdate = Boolean(p_id);
       const send_data = isUpdate ? {...data,isUpdate,p_id} : {...data,isUpdate};
       try{
           const response = await axiosInstance.post(`/api/addPaymentType/${companyData[0].id}`,send_data);
           if(response.status === 201){
              navigate('/hrms/settings/vw-pay-type');
           }
       }
       catch(err){

       }
    };
    
    return(
        <div className="m-8 pt-12">
        <NewForm
          icon = {null}
          title="Add Payment Type"
          fields={fields}
          data={data}
          setData={setData}
          onSubmit={handleSubmit}
        />
      </div>
    )
}

export default PaymentTypeForm;