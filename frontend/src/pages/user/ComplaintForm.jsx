import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const ComplaintForm = ({ userName = 'Ritika Bhadani', ward = 'Ward 12', onComplaintSubmit }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    ward: ward,
    image: null,
  });
  const [complaintsThisWeek, setComplaintsThisWeek] = useState(0);
  const [maxComplaintsReached, setMaxComplaintsReached] = useState(false);

  const categories = ["Waste", "Road Damage", "Water Supply", "Safety", "Others"];
  const wards = Array.from({ length: 20 }, (_, i) => `Ward ${i+1}`);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentComplaints = storedComplaints.filter(complaint => {
      return new Date(complaint.date) > oneWeekAgo && complaint.userName === userName;
    });
    
    setComplaintsThisWeek(recentComplaints.length);
    setMaxComplaintsReached(recentComplaints.length >= 2);
  }, [userName]);

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
    
    if (maxComplaintsReached) {
      alert("You've reached your limit of 2 complaints per week. Please wait to submit more.");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title: `${formData.category} Complaint`,
      description: formData.description,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      ward: formData.ward,
      userName: userName
    };

    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const updatedComplaints = [...storedComplaints, newComplaint];
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));

    if (onComplaintSubmit) {
      onComplaintSubmit(newComplaint);
    }

    setFormData({
      category: "",
      description: "",
      ward: ward,
      image: null,
    });
    setPreviewImage(null);
    setComplaintsThisWeek(prev => prev + 1);
    setMaxComplaintsReached(complaintsThisWeek + 1 >= 2);

    alert("Complaint submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <Navbar />
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Submit a Complaint</h2>
          
          {maxComplaintsReached && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
              <p>You've reached your limit of 2 complaints this week. You can submit more after {(new Date()).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.</p>
            </div>
          )}
          
          <p className="text-center text-gray-600 mb-6">
            Complaints submitted this week: {complaintsThisWeek}/2
          </p>
          
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
                disabled={maxComplaintsReached}
                className={`bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all w-full ${
                  maxComplaintsReached ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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