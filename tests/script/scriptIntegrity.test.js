const fs = require('fs');
const path = require('path');

describe('script.js integrity', () => {
  const scriptPath = path.join(__dirname, '../../src/scripts/script.js');
  const partFiles = [
    'app-core.js',
    'app-events.js',
    'app-setups.js',
    'app-session.js'
  ];

  it('keeps the main UI implementation intact', () => {
    const scriptContents = fs.readFileSync(scriptPath, 'utf8');

    for (const part of partFiles) {
      const partPath = path.join(__dirname, '../../src/scripts', part);
      expect(fs.existsSync(partPath)).toBe(true);
      expect(scriptContents).toContain(`'${part}'`);
    }

    const appCore = fs.readFileSync(
      path.join(__dirname, '../../src/scripts/app-core.js'),
      'utf8'
    );
    expect(appCore).toContain('var LZString;');

    const appSession = fs.readFileSync(
      path.join(__dirname, '../../src/scripts/app-session.js'),
      'utf8'
    );
    expect(appSession).toContain('function formatFilterEntryText');
  });
});
