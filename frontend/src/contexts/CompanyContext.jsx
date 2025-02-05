import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import HolidayList from "../Components/Holiday/HolidayList";
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
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [payGroups, setpayGroups] = useState([]);
  const [annualPays, setAnnualPays] = useState([]);
  const [orgBanks, setorgBanks] = useState([]);
  const [bankSortCodes, setCodes] = useState([]);
  const [taxMasters, setTaxMasters] = useState([]);
  const [paymentTypes, setTypes] = useState([]);
  const [holidayData, setHolidays] = useState([]);
  const [holidayList, setHolidayList] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [shifts,setShifts] = useState([]);
  const [latePolicies,setPolicies] = useState([]);
  const [companyDocuments,setCompanyDocuments] = useState([]);
  const [employees,setEmployees] = useState([]); //this is for employee creation link page
  const [leaveTypes,setLeaveTypes] = useState([]);
  const [leaveRules,setLeaveRules] = useState([]);
  const [leavesAllocated,setAllocated] = useState([]);

  const fetchLeavesAllocated = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getLeavesAllocated/${id_to}`);
      if (response.status === 200) {
        setAllocated(response.data);
      }
    } catch (err) {}
  }

  const fetchLeaveRules = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getLeaveRules/${id_to}`);
      if (response.status === 200) {
        setLeaveRules(response.data);
        console.log(response.data);

      }
    } catch (err) {}
  }

  const fetchLeaveTypes = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getLeaveTypes/${id_to}`);
      if (response.status === 200) {
        setLeaveTypes(response.data);
      }
    } catch (err) {}
  }
  const fetchEmployeesLink = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getEmployees/${id_to}`);
      if (response.status === 200) {
        setEmployees(response.data);
      }
    } catch (err) {}
  };


  const fetchPolicies = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getLatePolicies/${id_to}`);
      if (response.status === 200) {
        setPolicies(response.data);
      }
    } catch (err) {}
  };


  const fetchShifts = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getShifts/${id_to}`);
      if (response.status === 200) {
        setShifts(response.data);
      }
    } catch (err) {}
  };

  const fetchVisitors = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getVisitors/${id_to}`);
      if (response.status === 200) {
        setVisitors(response.data);
      }
    } catch (err) {}
  };

  const fetchHolidayList = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getHolidayList/${id_to}`);
      //console.log(response.data , 'tax m codes');
      setHolidayList(response.data);
    } catch (err) {
      setHolidayList([]);
    }
  };

  const fetchHolidays = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getHolidayTypes/${id_to}`);
      //console.log(response.data , 'tax m codes');
      setHolidays(response.data);
    } catch (err) {
      setHolidays([]);
    }
  };

  const fetchPaymentTypes = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getPaymentTypes/${id_to}`);
      //console.log(response.data , 'tax m codes');
      setTypes(response.data);
    } catch (err) {
      setTypes([]);
    }
  };

  const fetchTaxMasters = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getTaxMasters/${id_to}`);
      //console.log(response.data , 'tax m codes');
      setTaxMasters(response.data);
    } catch (err) {
      setTaxMasters([]);
    }
  };

  const fetchCodes = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getBankCodes/${id_to}`);
      // console.log(response.data , 'sort codes');
      setCodes(response.data);
    } catch (err) {
      setCodes([]);
    }
  };

  const fetchBanks = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getCompanyBanks/${id_to}`);
      setorgBanks(response.data);
    } catch (err) {
      setorgBanks([]);
    }
  };

  const fetchAnnualPays = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getAnnualPays/${id_to}`);
      setAnnualPays(response.data);
    } catch (err) {
      setAnnualPays([]);
    }
  };

  const fetchPayGroups = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getPayGroups/${id_to}`);
      setpayGroups(response.data);
    } catch (err) {
      setpayGroups([]);
    }
  };

  const fetchTypes = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(
        `/api/getEmployeeTypes/${id_to}`
      );
      setEmployeeTypes(response.data);
    } catch (err) {
      setEmployeeTypes([]);
    }
  };

  const fetchDepartments = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getDepartments/${id_to}`);
      setDepartmentData(response.data);
    } catch (err) {
      setDepartmentData([]);
    }
  };
  const fetchDesignations = async (company_id) => {
    const id_to = company_id ? company_id : companyData[0].id;
    try {
      const response = await axiosInstance.get(`/api/getDesignations/${id_to}`);
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
        const response = await axiosInstance.get("/api/getCompanyDetails", {
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
          setCompanyDocuments(response.data.company_documents);
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
      fetchAnnualPays(response.data.id);
      fetchBanks(response.data.id);
      fetchCodes(response.data.id);
      fetchTaxMasters(response.data.id);
      fetchPaymentTypes(response.data.id);
      fetchHolidays(response.data.id);
      fetchHolidayList(response.data.id);
      fetchVisitors(response.data.id);
      fetchShifts(response.data.id);
      fetchPolicies(response.data.id);
      fetchEmployeesLink(response.data.id);
      fetchLeaveTypes(response.data.id);
      fetchLeaveRules(response.data.id);
      fetchLeavesAllocated(response.data.id);

    } catch (err) {
      console.log("errorr ", err);
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
        fetchPayGroups,
        fetchAnnualPays,
        annualPays,
        fetchBanks,
        orgBanks,
        fetchCodes,
        bankSortCodes,
        taxMasters,
        fetchTaxMasters,
        paymentTypes,
        fetchPaymentTypes,
        fetchHolidays,
        holidayData,
        fetchHolidayList,
        holidayList,
        visitors,
        fetchVisitors,
        shifts,
        fetchShifts,
        latePolicies,
        fetchPolicies,
        companyDocuments,
        employees,
        fetchEmployeesLink,
        fetchLeaveTypes,
        leaveTypes,leaveRules,fetchLeaveRules,leavesAllocated,fetchLeavesAllocated
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
