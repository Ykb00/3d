// app/stl-viewer/page.js
"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the STL viewer component to avoid SSR issues
const STLViewerComponent = dynamic(() => import('@/components/STLViewer'), {
  ssr: false,
});

export default function STLViewerPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.stl')) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">STL Viewer</h1>
      
      <div className="mb-4">
        <input
          type="file"
          accept=".stl"
          onChange={handleFileChange}
        />
      </div>
      
      {file && <STLViewerComponent file={file} />}
    </div>
  );
}