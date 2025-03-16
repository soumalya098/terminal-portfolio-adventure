
import React, { useState, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    setTotalFilesToUpload(files.length);
    setCurrentFileIndex(0);
    
    const newUrls: string[] = [];
    const maxFileSizeMB = 15; // Increased max file size to 15MB

    try {
      // Convert FileList to array for easier processing
      const fileArray = Array.from(files);
      const totalFiles = fileArray.length;
      
      // Process files one at a time, but with direct upload instead of resumable
      for (let i = 0; i < totalFiles; i++) {
        setCurrentFileIndex(i + 1);
        setUploadProgress(Math.round((i / totalFiles) * 100));
        
        const file = fileArray[i];
        
        // Check file size but allow larger files
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          toast.error(`File ${file.name} exceeds ${maxFileSizeMB}MB limit`);
          continue;
        }
        
        // Create a more distinct file identifier
        const fileId = uuidv4().slice(0, 8);
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_').slice(0, 30);
        const timestamp = Date.now();  
            
        // Using direct upload method instead of resume, which should optimize for speed
        console.log(`Uploading file ${i + 1}/${totalFiles}: ${file.name}, size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
         
        // Create storage ref
        const storageRef = ref(storage, `project-images/${timestamp}_${fileId}_${cleanFileName}`);
          
        // Direct upload with uploadBytes, for simplicity and speed
        try {
          const uploadResult = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(uploadResult.ref);
          
          console.log(`File ${i + 1} uploaded successfully`);
          newUrls.push(downloadUrl);
          
          // Update progress after each successful upload
          setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
        } catch (uploadError) {
          // Continue with next file even if this one fails
          console.error(`Error uploading file ${i + 1}:`, uploadError);
          toast.error(`Failed to upload ${file.name}`);
        }
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
      setUploadProgress(100); // Ensure progress bar shows complete
      setTimeout(() => {
        setUploadProgress(0);
        setCurrentFileIndex(0);
        setTotalFilesToUpload(0);
      }, 1000);
      
      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Clean restart of the upload process
  const cancelUpload = () => {
    setUploading(false);
    setUploadProgress(0);
    setCurrentFileIndex(0);
    setTotalFilesToUpload(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Upload canceled");
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
            ref={fileInputRef}
          />
        </label>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/70">
            <span>Uploading image {currentFileIndex} of {totalFilesToUpload}</span>
            <span className="flex items-center gap-2">
              {uploadProgress}%
              <button 
                onClick={cancelUpload} 
                className="p-1 hover:bg-white/10 rounded-full"
                title="Cancel upload"
              >
                <X size={14} />
              </button>
            </span>
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
