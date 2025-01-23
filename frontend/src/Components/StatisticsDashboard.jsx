import React, { useEffect, useState } from "react";
import { useModuleContext } from "../contexts/ModuleContext";

const CircularProgress = ({ current }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
  }, [current.percentage]);

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
      <div
        className="mt-2 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: current.color }}
      >
        <img src={current.icon} alt="icon" className="w-6 h-6" />
      </div>
    </div>
  );
};

const StatisticsDashboard = ({ title }) => {
  const { selectedModule } = useModuleContext();
  const dashboard = selectedModule.dashboard;

  return (
    <>
      <p className="p-14 text-white bg-gradient-to-r from-blue-700 to-blue-900 text-2xl">
        Dashboard
      </p>
      <div className="relative top-[-124px] m-24 border-t-4 border-background rounded-lg shadow-lg p-6">
        <h2 className="text-blue-800 text-lg font-sm mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboard.map((item, index) => (
            <CircularProgress key={index} current={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StatisticsDashboard;
