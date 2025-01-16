import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const Modules = [
    { id: 1, name: 'Organisation Profile', icon: 'la-building' },
    { id: 2, name: 'Settings', icon: 'la-cogs' },
    { id: 3, name: 'Recruitment', icon: 'la-user-plus' },
    { id: 4, name: 'Employee', icon: 'la-users' },
    { id: 5, name: 'User Access', icon: 'la-user-shield' },
    { id: 6, name: 'Organogram Chart', icon: 'la-sitemap' },
    { id: 7, name: 'Holiday Management', icon: 'la-calendar' },
    { id: 8, name: 'Leave Management', icon: 'la-calendar-times' },
    { id: 9, name: 'Rota', icon: 'la-clock' },
    { id: 10, name: 'Attendance', icon: 'la-check-circle' },
    { id: 11, name: 'Leave Approver', icon: 'la-thumbs-up' },
    { id: 12, name: 'Payroll', icon: 'la-dollar-sign' },
    { id: 13, name: 'Billing', icon: 'la-credit-card' },
    { id: 14, name: 'Documents', icon: 'la-file-alt' },
    { id: 15, name: 'Sponsor Compliance', icon: 'la-check-square' },
    { id: 16, name: 'Employee Corner', icon: 'la-user-circle' },
    { id: 17, name: 'Tasks', icon: 'la-tasks' },
  ];

  return (
    <div className="grid gap-0.5 p-4 sm:grid-cols-2 lg:grid-cols-6">
      {Modules.map((module) => (
        <button
          key={module.id}
          className="bg-background text-white shadow-md flex flex-col items-center hover:bg-purple-500 justify-center p-6"
          onClick={() => navigate(`/hcms/${module.name.replace(/\s+/g, '-')}`)}
        >
          <i className={`la ${module.icon} text-4xl mb-4`}></i>
          <p className="text-center text-lg font-semibold">{module.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
