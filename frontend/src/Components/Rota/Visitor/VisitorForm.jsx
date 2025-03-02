"use client"

import { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Briefcase, Mail, Phone, MapPin, Clock, Calendar, FileText, Send } from "lucide-react"

const VisitorForm = () => {
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    contact: "",
    address: "",
    description: "",
    date: "",
    time: "",
    reference: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const hashKey = location.pathname.split("/").pop()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const send_data = { ...formData, key: hashKey }
      const response = await axios.post("/api/registerVisitor", send_data)
      if (response.status === 201) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
        setFormData({
          name: "",
          designation: "",
          email: "",
          contact: "",
          address: "",
          description: "",
          date: "",
          time: "",
          reference: "",
        })
      }
    } catch (err) {
      window.alert("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-400"
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5"

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-col items-center mb-12"
        >
    
          <div className="w-full max-w-5xl">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-8">
                <h1 className="text-3xl font-bold text-white text-center">Visitor Registration</h1>
                <p className="text-yellow-100 text-center mt-2">Please fill in your details below</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>
                      <User className="w-4 h-4 text-yellow-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className={inputClasses}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <Mail className="w-4 h-4 text-yellow-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className={inputClasses}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      placeholder="Enter your address"
                      className={`${inputClasses} h-24 resize-none`}
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>
                        <Calendar className="w-4 h-4 text-yellow-500" />
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        className={inputClasses}
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        <Clock className="w-4 h-4 text-yellow-500" />
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        className={inputClasses}
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>
                      <Briefcase className="w-4 h-4 text-yellow-500" />
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Enter your designation"
                      className={inputClasses}
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <Phone className="w-4 h-4 text-yellow-500" />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="Enter your contact number"
                      className={inputClasses}
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <FileText className="w-4 h-4 text-yellow-500" />
                      Purpose of Visit
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe the purpose of your visit"
                      className={`${inputClasses} h-24 resize-none`}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      <User className="w-4 h-4 text-yellow-500" />
                      Reference Person
                    </label>
                    <input
                      type="text"
                      name="reference"
                      placeholder="Enter reference person's name"
                      className={inputClasses}
                      value={formData.reference}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Visit registered successfully!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default VisitorForm

