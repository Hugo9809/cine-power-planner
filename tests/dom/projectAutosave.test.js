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

  test('autosaves partially filled crew entries', () => {
    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({}))
      }
    });

    require('../../src/scripts/storage.js');

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Crew Draft';
    setupNameInput.dispatchEvent(new Event('input'));

    const addPersonBtn = document.getElementById('addPersonBtn');
    addPersonBtn.click();

    const nameInput = document.querySelector('.person-row .person-name');
    expect(nameInput).not.toBeNull();
    nameInput.value = 'Jamie';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));

    jest.advanceTimersByTime(500);

    const storedRaw = localStorage.getItem(PROJECT_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();
    const stored = JSON.parse(storedRaw);
    const crewEntries = stored['Crew Draft']?.projectInfo?.people;
    expect(Array.isArray(crewEntries)).toBe(true);
    expect(crewEntries).toEqual([{ name: 'Jamie', role: 'Producer' }]);

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

  test('does not overwrite other project requirements when typing a different project name', () => {
    const storedProjects = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1' }
      },
      'Project 2': {
        gearList: '<div>Project 2 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 2' }
      }
    };

    let setupsState = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1' }
      },
      'Project 2': {
        gearList: '<div>Project 2 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 2' }
      }
    };

    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => setupsState),
        saveSetups: jest.fn(next => { setupsState = next; })
      }
    });

    require('../../src/scripts/storage.js');

    if (typeof window.saveProject === 'function') {
      window.saveProject('Project 1', storedProjects['Project 1']);
      window.saveProject('Project 2', storedProjects['Project 2']);
    }

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project 1';
    setupSelect.dispatchEvent(new Event('change'));

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Project 2';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

    expect(setupSelect.value).toBe('Project 1');

    env.utils.saveCurrentGearList();

    const projects = typeof window.loadProject === 'function' ? window.loadProject() : {};
    const projectTwoCompany = projects['Project 2']?.projectInfo?.productionCompany;
    expect(projectTwoCompany).toBe('Requirements 2');
    const projectOneCompany = projects['Project 1']?.projectInfo?.productionCompany || '';
    expect(projectOneCompany).not.toBe('Requirements 2');

    const setupTwoCompany = setupsState['Project 2']?.projectInfo?.productionCompany;
    expect(setupTwoCompany).toBe('Requirements 2');
    const setupOneCompany = setupsState['Project 1']?.projectInfo?.productionCompany || '';
    expect(setupOneCompany).not.toBe('Requirements 2');

    env.cleanup();
  });

  test('blank project entries remain empty when editing another project', () => {
    const storedProjects = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1' }
      },
      'Project Empty': {
        gearList: '',
        projectInfo: null
      }
    };

    let setupsState = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1' }
      },
      'Project Empty': {
        gearList: '',
        projectInfo: null
      }
    };

    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => setupsState),
        saveSetups: jest.fn(next => { setupsState = next; })
      }
    });

    require('../../src/scripts/storage.js');

    if (typeof window.saveProject === 'function') {
      window.saveProject('Project 1', storedProjects['Project 1']);
      window.saveProject('Project Empty', storedProjects['Project Empty']);
    }

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project 1';
    setupSelect.dispatchEvent(new Event('change'));

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Project Empty';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));

    env.utils.saveCurrentGearList();

    const blankProject = typeof window.loadProject === 'function'
      ? window.loadProject('Project Empty')
      : null;
    expect(blankProject).toBeDefined();
    expect(blankProject.projectInfo).toBeNull();
    expect(blankProject.gearList).toBe('');

    const blankSetup = setupsState['Project Empty'];
    expect(blankSetup).toBeDefined();
    expect(blankSetup.projectInfo).toBeNull();
    expect(blankSetup.gearList).toBe('');

    env.cleanup();
  });
});
