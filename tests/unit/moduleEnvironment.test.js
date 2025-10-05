const path = require('path');

describe('module environment', () => {
  let environment;

  beforeEach(() => {
    jest.resetModules();
    const modulePath = path.resolve(__dirname, '../../src/scripts/modules/environment.js');
    const basePath = path.resolve(__dirname, '../../src/scripts/modules/base.js');

    jest.isolateModules(() => {
      jest.doMock(basePath, () => ({
        getModuleBase: () => null,
        getGlobalScope: () => global,
        collectCandidateScopes: () => [global],
        tryRequire: () => null,
        resolveModuleRegistry: () => null,
        getModuleRegistry: () => null,
        queueModuleRegistration: () => true,
        registerOrQueueModule: () => true,
        freezeDeep: value => value,
        safeWarn: jest.fn(),
        exposeGlobal: jest.fn(),
        PENDING_QUEUE_KEY: '__mockPending__',
      }), { virtual: true });

      environment = require(modulePath);
    });
  });

  test('scoped environments expose the provided scope without freezing it', () => {
    const scope = {};
    Object.defineProperty(scope, 'mutable', {
      configurable: true,
      enumerable: true,
      value: 1,
      writable: true,
    });

    const scoped = environment.createScopedEnvironment({ scope });

    expect(scoped.scope).toBe(scope);
    expect(Object.isFrozen(scope)).toBe(false);

    scope.mutable = 2;
    expect(scope.mutable).toBe(2);

    expect(() => {
      delete scope.mutable;
    }).not.toThrow();
    expect(Object.prototype.hasOwnProperty.call(scope, 'mutable')).toBe(false);
  });

  test('scoped environments reuse provided registries and do not mutate them', () => {
    const registry = { register: jest.fn() };
    const scoped = environment.createScopedEnvironment({ registry });

    expect(scoped.registry).toBe(registry);
    expect(Object.isFrozen(registry)).toBe(false);
    expect(() => {
      registry.register('example', {});
    }).not.toThrow();
  });
});
