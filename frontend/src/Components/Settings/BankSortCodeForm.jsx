import { useEffect, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import NewForm from "../NewForm";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const BankSortCodeForm = () => {
    const navigate = useNavigate();
    const {sortcode_id} = useParams();

    const {orgBanks,bankSortCodes} = useCompanyContext();
    const [data,setData] = useState({
        bank_name : orgBanks[0]['Bank Name'],
        sort_code : ''
    });

    const fields = [
        {
            label : "Bank Name",
            name : "bank_name",
            type : "select",
            options : orgBanks.map((bank) =>({
                label : bank['Bank Name'],
                value: bank['Bank Name']
            })) 
        },
        {
            label : "Bank Sort Code",
            name : "sort_code",
            type : "text"
        }
    ];
    
    useEffect(() => {
         if(sortcode_id){
            const selected_code = bankSortCodes.find((ele) => ele.id === parseInt(sortcode_id));
            if(selected_code){
                setData({
                    bank_name :selected_code['Bank Name'],
                    sort_code : selected_code['Bank Sort Code']
                })
            }
         }
    },[sortcode_id,bankSortCodes]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const isUpdate = Boolean(sortcode_id);
        const send_data = isUpdate ? {...data,isUpdate,sortcode_id} : {...data,isUpdate};
        const bank = orgBanks.find((ele) => ele['Bank Name'] === data.bank_name);
        try{
           const response = await axiosInstance.post(`/api/addBankSortCode/${bank.id}`,send_data);
           if(response.status === 201){
               navigate('/hrms/settings/vw-bank-sortcode')
           }
        }
        catch(err){

        }
    }

    return (
        <div className="m-12 pt-12">
          <NewForm
            icon="fas fa-university"
            title="Add Bank SortCode"
            fields={fields}
            data={data}
            setData={setData}
            onSubmit={handleSubmit}
          />
        </div>
      );
};

export default BankSortCodeForm;