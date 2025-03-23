import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import DataTable from "../DataTable";

const LeaveAllocationForm = () => {
  const navigate = useNavigate();
  const {
    fetchEmployeesLink,
    fetchTypes,
    fetchLeaveTypes,
    employeeTypes,
    employees,
    fetchLeavesAllocated,
    leaveTypes,
    companyData,
    leavesAllocated
  } = useCompanyContext();

  useEffect(() => {
    fetchLeaveTypes();
    fetchTypes();
    fetchEmployeesLink();
    fetchLeavesAllocated();
  }, []);

  const [empOptions, setEmpOptions] = useState([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");
  const [data, setData] = useState({
    employment_type: "",
    employee_code: "",
    year: `01/${new Date().getFullYear()}`,
    leave_type_id: "",
  });
  const [tableData, setTableData] = useState([]);

  const [fields, setFields] = useState([
    {
      name: "employment_type",
      label: "Employment Type",
      type: "select",
      options: [],
      required: true,
    },
    {
      name: "employee_code",
      label: "Employee Code",
      type: "select",
      options: [],
      required: true,
    },
    {
      name: "year",
      label: "Choose Year",
      type: "text",
      readOnly: true,
      required: true,
    },
    {
      name: "leave_type_id",
      label: "Leave Type",
      type: "select",
      options: [],
      required: true,
    },
  ]);

  // Set employment type options when `employeeTypes` is available
  useEffect(() => {
    if (employeeTypes.length > 0) {
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "employment_type"
            ? {
                ...field,
                options: employeeTypes.map((type) => ({
                  label: type["Employment Type"],
                  value: type["Employment Type"],
                })),
              }
            : field
        )
      );
    }
  }, [employeeTypes]);

  useEffect(() => {
    if (data.employment_type !== selectedEmploymentType) {
      setSelectedEmploymentType(data.employment_type);
    }
  }, [data.employment_type]);

  useEffect(() => {
    console.log(selectedEmploymentType);
    if (!selectedEmploymentType || employeeTypes.length === 0 || employees.length === 0 || leaveTypes.length === 0) {
      setEmpOptions([]);
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "leave_type_id" ? { ...field, options: [] } : field
        )
      );
      return;
    }

    setData((prev) => ({
      ...prev,
      leave_type_id: "",
    }));
    
    const employmentTypeObj = employeeTypes.find(
      (ele) => ele["Employment Type"].toLowerCase() === selectedEmploymentType.toLowerCase()
    );
console.log(employmentTypeObj);
    if (employmentTypeObj) {
      setData((prev) => ({
        ...prev,
        employment_type_id: employmentTypeObj.id,
      }));

      const filteredEmployees = employees
        .filter((ele) => ele.employment_type_id === employmentTypeObj.id)
        .map((ele) => ({
          label: ele.employee_code,
          value: ele.employee_code,
        }));

      // setEmpOptions(filteredEmployees);
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "employee_code" ? { ...field, options: filteredEmployees } : field
        )
      );
      console.log(filteredEmployees);
      console.log(leaveTypes)
      const filteredLeaveTypes = leaveTypes
        .filter((leave) => leave.employment_type_id === employmentTypeObj.id)
        .map((leave) => ({
          label: leave["Leave Type"],
          value: leave.id,
        }));
console.log(filteredLeaveTypes)
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "leave_type_id" ? { ...field, options: filteredLeaveTypes } : field
        )
      );
    } else {
      setEmpOptions([]);
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.name === "leave_type_id" ? { ...field, options: [] } : field
        )
      );
    }
  }, [selectedEmploymentType, employeeTypes, employees, leaveTypes]);

  const columns = [
    "Select",
    "Employment Type",
    "Employee Code",
    "Leave Name",
    "Maximum No.",
    "Leave in hand",
    "Effective Year",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leaveT = leaveTypes.find((ele) => ele.id === data.leave_type_id);

    if (
      leavesAllocated.find(
        (ele) =>
          ele["Employee Code"] === data.employee_code &&
          ele["Leave Type"] === leaveT["Leave Type"] &&
          data.year === ele["Effective Year"]
      )
    ) {
      alert("Leave type has been already allocated to this employee, try updating!");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/allocateLeave/${companyData[0].id}`,
        data
      );
      setTableData([response.data]);
    } catch (err) {
      console.error("Error allocating leave:", err);
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
        isLeaveFrom={true}
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
