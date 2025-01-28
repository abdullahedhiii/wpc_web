import { useState, useEffect } from "react";
import NewForm from "../../NewForm";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate } from "react-router-dom";

const ShiftManagementForm = () => {
  const { departmentData, designationData,companyData } = useCompanyContext();
  const navigate = useNavigate();

  const [data, setData] = useState({
    department: departmentData[0]["Department Name"],
    designation: designationData.find(
      (item) => item["Department Name"] === departmentData[0]["Department Name"]
    )?.["Designation"] || "",
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
      })),
    },
    {
      name: "designation",
      label: "Select Designation",
      type: "select",
      options: filteredDesignationOptions,
    },
    {
      name: "work_in",
      label: "Work In Time",
      type: "time",
    },
    {
      name: "work_out",
      label: "Work Out Time",
      type: "time",
    },
    {
      name: "break_start",
      label: "Break Time From",
      type: "time",
    },
    {
      name: "break_end",
      label: "Break Time To",
      type: "time",
    },
    {
      name: "description",
      label: "Shift Description",
      type: "text",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dep_id = departmentData.find(
      (ele) => ele["Department Name"] === data.department
    );
    const des_id = designationData.find(
      (ele) =>
        ele["Designation"] === data.designation &&
        ele["Department Name"] === data.department
    );
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
    <div className="m-12 pt-12">
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
