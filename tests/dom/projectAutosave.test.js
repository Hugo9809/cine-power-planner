const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const PROJECT_STORAGE_KEY = 'cameraPowerPlanner_project';

describe('project autosave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  test('persists project data to localStorage when form changes', () => {
    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({}))
      }
    });

    require('../../src/scripts/storage.js');
    expect(typeof window.saveProject).toBe('function');

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Autosave Demo';
    setupNameInput.dispatchEvent(new Event('input'));

    const projectForm = document.getElementById('projectForm');
    const productionCompanyInput = projectForm.querySelector('#productionCompany');
    productionCompanyInput.value = 'Lightspeed Films';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));

    jest.advanceTimersByTime(500);

    const storedRaw = localStorage.getItem(PROJECT_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();
    const stored = JSON.parse(storedRaw);
    expect(stored['Autosave Demo']).toBeDefined();
    expect(stored['Autosave Demo'].projectInfo.productionCompany).toBe('Lightspeed Films');

    env.cleanup();
  });

  test('saves pending project edits when switching setups without waiting for autosave timer', () => {
    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({
          'Project One': { gearList: '<ul><li>One</li></ul>' },
          'Project Two': { gearList: '<ul><li>Two</li></ul>' }
        }))
      }
    });

    require('../../src/scripts/storage.js');

    const setupSelect = document.getElementById('setupSelect');
    expect(setupSelect).not.toBeNull();

    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    const projectForm = document.getElementById('projectForm');
    const productionCompanyInput = projectForm.querySelector('#productionCompany');
    productionCompanyInput.value = 'ACME Studios';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));

    setupSelect.value = 'Project Two';
    setupSelect.dispatchEvent(new Event('change'));

    const storedRaw = localStorage.getItem(PROJECT_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();
    const stored = JSON.parse(storedRaw);
    expect(stored['Project One']).toBeDefined();
    expect(stored['Project One'].projectInfo.productionCompany).toBe('ACME Studios');

    env.cleanup();
  });
});
