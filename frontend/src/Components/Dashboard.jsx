import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModuleContext } from '../contexts/ModuleContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { modules, setSelectedModule } = useModuleContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(modules) && modules.length > 0) {
      setIsLoading(false);
    }
  }, [modules]);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    navigate(`/hrms/${module.next_route}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading modules...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-6">
      {modules.map((module) => (
        <button
          key={module.id}
          className="bg-background text-white shadow-md flex flex-col items-center hover:bg-purple-500 justify-center p-12"
          onClick={() => handleModuleSelect(module)}
        >
          <i className={`la ${module.icon} text-4xl mb-4`}></i>
          <img src= {module.icon_image} className='mb-4 h-12 w-12'/>
          <p className="text-center text-lg font-semibold">{module.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
