const fs = require('fs');
const path = require('path');

describe('script.js integrity', () => {
  const scriptPath = path.join(__dirname, '../../src/scripts/script.js');

  it('keeps the main UI implementation intact', () => {
    const stats = fs.statSync(scriptPath);
    expect(stats.size).toBeGreaterThan(500000);

    const contents = fs.readFileSync(scriptPath, 'utf8');
    expect(contents).toContain('var LZString;');
    expect(contents).toContain('function formatFilterEntryText');
  });
});
