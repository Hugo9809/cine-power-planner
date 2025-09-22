const fs = require('fs');
const path = require('path');

describe('script.js integrity', () => {
  const scriptPath = path.join(__dirname, '../../src/scripts/script.js');

  it('keeps the module loader implementation intact', () => {
    const stats = fs.statSync(scriptPath);
    expect(stats.size).toBeGreaterThan(2500);

    const contents = fs.readFileSync(scriptPath, 'utf8');
    expect(contents).toContain("if (typeof require === 'function' && typeof module !== 'undefined' && module && module.exports)");
    expect(contents).toContain("const parts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js']");
    expect(contents).toContain('const nodePrelude = [');
    expect(contents).toContain('const factory = new Function(');
  });
});
