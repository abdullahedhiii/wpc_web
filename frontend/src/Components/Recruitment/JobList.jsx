
import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";

const JobList = () => {
    const columns = ["Sl. No.", "SOC CODE", "Job Title", "Action"];
    const [loading,setLoading] = useState(true);
    const [jobsListed,setListed] = useState([]);
    const {companyData} = useCompanyContext();
    useEffect(( ) => {
           const fetchListed = async() => {
                   try{
                    const response = await axiosInstance.get(`/api/getJobsListed/${companyData[0].id}`);
                    setListed(response.data);
                   }
                   catch(err){

                   }
                   finally{
                    setLoading(false);
                   }
           };
           fetchListed();
    },[]);
  
    return (
      loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="m-16">
          <p className="text-[14px] text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Job List</span>
          </p>
          <DataTable
            title="Job List"
            fields={columns}
            data={jobsListed}
            showEntries
            searchable
            downloadable={false}
            addMore={true}
            buttonTitle="Add New Job List"
          />
        </div>
      )
    );
    
};

export default JobList;