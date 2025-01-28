
import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";
const HolidayList = () => {
    const columns = [
        "Sl. No.",
        "Year",
        "Date",
        "No. of Days",
        "Holiday Description",
        "Day of Week",
        "Holiday Type",
        "Edit",
        "Delete"
      ];

    const {holidayList,fetchHolidayList} = useCompanyContext();
    
    useEffect(() => {
       fetchHolidayList();
    },[]);

    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / Holiday List</span>
          </p>
          <DataTable
            title="Holiday List"
            fields={columns}
            data={holidayList}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
            buttonTitle = "Add New Holiday List"
          />
          </div>
        </>
      );
};

export default HolidayList;