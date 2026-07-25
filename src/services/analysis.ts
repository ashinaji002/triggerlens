import { GoogleGenAI, Type } from '@google/genai';
import type { Schema } from '@google/genai';
import type { ScanAnalysis, ScanCategory } from '../types/analysis';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeImage(file: File, category: ScanCategory): Promise<ScanAnalysis> {
  if (!apiKey) {
    console.error('VITE_GEMINI_API_KEY is missing. Using fallback mock data.');
    return fallbackMock(category);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Convert File to base64
  const base64String = await fileToBase64(file);
  
  const prompt = `You are a visual safety assistant. Analyze this image of a product in the category: ${category}.
Extract the visible information only. Do NOT hallucinate.
If you cannot reliably identify the product from its visible features or label, set status to 'unverified'.
If the product is identified successfully, set status to 'identified'.
If there are potential conflicts (e.g., alcohol in a medicine, or if the product itself is generally a hazard like tobacco/cigarettes), set status to 'conflict'.
Return a JSON object with the specified schema. For 'evidence', provide specific visual features or text from the image that led to this conclusion (e.g. "Cigarette filter and tobacco visible", "Brand name X visible").`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
            prompt,
            {
                inlineData: {
                    data: base64String,
                    mimeType: file.type || 'image/jpeg'
                }
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: getResponseSchema(),
        }
    });

    if (!response.text) {
        throw new Error("No response text from Gemini");
    }
    
    const result = JSON.parse(response.text) as ScanAnalysis;
    return result;

  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
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

function getResponseSchema(): Schema {
    return {
        type: Type.OBJECT,
        properties: {
            status: {
                type: Type.STRING,
                enum: ['identified', 'unverified', 'conflict']
            },
            category: {
                type: Type.STRING,
                enum: ['medicine', 'drink', 'tobacco', 'other']
            },
            productName: {
                type: Type.STRING
            },
            strength: {
                type: Type.STRING
            },
            productType: {
                type: Type.STRING
            },
            visibleText: {
                type: Type.STRING
            },
            evidence: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            },
            confidence: {
                type: Type.STRING,
                enum: ['high', 'medium', 'low']
            }
        },
        required: ["status", "category", "evidence"]
    };
}

function fallbackMock(category: ScanCategory): ScanAnalysis {
  if (category === 'medicine') {
    return {
      status: 'identified',
      category: 'medicine',
      productName: 'Paracetamol',
      strength: '500 mg',
      productType: 'Medicine',
      visibleText: 'Paracetamol Tablets IP 500 mg',
      evidence: [
        '"Paracetamol" visible',
        '"500 mg" visible',
        '"Tablets IP" visible'
      ],
      confidence: 'high'
    };
  }

  return {
    status: 'unverified',
    category: category,
    evidence: []
  };
}
