import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({isOpen ,closeSideBar}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, user } = useSelector((state) => state.user);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    closeSideBar(!isOpen);
  };

  return (
    <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="w-24 h-auto ml-10" />
          {(isLoggedIn || location.pathname !== "/employeeDashboard") && (
            <button
              onClick={toggleSidebar}
              className="ml-20 text-tt  hover:text-blue-800"
              title="Toggle Sidebar"
            >
              <i className="la la-navicon text-2xl"></i>
            </button>
          )}
        </div>

        {location.pathname.includes("employeeDashboard") && isLoggedIn && user ? (
          <div className="flex items-center space-x-4 mr-10">
            <div className="text-left">
              <p className="font-bold">{user.first_name + " " + user.last_name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.phone_number}</p>
            </div>
            <button onClick={handleLogout} title="Logout">
              <i className="la la-power-off text-4xl text-red-400"></i>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 mr-10">
            <button onClick={() => navigate("/employeeDashboard")}>
              <i className="la la-home text-2xl text-gray-600"></i>
            </button>
            <button onClick={handleLogout} title="Logout">
              <i className="la la-key text-2xl text-gray-600"></i>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
