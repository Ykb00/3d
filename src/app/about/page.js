"use client"

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Quaticks</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bringing your 3D printing ideas to life with precision and creativity.
        </p>
      </section>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2024, Quaticks began with a simple mission: to make high-quality 3D printing accessible to everyone. 
          What started as a passionate side project by two engineering students has grown into a full-service 3D printing 
          solution trusted by designers, engineers, and creators across various industries.
        </p>
        <p className="text-gray-700 mb-4">
          We combine cutting-edge technology with artistic vision to deliver exceptional 3D printed products. Our team 
          specializes in everything from precision mechanical components to detailed character models and architectural prototypes.
        </p>
        <p className="text-gray-700">
          At Quaticks, we believe in continuous innovation and maintaining the highest standards of quality in every project we undertake.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Meet Our Founders</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">YK</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Yaswanth Kumar</h3>
              <p className="text-gray-600">Co-Founder & Technical Director</p>
            </div>
            <p className="text-gray-700 text-center">
              With a background in mechanical engineering and over 5 years of experience in 3D printing technologies, 
              Yaswanth leads our technical operations and quality control processes. His expertise ensures that every 
              project meets precise specifications and standards.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">TA</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Thirumani Akash</h3>
              <p className="text-gray-600">Co-Founder & Creative Director</p>
            </div>
            <p className="text-gray-700 text-center">
              Thirumani brings artistic vision to Quaticks with his background in industrial design and digital modeling. 
              He oversees the creative aspects of our projects, ensuring that each design not only functions perfectly but 
              also achieves aesthetic excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to bring your ideas to life?</h2>
        <p className="text-lg mb-6">
          Whether you&apos;re looking for a single prototype or a production run, we&apos;re here to help.
        </p>
        <Link href="/contact" className="inline-block bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition">
          Contact Us Today
        </Link>
      </div>
    </div>
  );
}