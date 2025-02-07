import { useLocation, useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SubDashboard = () => {
  const { selectedModule } = useModuleContext();
  const location = useLocation();
  const navigate = useNavigate();
  const dashboard = selectedModule.dashboard;
  const isDocuments = location.pathname.includes('documentsdashboard') ? true : false;
  console.log(location,isDocuments);
  return (
    <>
    <div className={`text-white bg-gradient-to-r from-blue-700 to-blue-500 ${isDocuments ? "flex justify-between items-center" : ""}`}>
  <p className="p-12 text-2xl">Dashboard</p>
  {isDocuments && (
    <div className="flex space-x-3 mr-4 ">
      <button className="border border-white bg-blue-900 rounded px-2 py-1 text-sm h-auto self-start shrink-0">
        <a href="/sample_documents/staffreport.pdf" target="_blank">Blank Staff Report</a>
        </button>
      <button className="border border-white bg-blue-900 rounded px-2 py-1 text-sm h-auto self-start shrink-0">
      <a href="/sample_documents/contract.pdf" target="_blank">Blank Contract</a>
      </button>
      <button className="border border-white bg-blue-900 rounded px-2 py-1 text-sm h-auto self-start shrink-0">
      <a href="/sample_documents/employeereport.pdf" target="_blank">Blank Employee Report</a>
        </button>
    </div>
  )}
</div>

     
      <div className="min-h-screen bg-white p-6">
        <div className="relative top-[-86px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-12">
          {dashboard.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between p-4 rounded-md shadow-lg text-white bg-${feature.color}-700`}
            >
              <div className="flex justify-between items-center">
                <img src={feature.icon} className="w-8 h-8" />
                {feature.completed && (
                  <FaCheckCircle className="text-green-200 text-xl" />
                )}
                {feature.count && feature.count >= 0 ? (
                  <p className="text-white text-2xl">{feature.count}</p>
                ) : null}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium">{feature.name}</span>
                { feature.view_route && <img
                  src="/images/login.png"
                  className="w-6 h-6 cursor-pointer"
                  
                  onClick={() => {
                    if (
                      feature.view_route ===
                      'https://www.gov.uk/calculate-your-holiday-entitlement'
                    ) {
                      window.open(feature.view_route, "_blank");
                    } else {
                      navigate(`/hrms/${feature.view_route}`);
                    }
                  }}
                />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubDashboard;
