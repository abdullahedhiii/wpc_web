import DataTable from "../DataTable";

const AnnualPay = () => {
    const columns = [
        "Sl. No.",
        "Annual Pay ",
        "Action",
      ];
    
      const data = [
        {
           "Sl. No." : 1,
           "Annual Pay" : "DDD",
           "Action" : "Edit"
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home / HCM Master<span className="text-tt"> / Annual Pay</span>
          </p>
          <DataTable
            title="Annual Pay"
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

export default AnnualPay;