import { useEffect, useState } from "react"
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
  PoundSterling,
  FileText,
  Send,
} from "lucide-react"
import { toast } from 'react-toastify';

export default function ApplicationForm({ onBack, job_id, jobTitle, organisation_id }) {
  const [justsubmitted,setSubmitted] = useState(false);
  const [isSubmitting,setSubmitting] = useState(false);
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
    setSubmitting(true);
    try {
      if(formData.contactNo.length < 10 || formData.contactNo.length > 15){
        toast.error('Contact Number should be of length 10-15 digits');
        setSubmitting(false);
        return;
      }
      const d = new Date(formData.dob);
      if(d > new Date()){
        toast.error('Enter valid date of birth')
        setSubmitting(false);
        return;
      }
      const candidate = new FormData()
      for (const key in formData) {
        if (formData[key]) {
          candidate.append(key, formData[key])
        }
      }

      const str = `${formData.organisation_id}.${job_id}.${formData.email}`
      console.log(str);
      console.log(formData);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applyJob/${str}`, candidate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setSubmitted(true);
    } catch (err) {
      if (err.response) {
       toast.error(err.response.data.message || "Something went wrong. Please try again.")
      } else {
        toast.error("Network error. Please check your connection.")
      }
    }
    finally{
      setSubmitting(false);
    }
  }

  useEffect(() => {
   if(justsubmitted){
      toast.success('Application submitted successfully');
      
   }
  },[justsubmitted])
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mt-16 max-w-3xl mx-auto">
      {justsubmitted ? (
        <div className="p-10 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-2xl text-center">
          <h2 className="text-4xl font-extrabold text-yellow-700 mb-4">Thank You!</h2>
          <p className="text-gray-700 text-lg mb-2">
            Your application for <strong>{jobTitle}</strong> has been submitted successfully.
          </p>
          <motion.button
            onClick={onBack}
            className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold shadow-lg hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Job Details
          </motion.button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl shadow-lg"></div>

          <div className="p-10 pt-12 bg-gradient-to-b from-yellow-50 to-white shadow-2xl rounded-2xl border border-yellow-100">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700 tracking-tight">
                Job Application
              </h1>
              <motion.button
                onClick={onBack}
                className="text-yellow-600 hover:text-yellow-700 flex items-center font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back to Job Details
              </motion.button>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-yellow-300 bg-yellow-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="jobTitle"
                    value={formData.jobTitle}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline-block mr-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline-block mr-1" />
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline-block mr-1" />
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="male/female">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline-block mr-1" />
                    Experience in Year
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 inline-block mr-1" />
                  Educational Qualification
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  rows="3"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">Most Recent Position</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="recentPosition"
                    value={formData.recentPosition}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline-block mr-1" />
                    Current Location / Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  <PoundSterling className="w-4 h-4 inline-block mr-1" />
                  Expected salary/CTC
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline-block mr-1" />
                  Upload Resume * (pdf)
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  name="resume"
                  onChange={handleFileChange}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline-block mr-1" />
                  Upload Cover Letter * (pdf)
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  name="coverLetter"
                  onChange={handleFileChange}
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center text-lg gap-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting Application ...' : 'Submit Application'}
              </motion.button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )
}

