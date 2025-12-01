"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  FaTrash, 
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaTimesCircle,
  FaCalendarAlt,
  FaTag,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEnvelope
} from "react-icons/fa"
import Navbar from "../../components/Navbar"

const MyComplaints = () => {
  const [user, setUser] = useState(null)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
      fetchComplaints()
    } else {
      navigate("/login")
    }
  }, [navigate])

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setComplaints(data.complaints || [])
      } else {
        console.error("Failed to fetch complaints")
      }
    } catch (error) {
      console.error("Error fetching complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint._id !== id))
        setShowDeleteConfirm(null)
        alert("Complaint deleted successfully")
      } else {
        alert("Failed to delete complaint")
      }
    } catch (error) {
      console.error("Error deleting complaint:", error)
      alert("Error deleting complaint")
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{user.ward}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="h-5 w-5 text-indigo-500 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{complaints.length}</div>
                    <div className="text-sm text-gray-500">Total Complaints</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {complaints.filter(c => c.status === "Resolved").length}
                    </div>
                    <div className="text-sm text-gray-500">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {complaints.filter(c => c.status === "Pending").length}
                    </div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <h1 className="text-3xl font-bold">My Complaints</h1>
            <p className="text-blue-100 mt-1">All your reported community issues</p>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading complaints...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {complaints.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No complaints filed yet.</h3>
                    <p className="text-gray-500">Start by filing your first complaint to improve your community!</p>
                  </div>
                ) : (
                  complaints.map((complaint) => (
                    <div
                      key={complaint._id}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Delete Confirmation - RESTORED from original */}
                      {showDeleteConfirm === complaint._id ? (
                        <div className="absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
                          <p className="text-sm mb-3 text-gray-700">Delete this complaint?</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(complaint._id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded text-sm font-medium hover:shadow-lg transition-all"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded text-sm font-medium hover:shadow-lg transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(complaint._id)}
                          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete complaint"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 mb-2">{complaint.title}</h2>
                          <p className="text-gray-600 mb-2">{complaint.description}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          complaint.status === "Resolved"
                            ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
                            : complaint.status === "In Progress"
                            ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200"
                            : complaint.status === "Pending"
                            ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200"
                            : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200"
                        }`}>
                          {complaint.status}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <div className="flex items-center space-x-2">
                          <FaTag className="text-blue-500" />
                          <span>Category: {complaint.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaExclamationTriangle className="text-purple-500" />
                          <span>Priority: {complaint.priority}</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 mt-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-500" />
                          <span>Location: {complaint.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUserCircle className="text-gray-500" />
                          <span>Ward: {user.ward}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 pt-3 border-t border-gray-200">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>Date Filed: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComplaints