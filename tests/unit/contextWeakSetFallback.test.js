const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createRequire } = require('module');

const relativeModulePath = '../../src/scripts/modules/context.js';
const absoluteModulePath = path.resolve(__dirname, relativeModulePath);

function loadContextWithOverrides(overrides = {}, sandboxOverrides = {}) {
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

  const injectedCaches = [];
  const resolvedOverrides = new Map();

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

  if (!('globalThis' in sandbox)) {
    sandbox.globalThis = sandbox;
  }
  if (!('global' in sandbox)) {
    sandbox.global = sandbox;
  }
  if (!('self' in sandbox)) {
    sandbox.self = sandbox;
  }
  if (!('console' in sandbox)) {
    sandbox.console = console;
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
    return { context: sandbox.module.exports, sandbox };
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

describe('context module legacy freeze fallback', () => {
  afterEach(() => {
    delete global.cineModuleContext;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('deep freeze still operates when WeakSet is unavailable', () => {
    const overrides = {
      './architecture.js': null,
      './architecture-helpers.js': null,
      './system.js': null,
      './base.js': {
        PENDING_QUEUE_KEY: '__testPending__',
        registerOrQueueModule() {
          return false;
        },
      },
      './globals.js': null,
      './environment.js': null,
      './environment-bridge.js': null,
      './registry.js': {
        register() {
          return undefined;
        },
      },
    };

    const { context, sandbox } = loadContextWithOverrides(overrides, { WeakSet: undefined });

    expect(context).toBeDefined();
    expect(sandbox.cineModuleContext).toBe(context);

    const payload = { nested: { value: 1 } };
    const result = context.freezeDeep(payload);

    expect(result).toBe(payload);
    expect(Object.isFrozen(payload)).toBe(true);
    expect(Object.isFrozen(payload.nested)).toBe(true);

    const circular = {};
    circular.self = circular;

    expect(() => context.freezeDeep(circular)).not.toThrow();
    expect(Object.isFrozen(circular)).toBe(true);
  });
});
