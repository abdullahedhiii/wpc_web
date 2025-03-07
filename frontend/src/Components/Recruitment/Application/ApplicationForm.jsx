
import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  MapPin,
  DollarSign,
  FileText,
  Send,
} from "lucide-react"

export default function ApplicationForm({ onBack, job_id, jobTitle, organisation_id }) {
  const [formData, setFormData] = useState({
    job_id: job_id,
    organisation_id: organisation_id,
    jobTitle: jobTitle,
    name: "",
    email: "",
    contactNo: "",
    gender: "",
    dob: "",
    experienceYear: "",
    experienceMonth: "",
    education: "",
    recentPosition: "",
    nextJobTitle: "",
    currentCode: "",
    currentLocation: "",
    expectedSalary: "",
    resume: null,
    coverLetter: null,
    status: "Application Received",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const candidate = new FormData()
      for (const key in formData) {
        if (formData[key]) {
          candidate.append(key, formData[key])
        }
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/applyJob/${formData.organisation_id}.${formData.job_id}.${formData.email}`, candidate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      window.alert("Application submitted successfully")
    } catch (err) {
      if (err.response) {
        window.alert(err.response.data.message || "Something went wrong. Please try again.")
      } else {
        window.alert("Network error. Please check your connection.")
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mt-12 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-lg"></div>

        <div className="p-8 pt-10 bg-gradient-to-b from-yellow-50 to-white shadow-xl rounded-lg border border-yellow-100">
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700">
              Job Application
            </h1>
            <motion.button
              onClick={onBack}
              className="text-yellow-600 hover:text-yellow-700 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Job Details
            </motion.button>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-yellow-300 bg-yellow-50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="jobTitle"
                  value={formData.jobTitle}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline-block mr-1" />
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Email ID
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline-block mr-1" />
                  Contact No.
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male/female">Male/Female</option>
                  <option value="female">Male</option>
                  <option value="male">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline-block mr-1" />
                  Date Of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="w-4 h-4 inline-block mr-1" />
                  Experience in Year
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="experienceYear"
                  value={formData.experienceYear}
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience in Months</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="experienceMonth"
                  value={formData.experienceMonth}
                  onChange={handleChange}
                >
                  <option value="">Select Months</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>
                      {i} months
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <GraduationCap className="w-4 h-4 inline-block mr-1" />
                Educational Qualification
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows="3"
                name="education"
                value={formData.education}
                onChange={handleChange}
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Most Recent Position</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="recentPosition"
                  value={formData.recentPosition}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Recent Job Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="nextJobTitle"
                  value={formData.nextJobTitle}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current/Past code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="currentCode"
                  value={formData.currentCode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Current Location / Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="w-4 h-4 inline-block mr-1" />
                Expected salary/CTC
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 inline-block mr-1" />
                Upload Resume * (pdf)
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                name="resume"
                onChange={handleFileChange}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 inline-block mr-1" />
                Upload Cover Letter * (pdf)
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                name="coverLetter"
                onChange={handleFileChange}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-md hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Application
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

