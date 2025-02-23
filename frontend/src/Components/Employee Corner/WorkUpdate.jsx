import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";


const WorkUpdate = () => {
    const {user} = useSelector((state) => state.user); 
    const columns = ["Sl. No.","Date","From Time",
        "To Time", "Time","Remarks","Attachment"
    ];
    const [data,setData] = useState([]);

    const fetchWork = async() => {
        try{
           const response = await axiosInstance.get(`/api/getWorkUpdates/${user.employee_code}`);
           setData(response.data);
        }
        catch(err){

        }
    }

    useEffect(() => {
      fetchWork();
    },[]);
      return (
        <div className="m-16">
          <p className="text-[14px] text-gray-400 mb-4">
            Home <span className="text-tt"> / Daily Work Update</span>
          </p>
          <DataTable
            title="Daily Work Update"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable={false}
            addMore={true}
            buttonTitle = "Add Work Update"
          />
        </div>
      );
};

export default WorkUpdate;