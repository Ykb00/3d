// // pages/stl-viewer.js
// import { useState, useEffect } from 'react';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// function STLObject({ url }) {
//   const [geometry, setGeometry] = useState(null);

//   useEffect(() => {
//     const loader = new STLLoader();
//     loader.load(url, (geo) => {
//       setGeometry(geo);
//     });
//   }, [url]);

//   if (!geometry) return null;

//   return (
//     <mesh>
//       <bufferGeometry attach="geometry" {...geometry} />
//       <meshStandardMaterial attach="material" color={0x0077ff} />
//     </mesh>
//   );
// }

// export default function SimpleSTLViewer() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.name.endsWith('.stl')) {
//       setFile(selectedFile);
      
//       const reader = new FileReader();
//       reader.onload = (e) => setPreview(e.target.result);
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">STL Viewer lol</h1>
      
//       <div className="mb-4">
//         <input
//           type="file"
//           accept=".stl"
//           onChange={handleFileChange}
//         />
//       </div>
      
//       {preview && (
//         <div className="w-full h-96">
//           <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
//             <ambientLight intensity={0.5} />
//             <pointLight position={[10, 10, 10]} intensity={1} />
//             <STLObject url={preview} />
//             <OrbitControls />
//           </Canvas>
//         </div>
//       )}
//     </div>
//   );
// }