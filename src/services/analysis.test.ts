import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeImage } from './analysis';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('analyzeImage', () => {
  let mockFile: File;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
  });

  it('should process a valid model response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'identified',
        category: 'medicine',
        productName: 'Test Medicine',
        evidence: ['Visible test label'],
      })
    });

    const result = await analyzeImage(mockFile, 'medicine');
    expect(result.status).toBe('identified');
    expect(result.productName).toBe('Test Medicine');
    expect(result.evidence).toEqual(['Visible test label']);
  });

  it('should handle API errors safely', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await analyzeImage(mockFile, 'medicine');
    expect(result.status).toBe('unverified');
    expect(result.evidence).toEqual([]);
  });

  it('should return proper error state when fetch throws an error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await analyzeImage(mockFile, 'medicine');
    expect(result.status).toBe('unverified');
    expect(result.evidence).toEqual([]);
  });
});
