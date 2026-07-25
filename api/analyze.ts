import { GoogleGenAI, Type } from '@google/genai';
import { z } from 'zod';



const ScanAnalysisSchema = z.object({
  status: z.enum(['identified', 'unverified', 'conflict', 'partial']),
  category: z.enum(['medicine', 'drink', 'tobacco', 'other']),
  productName: z.string().optional(),
  strength: z.string().optional(),
  productType: z.string().optional(),
  visibleText: z.string().optional(),
  evidence: z.array(z.string()),
  confidence: z.enum(['high', 'medium', 'low']).optional()
});

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured on the server.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { imageBase64, mimeType, category } = req.body;

    // Validate inputs
    if (!imageBase64 || !mimeType || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const allowedCategories = ['medicine', 'drink', 'tobacco', 'other'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({ error: 'Invalid or unsupported image type' });
    }

    // Rough size validation for base64 (5MB limit = ~7MB base64)
    if (imageBase64.length > 7 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image size exceeds maximum allowed limit' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a strict visual safety assistant. Analyze this image of a product in the category: ${category}.
Extract the visible information only. Do NOT hallucinate.
Never invent medicine names, strengths, ingredients, or any safety instructions.
If you cannot reliably identify the product strictly from its visible features or label, set status to 'unverified'.
If the product is identified successfully, set status to 'identified'.
If you can extract some visible information (e.g., product type or ingredients) but cannot confidently identify the exact product name, set status to 'partial'.
If there are potential conflicts (e.g., alcohol in a medicine, or if the product itself is generally a hazard like tobacco/cigarettes), set status to 'conflict'.
Return a JSON object with the specified schema. For 'evidence', provide specific visual features or text from the image that led to this conclusion.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType
          }
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['identified', 'unverified', 'conflict', 'partial'] },
            category: { type: Type.STRING, enum: ['medicine', 'drink', 'tobacco', 'other'] },
            productName: { type: Type.STRING },
            strength: { type: Type.STRING },
            productType: { type: Type.STRING },
            visibleText: { type: Type.STRING },
            evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
          },
          required: ['status', 'category', 'evidence']
        },
      }
    });

    if (!response.text) {
      throw new Error('No response text from Gemini');
    }

    const rawResult = JSON.parse(response.text);
    const validationResult = ScanAnalysisSchema.safeParse(rawResult);

    if (!validationResult.success) {
      console.error('Validation failed for model response:', validationResult.error);
      return res.status(200).json({
        status: 'unverified',
        category: category,
        evidence: []
      });
    }

    res.status(200).json(validationResult.data);
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    res.status(500).json({
      status: 'unverified',
      category: req.body?.category || 'other',
      evidence: []
    });
  }
}
