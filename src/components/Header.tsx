import React from 'react';
import { Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-border bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-zinc-900 font-semibold tracking-tight text-lg">
        <Scan className="w-5 h-5" />
        <span>TriggerLens</span>
      </Link>
      <div className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
        Powered by Gemini
      </div>
    </header>
  );
};
