import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const TaxMasterForm = () => {
    const {tax_id} =useParams();
    const navigate = useNavigate();
    
    const {taxMasters,companyData} = useCompanyContext();

    const [data,setData] = useState({
        tax_code: '',
        percentage : 0,
        reference : ''
    });
    
    useEffect(() => {
        if(tax_id){
            const selected_master = taxMasters.find((ele) => ele.id === parseInt(tax_id));
            if(selected_master){
                setData({
                    tax_code : selected_master['Tax Code'],
                    percentage : selected_master['Percentage of Deduction'],
                    reference : selected_master['Tax Reference']
                });
            }
        }
    },[tax_id,taxMasters]);

    const fields = [
        {
            label : 'Tax Code',
            type : 'text',
            name : 'tax_code'
        },
        {
            label : 'Percentage of Deduction',
            type : 'text',
            name : 'percentage'
        },
        {
            label : 'Tax Reference',
            type : 'text',
            name : 'reference'
        }
    ]

    const handleSubmit = async(e) => {
       e.preventDefault();
       const isUpdate = Boolean(tax_id);
       const send_data = isUpdate ? {...data,isUpdate,tax_id} : {...data,isUpdate};
       try{
           const response = await axiosInstance.post(`/api/addTaxMaster/${companyData[0].id}`,send_data);
           if(response.status === 201){
              navigate('/hrms/settings/vw-tax');
           }
       }
       catch(err){

       }
    };
    
    return(
        <div className="m-8 pt-12">
        <NewForm
          icon="fas fa-money-bill-wave"
          title="Add Tax Master"
          fields={fields}
          data={data}
          setData={setData}
          onSubmit={handleSubmit}
        />
      </div>
    )
};

export default TaxMasterForm;