"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

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

    try {
      const response = await axios.post("/api/register", formData)
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
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full  rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">HR Solutions</h1>
              <p className="text-gray-600 mb-8">Your Complete Virtual HR Management System</p>
              <p className="text-gray-700 mb-8">Join thousands of companies managing their HR operations efficiently</p>
            </div>
            <img
              src="/images/main.gif"
              alt="HR Analytics Illustration"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12  bg-gradient-to-r from-yellow-100 to-yellow-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create your account</h2>
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                required
              />
              <input
                type="tel"
                placeholder="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                required
              />
              <input
                type="password"
                placeholder="Create Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                required
              />
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyPolicyAccepted"
                  checked={formData.privacyPolicyAccepted}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-200"
                  required
                />
                <span className="text-sm text-gray-600">
                  I confirm that I have read the Privacy Policy and I agree to the website Terms of Use and License
                  Agreement
                </span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-200"
                  required
                />
                <span className="text-sm text-gray-600">
                  I understand that they do not, in any way, replace immigration advice
                </span>
              </label>
              <div className="flex justify-center">
                <ReCAPTCHA sitekey="your-recaptcha-site-key" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-full font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <span className="text-gray-600">Already have an account?</span>
              <button onClick={() => navigate("/")} className="ml-2 text-yellow-600 hover:text-yellow-700 font-medium">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

