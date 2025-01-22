import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModuleContext } from '../contexts/ModuleContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { modules, setSelectedModule } = useModuleContext();
   
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    navigate(`/hcms/${module.next_route}`);
  }

  return (
    <div className="grid gap-0.5 p-4 sm:grid-cols-2 lg:grid-cols-6">
      {modules.map((module) => (
        <button
          key={module.id}
          className="bg-background text-white shadow-md flex flex-col items-center hover:bg-purple-500 justify-center p-6"
          onClick={() => handleModuleSelect(module)} 
        >
          <i className={`la ${module.icon} text-4xl mb-4`}></i>
          <p className="text-center text-lg font-semibold">{module.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
