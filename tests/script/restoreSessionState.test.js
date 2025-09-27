const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const savedGearHtml = `
  <h2>Project One</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid">
    <div class="requirement-box" data-field="codec">
      <span class="req-label">Codec</span>
      <span class="req-value">ProRes</span>
    </div>
  </div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>Saved Item</td></tr></table>
`;

describe('restoreSessionState', () => {
  test('keeps a saved gear list visible after reload', () => {
    const saveProjectMock = jest.fn();
    const saveSessionStateMock = jest.fn();

    const initialEnv = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: jest.fn(() => null),
        loadProject: jest.fn(() => null),
        saveProject: saveProjectMock,
        saveSessionState: saveSessionStateMock,
        deleteProject: jest.fn()
      }
    });

    const { utils: initialUtils } = initialEnv;
    saveProjectMock.mockClear();
    saveSessionStateMock.mockClear();

    initialUtils.displayGearAndRequirements(savedGearHtml);

    const setupNameInput = document.getElementById('setupName');
    setupNameInput.value = 'Project One';
    const setupSelect = document.getElementById('setupSelect');
    if (setupSelect && !Array.from(setupSelect.options).some(opt => opt.value === 'Project One')) {
      const option = document.createElement('option');
      option.value = 'Project One';
      option.textContent = 'Project One';
      setupSelect.appendChild(option);
    }
    if (setupSelect) {
      setupSelect.value = 'Project One';
    }

    initialUtils.saveCurrentSession();

    expect(saveProjectMock).toHaveBeenCalled();
    expect(saveSessionStateMock).toHaveBeenCalled();

    const [savedName, savedPayload] = saveProjectMock.mock.calls[saveProjectMock.mock.calls.length - 1];
    expect(savedPayload.gearList).toContain('Saved Item');
    const savedSessionState = saveSessionStateMock.mock.calls[saveSessionStateMock.mock.calls.length - 1][0];
    expect(savedSessionState.autoGearHighlight).toBe(false);

    initialEnv.cleanup();

    const loadProjectMock = jest.fn(name => (name === savedName ? savedPayload : null));

    const reloadEnv = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: jest.fn(() => savedSessionState),
        loadProject: loadProjectMock,
        saveProject: jest.fn(),
        deleteProject: jest.fn()
      }
    });

    const gearListOutput = document.getElementById('gearListOutput');
    expect(loadProjectMock).toHaveBeenCalledWith(savedName);
    expect(gearListOutput.classList.contains('hidden')).toBe(false);
    expect(gearListOutput.textContent).toContain('Saved Item');

    reloadEnv.cleanup();
  });

  test('restores gear list using previous setup selection when rename not saved', () => {
    const savedGearHtml = `
      <h2>Project One</h2>
      <h3>Gear List</h3>
      <table class="gear-table"><tr><td>Saved Item</td></tr></table>
    `;

    const savedPayload = {
      gearList: savedGearHtml,
      projectInfo: { projectName: 'Project One' }
    };

    const saveProjectMock = jest.fn();
    const saveSessionStateMock = jest.fn();
    const loadProjectMock = jest.fn(name => {
      if (name === 'Project Two') return null;
      if (name === 'Project One') return savedPayload;
      return null;
    });

    const env = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: jest.fn(() => ({
          setupName: 'Project Two',
          setupSelect: 'Project One'
        })),
        loadProject: loadProjectMock,
        saveProject: saveProjectMock,
        saveSessionState: saveSessionStateMock,
        deleteProject: jest.fn()
      }
    });

    const gearListOutput = document.getElementById('gearListOutput');

    expect(loadProjectMock).toHaveBeenCalledWith('Project Two');
    expect(loadProjectMock).toHaveBeenCalledWith('Project One');
    expect(gearListOutput.classList.contains('hidden')).toBe(false);
    expect(gearListOutput.textContent).toContain('Saved Item');

    const savedNames = saveProjectMock.mock.calls.map(([name]) => name);
    expect(savedNames).toContain('Project Two');

    env.cleanup();
  });

  test('restores automatic gear highlight preference from session state', () => {
    const highlightGearHtml = `
      <h2>Highlight Project</h2>
      <h3>Gear List</h3>
      <table class="gear-table">
        <tbody>
          <tr>
            <td>
              <span
                class="gear-item auto-gear-item"
                data-auto-gear-rule-id="sample-rule"
                data-auto-gear-rule-label="Sample Rule"
              >1x Sample Item</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const savedPayload = { gearList: highlightGearHtml };
    const loadProjectMock = jest.fn(name => (name === 'Highlight Project' ? savedPayload : null));

    const env = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: jest.fn(() => ({
          setupName: 'Highlight Project',
          setupSelect: 'Highlight Project',
          autoGearHighlight: true
        })),
        loadProject: loadProjectMock,
        saveProject: jest.fn(),
        deleteProject: jest.fn()
      }
    });

    expect(loadProjectMock).toHaveBeenCalledWith('Highlight Project');

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(true);
    const toggle = document.getElementById('autoGearHighlightToggle');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(toggle.classList.contains('is-active')).toBe(true);

    env.cleanup();
  });

  test('preserves project requirements when autosaving immediately after restore', () => {
    const savedGearHtml = `
      <h2>Project One</h2>
      <h3>Project Requirements</h3>
      <div class="requirements-grid">
        <div class="requirement-box" data-field="productionCompany">
          <span class="req-label">Production Company</span>
          <span class="req-value">Acme Studios</span>
        </div>
      </div>
      <h3>Gear List</h3>
      <table class="gear-table"><tr><td>Saved Item</td></tr></table>
    `;

    const projectInfo = { productionCompany: 'Acme Studios' };
    const saveProjectMock = jest.fn();
    const saveSessionStateMock = jest.fn();
    const loadProjectMock = jest.fn(() => ({ gearList: savedGearHtml, projectInfo }));

    const env = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: jest.fn(() => ({
          setupName: 'Project One',
          setupSelect: 'Project One',
          projectInfo,
        })),
        loadProject: loadProjectMock,
        saveProject: saveProjectMock,
        saveSessionState: saveSessionStateMock,
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({})),
      }
    });

    expect(loadProjectMock).toHaveBeenCalledWith('Project One');

    const savedStateCall = saveSessionStateMock.mock.calls[saveSessionStateMock.mock.calls.length - 1];
    expect(savedStateCall).toBeDefined();
    expect(savedStateCall[0].projectInfo).toEqual(expect.objectContaining(projectInfo));

    const savedProjectCall = saveProjectMock.mock.calls[saveProjectMock.mock.calls.length - 1];
    expect(savedProjectCall).toBeDefined();
    expect(savedProjectCall[0]).toBe('Project One');
    expect(savedProjectCall[1].projectInfo).toEqual(expect.objectContaining(projectInfo));

    env.cleanup();
  });

  test('restores B-Mount battery selections from session state even without an explicit plate', () => {
    const sessionState = {
      setupName: 'B-Mount Setup',
      setupSelect: 'B-Mount Setup',
      camera: 'ARRI Alexa 35',
      monitor: '',
      video: '',
      cage: '',
      distance: '',
      motors: [],
      controllers: [],
      batteryPlate: '',
      battery: 'Bebob B155cine (B-Mount)',
      batteryHotswap: 'SWIT KA-B30B B-mount to B-mount Hot-Swap Plate',
      sliderBowl: '',
      easyrig: '',
      projectInfo: {}
    };

    const devices = {
      cameras: {
        'ARRI Alexa 35': {
          power: {
            batteryPlateSupport: [
              { type: 'B-Mount', mount: 'native' },
              { type: 'V-Mount', mount: 'adapted' }
            ],
            input: []
          },
          videoOutputs: [],
          viewfinder: [],
          recordingMedia: [],
          lensMount: []
        }
      },
      batteries: {
        'Bebob B155cine (B-Mount)': { mount_type: 'B-Mount', pinA: 20 },
        'Bebob V155cine (V-Mount)': { mount_type: 'V-Mount', pinA: 12 }
      },
      batteryHotswaps: {
        'SWIT KA-B30B B-mount to B-mount Hot-Swap Plate': { mount_type: 'B-Mount', pinA: 7.14 }
      }
    };

    const loadSessionStateMock = jest.fn(() => sessionState);

    const env = setupScriptEnvironment({
      readyState: 'complete',
      devices,
      globals: {
        loadSessionState: loadSessionStateMock,
        loadProject: jest.fn(() => null),
        saveProject: jest.fn(),
        saveSessionState: jest.fn(),
        deleteProject: jest.fn()
      }
    });

    const batterySelect = document.getElementById('batterySelect');
    const batteryPlateSelect = document.getElementById('batteryPlateSelect');

    expect(loadSessionStateMock).toHaveBeenCalled();
    expect(batterySelect.value).toBe('Bebob B155cine (B-Mount)');
    expect(batteryPlateSelect.value).toBe('B-Mount');

    env.cleanup();
  });

  test('restores partially completed crew entries to the project form', () => {
    const partialInfo = { people: [{ name: 'Jamie', phone: '555-1212' }] };
    const loadSessionStateMock = jest.fn(() => ({
      setupName: 'Crew Notes',
      projectInfo: partialInfo
    }));
    const loadProjectMock = jest.fn(() => ({ gearList: '', projectInfo: partialInfo }));

    const env = setupScriptEnvironment({
      readyState: 'complete',
      globals: {
        loadSessionState: loadSessionStateMock,
        loadProject: loadProjectMock,
        saveProject: jest.fn(),
        saveSessionState: jest.fn(),
        deleteProject: jest.fn()
      }
    });

    const crewNameInput = document.querySelector('.person-row .person-name');
    const crewPhoneInput = document.querySelector('.person-row .person-phone');
    expect(crewNameInput).not.toBeNull();
    expect(crewNameInput.value).toBe('Jamie');
    expect(crewPhoneInput.value).toBe('555-1212');

    env.cleanup();
    localStorage.clear();
  });
});
