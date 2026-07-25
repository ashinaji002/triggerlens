import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { AnalysisResult } from '../components/AnalysisResult';
import type { ScanAnalysis } from '../types/analysis';

interface LocationState {
  result?: ScanAnalysis;
}

export const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as LocationState;
  
  if (!state || !state.result) {
    return <Navigate to="/" replace />;
  }

  const result = state.result;

  const handleScanAnother = () => {
    navigate('/');
  };

  const handleRetake = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[800px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Top Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-100 transition-colors flex items-center text-zinc-700 font-semibold gap-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          Back to Home
        </button>
      </div>

      <AnalysisResult 
        result={result} 
        onScanAnother={handleScanAnother}
        onRetake={handleRetake}
      />
    </div>
  );
};
