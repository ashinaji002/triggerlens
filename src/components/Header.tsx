import React from 'react';
import { Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-border bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between w-full" aria-label="Main Navigation">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-zinc-900 font-semibold tracking-tight text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-md px-1"
          aria-label="TriggerLens Home"
        >
          <Scan className="w-5 h-5" aria-hidden="true" />
          <span>TriggerLens</span>
        </Link>
        <div className="text-[10px] sm:text-xs text-zinc-600 font-semibold tracking-wide uppercase px-3 py-1.5 border border-zinc-200 rounded-full bg-zinc-50 flex items-center gap-1.5 shadow-sm" role="status" aria-label="Powered by Gemini">
          <span className="text-zinc-400" aria-hidden="true">✦</span>
          Powered by Gemini
        </div>
      </nav>
    </header>
  );
};
