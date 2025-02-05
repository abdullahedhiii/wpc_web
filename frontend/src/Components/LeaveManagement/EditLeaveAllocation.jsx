
import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const EditLeaveAllocation = () => {
  const {allocation_id} = useParams();
  const navigate = useNavigate();
  const {companyData} =useCompanyContext();
  const [data, setData] = useState({
      employee_type : '',
      leave_type : '',
      employee_code: '',
      year: 0,
      max : 0,
      leave_in_hand : 0,
  });
  
  
  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await axiosInstance.get(`/api/getLeaveAllocation/${allocation_id}`);
            setData(response.data);
        }
        catch(err){
           console.log(err);
        }
    }
    
    if(allocation_id){
      fetchData()
    }
  },[]);

 
  const fields = [
    {
      name : 'leave_type',
      label: "Leave Type",
      type : 'text',
      readOnly : true,
    },
    {
        name : 'employee_code',
        label: "Employee Code",
        type : 'text',
        readOnly : true,
    },
    {
        name : 'max',
        label: "Max No. Of Leave",
        type : 'text',
        readOnly : true,
    },
    {
        name : 'employee_type',
        label: "Employee Type",
        type : 'text',
        readOnly : true,
    },
    {
        label : 'Leave in Hand.',
        name: "leave_in_hand",
        type : 'text',
    },
    {
        name : 'year',
        label: "Effective Year",
        type : 'text',
        readOnly : true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Leave edit allocation submit hit', data);
    try{
       const response =  await axiosInstance.post(`/api/allocateLeave/${companyData[0].id}`,data);
       navigate('/hrms/leave-management/leave-allocation-listing')
    }
    catch(err){
     console.log(err,'in update')
    }

};


  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="far fa-check-circle"
        title="Edit Leave Allocation"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditLeaveAllocation;
