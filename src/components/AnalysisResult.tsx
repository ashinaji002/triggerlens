import React from 'react';
import type { ScanAnalysis } from '../types/analysis';
import { Eye, AlertTriangle, Check, HelpCircle, ShieldAlert, X } from 'lucide-react';

interface AnalysisResultProps {
  result: ScanAnalysis;
  onScanAnother: () => void;
  onRetake: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onScanAnother, onRetake }) => {
  const isVerified = result.status === 'identified';
  const isUnverified = result.status === 'unverified';

  if (isUnverified) {
    return (
      <div className="flex flex-col h-full w-full mx-auto">
        <div className="flex flex-col items-center text-center py-10" role="status" aria-live="polite">
          <h1 className="text-[12px] font-bold text-zinc-500 mb-6 tracking-[0.15em] uppercase flex items-center gap-2">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            Can't Verify
          </h1>
          <p className="text-[20px] md:text-[24px] font-semibold text-zinc-900 leading-snug max-w-[340px] mb-6">
            We couldn't reliably identify this medicine from the visible information.
          </p>
          
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 text-center w-full max-w-sm mx-auto mb-10">
            <p className="text-[15px] text-zinc-600">
              Try again with the product name, strength and label clearly visible.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full max-w-md mx-auto">
          <button 
            onClick={onRetake}
            className="flex-1 bg-zinc-900 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-800 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Retake Photo
          </button>
          <button 
            onClick={onScanAnother}
            className="flex-1 bg-white text-zinc-700 border border-zinc-200 py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-50 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Choose Another Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mx-auto pb-10">
      
      {/* 1. IDENTIFICATION HEADER */}
      <div className="flex flex-col items-center text-center mb-8 mt-2" role="status" aria-live="polite">
        {isVerified ? (
          <>
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <Check className="w-4 h-4 text-green-600" aria-hidden="true" />
            </div>
            <div className="text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase mb-4">
              Verified from visible evidence
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden="true" />
            </div>
            <div className="text-[11px] font-bold text-amber-700 tracking-[0.15em] uppercase mb-4">
              Partially Verified
            </div>
          </>
        )}

        <h1 className="text-[30px] md:text-[36px] font-bold text-zinc-900 leading-tight mb-2 max-w-2xl">
          {result.productName || 'Unknown Product'}
        </h1>
        {result.strength && (
          <p className="text-zinc-500 text-[15px] md:text-[16px]">
            {result.strength}
          </p>
        )}
      </div>

      {/* 2. PRODUCT SUMMARY CARD */}
      <div className="mb-6">
        <h2 className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-3 px-1">
          Visible Information
        </h2>
        <div className="bg-white border border-zinc-200 rounded-[18px] p-2 md:p-3 shadow-sm">
          <div className="flex flex-col gap-1">
            {result.productName && (
              <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-zinc-100 last:border-0">
                <span className="text-[13px] md:text-[14px] text-zinc-500 mb-1 md:mb-0">Product</span>
                <span className="text-[14px] font-semibold text-zinc-900 text-left md:text-right">{result.productName}</span>
              </div>
            )}
            {result.category && (
              <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-zinc-100 last:border-0">
                <span className="text-[13px] md:text-[14px] text-zinc-500 mb-1 md:mb-0">Category</span>
                <span className="text-[14px] font-semibold text-zinc-900 capitalize text-left md:text-right">{result.category}</span>
              </div>
            )}
            {result.productType && (
              <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-zinc-100 last:border-0">
                <span className="text-[13px] md:text-[14px] text-zinc-500 mb-1 md:mb-0">Type</span>
                <span className="text-[14px] font-semibold text-zinc-900 text-left md:text-right">{result.productType}</span>
              </div>
            )}
            {result.strength && (
              <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-zinc-100 last:border-0">
                <span className="text-[13px] md:text-[14px] text-zinc-500 mb-1 md:mb-0">Strength</span>
                <span className="text-[14px] font-semibold text-zinc-900 text-left md:text-right">{result.strength}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. VISIBLE EVIDENCE CARD */}
      {result.evidence && result.evidence.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Eye className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
            <h2 className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase">
              Visible Evidence
            </h2>
          </div>
          <div className="bg-white border border-zinc-200 rounded-[18px] p-5 md:p-6 shadow-sm">
            <ul className="space-y-4 mb-6">
              {result.evidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 text-green-500 shrink-0">
                    <Check className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[14px] text-zinc-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[12px] text-zinc-400">Source</span>
              <span className="text-[12px] text-zinc-500 font-medium">Extracted from packaging</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. SAFETY CONTEXT CARD */}
      <div className="mb-10">
        <h2 className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-3 px-1">
          Safety Context
        </h2>
        <div className="bg-zinc-50 border border-zinc-200 rounded-[18px] p-5 md:p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-700 mb-1">
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            <span className="text-[14px] font-semibold">Information not verified</span>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed">
            Detailed safety information is not available from a verified source.
          </p>
        </div>
      </div>

      {/* 5. WHAT WE CANNOT DETERMINE */}
      <div className="mb-12 px-2">
        <h2 className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-4 text-center md:text-left">
          What this scan cannot determine
        </h2>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-zinc-500 text-[13px]">
          <div className="flex items-center gap-2">
            <X className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Personal medical suitability</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Whether the product was consumed</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Diagnosis or cause of symptoms</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-100 text-[12px] text-zinc-400 text-center md:text-left">
          Visual identification is informational and is not a medical diagnosis.
        </div>
      </div>

      {/* 6. ACTION AREA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={onScanAnother}
          className="flex-1 bg-zinc-900 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-800 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          Scan Another Product
        </button>
        <button 
          className="flex-1 bg-white text-zinc-700 border border-zinc-200 py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center hover:bg-zinc-50 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          Understand This Product
        </button>
      </div>

    </div>
  );
};
