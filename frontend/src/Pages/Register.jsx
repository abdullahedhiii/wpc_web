import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    privacyPolicyAccepted: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-pinkbg pt-16 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-12">
        <div className="flex flex-col items-center justify-center md:pl-12 text-center p-10">
          <h1 className="text-xl font-bold text-primary mb-6">
            WorkPermitCloud Limited
          </h1>
          <h2 className="text-3xl text-gray-600 mb-6">
            Your Virtual HR Manager
          </h2>

          <img
            src="/images/hiring.png"
            alt="HR Analytics Illustration"
            className="max-w-full h-auto"
          />
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-text_c font-semibold mb-6">
              Register Here
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-building text-2xl text-tt  absolute right-4 top-1/2 transform -translate-y-1/2"></i>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pr-10 p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <i className="la la-user-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pr-10 p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <i className="la la-user-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
                </div>
              </div>

              <div className="flex space-x-4 mb-4">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Your Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-phone absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
              </div>
              </div>

              <div className="flex space-x-4 mb-4">
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Create New Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
              </div>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                  <i className="la la-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-tt"></i>
              </div>
             </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="privacyPolicyAccepted"
                  checked={formData.privacyPolicyAccepted}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">
                  I confirm that I have read the Privacy Policy and I agree to
                  the website Terms of Use and License Agreement
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">
                  I understand that they do not, in any way, replace immigration
                  advice
                </label>
              </div>

              <div className="my-4">
                <ReCAPTCHA sitekey="your-recaptcha-site-key" />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-background font-semibold text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                REGISTER
              </button>
              <p className="text-right mb-10 text-red-600 mb-4">All fields are mandatory</p>

              <hr className="my-4 border-t-1 border-black" />

              <div className="text-center">
                <p className="mb-4">Already have an account?</p>
                <button
                  className="w-full py-3 bg-background font-semibold text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  onClick={() => navigate("/")}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
