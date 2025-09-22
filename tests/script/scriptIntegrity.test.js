const fs = require('fs');
const path = require('path');

describe('script.js integrity', () => {
  const scriptPath = path.join(__dirname, '../../src/scripts/script.js');

  it('exposes the Node aggregation harness', () => {
    const stats = fs.statSync(scriptPath);
    expect(stats.size).toBeGreaterThan(2000);

    const contents = fs.readFileSync(scriptPath, 'utf8');
    expect(contents).toContain('Aggregates the Cine Power Planner runtime pieces');
    expect(contents).toContain("const parts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js']");
    expect(contents).toContain('const factory = new Function(');
    expect(contents).toContain('factory(module.exports, require, module, __filename, __dirname);');
    expect(contents).toMatch(/const APP_VERSION = "[^"]+"/);
  });
});
