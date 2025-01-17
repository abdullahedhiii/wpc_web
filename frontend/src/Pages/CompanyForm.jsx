

const CompanyForm = () => {
   return(
     <>
        <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h1 className="text-blue-600 text-xl font-medium">Profile Update</h1>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Organization Name */}
          <div className="relative">
            <label className="block text-sm mb-1">
              Organisation Name
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="Work Permit Cloud Ltd"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                Find
              </button>
            </div>
          </div>

          {/* Type of Organization */}
          <div>
            <label className="block text-sm mb-1">
              Type of Organisation
              <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border rounded-md bg-white">
              <option>Private Company Limited by shares</option>
            </select>
          </div>

          {/* Registration No */}
          <div>
            <label className="block text-sm mb-1">
              Registration No.
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="11484732"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                Find
              </button>
            </div>
          </div>

          {/* Contact No */}
          <div>
            <label className="block text-sm mb-1">
              Contact No.
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="07968180454"
            />
          </div>

          {/* Login Email ID */}
          <div>
            <label className="block text-sm mb-1">
              Login Email ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
              defaultValue="lutfur@workpermitcloud.co.uk"
              readOnly
            />
          </div>

          {/* Organisation Email ID */}
          <div>
            <label className="block text-sm mb-1">
              Organisation Email ID
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="lutfur@workpermitcloud.co.uk"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm mb-1">Website</label>
            <input
              type="url"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="https://www.workpermitcloud.co.uk/"
            />
          </div>

          {/* Landline Number */}
          <div>
            <label className="block text-sm mb-1">Landline Number</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="07449992991"
            />
          </div>

          {/* Trading Name */}
          <div>
            <label className="block text-sm mb-1">
              Trading Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="Work Permit Cloud"
            />
          </div>

          {/* Trading Period */}
          <div>
            <label className="block text-sm mb-1">
              Trading Period
              <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border rounded-md bg-white">
              <option>Over 12 to 18 months</option>
            </select>
          </div>

          {/* Name of Sector */}
          <div>
            <label className="block text-sm mb-1">
              Name of Sector
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="Other service activities"
            />
          </div>
        </div>

        {/* Organization Change Question */}
        <div>
          <label className="block text-sm mb-1">
            Have you changed Organisation/Trading name in last 5 years?
            <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md bg-white">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Penalty Question */}
        <div>
          <label className="block text-sm mb-1">
            Did your organisation faced penalty (e.g., recruiting illegal employee) in last 5 years?
            <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md bg-white">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm mb-1">
            Your Logo
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-md bg-gray-50 text-sm">
              Choose File
            </button>
            <span className="text-sm text-gray-500">No file chosen</span>
          </div>
        </div>

        {/* Authorized Person Details Section */}
        <div>
          <h2 className="text-blue-600 text-lg font-medium mb-4">
            Authorised Person Details
          </h2>
          {/* Additional fields would go here */}
        </div>
      </form>
    </div>
     </>
   );
};

export default CompanyForm