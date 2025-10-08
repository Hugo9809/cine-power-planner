const { spawnSync } = require('child_process');

describe('storage compression fallback when quota is exceeded', () => {
  test('stores compressed payload after initial quota failure', () => {
    const script = `
      const { JSDOM } = require('jsdom');
      const lzString = require('lz-string');
      const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.com' });
      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = dom.window.navigator;
      global.alert = () => {};
      global.LZString = lzString;
      dom.window.LZString = lzString;
      const history = [];
      const store = new Map();
      const quotaStorage = {
        setItem(key, value) {
          const serialized = String(value);
          const compressed = serialized.includes('__cineStorageCompressed');
          history.push({ key, length: serialized.length, compressed });
          if ((key === 'cameraPowerPlanner_project' || key === 'cameraPowerPlanner_project__backup') && !compressed) {
            const error = new Error('Quota exceeded');
            error.name = 'QuotaExceededError';
            error.code = 22;
            error.number = 22;
            throw error;
          }
          store.set(key, serialized);
        },
        getItem(key) { return store.has(key) ? store.get(key) : null; },
        removeItem(key) { store.delete(key); },
        clear() { store.clear(); },
        key(index) { return Array.from(store.keys())[index] ?? null; },
        get length() { return store.size; },
      };
      Object.defineProperty(dom.window, 'localStorage', { configurable: true, writable: true, value: quotaStorage });
      Object.defineProperty(global, 'localStorage', { configurable: true, writable: true, value: quotaStorage });
      delete dom.window.__cineStorageApi;
      delete dom.window.__cineStorageInitialized;
      delete global.__cineStorageApi;
      delete global.__cineStorageInitialized;
      const storage = require('./src/scripts/storage.js');
      const hugeBlock = 'Project requirements block '.repeat(180);
      const hugeCrew = Array.from({ length: 40 }).map((_, index) => ({ name: \`Crew Member \${index + 1}\`, notes: hugeBlock }));
      storage.saveProject('Massive Requirements', {
        gearList: hugeBlock,
        projectInfo: { people: hugeCrew, summary: hugeBlock },
        notes: hugeBlock,
      });
      console.log('HISTORY:' + JSON.stringify(history));
      console.log('PRIMARY:' + JSON.stringify(quotaStorage.getItem('cameraPowerPlanner_project')));
      console.log('BACKUP:' + JSON.stringify(quotaStorage.getItem('cameraPowerPlanner_project__backup')));
    `;

    const result = spawnSync(process.execPath, ['-e', script], {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: { ...process.env },
    });

    expect(result.status).toBe(0);
    const lines = result.stdout.split('\n');
    const historyLine = lines.find((line) => line.startsWith('HISTORY:'));
    const primaryLine = lines.find((line) => line.startsWith('PRIMARY:'));
    const backupLine = lines.find((line) => line.startsWith('BACKUP:'));
    expect(historyLine).toBeDefined();
    expect(primaryLine).toBeDefined();
    expect(backupLine).toBeDefined();
    const history = JSON.parse(historyLine.slice('HISTORY:'.length));
    const projectEntries = history.filter((entry) => entry.key === 'cameraPowerPlanner_project');
    const backupEntries = history.filter((entry) => entry.key === 'cameraPowerPlanner_project__backup');
    expect(projectEntries.length).toBeGreaterThan(0);
    if (projectEntries.length > 1) {
      expect(projectEntries[0].compressed).toBe(false);
    }
    expect(projectEntries.some((entry) => entry.compressed)).toBe(true);
    expect(backupEntries.length).toBeGreaterThan(0);
    expect(backupEntries.some((entry) => entry.compressed)).toBe(true);
    const storedPrimary = JSON.parse(primaryLine.slice('PRIMARY:'.length));
    const storedBackup = JSON.parse(backupLine.slice('BACKUP:'.length));
    expect(typeof storedPrimary).toBe('string');
    expect(typeof storedBackup).toBe('string');
  });
});
