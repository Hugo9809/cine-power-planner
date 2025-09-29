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
});
