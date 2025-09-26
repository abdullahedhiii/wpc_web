// src/pages/Blog.jsx
export default function Blog() {
    const blogPosts = [
      {
        id: 1,
        title: "How to Upload Attendance from Excel in UKG-HR",
        excerpt: "Easily import your staff attendance with just a few clicks. Here's how…",
        category: "How-to Guide",
        icon: "📌",
        videoUrl: "https://www.youtube.com/watch?v=HFJ9QncFtFM",
        date: "March 15, 2024"
      },
      {
        id: 2,
        title: "Leave Management Made Simple",
        excerpt: "See how to handle leave requests and approvals without the hassle.",
        category: "How-to Guide", 
        icon: "📌",
        videoUrl: "https://www.youtube.com/watch?v=HFJ9QncFtFM",
        date: "March 10, 2024"
      },
      {
        id: 3,
        title: "UKG-HR Pricing Explained — Why It's the Most Affordable Option",
        excerpt: "A breakdown of our Enterprise and Lifetime plans and how they compare to competitors.",
        category: "Product Update",
        icon: "📌", 
        videoUrl: "https://www.youtube.com/watch?v=HFJ9QncFtFM",
        date: "March 5, 2024"
      }
    ];
  
    const categories = [
      {
        title: "How-to Guides",
        description: "Step-by-step tutorials on using UKG-HR (attendance upload, leave management, reporting, etc.)",
        icon: "✅"
      },
      {
        title: "HR Best Practices",
        description: "Practical advice for small business owners and managers.",
        icon: "💡"
      },
      {
        title: "Product Updates",
        description: "What's new in UKG-HR software.",
        icon: "📢"
      },
      {
        title: "Video Walkthroughs",
        description: "Links to our YouTube demos for quick learning.",
        icon: "🎥"
      }
    ];
  
    return (
      <div className="pt-24 px-6 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
          <h1 className="text-5xl md:text-4xl font-bold text-yellow-600 mb-6 leading-tight">
          UKG-HR Blog
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Welcome to the UKG-HR Blog — your go-to resource for tips, guides, 
              and updates on managing HR the simple way.
            </p>
          </div>
  
          {/* What We Share */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Here We Share
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-600">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                  <p className="text-gray-700">{category.description}</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* Latest Posts */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Latest Posts
              </h2>
              <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{post.icon}</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm ml-4">{post.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-yellow-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      <a 
                        href={post.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all duration-200"
                      >
                        <span className="mr-2">🎥</span>
                        Watch Tutorial
                      </a>
                    </div>
                    <div className="lg:w-64">
                      <div className="bg-gray-100 rounded-2xl p-8 text-center">
                        <div className="text-4xl mb-4">🎬</div>
                        <p className="text-gray-600 font-medium">Video Tutorial Available</p>
                        <p className="text-sm text-gray-500 mt-2">Click to watch on YouTube</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
  
          {/* YouTube Subscribe Section */}
          <section className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <div className="text-6xl mb-6">📺</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Subscribe to our YouTube channel for quick demos and walkthroughs of all UKG-HR features.
              </p>
              <a 
                href="https://www.youtube.com/@UKGHR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-200"
              >
                <span className="mr-3">▶️</span>
                Subscribe on YouTube
              </a>
            </div>
          </section>
  
          {/* Newsletter Signup
          <section className="mb-16">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Never Miss an Update</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Get notified when we publish new tutorials, tips, and product updates. 
                  Join our mailing list for the latest UKG-HR insights delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <button className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all duration-200 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    );
  }