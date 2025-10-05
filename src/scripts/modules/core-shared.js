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

  const safeWarn = MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function'
    ? MODULE_ENV.safeWarn
    : function safeWarn(message, detail) {
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

  function createStableStringify() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.stableStringify === 'function') {
      return GLOBAL_SCOPE.stableStringify;
    }

    function stableStringify(value) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (Array.isArray(value)) {
        return `[${value.map(item => stableStringify(item)).join(',')}]`;
      }
      if (typeof value === 'object') {
        const keys = Object.keys(value).sort();
        const entries = keys.map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
        return `{${entries.join(',')}}`;
      }
      return JSON.stringify(value);
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.stableStringify = stableStringify;
      } catch (error) {
        void error;
      }
    }

    return stableStringify;
  }

  const HUMANIZE_OVERRIDES = {
    powerDrawWatts: 'Power (W)',
    capacity: 'Capacity (Wh)',
    pinA: 'Pin A',
    dtapA: 'D-Tap A',
    mount_type: 'Mount',
    screenSizeInches: 'Screen Size (in)',
    brightnessNits: 'Brightness (nits)',
    torqueNm: 'Torque (Nm)',
    internalController: 'Internal Controller',
    powerSource: 'Power Source',
    batteryType: 'Battery Type',
    connectivity: 'Connectivity'
  };

  function createHumanizeKey() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.humanizeKey === 'function') {
      return GLOBAL_SCOPE.humanizeKey;
    }

    function humanizeKey(key) {
      if (key && Object.prototype.hasOwnProperty.call(HUMANIZE_OVERRIDES, key)) {
        return HUMANIZE_OVERRIDES[key];
      }

      const stringValue = typeof key === 'string' ? key : String(key || '');
      return stringValue
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (c) => c.toUpperCase());
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.humanizeKey = humanizeKey;
      } catch (error) {
        void error;
      }
    }

    return humanizeKey;
  }

  const stableStringify = createStableStringify();
  const humanizeKey = createHumanizeKey();

  let cachedConnectorSummaryGenerator = null;
  let connectorSummaryCachePrimed = false;

  function resolveConnectorSummaryGenerator() {
    if (connectorSummaryCachePrimed && typeof cachedConnectorSummaryGenerator === 'function') {
      return cachedConnectorSummaryGenerator;
    }

    const scopes = [];
    if (typeof globalThis !== 'undefined') scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof global !== 'undefined') scopes.push(global);
    if (typeof self !== 'undefined') scopes.push(self);

    for (const scope of scopes) {
      if (scope && typeof scope.generateConnectorSummary === 'function') {
        cachedConnectorSummaryGenerator = scope.generateConnectorSummary;
        connectorSummaryCachePrimed = true;
        return cachedConnectorSummaryGenerator;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.generateConnectorSummary === 'function') {
      cachedConnectorSummaryGenerator = GLOBAL_SCOPE.generateConnectorSummary;
      connectorSummaryCachePrimed = true;
      return cachedConnectorSummaryGenerator;
    }

    return null;
  }

  function safeGenerateConnectorSummary(device) {
    if (!device) {
      return '';
    }

    const generator = resolveConnectorSummaryGenerator();
    if (typeof generator !== 'function') {
      return '';
    }
    try {
      const summary = generator(device);
      return summary || '';
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to generate connector summary', error);
      }
      return '';
    }
  }

  let autoGearWeightHelpers = null;
  if (typeof require === 'function') {
    try {
      autoGearWeightHelpers = require('../auto-gear-weight.js');
    } catch (error) {
      void error;
    }
  }

  const autoGearWeightScope = GLOBAL_SCOPE || {};

  const normalizeAutoGearWeightOperator =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightOperator === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearWeightOperator
      : typeof autoGearWeightScope.normalizeAutoGearWeightOperator === 'function'
        ? autoGearWeightScope.normalizeAutoGearWeightOperator
        : function normalizeAutoGearWeightOperator(value) {
            if (typeof value !== 'string') return 'greater';
            const normalized = value.trim().toLowerCase();
            if (!normalized) return 'greater';
            if (normalized === '>' || normalized === 'gt' || normalized === 'greaterthan' || normalized === 'above' || normalized === 'over') {
              return 'greater';
            }
            if (normalized === '<' || normalized === 'lt' || normalized === 'lessthan' || normalized === 'below' || normalized === 'under') {
              return 'less';
            }
            if (
              normalized === '=' ||
              normalized === '==' ||
              normalized === 'equal' ||
              normalized === 'equals' ||
              normalized === 'exactly' ||
              normalized === 'match' ||
              normalized === 'matches'
            ) {
              return 'equal';
            }
            return 'greater';
          });

  const normalizeAutoGearWeightValue =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightValue === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearWeightValue
      : typeof autoGearWeightScope.normalizeAutoGearWeightValue === 'function'
        ? autoGearWeightScope.normalizeAutoGearWeightValue
        : function normalizeAutoGearWeightValue(value) {
            if (typeof value === 'number' && Number.isFinite(value)) {
              const rounded = Math.round(value);
              return rounded >= 0 ? rounded : null;
            }
            if (typeof value === 'string') {
              const trimmed = value.trim();
              if (!trimmed) return null;
              const sanitized = trimmed.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
              if (!sanitized) return null;
              const parsed = Number.parseFloat(sanitized);
              if (!Number.isFinite(parsed)) return null;
              const rounded = Math.round(parsed);
              return rounded >= 0 ? rounded : null;
            }
            return null;
          });

  const normalizeAutoGearCameraWeightCondition =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition
      : typeof autoGearWeightScope.normalizeAutoGearCameraWeightCondition === 'function'
        ? autoGearWeightScope.normalizeAutoGearCameraWeightCondition
        : function normalizeAutoGearCameraWeightCondition() {
            return null;
          });

  const formatAutoGearWeight =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearWeight === 'function'
      ? autoGearWeightHelpers.formatAutoGearWeight
      : typeof autoGearWeightScope.formatAutoGearWeight === 'function'
        ? autoGearWeightScope.formatAutoGearWeight
        : function formatAutoGearWeight(value) {
            if (!Number.isFinite(value)) return '';
            try {
              if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
                return new Intl.NumberFormat().format(value);
              }
            } catch (error) {
              void error;
            }
            return String(value);
          });

  const getAutoGearCameraWeightOperatorLabel =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel === 'function'
      ? autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel
      : typeof autoGearWeightScope.getAutoGearCameraWeightOperatorLabel === 'function'
        ? autoGearWeightScope.getAutoGearCameraWeightOperatorLabel
        : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
            const textsForLang = langTexts || {};
            const fallbackTexts = (autoGearWeightScope && autoGearWeightScope.texts && autoGearWeightScope.texts.en) || {};
            const normalized = normalizeAutoGearWeightOperator(operator);
            if (normalized === 'less') {
              return textsForLang.autoGearCameraWeightOperatorLess
                || fallbackTexts.autoGearCameraWeightOperatorLess
                || 'Lighter than';
            }
            if (normalized === 'equal') {
              return textsForLang.autoGearCameraWeightOperatorEqual
                || fallbackTexts.autoGearCameraWeightOperatorEqual
                || 'Exactly';
            }
            return textsForLang.autoGearCameraWeightOperatorGreater
              || fallbackTexts.autoGearCameraWeightOperatorGreater
              || 'Heavier than';
          });

  const formatAutoGearCameraWeight =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearCameraWeight === 'function'
      ? autoGearWeightHelpers.formatAutoGearCameraWeight
      : typeof autoGearWeightScope.formatAutoGearCameraWeight === 'function'
        ? autoGearWeightScope.formatAutoGearCameraWeight
        : function formatAutoGearCameraWeight(condition, langTexts) {
            if (!condition || !Number.isFinite(condition.value)) return '';
            const label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
            const formattedValue = formatAutoGearWeight(condition.value);
            return `${label} ${formattedValue} g`;
          });

  function resolveLzString() {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      return GLOBAL_SCOPE.LZString;
    }

    let resolved = null;
    if (typeof require === 'function') {
      try {
        resolved = require('lz-string');
      } catch (error) {
        void error;
      }
    }

    if (!resolved && GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      resolved = GLOBAL_SCOPE.LZString;
    }

    if (!resolved) {
      resolved = {
        compressToEncodedURIComponent: s => s,
        decompressFromEncodedURIComponent: s => s,
        compressToUTF16: s => s,
        decompressFromUTF16: s => s,
      };
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.LZString = resolved;
      } catch (error) {
        void error;
      }
    }

    return resolved;
  }

  const LZString = resolveLzString();

  const APP_VERSION = '1.0.12';

  const shared = freezeDeep({
    APP_VERSION,
    stableStringify,
    humanizeKey,
    resolveConnectorSummaryGenerator,
    safeGenerateConnectorSummary,
    normalizeAutoGearWeightOperator,
    normalizeAutoGearWeightValue,
    normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight,
    getAutoGearCameraWeightOperatorLabel,
    formatAutoGearCameraWeight,
    LZString,
    getLZString() {
      return LZString;
    },
  });

  registerOrQueueModule('cineCoreShared', shared, {
    category: 'shared',
    description: 'Shared helpers for deterministic stringification, weights, and version markers.',
    replace: true,
  });

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    if (!GLOBAL_SCOPE.APP_VERSION) {
      const exposedVersion = exposeGlobal('APP_VERSION', APP_VERSION, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
      if (!exposedVersion) {
        safeWarn('Unable to expose APP_VERSION globally for cineCoreShared.');
      }
    }

    const exposedShared = exposeGlobal('cineCoreShared', shared, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
    if (!exposedShared) {
      safeWarn('Unable to expose cineCoreShared globally.');
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = shared;
  }
})();
