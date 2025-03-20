"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"
import { motion } from "framer-motion"
import { Building2, User, Mail, Phone, Lock, CheckCircle2, Shield, Users, BarChart3, Clock } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
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
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    if (formData.firstName.length < 3 || formData.lastName.length < 3){
      setError("Please enter a valid name")
      return
    }
    else if (formData.contactNumber.length < 10){
      setError("Please enter a valid phone number")
      return
    }
    else if(formData.password.length < 8){
      setError("Password must be atleast of length 8")
      return
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData)
      setFormData({
        companyName: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        privacyPolicyAccepted: false,
        termsAccepted: false,
      })
      navigate("/payment-page")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: "Team Management",
      description: "Efficiently manage your entire workforce"
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor and improve team performance"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Track attendance and leave management"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for your data"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 bg-yellow-500 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-6">HR Solutions</h1>
                <p className="text-xl text-yellow-100 mb-8">
                  Transform your HR management with our comprehensive solution
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-yellow-400/20 p-3 rounded-xl">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-yellow-100">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

                        <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/2" />
            </div>
          </div>

                    <div className="md:w-1/2 p-8 md:p-12 bg-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
                  <div className="flex items-center space-x-1 mb-4 justify-center">
  <img src="/images/small-logo.png" className="w-16 h-16 object-contain" />
  <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
</div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 mr-2" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Building2 className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Create Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-start">
                      <input
                        type="checkbox"
                        name="privacyPolicyAccepted"
                        checked={formData.privacyPolicyAccepted}
                        onChange={handleCheckboxChange}
                        className="peer sr-only"
                        required
                      />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded transition-colors peer-checked:border-yellow-500 peer-checked:bg-yellow-500 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      I confirm that I have read the Privacy Policy and I agree to the website Terms of Use and License Agreement
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-start">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleCheckboxChange}
                        className="peer sr-only"
                        required
                      />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded transition-colors peer-checked:border-yellow-500 peer-checked:bg-yellow-500 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      I understand that they do not, in any way, replace immigration advice
                    </span>
                  </label>
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA sitekey="your-recaptcha-site-key" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-600">Already have an account?</span>
                <button
                  onClick={() => navigate("/login")}
                  className="ml-2 text-yellow-600 hover:text-yellow-700 font-medium hover:underline transition-colors"
                >
                  Sign in
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register