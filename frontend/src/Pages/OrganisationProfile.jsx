import DataTable from "../Components/DataTable";

const OrganisationProfile = () => {
  return (
    <>
      <p className="text-gray-400">Home /   <span className="text-tt">Organisation</span></p>
      <DataTable
         columns={6}
         fields={['a','b','c','d','e','f']}
      />
    </>
  );
};

export default OrganisationProfile;
