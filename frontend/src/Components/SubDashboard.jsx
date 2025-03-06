import { useLocation, useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";
import { motion } from "framer-motion";
import { Calendar, FileText, Download, CheckCircle, ChevronRight, ExternalLink, FileDown } from 'lucide-react';

const BlankReportCard = ({ title, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      <div className="p-3 bg-yellow-100 rounded-lg">
        <FileText className="w-6 h-6 text-yellow-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500">Click to download</p>
      </div>
      <FileDown className="w-5 h-5 text-yellow-600" />
    </motion.a>
  );
};

const FeatureCard = ({ feature, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <img src={feature.icon || "/placeholder.svg"} className="w-6 h-6" alt={feature.name} />
          </div>
          {feature.completed && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
          {feature.count >= 0 && (
            <div className="text-2xl font-bold text-gray-800">{feature.count}</div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{feature.name}</h3>
        {feature.view_route && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (feature.view_route === 'https://www.gov.uk/calculate-your-holiday-entitlement') {
                window.open(feature.view_route, "_blank");
              } else {
                navigate(`/hrms/${feature.view_route}`);
              }
            }}
            className="w-full py-3 px-4 bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
          >
            {feature.view_route.startsWith('https') ? (
              <>
                <span>Visit External Link</span>
                <ExternalLink className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const SubDashboard = () => {
  const { selectedModule } = useModuleContext();
  const location = useLocation();
  const navigate = useNavigate();
  const dashboard = selectedModule.dashboard;
  const isDocuments = location.pathname.includes('documentsdashboard');

  const blankReports = [
    {
      title: "Staff Report Template",
      href: "/sample_documents/staffreport.pdf"
    },
    {
      title: "Contract Template",
      href: "/sample_documents/contract.pdf"
    },
    {
      title: "Employee Report Template",
      href: "/sample_documents/employeereport.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-b-[3rem] shadow-lg pt-12 pb-32">
          <div className="container mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Dashboard
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-yellow-100"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </motion.div>
          </div>
        </div>

                {isDocuments && (
          <div className="container mx-auto px-6">
            <div className="relative -mt-16 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Download className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Blank Reports</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {blankReports.map((report, index) => (
                    <BlankReportCard
                      key={index}
                      title={report.title}
                      href={report.href}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

                <div className="container mx-auto px-6 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboard.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDashboard;