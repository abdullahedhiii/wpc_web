import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import DataTable from "../DataTable";
import axios from "axios";


const LeaveAllocationForm = () => {
  const navigate = useNavigate();
  const {fetchEmployeesLink,fetchTypes,fetchLeaveTypes,employeeTypes,employees,fetchLeavesAllocated,leaveTypes,companyData} = useCompanyContext();
  
  useEffect(() => {
     fetchLeaveTypes();
     fetchTypes();
     fetchEmployeesLink();
  },[]);
  const [empOptions,setEmpOptions] = useState([]);
  const [data, setData] = useState({
      employment_type : '',
      employee_code : '',
      year: `01/${new Date().getFullYear()}`,
  });
  const [tableData,setTableData] = useState([]);

  useEffect(() => {
  
    if (data.employment_type !== '') {
      const employmentTypeObj = employeeTypes.find(
        (ele) => ele["Employment Type"].toLowerCase() === data.employment_type.toLowerCase()
      );
      setData((prev) => ({
        ...prev,
        employment_type_id :employmentTypeObj.id
      }));
      if (employmentTypeObj) {
        const filteredOpt = employees
          .filter((ele) => ele.employment_type_id === employmentTypeObj.id) // Use .filter() instead of .find()
          .map((ele) => ({
            label: ele.employee_code,
            value: ele.employee_code,
          }));
  
        setEmpOptions(filteredOpt);
      } else {
        setEmpOptions([]); 
      }
    }
  }, [data.employment_type, employeeTypes, employees]);
  

  const columns = ['Select','Employment Type','Employee Code','Leave Name','Maximum No.','Leave in hand','Effective Year'];
  const fields = [
    {
      name: "employment_type",
      label: "Employment Type",
      type : 'select',
      options : employeeTypes.map((type) => ({
        label : type['Employment Type'],
        value : type["Employment Type"]
      })),
      required : true

    },
    {
      name: "employee_code",
      label: "Employee Code",
      type: "select",
      options : empOptions,
      required : true

    },
    {
      name: "year",
      label: "Choose Year",
      type: "text",
      readOnly :true,
      required : true

    },
    {
      name: "leave_type_id",
      label: "Leave Type",
      type: "select",
      options : leaveTypes.map((leave) => ({
         label : leave['Leave Type'],
         value : leave.id
      })),
      required : true

    },
    
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try{
        const response = await axiosInstance.post(`/api/allocateLeave/${companyData[0].id}`,data);
        setTableData([response.data]);    
    }
    catch(err){
       console.log(err);
    }
};


  return (
    <div className="flex grid grid-cols-1 space-y-8 m-8 pt-12">
      <NewForm
        icon="far fa-calendar"
        title="Add New Leave Allocation"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
       <DataTable
        title="Leaves Allocated"
        fields={columns}
        data={tableData}
        showEntries
        searchable
        downloadable={false}
        addMore={false}
      />
    </div>
  );
};

export default LeaveAllocationForm;
