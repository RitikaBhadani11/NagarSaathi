// PublicComplaintForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "Medium",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Garbage", "Potholes", "Drainage", "Streetlights", 
    "Public Nuisance", "Water Supply", "Sewage", "Other"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Submitting complaint:", formData);
      
      const response = await fetch("http://localhost:5000/api/complaints/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${response.statusText}. Response: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();

      if (response.ok) {
        setSuccess("Complaint submitted successfully! Your reference ID: " + data.complaint._id);
        setFormData({
          name: "",
          ward: "",
          title: "",
          category: "",
          description: "",
          location: "",
          priority: "Medium",
        });
      } else {
        throw new Error(data.error || "Failed to submit complaint");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to connect to server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">File a Complaint</h2>
            <p className="text-gray-600 mt-2">No login required - submit your community issue quickly</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Ward Number *</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                placeholder="Enter your ward number"
                required
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Complaint Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title for your complaint"
                required
                maxLength={100}
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Specific location of the issue"
                required
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue clearly..."
                required
                maxLength={500}
                rows="4"
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicComplaintForm;