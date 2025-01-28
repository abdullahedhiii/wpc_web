import { useEffect, useState } from "react";
import DataTable from "../../DataTable";
import axios from "axios";
import { useCompanyContext } from '../../../contexts/CompanyContext';
import axiosInstance from "../../../../axiosInstance";

const RegVisitor = () => {
  const [url, setUrl] = useState('');  
  const columns = [
    "Visitor Link"
  ];

  const { companyData } = useCompanyContext();

  useEffect(() => {
    const fetchHashKey = async () => {
      try {
        const response = await axios.get(`/api/getKey/${companyData[0].id}`);
        console.log('response of key ', response.data.key);
        const generatedUrl ='http://localhost:5173' + `/visitor/${response.data.key}`;
        console.log(generatedUrl, 'generated ');  
        setUrl(generatedUrl);  
      } catch (err) {
        console.error(err);
      }
    };
    fetchHashKey();
  }, [companyData]);  

  return (
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Visitor Link</span>
      </p>
      <DataTable
        title="Visitor Register Link"
        fields={columns}
        data={[{ 'Visitor Link': url }]}  
        showEntries
        searchable
        downloadable
      />
    </div>
  );
};

export default RegVisitor;
