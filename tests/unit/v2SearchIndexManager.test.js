describe('v2 search index manager', () => {
  let moduleApi;

  const loadModule = async () => {
    moduleApi = await import('../../src/scripts/v2/search-module.js');
  };

  beforeEach(async () => {
    jest.resetModules();
    await loadModule();
  });

  test('reuses cached index until marked stale', () => {
    let buildCalls = 0;
    const buildIndex = () => {
      buildCalls += 1;
      return { entries: [], index: new Map() };
    };
    const stableEntries = [];
    const getSnapshot = () => ({ ref: stableEntries, length: stableEntries.length });

    const manager = moduleApi.createSearchIndexManager({ buildIndex, getSnapshot });

    expect(buildCalls).toBe(1);

    manager.refreshIfStale();
    manager.refreshIfStale();
    expect(buildCalls).toBe(1);

    manager.markStale();
    manager.refreshIfStale();
    expect(buildCalls).toBe(2);
  });

  test('refreshes when legacy entries length or reference changes', () => {
    let buildCalls = 0;
    const buildIndex = () => {
      buildCalls += 1;
      return { entries: [], index: new Map() };
    };
    const legacyEntries = [];
    let snapshotEntries = legacyEntries;
    const getSnapshot = () => ({ ref: snapshotEntries, length: snapshotEntries.length });

    const manager = moduleApi.createSearchIndexManager({ buildIndex, getSnapshot });
    expect(buildCalls).toBe(1);

    legacyEntries.push({ label: 'New' });
    manager.refreshIfStale();
    expect(buildCalls).toBe(2);

    snapshotEntries = [...legacyEntries];
    manager.refreshIfStale();
    expect(buildCalls).toBe(3);
  });
});
