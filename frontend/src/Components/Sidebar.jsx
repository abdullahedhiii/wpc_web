import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ moduleName, subModules = [] }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  //console.log(moduleName,subModules,'in sidebar');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubModuleIndex, setOpenSubModuleIndex] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSubModule = (index) => {
    setOpenSubModuleIndex(openSubModuleIndex === index ? null : index);
  };

  return (
    <aside className="fixed h-full w-64 bg-white text-black shadow-2xl z-40">
      <div className="p-4 text-lg flex items-center space-x-2">
        <div className="flex bg-gradient-to-r from-blue-400 to-purple-300 text-white rounded-full p-2">
          <i className="la la-user text-2xl"></i>
        </div>
        <div className="text-gray-500">
          {moduleName === "Organisation Profile"
            ? user?.company_name || "Company Name"
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
            className={`la la-caret-down transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          ></i>
        </button>

        {isDropdownOpen && (
          <div>
            {subModules.map((subModule, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 bg-gray-100 rounded-lg shadow-sm p-4 cursor-pointer"
                  onClick={() => toggleSubModule(index)}
                >
                  <i className="la la-th-large text-xl text-gray-500"></i>
                  <span className="text-gray-700 font-semibold">
                    {subModule.name}
                  </span>
                  <i
                    className={`la la-caret-down transform transition-transform ${
                      openSubModuleIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>

                {openSubModuleIndex === index && (
                  <ul className="space-y-2 pl-8 mt-2 text-sm text-gray-600">
                    {subModule.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="cursor-pointer hover:text-gray-900 relative pl-6"
                        onClick={() =>{ setOpenSubModuleIndex(null), navigate(`/hcms/${feature.next_route}`)}}
                      >
                        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
