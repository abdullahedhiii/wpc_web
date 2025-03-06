import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [profileData, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/fetchMyProfile/${user.employee_code}`, {
        params: { user_id: user.id }
      });
      setData(response.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (profileData === null) return null;

  const InfoCard = ({ title, icon, children }) => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="bg-yellow-300 px-6 py-4 flex items-center space-x-2">
        <i className={`${icon} text-white text-xl`}></i>
        <h5 className="text-xl font-semibold text-white">{title}</h5>
      </div>
      <div className="p-6 space-y-2">{children}</div>
    </div>
  );

  const InfoItem = ({ label, value }) => (
    <p className="text-sm">
      <span className="font-medium text-gray-600">{label}:</span>{" "}
      <span className="text-yellow-600">{value}</span>
    </p>
  );

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 min-h-screen p-6">
      <div className="bg-gradient-to-r from-yellow-300 to-yellow-200 p-8 text-white rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{profileData.profile_details.name}</h1>
        <p className="flex items-center space-x-2">
          <span>&#128188;</span>
          <span>{profileData.profile_details.department}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span>&#128187;</span>
          <span>{profileData.profile_details.designation}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span>&#128222;</span>
          <span>{profileData.profile_details.phone}</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <InfoCard title="Profile Details" icon="fas fa-user ">
            <InfoItem label="Employee Code" value={profileData.profile_details.employee_code} />
            <InfoItem label="Date Of Birth" value={profileData.profile_details.dob} />
          </InfoCard>

          <InfoCard title="Service Details" icon="fas fa-briefcase">
            <InfoItem label="Date Of Joining" value={profileData.service_details.start} />
            <InfoItem label="Employment Type" value={profileData.service_details.type} />
          </InfoCard>

          <InfoCard title="Address Details" icon="fas fa-map-marker-alt">
            <InfoItem label="Address Line 1" value={profileData.address_details.line1} />
            <InfoItem label="City / County" value={profileData.address_details.city_county} />
            <InfoItem label="City Post Code" value={profileData.address_details.post_code} />
            <InfoItem label="City/Country" value={profileData.address_details.country} />
          </InfoCard>

          <InfoCard title="Immigration Details" icon="fas fa-passport">
            <InfoItem label="National ID No" value={profileData.immigration_details.national_id} />
            <InfoItem label="Nationality" value={profileData.immigration_details.nationality} />
            <InfoItem label="Passport No" value={profileData.immigration_details.passport_no} />
            <InfoItem label="Passport Issued" value={profileData.immigration_details.passport_issued} />
            <InfoItem label="Passport Expiry" value={profileData.immigration_details.passport_expiry} />
            <InfoItem label="Passport Issued By" value={profileData.immigration_details.passport_by} />
            <InfoItem label="Passport Eligible Review Date" value={profileData.immigration_details.passport_review} />
            <InfoItem label="Visa Issued" value={profileData.immigration_details.visa_issued} />
            <InfoItem label="Visa Expiry" value={profileData.immigration_details.visa_expiry} />
            <InfoItem label="Visa Issued By" value={profileData.immigration_details.visa_by} />
            <InfoItem label="Visa Eligible Review Date" value={profileData.immigration_details.visa_review} />
          </InfoCard>
        </div>

        <div className="space-y-8">
          <InfoCard title="Pay Details" icon="fas fa-money-bill-wave">
                      </InfoCard>

          <InfoCard title="Bank Details" icon="fas fa-university">
            <InfoItem label="Bank Name" value={profileData.bank_details.bank_name} />
            <InfoItem label="Sort Code" value={profileData.bank_details.sort_code} />
            <InfoItem label="Branch Name" value={`${profileData.bank_details.bank_name} ${profileData.bank_details.branch_name}`} />
            <InfoItem label="A/C No#" value={profileData.bank_details.account_no} />
          </InfoCard>

          <InfoCard title="Role Details" icon="fas fa-user-tag">
            <InfoItem label="Role" value="Attendance Management" />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;