/**
 * @fileoverview CORE WIRING HARNESS: Global Scope Bootstrap
 * 
 * DEEP DIVE: The "Resilient Scope" Pattern
 * 
 * This file is the "Glue" that allows the application to run successfully in:
 * 1. Modern Browsers (Modules)
 * 2. Legacy Browsers (Transpiled ES5)
 * 3. Node.js (Unit Tests)
 * 4. Web Workers
 * 
 * PROBLEM:
 * In a mixed environment (Legacy/Modern), scripts may load out of order,
 * or the global object (`window` vs `self` vs `global`) may vary.
 * 
 * SOLUTION:
 * This script runs immediately and ensures that critical global state variables:
 * 1. Exist (initially null or default).
 * 2. Are type-safe (strings are strings, arrays are arrays).
 * 3. Persist across module reloads (using `ensure*` checks).
 * 
 * By defining `ensureString`, `ensureFunction`, etc., we guarantee that
 * later modules can simply assign `autoGearBaseRules = [...]` without crashing.
 */

function __cineIsArray(value) {
  if (typeof Array !== 'undefined' && typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }

  return Object.prototype.toString.call(value) === '[object Array]';
}

function __cineToComparableString(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || typeof value === 'undefined') {
    return '';
  }

  try {
    return String(value);
  } catch (stringError) {
    void stringError;
    return '';
  }
}

function __cineFallbackLocaleSort(a, b) {
  var normalizedA = __cineToComparableString(a);
  var normalizedB = __cineToComparableString(b);

  try {
    if (typeof normalizedA.localeCompare === 'function') {
      return normalizedA.localeCompare(normalizedB, undefined, {
        sensitivity: 'accent',
        numeric: true,
      });
    }
  } catch (compareError) {
    void compareError;
  }

  if (normalizedA < normalizedB) {
    return -1;
  }
  if (normalizedA > normalizedB) {
    return 1;
  }
  return 0;
}

function __cineToFiniteInteger(candidate) {
  if (candidate === null || typeof candidate === 'undefined') {
    return null;
  }

  var numeric = Number(candidate);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  var rounded = Math.round(numeric);
  if (!Number.isFinite(rounded)) {
    return null;
  }

  return rounded;
}

function __cineResolveRetentionBounds(scope) {
  var min = __cineFallbackResolveAutoGearBackupRetentionMin(scope);
  var max = null;
  var candidates = [];

  if (scope && Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_MAX')) {
    candidates.push(scope.AUTO_GEAR_BACKUP_RETENTION_MAX);
  }
  if (scope && Object.prototype.hasOwnProperty.call(scope, 'MAX_AUTO_BACKUPS')) {
    candidates.push(scope.MAX_AUTO_BACKUPS);
  }
  if (
    scope &&
    scope.__cineStorageApi &&
    Object.prototype.hasOwnProperty.call(
      scope.__cineStorageApi,
      'AUTO_GEAR_BACKUP_RETENTION_MAX',
    )
  ) {
    candidates.push(scope.__cineStorageApi.AUTO_GEAR_BACKUP_RETENTION_MAX);
  }

  for (var index = 0; index < candidates.length; index += 1) {
    var normalized = __cineToFiniteInteger(candidates[index]);
    if (typeof normalized !== 'number') {
      continue;
    }
    if (normalized < min) {
      normalized = min;
    }
    if (max === null || normalized > max) {
      max = normalized;
    }
  }

  if (max === null) {
    max = Math.max(min, 120);
  }

  return { min: min, max: max };
}

function __cineFallbackResolveAutoGearBackupRetentionMin(scope) {
  var candidates = [];

  if (scope && Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_MIN')) {
    candidates.push(scope.AUTO_GEAR_BACKUP_RETENTION_MIN);
  }
  if (
    scope &&
    scope.__cineStorageApi &&
    Object.prototype.hasOwnProperty.call(
      scope.__cineStorageApi,
      'AUTO_GEAR_BACKUP_RETENTION_MIN',
    )
  ) {
    candidates.push(scope.__cineStorageApi.AUTO_GEAR_BACKUP_RETENTION_MIN);
  }

  for (var index = 0; index < candidates.length; index += 1) {
    var normalized = __cineToFiniteInteger(candidates[index]);
    if (typeof normalized === 'number' && normalized >= 1) {
      return normalized < 1 ? 1 : normalized;
    }
  }

  return 1;
}

