import React from 'react';
import { Scan } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-2 text-zinc-900 font-semibold tracking-tight text-sm">
          <Scan className="w-4 h-4" />
          <span>TriggerLens</span>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <span className="text-xs font-semibold text-zinc-800 mb-1">Powered by Gemini</span>
          <span className="text-[10px] text-zinc-400 max-w-[200px] md:max-w-none">
            AI-assisted information. Not a substitute for professional medical advice.
          </span>
        </div>
        
      </div>
    </footer>
  );
};
