import { useState } from "react";
import Navbar from "./Navbar";

const ComplaintForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    ward: "",
    image: null,
  });

  const categories = ["Waste", "Road Damage", "Water Supply", "Safety", "Others"];
  const wards = Array.from({ length: 20 }, (_, i) => `Ward ${i+1}`);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic (e.g., to backend)
    alert("Complaint submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <Navbar />
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Submit a Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue clearly..."
                required
                rows="4"
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>

            {/* Ward */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Select Ward</label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">-- Select Ward --</option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-xl file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-100 file:text-indigo-700
                  hover:file:bg-indigo-200
                "
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full max-w-xs h-auto rounded-lg shadow-md border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData({...formData, image: null});
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all w-full"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;