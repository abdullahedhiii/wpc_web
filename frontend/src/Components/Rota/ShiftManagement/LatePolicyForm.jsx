import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewForm from "../../NewForm";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import axiosInstance from "../../../../axiosInstance";

const LatePolicyForm = () => {
    const navigate = useNavigate();
    const { departmentData, designationData, shifts,companyData } = useCompanyContext();
    console.log(shifts ,'in late policy');

    const [data, setData] = useState(() => {
        const defaultDepartment = departmentData[0]['Department Name'];
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
            options: [{label: "",value: ""},...departmentData.map(department =>({
                label: department['Department Name'],
                value: department['Department Name']
            }))]
        },
        {
            label: 'Select Designation',
            type: 'select',
            name: 'designation',
            options: [{label : "",value: ""},...filteredDesignations.map(des =>({
                label: des['Designation'],
                value: des['Designation']
            }))]
        },
        {
            label: 'Shift Code',
            type: 'select',
            name: 'shift_code',
            options: [{label : "",value: ""},...filteredShifts.map(shift => ({
                label: shift['Shift Code'] + '(' + shift['Shift Description'] + ')',
                value: shift['Shift Code'],
            }))]
        },
        {
            label: 'Maximum Grace Period in Minutes',
            type: 'text',
            name: 'period',
        },
        {
            label: 'No. of Days Allowed',
            type: 'text',
            name: 'days',
        },
        {
            label: 'No. of Day Salary Deducted',
            type: 'text',
            name: 'salary_days',
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
        console.log('Late policy submit hit', data);
        const s_dep = departmentData.find((ele) => ele['Department Name'] === data.department);
        const s_des = designationData.find((ele) => ele['Department Name'] === data.department && ele['Designation'] === data.designation);
        console.log(s_dep,s_des,data);
        try{
            console.log('sedning request to add late policy');
            const response = await axiosInstance.post(`/api/addLatePolicy/${companyData[0].id}`,{data,dep_id : s_dep.id,des_id : s_des.id});
            if(response.status === 200){
                console.log('navigating /');
                navigate('/hrms/rota/late-policy');
            }
        }
        catch(err){
console.log(err);
        }
    };

    return (
        <div className="m-12 pt-12">
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
