// (function () {
import {
  DEFAULT_DEVICE_SCHEMA_PATH,
  DEFAULT_DEVICE_SCHEMA_STORAGE_KEY,
  loadCachedDeviceSchema,
  persistDeviceSchema,
  isValidDeviceSchema,
  loadDeviceSchemaFromCacheStorage,
  createDeviceSchemaManager
} from '../../../modules/device-schema.js';

function detectGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
    return globalThis;
  }
  if (typeof window !== 'undefined' && window && typeof window === 'object') {
    return window;
  }
  if (typeof self !== 'undefined' && self && typeof self === 'object') {
    return self;
  }
  if (typeof global !== 'undefined' && global && typeof global === 'object') {
    return global;
  }
  return null;
}

const primaryCoreScope =
  typeof globalThis !== 'undefined' &&
    globalThis &&
    typeof globalThis.CORE_GLOBAL_SCOPE === 'object'
    ? globalThis.CORE_GLOBAL_SCOPE
    : null;

const CORE_SCOPE = primaryCoreScope && typeof primaryCoreScope === 'object'
  ? primaryCoreScope
  : detectGlobalScope();

// Resolve paths from global scope or use defaults from module
const DEVICE_SCHEMA_PATH =
  CORE_SCOPE &&
    typeof CORE_SCOPE === 'object' &&
    typeof CORE_SCOPE.DEVICE_SCHEMA_PATH === 'string' &&
    CORE_SCOPE.DEVICE_SCHEMA_PATH
    ? CORE_SCOPE.DEVICE_SCHEMA_PATH
    : DEFAULT_DEVICE_SCHEMA_PATH;

const DEVICE_SCHEMA_STORAGE_KEY =
  CORE_SCOPE &&
    typeof CORE_SCOPE === 'object' &&
    typeof CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY === 'string' &&
    CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY
    ? CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY
    : DEFAULT_DEVICE_SCHEMA_STORAGE_KEY;


const namespace = {
  DEVICE_SCHEMA_PATH,
  DEVICE_SCHEMA_STORAGE_KEY,
  loadCachedDeviceSchema: (key) => loadCachedDeviceSchema(key || DEVICE_SCHEMA_STORAGE_KEY),
  persistDeviceSchema: (schema) => persistDeviceSchema(schema, DEVICE_SCHEMA_STORAGE_KEY),
  isValidDeviceSchema,
  loadDeviceSchemaFromCacheStorage: (path) => loadDeviceSchemaFromCacheStorage(path || DEVICE_SCHEMA_PATH),
  createDeviceSchemaManager: (options) => createDeviceSchemaManager({
    DEVICE_SCHEMA_PATH,
    DEVICE_SCHEMA_STORAGE_KEY,
    ...options
  }),
};

const globalScope = detectGlobalScope();
const targetName = 'cineCoreDeviceSchema';
const aliasName = 'CORE_DEVICE_SCHEMA';

let existingAlias = null;
if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
  try {
    const candidate = globalScope[aliasName];
    if (candidate && typeof candidate === 'object') {
      existingAlias = candidate;
    }
  } catch (readAliasError) {
    void readAliasError;
    existingAlias = null;
  }
}

let existing = existingAlias;
if (!existing || typeof existing !== 'object') {
  if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
    try {
      const candidate = globalScope[targetName];
      if (candidate && typeof candidate === 'object') {
        existing = candidate;
      }
    } catch (readExistingError) {
      void readExistingError;
      existing = null;
    }
  }
}

if (!existing || typeof existing !== 'object') {
  existing = {};
}

for (const key of Object.keys(namespace)) {
  existing[key] = namespace[key];
}

if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
  try {
    globalScope[targetName] = existing;
  } catch (assignError) {
    void assignError;
  }
  try {
    globalScope[aliasName] = existing;
  } catch (assignAliasError) {
    void assignAliasError;
  }
}

// })();

export const cineCoreDeviceSchema = existing;
