
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

    const data = [{
        "Sl. No." : 1,
         Year :2024,
         Date : '25-12-2024 - 25-12-2024' ,
        "No. of Days" :1,
        "Holiday Description" : 'Christmas daya',
        "Day of Week" : 'Wednesday',
        "Holiday Type" : 'Christmas',
        "Edit" : "Edit",
        "Delete" : "Delete"
    }];

    return (
        <>
          <div className="m-12">
          <p className="text-gray-400 mb-4 text-[12px]">
            Home <span className="text-tt"> / Holiday List</span>
          </p>
          <DataTable
            title="Holiday List"
            fields={columns}
            data={data}
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