function __cineFallbackResolveAutoGearBackupRetentionDefault(scope) {
  var bounds = __cineResolveRetentionBounds(scope);
  var min = bounds.min;
  var max = bounds.max;
  var accessors = [];

  if (scope && typeof scope.getAutoGearBackupRetentionDefault === 'function') {
    accessors.push(function () {
      return scope.getAutoGearBackupRetentionDefault();
    });
  }

  if (
    scope &&
    scope.__cineStorageApi &&
    typeof scope.__cineStorageApi.getAutoGearBackupRetentionDefault === 'function'
  ) {
    accessors.push(function () {
      return scope.__cineStorageApi.getAutoGearBackupRetentionDefault();
    });
  }

  accessors.push(function () {
    if (scope && Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_DEFAULT')) {
      return scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
    return null;
  });

  for (var index = 0; index < accessors.length; index += 1) {
    try {
      var candidate = accessors[index]();
      var normalized = __cineToFiniteInteger(candidate);
      if (typeof normalized === 'number') {
        if (normalized < min) {
          normalized = min;
        } else if (normalized > max) {
          normalized = max;
        }
        return normalized;
      }
    } catch (accessError) {
      void accessError;
    }
  }

  var fallback = __cineToFiniteInteger(36);
  if (typeof fallback !== 'number') {
    fallback = min;
  }
  if (fallback < min) {
    fallback = min;
  }
  if (fallback > max) {
    fallback = max;
  }
  return fallback;
}

/**
 * Global Protocol Orchestration
 * 
 * RATIONALE: This bootstrap wrapper ensures that critical globals like 'autoGearAutoPresetId' 
 * are correctly initialized and mirrored across the provided window and module scopes. 
 * Using the 'ensure*' pattern, it prevents double-initialization while guaranteeing 
 * that the application state remains predictable across diverse runtimes (Browser, ESM, Jest).
 */
(function bootstrapCoreRuntimeGlobals() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  function ensureString(name, fallback) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }

    if (typeof value !== 'string') {
      value = fallback;
    }

    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }

    return value;
  }

  function ensureArray(name) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }

    if (!__cineIsArray(value)) {
      value = [];
    }

    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }

    return value;
  }

  function ensureFunction(name, fallback) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }

    if (typeof value !== 'function') {
      value = fallback;
    }

    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }

    return value;
  }

  function ensureNullableObject(name) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }

    if (typeof value === 'undefined') {
      value = null;
    }

    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }

    return value;
  }

  function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || typeof device !== 'object') {
      return '';
    }

    var keys;
    try {
      keys = Object.keys(device);
    } catch (keyError) {
      void keyError;
      return '';
    }

    if (!keys || !keys.length) {
      return '';
    }

    var primaryKey = keys[0];
    var value = device[primaryKey];
    var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
    return value ? label + ': ' + value : label;
  }

  ensureString('autoGearAutoPresetId', '');
  ensureArray('baseAutoGearRules');
  ensureNullableObject('autoGearScenarioModeSelect');
  ensureNullableObject('autoGearRuleNameInput');
  ensureString('autoGearSummaryFocus', 'all');
  ensureArray('autoGearMonitorDefaultControls');
  ensureNullableObject('iosPwaHelpDialog');
  ensureNullableObject('iosPwaHelpClose');
  ensureNullableObject('totalPowerElem');
  ensureFunction('safeGenerateConnectorSummary', fallbackSafeGenerateConnectorSummary);
  ensureNullableObject('CORE_RUNTIME_SHARED');
  ensureNullableObject('CORE_GLOBAL_SCOPE');
  ensureNullableObject('autoGearAddOwnGearSelect');
  ensureNullableObject('autoGearRemoveOwnGearSelect');
  ensureNullableObject('newSubcategorySelect');
  ensureFunction('syncAutoGearMonitorFieldVisibility', function syncAutoGearMonitorFieldVisibilityFallback() { });
  ensureString('currentLang', 'en');
  ensureFunction('localeSort', __cineFallbackLocaleSort);
  ensureFunction('resolveAutoGearBackupRetentionMin', function () {
    var resolved = __cineFallbackResolveAutoGearBackupRetentionMin(scope);
    if (
      scope &&
      (typeof scope.AUTO_GEAR_BACKUP_RETENTION_MIN !== 'number'
        || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_MIN))
    ) {
      try {
        scope.AUTO_GEAR_BACKUP_RETENTION_MIN = resolved;
      } catch (assignError) {
        void assignError;
      }
    }
    return resolved;
  });
  ensureFunction('resolveAutoGearBackupRetentionDefault', function () {
    var resolved = __cineFallbackResolveAutoGearBackupRetentionDefault(scope);
    if (
      scope &&
      (typeof scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number'
        || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT))
    ) {
      try {
        scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = resolved;
      } catch (assignError) {
        void assignError;
      }
    }
    return resolved;
  });
})();

function __cineResolveGlobalValue(name, fallback) {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return fallback;
  }

  var value;
  try {
    value = scope[name];
  } catch (readError) {
    value = undefined;
    void readError;
  }

  return typeof value === 'undefined' ? fallback : value;
}

function __cineCommitGlobalValue(name, value) {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return value;
  }

  try {
    scope[name] = value;
  } catch (assignError) {
    void assignError;
  }

  return value;
}

function __cineCommitGlobalNumericBinding(name, fallback) {
  var resolved = fallback;
  try {
    var current = __cineResolveGlobalValue(name, fallback);
    if (typeof current === 'number' && Number.isFinite(current)) {
      resolved = current;
    }
  } catch (resolveError) {
    void resolveError;
    resolved = fallback;
  }

  try {
    __cineCommitGlobalValue(name, resolved);
  } catch (commitError) {
    void commitError;
  }

  try {
    if (typeof Function === 'function') {
      Function(
        'value',
        "try { if (typeof " + name + " === 'undefined') { " + name + " = value; } } catch (e) { void e; } return value;",
      )(resolved);
    }
  } catch (bindError) {
    void bindError;
  }

  return resolved;
}

var autoGearAutoPresetId =
  typeof autoGearAutoPresetId !== 'undefined' && typeof autoGearAutoPresetId === 'string'
    ? autoGearAutoPresetId
    : (function resolveAutoGearAutoPresetId() {
      var value = __cineResolveGlobalValue('autoGearAutoPresetId', '');
      var normalized = typeof value === 'string' ? value : '';
      return __cineCommitGlobalValue('autoGearAutoPresetId', normalized);
    })();

var baseAutoGearRules =
  typeof baseAutoGearRules !== 'undefined' && __cineIsArray(baseAutoGearRules)
    ? baseAutoGearRules
    : (function resolveBaseAutoGearRules() {
      var value = __cineResolveGlobalValue('baseAutoGearRules', []);
      var normalized = __cineIsArray(value) ? value : [];
      return __cineCommitGlobalValue('baseAutoGearRules', normalized);
    })();

var autoGearScenarioModeSelect =
  typeof autoGearScenarioModeSelect !== 'undefined' &&
    (autoGearScenarioModeSelect === null || typeof autoGearScenarioModeSelect === 'object')
    ? autoGearScenarioModeSelect
    : (function resolveAutoGearScenarioModeSelect() {
      var value = __cineResolveGlobalValue('autoGearScenarioModeSelect', null);
      var normalized =
        typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
      return __cineCommitGlobalValue('autoGearScenarioModeSelect', normalized);
    })();

