import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../contexts/CompanyContext";

const Sidebar = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const { selectedModule, setSubFeature } = useModuleContext();
  const { companyData } = useCompanyContext();
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubModuleIndex, setOpenSubModuleIndex] = useState(null);
 // console.log('in side bar ',selectedModule);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSubModule = (index) => {
    setOpenSubModuleIndex(openSubModuleIndex === index ? null : index);
  };

  const handleFeatureSelect = (feature) => {
    setSubFeature(feature);
    setOpenSubModuleIndex(null);
    console.log("in module select", companyData[0]);

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
      } overflow-y-auto`}
      onMouseOver={!isOpen ? setOpen : undefined}
    >
      <div
        className={`p-3 pt-6 text-lg flex items-center ${
          isOpen ? "space-x-2" : "justify-center"
        }`}
      >
        <img src="/images/profile.png" className="w-10 h-10"></img>
        {isOpen && (
          <div
            className={`text-gray-500 text-[14px] ${
              selectedModule.name === "Organisation Profile"
                ? "uppercase"
                : undefined
            }`}
          >
            {selectedModule.name === "Organisation Profile"
              ? companyData[0]['Organisation Name'] || "Company Name"
              : selectedModule.name}
          </div>
        )}
      </div>

      <hr
        className={`border-t border-gray-300 ${
          isOpen ? "mx-4" : "mx-auto w-10"
        } transition-all duration-300`}
      />
      <div className={`mt-6 ${isOpen ? "px-4" : "px-3"}`}>
        <button
          className={`flex items-center w-full ${
            isOpen
              ? "justify-between bg-blue-600 text-white rounded-lg py-3 px-4"
              : "justify-center bg-blue-600 text-white rounded-lg py-3 "
          } mb-4`}
          onClick={toggleDropdown}
        >
          <div
            className={`flex items-center ${
              isOpen ? "space-x-3" : "justify-center"
            }`}
            onClick={() => navigate(`/hrms/${selectedModule.next_route}`)}
          >
            <i className={`fas fa-home ${isOpen ? "text-xl" : "text-[26px]"}`}></i>
            {isOpen && (
              <span className="font-semibold text-[16px]">Dashboard</span>
            )}
          </div>
          {isOpen && (
            <i className="fa-solid fa-caret-down text-[12px] transform transition-transform"></i>
          )}
        </button>

        {isOpen && (
          <div>
            {selectedModule.subModules.map((subModule, index) => (
              <div key={index} className="mb-4">
                <div
                  className={`flex items-center justify-between text-gray-400 hover:bg-gray-100 hover:text-gray-700 ${
                    openSubModuleIndex === index
                      ? "bg-gray-100 shadow-sm text-gray-700"
                      : undefined
                  } rounded-lg  p-3 cursor-pointer`}
                >
                  <div className="flex items-center space-x-3" 
                     onClick={() => subModule.features.length === 0 && navigate(`/hrms/${subModule.main_route}`)}
                  >
                    <i className={`${subModule.icon} text-[18px]`}></i>
                    <span className="text-[15px]">{subModule.name}</span>
                  </div>

                  {subModule.features.length > 0 && (
                    <i
                      className={`fa-solid fa-caret-down text-[12px] text-gray-400 transform transition-transform duration-900 ease-in-out ${
                        openSubModuleIndex === index ? "rotate-180" : ""
                      }`}
                      onClick={() => toggleSubModule(index)}
                    ></i>
                  )}
                </div>

                {openSubModuleIndex === index && (
                  <div className="space-y-3 p-3 text-[13px] text-gray-400">
                    {subModule.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center w-full cursor-pointer hover:bg-gray-100 relative rounded-lg p-2 leading-4"
                        onClick={() => handleFeatureSelect(feature)}
                      >
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-gray-500 rounded-full"></span>

                        <div className="flex items-center w-full space-x-2 pl-6">
                          <span className="text-gray-700">{feature.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
