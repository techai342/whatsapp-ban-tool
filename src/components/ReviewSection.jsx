import React from 'react'
import { FaEnvelope, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const ReviewSection = ({ formData, selectedEmailType, refId, onBack, onSend }) => {
  const formattedNumber = formData.countryCode + " " + formData.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2$3')
  
  const getEmailPreview = () => {
    if (selectedEmailType === 'recovery') {
      return `Dear WhatsApp Support Team,

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
      return `Dear WhatsApp Support Team,

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
  }

  const getSubject = () => {
    if (selectedEmailType === 'recovery') {
      return `Account Recovery Request - WhatsApp Number ${formattedNumber}`
    } else {
      return `Permanent Ban Request - WhatsApp Number ${formattedNumber}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2">
          Email Preview
        </label>
        
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500">To</p>
              <p className="text-sm font-medium">support@whatsapp.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Reference</p>
              <p className="text-sm font-mono font-bold text-green-600">{refId}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500">Subject</p>
            <p className="text-sm font-medium">{getSubject()}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-2">Email Body Preview</p>
            <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {getEmailPreview()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
        <div className="flex items-start">
          <div className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5">
            ✓
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Ready to Send!</p>
            <p className="text-xs text-green-700 mt-1">
              Click the button below. Your email app will open with this pre-written email. Just click "Send" in your email app.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button
          onClick={onSend}
          className="pulse flex-1 whatsapp-green hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <FaEnvelope />
          <span>Open Email to Send</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewSection
