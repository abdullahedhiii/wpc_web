import { useSelector } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { useEffect, useState } from "react";
import { FaUserTie, FaBuilding, FaPhoneAlt, FaBirthdayCake, FaPassport, FaUniversity, FaMapMarkerAlt, FaIdCard, FaFlag, FaCalendarAlt, FaUserCircle, FaWallet } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { key: "personal", label: "Personal", icon: <FaUserCircle /> },
  { key: "service", label: "Service", icon: <FaUserTie /> },
  { key: "address", label: "Address", icon: <FaMapMarkerAlt /> },
  { key: "immigration", label: "Immigration", icon: <FaPassport /> },
  { key: "bank", label: "Bank", icon: <FaWallet /> },
];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [profileData, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

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

  const avatarUrl =
    profileData.profile_details.profile_pic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profileData.profile_details.name
    )}&background=0D8ABC&color=fff`;

  // Tab content
  const tabContent = {
    personal: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="Date Of Birth" value={profileData.profile_details.dob} icon={<FaBirthdayCake />} />
      </div>
    ),
    service: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="Date Of Joining" value={profileData.service_details.start} icon={<FaCalendarAlt />} />
        <Info label="Employment Type" value={profileData.service_details.type} icon={<FaIdCard />} />
      </div>
    ),
    address: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="Address Line 1" value={profileData.address_details.line1} icon={<FaMapMarkerAlt />} />
        <Info label="City / County" value={profileData.address_details.city_county} icon={<FaMapMarkerAlt />} />
        <Info label="City Post Code" value={profileData.address_details.post_code} icon={<FaMapMarkerAlt />} />
        <Info label="Country" value={profileData.address_details.country} icon={<FaFlag />} />
      </div>
    ),
    immigration: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="National ID No" value={profileData.immigration_details.national_id} icon={<FaIdCard />} />
        <Info label="Nationality" value={profileData.immigration_details.nationality} icon={<FaFlag />} />
        <Info label="Passport No" value={profileData.immigration_details.passport_no} icon={<FaPassport />} />
        <Info label="Passport Issued" value={profileData.immigration_details.passport_issued} icon={<FaCalendarAlt />} />
        <Info label="Passport Expiry" value={profileData.immigration_details.passport_expiry} icon={<FaCalendarAlt />} />
        <Info label="Passport Issued By" value={profileData.immigration_details.passport_by} icon={<FaBuilding />} />
        <Info label="Passport Eligible Review Date" value={profileData.immigration_details.passport_review} icon={<FaCalendarAlt />} />
        <Info label="Visa Issued" value={profileData.immigration_details.visa_issued} icon={<FaCalendarAlt />} />
        <Info label="Visa Expiry" value={profileData.immigration_details.visa_expiry} icon={<FaCalendarAlt />} />
        <Info label="Visa Issued By" value={profileData.immigration_details.visa_by} icon={<FaBuilding />} />
        <Info label="Visa Eligible Review Date" value={profileData.immigration_details.visa_review} icon={<FaCalendarAlt />} />
      </div>
    ),
    bank: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Info label="Bank Name" value={profileData.bank_details.bank_name} icon={<FaUniversity />} />
        <Info label="Sort Code" value={profileData.bank_details.sort_code} icon={<FaIdCard />} />
        <Info label="Branch Name" value={profileData.bank_details.branch_name} icon={<FaBuilding />} />
        <Info label="A/C No#" value={profileData.bank_details.account_no} icon={<FaIdCard />} />
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white to-blue-200/80 py-12 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-gradient-to-b from-blue-700/90 to-blue-400/80 text-white flex flex-col items-center py-10 px-4 relative">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h1 className="text-xl font-bold mb-1 text-center">{profileData.profile_details.name}</h1>
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
          <div className="mt-6 w-full">
            <div className="bg-white/20 rounded-lg p-3 text-center text-xs font-semibold shadow text-white tracking-widest">
              Employee Code: {profileData.profile_details.employee_code}
            </div>
          </div>
          <div className="mt-10 w-full">
            <div className="flex flex-col gap-2">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all font-medium ${
                    activeTab === tab.key
                      ? 'bg-white/80 text-blue-700 shadow'
                      : 'hover:bg-white/10 text-white/80'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 p-10 bg-white/90 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, icon }) =>
  value ? (
    <div className="flex items-center gap-3 bg-blue-50/60 rounded-lg px-4 py-3 mb-2 shadow-sm">
      <span className="text-blue-500">{icon}</span>
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="ml-1 text-gray-900">{value}</span>
    </div>
  ) : null;

export default Profile;