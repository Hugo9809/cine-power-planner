const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createRequire } = require('module');

const relativeModulePath = '../../src/scripts/modules/base.js';
const absoluteModulePath = path.resolve(__dirname, relativeModulePath);

function loadBaseModuleWithOverrides(overrides = {}, sandboxOverrides = {}) {
  const code = fs.readFileSync(absoluteModulePath, 'utf8');
  const baseRequire = createRequire(absoluteModulePath);

  const sandbox = {
    ...sandboxOverrides,
    module: { exports: {} },
    exports: {},
    Object,
    Array,
    Number,
    Boolean,
    String,
    Symbol,
    Math,
    JSON,
    Reflect,
    Date,
    RegExp,
    Error,
    TypeError,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  };

  const resolvedOverrides = new Map();
  const injectedCaches = [];

  Object.keys(overrides).forEach((request) => {
    try {
      const resolved = baseRequire.resolve(request);
      if (!resolvedOverrides.has(resolved)) {
        resolvedOverrides.set(resolved, overrides[request]);
        if (!Object.prototype.hasOwnProperty.call(overrides, resolved)) {
          overrides[resolved] = overrides[request];
        }
      }
    } catch (error) {
      void error;
    }
  });

  resolvedOverrides.forEach((value, resolved) => {
    injectedCaches.push({
      id: resolved,
      previous: require.cache[resolved],
    });

    require.cache[resolved] = {
      id: resolved,
      filename: resolved,
      loaded: true,
      exports: value,
    };
  });

  if (!('console' in sandbox)) {
    sandbox.console = console;
  }
  if (!('globalThis' in sandbox)) {
    sandbox.globalThis = sandbox;
  }
  if (!('global' in sandbox)) {
    sandbox.global = sandbox;
  }
  if (!('self' in sandbox)) {
    sandbox.self = sandbox;
  }
  if (!('window' in sandbox)) {
    sandbox.window = sandbox;
  }

  sandbox.require = (request) => {
    if (Object.prototype.hasOwnProperty.call(overrides, request)) {
      return overrides[request];
    }

    try {
      const resolved = baseRequire.resolve(request);
      if (Object.prototype.hasOwnProperty.call(overrides, resolved)) {
        return overrides[resolved];
      }
      return baseRequire(request);
    } catch (error) {
      if (
        error &&
        error.code === 'MODULE_NOT_FOUND' &&
        Object.prototype.hasOwnProperty.call(overrides, request)
      ) {
        return overrides[request];
      }
      throw error;
    }
  };

  try {
    vm.runInNewContext(code, sandbox, { filename: absoluteModulePath });
    return { api: sandbox.module.exports, sandbox };
  } finally {
    for (let index = 0; index < injectedCaches.length; index += 1) {
      const { id, previous } = injectedCaches[index];
      if (previous) {
        require.cache[id] = previous;
      } else {
        delete require.cache[id];
      }
    }
  }
}

describe('base module freezeDeep legacy fallback', () => {
  afterEach(() => {
    delete global.cineModuleBase;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('deep freeze works when WeakSet is unavailable', () => {
    const overrides = {
      './helpers/scope-collector.js': null,
      './helpers/immutability-builtins.js': null,
      './architecture-kernel.js': null,
    };

    const { api, sandbox } = loadBaseModuleWithOverrides(overrides, { WeakSet: undefined });

    expect(api).toBeDefined();
    expect(typeof api.freezeDeep).toBe('function');
    expect(sandbox.cineModuleBase).toBe(api);

    const payload = { nested: { value: 7 } };
    const result = api.freezeDeep(payload);

    expect(result).toBe(payload);
    expect(payload.nested.value).toBe(7);

    const circular = {};
    circular.self = circular;

    expect(() => api.freezeDeep(circular)).not.toThrow();
    expect(circular.self).toBe(circular);
  });
});
