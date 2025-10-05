const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createRequire } = require('module');

const relativeModulePath = '../../src/scripts/modules/environment-context.js';
const absoluteModulePath = path.resolve(__dirname, relativeModulePath);

function loadContextWithOverrides(overrides = {}, sandboxOverrides = {}) {
  const code = fs.readFileSync(absoluteModulePath, 'utf8');
  const baseRequire = createRequire(absoluteModulePath);
  const sandbox = {
    ...sandboxOverrides,
    module: { exports: {} },
    exports: {},
  };

  if (!('globalThis' in sandbox)) {
    sandbox.globalThis = sandbox;
  }
  if (!('global' in sandbox)) {
    sandbox.global = sandbox;
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
      if (error && error.code === 'MODULE_NOT_FOUND' && Object.prototype.hasOwnProperty.call(overrides, request)) {
        return overrides[request];
      }
      throw error;
    }
  };

  vm.runInNewContext(code, sandbox, { filename: absoluteModulePath });
  return { context: sandbox.module.exports, sandbox };
}

function createSystemStub(custom = {}) {
  const stubPrimary = {};
  const stub = {
    detectGlobalScope: jest.fn(() => ('primary' in custom ? custom.primary : stubPrimary)),
    collectCandidateScopes: jest.fn(() => []),
    tryRequire: jest.fn(() => null),
    defineHiddenProperty: jest.fn((target, name, value) => {
      if (target && (typeof target === 'object' || typeof target === 'function')) {
        try {
          Object.defineProperty(target, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value,
          });
          return true;
        } catch (error) {
          void error;
        }
        try {
          target[name] = value;
          return true;
        } catch (assignmentError) {
          void assignmentError;
        }
      }
      return false;
    }),
    resolveFromScopes: jest.fn(() => null),
    getArchitecture: jest.fn(() => null),
  };

  return Object.assign(stub, custom);
}

describe('environment-context', () => {
  afterEach(() => {
    delete global.cineModuleEnvironmentContext;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('defines a non-enumerable environment context on the global scope', () => {
    const context = require(relativeModulePath);
    const descriptor = Object.getOwnPropertyDescriptor(global, 'cineModuleEnvironmentContext');

    expect(descriptor).toBeDefined();
    expect(descriptor.enumerable).toBe(false);
    expect(descriptor.value).toBe(context);
  });

  test('falls back to collecting candidate scopes when the module system returns no scopes', () => {
    const fakePrimary = { marker: 'primary' };
    const systemStub = createSystemStub({
      primary: fakePrimary,
      detectGlobalScope: jest.fn(() => fakePrimary),
      collectCandidateScopes: jest.fn(() => null),
    });

    const { context, sandbox } = loadContextWithOverrides({
      './system.js': systemStub,
      './architecture.js': null,
    });

    const scopes = context.collectCandidateScopes(fakePrimary);

    expect(systemStub.collectCandidateScopes).toHaveBeenCalledWith(fakePrimary);
    expect(scopes).toEqual(expect.arrayContaining([fakePrimary, sandbox.globalThis]));
  });

  test('resolves the module registry via the environment bridge when direct sources are unavailable', () => {
    const registryMock = { name: 'registry' };
    const bridgeScope = {};

    const systemStub = createSystemStub({
      primary: bridgeScope,
      detectGlobalScope: jest.fn(() => bridgeScope),
      collectCandidateScopes: jest.fn(() => [bridgeScope]),
    });

    const moduleGlobalsStub = {
      resolveModuleRegistry: jest.fn(() => null),
      getModuleRegistry: jest.fn(() => null),
    };

    const environmentStub = {
      resolveModuleRegistry: jest.fn(() => null),
      getGlobalScope: jest.fn(() => bridgeScope),
    };

    const environmentBridgeStub = {
      getGlobalScope: jest.fn(() => bridgeScope),
      getModuleRegistry: jest.fn(() => registryMock),
    };

    const { context } = loadContextWithOverrides({
      './system.js': systemStub,
      './architecture.js': null,
      './globals.js': moduleGlobalsStub,
      './environment.js': environmentStub,
      './environment-bridge.js': environmentBridgeStub,
      './registry.js': null,
    });

    const resolved = context.resolveModuleRegistry();

    expect(environmentBridgeStub.getModuleRegistry).toHaveBeenCalled();
    expect(resolved).toBe(registryMock);
  });

  test('falls back to native require when the module system returns undefined', () => {
    const nativePath = require('path');
    const systemStub = createSystemStub({
      tryRequire: jest.fn(() => undefined),
    });

    const { context } = loadContextWithOverrides({
      './system.js': systemStub,
      './architecture.js': null,
    });

    const result = context.tryRequire('path');

    expect(systemStub.tryRequire).toHaveBeenCalledWith('path');
    expect(result).toBe(nativePath);
  });
});
