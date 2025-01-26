import DataTable from "../DataTable";

const PayItem = () => {
    const columns = [
        "Sl. No.",
        "Head",
        "In percent",
        "In Rupees",
        "Min Value",
        "Max Value",
        "Effective from",
        "Effective to",
        "Action",
    ];
    const data = [];
    return(
        <div className="m-12">
        <p className="text-gray-400 mb-4 text-[12px]">
          Home / HCM Master<span className="text-tt"> /Pay Item</span>
        </p>
        <DataTable
          title="Pay Item"
          fields={columns}
          data={data}
          showEntries
          searchable
          downloadable = {false}
          addMore = {false}
        />
        </div> 

    );
};

export default PayItem;