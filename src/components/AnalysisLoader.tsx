import React, { useEffect, useState } from 'react';

interface AnalysisLoaderProps {
  imageFile: File;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ imageFile }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stage, setStage] = useState(0);

  const stages = [
    "Reading label...",
    "Identifying product...",
    "Checking visible details..."
  ];

  useEffect(() => {
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => Math.min(prev + 1, stages.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <div className="relative aspect-[3/4] w-full bg-black rounded-3xl overflow-hidden flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt="Analyzing..." 
          className="w-full h-full object-contain opacity-50"
        />
        {/* Scanner Line Animation */}
        <div className="scanner-line"></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-zinc-900 mb-2">Analyzing visible information...</h3>
        <p className="text-sm text-zinc-500 animate-pulse">{stages[stage]}</p>
      </div>
    </div>
  );
};
