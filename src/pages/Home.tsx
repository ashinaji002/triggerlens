import React from 'react';
import { Pill, Wine, Cigarette, Package, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectCategory = (category: string) => {
    navigate(`/scan/${category}`);
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto px-6 py-8">
      <div className="mb-10">
        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 block">
          AI Visual Safety Assistant
        </span>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
          What are you scanning?
        </h1>
        <p className="text-zinc-500 leading-relaxed">
          Point your camera at a product. TriggerLens will analyze the visible information — no searching or typing required.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-10 flex-1">
        <CategoryCard 
          title="Medicine"
          description="Identify medicines and visible label information."
          Icon={Pill}
          onClick={() => handleSelectCategory('medicine')}
        />
        <CategoryCard 
          title="Drink"
          description="Check visible beverage and alcohol information."
          Icon={Wine}
          onClick={() => handleSelectCategory('drink')}
        />
        <CategoryCard 
          title="Tobacco"
          description="Identify visible tobacco or nicotine products."
          Icon={Cigarette}
          onClick={() => handleSelectCategory('tobacco')}
        />
        <CategoryCard 
          title="Other"
          description="Inspect another packaged product."
          Icon={Package}
          onClick={() => handleSelectCategory('other')}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-zinc-400 mt-auto pt-4">
        <Shield className="w-4 h-4" />
        <span className="text-xs font-medium">
          Images are analyzed only to identify visible product information.
        </span>
      </div>
    </div>
  );
};
