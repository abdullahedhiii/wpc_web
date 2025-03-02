import { useState, useEffect } from "react";
import NewForm from "../../NewForm";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const ShiftManagementForm = () => {
  const {shift_code} = useParams();
  const {fetchDepartments,fetchDesignations, departmentData, designationData,companyData,shifts,fetchShifts } = useCompanyContext();
  const navigate = useNavigate();
  
  useEffect(() => {
   fetchDepartments();
   fetchDesignations();
   fetchShifts();
  },[]);

  const [data, setData] = useState({
    department: departmentData.length > 0 ? departmentData[0]["Department Name"] : '',
    designation: designationData.length > 0 ? designationData.find(
      (item) => item["Department Name"] === departmentData[0]["Department Name"]
    )?.["Designation"] || "" : '',
    work_in: "",
    work_out: "",
    break_start: "",
    break_end: "",
    description: "",
  });

  const [filteredDesignationOptions, setFilteredDesignationOptions] = useState(
    designationData.filter(
      (item) => item["Department Name"] === departmentData[0]["Department Name"]
    ).map((item) => ({
      label: item["Designation"],
      value: item["Designation"],
    }))
  );

  useEffect(() => {
     if(shift_code){
        const current_shift = shifts.find((ele) => ele['Shift Code'] === shift_code);
        setData({
          department: current_shift.Department,
          designation: current_shift.Designation,
          work_in: current_shift['Work In Time'],
          work_out: current_shift['Work Out Time'],
          break_start: current_shift['Break Time From'],
          break_end: current_shift['Break Time To'],
          description: current_shift['Description'],

        })
     }
  },[]);
  useEffect(() => {
    const filteredOptions = designationData
      .filter((item) => item["Department Name"] === data.department)
      .map((item) => ({
        label: item["Designation"],
        value: item["Designation"],
      }));

    setFilteredDesignationOptions(filteredOptions);

    if (filteredOptions.length > 0) {
      setData((prevData) => ({
        ...prevData,
        designation: filteredOptions[0].value,
      }));
    }
  }, [data.department, designationData]);

  const fields = [
    {
      name: "department",
      label: "Select Department",
      type: "select",
      options: departmentData.map((group) => ({
        label: group["Department Name"],
        value: group["Department Name"],
      })),      required: true,
      readOnly : shift_code ? true : false

    },
    {
      name: "designation",
      label: "Select Designation",
      type: "select",
      options: filteredDesignationOptions,      required: true,
      readOnly : shift_code ? true : false


    },
    {
      name: "work_in",
      label: "Work In Time",
      type: "time",      required: true,

    },
    {
      name: "work_out",
      label: "Work Out Time",
      type: "time",      required: true,

    },
    {
      name: "break_start",
      label: "Break Time From",
      type: "time",      required: true,

    },
    {
      name: "break_end",
      label: "Break Time To",
      type: "time",      required: true,

    },
    {
      name: "description",
      label: "Shift Description",
      type: "text",
    },
  ];
  console.log(shifts);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if((new Date(`2000-01-01T${data.break_end}`) < new Date(`2000-01-01T${data.break_start}`))
    || (new Date(`2000-01-01T${data.work_out}`) < new Date(`2000-01-01T${data.work_in}`)
    || (new Date(`2000-01-01T${data.break_start}`) < new Date(`2000-01-01T${data.work_in}`)
    || (new Date(`2000-01-01T${data.break_end}`) > new Date(`2000-01-01T${data.work_out}`))
  )
  )
    ){
      alert('Please enter a valid time range');
      return;
    }

    const dep_id = departmentData.find(
      (ele) => ele["Department Name"] === data.department
    );
    const des_id = designationData.find(
      (ele) =>
        ele["Designation"] === data.designation &&
        ele["Department Name"] === data.department
    );
    if(!shift_code && shifts.find((ele) => ele.Department_id === dep_id && ele["Designation ID"] === des_id)){
       alert('Shift for this department and designation exists already');
    }
    try {
      const response = await axiosInstance.post(
        `/api/addShift/${companyData[0].id}`,
        { data, dep_id: dep_id.id, des_id: des_id.id }
      );
      if (response.status === 201) {
        navigate("/hrms/rota/shift-management");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    const defaultDepartment = departmentData[0]["Department Name"];
    const defaultDesignation = designationData.find(
      (item) => item["Department Name"] === defaultDepartment
    )?.["Designation"];

    setData({
      department: defaultDepartment,
      designation: defaultDesignation || "",
      work_in: "",
      work_out: "",
      break_start: "",
      break_end: "",
      description: "",
    });
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="far fa-clock"
        title="Shift Details"
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

export default ShiftManagementForm;
