import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user); 
  const [companyData, setCompanyData] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  
  const [companyDetails, setCompanyDetails] = useState({});
  const [rtiDetails, setRtiDetails] = useState([]);
  const [authorizingDetails, setAuthorizingDetails] = useState([]);
  const [keyContactDetails, setKeyContactDetails] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [level1Details, setLevel1Details] = useState([]);
  
  const fetchDetails = async (company_id) => {
    try {
      if (company_id) {
        console.log("sending id", company_id);
        const response = await axios.get("/api/getCompanyDetails", {
          params: { id: company_id },
        });
        console.log(response.data);
        if (response.data) {
          setAllDetails([response.data.allData]);
          setCompanyDetails(filterByPrefix(response.data.allData, "Company_"));
          setRtiDetails([filterByPrefix(response.data.allData, "RTI_")]);
          setAuthorizingDetails([filterByPrefix(response.data.allData, "Authorizing_")]);
          setKeyContactDetails([filterByPrefix(response.data.allData, "KeyContact_")]);
          setAddressDetails([filterByPrefix(response.data.allData, "Address_")]);
          setLevel1Details([filterByPrefix(response.data.allData, "Level1_")]);
        }
      }
    } catch (err) {
      console.log("Error fetching pre set form details", err);
    }
  };

  const fetchOrganisation = async (admin_id) => {
    console.log("Sending request to fetch organisation", admin_id);
    try {
      const response = await axios.get("/api/getOrganisations", {
        params: { admin_id },
      });
      console.log("API response organis", response.data);
      console.log("Setting data");
      setCompanyData([response.data]);
      
      fetchDetails(response.data.id)
    } catch (err) {
      setCompanyData([]);
    }
  };


  const filterByPrefix = (data, prefix) => {
    return Object.keys(data)
      .filter((key) => key.startsWith(prefix))
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
  };

  return (
    <CompanyContext.Provider
      value={{
        fetchOrganisation,
        companyData,
        setAllDetails,
        allDetails,
        companyDetails,
        rtiDetails,
        authorizingDetails,
        keyContactDetails,
        addressDetails,
        level1Details,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
