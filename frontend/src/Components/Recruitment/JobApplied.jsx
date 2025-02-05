import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import axiosInstance from "../../../axiosInstance";

const JobApplied = () => {
    const [data,setData] = useState([]);
    const columns = ['Job Code','Job Title','Candidate','Email','Contact Number','Status','Date','Action'];
    const {companyData} = useCompanyContext();

    const fetchCandidates = async () => {
        try{
           const response = await axiosInstance.get(`/api/getCandidates/${companyData[0].id}`,{params : {status : 'Applied'}});
           setData(response.data);
        }
        catch(err){

        }
    };
    
    useEffect(() => {
          fetchCandidates();
    },[]);
    return(
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home /<span className="text-tt"> / Job Applied</span>
        </p>
        <DataTable
          title="Job Applied"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
        />
      </div>
    )
    
};

export default JobApplied;