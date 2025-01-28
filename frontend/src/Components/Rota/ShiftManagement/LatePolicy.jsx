
import { useEffect } from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";
const LatePolicy = () =>{
    const columns = ['Department','Designation','Shift Code','Max Grace Period','No. of Days Allowed','No. of Day Salary Deducted','Action'];
    const {latePolicies,fetchPolicies} = useCompanyContext();
    console.log(latePolicies);
    useEffect(() => {
      fetchPolicies();
    },[]);

    return (
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home <span className="text-tt"> / Late Policy</span>
        </p>
        <DataTable
          title="Late Policy"
          fields={columns}
          data={latePolicies}
          showEntries
          searchable
          downloadable={false}
          addMore={true}
          buttonTitle = "Add Late Policy"
        />
      </div>
    )
}

export default LatePolicy;