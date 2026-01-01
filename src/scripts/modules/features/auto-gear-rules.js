/* global cineModuleBase, normalizeAutoGearItem, normalizeAutoGearQuantity, normalizeAutoGearShootingDaysCondition,
          normalizeBatteryPlateValue, autoGearRuleSignature,
          generateGearListHtml, parseGearTableForAutoRules, diffGearTableMaps, generateAutoGearId,
          monitorSelect, normalizeAutoGearTriggerValue,
          texts, currentLang, devices, setSelectValue, distanceSelect, motorSelects, controllerSelects, batterySelect,
          hotswapSelect, setSliderBowlValue, setEasyrigValue, collectProjectFormData, requiredScenariosSelect,
          autoGearRules, autoGearRuleMatteboxKey, setAutoGearRules, cameraSelect, videoSelect, cageSelect,
          batteryPlateSelect, updateBatteryPlateVisibility, updateBatteryOptions, applyBatteryPlateSelectionFromBattery,
          getSliderBowlValue, getEasyrigValue, ensureAutoBackupBeforeDeletion, showNotification, notifyAutoSaveFromBackup,
          exportAutoGearPresets,
          markAutoGearDefaultsSeeded, getAutoGearRules, clearAutoGearDefaultsSeeded, hasSeededAutoGearDefaults,
          assignAutoGearRules, AUTO_GEAR_ANY_MOTOR_TOKEN,
          AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS, AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP,
          baseAutoGearRulesState: true, projectScopedAutoGearRules: true,
          autoGearRulesLastBackupSignature: true, autoGearRulesLastPersistedSignature: true,
          autoGearRulesDirtySinceBackup: true */

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

  const missingAutoGearHelperLog = new Set();

  function logMissingAutoGearHelper(name, error) {
    if (missingAutoGearHelperLog.has(name)) {
      return;
    }
    missingAutoGearHelperLog.add(name);
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      if (error) {
        console.warn(`[cine] Missing auto gear helper: ${name}`, error);
      } else {
        console.warn(`[cine] Missing auto gear helper: ${name}`);
      }
    }
  }

  function resolveAutoGearUiExports() {
    if (!GLOBAL_SCOPE || (typeof GLOBAL_SCOPE !== 'object' && typeof GLOBAL_SCOPE !== 'function')) {
      return null;
    }
    try {
      if (
        GLOBAL_SCOPE.cineCoreAutoGearUi
        && typeof GLOBAL_SCOPE.cineCoreAutoGearUi === 'object'
      ) {
        return GLOBAL_SCOPE.cineCoreAutoGearUi;
      }
    } catch (readError) {
      logMissingAutoGearHelper('cineCoreAutoGearUi', readError);
    }
    return null;
  }

  /*
   * DEEP DIVE: The "Auto Gear" Logic Engine
   *
   * This module contains the decision-making rules for the "Auto Gear" feature,
   * which automatically recommends accessories (batteries, cables, rods) based
   * on the selected camera and lens.
   *
   * KEY ARCHITECTURE:
   * 1. Soft Dependencies: It uses `resolveAutoGearHelperFunction` to loosely
   *    couple with the UI layer, preventing circular dependencies.
   * 2. Robustness: It aggressively falls back (`ensureFallbackAutoGearHelper`)
   *    to safe defaults if helper functions are missing.
   */
  function resolveAutoGearHelperFunction(name) {
    if (typeof name !== 'string' || !name) {
      return null;
    }

    const exports = resolveAutoGearUiExports();
    if (exports && typeof exports[name] === 'function') {
      return exports[name];
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE[name] === 'function') {
      return GLOBAL_SCOPE[name];
    }

    logMissingAutoGearHelper(name);
    return null;
  }

  function ensureFallbackAutoGearHelper(name, implementation) {
    if (typeof name !== 'string' || !name || typeof implementation !== 'function') {
      return false;
    }

    let installed = false;

    if (GLOBAL_SCOPE && (typeof GLOBAL_SCOPE === 'object' || typeof GLOBAL_SCOPE === 'function')) {
      const existing = (() => {
        try {
          return GLOBAL_SCOPE[name];
        } catch (readError) {
          void readError;
          return undefined;
        }
      })();

      if (typeof existing !== 'function') {
        try {
          Object.defineProperty(GLOBAL_SCOPE, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: implementation,
          });
          installed = true;
        } catch (defineError) {
          void defineError;
          try {
            GLOBAL_SCOPE[name] = implementation;
            installed = true;
          } catch (assignError) {
            void assignError;
          }
        }
      }
    }

    const exports = resolveAutoGearUiExports();
    if (exports && typeof exports[name] !== 'function') {
      try {
        exports[name] = implementation;
        installed = true;
      } catch (assignExportError) {
        void assignExportError;
      }
    }

    return installed;
  }

  /**
   * DEEP DIVE: Legacy Normalization
   *
   * Device data comes from many sources (user saves, shared links, old versions).
   * These "fallback" normalizers ensure that even if a value is malformed
   * (e.g., "12G" string vs `{ type: "12G-SDI" }` object), the rules engine
   * can still understand it.
   */
  function fallbackNormalizeVideoDistributionOptionValue(value) {
    if (typeof value !== 'string') {
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    const lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') {
      return '__none__';
    }

    return trimmed;
  }

  ensureFallbackAutoGearHelper('normalizeVideoDistributionOptionValue', fallbackNormalizeVideoDistributionOptionValue);

  function getFallbackViewfinderLabel(value) {
    if (value === '__none__') {
      const activeLang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
      const textSource =
        typeof texts === 'object' && texts
          ? texts[activeLang] || texts.en || {}
          : {};
      return (
        textSource.viewfinderExtensionNone
        || textSource.autoGearViewfinderExtensionNone
        || 'No'
      );
    }
    return typeof value === 'string' ? value : '';
  }

  function getFallbackVideoDistributionLabel(value) {
    if (value === '__none__') {
      const activeLang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
      const textSource =
        typeof texts === 'object' && texts
          ? texts[activeLang] || texts.en || {}
          : {};
      return textSource.autoGearVideoDistributionNone || 'No video distribution selected';
    }
    return typeof value === 'string' ? value : '';
  }

  function invokeAutoGearLabelHelper(name, fallback, value) {
    const helper = resolveAutoGearHelperFunction(name);
    if (typeof helper === 'function') {
      try {
        const result = helper.call(GLOBAL_SCOPE, value);
        return result !== undefined && result !== null ? result : fallback(value);
      } catch (invokeError) {
        logMissingAutoGearHelper(name, invokeError);
      }
    }
    return fallback(value);
  }

  function getFallbackMatteboxLabel(value) {
    if (value === '__none__') {
      const activeLang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
      const textSource =
        typeof texts === 'object' && texts
          ? texts[activeLang] || texts.en || {}
          : {};
      return textSource.autoGearMatteboxNone || 'No mattebox selected';
    }
    return typeof value === 'string' ? value : '';
  }

  function getSafeMatteboxFallbackLabel(value) {
    return invokeAutoGearLabelHelper(
      'getMatteboxFallbackLabel',
      getFallbackMatteboxLabel,
      value,
    );
  }

  ensureFallbackAutoGearHelper('getMatteboxFallbackLabel', getFallbackMatteboxLabel);

  function fallbackNormalizeMatteboxOptionValue(value) {
    if (typeof value !== 'string') {
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    const lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') {
      return '__none__';
    }

    return trimmed;
  }

  ensureFallbackAutoGearHelper('normalizeMatteboxOptionValue', fallbackNormalizeMatteboxOptionValue);

  function normalizeMatteboxOption(value) {
    const helper = resolveAutoGearHelperFunction('normalizeMatteboxOptionValue');
    if (typeof helper === 'function') {
      try {
        return helper.call(GLOBAL_SCOPE, value);
      } catch (error) {
        logMissingAutoGearHelper('normalizeMatteboxOptionValue', error);
      }
    }

    return fallbackNormalizeMatteboxOptionValue(value);
  }

  function normalizeVideoDistributionOption(value) {
    const helper = resolveAutoGearHelperFunction('normalizeVideoDistributionOptionValue');
    if (typeof helper === 'function') {
      try {
        return helper.call(GLOBAL_SCOPE, value);
      } catch (error) {
        logMissingAutoGearHelper('normalizeVideoDistributionOptionValue', error);
      }
    }

    if (typeof value !== 'string') {
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    const lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') {
      return '__none__';
    }

    return trimmed;
  }

  function getSafeViewfinderFallbackLabel(value) {
    return invokeAutoGearLabelHelper('getViewfinderFallbackLabel', getFallbackViewfinderLabel, value);
  }

  function getSafeVideoDistributionFallbackLabel(value) {
    return invokeAutoGearLabelHelper(
      'getVideoDistributionFallbackLabel',
      getFallbackVideoDistributionLabel,
      value,
    );
  }

  function createModuleBaseFallback(scope) {
    const targetScope =
      scope && (typeof scope === 'object' || typeof scope === 'function') ? scope : detectGlobalScope();

    const resolvedScope =
      targetScope && (typeof targetScope === 'object' || typeof targetScope === 'function')
        ? targetScope
        : null;

    if (!resolvedScope) {
      return null;
    }

    let existingBase = null;
    try {
      if (resolvedScope && typeof resolvedScope.cineModuleBase === 'object') {
        existingBase = resolvedScope.cineModuleBase;
      }
    } catch (readBaseError) {
      void readBaseError;
      existingBase = null;
    }

    if (existingBase) {
      return existingBase;
    }

    const moduleStorage = Object.create(null);
    const listenerStorage = Object.create(null);

    const notifyListeners = (name, api) => {
      if (typeof name !== 'string' || !name) {
        return;
      }

      const queue = listenerStorage[name];
      if (!Array.isArray(queue) || queue.length === 0) {
        return;
      }

      listenerStorage[name] = [];

      for (let index = 0; index < queue.length; index += 1) {
        const listener = queue[index];
        if (typeof listener !== 'function') {
          continue;
        }

        try {
          listener(api);
        } catch (listenerError) {
          void listenerError;
        }
      }
    };

    const storeModule = (name, api) => {
      if (typeof name !== 'string' || !name) {
        return;
      }

      moduleStorage[name] = api;
      notifyListeners(name, api);
    };

    const getStoredModule = name => {
      if (typeof name !== 'string' || !name) {
        return null;
      }

      if (Object.prototype.hasOwnProperty.call(moduleStorage, name)) {
        return moduleStorage[name];
      }

      return null;
    };

    const whenModuleAvailable = (name, handler) => {
      if (typeof handler !== 'function' || typeof name !== 'string' || !name) {
        return false;
      }

      const existing = getStoredModule(name);
      if (existing) {
        try {
          handler(existing);
        } catch (listenerError) {
          void listenerError;
        }
        return true;
      }

      if (!Array.isArray(listenerStorage[name])) {
        listenerStorage[name] = [];
      }

      listenerStorage[name].push(handler);
      return true;
    };

    const ensureModuleGlobals = () => {
      let globals = null;
      try {
        globals = resolvedScope.cineModuleGlobals;
      } catch (readError) {
        void readError;
        globals = null;
      }

      if (!globals || typeof globals !== 'object') {
        globals = {};
      }

      if (typeof globals.getModule !== 'function') {
        globals.getModule = name => getStoredModule(name);
      }

      if (typeof globals.whenModuleAvailable !== 'function') {
        globals.whenModuleAvailable = (name, handler) => whenModuleAvailable(name, handler);
      }

      if (typeof globals.register !== 'function') {
        globals.register = (name, api) => {
          storeModule(name, api);
          return true;
        };
      }

      try {
        Object.defineProperty(resolvedScope, 'cineModuleGlobals', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: globals,
        });
      } catch (defineGlobalsError) {
        void defineGlobalsError;
        try {
          resolvedScope.cineModuleGlobals = globals;
        } catch (assignGlobalsError) {
          void assignGlobalsError;
        }
      }

      return globals;
    };

    const ensureModuleRegistry = () => {
      let registry = null;
      try {
        registry = resolvedScope.cineModules;
      } catch (readError) {
        void readError;
        registry = null;
      }

      if (!registry || typeof registry !== 'object') {
        registry = {};
      }

      if (typeof registry.get !== 'function') {
        registry.get = name => getStoredModule(name);
      }

      if (typeof registry.register !== 'function') {
        registry.register = (name, api) => {
          storeModule(name, api);
          return true;
        };
      }

      try {
        Object.defineProperty(resolvedScope, 'cineModules', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: registry,
        });
      } catch (defineRegistryError) {
        void defineRegistryError;
        try {
          resolvedScope.cineModules = registry;
        } catch (assignRegistryError) {
          void assignRegistryError;
        }
      }

      return registry;
    };

    const fallbackBase = {
      freezeDeep(value) {
        return value;
      },
      safeWarn(message, detail) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }

        try {
          if (typeof detail === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, detail);
          }
        } catch (warnError) {
          void warnError;
        }
      },
      informModuleGlobals(name, api) {
        const globals = ensureModuleGlobals();
        if (globals && typeof globals.register === 'function') {
          try {
            globals.register(name, api);
            return true;
          } catch (registerError) {
            void registerError;
          }
        }

        storeModule(name, api);
        return true;
      },
      registerOrQueueModule(name, api) {
        const registry = ensureModuleRegistry();
        if (registry && typeof registry.register === 'function') {
          try {
            registry.register(name, api);
          } catch (registerError) {
            void registerError;
            storeModule(name, api);
          }
        } else {
          storeModule(name, api);
        }

        ensureModuleGlobals();
        return true;
      },
      exposeGlobal(name, value, target, options = {}) {
        const scopeTarget =
          target && (typeof target === 'object' || typeof target === 'function') ? target : resolvedScope;

        if (!scopeTarget || (typeof scopeTarget !== 'object' && typeof scopeTarget !== 'function')) {
          return false;
        }

        const descriptor = {
          configurable: options.configurable !== false,
          enumerable: !!options.enumerable,
          writable: options.writable === true,
          value,
        };

        try {
          Object.defineProperty(scopeTarget, name, descriptor);
          return true;
        } catch (defineError) {
          void defineError;
          try {
            scopeTarget[name] = value;
            return true;
          } catch (assignError) {
            void assignError;
          }
        }

        return false;
      },
    };

    fallbackBase.registerOrQueueModule('cineModuleBase', fallbackBase);
    fallbackBase.exposeGlobal('cineModuleBase', fallbackBase, resolvedScope, {
      configurable: true,
      enumerable: false,
      writable: false,
    });

    ensureModuleGlobals();
    ensureModuleRegistry();

    return fallbackBase;
  }

  function moduleJsonDeepClone(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }

    return value;
  }

  function moduleResolveStructuredClone(scope) {
    if (typeof structuredClone === 'function') {
      return structuredClone;
    }

    if (scope && typeof scope.structuredClone === 'function') {
      try {
        return scope.structuredClone.bind(scope);
      } catch (bindError) {
        void bindError;
      }
    }

    if (typeof require === 'function') {
      try {
        const nodeUtil = require('node:util');
        if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
          return nodeUtil.structuredClone.bind(nodeUtil);
        }
      } catch (nodeUtilError) {
        void nodeUtilError;
      }

      try {
        const legacyUtil = require('util');
        if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
          return legacyUtil.structuredClone.bind(legacyUtil);
        }
      } catch (legacyUtilError) {
        void legacyUtilError;
      }
    }

    return null;
  }

  function moduleCreateResilientDeepClone(scope) {
    const structuredCloneImpl = moduleResolveStructuredClone(scope);

    if (!structuredCloneImpl) {
      return moduleJsonDeepClone;
    }

    return function moduleResilientDeepClone(value) {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      try {
        return structuredCloneImpl(value);
      } catch (structuredCloneError) {
        void structuredCloneError;
      }

      return moduleJsonDeepClone(value);
    };
  }

  const MODULE_DEEP_CLONE =
    GLOBAL_SCOPE && typeof GLOBAL_SCOPE.__cineDeepClone === 'function'
      ? GLOBAL_SCOPE.__cineDeepClone
      : moduleCreateResilientDeepClone(GLOBAL_SCOPE);

  // Auto gear rules power the automated project recommendations. They are
  // effectively user data, so every helper below leans on the resilient deep
  // clone to prevent accidental mutations. Documenting this design choice here
  // makes it harder to accidentally bypass the guard rails when extending the
  // module.

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

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || createModuleBaseFallback(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
        return value;
      }
      const seen = new WeakSet();
      function freeze(target) {
        if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
          return target;
        }
        if (seen.has(target)) {
          return target;
        }
        seen.add(target);
        try {
          const keys = Object.getOwnPropertyNames(target);
          for (let index = 0; index < keys.length; index += 1) {
            const key = keys[index];
            let child;
            try {
              child = target[key];
            } catch (accessError) {
              void accessError;
              child = undefined;
            }
            if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
              continue;
            }
            freeze(child);
          }
          Object.freeze(target);
        } catch (error) {
          void error;
        }
        return target;
      }
      return freeze(value);
    };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
      return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
    }
    : function fallbackExpose(name, value) {
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (error) {
        void error;
        return false;
      }
    };

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

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
    : function fallbackRegister() {
      return false;
    };

  let factoryAutoGearRulesSnapshot = null;
  let factoryAutoGearSeedContext = null;

  function fallbackCollectCandidateScopes(primary) {
    const scopes = [];

    function push(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    push(primary);
    if (typeof globalThis !== 'undefined') push(globalThis);
    if (typeof window !== 'undefined') push(window);
    if (typeof self !== 'undefined') push(self);
    if (typeof global !== 'undefined') push(global);

    return scopes;
  }

  const candidateScopes = (function resolveCandidateScopes() {
    if (MODULE_BASE && typeof MODULE_BASE.collectCandidateScopes === 'function') {
      try {
        const collected = MODULE_BASE.collectCandidateScopes(GLOBAL_SCOPE);
        if (Array.isArray(collected) && collected.length) {
          return collected;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackCollectCandidateScopes(GLOBAL_SCOPE);
  })();

  const structuredCloneCandidates = (function collectStructuredCloneCandidates() {
    const candidates = [];

    function addCandidate(fn, scope) {
      if (typeof fn !== 'function') {
        return;
      }
      const exists = candidates.some(candidate => candidate && candidate.fn === fn);
      if (!exists) {
        candidates.push({ fn, scope: scope || null });
      }
    }

    if (MODULE_BASE) {
      if (typeof MODULE_BASE.structuredClone === 'function') {
        addCandidate(MODULE_BASE.structuredClone, MODULE_BASE);
      }
      if (typeof MODULE_BASE.getStructuredClone === 'function') {
        try {
          const resolved = MODULE_BASE.getStructuredClone();
          addCandidate(resolved, MODULE_BASE);
        } catch (error) {
          void error;
        }
      }
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }
      const candidate = scope.structuredClone;
      if (typeof candidate === 'function') {
        addCandidate(candidate, scope);
      }
    }

    return candidates;
  })();

  let cachedStructuredCloneCandidate = null;

  function tryStructuredCloneValue(value) {
    if (cachedStructuredCloneCandidate) {
      try {
        const candidate = cachedStructuredCloneCandidate;
        return {
          success: true,
          value: candidate.scope ? candidate.fn.call(candidate.scope, value) : candidate.fn(value),
        };
      } catch (error) {
        void error;
        cachedStructuredCloneCandidate = null;
      }
    }

    for (let index = 0; index < structuredCloneCandidates.length; index += 1) {
      const candidate = structuredCloneCandidates[index];
      if (!candidate || typeof candidate.fn !== 'function') {
        continue;
      }
      try {
        const cloned = candidate.scope ? candidate.fn.call(candidate.scope, value) : candidate.fn(value);
        cachedStructuredCloneCandidate = candidate;
        return { success: true, value: cloned };
      } catch (error) {
        void error;
      }
    }

    return { success: false, value: null };
  }

  function cloneWithStructuredCloneFallback(value) {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    const attempt = tryStructuredCloneValue(value);
    if (attempt.success) {
      return attempt.value;
    }

    if (MODULE_DEEP_CLONE) {
      try {
        const cloned = MODULE_DEEP_CLONE(value);
        if (cloned !== value || value === null || typeof value !== 'object') {
          return cloned;
        }
      } catch (cloneError) {
        void cloneError;
      }
    }

    try {
      return moduleJsonDeepClone(value);
    } catch (error) {
      void error;
    }

    if (Array.isArray(value)) {
      return value.slice();
    }

    if (typeof value === 'object') {
      return { ...value };
    }

    return value;
  }

  function cloneAutoGearItems(items) {
    return items
      .map(item => {
        const normalized = normalizeAutoGearItem(item);
        if (!normalized) return null;
        return { ...normalized };
      })
      .filter(Boolean);
  }

  function cloneAutoGearRuleItem(item) {
    if (!item || typeof item !== 'object') {
      return {
        id: '',
        name: '',
        category: '',
        quantity: 0,
        screenSize: '',
        selectorType: 'none',
        selectorDefault: '',
        selectorEnabled: false,
        notes: '',
        contextNotes: [],
      };
    }
    return {
      id: typeof item.id === 'string' ? item.id : '',
      name: typeof item.name === 'string' ? item.name : '',
      category: typeof item.category === 'string' ? item.category : '',
      quantity: normalizeAutoGearQuantity(item.quantity),
      screenSize: typeof item.screenSize === 'string' ? item.screenSize : '',
      selectorType: typeof item.selectorType === 'string' ? item.selectorType : 'none',
      selectorDefault: typeof item.selectorDefault === 'string' ? item.selectorDefault : '',
      selectorEnabled: !!item.selectorEnabled,
      selectorContext: typeof item.selectorContext === 'string' ? item.selectorContext : '',
      notes: typeof item.notes === 'string' ? item.notes : '',
      contextNotes: Array.isArray(item.contextNotes) ? item.contextNotes.filter(Boolean) : [],
    };
  }

  function cloneAutoGearRule(rule) {
    if (!rule || typeof rule !== 'object') return null;
    return {
      id: typeof rule.id === 'string' ? rule.id : '',
      label: typeof rule.label === 'string' ? rule.label : '',
      always: Boolean(rule.always),
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
      cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
      viewfinderExtension: Array.isArray(rule.viewfinderExtension)
        ? rule.viewfinderExtension.slice()
        : [],
      videoDistribution: Array.isArray(rule.videoDistribution)
        ? rule.videoDistribution.slice()
        : [],
      camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
      monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
      tripodHeadBrand: Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.slice() : [],
      tripodBowl: Array.isArray(rule.tripodBowl) ? rule.tripodBowl.slice() : [],
      tripodTypes: Array.isArray(rule.tripodTypes) ? rule.tripodTypes.slice() : [],
      tripodSpreader: Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.slice() : [],
      crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
      crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
      wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
      motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
      controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
      distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
      shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearRuleItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearRuleItem) : [],
    };
  }

  function cloneAutoGearRules(rules) {
    return Array.isArray(rules)
      ? rules.map(cloneAutoGearRule).filter(Boolean)
      : [];
  }

  function setFactoryAutoGearRulesSnapshot(rules) {
    if (!Array.isArray(rules)) {
      factoryAutoGearRulesSnapshot = null;
      return;
    }
    factoryAutoGearRulesSnapshot = cloneAutoGearRules(rules);
  }

  function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
    const adjust = (items, type) => items
      .map(item => {
        let remaining = normalizeAutoGearQuantity(item.quantity);
        scenarioKeys.forEach(key => {
          const scenarioDiff = scenarioDiffMap.get(key);
          if (!scenarioDiff) return;
          const match = scenarioDiff[type].find(entry => entry.name === item.name && entry.category === item.category);
          if (match) {
            remaining -= normalizeAutoGearQuantity(match.quantity);
          }
        });
        remaining = Math.max(remaining, 0);
        if (remaining <= 0) return null;
        const normalized = normalizeAutoGearItem(item);
        if (!normalized) return null;
        return { ...normalized, quantity: remaining };
      })
      .filter(Boolean);
    return { add: adjust(diff.add, 'add'), remove: adjust(diff.remove, 'remove') };
  }

  function extractAutoGearSelections(value) {
    if (typeof value !== 'string') return [];
    return value
      .split(',')
      .map(part => part.trim())
      .filter(Boolean);
  }

  function buildCameraHandleAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const selections = extractAutoGearSelections(baseInfo && baseInfo.cameraHandle);
    const selectionSet = new Set(selections);
    const optionValues = [];

    if (typeof document !== 'undefined') {
      const handleSelect = document.getElementById('cameraHandle');
      if (handleSelect) {
        Array.from(handleSelect.options || []).forEach(option => {
          const value = typeof option.value === 'string' ? option.value.trim() : '';
          if (value) optionValues.push(value);
        });
      }
    }

    const candidates = Array.from(new Set(
      selections
        .concat(optionValues)
        .map(value => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean)
    ));

    if (!candidates.length) return [];

    const rules = [];

    candidates.forEach(candidate => {
      const trimmed = candidate.trim();
      if (!trimmed) return;

      let variantHandles;
      let diff;

      if (selectionSet.has(trimmed)) {
        variantHandles = selections.filter(value => value !== trimmed);
        const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantHandles = selections.slice();
        variantHandles.push(trimmed);
        const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      const additions = Array.isArray(diff.add) ? cloneAutoGearItems(diff.add) : [];
      const removals = Array.isArray(diff.remove) ? cloneAutoGearItems(diff.remove) : [];

      if (!additions.length && !removals.length) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: trimmed,
        scenarios: [],
        mattebox: [],
        cameraHandle: [trimmed],
        viewfinderExtension: [],
        videoDistribution: [],
        add: additions,
        remove: removals,
      });
    });

    return rules;
  }

  function buildViewfinderExtensionAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const selections = extractAutoGearSelections(baseInfo && baseInfo.viewfinderExtension);
    if (!selections.length) return [];

    const uniqueSelections = Array.from(new Set(selections));
    const rules = [];

    uniqueSelections.forEach(selection => {
      const trimmed = selection.trim();
      if (!trimmed) return;

      const remainingSelections = selections.filter(value => value !== trimmed);
      const variantInfo = { ...baseInfo, viewfinderExtension: remainingSelections.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;

      const diff = diffGearTableMaps(variantMap, baselineMap);
      if (!diff.add.length && !diff.remove.length) return;

      const additions = cloneAutoGearItems(diff.add);
      if (!additions.length) return;
      const removals = cloneAutoGearItems(diff.remove);

      rules.push({
        id: generateAutoGearId('rule'),
        label: getSafeViewfinderFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [trimmed],
        videoDistribution: [],
        add: additions,
        remove: removals,
      });
    });

    return rules;
  }

  function buildBatteryAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = typeof batterySelect !== 'undefined' ? batterySelect : document.getElementById('battery');
    if (!select || !select.options) return [];

    const optionValues = [];
    Array.from(select.options).forEach(opt => {
      const val = typeof opt.value === 'string' ? opt.value.trim() : '';
      if (val && val !== 'None') optionValues.push(val);
    });

    if (!optionValues.length) return [];

    const currentSelection = baseInfo && typeof baseInfo.battery === 'string' ? baseInfo.battery.trim() : '';
    const rules = [];

    optionValues.forEach(val => {
      let variantInfo;
      let diff;

      if (val === currentSelection) {
        variantInfo = { ...baseInfo, battery: '' };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantInfo = { ...baseInfo, battery: val };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: `Battery: ${val}`,
        scenarios: [],
        battery: [val],
        add: cloneAutoGearItems(diff.add),
        remove: cloneAutoGearItems(diff.remove),
      });
    });

    return rules;
  }

  function buildDistanceAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = typeof distanceSelect !== 'undefined' ? distanceSelect : document.getElementById('distance');
    if (!select || !select.options) return [];

    const optionValues = [];
    Array.from(select.options).forEach(opt => {
      const val = typeof opt.value === 'string' ? opt.value.trim() : '';
      if (val && val !== 'None') optionValues.push(val);
    });

    if (!optionValues.length) return [];

    const currentSelection = baseInfo && typeof baseInfo.distance === 'string' ? baseInfo.distance.trim() : '';
    const rules = [];

    optionValues.forEach(val => {
      let variantInfo;
      let diff;

      if (val === currentSelection) {
        variantInfo = { ...baseInfo, distance: '' };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantInfo = { ...baseInfo, distance: val };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: `Distance: ${val}`,
        scenarios: [],
        distance: [val],
        add: cloneAutoGearItems(diff.add),
        remove: cloneAutoGearItems(diff.remove),
      });
    });

    return rules;
  }

  function buildHotswapAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = typeof hotswapSelect !== 'undefined' ? hotswapSelect : document.getElementById('hotswap');
    if (!select || !select.options) return [];

    const optionValues = [];
    Array.from(select.options).forEach(opt => {
      const val = typeof opt.value === 'string' ? opt.value.trim() : '';
      if (val && val !== 'None') optionValues.push(val);
    });

    if (!optionValues.length) return [];

    const currentSelection = baseInfo && typeof baseInfo.hotswap === 'string' ? baseInfo.hotswap.trim() : '';
    const rules = [];

    optionValues.forEach(val => {
      let variantInfo;
      let diff;

      if (val === currentSelection) {
        variantInfo = { ...baseInfo, hotswap: '' };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantInfo = { ...baseInfo, hotswap: val };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: `Hotswap: ${val}`,
        scenarios: [],
        hotswap: [val],
        add: cloneAutoGearItems(diff.add),
        remove: cloneAutoGearItems(diff.remove),
      });
    });

    return rules;
  }

  function buildBatteryPlateAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = typeof batteryPlateSelect !== 'undefined' ? batteryPlateSelect : document.getElementById('batteryPlate');
    if (!select || !select.options) return [];

    const optionValues = [];
    Array.from(select.options).forEach(opt => {
      const val = typeof opt.value === 'string' ? opt.value.trim() : '';
      if (val && val !== 'None') optionValues.push(val);
    });

    if (!optionValues.length) return [];

    const currentSelection = baseInfo && typeof baseInfo.batteryPlate === 'string' ? baseInfo.batteryPlate.trim() : '';
    const rules = [];

    optionValues.forEach(val => {
      let variantInfo;
      let diff;

      if (val === currentSelection) {
        variantInfo = { ...baseInfo, batteryPlate: '' };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantInfo = { ...baseInfo, batteryPlate: val };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: `Battery Plate: ${val}`,
        scenarios: [],
        batteryPlate: [val],
        add: cloneAutoGearItems(diff.add),
        remove: cloneAutoGearItems(diff.remove),
      });
    });

    return rules;
  }

  function buildCageAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = typeof cageSelect !== 'undefined' ? cageSelect : document.getElementById('cage');
    if (!select || !select.options) return [];

    const optionValues = [];
    Array.from(select.options).forEach(opt => {
      const val = typeof opt.value === 'string' ? opt.value.trim() : '';
      if (val && val !== 'None') optionValues.push(val);
    });

    if (!optionValues.length) return [];

    const currentSelection = baseInfo && typeof baseInfo.cage === 'string' ? baseInfo.cage.trim() : '';
    const rules = [];

    optionValues.forEach(val => {
      let variantInfo;
      let diff;

      if (val === currentSelection) {
        variantInfo = { ...baseInfo, cage: '' };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(variantMap, baselineMap);
      } else {
        variantInfo = { ...baseInfo, cage: val };
        const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
        const variantMap = parseGearTableForAutoRules(variantHtml);
        if (!variantMap) return;
        diff = diffGearTableMaps(baselineMap, variantMap);
      }

      if (!diff || (!diff.add.length && !diff.remove.length)) return;

      rules.push({
        id: generateAutoGearId('rule'),
        label: `Cage: ${val}`,
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [],
        cage: [val],
        add: cloneAutoGearItems(diff.add),
        remove: cloneAutoGearItems(diff.remove),
      });
    });

    return rules;
  }

  function buildTripodAutoGearRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const brand = baseInfo && typeof baseInfo.tripodHeadBrand === 'string' ? baseInfo.tripodHeadBrand.trim() : '';
    const bowl = baseInfo && typeof baseInfo.tripodBowl === 'string' ? baseInfo.tripodBowl.trim() : '';

    const rules = [];

    if (brand && bowl && brand !== 'None' && bowl !== 'None') {
      const variantInfo = { ...baseInfo, tripodHeadBrand: '', tripodBowl: '' };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (variantMap) {
        const diff = diffGearTableMaps(variantMap, baselineMap);
        if (diff.add.length || diff.remove.length) {
          rules.push({
            id: generateAutoGearId('rule'),
            label: `Tripod Head: ${brand} (${bowl})`,
            scenarios: [],
            mattebox: [],
            cameraHandle: [],
            viewfinderExtension: [],
            videoDistribution: [],
            tripodHeadBrand: [brand],
            tripodBowl: [bowl],
            add: cloneAutoGearItems(diff.add),
            remove: cloneAutoGearItems(diff.remove),
          });
        }
      }
    }

    const spreader = baseInfo && typeof baseInfo.tripodSpreader === 'string' ? baseInfo.tripodSpreader.trim() : '';
    if (spreader && spreader !== 'None') {
      const variantInfo = { ...baseInfo, tripodSpreader: '' };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (variantMap) {
        const diff = diffGearTableMaps(variantMap, baselineMap);
        if (diff.add.length || diff.remove.length) {
          rules.push({
            id: generateAutoGearId('rule'),
            label: `Tripod Spreader: ${spreader}`,
            scenarios: [],
            mattebox: [],
            cameraHandle: [],
            viewfinderExtension: [],
            videoDistribution: [],
            tripodSpreader: [spreader],
            add: cloneAutoGearItems(diff.add),
            remove: cloneAutoGearItems(diff.remove),
          });
        }
      }
    }

    const types = extractAutoGearSelections(baseInfo && baseInfo.tripodTypes);
    types.forEach(t => {
      const others = types.filter(val => val !== t);
      const variantInfo = { ...baseInfo, tripodTypes: others.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (variantMap) {
        const diff = diffGearTableMaps(variantMap, baselineMap);
        if (diff.add.length || diff.remove.length) {
          rules.push({
            id: generateAutoGearId('rule'),
            label: `Tripod Type: ${t}`,
            scenarios: [],
            mattebox: [],
            cameraHandle: [],
            viewfinderExtension: [],
            videoDistribution: [],
            tripodTypes: [t],
            add: cloneAutoGearItems(diff.add),
            remove: cloneAutoGearItems(diff.remove),
          });
        }
      }
    });

    return rules;
  }

  function buildTripodPreferenceAutoGearRules(baseInfo = {}) {
    const brand = typeof baseInfo.tripodHeadBrand === 'string' ? baseInfo.tripodHeadBrand.trim() : '';
    const bowl = typeof baseInfo.tripodBowl === 'string' ? baseInfo.tripodBowl.trim() : '';
    if (!brand || !bowl) return [];

    const normalizedBrand = normalizeAutoGearTriggerValue(brand);
    const normalizedBowl = normalizeAutoGearTriggerValue(bowl);
    if (!normalizedBrand || !normalizedBowl) return [];

    const combos = [
      {
        brand: "O'Connor",
        entries: [
          { bowl: '100mm bowl', item: "O'Connor Ultimate 1040 Fluid-Head 100mm bowl" },
          { bowl: '150mm bowl', item: "O'Connor Ultimate 2560 Fluid-Head 150mm bowl" },
          { bowl: 'Mitchell Mount', item: "O'Connor Ultimate 2560 Fluid-Head Mitchell Mount" },
        ],
      },
      {
        brand: 'Sachtler',
        entries: [
          { bowl: '75mm bowl', item: 'Sachtler aktiv8 head 75mm bowl' },
          { bowl: '100mm bowl', item: 'Sachtler aktiv18T head 100mm bowl' },
          { bowl: '150mm bowl', item: 'Sachtler Cine 30 head 150mm bowl' },
          { bowl: 'Mitchell Mount', item: 'Sachtler Cine 30 head Mitchell mount' },
        ],
      },
    ];

    const matchedBrand = combos.find(entry => normalizeAutoGearTriggerValue(entry.brand) === normalizedBrand);
    if (!matchedBrand) return [];

    const matchingEntries = matchedBrand.entries.filter(entry => normalizeAutoGearTriggerValue(entry.bowl) === normalizedBowl);
    if (!matchingEntries.length) return [];

    return matchingEntries.map(entry => {
      const itemName = entry.item;
      const contextNotes = ['Tripod preferences'];
      return {
        id: generateAutoGearId('rule'),
        label: `Tripod head: ${itemName}`,
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [],
        camera: [],
        monitor: [],
        tripodHeadBrand: [matchedBrand.brand],
        tripodBowl: [entry.bowl],
        tripodTypes: [],
        tripodSpreader: [],
        crewPresent: [],
        crewAbsent: [],
        wireless: [],
        motors: [],
        controllers: [],
        distance: [],
        add: [{
          id: generateAutoGearId('item'),
          name: itemName,
          category: 'Grip',
          quantity: 1,
          screenSize: '',
          selectorType: 'tripodHeadBrand',
          selectorDefault: itemName,
          selectorEnabled: true,
          notes: '',
          contextNotes: contextNotes,
        }],
        remove: [],
      };
    });
  }

  function buildVideoDistributionAutoRules(baseInfo, baselineMap) {
    if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const selections = extractAutoGearSelections(baseInfo && baseInfo.videoDistribution);
    if (!selections.length) return [];

    const uniqueSelections = Array.from(new Set(selections));
    const rules = [];

    uniqueSelections.forEach(selection => {
      const trimmed = selection.trim();
      if (!trimmed) return;
      const lower = trimmed.toLowerCase();
      if (lower === '__none__' || lower === 'none') return;

      const remainingSelections = selections.filter(value => value !== trimmed);
      const variantInfo = { ...baseInfo, videoDistribution: remainingSelections.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;

      const diff = diffGearTableMaps(variantMap, baselineMap);
      if (!diff.add.length && !diff.remove.length) return;

      const additions = cloneAutoGearItems(diff.add);
      if (!additions.length) return;
      const removals = cloneAutoGearItems(diff.remove);

      rules.push({
        id: generateAutoGearId('rule'),
        label: getSafeVideoDistributionFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [trimmed],
        add: additions,
        remove: removals,
      });
    });

    return rules;
  }

  function buildOnboardMonitorRiggingAutoGearRules() {
    const select = typeof monitorSelect !== 'undefined' ? monitorSelect : null;
    if (!select || !select.options) {
      return [];
    }

    const monitorLabels = [];
    const seen = new Set();

    Array.from(select.options).forEach(option => {
      if (!option) return;
      const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
      if (!rawValue || rawValue === 'None') return;
      const label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
      if (!label) return;
      const normalized = normalizeAutoGearTriggerValue(label);
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      monitorLabels.push(label);
    });

    if (!monitorLabels.length) {
      return [];
    }

    const monitorLabelText = (typeof texts === 'object' && texts)
      ? ((texts[currentLang] && texts[currentLang].autoGearMonitorLabel)
        || (texts.en && texts.en.autoGearMonitorLabel)
        || 'Onboard monitors')
      : 'Onboard monitors';
    const contextNote = monitorLabelText;

    return [
      {
        id: generateAutoGearId('rule'),
        label: monitorLabelText,
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [],
        camera: [],
        monitor: monitorLabels.slice(),
        crewPresent: [],
        crewAbsent: [],
        wireless: [],
        motors: [],
        controllers: [],
        distance: [],
        add: [
          {
            id: generateAutoGearId('item'),
            name: 'ULCS Arm mit 3/8" und 1/4" double',
            category: 'Rigging',
            quantity: 1,
            contextNotes: [contextNote],
          },
        ],
        remove: [],
      },
    ];
  }



  const ARRI_VIEWFINDER_BRACKET_NAME = 'ARRI K2.74000.0 VEB-3 Viewfinder Extension Bracket';
  const ARRI_VIEWFINDER_BRACKET_CATEGORY = 'Camera Support';

  function createArriViewfinderBracketItem(contextNotes) {
    if (typeof generateAutoGearId !== 'function') {
      return null;
    }
    const normalizedNotes = Array.isArray(contextNotes)
      ? contextNotes.filter(note => typeof note === 'string' && note.trim())
      : [];
    return {
      id: generateAutoGearId('item'),
      name: ARRI_VIEWFINDER_BRACKET_NAME,
      category: ARRI_VIEWFINDER_BRACKET_CATEGORY,
      quantity: 1,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
      contextNotes: normalizedNotes.map(note => note.trim()),
    };
  }

  function collectArriCameraNames() {
    const arriNames = [];
    const cameraDb = devices && typeof devices === 'object' ? devices.cameras : null;
    if (!cameraDb || typeof cameraDb !== 'object') {
      return arriNames;
    }
    Object.keys(cameraDb).forEach(name => {
      if (!name) return;
      const entry = cameraDb[name];
      const brand = entry && typeof entry.brand === 'string' ? entry.brand : '';
      if (/arri/i.test(brand || name)) {
        arriNames.push(name);
      }
    });
    return arriNames;
  }

  function createArriBracketRule(options) {
    if (!options || typeof options !== 'object') {
      return null;
    }
    const addition = createArriViewfinderBracketItem(options.contextNotes || []);
    if (!addition) {
      return null;
    }
    const cameraList = Array.isArray(options.camera)
      ? options.camera.filter(Boolean)
      : [];
    return {
      id: generateAutoGearId('rule'),
      label: typeof options.label === 'string' && options.label.trim()
        ? options.label.trim()
        : 'ARRI viewfinder extension support',
      scenarios: Array.isArray(options.scenarios) ? options.scenarios.filter(Boolean) : [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: Array.isArray(options.viewfinderExtension)
        ? options.viewfinderExtension.filter(Boolean)
        : [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: cameraList,
      monitor: [],
      tripodHeadBrand: [],
      tripodBowl: [],
      tripodTypes: [],
      tripodSpreader: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: null,
      add: [addition],
      remove: [],
    };
  }

  function buildArriViewfinderBracketRules(baseInfo = {}) {
    const arriCameras = collectArriCameraNames();
    if (!arriCameras.length) {
      return [];
    }

    const viewfinderSelection = baseInfo && typeof baseInfo.viewfinderExtension === 'string'
      ? baseInfo.viewfinderExtension.trim()
      : '';
    const selectedScenarios = baseInfo && typeof baseInfo.requiredScenarios === 'string'
      ? baseInfo.requiredScenarios
        .split(',')
        .map(value => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean)
      : [];
    const normalizedScenarios = selectedScenarios.map(value => normalizeAutoGearTriggerValue(value)).filter(Boolean);
    const sliderActive = normalizedScenarios.includes(normalizeAutoGearTriggerValue('Slider'));

    const rules = [];
    if (viewfinderSelection) {
      const contextLabel = getSafeViewfinderFallbackLabel(viewfinderSelection);
      const viewfinderRule = createArriBracketRule({
        label: `${contextLabel || viewfinderSelection} – ARRI viewfinder support`,
        viewfinderExtension: [viewfinderSelection],
        camera: arriCameras.slice(),
        contextNotes: ['ARRI viewfinder extension support'],
      });
      if (viewfinderRule) {
        rules.push(viewfinderRule);
      }
    }

    if (sliderActive && !viewfinderSelection) {
      const sliderRule = createArriBracketRule({
        label: 'Slider – ARRI viewfinder extension support',
        scenarios: ['Slider'],
        camera: arriCameras.slice(),
        contextNotes: ['Slider scenario'],
      });
      if (sliderRule) {
        rules.push(sliderRule);
      }
    }

    return rules;
  }

  function buildDefaultVideoDistributionRules(baseInfo = {}) {
    if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = document.getElementById('videoDistribution');
    if (!select) return [];

    const optionValues = [];
    const seen = new Set();
    Array.from(select.options || []).forEach(option => {
      if (!option) return;
      const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
      const normalized = normalizeVideoDistributionOption(rawValue);
      if (!normalized || normalized === '__none__') return;
      if (seen.has(normalized)) return;
      seen.add(normalized);
      optionValues.push(rawValue);
    });

    if (!optionValues.length) return [];

    const baseProjectInfo = { ...(baseInfo || {}) };
    delete baseProjectInfo.videoDistribution;
    const emptyHtml = generateGearListHtml({ ...baseProjectInfo, requiredScenarios: '' });
    const emptyMap = parseGearTableForAutoRules(emptyHtml);
    if (!emptyMap) return [];

    const generatedRules = [];
    const handledTriggers = new Set();

    optionValues.forEach(rawValue => {
      const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
      if (!trimmed) return;
      const normalized = normalizeVideoDistributionOption(trimmed);
      if (!normalized || handledTriggers.has(normalized)) return;
      handledTriggers.add(normalized);

      const infoForSelection = { ...(baseInfo || {}), videoDistribution: trimmed };
      const selectionHtml = generateGearListHtml({ ...infoForSelection, requiredScenarios: '' });
      const selectionMap = parseGearTableForAutoRules(selectionHtml);
      if (!selectionMap) return;

      const diff = diffGearTableMaps(emptyMap, selectionMap);
      const additions = cloneAutoGearItems(diff.add);
      const removals = cloneAutoGearItems(diff.remove);
      if (!additions.length && !removals.length) return;

      generatedRules.push({
        id: generateAutoGearId('rule'),
        label: getSafeVideoDistributionFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [trimmed],
        add: additions,
        remove: removals,
      });
    });

    const hasIosOption = optionValues.some(value => value && value.toLowerCase() === 'ios video');
    if (hasIosOption) {
      const iosLabel = optionValues.find(value => value && value.toLowerCase() === 'ios video') || 'IOS Video';
      const normalizedIos = normalizeAutoGearTriggerValue(iosLabel);
      const hasGeneratedIosRule = generatedRules.some(rule =>
        Array.isArray(rule.videoDistribution)
        && rule.videoDistribution.some(value => normalizeAutoGearTriggerValue(value) === normalizedIos)
      );
      if (!hasGeneratedIosRule) {
        const createdNames = new Set();
        const createItem = (name, category, quantity = 1) => {
          if (!name || !category || quantity <= 0) return null;
          const key = `${name}|${category}`;
          if (createdNames.has(key)) return null;
          createdNames.add(key);
          return {
            id: generateAutoGearId('item'),
            name,
            category,
            quantity,
            screenSize: '',
            selectorType: 'none',
            selectorDefault: '',
            selectorEnabled: false,
            notes: '',
          };
        };

        const additions = [];
        const iosDevices = devices && typeof devices === 'object' ? devices.iosVideo : null;
        if (iosDevices && typeof iosDevices === 'object') {
          Object.keys(iosDevices).forEach(deviceName => {
            const item = createItem(deviceName, 'Monitoring');
            if (item) additions.push(item);
          });
        }

        if (!additions.length) {
          const fallback = createItem('Teradek - Link AX WifiRouter/Access Point', 'Monitoring');
          if (fallback) additions.push(fallback);
        }

        const pushSupport = (name, category, quantity = 1) => {
          const item = createItem(name, category, quantity);
          if (item) additions.push(item);
        };

        pushSupport('Apple iPad Air 5 or better', 'Monitoring', 1);
        pushSupport('USB-C Charger (iOS Video)', 'Monitoring support', 2);
        pushSupport('Wi-Fi Router (iOS Video Village)', 'Monitoring support');

        if (additions.length) {
          generatedRules.push({
            id: generateAutoGearId('rule'),
            label: getSafeVideoDistributionFallbackLabel(iosLabel),
            scenarios: [],
            mattebox: [],
            cameraHandle: [],
            viewfinderExtension: [],
            videoDistribution: [iosLabel],
            add: additions,
            remove: [],
          });
        }
      }
    }

    return generatedRules;
  }

  function buildDefaultMatteboxAutoGearRules() {
    return [];
  }

  function buildMatteboxAutoGearRules(baseInfo = {}) {
    if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
      return [];
    }

    const select = document.getElementById('mattebox');
    if (!select) return [];

    const optionValues = [];
    const seen = new Set();
    Array.from(select.options || []).forEach(option => {
      if (!option) return;
      const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
      const normalized = normalizeMatteboxOption(rawValue);
      if (!normalized || normalized === '__none__') return;
      if (seen.has(normalized)) return;
      seen.add(normalized);
      optionValues.push(rawValue);
    });

    if (!optionValues.length) return [];

    const baseProjectInfo = { ...(baseInfo || {}) };
    delete baseProjectInfo.mattebox;
    const emptyHtml = generateGearListHtml({ ...baseProjectInfo, requiredScenarios: '' });
    const emptyMap = parseGearTableForAutoRules(emptyHtml);
    if (!emptyMap) return [];

    const generatedRules = [];
    const handledTriggers = new Set();

    optionValues.forEach(rawValue => {
      const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
      if (!trimmed) return;
      const normalized = normalizeMatteboxOption(trimmed);
      if (!normalized || handledTriggers.has(normalized)) return;
      handledTriggers.add(normalized);

      const infoForSelection = { ...(baseInfo || {}), mattebox: trimmed };
      const selectionHtml = generateGearListHtml({ ...infoForSelection, requiredScenarios: '' });
      const selectionMap = parseGearTableForAutoRules(selectionHtml);
      if (!selectionMap) return;

      const diff = diffGearTableMaps(emptyMap, selectionMap);
      const additions = cloneAutoGearItems(diff.add);
      const removals = cloneAutoGearItems(diff.remove);
      if (!additions.length && !removals.length) return;

      generatedRules.push({
        id: generateAutoGearId('rule'),
        label: getSafeMatteboxFallbackLabel(trimmed),
        scenarios: [],
        mattebox: [trimmed],
        cameraHandle: [],
        viewfinderExtension: [],
        videoDistribution: [],
        add: additions,
        remove: removals,
      });
    });

    return generatedRules;
  }

  function resolveHandUnitCompatibilityMaps() {
    let groups = null;
    let motorMap = null;
    try {
      if (typeof AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS !== 'undefined'
        && AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS
        && typeof AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object') {
        groups = AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS;
      }
    } catch (error) {
      void error;
    }
    if (!groups && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object') {
      groups = GLOBAL_SCOPE.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS;
    }
    try {
      if (typeof AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP !== 'undefined'
        && AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP
        && typeof AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object') {
        motorMap = AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP;
      }
    } catch (error) {
      void error;
    }
    if (!motorMap && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object') {
      motorMap = GLOBAL_SCOPE.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP;
    }
    return {
      groups: groups && typeof groups === 'object' ? groups : null,
      motorMap: motorMap && typeof motorMap === 'object' ? motorMap : null,
    };
  }

  function getHandUnitGroupForMotor(motorName) {
    if (!motorName) return null;
    const maps = resolveHandUnitCompatibilityMaps();
    if (!maps.groups) return null;
    const normalized = normalizeAutoGearTriggerValue(motorName);
    if (!normalized) return null;
    let key = null;
    if (maps.motorMap && Object.prototype.hasOwnProperty.call(maps.motorMap, normalized)) {
      key = maps.motorMap[normalized];
    } else if (Object.prototype.hasOwnProperty.call(maps.groups, normalized)) {
      key = normalized;
    }
    if (!key || !maps.groups[key]) {
      return null;
    }
    const group = maps.groups[key];
    if (!group || !Array.isArray(group.options) || !group.options.length) {
      return null;
    }
    return { key, group };
  }

  function collectAllWirelessTransmitterNames() {
    const names = [];
    if (!devices || typeof devices !== 'object') {
      return names;
    }
    const videoDb = devices.video && typeof devices.video === 'object' ? devices.video : null;
    if (!videoDb) {
      return names;
    }
    Object.keys(videoDb).forEach(name => {
      if (!name || name === 'None') return;
      if (!names.includes(name)) {
        names.push(name);
      }
    });
    return names;
  }

  function buildMotorHandUnitAutoGearRules(baseInfo) {
    const maps = resolveHandUnitCompatibilityMaps();
    if (!maps.groups) {
      return [];
    }

    const setupValues = typeof captureSetupSelectValues === 'function'
      ? captureSetupSelectValues()
      : null;

    const rawMotors = [];
    if (setupValues && Array.isArray(setupValues.motors)) {
      rawMotors.push(...setupValues.motors);
    }
    if (baseInfo && Array.isArray(baseInfo.motorSelections)) {
      rawMotors.push(...baseInfo.motorSelections);
    }
    if (baseInfo && Array.isArray(baseInfo.motors)) {
      rawMotors.push(...baseInfo.motors);
    }

    const motorEntries = rawMotors
      .map(name => (typeof name === 'string' ? name.trim() : ''))
      .filter(name => name && name !== 'None')
      .map(name => ({ name, normalized: normalizeAutoGearTriggerValue(name) }))
      .filter(entry => entry.normalized);

    if (!motorEntries.length) {
      return [];
    }

    let wirelessSelection = '';
    if (setupValues && typeof setupValues.video === 'string') {
      wirelessSelection = setupValues.video.trim();
    }
    if (!wirelessSelection && baseInfo && typeof baseInfo.wirelessSelection === 'string') {
      wirelessSelection = baseInfo.wirelessSelection.trim();
    }
    if (!wirelessSelection || wirelessSelection === 'None') {
      return [];
    }

    const additions = [];
    const handledGroups = new Set();
    motorEntries.forEach(entry => {
      const resolved = getHandUnitGroupForMotor(entry.normalized);
      if (!resolved || handledGroups.has(resolved.key)) {
        return;
      }
      handledGroups.add(resolved.key);
      const group = resolved.group;
      const options = Array.isArray(group.options) ? group.options.filter(Boolean) : [];
      if (!options.length) {
        return;
      }
      const defaultOption = typeof group.defaultOption === 'string' && group.defaultOption
        ? group.defaultOption
        : options[0];
      const contextNotes = [];
      if (group.label) {
        contextNotes.push(group.label);
      }
      if (Array.isArray(group.motors) && group.motors.length) {
        contextNotes.push(`Compatible motors: ${group.motors.join(', ')}`);
      }
      additions.push({
        id: generateAutoGearId('item'),
        name: defaultOption,
        category: 'LDS (FIZ)',
        quantity: 1,
        screenSize: '',
        selectorType: 'fizHandUnit',
        selectorDefault: defaultOption,
        selectorEnabled: true,
        selectorContext: resolved.key,
        notes: '',
        contextNotes,
      });
    });

    if (!additions.length) {
      return [];
    }

    const wirelessTargets = collectAllWirelessTransmitterNames();
    if (!wirelessTargets.length) {
      wirelessTargets.push(wirelessSelection);
    }

    return [{
      id: generateAutoGearId('rule'),
      label: 'FIZ hand units',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      wireless: wirelessTargets,
      motors: [AUTO_GEAR_ANY_MOTOR_TOKEN],
      controllers: [],
      distance: [],
      add: additions,
      remove: [],
    }];
  }

  function buildAutoGearAnyMotorRule() {
    if (typeof captureSetupSelectValues !== 'function') return null;
    const setupValues = captureSetupSelectValues();
    const selectedMotors = Array.isArray(setupValues?.motors)
      ? setupValues.motors.filter(value => typeof value === 'string' && value && value !== 'None')
      : [];
    if (!selectedMotors.length) return null;

    const createItem = (name, category, quantity = 1) => {
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name,
        category,
        quantity,
        screenSize: '',
        selectorType: 'none',
        selectorDefault: '',
        selectorEnabled: false,
        notes: '',
      };
    };

    const additions = [];
    const pushItem = (name, category, quantity = 1) => {
      const item = createItem(name, category, quantity);
      if (item) additions.push(item);
    };

    pushItem('Avenger C-Stand Sliding Leg 20" (Focus)', 'Grip');
    pushItem('Steelfingers Wheel C-Stand 3er Set (Focus)', 'Grip');
    pushItem('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)', 'Grip');
    pushItem('Tennis ball', 'Grip', 3);
    pushItem('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Monitoring support', 2);
    pushItem('Ultraslim BNC Cable 0.3 m (Focus)', 'Monitoring support', 2);
    pushItem('Bebob V150micro (V-Mount) (Focus)', 'Monitoring Batteries', 3);

    if (!additions.length) return null;

    return {
      id: generateAutoGearId('rule'),
      label: 'FIZ motor support kit',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [AUTO_GEAR_ANY_MOTOR_TOKEN],
      controllers: [],
      distance: [],
      add: additions,
      remove: [],
    };
  }

  function buildAlwaysAutoGearRule() {
    const createItem = (name, category, quantity = 1, options = {}) => {
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name,
        category,
        quantity,
        screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
        selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
        selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
        selectorEnabled: options.selectorEnabled === true,
        notes: typeof options.notes === 'string' ? options.notes : '',
      };
    };
    const additions = [];
    const pushItem = (name, category, quantity, options) => {
      const item = createItem(name, category, quantity, options);
      if (item) additions.push(item);
    };
    [
      ['BNC Cable 0.5 m', 'Monitoring support', 1],
      ['BNC Cable 1 m', 'Monitoring support', 1],
      ['BNC Cable 5 m', 'Monitoring support', 1],
      ['BNC Cable 10 m', 'Monitoring support', 1],
      ['BNC Drum 25 m', 'Monitoring support', 1],
      ['BNC Connector', 'Monitoring support', 4],
      ['ULCS Bracket with 1/4" to 1/4"', 'Rigging', 2],
      ['ULCS Bracket with 3/8" to 1/4"', 'Rigging', 2],
      ['Noga Arm', 'Rigging', 2],
      ['Mini Magic Arm', 'Rigging', 2],
      ['Cine Quick Release', 'Rigging', 4],
      ['SmallRig - Super lightweight 15mm RailBlock', 'Rigging', 1],
      ['Spigot with male 3/8" and 1/4"', 'Rigging', 3],
      ['Clapper Stick', 'Rigging', 2],
      ['D-Tap Splitter', 'Rigging', 2],
      ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung', 'Carts and Transportation', 1],
      ['Securing Straps (25mm wide)', 'Carts and Transportation', 10],
      ['Loading Ramp (pair, 420kg)', 'Carts and Transportation', 1],
      ['Ring Fitting for Airline Rails', 'Carts and Transportation', 20],
      ['Power Cable Drum 25-50 m', 'Power', 1],
      ['Power Cable 10 m', 'Power', 2],
      ['Power Cable 5 m', 'Power', 2],
      ['Power Strip', 'Power', 3],
      ['Power Three Way Splitter', 'Power', 3],
      ['PRCD-S (Portable Residual Current Device-Safety)', 'Power', 3],
    ].forEach(([name, category, quantity]) => pushItem(name, category, quantity));

    if (!additions.length) return null;

    return {
      id: generateAutoGearId('rule'),
      label: 'Always',
      always: true,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      add: additions,
      remove: [],
    };
  }

  function buildFiveDayConsumablesAutoGearRule() {
    const createItem = (name, category, quantity = 1, options = {}) => {
      if (!name || !category || quantity <= 0) return null;
      return {
        id: generateAutoGearId('item'),
        name,
        category,
        quantity,
        screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
        selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
        selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
        selectorEnabled: options.selectorEnabled === true,
        notes: typeof options.notes === 'string' ? options.notes : '',
      };
    };

    const additions = [];
    const pushItem = (name, category, quantity, options) => {
      const item = createItem(name, category, quantity, options);
      if (item) additions.push(item);
    };

    pushItem('Bluestar eye leather made of microfiber oval, large', 'Consumables', 4);
    pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Primary color roll' });
    pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Secondary color roll' });
    pushItem('Clapper Stick', 'Rigging', 4);
    pushItem('Kimtech Wipes', 'Consumables', 2);
    pushItem('Sprigs Red 1/4"', 'Consumables', 1);

    if (!additions.length) return null;

    return {
      id: generateAutoGearId('rule'),
      label: 'Every 5 shooting days',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: { mode: 'every', value: 5 },
      add: additions,
      remove: [],
    };
  }

  function ensureDefaultMatteboxAutoGearRules() {
    const defaults = buildDefaultMatteboxAutoGearRules();
    if (!defaults.length) return false;
    const existingKeys = new Set(
      autoGearRules
        .map(autoGearRuleMatteboxKey)
        .filter(Boolean)
    );
    const additions = defaults.filter(rule => {
      const key = autoGearRuleMatteboxKey(rule);
      if (!key) return false;
      if (existingKeys.has(key)) return false;
      existingKeys.add(key);
      return true;
    });
    if (!additions.length) return false;
    setAutoGearRules(autoGearRules.concat(additions));
    return true;
  }

  function captureSetupSelectValues() {
    const captureList = list => list.map(sel => (sel && typeof sel.value === 'string') ? sel.value : '');
    const captured = {
      camera: cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '',
      monitor: monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '',
      video: videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '',
      cage: cageSelect && typeof cageSelect.value === 'string' ? cageSelect.value : '',
      distance: distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '',
      battery: batterySelect && typeof batterySelect.value === 'string' ? batterySelect.value : '',
      batteryPlate: batteryPlateSelect && typeof batteryPlateSelect.value === 'string'
        ? batteryPlateSelect.value
        : '',
      hotswap: hotswapSelect && typeof hotswapSelect.value === 'string' ? hotswapSelect.value : '',
      motors: captureList(motorSelects),
      controllers: captureList(controllerSelects),
      sliderBowl: typeof getSliderBowlValue === 'function' ? getSliderBowlValue() : '',
      easyrig: typeof getEasyrigValue === 'function' ? getEasyrigValue() : '',
    };
    return finalizeCapturedSetupValues(captured);
  }

  function finalizeCapturedSetupValues(values) {
    if (!values || typeof values !== 'object') {
      return values;
    }
    values.batteryPlate = normalizeBatteryPlateValue(values.batteryPlate, values.battery);
    return values;
  }

  function applySetupSelectValues(values) {
    if (!values || typeof values !== 'object') return;
    if (cameraSelect) {
      setSelectValue(cameraSelect, values.camera);
      if (typeof updateBatteryPlateVisibility === 'function') {
        updateBatteryPlateVisibility();
      }
      if (typeof updateBatteryOptions === 'function') {
        updateBatteryOptions();
      }
    }
    if (batteryPlateSelect) setSelectValue(batteryPlateSelect, values.batteryPlate);
    if (values && typeof values.battery === 'string') {
      applyBatteryPlateSelectionFromBattery(values.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    }
    if (monitorSelect) setSelectValue(monitorSelect, values.monitor);
    if (videoSelect) setSelectValue(videoSelect, values.video);
    if (cageSelect) setSelectValue(cageSelect, values.cage);
    if (distanceSelect) setSelectValue(distanceSelect, values.distance);
    if (Array.isArray(values.motors)) {
      values.motors.forEach((val, index) => {
        if (motorSelects[index]) setSelectValue(motorSelects[index], val);
      });
    }
    if (Array.isArray(values.controllers)) {
      values.controllers.forEach((val, index) => {
        if (controllerSelects[index]) setSelectValue(controllerSelects[index], val);
      });
    }
    if (batterySelect) setSelectValue(batterySelect, values.battery);
    if (hotswapSelect) setSelectValue(hotswapSelect, values.hotswap);
    if (typeof setSliderBowlValue === 'function') setSliderBowlValue(values.sliderBowl);
    if (typeof setEasyrigValue === 'function') setEasyrigValue(values.easyrig);
  }

  function captureAutoGearSeedContext() {
    if (factoryAutoGearSeedContext) return;
    if (typeof collectProjectFormData !== 'function') return;
    const baseInfo = collectProjectFormData() || {};
    let projectDataClone = cloneWithStructuredCloneFallback(baseInfo);
    if (!projectDataClone || typeof projectDataClone !== 'object') {
      projectDataClone = { ...baseInfo };
    }
    const scenarioValues = requiredScenariosSelect
      ? Array.from(requiredScenariosSelect.options || [])
        .map(opt => opt && typeof opt.value === 'string' ? opt.value : '')
        .filter(value => value)
      : [];
    factoryAutoGearSeedContext = {
      projectFormData: projectDataClone,
      scenarioValues,
      setupValues: captureSetupSelectValues(),
    };
  }

  function buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues) {
    const rules = [];
    const canGenerateRules = typeof generateGearListHtml === 'function'
      && typeof parseGearTableForAutoRules === 'function';
    const scenarios = Array.isArray(scenarioValues)
      ? scenarioValues.filter(value => typeof value === 'string' && value)
      : [];

    let baselineMap = null;
    if (canGenerateRules) {
      const baselineHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: '' });
      baselineMap = parseGearTableForAutoRules(baselineHtml);

      if (baselineMap && scenarios.length) {
        const scenarioDiffMap = new Map();
        scenarios.forEach(value => {
          const scenarioHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: value });
          const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
          if (!scenarioMap) return;
          const diff = diffGearTableMaps(baselineMap, scenarioMap);
          let add = cloneAutoGearItems(diff.add);
          let remove = cloneAutoGearItems(diff.remove);
          if (!add.length && !remove.length) return;
          scenarioDiffMap.set(value, { add, remove });
          rules.push({
            id: generateAutoGearId('rule'),
            label: value,
            scenarios: [value],
            add,
            remove,
          });
        });

        const comboCandidates = [
          ['Handheld', 'Easyrig'],
          ['Slider', 'Undersling mode']
        ].filter(combo => combo.every(value => scenarios.includes(value)));

        comboCandidates.forEach(combo => {
          const combinedLabel = combo.join(' + ');
          const scenarioHtml = generateGearListHtml({
            ...baseInfo,
            requiredScenarios: combo.join(', ')
          });
          const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
          if (!scenarioMap) return;
          const diff = diffGearTableMaps(baselineMap, scenarioMap);
          const adjusted = subtractScenarioContributions({
            add: cloneAutoGearItems(diff.add),
            remove: cloneAutoGearItems(diff.remove)
          }, combo, scenarioDiffMap);
          if (!adjusted.add.length && !adjusted.remove.length) return;
          rules.push({
            id: generateAutoGearId('rule'),
            label: combinedLabel,
            scenarios: combo.slice(),
            add: adjusted.add,
            remove: adjusted.remove,
          });
        });

        const rainOverlapKeys = ['Extreme rain', 'Rain Machine'];
        const hasRainOverlap = rainOverlapKeys.every(key => scenarioDiffMap.has(key));
        if (hasRainOverlap) {
          const overlapRemovals = [
            { name: 'Schulz Sprayoff Micro', quantity: 1, category: 'Matte box + filter' },
            { name: 'Fischer RS to D-Tap cable 0,5m', quantity: 2, category: 'Rigging' },
            { name: 'Spare Disc (Schulz Sprayoff Micro)', quantity: 1, category: 'Matte box + filter' },
          ].map(entry => ({
            id: generateAutoGearId('item'),
            name: entry.name,
            category: entry.category,
            quantity: entry.quantity,
          }));
          rules.push({
            id: generateAutoGearId('rule'),
            label: 'Extreme rain + Rain Machine overlap',
            scenarios: rainOverlapKeys.slice(),
            add: [],
            remove: overlapRemovals,
          });
        }
      }
    }

    if (baselineMap) {
      buildCameraHandleAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildVideoDistributionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildMatteboxAutoGearRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildCageAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildTripodAutoGearRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildBatteryAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildDistanceAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildHotswapAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
      buildBatteryPlateAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));

      const existingSignatures = new Set(
        rules
          .map(autoGearRuleSignature)
          .filter(signature => typeof signature === 'string' && signature)
      );

      const appendUniqueRules = additionalRules => {
        if (!Array.isArray(additionalRules) || !additionalRules.length) {
          return;
        }
        additionalRules.forEach(rule => {
          const signature = autoGearRuleSignature(rule);
          if (!signature || existingSignatures.has(signature)) return;
          rules.push(rule);
          existingSignatures.add(signature);
        });
      };

      appendUniqueRules(buildDefaultVideoDistributionRules(baseInfo));
      appendUniqueRules(buildOnboardMonitorRiggingAutoGearRules());
      appendUniqueRules(buildTripodPreferenceAutoGearRules(baseInfo));
      appendUniqueRules(buildArriViewfinderBracketRules(baseInfo));
      appendUniqueRules(buildMotorHandUnitAutoGearRules(baseInfo));
    }

    const anyMotorRule = buildAutoGearAnyMotorRule();
    if (anyMotorRule) {
      const targetSignature = autoGearRuleSignature(anyMotorRule);
      const exists = rules.some(rule => autoGearRuleSignature(rule) === targetSignature);
      if (!exists) {
        rules.push(anyMotorRule);
      }
    }

    const alwaysRule = buildAlwaysAutoGearRule();
    if (alwaysRule) {
      rules.push(alwaysRule);
    }

    const fiveDayRule = buildFiveDayConsumablesAutoGearRule();
    if (fiveDayRule) {
      rules.push(fiveDayRule);
    }

    buildDefaultMatteboxAutoGearRules().forEach(rule => rules.push(rule));
    return rules;
  }

  function computeFactoryAutoGearRules() {
    captureAutoGearSeedContext();
    const context = factoryAutoGearSeedContext;
    if (!context) return null;

    const previousSelectValues = captureSetupSelectValues();
    const seededBeforeCompute = hasSeededAutoGearDefaults();
    const savedAutoGearRules = autoGearRules.slice();
    const savedBaseAutoGearRules = baseAutoGearRulesState.slice();
    const savedProjectScopedRules = projectScopedAutoGearRules
      ? projectScopedAutoGearRules.slice()
      : null;
    const savedBackupSignature = autoGearRulesLastBackupSignature;
    const savedPersistedSignature = autoGearRulesLastPersistedSignature;
    const savedDirtyFlag = autoGearRulesDirtySinceBackup;
    try {
      if (seededBeforeCompute) {
        clearAutoGearDefaultsSeeded();
      }
      assignAutoGearRules([]);
      baseAutoGearRulesState = [];
      projectScopedAutoGearRules = null;
      autoGearRulesLastBackupSignature = savedBackupSignature;
      autoGearRulesLastPersistedSignature = savedPersistedSignature;
      autoGearRulesDirtySinceBackup = savedDirtyFlag;
      applySetupSelectValues(context.setupValues);
      const baseInfoSource = context.projectFormData || {};
      let baseInfo = cloneWithStructuredCloneFallback(baseInfoSource);
      if (!baseInfo || typeof baseInfo !== 'object') {
        baseInfo = { ...baseInfoSource };
      }
      const rules = buildAutoGearRulesFromBaseInfo(baseInfo, context.scenarioValues || []);
      if (rules.length) {
        setFactoryAutoGearRulesSnapshot(rules);
      }
      return rules;
    } finally {
      applySetupSelectValues(previousSelectValues);
      assignAutoGearRules(savedAutoGearRules);
      baseAutoGearRulesState = savedBaseAutoGearRules.slice();
      projectScopedAutoGearRules = savedProjectScopedRules
        ? savedProjectScopedRules.slice()
        : null;
      autoGearRulesLastBackupSignature = savedBackupSignature;
      autoGearRulesLastPersistedSignature = savedPersistedSignature;
      autoGearRulesDirtySinceBackup = savedDirtyFlag;
      if (seededBeforeCompute) {
        markAutoGearDefaultsSeeded();
      }
    }
  }

  function seedAutoGearRulesFromCurrentProject() {
    captureAutoGearSeedContext();
    const seededBefore = hasSeededAutoGearDefaults();

    if (autoGearRules.length) {
      const addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (addedDefaults && !seededBefore) {
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      } else if (!factoryAutoGearRulesSnapshot) {
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }

    if (seededBefore) {
      const addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (addedDefaults && !factoryAutoGearRulesSnapshot) {
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }

    const baseInfo = factoryAutoGearSeedContext && factoryAutoGearSeedContext.projectFormData
      ? { ...factoryAutoGearSeedContext.projectFormData }
      : (collectProjectFormData ? collectProjectFormData() : {});
    const scenarioValues = factoryAutoGearSeedContext && Array.isArray(factoryAutoGearSeedContext.scenarioValues)
      ? factoryAutoGearSeedContext.scenarioValues
      : (requiredScenariosSelect
        ? Array.from(requiredScenariosSelect.options || [])
          .map(opt => opt && opt.value)
          .filter(Boolean)
        : []);

    const rules = buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues);
    if (!rules.length) {
      const addedDefaults = ensureDefaultMatteboxAutoGearRules();
      if (addedDefaults) {
        markAutoGearDefaultsSeeded();
        setFactoryAutoGearRulesSnapshot(getAutoGearRules());
      }
      return;
    }
    setAutoGearRules(rules);
    markAutoGearDefaultsSeeded();
    setFactoryAutoGearRulesSnapshot(rules);
  }

  function resetAutoGearRulesToFactoryAdditions() {
    const langTexts = texts[currentLang] || texts.en || {};
    const fallbackTexts = texts.en || {};
    const confirmation = langTexts.autoGearResetFactoryConfirm
      || texts.en?.autoGearResetFactoryConfirm
      || 'Replace your automatic gear rules with the default additions?';

    const performReset = () => {
      const exportFailureMessage = langTexts.autoGearResetFactoryExportFailed
        || fallbackTexts.autoGearResetFactoryExportFailed
        || 'Automatic gear preset export failed. Reset cancelled.';

      let presetExportOutcome = { status: 'skipped', reason: 'empty' };
      if (typeof exportAutoGearPresets === 'function') {
        try {
          const result = exportAutoGearPresets({ reason: 'reset-auto-gear' });
          presetExportOutcome = result || { status: 'failed', reason: 'unknown' };
        } catch (exportError) {
          console.error('Failed to export automatic gear presets before reset', exportError);
          presetExportOutcome = { status: 'failed', reason: 'exception', error: exportError };
        }
      } else {
        presetExportOutcome = { status: 'failed', reason: 'unavailable' };
      }

      if (
        !presetExportOutcome
        || presetExportOutcome.status === 'failed'
        || (presetExportOutcome.status === 'skipped' && presetExportOutcome.reason !== 'empty')
      ) {
        if (typeof showNotification === 'function') {
          showNotification('error', exportFailureMessage);
        }
        return;
      }

      const backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
      if (!backupName) {
        return;
      }

      const successMessage = langTexts.autoGearResetFactoryDone
        || fallbackTexts.autoGearResetFactoryDone
        || 'Automatic gear rules restored to factory additions.';
      const emptyMessage = langTexts.autoGearResetFactoryEmpty
        || fallbackTexts.autoGearResetFactoryEmpty
        || 'Factory additions unavailable. Automatic gear rules cleared.';
      const failureMessage = langTexts.autoGearResetFactoryError
        || fallbackTexts.autoGearResetFactoryError
        || 'Reset failed. Please try again.';

      try {
        const factoryRules = computeFactoryAutoGearRules();
        if (Array.isArray(factoryRules) && factoryRules.length) {
          setAutoGearRules(factoryRules);
          markAutoGearDefaultsSeeded();
          setFactoryAutoGearRulesSnapshot(getAutoGearRules());
          if (typeof showNotification === 'function') {
            showNotification('success', successMessage);
          }
          return;
        }

        setAutoGearRules([]);
        setFactoryAutoGearRulesSnapshot(null);
        clearAutoGearDefaultsSeeded();
        const addedDefaults = ensureDefaultMatteboxAutoGearRules();
        if (addedDefaults) {
          markAutoGearDefaultsSeeded();
          setFactoryAutoGearRulesSnapshot(getAutoGearRules());
          if (typeof showNotification === 'function') {
            showNotification('success', successMessage);
          }
          return;
        }
        if (typeof showNotification === 'function') {
          showNotification('info', emptyMessage);
        }
      } catch (error) {
        console.error('Failed to reset automatic gear rules to factory additions', error);
        if (typeof showNotification === 'function') {
          showNotification('error', failureMessage);
        }
        if (backupName && typeof notifyAutoSaveFromBackup === 'function') {
          try {
            notifyAutoSaveFromBackup(failureMessage, backupName, 'error');
          } catch (notifyError) {
            console.warn('Failed to announce automatic backup after reset failure', notifyError);
          }
        }
      }
    };

    if (typeof window.cineShowConfirmDialog === 'function') {
      window.cineShowConfirmDialog({
        title: langTexts.autoGearResetFactoryTitle || 'Reset to Factory',
        message: confirmation,
        confirmLabel: langTexts.autoGearResetFactoryConfirmLabel || 'Reset',
        cancelLabel: langTexts.cancel || 'Cancel',
        danger: true,
        onConfirm: performReset,
      });
      return;
    }

    console.warn('Missing window.cineShowConfirmDialog for resetAutoGearRulesToFactoryAdditions');
  }

  const autoGearRulesAPI = freezeDeep({
    getFactoryAutoGearRulesSnapshot: function getFactoryAutoGearRulesSnapshot() {
      return factoryAutoGearRulesSnapshot
        ? cloneAutoGearRules(factoryAutoGearRulesSnapshot)
        : null;
    },
    getFactoryAutoGearSeedContext: function getFactoryAutoGearSeedContext() {
      if (!factoryAutoGearSeedContext) {
        return null;
      }
      const clonedContext = cloneWithStructuredCloneFallback(factoryAutoGearSeedContext);
      if (clonedContext && typeof clonedContext === 'object') {
        return clonedContext;
      }
      return { ...factoryAutoGearSeedContext };
    },
    setFactoryAutoGearRulesSnapshot,
    cloneAutoGearItems,
    cloneAutoGearRuleItem,
    cloneAutoGearRule,
    cloneAutoGearRules,
    subtractScenarioContributions,
    extractAutoGearSelections,
    buildCameraHandleAutoRules,
    buildViewfinderExtensionAutoRules,
    buildVideoDistributionAutoRules,
    buildOnboardMonitorRiggingAutoGearRules,
    buildTripodPreferenceAutoGearRules,
    buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionRules,
    buildDefaultMatteboxAutoGearRules,
    buildAutoGearAnyMotorRule,
    buildAlwaysAutoGearRule,
    buildFiveDayConsumablesAutoGearRule,
    buildArriViewfinderBracketRules,
    ensureDefaultMatteboxAutoGearRules,
    captureAutoGearSeedContext,
    buildAutoGearRulesFromBaseInfo,
    computeFactoryAutoGearRules,
    seedAutoGearRulesFromCurrentProject,
    resetAutoGearRulesToFactoryAdditions,
  });

  registerOrQueueModule(
    'cineFeatureAutoGearRules',
    autoGearRulesAPI,
    {
      category: 'feature',
      description: 'Automatic gear rule cloning, factory defaults and seeding helpers.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence'],
    },
    (error) => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to register cineFeatureAutoGearRules module.', error);
      }
    }
  );

  const globalExports = [
    ['cineFeatureAutoGearRules', autoGearRulesAPI],
    ['buildDefaultVideoDistributionAutoGearRules', buildDefaultVideoDistributionRules],
    ['buildVideoDistributionAutoRules', buildVideoDistributionAutoRules],
    ['buildTripodPreferenceAutoGearRules', buildTripodPreferenceAutoGearRules],
    ['cloneAutoGearItems', cloneAutoGearItems],
    ['cloneAutoGearRuleItem', cloneAutoGearRuleItem],
    ['cloneAutoGearRule', cloneAutoGearRule],
    ['cloneAutoGearRules', cloneAutoGearRules],
    ['setFactoryAutoGearRulesSnapshot', setFactoryAutoGearRulesSnapshot],
    ['ensureDefaultMatteboxAutoGearRules', ensureDefaultMatteboxAutoGearRules],
    ['captureAutoGearSeedContext', captureAutoGearSeedContext],
    ['buildAutoGearRulesFromBaseInfo', buildAutoGearRulesFromBaseInfo],
    ['buildArriViewfinderBracketRules', buildArriViewfinderBracketRules],
    ['computeFactoryAutoGearRules', computeFactoryAutoGearRules],
    ['seedAutoGearRulesFromCurrentProject', seedAutoGearRulesFromCurrentProject],
    ['resetAutoGearRulesToFactoryAdditions', resetAutoGearRulesToFactoryAdditions],
    ['factoryAutoGearRulesSnapshot', null],
    ['factoryAutoGearSeedContext', null],
  ];

  globalExports.forEach(([name, value]) => {
    if (name === 'factoryAutoGearRulesSnapshot') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get() {
          return factoryAutoGearRulesSnapshot;
        },
        set(next) {
          factoryAutoGearRulesSnapshot = Array.isArray(next)
            ? cloneAutoGearRules(next)
            : null;
        },
      });
      return;
    }
    if (name === 'factoryAutoGearSeedContext') {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        get() {
          return factoryAutoGearSeedContext;
        },
        set(next) {
          factoryAutoGearSeedContext = next && typeof next === 'object'
            ? next
            : null;
        },
      });
      return;
    }
    exposeGlobal(name, value, { configurable: true, writable: true });
  });
})();
