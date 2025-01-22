import React, { useState, useEffect } from 'react';
import './index.css';
import {  createBrowserRouter, RouterProvider, Outlet, useLocation,} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import 'line-awesome/dist/line-awesome/css/line-awesome.css';
import ProtectedRoute from './ProtectedRoute';
import OrganisationProfile from './Pages/OrganisationProfile';
import Sidebar from './Components/Sidebar';
import EmployeeLink from './Components/Organisation Profile/EmployeeLink';
import CompanyForm from './Components/Organisation Profile/CompanyForm';
import Settings from './Pages/Settings';
import Department from './Components/Settings/Department';
import Designation from './Components/Settings/Designation';
import EmploymentType from './Components/Settings/Employment Type';
import PayGroup from './Components/Settings/Pay Group';
import AnnualPay from './Components/Settings/AnnualPay';
import BankMaster from './Components/Settings/Bank Master';
import SubDashboard from './Components/SubDashboard';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar 
        isOpen = {isSidebarOpen}
        closeSideBar = {setIsSidebarOpen}
      />
    </div>

    <div className="flex pt-14">
      <div className={`fixed left-0 top-20 bottom-0 z-40 bg-white shadow-lg overflow-y-auto
        transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {isSidebarOpen && <Sidebar/>}
      </div>

      <div className={`flex-1 transition-all duration-300
        ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <main className="p-6">
          <Outlet />
        </main>
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
    path: "/hcms/",  
    element: <MainLayout />,
    children: [
      {
        path: "companydashboard", 
        element: (
          <ProtectedRoute>
            <SubDashboard/>
          </ProtectedRoute>
        ),
      },
      {
        path : "recruitmentdashboard",
        element:(
          <ProtectedRoute>
             <SubDashboard/>
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
        path : "company-profile/company",
        element : (
             <ProtectedRoute>
              <OrganisationProfile/>
             </ProtectedRoute>
        )
      },
      {
        path: "company-profile/edit-company/:company_id", 
        element: (
          <ProtectedRoute>
            <CompanyForm/>
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/edit-company", 
        element: (
          <ProtectedRoute>
            <CompanyForm/>
          </ProtectedRoute>
        ),
      },
      {
        path: "company-profile/employee-link", 
        element: (
          <ProtectedRoute>
            <EmployeeLink/>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings", 
        element: (
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/Department", 
        element: (
          <ProtectedRoute>
            <Department/>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/Designation", 
        element: (
          <ProtectedRoute>
             <Designation/>
          </ProtectedRoute>
        ),
      },
      {
        path : "settings/Employment-Type",
        element: (
          <ProtectedRoute>
             <EmploymentType/>
          </ProtectedRoute>
        ),
      },
      {
        path : "settings/Pay-Group",
        element: (
          <ProtectedRoute>
             <PayGroup/>
          </ProtectedRoute>
        ),
      },
      {
        path : "settings/Annual-Pay",
        element:(
          <ProtectedRoute>
            <AnnualPay/>
          </ProtectedRoute>
        )
      },
      {
        path : "settings/Bank-Master",
        element:(
          <ProtectedRoute>
             <BankMaster/>
          </ProtectedRoute>
        )
      },
    
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
