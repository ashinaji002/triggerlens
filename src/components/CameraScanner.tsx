import React, { useRef } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface CameraScannerProps {
  onImageCaptured: (file: File) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onImageCaptured }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageCaptured(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {/* Hidden Inputs */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <input 
        type="file" 
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="relative aspect-[3/4] bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center p-6 text-center" aria-hidden="true">
        {/* Corner Indicators */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-zinc-400 rounded-tl-xl"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-zinc-400 rounded-tr-xl"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-zinc-400 rounded-bl-xl"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-zinc-400 rounded-br-xl"></div>

        <Camera className="w-12 h-12 text-zinc-300 mb-4" aria-hidden="true" />
        <p className="text-zinc-500 font-medium max-w-[200px]">Position the label inside the frame</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <Camera className="w-5 h-5" aria-hidden="true" />
          Open Camera
        </button>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-white text-zinc-700 border border-border py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <ImageIcon className="w-5 h-5" aria-hidden="true" />
          Upload Image
        </button>
      </div>
    </div>
  );
};
