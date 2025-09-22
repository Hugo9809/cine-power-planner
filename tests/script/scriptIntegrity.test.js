const fs = require('fs');
const path = require('path');

describe('app module integrity', () => {
  const appCorePath = path.join(__dirname, '../../src/scripts/app-core.js');
  const appSessionPath = path.join(__dirname, '../../src/scripts/app-session.js');

  it('keeps the main UI implementation intact', () => {
    const stats = fs.statSync(appCorePath);
    expect(stats.size).toBeGreaterThan(500000);

    const coreContents = fs.readFileSync(appCorePath, 'utf8');
    expect(coreContents).toContain('var LZString;');

    const sessionContents = fs.readFileSync(appSessionPath, 'utf8');
    expect(sessionContents).toContain('function formatFilterEntryText');
  });
});
