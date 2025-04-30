import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {Link, useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { company_id } = useParams();
  const { setAllDetails,fetchDetails,companyDocuments,fetchOrganisation } = useCompanyContext();
  const [isSubmitting,setSubmitting] = useState(false);
  
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
         
          readOnly: true,

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
          required: company_id ? false : true,
          additionalElement: null,
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
        // {
        //   label: "Select Address",
        //   value: "Address_Select",
        //   type: "select",
        //   required: false,
        //   options: [],
        // },
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
          label: "Address Line 3",
          value: "Address_Line3",
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
    // {
    //   title: "Organisation Employee(According to latest RTI)",
    //   state_name: "RTIData",
    //   fields: [
    //     {
    //       label: "Full Name",
    //       value: "RTI_fname",
    //       type: "text",
    //       readOnly: true,
    //     },
    //     {
    //       label: "Department",
    //       value: "RTI_department",
    //       type: "text",
    //       readOnly: true,
    //     },
    //     {
    //       label: "Job Type",
    //       value: "RTI_job_type",
    //       type: "text",
    //       readOnly: true,
    //     },
    //     {
    //       label: "Job Title",
    //       value: "RTI_job_title",
    //       type: "text",
    //       readOnly: true,
    //     },
    //     {
    //       label: "Immigration Status",
    //       value: "RTI_Immigration_Status",
    //       type: "text",
    //       readOnly: true,
    //     },
    //   ],
    // },
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
          sampleDocument:
            i === 0
              ? "/sample_documents/PAYEE And Account Reference Letter From HMRC.pdf"
              : i === 2
              ? "/sample_documents/Employer Liability Insurance Certificate.pdf"
              : i === 9
              ? "/sample_documents/VAT Certificate (if registered).pdf"
              : null,
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
    Array.from({ length: options.length }, (_, i) => ({
      documentType: options[i],
      file: null,
      sampleDocument:
        i === 0
          ? "/sample_documents/PAYEE And Account Reference Letter From HMRC.pdf"
          : i === 2
          ? "/sample_documents/Employer Liability Insurance Certificate.pdf"
          : i === 9
          ? "/sample_documents/VAT Certificate (if registered).pdf"
          : null,
      uploadedBefore: false, // To track if the document was previously uploaded
      previousDetails: null, // Stores details like URL of previously uploaded document
      otherDetails: "", // Additional details for the document
    }))
  );
  
  
  useEffect(() => {
    if (companyDocuments?.length > 0) {
      setUploadDocuments((prevDocuments) =>
        prevDocuments.map((doc) => {
          const previouslyUploaded = companyDocuments.find(
            (uploadedDoc) => uploadedDoc.document_type === doc.documentType
          );
  
          return previouslyUploaded
            ? {
                ...doc,
                uploadedBefore: true,
                previousDetails: {
                  document_url: previouslyUploaded.document_url,
                  document_type: previouslyUploaded.document_type,
                },
              }
            : doc;
        })
      );
    }
  }, [companyDocuments]);
  
  
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
    Company_name: user.company_name,
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
    const fetchDetails = async () => {
      try {
        if (company_id) {
          const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getCompanyDetails`, {
            params: { id: company_id },
          });
          if (response.data) {
            console.log(response.data.allData);
            setFormData((prevData) => ({
              ...prevData,
              Email: user.email,
              ...response.data.allData,
            }));
            setAllDetails([response.data.allData]);
            console.log(response.data.tradingHours);
            setTradingHours(response.data.tradingHours);
          }
        }
      } catch (err) {

      }
    };
    fetchDetails();
  }, [company_id]);
  
  const handleChange = (e, fieldName) => {
    const { value, type, checked, files } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    if (type === "file") {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: files[0], // Store file in state
        }));
        return;
    }

    if (type === "checkbox") {
        setFormData((prevData) => {
            let newState = { ...prevData };

            if (fieldName === "KeyContact_check") {
                if (updatedValue) {
                    newState = {
                        ...newState,
                        KeyContact_check: true,
                        KeyContact_fname: prevData.Authorizing_fname,
                        KeyContact_lname: prevData.Authorizing_lname,
                        KeyContact_designation: prevData.Authorizing_designation,
                        KeyContact_email: prevData.Authorizing_email,
                        KeyContact_phone: prevData.Authorizing_phone,
                        KeyContact_proof_id: prevData.Authorizing_proof_id || null, // Fix: Copy file properly
                        KeyContact_history: prevData.Authorizing_history,
                    };
                } else {
                    newState = {
                        ...newState,
                        KeyContact_check: false, 
                        KeyContact_fname: "",
                        KeyContact_lname: "",
                        KeyContact_designation: "",
                        KeyContact_email: "",
                        KeyContact_phone: "",
                        KeyContact_proof_id: null, // Fix: Reset file correctly
                        KeyContact_history: "",
                    };
                }
            } else if (fieldName === "Level1_check") {
                if (updatedValue) {
                    newState = {
                        ...newState,
                        Level1_check : true,
                        Level1_fname: prevData.Authorizing_fname,
                        Level1_lname: prevData.Authorizing_lname,
                        Level1_designation: prevData.Authorizing_designation,
                        Level1_email: prevData.Authorizing_email,
                        Level1_phone: prevData.Authorizing_phone,
                        Level1_proof_id: prevData.Authorizing_proof_id || null, // Fix: Copy file properly
                        Level1_history: prevData.Authorizing_history,
                    };
                } else {
                    newState = {
                        ...newState,
                        Level1_check : false,
                        Level1_fname: "",
                        Level1_lname: "",
                        Level1_designation: "",
                        Level1_email: "",
                        Level1_phone: "",
                        Level1_proof_id: null, // Fix: Reset file correctly
                        Level1_history: "",
                    };
                }
            }

            return newState;
        });
    } else {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: updatedValue,
        }));
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formDataToSend = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if (
        (key === "Company_Logo" ||
          key === "KeyContact_proof_id" ||
          key === "Authorizing_proof_id" ||
          key === "Level1_proof_id") &&
        value instanceof File
      ) {
        formDataToSend.append(key, value);
      } else if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });
  
    tradingHours.forEach((tradingHour, index) => {
      const formKey = `tradingHours[${index}]`; 
      formDataToSend.append(formKey, JSON.stringify(tradingHour));
    });
  
    try {
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${company_id ? `updateCompany/${company_id}` : "submitCompanyForm"}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
  
      const newCompanyId = company_id ? company_id : response.data.organisation.id; 
  
      const documentUploads = uploadDocuments.map((document, index) => {
        if (document.file) {
          const documentData = new FormData();
          documentData.append("Company_name", formData.Company_name);
          documentData.append("document", document.file);
          documentData.append("documentType", document.documentType);
          documentData.append("otherDetails", document.otherDetails);
          documentData.append("companyId", newCompanyId);  
  
          return axios.post(`${import.meta.env.VITE_API_URL}/api/uploadDocument/${newCompanyId}`, documentData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
          })
          .catch((err) => {
          });
        }
      });
  
      await Promise.all(documentUploads);
      await fetchOrganisation(user.id,user.isAdmin);
      alert('Company Submission Successful');
      navigate(`/hrms/company-profile/company`);
  //    fetchDetails();
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
    finally{
      setSubmitting(false);

    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-10 px-2">
      <p className="text-[12px] text-gray-600 max-w-4xl mx-auto mb-2">
        <Link to="/hrms/employeeDashboard" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/hrms/company-profile/company" className="hover:underline">Organisation Profile</Link>
        <span className="mx-2">/ Update Company Profile</span>
      </p>
      <div className="mt-4 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border-t-8 border-yellow-600 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
            <i className="la la-user-edit text-2xl text-yellow-900"></i>
          </div>
          <h1 className="text-yellow-900 text-2xl font-bold tracking-tight">Profile Update</h1>
        </div>
        <form className="space-y-12" onSubmit={handleSubmit}>
          {formSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              {section.title && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-6 bg-yellow-600 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-yellow-900 tracking-wide">{section.title}</h2>
                </div>
              )}
              {section.title && <hr className="mb-6 border-t-2 border-yellow-100" />}
              {section.title === "Trading Hours" ? (
                <div className="space-y-4">
                  <div className="hidden md:grid grid-cols-4 gap-4 text-gray-600 font-semibold text-sm mb-2">
                    <div>Day</div>
                    <div>Status</div>
                    <div>Opening Time</div>
                    <div>Closing Time</div>
                  </div>
                  {tradingHours.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-2"
                    >
                      <input
                        type="text"
                        name={`day-${rowIndex}`}
                        value={row.day}
                        readOnly
                        className="text-gray-400 w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed shadow-sm"
                      />
                      <select
                        name={`status-${rowIndex}`}
                        value={row.status || "Open"}
                        onChange={(e) =>
                          handleTradingHoursChange(
                            rowIndex,
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-yellow-400 shadow-sm"
                      >
                        <option value="" disabled>View options</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <select
                        name={`openingTime-${rowIndex}`}
                        value={row.openingTime}
                        onChange={(e) =>
                          handleTradingHoursChange(
                            rowIndex,
                            "openingTime",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 shadow-sm ${row.status === "Closed" ? "bg-gray-200" : "bg-white"}`}
                        disabled={row.status === "Closed"}
                      >
                        <option value="" disabled>View options</option>
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
                          handleTradingHoursChange(
                            rowIndex,
                            "closingTime",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 shadow-sm ${row.status === "Closed" ? "bg-gray-200" : "bg-white"}`}
                        disabled={row.status === "Closed"}
                      >
                        <option value="" disabled>View options</option>
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
                  <div className="grid grid-cols-2 gap-6 text-gray-600 font-semibold text-sm mb-2">
                    <div>Type of Document</div>
                    <div>Upload Document</div>
                  </div>
                  {Array.isArray(uploadDocuments) &&
                    uploadDocuments.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-2">
                        <select
                          name={`documentType-${rowIndex}`}
                          value={row.documentType || ""}
                          onChange={(e) =>
                            handleUploadDocumentsChange(rowIndex, "documentType", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md text-[14px] focus:ring-2 focus:ring-yellow-400 shadow-sm bg-white"
                        >
                          <option value="" disabled>Select Document Type</option>
                          {options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="flex flex-row gap-2 items-center">
                          {row.sampleDocument && (
                            <a
                              href={row.sampleDocument}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-yellow-800 hover:bg-yellow-700 transition-colors p-2 border rounded w-[140px] text-[10px] text-white font-medium text-center"
                            >
                              Sample Document
                            </a>
                          )}
                          <label className="w-full">
                            <input
                              type="file"
                              name={`file-${rowIndex}`}
                              onChange={(e) =>
                                handleUploadDocumentsChange(rowIndex, "file", e.target.files[0])
                              }
                              className="w-full px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-yellow-400 shadow-sm bg-white"
                            />
                            {row.file && (
                              <span className="block text-xs text-gray-500 mt-1 truncate">{row.file.name}</span>
                            )}
                          </label>
                          {row.uploadedBefore && row.previousDetails?.document_url && (
                            <a
                              href={row.previousDetails.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 transition-colors p-2 border rounded text-[10px] text-white text-center"
                            >
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3`}
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
                          <label className="text-sm font-medium text-gray-700" htmlFor={field.value}>{field.label}</label>
                        )}
                        {field.additionalElement && (
                          <div className="ml-2">{field.additionalElement}</div>
                        )}
                        {field.value === "Company_Logo" &&
                          formData["Company_Logo"] && (
                            <img
                              src={formData["Company_Logo"]}
                              alt="Logo Preview"
                              className="mt-2 w-12 h-12 rounded-md border object-cover"
                            />
                          )}
                        {field.required && (
                          <span className="text-red-500 font-bold">*</span>
                        )}
                        {field.value === "Authorizing_proof_id" &&
                          formData["Authorizing_proof_id"] && (
                            <img
                              src={formData["Authorizing_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md border object-cover"
                            />
                          )}
                        {field.value === "KeyContact_proof_id" &&
                          formData["KeyContact_proof_id"] && (
                            <img
                              src={formData["KeyContact_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md border object-cover"
                            />
                          )}
                        {field.value === "Level1_proof_id" &&
                          formData["Level1_proof_id"] && (
                            <img
                              src={formData["Level1_proof_id"]}
                              alt="Proof id Preview"
                              className="mt-2 w-12 h-12 rounded-md border object-cover"
                            />
                          )}
                      </div>
                      {field.type === "select" ? (
                        <select
                          id={field.value}
                          name={field.value}
                          value={formData[field.value] || ""}
                          onChange={(e) => handleChange(e, field.value)}
                          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-white shadow-sm"
                          required={field.required}
                        >
                          <option value="" disabled>View options</option>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id={field.value}
                            name={field.value}
                            checked={formData[field.value] || false}
                            onChange={(e) => handleChange(e, field.value)}
                            className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-yellow-400"
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
                          id={field.value}
                          name={field.value}
                          type={field.type}
                          value={field.type === "file" ? undefined : formData[field.value]}
                          onChange={(e) => handleChange(e, field.value)}
                          className={`w-full text-gray-700 px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 shadow-sm ${field.readOnly ? "bg-gray-100" : "bg-white"}`}
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
          <div className="flex justify-end">
            <button
              className="px-6 py-2 rounded-lg text-white bg-yellow-900 hover:bg-yellow-800 transition-colors font-semibold text-lg shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
