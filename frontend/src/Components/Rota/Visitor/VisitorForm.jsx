import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const VisitorForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    contact: "",
    address: "",
    description: "",
    date: "",
    time: "",
    reference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("changing ", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const hashKey = location.pathname.split("/").pop();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const send_data = { ...formData, key: hashKey };
      console.log("sending ", formData, send_data);
      const response = await axios.post("/api/registerVisitor", send_data);
      if (response.status === 201) {
        window.alert("Visit registered successfully");
        setFormData({
          name: "",
          designation: "",
          email: "",
          contact: "",
          address: "",
          description: "",
          date: "",
          time: "",
          reference: "",
        });
      }
    } catch (err) {
      window.alert("An error occurred");
      setFormData({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="relative flex flex-col items-center mb-8">
          <div className="absolute -top-8">
            <img src="/images/logo.png" alt="WPC Logo" className="w-32 h-20" />
          </div>
          <h1 className="m-4 text-center text-3xl font-semibold text-white bg-gray-700 p-8 w-full border-b-4 border-b-gray-700">
            Visitor Register
          </h1>
        </div>
        <h2 className="text-2xl  text-center text-tt font-bold mb-2 ">
            Visitor Details
        </h2>
        <div className="bg-[#FFF4F4] rounded-lg p-8 max-w-5xl mx-auto shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email ID:
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Reference:
                </label>
                <textarea
                  name="reference"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                  value={formData.reference}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Designation:
                </label>
                <input
                  name="designation"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Contact No.:
                </label>
                <input
                  type="tel"
                  name="contact"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Time:
                </label>
                <input
                  type="time"
                  name="time"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorForm;
