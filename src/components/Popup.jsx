import React from 'react';

function Popup({ card, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
        <p className="mb-6 text-gray-300">{card.text}</p>
        <button 
          onClick={onClose} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;