var autoGearRuleNameInput =
  typeof autoGearRuleNameInput !== 'undefined' &&
    (autoGearRuleNameInput === null || typeof autoGearRuleNameInput === 'object')
    ? autoGearRuleNameInput
    : (function resolveAutoGearRuleNameInput() {
      var value = __cineResolveGlobalValue('autoGearRuleNameInput', null);
      var normalized =
        typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
      return __cineCommitGlobalValue('autoGearRuleNameInput', normalized);
    })();

var autoGearSummaryFocus =
  typeof autoGearSummaryFocus !== 'undefined' && typeof autoGearSummaryFocus === 'string'
    ? autoGearSummaryFocus
    : (function resolveAutoGearSummaryFocus() {
      var value = __cineResolveGlobalValue('autoGearSummaryFocus', 'all');
      var normalized = typeof value === 'string' ? value : 'all';
      return __cineCommitGlobalValue('autoGearSummaryFocus', normalized);
    })();

var autoGearMonitorDefaultControls =
  typeof autoGearMonitorDefaultControls !== 'undefined' &&
    __cineIsArray(autoGearMonitorDefaultControls)
    ? autoGearMonitorDefaultControls
    : (function resolveAutoGearMonitorDefaultControls() {
      var value = __cineResolveGlobalValue('autoGearMonitorDefaultControls', []);
      var normalized = __cineIsArray(value) ? value : [];
      return __cineCommitGlobalValue('autoGearMonitorDefaultControls', normalized);
    })();

var safeGenerateConnectorSummary =
  typeof safeGenerateConnectorSummary !== 'undefined' &&
    typeof safeGenerateConnectorSummary === 'function'
    ? safeGenerateConnectorSummary
    : (function resolveSafeGenerateConnectorSummary() {
      var value = __cineResolveGlobalValue('safeGenerateConnectorSummary', null);
      var normalized =
        typeof value === 'function'
          ? value
          : function fallbackSafeGenerateConnectorSummary(device) {
            if (!device || typeof device !== 'object') {
              return '';
            }

            var keys;
            try {
              keys = Object.keys(device);
            } catch (keyError) {
              void keyError;
              return '';
            }

            if (!keys || !keys.length) {
              return '';
            }

            var primaryKey = keys[0];
            var result = device[primaryKey];
            var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
            return result ? label + ': ' + result : label;
          };

      return __cineCommitGlobalValue('safeGenerateConnectorSummary', normalized);
    })();

var localeSort =
  typeof localeSort === 'function'
    ? localeSort
    : (function resolveLocaleSort() {
      var collator = null;
      if (typeof Intl !== 'undefined' && Intl && typeof Intl.Collator === 'function') {
        try {
          collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
        } catch (collatorError) {
          void collatorError;
          collator = null;
        }
      }

      var comparator = collator
        ? function localeSortWithCollator(a, b) {
          return collator.compare(a == null ? '' : String(a), b == null ? '' : String(b));
        }
        : function localeSortWithoutCollator(a, b) {
          var stringA = a == null ? '' : String(a);
          var stringB = b == null ? '' : String(b);
          if (stringA === stringB) {
            return 0;
          }
          return stringA < stringB ? -1 : 1;
        };

      return __cineCommitGlobalValue('localeSort', comparator);
    })();

var resolveAutoGearBackupRetentionMin =
  typeof resolveAutoGearBackupRetentionMin === 'function'
    ? resolveAutoGearBackupRetentionMin
    : (function defineResolveAutoGearBackupRetentionMin() {
      var FALLBACK_MIN = 1;

      function normalize(value) {
        var numeric = Number(value);
        if (!Number.isFinite(numeric) || numeric <= 0) {
          return FALLBACK_MIN;
        }
        var rounded = Math.round(numeric);
        return rounded > 0 ? rounded : FALLBACK_MIN;
      }

      function resolveMin() {
        var candidate = __cineResolveGlobalValue('AUTO_GEAR_BACKUP_RETENTION_MIN', undefined);
        var normalized = normalize(candidate);
        __cineCommitGlobalValue('AUTO_GEAR_BACKUP_RETENTION_MIN', normalized);
        return normalized;
      }

      return __cineCommitGlobalValue('resolveAutoGearBackupRetentionMin', resolveMin);
    })();

var resolveAutoGearBackupRetentionDefault =
  typeof resolveAutoGearBackupRetentionDefault === 'function'
    ? resolveAutoGearBackupRetentionDefault
    : (function defineResolveAutoGearBackupRetentionDefault() {
      function normalizeDefault(value) {
        var minValue = resolveAutoGearBackupRetentionMin();
        var maxCandidate = __cineResolveGlobalValue('AUTO_GEAR_BACKUP_RETENTION_MAX', undefined);
        var hasMax = Number.isFinite(Number(maxCandidate));
        var maxValue = hasMax ? Math.max(Math.round(Number(maxCandidate)), minValue) : null;
        var numeric = Number(value);

        if (!Number.isFinite(numeric)) {
          return minValue;
        }

        var rounded = Math.round(numeric);
        if (rounded < minValue) {
          return minValue;
        }
        if (hasMax && maxValue !== null && rounded > maxValue) {
          return maxValue;
        }
        return rounded;
      }

      function resolveDefault() {
        var candidate = __cineResolveGlobalValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT', undefined);
        var normalized = normalizeDefault(candidate);
        __cineCommitGlobalValue('AUTO_GEAR_BACKUP_RETENTION_DEFAULT', normalized);
        return normalized;
      }

      return __cineCommitGlobalValue('resolveAutoGearBackupRetentionDefault', resolveDefault);
    })();

var CORE_RUNTIME_SHARED =
  typeof CORE_RUNTIME_SHARED !== 'undefined'
    ? CORE_RUNTIME_SHARED
    : __cineCommitGlobalValue('CORE_RUNTIME_SHARED', null);

var CORE_GLOBAL_SCOPE =
  typeof CORE_GLOBAL_SCOPE !== 'undefined'
    ? CORE_GLOBAL_SCOPE
    : __cineCommitGlobalValue('CORE_GLOBAL_SCOPE', null);

var autoGearAddOwnGearSelect =
  typeof autoGearAddOwnGearSelect !== 'undefined'
    ? autoGearAddOwnGearSelect
    : __cineCommitGlobalValue('autoGearAddOwnGearSelect', null);

var autoGearRemoveOwnGearSelect =
  typeof autoGearRemoveOwnGearSelect !== 'undefined'
    ? autoGearRemoveOwnGearSelect
    : __cineCommitGlobalValue('autoGearRemoveOwnGearSelect', null);

var currentLang =
  typeof currentLang !== 'undefined' && typeof currentLang === 'string'
    ? currentLang
    : __cineCommitGlobalValue('currentLang', 'en');

var getLanguageTexts =
  typeof getLanguageTexts === 'function'
    ? getLanguageTexts
    : (function defineGetLanguageTextsFallback() {
      function normalizeLanguageCode(candidate) {
        if (typeof candidate === 'string' && candidate) {
          try {
            return candidate.trim().toLowerCase();
          } catch (normalizeError) {
            void normalizeError;
          }
        }
        return '';
      }

      function resolveDefaultLanguage() {
        var defaultLanguage = __cineResolveGlobalValue('DEFAULT_LANGUAGE', null);
        if (typeof defaultLanguage === 'string' && defaultLanguage) {
          return defaultLanguage;
        }
        return 'en';
      }

      function resolveTextsDictionary() {
        var scopeTexts = __cineResolveGlobalValue('texts', null);
        if (scopeTexts && typeof scopeTexts === 'object') {
          return scopeTexts;
        }
        return {};
      }

      function fallbackGetLanguageTexts(lang) {
        var dictionary = resolveTextsDictionary();
        if (!dictionary || typeof dictionary !== 'object') {
          return {};
        }

        var normalized = normalizeLanguageCode(lang);
        var defaultLang = resolveDefaultLanguage();
        var fallbackNormalized = normalizeLanguageCode(defaultLang);

        if (normalized && Object.prototype.hasOwnProperty.call(dictionary, normalized)) {
          var direct = dictionary[normalized];
          if (direct && typeof direct === 'object') {
            return direct;
          }
        }

        if (normalized && normalized.length > 2) {
          var shortCode = normalized.slice(0, 2);
          if (Object.prototype.hasOwnProperty.call(dictionary, shortCode)) {
            var regionalMatch = dictionary[shortCode];
            if (regionalMatch && typeof regionalMatch === 'object') {
              return regionalMatch;
            }
          }
        }

        if (fallbackNormalized && Object.prototype.hasOwnProperty.call(dictionary, fallbackNormalized)) {
          var fallbackEntry = dictionary[fallbackNormalized];
          if (fallbackEntry && typeof fallbackEntry === 'object') {
            return fallbackEntry;
          }
        }

        if (Object.prototype.hasOwnProperty.call(dictionary, 'en')) {
          var englishEntry = dictionary.en;
          if (englishEntry && typeof englishEntry === 'object') {
            return englishEntry;
          }
        }

        var firstKey = null;
        try {
          for (var key in dictionary) {
            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
              firstKey = key;
              break;
            }
          }
        } catch (iterateError) {
          void iterateError;
        }

        if (firstKey) {
          var firstEntry = dictionary[firstKey];
          if (firstEntry && typeof firstEntry === 'object') {
            return firstEntry;
          }
        }

        return {};
      }

      return __cineCommitGlobalValue('getLanguageTexts', fallbackGetLanguageTexts);
    })();

var resolveTextEntry =
  typeof resolveTextEntry === 'function'
    ? resolveTextEntry
    : (function defineResolveTextEntryFallback() {
      function normalizeResolvedValue(value) {
        if (typeof value === 'string') {
          try {
            const trimmed = value.trim();
            if (trimmed) {
              return trimmed;
            }
          } catch (trimError) {
            void trimError;
          }
          return '';
        }

        if (typeof value === 'number' && Number.isFinite(value)) {
          return String(value);
        }

        if (Array.isArray(value)) {
          const filtered = value
            .map(entry => {
              if (typeof entry === 'string') {
                return entry.trim();
              }
              if (typeof entry === 'number' && Number.isFinite(entry)) {
                return String(entry);
              }
              return '';
            })
            .filter(Boolean);
          if (filtered.length) {
            return filtered.join(', ');
          }
        }

        return '';
      }

      function fallbackResolveTextEntry(primary, fallback, key, defaultValue) {
        const dictionaries = [];
        if (primary && typeof primary === 'object') {
          dictionaries.push(primary);
        }
        if (fallback && typeof fallback === 'object' && fallback !== primary) {
          dictionaries.push(fallback);
        }

        for (let index = 0; index < dictionaries.length; index += 1) {
          const dictionary = dictionaries[index];
          if (!dictionary || typeof dictionary !== 'object') {
            continue;
          }
          let candidate;
          try {
            candidate = dictionary[key];
          } catch (lookupError) {
            candidate = undefined;
            void lookupError;
          }
          const normalized = normalizeResolvedValue(candidate);
          if (normalized) {
            return normalized;
          }
        }

        if (typeof defaultValue === 'string') {
          return defaultValue;
        }
        if (typeof defaultValue === 'number' && Number.isFinite(defaultValue)) {
          return String(defaultValue);
        }
        return '';
      }

      return __cineCommitGlobalValue('resolveTextEntry', fallbackResolveTextEntry);
    })();

var TEMPERATURE_STORAGE_KEY =
  typeof TEMPERATURE_STORAGE_KEY === 'string' && TEMPERATURE_STORAGE_KEY
    ? TEMPERATURE_STORAGE_KEY
    : __cineCommitGlobalValue('TEMPERATURE_STORAGE_KEY', 'cameraPowerPlanner_temperatureUnit');

