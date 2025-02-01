
import DataTable from "../DataTable";
const JobList = () => {
    const columns = ["Sl. No.", "SOC CODE", "Job Title", "Action"];

  
    return (
      <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home / HCM Master<span className="text-tt"> / Job List</span>
        </p>
        <DataTable
          title="Job List"
          fields={columns}
          data={[]}
          showEntries
          searchable
          downloadable={false}
          addMore={true}
          buttonTitle = "Add New Job List"
        />
      </div>
    );
};

export default JobList;