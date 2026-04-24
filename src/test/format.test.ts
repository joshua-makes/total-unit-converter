import { describe, it, expect } from 'vitest';
import { formatNumber } from '@/lib/format';

describe('formatNumber', () => {
  it('formats 1/3 to 4 decimal places', () => {
    expect(formatNumber(1 / 3, 4)).toBe('0.3333');
  });

  it('handles large numbers', () => {
    expect(formatNumber(1000000, 2)).toBe('1000000.00');
  });

  it('precision 0 truncates cleanly', () => {
    expect(formatNumber(3.7, 0)).toBe('4');
  });

  it('returns empty string for NaN', () => {
    expect(formatNumber(NaN, 2)).toBe('');
  });

  it('returns empty string for Infinity', () => {
    expect(formatNumber(Infinity, 2)).toBe('');
  });
});
