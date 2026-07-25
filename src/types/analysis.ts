export type ScanStatus = 'identified' | 'unverified' | 'conflict';
export type ScanCategory = 'medicine' | 'drink' | 'tobacco' | 'other';
export type Confidence = 'high' | 'medium' | 'low';

export interface ScanAnalysis {
  status: ScanStatus;
  category: ScanCategory;
  productName?: string;
  strength?: string;
  productType?: string;
  visibleText?: string;
  evidence: string[];
  confidence?: Confidence;
}
