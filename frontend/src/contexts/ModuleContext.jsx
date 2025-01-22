import React, { createContext, useContext, useState } from "react";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [selectedModule,setSelectedModule] = useState(null);
  const modules = [
    {
      id : 1,
      name: "Organisation Profile",
      icon: 'la-building',
      next_route: 'companydashboard', 
      dashboard : [{name : "Profile Status",completed : true,color : "blue"},
                   {name : "Employees according to RTI",completed: false,color: "red"},
                   {name : "Authorizing officer",completed: false,color: "blue"}
,                  {name : "Key Contact",completed: false,color: "purple"}
,                  {name : "Level 1 User",completed: false,color: "green"}], 
      subModules: [
        { 
          name: "Organisation",
          main_route: "company-profile/company",
          features: [{name: 'Organisation Profile',next_route: 'company-profile/edit-company'},
                     {name: 'Employee Creation Link', next_route: 'company-profile/employee-link'}]
        },            
       ],
    },
    {
      id :2,
      name : "Settings",
      icon: 'la-cogs',next_route: 'settings',
      dashboard :  [],
      subModules: [
        {
          name : "HCM Master",
          features: [{name : "Department", next_route : 'settings/Department'},
                     {name : "Designation",next_route : 'settings/Designation'},
                     {name : "Employment Type",next_route: 'settings/Employment-Type'},
                     {name : "Pay Group", next_route : 'settings/Pay-Group'},
                     {name : "Annual Pay", next_route : 'settings/Annual-Pay'},
                     {name : "Bank Master", next_route : 'settings/Bank-Master'},
                     {name : "Bank Sortcode", next_route : 'settings/Bank-Sortcode'},
                     {name : "Tax Master", next_route : 'settings/Tax-Master'},
                     {name : "Payment Type", next_route : 'settings/Payment-Type'},
                     {name : "Wedges pay mode", next_route : 'settings/Wedges-pay-mode'},
                    ]
        },
        {
           name : "Payroll",
           features: []
        }
      ]
    },

    { id: 3, name: 'Recruitment', icon: 'la-user-plus',next_route: 'recruitmentdashboard',
      dashboard : [
        {name : "Job Applied", icon : 'la-user',completed:false,count:25,color: "green"},
        {name : "Shortlisted", icon : 'la-user',completed:false,count:1,color: "red"},
        {name : "Interview", icon : 'la-user',completed:false,count:3,color: "gray"},
        {name : "Hired", icon : 'la-user',completed:false,count:0,color: "blue"},
        {name : "Offer Letter", icon : 'la-user',completed:false,count:0,color: "green"},
        {name : "Rejected", icon : 'la-user',completed:false,count:6,color: "red"},
        {name : "Job Posting(Internal)",completed:false, icon : 'la-user',count:7,color: "green"},
        {name : "Job Posting(External)",completed:false, icon : 'la-user',count:0,color: "blue"},
      ],
    subModules : [
      {
        name : "Recruitment",
        features: []
      }
    ] 
  },
    { id: 4, name: 'Employee', icon: 'la-users',next_route: 'employeedashboard',
      dashboard : [{name : "Number of Active Employees",completed:false,icon : 'la-user',count : 6,color : "green"},
                   {name : "Staff Report",icon : 'la-user',completed: false,count : -1,color : "purple"},
                   {name : "Number of Migrant Employees",icon : 'la-user',completed: false,count : 0,color : "red"},
      ],
      subModules : [
          {
            name : "Employee",
            features : [],
          },
          {
            name : "Change of circumstances",
            features : []
          },
          {
            name : "Contract Agreement",
            features : []
          }
      ] },
    { id: 5, name: 'User Access', icon: 'la-user-shield',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 6, name: 'Organogram Chart', icon: 'la-sitemap',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 7, name: 'Holiday Management', icon: 'la-calendar',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 8, name: 'Leave Management', icon: 'la-calendar-times',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 9, name: 'Rota', icon: 'la-clock',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 10, name: 'Attendance', icon: 'la-check-circle',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 11, name: 'Leave Approver', icon: 'la-thumbs-up',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 12, name: 'Payroll', icon: 'la-dollar-sign',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 13, name: 'Billing', icon: 'la-credit-card',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 14, name: 'Documents', icon: 'la-file-alt',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 15, name: 'Sponsor Compliance', icon: 'la-check-square',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 16, name: 'Employee Corner', icon: 'la-user-circle',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
    { id: 17, name: 'Tasks', icon: 'la-tasks',next_route: 'company-profile',dashboard : {features: []},
    subModules : [] },
  ]
  
    return (
      <ModuleContext.Provider 
          value={{
            modules,
            setSelectedModule,
            selectedModule
          }}
      >
        {children}
      </ModuleContext.Provider>
    );
};
  
  export const useModuleContext = () => useContext(ModuleContext);