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
});
