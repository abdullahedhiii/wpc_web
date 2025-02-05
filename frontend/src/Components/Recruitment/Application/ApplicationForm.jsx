import axios from "axios";
import React, { useState } from "react";

export default function ApplicationForm({ onBack,job_id ,jobTitle,organisation_id, }) {
  console.log(jobTitle,job_id,organisation_id)
  const [formData, setFormData] = useState({
    job_id : job_id,
    organisation_id: organisation_id, 
    jobTitle: jobTitle,
    name: "",
    email: "",
    contactNo: "",
    gender: "",
    dob: "",
    experienceYear: "",
    experienceMonth: "",
    education: "",
    recentPosition: "",
    nextJobTitle: "",
    currentCode: "",
    currentLocation: "",
    expectedSalary: "",
    resume: null,
    coverLetter: null,
    status : "Application Received"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0]
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try{
        const candidate = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          if (key === "coverLetter" &&formData[key]) {
            candidate.append(key, formData[key]);
          } else if (key === "resume" && formData[key]) {
            candidate.append(key, formData[key]);
          }
          else {
            candidate.append(key, formData[key]);
          }
        }
      }
      await axios.post(`/api/applyJob/${formData.organisation_id}.${formData.job_id}.${formData.email}`, candidate, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
     window.alert('request submitted successfully');
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto p-6 bg-[#FFF4F4] shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Job Application</h1>
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ← Back to Job Details
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{jobTitle}</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 bg-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Help Desk Technician"
              name="jobTitle"
              value={formData.jobTitle}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact No.</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience in Year</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="experienceYear"
              value={formData.experienceYear}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 years</option>
              <option value="1-2">1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience in Months</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="experienceMonth"
              value={formData.experienceMonth}
              onChange={handleChange}
            >
              <option value="">Select Months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i}>
                  {i} months
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Educational Qualification</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="3"
            name="education"
            value={formData.education}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Most Recent Position</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="recentPosition"
              value={formData.recentPosition}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Recent Job Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="nextJobTitle"
              value={formData.nextJobTitle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current/Past code</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="currentCode"
              value={formData.currentCode}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Location / Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected salary/CTC</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume * (pdf)</label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover Letter * (pdf)</label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="coverLetter"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-6 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
