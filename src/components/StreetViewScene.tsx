
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface StreetViewSceneProps {
  locationId: string;
}

// A mapping of location IDs to panoramic image URLs
const panoramaImages: Record<string, string> = {
  paris: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/1920px-Tour_Eiffel_Wikimedia_Commons.jpg",
  tokyo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tokyo_Tower_perfect_night_time.jpg/1920px-Tokyo_Tower_perfect_night_time.jpg",
  cairo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1920px-Kheops-Pyramid.jpg",
  rio: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/1920px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
  newyork: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/1920px-Empire_State_Building_%28aerial_view%29.jpg",
  sydney: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sydney_Opera_House%2C_botanic_gardens_1.jpg/1920px-Sydney_Opera_House%2C_botanic_gardens_1.jpg",
  rome: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1920px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
  beijing: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Forbidden_City_Beijing_Shenwumen_Gate.jpg/1920px-Forbidden_City_Beijing_Shenwumen_Gate.jpg",
  marrakech: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jemaa_el-Fnaa.JPG/1920px-Jemaa_el-Fnaa.JPG",
  capetown: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Table_Mountain_DanieVDM.jpg/1920px-Table_Mountain_DanieVDM.jpg",
  mumbai: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gateway_of_India_at_night.jpg/1920px-Gateway_of_India_at_night.jpg",
  dubai: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/1920px-Burj_Khalifa.jpg",
  istanbul: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/1920px-Hagia_Sophia_Mars_2013.jpg",
  moscow: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Square%2C_Moscow.jpg/1920px-Red_Square%2C_Moscow.jpg",
  buenosaires: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Obelisco-Buenos_Aires_city.jpg/1920px-Obelisco-Buenos_Aires_city.jpg",
  vancouver: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Stanley-Park-2016.jpg/1920px-Stanley-Park-2016.jpg",
};

const StreetViewScene: React.FC<StreetViewSceneProps> = ({ locationId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a sphere geometry for the panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Important: the sphere needs to be flipped to show the image correctly
    geometry.scale(-1, 1, 1);

    // Load panoramic image texture
    const texture = new THREE.TextureLoader().load(
      panoramaImages[locationId] || panoramaImages.paris,
      // On load success
      () => {
        console.log(`Loaded panorama for ${locationId}`);
      },
      // On progress
      undefined,
      // On error
      (err) => {
        console.error('Error loading panorama:', err);
      }
    );

    // Create material using the loaded texture
    const material = new THREE.MeshBasicMaterial({ map: texture });
    
    // Create the panoramic sphere and add to scene
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Position camera
    camera.position.set(0, 0, 0);
    
    // Mouse interaction variables
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let lon = 0;
    let lat = 0;
    let phi = 0;
    let theta = 0;
    
    // Handle mouse events for panorama navigation
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      lon += deltaX * 0.1;
      lat -= deltaY * 0.1;
      
      // Limit vertical looking
      lat = Math.max(-85, Math.min(85, lat));
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    
    // Handle touch events for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isMouseDown = true;
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
      }
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1 && isMouseDown) {
        const deltaX = event.touches[0].pageX - mouseX;
        const deltaY = event.touches[0].pageY - mouseY;
        
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
        
        lon += deltaX * 0.1;
        lat -= deltaY * 0.1;
        
        // Limit vertical looking
        lat = Math.max(-85, Math.min(85, lat));
        
        event.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      isMouseDown = false;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update camera target based on mouse/touch movement
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);
      
      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);
      
      camera.lookAt(x, y, z);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      container.removeChild(renderer.domElement);
      
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [locationId]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full" 
      style={{ minHeight: '400px' }}
    >
      <div className="absolute top-4 left-4 bg-black/30 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
        <p className="text-sm">Drag to look around</p>
      </div>
    </div>
  );
};

export default StreetViewScene;
