"use client"

import React, { useState } from 'react';

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What 3D printing technologies do you use?",
    answer: "We utilize multiple technologies including FDM (Fused Deposition Modeling), SLA (Stereolithography), and SLS (Selective Laser Sintering) to accommodate different project requirements. Each technology offers unique advantages in terms of detail, strength, and material options."
  },
  {
    id: 2,
    question: "What materials can you print with?",
    answer: "We offer a wide range of materials including PLA, ABS, PETG, TPU (flexible), nylon, resin, and various specialty filaments. We can also provide metal-infused filaments and materials suitable for functional prototypes and end-use parts."
  },
  {
    id: 3,
    question: "How do I submit my 3D model for printing?",
    answer: "You can upload your 3D model files (STL, OBJ, etc.) through our website&apos;s upload form or send them directly via email. For large projects, we also accept file transfers through cloud storage services."
  },
  {
    id: 4,
    question: "What is the typical turnaround time?",
    answer: "Turnaround time varies based on project complexity, size, and our current workload. Simple projects can often be completed within 1-3 business days, while more complex projects may take 5-7 business days. We also offer expedited services for urgent needs."
  },
  {
    id: 5,
    question: "Do you offer design services if I don&apos;t have a 3D model?",
    answer: "Yes, our team includes skilled 3D designers who can create models based on your sketches, descriptions, or concepts. We offer full design services from concept to final print-ready models."
  },
  {
    id: 6,
    question: "What file formats do you accept?",
    answer: "We accept most common 3D file formats including STL, OBJ, STEP, IGES, and 3MF. If you have a different format, please contact us to check compatibility."
  },
  {
    id: 7,
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. Shipping costs and delivery times vary based on location and package size. We provide tracking information for all shipments."
  },
  {
    id: 8,
    question: "Can you handle bulk orders?",
    answer: "Absolutely. We have the capacity to handle orders ranging from single prototypes to production runs of hundreds or thousands of parts. Volume discounts are available for larger orders."
  }
];

export default function FAQPage() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our 3D printing services.
        </p>
      </section>

      <div className="max-w-3xl mx-auto">
        {faqData.map((item) => (
          <div key={item.id} className="mb-4">
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full text-left p-4 flex justify-between items-center rounded-lg ${
                expandedItem === item.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
              } hover:bg-blue-500 hover:text-white transition-colors duration-200 focus:outline-none shadow-md`}
            >
              <span className="font-medium">{item.question}</span>
              <svg 
                className={`h-5 w-5 transition-transform ${expandedItem === item.id ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedItem === item.id && (
              <div className="bg-white p-4 rounded-b-lg shadow-md mt-px">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Still have questions?</h2>
        <p className="text-gray-700 mb-6">
          If you couldn&apos;t find the answer to your question, feel free to contact us directly.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="mailto:yaswanthkumar7b@gmail.com" 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Email Us
          </a>
          <a 
            href="tel:+918921378281" 
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}