var resolveTemperatureStorageKey =
  typeof resolveTemperatureStorageKey === 'function'
    ? resolveTemperatureStorageKey
    : __cineCommitGlobalValue('resolveTemperatureStorageKey', function fallbackResolveTemperatureStorageKey() {
      return TEMPERATURE_STORAGE_KEY;
    });

function __cineNormalizeTemperatureUnits(candidate) {
  const normalized = {};
  if (candidate && typeof candidate === 'object') {
    if (typeof candidate.celsius === 'string' && candidate.celsius.trim()) {
      normalized.celsius = candidate.celsius.trim().toLowerCase();
    }
    if (typeof candidate.fahrenheit === 'string' && candidate.fahrenheit.trim()) {
      normalized.fahrenheit = candidate.fahrenheit.trim().toLowerCase();
    }
  }
  if (!normalized.celsius) {
    normalized.celsius = 'celsius';
  }
  if (!normalized.fahrenheit) {
    normalized.fahrenheit = 'fahrenheit';
  }
  return normalized;
}

(function ensureTemperatureUnitsBinding() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  var existing = null;
  try {
    existing = scope && typeof scope.TEMPERATURE_UNITS === 'object' ? scope.TEMPERATURE_UNITS : null;
  } catch (readError) {
    void readError;
    existing = null;
  }

  var normalized = existing
    ? __cineNormalizeTemperatureUnits(existing)
    : __cineNormalizeTemperatureUnits({ celsius: 'celsius', fahrenheit: 'fahrenheit' });

  try {
    __cineCommitGlobalValue('TEMPERATURE_UNITS', normalized);
  } catch (commitError) {
    void commitError;
  }

  try {
    if (typeof Function === 'function') {
      Function(
        'value',
        "try { TEMPERATURE_UNITS = value; } catch (error) { try { this.TEMPERATURE_UNITS = value; } catch (assignError) { void assignError; } } return (typeof TEMPERATURE_UNITS !== 'undefined' ? TEMPERATURE_UNITS : this && this.TEMPERATURE_UNITS);",
      ).call(scope || null, normalized);
    }
  } catch (bindingError) {
    void bindingError;
  }
})();

function __cineNormalizeTemperatureScenarios(candidate) {
  if (!Array.isArray(candidate)) {
    return [];
  }
  const entries = [];
  for (let index = 0; index < candidate.length; index += 1) {
    const entry = candidate[index];
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const normalized = {};
    if (typeof entry.id === 'string' && entry.id.trim()) {
      normalized.id = entry.id.trim();
    }
    if (typeof entry.key === 'string' && entry.key.trim()) {
      normalized.key = entry.key.trim();
    }
    if (typeof entry.label === 'string' && entry.label.trim()) {
      normalized.label = entry.label.trim();
    }
    if (Object.keys(normalized).length) {
      entries.push(normalized);
    }
  }
  return entries;
}

// Avoid redeclaring the global binding when a host environment already defined
// TEMPERATURE_SCENARIOS as a non-configurable property. Instead, normalize any
// existing value and commit it directly to the global scope so downstream
// scripts can read the scenarios without tripping a SyntaxError during parsing.
(function ensureTemperatureScenariosBinding() {
  var resolved = [];

  try {
    var existing = __cineResolveGlobalValue('TEMPERATURE_SCENARIOS', []);
    if (Array.isArray(existing)) {
      resolved = __cineNormalizeTemperatureScenarios(existing);
    }
  } catch (resolveError) {
    void resolveError;
  }

  try {
    __cineCommitGlobalValue('TEMPERATURE_SCENARIOS', resolved);
  } catch (commitError) {
    void commitError;
  }

  try {
    // Ensure the identifier is usable as a global variable without creating a
    // new binding that could shadow an existing, non-configurable property.
    if (typeof Function === 'function') {
      Function(
        'value',
        "try { this.TEMPERATURE_SCENARIOS = value; } catch (assignError) { void assignError; } return this && this.TEMPERATURE_SCENARIOS;",
      ).call(
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null,
        resolved,
      );
    }
  } catch (bindingError) {
    void bindingError;
  }
})();

__cineCommitGlobalNumericBinding('FEEDBACK_TEMPERATURE_MIN', -20);

__cineCommitGlobalNumericBinding('FEEDBACK_TEMPERATURE_MAX_LIMIT', 50);

var FOCUS_SCALE_STORAGE_KEY =
  typeof FOCUS_SCALE_STORAGE_KEY === 'string' && FOCUS_SCALE_STORAGE_KEY
    ? FOCUS_SCALE_STORAGE_KEY
    : __cineCommitGlobalValue('FOCUS_SCALE_STORAGE_KEY', 'cameraPowerPlanner_focusScale');

var FOCUS_SCALE_VALUES =
  typeof FOCUS_SCALE_VALUES !== 'undefined' && Array.isArray(FOCUS_SCALE_VALUES)
    ? __cineCommitGlobalValue('FOCUS_SCALE_VALUES', FOCUS_SCALE_VALUES.slice())
    : __cineCommitGlobalValue('FOCUS_SCALE_VALUES', ['metric', 'imperial']);

var SUPPORTED_MOUNT_VOLTAGE_TYPES =
  typeof SUPPORTED_MOUNT_VOLTAGE_TYPES !== 'undefined' && Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES)
    ? __cineCommitGlobalValue('SUPPORTED_MOUNT_VOLTAGE_TYPES', SUPPORTED_MOUNT_VOLTAGE_TYPES.slice())
    : __cineCommitGlobalValue('SUPPORTED_MOUNT_VOLTAGE_TYPES', ['V-Mount', 'Gold-Mount', 'B-Mount']);

function __cineNormalizeMountVoltageDefaults(candidate) {
  const defaults = {};
  const types = Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES)
    ? SUPPORTED_MOUNT_VOLTAGE_TYPES
    : ['V-Mount', 'Gold-Mount', 'B-Mount'];
  for (let index = 0; index < types.length; index += 1) {
    const type = types[index];
    const source = candidate && candidate[type] ? candidate[type] : null;
    const high =
      source && typeof source.high === 'number' && Number.isFinite(source.high)
        ? source.high
        : type === 'B-Mount'
          ? 33.6
          : 14.4;
    const low =
      source && typeof source.low === 'number' && Number.isFinite(source.low)
        ? source.low
        : type === 'B-Mount'
          ? 21.6
          : 12;
    defaults[type] = { high, low };
  }
  return defaults;
}

