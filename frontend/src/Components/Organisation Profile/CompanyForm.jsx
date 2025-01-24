import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { company_id } = useParams();
  
  const options = [
    "PAYEE And Account Reference Letter From HMRC",
    "Latest RTI from Accountant",
    "Employer Liability Insurance Certificate",
    "Proof of Business Premises (Tenancy Agreement)",
    "Copy Of Lease Or Freehold Property",
    "Business Bank statement for 1 Month",
    "Business Bank statement for 2 Month",
    "Business Bank statement for 3 Month",
    "SIGNED Annual account (if the business is over 18 months old)",
    "VAT Certificate (if registered)",
    "Copy of Health and safety star Rating (Applicable for food business only)",
    "Registered Business License or Certificate",
    "Franchise Agreement",
    "Governing Body Registration",
    "Copy Of Health & Safety Star Rating",
    "Audited Annual Account (if you have)",
    "Regulatory body certificate if applicable to your business such as ACCA, FCA, OFCOM, IATA, ARLA",
    "Others Document",
  ];

  const formSections = [
    {
      title: "",
      state_name: "companyData",
      fields: [
        {
          label: "Organisation Name",
          value: "Company_name",
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
          value: "Company_Type",
          type: "select",
          options: ["Private Company Limited by shares"],
          required: true,
        },
        {
          label: "Registration No.",
          value: "Company_RegNo",
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
          value: "Company_Contact",
          type: "text",
          required: true,
        },
        {
          label: "Login Email ID",
          value: "Company_Email",
          type: "email",
          required: true,
          readOnly: true,
        },
        {
          label: "Organisation Email ID",
          value: "Company_OrganisationEmail",
          type: "email",
          required: true,
        },
        {
          label: "Website",
          value: "Company_Website",
          type: "url",
        },
        {
          label: "Landline Number",
          value: "Company_Landline",
          type: "text",
        },
        {
          label: "Trading Name",
          value: "Company_TradingName",
          type: "text",
          required: true,
        },
        {
          label: "Trading Period",
          value: "Company_Period",
          type: "select",
          options: ["Over 12 to 18 months"],
          required: true,
        },
        {
          label: "Name of Sector",
          value: "Company_Sector",
          type: "select",
          required: true,
          options: ["Other service activities"],
        },
        {
          label: "Have you changed Organisation/Trading name in last 5 years?",
          value: "Company_NameChanged",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
        {
          label:
            "Did your organisation face penalty (e.g., recruiting illegal employee) in last 5 years?",
          value: "Company_Penalty",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
        {
          label: "Your Logo",
          value: "Company_Logo",
          type: "file",
          required: true,
          additionalElement: null,
        },
      ],
    },
    {
      title: "Authorised Persons Details",
      state_name: "authorizingData",
      fields: [
        {
          label: "First Name",
          value: "Authorizing_fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "Authorizing_lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "Authorizing_designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value: "Authorizing_phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "Authorizing_email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "Authorizing_proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "Authorizing_history",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
      ],
    },
    {
      title: "Key Contact",
      state_name: "keyContactData",
      fields: [
        {
          label: "If Same As Authorised Person",
          value: "KeyContact_check",
          type: "checkbox",
          required: false,
        },
        {
          label: "First Name",
          value: "KeyContact_fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "KeyContact_lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "KeyContact_designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value: "KeyContact_phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "KeyContact_email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "KeyContact_proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "KeyContact_history",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
      ],
    },
    {
      title: "Level 1 User",
      state_name: "level1Data",
      fields: [
        {
          label: "If Same As Authorised Person",
          value: "Level1_check",
          type: "checkbox",
          required: false,
        },
        {
          label: "First Name",
          value: "Level1_fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "Level1_lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "Level1_designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value: "Level1_phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "Level1_email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "Level1_proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "Level1_history",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
      ],
    },
    {
      title: "Organisation Address",
      state_name: "addressData",
      fields: [
        {
          label: "Post Code",
          value: "Address_PostCode",
          type: "text",
          required: false,
          additionalElement: null,
        },
        {
          label: "Select Address",
          value: "Address_Select",
          type: "select",
          required: false,
          options: [],
        },
        {
          label: "Address Line 1",
          value: "Address_Line1",
          type: "text",
          required: false,
          additionalElement: null,
        },
        {
          label: "Address Line 2",
          value: "Address_Line2",
          type: "text",
          required: false,
          additionalElement: null,
        },
        {
          label: "Address Line 2",
          value: "Address_Line2",
          type: "text",
          required: false,
          additionalElement: null,
        },
        {
          label: "City/County",
          value: "Address_City_County",
          type: "text",
          required: false,
          additionalElement: null,
        },
        {
          label: "Country",
          value: "Address_Country",
          type: "text",
          required: false,
          additionalElement: null,
        },
      ],
    },
    {
      title: "Organisation Employee(According to latest RTI)",
      state_name: "RTIData",
      fields: [
        {
          label: "Full Name",
          value: "RTI_fname",
          type: "text",
          readOnly: true,
        },
        {
          label: "Department",
          value: "RTI_department",
          type: "text",
          readOnly: true,
        },
        {
          label: "Job Type",
          value: "RTI_job_type",
          type: "text",
          readOnly: true,
        },
        {
          label: "Job Title",
          value: "RTI_job_title",
          type: "text",
          readOnly: true,
        },
        {
          label: "Immigration Status",
          value: "RTI_Immigration_Status",
          type: "text",
          readOnly: true,
        },
      ],
    },
    {
      title: "Trading Hours",
      state_name: "tradingHours",
      fields: [
        {
          label: "Day",
        },
        {
          label: "Status", // Open/Closed status
        },
        {
          label: "Opening Time",
        },
        {
          label: "Closing Time",
        },
      ],
      rows: [
        {
          day: "Monday",
          status: "Open",
          openingTime: "09:00 AM",
          closingTime: "05:00 PM",
        },
        {
          day: "Tuesday",
          status: "Open",
          openingTime: "09:00 AM",
          closingTime: "05:00 PM",
        },
        {
          day: "Wednesday",
          status: "Open",
          openingTime: "09:00 AM",
          closingTime: "05:00 PM",
        },
        {
          day: "Thursday",
          status: "Open",
          openingTime: "09:00 AM",
          closingTime: "05:00 PM",
        },
        {
          day: "Friday",
          status: "Open",
          openingTime: "09:00 AM",
          closingTime: "05:00 PM",
        },
        {
          day: "Saturday",
          status: "Open",
          openingTime: "",
          closingTime: "",
        },
        {
          day: "Sunday",
          status: "Closed",
          openingTime: "Closed",
          closingTime: "Closed",
        },
      ],
    },
    {
      title: "Upload Documents",
      state_name: "uploadDocuments",
      rows: [
        ...Array.from({ length: 18 }, (_, i) => ({
          documentType: options[i],
          file: null,
        })),
      ],
     
    },
  ];
 

  const [tradingHours, setTradingHours] = useState([
    {
      day: "Monday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "18:00",
    },
    {
      day: "Tuesday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "18:00",
    },
    {
      day: "Wednesday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "18:00",
    },
    {
      day: "Thursday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "18:00",
    },
    {
      day: "Friday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "18:00",
    },
    {
      day: "Saturday",
      status: "Open",
      openingTime: "09:00",
      closingTime: "15:00",
    },
    {
      day: "Sunday",
      status: "Closed",
      openingTime: "closed",
      closingTime: "closed",
    },
  ]);
  
  const handleTradingHoursChange = (rowIndex, field, value) => {
    setTradingHours((prevTradingHours) => {
      const updatedTradingHours = [...prevTradingHours];
      updatedTradingHours[rowIndex] = {
        ...updatedTradingHours[rowIndex],
        [field]: value,
      };
      return updatedTradingHours;
    });
  };

 

  const [uploadDocuments, setUploadDocuments] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      documentType: "",
      file: null,
      otherDetails: "",
    }))
  );

  const handleUploadDocumentsChange = (rowIndex, field, value) => {
    setUploadDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[rowIndex] = {
        ...updatedDocuments[rowIndex],
        [field]: value,
      };
      return updatedDocuments;
    });
  };

  const [formData, setFormData] = useState({
    Company_admin_id: user.id,
    Company_name: "",
    Company_Type: "Private Company Limited by shares",
    Company_RegNo: "",
    Company_Contact: "",
    Company_Email: user.email,
    Company_OrganisationEmail: "",
    Company_Website: "",
    Company_Landline: "",
    Company_TradingName: "",
    Company_Period: "Over 12 to 18 months",
    Company_Sector: "Other service activities",
    Company_NameChanged: "No",
    Company_Penalty: "No",
    Company_Logo: null,
  
    Authorizing_fname: "",
    Authorizing_lname: "",
    Authorizing_designation: "",
    Authorizing_email: "",
    Authorizing_phone: "",
    Authorizing_proof_id: null,
    Authorizing_history: "No",
  
    KeyContact_check: false,
    KeyContact_fname: "",
    KeyContact_lname: "",
    KeyContact_designation: "",
    KeyContact_email: "",
    KeyContact_phone: "",
    KeyContact_proof_id: null,
    KeyContact_history: "No",
  
    Level1_check: false,
    Level1_fname: "",
    Level1_lname: "",
    Level1_designation: "",
    Level1_email: "",
    Level1_phone: "",
    Level1_proof_id: null,
    Level1_history: "No",
  
    Address_Postcode: "",
    Address_Select: "",
    Address_Line1: "",
    Address_Line2: "",
    Address_Line3: "",
    Address_City_County: "",
    Address_Country: "",
  
    RTI_fname: "",
    RTI_department: "",
    RTI_job_type: "",
    RTI_job_title: "",
    RTI_Immigration_status: "",
  });
  

  useEffect(() => {
    // const fetchDetails = async () => {
    //   try {
    //     if (company_id) {
    //       console.log("sending id", company_id);
    //       const response = await axios.get("/api/getCompanyDetails", {
    //         params: { id: company_id },
    //       });
    //       console.log(response.data);
    //       if (response.data) {
    //         setCompanyData({
    //           Email: user.email,
    //           ...response.data,
    //         });
    //       }
    //     }
    //   } catch (err) {
    //     console.log("Error fetching pre set form details", err);
    //   }
    // };
    //fetchDetails();
  }, [company_id]);

  const handleChange = (e, fieldName) => {
    const { value, type, checked, files } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
  
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: files[0], 
      }));
      return; 
    }
  
    if (type === "checkbox") {
      if (fieldName === "KeyContact_check") {
        if(updatedValue){
             setFormData((prevData) => ({
          ...prevData,
          KeyContact_fname: prevData.Authorizing_fname,
          KeyContact_lname: prevData.Authorizing_lname,
          KeyContact_designation: prevData.Authorizing_designation,
          KeyContact_email: prevData.Authorizing_email,
          KeyContact_phone: prevData.Authorizing_phone,
          KeyContact_proof_id: prevData.Authorizing_proof_id, 
          KeyContact_history: prevData.Authorizing_history,
        }));
        }
        else{
          setFormData((prevData) => ({
            ...prevData,
            KeyContact_fname: "",
            KeyContact_lname: "",
            KeyContact_designation: "",
            KeyContact_email:"",
            KeyContact_phone: "",
            KeyContact_proof_id: "", 
            KeyContact_history: "",
          }));
        }
     
      } else if (fieldName === "Level1_check") {
        if(updatedValue){
           setFormData((prevData) => ({
          ...prevData,
          Level1_fname: prevData.Authorizing_fname,
          Level1_lname: prevData.Authorizing_lname,
          Level1_designation: prevData.Authorizing_designation,
          Level1_email: prevData.Authorizing_email,
          Level1_phone: prevData.Authorizing_phone,
          Level1_proof_id: prevData.Authorizing_proof_id, 
          Level1_history: prevData.Authorizing_history,
        }));
        }
       else{
        setFormData((prevData) => ({
          ...prevData,
          Level1_fname:"",
          Level1_lname: "",
          Level1_designation: "",
          Level1_email: "",
          Level1_phone: "",
          Level1_proof_id: "", 
          Level1_history: "",
        }));
       }
      }
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: updatedValue,
    }));
  
    console.log("Updated:", fieldName, updatedValue);
  };
  
  
  useEffect(() => {
     console.log("form data",formData);
  },[formData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const formDataToSend = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if ((key === "Company_Logo" || key === "KeyContact_proof_id" || 
        key === "Authorizing_proof_id" || key === "Level1_proof_id" ) 
        && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });
  
    // Submit trading hours data
    tradingHours.forEach((tradingHour, index) => {
      const formKey = `tradingHours[${index}]`; // Use an index to differentiate each item in the array
      formDataToSend.append(formKey, JSON.stringify(tradingHour));
    });
  
    // uploadDocuments.forEach(async(document, index) => {
    //   if (document.file) {
    //     const formKey = `uploadDocuments[${index}]`; 
    //     const documentData = new FormData();
    //     documentData.append("document", document.file);
    //     documentData.append("documentType", document.documentType);
    //     documentData.append("otherDetails", document.otherDetails);
  
    //     try {
    //       const response = await axios.post("/api/uploadDocument", documentData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });
    //       console.log(`Document ${index + 1} uploaded successfully`, response.data);
    //     } catch (err) {
    //       console.error(`Error uploading document ${index + 1}:`, err.response?.data || err.message);
    //     }
    //   }
    // });
  
    // Make API request for company data submission
    try {
      const response = await axios.post(
        `/api/${company_id ? `updateCompany/${company_id}` : "submitCompanyForm"}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Company data submitted successfully:", response.data);
      navigate("/hrms/company-profile");
    } catch (err) {
      console.error("Error submitting company data:", err.response?.data || err.message);
    }
  };
  
  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        <a href="/hrms/company-profile/company">Organisation Profile</a>
        <span className="mx-2">/</span>
        <a href="#" className="text-tt">
          Edit organisation profile
        </a>
      </p>
      <div className="mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <i className="la la-user-edit text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">Profile Update</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {formSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                {section.title}
              </h2>
              <hr className="my-6 border-t-1 border-gray-400" />

              {section.title === "Trading Hours" ? (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <label className="text-sm font-medium text-gray-600">Day</label>
      <label className="text-sm font-medium text-gray-600">Status</label>
      <label className="text-sm font-medium text-gray-600">Opening Time</label>
      <label className="text-sm font-medium text-gray-600">Closing Time</label>
    </div>

    {tradingHours.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className="text-sm grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name={`day-${rowIndex}`}
          value={row.day}
          readOnly
          className="text-gray-400 w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        />

        <select
          name={`status-${rowIndex}`}
          value={row.status || "Open"}
          onChange={(e) =>
            handleTradingHoursChange(rowIndex, "status", e.target.value)
          }
          className="w-full px-3 py-2 border rounded-md bg-white focus:border-tt"
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          name={`openingTime-${rowIndex}`}
          value={row.openingTime}
          onChange={(e) =>
            handleTradingHoursChange(rowIndex, "openingTime", e.target.value)
          }
          className={`${
            row.status === "Closed" ? "bg-gray-200" : undefined
          } w-full px-3 py-2 border rounded-md focus:border-tt`}
          disabled={row.status === "Closed"}
        >
          <option value="1:00">1:00</option>
          <option value="2:00">2:00</option>
          <option value="3:00">3:00</option>
          <option value="4:00">4:00</option>
          <option value="5:00">5:00</option>
          <option value="6:00">6:00</option>
          <option value="7:00">7:00</option>
          <option value="8:00">8:00</option>
          <option value="9:00">9:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
          <option value="23:00">23:00</option>
          <option value="00:00">00:00</option>
        </select>

        <select
          name={`closingTime-${rowIndex}`}
          value={row.closingTime}
          onChange={(e) =>
            handleTradingHoursChange(rowIndex, "closingTime", e.target.value)
          }
          className={`${
            row.status === "Closed" ? "bg-gray-200" : undefined
          } w-full px-3 py-2 border rounded-md focus:border-tt`}
          disabled={row.status === "Closed"}
        >
          <option value="1:00">1:00</option>
          <option value="2:00">2:00</option>
          <option value="3:00">3:00</option>
          <option value="4:00">4:00</option>
          <option value="5:00">5:00</option>
          <option value="6:00">6:00</option>
          <option value="7:00">7:00</option>
          <option value="8:00">8:00</option>
          <option value="9:00">9:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
          <option value="23:00">23:00</option>
          <option value="00:00">00:00</option>
        </select>
      </div>
    ))}
  </div>
) : section.title === "Upload Documents" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6 text-gray-600">
                    <label className="text-sm font-semibold">
                      Type of Document
                    </label>
                    <label className="text-sm font-semibold">
                      Upload Document
                    </label>
                  </div>

                  {Array.isArray(section.rows) && section.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <select
                        name={`documentType-${rowIndex}`}
                        value={row.documentType || ""}
                        onChange={(e) =>
                          handleUploadDocumentsChange(
                            rowIndex,
                            "documentType",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border rounded-md text-[14px] focus:border-tt focus:border-b-2"
                      >
                        <option value="">Select Document Type</option>
                        {options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <input
                        type="file"
                        name={`file-${rowIndex}`}
                        onChange={(e) =>
                          handleUploadDocumentsChange(
                            rowIndex,
                            "file",
                            e.target.files[0]
                          )
                        }
                        className="w-full px-2 py-1 text-sm"
                      />

                      {row.documentType === "Others Document" && (
                        <input
                          type="text"
                          placeholder="Specify document details"
                          value={row.otherDetails || ""}
                          onChange={(e) =>
                            handleUploadDocumentsChange(
                              rowIndex,
                              "otherDetails",
                              e.target.value
                            )
                          }
                          className="col-span-2 px-2 py-1 border rounded-md mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 
      ${
        section.title === "Organisation Address" ||
        section.title === "Trading Hours"
          ? "md:grid-cols-4"
          : section.title === "Organisation Employee(According to latest RTI)"
          ? "md:grid-cols-5"
          : "md:grid-cols-3"
      } gap-6`}
                >
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className={
                        field.type === "checkbox" ? "col-span-full" : ""
                      }
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {field.type !== "checkbox" && (
                          <label className="text-sm">{field.label}</label>
                        )}
                        {field.additionalElement && (
                          <div className="ml-2">{field.additionalElement}</div>
                        )}
                        {field.value === "Company_Logo" &&
                          formData["Company_Logo"] && (
                            <img
                              src={formData["Company_Logo"]}
                              alt="Logo Preview"
                              className="mt-2 w-12 h-12 rounded-md"
                            />
                          )}
                        {field.required && (
                          <span className="text-red-500 font-bold">(*)</span>
                        )}
                         {field.value === "Authorizing_proof_id" &&
                          formData["Authorizing_proof_id"] && (
                            <img
                              src={formData["Authorizing_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md"
                            />
                          )}
                           {field.value === "KeyContact_proof_id" &&
                          formData["KeyContact_proof_id"] && (
                            <img
                              src={formData["KeyContact_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md"
                            />
                          )}
                           {field.value === "Level1_proof_id" &&
                          formData["Level1_proof_id"] && (
                            <img
                              src={formData["Level1_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md"
                            />
                          )}
      
                      </div>
                      {field.type === "select" ? (
                        <select
                          name={field.value}
                          value={
                            formData[field.value] || ""
                          }
                          onChange={(e) =>
                            handleChange(e, field.value)
                          }
                          className="w-full px-3 py-2 border rounded-md  focus:border-tt focus:border-b-2 bg-white"
                          required={field.required}
                        >
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={field.value}
                            name={field.value}
                            checked={
                              formData[field.value] ||
                              false
                            }
                            onChange={(e) =>
                              handleChange(e,field.value)
                            }
                            className="w-4 h-4  focus:border-tt focus:border-b-2"
                          />
                          <label
                            htmlFor={field.value}
                            className="text-sm text-gray-800"
                          >
                            {field.label}
                          </label>
                        </div>
                      ) : (
                        <input
                          name={field.value}
                          type={field.type}
                          value={
                            field.type === "file" ? undefined : formData[field.value] 
                          }
                          onChange={(e) =>
                            handleChange(e,field.value)
                          }
                          className={`w-full text-gray-700 px-3 py-2 border rounded-md focus:border-tt focus:border-b-2 ${
                            field.readOnly ? "bg-gray-100" : ""
                          }`}
                          readOnly={field.readOnly || false}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="p-2 rounded-lg text-white bg-blue-900">
            {company_id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
