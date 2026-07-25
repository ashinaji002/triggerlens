import React from 'react';

interface EvidenceCardProps {
  evidence: string[];
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  if (!evidence || evidence.length === 0) return null;

  return (
    <div className="bg-white border border-border rounded-2xl p-5 mb-6">
      <h4 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-4">Visible Evidence</h4>
      <ul className="space-y-3">
        {evidence.map((item, index) => (
          <li key={index} className="text-sm text-zinc-700 flex items-start gap-2">
            <span className="text-zinc-300 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