var DEFAULT_MOUNT_VOLTAGES =
  typeof DEFAULT_MOUNT_VOLTAGES !== 'undefined' &&
    DEFAULT_MOUNT_VOLTAGES &&
    typeof DEFAULT_MOUNT_VOLTAGES === 'object'
    ? __cineCommitGlobalValue(
      'DEFAULT_MOUNT_VOLTAGES',
      __cineNormalizeMountVoltageDefaults(DEFAULT_MOUNT_VOLTAGES),
    )
    : __cineCommitGlobalValue(
      'DEFAULT_MOUNT_VOLTAGES',
      __cineNormalizeMountVoltageDefaults({}),
    );

var MOUNT_VOLTAGE_RUNTIME_EXPORTS =
  typeof MOUNT_VOLTAGE_RUNTIME_EXPORTS !== 'undefined' &&
    MOUNT_VOLTAGE_RUNTIME_EXPORTS &&
    typeof MOUNT_VOLTAGE_RUNTIME_EXPORTS === 'object'
    ? __cineCommitGlobalValue('MOUNT_VOLTAGE_RUNTIME_EXPORTS', MOUNT_VOLTAGE_RUNTIME_EXPORTS)
    : __cineCommitGlobalValue('MOUNT_VOLTAGE_RUNTIME_EXPORTS', {});

