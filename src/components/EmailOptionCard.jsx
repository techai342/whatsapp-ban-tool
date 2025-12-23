import React from 'react'

const EmailOptionCard = ({ type, title, description, icon, isSelected, onClick, highlightText, highlightColor }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 border-green-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200'
  }

  return (
    <div
      className={`email-option border border-gray-200 rounded-xl p-5 hover:shadow-md ${
        isSelected ? 'selected' : ''
      } ${type === 'recovery' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
          type === 'recovery' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          {highlightText && (
            <div className={`mt-3 text-xs font-medium px-3 py-1 rounded-full inline-block ${colorClasses[highlightColor]}`}>
              {highlightText}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailOptionCard
