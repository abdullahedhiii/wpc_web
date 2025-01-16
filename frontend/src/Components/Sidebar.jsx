import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Sidebar = ({moduleName,subModules =[]}) => {
  const { user } = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  console.log('in sidebar ',moduleName,subModules);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="fixed top-100 left-0 h-full w-64 bg-white text-black shadow-2xl z-40">
      <div className="p-4 text-lg flex items-center space-x-2">
        <div className="flex bg-gradient-to-r from-blue-400 to-purple-300 text-white rounded-full p-2">
          <i className="la la-user text-2xl"></i>
        </div>
        <div className="text-gray-500">
          {moduleName === "Organisation Profile"
            ? user.company_name
            : moduleName}
        </div>
      </div>

      <div className="px-4">
        <button
          className="flex items-center justify-between w-full bg-blue-500 text-white rounded-lg py-3 px-4 mb-4"
          onClick={toggleDropdown}
        >
          <div className="flex items-center space-x-3">
            <i className="la la-home text-xl"></i>
            <span className="font-semibold">Dashboard</span>
          </div>
          <i
            className={`la la-chevron-down transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          ></i>
        </button>

        <div className="bg-gray-100 rounded-lg shadow-sm p-4">
          <i className="la la-th-large text-xl text-gray-500"></i>
          <span className="p-2 text-gray-700 font-semibold">Organisation</span>
        </div>

        <ul className="space-y-2 pl-8 text-sm text-gray-600 p-4">
          {subModules.map((module, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer hover:text-gray-900 relative pl-6"
              >
                <span className="absolute left-0 top-1/2 transform -translate-y-3/2 w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                {module}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
