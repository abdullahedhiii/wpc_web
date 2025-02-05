
import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";

const JobPosting = () => {
    const columns = ["Sl. No.", "SOC Code", "Job Title", "Job Link","Vacancy","Job Location","Job Posted Date","Closing Date",
        "Email","Phone No.","Status","Action", 
    ];
    const [loading,setLoading] = useState(true);
    const [jobsPosted,setPosted] = useState([]);
    const {companyData} = useCompanyContext();
    useEffect(( ) => {
           const fetchPosted = async() => {
                   try{
                    const response = await axiosInstance.get(`/api/getJobsPosted/${companyData[0].id}`);
                    setPosted(response.data);
                   }
                   catch(err){

                   }
                   finally{
                    setLoading(false);
                   }
           };
           fetchPosted();
    },[]);
  
    return (
  
        <div className="m-16">
          <p className="text-[14px] text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Job Posted</span>
          </p>
          <DataTable
            title="Job Posted"
            fields={columns}
            data={jobsPosted}
            showEntries
            searchable
            downloadable={false}
            addMore={true}
            buttonTitle="Add New Job"
          />
        </div>
      
    );
    
};

export default JobPosting;