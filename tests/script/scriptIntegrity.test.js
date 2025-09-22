const fs = require('fs');
const path = require('path');

const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('script.js integrity', () => {
  const scriptPath = path.join(__dirname, '../../src/scripts/script.js');
  const scriptDir = path.dirname(scriptPath);
  const splitParts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];

  it('bundles the split runtime modules for Node-based tests', () => {
    const contents = fs.readFileSync(scriptPath, 'utf8');
    expect(contents).toContain('Aggregates the Cine Power Planner runtime pieces');
    expect(contents).toContain("const parts = ['app-core.js', 'app-events.js', 'app-setups.js', 'app-session.js'];");
    expect(contents).toContain('new Function(');

    splitParts.forEach(part => {
      const partPath = path.join(scriptDir, part);
      expect(fs.existsSync(partPath)).toBe(true);
      const stats = fs.statSync(partPath);
      expect(stats.size).toBeGreaterThan(1024);
    });
  });

  it('still exposes planner utilities when executed', () => {
    const { utils, cleanup } = setupScriptEnvironment({ readyState: 'loading' });
    try {
      expect(utils).toBeTruthy();
      expect(typeof utils.populateSelect).toBe('function');
      expect(typeof global.splitGearListHtml).toBe('function');
    } finally {
      cleanup();
    }
  });
});
