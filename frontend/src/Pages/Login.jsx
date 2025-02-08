import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/UserSlice"; 
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";

const Login = () => {
  const {fetchModules} = useModuleContext();
  const {fetchOrganisation} = useCompanyContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/login", info);
      dispatch(login(response.data.user));
      console.log(' logging in ',response.data.user);
      fetchModules(response.data.user.id,response.data.user.isAdmin);
      fetchOrganisation(response.data.user.id,response.data.user.isAdmin);
      navigate("/employeeDashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {

  },)
  return (
    <div className="min-h-screen bg-pinkbg pt-16 md:pt-14">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-3 px-4 md:px-12">
        <div className="flex flex-col items-center justify-center md:pl-12 text-center p-10">
          <h1 className="text-4xl font-bold text-primary mb-6">
            WorkPermitCloud Limited
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">Your Virtual HR Manager</h2>

          <button className="inline-block mb-4 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-md">
            Watch Tutorial Video
          </button>
          <button className="inline-block border-2 border-red-600 text-red-600 py-2 px-4 rounded-md">
            Download HRMS Software Manual
          </button>

          <img
            src="/images/hiring.png"
            alt="HR Analytics Illustration"
            className="max-w-full h-auto"
          />
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-sm p-8 bg-white shadow-lg">
            <h2 className="text-2xl text-text_c font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-4 pr-12 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-user-circle text-2xl text-tt absolute right-4 top-1/2 transform -translate-y-1/2"></i>
              </div>

              <div className="relative mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                  className="w-full p-3 pl-4 pr-12 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <i className="la la-lock text-2xl text-tt absolute right-4 top-1/2 transform -translate-y-1/2"></i>
              </div>

              <div className="my-4">
                <ReCAPTCHA sitekey="your-recaptcha-site-key" />
              </div>

              {error && <p className="text-red-600 mb-4">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 font-semibold bg-background text-white rounded-md hover:bg-blue-700 focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "LOGIN"}
              </button>

              <div className="flex justify-between items-center mt-4 mb-10">
                <a href="#" className="text-tt hover:underline">
                  Forgot Password?
                </a>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
