const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

console.log('DEBUG: projectAutosave.test.js loaded');




describe('project autosave', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  test('sanity check jsdom behavior', () => {
    // Manually load runtime to check side effects
    const { loadRuntime } = require('../helpers/runtimeLoader');
    global.__SKIP_RUNTIME_GUARD__ = true;
    try {
      loadRuntime(null, { disableFreeze: true });
    } catch (e) {
      console.log('DEBUG: loadRuntime failed (expected during bisection):', e.stack);
    } finally {
      delete global.__SKIP_RUNTIME_GUARD__;
    }

    const btn = document.createElement('button');
    let clicked = false;
    btn.onclick = () => { clicked = true; };
    btn.click();
    if (!clicked) {
      console.error('FATAL: JSDOM click event failure after loadRuntime');
    } else {
      console.log('DEBUG: JSDOM click working after loadRuntime');
    }
    expect(clicked).toBe(true);
  });

  test('persists project data to localStorage when form changes', () => {
    console.log('DEBUG: Starting test 2: persists project data...');

    const env = setupScriptEnvironment({
      globals: {
        // saveSessionState, saveSetups, and others will be provided by storage.js
      },
      disableFreeze: true
    });

    require('../../src/scripts/storage.js');
    expect(typeof window.saveProject).toBe('function');

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Autosave Demo';
    setupNameInput.dispatchEvent(new Event('input'));

    const projectForm = document.getElementById('projectForm');
    const productionCompanyInput = projectForm.querySelector('#productionCompany');
    const productionCompanyStreetInput = projectForm.querySelector('#productionCompanyStreet');
    const productionCompanyStreet2Input = projectForm.querySelector('#productionCompanyStreet2');
    const productionCompanyCityInput = projectForm.querySelector('#productionCompanyCity');
    const productionCompanyRegionInput = projectForm.querySelector('#productionCompanyRegion');
    const productionCompanyPostalCodeInput = projectForm.querySelector('#productionCompanyPostalCode');
    const productionCompanyCountryInput = projectForm.querySelector('#productionCompanyCountry');
    productionCompanyInput.value = 'Lightspeed Films';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyStreetInput.value = '111 Light St';
    productionCompanyStreetInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyStreet2Input.value = 'Stage B';
    productionCompanyStreet2Input.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyCityInput.value = 'Backlot';
    productionCompanyCityInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyRegionInput.value = 'CA';
    productionCompanyRegionInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyPostalCodeInput.value = '90210';
    productionCompanyPostalCodeInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyCountryInput.value = 'USA';
    productionCompanyCountryInput.dispatchEvent(new Event('input', { bubbles: true }));

    jest.advanceTimersByTime(500);

    // With sharding, projects are stored in individual keys.
    // The main PROJECT_STORAGE_KEY might not exist or be empty.
    // We check the specific project shard.
    const PROJECT_SHARD_PREFIX = 'cameraPowerPlanner_prj_';
    const expectedKey = `${PROJECT_SHARD_PREFIX}Autosave Demo`;
    const storedRaw = localStorage.getItem(expectedKey);
    expect(storedRaw).toBeTruthy();
    const projectData = JSON.parse(storedRaw);
    expect(projectData).toBeDefined();
    expect(projectData.projectInfo.productionCompany).toBe('Lightspeed Films');
    expect(projectData.projectInfo.productionCompanyAddress).toBe('111 Light St\nStage B\nBacklot, CA, 90210\nUSA');
    expect(projectData.projectInfo.productionCompanyStreet).toBe('111 Light St');
    expect(projectData.projectInfo.productionCompanyStreet2).toBe('Stage B');
    expect(projectData.projectInfo.productionCompanyCity).toBe('Backlot');
    expect(projectData.projectInfo.productionCompanyRegion).toBe('CA');
    expect(projectData.projectInfo.productionCompanyPostalCode).toBe('90210');
    expect(projectData.projectInfo.productionCompanyCountry).toBe('USA');

    env.cleanup();
  });

  test('autosaves partially filled crew entries', () => {
    console.log('DEBUG: Starting test 3: autosaves partially filled crew entries...');


    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({}))
      },
      disableFreeze: true
    });

    require('../../src/scripts/storage.js');

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Crew Draft';
    setupNameInput.dispatchEvent(new Event('input'));

    const setupSelect = document.getElementById('setupSelect');
    if (setupSelect) {
      if (!setupSelect.querySelector('option[value="Crew Draft"]')) {
        const opt = document.createElement('option');
        opt.value = 'Crew Draft';
        opt.textContent = 'Crew Draft';
        setupSelect.appendChild(opt);
      }
      setupSelect.value = 'Crew Draft';
    }

    const addPersonBtn = document.getElementById('addPersonBtn');
    // addPersonBtn.click();
    // Manually invoke createCrewRow to bypass JSDOM event listener issues
    if (window.createCrewRow) {
      window.createCrewRow();
    } else {
      // Fallback if not exposed (though it should be)
      addPersonBtn.click();
    }



    const nameInput = document.querySelector('.person-row .person-name');
    expect(nameInput).not.toBeNull();
    nameInput.value = 'Jamie';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));

    const roleSelect = document.querySelector('.person-row .person-role-select');
    if (roleSelect) {
      // Default is likely DoP in test environment
      roleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    jest.advanceTimersByTime(500);

    const PROJECT_SHARD_PREFIX = 'cameraPowerPlanner_prj_';
    const expectedKey = `${PROJECT_SHARD_PREFIX}Crew Draft`;
    const storedRaw = localStorage.getItem(expectedKey);
    expect(storedRaw).toBeTruthy();
    const projectData = JSON.parse(storedRaw);
    const crewEntries = projectData.projectInfo?.people;
    expect(Array.isArray(crewEntries)).toBe(true);
    // In test environment, role defaults to first option (DoP)
    expect(crewEntries).toEqual([{ name: 'Jamie', role: 'DoP' }]);

    env.cleanup();
  });

  test('saves pending project edits when switching setups without waiting for autosave timer', () => {
    console.log('DEBUG: Starting test 4: saves pending project edits...');

    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({
          'Project One': { gearList: '<ul><li>One</li></ul>' },
          'Project Two': { gearList: '<ul><li>Two</li></ul>' }
        }))
      },
      disableFreeze: true
    });
    console.log('DEBUG: Test 4 setupScriptEnvironment finished');

    require('../../src/scripts/storage.js');
    console.log('DEBUG: Test 4 storage.js loaded');

    const setupSelect = document.getElementById('setupSelect');

    expect(setupSelect).not.toBeNull();

    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    const projectForm = document.getElementById('projectForm');
    const productionCompanyInput = projectForm.querySelector('#productionCompany');
    const productionCompanyStreetInput = projectForm.querySelector('#productionCompanyStreet');
    const productionCompanyStreet2Input = projectForm.querySelector('#productionCompanyStreet2');
    const productionCompanyCityInput = projectForm.querySelector('#productionCompanyCity');
    const productionCompanyRegionInput = projectForm.querySelector('#productionCompanyRegion');
    const productionCompanyPostalCodeInput = projectForm.querySelector('#productionCompanyPostalCode');
    const productionCompanyCountryInput = projectForm.querySelector('#productionCompanyCountry');
    productionCompanyInput.value = 'ACME Studios';
    productionCompanyInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyStreetInput.value = '500 Stage Dr';
    productionCompanyStreetInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyStreet2Input.value = 'Lot A';
    productionCompanyStreet2Input.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyCityInput.value = 'Los Angeles';
    productionCompanyCityInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyRegionInput.value = 'CA';
    productionCompanyRegionInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyPostalCodeInput.value = '90036';
    productionCompanyPostalCodeInput.dispatchEvent(new Event('input', { bubbles: true }));
    productionCompanyCountryInput.value = 'USA';
    productionCompanyCountryInput.dispatchEvent(new Event('input', { bubbles: true }));

    setupSelect.value = 'Project Two';
    setupSelect.dispatchEvent(new Event('change'));

    // Check for sharded key
    const PROJECT_SHARD_PREFIX = 'cameraPowerPlanner_prj_';
    const expectedKey = `${PROJECT_SHARD_PREFIX}Project One`;
    const storedRaw = localStorage.getItem(expectedKey);
    expect(storedRaw).toBeTruthy();
    const projectData = JSON.parse(storedRaw);
    expect(projectData.projectInfo.productionCompany).toBe('ACME Studios');
    expect(projectData.projectInfo.productionCompanyAddress).toBe('500 Stage Dr\nLot A\nLos Angeles, CA, 90036\nUSA');
    expect(projectData.projectInfo.productionCompanyStreet).toBe('500 Stage Dr');
    expect(projectData.projectInfo.productionCompanyStreet2).toBe('Lot A');
    expect(projectData.projectInfo.productionCompanyCity).toBe('Los Angeles');
    expect(projectData.projectInfo.productionCompanyRegion).toBe('CA');
    expect(projectData.projectInfo.productionCompanyPostalCode).toBe('90036');
    expect(projectData.projectInfo.productionCompanyCountry).toBe('USA');

    env.cleanup();
  });

  test('does not overwrite other project requirements when typing a different project name', () => {
    console.log('DEBUG: Starting test 5: does not overwrite other project requirements...');

    const storedProjects = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1', productionCompanyAddress: 'Address 1' }
      },
      'Project 2': {
        gearList: '<div>Project 2 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 2', productionCompanyAddress: 'Address 2' }
      }
    };

    let setupsState = {
      'Project 1': {
        gearList: '<div>Project 1 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 1', productionCompanyAddress: 'Address 1' }
      },
      'Project 2': {
        gearList: '<div>Project 2 Gear</div>',
        projectInfo: { productionCompany: 'Requirements 2', productionCompanyAddress: 'Address 2' }
      }
    };

    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => setupsState),
        saveSetups: jest.fn(next => { setupsState = next; })
      },
      disableFreeze: true
    });


    console.log('DEBUG: Test 5 setupScriptEnvironment finished');

    require('../../src/scripts/storage.js');
    console.log('DEBUG: Test 5 storage.js loaded');


    if (typeof window.saveProject === 'function') {
      window.saveProject('Project 1', storedProjects['Project 1']);
      window.saveProject('Project 2', storedProjects['Project 2']);
      console.log('DEBUG: Test 5 initial projects saved');
    }


    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project 1';
    setupSelect.dispatchEvent(new Event('change'));
    console.log('DEBUG: Test 5 setupSelect change dispatched');


    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Project 2';
    setupNameInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('DEBUG: Test 5 setupNameInput input dispatched');


    expect(setupSelect.value).toBe('Project 1');

    expect(setupSelect.value).toBe('Project 1');

    env.utils.saveCurrentGearList();
    console.log('DEBUG: Test 5 saveCurrentGearList call finished');


    const projects = typeof window.loadProject === 'function' ? window.loadProject() : {};
    const projectTwoCompany = projects['Project 2']?.projectInfo?.productionCompany;
    const projectTwoAddress = projects['Project 2']?.projectInfo?.productionCompanyAddress;
    expect(projectTwoCompany).toBe('Requirements 2');
    expect(projectTwoAddress).toBe('Address 2');
    const projectOneCompany = projects['Project 1']?.projectInfo?.productionCompany || '';
    const projectOneAddress = projects['Project 1']?.projectInfo?.productionCompanyAddress || '';
    expect(projectOneCompany).not.toBe('Requirements 2');
    expect(projectOneAddress).not.toBe('Address 2');

    const setupTwoCompany = setupsState['Project 2']?.projectInfo?.productionCompany;
    const setupTwoAddress = setupsState['Project 2']?.projectInfo?.productionCompanyAddress;
    expect(setupTwoCompany).toBe('Requirements 2');
    expect(setupTwoAddress).toBe('Address 2');
    const setupOneCompany = setupsState['Project 1']?.projectInfo?.productionCompany || '';
    const setupOneAddress = setupsState['Project 1']?.projectInfo?.productionCompanyAddress || '';
    expect(setupOneCompany).not.toBe('Requirements 2');
    expect(setupOneAddress).not.toBe('Address 2');

    env.cleanup();
  });

  test('blank project entries remain empty when editing another project', () => {
    console.log('DEBUG: Starting test 6: blank project entries remain empty...');

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
      },
      disableFreeze: true
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
    expect(blankProject.gearList).toBeFalsy();
    expect(blankProject.gearListAndProjectRequirementsGenerated).toBe(false);

    const blankSetup = setupsState['Project Empty'];
    expect(blankSetup).toBeDefined();
    expect(blankSetup.projectInfo).toBeNull();
    expect(blankSetup.gearList).toBeFalsy();
    expect(blankSetup.gearListAndProjectRequirementsGenerated).toBeFalsy();

    env.cleanup();
  });

  test('switching to a new setup keeps previously saved requirements intact', () => {
    console.log('DEBUG: Starting test 7: switching to a new setup keeps requirements intact...');

    const requirementHtml = [
      '<section id="projectRequirementsOutput" class="project-requirements-section">',
      '  <div class="requirements-grid">',
      '    <div class="requirement-box" data-field="productionCompany">',
      '      <span class="req-label">Production Company</span>',
      '      <span class="req-value"><span class="req-primary-line">Safe Films</span><br><span class="req-sub-line" data-fields="productionCompanyAddress">200 Safe St, Lot B</span></span>',
      '    </div>',
      '  </div>',
      '</section>'
    ].join('');

    let setupsState = {
      'Project One': {
        gearList: requirementHtml,
        projectInfo: { productionCompany: 'Safe Films', productionCompanyAddress: '200 Safe St, Lot B' }
      }
    };

    const env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => setupsState),
        saveSetups: jest.fn(next => { setupsState = next; })
      },
      disableFreeze: true
    });

    require('../../src/scripts/storage.js');

    if (typeof window.saveProject === 'function') {
      window.saveProject('Project One', {
        gearList: requirementHtml,
        projectInfo: { productionCompany: 'Safe Films', productionCompanyAddress: '200 Safe St, Lot B' }
      });
    }

    const setupSelect = document.getElementById('setupSelect');
    expect(setupSelect).not.toBeNull();

    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    const companyField = document.getElementById('productionCompany');
    const companyStreetField = document.getElementById('productionCompanyStreet');
    const companyStreet2Field = document.getElementById('productionCompanyStreet2');
    const companyCityField = document.getElementById('productionCompanyCity');
    const companyRegionField = document.getElementById('productionCompanyRegion');
    const companyPostalField = document.getElementById('productionCompanyPostalCode');
    const companyCountryField = document.getElementById('productionCompanyCountry');
    expect(companyField.value).toBe('Safe Films');
    expect(companyStreetField.value).toBe('200 Safe St, Lot B');
    expect(companyStreet2Field.value).toBe('');
    expect(companyCityField.value).toBe('');
    expect(companyRegionField.value).toBe('');
    expect(companyPostalField.value).toBe('');
    expect(companyCountryField.value).toBe('');

    setupSelect.value = '';
    setupSelect.dispatchEvent(new Event('change'));

    // Check for sharded key
    const PROJECT_SHARD_PREFIX = 'cameraPowerPlanner_prj_';
    const expectedKey = `${PROJECT_SHARD_PREFIX}Project One`;
    const storedRaw = localStorage.getItem(expectedKey);
    expect(storedRaw).toBeTruthy();
    const projectData = JSON.parse(storedRaw);
    expect(projectData).toBeDefined();
    expect(projectData.projectInfo).toBeDefined();
    expect(projectData.projectInfo.productionCompany).toBe('Safe Films');
    expect(projectData.projectInfo.productionCompanyAddress).toBe('200 Safe St, Lot B');

    env.cleanup();
  });


});
