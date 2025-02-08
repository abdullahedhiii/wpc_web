import React, { useState, useEffect } from "react";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";


import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import RoleManagement from "./Components/User access/RoleManagement";
import JobList from "./Components/Recruitment/JobList";
import ProtectedRoute from "./ProtectedRoute";
import OrganisationProfile from "./Pages/OrganisationProfile";
import Sidebar from "./Components/Sidebar";
import EmployeeLink from "./Components/Organisation Profile/EmployeeLink";
import CompanyForm from "./Components/Organisation Profile/CompanyForm";
import Department from "./Components/Settings/Department";
import Designation from "./Components/Settings/Designation";
import EmploymentType from "./Components/Settings/Employment Type";
import PayGroup from "./Components/Settings/Pay Group";
import AnnualPay from "./Components/Settings/AnnualPay";
import SubDashboard from "./Components/SubDashboard";
import StatisticsDashboard from "./Components/StatisticsDashboard";
import Level1User from "./Components/Organisation Profile/Level1User";
import RTIEmployee from "./Components/Organisation Profile/RTI_Employee";
import AuthorizingOfficer from "./Components/Organisation Profile/Authorizing_Officer";
import KeyContact from "./Components/Organisation Profile/KeyContact";
import DepartmentForm from "./Components/Settings/DepartmentForm";
import DesignationForm from "./Components/Settings/DesignationForm";
import EmploymentTypeForm from "./Components/Settings/EmploymentTypeForm";
import PayGroupForm from "./Components/Settings/PayGroupForm";
import AnnualPayForm from "./Components/Settings/AnnualPayForm";
import BankMaster from "./Components/Settings/BankMaster";
import BankMasterForm from "./Components/Settings/BankMasterForm";
import BankSortCode from "./Components/Settings/BankSortCode";
import BankSortCodeForm from "./Components/Settings/BankSortCodeForm";
import PayItem from "./Components/Settings/PayItem";
import TaxMaster from "./Components/Settings/TaxMaster";
import TaxMasterForm from "./Components/Settings/TaxMasterForm";
import PaymentType from "./Components/Settings/PaymentType";
import PaymentTypeForm from "./Components/Settings/PaymentTypeForm";
import HolidayType from "./Components/Holiday/HolidayType";
import HolidayTypeForm from "./Components/Holiday/HolidayTypeForm";
import HolidayList from "./Components/Holiday/HolidayList";
import HolidayListForm from "./Components/Holiday/HolidayListForm";
import RegVisitor from "./Components/Rota/Visitor/RegVisitor";
import VisitorList from "./Components/Rota/Visitor/VisitorList";
import VisitorForm from "./Components/Rota/Visitor/VisitorForm";
import ShiftManagement from "./Components/Rota/ShiftManagement/ShiftManagement";
import ShiftManagementForm from "./Components/Rota/ShiftManagement/ShiftManagementForm";
import LatePolicy from "./Components/Rota/ShiftManagement/LatePolicy";
import LatePolicyForm from "./Components/Rota/ShiftManagement/LatePolicyForm";
import OffDay from "./Components/Rota/ShiftManagement/OffDay";
import OffDayForm from "./Components/Rota/ShiftManagement/OffDayForm";
import EmployeePage from "./Components/Employee/EmployeePage";
import NotFound from "./Components/NotFound";
import UserConfiguration from "./Components/User access/UserConfiguration";
import EmployeeForm from "./Components/Employee/AddEmployeeForm";
import ChangeOfCircumstances from "./Components/Employee/ChangeOfCircumstances";
import { useSidebarContext } from "./contexts/SidebarContext";
import COCForm from "./Components/Employee/COCForm";
import JobListForm from "./Components/Recruitment/JobListForm";
import JobPosting from "./Components/Recruitment/JobPosting";
import JobPostingForm from "./Components/Recruitment/JobPostingForm";
import UploadAttendance from "./Components/Attendance/UploadAttendance";
import GenerateAttendance from "./Components/Attendance/GenerateAttendance";
import DailyAttendance from "./Components/Attendance/DailyAttendance";
import AttendanceHistory from "./Components/Attendance/AttendanceHistory";
import LeaveType from "./Components/LeaveManagement/LeaveType";
import LeaveTypeForm from "./Components/LeaveManagement/LeaveTypeForm";
import LeaveRule from "./Components/LeaveManagement/LeaveRule";
import LeaveRuleForm from "./Components/LeaveManagement/LeaveRuleForm";
import Footer from "./Components/Footer";
import COCView from "./Components/Employee/COCView";
import LeaveAllocation from "./Components/LeaveManagement/LeaveAllocation";
import LeaveAllocationForm from "./Components/LeaveManagement/LeaveAllocationForm";
import EditLeaveAllocation from "./Components/LeaveManagement/EditLeaveAllocation";
import LeaveBalance from "./Components/LeaveManagement/LeaveBalance";
import JobForm from "./Components/Recruitment/Application/JobForm";
import JobApplied from "./Components/Recruitment/JobApplied";
import Candidate from "./Components/Recruitment/Candidate";
import ShortListed from "./Components/Recruitment/ShortListed";
import InterviewList from "./Components/Recruitment/InterviewList";
import HiredList from "./Components/Recruitment/HiredList";
import Search from "./Components/Recruitment/Search";
import StatusSearch from "./Components/Recruitment/StatusSearch";
import RejectedList from "./Components/Recruitment/RejectedList";
import OrganisationReport from "./Components/Documents/OrganisationReport";
import UserForm from "./Components/User access/UserForm";
import UserRoleForm from "./Components/User access/UserRoleForm";

