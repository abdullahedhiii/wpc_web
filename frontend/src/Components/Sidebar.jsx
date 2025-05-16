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
         await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/logout`);
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
    <aside
      className={`fixed h-full bg-white shadow-2xl z-40 transition-all duration-300 border-r border-yellow-100 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col rounded-r-2xl`}
    >
      <div className="p-4 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <img src="/images/small-logo.png" alt="HR Solutions" className="w-10 h-10 rounded-lg shadow" />
            <h1 className="text-lg font-bold text-yellow-700 tracking-wide">HR Solutions</h1>
          </div>
        ) : (
          <img src="/images/small-logo.png" alt="HR Solutions" className="w-10 h-10 rounded-lg shadow" />
        )}
      </div>

      <nav className="flex-grow overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-yellow-50">
        {modules?.map((module) =>
          ((module.name !== 'Settings' && module.name!== 'Holiday' && module.name!== 'Rota' && module.name !== 'Tasks') && (module.can_access || user?.isAdmin)) ? (
            <div key={module.id} className="mb-2">
              <button
                onClick={() => {
                  if (isOpen) {
                    toggleModule(module.id)
                  } else {
                    setSubFeature(null)
                    navigate(`/hrms/${module.next_route}}`)
                  }
                }}
                className={`w-full flex items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:shadow rounded-2xl transition-all duration-200 ${
                  expandedModules[module.id] ? "bg-yellow-100 border-l-4 border-yellow-400" : ""
                }`}
                title={module.name}
              >
                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center group-hover:bg-yellow-300 transition-colors duration-300 shadow-sm">
                  <img
                    src={module.icon_image || "/placeholder.svg"}
                    alt={module.name}
                    className="w-6 h-6 text-yellow-500"
                  />
                </div>
                {isOpen && (
                  <>
                    <span className="ml-3 flex-grow text-left font-medium text-gray-800 tracking-wide">
                      {module.name}
                    </span>
                    {module.subModules?.length > 0 && (
                      expandedModules[module.id] ? <ChevronDown size={18} className="text-yellow-600" /> : <ChevronRight size={18} className="text-yellow-400" />
                    )}
                  </>
                )}
              </button>

              {isOpen && expandedModules[module.id] && (
                <div className="pl-8 border-l-2 border-yellow-100 ml-2">
                  {module.subModules?.map((subModule) => (subModule.name!== 'Time Shift Management' && subModule.name!== 'Archive') ?(
                    <div key={subModule.id}>
                      <button
                        onClick={() => {
                          if (subModule.features?.length > 0) {
                            toggleFeatures(module.id, subModule.id)
                          } else {
                            setSubModule(subModule)
                            setSubFeature(null)
                            navigate(`/hrms/${subModule.main_route}`)
                          }
                        }}
                        className="w-full flex items-center px-6 py-2 text-[14px] text-gray-700 hover:bg-yellow-50 hover:rounded-xl transition-all duration-200 font-medium"
                      >
                        <i className={`${subModule.icon || "las la-circle"} text-[16px] mr-3 text-yellow-400`}></i>
                        <span className="flex-grow text-left">{subModule.name}</span>
                        {subModule.features?.length > 0 && (
                          expandedFeatures[`${module.id}-${subModule.id}`] ? <ChevronDown size={14} className="text-yellow-600" /> : <ChevronRight size={14} className="text-yellow-400" />
                        )}
                      </button>

                      {expandedFeatures[`${module.id}-${subModule.id}`] && (
                        <div className="pl-4 border-l border-yellow-100 ml-2">
                          {subModule.features?.map((feature) =>
                            (feature.name!== 'Job list' && feature.name!== 'Daily Work Update' && feature.name!== 'Process Attendance' &&  feature.name!== 'Employee Creation Link' && feature.name!== 'Leave Rule'
                              && feature.name!== 'Manage Leave Type'  && feature.name!== 'Leave Allocation'
                            )&& (user?.isAdmin || feature.can_access) ? (
                              <button
                                key={feature.id}
                                onClick={() => handleFeatureSelect(feature)}
                                className="w-full flex items-center px-8 py-2 text-[12px] text-gray-700 hover:bg-yellow-100 hover:rounded-lg transition-all duration-200"
                              >
                                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                                <span>{feature.name}</span>
                              </button>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                  ) : null)}
                </div>
              )}
            </div>
          ) : null
        )}
      </nav>

      <div className="border-t border-yellow-200 p-4 bg-gradient-to-t from-yellow-50 to-white">
        <div className="flex items-center justify-center">
          {isOpen ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                {user.profile_image !== null ? <img
                  src={user.profile_image}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-yellow-200 shadow"
                /> : null}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">{user.first_name}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate("/hrms/employeeDashboard")}
                  title="Main Dashboard"
                  className="hover:bg-yellow-100 p-2 rounded-full"
                >
                  <img
                    src="/images/home.jpg"
                    alt="home Icon"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:bg-yellow-100 rounded-full transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-gray-500 hover:bg-yellow-100 rounded-full transition-colors duration-200"
                  title="Toggle Sidebar"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              {user.profile_image !== null ? <img
                src={user.profile_image}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-yellow-200 shadow"
              /> : null}
              <button
                onClick={() => navigate("/hrms/employeeDashboard")}
                title="Main Dashboard"
                className="hover:bg-yellow-100 p-2 rounded-full"
              >
                <img
                  src="/images/home.jpg"
                  alt="home Icon"
                  className="w-8 h-8"
                />
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-500 hover:bg-yellow-100 rounded-full transition-colors duration-200"
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