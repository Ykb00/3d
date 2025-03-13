"use client"

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get query parameters using the App Router method
  const subject = searchParams.get('subject') || "3D Printing Inquiry";
  const category = searchParams.get('category') || "";
  
  const openGmail = () => {
    const email = "yaswanthkumar7b@gmail.com";
    const emailSubject = subject;
    const emailBody = category 
      ? `I'm interested in discussing a ${category} 3D printing project.`
      : "I'm interested in your 3D printing services.";
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };
  
  const openWhatsApp = () => {
    const number = "+918921378281";
    const text = `Hi! I'm interested in your 3D printing services${category ? ` for ${category}` : ''}.`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 border-b-2 border-blue-200 pb-4">
          Contact Our 3D Printing Team
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            Choose your preferred way to connect with us about{category ? ` your ${category} project` : ' our 3D printing services'}.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-red-700">
              <svg className="w-6 h-6 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              Contact via Email
            </h2>
            <p className="mb-4 text-gray-700">
              Send us an email and we'll get back to you with a quote or additional information.
            </p>
            <button 
              onClick={openGmail}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition flex items-center justify-center font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              Open Gmail
            </button>
          </div>
          
          <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-green-700">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact via WhatsApp
            </h2>
            <p className="mb-4 text-gray-700">
              Chat with us directly on WhatsApp for a quick response about your project.
            </p>
            <button 
              onClick={openWhatsApp}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition flex items-center justify-center font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Open WhatsApp
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
          >
            Back 
          </button>
        </div>
      </div>
    </div>
  );
}