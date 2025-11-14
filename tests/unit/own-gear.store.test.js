const { createOwnGearStore } = require('../../src/scripts/own-gear/store.js');

describe('own gear store', () => {
  test('loadStoredOwnGearItems normalizes duplicates and whitespace', () => {
    const loadOwnGear = jest.fn().mockReturnValue([
      { id: 'abc', name: '  Pocket 6K ', quantity: '1', notes: 'kit' },
      { id: 'abc', name: 'Pocket 6K', quantity: 2 },
      { name: 'Mini LF', quantity: ' 3 ' },
      null,
    ]);
    const store = createOwnGearStore({ loadOwnGear });
    const items = store.loadStoredOwnGearItems();

    expect(items).toEqual([
      { id: 'abc', name: 'Pocket 6K', quantity: '1', notes: 'kit' },
      expect.objectContaining({ name: 'Mini LF', quantity: '3' }),
    ]);
    expect(loadOwnGear).toHaveBeenCalled();
  });

  test('persistOwnGearItems sanitizes payload and dispatches change', () => {
    const saveOwnGear = jest.fn();
    const dispatchOwnGearChange = jest.fn();
    const store = createOwnGearStore({ saveOwnGear, dispatchOwnGearChange });
    const payload = [
      { id: 'gear-1', name: 'FX3', quantity: '2', notes: 'body kit', source: 'catalog', extra: 'ignored' },
      { id: 'gear-2', name: 'Custom monitor', source: 'custom' },
    ];

    expect(store.persistOwnGearItems(payload)).toBe(true);
    expect(saveOwnGear).toHaveBeenCalledWith([
      { id: 'gear-1', name: 'FX3', quantity: '2', notes: 'body kit', source: 'catalog' },
      { id: 'gear-2', name: 'Custom monitor', source: 'custom' },
    ]);
    expect(dispatchOwnGearChange).toHaveBeenCalled();
  });

  test('persistOwnGearItems reports offline fallback when save missing', () => {
    const store = createOwnGearStore({ scope: {} });
    expect(store.persistOwnGearItems([{ id: '1', name: 'Mini' }])).toBe(false);
  });

  test('refreshCache reflects backup/restore snapshots', () => {
    const snapshots = [
      [{ id: 'gear-a', name: 'Alexa 35' }],
      [{ id: 'gear-b', name: 'FX9', quantity: '4' }],
    ];
    const loadOwnGear = jest.fn();
    let callIndex = 0;
    loadOwnGear.mockImplementation(() => {
      const snapshot = snapshots[Math.min(callIndex, snapshots.length - 1)];
      callIndex += 1;
      return snapshot;
    });
    const store = createOwnGearStore({ loadOwnGear });

    store.refreshCache();
    expect(store.getCachedItems()).toEqual([{ id: 'gear-a', name: 'Alexa 35' }]);

    store.invalidateCache();
    store.refreshCache();
    expect(store.getCachedItems()).toEqual([{ id: 'gear-b', name: 'FX9', quantity: '4' }]);
  });
});
