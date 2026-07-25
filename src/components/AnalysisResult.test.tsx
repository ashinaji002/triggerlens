import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalysisResult } from './AnalysisResult';
import type { ScanAnalysis } from '../types/analysis';

describe('AnalysisResult Component', () => {
  const mockOnScanAnother = vi.fn();
  const mockOnRetake = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders CAN\'T VERIFY state properly', () => {
    const unverifiedResult: ScanAnalysis = {
      status: 'unverified',
      category: 'medicine',
      evidence: [],
    };

    render(
      <AnalysisResult 
        result={unverifiedResult} 
        onScanAnother={mockOnScanAnother} 
        onRetake={mockOnRetake} 
      />
    );

    expect(screen.getByText(/Can't Verify/i)).toBeInTheDocument();
    expect(screen.getByText(/We couldn't reliably identify this medicine from the visible information/i)).toBeInTheDocument();
    
    // Test the buttons
    const retakeButton = screen.getByRole('button', { name: /Retake Photo/i });
    fireEvent.click(retakeButton);
    expect(mockOnRetake).toHaveBeenCalledTimes(1);

    const scanAnotherButton = screen.getByRole('button', { name: /Choose Another Image/i });
    fireEvent.click(scanAnotherButton);
    expect(mockOnScanAnother).toHaveBeenCalledTimes(1);
  });

  it('renders VERIFIED state with evidence', () => {
    const verifiedResult: ScanAnalysis = {
      status: 'identified',
      category: 'medicine',
      productName: 'Paracetamol',
      strength: '500 mg',
      evidence: ['"Paracetamol" visible on label'],
    };

    render(
      <AnalysisResult 
        result={verifiedResult} 
        onScanAnother={mockOnScanAnother} 
        onRetake={mockOnRetake} 
      />
    );

    expect(screen.getByText(/Verified from visible evidence/i)).toBeInTheDocument();
    expect(screen.getAllByText('Paracetamol')[0]).toBeInTheDocument();
    expect(screen.getAllByText('500 mg')[0]).toBeInTheDocument();
    expect(screen.getByText('"Paracetamol" visible on label')).toBeInTheDocument();
  });

  it('renders PARTIALLY VERIFIED state', () => {
    const partialResult: ScanAnalysis = {
      status: 'partial',
      category: 'medicine',
      productName: 'Unknown Product',
      evidence: ['Pill shape identified'],
    };

    render(
      <AnalysisResult 
        result={partialResult} 
        onScanAnother={mockOnScanAnother} 
        onRetake={mockOnRetake} 
      />
    );

    expect(screen.getByText(/Partially Verified/i)).toBeInTheDocument();
    expect(screen.getAllByText('Unknown Product')[0]).toBeInTheDocument();
  });
});
