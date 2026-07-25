import React from 'react';
import { Scan, Camera, Sparkles, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Scan,
      title: "1. Choose",
      desc: "Select what you want to scan."
    },
    {
      icon: Camera,
      title: "2. Scan",
      desc: "Point your camera at the product."
    },
    {
      icon: Sparkles,
      title: "3. Analyze",
      desc: "AI reads visible information."
    },
    {
      icon: CheckCircle2,
      title: "4. Understand",
      desc: "See clear results and visible evidence."
    },
    {
      icon: Shield,
      title: "5. Take Action",
      desc: "Access resources or support when needed."
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20 lg:py-28 text-center flex flex-col items-center">
      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4">
        HOW IT WORKS
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-16 tracking-tight">
        Simple. Fast. Private.
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-4 lg:gap-8">
        {steps.map((step, idx) => (
          <React.Fragment key={step.title}>
            {/* Step */}
            <div className="flex flex-col items-center w-40">
              <div className="w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-5 shadow-sm">
                <step.icon className="w-6 h-6 text-zinc-800" />
              </div>
              <h4 className="font-bold text-zinc-900 mb-2 text-sm">{step.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-[120px]">
                {step.desc}
              </p>
            </div>

            {/* Arrow (hidden on mobile, shown on md up except after last item) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex items-center text-zinc-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
            
            {/* Mobile Down Arrow */}
            {idx < steps.length - 1 && (
              <div className="flex md:hidden text-zinc-300 my-2">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
