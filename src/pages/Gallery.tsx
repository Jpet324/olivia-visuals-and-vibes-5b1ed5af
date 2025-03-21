
import React, { useState } from "react";
import Layout from "../components/Layout";
import { galleryImages } from "../data/images";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
          <span className="olivia-gradient-text">Gallery</span>
        </h1>
        
        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-xl glass-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt={`Olivia ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
        
        {/* Image lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="sm:max-w-3xl p-1 bg-black/90 border-none">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full">
              <img 
                src={selectedImage || ''} 
                alt="Enlarged view" 
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;
