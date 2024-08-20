"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportToTelegram() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const botUsername = 'OrginalKhenBot';
  const messageText = `Here is your Gigi deployment platform username: sokhen\nPlease click send now to interactive with Our bot.`; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct the Telegram link with the pre-defined message
    const telegramLink = `tg://msg_url?url=https://t.me/${botUsername}&text=${encodeURIComponent(messageText)}`;

    // Try to open the Telegram app
    window.location.href = telegramLink;

    // Fallback to web version if app doesn't open after a short delay
    setTimeout(() => {
      window.location.href = `https://t.me/${botUsername}?text=${encodeURIComponent(messageText)}`;
    }, 500);

    // Optionally, redirect back to the main page after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Telegram Bot</h1>
        <p className="mb-6">Click the button below to open Telegram.</p>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} 
                    transition-colors`}
        >
          {isSubmitting ? 'Opening Telegram...' : 'Open Telegram'}
        </button>
      </div>
    </div>
  );
}