import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
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

  const COCForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [employee_codes, setEmployeeCodes] = useState([]);
    const {companyData} = useCompanyContext();
    useEffect(() => {
       const fetchEmployees = async () => {
          try {
             const response = await axiosInstance.get(`/api/getCOCDetails/${companyData[0].id}`);
             console.log('employees response COC ', response.data);
             setEmployees(response.data);
             setEmployeeCodes(response.data.map((emp) => emp.employee.full_name)); // Store in state
          } catch (err) {
             console.log('error fetching COC form data', err);
          } finally {
             setIsLoading(false);
          }
       };
       fetchEmployees();     
    }, []);
 
    const [formData, setFormData] = useState({
       employee: {
          full_name: '', employee_code: '', name: '', fname: '', lname: '', 
          mname: '', title: '', contact_1: '', Nationality: '', nationality_no: ''
       },
       contact_info: { post_code: '', address: '', line1: '', line2: '', line3: '', city: '', country: '', proof: null },
       passport_details: { passport_no: '', nationality: '', place: '', issued_by: '', issue_date: '', expiry_date: '', review_date: '', picture: null, current: true, remarks: '' },
       visa: { visa_no: 0, nationality: '', country: '', issued_by: '', issue_date: '', expiry_date: '', review_date: '', front: null, back: null, current: true, remarks: '' },
       esus: { reference: '', nationality: '', issued: '', expiry: '', review_date: '', remarks: '', document: null, current: false }, 
       dbs: { type: '', reference: '', nationality: '', issued: '', expiry: '', review_date: '', remarks: '', document: null, current: false },
       national: { national_id: '', nationality: '', country: '', issued: '', expiry: '', review_date: '', remarks: '', document: null, current: false }, 
       other_details: { changeDate: '', remarks: '', awareContact: '', awareInterview: '' }
    });
 
    useEffect(() => {
     console.log('form data changed ',formData);
    },[formData]);
    useEffect(() => {
        if (employees.length > 0 && formData.employee.full_name) {
          console.log('trying tooo find employeee ', formData.employee);
          const selected_employee = employees.find(
            (emp) => emp.employee.full_name === formData.employee.full_name
          );
          console.log('Selected Employee:', selected_employee);
      
          if (selected_employee) {
            // Transform the backend response before updating state
            const transformedEmployee = {
              ...selected_employee,
              other_details: {
                ...selected_employee.other_details,
                awareContact: selected_employee.other_details.awareContact ? 'Yes' : 'No',
                awareInterview: selected_employee.other_details.awareInterview ? 'Yes' : 'No',
              },
            };
      
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...transformedEmployee,
            }));
          }
        }
      }, [formData.employee.full_name]);
   const FormSections = [
    {
        title : 'Employee details',
        fields : [
            {label : 'Select Employee',type : 'select',value : "employee.full_name",options: employee_codes},
            {label : 'Employee Code',type : 'text',value : "employee.employee_code",readOnly : true},
            {label : 'Existing Employee Name',type : 'text',value : "employee.name",readOnly : true},
            {label : 'Employee First Name',type : 'text',value : "employee.fname",readOnly : true},
            {label : 'Employee Middle Name',type : 'text',value : "employee.mname"},
            {label : 'Employee Last Name',type : 'text',value : "employee.lname"},
            {label : 'Job Title',type : 'text',value : "employee.title"},
            {label : 'Contact Number',type :'text',value : "employee.contact_1"},
            {label : 'NI No.',type :'text',value : "employee.nationality_no"},
            {label : 'Select Nationality',type :'select',value : "employee.Nationality",options : nationalityOptions},    
        ]
    },
    {
        title: "Contact Information",
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
        title: "Visa/BRP Details",
          fields: [
            {label : 'Visa/BRP No.',type : 'text',value : "visa.visa_no"},
            {label : 'Nationality',type : 'select',value : "visa.nationality",options :nationalityOptions},
            {label : 'Country of Residence',type : 'select',value : "visa.country",options :nationalityOptions},
            {label : 'Issued by',type : 'text',value : "visa.issued_by"},
            {label : 'Issued date',type : 'date',value : "visa.issue_date"},
            {label : 'Expirty date',type : 'date',value : "visa.expiry_date"},
            {label : 'Eligible Review Date',type : 'date',value : "visa.review_date",readOnly : true},
            {label : 'Upload Front Side Picture',type :'file',value : "visa.front"},
            {label : 'Upload Back Side Picture',type :'file',value : "visa.back"},
            {label : 'Is this your current visa?',type :'radio',value : "visa.current"},
            {label : 'Remarks',type :'text',value : "visa.remarks"}
    
          ],
        },
      {
        title: "EUSS/Time limit details",
        fields: [
          {label : 'Reference Number.',type : 'text',value : "esus.reference"},
          {label : 'Nationality',type : 'select',value : "esus.nationality",options :nationalityOptions},
          {label : 'Issued Date',type : 'date',value : "esus.issued"},
          {label : 'Expiry Date',type : 'date',value : "esus.expiry"},
          {label : 'Eligible Review Date',type : 'date',value : "esus.review_date",readOnly:true},
          {label : 'Upload Document',type : 'file',value : "esus.document"},
          {label : 'Is this your current status?',type : 'radio',value : "esus.current" },
          {label : 'Remarks',type :'text',value : "esus.remarks"}
        ],
      },
      {
        title: "Disclosure and Barring Service (DBS) details",
        fields: [
          {label : 'DBS Type',type: 'select', value : 'dbs.type',options : ['Basic','Standard','Advanced']},
          {label : 'Reference Number.',type : 'text',value : "dbs.reference"},
          {label : 'Nationality',type : 'select',value : "dbs.nationality",options :nationalityOptions},
          {label : 'Issued Date',type : 'date',value : "dbs.issued"},
          {label : 'Expiry Date',type : 'date',value : "dbs.expiry"},
          {label : 'Eligible Review Date',type : 'date',value : "dbs.review_date",readOnly:true},
          {label : 'Upload Document',type : 'file',value : "dbs.document"},
          {label : 'Is this your current status?',type : 'radio',value : "dbs.current" },
          {label : 'Remarks',type :'text',value : "dbs.remarks"}
        ],
      },
      {
        title: "National Id details",
        fields: [
          {label : 'National id number.',type: 'text', value : 'national.national_id',},
          {label : 'Nationality',type : 'text',value : "national.nationality",options : nationalityOptions},
          {label : 'Country of Residence',type : 'select',value : "national.country",options :nationalityOptions},
          {label : 'Issued Date',type : 'date',value : "national.issued"},
          {label : 'Expiry Date',type : 'date',value : "national.expiry"},
          {label : 'Eligible Review Date',type : 'date',value : "national.review_date",readOnly:true},
          {label : 'Upload Document',type : 'file',value : "national.document"},
          {label : 'Is this your current status?',type : 'radio',value : "national.current" },
          {label : 'Remarks',type :'text',value : "national.remarks"}
        ],
      },
      {
        title: "Other Details",
        fields: [
            {label : 'Changed Date',type: 'date', value : 'other_details.changeDate',},
            {label : 'Remarks/Restriction to work',type : 'text',value : "other_details.remarks",options : nationalityOptions},
            {label : 'Are Sponsored migrants aware that they must inform [HR/line manager] promptly of changes in contact Details',type : 'select',value : "other_details.awareContact",options :['Yes','No']},
            {label : 'Are Sponsored migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview (In applicable cases)?',type : 'select',value : "other_details.awareInterview",options :['Yes','No']},
        ],
      },
   ];
   const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const section = name.split(".")[0];
    console.log('form dataaa ','here to chanhe ',name,value);
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

  const handleSubmit = async(e) => {
     e.preventDefault();
     console.log('coc submit hitt ',formData);
     const employee_code = formData.employee.employee_code;
     try{

        const contact_data = new FormData();
        for (const key in formData.contact_info) {
          if (formData.contact_info[key]) {
            contact_data.append(key, formData.contact_info[key]);
            }
        } 
        await axiosInstance.post(`/api/submit-contact/${companyData[0].id}.${employee_code}`, contact_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
        await axiosInstance.post(`/api/submit-national/${companyData[0].id}.${employee_code}`, national_data, {
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
        await axiosInstance.post(`/api/submit-dbs/${companyData[0].id}.${employee_code}`, dbs_data, {
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
        await axiosInstance.post(`/api/submit-esus/${companyData[0].id}.${employee_code}`, esus_data, {
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
        await axiosInstance.post(`/api/submit-visa/${companyData[0].id}.${employee_code}`, visa_data, {
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
        await axiosInstance.post(`/api/submit-passport/${companyData[0].id}.${employee_code}`, passport_data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      });

      await axiosInstance.post(`/api/submit-other-coc-details/${companyData[0].id}.${employee_code}`, formData.other_details,); 
     }
     catch(err){

     }
  }
  return (
    <div className="p-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Employee
        <span className="mx-2 text-tt">/ Change Of Circumstances</span>
      </p>
      <div className="mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">
            Change Of Circumstances
          </h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />
        {isLoading ? (
          <p className="text-gray-500">Loading employee data...</p>
        ) : (
          <form className="p-4 space-y-6" onSubmit={handleSubmit}>
            {FormSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-lg font-semibold text-tt mb-2">
                  {section.title}
                </h2>
                <hr className="my-3 border-t-1 border-gray-200" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.fields.map((field, fieldIndex) => {
                    const fieldValue =
                      formData[field.value.split(".")[0]]?.[field.value.split(".")[1]];
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
                            <option></option>
                            {field.options?.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
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
                            value={field.type !== 'file' ? fieldValue || "" : undefined}
                            className={`w-full px-3 py-2 border ${field.readOnly ? "bg-gray-200" : ""} rounded-md text-sm focus:border-blue-200 focus:border-b-4 hover:border-blue-200 hover:border-b-4`}
                            required={field.required}
                            readOnly={field.readOnly}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Add Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
  
};


export default COCForm;