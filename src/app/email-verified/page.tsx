"use client";
import React from 'react';
import { Card, Text, Button } from "@nextui-org/react";
import Link from 'next/link';

export default function EmailVerified() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mx-auto h-12 w-12 text-green-500 text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mt-4 mb-2">
          Email Verified Successfully
        </h2>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now access all features of your account.
        </p>
        <Link href="/web" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}