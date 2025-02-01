import React, { useEffect, useState } from "react";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";
import { useNavigate } from "react-router-dom";

const CircularProgress = ({ current }) => {
  const [progress, setProgress] = useState(0);
  
  const {companyData} = useCompanyContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(current.percentage !== -1){
        const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < current.percentage) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return current.percentage;
        }
      });
    }, 10);
    return () => clearInterval(interval);
    }
  
  }, [current.percentage]);
  
  useEffect(() => {
    console.log('checking percentage')
     if(current.percentage === -1){
      console.log('setting per')
      setProgress(100);
     }
  },[current.percentage])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            background: `conic-gradient(${current.color} ${progress * 3.6}deg, #e6e6e6 0deg)`,
            mask: "radial-gradient(closest-side, transparent 60%, black 100%)",
            WebkitMask: "radial-gradient(closest-side, transparent 60%, black 100%)",
          }}
        ></div>
        <div className="absolute w-[90%] h-[90%] bg-white rounded-full"></div>
        <div className="absolute text-xl font-semibold text-gray-700">
          {current.count !== -1 ? current.count : `${progress}%`}
        </div>
      </div>

      <div className="mt-2 text-gray-600 text-center">
        {`${current.name} ${current.completed ? "(completed)" : ""}`}
      </div>
      {
        current.view_route && 
     
      <button
       className="mt-2 w-10 h-10 rounded-full flex items-center justify-center"
       style={{ backgroundColor: current.color }}
       title="view"
       onClick={() => {
        current.name === 'Profile Status'
          ? navigate(`/hrms/${current.view_route}/${companyData[0].id}`)
          : navigate(`/hrms/${current.view_route}`);
      }}
      
      >
        <img src={current.icon} alt="icon" className="w-6 h-6" />


      </button> }
      {/* <div
        className="mt-2 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: current.color }}
      >
      </div> */}
    </div>
  );
};

const StatisticsDashboard = ({ title }) => {
  const { selectedModule } = useModuleContext();
  const dashboard = selectedModule.dashboard;
  console.log("in stats ", dashboard);

  return (
    <div className="relative">
      <p className="text-white bg-gradient-to-r from-blue-700 to-blue-900 text-2xl font-bold p-14">
        Dashboard
      </p>

      <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 border-1 border-t-4 border-t-blue-800 rounded-lg shadow-2xl p-6 bg-white w-[90%]">
        <h2 className="text-blue-800 text-[15px] font-sm mb-6 font-bold">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboard.map((item, index) => (
            <CircularProgress key={index} current={item} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default StatisticsDashboard;
