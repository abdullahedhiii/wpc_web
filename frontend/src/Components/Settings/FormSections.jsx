const formSections = [
    {
      title: "",
      state_name: "companyData",
      fields: [
        {
          label: "Organisation Name",
          value: "name",
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
      ],
    },
    {
      title: "Authorised Persons Details",
      state_name: "authorizingData",
      fields: [
        {
          label: "First Name",
          value: "fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value:"phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "history",
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
          value: "check",
          type: "checkbox",
          required: false,
        },
        {
          label: "First Name",
          value: "fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value: "phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "history",
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
          value: "check",
          type: "checkbox",
          required: false,
        },
        {
          label: "First Name",
          value: "fname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Last Name",
          value: "lname",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Designation",
          value: "designation",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Phone No",
          value: "phone",
          type: "text",
          required: true,
          additionalElement: null,
        },
        {
          label: "Email",
          value: "email",
          type: "email",
          required: true,
          additionalElement: null,
        },
        {
          label: "Proof Of Id",
          value: "proof_id",
          type: "file",
          required: true,
          additionalElement: null,
        },
        {
          label:
            "Do you have a history of Criminal conviction/Bankruptcy/Disqualification?",
          value: "history",
          type: "select",
          options: ["No", "Yes"],
          required: true,
        },
      ],
    },
    {
        title: "Organisation Address",
        state_name : "addressData",
        fields: [
            {
                label: "Post Code",
                value: "PostCode",
                type: "text",
                required: false,
                additionalElement: null,
            },
            {
                label: "Select Address",
                value: "Select",
                type: "select",
                required: false,
                options : [],
            },
            {
                label: "Address Line 1",
                value: "Line1",
                type: "text",
                required: false,
                additionalElement: null,
            },
            {
                label: "Address Line 2",
                value: "Line2",
                type: "text",
                required: false,
                additionalElement: null,
            },
            {
                label: "Address Line 2",
                value: "Line2",
                type: "text",
                required: false,
                additionalElement: null,
            },
            {
                label: "City/County",
                value: "City_County",
                type: "text",
                required: false,
                additionalElement: null,
            },
            {
                label: "Country",
                value: "Country",
                type: "text",
                required: false,
                additionalElement: null,
            },
        ]
    }
  ];

  export default formSections;