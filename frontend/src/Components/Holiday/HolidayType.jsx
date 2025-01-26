import { useEffect,useState } from "react";
import DataTable from "../DataTable";
import { useCompanyContext } from "../../contexts/CompanyContext";

const HolidayType = () => {
    const columns = [
        "Sl. No.",
        "Holiday Type",
        "Action",
      ];

    const {holidayData,fetchHolidays} = useCompanyContext();
    useEffect(() => {
        fetchHolidays();
    },[]); 

    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / Holiday Type</span>
          </p>
          <DataTable
            title="Holiday Type"
            fields={columns}
            data={holidayData}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Add New Holiday Type"
          />
          </div>
        </>
      );
};

export default HolidayType;