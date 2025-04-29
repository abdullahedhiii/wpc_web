import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/UserSlice";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";
import { motion } from "framer-motion";
import { Building2, Lock, Mail, PlayCircle, FileDown } from 'lucide-react';

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, info,{
        withCredentials : true,
      });
      console.log(response.data)
      dispatch(login(response.data.user));
      fetchModules(response.data.user.id, response.data.user.isAdmin);
      fetchOrganisation(response.data.user.id, response.data.user.isAdmin);
    } catch (err) {
      setError(
       err.response.data.error
      ); 
      // err.response?.data?.error ||
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-100"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="md:w-1/2 bg-gradient-to-br from-yellow-500 to-yellow-400 p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <img src="/images/small-logo.png" className="w-20 h-20 object-contain rounded-2xl shadow-lg" />
                  <h1 className="text-4xl font-extrabold tracking-tight">HR Solutions</h1>
                </div>
                <p className="text-yellow-50 text-lg mb-8 font-medium">
                  Your Complete Virtual HR Management System
                </p>
              </motion.div>
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    "Comprehensive HR Management",
                    "Advanced Analytics & Reporting",
                    "Employee Self-Service Portal",
                    "Automated Workflows",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-200" />
                      <span className="text-yellow-50 text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/2" />
            </div>
          </div>
          {/* Divider */}
          <div className="hidden md:block w-0.5 bg-yellow-100" />
          {/* Right Panel (Form) */}
          <div className="md:w-1/2 p-8 md:p-14 bg-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-6 justify-center">
                <img src="/images/small-logo.png" className="w-14 h-14 object-contain" />
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 bg-white shadow-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={info.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 bg-white shadow-sm"
                    required
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                </div>
                <div className="flex justify-center">
                  <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600 mr-2" />
                    {error}
                  </motion.div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate("/register")}
                  className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;