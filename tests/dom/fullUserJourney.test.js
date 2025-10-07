const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const baseDevices = require('../../src/data/devices/index.js');

const cloneDevices = () => JSON.parse(JSON.stringify(baseDevices));

describe('full user journey regression', () => {
  let env;
  let createObjectURLSpy;
  let revokeObjectURLSpy;
  let patchedCreateObjectURL = false;
  let patchedRevokeObjectURL = false;
  const OriginalBlob = global.Blob;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    if (typeof URL === 'undefined') {
      global.URL = {};
    }

    if (typeof URL.createObjectURL === 'function') {
      createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-backup');
    } else {
      patchedCreateObjectURL = true;
      URL.createObjectURL = jest.fn(() => 'blob:mock-backup');
    }

    if (typeof URL.revokeObjectURL === 'function') {
      revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    } else {
      patchedRevokeObjectURL = true;
      URL.revokeObjectURL = jest.fn();
    }

    global.Blob = class MockBlob {
      constructor(parts, options = {}) {
        this.parts = parts;
        this.type = options.type || '';
      }
    };
  });

  afterEach(() => {
    env?.cleanup();
    env = null;

    if (createObjectURLSpy) {
      createObjectURLSpy.mockRestore();
      createObjectURLSpy = null;
    } else if (patchedCreateObjectURL) {
      delete URL.createObjectURL;
      patchedCreateObjectURL = false;
    }

    if (revokeObjectURLSpy) {
      revokeObjectURLSpy.mockRestore();
      revokeObjectURLSpy = null;
    } else if (patchedRevokeObjectURL) {
      delete URL.revokeObjectURL;
      patchedRevokeObjectURL = false;
    }

    if (OriginalBlob === undefined) {
      delete global.Blob;
    } else {
      global.Blob = OriginalBlob;
    }

    localStorage.clear();
    sessionStorage.clear();
  });

  test('preserves planner data across a full workflow', () => {
    env = setupScriptEnvironment({
      devices: cloneDevices(),
      globals: {
        showNotification: jest.fn(),
      },
    });

    // Replace storage stubs with real implementations.
    const stubbedStorageFns = [
      'loadDeviceData',
      'saveDeviceData',
      'loadSetups',
      'saveSetups',
      'saveSetup',
      'loadSetup',
      'deleteSetup',
      'loadFavorites',
      'saveFavorites',
    ];
    stubbedStorageFns.forEach(name => {
      if (Object.prototype.hasOwnProperty.call(global, name)) {
        delete global[name];
      }
    });
    const storageApi = require('../../src/scripts/storage.js');

    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();

    const { utils } = env;

    const setupNameInput = document.getElementById('setupName');
    const setupSelect = document.getElementById('setupSelect');
    const productionCompanyInput = document.getElementById('productionCompany');
    const gearListOutput = document.getElementById('gearListOutput');
    const projectRequirementsOutput = document.getElementById('projectRequirementsOutput');

    expect(setupNameInput).not.toBeNull();
    expect(setupSelect).not.toBeNull();
    expect(productionCompanyInput).not.toBeNull();
    expect(gearListOutput).not.toBeNull();
    expect(projectRequirementsOutput).not.toBeNull();

    setupNameInput.value = 'Project Alpha';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

    productionCompanyInput.value = 'Alpha Films';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));

    const selectAndCaptureLabel = (select) => {
      expect(select).not.toBeNull();
      const option = Array.from(select.options).find(opt => opt.value && opt.value !== 'None');
      expect(option).toBeDefined();
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return option.textContent.trim();
    };

    const cameraLabel = selectAndCaptureLabel(document.getElementById('cameraSelect'));
    selectAndCaptureLabel(document.getElementById('monitorSelect'));
    selectAndCaptureLabel(document.getElementById('videoSelect'));
    selectAndCaptureLabel(document.getElementById('batterySelect'));

    utils.updateCalculations?.();

    const projectSnapshot = utils.collectProjectFormData();
    const alphaGearHtml = utils.generateGearListHtml(projectSnapshot);
    expect(alphaGearHtml).toContain('Gear List');
    utils.displayGearAndRequirements(alphaGearHtml);
    utils.saveCurrentGearList();

    const syncSetupOptions = () => {
      const ensureOptionForName = (name) => {
        if (typeof name !== 'string' || !name) return;
        if (Array.from(setupSelect.options).some(opt => opt.value === name)) {
          return;
        }
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        setupSelect.appendChild(option);
      };

      const savedSetups = storageApi.loadSetups();
      Object.keys(savedSetups).forEach(ensureOptionForName);
      const storedProjects = storageApi.loadProject();
      Object.keys(storedProjects).forEach(ensureOptionForName);
    };

    syncSetupOptions();

    expect(gearListOutput.classList.contains('hidden')).toBe(false);
    expect(gearListOutput.textContent).toContain(cameraLabel);
    expect(projectRequirementsOutput.classList.contains('hidden')).toBe(false);
    expect(projectRequirementsOutput.textContent).toContain('Alpha Films');

    const projectsAfterAlpha = JSON.parse(localStorage.getItem('cameraPowerPlanner_project'));
    expect(projectsAfterAlpha).toBeTruthy();
    expect(projectsAfterAlpha['Project Alpha']).toBeDefined();
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompany).toBe('Alpha Films');
    expect(projectsAfterAlpha['Project Alpha'].gearList).toBeUndefined();
    expect(projectsAfterAlpha['Project Alpha'].gearListAndProjectRequirementsGenerated).toBe(true);

    setupNameInput.value = 'Project Beta';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyInput.value = 'Beta Productions';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    setupSelect.value = '';
    setupSelect.dispatchEvent(new Event('change'));

    const betaSnapshot = utils.collectProjectFormData();
    const betaGearHtml = utils.generateGearListHtml(betaSnapshot);
    utils.displayGearAndRequirements(betaGearHtml);
    utils.populateProjectForm(betaSnapshot);
    utils.saveCurrentGearList();
    syncSetupOptions();
    setupSelect.value = 'Project Beta';

    const projectsAfterBeta = JSON.parse(localStorage.getItem('cameraPowerPlanner_project'));
    expect(projectsAfterBeta['Project Beta']).toBeDefined();
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompany).toBe('Beta Productions');

    const storedBetaProject = storageApi.loadProject('Project Beta');
    expect(storedBetaProject).toBeTruthy();
    utils.populateProjectForm(storedBetaProject.projectInfo);
    expect(productionCompanyInput.value).toBe('Beta Productions');

    const projectKeys = Object.keys(storageApi.loadProject());
    expect(projectKeys).toEqual(expect.arrayContaining(['Project Alpha', 'Project Beta']));

    const restoredAlphaProject = storageApi.loadProject('Project Alpha');
    expect(restoredAlphaProject).toBeTruthy();
    expect(restoredAlphaProject.projectInfo.productionCompany).toBe('Alpha Films');
    const regeneratedAlpha = utils.generateGearListHtml(restoredAlphaProject.projectInfo || {});
    utils.displayGearAndRequirements(regeneratedAlpha);
    utils.populateProjectForm(restoredAlphaProject.projectInfo);

    expect(productionCompanyInput.value).toBe('Alpha Films');
    expect(projectRequirementsOutput.textContent).toContain('Alpha Films');
    expect(gearListOutput.textContent).toContain(cameraLabel);

    const autoBackupName = utils.autoBackup({
      suppressSuccess: true,
      suppressError: true,
      reason: 'interval',
    });
    expect(typeof autoBackupName).toBe('string');
    expect(autoBackupName.startsWith('auto-backup-')).toBe(true);

    const setupsData = storageApi.loadSetups();
    expect(setupsData[autoBackupName]).toBeDefined();
    expect(setupsData[autoBackupName].gearList).toBeUndefined();
    expect(setupsData[autoBackupName].gearListAndProjectRequirementsGenerated).toBe(true);

    const projectsAfterAutoBackup = storageApi.loadProject();
    expect(projectsAfterAutoBackup[autoBackupName]).toBeDefined();

    const backupFileName = utils.createSettingsBackup(false, new Date('2024-05-01T12:34:56Z'));
    expect(typeof backupFileName).toBe('string');
    expect(backupFileName).toContain('full app backup.json');

    const fullBackupHistoryRaw = localStorage.getItem('cameraPowerPlanner_fullBackups');
    expect(fullBackupHistoryRaw).toBeTruthy();

    const initialRules = utils.getAutoGearRules();
    const customRule = {
      id: 'rule-test',
      label: 'Always add spare monitor',
      always: true,
      add: [
        { id: 'item-test', name: 'Director Monitor handheld spare', category: 'monitors', quantity: 1 },
      ],
    };
    utils.importAutoGearRulesFromData([...initialRules, customRule]);
    const rulesAfterImport = utils.getAutoGearRules();
    expect(rulesAfterImport.some(rule => rule.label === 'Always add spare monitor')).toBe(true);

    const backupCreated = utils.createAutoGearBackup({ force: true, notifySuccess: false, notifyFailure: false });
    expect(backupCreated).toBe(true);

    const autoGearBackupsRaw = localStorage.getItem('cameraPowerPlanner_autoGearBackups');
    expect(autoGearBackupsRaw).toBeTruthy();
    const autoGearBackups = JSON.parse(autoGearBackupsRaw);
    expect(autoGearBackups.length).toBeGreaterThan(0);
    const backupId = autoGearBackups[0].id;

    utils.importAutoGearRulesFromData([]);
    expect(utils.getAutoGearRules()).toHaveLength(0);

    const restoreResult = utils.restoreAutoGearBackup(backupId);
    expect(restoreResult).toBe(true);
    expect(utils.getAutoGearRules().some(rule => rule.label === 'Always add spare monitor')).toBe(true);

    const exported = global.exportAllData();
    expect(exported).toBeTruthy();
    expect(exported.project['Project Alpha'].projectInfo.productionCompany).toBe('Alpha Films');
    expect(exported.project['Project Alpha'].gearList).toBeUndefined();
    expect(exported.project['Project Alpha'].gearListAndProjectRequirementsGenerated).toBe(true);
    expect(exported.autoGearRules.some(rule => rule.label === 'Always add spare monitor')).toBe(true);

    localStorage.removeItem('cameraPowerPlanner_project');
    localStorage.removeItem('cameraPowerPlanner_setups');
    localStorage.removeItem('cameraPowerPlanner_autoGearRules');
    localStorage.removeItem('cameraPowerPlanner_autoGearBackups');
    utils.syncAutoGearRulesFromStorage();

    global.importAllData(exported);
    utils.syncAutoGearRulesFromStorage();

    const restoredProjects = storageApi.loadProject();
    expect(restoredProjects['Project Alpha'].projectInfo.productionCompany).toBe('Alpha Films');
    expect(restoredProjects['Project Beta'].projectInfo.productionCompany).toBe('Beta Productions');
    const setupKeys = Object.keys(storageApi.loadSetups());
    expect(setupKeys).toEqual(expect.arrayContaining([autoBackupName]));

    const restoredRules = utils.getAutoGearRules();
    expect(restoredRules.some(rule => rule.label === 'Always add spare monitor')).toBe(true);
  });
});
