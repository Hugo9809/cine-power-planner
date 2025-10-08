const fs = require('fs');
const path = require('path');

describe('app session backup configuration', () => {
  test('backup fallbacks include monitor defaults loader', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../../src/scripts/app-session.js'),
      'utf8',
    );
    const fallbackSectionMatch = source.match(/const backupFallbackLoaders = \[(.*?)\n\];/s);
    expect(fallbackSectionMatch).not.toBeNull();
    const section = fallbackSectionMatch[1];
    expect(section).toContain("key: 'autoGearMonitorDefaults'");
    expect(section).toContain("loaderName: 'loadAutoGearMonitorDefaults'");
    expect(section).toContain('isValid: value => isPlainObject(value)');
  });
});
