import { useEffect, useState } from "react";
import DataTable from "../DataTable";
import {useCompanyContext} from '../../contexts/CompanyContext';
import axiosInstance from "../../../axiosInstance";
const ChangeOfCircumstances = () => {
    //fetch COC dataaa
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const {companyData} = useCompanyContext();
    useEffect(() => {
       const fetchData = async () => {
            try{
                console.log('coc table');

            const response  = await axiosInstance.get(`/api/getCOCTable/${companyData[0].id}`);
            setData(response.data);
            console.log(response.data,'coc table');
            }
            catch(err){
           console.log(err);
            }
            finally{
                setLoading(false);
            }

       };
       fetchData();
    },[]);

    const columns = [
        "Updated Date",
        "Employment Type",
        "Employee ID",
        "Name Of Member Of The Staff",
        "Job Title",
        "Address",
        "Contact Number",
        "Nationality",
        "BRP Number",
        "Visa Expired",
        "Remarks/Restriction to work",
        "Passport No",
        "ESUS Details",
        "DBS Details",
        "National Id Details",
        "Other Documents",
        "Are Sponsored migrants aware that they must inform[HR/line manager] promptly of changes in contact Details?",
        "Are Sponsore migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview(In applicable cases)?",
        "Action"
      ];

    return (
        <>
         {
            loading ? <p>loading dataa</p>
            :   <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / Change of Circumstances</span>
          </p>
          <DataTable
            title="Change of Circumstances"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Change of Circumstances"
          />
          </div>
         }
       
        </>
      );
}

export default ChangeOfCircumstances;