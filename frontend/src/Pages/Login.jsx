import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/UserSlice";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";

const Login = () => {
  const { fetchModules } = useModuleContext();
  const { fetchOrganisation } = useCompanyContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/login", info);
      dispatch(login(response.data.user));
      fetchModules(response.data.user.id, response.data.user.isAdmin);
      fetchOrganisation(response.data.user.id, response.data.user.isAdmin);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/hrms/employeeDashboard");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">HR Solutions</h1>
              <p className="text-gray-600 mb-8">Your Complete Virtual HR Management System</p>
            </div>
            <img src="/images/logo.png"/>
            <div className="space-y-4">
              <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300 flex items-center justify-center">
                <i className="las la-play-circle mr-2"></i> Watch Tutorial
              </button>
              <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300 flex items-center justify-center">
                <i className="las la-file-download mr-2"></i> Download Manual
              </button>
            </div>
          </div>
          <div className="md:w-1/2 bg-yellow-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-yellow-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700">Forgot password?</a>
              </div>
              <div className="flex justify-center">
                <ReCAPTCHA sitekey="your-recaptcha-site-key" />
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-full font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-yellow-600 hover:text-yellow-700"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;