import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Pill, Wine, Cigarette, Package, Shield, Sparkles, Activity, FileText, ShieldCheck, AlertCircle } from 'lucide-react';
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
  const [errorState, setErrorState] = useState<boolean>(false);

  const isValidCategory = category && Object.keys(icons).includes(category);
  if (!isValidCategory) {
    return <div className="p-6">Invalid category</div>;
  }

  const typedCategory = category as ScanCategory;
  const CategoryIcon = icons[typedCategory];

  const handleImageCaptured = (file: File) => {
    setImageFile(file);
    setErrorState(false);
  };

  const handleRetake = () => {
    setImageFile(null);
    setErrorState(false);
  };

  const handleAnalyze = async () => {
    if (!imageFile || isAnalyzing) return;
    setIsAnalyzing(true);
    setErrorState(false);
    
    try {
      const result = await analyzeImage(imageFile, typedCategory);
      setIsAnalyzing(false);
      navigate('/result', { state: { result } });
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      setErrorState(true);
    }
  };

  return (
    <div className="flex flex-col h-full md:h-auto w-full max-w-[1200px] mx-auto px-5 sm:px-6 py-6 md:py-12">
      {/* Top Navigation */}
      <div className="flex flex-col items-center gap-3 mb-6 md:mb-12 w-full justify-center relative shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 md:top-2 p-2 -ml-2 rounded-full hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-700" aria-hidden="true" />
        </button>
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full mb-4">
            <CategoryIcon className="w-3.5 h-3.5 text-zinc-600" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-600 uppercase">
              {category} Scan
            </span>
          </div>
          <h1 className="text-[32px] md:text-[48px] font-bold text-zinc-900 mb-3 tracking-tight text-center leading-tight">
            Scan the {category}
          </h1>
          <p className="text-zinc-500 text-[15px] md:text-[17px] text-center max-w-[400px]">
            Keep the product name, strength and label clearly visible.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start w-full flex-1">
        
        {/* LEFT: CAMERA CONTAINER */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-6 order-1 flex-1 md:flex-none justify-center md:justify-start">
          {errorState ? (
            <div className="w-full aspect-[4/3] bg-zinc-50 rounded-[24px] border border-red-100 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Analysis couldn't be completed</h2>
              <p className="text-zinc-500 text-sm mb-8 max-w-[300px]">
                Try scanning the product again with the label clearly visible.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={handleRetake}
                  className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full md:h-auto md:aspect-[4/3] min-h-[400px] md:min-h-0 md:rounded-[24px] overflow-hidden bg-transparent md:bg-[#111111]">
              {imageFile ? (
                <ImagePreview 
                  imageFile={imageFile} 
                  onRetake={handleRetake} 
                  onAnalyze={handleAnalyze} 
                  isAnalyzing={isAnalyzing}
                />
              ) : (
                <CameraScanner onImageCaptured={handleImageCaptured} />
              )}
            </div>
          )}
          
          {/* ANALYZING STATUS */}
          {isAnalyzing && (
            <div className="w-full">
              <AnalysisLoader imageFile={imageFile!} />
            </div>
          )}
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="hidden md:flex w-full md:w-[45%] lg:w-[40%] flex-col order-2">
          <div className="w-full border border-zinc-200 rounded-[24px] overflow-hidden bg-white shadow-sm">
            <div className="px-5 py-4 md:px-6 md:py-5 border-b border-zinc-100 flex items-center gap-3 bg-zinc-50/50">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h2 className="font-semibold text-zinc-900 text-[16px] md:text-[17px]">What TriggerLens looks for</h2>
            </div>
            
            <div className="flex flex-col divide-y divide-zinc-100">
              <div className="px-5 py-4 md:px-6 md:py-5 flex items-start gap-4">
                <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-lg shrink-0 mt-0.5">
                  <Pill className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-[14px] md:text-[15px] mb-1">Medicine name</h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 leading-relaxed">Identify the visible product name</p>
                </div>
              </div>
              
              <div className="px-5 py-4 md:px-6 md:py-5 flex items-start gap-4">
                <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-lg shrink-0 mt-0.5">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-[14px] md:text-[15px] mb-1">Strength & dosage</h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 leading-relaxed">Read visible strength or dosage information</p>
                </div>
              </div>
              
              <div className="px-5 py-4 md:px-6 md:py-5 flex items-start gap-4">
                <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-lg shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-[14px] md:text-[15px] mb-1">Label details</h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 leading-relaxed">Check visible ingredients and warnings</p>
                </div>
              </div>
              
              <div className="px-5 py-4 md:px-6 md:py-5 flex items-start gap-4">
                <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-[14px] md:text-[15px] mb-1">Safety context</h3>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 leading-relaxed">Present clear information from visible evidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Footer */}
      <div className="hidden md:flex flex-col items-center justify-center mt-12 mb-6 opacity-60">
        <div className="h-[1px] w-full max-w-[200px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-6"></div>
        <div className="flex items-center justify-center gap-2 text-zinc-500">
          <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-[12px] font-medium text-center">
            TriggerLens identifies visible product information and is not a substitute for professional medical advice.
          </span>
        </div>
      </div>

    </div>
  );
};
