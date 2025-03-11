"use client";

import { useState } from 'react';

export default function UploadBox({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.stl')) {
        onFileSelect(file);
      } else {
        alert('Please upload an STL file');
      }
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto mb-4 w-16 h-16 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-13" />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium mb-2">Upload your STL file</h3>
      <p className="text-gray-500 mb-4">Drag and drop your STL file here, or click to browse</p>
      
      <input 
        type="file" 
        accept=".stl" 
        onChange={handleFileChange} 
        className="hidden" 
        id="stl-upload" 
      />
      <label 
        htmlFor="stl-upload" 
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        Select File
      </label>
    </div>
  );
}