import DataTable from "../DataTable";

const PayGroup = () => {
    const columns = [
        "Sl. No.",
        "Pay Group ",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Pay Group" : "DDD",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Pay Group</span>
          </p>
          <DataTable
            title="Pay Group"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable
          />
        </>
      );
};

export default PayGroup;