import type { ScanAnalysis, ScanCategory } from '../types/analysis';

export async function analyzeImage(file: File, category: ScanCategory): Promise<ScanAnalysis> {
  try {
    const base64String = await fileToBase64(file);
    
    // In local dev, we point to Vite's proxy or fully qualified URL if needed.
    // Assuming API is deployed to /api/analyze on Vercel.
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: base64String,
        mimeType: file.type || 'image/jpeg',
        category: category
      }),
    });

    if (!response.ok) {
      throw new Error(`API returned error ${response.status}`);
    }

    const data = await response.json();
    return data as ScanAnalysis;
  } catch (error) {
    // We intentionally do not console.error raw stack traces or internal secrets to production logs
    console.warn('Analysis could not be completed at this time.');
    return {
      status: 'unverified',
      category: category,
      evidence: []
    };
  }
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '') || '';
            // Make sure padding is correct (some APIs require this)
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}
