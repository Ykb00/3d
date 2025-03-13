"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image 
                src="/images/logoHQ1.png" 
                alt="Quaticks Logo" 
                width={40}
                height={40}
                style={{ objectFit: 'contain' }}
                priority
                
              />
            </div>
            <Link href="/" className="text-xl font-bold">Quaticks</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-200 transition">Home</Link>
            <Link href="/designers" className="hover:text-blue-200 transition">Designers</Link>
            {/* <Link href="/about" className="hover:text-blue-200 transition">About</Link> */}
            <Link href="/faq" className="hover:text-blue-200 transition">FAQ</Link>
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
            {/* <Link href="/about" className="hover:text-blue-200 transition">About</Link> */}
            <Link href="/faq" className="hover:text-blue-200 transition">FAQ</Link>
          </nav>
        )}
      </div>
    </header>
  );
}