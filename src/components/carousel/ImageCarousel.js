// components/carousel/ImageCarousel.js
import { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-full mt-[-11rem] lg:mt-[-60px] ">
      {/* Main carousel container */}
      <div className="relative h-[40rem] w-full rounded-xl overflow-hidden ">
        {/* Image container with fixed height but preserving aspect ratio */}
        <div className="w-full h-full flex items-center justify-center rounded-2xl ">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>

        {/* Image title and description */}
        {(images[currentIndex].title || images[currentIndex].description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
            {images[currentIndex].title && (
              <h3 className="text-lg font-semibold">{images[currentIndex].title}</h3>
            )}
            {images[currentIndex].description && (
              <p className="text-sm mt-1">{images[currentIndex].description}</p>
            )}
          </div>
        )}

        {/* Left Arrow */}
        <div 
          className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        
        {/* Right Arrow */}
        <div 
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === slideIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;