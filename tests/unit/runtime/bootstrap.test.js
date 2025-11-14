const path = require('path');

const MODULE_PATH = path.resolve(__dirname, '../../../src/scripts/runtime/bootstrap.js');

describe('runtime/bootstrap', () => {
  function cleanupGlobals() {
    delete global.CORE_GLOBAL_SCOPE;
    delete global.CORE_RUNTIME_STATE;
    delete global.cineCoreRuntimeModuleLoader;
    delete global.gridSnap;
  }

  beforeEach(() => {
    jest.resetModules();
    cleanupGlobals();
  });

  afterEach(() => {
    cleanupGlobals();
  });

  test('fallback resolver reuses global loader when available', () => {
    jest.doMock('../../../src/scripts/modules/core/runtime-module-loader.js', () => null);
    const loader = {
      resolveCoreRuntimeModule: jest.fn(() => 'resolved-value'),
    };
    global.cineCoreRuntimeModuleLoader = loader;
    const runtimeBootstrap = require(MODULE_PATH);
    expect(runtimeBootstrap.fallbackResolveRuntimeModuleLoader()).toBe(loader);
    expect(
      runtimeBootstrap.fallbackRequireCoreRuntimeModule('modules/example.js', { silent: true })
    ).toBe('resolved-value');
    expect(loader.resolveCoreRuntimeModule).toHaveBeenCalledWith('modules/example.js', {
      silent: true,
    });
  });

  test('boot queue attaches to shared global scope', () => {
    global.CORE_GLOBAL_SCOPE = { cineCoreShared: {} };
    const runtimeBootstrap = require(MODULE_PATH);
    const { CORE_BOOT_QUEUE, CORE_BOOT_QUEUE_KEY, enqueueCoreBootTask } = runtimeBootstrap;
    expect(Array.isArray(CORE_BOOT_QUEUE)).toBe(true);
    expect(global.CORE_GLOBAL_SCOPE.cineCoreShared[CORE_BOOT_QUEUE_KEY]).toBe(CORE_BOOT_QUEUE);

    const marker = jest.fn();
    enqueueCoreBootTask(marker);
    expect(CORE_BOOT_QUEUE).toHaveLength(1);
    expect(CORE_BOOT_QUEUE[0]).toBe(marker);
  });

  test('grid snap state normalisation tolerates storage failures', () => {
    const throwingScope = {};
    Object.defineProperty(throwingScope, '__cineGridSnapState', {
      configurable: false,
      enumerable: false,
      get() {
        return undefined;
      },
      set() {
        throw new Error('storage denied');
      },
    });
    Object.defineProperty(throwingScope, 'gridSnap', {
      configurable: false,
      enumerable: false,
      get() {
        return undefined;
      },
      set() {
        throw new Error('legacy write denied');
      },
    });

    global.CORE_GLOBAL_SCOPE = throwingScope;
    global.CORE_RUNTIME_STATE = {
      getScopes: () => [throwingScope, globalThis],
    };

    const runtimeBootstrap = require(MODULE_PATH);
    const { setGridSnapState, getGridSnapState, applyLegacyGridSnapValue } = runtimeBootstrap;

    expect(setGridSnapState(' YES ')).toBe(true);
    expect(setGridSnapState('0')).toBe(false);
    expect(getGridSnapState()).toBe(false);
    expect(applyLegacyGridSnapValue('enabled')).toBe(true);
    expect(getGridSnapState()).toBe(true);
  });
});
