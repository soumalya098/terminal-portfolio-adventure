
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

type ProjectGalleryProps = {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
};

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="relative w-full max-w-5xl max-h-[85vh]">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={images[currentIndex]} 
            alt={`Gallery image ${currentIndex + 1}`} 
            className="max-w-full max-h-[80vh] object-contain animate-fade-in"
          />
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;
