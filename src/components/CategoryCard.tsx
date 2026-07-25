import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CategoryTheme = 'medicine' | 'drink' | 'tobacco' | 'other';

interface CategoryCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
  theme: CategoryTheme;
  chipText: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  Icon, 
  onClick,
  theme,
  chipText
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'medicine':
        return {
          iconBg: 'bg-indigo-50/70 group-hover:bg-indigo-100/70',
          iconColor: 'text-indigo-600',
          border: 'border-indigo-100/50'
        };
      case 'drink':
        return {
          iconBg: 'bg-orange-50/70 group-hover:bg-orange-100/70',
          iconColor: 'text-orange-600',
          border: 'border-orange-100/50'
        };
      case 'tobacco':
        return {
          iconBg: 'bg-emerald-50/70 group-hover:bg-emerald-100/70',
          iconColor: 'text-emerald-600',
          border: 'border-emerald-100/50'
        };
      case 'other':
      default:
        return {
          iconBg: 'bg-blue-50/70 group-hover:bg-blue-100/70',
          iconColor: 'text-blue-600',
          border: 'border-blue-100/50'
        };
    }
  };

  const themeStyles = getThemeStyles();
  
  // Optional: Give Medicine a slightly emphasized border
  const baseCardBorder = theme === 'medicine' 
    ? 'border-zinc-200/80 shadow-sm' 
    : 'border-border';

  return (
    <button 
      onClick={onClick}
      className={`group w-full text-left bg-white border ${baseCardBorder} rounded-[24px] p-7 md:p-8 flex flex-col justify-between transition-all duration-250 ease-out hover:-translate-y-[2px] hover:shadow-md hover:border-zinc-300 min-h-[230px] sm:min-h-[240px] relative`}
    >
      <div className="flex items-start justify-between w-full mb-6">
        <div className={`p-4 rounded-2xl transition-colors duration-250 border ${themeStyles.border} ${themeStyles.iconBg}`}>
          <Icon className={`w-7 h-7 ${themeStyles.iconColor}`} />
        </div>
        <div className="w-8 h-8 rounded-full border border-zinc-100 bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-100 transition-colors duration-250 shrink-0">
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-250" />
        </div>
      </div>
      
      <div className="mb-6 flex-1">
        <h3 className="font-bold text-zinc-900 text-2xl mb-2 tracking-tight">{title}</h3>
        <p className="text-zinc-500 text-[15px] leading-relaxed pr-2">{description}</p>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50/80 border border-zinc-100 rounded-lg self-start mt-auto">
        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[12px] font-medium text-zinc-500">{chipText}</span>
      </div>
    </button>
  );
};
