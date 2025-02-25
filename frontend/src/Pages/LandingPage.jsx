"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Star, Users, Building2, BarChart3, Shield, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Users, title: "Employee Management", description: "Comprehensive employee data management and organization" },
    { icon: Building2, title: "Department Control", description: "Streamlined department structure and hierarchy management" },
    { icon: BarChart3, title: "Performance Tracking", description: "Advanced performance metrics and evaluation systems" },
    { icon: Shield, title: "Compliance Management", description: "Stay compliant with automated policy enforcement" },
    { icon: Clock, title: "Leave Management", description: "Efficient leave request and approval workflow" },
    { icon: DollarSign, title: "Sponsor Tracking", description: "Track sponsoring organisations in real time" },
  ];

  const pricingFeatures = [
    "Unlimited Employee Profiles",
    "Advanced Reporting",
    "Custom Workflow Builder",
    "API Access",
    "Priority Support",
    "Data Export/Import",
    "Custom Branding",
    "Mobile App Access"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-yellow-600">HR Solutions</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-yellow-600 transition-colors">Features</a>
              <a href="#services" className="text-gray-700 hover:text-yellow-600 transition-colors">Services</a>
              <a href="#pricing" className="text-gray-700 hover:text-yellow-600 transition-colors">Pricing</a>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Transform Your HR Management
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Streamline your HR processes with our comprehensive solution designed for modern businesses
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg">
              View User guide
            </button>
            <button className="bg-white text-yellow-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Powerful Features for Modern HR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-yellow-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            One-Time Purchase, Lifetime Value
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-yellow-500 p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Enterprise Package</h3>
              <div className="text-5xl font-bold mb-4">$999<span className="text-lg">/one-time</span></div>
              <p className="text-yellow-100">Everything you need to manage your HR operations</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pricingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-yellow-500 w-5 h-5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-yellow-500 text-white mt-8 py-4 rounded-xl font-medium hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Trusted by Leading Companies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-yellow-50 p-6 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This HR solution has transformed how we manage our workforce. The automation and insights are invaluable."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">John Doe</div>
                    <div className="text-sm text-gray-500">HR Director, Tech Corp</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">HR Solutions</h3>
              <p className="text-gray-400">Transform your HR management with our comprehensive solution.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Employee Management</li>
                <li>Leave Management</li>
                <li>Sponsor Tracking</li>
                <li>Performance Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@hrsolutions.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Business Ave</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;