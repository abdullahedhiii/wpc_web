import { useEffect, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { Link,useLocation, useNavigate, useParams } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
const nationalityOptions = [
  "Afghanistan",
  "Albania",
  "America",
  "Argentina",
  "Aruba",
  "Australia",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Beliz",
  "Bermuda",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Botswana",
  "Brunei Darussalam",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Cayman Islands",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "East Caribbean",
  "Egypt",
  "El Salvador",
  "Eritrea",
  "Euro",
  "Falkland Islands",
  "Fiji",
  "France",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Guatemala",
  "Guernsey",
  "Guyana",
  "Hellas (Greece)",
  "Holland (Netherlands)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Kazakhstan",
  "Korea (North)",
  "Korea (South)",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Malaysia",
  "Malta",
  "Mauritius",
  "Mexico",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Uganda",
  "Romania",
  "Russia",
  "Saint Helena",
  "Saudi Arabia",
  "Serbia",
  "Seychelles",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Thailand",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkey",
  "Tuvalu",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zimbabwe",
];

const currency_options = [
  "DZD",
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

const EmployeeForm = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [isSubmit,setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {user} = useSelector((state) => state.user);
  const {
    companyData,
    departmentData,fetchDepartments,
    annualPays,fetchAnnualPays,
    designationData,fetchDesignations,
    employeeTypes,fetchTypes,
    authorizingDetails,
    payGroups,fetchPayGroups,
    paymentTypes,fetchPaymentTypes,
    taxMasters,fetchTaxMasters,
    orgBanks,fetchBanks,
  } = useCompanyContext();
  const [employee_code, setCode] = useState("");
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchAnnualPays()
    fetchBanks()
    fetchDepartments()
    fetchDesignations()
    fetchPayGroups()
    fetchPaymentTypes()
    fetchTaxMasters()
    fetchTypes();
  },[]);
  useEffect(() => {
    const fetch_next_id = async () => {

      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/getNextEmployeeCode`);
        setCode(response.data);
      } catch (err) {
      //  console.error("Error fetching employee code:", err);
      }
    };
    if (!id && employee_code === "") {
    fetch_next_id();
    setLoading(false)

  }
  }, []);

  useEffect(() => {
    if (employee_code) {
      setFormData((prevState) => ({
        ...prevState,
        personal_details: {
          ...prevState.personal_details,
          employee_code: employee_code,
        },
      }));
    }
  }, [employee_code]);

  const [formData, setFormData] = useState({
    personal_details: {
      employee_code: "",
      fname: "",
      mname: "",
      lname: "",
      Gender: "",
      dob: "",
      nationality_no: "",
      Nationality: "",
      email: "",
      contact_1: "",
      contact_2: "",
    },
    service_details: {
      department: "",
      designation: "",
      joining: "",
      type: "",
      confirmation: "",
      start: "",
      end_if: "",
      location: "",
      reportingauth: "h",
      leaveauth: "h",
      profile_pic: null,
      work_in : "",
      work_out : ""
    },
    education_details: [
      {
        sl_no: "",
        qualification: "",
        subject: "",
        institution_name: "",
        awarding_body: "",
        year_of_passing: "",
        percentage: "",
        grade_division: "",
        transcript_document: null,
        certificate_document: null,
      },
    ],
    job_details: {
      title: "",
      start: "",
      end: "",
      experience: 0,
      description: "",
    },
    key_responsibilities: [{ responsibility: "" }],
    training_details: [{ title: "", start: "", end: "", description: "" }],
    kin_details: {
      name: "",
      relation: "",
      email: "",
      contact_no: "",
      address: "",
    },
    certification: { title: "", start: "", end: "", license: "" },
    contact_info: {
      post_code: "",
      address: "",
      line1: "",
      line2: "",
      line3: "",
      city: "",
      country: "",
      proof: null,
    },
    other_documents: [{ type: "", doc: null }],
    
    passport_details: {passport_no: "",nationality: "",place: "",issued_by: "",issue_date: "",expiry_date: "",review_date: "",picture: null,current: true,remarks: "",
    },
    visa: {visa_no: 0,nationality: "",country: "",issued_by: "",issue_date: "",expiry_date: "",review_date: "",front: null,back: null,current: true,remarks: "",
    },
    esus: {refernece: 0,nationality: "",issued: "",expiry: "",review_date: "",remarks: "",document: null,current: false,
    },
    dbs: {type: "",reference: 0,nationality: "",issued: "",expiry: "",review_date: "",remarks: "",document: null,current: false,
    },
    national: {national_id: "",nationality: "",country: "",issued: "",expiry: "",review_date: "",remarks: "",document: null,current: false,
    },
    other_details: [
      {name: "",reference: "",nationality: "",issued: "",expiry: "",review_date: "",document: null,current: false,remarks: "",},
    ],
    pay_details: {group: "",pay: "",wedges: "",payment_type: "",basic_wedges: "",min_hours: "",rate: "",tax_code: "",tax_reference: "",tax_percentage: "",pay_mode: "",bank_name: "",branch_name: "",account_no: "",sort_code: "",currency: ""},
    pay_structure: {
      payments: {dearnessAllowance: false,houseRentAllowance: false,conveyanceAllowance: false,performanceAllowance: false,monthlyFixedAllowance: false,
      },
      deductions: {niDeduction: false,incomeTaxDeduction: false,incomeTaxCess: false,esi: false,profTax: false,
      },
    },
    leave_allocation :{
      holiday_leave : '',
      medical_leave : '',
      maternity_leave : '',
      year : '',
    }
  });

  useEffect(() => {
    const isEmployee = location.pathname.includes('update-profile');
    const t = new Date();
    if(isEmployee && id === null) id = user.employee_code;
    const fetchFormInfo = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/api/getEmployeeDetails/${id}`,{
            params: {year :  t.getFullYear()}
          }
        );
        setFormData(response.data);
        setCode(response.data.personal_details.employee_code);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchFormInfo();
    }
  }, [id]);

  // useEffect(() => {
  //   if (formData.service_details.department) {
  //     const dept =departmentData.length > 0? departmentData.find(
  //       (ele) => ele["Department Name"] === formData.service_details.department
  //     ): null;
  //     if (dept) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         service_details: {
  //           ...prev.service_details,
  //           department_id: dept.id,
  //         },
  //       }));
  //     }
  //   }
  // }, [formData.service_details.department]);

  // useEffect(() => {
  //   if (formData.service_details.designation) {
  //     const desg = designationData.find(
  //       (ele) => ele["Designation"] === formData.service_details.designation
  //     );
  //     if (desg) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         service_details: {
  //           ...prev.service_details,
  //           designation_id: desg.id,
  //         },
  //       }));
  //     }
  //   }
  // }, [formData.service_details.designation]);

  // const departmentOptions = departmentData.length > 0 ? departmentData.map(
  //   (department) => department["Department Name"]
  // ) : null;
  // const typeOptions = employeeTypes.length > 0 ? employeeTypes.map((type) => type["Employment Type"]) : null;
  // const payGroupoptions = payGroups.length > 0 ? payGroups.map((group) => group["Pay Group"]) : null;
  // const payment_type_options = paymentTypes.map((type) => type["Payment Type"]);
  // const tax_options = taxMasters.map((opt) => opt["Tax Code"]);
  // const bank_options = orgBanks.map((opt) => opt["Bank Name"]);
  // // const [filteredDesignations, setFilteredDesignations] = useState([]);
  // const [filteredPays, setFilteredPays] = useState([]);

  // useEffect(() => {
  //   const filtered = designationData
  //     .filter(
  //       (designation) =>
  //         designation["Department Name"] ===
  //         formData.service_details?.department
  //     )
  //     .map((designation) => designation["Designation"]);

  //   setFilteredDesignations(filtered);
  // }, [formData.service_details.department, designationData]);

  // useEffect(() => {
  //   const filtered = annualPays
  //     .filter((pay) => pay["Pay Group"] === formData.pay_details.group)
  //     .map((pp) => pp["Annual Pay"]);

  //   setFilteredPays(filtered);
  // }, [formData.pay_details.group, annualPays]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const section = name.split(".")[0];
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name.split(".")[1]]: files[0],
        },
      }));
    } else {
      let parsedValue = value;
      if (type === 'radio' && value === "Yes") parsedValue = true;
      else if (type === 'radio' && value === "No") parsedValue = false;
      
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name.split(".")[1]]: parsedValue,
        },
      }));
    }
  };

  const handleStructureChange = (category, key) => {
    setFormData((prev) => ({
      ...prev,
      pay_structure: {
        ...prev.pay_structure,
        [category]: {
          ...prev.pay_structure[category],
          [key]: !prev.pay_structure[category][key],
        },
      },
    }));
  };

  const formSections = [
    {
      page: 1,
      title: "Personal Details",
      fields: [
        {
          label: "Employee Code",
          value: "personal_details.employee_code",
          type: "text",
          required: true,
          readOnly: true,
        },
        {
          label: "First Name",
          value: "personal_details.fname",
          type: "text",
          required: true,
        },
        {
          label: "Middle Name",
          value: "personal_details.mname",
          type: "text",
          required: false,
        },
        {
          label: "Last Name",
          value: "personal_details.lname",
          type: "text",
          required: true,
        },
        {
          label: "Gender",
          value: "personal_details.Gender",
          type: "select",
          required: false,
          options: ["Male", "Female"],
        },
        // {
        //   label: "NI No.",
        //   value: "personal_details.nationality_no",
        //   type: "text",
        //   required: false,
        // },
        {
          label: "Date of Birth",
          value: "personal_details.dob",
          type: "date",
          required: false,
        },
        {
          label: "Select Nationality",
          value: "personal_details.Nationality",
          type: "select",
          required: false,
          options: nationalityOptions,
        },
        {
          label: "Email",
          value: "personal_details.email",
          type: "email",
          required: true,
        },
        {
          label: "Contact Number",
          value: "personal_details.contact_1",
          type: "text",
          required: true,
        },
        {
          label: "Alternative Number",
          value: "personal_details.contact_2",
          type: "text",
          required: false,
        },
      ],
    },
    {
      page: 1,
      title: "Service Details",
      fields: [
        {
          label: "Department",
          value: "service_details.department",
          type: "text",
          required: true,
          // options: departmentOptions,
        },
        {
          label: "Designation",
          value: "service_details.designation",
          type: "text",
          required: true,
          // options: filteredDesignations,
        },
        {
          label: "Date of Joining",
          value: "service_details.joining",
          type: "date",
          required: false,
        },
        {
          label: "Employment Type",
          value: "service_details.type",
          type: "text",
          required: true,
          // options: typeOptions,
        },
        {
          label: "Date of Confirmation",
          value: "service_details.confirmation",
          type: "date",
          required: false,
        },
        {
          label: "Contract Start Date",
          value: "service_details.start",
          type: "date",
          required: false,
        },
        {
          label: "Contract End Date (If Applicable)",
          value: "service_details.end_if",
          type: "date",
          required: false,
        },
        {
          label: "Job Location",
          value: "service_details.location",
          type: "text",
          required: false,
        },
        {
          label: "Profile Picture",
          value: "service_details.profile_pic",
          type: "file",
        },
        {
          label: "Shift Time In",
          value: "service_details.work_in",
          type: "time",
          required: true,
        },
        {
          label: "Shift Time Out",
          value: "service_details.work_out",
          type: "time",
          required: true,
        }
       
      ],
    },
    {
      page : 1,
      title :`Leave Allocation (Year  ${new Date().getFullYear()})`,
      fields:[
        { label: "Holiday Leaves", type: "text", value: "leave_allocation.holiday_leave" ,required:true},
        { label: "Medical Leaves", type: "text", value: "leave_allocation.medical_leave" ,required:true},
        { label: "Maternity Leaves(if applicable)", type: "text", value: "leave_allocation.maternity_leave" ,required:false},
      ]
    },
    {
      page: 2,
      title: "Educational Details",
      fields: [
        { label: "Sl. No.", type: "text", value: "education_details.sl_no" },
        {
          label: "Qualification",
          type: "text",
          value: "education_details.qualification",
        },
        { label: "Subject", type: "text", value: "education_details.subject" },
        {
          label: "Institution Name",
          type: "text",
          value: "education_details.institution_name",
        },
        {
          label: "Awarding Body/University",
          type: "text",
          value: "education_details.awarding_body",
        },
        {
          label: "Year of Passing",
          type: "text",
          value: "education_details.year_of_passing",
        },
        {
          label: "Percentage",
          type: "text",
          value: "education_details.percentage",
        },
        {
          label: "Grade/Division",
          type: "text",
          value: "education_details.grade_division",
        },
        {
          label: "Transcript Document",
          type: "file",
          value: "education_details.transcript_document",
        },
        {
          label: "Certificate Document",
          type: "file",
          value: "education_details.certificate_document",
        },
        { label: "Add", type: "", value: "education_details.add" },
      ],
    },
    {
      page: 2,
      title: "Job Details",
      fields: [
        { label: "Job Title", type: "text", value: "job_details.title" },
        { label: "Start Date", type: "date", value: "job_details.start" },
        { label: "End Date", type: "date", value: "job_details.end" },
        {
          label: "Year of Experience",
          type: "text",
          value: "job_details.experience",
        },
        {
          label: "Job Description",
          type: "textarea",
          value: "job_details.description",
        },
      ],
    },
    {
      page: 2,
      title: "Key Responsibilities",
      fields: [
        {
          label: "Responsibility Name",
          type: "text",
          value: "key_responsibilities.responsibility",
        },
      ],
    },
    {
      page: 3,
      title: "Training Details",
      fields: [],
    },
    {
      page: 4,
      title: "Emergency / Next of Kin Contact Details",
      fields: [
        { label: "Name", type: "text", value: "kin_details.name" },
        {
          label: "Relationship",
          type: "select",
          value: "kin_details.relation",
          options: [
            "Father",
            "Mother",
            "Wife",
            "Relative",
            "Husband",
            "Partner",
            "Son",
            "Daughter",
            "Friend",
            "Others",
          ],
        },
        { label: "Email", type: "email", value: "kin_details.email" },
        {
          label: "Emergency Contact No.",
          type: "text",
          value: "kin_details.contact_no",
        },
        { label: "Address", type: "text", value: "kin_details.address" },
      ],
    },
    {
      page: 4,
      title: "Certified Membership",
      fields: [
        {
          label: "Title of Certified License",
          type: "text",
          value: "certification.title",
        },
        {
          label: "License Number",
          type: "text",
          value: "certification.number",
        },
        { label: "Start Date", type: "date", value: "certification.start" },
        { label: "End Date", type: "date", value: "certification.end" },
      ],
    },
    {
      page: 5,
      title: "Contact Information (Correspondence Address)",
      fields: [
        { label: "Post Code", type: "text", value: "contact_info.post_code" },
        // {
        //   label: "Select Addres",
        //   type: "select",
        //   value: "contact_info.address",
        //   options: [],
        // },
        { label: "Address Line 1", type: "text", value: "contact_info.line1" },
        { label: "Address Line 2", type: "text", value: "contact_info.line2" },
        { label: "Address Line 3", type: "text", value: "contact_info.line3" },
        { label: "City/County", type: "text", value: "contact_info.city" },
        {
          label: "Country",
          type: "select",
          value: "contact_info.country",
          options: nationalityOptions,
        },
        {
          label: "Proof Of Address",
          type: "file",
          value: "contact_info.proof",
        },
      ],
    },
    {
      page: 5,
      title: "Other Documents",
      fields: [],
    },
    {
      page: 6,
      title: "Passport Details",
      fields: [
        {
          label: "Passport No.",
          type: "text",
          value: "passport_details.passport_no",
        },
        // {
        //   label: "Nationality",
        //   type: "select",
        //   value: "passport_details.nationality",
        //   options: nationalityOptions,
        // },
        {
          label: "Place of Birth",
          type: "text",
          value: "passport_details.place",
        },
        {
          label: "Issued by",
          type: "text",
          value: "passport_details.issued_by",
        },
        {
          label: "Issue date",
          type: "date",
          value: "passport_details.issue_date",
        },
        {
          label: "Expiry date",
          type: "date",
          value: "passport_details.expiry_date",
        },
        {
          label: "Review Date",
          type: "date",
          value: "passport_details.review_date",
          // readOnly: true,
        },
        { label: "Picture", type: "file", value: "passport_details.picture" },
        {
          label: "Is this your current passport?",
          type: "radio",
          value: "passport_details.current",
        },
        { label: "Remarks", type: "text", value: "passport_details.remarks" },
      ],
    },
    {
      page: 6,
      title: "Visa/BRP Details",
      fields: [
        { label: "Visa/BRP No.", type: "text", value: "visa.visa_no" },
        // {
        //   label: "Nationality",
        //   type: "select",
        //   value: "visa.nationality",
        //   options: nationalityOptions,
        // },
        {
          label: "Country of Residence",
          type: "select",
          value: "visa.country",
          options: nationalityOptions,
        },
        { label: "Issued by", type: "text", value: "visa.issued_by" },
        { label: "Issued date", type: "date", value: "visa.issue_date" },
        { label: "Expiry date", type: "date", value: "visa.expiry_date" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "visa.review_date",
          // readOnly: true,
        },
        {
          label: "Upload Front Side Picture",
          type: "file",
          value: "visa.front",
        },
        { label: "Upload Back Side Picture", type: "file", value: "visa.back" },
        {
          label: "Is this your current visa?",
          type: "radio",
          value: "visa.current",
        },
        { label: "Remarks", type: "text", value: "visa.remarks" },
      ],
    },
    {
      page: 6,
      title: "EUSS/Time limit details",
      fields: [
        { label: "Reference Number.", type: "text", value: "esus.reference" },
        // {
        //   label: "Nationality",
        //   type: "select",
        //   value: "esus.nationality",
        //   options: nationalityOptions,
        // },
        { label: "Issued Date", type: "date", value: "esus.issued" },
        { label: "Expiry Date", type: "date", value: "esus.expiry" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "esus.review_date",
          // readOnly: true,
        },
        { label: "Upload Document", type: "file", value: "esus.document" },
        {
          label: "Is this your current status?",
          type: "radio",
          value: "esus.current",
        },
        { label: "Remarks", type: "text", value: "esus.remarks" },
      ],
    },
    {
      page: 6,
      title: "Disclosure and Barring Service (DBS) details",
      fields: [
        {
          label: "DBS Type",
          type: "select",
          value: "dbs.type",
          options: ["Basic", "Standard", "Advanced"],
        },
        { label: "Reference Number.", type: "text", value: "dbs.reference" },
        // {
        //   label: "Nationality",
        //   type: "select",
        //   value: "dbs.nationality",
        //   options: nationalityOptions,
        // },
        { label: "Issued Date", type: "date", value: "dbs.issued" },
        { label: "Expiry Date", type: "date", value: "dbs.expiry" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "dbs.review_date",
          // readOnly: true,
        },
        { label: "Upload Document", type: "file", value: "dbs.document" },
        {
          label: "Is this your current status?",
          type: "radio",
          value: "dbs.current",
        },
        { label: "Remarks", type: "text", value: "dbs.remarks" },
      ],
    },
    {
      page: 6,
      title: "National Id details",
      fields: [
        {
          label: "National id number.",
          type: "text",
          value: "national.national_id",
        },
        // {
        //   label: "Nationality",
        //   type: "text",
        //   value: "national.nationality",
        //   options: nationalityOptions,
        // },
        {
          label: "Country of Residence",
          type: "select",
          value: "national.country",
          options: nationalityOptions,
        },
        { label: "Issued Date", type: "date", value: "national.issued" },
        { label: "Expiry Date", type: "date", value: "national.expiry" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "national.review_date",
          // readOnly: true,
        },
        { label: "Upload Document", type: "file", value: "national.document" },
        {
          label: "Is this your current status?",
          type: "radio",
          value: "national.current",
        },
        { label: "Remarks", type: "text", value: "national.remarks" },
      ],
    },
    {
      page: 6,
      title: "Other Details",
      fields: [],
    },
    {
      page: 7,
      title: "Pay Details",
      fields: [
        {
          label: "Pay Group",
          type: "text",
          value: "pay_details.group",
          // options: payGroupoptions,
        },
        {
          label: "Annual Pay",
          type: "text",
          value: "pay_details.pay",
          // options: filteredPays,
        },
        {
          label: "Wedges pay mode",
          type: "text",
          value: "pay_details.wedges",
          // options: [],
        },
        {
          label: "Payment Type",
          type: "text",
          value: "pay_details.payment_type",
          // options: payment_type_options,
        },
        {
          label: "Basic/Daily Wedges",
          type: "text",
          value: "pay_details.basic_wedges",
        },
        {
          label: "Min. Working Hour",
          type: "text",
          value: "pay_details.min_hours",
        },
        { label: "Rate", type: "text", value: "pay_details.rate" },
        {
          label: "Tax Code",
          type: "text",
          value: "pay_details.tax_code",
          // options: tax_options,
        },
        {
          label: "Tax Reference",
          type: "text",
          value: "pay_details.tax_reference",
        },
        {
          label: "Tax Percentage",
          type: "text",
          value: "pay_details.tax_percentage",
        },
        {
          label: "Payment Mode",
          type: "text",
          value: "pay_details.pay_mode",
          // options: ["Bank", "Cash"],
        },
        {
          label: "Bank Name",
          type: "text",
          value: "pay_details.bank_name",
          // options: bank_options,
        },
        { label: "Branch No", type: "text", value: "pay_details.branch_name" },
        { label: "Account No", type: "text", value: "pay_details.account_no" },
        { label: "Sort Code", type: "text", value: "pay_details.sort_code" },
        {
          label: "Payment Currency",
          type: "select",
          value: "pay_details.currency",
          options: currency_options,
        },
      ],
    },
    {
      page: 8,
      title: "Pay Structure",
      fields: [],
    },
  ];

  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...formData.key_responsibilities];
    updatedResponsibilities[index] = {
      id: updatedResponsibilities[index].id,
      responsibility: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      key_responsibilities: updatedResponsibilities,
    }));
  };

  const addResponsibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      key_responsibilities: [
        ...prevState.key_responsibilities,
        { responsibility: "" },
      ],
    }));
  };

  const removeResponsibility = (index) => {
    const updatedResponsibilities = formData.key_responsibilities.filter(
      (_, i) => i !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      key_responsibilities: updatedResponsibilities,
    }));
  };

  const handleTrainingChange = (index, field, value) => {
    const updatedTraining = [...formData.training_details];
    updatedTraining[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      training_details: updatedTraining,
    }));
  };

  const addTraining = () => {
    setFormData((prevState) => ({
      ...prevState,
      training_details: [
        ...prevState.training_details,
        { title: "", start: "", end: "", description: "" },
      ],
    }));
  };

  const removeTraining = (index) => {
    const updatedTraining = formData.training_details.filter(
      (_, i) => i !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      training_details: updatedTraining,
    }));
  };

  const handleOtherDocumentChange = (index, field, value) => {
    const updateDocuments = [...formData.other_documents];
    updateDocuments[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      other_documents: updateDocuments,
    }));
  };

  const addOtherDocument = () => {
    setFormData((prevState) => ({
      ...prevState,
      other_documents: [...prevState.other_documents, { type: "", doc: null }],
    }));
  };

  const removeOtherDocument = (index) => {
    const updateDocument = formData.other_documents.filter(
      (_, i) => i !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      other_documents: updateDocument,
    }));
  };
  const validatePage = (currentStep) => {
    let isValid = true;
    let errors = ""; // Store field validation errors
  
    if (currentStep === 1) {
      const { fname, lname, email, contact_1,dob} = formData.personal_details;
      const check_dob = dob ? new Date(dob) : null;
      const today = new Date();
      if(check_dob && check_dob > today){
        toast.error('Enter valid employee date of birth');
        return false;
      }
      if (!fname) errors = errors + "Employee First name,";
      if (!lname) errors =  errors + " Last name,";
      if (!email) errors = errors +  " Email,";
      if (!contact_1) errors = errors+  " and Primary contact(1) is required";
      if (errors.length > 0) {
        alert(errors);
       return false;

      }
      if(fname.length < 3 || lname.length < 3){
        alert('Please enter valid names')
        return false
      }
      if(contact_1.length < 10 ){
        alert('Please enter a valid phone number')
        return false

      }
      const {department,designation,start,end_if,type,joining,confirmation,work_in,work_out,profile_pic} = formData.service_details;
      const {holiday_leave,medical_leave,maternity_leave} = formData.leave_allocation;
      if(holiday_leave  === ''|| medical_leave  === '' || department === "" || designation === "" || type === "" || work_in === "" || work_out === "" ){
        alert('Please fill out the required fields (*) !');
        return false
      }
      const dateJoining = joining ? new Date(joining) : null;
      const confirmDate = joining ? new Date(joining) : null;
      const startDate = start ? new Date(start) : null;
      const endDate = end_if ? new Date(end_if) : null;
      const inTime = work_in ? new Date(`1970-01-01T${work_in}`) : null;
      const outTime = work_out ? new Date(`1970-01-01T${work_out}`) : null;

      if (startDate && confirmDate) {
        if (startDate < confirmDate) {
          alert("Please enter a valid contract start date and confirmation date");
          return false;
        }
      }
      
      if (confirmDate && dateJoining) {
        if (confirmDate < dateJoining) {
          alert("Please enter a valid confirmation date and joining date");
          return false;
        }
      }
      
        if(outTime < inTime){
          alert('Enter valid Shift timings');
          return false;
        }
      if (!startDate && endDate) {
        alert("You must provide the start date of the contract");
        return false;
      } else if (startDate && endDate) {
        if (endDate < startDate) {
          alert("Please enter valid contract dates");
          return false;
        }
      }
      
    }
    else if (currentStep === 2){
      const {start,end} = formData.job_details;
      const c_start = new Date(start);
      const c_end = new Date(end);
      if(c_start > c_end){
        alert('Enter valid job dates');
        return;
      }
    }
   
    else if(currentStep === 3){
      for (const detail of formData.training_details) {
        const startDate = new Date(detail.start);
        const endDate = new Date(detail.end);
        if (isNaN(startDate) && isNaN(endDate)) continue;    
        if (isNaN(startDate) || isNaN(endDate)) {
            alert("Please enter valid dates.");
            return false;
        }
    
        if (endDate < startDate) {
            alert("Please enter valid training info. Start date cannot be after end date.");
            return false;
        }
    }  
    }
    else if(currentStep === 4){
      const {start,end}= formData.certification
      const startDate = new Date(start);
      const endDate = new Date(end);
      if(endDate < startDate){
        alert('Enter valid Certification start and end dates');
        return false;
      }
    }
   else if(currentStep === 6){
    let issued;
    let { issue_date, expiry_date, review_date } = formData.passport_details || {};

    let x = issue_date ? new Date(issue_date) : null;
    let y = expiry_date ? new Date(expiry_date) : null;
    let z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid passport issue, expiry, and review dates!');
      return false;
    }
    
    ({ issue_date, expiry_date, review_date } = formData.visa || {});
    
    x = issue_date ? new Date(issue_date) : null;
    y = expiry_date ? new Date(expiry_date) : null;
    z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid visa issue, expiry, and review dates!');
      return false;
    }
    
    ({ issued, expiry_date, review_date } = formData.esus || {});
    
    x = issued ? new Date(issued) : null;
    y = expiry_date ? new Date(expiry_date) : null;
    z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid ESUS issue, expiry, and review dates!');
      return false;
    }
    
    ({ issued, expiry_date, review_date } = formData.dbs || {});
    
    x = issued ? new Date(issued) : null;
    y = expiry_date ? new Date(expiry_date) : null;
    z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid DBS issue, expiry, and review dates!');
      return false;
    }
    
    ({ issued, expiry_date, review_date } = formData.national || {});
    
    x = issued ? new Date(issued) : null;
    y = expiry_date ? new Date(expiry_date) : null;
    z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid National data issue, expiry, and review dates!');
      return false;
    }
    
    ({ issued, expiry_date, review_date } = formData.other_details || {});
    
    x = issued ? new Date(issued) : null;
    y = expiry_date ? new Date(expiry_date) : null;
    z = review_date ? new Date(review_date) : null;
    
    if ((x && y && y < x) || (x && z && z < x)) {
      alert('Enter valid other details issue, expiry, and review dates!');
      return false;
    }
    
    }

    
    return true;
  };
  
  const handleOtherDetailsChange = (index, field, value) => {
    const otherDetails = [...formData.other_details];
    otherDetails[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      other_details: otherDetails,
    }));
  };

  const addOtherDetails = () => {
    setFormData((prevState) => ({
      ...prevState,
      other_details: [
        ...prevState.other_details,
        {
          name: "",
          reference: "",
          nationality: "",
          issued: "",
          expiry: "",
          review_date: "",
          document: null,
          current: false,
          remarks: "",
        },
      ],
    }));
  };

  const removeOtherDetails = (index) => {
    const updatedDetails = formData.other_details.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      other_details: updatedDetails,
    }));
  };

  const currentSections = formSections.filter(
    (section) => section.page === currentPage
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
    
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-personal-details/${companyData[0].id}.${employee_code}`,formData.personal_details);

        const serviceDetailsFormData = new FormData();
        for (const key in formData.service_details) {
          if (formData.service_details[key]) {
            if (key === "profile_pic" && formData.service_details[key]) {
                serviceDetailsFormData.append("profile_pic", formData.service_details.profile_pic);
            } else {
              serviceDetailsFormData.append(key, formData.service_details[key]);
            }
          }
        }

        // const emplo_type = employeeTypes.find((ele) => ele['Employment Type'] === formData.service_details.type);
        // if(!emplo_type){
        //   alert ('An error occured while processing employement type');
        //   return;
        // }
        // serviceDetailsFormData.set('employment_type_id', emplo_type.id);
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-service-details/${companyData[0].id}.${employee_code}`, serviceDetailsFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
      });

      const today  = new Date();
      setFormData(prev => ({
        ...prev,
        leave_allocation: {
          ...prev.leave_allocation,
          year: today.getFullYear(),
          maternity_leave: prev.leave_allocation.maternity_leave || 0,
        }
      }));      
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-leave-allocation/${employee_code}`,formData.leave_allocation);
    
      for (const edu of formData.education_details) {
        const educationFormData = new FormData();
        console.log(formData.education_details)
        for (const key in edu) {
          if (edu[key]) {
            if (key === "transcript_document" || key === "certificate_document") {
              educationFormData.append(key, edu[key]);
            } else {
              educationFormData.append(key, edu[key]);
            }
            console.log('Appended ',key, ' to education data')
          }
        }
        
        educationFormData.append(
          "isDefault",
          String(formData.education_details.length === 1) // ✅ ensure it's a string
        );
      
        // console.log('sending request for ' ,educationFormData)
        await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/api/submit-education-details/${companyData[0].id}.${employee_code}`,
          educationFormData
          // ✅ No need for headers, let Axios auto-set them
        );
      }
      
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-job-details/${companyData[0].id}.${employee_code}`,formData.job_details);

      formData.key_responsibilities.forEach(async (res, index) => {
        res.isDefault = formData.key_responsibilities.length === 1;
        await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/api/submit-key-responsibilities/${companyData[0].id}.${employee_code}`,
          res
        );
      });

      formData.training_details.forEach(async(training, index) => {
        const tt = training.employee_code ? training : {...training,employee_code :employee_code,isDefault : formData.training_details.length === 1}

        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-training-data/${companyData[0].id}.${employee_code}`,tt)
      });

      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-kin-details/${companyData[0].id}.${employee_code}`, formData.kin_details);
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-certifications/${companyData[0].id}.${employee_code}`, formData.certification)

        const contact_data = new FormData();
        for (const key in formData.contact_info) {
          if (formData.contact_info[key]) {
            contact_data.append(key, formData.contact_info[key]);
            }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-contact/${companyData[0].id}.${employee_code}`, contact_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-pay-details/${companyData[0].id}.${employee_code}`, formData.pay_details)
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-pay-structure/${companyData[0].id}.${employee_code}`, formData.pay_structure)

        formData.other_details.forEach(async (other, index) => {
          const otherData = new FormData();
          for (const key in other) {
            if (other[key]) {
              if (key === "document") {
                if (other[key]) {
                  otherData.append(key, other[key]);
                }
              } else {
                otherData.append(key, other[key]);
              }
            }
          }
          otherData.append('isDefault', formData.other_details.length === 1);

          await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-other-data/${companyData[0].id}.${employee_code}`, otherData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        });

        const national_data = new FormData();
        for (const key in formData.national) {
          if (formData.national[key]) {
            if ( (key === "document") && formData.national[key]) {
              national_data.append(key, formData.national[key]);
            } else {
              national_data.append(key, formData.national[key]);
            }
          }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-national/${companyData[0].id}.${employee_code}`, national_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

        const dbs_data = new FormData();
        for (const key in formData.dbs) {
          if (formData.dbs[key]) {
            if ( (key === "document") && formData.dbs[key]) {
              dbs_data.append(key, formData.dbs[key]);
            } else {
              dbs_data.append(key, formData.dbs[key]);
            }
          }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-dbs/${companyData[0].id}.${employee_code}`, dbs_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

        const esus_data = new FormData();
        for (const key in formData.esus) {
          if (formData.esus[key]) {
            if ( (key === "document") && formData.esus[key]) {
              esus_data.append(key, formData.esus[key]);
            } else {
              esus_data.append(key, formData.esus[key]);
            }
          }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-esus/${companyData[0].id}.${employee_code}`, esus_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

        const visa_data = new FormData();
        for (const key in formData.visa) {
          if (formData.visa[key]) {
            if ( (key === "front" || key === "back") && formData.visa[key]) {
              visa_data.append(key, formData.visa[key]);
            } else {
              visa_data.append(key, formData.visa[key]);
            }
          }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-visa/${companyData[0].id}.${employee_code}`, visa_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

        const passport_data = new FormData();
        for (const key in formData.passport_details) {
          if (formData.passport_details[key]) {
            if (key === "picture" && formData.passport_details[key]) {
              passport_data.append(key, formData.passport_details[key]);
            } else {
              passport_data.append(key, formData.passport_details[key]);
            }
          }
        }
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-passport/${companyData[0].id}.${employee_code}`, passport_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

        formData.other_documents.forEach(async (docc, index) => {
          const other_doc = new FormData();
          for (const key in docc) {
            if (docc[key]) {
              if (key === "doc") {
                if (docc[key]) {
                  other_doc.append(key, docc[key]);
                }
              } else {
                other_doc.append(key, docc[key]);
              }
            }
          }
          other_doc.append('isDefault',formData.other_documents.length === 1)
          await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/submit-otherdocument/${companyData[0].id}.${employee_code}`, other_doc, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        });
    toast.success( id? 'Employee Updated' : 'Employee Created Successfully');
    navigate("/hrms/employees");

    } catch (error) {
       toast.error(error.response?.data?.message || 'An error occured ' + error );
    }
    finally{
      setIsSubmitting(false);
    }
  };

  const handleEducationChange = (e, index) => {
    const { name, value, type, files } = e.target;
    const [section, field] = name.split(".");

    if (type === "file") {
      setFormData((prev) => {
        const updatedEducationDetails = [...prev.education_details];
        updatedEducationDetails[index][field] = files[0];
        return {
          ...prev,
          education_details: updatedEducationDetails,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        education_details: prev.education_details.map((item, idx) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      }));
    }
  };

  const handleAddEducationDetail = (e) => {
e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      education_details: [
        ...prevState.education_details,
        {
          sl_no: "",
        qualification: "",
        subject: "",
        institution_name: "",
        awarding_body: "",
        year_of_passing: "",
        percentage: "",
        grade_division: "",
        transcript_document: null,
        certificate_document: null,
        },
      ],
    }));
  };

  const handleRemoveEducationDetail = (index) => {
    setFormData((prev) => ({
      ...prev,
      education_details: prev.education_details.filter((_, i) => i !== index),
    }));
  };

  // const { isSideBarOpen } = useSidebarContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-10 px-2">
      <p className="text-[14px] text-gray-600 max-w-4xl mx-auto mb-2">
        <Link to="/hrms/employeeDashboard" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/hrms/employees" className="hover:underline">Employee</Link>
        {!id ? <span className="mx-2 text-gray-400">/ Add New Employee</span>
        :<span className="mx-2 text-gray-400"> / Update Employee/ {id}</span> }
      </p>
      <div className="mt-4 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border-t-8 border-yellow-600 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
            <i className="fas fa-user text-2xl text-yellow-900"></i>
          </div>
          {!id ? <h1 className="text-yellow-900 text-2xl font-bold tracking-tight">Add New Employee</h1>
          :  <h1 className="text-yellow-900 text-2xl font-bold tracking-tight">Update Employee Data</h1>}
        </div>
        <hr className="mb-6 border-t-2 border-yellow-100" />
  
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
          </div>
        ) : (
          <form className="space-y-12" onSubmit={handleSubmit}>
            {currentSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-6 bg-yellow-600 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-yellow-900 tracking-wide">{section.title}</h2>
                </div>
                <hr className="mb-6 border-t-2 border-yellow-100" />
                <div className={`${section.title !== "Educational Details" && section.title !== "Training Details" && section.title !== "Other Documents" && section.title !== "Other Details" && section.title !== "Pay Structure" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : undefined}`}>
                  {section.title === "Educational Details" ? (
                    <div className="w-full overflow-x-auto">
                      <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                          <tr>
                            {[
                              "Sl No",
                              "Qualification",
                              "Subject",
                              "Institution Name",
                              "Awarding Body",
                              "Year of Passing",
                              "Percentage",
                              "Grade/Division",
                              "Transcript Document",
                              "Certificate Document",
                              "Actions",
                            ].map((label, index) => (
                              <th
                                key={index}
                                className="border px-4 py-2 text-sm text-left whitespace-nowrap"
                              >
                                {label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {formData.education_details.map(
                            (education, index) => (
                              <tr key={index} className="bg-white">
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.sl_no}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                     name="education_details.sl_no"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.qualification}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.qualification"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.subject}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.subject"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.institution_name}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.institution_name"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.awarding_body}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.awarding_body"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.year_of_passing}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.year_of_passing"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.percentage}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.percentage"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <input
                                    type="text"
                                    className="w-full p-1 border rounded"
                                    value={education.grade_division}
                                    onChange={(e) =>
                                      handleEducationChange(e, index)
                                    }
                                    name="education.grade_division"
                                  />
                                </td>
                                <td className="border px-4 py-2">
                                  <div className="flex space-x-4">
                                    <input
                                      type="file"
                                      className="w-full p-1 border rounded"
                                      onChange={(e) =>
                                        handleEducationChange(e, index)
                                      }
                                      name="education.transcript_document"
                                    />
                                    {typeof education.transcript_document === 'string' &&
 education.transcript_document.startsWith(import.meta.env.VITE_API_URL) && (
                                      <a
                                        href={education.transcript_document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 text-sm"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="border px-4 py-2">
                                  <div className="flex space-x-4">
                                    <input
                                      type="file"
                                      className="w-full p-1 border rounded"
                                      onChange={(e) =>
                                        handleEducationChange(e, index)
                                      }
                                      name="education.certificate_document"
                                    />
                                    {typeof education.certificate_document === 'string' &&
 education.certificate_document.startsWith(import.meta.env.VITE_API_URL) && (
                                      <a
                                        href={education.certificate_document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 text-sm"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="border px-4 py-2">
                                  <button
                                    onClick={() =>
                                      handleRemoveEducationDetail(index)
                                    }
                                    type = "button"

                                    className="px-3 bg-red-300 text-white rounded"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <button
                        onClick={handleAddEducationDetail}
                        type = "button"
                        className="mt-4 px-4 py-2 bg-green-300 text-white rounded"
                      >
                        Add More Education Details
                      </button>
                    </div>
                  ) : section.title === "Pay Structure" ? (
                    <div className="max-w-4xl mx-auto p-4">
                      <div>
                        <div className="bg-yellow-600 text-white text-lg font-semibold px-4 py-2">
                          Payment (Taxable)
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                          {Object.entries(formData.pay_structure.payments).map(
                            ([key, value]) => (
                              <label
                                key={key}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() =>
                                    handleStructureChange("payments", key)
                                  }
                                  className="w-4 h-4"
                                />
                                <span className="text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bg-yellow-600 text-white text-lg font-semibold px-4 py-2">
                          Deduction
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                          {Object.entries(
                            formData.pay_structure.deductions
                          ).map(([key, value]) => (
                            <label
                              key={key}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() =>
                                  handleStructureChange("deductions", key)
                                }
                                className="w-4 h-4"
                              />
                              <span className="text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : section.title === "Training Details" ? (
                    <div className="space-y-4">
                      {formData.training_details.map((training, index) => (
                        <div
                          key={index}
                          className="space-y-2 border p-4 rounded"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label
                                htmlFor={training.title}
                                className="block text-[12px] text-gray-700"
                              >
                                Training Title
                              </label>
                              <input
                                type="text"
                                value={training.title}
                                onChange={(e) =>
                                  handleTrainingChange(
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={training.start}
                                className="block text-[12px] text-gray-700"
                              >
                                Start date
                              </label>

                              <input
                                type="date"
                                value={training.start}
                                onChange={(e) =>
                                  handleTrainingChange(
                                    index,
                                    "start",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor={training.end}
                                className="block text-[12px] text-gray-700"
                              >
                                End date
                              </label>
                              <input
                                type="date"
                                value={training.end}
                                onChange={(e) =>
                                  handleTrainingChange(
                                    index,
                                    "end",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor={training.description}
                                className="block text-[12px] text-gray-700"
                              >
                                Training Description
                              </label>

                              <textarea
                                type="text"
                                value={training.description}
                                onChange={(e) =>
                                  handleTrainingChange(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            {formData.training_details.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTraining(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addTraining}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add Training
                      </button>
                    </div>
                  ) : section.title === "Other Details" ? (
                    <div className="space-y-4">
                      {formData.other_details.map((detail, index) => (
                        <div
                          key={index}
                          className="space-y-2 border p-4 rounded"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label
                                htmlFor={`name-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Document Name
                              </label>
                              <input
                                type="text"
                                value={detail.name}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`reference-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Reference
                              </label>
                              <input
                                type="text"
                                value={detail.reference}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "reference",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`nationality-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Nationality
                              </label>
                              <input
                                type="text"
                                value={detail.nationality}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "nationality",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`issued-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Issued Date
                              </label>
                              <input
                                type="date"
                                value={detail.issued}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "issued",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`expiry-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Expiry Date
                              </label>
                              <input
                                type="date"
                                value={detail.expiry}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "expiry",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`review_date-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Review Date
                              </label>
                              <input
                                type="date"
                                value={detail.review_date}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "review_date",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={`document-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Upload Document
                              </label>
                              <div className="flex space-x-4"> 
                                  <input
                                type="file"
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "document",
                                    e.target.files[0]
                                  )
                                }
                                className="p-2 border rounded w-full"
                              />
                               {typeof detail.document === 'string' &&
 detail.document.startsWith(import.meta.env.VITE_API_URL) && (
                                      <a
                                        href={detail.document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 text-sm"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                )}
                              </div>
                            
                            </div>

                            <div className="space-y-2 flex items-center">
                              <input
                                type="checkbox"
                                checked={detail.current}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "current",
                                    e.target.checked
                                  )
                                }
                                className="mr-2"
                              />
                              <label
                                htmlFor={`current-${index}`}
                                className="text-[12px] text-gray-700"
                              >
                                Is this your current status?
                              </label>
                            </div>

                            <div className="space-y-2 col-span-full">
                              <label
                                htmlFor={`remarks-${index}`}
                                className="block text-[12px] text-gray-700"
                              >
                                Remarks
                              </label>
                              <textarea
                                value={detail.remarks}
                                onChange={(e) =>
                                  handleOtherDetailsChange(
                                    index,
                                    "remarks",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded w-full"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end mt-2">
                            {formData.other_details.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeOtherDetails(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addOtherDetails}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add Detail
                      </button>
                    </div>
                  ) : section.title === "Other Documents" ? (
                    <div className="space-y-4">
                      {formData.other_documents.map((document, index) => (
                        <div
                          key={index}
                          className="space-y-2 border p-4 rounded"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label
                                htmlFor={document.type}
                                className="block text-[12px] text-gray-700"
                              >
                                Type of Document
                              </label>
                              <input
                                type="text"
                                value={document.type}
                                onChange={(e) =>
                                  handleOtherDocumentChange(
                                    index,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor={document.doc}
                                className="block text-[12px] text-gray-700"
                              >
                                Upload Document
                              </label>
                            <div className="flex space-x-4"> 

                               <input
                                type="file"
                                onChange={(e) =>
                                  handleOtherDocumentChange(
                                    index,
                                    "doc",
                                    e.target.files[0]
                                  )
                                }
                                className="p-2 border rounded"
                              />
                                 {typeof document.doc === 'string' &&
 document.doc.startsWith(import.meta.env.VITE_API_URL) && (
                                      <a
                                        href={document.doc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 text-sm"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                )}
                            </div>
                             
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            {formData.other_documents.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeOtherDocument(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addOtherDocument}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add Document
                      </button>
                    </div>
                  ) : section.title === "Key Responsibilities" ? (
                    <div className="space-y-4">
                      {formData.key_responsibilities.map((resp, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <input
                            type="text"
                            value={resp.responsibility}
                            onChange={(e) =>
                              handleResponsibilityChange(index, e.target.value)
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter responsibility"
                          />
                          {formData.key_responsibilities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeResponsibility(index)}
                              className="bg-red-500 text-white p-2 rounded"
                            >
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addResponsibility}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        Add Responsibility
                      </button>
                    </div>
                  ) : (
                    section.fields.map((field, fieldIndex) => {
                      const fieldValue =
                        formData[field.value.split(".")[0]][
                          field.value.split(".")[1]
                        ];
                       { field.type === 'file' }
                      return (
                        <div key={fieldIndex} className="space-y-2">
                          <label
                            htmlFor={field.value}
                            className="block text-[12px] text-gray-700"
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-600 text-[14px]">
                                *
                              </span>
                            )}
                          </label>
                          {field.type === "select" ? (
                            <select
                              id={field.value}
                              name={field.value}
                              className="w-full px-3 py-2 border rounded-md text-sm focus:border-yellow-200 focus:border-b-4 hover:border-yellow-200 hover:border-b-4"
                              required={field.required}
                              onChange={handleChange}
                              value={fieldValue || ""}
                            >
                              <option></option>
                              {field.options?.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "textarea" ? (
                            <textarea
                              type={field.type}
                              id={field.value}
                              name={field.value}
                              onChange={handleChange}
                              value={fieldValue || ""}
                              className="w-full px-3 py-2 border rounded-md text-sm focus:border-yellow-200 focus:border-b-4 hover:border-yellow-200 hover:border-b-4"
                              required={field.required}
                              readOnly={field.readOnly}
                            />
                          ) : field.type === "radio" ? (
                            <div className="flex space-x-4 items-center">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={field.value}
                                  value="Yes"
                                  onChange={handleChange}
                                  checked={fieldValue === true}
                                  className="mr-2"
                                />
                                Yes
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={field.value}
                                  value="No"
                                  onChange={handleChange}
                                  checked={fieldValue === false}
                                  className="mr-2"
                                />
                                No
                              </label>
                            </div>
                          ) : (
                            <div className="flex space-x-4"> 
                             <input
                              type={field.type}
                              id={field.value}
                              name={field.value}
                              onChange={handleChange}
                              value={
                                field.type !== "file"
                                  ? fieldValue || ""
                                  : undefined
                              }
                              className={`w-full px-3 py-2 border ${
                                field.readOnly ? "bg-gray-200" : undefined
                              } rounded-md text-sm focus:border-yellow-200 focus:border-b-4 hover:border-yellow-200 hover:border-b-4`}
                              required={field.required}
                              readOnly={field.readOnly}
                            />
                               {field.type === 'file' && typeof fieldValue === 'string' &&
 fieldValue.startsWith(import.meta.env.VITE_API_URL) && (
                                      <a
                                        href={fieldValue}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 text-sm"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                )}
                            </div>
                           
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </form>
        )}
        <p className="flex justify-end font-semibold text-red-500 mb-2 ">
          (*) marked fields are mandatory fields
        </p>
        <div className={`flex ${currentPage > 1 ? "justify-between" : "justify-end"} items-center mb-2 mr-2 ml-2`}>
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-700 transition-colors"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          )}
          {currentPage < 8 ? (
            <button
              className="px-4 py-2 text-white bg-yellow-800 rounded hover:bg-yellow-700 transition-colors"
              onClick={() => {
                if(!validatePage(currentPage)) return;  
                setCurrentPage(currentPage + 1)
              }}
            >
              Next
            </button>
          ) : (
            <button
               className={`px-4 py-2 rounded text-white flex items-center gap-2 ${isSubmit ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 transition-colors"}`}
               onClick={() => {
                 if (!isSubmit) {
                   handleSubmit();
                  }
                 }}
              disabled={isSubmit}
            >
               {isSubmit && (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                 </svg>
               )}
               {isSubmit ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
