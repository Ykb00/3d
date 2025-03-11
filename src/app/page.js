"use client";

import { useState, useEffect } from 'react';
import UploadBox from '@/components/stl/UploadBox';
import STLViewer from '@/components/stl/STLViewer';
import ModelDimensions from '@/components/stl/ModelDimensions';
import ModelPricing from '@/components/stl/ModelPricing';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import placeholderImages from '@/components/carousel/PlaceholderImages';

export default function Home() {
  const [file, setFile] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [featuredModels, setFeaturedModels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile);
  };
  
  const handleDimensionsCalculated = (dims) => {
    setDimensions(dims);
  };

  // Fetch featured models
  useEffect(() => {
    const fetchFeaturedModels = async () => {
      setLoading(true);
      try {
        // Use placeholder images instead of hardcoded values
        setFeaturedModels(placeholderImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured models:", error);
        setLoading(false);
      }
    };

    fetchFeaturedModels();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">3D Model Viewer & Pricing Tool</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your STL files, view them in 3D, and get instant pricing for manufacturing.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex justify-center items-center">
            {!file ? (
              <div className="w-full flex justify-center">
                <UploadBox onFileSelect={handleFileSelected} />
              </div>
            ) : (
              <div className="space-y-8 w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">3D Preview</h2>
                  <button 
                    onClick={() => setFile(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Upload Another
                  </button>
                </div>
                
                <STLViewer file={file} onDimensionsCalculated={handleDimensionsCalculated} />
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Use mouse to rotate, scroll to zoom, and right-click to pan
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {file && (
              <>
                <ModelDimensions file={file} />
                <ModelPricing dimensions={dimensions} />
              </>
            )}
          </div>
        </div>
        
        {/* Featured Models Section with Carousel */}
        <section className="mt-20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Models</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredModels.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <ImageCarousel images={featuredModels} />
            </div>
          ) : (
            <p className="text-center text-gray-500">No featured models available</p>
          )}
        </section>
      </div>
    </>
  );
}