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
            : null;

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

  const APP_VERSION = '1.0.9';

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

  if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
    try {
      MODULE_REGISTRY.register('cineCoreShared', shared, {
        category: 'shared',
        description: 'Shared helpers for deterministic stringification, weights, and version markers.',
        replace: true,
      });
    } catch (error) {
      void error;
    }
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      if (!GLOBAL_SCOPE.APP_VERSION) {
        Object.defineProperty(GLOBAL_SCOPE, 'APP_VERSION', {
          configurable: true,
          enumerable: false,
          value: APP_VERSION,
          writable: false,
        });
      }
    } catch (error) {
      void error;
      if (!GLOBAL_SCOPE.APP_VERSION) {
        GLOBAL_SCOPE.APP_VERSION = APP_VERSION;
      }
    }

    try {
      Object.defineProperty(GLOBAL_SCOPE, 'cineCoreShared', {
        configurable: true,
        enumerable: false,
        value: shared,
        writable: false,
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.cineCoreShared = shared;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = shared;
  }
})();
