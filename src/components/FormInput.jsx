import React from 'react'

const FormInput = ({ type, id, placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all ${className}`}
    />
  )
}

export default FormInput