const MainLayout = () => {
  const {isSidebarOpen, setIsSidebarOpen} = useSidebarContext();
  const [logoVisible, setLogoVisible] = useState(true);
  const [isMobile,setMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
      setLogoVisible(true);
      setMobile(true)
    } else {
      setIsSidebarOpen(true);
      setMobile(false)
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`fixed top-0 left-0 right-0 z-50 ${
          isSidebarOpen && isMobile ? "pl-64" : "pl-0"
        }`}
      >
        <Navbar
          isOpen={isSidebarOpen}
          isLogo={logoVisible}
          closeSideBar={setIsSidebarOpen}
          closeLogo={setLogoVisible}
        />
      </div>
  
      <div className="flex flex-1 pt-12">
        <div
          className={`${
            isSidebarOpen && isMobile ? "fixed top-0 left-0 bottom-0" : "top-16"
          } z-40 bg-white shadow-lg overflow-y-auto transition-all duration-300`}
        >
          {(!isMobile || isSidebarOpen) && (
            <Sidebar
              isOpen={isSidebarOpen}
              setOpen={() => {
                setIsSidebarOpen(true);
                setLogoVisible(true);
              }}
            />
          )}
        </div>
  
        <div
          className={`flex flex-col flex-grow transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : innerWidth > 1024 ? "ml-20" : "ml-0"
          }`}
        >
          <main className="flex-grow">
            <Outlet />
          </main>
  
          <Footer />
        </div>
      </div>
    </div>
  );
  
};

