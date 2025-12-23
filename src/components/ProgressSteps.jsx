import React from 'react'

const ProgressSteps = ({ currentSection }) => {
  const steps = [
    { number: 1, label: 'Your Info' },
    { number: 2, label: 'Choose Action' },
    { number: 3, label: 'Send Email' }
  ]

  const getStepClass = (stepNumber) => {
    if (stepNumber < currentSection) return 'step-completed'
    if (stepNumber === currentSection) return 'step-active'
    return 'step-inactive'
  }

  return (
    <div className="px-6 pt-6">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getStepClass(step.number)}`}>
                {step.number}
              </div>
              <span className="text-xs font-medium text-gray-700">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ProgressSteps.jsx
