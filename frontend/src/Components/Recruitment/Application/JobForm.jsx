import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import ApplicationForm from "./ApplicationForm"
import {
  Briefcase,
  Clock,
  Code,
  GraduationCap,
  Users,
  Globe,
  PoundSterling ,
  ChevronRight,
  Award,
  Building,
} from "lucide-react"

export default function JobForm() {
  const [showApplication, setShowApplication] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const [jobData, setJobData] = useState({})

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getJobData/${id}`)
        setJobData(response.data)
      } catch (err) {
        console.log("error getting job data", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobDetails()
  }, [id])

  if (showApplication) {
    return (
      <ApplicationForm
        onBack={() => setShowApplication(false)}
        job_id={jobData.job_id}
        jobTitle={jobData.jobTitle}
        organisation_id={jobData.organisation_id}
      />
    )
  }

  // Animation variants
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

  if (isLoading) {
    return (
      <div className="mt-12 max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mt-16 max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl shadow-lg"></div>
        <div className="p-10 pt-12 bg-gradient-to-b from-yellow-50 to-white shadow-2xl rounded-2xl border border-yellow-100">
          <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-4">
            <Building className="w-7 h-7 text-yellow-600" />
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700 tracking-tight">
              {jobData.company}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center text-base text-gray-700 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold">{jobData.jobTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">Code: {jobData.code}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">Experience: {jobData.experience}</span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.section
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                <ChevronRight className="w-5 h-5 mr-2 text-yellow-500" />
                Job Description / Responsibilities
              </h2>
              <p
                className="text-gray-700 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
                Educational Qualification
              </h2>
              <p className="text-gray-700 text-base">{jobData.qualifications}</p>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Skill Set
              </h2>
              <p className="text-gray-700 text-base">{jobData.skillSet}</p>
            </motion.section>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                  <Briefcase className="w-5 h-5 mr-2 text-yellow-500" />
                  Job Type
                </h2>
                <p className="text-gray-700 text-base">{jobData.jobType}</p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                  <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                  Working Hours
                </h2>
                <p className="text-gray-700 text-base">{jobData.workingHours}</p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                  <Users className="w-5 h-5 mr-2 text-yellow-500" />
                  Gender
                </h2>
                <p className="text-gray-700 text-base">{jobData.gender}</p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                  <Globe className="w-5 h-5 mr-2 text-yellow-500" />
                  Language Requirements
                </h2>
                <p className="text-gray-700 text-base">{jobData.languageRequirements}</p>
              </div>
            </motion.div>

            <motion.section
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-yellow-100 shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center text-yellow-800">
                <PoundSterling className="w-5 h-5 mr-2 text-yellow-500" />
                Salary
              </h2>
              <p className="text-gray-700 font-semibold text-lg">{jobData.salary}</p>
            </motion.section>
          </div>

          <motion.div variants={itemVariants} className="flex justify-end pt-8 mt-6">
            <motion.button
              onClick={() => setShowApplication(true)}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center text-lg gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Apply Now
              <ChevronRight className="w-6 h-6 ml-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

