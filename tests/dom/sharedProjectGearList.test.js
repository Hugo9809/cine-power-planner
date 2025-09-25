const LZString = require('lz-string');
const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('shared project gear list handling', () => {
  let env;

  beforeEach(() => {
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
    env.cleanup();
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

  test('applySharedSetupFromUrl creates safety backup before applying data', () => {
    const { utils, globals } = env;
    globals.autoBackup.mockImplementation(() => 'auto-backup-shared-import');

    const sharedData = {
      setupName: 'Safety Project',
      projectInfo: { projectName: 'Safety Project' },
      gearList: '<div id="gearList">Shared Gear</div>'
    };

    const encoded = utils.encodeSharedSetup(sharedData);
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(encoded));
    const encodedSharedValue = encodeURIComponent(compressed);

    const originalHref = window.location.href;

    window.history.replaceState(null, '', `?shared=${encodedSharedValue}`);

    utils.applySharedSetupFromUrl();

    expect(globals.autoBackup).toHaveBeenCalledTimes(1);
    const backupArgs = globals.autoBackup.mock.calls[0][0];
    expect(backupArgs).toMatchObject({
      suppressSuccess: true,
      suppressError: true,
      triggerAutoSaveNotification: false,
    });
    expect(backupArgs.projectNameOverride).toContain('Safety Project');
    expect(globals.saveProject).toHaveBeenCalled();

    window.history.replaceState(null, '', originalHref);
  });

  test('applySharedSetupFromUrl aborts when safety backup fails', () => {
    const { utils, globals } = env;
    globals.autoBackup.mockImplementation(() => null);

    const sharedData = {
      setupName: 'Blocked Project',
      projectInfo: { projectName: 'Blocked Project' },
      gearList: '<div id="gearList">Shared Gear</div>'
    };

    const encoded = utils.encodeSharedSetup(sharedData);
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(encoded));
    const encodedSharedValue = encodeURIComponent(compressed);

    const originalHref = window.location.href;

    window.history.replaceState(null, '', `?shared=${encodedSharedValue}`);

    utils.applySharedSetupFromUrl();

    expect(globals.autoBackup).toHaveBeenCalledTimes(1);
    expect(globals.saveProject).not.toHaveBeenCalled();

    window.history.replaceState(null, '', originalHref);
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

    const originalHref = window.location.href;
    const expectedPathname = window.location.pathname;
    const originalURLSearchParams = global.URLSearchParams;

    const encodedSharedValue = encodeURIComponent(compressed);
    window.history.replaceState(null, '', `?shared=${encodedSharedValue}&lang=en`);

    delete global.URLSearchParams;

    const replaceSpy = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});

    try {
      utils.applySharedSetupFromUrl();

      expect(globals.autoBackup).toHaveBeenCalledTimes(1);
      expect(globals.saveProject).toHaveBeenCalled();
      const lastCall = globals.saveProject.mock.calls[globals.saveProject.mock.calls.length - 1];
      expect(lastCall[1]).toEqual(expect.objectContaining({
        projectInfo: expect.objectContaining({ projectName: 'Imported URL Project' })
      }));
      expect(replaceSpy).toHaveBeenCalledWith(null, '', expectedPathname);
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
});
