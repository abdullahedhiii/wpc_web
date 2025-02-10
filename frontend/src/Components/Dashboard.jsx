import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModuleContext } from '../contexts/ModuleContext';
import { useCompanyContext } from '../contexts/CompanyContext';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { modules, setSelectedModule } = useModuleContext();
  const [isLoading, setIsLoading] = useState(true);
  const {companyData} = useCompanyContext();
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    if (Array.isArray(modules) && modules.length > 0) {
      setIsLoading(false);
    }
  }, [modules]);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    module.name === 'Payroll' ? navigate(from) : navigate(`/hrms/${module.next_route}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading modules...</p>
      </div>
    );
  }

  return (
    <>
    <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-6">
      {modules.map((module) => (
        <button
          key={module.id}
          className="bg-background text-white shadow-md flex flex-col items-center justify-center p-10"
          onClick={() => handleModuleSelect(module)}
          disabled={user.isAdmin ? false : !module.can_access}        
          >
          <i className={`la ${module.icon} text-4xl mb-4`}></i>
          <img src= {module.icon_image} className='mb-4 h-12 w-12'/>
          <p className="text-center text-lg font-semibold">{module.name}</p>
        </button>
      ))}
    </div>
    <div className='mt-0.5 p-2 bg-gray-700 text-white text-center'>© 2025 WorkPermitCloud | All Right Reserved</div>

    </>
  );
};

export default Dashboard;
