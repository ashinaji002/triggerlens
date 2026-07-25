import React, { useEffect, useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  imageFile: File;
  onRetake: () => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageFile, onRetake, onAnalyze, isAnalyzing = false }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  if (!imageUrl) return null;

  return (
    <>
      {/* Unified UI (Premium Design) */}
      <div className="relative w-full h-full min-h-[400px] flex-col items-center justify-center text-center rounded-[18px] md:rounded-[24px] overflow-hidden bg-[#111111] flex flex-1">
        <img 
          src={imageUrl} 
          alt="Captured scan" 
          className={`w-full h-full object-contain transition-opacity duration-300 ${isAnalyzing ? 'opacity-40' : 'opacity-100'}`}
        />

        {/* Corner Indicators */}
        <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between w-full h-full relative">
            <div className="absolute top-0 left-0 w-8 md:w-10 h-8 md:h-10 border-t-[2px] border-l-[2px] border-white rounded-tl-[16px]"></div>
            <div className="absolute top-0 right-0 w-8 md:w-10 h-8 md:h-10 border-t-[2px] border-r-[2px] border-white rounded-tr-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] left-0 w-8 md:w-10 h-8 md:h-10 border-b-[2px] border-l-[2px] border-white rounded-bl-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] right-0 w-8 md:w-10 h-8 md:h-10 border-b-[2px] border-r-[2px] border-white rounded-br-[16px]"></div>
          </div>
        </div>

        {/* Scanning Line Animation */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="w-full h-[2px] bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)] absolute top-0 left-0 animate-scan-line"></div>
          </div>
        )}

        {/* Bottom Controls (Only visible when NOT analyzing) */}
        {!isAnalyzing && (
          <div className="absolute bottom-0 inset-x-0 h-[90px] md:h-[120px] bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 z-20">
            
            <button 
              onClick={onRetake}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              aria-label="Retake Photo"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
            </button>

            <button 
              onClick={onAnalyze}
              className="flex-1 max-w-[240px] bg-white text-zinc-900 py-3 md:py-3.5 px-4 md:px-6 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 text-sm md:text-base"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" aria-hidden="true" />
              Analyze Image
            </button>

            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 opacity-0 pointer-events-none" aria-hidden="true"></div>

          </div>
        )}
      </div>
    </>
  );
};
