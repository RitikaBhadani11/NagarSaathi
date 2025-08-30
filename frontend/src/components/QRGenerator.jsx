// src/components/QRGenerator.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRGenerator = () => {
  const navigate = useNavigate();
  const qrValue = `${window.location.origin}/public-complaint`;
  
  // Generate QR code using external service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(qrValue)
      .then(() => alert('Complaint form link copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'wardwatch-complaint-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-indigo-600 py-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Generate QR Code</h1>
          <p className="text-indigo-100 mt-2">Create a QR code for the complaint form</p>
        </div>

        <div className="p-8 flex flex-col items-center">
          <div className="border-4 border-indigo-100 rounded-lg p-4 mb-6 bg-white">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-48 h-48"
            />
          </div>
          
          <p className="text-gray-600 text-center mb-4 font-medium">
            This QR code links to the public complaint form (no login required)
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
            <p className="text-sm text-gray-700 break-all text-center">
              <strong>URL:</strong><br />
              {qrValue}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={downloadQRCode}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Download QR Code
            </button>
            
            <button
              onClick={copyLink}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition duration-200"
            >
              Copy Link
            </button>
            
            <button
              onClick={() => navigate('/public-complaint')}
              className="bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
            >
              Go to Complaint Form
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800 font-medium py-2"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;