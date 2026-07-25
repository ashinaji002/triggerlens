import React from 'react';
import { Pill, Wine, Cigarette, Package, Shield, Lock, ShieldCheck, Sparkles, ScanLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectCategory = (category: string) => {
    navigate(`/scan/${category}`);
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] mx-auto px-5 sm:px-6 py-10 md:py-16">
      
      {/* Intro / Hero */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full mb-6">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">
            ✦ AI Visual Safety Assistant
          </span>
        </div>
        
        <h1 className="text-[34px] md:text-[52px] font-bold text-zinc-900 mb-5 tracking-tight leading-tight">
          What are you scanning?
        </h1>
        
        <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-[600px] mb-8">
          Point your camera at a product. TriggerLens will analyze the visible information — no searching or typing required.
        </p>

        {/* Tiny Scanner Separator */}
        <div className="flex items-center justify-center w-full max-w-[200px] gap-3 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-200" />
          <ScanLine className="w-4 h-4 text-zinc-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-200" />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
        <CategoryCard 
          title="Medicine"
          description="Identify medicines and visible label information."
          Icon={Pill}
          theme="medicine"
          chipText="Name, strength & label details"
          onClick={() => handleSelectCategory('medicine')}
        />
        <CategoryCard 
          title="Drink"
          description="Check visible beverage and alcohol information."
          Icon={Wine}
          theme="drink"
          chipText="Alcohol %, label & warnings"
          onClick={() => handleSelectCategory('drink')}
        />
        <CategoryCard 
          title="Tobacco"
          description="Identify visible tobacco or nicotine products."
          Icon={Cigarette}
          theme="tobacco"
          chipText="Nicotine, type & label details"
          onClick={() => handleSelectCategory('tobacco')}
        />
        <CategoryCard 
          title="Other"
          description="Inspect another packaged product."
          Icon={Package}
          theme="other"
          chipText="Other visible product information"
          onClick={() => handleSelectCategory('other')}
        />
      </div>

      {/* Trust Strip */}
      <div className="w-full bg-zinc-50/50 border border-zinc-100 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60 mb-12">
        <div className="flex-1 flex flex-col items-start text-left md:px-4 first:px-0 pt-4 md:pt-0 first:pt-0">
          <Lock className="w-5 h-5 text-zinc-400 mb-3" />
          <h4 className="font-semibold text-[15px] text-zinc-900 mb-1.5">Your privacy matters</h4>
          <p className="text-[13.5px] text-zinc-500 leading-relaxed">Images are analyzed only to identify visible product information.</p>
        </div>
        
        <div className="flex-1 flex flex-col items-start text-left md:px-4 pt-6 md:pt-0">
          <ShieldCheck className="w-5 h-5 text-zinc-400 mb-3" />
          <h4 className="font-semibold text-[15px] text-zinc-900 mb-1.5">Evidence first</h4>
          <p className="text-[13.5px] text-zinc-500 leading-relaxed">Results should reflect information that can actually be identified from the image.</p>
        </div>

        <div className="flex-1 flex flex-col items-start text-left md:px-4 pt-6 md:pt-0">
          <Sparkles className="w-5 h-5 text-zinc-400 mb-3" />
          <h4 className="font-semibold text-[15px] text-zinc-900 mb-1.5">AI-powered analysis</h4>
          <p className="text-[13.5px] text-zinc-500 leading-relaxed">Gemini helps understand information visible on product labels and packaging.</p>
        </div>
      </div>

      {/* Bottom Safety Message */}
      <div className="flex items-center justify-center gap-2 text-zinc-400 pb-8">
        <Shield className="w-3.5 h-3.5" />
        <span className="text-[12px] md:text-[13px] font-medium">
          TriggerLens is an informational tool and not a substitute for professional medical advice.
        </span>
      </div>
      
    </div>
  );
};
