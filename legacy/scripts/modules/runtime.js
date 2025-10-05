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
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
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
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function safeWarn(message, detail) {
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
  var MODULE_NAMES = ['cinePersistence', 'cineOffline', 'cineUi'];
  var REQUIRED_PERSISTENCE_FUNCTIONS = ['storage.loadDeviceData', 'storage.saveDeviceData', 'storage.loadSetups', 'storage.saveSetups', 'storage.saveSetup', 'storage.loadSetup', 'storage.deleteSetup', 'storage.renameSetup', 'storage.loadSessionState', 'storage.saveSessionState', 'storage.saveProject', 'storage.loadProject', 'storage.deleteProject', 'storage.exportAllData', 'storage.importAllData', 'storage.loadFavorites', 'storage.saveFavorites', 'storage.loadFeedback', 'storage.saveFeedback', 'storage.loadAutoGearRules', 'storage.saveAutoGearRules', 'storage.loadAutoGearBackups', 'storage.saveAutoGearBackups', 'storage.loadAutoGearSeedFlag', 'storage.saveAutoGearSeedFlag', 'storage.loadAutoGearBackupRetention', 'storage.saveAutoGearBackupRetention', 'storage.getAutoGearBackupRetentionDefault', 'storage.loadAutoGearPresets', 'storage.saveAutoGearPresets', 'storage.loadAutoGearActivePresetId', 'storage.saveAutoGearActivePresetId', 'storage.loadAutoGearAutoPresetId', 'storage.saveAutoGearAutoPresetId', 'storage.loadAutoGearMonitorDefaults', 'storage.saveAutoGearMonitorDefaults', 'storage.loadAutoGearBackupVisibility', 'storage.saveAutoGearBackupVisibility', 'storage.loadFullBackupHistory', 'storage.saveFullBackupHistory', 'storage.recordFullBackupHistoryEntry', 'storage.requestPersistentStorage', 'storage.clearUiCacheStorageEntries', 'storage.ensureCriticalStorageBackups', 'storage.getLastCriticalStorageGuardResult', 'autosave.saveSession', 'autosave.autoSaveSetup', 'autosave.saveGearList', 'autosave.restoreSessionState', 'backups.collectFullBackupData', 'backups.createSettingsBackup', 'backups.captureStorageSnapshot', 'backups.sanitizeBackupPayload', 'backups.autoBackup', 'backups.formatFullBackupFilename', 'backups.downloadPayload', 'backups.recordFullBackupHistoryEntry', 'restore.proceed', 'restore.abort', 'share.downloadProject', 'share.encodeSharedSetup', 'share.decodeSharedSetup', 'share.applySharedSetup', 'share.applySharedSetupFromUrl'];
  var REQUIRED_OFFLINE_FUNCTIONS = ['registerServiceWorker', 'reloadApp'];
  var REQUIRED_UI_CONTROLLERS = [{
    name: 'deviceManagerSection',
    actions: ['show', 'hide', 'toggle']
  }, {
    name: 'shareDialog',
    actions: ['open', 'submit', 'cancel', 'dismiss']
  }, {
    name: 'sharedImportDialog',
    actions: ['submit', 'cancel', 'dismiss', 'changeMode']
  }, {
    name: 'backupSettings',
    actions: ['execute']
  }, {
    name: 'restoreSettings',
    actions: ['openPicker', 'processFile']
  }];
  var REQUIRED_UI_INTERACTIONS = ['saveSetup', 'deleteSetup', 'shareOpen', 'shareSubmit', 'shareCancel', 'shareApplyFile', 'shareInputChange', 'sharedImportSubmit', 'sharedImportCancel', 'performBackup', 'openRestorePicker', 'applyRestoreFile'];
  var REQUIRED_UI_HELP_ENTRIES = ['saveSetup', 'autoBackupBeforeDeletion', 'shareProject', 'sharedImport', 'backupSettings', 'restoreSettings'];
  function resolveModule(name) {
    if (!name || !MODULE_NAMES.includes(name)) {
      throw new TypeError("cineRuntime cannot resolve unknown module \"".concat(name, "\"."));
    }
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.get === 'function') {
      try {
        var registered = MODULE_REGISTRY.get(name);
        if (registered) {
          return registered;
        }
      } catch (error) {
        void error;
      }
    }
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
      try {
        var existing = GLOBAL_SCOPE[name];
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
  function ensureModule(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resolved = resolveModule(name);
    if (!resolved && options.optional) {
      return null;
    }
    if (!resolved) {
      throw new Error("cineRuntime could not locate ".concat(name, "."));
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
    var segments = parsePath(path);
    var current = root;
    var traversed = prefix ? "".concat(prefix) : '';
    for (var index = 0; index < segments.length; index += 1) {
      var segment = segments[index];
      traversed = traversed ? "".concat(traversed, ".").concat(segment) : segment;
      if (!current || _typeof(current) !== 'object' && typeof current !== 'function') {
        missing.push(traversed);
        detailMap[traversed] = false;
        return;
      }
      current = current[segment];
    }
    var finalPath = prefix ? "".concat(prefix, ".").concat(segments.join('.')) : segments.join('.');
    var ok = typeof current === 'function';
    if (!ok) {
      missing.push(finalPath);
    }
    detailMap[finalPath] = ok;
  }
  function inspectPersistenceModule(persistenceModule, missing, detailMap) {
    if (!persistenceModule || _typeof(persistenceModule) !== 'object') {
      return;
    }
    for (var index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
      inspectFunctionPath(persistenceModule, REQUIRED_PERSISTENCE_FUNCTIONS[index], missing, detailMap, 'cinePersistence');
    }
    var internal = persistenceModule.__internal;
    var inspector = internal && typeof internal.inspectBinding === 'function' ? internal.inspectBinding.bind(internal) : null;
    if (!inspector) {
      var key = 'cinePersistence.__internal.inspectBinding';
      missing.push(key);
      detailMap[key] = false;
      return;
    }
    for (var _index = 0; _index < REQUIRED_PERSISTENCE_FUNCTIONS.length; _index += 1) {
      var path = REQUIRED_PERSISTENCE_FUNCTIONS[_index];
      var segments = parsePath(path);
      var bindingName = segments[segments.length - 1];
      var bindingPath = "cinePersistence.bindings.".concat(bindingName);
      var detail = null;
      try {
        detail = inspector(bindingName, {
          refresh: true
        });
      } catch (error) {
        void error;
        detail = null;
      }
      var available = !!(detail && detail.available);
      if (!available) {
        missing.push(bindingPath);
      }
      detailMap[bindingPath] = available;
      if (detail) {
        detailMap["".concat(bindingPath, ".provider")] = detail.providerName || null;
      }
    }
  }
  function inspectOfflineFunctions(module, missing, detailMap) {
    for (var index = 0; index < REQUIRED_OFFLINE_FUNCTIONS.length; index += 1) {
      var name = REQUIRED_OFFLINE_FUNCTIONS[index];
      var fn = module ? module[name] : null;
      var path = "cineOffline.".concat(name);
      var ok = typeof fn === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }
  function inspectUiControllers(uiModule, missing, detailMap) {
    var controllers = uiModule && uiModule.controllers;
    var getter = controllers && typeof controllers.get === 'function' ? controllers.get.bind(controllers) : null;
    for (var index = 0; index < REQUIRED_UI_CONTROLLERS.length; index += 1) {
      var descriptor = REQUIRED_UI_CONTROLLERS[index];
      var pathPrefix = "cineUi.controllers.".concat(descriptor.name);
      if (!getter) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }
      var entry = null;
      try {
        entry = getter(descriptor.name);
      } catch (error) {
        void error;
        entry = null;
      }
      var entryOk = !!entry && _typeof(entry) === 'object';
      if (!entryOk) {
        missing.push(pathPrefix);
        detailMap[pathPrefix] = false;
        continue;
      }
      detailMap[pathPrefix] = true;
      for (var actionIndex = 0; actionIndex < descriptor.actions.length; actionIndex += 1) {
        var actionName = descriptor.actions[actionIndex];
        var actionPath = "".concat(pathPrefix, ".").concat(actionName);
        var action = entry[actionName];
        var actionOk = typeof action === 'function';
        if (!actionOk) {
          missing.push(actionPath);
        }
        detailMap[actionPath] = actionOk;
      }
    }
  }
  function inspectUiInteractions(uiModule, missing, detailMap) {
    var interactions = uiModule && uiModule.interactions;
    var getter = interactions && typeof interactions.get === 'function' ? interactions.get.bind(interactions) : null;
    for (var index = 0; index < REQUIRED_UI_INTERACTIONS.length; index += 1) {
      var name = REQUIRED_UI_INTERACTIONS[index];
      var path = "cineUi.interactions.".concat(name);
      if (!getter) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }
      var handler = null;
      try {
        handler = getter(name);
      } catch (error) {
        void error;
        handler = null;
      }
      var ok = typeof handler === 'function';
      if (!ok) {
        missing.push(path);
      }
      detailMap[path] = ok;
    }
  }
  function inspectUiHelp(uiModule, missing, detailMap) {
    var help = uiModule && uiModule.help;
    var resolver = help && typeof help.resolve === 'function' ? help.resolve.bind(help) : null;
    for (var index = 0; index < REQUIRED_UI_HELP_ENTRIES.length; index += 1) {
      var name = REQUIRED_UI_HELP_ENTRIES[index];
      var path = "cineUi.help.".concat(name);
      if (!resolver) {
        missing.push(path);
        detailMap[path] = false;
        continue;
      }
      var value = null;
      try {
        value = resolver(name);
      } catch (error) {
        void error;
        value = null;
      }
      var ok = typeof value === 'string' && !!value.trim();
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
        controllers: REQUIRED_UI_CONTROLLERS.map(function (entry) {
          return {
            name: entry.name,
            actions: entry.actions.slice()
          };
        }),
        interactions: REQUIRED_UI_INTERACTIONS.slice(),
        help: REQUIRED_UI_HELP_ENTRIES.slice()
      }
    });
  }
  function verifyCriticalFlows() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var missing = [];
    var detailMap = {};
    var registrySnapshot = null;
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.assertRegistered === 'function') {
      try {
        registrySnapshot = MODULE_REGISTRY.assertRegistered(MODULE_NAMES);
      } catch (error) {
        safeWarn('cineRuntime.verifyCriticalFlows() could not inspect cineModules registry.', error);
      }
    }
    var persistence = resolveModule('cinePersistence');
    var offline = resolveModule('cineOffline');
    var ui = resolveModule('cineUi');
    var modulePresence = {
      cinePersistence: !!persistence,
      cineOffline: !!offline,
      cineUi: !!ui
    };
    if (registrySnapshot && registrySnapshot.detail) {
      var registryDetail = {};
      var detailKeys = Object.keys(registrySnapshot.detail);
      for (var index = 0; index < detailKeys.length; index += 1) {
        var key = detailKeys[index];
        var registered = !!registrySnapshot.detail[key];
        registryDetail[key] = registered;
        detailMap["".concat(key, ".registered")] = registered;
        if (!registered) {
          missing.push("".concat(key, " (not registered)"));
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
    var ok = missing.length === 0;
    var result = freezeDeep({
      ok: ok,
      missing: missing.slice(),
      modules: freezeDeep(modulePresence),
      details: freezeDeep(detailMap),
      registry: registrySnapshot ? freezeDeep(registrySnapshot) : null,
      checks: listCriticalChecks()
    });
    if (!ok) {
      if (options.warnOnFailure) {
        safeWarn('cineRuntime.verifyCriticalFlows() detected missing safeguards.', missing);
      }
      if (options.throwOnFailure) {
        var error = new Error('cineRuntime integrity verification failed.');
        error.details = result;
        throw error;
      }
    }
    return result;
  }
  var runtimeAPI = freezeDeep({
    getPersistence: function getPersistence(options) {
      return ensureModule('cinePersistence', options);
    },
    getOffline: function getOffline(options) {
      return ensureModule('cineOffline', options);
    },
    getUi: function getUi(options) {
      return ensureModule('cineUi', options);
    },
    getModuleRegistry: function getModuleRegistry() {
      return MODULE_REGISTRY || null;
    },
    listCriticalChecks: listCriticalChecks,
    verifyCriticalFlows: verifyCriticalFlows,
    __internal: freezeDeep({
      resolveModule: resolveModule,
      ensureModule: ensureModule,
      listCriticalChecks: listCriticalChecks,
      moduleRegistry: MODULE_REGISTRY || null
    })
  });
  registerOrQueueModule('cineRuntime', runtimeAPI, {
    category: 'runtime',
    description: 'Runtime orchestrator ensuring persistence, offline, and UI safeguards stay intact.',
    replace: true
  }, function (error) {
    safeWarn('Unable to register cineRuntime module.', error);
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    var existingRuntime = null;
    try {
      existingRuntime = GLOBAL_SCOPE.cineRuntime || null;
    } catch (error) {
      void error;
      existingRuntime = null;
    }
    if (existingRuntime !== runtimeAPI) {
      var exposed = exposeGlobal('cineRuntime', runtimeAPI, {
        configurable: true,
        enumerable: false,
        writable: false
      });
      if (!exposed) {
        safeWarn('Unable to expose cineRuntime globally.');
      }
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    if (module.exports && module.exports !== runtimeAPI && _typeof(module.exports) === 'object' && Object.keys(module.exports).length > 0) {
      try {
        if (module.exports.cineRuntime !== runtimeAPI) {
          Object.defineProperty(module.exports, 'cineRuntime', {
            configurable: true,
            enumerable: false,
            value: runtimeAPI,
            writable: false
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