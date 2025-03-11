"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const STLViewer = ({ file, onDimensionsCalculated }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Scene references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  
  useEffect(() => {
    if (!file || !containerRef.current) return;
    
    // Clear any previous errors
    setError(null);
    setIsLoading(true);
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // Fixed camera position (100 units from each axis)
    camera.position.set(100, 100, 100);
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.autoRotate = true; // Enable auto rotation
    controls.autoRotateSpeed = 1.0; // Set slower rotation speed (default is 2.0)
    controlsRef.current = controls;
    
    // Load STL file
    const loader = new STLLoader();
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      try {
        const geometry = loader.parse(event.target.result);
        
        // Compute bounding box to get dimensions
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        
        const width = boundingBox.max.x - boundingBox.min.x;
        const height = boundingBox.max.y - boundingBox.min.y;
        const depth = boundingBox.max.z - boundingBox.min.z;
        
        // Center the model
        geometry.center();
        
        // Create materials for the main mesh and the outline
        const mainMaterial = new THREE.MeshPhongMaterial({
          color: 0x3f84e5,
          specular: 0x111111,
          shininess: 30
        });
        
        // Create main mesh
        const mesh = new THREE.Mesh(geometry, mainMaterial);
        scene.add(mesh);
        
        // Create outline mesh
        // Clone the geometry for the outline
        const outlineGeometry = geometry.clone();
        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0x1a56db, // Darker blue for outline
          side: THREE.BackSide // Render the back side
        });
        
        const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
        outlineMesh.scale.multiplyScalar(1.03); // Scale slightly larger than the original mesh
        scene.add(outlineMesh);
        
        // Calculate volume
        const volume = calculateVolumeOfMesh(geometry);
        
        // Calculate dimensions and send them back
        const dimensions = {
          width: width,
          height: height,
          depth: depth,
          volume: volume // in cubic mm
        };
        
        // Auto-scale model to fit view - adjusted for fixed camera position
        const maxDimension = Math.max(width, height, depth);
        const scale = 50 / maxDimension; // Adjusted scale for fixed camera position
        
        mesh.scale.set(scale, scale, scale);
        outlineMesh.scale.set(scale * 1.03, scale * 1.03, scale * 1.03); // Keep outline proportional
        
        modelRef.current = mesh;
        
        // Update camera target
        controls.target.set(0, 0, 0);
        controls.update();
        
        // Call the callback with dimensions
        if (onDimensionsCalculated) {
          onDimensionsCalculated(dimensions);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading STL:', err);
        setError('Failed to load the STL file. Please try another file.');
        setIsLoading(false);
      }
    };
    
    fileReader.onerror = function() {
      setError('Failed to read the file. Please try again.');
      setIsLoading(false);
    };
    
    fileReader.readAsArrayBuffer(file);
    
    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [file]);
  
  // Function to calculate volume
  const calculateVolumeOfMesh = (geometry) => {
    let volume = 0;
    const positions = geometry.attributes.position.array;
    const faces = positions.length / 9;
    
    for (let i = 0; i < faces; i++) {
      const i9 = i * 9;
      
      const v1 = new THREE.Vector3(
        positions[i9], 
        positions[i9 + 1], 
        positions[i9 + 2]
      );
      
      const v2 = new THREE.Vector3(
        positions[i9 + 3], 
        positions[i9 + 4], 
        positions[i9 + 5]
      );
      
      const v3 = new THREE.Vector3(
        positions[i9 + 6], 
        positions[i9 + 7], 
        positions[i9 + 8]
      );
      
      // Calculate signed volume of tetrahedron formed by triangle and origin
      volume += signedVolumeOfTriangle(v1, v2, v3);
    }
    
    // Convert to absolute value (volume is always positive)
    return Math.abs(volume);
  };
  
  // Helper function for volume calculation
  const signedVolumeOfTriangle = (p1, p2, p3) => {
    return p1.dot(p2.cross(p3)) / 6.0;
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full">
        {/* The Three.js canvas will be appended here */}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-700">Loading model...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center p-4">
            <div className="text-red-500 text-lg mb-2">Error</div>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default STLViewer;