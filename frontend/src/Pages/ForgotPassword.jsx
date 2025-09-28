// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, { email });
      toast.success("Reset link sent to your email address!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <motion.div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-yellow-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your registered email address. We’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 transition-all"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
