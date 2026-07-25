import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AnalysisLoaderProps {
  imageFile: File;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = () => {
  const [stage, setStage] = useState(0);

  const stages = [
    "Reading label...",
    "Identifying product...",
    "Checking visible details..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => Math.min(prev + 1, stages.length - 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <>
      {/* MOBILE UI (Old Design) */}
      <div className="flex md:hidden flex-col items-center justify-center py-12 text-center w-full">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-zinc-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-zinc-900 rounded-full animate-bounce" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">Analyzing image...</h3>
        <p className="text-zinc-500">This may take a few moments</p>
      </div>

      {/* DESKTOP UI (New Premium Design) */}
      <div className="hidden md:flex w-full bg-white border border-zinc-200 rounded-[24px] p-5 md:p-6 items-center justify-between shadow-sm relative overflow-hidden" role="status" aria-live="polite">
        
        {/* Background subtle pulse */}
        <div className="absolute inset-0 bg-indigo-50/30 animate-pulse pointer-events-none" aria-hidden="true"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-semibold text-zinc-900 mb-0.5">Analyzing visible information...</h3>
            <p className="text-[13.5px] text-zinc-500">{stages[stage]}</p>
          </div>
        </div>

        <div className="flex gap-1.5 relative z-10 pr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

      </div>
    </>
  );
};
