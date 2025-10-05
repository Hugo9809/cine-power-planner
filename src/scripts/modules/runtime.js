(function () {
  function fallbackDetectGlobalScope() {
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

  function fallbackCollectCandidateScopes(primary) {
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  function fallbackLoadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  function fallbackResolveModuleGlobals(scope) {
    if (typeof require === 'function') {
      try {
        const required = require('./globals.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
  }

  function fallbackTryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveModuleSystem(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./system.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleSystem === 'object') {
      return targetScope.cineModuleSystem;
    }

    return null;
  }

  const MODULE_SYSTEM = resolveModuleSystem(LOCAL_SCOPE);

  function resolveEnvironmentContext(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./environment-context.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleEnvironmentContext === 'object') {
      return targetScope.cineModuleEnvironmentContext;
    }

    return null;
  }

  const ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);

  function detectWithContext() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function') {
      try {
        const detected = ENVIRONMENT_CONTEXT.detectGlobalScope();
        if (detected) {
          return detected;
        }
      } catch (error) {
        void error;
      }
    }
    return fallbackDetectGlobalScope();
  }

  const detectGlobalScope =
    MODULE_SYSTEM && typeof MODULE_SYSTEM.detectGlobalScope === 'function'
      ? function detectWithSystem() {
          try {
            const detected = MODULE_SYSTEM.detectGlobalScope();
            if (detected) {
              return detected;
            }
          } catch (error) {
            void error;
          }
          return detectWithContext();
        }
      : detectWithContext;

  const PRIMARY_SCOPE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function'
      ? ENVIRONMENT_CONTEXT.getPrimaryScope()
      : null)
    || detectGlobalScope();

  const GLOBAL_SCOPE = (function resolveGlobalScope() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getGlobalScope === 'function') {
      try {
        const resolved = MODULE_SYSTEM.getGlobalScope(PRIMARY_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function') {
      try {
        const scoped = ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE);
        if (scoped) {
          return scoped;
        }
      } catch (error) {
        void error;
      }
    }

    return PRIMARY_SCOPE;
  })();

  function collectCandidateScopes(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.collectCandidateScopes === 'function') {
      try {
        const scopes = MODULE_SYSTEM.collectCandidateScopes(targetScope);
        if (Array.isArray(scopes) && scopes.length > 0) {
          return scopes;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.collectCandidateScopes === 'function') {
      try {
        const fromContext = ENVIRONMENT_CONTEXT.collectCandidateScopes(targetScope);
        if (Array.isArray(fromContext) && fromContext.length > 0) {
          return fromContext;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(targetScope);
  }

  const MODULE_ENV =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE)
      : null)
    || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);

  const ENV_BRIDGE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function'
      ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE)
      : null)
    || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);

  const MODULE_GLOBALS =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE)
      : null)
    || fallbackResolveModuleGlobals(GLOBAL_SCOPE);

  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }

    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }

  const tryRequire = (function resolveTryRequire() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.tryRequire === 'function') {
      return function tryRequireWithSystem(modulePath) {
        const result = MODULE_SYSTEM.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        const result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        const result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }

    return fallbackTryRequire;
  })();

  function fallbackResolveModuleRegistry(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        const resolved = MODULE_GLOBALS.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(targetScope);
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(targetScope);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function resolveModuleRegistry(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        const resolved = MODULE_SYSTEM.getModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        const resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackResolveModuleRegistry(targetScope);
  }

  const MODULE_REGISTRY = (function () {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getModuleRegistry === 'function') {
      try {
        const viaSystem = MODULE_SYSTEM.getModuleRegistry(GLOBAL_SCOPE);
        if (viaSystem) {
          return viaSystem;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        const shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

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

  const PENDING_QUEUE_KEY = (function resolvePendingKey() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.getPendingQueueKey === 'function') {
      try {
        const systemKey = MODULE_SYSTEM.getPendingQueueKey();
        if (typeof systemKey === 'string' && systemKey) {
          return systemKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        const sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        const bridgedKey = ENV_BRIDGE.getPendingQueueKey();
        if (typeof bridgedKey === 'string' && bridgedKey) {
          return bridgedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string') {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }

    return '__cinePendingModuleRegistrations__';
  })();

  function cloneOptions(options) {
    if (!options || typeof options !== 'object') {
      return {};
    }

    const copy = {};
    const keys = Object.keys(options);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      copy[key] = options[key];
    }

    return copy;
  }

  function queueModuleRegistration(name, api, options) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.queueModuleRegistration === 'function') {
      try {
        if (MODULE_SYSTEM.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      try {
        if (MODULE_GLOBALS.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        const bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (bridged) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }

    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze(cloneOptions(options)),
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

  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      const registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
      if (registered) {
        informModuleGlobals(name, api);
        return true;
      }
      return false;
    }

    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void error;
        }
      }
    }

    queueModuleRegistration(name, api, options);
    return false;
  }

  const registerOrQueueModule = (function resolveRegisterOrQueue() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.registerModule === 'function') {
      return function registerWithSystem(name, api, options, onError) {
        const registered = MODULE_SYSTEM.registerModule(name, api, options, GLOBAL_SCOPE, onError);
        if (registered) {
          informModuleGlobals(name, api);
          return true;
        }
        return false;
      };
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const registered = MODULE_GLOBALS.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            GLOBAL_SCOPE,
            MODULE_REGISTRY,
          );
          if (registered) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (bridged) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      };
    }

    return fallbackRegisterOrQueue;
  })();

  function fallbackFreezeDeep(value, seen = new WeakSet()) {
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
      fallbackFreezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const freezeDeep = (function resolveFreezeDeep() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.freezeDeep === 'function') {
      return MODULE_SYSTEM.freezeDeep;
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.freezeDeep === 'function') {
      return MODULE_GLOBALS.freezeDeep;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.freezeDeep === 'function') {
      return function bridgeFreezeDeep(value, seen) {
        try {
          return ENV_BRIDGE.freezeDeep(value, seen);
        } catch (error) {
          void error;
          return fallbackFreezeDeep(value, seen);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.freezeDeep === 'function') {
      return MODULE_ENV.freezeDeep;
    }

    return fallbackFreezeDeep;
  })();

  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }

    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }

  const safeWarn = (function resolveSafeWarn() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.safeWarn === 'function') {
      return MODULE_SYSTEM.safeWarn;
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return MODULE_GLOBALS.safeWarn;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.safeWarn === 'function') {
      return function bridgeSafeWarn(message, detail) {
        try {
          ENV_BRIDGE.safeWarn(message, detail);
        } catch (error) {
          void error;
          fallbackSafeWarn(message, detail);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function') {
      return MODULE_ENV.safeWarn;
    }

    return fallbackSafeWarn;
  })();

  function fallbackExposeGlobal(name, value) {
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
  }

  const exposeGlobal = (function resolveExposeGlobal() {
    if (MODULE_SYSTEM && typeof MODULE_SYSTEM.exposeGlobal === 'function') {
      return function exposeWithSystem(name, value, options) {
        try {
          return MODULE_SYSTEM.exposeGlobal(name, value, GLOBAL_SCOPE, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function moduleGlobalsExpose(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      return function bridgeExposeGlobal(name, value, options) {
        try {
          return ENV_BRIDGE.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      };
    }

    return fallbackExposeGlobal;
  })();

  const MODULE_NAMES = ['cinePersistence', 'cineOffline', 'cineUi'];

  const REQUIRED_PERSISTENCE_FUNCTIONS = [
    'storage.loadDeviceData',
    'storage.saveDeviceData',
    'storage.loadSetups',
    'storage.saveSetups',
    'storage.saveSetup',
    'storage.loadSetup',
    'storage.deleteSetup',
    'storage.renameSetup',
    'storage.loadSessionState',
    'storage.saveSessionState',
    'storage.saveProject',
    'storage.loadProject',
    'storage.deleteProject',
    'storage.exportAllData',
    'storage.importAllData',
    'storage.clearAllData',
    'storage.loadFavorites',
    'storage.saveFavorites',
    'storage.loadFeedback',
    'storage.saveFeedback',
    'storage.loadAutoGearRules',
    'storage.saveAutoGearRules',
    'storage.loadAutoGearBackups',
    'storage.saveAutoGearBackups',
    'storage.loadAutoGearSeedFlag',
    'storage.saveAutoGearSeedFlag',
    'storage.loadAutoGearBackupRetention',
    'storage.saveAutoGearBackupRetention',
    'storage.getAutoGearBackupRetentionDefault',
    'storage.loadAutoGearPresets',
    'storage.saveAutoGearPresets',
    'storage.loadAutoGearActivePresetId',
    'storage.saveAutoGearActivePresetId',
    'storage.loadAutoGearAutoPresetId',
    'storage.saveAutoGearAutoPresetId',
    'storage.loadAutoGearMonitorDefaults',
    'storage.saveAutoGearMonitorDefaults',
    'storage.loadAutoGearBackupVisibility',
    'storage.saveAutoGearBackupVisibility',
    'storage.loadFullBackupHistory',
    'storage.saveFullBackupHistory',
    'storage.recordFullBackupHistoryEntry',
    'storage.requestPersistentStorage',
    'storage.clearUiCacheStorageEntries',
    'storage.ensureCriticalStorageBackups',
    'storage.getLastCriticalStorageGuardResult',
    'autosave.saveSession',
    'autosave.autoSaveSetup',
    'autosave.saveGearList',
    'autosave.restoreSessionState',
    'backups.collectFullBackupData',
    'backups.createSettingsBackup',
    'backups.captureStorageSnapshot',
    'backups.sanitizeBackupPayload',
    'backups.autoBackup',
    'backups.formatFullBackupFilename',
    'backups.downloadPayload',
    'backups.recordFullBackupHistoryEntry',
    'restore.proceed',
    'restore.abort',
    'share.downloadProject',
    'share.encodeSharedSetup',
    'share.decodeSharedSetup',
    'share.applySharedSetup',
    'share.applySharedSetupFromUrl'
  ];

  const REQUIRED_OFFLINE_FUNCTIONS = [
    'registerServiceWorker',
    'reloadApp'
  ];

  const REQUIRED_UI_CONTROLLERS = [
    { name: 'deviceManagerSection', actions: ['show', 'hide', 'toggle'] },
    { name: 'shareDialog', actions: ['open', 'submit', 'cancel', 'dismiss'] },
    { name: 'sharedImportDialog', actions: ['submit', 'cancel', 'dismiss', 'changeMode'] },
    { name: 'backupSettings', actions: ['execute'] },
    { name: 'restoreSettings', actions: ['openPicker', 'processFile'] }
  ];

  const REQUIRED_UI_INTERACTIONS = [
    'saveSetup',
    'deleteSetup',
    'shareOpen',
    'shareSubmit',
    'shareCancel',
    'shareApplyFile',
    'shareInputChange',
    'sharedImportSubmit',
    'sharedImportCancel',
    'performBackup',
    'openRestorePicker',
    'applyRestoreFile'
  ];

  const REQUIRED_UI_HELP_ENTRIES = [
    'saveSetup',
    'autoBackupBeforeDeletion',
    'shareProject',
    'sharedImport',
    'backupSettings',
    'restoreSettings'
  ];

  function resolveModule(name) {
    if (!name || !MODULE_NAMES.includes(name)) {
      throw new TypeError(`cineRuntime cannot resolve unknown module "${name}".`);
    }

    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.get === 'function') {
      try {
        const registered = MODULE_REGISTRY.get(name);
        if (registered) {
          return registered;
        }
      } catch (error) {
        void error;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        const existing = GLOBAL_SCOPE[name];
        if (existing) {
          return existing;
        }
      } catch (error) {
        void error;
      }
    }

    switch (name) {
      case 'cinePersistence':
        return tryRequire('./persistence.js');
      case 'cineOffline':
        return tryRequire('./offline.js');
      case 'cineUi':
        return tryRequire('./ui.js');
      default:
        return null;
    }
  }

  function ensureModule(name, options = {}) {
    const resolved = resolveModule(name);
    if (!resolved && options.optional) {
      return null;
    }
    if (!resolved) {
      throw new Error(`cineRuntime could not locate ${name}.`);
    }
    return resolved;
  }

  function parsePath(path) {
    if (Array.isArray(path)) {
      return path.slice();
    }
    if (typeof path === 'string' && path.trim()) {
      return path.split('.');
    }
    throw new TypeError('cineRuntime expected check paths to be strings or arrays.');
  }

  function inspectFunctionPath(root, path, missing, detailMap, prefix) {
    const segments = parsePath(path);
    let current = root;
    let traversed = prefix ? `${prefix}` : '';

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      traversed = traversed ? `${traversed}.${segment}` : segment;
      if (!current || (typeof current !== 'object' && typeof current !== 'function')) {
        missing.push(traversed);
        detailMap[traversed] = false;
        return;
      }
      current = current[segment];
    }

    const finalPath = prefix ? `${prefix}.${segments.join('.')}` : segments.join('.');
    const ok = typeof current === 'function';
    if (!ok) {
      missing.push(finalPath);
    }
    detailMap[finalPath] = ok;
  }

  function inspectPersistenceModule(persistenceModule, missing, detailMap) {
    if (!persistenceModule || typeof persistenceModule !== 'object') {
      return;
    }

    for (let index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      inspectFunctionPath(
        persistenceModule,
        REQUIRED_PERSISTENCE_FUNCTIONS[index],
        missing,
        detailMap,
        'cinePersistence',
      );
    }

    const internal = persistenceModule.__internal;
    const inspector = internal && typeof internal.inspectBinding === 'function'
      ? internal.inspectBinding.bind(internal)
      : null;

    if (!inspector) {
      const key = 'cinePersistence.__internal.inspectBinding';
      missing.push(key);
      detailMap[key] = false;
      return;
    }

    for (let index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      const path = REQUIRED_PERSISTENCE_FUNCTIONS[index];
      const segments = parsePath(path);
      const bindingName = segments[segments.length - 1];
      const bindingPath = `cinePersistence.bindings.${bindingName}`;

      let detail = null;
      try {
        detail = inspector(bindingName, { refresh: true });
      } catch (error) {
        void error;
        detail = null;
      }

      const available = !!(detail && detail.available);
      if (!available) {
        missing.push(bindingPath);
      }
      detailMap[bindingPath] = available;
      if (detail) {
        detailMap[`${bindingPath}.provider`] = detail.providerName || null;
      }
    }
  }

  function inspectOfflineFunctions(module, missing, detailMap) {
    for (let index = 0; index < REQUIRED_OFFLINE_FUNCTIONS.length; index += 1) {
      const name = REQUIRED_OFFLINE_FUNCTIONS[index];
      const fn = module ? module[name] : null;
      const path = `cineOffline.${name}`;
      const ok = typeof fn === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function inspectUiControllers(uiModule, missing, detailMap) {
    const controllers = uiModule && uiModule.controllers;
    const getter = controllers && typeof controllers.get === 'function'
      ? controllers.get.bind(controllers)
      : null;

    for (let index = 0; index < REQUIRED_UI_CONTROLLERS.length; index += 1) {
      const descriptor = REQUIRED_UI_CONTROLLERS[index];
      const pathPrefix = `cineUi.controllers.${descriptor.name}`;

      if (!getter) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }

      let entry = null;
      try {
        entry = getter(descriptor.name);
      } catch (error) {
        void error;
        entry = null;
      }

      const entryOk = !!entry && typeof entry === 'object';
      if (!entryOk) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }

      detailMap[pathPrefix] = true;

      for (let actionIndex = 0; actionIndex < descriptor.actions.length; actionIndex += 1) {
        const actionName = descriptor.actions[actionIndex];
        const actionPath = `${pathPrefix}.${actionName}`;
        const action = entry[actionName];
        const actionOk = typeof action === 'function';
        if (!actionOk) {
          missing.push(actionPath);
        }
        detailMap[actionPath] = actionOk;
      }
    }
  }

  function inspectUiInteractions(uiModule, missing, detailMap) {
    const interactions = uiModule && uiModule.interactions;
    const getter = interactions && typeof interactions.get === 'function'
      ? interactions.get.bind(interactions)
      : null;

    for (let index = 0; index < REQUIRED_UI_INTERACTIONS.length; index += 1) {
      const name = REQUIRED_UI_INTERACTIONS[index];
      const path = `cineUi.interactions.${name}`;

      if (!getter) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }

      let handler = null;
      try {
        handler = getter(name);
      } catch (error) {
        void error;
        handler = null;
      }

      const ok = typeof handler === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function inspectUiHelp(uiModule, missing, detailMap) {
    const help = uiModule && uiModule.help;
    const resolver = help && typeof help.resolve === 'function'
      ? help.resolve.bind(help)
      : null;

    for (let index = 0; index < REQUIRED_UI_HELP_ENTRIES.length; index += 1) {
      const name = REQUIRED_UI_HELP_ENTRIES[index];
      const path = `cineUi.help.${name}`;

      if (!resolver) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }

      let value = null;
      try {
        value = resolver(name);
      } catch (error) {
        void error;
        value = null;
      }

      const ok = typeof value === 'string' && !!value.trim();
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }

  function listCriticalChecks() {
    return freezeDeep({
      cinePersistence: REQUIRED_PERSISTENCE_FUNCTIONS.slice(),
      cineOffline: REQUIRED_OFFLINE_FUNCTIONS.slice(),
      cineUi: {
        controllers: REQUIRED_UI_CONTROLLERS.map(entry => ({
          name: entry.name,
          actions: entry.actions.slice()
        })),
        interactions: REQUIRED_UI_INTERACTIONS.slice(),
        help: REQUIRED_UI_HELP_ENTRIES.slice(),
      },
    });
  }

  function verifyCriticalFlows(options = {}) {
    const missing = [];
    const detailMap = {};

    let registrySnapshot = null;
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.assertRegistered === 'function') {
      try {
        registrySnapshot = MODULE_REGISTRY.assertRegistered(MODULE_NAMES);
      } catch (error) {
        safeWarn('cineRuntime.verifyCriticalFlows() could not inspect cineModules registry.', error);
      }
    }

    const persistence = resolveModule('cinePersistence');
    const offline = resolveModule('cineOffline');
    const ui = resolveModule('cineUi');

    const modulePresence = {
      cinePersistence: !!persistence,
      cineOffline: !!offline,
      cineUi: !!ui,
    };

    if (registrySnapshot && registrySnapshot.detail) {
      const registryDetail = {};
      const detailKeys = Object.keys(registrySnapshot.detail);
      for (let index = 0; index < detailKeys.length; index += 1) {
        const key = detailKeys[index];
        const registered = !!registrySnapshot.detail[key];
        registryDetail[key] = registered;
        detailMap[`${key}.registered`] = registered;
        if (!registered) {
          missing.push(`${key} (not registered)`);
        }
      }

      modulePresence.registry = registryDetail;
    }

    if (!persistence) {
      missing.push('cinePersistence');
      detailMap.cinePersistence = false;
    } else {
      detailMap.cinePersistence = true;
      if (!Object.isFrozen(persistence)) {
        missing.push('cinePersistence (not frozen)');
        detailMap['cinePersistence.frozen'] = false;
      } else {
        detailMap['cinePersistence.frozen'] = true;
      }

      inspectPersistenceModule(persistence, missing, detailMap);
    }

    if (!offline) {
      missing.push('cineOffline');
      detailMap.cineOffline = false;
    } else {
      detailMap.cineOffline = true;
      if (!Object.isFrozen(offline)) {
        missing.push('cineOffline (not frozen)');
        detailMap['cineOffline.frozen'] = false;
      } else {
        detailMap['cineOffline.frozen'] = true;
      }
      inspectOfflineFunctions(offline, missing, detailMap);
    }

    if (!ui) {
      missing.push('cineUi');
      detailMap.cineUi = false;
    } else {
      detailMap.cineUi = true;
      if (!Object.isFrozen(ui)) {
        missing.push('cineUi (not frozen)');
        detailMap['cineUi.frozen'] = false;
      } else {
        detailMap['cineUi.frozen'] = true;
      }

      inspectUiControllers(ui, missing, detailMap);
      inspectUiInteractions(ui, missing, detailMap);
      inspectUiHelp(ui, missing, detailMap);
    }

    const ok = missing.length === 0;
    const result = freezeDeep({
      ok,
      missing: missing.slice(),
      modules: freezeDeep(modulePresence),
      details: freezeDeep(detailMap),
      registry: registrySnapshot ? freezeDeep(registrySnapshot) : null,
      checks: listCriticalChecks(),
    });

    if (!ok) {
      if (options.warnOnFailure) {
        safeWarn('cineRuntime.verifyCriticalFlows() detected missing safeguards.', missing);
      }
      if (options.throwOnFailure) {
        const error = new Error('cineRuntime integrity verification failed.');
        error.details = result;
        throw error;
      }
    }

    return result;
  }

  const runtimeAPI = freezeDeep({
    getPersistence(options) {
      return ensureModule('cinePersistence', options);
    },
    getOffline(options) {
      return ensureModule('cineOffline', options);
    },
    getUi(options) {
      return ensureModule('cineUi', options);
    },
    getModuleRegistry() {
      return MODULE_REGISTRY || null;
    },
    listCriticalChecks,
    verifyCriticalFlows,
    __internal: freezeDeep({
      resolveModule,
      ensureModule,
      listCriticalChecks,
      moduleRegistry: MODULE_REGISTRY || null,
    }),
  });

  informModuleGlobals('cineRuntime', runtimeAPI);

  registerOrQueueModule(
    'cineRuntime',
    runtimeAPI,
    {
      category: 'runtime',
      description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
      replace: true,
    },
    (error) => {
      safeWarn('Unable to register cineRuntime module.', error);
    },
  );

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    let existingRuntime = null;
    try {
      existingRuntime = GLOBAL_SCOPE.cineRuntime || null;
    } catch (error) {
      void error;
      existingRuntime = null;
    }

    if (existingRuntime !== runtimeAPI) {
      const exposed = exposeGlobal('cineRuntime', runtimeAPI, {
        configurable: true,
        enumerable: false,
        writable: false,
      });

      if (!exposed) {
        safeWarn('Unable to expose cineRuntime globally.');
      }
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    if (
      module.exports
      && module.exports !== runtimeAPI
      && typeof module.exports === 'object'
      && Object.keys(module.exports).length > 0
    ) {
      try {
        if (module.exports.cineRuntime !== runtimeAPI) {
          Object.defineProperty(module.exports, 'cineRuntime', {
            configurable: true,
            enumerable: false,
            value: runtimeAPI,
            writable: false,
          });
        }
      } catch (attachmentError) {
        safeWarn('Unable to attach cineRuntime to existing module.exports.', attachmentError);
      }
    } else {
      module.exports = runtimeAPI;
    }
  }
})();
