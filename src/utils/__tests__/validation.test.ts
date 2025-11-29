import { describe, it, expect } from 'vitest';
import {
  validateDocumentNumber,
  validatePIB,
  validateCode,
  validateEmail,
  validatePositiveNumber,
  validateNonNegativeNumber,
  validatePercent,
  validateISODate,
  validateDateNotInFuture,
  validateDateBefore,
} from '../validation';

describe('validation utils', () => {
  describe('validateDocumentNumber', () => {
    it('should accept valid numbers', () => {
      expect(validateDocumentNumber('123')).toBe(true);
      expect(validateDocumentNumber('1234567890')).toBe(true);
    });

    it('should reject invalid numbers', () => {
      expect(validateDocumentNumber('12345678901')).toBe(false); // > 10 digits
      expect(validateDocumentNumber('')).toBe(false);
      expect(validateDocumentNumber('abc')).toBe(false);
      expect(validateDocumentNumber('12a')).toBe(false);
    });
  });

  describe('validatePIB', () => {
    it('should accept exactly 9 digits', () => {
      expect(validatePIB('123456789')).toBe(true);
    });

    it('should reject invalid PIB', () => {
      expect(validatePIB('12345678')).toBe(false); // 8 digits
      expect(validatePIB('1234567890')).toBe(false); // 10 digits
      expect(validatePIB('12345678a')).toBe(false);
      expect(validatePIB('')).toBe(false);
    });
  });

  describe('validateCode', () => {
    it('should accept valid codes', () => {
      expect(validateCode('ABC123')).toBe(true);
      expect(validateCode('code-123')).toBe(true);
      expect(validateCode('CODE_456')).toBe(true);
    });

    it('should reject invalid codes', () => {
      expect(validateCode('code with spaces')).toBe(false);
      expect(validateCode('code@123')).toBe(false);
      expect(validateCode('a'.repeat(21))).toBe(false); // > 20 chars
      expect(validateCode('')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
    });
  });

  describe('validatePositiveNumber', () => {
    it('should accept positive numbers', () => {
      expect(validatePositiveNumber(1)).toBe(true);
      expect(validatePositiveNumber(100.5)).toBe(true);
    });

    it('should reject zero and negative', () => {
      expect(validatePositiveNumber(0)).toBe(false);
      expect(validatePositiveNumber(-1)).toBe(false);
      expect(validatePositiveNumber(NaN)).toBe(false);
    });
  });

  describe('validateNonNegativeNumber', () => {
    it('should accept zero and positive', () => {
      expect(validateNonNegativeNumber(0)).toBe(true);
      expect(validateNonNegativeNumber(1)).toBe(true);
      expect(validateNonNegativeNumber(100.5)).toBe(true);
    });

    it('should reject negative', () => {
      expect(validateNonNegativeNumber(-1)).toBe(false);
      expect(validateNonNegativeNumber(NaN)).toBe(false);
    });
  });

  describe('validatePercent', () => {
    it('should accept 0-100', () => {
      expect(validatePercent(0)).toBe(true);
      expect(validatePercent(50)).toBe(true);
      expect(validatePercent(100)).toBe(true);
      expect(validatePercent(25.5)).toBe(true);
    });

    it('should reject out of range', () => {
      expect(validatePercent(-1)).toBe(false);
      expect(validatePercent(101)).toBe(false);
      expect(validatePercent(NaN)).toBe(false);
    });
  });

  describe('validateISODate', () => {
    it('should accept valid ISO dates', () => {
      expect(validateISODate('2025-11-29')).toBe(true);
      expect(validateISODate('2025-11-29T12:00:00Z')).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(validateISODate('invalid')).toBe(false);
      expect(validateISODate('2025-13-01')).toBe(false);
      expect(validateISODate('2025-11-32')).toBe(false);
    });
  });

  describe('validateDateNotInFuture', () => {
    it('should accept past and today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(validateDateNotInFuture(yesterday.toISOString())).toBe(true);
    });

    it('should reject future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(validateDateNotInFuture(tomorrow.toISOString())).toBe(false);
    });
  });

  describe('validateDateBefore', () => {
    it('should accept date1 < date2', () => {
      expect(validateDateBefore('2025-11-28', '2025-11-29')).toBe(true);
    });

    it('should reject date1 >= date2', () => {
      expect(validateDateBefore('2025-11-29', '2025-11-29')).toBe(false);
      expect(validateDateBefore('2025-11-30', '2025-11-29')).toBe(false);
    });
  });
});
