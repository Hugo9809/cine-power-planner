const { cloneProjectEntryForSetup } = require('../../src/scripts/app-core-auto-backup.js');

describe('cloneProjectEntryForSetup', () => {
  const originalStructuredClone = global.structuredClone;
  const originalCineDeepClone = global.__cineDeepClone;
  const originalCoreDeepClone = global.CORE_DEEP_CLONE;

  afterEach(() => {
    jest.restoreAllMocks();
    if (typeof originalStructuredClone === 'undefined') {
      delete global.structuredClone;
    } else {
      global.structuredClone = originalStructuredClone;
    }
    if (typeof originalCineDeepClone === 'undefined') {
      delete global.__cineDeepClone;
    } else {
      global.__cineDeepClone = originalCineDeepClone;
    }
    if (typeof originalCoreDeepClone === 'undefined') {
      delete global.CORE_DEEP_CLONE;
    } else {
      global.CORE_DEEP_CLONE = originalCoreDeepClone;
    }
  });

  it('clones nested project structures and preserves metadata descriptors', () => {
    const metadata = {
      version: 4,
      snapshotType: 'delta',
      base: 'auto-backup-42',
      sequence: 9,
      createdAt: '2024-01-02T03:04:05.678Z',
      changedKeys: ['powerSelection.circuits', 'projectInfo.preferences'],
      removedKeys: ['gearList.legacy'],
    };

    const projectEntry = {
      projectInfo: {
        title: 'Test Project',
        preferences: {
          theme: 'night',
          layout: { columns: 3 },
        },
      },
      powerSelection: {
        circuits: [
          { amps: 10, outlets: ['A', 'B'] },
          { amps: 16, outlets: ['C'] },
        ],
        notes: 'Include spare batteries',
      },
      gearList: 'Camera\nLens\nTripod',
      autoGearRules: [
        {
          id: 'rule-1',
          conditions: [{ type: 'voltage', threshold: 12 }],
          actions: ['notify'],
        },
      ],
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

    expect(logger).not.toHaveBeenCalled();
    expect(deepClone).toHaveBeenCalledTimes(3);
    expect(snapshot.projectInfo).toEqual(projectEntry.projectInfo);
    expect(snapshot.projectInfo).not.toBe(projectEntry.projectInfo);
    expect(snapshot.projectInfo.preferences).not.toBe(projectEntry.projectInfo.preferences);
    expect(snapshot.powerSelection).toEqual(projectEntry.powerSelection);
    expect(snapshot.powerSelection.circuits).not.toBe(projectEntry.powerSelection.circuits);
    expect(snapshot.autoGearRules).toEqual(projectEntry.autoGearRules);
    expect(snapshot.autoGearRules).not.toBe(projectEntry.autoGearRules);

    const descriptor = Object.getOwnPropertyDescriptor(snapshot, '__cineAutoBackupMetadata');
    expect(descriptor).toBeDefined();
    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.configurable).toBe(true);
    expect(descriptor.writable).toBe(true);
    expect(descriptor.value).toEqual({
      version: 4,
      snapshotType: 'delta',
      base: 'auto-backup-42',
      sequence: 9,
      createdAt: '2024-01-02T03:04:05.678Z',
      changedKeys: ['powerSelection.circuits', 'projectInfo.preferences'],
      removedKeys: ['gearList.legacy'],
    });
    expect(descriptor.value.changedKeys).not.toBe(metadata.changedKeys);
    expect(descriptor.value.removedKeys).not.toBe(metadata.removedKeys);
  });

  it('logs warnings and falls back when supplied deep clone throws', () => {
    const cloneError = new Error('clone failure');
    const deepClone = jest.fn(() => {
      throw cloneError;
    });
    const logger = jest.fn();

    const projectEntry = {
      projectInfo: { label: 'Danger Zone', nested: { value: 7 } },
      powerSelection: { circuits: [{ amps: 20 }] },
      autoGearRules: [{ id: 'rule-7', options: { enabled: true } }],
    };

    Object.defineProperty(projectEntry, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: {
        version: 2,
        snapshotType: 'delta',
        base: 'auto-backup-1',
        sequence: 5,
        createdAt: '2023-12-24T00:00:00.000Z',
        changedKeys: ['projectInfo'],
        removedKeys: ['gearList'],
      },
    });

    const snapshot = cloneProjectEntryForSetup(projectEntry, { deepClone, log: logger });

    expect(deepClone).toHaveBeenCalledTimes(3);
    expect(logger).toHaveBeenCalledTimes(3);
    expect(logger).toHaveBeenNthCalledWith(
      1,
      'warn',
      'Failed to clone project info for auto backup import',
      cloneError,
    );
    expect(logger).toHaveBeenNthCalledWith(
      2,
      'warn',
      'Failed to clone project power selection for auto backup import',
      cloneError,
    );
    expect(logger).toHaveBeenNthCalledWith(
      3,
      'warn',
      'Failed to clone auto gear rules for auto backup import',
      cloneError,
    );

    expect(snapshot.projectInfo).toBe(projectEntry.projectInfo);
    expect(snapshot.powerSelection).toBe(projectEntry.powerSelection);
    expect(snapshot.autoGearRules).not.toBe(projectEntry.autoGearRules);
    expect(snapshot.autoGearRules).toEqual(projectEntry.autoGearRules);
    expect(snapshot.autoGearRules[0]).toBe(projectEntry.autoGearRules[0]);
  });

  it('returns safe defaults for malformed entries and final deep clone fallbacks', () => {
    expect(cloneProjectEntryForSetup(null)).toEqual({});
    expect(cloneProjectEntryForSetup(undefined)).toEqual({});
    expect(cloneProjectEntryForSetup(42)).toEqual({});

    delete global.__cineDeepClone;
    delete global.CORE_DEEP_CLONE;

    const structuredCloneMock = jest.fn(() => {
      throw new Error('structured clone unavailable');
    });
    global.structuredClone = structuredCloneMock;
    const jsonParseSpy = jest.spyOn(JSON, 'parse').mockImplementation(() => {
      throw new Error('json parse unavailable');
    });

    const projectEntry = {
      projectInfo: { owner: 'Casey' },
      powerSelection: { presets: ['alpha'] },
      autoGearRules: [{ id: 'rule-9' }],
    };

    const snapshot = cloneProjectEntryForSetup(projectEntry);

    expect(structuredCloneMock).toHaveBeenCalled();
    expect(jsonParseSpy).toHaveBeenCalled();
    expect(snapshot.projectInfo).toBe(projectEntry.projectInfo);
    expect(snapshot.powerSelection).toBe(projectEntry.powerSelection);
    expect(snapshot.autoGearRules).toBe(projectEntry.autoGearRules);
  });
});
