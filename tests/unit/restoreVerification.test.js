import { jest } from '@jest/globals';

describe('Restore Verification Module', () => {
  let restoreVerificationModule;

  beforeEach(async () => {
    jest.resetModules();
    restoreVerificationModule = await import('../../src/scripts/modules/restore-verification.js');
  });

  describe('buildReport', () => {
    test('handles empty rows', () => {
      const report = restoreVerificationModule.buildReport({});
      expect(report.status).toBe('empty');
      expect(report.notificationType).toBe('success');
      expect(report.rows).toEqual([]);
    });

    test('reports match when no differences exist', () => {
      const rows = [
        { label: 'Projects', live: 5, sandbox: 5 },
        { label: 'Devices', live: 10, sandbox: 10 }
      ];
      const report = restoreVerificationModule.buildReport({ rows });
      expect(report.status).toBe('match');
      expect(report.notificationType).toBe('success');
      expect(report.differences).toHaveLength(0);
    });

    test('reports mismatch when differences exist', () => {
      const rows = [
        { label: 'Projects', live: 5, sandbox: 6 }, // Differs
        { label: 'Devices', live: 10, sandbox: 10 }
      ];
      const report = restoreVerificationModule.buildReport({ rows });
      expect(report.status).toBe('mismatch');
      expect(report.notificationType).toBe('warning');
      expect(report.differences).toHaveLength(1);
      expect(report.differences[0].label).toBe('Projects');
      expect(report.differences[0].diff).toBe(1); // sandbox(6) - live(5)
    });

    test('uses explicit diff if provided', () => {
      const rows = [
        { label: 'Custom', live: 0, sandbox: 0, diff: -5 }
      ];
      const report = restoreVerificationModule.buildReport({ rows });
      expect(report.status).toBe('mismatch');
      expect(report.differences[0].diff).toBe(-5);
    });

    test('normalises invalid row data safely', () => {
      const rows = [null, { label: null }, { live: 'invalid' }];
      const report = restoreVerificationModule.buildReport({ rows });
      expect(report.rows).toHaveLength(3);
      expect(report.rows[0].label).toBe('Metric');
      expect(report.rows[2].live).toBe(0);
    });

    test('uses translator provided in options', () => {
      const mockTranslator = jest.fn((key, fallback) => `[${key}]`);
      const rows = [{ label: 'Foo', live: 1, sandbox: 2 }];
      const report = restoreVerificationModule.buildReport({ rows, translation: mockTranslator });

      expect(report.status).toBe('mismatch');
      expect(mockTranslator).toHaveBeenCalledWith('restoreVerificationMismatch', expect.any(String));
      // Alert message should contain translated strings
      expect(report.alertMessage).toContain('[restoreVerificationMismatch]');
    });
  });

  describe('buildFailureReport', () => {
    test('returns error structure', () => {
      const error = new Error('Test Error');
      const report = restoreVerificationModule.buildFailureReport({ error });

      expect(report.status).toBe('error');
      expect(report.notificationType).toBe('warning');
      expect(report.error).toBe(error);
      expect(report.rows).toEqual([]);
    });

    test('uses translation', () => {
      const mockTranslator = jest.fn(() => 'Translated Error');
      const report = restoreVerificationModule.buildFailureReport({ translation: mockTranslator });
      expect(report.alertMessage).toBe('Translated Error');
    });
  });
});
