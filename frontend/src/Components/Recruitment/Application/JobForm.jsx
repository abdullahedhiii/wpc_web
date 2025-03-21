
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mt-12 max-w-4xl mx-auto">
      <div className="relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-lg"></div>

        <div className="p-8 pt-10 bg-gradient-to-b from-yellow-50 to-white shadow-xl rounded-lg border border-yellow-100">
          <motion.div variants={itemVariants} className="flex items-center space-x-2 mb-2">
            <Building className="w-5 h-5 text-yellow-600" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700">
              {jobData.company}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center mr-4 mb-2">
              <Briefcase className="w-4 h-4 mr-1 text-yellow-600" />
              <span>{jobData.jobTitle}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Code className="w-4 h-4 mr-1 text-yellow-600" />
              <span>Code: {jobData.code}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 mr-1 text-yellow-600" />
              <span>Experience: {jobData.experience}</span>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.section
              variants={itemVariants}
              className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                <ChevronRight className="w-5 h-5 mr-1 text-yellow-500" />
                Job Description / Responsibilities:
              </h2>
              <p
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                <GraduationCap className="w-5 h-5 mr-1 text-yellow-500" />
                Educational Qualification:
              </h2>
              <p className="text-gray-700">{jobData.qualifications}</p>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                <Award className="w-5 h-5 mr-1 text-yellow-500" />
                Skill Set:
              </h2>
              <p className="text-gray-700 text-sm">{jobData.skillSet}</p>
            </motion.section>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                  <Briefcase className="w-5 h-5 mr-1 text-yellow-500" />
                  Job Type:
                </h2>
                <p className="text-gray-700">{jobData.jobType}</p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                  <Clock className="w-5 h-5 mr-1 text-yellow-500" />
                  Working Hours:
                </h2>
                <p className="text-gray-700">{jobData.workingHours}</p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                  <Users className="w-5 h-5 mr-1 text-yellow-500" />
                  Gender:
                </h2>
                <p className="text-gray-700">{jobData.gender}</p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                  <Globe className="w-5 h-5 mr-1 text-yellow-500" />
                  Language Requirements:
                </h2>
                <p className="text-gray-700">{jobData.languageRequirements}</p>
              </div>
            </motion.div>

            <motion.section
              variants={itemVariants}
              className="p-5 bg-white rounded-lg border border-yellow-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                <PoundSterling  className="w-5 h-5 mr-1 text-yellow-500" />
                Salary:
              </h2>
              <p className="text-gray-700 font-medium">{jobData.salary}</p>
            </motion.section>
          </div>

          <motion.div variants={itemVariants} className="flex justify-end pt-6 mt-4">
            <motion.button
              onClick={() => setShowApplication(true)}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Apply Now
              <ChevronRight className="w-5 h-5 ml-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

