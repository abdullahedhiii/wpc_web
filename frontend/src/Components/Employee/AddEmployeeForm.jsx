import { useEffect, useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";
import { useParams } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext";

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
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    companyData,
    departmentData,
    annualPays,
    designationData,
    employeeTypes,
    authorizingDetails,
    payGroups,
    paymentTypes,
    taxMasters,
    orgBanks,
  } = useCompanyContext();
  const [employee_code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetch_next_id = async () => {
      try {
        const response = await axiosInstance.get("/api/getNextEmployeeCode");
        setCode(response.data);
      } catch (err) {
        console.error("Error fetching employee code:", err);
      }
    };
    if (!id && employee_code === "") {
    }
    fetch_next_id();
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
      reportingauth: "",
      leaveauth: "",
      profile_pic: null,
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
    passport_details: {
      passport_no: "",
      nationality: "",
      place: "",
      issued_by: "",
      issue_date: "",
      expiry_date: "",
      review_date: "",
      picture: null,
      current: true,
      remarks: "",
    },
    visa: {
      visa_no: 0,
      nationality: "",
      country: "",
      issued_by: "",
      issue_date: "",
      expiry_date: "",
      review_date: "",
      front: null,
      back: null,
      current: true,
      remarks: "",
    },
    esus: {
      refernece: 0,
      nationality: "",
      issued: "",
      expiry: "",
      review_date: "",
      remarks: "",
      document: null,
      current: false,
    },
    dbs: {
      type: "",
      reference: 0,
      nationality: "",
      issued: "",
      expiry: "",
      review_date: "",
      remarks: "",
      document: null,
      current: false,
    },
    national: {
      national_id: "",
      nationality: "",
      country: "",
      issued: "",
      expiry: "",
      review_date: "",
      remarks: "",
      document: null,
      current: false,
    },
    other_details: [
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
    pay_details: {
      group: "",
      pay: "",
      wedges: "",
      payment_type: "",
      basic_wedges: "",
      min_hours: 0,
      rate: 0,
      tax_code: "",
      tax_reference: "",
      tax_percentage: 0,
      pay_mode: "",
      bank_name: "",
      branch_name: "",
      account_no: "",
      sort_code: "",
      currency: "",
    },
    pay_structure: {
      payments: {
        dearnessAllowance: false,
        houseRentAllowance: false,
        conveyanceAllowance: false,
        performanceAllowance: false,
        monthlyFixedAllowance: false,
      },
      deductions: {
        niDeduction: false,
        incomeTaxDeduction: false,
        incomeTaxCess: false,
        esi: false,
        profTax: false,
      },
    },
  });

  useEffect(() => {
    const fetchFormInfo = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/getEmployeeDetails/${id}`
        );
        setFormData(response.data);
        setCode(response.data.personal_details.employee_code);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching employe data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchFormInfo();
    }
  }, [id]);

  useEffect(() => {
    if (formData.service_details.department) {
      const dept = departmentData.find(
        (ele) => ele["Department Name"] === formData.service_details.department
      );
      if (dept) {
        setFormData((prev) => ({
          ...prev,
          service_details: {
            ...prev.service_details,
            department_id: dept.id,
          },
        }));
      }
    }
  }, [formData.service_details.department]);

  useEffect(() => {
    if (formData.service_details.designation) {
      const desg = designationData.find(
        (ele) => ele["Designation"] === formData.service_details.designation
      );
      if (desg) {
        setFormData((prev) => ({
          ...prev,
          service_details: {
            ...prev.service_details,
            designation_id: desg.id,
          },
        }));
      }
    }
  }, [formData.service_details.designation]);

  const departmentOptions = departmentData.map(
    (department) => department["Department Name"]
  );
  const typeOptions = employeeTypes.map((type) => type["Employment Type"]);
  const payGroupoptions = payGroups.map((group) => group["Pay Group"]);
  const payment_type_options = paymentTypes.map((type) => type["Payment Type"]);
  const tax_options = taxMasters.map((opt) => opt["Tax Code"]);
  const bank_options = orgBanks.map((opt) => opt["Bank Name"]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [filteredPays, setFilteredPays] = useState([]);

  useEffect(() => {
    const filtered = designationData
      .filter(
        (designation) =>
          designation["Department Name"] ===
          formData.service_details?.department
      )
      .map((designation) => designation["Designation"]);

    setFilteredDesignations(filtered);
  }, [formData.service_details.department, designationData]);

  useEffect(() => {
    const filtered = annualPays
      .filter((pay) => pay["Pay Group"] === formData.pay_details.group)
      .map((pp) => pp["Annual Pay"]);

    setFilteredPays(filtered);
  }, [formData.pay_details.group, annualPays]);

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
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name.split(".")[1]]: value,
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
        {
          label: "NI No.",
          value: "personal_details.nationality_no",
          type: "text",
          required: false,
        },
        {
          label: "Date of Birth",
          value: "personal_details.dob",
          type: "date",
          required: false,
        },
        {
          label: "Select Nationality",
          value: "personal_details.nationality",
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
          type: "select",
          required: false,
          options: departmentOptions,
        },
        {
          label: "Designation",
          value: "service_details.designation",
          type: "select",
          required: false,
          options: filteredDesignations,
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
          type: "select",
          required: false,
          options: typeOptions,
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
          required: false,
        },
        {
          label: "Reporting Authority",
          value: "service_details.reportingauth",
          type: "select",
          required: false,
          options: [
            authorizingDetails[0]["Authorizing_fname"] +
              " " +
              authorizingDetails[0]["Authorizing_lname"],
          ],
        },
        {
          label: "Leave Sanction Authority",
          value: "service_details.leaveauth",
          type: "select",
          required: false,
          options: [],
        },
      ],
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
        {
          label: "Select Addres",
          type: "select",
          value: "contact_info.address",
          options: [],
        },
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
        {
          label: "Nationality",
          type: "select",
          value: "passport_details.nationality",
          options: nationalityOptions,
        },
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
          label: "Expirty date",
          type: "date",
          value: "passport_details.expiry_date",
        },
        {
          label: "Review Date",
          type: "date",
          value: "passport_details.review_date",
          readOnly: true,
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
        {
          label: "Nationality",
          type: "select",
          value: "visa.nationality",
          options: nationalityOptions,
        },
        {
          label: "Country of Residence",
          type: "select",
          value: "visa.country",
          options: nationalityOptions,
        },
        { label: "Issued by", type: "text", value: "visa.issued_by" },
        { label: "Issued date", type: "date", value: "visa.issue_date" },
        { label: "Expirty date", type: "date", value: "visa.expiry_date" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "visa.review_date",
          readOnly: true,
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
        {
          label: "Nationality",
          type: "select",
          value: "esus.nationality",
          options: nationalityOptions,
        },
        { label: "Issued Date", type: "date", value: "esus.issued" },
        { label: "Expiry Date", type: "date", value: "esus.expiry" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "esus.review_date",
          readOnly: true,
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
        {
          label: "Nationality",
          type: "select",
          value: "dbs.nationality",
          options: nationalityOptions,
        },
        { label: "Issued Date", type: "date", value: "dbs.issued" },
        { label: "Expiry Date", type: "date", value: "dbs.expiry" },
        {
          label: "Eligible Review Date",
          type: "date",
          value: "dbs.review_date",
          readOnly: true,
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
        {
          label: "Nationality",
          type: "text",
          value: "national.nationality",
          options: nationalityOptions,
        },
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
          readOnly: true,
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
          type: "select",
          value: "pay_details.group",
          options: payGroupoptions,
        },
        {
          label: "Annual Pay",
          type: "select",
          value: "pay_details.pay",
          options: filteredPays,
        },
        {
          label: "Wedges pay mode",
          type: "select",
          value: "pay_details.wedges",
          options: [],
        },
        {
          label: "Payment Type",
          type: "select",
          value: "pay_details.payment_type",
          options: payment_type_options,
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
          type: "select",
          value: "pay_details.tax_code",
          options: tax_options,
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
          type: "select",
          value: "pay_details.pay_mode",
          options: ["Bank", "Cash"],
        },
        {
          label: "Bank Name",
          type: "select",
          value: "pay_details.bank_name",
          options: bank_options,
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
    try {
      //   const personalDetailsFormData = new FormData();
      //   for (const key in formData.personal_details) {
      //     if (formData.personal_details[key]) {
      //         personalDetailsFormData.append(key, formData.personal_details[key]);
      //       }
      //   }
      //   await axiosInstance.post(`/api/submit-personal-details/${companyData[0].id}.${employee_code}`, personalDetailsFormData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

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
        // const department_id = departmentData.find((ele) => ele['Department Name'] === formData.service_details.department).id;
        // const designation_id = designationData.find((ele) => ele['Designation'] === formData.service_details.designation).id;
        const employment_type_id = employeeTypes.find((ele) => ele['Employment Type'] === formData.service_details.type).id;

        // serviceDetailsFormData.append("department_id",department_id);
        // serviceDetailsFormData.append("designation_id",designation_id);
       // serviceDetailsFormData.append("employment_type_id",employment_type_id);

        await axiosInstance.post(`/api/submit-service-details/${companyData[0].id}.${employee_code}`, serviceDetailsFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
      });

      // formData.education_details.forEach(async (edu, index) => {
      //   const educationFormData = new FormData();
      //   for (const key in edu) {
      //     if (edu[key]) {
      //       if (
      //         key === "transcript_document" ||
      //         key === "certificate_document"
      //       ) {
      //         if (edu[key]) {
      //           educationFormData.append(key, edu[key]);
      //         }
      //       } else {
      //         educationFormData.append(key, edu[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(
      //     `/api/submit-education-details/${companyData[0].id}.${employee_code}`,
      //     educationFormData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      // });

      //   const job_details_form_data = new FormData();
      //   for (const key in formData.job_details) {
      //     if (formData.job_details[key]) {
      //       job_details_form_data.append(key, formData.job_details[key]);
      //       }
      //   }
      //   job_details_form_data.append("Company_name", companyData[0]['Organisation Name']);
      //   await axiosInstance.post(`/api/submit-job-details/${companyData[0].id}.${employee_code}`, job_details_form_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      // formData.key_responsibilities.forEach(async (res, index) => {
      //   await axiosInstance.post(
      //     `/api/submit-key-responsibilities/${companyData[0].id}.${employee_code}`,
      //     res
      //   );
      // });

      // formData.training_details.forEach(async(training, index) => {
      //   console.log('sending request 1',employee_code);
      //   const tt = training.employee_code ? training : {...training,employee_code :employee_code}
      //   console.log(tt);
      //   await axiosInstance.post(`/api/submit-training-data/${companyData[0].id}.${employee_code}`,tt)
      // });

      // await axiosInstance.post(`/api/submit-kin-details/${companyData[0].id}.${employee_code}`, formData.kin_details);
      // await axiosInstance.post(`/api/submit-certifications/${companyData[0].id}.${employee_code}`, formData.certification)

      //   const contact_data = new FormData();
      //   for (const key in formData.contact_info) {
      //     if (formData.contact_info[key]) {
      //       contact_data.append(key, formData.contact_info[key]);
      //       }
      //   }
      //   await axiosInstance.post(`/api/submit-contact/${companyData[0].id}.${employee_code}`, contact_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      // await axiosInstance.post(`/api/submit-pay-details/${companyData[0].id}.${employee_code}`, formData.pay_details)

      await axiosInstance.post(`/api/submit-pay-structure/${companyData[0].id}.${employee_code}`, formData.pay_structure)

      //   formData.other_details.forEach(async (other, index) => {
      //     const otherData = new FormData();
      //     for (const key in other) {
      //       if (other[key]) {
      //         if (key === "document") {
      //           if (other[key]) {
      //             otherData.append(key, other[key]);
      //           }
      //         } else {
      //           otherData.append(key, other[key]);
      //         }
      //       }
      //     }

      //     await axiosInstance.post(`/api/submit-other-data/${companyData[0].id}.${employee_code}`, otherData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //   });
      //   });

      //   const national_data = new FormData();
      //   for (const key in formData.national) {
      //     if (formData.national[key]) {
      //       if ( (key === "document") && formData.national[key]) {
      //         national_data.append(key, formData.national[key]);
      //       } else {
      //         national_data.append(key, formData.national[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(`/api/submit-national/${companyData[0].id}.${employee_code}`, national_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      //   const dbs_data = new FormData();
      //   for (const key in formData.dbs) {
      //     if (formData.dbs[key]) {
      //       if ( (key === "document") && formData.dbs[key]) {
      //         dbs_data.append(key, formData.dbs[key]);
      //       } else {
      //         dbs_data.append(key, formData.dbs[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(`/api/submit-dbs/${companyData[0].id}.${employee_code}`, dbs_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      //   const esus_data = new FormData();
      //   for (const key in formData.esus) {
      //     if (formData.esus[key]) {
      //       if ( (key === "document") && formData.esus[key]) {
      //         esus_data.append(key, formData.esus[key]);
      //       } else {
      //         esus_data.append(key, formData.esus[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(`/api/submit-esus/${companyData[0].id}.${employee_code}`, esus_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      //   const visa_data = new FormData();
      //   for (const key in formData.visa) {
      //     if (formData.visa[key]) {
      //       if ( (key === "front" || key === "back") && formData.visa[key]) {
      //         visa_data.append(key, formData.visa[key]);
      //       } else {
      //         visa_data.append(key, formData.visa[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(`/api/submit-visa/${companyData[0].id}.${employee_code}`, visa_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      //   const passport_data = new FormData();
      //   for (const key in formData.passport_details) {
      //     if (formData.passport_details[key]) {
      //       if (key === "picture" && formData.passport_details[key]) {
      //         passport_data.append(key, formData.passport_details[key]);
      //       } else {
      //         passport_data.append(key, formData.passport_details[key]);
      //       }
      //     }
      //   }
      //   await axiosInstance.post(`/api/submit-passport/${companyData[0].id}.${employee_code}`, passport_data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      // });

      //   formData.other_documents.forEach(async (docc, index) => {
      //     const other_doc = new FormData();
      //     for (const key in docc) {
      //       if (docc[key]) {
      //         if (key === "doc") {
      //           if (docc[key]) {
      //             other_doc.append(key, docc[key]);
      //           }
      //         } else {
      //           other_doc.append(key, docc[key]);
      //         }
      //       }
      //     }
      //     await axiosInstance.post(`/api/submit-otherdocument/${companyData[0].id}.${employee_code}`, other_doc, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //   });
      //   });

      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
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

  const handleAddEducationDetail = () => {
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

  const { isSideBarOpen } = useSidebarContext();
  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Add New Employee</span>
      </p>
      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w[1300px]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">
            Add New Employee
          </h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />
        {isLoading ? (
          <p className="text-gray-500">Loading employee data...</p>
        ) : (
          <form className="p-4 space-y-6" onSubmit={handleSubmit}>
            {currentSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-lg font-semibold text-tt mb-2">
                  {section.title}
                </h2>
                <hr className="my-3 border-t-1 border-gray-200" />

                <div
                  className={`${
                    section.title !== "Educational Details" &&
                    section.title !== "Training Details" &&
                    section.title !== "Other Documents" &&
                    section.title !== "Other Details" &&
                    section.title !== "Pay Structure"
                      ? "grid grid-cols-1 md:grid-cols-3 gap-4"
                      : undefined
                  }`}
                >
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
                                    name={`education_details[${index}].sl_no`}
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
                                    name={`education_details[${index}].qualification`}
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
                                    name={`education_details[${index}].subject`}
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
                                    name={`education_details[${index}].institution_name`}
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
                                    name={`education_details[${index}].awarding_body`}
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
                                    name={`education_details[${index}].year_of_passing`}
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
                                    name={`education_details[${index}].percentage`}
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
                                    name={`education_details[${index}].grade_division`}
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
                                      name={`education_details[${index}].transcript_document`}
                                    />
                                    {education.transcript_document && (
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
                                      name={`education_details[${index}].certificate_document`}
                                    />
                                    {education.certificate_document && (
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
                        className="mt-4 px-4 py-2 bg-green-300 text-white rounded"
                      >
                        Add More Education Details
                      </button>
                    </div>
                  ) : section.title === "Pay Structure" ? (
                    <div className="max-w-4xl mx-auto p-4">
                      <div>
                        <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-2">
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
                        <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-2">
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
                               {detail.document && (
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
                                 {document.doc && (
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
                       { field.type === 'file' && console.log(field.value,fieldValue,formData.service_details.profile_pic)}
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
                              className="w-full px-3 py-2 border rounded-md text-sm focus:border-blue-200 focus:border-b-4 hover:border-blue-200 hover:border-b-4"
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
                              className="w-full px-3 py-2 border rounded-md text-sm focus:border-blue-200 focus:border-b-4 hover:border-blue-200 hover:border-b-4"
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
                                  checked={fieldValue === "Yes"}
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
                                  checked={fieldValue === "No"}
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
                              } rounded-md text-sm focus:border-blue-200 focus:border-b-4 hover:border-blue-200 hover:border-b-4`}
                              required={field.required}
                              readOnly={field.readOnly}
                            />
                               {field.type === 'file' && fieldValue &&(
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
        <div
          className={`flex ${
            currentPage > 1 ? "justify-between" : "justify-end"
          } items-center mb-2 mr-2 ml-2`}
        >
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-blue-800 text-white rounded"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          )}
          {currentPage < 8 ? (
            <button
              className="px-4 py-2 text-white bg-blue-800 rounded"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-green-500 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
