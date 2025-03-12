"use client";

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

export default function UploadBox({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Initialize Supabase client
  const supabase = createClientComponentClient();
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const uploadToSupabase = async (file) => {
    if (!file || !file.name.endsWith('.stl')) {
      alert('Please upload an STL file');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Generate a unique filename to prevent conflicts
      const uniqueFileName = `${uuidv4()}-${file.name}`;
      
      // Upload the file to Supabase storage
      const { data, error } = await supabase
        .storage
        .from('stl_files')  // Ensure this matches exactly with your bucket name
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: true  // Changed to true to overwrite if file exists
        });
      
      if (error) {
        throw error;
      }
      
      // Get the public URL of the file
      const { data: urlData } = supabase
        .storage
        .from('stl_files')
        .getPublicUrl(uniqueFileName);
      
      console.log("File uploaded successfully:", {
        filename: uniqueFileName,
        publicUrl: urlData.publicUrl,
        size: file.size,
        type: file.type
      });
      
      // Pass the file object to parent component for local rendering
      onFileSelect(file);
      
    } catch (error) {
      console.error("Error uploading file to Supabase:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      uploadToSupabase(file);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadToSupabase(e.target.files[0]);
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
      
      {isUploading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-blue-600 font-medium">Uploading...</span>
        </div>
      ) : (
        <>
          <input 
            type="file" 
            accept=".stl" 
            onChange={handleFileChange} 
            className="hidden" 
            id="stl-upload" 
          />
          <label 
            htmlFor="stl-upload" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Select File
          </label>
        </>
      )}
    </div>
  );
}