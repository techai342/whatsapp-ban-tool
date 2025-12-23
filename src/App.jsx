import { useState, useEffect } from 'react'
import { FaWhatsapp, FaEnvelope, FaArrowRight, FaArrowLeft, FaCheck, FaShieldAlt, FaLock } from 'react-icons/fa'
import EmailOptionCard from './components/EmailOptionCard'
import FormInput from './components/FormInput'
import ProgressSteps from './components/ProgressSteps'
import ReviewSection from './components/ReviewSection'
import SuccessMessage from './components/SuccessMessage'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState(1)
  const [selectedEmailType, setSelectedEmailType] = useState(null)
  const [formData, setFormData] = useState({
    name: 'Muhammad Saqib',
    countryCode: '+92',
    phoneNumber: '3478936242',
    email: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [refId, setRefId] = useState('WA-000000')

  // Generate random reference code on component mount
  useEffect(() => {
    const rand = Math.floor(100000 + Math.random() * 900000)
    setRefId(`WA-${rand}`)
  }, [])

  const handleNextSection = () => {
    if (currentSection === 1 && (!formData.name.trim() || !formData.phoneNumber.trim())) {
      alert("Please enter your name and WhatsApp number first.")
      return
    }
    
    if (currentSection === 2 && !selectedEmailType) {
      alert("Please select an email type first.")
      return
    }
    
    setCurrentSection(prev => prev + 1)
  }

  const handlePrevSection = () => {
    setCurrentSection(prev => prev - 1)
  }

  const handleSelectEmailType = (type) => {
    setSelectedEmailType(type)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSendEmail = () => {
    if (!formData.name || !formData.phoneNumber) {
      alert("Please enter your name and WhatsApp number first.")
      return
    }
    
    if (!selectedEmailType) {
      alert("Please select an email type first.")
      return
    }

    const formattedNumber = formData.countryCode + " " + formData.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2$3')
    const recipient = "support@whatsapp.com"
    
    let subject, body
    
    if (selectedEmailType === 'recovery') {
      subject = `Account Recovery Request - WhatsApp Number ${formattedNumber}`
      body = `Dear WhatsApp Support Team,

I hope you are doing well.

I am writing this email to kindly request a review of my WhatsApp account which has been banned recently. I believe this ban may have been applied by mistake, as I have not knowingly violated any WhatsApp Terms of Service or Community Guidelines.

My WhatsApp number is:
📞 ${formattedNumber}

This number is very important to me as I use it for personal communication, family contact, and daily use. I always try to follow WhatsApp rules and use the app responsibly.

If any activity from my account unintentionally violated your policies, I sincerely apologize and assure you that it will not happen again in the future. I kindly request you to please review my account and restore access if possible.

Thank you for your time and support. I look forward to your positive response.

Kind regards,
${formData.name}
Pakistan`
    } else {
      subject = `Permanent Ban Request - WhatsApp Number ${formattedNumber}`
      body = `Dear WhatsApp Support Team,

I hope you are doing well.

I am writing this email to request the permanent ban of my WhatsApp number due to serious security concerns. I believe my WhatsApp account may have been hacked or accessed by someone else without my permission, and there is a risk that it could be misused.

My WhatsApp number is:
📞 ${formattedNumber}

To avoid any misuse, scams, or illegal activity from my number, I kindly request you to please permanently ban or deactivate this WhatsApp account as soon as possible.

This request is being made for my personal safety and security, as the number may have fallen into the wrong hands.

Thank you for your time and support. I will appreciate your quick action in this matter.

Kind regards,
${formData.name}
Pakistan`
    }
    
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
    
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 6000)
  }

  const countryCodes = [
    { value: '+92', label: '🇵🇰 Pakistan (+92)' },
    { value: '+91', label: '🇮🇳 India (+91)' },
    { value: '+1', label: '🇺🇸 USA (+1)' },
    { value: '+44', label: '🇬🇧 UK (+44)' },
    { value: '+971', label: '🇦🇪 UAE (+971)' },
    { value: '+966', label: '🇸🇦 Saudi Arabia (+966)' }
  ]

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md glass-card overflow-hidden">
        {/* Header */}
        <div className="whatsapp-dark-green p-8 text-white text-center relative">
          <div className="flex justify-center mb-3">
            <FaWhatsapp className="text-5xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">WhatsApp Support</h1>
          <p className="text-green-100 text-sm opacity-90">Account Management Tool</p>
          <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full">
            <p className="text-[10px] font-mono">{refId}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentSection={currentSection} />

        {/* Form Sections */}
        <div className="p-6">
          {/* Section 1: Contact Information */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Your Information
                </label>
                
                <div className="space-y-3">
                  <FormInput
                    type="text"
                    id="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                  />
                  
                  <div className="flex space-x-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className="w-1/3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    >
                      {countryCodes.map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </select>
                    
                    <FormInput
                      type="tel"
                      id="phone"
                      placeholder="WhatsApp Number"
                      value={formData.phoneNumber}
                      onChange={(value) => handleInputChange('phoneNumber', value)}
                      className="w-2/3"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[11px] text-blue-800 leading-normal">
                  Your information will be used to generate the support email. The email will open in your email app with all details pre-filled.
                </p>
              </div>

              <button
                onClick={handleNextSection}
                className="whatsapp-btn w-full whatsapp-green hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Continue to Next Step</span>
                <FaArrowRight />
              </button>
            </div>
          )}

          {/* Section 2: Choose Email Type */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-4">
                  Select Email Type
                </label>
                
                <div className="space-y-4">
                  <EmailOptionCard
                    type="recovery"
                    title="Account Recovery Request"
                    description="Request WhatsApp to review and unban your account if it was banned by mistake."
                    icon={<FaCheck className="text-green-600" />}
                    isSelected={selectedEmailType === 'recovery'}
                    onClick={() => handleSelectEmailType('recovery')}
                    highlightText="✓ Use if your account was banned"
                    highlightColor="green"
                  />
                  
                  <EmailOptionCard
                    type="ban"
                    title="Permanent Ban Request"
                    description="Request WhatsApp to permanently ban your account due to security concerns."
                    icon={<FaLock className="text-red-600" />}
                    isSelected={selectedEmailType === 'ban'}
                    onClick={() => handleSelectEmailType('ban')}
                    highlightText="⚠️ Use if account is hacked or compromised"
                    highlightColor="red"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <div className="flex items-start">
                  <FaShieldAlt className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <span className="font-bold">Important:</span> Please select carefully. Once sent, the request will be processed by WhatsApp's support team.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePrevSection}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <FaArrowLeft />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNextSection}
                  disabled={!selectedEmailType}
                  className={`flex-1 font-medium py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2 ${
                    selectedEmailType
                      ? 'whatsapp-green hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Section 3: Preview & Send */}
          {currentSection === 3 && (
            <ReviewSection
              formData={formData}
              selectedEmailType={selectedEmailType}
              refId={refId}
              onBack={handlePrevSection}
              onSend={handleSendEmail}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-6 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Official WhatsApp Support Tool • Muhammad Saqib
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Email App Opened!"
          details="Your email is ready. Just click 'SEND' in your email app to submit to WhatsApp Support."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  )
}

export default App
