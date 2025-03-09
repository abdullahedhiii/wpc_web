import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const LeaveRuleForm = () => {
  const {rule_id} = useParams();
  const navigate = useNavigate();
  const {fetchTypes,fetchLeaveTypes,fetchLeaveRules,leaveTypes,companyData,employeeTypes,leaveRules} = useCompanyContext();
 
  useEffect(() =>{
     fetchLeaveRules();
     fetchLeaveTypes();
     fetchTypes();
  },[]);
  // console.log(leaveTypes,'in form',rule_id,employeeTypes);
  
  const [data, setData] = useState({
      employee_type : '',
      leave_type : '',
      max: 0,
      from : '',
      to : ''
  });
  
  
  useEffect(() => {
    if(rule_id){
      const selected_rule = leaveRules.find((ele) => ele.id === parseInt(rule_id));
      setData({
        id : selected_rule.id,
        employee_type : selected_rule['Employee Type'],
        leave_type : selected_rule['Leave Type'],
        max : selected_rule['Max. No.'],
        from : selected_rule['Effective From'],
        to : selected_rule['Effective To']
      })
    }
  },[]);

 
  const fields = [
    {
      name: "employee_type",
      label: "Employee Type",
      type : 'select',
      options : 
        employeeTypes.map((type) => (
            {
               value : type['Employment Type'],
               label : type['Employment Type']
            }
        ))
      ,        required : true

    },
    {
      name: "leave_type",
      label: "Leave Type ",
      type : 'select',
      options : 
        leaveTypes.map((type) => (
            {
               value : type['Leave Type'],
               label : type['Leave Type']
            }
        ))
      ,        required : true

    },
    {
      name: "max",
      label: "Maximum No.(Annual)",
      type: "text",
                required : true

    },
    {
      name : 'from',
      type : 'date',
      label : 'Effective From'
      ,        required : true

    },
    {
        name : 'to',
        type : 'date',
        label : 'Effective to'
        ,        required : true

    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUpdate = Boolean(rule_id);
    const currentYear = new Date().getFullYear();

    const check_if_exists = leaveRules.find((ele) => 
        ele['Leave Type'] === data.leave_type && 
        ele['Employment Type'] === data.employee_type &&
        new Date(ele['Effective From']).getFullYear() === currentYear 
    );
    console.log('In leave rule ',check_if_exists,currentYear, new Date(ele['Effective From']).getFullYear());
    if (!isUpdate && check_if_exists) {
        alert('Leave Rule for this leave type and employment type already exists for this year, try updating by clicking the edit option on the Leave Rule Page');
        return;
    }

    const leave_type_id = leaveTypes.find((ele) => ele['Leave Type'] === data.leave_type).id;
    const employment_type_id = employeeTypes.find((ele) => ele['Employment Type'] === data.employee_type).id;

    const data_to = isUpdate 
        ? { ...data, leave_type_id, employment_type_id, rule_id, isUpdate } 
        : { ...data, leave_type_id, employment_type_id, isUpdate };

    try {
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/addLeaveRule/${companyData[0].id}`, data_to);
        navigate('/hrms/leave-management/leave-rule-listing');
    } catch (err) {
        console.error("Error submitting leave rule:", err);
    }    
};



  return (
    <div className="m-8 pt-12">
      <NewForm
        icon=""
        title="Add Leave Rule"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LeaveRuleForm;
