import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewForm from "../../NewForm";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import axiosInstance from "../../../../axiosInstance";

const LatePolicyForm = () => {
    const {policy_id} = useParams();
    const navigate = useNavigate();
    const { fetchDepartments,fetchDesignations,fetchShifts,departmentData, designationData, shifts,companyData,latePolicies,fetchPolicies } = useCompanyContext();
  
    useEffect(() => {
      fetchDepartments()
      fetchDesignations()
      fetchShifts()
      fetchPolicies()
    },[]);
  
    const [data, setData] = useState(() => {
        const defaultDepartment = departmentData.length > 0 ? departmentData[0]['Department Name'] : '';
        const defaultDesignation = designationData.find(item => item['Department Name'] === defaultDepartment)?.['Designation'];

        const defaultShift = shifts.find(shift => 
            designationData.some(designation => 
                designation['Department Name'] === defaultDepartment && 
                designation['Designation'] === defaultDesignation && designation.id === shift['Designation ID']
            )
        );
        return {
            department: defaultDepartment,
            designation: defaultDesignation || '',
            shift_code: defaultShift ? defaultShift['Shift Code'] : '',
            period: 0,
            days: 0,
            salary_days: 0,
        };
    });

    
    useEffect(() => {
      if(policy_id){
         const current_policy = latePolicies.find((ele) => ele.id === parseInt(policy_id));
         setData({
            department : current_policy.Department,
            designation : current_policy.Designation,
            shift_code : current_policy['Shift Code'],
            period: current_policy['Max Grace Period'],
            days: current_policy["No. of Days Allowed"],
            salary_days: current_policy[ "No. of Day Salary Deducted"],
         })
      }
    },[]);
    const [filteredDesignations, setFilteredDesignations] = useState([]);
    const [filteredShifts, setFilteredShifts] = useState([]);

    useEffect(() => {
        const updatedFilteredDesignations = designationData.filter(item => item['Department Name'] === data.department);
        setFilteredDesignations(updatedFilteredDesignations);

        const updatedFilteredShifts = shifts.filter(shift => 
            updatedFilteredDesignations.some(designation => designation.id === shift['Designation ID'])
        );
        setFilteredShifts(updatedFilteredShifts);

        const newShift = updatedFilteredShifts.find(shift => shift['Shift Code'] === data.shift_code);
        if (!newShift) {
            setData(prevState => ({
                ...prevState,
                shift_code: updatedFilteredShifts.length > 0 ? updatedFilteredShifts[0]['Shift Code'] : '',
            }));
        }
    }, [data.department, data.designation, designationData, shifts]);

    const fields = [
        {
            label: 'Select Department',
            type: 'select',
            name: 'department',
            options: departmentData.map(department =>({
                label: department['Department Name'],
                value: department['Department Name']
            })),
            required :true,
            readOnly : policy_id ? true : false

        },
        {
            label: 'Select Designation',
            type: 'select',
            name: 'designation',
            options: filteredDesignations.map(des =>({
                label: des['Designation'],
                value: des['Designation']
            })),
            required :true,
            readOnly : policy_id ? true : false

        },
        {
            label: 'Shift Code',
            type: 'select',
            name: 'shift_code',
            options: filteredShifts.map(shift => ({
                label: shift['Shift Code'] + '(' + shift['Shift Description'] + ')',
                value: shift['Shift Code'],
            })),
            required :true,
            readOnly : policy_id ? true : false

        },
        {
            label: 'Maximum Grace Period in Minutes',
            type: 'text',
            name: 'period',
            required :true,

        },
        {
            label: 'No. of Days Allowed',
            type: 'text',
            name: 'days',
            required :true,

        },
        {
            label: 'No. of Day Salary Deducted',
            type: 'text',
            name: 'salary_days',
            required :true,

        }
    ];

    const handleReset = () => {
        const defaultDepartment = departmentData[0]["Department Name"];
        const defaultDesignation = designationData.find(
          (item) => item["Department Name"] === defaultDepartment
        )?.["Designation"];

        const defaultShift = shifts.find(shift => 
            designationData.some(designation => 
                designation['Department Name'] === defaultDepartment &&
                 designation['Designation'] === defaultDesignation && designation.id === shift['Designation ID']
            )
        );

        setData({
          department: defaultDepartment,
          designation: defaultDesignation || "",
          shift_code: defaultShift ? defaultShift['Shift Code'] : '',
          period: 0,
          days: 0,
          salary_days: 0,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const s_dep = departmentData.find((ele) => ele['Department Name'] === data.department);
        const s_des = designationData.find((ele) => ele['Department Name'] === data.department && ele['Designation'] === data.designation);
        if(!policy_id && latePolicies.find((ele) => ele['Shift Code'] === data.shift_code )){
            alert('Policy for this shift has been already added');
            return;
        }
        try{
            const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/addLatePolicy/${companyData[0].id}`,{data,dep_id : s_dep.id,des_id : s_des.id});
            if(response.status === 200){
                navigate('/hrms/rota/late-policy');
            }
        }
        catch(err){
        }
    };

    return (
        <div className="m-8 pt-12">
            <NewForm
                icon="fa fa-refresh"
                title="Late Policy Details"
                fields={fields}
                data={data}
                setData={setData}
                onSubmit={handleSubmit}
                reset={true}
                handleReset={handleReset}
            />
        </div>
    );
};

export default LatePolicyForm;