const SimpleLayout = () => {
  return (
    <div className="simple-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
      path : "*",
      element : <NotFound/>
  },
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "employeeDashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

    ],
  },
  {
    path: "/visitor",
    children :[
    {
      path : ':id',
      element : <VisitorForm/>
    },  
  ]
  },
  {
    path: "/careers",
    children: [
      {
        path : ':id',
        element : <JobForm/>
      }

    ],
  },
  {
    path: "/hrms/",
    element: <MainLayout />,
    children: [
      {
        path: "companydashboard",
        element: (
          <ProtectedRoute>
            <StatisticsDashboard title={"Organisation Statistics"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "employeedashboard",
        element: (
          <ProtectedRoute>
            <SubDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/company",
        element: (
          <ProtectedRoute>
            <OrganisationProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/edit-company/:company_id",
        element: (
          <ProtectedRoute>
            <CompanyForm />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/edit-company",
        element: (
          <ProtectedRoute>
            <CompanyForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/employee-link",
        element: (
          <ProtectedRoute>
            <EmployeeLink />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-level-user",
        element: (
          <ProtectedRoute>
            <Level1User />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-employee-rti",
        element: (
          <ProtectedRoute>
            <RTIEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-authorizing-officer",
        element: (
          <ProtectedRoute>
            <AuthorizingOfficer />
          </ProtectedRoute>
        ),
      },
      {
        path: "company-key-contact",
        element: (
          <ProtectedRoute>
            <KeyContact />
          </ProtectedRoute>
        ),
      },
      {
        path: "settingsdashboard",
        element: (
          <ProtectedRoute>
            <SubDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-department",
        element: (
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/add-new-department",
        element: (
          <ProtectedRoute>
            <DepartmentForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/add-new-department/:department_id",
        element: (
          <ProtectedRoute>
            <DepartmentForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-designation",
        element: (
          <ProtectedRoute>
            <Designation />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/designation",
        element: (
          <ProtectedRoute>
            <DesignationForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/designation/:designation_id",
        element: (
          <ProtectedRoute>
            <DesignationForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-employment-type",
        element: (
          <ProtectedRoute>
            <EmploymentType />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/employee-type",
        element: (
          <ProtectedRoute>
            <EmploymentTypeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/employee-type/:type_id",
        element: (
          <ProtectedRoute>
            <EmploymentTypeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-paygroup",
        element: (
          <ProtectedRoute>
            <PayGroup />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/paygroup",
        element: (
          <ProtectedRoute>
            <PayGroupForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/paygroup/:group_id",
        element: (
          <ProtectedRoute>
            <PayGroupForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-annualpay",
        element: (
          <ProtectedRoute>
            <AnnualPay />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/annualpay",
        element: (
          <ProtectedRoute>
            <AnnualPayForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/annualpay/:annual_id",
        element: (
          <ProtectedRoute>
            <AnnualPayForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-bank",
        element: (
          <ProtectedRoute>
            <BankMaster />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/bank",
        element: (
          <ProtectedRoute>
            <BankMasterForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/bank/:bank_id",
        element: (
          <ProtectedRoute>
            <BankMasterForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-bank-sortcode",
        element: (
          <ProtectedRoute>
            <BankSortCode />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/bank-sortcode",
        element: (
          <ProtectedRoute>
            <BankSortCodeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/bank-sortcode/:sortcode_id",
        element: (
          <ProtectedRoute>
            <BankSortCodeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-tax",
        element: (
          <ProtectedRoute>
            <TaxMaster />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/tax",
        element: (
          <ProtectedRoute>
            <TaxMasterForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/tax/:tax_id",
        element: (
          <ProtectedRoute>
            <TaxMasterForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/vw-pay-type",
        element: (
          <ProtectedRoute>
            <PaymentType />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/pay-type",
        element: (
          <ProtectedRoute>
            <PaymentTypeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/pay-type/:p_id",
        element: (
          <ProtectedRoute>
            <PaymentTypeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/payitemlist",
        element: (
          <ProtectedRoute>
            <PayItem />
          </ProtectedRoute>
        ),
      },
      {
        path : "holidaydashboard",
        element : (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path : "holiday-type",
        element : (
          <ProtectedRoute>
            <HolidayType/>
          </ProtectedRoute>
        )
      },
      {
        path : "holiday/add-holiday-type",
        element : (
          <ProtectedRoute>
            <HolidayTypeForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "holiday/add-holiday-type/:h_id",
        element : (
          <ProtectedRoute>
            <HolidayTypeForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "holidays",
        element : (
          <ProtectedRoute>
            <HolidayList/>
          </ProtectedRoute>
        )
      },
      {
        path : "holiday/add-holiday",
        element : (
          <ProtectedRoute>
            <HolidayListForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "holiday/add-holiday/:ho_id",
        element : (
          <ProtectedRoute>
            <HolidayListForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "rotadashboard",
        element : (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/visitor-link",
        element : (
          <ProtectedRoute>
            <RegVisitor/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/visitor-regis",
        element : (
          <ProtectedRoute>
            <VisitorList/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/shift-management",
        element : (
          <ProtectedRoute>
            <ShiftManagement/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/add-shift-management",
        element : (
          <ProtectedRoute>
            <ShiftManagementForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/late-policy",
        element:(
          <ProtectedRoute>
            <LatePolicy/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/add-late-policy",
        element:(
          <ProtectedRoute>
            <LatePolicyForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/offday",
        element:(
          <ProtectedRoute>
            <OffDay/>
          </ProtectedRoute>
        )
      },
      {
        path : "rota/add-offday",
        element:(
          <ProtectedRoute>
            <OffDayForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "employeedashboard",
        element:(
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path : "employees",
        element:(
          <ProtectedRoute>
            <EmployeePage/>
          </ProtectedRoute>
        )
      },
      {
        path : "useraccessdashboard",
        element : (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path : "role/vw-users",
        element : (
          <ProtectedRoute>
            <UserConfiguration/>
          </ProtectedRoute>
        )
      },
      {
        path : 'role/vw-user-config',
        element : (<ProtectedRoute><UserForm/></ProtectedRoute>)
      },
      {
        path : 'role/vw-user-config/:id',
        element : (<ProtectedRoute><UserForm/></ProtectedRoute>)
      },
      {
        path : 'role/view-users-role',
        element : (<ProtectedRoute> <RoleManagement/> </ProtectedRoute>)
      },
      {
        path : `role/user-role`,
        element : (<ProtectedRoute><UserRoleForm/></ProtectedRoute>)
      },
      {
        path : "addemployee",
        element : (
          <ProtectedRoute>
            <EmployeeForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "addemployee/:id",
        element : (
          <ProtectedRoute>
            <EmployeeForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "employee/change-of-circumstances-add",
        element : (
          <ProtectedRoute>
            <ChangeOfCircumstances/>
          </ProtectedRoute>
        )
      },
      {
        path : "employee/change-of-circumstances-add-new",
        element : (
          <ProtectedRoute>
            <COCForm/>
          </ProtectedRoute>
        )
      },
      {
        path : "leaveapprovedashboard",
        element : (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path : "billingorganizationdashboard",
        element : (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        )
      }, {
        path : "recruitmentdashboard",
        element : (
          <ProtectedRoute>
            <StatisticsDashboard title={"Recruitment Statistics"}/>
          </ProtectedRoute>
        )
      },
      {
        path : "recruitment/job-list",
        element : (<ProtectedRoute><JobList/></ProtectedRoute>)
      },
      {
        path : "recruitment/add-job-list",
        element : (<ProtectedRoute><JobListForm/></ProtectedRoute>)
      },
      {
        path : "recruitment/job-posting",
        element : (<ProtectedRoute><JobPosting/></ProtectedRoute>)
      },
      {
        path : "recruitment/add-job-post",
        element : (<ProtectedRoute><JobPostingForm/></ProtectedRoute>)
      },
      {
        path : "recruitment/add-job-post/:id",
        element : (<ProtectedRoute><JobPostingForm/></ProtectedRoute>)
      },
      {
        path : "leavedashboard",
        element : (<ProtectedRoute><StatisticsDashboard title={"Leave Type"}/></ProtectedRoute>)
      },
      {
        path : "attendancedashboard",
        element : (<ProtectedRoute><SubDashboard/></ProtectedRoute>)
      },
      {
        path : "attendance/upload-data",
        element : (<ProtectedRoute><UploadAttendance/></ProtectedRoute>)
      },
      {
        path : "attendance/generate-data",
        element : (<ProtectedRoute><GenerateAttendance/></ProtectedRoute>)
      },
      {
        path : "attendance/daily-attendance",
        element : (<ProtectedRoute><DailyAttendance/></ProtectedRoute>)
      },
      {
        path : "attendance/attendance-report",
        element : (<ProtectedRoute><AttendanceHistory/></ProtectedRoute>)
      },
      {
        path : "leave-management/leave-type-listing",
        element : (<ProtectedRoute><LeaveType/></ProtectedRoute>)
      },
      {
        path: "leave-management/new-leave-type",
        element : (<ProtectedRoute><LeaveTypeForm/></ProtectedRoute>)
      },
      {
        path: "leave-management/leave-type-listing/:leave_id",
        element : (<ProtectedRoute><LeaveTypeForm/></ProtectedRoute>)
      },
      {
        path : "leave-management/leave-rule-listing",
        element : (<ProtectedRoute><LeaveRule/></ProtectedRoute>)
      },
      {
        path : "leave-management/save-leave-rule",
        element  : (<ProtectedRoute><LeaveRuleForm/></ProtectedRoute>)
      },
      {
        path : "leave-management/view-leave-rule/:rule_id",
        element : (<ProtectedRoute><LeaveRuleForm/></ProtectedRoute>)
      },
      {
        path : "employee/change-of-circumstances",
        element : (<ProtectedRoute><COCView/></ProtectedRoute>)
      },
      {
        path : "leave-management/leave-allocation-listing",
        element : (<ProtectedRoute><LeaveAllocation/></ProtectedRoute>)
      },
      {
        path : 'leave-management/save-leave-allocation',
        element : (<ProtectedRoute><LeaveAllocationForm/></ProtectedRoute>)
      },
      {
        path : 'leave-management/leave-allocation-dtl/:allocation_id',
        element: (<ProtectedRoute><EditLeaveAllocation/></ProtectedRoute>)
      },
      {
        path :"leave-management/leave-balance",
        element:(<ProtectedRoute><LeaveBalance/></ProtectedRoute>)
      },
      {
        path : "recruitment/candidate",
        element: (<ProtectedRoute><JobApplied/></ProtectedRoute>)
      },
      {
        path : "recruitment/candidate/view-details/:candidate_id",
        element : (<ProtectedRoute><Candidate/></ProtectedRoute>)
      },
      {
        path: "recruitment/short-listing",
        element: (<ProtectedRoute><ShortListed/></ProtectedRoute>)
      },
      {
        path: "recruitment/interview",
        element: (<ProtectedRoute><InterviewList/></ProtectedRoute>)
      },
      {
        path: "recruitment/hired",
        element: (<ProtectedRoute><HiredList/></ProtectedRoute>)
      },
      {
        path: "recruitment/search",
        element: (<ProtectedRoute><Search/></ProtectedRoute>)
      },
      {
        path : "recruitment/status-search",
        element : (<ProtectedRoute><StatusSearch/></ProtectedRoute>)
      },
      {
        path : "recruitment/rejected",
        element : (<ProtectedRoute><RejectedList/></ProtectedRoute>)
      },
      {
        path : "documentsdashboard",
        element : (<ProtectedRoute><SubDashboard/></ProtectedRoute>)
      },
      {
        path : "document/staff-report",
        element : (<ProtectedRoute></ProtectedRoute>)
      },
      {
        path : "document/employees-left",
        element : (<ProtectedRoute></ProtectedRoute>)
      },
      {
        path : "document/employee-report",
        element : (<ProtectedRoute></ProtectedRoute>)
      },
      {
        path : "document/employee-archive-report",
        element : (<ProtectedRoute></ProtectedRoute>)
      },
      {
        path : "document/organisation-report",
        element : (<ProtectedRoute><OrganisationReport/></ProtectedRoute>)
      },
    ],
  },
]);

function App() {
 

  return <RouterProvider router={router} />;
}

export default App;
