import DataTable from "../DataTable";

const BankMaster = () => {
    const columns = [
        "Sl. No.",
        "Bank Name",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Bank Name" : "DDD",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Bank Master</span>
          </p>
          <DataTable
            title="Bank Master"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
        </>
      );
};

export default BankMaster;