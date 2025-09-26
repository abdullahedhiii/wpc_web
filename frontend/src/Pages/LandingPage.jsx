"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Star, Users, Building2, BarChart3, Shield, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Careers from './Career';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Blog from './Blog';

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
    { icon: Building2, title: "Attendance Upload (Excel / CSV) ", description: "Import time-sheets instantly—no integrations required." },
    { icon: BarChart3, title: "Leave & Absence ", description: "Fast request submission, one-click approvals and clear absence tracking." },
    { icon: Shield, title: "Reports", description: "Produce detailed attendance and absence reports for easy review and record-keeping; all reporting is available within the system." },
    { icon: Clock, title: "User Access & Roles", description: "Simple role-based permissions for managers and admins." },
    { icon: DollarSign, title: "Simple Pricing", description: "£50/year for 10 employees transparent, predictable costs. Which is £4.16/month, most affordable in the market." },
  ];

  const pricingFeatures = [
   " Unlimited Employee Profiles",
    "Reports — in-app attendance and absence reports for review",
    "Simple approval workflows — quick request & one-click approvals",
    "Support & onboarding included",
    "Attendance import via Excel/CSV; in-app reporting available",
    "Mobile-friendly web app — accessible from phones and tablets",
    "Document management area (ability to attach files).",
    "Role / user access controls." 
 ];

 const [page,setPage] = useState("home")
    
 if (page != 'home'){
  return (
  <div className="">
  <nav
  className={`fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
  }`}
>
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-yellow-600">HR Solutions</div>

      {/* Middle: Nav Links */}
      <div className="hidden md:flex space-x-8">
    
      <button onClick={() => setPage("home")} className="hover:text-yellow-600">
            Home
          </button>
        <button onClick={() => setPage("careers")} className="hover:text-yellow-600">
            Careers
          </button>
          <button onClick={() => setPage("about")} className="hover:text-yellow-600">
            About Us
          </button>
          <button onClick={() => setPage("contact")} className="hover:text-yellow-600">
            Contact
          </button>
          <button onClick={() => setPage("blog")} className="hover:text-yellow-600">
            Blog
          </button>
      </div>

      {/* Right: CTA Button */}
      <button
        className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  </div>
</nav>

  
  {page === "careers" && <Careers />}
  {page === "about" && <AboutUs/>}
  {page === "contact" && <ContactUs/>}
  {page === "blog" && <Blog/>}
  
  <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">HR Solutions</h3>
              <p className="text-gray-400">Transform your HR management with our simple solution.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Employee Management</li>
                <li>Leave Management</li>
                <li>Manual Attendance Management </li>
                <li>Most Affordable</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                 <button onClick={() => setPage("careers")} className="hover:text-yellow-600">
                  Careers
                 </button>
                </li>
                <li>
                <button onClick={() => setPage("contact")} className="hover:text-yellow-600">
                  Contact
                 </button>
                </li>
                <li>
                <button onClick={() => setPage("about")} className="hover:text-yellow-600">
                  About Us
                 </button>
                </li>
                <li>
                <button onClick={() => setPage("blog")} className="hover:text-yellow-600">
                  Blog
                 </button>
                </li>
              </ul>
            </div>
            <div>
  <h4 className="text-lg font-semibold mb-4">Contact</h4>
  <ul className="space-y-2 text-gray-400">
    <li>support@ukg-hr.com</li>
    <li>
      <a 
        href="https://www.youtube.com/@UKGHR" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-yellow-500 transition-colors duration-200"
      >
        youtube.com/@UKGHR
      </a>
    </li>
  </ul>
</div>

          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
</div>
 )}  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
  <nav
  className={`fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
  }`}
>
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-yellow-600">HR Solutions</div>

      {/* Middle: Nav Links */}
      <div className="hidden md:flex space-x-8">
        <a 
         href = "#features" className="text-gray-700 hover:text-yellow-600 transition-colors">
          Features
        </a>
        <a href="#pricing" className="text-gray-700 hover:text-yellow-600 transition-colors">
          Pricing
        </a>
        <button onClick={() => setPage("careers")} className="hover:text-yellow-600">
            Careers
          </button>
          <button onClick={() => setPage("about")} className="hover:text-yellow-600">
            About Us
          </button>
          <button onClick={() => setPage("contact")} className="hover:text-yellow-600">
            Contact
          </button>
          <button onClick={() => setPage("blog")} className="hover:text-yellow-600">
            Blog
          </button>
      </div>

      {/* Right: CTA Button */}
      <button
        className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  </div>
</nav>

  
      <section className="pt-32 pb-4 px-4 bg-white relative overflow-hidden">
    <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob" />
    <div className="absolute top-40 right-10 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-20 left-1/2 w-48 h-48 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
  </div>

  <div className="container mx-auto text-center relative z-10">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
    >
      Most Affordable HR Software — Just £50/Year or £199 Lifetime
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
    >
     Save time and money <br/>Upload staff attendance from Excel/CSV and manage HR with ease.
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
            src='/images/new-logo.jpeg' 
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Most Affordable Packages
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6">We keep it simple — only two options:</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Enterprise Package */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise Package</h3>
                <div className="text-5xl font-bold text-yellow-500 mb-2">
                  £{import.meta.env.VITE_AMOUNT_ENTERPRISE_SHOW || '50'}
                </div>
                <div className="text-gray-600 text-lg mb-4">/yearly</div>
          
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Perfect for growing businesses</p>
              </div>
            </div>

            {/* Lifetime Package */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-yellow-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  BEST VALUE
                </span>
              </div>
              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Lifetime Package</h3>
                <div className="text-5xl font-bold text-yellow-500 mb-2">
                  £{import.meta.env.VITE_AMOUNT_LIFETIME_SHOW || '199'}
                </div>
                <div className="text-gray-600 text-lg mb-4">/one-time</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Save money in the long run</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-200">
                  <CheckCircle className="text-yellow-500 w-6 h-6 mr-4 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button 
                className="bg-yellow-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => navigate('/login')}
              >
                Get Started Now
              </button>
       
            </div>
          </div>

         
        </div>
      </div>
    </section>

   
            <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">HR Solutions</h3>
              <p className="text-gray-400">Transform your HR management with our simple solution.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Employee Management</li>
                <li>Leave Management</li>
                <li>Manual Attendance Management </li>
                <li>Most Affordable</li>
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
    <li>support@ukg-hr.com</li>
    <li>
      <a 
        href="https://www.youtube.com/@UKGHR" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-yellow-500 transition-colors duration-200"
      >
        youtube.com/@UKGHR
      </a>
    </li>
  </ul>
</div>

          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;