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
      </nav>
    </header>
  );
};
