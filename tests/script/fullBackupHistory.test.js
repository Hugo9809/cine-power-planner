const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const HISTORY_STORAGE_KEY = 'cameraPowerPlanner_fullBackupHistory';

describe('full backup history tracking', () => {
  let env;

  afterEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  const loadUtils = () => {
    env = setupScriptEnvironment();
    return env.utils;
  };

  test('records downloads and increments totals', () => {
    const { getFullBackupHistory, recordFullBackupDownload } = loadUtils();
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }

    let history = getFullBackupHistory();
    expect(history.total).toBe(0);
    expect(Array.isArray(history.entries)).toBe(true);

    recordFullBackupDownload('2024-01-01T00:00:00Z', '2024-01-01T00-00-00Z full app backup.json');
    history = getFullBackupHistory();
    expect(history.total).toBe(1);
    expect(history.entries).toHaveLength(1);
    expect(history.latestAt).toBe('2024-01-01T00:00:00Z');
    expect(history.latestFileName).toBe('2024-01-01T00-00-00Z full app backup.json');

    recordFullBackupDownload('2024-02-02T12:34:56+01:00', '2024-02-02T12-34-56+01-00 full app backup.json');
    history = getFullBackupHistory();
    expect(history.total).toBe(2);
    expect(history.entries).toHaveLength(2);
    const lastEntry = history.entries[history.entries.length - 1];
    expect(lastEntry.createdAt).toBe('2024-02-02T12:34:56+01:00');
    expect(lastEntry.fileName).toBe('2024-02-02T12-34-56+01-00 full app backup.json');
  });

  test('normalizes numeric history values stored as strings', () => {
    const { getFullBackupHistory } = loadUtils();
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, '7');
    }
    const history = getFullBackupHistory();
    expect(history.total).toBe(7);
    expect(history.entries).toEqual([]);
  });
});
