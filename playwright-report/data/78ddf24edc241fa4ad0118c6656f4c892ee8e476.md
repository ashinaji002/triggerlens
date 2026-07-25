# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: workflow.spec.ts >> TriggerLens Core Workflow >> Select -> Scan -> Verify
- Location: e2e\workflow.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Start Scanning Now')
Expected: visible
Error: strict mode violation: getByText('Start Scanning Now') resolved to 2 elements:
    1) <button aria-label="Start Scanning Now" class="group flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-sm w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2">…</button> aka locator('section').filter({ hasText: 'AI Visual Safety AssistantSee' }).getByLabel('Start Scanning Now')
    2) <button aria-label="Start Scanning Now" class="group w-full md:w-auto flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2">…</button> aka locator('section').filter({ hasText: 'Your privacy is our priority.' }).getByLabel('Start Scanning Now')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Start Scanning Now')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - navigation "Main Navigation" [ref=e5]:
      - link "TriggerLens Home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e12]: TriggerLens
  - main [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]: AI Visual Safety Assistant
          - heading "See the risk before it becomes a trigger." [level=1] [ref=e18]
          - paragraph [ref=e19]: TriggerLens uses AI to analyze products, medicines, and substances through your camera—helping you understand visible product information and make informed choices in seconds.
          - generic [ref=e20]:
            - generic [ref=e28]:
              - heading "Zero typing" [level=2] [ref=e29]
              - paragraph [ref=e30]: Camera-first experience
            - generic [ref=e35]:
              - heading "Privacy first" [level=2] [ref=e36]
              - paragraph [ref=e37]: Images analyzed securely
            - generic [ref=e43]:
              - heading "AI powered" [level=2] [ref=e44]
              - paragraph [ref=e45]: Gemini understands what's visible
          - button "Start Scanning Now" [ref=e46]
        - generic [ref=e55]:
          - generic [ref=e57]:
            - generic [ref=e58]: Scan any product
            - generic [ref=e59]: Point your camera at the label
          - generic [ref=e67]:
            - generic [ref=e69]: Paracetamol
            - generic [ref=e70]: Tablets IP
            - generic [ref=e71]: 650 mg
      - generic [ref=e81]:
        - generic [ref=e82]:
          - heading "Support recovery and prevention" [level=2] [ref=e86]
          - paragraph [ref=e87]: Identify potential substance exposure and access clearer information before making a decision.
        - generic [ref=e88]:
          - heading "For individuals and caregivers" [level=2] [ref=e95]
          - paragraph [ref=e96]: Give individuals, families and caregivers clarity when identifying unfamiliar products.
        - generic [ref=e97]:
          - heading "Backed by trusted information" [level=2] [ref=e101]
          - paragraph [ref=e102]: Connect product identification with reliable educational and safety resources.
        - generic [ref=e103]:
          - heading "Low cognitive load" [level=2] [ref=e107]
          - paragraph [ref=e108]: Simple, camera-first interactions designed for moments when searching or typing is difficult.
      - generic [ref=e109]:
        - generic [ref=e110]: HOW IT WORKS
        - heading "Simple. Fast. Private." [level=2] [ref=e111]
        - generic [ref=e112]:
          - generic [ref=e113]:
            - heading "1. Choose" [level=3] [ref=e120]
            - paragraph [ref=e121]: Select what you want to scan.
          - generic [ref=e125]:
            - heading "2. Scan" [level=3] [ref=e130]
            - paragraph [ref=e131]: Point your camera at the product.
          - generic [ref=e135]:
            - heading "3. Analyze" [level=3] [ref=e140]
            - paragraph [ref=e141]: AI reads visible information.
          - generic [ref=e145]:
            - heading "4. Understand" [level=3] [ref=e150]
            - paragraph [ref=e151]: See clear results and visible evidence.
          - generic [ref=e155]:
            - heading "5. Take Action" [level=3] [ref=e159]
            - paragraph [ref=e160]: Access resources or support when needed.
      - generic [ref=e161]:
        - generic [ref=e162]: WHO IT HELPS
        - heading "Built for real-life situations" [level=2] [ref=e163]
        - generic [ref=e164]:
          - heading "People in recovery" [level=3] [ref=e169]
          - heading "Caregivers & family" [level=3] [ref=e176]
          - heading "Health-conscious users" [level=3] [ref=e180]
          - heading "Anyone unsure about a substance" [level=3] [ref=e185]
      - generic [ref=e187]:
        - generic [ref=e188]:
          - heading "Your privacy is our priority." [level=2] [ref=e193]
          - paragraph [ref=e194]: Images are analyzed only to identify visible product information. Avoid storing scan content unless the user has explicitly consented.
        - generic [ref=e195]:
          - heading "Ready to scan?" [level=3] [ref=e196]
          - paragraph [ref=e197]: Open your camera. Get clarity. Make an informed choice.
          - button "Start Scanning Now" [ref=e198]
      - generic [ref=e205]:
        - generic [ref=e206]: TriggerLens
        - generic [ref=e213]:
          - generic [ref=e214]: Powered by Gemini
          - generic [ref=e215]: AI-assisted information. Not a substitute for professional medical advice.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('TriggerLens Core Workflow', () => {
  4  |   test('Select -> Scan -> Verify', async ({ page }) => {
  5  |     // 1. SELECT
  6  |     await page.goto('/');
> 7  |     await expect(page.getByText('Start Scanning Now')).toBeVisible();
     |                                                        ^ Error: expect(locator).toBeVisible() failed
  8  |     await page.getByText('Start Scanning Now').click();
  9  | 
  10 |     // Select Medicine category
  11 |     await expect(page.getByRole('button', { name: /Medicine/i })).toBeVisible();
  12 |     await page.getByRole('button', { name: /Medicine/i }).click();
  13 | 
  14 |     // 2. SCAN
  15 |     await expect(page).toHaveURL(/.*\/scan\/medicine/);
  16 |     
  17 |     // We intercept the new /api/analyze endpoint
  18 |     await page.route('**/api/analyze', async route => {
  19 |       const json = {
  20 |         status: 'identified',
  21 |         category: 'medicine',
  22 |         productName: 'Mock Paracetamol',
  23 |         strength: '500 mg',
  24 |         productType: 'Medicine',
  25 |         visibleText: 'Paracetamol 500mg',
  26 |         evidence: ['"Paracetamol" visible'],
  27 |         confidence: 'high'
  28 |       };
  29 |       await route.fulfill({ json });
  30 |     });
  31 | 
  32 |     // We can't easily click "Upload Image" if it opens a system dialog,
  33 |     // but we can set the file input directly.
  34 |     const fileChooserPromise = page.waitForEvent('filechooser');
  35 |     // Using a locator that targets the hidden input if possible, or clicking the button
  36 |     await page.getByLabel('Upload Image').click();
  37 |     const fileChooser = await fileChooserPromise;
  38 |     
  39 |     // Create a dummy image buffer
  40 |     const buffer = Buffer.from('R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', 'base64');
  41 |     await fileChooser.setFiles({
  42 |       name: 'test.jpg',
  43 |       mimeType: 'image/jpeg',
  44 |       buffer
  45 |     });
  46 | 
  47 |     // Wait for Analyze button and click
  48 |     const analyzeButton = page.getByRole('button', { name: /Analyze Image/i });
  49 |     await expect(analyzeButton).toBeVisible();
  50 |     await analyzeButton.click();
  51 | 
  52 |     // 3. VERIFY
  53 |     await expect(page).toHaveURL(/.*\/result/);
  54 |     await expect(page.getByText('Mock Paracetamol')).toBeVisible();
  55 |     await expect(page.getByText('VERIFIED')).toBeVisible();
  56 |   });
  57 | });
  58 | 
```