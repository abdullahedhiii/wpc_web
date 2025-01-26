import DataTable from "../DataTable";

const EmployeeBank = () => {
  const columns = ["Sl. No.", "Bank Namw", "Action"];
  const data = [];
  return (
    <div className="m-16">
      <p className="text-[14px] text-gray-400 mb-4">
        Home / HCM Master<span className="text-tt"> / Bank Master</span>
      </p>
      <DataTable
        title="Employee Bank"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable={false}
        addMore={true}
      />
    </div>
  );
};
