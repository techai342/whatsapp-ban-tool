import React from 'react'

const SuccessMessage = ({ message, details, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm animate-fade-in">
      <div className="flex items-start">
        <div className="w-6 h-6 text-green-600 mr-3 flex-shrink-0">
          ✓
        </div>
        <div>
          <p className="font-bold">{message}</p>
          <p className="text-sm mt-1">{details}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-green-700 hover:text-green-900"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default SuccessMessage
