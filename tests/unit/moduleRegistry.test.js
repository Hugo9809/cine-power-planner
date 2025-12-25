const path = require('path');

describe('cineModules registry', () => {
  let registry;

  beforeEach(() => {
    jest.resetModules();
    registry = require(path.join('..', '..', 'src', 'scripts', 'modules', 'registry.js'));
    registry.__internalResetForTests({ force: true });
  });

  afterEach(() => {
    if (registry && typeof registry.__internalResetForTests === 'function') {
      registry.__internalResetForTests({ force: true });
    }
  });

  test('processes pending module registrations queued before load', () => {
    const pendingKey = '__cinePendingModuleRegistrations__';

    registry.__internalResetForTests({ force: true });
    jest.resetModules();

    Object.defineProperty(global, pendingKey, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: [
        Object.freeze({
          name: 'cineLate',
          api: { ready: true },
          options: Object.freeze({ replace: true, freeze: false, category: 'late', description: 'Queued module' }),
        }),
      ],
    });

    const freshRegistry = require(path.join('..', '..', 'src', 'scripts', 'modules', 'registry.js'));
    const retrieved = freshRegistry.get('cineLate');

    expect(retrieved).toEqual({ ready: true });
    expect(Object.isFrozen(retrieved)).toBe(false);

    const queue = global[pendingKey];
    expect(Array.isArray(queue)).toBe(true);
    expect(queue.length).toBe(0);

    freshRegistry.__internalResetForTests({ force: true });
    registry = freshRegistry;
    delete global[pendingKey];
  });

  test('discards duplicate pending registrations without infinite retry', () => {
    const pendingKey = '__cinePendingModuleRegistrations__';
    const timerKey = '__cinePendingModuleRegistrationsTimer__';

    registry.__internalResetForTests({ force: true });
    jest.resetModules();

    // Mock console.warn to verify we log the discard
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    // Setup the queue with duplicate items
    // The first one will register successfully.
    // The second one will collide and should be discarded.
    Object.defineProperty(global, pendingKey, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: [
        Object.freeze({
          name: 'cineDuplicate',
          api: { version: 1 },
          options: Object.freeze({ replace: false, freeze: false }),
        }),
        Object.freeze({
          name: 'cineDuplicate',
          api: { version: 2 },
          options: Object.freeze({ replace: false, freeze: false }),
        }),
      ],
    });

    jest.resetModules();
    const reloadedRegistry = require(path.join('..', '..', 'src', 'scripts', 'modules', 'registry.js'));

    const queue = global[pendingKey];

    // The queue passed to the flush loop was a slice. The original queue array (on global)
    // is cleared (length=0) at the start of flush.
    // If reschedule happens, items are pushed back.
    // So we expect length to be 0.
    if (queue) {
      expect(queue.length).toBe(0);
    }

    expect(global[timerKey]).toBeUndefined(); // Should NOT be rescheduled

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('discard pending registration'),
      expect.any(Error)
    );

    warnSpy.mockRestore();
    reloadedRegistry.__internalResetForTests({ force: true });
    registry = reloadedRegistry;
    delete global[pendingKey];
  });

  test('discards pending registrations when initial attempts fail', () => {
    const pendingKey = '__cinePendingModuleRegistrations__';
    const timerKey = '__cinePendingModuleRegistrationsTimer__';

    registry.__internalResetForTests({ force: true });
    jest.resetModules();

    // Mock console.warn
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    // "   " is an invalid name (empty after trim), which causes createBlueprint to throw TypeError.
    const failingEntry = {
      name: '   ',
      api: { value: 'delayed' },
      options: Object.freeze({ replace: true, freeze: false }),
    };

    Object.defineProperty(global, pendingKey, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: [failingEntry],
    });

    try {
      require(path.join('..', '..', 'src', 'scripts', 'modules', 'registry.js'));

      const queue = global[pendingKey];
      // Expect queue to be drained/cleared
      if (queue) {
        expect(queue.length).toBe(0);
      }
      expect(global[timerKey]).toBeUndefined();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('discard pending registration'),
        expect.any(Error)
      );
    } finally {
      warnSpy.mockRestore();
      if (registry) {
        registry.__internalResetForTests({ force: true });
      }
      delete global[pendingKey];
      delete global[timerKey];
    }
  });

  test('register freezes modules by default and exposes metadata', () => {
    const sample = { ready: () => true };
    const registered = registry.register('cineExample', sample, {
      category: 'test',
      description: 'Example module used in registry tests.',
    });

    expect(Object.isFrozen(registered)).toBe(true);
    expect(registry.get('cineExample')).toBe(registered);
    expect(registry.has('cineExample')).toBe(true);
    expect(registry.list()).toEqual(['cineExample']);

    const metadata = registry.describe('cineExample');
    expect(metadata).toMatchObject({ name: 'cineExample', category: 'test' });
    expect(typeof metadata.registeredAt).toBe('number');

    expect(() => registry.register('cineExample', {})).toThrow(/already registered/);
  });

  test('describe reports declared module connections', () => {
    registry.register('cineConnected', { ready: true }, {
      category: 'test',
      description: 'Module with explicit dependencies.',
      connections: [' cineAlpha ', 'cineBeta', 'cineAlpha'],
    });

    const meta = registry.describe('cineConnected');
    expect(meta.connections).toEqual(['cineAlpha', 'cineBeta']);
    expect(Object.isFrozen(meta.connections)).toBe(true);
  });

  test('supports replacing modules explicitly', () => {
    registry.register('cineReplace', { value: 1 }, { freeze: false });
    const replacement = { value: 2 };

    expect(() => registry.register('cineReplace', replacement)).toThrow(/already registered/);

    const updated = registry.register('cineReplace', replacement, { replace: true, freeze: false });
    expect(updated).toBe(replacement);
    expect(registry.get('cineReplace')).toBe(replacement);
  });

  test('assertRegistered reports missing entries', () => {
    registry.register('cineAlpha', { ok: true }, { freeze: false });
    const snapshot = registry.assertRegistered(['cineAlpha', 'cineBeta']);

    expect(snapshot.ok).toBe(false);
    expect(snapshot.missing).toEqual(['cineBeta']);
    expect(snapshot.detail).toEqual({ cineAlpha: true, cineBeta: false });
  });

  test('reset helper requires explicit confirmation', () => {
    expect(() => registry.__internalResetForTests()).toThrow(/requires \{ force: true \}/);
  });

  test('describeAll provides frozen snapshots with filtering options', () => {
    const alpha = registry.register('cineAlpha', { ok: true }, {
      category: 'infrastructure',
      description: 'Alpha module',
    });
    const beta = registry.register('cineBeta', { ok: true }, {
      category: 'feature',
      description: 'Beta module',
      connections: ['cineAlpha'],
    });
    expect(Object.isFrozen(alpha)).toBe(true);
    expect(Object.isFrozen(beta)).toBe(true);

    const allMetadata = registry.describeAll();
    expect(Array.isArray(allMetadata)).toBe(true);
    expect(Object.isFrozen(allMetadata)).toBe(true);
    expect(allMetadata.map((entry) => entry.name)).toEqual(['cineAlpha', 'cineBeta']);
    expect(allMetadata.every((entry) => Object.isFrozen(entry))).toBe(true);

    const featureOnly = registry.describeAll({ category: 'feature' });
    expect(featureOnly).toHaveLength(1);
    expect(Object.isFrozen(featureOnly)).toBe(true);
    expect(featureOnly[0]).toMatchObject({ name: 'cineBeta', category: 'feature' });
    expect(featureOnly[0].connections).toEqual(['cineAlpha']);
    expect(Object.isFrozen(featureOnly[0].connections)).toBe(true);

    const explicitNames = registry.describeAll({ names: ['cineBeta', 'cineMissing'], sort: false });
    expect(explicitNames).toHaveLength(1);
    expect(Object.isFrozen(explicitNames)).toBe(true);
    expect(explicitNames[0].name).toBe('cineBeta');
    expect(explicitNames[0].category).toBe('feature');
  });
});
