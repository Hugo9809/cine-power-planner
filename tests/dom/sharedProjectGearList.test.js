const LZString = require('lz-string');
const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('shared project gear list handling', () => {
  let env;
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve(''),
      })
    );
    env = setupScriptEnvironment({
      globals: {
        saveProject: jest.fn(),
        loadProject: jest.fn(() => ({})),
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({})),
        updateCalculations: jest.fn()
      }
    });
  });

  afterEach(() => {
    if (typeof window.stopPinkModeAnimatedIcons === 'function') {
      try {
        window.stopPinkModeAnimatedIcons();
      } catch (error) {
        void error;
      }
    }
    if (typeof window.stopPinkModeIconRotation === 'function') {
      try {
        window.stopPinkModeIconRotation();
      } catch (error) {
        void error;
      }
    }
    env.cleanup();
    if (typeof originalFetch === 'undefined') {
      delete global.fetch;
    } else {
      global.fetch = originalFetch;
    }
  });

  test('mount voltage helpers remain globally accessible for share/import flows', () => {
    const expectedHelpers = [
      'SUPPORTED_MOUNT_VOLTAGE_TYPES',
      'DEFAULT_MOUNT_VOLTAGES',
      'mountVoltageInputs',
      'parseVoltageValue',
      'cloneMountVoltageMap',
      'getMountVoltagePreferencesClone',
      'applyMountVoltagePreferences',
      'parseStoredMountVoltages',
      'resetMountVoltagePreferences',
      'updateMountVoltageInputsFromState',
      'persistMountVoltagePreferences',
    ];

    expectedHelpers.forEach(helperName => {
      expect(window[helperName]).toBeDefined();
    });

    expect(typeof window.getMountVoltagePreferencesClone).toBe('function');
    expect(typeof window.applyMountVoltagePreferences).toBe('function');

    const baseline = window.getMountVoltagePreferencesClone();
    const modified = window.getMountVoltagePreferencesClone();

    expect(modified).not.toBe(baseline);
    expect(modified['V-Mount']).toBeDefined();

    modified['V-Mount'].high = baseline['V-Mount'].high + 1;

    window.applyMountVoltagePreferences(modified, { persist: false, triggerUpdate: false });

    const applied = window.getMountVoltagePreferencesClone();
    expect(applied['V-Mount'].high).toBe(modified['V-Mount'].high);

    window.applyMountVoltagePreferences(baseline, { persist: false, triggerUpdate: false });
  });

  test('session layer falls back to default mount voltages when runtime helper is missing', () => {
    const { utils } = env;
    expect(utils.__mountVoltageInternals).toBeDefined();

    const hadCloneHelper = Object.prototype.hasOwnProperty.call(window, 'getMountVoltagePreferencesClone');
    const originalHelper = window.getMountVoltagePreferencesClone;
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      delete window.getMountVoltagePreferencesClone;

      const fallback = utils.__mountVoltageInternals.getSessionMountVoltagePreferencesClone();
      const defaults = window.DEFAULT_MOUNT_VOLTAGES || {};
      const supportedTypes = Object.keys(defaults);

      expect(fallback).toBeDefined();
      expect(typeof fallback).toBe('object');
      expect(supportedTypes.length).toBeGreaterThan(0);

      supportedTypes.forEach(type => {
        expect(fallback[type]).toBeDefined();
        expect(fallback[type]).not.toBe(defaults[type]);
        expect(fallback[type]).toEqual(defaults[type]);
      });
    } finally {
      warnSpy.mockRestore();
      if (hadCloneHelper) {
        window.getMountVoltagePreferencesClone = originalHelper;
      } else {
        delete window.getMountVoltagePreferencesClone;
      }
    }
  });

  test('encodeSharedSetup includes gear list payload', () => {
    const { utils } = env;
    const payload = {
      setupName: 'Test Project',
      gearList: '<div>Gear</div>',
      projectInfo: { projectName: 'Test Project' }
    };

    const encoded = utils.encodeSharedSetup(payload);
    expect(encoded.l).toBe(payload.gearList);

    const decoded = utils.decodeSharedSetup(encoded);
    expect(decoded.gearList).toBe(payload.gearList);
    expect(decoded.projectInfo).toEqual(payload.projectInfo);
  });

  test('decodeSharedSetup preserves modern payloads with empty setup names', () => {
    const { utils } = env;
    const payload = {
      setupName: '',
      gearList: '<section>Gear</section>',
      projectInfo: { projectName: 'Untitled' }
    };

    const decoded = utils.decodeSharedSetup(payload);
    expect(decoded).toBe(payload);
    expect(decoded.projectInfo).toEqual(payload.projectInfo);
    expect(decoded.gearList).toBe(payload.gearList);
  });

  test('decodeSharedSetup fills missing modern fields from encoded keys', () => {
    const { utils } = env;
    const payload = {
      setupName: 'Mixed Payload',
      l: '<div>Encoded Gear</div>',
      a: [{ id: 'rule-1' }]
    };

    const decoded = utils.decodeSharedSetup(payload);
    expect(decoded).not.toBe(payload);
    expect(decoded.setupName).toBe('Mixed Payload');
    expect(decoded.gearList).toBe('<div>Encoded Gear</div>');
    expect(Array.isArray(decoded.autoGearRules)).toBe(true);
    expect(decoded.autoGearRules).toEqual([{ id: 'rule-1' }]);
    expect(payload.gearList).toBeUndefined();
    expect(payload.autoGearRules).toBeUndefined();
  });

  test('encodeSharedSetup preserves auto gear coverage snapshots', () => {
    const { utils } = env;
    const payload = {
      autoGearCoverage: {
        summary: { totalRules: 3, duplicates: 1 },
        categories: [
          { id: 'camera', coverage: ['cameraSelect'], rules: ['rule-1'] },
          { id: 'monitor', coverage: ['monitorSelect'], rules: ['rule-2', 'rule-3'] }
        ]
      }
    };

    const encoded = utils.encodeSharedSetup(payload);
    expect(encoded.z).toEqual(payload.autoGearCoverage);

    const decoded = utils.decodeSharedSetup(encoded);
    expect(decoded.autoGearCoverage).toEqual(payload.autoGearCoverage);
  });

  test('applySharedSetup persists imported gear list', () => {
    const { utils } = env;
    const sharedData = {
      setupName: 'Imported Project',
      gearList: `
        <h2>Imported Project</h2>
        <h3>Gear List</h3>
        <table class="gear-table">
          <tr><td class="gear-item" data-gear-name="Test Item">Test Item</td></tr>
        </table>
      `,
      projectInfo: { projectName: 'Imported Project' }
    };

    env.globals.saveProject.mockClear();

    utils.applySharedSetup(sharedData);
    utils.saveCurrentGearList();

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.innerHTML).toContain('Imported');

    const savedCalls = env.globals.saveProject.mock.calls.filter(([name]) => name === 'Imported Project');
    expect(savedCalls.length).toBeGreaterThan(0);
    expect(savedCalls.some(([, data]) => data.gearList.includes('Imported'))).toBe(true);
    expect(savedCalls.some(([, data]) => data.projectInfo?.projectName === 'Imported Project')).toBe(true);
  });

  test('importing shared project does not overwrite previous project gear list', () => {
    const { utils, globals } = env;
    const setupSelect = document.getElementById('setupSelect');
    const setupNameInput = document.getElementById('setupName');

    setupSelect.insertAdjacentHTML('beforeend', '<option value="Existing Project">Existing Project</option>');
    setupSelect.value = 'Existing Project';
    setupNameInput.value = 'Existing Project';
    setupNameInput.dispatchEvent(new Event('input'));

    setupSelect.value = '';
    setupSelect.dispatchEvent(new Event('change'));
    setupNameInput.value = '';
    setupNameInput.dispatchEvent(new Event('input'));

    globals.saveProject.mockClear();

    const sharedData = {
      setupName: 'Imported Project',
      gearList: `
        <h2>Imported Project</h2>
        <h3>Gear List</h3>
        <table class="gear-table">
          <tr><td class="gear-item" data-gear-name="Test Item">Test Item</td></tr>
        </table>
      `,
      projectInfo: { projectName: 'Imported Project' }
    };

    utils.applySharedSetup(sharedData);
    utils.saveCurrentGearList();

    const existingCalls = globals.saveProject.mock.calls.filter(([name]) => name === 'Existing Project');
    expect(existingCalls.length).toBe(0);

    const importedCalls = globals.saveProject.mock.calls.filter(([name]) => name === 'Imported Project');
    expect(importedCalls.length).toBeGreaterThan(0);
    expect(importedCalls.some(([, data]) => data.gearList.includes('Imported'))).toBe(true);
  });

  test('sanitizes potentially unsafe shared HTML before display', () => {
    const { utils } = env;
    const sharedData = {
      setupName: 'Sanitized Project',
      projectInfo: { projectName: 'Sanitized Project' },
      gearList: `
        <h2>Sanitized Project</h2>
        <div class="requirements-grid">
          <div class="requirement-box" onclick="alert('xss')" style="color:red;">
            <span class="req-label">Camera</span>
            <span class="req-value">Main</span>
          </div>
        </div>
        <script>window.evil && window.evil()</script>
        <table class="gear-table">
          <tr>
            <td class="gear-item" data-gear-name="Safe Item">
              <a href="javascript:alert('xss')" target="_blank">Safe Item</a>
            </td>
            <td><img src="javascript:alert('img')" alt="unsafe" /></td>
          </tr>
        </table>
      `
    };

    utils.applySharedSetup(sharedData);

    const projectRequirementsOutput = document.getElementById('projectRequirementsOutput');
    const gearListOutput = document.getElementById('gearListOutput');

    expect(projectRequirementsOutput.querySelector('script')).toBeNull();
    const requirementBox = projectRequirementsOutput.querySelector('.requirement-box');
    expect(requirementBox).not.toBeNull();
    expect(requirementBox.getAttribute('onclick')).toBeNull();
    expect(requirementBox.getAttribute('style')).toBeNull();

    expect(gearListOutput.querySelector('script')).toBeNull();
    const itemLink = gearListOutput.querySelector('a');
    expect(itemLink).not.toBeNull();
    expect(itemLink.getAttribute('href')).toBeNull();
    expect(itemLink.getAttribute('target')).toBeNull();
    const image = gearListOutput.querySelector('img');
    expect(image).not.toBeNull();
    expect(image.getAttribute('src')).toBeNull();
    expect(gearListOutput.textContent).toContain('Safe Item');
  });

  test('applySharedSetupFromUrl falls back when URLSearchParams is unavailable', () => {
    const { utils, globals } = env;
    const sharedData = {
      setupName: 'Imported URL Project',
      projectInfo: { projectName: 'Imported URL Project' },
      gearList: '<div id="gearList">Shared Gear</div>'
    };

    const encoded = utils.encodeSharedSetup(sharedData);
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(encoded));

    globals.saveProject.mockClear();
    globals.updateCalculations.mockClear();

    const originalHref = window.location.href;
    const expectedPathname = window.location.pathname;
    const originalURLSearchParams = global.URLSearchParams;

    const encodedSharedValue = encodeURIComponent(compressed);
    window.history.replaceState(null, '', `?shared=${encodedSharedValue}&lang=en`);

    delete global.URLSearchParams;

    const replaceSpy = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});

    try {
      utils.applySharedSetupFromUrl();

      expect(globals.saveProject).toHaveBeenCalled();
      const lastCall = globals.saveProject.mock.calls[globals.saveProject.mock.calls.length - 1];
      expect(lastCall[1]).toEqual(expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Imported URL Project' })
      }));
      expect(replaceSpy).toHaveBeenCalledWith(null, '', `${expectedPathname}?lang=en`);
    } finally {
      replaceSpy.mockRestore();
      if (typeof originalURLSearchParams === 'undefined') {
        delete global.URLSearchParams;
      } else {
        global.URLSearchParams = originalURLSearchParams;
      }
      window.history.replaceState(null, '', originalHref);
    }
  });

  test('applySharedSetupFromUrl preserves other query parameters and hash', () => {
    const { utils, globals } = env;
    const sharedData = {
      setupName: 'URL Project',
      projectInfo: { projectName: 'URL Project' },
      gearList: '<div id="gearList">Shared Gear</div>'
    };

    const encoded = utils.encodeSharedSetup(sharedData);
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(encoded));

    globals.saveProject.mockClear();
    globals.updateCalculations.mockClear();

    const originalHref = window.location.href;
    const expectedPathname = window.location.pathname;

    const encodedSharedValue = encodeURIComponent(compressed);
    window.history.replaceState(null, '', `${expectedPathname}?lang=fr&shared=${encodedSharedValue}#section-2`);

    const replaceSpy = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});

    try {
      utils.applySharedSetupFromUrl();

      expect(globals.saveProject).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalledWith(null, '', `${expectedPathname}?lang=fr#section-2`);
    } finally {
      replaceSpy.mockRestore();
      window.history.replaceState(null, '', originalHref);
    }
  });
});
