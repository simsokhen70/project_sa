'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setIsVerifying(true);
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Submitting OTP:', otpValue);
    // Add your verification logic here
    
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-blue-600 text-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Verify Your Account</h1>
        <p className="text-xl mb-8">Enter the 6-digit code we sent to your email to confirm your account and get started.</p>
        <div className="mt-auto">
          <p className="text-sm opacity-75">Need help?</p>
          <p className="text-lg font-semibold">support@example.com</p>
        </div>
      </div>
      <div className="md:w-1/2 p-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((data, index) => (
                <motion.input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
                  whileFocus={{ scale: 1.05 }}
                />
              ))}
            </div>
            <motion.button
              type="submit"
              disabled={isVerifying}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </motion.button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Didnt receive the code?{' '}
            <motion.button 
              className="text-blue-600 font-medium hover:underline focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resend
            </motion.button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}