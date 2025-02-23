import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";


const ApproveList  = () => {
    const [leaves,setLeaves] = useState([]);
    const columns = ['Sl. No.','Employment Type',
        'Employee Code','Name','Leave Type','From Date',
        'To Date','Date Of Application',
        'No. Of Leave','Status','Action'
    ];

    const {companyData} = useCompanyContext();
    const fetchLeaveList = async() =>{
      try{
          const response  = await axiosInstance.get(`/api/getLeavesList/${companyData[0].id}`);
          setLeaves(response.data);
          console.log(response.data);
      }
      catch(err){

      }
    };

    useEffect(() => {
        fetchLeaveList();
    },[]);
    
    return(
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home <span className="text-tt"> / Leave Request List</span>
        </p>
        <DataTable
          title="Leave Request List"
          fields={columns}
          data={leaves}
          showEntries
          searchable
          downloadable={false}
          addMore={false}
          buttonTitle = "Add New Leave Allocation"
          setData={setLeaves}
        />
      </div>
    )
};

export default ApproveList;