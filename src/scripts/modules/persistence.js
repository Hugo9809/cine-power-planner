(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const FALLBACK_SCOPE = detectGlobalScope();

  function loadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = [scope];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  const MODULE_ENV = loadModuleEnvironment(FALLBACK_SCOPE);

  const GLOBAL_SCOPE = MODULE_ENV && typeof MODULE_ENV.getGlobalScope === 'function'
    ? MODULE_ENV.getGlobalScope() || FALLBACK_SCOPE
    : FALLBACK_SCOPE;

  const tryRequire = MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function'
    ? MODULE_ENV.tryRequire
    : function tryRequire(modulePath) {
        if (typeof require !== 'function') {
          return null;
        }

        try {
          return require(modulePath);
        } catch (error) {
          void error;
          return null;
        }
      };

  function resolveModuleRegistry(scope) {
    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(scope || GLOBAL_SCOPE);
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [scope || GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = (function () {
    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        const provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  })();

  const PENDING_QUEUE_KEY = MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string'
    ? MODULE_ENV.PENDING_QUEUE_KEY
    : '__cinePendingModuleRegistrations__';

  function queueModuleRegistration(name, api, options) {
    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }

    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze({ ...(options || {}) }),
    });

    let queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: [],
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  const registerOrQueueModule = MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function'
    ? function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      }
    : function registerOrQueueModule(name, api, options, onError) {
        if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
          try {
            MODULE_REGISTRY.register(name, api, options);
            return true;
          } catch (error) {
            if (typeof onError === 'function') {
              onError(error);
            } else {
              void error;
            }
          }
        }

        queueModuleRegistration(name, api, options);
        return false;
      };

  const freezeDeep = MODULE_ENV && typeof MODULE_ENV.freezeDeep === 'function'
    ? MODULE_ENV.freezeDeep
    : function freezeDeep(value, seen = new WeakSet()) {
        if (!value || typeof value !== 'object') {
          return value;
        }

        if (seen.has(value)) {
          return value;
        }

        seen.add(value);

        const keys = Object.getOwnPropertyNames(value);
        for (let index = 0; index < keys.length; index += 1) {
          const key = keys[index];
          const descriptor = Object.getOwnPropertyDescriptor(value, key);
          if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
            continue;
          }
          freezeDeep(descriptor.value, seen);
        }

        return Object.freeze(value);
      };

  const exposeGlobal = MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function'
    ? function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      }
    : function exposeGlobal(name, value) {
        if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
          return false;
        }
        try {
          Object.defineProperty(GLOBAL_SCOPE, name, {
            configurable: true,
            enumerable: false,
            value,
            writable: false,
          });
          return true;
        } catch (error) {
          void error;
          try {
            GLOBAL_SCOPE[name] = value;
            return true;
          } catch (assignmentError) {
            void assignmentError;
            return false;
          }
        }
      };

  const providerModules = [];

  function addProviderModule(reference, label) {
    if (!reference || typeof reference !== 'object') {
      return;
    }

    providerModules.push({
      ref: reference,
      name: label || null,
    });
  }

  addProviderModule(GLOBAL_SCOPE, 'global');

  const storageModule = tryRequire('../storage.js');
  if (storageModule && typeof storageModule === 'object') {
    addProviderModule(storageModule, 'storage');
  }

  const sessionModule = tryRequire('../app-session.js');
  if (sessionModule && typeof sessionModule === 'object') {
    addProviderModule(sessionModule, 'session');
  }

  const setupsModule = tryRequire('../app-setups.js');
  if (setupsModule && typeof setupsModule === 'object') {
    addProviderModule(setupsModule, 'setups');
  }

  const bindingState = Object.create(null);
  const bindingNames = [];

  function identifyProvider(providerEntry) {
    if (!providerEntry) {
      return null;
    }

    if (providerEntry.name) {
      return providerEntry.name;
    }

    const ref = providerEntry.ref;
    if (!ref || typeof ref !== 'object') {
      return null;
    }

    if (ref === GLOBAL_SCOPE) {
      return 'global';
    }

    if (typeof ref.constructor === 'function' && ref.constructor.name) {
      return ref.constructor.name;
    }

    return null;
  }

  function ensureBindingEntry(bindingKey, implementationName) {
    const key = String(bindingKey);
    let entry = bindingState[key];
    if (!entry) {
      entry = {
        name: key,
        implementationName: implementationName || key,
        available: false,
        providerIndex: -1,
        providerName: null,
        lastChecked: null,
        implementation: null,
      };
      bindingState[key] = entry;
      bindingNames.push(key);
    } else if (implementationName && entry.implementationName !== implementationName) {
      entry.implementationName = implementationName;
    }

    return entry;
  }

  function resolveBinding(name, options = {}) {
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;

    const entry = ensureBindingEntry(name);
    const implementationName = entry.implementationName || String(name);
    if (!refresh && entry.implementation && typeof entry.implementation === 'function') {
      return entry;
    }

    let resolved = null;

    for (let index = 0; index < providerModules.length; index += 1) {
      const providerEntry = providerModules[index];
      const provider = providerEntry && providerEntry.ref;
      if (!provider || typeof provider !== 'object') {
        continue;
      }

      const candidate = provider[implementationName];
      if (typeof candidate === 'function') {
        resolved = {
          implementation: candidate,
          providerIndex: index,
          providerName: identifyProvider(providerEntry),
        };
        break;
      }
    }

    entry.available = !!resolved;
    entry.providerIndex = resolved ? resolved.providerIndex : -1;
    entry.providerName = resolved ? resolved.providerName : null;
    entry.lastChecked = Date.now();
    entry.implementation = resolved ? resolved.implementation : null;

    return entry;
  }

  function requireBinding(name) {
    const detail = resolveBinding(name, { refresh: true });
    if (!detail || typeof detail.implementation !== 'function') {
      const error = new Error(`cinePersistence could not resolve function "${name}".`);
      error.code = 'CINE_PERSISTENCE_BINDING_MISSING';
      error.binding = name;
      error.detail = {
        name,
        available: detail ? detail.available : false,
        providerName: detail ? detail.providerName : null,
      };
      throw error;
    }
    return detail.implementation;
  }

  function snapshotBinding(detail) {
    if (!detail) {
      return null;
    }

    return Object.freeze({
      name: detail.name,
      available: !!detail.available,
      providerIndex: typeof detail.providerIndex === 'number' ? detail.providerIndex : -1,
      providerName: detail.providerName || null,
      lastChecked: detail.lastChecked || null,
      implementation: detail.implementationName || detail.name,
    });
  }

  function createWrapper(name, alias) {
    const bindingKey = alias || name;
    ensureBindingEntry(bindingKey, name);
    return function persistenceWrapper() {
      const fn = requireBinding(bindingKey);
      return fn.apply(this, arguments);
    };
  }

  function inspectBinding(name, options = {}) {
    const normalized = String(name);
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;
    const detail = resolveBinding(normalized, { refresh });
    return snapshotBinding(detail);
  }

  function inspectAllBindings(options = {}) {
    const refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh')
      ? options.refresh
      : true;

    if (refresh) {
      for (let index = 0; index < bindingNames.length; index += 1) {
        resolveBinding(bindingNames[index], { refresh: true });
      }
    }

    const snapshot = {};
    for (let index = 0; index < bindingNames.length; index += 1) {
      const name = bindingNames[index];
      snapshot[name] = snapshotBinding(bindingState[name]);
    }
    return freezeDeep(snapshot);
  }

  function listBindings() {
    return bindingNames.slice();
  }

  const persistenceAPI = {
    storage: {
      loadDeviceData: createWrapper('loadDeviceData'),
      saveDeviceData: createWrapper('saveDeviceData'),
      loadSetups: createWrapper('loadSetups'),
      saveSetups: createWrapper('saveSetups'),
      saveSetup: createWrapper('saveSetup'),
      loadSetup: createWrapper('loadSetup'),
      deleteSetup: createWrapper('deleteSetup'),
      renameSetup: createWrapper('renameSetup'),
      loadSessionState: createWrapper('loadSessionState'),
      saveSessionState: createWrapper('saveSessionState'),
      loadFeedback: createWrapper('loadFeedback'),
      saveFeedback: createWrapper('saveFeedback'),
      saveProject: createWrapper('saveProject'),
      loadProject: createWrapper('loadProject'),
      deleteProject: createWrapper('deleteProject'),
      loadFavorites: createWrapper('loadFavorites'),
      saveFavorites: createWrapper('saveFavorites'),
      exportAllData: createWrapper('exportAllData'),
      importAllData: createWrapper('importAllData'),
      clearAllData: createWrapper('clearAllData'),
      loadAutoGearRules: createWrapper('loadAutoGearRules'),
      saveAutoGearRules: createWrapper('saveAutoGearRules'),
      loadAutoGearBackups: createWrapper('loadAutoGearBackups'),
      saveAutoGearBackups: createWrapper('saveAutoGearBackups'),
      loadAutoGearSeedFlag: createWrapper('loadAutoGearSeedFlag'),
      saveAutoGearSeedFlag: createWrapper('saveAutoGearSeedFlag'),
      loadAutoGearBackupRetention: createWrapper('loadAutoGearBackupRetention'),
      saveAutoGearBackupRetention: createWrapper('saveAutoGearBackupRetention'),
      getAutoGearBackupRetentionDefault: createWrapper('getAutoGearBackupRetentionDefault'),
      loadAutoGearPresets: createWrapper('loadAutoGearPresets'),
      saveAutoGearPresets: createWrapper('saveAutoGearPresets'),
      loadAutoGearActivePresetId: createWrapper('loadAutoGearActivePresetId'),
      saveAutoGearActivePresetId: createWrapper('saveAutoGearActivePresetId'),
      loadAutoGearAutoPresetId: createWrapper('loadAutoGearAutoPresetId'),
      saveAutoGearAutoPresetId: createWrapper('saveAutoGearAutoPresetId'),
      loadAutoGearMonitorDefaults: createWrapper('loadAutoGearMonitorDefaults'),
      saveAutoGearMonitorDefaults: createWrapper('saveAutoGearMonitorDefaults'),
      loadAutoGearBackupVisibility: createWrapper('loadAutoGearBackupVisibility'),
      saveAutoGearBackupVisibility: createWrapper('saveAutoGearBackupVisibility'),
      loadFullBackupHistory: createWrapper('loadFullBackupHistory'),
      saveFullBackupHistory: createWrapper('saveFullBackupHistory'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
      requestPersistentStorage: createWrapper('requestPersistentStorage'),
      clearUiCacheStorageEntries: createWrapper('clearUiCacheStorageEntries'),
      ensureCriticalStorageBackups: createWrapper('ensureCriticalStorageBackups'),
      getLastCriticalStorageGuardResult: createWrapper('getLastCriticalStorageGuardResult'),
    },
    autosave: {
      saveSession: createWrapper('saveCurrentSession', 'saveSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup', 'autoSaveSetup'),
      saveGearList: createWrapper('saveCurrentGearList', 'saveGearList'),
      restoreSessionState: createWrapper('restoreSessionState'),
    },
    backups: {
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload', 'downloadPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
    },
    restore: {
      proceed: createWrapper('handleRestoreRehearsalProceed', 'proceed'),
      abort: createWrapper('handleRestoreRehearsalAbort', 'abort'),
    },
    share: {
      downloadProject: createWrapper('downloadSharedProject', 'downloadProject'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl'),
    },
    __internal: freezeDeep({
      listBindings,
      inspectBinding(name, options) {
        return inspectBinding(name, options) || null;
      },
      inspectAllBindings,
    }),
  };

  freezeDeep(persistenceAPI);

  registerOrQueueModule('cinePersistence', persistenceAPI, {
    category: 'persistence',
    description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
    replace: true,
  });

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    let existingPersistence = null;
    try {
      existingPersistence = GLOBAL_SCOPE.cinePersistence || null;
    } catch (error) {
      void error;
      existingPersistence = null;
    }

    if (existingPersistence !== persistenceAPI) {
      const exposed = exposeGlobal('cinePersistence', persistenceAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose cinePersistence globally.');
      }
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = persistenceAPI;
  }
})();
