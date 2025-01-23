import DataTable from "../DataTable";

const UserConfiguration = () => {
    const columns = [
        "Sl. No.",
        "Employee Code ",
        "Name",
        "Email",
        "Password",
        "Action"
      ];
    
      const data = [
        {
          "Sl. No." : 1,
        "Employee Code ": 'ABC',
        "Name" : 'A edhi',
        "Email" : 'sssksk@gmail.com',
        "Password" : 123,
        "Action" : "Edit",
        }
      ]; 
    
      return (
        <>
          <p className="mt-10 text-gray-400 mb-4">
            Home <span className="text-tt"> / User Configuration</span>
          </p>
          <DataTable
            title="User Configuration"
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

export default UserConfiguration;