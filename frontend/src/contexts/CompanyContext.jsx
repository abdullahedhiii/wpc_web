import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
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

  const [departmentData, setDepartmentData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [employeeTypes,setEmployeeTypes] = useState([]);
  const [payGroups,setpayGroups] = useState([]);

  const fetchPayGroups = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axios.get(`/api/getPayGroups/${id_to}`);
      setpayGroups(response.data);
    } catch (err) {
      setpayGroups([]);
    }
  }

  const fetchTypes = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axios.get(`/api/getEmployeeTypes/${id_to}`);
      setEmployeeTypes(response.data);
    } catch (err) {
      setEmployeeTypes([]);
    }
  };

  const fetchDepartments = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axios.get(`/api/getDepartments/${id_to}`);
      setDepartmentData(response.data);
    } catch (err) {
      setDepartmentData([]);
    }
  };
  const fetchDesignations = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axios.get(`/api/getDesignations/${id_to}`);
    //  console.log(response.data);
      setDesignationData(response.data);
    } catch (err) {
      console.error(err, "designation");
      setDesignationData([]);
    }
  };

  const fetchDetails = async (company_id) => {
    try {
      if (company_id) {
        const response = await axios.get("/api/getCompanyDetails", {
          params: { id: company_id },
        });
        if (response.data) {
          setAllDetails([response.data.allData]);
          setCompanyDetails(filterByPrefix(response.data.allData, "Company_"));
          setRtiDetails([filterByPrefix(response.data.allData, "RTI_")]);
          setAuthorizingDetails([
            filterByPrefix(response.data.allData, "Authorizing_"),
          ]);
          setKeyContactDetails([
            filterByPrefix(response.data.allData, "KeyContact_"),
          ]);
          setAddressDetails([
            filterByPrefix(response.data.allData, "Address_"),
          ]);
          setLevel1Details([filterByPrefix(response.data.allData, "Level1_")]);
        }
      }
    } catch (err) {
      console.log("Error fetching pre set form details", err);
    }
  };

  const fetchOrganisation = async (admin_id) => {
    try {
      const response = await axiosInstance.get("/api/getOrganisations", {
        params: { admin_id },
      });
  
      setCompanyData([response.data]);
      fetchDetails(response.data.id);
      fetchDepartments(response.data.id);
      fetchDesignations(response.data.id);
      fetchTypes(response.data.id);
      fetchPayGroups(response.data.id);
    } catch (err) {
      console.log('errorr ',err);
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
        departmentData,
        fetchDepartments,
        setDepartmentData,
        designationData,
        fetchDesignations,
        employeeTypes,
        fetchTypes,
        payGroups,
        setpayGroups,
        fetchPayGroups
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
