// src/pages/Careers.jsx
export default function Careers() {
    return (
      <div className="pt-24 px-6 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-4xl font-bold text-yellow-600 mb-6 leading-tight">
              Careers at UKG-HR
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Join us in building simple, affordable HR software that helps small
              businesses thrive. At UKG-HR, we believe in keeping things practical,
              straightforward, and cost-effective — and we're always looking for
              people who share that vision.
            </p>
          </div>
  
          {/* Why Work With Us */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Work With Us
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast-Growing Startup</h3>
                <p className="text-gray-700">Join a company with a clear mission and exciting growth trajectory.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Collaborative Team</h3>
                <p className="text-gray-700">Small team where every idea matters and your voice is heard.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Remote-Friendly</h3>
                <p className="text-gray-700">Work from anywhere with our flexible, remote-first culture.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Impactful Work</h3>
                <p className="text-gray-700">Help shape software used by small businesses across the UK.</p>
              </div>
            </div>
          </section>
  
          {/* Current Opportunities */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Current Opportunities
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Software Developers (PHP, Laravel, MySQL)</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">UI/UX Designers</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Customer Support Specialists</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-yellow-50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">Sales & Marketing Executives</span>
                </div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-xl">
                <p className="text-gray-600 text-lg">
                  If you don't see a role that fits but think you'd be a great match,
                  we'd still love to hear from you!
                </p>
              </div>
            </div>
          </section>
  
          {/* How to Apply */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                How to Apply
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <div className="mb-8">
                <div className="text-6xl mb-6">📧</div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Email your CV and a short introduction to{" "}
                  <a
                    href="mailto:careers@ukg-hr.com"
                    className="text-yellow-600 font-semibold hover:underline transition-all duration-200"
                  >
                    careers@ukg-hr.com
                  </a>
                </p>
                <p className="text-gray-600 text-base">
                  Be sure to include the role you're applying for in the subject line.
                </p>
              </div>
              
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-8 rounded-2xl text-left max-w-2xl mx-auto">
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">✨</div>
                  <div>
                    <h3 className="text-gray-800 font-bold text-lg mb-2">Our Promise</h3>
                    <p className="text-gray-800 leading-relaxed">
                      At UKG-HR, you'll never be just another employee — you'll be part of 
                      building something that truly makes HR easier for small businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }