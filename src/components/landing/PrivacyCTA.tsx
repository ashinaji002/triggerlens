import React from 'react';
import { Lock, Camera, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-6xl mx-auto px-6 pb-20">
      <div className="w-full bg-zinc-50 border border-border rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        
        {/* Left: Privacy */}
        <div className="flex-1">
          <div className="w-12 h-12 bg-white border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Lock className="w-6 h-6 text-zinc-700" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-4">
            Your privacy <br className="hidden sm:block" />
            is our priority.
          </h2>
          <p className="text-zinc-500 max-w-md leading-relaxed text-sm md:text-base">
            Images are analyzed only to identify visible product information. Avoid storing scan content unless the user has explicitly consented.
          </p>
        </div>

        {/* Right: CTA */}
        <div className="flex-1 w-full md:w-auto bg-white border border-border rounded-2xl p-8 md:p-10 shadow-sm flex flex-col items-start md:items-center text-left md:text-center">
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-3">
            Ready to scan?
          </h3>
          <p className="text-zinc-500 mb-8 text-sm md:text-base max-w-xs mx-auto">
            Open your camera. Get clarity. Make an informed choice.
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="group w-full md:w-auto flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-sm"
          >
            <Camera className="w-5 h-5" />
            Start Scanning Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
