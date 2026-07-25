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
      {/* Unified UI (Premium Design) */}
      <div className="w-full bg-white border border-zinc-200 rounded-[18px] md:rounded-[24px] p-4 sm:p-5 md:p-6 flex items-center justify-between shadow-sm relative overflow-hidden" role="status" aria-live="polite">
        
        {/* Background subtle pulse */}
        <div className="absolute inset-0 bg-indigo-50/30 animate-pulse pointer-events-none" aria-hidden="true"></div>

        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 animate-pulse" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 mb-0.5">Analyzing visible information...</h3>
            <p className="text-[12px] sm:text-[13.5px] text-zinc-500">{stages[stage]}</p>
          </div>
        </div>

        <div className="flex gap-1 sm:gap-1.5 relative z-10 pr-1 sm:pr-2 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

      </div>
    </>
  );
};
