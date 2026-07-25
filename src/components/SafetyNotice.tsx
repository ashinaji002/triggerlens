import React from 'react';
import { Shield } from 'lucide-react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="flex items-start gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-4 mt-8">
      <Shield className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
      <p className="text-xs text-zinc-500 leading-relaxed">
        TriggerLens identifies visible product information and is not a substitute for the medicine label, pharmacist, doctor, or other qualified healthcare professional.
      </p>
    </div>
  );
};
