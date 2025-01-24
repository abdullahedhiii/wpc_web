import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../contexts/CompanyContext";

const Sidebar = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const { selectedModule, setSubFeature } = useModuleContext();
  const {companyData} = useCompanyContext();
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubModuleIndex, setOpenSubModuleIndex] = useState(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSubModule = (index) => {
    setOpenSubModuleIndex(openSubModuleIndex === index ? null : index);
  };

  const handleFeatureSelect = (feature) => {
    setSubFeature(feature);
    setOpenSubModuleIndex(null);
    console.log('in module select', companyData[0]);
  
    if (feature.name === "Organisation Profile" && !companyData[0].id) {
      navigate(`/hrms/company-profile/edit-company`);
    } else {
      navigate(`/hrms/${feature.next_route}`);
    }
  };
  

  return (
    <aside
      className={` fixed h-full bg-white text-black shadow-2xl z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
      onMouseOver={!isOpen ? setOpen : undefined}
    >
      <div
        className={`p-4 text-lg flex items-center ${
          isOpen ? "space-x-2" : "justify-center"
        }`}
      >
        <div className="flex bg-gradient-to-r from-blue-400 to-purple-300 text-white rounded-full p-2">
          <i className="la la-user text-2xl"></i>
        </div>
  
        {isOpen && (
          <div className="text-gray-500 text-md uppercase">
            {selectedModule.name === "Organisation Profile"
              ? user?.company_name || "Company Name"
              : selectedModule.name}
          </div>
        )}
      </div>
  
      <hr
        className={`border-t border-gray-300 ${
          isOpen ? "mx-4" : "mx-auto w-10"
        } transition-all duration-300`}
      />
      <div className={`mt-8 ${isOpen ? "px-4" : "px-2"}`}>
        <button
          className={`flex items-center w-full ${
            isOpen
              ? "justify-between bg-blue-500 text-white rounded-lg py-3 px-4"
              : "justify-center bg-white text-blue-500 py-3"
          } mb-4`}
          onClick={toggleDropdown}
        >
          <div
            className={`flex items-center ${
              isOpen ? "space-x-3" : "justify-center"
            }`}
            onClick={() => navigate(`/hrms/${selectedModule.next_route}`)}
          >
            <i className={`fas fa-home ${isOpen ? "text-xl" : "text-3xl"}`}></i>
            {isOpen && <span className="font-semibold">Dashboard</span>}
          </div>
          {isOpen && (
            <i
              className="fa-solid fa-caret-down transform transition-transform"
            ></i>
          )}
        </button>

        {isOpen  && (
          <div>
            {selectedModule.subModules.map((subModule, index) => (
              <div key={index} className="mb-4">
              <div
                className="flex items-center justify-between bg-gray-100 rounded-lg shadow-sm p-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <i className={`${subModule.icon} text-xl text-gray-500`}></i>
                  <span className="text-gray-700 text-md font-semibold">
                    {subModule.name}
                  </span>
                </div>
        
                {subModule.features.length > 0 && (
                  <i
                    className={`fa-solid fa-caret-down text-gray-400 transform transition-transform duration-400 ease-in-out ${
                      openSubModuleIndex === index ? "rotate-180" : ""
                    }`}
                    onClick={() => toggleSubModule(index)}
                  ></i>
                )}
              </div>


                {openSubModuleIndex === index && (
                  <ul className="space-y-2 w-full p-4 text-sm text-gray-600 ">
                    {subModule.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="cursor-pointer hover:bg-gray-100 relative pl-6 leading-8"
                        onClick={() => handleFeatureSelect(feature)}
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

        {!isOpen && (
          <div className="flex flex-col items-center space-y-4">
          <i className="fa-solid fa-ellipsis font-extrabold text-3xl text-gray-500"></i>

            {selectedModule.subModules.map((subModule, index) => (
              <button
                key={index}
                className="p-2 text-gray-500 hover:text-blue-500"
                onClick={() => navigate(`/hrms/${subModule.main_route}`)}
              >
                <i
                  className={`la ${subModule.icon || "la-th-large"} text-2xl`}
                ></i>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
