import { useState } from "react";
import DataTable from "../Components/DataTable";

const OrganisationProfile = () => {
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
      <DataTable
        title="Organisation"
        fields={columns}
        data={data}
        showEntries
        searchable
        downloadable
      />
    </>
  );
};

export default OrganisationProfile;
