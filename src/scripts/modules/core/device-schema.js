(function () {
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

  const DEFAULT_DEVICE_SCHEMA_PATH = 'src/data/schema.json';
  const DEFAULT_DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';

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

  const schemaStorage = (() => {
    if (typeof window === 'undefined') return null;
    try {
      if (!('localStorage' in window)) return null;
      const { localStorage } = window;
      const testKey = '__schema_cache__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return localStorage;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Device schema cache disabled', error);
      }
      return null;
    }
  })();

  function loadCachedDeviceSchema() {
    if (!schemaStorage) return null;
    try {
      const raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to read cached device schema', error);
      }
      try {
        schemaStorage.removeItem(DEVICE_SCHEMA_STORAGE_KEY);
      } catch (removeError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to clear invalid cached device schema', removeError);
        }
      }
      return null;
    }
  }

  function persistDeviceSchema(schema) {
    if (!schemaStorage) return;
    try {
      schemaStorage.setItem(DEVICE_SCHEMA_STORAGE_KEY, JSON.stringify(schema));
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to cache device schema', error);
      }
    }
  }

  function isValidDeviceSchema(candidate) {
    return !!candidate && typeof candidate === 'object' && !Array.isArray(candidate);
  }

  async function loadDeviceSchemaFromCacheStorage(path = DEVICE_SCHEMA_PATH) {
    if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
      return null;
    }

    const candidates = new Set([path]);
    if (typeof path === 'string' && !path.startsWith('./')) {
      candidates.add(`./${path}`);
    }

    if (typeof window !== 'undefined' && window && window.location) {
      try {
        candidates.add(new URL(path, window.location.href).toString());
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to resolve schema.json cache URL', error);
        }
      }
    }

    for (const url of candidates) {
      try {
        const response = await caches.match(url, { ignoreSearch: true });
        if (response) {
          return await response.clone().json();
        }
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to read schema.json from cache entry', url, error);
        }
      }
    }

    return null;
  }

  function createPopulateScheduler(populateCategoryOptions) {
    return function schedulePopulateCategoryOptions() {
      const triggerPopulate = () => {
        try {
          populateCategoryOptions();
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('populateCategoryOptions failed during scheduled execution', error);
          }
        }
      };

      if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
        window.setTimeout(triggerPopulate, 0);
      } else if (typeof setTimeout === 'function') {
        setTimeout(triggerPopulate, 0);
      } else {
        triggerPopulate();
      }
    };
  }

  function createDeviceSchemaManager(options = {}) {
    const onSchemaChange =
      options && typeof options.onSchemaChange === 'function'
        ? options.onSchemaChange
        : () => {};

    const populateCategoryOptions =
      options && typeof options.populateCategoryOptions === 'function'
        ? options.populateCategoryOptions
        : () => {
            const scope = detectGlobalScope();
            if (!scope) {
              return;
            }
            let populate = null;
            const preferredKey =
              options && typeof options.populateCategoryOptionsName === 'string'
                ? options.populateCategoryOptionsName
                : 'populateCategoryOptions';
            if (preferredKey && typeof scope[preferredKey] === 'function') {
              populate = scope[preferredKey];
            } else if (typeof scope.populateCategoryOptions === 'function') {
              populate = scope.populateCategoryOptions;
            }
            if (populate) {
              try {
                populate();
              } catch (error) {
                if (typeof console !== 'undefined' && typeof console.error === 'function') {
                  console.error('populateCategoryOptions execution failed', error);
                }
              }
            }
          };

    let cachedSchema = loadCachedDeviceSchema();
    let deviceSchema = cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;

    onSchemaChange(deviceSchema);

    const schedulePopulateCategoryOptions = createPopulateScheduler(populateCategoryOptions);

    function setDeviceSchema(schema) {
      if (isValidDeviceSchema(schema)) {
        deviceSchema = schema;
        cachedSchema = schema;
      } else if (!deviceSchema) {
        deviceSchema = {};
      }
      onSchemaChange(deviceSchema);
      return deviceSchema;
    }

    function finalizeDeviceSchemaLoad(candidate) {
      if (isValidDeviceSchema(candidate)) {
        setDeviceSchema(candidate);
        persistDeviceSchema(candidate);
      } else if (!deviceSchema) {
        setDeviceSchema(cachedSchema || {});
      }

      schedulePopulateCategoryOptions();
    }

    return {
      DEVICE_SCHEMA_PATH,
      DEVICE_SCHEMA_STORAGE_KEY,
      loadCachedDeviceSchema,
      persistDeviceSchema,
      isValidDeviceSchema,
      loadDeviceSchemaFromCacheStorage,
      schedulePopulateCategoryOptions,
      finalizeDeviceSchemaLoad,
      getCachedDeviceSchema: () => (cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null),
      getDeviceSchema: () => deviceSchema,
      setDeviceSchema,
    };
  }

  const namespace = {
    DEVICE_SCHEMA_PATH,
    DEVICE_SCHEMA_STORAGE_KEY,
    loadCachedDeviceSchema,
    persistDeviceSchema,
    isValidDeviceSchema,
    loadDeviceSchemaFromCacheStorage,
    createDeviceSchemaManager,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreDeviceSchema';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (globalScope && typeof globalScope === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (globalScope && typeof globalScope === 'object') {
    const aliasName = 'CORE_DEVICE_SCHEMA';
    try {
      const currentAlias = globalScope[aliasName];
      if (!currentAlias || typeof currentAlias !== 'object') {
        globalScope[aliasName] = existing;
      } else if (currentAlias !== existing) {
        for (const key of Object.keys(existing)) {
          currentAlias[key] = existing[key];
        }
      }
    } catch (aliasError) {
      void aliasError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
