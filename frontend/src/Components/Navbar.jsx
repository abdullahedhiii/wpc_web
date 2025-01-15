import React from 'react';

const Navbar = () => {
  return (
    <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex-grow">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="w-24 h-auto ml-20"  
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
