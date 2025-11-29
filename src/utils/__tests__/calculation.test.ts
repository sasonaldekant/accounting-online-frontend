import { describe, it, expect } from 'vitest';
import {
  roundTo,
  calculateVAT,
  calculateGrossAmount,
  calculateNetFromGross,
  applyDiscount,
  calculateLineItemTotal,
  calculateDocumentTotal,
  distributeCostByValue,
  distributeCostEvenly,
  convertCurrency,
} from '../calculation';

describe('calculation utils', () => {
  describe('roundTo', () => {
    it('should round to specified decimals', () => {
      expect(roundTo(1.234, 2)).toBe(1.23);
      expect(roundTo(1.235, 2)).toBe(1.24);
      expect(roundTo(1.234, 1)).toBe(1.2);
      expect(roundTo(1.234, 0)).toBe(1);
    });
  });

  describe('calculateVAT', () => {
    it('should calculate 20% VAT correctly', () => {
      expect(calculateVAT(100, 20)).toBe(20);
    });

    it('should calculate 10% VAT correctly', () => {
      expect(calculateVAT(100, 10)).toBe(10);
    });

    it('should handle zero VAT', () => {
      expect(calculateVAT(100, 0)).toBe(0);
    });

    it('should handle decimal amounts', () => {
      expect(calculateVAT(123.45, 20)).toBe(24.69);
    });
  });

  describe('calculateGrossAmount', () => {
    it('should calculate gross with VAT', () => {
      expect(calculateGrossAmount(100, 20)).toBe(120);
    });

    it('should handle zero VAT', () => {
      expect(calculateGrossAmount(100, 0)).toBe(100);
    });
  });

  describe('calculateNetFromGross', () => {
    it('should extract net from gross', () => {
      expect(calculateNetFromGross(120, 20)).toBe(100);
    });

    it('should handle zero VAT', () => {
      expect(calculateNetFromGross(100, 0)).toBe(100);
    });
  });

  describe('applyDiscount', () => {
    it('should apply 10% discount', () => {
      expect(applyDiscount(100, 10)).toBe(90);
    });

    it('should apply 50% discount', () => {
      expect(applyDiscount(100, 50)).toBe(50);
    });

    it('should handle zero discount', () => {
      expect(applyDiscount(100, 0)).toBe(100);
    });
  });

  describe('calculateLineItemTotal', () => {
    it('should calculate total without discount', () => {
      const result = calculateLineItemTotal(10, 100, 0, 20);
      expect(result.netAmount).toBe(1000);
      expect(result.vatAmount).toBe(200);
      expect(result.grossAmount).toBe(1200);
    });

    it('should calculate total with discount', () => {
      const result = calculateLineItemTotal(10, 100, 10, 20);
      expect(result.netAmount).toBe(900);
      expect(result.vatAmount).toBe(180);
      expect(result.grossAmount).toBe(1080);
    });

    it('should handle zero VAT', () => {
      const result = calculateLineItemTotal(5, 20, 0, 0);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(0);
      expect(result.grossAmount).toBe(100);
    });
  });

  describe('calculateDocumentTotal', () => {
    it('should sum multiple items', () => {
      const items = [
        { netAmount: 100, vatAmount: 20 },
        { netAmount: 200, vatAmount: 40 },
        { netAmount: 150, vatAmount: 30 },
      ];
      const result = calculateDocumentTotal(items);
      expect(result.totalNet).toBe(450);
      expect(result.totalVat).toBe(90);
      expect(result.totalGross).toBe(540);
    });

    it('should handle empty array', () => {
      const result = calculateDocumentTotal([]);
      expect(result.totalNet).toBe(0);
      expect(result.totalVat).toBe(0);
      expect(result.totalGross).toBe(0);
    });
  });

  describe('distributeCostByValue', () => {
    it('should distribute cost proportionally', () => {
      const items = [
        { id: 1, netAmount: 100 },
        { id: 2, netAmount: 200 },
        { id: 3, netAmount: 300 },
      ];
      const result = distributeCostByValue(60, items);
      expect(result[0].distributedCost).toBe(10); // 100/600 * 60
      expect(result[1].distributedCost).toBe(20); // 200/600 * 60
      expect(result[2].distributedCost).toBe(30); // 300/600 * 60
    });

    it('should handle zero total value', () => {
      const items = [
        { id: 1, netAmount: 0 },
        { id: 2, netAmount: 0 },
      ];
      const result = distributeCostByValue(100, items);
      expect(result[0].distributedCost).toBe(0);
      expect(result[1].distributedCost).toBe(0);
    });
  });

  describe('distributeCostEvenly', () => {
    it('should distribute evenly', () => {
      expect(distributeCostEvenly(100, 4)).toBe(25);
    });

    it('should handle zero items', () => {
      expect(distributeCostEvenly(100, 0)).toBe(0);
    });
  });

  describe('convertCurrency', () => {
    it('should convert with exchange rate', () => {
      expect(convertCurrency(100, 117.5)).toBe(11750);
    });

    it('should handle rate of 1', () => {
      expect(convertCurrency(100, 1)).toBe(100);
    });
  });
});
