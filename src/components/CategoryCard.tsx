import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, Icon, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left bg-white border border-border p-5 rounded-2xl flex items-center gap-4 transition-all duration-200 hover:shadow-sm hover:border-zinc-300 active:scale-[0.98] group"
    >
      <div className="bg-zinc-50 p-3 rounded-xl border border-border/50 text-zinc-700">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-zinc-900 text-lg">{title}</h3>
        <p className="text-sm text-zinc-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
    </button>
  );
};
