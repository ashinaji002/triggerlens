import React from 'react';
import { Shield, Users, BookOpen, HeartHandshake } from 'lucide-react';

export const FeatureStrip: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="w-full bg-white border border-border rounded-2xl md:rounded-3xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
        
        {/* Feature 1 */}
        <div className="flex-1 p-8 lg:p-10 lg:border-r border-border border-b lg:border-b-0">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
            <Shield className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">
            Support recovery <br className="hidden lg:block" />and prevention
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Identify potential substance exposure and access clearer information before making a decision.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex-1 p-8 lg:p-10 lg:border-r border-border border-b lg:border-b-0">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
            <Users className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">
            For individuals <br className="hidden lg:block" />and caregivers
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Give individuals, families and caregivers clarity when identifying unfamiliar products.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex-1 p-8 lg:p-10 lg:border-r border-border border-b lg:border-b-0">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
            <BookOpen className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">
            Backed by trusted <br className="hidden lg:block" />information
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Connect product identification with reliable educational and safety resources.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex-1 p-8 lg:p-10">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-6">
            <HeartHandshake className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">
            Low cognitive <br className="hidden lg:block" />load
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Simple, camera-first interactions designed for moments when searching or typing is difficult.
          </p>
        </div>

      </div>
    </section>
  );
};
