
import { motion } from "framer-motion";
import { Building2, Users, Award, TrendingUp, MapPin, Shield, CheckCircle2, XCircle, RefreshCcw, Search, ChevronDown, ArrowUpDown } from 'lucide-react';

const SponsorList = () => {
  const stats = [
    {
      title: "All Sponsors",
      count: 234,
      icon: Building2,
      trend: "+12% from last month",
      color: "from-yellow-400 to-amber-500",
    },
    {
      title: "New Sponsors",
      count: 45,
      icon: Users,
      trend: "+5% from last month",
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "License Updates",
      count: 28,
      icon: Award,
      trend: "+8% from last month",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  // Dummy data for sponsors table
  const sponsors = [
    {
      id: 1,
      company: "TechCorp Solutions",
      location: "New York, USA",
      licenseTier: "Enterprise",
      status: "active",
      lastUpdated: "2024-02-25",
    },
    {
      id: 2,
      company: "Global Innovations Ltd",
      location: "London, UK",
      licenseTier: "Professional",
      status: "updated",
      lastUpdated: "2024-02-24",
    },
    {
      id: 3,
      company: "Future Systems Inc",
      location: "Tokyo, Japan",
      licenseTier: "Enterprise",
      status: "removed",
      lastUpdated: "2024-02-23",
    },
    // Add more dummy data as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "updated":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "removed":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4" />;
      case "updated":
        return <RefreshCcw className="w-4 h-4" />;
      case "removed":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="HR Solutions" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HR Solutions</h1>
              <p className="text-sm text-gray-500">Sponsor List</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.count}</h3>
                  <p className="text-sm text-gray-500 mt-2 flex items-center">
                    <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                    {stat.trend}
                  </p>
                </div>
                <div className={`rounded-full p-4 bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30" />
            </motion.div>
          ))}
        </div>

        {/* Sponsors Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Sponsor List</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search sponsors..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all w-full sm:w-64"
                  />
                </div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                  Filter
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      Company
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      Location
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      License Tier
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      Last Updated
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sponsors.map((sponsor, index) => (
                  <motion.tr
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                          {sponsor.company.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{sponsor.company}</div>
                          <div className="text-sm text-gray-500">ID: {sponsor.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{sponsor.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-yellow-500" />
                        <span>{sponsor.licenseTier}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sponsor.status)}`}>
                        {getStatusIcon(sponsor.status)}
                        {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(sponsor.lastUpdated).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing 1 to {sponsors.length} of {sponsors.length} sponsors
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorList;