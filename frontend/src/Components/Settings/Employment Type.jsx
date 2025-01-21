import DataTable from "../DataTable";

const EmploymentType = () => {
    const columns = [
        "Sl. No.",
        "Employment Type ",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Employment Type" : "DDD",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Employment Type</span>
          </p>
          <DataTable
            title="Employment Type"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable
          />
        </>
      );
};

export default EmploymentType;