(function ensureMountVoltageGlobalDelegates() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  var DEFAULT_STORAGE_KEY = 'cameraPowerPlanner_mountVoltages';
  var STATE_KEY = '__cineMountVoltageSessionState';
  var SYNC_TIMER_KEY = '__cineMountVoltageSyncTimer';

  function resolveRuntime() {
    var runtime = null;
    try {
      runtime = scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS;
    } catch (resolveError) {
      runtime = null;
      void resolveError;
    }
    return runtime && typeof runtime === 'object' ? runtime : null;
  }

  function resolveRuntimeFunction(name) {
    var runtime = resolveRuntime();
    if (runtime && typeof runtime[name] === 'function') {
      return runtime[name];
    }
    return null;
  }

  function assignGlobal(name, value) {
    if (typeof value !== 'function') {
      return;
    }
    if (typeof scope[name] === 'function') {
      return;
    }
    try {
      scope[name] = value;
      return;
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value,
      });
    } catch (defineError) {
      void defineError;
    }
  }

  function getSupportedMountTypes() {
    var types;
    try {
      types = scope.SUPPORTED_MOUNT_VOLTAGE_TYPES;
    } catch (resolveError) {
      types = null;
      void resolveError;
    }
    if (Array.isArray(types) && types.length) {
      return types.slice();
    }
    return ['V-Mount', 'Gold-Mount', 'B-Mount'];
  }

  function getDefaultMountVoltages() {
    var defaults;
    try {
      defaults = scope.DEFAULT_MOUNT_VOLTAGES;
    } catch (resolveError) {
      defaults = null;
      void resolveError;
    }
    if (defaults && typeof defaults === 'object') {
      return defaults;
    }
    var generated = {};
    var types = getSupportedMountTypes();
    for (var index = 0; index < types.length; index += 1) {
      var type = types[index];
      if (type === 'B-Mount') {
        generated[type] = { high: 33.6, low: 21.6 };
      } else {
        generated[type] = { high: 14.4, low: 12 };
      }
    }
    return generated;
  }

  function clampVoltageValue(numeric) {
    if (!Number.isFinite(numeric)) {
      return 0;
    }
    var clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  }

  function fallbackParseVoltageValue(value, fallback) {
    if (typeof value === 'number') {
      return clampVoltageValue(value);
    }
    if (typeof value === 'string') {
      var normalized = value.replace(',', '.');
      var parsed = Number.parseFloat(normalized);
      if (Number.isFinite(parsed)) {
        return clampVoltageValue(parsed);
      }
    }
    if (typeof fallback === 'number') {
      return clampVoltageValue(fallback);
    }
    if (typeof fallback === 'string') {
      var fallbackParsed = Number.parseFloat(fallback.replace(',', '.'));
      if (Number.isFinite(fallbackParsed)) {
        return clampVoltageValue(fallbackParsed);
      }
    }
    return 0;
  }

  function cloneWithDefaults(source) {
    var defaults = getDefaultMountVoltages();
    var types = getSupportedMountTypes();
    var result = {};
    for (var index = 0; index < types.length; index += 1) {
      var type = types[index];
      var entry = source && source[type] ? source[type] : defaults[type];
      var defaultEntry = defaults[type] || { high: 0, low: 0 };
      result[type] = {
        high: fallbackParseVoltageValue(entry && entry.high, defaultEntry.high),
        low: fallbackParseVoltageValue(entry && entry.low, defaultEntry.low),
      };
    }
    return result;
  }

  function normalizeSource(source) {
    if (!source || typeof source !== 'object') {
      return cloneWithDefaults(null);
    }
    return cloneWithDefaults(source);
  }

  function resolveStorageKeys() {
    var primary = '';
    var backup = '';
    try {
      primary =
        (typeof scope.getMountVoltageStorageKeyName === 'function' && scope.getMountVoltageStorageKeyName()) ||
        (typeof scope.MOUNT_VOLTAGE_STORAGE_KEY === 'string' && scope.MOUNT_VOLTAGE_STORAGE_KEY) ||
        (typeof scope.MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED === 'string' && scope.MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED) ||
        DEFAULT_STORAGE_KEY;
    } catch (storageKeyError) {
      primary = DEFAULT_STORAGE_KEY;
      void storageKeyError;
    }

    try {
      backup =
        (typeof scope.getMountVoltageStorageBackupKeyName === 'function' && scope.getMountVoltageStorageBackupKeyName()) ||
        (typeof scope.MOUNT_VOLTAGE_STORAGE_BACKUP_KEY === 'string' && scope.MOUNT_VOLTAGE_STORAGE_BACKUP_KEY) ||
        (typeof scope.MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED === 'string' && scope.MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED) ||
        (primary ? primary + '__backup' : DEFAULT_STORAGE_KEY + '__backup');
    } catch (backupKeyError) {
      backup = primary ? primary + '__backup' : DEFAULT_STORAGE_KEY + '__backup';
      void backupKeyError;
    }

    if (!primary) {
      primary = DEFAULT_STORAGE_KEY;
    }
    if (!backup) {
      backup = primary + '__backup';
    }

    return { primary: primary, backup: backup };
  }

  function persistToStorage(preferences) {
    var storage = null;
    try {
      storage = scope.localStorage;
    } catch (resolveError) {
      storage = null;
      void resolveError;
    }
    if (!storage || typeof storage.setItem !== 'function') {
      return false;
    }

    var serialized;
    try {
      serialized = JSON.stringify(preferences);
    } catch (serializationError) {
      if (scope.console && typeof scope.console.warn === 'function') {
        scope.console.warn('Mount voltage fallback: unable to serialize preferences.', serializationError);
      }
      return false;
    }

    var keys = resolveStorageKeys();

    try {
      storage.setItem(keys.primary, serialized);
    } catch (storageError) {
      if (scope.console && typeof scope.console.warn === 'function') {
        scope.console.warn('Mount voltage fallback: unable to persist primary preferences.', storageError);
      }
    }

    try {
      storage.setItem(keys.backup, serialized);
    } catch (backupError) {
      if (scope.console && typeof scope.console.warn === 'function') {
        scope.console.warn('Mount voltage fallback: unable to persist backup preferences.', backupError);
      }
    }

    return true;
  }

  function parseStoredVoltages(raw) {
    if (!raw) {
      return null;
    }
    try {
      if (typeof raw === 'string') {
        var parsed = JSON.parse(raw);
        return normalizeSource(parsed);
      }
      if (typeof raw === 'object') {
        return normalizeSource(raw);
      }
    } catch (parseError) {
      if (scope.console && typeof scope.console.warn === 'function') {
        scope.console.warn('Mount voltage fallback: unable to parse stored voltages.', parseError);
      }
    }
    return null;
  }

  function resolveState() {
    var existing = null;
    try {
      existing = scope[STATE_KEY];
    } catch (stateError) {
      existing = null;
      void stateError;
    }
    if (!existing || typeof existing !== 'object') {
      existing = {
        preferences: cloneWithDefaults(null),
        pendingPersist: false,
        pendingUpdate: false,
      };
    } else if (!existing.preferences || typeof existing.preferences !== 'object') {
      existing.preferences = cloneWithDefaults(null);
    } else {
      existing.preferences = cloneWithDefaults(existing.preferences);
    }
    try {
      scope[STATE_KEY] = existing;
    } catch (assignError) {
      void assignError;
    }
    return existing;
  }

  var state = resolveState();

  function scheduleRuntimeSync() {
    if (!state.pendingPersist && !state.pendingUpdate) {
      return;
    }

    var scheduleFn = null;
    try {
      scheduleFn = scope.setTimeout;
    } catch (resolveError) {
      scheduleFn = null;
      void resolveError;
    }
    if (typeof scheduleFn !== 'function') {
      try {
        scheduleFn = setTimeout;
      } catch (fallbackError) {
        scheduleFn = null;
        void fallbackError;
      }
    }

    if (typeof scheduleFn !== 'function') {
      return;
    }

    var activeTimer = null;
    try {
      activeTimer = scope[SYNC_TIMER_KEY];
    } catch (timerError) {
      activeTimer = null;
      void timerError;
    }
    if (activeTimer) {
      return;
    }

    var attemptSync = function () {
      try {
        scope[SYNC_TIMER_KEY] = null;
      } catch (clearError) {
        void clearError;
      }

      var runtime = resolveRuntime();
      var applyFn = runtime && typeof runtime.applyMountVoltagePreferences === 'function'
        ? runtime.applyMountVoltagePreferences
        : null;
      var cloneFn = runtime && typeof runtime.cloneMountVoltageMap === 'function'
        ? runtime.cloneMountVoltageMap
        : null;

      if (!applyFn || !cloneFn) {
        scheduleRuntimeSync();
        return;
      }

      var pendingPreferences = state.preferences;
      try {
        pendingPreferences = cloneFn(state.preferences);
      } catch (cloneError) {
        void cloneError;
      }

      try {
        applyFn(pendingPreferences, {
          persist: state.pendingPersist,
          triggerUpdate: state.pendingUpdate,
        });
        state.pendingPersist = false;
        state.pendingUpdate = false;
      } catch (syncError) {
        if (scope.console && typeof scope.console.warn === 'function') {
          scope.console.warn('Mount voltage fallback: runtime sync failed.', syncError);
        }
        scheduleRuntimeSync();
      }
    };

    var timerId = scheduleFn(attemptSync, 50);
    try {
      scope[SYNC_TIMER_KEY] = timerId;
    } catch (assignTimerError) {
      void assignTimerError;
    }
  }

  function createDelegate(name, fallback) {
    var delegate = function () {
      var runtimeFn = resolveRuntimeFunction(name);
      if (runtimeFn) {
        try {
          if (scope[name] === delegate) {
            scope[name] = runtimeFn;
          }
        } catch (promoteError) {
          void promoteError;
        }
        var runtimeScope = resolveRuntime() || scope;
        try {
          return runtimeFn.apply(runtimeScope, arguments);
        } catch (invokeError) {
          if (scope.console && typeof scope.console.warn === 'function') {
            scope.console.warn('Mount voltage delegate: runtime helper invocation failed.', invokeError);
          }
        }
      }
      return fallback.apply(this, arguments);
    };
    return delegate;
  }

  var fallbackCloneMountVoltageMap = function (source) {
    var runtimeFn = resolveRuntimeFunction('cloneMountVoltageMap');
    if (runtimeFn) {
      return runtimeFn(source);
    }
    return cloneWithDefaults(source);
  };

  var fallbackGetMountVoltagePreferencesClone = function () {
    var runtimeFn = resolveRuntimeFunction('getMountVoltagePreferencesClone');
    if (runtimeFn) {
      return runtimeFn();
    }
    var clone = cloneWithDefaults(state.preferences);
    state.preferences = cloneWithDefaults(clone);
    return cloneWithDefaults(clone);
  };

  var fallbackApplyMountVoltagePreferences = function (preferences, options) {
    var runtimeFn = resolveRuntimeFunction('applyMountVoltagePreferences');
    if (runtimeFn) {
      return runtimeFn(preferences, options);
    }
    var normalized = normalizeSource(preferences);
    state.preferences = cloneWithDefaults(normalized);
    var persist = !options || options.persist !== false;
    var triggerUpdate = !options || options.triggerUpdate !== false;
    if (persist) {
      persistToStorage(state.preferences);
      state.pendingPersist = true;
    }
    if (triggerUpdate) {
      state.pendingUpdate = true;
    }
    scheduleRuntimeSync();
    return normalized;
  };

  var fallbackParseStoredMountVoltages = function (raw) {
    var runtimeFn = resolveRuntimeFunction('parseStoredMountVoltages');
    if (runtimeFn) {
      return runtimeFn(raw);
    }
    return parseStoredVoltages(raw);
  };

  var fallbackResetMountVoltagePreferences = function (options) {
    return fallbackApplyMountVoltagePreferences(getDefaultMountVoltages(), options);
  };

  var fallbackUpdateMountVoltageInputsFromState = function () {
    var runtimeFn = resolveRuntimeFunction('updateMountVoltageInputsFromState');
    if (runtimeFn) {
      return runtimeFn();
    }
    state.pendingUpdate = true;
    scheduleRuntimeSync();
    return undefined;
  };

  var fallbackPersistMountVoltagePreferences = function (preferences) {
    var runtimeFn = resolveRuntimeFunction('persistMountVoltagePreferences');
    if (runtimeFn) {
      return runtimeFn(preferences);
    }
    var normalized = normalizeSource(preferences);
    state.preferences = cloneWithDefaults(normalized);
    state.pendingPersist = true;
    scheduleRuntimeSync();
    return persistToStorage(state.preferences);
  };

  assignGlobal('parseVoltageValue', createDelegate('parseVoltageValue', fallbackParseVoltageValue));
  assignGlobal('cloneMountVoltageMap', createDelegate('cloneMountVoltageMap', fallbackCloneMountVoltageMap));
  assignGlobal('getMountVoltagePreferencesClone', createDelegate('getMountVoltagePreferencesClone', fallbackGetMountVoltagePreferencesClone));
  assignGlobal('applyMountVoltagePreferences', createDelegate('applyMountVoltagePreferences', fallbackApplyMountVoltagePreferences));
  assignGlobal('parseStoredMountVoltages', createDelegate('parseStoredMountVoltages', fallbackParseStoredMountVoltages));
  assignGlobal('resetMountVoltagePreferences', createDelegate('resetMountVoltagePreferences', fallbackResetMountVoltagePreferences));
  assignGlobal('updateMountVoltageInputsFromState', createDelegate('updateMountVoltageInputsFromState', fallbackUpdateMountVoltageInputsFromState));
  assignGlobal('persistMountVoltagePreferences', createDelegate('persistMountVoltagePreferences', fallbackPersistMountVoltagePreferences));

  if (typeof scope.mountVoltageInputs === 'undefined') {
    try {
      scope.mountVoltageInputs = null;
    } catch (mountInputsError) {
      void mountInputsError;
    }
  }
})();

