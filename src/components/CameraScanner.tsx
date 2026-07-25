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
        accept="image/jpeg,image/png,image/webp" 
        capture="environment"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <input 
        type="file" 
        accept="image/jpeg,image/png,image/webp"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Unified UI (Premium Design) */}
      <div className="relative w-full h-full min-h-[400px] flex-col items-center justify-center text-center rounded-[18px] md:rounded-[24px] overflow-hidden bg-[#111111] flex flex-1">
        {/* Camera Guidance Overlay */}
        <div className="absolute top-4 md:top-6 inset-x-0 flex justify-center z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 text-xs md:text-sm font-medium">
            <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/80" aria-hidden="true" />
            Keep the label inside the frame
          </div>
        </div>

        {/* Corner Indicators */}
        <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between w-full h-full relative">
            <div className="absolute top-0 left-0 w-8 md:w-10 h-8 md:h-10 border-t-[2px] border-l-[2px] border-white rounded-tl-[16px]"></div>
            <div className="absolute top-0 right-0 w-8 md:w-10 h-8 md:h-10 border-t-[2px] border-r-[2px] border-white rounded-tr-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] left-0 w-8 md:w-10 h-8 md:h-10 border-b-[2px] border-l-[2px] border-white rounded-bl-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] right-0 w-8 md:w-10 h-8 md:h-10 border-b-[2px] border-r-[2px] border-white rounded-br-[16px]"></div>
          </div>
        </div>

        {/* Empty State placeholder */}
        <div className="flex flex-col items-center justify-center opacity-30 mt-[-40px]">
          <Camera className="w-12 h-12 md:w-16 md:h-16 text-white mb-4" aria-hidden="true" />
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 inset-x-0 h-[90px] md:h-[120px] bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between px-6 sm:px-8 md:px-12 z-20">
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
            aria-label="Upload Image"
          >
            <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
          </button>

          <button 
            onClick={() => cameraInputRef.current?.click()}
            className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-full bg-white flex items-center justify-center p-1 hover:scale-95 transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 shrink-0"
            aria-label="Take Photo"
          >
            <div className="w-full h-full rounded-full border-[2px] border-zinc-900 bg-white"></div>
          </button>

          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center opacity-0 pointer-events-none shrink-0" aria-hidden="true">
            <Flashlight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>
    </>
  );
};
