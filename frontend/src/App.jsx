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
import EmployeeLink from './Pages/EmployeeLink';
import CompanyForm from './Pages/CompanyForm';

const MainLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarData, setSidebarData] = useState({
    moduleName: "",
    subModules: [],
    subName: ""
  });

  useEffect(() => {
    if (location.pathname.includes("company-profile")) {
      setSidebarData({
        moduleName: "Organisation Profile",
        subModules: [
                     { 
                       name: "Organisation",
                       features: [{name: 'Organisation Profile',next_route: 'company-profile/edit-company'},
                                  {name: 'Employee Creation Link', next_route: 'company-profile/employee-link'}]
                     },            
                    ],
      });
    } else {
      setSidebarData({
        moduleName: "Default Title",
        subModules: [{}],
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar 
        isOpen = {isSidebarOpen}
        closeSideBar = {setIsSidebarOpen}
      />
    </div>

    <div className="flex pt-16">
      <div className={`fixed left-0 top-20 bottom-0 z-40 bg-white shadow-lg overflow-y-auto
        transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {isSidebarOpen && <Sidebar 
          moduleName={sidebarData.moduleName} 
          subModules={sidebarData.subModules}
          subName = {sidebarData.subName}
        />}
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
        path: "company-profile", 
        element: (
          <ProtectedRoute>
            <OrganisationProfile />
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
