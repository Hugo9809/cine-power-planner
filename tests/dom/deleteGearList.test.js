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

describe('delete gear list action', () => {
  let env;
  let storedSetups;
  let loadSetupsMock;
  let saveSetupsMock;
  let deleteProjectMock;
  let saveSessionStateMock;
  let confirmSpy;

  beforeEach(() => {
    storedSetups = {
      'Project One': {
        camera: 'CamX',
        monitor: 'MonX',
        video: 'VidX',
        distance: 'None',
        motors: [],
        controllers: [],
        battery: 'BatX',
        batteryPlate: 'PlateX',
        batteryHotswap: 'SwapX',
        sliderBowl: '75mm',
        easyrig: 'Stabiliser',
        gearList: savedGearHtml,
        projectInfo: { note: 'persisted' }
      }
    };

    loadSetupsMock = jest.fn(() => storedSetups);
    saveSetupsMock = jest.fn();
    deleteProjectMock = jest.fn();
    saveSessionStateMock = jest.fn();

    env = setupScriptEnvironment({
      globals: {
        loadSetups: loadSetupsMock,
        saveSetups: saveSetupsMock,
        deleteProject: deleteProjectMock,
        saveProject: jest.fn(),
        saveSessionState: saveSessionStateMock
      }
    });

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    saveSetupsMock.mockClear();
    deleteProjectMock.mockClear();
    saveSessionStateMock.mockClear();
  });

  afterEach(() => {
    confirmSpy?.mockRestore();
    env?.cleanup();
  });

  test('removes persisted gear list for the active project', () => {
    const deleteBtn = document.getElementById('deleteGearListBtn');
    expect(deleteBtn).not.toBeNull();

    deleteBtn.click();

    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(deleteProjectMock).toHaveBeenCalledWith('Project One');
    expect(saveSetupsMock).toHaveBeenCalledTimes(1);

    const savedArg = saveSetupsMock.mock.calls[0][0];
    expect(savedArg['Project One'].gearList).toBeUndefined();
    expect(savedArg['Project One'].projectInfo).toBeUndefined();
    expect(storedSetups['Project One'].gearList).toBeUndefined();
    expect(storedSetups['Project One'].projectInfo).toBeUndefined();

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.innerHTML).toBe('');
    expect(gearListOutput.classList.contains('hidden')).toBe(true);

    const requirementsOutput = document.getElementById('projectRequirementsOutput');
    expect(requirementsOutput.classList.contains('hidden')).toBe(true);

    expect(env.utils.getCurrentProjectInfo()).toBeNull();
    expect(saveSessionStateMock).toHaveBeenCalledWith(expect.objectContaining({
      projectInfo: null
    }));
  });
});
