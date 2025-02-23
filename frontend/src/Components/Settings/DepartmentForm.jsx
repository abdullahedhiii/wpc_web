
import NewForm from "../NewForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentForm = () =>{
   const {companyData,departmentData,fetchDepartments} = useCompanyContext();
   const {department_id} = useParams();
   
   useEffect(() => {
    fetchDepartments();
   },[])
   const navigate = useNavigate();
   const [data,setData] = useState({
      department_name : ""
   });
   let selected_department;
   
   useEffect(() => {
    if (department_id) {
       selected_department = departmentData.find((ele) => ele.id === parseInt(department_id));
       if (selected_department) {
          setData({department_name: selected_department['Department Name']});
       }
    }
 }, [department_id, departmentData]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const isUpdate = Boolean(department_id);
      const requestData = department_id ? { ...data, isUpdate, department_id} : {...data,isUpdate}; 
      const response = await axios.post(`/api/addDepartment/${companyData[0].id}`, requestData);
      
      if (response.status === 201) {
        setData({});
        navigate("/hrms/settings/vw-department");
      }
    } catch (err) {
    }
  };
  
   
   const fields = [
    {
        name : 'department_name',
        label : "Department Name",
        type : "text",     
    }
   ];

    return(
      <div className="m-8 pt-12">
                <NewForm 
                   icon= "far fa-building"
                   title="New Department"
                   fields= {fields}
                   data = {data}
                   setData={setData}
                   onSubmit={handleSubmit}
                />
        </div>
    )
}

export default DepartmentForm;