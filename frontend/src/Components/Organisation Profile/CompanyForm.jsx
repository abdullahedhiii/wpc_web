import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const {company_id} = useParams();

  const fields = [
    {
      label: "Organisation Name",
      value: "Name",
      type: "text",
      required: true,
      additionalElement: (
        <button className="px-2 py-1 bg-background text-white rounded-md text-sm w-auto">
          Find
        </button>
      ),
    },
    {
      label: "Type of Organisation",
      value: "Type",
      type: "select",
      options: ["Private Company Limited by shares"],
      required: true,
    },
    {
      label: "Registration No.",
      value: "RegNo",
      type: "text",
      required: true,
      additionalElement: (
        <button className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm w-auto">
          Find
        </button>
      ),
    },
    {
      label: "Contact No.",
      value: "Contact",
      type: "text",
      required: true,
    },
    {
      label: "Login Email ID",
      value: "Email",
      type: "email",
      required: true,
      readOnly: true,
    },
    {
      label: "Organisation Email ID",
      value: "OrganisationEmail",
      type: "email",
      required: true,
    },
    {
      label: "Website",
      value: "Website",
      type: "url",
    },
    {
      label: "Landline Number",
      value: "Landline",
      type: "text",
    },
    {
      label: "Trading Name",
      value: "TradingName",
      type: "text",
      required: true,
    },
    {
      label: "Trading Period",
      value: "Period",
      type: "select",
      options: ["Over 12 to 18 months"],
      required: true,
    },
    {
      label: "Name of Sector",
      value: "Sector",
      type: "select",
      required: true,
      options: ["Other service activities"],
    },
    {
      label: "Have you changed Organisation/Trading name in last 5 years?",
      value: "NameChanged",
      type: "select",
      options: ["No", "Yes"],
      required: true,
    },
    {
      label:
        "Did your organisation face penalty (e.g., recruiting illegal employee) in last 5 years?",
      value: "Penalty",
      type: "select",
      options: ["No", "Yes"],
      required: true,
    },
    {
      label: "Your Logo",
      value: "Logo",
      type: "file",
      required: true,
      additionalElement: null,
    },
  ];
  
  const [formData, setFormData] = useState({
    admin_id: user.id,
    Name: "",
    Type: "Private Company Limited by shares",
    RegNo: "",
    Contact: "",
    Email: user.email ,
    OrganisationEmail: "",
    Website: "",
    Landline: "",
    TradingName: "",
    Period: "Over 12 to 18 months",
    Sector: "Other service activities",
    NameChanged: "No",
    Penalty: "No",
    Logo: null,
  });
  

  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if(company_id){
        console.log('sending id',company_id);
        const response = await axios.get('/api/getCompanyDetails', { params: { id: company_id } });
        console.log(response.data);
        if (response.data) {
          setFormData({
            Email: user.email,
            ...response.data,  
          });
        }
      }
      } catch (err) {
        console.log("Error fetching pre set form details", err);
      }
    };
    fetchDetails();
  }, [company_id]); 
  
  const handleChange = (e, fieldType, fieldValue) => {
    const value = fieldType === "file" ? e.target.files[0] : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [fieldValue]: value,
    }));
  };
  
  useEffect(() => {
    console.log("Form data updated",formData);
  },[formData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "Logo" && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (key !== "Logo" && value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });
  
    if (!formData.Logo || formData.Logo instanceof String) {
      formDataToSend.append("Logo", formData.Logo); 
    }
  
    try {
      const response = await axios.post(
        `/api/${company_id ? `updateCompany/${company_id}` : 'submitCompanyForm'}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      navigate("/hrms/company-profile");
    } catch (err) {
      console.error("Error registering organisation:", err.response?.data || err.message);
    }
  };
  
  

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <i className="la la-user-edit text-xl text-blue-900"></i>
        <h1 className="text-blue-900 text-xl font-medium">Profile Update</h1>
      </div>
      <hr className="my-4 border-t-1 border-gray-400" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map((field, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm">{field.label}</label>
                {field.additionalElement && (
                  <div className="ml-2">{field.additionalElement}</div>
                )}
                {field.value === "Logo" && formData.Logo && (
                  <img
                    src={formData.Logo}
                    alt="Logo Preview"
                    className="mt-2 w-12 h-12 rounded-md"
                  />
                )}
                {field.required && (
                  <span className="text-red-500 font-bold">(*)</span>
                )}
              </div>
              {field.type === "select" ? (
                <select
                  name={field.value}
                  value={formData[field.value]}
                  onChange={(e) => handleChange(e, "select", field.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required = {field.required}

                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.value}
                  type={field.type}
                  value={
                    field.type === "file" ? undefined : formData[field.value]
                  }
                  onChange={(e) => handleChange(e, field.type, field.value)}
                  className={`w-full px-3 py-2 border rounded-md ${
                    field.readOnly ? "bg-gray-100" : ""
                  }`}
                  readOnly={field.readOnly || false}
                  required = {field.required}
                />
              )}
            </div>
          ))}
        </div>
        <button className="mb-4 p-2 rounded-lg text-white bg-blue-900">
          {company_id ? "Update" : "Submit"}
        </button>
        <h1 className="text-blue-900 text-xl font-medium">
          Authorised Person Details
        </h1>
        <hr className="my-4 border-t-1 border-gray-400" />
      </form>
    </div>
  );
};

export default CompanyForm;
