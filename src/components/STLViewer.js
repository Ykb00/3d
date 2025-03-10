import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function STLObject({ url }) {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geo) => {
      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial attach="material" color={0x0077ff} />
    </mesh>
  );
}

export default function STLViewer({ file }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, [file]);

  if (!preview) return null;

  return (
    <div className="w-full h-96 border border-black/[.08] dark:border-white/[.145] rounded">
      <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <STLObject url={preview} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}