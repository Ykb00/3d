"use client";

import { useEffect, useState } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

export default function ModelDimensions({ file }) {
  const [dimensions, setDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!file) return;
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const loader = new STLLoader();
      try {
        const geometry = loader.parse(e.target.result);
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        
        // Calculate volume (assuming mm units)
        const volume = (size.x * size.y * size.z) / 1000; // Convert to cm³
        
        setDimensions({
          width: size.x.toFixed(2),
          height: size.y.toFixed(2),
          depth: size.z.toFixed(2),
          volume: volume.toFixed(2)
        });
      } catch (error) {
        console.error("Error parsing STL:", error);
      }
      setIsLoading(false);
    };
    
    reader.readAsArrayBuffer(file);
  }, [file]);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }
  
  if (!dimensions) return null;
  
  return (
    <div className="bg-blue-600 mt-[65px] rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Model Dimensions</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-blue-950">Width</p>
          <p className="font-medium">{dimensions.width} mm</p>
        </div>
        <div>
          <p className="text-blue-950">Height</p>
          <p className="font-medium">{dimensions.height} mm</p>
        </div>
        <div>
          <p className="text-blue-950">Depth</p>
          <p className="font-medium">{dimensions.depth} mm</p>
        </div>
        <div>
          <p className="text-blue-950">Volume</p>
          <p className="font-medium">{dimensions.volume} cm³</p>
        </div>
      </div>
    </div>
  );
}