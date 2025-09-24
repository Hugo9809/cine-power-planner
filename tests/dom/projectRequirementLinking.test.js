const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const projectOneHtml = `
  <h2>Project One</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid">
    <div class="requirement-box" data-field="productionCompany">
      <span class="req-label">Production Company</span>
      <span class="req-value">Requirements 1</span>
    </div>
  </div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>One Item</td></tr></table>
`;

const projectTwoHtml = `
  <h2>Project Two</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid">
    <div class="requirement-box" data-field="productionCompany">
      <span class="req-label">Production Company</span>
      <span class="req-value">Requirements 2</span>
    </div>
  </div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>Two Item</td></tr></table>
`;

describe('project requirement association', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  test('keeps requirement payloads bound to their original projects', () => {
    const loadProjectMock = jest.fn((name) => {
      if (name === 'Project One') {
        return {
          gearList: projectOneHtml,
          projectInfo: { productionCompany: 'Requirements 1' }
        };
      }
      if (name === 'Project Two') {
        return {
          gearList: projectTwoHtml,
          projectInfo: { productionCompany: 'Requirements 2' }
        };
      }
      return null;
    });

    const saveProjectMock = jest.fn();

    env = setupScriptEnvironment({
      globals: {
        loadSetups: jest.fn(() => ({
          'Project One': { gearList: projectOneHtml, projectInfo: { productionCompany: 'Requirements 1' } },
          'Project Two': { gearList: projectTwoHtml, projectInfo: { productionCompany: 'Requirements 2' } },
        })),
        saveSetups: jest.fn(),
        loadProject: loadProjectMock,
        saveProject: saveProjectMock,
        saveSessionState: jest.fn(),
      },
    });

    const setupSelect = document.getElementById('setupSelect');
    const requirementsOutput = document.getElementById('projectRequirementsOutput');

    expect(setupSelect).not.toBeNull();
    expect(requirementsOutput).not.toBeNull();

    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    expect(requirementsOutput.textContent).toContain('Requirements 1');
    expect(requirementsOutput.textContent).not.toContain('Requirements 2');

    saveProjectMock.mockClear();

    setupSelect.value = 'Project Two';
    setupSelect.dispatchEvent(new Event('change'));

    expect(requirementsOutput.textContent).toContain('Requirements 2');
    expect(requirementsOutput.textContent).not.toContain('Requirements 1');

    const savedProjectOneCalls = saveProjectMock.mock.calls.filter(([name]) => name === 'Project One');
    expect(savedProjectOneCalls.length).toBeGreaterThan(0);
    savedProjectOneCalls.forEach(([name, payload]) => {
      expect(payload?.projectInfo?.productionCompany).toBe('Requirements 1');
      expect(payload?.gearList || '').not.toContain('Requirements 2');
    });

    saveProjectMock.mockClear();

    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    expect(requirementsOutput.textContent).toContain('Requirements 1');
    expect(requirementsOutput.textContent).not.toContain('Requirements 2');
  });

  test('avoids persisting empty projects when switching setups', () => {
    const loadProjectMock = jest.fn((name) => {
      if (name === 'Project Two') {
        return {
          gearList: projectTwoHtml,
          projectInfo: { productionCompany: 'Requirements 2' }
        };
      }
      return null;
    });

    const saveProjectMock = jest.fn();

    env = setupScriptEnvironment({
      globals: {
        loadSetups: jest.fn(() => ({
          'Empty Project': {},
          'Project Two': { gearList: projectTwoHtml, projectInfo: { productionCompany: 'Requirements 2' } },
        })),
        saveSetups: jest.fn(),
        loadProject: loadProjectMock,
        saveProject: saveProjectMock,
        saveSessionState: jest.fn(),
      },
    });

    const setupSelect = document.getElementById('setupSelect');
    const requirementsOutput = document.getElementById('projectRequirementsOutput');

    expect(setupSelect).not.toBeNull();
    expect(requirementsOutput).not.toBeNull();

    setupSelect.value = 'Empty Project';
    setupSelect.dispatchEvent(new Event('change'));

    expect(requirementsOutput.textContent).not.toContain('Requirements 1');
    expect(requirementsOutput.textContent).not.toContain('Requirements 2');

    saveProjectMock.mockClear();

    setupSelect.value = 'Project Two';
    setupSelect.dispatchEvent(new Event('change'));

    expect(requirementsOutput.textContent).toContain('Requirements 2');

    const emptyProjectCalls = saveProjectMock.mock.calls.filter(([name]) => name === 'Empty Project');
    emptyProjectCalls.forEach(([, payload]) => {
      expect(payload?.gearList).toBe('');
      if (payload?.projectInfo) {
        expect(payload.projectInfo.projectName).toBe('Empty Project');
        const infoValues = Object.values(payload.projectInfo || {});
        expect(infoValues).not.toContain('Requirements 1');
        expect(infoValues).not.toContain('Requirements 2');
      }
    });
  });
});

