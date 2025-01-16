import { useState } from "react";
import DataTable from "../Components/DataTable";

const OrganisationProfile = () => {
  const [numentries, setnumentries] = useState(10);
  const columns = [
    "Sl. No.",
    "Organisation Name",
    "Organisation Address",
    "Website",
    "Email ID",
    "Phone No.",
    "Action",
  ];
  const data = [
    {
      "Sl. No.": 1,
      "Organisation Name": "Dynamic International Service Ltd",
      "Organisation Address":
        "27 Beauchamp St, Ground Floor, Cardiff, CF11 6AX, United Kingdom",
      Website: "",
      "Email ID": "shimuldabdullah@gmail.com",
      "Phone No.": "07949592225",
      Action: "Edit",
    },
  ];

  return (
    <>
      <p className="mt-10 text-gray-400 mb-4">
        Home / <span className="text-tt">Organisation</span>
      </p>
      <div className="w-full p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <i className="la la-building text-2xl"></i>
            <h2 className="text-lg ">Organisation</h2>
          </div>

          <button
            title="Export Data"
            className="bg-background text-white w-10 h-10 border rounded-full hover:text-blue-700"
          >
            <i className="la la-download text-2xl"></i>
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="entries" className="mr-2">
              Show
            </label>
            <select
              id="entries"
              value={numentries}
              onChange={(e) => setnumentries(parseInt(e.target.value, 10))}
              className="border rounded px-2 py-1"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          <div>
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input
              id="search"
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Search here..."
            />
          </div>
        </div>

        {/*  fields={data.slice(0, numentries)} */}
        <DataTable
          columns={columns.length}
          fields={columns}
          data={data.slice(0, numentries)}
        />

        <div className="flex justify-between items-center mt-4">
          <div>
            Showing {Math.min(data.length, numentries)} of {data.length} entries
          </div>
          <div className="flex space-x-2 items-center">
            <button
              disabled
              className="px-2 py-1 border rounded text-gray-500 cursor-not-allowed"
            >
              Previous
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded-full bg-blue-500 text-white">
              1
            </button>
            <button
              disabled
              className="px-2 py-1 border rounded text-gray-500 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganisationProfile;
