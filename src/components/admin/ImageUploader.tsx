
import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check, Link as LinkIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

type ImageUploaderProps = {
  images: string[];
  setImages: (images: string[]) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddImageUrl = async () => {
    // Reset states
    setError(null);
    
    // Basic validation
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    
    // Simple URL validation
    try {
      new URL(imageUrl);
    } catch (e) {
      setError("Please enter a valid URL");
      toast.error("Please enter a valid URL");
      return;
    }
    
    // Validate that the URL is an image
    setIsValidating(true);
    
    try {
      // Check if image loads
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
      });
      
      // Add to images array
      setImages([...images, imageUrl]);
      setImageUrl('');
      toast.success("Image added successfully");
      
    } catch (error) {
      console.error("Image validation error:", error);
      setError("The URL does not appear to be a valid image");
      toast.error("The URL does not appear to be a valid image");
    } finally {
      setIsValidating(false);
    }
  };

  const removeImage = (index: number) => {
    console.log(`Removing image at index ${index}`);
    setImages(images.filter((_, i) => i !== index));
    toast.info("Image removed");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImageUrl();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">Project Images</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL here..."
            className="flex-grow bg-white/5 border border-white/10 text-white"
            onKeyDown={handleKeyPress}
            disabled={isValidating}
          />
          <button
            onClick={handleAddImageUrl}
            disabled={isValidating}
            className="button-outline flex items-center gap-2"
          >
            {isValidating ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Plus size={16} />
            )}
            Add
          </button>
        </div>
        
        {error && (
          <div className="text-red-400 text-sm flex items-center gap-2">
            <X size={14} />
            {error}
          </div>
        )}
        
        <p className="text-white/50 text-xs">
          Paste direct links to images (JPG, PNG, GIF, etc.)
        </p>
      </div>
      
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="w-full h-24 overflow-hidden rounded border border-white/10">
                <img 
                  src={url} 
                  alt={`Project ${index}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                    console.error(`Failed to load image: ${url}`);
                  }} 
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-portfolio-accent/90 text-xs text-white flex items-center gap-1">
                  <Check size={10} /> Main
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-white/20 rounded-lg p-8 text-center">
          <LinkIcon className="w-10 h-10 text-white/30 mx-auto mb-2" />
          <p className="text-white/50 text-sm">No images added yet</p>
          <p className="text-white/30 text-xs mt-1">Add image URLs above to display your project images</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
