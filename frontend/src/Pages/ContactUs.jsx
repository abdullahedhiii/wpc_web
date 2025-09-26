// src/pages/ContactUs.jsx
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact-email`,
        formData // sending name, email, subject, message
      );
  
      if (res.data.success) {
        setSubmitStatus("success");
        toast.success('Your message has been emailed to the support staff')
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
  
        // Clear success message after 5s
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="pt-24 px-6 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
        <h1 className="text-5xl md:text-4xl font-bold text-yellow-600 mb-6 leading-tight">
        Contact Us
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have a question about features, 
            pricing, or need support, our team is here to help.
          </p>
        </div>

        {/* Direct Email Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Us Directly</h2>
            <a 
              href="mailto:support@ukg-hr.com"
              className="text-2xl font-semibold text-yellow-600 hover:underline transition-all duration-200"
            >
              support@ukg-hr.com
            </a>
          </div>
        </section>

        {/* Contact Form Section
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-700 mt-6">
              Fill in the form below and we'll get back to you within 24 hours (Mon–Fri).
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-10">
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-xl">
                <div className="flex items-center">
                  <div className="text-green-500 text-2xl mr-4">✅</div>
                  <div>
                    <h3 className="text-green-800 font-semibold text-lg">Message Sent!</h3>
                    <p className="text-green-700">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-yellow-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-yellow-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-yellow-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </section> */}

        {/* How We Can Help */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How We Can Help
            </h2>
            <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">General Inquiries</h3>
              <p className="text-gray-700">Ask us anything about UKG-HR features, functionality, or how it works.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Support</h3>
              <p className="text-gray-700">Get help with setup, attendance uploads, leave management, or troubleshooting.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sales & Pricing</h3>
              <p className="text-gray-700">Need a plan for more employees? Reach out for a custom quote or pricing info.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
              <div className="text-4xl mb-4">💭</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Feedback</h3>
              <p className="text-gray-700">Share your ideas, suggestions, or feature requests to help us improve UKG-HR.</p>
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="mb-16">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-8 rounded-2xl text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="text-3xl mr-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-800">We Keep It Simple</h3>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed max-w-2xl mx-auto">
              No call centres, no waiting on hold — just fast, direct email support.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}