var syncMountVoltageResetButtonGlobal =
  typeof syncMountVoltageResetButtonGlobal === 'function'
    ? syncMountVoltageResetButtonGlobal
    : (function defineSyncMountVoltageResetButtonGlobalFallback() {
      function resolveMountVoltageScope() {
        var candidates = [
          __cineResolveGlobalValue('CORE_GLOBAL_SCOPE', null),
          typeof globalThis !== 'undefined' ? globalThis : null,
          typeof window !== 'undefined' ? window : null,
          typeof self !== 'undefined' ? self : null,
          typeof global !== 'undefined' ? global : null,
        ];

        for (var index = 0; index < candidates.length; index += 1) {
          var scope = candidates[index];
          if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
            return scope;
          }
        }

        return null;
      }

      function delegateToNamespace(scope, value) {
        if (!scope) {
          return;
        }
        var namespace = scope.cineCoreMountVoltage;
        if (namespace && typeof namespace.syncMountVoltageResetButtonGlobal === 'function') {
          try {
            namespace.syncMountVoltageResetButtonGlobal(value);
            return;
          } catch (delegateError) {
            void delegateError;
          }
        }
        try {
          scope.mountVoltageResetButton = value;
        } catch (assignError) {
          void assignError;
        }
      }

      function fallbackSyncMountVoltageResetButtonGlobal(value) {
        var scope = resolveMountVoltageScope();
        delegateToNamespace(scope, value);
        return value;
      }

      return __cineCommitGlobalValue(
        'syncMountVoltageResetButtonGlobal',
        fallbackSyncMountVoltageResetButtonGlobal,
      );
    })();

var totalPowerElem =
  typeof totalPowerElem !== 'undefined' &&
    (totalPowerElem === null || typeof totalPowerElem === 'object')
    ? totalPowerElem
    : (function resolveTotalPowerElem() {
      var value = __cineResolveGlobalValue('totalPowerElem', null);
      var normalized =
        typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
      return __cineCommitGlobalValue('totalPowerElem', normalized);
    })();
