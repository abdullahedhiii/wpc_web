import { useEffect } from "react";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import DataTable from "../../DataTable";


const OffDay = () => {
    const columns = ['Department','Designation','Shift Name','Sunday',
                     'Monday' ,'Tuesday','Wednesday','Thursday',
                     'Friday','Saturday','Action'
    ];

    const {shifts,fetchShifts} = useCompanyContext();
    console.log(shifts);
    const filteredShifts = shifts.filter((shift) => {
        return Object.keys(shift['Off Days']).length > 0; 
    });

    const mappedShifts = filteredShifts.map((shift) => ({
      Department: shift.Department || "-",
      Designation: shift.Designation || "-",
      "Shift Name": shift["Shift Name"] || "-",
      Sunday: shift["Off Days"]["Sunday"] ? "Off" : "Working",
      Monday: shift["Off Days"]["Monday"] ? "Off" : "Working",
      Tuesday: shift["Off Days"]["Tuesday"] ? "Off" : "Working",
      Wednesday: shift["Off Days"]["Wednesday"] ? "Off" : "Working",
      Thursday: shift["Off Days"]["Thursday"] ? "Off" : "Working",
      Friday: shift["Off Days"]["Friday"] ? "Off" : "Working",
      Saturday: shift["Off Days"]["Saturday"] ? "Off" : "Working",
      Action: "", 
    }));
  
    useEffect(() => {
     fetchShifts();
    },[]);
    return(
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home <span className="text-tt"> / Day Off</span>
        </p>
        <DataTable
          title="Day Off"
          fields={columns}
          data={mappedShifts}
          showEntries
          searchable
          downloadable={false}
          addMore={true}
          buttonTitle = "Add OffDay"
        />
      </div>
    )
};

export default OffDay;