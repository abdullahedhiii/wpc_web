import React, { useEffect, useState } from "react";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TotalLeaveChart = ({data}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg ">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Holiday" stroke="#FFA500" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


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
  const data = [{ name: "Total H", Holiday: 5 }];

  return (
    <div className="relative">
      <p className="text-white bg-gradient-to-r from-blue-700 to-blue-900 text-2xl font-bold p-14">
        Dashboard
      </p>

      <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 rounded-sm shadow-2xl p-6 bg-white w-[90%]">
        <h2 className="text-blue-800 text-[15px] font-sm mb-6 font-semibold">{title}</h2>
        <div className={`grid gap-4 ${dashboard.length === 1 ? "grid-cols-1 place-items-center" : "md:grid-cols-3"}`}>
          {dashboard.map((item, index) => (
            <CircularProgress key={index} current={item} />
          ))}
        </div>
      </div>

      {title === "Leave Type" && (
        <div className="relative mt-[280px] rounded-sm shadow-2xl p-6 bg-white w-[90%] border-t-4 border-blue-700 mx-auto">
          <h2 className="text-blue-800 text-[15px] font-sm mb-4 font-semibold">Annual Total Leave</h2>
          <TotalLeaveChart data={data} />
        </div>
      )}
    </div>
  );
};



export default StatisticsDashboard;
