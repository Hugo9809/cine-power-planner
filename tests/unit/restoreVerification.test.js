const verification = require('../../src/scripts/restore-verification.js');

describe('restore verification reporting', () => {
  const translator = (key, fallback) => {
    const messages = {
      restoreVerificationMatch: 'Verification passed.',
      restoreVerificationMismatch: 'Differences detected:',
      restoreVerificationDifference: '{label}: backup {expected}, live {actual}',
      restoreVerificationFailed: 'Verification failed.',
    };
    if (Object.prototype.hasOwnProperty.call(messages, key)) {
      return messages[key];
    }
    return fallback;
  };

  test('returns success when no differences are present', () => {
    const rows = [
      { label: 'Projects', live: 2, sandbox: 2, diff: 0 },
      { label: 'Rules', live: 5, sandbox: 5, diff: 0 },
    ];
    const report = verification.buildReport({ rows, translation: translator });
    expect(report.status).toBe('match');
    expect(report.differences).toHaveLength(0);
    expect(report.notificationType).toBe('success');
    expect(report.alertMessage).toBe('Verification passed.');
  });

  test('includes difference details when counts diverge', () => {
    const rows = [
      { label: 'Projects', live: 1, sandbox: 3, diff: 2 },
      { label: 'Rules', live: 4, sandbox: 4, diff: 0 },
    ];
    const report = verification.buildReport({ rows, translation: translator });
    expect(report.status).toBe('mismatch');
    expect(report.differences).toHaveLength(1);
    expect(report.notificationType).toBe('warning');
    expect(report.alertMessage).toContain('Differences detected:');
    expect(report.alertMessage).toContain('Projects: backup 3, live 1');
  });

  test('produces failure report when requested', () => {
    const report = verification.buildFailureReport({ translation: translator });
    expect(report.status).toBe('error');
    expect(report.notificationType).toBe('warning');
    expect(report.alertMessage).toBe('Verification failed.');
  });
});
