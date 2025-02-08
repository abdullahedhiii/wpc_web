import React, { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [selectedModule,setSelectedModule] = useState(null);
  const [selectedFeature,setSubFeature] = useState(null);
  const [modules,setModules] = useState(null);

  const fetchModules = async (id,isAdmin) => {
       try{
          const response = await axios.get(`/api/getModules/${id}`, {params : {isAdmin : isAdmin}}) ;
          setModules(response.data);
          console.log(response.data);
       }
       catch(err){
          console.log('error fetching modules',err);
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