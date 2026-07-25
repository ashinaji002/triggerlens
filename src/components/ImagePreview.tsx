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
      {/* MOBILE UI (Old Design) */}
      <div className="flex md:hidden flex-col gap-6 w-full max-w-md mx-auto">
        <div className="relative aspect-[3/4] bg-black rounded-3xl overflow-hidden flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt="Captured scan" 
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button 
            onClick={onAnalyze}
            className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            Analyze with Gemini
          </button>
          <button 
            onClick={onRetake}
            className="w-full bg-white text-zinc-700 border border-border py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            Retake
          </button>
        </div>
      </div>

      {/* DESKTOP UI (New Premium Design) */}
      <div className="hidden md:flex relative w-full h-full min-h-[300px] items-center justify-center overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Captured scan" 
          className={`w-full h-full object-contain transition-opacity duration-300 ${isAnalyzing ? 'opacity-40' : 'opacity-100'}`}
        />

        {/* Corner Indicators */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between w-full h-full relative">
            <div className="absolute top-0 left-0 w-8 md:w-10 h-8 md:h-10 border-t-[3px] border-l-[3px] border-white rounded-tl-[16px]"></div>
            <div className="absolute top-0 right-0 w-8 md:w-10 h-8 md:h-10 border-t-[3px] border-r-[3px] border-white rounded-tr-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] left-0 w-8 md:w-10 h-8 md:h-10 border-b-[3px] border-l-[3px] border-white rounded-bl-[16px]"></div>
            <div className="absolute bottom-[80px] md:bottom-[90px] right-0 w-8 md:w-10 h-8 md:h-10 border-b-[3px] border-r-[3px] border-white rounded-br-[16px]"></div>
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
          <div className="absolute bottom-0 inset-x-0 h-[100px] md:h-[120px] bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-4 md:gap-6 px-6 z-20">
            
            <button 
              onClick={onRetake}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              aria-label="Retake Photo"
            >
              <RotateCcw className="w-5 h-5 text-white" aria-hidden="true" />
            </button>

            <button 
              onClick={onAnalyze}
              className="flex-1 max-w-[240px] bg-white text-zinc-900 py-3.5 px-6 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              Analyze Image
            </button>

            <div className="w-12 h-12 shrink-0 opacity-0 pointer-events-none" aria-hidden="true"></div>

          </div>
        )}
      </div>
    </>
  );
};
