import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const TaxMasterForm = () => {
    const {tax_id} =useParams();
    const navigate = useNavigate();
    
    const {fetchTaxMasters,taxMasters,companyData} = useCompanyContext();

    const [data,setData] = useState({
        tax_code: '',
        percentage : 0,
        reference : ''
    });
    
    useEffect(() => {
      fetchTaxMasters();
    },[]);
    
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
            name : 'tax_code',
            required : true

        },
        {
            label : 'Percentage of Deduction',
            type : 'text',
            name : 'percentage',
            required : true

        },
        {
            label : 'Tax Reference',
            type : 'text',
            name : 'reference',
            required : true

        }
    ]

    const handleSubmit = async(e) => {
       e.preventDefault();
       if(!tax_id && taxMasters.find((ele) => ele['Tax Code'].toLowerCase() === data.tax_code.toLowerCase())){
        alert('Entered Tax Code is associated already with a tax master in your organisation');
        return;
      }
       const isUpdate = Boolean(tax_id);
       const send_data = isUpdate ? {...data,isUpdate,tax_id} : {...data,isUpdate};
       try{
           const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/addTaxMaster/${companyData[0].id}`,send_data);
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