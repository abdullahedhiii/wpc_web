import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import { useSelector } from "react-redux"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const OrganisationProfile = () => {
  const { user } = useSelector((state) => state.user); 
  const navigate = useNavigate();
  const columns = [
    "id",
    "Sl. No.",
    "Organisation Name",
    "Organisation Address",
    "Website",
    "Email ID",
    "Phone No.",
    "Action",
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await axios.get('/api/getOrganisations', {
          params: { admin_id: user.id },
        });
        console.log('api response organis' , response.data);
        if (response.data && response.data.length > 0) {
          setData([response.data]);
        } else {
          setData([]);
        }
      } catch (err) {
        setData([]); 
      }
    };

    fetchOrganisation();
  }, [user.id]);
  
  useEffect(() => {
   console.log('in effect  ',data);
  },[data]);
  return (
    <>
    <div className="p-6">
       <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Organisation</span>
      </p>
      <DataTable
        title="Organisation"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable
      />
    </div>
     
    </>
  );
};

export default OrganisationProfile;
