import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  truncateText,
} from '../format';

describe('format utils', () => {
  describe('formatCurrency', () => {
    it('should format number as Serbian currency', () => {
      expect(formatCurrency(1234.56, 'RSD')).toMatch(/1.*234.*56/);
    });

    it('should format zero', () => {
      expect(formatCurrency(0, 'RSD')).toMatch(/0.*00/);
    });

    it('should format negative numbers', () => {
      const result = formatCurrency(-500, 'RSD');
      expect(result).toContain('-');
      expect(result).toContain('500');
    });

    it('should handle EUR currency', () => {
      const result = formatCurrency(100, 'EUR');
      expect(result).toBeTruthy();
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string', () => {
      const result = formatDate('2025-11-29');
      expect(result).toMatch(/29/);
      expect(result).toMatch(/11/);
      expect(result).toMatch(/2025/);
    });

    it('should return empty string for null', () => {
      expect(formatDate(null)).toBe('');
    });

    it('should format ISO datetime', () => {
      const result = formatDate('2025-11-29T12:00:00Z');
      expect(result).toBeTruthy();
    });
  });

  describe('formatDateTime', () => {
    it('should format ISO datetime with time', () => {
      const result = formatDateTime('2025-11-29T14:30:00Z');
      expect(result).toBeTruthy();
    });

    it('should return empty string for null', () => {
      expect(formatDateTime(null)).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('should format number with default 2 decimals', () => {
      const result = formatNumber(1234.567);
      expect(result).toMatch(/1.*234.*57/);
    });

    it('should format with custom decimals', () => {
      const result = formatNumber(10.123456, 4);
      expect(result).toMatch(/10.*1235/);
    });

    it('should format zero', () => {
      expect(formatNumber(0)).toMatch(/0.*00/);
    });
  });

  describe('formatPercent', () => {
    it('should format as percent with % sign', () => {
      const result = formatPercent(20);
      expect(result).toContain('20');
      expect(result).toContain('%');
    });

    it('should format decimal percent', () => {
      const result = formatPercent(15.5);
      expect(result).toContain('15');
      expect(result).toContain('50');
      expect(result).toContain('%');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs truncation';
      const result = truncateText(text, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result).toContain('...');
    });

    it('should not truncate short text', () => {
      const text = 'Short';
      const result = truncateText(text, 20);
      expect(result).toBe(text);
      expect(result).not.toContain('...');
    });

    it('should handle exact length', () => {
      const text = '12345';
      const result = truncateText(text, 5);
      expect(result).toBe(text);
    });
  });
});
