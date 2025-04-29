import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { useEffect, useState } from "react";
import { FaUserTie, FaBuilding, FaPhoneAlt, FaBirthdayCake, FaPassport, FaUniversity, FaMapMarkerAlt, FaIdCard, FaFlag, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [profileData, setData] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/fetchMyProfile/${user.employee_code}`,
        { params: { user_id: user.id } }
      );
      setData(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, []);

  if (profileData === null) return null;

  // Placeholder avatar if none exists
  const avatarUrl =
    profileData.profile_details.profile_pic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profileData.profile_details.name
    )}&background=0D8ABC&color=fff`;

  // Section component
  const Section = ({ title, icon, children }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl text-blue-500">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">{children}</div>
      <div className="border-b border-gray-100 mt-4" />
    </div>
  );

  // Info item
  const InfoItem = ({ label, value, icon }) =>
    value ? (
      <div className="flex items-center gap-2 text-gray-700 text-sm py-1">
        <span className="text-blue-400">{icon}</span>
        <span className="font-medium">{label}:</span>
        <span className="ml-1 text-gray-900">{value}</span>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-2">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl bg-white/80 backdrop-blur-lg overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex flex-col items-center justify-center p-8 relative">
          <div className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold shadow text-white">
            {profileData.profile_details.employee_code}
          </div>
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold mb-1">{profileData.profile_details.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <FaUserTie className="text-white/80" />
            <span className="text-base">{profileData.profile_details.designation}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-white/80" />
            <span className="text-base">{profileData.profile_details.department}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-white/80" />
            <span className="text-base">{profileData.profile_details.phone}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 p-10 bg-white/90">
          <Section title="Personal Details" icon={<FaIdCard />}>
            <InfoItem label="Date Of Birth" value={profileData.profile_details.dob} icon={<FaBirthdayCake />} />
          </Section>

          <Section title="Service Details" icon={<FaCalendarAlt />}>
            <InfoItem label="Date Of Joining" value={profileData.service_details.start} icon={<FaCalendarAlt />} />
            <InfoItem label="Employment Type" value={profileData.service_details.type} icon={<FaIdCard />} />
          </Section>

          <Section title="Address Details" icon={<FaMapMarkerAlt />}>
            <InfoItem label="Address Line 1" value={profileData.address_details.line1} icon={<FaMapMarkerAlt />} />
            <InfoItem label="City / County" value={profileData.address_details.city_county} icon={<FaMapMarkerAlt />} />
            <InfoItem label="City Post Code" value={profileData.address_details.post_code} icon={<FaMapMarkerAlt />} />
            <InfoItem label="Country" value={profileData.address_details.country} icon={<FaFlag />} />
          </Section>

          <Section title="Immigration Details" icon={<FaPassport />}>
            <InfoItem label="National ID No" value={profileData.immigration_details.national_id} icon={<FaIdCard />} />
            <InfoItem label="Nationality" value={profileData.immigration_details.nationality} icon={<FaFlag />} />
            <InfoItem label="Passport No" value={profileData.immigration_details.passport_no} icon={<FaPassport />} />
            <InfoItem label="Passport Issued" value={profileData.immigration_details.passport_issued} icon={<FaCalendarAlt />} />
            <InfoItem label="Passport Expiry" value={profileData.immigration_details.passport_expiry} icon={<FaCalendarAlt />} />
            <InfoItem label="Passport Issued By" value={profileData.immigration_details.passport_by} icon={<FaBuilding />} />
            <InfoItem label="Passport Eligible Review Date" value={profileData.immigration_details.passport_review} icon={<FaCalendarAlt />} />
            <InfoItem label="Visa Issued" value={profileData.immigration_details.visa_issued} icon={<FaCalendarAlt />} />
            <InfoItem label="Visa Expiry" value={profileData.immigration_details.visa_expiry} icon={<FaCalendarAlt />} />
            <InfoItem label="Visa Issued By" value={profileData.immigration_details.visa_by} icon={<FaBuilding />} />
            <InfoItem label="Visa Eligible Review Date" value={profileData.immigration_details.visa_review} icon={<FaCalendarAlt />} />
          </Section>

          <Section title="Bank Details" icon={<FaUniversity />}>
            <InfoItem label="Bank Name" value={profileData.bank_details.bank_name} icon={<FaUniversity />} />
            <InfoItem label="Sort Code" value={profileData.bank_details.sort_code} icon={<FaIdCard />} />
            <InfoItem label="Branch Name" value={profileData.bank_details.branch_name} icon={<FaBuilding />} />
            <InfoItem label="A/C No#" value={profileData.bank_details.account_no} icon={<FaIdCard />} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Profile;