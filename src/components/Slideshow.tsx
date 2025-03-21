
import React, { useState, useEffect } from "react";

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 600); // Match this with your CSS transition duration
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 600);
  };

  if (!images || images.length === 0) {
    return <div className="h-80 bg-muted rounded-lg flex items-center justify-center">No images available</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg glass-card">
      <div className="aspect-[16/9] w-full relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-600 ease-in-out ${
              index === currentIndex 
                ? isTransitioning 
                  ? "opacity-0" 
                  : "opacity-100" 
                : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      
      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slideshow;
