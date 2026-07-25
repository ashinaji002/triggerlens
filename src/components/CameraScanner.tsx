import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Flashlight } from 'lucide-react';

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
    <>
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

      {/* MOBILE UI (Old Design) */}
      <div className="flex md:hidden flex-col gap-6 w-full max-w-md mx-auto">
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

      {/* DESKTOP UI (New Premium Design) */}
      <div className="hidden md:flex relative w-full h-full min-h-[300px] flex-col items-center justify-center text-center">
        {/* Camera Guidance Overlay */}
        <div className="absolute top-6 inset-x-0 flex justify-center z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
            <Camera className="w-4 h-4 text-white/80" aria-hidden="true" />
            Keep the label inside the frame
          </div>
        </div>

        {/* Corner Indicators */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between w-full h-full relative">
            <div className="absolute top-0 left-0 w-8 md:w-10 h-8 md:h-10 border-t-[3px] border-l-[3px] border-white rounded-tl-[16px]"></div>
            <div className="absolute top-0 right-0 w-8 md:w-10 h-8 md:h-10 border-t-[3px] border-r-[3px] border-white rounded-tr-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] left-0 w-8 md:w-10 h-8 md:h-10 border-b-[3px] border-l-[3px] border-white rounded-bl-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] right-0 w-8 md:w-10 h-8 md:h-10 border-b-[3px] border-r-[3px] border-white rounded-br-[16px]"></div>
          </div>
        </div>

        {/* Empty State placeholder */}
        <div className="flex flex-col items-center justify-center opacity-30 mt-[-40px]">
          <Camera className="w-16 h-16 text-white mb-4" aria-hidden="true" />
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 inset-x-0 h-[100px] md:h-[120px] bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between px-8 md:px-12 z-20">
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Upload Image"
          >
            <ImageIcon className="w-5 h-5 text-white" aria-hidden="true" />
          </button>

          <button 
            onClick={() => cameraInputRef.current?.click()}
            className="w-[68px] h-[68px] rounded-full bg-white flex items-center justify-center p-1 hover:scale-95 transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            aria-label="Take Photo"
          >
            <div className="w-full h-full rounded-full border-[2px] border-zinc-900 bg-white"></div>
          </button>

          <div className="w-12 h-12 flex items-center justify-center opacity-0 pointer-events-none" aria-hidden="true">
            <Flashlight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};
