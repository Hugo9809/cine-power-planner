const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('gearListGetCurrentHtmlImpl resilience', () => {
  let env;

  afterEach(() => {
    if (env) {
      env.cleanup();
      env = null;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    jest.resetModules();
  });

  test('falls back to stored snapshot when DOM nodes cannot be cloned', () => {
    process.env.CPP_RUNTIME_STUB = 'searchTokens';
    env = setupScriptEnvironment({ disableFreeze: true });
    global.currentLang = 'en';
    global.texts = global.texts || { en: {} };
    global.projectDialogCloseBtn = null;
    require('../../src/scripts/app-setups.js');

    expect(typeof global.getCurrentGearListHtml).toBe('function');

    const gearContainer = document.getElementById('gearListOutput');
    const projectContainer = document.getElementById('projectRequirementsOutput');

    expect(gearContainer).not.toBeNull();
    expect(projectContainer).not.toBeNull();

    const originalGearClone = gearContainer.cloneNode;
    const originalProjectClone = projectContainer.cloneNode;

    const snapshotHtml = '<h2>Stored Setup</h2><p>Snapshot</p>';
    global.__cineLastGearListHtml = snapshotHtml;

    try {
      gearContainer.cloneNode = undefined;
      projectContainer.cloneNode = undefined;

      const result = global.getCurrentGearListHtml();
      expect(result).toBe(snapshotHtml);
    } finally {
      gearContainer.cloneNode = originalGearClone;
      projectContainer.cloneNode = originalProjectClone;
      delete process.env.CPP_RUNTIME_STUB;
    }
  });

  test('returns empty string when no DOM output or snapshot is available', () => {
    process.env.CPP_RUNTIME_STUB = 'searchTokens';
    env = setupScriptEnvironment({ disableFreeze: true });
    global.currentLang = 'en';
    global.texts = global.texts || { en: {} };
    global.projectDialogCloseBtn = null;
    require('../../src/scripts/app-setups.js');

    const gearContainer = document.getElementById('gearListOutput');
    const projectContainer = document.getElementById('projectRequirementsOutput');

    const originalGearClone = gearContainer.cloneNode;
    const originalProjectClone = projectContainer.cloneNode;

    delete global.__cineLastGearListHtml;

    try {
      gearContainer.cloneNode = undefined;
      projectContainer.cloneNode = undefined;

      const result = global.getCurrentGearListHtml();
      expect(result).toBe('');
    } finally {
      gearContainer.cloneNode = originalGearClone;
      projectContainer.cloneNode = originalProjectClone;
      delete process.env.CPP_RUNTIME_STUB;
    }
  });
});

