const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const existingHtml = `
  <h2>Existing Project</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid"></div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>Existing Item</td></tr></table>
`;

const importedHtml = `
  <h2>Imported Project</h2>
  <h3>Project Requirements</h3>
  <div class="requirements-grid"></div>
  <h3>Gear List</h3>
  <table class="gear-table"><tr><td>Imported Item</td></tr></table>
`;

describe('gear list import workflow', () => {
  let env;
  let saveProjectMock;
  let loadProjectMock;
  let loadSetupsMock;
  let saveSetupsMock;
  let alertSpy;
  let originalFileReader;

  beforeEach(() => {
    const storedSetups = {
      Existing: {
        camera: 'CamX',
        monitor: 'MonX',
        video: 'VidX',
        distance: 'None',
        motors: [],
        controllers: [],
        battery: 'BatX',
        batteryPlate: '',
        batteryHotswap: '',
        sliderBowl: '',
        easyrig: ''
      }
    };

    loadSetupsMock = jest.fn(() => storedSetups);
    saveSetupsMock = jest.fn();
    loadProjectMock = jest.fn(name => (
      name === 'Existing'
        ? { gearList: existingHtml, projectInfo: { projectName: 'Existing Project' } }
        : null
    ));
    saveProjectMock = jest.fn();

    env = setupScriptEnvironment({
      globals: {
        loadSetups: loadSetupsMock,
        saveSetups: saveSetupsMock,
        loadProject: loadProjectMock,
        saveProject: saveProjectMock,
        saveSessionState: jest.fn()
      }
    });

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Existing';
    setupSelect.dispatchEvent(new Event('change'));

    saveProjectMock.mockClear();
    saveSetupsMock.mockClear();

    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    originalFileReader = global.FileReader;
  });

  afterEach(() => {
    alertSpy?.mockRestore();
    if (originalFileReader === undefined) {
      delete global.FileReader;
    } else {
      global.FileReader = originalFileReader;
    }
    env?.cleanup();
  });

  test('saves the current project before loading an imported one', () => {
    const importInput = document.getElementById('importGearListInput');
    expect(importInput).not.toBeNull();

    const importedData = {
      gearList: importedHtml,
      projectInfo: { projectName: 'Imported Project' }
    };

    class FileReaderMock {
      readAsText() {
        if (typeof this.onload === 'function') {
          this.onload({ target: { result: JSON.stringify(importedData) } });
        }
      }
    }
    global.FileReader = FileReaderMock;

    const file = { name: 'Imported Project.json' };
    Object.defineProperty(importInput, 'files', {
      configurable: true,
      value: [file]
    });

    importInput.dispatchEvent(new Event('change'));

    const existingSaves = saveProjectMock.mock.calls.filter(([name]) => name === 'Existing');
    expect(existingSaves.length).toBeGreaterThan(0);
    expect(existingSaves.some(([, data]) => (data?.gearList || '').length > 0)).toBe(true);
    expect(existingSaves.every(([, data]) => !data?.gearList?.includes('Imported Item'))).toBe(true);

    const importedSaves = saveProjectMock.mock.calls.filter(([name]) => name === 'Imported Project');
    expect(importedSaves.length).toBeGreaterThan(0);
    expect(importedSaves[0][1].gearList).toContain('Imported Item');

    const setupSelect = document.getElementById('setupSelect');
    expect(setupSelect.value).toBe('');

    const setupNameInput = document.getElementById('setupName');
    expect(setupNameInput.value).toBe('Imported Project');

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.innerHTML).toContain('Imported Item');
  });
});
