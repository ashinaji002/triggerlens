import React, { useEffect, useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  imageFile: File;
  onRetake: () => void;
  onAnalyze: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageFile, onRetake, onAnalyze }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  if (!imageUrl) return null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
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
  );
};
