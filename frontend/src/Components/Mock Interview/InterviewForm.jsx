
import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const InterviewForm = () => {
    const columns = [
        "Sl. No.",
        "Job Title",
        "Form Name",
        "Industry",
        "Scaling",
        "No. of Questions",
        "Action"
    ];

    


    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / Interview Form</span>
          </p>
          <DataTable
            title="Interview Form"
            fields={columns}
            data={[]}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Add New Interview Form"
          />
          </div>
        </>
      );
};

export default InterviewForm;