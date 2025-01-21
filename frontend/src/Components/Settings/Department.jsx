import DataTable from "../DataTable";

const Department = () => {
    const columns = [
        "Sl. No.",
        "Department Name",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Department Name" : "DDD",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Department</span>
          </p>
          <DataTable
            title="Department"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable
          />
        </>
      );
};

export default Department;