/* global cineModuleBase */

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

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  function resolveModuleGlobals(scope) {
    if (scope && typeof scope.cineModuleGlobals === 'object') {
      return scope.cineModuleGlobals;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../globals.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function fallbackExpose(name, value, scope, options) {
    const targetScope = scope || GLOBAL_SCOPE;
    if (!targetScope || (typeof targetScope !== 'object' && typeof targetScope !== 'function')) {
      return false;
    }

    const descriptor = {
      configurable: options && options.configurable !== false,
      enumerable: !!(options && options.enumerable),
      value,
      writable: !!(options && options.writable),
    };

    try {
      Object.defineProperty(targetScope, name, descriptor);
      return true;
    } catch (error) {
      void error;
    }

    try {
      targetScope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function fallbackRegister() {
    return false;
  }

  function fallbackWarn(message, detail) {
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

  const FALLBACK_BASE = {
    exposeGlobal(name, value, scope, options) {
      return fallbackExpose(name, value, scope, options || {});
    },
    registerOrQueueModule: fallbackRegister,
    getModuleRegistry() {
      return null;
    },
    safeWarn: fallbackWarn,
  };

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || FALLBACK_BASE;
  const MODULE_GLOBALS = resolveModuleGlobals(GLOBAL_SCOPE);

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
      }
    : function expose(name, value, options) {
        return fallbackExpose(name, value, GLOBAL_SCOPE, options || {});
      };

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          moduleRegistry,
        );
      }
    : fallbackRegister;

  const safeWarn = (function resolveSafeWarn() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return function warn(message, detail) {
        try {
          MODULE_GLOBALS.safeWarn(message, detail);
        } catch (error) {
          fallbackWarn(message, error);
        }
      };
    }

    if (MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function') {
      return function warn(message, detail) {
        try {
          MODULE_BASE.safeWarn(message, detail);
        } catch (error) {
          fallbackWarn(message, error);
        }
      };
    }

    return fallbackWarn;
  })();

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

  const GUARD_EXPORTS = [
    'ensureDefaultProjectInfoSnapshot',
    'skipNextGearListRefresh',
    'alignActiveAutoGearPreset',
    'reconcileAutoGearAutoPresetState',
    'openAutoGearEditor',
    'closeAutoGearEditor',
    'saveAutoGearRuleFromEditor',
    'handleAutoGearImportSelection',
    'handleAutoGearPresetSelection',
    'handleAutoGearSavePreset',
    'handleAutoGearDeletePreset',
    'applyAutoGearBackupVisibility',
    'renderAutoGearBackupControls',
    'renderAutoGearBackupRetentionControls',
    'renderAutoGearDraftImpact',
    'renderAutoGearDraftLists',
    'renderAutoGearMonitorDefaultsControls',
    'renderAutoGearPresetsControls',
    'renderAutoGearRulesList',
    'updateAutoGearCameraWeightDraft',
    'updateAutoGearShootingDaysDraft',
    'setAutoGearAutoPresetId',
    'syncAutoGearAutoPreset',
    'updateAutoGearCatalogOptions',
    'updateAutoGearItemButtonState',
    'updateAutoGearMonitorDefaultOptions',
    'applyFavoritesToSelect',
    'updateFavoriteButton',
    'toggleFavorite',
    'loadStoredLogoPreview',
    'renderSettingsLogoPreview',
    'loadFeedbackSafe',
    'saveFeedbackSafe',
    'saveCurrentGearList',
  ];

  const moduleState = Object.create(null);

  function assignExportValue(name, value) {
    if (typeof value === 'undefined') {
      return;
    }

    moduleState[name] = value;
  }

  function installPersistenceGuard(payload) {
    if (!payload || typeof payload !== 'object') {
      safeWarn('cineCoreGuard.install received invalid payload.');
      return false;
    }

    let assigned = false;

    for (let index = 0; index < GUARD_EXPORTS.length; index += 1) {
      const name = GUARD_EXPORTS[index];
      if (Object.prototype.hasOwnProperty.call(payload, name)) {
        assignExportValue(name, payload[name]);
        assigned = true;
      }
    }

    if (!assigned) {
      safeWarn('cineCoreGuard.install did not receive any recognised exports.');
    }

    return assigned;
  }

  function defineLazyExports(target, exportNames) {
    const propertyMap = {};

    for (let index = 0; index < exportNames.length; index += 1) {
      const name = exportNames[index];
      propertyMap[name] = {
        configurable: false,
        enumerable: true,
        get() {
          return moduleState[name];
        },
      };
    }

    Object.defineProperties(target, propertyMap);
  }

  const guardAPI = {};
  defineLazyExports(guardAPI, GUARD_EXPORTS);

  Object.defineProperty(guardAPI, 'install', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: installPersistenceGuard,
  });

  const frozenGuardAPI = Object.freeze(guardAPI);

  informModuleGlobals('cineCoreGuard', frozenGuardAPI);

  registerOrQueueModule('cineCoreGuard', frozenGuardAPI, {
    category: 'safety',
    description: 'Persistence guards that preserve autosaves, presets, and backup state across workflows.',
    replace: true,
    freeze: false,
    connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence'],
  }, (error) => {
    safeWarn('Unable to register cineCoreGuard module.', error);
  });

  const exposed = exposeGlobal('cineCoreGuard', frozenGuardAPI, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  if (!exposed) {
    safeWarn('Unable to expose cineCoreGuard globally.');
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = frozenGuardAPI;
  }
})();
