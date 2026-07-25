import React from 'react';
import type { ScanAnalysis } from '../types/analysis';
import { EvidenceCard } from './EvidenceCard';
import { SafetyNotice } from './SafetyNotice';
import { Scan, Eye, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AnalysisResultProps {
  result: ScanAnalysis;
  onScanAnother: () => void;
  onRetake: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onScanAnother, onRetake }) => {
  
  if (result.status === 'unverified') {
    return (
      <div className="flex flex-col h-full w-full max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <HelpCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-tight">Can't Verify</h2>
          <p className="text-zinc-500 mb-2">We couldn't reliably identify this product from the visible information.</p>
          <p className="text-zinc-500 text-sm">Try again with the product name and label clearly visible.</p>
        </div>
        
        <div className="flex flex-col gap-3 mt-auto">
          <button 
            onClick={onRetake}
            className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors active:scale-[0.98]"
          >
            <Scan className="w-5 h-5" />
            Retake Photo
          </button>
          <button 
            onClick={onScanAnother}
            className="w-full bg-white text-zinc-700 border border-border py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors active:scale-[0.98]"
          >
            Choose Another Image
          </button>
        </div>
      </div>
    );
  }

  if (result.status === 'conflict') {
    return (
      <div className="flex flex-col h-full w-full max-w-md mx-auto pb-8">
        <div className="flex flex-col items-center text-center py-8 border-b border-border mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-tight">Potential Conflict</h2>
          <p className="text-zinc-500">The visible product information may conflict with your selected avoidance preference.</p>
        </div>

        {result.productName && (
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-zinc-900">{result.productName}</h3>
            {result.strength && <p className="text-zinc-500 mt-1">{result.strength}</p>}
          </div>
        )}

        <EvidenceCard evidence={result.evidence} />

        <div className="flex flex-col gap-3 mt-8">
          <button 
            onClick={onScanAnother}
            className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-800 transition-colors active:scale-[0.98]"
          >
            Scan Another
          </button>
          <button 
            className="w-full bg-white text-zinc-700 border border-border py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors active:scale-[0.98]"
          >
            <Eye className="w-5 h-5" />
            View Visible Details
          </button>
        </div>

        {result.category === 'medicine' && <SafetyNotice />}
      </div>
    );
  }

  // status === 'identified'
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pb-8">
      <div className="flex flex-col items-center text-center py-8 border-b border-border mb-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xs font-bold text-green-600 mb-4 uppercase tracking-widest">Identified</h2>
        
        <h3 className="text-3xl font-bold text-zinc-900">{result.productName}</h3>
        {result.strength && <p className="text-lg text-zinc-500 mt-2">{result.strength}</p>}
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-4">Visible Information</h4>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 flex justify-between items-center border-b border-border">
            <span className="text-zinc-500 text-sm">Product name</span>
            <span className="font-semibold text-zinc-900">{result.productName || 'Unknown'}</span>
          </div>
          {result.strength && (
            <div className="px-5 py-4 flex justify-between items-center border-b border-border">
              <span className="text-zinc-500 text-sm">Strength</span>
              <span className="font-semibold text-zinc-900">{result.strength}</span>
            </div>
          )}
          <div className="px-5 py-4 flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Category</span>
            <span className="font-semibold text-zinc-900 capitalize">{result.category}</span>
          </div>
        </div>
      </div>

      <EvidenceCard evidence={result.evidence} />

      {result.confidence && (
        <div className="mb-8">
          <h4 className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-4">Confidence</h4>
          <div className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between">
            <span className="font-semibold text-zinc-900 capitalize">{result.confidence}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-4">
        <button 
          onClick={onScanAnother}
          className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-800 transition-colors active:scale-[0.98]"
        >
          Scan Another
        </button>
        <button 
          className="w-full bg-white text-zinc-700 border border-border py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors active:scale-[0.98]"
        >
          <Eye className="w-5 h-5" />
          View Visible Details
        </button>
      </div>

      {result.category === 'medicine' && <SafetyNotice />}
    </div>
  );
};
