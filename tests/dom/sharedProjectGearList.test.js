const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('shared project gear list handling', () => {
  let env;

  beforeEach(() => {
    env = setupScriptEnvironment({
      globals: {
        saveProject: jest.fn(),
        loadProject: jest.fn(() => ({})),
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({}))
      }
    });
  });

  afterEach(() => {
    env.cleanup();
  });

  test('encodeSharedSetup includes gear list payload', () => {
    const { utils } = env;
    const payload = {
      setupName: 'Test Project',
      gearList: '<div>Gear</div>',
      projectInfo: { projectName: 'Test Project' }
    };

    const encoded = utils.encodeSharedSetup(payload);
    expect(encoded.l).toBe(payload.gearList);

    const decoded = utils.decodeSharedSetup(encoded);
    expect(decoded.gearList).toBe(payload.gearList);
    expect(decoded.projectInfo).toEqual(payload.projectInfo);
  });

  test('applySharedSetup persists imported gear list', () => {
    const { utils } = env;
    const sharedData = {
      setupName: 'Imported Project',
      gearList: `
        <h2>Imported Project</h2>
        <h3>Gear List</h3>
        <table class="gear-table">
          <tr><td class="gear-item" data-gear-name="Test Item">Test Item</td></tr>
        </table>
      `,
      projectInfo: { projectName: 'Imported Project' }
    };

    env.globals.saveProject.mockClear();

    utils.applySharedSetup(sharedData);
    utils.saveCurrentGearList();

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput.innerHTML).toContain('Imported');

    const savedCalls = env.globals.saveProject.mock.calls.filter(([name]) => name === 'Imported Project');
    expect(savedCalls.length).toBeGreaterThan(0);
    expect(savedCalls.some(([, data]) => data.gearList.includes('Imported'))).toBe(true);
    expect(savedCalls.some(([, data]) => data.projectInfo?.projectName === 'Imported Project')).toBe(true);
  });
});
