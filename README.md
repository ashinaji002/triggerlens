# TriggerLens

TriggerLens is a multimodal visual safety assistant and informational tool designed to help users identify and verify medical and packaged products efficiently, especially in high-cognitive-load situations.

## Core Workflow
- **Select**: Choose the category of product to scan (Medicine, Drink, Tobacco, Other).
- **Scan**: Capture or upload an image of the product.
- **Verify**: Review the AI-extracted product information, visible evidence, and safety context.
- **Understand**: Access educational information extracted purely from visible evidence.
- **Act**: Take informed steps based on the product's verified state.

## Architecture
TriggerLens is built on a modern stack:
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **AI Integration**: `@google/genai` (Gemini API)
- **Database/Auth**: Supabase

## Gemini Integration
TriggerLens uses the Gemini API (`gemini-3.5-flash`) for multimodal image analysis. When a user scans an image, the image is passed along with strict prompts to the Gemini model to identify the product and extract visible evidence from labels. The model response is constrained to a specific JSON schema, which is then validated at runtime using Zod to ensure type-safety.

## Safety & Verification Design
Safety is paramount. TriggerLens enforces a strict "Can't Verify" behavior:
- If the visible evidence is insufficient, or the model cannot reliably identify the product, the system returns a `unverified` status.
- The UI handles this state explicitly by showing a "Can't Verify" prompt and encouraging a rescan. 
- TriggerLens **never** invents missing medical information or trusts invalid data payloads.

## Environment Setup
Create a `.env` file in the root directory and populate it with the required keys. Do NOT commit secret values.
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Available Commands

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Testing Strategy
TriggerLens employs strict unit, component, and E2E testing to ensure safety boundaries are met.
- **Unit/Component Testing**: Vitest & React Testing Library
- **E2E Testing**: Playwright

To run unit and component tests:
```bash
npm run test
```

To run tests with a coverage report:
```bash
npm run test:coverage
```

To run the end-to-end (E2E) workflow tests:
```bash
npx playwright install
npm run test:e2e
```

## Important Limitations
TriggerLens identifies visible product information and is **not a substitute for professional medical advice**. Visual identification is informational and does not constitute a medical diagnosis. The application does not determine personal medical suitability, diagnose symptoms, or verify whether a product was consumed.
