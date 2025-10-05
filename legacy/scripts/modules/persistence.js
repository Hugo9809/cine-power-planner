function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    return {};
  }
  var FALLBACK_SCOPE = detectGlobalScope();
  function resolveModuleBase() {
    if (typeof require === 'function') {
      try {
        return require('./base.js');
      } catch (error) {
        void error;
      }
    }
    var candidates = [FALLBACK_SCOPE];
    if (typeof globalThis !== 'undefined' && candidates.indexOf(globalThis) === -1) candidates.push(globalThis);
    if (typeof window !== 'undefined' && candidates.indexOf(window) === -1) candidates.push(window);
    if (typeof self !== 'undefined' && candidates.indexOf(self) === -1) candidates.push(self);
    if (typeof global !== 'undefined' && candidates.indexOf(global) === -1) candidates.push(global);
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      if (scope && _typeof(scope.cineModuleBase) === 'object') {
        return scope.cineModuleBase;
      }
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase();
  var GLOBAL_SCOPE = MODULE_BASE && typeof MODULE_BASE.getGlobalScope === 'function' ? MODULE_BASE.getGlobalScope() || FALLBACK_SCOPE : FALLBACK_SCOPE;
  var tryRequire = MODULE_BASE && typeof MODULE_BASE.tryRequire === 'function' ? MODULE_BASE.tryRequire : function tryRequire(modulePath) {
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
  var resolveModuleRegistry = MODULE_BASE && typeof MODULE_BASE.resolveModuleRegistry === 'function' ? function resolveModuleRegistry(scope) {
    return MODULE_BASE.resolveModuleRegistry(scope || GLOBAL_SCOPE);
  } : function resolveModuleRegistry() {
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.cineModules) === 'object') {
        return scope.cineModules;
      }
    }
    return null;
  };
  var MODULE_REGISTRY = function () {
    var provided = MODULE_BASE && typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
    return provided || resolveModuleRegistry();
  }();
  var PENDING_QUEUE_KEY = MODULE_BASE && typeof MODULE_BASE.PENDING_QUEUE_KEY === 'string' ? MODULE_BASE.PENDING_QUEUE_KEY : '__cinePendingModuleRegistrations__';
  function queueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    var queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: []
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
  var registerOrQueueModule = MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function' ? function registerOrQueueModule(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
  } : function registerOrQueueModule(name, api, options, onError) {
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
  var freezeDeep = MODULE_BASE && typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var keys = Object.getOwnPropertyNames(value);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  };
  var exposeGlobal = MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function' ? function exposeGlobal(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options);
  } : function exposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: false
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
  var providerModules = [];
  function addProviderModule(reference, label) {
    if (!reference || _typeof(reference) !== 'object') {
      return;
    }
    providerModules.push({
      ref: reference,
      name: label || null
    });
  }
  addProviderModule(GLOBAL_SCOPE, 'global');
  var storageModule = tryRequire('../storage.js');
  if (storageModule && _typeof(storageModule) === 'object') {
    addProviderModule(storageModule, 'storage');
  }
  var sessionModule = tryRequire('../app-session.js');
  if (sessionModule && _typeof(sessionModule) === 'object') {
    addProviderModule(sessionModule, 'session');
  }
  var setupsModule = tryRequire('../app-setups.js');
  if (setupsModule && _typeof(setupsModule) === 'object') {
    addProviderModule(setupsModule, 'setups');
  }
  var bindingState = Object.create(null);
  var bindingNames = [];
  function identifyProvider(providerEntry) {
    if (!providerEntry) {
      return null;
    }
    if (providerEntry.name) {
      return providerEntry.name;
    }
    var ref = providerEntry.ref;
    if (!ref || _typeof(ref) !== 'object') {
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
    var key = String(bindingKey);
    var entry = bindingState[key];
    if (!entry) {
      entry = {
        name: key,
        implementationName: implementationName || key,
        available: false,
        providerIndex: -1,
        providerName: null,
        lastChecked: null,
        implementation: null
      };
      bindingState[key] = entry;
      bindingNames.push(key);
    } else if (implementationName && entry.implementationName !== implementationName) {
      entry.implementationName = implementationName;
    }
    return entry;
  }
  function resolveBinding(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh') ? options.refresh : true;
    var entry = ensureBindingEntry(name);
    var implementationName = entry.implementationName || String(name);
    if (!refresh && entry.implementation && typeof entry.implementation === 'function') {
      return entry;
    }
    var resolved = null;
    for (var index = 0; index < providerModules.length; index += 1) {
      var providerEntry = providerModules[index];
      var provider = providerEntry && providerEntry.ref;
      if (!provider || _typeof(provider) !== 'object') {
        continue;
      }
      var candidate = provider[implementationName];
      if (typeof candidate === 'function') {
        resolved = {
          implementation: candidate,
          providerIndex: index,
          providerName: identifyProvider(providerEntry)
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
    var detail = resolveBinding(name, {
      refresh: true
    });
    if (!detail || typeof detail.implementation !== 'function') {
      var error = new Error("cinePersistence could not resolve function \"".concat(name, "\"."));
      error.code = 'CINE_PERSISTENCE_BINDING_MISSING';
      error.binding = name;
      error.detail = {
        name: name,
        available: detail ? detail.available : false,
        providerName: detail ? detail.providerName : null
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
      implementation: detail.implementationName || detail.name
    });
  }
  function createWrapper(name, alias) {
    var bindingKey = alias || name;
    ensureBindingEntry(bindingKey, name);
    return function persistenceWrapper() {
      var fn = requireBinding(bindingKey);
      return fn.apply(this, arguments);
    };
  }
  function _inspectBinding(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var normalized = String(name);
    var refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh') ? options.refresh : true;
    var detail = resolveBinding(normalized, {
      refresh: refresh
    });
    return snapshotBinding(detail);
  }
  function inspectAllBindings() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var refresh = options && Object.prototype.hasOwnProperty.call(options, 'refresh') ? options.refresh : true;
    if (refresh) {
      for (var index = 0; index < bindingNames.length; index += 1) {
        resolveBinding(bindingNames[index], {
          refresh: true
        });
      }
    }
    var snapshot = {};
    for (var _index = 0; _index < bindingNames.length; _index += 1) {
      var name = bindingNames[_index];
      snapshot[name] = snapshotBinding(bindingState[name]);
    }
    return freezeDeep(snapshot);
  }
  function listBindings() {
    return bindingNames.slice();
  }
  var persistenceAPI = {
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
      getLastCriticalStorageGuardResult: createWrapper('getLastCriticalStorageGuardResult')
    },
    autosave: {
      saveSession: createWrapper('saveCurrentSession', 'saveSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup', 'autoSaveSetup'),
      saveGearList: createWrapper('saveCurrentGearList', 'saveGearList'),
      restoreSessionState: createWrapper('restoreSessionState')
    },
    backups: {
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload', 'downloadPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry')
    },
    restore: {
      proceed: createWrapper('handleRestoreRehearsalProceed', 'proceed'),
      abort: createWrapper('handleRestoreRehearsalAbort', 'abort')
    },
    share: {
      downloadProject: createWrapper('downloadSharedProject', 'downloadProject'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl')
    },
    __internal: freezeDeep({
      listBindings: listBindings,
      inspectBinding: function inspectBinding(name, options) {
        return _inspectBinding(name, options) || null;
      },
      inspectAllBindings: inspectAllBindings
    })
  };
  freezeDeep(persistenceAPI);
  registerOrQueueModule('cinePersistence', persistenceAPI, {
    category: 'persistence',
    description: 'Data integrity facade for storage, autosave, backups, restore, and share flows.',
    replace: true
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    var existingPersistence = null;
    try {
      existingPersistence = GLOBAL_SCOPE.cinePersistence || null;
    } catch (error) {
      void error;
      existingPersistence = null;
    }
    if (existingPersistence !== persistenceAPI) {
      var exposed = exposeGlobal('cinePersistence', persistenceAPI, {
        configurable: true,
        enumerable: false,
        writable: false
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