import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Pill, Wine, Cigarette, Package } from 'lucide-react';
import { CameraScanner } from '../components/CameraScanner';
import { ImagePreview } from '../components/ImagePreview';
import { AnalysisLoader } from '../components/AnalysisLoader';
import { analyzeImage } from '../services/analysis';
import type { ScanCategory } from '../types/analysis';

const icons = {
  medicine: Pill,
  drink: Wine,
  tobacco: Cigarette,
  other: Package,
};

export const Scanner: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isValidCategory = category && Object.keys(icons).includes(category);
  if (!isValidCategory) {
    return <div className="p-6">Invalid category</div>;
  }

  const typedCategory = category as ScanCategory;
  const CategoryIcon = icons[typedCategory];

  const handleImageCaptured = (file: File) => {
    setImageFile(file);
  };

  const handleRetake = () => {
    setImageFile(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeImage(imageFile, typedCategory);
      navigate('/result', { state: { result } });
    } catch (error) {
      console.error(error);
      // fallback error handling for Phase 1
      navigate('/result', { state: { result: { status: 'unverified', category: typedCategory, evidence: [] } } });
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto px-6 py-6">
      {/* Top Navigation */}
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-700" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-700 font-semibold text-sm capitalize">
          <CategoryIcon className="w-4 h-4" />
          {category} Scan
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
          Scan the {category}
        </h1>
        <p className="text-zinc-500">
          Keep the product name, strength and label clearly visible.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {isAnalyzing ? (
          <AnalysisLoader imageFile={imageFile!} />
        ) : imageFile ? (
          <ImagePreview 
            imageFile={imageFile} 
            onRetake={handleRetake} 
            onAnalyze={handleAnalyze} 
          />
        ) : (
          <CameraScanner onImageCaptured={handleImageCaptured} />
        )}
      </div>
    </div>
  );
};
