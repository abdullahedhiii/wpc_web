// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/UserSlice";
import { useModuleContext } from "../contexts/ModuleContext";
import { useCompanyContext } from "../contexts/CompanyContext";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, HomeIcon } from 'lucide-react';

const Login = () => {
  const { fetchModules } = useModuleContext();
  const { fetchOrganisation } = useCompanyContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [planExpired, setExpired] = useState(false);
  const [id_if, set_id_if] = useState('');

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        info,
        { withCredentials: true }
      );

      dispatch(login(response.data.user));
      fetchModules(response.data.user.id, response.data.user.isAdmin);
      fetchOrganisation(response.data.user.id, response.data.user.isAdmin);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      if (err.response?.data?.navlink) {
        setExpired(true);
        set_id_if(err.response.data.admin_id);
      }
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
      <div className="absolute top-0 left-0 w-full bg-white shadow-md py-2">
  <div className="flex justify-center">
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 text-gray-800 text-[14px] font-semibold  hover:text-yellow-600 transition-colors"
    >
      <HomeIcon className="w-4 h-4" />
      {/* Home */}
    </button>
  </div>
</div>

      <motion.div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-100 mt-10">
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
              </motion.div>
              <div className="space-y-4">
                <h3 className="text-md font-bold mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    "Employee Records — Centralised profiles and document storage.",
                    "Attendance Upload — Import attendance easily from Excel/CSV sheets.",
                    "Leave & Absence — Quick request and approval flows with simple absence tracking.",
                    "Reports — Generate attendance, absence, and staff reports for audits or reviews.",
                    "User Access & Roles — Assign roles for managers, admins, and staff.",
                    "Affordable Pricing — Clear, flat packages with no hidden fees."
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-200" />
                      <span className="text-yellow-50 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-1/2 p-8 md:p-14 bg-white flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-6 justify-center">
              <img src="/images/small-logo.png" className="w-14 h-14 object-contain" />
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={info.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white shadow-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-yellow-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Forgot Password link */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-yellow-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error */}
              {error && !planExpired && (
                <motion.div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center shadow-sm">
                  {error}
                </motion.div>
              )}

              {planExpired && (
                <motion.div
                  className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl text-sm flex flex-col items-center shadow-sm space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>Your plan has expired or you have not yet subscribed. Kindly pay or renew to continue.</p>
                  <button
                    onClick={() => navigate(`/payment-page/${id_if}`, { state: { from_api: true } })}
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Renew Plan
                  </button>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 transition-all"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up link */}
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account?</span>
              <button
                onClick={() => navigate("/register")}
                className="ml-2 text-yellow-600 hover:text-yellow-700 font-medium hover:underline transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
