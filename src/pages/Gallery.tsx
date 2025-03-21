
import React, { useState } from "react";
import Layout from "../components/Layout";
import { galleryImages } from "../data/images";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, ExternalLink } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Find the current index for navigation
  const currentIndex = selectedImage ? galleryImages.indexOf(selectedImage) : -1;
  
  // Navigate through images
  const navigateImage = (direction: 'prev' | 'next') => {
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    } else {
      newIndex = (currentIndex + 1) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex]);
  };
  
  // Image captions
  const imageCaptions = [
    "I got some colour back",
    "She thinks so too",
    "I'm almost me again",
    "She's almost you",
    "Come with me on my first solo hike to summit Sljeme mountain in Zagreb, Croatia!",
    "Cute little cable car can take you to the top too!",
    "2k in, 5k more to the top!",
    "...and stay on top of those electrolytes",
    "That TV tower is where we're going!",
    "Old stone structure along the trail",
    "Made it! 1030 meters up!",
    "Foggy conditions at the top",
    "Refuel with lunch before heading back down",
    "Almost back at the bottom!",
    "Refuel again with wrap #2 and some electrolytes",
    "Workout details: 14.01KM, 719M elevation gain",
    "That was fun, thanks for coming along :)"
  ];
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
          <span className="olivia-gradient-text">Olivia's Hiking Gallery</span>
        </h1>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80"
            onClick={() => window.open('/gallery/index.html', '_blank')}
          >
            <ExternalLink size={16} />
            <span>Open Dedicated Gallery</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80"
            onClick={() => window.location.href = '/gallery/index.html'}
          >
            <Download size={16} />
            <span>Download Photo Collection</span>
          </Button>
        </div>
        
        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-xl glass-card animate-fade-in relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt={`Olivia ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm md:text-base">{imageCaptions[index]}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Image lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="sm:max-w-4xl p-0 bg-black/95 border-none">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            
            <div className="relative py-10">
              <div className="max-h-[80vh] flex items-center justify-center">
                <img 
                  src={selectedImage || ''} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              {currentIndex !== -1 && (
                <div className="absolute bottom-0 left-0 right-0 text-white text-center p-4 bg-black/30">
                  <p>{imageCaptions[currentIndex]}</p>
                  <p className="text-sm text-gray-300 mt-1">{currentIndex + 1} / {galleryImages.length}</p>
                </div>
              )}
              
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                onClick={() => navigateImage('prev')}
                aria-label="Previous image"
              >
                &#10094;
              </button>
              
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                onClick={() => navigateImage('next')}
                aria-label="Next image"
              >
                &#10095;
              </button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Carousel preview */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-2xl glass-card">
          <h2 className="text-2xl font-serif mb-4 text-center">Slideshow Preview</h2>
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {galleryImages.slice(0, 8).map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Carousel image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
          <div className="text-center mt-4">
            <Button 
              onClick={() => window.open('/gallery/index.html', '_blank')}
              className="bg-olivia-purple hover:bg-olivia-darkPurple"
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
