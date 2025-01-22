import { useLocation } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SubDashboard = () => {
    const {selectedModule} = useModuleContext();

    const dashboard = selectedModule.dashboard;
    return (
        <>
        <p className="w-full p-8 text-white bg-background text-2xl">Dashboard</p>
        <div className="min-h-screen bg-white p-6">
          <div className="relative top-[-86px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-12">
            {dashboard.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between p-4 rounded-md shadow-lg text-white bg-${feature.color}-700`}
              >
                <div className="flex justify-between items-center">
                  <i className="la la-user text-4xl"></i>
                  {feature.completed && <FaCheckCircle className="text-green-200 text-xl" />}
                  {feature.count && feature.count >= 0 ?  <p className="text-white text-2xl">{feature.count}</p> : null}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-medium">{feature.name}</span>
                  <FaArrowRight className="text-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>   
        </>
     
      );
}

export default SubDashboard;