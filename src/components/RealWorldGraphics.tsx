
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface RealWorldGraphicsProps {
  imageUrl?: string;
  modelUrl?: string;
  type: 'texture' | 'environment' | 'sprite' | 'model';
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  className?: string;
}

const RealWorldGraphics: React.FC<RealWorldGraphicsProps> = ({
  imageUrl,
  modelUrl,
  type,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 5;
    
    // Handle different types of real-world graphics
    if (type === 'texture' && imageUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageUrl, 
        (texture) => {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            roughness: 0.5,
            metalness: 0.2
          });
          
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(position[0], position[1], position[2]);
          mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
          mesh.scale.set(scale[0], scale[1], scale[2]);
          scene.add(mesh);
        },
        undefined,
        (err) => {
          console.error('Error loading texture:', err);
        }
      );
    } else if (type === 'environment' && imageUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageUrl, 
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
        },
        undefined,
        (err) => {
          console.error('Error loading environment texture:', err);
        }
      );
    } else if (type === 'sprite' && imageUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageUrl, 
        (texture) => {
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          sprite.position.set(position[0], position[1], position[2]);
          sprite.scale.set(scale[0], scale[1], scale[2]);
          scene.add(sprite);
        },
        undefined,
        (err) => {
          console.error('Error loading sprite texture:', err);
        }
      );
    } else if (type === 'model' && modelUrl) {
      const loader = new GLTFLoader();
      loader.load(
        modelUrl, 
        (gltf) => {
          const model = gltf.scene;
          model.position.set(position[0], position[1], position[2]);
          model.rotation.set(rotation[0], rotation[1], rotation[2]);
          model.scale.set(scale[0], scale[1], scale[2]);
          scene.add(model);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (err) => {
          console.error('Error loading model:', err);
        }
      );
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, [imageUrl, modelUrl, type, position, scale, rotation]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${className || ''}`}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
};

export default RealWorldGraphics;
