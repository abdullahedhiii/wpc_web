
import { motion } from "framer-motion"
import {
  Building2,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Shield,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Search,
  ChevronDown,
  ArrowUpDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import axios from "axios"

const SponsorList = () => {
  const [sponsors, setSponsors] = useState([])
  const [values, setValues] = useState({
    newCount: 0,
    updatedCount: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 20

  const fetchSponsors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getSponsors`)
      setSponsors(response.data.sponsors)
      setValues({
        newCount: response.data.newCount,
        updatedCount: response.data.updatedCount,
      })
    } catch (err) {
      console.error("Failed to fetch sponsors:", err)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Sorting logic
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Filtered and sorted sponsors
  const filteredAndSortedSponsors = useMemo(() => {
    let filteredItems = [...sponsors]

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase()
      filteredItems = filteredItems.filter(
        (sponsor) =>
          sponsor.company.toLowerCase().includes(lowerCaseSearch) ||
          sponsor.location.toLowerCase().includes(lowerCaseSearch) ||
          sponsor.licenseTier.toLowerCase().includes(lowerCaseSearch) ||
          sponsor.status.toLowerCase().includes(lowerCaseSearch),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filteredItems
  }, [sponsors, searchTerm, sortConfig])

  // Paginated sponsors
  const paginatedSponsors = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredAndSortedSponsors.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredAndSortedSponsors, currentPage])

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const totalPages = Math.ceil(filteredAndSortedSponsors.length / rowsPerPage)

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const stats = [
    {
      title: "All Sponsors",
      count: sponsors.length,
      icon: Building2,
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "New Sponsors",
      count: values.newCount,
      icon: Users,
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "License Updates",
      count: values.updatedCount,
      icon: Award,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200"
      case "updated":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "removed":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4" />
      case "updated":
        return <RefreshCcw className="w-4 h-4" />
      case "removed":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-amber-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-amber-500" />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <img src="/images/small-logo.png" className="h-12 w-12"/>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HR Solutions</h1>
              <p className="text-sm text-gray-500">Sponsor Management Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.count}</h3>
                  {/* <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">+{Math.floor(Math.random() * 10) + 1}%</span> from
                    last month
                  </div> */}
                </div>
                <div className={`rounded-full p-4 bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                Sponsor Directory
              </h2>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search sponsors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all w-full sm:w-64"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* <div className="relative group">
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">
                    Filter
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-10">
                    <div className="p-2">
                      <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">All Sponsors</div>
                      <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">Active Only</div>
                      <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">Updated Recently</div>
                      <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">Removed</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => requestSort("company")}
                      className="flex items-center gap-2 hover:text-amber-600 transition-colors focus:outline-none"
                    >
                      Company
                      {getSortIcon("company")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => requestSort("location")}
                      className="flex items-center gap-2 hover:text-amber-600 transition-colors focus:outline-none"
                    >
                      Location
                      {getSortIcon("location")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => requestSort("licenseTier")}
                      className="flex items-center gap-2 hover:text-amber-600 transition-colors focus:outline-none"
                    >
                      License Tier
                      {getSortIcon("licenseTier")}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      onClick={() => requestSort("status")}
                      className="flex items-center gap-2 hover:text-amber-600 transition-colors focus:outline-none"
                    >
                      Status
                      {getSortIcon("status")}
                    </button>
                  </th>
                  {/* <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSponsors.length > 0 ? (
                  paginatedSponsors.map((sponsor, index) => (
                    <motion.tr
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-amber-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md">
                            {sponsor.company.charAt(1)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                              {sponsor.company}
                            </div>
                            <div className="text-sm text-gray-500">ID: {sponsor.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="group-hover:text-gray-800 transition-colors">{sponsor.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-500" />
                          <span className="group-hover:text-gray-800 transition-colors">{sponsor.licenseTier}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sponsor.status)}`}
                        >
                          {getStatusIcon(sponsor.status)}
                          {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 text-right">
                        <button className="text-amber-500 hover:text-amber-600 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td> */}
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? (
                        <div className="flex flex-col items-center">
                          <Search className="w-8 h-8 text-gray-300 mb-2" />
                          <p>No sponsors found matching "{searchTerm}"</p>
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-2 text-amber-500 hover:text-amber-600"
                          >
                            Clear search
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Building2 className="w-8 h-8 text-gray-300 mb-2" />
                          <p>No sponsors available</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                {filteredAndSortedSponsors.length > 0 ? (
                  <>
                    Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredAndSortedSponsors.length)} to{" "}
                    {Math.min(currentPage * rowsPerPage, filteredAndSortedSponsors.length)} of{" "}
                    {filteredAndSortedSponsors.length} sponsors
                    {searchTerm && ` (filtered from ${sponsors.length} total)`}
                  </>
                ) : (
                  <>No sponsors to display</>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-1 ${
                    currentPage > 1
                      ? "border-gray-200 hover:bg-gray-50 text-gray-700"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handlePrevious}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">
                  {currentPage} / {totalPages || 1}
                </div>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                    currentPage < totalPages
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SponsorList

