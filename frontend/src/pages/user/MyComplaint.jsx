import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const statusStyles = {
  Pending: 'bg-yellow-200 text-yellow-800',
  'In Progress': 'bg-blue-200 text-blue-800',
  Resolved: 'bg-green-200 text-green-800',
};

const MyComplaints = ({ userName = 'Ritika Bhadani', ward = 'Ward 12' }) => {
  const [complaints, setComplaints] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const userComplaints = storedComplaints.filter(complaint => complaint.userName === userName);
    setComplaints(userComplaints);
  }, [userName]);

  const handleDelete = (id) => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const updatedComplaints = storedComplaints.filter(complaint => complaint.id !== id);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setComplaints(updatedComplaints.filter(complaint => complaint.userName === userName));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-indigo-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
            <div className="flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">{ward}</span>
            </div>
            <button className="mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            My Complaints
          </h1>

          <div className="space-y-6">
            {complaints.length === 0 ? (
              <p className="text-center text-gray-500">No complaints filed yet.</p>
            ) : (
              complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 relative"
                >
                  {showDeleteConfirm === complaint.id ? (
                    <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md border">
                      <p className="text-sm mb-2">Delete this complaint?</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(complaint.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(complaint.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                      title="Delete complaint"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}

                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {complaint.title}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusStyles[complaint.status] || 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{complaint.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Category: {complaint.category}</span>
                    <span>Ward: {complaint.ward}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Date Filed: {new Date(complaint.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;