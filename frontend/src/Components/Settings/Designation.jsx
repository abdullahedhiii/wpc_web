import DataTable from "../DataTable";

const Designation = () => {
    const columns = [
        "Sl. No.",
        "Department Name",
        "Designation",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Department Name" : "DDD",
           "Designation" : "HR",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Designation</span>
          </p>
          <DataTable
            title="Designation"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable
          />
        </>
      );
};

export default Designation;