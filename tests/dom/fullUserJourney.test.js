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
      revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { });
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

    global.BroadcastChannel = class MockBroadcastChannel {
      constructor(name) {
        this.name = name;
        this.onmessage = null;
        this.onmessageerror = null;
      }
      postMessage() { }
      close() { }
      addEventListener() { }
      removeEventListener() { }
      dispatchEvent() { return true; }
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

    delete global.BroadcastChannel;
    localStorage.clear();
    sessionStorage.clear();
  });

  test('preserves planner data across a full workflow', () => {
    const storageApi = require('../../src/scripts/storage.js');

    env = setupScriptEnvironment({
      devices: cloneDevices(),
      globals: {
        ...storageApi,
        showNotification: jest.fn(),
      },
    });

    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();

    const { utils } = env;

    // Create elements needed for the test
    const setupNameInput = document.getElementById('setupName');
    const setupSelect = document.getElementById('setupSelect');
    const productionCompanyInput = document.getElementById('productionCompany');
    const productionCompanyStreetInput = document.getElementById('productionCompanyStreet');
    const productionCompanyStreet2Input = document.getElementById('productionCompanyStreet2');
    const productionCompanyCityInput = document.getElementById('productionCompanyCity');
    const productionCompanyRegionInput = document.getElementById('productionCompanyRegion');
    const productionCompanyPostalCodeInput = document.getElementById('productionCompanyPostalCode');
    const productionCompanyCountryInput = document.getElementById('productionCompanyCountry');
    const gearListOutput = document.getElementById('gearListOutput');
    const projectRequirementsOutput = document.getElementById('projectRequirementsOutput');

    expect(setupNameInput).not.toBeNull();
    expect(setupSelect).not.toBeNull();
    expect(productionCompanyInput).not.toBeNull();
    expect(productionCompanyStreetInput).not.toBeNull();
    expect(productionCompanyStreet2Input).not.toBeNull();
    expect(productionCompanyCityInput).not.toBeNull();
    expect(productionCompanyRegionInput).not.toBeNull();
    expect(productionCompanyPostalCodeInput).not.toBeNull();
    expect(productionCompanyCountryInput).not.toBeNull();
    expect(gearListOutput).not.toBeNull();
    expect(projectRequirementsOutput).not.toBeNull();

    setupNameInput.value = 'Project Alpha';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

    productionCompanyInput.value = 'Alpha Films';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    const setProductionCompanyAddress = ({ street, street2 = '', city = '', region = '', postalCode = '', country = '' }) => {
      productionCompanyStreetInput.value = street;
      productionCompanyStreetInput.dispatchEvent(new Event('input', { bubbles: true }));
      productionCompanyStreet2Input.value = street2;
      productionCompanyStreet2Input.dispatchEvent(new Event('input', { bubbles: true }));
      productionCompanyCityInput.value = city;
      productionCompanyCityInput.dispatchEvent(new Event('input', { bubbles: true }));
      productionCompanyRegionInput.value = region;
      productionCompanyRegionInput.dispatchEvent(new Event('input', { bubbles: true }));
      productionCompanyPostalCodeInput.value = postalCode;
      productionCompanyPostalCodeInput.dispatchEvent(new Event('input', { bubbles: true }));
      productionCompanyCountryInput.value = country;
      productionCompanyCountryInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    setProductionCompanyAddress({
      street: '123 Alpha Ave',
      city: 'Stage City',
      region: 'CA',
      postalCode: '90001',
      country: 'USA',
    });

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
    expect(projectRequirementsOutput.textContent).toContain('123 Alpha Ave');
    expect(projectRequirementsOutput.textContent).toContain('Stage City');

    syncSetupOptions();
    // await utils.saveCurrentGearList(); // Already called?

    const projectsAfterAlpha = storageApi.loadProject();
    expect(projectsAfterAlpha).toBeTruthy();
    expect(projectsAfterAlpha['Project Alpha']).toBeDefined();
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompany).toBe('Alpha Films');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyAddress).toBe('123 Alpha Ave\nStage City, CA, 90001\nUSA');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyStreet).toBe('123 Alpha Ave');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyStreet2 || '').toBe('');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyCity).toBe('Stage City');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyRegion).toBe('CA');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyPostalCode).toBe('90001');
    expect(projectsAfterAlpha['Project Alpha'].projectInfo.productionCompanyCountry).toBe('USA');
    expect(projectsAfterAlpha['Project Alpha'].gearList || '').toBe('');
    expect(projectsAfterAlpha['Project Alpha'].gearListAndProjectRequirementsGenerated).toBe(true);

    setupNameInput.value = 'Project Beta';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyInput.value = 'Beta Productions';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    setProductionCompanyAddress({
      street: '400 Beta Blvd',
      city: 'Film Town',
      region: 'NY',
      postalCode: '10002',
      country: 'USA',
    });
    setupSelect.value = '';
    setupSelect.dispatchEvent(new Event('change'));

    const betaSnapshot = utils.collectProjectFormData();
    const betaGearHtml = utils.generateGearListHtml(betaSnapshot);
    utils.displayGearAndRequirements(betaGearHtml);
    utils.populateProjectForm(betaSnapshot);
    utils.saveCurrentGearList();
    syncSetupOptions();
    setupSelect.value = 'Project Beta';

    const projectsAfterBeta = storageApi.loadProject();
    expect(projectsAfterBeta['Project Beta']).toBeDefined();
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompany).toBe('Beta Productions');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyAddress).toBe('400 Beta Blvd\nFilm Town, NY, 10002\nUSA');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyStreet).toBe('400 Beta Blvd');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyStreet2 || '').toBe('');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyCity).toBe('Film Town');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyRegion).toBe('NY');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyPostalCode).toBe('10002');
    expect(projectsAfterBeta['Project Beta'].projectInfo.productionCompanyCountry).toBe('USA');

    const storedBetaProject = storageApi.loadProject('Project Beta');
    expect(storedBetaProject).toBeTruthy();
    utils.populateProjectForm(storedBetaProject.projectInfo);
    expect(productionCompanyInput.value).toBe('Beta Productions');
    expect(productionCompanyStreetInput.value).toBe('400 Beta Blvd');
    expect(productionCompanyCityInput.value).toBe('Film Town');
    expect(productionCompanyRegionInput.value).toBe('NY');
    expect(productionCompanyPostalCodeInput.value).toBe('10002');
    expect(productionCompanyCountryInput.value).toBe('USA');

    const projectKeys = Object.keys(storageApi.loadProject());
    expect(projectKeys).toEqual(expect.arrayContaining(['Project Alpha', 'Project Beta']));

    const restoredAlphaProject = storageApi.loadProject('Project Alpha');
    expect(restoredAlphaProject).toBeTruthy();
    expect(restoredAlphaProject.projectInfo.productionCompany).toBe('Alpha Films');
    expect(restoredAlphaProject.projectInfo.productionCompanyAddress).toBe('123 Alpha Ave\nStage City, CA, 90001\nUSA');
    expect(restoredAlphaProject.gearList).toContain(cameraLabel);

    setupSelect.value = 'Project Alpha';
    setupSelect.dispatchEvent(new Event('change'));

    utils.displayGearAndRequirements(restoredAlphaProject.gearList);
    utils.populateProjectForm(restoredAlphaProject.projectInfo);

    expect(productionCompanyInput.value).toBe('Alpha Films');
    expect(productionCompanyStreetInput.value).toBe('123 Alpha Ave');
    expect(productionCompanyCityInput.value).toBe('Stage City');
    expect(productionCompanyRegionInput.value).toBe('CA');
    expect(productionCompanyPostalCodeInput.value).toBe('90001');
    expect(productionCompanyCountryInput.value).toBe('USA');
    expect(projectRequirementsOutput.textContent).toContain('Alpha Films');
    expect(gearListOutput.textContent).toContain(cameraLabel);

    const autoBackupName = utils.autoBackup({
      suppressSuccess: true,
      suppressError: true,
      reason: 'interval',
      force: true,
    });
    expect(typeof autoBackupName).toBe('string');
    expect(autoBackupName.startsWith('auto-backup-')).toBe(true);

    const setupsData = storageApi.loadSetups();
    expect(setupsData[autoBackupName]).toBeDefined();
    expect(setupsData[autoBackupName].gearList).toBeUndefined();
    expect(setupsData[autoBackupName].gearListAndProjectRequirementsGenerated).toBe(true);

    const projectsAfterAutoBackup = storageApi.loadProject();
    expect(projectsAfterAutoBackup[autoBackupName]).toBeDefined();

    const autoBackupProject = projectsAfterAutoBackup[autoBackupName];
    expect(autoBackupProject.gearList).toBeDefined();
    expect(autoBackupProject.gearList).toContain(cameraLabel);
    expect(autoBackupProject.gearListAndProjectRequirementsGenerated).toBe(true);
    expect(autoBackupProject.projectInfo).toBeTruthy();
    expect(autoBackupProject.projectInfo.productionCompany).toBe('Alpha Films');
    expect(autoBackupProject.projectInfo.productionCompanyAddress).toBe('123 Alpha Ave\nStage City, CA, 90001\nUSA');

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
    expect(exported.project['Project Alpha'].projectInfo.productionCompanyAddress).toBe('123 Alpha Ave\nStage City, CA, 90001\nUSA');
    expect(exported.project['Project Alpha'].gearList || '').toBe('');
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
    expect(restoredProjects['Project Alpha'].projectInfo.productionCompanyAddress).toBe('123 Alpha Ave\nStage City, CA, 90001\nUSA');
    expect(restoredProjects['Project Beta'].projectInfo.productionCompany).toBe('Beta Productions');
    expect(restoredProjects['Project Beta'].projectInfo.productionCompanyAddress).toBe('400 Beta Blvd\nFilm Town, NY, 10002\nUSA');
    const setupKeys = Object.keys(storageApi.loadSetups());
    expect(setupKeys).toEqual(expect.arrayContaining([autoBackupName]));

    const restoredRules = utils.getAutoGearRules();
    expect(restoredRules.some(rule => rule.label === 'Always add spare monitor')).toBe(true);
  });
});
