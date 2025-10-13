'use strict';

describe('storage deep clone resilience', () => {
  let originalStructuredClone;
  let originalDeepClone;
  let originalStorageApi;
  let originalStorageInitialized;
  let originalForceReinit;

  beforeEach(() => {
    jest.resetModules();

    originalStructuredClone = global.structuredClone;
    originalDeepClone = global.__cineDeepClone;
    originalStorageApi = global.__cineStorageApi;
    originalStorageInitialized = global.__cineStorageInitialized;
    originalForceReinit = process.env.CINE_FORCE_STORAGE_REINIT;

    delete global.__cineDeepClone;
    delete global.__cineStorageApi;
    delete global.__cineStorageInitialized;

    process.env.CINE_FORCE_STORAGE_REINIT = '1';
  });

  afterEach(() => {
    if (typeof originalStructuredClone === 'undefined') {
      delete global.structuredClone;
    } else {
      global.structuredClone = originalStructuredClone;
    }

    if (typeof originalDeepClone === 'undefined') {
      delete global.__cineDeepClone;
    } else {
      global.__cineDeepClone = originalDeepClone;
    }

    if (typeof originalStorageApi === 'undefined') {
      delete global.__cineStorageApi;
    } else {
      global.__cineStorageApi = originalStorageApi;
    }

    if (typeof originalStorageInitialized === 'undefined') {
      delete global.__cineStorageInitialized;
    } else {
      global.__cineStorageInitialized = originalStorageInitialized;
    }

    if (typeof originalForceReinit === 'undefined') {
      delete process.env.CINE_FORCE_STORAGE_REINIT;
    } else {
      process.env.CINE_FORCE_STORAGE_REINIT = originalForceReinit;
    }

    jest.resetModules();
  });

  it('prefers structuredClone when the runtime provides it', () => {
    const structuredCloneMock = jest.fn((value) => {
      if (!value || typeof value !== 'object') {
        return value;
      }
      return Array.isArray(value) ? value.slice() : { ...value };
    });

    global.structuredClone = structuredCloneMock;

    const storageModule = require('../../src/scripts/storage.js');

    expect(storageModule).toBeDefined();
    expect(typeof global.__cineDeepClone).toBe('function');

    const source = { value: 42 };
    const clone = global.__cineDeepClone(source);

    expect(structuredCloneMock).toHaveBeenCalledTimes(1);
    expect(structuredCloneMock).toHaveBeenCalledWith(source);
    expect(clone).not.toBe(source);
    expect(clone).toEqual(source);
  });

  it('falls back to JSON cloning when structuredClone throws', () => {
    const structuredCloneMock = jest.fn(() => {
      throw new Error('structuredClone failure');
    });

    global.structuredClone = structuredCloneMock;

    const storageModule = require('../../src/scripts/storage.js');

    expect(storageModule).toBeDefined();
    expect(typeof global.__cineDeepClone).toBe('function');

    const source = { nested: { value: 'backup' } };
    const clone = global.__cineDeepClone(source);

    expect(structuredCloneMock).toHaveBeenCalledTimes(1);
    expect(structuredCloneMock).toHaveBeenCalledWith(source);
    expect(clone).not.toBe(source);
    expect(clone).toEqual(source);
    expect(clone.nested).not.toBe(source.nested);
  });

  it('recovers with manual deep cloning when JSON serialization fails', () => {
    const structuredCloneMock = jest.fn(() => {
      throw new Error('structuredClone failure');
    });

    const jsonStringifySpy = jest.spyOn(JSON, 'stringify');

    global.structuredClone = structuredCloneMock;

    try {
      const storageModule = require('../../src/scripts/storage.js');

      expect(storageModule).toBeDefined();
      expect(typeof global.__cineDeepClone).toBe('function');

      const source = { name: 'loop' };
      source.self = source;

      const clone = global.__cineDeepClone(source);

      expect(structuredCloneMock).toHaveBeenCalledTimes(1);
      expect(jsonStringifySpy).toHaveBeenCalled();
      expect(clone).not.toBe(source);
      expect(clone.name).toBe('loop');
      expect(clone.self).toBe(clone);
    } finally {
      jsonStringifySpy.mockRestore();
    }
  });
});
