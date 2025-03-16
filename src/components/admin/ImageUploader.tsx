
import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

type ImageUploaderProps = {
  images: string[];
  setImages: (images: string[]) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFilesToUpload, setTotalFilesToUpload] = useState(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    setTotalFilesToUpload(files.length);
    setCurrentFileIndex(0);
    
    const newUrls: string[] = [];
    const maxFileSizeMB = 5; // Maximum file size in MB

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentFileIndex(i + 1);
        const file = files[i];
        
        // Check file size
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          toast.error(`File ${file.name} exceeds ${maxFileSizeMB}MB limit`);
          continue;
        }
        
        // Create a more distinct file identifier
        const fileId = uuidv4();
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const timestamp = Date.now();
        
        // Create a reference with a more organized path structure
        const storageRef = ref(storage, `project-images/${timestamp}_${fileId}_${cleanFileName}`);
        
        console.log(`Uploading file ${i + 1}/${files.length}: ${file.name}`);
        
        // Upload the file with blob processing to optimize
        const compressedBlob = await optimizeImageIfPossible(file);
        await uploadBytes(storageRef, compressedBlob);
        
        console.log(`File uploaded, getting download URL`);
        
        // Get the download URL
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(`Got download URL: ${downloadUrl}`);
        
        newUrls.push(downloadUrl);
        
        // Update progress
        const progressPercentage = Math.round(((i + 1) / files.length) * 100);
        setUploadProgress(progressPercentage);
      }
      
      if (newUrls.length > 0) {
        console.log(`Successfully uploaded ${newUrls.length} images`);
        setImages([...images, ...newUrls]);
        toast.success(`${newUrls.length} image${newUrls.length > 1 ? 's' : ''} uploaded successfully`);
      } else {
        toast.error("No images were uploaded");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setError(error instanceof Error ? error.message : "Unknown error occurred");
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setCurrentFileIndex(0);
      setTotalFilesToUpload(0);
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    }
  };

  // Function to optimize image size if possible
  const optimizeImageIfPossible = async (file: File): Promise<Blob> => {
    // If it's not an image or is already small, return as is
    if (!file.type.startsWith('image/') || file.size < 1024 * 1024) {
      return file;
    }

    try {
      // Basic optimization for images
      return await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Set maximum dimensions
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
          
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Get blob with reduced quality for JPG
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                resolve(file); // Fallback to original if optimization fails
              }
            },
            file.type,
            0.7 // Reduced quality for JPG
          );
        };
        
        img.onerror = () => resolve(file); // Fallback on error
        img.src = URL.createObjectURL(file);
      });
    } catch (err) {
      console.error('Image optimization failed:', err);
      return file; // Fallback to original file
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">Project Images</h3>
        <label className={`button-outline flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload size={16} />
          {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Images'}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/70">
            <span>Uploading image {currentFileIndex} of {totalFilesToUpload}</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2 bg-white/10" />
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white">
          <p className="text-sm font-medium">Error uploading images:</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}
      
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
          <ImageIcon className="w-10 h-10 text-white/30 mx-auto mb-2" />
          <p className="text-white/50 text-sm">No images uploaded yet</p>
          <p className="text-white/30 text-xs mt-1">The first uploaded image will be used as the main project image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
