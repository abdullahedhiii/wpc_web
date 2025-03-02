import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import { useState, useEffect } from "react";
import NewForm from "../../NewForm";
import axiosInstance from "../../../../axiosInstance";

const OffDayForm = () => {
  const {shift_code} = useParams();
  const navigate = useNavigate();
  const {fetchShifts,fetchDepartments,fetchDesignations, shifts, designationData, departmentData,companyData } = useCompanyContext();
  
  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
    fetchShifts();
  },[]);
  const [data, setData] = useState(() => {
    const defaultDepartment = departmentData.length > 0 ? departmentData[0]["Department Name"] : '';
    const defaultDesignation = designationData.find(
      (item) => item["Department Name"] === defaultDepartment
    )?.["Designation"];

    const defaultShift = shifts.find((shift) =>
      designationData.some(
        (designation) =>
          designation["Department Name"] === defaultDepartment &&
          designation["Designation"] === defaultDesignation &&
          designation.id === shift["Designation ID"]
      )
    );
    return {
      department: defaultDepartment,
      designation: defaultDesignation || "",
      shift_code: defaultShift ? defaultShift["Shift Code"] : "",
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    };
  });

  useEffect(() => {
    if(shift_code){
       const current_shift = shifts.find((ele) => ele['Shift Code'] === shift_code);
       setData({
        department: current_shift.Department,
        designation: current_shift.Designation,
        shift_code: shift_code,
        Monday: current_shift['Off Days'].Monday,
        Tuesday: current_shift['Off Days'].Tuesday,
        Wednesday: current_shift['Off Days'].Wednesday,
        Thursday: current_shift['Off Days'].Thursday,
        Friday: current_shift['Off Days'].Friday,
        Saturday: current_shift['Off Days'].Saturday,
        Sunday: current_shift['Off Days'].Sunday,
       })
    }
  },[]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);

  useEffect(() => {
    const updatedFilteredDesignations = designationData.filter(
      (item) => item["Department Name"] === data.department
    );
    setFilteredDesignations(updatedFilteredDesignations);

    const updatedFilteredShifts = shifts.filter((shift) =>
      updatedFilteredDesignations.some(
        (designation) => designation.id === shift["Designation ID"]
      )
    );
    setFilteredShifts(updatedFilteredShifts);

    const newShift = updatedFilteredShifts.find(
      (shift) => shift["Shift Code"] === data.shift_code
    );
    if (!newShift) {
      setData((prevState) => ({
        ...prevState,
        shift_code:
          updatedFilteredShifts.length > 0
            ? updatedFilteredShifts[0]["Shift Code"]
            : "",
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
      }));
    }
  }, [data.department, data.designation, designationData, shifts]);


  useEffect(() => {
    const current_shift = shifts.find((ele) => ele['Shift Code'] === data.shift_code);
    if(!current_shift) return;
    setData({
     department: current_shift.Department,
     designation: current_shift.Designation,
     shift_code: data.shift_code,
     Monday: current_shift['Off Days'].Monday,
     Tuesday: current_shift['Off Days'].Tuesday,
     Wednesday: current_shift['Off Days'].Wednesday,
     Thursday: current_shift['Off Days'].Thursday,
     Friday: current_shift['Off Days'].Friday,
     Saturday: current_shift['Off Days'].Saturday,
     Sunday: current_shift['Off Days'].Sunday,
    });
  },[data.shift_code]);
  const fields = [
    {
      label: "Select Department",
      type: "select",
      name: "department",
      options: departmentData.map((department) => ({
        label: department["Department Name"],
        value: department["Department Name"],
      })),
      required: true,
      readOnly :shift_code ? true : false,
    },
    {
      label: "Select Designation",
      type: "select",
      name: "designation",
      options: filteredDesignations.map((des) => ({
        label: des["Designation"],
        value: des["Designation"],
      })),      required: true,
      readOnly :shift_code ? true : false,

    },
    {
      label: "Shift Code",
      type: "select",
      name: "shift_code",
      options: filteredShifts.map((shift) => ({
        label: shift["Shift Name"],
        value: shift["Shift Code"],
      })),      required: true,
      readOnly :shift_code ? true : false,

    },
    ...[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((day) => ({
      label: day,
      name: day,
      value: false,
      type: "checkbox",
    })),
  ];

  const handleReset = () => {
    const defaultDepartment = departmentData.length > 0 ? departmentData[0]["Department Name"] : '';
    const defaultDesignation = designationData.find(
      (item) => item["Department Name"] === defaultDepartment
    )?.["Designation"];

    const defaultShift = shifts.find((shift) =>
      designationData.some(
        (designation) =>
          designation["Department Name"] === defaultDepartment &&
          designation["Designation"] === defaultDesignation &&
          designation.id === shift["Designation ID"]
      )
    );

    setData({
      department: defaultDepartment,
      designation: defaultDesignation || "",
      shift_code: defaultShift ? defaultShift["Shift Code"] : "",
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axiosInstance.post(`/api/setOffDays/${companyData[0].id}`,{data : data});
        if(response.status === 201){
            navigate('/hrms/rota/offday');
        }
    }
    catch(err){

    }
  };

  return (
    <div className="m-8 pt-12">
      <NewForm
        icon="far fa-calendar-times"
        title="Day Off Details"
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

export default OffDayForm;
