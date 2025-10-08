const { performance: nodePerformance } = require('perf_hooks');

const performanceApi = globalThis.performance ?? nodePerformance;

const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const baseDevices = require('../../src/data/devices/index.js');

const cloneDevices = () => JSON.parse(JSON.stringify(baseDevices));

function pickFirstRealOption(select) {
  expect(select).not.toBeNull();
  const option = Array.from(select.options).find((opt) => opt && opt.value && opt.value !== 'None');
  expect(option).toBeDefined();
  select.value = option.value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
  return option.textContent.trim();
}

describe('full user experience speed test', () => {
  let env;
  let restoreStorageWrappers = [];

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    restoreStorageWrappers = [];
  });

  afterEach(() => {
    restoreStorageWrappers.forEach((restore) => {
      try {
        if (typeof restore === 'function') {
          restore();
        }
      } catch (error) {
        void error;
      }
    });
    restoreStorageWrappers = [];

    env?.cleanup();
    env = null;

    localStorage.clear();
    sessionStorage.clear();
    jest.resetModules();
  });

  test('measures timings for creating a project with custom additions', () => {
    env = setupScriptEnvironment({
      devices: cloneDevices(),
      disableFreeze: true,
      globals: {
        showNotification: jest.fn(),
        buildDefaultVideoDistributionAutoGearRules: () => [],
        buildDefaultMatteboxAutoGearRules: () => [],
        buildVideoDistributionAutoRules: () => [],
      },
    });

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
      'loadSessionState',
      'saveSessionState',
      'loadProject',
      'saveProject',
      'deleteProject',
      'exportAllData',
      'importAllData',
      'clearAllData',
    ];
    stubbedStorageFns.forEach((name) => {
      if (Object.prototype.hasOwnProperty.call(global, name)) {
        delete global[name];
      }
    });

    const storageApi = require('../../src/scripts/storage.js');
    const { utils } = env;

    const wrapStorage = (target, name) => {
      const original = target && target[name];
      if (typeof original !== 'function') {
        return;
      }
      target[name] = (...args) => {
        const start = performanceApi.now();
        try {
          return original.apply(target, args);
        } finally {
          const durationMs = performanceApi.now() - start;
          storageTimings.push({ action: name, durationMs });
        }
      };
      restoreStorageWrappers.push(() => {
        target[name] = original;
      });
    };

    const timings = [];
    const storageTimings = [];
    const measure = (label, fn) => {
      const start = performanceApi.now();
      const result = fn();
      const durationMs = performanceApi.now() - start;
      timings.push({ label, durationMs });
      return result;
    };

    wrapStorage(global, 'saveProject');
    wrapStorage(global, 'saveSetups');
    wrapStorage(global, 'saveSessionState');

    const setupNameInput = document.getElementById('setupName');
    const productionCompanyInput = document.getElementById('productionCompany');
    const gearListOutput = document.getElementById('gearListOutput');
    const projectRequirementsOutput = document.getElementById('projectRequirementsOutput');

    expect(setupNameInput).not.toBeNull();
    expect(productionCompanyInput).not.toBeNull();
    expect(gearListOutput).not.toBeNull();
    expect(projectRequirementsOutput).not.toBeNull();

    measure('set project name', () => {
      setupNameInput.value = 'Speed Test';
      setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    measure('set production company', () => {
      productionCompanyInput.value = 'Velocity Media';
      productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const cameraLabel = measure('select camera', () => pickFirstRealOption(document.getElementById('cameraSelect')));
    measure('select monitor', () => pickFirstRealOption(document.getElementById('monitorSelect')));
    measure('select video', () => pickFirstRealOption(document.getElementById('videoSelect')));
    measure('select battery', () => pickFirstRealOption(document.getElementById('batterySelect')));

    measure('update calculations', () => {
      utils.updateCalculations?.();
    });

    const projectSnapshot = measure('collect project form data', () => utils.collectProjectFormData());
    expect(projectSnapshot).toBeTruthy();

    const gearListHtml = measure('generate gear list', () => utils.generateGearListHtml(projectSnapshot));
    expect(typeof gearListHtml).toBe('string');
    expect(gearListHtml).toContain('Gear List');

    measure('display gear list', () => {
      utils.displayGearAndRequirements(gearListHtml);
    });

    expect(gearListOutput.classList.contains('hidden')).toBe(false);
    expect(gearListOutput.textContent).toContain(cameraLabel);

    const addButton = gearListOutput.querySelector('[data-gear-custom-add]');
    expect(addButton).not.toBeNull();

    measure('add custom gear entry', () => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const customEntry = gearListOutput.querySelector('.gear-custom-item');
    expect(customEntry).not.toBeNull();

    const quantityInput = customEntry.querySelector('[data-gear-custom-input="quantity"]');
    const nameInput = customEntry.querySelector('[data-gear-custom-input="name"]');
    expect(quantityInput).not.toBeNull();
    expect(nameInput).not.toBeNull();

    measure('set custom quantity', () => {
      quantityInput.value = '2';
      quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
      quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    measure('set custom name', () => {
      nameInput.value = 'Spare Batteries';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      nameInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const preview = customEntry.querySelector('.gear-custom-item-preview');
    expect(preview.textContent).toContain('2x Spare Batteries');

    const inlineSelector = gearListOutput.querySelector('select');
    if (inlineSelector) {
      const initialValue = inlineSelector.value;
      const alternateOption = Array.from(inlineSelector.options).find((opt) => opt.value && opt.value !== initialValue);
      if (alternateOption) {
        measure('adjust inline gear selector', () => {
          inlineSelector.value = alternateOption.value;
          inlineSelector.dispatchEvent(new Event('change', { bubbles: true }));
        });
      }
    }

    const customSelectors = utils.getGearListSelectors();
    expect(customSelectors).toBeTruthy();
    expect(customSelectors.__customItems).toBeDefined();
    const customGroups = customSelectors.__customItems;
    const customGroupKeys = Object.keys(customGroups);
    expect(customGroupKeys.length).toBeGreaterThan(0);
    const firstCustomGroup = customGroups[customGroupKeys[0]];
    expect(Array.isArray(firstCustomGroup)).toBe(true);
    expect(firstCustomGroup[0]).toEqual({ quantity: '2', name: 'Spare Batteries' });

    measure('save current gear list', () => {
      utils.saveCurrentGearList();
    });

    const storedProject = storageApi.loadProject('Speed Test');
    expect(storedProject).toBeTruthy();
    expect(storedProject.projectInfo).toBeDefined();
    expect(storedProject.projectInfo.productionCompany).toBe('Velocity Media');
    expect(storedProject.gearListAndProjectRequirementsGenerated).toBe(true);

    measure('trigger auto backup', () => {
      const backupName = utils.autoBackup({
        suppressSuccess: true,
        suppressError: true,
        reason: 'speed-test',
      });
      expect(typeof backupName).toBe('string');
      expect(backupName).toMatch(/^auto-backup-/);
      return backupName;
    });

    measure('create settings backup', () => {
      const backupFileName = utils.createSettingsBackup(false, new Date('2024-06-01T10:00:00Z'));
      expect(typeof backupFileName).toBe('string');
      expect(backupFileName).toContain('full app backup.json');
      return backupFileName;
    });

    expect(projectRequirementsOutput.classList.contains('hidden')).toBe(false);
    expect(projectRequirementsOutput.textContent).toContain('Velocity Media');

    expect(timings.length).toBeGreaterThan(0);
    timings.forEach(({ label, durationMs }) => {
      expect(typeof label).toBe('string');
      expect(Number.isFinite(durationMs)).toBe(true);
      expect(durationMs).toBeGreaterThanOrEqual(0);
    });

    expect(storageTimings.length).toBeGreaterThan(0);
    storageTimings.forEach(({ action, durationMs }) => {
      expect(typeof action).toBe('string');
      expect(Number.isFinite(durationMs)).toBe(true);
      expect(durationMs).toBeGreaterThanOrEqual(0);
    });

    const totalDuration = timings.reduce((sum, step) => sum + step.durationMs, 0);
    expect(totalDuration).toBeGreaterThan(0);

    const summary = {
      totalDuration,
      steps: timings,
      storage: storageTimings,
    };

    localStorage.setItem('cameraPowerPlanner_speedTestMetrics', JSON.stringify(summary));

    const storedSummaryRaw = localStorage.getItem('cameraPowerPlanner_speedTestMetrics');
    expect(storedSummaryRaw).toBeTruthy();
    const storedSummary = JSON.parse(storedSummaryRaw);
    expect(storedSummary.totalDuration).toBeGreaterThan(0);
    expect(Array.isArray(storedSummary.steps)).toBe(true);
    expect(Array.isArray(storedSummary.storage)).toBe(true);
  });
});
