// src/components/QRScanner.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  // In your QRScanner.jsx, update the handleScan function:
const handleScan = (result) => {
  if (result) {
    // Check if the result is a valid complaint form URL
    if (result.text.includes('/public-complaint') || result.text.includes('/complaint')) {
      navigate('/public-complaint');
    } else {
      setError('Invalid QR code. Please scan a valid WardWatch complaint QR code.');
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-indigo-600 py-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Scan QR Code</h1>
          <p className="text-indigo-100 mt-2">Scan a WardWatch complaint QR code</p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h1m-6 0v1m-6-1h1M5 12h14M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                <p className="text-gray-500">
                  Camera preview would appear here
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  (QR scanner library required)
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800 text-sm text-center">
              <strong>Note:</strong> To generate a QR code, go to the{" "}
              <button 
                onClick={() => navigate('/generate-qr')}
                className="text-blue-600 underline font-medium"
              >
                QR Generator
              </button>{" "}
              page
            </p>
          </div>
          
          <p className="text-gray-600 text-center mb-6">
            For demonstration, click the button below to go to the complaint form
          </p>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/complaint')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 mb-4 w-full"
            >
              Go to Complaint Form
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;