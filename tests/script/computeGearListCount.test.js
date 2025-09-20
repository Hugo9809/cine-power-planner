const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('computeGearListCount', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  const loadUtils = () => {
    env = setupScriptEnvironment();
    return env.utils;
  };

  test('counts stored project entries that contain gear lists', () => {
    const { computeGearListCount } = loadUtils();
    const count = computeGearListCount({
      'Manual Project': { gearList: '<p>Manual</p>' },
      'Empty Project': { gearList: '' },
      'No Gear': { projectInfo: { projectName: 'Info only' } },
    });
    expect(count).toBe(1);
  });

  test('counts auto backups stored inside setups when project entries are missing', () => {
    const { computeGearListCount } = loadUtils();
    const count = computeGearListCount({}, {
      'auto-backup-1': { gearList: '<p>Backup</p>' },
      'auto-backup-2': { projectInfo: { projectName: 'No gear list' } },
    });
    expect(count).toBe(1);
  });

  test('avoids double counting when both project and setup contain the same gear list', () => {
    const { computeGearListCount } = loadUtils();
    const count = computeGearListCount({
      'Project A': { gearList: '<p>Project A</p>' },
    }, {
      'Project A': { gearList: '<p>Project A</p>' },
      'Project B': { gearList: '<p>Project B</p>' },
    });
    expect(count).toBe(2);
  });

  test('supports legacy project formats', () => {
    const { computeGearListCount } = loadUtils();
    expect(computeGearListCount('<p>Legacy</p>')).toBe(1);
    expect(computeGearListCount('   ')).toBe(0);
  });
});
