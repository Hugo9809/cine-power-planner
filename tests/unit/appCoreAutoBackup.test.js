const { ensureAutoBackupsFromProjects } = require('../../src/scripts/app-core-auto-backup.js');

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
