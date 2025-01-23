import DataTable from "../DataTable";

const RoleManagement = () => {
    const columns = [
        "Sl. No.",
        "User Id ",
        "Module Name",
        "Menu",
        "Rights",
        "Action"
      ];
    
      const data = [
        {
          "Sl. No." : 1,
        "User Id ": 123,
        "Module Name" : 'Employee',
        "Menu" : 'Employee Master',
        "Rights" : "Add",
        "Action" : "Delete",
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home <span className="text-tt"> / User Configuration</span>
          </p>
          <DataTable
            title="Role Management"
            fields={columns}
            data={data}
            showEntries
            searchable
            downloadable = {false}
            addMore = {true}
          />
        </>
      );
}

export default RoleManagement;