import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useEffect,useState } from "react";
import axiosInstance from "../../../axiosInstance";

const RejectedList = () => {
    const [data,setData] = useState([]);
    const columns = ['Job Code','Job Title','Candidate','Email','Contact Number','Status','Date','Action'];
    const {companyData} = useCompanyContext();

    const fetchCandidates = async () => {
        try{
           const response = await axiosInstance.get(`/api/getCandidates/${companyData[0].id}`,{params : {status : 'Rejected'}});
           setData(response.data);
        }
        catch(err){
            console.log(err);
        }
    };
    
    useEffect(() => {
          fetchCandidates();
    },[]);
    return(
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home /<span className="text-tt"> Rejected</span>
        </p>
        <DataTable
          title="Rejected"
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

export default RejectedList;