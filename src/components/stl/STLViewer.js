// components/STLViewer.jsx
"use client";

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function STLObject({ url }) {
  const [geometry, setGeometry] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  
  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geo) => {
      setGeometry(geo);
      
      // Calculate dimensions
      geo.computeBoundingBox();
      const box = geo.boundingBox;
      const size = new THREE.Vector3();
      box.getSize(size);
      
      setDimensions({
        width: size.x.toFixed(2),
        height: size.y.toFixed(2),
        depth: size.z.toFixed(2),
        volume: (size.x * size.y * size.z).toFixed(2)
      });
    });
  }, [url]);
  
  if (!geometry) return null;
  
  return (
    <mesh>
      <bufferGeometry attach="geometry" {...geometry} />
      {/* Lighter blue color for the model */}
      <meshStandardMaterial attach="material" color="#66B2FF" />
      {/* Adding an outline to the model */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color="#0055AA" />
      </lineSegments>
    </mesh>
  );
}

export default function STLViewer({ file }) {
  const [preview, setPreview] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  
  useEffect(() => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    
    // Reset dimensions when new file is loaded
    setDimensions(null);
  }, [file]);
  
  // Function to calculate dimensions (will be called by STLObject)
  const updateDimensions = (dims) => {
    setDimensions(dims);
  };
  
  return (
    <div className="w-full">
      <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-blue-300 shadow-lg">
        <Canvas camera={{ position: [50, 50, 100], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <STLObject url={preview} onDimensionsCalculated={updateDimensions} />
          <OrbitControls />
          {/* <gridHelper args={[100,20]} /> */}
        </Canvas>
      </div>
      {dimensions && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-bold">Model Dimensions:</h3>
          <p>Width: {dimensions.width} units</p>
          <p>Height: {dimensions.height} units</p>
          <p>Depth: {dimensions.depth} units</p>
          <p>Volume: {dimensions.volume} cubic units</p>
        </div>
      )}
    </div>
  );
}