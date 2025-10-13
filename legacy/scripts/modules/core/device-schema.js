function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && _typeof(window) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && _typeof(self) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && _typeof(global) === 'object') {
      return global;
    }
    return null;
  }

  var primaryCoreScope = typeof globalThis !== 'undefined' && globalThis && _typeof(globalThis.CORE_GLOBAL_SCOPE) === 'object' ? globalThis.CORE_GLOBAL_SCOPE : null;
  var CORE_SCOPE = primaryCoreScope && _typeof(primaryCoreScope) === 'object' ? primaryCoreScope : detectGlobalScope();
  var DEFAULT_DEVICE_SCHEMA_PATH = 'src/data/schema.json';
  var DEFAULT_DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
  var DEVICE_SCHEMA_PATH = CORE_SCOPE && _typeof(CORE_SCOPE) === 'object' && typeof CORE_SCOPE.DEVICE_SCHEMA_PATH === 'string' && CORE_SCOPE.DEVICE_SCHEMA_PATH ? CORE_SCOPE.DEVICE_SCHEMA_PATH : DEFAULT_DEVICE_SCHEMA_PATH;
  var DEVICE_SCHEMA_STORAGE_KEY = CORE_SCOPE && _typeof(CORE_SCOPE) === 'object' && typeof CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY === 'string' && CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY ? CORE_SCOPE.DEVICE_SCHEMA_STORAGE_KEY : DEFAULT_DEVICE_SCHEMA_STORAGE_KEY;

  var schemaStorage = function createSchemaStorage() {
    if (typeof window === 'undefined') return null;
    try {
      if (!('localStorage' in window)) return null;
      var localStorage = window.localStorage;
      var testKey = '__schema_cache__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return localStorage;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Device schema cache disabled', error);
      }
      return null;
    }
  }();

  function loadCachedDeviceSchema() {
    if (!schemaStorage) return null;
    try {
      var raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && _typeof(parsed) === 'object' && !Array.isArray(parsed) ? parsed : null;
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
    return !!candidate && _typeof(candidate) === 'object' && !Array.isArray(candidate);
  }

  function loadDeviceSchemaFromCacheStorage() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEVICE_SCHEMA_PATH;
    if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
      return Promise.resolve(null);
    }

    var candidates = new Set([path]);
    if (typeof path === 'string' && !path.startsWith('./')) {
      candidates.add("./".concat(path));
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

    var iterator = candidates.values();

    function readNext() {
      var step = iterator.next();
      if (step.done) {
        return Promise.resolve(null);
      }
      var url = step.value;
      return caches.match(url, { ignoreSearch: true }).then(function (response) {
        if (response) {
          return response.clone().json();
        }
        return readNext();
      }).catch(function (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to read schema.json from cache entry', url, error);
        }
        return readNext();
      });
    }

    return readNext();
  }

  function createPopulateScheduler(populateCategoryOptions) {
    return function schedulePopulateCategoryOptions() {
      var triggerPopulate = function triggerPopulate() {
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

  function createDeviceSchemaManager(options) {
    var settings = _typeof(options) === 'object' && options ? options : {};
    var onSchemaChange = typeof settings.onSchemaChange === 'function' ? settings.onSchemaChange : function () {};
    var populateCategoryOptions = typeof settings.populateCategoryOptions === 'function' ? settings.populateCategoryOptions : function () {
      var scope = detectGlobalScope();
      if (!scope) {
        return;
      }
      var populate = null;
      var preferredKey = typeof settings.populateCategoryOptionsName === 'string' ? settings.populateCategoryOptionsName : 'populateCategoryOptions';
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

    var cachedSchema = loadCachedDeviceSchema();
    var deviceSchema = cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;
    onSchemaChange(deviceSchema);
    var schedulePopulateCategoryOptions = createPopulateScheduler(populateCategoryOptions);

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
      DEVICE_SCHEMA_PATH: DEVICE_SCHEMA_PATH,
      DEVICE_SCHEMA_STORAGE_KEY: DEVICE_SCHEMA_STORAGE_KEY,
      loadCachedDeviceSchema: loadCachedDeviceSchema,
      persistDeviceSchema: persistDeviceSchema,
      isValidDeviceSchema: isValidDeviceSchema,
      loadDeviceSchemaFromCacheStorage: loadDeviceSchemaFromCacheStorage,
      schedulePopulateCategoryOptions: schedulePopulateCategoryOptions,
      finalizeDeviceSchemaLoad: finalizeDeviceSchemaLoad,
      getCachedDeviceSchema: function getCachedDeviceSchema() {
        return cachedSchema && isValidDeviceSchema(cachedSchema) ? cachedSchema : null;
      },
      getDeviceSchema: function getDeviceSchema() {
        return deviceSchema;
      },
      setDeviceSchema: setDeviceSchema
    };
  }

  var namespace = {
    DEVICE_SCHEMA_PATH: DEVICE_SCHEMA_PATH,
    DEVICE_SCHEMA_STORAGE_KEY: DEVICE_SCHEMA_STORAGE_KEY,
    loadCachedDeviceSchema: loadCachedDeviceSchema,
    persistDeviceSchema: persistDeviceSchema,
    isValidDeviceSchema: isValidDeviceSchema,
    loadDeviceSchemaFromCacheStorage: loadDeviceSchemaFromCacheStorage,
    createDeviceSchemaManager: createDeviceSchemaManager
  };

  var globalScope = detectGlobalScope();
  var targetName = 'cineCoreDeviceSchema';
  var existing = globalScope && _typeof(globalScope[targetName]) === 'object' ? globalScope[targetName] : {};

  Object.keys(namespace).forEach(function (key) {
    existing[key] = namespace[key];
  });

  if (globalScope && _typeof(globalScope) === 'object') {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = existing;
  }
})();
