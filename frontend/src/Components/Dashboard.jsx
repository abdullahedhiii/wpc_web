
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useModuleContext } from "../contexts/ModuleContext"
import { useCompanyContext } from "../contexts/CompanyContext"
import { useSelector } from "react-redux"

const Dashboard = () => {
  const navigate = useNavigate()
  const { modules, setSelectedModule, setSubFeature, setSubModule } = useModuleContext()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (Array.isArray(modules) && modules.length > 0) {
      setIsLoading(false)
    }
  }, [modules])
  
  const handleModuleSelect = (module) => {
    try{
    setSelectedModule(module)
    setSubFeature(null)
    setSubModule(null)
    navigate(`/hrms/${module.next_route}`)
    }
  catch(err){
  }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading modules...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your HR Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your organisation efficiently with our comprehensive suite of HR tools.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {modules.map((module) => module.can_access || user.isAdmin ? (
            <button
              key={module.id}
              onClick={() => handleModuleSelect(module)}
              disabled={user.isAdmin ? false : !module.can_access}
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-300 
                ${
                  user.isAdmin || module.can_access
                    ? "hover:shadow-xl hover:-translate-y-2 hover:bg-yellow-50"
                    : "opacity-60 "
                }
                shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2`}
            >
              <div className="relative flex flex-col items-center text-center">
                {module.count > 0 && (
                  <span className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {module.count}
                  </span>
                )}

                <div className="w-16 h-16 mb-4 rounded-full bg-yellow-400 flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                  <img
                    src={module.icon_image || "/placeholder.svg"}
                    alt={module.name}
                    className="w-8 h-8 text-yellow-500"
                  />
                </div>

                <h3
                  className={`text-sm font-medium
                  ${user.isAdmin || module.can_access ? "text-gray-700" : "text-gray-400"}`}
                >
                  {module.name}
                </h3>

                {!(user.isAdmin || module.can_access) && (
                  <span className="absolute top-2 right-2 text-gray-400 text-lg">
                    <i className="las la-lock"></i>
                  </span>
                )}
              </div>
            </button>
          ) : null)}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} WorkPermitCloud | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard