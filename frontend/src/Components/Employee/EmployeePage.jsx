
import DataTable from "../DataTable";
const EmployeePage = () => {
  const columns = [
    "Employee ID",
    "Employee Name",
    "DOB",
    "Mobile",
    "Email",
    "Designation",
    "Nationality",
    "NI Number",
    "Visa Expired",
    "Passport No.",
    "Address.",
    "Action"
  ];
  
  const data = [
  {  "Employee ID" : 'dd',
    "Employee Name" : 'ddddddddddddddddddddd',
    "DOB" : 'ddddddddd',
    "Mobile" : 'dddddddddd',
    "Email": 'ddddddddddddd',
    "Designation": 'ddddddddddddddddddddddddddddddddddd',
    "Nationality": '',
    "NI Number": 'dddddddd',
    "Visa Expired": '',
    "Passport No.": '',
    "Address." : '',
    "Action" : ['Edit','Delete']}
  ]
  return (
    <div className="p-6">
      <p className="mt-10 text-gray-400 mb-4">
        Home<span className="text-tt px-3">/Employee</span>
      </p>
      <DataTable
        title="Employee"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable ={false}
        addMore = {true}
        icon= 'far fa-user'
        buttonTitle="Add New Employee"
        isDashboard={true}
      />
    </div>
  );
};

export default EmployeePage;