import { test, expect } from '@playwright/test';

test.describe('TriggerLens Core Workflow', () => {
  test('Select -> Scan -> Verify', async ({ page }) => {
    // 1. SELECT
    await page.goto('/');
    await expect(page.getByText('Start Scanning Now').first()).toBeVisible();
    await page.getByText('Start Scanning Now').first().click();

    // Select Medicine category
    await expect(page.getByRole('button', { name: /Medicine/i })).toBeVisible();
    await page.getByRole('button', { name: /Medicine/i }).click();

    // 2. SCAN
    await expect(page).toHaveURL(/.*\/scan\/medicine/);
    
    // We intercept the new /api/analyze endpoint
    await page.route('**/api/analyze', async route => {
      const json = {
        status: 'identified',
        category: 'medicine',
        productName: 'Mock Paracetamol',
        strength: '500 mg',
        productType: 'Medicine',
        visibleText: 'Paracetamol 500mg',
        evidence: ['"Paracetamol" visible'],
        confidence: 'high'
      };
      await route.fulfill({ json });
    });

    // We can't easily click "Upload Image" if it opens a system dialog,
    // but we can set the file input directly.
    const fileChooserPromise = page.waitForEvent('filechooser');
    // Using a locator that targets the hidden input if possible, or clicking the button
    await page.getByLabel('Upload Image').click();
    const fileChooser = await fileChooserPromise;
    
    // Create a dummy image buffer
    const buffer = Buffer.from('R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', 'base64');
    await fileChooser.setFiles({
      name: 'test.jpg',
      mimeType: 'image/jpeg',
      buffer
    });

    // Wait for Analyze button and click
    const analyzeButton = page.getByRole('button', { name: /Analyze Image/i });
    await expect(analyzeButton).toBeVisible();
    await analyzeButton.click();

    // 3. VERIFY
    await expect(page).toHaveURL(/.*\/result/);
    await expect(page.getByText('Mock Paracetamol')).toBeVisible();
    await expect(page.getByText('VERIFIED')).toBeVisible();
  });
});
