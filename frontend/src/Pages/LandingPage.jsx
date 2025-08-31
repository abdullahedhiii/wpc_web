"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Star, Users, Building2, BarChart3, Shield, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/hrms/employeeDashboard");
    }
  }, [user]);

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
            <div className="flex items-center space-x-8">
              <a href="#features" className="hidden text-gray-700 hover:text-yellow-600 transition-colors">Features</a>
              <a href="#pricing" className="hidden text-gray-700 hover:text-yellow-600 transition-colors">Pricing</a>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105"
                onClick={() => navigate('/hr-solutions/sponsors')}
              >
                Sponsor List
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 bg-white relative overflow-hidden">
    <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob" />
    <div className="absolute top-40 right-10 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-20 left-1/2 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
  </div>

  <div className="container mx-auto text-center relative z-10">
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
      className="relative max-w-2xl mx-auto" // Reduced from max-w-4xl to max-w-2xl
    >
            <div className="relative inline-block">                 <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse animation-delay-200" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse animation-delay-400" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full animate-pulse animation-delay-600" />

                <div className="absolute top-0 left-0 w-12 h-1 bg-yellow-400 transform -rotate-45 origin-top-left" />
        <div className="absolute top-0 right-0 w-12 h-1 bg-yellow-400 transform rotate-45 origin-top-right" />
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400 transform rotate-45 origin-bottom-left" />
        <div className="absolute bottom-0 right-0 w-12 h-1 bg-yellow-400 transform -rotate-45 origin-bottom-right" />

                <div className="relative rounded-xl overflow-hidden p-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
          <img 
            src='/images/main.gif' 
            className='w-full max-w-xl rounded-lg' // Added max-width constraint
            style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.15)' }}
          />
        </div>

                {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-8, 8],
              x: Math.sin(i) * 8,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${15 + i * 14}%`,
              top: i % 2 === 0 ? '-15px' : 'calc(100% + 15px)',
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>

    <style jsx>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(20px, -30px) scale(1.1); }
      66% { transform: translate(-15px, 15px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-200 {
      animation-delay: 0.2s;
    }
    .animation-delay-400 {
      animation-delay: 0.4s;
    }
    .animation-delay-600 {
      animation-delay: 0.6s;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>

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

            <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            One-Time Purchase, Lifetime Value
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-yellow-500 p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Enterprise Package</h3>
              <div className="text-5xl font-bold mb-4">£{import.meta.env.VITE_AMOUNT}<span className="text-lg">/one-time</span></div>
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
              <button className="w-full bg-yellow-500 text-white mt-8 py-4 rounded-xl font-medium hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg"
               onClick={() => navigate('/login')}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

   
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