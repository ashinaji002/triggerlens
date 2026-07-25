import React from 'react';
import { Scan, Shield, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PhoneScannerMockup } from './PhoneScannerMockup';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
      {/* Left Column: Text & CTA */}
      <div className="flex-1 flex flex-col items-start w-full">
        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-6">
          AI Visual Safety Assistant
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
          See the risk <br className="hidden sm:block" />
          before it becomes <br className="hidden sm:block" />
          a trigger.
        </h1>
        
        <p className="text-lg text-zinc-500 leading-relaxed max-w-lg mb-10">
          TriggerLens uses AI to analyze products, medicines, and substances through your camera—helping you understand visible product information and make informed choices in seconds.
        </p>

        {/* Benefits Indicators */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <Scan className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Zero typing</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Camera-first experience</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Privacy first</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Images analyzed securely</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">AI powered</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Gemini understands what's visible</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={() => navigate('/scan')}
          className="group flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-sm w-full sm:w-auto justify-center"
        >
          <Camera className="w-5 h-5" />
          Start Scanning Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Column: Visual Mockup */}
      <div className="flex-1 w-full flex justify-center lg:justify-end relative">
        <PhoneScannerMockup />
      </div>
    </section>
  );
};
