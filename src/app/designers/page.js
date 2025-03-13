"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Mock data for different 3D printing capabilities
const capabilities = [
  {
    id: 1,
    category: "Mechanical Parts",
    experience: "3+ years expertise",
    rating: 4.9,
    image: "/images/gear3.webp",
    portfolio: [
      { image: "/images/gear1.webp", title: "Gear Assembly" },
      { image: "/images/gear2.webp", title: "Drone Parts" },
      { image: "/images/mech.webp", title: "Robotics Components" }
    ],
    description: "Precision-engineered mechanical components with tight tolerances for industrial applications."
  },
  {
    id: 2,
    category: "Character Models",
    experience: "1+ years expertise",
    rating: 4.7,
    image: "/images/char.png",
    portfolio: [
      { image: "/images/char1.webp", title: "Fantasy Figurine" },
      { image: "/images/char2.webp", title: "Action Figure" },
      { image: "/images/char3.webp", title: "Gaming Character" }
    ],
    description: "Custom character models and figurines with detailed features and textures."
  },
  {
    id: 3,
    category: "Architectural Models",
    experience: "1+ years expertise",
    rating: 4.8,
    image: "/images/arc.png",
    portfolio: [
      { image: "/images/arc1.webp", title: "Modern House Scale Model" },
      { image: "/images/arc2.webp", title: "Bridge Structure" },
      { image: "/images/arc3.webp", title: "City Planning Prototype" }
    ],
    description: "Detailed architectural models and scale replicas for presentations and exhibitions."
  },
  {
    id: 4,
    category: "Product Prototypes",
    experience: "2+ years expertise",
    rating: 4.6,
    image: "/images/pro.png",
    portfolio: [
      { image: "/images/pro1.webp", title: "Smart Device Casing" },
      { image: "/images/pro2.webp", title: "Kitchen Gadget" },
      { image: "/images/pro3.webp", title: "Wearable Technology" }
    ],
    description: "Rapid prototyping solutions for product development and testing phases."
  },
  {
    id: 5,
    category: "Jewelry Design",
    experience: "3+ years expertise",
    rating: 4.9,
    image: "/images/jew.png",
    portfolio: [
      { image: "/images/jew1.webp", title: "Custom Ring" },
      { image: "/images/jew2.webp", title: "Pendant Design" },
      { image: "/images/jew3.webp", title: "Bracelet Collection" }
    ],
    description: "Fine jewelry designs with intricate details suitable for casting or direct printing."
  },
  {
    id: 6,
    category: "Medical Models",
    experience: "1+ years expertise",
    rating: 4.8,
    image: "/images/med.png",
    portfolio: [
      { image: "/images/med1.webp", title: "Anatomical Model" },
      { image: "/images/med2.webp", title: "Surgical Guide" },
      { image: "/images/med3.webp", title: "Prosthetic Prototype" }
    ],
    description: "Medical-grade models for surgical planning, education, and custom prosthetics."
  }
];

export default function CapabilitiesPage() {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleContactClick = (capability) => {
    // Navigate to contact page with pre-filled info
    // Updated for App Router navigation
    router.push(`/contact?subject=3D%20Printing%20Inquiry:%20${encodeURIComponent(capability.category)}&category=${encodeURIComponent(capability.category)}`);
  };

  const togglePortfolio = (id) => {
    if (expandedCategory === id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Our 3D Printing Capabilities</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our range of 3D printing services and capabilities. We bring your ideas to life with precision and creativity.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilities.map((capability) => (
          <div key={capability.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100">
                    <Image
                      src={capability.image}
                      alt={capability.category}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-blue-800">{capability.category}</h3>
                </div>
                <p className="text-gray-700">{capability.description}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-800">{capability.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-1">{capability.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => togglePortfolio(capability.id)}
                className="w-full mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
              >
                {expandedCategory === capability.id ? 'Hide Examples' : 'View Examples'}
                <svg 
                  className={`ml-2 h-4 w-4 transition-transform ${expandedCategory === capability.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedCategory === capability.id && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {capability.portfolio.map((item, index) => (
                    <div key={index} className="relative group">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        width={120}
                        height={96}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
                        <span className="text-white text-xs text-center px-1">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => handleContactClick(capability)}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}