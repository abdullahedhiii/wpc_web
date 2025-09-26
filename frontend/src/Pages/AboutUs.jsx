// src/pages/AboutUs.jsx
export default function AboutUs() {
    return (
      <div className="pt-24 px-6 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
          <h1 className="text-5xl md:text-4xl font-bold text-yellow-600 mb-6 leading-tight">
          About UKG-HR
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              At UKG-HR, we believe small businesses deserve HR software that's simple, 
              affordable, and built for real everyday needs. Instead of overwhelming you 
              with complicated tools, we focus on the essentials: attendance tracking, 
              staff records, leave management, and clear reporting — everything you need 
              to keep your team organised.
            </p>
          </div>
  
          {/* Mission Section */}
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center border-l-4 border-yellow-600">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                To make HR management stress-free and cost-effective for small UK companies. 
                Whether you're managing 5 people or 500, our software is designed to help 
                you run your HR processes smoothly without breaking the bank.
              </p>
            </div>
          </section>
  
          {/* What We Offer */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What We Offer
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Employee Records</h3>
                <p className="text-gray-700">Centralised profiles and document storage for all your team members.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Attendance Upload</h3>
                <p className="text-gray-700">Import attendance easily from Excel/CSV sheets with simple drag-and-drop.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">🏖️</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Leave & Absence</h3>
                <p className="text-gray-700">Quick request and approval flows with simple absence tracking.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Reports</h3>
                <p className="text-gray-700">Generate attendance, absence, and staff reports for audits or reviews.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">🔐</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">User Access & Roles</h3>
                <p className="text-gray-700">Assign roles for managers, admins, and staff with proper permissions.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Affordable Pricing</h3>
                <p className="text-gray-700">Clear, flat packages with no hidden fees or surprise charges.</p>
              </div>
            </div>
          </section>
  
          {/* Why Choose UKG-HR */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose UKG-HR?
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <div className="space-y-6">
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="text-yellow-600 text-xl mr-4 mt-1">✔</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Unlimited employees in every package</h3>
                    <p className="text-gray-700">Grow without extra costs — no per-user fees ever.</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="text-yellow-600 text-xl mr-4 mt-1">✔</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Straightforward pricing</h3>
                    <p className="text-gray-700">Only £50/year or £199 lifetime — that's it.</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="text-yellow-600 text-xl mr-4 mt-1">✔</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Easy to use</h3>
                    <p className="text-gray-700">No training needed — upload your first file and you're ready.</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="text-yellow-600 text-xl mr-4 mt-1">✔</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Designed for small businesses</h3>
                    <p className="text-gray-700">We focus on what matters most — no bloated features.</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="text-yellow-600 text-xl mr-4 mt-1">✔</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Secure & reliable</h3>
                    <p className="text-gray-700">Keep your staff data safe at all times with enterprise-grade security.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          {/* Pricing Packages */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Pricing Packages
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
              <p className="text-lg text-gray-700 mt-6">We keep it simple — only two options:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise Package</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">£50</div>
                <div className="text-gray-600 mb-6">/year</div>
                <p className="text-gray-700 mb-6">
                  Affordable yearly subscription with unlimited employees and full access to all features.
                </p>
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Perfect for growing businesses</p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 border-yellow-600">
                <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                  BEST VALUE
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Lifetime Package</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">£199</div>
                <div className="text-gray-600 mb-6">one-time</div>
                <p className="text-gray-700 mb-6">
                  Pay once, use forever. Unlimited employees, unlimited access, no renewal fees.
                </p>
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Save money in the long run</p>
                </div>
              </div>
            </div>
          </section>
  
       {/* Demo Section */}
<section className="mb-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      See It in Action
    </h2>
    <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
  </div>
  <div className="bg-white rounded-3xl shadow-xl p-10">
    <div className="text-center mb-8">
      <div className="text-6xl mb-6">🎥</div>
      <p className="text-lg text-gray-700">
        Want to see how easy it is? Watch our demo video for a quick walkthrough of UKG-HR in action.
      </p>
    </div>
    
    {/* YouTube Video Embed */}
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src="https://www.youtube.com/embed/HFJ9QncFtFM"
          title="UKG-HR Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
      
      {/* Video Description */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-4">
          This demo shows you how to get started with UKG-HR in just a few minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://www.youtube.com/watch?v=HFJ9QncFtFM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-yellow-600 font-medium hover:underline"
          >
            <span className="mr-2">▶️</span>
            Watch on YouTube
          </a>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <a 
            href="https://www.youtube.com/@UKGHR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 hover:text-yellow-600 transition-colors duration-200"
          >
            <span className="mr-2">📺</span>
            Subscribe to our channel
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
          {/* Promise Section */}
          <section className="mb-16">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-8 rounded-2xl text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="text-3xl mr-4">✨</div>
                <h3 className="text-2xl font-bold text-gray-800">Our Promise</h3>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed max-w-2xl mx-auto">
                No hidden fees. No complicated add-ons. Just the simplest way to manage HR tasks at the lowest cost.
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }