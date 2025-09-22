const fs = require('fs');
const path = require('path');

describe('script.js integrity', () => {
  const scriptsDir = path.join(__dirname, '../../src/scripts');
  const scriptPath = path.join(scriptsDir, 'script.js');

  it('aggregates the modular runtime for Node compatibility', () => {
    const contents = fs.readFileSync(scriptPath, 'utf8');
    expect(contents).toContain("const parts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js']");
    expect(contents).toContain('new Function');
    expect(contents).toContain('module.exports && module.exports.APP_VERSION');
  });

  it('keeps the core runtime definitions inside the modular files', () => {
    const coreContents = fs.readFileSync(path.join(scriptsDir, 'app-core.js'), 'utf8');
    expect(coreContents).toContain('var LZString;');

    const sessionContents = fs.readFileSync(path.join(scriptsDir, 'app-session.js'), 'utf8');
    expect(sessionContents).toContain('module.exports = {');
    expect(sessionContents).toContain('function initApp');
    expect(sessionContents).toContain('function formatFilterEntryText');
  });
});
