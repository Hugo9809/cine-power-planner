function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
  var MODULE_NAMES = ['cinePersistence', 'cineOffline', 'cineUi'];
  var REQUIRED_PERSISTENCE_FUNCTIONS = ['storage.loadDeviceData', 'storage.saveDeviceData', 'storage.loadSetups', 'storage.saveSetups', 'storage.saveSetup', 'storage.loadSetup', 'storage.deleteSetup', 'storage.renameSetup', 'storage.loadSessionState', 'storage.saveSessionState', 'storage.saveProject', 'storage.loadProject', 'storage.deleteProject', 'storage.exportAllData', 'storage.importAllData', 'storage.loadFavorites', 'storage.saveFavorites', 'storage.loadAutoGearRules', 'storage.saveAutoGearRules', 'storage.loadAutoGearBackups', 'storage.saveAutoGearBackups', 'storage.loadAutoGearBackupRetention', 'storage.saveAutoGearBackupRetention', 'storage.loadAutoGearPresets', 'storage.saveAutoGearPresets', 'storage.loadAutoGearActivePresetId', 'storage.saveAutoGearActivePresetId', 'storage.loadAutoGearAutoPresetId', 'storage.saveAutoGearAutoPresetId', 'storage.loadAutoGearMonitorDefaults', 'storage.saveAutoGearMonitorDefaults', 'storage.loadAutoGearBackupVisibility', 'storage.saveAutoGearBackupVisibility', 'storage.loadFullBackupHistory', 'storage.saveFullBackupHistory', 'storage.recordFullBackupHistoryEntry', 'autosave.saveSession', 'autosave.autoSaveSetup', 'autosave.saveGearList', 'autosave.restoreSessionState', 'backups.collectFullBackupData', 'backups.createSettingsBackup', 'backups.captureStorageSnapshot', 'backups.sanitizeBackupPayload', 'backups.autoBackup', 'backups.formatFullBackupFilename', 'backups.downloadPayload', 'backups.recordFullBackupHistoryEntry', 'restore.proceed', 'restore.abort', 'share.downloadProject', 'share.encodeSharedSetup', 'share.decodeSharedSetup', 'share.applySharedSetup', 'share.applySharedSetupFromUrl'];
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
  function safeWarn(message, detail) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
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
  }
  function tryRequire(modulePath) {
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
  function freezeDeep(value) {
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
  }
  function resolveModule(name) {
    if (!name || !MODULE_NAMES.includes(name)) {
      throw new TypeError("cineRuntime cannot resolve unknown module \"".concat(name, "\"."));
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
    var persistence = resolveModule('cinePersistence');
    var offline = resolveModule('cineOffline');
    var ui = resolveModule('cineUi');
    var modulePresence = {
      cinePersistence: !!persistence,
      cineOffline: !!offline,
      cineUi: !!ui
    };
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
      for (var index = 0; index < REQUIRED_PERSISTENCE_FUNCTIONS.length; index += 1) {
        inspectFunctionPath(persistence, REQUIRED_PERSISTENCE_FUNCTIONS[index], missing, detailMap, 'cinePersistence');
      }
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
    listCriticalChecks: listCriticalChecks,
    verifyCriticalFlows: verifyCriticalFlows,
    __internal: freezeDeep({
      resolveModule: resolveModule,
      ensureModule: ensureModule,
      listCriticalChecks: listCriticalChecks
    })
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (GLOBAL_SCOPE.cineRuntime !== runtimeAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineRuntime', {
          configurable: true,
          enumerable: false,
          value: runtimeAPI,
          writable: false
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineRuntime globally.', error);
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