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
  let showNotificationMock;

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
    showNotificationMock = jest.fn();

    env = setupScriptEnvironment({
      globals: {
        loadSetups: loadSetupsMock,
        saveSetups: saveSetupsMock,
        deleteProject: deleteProjectMock,
        saveProject: jest.fn(),
        saveSessionState: saveSessionStateMock,
        showNotification: showNotificationMock
      }
    });

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project One';
    setupSelect.dispatchEvent(new Event('change'));

    confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    confirmSpy.mockClear();
    saveSetupsMock.mockClear();
    deleteProjectMock.mockClear();
    saveSessionStateMock.mockClear();
    showNotificationMock.mockClear();
  });

  afterEach(() => {
    confirmSpy?.mockRestore();
    env?.cleanup();
  });

  test('deleteCurrentGearList removes persisted gear list for the active project', () => {
    const deleteBtn = document.getElementById('deleteGearListBtn');
    expect(deleteBtn).toBeNull();

    const actions = document.getElementById('gearListActions');
    expect(actions).not.toBeNull();

    const autosaveNote = document.getElementById('gearListAutosaveNote');
    expect(autosaveNote).not.toBeNull();

    expect(typeof env.utils.deleteCurrentGearList).toBe('function');

    const deletedEvents = [];
    const deletedListener = (event) => deletedEvents.push(event);
    document.addEventListener('gearlist:deleted', deletedListener);

    const result = env.utils.deleteCurrentGearList();
    expect(result).toBe(true);

    document.removeEventListener('gearlist:deleted', deletedListener);

    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(deleteProjectMock).toHaveBeenCalledWith('Project One');
    expect(saveSetupsMock).toHaveBeenCalled();
    expect(saveSetupsMock.mock.calls.length).toBeGreaterThanOrEqual(3);

    const backupCall = saveSetupsMock.mock.calls.find(([arg]) =>
      Object.keys(arg).some(key => key.startsWith('auto-backup-'))
    );
    expect(backupCall).toBeDefined();
    const backupArg = backupCall[0];
    const backupKey = Object.keys(backupArg).find(key => key.startsWith('auto-backup-'));
    expect(backupKey).toBeTruthy();
    expect(backupArg[backupKey].gearList).toContain('<table');

    const finalArg = saveSetupsMock.mock.calls[saveSetupsMock.mock.calls.length - 1][0];
    expect(finalArg['Project One'].gearList).toBeUndefined();
    expect(finalArg['Project One'].projectInfo).toBeUndefined();
    expect(finalArg['Project One'].gearListAndProjectRequirementsGenerated).toBeUndefined();
    expect(storedSetups['Project One'].gearList).toBeUndefined();
    expect(storedSetups['Project One'].projectInfo).toBeUndefined();
    expect(storedSetups['Project One'].gearListAndProjectRequirementsGenerated).toBeUndefined();

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.innerHTML).toBe('');
    expect(gearListOutput.classList.contains('hidden')).toBe(true);

    const requirementsOutput = document.getElementById('projectRequirementsOutput');
    expect(requirementsOutput.classList.contains('hidden')).toBe(true);

    expect(env.utils.getCurrentProjectInfo()).toBeNull();
    expect(saveSessionStateMock.mock.calls.some(([state]) => state.projectInfo === null)).toBe(true);

    expect(deletedEvents.length).toBe(1);
    expect(deletedEvents[0]).toBeDefined();
    expect(deletedEvents[0].detail.projectName).toBe('Project One');
    expect(typeof deletedEvents[0].detail.backupName).toBe('string');
    expect(deletedEvents[0].detail.source).toBe('deleteCurrentGearList');
  });

  test('dispatching gearlist:delete-requested triggers gear list deletion', () => {
    const deletedEvents = [];
    const deletedListener = (event) => deletedEvents.push(event);
    document.addEventListener('gearlist:deleted', deletedListener);

    confirmSpy.mockClear();

    document.dispatchEvent(new CustomEvent('gearlist:delete-requested', { detail: { source: 'test' } }));

    document.removeEventListener('gearlist:deleted', deletedListener);

    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(deletedEvents.length).toBe(1);
    expect(deletedEvents[0].detail.projectName).toBe('Project One');
  });

  test('deleteCurrentGearList cancels when auto backup is skipped', () => {
    const deletedEvents = [];
    const deletedListener = (event) => deletedEvents.push(event);
    document.addEventListener('gearlist:deleted', deletedListener);

    const autoBackupSpy = jest
      .spyOn(env.utils, 'autoBackup')
      .mockReturnValue({ status: 'skipped', reason: 'auto-backup-selected' });

    const result = env.utils.deleteCurrentGearList();

    autoBackupSpy.mockRestore();
    document.removeEventListener('gearlist:deleted', deletedListener);

    expect(result).toBe(false);
    expect(autoBackupSpy).toHaveBeenCalled();
    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(showNotificationMock).toHaveBeenCalledWith(
      'error',
      expect.stringContaining('Automatic backup failed'),
    );
    expect(deleteProjectMock).not.toHaveBeenCalled();
    expect(saveSetupsMock).not.toHaveBeenCalled();
    expect(saveSessionStateMock).not.toHaveBeenCalled();
    expect(storedSetups['Project One'].gearList).toBe(savedGearHtml);
    expect(storedSetups['Project One'].projectInfo).toEqual({ note: 'persisted' });
    expect(deletedEvents.length).toBe(0);
  });
});
