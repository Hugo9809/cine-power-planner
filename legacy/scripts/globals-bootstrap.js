function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
        numeric: true
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
  if (scope && scope.__cineStorageApi && Object.prototype.hasOwnProperty.call(scope.__cineStorageApi, 'AUTO_GEAR_BACKUP_RETENTION_MAX')) {
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
  return {
    min: min,
    max: max
  };
}
function __cineFallbackResolveAutoGearBackupRetentionMin(scope) {
  var candidates = [];
  if (scope && Object.prototype.hasOwnProperty.call(scope, 'AUTO_GEAR_BACKUP_RETENTION_MIN')) {
    candidates.push(scope.AUTO_GEAR_BACKUP_RETENTION_MIN);
  }
  if (scope && scope.__cineStorageApi && Object.prototype.hasOwnProperty.call(scope.__cineStorageApi, 'AUTO_GEAR_BACKUP_RETENTION_MIN')) {
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
  if (scope && scope.__cineStorageApi && typeof scope.__cineStorageApi.getAutoGearBackupRetentionDefault === 'function') {
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
(function bootstrapCoreRuntimeGlobals() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
    if (!device || _typeof(device) !== 'object') {
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
  ensureFunction('syncAutoGearMonitorFieldVisibility', function syncAutoGearMonitorFieldVisibilityFallback() {});
  ensureString('currentLang', 'en');
  ensureFunction('localeSort', __cineFallbackLocaleSort);
  ensureFunction('resolveAutoGearBackupRetentionMin', function () {
    var resolved = __cineFallbackResolveAutoGearBackupRetentionMin(scope);
    if (scope && (typeof scope.AUTO_GEAR_BACKUP_RETENTION_MIN !== 'number' || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_MIN))) {
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
    if (scope && (typeof scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number' || !Number.isFinite(scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT))) {
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
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return value;
  }
  try {
    scope[name] = value;
  } catch (assignError) {
    void assignError;
  }
  return value;
}
var autoGearAutoPresetId = typeof autoGearAutoPresetId !== 'undefined' && typeof autoGearAutoPresetId === 'string' ? autoGearAutoPresetId : function resolveAutoGearAutoPresetId() {
  var value = __cineResolveGlobalValue('autoGearAutoPresetId', '');
  var normalized = typeof value === 'string' ? value : '';
  return __cineCommitGlobalValue('autoGearAutoPresetId', normalized);
}();
var baseAutoGearRules = typeof baseAutoGearRules !== 'undefined' && __cineIsArray(baseAutoGearRules) ? baseAutoGearRules : function resolveBaseAutoGearRules() {
  var value = __cineResolveGlobalValue('baseAutoGearRules', []);
  var normalized = __cineIsArray(value) ? value : [];
  return __cineCommitGlobalValue('baseAutoGearRules', normalized);
}();
var autoGearScenarioModeSelect = typeof autoGearScenarioModeSelect !== 'undefined' && (autoGearScenarioModeSelect === null || _typeof(autoGearScenarioModeSelect) === 'object') ? autoGearScenarioModeSelect : function resolveAutoGearScenarioModeSelect() {
  var value = __cineResolveGlobalValue('autoGearScenarioModeSelect', null);
  var normalized = typeof value === 'undefined' || value === null || _typeof(value) === 'object' ? value : null;
  return __cineCommitGlobalValue('autoGearScenarioModeSelect', normalized);
}();
var autoGearRuleNameInput = typeof autoGearRuleNameInput !== 'undefined' && (autoGearRuleNameInput === null || _typeof(autoGearRuleNameInput) === 'object') ? autoGearRuleNameInput : function resolveAutoGearRuleNameInput() {
  var value = __cineResolveGlobalValue('autoGearRuleNameInput', null);
  var normalized = typeof value === 'undefined' || value === null || _typeof(value) === 'object' ? value : null;
  return __cineCommitGlobalValue('autoGearRuleNameInput', normalized);
}();
var autoGearSummaryFocus = typeof autoGearSummaryFocus !== 'undefined' && typeof autoGearSummaryFocus === 'string' ? autoGearSummaryFocus : function resolveAutoGearSummaryFocus() {
  var value = __cineResolveGlobalValue('autoGearSummaryFocus', 'all');
  var normalized = typeof value === 'string' ? value : 'all';
  return __cineCommitGlobalValue('autoGearSummaryFocus', normalized);
}();
var autoGearMonitorDefaultControls = typeof autoGearMonitorDefaultControls !== 'undefined' && __cineIsArray(autoGearMonitorDefaultControls) ? autoGearMonitorDefaultControls : function resolveAutoGearMonitorDefaultControls() {
  var value = __cineResolveGlobalValue('autoGearMonitorDefaultControls', []);
  var normalized = __cineIsArray(value) ? value : [];
  return __cineCommitGlobalValue('autoGearMonitorDefaultControls', normalized);
}();
var safeGenerateConnectorSummary = typeof safeGenerateConnectorSummary !== 'undefined' && typeof safeGenerateConnectorSummary === 'function' ? safeGenerateConnectorSummary : function resolveSafeGenerateConnectorSummary() {
  var value = __cineResolveGlobalValue('safeGenerateConnectorSummary', null);
  var normalized = typeof value === 'function' ? value : function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || _typeof(device) !== 'object') {
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
}();
var localeSort = typeof localeSort === 'function' ? localeSort : function resolveLocaleSort() {
  var collator = null;
  if (typeof Intl !== 'undefined' && Intl && typeof Intl.Collator === 'function') {
    try {
      collator = new Intl.Collator(undefined, {
        sensitivity: 'base',
        numeric: true
      });
    } catch (collatorError) {
      void collatorError;
      collator = null;
    }
  }
  var comparator = collator ? function localeSortWithCollator(a, b) {
    return collator.compare(a == null ? '' : String(a), b == null ? '' : String(b));
  } : function localeSortWithoutCollator(a, b) {
    var stringA = a == null ? '' : String(a);
    var stringB = b == null ? '' : String(b);
    if (stringA === stringB) {
      return 0;
    }
    return stringA < stringB ? -1 : 1;
  };
  return __cineCommitGlobalValue('localeSort', comparator);
}();
var resolveAutoGearBackupRetentionMin = typeof resolveAutoGearBackupRetentionMin === 'function' ? resolveAutoGearBackupRetentionMin : function defineResolveAutoGearBackupRetentionMin() {
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
}();
var resolveAutoGearBackupRetentionDefault = typeof resolveAutoGearBackupRetentionDefault === 'function' ? resolveAutoGearBackupRetentionDefault : function defineResolveAutoGearBackupRetentionDefault() {
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
}();
var CORE_RUNTIME_SHARED = typeof CORE_RUNTIME_SHARED !== 'undefined' ? CORE_RUNTIME_SHARED : __cineCommitGlobalValue('CORE_RUNTIME_SHARED', null);
var CORE_GLOBAL_SCOPE = typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : __cineCommitGlobalValue('CORE_GLOBAL_SCOPE', null);
var autoGearAddOwnGearSelect = typeof autoGearAddOwnGearSelect !== 'undefined' ? autoGearAddOwnGearSelect : __cineCommitGlobalValue('autoGearAddOwnGearSelect', null);
var autoGearRemoveOwnGearSelect = typeof autoGearRemoveOwnGearSelect !== 'undefined' ? autoGearRemoveOwnGearSelect : __cineCommitGlobalValue('autoGearRemoveOwnGearSelect', null);
var currentLang = typeof currentLang !== 'undefined' && typeof currentLang === 'string' ? currentLang : __cineCommitGlobalValue('currentLang', 'en');
var getLanguageTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts : function defineGetLanguageTextsFallback() {
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
    if (scopeTexts && _typeof(scopeTexts) === 'object') {
      return scopeTexts;
    }
    return {};
  }
  function fallbackGetLanguageTexts(lang) {
    var dictionary = resolveTextsDictionary();
    if (!dictionary || _typeof(dictionary) !== 'object') {
      return {};
    }
    var normalized = normalizeLanguageCode(lang);
    var defaultLang = resolveDefaultLanguage();
    var fallbackNormalized = normalizeLanguageCode(defaultLang);
    if (normalized && Object.prototype.hasOwnProperty.call(dictionary, normalized)) {
      var direct = dictionary[normalized];
      if (direct && _typeof(direct) === 'object') {
        return direct;
      }
    }
    if (normalized && normalized.length > 2) {
      var shortCode = normalized.slice(0, 2);
      if (Object.prototype.hasOwnProperty.call(dictionary, shortCode)) {
        var regionalMatch = dictionary[shortCode];
        if (regionalMatch && _typeof(regionalMatch) === 'object') {
          return regionalMatch;
        }
      }
    }
    if (fallbackNormalized && Object.prototype.hasOwnProperty.call(dictionary, fallbackNormalized)) {
      var fallbackEntry = dictionary[fallbackNormalized];
      if (fallbackEntry && _typeof(fallbackEntry) === 'object') {
        return fallbackEntry;
      }
    }
    if (Object.prototype.hasOwnProperty.call(dictionary, 'en')) {
      var englishEntry = dictionary.en;
      if (englishEntry && _typeof(englishEntry) === 'object') {
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
      if (firstEntry && _typeof(firstEntry) === 'object') {
        return firstEntry;
      }
    }
    return {};
  }
  return __cineCommitGlobalValue('getLanguageTexts', fallbackGetLanguageTexts);
}();
var resolveTextEntry = typeof resolveTextEntry === 'function' ? resolveTextEntry : function defineResolveTextEntryFallback() {
  function normalizeResolvedValue(value) {
    if (typeof value === 'string') {
      try {
        var trimmed = value.trim();
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
      var filtered = value.map(function (entry) {
        if (typeof entry === 'string') {
          return entry.trim();
        }
        if (typeof entry === 'number' && Number.isFinite(entry)) {
          return String(entry);
        }
        return '';
      }).filter(Boolean);
      if (filtered.length) {
        return filtered.join(', ');
      }
    }
    return '';
  }
  function fallbackResolveTextEntry(primary, fallback, key, defaultValue) {
    var dictionaries = [];
    if (primary && _typeof(primary) === 'object') {
      dictionaries.push(primary);
    }
    if (fallback && _typeof(fallback) === 'object' && fallback !== primary) {
      dictionaries.push(fallback);
    }
    for (var index = 0; index < dictionaries.length; index += 1) {
      var dictionary = dictionaries[index];
      if (!dictionary || _typeof(dictionary) !== 'object') {
        continue;
      }
      var candidate = void 0;
      try {
        candidate = dictionary[key];
      } catch (lookupError) {
        candidate = undefined;
        void lookupError;
      }
      var normalized = normalizeResolvedValue(candidate);
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
}();
var TEMPERATURE_STORAGE_KEY = typeof TEMPERATURE_STORAGE_KEY === 'string' && TEMPERATURE_STORAGE_KEY ? TEMPERATURE_STORAGE_KEY : __cineCommitGlobalValue('TEMPERATURE_STORAGE_KEY', 'cameraPowerPlanner_temperatureUnit');
var resolveTemperatureStorageKey = typeof resolveTemperatureStorageKey === 'function' ? resolveTemperatureStorageKey : __cineCommitGlobalValue('resolveTemperatureStorageKey', function fallbackResolveTemperatureStorageKey() {
  return TEMPERATURE_STORAGE_KEY;
});
function __cineNormalizeTemperatureUnits(candidate) {
  var normalized = {};
  if (candidate && _typeof(candidate) === 'object') {
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
var TEMPERATURE_UNITS = typeof TEMPERATURE_UNITS !== 'undefined' && TEMPERATURE_UNITS && _typeof(TEMPERATURE_UNITS) === 'object' ? __cineCommitGlobalValue('TEMPERATURE_UNITS', __cineNormalizeTemperatureUnits(TEMPERATURE_UNITS)) : __cineCommitGlobalValue('TEMPERATURE_UNITS', __cineNormalizeTemperatureUnits({
  celsius: 'celsius',
  fahrenheit: 'fahrenheit'
}));
function __cineNormalizeTemperatureScenarios(candidate) {
  if (!Array.isArray(candidate)) {
    return [];
  }
  var entries = [];
  for (var index = 0; index < candidate.length; index += 1) {
    var entry = candidate[index];
    if (!entry || _typeof(entry) !== 'object') {
      continue;
    }
    var normalized = {};
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
var TEMPERATURE_SCENARIOS = typeof TEMPERATURE_SCENARIOS !== 'undefined' && Array.isArray(TEMPERATURE_SCENARIOS) ? __cineCommitGlobalValue('TEMPERATURE_SCENARIOS', __cineNormalizeTemperatureScenarios(TEMPERATURE_SCENARIOS)) : __cineCommitGlobalValue('TEMPERATURE_SCENARIOS', []);
var FEEDBACK_TEMPERATURE_MIN = typeof FEEDBACK_TEMPERATURE_MIN === 'number' && Number.isFinite(FEEDBACK_TEMPERATURE_MIN) ? __cineCommitGlobalValue('FEEDBACK_TEMPERATURE_MIN', FEEDBACK_TEMPERATURE_MIN) : __cineCommitGlobalValue('FEEDBACK_TEMPERATURE_MIN', -20);
var FEEDBACK_TEMPERATURE_MAX = typeof FEEDBACK_TEMPERATURE_MAX === 'number' && Number.isFinite(FEEDBACK_TEMPERATURE_MAX) ? __cineCommitGlobalValue('FEEDBACK_TEMPERATURE_MAX', FEEDBACK_TEMPERATURE_MAX) : __cineCommitGlobalValue('FEEDBACK_TEMPERATURE_MAX', 50);
var FOCUS_SCALE_STORAGE_KEY = typeof FOCUS_SCALE_STORAGE_KEY === 'string' && FOCUS_SCALE_STORAGE_KEY ? FOCUS_SCALE_STORAGE_KEY : __cineCommitGlobalValue('FOCUS_SCALE_STORAGE_KEY', 'cameraPowerPlanner_focusScale');
var FOCUS_SCALE_VALUES = typeof FOCUS_SCALE_VALUES !== 'undefined' && Array.isArray(FOCUS_SCALE_VALUES) ? __cineCommitGlobalValue('FOCUS_SCALE_VALUES', FOCUS_SCALE_VALUES.slice()) : __cineCommitGlobalValue('FOCUS_SCALE_VALUES', ['metric', 'imperial']);
var SUPPORTED_MOUNT_VOLTAGE_TYPES = typeof SUPPORTED_MOUNT_VOLTAGE_TYPES !== 'undefined' && Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES) ? __cineCommitGlobalValue('SUPPORTED_MOUNT_VOLTAGE_TYPES', SUPPORTED_MOUNT_VOLTAGE_TYPES.slice()) : __cineCommitGlobalValue('SUPPORTED_MOUNT_VOLTAGE_TYPES', ['V-Mount', 'Gold-Mount', 'B-Mount']);
function __cineNormalizeMountVoltageDefaults(candidate) {
  var defaults = {};
  var types = Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES) ? SUPPORTED_MOUNT_VOLTAGE_TYPES : ['V-Mount', 'Gold-Mount', 'B-Mount'];
  for (var index = 0; index < types.length; index += 1) {
    var type = types[index];
    var source = candidate && candidate[type] ? candidate[type] : null;
    var high = source && typeof source.high === 'number' && Number.isFinite(source.high) ? source.high : type === 'B-Mount' ? 33.6 : 14.4;
    var low = source && typeof source.low === 'number' && Number.isFinite(source.low) ? source.low : type === 'B-Mount' ? 21.6 : 12;
    defaults[type] = {
      high: high,
      low: low
    };
  }
  return defaults;
}
var DEFAULT_MOUNT_VOLTAGES = typeof DEFAULT_MOUNT_VOLTAGES !== 'undefined' && DEFAULT_MOUNT_VOLTAGES && _typeof(DEFAULT_MOUNT_VOLTAGES) === 'object' ? __cineCommitGlobalValue('DEFAULT_MOUNT_VOLTAGES', __cineNormalizeMountVoltageDefaults(DEFAULT_MOUNT_VOLTAGES)) : __cineCommitGlobalValue('DEFAULT_MOUNT_VOLTAGES', __cineNormalizeMountVoltageDefaults({}));
var MOUNT_VOLTAGE_RUNTIME_EXPORTS = typeof MOUNT_VOLTAGE_RUNTIME_EXPORTS !== 'undefined' && MOUNT_VOLTAGE_RUNTIME_EXPORTS && _typeof(MOUNT_VOLTAGE_RUNTIME_EXPORTS) === 'object' ? __cineCommitGlobalValue('MOUNT_VOLTAGE_RUNTIME_EXPORTS', MOUNT_VOLTAGE_RUNTIME_EXPORTS) : __cineCommitGlobalValue('MOUNT_VOLTAGE_RUNTIME_EXPORTS', {});
var syncMountVoltageResetButtonGlobal = typeof syncMountVoltageResetButtonGlobal === 'function' ? syncMountVoltageResetButtonGlobal : function defineSyncMountVoltageResetButtonGlobalFallback() {
  function resolveMountVoltageScope() {
    var candidates = [__cineResolveGlobalValue('CORE_GLOBAL_SCOPE', null), typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      if (scope && (_typeof(scope) === 'object' || typeof scope === 'function')) {
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
  return __cineCommitGlobalValue('syncMountVoltageResetButtonGlobal', fallbackSyncMountVoltageResetButtonGlobal);
}();
var totalPowerElem = typeof totalPowerElem !== 'undefined' && (totalPowerElem === null || _typeof(totalPowerElem) === 'object') ? totalPowerElem : function resolveTotalPowerElem() {
  var value = __cineResolveGlobalValue('totalPowerElem', null);
  var normalized = typeof value === 'undefined' || value === null || _typeof(value) === 'object' ? value : null;
  return __cineCommitGlobalValue('totalPowerElem', normalized);
}();