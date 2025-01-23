import React, { createContext, useContext, useState } from "react";

const ModuleContext = createContext();
import axios from 'axios';

export const ModuleProvider = ({ children }) => {
  const [selectedModule,setSelectedModule] = useState(null);
  const [selectedFeature,setSubFeature] = useState(null);

  const [modules,setModules] = useState(null);

  const fetchModules = async () => {
       try{
          const response = await axios.get('/api/getModules');
          setModules(response.data);
       }
       catch(err){
          console.log('error fetching modules');
       }
  };

    return (
      <ModuleContext.Provider 
          value={{
            modules,
            setSelectedModule,
            selectedModule,
            fetchModules,
            setSubFeature,
            selectedFeature
          }}
      >
        {children}
      </ModuleContext.Provider>
    );
};
  
  export const useModuleContext = () => useContext(ModuleContext);