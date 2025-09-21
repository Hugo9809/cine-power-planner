const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('splitGearListHtml legacy compatibility', () => {
  test('extracts tables without the modern gear-table class', () => {
    const { cleanup } = setupScriptEnvironment({ readyState: 'loading' });
    try {
      const legacyHtml = `
        <h2>Project One</h2>
        <h3>Project Requirements</h3>
        <div class="requirements-grid"><div class="requirement-box">Codec: ProRes</div></div>
        <h3>Gear List</h3>
        <table><tr><td>Legacy Item</td></tr></table>
      `;
      const { projectHtml, gearHtml } = global.splitGearListHtml(legacyHtml);
      expect(projectHtml).toContain('requirements-grid');
      expect(gearHtml).toContain('<table');
      expect(gearHtml).toContain('Legacy Item');
    } finally {
      cleanup();
    }
  });

  test('falls back to stored markup when no table is present', () => {
    const { cleanup } = setupScriptEnvironment({ readyState: 'loading' });
    try {
      const legacyHtml = `
        <h2>Project One</h2>
        <h3>Project Requirements</h3>
        <div class="requirements-grid"><div class="requirement-box">Codec: ProRes</div></div>
        <h3>Gear List</h3>
        <p>Legacy summary</p>
        <ul><li>Legacy Item</li></ul>
      `;
      const { projectHtml, gearHtml } = global.splitGearListHtml(legacyHtml);
      expect(projectHtml).toContain('requirements-grid');
      expect(gearHtml).toContain('Legacy summary');
      expect(gearHtml).toContain('<ul>');
      expect(gearHtml).toContain('Legacy Item');
    } finally {
      cleanup();
    }
  });

  test('derives project name from overview heading with embedded quotes', () => {
    const { cleanup } = setupScriptEnvironment({ readyState: 'loading' });
    try {
      const legacyHtml = `
        <h2>Project Overview for “Mini LF New old”</h2>
        <h3>Gear List</h3>
        <table class="gear-table"><tr><td>Legacy Item</td></tr></table>
      `;
      const { gearHtml } = global.splitGearListHtml(legacyHtml);
      expect(gearHtml).toContain('Gear List: “Mini LF New old”');
    } finally {
      cleanup();
    }
  });
});
