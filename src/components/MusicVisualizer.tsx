
import React, { useEffect, useState } from "react";

const MusicVisualizer: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Toggle animation on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getRandomDelay = () => {
    return Math.random() * 2;
  };
  
  const getRandomHeight = () => {
    return 5 + Math.random() * 25;
  };
  
  const createVisualizer = () => {
    const bars = [];
    const count = Math.floor(window.innerWidth / 12);
    
    for (let i = 0; i < count; i++) {
      const delay = getRandomDelay();
      const height = getRandomHeight();
      bars.push(
        <div 
          key={i}
          className="music-visualizer"
          style={{
            height: `${height}px`,
            animationDelay: `${delay}s`,
            animationPlayState: isAnimating ? "running" : "paused",
            animationName: isAnimating ? (i % 5 === 0 ? "music-wave1" : 
                                         i % 5 === 1 ? "music-wave2" : 
                                         i % 5 === 2 ? "music-wave3" : 
                                         i % 5 === 3 ? "music-wave4" : "music-wave5") : "none"
          }}
        />
      );
    }
    
    return bars;
  };
  
  return (
    <div className="w-full h-full flex items-end justify-center">
      <div className="w-full flex items-end justify-around">
        {createVisualizer()}
      </div>
    </div>
  );
};

export default MusicVisualizer;
