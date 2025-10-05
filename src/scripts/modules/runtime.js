(function () {
  const GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : {};

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

  function resolveModuleRegistry() {
    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (scope && typeof scope.cineModules === 'object') {
        return scope.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = resolveModuleRegistry();

  const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

  function queueModuleRegistration(name, api, options) {
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

  function registerOrQueueModule(name, api, options, onError) {
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
  }

  function freezeDeep(value, seen = new WeakSet()) {
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
  }

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
    try {
      if (GLOBAL_SCOPE.cineRuntime !== runtimeAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineRuntime', {
          configurable: true,
          enumerable: false,
          value: runtimeAPI,
          writable: false,
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineRuntime globally.', error);
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
