

import NewForm from "../NewForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";

const EmploymentTypeForm = () =>{
   const {type_id} = useParams();
   const {companyData,employeeTypes} = useCompanyContext();
   const navigate = useNavigate();
   const [data,setData] = useState({
      Employment_Type : ""
   });
   console
   let selected_type;
   useEffect(() => {
      console.log('trying to find ',type_id,' in ',employeeTypes);
       selected_type = employeeTypes.find(
        (ele) => ele.id === parseInt(type_id) 
      );
      if (selected_type) {
        setData({
         Employment_Type : selected_type['Employment Type']
        });
   }
   },[]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     console.log("dataa type" ,data);
     const isUpdate = Boolean(type_id);
     const send_data = isUpdate ? {...data,isUpdate,type_id} : {...data,isUpdate};
     try{
      const response = await axios.post(`/api/addEmployeeType/${companyData[0].id}`,send_data);
      if(response.status === 201){
         navigate('/hrms/settings/vw-employment-type');
      }
    }
    catch(err){

    }
  };
  
   
   const fields = [
    {
        name : 'Employment_Type',
        label : "Employment Type",
        type : "text",     
    }
   ];

    return(
      <div className="m-8 pt-12">
                <NewForm 
                   icon= "la la-user"
                   title="New Employment Type"
                   fields= {fields}
                   data = {data}
                   setData={setData}
                   onSubmit={handleSubmit}
                />
        </div>
    )
}

export default EmploymentTypeForm;