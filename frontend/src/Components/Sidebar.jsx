import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useModuleContext } from "../contexts/ModuleContext"
import { useDispatch, useSelector } from "react-redux"
import { useCompanyContext } from "../contexts/CompanyContext"
import { ChevronDown, ChevronRight, LogOut, Menu, User } from 'lucide-react'
import { useSidebarContext } from "../contexts/SidebarContext"
import { logout } from "../redux/UserSlice";
import axiosInstance from "../../axiosInstance"

const Sidebar = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { setSubFeature, setSubModule, modules } = useModuleContext()
  const { companyData } = useCompanyContext()
  const { user } = useSelector((state) => state.user)
  const [expandedModules, setExpandedModules] = useState({})
  const [expandedFeatures, setExpandedFeatures] = useState({})
  const { setIsSidebarOpen, isSidebarOpen } = useSidebarContext()
  
    const handleLogout = async() => {
      try{
         await axiosInstance.post(`/api/logout`);
         dispatch(logout());
         navigate("/");
      }
      catch(err){

      }
     
    };
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }))
  }

  const toggleFeatures = (moduleId, subModuleId) => {
    const key = `${moduleId}-${subModuleId}`
    setExpandedFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleFeatureSelect = (feature) => {
    setSubFeature(feature)
    if (feature.name === "Organisation Profile" && !companyData[0]?.id) {
      navigate(`/hrms/company-profile/edit-company`)
    } else {
      navigate(`/hrms/${feature.next_route}`)
    }
  }

  return (
    <aside className={`fixed h-full bg-white shadow-lg z-40 transition-all duration-300 ${
      isOpen ? "w-64" : "w-20"
    } flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        {isOpen ? (
          <div
          className="flex items-center space-x-2"
          > 
            <img src="/images/small-logo.png" alt="HR Solutions" className="w-10 h-10" />
            <h1 className="text-sm font-bold text-gray-800">HR Solutions</h1>
          </div>
        ) : (
          <img src="/images/small-logo.png" alt="HR Solutions" className="w-10 h-10" />
        )}
      </div>

      <nav className="flex-grow overflow-y-auto py-4">
        {modules?.map((module) =>
          module.can_access || user.isAdmin ? (
            <div key={module.id} className="mb-2">
              <button
                onClick={() =>{
                  if(isOpen){
                     toggleModule(module.id) 
                  }
                 else {
                  setSubFeature(null)
                  navigate(`/hrms/${module.next_route}}`)}
                }
              }
                className={`w-full flex items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 ${
                  expandedModules[module.id] ? "bg-yellow-100 rounded-3xl" : ""
                }`}
                title={module.name}
              >
                 <div className="w-10 h-10  rounded-full bg-yellow-300 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                  <img
                    src={module.icon_image || "/placeholder.svg"}
                    alt={module.name}
                    className="w-6 h-6 text-yellow-500"
                  />
                </div>
                {isOpen && (
                  <>
                    <span className="ml-3 flex-grow text-left">{module.name}</span>
                    {module.subModules?.length > 0 && (
                      expandedModules[module.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    )}
                  </>
                )}
              </button>

              {isOpen && expandedModules[module.id] && (
                <div className="pl-8 ">
                  {module.subModules?.map((subModule) => (
                    <div key={subModule.id}>
                      <button
                        onClick={() => {
                          if (subModule.features?.length > 0) {
                            toggleFeatures(module.id, subModule.id)
                          } else {
                            setSubModule(subModule)
                            navigate(`/hrms/${subModule.main_route}`)
                          }
                        }}
                        className="w-full flex items-center px-6 py-2 text-[14px] text-gray-600 hover:bg-yellow-100 hover:mt-2 hover:rounded-2xl transition-all duration-200"
                      >
                        <i className={`${subModule.icon || "las la-circle"} text-[16px] mr-3 text-yellow-300`}></i>
                        <span className="flex-grow text-left">{subModule.name}</span>
                        {subModule.features?.length > 0 && (
                          expandedFeatures[`${module.id}-${subModule.id}`] ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                        )}
                      </button>

                      {expandedFeatures[`${module.id}-${subModule.id}`] && (
                        <div className="pl-4">
                          {subModule.features?.map((feature) =>
                            user.isAdmin || feature.can_access ? (
                              <button
                                key={feature.id}
                                onClick={() => handleFeatureSelect(feature)}
                                className="w-full flex items-center px-8 py-2 text-[11px] text-gray-600 hover:bg-yellow-100 hover:mt-2 hover:rounded-xl transition-all duration-200"
                              >
                                <span className="w-1 h-1 bg-yellow-300 rounded-full mr-3"></span>
                                <span>{feature.name}</span>
                              </button>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null
        )}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-center">
          {isOpen ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profile_image || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{user.first_name}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              <button
                  onClick={() => navigate("/hrms/employeeDashboard")}
                  title="Main Dashboard"
                >
                  <img
                    src="/images/home.jpg"
                    alt="home Icon"
                    className="w-6 h-6"
                  />
                </button>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Toggle Sidebar"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">

                <img
                  src={user.profile_image || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
              
              <button
                  onClick={() => navigate("/hrms/employeeDashboard")}
                  title="Main Dashboard"
                >
                  <img
                    src="/images/home.jpg"
                    alt="home Icon"
                    className="w-8 h-8"
                  />
                </button>
                
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200"
                title="Toggle Sidebar"
              >
                <Menu size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar