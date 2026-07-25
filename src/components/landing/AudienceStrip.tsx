import React from 'react';
import { User, Users, Heart, HelpCircle } from 'lucide-react';

export const AudienceStrip: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 pb-20 lg:pb-28 text-center flex flex-col items-center">
      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4">
        WHO IT HELPS
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-10 tracking-tight">
        Built for real-life situations
      </h2>

      <div className="w-full bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
        
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <User className="w-6 h-6 text-zinc-400 mb-3" />
          <span className="text-sm font-semibold text-zinc-800">People in recovery</span>
        </div>
        
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <Users className="w-6 h-6 text-zinc-400 mb-3" />
          <span className="text-sm font-semibold text-zinc-800">Caregivers & family</span>
        </div>
        
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <Heart className="w-6 h-6 text-zinc-400 mb-3" />
          <span className="text-sm font-semibold text-zinc-800">Health-conscious users</span>
        </div>
        
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <HelpCircle className="w-6 h-6 text-zinc-400 mb-3" />
          <span className="text-sm font-semibold text-zinc-800">Anyone unsure about a substance</span>
        </div>

      </div>
    </section>
  );
};
