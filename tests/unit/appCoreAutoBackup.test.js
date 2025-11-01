const {
  ensureAutoBackupsFromProjects,
  cloneProjectEntryForSetup,
} = require('../../src/scripts/app-core-auto-backup.js');

describe('ensureAutoBackupsFromProjects', () => {
  it('imports missing auto backup projects into setups and persists once', () => {
    const projects = {
      'auto-backup-123': { id: '123', data: { foo: 'bar' } },
      'auto-backup-before-delete-abc': { id: 'abc', data: { baz: 'qux' } },
      'regular-project': { id: 'nope' },
    };
    const setups = { existing: { id: 'persisted' } };

    const cloneProjectEntry = jest.fn((entry) => ({ clonedFrom: entry.id }));
    const loadProject = jest.fn(() => projects);
    const getSetups = jest.fn(() => setups);
    const storeSetups = jest.fn();
    const log = jest.fn();

    const result = ensureAutoBackupsFromProjects({
      loadProject,
      getSetups,
      storeSetups,
      log,
      cloneProjectEntry,
    });

    expect(result).toBe(true);
    expect(cloneProjectEntry).toHaveBeenCalledTimes(2);
    expect(setups['auto-backup-123']).toEqual({ clonedFrom: '123' });
    expect(setups['auto-backup-before-delete-abc']).toEqual({ clonedFrom: 'abc' });
    expect(storeSetups).toHaveBeenCalledTimes(1);
    expect(storeSetups).toHaveBeenCalledWith(setups);
    expect(log).toHaveBeenCalledWith(
      'info',
      'Auto backup snapshots imported from project storage',
      null,
      { importedCount: 2 },
    );
  });

  it('returns false and logs warning when persisting imported backups fails', () => {
    const projects = { 'auto-backup-1': { id: '1' } };
    const setups = {};

    const loadProject = jest.fn(() => projects);
    const getSetups = jest.fn(() => setups);
    const storeSetups = jest.fn(() => { throw new Error('boom'); });
    const log = jest.fn();

    const result = ensureAutoBackupsFromProjects({
      loadProject,
      getSetups,
      storeSetups,
      log,
      cloneProjectEntry: (entry) => ({ copy: entry.id }),
    });

    expect(result).toBe(false);
    expect(storeSetups).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(
      'warn',
      'Failed to persist imported auto backups from projects',
      expect.any(Error),
    );
  });

  it('ignores non auto backup keys and already present setups', () => {
    const snapshot = { id: '42' };
    const projects = {
      'auto-backup-keep': snapshot,
      'regular': { id: 'ignore' },
    };
    const setups = {
      existing: { id: 'persisted' },
      'auto-backup-keep': { id: 'existing-snapshot' },
    };

    const loadProject = jest.fn(() => projects);
    const getSetups = jest.fn(() => setups);
    const storeSetups = jest.fn();
    const log = jest.fn();
    const cloneProjectEntry = jest.fn();

    const result = ensureAutoBackupsFromProjects({
      loadProject,
      getSetups,
      storeSetups,
      log,
      cloneProjectEntry,
    });

    expect(result).toBe(false);
    expect(cloneProjectEntry).not.toHaveBeenCalled();
    expect(storeSetups).not.toHaveBeenCalled();
    expect(setups['auto-backup-keep']).toEqual({ id: 'existing-snapshot' });
    expect(log).not.toHaveBeenCalled();
  });
});

