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

const MainLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarData, setSidebarData] = useState({
    moduleName: "",
    subModules: [],
    subName: ""
  });

  useEffect(() => {
    if (location.pathname.includes("Organisation-Profile")) {
      setSidebarData({
        moduleName: "Organisation Profile",
        subModules: ["Organisation Profile", "Employee Creation Link"],
        subName: "Organisation"
      });
    } else {
      setSidebarData({
        moduleName: "Default Title",
        subModules: [],
        subName: "Default"
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
      <div className={`fixed left-0 top-24 bottom-0 z-40 bg-white shadow-lg overflow-y-auto
        transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {isSidebarOpen && <Sidebar 
          moduleName={sidebarData.moduleName} 
          subModules={sidebarData.subModules}
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
        path: "Organisation-Profile", 
        element: (
          <ProtectedRoute>
            <OrganisationProfile />
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
