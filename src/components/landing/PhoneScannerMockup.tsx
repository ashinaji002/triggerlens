import React from 'react';

export const PhoneScannerMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-[260px] aspect-[9/19] bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border border-zinc-800 shrink-0">
      {/* Outer subtle glow/radial effect placed behind the phone via parent context, but we can also add a subtle inner glow */}
      <div className="absolute -inset-10 bg-zinc-200/20 blur-3xl -z-10 rounded-full" />
      
      {/* Screen */}
      <div className="relative h-full w-full bg-zinc-100 rounded-[2rem] overflow-hidden flex flex-col">
        {/* Top Notch/Dynamic Island area */}
        <div className="absolute top-0 inset-x-0 h-7 bg-zinc-900 rounded-b-xl w-1/2 mx-auto z-20" />
        
        {/* Camera UI Header */}
        <div className="absolute top-0 inset-x-0 pt-10 pb-4 px-4 bg-gradient-to-b from-black/60 to-transparent z-10 text-white flex flex-col items-center">
          <span className="font-semibold text-sm">Scan any product</span>
          <span className="text-xs text-white/80 mt-1">Point your camera at the label</span>
        </div>

        {/* Camera Preview Area (Simulated) */}
        <div className="flex-1 bg-zinc-300 relative flex items-center justify-center overflow-hidden">
          {/* Simulated blurred background or image */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-400" />
          
          {/* Target Box with Corner Indicators */}
          <div className="relative w-48 h-64 border-0">
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80 rounded-tl-lg" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/80 rounded-tr-lg" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/80 rounded-bl-lg" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80 rounded-br-lg" />
            
            {/* Simulated Medicine Package */}
            <div className="absolute inset-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border border-white/50 flex flex-col p-4">
              <div className="h-3 w-12 bg-red-500 rounded-full mb-3" />
              <div className="text-zinc-900 font-bold text-sm tracking-tight mb-1">Paracetamol</div>
              <div className="text-zinc-500 text-xs font-medium mb-auto">Tablets IP</div>
              <div className="text-zinc-800 font-semibold text-sm">650 mg</div>
            </div>
            
            {/* Scanner Line Animation */}
            <div className="scanner-line" />
          </div>
        </div>

        {/* Camera Controls Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 flex items-center justify-between px-8">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <div className="w-5 h-5 rounded-sm bg-white/40" />
          </div>
          
          {/* Shutter Button */}
          <div className="w-16 h-16 rounded-full border-4 border-white/50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white" />
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            {/* Flash icon simulation */}
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
