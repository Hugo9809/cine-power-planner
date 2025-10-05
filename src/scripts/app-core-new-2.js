var CORE_PART2_RUNTIME_SCOPE =
  typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE
    ? CORE_GLOBAL_SCOPE
    : typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : null;

var CORE_PART2_GLOBAL_SCOPES = [
  CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
    ? CORE_PART2_RUNTIME_SCOPE
    : null,
  typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
    ? CORE_GLOBAL_SCOPE
    : null,
  typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
  typeof window !== 'undefined' && typeof window === 'object' ? window : null,
  typeof self !== 'undefined' && typeof self === 'object' ? self : null,
  typeof global !== 'undefined' && typeof global === 'object' ? global : null,
].filter(Boolean);

function readGlobalScopeValue(name) {
  for (let index = 0; index < CORE_PART2_GLOBAL_SCOPES.length; index += 1) {
    const scope = CORE_PART2_GLOBAL_SCOPES[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (name in scope) {
        return scope[name];
      }
    } catch (readError) {
      void readError;
    }
  }

  return undefined;
}

function ensureGlobalFallback(name, fallbackValue) {
  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
          return fallbackValue;
        };

  for (var index = 0; index < CORE_PART2_GLOBAL_SCOPES.length; index += 1) {
    var scope = CORE_PART2_GLOBAL_SCOPES[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (ensureError) {
      void ensureError;
    }
  }

  try {
    return fallbackProvider();
  } catch (fallbackError) {
    void fallbackError;
    return undefined;
  }
}

function normaliseGlobalValue(name, validator, fallbackValue) {
  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
          return fallbackValue;
        };

  for (var index = 0; index < CORE_PART2_GLOBAL_SCOPES.length; index += 1) {
    var scope = CORE_PART2_GLOBAL_SCOPES[index];
    try {
      if (!validator(scope[name])) {
        scope[name] = fallbackProvider();
      }
    } catch (normaliseError) {
      void normaliseError;
    }
  }
}

ensureGlobalFallback('autoGearAutoPresetId', '');
ensureGlobalFallback('baseAutoGearRules', function () {
  return [];
});
ensureGlobalFallback('autoGearScenarioModeSelect', null);

function createFallbackSafeGenerateConnectorSummary() {
  return function safeGenerateConnectorSummary(device) {
    if (!device || typeof device !== 'object') {
      return '';
    }

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(
        'Using fallback connector summary generator. Core bindings may have failed to initialise.',
      );
    }

    try {
      const keys = Object.keys(device);
      if (!keys.length) {
        return '';
      }

      const primaryKey = keys[0];
      const value = device[primaryKey];
      const label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
      return value ? `${label}: ${value}` : label;
    } catch (fallbackError) {
      void fallbackError;
      return '';
    }
  };
}

ensureGlobalFallback('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});

normaliseGlobalValue(
  'baseAutoGearRules',
  function validateBaseAutoGearRules(value) {
    return Array.isArray(value);
  },
  function provideBaseAutoGearRulesFallback() {
    return [];
  },
);

normaliseGlobalValue(
  'safeGenerateConnectorSummary',
  function validateSafeGenerateConnectorSummary(value) {
    return typeof value === 'function';
  },
  function provideSafeGenerateConnectorSummaryFallback() {
    return createFallbackSafeGenerateConnectorSummary();
  },
);

var autoGearAutoPresetId;
if (typeof autoGearAutoPresetId === 'undefined') {
  // Ensure a concrete global binding exists for browsers that throw when a
  // property-only binding is accessed without `window.`.
  autoGearAutoPresetId = '';
} else if (typeof autoGearAutoPresetId !== 'string') {
  autoGearAutoPresetId = '';
}

var baseAutoGearRules;
if (typeof baseAutoGearRules === 'undefined') {
  baseAutoGearRules = [];
} else if (!Array.isArray(baseAutoGearRules)) {
  baseAutoGearRules = [];
}

var autoGearScenarioModeSelect;
if (typeof autoGearScenarioModeSelect === 'undefined') {
  autoGearScenarioModeSelect = null;
}

var safeGenerateConnectorSummary;
if (typeof safeGenerateConnectorSummary === 'undefined') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
} else if (typeof safeGenerateConnectorSummary !== 'function') {
  safeGenerateConnectorSummary = createFallbackSafeGenerateConnectorSummary();
}

function ensureCorePart2Placeholder(name, fallbackValue) {
  var providers = [
    CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
      ? CORE_PART2_RUNTIME_SCOPE
      : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ].filter(Boolean);

  var fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : function provideStaticFallback() {
          return fallbackValue;
        };

  for (var index = 0; index < providers.length; index += 1) {
    var scope = providers[index];
    try {
      if (typeof scope[name] === 'undefined') {
        scope[name] = fallbackProvider();
      }
      return scope[name];
    } catch (placeholderError) {
      void placeholderError;
    }
  }

  return fallbackProvider();
}

ensureCorePart2Placeholder('autoGearAutoPresetId', '');
ensureCorePart2Placeholder('baseAutoGearRules', function () {
  return [];
});
ensureCorePart2Placeholder('autoGearScenarioModeSelect', null);
ensureCorePart2Placeholder('safeGenerateConnectorSummary', function () {
  return createFallbackSafeGenerateConnectorSummary();
});

function resolveInitialPart2Value(name) {
  const candidates = [
    CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
      ? CORE_PART2_RUNTIME_SCOPE
      : null,
    typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
      ? CORE_GLOBAL_SCOPE
      : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ].filter(Boolean);

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (name in scope) {
        const value = scope[name];
        if (typeof value !== 'undefined') {
          return value;
        }
      }
    } catch (readError) {
      void readError;
    }
  }

  return undefined;
}

const autoGearAutoPresetIdSeed = resolveInitialPart2Value('autoGearAutoPresetId');
let autoGearAutoPresetIdState =
  typeof autoGearAutoPresetIdSeed === 'string' ? autoGearAutoPresetIdSeed : '';

const baseAutoGearRulesSeed = resolveInitialPart2Value('baseAutoGearRules');
let baseAutoGearRulesState = Array.isArray(baseAutoGearRulesSeed) ? baseAutoGearRulesSeed : [];

const autoGearScenarioModeSelectSeed = resolveInitialPart2Value('autoGearScenarioModeSelect');
let autoGearScenarioModeSelectRef =
  autoGearScenarioModeSelectSeed && typeof autoGearScenarioModeSelectSeed === 'object'
    ? autoGearScenarioModeSelectSeed
    : null;

const safeGenerateConnectorSummarySeed = resolveInitialPart2Value('safeGenerateConnectorSummary');
let safeGenerateConnectorSummaryFn =
  typeof safeGenerateConnectorSummarySeed === 'function'
    ? safeGenerateConnectorSummarySeed
    : createFallbackSafeGenerateConnectorSummary();

let connectorSummaryWarningIssued = false;
function generateSafeConnectorSummary(device) {
  const candidates = [];
  if (typeof safeGenerateConnectorSummaryFn === 'function') {
    candidates.push(safeGenerateConnectorSummaryFn);
  }
  const globalSafeSummary = readGlobalScopeValue('safeGenerateConnectorSummary');
  if (typeof globalSafeSummary === 'function') {
    candidates.push(globalSafeSummary);
  }
  if (
    typeof CORE_SHARED !== 'undefined' &&
    CORE_SHARED &&
    typeof CORE_SHARED.safeGenerateConnectorSummary === 'function'
  ) {
    candidates.push(CORE_SHARED.safeGenerateConnectorSummary);
  }

  for (let index = 0; index < candidates.length; index += 1) {
    const generator = candidates[index];
    try {
      const summary = generator(device);
      if (typeof summary === 'string') {
        return summary;
      }
      if (typeof summary === 'undefined' || summary === null) {
        continue;
      }
      return String(summary);
    } catch (error) {
      if (!connectorSummaryWarningIssued) {
        connectorSummaryWarningIssued = true;
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to generate connector summary. Falling back to empty summary.', error);
        }
      }
    }
  }

  return '';
}

if (CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 2) already initialized. Skipping duplicate load.');
  }
} else {
  if (CORE_PART2_RUNTIME_SCOPE) {
    try {
      Object.defineProperty(CORE_PART2_RUNTIME_SCOPE, '__cineCorePart2Initialized', {
        configurable: true,
        writable: true,
        value: true,
      });
    } catch (corePart2InitError) {
      CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized = true;
      void corePart2InitError;
    }
  }

  const CORE_PART1_RUNNER =
    CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart1Runner;

  function corePart2Runtime() {
    const CORE_SHARED_SCOPE_PART2 = CORE_PART2_RUNTIME_SCOPE;
    
    function resolveCoreSharedPart2() {
      if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.cineCoreShared) {
        return CORE_SHARED_SCOPE_PART2.cineCoreShared;
      }
      if (typeof require === 'function') {
        try {
          return require('./modules/core-shared.js');
        } catch (error) {
          void error;
        }
      }
      return null;
    }
    
    const CORE_SHARED_LOCAL =
      typeof CORE_SHARED !== 'undefined' && CORE_SHARED
        ? CORE_SHARED
        : resolveCoreSharedPart2() || {};

    function fallbackNormalizeAutoGearWeightOperator(value) {
      if (typeof value !== 'string') return 'greater';
      const normalized = value.trim().toLowerCase();
      if (!normalized) return 'greater';
      if (
        normalized === '>' ||
        normalized === 'gt' ||
        normalized === 'greaterthan' ||
        normalized === 'above' ||
        normalized === 'over'
      ) {
        return 'greater';
      }
      if (
        normalized === '<' ||
        normalized === 'lt' ||
        normalized === 'lessthan' ||
        normalized === 'below' ||
        normalized === 'under'
      ) {
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
    }

    function fallbackNormalizeAutoGearWeightValue(value) {
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
    }

    function fallbackFormatAutoGearWeight(value) {
      if (!Number.isFinite(value)) return '';
      try {
        if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
          return new Intl.NumberFormat().format(value);
        }
      } catch (error) {
        void error;
      }
      return String(value);
    }

    const normalizeAutoGearWeightOperator =
      typeof CORE_SHARED_LOCAL.normalizeAutoGearWeightOperator === 'function'
        ? CORE_SHARED_LOCAL.normalizeAutoGearWeightOperator
        : fallbackNormalizeAutoGearWeightOperator;

    const normalizeAutoGearWeightValue =
      typeof CORE_SHARED_LOCAL.normalizeAutoGearWeightValue === 'function'
        ? CORE_SHARED_LOCAL.normalizeAutoGearWeightValue
        : fallbackNormalizeAutoGearWeightValue;

    const normalizeAutoGearCameraWeightCondition =
      typeof CORE_SHARED_LOCAL.normalizeAutoGearCameraWeightCondition === 'function'
        ? CORE_SHARED_LOCAL.normalizeAutoGearCameraWeightCondition
        : function normalizeAutoGearCameraWeightCondition() {
            return null;
          };

    const formatAutoGearWeight =
      typeof CORE_SHARED_LOCAL.formatAutoGearWeight === 'function'
        ? CORE_SHARED_LOCAL.formatAutoGearWeight
        : fallbackFormatAutoGearWeight;

    const getAutoGearCameraWeightOperatorLabel =
      typeof CORE_SHARED_LOCAL.getAutoGearCameraWeightOperatorLabel === 'function'
        ? CORE_SHARED_LOCAL.getAutoGearCameraWeightOperatorLabel
        : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
            const textsForLang = langTexts || {};
            const fallbackTexts =
              (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.texts && CORE_GLOBAL_SCOPE.texts.en)
                || {};
            const normalized = normalizeAutoGearWeightOperator(operator);
            if (normalized === 'less') {
              return (
                textsForLang.autoGearCameraWeightOperatorLess
                || fallbackTexts.autoGearCameraWeightOperatorLess
                || 'Lighter than'
              );
            }
            if (normalized === 'equal') {
              return (
                textsForLang.autoGearCameraWeightOperatorEqual
                || fallbackTexts.autoGearCameraWeightOperatorEqual
                || 'Exactly'
              );
            }
            return (
              textsForLang.autoGearCameraWeightOperatorGreater
              || fallbackTexts.autoGearCameraWeightOperatorGreater
              || 'Heavier than'
            );
          };

    const formatAutoGearCameraWeight =
      typeof CORE_SHARED_LOCAL.formatAutoGearCameraWeight === 'function'
        ? CORE_SHARED_LOCAL.formatAutoGearCameraWeight
        : function formatAutoGearCameraWeight(condition, langTexts) {
            if (!condition || !Number.isFinite(condition.value)) return '';
            const label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
            const formattedValue = formatAutoGearWeight(condition.value);
            return `${label} ${formattedValue} g`;
          };

    const CORE_RUNTIME_SCOPE_CANDIDATES = [
      CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
        ? CORE_PART2_RUNTIME_SCOPE
        : null,
      typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object'
        ? CORE_GLOBAL_SCOPE
        : null,
      typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
      typeof window !== 'undefined' && typeof window === 'object' ? window : null,
      typeof self !== 'undefined' && typeof self === 'object' ? self : null,
      typeof global !== 'undefined' && typeof global === 'object' ? global : null,
    ].filter(Boolean);

    function readCoreScopeValue(name) {
      for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        const scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        try {
          if (name in scope) {
            const value = scope[name];
            if (typeof value !== 'undefined') {
              return value;
            }
          }
        } catch (readError) {
          void readError;
        }
      }
      return undefined;
    }

    function writeCoreScopeValue(name, value) {
      for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        const scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        try {
          scope[name] = value;
          return true;
        } catch (assignError) {
          void assignError;
        }
        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            writable: true,
            value,
          });
          return true;
        } catch (defineError) {
          void defineError;
        }
      }
      return false;
    }

    function declareCoreFallbackBinding(name, factory) {
      const existing = readCoreScopeValue(name);
      if (typeof existing !== 'undefined') {
        return existing;
      }
      const fallbackValue = typeof factory === 'function' ? factory() : factory;
      writeCoreScopeValue(name, fallbackValue);
      return fallbackValue;
    }

    autoGearAutoPresetIdState = declareCoreFallbackBinding('autoGearAutoPresetId', () => {
      if (typeof loadAutoGearAutoPresetId === 'function') {
        try {
          const storedId = loadAutoGearAutoPresetId();
          return typeof storedId === 'string' ? storedId : '';
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear auto preset identifier from storage.', error);
          }
        }
      }
      return '';
    });

    baseAutoGearRulesState = declareCoreFallbackBinding('baseAutoGearRules', () => {
      if (typeof loadAutoGearRules === 'function') {
        try {
          const storedRules = loadAutoGearRules();
          return Array.isArray(storedRules) ? storedRules.slice() : [];
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear rules from storage.', error);
          }
        }
      }
      return [];
    });

    autoGearScenarioModeSelectRef = declareCoreFallbackBinding('autoGearScenarioModeSelect', () => null);

    safeGenerateConnectorSummaryFn = declareCoreFallbackBinding(
      'safeGenerateConnectorSummary',
      () => createFallbackSafeGenerateConnectorSummary(),
    );
    
    var currentProjectInfo = null;
    let loadedSetupState = null;
    let loadedSetupStateSignature = '';
    var restoringSession = false;
    var skipNextGearListRefresh = false;
    
    let defaultProjectInfoSnapshot = null;
    
    const CORE_BOOT_QUEUE_KEY_PART2 = (function resolveBootQueueKeyPart2(scope) {
      if (scope && typeof scope === 'object') {
        const existingPublic = scope.CORE_BOOT_QUEUE_KEY;
        const existingHidden = scope.__cineCoreBootQueueKey;
    
        if (typeof existingPublic === 'string' && existingPublic) {
          return existingPublic;
        }
    
        if (typeof existingHidden === 'string' && existingHidden) {
          return existingHidden;
        }
      }
    
      return '__coreRuntimeBootQueue';
    })(CORE_SHARED_SCOPE_PART2);
    
    const CORE_BOOT_QUEUE_PART2 = (function bootstrapCoreBootQueuePart2(existingQueue) {
      if (Array.isArray(existingQueue)) {
        return existingQueue;
      }
    
      if (CORE_SHARED_SCOPE_PART2 && typeof CORE_SHARED_SCOPE_PART2 === 'object') {
        const shared = CORE_SHARED_SCOPE_PART2.cineCoreShared;
        if (shared && typeof shared === 'object') {
          const sharedQueue = shared[CORE_BOOT_QUEUE_KEY_PART2];
          if (Array.isArray(sharedQueue)) {
            return sharedQueue;
          }
          if (Object.isExtensible(shared)) {
            shared[CORE_BOOT_QUEUE_KEY_PART2] = [];
            return shared[CORE_BOOT_QUEUE_KEY_PART2];
          }
        }
    
        if (!Array.isArray(CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE)) {
          CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = [];
        }
        return CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE;
      }
    
      return [];
    })(CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE);
    
    if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE_PART2) {
      CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE_PART2;
    }
    
    function flushCoreBootQueue() {
      if (!Array.isArray(CORE_BOOT_QUEUE_PART2) || CORE_BOOT_QUEUE_PART2.length === 0) {
        return;
      }
    
      const pending = CORE_BOOT_QUEUE_PART2.splice(0, CORE_BOOT_QUEUE_PART2.length);
      for (let index = 0; index < pending.length; index += 1) {
        const task = pending[index];
        if (typeof task !== 'function') {
          continue;
        }
        try {
          task();
        } catch (taskError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Core boot task failed', taskError);
          }
        }
      }
    }
    
    function fallbackStableStringify(value) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (Array.isArray(value)) {
        return `[${value.map(item => fallbackStableStringify(item)).join(',')}]`;
      }
      if (typeof value === 'object') {
        const keys = Object.keys(value).sort();
        const entries = keys.map(key => `${JSON.stringify(key)}:${fallbackStableStringify(value[key])}`);
        return `{${entries.join(',')}}`;
      }
      return JSON.stringify(value);
    }
    
    const FALLBACK_HUMANIZE_OVERRIDES_PART2 = {
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
    
    const AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL =
      (typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN)
        ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN
        : '__any__';
    
    function fallbackHumanizeKey(key) {
      if (key && Object.prototype.hasOwnProperty.call(FALLBACK_HUMANIZE_OVERRIDES_PART2, key)) {
        return FALLBACK_HUMANIZE_OVERRIDES_PART2[key];
      }
    
      const stringValue = typeof key === 'string' ? key : String(key || '');
      return stringValue
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (c) => c.toUpperCase());
    }
    
    const coreStableStringify = typeof CORE_SHARED_LOCAL.stableStringify === 'function'
      ? CORE_SHARED_LOCAL.stableStringify
      : fallbackStableStringify;
    
    const coreHumanizeKey = typeof CORE_SHARED_LOCAL.humanizeKey === 'function'
      ? CORE_SHARED_LOCAL.humanizeKey
      : fallbackHumanizeKey;
    
    const sharedDeviceManagerLists = (() => {
      const candidates = [
        CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
          ? CORE_PART2_RUNTIME_SCOPE
          : null,
        (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
          ? CORE_GLOBAL_SCOPE
          : null,
        (typeof globalThis !== 'undefined' && typeof globalThis === 'object') ? globalThis : null,
        (typeof window !== 'undefined' && typeof window === 'object') ? window : null,
        (typeof self !== 'undefined' && typeof self === 'object') ? self : null,
        (typeof global !== 'undefined' && typeof global === 'object') ? global : null,
      ].filter(Boolean);
    
      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
        if (scope && scope.deviceManagerLists instanceof Map) {
          return scope.deviceManagerLists;
        }
      }
    
      const fallback = new Map();
      const assignTarget = candidates.find(scope => scope && Object.isExtensible(scope));
      if (assignTarget) {
        try {
          assignTarget.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(assignTarget, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
      return fallback;
    })();
    
    const activeDeviceManagerLists = (() => {
      const candidateScopes = [
        CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object' ? CORE_PART2_RUNTIME_SCOPE : null,
        CORE_SHARED_SCOPE_PART2 && typeof CORE_SHARED_SCOPE_PART2 === 'object' ? CORE_SHARED_SCOPE_PART2 : null,
        (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
          ? CORE_GLOBAL_SCOPE
          : null,
        (typeof globalThis !== 'undefined' && typeof globalThis === 'object') ? globalThis : null,
        (typeof window !== 'undefined' && typeof window === 'object') ? window : null,
        (typeof self !== 'undefined' && typeof self === 'object') ? self : null,
        (typeof global !== 'undefined' && typeof global === 'object') ? global : null,
      ].filter(Boolean);
    
      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        const existing = scope && scope.deviceManagerLists;
        if (existing instanceof Map) {
          return existing;
        }
      }
    
      const fallback = sharedDeviceManagerLists instanceof Map ? sharedDeviceManagerLists : new Map();
    
      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        if (!scope) continue;
        const extensible = typeof Object.isExtensible === 'function' ? Object.isExtensible(scope) : true;
        if (!extensible) continue;
        try {
          scope.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(scope, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
    
      return fallback;
    })();
    
    function callCoreFunctionFromPart2(functionName, args = [], options = {}) {
      if (typeof callCoreFunctionIfAvailable === 'function') {
        return callCoreFunctionIfAvailable(functionName, args, options);
      }
    
      const scope =
        CORE_SHARED_SCOPE_PART2 ||
        (typeof globalThis !== 'undefined' ? globalThis : null) ||
        (typeof window !== 'undefined' ? window : null) ||
        (typeof self !== 'undefined' ? self : null) ||
        (typeof global !== 'undefined' ? global : null);
    
      const target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
    
      if (typeof target === 'function') {
        try {
          return target.apply(scope, args);
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(`Failed to invoke ${functionName}`, invokeError);
          }
        }
        return undefined;
      }
    
      if (options && options.defer === true && Array.isArray(CORE_BOOT_QUEUE_PART2)) {
        CORE_BOOT_QUEUE_PART2.push(() => {
          callCoreFunctionFromPart2(functionName, args, { ...options, defer: false });
        });
      }
    
      return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue')
        ? options.defaultValue
        : undefined;
    }
    
    function refreshAutoGearCrewOptions(selectElement, selected, key) {
      if (!selectElement) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, key);
    
      selectElement.innerHTML = '';
      selectElement.multiple = true;
    
      const entries = getCrewRoleEntries();
      const seen = new Set();
    
      const appendOption = (value, label) => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        selectElement.appendChild(option);
        seen.add(value);
      };
    
      entries.forEach(entry => appendOption(entry.value, entry.label));
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) {
          appendOption(value, value);
        }
      });
    
      const selectableOptions = Array.from(selectElement.options || []).filter(option => !option.disabled);
      selectElement.size = computeAutoGearMultiSelectSize(
        selectableOptions.length,
        { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
      );
    }
    
    function getCrewRoleLabel(value) {
      if (typeof value !== 'string') return '';
      const trimmed = value.trim();
      if (!trimmed) return '';
      const langTexts = texts[currentLang] || texts.en || {};
      const crewRoleMap = langTexts.crewRoles || texts.en?.crewRoles || {};
      return crewRoleMap?.[trimmed] || trimmed;
    }
    
    function refreshAutoGearCameraOptions(selected) {
      if (!autoGearCameraSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'camera');
    
      autoGearCameraSelect.innerHTML = '';
      autoGearCameraSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearCameraSelect.appendChild(option);
        seen.add(value);
      };
    
      if (cameraSelect) {
        Array.from(cameraSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearCameraSelect.options || []).filter(option => !option.disabled).length;
      autoGearCameraSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    
    function refreshAutoGearCameraWeightCondition(selected) {
      const source = (() => {
        if (selected && typeof selected === 'object' && !Array.isArray(selected)) {
          return selected;
        }
        if (Array.isArray(selected) && selected.length) {
          if (selected.length >= 2) {
            return { operator: selected[0], value: selected[1] };
          }
          return { value: selected[0] };
        }
        if (autoGearEditorDraft?.cameraWeight) {
          return autoGearEditorDraft.cameraWeight;
        }
        return null;
      })();
      const operator = normalizeAutoGearWeightOperator(source?.operator);
      if (autoGearCameraWeightOperator) {
        autoGearCameraWeightOperator.value = operator;
      }
      const normalized = normalizeAutoGearCameraWeightCondition(source);
      if (autoGearCameraWeightValueInput) {
        if (normalized) {
          autoGearCameraWeightValueInput.value = String(normalized.value);
        } else if (source && typeof source?.value === 'string') {
          autoGearCameraWeightValueInput.value = source.value;
        } else if (source && typeof source?.value === 'number' && Number.isFinite(source.value)) {
          autoGearCameraWeightValueInput.value = String(Math.round(source.value));
        } else {
          autoGearCameraWeightValueInput.value = '';
        }
      }
    }
    
    function updateAutoGearCameraWeightDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('cameraWeight')) {
        autoGearEditorDraft.cameraWeight = null;
        return;
      }
      const operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
      const thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
      const normalized = normalizeAutoGearCameraWeightCondition({ operator: operatorValue, value: thresholdValue });
      if (normalized) {
        autoGearEditorDraft.cameraWeight = { ...normalized };
      } else if (operatorValue) {
        autoGearEditorDraft.cameraWeight = {
          operator: normalizeAutoGearWeightOperator(operatorValue),
          value: null,
        };
      } else {
        autoGearEditorDraft.cameraWeight = null;
      }
    }
    
    function updateAutoGearShootingDaysDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('shootingDays')) {
        autoGearEditorDraft.shootingDays = null;
        return;
      }
      const modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
      const valueSource = autoGearShootingDaysInput ? autoGearShootingDaysInput.value : '';
      const normalized = normalizeAutoGearShootingDaysCondition({ mode: modeValue, value: valueSource });
      if (normalized) {
        autoGearEditorDraft.shootingDays = { ...normalized };
        return;
      }
      const fallbackMode = typeof normalizeAutoGearShootingDayMode === 'function'
        ? normalizeAutoGearShootingDayMode(modeValue)
        : (typeof modeValue === 'string' && modeValue ? modeValue.trim().toLowerCase() : 'minimum');
      if (fallbackMode) {
        autoGearEditorDraft.shootingDays = { mode: fallbackMode, value: null };
      } else {
        autoGearEditorDraft.shootingDays = null;
      }
    }
    
    function refreshAutoGearMonitorOptions(selected) {
      if (!autoGearMonitorSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'monitor');
    
      autoGearMonitorSelect.innerHTML = '';
      autoGearMonitorSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMonitorSelect.appendChild(option);
        seen.add(value);
      };
    
      if (monitorSelect) {
        Array.from(monitorSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearMonitorSelect.options || []).filter(option => !option.disabled).length;
      autoGearMonitorSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    
    function refreshAutoGearTripodOptions(select, selected, key, placeholderKey, selectorType) {
      if (!select) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, key);
      select.innerHTML = '';
      select.multiple = true;
    
      const langTexts = texts[currentLang] || texts.en || {};
      const placeholder = langTexts[placeholderKey]
        || texts.en?.[placeholderKey]
        || 'Select options';
      const entries = collectAutoGearTripodNames(selectorType)
        .map(entry => (typeof entry === 'string' ? { value: entry, label: entry } : entry))
        .filter(Boolean);
      const seen = new Set();
      const addOption = (value, label) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        const keyValue = trimmed.toLowerCase();
        if (seen.has(keyValue)) return;
        const option = document.createElement('option');
        option.value = trimmed;
        option.textContent = label || formatAutoGearSelectorValue(selectorType, trimmed);
        if (selectedValues.includes(trimmed)) {
          option.selected = true;
        }
        select.appendChild(option);
        seen.add(keyValue);
      };
    
      entries.forEach(entry => {
        if (!entry) return;
        addOption(entry.value, entry.label);
      });
    
      selectedValues.forEach(value => {
        if (!value) return;
        const keyValue = value.trim().toLowerCase();
        if (keyValue && !seen.has(keyValue)) {
          addOption(value, formatAutoGearSelectorValue(selectorType, value));
        }
      });
    
      if (!select.options.length) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = placeholder;
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
      }
    
      const visibleCount = Array.from(select.options || []).filter(option => !option.disabled).length;
      select.size = computeAutoGearMultiSelectSize(visibleCount, { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS });
    }
    
    function refreshAutoGearTripodHeadOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodHeadBrandSelect,
        selected,
        'tripodHeadBrand',
        'autoGearTripodHeadBrandPlaceholder',
        'tripodHeadBrand'
      );
    }
    
    function refreshAutoGearTripodBowlOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodBowlSelect,
        selected,
        'tripodBowl',
        'autoGearTripodBowlPlaceholder',
        'tripodBowl'
      );
    }
    
    function refreshAutoGearTripodTypesOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodTypesSelect,
        selected,
        'tripodTypes',
        'autoGearTripodTypesPlaceholder',
        'tripodTypes'
      );
    }
    
    function refreshAutoGearTripodSpreaderOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodSpreaderSelect,
        selected,
        'tripodSpreader',
        'autoGearTripodSpreaderPlaceholder',
        'tripodSpreader'
      );
    }
    
    function refreshAutoGearWirelessOptions(selected) {
      if (!autoGearWirelessSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'wireless');
    
      autoGearWirelessSelect.innerHTML = '';
      autoGearWirelessSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearWirelessSelect.appendChild(option);
        seen.add(value);
      };
    
      if (videoSelect) {
        Array.from(videoSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearWirelessSelect.options || []).filter(option => !option.disabled).length;
      autoGearWirelessSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    
    function refreshAutoGearMotorsOptions(selected) {
      if (!autoGearMotorsSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'motors');
      const langTexts = texts[currentLang] || texts.en || {};
    
      autoGearMotorsSelect.innerHTML = '';
      autoGearMotorsSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = formatAutoGearMotorValue(value, langTexts);
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMotorsSelect.appendChild(option);
        seen.add(value);
      };
    
      const sourceSelects = Array.isArray(motorSelects) ? motorSelects : [];
      sourceSelects.forEach(sel => {
        Array.from(sel?.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearMotorsSelect.options || []).filter(option => !option.disabled).length;
      autoGearMotorsSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    
    function refreshAutoGearControllersOptions(selected) {
      if (!autoGearControllersSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'controllers');
    
      autoGearControllersSelect.innerHTML = '';
      autoGearControllersSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearControllersSelect.appendChild(option);
        seen.add(value);
      };
    
      const sourceSelects = Array.isArray(controllerSelects) ? controllerSelects : [];
      sourceSelects.forEach(sel => {
        Array.from(sel?.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearControllersSelect.options || []).filter(option => !option.disabled).length;
      autoGearControllersSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }
    
    function refreshAutoGearDistanceOptions(selected) {
      if (!autoGearDistanceSelect) return;
    
      const selectedValues = collectAutoGearSelectedValues(selected, 'distance');
    
      autoGearDistanceSelect.innerHTML = '';
      autoGearDistanceSelect.multiple = true;
    
      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearDistanceSelect.appendChild(option);
        seen.add(value);
      };
    
      if (distanceSelect) {
        Array.from(distanceSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }
    
      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });
    
      const visibleCount = Array.from(autoGearDistanceSelect.options || []).filter(option => !option.disabled).length;
      autoGearDistanceSelect.size = computeAutoGearMultiSelectSize(
        visibleCount,
        { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
      );
    }
    
    function populateAutoGearCategorySelect(select, currentValue) {
      if (!select) return;
      const current = typeof currentValue === 'string' ? currentValue : '';
      select.innerHTML = '';
      GEAR_LIST_CATEGORIES.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        if (current === cat) opt.selected = true;
        select.appendChild(opt);
      });
      const customOpt = document.createElement('option');
      customOpt.value = AUTO_GEAR_CUSTOM_CATEGORY;
      customOpt.textContent = texts[currentLang]?.autoGearCustomCategory
        || texts.en?.autoGearCustomCategory
        || 'Custom Additions';
      if (!current) customOpt.selected = true;
      select.appendChild(customOpt);
    }
    
    function updateAutoGearCatalogOptions() {
      if (!autoGearItemCatalog) return;
      const names = collectAutoGearCatalogNames();
      autoGearItemCatalog.innerHTML = '';
      names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        autoGearItemCatalog.appendChild(option);
      });
      updateAutoGearMonitorCatalogOptions();
      updateAutoGearMonitorDefaultOptions();
    }
    
    function updateAutoGearMonitorDefaultOptions(targets = autoGearMonitorDefaultControls) {
      const controls = Array.isArray(targets) ? targets : [targets];
      const placeholder = getAutoGearMonitorDefaultPlaceholder();
      controls.forEach(control => {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        const select = control.select;
        const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        const names = collectAutoGearMonitorNames(type === 'directorMonitor' ? 'directorMonitor' : 'monitor');
        const previousValue = select.value || '';
        select.innerHTML = '';
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = placeholder;
        select.appendChild(placeholderOption);
        const added = new Set(['']);
        names.forEach(name => {
          if (!name) return;
          const key = name.toLowerCase();
          if (added.has(key)) return;
          const option = document.createElement('option');
          option.value = name;
          option.textContent = formatAutoGearSelectorValue(type, name);
          select.appendChild(option);
          added.add(key);
        });
        const currentValue = getAutoGearMonitorDefault(control.key);
        let normalizedValue = '';
        if (currentValue) {
          const match = names.find(name => name.toLowerCase() === currentValue.toLowerCase());
          if (match) {
            normalizedValue = match;
          } else {
            const option = document.createElement('option');
            option.value = currentValue;
            option.textContent = formatAutoGearSelectorValue(type, currentValue);
            select.appendChild(option);
            normalizedValue = currentValue;
          }
        }
        select.value = normalizedValue;
        if (!normalizedValue && previousValue && select.value !== previousValue && select.querySelector(`option[value="${previousValue}"]`)) {
          select.value = previousValue;
        }
        select.disabled = names.length === 0 && !normalizedValue;
      });
    }
    
    function renderAutoGearMonitorDefaultsControls() {
      autoGearMonitorDefaultControls.forEach(control => {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        const select = control.select;
        const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        const currentValue = getAutoGearMonitorDefault(control.key);
        if (currentValue && !Array.from(select.options || []).some(option => option.value === currentValue)) {
          const option = document.createElement('option');
          option.value = currentValue;
          option.textContent = formatAutoGearSelectorValue(type, currentValue);
          select.appendChild(option);
        }
        const normalizedValue = currentValue || '';
        if (select.value !== normalizedValue) {
          select.value = normalizedValue;
        }
      });
    }
    
    function formatAutoGearCount(count, singularKey, pluralKey) {
      const langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        const template = langTexts[singularKey] || texts.en?.[singularKey];
        return template ? template.replace('%s', '1') : '1';
      }
      const template = langTexts[pluralKey] || texts.en?.[pluralKey];
      return template ? template.replace('%s', String(count)) : String(count);
    }
    
    function formatAutoGearItemSummary(item, options = {}) {
      if (!item || typeof item !== 'object') return '';
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return '';
      const {
        quantity,
        name,
        category,
        screenSize,
        selectorType,
        selectorDefault,
        selectorEnabled,
        notes,
      } = normalized;
      const langTexts = texts[currentLang] || texts.en || {};
      const includeSign = !!options.includeSign;
      const listType = options.listType || (options.includeSign ? 'add' : '');
      const includeCategory = options.includeCategory !== false;
      const baseQuantity = normalizeAutoGearQuantity(quantity);
      const signPrefix = includeSign
        ? (listType === 'remove' ? '−' : '+')
        : '';
      const quantityText = signPrefix ? `${signPrefix}${baseQuantity}` : String(baseQuantity);
      const nameText = name || '';
      if (!nameText) return quantityText;
      const categoryLabel = category
        ? category
        : (langTexts.autoGearCustomCategory || texts.en?.autoGearCustomCategory || '');
      let summary;
      if (includeCategory && categoryLabel) {
        const withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory
          || texts.en?.autoGearItemSummaryWithCategory
          || '%s × %s (%s)';
        summary = formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
      } else {
        const baseTemplate = langTexts.autoGearItemSummary
          || texts.en?.autoGearItemSummary
          || '%s × %s';
        summary = formatWithPlaceholders(baseTemplate, quantityText, nameText);
      }
      const details = [];
      if (screenSize) {
        details.push(screenSize);
      }
      if (selectorType && selectorType !== 'none') {
        const selectorLabel = getAutoGearSelectorLabel(selectorType);
        const formattedDefault = selectorDefault ? formatAutoGearSelectorValue(selectorType, selectorDefault) : '';
        if (selectorEnabled) {
          const selectorTemplate = formattedDefault
            ? (langTexts.autoGearSelectorSummaryWithDefault
              || texts.en?.autoGearSelectorSummaryWithDefault
              || '%s selector (default: %s)')
            : (langTexts.autoGearSelectorSummary
              || texts.en?.autoGearSelectorSummary
              || '%s selector');
          const selectorText = formattedDefault
            ? formatWithPlaceholders(selectorTemplate, selectorLabel, formattedDefault)
            : formatWithPlaceholders(selectorTemplate, selectorLabel);
          details.push(selectorText);
        } else if (formattedDefault) {
          const defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector
            || texts.en?.autoGearSelectorSummaryNoSelector
            || '%s default: %s';
          details.push(formatWithPlaceholders(defaultTemplate, selectorLabel, formattedDefault));
        } else if (selectorLabel) {
          details.push(selectorLabel);
        }
      }
      if (notes) {
        details.push(notes);
      }
      if (details.length) {
        summary += ` – ${details.join(' – ')}`;
      }
      return summary;
    }
    
    function formatWithPlaceholders(template, ...values) {
      if (typeof template !== 'string') {
        return values.join(' ');
      }
      return values.reduce((acc, value) => acc.replace('%s', value), template);
    }
    
    function formatAutoGearRuleCount(count) {
      const langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        const template = langTexts.autoGearRulesCountOne || texts.en?.autoGearRulesCountOne;
        return template ? template.replace('%s', '1') : '1';
      }
      const template = langTexts.autoGearRulesCountOther || texts.en?.autoGearRulesCountOther;
      return template ? template.replace('%s', String(count)) : String(count);
    }
    
    function formatAutoGearBackupCount(count) {
      const langTexts = texts[currentLang] || texts.en || {};
      const fallbackTexts = texts.en || {};
      if (count === 1) {
        const template = langTexts.storageAutoBackupsCountOne || fallbackTexts.storageAutoBackupsCountOne;
        if (typeof template === 'string' && template.includes('%s')) {
          return template.replace('%s', '1');
        }
        return '1 auto backup';
      }
      const template = langTexts.storageAutoBackupsCountOther || fallbackTexts.storageAutoBackupsCountOther;
      if (typeof template === 'string' && template.includes('%s')) {
        return template.replace('%s', String(count));
      }
      return `${count} auto backups`;
    }
    
    function formatAutoGearBackupTime(isoString) {
      if (typeof isoString !== 'string') return '';
      const date = new Date(isoString);
      if (Number.isNaN(date.valueOf())) return isoString;
      if (autoGearBackupDateFormatter) {
        try {
          return autoGearBackupDateFormatter.format(date);
        } catch (error) {
          console.warn('Failed to format automatic gear backup timestamp', error);
        }
      }
      if (typeof date.toLocaleString === 'function') {
        return date.toLocaleString();
      }
      return date.toISOString();
    }
    
    function formatAutoGearBackupMeta(backup) {
      if (!backup) return '';
      const langTexts = texts[currentLang] || texts.en || {};
      const timeLabel = formatAutoGearBackupTime(backup.createdAt);
      const ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
      const rulesLabel = ruleCount === 0
        ? (langTexts.autoGearBackupClearsRules
            || texts.en?.autoGearBackupClearsRules
            || 'Clears all rules')
        : formatAutoGearRuleCount(ruleCount);
      const template = langTexts.autoGearBackupMeta || texts.en?.autoGearBackupMeta;
      const baseSummary = template && template.includes('%s')
        ? formatWithPlaceholders(template, timeLabel, rulesLabel)
        : `${timeLabel} · ${rulesLabel}`;
      const note = typeof backup.note === 'string' ? backup.note.trim() : '';
      if (note) {
        return `${baseSummary} – ${note}`;
      }
      return baseSummary;
    }
    
    function getAutoGearBackupSelectPlaceholder() {
      return texts[currentLang]?.autoGearBackupSelectPlaceholder
        || texts.en?.autoGearBackupSelectPlaceholder
        || 'Select a backup to restore';
    }
    
    function updateAutoGearBackupRestoreButtonState() {
      if (!autoGearBackupRestoreButton) return;
      const hasSelection = Boolean(autoGearBackupSelect && autoGearBackupSelect.value);
      autoGearBackupRestoreButton.disabled = !hasSelection;
    }
    
    function updateAutoGearBackupRetentionWarning(message = '') {
      autoGearBackupRetentionWarningText = typeof message === 'string' ? message : '';
      if (!autoGearBackupRetentionWarning) {
        return;
      }
      if (autoGearBackupRetentionWarningText) {
        autoGearBackupRetentionWarning.textContent = autoGearBackupRetentionWarningText;
        autoGearBackupRetentionWarning.hidden = false;
      } else {
        autoGearBackupRetentionWarning.textContent = '';
        autoGearBackupRetentionWarning.hidden = true;
      }
    }
    
    function renderAutoGearBackupRetentionControls() {
      const limitValue = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      if (autoGearBackupRetentionInput) {
        autoGearBackupRetentionInput.setAttribute('min', String(AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE));
        autoGearBackupRetentionInput.setAttribute('max', String(AUTO_GEAR_BACKUP_RETENTION_MAX));
        if (autoGearBackupRetentionInput.value !== String(limitValue)) {
          autoGearBackupRetentionInput.value = String(limitValue);
        }
      }
      if (autoGearBackupRetentionSummary) {
        const template = texts[currentLang]?.autoGearBackupRetentionSummary
          || texts.en?.autoGearBackupRetentionSummary
          || 'Keeping the latest {limit}. Currently {stored} stored.';
        const limitLabel = formatAutoGearBackupCount(limitValue);
        const storedLabel = formatAutoGearBackupCount(autoGearBackups.length);
        const summary = template
          .replace('{limit}', limitLabel)
          .replace('{stored}', storedLabel);
        autoGearBackupRetentionSummary.textContent = summary;
      }
      updateAutoGearBackupRetentionWarning(autoGearBackupRetentionWarningText);
    }
    
    function getAutoGearPresetById(presetId) {
      if (!presetId) return null;
      return autoGearPresets.find(preset => preset.id === presetId) || null;
    }
    
    function getAutoGearAutoPresetLabel() {
      const langTexts = texts[currentLang] || texts.en || {};
      return langTexts.autoGearAutoPresetLabel
        || texts.en?.autoGearAutoPresetLabel
        || 'Autosaved rules';
    }
    
    function setAutoGearAutoPresetId(presetId, options = {}) {
      const normalized = typeof presetId === 'string' ? presetId : '';
      const persist = options.persist !== false;
      const skipRender = options.skipRender === true;
        if (autoGearAutoPresetIdState === normalized) {
          if (!skipRender) renderAutoGearPresetsControls();
          return;
        }
        autoGearAutoPresetIdState = normalized;
        writeCoreScopeValue('autoGearAutoPresetId', autoGearAutoPresetIdState);
        if (persist) {
          persistAutoGearAutoPresetId(autoGearAutoPresetIdState);
        }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    
    function reconcileAutoGearAutoPresetState(options = {}) {
        if (!autoGearAutoPresetIdState) {
          if (options.persist !== false) {
            persistAutoGearAutoPresetId('');
          }
          return false;
        }
        const managedExists = autoGearPresets.some(preset => preset.id === autoGearAutoPresetIdState);
        const otherExists = autoGearPresets.some(preset => preset.id !== autoGearAutoPresetIdState);
      if (!managedExists || otherExists) {
        setAutoGearAutoPresetId('', {
          persist: options.persist !== false,
          skipRender: options.skipRender === true,
        });
        return true;
      }
      return false;
    }
    
    function syncAutoGearAutoPreset(rules) {
      const normalizedRules = Array.isArray(rules) ? rules : [];
      reconcileAutoGearAutoPresetState({ persist: true, skipRender: true });
        if (!autoGearAutoPresetIdState) {
          if (autoGearPresets.length > 0) {
            return false;
          }
        const label = getAutoGearAutoPresetLabel();
        const normalizedPreset = normalizeAutoGearPreset({
          id: generateAutoGearId('preset'),
          label,
          rules: normalizedRules,
        });
        if (!normalizedPreset) {
          return false;
        }
        autoGearPresets.push(normalizedPreset);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId(normalizedPreset.id, { persist: true, skipRender: true });
        setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
        return true;
      }
        const managedIndex = autoGearPresets.findIndex(preset => preset.id === autoGearAutoPresetIdState);
      if (managedIndex === -1) {
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        return false;
      }
      if (autoGearPresets.length > 1) {
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        return false;
      }
      const managedPreset = autoGearPresets[managedIndex];
      const updatedPreset = normalizeAutoGearPreset({
        id: managedPreset.id,
        label: managedPreset.label,
        rules: normalizedRules,
      });
      if (!updatedPreset) {
        autoGearPresets.splice(managedIndex, 1);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        setActiveAutoGearPresetId('', { persist: true, skipRender: true });
        return true;
      }
      if (managedPreset.fingerprint !== updatedPreset.fingerprint) {
        autoGearPresets[managedIndex] = updatedPreset;
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
      }
      setActiveAutoGearPresetId(updatedPreset.id, { persist: true, skipRender: true });
      return managedPreset.fingerprint !== updatedPreset.fingerprint;
    }
    
    function setActiveAutoGearPresetId(presetId, options = {}) {
      const normalized = typeof presetId === 'string' ? presetId : '';
      const persist = options.persist !== false;
      const skipRender = options.skipRender === true;
      if (activeAutoGearPresetId === normalized) {
        if (!skipRender) renderAutoGearPresetsControls();
        return;
      }
      activeAutoGearPresetId = normalized;
      if (persist) {
        persistActiveAutoGearPresetId(activeAutoGearPresetId);
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    
    function resolveBaseAutoGearRulesSnapshot() {
      if (Array.isArray(baseAutoGearRulesState)) {
        return baseAutoGearRulesState;
      }

      const resolved = readCoreScopeValue('baseAutoGearRules');
      if (Array.isArray(resolved)) {
        return resolved;
      }

      for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        const scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        try {
          const value = scope.baseAutoGearRules;
          if (Array.isArray(value)) {
            return value;
          }
        } catch (fallbackError) {
          void fallbackError;
        }
      }

      return [];
    }

    function alignActiveAutoGearPreset(options = {}) {
      const skipRender = options.skipRender === true;
      const rulesSource = resolveBaseAutoGearRulesSnapshot();
      const fingerprint = createAutoGearRulesFingerprint(rulesSource);
      const matching = autoGearPresets.find(preset => preset.fingerprint === fingerprint) || null;
      if (matching) {
        setActiveAutoGearPresetId(matching.id, { persist: true, skipRender: true });
      } else if (activeAutoGearPresetId) {
        setActiveAutoGearPresetId('', { persist: true, skipRender: true });
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }
    
    function renderAutoGearPresetsControls() {
      if (!autoGearPresetSelect) return;
      const placeholderText = texts[currentLang]?.autoGearPresetPlaceholder
        || texts.en?.autoGearPresetPlaceholder
        || 'Custom rules';
      const presets = sortAutoGearPresets(autoGearPresets.slice());
      autoGearPresets = presets;
    
      autoGearPresetSelect.innerHTML = '';
    
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholderText;
      autoGearPresetSelect.appendChild(placeholderOption);
    
      presets.forEach(preset => {
        const option = document.createElement('option');
        option.value = preset.id;
        option.textContent = preset.label;
        autoGearPresetSelect.appendChild(option);
      });
    
      const targetValue = activeAutoGearPresetId || '';
      autoGearPresetSelect.value = targetValue;
      if (!targetValue) {
        placeholderOption.selected = true;
      }
    
      autoGearPresetSelect.disabled = presets.length === 0;
      autoGearPresetSelect.setAttribute('aria-disabled', presets.length === 0 ? 'true' : 'false');
    
      if (autoGearDeletePresetButton) {
        autoGearDeletePresetButton.disabled = !activeAutoGearPresetId;
      }
    
    }
    
    function applyAutoGearBackupVisibility() {
      const show = !!autoGearBackupsVisible;
      if (autoGearShowBackupsCheckbox) {
        autoGearShowBackupsCheckbox.checked = show;
        autoGearShowBackupsCheckbox.setAttribute('aria-pressed', show ? 'true' : 'false');
      }
      if (autoGearBackupsSection) {
        autoGearBackupsSection.classList.toggle('auto-gear-backups-collapsed', !show);
        autoGearBackupsSection.setAttribute('aria-expanded', show ? 'true' : 'false');
      }
      if (autoGearBackupControls) {
        autoGearBackupControls.hidden = !show;
        autoGearBackupControls.setAttribute('aria-hidden', show ? 'false' : 'true');
      }
      if (autoGearBackupsHiddenNotice) {
        autoGearBackupsHiddenNotice.hidden = show;
      }
      if (!show) {
        if (autoGearBackupSelect) autoGearBackupSelect.disabled = true;
        if (autoGearBackupRestoreButton) autoGearBackupRestoreButton.disabled = true;
      } else {
        updateAutoGearBackupRestoreButtonState();
      }
    }
    
    function setAutoGearBackupsVisible(show) {
      const next = !!show;
      if (autoGearBackupsVisible === next) {
        applyAutoGearBackupVisibility();
        return;
      }
      autoGearBackupsVisible = next;
      persistAutoGearBackupVisibility(autoGearBackupsVisible);
      if (autoGearBackupsVisible) {
        renderAutoGearBackupControls();
      } else {
        applyAutoGearBackupVisibility();
      }
    }
    
    function handleAutoGearPresetSelection(event) {
      if (!event || !autoGearPresetSelect) return;
      if (sharedImportProjectPresetActive) {
        sharedImportProjectPresetActive = false;
        sharedImportPreviousPresetId = '';
      }
      const presetId = event.target.value;
      if (!presetId) {
        setActiveAutoGearPresetId('', { persist: true });
        return;
      }
      const preset = getAutoGearPresetById(presetId);
      if (!preset) {
        setActiveAutoGearPresetId('', { persist: true });
        renderAutoGearPresetsControls();
        return;
      }
      const confirmTemplate = texts[currentLang]?.autoGearPresetApplyConfirm
        || texts.en?.autoGearPresetApplyConfirm
        || `Replace your automatic gear rules with the preset "${preset.label}"?`;
      const confirmMessage = confirmTemplate.includes('%s')
        ? formatWithPlaceholders(confirmTemplate, preset.label)
        : confirmTemplate;
      let confirmed = true;
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        confirmed = window.confirm(confirmMessage);
      }
      if (!confirmed) {
        autoGearPresetSelect.value = activeAutoGearPresetId || '';
        return;
      }
      setAutoGearRules(preset.rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      const appliedMessage = texts[currentLang]?.autoGearPresetApplied
        || texts.en?.autoGearPresetApplied
        || 'Preset applied.';
      showNotification('success', appliedMessage);
    }
    
    function handleAutoGearSavePreset() {
      const rules = getAutoGearRules();
      const activePreset = getAutoGearPresetById(activeAutoGearPresetId);
      const promptTemplate = texts[currentLang]?.autoGearPresetNamePrompt
        || texts.en?.autoGearPresetNamePrompt
        || 'Name this preset';
      const defaultName = activePreset ? activePreset.label : '';
      if (typeof window === 'undefined' || typeof window.prompt !== 'function') {
        const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
          || texts.en?.autoGearPresetNameRequired
          || 'Enter a preset name to continue.';
        if (typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert(requiredMessage);
        }
        return;
      }
      const response = window.prompt(promptTemplate, defaultName);
      if (response === null) return;
      const trimmed = response.trim();
      if (!trimmed) {
        const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
          || texts.en?.autoGearPresetNameRequired
          || 'Enter a preset name to continue.';
        if (typeof window.alert === 'function') {
          window.alert(requiredMessage);
        }
        return;
      }
      const normalizedName = trimmed;
      const existingByName = autoGearPresets.find(preset => preset.label.toLowerCase() === normalizedName.toLowerCase());
      let targetId = activePreset?.id || '';
      if (existingByName && existingByName.id !== targetId) {
        const overwriteTemplate = texts[currentLang]?.autoGearPresetOverwriteConfirm
          || texts.en?.autoGearPresetOverwriteConfirm
          || `Replace the existing preset "${normalizedName}"?`;
        const overwriteMessage = overwriteTemplate.includes('%s')
          ? formatWithPlaceholders(overwriteTemplate, normalizedName)
          : overwriteTemplate;
        let overwriteConfirmed = true;
        if (typeof window.confirm === 'function') {
          overwriteConfirmed = window.confirm(overwriteMessage);
        }
        if (!overwriteConfirmed) {
          return;
        }
        targetId = existingByName.id;
      }
      const presetId = targetId || generateAutoGearId('preset');
      const normalizedPreset = normalizeAutoGearPreset({ id: presetId, label: normalizedName, rules });
      if (!normalizedPreset) {
        const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
          || texts.en?.autoGearPresetNameRequired
          || 'Enter a preset name to continue.';
        if (typeof window.alert === 'function') {
          window.alert(requiredMessage);
        }
        return;
      }
        if (autoGearAutoPresetIdState) {
          setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        }
      const existingIndex = autoGearPresets.findIndex(preset => preset.id === normalizedPreset.id);
      if (existingIndex >= 0) {
        autoGearPresets[existingIndex] = normalizedPreset;
      } else {
        autoGearPresets.push(normalizedPreset);
      }
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
      renderAutoGearPresetsControls();
      const savedMessage = texts[currentLang]?.autoGearPresetSaved
        || texts.en?.autoGearPresetSaved
        || 'Automatic gear preset saved.';
      showNotification('success', savedMessage);
    }
    
    function handleAutoGearDeletePreset() {
      if (!activeAutoGearPresetId) return;
      const preset = getAutoGearPresetById(activeAutoGearPresetId);
      const label = preset ? preset.label : '';
      const confirmTemplate = texts[currentLang]?.autoGearPresetDeleteConfirm
        || texts.en?.autoGearPresetDeleteConfirm
        || 'Delete this preset?';
      const confirmMessage = label && confirmTemplate.includes('%s')
        ? formatWithPlaceholders(confirmTemplate, label)
        : confirmTemplate;
      let confirmed = true;
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        confirmed = window.confirm(confirmMessage);
      }
      if (!confirmed) return;
        if (autoGearAutoPresetIdState && autoGearAutoPresetIdState === activeAutoGearPresetId) {
          setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        }
      autoGearPresets = autoGearPresets.filter(entry => entry.id !== activeAutoGearPresetId);
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      setActiveAutoGearPresetId('', { persist: true, skipRender: true });
      renderAutoGearPresetsControls();
      const deletedMessage = texts[currentLang]?.autoGearPresetDeleted
        || texts.en?.autoGearPresetDeleted
        || 'Automatic gear preset deleted.';
      showNotification('success', deletedMessage);
    }
    
    function handleAutoGearShowBackupsToggle() {
      if (!autoGearShowBackupsCheckbox) return;
      setAutoGearBackupsVisible(autoGearShowBackupsCheckbox.checked);
    }
    
    function handleAutoGearBackupRetentionInput() {
      if (!autoGearBackupRetentionInput) return;
      if (autoGearBackupRetentionWarningText) {
        updateAutoGearBackupRetentionWarning('');
      }
    }
    
    function handleAutoGearBackupRetentionBlur() {
      setTimeout(() => {
        if (!autoGearBackupRetentionWarningText) {
          updateAutoGearBackupRetentionWarning('');
        }
      }, 0);
    }
    
    function handleAutoGearBackupRetentionChange() {
      if (!autoGearBackupRetentionInput) return;
      const rawValue = autoGearBackupRetentionInput.value;
      const parsed = Number(rawValue);
      if (!Number.isFinite(parsed)) {
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }
    
      const normalized = clampAutoGearBackupRetentionLimit(parsed);
      if (normalized === autoGearBackupRetention) {
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }
    
      const previousLimit = autoGearBackupRetention;
    
      if (normalized < previousLimit) {
        const trimmedEstimate = Math.max(0, autoGearBackups.length - normalized);
        const warningTemplate = texts[currentLang]?.autoGearBackupRetentionWarning
          || texts.en?.autoGearBackupRetentionWarning
          || 'Lowering to {limit} will remove {trimmed}. A safety snapshot will be saved first.';
        const warningMessage = warningTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        updateAutoGearBackupRetentionWarning(warningMessage);
    
        const confirmTemplate = texts[currentLang]?.autoGearBackupRetentionConfirm
          || texts.en?.autoGearBackupRetentionConfirm
          || 'Save a safety snapshot and trim older backups now?';
        const confirmMessage = confirmTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        const confirmed = typeof window !== 'undefined' && typeof window.confirm === 'function'
          ? window.confirm(confirmMessage)
          : true;
        if (!confirmed) {
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          renderAutoGearBackupRetentionControls();
          return;
        }
    
        const safetyBase = texts[currentLang]?.autoGearBackupRetentionSafetyNote
          || texts.en?.autoGearBackupRetentionSafetyNote
          || 'Retention lowered to {limit}.';
        const safetyTrimmed = texts[currentLang]?.autoGearBackupRetentionSafetyNoteTrimmed
          || texts.en?.autoGearBackupRetentionSafetyNoteTrimmed
          || 'Retention lowered to {limit}. Removed {trimmed} in this change.';
        const safetyTemplate = trimmedEstimate > 0 ? safetyTrimmed : safetyBase;
        const safetyNote = safetyTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
    
        const safetyResult = captureAutoGearBackupSnapshot({
          force: true,
          notifySuccess: false,
          note: safetyNote,
        });
    
        if (safetyResult.status !== 'created') {
          const failureMessage = texts[currentLang]?.autoGearBackupRetentionSafetyFailed
            || texts.en?.autoGearBackupRetentionSafetyFailed
            || 'Safety snapshot failed. Retention was not changed.';
          showNotification('error', failureMessage);
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          renderAutoGearBackupControls();
          renderAutoGearBackupRetentionControls();
          return;
        }
    
        const safetySavedMessage = texts[currentLang]?.autoGearBackupRetentionSafetySaved
          || texts.en?.autoGearBackupRetentionSafetySaved
          || 'Safety snapshot captured before trimming backups.';
        showNotification('success', safetySavedMessage);
    
        const trimResult = enforceAutoGearBackupRetentionLimit(normalized);
        if (!trimResult.success) {
          const failureMessage = texts[currentLang]?.autoGearBackupRetentionUpdateFailed
            || texts.en?.autoGearBackupRetentionUpdateFailed
            || 'Could not apply the new retention limit.';
          showNotification('error', failureMessage);
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          return;
        }
    
        const trimmedCount = trimResult.trimmed.length;
        const successTemplate = trimmedCount > 0
          ? texts[currentLang]?.autoGearBackupRetentionUpdated
            || texts.en?.autoGearBackupRetentionUpdated
            || 'Retention updated to {limit}. Removed {trimmed}.'
          : texts[currentLang]?.autoGearBackupRetentionUpdatedNoTrim
            || texts.en?.autoGearBackupRetentionUpdatedNoTrim
            || 'Retention updated to {limit}. No backups were removed.';
        const successMessage = successTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedCount, 1)));
        showNotification('success', successMessage);
        updateAutoGearBackupRetentionWarning('');
        return;
      }
    
      const increaseResult = enforceAutoGearBackupRetentionLimit(normalized);
      if (!increaseResult.success) {
        const failureMessage = texts[currentLang]?.autoGearBackupRetentionUpdateFailed
          || texts.en?.autoGearBackupRetentionUpdateFailed
          || 'Could not apply the new retention limit.';
        showNotification('error', failureMessage);
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        return;
      }
    
      const successTemplate = texts[currentLang]?.autoGearBackupRetentionExpanded
        || texts.en?.autoGearBackupRetentionExpanded
        || 'Retention updated to {limit}.';
      const successMessage = successTemplate.replace('{limit}', formatAutoGearBackupCount(normalized));
      showNotification('success', successMessage);
      updateAutoGearBackupRetentionWarning('');
    }
    
    function renderAutoGearBackupControls() {
      if (!autoGearBackupSelect || !autoGearBackupEmptyMessage) return;
    
      const previousValue = autoGearBackupSelect.value;
      const placeholderText = getAutoGearBackupSelectPlaceholder();
    
      autoGearBackupSelect.innerHTML = '';
    
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = placeholderText;
      placeholder.disabled = true;
      autoGearBackupSelect.appendChild(placeholder);
    
      const availableIds = new Set(autoGearBackups.map(backup => backup.id));
      const retainSelection = previousValue && availableIds.has(previousValue);
    
      autoGearBackups.forEach(backup => {
        const option = document.createElement('option');
        option.value = backup.id;
        option.textContent = formatAutoGearBackupMeta(backup);
        if (backup.createdAt) {
          option.title = backup.createdAt;
        }
        if (retainSelection && backup.id === previousValue) {
          option.selected = true;
        }
        autoGearBackupSelect.appendChild(option);
      });
    
      if (!autoGearBackups.length) {
        placeholder.selected = true;
        autoGearBackupSelect.value = '';
        autoGearBackupSelect.disabled = true;
        autoGearBackupEmptyMessage.hidden = false;
      } else {
        autoGearBackupSelect.disabled = false;
        autoGearBackupEmptyMessage.hidden = true;
        if (retainSelection) {
          placeholder.selected = false;
          autoGearBackupSelect.value = previousValue;
        } else {
          placeholder.selected = true;
          autoGearBackupSelect.value = '';
        }
      }
    
      updateAutoGearBackupRestoreButtonState();
      applyAutoGearBackupVisibility();
      renderAutoGearBackupRetentionControls();
    }
    
    function extractAutoGearTriggers(rule) {
      if (!rule || typeof rule !== 'object') {
        return {
          always: false,
          scenarioLogic: 'all',
          scenarioPrimary: '',
          scenarioMultiplier: 1,
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
          shootingDays: null,
        };
      }
      return {
        always: Boolean(rule.always),
        scenarioLogic: normalizeAutoGearScenarioLogic(rule.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(rule.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier),
        scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
        mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
        cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
        deliveryResolution: Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.slice() : [],
        videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
        camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
        monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
        crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
        crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
        wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
        motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
        controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
        distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
        shootingDays: rule.shootingDays ? normalizeAutoGearShootingDaysCondition(rule.shootingDays) : null,
      };
    }
    
    function snapshotAutoGearRuleForSummary(rule, index) {
      if (!rule || typeof rule !== 'object') return null;
      const baseIndex = Number.isInteger(index) ? index : 0;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : `rule-${baseIndex + 1}`;
      const label = typeof rule.label === 'string' ? rule.label : '';
      const triggers = extractAutoGearTriggers(rule);
      const add = Array.isArray(rule.add) ? rule.add.map(autoGearItemSnapshot).filter(Boolean) : [];
      const remove = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSnapshot).filter(Boolean) : [];
      return {
        id,
        label,
        index: baseIndex,
        position: baseIndex + 1,
        add,
        remove,
        ...triggers,
      };
    }
    
    function createAutoGearRuleReference(rule) {
      if (!rule || typeof rule !== 'object') return null;
      const index = Number.isInteger(rule.index) ? rule.index : 0;
      const position = Number.isInteger(rule.position) ? rule.position : index + 1;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : `rule-${position}`;
      const label = typeof rule.label === 'string' ? rule.label : '';
      return { id, label, index, position };
    }
    
    function dedupeAutoGearRuleReferences(refs) {
      const result = [];
      const seen = new Set();
      (Array.isArray(refs) ? refs : []).forEach(ref => {
        if (!ref || typeof ref !== 'object') return;
        const key = ref.id || `index-${ref.index}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({ ...ref });
      });
      return result;
    }
    
    function createAutoGearItemKey(item) {
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      return coreStableStringify({
        name: snapshot.name || '',
        category: snapshot.category || '',
        quantity: normalizeAutoGearQuantity(snapshot.quantity),
        screenSize: snapshot.screenSize || '',
        selectorType: snapshot.selectorType || 'none',
        selectorDefault: snapshot.selectorDefault || '',
        selectorEnabled: Boolean(snapshot.selectorEnabled),
        notes: snapshot.notes || '',
      });
    }
    
    function createAutoGearTriggerKeyForSummary(rule) {
      const triggers = extractAutoGearTriggers(rule);
      const sorted = {
        ...triggers,
        scenarios: triggers.scenarios.slice().sort(localeSort),
        mattebox: triggers.mattebox.slice().sort(localeSort),
        cameraHandle: triggers.cameraHandle.slice().sort(localeSort),
        viewfinderExtension: triggers.viewfinderExtension.slice().sort(localeSort),
        deliveryResolution: triggers.deliveryResolution.slice().sort(localeSort),
        videoDistribution: triggers.videoDistribution.slice().sort(localeSort),
        camera: triggers.camera.slice().sort(localeSort),
        monitor: triggers.monitor.slice().sort(localeSort),
        crewPresent: triggers.crewPresent.slice().sort(localeSort),
        crewAbsent: triggers.crewAbsent.slice().sort(localeSort),
        wireless: triggers.wireless.slice().sort(localeSort),
        motors: triggers.motors.slice().sort(localeSort),
        controllers: triggers.controllers.slice().sort(localeSort),
        distance: triggers.distance.slice().sort(localeSort),
        shootingDays: triggers.shootingDays
          ? { mode: triggers.shootingDays.mode, value: triggers.shootingDays.value }
          : null,
      };
      return coreStableStringify(sorted);
    }
    
    function collectAutoGearScenarioCatalog() {
      if (typeof document === 'undefined') return [];
      const select = document.getElementById('requiredScenarios');
      if (!select) return [];
      const map = new Map();
      Array.from(select.options || []).forEach(option => {
        const value = typeof option.value === 'string' ? option.value.trim() : '';
        if (!value) return;
        const normalized = normalizeAutoGearTriggerValue(value) || value;
        if (map.has(normalized)) return;
        map.set(normalized, {
          value,
          label: option.textContent || value,
          normalized,
        });
      });
      return Array.from(map.values()).sort((a, b) => localeSort(a.label, b.label));
    }
    
    function getAutoGearRuleCoverageSummary(options = {}) {
      const sourceRules = Array.isArray(options.rules) ? options.rules : getAutoGearRules();
      const snapshots = [];
      (Array.isArray(sourceRules) ? sourceRules : []).forEach((rule, index) => {
        const snapshot = snapshotAutoGearRuleForSummary(rule, index);
        if (snapshot) {
          snapshots.push(snapshot);
        }
      });
      const summary = {
        generatedAt: new Date().toISOString(),
        totalRules: snapshots.length,
      };
    
      const catalog = collectAutoGearScenarioCatalog();
      if (!snapshots.length) {
        summary.duplicates = { totalGroups: 0, totalRules: 0, groups: [] };
        summary.conflicts = { totalItems: 0, totalRules: 0, items: [] };
        summary.net = {
          addItems: 0,
          addQuantity: 0,
          removeItems: 0,
          removeQuantity: 0,
          netQuantity: 0,
        };
        summary.scenarios = {
          catalog,
          coverage: [],
          uncovered: catalog.map(entry => ({
            value: entry.value,
            label: entry.label,
            normalized: entry.normalized,
          })),
          overlaps: [],
          rulesWithoutScenarios: [],
          total: catalog.length,
          coveredCount: 0,
        };
        autoGearSummaryLast = summary;
        return summary;
      }
    
      const duplicateMap = new Map();
      const duplicateRuleIds = new Set();
      snapshots.forEach(snapshot => {
        const key = createAutoGearTriggerKeyForSummary(snapshot);
        if (!duplicateMap.has(key)) {
          duplicateMap.set(key, {
            triggers: extractAutoGearTriggers(snapshot),
            rules: [],
          });
        }
        const ref = createAutoGearRuleReference(snapshot);
        if (ref) {
          duplicateMap.get(key).rules.push(ref);
        }
      });
      const duplicateGroups = [];
      duplicateMap.forEach(entry => {
        const rules = dedupeAutoGearRuleReferences(entry.rules);
        if (rules.length <= 1) return;
        rules.forEach(ref => duplicateRuleIds.add(ref.id || `index-${ref.index}`));
        duplicateGroups.push({
          triggers: entry.triggers,
          rules,
        });
      });
      summary.duplicates = {
        totalGroups: duplicateGroups.length,
        totalRules: duplicateRuleIds.size,
        groups: duplicateGroups,
      };
    
      const conflictMap = new Map();
      const conflictRuleIds = new Set();
      snapshots.forEach(snapshot => {
        const ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        snapshot.add.forEach(item => {
          const key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, { item, adds: [], removes: [] });
          }
          conflictMap.get(key).adds.push(ref);
        });
        snapshot.remove.forEach(item => {
          const key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, { item, adds: [], removes: [] });
          }
          conflictMap.get(key).removes.push(ref);
        });
      });
      const conflictItems = [];
      conflictMap.forEach(entry => {
        const adds = dedupeAutoGearRuleReferences(entry.adds);
        const removes = dedupeAutoGearRuleReferences(entry.removes);
        if (!adds.length || !removes.length) return;
        adds.forEach(ref => conflictRuleIds.add(ref.id || `index-${ref.index}`));
        removes.forEach(ref => conflictRuleIds.add(ref.id || `index-${ref.index}`));
        conflictItems.push({
          item: entry.item,
          adds,
          removes,
        });
      });
      summary.conflicts = {
        totalItems: conflictItems.length,
        totalRules: conflictRuleIds.size,
        items: conflictItems,
      };
    
      let addItems = 0;
      let addQuantity = 0;
      let removeItems = 0;
      let removeQuantity = 0;
      snapshots.forEach(snapshot => {
        snapshot.add.forEach(item => {
          addItems += 1;
          addQuantity += normalizeAutoGearQuantity(item.quantity);
        });
        snapshot.remove.forEach(item => {
          removeItems += 1;
          removeQuantity += normalizeAutoGearQuantity(item.quantity);
        });
      });
      summary.net = {
        addItems,
        addQuantity,
        removeItems,
        removeQuantity,
        netQuantity: addQuantity - removeQuantity,
      };
    
      const scenarioLabelMap = new Map();
      catalog.forEach(entry => {
        scenarioLabelMap.set(entry.normalized, entry.label);
        scenarioLabelMap.set(entry.value, entry.label);
      });
      const coverageMap = new Map();
      snapshots.forEach(snapshot => {
        const ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        const list = Array.isArray(snapshot.scenarios) ? snapshot.scenarios : [];
        list.forEach(value => {
          if (typeof value !== 'string') return;
          const trimmed = value.trim();
          if (!trimmed) return;
          const normalized = normalizeAutoGearTriggerValue(trimmed) || trimmed;
          if (!coverageMap.has(normalized)) {
            coverageMap.set(normalized, {
              value: trimmed,
              normalized,
              rules: [],
            });
          }
          coverageMap.get(normalized).rules.push(ref);
        });
      });
      const coverage = Array.from(coverageMap.values()).map(entry => {
        const rules = dedupeAutoGearRuleReferences(entry.rules);
        return {
          value: entry.value,
          normalized: entry.normalized,
          label: scenarioLabelMap.get(entry.normalized) || scenarioLabelMap.get(entry.value) || entry.value,
          rules,
        };
      }).sort((a, b) => localeSort(a.label, b.label));
      const coveredKeys = new Set(coverage.map(entry => entry.normalized));
      const uncovered = catalog
        .filter(entry => !coveredKeys.has(entry.normalized))
        .map(entry => ({ value: entry.value, label: entry.label, normalized: entry.normalized }));
      uncovered.sort((a, b) => localeSort(a.label, b.label));
      const overlaps = coverage.filter(entry => entry.rules.length > 1);
      const rulesWithoutScenarios = dedupeAutoGearRuleReferences(
        snapshots
          .filter(rule => !rule.always && (!Array.isArray(rule.scenarios) || !rule.scenarios.length))
          .map(createAutoGearRuleReference)
          .filter(Boolean),
      );
    
      summary.scenarios = {
        catalog,
        coverage,
        uncovered,
        overlaps,
        rulesWithoutScenarios,
        total: catalog.length,
        coveredCount: coverage.length,
      };
    
      autoGearSummaryLast = summary;
      return summary;
    }
    
    function formatAutoGearRuleReference(ref, langTexts) {
      if (!ref || typeof ref !== 'object') return '';
      const baseLabel = ref.label || langTexts.autoGearRuleBadgeUnnamed
        || texts.en?.autoGearRuleBadgeUnnamed
        || 'Automatic rule';
      const positionText = formatNumberForLang(currentLang, ref.position || 1);
      if (ref.label) {
        const template = langTexts.autoGearSummaryRuleReference
          || texts.en?.autoGearSummaryRuleReference
          || 'Rule {position}: {label}';
        return template
          .replace('{position}', positionText)
          .replace('{label}', baseLabel);
      }
      const template = langTexts.autoGearSummaryRuleReferenceUntitled
        || texts.en?.autoGearSummaryRuleReferenceUntitled
        || 'Rule {position}';
      return template.replace('{position}', positionText);
    }
    
    function getAutoGearAnyMotorLabelForLang(langTexts) {
      const fallbackTexts = texts.en || {};
      const source = langTexts || fallbackTexts;
      return source.autoGearMotorsAny || fallbackTexts.autoGearMotorsAny || 'Any motor selected';
    }
    
    function formatAutoGearMotorValue(value, langTexts) {
      const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
      if (normalized === AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL) {
        return getAutoGearAnyMotorLabelForLang(langTexts);
      }
      return value;
    }
    
    function formatAutoGearTriggerDescription(triggers, analysis, langTexts) {
      if (!triggers) return '';
      const parts = [];
      if (triggers.always) {
        parts.push(langTexts.autoGearAlwaysMeta || texts.en?.autoGearAlwaysMeta || 'Always active');
      }
      const scenarioMap = new Map();
      (analysis?.scenarios?.catalog || []).forEach(entry => {
        scenarioMap.set(entry.normalized, entry.label);
        scenarioMap.set(entry.value, entry.label);
      });
      (analysis?.scenarios?.coverage || []).forEach(entry => {
        scenarioMap.set(entry.normalized, entry.label);
      });
      const formatScenarioLabel = value => {
        const normalized = normalizeAutoGearTriggerValue(value) || value;
        return scenarioMap.get(normalized) || value;
      };
      if (Array.isArray(triggers.scenarios) && triggers.scenarios.length) {
        const scenarioLabels = triggers.scenarios.map(formatScenarioLabel).filter(Boolean);
        const label = langTexts.autoGearScenariosLabel || texts.en?.autoGearScenariosLabel || 'Required scenarios';
        parts.push(`${label}: ${formatListForLang(currentLang, scenarioLabels)}`);
      }
      const scenarioLogic = normalizeAutoGearScenarioLogic(triggers.scenarioLogic);
      if (scenarioLogic) {
        const modeLabel = scenarioLogic === 'any'
          ? langTexts.autoGearScenarioModeAny || texts.en?.autoGearScenarioModeAny || 'Match any selected scenario'
          : scenarioLogic === 'multiplier'
            ? langTexts.autoGearScenarioModeMultiplier || texts.en?.autoGearScenarioModeMultiplier || 'Multiply when combined'
            : langTexts.autoGearScenarioModeAll || texts.en?.autoGearScenarioModeAll || 'Require every selected scenario';
        const modeHeading = langTexts.autoGearScenarioModeLabel
          || texts.en?.autoGearScenarioModeLabel
          || 'Scenario matching';
        let detail = modeLabel;
        if (scenarioLogic === 'multiplier') {
          const factorLabel = langTexts.autoGearScenarioFactorLabel
            || texts.en?.autoGearScenarioFactorLabel
            || 'Multiplier factor';
          const multiplier = normalizeAutoGearScenarioMultiplier(triggers.scenarioMultiplier);
          const multiplierText = formatNumberForLang(currentLang, multiplier || 1);
          const baseScenario = triggers.scenarioPrimary
            ? formatScenarioLabel(triggers.scenarioPrimary)
            : (triggers.scenarios && triggers.scenarios.length
              ? formatScenarioLabel(triggers.scenarios[0])
              : '');
          detail = baseScenario
            ? `${modeLabel} (${factorLabel}: ×${multiplierText}, ${baseScenario})`
            : `${modeLabel} (×${multiplierText})`;
        }
        parts.push(`${modeHeading}: ${detail}`);
      }
      const triggerConfigs = [
        { key: 'mattebox', labelKey: 'autoGearMatteboxLabel' },
        { key: 'cameraHandle', labelKey: 'autoGearCameraHandleLabel' },
        { key: 'viewfinderExtension', labelKey: 'autoGearViewfinderExtensionLabel', formatter: getViewfinderFallbackLabel },
        { key: 'deliveryResolution', labelKey: 'autoGearDeliveryResolutionLabel' },
        { key: 'videoDistribution', labelKey: 'autoGearVideoDistributionLabel', formatter: getVideoDistributionFallbackLabel },
        { key: 'camera', labelKey: 'autoGearCameraLabel' },
        { key: 'monitor', labelKey: 'autoGearMonitorLabel' },
        { key: 'crewPresent', labelKey: 'autoGearCrewPresentLabel' },
        { key: 'crewAbsent', labelKey: 'autoGearCrewAbsentLabel' },
        { key: 'wireless', labelKey: 'autoGearWirelessLabel' },
        { key: 'motors', labelKey: 'autoGearMotorsLabel', formatter: value => formatAutoGearMotorValue(value, langTexts) },
        { key: 'controllers', labelKey: 'autoGearControllersLabel' },
        { key: 'distance', labelKey: 'autoGearDistanceLabel' },
      ];
      triggerConfigs.forEach(config => {
        const values = Array.isArray(triggers[config.key]) ? triggers[config.key].filter(Boolean) : [];
        if (!values.length) return;
        const label = langTexts[config.labelKey] || texts.en?.[config.labelKey] || config.labelKey;
        const formatted = values.map(value => {
          if (!config.formatter) return value;
          try {
            return config.formatter(value);
          } catch (error) {
            void error;
            return value;
          }
        }).filter(Boolean);
        if (formatted.length) {
          parts.push(`${label}: ${formatListForLang(currentLang, formatted)}`);
        }
      });
      if (triggers.shootingDays && triggers.shootingDays.value) {
        const label = langTexts.autoGearShootingDaysLabel
          || texts.en?.autoGearShootingDaysLabel
          || 'Shooting days condition';
        const modeKey = triggers.shootingDays.mode === 'maximum'
          ? 'autoGearShootingDaysModeMaximum'
          : triggers.shootingDays.mode === 'every'
            ? 'autoGearShootingDaysModeEvery'
            : 'autoGearShootingDaysModeMinimum';
        const modeLabel = langTexts[modeKey] || texts.en?.[modeKey] || triggers.shootingDays.mode;
        const valueText = formatNumberForLang(currentLang, triggers.shootingDays.value);
        parts.push(`${label}: ${modeLabel} ${valueText}`);
      }
      return parts.join('; ');
    }
    
    function renderAutoGearRuleSummary(analysis, context = {}) {
      if (!autoGearSummarySection || !autoGearSummaryHeadingElem || !autoGearSummaryDescriptionElem || !autoGearSummaryCards || !autoGearSummaryDetails) {
        return;
      }
      const langTexts = texts[currentLang] || texts.en || {};
      const heading = langTexts.autoGearSummaryHeading
        || texts.en?.autoGearSummaryHeading
        || autoGearSummaryHeadingElem.textContent
        || 'Rule coverage overview';
      autoGearSummaryHeadingElem.textContent = heading;
    
      if (!analysis || typeof analysis.totalRules !== 'number') {
        autoGearSummarySection.hidden = true;
        return;
      }
    
      autoGearSummarySection.hidden = false;
      autoGearSummaryCards.innerHTML = '';
      autoGearSummaryDetails.innerHTML = '';
    
      const totalRules = analysis.totalRules;
      const filteredRules = typeof context.filteredRules === 'number' ? context.filteredRules : totalRules;
      const visibleRules = typeof context.visibleRules === 'number' ? context.visibleRules : filteredRules;
      const focus = context.focus || autoGearSummaryFocus || 'all';
      const hasSearchFilters = Boolean(context.hasSearchFilters);
      const focusApplied = Boolean(context.focusApplied);
      const scenarioTotal = typeof analysis.scenarios?.total === 'number'
        ? analysis.scenarios.total
        : Array.isArray(analysis.scenarios?.catalog)
          ? analysis.scenarios.catalog.length
          : 0;
      const scenarioCovered = typeof analysis.scenarios?.coveredCount === 'number'
        ? analysis.scenarios.coveredCount
        : Array.isArray(analysis.scenarios?.coverage)
          ? analysis.scenarios.coverage.length
          : 0;
      const overlapCount = Array.isArray(analysis.scenarios?.overlaps)
        ? analysis.scenarios.overlaps.length
        : 0;
      const hasScenarioCatalog = scenarioTotal > 0;
      const coveragePercent = hasScenarioCatalog && scenarioTotal
        ? Math.round((scenarioCovered / scenarioTotal) * 100)
        : 0;
    
      if (!totalRules) {
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryEmpty
          || texts.en?.autoGearSummaryEmpty
          || 'Add a rule to unlock coverage insights.';
        return;
      }
    
      if (hasSearchFilters || (focus !== 'all' && focus !== 'uncovered') || focusApplied) {
        const template = langTexts.autoGearSummaryFilteredDescription
          || texts.en?.autoGearSummaryFilteredDescription
          || 'Showing {visible} of {total} rules after filters.';
        autoGearSummaryDescriptionElem.textContent = template
          .replace('{visible}', formatNumberForLang(currentLang, visibleRules))
          .replace('{filtered}', formatNumberForLang(currentLang, filteredRules))
          .replace('{total}', formatNumberForLang(currentLang, totalRules));
      } else {
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryDescription
          || texts.en?.autoGearSummaryDescription
          || 'Review duplicates, coverage gaps and conflicts before exporting or printing.';
      }
    
      const formatRulesCount = count => {
        const template = count === 1
          ? langTexts.autoGearRulesCountOne || texts.en?.autoGearRulesCountOne || '%s rule'
          : langTexts.autoGearRulesCountOther || texts.en?.autoGearRulesCountOther || '%s rules';
        return template.replace('%s', formatNumberForLang(currentLang, count));
      };
      const coverageValue = hasScenarioCatalog
        ? `${formatNumberForLang(currentLang, coveragePercent)}%`
        : formatNumberForLang(currentLang, scenarioCovered);
      const coverageDescription = hasScenarioCatalog
        ? (langTexts.autoGearSummaryCoverageDescription
          || texts.en?.autoGearSummaryCoverageDescription
          || '{covered} of {total} scenarios covered')
          .replace('{covered}', formatNumberForLang(currentLang, scenarioCovered))
          .replace('{total}', formatNumberForLang(currentLang, scenarioTotal))
        : langTexts.autoGearSummaryCoverageEmpty
          || texts.en?.autoGearSummaryCoverageEmpty
          || 'Add scenarios to measure coverage.';
    
      const buildCard = (config) => {
        const { label, value, description, focusKey } = config;
        const isAction = Boolean(focusKey);
        const element = document.createElement(isAction ? 'button' : 'div');
        element.className = 'auto-gear-summary-card';
        if (isAction) {
          element.type = 'button';
          element.classList.add('auto-gear-summary-action');
          element.dataset.focus = focusKey;
          element.setAttribute('aria-pressed', autoGearSummaryFocus === focusKey ? 'true' : 'false');
        }
        const labelElem = document.createElement('p');
        labelElem.className = 'auto-gear-summary-label';
        labelElem.textContent = label;
        const valueElem = document.createElement('p');
        valueElem.className = 'auto-gear-summary-value';
        valueElem.textContent = value;
        element.appendChild(labelElem);
        element.appendChild(valueElem);
        if (description) {
          const descElem = document.createElement('p');
          descElem.className = 'auto-gear-summary-description';
          descElem.textContent = description;
          element.appendChild(descElem);
        }
        autoGearSummaryCards.appendChild(element);
      };
    
      const netValue = `${formatNumberForLang(currentLang, analysis.net.addQuantity)} / −${formatNumberForLang(currentLang, analysis.net.removeQuantity)}`;
      buildCard({
        label: langTexts.autoGearSummaryTotalLabel || texts.en?.autoGearSummaryTotalLabel || 'Rules',
        value: formatNumberForLang(currentLang, totalRules),
        description: langTexts.autoGearSummaryTotalDescription
          || texts.en?.autoGearSummaryTotalDescription
          || 'Saved in this setup',
      });
      buildCard({
        label: langTexts.autoGearSummaryCoverageLabel || texts.en?.autoGearSummaryCoverageLabel || 'Scenario coverage',
        value: coverageValue,
        description: coverageDescription,
      });
      buildCard({
        label: langTexts.autoGearSummaryNetLabel || texts.en?.autoGearSummaryNetLabel || 'Net change',
        value: netValue,
        description: (langTexts.autoGearSummaryNetDescription || texts.en?.autoGearSummaryNetDescription || 'Adds {adds} · Removes {removes}')
          .replace('{adds}', formatNumberForLang(currentLang, analysis.net.addItems))
          .replace('{removes}', formatNumberForLang(currentLang, analysis.net.removeItems)),
      });
      buildCard({
        label: langTexts.autoGearSummaryDuplicatesLabel || texts.en?.autoGearSummaryDuplicatesLabel || 'Duplicated triggers',
        value: formatNumberForLang(currentLang, analysis.duplicates.totalGroups),
        description: analysis.duplicates.totalGroups
          ? (langTexts.autoGearSummaryDuplicatesSome || texts.en?.autoGearSummaryDuplicatesSome || '{rules} across {groups} groups')
            .replace('{rules}', formatRulesCount(analysis.duplicates.totalRules))
          .replace('{groups}', formatNumberForLang(currentLang, analysis.duplicates.totalGroups))
          : langTexts.autoGearSummaryDuplicatesNone || texts.en?.autoGearSummaryDuplicatesNone || 'No duplicate triggers.',
        focusKey: 'duplicates',
      });
      buildCard({
        label: langTexts.autoGearSummaryConflictsLabel || texts.en?.autoGearSummaryConflictsLabel || 'Potential conflicts',
        value: formatNumberForLang(currentLang, analysis.conflicts.totalItems),
        description: analysis.conflicts.totalItems
          ? (langTexts.autoGearSummaryConflictsSome || texts.en?.autoGearSummaryConflictsSome || '{rules} affected across {items} items')
            .replace('{rules}', formatRulesCount(analysis.conflicts.totalRules))
            .replace('{items}', formatNumberForLang(currentLang, analysis.conflicts.totalItems))
          : langTexts.autoGearSummaryConflictsNone || texts.en?.autoGearSummaryConflictsNone || 'No conflicting adds/removes.',
        focusKey: 'conflicts',
      });
      buildCard({
        label: langTexts.autoGearSummaryOverlapsLabel || texts.en?.autoGearSummaryOverlapsLabel || 'Stacked scenarios',
        value: formatNumberForLang(currentLang, overlapCount),
        description: overlapCount
          ? (langTexts.autoGearSummaryOverlapsSome || texts.en?.autoGearSummaryOverlapsSome || '{count} scenarios touched by multiple rules')
            .replace('{count}', formatNumberForLang(currentLang, overlapCount))
          : langTexts.autoGearSummaryOverlapsNone || texts.en?.autoGearSummaryOverlapsNone || 'No scenarios currently stack multiple rules.',
        focusKey: 'overlaps',
      });
      buildCard({
        label: langTexts.autoGearSummaryUncoveredLabel || texts.en?.autoGearSummaryUncoveredLabel || 'Uncovered scenarios',
        value: formatNumberForLang(currentLang, analysis.scenarios.uncovered.length),
        description: analysis.scenarios.uncovered.length
          ? (langTexts.autoGearSummaryUncoveredSome || texts.en?.autoGearSummaryUncoveredSome || 'Review {count} scenario gaps')
            .replace('{count}', formatNumberForLang(currentLang, analysis.scenarios.uncovered.length))
          : langTexts.autoGearSummaryUncoveredNone || texts.en?.autoGearSummaryUncoveredNone || 'All required scenarios covered.',
        focusKey: 'uncovered',
      });
    
      const detailsFragment = document.createDocumentFragment();
      const intro = document.createElement('p');
      intro.className = 'auto-gear-summary-detail-text';
      intro.textContent = langTexts.autoGearSummaryDetailsIntro
        || texts.en?.autoGearSummaryDetailsIntro
        || 'Use the dashboard to audit coverage, overlaps and conflicts before exporting or printing.';
      detailsFragment.appendChild(intro);
    
      const appendRuleButtons = (container, rules) => {
        const jumpHelp = langTexts.autoGearSummaryJumpToRule
          || texts.en?.autoGearSummaryJumpToRule
          || 'Show rule';
        rules.forEach((ref, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.autoGearRule = ref.id;
          button.textContent = formatAutoGearRuleReference(ref, langTexts);
          button.setAttribute('title', jumpHelp);
          container.appendChild(button);
          if (index < rules.length - 1) {
            container.appendChild(document.createTextNode(', '));
          }
        });
      };
    
      if (focus === 'duplicates') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsDuplicatesHeading
          || texts.en?.autoGearSummaryDetailsDuplicatesHeading
          || 'Rules sharing the same triggers';
        detailsFragment.appendChild(headingElem);
        if (!analysis.duplicates.groups.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryDuplicatesNone
            || texts.en?.autoGearSummaryDuplicatesNone
            || 'No duplicate triggers.';
          detailsFragment.appendChild(empty);
        } else {
          analysis.duplicates.groups.forEach(group => {
            const description = formatAutoGearTriggerDescription(group.triggers, analysis, langTexts);
            const descriptionElem = document.createElement('p');
            descriptionElem.className = 'auto-gear-summary-detail-text';
            descriptionElem.textContent = (langTexts.autoGearSummaryDuplicateGroupTitle
              || texts.en?.autoGearSummaryDuplicateGroupTitle
              || 'Matching triggers') + (description ? ` — ${description}` : '');
            detailsFragment.appendChild(descriptionElem);
            if (group.rules.length) {
              const list = document.createElement('ul');
              list.className = 'auto-gear-summary-list';
              const item = document.createElement('li');
              appendRuleButtons(item, group.rules);
              list.appendChild(item);
              detailsFragment.appendChild(list);
            }
          });
        }
      } else if (focus === 'conflicts') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsConflictsHeading
          || texts.en?.autoGearSummaryDetailsConflictsHeading
          || 'Gear touched by adds and removes';
        detailsFragment.appendChild(headingElem);
        if (!analysis.conflicts.items.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryConflictsNone
            || texts.en?.autoGearSummaryConflictsNone
            || 'No conflicting adds/removes.';
          detailsFragment.appendChild(empty);
        } else {
          analysis.conflicts.items.forEach(entry => {
            const title = document.createElement('p');
            title.className = 'auto-gear-summary-detail-text';
            title.textContent = formatAutoGearItemSummary(entry.item);
            detailsFragment.appendChild(title);
            const list = document.createElement('ul');
            list.className = 'auto-gear-summary-list';
            const addsItem = document.createElement('li');
            addsItem.textContent = (langTexts.autoGearSummaryConflictAddsLabel
              || texts.en?.autoGearSummaryConflictAddsLabel
              || 'Added by') + ': ';
            appendRuleButtons(addsItem, entry.adds);
            list.appendChild(addsItem);
            const removesItem = document.createElement('li');
            removesItem.textContent = (langTexts.autoGearSummaryConflictRemovesLabel
              || texts.en?.autoGearSummaryConflictRemovesLabel
              || 'Removed by') + ': ';
            appendRuleButtons(removesItem, entry.removes);
            list.appendChild(removesItem);
            detailsFragment.appendChild(list);
          });
        }
      } else if (focus === 'overlaps') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading
          || texts.en?.autoGearSummaryDetailsOverlapsHeading
          || 'Scenarios with stacked rules';
        detailsFragment.appendChild(headingElem);
        if (!analysis.scenarios.overlaps.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryDetailsOverlapsNone
            || texts.en?.autoGearSummaryDetailsOverlapsNone
            || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(empty);
        } else {
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = `${entry.label} — ${formatRulesCount(entry.rules.length)}`;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      } else if (focus === 'uncovered') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading
          || texts.en?.autoGearSummaryDetailsUncoveredHeading
          || 'Scenarios without dedicated rules';
        detailsFragment.appendChild(headingElem);
        if (!analysis.scenarios.uncovered.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryUncoveredNone
            || texts.en?.autoGearSummaryUncoveredNone
            || 'All required scenarios covered.';
          detailsFragment.appendChild(empty);
        } else {
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      } else {
        if (analysis.scenarios.overlaps.length) {
          const headingElem = document.createElement('p');
          headingElem.className = 'auto-gear-summary-detail-title';
          headingElem.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading
            || texts.en?.autoGearSummaryDetailsOverlapsHeading
            || 'Scenarios with stacked rules';
          detailsFragment.appendChild(headingElem);
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = `${entry.label} — ${formatRulesCount(entry.rules.length)}`;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        } else {
          const note = document.createElement('p');
          note.className = 'auto-gear-summary-detail-text';
          note.textContent = langTexts.autoGearSummaryDetailsOverlapsNone
            || texts.en?.autoGearSummaryDetailsOverlapsNone
            || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(note);
        }
        if (analysis.scenarios.uncovered.length) {
          const headingElem = document.createElement('p');
          headingElem.className = 'auto-gear-summary-detail-title';
          headingElem.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading
            || texts.en?.autoGearSummaryDetailsUncoveredHeading
            || 'Scenarios without dedicated rules';
          detailsFragment.appendChild(headingElem);
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      }
    
      if (focus !== 'all') {
        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.className = 'auto-gear-summary-reset';
        resetButton.dataset.autoGearSummaryReset = 'true';
        resetButton.textContent = langTexts.autoGearSummaryResetFocus
          || texts.en?.autoGearSummaryResetFocus
          || 'Clear dashboard filter';
        detailsFragment.appendChild(resetButton);
      } else if (!analysis.duplicates.groups.length && !analysis.conflicts.items.length && !analysis.scenarios.uncovered.length) {
        const empty = document.createElement('p');
        empty.className = 'auto-gear-summary-detail-text';
        empty.textContent = langTexts.autoGearSummaryDetailsFocusEmpty
          || texts.en?.autoGearSummaryDetailsFocusEmpty
          || 'Everything looks covered—no overlaps or conflicts detected.';
        detailsFragment.appendChild(empty);
      }
    
      autoGearSummaryDetails.appendChild(detailsFragment);
    }
    
    function setAutoGearSummaryFocus(value) {
      const allowed = value === 'duplicates' || value === 'conflicts' || value === 'overlaps' || value === 'uncovered' ? value : 'all';
      const next = autoGearSummaryFocus === allowed && allowed !== 'all' ? 'all' : allowed;
      if (autoGearSummaryFocus === next) {
        return;
      }
      autoGearSummaryFocus = next;
      renderAutoGearRulesList();
    }
    
    function focusAutoGearRuleById(ruleId) {
      if (!ruleId || !autoGearRulesList) return;
      const candidates = Array.from(autoGearRulesList.querySelectorAll('[data-rule-id]'));
      const target = candidates.find(element => element && element.dataset && element.dataset.ruleId === ruleId);
      if (!target) return;
      if (typeof target.scrollIntoView === 'function') {
        try {
          target.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } catch (error) {
          void error;
          target.scrollIntoView(true);
        }
      }
      const focusTarget = target.querySelector('.auto-gear-edit')
        || target.querySelector('button')
        || target;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (error) {
          void error;
          focusTarget.focus();
        }
      }
    }
    
    function renderAutoGearRulesList() {
      if (!autoGearRulesList) return;
      if (autoGearEditor && !autoGearEditor.hidden && !autoGearEditorDraft) {
        closeAutoGearEditor();
      }
      autoGearRulesList.innerHTML = '';
      const rules = getAutoGearRules();
      const analysis = getAutoGearRuleCoverageSummary({ rules });
      const scenarioFilter = refreshAutoGearScenarioFilterOptions(rules);
      const rawSearch = typeof autoGearSearchQuery === 'string' ? autoGearSearchQuery : '';
      const normalizedQuery = rawSearch.trim().toLowerCase();
      const filteredRules = rules.filter(rule =>
        autoGearRuleMatchesScenario(rule, scenarioFilter)
        && autoGearRuleMatchesSearch(rule, normalizedQuery)
      );
      const ruleIndexByObject = new Map();
      rules.forEach((rule, index) => {
        if (!rule || typeof rule !== 'object') return;
        ruleIndexByObject.set(rule, index);
      });
      let activeFocus = autoGearSummaryFocus || 'all';
      const focusRuleIds = (() => {
        if (activeFocus === 'duplicates' && analysis?.duplicates?.groups?.length) {
          const ids = new Set();
          analysis.duplicates.groups.forEach(group => {
            (group.rules || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
          });
          return ids.size ? ids : null;
        }
        if (activeFocus === 'conflicts' && analysis?.conflicts?.items?.length) {
          const ids = new Set();
          analysis.conflicts.items.forEach(item => {
            (item.adds || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
            (item.removes || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
          });
          return ids.size ? ids : null;
        }
        if (activeFocus !== 'all' && activeFocus !== 'uncovered') {
          activeFocus = 'all';
        }
        return null;
      })();
      if (autoGearSummaryFocus !== activeFocus) {
        autoGearSummaryFocus = activeFocus;
      }
      const hasFilters = Boolean(normalizedQuery) || scenarioFilter !== 'all' || activeFocus !== 'all';
      const allowSearch = rules.length > 0 || Boolean(rawSearch.trim());
    
      if (autoGearSearchInput) {
        if (autoGearSearchInput.value !== rawSearch) {
          autoGearSearchInput.value = rawSearch;
        }
        autoGearSearchInput.disabled = !allowSearch;
      }
      if (autoGearFilterScenarioSelect) {
        autoGearFilterScenarioSelect.value = autoGearScenarioFilter;
        if (autoGearFilterScenarioSelect.disabled) {
          autoGearFilterScenarioSelect.setAttribute('aria-disabled', 'true');
        } else {
          autoGearFilterScenarioSelect.removeAttribute('aria-disabled');
        }
      }
      if (autoGearFilterClearButton) {
        autoGearFilterClearButton.hidden = !hasFilters;
        autoGearFilterClearButton.disabled = !hasFilters;
      }
      const visibleRules = focusRuleIds
        ? filteredRules.filter(rule => {
          const id = typeof rule?.id === 'string' ? rule.id : '';
          if (id && focusRuleIds.has(id)) return true;
          const index = ruleIndexByObject.get(rule);
          if (typeof index === 'number' && focusRuleIds.has(`index-${index}`)) return true;
          return false;
        })
        : filteredRules;
    
      renderAutoGearRuleSummary(analysis, {
        focus: activeFocus,
        totalRules: rules.length,
        filteredRules: filteredRules.length,
        visibleRules: visibleRules.length,
        hasSearchFilters: Boolean(normalizedQuery) || scenarioFilter !== 'all',
        focusApplied: Boolean(focusRuleIds),
      });
    
      if (!visibleRules.length) {
        const empty = document.createElement('p');
        empty.className = 'auto-gear-empty';
        if (!rules.length && !hasFilters) {
          empty.textContent = texts[currentLang]?.autoGearNoRules
            || texts.en?.autoGearNoRules
            || 'No custom rules yet.';
        } else if (focusRuleIds && filteredRules.length) {
          empty.textContent = texts[currentLang]?.autoGearNoFocusMatches
            || texts.en?.autoGearNoFocusMatches
            || 'No rules match the selected dashboard filter.';
        } else {
          empty.textContent = texts[currentLang]?.autoGearNoMatches
            || texts.en?.autoGearNoMatches
            || 'No rules match your filters.';
        }
        autoGearRulesList.appendChild(empty);
        return;
      }
    
      visibleRules.forEach(rule => {
        const wrapper = document.createElement('div');
        wrapper.className = 'auto-gear-rule';
        wrapper.dataset.ruleId = rule.id;
        const info = document.createElement('div');
        info.className = 'auto-gear-rule-info';
        const title = document.createElement('p');
        title.className = 'auto-gear-rule-title';
        const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios : [];
        const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
        const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle : [];
        const rawViewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension : [];
        const viewfinderDisplayList = rawViewfinderList.map(getViewfinderFallbackLabel);
        const videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution : [];
        const videoDistributionDisplayList = videoDistributionList.map(getVideoDistributionFallbackLabel);
        const deliveryResolutionList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution : [];
        const cameraList = Array.isArray(rule.camera) ? rule.camera : [];
        const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
        const monitorList = Array.isArray(rule.monitor) ? rule.monitor : [];
        const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent : [];
        const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent : [];
        const wirelessList = Array.isArray(rule.wireless) ? rule.wireless : [];
        const motorsList = Array.isArray(rule.motors) ? rule.motors : [];
        const langTexts = texts[currentLang] || texts.en || {};
        const motorsDisplayList = motorsList.map(value => formatAutoGearMotorValue(value, langTexts));
        const controllersList = Array.isArray(rule.controllers) ? rule.controllers : [];
        const distanceList = Array.isArray(rule.distance) ? rule.distance : [];
        const shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
        const shootingDaysDisplayList = shootingCondition
          ? [String(shootingCondition.value)]
          : [];
        const cameraWeightDisplay = cameraWeightCondition
          ? formatAutoGearCameraWeight(cameraWeightCondition, langTexts)
          : '';
        const cameraWeightDisplayList = cameraWeightDisplay ? [cameraWeightDisplay] : [];
        const fallbackCandidates = [
          cameraList,
          cameraWeightDisplayList,
          monitorList,
          crewPresentList,
          crewAbsentList,
          wirelessList,
          motorsDisplayList,
          controllersList,
          distanceList,
          matteboxList,
          cameraHandleList,
          viewfinderDisplayList,
          deliveryResolutionList,
          videoDistributionDisplayList,
          shootingDaysDisplayList,
        ];
        const fallbackSource = scenarioList.length
          ? scenarioList
          : (fallbackCandidates.find(list => Array.isArray(list) && list.length) || []);
        const fallbackTitle = fallbackSource.length ? fallbackSource.join(' + ') : '';
        title.textContent = rule.label || fallbackTitle;
        info.appendChild(title);
        if (rule.always) {
          const alwaysLabel = texts[currentLang]?.autoGearAlwaysMeta
            || texts.en?.autoGearAlwaysMeta
            || 'Always active';
          const alwaysMeta = document.createElement('p');
          alwaysMeta.className = 'auto-gear-rule-meta';
          alwaysMeta.textContent = alwaysLabel;
          info.appendChild(alwaysMeta);
        }
        if (scenarioList.length) {
          const scenarioLabel = texts[currentLang]?.projectFields?.requiredScenarios
            || texts.en?.projectFields?.requiredScenarios
            || 'Required Scenarios';
          const scenarioMeta = document.createElement('p');
          scenarioMeta.className = 'auto-gear-rule-meta';
          scenarioMeta.textContent = `${scenarioLabel}: ${scenarioList.join(' + ')}`;
          info.appendChild(scenarioMeta);
        }
        if (cameraList.length) {
          const cameraLabelText = texts[currentLang]?.autoGearCameraLabel
            || texts.en?.autoGearCameraLabel
            || 'Camera selection';
          const cameraMeta = document.createElement('p');
          cameraMeta.className = 'auto-gear-rule-meta';
          cameraMeta.textContent = `${cameraLabelText}: ${cameraList.join(' + ')}`;
          info.appendChild(cameraMeta);
        }
        if (cameraWeightCondition && cameraWeightDisplay) {
          const weightLabelText = texts[currentLang]?.autoGearCameraWeightLabel
            || texts.en?.autoGearCameraWeightLabel
            || 'Camera weight';
          const weightMeta = document.createElement('p');
          weightMeta.className = 'auto-gear-rule-meta';
          weightMeta.textContent = `${weightLabelText}: ${cameraWeightDisplay}`;
          info.appendChild(weightMeta);
        }
        if (monitorList.length) {
          const monitorLabelText = texts[currentLang]?.autoGearMonitorLabel
            || texts.en?.autoGearMonitorLabel
            || 'Onboard monitors';
          const monitorMeta = document.createElement('p');
          monitorMeta.className = 'auto-gear-rule-meta';
          monitorMeta.textContent = `${monitorLabelText}: ${monitorList.join(' + ')}`;
          info.appendChild(monitorMeta);
        }
        if (crewPresentList.length) {
          const crewPresentLabelText = texts[currentLang]?.autoGearCrewPresentLabel
            || texts.en?.autoGearCrewPresentLabel
            || 'Crew present';
          const crewMeta = document.createElement('p');
          crewMeta.className = 'auto-gear-rule-meta';
          const labels = crewPresentList.map(value => getCrewRoleLabel(value)).filter(Boolean);
          crewMeta.textContent = `${crewPresentLabelText}: ${labels.join(' + ')}`;
          info.appendChild(crewMeta);
        }
        if (crewAbsentList.length) {
          const crewAbsentLabelText = texts[currentLang]?.autoGearCrewAbsentLabel
            || texts.en?.autoGearCrewAbsentLabel
            || 'Crew absent';
          const crewAbsentMeta = document.createElement('p');
          crewAbsentMeta.className = 'auto-gear-rule-meta';
          const labels = crewAbsentList.map(value => getCrewRoleLabel(value)).filter(Boolean);
          crewAbsentMeta.textContent = `${crewAbsentLabelText}: ${labels.join(' + ')}`;
          info.appendChild(crewAbsentMeta);
        }
        if (wirelessList.length) {
          const wirelessLabelText = texts[currentLang]?.autoGearWirelessLabel
            || texts.en?.autoGearWirelessLabel
            || 'Wireless transmitters';
          const wirelessMeta = document.createElement('p');
          wirelessMeta.className = 'auto-gear-rule-meta';
          wirelessMeta.textContent = `${wirelessLabelText}: ${wirelessList.join(' + ')}`;
          info.appendChild(wirelessMeta);
        }
        if (motorsList.length) {
          const motorsLabelText = texts[currentLang]?.autoGearMotorsLabel
            || texts.en?.autoGearMotorsLabel
            || 'FIZ motors';
          const motorsMeta = document.createElement('p');
          motorsMeta.className = 'auto-gear-rule-meta';
          motorsMeta.textContent = `${motorsLabelText}: ${motorsDisplayList.join(' + ')}`;
          info.appendChild(motorsMeta);
        }
        if (controllersList.length) {
          const controllersLabelText = texts[currentLang]?.autoGearControllersLabel
            || texts.en?.autoGearControllersLabel
            || 'FIZ controllers';
          const controllersMeta = document.createElement('p');
          controllersMeta.className = 'auto-gear-rule-meta';
          controllersMeta.textContent = `${controllersLabelText}: ${controllersList.join(' + ')}`;
          info.appendChild(controllersMeta);
        }
        if (distanceList.length) {
          const distanceLabelText = texts[currentLang]?.autoGearDistanceLabel
            || texts.en?.autoGearDistanceLabel
            || 'FIZ distance devices';
          const distanceMeta = document.createElement('p');
          distanceMeta.className = 'auto-gear-rule-meta';
          distanceMeta.textContent = `${distanceLabelText}: ${distanceList.join(' + ')}`;
          info.appendChild(distanceMeta);
        }
        if (shootingCondition) {
          const shootingLabelText = texts[currentLang]?.autoGearShootingDaysLabel
            || texts.en?.autoGearShootingDaysLabel
            || 'Shooting days condition';
          const minimumLabel = texts[currentLang]?.autoGearShootingDaysModeMinimum
            || texts.en?.autoGearShootingDaysModeMinimum
            || 'Minimum';
          const maximumLabel = texts[currentLang]?.autoGearShootingDaysModeMaximum
            || texts.en?.autoGearShootingDaysModeMaximum
            || 'Maximum';
          const everyLabel = texts[currentLang]?.autoGearShootingDaysModeEvery
            || texts.en?.autoGearShootingDaysModeEvery
            || 'Every';
          const shootingMeta = document.createElement('p');
          shootingMeta.className = 'auto-gear-rule-meta';
          let formattedValue = String(shootingCondition.value);
          if (shootingCondition.mode === 'minimum') {
            formattedValue = `≥ ${shootingCondition.value}`;
            shootingMeta.textContent = `${shootingLabelText}: ${minimumLabel} ${formattedValue.replace('≥ ', '')}`;
          } else if (shootingCondition.mode === 'maximum') {
            formattedValue = `≤ ${shootingCondition.value}`;
            shootingMeta.textContent = `${shootingLabelText}: ${maximumLabel} ${formattedValue.replace('≤ ', '')}`;
          } else if (shootingCondition.mode === 'every') {
            shootingMeta.textContent = `${shootingLabelText}: ${everyLabel} ${shootingCondition.value}`;
          } else {
            shootingMeta.textContent = `${shootingLabelText}: ${formattedValue}`;
          }
          info.appendChild(shootingMeta);
        }
        if (matteboxList.length) {
          const matteboxLabelText = texts[currentLang]?.autoGearMatteboxLabel
            || texts.en?.autoGearMatteboxLabel
            || 'Mattebox options';
          const matteboxMeta = document.createElement('p');
          matteboxMeta.className = 'auto-gear-rule-meta';
          matteboxMeta.textContent = `${matteboxLabelText}: ${matteboxList.join(' + ')}`;
          info.appendChild(matteboxMeta);
        }
        if (cameraHandleList.length) {
          const cameraHandleLabelText = texts[currentLang]?.autoGearCameraHandleLabel
            || texts.en?.autoGearCameraHandleLabel
            || 'Camera handles';
          const cameraHandleMeta = document.createElement('p');
          cameraHandleMeta.className = 'auto-gear-rule-meta';
          cameraHandleMeta.textContent = `${cameraHandleLabelText}: ${cameraHandleList.join(' + ')}`;
          info.appendChild(cameraHandleMeta);
        }
        if (rawViewfinderList.length) {
          const viewfinderLabelText = texts[currentLang]?.autoGearViewfinderExtensionLabel
            || texts.en?.autoGearViewfinderExtensionLabel
            || 'Viewfinder extension';
          const viewfinderMeta = document.createElement('p');
          viewfinderMeta.className = 'auto-gear-rule-meta';
          viewfinderMeta.textContent = `${viewfinderLabelText}: ${viewfinderDisplayList.join(' + ')}`;
          info.appendChild(viewfinderMeta);
        }
        if (videoDistributionDisplayList.length) {
          const videoDistLabelText = texts[currentLang]?.autoGearVideoDistributionLabel
            || texts.en?.autoGearVideoDistributionLabel
            || 'Video distribution';
          const videoDistMeta = document.createElement('p');
          videoDistMeta.className = 'auto-gear-rule-meta';
          videoDistMeta.textContent = `${videoDistLabelText}: ${videoDistributionDisplayList.join(' + ')}`;
          info.appendChild(videoDistMeta);
        }
        if (deliveryResolutionList.length) {
          const deliveryLabelText = texts[currentLang]?.autoGearDeliveryResolutionLabel
            || texts.en?.autoGearDeliveryResolutionLabel
            || 'Delivery resolution';
          const deliveryMeta = document.createElement('p');
          deliveryMeta.className = 'auto-gear-rule-meta';
          deliveryMeta.textContent = `${deliveryLabelText}: ${deliveryResolutionList.join(' + ')}`;
          info.appendChild(deliveryMeta);
        }
        const addSummary = formatAutoGearCount(rule.add.length, 'autoGearAddsCountOne', 'autoGearAddsCountOther');
        const removeSummary = formatAutoGearCount(rule.remove.length, 'autoGearRemovalsCountOne', 'autoGearRemovalsCountOther');
        const countsMeta = document.createElement('p');
        countsMeta.className = 'auto-gear-rule-meta';
        countsMeta.textContent = `${addSummary} · ${removeSummary}`;
        info.appendChild(countsMeta);
        if (rule.add.length) {
          const addsLabel = document.createElement('p');
          addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
          addsLabel.textContent = texts[currentLang]?.autoGearAddsListLabel
            || texts.en?.autoGearAddsListLabel
            || 'Adds';
          info.appendChild(addsLabel);
          const addList = document.createElement('ul');
          addList.className = 'auto-gear-rule-items';
          rule.add.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'auto-gear-rule-item';
            listItem.textContent = formatAutoGearItemSummary(item);
            addList.appendChild(listItem);
          });
          info.appendChild(addList);
        }
        wrapper.appendChild(info);
        const actions = document.createElement('div');
        actions.className = 'auto-gear-rule-actions';
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'auto-gear-edit';
        editBtn.dataset.ruleId = rule.id;
        const editLabel = texts[currentLang]?.editBtn || texts.en?.editBtn || 'Edit';
        editBtn.textContent = editLabel;
        editBtn.setAttribute('data-help', editLabel);
        actions.appendChild(editBtn);
        const duplicateBtn = document.createElement('button');
        duplicateBtn.type = 'button';
        duplicateBtn.className = 'auto-gear-duplicate';
        duplicateBtn.dataset.ruleId = rule.id;
        const duplicateLabel = texts[currentLang]?.autoGearDuplicateRule
          || texts.en?.autoGearDuplicateRule
          || 'Duplicate';
        duplicateBtn.textContent = duplicateLabel;
        duplicateBtn.setAttribute('data-help', duplicateLabel);
        actions.appendChild(duplicateBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'auto-gear-delete';
        deleteBtn.dataset.ruleId = rule.id;
        const deleteLabel = texts[currentLang]?.autoGearDeleteRule
          || texts.en?.autoGearDeleteRule
          || 'Delete';
        deleteBtn.textContent = deleteLabel;
        deleteBtn.setAttribute('data-help', deleteLabel);
        actions.appendChild(deleteBtn);
        wrapper.appendChild(actions);
        autoGearRulesList.appendChild(wrapper);
      });
    }
    
    function resetAutoGearDraftInputs(type) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (nameInput) nameInput.value = '';
      if (quantityInput) quantityInput.value = '1';
      if (screenSizeInput) screenSizeInput.value = '';
      if (selectorTypeSelect) selectorTypeSelect.value = 'none';
      if (selectorDefaultInput) selectorDefaultInput.value = '';
      if (selectorDefaultInput && Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset, 'autoGearPreferredDefault')) {
        delete selectorDefaultInput.dataset.autoGearPreferredDefault;
      }
      if (notesInput) notesInput.value = '';
      const selectorTypeValue = selectorTypeSelect ? selectorTypeSelect.value : 'none';
      updateAutoGearMonitorCatalogOptions(selectorTypeValue, selectorDefaultInput);
    }
    
    function updateAutoGearItemButtonState(type) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const button = normalizedType === 'remove' ? autoGearRemoveItemButton : autoGearAddItemButton;
      if (!button) return;
      const langTexts = texts[currentLang] || texts.en || {};
      const isEditing = autoGearEditorActiveItem?.listType === normalizedType;
      const defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
      const defaultLabel = langTexts[defaultKey]
        || texts.en?.[defaultKey]
        || button.textContent
        || '';
      const updateLabel = langTexts.autoGearUpdateItemButton
        || texts.en?.autoGearUpdateItemButton
        || defaultLabel;
      const label = isEditing ? updateLabel : defaultLabel;
      const glyph = isEditing
        ? ICON_GLYPHS.save
        : (normalizedType === 'remove' ? ICON_GLYPHS.minus : ICON_GLYPHS.add);
      setButtonLabelWithIcon(button, label, glyph);
      button.setAttribute('data-help', label);
    }
    
    function updateAutoGearDraftActionState() {
      updateAutoGearItemButtonState('add');
      updateAutoGearItemButtonState('remove');
    }
    
    function getAutoGearDraftList(type) {
      if (!autoGearEditorDraft) return null;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      return normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
    }
    
    function populateAutoGearDraftForm(type, item) {
      if (!item) return;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return;
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (nameInput) nameInput.value = snapshot.name || '';
      if (quantityInput) quantityInput.value = String(normalizeAutoGearQuantity(snapshot.quantity));
      if (categorySelect) {
        const targetCategory = snapshot.category || AUTO_GEAR_CUSTOM_CATEGORY;
        let matched = false;
        Array.from(categorySelect.options || []).forEach(option => {
          if (option && option.value === targetCategory) {
            matched = true;
          }
        });
        categorySelect.value = matched ? targetCategory : AUTO_GEAR_CUSTOM_CATEGORY;
      }
      const activeCategory = categorySelect ? categorySelect.value : snapshot.category;
      const isMonitoring = isAutoGearMonitoringCategory(activeCategory);
      if (screenSizeInput) {
        screenSizeInput.value = isMonitoring ? (snapshot.screenSize || '') : '';
      }
      if (selectorTypeSelect) {
        const selectorValue = isMonitoring ? (snapshot.selectorType || 'none') : 'none';
        selectorTypeSelect.value = selectorValue;
        if (selectorDefaultInput) {
          selectorDefaultInput.dataset.autoGearPreferredDefault = isMonitoring ? (snapshot.selectorDefault || '') : '';
        }
        updateAutoGearMonitorCatalogOptions(selectorValue, selectorDefaultInput);
        if (selectorDefaultInput) {
          selectorDefaultInput.value = isMonitoring ? (snapshot.selectorDefault || '') : '';
        }
      } else if (selectorDefaultInput) {
        selectorDefaultInput.value = isMonitoring ? (snapshot.selectorDefault || '') : '';
      }
      if (notesInput) notesInput.value = snapshot.notes || '';
      syncAutoGearMonitorFieldVisibility();
      if (nameInput) {
        try {
          nameInput.focus({ preventScroll: true });
          if (typeof nameInput.select === 'function') {
            nameInput.select();
          }
        } catch {
          nameInput.focus();
        }
      }
    }
    
    function clearAutoGearDraftItemEdit(type, options = {}) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const { skipRender = false } = options;
      if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType) {
        autoGearEditorActiveItem = null;
      }
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      if (!skipRender) {
        renderAutoGearDraftLists();
      }
    }
    
    function beginAutoGearDraftItemEdit(listType, itemId) {
      if (!autoGearEditorDraft || !itemId) return;
      const normalizedType = listType === 'remove' ? 'remove' : 'add';
      const list = getAutoGearDraftList(normalizedType);
      if (!Array.isArray(list)) return;
      if (
        autoGearEditorActiveItem
        && autoGearEditorActiveItem.listType === normalizedType
        && autoGearEditorActiveItem.itemId === itemId
      ) {
        clearAutoGearDraftItemEdit(normalizedType);
        return;
      }
      const target = list.find(entry => entry && entry.id === itemId);
      if (!target) return;
      autoGearEditorActiveItem = { listType: normalizedType, itemId };
      populateAutoGearDraftForm(normalizedType, target);
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }
    
    function getAutoGearItemIdentityData(item) {
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      const contexts = Array.isArray(normalized.contextNotes)
        ? normalized.contextNotes
            .map(value => (typeof value === 'string' ? value.trim() : ''))
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))
        : [];
      const identity = [
        normalized.name || '',
        normalized.category || '',
        normalized.screenSize || '',
        normalized.selectorType || 'none',
        normalized.selectorDefault || '',
        normalized.selectorEnabled ? '1' : '0',
        normalized.notes || '',
        contexts.join('|'),
      ].join('||');
      return {
        identity,
        item: {
          ...normalized,
          contextNotes: contexts.slice(),
        },
      };
    }
    
    function normalizeAutoGearRuleForPreview(rule) {
      if (!rule || typeof rule !== 'object') return null;
      const add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
      const remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
      if (!add.length && !remove.length) return null;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : '';
      return { id, add, remove };
    }
    
    function aggregateAutoGearRuleItems(rules, options = {}) {
      const allowDraftPreviewRules = Boolean(options.allowDraftPreviewRules);
      const aggregate = new Map();
      const list = Array.isArray(rules) ? rules : [];
      list.forEach(rule => {
        let normalizedRule = normalizeAutoGearRule(rule);
        if (!normalizedRule && allowDraftPreviewRules) {
          normalizedRule = normalizeAutoGearRuleForPreview(rule);
        }
        if (!normalizedRule) return;
        const ruleId = typeof normalizedRule.id === 'string' ? normalizedRule.id : '';
        normalizedRule.add.forEach(entry => {
          const identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          const { identity, item } = identityData;
          const quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          const existing = aggregate.get(identity) || {
            item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set(),
          };
          existing.add += quantity;
          if (ruleId) existing.addRules.add(ruleId);
          aggregate.set(identity, existing);
        });
        normalizedRule.remove.forEach(entry => {
          const identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          const { identity, item } = identityData;
          const quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          const existing = aggregate.get(identity) || {
            item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set(),
          };
          existing.remove += quantity;
          if (ruleId) existing.removeRules.add(ruleId);
          aggregate.set(identity, existing);
        });
      });
      return aggregate;
    }
    
    function computeAutoGearDraftImpactState() {
      if (!autoGearEditorDraft) {
        return { available: false, entries: [], warnings: null };
      }
      const baseRules = getAutoGearRules();
      const draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      let previewRule = draftRule;
      let allowDraftPreviewRules = false;
      if (!previewRule) {
        previewRule = normalizeAutoGearRuleForPreview(autoGearEditorDraft);
        allowDraftPreviewRules = Boolean(previewRule);
      }
      if (!previewRule) {
        return { available: false, entries: [], warnings: null };
      }
      const previewRules = baseRules.slice();
      const matchIndex = previewRules.findIndex(rule => rule && rule.id === previewRule.id);
      if (matchIndex >= 0) {
        previewRules[matchIndex] = previewRule;
      } else {
        previewRules.push(previewRule);
      }
      const baseAggregate = aggregateAutoGearRuleItems(baseRules);
      const previewAggregate = aggregateAutoGearRuleItems(previewRules, { allowDraftPreviewRules });
      const keys = new Set([...baseAggregate.keys(), ...previewAggregate.keys()]);
      const entries = [];
      const warnings = { critical: [], conflict: [], redundant: [] };
      keys.forEach(identity => {
        const baseEntry = baseAggregate.get(identity);
        const previewEntry = previewAggregate.get(identity);
        if (!baseEntry && !previewEntry) return;
        const itemSource = previewEntry?.item || baseEntry?.item;
        if (!itemSource) return;
        const item = cloneAutoGearDraftItem(itemSource);
        const baseNet = baseEntry ? (baseEntry.add - baseEntry.remove) : 0;
        const previewNet = previewEntry ? (previewEntry.add - previewEntry.remove) : 0;
        const delta = previewNet - baseNet;
        const addRulesCount = previewEntry ? previewEntry.addRules.size : 0;
        const removeRulesCount = previewEntry ? previewEntry.removeRules.size : 0;
        const baseAddRulesCount = baseEntry ? baseEntry.addRules.size : 0;
        const conflict = previewEntry ? (previewEntry.add > 0 && previewEntry.remove > 0) : false;
        const stacked = addRulesCount > 1;
        const shouldDisplay = delta !== 0 || stacked || conflict;
        if (!shouldDisplay) return;
        entries.push({
          identity,
          item,
          baseNet,
          previewNet,
          delta,
          addRulesCount,
          removeRulesCount,
          conflict,
          stacked,
        });
        if (baseNet > 0 && previewNet <= 0) {
          warnings.critical.push({ item, baseNet, previewNet });
        }
        if (conflict) {
          warnings.conflict.push({ item, addRulesCount, removeRulesCount });
        }
        const newAddRules = addRulesCount - baseAddRulesCount;
        if (newAddRules > 0 && previewNet <= baseNet) {
          warnings.redundant.push({ item, addRulesCount, baseAddRulesCount });
        }
      });
      entries.sort((a, b) => {
        const deltaDiff = Math.abs(b.delta) - Math.abs(a.delta);
        if (deltaDiff !== 0) return deltaDiff;
        const previewDiff = Math.abs(b.previewNet) - Math.abs(a.previewNet);
        if (previewDiff !== 0) return previewDiff;
        return (a.item.name || '').localeCompare(b.item.name || '');
      });
      return { available: true, entries, warnings };
    }
    
    function formatAutoGearImpactNumber(value) {
      if (!Number.isFinite(value)) return '0';
      const rounded = Math.round(value);
      if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        try {
          return new Intl.NumberFormat().format(rounded);
        } catch {
          // Ignore formatting errors and fall back to raw values
        }
      }
      return String(rounded);
    }
    
    function formatAutoGearImpactSigned(value) {
      if (!Number.isFinite(value) || value === 0) return '0';
      const rounded = Math.round(value);
      const absValue = Math.abs(rounded);
      const formattedAbs = formatAutoGearImpactNumber(absValue);
      return rounded > 0 ? `+${formattedAbs}` : `−${formattedAbs}`;
    }
    
    function formatAutoGearDraftItemLabel(item, quantity) {
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      const normalizedQuantity = Number.isFinite(quantity) && quantity !== 0
        ? Math.abs(Math.round(quantity))
        : normalizeAutoGearQuantity(snapshot.quantity) || 1;
      const summaryItem = {
        ...snapshot,
        quantity: normalizedQuantity > 0 ? normalizedQuantity : 1,
      };
      return formatAutoGearItemSummary(summaryItem, { includeSign: false });
    }
    
    function hasAutoGearDraftWarnings(warnings) {
      if (!warnings) return false;
      return Boolean(
        (Array.isArray(warnings.critical) && warnings.critical.length)
        || (Array.isArray(warnings.conflict) && warnings.conflict.length)
        || (Array.isArray(warnings.redundant) && warnings.redundant.length),
      );
    }
    
    function buildAutoGearDraftWarningMessages(warnings, langTexts) {
      if (!warnings) return [];
      const messages = [];
      const fallback = texts.en || {};
      const addMessage = (key, label) => {
        const template = langTexts[key] || fallback[key];
        if (template) {
          messages.push(formatWithPlaceholders(template, label));
        } else if (label) {
          messages.push(label);
        }
      };
      (Array.isArray(warnings.critical) ? warnings.critical : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.baseNet);
        addMessage('autoGearDraftWarningCritical', label);
      });
      (Array.isArray(warnings.conflict) ? warnings.conflict : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || entry.removeRulesCount || 1);
        addMessage('autoGearDraftWarningConflict', label);
      });
      (Array.isArray(warnings.redundant) ? warnings.redundant : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || 1);
        addMessage('autoGearDraftWarningRedundant', label);
      });
      return Array.from(new Set(messages));
    }
    
    function renderAutoGearDraftImpact() {
      if (!autoGearDraftImpactList) return;
      const langTexts = texts[currentLang] || texts.en || {};
      autoGearDraftImpactList.innerHTML = '';
      if (autoGearDraftWarningList) {
        autoGearDraftWarningList.innerHTML = '';
      }
      autoGearDraftPendingWarnings = null;
    
      if (!autoGearEditorDraft) {
        const message = langTexts.autoGearDraftImpactUnavailable
          || texts.en?.autoGearDraftImpactUnavailable
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }
    
      const impact = computeAutoGearDraftImpactState();
      autoGearDraftPendingWarnings = impact.available ? impact.warnings : null;
    
      if (!impact.available) {
        const message = langTexts.autoGearDraftImpactUnavailable
          || texts.en?.autoGearDraftImpactUnavailable
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }
    
      if (!impact.entries.length) {
        const message = langTexts.autoGearDraftImpactEmpty
          || texts.en?.autoGearDraftImpactEmpty
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
      } else {
        const totalsTemplate = langTexts.autoGearDraftImpactTotals
          || texts.en?.autoGearDraftImpactTotals
          || 'Current total: %s → After save: %s';
        const changeTemplate = langTexts.autoGearDraftImpactChange
          || texts.en?.autoGearDraftImpactChange
          || 'Change: %s';
        impact.entries.forEach(entry => {
          const li = document.createElement('li');
          li.className = 'auto-gear-impact-item';
          if (entry.delta > 0) {
            li.classList.add('auto-gear-impact-positive');
          } else if (entry.delta < 0) {
            li.classList.add('auto-gear-impact-negative');
          }
          const summary = document.createElement('div');
          summary.className = 'auto-gear-impact-summary';
          summary.textContent = formatAutoGearDraftItemLabel(entry.item, entry.previewNet || entry.baseNet || entry.delta);
          li.appendChild(summary);
          const totals = document.createElement('div');
          totals.className = 'auto-gear-impact-totals';
          totals.textContent = formatWithPlaceholders(
            totalsTemplate,
            formatAutoGearImpactNumber(entry.baseNet),
            formatAutoGearImpactNumber(entry.previewNet),
          );
          li.appendChild(totals);
          const delta = document.createElement('div');
          delta.className = 'auto-gear-impact-delta';
          delta.textContent = formatWithPlaceholders(changeTemplate, formatAutoGearImpactSigned(entry.delta));
          li.appendChild(delta);
          const metaTexts = [];
          if (entry.stacked) {
            const stackKey = entry.addRulesCount === 1
              ? 'autoGearDraftImpactStackedOne'
              : 'autoGearDraftImpactStackedOther';
            const stackTemplate = langTexts[stackKey] || texts.en?.[stackKey];
            if (stackTemplate) {
              metaTexts.push(formatWithPlaceholders(stackTemplate, formatAutoGearImpactNumber(entry.addRulesCount)));
            }
          }
          if (entry.conflict && entry.removeRulesCount > 0) {
            const conflictKey = entry.removeRulesCount === 1
              ? 'autoGearDraftImpactConflictOne'
              : 'autoGearDraftImpactConflictOther';
            const conflictTemplate = langTexts[conflictKey] || texts.en?.[conflictKey];
            if (conflictTemplate) {
              metaTexts.push(formatWithPlaceholders(
                conflictTemplate,
                formatAutoGearImpactNumber(entry.removeRulesCount),
              ));
            }
          }
          if (metaTexts.length) {
            const meta = document.createElement('div');
            meta.className = 'auto-gear-impact-meta';
            meta.textContent = metaTexts.join(' ');
            li.appendChild(meta);
          }
          autoGearDraftImpactList.appendChild(li);
        });
      }
    
      if (autoGearDraftWarningContainer) {
        const warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
        if (warningMessages.length) {
          autoGearDraftWarningContainer.hidden = false;
          if (autoGearDraftWarningList) {
            warningMessages.forEach(message => {
              const item = document.createElement('li');
              item.className = 'auto-gear-impact-warning-item';
              item.textContent = message;
              autoGearDraftWarningList.appendChild(item);
            });
          }
        } else {
          autoGearDraftWarningContainer.hidden = true;
        }
      }
    }
    
    function renderAutoGearDraftLists() {
      updateAutoGearDraftActionState();
      if (!autoGearEditorDraft) {
        if (autoGearAddList) autoGearAddList.innerHTML = '';
        if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
        renderAutoGearDraftImpact();
        return;
      }
      const renderList = (element, items, type) => {
        if (!element) return;
        element.innerHTML = '';
        if (!items.length) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-empty';
          empty.textContent = texts[currentLang]?.autoGearEmptyList
            || texts.en?.autoGearEmptyList
            || 'No items yet.';
          element.appendChild(empty);
          return;
        }
        items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'auto-gear-item';
          if (
            autoGearEditorActiveItem
            && autoGearEditorActiveItem.listType === type
            && autoGearEditorActiveItem.itemId === item.id
          ) {
            li.classList.add('auto-gear-item-editing');
          }
          const span = document.createElement('span');
          span.textContent = formatAutoGearItemSummary(item, { includeSign: true, listType: type });
          li.appendChild(span);
          const actions = document.createElement('span');
          actions.className = 'auto-gear-item-actions';
          const editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className = 'auto-gear-edit-entry';
          editBtn.dataset.listType = type;
          editBtn.dataset.itemId = item.id;
          const editLabel = texts[currentLang]?.autoGearListEdit
            || texts.en?.autoGearListEdit
            || 'Edit';
          editBtn.textContent = editLabel;
          editBtn.setAttribute('data-help', editLabel);
          editBtn.setAttribute(
            'aria-pressed',
            autoGearEditorActiveItem && autoGearEditorActiveItem.listType === type && autoGearEditorActiveItem.itemId === item.id
              ? 'true'
              : 'false'
          );
          actions.appendChild(editBtn);
          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'auto-gear-remove-entry';
          removeBtn.dataset.listType = type;
          removeBtn.dataset.itemId = item.id;
          const removeLabel = texts[currentLang]?.autoGearListRemove
            || texts.en?.autoGearListRemove
            || 'Remove';
          removeBtn.textContent = removeLabel;
          removeBtn.setAttribute('data-help', removeLabel);
          actions.appendChild(removeBtn);
          li.appendChild(actions);
          element.appendChild(li);
        });
      };
      renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
      renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
      renderAutoGearDraftImpact();
    }
    
    function openAutoGearEditor(ruleId, options = {}) {
      if (!autoGearEditor) return;
      const { initialDraft, highlightLabel = false } = options;
      const rules = getAutoGearRules();
      const source = initialDraft
        ? initialDraft
        : (ruleId ? rules.find(rule => rule.id === ruleId) : null);
      autoGearEditorDraft = createAutoGearDraft(source);
      autoGearEditorActiveItem = null;
      autoGearEditor.hidden = false;
      autoGearEditor.setAttribute('aria-hidden', 'false');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'true');
      }
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.value = autoGearEditorDraft.label || '';
      }
      initializeAutoGearConditionsFromDraft();
      populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearEditorDraft.add[0]?.category || '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearEditorDraft.remove[0]?.category || '');
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.focus();
        if (highlightLabel && typeof autoGearRuleNameInput.select === 'function' && autoGearRuleNameInput.value) {
          try {
            autoGearRuleNameInput.select();
          } catch {
            // Ignore selection errors (for older browsers)
          }
        }
      }
    }
    
    function closeAutoGearEditor() {
      if (!autoGearEditor) return;
      autoGearEditor.hidden = true;
      autoGearEditor.setAttribute('aria-hidden', 'true');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'false');
      }
      autoGearEditorDraft = null;
      autoGearEditorActiveItem = null;
      if (autoGearRuleNameInput) autoGearRuleNameInput.value = '';
      clearAllAutoGearConditions();
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }
    
    function addAutoGearDraftItem(type) {
      if (!autoGearEditorDraft) return;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      if (!nameInput || !categorySelect || !quantityInput) return;
      const parsedNames = parseAutoGearDraftNames(nameInput.value);
      if (!parsedNames.length) {
        const message = texts[currentLang]?.autoGearItemNameRequired
          || texts.en?.autoGearItemNameRequired
          || 'Enter an item name first.';
        window.alert(message);
        return;
      }
      const baseValues = {
        category: categorySelect.value || '',
        quantity: normalizeAutoGearQuantity(quantityInput.value),
        screenSize: screenSizeInput ? screenSizeInput.value : '',
        selectorType: selectorTypeSelect ? selectorTypeSelect.value : 'none',
        selectorDefault: selectorDefaultInput ? selectorDefaultInput.value : '',
        notes: notesInput ? notesInput.value : '',
      };
      if (isAutoGearMonitoringCategory(baseValues.category)) {
        baseValues.selectorEnabled = baseValues.selectorType !== 'none';
      } else {
        baseValues.screenSize = '';
        baseValues.selectorType = 'none';
        baseValues.selectorDefault = '';
        baseValues.selectorEnabled = false;
      }
      const editingTarget = autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType
        ? autoGearEditorActiveItem
        : null;
      if (editingTarget) {
        if (parsedNames.length !== 1) {
          const warning = texts[currentLang]?.autoGearEditSingleItemWarning
            || texts.en?.autoGearEditSingleItemWarning
            || 'Edit one item at a time.';
          window.alert(warning);
          return;
        }
        const entry = parsedNames[0];
        const quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity')
          ? normalizeAutoGearQuantity(entry.quantity)
          : baseValues.quantity;
        const list = getAutoGearDraftList(normalizedType);
        if (!Array.isArray(list)) return;
        const index = list.findIndex(item => item && item.id === editingTarget.itemId);
        if (index < 0) {
          clearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
          renderAutoGearDraftLists();
          updateAutoGearCatalogOptions();
          return;
        }
        const itemData = normalizeAutoGearItem({
          id: editingTarget.itemId,
          name: entry.name,
          category: baseValues.category,
          quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes,
        });
        if (itemData) {
          list[index] = itemData;
        } else {
          list.splice(index, 1);
        }
        clearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
        renderAutoGearDraftLists();
        updateAutoGearCatalogOptions();
        return;
      }
      parsedNames.forEach(entry => {
        const quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity')
          ? normalizeAutoGearQuantity(entry.quantity)
          : baseValues.quantity;
        const targetType = entry.listType || (isAdd ? 'add' : 'remove');
        const targetList = targetType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        const itemData = normalizeAutoGearItem({
          id: generateAutoGearId('item'),
          name: entry.name,
          category: baseValues.category,
          quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes,
        });
        if (itemData) {
          targetList.push(itemData);
        }
      });
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
    }
    
    function saveAutoGearRuleFromEditor() {
      if (!autoGearEditorDraft) return;
      const scenarios = isAutoGearConditionActive('scenarios') && autoGearScenariosSelect
        ? Array.from(autoGearScenariosSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(Boolean)
        : [];
        const rawScenarioMode = autoGearScenarioModeSelectRef
          ? normalizeAutoGearScenarioLogic(autoGearScenarioModeSelectRef.value)
          : 'all';
      const multiplierInputValue = autoGearScenarioFactorInput ? autoGearScenarioFactorInput.value : '1';
      const normalizedMultiplier = normalizeAutoGearScenarioMultiplier(multiplierInputValue);
      let scenarioMode = rawScenarioMode;
      if (scenarioMode === 'multiplier' && scenarios.length < 2) {
        scenarioMode = 'all';
      }
      const baseSelection = autoGearScenarioBaseSelect ? autoGearScenarioBaseSelect.value : '';
      const scenarioBase = scenarioMode === 'multiplier'
        ? normalizeAutoGearScenarioPrimary(baseSelection)
        : '';
      if (scenarioMode === 'multiplier' && scenarioBase && !scenarios.includes(scenarioBase)) {
        scenarios.push(scenarioBase);
      }
      const matteboxSelections = isAutoGearConditionActive('mattebox') && autoGearMatteboxSelect
        ? Array.from(autoGearMatteboxSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(Boolean)
        : [];
      const cameraHandleSelections = isAutoGearConditionActive('cameraHandle') && autoGearCameraHandleSelect
        ? Array.from(autoGearCameraHandleSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(Boolean)
        : [];
      const viewfinderSelections = isAutoGearConditionActive('viewfinderExtension') && autoGearViewfinderExtensionSelect
        ? Array.from(autoGearViewfinderExtensionSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const deliveryResolutionSelections = isAutoGearConditionActive('deliveryResolution') && autoGearDeliveryResolutionSelect
        ? Array.from(autoGearDeliveryResolutionSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      let videoDistributionSelections = isAutoGearConditionActive('videoDistribution') && autoGearVideoDistributionSelect
        ? Array.from(autoGearVideoDistributionSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(Boolean)
        : [];
      if (videoDistributionSelections.includes('__none__') && videoDistributionSelections.length > 1) {
        videoDistributionSelections = videoDistributionSelections.filter(value => value !== '__none__');
      }
      const cameraSelections = isAutoGearConditionActive('camera') && autoGearCameraSelect
        ? Array.from(autoGearCameraSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const cameraWeightCondition = (() => {
        if (!isAutoGearConditionActive('cameraWeight')) return null;
        const operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
        const thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
        const normalizedCondition = normalizeAutoGearCameraWeightCondition({ operator: operatorValue, value: thresholdValue });
        if (normalizedCondition) return normalizedCondition;
        const normalizedOperator = normalizeAutoGearWeightOperator(operatorValue);
        return normalizedOperator ? { operator: normalizedOperator, value: null } : null;
      })();
      const monitorSelections = isAutoGearConditionActive('monitor') && autoGearMonitorSelect
        ? Array.from(autoGearMonitorSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const crewPresentSelections = isAutoGearConditionActive('crewPresent') && autoGearCrewPresentSelect
        ? Array.from(autoGearCrewPresentSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const crewAbsentSelections = isAutoGearConditionActive('crewAbsent') && autoGearCrewAbsentSelect
        ? Array.from(autoGearCrewAbsentSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const wirelessSelections = isAutoGearConditionActive('wireless') && autoGearWirelessSelect
        ? Array.from(autoGearWirelessSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const motorSelections = isAutoGearConditionActive('motors') && autoGearMotorsSelect
        ? Array.from(autoGearMotorsSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const controllerSelections = isAutoGearConditionActive('controllers') && autoGearControllersSelect
        ? Array.from(autoGearControllersSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const distanceSelections = isAutoGearConditionActive('distance') && autoGearDistanceSelect
        ? Array.from(autoGearDistanceSelect.selectedOptions || [])
            .map(option => option.value)
            .filter(value => typeof value === 'string' && value.trim())
        : [];
      const draftConditionLogic = {};
      if (scenarioMode !== 'all') {
        draftConditionLogic.scenarios = scenarioMode;
      }
      const matteboxLogic = autoGearMatteboxModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMatteboxModeSelect.value)
        : 'all';
      const cameraHandleLogic = autoGearCameraHandleModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCameraHandleModeSelect.value)
        : 'all';
      const viewfinderLogic = autoGearViewfinderExtensionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearViewfinderExtensionModeSelect.value)
        : 'all';
      const deliveryLogic = autoGearDeliveryResolutionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearDeliveryResolutionModeSelect.value)
        : 'all';
      const videoDistributionLogic = autoGearVideoDistributionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearVideoDistributionModeSelect.value)
        : 'all';
      const cameraLogic = autoGearCameraModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCameraModeSelect.value)
        : 'all';
      const monitorLogic = autoGearMonitorModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMonitorModeSelect.value)
        : 'all';
      const crewPresentLogic = autoGearCrewPresentModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCrewPresentModeSelect.value)
        : 'all';
      const crewAbsentLogic = autoGearCrewAbsentModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCrewAbsentModeSelect.value)
        : 'all';
      const wirelessLogic = autoGearWirelessModeSelect
        ? normalizeAutoGearConditionLogic(autoGearWirelessModeSelect.value)
        : 'all';
      const motorsLogic = autoGearMotorsModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMotorsModeSelect.value)
        : 'all';
      const controllersLogic = autoGearControllersModeSelect
        ? normalizeAutoGearConditionLogic(autoGearControllersModeSelect.value)
        : 'all';
      const distanceLogic = autoGearDistanceModeSelect
        ? normalizeAutoGearConditionLogic(autoGearDistanceModeSelect.value)
        : 'all';
      if (matteboxLogic !== 'all') draftConditionLogic.mattebox = matteboxLogic;
      if (cameraHandleLogic !== 'all') draftConditionLogic.cameraHandle = cameraHandleLogic;
      if (viewfinderLogic !== 'all') draftConditionLogic.viewfinderExtension = viewfinderLogic;
      if (deliveryLogic !== 'all') draftConditionLogic.deliveryResolution = deliveryLogic;
      if (videoDistributionLogic !== 'all') draftConditionLogic.videoDistribution = videoDistributionLogic;
      if (cameraLogic !== 'all') draftConditionLogic.camera = cameraLogic;
      if (monitorLogic !== 'all') draftConditionLogic.monitor = monitorLogic;
      if (crewPresentLogic !== 'all') draftConditionLogic.crewPresent = crewPresentLogic;
      if (crewAbsentLogic !== 'all') draftConditionLogic.crewAbsent = crewAbsentLogic;
      if (wirelessLogic !== 'all') draftConditionLogic.wireless = wirelessLogic;
      if (motorsLogic !== 'all') draftConditionLogic.motors = motorsLogic;
      if (controllersLogic !== 'all') draftConditionLogic.controllers = controllersLogic;
      if (distanceLogic !== 'all') draftConditionLogic.distance = distanceLogic;
      const shootingDaysRequirement = (() => {
        if (!isAutoGearConditionActive('shootingDays')) return null;
        if (!autoGearShootingDaysInput) return null;
        const modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
        const rawCondition = { mode: modeValue, value: autoGearShootingDaysInput.value };
        return normalizeAutoGearShootingDaysCondition(rawCondition);
      })();
      const alwaysActive = isAutoGearConditionActive('always');
      if (
        !alwaysActive
        && !scenarios.length
        && !matteboxSelections.length
        && !cameraHandleSelections.length
        && !viewfinderSelections.length
        && !deliveryResolutionSelections.length
        && !videoDistributionSelections.length
        && !cameraSelections.length
        && !cameraWeightCondition
        && !monitorSelections.length
        && !crewPresentSelections.length
        && !crewAbsentSelections.length
        && !wirelessSelections.length
        && !motorSelections.length
        && !controllerSelections.length
        && !distanceSelections.length
        && !shootingDaysRequirement
      ) {
        const message = texts[currentLang]?.autoGearRuleConditionRequired
          || texts.en?.autoGearRuleConditionRequired
          || texts[currentLang]?.autoGearRuleScenarioRequired
          || texts.en?.autoGearRuleScenarioRequired
          || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension, delivery resolution or video distribution before saving.';
        window.alert(message);
        return;
      }
      if (
        isAutoGearConditionActive('cameraWeight')
        && (!cameraWeightCondition || !Number.isFinite(cameraWeightCondition.value))
      ) {
        const message = texts[currentLang]?.autoGearCameraWeightValueRequired
          || texts.en?.autoGearCameraWeightValueRequired
          || 'Enter a camera weight threshold before saving.';
        window.alert(message);
        if (autoGearCameraWeightValueInput) {
          try {
            autoGearCameraWeightValueInput.focus({ preventScroll: true });
          } catch {
            autoGearCameraWeightValueInput.focus();
          }
        }
        return;
      }
      if (autoGearRuleNameInput) {
        autoGearEditorDraft.label = autoGearRuleNameInput.value.trim();
      }
      autoGearEditorDraft.always = alwaysActive ? ['always'] : [];
      autoGearEditorDraft.scenarioLogic = scenarioMode;
      autoGearEditorDraft.scenarioMultiplier = scenarioMode === 'multiplier' ? normalizedMultiplier : 1;
      autoGearEditorDraft.scenarioPrimary = scenarioMode === 'multiplier' ? scenarioBase : '';
      autoGearEditorDraft.scenarios = scenarios;
      autoGearEditorDraft.mattebox = matteboxSelections;
      autoGearEditorDraft.cameraHandle = cameraHandleSelections;
      autoGearEditorDraft.viewfinderExtension = viewfinderSelections;
      autoGearEditorDraft.deliveryResolution = deliveryResolutionSelections;
      autoGearEditorDraft.videoDistribution = videoDistributionSelections;
      autoGearEditorDraft.camera = cameraSelections;
      autoGearEditorDraft.cameraWeight = cameraWeightCondition ? { ...cameraWeightCondition } : null;
      autoGearEditorDraft.monitor = monitorSelections;
      autoGearEditorDraft.crewPresent = crewPresentSelections;
      autoGearEditorDraft.crewAbsent = crewAbsentSelections;
      autoGearEditorDraft.wireless = wirelessSelections;
      autoGearEditorDraft.motors = motorSelections;
      autoGearEditorDraft.controllers = controllerSelections;
      autoGearEditorDraft.distance = distanceSelections;
      autoGearEditorDraft.matteboxLogic = matteboxLogic;
      autoGearEditorDraft.cameraHandleLogic = cameraHandleLogic;
      autoGearEditorDraft.viewfinderExtensionLogic = viewfinderLogic;
      autoGearEditorDraft.deliveryResolutionLogic = deliveryLogic;
      autoGearEditorDraft.videoDistributionLogic = videoDistributionLogic;
      autoGearEditorDraft.cameraLogic = cameraLogic;
      autoGearEditorDraft.monitorLogic = monitorLogic;
      autoGearEditorDraft.crewPresentLogic = crewPresentLogic;
      autoGearEditorDraft.crewAbsentLogic = crewAbsentLogic;
      autoGearEditorDraft.wirelessLogic = wirelessLogic;
      autoGearEditorDraft.motorsLogic = motorsLogic;
      autoGearEditorDraft.controllersLogic = controllersLogic;
      autoGearEditorDraft.distanceLogic = distanceLogic;
      autoGearEditorDraft.conditionLogic = draftConditionLogic;
      autoGearEditorDraft.shootingDays = shootingDaysRequirement;
      if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
        const message = texts[currentLang]?.autoGearRuleNeedsItems
          || texts.en?.autoGearRuleNeedsItems
          || 'Add at least one item to add or remove.';
        window.alert(message);
        return;
      }
      renderAutoGearDraftImpact();
      const draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      if (!draftRule) return;
      const langTexts = texts[currentLang] || texts.en || {};
      const warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
      if (warningMessages.length && typeof window.confirm === 'function') {
        const confirmBase = langTexts.autoGearDraftWarningConfirm
          || texts.en?.autoGearDraftWarningConfirm
          || 'Save anyway? Review the impact warnings below before confirming.';
        const details = warningMessages.map(message => `• ${message}`).join('\n');
        const confirmMessage = `${confirmBase}\n\n${details}`;
        if (!window.confirm(confirmMessage)) {
          return;
        }
      }
      const rules = getAutoGearRules();
      const index = rules.findIndex(rule => rule.id === draftRule.id);
      if (index >= 0) {
        rules[index] = draftRule;
      } else {
        rules.push(draftRule);
      }
      setAutoGearRules(rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      const successMessage = texts[currentLang]?.autoGearRuleSaved
        || texts.en?.autoGearRuleSaved
        || 'Automatic gear rule saved.';
      showNotification('success', successMessage);
      closeAutoGearEditor();
    }
    
    function duplicateAutoGearRule(ruleId) {
      if (!ruleId) return;
      const rules = getAutoGearRules();
      const original = rules.find(rule => rule && rule.id === ruleId);
      if (!original) return;
    
      const langTexts = texts[currentLang] || texts.en || {};
      const suffixBase = typeof langTexts.autoGearDuplicateSuffix === 'string'
        ? langTexts.autoGearDuplicateSuffix.trim()
        : '';
      const fallbackSuffix = typeof texts.en?.autoGearDuplicateSuffix === 'string'
        ? texts.en.autoGearDuplicateSuffix.trim()
        : '';
      const suffix = suffixBase || fallbackSuffix || 'Copy';
      const baseLabel = typeof original.label === 'string' ? original.label.trim() : '';
      const existingLabels = new Set(
        rules
          .map(rule => (typeof rule?.label === 'string' ? rule.label.trim().toLowerCase() : ''))
          .filter(Boolean)
      );
    
      const formatCandidate = index => {
        if (baseLabel) {
          return index === 1
            ? `${baseLabel} (${suffix})`
            : `${baseLabel} (${suffix} ${index})`;
        }
        return index === 1 ? suffix : `${suffix} ${index}`;
      };
    
      let attempt = 1;
      let labelCandidate = formatCandidate(attempt);
      while (existingLabels.has(labelCandidate.trim().toLowerCase())) {
        attempt += 1;
        labelCandidate = formatCandidate(attempt);
      }
    
      const duplicateRule = {
        id: generateAutoGearId('rule'),
        label: labelCandidate,
        scenarioLogic: normalizeAutoGearScenarioLogic(original.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(original.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(original.scenarioMultiplier),
        scenarios: Array.isArray(original.scenarios) ? original.scenarios.slice() : [],
        mattebox: Array.isArray(original.mattebox) ? original.mattebox.slice() : [],
        cameraHandle: Array.isArray(original.cameraHandle) ? original.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(original.viewfinderExtension)
          ? original.viewfinderExtension.slice()
          : [],
        videoDistribution: Array.isArray(original.videoDistribution)
          ? original.videoDistribution.slice()
          : [],
        camera: Array.isArray(original.camera) ? original.camera.slice() : [],
        cameraWeight: normalizeAutoGearCameraWeightCondition(original.cameraWeight),
        monitor: Array.isArray(original.monitor) ? original.monitor.slice() : [],
        wireless: Array.isArray(original.wireless) ? original.wireless.slice() : [],
        motors: Array.isArray(original.motors) ? original.motors.slice() : [],
        controllers: Array.isArray(original.controllers) ? original.controllers.slice() : [],
        distance: Array.isArray(original.distance) ? original.distance.slice() : [],
        shootingDays: normalizeAutoGearShootingDaysCondition(original.shootingDays),
        add: Array.isArray(original.add)
          ? original.add.map(item => ({ ...item, id: generateAutoGearId('item') }))
          : [],
        remove: Array.isArray(original.remove)
          ? original.remove.map(item => ({ ...item, id: generateAutoGearId('item') }))
          : [],
      };
    
      openAutoGearEditor(null, { initialDraft: duplicateRule, highlightLabel: true });
    }
    
    function deleteAutoGearRule(ruleId) {
      const rules = getAutoGearRules();
      const index = rules.findIndex(rule => rule.id === ruleId);
      if (index < 0) return;
      const confirmation = texts[currentLang]?.autoGearDeleteConfirm
        || texts.en?.autoGearDeleteConfirm
        || 'Delete this rule?';
      if (!window.confirm(confirmation)) return;
      const backupName = ensureAutoBackupBeforeDeletion('delete automatic gear rule');
      if (!backupName) return;
      rules.splice(index, 1);
      setAutoGearRules(rules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      if (autoGearEditorDraft && autoGearEditorDraft.id === ruleId) {
        closeAutoGearEditor();
      }
    }
    
    function normalizeAutoGearPayloadMetadata(candidate) {
      if (!candidate || typeof candidate !== 'object') return null;
      const metadata = {};
    
      const assignIfString = (key, value) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
          metadata[key] = trimmed;
        }
      };
    
      assignIfString('type', candidate.type);
      assignIfString('version', candidate.version);
    
      const timestampFields = [
        ['createdAt', 'createdAt'],
        ['created_at', 'createdAt'],
        ['created', 'createdAt'],
        ['timestamp', 'timestamp'],
        ['exportedAt', 'exportedAt'],
        ['exported_at', 'exportedAt'],
        ['savedAt', 'savedAt'],
        ['saved_at', 'savedAt'],
        ['updatedAt', 'updatedAt'],
        ['updated_at', 'updatedAt'],
        ['modifiedAt', 'updatedAt'],
        ['modified_at', 'updatedAt'],
      ];
    
      timestampFields.forEach(([prop, target]) => {
        if (metadata[target]) return;
        assignIfString(target, candidate[prop]);
      });
    
      if (!metadata.timestamp) {
        const orderedKeys = ['createdAt', 'timestamp', 'exportedAt', 'savedAt', 'updatedAt'];
        for (let i = 0; i < orderedKeys.length; i += 1) {
          const key = orderedKeys[i];
          if (metadata[key]) {
            metadata.timestamp = metadata[key];
            metadata.timestampSource = key;
            break;
          }
        }
      }
    
      if (metadata.timestamp && !metadata.timestampSource) {
        metadata.timestampSource = 'timestamp';
      }
    
      return Object.keys(metadata).length ? metadata : null;
    }
    
    function collectAutoGearPayloadMetadata(...sources) {
      const queue = [];
      const visited = new Set();
      const metadata = {};
    
      const enqueue = value => {
        if (!value || typeof value !== 'object') return;
        if (visited.has(value)) return;
        visited.add(value);
        queue.push(value);
      };
    
      sources.forEach(source => enqueue(source));
    
      while (queue.length) {
        const candidate = queue.shift();
        const normalized = normalizeAutoGearPayloadMetadata(candidate);
        if (normalized) {
          ['type', 'version', 'createdAt', 'exportedAt', 'savedAt', 'updatedAt', 'timestamp', 'timestampSource'].forEach(key => {
            if (!normalized[key]) return;
            if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
              metadata[key] = normalized[key];
            }
          });
        }
    
        if (candidate.meta && typeof candidate.meta === 'object') {
          enqueue(candidate.meta);
        }
        if (candidate.metadata && typeof candidate.metadata === 'object') {
          enqueue(candidate.metadata);
        }
      }
    
      return Object.keys(metadata).length ? metadata : null;
    }
    
    function parseAutoGearImportPayload(data) {
      const extractMonitorDefaults = source => {
        if (!source || typeof source !== 'object') return null;
        if (source.monitorDefaults && typeof source.monitorDefaults === 'object') {
          return source.monitorDefaults;
        }
        if (source.autoGearMonitorDefaults && typeof source.autoGearMonitorDefaults === 'object') {
          return source.autoGearMonitorDefaults;
        }
        return null;
      };
    
      const resolveValue = value => {
        if (typeof value !== 'string') return value;
        const trimmed = value.trim();
        if (!trimmed) return value;
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed === value) return parsed;
          return resolveValue(parsed);
        } catch {
          return value;
        }
      };
    
      const visited = new Set();
      const queue = [];
    
      const enqueue = (rawValue, parent, root, key) => {
        const value = resolveValue(rawValue);
        if (!value || typeof value !== 'object') {
          return;
        }
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
        queue.push({
          value,
          parent: parent && typeof parent === 'object' ? parent : null,
          root: root && typeof root === 'object' ? root : null,
          key: typeof key === 'string' ? key : '',
        });
      };
    
      const initialValue = resolveValue(data);
      if (Array.isArray(initialValue)) {
        const metadata = collectAutoGearPayloadMetadata(initialValue);
        return { rules: initialValue, monitorDefaults: null, metadata };
      }
      if (!initialValue || typeof initialValue !== 'object') {
        return null;
      }
    
      const initialRoot = !Array.isArray(initialValue) ? initialValue : null;
      enqueue(initialValue, null, initialRoot, '');
    
      while (queue.length) {
        const { value, parent, root, key } = queue.shift();
        const baseRoot = root || (value && typeof value === 'object' && !Array.isArray(value) ? value : null);
    
        if (Array.isArray(value)) {
          const treatAsRules = !parent || key === 'rules' || key === 'autoGearRules';
          if (treatAsRules) {
            const monitorDefaults = (parent ? extractMonitorDefaults(parent) : null)
              || (root ? extractMonitorDefaults(root) : null)
              || null;
            const metadata = collectAutoGearPayloadMetadata(
              parent,
              value,
              root,
              baseRoot,
            );
            return { rules: value, monitorDefaults, metadata };
          }
          value.forEach(item => {
            if (item && typeof item === 'object') {
              enqueue(item, parent, baseRoot, '');
            }
          });
          continue;
        }
    
        if (!value || typeof value !== 'object') {
          continue;
        }
    
        const monitorDefaultsFromValue = extractMonitorDefaults(value);
        const monitorDefaultsFromParent = parent ? extractMonitorDefaults(parent) : null;
        const monitorDefaultsFromRoot = root ? extractMonitorDefaults(root) : null;
        const fallbackDefaults = monitorDefaultsFromValue
          || monitorDefaultsFromParent
          || monitorDefaultsFromRoot
          || null;
    
        const rawAutoGearRules = Object.prototype.hasOwnProperty.call(value, 'autoGearRules')
          ? resolveValue(value.autoGearRules)
          : null;
        if (Array.isArray(rawAutoGearRules)) {
          const metadata = collectAutoGearPayloadMetadata(
            value,
            parent,
            root,
            baseRoot,
          );
          return { rules: rawAutoGearRules, monitorDefaults: fallbackDefaults, metadata };
        }
    
        const rawRules = Object.prototype.hasOwnProperty.call(value, 'rules')
          ? resolveValue(value.rules)
          : null;
        if (Array.isArray(rawRules)) {
          const metadata = collectAutoGearPayloadMetadata(
            value,
            parent,
            root,
            baseRoot,
          );
          return { rules: rawRules, monitorDefaults: fallbackDefaults, metadata };
        }
        if (rawRules && typeof rawRules === 'object') {
          const nestedAutoGearRules = Object.prototype.hasOwnProperty.call(rawRules, 'autoGearRules')
            ? resolveValue(rawRules.autoGearRules)
            : null;
          if (Array.isArray(nestedAutoGearRules)) {
            const nestedDefaults = extractMonitorDefaults(rawRules) || fallbackDefaults;
            const metadata = collectAutoGearPayloadMetadata(
              rawRules,
              value,
              parent,
              root,
              baseRoot,
            );
            return {
              rules: nestedAutoGearRules,
              monitorDefaults: nestedDefaults,
              metadata,
            };
          }
        }
    
        const containerEntries = [
          { value: value.data, key: 'data' },
          { value: value.payload, key: 'payload' },
          { value: value.bundle, key: 'bundle' },
          { value: value.project, key: 'project' },
          { value: value.config, key: 'config' },
          { value: value.settings, key: 'settings' },
          { value: value.content, key: 'content' },
          { value: value.body, key: 'body' },
          { value: value.autoGear, key: 'autoGear' },
          { value: value.rules, key: 'rules' },
          { value: value.autoGearRules, key: 'autoGearRules' },
          { value: value.meta, key: 'meta' },
          { value: value.metadata, key: 'metadata' },
        ];
        containerEntries.forEach(entry => {
          if (!entry.value) return;
          enqueue(entry.value, value, baseRoot, entry.key);
        });
    
        Object.keys(value).forEach(prop => {
          if (!Object.prototype.hasOwnProperty.call(value, prop)) return;
          if (prop === 'monitorDefaults' || prop === 'autoGearMonitorDefaults') return;
          if (prop === 'rules' || prop === 'autoGearRules') return;
          const child = value[prop];
          if (!child || typeof child === 'function') return;
          if (typeof child === 'object') {
            enqueue(child, value, baseRoot, prop);
          } else if (typeof child === 'string') {
            const resolvedChild = resolveValue(child);
            if (resolvedChild && resolvedChild !== child && typeof resolvedChild === 'object') {
              enqueue(resolvedChild, value, baseRoot, prop);
            }
          }
        });
      }
    
      return null;
    }
    
    function parseSemanticVersion(version) {
      if (typeof version !== 'string') return null;
      const trimmed = version.trim();
      if (!trimmed) return null;
      const match = trimmed.match(/^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/);
      if (!match) return null;
      return {
        major: Number.parseInt(match[1], 10),
        minor: Number.parseInt(match[2], 10),
        patch: Number.parseInt(match[3], 10),
        raw: trimmed,
      };
    }
    
    function compareSemanticVersions(a, b) {
      if (!a || !b) return null;
      if (a.major !== b.major) {
        return a.major > b.major ? 1 : -1;
      }
      if (a.minor !== b.minor) {
        return a.minor > b.minor ? 1 : -1;
      }
      if (a.patch !== b.patch) {
        return a.patch > b.patch ? 1 : -1;
      }
      return 0;
    }
    
    function isValidIsoTimestamp(value) {
      if (typeof value !== 'string') return false;
      const trimmed = value.trim();
      if (!trimmed) return false;
      const parsed = Date.parse(trimmed);
      if (Number.isNaN(parsed)) return false;
      return Number.isFinite(parsed);
    }
    
    function validateAutoGearImportPayload(parsed) {
      const initialMetadata = parsed?.metadata && typeof parsed.metadata === 'object'
        ? { ...parsed.metadata }
        : {};
      const validation = {
        metadata: initialMetadata,
        warnings: [],
        errors: [],
      };
    
      if (!parsed || !Array.isArray(parsed.rules)) {
        validation.errors.push({ code: 'invalid-rules' });
        return validation;
      }
    
      const metadata = validation.metadata;
      const expectedType = 'camera-power-planner/auto-gear-rules';
      const typeValue = typeof metadata.type === 'string' ? metadata.type.trim() : '';
      if (!typeValue) {
        validation.warnings.push({ code: 'missing-metadata', field: 'type' });
      } else if (typeValue !== expectedType) {
        validation.errors.push({ code: 'type-mismatch', expected: expectedType, actual: typeValue });
      } else {
        metadata.type = typeValue;
      }
    
      let versionValue = '';
      if (typeof metadata.version === 'string') {
        versionValue = metadata.version.trim();
        if (!versionValue) {
          validation.warnings.push({ code: 'missing-metadata', field: 'version' });
        }
      } else if (metadata.version != null) {
        validation.warnings.push({ code: 'invalid-metadata', field: 'version' });
      } else {
        validation.warnings.push({ code: 'missing-metadata', field: 'version' });
      }
    
      const parsedVersion = parseSemanticVersion(versionValue);
      if (versionValue && !parsedVersion) {
        validation.warnings.push({ code: 'invalid-version-format', value: versionValue });
      }
      metadata.version = versionValue;
    
      const timestampValue = typeof metadata.timestamp === 'string' ? metadata.timestamp.trim() : '';
      if (!timestampValue) {
        validation.warnings.push({ code: 'missing-metadata', field: 'timestamp' });
      } else if (!isValidIsoTimestamp(timestampValue)) {
        validation.warnings.push({ code: 'invalid-timestamp', value: timestampValue });
      }
      metadata.timestamp = timestampValue;
    
      const localVersion = typeof APP_VERSION === 'string' ? parseSemanticVersion(APP_VERSION) : null;
      if (parsedVersion && localVersion) {
        const comparison = compareSemanticVersions(parsedVersion, localVersion);
        if (comparison > 0) {
          validation.warnings.push({
            code: 'newer-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw,
          });
        } else if (comparison < 0) {
          validation.warnings.push({
            code: 'older-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw,
          });
        }
      }
    
      if (!metadata.type && !metadata.version && !metadata.timestamp) {
        validation.metadata = null;
      }
    
      return validation;
    }
    
    function getAutoGearImportMetadataFieldLabel(field) {
      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');
      const key = field === 'timestamp'
        ? 'autoGearImportMetadataLabelTimestamp'
        : field === 'version'
          ? 'autoGearImportMetadataLabelVersion'
          : 'autoGearImportMetadataLabelType';
      return localeTexts?.[key]
        || englishTexts?.[key]
        || field;
    }
    
    function formatAutoGearImportWarningMessage(warning, metadata) {
      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');
    
      switch (warning.code) {
        case 'newer-version': {
          const template = localeTexts?.autoGearImportNewerVersionWarning
            || englishTexts?.autoGearImportNewerVersionWarning
            || 'Imported rules were created with version {importVersion}, which is newer than this build ({appVersion}).';
          return template
            .replace('{importVersion}', warning.importedVersion || metadata?.version || '')
            .replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
        }
        case 'older-version': {
          const template = localeTexts?.autoGearImportOlderVersionWarning
            || englishTexts?.autoGearImportOlderVersionWarning
            || 'Imported rules were created with version {importVersion}, which is older than this build ({appVersion}).';
          return template
            .replace('{importVersion}', warning.importedVersion || metadata?.version || '')
            .replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
        }
        case 'invalid-version-format': {
          const template = localeTexts?.autoGearImportInvalidVersionWarning
            || englishTexts?.autoGearImportInvalidVersionWarning
            || 'Imported rules report version "{value}", which is not a valid semantic version string.';
          return template.replace('{value}', warning.value || metadata?.version || '');
        }
        case 'invalid-timestamp': {
          const template = localeTexts?.autoGearImportInvalidTimestampWarning
            || englishTexts?.autoGearImportInvalidTimestampWarning
            || 'The import timestamp "{value}" could not be verified.';
          return template.replace('{value}', warning.value || metadata?.timestamp || '');
        }
        default:
          return '';
      }
    }
    
    function displayAutoGearImportWarnings(warnings, metadata) {
      if (!Array.isArray(warnings) || !warnings.length) return;
      const missingFields = [];
      const invalidFields = [];
    
      warnings.forEach(warning => {
        if (!warning || typeof warning !== 'object') return;
        if (warning.code === 'missing-metadata' && warning.field) {
          if (!missingFields.includes(warning.field)) {
            missingFields.push(warning.field);
          }
        } else if (warning.code === 'invalid-metadata' && warning.field) {
          if (!invalidFields.includes(warning.field)) {
            invalidFields.push(warning.field);
          }
        } else {
          const message = formatAutoGearImportWarningMessage(warning, metadata);
          if (message) {
            showNotification('warning', message);
          }
        }
      });
    
      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');
    
      if (missingFields.length) {
        const labels = missingFields.map(field => getAutoGearImportMetadataFieldLabel(field));
        const labelList = formatListForLang(currentLang, labels);
        const template = localeTexts?.autoGearImportMissingMetadataWarning
          || englishTexts?.autoGearImportMissingMetadataWarning
          || 'Imported rules are missing required metadata: {fields}.';
        showNotification('warning', template.replace('{fields}', labelList));
      }
    
      if (invalidFields.length) {
        const labels = invalidFields.map(field => getAutoGearImportMetadataFieldLabel(field));
        const labelList = formatListForLang(currentLang, labels);
        const template = localeTexts?.autoGearImportInvalidMetadataWarning
          || englishTexts?.autoGearImportInvalidMetadataWarning
          || 'Imported rules include invalid metadata: {fields}.';
        showNotification('warning', template.replace('{fields}', labelList));
      }
    }
    
    function importAutoGearRulesFromData(data, options = {}) {
      const previousRules = getAutoGearRules();
      const previousMonitorDefaults = getAutoGearMonitorDefaultsSnapshot();
      const parsed = parseAutoGearImportPayload(data);
      if (!parsed || !Array.isArray(parsed.rules)) {
        const error = new Error('Invalid automatic gear rules import payload');
        error.userMessage = texts[currentLang]?.autoGearImportSchemaError
          || texts.en?.autoGearImportSchemaError
          || 'Import failed. The file does not match the automatic gear rules export format.';
        error.validationWarnings = [];
        error.validationMetadata = null;
        throw error;
      }
    
      const validation = validateAutoGearImportPayload(parsed);
      if (validation.errors.length) {
        const message = texts[currentLang]?.autoGearImportSchemaError
          || texts.en?.autoGearImportSchemaError
          || 'Import failed. The file does not match the automatic gear rules export format.';
        const error = new Error(message);
        error.userMessage = message;
        error.validationErrors = validation.errors;
        error.validationWarnings = validation.warnings;
        error.validationMetadata = validation.metadata;
        throw error;
      }
    
      try {
        setAutoGearRules(parsed.rules);
        if (parsed.monitorDefaults && typeof parsed.monitorDefaults === 'object') {
          setAutoGearMonitorDefaults(parsed.monitorDefaults);
        } else {
          updateAutoGearMonitorDefaultOptions();
          renderAutoGearMonitorDefaultsControls();
        }
        closeAutoGearEditor();
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
      } catch (error) {
        setAutoGearRules(previousRules);
        setAutoGearMonitorDefaults(previousMonitorDefaults, { skipRender: true, skipRefresh: true });
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        renderAutoGearMonitorDefaultsControls();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
        throw error;
      }
    
      if (!options.silent) {
        const message = texts[currentLang]?.autoGearImportSuccess
          || texts.en?.autoGearImportSuccess
          || 'Automatic gear rules imported.';
        showNotification('success', message);
      }
    
      displayAutoGearImportWarnings(validation.warnings, validation.metadata);
      return getAutoGearRules();
    }
    
    function formatAutoGearExportFilename(date) {
      const { iso } = formatFullBackupFilename(date);
      const safeIso = iso.replace(/[:]/g, '-');
      return `${safeIso} auto gear rules.json`;
    }
    
    function exportAutoGearRules() {
      if (typeof document === 'undefined') return null;
      try {
        const rules = getBaseAutoGearRules();
        const monitorDefaults = getAutoGearMonitorDefaultsSnapshot();
        const coverage = getAutoGearRuleCoverageSummary({ rules });
        const payload = {
          type: 'camera-power-planner/auto-gear-rules',
          version: APP_VERSION,
          createdAt: new Date().toISOString(),
          rules,
          monitorDefaults,
        };
        if (coverage) {
          payload.coverage = coverage;
        }
        const json = JSON.stringify(payload, null, 2);
        if (typeof Blob !== 'function' || !URL || typeof URL.createObjectURL !== 'function') {
          throw new Error('Blob or URL APIs unavailable');
        }
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        const fileName = formatAutoGearExportFilename(new Date());
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        if (typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(url);
        }
        const message = texts[currentLang]?.autoGearExportSuccess
          || texts.en?.autoGearExportSuccess
          || 'Automatic gear rules downloaded.';
        showNotification('success', message);
        return fileName;
      } catch (error) {
        console.warn('Automatic gear rules export failed', error);
        const message = texts[currentLang]?.autoGearExportError
          || texts.en?.autoGearExportError
          || 'Automatic gear rules export failed.';
        showNotification('error', message);
        return null;
      }
    }
    
    function captureAutoGearBackupSnapshot(options = {}) {
      const config = typeof options === 'object' && options !== null ? options : {};
      const force = config.force === true;
      const notifySuccess = config.notifySuccess !== false;
      const notifyFailure = config.notifyFailure !== false;
      const note = typeof config.note === 'string' ? config.note.trim() : '';
    
      if (!force && !autoGearRulesDirtySinceBackup) {
        return { status: 'skipped', reason: 'clean' };
      }
    
      const rules = getBaseAutoGearRules();
      const monitorDefaultsSnapshot = getAutoGearMonitorDefaultsSnapshot();
      const signature = getAutoGearConfigurationSignature(rules, monitorDefaultsSnapshot);
    
      if (!force && signature === autoGearRulesLastBackupSignature) {
        autoGearRulesDirtySinceBackup = false;
        return { status: 'skipped', reason: 'unchanged' };
      }
    
      const entry = {
        id: generateAutoGearId('backup'),
        createdAt: new Date().toISOString(),
        rules,
        monitorDefaults: monitorDefaultsSnapshot,
      };
      if (note) {
        entry.note = note;
      }
    
      const retentionLimit = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      const effectiveLimit = Math.max(1, retentionLimit);
      const updatedBackups = [entry, ...autoGearBackups].slice(0, effectiveLimit);
    
      try {
        persistAutoGearBackups(updatedBackups);
        autoGearBackups = updatedBackups;
        autoGearRulesLastBackupSignature = signature;
        autoGearRulesLastPersistedSignature = signature;
        autoGearRulesDirtySinceBackup = false;
        renderAutoGearBackupControls();
        renderAutoGearBackupRetentionControls();
        if (notifySuccess) {
          const message = texts[currentLang]?.autoGearBackupSaved
            || texts.en?.autoGearBackupSaved
            || 'Automatic gear backup saved.';
          showNotification('success', message);
        }
        return { status: 'created', entry };
      } catch (error) {
        console.warn('Automatic gear backup failed', error);
        autoGearRulesDirtySinceBackup = true;
        if (notifyFailure) {
          const message = texts[currentLang]?.autoGearBackupFailed
            || texts.en?.autoGearBackupFailed
            || 'Automatic gear backup failed.';
          showNotification('error', message);
        }
        return { status: 'error', error };
      }
    }
    
    function createAutoGearBackup(options = {}) {
      const result = captureAutoGearBackupSnapshot(options);
      return result.status === 'created';
    }
    
    function restoreAutoGearBackup(backupId) {
      if (!backupId) return false;
      const backup = autoGearBackups.find(entry => entry.id === backupId);
      if (!backup) return false;
      const confirmation = texts[currentLang]?.autoGearBackupRestoreConfirm
        || texts.en?.autoGearBackupRestoreConfirm
        || 'Replace your automatic gear rules with this backup?';
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        if (!window.confirm(confirmation)) return false;
      }
      try {
        setAutoGearRules(Array.isArray(backup.rules) ? backup.rules : []);
        if (backup.monitorDefaults) {
          setAutoGearMonitorDefaults(backup.monitorDefaults, { skipRefresh: true });
        }
        closeAutoGearEditor();
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        renderAutoGearMonitorDefaultsControls();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
        autoGearRulesLastBackupSignature = getAutoGearConfigurationSignature(backup.rules, backup.monitorDefaults);
        autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
        autoGearRulesDirtySinceBackup = false;
        const message = texts[currentLang]?.autoGearBackupRestoreSuccess
          || texts.en?.autoGearBackupRestoreSuccess
          || 'Automatic gear backup restored.';
        showNotification('success', message);
        return true;
      } catch (error) {
        console.warn('Failed to restore automatic gear backup', error);
        const message = texts[currentLang]?.autoGearBackupRestoreError
          || texts.en?.autoGearBackupRestoreError
          || 'Automatic gear backup restore failed.';
        showNotification('error', message);
        return false;
      }
    }
    
    function handleAutoGearImportSelection(event) {
      const input = event?.target;
      const file = input && input.files && input.files[0];
      if (!file) return;
      const confirmation = texts[currentLang]?.autoGearImportConfirm
        || texts.en?.autoGearImportConfirm
        || 'Replace your automatic gear rules with the imported file?';
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        if (!window.confirm(confirmation)) {
          if (input) input.value = '';
          return;
        }
      }
      if (typeof FileReader === 'undefined') {
        const errorMsg = texts[currentLang]?.autoGearImportError
          || texts.en?.autoGearImportError
          || 'Import failed. Please choose a valid automatic gear rules file.';
        showNotification('error', errorMsg);
        if (input) input.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const text = e?.target?.result;
          const parsed = JSON.parse(typeof text === 'string' ? text : '');
          importAutoGearRulesFromData(parsed);
        } catch (error) {
          console.warn('Automatic gear rules import failed', error);
          if (Array.isArray(error?.validationWarnings) && error.validationWarnings.length) {
            displayAutoGearImportWarnings(error.validationWarnings, error.validationMetadata || null);
          }
          const fallbackErrorMsg = texts[currentLang]?.autoGearImportError
            || texts.en?.autoGearImportError
            || 'Import failed. Please choose a valid automatic gear rules file.';
          const errorMsg = typeof error?.userMessage === 'string' && error.userMessage.trim()
            ? error.userMessage
            : fallbackErrorMsg;
          showNotification('error', errorMsg);
        } finally {
          if (input) input.value = '';
        }
      };
      reader.onerror = () => {
        const errorMsg = texts[currentLang]?.autoGearImportError
          || texts.en?.autoGearImportError
          || 'Import failed. Please choose a valid automatic gear rules file.';
        showNotification('error', errorMsg);
        if (input) input.value = '';
      };
      reader.readAsText(file);
    }
    
    let lastActiveBeforeIosHelp = null;
    let lastActiveBeforeInstallGuide = null;
    let currentInstallGuidePlatform = null;
    
    function isIosDevice() {
      if (typeof navigator === 'undefined') return false;
      const ua = navigator.userAgent || '';
      const platform = navigator.platform || '';
      const hasTouch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
      return /iphone|ipad|ipod/i.test(ua) || (platform === 'MacIntel' && hasTouch);
    }
    
    function isAndroidDevice() {
      if (typeof navigator === 'undefined') return false;
      const ua = navigator.userAgent || '';
      const vendor = navigator.vendor || '';
      return /android/i.test(ua) || /android/i.test(vendor);
    }
    
    function isStandaloneDisplayMode() {
      if (typeof window === 'undefined') return false;
      if (typeof window.matchMedia === 'function') {
        try {
          if (window.matchMedia('(display-mode: standalone)').matches) {
            return true;
          }
        } catch (error) {
          console.warn('matchMedia display-mode check failed', error);
        }
      }
      if (typeof navigator !== 'undefined' && typeof navigator.standalone === 'boolean') {
        return navigator.standalone;
      }
      return false;
    }
    
    function hasDismissedIosPwaHelp() {
      try {
        return localStorage.getItem(IOS_PWA_HELP_STORAGE_KEY) === '1';
      } catch (error) {
        console.warn('Could not read iOS PWA help dismissal flag', error);
        return false;
      }
    }
    
    function markIosPwaHelpDismissed() {
      try {
        localStorage.setItem(IOS_PWA_HELP_STORAGE_KEY, '1');
      } catch (error) {
        console.warn('Could not store iOS PWA help dismissal', error);
      }
    }
    
    function hasDismissedInstallBanner() {
      if (installBannerDismissedInSession) return true;
      if (typeof localStorage === 'undefined') return false;
      try {
        const storedValue = localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY);
        const dismissed = storedValue === '1';
        if (dismissed) {
          installBannerDismissedInSession = true;
        }
        return dismissed;
      } catch (error) {
        console.warn('Could not read install banner dismissal flag', error);
        return installBannerDismissedInSession;
      }
    }
    
    function markInstallBannerDismissed() {
      installBannerDismissedInSession = true;
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, '1');
      } catch (error) {
        console.warn('Could not store install banner dismissal', error);
      }
    }
    
    function shouldShowInstallBanner() {
      if (!installPromptBanner) return false;
      if (isStandaloneDisplayMode()) return false;
      if (hasDismissedInstallBanner()) return false;
      return isIosDevice() || isAndroidDevice();
    }
    
    function updateInstallBannerVisibility() {
      if (!installPromptBanner) return;
      const shouldShow = shouldShowInstallBanner();
      const root = typeof document !== 'undefined' ? document.documentElement : null;
      if (root && typeof root.classList !== 'undefined') {
        root.classList.toggle('install-banner-visible', shouldShow);
      }
      if (shouldShow) {
        installPromptBanner.removeAttribute('hidden');
        updateInstallBannerColors();
        updateInstallBannerPosition();
      } else {
        installPromptBanner.setAttribute('hidden', '');
        setInstallBannerOffset(0);
        installPromptBanner.style.removeProperty('top');
      }
    }
    
    function updateInstallBannerColors() {
      if (!installPromptBanner) return;
      if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
        return;
      }
      try {
        const root = document.documentElement;
        if (!root) return;
        const computed = window.getComputedStyle(root);
        const accentValue = computed.getPropertyValue('--accent-color').trim();
        if (!accentValue) {
          installPromptBanner.style.removeProperty('--install-banner-text-color');
          return;
        }
        const rgb = parseColorToRgb(accentValue);
        if (!rgb) return;
        const luminance = computeRelativeLuminance(rgb);
        const textColor = luminance > 0.55 ? '#000000' : '#ffffff';
        installPromptBanner.style.setProperty('--install-banner-text-color', textColor);
      } catch (error) {
        console.warn('Unable to update install banner colors', error);
      }
    }
    
    function renderInstallGuideContent(platform, lang = currentLang) {
      if (!installGuideDialog) return;
      const fallbackTexts = texts.en || {};
      const langTexts = texts[lang] || fallbackTexts;
      const isIos = platform === 'ios';
    
      const titleKey = isIos ? 'installHelpTitleIos' : 'installHelpTitleAndroid';
      const introKey = isIos ? 'installHelpIntroIos' : 'installHelpIntroAndroid';
      const stepsKey = isIos ? 'installHelpStepsIos' : 'installHelpStepsAndroid';
      const noteKey = isIos ? 'installHelpNoteIos' : 'installHelpNoteAndroid';
    
      const title = langTexts[titleKey] || fallbackTexts[titleKey] || '';
      if (installGuideTitle) installGuideTitle.textContent = title;
    
      const intro = langTexts[introKey] || fallbackTexts[introKey] || '';
      if (installGuideIntro) installGuideIntro.textContent = intro;
    
      const stepsSource = langTexts[stepsKey];
      const fallbackStepsSource = fallbackTexts[stepsKey];
      const toArray = value => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
      };
      const steps = toArray(stepsSource);
      const fallbackSteps = toArray(fallbackStepsSource);
      const effectiveSteps = steps.length ? steps : fallbackSteps;
      if (installGuideSteps) {
        installGuideSteps.textContent = '';
        effectiveSteps.forEach(step => {
          if (!step) return;
          const li = document.createElement('li');
          li.textContent = step;
          installGuideSteps.appendChild(li);
        });
      }
    
      const note = langTexts[noteKey] || fallbackTexts[noteKey] || '';
      if (installGuideNote) installGuideNote.textContent = note;
    
      if (installGuideDialog) {
        installGuideDialog.setAttribute('data-platform', platform);
      }
    
      if (!installGuideMigration || !installGuideMigrationTitle || !installGuideMigrationIntro || !installGuideMigrationSteps || !installGuideMigrationNote) {
        return;
      }
    
      if (isIos) {
        installGuideMigration.removeAttribute('hidden');
        const migrationTitle = langTexts.installHelpMigrationTitle || fallbackTexts.installHelpMigrationTitle || '';
        installGuideMigrationTitle.textContent = migrationTitle;
        const migrationIntro = langTexts.iosPwaHelpIntro || fallbackTexts.iosPwaHelpIntro || '';
        installGuideMigrationIntro.textContent = migrationIntro;
        const migrationSteps = [
          langTexts.iosPwaHelpStep1 || fallbackTexts.iosPwaHelpStep1,
          langTexts.iosPwaHelpStep2 || fallbackTexts.iosPwaHelpStep2,
          langTexts.iosPwaHelpStep3 || fallbackTexts.iosPwaHelpStep3,
          langTexts.iosPwaHelpStep4 || fallbackTexts.iosPwaHelpStep4,
        ].filter(Boolean);
        installGuideMigrationSteps.textContent = '';
        migrationSteps.forEach(step => {
          const li = document.createElement('li');
          li.textContent = step;
          installGuideMigrationSteps.appendChild(li);
        });
        const migrationNote = langTexts.iosPwaHelpNote || fallbackTexts.iosPwaHelpNote || '';
        installGuideMigrationNote.textContent = migrationNote;
      } else {
        installGuideMigration.setAttribute('hidden', '');
        installGuideMigrationTitle.textContent = '';
        installGuideMigrationIntro.textContent = '';
        installGuideMigrationSteps.textContent = '';
        installGuideMigrationNote.textContent = '';
      }
    }
    
    function openInstallGuide(platform) {
      if (!installGuideDialog) return;
      currentInstallGuidePlatform = platform;
      lastActiveBeforeInstallGuide = document.activeElement;
      renderInstallGuideContent(platform);
      installGuideDialog.removeAttribute('hidden');
      const focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }
    
    function closeInstallGuide() {
      if (!installGuideDialog) return;
      installGuideDialog.setAttribute('hidden', '');
      currentInstallGuidePlatform = null;
      if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
        lastActiveBeforeInstallGuide.focus();
      }
    }
    
    function setupInstallBanner() {
      if (!installPromptBanner) return;
    
      if (installPromptBannerIcon) {
        applyIconGlyph(installPromptBannerIcon, ICON_GLYPHS.installApp);
      }
    
      if (installPromptBannerAction) {
        installPromptBannerAction.addEventListener('click', event => {
          event.preventDefault();
          const platform = isIosDevice() ? 'ios' : 'android';
          openInstallGuide(platform);
        });
      }
    
      if (installPromptBannerDismiss) {
        installPromptBannerDismiss.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          markInstallBannerDismissed();
          updateInstallBannerVisibility();
        });
      }
    
      if (installGuideClose) {
        installGuideClose.addEventListener('click', closeInstallGuide);
      }
    
      if (installGuideDialog) {
        installGuideDialog.addEventListener('click', event => {
          if (event.target === installGuideDialog) {
            closeInstallGuide();
          }
        });
      }
    
      applyInstallTexts(currentLang);
      updateInstallBannerColors();
      updateInstallBannerVisibility();
      updateInstallBannerPosition();
    
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateInstallBannerPosition);
        window.addEventListener('appinstalled', updateInstallBannerVisibility);
        if (typeof window.matchMedia === 'function') {
          try {
            const media = window.matchMedia('(display-mode: standalone)');
            const handleChange = () => updateInstallBannerVisibility();
            if (typeof media.addEventListener === 'function') {
              media.addEventListener('change', handleChange);
            } else if (typeof media.addListener === 'function') {
              media.addListener(handleChange);
            }
          } catch (error) {
            console.warn('matchMedia display-mode listener failed', error);
          }
        }
      }
    }
    
    function applyInstallTexts(lang) {
      const fallbackTexts = texts.en || {};
      const langTexts = texts[lang] || fallbackTexts;
      const bannerText = langTexts.installBannerText || fallbackTexts.installBannerText;
      if (installPromptBannerText && bannerText) {
        installPromptBannerText.textContent = bannerText;
      }
      if (installPromptBanner) {
        if (bannerText) {
          installPromptBanner.setAttribute('aria-label', bannerText);
          installPromptBanner.setAttribute('title', bannerText);
        } else {
          installPromptBanner.removeAttribute('aria-label');
          installPromptBanner.removeAttribute('title');
        }
      }
      if (installPromptBannerAction) {
        if (bannerText) {
          installPromptBannerAction.setAttribute('aria-label', bannerText);
          installPromptBannerAction.setAttribute('title', bannerText);
        } else {
          installPromptBannerAction.removeAttribute('aria-label');
          installPromptBannerAction.removeAttribute('title');
        }
      }
      const closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose;
      const dismissLabel =
        langTexts.installBannerDismiss ||
        fallbackTexts.installBannerDismiss ||
        closeLabel ||
        '';
      if (installPromptBannerDismiss) {
        const labelText = dismissLabel || '';
        setButtonLabelWithIcon(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
        if (labelText) {
          installPromptBannerDismiss.setAttribute('aria-label', labelText);
          installPromptBannerDismiss.setAttribute('title', labelText);
          const hiddenLabel = document.createElement('span');
          hiddenLabel.className = 'visually-hidden';
          hiddenLabel.textContent = labelText;
          installPromptBannerDismiss.appendChild(hiddenLabel);
        } else {
          installPromptBannerDismiss.removeAttribute('aria-label');
          installPromptBannerDismiss.removeAttribute('title');
        }
      }
      if (installGuideClose && closeLabel) {
        setButtonLabelWithIcon(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
        installGuideClose.setAttribute('aria-label', closeLabel);
        installGuideClose.setAttribute('title', closeLabel);
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
        renderInstallGuideContent(currentInstallGuidePlatform, lang);
      }
    
      updateInstallBannerPosition();
    }
    
    function shouldShowIosPwaHelp() {
      return (
        !!iosPwaHelpDialog &&
        isIosDevice() &&
        isStandaloneDisplayMode() &&
        !hasDismissedIosPwaHelp()
      );
    }
    
    function openIosPwaHelp() {
      if (!iosPwaHelpDialog) return;
      if (!shouldShowIosPwaHelp()) return;
      lastActiveBeforeIosHelp = document.activeElement;
      iosPwaHelpDialog.removeAttribute('hidden');
      const focusTarget = iosPwaHelpClose || iosPwaHelpDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }
    
    function closeIosPwaHelp(storeDismissal = false) {
      if (!iosPwaHelpDialog) return;
      iosPwaHelpDialog.setAttribute('hidden', '');
      if (storeDismissal) {
        markIosPwaHelpDismissed();
      }
      if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
        lastActiveBeforeIosHelp.focus();
      }
    }
    
    function maybeShowIosPwaHelp() {
      openIosPwaHelp();
    }
    
    if (iosPwaHelpClose) {
      iosPwaHelpClose.addEventListener('click', () => closeIosPwaHelp(true));
    }
    
    if (iosPwaHelpDialog) {
      iosPwaHelpDialog.addEventListener('click', event => {
        if (event.target === iosPwaHelpDialog) {
          closeIosPwaHelp(true);
        }
      });
    }
    
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' && event.key !== 'Esc') return;
      let handled = false;
      if (iosPwaHelpDialog && !iosPwaHelpDialog.hasAttribute('hidden')) {
        closeIosPwaHelp(true);
        handled = true;
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden')) {
        closeInstallGuide();
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
    });
    
    function renderSettingsLogoPreview(dataUrl) {
      if (!settingsLogoPreview) return;
      if (dataUrl) {
        settingsLogoPreview.textContent = '';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.alt = '';
        settingsLogoPreview.appendChild(img);
        settingsLogoPreview.removeAttribute('hidden');
      } else {
        settingsLogoPreview.textContent = '';
        settingsLogoPreview.setAttribute('hidden', '');
      }
    }
    
    function loadStoredLogoPreview() {
      if (!settingsLogoPreview || typeof localStorage === 'undefined') return;
      let stored = null;
      try {
        stored = localStorage.getItem('customLogo');
      } catch (e) {
        console.warn('Could not load custom logo preview', e);
      }
      renderSettingsLogoPreview(stored);
    }
    
    const isPlainObjectValue = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);
    
    const REQUIRED_DEVICE_CATEGORIES = [
      'cameras',
      'monitors',
      'video',
      'viewfinders',
      'directorMonitors',
      'iosVideo',
      'videoAssist',
      'media',
      'lenses',
      'fiz',
      'batteries',
      'batteryHotswaps',
      'wirelessReceivers',
      'accessories',
    ];
    const DEFAULT_FIZ_COLLECTIONS = ['motors', 'handUnits', 'controllers', 'distance'];
    const DEFAULT_ACCESSORY_COLLECTIONS = [
      'chargers',
      'cages',
      'powerPlates',
      'cameraSupport',
      'matteboxes',
      'filters',
      'rigging',
      'batteries',
      'cables',
      'videoAssist',
      'media',
      'tripodHeads',
      'tripods',
      'sliders',
      'cameraStabiliser',
      'grip',
      'carts',
    ];
    const MAX_DEVICE_IMPORT_ERRORS = 5;
    
    function isDeviceEntryObject(value) {
      if (!isPlainObjectValue(value)) {
        return false;
      }
      return Object.values(value).some((entry) => entry === null || typeof entry !== 'object' || Array.isArray(entry));
    }
    
    function countDeviceDatabaseEntries(collection) {
      if (!isPlainObjectValue(collection)) {
        return 0;
      }
      let total = 0;
      for (const [name, value] of Object.entries(collection)) {
        if (name === 'filterOptions' || name === 'None') {
          continue;
        }
        if (!isPlainObjectValue(value)) {
          continue;
        }
        if (isDeviceEntryObject(value)) {
          total += 1;
        } else {
          total += countDeviceDatabaseEntries(value);
        }
      }
      return total;
    }
    
    function looksLikeDeviceDatabase(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return false;
      }
      let matched = 0;
      for (const key of REQUIRED_DEVICE_CATEGORIES) {
        if (Object.prototype.hasOwnProperty.call(candidate, key)) {
          matched += 1;
        }
      }
      return matched >= 3;
    }
    
    function collectReferenceFizKeys() {
      const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
        ? globalThis.defaultDevices
        : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
      if (reference && isPlainObjectValue(reference.fiz)) {
        const keys = Object.keys(reference.fiz).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_FIZ_COLLECTIONS;
    }
    
    function collectReferenceAccessoryKeys() {
      const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
        ? globalThis.defaultDevices
        : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
      if (reference && isPlainObjectValue(reference.accessories)) {
        const keys = Object.keys(reference.accessories).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_ACCESSORY_COLLECTIONS;
    }
    
    function validateDeviceDatabaseStructure(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return { devices: null, errors: ['Imported data must be a JSON object.'] };
      }
    
      const errors = [];
      const missing = [];
    
      for (const category of REQUIRED_DEVICE_CATEGORIES) {
        if (category === 'fiz') {
          if (!isPlainObjectValue(candidate.fiz)) {
            missing.push('fiz');
            continue;
          }
          const expectedFizKeys = collectReferenceFizKeys();
          const missingFiz = expectedFizKeys.filter((key) => !isPlainObjectValue(candidate.fiz[key]));
          if (missingFiz.length) {
            errors.push(`Missing FIZ categories: ${missingFiz.join(', ')}`);
          }
          continue;
        }
        if (category === 'accessories') {
          if (!isPlainObjectValue(candidate.accessories)) {
            missing.push('accessories');
            continue;
          }
          const expectedAccessoryKeys = collectReferenceAccessoryKeys();
          const missingAccessories = expectedAccessoryKeys.filter((key) => !isPlainObjectValue(candidate.accessories[key]));
          if (missingAccessories.length) {
            errors.push(`Missing accessory categories: ${missingAccessories.join(', ')}`);
          }
          continue;
        }
        if (!isPlainObjectValue(candidate[category])) {
          missing.push(category);
        }
      }
    
      if (missing.length) {
        errors.push(`Missing categories: ${missing.join(', ')}`);
      }
    
      if (candidate.accessories !== undefined) {
        if (!isPlainObjectValue(candidate.accessories)) {
          errors.push('Accessory collections must be objects.');
        } else {
          for (const [subKey, subValue] of Object.entries(candidate.accessories)) {
            if (!isPlainObjectValue(subValue)) {
              errors.push(`Accessory category "${subKey}" must be an object.`);
            }
          }
        }
      }
    
      if (candidate.filterOptions !== undefined && !Array.isArray(candidate.filterOptions)) {
        errors.push('Filter options must be provided as an array.');
      }
    
      if (candidate.fiz && isPlainObjectValue(candidate.fiz)) {
        for (const [subKey, subValue] of Object.entries(candidate.fiz)) {
          if (subValue !== undefined && !isPlainObjectValue(subValue)) {
            errors.push(`FIZ category "${subKey}" must be an object.`);
          }
        }
      }
    
      const structureErrors = [];
      const inspectCollections = (collection, path = []) => {
        if (!isPlainObjectValue(collection)) {
          return;
        }
        for (const [name, value] of Object.entries(collection)) {
          if (name === 'None' || name === 'filterOptions') {
            continue;
          }
          const nextPath = path.concat(name);
          if (!isPlainObjectValue(value)) {
            if (!Array.isArray(value)) {
              structureErrors.push(`${nextPath.join('.')} must be an object.`);
            }
          } else if (!isDeviceEntryObject(value)) {
            inspectCollections(value, nextPath);
          }
          if (structureErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
            return;
          }
        }
      };
    
      inspectCollections(candidate);
      errors.push(...structureErrors);
    
      const deviceCount = countDeviceDatabaseEntries(candidate);
      if (!deviceCount) {
        errors.push('The imported database does not contain any devices.');
      }
    
      const uniqueErrors = [];
      for (const message of errors) {
        if (message && !uniqueErrors.includes(message)) {
          uniqueErrors.push(message);
        }
        if (uniqueErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
          break;
        }
      }
    
      return {
        devices: uniqueErrors.length ? null : candidate,
        errors: uniqueErrors,
      };
    }
    
    function parseDeviceDatabaseImport(rawData) {
      if (Array.isArray(rawData)) {
        return { devices: null, errors: ['Import file must contain a JSON object, but found an array.'] };
      }
      if (!isPlainObjectValue(rawData)) {
        return { devices: null, errors: ['Import file must contain a JSON object.'] };
      }
    
      if (Object.prototype.hasOwnProperty.call(rawData, 'devices') && !isPlainObjectValue(rawData.devices)) {
        return { devices: null, errors: ['The "devices" property must be an object.'] };
      }
    
      const candidate = Object.prototype.hasOwnProperty.call(rawData, 'devices') && isPlainObjectValue(rawData.devices)
        ? rawData.devices
        : (looksLikeDeviceDatabase(rawData) ? rawData : null);
    
      if (!candidate) {
        return { devices: null, errors: ['Could not find a device database in the selected file.'] };
      }
    
      return validateDeviceDatabaseStructure(candidate);
    }
    
    function formatDeviceImportErrors(errors) {
      if (!Array.isArray(errors) || !errors.length) {
        return '';
      }
      const lines = errors.slice(0, MAX_DEVICE_IMPORT_ERRORS).map((message) => `- ${message}`);
      return lines.join('\n');
    }
    
    function resolveLanguageCode(lang) {
      if (lang && texts && Object.prototype.hasOwnProperty.call(texts, lang)) {
        return lang;
      }
      return 'en';
    }
    
    function getLanguageTexts(lang) {
      const resolved = resolveLanguageCode(lang);
      return (texts && texts[resolved]) || texts.en || {};
    }
    
    const DEFAULT_INTL_CACHE_KEY = '__default__';
    
    const numberFormatCache = new Map();
    const pluralRulesCache = new Map();
    const listFormatCache = new Map();
    const LIST_FORMAT_OPTIONS = Object.freeze({ style: 'long', type: 'conjunction' });
    
    function serializeIntlOptions(options) {
      if (!options || typeof options !== 'object') {
        return options == null ? DEFAULT_INTL_CACHE_KEY : String(options);
      }
      const entries = [];
      for (const [key, value] of Object.entries(options)) {
        if (typeof value === 'undefined') continue;
        let normalizedValue;
        if (value && typeof value === 'object') {
          normalizedValue = serializeIntlOptions(value);
        } else {
          normalizedValue = String(value);
        }
        entries.push(`${key}:${normalizedValue}`);
      }
      if (!entries.length) {
        return DEFAULT_INTL_CACHE_KEY;
      }
      return entries.sort().join('|');
    }
    
    function getCachedIntlObject(cache, locale, options, factory) {
      const key = serializeIntlOptions(options);
      let localeCache = cache.get(locale);
      if (!localeCache) {
        localeCache = new Map();
        cache.set(locale, localeCache);
      }
      if (localeCache.has(key)) {
        return localeCache.get(key);
      }
      try {
        const instance = factory(locale, options);
        localeCache.set(key, instance);
        return instance;
      } catch (error) {
        localeCache.delete(key);
        throw error;
      }
    }
    
    function getNumberFormatter(locale, options) {
      return getCachedIntlObject(numberFormatCache, locale, options, (loc, opts) => new Intl.NumberFormat(loc, opts));
    }
    
    function getPluralRules(locale) {
      return getCachedIntlObject(pluralRulesCache, locale, undefined, loc => new Intl.PluralRules(loc));
    }
    
    function getListFormatter(locale) {
      return getCachedIntlObject(listFormatCache, locale, LIST_FORMAT_OPTIONS, loc => new Intl.ListFormat(loc, LIST_FORMAT_OPTIONS));
    }
    
    function formatNumberForLang(lang, value, options) {
      const resolved = resolveLanguageCode(lang);
      try {
        return getNumberFormatter(resolved, options).format(value);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getNumberFormatter('en', options).format(value);
          } catch (fallbackError) {
            console.warn('Number formatting failed', firstError, fallbackError);
            return String(value);
          }
        }
        console.warn('Number formatting failed', firstError);
        return String(value);
      }
    }
    
    function formatCountText(lang, langTexts, baseKey, count) {
      const resolved = resolveLanguageCode(lang);
      const localeTexts = langTexts || getLanguageTexts(resolved);
      const englishTexts = getLanguageTexts('en');
      let suffix = 'Other';
      try {
        const plural = getPluralRules(resolved).select(count);
        if (plural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            const fallbackPlural = getPluralRules('en').select(count);
            if (fallbackPlural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
              suffix = 'One';
            }
          } catch (fallbackError) {
            console.warn('Plural rules failed', firstError, fallbackError);
            if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
              suffix = 'One';
            }
          }
        } else if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      }
      const key = `${baseKey}${suffix}`;
      const template = localeTexts[key] || englishTexts[key] || '%s';
      const formatted = formatNumberForLang(resolved, count);
      return template.replace('%s', formatted);
    }
    
    function formatListForLang(lang, items) {
      const resolved = resolveLanguageCode(lang);
      if (!Array.isArray(items) || !items.length) return '';
      try {
        return getListFormatter(resolved).format(items);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getListFormatter('en').format(items);
          } catch (fallbackError) {
            console.warn('List formatting failed', firstError, fallbackError);
            return items.join(', ');
          }
        }
        console.warn('List formatting failed', firstError);
        return items.join(', ');
      }
    }
    
    function normalizeTemperatureUnit(unit) {
      if (typeof unit === 'string') {
        const normalized = unit.trim().toLowerCase();
        if (normalized === TEMPERATURE_UNITS.fahrenheit) {
          return TEMPERATURE_UNITS.fahrenheit;
        }
        if (normalized === TEMPERATURE_UNITS.celsius) {
          return TEMPERATURE_UNITS.celsius;
        }
      }
      if (unit === TEMPERATURE_UNITS.fahrenheit) {
        return TEMPERATURE_UNITS.fahrenheit;
      }
      return TEMPERATURE_UNITS.celsius;
    }
    
    function convertCelsiusToUnit(value, unit = temperatureUnit) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        return Number.NaN;
      }
      const resolvedUnit = normalizeTemperatureUnit(unit);
      if (resolvedUnit === TEMPERATURE_UNITS.fahrenheit) {
        return (numeric * 9) / 5 + 32;
      }
      return numeric;
    }
    
    function getTemperatureUnitSymbolForLang(lang = currentLang, unit = temperatureUnit) {
      const resolvedUnit = normalizeTemperatureUnit(unit);
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const key =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit
          ? 'temperatureUnitSymbolFahrenheit'
          : 'temperatureUnitSymbolCelsius';
      return (
        textsForLang[key] ||
        fallbackTexts[key] ||
        (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C')
      );
    }
    
    function getTemperatureUnitLabelForLang(lang = currentLang, unit = temperatureUnit) {
      const resolvedUnit = normalizeTemperatureUnit(unit);
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const key =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit
          ? 'temperatureUnitFahrenheit'
          : 'temperatureUnitCelsius';
      return (
        textsForLang[key] ||
        fallbackTexts[key] ||
        (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)')
      );
    }
    
    function getTemperatureColumnLabelForLang(lang = currentLang, unit = temperatureUnit) {
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const baseLabel =
        textsForLang.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
      const symbol = getTemperatureUnitSymbolForLang(lang, unit);
      return `${baseLabel} (${symbol})`;
    }
    
    function formatTemperatureForDisplay(celsius, options = {}) {
      const {
        unit = temperatureUnit,
        lang = currentLang,
        includeSign = true
      } = options || {};
      const resolvedUnit = normalizeTemperatureUnit(unit);
      let converted = convertCelsiusToUnit(celsius, resolvedUnit);
      if (!Number.isFinite(converted)) {
        return '';
      }
      if (Math.abs(converted) < 1e-6) {
        converted = 0;
      }
      const isNegative = converted < 0;
      const isPositive = converted > 0;
      const absolute = Math.abs(converted);
      const isInteger = Math.abs(absolute - Math.round(absolute)) < 1e-6;
      const fractionDigits =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit && !isInteger ? 1 : 0;
      const formatted = formatNumberForLang(lang, absolute, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      });
      let prefix = '';
      if (includeSign === 'none') {
        prefix = '';
      } else if (includeSign === false || includeSign === 'negative') {
        if (isNegative) {
          prefix = '\u2013';
        }
      } else {
        if (isPositive) {
          prefix = '+';
        } else if (isNegative) {
          prefix = '\u2013';
        }
      }
      const symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
      return `${prefix}${formatted} ${symbol}`;
    }
    
    function summarizeCustomDevices() {
      if (typeof getDeviceChanges !== 'function') {
        return { total: 0, categories: [] };
      }
      const diff = getDeviceChanges();
      if (!diff || typeof diff !== 'object') {
        return { total: 0, categories: [] };
      }
      const categories = [];
      let total = 0;
      Object.entries(diff).forEach(([cat, entries]) => {
        if (!isPlainObjectValue(entries)) return;
        if (cat === 'fiz') {
          Object.entries(entries).forEach(([sub, subEntries]) => {
            if (!isPlainObjectValue(subEntries)) return;
            const keys = Object.keys(subEntries);
            if (!keys.length) return;
            categories.push({ key: `fiz.${sub}`, count: keys.length });
            total += keys.length;
          });
        } else {
          const keys = Object.keys(entries);
          if (!keys.length) return;
          categories.push({ key: cat, count: keys.length });
          total += keys.length;
        }
      });
      return { total, categories };
    }
    
    function hasGearListContent(entry) {
      if (!entry) return false;
      if (typeof entry === 'string') {
        return entry.trim().length > 0;
      }
      if (!isPlainObjectValue(entry)) {
        return false;
      }
    
      if (typeof entry.gearList === 'string') {
        return entry.gearList.trim().length > 0;
      }
    
      if (isPlainObjectValue(entry.gearList)) {
        return Object.values(entry.gearList).some((value) => (
          typeof value === 'string' && value.trim().length > 0
        ));
      }
    
      const legacyProjectHtml = typeof entry.projectHtml === 'string' && entry.projectHtml.trim().length > 0;
      const legacyGearHtml = typeof entry.gearHtml === 'string' && entry.gearHtml.trim().length > 0;
      if (legacyProjectHtml || legacyGearHtml) {
        return true;
      }
    
      return false;
    }
    
    function computeGearListCount(projectData, setupsData) {
      let count = 0;
      const countedNames = new Set();
    
      const addCount = (name, candidate) => {
        if (!hasGearListContent(candidate)) {
          return;
        }
        const normalizedName = typeof name === 'string' ? name : '';
        if (countedNames.has(normalizedName)) {
          return;
        }
        countedNames.add(normalizedName);
        count += 1;
      };
    
      if (typeof projectData === 'string') {
        addCount('', projectData);
      } else if (Array.isArray(projectData)) {
        projectData.forEach((entry, index) => {
          const key = isPlainObjectValue(entry) && typeof entry.name === 'string'
            ? entry.name
            : `legacy-${index}`;
          addCount(key, entry);
        });
      } else if (isPlainObjectValue(projectData)) {
        Object.entries(projectData).forEach(([name, entry]) => {
          addCount(name, entry);
        });
      } else {
        addCount('', projectData);
      }
    
      if (isPlainObjectValue(setupsData)) {
        Object.entries(setupsData).forEach(([name, setup]) => {
          addCount(name, setup);
        });
      }
    
      return count;
    }
    
    function computeFavoritesCount(favorites) {
      if (!isPlainObjectValue(favorites)) return 0;
      return Object.values(favorites).reduce((count, entry) => {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        return count;
      }, 0);
    }
    
    function computeFeedbackCount(feedback) {
      if (!isPlainObjectValue(feedback)) return 0;
      return Object.values(feedback).reduce((count, entry) => {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        if (isPlainObjectValue(entry) && Array.isArray(entry.entries)) {
          return count + entry.entries.length;
        }
        return count;
      }, 0);
    }
    
    function estimateBackupSize(data) {
      if (typeof localStorage === 'undefined') return 0;
      try {
        const snapshot = {};
        for (let i = 0; i < localStorage.length; i += 1) {
          const key = localStorage.key(i);
          if (typeof key !== 'string') continue;
          snapshot[key] = localStorage.getItem(key);
        }
        const payload = {
          version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
          generatedAt: new Date().toISOString(),
          settings: snapshot,
          data,
        };
        const json = JSON.stringify(payload);
        if (typeof TextEncoder !== 'undefined') {
          return new TextEncoder().encode(json).length;
        }
        return json.length;
      } catch (err) {
        console.warn('Could not calculate backup size preview', err);
        return 0;
      }
    }
    
    function formatSizeText(lang, langTexts, bytes) {
      const resolved = resolveLanguageCode(lang);
      if (!Number.isFinite(bytes) || bytes <= 0) {
        const zero = formatNumberForLang(resolved, 0, { maximumFractionDigits: 0 });
        const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
        return template.replace('%s', zero);
      }
      const kilobytes = bytes / 1024;
      let options;
      if (kilobytes >= 100) {
        options = { maximumFractionDigits: 0 };
      } else if (kilobytes >= 10) {
        options = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
      } else {
        options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
      }
      const formatted = formatNumberForLang(resolved, kilobytes, options);
      const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
      return template.replace('%s', formatted);
    }
    
    function formatDeviceCategories(lang, categories) {
      if (!Array.isArray(categories) || !categories.length) return '';
      const resolved = resolveLanguageCode(lang);
      const lookup = (typeof categoryNames !== 'undefined' && categoryNames) || {};
      const localized = lookup[resolved] || lookup.en || {};
      const fallback = lookup.en || {};
      const items = categories
        .map(({ key, count }) => {
          const label = localized[key] || fallback[key] || key;
          const formattedCount = formatNumberForLang(resolved, count, { maximumFractionDigits: 0 });
          return { label, text: `${label} (${formattedCount})` };
        })
        .sort((a, b) => a.label.localeCompare(b.label, resolved, { sensitivity: 'base' }))
        .map((entry) => entry.text);
      return formatListForLang(resolved, items);
    }
    
    const STORAGE_SUMMARY_AUTO_BACKUP_PREFIX = 'auto-backup-';
    const STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
    const STORAGE_TIMESTAMP_KEYS = new Set([
      'timestamp',
      'createdat',
      'created_at',
      'savedat',
      'saved_at',
      'updatedat',
      'updated_at',
      'generatedat',
      'generated_at',
      'generatedon',
      'generated_on',
      'exportedat',
      'exported_at',
      'modifiedat',
      'modified_at',
      'iso',
    ]);
    const ISO_TIMESTAMP_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?(?:Z|[+-]\d{2}:\d{2})?$/;
    
    function isAutomaticBackupName(name) {
      if (typeof name !== 'string') return false;
      return (
        name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX)
        || name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX)
      );
    }
    
    function parseAutoBackupTimestamp(name) {
      if (typeof name !== 'string') return null;
      let remainder = '';
      if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX.length);
      } else if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX.length);
      } else {
        return null;
      }
      const parts = remainder.split('-');
      if (parts.length < 6) {
        return null;
      }
      const values = parts.slice(0, 6).map(part => parseInt(part, 10));
      if (values.some(value => Number.isNaN(value))) {
        return null;
      }
      const [year, month, day, hour, minute, second] = values;
      const date = new Date(year, month - 1, day, hour, minute, second);
      if (Number.isNaN(date.getTime())) {
        return null;
      }
      return date;
    }
    
    function extractTimestampFromValue(value) {
      if (!value) return null;
      const visited = new Set();
      const queue = [value];
      let latest = null;
    
      const considerDate = (candidate) => {
        if (!(candidate instanceof Date)) return;
        if (Number.isNaN(candidate.getTime())) return;
        if (!latest || candidate > latest) {
          latest = candidate;
        }
      };
    
      while (queue.length) {
        const current = queue.shift();
        if (current === null || current === undefined) {
          continue;
        }
        if (typeof current === 'string') {
          const trimmed = current.trim();
          if (!trimmed) {
            continue;
          }
          if (ISO_TIMESTAMP_PATTERN.test(trimmed)) {
            considerDate(new Date(trimmed));
          }
          continue;
        }
        if (typeof current !== 'object') {
          continue;
        }
        if (visited.has(current)) {
          continue;
        }
        visited.add(current);
        if (Array.isArray(current)) {
          current.forEach((item) => {
            if (item && typeof item === 'object') {
              queue.push(item);
            } else if (typeof item === 'string') {
              queue.push(item);
            }
          });
          continue;
        }
        Object.entries(current).forEach(([key, val]) => {
          const normalizedKey = typeof key === 'string' ? key.toLowerCase() : '';
          if (typeof val === 'string') {
            const trimmed = val.trim();
            if (!trimmed) {
              return;
            }
            if (STORAGE_TIMESTAMP_KEYS.has(normalizedKey) || ISO_TIMESTAMP_PATTERN.test(trimmed)) {
              considerDate(new Date(trimmed));
            }
            return;
          }
          if (val && typeof val === 'object') {
            queue.push(val);
          }
        });
      }
    
      return latest;
    }
    
    function extractLatestManualSetupInfo(setups) {
      const result = { hasAny: false, date: null, name: '' };
      if (!isPlainObjectValue(setups)) {
        return result;
      }
      Object.entries(setups).forEach(([name, entry]) => {
        if (!name || typeof name !== 'string') {
          return;
        }
        if (isAutomaticBackupName(name)) {
          return;
        }
        result.hasAny = true;
        const timestamp = extractTimestampFromValue(entry);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }
    
    function extractLatestAutoBackupInfo(names) {
      const result = { hasAny: Array.isArray(names) && names.length > 0, date: null, name: '' };
      if (!Array.isArray(names)) {
        return result;
      }
      names.forEach((name) => {
        const timestamp = parseAutoBackupTimestamp(name);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }
    
    function extractLatestFullBackupInfo(entries) {
      const result = { hasAny: Array.isArray(entries) && entries.length > 0, date: null, name: '' };
      if (!Array.isArray(entries)) {
        return result;
      }
      entries.forEach((entry) => {
        if (!entry) {
          return;
        }
        if (typeof entry === 'string') {
          const trimmed = entry.trim();
          if (!trimmed) {
            return;
          }
          const timestamp = new Date(trimmed);
          if (Number.isNaN(timestamp.getTime())) {
            return;
          }
          if (!result.date || timestamp > result.date) {
            result.date = timestamp;
            result.name = trimmed;
          }
          return;
        }
        if (typeof entry === 'object') {
          const timestamp = extractTimestampFromValue(entry);
          if (!timestamp) {
            return;
          }
          if (!result.date || timestamp > result.date) {
            result.date = timestamp;
            if (typeof entry.fileName === 'string' && entry.fileName.trim()) {
              result.name = entry.fileName.trim();
            } else if (typeof entry.name === 'string' && entry.name.trim()) {
              result.name = entry.name.trim();
            } else if (typeof entry.createdAt === 'string' && entry.createdAt.trim()) {
              result.name = entry.createdAt.trim();
            } else if (typeof entry.iso === 'string' && entry.iso.trim()) {
              result.name = entry.iso.trim();
            } else if (typeof entry.timestamp === 'string' && entry.timestamp.trim()) {
              result.name = entry.timestamp.trim();
            } else {
              result.name = '';
            }
          }
        }
      });
      return result;
    }
    
    function formatAbsoluteTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      const resolved = resolveLanguageCode(lang || currentLang);
      if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
        try {
          return new Intl.DateTimeFormat(resolved, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
        } catch (error) {
          console.warn('Failed to format absolute timestamp', error);
        }
      }
      return date.toISOString().replace('T', ' ').replace(/Z$/, ' UTC');
    }
    
    function formatRelativeTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      if (typeof Intl === 'undefined' || typeof Intl.RelativeTimeFormat !== 'function') {
        return '';
      }
      const resolved = resolveLanguageCode(lang || currentLang);
      const diffMs = date.getTime() - Date.now();
      const absDiff = Math.abs(diffMs);
      let unit = 'minute';
      let divisor = 60000;
      if (absDiff >= 86400000) {
        unit = 'day';
        divisor = 86400000;
      } else if (absDiff >= 3600000) {
        unit = 'hour';
        divisor = 3600000;
      } else if (absDiff < 60000) {
        unit = 'second';
        divisor = 1000;
      }
      const formatter = new Intl.RelativeTimeFormat(resolved, { numeric: 'auto' });
      const value = Math.round(diffMs / divisor);
      try {
        return formatter.format(value, unit);
      } catch (error) {
        console.warn('Failed to format relative timestamp', error);
        return '';
      }
    }
    
    function formatStatusTimestamp(date, lang, langTexts) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      const absolute = formatAbsoluteTimestamp(date, lang);
      const relative = formatRelativeTimestamp(date, lang);
      if (relative) {
        const template = langTexts.storageStatusTimestamp
          || texts.en?.storageStatusTimestamp
          || '{relative} ({absolute})';
        return template.replace('{relative}', relative).replace('{absolute}', absolute);
      }
      const fallbackTemplate = langTexts.storageStatusTimestampAbsolute
        || texts.en?.storageStatusTimestampAbsolute
        || '{absolute}';
      return fallbackTemplate.replace('{absolute}', absolute);
    }
    
    function applyStorageStatus(element, info, lang, langTexts, hasAny) {
      if (!element) return;
      if (info && info.date instanceof Date && !Number.isNaN(info.date.getTime())) {
        const timeText = formatStatusTimestamp(info.date, lang, langTexts);
        const display = info.name
          ? (langTexts.storageStatusWithName || texts.en?.storageStatusWithName || '{name} — {time}')
              .replace('{name}', info.name)
              .replace('{time}', timeText)
          : timeText;
        element.textContent = display;
        if (display) {
          element.setAttribute('data-help', display);
        } else {
          element.removeAttribute('data-help');
        }
        const absolute = formatAbsoluteTimestamp(info.date, lang);
        if (absolute) {
          element.setAttribute('title', absolute);
        } else {
          element.removeAttribute('title');
        }
        return;
      }
      if (hasAny) {
        const fallback = langTexts.storageStatusStoredWithoutTimestamp
          || texts.en?.storageStatusStoredWithoutTimestamp
          || langTexts.storageStatusNever
          || texts.en?.storageStatusNever
          || '';
        element.textContent = fallback;
        if (fallback) {
          element.setAttribute('data-help', fallback);
        } else {
          element.removeAttribute('data-help');
        }
        element.removeAttribute('title');
        return;
      }
      const emptyText = langTexts.storageStatusNever
        || texts.en?.storageStatusNever
        || '';
      element.textContent = emptyText;
      if (emptyText) {
        element.setAttribute('data-help', emptyText);
      } else {
        element.removeAttribute('data-help');
      }
      element.removeAttribute('title');
    }
    
    function createSummaryItemElement(item) {
      const li = document.createElement('li');
      li.className = 'storage-summary-item';
      const header = document.createElement('div');
      header.className = 'storage-summary-header';
      const label = document.createElement('span');
      label.className = 'storage-summary-label';
      label.textContent = item.label;
      header.appendChild(label);
      if (item.storageKey) {
        const code = document.createElement('code');
        code.className = 'storage-summary-key';
        code.textContent = item.storageKey;
        header.appendChild(code);
      }
      li.appendChild(header);
      if (item.value) {
        const valueElem = document.createElement('p');
        valueElem.className = 'storage-summary-value';
        valueElem.textContent = item.value;
        li.appendChild(valueElem);
      }
      if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'storage-summary-description';
        desc.textContent = item.description;
        li.appendChild(desc);
      }
      if (item.extra) {
        const extras = Array.isArray(item.extra) ? item.extra : [item.extra];
        extras.filter(Boolean).forEach((text) => {
          const extraElem = document.createElement('p');
          extraElem.className = 'storage-summary-extra';
          extraElem.textContent = text;
          li.appendChild(extraElem);
        });
      }
      return li;
    }
    
    function readCriticalStorageGuardResult() {
      const tryInvoke = (fn) => {
        if (typeof fn !== 'function') {
          return null;
        }
        try {
          return fn();
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to read critical storage guard result', invokeError);
          }
          return null;
        }
      };
    
      const direct = (typeof getLastCriticalStorageGuardResult === 'function')
        ? tryInvoke(() => getLastCriticalStorageGuardResult())
        : null;
      if (direct && typeof direct === 'object') {
        return direct;
      }
    
      const scopeCandidates = [
        CORE_SHARED_SCOPE_PART2,
        CORE_SHARED_LOCAL,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
      ];
    
      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        const candidate = scope.__cineCriticalStorageGuard || scope.cineCriticalStorageGuard;
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      }
    
      return null;
    }
    
    function updateStorageSummary() {
      if (!storageSummaryList) return;
      while (storageSummaryList.firstChild) {
        storageSummaryList.removeChild(storageSummaryList.firstChild);
      }
      const lang = resolveLanguageCode(currentLang);
      const langTexts = getLanguageTexts(lang);
      const exportedData = typeof exportAllData === 'function' ? exportAllData() : null;
      const data = isPlainObjectValue(exportedData) ? exportedData : {};
      const setups = isPlainObjectValue(data.setups) ? data.setups : {};
      const projectNames = Object.keys(setups);
      const totalProjects = projectNames.length;
      const autoBackupNames = projectNames.filter((name) => isAutomaticBackupName(name));
      const autoBackups = autoBackupNames.length;
      const manualProjectNames = projectNames.filter((name) => typeof name === 'string' && !isAutomaticBackupName(name));
      const gearListCount = computeGearListCount(data.project, setups);
      const favoritesCount = computeFavoritesCount(data.favorites);
      const feedbackCount = computeFeedbackCount(data.feedback);
      const sessionData = data.session;
      const hasSession = Boolean(
        (isPlainObjectValue(sessionData) && Object.keys(sessionData).length)
        || (Array.isArray(sessionData) && sessionData.length)
        || (typeof sessionData === 'string' && sessionData.trim())
      );
      const deviceSummary = summarizeCustomDevices();
      const approxBytes = estimateBackupSize(data);
      const rawFullBackups = Array.isArray(data.fullBackupHistory)
        ? data.fullBackupHistory
        : Array.isArray(data.fullBackups)
          ? data.fullBackups
          : [];
      const fullBackupCount = rawFullBackups.reduce((count, entry) => {
        if (!entry) return count;
        if (typeof entry === 'string') {
          return entry.trim() ? count + 1 : count;
        }
        if (typeof entry === 'object') {
          const createdAt = typeof entry.createdAt === 'string' ? entry.createdAt.trim() : '';
          const iso = typeof entry.iso === 'string' ? entry.iso.trim() : '';
          const timestamp = typeof entry.timestamp === 'string' ? entry.timestamp.trim() : '';
          if (createdAt || iso || timestamp) {
            return count + 1;
          }
        }
        return count;
      }, 0);
    
      const manualInfo = extractLatestManualSetupInfo(setups);
      const autoInfo = extractLatestAutoBackupInfo(autoBackupNames);
      const fullBackupInfo = extractLatestFullBackupInfo(rawFullBackups);
      const guardResult = readCriticalStorageGuardResult();
      let guardValue = langTexts.storageIntegrityGuardStatus || 'Active';
      if (guardResult && typeof guardResult === 'object') {
        const ensuredCount = Array.isArray(guardResult.ensured) ? guardResult.ensured.length : 0;
        const errorCount = Array.isArray(guardResult.errors) ? guardResult.errors.length : 0;
        const missingCount = Array.isArray(guardResult.skipped)
          ? guardResult.skipped.filter((entry) => entry && entry.reason === 'missing').length
          : 0;
    
        if (errorCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusIssue || '{count} issue(s) — check console')
            .replace('{count}', String(errorCount));
        } else if (ensuredCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusCreated || 'Mirrored {count} key(s) this session')
            .replace('{count}', String(ensuredCount));
        } else if (missingCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusMissing || 'Waiting for first save')
            .replace('{count}', String(missingCount));
        } else if (langTexts.storageIntegrityGuardStatus) {
          guardValue = langTexts.storageIntegrityGuardStatus;
        }
      }
    
      const items = [
        {
          storageKey: 'cameraPowerPlanner_setups',
          label: langTexts.storageKeyProjects || 'Saved projects',
          value: formatCountText(lang, langTexts, 'storageProjectsCount', totalProjects),
          description: langTexts.storageKeyProjectsDesc || '',
        },
        {
          label: langTexts.storageKeyAutoBackups || 'Auto backups',
          value: formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups),
          description: langTexts.storageKeyAutoBackupsDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_project',
          label: langTexts.storageKeyGearLists || 'Gear list snapshots',
          value: formatCountText(lang, langTexts, 'storageGearListsCount', gearListCount),
          description: langTexts.storageKeyGearListsDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_devices',
          label: langTexts.storageKeyDevices || 'Custom or modified devices',
          value: formatCountText(lang, langTexts, 'storageDevicesCount', deviceSummary.total),
          description: langTexts.storageKeyDevicesDesc || '',
          extra: deviceSummary.total > 0 && deviceSummary.categories.length
            ? (langTexts.storageDeviceCategories || texts.en?.storageDeviceCategories || 'Affected categories: %s')
              .replace('%s', formatDeviceCategories(lang, deviceSummary.categories))
            : null,
        },
        {
          storageKey: 'cameraPowerPlanner_favorites',
          label: langTexts.storageKeyFavorites || 'Pinned favorites',
          value: formatCountText(lang, langTexts, 'storageFavoritesCount', favoritesCount),
          description: langTexts.storageKeyFavoritesDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_feedback',
          label: langTexts.storageKeyFeedback || 'Runtime feedback',
          value: formatCountText(lang, langTexts, 'storageFeedbackCount', feedbackCount),
          description: langTexts.storageKeyFeedbackDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_session',
          label: langTexts.storageKeySession || 'Unsaved session',
          value: hasSession
            ? langTexts.storageSessionStored || texts.en?.storageSessionStored || 'Stored'
            : langTexts.storageSessionNotStored || texts.en?.storageSessionNotStored || 'Not stored',
          description: langTexts.storageKeySessionDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_fullBackups',
          label: langTexts.storageKeyFullBackups || 'Full app backups',
          value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
          description: langTexts.storageKeyFullBackupsDesc || '',
        },
        {
          label: langTexts.storageKeyIntegrityGuard || 'Backup guardian',
          value: guardValue,
          description: langTexts.storageKeyIntegrityGuardDesc || '',
        },
        {
          storageKey: 'localStorage',
          label: langTexts.storageKeyTotalSize || 'Approximate backup size',
          value: formatSizeText(lang, langTexts, approxBytes),
          description: langTexts.storageKeyTotalSizeDesc || '',
        },
      ];
    
      items.forEach((item) => {
        storageSummaryList.appendChild(createSummaryItemElement(item));
      });
    
      applyStorageStatus(
        storageStatusLastProjectValue,
        manualInfo,
        lang,
        langTexts,
        manualProjectNames.length > 0,
      );
      applyStorageStatus(
        storageStatusLastAutoBackupValue,
        autoInfo,
        lang,
        langTexts,
        autoBackupNames.length > 0,
      );
      applyStorageStatus(
        storageStatusLastFullBackupValue,
        fullBackupInfo,
        lang,
        langTexts,
        fullBackupCount > 0,
      );
    
      if (storageSummaryEmpty) {
        const hasData = Boolean(
          totalProjects
          || gearListCount
          || deviceSummary.total
          || favoritesCount
          || feedbackCount
          || hasSession
          || fullBackupCount
        );
        if (hasData) {
          storageSummaryEmpty.setAttribute('hidden', '');
        } else {
          storageSummaryEmpty.removeAttribute('hidden');
        }
      }
    }
    
    if (settingsLogo) {
      settingsLogo.addEventListener('change', () => {
        const file = settingsLogo.files && settingsLogo.files[0];
        if (!file) {
          loadStoredLogoPreview();
          return;
        }
        if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
          showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
          settingsLogo.value = '';
          loadStoredLogoPreview();
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          renderSettingsLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
    var settingsHighContrast = document.getElementById("settingsHighContrast");
    const settingsReduceMotion = document.getElementById("settingsReduceMotion");
    const settingsRelaxedSpacing = document.getElementById("settingsRelaxedSpacing");
    var backupSettings = document.getElementById("backupSettings");
    var restoreSettings = document.getElementById("restoreSettings");
    var factoryResetButton = document.getElementById("factoryResetButton");
    var restoreSettingsInput = document.getElementById("restoreSettingsInput");
    const restoreRehearsalButton = document.getElementById("restoreRehearsalButton");
    const restoreRehearsalSection = document.getElementById("restoreRehearsalSection");
    const restoreRehearsalHeading = document.getElementById("restoreRehearsalHeading");
    const restoreRehearsalIntro = document.getElementById("restoreRehearsalIntro");
    const restoreRehearsalModeLabel = document.getElementById("restoreRehearsalModeLabel");
    const restoreRehearsalModeBackupText = document.getElementById("restoreRehearsalModeBackupText");
    const restoreRehearsalModeProjectText = document.getElementById("restoreRehearsalModeProjectText");
    const restoreRehearsalFileLabel = document.getElementById("restoreRehearsalFileLabel");
    const restoreRehearsalBrowse = document.getElementById("restoreRehearsalBrowse");
    const restoreRehearsalFileName = document.getElementById("restoreRehearsalFileName");
    const restoreRehearsalStatus = document.getElementById("restoreRehearsalStatus");
    const restoreRehearsalRuleHeading = document.getElementById("restoreRehearsalRuleHeading");
    const restoreRehearsalRuleIntro = document.getElementById("restoreRehearsalRuleIntro");
    const restoreRehearsalRuleEmpty = document.getElementById("restoreRehearsalRuleEmpty");
    const restoreRehearsalProceedButton = document.getElementById("restoreRehearsalProceed");
    const restoreRehearsalAbortButton = document.getElementById("restoreRehearsalAbort");
    const restoreRehearsalTable = document.getElementById("restoreRehearsalTable");
    const restoreRehearsalTableCaption = document.getElementById("restoreRehearsalTableCaption");
    const restoreRehearsalMetricHeader = document.getElementById("restoreRehearsalMetricHeader");
    const restoreRehearsalLiveHeader = document.getElementById("restoreRehearsalLiveHeader");
    const restoreRehearsalSandboxHeader = document.getElementById("restoreRehearsalSandboxHeader");
    const restoreRehearsalDifferenceHeader = document.getElementById("restoreRehearsalDifferenceHeader");
    const restoreRehearsalCloseButton = document.getElementById("restoreRehearsalClose");
    const projectBackupsHeading = document.getElementById("projectBackupsHeading");
    const projectBackupsDescription = document.getElementById("projectBackupsDescription");
    var settingsShowAutoBackups = document.getElementById("settingsShowAutoBackups");
    var backupDiffToggleButton = document.getElementById("backupDiffToggleButton");
    var backupDiffSection = document.getElementById("backupDiffSection");
    var backupDiffHeading = document.getElementById("backupDiffHeading");
    var backupDiffIntro = document.getElementById("backupDiffIntro");
    var backupDiffPrimaryLabel = document.getElementById("backupDiffPrimaryLabel");
    var backupDiffSecondaryLabel = document.getElementById("backupDiffSecondaryLabel");
    var backupDiffPrimarySelect = document.getElementById("backupDiffPrimary");
    var backupDiffSecondarySelect = document.getElementById("backupDiffSecondary");
    var backupDiffEmptyState = document.getElementById("backupDiffEmptyState");
    var backupDiffSummary = document.getElementById("backupDiffSummary");
    var backupDiffList = document.getElementById("backupDiffList");
    var backupDiffListContainer = document.getElementById("backupDiffListContainer");
    var backupDiffNotesLabel = document.getElementById("backupDiffNotesLabel");
    var backupDiffNotes = document.getElementById("backupDiffNotes");
    var backupDiffExportButton = document.getElementById("backupDiffExport");
    var backupDiffCloseButton = document.getElementById("backupDiffClose");
    const aboutVersionElem = document.getElementById("aboutVersion");
    const supportLink = document.getElementById("supportLink");
    var settingsSave    = document.getElementById("settingsSave");
    var settingsCancel  = document.getElementById("settingsCancel");
    var featureSearch =
      typeof document !== 'undefined' ? document.getElementById("featureSearch") : null;
    var featureList =
      typeof document !== 'undefined' ? document.getElementById("featureList") : null;
    var featureSearchDropdown =
      typeof document !== 'undefined' ? document.getElementById("featureSearchDropdown") : null;
    var featureMap      = new Map();
    const featureSearchEntryIndex = new Map();
    const FEATURE_SEARCH_HISTORY_STORAGE_KEY = 'featureSearchHistory';
    const MAX_FEATURE_SEARCH_HISTORY = 50;
    const MAX_FEATURE_SEARCH_RECENTS = 5;
    let featureSearchHistoryLoaded = false;
    const featureSearchHistory = new Map();
    let featureSearchHistorySaveTimer = null;
    
    const getFeatureSearchHistoryStorage = () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage;
        }
        if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
          return globalThis.localStorage;
        }
      } catch (err) {
        console.warn('Feature search history storage unavailable', err);
      }
      return null;
    };
    
    const buildFeatureSearchHistoryKey = (id, type = 'feature') => {
      if (!id) return '';
      return `${type}:${id}`;
    };
    
    const scheduleFeatureSearchHistorySave = () => {
      if (featureSearchHistorySaveTimer != null) {
        return;
      }
      const storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.setItem !== 'function') {
        return;
      }
      featureSearchHistorySaveTimer = setTimeout(() => {
        featureSearchHistorySaveTimer = null;
        try {
          const data = Array.from(featureSearchHistory.values())
            .slice()
            .sort((a, b) => b.lastUsed - a.lastUsed)
            .map(item => ({
              key: item.id,
              type: item.type,
              count: item.count,
              lastUsed: item.lastUsed,
              label: item.label,
            }));
          storage.setItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.warn('Could not persist feature search history', error);
        }
      }, 200);
    };
    
    const trimFeatureSearchHistory = () => {
      if (featureSearchHistory.size <= MAX_FEATURE_SEARCH_HISTORY) return;
      const entries = Array.from(featureSearchHistory.entries()).sort((a, b) => a[1].lastUsed - b[1].lastUsed);
      const excess = entries.length - MAX_FEATURE_SEARCH_HISTORY;
      for (let i = 0; i < excess; i += 1) {
        featureSearchHistory.delete(entries[i][0]);
      }
    };
    
    const loadFeatureSearchHistory = () => {
      if (featureSearchHistoryLoaded) return;
      featureSearchHistoryLoaded = true;
      const storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.getItem !== 'function') {
        return;
      }
      let raw = null;
      try {
        raw = storage.getItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY);
      } catch (err) {
        console.warn('Could not read feature search history', err);
        return;
      }
      if (!raw) return;
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.warn('Invalid feature search history payload', err);
        return;
      }
      if (!Array.isArray(parsed)) return;
      parsed.forEach(item => {
        if (!item || typeof item !== 'object') return;
        const id = typeof item.id === 'string'
          ? item.id
          : typeof item.key === 'string'
            ? item.key
            : null;
        const type = typeof item.type === 'string' ? item.type : 'feature';
        const combinedKey = buildFeatureSearchHistoryKey(id, type);
        if (!combinedKey) return;
        const count = Number.isFinite(item.count) && item.count > 0
          ? Math.min(Math.floor(item.count), 1_000_000)
          : 0;
        const lastUsed = Number.isFinite(item.lastUsed) ? item.lastUsed : 0;
        const label = typeof item.label === 'string' ? item.label : '';
        featureSearchHistory.set(combinedKey, {
          key: combinedKey,
          id,
          type,
          count,
          lastUsed,
          label,
        });
      });
      trimFeatureSearchHistory();
    };
    
    const cleanupFeatureSearchHistory = () => {
      let changed = false;
      for (const key of featureSearchHistory.keys()) {
        if (!featureSearchEntryIndex.has(key)) {
          featureSearchHistory.delete(key);
          changed = true;
        }
      }
      if (changed) {
        scheduleFeatureSearchHistorySave();
      }
    };
    
    const getFeatureSearchHistoryData = (key, type) => {
      if (!key) return null;
      loadFeatureSearchHistory();
      const combinedKey = buildFeatureSearchHistoryKey(key, type);
      return featureSearchHistory.get(combinedKey) || null;
    };
    
    const registerFeatureSearchUsage = (id, type = 'feature', label = '') => {
      if (!id) return;
      loadFeatureSearchHistory();
      const normalizedType = typeof type === 'string' && type ? type : 'feature';
      const combinedKey = buildFeatureSearchHistoryKey(id, normalizedType);
      const now = Date.now ? Date.now() : new Date().getTime();
      const existing = featureSearchHistory.get(combinedKey);
      const next = {
        key: combinedKey,
        id,
        type: normalizedType,
        count: existing ? Math.min(existing.count + 1, 1_000_000) : 1,
        lastUsed: now,
        label: label || existing?.label || '',
      };
      featureSearchHistory.set(combinedKey, next);
      trimFeatureSearchHistory();
      scheduleFeatureSearchHistorySave();
    };
    
    const resolveRecentFeatureSearchOptions = () => {
      loadFeatureSearchHistory();
      if (!featureSearchHistory.size) return [];
      const entries = Array.from(featureSearchHistory.values())
        .slice()
        .sort((a, b) => b.lastUsed - a.lastUsed);
      const options = [];
      const seen = new Set();
      for (const item of entries) {
        if (!item || !item.key) continue;
        const entry = featureSearchEntryIndex.get(item.key);
        if (!entry) continue;
        const option = buildFeatureSearchOptionData(entry);
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        options.push(option);
        if (options.length >= MAX_FEATURE_SEARCH_RECENTS) break;
      }
      return options;
    };
    
    var normalizeSearchValue = value =>
      typeof value === 'string' ? value.trim().toLowerCase() : '';
    const FEATURE_SEARCH_EXTRA_SELECTOR = '[data-feature-search]';
    
    const FEATURE_SEARCH_TYPE_LABEL_KEYS = {
      feature: 'featureSearchTypeFeature',
      action: 'featureSearchTypeAction',
      device: 'featureSearchTypeDevice',
      help: 'featureSearchTypeHelp'
    };
    
    const getFeatureSearchEntryType = element => {
      if (!element) return 'feature';
      const explicit =
        element.dataset?.featureSearchType ||
        element.getAttribute('data-feature-search-type');
      if (explicit && explicit.trim()) {
        return explicit.trim().toLowerCase();
      }
      const tagName = element.tagName ? element.tagName.toLowerCase() : '';
      const role = element.getAttribute('role')?.toLowerCase() || '';
      if (tagName === 'button') return 'action';
      if (tagName === 'a' && element.hasAttribute('href')) return 'action';
      if (tagName === 'input') {
        const type = element.getAttribute('type')?.toLowerCase();
        if (type && ['button', 'submit', 'reset', 'image'].includes(type)) {
          return 'action';
        }
      }
      if (role === 'button' || role === 'menuitem') return 'action';
      return 'feature';
    };
    
    const getFeatureSearchLabel = element => {
      if (!element) return '';
      const { dataset } = element;
      const dataLabel = dataset?.featureSearchLabel || element.getAttribute('data-feature-search-label');
      if (dataLabel && dataLabel.trim()) return dataLabel.trim();
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();
      const title = element.getAttribute('title');
      if (title && title.trim()) return title.trim();
      const text = element.textContent;
      return text && text.trim() ? text.trim() : '';
    };
    
    const getFeatureSearchKeywords = element => {
      if (!element) return '';
      const { dataset } = element;
      const dataValue = dataset?.featureSearchKeywords || element.getAttribute('data-feature-search-keywords');
      return dataValue && dataValue.trim() ? dataValue.trim() : '';
    };
    
    var updateFeatureSearchValue = (newValue, originalNormalized) => {
      if (!featureSearch || typeof newValue !== 'string') return;
      const trimmed = newValue.trim();
      if (!trimmed) {
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        return;
      }
      if (originalNormalized && trimmed.toLowerCase() === originalNormalized) {
        return;
      }
      featureSearch.value = newValue;
      restoreFeatureSearchDefaults();
    };
    var helpMap         = new Map();
    var deviceMap       = new Map();
    var runFeatureSearch = () => {};
    
    var featureSearchEntries = [];
    var featureSearchDefaultOptions = [];
    var recordFeatureSearchUsage = (id, type, label) => {
      registerFeatureSearchUsage(id, type, label);
    };
    
    let featureSearchHighlightTokens = [];
    
    const sanitizeFeatureSearchHighlightTokens = tokens => {
      if (!Array.isArray(tokens) || tokens.length === 0) {
        return [];
      }
      const seen = new Set();
      const sanitized = [];
      tokens.forEach(token => {
        if (typeof token !== 'string') return;
        const trimmed = token.trim().toLowerCase();
        if (!trimmed) return;
        if (trimmed.length < 2 && !/^\d+$/.test(trimmed)) return;
        if (seen.has(trimmed)) return;
        seen.add(trimmed);
        sanitized.push(trimmed);
      });
      return sanitized;
    };
    
    const updateFeatureSearchHighlightTokens = tokens => {
      featureSearchHighlightTokens = sanitizeFeatureSearchHighlightTokens(tokens);
    };
    
    const collectFeatureSearchHighlightRanges = (text, tokens) => {
      if (!text || !tokens.length) {
        return [];
      }
      const lower = text.toLowerCase();
      const ranges = [];
      tokens.forEach(token => {
        const length = token.length;
        if (!length) return;
        let index = 0;
        while (index < lower.length) {
          const found = lower.indexOf(token, index);
          if (found === -1) break;
          ranges.push({ start: found, end: found + length });
          index = found + length;
        }
      });
      if (!ranges.length) {
        return [];
      }
      ranges.sort((a, b) => (a.start - b.start) || (b.end - a.end));
      const merged = [];
      for (const range of ranges) {
        const last = merged[merged.length - 1];
        if (last && range.start <= last.end) {
          last.end = Math.max(last.end, range.end);
        } else {
          merged.push({ start: range.start, end: range.end });
        }
      }
      return merged;
    };
    
    const applyFeatureSearchHighlight = (element, text) => {
      if (!element) return;
      const content = typeof text === 'string' ? text : '';
      if (!content) {
        element.textContent = '';
        return;
      }
      const tokens = featureSearchHighlightTokens;
      if (!Array.isArray(tokens) || tokens.length === 0) {
        element.textContent = content;
        return;
      }
      const ranges = collectFeatureSearchHighlightRanges(content, tokens);
      if (!ranges.length) {
        element.textContent = content;
        return;
      }
      const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
      if (!doc) {
        element.textContent = content;
        return;
      }
      element.textContent = '';
      let position = 0;
      ranges.forEach(range => {
        if (range.start > position) {
          element.appendChild(doc.createTextNode(content.slice(position, range.start)));
        }
        const mark = doc.createElement('mark');
        mark.className = 'feature-search-highlight';
        mark.textContent = content.slice(range.start, range.end);
        element.appendChild(mark);
        position = range.end;
      });
      if (position < content.length) {
        element.appendChild(doc.createTextNode(content.slice(position)));
      }
    };
    
    const FEATURE_SEARCH_DETAIL_MAX_LENGTH = 140;
    
    const normalizeFeatureSearchDetail = text => {
      if (typeof text !== 'string') return '';
      const normalized = text.replace(/\s+/g, ' ').trim();
      if (!normalized) return '';
      if (normalized.length <= FEATURE_SEARCH_DETAIL_MAX_LENGTH) {
        return normalized;
      }
      return `${normalized.slice(0, FEATURE_SEARCH_DETAIL_MAX_LENGTH - 1).trimEnd()}…`;
    };
    
    const buildFeatureSearchOptionData = entry => {
      if (!entry) return null;
      const value = typeof entry === 'string' ? entry : entry.display;
      if (!value) return null;
      const baseLabel =
        typeof entry === 'string'
          ? entry
          : entry.optionLabel || entry.display || '';
      const type = typeof entry === 'string' ? 'feature' : entry.type || 'feature';
      const typeKey = FEATURE_SEARCH_TYPE_LABEL_KEYS[type];
      const typeLabel = typeKey ? getLocalizedText(typeKey) : '';
      const detail =
        typeof entry === 'object' && entry !== null
          ? normalizeFeatureSearchDetail(entry.detail)
          : '';
      let label = typeLabel ? `${typeLabel} · ${baseLabel}` : baseLabel || value;
      if (detail) {
        label = `${label} — ${detail}`;
      }
      if (!label || label === value) {
        return { value, label: label || value };
      }
      return { value, label };
    };
    
    const normalizeFeatureSearchOption = value => {
      if (!value) return null;
      if (typeof value === 'object') {
        const optionValue = value.value || value.display || '';
        if (!optionValue) return null;
        const optionLabel = value.label || value.optionLabel || optionValue;
        return { value: optionValue, label: optionLabel };
      }
      if (typeof value === 'string') {
        return { value, label: value };
      }
      return null;
    };
    
    const getFeatureSearchContainer = () => {
      if (!featureSearchDropdown || typeof featureSearchDropdown.closest !== 'function') {
        return null;
      }
      return featureSearchDropdown.closest('.feature-search');
    };
    
    const setFeatureSearchDropdownOpenClass = open => {
      const container = getFeatureSearchContainer();
      if (!container) return;
      if (open) {
        container.classList.add('feature-search-open');
      } else {
        container.classList.remove('feature-search-open');
      }
    };
    
    const renderFeatureSearchDropdown = options => {
      if (!featureSearchDropdown) return;
      featureSearchDropdown.innerHTML = '';
    
      if (!Array.isArray(options) || options.length === 0) {
        featureSearchDropdown.dataset.count = '0';
        featureSearchDropdown.dataset.open = 'false';
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
        return;
      }
    
      const list = document.createElement('div');
      list.className = 'feature-search-dropdown-list';
    
      options.forEach((option, index) => {
        if (!option || !option.value) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'feature-search-option';
        button.setAttribute('role', 'option');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        button.setAttribute('data-value', option.value);
        button.setAttribute('aria-label', option.label || option.value);
    
        const labelSpan = document.createElement('span');
        labelSpan.className = 'feature-search-option-label';
        const labelText = option.label || option.value;
        applyFeatureSearchHighlight(labelSpan, labelText);
        button.appendChild(labelSpan);
    
        const normalizedLabel = (labelText || '').trim().toLowerCase();
        const normalizedValue = option.value.trim().toLowerCase();
        if (normalizedValue && normalizedLabel && normalizedValue !== normalizedLabel) {
          const valueSpan = document.createElement('span');
          valueSpan.className = 'feature-search-option-value';
          applyFeatureSearchHighlight(valueSpan, option.value);
          button.appendChild(valueSpan);
        }
    
        list.appendChild(button);
      });
    
      featureSearchDropdown.appendChild(list);
      featureSearchDropdown.dataset.count = String(options.length);
      featureSearchDropdown.dataset.activeIndex = '';
    
      if (featureSearchDropdown.dataset.open === 'true') {
        featureSearchDropdown.hidden = false;
        featureSearchDropdown.setAttribute('aria-expanded', 'true');
        setFeatureSearchDropdownOpenClass(true);
      } else {
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
      }
    };
    
    const renderFeatureListOptions = values => {
      if (!Array.isArray(values)) {
        if (featureList) {
          featureList.innerHTML = '';
        }
        renderFeatureSearchDropdown([]);
        return;
      }
    
      const normalized = [];
      const fragment = featureList ? document.createDocumentFragment() : null;
    
      for (const value of values) {
        const optionData = normalizeFeatureSearchOption(value);
        if (!optionData || !optionData.value) continue;
        normalized.push(optionData);
        if (!fragment) continue;
        const option = document.createElement('option');
        option.value = optionData.value;
        const optionLabel = optionData.label || '';
        if (optionLabel) {
          option.label = optionLabel;
          option.textContent = optionLabel;
        } else {
          option.textContent = optionData.value;
        }
        fragment.appendChild(option);
      }
    
      if (featureList) {
        featureList.innerHTML = '';
        featureList.appendChild(fragment);
      }
    
      renderFeatureSearchDropdown(normalized);
    };
    
    const FEATURE_SEARCH_MAX_RESULTS = 40;
    
    function restoreFeatureSearchDefaults() {
      updateFeatureSearchHighlightTokens([]);
      const values = [];
      const seen = new Set();
      const recentOptions = resolveRecentFeatureSearchOptions();
      for (const option of recentOptions) {
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        values.push(option);
      }
      for (const option of featureSearchDefaultOptions) {
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        values.push(option);
      }
      renderFeatureListOptions(values.length ? values : featureSearchDefaultOptions);
    }
    
    const FEATURE_SEARCH_MATCH_PRIORITIES = {
      none: 0,
      fuzzy: 1,
      partial: 2,
      keySubset: 3,
      keyPrefix: 4,
      token: 5,
      exactKey: 6
    };
    
    const FEATURE_SEARCH_TYPE_PRIORITIES = {
      feature: 3,
      action: 4,
      device: 3,
      help: 1
    };
    
    const FEATURE_SEARCH_FILTER_ALIASES = new Map([
      ['feature', 'feature'],
      ['features', 'feature'],
      ['setting', 'feature'],
      ['settings', 'feature'],
      ['action', 'action'],
      ['actions', 'action'],
      ['command', 'action'],
      ['commands', 'action'],
      ['device', 'device'],
      ['devices', 'device'],
      ['gear', 'device'],
      ['equipment', 'device'],
      ['help', 'help'],
      ['doc', 'help'],
      ['docs', 'help'],
      ['guide', 'help'],
      ['guides', 'help'],
      ['support', 'help']
    ]);
    
    const FEATURE_SEARCH_FILTER_STRIP_PATTERN = /^[\s:> /=\-?,.]+/;
    
    const extractFeatureSearchFilter = query => {
      if (typeof query !== 'string') {
        return { filterType: null, queryText: '' };
      }
      const trimmed = query.trim();
      if (!trimmed) {
        return { filterType: null, queryText: '' };
      }
      const match = trimmed.match(/^([a-z]+)/i);
      if (!match) {
        return { filterType: null, queryText: trimmed };
      }
      const alias = match[1].toLowerCase();
      const filterType = FEATURE_SEARCH_FILTER_ALIASES.get(alias) || null;
      if (!filterType) {
        return { filterType: null, queryText: trimmed };
      }
      const remainderRaw = trimmed.slice(match[0].length);
      if (!remainderRaw) {
        return { filterType, queryText: '' };
      }
      const remainder = remainderRaw.replace(FEATURE_SEARCH_FILTER_STRIP_PATTERN, '').trim();
      return { filterType, queryText: remainder };
    };
    
    function scoreFeatureSearchEntry(entry, queryKey, queryTokens) {
      if (!entry || !entry.key) return null;
      const display = entry.display;
      if (!display) return null;
      const entryKey = entry.key;
      const entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
      const primaryTokens = Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [];
      const validQueryTokens = Array.isArray(queryTokens)
        ? queryTokens.filter(Boolean)
        : [];
      const tokenDetails = validQueryTokens.length
        ? computeTokenMatchDetails(entryTokens, validQueryTokens)
        : { score: 0, matched: 0 };
      const primaryTokenDetails = validQueryTokens.length
        ? computeTokenMatchDetails(primaryTokens, validQueryTokens)
        : { score: 0, matched: 0 };
      const entryType = entry.type || 'feature';
      const history = getFeatureSearchHistoryData(entryKey, entryType);
      const historyCount = history?.count || 0;
      const historyLastUsed = history?.lastUsed || 0;
      const queryTokenCount = validQueryTokens.length;
      const allTokensMatched =
        queryTokenCount > 0 && tokenDetails.matched >= queryTokenCount;
    
      let bestType = 'none';
      let bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
      let fuzzyDistance = Number.POSITIVE_INFINITY;
      const updateType = type => {
        const priority = FEATURE_SEARCH_MATCH_PRIORITIES[type] || FEATURE_SEARCH_MATCH_PRIORITIES.none;
        if (priority > bestPriority) {
          bestType = type;
          bestPriority = priority;
        }
      };
    
      if (queryKey) {
        if (entryKey === queryKey) {
          updateType('exactKey');
        }
        if (entryKey.startsWith(queryKey)) {
          updateType('keyPrefix');
        }
        if (queryKey.startsWith(entryKey)) {
          updateType('keySubset');
        }
        if (entryKey.includes(queryKey) || queryKey.includes(entryKey)) {
          updateType('partial');
        }
      }
    
      if (tokenDetails.score > 0) {
        updateType('token');
      }
    
      if (bestPriority === FEATURE_SEARCH_MATCH_PRIORITIES.none && queryKey && entryKey) {
        const distance = computeLevenshteinDistance(entryKey, queryKey);
        if (isAcceptableFuzzyMatch(entryKey, queryKey, distance)) {
          fuzzyDistance = distance;
          updateType('fuzzy');
        }
      }
    
      return {
        entry,
        entryType,
        typePriority: FEATURE_SEARCH_TYPE_PRIORITIES[entryType] || 0,
        allTokensMatched,
        matchType: bestType,
        priority: bestPriority,
        tokenScore: tokenDetails.score,
        tokenMatches: tokenDetails.matched,
        primaryTokenScore: primaryTokenDetails.score,
        primaryTokenMatches: primaryTokenDetails.matched,
        fuzzyDistance,
        keyDistance: queryKey
          ? Math.abs(entryKey.length - queryKey.length)
          : Number.POSITIVE_INFINITY,
        keyLength: entryKey.length,
        historyCount,
        historyLastUsed
      };
    }
    
    const compareFeatureSearchCandidates = (a, b) => {
      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (Number(b.allTokensMatched) !== Number(a.allTokensMatched)) {
        return Number(b.allTokensMatched) - Number(a.allTokensMatched);
      }
      const aPrimaryScore = typeof a.primaryTokenScore === 'number' ? a.primaryTokenScore : 0;
      const bPrimaryScore = typeof b.primaryTokenScore === 'number' ? b.primaryTokenScore : 0;
      if (bPrimaryScore !== aPrimaryScore) {
        return bPrimaryScore - aPrimaryScore;
      }
      const aPrimaryMatches = typeof a.primaryTokenMatches === 'number' ? a.primaryTokenMatches : 0;
      const bPrimaryMatches = typeof b.primaryTokenMatches === 'number' ? b.primaryTokenMatches : 0;
      if (bPrimaryMatches !== aPrimaryMatches) {
        return bPrimaryMatches - aPrimaryMatches;
      }
      if (b.tokenScore !== a.tokenScore) return b.tokenScore - a.tokenScore;
      if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches;
      if (b.typePriority !== a.typePriority) return b.typePriority - a.typePriority;
      if (b.historyCount !== a.historyCount) return b.historyCount - a.historyCount;
      if (b.historyLastUsed !== a.historyLastUsed) {
        return b.historyLastUsed - a.historyLastUsed;
      }
      if (
        a.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy &&
        b.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy &&
        a.fuzzyDistance !== b.fuzzyDistance
      ) {
        return a.fuzzyDistance - b.fuzzyDistance;
      }
      if (a.keyDistance !== b.keyDistance) return a.keyDistance - b.keyDistance;
      if (a.keyLength !== b.keyLength) return a.keyLength - b.keyLength;
      const aLabel = a.entry?.display || '';
      const bLabel = b.entry?.display || '';
      return aLabel.localeCompare(bLabel, undefined, { sensitivity: 'base' });
    };
    
    function renderFeatureSearchFilteredDefaults(filterType) {
      if (!filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
      const filteredEntries = featureSearchEntries.filter(
        entry => (entry?.type || 'feature') === filterType
      );
      if (!filteredEntries.length) {
        renderFeatureListOptions([]);
        return;
      }
      const scored = filteredEntries
        .map(entry => scoreFeatureSearchEntry(entry, '', []))
        .filter(Boolean)
        .sort(compareFeatureSearchCandidates);
      const values = [];
      const seen = new Set();
      for (const item of scored) {
        if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
        const optionData = buildFeatureSearchOptionData(item.entry);
        if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
        seen.add(optionData.value);
        values.push(optionData);
      }
      if (values.length === 0) {
        const fallback = filteredEntries
          .slice()
          .sort((a, b) =>
            (a.display || '').localeCompare(b.display || '', undefined, { sensitivity: 'base' })
          );
        for (const entry of fallback) {
          if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
          const optionData = buildFeatureSearchOptionData(entry);
          if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
          seen.add(optionData.value);
          values.push(optionData);
        }
      }
      renderFeatureListOptions(values);
    }
    
    function updateFeatureSearchSuggestions(query) {
      const raw = typeof query === 'string' ? query : '';
      const rawTrimmed = raw.trim();
      const { filterType, queryText } = extractFeatureSearchFilter(rawTrimmed);
      const trimmed = queryText.trim();
    
      if (!trimmed && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
    
      const highlightSegments = trimmed
        ? trimmed.split(/[^a-z0-9]+/i).filter(Boolean)
        : [];
      const queryKey = trimmed ? searchKey(trimmed) : '';
      const queryTokens = trimmed ? searchTokens(trimmed) : [];
      updateFeatureSearchHighlightTokens([...highlightSegments, ...queryTokens]);
      const entries = filterType
        ? featureSearchEntries.filter(entry => (entry?.type || 'feature') === filterType)
        : featureSearchEntries;
    
      if (entries.length === 0) {
        renderFeatureListOptions([]);
        return;
      }
      if (!queryKey && (!Array.isArray(queryTokens) || queryTokens.length === 0) && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
    
      const scored = entries
        .map(entry => scoreFeatureSearchEntry(entry, queryKey, queryTokens))
        .filter(Boolean);
    
      if (scored.length === 0) {
        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }
    
      const meaningful = trimmed
        ? scored.filter(
            item =>
              item.priority > FEATURE_SEARCH_MATCH_PRIORITIES.none ||
              item.tokenScore > 0 ||
              item.primaryTokenScore > 0
          )
        : [];
    
      const candidates = (meaningful.length > 0 ? meaningful : scored).sort(
        compareFeatureSearchCandidates
      );
    
      const values = [];
      const seen = new Set();
      for (const item of candidates) {
        if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
        const optionData = buildFeatureSearchOptionData(item.entry);
        if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
        seen.add(optionData.value);
        values.push(optionData);
      }
    
    
      if (values.length === 0) {
        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }
    
      renderFeatureListOptions(values);
    }
    // Normalise strings for search comparisons by removing punctuation, diacritics
    // and treating symbols like “&”/“+” as their word equivalents. British and
    // American spelling variants are folded together so queries like “favourites”
    // still match “Favorites”. Falls back to whitespace-stripping when no
    // meaningful characters remain (e.g. emoji-only headings) so legacy behaviour
    // is preserved for those edge cases.
    const ROMAN_NUMERAL_VALUES = {
      i: 1,
      v: 5,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000
    };
    
    const ROMAN_NUMERAL_PATTERN = /^[ivxlcdm]+$/;
    
    const parseMarkSuffix = value => {
      if (!value) {
        return { cleaned: '', number: null };
      }
      const cleaned = value.replace(/[^a-z0-9]+/g, '');
      if (!cleaned) {
        return { cleaned: '', number: null };
      }
      let number = null;
      if (/^\d+$/.test(cleaned)) {
        number = parseInt(cleaned, 10);
      } else if (ROMAN_NUMERAL_PATTERN.test(cleaned)) {
        let total = 0;
        let prev = 0;
        for (let i = cleaned.length - 1; i >= 0; i -= 1) {
          const char = cleaned[i];
          const current = ROMAN_NUMERAL_VALUES[char];
          if (!current) {
            total = 0;
            break;
          }
          if (current < prev) {
            total -= current;
          } else {
            total += current;
            prev = current;
          }
        }
        if (total > 0) {
          number = total;
        }
      }
      return { cleaned, number };
    };
    
    var normaliseMarkVariants = str =>
      str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g, (_match, _prefix, rawValue) => {
        const { cleaned, number } = parseMarkSuffix(rawValue);
        if (!cleaned) return 'mk';
        const suffix = number != null ? String(number) : cleaned;
        return `mk${suffix}`;
      });
    
    const UNICODE_FRACTIONS = new Map([
      ['¼', '1/4'],
      ['½', '1/2'],
      ['¾', '3/4'],
      ['⅓', '1/3'],
      ['⅔', '2/3'],
      ['⅕', '1/5'],
      ['⅖', '2/5'],
      ['⅗', '3/5'],
      ['⅘', '4/5'],
      ['⅙', '1/6'],
      ['⅚', '5/6'],
      ['⅛', '1/8'],
      ['⅜', '3/8'],
      ['⅝', '5/8'],
      ['⅞', '7/8'],
      ['⅑', '1/9'],
      ['⅒', '1/10'],
      ['⅐', '1/7']
    ]);
    
    const UNICODE_FRACTION_PATTERN =
      UNICODE_FRACTIONS.size > 0
        ? new RegExp(`[${Array.from(UNICODE_FRACTIONS.keys()).join('')}]`, 'g')
        : null;
    
    const normalizeUnicodeFractions = (str) => {
      if (!UNICODE_FRACTION_PATTERN || typeof str !== 'string' || !str) {
        return str;
      }
      return str.replace(
        UNICODE_FRACTION_PATTERN,
        match => UNICODE_FRACTIONS.get(match) || match
      );
    };
    
    const NUMBER_WORD_ONES = new Map([
      ['zero', 0],
      ['one', 1],
      ['two', 2],
      ['three', 3],
      ['four', 4],
      ['five', 5],
      ['six', 6],
      ['seven', 7],
      ['eight', 8],
      ['nine', 9],
    ]);
    
    const NUMBER_WORD_TEENS = new Map([
      ['ten', 10],
      ['eleven', 11],
      ['twelve', 12],
      ['thirteen', 13],
      ['fourteen', 14],
      ['fifteen', 15],
      ['sixteen', 16],
      ['seventeen', 17],
      ['eighteen', 18],
      ['nineteen', 19],
    ]);
    
    const NUMBER_WORD_TENS = new Map([
      ['twenty', 20],
      ['thirty', 30],
      ['forty', 40],
      ['fifty', 50],
      ['sixty', 60],
      ['seventy', 70],
      ['eighty', 80],
      ['ninety', 90],
    ]);
    
    const NUMBER_WORD_BASE = new Map([
      ...NUMBER_WORD_ONES,
      ...NUMBER_WORD_TEENS,
      ...NUMBER_WORD_TENS,
    ]);
    
    const NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort(
      (a, b) => b.length - a.length
    );
    
    const NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort(
      (a, b) => b.length - a.length
    );
    
    const NUMBER_WORD_PATTERN =
      NUMBER_WORD_BASE.size > 0
        ? new RegExp(
            `\\b(?:${NUMBER_WORD_BASE_KEYS.join('|')})(?:[\\s-](?:${NUMBER_WORD_ONES_KEYS.join('|')}))?\\b`,
            'g'
          )
        : null;
    
    const normalizeNumberWords = str => {
      if (!NUMBER_WORD_PATTERN || typeof str !== 'string' || !str) {
        return str;
      }
      return str.replace(NUMBER_WORD_PATTERN, match => {
        const lower = match.toLowerCase();
        if (NUMBER_WORD_BASE.has(lower)) {
          return String(NUMBER_WORD_BASE.get(lower));
        }
        const parts = lower.split(/[\s-]+/).filter(Boolean);
        if (parts.length === 2) {
          const tens = NUMBER_WORD_TENS.get(parts[0]);
          const ones = NUMBER_WORD_ONES.get(parts[1]);
          if (typeof tens === 'number' && typeof ones === 'number') {
            return String(tens + ones);
          }
        }
        return match;
      });
    };
    
    const SPELLING_VARIANTS = new Map([
      ['analyse', 'analyze'],
      ['analysed', 'analyzed'],
      ['analyses', 'analyzes'],
      ['analysing', 'analyzing'],
      ['behaviour', 'behavior'],
      ['behaviours', 'behaviors'],
      ['behavioural', 'behavioral'],
      ['behaviourally', 'behaviorally'],
      ['centre', 'center'],
      ['centres', 'centers'],
      ['colour', 'color'],
      ['colourful', 'colorful'],
      ['colouring', 'coloring'],
      ['colourings', 'colorings'],
      ['colourless', 'colorless'],
      ['colours', 'colors'],
      ['customisation', 'customization'],
      ['customisations', 'customizations'],
      ['customise', 'customize'],
      ['customised', 'customized'],
      ['customises', 'customizes'],
      ['customising', 'customizing'],
      ['defence', 'defense'],
      ['defences', 'defenses'],
      ['favour', 'favor'],
      ['favourable', 'favorable'],
      ['favourably', 'favorably'],
      ['favoured', 'favored'],
      ['favourite', 'favorite'],
      ['favourites', 'favorites'],
      ['favouring', 'favoring'],
      ['favours', 'favors'],
      ['licence', 'license'],
      ['licences', 'licenses'],
      ['localisation', 'localization'],
      ['localisations', 'localizations'],
      ['localise', 'localize'],
      ['localised', 'localized'],
      ['localises', 'localizes'],
      ['localising', 'localizing'],
      ['modelling', 'modeling'],
      ['modeller', 'modeler'],
      ['modellers', 'modelers'],
      ['optimisation', 'optimization'],
      ['optimisations', 'optimizations'],
      ['optimise', 'optimize'],
      ['optimised', 'optimized'],
      ['optimises', 'optimizes'],
      ['optimising', 'optimizing'],
      ['organisation', 'organization'],
      ['organisations', 'organizations'],
      ['organise', 'organize'],
      ['organised', 'organized'],
      ['organises', 'organizes'],
      ['organising', 'organizing'],
      ['personalisation', 'personalization'],
      ['personalisations', 'personalizations'],
      ['personalise', 'personalize'],
      ['personalised', 'personalized'],
      ['personalises', 'personalizes'],
      ['personalising', 'personalizing'],
      ['practise', 'practice'],
      ['practised', 'practiced'],
      ['practises', 'practices'],
      ['practising', 'practicing'],
      ['theatre', 'theater'],
      ['theatres', 'theaters'],
      ['traveller', 'traveler'],
      ['travellers', 'travelers'],
      ['travelling', 'traveling']
    ]);
    
    const SPELLING_VARIANT_PATTERN =
      SPELLING_VARIANTS.size > 0
        ? new RegExp(`\\b(${Array.from(SPELLING_VARIANTS.keys()).join('|')})\\b`, 'g')
        : null;
    
    var normalizeSpellingVariants = (str) => {
      if (!SPELLING_VARIANT_PATTERN) return str;
      return str.replace(SPELLING_VARIANT_PATTERN, match => SPELLING_VARIANTS.get(match) || match);
    };
    
    const applySearchTokenSynonyms = (tokens, addToken) => {
      if (!tokens || typeof addToken !== 'function') {
        return;
      }
    
      const baseTokens = Array.isArray(tokens) ? tokens : Array.from(tokens);
      if (!Array.isArray(baseTokens) || baseTokens.length === 0) {
        return;
      }
    
      const tokenSet = new Set(baseTokens);
      const hasAny = values => values.some(value => tokenSet.has(value));
      const hasAllGroups = groups =>
        groups.every(group => {
          const list = Array.isArray(group) ? group : [group];
          return list.some(value => tokenSet.has(value));
        });
      const addAll = values => {
        values.forEach(value => {
          addToken(value);
        });
      };
    
      if (
        hasAny(['fps', 'framerate', 'framepersecond', 'framespersecond']) ||
        hasAllGroups([
          ['frame', 'frames'],
          ['per', 'persecond', 'persec'],
          ['second', 'seconds', 'sec'],
        ]) ||
        hasAllGroups([
          ['frame', 'frames'],
          ['rate'],
        ])
      ) {
        addAll([
          'fps',
          'framerate',
          'framepersecond',
          'framespersecond',
          'frame',
          'frames',
          'second',
          'seconds',
        ]);
      }
    
      if (hasAny(['wh', 'watthour', 'watthours'])) {
        addAll(['wh', 'watthour', 'watthours', 'watt', 'watts', 'hour', 'hours']);
      } else if (hasAllGroups([
        ['watt', 'watts'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])) {
        addAll(['wh', 'watthour', 'watthours']);
      }
    
      if (hasAny(['kwh', 'kilowatthour', 'kilowatthours'])) {
        addAll([
          'kwh',
          'kilowatthour',
          'kilowatthours',
          'kilowatt',
          'kilowatts',
          'watt',
          'watts',
          'hour',
          'hours',
        ]);
      } else if (hasAllGroups([
        ['kilowatt', 'kilowatts', 'kw'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])) {
        addAll(['kwh', 'kilowatthour', 'kilowatthours']);
      }
    
      if (hasAny(['ah', 'amphour', 'amphours'])) {
        addAll(['ah', 'amphour', 'amphours', 'amp', 'amps', 'ampere', 'amperes', 'hour', 'hours']);
      } else if (hasAllGroups([
        ['amp', 'amps', 'ampere', 'amperes'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])) {
        addAll(['ah', 'amphour', 'amphours']);
      }
    
      if (hasAny(['mah', 'milliamphour', 'milliamphours'])) {
        addAll([
          'mah',
          'milliamphour',
          'milliamphours',
          'milliamp',
          'milliamps',
          'milliampere',
          'milliamperes',
          'ma',
          'hour',
          'hours',
        ]);
      } else if (hasAllGroups([
        ['milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma'],
        ['hour', 'hours', 'hr', 'hrs'],
      ])) {
        addAll(['mah', 'milliamphour', 'milliamphours']);
      }
    
      if (hasAny(['mp', 'megapixel', 'megapixels'])) {
        addAll(['mp', 'megapixel', 'megapixels']);
      }
    
      if (hasAny(['mm', 'millimeter', 'millimeters'])) {
        addAll(['mm', 'millimeter', 'millimeters']);
      }
    
      if (hasAny(['cm', 'centimeter', 'centimeters'])) {
        addAll(['cm', 'centimeter', 'centimeters']);
      }
    
      if (hasAny(['ev', 'exposurevalue'])) {
        addAll(['ev', 'exposurevalue', 'exposure', 'value']);
      } else if (hasAllGroups([
        ['exposure'],
        ['value'],
      ])) {
        addAll(['ev', 'exposurevalue']);
      }
    };
    
    var searchKey       = str => {
      if (!str) return '';
      const value = String(str);
      let normalized = value.toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ø/g, 'o')
        .replace(/&/g, 'and')
        .replace(/\+/g, 'plus')
        .replace(/[°º˚]/g, 'deg')
        .replace(/\bdegrees?\b/g, 'deg')
        .replace(/[×✕✖✗✘]/g, 'x');
      normalized = normalizeUnicodeFractions(normalized);
      normalized = normalizeNumberWords(normalized);
      normalized = normalizeSpellingVariants(normalized);
      normalized = normaliseMarkVariants(normalized);
      const simplified = normalized.replace(/[^a-z0-9]+/g, '');
      if (simplified) return simplified;
      return value.toLowerCase().replace(/\s+/g, '');
    };
    
    var searchTokens = str => {
      if (!str) return [];
      let normalized = String(str).toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ø/g, 'o')
        .replace(/&/g, ' and ')
        .replace(/\+/g, ' plus ')
        .replace(/[°º˚]/g, ' deg ')
        .replace(/\bdegrees?\b/g, ' deg ')
        .replace(/[×✕✖✗✘]/g, ' x by ');
      normalized = normalizeUnicodeFractions(normalized);
      const numberNormalized = normalizeNumberWords(normalized);
      const tokens = new Set();
      const initialWords = [];
      const addToken = token => {
        if (!token) return;
        const cleaned = token.replace(/[^a-z0-9]+/g, '');
        if (cleaned) tokens.add(cleaned);
      };
      const isAlpha = value => /^[a-z]+$/.test(value);
      const isNumeric = value => /^\d+$/.test(value);
      const addAlphaNumericVariants = segment => {
        if (!segment) return;
        const groups = segment.match(/[a-z]+|\d+/g);
        if (!groups || groups.length <= 1) return;
        groups.forEach(part => {
          if (isNumeric(part) || part.length > 1) {
            addToken(part);
          }
        });
        for (let index = 0; index < groups.length - 1; index += 1) {
          const current = groups[index];
          const next = groups[index + 1];
          if (!current || !next) continue;
          const combined = `${current}${next}`;
          if (!combined || combined === segment) continue;
          if (
            (isAlpha(current) && isNumeric(next)) ||
            (isNumeric(current) && isAlpha(next)) ||
            (current.length > 1 && next.length > 1)
          ) {
            addToken(combined);
          }
        }
      };
      const processParts = (strToProcess, collectInitials = false) => {
        strToProcess.split(/\s+/).forEach(part => {
          if (!part) return;
          addToken(part);
          part
            .split(/[^a-z0-9]+/)
            .filter(Boolean)
            .forEach(segment => {
              addToken(segment);
              addAlphaNumericVariants(segment);
              if (collectInitials && /^[a-z]/.test(segment)) {
                initialWords.push(segment);
              }
            });
        });
      };
      processParts(normalized, true);
      if (numberNormalized !== normalized) {
        processParts(numberNormalized);
      }
      const spellingNormalized = normalizeSpellingVariants(numberNormalized);
      if (spellingNormalized !== numberNormalized) {
        processParts(spellingNormalized);
      }
      const markNormalized = normaliseMarkVariants(spellingNormalized);
      if (markNormalized !== spellingNormalized) {
        processParts(markNormalized);
      }
      if (initialWords.length >= 2) {
        const MAX_INITIALISM_LENGTH = 6;
        const initials = initialWords.map(word => word[0]).filter(Boolean);
        const limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
        for (let start = 0; start < limit; start++) {
          let current = '';
          for (let index = start; index < limit; index++) {
            current += initials[index];
            if (current.length >= 2) {
              addToken(current);
            }
          }
        }
      }
      const markPattern = /\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g;
      let match;
      const variantSource = spellingNormalized || normalized;
      while ((match = markPattern.exec(variantSource)) !== null) {
        const prefix = match[1];
        const rawValue = match[2];
        const { cleaned, number } = parseMarkSuffix(rawValue);
        if (!cleaned) continue;
        const altPrefix = prefix === 'mk' ? 'mark' : 'mk';
        addToken(prefix);
        addToken(altPrefix);
        addToken(cleaned);
        addToken(`${prefix}${cleaned}`);
        addToken(`${altPrefix}${cleaned}`);
        if (number != null) {
          const numberToken = String(number);
          addToken(numberToken);
          addToken(`${prefix}${numberToken}`);
          addToken(`${altPrefix}${numberToken}`);
        }
      }
      applySearchTokenSynonyms(tokens, addToken);
      return Array.from(tokens);
    };
    
    const FEATURE_CONTEXT_LIMIT = 3;
    
    const toTitleCase = str =>
      str.replace(/\b([a-z])/g, (_, ch) => ch.toUpperCase());
    
    const idToContextLabel = id => {
      if (!id) return '';
      const spaced = id
        .replace(/[-_]+/g, ' ')
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim();
      if (!spaced) return '';
      return toTitleCase(spaced);
    };
    
    const addUniqueContext = (contexts, seen, value, baseLabelLower) => {
      if (!value) return;
      const trimmed = value.trim();
      if (!trimmed) return;
      const normalized = trimmed.toLowerCase();
      if (normalized === baseLabelLower || seen.has(normalized)) return;
      contexts.push(trimmed);
      seen.add(normalized);
    };
    
    const collectFeatureContexts = (element, baseLabelLower) => {
      if (!element || !element.parentElement) return [];
      const contexts = [];
      const seen = new Set();
      let current = element.parentElement;
      while (current && contexts.length < FEATURE_CONTEXT_LIMIT) {
        if (typeof current.dataset?.featureContext === 'string') {
          current.dataset.featureContext
            .split(',')
            .map(part => part.trim())
            .filter(Boolean)
            .forEach(value => addUniqueContext(contexts, seen, value, baseLabelLower));
        }
        const labelledBy = current.getAttribute('aria-labelledby');
        if (labelledBy) {
          labelledBy
            .split(/\s+/)
            .map(id => id && document.getElementById(id))
            .filter(labelEl => labelEl && labelEl !== element)
            .forEach(labelEl => {
              addUniqueContext(
                contexts,
                seen,
                labelEl.textContent || '',
                baseLabelLower
              );
            });
        }
        const heading = current.querySelector(
          ':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > legend'
        );
        if (heading && heading !== element) {
          addUniqueContext(
            contexts,
            seen,
            heading.textContent || '',
            baseLabelLower
          );
        }
        if (current.id) {
          addUniqueContext(contexts, seen, idToContextLabel(current.id), baseLabelLower);
        }
        current = current.parentElement;
      }
      return contexts.reverse();
    };
    
    const collectFeatureSearchHelpTexts = element => {
      if (!element) return [];
      const texts = new Set();
      const MAX_TEXTS = 4;
      const clean = value => {
        if (typeof value !== 'string') return '';
        const normalized = value.replace(/\s+/g, ' ').trim();
        if (!normalized) return '';
        if (normalized.length > 160) {
          return normalized.slice(0, 160);
        }
        return normalized;
      };
      const add = value => {
        if (texts.size >= MAX_TEXTS) return;
        const cleaned = clean(value);
        if (cleaned) {
          texts.add(cleaned);
        }
      };
      const addFromElement = el => {
        if (!el) return;
        add(el.getAttribute('data-help'));
        add(el.getAttribute('aria-description'));
        add(el.getAttribute('title'));
      };
    
      add(element.getAttribute('data-help'));
      add(element.getAttribute('aria-description'));
      add(element.getAttribute('title'));
    
      const ownerDoc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    
      const processIdRefs = (attrName, collector) => {
        if (!ownerDoc) return;
        const attrValue = element.getAttribute(attrName);
        if (!attrValue) return;
        attrValue
          .split(/\s+/)
          .map(id => id && ownerDoc.getElementById(id))
          .filter(Boolean)
          .forEach(collector);
      };
    
      processIdRefs('aria-describedby', addFromElement);
      processIdRefs('aria-labelledby', addFromElement);
    
      if (element.labels && typeof element.labels === 'object') {
        Array.from(element.labels).forEach(addFromElement);
      }
    
      if (typeof element.closest === 'function') {
        const wrappingLabel = element.closest('label');
        if (wrappingLabel) addFromElement(wrappingLabel);
      }
    
      return Array.from(texts);
    };
    
    const buildFeatureEntryDetailText = entry => {
      if (!entry || typeof entry !== 'object') return '';
      const base = normalizeFeatureSearchDetail(
        entry.displayLabel || entry.baseLabel || entry.label || ''
      ).toLowerCase();
      const helpCandidates = [];
      if (Array.isArray(entry.helpTexts) && entry.helpTexts.length) {
        helpCandidates.push(...entry.helpTexts);
      }
      if (entry.element) {
        collectFeatureSearchHelpTexts(entry.element).forEach(text => {
          helpCandidates.push(text);
        });
      }
      for (const candidate of helpCandidates) {
        const detail = normalizeFeatureSearchDetail(candidate);
        if (detail && (!base || detail.toLowerCase() !== base)) {
          return detail;
        }
      }
      return '';
    };
    
    const buildHelpSectionDetailText = section => {
      if (!section) return '';
      const candidates = [];
      const summaryAttr = section.getAttribute('data-help-summary');
      if (summaryAttr) candidates.push(summaryAttr);
      const summaryEl = section.querySelector('[data-help-summary]');
      if (summaryEl && summaryEl.textContent) {
        candidates.push(summaryEl.textContent);
      }
      const ariaLabel = section.getAttribute('aria-label');
      if (ariaLabel) candidates.push(ariaLabel);
      const firstParagraph = section.querySelector('p');
      if (firstParagraph && firstParagraph.textContent) {
        candidates.push(firstParagraph.textContent);
      }
      if (!firstParagraph) {
        const firstListItem = section.querySelector('li');
        if (firstListItem && firstListItem.textContent) {
          candidates.push(firstListItem.textContent);
        }
      }
      for (const candidate of candidates) {
        const detail = normalizeFeatureSearchDetail(candidate);
        if (detail) return detail;
      }
      return '';
    };
    
    const buildDeviceEntryDetailText = entry => {
      if (!entry || typeof entry !== 'object') return '';
      const select = entry.select;
      if (!select) return '';
      const base = normalizeFeatureSearchDetail(entry.label || '').toLowerCase();
      const helpTexts = collectFeatureSearchHelpTexts(select);
      for (const text of helpTexts) {
        const detail = normalizeFeatureSearchDetail(text);
        if (detail && (!base || detail.toLowerCase() !== base)) {
          return detail;
        }
      }
      const contexts = collectFeatureContexts(select, base);
      if (contexts.length) {
        const contextDetail = normalizeFeatureSearchDetail(contexts.join(' › '));
        if (contextDetail && (!base || contextDetail.toLowerCase() !== base)) {
          return contextDetail;
        }
      }
      return '';
    };
    
    const buildFeatureSearchEntry = (element, { label, keywords = '' }) => {
      if (!element || !label) return null;
      const baseLabel = label.trim();
      if (!baseLabel) return null;
      const baseKey = searchKey(baseLabel);
      if (!baseKey) return null;
      const baseLabelLower = baseLabel.toLowerCase();
      const contextLabels = collectFeatureContexts(element, baseLabelLower);
      const shouldCollectHelp =
        typeof element.hasAttribute === 'function' && element.hasAttribute('data-feature-search');
      const helpTexts = shouldCollectHelp ? collectFeatureSearchHelpTexts(element) : [];
      let combinedLabel = baseLabel;
      if (contextLabels.length) {
        combinedLabel = `${baseLabel} (${contextLabels.join(' › ')})`;
      }
      const primaryTokenSource = [baseLabel, contextLabels.join(' ')]
        .filter(Boolean)
        .join(' ');
      const combinedKeywords = [
        baseLabel,
        contextLabels.join(' '),
        keywords,
        helpTexts.join(' ')
      ]
        .filter(Boolean)
        .join(' ');
      const primaryTokens = searchTokens(primaryTokenSource);
      const entry = {
        element,
        label: baseLabel,
        baseLabel,
        displayLabel: combinedLabel,
        context: contextLabels,
        primaryTokens,
        tokens: searchTokens(combinedKeywords),
        key: baseKey,
        optionValue: combinedLabel,
        helpTexts,
        entryType: getFeatureSearchEntryType(element)
      };
      const existing = featureMap.get(baseKey);
      if (!existing) {
        featureMap.set(baseKey, entry);
      } else if (Array.isArray(existing)) {
        if (!existing.some(item => item && item.element === element)) {
          existing.push(entry);
        }
      } else if (existing.element !== element) {
        featureMap.set(baseKey, [existing, entry]);
      }
      return entry;
    };
    
    const computeTokenMatchDetails = (entryTokens = [], queryTokens = []) => {
      if (!Array.isArray(entryTokens) || entryTokens.length === 0) {
        return { score: 0, matched: 0 };
      }
      const validQueryTokens = Array.isArray(queryTokens)
        ? queryTokens.filter(Boolean)
        : [];
      if (validQueryTokens.length === 0) {
        return { score: 0, matched: 0 };
      }
      let total = 0;
      let matched = 0;
      for (const token of validQueryTokens) {
        let best = 0;
        for (const entryToken of entryTokens) {
          if (!entryToken) continue;
          if (entryToken === token) {
            best = 3;
            break;
          }
          if (entryToken.startsWith(token) || token.startsWith(entryToken)) {
            best = Math.max(best, 2);
          } else if (entryToken.includes(token) || token.includes(entryToken)) {
            best = Math.max(best, 1);
          }
        }
        if (best > 0) {
          matched += 1;
          total += best;
        }
      }
      if (matched === 0) {
        return { score: 0, matched: 0 };
      }
      return { score: total, matched };
    };
    
    const computeLevenshteinDistance = (a, b) => {
      if (a === b) return 0;
      if (typeof a !== 'string' || typeof b !== 'string') {
        return Number.POSITIVE_INFINITY;
      }
      const aLen = a.length;
      const bLen = b.length;
      if (aLen === 0) return bLen;
      if (bLen === 0) return aLen;
      const prev = new Array(bLen + 1);
      const curr = new Array(bLen + 1);
      for (let j = 0; j <= bLen; j += 1) {
        prev[j] = j;
      }
      for (let i = 1; i <= aLen; i += 1) {
        curr[0] = i;
        const aCode = a.charCodeAt(i - 1);
        for (let j = 1; j <= bLen; j += 1) {
          const cost = aCode === b.charCodeAt(j - 1) ? 0 : 1;
          const deletion = prev[j] + 1;
          const insertion = curr[j - 1] + 1;
          const substitution = prev[j - 1] + cost;
          curr[j] = Math.min(deletion, insertion, substitution);
        }
        for (let j = 0; j <= bLen; j += 1) {
          prev[j] = curr[j];
        }
      }
      return prev[bLen];
    };
    
    const isAcceptableFuzzyMatch = (entryKey, queryKey, distance) => {
      if (!Number.isFinite(distance) || distance <= 0) {
        return false;
      }
      if (typeof entryKey !== 'string' || typeof queryKey !== 'string') {
        return false;
      }
      const maxLength = Math.max(entryKey.length, queryKey.length);
      if (maxLength === 0) return false;
      if (maxLength <= 3) {
        return distance <= 1;
      }
      if (maxLength <= 6) {
        return distance <= 2;
      }
      return distance <= 3 && distance / maxLength <= 0.4;
    };
    
    function findBestSearchMatch(map, key, tokens = []) {
      const queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
      const hasKey = Boolean(key);
      if (!hasKey && queryTokens.length === 0) return null;
    
      const toResult = (
        entryKey,
        entryValue,
        matchType,
        score = 0,
        matchedCount = 0,
        extras = {}
      ) => ({
        key: entryKey,
        value: entryValue,
        matchType,
        score,
        matchedCount,
        ...extras
      });
    
      const flattened = [];
      for (const [entryKey, entryValue] of map.entries()) {
        if (!entryValue) continue;
        if (Array.isArray(entryValue)) {
          for (const value of entryValue) {
            if (value) flattened.push([entryKey, value]);
          }
        } else {
          flattened.push([entryKey, entryValue]);
        }
      }
    
      if (hasKey) {
        const exactCandidates = flattened.filter(([entryKey]) => entryKey === key);
        if (exactCandidates.length) {
          let bestEntry = exactCandidates[0][1];
          let bestDetails = queryTokens.length > 0
            ? computeTokenMatchDetails(bestEntry?.tokens || [], queryTokens)
            : { score: Number.POSITIVE_INFINITY, matched: queryTokens.length };
          for (const [, entryValue] of exactCandidates.slice(1)) {
            if (!queryTokens.length) break;
            const details = computeTokenMatchDetails(entryValue?.tokens || [], queryTokens);
            if (
              details.score > bestDetails.score ||
              (details.score === bestDetails.score && details.matched > bestDetails.matched)
            ) {
              bestDetails = details;
              bestEntry = entryValue;
            }
          }
          return toResult(key, bestEntry, 'exactKey', bestDetails.score, bestDetails.matched);
        }
      }
    
      let bestTokenMatch = null;
      let bestTokenScore = 0;
      let bestTokenMatched = 0;
      let bestTokenKeyDistance = Number.POSITIVE_INFINITY;
      let bestPrefixMatch = null;
      let bestPrefixScore = Number.NEGATIVE_INFINITY;
      let bestPrefixMatched = 0;
      let bestPrefixLength = Number.POSITIVE_INFINITY;
      let bestSubsetMatch = null;
      let bestSubsetScore = Number.NEGATIVE_INFINITY;
      let bestSubsetMatched = 0;
      let bestSubsetLength = -1;
      let bestPartialMatch = null;
      let bestPartialScore = Number.NEGATIVE_INFINITY;
      let bestPartialMatched = 0;
      let bestFuzzyMatch = null;
      let bestFuzzyDistance = Number.POSITIVE_INFINITY;
      let bestFuzzyLength = Number.POSITIVE_INFINITY;
    
      const keyLength = hasKey ? key.length : 0;
    
      for (const [entryKey, entryValue] of flattened) {
        if (!entryValue) continue;
        const entryTokens = entryValue?.tokens || [];
        const tokenDetails = queryTokens.length
          ? computeTokenMatchDetails(entryTokens, queryTokens)
          : { score: 0, matched: 0 };
    
        if (hasKey && entryKey.startsWith(key)) {
          const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          const candidate = toResult(entryKey, entryValue, 'keyPrefix', score, tokenDetails.matched);
          if (
            !bestPrefixMatch ||
            score > bestPrefixScore ||
            (score === bestPrefixScore &&
              (tokenDetails.matched > bestPrefixMatched ||
                (tokenDetails.matched === bestPrefixMatched && entryKey.length < bestPrefixLength)))
          ) {
            bestPrefixMatch = candidate;
            bestPrefixScore = score;
            bestPrefixMatched = tokenDetails.matched;
            bestPrefixLength = entryKey.length;
          }
        }
    
        if (queryTokens.length) {
          const distance = hasKey ? Math.abs(entryKey.length - keyLength) : Number.POSITIVE_INFINITY;
          if (
            tokenDetails.score > bestTokenScore ||
            (tokenDetails.score === bestTokenScore &&
              (tokenDetails.matched > bestTokenMatched ||
                (tokenDetails.matched === bestTokenMatched && distance < bestTokenKeyDistance)))
          ) {
            bestTokenMatch = toResult(entryKey, entryValue, 'token', tokenDetails.score, tokenDetails.matched);
            bestTokenScore = tokenDetails.score;
            bestTokenMatched = tokenDetails.matched;
            bestTokenKeyDistance = distance;
          }
        }
    
        if (hasKey && key.startsWith(entryKey)) {
          const score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          const candidate = toResult(entryKey, entryValue, 'keySubset', score, tokenDetails.matched);
          if (
            !bestSubsetMatch ||
            score > bestSubsetScore ||
            (score === bestSubsetScore &&
              (entryKey.length > bestSubsetLength || tokenDetails.matched > bestSubsetMatched))
          ) {
            bestSubsetMatch = candidate;
            bestSubsetScore = score;
            bestSubsetMatched = tokenDetails.matched;
            bestSubsetLength = entryKey.length;
          }
        } else if (
          hasKey &&
          (entryKey.includes(key) || key.includes(entryKey))
        ) {
          const candidate = toResult(entryKey, entryValue, 'partial', tokenDetails.score, tokenDetails.matched);
          if (
            !bestPartialMatch ||
            tokenDetails.score > bestPartialScore ||
            (tokenDetails.score === bestPartialScore && tokenDetails.matched > bestPartialMatched)
          ) {
            bestPartialMatch = candidate;
            bestPartialScore = tokenDetails.score;
            bestPartialMatched = tokenDetails.matched;
          }
        }
    
        if (hasKey && entryKey) {
          const fuzzyDistance = computeLevenshteinDistance(entryKey, key);
          if (isAcceptableFuzzyMatch(entryKey, key, fuzzyDistance)) {
            if (
              !bestFuzzyMatch ||
              fuzzyDistance < bestFuzzyDistance ||
              (fuzzyDistance === bestFuzzyDistance && entryKey.length < bestFuzzyLength)
            ) {
              bestFuzzyMatch = toResult(entryKey, entryValue, 'fuzzy', tokenDetails.score, tokenDetails.matched, {
                fuzzyDistance
              });
              bestFuzzyDistance = fuzzyDistance;
              bestFuzzyLength = entryKey.length;
            }
          }
        }
      }
    
      if (bestTokenMatch && bestTokenScore > 0) {
        return bestTokenMatch;
      }
      if (bestPrefixMatch) {
        return bestPrefixMatch;
      }
      if (bestSubsetMatch) {
        return bestSubsetMatch;
      }
      if (bestPartialMatch) {
        return bestPartialMatch;
      }
      if (bestFuzzyMatch) {
        return bestFuzzyMatch;
      }
      return null;
    }
    
    var STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
    const existingDevicesHeading = document.getElementById("existingDevicesHeading");
    const batteryComparisonSection = document.getElementById("batteryComparison");
    const batteryTableElem = document.getElementById("batteryTable");
    const breakdownListElem = document.getElementById("breakdownList");
    var runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
    var generateGearListBtn = document.getElementById("generateGearListBtn");
    var deleteGearListProjectBtn = document.getElementById('deleteGearListProjectBtn');
    var gearListOutput = document.getElementById("gearListOutput");
    var projectRequirementsOutput = document.getElementById("projectRequirementsOutput");
    
    // Load accent color from localStorage
    var DEFAULT_ACCENT_COLOR = '#001589';
    var accentColor = DEFAULT_ACCENT_COLOR;
    var prevAccentColor = accentColor;
    var HIGH_CONTRAST_ACCENT_COLOR = '#ffffff';
    const DEFAULT_ACCENT_NORMALIZED = DEFAULT_ACCENT_COLOR.toLowerCase();
    
    const normalizeAccentValue = value =>
      typeof value === 'string' ? value.trim().toLowerCase() : '';
    
    const updateAccentColorResetButtonState = () => {
      if (!accentColorResetButton) return;
      const body = typeof document !== 'undefined' ? document.body : null;
      const pinkModeActive = !!(body && body.classList.contains('pink-mode'));
      const inputDisabled = !accentColorInput || accentColorInput.disabled;
      const currentValue = accentColorInput
        ? normalizeAccentValue(accentColorInput.value || '')
        : '';
      const isDefaultSelection = !currentValue || currentValue === DEFAULT_ACCENT_NORMALIZED;
      const shouldDisable = pinkModeActive || inputDisabled || isDefaultSelection;
      accentColorResetButton.disabled = shouldDisable;
      if (shouldDisable) {
        accentColorResetButton.setAttribute('aria-disabled', 'true');
      } else {
        accentColorResetButton.removeAttribute('aria-disabled');
      }
    };
    
    const DARK_MODE_ACCENT_BOOST_CLASS = 'dark-accent-boost';
    const PINK_REFERENCE_COLOR = '#ff69b4';
    const PINK_LUMINANCE_TOLERANCE = 0.06;
    const BRIGHT_ACCENT_LUMINANCE_THRESHOLD = 0.6;
    const BRIGHT_ACCENT_MIN_SATURATION = 0.35;
    
    function parseRgbComponent(value) {
      const trimmed = value.trim();
      if (!trimmed) return null;
      if (trimmed.endsWith('%')) {
        const percent = Number.parseFloat(trimmed.slice(0, -1));
        if (Number.isNaN(percent)) return null;
        return Math.max(0, Math.min(255, Math.round((percent / 100) * 255)));
      }
      const numeric = Number.parseFloat(trimmed);
      if (Number.isNaN(numeric)) return null;
      return Math.max(0, Math.min(255, Math.round(numeric)));
    }
    
    function parseColorToRgb(color) {
      if (typeof color !== 'string') return null;
      const trimmed = color.trim();
      if (!trimmed) return null;
      const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
      if (hexMatch) {
        const hex = hexMatch[1];
        if (hex.length === 3) {
          return {
            r: Number.parseInt(hex[0] + hex[0], 16),
            g: Number.parseInt(hex[1] + hex[1], 16),
            b: Number.parseInt(hex[2] + hex[2], 16),
          };
        }
        return {
          r: Number.parseInt(hex.slice(0, 2), 16),
          g: Number.parseInt(hex.slice(2, 4), 16),
          b: Number.parseInt(hex.slice(4, 6), 16),
        };
      }
      const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
      if (rgbMatch) {
        const parts = rgbMatch[1].split(',');
        if (parts.length < 3) return null;
        const [r, g, b] = parts;
        const red = parseRgbComponent(r);
        const green = parseRgbComponent(g);
        const blue = parseRgbComponent(b);
        if ([red, green, blue].some(component => component === null)) return null;
        return { r: red, g: green, b: blue };
      }
      return null;
    }
    
    function computeRelativeLuminance(rgb) {
      if (!rgb || typeof rgb !== 'object') return 0;
      const clamp = component => {
        const numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.min(1, Math.max(0, numeric / 255));
      };
      const transform = value =>
        value <= 0.03928
          ? value / 12.92
          : Math.pow((value + 0.055) / 1.055, 2.4);
      const red = transform(clamp(rgb.r));
      const green = transform(clamp(rgb.g));
      const blue = transform(clamp(rgb.b));
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }
    
    function computeSaturation(rgb) {
      if (!rgb || typeof rgb !== 'object') return 0;
      const normalize = component => {
        const numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.max(0, Math.min(1, numeric / 255));
      };
      const r = normalize(rgb.r);
      const g = normalize(rgb.g);
      const b = normalize(rgb.b);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max === 0) return 0;
      if (max === min) return 0;
      return (max - min) / max;
    }
    
    const PINK_REFERENCE_LUMINANCE = (() => {
      const pinkRgb = parseColorToRgb(PINK_REFERENCE_COLOR);
      if (!pinkRgb) return 0.35;
      return computeRelativeLuminance(pinkRgb);
    })();
    
    function shouldEnableDarkModeAccentBoost({ color, highContrast } = {}) {
      if (typeof document === 'undefined') return false;
      if (!document.body || !document.body.classList.contains('dark-mode')) return false;
      if (document.body.classList.contains('pink-mode')) return false;
      if (highContrast) return false;
      if (typeof color !== 'string' || !color) return false;
      const rgb = parseColorToRgb(color);
      if (!rgb) return false;
      const luminance = computeRelativeLuminance(rgb);
      if (Math.abs(luminance - PINK_REFERENCE_LUMINANCE) <= PINK_LUMINANCE_TOLERANCE) {
        return true;
      }
      const saturation = computeSaturation(rgb);
      return (
        luminance >= BRIGHT_ACCENT_LUMINANCE_THRESHOLD &&
        saturation >= BRIGHT_ACCENT_MIN_SATURATION
      );
    }
    
    function refreshDarkModeAccentBoost(options = {}) {
      if (typeof document === 'undefined' || !document.body) return;
      const shouldEnable = shouldEnableDarkModeAccentBoost(options);
      document.body.classList.toggle(DARK_MODE_ACCENT_BOOST_CLASS, shouldEnable);
      updateInstallBannerColors();
    }
    
    var isHighContrastActive = () =>
      typeof document !== 'undefined' &&
      (document.documentElement.classList.contains('high-contrast') ||
        (document.body && document.body.classList.contains('high-contrast')));
    
    var hasCustomAccentSelection = () => {
      const normalized = normalizeAccentValue(accentColor);
      return normalized && normalized !== DEFAULT_ACCENT_NORMALIZED;
    };
    
    var shouldPreserveAccentInPinkMode = () => false;
    
    var applyAccentColor = (color) => {
      const highContrast = isHighContrastActive();
      const accentValue = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : color;
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--accent-color', accentValue);
      if (highContrast) {
        rootStyle.removeProperty('--link-color');
      } else {
        rootStyle.setProperty('--link-color', color);
      }
      if (document.body) {
        const bodyStyle = document.body.style;
        bodyStyle.setProperty('--accent-color', accentValue);
        if (highContrast) {
          bodyStyle.removeProperty('--link-color');
        } else {
          bodyStyle.setProperty('--link-color', color);
        }
      }
      refreshDarkModeAccentBoost({ color: accentValue, highContrast });
    };
    
    var clearAccentColorOverrides = () => {
      const root = document.documentElement;
      const rootStyle = root && root.style;
      if (rootStyle) {
        rootStyle.removeProperty('--accent-color');
        rootStyle.removeProperty('--link-color');
      }
      if (document.body) {
        const bodyStyle = document.body.style;
        bodyStyle.removeProperty('--accent-color');
        bodyStyle.removeProperty('--link-color');
      }
      refreshDarkModeAccentBoost({ color: null, highContrast: isHighContrastActive() });
    };
    
    try {
      const storedAccent = localStorage.getItem('accentColor');
      if (storedAccent) {
        accentColor = storedAccent;
        applyAccentColor(accentColor);
      }
    } catch (e) {
      console.warn('Could not load accent color', e);
    }
    prevAccentColor = accentColor;
    updateAccentColorResetButtonState();
    
    if (accentColorInput) {
      accentColorInput.addEventListener('input', () => {
        if (
          typeof document !== 'undefined' &&
          document.body &&
          document.body.classList.contains('pink-mode')
        ) {
          updateAccentColorResetButtonState();
          return;
        }
        const color = accentColorInput.value;
        applyAccentColor(color);
        updateAccentColorResetButtonState();
      });
    }
    
    if (accentColorResetButton && accentColorInput) {
      accentColorResetButton.addEventListener('click', () => {
        if (accentColorResetButton.disabled || accentColorInput.disabled) return;
        if (
          typeof document !== 'undefined' &&
          document.body &&
          document.body.classList.contains('pink-mode')
        ) {
          updateAccentColorResetButtonState();
          return;
        }
        const currentValue = normalizeAccentValue(accentColorInput.value || '');
        if (currentValue === DEFAULT_ACCENT_NORMALIZED) {
          updateAccentColorResetButtonState();
          return;
        }
        accentColorInput.value = DEFAULT_ACCENT_COLOR;
        let eventHandled = false;
        try {
          const inputEvent = new Event('input', { bubbles: true });
          eventHandled = accentColorInput.dispatchEvent(inputEvent);
        } catch (error) {
          void error;
          if (typeof document !== 'undefined' && document.createEvent) {
            const legacyEvent = document.createEvent('Event');
            legacyEvent.initEvent('input', true, true);
            eventHandled = accentColorInput.dispatchEvent(legacyEvent);
          }
        }
        if (!eventHandled) {
          applyAccentColor(DEFAULT_ACCENT_COLOR);
        }
        updateAccentColorResetButtonState();
      });
    }
    
    // Font preferences
    var fontSize = '16';
    var fontFamily = "'Ubuntu', sans-serif";
    
    const uiScaleRoot = document.documentElement;
    const defaultUIScaleValues = {
      '--page-padding': 20,
      '--gap-size': 10,
      '--button-size': 24,
      '--border-radius': 5,
      '--form-label-width': 150,
      '--form-label-min-width': 120,
      '--form-action-width': 110
    };
    const uiScaleProperties = Object.keys(defaultUIScaleValues);
    const baseUIScaleValues = { ...defaultUIScaleValues };
    let baseFontSize = 16;
    
    if (uiScaleRoot) {
      try {
        const computedStyle = getComputedStyle(uiScaleRoot);
        const computedFontSize = parseFloat(computedStyle.fontSize);
        if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
          baseFontSize = computedFontSize;
        }
        for (const prop of uiScaleProperties) {
          const value = parseFloat(computedStyle.getPropertyValue(prop));
          if (Number.isFinite(value) && value > 0) {
            baseUIScaleValues[prop] = value;
          }
        }
      } catch (error) {
        console.warn('Unable to read computed styles for UI scaling', error);
      }
    }
    
    const customFontStorageKeyName =
      typeof CUSTOM_FONT_STORAGE_KEY_NAME !== 'undefined'
        ? CUSTOM_FONT_STORAGE_KEY_NAME
        : typeof CUSTOM_FONT_STORAGE_KEY !== 'undefined'
          ? CUSTOM_FONT_STORAGE_KEY
          : 'cameraPowerPlanner_customFonts';
    var customFontEntries = new Map();
    
    const SUPPORTED_FONT_TYPES = new Set([
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/font-woff',
      'application/font-woff2',
      'application/x-font-ttf',
      'application/x-font-opentype'
    ]);
    
    const SUPPORTED_FONT_EXTENSIONS = ['.ttf', '.otf', '.ttc', '.woff', '.woff2'];
    
    function loadCustomFontMetadataFromStorage() {
      if (typeof localStorage === 'undefined') return [];
      try {
        const raw = localStorage.getItem(customFontStorageKeyName);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .map(entry => ({
            id: entry && typeof entry.id === 'string' ? entry.id : null,
            name: entry && typeof entry.name === 'string' ? entry.name : '',
            data: entry && typeof entry.data === 'string' ? entry.data : ''
          }))
          .filter(entry => entry.id && entry.name && entry.data);
      } catch (error) {
        console.warn('Failed to load stored custom fonts', error);
        return [];
      }
    }
    
    function persistCustomFontsToStorage() {
      if (typeof localStorage === 'undefined') return true;
      try {
        const payload = Array.from(customFontEntries.values()).map(entry => ({
          id: entry.id,
          name: entry.name,
          data: entry.data
        }));
        localStorage.setItem(customFontStorageKeyName, JSON.stringify(payload));
        return true;
      } catch (error) {
        console.warn('Could not save custom fonts', error);
        return false;
      }
    }
    
    function sanitizeCustomFontName(name) {
      if (!name) return 'Custom Font';
      const trimmed = String(name).trim();
      if (!trimmed) return 'Custom Font';
      return trimmed.replace(/\s+/g, ' ').slice(0, 80);
    }
    
    function deriveFontNameFromFile(file) {
      if (!file) return 'Custom Font';
      const rawName = typeof file.name === 'string' ? file.name : '';
      if (!rawName) return 'Custom Font';
      const withoutExtension = rawName.replace(/\.[^.]+$/, '');
      const candidate = withoutExtension || rawName;
      return sanitizeCustomFontName(candidate);
    }
    
    function ensureUniqueCustomFontName(baseName) {
      const sanitizedBase = sanitizeCustomFontName(baseName);
      if (!settingsFontFamily) return sanitizedBase;
      let candidate = sanitizedBase;
      let suffix = 2;
      while (
        Array.from(settingsFontFamily.options).some(
          opt => opt.value === buildFontFamilyValue(candidate)
        )
      ) {
        candidate = `${sanitizedBase} ${suffix}`;
        suffix += 1;
      }
      return candidate;
    }
    
    function cssEscapeFontName(name) {
      if (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function') {
        return CSS.escape(name);
      }
      return String(name).replace(/['"\\]/g, match => `\\${match}`);
    }
    
    async function registerCustomFontSource(name, dataUrl, id) {
      if (!name || !dataUrl || typeof document === 'undefined') return false;
      let loaded = false;
      if (
        typeof FontFace === 'function' &&
        document.fonts &&
        typeof document.fonts.add === 'function'
      ) {
        try {
          const fontFace = new FontFace(name, `url(${dataUrl})`);
          await fontFace.load();
          document.fonts.add(fontFace);
          loaded = true;
        } catch (error) {
          console.warn('Failed to load custom font via FontFace', error);
        }
      }
      if (!loaded) {
        try {
          const safeId = id || cssEscapeFontName(name).replace(/[^a-z0-9_-]+/gi, '-');
          const styleId = `customFontStyle-${safeId}`;
          let styleElement = document.getElementById(styleId);
          if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            if (document.head) {
              document.head.appendChild(styleElement);
            } else {
              document.body.appendChild(styleElement);
            }
          }
          const escapedName = cssEscapeFontName(name);
          styleElement.textContent = `@font-face { font-family: '${escapedName}'; src: url(${dataUrl}); font-display: swap; }`;
          loaded = true;
        } catch (styleError) {
          console.warn('Failed to inject custom font style', styleError);
          return false;
        }
      }
      return loaded;
    }
    
    async function applyStoredCustomFont(entry) {
      if (!entry || !entry.id) return null;
      const value = buildFontFamilyValue(entry.name);
      const { option } = ensureFontFamilyOption(value, entry.name, localFontsGroup, 'uploaded');
      if (option) {
        option.dataset.fontId = entry.id;
      }
      await registerCustomFontSource(entry.name, entry.data, entry.id);
      return value;
    }
    
    async function loadStoredCustomFonts() {
      const stored = loadCustomFontMetadataFromStorage();
      if (!stored.length) return;
      for (const entry of stored) {
        const normalized = {
          id: entry.id,
          name: sanitizeCustomFontName(entry.name),
          data: entry.data
        };
        customFontEntries.set(normalized.id, normalized);
        try {
          await applyStoredCustomFont(normalized);
        } catch (error) {
          console.warn('Failed to restore custom font', normalized.name, error);
        }
      }
    }
    
    function resetCustomFontsForFactoryReset() {
      const hadEntries = customFontEntries && typeof customFontEntries.size === 'number'
        ? customFontEntries.size > 0
        : false;
    
      if (customFontEntries && typeof customFontEntries.clear === 'function') {
        customFontEntries.clear();
      }
    
      let removedUploadedOption = false;
    
      if (settingsFontFamily && settingsFontFamily.options) {
        const options = Array.from(settingsFontFamily.options || []);
        options.forEach(option => {
          if (!option || !option.dataset || option.dataset.source !== 'uploaded') {
            return;
          }
          removedUploadedOption = true;
          const fontId = option.dataset.fontId || '';
          if (option.parentNode && typeof option.parentNode.removeChild === 'function') {
            option.parentNode.removeChild(option);
          } else if (typeof settingsFontFamily.removeChild === 'function') {
            settingsFontFamily.removeChild(option);
          }
          if (fontId && typeof document !== 'undefined') {
            const styleId = `customFontStyle-${fontId}`;
            const styleNode = document.getElementById(styleId);
            if (styleNode && styleNode.parentNode) {
              styleNode.parentNode.removeChild(styleNode);
            }
          }
        });
    
        const hasCurrentSelection = options.some(
          option => option && option.value === settingsFontFamily.value,
        );
        if (!hasCurrentSelection) {
          if (settingsFontFamily.options.length) {
            settingsFontFamily.selectedIndex = 0;
          } else {
            settingsFontFamily.value = '';
          }
        }
      }
    
      if (typeof document !== 'undefined' && document.querySelectorAll) {
        const inlineStyles = document.querySelectorAll('style[id^="customFontStyle-"]');
        inlineStyles.forEach(styleNode => {
          if (styleNode && styleNode.parentNode) {
            styleNode.parentNode.removeChild(styleNode);
          }
        });
      }
    
      if (typeof setLocalFontsStatus === 'function' && (hadEntries || removedUploadedOption)) {
        setLocalFontsStatus(null);
      }
    }
    
    function isSupportedFontFile(file) {
      if (!file) return false;
      const type = typeof file.type === 'string' ? file.type.toLowerCase() : '';
      if (type && SUPPORTED_FONT_TYPES.has(type)) {
        return true;
      }
      const name = typeof file.name === 'string' ? file.name.toLowerCase() : '';
      return SUPPORTED_FONT_EXTENSIONS.some(ext => name.endsWith(ext));
    }
    
    function readFileAsDataURL(file) {
      return new Promise((resolve, reject) => {
        if (typeof FileReader !== 'function') {
          reject(new Error('FileReader is unavailable'));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
        try {
          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
    }
    
    async function addCustomFontFromData(name, dataUrl, { persist = true } = {}) {
      const uniqueName = ensureUniqueCustomFontName(name);
      const value = buildFontFamilyValue(uniqueName);
      const { option } = ensureFontFamilyOption(value, uniqueName, localFontsGroup, 'uploaded');
      if (!option) {
        return { name: uniqueName, value, persisted: false };
      }
      let entryId = option.dataset.fontId;
      if (!entryId) {
        entryId = `custom-font-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        option.dataset.fontId = entryId;
      }
      const entry = { id: entryId, name: uniqueName, data: dataUrl };
      customFontEntries.set(entryId, entry);
      await registerCustomFontSource(uniqueName, dataUrl, entryId);
      let persisted = true;
      if (persist && !persistCustomFontsToStorage()) {
        persisted = false;
      }
      return { name: uniqueName, value, persisted };
    }
    
    async function handleLocalFontFiles(fileList) {
      if (!fileList || fileList.length === 0) {
        setLocalFontsStatus('localFontsNoFonts');
        return;
      }
      if (localFontsButton) {
        localFontsButton.disabled = true;
      }
      const added = [];
      const unsupported = [];
      const failed = [];
      let persistFailure = false;
      for (const file of Array.from(fileList)) {
        if (!isSupportedFontFile(file)) {
          unsupported.push(file && typeof file.name === 'string' ? file.name : '');
          continue;
        }
        try {
          const dataUrl = await readFileAsDataURL(file);
          if (!dataUrl) {
            failed.push(file && file.name ? file.name : '');
            continue;
          }
          const result = await addCustomFontFromData(deriveFontNameFromFile(file), dataUrl);
          added.push(result);
          if (!result.persisted) {
            persistFailure = true;
          }
        } catch (error) {
          console.warn('Failed to import custom font', error);
          failed.push(file && typeof file.name === 'string' ? file.name : '');
        }
      }
      if (added.length > 0) {
        if (settingsFontFamily) {
          settingsFontFamily.value = added[0].value;
        }
        setLocalFontsStatus(
          'localFontsAdded',
          added.map(item => item.name).join(', ')
        );
      } else if (unsupported.length > 0) {
        setLocalFontsStatus('localFontsUnsupportedFiles', unsupported.join(', '));
      } else if (failed.length > 0) {
        setLocalFontsStatus('localFontsError');
      } else {
        setLocalFontsStatus('localFontsNoFonts');
      }
    
      if (persistFailure) {
        const message = getLocalizedText('localFontsSaveError');
        if (message) {
          showNotification('warning', message);
        }
      }
      if (unsupported.length > 0 && added.length > 0) {
        const message = getLocalizedText('localFontsUnsupportedFiles');
        if (message) {
          showNotification(
            'warning',
            message.replace('%s', unsupported.join(', '))
          );
        }
      }
      if (failed.length > 0) {
        const message = getLocalizedText('localFontsError');
        if (message) {
          showNotification('error', message);
        }
      }
    
      if (localFontsButton) {
        localFontsButton.disabled = false;
      }
    }
    
    async function normalizeFontResults(result) {
      if (!result) return [];
      if (Array.isArray(result)) return result;
    
      const hasSymbol = typeof Symbol === 'function';
      const asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator;
      if (asyncIteratorSymbol && typeof result[asyncIteratorSymbol] === 'function') {
        const fonts = [];
        for await (const font of result) {
          fonts.push(font);
        }
        return fonts;
      }
    
      const iteratorSymbol = hasSymbol && Symbol.iterator;
      if (iteratorSymbol && typeof result[iteratorSymbol] === 'function') {
        return Array.from(result);
      }
    
      return [];
    }
    
    const queryAvailableLocalFonts = (() => {
      if (typeof window === 'undefined') return null;
      if (typeof window.queryLocalFonts === 'function') {
        return async options => normalizeFontResults(await window.queryLocalFonts(options));
      }
      if (
        typeof navigator !== 'undefined' &&
        navigator &&
        navigator.fonts &&
        typeof navigator.fonts.query === 'function'
      ) {
        const { fonts } = navigator;
        return async options => normalizeFontResults(await fonts.query.call(fonts, options));
      }
      return null;
    })();
    
    const supportsLocalFonts = typeof queryAvailableLocalFonts === 'function';
    const canUploadFontFiles =
      !!(
        localFontsInput &&
        typeof window !== 'undefined' &&
        typeof window.FileReader === 'function' &&
        typeof localFontsInput.click === 'function'
      );
    
    function getLocalizedText(key) {
      if (texts[currentLang] && texts[currentLang][key]) return texts[currentLang][key];
      if (texts.en && texts.en[key]) return texts.en[key];
      return '';
    }
    
    function guessFontFallback(name) {
      if (!name) return 'sans-serif';
      const lower = name.toLowerCase();
      if (/(mono|code|console|courier|menlo|fixed|inconsolata|monaco)/.test(lower)) {
        return 'monospace';
      }
      if (/(serif|times|garamond|georgia|baskerville|roman|palatino|bodoni|bookman)/.test(lower)) {
        return 'serif';
      }
      if (/(script|hand|brush|cursive|callig|marker)/.test(lower)) {
        return 'cursive';
      }
      return 'sans-serif';
    }
    
    function buildFontFamilyValue(name) {
      if (!name) return fontFamily;
      const escaped = name.replace(/\\/g, '\\').replace(/'/g, "\\'");
      return `'${escaped}', ${guessFontFallback(name)}`;
    }
    
    function extractFontLabel(value) {
      if (!value) return '';
      const trimmed = value.trim();
      if (!trimmed) return '';
      const firstChar = trimmed[0];
      if (firstChar === "'" || firstChar === '"') {
        let result = '';
        for (let i = 1; i < trimmed.length; i += 1) {
          const ch = trimmed[i];
          if (ch === '\\') {
            if (i + 1 < trimmed.length) {
              result += trimmed[i + 1];
              i += 1;
            }
          } else if (ch === firstChar) {
            return result;
          } else {
            result += ch;
          }
        }
        return result;
      }
      const commaIdx = trimmed.indexOf(',');
      if (commaIdx !== -1) return trimmed.slice(0, commaIdx).trim();
      return trimmed;
    }
    
    function ensureFontFamilyOption(value, label, targetGroup, source) {
      if (!settingsFontFamily || !value) {
        return { option: null, created: false };
      }
      const existing = Array.from(settingsFontFamily.options).find(opt => opt.value === value);
      if (existing) {
        if (source) existing.dataset.source = source;
        if (label && !existing.textContent.trim()) existing.textContent = label;
        return { option: existing, created: false };
      }
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label || extractFontLabel(value);
      if (source) option.dataset.source = source;
      const container = targetGroup && typeof targetGroup.appendChild === 'function'
        ? targetGroup
        : settingsFontFamily;
      container.appendChild(option);
      return { option, created: true };
    }
    
    function setLocalFontsStatus(key, replacement) {
      if (!localFontsStatus || !key) {
        if (localFontsStatus) {
          localFontsStatus.textContent = '';
          localFontsStatus.setAttribute('hidden', '');
          delete localFontsStatus.dataset.statusKey;
          delete localFontsStatus.dataset.statusArg;
        }
        return;
      }
      const template = getLocalizedText(key);
      const hasReplacement = replacement !== undefined && replacement !== null;
      let message = template;
      if (hasReplacement) {
        const replacementText = String(replacement);
        message = template ? template.replace('%s', replacementText) : replacementText;
        localFontsStatus.dataset.statusArg = replacementText;
      } else {
        delete localFontsStatus.dataset.statusArg;
      }
      localFontsStatus.dataset.statusKey = key;
      localFontsStatus.textContent = message;
      localFontsStatus.removeAttribute('hidden');
    }
    
    async function requestLocalFonts() {
      if (!supportsLocalFonts || !localFontsButton || !queryAvailableLocalFonts) return;
      localFontsButton.disabled = true;
      try {
        const fonts = await queryAvailableLocalFonts();
        if (!Array.isArray(fonts) || fonts.length === 0) {
          setLocalFontsStatus('localFontsNoFonts');
          return;
        }
        const added = [];
        const duplicates = [];
        const seenValues = new Set();
        for (const font of fonts) {
          const rawName = font && (font.family || font.fullName || font.postscriptName);
          const name = rawName ? String(rawName).trim() : '';
          if (!name) continue;
          const value = buildFontFamilyValue(name);
          if (seenValues.has(value)) {
            duplicates.push(name);
            continue;
          }
          const { option, created } = ensureFontFamilyOption(
            value,
            name,
            localFontsGroup,
            'local'
          );
          if (!option) continue;
          seenValues.add(option.value);
          if (created) {
            added.push({ name, value: option.value });
          } else {
            duplicates.push(name);
          }
        }
        if (added.length > 0) {
          if (settingsFontFamily) {
            settingsFontFamily.value = added[0].value;
          }
          setLocalFontsStatus(
            'localFontsAdded',
            added.map(item => item.name).join(', ')
          );
        } else if (duplicates.length > 0) {
          setLocalFontsStatus('localFontsAlreadyAdded', duplicates.join(', '));
        } else {
          setLocalFontsStatus('localFontsNoFonts');
        }
      } catch (err) {
        console.error('Could not access local fonts', err);
        if (
          err &&
          (err.name === 'NotAllowedError' || err.name === 'SecurityError') &&
          canUploadFontFiles
        ) {
          setLocalFontsStatus('localFontsPermissionNeeded');
        } else {
          setLocalFontsStatus('localFontsError');
        }
      } finally {
        localFontsButton.disabled = false;
      }
    }
    
    if (localFontsButton) {
      if (supportsLocalFonts || canUploadFontFiles) {
        localFontsButton.removeAttribute('hidden');
        localFontsButton.addEventListener('click', () => {
          if (supportsLocalFonts) {
            requestLocalFonts();
          } else if (canUploadFontFiles && localFontsInput) {
            localFontsInput.click();
          }
        });
        if (!supportsLocalFonts && canUploadFontFiles) {
          setLocalFontsStatus('localFontsFileFallback');
        }
      } else {
        setLocalFontsStatus('localFontsUnsupported');
      }
    }
    
    if (localFontsInput) {
      localFontsInput.addEventListener('change', () => {
        if (localFontsInput.files && localFontsInput.files.length > 0) {
          handleLocalFontFiles(localFontsInput.files);
        } else {
          setLocalFontsStatus('localFontsNoFonts');
        }
        try {
          localFontsInput.value = '';
        } catch {
          // ignore reset errors
        }
      });
    }
    
    loadStoredCustomFonts().catch(error => {
      console.warn('Unable to restore stored custom fonts', error);
    });
    
    function applyFontSize(size) {
      const numericSize = parseFloat(size);
      if (!Number.isFinite(numericSize) || numericSize <= 0) {
        return;
      }
    
      document.documentElement.style.fontSize = `${numericSize}px`;
    
      if (!Number.isFinite(baseFontSize) || baseFontSize <= 0) {
        return;
      }
    
      const scale = numericSize / baseFontSize;
      for (const prop of uiScaleProperties) {
        const baseValue = baseUIScaleValues[prop];
        if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
        document.documentElement.style.setProperty(prop, `${baseValue * scale}px`);
      }
      document.documentElement.style.setProperty('--ui-scale', String(scale));
    }
    
    function applyFontFamily(family) {
      document.documentElement.style.setProperty('--font-family', family);
    }
    
    try {
      const storedSize = localStorage.getItem('fontSize');
      if (storedSize) {
        fontSize = storedSize;
        applyFontSize(fontSize);
      }
      const storedFamily = localStorage.getItem('fontFamily');
      if (storedFamily) {
        fontFamily = storedFamily;
        applyFontFamily(fontFamily);
      }
    } catch (e) {
      console.warn('Could not load font preferences', e);
    }
    
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) {
      const hasStoredOption = Array.from(settingsFontFamily.options).some(
        opt => opt.value === fontFamily
      );
      if (!hasStoredOption && fontFamily) {
        ensureFontFamilyOption(fontFamily, extractFontLabel(fontFamily), localFontsGroup, 'local');
      }
      settingsFontFamily.value = fontFamily;
    }
    
    var revertAccentColor = () => {
      if (document.body && document.body.classList.contains('pink-mode')) {
        if (shouldPreserveAccentInPinkMode()) {
          applyAccentColor(prevAccentColor);
        } else {
          clearAccentColorOverrides();
        }
        return;
      }
      applyAccentColor(prevAccentColor);
    };
    
    function populateFeatureSearch() {
      featureMap.clear();
      helpMap.clear();
      deviceMap.clear();
      featureSearchEntries = [];
      featureSearchDefaultOptions = [];
      featureSearchEntryIndex.clear();
      const defaultOptionValues = new Set();
      const registerOption = entry => {
        const optionData = buildFeatureSearchOptionData(entry);
        if (!optionData || !optionData.value || defaultOptionValues.has(optionData.value)) {
          return;
        }
        defaultOptionValues.add(optionData.value);
        featureSearchDefaultOptions.push(optionData);
      };
      document
        .querySelectorAll('h2[id], legend[id], h3[id], h4[id]')
        .forEach(el => {
          if (helpDialog && helpDialog.contains(el)) return;
          const name = el.textContent.trim();
          if (!name) return;
          const keywords = el.dataset?.searchKeywords || el.getAttribute('data-search-keywords') || '';
          const entry = buildFeatureSearchEntry(el, { label: name, keywords });
          if (!entry || !entry.key) return;
          const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
          if (!display) return;
          const entryData = {
            type: 'feature',
            key: entry.key,
            display,
            tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
            primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
            value: entry,
            optionLabel: entry.displayLabel || entry.baseLabel || display,
            detail: buildFeatureEntryDetailText(entry)
          };
          registerOption(entryData);
          featureSearchEntries.push(entryData);
        });
      document.querySelectorAll(FEATURE_SEARCH_EXTRA_SELECTOR).forEach(el => {
        if (!el || (helpDialog && helpDialog.contains(el))) return;
        const label = getFeatureSearchLabel(el);
        if (!label) return;
        const keywords = getFeatureSearchKeywords(el);
        const entry = buildFeatureSearchEntry(el, { label, keywords });
        if (!entry || !entry.key) return;
        const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
        if (!display) return;
        const entryType = getFeatureSearchEntryType(el);
        const entryData = {
          type: entryType,
          key: entry.key,
          display,
          tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
          primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
          value: entry,
          optionLabel: entry.displayLabel || entry.baseLabel || display,
          detail: buildFeatureEntryDetailText(entry)
        };
        registerOption(entryData);
        featureSearchEntries.push(entryData);
      });
      if (helpDialog) {
        helpDialog.querySelectorAll('section[data-help-section]').forEach(section => {
          const heading = section.querySelector('h3');
          if (!heading) return;
          const label = heading.textContent.trim();
          if (!label) return;
          const keywords = section.dataset.helpKeywords || '';
          const key = searchKey(label);
          const tokens = searchTokens(`${label} ${keywords}`.trim());
          const primaryTokens = searchTokens(label);
          const helpEntry = {
            section,
            label,
            tokens
          };
          helpMap.set(key, helpEntry);
          const optionValue = `${label} (help)`;
          const helpData = {
            type: 'help',
            key,
            display: optionValue,
            tokens,
            primaryTokens,
            value: helpEntry,
            optionLabel: label,
            detail: buildHelpSectionDetailText(section)
          };
          registerOption(helpData);
          featureSearchEntries.push(helpData);
        });
      }
    
      document.querySelectorAll('select').forEach(sel => {
        sel.querySelectorAll('option').forEach(opt => {
          const name = opt.textContent.trim();
          if (!name || opt.value === 'None') return;
          const key = searchKey(name);
          if (!deviceMap.has(key)) {
            const keywords =
              opt.dataset?.searchKeywords ||
              opt.getAttribute('data-search-keywords') ||
              sel.dataset?.searchKeywords ||
              sel.getAttribute('data-search-keywords') ||
              '';
            const tokens = searchTokens(`${name} ${keywords}`.trim());
            const primaryTokens = searchTokens(name);
            const deviceEntry = {
              select: sel,
              value: opt.value,
              label: name,
              tokens
            };
            deviceMap.set(key, deviceEntry);
            const deviceData = {
              type: 'device',
              key,
              display: name,
              tokens,
              primaryTokens,
              value: deviceEntry,
              optionLabel: name,
              detail: buildDeviceEntryDetailText(deviceEntry)
            };
            registerOption(deviceData);
            featureSearchEntries.push(deviceData);
          }
        });
      });
      featureSearchEntries.forEach(entry => {
        if (!entry || !entry.key) return;
        const type = entry.type || 'feature';
        const mapKey = buildFeatureSearchHistoryKey(entry.key, type);
        featureSearchEntryIndex.set(mapKey, entry);
      });
      loadFeatureSearchHistory();
      cleanupFeatureSearchHistory();
      renderFeatureListOptions(featureSearchDefaultOptions);
      if (featureSearch && featureSearch.value) {
        updateFeatureSearchSuggestions(featureSearch.value);
      }
    }
    
    function setEditProjectBtnText() {
      const btn = document.getElementById('editProjectBtn');
      if (btn) {
        btn.textContent = texts[currentLang].editProjectBtn;
        btn.setAttribute('title', texts[currentLang].editProjectBtn);
        btn.setAttribute('data-help', texts[currentLang].editProjectBtn);
      }
    }
    
    function ensureEditProjectButton() {
      let container = null;
      if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
        container = projectRequirementsOutput;
      } else if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
        container = gearListOutput;
      }
      if (!container) return;
      let btn = document.getElementById('editProjectBtn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'editProjectBtn';
      }
    
      const legacyButtonParent = btn.parentElement;
      if (legacyButtonParent && legacyButtonParent !== container && legacyButtonParent.id !== 'editProjectBtn') {
        legacyButtonParent.removeChild(btn);
      }
    
      if (!btn.dataset.editProjectBound) {
        btn.type = 'button';
        btn.addEventListener('click', () => {
          const infoForDialog = currentProjectInfo
            ? { ...currentProjectInfo }
            : (projectForm ? collectProjectFormData() : {});
          if (projectForm) {
            populateProjectForm(infoForDialog || {});
          }
          openDialog(projectDialog);
        });
        btn.dataset.editProjectBound = 'true';
      }
      const title = container.querySelector('h2');
      if (title && btn.parentElement !== container) {
        title.insertAdjacentElement('afterend', btn);
      } else if (!title && btn.parentElement !== container) {
        container.prepend(btn);
      }
      btn.type = 'button';
      setEditProjectBtnText();
    }
    
    function updateGearListButtonVisibility() {
      const hasGear =
        gearListOutput &&
        !gearListOutput.classList.contains('hidden') &&
        gearListOutput.innerHTML.trim() !== '';
      if (hasGear) {
        generateGearListBtn.classList.add('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.remove('hidden');
        }
        ensureEditProjectButton();
      } else {
        generateGearListBtn.classList.remove('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.add('hidden');
        }
        const btn = document.getElementById('editProjectBtn');
        if (btn) btn.remove();
      }
    }
    
    function annotateGearTableCategoryGroups(table) {
      if (!table) return;
      const groups = table.querySelectorAll('tbody.category-group');
      groups.forEach(group => {
        const headingCell = group.querySelector('.category-row td');
        if (!headingCell) return;
        const label = headingCell.textContent ? headingCell.textContent.trim() : '';
        if (!label) return;
        if (group.getAttribute('data-gear-table-category') === label) return;
        group.setAttribute('data-gear-table-category', label);
      });
    }
    
    function ensureGearTableCategoryGrouping(table) {
      if (!table) return;
      const doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
      if (!doc) return;
      const existingCategoryGroups = table.querySelectorAll('tbody.category-group');
      if (existingCategoryGroups.length) {
        existingCategoryGroups.forEach(group => {
          if (!group.classList.contains('category-group')) {
            group.classList.add('category-group');
          }
        });
        table.querySelectorAll('tbody').forEach(group => {
          if (group.querySelector('tr.category-row')) {
            group.classList.add('category-group');
          }
        });
        annotateGearTableCategoryGroups(table);
        return;
      }
      const rows = Array.from(table.rows || []);
      if (!rows.length) return;
      const newGroups = [];
      let currentGroup = null;
      rows.forEach(row => {
        if (row.classList.contains('category-row')) {
          currentGroup = doc.createElement('tbody');
          currentGroup.className = 'category-group';
          currentGroup.appendChild(row);
          newGroups.push(currentGroup);
        } else {
          if (!currentGroup) {
            currentGroup = doc.createElement('tbody');
            currentGroup.className = 'category-group';
            newGroups.push(currentGroup);
          }
          currentGroup.appendChild(row);
        }
      });
      Array.from(table.tBodies || []).forEach(body => {
        if (!body.rows.length || !body.classList.contains('category-group')) {
          body.remove();
        }
      });
      newGroups.forEach(group => {
        if (group.rows.length) table.appendChild(group);
      });
      annotateGearTableCategoryGroups(table);
    }
    
    let overviewTitleCandidatesCache = null;
    
    function getOverviewTitleCandidates() {
      if (overviewTitleCandidatesCache && overviewTitleCandidatesCache.length) {
        return overviewTitleCandidatesCache;
      }
      const variants = new Set();
      if (typeof texts === 'object' && texts !== null) {
        Object.values(texts).forEach(lang => {
          const label = lang && typeof lang.overviewTitle === 'string'
            ? lang.overviewTitle.trim()
            : '';
          if (label) variants.add(label);
        });
      }
      variants.add('Project Overview and Gear List');
      variants.add('Project Overview');
      overviewTitleCandidatesCache = Array.from(variants)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
      return overviewTitleCandidatesCache;
    }
    
    function extractProjectNameFromHeading(titleElement) {
      if (!titleElement) return '';
      if (typeof titleElement.getAttribute === 'function') {
        const attrName = titleElement.getAttribute('data-project-name');
        if (typeof attrName === 'string') {
          const trimmed = attrName.trim();
          if (trimmed) return trimmed;
        }
      }
      const textValue = typeof titleElement.textContent === 'string'
        ? titleElement.textContent.replace(/\s+/g, ' ').trim()
        : '';
      if (!textValue) return '';
    
      const quoteMatch = textValue.match(/[“"']([^“”"']+)[”"']/);
      if (quoteMatch && quoteMatch[1] && quoteMatch[1].trim()) {
        return quoteMatch[1].trim();
      }
      const guillemetMatch = textValue.match(/[«‹]([^»›]+)[»›]/);
      if (guillemetMatch && guillemetMatch[1] && guillemetMatch[1].trim()) {
        return guillemetMatch[1].trim();
      }
    
      const overviewCandidates = getOverviewTitleCandidates();
      const lowerText = textValue.toLowerCase();
      for (const label of overviewCandidates) {
        const normalizedLabel = label.trim();
        if (!normalizedLabel) continue;
        const lowerLabel = normalizedLabel.toLowerCase();
        if (lowerText.startsWith(lowerLabel)) {
          let remainder = textValue.slice(normalizedLabel.length).trim();
          if (!remainder) return '';
          remainder = remainder.replace(/^(?:for|pour|für|per|para)\b\s*/i, '').trim();
          remainder = remainder.replace(/^(?:the|le|la|les|den|die|das|el|los|las)\b\s*/i, '').trim();
          remainder = remainder.replace(/^[–—:-]+/, '').trim();
          remainder = remainder.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
          if (remainder) return remainder;
          return '';
        }
      }
    
      if (overviewCandidates.some(label => lowerText === label.toLowerCase())) {
        return '';
      }
    
      const stripped = textValue.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
      if (stripped && stripped !== textValue) {
        return stripped;
      }
    
      return textValue;
    }
    
    function splitGearListHtml(html) {
      if (!html) return { projectHtml: '', gearHtml: '' };
      // Support legacy storage formats where the gear list and project
      // requirements were saved separately as an object.
      if (typeof html === 'object') {
        const legacyProject = html.projectHtml || html.project || '';
        const legacyGear = html.gearHtml || html.gear || '';
        if (legacyProject || legacyGear) {
          return { projectHtml: legacyProject, gearHtml: legacyGear };
        }
        // Some old exports used a gearList property.
        html = html.gearList || '';
      }
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title = doc.querySelector('h2');
      const reqGrid = doc.querySelector('.requirements-grid');
      const titleHtml = title ? title.outerHTML : '';
      let headingHtml = '';
      let headingNodeUsed = null;
      if (reqGrid) {
        const isHeadingTag = element => Boolean(element && /^H[1-6]$/i.test(element.tagName));
        const headingIsProjectTitle = element => Boolean(title && element && typeof element.isSameNode === 'function' && element.isSameNode(title));
        const headingBeforeGrid = element => {
          if (!element || typeof element.compareDocumentPosition !== 'function') return false;
          return Boolean(element.compareDocumentPosition(reqGrid) & Node.DOCUMENT_POSITION_FOLLOWING);
        };
    
        let headingNode = null;
        let sibling = reqGrid.previousElementSibling;
        while (sibling) {
          if (isHeadingTag(sibling) && !headingIsProjectTitle(sibling) && headingBeforeGrid(sibling)) {
            headingNode = sibling;
            break;
          }
          sibling = sibling.previousElementSibling;
        }
    
        if (!headingNode) {
          const parent = reqGrid.parentElement;
          if (parent) {
            const candidates = Array.from(parent.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            for (let i = candidates.length - 1; i >= 0; i -= 1) {
              const candidate = candidates[i];
              if (!isHeadingTag(candidate)) continue;
              if (headingIsProjectTitle(candidate)) continue;
              if (headingBeforeGrid(candidate)) {
                headingNode = candidate;
                break;
              }
            }
          }
        }
    
        if (headingNode) {
          headingNodeUsed = headingNode;
          headingHtml = headingNode.outerHTML;
        } else {
          const fallbackLabel = reqGrid.getAttribute('data-heading') || 'Project Requirements';
          headingHtml = `<h3>${escapeHtml(fallbackLabel)}</h3>`;
        }
      }
      const projectHtml = reqGrid ? titleHtml + headingHtml + reqGrid.outerHTML : '';
      const projectName = extractProjectNameFromHeading(title);
      let table = doc.querySelector('.gear-table');
      if (!table) {
        const tables = Array.from(doc.querySelectorAll('table'));
        if (tables.length === 1) {
          table = tables[0];
        } else if (tables.length > 1) {
          const tableAfterGearHeading = tables.find(tbl => {
            const prev = tbl.previousElementSibling;
            return prev && prev.matches('h3') && /gear list/i.test(prev.textContent || '');
          });
          table = tableAfterGearHeading || tables[0];
        }
      }
      const gearHeadingHtml = projectName ? `<h2>Gear List: “${escapeHtml(projectName)}”</h2>` : '';
      let gearHtml = '';
      if (table) {
        ensureGearTableCategoryGrouping(table);
        gearHtml = gearHeadingHtml + table.outerHTML;
      }
      if (!gearHtml) {
        const bodyClone = doc.body ? doc.body.cloneNode(true) : null;
        const bodyHtml = doc.body ? doc.body.innerHTML.trim() : '';
        if (bodyClone) {
          if (title) {
            const cloneTitle = bodyClone.querySelector('h2');
            if (cloneTitle) cloneTitle.remove();
          }
          if (headingNodeUsed) {
            const headingTag = headingNodeUsed.tagName ? headingNodeUsed.tagName.toLowerCase() : '';
            const headingText = headingNodeUsed.textContent ? headingNodeUsed.textContent.trim() : '';
            const cloneHeading = headingTag ? bodyClone.querySelector(headingTag) : null;
            if (cloneHeading && (!headingText || (cloneHeading.textContent || '').trim() === headingText)) {
              cloneHeading.remove();
            }
          } else {
            const cloneHeading = bodyClone.querySelector('h3');
            if (cloneHeading && /project requirements/i.test(cloneHeading.textContent || '')) {
              cloneHeading.remove();
            }
          }
          if (reqGrid) {
            const cloneGrid = bodyClone.querySelector('.requirements-grid');
            if (cloneGrid) cloneGrid.remove();
          }
          const fallbackHtml = bodyClone.innerHTML.trim();
          if (fallbackHtml) {
            gearHtml = fallbackHtml;
          } else if (bodyHtml) {
            gearHtml = bodyHtml;
          }
        } else if (bodyHtml) {
          gearHtml = bodyHtml;
        }
      }
      return { projectHtml, gearHtml };
    }
    
    // Expose for modules like overview.js
    if (typeof global !== 'undefined') {
      global.splitGearListHtml = splitGearListHtml;
    }
    
    function describeRequirement(field, value) {
      const val = value || '';
      const parts = [];
      if (field === 'requiredScenarios') {
        const scenarios = val.split(',').map(s => s.trim());
        if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
          parts.push('Adds rain deflector and cables for rain use.');
        }
        if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
          parts.push('Includes D-Tap splitters and extension cables for Steadicam/Trinity rigs.');
        }
        if (scenarios.includes('Gimbal')) {
          parts.push('Adds gimbal rigging and power accessories.');
        }
      } else if (field === 'mattebox') {
        const v = val.toLowerCase();
        if (v.includes('swing')) {
          parts.push('Adds ARRI LMB 4x5 Pro Set and accessories.');
        } else if (v.includes('rod')) {
          parts.push('Adds ARRI LMB 4x5 15mm LWS Set and accessories.');
        } else if (v.includes('clamp')) {
          parts.push('Adds ARRI LMB 4x5 Clamp-On Set with adapter rings.');
        }
      } else if (field === 'cameraHandle') {
        const selections = val.split(',').map(s => s.trim());
        if (selections.includes('Hand Grips')) {
          parts.push('Adds SHAPE Telescopic Handle kit.');
        }
        if (selections.includes('Handle Extension')) {
          parts.push('Adds ARRI HEX-3 handle extension.');
        }
        if (selections.includes('L-Handle')) {
          parts.push('Adds ARRI Handle Extension Set.');
        }
      } else if (field === 'viewfinderExtension') {
        if (val) parts.push('Adds viewfinder extension to support accessories.');
      } else if (field === 'gimbal') {
        if (val) parts.push('Includes selected gimbal and support accessories.');
      } else if (field === 'easyrig') {
        if (val && val !== 'no further stabilisation') {
          parts.push('Adds selected stabiliser to gear list.');
        }
      } else if (field === 'codec') {
        if (val) parts.push('Notes chosen codec for post-production reference.');
      } else if (field === 'monitoringConfiguration') {
        if (val)
          parts.push('Adds default monitors and cable sets for each role.');
      } else if (field === 'videoDistribution') {
        if (val) parts.push('Includes distribution hardware for the selected method.');
      }
      return parts.join(' ');
    }
    
    const GEAR_TABLE_CATEGORY_META = Object.freeze({
      Camera: {
        summary: 'Primary camera body chosen for the current setup.',
        logic: 'Always included so the crew preps the selected camera package.'
      },
      'Camera Support': {
        summary: 'Baseplates, cages and handle accessories for mounting the camera.',
        logic: 'Matched to your camera body, selected handles and any scenario add-ons.'
      },
      Media: {
        summary: 'Recording media that works with the selected camera.',
        logic: 'Picks capacities that cover the camera codecs without running out of space.'
      },
      Lens: {
        summary: 'Optics selected in the project requirements.',
        logic: 'Pulled directly from your lens choices so they travel with the kit.'
      },
      'Lens Support': {
        summary: 'Lens support brackets, rails and rings sized for your glass.',
        logic: 'Added automatically when lenses or matte box setups require additional support.'
      },
      'Matte box + filter': {
        summary: 'Matte boxes, trays and filter packs.',
        logic: 'Generated from your matte box preference and filter selections, including required adapters.'
      },
      'LDS (FIZ)': {
        summary: 'Focus, iris and zoom control hardware.',
        logic: 'Reflects the motors and controllers picked in the wireless FIZ section.'
      },
      'Camera Batteries': {
        summary: 'Batteries dedicated to powering the camera body.',
        logic: 'Sized from the camera power draw, runtime targets and hot-swap rules.'
      },
      'Monitoring Batteries': {
        summary: 'Power for handheld and field monitors.',
        logic: 'Ensures each monitor package includes enough charged batteries for the day.'
      },
      Chargers: {
        summary: 'Charging stations for included battery systems.',
        logic: 'Adds compatible chargers so battery rotations stay balanced during the shoot.'
      },
      Monitoring: {
        summary: 'On-set monitoring packages for the crew.',
        logic: 'Derived from monitoring configuration and distribution preferences in project details.'
      },
      'Monitoring support': {
        summary: 'Stands, brackets, straps and cages supporting monitors.',
        logic: 'Auto-matched to monitor sizes and usage (handheld, stand or cart setups).'
      },
      Rigging: {
        summary: 'Arms, clamps and mounting hardware for accessories.',
        logic: 'Includes core rigging plus extras triggered by scenarios like Steadicam or gimbal use.'
      },
      Power: {
        summary: 'Power distribution cables and adapters.',
        logic: 'Covers how accessories receive power from the main battery ecosystem.'
      },
      Grip: {
        summary: 'Support gear like sliders, stabilisers and Easyrig options.',
        logic: 'Reflects stabilisation preferences and active shooting scenarios.'
      },
      'Carts and Transportation': {
        summary: 'Carts, cases and transport aids for the camera department.',
        logic: 'Included so the crew can move, stage and secure the package efficiently.'
      },
      Miscellaneous: {
        summary: 'Utility items that keep the crew efficient and comfortable.',
        logic: 'Adds weather protection and helpful tools based on scenarios and best practices.'
      },
      Consumables: {
        summary: 'Expendables such as tapes, wipes and covers.',
        logic: 'Scaled to shoot length and weather needs so consumables never run short.'
      }
    });
    
    const DEFAULT_GEAR_TABLE_CATEGORY_META = Object.freeze({
      summary: 'Automatically generated grouping of related equipment.',
      logic: 'Filled using your project requirements, selections and saved auto gear rules.'
    });
    
    const getGearTableCategoryMeta = category => {
      if (!category) return DEFAULT_GEAR_TABLE_CATEGORY_META;
      return GEAR_TABLE_CATEGORY_META[category] || DEFAULT_GEAR_TABLE_CATEGORY_META;
    };
    
    const buildGearTableCategoryHelp = category => {
      const meta = getGearTableCategoryMeta(category);
      const parts = [];
      if (category) parts.push(`${category} – ${meta.summary}`);
      else parts.push(meta.summary);
      if (meta.logic) parts.push(`Logic: ${meta.logic}`);
      return parts.join(' ');
    };
    
    const formatDeviceCategoryLabel = category => {
      if (typeof category !== 'string' || !category.trim()) return '';
      return category
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    const formatDeviceCategoryPath = path => {
      if (!Array.isArray(path) || !path.length) return '';
      return path
        .map(part => formatDeviceCategoryLabel(part))
        .filter(Boolean)
        .join(' › ');
    };
    
    const DANGEROUS_SHARED_TAGS = new Set([
      'script',
      'style',
      'template',
      'iframe',
      'object',
      'embed',
      'link',
      'meta',
      'base'
    ]);
    
    const DANGEROUS_SHARED_ATTRS = new Set([
      'formaction',
      'action',
      'srcdoc'
    ]);
    
    function isSafeSharedUrl(value) {
      if (typeof value !== 'string') {
        return false;
      }
    
      const trimmed = value.trim();
      if (!trimmed) {
        return true;
      }
    
      if (trimmed.startsWith('#')) {
        return true;
      }
    
      if (/^(?:javascript|vbscript|data):/i.test(trimmed)) {
        return false;
      }
    
      try {
        const base = typeof window !== 'undefined' && window.location ? window.location.href : 'https://localhost';
        const url = new URL(trimmed, base);
        if (/^(?:javascript|vbscript|data):/i.test(url.protocol)) {
          return false;
        }
        if (typeof window !== 'undefined' && window.location && window.location.origin) {
          return url.origin === window.location.origin;
        }
        // If we cannot determine the origin, treat relative URLs as safe.
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      } catch (error) {
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      }
    
      return false;
    }
    
    function sanitizeSharedHtml(html) {
      if (!html) {
        return '';
      }
    
      if (typeof html !== 'string') {
        return sanitizeSharedHtml(String(html));
      }
    
      let doc;
      try {
        doc = new DOMParser().parseFromString(html, 'text/html');
      } catch (error) {
        console.warn('Failed to parse shared HTML for sanitization', error);
        return '';
      }
    
      if (!doc || !doc.body) {
        return '';
      }
    
      DANGEROUS_SHARED_TAGS.forEach(tag => {
        doc.body.querySelectorAll(tag).forEach(node => {
          node.remove();
        });
      });
    
      doc.body.querySelectorAll('*').forEach(element => {
        Array.from(element.attributes).forEach(attribute => {
          const name = attribute.name.toLowerCase();
          if (name.startsWith('on')) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'style') {
            element.removeAttribute(attribute.name);
            return;
          }
          if (DANGEROUS_SHARED_ATTRS.has(name)) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'href' || name === 'xlink:href' || name === 'src' || name === 'srcset') {
            const value = attribute.value || '';
            const parts = name === 'srcset'
              ? value.split(',').map(part => part.trim().split(/\s+/)[0]).filter(Boolean)
              : [value];
            if (!parts.every(isSafeSharedUrl)) {
              element.removeAttribute(attribute.name);
            }
            return;
          }
          if (name === 'target') {
            element.removeAttribute(attribute.name);
          }
        });
      });
    
      return doc.body.innerHTML;
    }
    
    function displayGearAndRequirements(html) {
      const { projectHtml, gearHtml } = splitGearListHtml(html);
      const safeProjectHtml = sanitizeSharedHtml(projectHtml);
      const safeGearHtml = sanitizeSharedHtml(gearHtml);
      if (projectRequirementsOutput) {
        if (safeProjectHtml) {
          projectRequirementsOutput.innerHTML = safeProjectHtml;
          projectRequirementsOutput.classList.remove('hidden');
          projectRequirementsOutput.querySelectorAll('.requirement-box').forEach(box => {
            const label = box.querySelector('.req-label')?.textContent || '';
            const value = box.querySelector('.req-value')?.textContent || '';
            const field = box.getAttribute('data-field') || '';
            const baseDesc = value ? `${label}: ${value}` : label;
            const logic = describeRequirement(field, value);
            const desc = logic ? `${baseDesc} – ${logic}` : baseDesc;
            box.setAttribute('title', desc);
            box.setAttribute('data-help', desc);
            box.querySelectorAll('.req-label, .req-value').forEach(el => {
              el.setAttribute('title', desc);
              el.setAttribute('data-help', desc);
            });
          });
          adjustGearListSelectWidths(projectRequirementsOutput);
        } else {
          projectRequirementsOutput.innerHTML = '';
          projectRequirementsOutput.classList.add('hidden');
        }
      }
      if (gearListOutput) {
        if (safeGearHtml) {
          gearListOutput.innerHTML = safeGearHtml;
          gearListOutput.classList.remove('hidden');
          applyFilterSelectionsToGearList();
          renderFilterDetails();
          const findDevice = name => {
            if (typeof name !== 'string' || !name.trim()) {
              return { info: null, category: '', categoryPath: [] };
            }
            const visited = new Set();
            const search = (node, path) => {
              if (!isPlainObjectValue(node) || visited.has(node)) return null;
              visited.add(node);
              if (
                Object.prototype.hasOwnProperty.call(node, name) &&
                isPlainObjectValue(node[name])
              ) {
                return { info: node[name], categoryPath: path };
              }
              for (const [key, value] of Object.entries(node)) {
                if (!isPlainObjectValue(value)) continue;
                const result = search(value, path.concat(key));
                if (result) return result;
              }
              return null;
            };
            const result = search(devices, []);
            if (result) {
              return {
                info: result.info,
                category: formatDeviceCategoryPath(result.categoryPath),
                categoryPath: result.categoryPath
              };
            }
            return { info: null, category: '', categoryPath: [] };
          };
    
          const buildGearItemHelp = ({
            name,
            countText,
            deviceInfo,
            libraryCategory,
            tableCategory
          }) => {
            const parts = [];
            const label = `${countText || ''}${name}`.trim();
            if (label) parts.push(label);
            const meta = getGearTableCategoryMeta(tableCategory);
            const categoryParts = [];
            if (tableCategory) categoryParts.push(`Gear list section: ${tableCategory}`);
            if (meta.summary) categoryParts.push(meta.summary);
            if (meta.logic) categoryParts.push(`Logic: ${meta.logic}`);
            if (!tableCategory && !categoryParts.length) {
              const fallback = getGearTableCategoryMeta('');
              if (fallback.summary) categoryParts.push(fallback.summary);
              if (fallback.logic) categoryParts.push(`Logic: ${fallback.logic}`);
            }
            if (categoryParts.length) parts.push(categoryParts.join(' – '));
            if (libraryCategory) parts.push(`Device library category: ${libraryCategory}`);
            if (deviceInfo) {
              let summary = generateSafeConnectorSummary(deviceInfo);
              summary = summary
                ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
                : '';
              if (deviceInfo.notes)
                summary = summary ? `${summary}; Notes: ${deviceInfo.notes}` : deviceInfo.notes;
              if (summary) parts.push(summary);
            }
            return parts.join(' – ');
          };
    
          gearListOutput.querySelectorAll('tbody.category-group').forEach(group => {
            const headingCell = group.querySelector('.category-row td');
            if (!headingCell) return;
            const tableCategory = headingCell.textContent.trim();
            group.setAttribute('data-gear-table-category', tableCategory);
            const helpText = buildGearTableCategoryHelp(tableCategory);
            headingCell.setAttribute('title', helpText);
            headingCell.setAttribute('data-help', helpText);
          });
    
          gearListOutput.querySelectorAll('.gear-item').forEach(span => {
            const name = span.getAttribute('data-gear-name') || span.textContent.trim();
            const { info, category } = findDevice(name);
            const countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
            const count = countMatch ? `${countMatch[1]}x ` : '';
            const tableCategory = span
              .closest('tbody.category-group')
              ?.getAttribute('data-gear-table-category');
            const desc = buildGearItemHelp({
              name,
              countText: count,
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            span.setAttribute('title', desc);
            span.setAttribute('data-help', desc);
            span.querySelectorAll('select').forEach(sel => {
              sel.setAttribute('title', desc);
              sel.setAttribute('data-help', desc);
              initFavoritableSelect(sel);
            });
          });
    
          // Standalone selects (not wrapped in .gear-item) still need descriptive help
          gearListOutput.querySelectorAll('select').forEach(sel => {
            if (sel.getAttribute('data-help')) return;
            const selected = sel.selectedOptions && sel.selectedOptions[0];
            const name = selected ? selected.textContent.trim() : sel.value;
            const { info, category } = findDevice(name);
            const tableCategory = sel
              .closest('tbody.category-group')
              ?.getAttribute('data-gear-table-category');
            const desc = buildGearItemHelp({
              name,
              countText: '1x ',
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            sel.setAttribute('title', desc);
            sel.setAttribute('data-help', desc);
            initFavoritableSelect(sel);
          });
          adjustGearListSelectWidths(gearListOutput);
        } else {
          gearListOutput.innerHTML = '';
          gearListOutput.classList.add('hidden');
        }
    
        if (typeof ensureGearListActions === 'function') {
          ensureGearListActions();
        } else if (!gearListOutput.querySelector('#gearListActions')) {
          const actions = document.createElement('div');
          actions.id = 'gearListActions';
          const note = document.createElement('p');
          note.id = 'gearListAutosaveNote';
          note.className = 'gear-list-autosave-note';
          note.hidden = true;
          note.setAttribute('hidden', '');
          actions.appendChild(note);
          gearListOutput.appendChild(actions);
        }
      }
      if (loadedSetupState) {
        setSliderBowlValue(loadedSetupState.sliderBowl || '');
        setEasyrigValue(loadedSetupState.easyrig || '');
      }
      const combinedHtmlSnapshot = `${safeProjectHtml || ''}${safeGearHtml || ''}`.trim();
      if (combinedHtmlSnapshot && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = combinedHtmlSnapshot;
      }
      updateGearListButtonVisibility();
      callCoreFunctionFromPart2('updateAutoGearHighlightToggleButton', [], { defer: true });
    }
    function getSliderBowlSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListSliderBowl') : null;
    }
    function getSliderBowlValue() {
      const sel = getSliderBowlSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.sliderBowl ? loadedSetupState.sliderBowl : '';
    }
    function setSliderBowlValue(val) {
      const sel = getSliderBowlSelect();
      if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }
    function getEasyrigSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListEasyrig') : null;
    }
    function getEasyrigValue() {
      const sel = getEasyrigSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.easyrig ? loadedSetupState.easyrig : '';
    }
    function setEasyrigValue(val) {
      const sel = getEasyrigSelect();
      if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }
    
    function sanitizeProjectInfoValue(value) {
      if (value === null || value === undefined) return undefined;
      if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
      }
      if (typeof value === 'number') {
        return Number.isNaN(value) ? undefined : value;
      }
      if (typeof value === 'boolean') {
        return value ? value : undefined;
      }
      if (Array.isArray(value)) {
        const sanitized = value
          .map((item) => sanitizeProjectInfoValue(item))
          .filter((item) => item !== undefined);
        return sanitized.length ? sanitized : undefined;
      }
      if (typeof value === 'object') {
        const sanitizedObj = sanitizeProjectInfo(value);
        return sanitizedObj || undefined;
      }
      return undefined;
    }
    
    function sanitizeProjectInfo(info) {
      if (!info || typeof info !== 'object') return null;
      const result = {};
      Object.entries(info).forEach(([key, value]) => {
        const sanitized = sanitizeProjectInfoValue(value);
        if (sanitized !== undefined) {
          result[key] = sanitized;
        }
      });
      return Object.keys(result).length > 0 ? result : null;
    }
    
    function hasProjectInfoData(value) {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'number') {
        return !Number.isNaN(value);
      }
      if (typeof value === 'boolean') {
        return value;
      }
      if (Array.isArray(value)) {
        return value.some(item => hasProjectInfoData(item));
      }
      if (typeof value === 'object') {
        return Object.keys(value).some(key => hasProjectInfoData(value[key]));
      }
      return false;
    }
    
    function projectInfoEquals(a, b) {
      if (a === b) return true;
      if (!a || !b) return false;
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i += 1) {
          if (!projectInfoEquals(a[i], b[i])) return false;
        }
        return true;
      }
      if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        return aKeys.every((key) => projectInfoEquals(a[key], b[key]));
      }
      return false;
    }
    
    function ensureDefaultProjectInfoSnapshot() {
      if (defaultProjectInfoSnapshot !== null) return;
      // Treat an entirely empty project info payload as the only "default" state so
      // any restored values—including those matching the UI's initial selections—are
      // preserved when sanitizing project info for storage.
      defaultProjectInfoSnapshot = {};
    }
    
    function deriveProjectInfo(info) {
      ensureDefaultProjectInfoSnapshot();
      const sanitized = sanitizeProjectInfo(info);
      if (!sanitized) {
        if (hasProjectInfoData(info) && hasProjectInfoData(currentProjectInfo)) {
          return currentProjectInfo;
        }
        return null;
      }
      if (
        defaultProjectInfoSnapshot &&
        projectInfoEquals(sanitized, defaultProjectInfoSnapshot)
      ) {
        return null;
      }
      return sanitized;
    }
    
    function setCurrentProjectInfo(info) {
      currentProjectInfo = info;
    }
    
    function getCurrentProjectInfo() {
      return currentProjectInfo;
    }
    
    function computeSetupSignature(state) {
      if (!state) return '';
      return [
        state.camera || '',
        state.monitor || '',
        state.video || '',
        state.cage || '',
        coreStableStringify(state.motors || []),
        coreStableStringify(state.controllers || []),
        state.distance || '',
        state.batteryPlate || '',
        state.battery || '',
        state.batteryHotswap || '',
        state.sliderBowl || '',
        state.easyrig || '',
        coreStableStringify(state.projectInfo || null),
        coreStableStringify(state.autoGearRules || null),
        coreStableStringify(state.diagramPositions || null)
      ].join('||');
    }
    
    function storeLoadedSetupState(state) {
      loadedSetupState = state;
      loadedSetupStateSignature = computeSetupSignature(state);
    }
    
    function getCurrentSetupState() {
      const info = projectForm ? collectProjectFormData() : {};
      info.sliderBowl = getSliderBowlValue();
      info.easyrig = getEasyrigValue();
      const projectInfo = deriveProjectInfo(info);
      const state = {
        camera: cameraSelect.value,
        monitor: monitorSelect.value,
        video: videoSelect.value,
        cage: cageSelect.value,
        motors: motorSelects.map(sel => sel.value),
        controllers: controllerSelects.map(sel => sel.value),
        distance: distanceSelect.value,
        batteryPlate: batteryPlateSelect.value,
        battery: batterySelect.value,
        batteryHotswap: hotswapSelect.value,
        sliderBowl: info.sliderBowl,
        easyrig: info.easyrig,
        projectInfo
      };
      state.batteryPlate = normalizeBatteryPlateValue(state.batteryPlate, state.battery);
      const projectRules = getProjectScopedAutoGearRules();
      if (projectRules && projectRules.length) {
        state.autoGearRules = projectRules;
      }
      const diagramPositions = getDiagramManualPositions();
      if (Object.keys(diagramPositions).length) {
        state.diagramPositions = diagramPositions;
      }
      return state;
    }
    
    function hasAnyDeviceSelection(state) {
      if (!state) return false;
      const isMeaningfulSelection = (value) => {
        if (Array.isArray(value)) {
          return value.some((item) => isMeaningfulSelection(item));
        }
        if (value == null) return false;
        const normalized = typeof value === 'string' ? value.trim() : value;
        if (!normalized) return false;
        if (typeof normalized === 'string' && normalized.toLowerCase() === 'none') {
          return false;
        }
        return true;
      };
    
      const primarySelections = [
        state.camera,
        state.monitor,
        state.video,
        state.cage,
        state.batteryPlate,
        state.battery,
        state.batteryHotswap
      ];
    
      if (primarySelections.some((value) => isMeaningfulSelection(value))) {
        return true;
      }
    
      if (isMeaningfulSelection(state.motors)) {
        return true;
      }
    
      if (isMeaningfulSelection(state.controllers)) {
        return true;
      }
    
      return false;
    }
    
    function checkSetupChanged() {
      if (!saveSetupBtn) return;
      const langTexts = texts[currentLang] || {};
      const fallbackTexts = texts.en || {};
      const saveLabel = langTexts.saveSetupBtn || fallbackTexts.saveSetupBtn || '';
      const updateLabel = langTexts.updateSetupBtn || fallbackTexts.updateSetupBtn || saveLabel;
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const selectedName = setupSelect && typeof setupSelect.value === 'string'
        ? setupSelect.value
        : '';
      if (selectedName && typedName && typedName !== selectedName) {
        setButtonLabelWithIcon(saveSetupBtn, updateLabel);
        return;
      }
      if (
        loadedSetupState &&
        selectedName &&
        typedName === selectedName
      ) {
        const currentSignature = computeSetupSignature(getCurrentSetupState());
        if (currentSignature !== loadedSetupStateSignature) {
          setButtonLabelWithIcon(saveSetupBtn, updateLabel);
          return;
        }
      }
      setButtonLabelWithIcon(saveSetupBtn, saveLabel);
    }
    
    var projectDialog = document.getElementById("projectDialog");
    var projectForm = document.getElementById("projectForm");
    var filterSelectElem = document.getElementById('filter');
    var filterDetailsStorage = document.getElementById('filterDetails');
    var matteboxSelect = document.getElementById('mattebox');
    var projectCancelBtn = document.getElementById("projectCancel");
    var feedbackDialog = document.getElementById("feedbackDialog");
    var feedbackForm = document.getElementById("feedbackForm");
    var feedbackCancelBtn = document.getElementById("fbCancel");
    var feedbackUseLocationBtn = document.getElementById("fbUseLocationBtn");
    const feedbackSubmitBtn = document.getElementById("fbSubmit");
    if (feedbackCancelBtn) {
      const cancelLabel =
        feedbackCancelBtn.textContent?.trim() ||
        texts[currentLang]?.cancelEditBtn ||
        texts.en?.cancelEditBtn ||
        'Cancel';
      setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
    }
    if (feedbackUseLocationBtn) {
      const locationLabel = feedbackUseLocationBtn.textContent?.trim() || 'Use Current Location';
      setButtonLabelWithIcon(feedbackUseLocationBtn, locationLabel, ICON_GLYPHS.pin);
    }
    if (feedbackSubmitBtn) {
      const submitLabel =
        feedbackSubmitBtn.textContent?.trim() ||
        texts[currentLang]?.feedbackSubmit ||
        texts.en?.feedbackSubmit ||
        'Save & Submit';
      setButtonLabelWithIcon(feedbackSubmitBtn, submitLabel, ICON_GLYPHS.paperPlane);
    }
    var loadFeedbackSafe = typeof loadFeedback === 'function' ? loadFeedback : () => ({});
    var saveFeedbackSafe = typeof saveFeedback === 'function' ? saveFeedback : () => {};
    var setupDiagramContainer = document.getElementById("diagramArea");
    const diagramLegend = document.getElementById("diagramLegend");
    var downloadDiagramBtn = document.getElementById("downloadDiagram");
    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");
    const resetViewBtn = document.getElementById("resetView");
    var gridSnapToggleBtn = document.getElementById("gridSnapToggle");
    const diagramHint = document.getElementById("diagramHint");
    
    let manualPositions = {};
    let lastDiagramPositions = {};
    
    function normalizeDiagramPositionsInput(positions) {
      if (!positions || typeof positions !== 'object') {
        return {};
      }
      const normalized = {};
      Object.entries(positions).forEach(([id, value]) => {
        if (!value || typeof value !== 'object') return;
        const x = Number(value.x);
        const y = Number(value.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        normalized[id] = { x, y };
      });
      return normalized;
    }
    
    function getDiagramManualPositions() {
      return normalizeDiagramPositionsInput(manualPositions);
    }
    
    function setManualDiagramPositions(positions, options = {}) {
      manualPositions = normalizeDiagramPositionsInput(positions);
      if (options && options.render === false) {
        return;
      }
      if (typeof renderSetupDiagram === 'function') {
        renderSetupDiagram();
      }
    }
    var gridSnap = false;
    let cleanupDiagramInteractions = null;
    
    // CSS used when exporting the setup diagram
    const diagramCssLight = `
    .node-box{fill:#f0f0f0;stroke:none;}
    .node-box.first-fiz{stroke:none;}
    .first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}
    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
    .conn{stroke:none;}
    .conn.red{fill:#d33;}
    .conn.blue{fill:#369;}
    .conn.green{fill:#090;}
    text{font-family:system-ui,sans-serif;}
    .edge-label{font-size:var(--font-size-diagram-label, 11px);}
    line{stroke:#333;stroke-width:2px;}
    path.edge-path{stroke:#333;stroke-width:2px;fill:none;}
    path.power{stroke:#d33;}
    path.video{stroke:#369;}
    path.fiz{stroke:#090;}
    .diagram-placeholder{font-style:italic;color:#666;margin:0;}
    `;
    const diagramCssDark = `
    .node-box{fill:#444;stroke:none;}
    .node-box.first-fiz{stroke:none;}
    .first-fiz-highlight{stroke:url(#firstFizGrad);}
    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
    text{fill:#fff;font-family:system-ui,sans-serif;}
    .edge-label{font-size:var(--font-size-diagram-label, 11px);}
    line{stroke:#fff;}
    path.edge-path{stroke:#fff;}
    path.power{stroke:#ff6666;}
    path.video{stroke:#7ec8ff;}
    path.fiz{stroke:#6f6;}
    .conn.red{fill:#ff6666;}
    .conn.blue{fill:#7ec8ff;}
    .conn.green{fill:#6f6;}
    .diagram-placeholder{color:#bbb;}
    `;
    
    function getDiagramCss(includeDark = true) {
      return diagramCssLight + (includeDark ? `@media (prefers-color-scheme: dark){${diagramCssDark}}` : '');
    }
    
    // Dedicated Uicons for the setup diagram.
    const DIAGRAM_BATTERY_ICON = iconGlyph('\uE1A6');
    const DIAGRAM_CAMERA_ICON = iconGlyph('\uE333');
    var DIAGRAM_MONITOR_ICON = iconGlyph('\uEFFC');
    const DIAGRAM_VIEWFINDER_ICON = iconGlyph('\uE338');
    const DIAGRAM_VIDEO_ICON = iconGlyph('\uF42A');
    const DIAGRAM_WIRELESS_ICON = iconGlyph('\uF4AC');
    const DIAGRAM_MOTORS_ICON = iconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS);
    const DIAGRAM_CONTROLLER_ICON = iconGlyph('\uE52A');
    const DIAGRAM_DISTANCE_ICON = iconGlyph('\uEFB9');
    const DIAGRAM_POWER_OUTPUT_ICON = iconGlyph('\uE212');
    const DIAGRAM_POWER_INPUT_ICON = iconGlyph('\uEE71');
    const DIAGRAM_TIMECODE_ICON = iconGlyph('\uE46F');
    const DIAGRAM_AUDIO_IN_ICON = iconGlyph('\uE6B7');
    const DIAGRAM_AUDIO_OUT_ICON = iconGlyph('\uECB5');
    const DIAGRAM_AUDIO_IO_ICON = iconGlyph('\uF487');
    
    var diagramConnectorIcons = Object.freeze({
      powerOut: DIAGRAM_POWER_OUTPUT_ICON,
      powerIn: DIAGRAM_POWER_INPUT_ICON,
      fiz: DIAGRAM_MOTORS_ICON,
      video: DIAGRAM_VIDEO_ICON,
      timecode: DIAGRAM_TIMECODE_ICON,
      audioIn: DIAGRAM_AUDIO_IN_ICON,
      audioOut: DIAGRAM_AUDIO_OUT_ICON,
      audioIo: DIAGRAM_AUDIO_IO_ICON,
      torque: DIAGRAM_MOTORS_ICON,
      controller: DIAGRAM_CONTROLLER_ICON,
      powerSpec: DIAGRAM_POWER_OUTPUT_ICON,
      powerSource: DIAGRAM_POWER_INPUT_ICON
    });
    
    const diagramIcons = {
      battery: DIAGRAM_BATTERY_ICON,
      camera: DIAGRAM_CAMERA_ICON,
      monitor: DIAGRAM_MONITOR_ICON,
      viewfinder: DIAGRAM_VIEWFINDER_ICON,
      video: DIAGRAM_WIRELESS_ICON,
      motors: DIAGRAM_MOTORS_ICON,
      controllers: DIAGRAM_CONTROLLER_ICON,
      handle: DIAGRAM_CONTROLLER_ICON,
      distance: DIAGRAM_DISTANCE_ICON
    };
    
    // Map overview section keys to diagram icons
    /* exported overviewSectionIcons */
    const overviewSectionIcons = {
      category_batteries: diagramIcons.battery,
      category_batteryHotswaps: diagramIcons.battery,
      category_cameras: diagramIcons.camera,
      category_viewfinders: diagramIcons.viewfinder,
      category_monitors: diagramIcons.monitor,
      category_video: diagramIcons.video,
      category_fiz_motors: diagramIcons.motors,
      category_fiz_controllers: diagramIcons.controllers,
      category_fiz_distance: diagramIcons.distance
    };
    
    const cameraProjectLegendIcon = document.getElementById('cameraProjectLegendIcon');
    if (cameraProjectLegendIcon) {
      applyIconGlyph(cameraProjectLegendIcon, DIAGRAM_CAMERA_ICON);
    }
    
    // Load an image and optionally strip a solid background using Canvas
    // List filters for existing device categories
    
    // NEW SETUP MANAGEMENT DOM ELEMENTS
    var generateOverviewBtn = document.getElementById('generateOverviewBtn');
    
    const videoOutputOptions = [
      '3G-SDI',
      '6G-SDI',
      '12G-SDI',
      'Mini BNC',
      'HDMI',
      'Mini HDMI',
      'Micro HDMI'
    ];
    
    function getAllFizConnectorTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        if (Array.isArray(cam.fizConnectors)) {
          cam.fizConnectors.forEach(fc => {
            if (fc && fc.type) types.add(fc.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    let fizConnectorOptions = getAllFizConnectorTypes();
    
    function updateFizConnectorOptions() {
      fizConnectorOptions = getAllFizConnectorTypes();
      document.querySelectorAll('.fiz-connector-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        fizConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (fizConnectorOptions.includes(current)) {
          sel.value = current;
        }
      });
    }
    
    function getAllMotorConnectorTypes() {
      const types = new Set();
      Object.values(devices.fiz?.motors || {}).forEach(m => {
        if (m && m.fizConnector) types.add(m.fizConnector);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    let motorConnectorOptions = getAllMotorConnectorTypes();
    
    function updateMotorConnectorOptions() {
      motorConnectorOptions = getAllMotorConnectorTypes();
      if (motorConnectorInput) {
        const cur = motorConnectorInput.value;
        motorConnectorInput.innerHTML = '';
        addEmptyOption(motorConnectorInput);
        motorConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          motorConnectorInput.appendChild(opt);
        });
        if (motorConnectorOptions.includes(cur)) motorConnectorInput.value = cur;
      }
    }
    
    function getAllControllerConnectors() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && Array.isArray(c.fizConnectors)) {
          c.fizConnectors.forEach(fc => { if (fc && fc.type) types.add(fc.type); });
        }
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    function getAllControllerPowerSources() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.powerSource) types.add(c.powerSource);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    function getAllControllerBatteryTypes() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.batteryType) types.add(c.batteryType);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    function getAllControllerConnectivity() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.connectivity) types.add(c.connectivity);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    let controllerConnectorOptions = getAllControllerConnectors();
    let controllerPowerOptions = getAllControllerPowerSources();
    let controllerBatteryOptions = getAllControllerBatteryTypes();
    let controllerConnectivityOptions = getAllControllerConnectivity();
    
    function updateControllerConnectorOptions() {
      controllerConnectorOptions = getAllControllerConnectors();
      if (controllerConnectorInput) {
        const cur = controllerConnectorInput.value;
        controllerConnectorInput.innerHTML = '';
        addEmptyOption(controllerConnectorInput);
        controllerConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectorInput.appendChild(opt);
        });
        if (controllerConnectorOptions.includes(cur)) controllerConnectorInput.value = cur;
      }
    }
    
    function updateControllerPowerOptions() {
      controllerPowerOptions = getAllControllerPowerSources();
      if (controllerPowerInput) {
        const cur = controllerPowerInput.value;
        controllerPowerInput.innerHTML = '';
        addEmptyOption(controllerPowerInput);
        controllerPowerOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerPowerInput.appendChild(opt);
        });
        if (controllerPowerOptions.includes(cur)) controllerPowerInput.value = cur;
      }
    }
    
    function updateControllerBatteryOptions() {
      controllerBatteryOptions = getAllControllerBatteryTypes();
      if (controllerBatteryInput) {
        const cur = controllerBatteryInput.value;
        controllerBatteryInput.innerHTML = '';
        addEmptyOption(controllerBatteryInput);
        controllerBatteryOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerBatteryInput.appendChild(opt);
        });
        if (controllerBatteryOptions.includes(cur)) controllerBatteryInput.value = cur;
      }
    }
    
    function updateControllerConnectivityOptions() {
      controllerConnectivityOptions = getAllControllerConnectivity();
      if (controllerConnectivityInput) {
        const cur = controllerConnectivityInput.value;
        controllerConnectivityInput.innerHTML = '';
        addEmptyOption(controllerConnectivityInput);
        controllerConnectivityOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectivityInput.appendChild(opt);
        });
        if (controllerConnectivityOptions.includes(cur)) controllerConnectivityInput.value = cur;
      }
    }
    
    function getAllDistanceConnections() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    function getAllDistanceMethods() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.measurementMethod) types.add(d.measurementMethod);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    function getAllDistanceDisplays() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.outputDisplay) types.add(d.outputDisplay);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }
    
    let distanceConnectionOptions = getAllDistanceConnections();
    let distanceMethodOptions = getAllDistanceMethods();
    let distanceDisplayOptions = getAllDistanceDisplays();
    
    function updateDistanceConnectionOptions() {
      distanceConnectionOptions = getAllDistanceConnections();
      if (distanceConnectionInput) {
        const cur = distanceConnectionInput.value;
        distanceConnectionInput.innerHTML = '';
        addEmptyOption(distanceConnectionInput);
        distanceConnectionOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceConnectionInput.appendChild(opt);
        });
        if (distanceConnectionOptions.includes(cur)) distanceConnectionInput.value = cur;
      }
    }
    
    function updateDistanceMethodOptions() {
      distanceMethodOptions = getAllDistanceMethods();
      if (distanceMethodInput) {
        const cur = distanceMethodInput.value;
        distanceMethodInput.innerHTML = '';
        addEmptyOption(distanceMethodInput);
        distanceMethodOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceMethodInput.appendChild(opt);
        });
        if (distanceMethodOptions.includes(cur)) distanceMethodInput.value = cur;
      }
    }
    
    function updateDistanceDisplayOptions() {
      distanceDisplayOptions = getAllDistanceDisplays();
      if (distanceOutputInput) {
        const cur = distanceOutputInput.value;
        distanceOutputInput.innerHTML = '';
        addEmptyOption(distanceOutputInput);
        distanceDisplayOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceOutputInput.appendChild(opt);
        });
        if (distanceDisplayOptions.includes(cur)) distanceOutputInput.value = cur;
      }
    }
    
    // Wrap a form field with a div containing a data-label attribute for styling.
    function createFieldWithLabel(el, label) {
      const wrapper = document.createElement('div');
      wrapper.className = 'field-with-label';
      wrapper.dataset.label = label;
      const fieldId = ensureElementId(el, label);
      const hiddenLabel = createHiddenLabel(fieldId, label);
      wrapper.appendChild(hiddenLabel);
      wrapper.appendChild(el);
      return wrapper;
    }
    
    // Helper used by select-row builders to insert an empty option.
    // Previously this inserted a blank option at the top of each select.
    // The UI no longer requires an empty choice, so this function is now a
    // no-op but kept for backward compatibility with existing calls.
    function addEmptyOption(/* select */) {
      // Intentionally left blank
    }
    
    // Utility to remove entries with value "None" or empty string
    function filterNoneEntries(list, prop = 'type') {
      if (!Array.isArray(list)) return [];
      return list.filter(item => {
        if (typeof item === 'string') {
          return item && item !== 'None';
        }
        if (item && Object.prototype.hasOwnProperty.call(item, prop)) {
          const val = item[prop];
          return val !== undefined && val !== null && val !== '' && val !== 'None';
        }
        return true;
      });
    }
    
    // Build a single row of the video output editor UI.
    function createVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-output-select';
      select.name = 'videoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setVideoOutputs(list) {
      videoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type;
          videoOutputsContainer.appendChild(createVideoOutputRow(t));
        });
      } else {
        videoOutputsContainer.appendChild(createVideoOutputRow());
      }
    }
    
    function getVideoOutputs() {
      return Array.from(videoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(vo => vo.type && vo.type !== 'None');
    }
    
    function clearVideoOutputs() {
      setVideoOutputs([]);
    }
    
    function createMonitorVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'monitor-video-input-select';
      select.name = 'monitorVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createMonitorVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (monitorVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setMonitorVideoInputs(list) {
      monitorVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow(t));
        });
      } else {
        monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow());
      }
    }
    
    function getMonitorVideoInputs() {
      return Array.from(monitorVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearMonitorVideoInputs() {
      setMonitorVideoInputs([]);
    }
    
    function createMonitorVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'monitor-video-output-select';
      select.name = 'monitorVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createMonitorVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (monitorVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setMonitorVideoOutputs(list) {
      monitorVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow(t));
        });
      } else {
        monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow());
      }
    }
    
    function getMonitorVideoOutputs() {
      return Array.from(monitorVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearMonitorVideoOutputs() {
      setMonitorVideoOutputs([]);
    }
    
    function createViewfinderVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'viewfinder-video-input-select';
      select.name = 'viewfinderVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderVideoInputsContainer && viewfinderVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setViewfinderVideoInputs(list) {
      if (!viewfinderVideoInputsContainer) return;
      viewfinderVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow(t));
        });
      } else {
        viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow());
      }
    }
    
    function getViewfinderVideoInputs() {
      if (!viewfinderVideoInputsContainer) return [];
      return Array.from(viewfinderVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearViewfinderVideoInputs() {
      setViewfinderVideoInputs([]);
    }
    
    function createViewfinderVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'viewfinder-video-output-select';
      select.name = 'viewfinderVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderVideoOutputsContainer && viewfinderVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setViewfinderVideoOutputs(list) {
      if (!viewfinderVideoOutputsContainer) return;
      viewfinderVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow(t));
        });
      } else {
        viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow());
      }
    }
    
    function getViewfinderVideoOutputs() {
      if (!viewfinderVideoOutputsContainer) return [];
      return Array.from(viewfinderVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearViewfinderVideoOutputs() {
      setViewfinderVideoOutputs([]);
    }
    
    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);
    
    function createVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-input-select';
      select.name = 'videoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setVideoInputs(list) {
      videoVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoInputsContainer.appendChild(createVideoInputRow(t));
        });
      } else {
        videoVideoInputsContainer.appendChild(createVideoInputRow());
      }
    }
    
    function getVideoInputs() {
      return Array.from(videoVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearVideoInputs() { setVideoInputs([]); }
    
    function createVideoIOOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-output-select-io';
      select.name = 'videoIOOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoIOOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setVideoOutputsIO(list) {
      videoVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoOutputsContainer.appendChild(createVideoIOOutputRow(t));
        });
      } else {
        videoVideoOutputsContainer.appendChild(createVideoIOOutputRow());
      }
    }
    
    function getVideoOutputsIO() {
      return Array.from(videoVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }
    
    function clearVideoOutputsIO() { setVideoOutputsIO([]); }
    
    // Build a row for editing a FIZ connector entry.
    function createFizConnectorRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'fiz-connector-select';
      select.name = 'fizConnector';
      addEmptyOption(select);
      fizConnectorOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createFizConnectorRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (fizConnectorContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }
    
    function setFizConnectors(list) {
      fizConnectorContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type;
          fizConnectorContainer.appendChild(createFizConnectorRow(t));
        });
      } else {
        fizConnectorContainer.appendChild(createFizConnectorRow());
      }
    }
    
    function getFizConnectors() {
      return Array.from(fizConnectorContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(fc => fc.type && fc.type !== 'None');
    }
    
    function clearFizConnectors() {
      setFizConnectors([]);
    }
    
    function getAllRecordingMedia() {
      const media = new Set();
      Object.values(devices.cameras).forEach(cam => {
        if (Array.isArray(cam.recordingMedia)) {
          cam.recordingMedia.forEach(m => { if (m && m.type) media.add(m.type); });
        }
      });
      return Array.from(media).sort(localeSort);
    }
    
    let recordingMediaOptions = getAllRecordingMedia();
    
    function updateRecordingMediaOptions() {
      recordingMediaOptions = getAllRecordingMedia();
      document.querySelectorAll('.recording-media-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        recordingMediaOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (recordingMediaOptions.includes(cur)) sel.value = cur;
      });
    }
    
    // Build a row allowing the user to specify recording media details.
    function createRecordingMediaRow(type = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const select = document.createElement('select');
      select.className = 'recording-media-select';
      select.name = 'recordingMediaType';
      addEmptyOption(select);
      recordingMediaOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      if (type) {
        if (!recordingMediaOptions.includes(type)) {
          const opt = document.createElement('option');
          opt.value = type;
          opt.textContent = type;
          select.appendChild(opt);
        }
        select.value = type;
      }
      row.appendChild(createFieldWithLabel(select, 'Type'));
    
      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.name = 'recordingMediaNotes';
      notesInput.value = notes;
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createRecordingMediaRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (cameraMediaContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    const setRecordingMediaLocal = list => {
      cameraMediaContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', notes = '' } = item || {};
          cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes));
        });
      } else {
        cameraMediaContainer.appendChild(createRecordingMediaRow());
      }
    };

    writeCoreScopeValue('setRecordingMedia', setRecordingMediaLocal);
    
    function getRecordingMedia() {
      return Array.from(cameraMediaContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [sel, notesInput] = row.querySelectorAll('select, input');
          return { type: sel.value, notes: notesInput.value };
        })
        .filter(m => m.type && m.type !== 'None');
    }

    writeCoreScopeValue('getRecordingMedia', getRecordingMedia);
    
    function clearRecordingMedia() {
      setRecordingMediaLocal([]);
    }
    
    function powerInputTypes(dev) {
      const out = [];
      if (!dev) return out;
      const add = t => {
        normalizePowerPortType(t).forEach(pt => out.push(pt));
      };
      if (dev.powerInput) {
        String(dev.powerInput)
          .split('/')
          .forEach(t => {
            if (t.trim()) add(t.trim());
          });
      }
      const inp = dev.power?.input;
      if (Array.isArray(inp)) {
        inp.forEach(i => {
          const typeVal = i && (i.type || i.portType);
          if (typeVal) add(typeVal);
        });
      } else if (inp) {
        const typeVal = inp.type || inp.portType;
        if (typeVal) add(typeVal);
      }
      return out;
    }
    
    function firstPowerInputType(dev) {
      const list = powerInputTypes(dev);
      return list.length ? list[0] : '';
    }
    
    function getAllPowerPortTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => powerInputTypes(cam).forEach(t => types.add(t)));
      Object.values(devices.viewfinders || {}).forEach(vf => powerInputTypes(vf).forEach(t => types.add(t)));
      Object.values(devices.monitors || {}).forEach(mon => powerInputTypes(mon).forEach(t => types.add(t)));
      Object.values(devices.video || {}).forEach(vd => powerInputTypes(vd).forEach(t => types.add(t)));
      Object.values(devices.fiz?.motors || {}).forEach(m => powerInputTypes(m).forEach(t => types.add(t)));
      Object.values(devices.fiz?.controllers || {}).forEach(c => powerInputTypes(c).forEach(t => types.add(t)));
      Object.values(devices.fiz?.distance || {}).forEach(d => powerInputTypes(d).forEach(t => types.add(t)));
      return Array.from(types).sort(localeSort);
    }
    
    let powerPortOptions = getAllPowerPortTypes();
    
    function updatePowerPortOptions() {
      powerPortOptions = getAllPowerPortTypes();
      const current = cameraPortTypeInput.value;
      cameraPortTypeInput.innerHTML = '';
      addEmptyOption(cameraPortTypeInput);
      powerPortOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        cameraPortTypeInput.appendChild(opt);
      });
      if (powerPortOptions.includes(current)) cameraPortTypeInput.value = current;
    
      if (monitorPortTypeInput) {
        const curMon = monitorPortTypeInput.value;
        monitorPortTypeInput.innerHTML = '';
        addEmptyOption(monitorPortTypeInput);
        powerPortOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          monitorPortTypeInput.appendChild(opt);
        });
        if (powerPortOptions.includes(curMon)) monitorPortTypeInput.value = curMon;
      }
    }
    
    function getAllPlateTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        const list = cam.power?.batteryPlateSupport;
        if (Array.isArray(list)) {
          list.forEach(bp => {
            if (bp && bp.type) types.add(bp.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    let plateTypeOptions = getAllPlateTypes();
    
    function updatePlateTypeOptions() {
      plateTypeOptions = getAllPlateTypes();
      document.querySelectorAll('.battery-plate-type-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        plateTypeOptions.forEach(pt => {
          const opt = document.createElement('option');
          opt.value = pt;
          opt.textContent = pt;
          sel.appendChild(opt);
        });
        if (plateTypeOptions.includes(current)) sel.value = current;
      });
    }
    
    // Build a battery plate row with type, mount and optional notes fields.
    function createBatteryPlateRow(type = '', mount = 'native', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const typeSelect = document.createElement('select');
      typeSelect.className = 'battery-plate-type-select';
      typeSelect.name = 'batteryPlateType';
      addEmptyOption(typeSelect);
      plateTypeOptions.forEach(pt => {
        const opt = document.createElement('option');
        opt.value = pt;
        opt.textContent = pt;
        typeSelect.appendChild(opt);
      });
      if (type && !plateTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    
      const mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'batteryPlateMount';
      ['native','adapted'].forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || '';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));
    
      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'batteryPlateNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createBatteryPlateRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (batteryPlatesContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    const setBatteryPlatesLocal = list => {
      batteryPlatesContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', mount = 'native', notes = '' } = item || {};
          batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
        });
      } else {
        batteryPlatesContainer.appendChild(createBatteryPlateRow());
      }
    };

    writeCoreScopeValue('setBatteryPlates', setBatteryPlatesLocal);

    function getBatteryPlates() {
      return Array.from(batteryPlatesContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, mountSel, notesInput] = row.querySelectorAll('select, input');
          return { type: typeSel.value, mount: mountSel.value, notes: notesInput.value };
        })
        .filter(bp => bp.type && bp.type !== 'None');
    }

    writeCoreScopeValue('getBatteryPlates', getBatteryPlates);

    function clearBatteryPlates() {
      setBatteryPlatesLocal([]);
    }
    
    function getAllViewfinderTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(vf => {
            if (vf && vf.type) types.add(vf.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    function getAllViewfinderConnectors() {
      const conns = new Set();
      Object.values(devices.cameras).forEach(cam => {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(vf => {
            if (vf && vf.connector) conns.add(vf.connector);
          });
        }
      });
      return Array.from(conns).filter(c => c).sort(localeSort);
    }
    
    var viewfinderTypeOptions = getAllViewfinderTypes();
    var viewfinderConnectorOptions = getAllViewfinderConnectors();
    
    // Build a viewfinder configuration row used in the camera editor.
    function createViewfinderRow(type = '', resolution = '', connector = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const typeSelect = document.createElement('select');
      typeSelect.className = 'viewfinder-type-select';
      typeSelect.name = 'viewfinderType';
      addEmptyOption(typeSelect);
      viewfinderTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !viewfinderTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    
      const resInput = document.createElement('input');
      resInput.type = 'text';
      resInput.placeholder = 'Resolution';
      resInput.value = resolution;
      resInput.name = 'viewfinderResolution';
      row.appendChild(createFieldWithLabel(resInput, 'Resolution'));
    
      const connSelect = document.createElement('select');
      connSelect.className = 'viewfinder-connector-select';
      addEmptyOption(connSelect);
      connSelect.name = 'viewfinderConnector';
      viewfinderConnectorOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        connSelect.appendChild(opt);
      });
      if (connector && !viewfinderConnectorOptions.includes(connector)) {
        const opt = document.createElement('option');
        opt.value = connector;
        opt.textContent = connector;
        connSelect.appendChild(opt);
      }
      connSelect.value = connector;
      row.appendChild(createFieldWithLabel(connSelect, 'Connector'));
    
      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'viewfinderNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    function setViewfinders(list) {
      viewfinderContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', resolution = '', connector = '', notes = '' } = item || {};
          viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
        });
      } else {
        viewfinderContainer.appendChild(createViewfinderRow());
      }
    }
    
    function getViewfinders() {
      return Array.from(viewfinderContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSelect, resInput, connSelect, notesInput] = row.querySelectorAll('select, input');
          return {
            type: typeSelect.value,
            resolution: resInput.value,
            connector: connSelect.value,
            notes: notesInput.value
          };
        })
        .filter(vf => vf.type && vf.type !== 'None');
    }
    
    function clearViewfinders() {
      setViewfinders([]);
    }
    
    function getAllMountTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        if (Array.isArray(cam.lensMount)) {
          cam.lensMount.forEach(lm => {
            if (lm && lm.type) types.add(lm.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    let mountTypeOptions = getAllMountTypes();
    
    function updateMountTypeOptions() {
      mountTypeOptions = getAllMountTypes();
      document.querySelectorAll('.lens-mount-type-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        mountTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (mountTypeOptions.includes(current)) sel.value = current;
      });
    }
    
    // Build a lens mount row with type and mount selection fields.
    function createLensMountRow(type = '', mount = 'native') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const typeSelect = document.createElement('select');
      typeSelect.className = 'lens-mount-type-select';
      typeSelect.name = 'lensMountType';
      addEmptyOption(typeSelect);
      mountTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !mountTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    
      const mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'lensMount';
      ['native', 'adapted'].forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || '';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['lensMountHeading', ['cameraLensMountLabel']],
        fallbackContext: 'Lens Mount',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createLensMountRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['lensMountHeading', ['cameraLensMountLabel']],
        fallbackContext: 'Lens Mount',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (lensMountContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    function setLensMounts(list) {
      lensMountContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', mount = 'native' } = item || {};
          lensMountContainer.appendChild(createLensMountRow(type, mount));
        });
      } else {
        lensMountContainer.appendChild(createLensMountRow());
      }
    }
    
    function getLensMounts() {
      return Array.from(lensMountContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, mountSel] = row.querySelectorAll('select');
          return { type: typeSel.value, mount: mountSel.value };
        })
        .filter(lm => lm.type && lm.type !== 'None');
    }
    
    function clearLensMounts() {
      setLensMounts([]);
    }
    
    function getAllPowerDistTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.type) types.add(pd.type); });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    let powerDistTypeOptions = getAllPowerDistTypes();
    function getAllPowerDistVoltages() {
      const volts = new Set();
      Object.values(devices.cameras).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.voltage) volts.add(pd.voltage); });
        }
      });
      return Array.from(volts).filter(v => v).sort(localeSort);
    }
    
    function getAllPowerDistCurrents() {
      const currents = new Set();
      Object.values(devices.cameras).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.current) currents.add(pd.current); });
        }
      });
      return Array.from(currents).filter(c => c).sort(localeSort);
    }
    
    let powerDistVoltageOptions = getAllPowerDistVoltages();
    let powerDistCurrentOptions = getAllPowerDistCurrents();
    
    function updatePowerDistVoltageOptions() {
      powerDistVoltageOptions = getAllPowerDistVoltages();
      document.querySelectorAll('.power-dist-voltage-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistVoltageOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistVoltageOptions.includes(cur)) sel.value = cur;
      });
    }
    
    function updatePowerDistCurrentOptions() {
      powerDistCurrentOptions = getAllPowerDistCurrents();
      document.querySelectorAll('.power-dist-current-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistCurrentOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistCurrentOptions.includes(cur)) sel.value = cur;
      });
    }
    
    function updatePowerDistTypeOptions() {
      powerDistTypeOptions = getAllPowerDistTypes();
      document.querySelectorAll('.power-dist-type-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistTypeOptions.includes(cur)) sel.value = cur;
      });
    }
    
    // Build a power distribution output row for the editor UI.
    function createPowerDistRow(type = '', voltage = '', current = '', wattage = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const typeSelect = document.createElement('select');
      typeSelect.className = 'power-dist-type-select';
      typeSelect.name = 'powerDistType';
      addEmptyOption(typeSelect);
      powerDistTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !powerDistTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    
      const voltSelect = document.createElement('select');
      voltSelect.className = 'power-dist-voltage-select';
      addEmptyOption(voltSelect);
      voltSelect.name = 'powerDistVoltage';
      powerDistVoltageOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        voltSelect.appendChild(opt);
      });
      if (voltage && !powerDistVoltageOptions.includes(voltage)) {
        const opt = document.createElement('option');
        opt.value = voltage;
        opt.textContent = voltage;
        voltSelect.appendChild(opt);
      }
      voltSelect.value = voltage;
      row.appendChild(createFieldWithLabel(voltSelect, 'Voltage'));
    
      const currSelect = document.createElement('select');
      currSelect.className = 'power-dist-current-select';
      addEmptyOption(currSelect);
      currSelect.name = 'powerDistCurrent';
      powerDistCurrentOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        currSelect.appendChild(opt);
      });
      if (current && !powerDistCurrentOptions.includes(current)) {
        const opt = document.createElement('option');
        opt.value = current;
        opt.textContent = current;
        currSelect.appendChild(opt);
      }
      currSelect.value = current;
      row.appendChild(createFieldWithLabel(currSelect, 'Current'));
    
      const wattInput = document.createElement('input');
      wattInput.type = 'number';
      wattInput.step = '0.1';
      wattInput.placeholder = 'W';
      wattInput.value = wattage === null || wattage === undefined ? '' : wattage;
      wattInput.name = 'powerDistWatt';
      row.appendChild(createFieldWithLabel(wattInput, 'W')); 
    
      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'powerDistNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createPowerDistRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (powerDistContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    function setPowerDistribution(list) {
      powerDistContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', voltage = '', current = '', wattage = '', notes = '' } = item || {};
          powerDistContainer.appendChild(createPowerDistRow(type, voltage, current, wattage, notes));
        });
      } else {
        powerDistContainer.appendChild(createPowerDistRow());
      }
    }
    
    function getPowerDistribution() {
      return Array.from(powerDistContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, voltSel, currSel, wattInput, notesInput] = row.querySelectorAll('select, input');
          return {
            type: typeSel.value,
            voltage: voltSel.value,
            current: currSel.value,
            wattage: wattInput.value ? parseFloat(wattInput.value) : null,
            notes: notesInput.value
          };
        })
        .filter(pd => pd.type && pd.type !== 'None');
    }
    
    function clearPowerDistribution() {
      setPowerDistribution([]);
    }
    
    function getAllTimecodeTypes() {
      const types = new Set();
      Object.values(devices.cameras).forEach(cam => {
        const list = cam.timecode;
        if (Array.isArray(list)) {
          list.forEach(tc => { if (tc && tc.type) types.add(tc.type); });
        }
      });
      return Array.from(types).sort(localeSort);
    }
    
    let timecodeTypeOptions = getAllTimecodeTypes();
    
    function updateTimecodeTypeOptions() {
      timecodeTypeOptions = getAllTimecodeTypes();
      document.querySelectorAll('.timecode-type-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        timecodeTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (timecodeTypeOptions.includes(cur)) sel.value = cur;
      });
    }
    
    // Build a timecode connector row used for editing camera properties.
    function createTimecodeRow(type = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
    
      const typeSelect = document.createElement('select');
      typeSelect.className = 'timecode-type-select';
      typeSelect.name = 'timecodeType';
      addEmptyOption(typeSelect);
      timecodeTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !timecodeTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));
    
      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'timecodeNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));
    
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButton(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createTimecodeRow());
      });
      row.appendChild(addBtn);
    
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButton(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (timecodeContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
    
      return row;
    }
    
    function setTimecodes(list) {
      timecodeContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', notes = '' } = item || {};
          timecodeContainer.appendChild(createTimecodeRow(type, notes));
        });
      } else {
        timecodeContainer.appendChild(createTimecodeRow());
      }
    }
    
    function getTimecodes() {
      return Array.from(timecodeContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, notesInput] = row.querySelectorAll('select, input');
          return { type: typeSel.value, notes: notesInput.value };
        })
        .filter(tc => tc.type && tc.type !== 'None');
    }
    
      function clearTimecodes() {
        setTimecodes([]);
      }
    
      function getFavoriteValues(id) {
        const favs = loadFavorites();
        return Array.isArray(favs[id]) ? favs[id] : [];
      }
    
      function applyFavoritesToSelect(selectElem) {
        if (!selectElem || !selectElem.id) return;
        const favVals = getFavoriteValues(selectElem.id);
        if (!favVals.length) return;
        const opts = Array.from(selectElem.options);
        const noneOpt = opts.find(o => o.value === 'None');
        const others = opts.filter(o => o !== noneOpt);
        const favOpts = [];
        const restOpts = [];
        others.forEach(o => (favVals.includes(o.value) ? favOpts.push(o) : restOpts.push(o)));
        favOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
        restOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
        selectElem.innerHTML = '';
        if (noneOpt) selectElem.appendChild(noneOpt);
        favOpts.forEach(o => selectElem.appendChild(o));
        restOpts.forEach(o => selectElem.appendChild(o));
      }
    
      function updateFavoriteButton(selectElem) {
        if (!selectElem || !selectElem._favButton) return;
        const favVals = getFavoriteValues(selectElem.id);
        const val = selectElem.value;
        const isFav = favVals.includes(val);
        selectElem._favButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
        selectElem._favButton.classList.toggle('favorited', isFav);
        selectElem._favButton.disabled = val === 'None';
        selectElem._favButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
      }
    
      function toggleFavorite(selectElem) {
        if (!selectElem || !selectElem.id) return;
        const val = selectElem.value;
        if (val === 'None') return;
        const favs = loadFavorites();
        const list = Array.isArray(favs[selectElem.id]) ? favs[selectElem.id] : [];
        const idx = list.indexOf(val);
        if (idx === -1) list.push(val); else list.splice(idx, 1);
        if (list.length) favs[selectElem.id] = list; else delete favs[selectElem.id];
        saveFavorites(favs);
        applyFavoritesToSelect(selectElem);
        updateFavoriteButton(selectElem);
        adjustGearListSelectWidth(selectElem);
      }
    
      let selectWidthMeasureElement = null;
    
      function getSelectWidthMeasureElement() {
        if (selectWidthMeasureElement && selectWidthMeasureElement.isConnected) {
          return selectWidthMeasureElement;
        }
        const span = document.createElement('span');
        span.className = 'gear-select-width-measure';
        Object.assign(span.style, {
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          pointerEvents: 'none',
          top: '-9999px',
          left: '-9999px',
          padding: '0',
          margin: '0',
          border: '0'
        });
        const parent = document.body || document.documentElement;
        parent.appendChild(span);
        selectWidthMeasureElement = span;
        return span;
      }
    
      function measureSelectTextWidth(selectElem, text, styles) {
        const content = text && text.length ? text : '\u00a0';
        const computedStyles = styles || window.getComputedStyle(selectElem);
        if (!computedStyles) {
          return content.length * 8;
        }
        const measureElem = getSelectWidthMeasureElement();
        const parent = document.body || document.documentElement;
        if (measureElem.parentElement !== parent) parent.appendChild(measureElem);
    
        if (computedStyles.font && computedStyles.font !== 'normal normal normal medium/normal serif') {
          measureElem.style.font = computedStyles.font;
        } else {
          measureElem.style.fontStyle = computedStyles.fontStyle || 'normal';
          measureElem.style.fontVariant = computedStyles.fontVariant || 'normal';
          measureElem.style.fontWeight = computedStyles.fontWeight || '400';
          measureElem.style.fontStretch = computedStyles.fontStretch || 'normal';
          measureElem.style.fontSize = computedStyles.fontSize || '16px';
          measureElem.style.fontFamily = computedStyles.fontFamily || 'sans-serif';
          measureElem.style.lineHeight = computedStyles.lineHeight || 'normal';
        }
        measureElem.style.letterSpacing = computedStyles.letterSpacing || 'normal';
        measureElem.style.textTransform = computedStyles.textTransform || 'none';
        measureElem.textContent = content;
        return measureElem.getBoundingClientRect().width;
      }
    
      function adjustGearListSelectWidth(selectElem) {
        if (!selectElem || selectElem.multiple || selectElem.size > 1) return;
        const container = selectElem.closest('#gearListOutput, #projectRequirementsOutput');
        if (!container) return;
        const styles = window.getComputedStyle(selectElem);
        if (!styles || styles.display === 'none') {
          selectElem.style.removeProperty('--gear-select-width');
          return;
        }
        const selectedOption = selectElem.selectedOptions && selectElem.selectedOptions[0];
        const optionText = selectedOption ? selectedOption.textContent.trim() : selectElem.value || '';
        const textWidth = measureSelectTextWidth(selectElem, optionText, styles);
        const paddingLeft = parseFloat(styles.paddingLeft) || 0;
        const paddingRight = parseFloat(styles.paddingRight) || 0;
        const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
        const borderRight = parseFloat(styles.borderRightWidth) || 0;
        const fontSize = parseFloat(styles.fontSize) || 16;
        // Reserve space for the native arrow that keeps the disclosure indicator
        // visible without leaving an oversized gap between the option text and the
        // edge of the control.
        const arrowReserve = Math.max(fontSize * 0.5, 10);
        const minWidth = Math.max(fontSize * 4, 56);
        const widthPx = Math.max(
          Math.ceil(textWidth + paddingLeft + paddingRight + borderLeft + borderRight + arrowReserve),
          minWidth
        );
        selectElem.style.setProperty('--gear-select-width', `${widthPx}px`);
      }
    
      function adjustGearListSelectWidths(container) {
        if (!container) return;
        container
          .querySelectorAll('select')
          .forEach(selectElem => adjustGearListSelectWidth(selectElem));
      }
    
      function ensureSelectWrapper(selectElem) {
        if (!selectElem) return null;
        let wrapper = selectElem.parentElement;
        if (!wrapper || !wrapper.classList.contains('select-wrapper')) {
          if (wrapper && wrapper.tagName === 'LABEL') {
            const label = wrapper;
            wrapper = document.createElement('div');
            wrapper.className = 'select-wrapper';
            label.parentElement.insertBefore(wrapper, label.nextSibling);
            wrapper.appendChild(selectElem);
          } else {
            wrapper = document.createElement('div');
            wrapper.className = 'select-wrapper';
            selectElem.insertAdjacentElement('beforebegin', wrapper);
            wrapper.appendChild(selectElem);
          }
        }
        return wrapper;
      }
    
      function initFavoritableSelect(selectElem) {
        if (!selectElem || !selectElem.id || selectElem.multiple || selectElem.hidden) return;
        const wrapper = ensureSelectWrapper(selectElem);
        const gearItem = selectElem.closest('.gear-item');
    
        function cleanupFavoriteButton(btn) {
          if (!btn) return;
          if (btn._favListener) {
            btn.removeEventListener('click', btn._favListener);
            btn._favListener = null;
          }
          btn.remove();
        }
    
        let favoriteButton =
          selectElem._favButton && selectElem._favButton.isConnected ? selectElem._favButton : null;
    
        if (wrapper) {
          const wrapperButtons = Array.from(wrapper.querySelectorAll('.favorite-toggle'));
          if (favoriteButton && !wrapperButtons.includes(favoriteButton)) {
            favoriteButton = null;
          }
          if (!favoriteButton && wrapperButtons.length > 0) {
            [favoriteButton] = wrapperButtons;
          }
          wrapperButtons.forEach(btn => {
            if (btn !== favoriteButton) cleanupFavoriteButton(btn);
          });
        }
    
        if (gearItem) {
          Array.from(gearItem.querySelectorAll('.favorite-toggle'))
            .filter(
              btn =>
                btn !== favoriteButton && btn.getAttribute('data-fav-select-id') === selectElem.id
            )
            .forEach(cleanupFavoriteButton);
        }
    
        if (!favoriteButton) {
          favoriteButton = document.createElement('button');
          if (wrapper) {
            wrapper.appendChild(favoriteButton);
          } else {
            selectElem.after(favoriteButton);
          }
        } else if (wrapper && favoriteButton.parentElement !== wrapper) {
          wrapper.appendChild(favoriteButton);
        }
    
        if (favoriteButton._favListener) {
          favoriteButton.removeEventListener('click', favoriteButton._favListener);
        }
        favoriteButton.type = 'button';
        favoriteButton.className = 'favorite-toggle';
        favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
        favoriteButton.setAttribute('aria-pressed', 'false');
        favoriteButton.setAttribute('data-fav-select-id', selectElem.id);
        const clickHandler = () => toggleFavorite(selectElem);
        favoriteButton.addEventListener('click', clickHandler);
        favoriteButton._favListener = clickHandler;
    
        if (!selectElem._favChangeListener) {
          const changeListener = () => updateFavoriteButton(selectElem);
          selectElem.addEventListener('change', changeListener);
          selectElem._favChangeListener = changeListener;
        }
    
        selectElem._favButton = favoriteButton;
        selectElem._favInit = true;
    
        if (selectElem._favButton) {
          selectElem._favButton.setAttribute('data-fav-select-id', selectElem.id);
          selectElem._favButton.setAttribute('aria-label', texts[currentLang].favoriteToggleLabel);
          selectElem._favButton.setAttribute('title', texts[currentLang].favoriteToggleLabel);
          selectElem._favButton.setAttribute(
            'data-help',
            texts[currentLang].favoriteToggleHelp || texts[currentLang].favoriteToggleLabel
          );
        }
    
        applyFavoritesToSelect(selectElem);
        updateFavoriteButton(selectElem);
        adjustGearListSelectWidth(selectElem);
      }
    
      // Populate dropdowns with device options
      function populateSelect(selectElem, optionsObj = {}, includeNone = true) {
        if (!selectElem) return;
        // Ensure we always work with an object so Object.keys does not throw if
        // `optionsObj` is passed as `null`.
        const opts = optionsObj && typeof optionsObj === "object" ? optionsObj : {};
        selectElem.innerHTML = "";
        if (includeNone) {
          const noneOpt = document.createElement("option");
          noneOpt.value = "None";
          const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
          noneOpt.textContent = noneMap[currentLang] || "None";
          selectElem.appendChild(noneOpt);
        }
        Object.keys(opts)
          .filter(name => name !== "None")
          .sort(localeSort)
          .forEach(name => {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            selectElem.appendChild(opt);
          });
        initFavoritableSelect(selectElem);
      }
    
    function populateMonitorSelect() {
      const filtered = Object.fromEntries(
        Object.entries(devices.monitors || {})
          .filter(([, data]) => !(data.wirelessRX && !data.wirelessTx))
      );
      populateSelect(monitorSelect, filtered, true);
    }
    
    function getCompatibleCagesForCamera(cameraName) {
      const allCages = devices?.accessories?.cages || {};
      if (!cameraName || cameraName === 'None') {
        return allCages;
      }
      return Object.fromEntries(
        Object.entries(allCages).filter(([, cage]) => {
          if (!cage || typeof cage !== 'object') {
            return true;
          }
          const compat = cage.compatible;
          if (Array.isArray(compat)) {
            return compat.includes(cameraName);
          }
          if (typeof compat === 'string' && compat) {
            return compat === cameraName;
          }
          return !compat;
        })
      );
    }
    
    function applyCageSelectValue(value) {
      if (!cageSelect) return;
      if (typeof setSelectValue === 'function') {
        setSelectValue(cageSelect, value);
        return;
      }
      if (typeof value === 'string') {
        cageSelect.value = value;
        if (cageSelect.value !== value) {
          if (value === 'None') {
            cageSelect.value = 'None';
          } else {
            cageSelect.selectedIndex = -1;
          }
        }
        return;
      }
      cageSelect.value = '';
    }
    
    function updateCageSelectOptions(preferredValue) {
      if (!cageSelect) return;
      const cameraName = cameraSelect ? cameraSelect.value : '';
      const compatibleCages = getCompatibleCagesForCamera(cameraName);
      const desiredValue = typeof preferredValue === 'string' ? preferredValue : cageSelect.value;
      populateSelect(cageSelect, compatibleCages, true);
    
      const hasDesired =
        desiredValue && desiredValue !== 'None'
        && Object.prototype.hasOwnProperty.call(compatibleCages, desiredValue);
    
      if (hasDesired) {
        applyCageSelectValue(desiredValue);
        return;
      }
    
      const options = Array.from(cageSelect.options || []);
      const noneOption = options.find(opt => opt.value === 'None');
      if (desiredValue === 'None' && noneOption) {
        applyCageSelectValue('None');
        return;
      }
    
      if (noneOption) {
        applyCageSelectValue('None');
        return;
      }
    
      const firstOption = options.find(opt => opt.value && opt.value !== 'None');
      applyCageSelectValue(firstOption ? firstOption.value : '');
    }
    
    function filterSelect(selectElem, filterValue) {
      const text = filterValue.toLowerCase();
      Array.from(selectElem.options).forEach(opt => {
        if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
          opt.hidden = false;
          opt.disabled = false;
        } else {
          opt.hidden = true;
          opt.disabled = true;
        }
      });
    }
    
    function filterDeviceList(listElem, filterValue) {
      const text = filterValue.toLowerCase();
      Array.from(listElem.querySelectorAll('li')).forEach(li => {
        const nameSpan = li.querySelector('.device-summary span');
        const name = nameSpan ? nameSpan.textContent.toLowerCase() : '';
        if (text === '' || name.includes(text)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    }
    
    // Attach in-select search filtering for a dropdown
    function attachSelectSearch(selectElem) {
      let searchStr = "";
      let timer;
    
      selectElem.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          searchStr = searchStr.slice(0, -1);
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else if (e.key === 'Escape') {
          searchStr = "";
          filterSelect(selectElem, searchStr);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          searchStr += e.key.toLowerCase();
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else {
          return;
        }
    
        clearTimeout(timer);
        timer = setTimeout(() => {
          searchStr = "";
        }, 1000);
        if (typeof timer.unref === 'function') {
          timer.unref();
        }
      });
    
      selectElem.addEventListener('blur', () => {
        searchStr = "";
        filterSelect(selectElem, "");
      });
    }
    
    function bindFilterInput(inputElem, callback) {
      if (!inputElem) {
        return;
      }
      inputElem.addEventListener("input", callback);
      inputElem.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          inputElem.value = "";
          callback();
        }
      });
      addInputClearButton(inputElem, callback);
    }
    
    function addInputClearButton(inputElem, callback) {
      const label = (texts[currentLang] && texts[currentLang].clearFilter) || "Clear filter";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "clear-input-btn";
      btn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'clear-icon');
      btn.setAttribute("aria-label", label);
      btn.title = label;
      btn.hidden = true;
      btn.addEventListener("click", () => {
        inputElem.value = "";
        callback();
        inputElem.focus();
      });
      inputElem.insertAdjacentElement("afterend", btn);
      const toggle = () => {
        btn.hidden = !inputElem.value;
      };
      inputElem.addEventListener("input", toggle);
      toggle();
    }
    
    const filterHelperScope =
      (typeof globalThis !== 'undefined' && globalThis)
      || (typeof window !== 'undefined' && window)
      || (typeof self !== 'undefined' && self)
      || (typeof global !== 'undefined' && global)
      || null;
    
    if (filterHelperScope) {
      if (typeof filterHelperScope.filterSelect !== 'function') {
        filterHelperScope.filterSelect = filterSelect;
      }
      if (typeof filterHelperScope.filterDeviceList !== 'function') {
        filterHelperScope.filterDeviceList = filterDeviceList;
      }
      if (typeof filterHelperScope.attachSelectSearch !== 'function') {
        filterHelperScope.attachSelectSearch = attachSelectSearch;
      }
      if (typeof filterHelperScope.bindFilterInput !== 'function') {
        filterHelperScope.bindFilterInput = bindFilterInput;
      }
      if (typeof filterHelperScope.addInputClearButton !== 'function') {
        filterHelperScope.addInputClearButton = addInputClearButton;
      }
    }
    
    function applyFilters() {
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(({ list, filterInput }) => {
        if (!list) return;
        const value = filterInput ? filterInput.value : '';
        filterDeviceList(list, value);
      });
    }
    
    // Initialize device selection dropdowns
    populateSelect(cameraSelect, devices.cameras, true);
    populateMonitorSelect();
    populateSelect(videoSelect, devices.video, true);
    updateCageSelectOptions();
    motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
    controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
    populateSelect(distanceSelect, devices.fiz.distance, true);
    populateSelect(batterySelect, devices.batteries, true);
    populateSelect(hotswapSelect, devices.batteryHotswaps || {}, true);
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    
    // Enable search inside dropdowns
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect]
      .forEach(sel => attachSelectSearch(sel));
    motorSelects.forEach(sel => attachSelectSearch(sel));
    controllerSelects.forEach(sel => attachSelectSearch(sel));
    applyFilters();
    setVideoOutputs([]);
    setMonitorVideoInputs([]);
    setMonitorVideoOutputs([]);
    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);
    setFizConnectors([]);
    updateFizConnectorOptions();
    updateMotorConnectorOptions();
    updateControllerConnectorOptions();
    updateControllerPowerOptions();
    updateControllerBatteryOptions();
    updateControllerConnectivityOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();
    setViewfinders([]);
    setBatteryPlatesLocal([]);
    setRecordingMediaLocal([]);
    updateRecordingMediaOptions();
    updatePlateTypeOptions();
    setLensMounts([]);
    updateMountTypeOptions();
    updatePowerPortOptions();
    setPowerDistribution([]);
    updatePowerDistTypeOptions();
    updatePowerDistVoltageOptions();
    updatePowerDistCurrentOptions();
    setTimecodes([]);
    updateTimecodeTypeOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();
    
    // Set default selections for dropdowns
    
    // Kamera: Wenn Option „None“ existiert, dann setze sie – sonst erste Option
    const noneCameraOption = Array.from(cameraSelect.options).find(opt => opt.value === "None");
    if (noneCameraOption) {
      cameraSelect.value = "None";
    } else {
      cameraSelect.selectedIndex = 0;
    }
    
    // Für die anderen Dropdowns
    [monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    
    // FIZ Dropdowns
    motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    
    // Calculation function to update results and warnings
    function renderTemperatureNote(baseHours) {
      const container = document.getElementById("temperatureNote");
      if (!container) return;
      const heading = texts[currentLang].temperatureNoteHeading;
      let html = `<p>${heading}</p>`;
      if (!baseHours || !isFinite(baseHours)) {
        container.innerHTML = html;
        return;
      }
      const temperatureHeader = getTemperatureColumnLabelForLang(currentLang, temperatureUnit);
      html += `<table><tr><th>${temperatureHeader}</th><th>${texts[currentLang].runtimeLabel}</th><th>${texts[currentLang].batteryCountTempLabel}</th></tr>`;
      TEMPERATURE_SCENARIOS.forEach(scenario => {
        const runtime = baseHours * scenario.factor;
        const runtimeCell = Number.isFinite(runtime) ? runtime.toFixed(2) : '0.00';
        let batteries = '–';
        if (Number.isFinite(runtime) && runtime > 0) {
          batteries = Math.ceil(10 / runtime);
        }
        const temperatureCell = formatTemperatureForDisplay(scenario.celsius);
        html += `<tr><td style="color:${scenario.color}">${temperatureCell}</td><td>${runtimeCell}</td><td>${batteries}</td></tr>`;
      });
      html += "</table>";
      container.innerHTML = html;
    }
    
    function ensureFeedbackTemperatureOptions(select) {
      if (!select) return;
      const expectedOptions = FEEDBACK_TEMPERATURE_MAX - FEEDBACK_TEMPERATURE_MIN + 2;
      if (select.options.length === expectedOptions) {
        return;
      }
      const previousValue = select.value;
      select.innerHTML = '';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '';
      select.appendChild(emptyOpt);
      for (let temp = FEEDBACK_TEMPERATURE_MIN; temp <= FEEDBACK_TEMPERATURE_MAX; temp += 1) {
        const opt = document.createElement('option');
        opt.value = String(temp);
        select.appendChild(opt);
      }
      if (previousValue) {
        select.value = previousValue;
      }
    }
    
    function updateFeedbackTemperatureOptions(lang = currentLang, unit = temperatureUnit) {
      const tempSelect = document.getElementById('fbTemperature');
      if (!tempSelect) return;
      ensureFeedbackTemperatureOptions(tempSelect);
      Array.from(tempSelect.options).forEach(option => {
        if (!option) return;
        if (option.value === '') {
          option.textContent = '';
          return;
        }
        const celsiusValue = Number(option.value);
        if (!Number.isFinite(celsiusValue)) return;
        option.textContent = formatTemperatureForDisplay(celsiusValue, {
          lang,
          unit,
          includeSign: 'negative'
        });
      });
    }
    
    function updateFeedbackTemperatureLabel(lang = currentLang, unit = temperatureUnit) {
      const labelTextElem = document.getElementById('fbTemperatureLabelText');
      const labelElem = document.getElementById('fbTemperatureLabel');
      const label = `${getTemperatureColumnLabelForLang(lang, unit)}:`;
      if (labelTextElem) {
        labelTextElem.textContent = label;
      } else if (labelElem) {
        labelElem.textContent = label;
      }
    }
    
    function applyTemperatureUnitPreference(unit, options = {}) {
      const normalized = normalizeTemperatureUnit(unit);
      const { persist = true, reRender = true, forceUpdate = false } = options || {};
      if (!forceUpdate && temperatureUnit === normalized) {
        return;
      }
      temperatureUnit = normalized;
      if (persist && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(TEMPERATURE_STORAGE_KEY, temperatureUnit);
        } catch (error) {
          console.warn('Could not save temperature unit preference', error);
        }
      }
      if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
        settingsTemperatureUnit.value = temperatureUnit;
      }
      if (reRender) {
        updateFeedbackTemperatureLabel();
        updateFeedbackTemperatureOptions();
        renderTemperatureNote(lastRuntimeHours);
      }
    }
    
    // Calculation function to update results and warnings
    function updateCalculations() {
      // Gather selected values
      const camera      = cameraSelect.value;
      const monitor     = monitorSelect.value;
      const video       = videoSelect.value;
      const motors      = motorSelects.map(sel => sel.value);
      const controllers = controllerSelects.map(sel => sel.value);
      const distance    = distanceSelect.value;
      let battery       = batterySelect.value;

      const totalPowerTarget = typeof totalPowerElem !== 'undefined'
        ? totalPowerElem
        : (typeof document !== 'undefined' ? document.getElementById('totalPower') : null);
      const breakdownListTarget = typeof breakdownListElem !== 'undefined'
        ? breakdownListElem
        : (typeof document !== 'undefined' ? document.getElementById('breakdownList') : null);
      const totalCurrent144Target = typeof totalCurrent144Elem !== 'undefined'
        ? totalCurrent144Elem
        : (typeof document !== 'undefined' ? document.getElementById('totalCurrent144') : null);
      const totalCurrent12Target = typeof totalCurrent12Elem !== 'undefined'
        ? totalCurrent12Elem
        : (typeof document !== 'undefined' ? document.getElementById('totalCurrent12') : null);
      const batteryLifeTarget = typeof batteryLifeElem !== 'undefined'
        ? batteryLifeElem
        : (typeof document !== 'undefined' ? document.getElementById('batteryLife') : null);
      const batteryCountTarget = typeof batteryCountElem !== 'undefined'
        ? batteryCountElem
        : (typeof document !== 'undefined' ? document.getElementById('batteryCount') : null);
      const batteryLifeLabelTarget = typeof batteryLifeLabelElem !== 'undefined'
        ? batteryLifeLabelElem
        : (typeof document !== 'undefined' ? document.getElementById('batteryLifeLabel') : null);
      const runtimeAverageNoteTarget = typeof runtimeAverageNoteElem !== 'undefined'
        ? runtimeAverageNoteElem
        : (typeof document !== 'undefined' ? document.getElementById('runtimeAverageNote') : null);
      const pinWarnTarget = typeof pinWarnElem !== 'undefined'
        ? pinWarnElem
        : (typeof document !== 'undefined' ? document.getElementById('pinWarning') : null);
      const dtapWarnTarget = typeof dtapWarnElem !== 'undefined'
        ? dtapWarnElem
        : (typeof document !== 'undefined' ? document.getElementById('dtapWarning') : null);
      const hotswapWarnTarget = typeof hotswapWarnElem !== 'undefined'
        ? hotswapWarnElem
        : (typeof document !== 'undefined' ? document.getElementById('hotswapWarning') : null);

      // Calculate total power consumption (W)
      let cameraW = 0;
      if (devices.cameras[camera] !== undefined) {
        const camData = devices.cameras[camera];
        cameraW = typeof camData === 'object' ? camData.powerDrawWatts || 0 : camData;
      }
      let monitorW = 0;
      if (devices.monitors[monitor] !== undefined) {
        const mData = devices.monitors[monitor];
        monitorW = typeof mData === 'object' ? mData.powerDrawWatts || 0 : mData;
      }
      let videoW = 0;
      if (devices.video[video] !== undefined) {
        const vData = devices.video[video];
        videoW = typeof vData === 'object' ? vData.powerDrawWatts || 0 : vData;
      }
      let motorsW = 0;
      motors.forEach(m => {
        if (devices.fiz.motors[m] !== undefined) {
          const d = devices.fiz.motors[m];
          motorsW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
        }
      });
      let controllersW = 0;
      controllers.forEach(c => {
        if (devices.fiz.controllers[c] !== undefined) {
          const d = devices.fiz.controllers[c];
          controllersW += typeof d === 'object' ? d.powerDrawWatts || 0 : d;
        }
      });
      let distanceW = 0;
      if (devices.fiz.distance[distance] !== undefined) {
        const d = devices.fiz.distance[distance];
        distanceW = typeof d === 'object' ? d.powerDrawWatts || 0 : d;
      }
    
      const totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;
      if (totalPowerTarget) {
        totalPowerTarget.textContent = totalWatt.toFixed(1);
      }
    
      const segments = [
        { power: cameraW, className: "camera", label: texts[currentLang].cameraLabel },
        { power: monitorW, className: "monitor", label: texts[currentLang].monitorLabel },
        { power: videoW, className: "video", label: texts[currentLang].videoLabel },
        { power: motorsW, className: "motors", label: texts[currentLang].fizMotorsLabel },
        { power: controllersW, className: "controllers", label: texts[currentLang].fizControllersLabel },
        { power: distanceW, className: "distance", label: texts[currentLang].distanceLabel }
      ].filter(s => s.power > 0);
    
      // Update breakdown by category
      if (breakdownListTarget) {
        breakdownListTarget.innerHTML = "";
        if (cameraW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].cameraLabel}</strong> ${cameraW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
        if (monitorW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].monitorLabel}</strong> ${monitorW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
        if (videoW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].videoLabel}</strong> ${videoW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
        if (motorsW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].fizMotorsLabel}</strong> ${motorsW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
        if (controllersW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].fizControllersLabel}</strong> ${controllersW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
        if (distanceW > 0) {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${texts[currentLang].distanceLabel}</strong> ${distanceW.toFixed(1)} W`;
          breakdownListTarget.appendChild(li);
        }
      }
    
      // Calculate currents depending on battery type
      const selectedPlate = getSelectedPlate();
      const mountVoltages = getMountVoltageConfig(selectedPlate);
      const bMountCam = selectedPlate === 'B-Mount';
      const highV = Number.isFinite(mountVoltages.high) ? mountVoltages.high : (bMountCam ? 33.6 : 14.4);
      const lowV = Number.isFinite(mountVoltages.low) ? mountVoltages.low : (bMountCam ? 21.6 : 12.0);
      let totalCurrentHigh = 0;
      let totalCurrentLow = 0;
      if (totalWatt > 0) {
        totalCurrentHigh = totalWatt / highV;
        totalCurrentLow = totalWatt / lowV;
      }
      refreshTotalCurrentLabels(currentLang, selectedPlate, mountVoltages);
      if (totalCurrent144Target) {
        totalCurrent144Target.textContent = totalCurrentHigh.toFixed(2);
      }
      if (totalCurrent12Target) {
        totalCurrent12Target.textContent = totalCurrentLow.toFixed(2);
      }
    
      // Update battery and hotswap options based on current draw
      updateBatteryOptions();
      battery = batterySelect.value;
    
    // Wenn kein Akku oder "None" ausgewählt ist: Laufzeit = nicht berechenbar, keine Warnungen
    let hours = null;
    if (!battery || battery === "None" || !devices.batteries[battery]) {
      if (batteryLifeTarget) {
        batteryLifeTarget.textContent = "–";
      }
      if (batteryCountTarget) {
        batteryCountTarget.textContent = "–";
      }
      setStatusMessage(pinWarnTarget, '');
      setStatusLevel(pinWarnTarget, null);
      setStatusMessage(dtapWarnTarget, '');
      setStatusLevel(dtapWarnTarget, null);
      if (hotswapWarnTarget) {
        setStatusMessage(hotswapWarnTarget, '');
        setStatusLevel(hotswapWarnTarget, null);
      }
      closePowerWarningDialog();
      lastRuntimeHours = null;
      drawPowerDiagram(0, segments, 0);
    } else {
        const battData = devices.batteries[battery];
        const hsName = hotswapSelect.value;
        const hsData = devices.batteryHotswaps && devices.batteryHotswaps[hsName];
        const capacityWh = battData.capacity + (hsData?.capacity || 0);
        let maxPinA = battData.pinA;
        const maxDtapA = battData.dtapA;
        if (hsData && typeof hsData.pinA === 'number') {
          if (hsData.pinA < maxPinA) {
            setStatusMessage(
              hotswapWarnTarget,
              texts[currentLang].warnHotswapLower
                .replace("{max}", hsData.pinA)
                .replace("{batt}", battData.pinA)
            );
            setStatusLevel(hotswapWarnTarget, 'warning');
            maxPinA = hsData.pinA;
          } else {
            setStatusMessage(hotswapWarnTarget, '');
            setStatusLevel(hotswapWarnTarget, null);
          }
        } else {
          if (hotswapWarnTarget) {
            setStatusMessage(hotswapWarnTarget, '');
            setStatusLevel(hotswapWarnTarget, null);
          }
        }
        const availableWatt = maxPinA * lowV;
        drawPowerDiagram(availableWatt, segments, maxPinA);
        if (totalCurrent144Target) {
          totalCurrent144Target.textContent = totalCurrentHigh.toFixed(2);
        }
        if (totalCurrent12Target) {
          totalCurrent12Target.textContent = totalCurrentLow.toFixed(2);
        }
        if (totalWatt === 0) {
          hours = Infinity;
          if (batteryLifeTarget) {
            batteryLifeTarget.textContent = "∞";
          }
        } else {
          hours = capacityWh / totalWatt;
          if (batteryLifeTarget) {
            batteryLifeTarget.textContent = hours.toFixed(2);
          }
        }
        lastRuntimeHours = hours;
        // Round up total batteries to the next full number
        let batteriesNeeded = 1;
        if (Number.isFinite(hours) && hours > 0) {
          batteriesNeeded = Math.max(1, Math.ceil(10 / hours));
        }
        if (batteryCountTarget) {
          batteryCountTarget.textContent = batteriesNeeded.toString();
        }
        // Warnings about current draw vs battery limits
        setStatusMessage(pinWarnTarget, '');
        setStatusMessage(dtapWarnTarget, '');
        let pinSeverity = "";
        let dtapSeverity = "";
        if (totalCurrentLow > maxPinA) {
          setStatusMessage(
            pinWarnTarget,
            texts[currentLang].warnPinExceeded
              .replace("{current}", totalCurrentLow.toFixed(2))
              .replace("{max}", maxPinA)
          );
          pinSeverity = 'danger';
        } else if (totalCurrentLow > maxPinA * 0.8) {
          setStatusMessage(
            pinWarnTarget,
            texts[currentLang].warnPinNear
              .replace("{current}", totalCurrentLow.toFixed(2))
              .replace("{max}", maxPinA)
          );
          pinSeverity = 'warning';
        }
        if (!bMountCam) {
          if (totalCurrentLow > maxDtapA) {
            setStatusMessage(
              dtapWarnTarget,
              texts[currentLang].warnDTapExceeded
                .replace("{current}", totalCurrentLow.toFixed(2))
                .replace("{max}", maxDtapA)
            );
            dtapSeverity = 'danger';
          } else if (totalCurrentLow > maxDtapA * 0.8) {
            setStatusMessage(
              dtapWarnTarget,
              texts[currentLang].warnDTapNear
                .replace("{current}", totalCurrentLow.toFixed(2))
                .replace("{max}", maxDtapA)
            );
            dtapSeverity = 'warning';
          }
        }
        const hasPinLimit = typeof maxPinA === 'number' && maxPinA > 0;
        const pinsInsufficient = !hasPinLimit || totalCurrentLow > maxPinA;
        const hasDtapRating = typeof maxDtapA === 'number' && maxDtapA > 0;
        const dtapAllowed = !bMountCam && hasDtapRating;
        const dtapInsufficient = !dtapAllowed || (hasDtapRating && totalCurrentLow > maxDtapA);
        if (totalCurrentLow > 0 && pinsInsufficient && dtapInsufficient) {
          const option = batterySelect && batterySelect.options
            ? batterySelect.options[batterySelect.selectedIndex]
            : null;
          const labelText = option && typeof option.textContent === 'string'
            ? option.textContent.trim()
            : String(battery || '');
          showPowerWarningDialog({
            batteryName: labelText,
            current: totalCurrentLow,
            hasPinLimit,
            pinLimit: hasPinLimit ? maxPinA : null,
            hasDtapRating,
            dtapLimit: hasDtapRating ? maxDtapA : null,
            dtapAllowed,
          });
        } else {
          closePowerWarningDialog();
        }
        // Show max current capability and status (OK/Warning) for Pin and D-Tap
        if (pinWarnTarget && pinWarnTarget.textContent === "") {
          setStatusMessage(
            pinWarnTarget,
            texts[currentLang].pinOk
              .replace("{max}", maxPinA)
          );
          setStatusLevel(pinWarnTarget, 'success');
        } else {
          setStatusLevel(pinWarnTarget, pinSeverity || 'warning');
        }
        if (!bMountCam) {
          if (dtapWarnTarget && dtapWarnTarget.textContent === "") {
            setStatusMessage(
              dtapWarnTarget,
              texts[currentLang].dtapOk
                .replace("{max}", maxDtapA)
            );
            setStatusLevel(dtapWarnTarget, 'success');
          } else {
            setStatusLevel(dtapWarnTarget, dtapSeverity || 'warning');
          }
        } else {
          setStatusMessage(dtapWarnTarget, '');
          setStatusLevel(dtapWarnTarget, null);
        }
      }
    
      // Battery comparison table update
      if (totalWatt > 0) {
        // Build lists of batteries that can supply this current (via Pin or D-Tap)
        const selectedBatteryName = batterySelect.value;
        const camName = cameraSelect.value;
        const plateFilter = getSelectedPlate();
        const supportsB = supportsBMountCamera(camName);
        const supportsGold = supportsGoldMountCamera(camName);
        let selectedCandidate = null;
        if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
          const selData = devices.batteries[selectedBatteryName];
          if (
            (!plateFilter || selData.mount_type === plateFilter) &&
            (supportsB || selData.mount_type !== 'B-Mount') &&
            (supportsGold || selData.mount_type !== 'Gold-Mount')
          ) {
            const pinOK_sel = totalCurrentLow <= selData.pinA;
            const dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
            if (pinOK_sel || dtapOK_sel) {
              const selHours = selData.capacity / totalWatt;
              let selMethod;
              if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";
              else if (pinOK_sel) selMethod = "pins";
              else selMethod = "dtap";
              selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
            }
          }
        }
    
        const pinsCandidates = [];
        const dtapCandidates = [];
        const nameCollator = (
          typeof collator !== 'undefined' &&
          collator &&
          typeof collator.compare === 'function'
        )
          ? collator
          : (typeof Intl !== 'undefined' && typeof Intl.Collator === 'function'
              ? new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
              : { compare: (a, b) => String(a).localeCompare(String(b)) });
        for (let battName in devices.batteries) {
          if (battName === "None") continue;
          if (selectedCandidate && battName === selectedCandidate.name) continue;
    
          const battData = devices.batteries[battName];
          if (plateFilter && battData.mount_type !== plateFilter) continue;
          if (!plateFilter && !supportsB && battData.mount_type === 'B-Mount') continue;
          if (!plateFilter && !supportsGold && battData.mount_type === 'Gold-Mount') continue;
          const canPin = totalCurrentLow <= battData.pinA;
          const canDTap = !bMountCam && totalCurrentLow <= battData.dtapA;
    
          if (canPin) {
            const hours = battData.capacity / totalWatt;
            const method = (canDTap ? "both pins and D-Tap" : "pins");
            pinsCandidates.push({ name: battName, hours: hours, method: method });
          } else if (canDTap) {
            const hours = battData.capacity / totalWatt;
            dtapCandidates.push({ name: battName, hours: hours, method: "dtap" });
          }
        }
    
        // Sort by runtime (hours) descending within each group
        // Ensure stable ordering: sort by runtime descending, then by name
        const sortByHoursThenName = (a, b) => {
          const diff = b.hours - a.hours;
          return diff !== 0 ? diff : nameCollator.compare(a.name, b.name);
        };
        pinsCandidates.sort(sortByHoursThenName);
        dtapCandidates.sort(sortByHoursThenName);
    
        // Prepare table HTML
        let tableHtml = `<tr><th>${texts[currentLang].batteryTableLabel}</th><th>${texts[currentLang].runtimeLabel}</th><th></th></tr>`;
    
        if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
          // No battery can supply via either output
          tableHtml += `<tr><td colspan="3">${texts[currentLang].noBatterySupports}</td></tr>`;
        } else {
          const allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
          const maxHours = Math.max(...allCandidatesForMax.map(c => c.hours)) || 1; // Ensure not dividing by zero
    
          // Helper function to get the correct bar class
          const getBarClass = (method) => {
              return method === "pins" ? "bar bar-pins-only" : "bar";
          };
          // Helper to display method label
          const getMethodLabel = (method) => {
                const colorMap = {
                  pins: { var: '--warning-color', fallback: '#FF9800', text: texts[currentLang].methodPinsOnly },
                  'both pins and D-Tap': { var: '--success-color', fallback: '#4CAF50', text: texts[currentLang].methodPinsAndDTap },
                  infinite: { var: '--info-color', fallback: '#007bff', text: texts[currentLang].methodInfinite }
                };
                const entry = colorMap[method];
                if (entry) {
                  const color = getCssVariableValue(entry.var, entry.fallback);
                  return `<span style="color:${color};">${entry.text}</span>`;
                }
                return method;
            };
    
          // Add selected battery first, if it's a valid candidate
          if (selectedCandidate) {
            tableHtml += `<tr class="selectedBatteryRow">
                            <td>${escapeHtml(selectedCandidate.name)}</td>
                            <td>${selectedCandidate.hours.toFixed(2)}h (${getMethodLabel(selectedCandidate.method)})</td>
                            <td>
                              <div class="barContainer">
                                <div class="${getBarClass(selectedCandidate.method)}" style="width: ${(selectedCandidate.hours / maxHours) * 100}%;"></div>
                              </div>
                            </td>
                          </tr>`;
          }
          // Add other candidates
          pinsCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
            tableHtml += `<tr>
                            <td>${escapeHtml(candidate.name)}</td>
                            <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                            <td>
                              <div class="barContainer">
                                <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                              </div>
                            </td>
                          </tr>`;
          });
           dtapCandidates.forEach(candidate => {
            if (selectedCandidate && candidate.name === selectedCandidate.name) return; // Already added if selected
            // Only add if not already in pinsCandidates (to avoid duplicates if a battery can do both but was only listed under dtapCandidates)
            const alreadyInPins = pinsCandidates.some(p => p.name === candidate.name);
            if (!alreadyInPins) {
                tableHtml += `<tr>
                                <td>${escapeHtml(candidate.name)}</td>
                                <td>${candidate.hours.toFixed(2)}h (${getMethodLabel(candidate.method)})</td>
                                <td>
                                  <div class="barContainer">
                                    <div class="${getBarClass(candidate.method)}" style="width: ${(candidate.hours / maxHours) * 100}%;"></div>
                                  </div>
                                </td>
                              </tr>`;
            }
          });
        }
        batteryTableElem.innerHTML = tableHtml;
        batteryComparisonSection.style.display = "block";
      } else {
        batteryComparisonSection.style.display = "none";
      }
      const feedback = renderFeedbackTable(getCurrentSetupKey());
      if (feedback !== null) {
        let combinedRuntime = feedback.runtime;
        if (Number.isFinite(hours)) {
          combinedRuntime =
            (feedback.runtime * feedback.weight + hours) / (feedback.weight + 1);
        }
        if (batteryLifeTarget) {
          batteryLifeTarget.textContent = combinedRuntime.toFixed(2);
        }
        lastRuntimeHours = combinedRuntime;
        if (batteryLifeLabelTarget) {
          let label = texts[currentLang].batteryLifeLabel;
          const userNote = texts[currentLang].runtimeUserCountNote.replace('{count}', feedback.count);
          const idx = label.indexOf(')');
          if (idx !== -1) {
            label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
          }
          batteryLifeLabelTarget.textContent = label;
          batteryLifeLabelTarget.setAttribute(
            "data-help",
            texts[currentLang].batteryLifeHelp
          );
        }
        if (runtimeAverageNoteTarget) {
          runtimeAverageNoteTarget.textContent =
            feedback.count > 4 ? texts[currentLang].runtimeAverageNote : '';
        }
        let batteriesNeeded = 1;
        if (Number.isFinite(combinedRuntime) && combinedRuntime > 0) {
          batteriesNeeded = Math.max(1, Math.ceil(10 / combinedRuntime));
        }
        if (batteryCountTarget) {
          batteryCountTarget.textContent = batteriesNeeded.toString();
        }
      } else {
        if (batteryLifeLabelTarget) {
          batteryLifeLabelTarget.textContent = texts[currentLang].batteryLifeLabel;
          batteryLifeLabelTarget.setAttribute(
            "data-help",
            texts[currentLang].batteryLifeHelp
          );
        }
        if (runtimeAverageNoteTarget) {
          runtimeAverageNoteTarget.textContent = '';
        }
      }
      renderTemperatureNote(lastRuntimeHours);
      checkFizCompatibility();
      checkFizController();
      checkArriCompatibility();
      if (setupDiagramContainer) renderSetupDiagram();
      refreshGearListIfVisible();
    }
    
    function getCurrentSetupKey() {
      const safeSelectValue = (select) => (
        select && typeof select.value === 'string'
          ? select.value
          : ''
      );
    
      const safeListValues = (list) => (
        Array.isArray(list)
          ? list
              .map(sel => safeSelectValue(sel))
              .filter(value => value && value !== 'None')
              .sort()
              .join(',')
          : ''
      );
    
      const camera = safeSelectValue(cameraSelect);
      const monitor = safeSelectValue(monitorSelect);
      const video = safeSelectValue(videoSelect);
      const cage = safeSelectValue(cageSelect);
      const motors = safeListValues(motorSelects);
      const controllers = safeListValues(controllerSelects);
      const distance = safeSelectValue(distanceSelect);
      const battery = safeSelectValue(batterySelect);
      const hotswap = safeSelectValue(hotswapSelect);
      const plate = typeof getSelectedPlate === 'function' ? (getSelectedPlate() || '') : '';
    
      return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
    }
    
    function deleteFeedbackEntry(key, index) {
      const feedbackData = loadFeedbackSafe();
      if (feedbackData[key]) {
        feedbackData[key].splice(index, 1);
        if (!feedbackData[key].length) {
          delete feedbackData[key];
        }
        saveFeedbackSafe(feedbackData);
        updateCalculations();
      }
    }
    
    function renderFeedbackTable(currentKey) {
      const container = document.getElementById('feedbackTableContainer');
      const table = document.getElementById('userFeedbackTable');
      const feedbackData = loadFeedbackSafe();
      // Filter out any stored location information to keep the table column hidden
      const entries = (feedbackData[currentKey] || []).map(entry => {
        const rest = { ...entry };
        delete rest.location;
        return rest;
      });
    
      if (!entries.length) {
        if (table) {
          table.innerHTML = '';
          table.classList.add('hidden');
        }
        if (container) container.classList.add('hidden');
        return null;
      }
    
      const columns = [
        { key: 'username', label: 'User' },
        { key: 'date', label: 'Date' },
        { key: 'cameraWifi', label: 'WIFI' },
        { key: 'resolution', label: 'Res' },
        { key: 'codec', label: 'Codec' },
        { key: 'framerate', label: 'FPS' },
        { key: 'firmware', label: 'Firmware' },
        { key: 'batteryAge', label: 'Battery Age' },
        { key: 'monitorBrightness', label: 'Monitor Brightness' },
        { key: 'temperature', label: 'temp' },
        { key: 'charging', label: 'Charging' },
        { key: 'runtime', label: 'runtime' },
        { key: 'batteriesPerDay', label: 'batteries a day' },
        { key: 'weighting', label: 'weight' }
      ];
    
      // Helper functions for weighting factors
      const parseResolution = str => {
        if (!str) return null;
        const s = String(str).toLowerCase();
        const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
        if (kMatch) return parseFloat(kMatch[1]) * 1000;
        const pMatch = s.match(/(\d{3,4})p/);
        if (pMatch) return parseInt(pMatch[1], 10);
        const xMatch = s.match(/x\s*(\d{3,4})/);
        if (xMatch) return parseInt(xMatch[1], 10);
        const numMatch = s.match(/(\d{3,4})/);
        return numMatch ? parseInt(numMatch[1], 10) : null;
      };
      const parseFramerate = str => {
        if (!str) return null;
        const m = String(str).match(/\d+(?:\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
      };
      const tempFactor = temp => {
        if (Number.isNaN(temp)) return 1;
        if (temp >= 25) return 1;
        if (temp >= 0) return 1 + (25 - temp) * 0.01;
        if (temp >= -10) return 1.25 + (-temp) * 0.035;
        if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
        return 2;
      };
    
      const resolutionWeight = res => {
        if (res >= 12000) return 3;
        if (res >= 8000) return 2;
        if (res >= 4000) return 1.5;
        if (res >= 1080) return 1;
        return res / 1080;
      };
    
      const codecWeight = codec => {
        if (!codec) return 1;
        const c = String(codec).toLowerCase();
        if (
          /(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)
        )
          return 1;
        if (/prores/.test(c)) return 1.1;
        if (/dnx|avid/.test(c)) return 1.2;
        if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
        if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
        if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
        return 1;
      };
    
      const camPower = devices?.cameras?.[cameraSelect?.value]?.powerDrawWatts || 0;
      const monitorPower = devices?.monitors?.[monitorSelect?.value]?.powerDrawWatts || 0;
      const videoPower = devices?.video?.[videoSelect?.value]?.powerDrawWatts || 0;
      const motorPower = motorSelects.reduce(
        (sum, sel) => sum + (devices?.fiz?.motors?.[sel.value]?.powerDrawWatts || 0),
        0
      );
      const controllerPower = controllerSelects.reduce(
        (sum, sel) => sum + (devices?.fiz?.controllers?.[sel.value]?.powerDrawWatts || 0),
        0
      );
      const distancePower = devices?.fiz?.distance?.[distanceSelect?.value]?.powerDrawWatts || 0;
      const otherPower = videoPower + motorPower + controllerPower + distancePower;
      const totalPower = camPower + monitorPower + otherPower;
      const specBrightness = devices?.monitors?.[monitorSelect?.value]?.brightnessNits;
    
      let weightedSum = 0;
      let weightTotal = 0;
      let count = 0;
      const breakdown = entries.map(e => {
        const rt = parseFloat(e.runtime);
        if (Number.isNaN(rt)) return null;
    
        let camFactor = 1;
        let monitorFactor = 1;
    
        const res = parseResolution(e.resolution);
        if (res) camFactor *= resolutionWeight(res);
    
        const fps = parseFramerate(e.framerate);
        if (fps) camFactor *= fps / 24;
    
        const wifi = (e.cameraWifi || '').toLowerCase();
        if (wifi.includes('on')) camFactor *= 1.1;
    
        const codec = e.codec;
        if (codec) camFactor *= codecWeight(codec);
    
        const entryBrightness = parseFloat(e.monitorBrightness);
        if (!Number.isNaN(entryBrightness) && specBrightness) {
          const ratio = entryBrightness / specBrightness;
          if (ratio < 1) monitorFactor *= ratio;
        }
    
        let weight = 1;
        if (totalPower > 0) {
          weight =
            (camFactor * camPower + monitorFactor * monitorPower + otherPower) /
            totalPower;
        }
    
        const temp = parseFloat(e.temperature);
        const tempMul = tempFactor(temp);
        const adjustedRuntime = rt * tempMul;
    
        weightedSum += adjustedRuntime * weight;
        weightTotal += weight;
        count++;
    
        return {
          temperature: tempMul,
          resolution: res ? resolutionWeight(res) : 1,
          framerate: fps ? fps / 24 : 1,
          wifi: wifi.includes('on') ? 1.1 : 1,
          codec: codec ? codecWeight(codec) : 1,
          monitor: monitorFactor,
          weight
        };
      });
    
      const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);
      let html = '<tr>' + columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('') + '<th></th></tr>';
      const deleteFeedbackLabel =
        texts[currentLang]?.deleteSetupBtn ||
        texts.en?.deleteSetupBtn ||
        'Delete';
      entries.forEach((entry, index) => {
        html += '<tr>';
        columns.forEach(c => {
          if (c.key === 'weighting') {
            const b = breakdown[index];
            if (b) {
              const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
              const share = b.weight * 100;
              const tooltip =
                `Temp ×${b.temperature.toFixed(2)}\n` +
                `Res ×${b.resolution.toFixed(2)}\n` +
                `FPS ×${b.framerate.toFixed(2)}\n` +
                `Codec ×${b.codec.toFixed(2)}\n` +
                `Wi-Fi ×${b.wifi.toFixed(2)}\n` +
                `Monitor ×${b.monitor.toFixed(2)}\n` +
                `Share ${share.toFixed(1)}%`;
              html +=
                `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${escapeHtml(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
            } else {
              html += '<td></td>';
            }
          } else if (c.key === 'date') {
            html += `<td>${escapeHtml(formatDateString(entry[c.key]))}</td>`;
          } else {
            html += `<td>${escapeHtml(entry[c.key] || '')}</td>`;
          }
        });
        html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">${iconMarkup(ICON_GLYPHS.trash, 'btn-icon')}${escapeHtml(deleteFeedbackLabel)}</button></td>`;
        html += '</tr>';
      });
      table.innerHTML = html;
      table.classList.remove('hidden');
      if (container) container.classList.remove('hidden');
      table.querySelectorAll('.deleteFeedbackBtn').forEach(btn => {
        btn.setAttribute('aria-label', deleteFeedbackLabel);
        btn.setAttribute('title', deleteFeedbackLabel);
        btn.addEventListener('click', () => {
          const key = decodeURIComponent(btn.dataset.key);
          const idx = parseInt(btn.dataset.index, 10);
          deleteFeedbackEntry(key, idx);
        });
      });
    
      if (count >= 3 && weightTotal > 0) {
        return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
      }
      return null;
    }
    
    // Determine differences between the default device database and the current
    // in-memory `devices` object. Only changed, added or removed entries are
    // returned so they can be shared in a generated link.
    function getDeviceChanges() {
      if (!window.defaultDevices) return {};
      const diff = {};
      const record = (cat, name, val, sub) => {
        if (sub) {
          diff.fiz = diff.fiz || {};
          diff.fiz[sub] = diff.fiz[sub] || {};
          diff.fiz[sub][name] = val;
        } else {
          diff[cat] = diff[cat] || {};
          diff[cat][name] = val;
        }
      };
      const compare = (cat, defCat, curCat, sub) => {
        Object.keys(curCat).forEach(name => {
          const cur = curCat[name];
          const def = defCat[name];
          if (!def || JSON.stringify(cur) !== JSON.stringify(def)) {
            record(cat, name, cur, sub);
          }
        });
        Object.keys(defCat).forEach(name => {
          if (!curCat[name]) record(cat, name, null, sub);
        });
      };
      compare('cameras', window.defaultDevices.cameras || {}, devices.cameras || {});
      compare('viewfinders', window.defaultDevices.viewfinders || {}, devices.viewfinders || {});
      compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
      compare('video', window.defaultDevices.video || {}, devices.video || {});
      compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
      compare('batteryHotswaps', window.defaultDevices.batteryHotswaps || {}, devices.batteryHotswaps || {});
      ['motors', 'controllers', 'distance'].forEach(sub => {
        const defCat = window.defaultDevices.fiz ? (window.defaultDevices.fiz[sub] || {}) : {};
        const curCat = devices.fiz ? (devices.fiz[sub] || {}) : {};
        compare('fiz', defCat, curCat, sub);
        if (diff.fiz && diff.fiz[sub] && !Object.keys(diff.fiz[sub]).length) {
          delete diff.fiz[sub];
        }
      });
      if (diff.fiz && !Object.keys(diff.fiz).length) delete diff.fiz;
      Object.keys(diff).forEach(cat => {
        if (cat !== 'fiz' && !Object.keys(diff[cat]).length) delete diff[cat];
      });
      return diff;
    }
    
    // Apply a set of device changes to the current in-memory database and update
    // all related UI elements and localStorage. `changes` mirrors the structure
    // returned by getDeviceChanges().
    function applyDeviceChanges(changes) {
      if (!changes || typeof changes !== 'object') return;
    
      const applyToCategory = (target, delta) => {
        Object.keys(delta).forEach(name => {
          const val = delta[name];
          if (val === null) {
            delete target[name];
          } else {
            target[name] = val;
          }
        });
      };
    
      Object.keys(changes).forEach(cat => {
        if (cat === 'fiz') {
          Object.keys(changes.fiz || {}).forEach(sub => {
            devices.fiz[sub] = devices.fiz[sub] || {};
            applyToCategory(devices.fiz[sub], changes.fiz[sub]);
          });
        } else {
          devices[cat] = devices[cat] || {};
          applyToCategory(devices[cat], changes[cat]);
        }
      });
    
      unifyDevices(devices);
      storeDevices(devices);
      refreshDeviceLists();
    
      // Re-populate dropdowns to include any newly added devices
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      updateCageSelectOptions();
      motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
    
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
    }
    
    function renderSetupDiagram() {
      if (!setupDiagramContainer) return;
    
      const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
    
      const camName = cameraSelect.value;
      const cam = devices.cameras[camName];
      const monitorName = monitorSelect.value;
      const monitor = devices.monitors[monitorName];
      const videoName = videoSelect.value;
      const video = devices.video[videoName];
      const batteryName = batterySelect.value;
    
      const distanceName = distanceSelect.value;
    
      let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
      motors.sort((a, b) => motorPriority(a) - motorPriority(b));
      const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
      const hasInternalMotor = internalIdx !== -1;
      if (hasInternalMotor && internalIdx > 0) {
        const [m] = motors.splice(internalIdx, 1);
        motors.unshift(m);
      }
      let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
      controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));
    
      const inlineControllers = controllers;
    
      const nodes = [];
      const pos = {};
      const nodeMap = {};
      const step = 300; // extra spacing for edge labels
      const VIDEO_LABEL_SPACING = 10;
      const EDGE_LABEL_GAP = 12;
      const EDGE_LABEL_VERTICAL_GAP = 8;
      const EDGE_ROUTE_LABEL_GAP = 10;
      const baseY = 220;
      let x = 80;
    
      if (batteryName && batteryName !== 'None') {
        let batteryLabel = batteryName;
        const battMount = devices.batteries[batteryName]?.mount_type;
        if (cam && battMount && cam.power?.batteryPlateSupport?.some(bp => bp.type === battMount && bp.mount === 'native')) {
          batteryLabel += ` on native ${battMount} plate via Pins`;
        }
        pos.battery = { x, y: baseY, label: batteryLabel };
        nodes.push('battery');
        nodeMap.battery = { category: 'batteries', name: batteryName };
        x += step;
      }
    
      if (camName && camName !== 'None') {
        pos.camera = { x, y: baseY, label: camName };
        nodes.push('camera');
        nodeMap.camera = { category: 'cameras', name: camName };
        x += step;
      }
    
      const controllerIds = controllers.map((_, idx) => `controller${idx}`);
      const motorIds = motors.map((_, idx) => `motor${idx}`);
    
      // Precompute maps for fast lookup instead of repeated indexOf calls
      const controllerNameMap = new Map();
      controllerIds.forEach((id, idx) => {
        controllerNameMap.set(id, inlineControllers[idx] || controllers[idx]);
      });
      const motorNameMap = new Map();
      motorIds.forEach((id, idx) => {
        motorNameMap.set(id, motors[idx]);
      });
    
      const hasMainCtrl = controllers.some(n => controllerPriority(n) === 0);
      let useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
        (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);
    
      const addNode = (id, category, label) => {
        pos[id] = { x, y: baseY, label };
        nodes.push(id);
        nodeMap[id] = { category, name: label };
        x += step;
      };
    
      if (useMotorFirst && motorIds.length) {
        addNode(motorIds[0], 'fiz.motors', motors[0]);
        controllerIds.forEach((id, idx) => {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.slice(1).forEach((id, idx) => {
          addNode(id, 'fiz.motors', motors[idx + 1]);
        });
      } else {
        controllerIds.forEach((id, idx) => {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.forEach((id, idx) => {
          addNode(id, 'fiz.motors', motors[idx]);
        });
      }
    
      if (monitorName && monitorName !== 'None') {
        pos.monitor = { x: pos.camera ? pos.camera.x : 60, y: baseY - step, label: monitorName };
        nodes.push('monitor');
        nodeMap.monitor = { category: 'monitors', name: monitorName };
      }
      if (videoName && videoName !== 'None') {
        pos.video = { x: pos.camera ? pos.camera.x : 60, y: baseY + step, label: videoName };
        nodes.push('video');
        nodeMap.video = { category: 'video', name: videoName };
      }
    
      let inlineDistance = false;
      let dedicatedDistance = false;
      if (distanceName && distanceName !== 'None') {
        const attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
        if (attach) {
          const arriDevices = [...inlineControllers, ...motors].some(n => isArri(n));
          const hasDedicatedPort = inlineControllers.some(n => /RIA-1/i.test(n) || /UMC-4/i.test(n));
          dedicatedDistance = hasDedicatedPort && arriDevices;
          inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
          if (inlineDistance && motorIds.length) {
            const nextId = motorIds[0];
            pos.distance = { x: (pos[attach].x + pos[nextId].x) / 2, y: baseY - step, label: distanceName };
          } else {
            pos.distance = { x: pos[attach].x, y: baseY - step, label: distanceName };
          }
          nodes.push('distance');
        nodeMap.distance = { category: 'fiz.distance', name: distanceName };
        }
      }
    
      // Apply any manually moved node positions and cleanup
      Object.keys(manualPositions).forEach(id => { if (!pos[id]) delete manualPositions[id]; });
      Object.entries(pos).forEach(([id, p]) => {
        if (manualPositions[id]) {
          p.x = manualPositions[id].x;
          p.y = manualPositions[id].y;
        }
      });
    
      let firstFizId;
      if (hasInternalMotor && motorIds.length && !hasMainCtrl) {
        firstFizId = motorIds[0];
      } else {
        firstFizId = controllerIds.length ? controllerIds[0] : motorIds[0];
      }
    
      // Determine node heights and widths based on label length so text fits inside
      const DEFAULT_NODE_H = 120;
      const DEFAULT_NODE_W = 120;
      const nodeHeights = {};
      const nodeWidths = {};
      const diagramLabelFontSize = 'var(--font-size-diagram-label, 11px)';
      const diagramTextFontSize = 'var(--font-size-diagram-text, 13px)';
      const DIAGRAM_LABEL_LINE_HEIGHT = 13;
      const DIAGRAM_ICON_TEXT_GAP = 8;
      const DEFAULT_DIAGRAM_ICON_SIZE = 24;
    
      nodes.forEach(id => {
        const label = pos[id].label || id;
        const lines = wrapLabel(label);
        // Extra space if an icon is shown
        const hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
        nodeHeights[id] = Math.max(
          DEFAULT_NODE_H,
          lines.length * DIAGRAM_LABEL_LINE_HEIGHT + (hasIcon ? 30 : 20)
        );
        const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
        nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
      });
      const NODE_W = Math.max(...Object.values(nodeWidths), DEFAULT_NODE_W);
      const NODE_H = Math.max(...Object.values(nodeHeights), DEFAULT_NODE_H);
      const getNodeHeight = id => nodeHeights[id] || NODE_H;
    
      let viewWidth;
    
      let chain = [];
      const edges = [];
      const usedConns = {};
      const markUsed = (id, side) => { usedConns[`${id}|${side}`] = true; };
      const isUsed = (id, side) => usedConns[`${id}|${side}`];
      const pushEdge = (edge, type) => {
        if (!edge.fromSide || !edge.toSide) {
          const pair = closestConnectorPair(edge.from, edge.to, usedConns);
          if (pair) {
            if (!edge.fromSide) edge.fromSide = pair.fromSide;
            if (!edge.toSide) edge.toSide = pair.toSide;
          }
        } else {
          if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) return;
        }
        markUsed(edge.from, edge.fromSide);
        markUsed(edge.to, edge.toSide);
        edges.push({ ...edge, type });
      };
      const battMount = devices.batteries[batteryName]?.mount_type;
      if (cam && batteryName && batteryName !== 'None') {
        const plateType = getSelectedPlate();
        const nativePlate = plateType && isSelectedPlateNative(camName);
        const camPort = firstPowerInputType(cam);
        const inLabel = camPort || plateType;
        const label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
        pushEdge({ from: 'battery', to: 'camera', label, fromSide: 'right', toSide: 'left' }, 'power');
      }
      if (monitor && firstPowerInputType(monitor)) {
        const mPort = firstPowerInputType(monitor);
        if (batteryName && batteryName !== 'None') {
          pushEdge({ from: 'battery', to: 'monitor', label: formatConnLabel(battMount, mPort), fromSide: 'top', toSide: 'left' }, 'power');
        }
      }
      if (video && firstPowerInputType(video)) {
        const pPort = firstPowerInputType(video);
        if (batteryName && batteryName !== 'None') {
          pushEdge({ from: 'battery', to: 'video', label: formatConnLabel(battMount, pPort), fromSide: 'bottom', toSide: 'left' }, 'power');
        }
      }
      if (cam && cam.videoOutputs?.length) {
        const camOut = cam.videoOutputs[0].type;
        const monInObj = monitor && (monitor.video?.inputs?.[0] || monitor.videoInputs?.[0]);
        const vidInObj = video && (video.videoInputs?.[0] || (video.video ? video.video.inputs[0] : null));
        if (monitor && monInObj) {
          const monIn = monInObj.portType || monInObj.type || monInObj;
          pushEdge({ from: 'camera', to: 'monitor', label: connectionLabel(camOut, monIn), fromSide: 'top', toSide: 'bottom', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
        }
        if (video && vidInObj) {
          const vidIn = vidInObj.portType || vidInObj.type || vidInObj;
          pushEdge({ from: 'camera', to: 'video', label: connectionLabel(camOut, vidIn), fromSide: 'bottom', toSide: 'top', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
        }
      }
      useMotorFirst = (!hasMainCtrl && hasInternalMotor) ||
        (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);
      const distanceSelected = distanceName && distanceName !== 'None';
      const distanceInChain = distanceSelected && !dedicatedDistance;
    
      let firstController = false;
      let firstMotor = false;
    
      if (useMotorFirst && motorIds.length) {
        chain.push(motorIds[0]);
        firstMotor = true;
      } else if (controllerIds.length) {
        chain.push(controllerIds[0]);
        firstController = true;
      } else if (motorIds.length) {
        chain.push(motorIds[0]);
        firstMotor = true;
      }
    
      if (distanceInChain) chain.push('distance');
    
      if (controllerIds.length) chain = chain.concat(controllerIds.slice(firstController ? 1 : 0));
      if (motorIds.length) chain = chain.concat(motorIds.slice(firstMotor ? 1 : 0));
    
      if (cam && chain.length) {
        let first = chain[0];
        if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
          first = chain[1];
        }
        let firstName = null;
        if (first.startsWith('controller')) {
          firstName = controllerNameMap.get(first);
        } else if (first.startsWith('motor')) {
          firstName = motorNameMap.get(first);
        }
        const port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
        const camPort = cameraFizPort(camName, port, firstName);
        pushEdge({ from: 'camera', to: first, label: formatConnLabel(camPort, port), noArrow: true }, 'fiz');
      } else if (motorIds.length && cam) {
        const camPort = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
        pushEdge({ from: 'camera', to: motorIds[0], label: formatConnLabel(camPort, motorFizPort(motors[0])), noArrow: true }, 'fiz');
      }
    
      for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i];
        const b = chain[i + 1];
        let fromName = null, toName = null;
        if (a.startsWith('controller')) fromName = controllerNameMap.get(a);
        else if (a.startsWith('motor')) fromName = motorNameMap.get(a);
        if (b.startsWith('controller')) toName = controllerNameMap.get(b);
        else if (b.startsWith('motor')) toName = motorNameMap.get(b);
        pushEdge({ from: a, to: b, label: formatConnLabel(fizPort(fromName), fizPort(toName)), noArrow: true }, 'fiz');
      }
    
    
    
      if (dedicatedDistance && controllerIds.length && distanceSelected) {
        const ctrlName = inlineControllers[0] || controllers[0];
        const distPort = controllerDistancePort(ctrlName);
        const portLabel = formatConnLabel(fizPort(ctrlName), distPort);
        pushEdge({ from: controllerIds[0], to: 'distance', label: portLabel, noArrow: true, toSide: 'bottom-right' }, 'fiz');
      }
    
    
      const fizList = [];
      controllerIds.forEach((id, idx) => {
        fizList.push({ id, name: inlineControllers[idx] || controllers[idx] });
      });
      motorIds.forEach((id, idx) => {
        fizList.push({ id, name: motors[idx] });
      });
    
      const isMainCtrl = name => /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
      let powerTarget = null;
      const main = fizList.find(d => isMainCtrl(d.name));
      if (main) {
        powerTarget = main;
      } else {
        powerTarget = fizList.find(d => fizNeedsPower(d.name));
      }
    
      if (powerTarget && fizNeedsPower(powerTarget.name)) {
        const { id: fizId, name } = powerTarget;
        const powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
        const label = formatConnLabel('D-Tap', fizPowerPort(name));
        const skipBatt = isArri(camName) && isArriOrCmotion(name);
        if (powerSrc && !skipBatt) {
          pushEdge({
            from: powerSrc,
            to: fizId,
            label,
            fromSide: 'bottom-left',
            toSide: 'bottom',
            route: 'down-right-up'
          }, 'power');
        }
      }
      if (nodes.length === 0) {
        setupDiagramContainer.innerHTML = `<p class="diagram-placeholder">${texts[currentLang].setupDiagramPlaceholder}</p>`;
        return;
      }
    
      let xs = Object.values(pos).map(p => p.x);
      let minX = Math.min(...xs);
      let maxX = Math.max(...xs);
      const contentWidth = maxX - minX;
      const baseViewWidth = Math.max(500, contentWidth + NODE_W);
      if (Object.keys(manualPositions).length === 0) {
        const shiftX = baseViewWidth / 2 - (minX + maxX) / 2;
        Object.values(pos).forEach(p => { p.x += shiftX; });
        xs = Object.values(pos).map(p => p.x);
        minX = Math.min(...xs);
        maxX = Math.max(...xs);
      }
    
      const ys = Object.values(pos).map(p => p.y);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const HORIZONTAL_MARGIN = Math.max(40, NODE_W * 0.25);
      const TOP_MARGIN = Math.max(40, NODE_H * 0.25);
      const BOTTOM_MARGIN = Math.max(120, NODE_H * 0.4);
      const minBoundX = minX - NODE_W / 2 - HORIZONTAL_MARGIN;
      const maxBoundX = maxX + NODE_W / 2 + HORIZONTAL_MARGIN;
      const minBoundY = minY - NODE_H / 2 - TOP_MARGIN;
      const maxBoundY = maxY + NODE_H / 2 + BOTTOM_MARGIN;
      const viewBoxX = Math.floor(Math.min(0, minBoundX));
      const viewBoxY = Math.floor(minBoundY);
      viewWidth = Math.max(baseViewWidth, Math.ceil(maxBoundX - viewBoxX));
      const baseViewHeight = (maxY - minY) + NODE_H + TOP_MARGIN + BOTTOM_MARGIN;
      const viewHeight = Math.max(Math.ceil(baseViewHeight), Math.ceil(maxBoundY - viewBoxY));
    
      function computePath(fromId, toId, labelSpacing = 0, opts = {}) {
        const from = connectorPos(fromId, opts.fromSide);
        const to = connectorPos(toId, opts.toSide);
        let path, lx, ly, angle = 0;
    
        if (opts.route === 'down-right-up') {
          const bottomY = maxY + NODE_H;
          path = `M ${from.x} ${from.y} V ${bottomY} H ${to.x} V ${to.y}`;
          lx = (from.x + to.x) / 2;
          ly = bottomY - EDGE_ROUTE_LABEL_GAP - labelSpacing;
        } else {
          path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const len = Math.hypot(dx, dy) || 1;
          const baseGap = Math.abs(dx) < Math.abs(dy) ? EDGE_LABEL_VERTICAL_GAP : EDGE_LABEL_GAP;
          const off = baseGap + labelSpacing;
          const perpX = (dy / len) * off;
          const perpY = (-dx / len) * off;
          lx = midX + perpX;
          ly = midY + perpY;
        }
    
        return { path, labelX: lx, labelY: ly, angle };
      }
    
      const EDGE_LABEL_WRAP = 18;
    
      function wrapLabel(text, maxLen = 16) {
        const words = text.split(' ');
        const lines = [];
        let line = '';
        words.forEach(w => {
          if ((line + ' ' + w).trim().length > maxLen && line) {
            lines.push(line.trim());
            line = w;
          } else {
            line += ` ${w}`;
          }
        });
        if (line.trim()) lines.push(line.trim());
        return lines;
      }
    
      let svg = `<svg viewBox="${viewBoxX} ${viewBoxY} ${viewWidth} ${viewHeight}" xmlns="http://www.w3.org/2000/svg">`;
      svg += `<defs>
        <linearGradient id="firstFizGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#090" />
          <stop offset="100%" stop-color="#d33" />
        </linearGradient>
      </defs>`;
      svg += `<g id="diagramRoot">`;
    
      edges.forEach(e => {
        if (!pos[e.from] || !pos[e.to]) return;
        const { path, labelX, labelY, angle } = computePath(e.from, e.to, e.labelSpacing || 0, e);
        if (!path) return;
        const cls = e.type ? `edge-path ${e.type}` : 'edge-path';
        svg += `<path class="${cls}" d="${path}" />`;
        if (e.label) {
          const rot = ` transform="rotate(${angle} ${labelX} ${labelY})"`;
          const lines = wrapLabel(e.label, EDGE_LABEL_WRAP);
          if (lines.length <= 1) {
            svg += `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"${rot}>${escapeHtml(e.label)}</text>`;
          } else {
            const lineHeight = 12;
            const startDy = -((lines.length - 1) * lineHeight) / 2;
            svg += `<text class="edge-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"${rot}>`;
            lines.forEach((line, i) => {
              const dy = i === 0 ? startDy : lineHeight;
              svg += `<tspan x="${labelX}" dy="${dy}">${escapeHtml(line)}</tspan>`;
            });
            svg += `</text>`;
          }
        }
      });
    
    
      function connectorsFor(id) {
        switch (id) {
          case 'battery':
            return [
              { side: 'top', color: 'red' },
              { side: 'right', color: 'red' },
              { side: 'bottom', color: 'red' },
              { side: 'bottom-left', color: 'red' }
            ];
          case 'monitor':
            return [
              { side: 'left', color: 'red' },
              { side: 'bottom', color: 'blue' }
            ];
          case 'video':
            return [
              { side: 'left', color: 'red' },
              { side: 'top', color: 'blue' }
            ];
          case 'camera':
            return [
              { side: 'left', color: 'red' },
              { side: 'top', color: 'blue' },
              { side: 'bottom', color: 'blue' },
              { side: 'right', color: 'green' }
            ];
          case 'distance':
            return [
              { side: 'bottom', color: 'green' },
              { side: 'bottom-right', color: 'green' }
            ];
          default:
            if (id.startsWith('controller') || id.startsWith('motor')) {
              if (firstFizId && id === firstFizId) {
                return [
                  { side: 'top', color: 'green' },
                  { side: 'left', color: 'green' },
                  { side: 'right', color: 'green' },
                  { side: 'bottom', color: 'red' }
                ];
              }
              return [
                { side: 'left', color: 'green' },
                { side: 'right', color: 'green' }
              ];
            }
        }
        return [];
      }
    
      function connectorPos(nodeId, side) {
        const p = pos[nodeId];
        if (!p) return { x: 0, y: 0 };
        const h = getNodeHeight(nodeId);
        switch (side) {
          case 'top':
            return { x: p.x, y: p.y - h / 2 };
          case 'bottom':
            return { x: p.x, y: p.y + h / 2 };
          case 'bottom-left':
            return { x: p.x - NODE_W / 2 + NODE_W / 3, y: p.y + h / 2 };
          case 'bottom-right':
            return { x: p.x + NODE_W / 2 - NODE_W / 3, y: p.y + h / 2 };
          case 'left':
            return { x: p.x - NODE_W / 2, y: p.y };
          case 'right':
            return { x: p.x + NODE_W / 2, y: p.y };
          default:
            return { x: p.x, y: p.y };
        }
      }
    
      function closestConnectorPair(idA, idB, used = {}) {
        const aConns = connectorsFor(idA);
        const bConns = connectorsFor(idB);
        let best = null;
        let bestDist = Infinity;
        aConns.forEach(ac => {
          if (used[`${idA}|${ac.side}`]) return;
          const ap = connectorPos(idA, ac.side);
          bConns.forEach(bc => {
            if (ac.color !== bc.color) return;
            if (used[`${idB}|${bc.side}`]) return;
            const bp = connectorPos(idB, bc.side);
            const d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
            if (d < bestDist) {
              bestDist = d;
              best = { fromSide: ac.side, toSide: bc.side };
            }
          });
        });
        return best;
      }
    
      nodes.forEach(id => {
        const p = pos[id];
        if (!p) return;
        const h = getNodeHeight(id);
        const nodeCls = id === firstFizId ? 'diagram-node first-fiz' : 'diagram-node';
        const rectCls = id === firstFizId ? 'node-box first-fiz' : 'node-box';
        svg += `<g class="${nodeCls}" data-node="${id}">`;
        svg += `<rect class="${rectCls}" x="${p.x - NODE_W/2}" y="${p.y - h/2}" width="${NODE_W}" height="${h}" rx="4" ry="4" />`;
        if (id === firstFizId) {
          const xLeft = p.x - NODE_W / 2;
          const yBottom = p.y + h / 2;
          const r = 4;
          const highlight = `M ${xLeft} ${p.y} L ${xLeft} ${yBottom - r} A ${r} ${r} 0 0 1 ${xLeft + r} ${yBottom} L ${p.x} ${yBottom}`;
          svg += `<path class="first-fiz-highlight" d="${highlight}" />`;
        }
    
        const conns = connectorsFor(id);
        conns.forEach(c => {
          let cx = p.x, cy = p.y;
          if (c.side === 'top') { cx = p.x; cy = p.y - h / 2; }
          else if (c.side === 'bottom') { cx = p.x; cy = p.y + h / 2; }
          else if (c.side === 'bottom-left') { cx = p.x - NODE_W / 2 + NODE_W / 3; cy = p.y + h / 2; }
          else if (c.side === 'bottom-right') { cx = p.x + NODE_W / 2 - NODE_W / 3; cy = p.y + h / 2; }
          else if (c.side === 'left') { cx = p.x - NODE_W / 2; cy = p.y; }
          else if (c.side === 'right') { cx = p.x + NODE_W / 2; cy = p.y; }
          svg += `<circle class="conn ${c.color}" cx="${cx}" cy="${cy}" r="4" />`;
        });
    
        let icon = diagramIcons[id];
        if (!icon) {
          if (id.startsWith('motor')) {
            icon = diagramIcons.motors;
          } else if (id.startsWith('controller')) {
            const name = (nodeMap[id]?.name || '').toLowerCase();
            if (/handle|grip/.test(name)) icon = diagramIcons.handle;
            else icon = diagramIcons.controllers;
          } else if (id === 'distance') {
            icon = diagramIcons.distance;
          }
        }
    
        const lines = wrapLabel(p.label || id);
        const resolvedIcon = icon ? resolveIconGlyph(icon) : null;
        const hasIconGlyph = Boolean(resolvedIcon && (resolvedIcon.markup || resolvedIcon.char));
        const iconSize = hasIconGlyph && Number.isFinite(resolvedIcon.size)
          ? resolvedIcon.size
          : DEFAULT_DIAGRAM_ICON_SIZE;
        const iconHeight = hasIconGlyph ? iconSize : 0;
        const textLineCount = lines.length;
        const textHeight = textLineCount ? textLineCount * DIAGRAM_LABEL_LINE_HEIGHT : 0;
        const iconGap = hasIconGlyph && textLineCount ? DIAGRAM_ICON_TEXT_GAP : 0;
        const contentHeight = iconHeight + iconGap + textHeight;
        const contentTop = p.y - contentHeight / 2;
        const centerX = formatSvgCoordinate(p.x);
    
        if (hasIconGlyph) {
          const iconCenterY = contentTop + iconHeight / 2;
          if (resolvedIcon.markup) {
            const positioned = positionSvgMarkup(
              ensureSvgHasAriaHidden(resolvedIcon.markup),
              p.x,
              iconCenterY,
              iconSize
            );
            if (positioned.markup) {
              const wrapperClasses = ['node-icon-svg'];
              if (resolvedIcon.className) wrapperClasses.push(resolvedIcon.className);
              svg += `<g class="${wrapperClasses.join(' ')}" transform="translate(${positioned.x}, ${positioned.y})">${positioned.markup}</g>`;
            }
          } else if (resolvedIcon.char) {
            const fontAttr = ` data-icon-font="${resolvedIcon.font}"`;
            svg += `<text class="node-icon"${fontAttr} x="${centerX}" y="${formatSvgCoordinate(iconCenterY)}" text-anchor="middle" dominant-baseline="middle">${resolvedIcon.char}</text>`;
          }
        }
    
        if (textLineCount) {
          const textTop = contentTop + iconHeight + iconGap;
          const textY = formatSvgCoordinate(textTop);
          const fontSize = hasIconGlyph ? diagramLabelFontSize : diagramTextFontSize;
          svg += `<text x="${centerX}" y="${textY}" text-anchor="middle" dominant-baseline="hanging" style="font-size: ${fontSize};">`;
          lines.forEach((line, i) => {
            const dyAttr = i === 0 ? '' : ` dy="${DIAGRAM_LABEL_LINE_HEIGHT}"`;
            svg += `<tspan x="${centerX}"${dyAttr}>${escapeHtml(line)}</tspan>`;
          });
          svg += `</text>`;
        }
        svg += `</g>`;
      });
    
      svg += '</g></svg>';
      let popup = document.getElementById('diagramPopup');
      if (!popup) {
        popup = document.createElement('div');
        popup.id = 'diagramPopup';
        popup.className = 'diagram-popup';
      }
      setupDiagramContainer.innerHTML = '';
      setupDiagramContainer.appendChild(popup);
      setupDiagramContainer.insertAdjacentHTML('beforeend', svg);
    
      const svgEl = setupDiagramContainer.querySelector('svg');
      if (svgEl) {
        svgEl.style.width = '100%';
        svgEl.style.overflow = 'visible';
        svgEl.setAttribute('overflow', 'visible');
        const containerRect = setupDiagramContainer.getBoundingClientRect();
        const parentRect = setupDiagramContainer.parentElement?.getBoundingClientRect();
        const containerWidth = containerRect?.width || setupDiagramContainer.clientWidth || 0;
        const parentWidth = parentRect?.width || 0;
        let maxWidthPx = 0;
        if (!isTouchDevice) {
          const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
          let diagramFontSizePx = Number.NaN;
          if (document.body) {
            const measureEl = document.createElement('span');
            measureEl.style.position = 'absolute';
            measureEl.style.visibility = 'hidden';
            measureEl.style.fontSize = 'var(--font-size-diagram-text)';
            measureEl.textContent = 'M';
            document.body.appendChild(measureEl);
            diagramFontSizePx = parseFloat(getComputedStyle(measureEl).fontSize);
            measureEl.remove();
          }
          const DEFAULT_MAX_NODE_FONT = 13; // fallback when diagram font size cannot be measured
          const referenceFontSize = Number.isFinite(diagramFontSizePx) && diagramFontSizePx > 0
            ? diagramFontSizePx
            : DEFAULT_MAX_NODE_FONT;
          const maxAutoScale = bodyFontSize / referenceFontSize;
          const scaleFactor = Math.max(1, maxAutoScale);
          maxWidthPx = viewWidth * scaleFactor;
        } else {
          maxWidthPx = viewWidth;
        }
    
        const minTarget = Math.max(containerWidth, parentWidth);
        if (minTarget > 0 && (!Number.isFinite(maxWidthPx) || maxWidthPx < minTarget)) {
          maxWidthPx = minTarget;
        }
        if (Number.isFinite(maxWidthPx) && maxWidthPx > 0) {
          svgEl.style.maxWidth = `${maxWidthPx}px`;
        } else {
          svgEl.style.maxWidth = '100%';
        }
    
        const rootEl = svgEl.querySelector('#diagramRoot');
        if (rootEl && typeof rootEl.getBBox === 'function') {
          const viewBox = svgEl.viewBox?.baseVal;
          const viewBoxWidth = viewBox?.width || viewWidth || svgEl.getBoundingClientRect().width || 1;
          const viewBoxHeight = viewBox?.height || svgEl.getBoundingClientRect().height || 1;
          const viewBoxX = viewBox?.x || 0;
          const viewBoxY = viewBox?.y || 0;
          const bbox = rootEl.getBBox();
          const svgRect = svgEl.getBoundingClientRect();
          const renderedWidth = svgRect.width || svgEl.clientWidth || viewBoxWidth;
          const widthCandidates = [renderedWidth];
          const parentRect = setupDiagramContainer.parentElement?.getBoundingClientRect();
          if (parentRect && parentRect.width > 0) widthCandidates.push(parentRect.width - 32);
          if (typeof window !== 'undefined' && Number.isFinite(window.innerWidth) && window.innerWidth > 0) {
            widthCandidates.push(window.innerWidth - 80);
          }
          const positiveWidths = widthCandidates.filter(v => Number.isFinite(v) && v > 0);
          const maxAvailable = positiveWidths.length ? Math.max(...positiveWidths) : renderedWidth;
          const minAvailable = positiveWidths.length ? Math.min(...positiveWidths) : renderedWidth;
          const MAX_TARGET_WIDTH = 1400;
          const desiredWidth = Math.max(minAvailable, Math.min(MAX_TARGET_WIDTH, maxAvailable));
          const baseScale = viewBoxWidth > 0 ? renderedWidth / viewBoxWidth : 1;
          const currentRootWidth = bbox.width * baseScale;
          let desiredScale = currentRootWidth > 0 ? desiredWidth / currentRootWidth : 1;
          if (!Number.isFinite(desiredScale) || desiredScale <= 0) desiredScale = 1;
          if (!isTouchDevice && desiredScale > 1) {
            const DESKTOP_SCALE_RELAXATION = 0.3;
            const DESKTOP_MAX_AUTO_SCALE = 1.2;
            desiredScale = 1 + (desiredScale - 1) * DESKTOP_SCALE_RELAXATION;
            if (desiredScale > DESKTOP_MAX_AUTO_SCALE) desiredScale = DESKTOP_MAX_AUTO_SCALE;
            // Keep a margin so the default desktop view does not feel cramped.
            const DESKTOP_AUTO_FILL_RATIO = 0.88;
            const MIN_DESKTOP_AUTO_SCALE = 0.82;
            const adjustedScale = desiredScale * DESKTOP_AUTO_FILL_RATIO;
            desiredScale = Math.max(MIN_DESKTOP_AUTO_SCALE, adjustedScale);
          }
          const MIN_AUTO_SCALE = isTouchDevice ? 0.4 : 0.35;
          const MAX_INITIAL_SCALE = isTouchDevice ? 3 : 1.6;
          let safeDesiredScale = Number.isFinite(desiredScale) && desiredScale > 0
            ? desiredScale
            : 1;
          if (isTouchDevice) {
            let viewportWidth = 0;
            if (typeof window !== 'undefined') {
              if (window.visualViewport && Number.isFinite(window.visualViewport.width) && window.visualViewport.width > 0) {
                viewportWidth = window.visualViewport.width;
              } else if (Number.isFinite(window.innerWidth) && window.innerWidth > 0) {
                viewportWidth = window.innerWidth;
              }
            }
            if (!viewportWidth && typeof document !== 'undefined' && document.documentElement) {
              const docWidth = document.documentElement.clientWidth;
              if (Number.isFinite(docWidth) && docWidth > 0) {
                viewportWidth = docWidth;
              }
            }
            if (viewportWidth && viewportWidth <= 600) {
              safeDesiredScale = Math.min(safeDesiredScale, 1);
            }
          }
          const initialScale = Math.min(
            MAX_INITIAL_SCALE,
            Math.max(MIN_AUTO_SCALE, safeDesiredScale)
          );
          const centerX = bbox.x + bbox.width / 2;
          const centerY = bbox.y + bbox.height / 2;
          const targetCenterX = viewBoxX + viewBoxWidth / 2;
          const targetCenterY = viewBoxY + viewBoxHeight / 2;
          const initialPanX = targetCenterX / initialScale - centerX;
          const initialPanY = targetCenterY / initialScale - centerY;
          const roundedScale = Math.round(initialScale * 1000) / 1000;
          const roundedPan = {
            x: Math.round(initialPanX * 1000) / 1000,
            y: Math.round(initialPanY * 1000) / 1000
          };
          if (Number.isFinite(roundedScale) && roundedScale > 0) {
            setupDiagramContainer.dataset.initialScale = String(roundedScale);
          } else {
            delete setupDiagramContainer.dataset.initialScale;
          }
          if (Number.isFinite(roundedPan.x) && Number.isFinite(roundedPan.y)) {
            setupDiagramContainer.dataset.initialPan = JSON.stringify(roundedPan);
          } else {
            delete setupDiagramContainer.dataset.initialPan;
          }
        } else {
          delete setupDiagramContainer.dataset.initialScale;
          delete setupDiagramContainer.dataset.initialPan;
        }
      }
    
      lastDiagramPositions = JSON.parse(JSON.stringify(pos));
    
      attachDiagramPopups(nodeMap);
    
      enableDiagramInteractions();
    
    }
    
    function attachDiagramPopups(map) {
      if (!setupDiagramContainer) return;
      const popup = document.getElementById('diagramPopup');
      if (!popup) return;
      popup.style.display = 'none';
      const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
    
      setupDiagramContainer.querySelectorAll('.diagram-node').forEach(node => {
        const id = node.getAttribute('data-node');
        const info = map[id];
        if (!info) return;
        let deviceData;
        if (info.category === 'fiz.controllers') {
          deviceData = devices.fiz?.controllers?.[info.name];
        } else if (info.category === 'fiz.motors') {
          deviceData = devices.fiz?.motors?.[info.name];
        } else if (info.category === 'fiz.distance') {
          deviceData = devices.fiz?.distance?.[info.name];
        } else {
          deviceData = devices[info.category]?.[info.name];
        }
        const connectors = generateSafeConnectorSummary(deviceData);
        const infoHtml =
          (deviceData && deviceData.latencyMs ?
            `<div class="info-box video-conn"><strong>Latency:</strong> ${escapeHtml(String(deviceData.latencyMs))}</div>` : '') +
          (deviceData && deviceData.frequency ?
            `<div class="info-box video-conn"><strong>Frequency:</strong> ${escapeHtml(String(deviceData.frequency))}</div>` : '');
        const html = `<strong>${escapeHtml(info.name)}</strong>` +
          connectors + infoHtml;
    
        const show = e => {
          e.stopPropagation();
          const pointer = e.touches && e.touches[0] ? e.touches[0] : e;
          popup.innerHTML = html;
          popup.style.display = 'block';
    
          const offset = 12;
          const viewportWidth = window.visualViewport?.width
            || window.innerWidth
            || document.documentElement?.clientWidth
            || 0;
          const viewportHeight = window.visualViewport?.height
            || window.innerHeight
            || document.documentElement?.clientHeight
            || 0;
          const popupWidth = popup.offsetWidth || 0;
          const popupHeight = popup.offsetHeight || 0;
    
          const pointerX = pointer.clientX;
          const pointerY = pointer.clientY;
    
          let left = pointerX + offset;
          if (viewportWidth > 0 && popupWidth > 0 && left + popupWidth + offset > viewportWidth) {
            left = Math.max(offset, pointerX - popupWidth - offset);
          }
    
          let top = pointerY + offset;
          if (viewportHeight > 0 && popupHeight > 0 && top + popupHeight + offset > viewportHeight) {
            top = Math.max(offset, pointerY - popupHeight - offset);
          }
    
          const maxLeft = viewportWidth > 0 && popupWidth > 0
            ? Math.max(offset, viewportWidth - popupWidth - offset)
            : left;
          const maxTop = viewportHeight > 0 && popupHeight > 0
            ? Math.max(offset, viewportHeight - popupHeight - offset)
            : top;
    
          popup.style.left = `${Math.max(offset, Math.min(left, maxLeft))}px`;
          popup.style.top = `${Math.max(offset, Math.min(top, maxTop))}px`;
        };
        const hide = () => { popup.style.display = 'none'; };
        if (isTouchDevice) {
          node.addEventListener('touchstart', show);
          node.addEventListener('click', show);
        } else {
          node.addEventListener('mousemove', show);
          node.addEventListener('mouseout', hide);
          node.addEventListener('click', show);
        }
      });
    
      if (!setupDiagramContainer.dataset.popupOutsideListeners) {
        const hideOnOutside = e => {
          if (!e.target.closest('.diagram-node')) popup.style.display = 'none';
        };
        if (isTouchDevice) {
          setupDiagramContainer.addEventListener('touchstart', hideOnOutside);
        } else {
          setupDiagramContainer.addEventListener('click', hideOnOutside);
        }
        setupDiagramContainer.dataset.popupOutsideListeners = 'true';
      }
    }
    
    function enableDiagramInteractions() {
      if (!setupDiagramContainer) return;
      const svg = setupDiagramContainer.querySelector('svg');
      if (!svg) return;
    
      if (cleanupDiagramInteractions) cleanupDiagramInteractions();
    
      const root = svg.querySelector('#diagramRoot') || svg;
      const isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
      const MAX_SCALE = isTouchDevice ? Infinity : 3;
      const BASE_MIN_SCALE = isTouchDevice ? 0.55 : 0.6;
      const MIN_AUTO_SCALE = isTouchDevice ? 0.4 : 0.35;
      const dataScaleRaw = parseFloat(setupDiagramContainer.dataset.initialScale || '');
      const fallbackScale = isTouchDevice ? 0.95 : 0.85;
      const initialScaleRaw = Number.isFinite(dataScaleRaw) && dataScaleRaw > 0
        ? dataScaleRaw
        : fallbackScale;
      const MIN_SCALE = Math.max(
        MIN_AUTO_SCALE,
        Math.min(BASE_MIN_SCALE, initialScaleRaw)
      );
      const clampScale = value => {
        if (!Number.isFinite(value) || value <= 0) return MIN_SCALE;
        if (value > MAX_SCALE) return MAX_SCALE;
        if (value < MIN_SCALE) return MIN_SCALE;
        return value;
      };
      const INITIAL_SCALE = clampScale(initialScaleRaw);
      let initialPan = { x: 0, y: 0 };
      if (setupDiagramContainer.dataset.initialPan) {
        try {
          const parsed = JSON.parse(setupDiagramContainer.dataset.initialPan);
          if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
            initialPan = { x: parsed.x, y: parsed.y };
          }
        } catch (err) {
          // Ignore parsing errors and fall back to default pan
        }
      }
      let pan = { ...initialPan };
      let scale = INITIAL_SCALE;
      let panning = false;
      let panStart = { ...pan };
      let panPointerStart = null;
      const getPos = e => {
        if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        return { x: e.clientX, y: e.clientY };
      };
      const getMetrics = () => {
        const rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : null;
        const viewBox = svg.viewBox?.baseVal;
        const viewBoxWidth = viewBox && Number.isFinite(viewBox.width) && viewBox.width > 0
          ? viewBox.width
          : (svg.width?.baseVal?.value || rect?.width || 1);
        const viewBoxHeight = viewBox && Number.isFinite(viewBox.height) && viewBox.height > 0
          ? viewBox.height
          : (svg.height?.baseVal?.value || rect?.height || 1);
        const rectWidth = rect && Number.isFinite(rect.width) && rect.width > 0 ? rect.width : viewBoxWidth;
        const rectHeight = rect && Number.isFinite(rect.height) && rect.height > 0 ? rect.height : viewBoxHeight;
        const viewPerPxX = rectWidth > 0 ? viewBoxWidth / rectWidth : 1;
        const viewPerPxY = rectHeight > 0 ? viewBoxHeight / rectHeight : 1;
        return { rect, viewPerPxX, viewPerPxY };
      };
      const convertPointerDeltaToView = (dxPx, dyPx) => {
        const { viewPerPxX, viewPerPxY } = getMetrics();
        return {
          x: (Number.isFinite(dxPx) ? dxPx : 0) * viewPerPxX / (scale || 1),
          y: (Number.isFinite(dyPx) ? dyPx : 0) * viewPerPxY / (scale || 1)
        };
      };
      const apply = () => {
        scale = clampScale(scale);
        root.setAttribute('transform', `translate(${pan.x},${pan.y}) scale(${scale})`);
      };
      const zoomWithCenter = factor => {
        const currentScale = scale;
        if (!Number.isFinite(currentScale) || currentScale <= 0) return;
        const targetScale = clampScale(currentScale * factor);
        if (!Number.isFinite(targetScale) || targetScale <= 0 || targetScale === currentScale) {
          scale = targetScale;
          apply();
          return;
        }
        const { rect, viewPerPxX, viewPerPxY } = getMetrics();
        if (rect && Number.isFinite(rect.width) && Number.isFinite(rect.height) && rect.width > 0 && rect.height > 0) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const inverseCurrent = 1 / currentScale;
          const inverseTarget = 1 / targetScale;
          pan.x += centerX * viewPerPxX * (inverseTarget - inverseCurrent);
          pan.y += centerY * viewPerPxY * (inverseTarget - inverseCurrent);
        }
        scale = targetScale;
        apply();
      };
      if (zoomInBtn) {
        zoomInBtn.onclick = () => {
          zoomWithCenter(1.1);
        };
      }
      if (zoomOutBtn) {
        zoomOutBtn.onclick = () => {
          zoomWithCenter(0.9);
        };
      }
      if (resetViewBtn) {
        resetViewBtn.onclick = () => {
          pan = { ...initialPan };
          scale = INITIAL_SCALE;
          apply();
          manualPositions = {};
          renderSetupDiagram();
          if (typeof scheduleProjectAutoSave === 'function') {
            scheduleProjectAutoSave();
          } else if (typeof saveCurrentSession === 'function') {
            saveCurrentSession();
          }
          if (typeof checkSetupChanged === 'function') {
            checkSetupChanged();
          }
        };
      }
      const onSvgMouseDown = e => {
        if (e.target.closest('.diagram-node')) return;
        const pos = getPos(e);
        panning = true;
        panPointerStart = pos;
        panStart = { ...pan };
        if (e.touches) e.preventDefault();
      };
      const onPanMove = e => {
        if (!panning || !panPointerStart) return;
        const pos = getPos(e);
        const delta = convertPointerDeltaToView(pos.x - panPointerStart.x, pos.y - panPointerStart.y);
        pan.x = panStart.x + delta.x;
        pan.y = panStart.y + delta.y;
        apply();
        if (e.touches) e.preventDefault();
      };
      const stopPanning = () => {
        panning = false;
        panPointerStart = null;
      };
    
      let dragId = null;
      let dragPointerStart = null;
      let dragNode = null;
      const onDragStart = e => {
        const node = e.target.closest('.diagram-node');
        if (!node) return;
        dragId = node.getAttribute('data-node');
        dragNode = node;
        dragPointerStart = getPos(e);
        if (e.touches) e.preventDefault();
        e.stopPropagation();
      };
      const onDragMove = e => {
        if (!dragId || !dragPointerStart) return;
        const start = lastDiagramPositions[dragId];
        if (!start) return;
        const pos = getPos(e);
        const delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        const dx = delta.x;
        const dy = delta.y;
        let newX = start.x + dx;
        let newY = start.y + dy;
        if (gridSnap) {
          const g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        const tx = newX - start.x;
        const ty = newY - start.y;
        if (dragNode) dragNode.setAttribute('transform', `translate(${tx},${ty})`);
        if (e.touches) e.preventDefault();
      };
      const onDragEnd = e => {
        if (!dragId || !dragPointerStart) return;
        const start = lastDiagramPositions[dragId];
        if (start) {
          const pos = getPos(e);
          const delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
          const dx = delta.x;
          const dy = delta.y;
          let newX = start.x + dx;
          let newY = start.y + dy;
          if (gridSnap) {
            const g = 20;
            newX = Math.round(newX / g) * g;
            newY = Math.round(newY / g) * g;
          }
          manualPositions[dragId] = { x: newX, y: newY };
        }
        dragId = null;
        dragNode = null;
        dragPointerStart = null;
        renderSetupDiagram();
        if (typeof scheduleProjectAutoSave === 'function') {
          scheduleProjectAutoSave();
        } else if (typeof saveCurrentSession === 'function') {
          saveCurrentSession();
        }
        if (typeof checkSetupChanged === 'function') {
          checkSetupChanged();
        }
        if (e.touches) e.preventDefault();
      };
    
      svg.addEventListener('mousedown', onSvgMouseDown);
      svg.addEventListener('touchstart', onSvgMouseDown, { passive: false });
      window.addEventListener('mousemove', onPanMove);
      window.addEventListener('touchmove', onPanMove, { passive: false });
      window.addEventListener('mouseup', stopPanning);
      window.addEventListener('touchend', stopPanning);
      svg.addEventListener('mousedown', onDragStart);
      svg.addEventListener('touchstart', onDragStart, { passive: false });
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('touchmove', onDragMove, { passive: false });
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchend', onDragEnd);
    
      cleanupDiagramInteractions = () => {
        svg.removeEventListener('mousedown', onSvgMouseDown);
        svg.removeEventListener('touchstart', onSvgMouseDown);
        window.removeEventListener('mousemove', onPanMove);
        window.removeEventListener('touchmove', onPanMove);
        window.removeEventListener('mouseup', stopPanning);
        window.removeEventListener('touchend', stopPanning);
        svg.removeEventListener('mousedown', onDragStart);
        svg.removeEventListener('touchstart', onDragStart);
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('touchmove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchend', onDragEnd);
      };
    
      apply();
    }
    
    function updateDiagramLegend() {
      if (!diagramLegend) return;
      const legendItems = [
        { cls: 'power', text: texts[currentLang].diagramLegendPower },
        { cls: 'video', text: texts[currentLang].diagramLegendVideo },
        { cls: 'fiz', text: texts[currentLang].diagramLegendFIZ }
      ];
      diagramLegend.innerHTML = legendItems
        .map(({ cls, text }) => `<span><span class="swatch ${cls}"></span>${text}</span>`)
        .join('');
    }
    
    function formatValue(value) {
      if (Array.isArray(value)) {
        return value.map((v) => formatValue(v)).join('; ');
      }
      if (value && typeof value === 'object') {
        const parts = [];
        for (const k in value) {
          if (value[k] === '' || value[k] === null || value[k] === undefined) continue;
          parts.push(`${coreHumanizeKey(k)}: ${formatValue(value[k])}`);
        }
        return `{ ${parts.join(', ')} }`;
      }
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';
      return String(value);
    }
    
    function createDeviceDetailsList(deviceData) {
      const list = document.createElement('ul');
      list.className = 'device-detail-list';
    
      const appendItem = (key, value, parent) => {
        if (value === '' || value === null || value === undefined) return;
        const li = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = coreHumanizeKey(key) + ':';
        li.appendChild(label);
    
        if (Array.isArray(value)) {
          if (value.length && typeof value[0] === 'object') {
            const subList = document.createElement('ul');
            subList.className = 'device-detail-list';
            value.forEach((v) => {
              const subLi = document.createElement('li');
              subLi.appendChild(createDeviceDetailsList(v));
              subList.appendChild(subLi);
            });
            li.appendChild(subList);
          } else {
            li.appendChild(document.createTextNode(value.map((v) => formatValue(v)).join(', ')));
          }
        } else if (value && typeof value === 'object') {
          li.appendChild(createDeviceDetailsList(value));
        } else {
          li.appendChild(document.createTextNode(formatValue(value)));
        }
    
        parent.appendChild(li);
      };
    
      if (typeof deviceData !== 'object') {
        appendItem('powerDrawWatts', deviceData, list);
      } else {
        Object.keys(deviceData).forEach((k) => appendItem(k, deviceData[k], list));
      }
    
      return list;
    }
    function formatDateString(val) {
      if (!val) return '';
      const d = new Date(val);
      if (Number.isNaN(d.getTime())) return String(val);
      return d.toISOString().split('T')[0];
    }
    
    // Helper to render existing devices in the manager section
    function renderDeviceList(categoryKey, ulElement) {
      ulElement.innerHTML = "";
      let categoryDevices = devices[categoryKey];
      // Handle nested FIZ categories
      if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        categoryDevices = devices[mainCat] && devices[mainCat][subCat];
      }
      if (!categoryDevices) return;
    
      const buildItem = (name, deviceData, subcategory) => {
        if (name === "None") return;
        const li = document.createElement("li");
        const header = document.createElement("div");
        header.className = "device-summary";
    
        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        let summary = generateSafeConnectorSummary(deviceData);
        summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
        if (deviceData.notes) {
          summary = summary ? `${summary}; Notes: ${deviceData.notes}` : deviceData.notes;
        }
        if (summary) {
          nameSpan.setAttribute('title', summary);
          nameSpan.setAttribute('data-help', summary);
        }
        header.appendChild(nameSpan);
    
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "detail-toggle";
        toggleBtn.type = "button";
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.textContent = texts[currentLang].showDetails;
        toggleBtn.setAttribute('data-help', texts[currentLang].showDetails);
        header.appendChild(toggleBtn);
    
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.dataset.name = name;
        editBtn.dataset.category = categoryKey;
        if (subcategory) editBtn.dataset.subcategory = subcategory;
        editBtn.textContent = texts[currentLang].editBtn;
        editBtn.setAttribute('data-help', texts[currentLang].editBtnHelp || texts[currentLang].editBtn);
        header.appendChild(editBtn);
    
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.name = name;
        deleteBtn.dataset.category = categoryKey;
        if (subcategory) deleteBtn.dataset.subcategory = subcategory;
        deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
        deleteBtn.setAttribute('data-help', texts[currentLang].deleteDeviceBtnHelp || texts[currentLang].deleteDeviceBtn);
        header.appendChild(deleteBtn);
    
        li.appendChild(header);
    
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "device-details";
        detailsDiv.style.display = "none";
        detailsDiv.appendChild(createDeviceDetailsList(deviceData));
        li.appendChild(detailsDiv);
    
        ulElement.appendChild(li);
      };
    
      if (categoryKey === "accessories.cables") {
        for (const [subcat, devs] of Object.entries(categoryDevices)) {
          for (const name in devs) {
            buildItem(name, devs[name], subcat);
          }
        }
      } else {
        for (let name in categoryDevices) {
          buildItem(name, categoryDevices[name]);
        }
      }
    }
    
    function refreshDeviceLists() {
      syncDeviceManagerCategories();
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(({ list, filterInput }, categoryKey) => {
        if (!list) return;
        renderDeviceList(categoryKey, list);
        const filterValue = filterInput ? filterInput.value : '';
        filterDeviceList(list, filterValue);
      });
    }
    
    const CORE_PART2_GLOBAL_EXPORTS = {
      populateSelect,
      refreshAutoGearCameraOptions,
      refreshAutoGearCameraWeightCondition,
      refreshAutoGearMonitorOptions,
      refreshAutoGearTripodHeadOptions,
      refreshAutoGearTripodBowlOptions,
      refreshAutoGearTripodTypesOptions,
      refreshAutoGearTripodSpreaderOptions,
      refreshAutoGearWirelessOptions,
      refreshAutoGearMotorsOptions,
      refreshAutoGearControllersOptions,
      refreshAutoGearCrewOptions,
      refreshAutoGearDistanceOptions,
      exportAutoGearRules,
      updateAutoGearCameraWeightDraft,
      updateAutoGearShootingDaysDraft,
      checkSetupChanged,
      updateCalculations,
      feedbackCancelBtn,
      alignActiveAutoGearPreset,
      closeAutoGearEditor,
      reconcileAutoGearAutoPresetState,
      renderAutoGearBackupControls,
      renderAutoGearBackupRetentionControls,
      renderAutoGearDraftImpact,
      renderAutoGearDraftLists,
      renderAutoGearMonitorDefaultsControls,
      renderAutoGearPresetsControls,
      renderAutoGearRulesList,
      saveAutoGearRuleFromEditor,
      handleAutoGearImportSelection,
      handleAutoGearPresetSelection,
      setAutoGearAutoPresetId,
      syncAutoGearAutoPreset,
      updateAutoGearCatalogOptions,
      updateAutoGearMonitorDefaultOptions,
      applyFavoritesToSelect,
      updateFavoriteButton,
      toggleFavorite,
      accentColor,
      prevAccentColor,
      DEFAULT_ACCENT_COLOR,
      HIGH_CONTRAST_ACCENT_COLOR,
      applyAccentColor,
      clearAccentColorOverrides,
      updateAccentColorResetButtonState,
      restoringSession,
      currentProjectInfo,
      deriveProjectInfo,
      projectForm,
      filterSelectElem,
      filterDetailsStorage,
      loadFeedbackSafe,
      saveFeedbackSafe,
      skipNextGearListRefresh,
      refreshDarkModeAccentBoost,
      isHighContrastActive,
      feedbackUseLocationBtn,
      getSliderBowlValue,
      getEasyrigValue,
      setEasyrigValue,
      fontSize,
      fontFamily,
    };


    const ADDITIONAL_GLOBAL_EXPORT_ENTRIES = [
      ['setBatteryPlates', () => setBatteryPlatesLocal],
      ['getBatteryPlates', () => getBatteryPlates],
      ['setRecordingMedia', () => setRecordingMediaLocal],
      ['getRecordingMedia', () => getRecordingMedia],
      ['applyDarkMode', () => applyDarkMode],
      ['applyPinkMode', () => applyPinkMode],
      ['applyHighContrast', () => applyHighContrast],
      ['setupInstallBanner', () => setupInstallBanner],
      ['generatePrintableOverview', () => generatePrintableOverview],
      ['generateGearListHtml', () => generateGearListHtml],
      ['displayGearAndRequirements', () => displayGearAndRequirements],
      ['ensureZoomRemoteSetup', () => ensureZoomRemoteSetup],
      ['encodeSharedSetup', () => encodeSharedSetup],
      ['decodeSharedSetup', () => decodeSharedSetup],
      ['applySharedSetupFromUrl', () => applySharedSetupFromUrl],
      ['applySharedSetup', () => applySharedSetup],
      ['updateBatteryPlateVisibility', () => updateBatteryPlateVisibility],
      ['updateBatteryOptions', () => updateBatteryOptions],
      ['renderSetupDiagram', () => renderSetupDiagram],
      ['enableDiagramInteractions', () => enableDiagramInteractions],
      ['updateDiagramLegend', () => updateDiagramLegend],
      ['cameraFizPort', () => cameraFizPort],
      ['controllerCamPort', () => controllerCamPort],
      ['controllerDistancePort', () => controllerDistancePort],
      ['detectBrand', () => detectBrand],
      ['connectionLabel', () => connectionLabel],
      ['generateConnectorSummary', () => generateConnectorSummary],
      ['diagramConnectorIcons', () => diagramConnectorIcons],
      ['DIAGRAM_MONITOR_ICON', () => DIAGRAM_MONITOR_ICON],
      ['exportDiagramSvg', () => exportDiagramSvg],
      ['fixPowerInput', () => fixPowerInput],
      ['powerInputTypes', () => powerInputTypes],
      ['ensureList', () => ensureList],
      ['normalizeVideoType', () => normalizeVideoType],
      ['normalizeFizConnectorType', () => normalizeFizConnectorType],
      ['normalizeViewfinderType', () => normalizeViewfinderType],
      ['normalizePowerPortType', () => normalizePowerPortType],
      ['getCurrentSetupKey', () => getCurrentSetupKey],
      ['renderFeedbackTable', () => renderFeedbackTable],
      ['saveCurrentGearList', () => saveCurrentGearList],
      ['getPowerSelectionSnapshot', () => getPowerSelectionSnapshot],
      ['applyStoredPowerSelection', () => applyStoredPowerSelection],
      ['getGearListSelectors', () => getGearListSelectors],
      ['applyGearListSelectors', () => applyGearListSelectors],
      ['scenarioIcons', () => scenarioIcons],
      ['collectProjectFormData', () => collectProjectFormData],
      ['populateProjectForm', () => populateProjectForm],
      ['renderFilterDetails', () => renderFilterDetails],
      ['collectFilterSelections', () => collectFilterSelections],
      ['parseFilterTokens', () => parseFilterTokens],
      ['applyFilterSelectionsToGearList', () => applyFilterSelectionsToGearList],
      ['adjustGearListSelectWidths', () => adjustGearListSelectWidths],
      ['deviceMap', () => deviceMap],
      ['helpMap', () => helpMap],
      ['featureSearchEntries', () => featureSearchEntries],
      ['featureSearchDefaultOptions', () => featureSearchDefaultOptions],
      ['restoreFeatureSearchDefaults', () => restoreFeatureSearchDefaults],
      ['updateFeatureSearchSuggestions', () => updateFeatureSearchSuggestions],
      ['setCurrentProjectInfo', () => setCurrentProjectInfo],
      ['getCurrentProjectInfo', () => getCurrentProjectInfo],
      ['getCurrentSetupState', () => getCurrentSetupState],
      ['setSliderBowlValue', () => setSliderBowlValue],
      ['crewRoles', () => crewRoles],
      ['formatFullBackupFilename', () => formatFullBackupFilename],
      ['computeGearListCount', () => computeGearListCount],
      ['autoBackup', () => autoBackup],
      ['createSettingsBackup', () => createSettingsBackup],
      ['captureStorageSnapshot', () => captureStorageSnapshot],
      ['sanitizeBackupPayload', () => sanitizeBackupPayload],
      ['extractBackupSections', () => extractBackupSections],
      ['searchKey', () => searchKey],
      ['searchTokens', () => searchTokens],
      ['findBestSearchMatch', () => findBestSearchMatch],
      ['runFeatureSearch', () => runFeatureSearch],
      ['collectAutoGearCatalogNames', () => collectAutoGearCatalogNames],
      ['featureMap', () => featureMap],
      ['buildDefaultVideoDistributionAutoGearRules', () => buildDefaultVideoDistributionAutoGearRules],
      ['applyAutoGearRulesToTableHtml', () => applyAutoGearRulesToTableHtml],
      ['importAutoGearRulesFromData', () => importAutoGearRulesFromData],
      ['createAutoGearBackup', () => createAutoGearBackup],
      ['restoreAutoGearBackup', () => restoreAutoGearBackup],
      ['getAutoGearRules', () => getAutoGearRules],
      ['syncAutoGearRulesFromStorage', () => syncAutoGearRulesFromStorage],
      ['normalizeAutoGearCameraWeightCondition', () => normalizeAutoGearCameraWeightCondition],
      ['parseDeviceDatabaseImport', () => parseDeviceDatabaseImport],
      ['countDeviceDatabaseEntries', () => countDeviceDatabaseEntries],
      ['sanitizeShareFilename', () => sanitizeShareFilename],
      ['ensureJsonExtension', () => ensureJsonExtension],
      ['getDefaultShareFilename', () => getDefaultShareFilename],
      ['promptForSharedFilename', () => promptForSharedFilename],
      ['downloadSharedProject', () => downloadSharedProject],
      ['confirmAutoGearSelection', () => confirmAutoGearSelection],
      ['configureSharedImportOptions', () => configureSharedImportOptions],
      ['resolveSharedImportMode', () => resolveSharedImportMode],
      ['resetPlannerStateAfterFactoryReset', () => resetPlannerStateAfterFactoryReset],
    ];

    const resolvedAdditionalExports = ADDITIONAL_GLOBAL_EXPORT_ENTRIES.reduce(
      (acc, [exportName, getter]) => {
        try {
          const value = getter();
          if (typeof value !== 'undefined') {
            acc[exportName] = value;
          }
        } catch (error) {
          void error;
        }
        return acc;
      },
      {}
    );

    Object.assign(CORE_PART2_GLOBAL_EXPORTS, resolvedAdditionalExports);
    const CORE_PART2_GLOBAL_SCOPE =
      CORE_SHARED_SCOPE_PART2 ||
      (typeof globalThis !== 'undefined' ? globalThis : null) ||
      (typeof window !== 'undefined' ? window : null) ||
      (typeof self !== 'undefined' ? self : null) ||
      (typeof global !== 'undefined' ? global : null);
    
    const CORE_PART2_RUNTIME = (function resolvePart2Runtime(scope) {
      if (!scope || typeof scope !== 'object') return null;
      if (scope.cineCoreRuntime && typeof scope.cineCoreRuntime === 'object') {
        return scope.cineCoreRuntime;
      }
      if (Object.isExtensible(scope)) {
        scope.cineCoreRuntime = {};
        return scope.cineCoreRuntime;
      }
      return null;
    })(CORE_PART2_GLOBAL_SCOPE);
    
    Object.entries(CORE_PART2_GLOBAL_EXPORTS).forEach(([name, value]) => {
      if (CORE_PART2_GLOBAL_SCOPE && Object.isExtensible(CORE_PART2_GLOBAL_SCOPE)) {
        CORE_PART2_GLOBAL_SCOPE[name] = value;
      }
      if (CORE_PART2_RUNTIME && Object.isExtensible(CORE_PART2_RUNTIME)) {
        CORE_PART2_RUNTIME[name] = value;
      }
    });
    
    // Ensure deferred boot tasks from the first runtime segment execute before final renders
    flushCoreBootQueue();
    
    // Initial render of device lists
    refreshDeviceLists();
    
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        normalizeAutoGearCameraWeightCondition,
        normalizeAutoGearWeightOperator,
        formatAutoGearCameraWeight,
        getAutoGearCameraWeightOperatorLabel,
      };
    }
  }

  const corePart2ExecutedViaRunner = typeof CORE_PART1_RUNNER === 'function'
    ? CORE_PART1_RUNNER(corePart2Runtime)
    : false;

  if (!corePart2ExecutedViaRunner) {
    corePart2Runtime();
  }

}
