
import React, { useEffect, useState } from "react";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight, Eye, TrendingUp, Calendar, Users, Clock, ArrowRight } from 'lucide-react';

const TotalLeaveChart = ({data}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-white/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Leave Overview</h3>
          <p className="text-sm text-gray-500">Annual statistics</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
          <TrendingUp className="w-4 h-4 text-yellow-600" />
          <span className="text-sm text-yellow-600 font-medium">+15% vs last year</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorHoliday" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip 
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
            }}
          />
          <Area 
            type="monotone" 
            dataKey="Holiday" 
            stroke="#EAB308" 
            fillOpacity={1} 
            fill="url(#colorHoliday)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CircularProgress = ({ current }) => {
  const [progress, setProgress] = useState(0);
  const { companyData } = useCompanyContext();
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
    if(current.percentage === -1){
      setProgress(100);
    }
  },[current.percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-white/50 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-yellow-400" >
            <img src={current.icon || "/placeholder.svg"} alt="icon" className="w-6 h-6 bg-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{current.name}</h3>
            <p className="text-sm text-gray-500">
              {current.completed ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-square mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#f1f5f9"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke={current.color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.827}, 282.7`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-gray-800">
            {current.count !== -1 ? current.count : `${progress}%`}
          </span>
          {current.count !== -1 && (
            <span className="text-sm text-gray-500">Total</span>
          )}
        </div>
      </div>

      {current.view_route && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          style={{ 
            backgroundColor: `${current.color}20`,
            color: current.color
          }}
          onClick={() => {
            current.name === 'Profile Status'
              ? navigate(`/hrms/${current.view_route}/${companyData[0].id}`)
              : navigate(`/hrms/${current.view_route}`);
          }}
        >
          <span className="font-medium">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

const StatisticsDashboard = ({ title }) => {
  const { selectedModule } = useModuleContext();
  const dashboard = selectedModule.dashboard;
  const data = [
    { name: "Jan", Holiday: 3 },
    { name: "Feb", Holiday: 4 },
    { name: "Mar", Holiday: 5 },
    { name: "Apr", Holiday: 3 },
    { name: "May", Holiday: 7 },
    { name: "Jun", Holiday: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative h-64 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-b-[3rem] shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative px-8 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Statistics Dashboard
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

            <div className="container mx-auto px-6 -mt-32 relative z-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
          <div className={`grid gap-6 ${dashboard.length === 1 ? "grid-cols-1 place-items-center" : "md:grid-cols-3"}`}>
            {dashboard.map((item, index) => (
              <CircularProgress key={index} current={item} />
            ))}
          </div>
        </motion.div>

        {title === "Leave Type" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TotalLeaveChart data={data} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StatisticsDashboard;