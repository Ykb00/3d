// app/stl-viewer/page.js
"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import placeholderImages from '@/components/PlaceholderImages.js';

// Dynamically import the STL viewer component to avoid SSR issues
const STLViewerComponent = dynamic(() => import('@/components/stl/STLViewer'), {
  ssr: false,
});

export default function STLViewerPage() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.stl')) {
      setFile(selectedFile);
    } else if (selectedFile) {
      alert("Please upload a valid STL file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.toLowerCase().endsWith('.stl')) {
        setFile(droppedFile);
      } else {
        alert("Please upload a valid STL file.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">3D STL Model Viewer</h1>
      
      {!file ? (
        <div 
          className={`flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-64 border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} rounded-lg p-8 transition-all duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-lg text-gray-600">Drag and drop your STL file here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer">
            <span>Select STL File</span>
            <input
              type="file"
              accept=".stl"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{file.name}</h2>
            <button 
              onClick={() => setFile(null)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
            >
              Choose Another File
            </button>
          </div>
          <STLViewerComponent file={file} />
        </div>
      )}
      
      {/* Featured Models Carousel */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured 3D Models</h2>
        <ImageCarousel images={placeholderImages} />
      </div>
    </div>
  );
}