import React, { useState } from 'react';
import Navbar from './Navbar';

const initialComplaintsData = [
  {
    id: 1,
    title: 'Garbage not collected',
    description: 'Garbage has not been collected for 3 days.',
    status: 'Pending',
    date: '2025-06-01',
  },
  {
    id: 2,
    title: 'Streetlight broken',
    description: 'Streetlight near park is not working.',
    status: 'In Progress',
    date: '2025-05-28',
  },
  {
    id: 3,
    title: 'Potholes on main road',
    description: 'Road has many potholes causing accidents.',
    status: 'Resolved',
    date: '2025-05-20',
  },
];

const statusStyles = {
  Pending: 'bg-yellow-200 text-yellow-800',
  'In Progress': 'bg-blue-200 text-blue-800',
  Resolved: 'bg-green-200 text-green-800',
};

const MyComplaints = ({ userName = 'Ritika Bhadani', ward = 'Ward 12' }) => {
  const [complaints, setComplaints] = useState(initialComplaintsData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // Stores ID of complaint to delete

  const handleDelete = (id) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          My Complaints
        </h1>

        <div className="mb-8">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {userName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Ward:</span> {ward}
          </p>
        </div>

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
                <p className="text-sm text-gray-400">
                  Date Filed: {new Date(complaint.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;