"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l7 4A1 1 0 0118 6v8a1 1 0 01-.504.868l-7 4a1 1 0 01-.992 0l-7-4A1 1 0 011 14V6a1 1 0 01.504-.868l7-4z" clipRule="evenodd" />
            </svg>
            <Link href="/" className="text-xl font-bold">Quaticks</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-200 transition">Home</Link>
            <Link href="/designers" className="hover:text-blue-200 transition">Designers</Link>
            <Link href="/payment" className="hover:text-blue-200 transition">Pricing</Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden flex flex-col space-y-3 pb-3">
            <Link href="/" className="hover:text-blue-200 transition">Home</Link>
            <Link href="/designers" className="hover:text-blue-200 transition">Designers</Link>
            <Link href="/payment" className="hover:text-blue-200 transition">Pricing</Link>
          </nav>
        )}
      </div>
    </header>
  );
}