// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(null); // null = loading, true = valid, false = invalid
  const [error, setError] = useState("");
  
  const validatePassword = (pwd) => {
    const regex = /^(?=.{8,})(?=[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
    if (!regex.test(pwd)) {
      return "Password must be 8+ characters, start with a capital letter, and include a special character.";
    }
    return "";
  };
  
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/validate-hash?hash=${token}`
        );
        if (res.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reset-password/${token}`,
        { password }
      );

      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <motion.div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-yellow-100">
        {isValid === null && (
          <p className="text-center text-gray-600">Validating reset link...</p>
        )}

        {isValid === false && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Link Expired or Invalid
            </h2>
            <p className="text-gray-600 mb-6">
              Your reset link is either invalid or has expired.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Back to Login
            </button>
          </div>
        )}

        {isValid === true && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Set a New Password
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter and confirm your new password below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(validatePassword(e.target.value));

                }}
                  placeholder="New Password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white shadow-sm"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 bg-white shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 transition-all"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
