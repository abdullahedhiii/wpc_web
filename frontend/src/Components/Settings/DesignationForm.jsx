import { useEffect, useState } from "react";
import NewForm from "../NewForm";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DesignationForm = () => {
  const { designation_id } = useParams(); 
  const navigate = useNavigate();
  const { departmentData, designationData } = useCompanyContext();

  const [data, setData] = useState({
    department_name: departmentData[0]['Department Name'],
    designation_name: "",
  });

  
  useEffect(() => {
    if (designation_id) {
        console.log('trying to find ',designation_id,' in ',designationData);
      const selectedDesignation = designationData.find(
        (ele) => ele.id === parseInt(designation_id) 
      );
      if (selectedDesignation) {
        setData({
          department_name: selectedDesignation["Department Name"],
          designation_name: selectedDesignation["Designation"],
        });
      }
    }
  }, [designation_id, designationData]);

  const fields = [
    {
      name: "department_name",
      label: "Select Department",
      type: "select",
      options: departmentData.map((department) => ({
        label: department["Department Name"],
        value: department["Department Name"],
      })),
    },
    {
      name: "designation_name",
      label: "Designation Name",
      type: "text",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data, "designation submit");
    const isUpdate = Boolean(designation_id);
    const DataTosend = isUpdate ? {...data,isUpdate,designation_id} : {...data,isUpdate};

    const d_id = departmentData.find(
      (ele) => ele["Department Name"] === data.department_name
    );
    console.log("found department is ", d_id,d_id.id);
    try {
      console.log("in submit designation ", d_id.id, data);
      const response = await axios.post(`/api/addDesignation/${d_id.id}`, DataTosend);
      console.log("request sent", response.data);
      if (response.status === 201) {
        setData({ department_name: "", designation_name: "" });
        navigate(`/hrms/settings/vw-designation`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-12 pt-12">
      <NewForm
        icon="far fa-building"
        title="New Designation"
        fields={fields}
        data={data}
        setData={setData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DesignationForm;