describe('cloneProjectEntryForSetup', () => {
  it('clones nested structures and preserves metadata descriptor', () => {
    const projectInfo = {
      title: 'Documentary',
      details: {
        crew: ['director', 'dp'],
        schedule: [{ day: 1, scenes: ['A1', 'B2'] }],
      },
    };
    const powerSelection = {
      batteries: [{ model: 'BP-A60', quantity: 4 }],
      notes: 'Use dual chargers',
    };
    const autoGearRules = [
      { rule: 'camera', include: ['FX6', 'FX3'] },
      { rule: 'audio', include: ['MixPre-6'] },
    ];
    const metadata = {
      version: 2,
      snapshotType: 'delta',
      base: 'project-001',
      sequence: 7,
      createdAt: '2024-04-18T12:00:00.000Z',
      changedKeys: ['projectInfo.details.schedule'],
      removedKeys: ['powerSelection.legacy'],
    };
    const projectEntry = {
      projectInfo,
      powerSelection,
      autoGearRules,
      gearList: 'Camera Kit',
    };

    Object.defineProperty(projectEntry, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: metadata,
    });

    const deepClone = jest.fn((value) => JSON.parse(JSON.stringify(value)));
    const logger = jest.fn();

    const snapshot = cloneProjectEntryForSetup(projectEntry, { deepClone, log: logger });

    expect(deepClone).toHaveBeenCalledTimes(3);
    expect(logger).not.toHaveBeenCalled();

    expect(snapshot.projectInfo).not.toBe(projectInfo);
    expect(snapshot.projectInfo).toEqual(projectInfo);
    expect(snapshot.projectInfo.details).not.toBe(projectInfo.details);
    expect(snapshot.projectInfo.details.schedule).not.toBe(projectInfo.details.schedule);

    expect(snapshot.powerSelection).not.toBe(powerSelection);
    expect(snapshot.powerSelection).toEqual(powerSelection);

    expect(snapshot.autoGearRules).not.toBe(autoGearRules);
    expect(snapshot.autoGearRules).toEqual(autoGearRules);

    expect(snapshot.gearList).toBe('Camera Kit');

    const descriptor = Object.getOwnPropertyDescriptor(snapshot, '__cineAutoBackupMetadata');
    expect(descriptor).toBeDefined();
    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.value).not.toBe(metadata);
    expect(descriptor.value).toEqual({
      version: 2,
      snapshotType: 'delta',
      base: 'project-001',
      sequence: 7,
      createdAt: '2024-04-18T12:00:00.000Z',
      changedKeys: ['projectInfo.details.schedule'],
      removedKeys: ['powerSelection.legacy'],
    });
    expect(descriptor.value.changedKeys).not.toBe(metadata.changedKeys);
    expect(descriptor.value.removedKeys).not.toBe(metadata.removedKeys);
  });

  it('logs warnings and falls back when deep cloning throws', () => {
    const projectInfo = { title: 'Indie Film' };
    const powerSelection = { batteries: [{ model: 'IDX' }] };
    const autoGearRules = [{ rule: 'lights', include: ['Aputure 600d'] }];
    const metadata = { version: 1, changedKeys: ['projectInfo'], removedKeys: [] };
    const projectEntry = {
      projectInfo,
      powerSelection,
      autoGearRules,
      gearList: 'Lighting Kit',
    };

    Object.defineProperty(projectEntry, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: metadata,
    });

    const deepCloneError = new Error('clone failed');
    const deepClone = jest.fn((value) => {
      if (value === powerSelection || value === autoGearRules) {
        throw deepCloneError;
      }
      return Array.isArray(value) ? value.map((item) => item) : { ...value };
    });
    const logger = jest.fn();

    const snapshot = cloneProjectEntryForSetup(projectEntry, { deepClone, log: logger });

    expect(deepClone).toHaveBeenCalledTimes(3);
    expect(logger).toHaveBeenCalledTimes(2);
    expect(logger).toHaveBeenNthCalledWith(
      1,
      'warn',
      'Failed to clone project power selection for auto backup import',
      deepCloneError,
    );
    expect(logger).toHaveBeenNthCalledWith(
      2,
      'warn',
      'Failed to clone auto gear rules for auto backup import',
      deepCloneError,
    );

    expect(snapshot.projectInfo).not.toBe(projectInfo);
    expect(snapshot.projectInfo).toEqual(projectInfo);

    expect(snapshot.powerSelection).toBe(powerSelection);
    expect(snapshot.autoGearRules).not.toBe(autoGearRules);
    expect(snapshot.autoGearRules).toHaveLength(autoGearRules.length);
    expect(snapshot.autoGearRules[0]).toBe(autoGearRules[0]);
    expect(snapshot.gearList).toBe('Lighting Kit');
  });

  it('falls back to original values when runtime clone helpers fail', () => {
    const originalStructuredClone = global.structuredClone;
    const originalJsonParse = JSON.parse;

    const structuredCloneError = new Error('structuredClone unavailable');
    const jsonParseError = new Error('json parse unavailable');

    const originalCoreDeepClone = global.CORE_DEEP_CLONE;
    const hadCoreDeepClone = Object.prototype.hasOwnProperty.call(global, 'CORE_DEEP_CLONE');
    const originalCineDeepClone = global.__cineDeepClone;
    const hadCineDeepClone = Object.prototype.hasOwnProperty.call(global, '__cineDeepClone');

    delete global.CORE_DEEP_CLONE;
    delete global.__cineDeepClone;

    const structuredCloneMock = jest.fn(() => {
      throw structuredCloneError;
    });
    const jsonParseMock = jest.fn(() => {
      throw jsonParseError;
    });

    global.structuredClone = structuredCloneMock;
    JSON.parse = jsonParseMock;

    try {
      const projectInfo = { title: 'Backup Project', details: { camera: 'FX9' } };
      const powerSelection = { batteries: ['B1', 'B2'] };
      const autoGearRules = [{ rule: 'audio', include: ['Tentacle Sync'] }];
      const malformedEntryResult = cloneProjectEntryForSetup(null);

      expect(malformedEntryResult).toEqual({});

      const snapshot = cloneProjectEntryForSetup({
        projectInfo,
        powerSelection,
        autoGearRules,
      });

      expect(snapshot.projectInfo === projectInfo).toBe(true);
      expect(snapshot.powerSelection === powerSelection).toBe(true);
      expect(snapshot.autoGearRules === autoGearRules).toBe(true);

      expect(structuredCloneMock).toHaveBeenCalledTimes(3);
      expect(jsonParseMock).toHaveBeenCalledTimes(3);
    } finally {
      global.structuredClone = originalStructuredClone;
      JSON.parse = originalJsonParse;

      if (hadCoreDeepClone) {
        global.CORE_DEEP_CLONE = originalCoreDeepClone;
      } else {
        delete global.CORE_DEEP_CLONE;
      }
      if (hadCineDeepClone) {
        global.__cineDeepClone = originalCineDeepClone;
      } else {
        delete global.__cineDeepClone;
      }
    }
  });
});
