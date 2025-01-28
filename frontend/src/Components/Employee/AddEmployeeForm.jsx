import { useState } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";

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

const EmployeeForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { departmentData, designationData, employeeTypes, authorizingDetails } =
    useCompanyContext();

  const [formData, setFormData] = useState({
    personal_details: {
      employee_code: "",
      fname: "",
      mname: "",
      lname: "",
      Gender: "Male",
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
      profile_pic : null,
    },
    education_details: {
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
      add: "",
    },
    job_details: {
      title: "",
      start: "",
      end: "",
      experience: 0,
      description: "",
    },
    key_responsibilities: [{ res: "" }],
    training_details: [{ title: "", start: "", end: "", description: "" }],
    kin_details : {
      name: '',relation :'',email :'',contact_no :'',address: ''
    },
    certification : {title :'',start : '',end: '',license: ''},
    contact_info : {post_code: '',address : '',line1 : '',line2 : '',line3: '',city: '',country :'',proof: null},
    passport_details : {passport_no :0,nationality : '',place:'',issued_by:'',issue_date:'',expiry_date:'',review_date: '',picture:null,current: true,remarks:''},
    visa : {visa_no :0,nationality : '',country:'',issued_by:'',issue_date:'',expiry_date:'',review_date: '',front:null,back:null,current: true,remarks:''}
            
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const section = name.split(".")[0];
    console.log("form data ", formData);
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

  const formSections = [
    {
      page: 1,
      title: "Personal Details",
      fields: [{  label: "Employee Code", value: "personal_details.employee_code", type: "text",  required: true,  readOnly: true,},
        {label: "First Name",value: "personal_details.fname",type: "text", required: true,  },
        {label: "Middle Name", value: "personal_details.mname",type: "text",required: true,  },
        {label: "Last Name", value: "personal_details.lname", type: "text", required: true,  },
        {label: "Gender", value: "personal_details.Gender", type: "select", required: false,    options: ["Male", "Female"], },
        {label: "NI No.",value: "personal_details.nationality_no",   type: "text",   required: false,  },
        {label: "Date of Birth",value: "personal_details.dob",  type: "date",required: false   },
        {label: "Select Nationality",    value: "personal_details.nationality",type: "select",required: false,options: nationalityOptions,    },
        {label: "Email",  value: "personal_details.email", type: "email", required: true, },
        { label: "Contact Number",value: "personal_details.contact_1",type: "text",  required: true, },
        {label: "Alternative Number",value: "personal_details.contact_2", type: "text", required: false,},
      ],
    },
    {
      page: 1,
      title: "Service Details",
      fields: [
        { label: "Department", value: "service_details.department", type: "select", required: false, options: [] },
        { label: "Designation", value: "service_details.designation", type: "select", required: false, options: [] },
        { label: "Date of Joining", value: "service_details.joining", type: "date", required: false },
        { label: "Employment Type", value: "service_details.type", type: "select", required: false, options: [] },
        { label: "Date of Confirmation", value: "service_details.confirmation", type: "date", required: false },
        { label: "Contract Start Date", value: "service_details.start", type: "date", required: false },
        { label: "Contract End Date (If Applicable)", value: "service_details.end_if", type: "date", required: false },
        { label: "Job Location", value: "service_details.location", type: "text", required: false },
        { label: "Profile Picture", value: "service_details.profile_picture", type: "file", required: false },
        { label: "Reporting Authority", value: "service_details.reportingauth", type: "select", required: false, options: [] },
        { label: "Leave Sanction Authority", value: "service_details.leaveauth", type: "select", required: false, options: [] },
      ]      
    },
    {
      page: 2,
      title: "Educational Details",
      fields: [
        { label: "Sl. No.", type: 'text', value: "education_details.sl_no" },
        { label: "Qualification", type: 'text', value: "education_details.qualification" },
        { label: "Subject", type: 'text', value: "education_details.subject" },
        { label: "Institution Name", type: 'text', value: "education_details.institution_name" },
        { label: "Awarding Body/University", type: 'text', value: "education_details.awarding_body" },
        { label: "Year of Passing", type: 'text', value: "education_details.year_of_passing" },
        { label: "Percentage", type: 'text', value: "education_details.percentage" },
        { label: "Grade/Division", type: 'text', value: "education_details.grade_division" },
        { label: "Transcript Document", type: 'file', value: "education_details.transcript_document" },
        { label: "Certificate Document", type: 'file', value: "education_details.certificate_document" },
        { label: 'Add', type: '', value: "education_details.add" }
      ]
    },    
    {
      page: 2,
      title: "Job Details",
      fields: [{ label: "Job Title", type: 'text', value: "job_details.title" },
        { label: "Start Date", type: 'date', value: "job_details.start" },
        { label: "End Date", type: 'text', value: "job_details.end" },
        { label: "Year of Experience", type: 'text', value: "job_details.experience" },
        { label: "Job Description", type: 'textarea', value: "job_details.description" }],
    },
    {
      page: 2,
      title: "Key Responsibilities",
      fields: [{label : 'Responsibility Name',type : 'text' ,value : "key_responsibilities.res"}],
    },
    {
      page: 3,
      title: "Training Details",
      fields: [],
    },
    {
      page: 4,
      title: "Emergency / Next of Kin Contact Details",
      fields: [{label : 'Name',type : 'text',value : "kin_details.name"},
        {label : 'Relationship',type : 'select',value : "kin_details.relation",options :['Father','Mother','Wifi','Relative','Husband','Partner','Son','Daughter','Friend','Others']},
        {label : 'Email',type : 'email',value : "kin_details.email"},
        {label : 'Emergency Contact No.',type : 'text',value : "kin_details.contact_no"},
        {label : 'Address',type : 'text',value : "kin_details.address"},

      ],
    },
    {
      page: 4,
      title: "Certified Membership",
      fields: [{label : 'Title of Certified License',type : 'text',value : "certification.title"},
        {label : 'License Number',type : 'text',value : "certification.number"},
        {label :'Start Date',type : 'date',value : "certification.start"},
        {label : 'End Date',type : 'date',value : "certification.end"},
      ],
    },
    {
      page: 5,
      title: "Contact Information (Correspondence Address)",
      fields: [
        {label : 'Post Code',type : 'text',value : "contact_info.post_code"},
        {label : 'Select Addres',type : 'select',value : "contact_info.address",options :[]},
        {label : 'Address Line 1',type : 'text',value : "contact_info.line1"},
        {label : 'Address Line 2',type : 'text',value : "contact_info.line2"},
        {label : 'Address Line 3',type : 'text',value : "contact_info.line3"},
        {label : 'City/County',type : 'text',value : "contact_info.city"},
        {label : 'Country',type : 'select',value : "contact_info.country" ,options :nationalityOptions},
        {label : 'Proof Of Address',type :'file',value : "contact_info.proof"}
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
        {label : 'Passport No.',type : 'text',value : "passport_details.passport_no"},
        {label : 'Nationality',type : 'select',value : "passport_details.nationality",options :nationalityOptions},
        {label : 'Place of Birth',type : 'text',value : "passport_details.place"},
        {label : 'Issued by',type : 'text',value : "passport_details.issued_by"},
        {label : 'Issue date',type : 'date',value : "passport_details.issue_date"},
        {label : 'Expirty date',type : 'date',value : "passport_details.expiry_date"},
        {label : 'Review Date',type : 'date',value : "passport_details.review_date",readOnly : true},
        {label : 'Picture',type :'file',value : "passport_details.picture"},
        {label : 'Is this your current passport?',type :'radio',value : "passport_details.current"},
        {label : 'Remarks',type :'text',value : "passport_details.remarks"}],    
    },
    {
      page: 6,
      title: "Visa/BRP Details",
        fields: [
          {label : 'Visa/BRP No.',type : 'text',value : "visa.passport_no"},
          {label : 'Nationality',type : 'select',value : "visa.nationality",options :nationalityOptions},
          {label : 'Country of Residence',type : 'select',value : "visa.country",options :nationalityOptions},
          {label : 'Issued by',type : 'text',value : "visa.issued_by"},
          {label : 'Issued date',type : 'date',value : "visa.issue_date"},
          {label : 'Expirty date',type : 'date',value : "visa.expiry_date"},
          {label : 'Eligible Review Date',type : 'date',value : "visa.review_date",readOnly : true},
          {label : 'Upload Front Side Picture',type :'file',value : "visa.picture"},
          {label : 'Upload Back Side Picture',type :'file',value : "visa.back"},
          {label : 'Is this your current visa?',type :'radio',value : "visa.current"},
          {label : 'Remarks',type :'text',value : "visa.remarks"}
  
        ],
      },
    {
      page: 6,
      title: "EUSS/Time limit details",
      fields: [],
    },
    {
      page: 6,
      title: "Disclosure and Barring Service (DBS) details",
      fields: [],
    },
    {
      page: 6,
      title: "National Id details",
      fields: [],
    },
    {
      page: 6,
      title: "Other Details",
      fields: [],
    },
    {
      page: 7,
      title: "Pay Details",
      fields: [],
    },
    {
      page: 8,
      title: "Pay Structure",
      fields: [],
    },
  ];
  

  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...formData.key_responsibilities];
    updatedResponsibilities[index] = { res: value };
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
        { title: "", start: "", end: "", description: "" },
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
    updatedTraining[index][field] = value; // Update the correct field
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

  const currentSections = formSections.filter(
    (section) => section.page === currentPage
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data: ", formData);
  };

  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Add New Employee</span>
      </p>
      <div className="mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">
            Add New Employee
          </h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />

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
                  section.title !== "Training Details"
                    ? "grid grid-cols-1 md:grid-cols-3 gap-4"
                    : undefined
                }`}
              >
                {section.title === "Educational Details" ? (
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <thead className="bg-gray-200 text-gray-700">
                        <tr>
                          {section.fields.map((field, index) => (
                            <th
                              key={index}
                              className="border px-4 py-2 text-sm text-left whitespace-nowrap"
                            >
                              {field.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          {section.fields.map((field, index) => {
                            const fieldValue =
                              formData[field.value.split(".")[0]][
                                field.value.split(".")[1]
                              ];
                            return (
                              <td className="border px-4 py-2">
                                {field.type === "" ? (
                                  <button className="px-3 bg-green-300 text-center">
                                    <i className="text-white fas fa-plus"></i>
                                  </button>
                                ) : (
                                  <input
                                    type={field.type}
                                    className="w-full p-1 border rounded"
                                    onChange={handleChange}
                                    value={field.type !== 'file' ? fieldValue || "" : undefined}
                                    name={field.value}
                                  />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : section.title === "Training Details" ? (
                  <div className="space-y-4">
                    {formData.training_details.map((training, index) => (
                      <div key={index} className="space-y-2 border p-4 rounded">
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
                ) : section.title === "Key Responsibilities" ? (
                  <div className="space-y-4">
                    {formData.key_responsibilities.map((resp, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <input
                          type="text"
                          value={resp.res}
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
                    return (
                      <div key={fieldIndex} className="space-y-2">
                        <label
                          htmlFor={field.value}
                          className="block text-[12px] text-gray-700"
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-600 text-[14px]">*</span>
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
                          <input
                            type={field.type}
                            id={field.value}
                            name={field.value}
                            onChange={handleChange}
                            value= {field.type !== 'file' ? fieldValue || "" : undefined}
                            className={`w-full px-3 py-2 border ${field.readOnly ? "bg-gray-200" : undefined} rounded-md text-sm focus:border-blue-200 focus:border-b-4 hover:border-blue-200 hover:border-b-4`}
                            required={field.required}
                            readOnly={field.readOnly}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </form>
        <p className="flex justify-end font-semibold text-red-500 mb-2 ">(*) marked fields are mandatory fields</p>
        <div className={`flex ${currentPage > 1 ? "justify-between" : "justify-end"} items-center mb-2 mr-2 ml-2`}>
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-blue-800 text-white rounded"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          )}
          {currentPage < formSections.length ? (
            <button
              className="px-4 py-2 text-white bg-blue-800 rounded"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-green-300 rounded"
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
