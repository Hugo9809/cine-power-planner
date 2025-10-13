function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var eventsLogger = function resolveEventsLogger() {
  var scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    var logging = null;
    try {
      logging = scope.cineLogging || null;
    } catch (error) {
      logging = null;
    }
    if (logging && typeof logging.createLogger === 'function') {
      try {
        return logging.createLogger('events', {
          meta: {
            source: 'app-events'
          }
        });
      } catch (creationError) {
        try {
          if (typeof logging.error === 'function') {
            logging.error('Failed to create events logger', creationError, {
              namespace: 'events-bootstrap'
            });
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  }
  return null;
}();
var APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG = typeof globalThis !== 'undefined' && globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG ? globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG : '__cineAutoBackupRenamed';
if (typeof viewfinderTypeOptions === 'undefined' || !Array.isArray(viewfinderTypeOptions)) {
  viewfinderTypeOptions = [];
}
if (typeof viewfinderConnectorOptions === 'undefined' || !Array.isArray(viewfinderConnectorOptions)) {
  viewfinderConnectorOptions = [];
}
function getGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis) return globalThis;
  if (typeof window !== 'undefined' && window) return window;
  if (typeof self !== 'undefined' && self) return self;
  if (typeof global !== 'undefined' && global) return global;
  return null;
}
var resolvedDeviceManagerElements = {
  categorySelect: null
};
function resolveNewCategorySelect() {
  var cached = resolvedDeviceManagerElements.categorySelect;
  if (cached && _typeof(cached) === 'object') {
    if (typeof cached.isConnected === 'boolean') {
      if (cached.isConnected) {
        return cached;
      }
    } else if (cached.ownerDocument) {
      return cached;
    }
  }
  var element = null;
  if (typeof newCategorySelect !== 'undefined' && newCategorySelect) {
    element = newCategorySelect;
  } else if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    element = document.getElementById('newCategory');
  }
  if (element) {
    resolvedDeviceManagerElements.categorySelect = element;
    var scope = getGlobalScope();
    if (scope && _typeof(scope) === 'object') {
      try {
        scope.newCategorySelect = scope.newCategorySelect || element;
      } catch (assignError) {
        void assignError;
      }
    }
  }
  return element;
}
var AUTO_BACKUP_CHANGE_THRESHOLD = 50;
var AUTO_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
var AUTO_BACKUP_ALLOWED_REASONS = ['interval', 'project-switch', 'import', 'export', 'export-revert', 'before-reload', 'change-threshold'];
var AUTO_BACKUP_RATE_LIMITED_REASONS = new Set(['import']);
var AUTO_BACKUP_CADENCE_EXEMPT_REASONS = new Set(['import', 'export', 'export-revert', 'before-reload', 'project-switch']);
var AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS = 2 * 60 * 1000;
var lastAutoBackupReasonState = new Map();
var AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS = 800;
var autoBackupChangesSinceSnapshot = 0;
var autoBackupThresholdInProgress = false;
var autoBackupChangePendingCommit = false;
var lastAutoBackupCompletedAtMs = 0;
var lastImmediateAutoBackupCommitAtMs = 0;
function resetAutoBackupChangeCounter() {
  autoBackupChangesSinceSnapshot = 0;
}
function recordAutoBackupRun(result) {
  autoBackupThresholdInProgress = false;
  if (!result || _typeof(result) !== 'object') {
    return;
  }
  var status = typeof result.status === 'string' ? result.status : null;
  var reason = typeof result.reason === 'string' ? result.reason : null;
  if (status === 'skipped') {
    if (reason === 'unchanged') {
      resetAutoBackupChangeCounter();
    }
    return;
  }
  if (status && status !== 'error') {
    resetAutoBackupChangeCounter();
    if (status === 'success') {
      lastAutoBackupCompletedAtMs = Date.now();
    }
  }
}
function isAutoBackupReasonAllowed(reason) {
  if (typeof reason !== 'string' || !reason) {
    return false;
  }
  return AUTO_BACKUP_ALLOWED_REASONS.includes(reason);
}
function showAutoBackupIndicatorSafe() {
  var scope = getGlobalScope();
  var indicator = scope && typeof scope.__cineShowAutoBackupIndicator === 'function' ? scope.__cineShowAutoBackupIndicator : null;
  if (!indicator) {
    return function () {};
  }
  try {
    var message = resolveAutoBackupIndicatorMessage();
    var hide = indicator(message);
    return typeof hide === 'function' ? hide : function () {};
  } catch (indicatorError) {
    console.warn('Failed to show auto backup indicator', indicatorError);
    return function () {};
  }
}
function triggerAutoBackupForChangeThreshold(details) {
  if (autoBackupThresholdInProgress) {
    return;
  }
  autoBackupThresholdInProgress = true;
  var run = function run() {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'change-threshold'
      });
    } catch (error) {
      console.warn('Failed to run auto backup after change threshold', error);
      autoBackupThresholdInProgress = false;
    }
  };
  if (typeof queueMicrotask === 'function') {
    try {
      queueMicrotask(run);
      return;
    } catch (queueError) {
      console.warn('Failed to queue auto backup microtask', queueError);
    }
  }
  var timer = setTimeout(run, 0);
  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}
function noteAutoBackupRelevantChange() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (details && details.reset === true) {
    resetAutoBackupChangeCounter();
    autoBackupChangePendingCommit = false;
    lastImmediateAutoBackupCommitAtMs = 0;
    return;
  }
  var pendingNotification = Boolean(details && details.pending === true);
  var commitRequested = Boolean(details && details.commit === true);
  var commitContext = details && _typeof(details.context) === 'object' && details.context !== null ? details.context : null;
  if (pendingNotification) {
    autoBackupChangePendingCommit = true;
    return;
  }
  if (commitRequested && !autoBackupChangePendingCommit && details.force !== true) {
    return;
  }
  if (commitRequested || autoBackupChangePendingCommit) {
    autoBackupChangePendingCommit = false;
    var immediateCommit = Boolean(commitContext && commitContext.immediate === true);
    if (immediateCommit) {
      var commitTimestamp = null;
      if (commitContext && typeof commitContext.completedAt === 'number' && Number.isFinite(commitContext.completedAt)) {
        commitTimestamp = commitContext.completedAt;
      } else if (commitContext && typeof commitContext.requestedAt === 'number' && Number.isFinite(commitContext.requestedAt)) {
        commitTimestamp = commitContext.requestedAt;
      }
      if (!Number.isFinite(commitTimestamp)) {
        commitTimestamp = Date.now();
      }
      if (details.force !== true && lastImmediateAutoBackupCommitAtMs > 0 && commitTimestamp >= lastImmediateAutoBackupCommitAtMs && commitTimestamp - lastImmediateAutoBackupCommitAtMs < AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
        return;
      }
      if (commitTimestamp >= lastImmediateAutoBackupCommitAtMs || lastImmediateAutoBackupCommitAtMs <= 0) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
      }
    }
    autoBackupChangesSinceSnapshot = Math.min(AUTO_BACKUP_CHANGE_THRESHOLD, autoBackupChangesSinceSnapshot + 1);
    if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
      triggerAutoBackupForChangeThreshold(details);
    }
    return;
  }
  autoBackupChangesSinceSnapshot = Math.min(AUTO_BACKUP_CHANGE_THRESHOLD, autoBackupChangesSinceSnapshot + 1);
  if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
    triggerAutoBackupForChangeThreshold(details);
  }
}
try {
  var scope = getGlobalScope();
  if (scope) {
    scope.__cineNoteAutoBackupChange = noteAutoBackupRelevantChange;
  }
} catch (changeExposeError) {
  console.warn('Failed to expose auto backup change tracker', changeExposeError);
}
function markAutoBackupDataAsRenamed(value) {
  if (!value || _typeof(value) !== 'object') {
    return;
  }
  try {
    value[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
  } catch (assignmentError) {
    void assignmentError;
  }
  var info = value.projectInfo;
  if (info && _typeof(info) === 'object') {
    try {
      info[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
    } catch (infoError) {
      void infoError;
    }
  }
}
function callEventsCoreFunction(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }
  var scope = (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null) || null;
  var target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
  if (typeof target === 'function') {
    try {
      return target.apply(scope, args);
    } catch (invokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        var metadata = {
          functionName: functionName,
          deferred: !!(options && options.defer),
          argumentsSnapshot: Array.isArray(args) ? args.slice(0, 5) : null
        };
        try {
          eventsLogger.error("Failed to invoke ".concat(functionName), invokeError, metadata);
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error("Failed to invoke ".concat(functionName), invokeError);
      }
    }
    return undefined;
  }
  if (options && options.defer === true) {
    var queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
    if (queue) {
      queue.push(function () {
        callEventsCoreFunction(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
          defer: false
        }));
      });
    }
  }
  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
}
function resolveFirstPowerInputType(device) {
  var result;
  try {
    result = callEventsCoreFunction('firstPowerInputType', [device]);
  } catch (error) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn('Failed to resolve firstPowerInputType from core', error, {
          namespace: 'device-editor'
        });
      } catch (logError) {
        void logError;
      }
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to resolve firstPowerInputType from core', error);
    }
  }
  if (typeof result === 'string') {
    return result;
  }
  if (Array.isArray(result) && result.length) {
    return typeof result[0] === 'string' ? result[0] : '';
  }
  if (result && _typeof(result) === 'object') {
    var candidate = result.type || result.portType;
    if (typeof candidate === 'string') {
      return candidate;
    }
  }
  return '';
}
function resolveCoreOptionsArray(functionName) {
  var existingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fallback = Array.isArray(existingValues) ? existingValues.slice() : [];
  try {
    var result = callEventsCoreFunction(functionName);
    if (Array.isArray(result)) {
      return result.slice();
    }
  } catch (coreError) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn("Failed to resolve ".concat(functionName), coreError);
      } catch (logError) {
        void logError;
      }
    }
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn("Failed to resolve ".concat(functionName), coreError);
    }
  }
  return fallback;
}
function readGlobalArraySnapshot(key) {
  var scope = getGlobalScope();
  if (!scope || !key) {
    return [];
  }
  var value = scope[key];
  return Array.isArray(value) ? value.slice() : [];
}
function publishGlobalArraySnapshot(key, values) {
  var scope = getGlobalScope();
  if (!scope || !key) {
    return;
  }
  if (!Array.isArray(values)) {
    delete scope[key];
    return;
  }
  try {
    scope[key] = values.slice();
  } catch (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn("Failed to persist ".concat(key, " options on the global scope"), error);
    }
  }
}
function syncCoreOptionsArray(globalKey, functionName) {
  var existingValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var aggregated = [];
  var seen = new Set();
  var addValues = function addValues(values) {
    if (!Array.isArray(values)) {
      return;
    }
    for (var index = 0; index < values.length; index += 1) {
      var option = values[index];
      if (typeof option !== 'string') {
        continue;
      }
      if (!seen.has(option)) {
        seen.add(option);
        aggregated.push(option);
      }
    }
  };
  addValues(existingValues);
  addValues(readGlobalArraySnapshot(globalKey));
  var resolved = resolveCoreOptionsArray(functionName, aggregated);
  var finalValues = Array.isArray(resolved) ? resolved : aggregated;
  publishGlobalArraySnapshot(globalKey, finalValues);
  return finalValues;
}
var initialViewfinderTypeOptions = typeof viewfinderTypeOptions !== 'undefined' && Array.isArray(viewfinderTypeOptions) ? viewfinderTypeOptions : [];
viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', initialViewfinderTypeOptions);
var initialViewfinderConnectorOptions = typeof viewfinderConnectorOptions !== 'undefined' && Array.isArray(viewfinderConnectorOptions) ? viewfinderConnectorOptions : [];
viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', initialViewfinderConnectorOptions);
function readCoreDeviceSelectionHelper() {
  if (typeof globalThis !== 'undefined' && typeof globalThis.hasAnyDeviceSelection === 'function') {
    return globalThis.hasAnyDeviceSelection;
  }
  if (typeof window !== 'undefined' && typeof window.hasAnyDeviceSelection === 'function') {
    return window.hasAnyDeviceSelection;
  }
  if (typeof self !== 'undefined' && typeof self.hasAnyDeviceSelection === 'function') {
    return self.hasAnyDeviceSelection;
  }
  if (typeof global !== 'undefined' && typeof global.hasAnyDeviceSelection === 'function') {
    return global.hasAnyDeviceSelection;
  }
  return null;
}
function hasAnyDeviceSelectionSafe(state) {
  var coreHelper = readCoreDeviceSelectionHelper();
  if (coreHelper) {
    try {
      return coreHelper(state);
    } catch (error) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        var statePreview = state && _typeof(state) === 'object' ? Object.keys(state).slice(0, 10) : null;
        try {
          eventsLogger.warn('Failed to evaluate device selections via core helper', error, {
            statePreview: statePreview
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to evaluate device selections via core helper', error);
      }
    }
  }
  if (!state || _typeof(state) !== 'object') {
    return false;
  }
  var _isMeaningfulSelection = function isMeaningfulSelection(value) {
    if (Array.isArray(value)) {
      return value.some(function (item) {
        return _isMeaningfulSelection(item);
      });
    }
    if (value == null) {
      return false;
    }
    var normalized = typeof value === 'string' ? value.trim() : value;
    if (!normalized) {
      return false;
    }
    if (typeof normalized === 'string') {
      var lower = normalized.toLowerCase();
      if (lower === 'none') {
        return false;
      }
      if (lower === '--' || lower === '—' || lower === 'n/a' || lower === 'tbd' || lower === 'pending' || lower.startsWith('-- ') || lower.startsWith('— ') || lower.startsWith('select ') || lower.startsWith('choose ') || lower.startsWith('pick ') || lower.startsWith('add ')) {
        return false;
      }
    }
    return true;
  };
  var primarySelections = [state.camera, state.monitor, state.video, state.cage, state.batteryPlate, state.battery, state.batteryHotswap];
  if (primarySelections.some(function (value) {
    return _isMeaningfulSelection(value);
  })) {
    return true;
  }
  if (_isMeaningfulSelection(state.motors)) {
    return true;
  }
  if (_isMeaningfulSelection(state.controllers)) {
    return true;
  }
  if (_isMeaningfulSelection(state.distance)) {
    return true;
  }
  return false;
}
function getEventsCoreValue(functionName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : '';
  var value = callEventsCoreFunction(functionName, [], {
    defaultValue: defaultValue
  });
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return defaultValue;
  }
  try {
    return String(value);
  } catch (coerceError) {
    void coerceError;
    return defaultValue;
  }
}
function storeLoadedSetupStateSafe(state) {
  callEventsCoreFunction('storeLoadedSetupState', [state], {
    defaultValue: undefined
  });
}
function resolveCineUi() {
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var _scope = scopes[index];
    if (!_scope || _typeof(_scope) !== 'object') {
      continue;
    }
    try {
      if (_scope.cineUi && _typeof(_scope.cineUi) === 'object') {
        return _scope.cineUi;
      }
    } catch (error) {
      void error;
    }
  }
  return null;
}
function getSetupSelectElement() {
  if (typeof setupSelect !== 'undefined' && setupSelect) {
    return setupSelect;
  }
  if (typeof document !== 'undefined' && document) {
    var element = document.getElementById('setupSelect');
    if (element) {
      return element;
    }
  }
  return null;
}
function addSafeEventListener(target, type, handler, options) {
  if (!target || typeof target.addEventListener !== 'function') return;
  target.addEventListener(type, handler, options);
}
var eventsCineUiRegistered = false;
function enqueueCineUiRegistration(callback) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || typeof callback !== 'function') {
    return;
  }
  try {
    var existing = scope.cineUi && _typeof(scope.cineUi) === 'object' ? scope.cineUi : null;
    if (existing) {
      callback(existing);
      return;
    }
  } catch (callbackError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cineUi registration callback failed', callbackError);
    }
    return;
  }
  var key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }
  scope[key].push(callback);
}
enqueueCineUiRegistration(registerEventsCineUiInternal);
addSafeEventListener(languageSelect, "change", function (event) {
  setLanguage(event.target.value);
  if (typeof populateUserButtonDropdowns === 'function') {
    try {
      populateUserButtonDropdowns();
    } catch (userButtonError) {
      console.warn('Failed to refresh user button selectors after manual language change', userButtonError);
    }
  }
});
addSafeEventListener(skipLink, "click", function () {
  var main = document.getElementById("mainContent");
  if (main) main.focus();
});
function handleSaveSetupClick() {
  var typedName = setupNameInput.value.trim();
  if (!typedName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var hasDeviceSelection = hasAnyDeviceSelectionSafe(currentSetup);
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var setupSelectElement = getSetupSelectElement();
  var selectedName = setupSelectElement && typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  var renamingExisting = Boolean(selectedName && typedName && selectedName !== typedName);
  var renamingAutoBackup = renamingExisting && typeof selectedName === 'string' && selectedName.startsWith('auto-backup-');
  var setups = getSetups();
  var finalName = typedName;
  var storedProjectSnapshot = null;
  if (renamingExisting) {
    if (typeof loadProject === 'function') {
      try {
        storedProjectSnapshot = loadProject(selectedName);
      } catch (error) {
        console.warn('Failed to load project data while renaming setup', error);
      }
    }
    if (typeof renameSetup === 'function') {
      try {
        var renamed = renameSetup(selectedName, typedName);
        if (typeof renamed === 'string' && renamed) {
          finalName = renamed;
        }
      } catch (error) {
        console.warn('Failed to rename setup in storage', error);
      }
      setups = getSetups();
    } else if (Object.prototype.hasOwnProperty.call(setups, selectedName)) {
      setups[typedName] = setups[selectedName];
      delete setups[selectedName];
      finalName = typedName;
    }
  }
  var finalIsAutoBackup = typeof finalName === 'string' && finalName.startsWith('auto-backup-');
  if (renamingAutoBackup && finalIsAutoBackup) {
    markAutoBackupDataAsRenamed(currentSetup);
  }
  setups[finalName] = currentSetup;
  storeSetups(setups);
  if (renamingExisting && storedProjectSnapshot && typeof saveProject === 'function') {
    try {
      if (renamingAutoBackup && finalIsAutoBackup) {
        markAutoBackupDataAsRenamed(storedProjectSnapshot);
      }
      saveProject(finalName, storedProjectSnapshot, {
        skipOverwriteBackup: true
      });
    } catch (error) {
      console.warn('Failed to preserve project data during setup rename', error);
    }
  }
  populateSetupSelect();
  setupNameInput.value = finalName;
  if (setupSelectElement) {
    setupSelectElement.value = finalName;
  }
  lastSetupName = finalName;
  saveCurrentSession();
  storeLoadedSetupStateSafe(getCurrentSetupState());
  checkSetupChanged();
  saveCurrentGearList();
  if (renamingExisting && selectedName && selectedName !== finalName) {
    if (typeof deleteProject === 'function') {
      try {
        deleteProject(selectedName);
      } catch (error) {
        console.warn('Failed to remove old project entry during setup rename', error);
      }
    } else if (typeof saveProject === 'function') {
      try {
        saveProject(selectedName, {
          projectInfo: null,
          gearList: ''
        }, {
          skipOverwriteBackup: true
        });
      } catch (error) {
        console.warn('Failed to clear legacy project entry during setup rename', error);
      }
    }
  }
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  var saveAlertTemplate = hasDeviceSelection ? langTexts.alertSetupSaved || fallbackTexts.alertSetupSaved : langTexts.alertSetupSavedNoDevices || fallbackTexts.alertSetupSavedNoDevices || langTexts.alertSetupSaved || fallbackTexts.alertSetupSaved;
  if (typeof saveAlertTemplate === 'string' && saveAlertTemplate) {
    alert(saveAlertTemplate.replace("{name}", finalName));
  }
}
addSafeEventListener(saveSetupBtn, "click", handleSaveSetupClick);
function handleDeleteSetupClick() {
  var setupSelectElement = getSetupSelectElement();
  var setupName = setupSelectElement && typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) && confirm(texts[currentLang].confirmDeleteSetupAgain)) {
    var backupName = ensureAutoBackupBeforeDeletion('delete setup');
    if (!backupName) {
      return;
    }
    var setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    if (typeof deleteProject === 'function') {
      deleteProject(setupName);
    }
    populateSetupSelect();
    setupNameInput.value = "";
    var selectionResetHandled = false;
    if (setupSelectElement && typeof setupSelectElement.dispatchEvent === 'function') {
      lastSetupName = '';
      setupSelectElement.value = "";
      setupSelectElement.dispatchEvent(new Event('change'));
      selectionResetHandled = true;
    }
    if (!selectionResetHandled) {
      if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
      }
      if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
      }
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      storeLoadedSetupStateSafe(null);
      updateBatteryPlateVisibility();
      updateBatteryOptions();
      clearProjectAutoGearRules();
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
      [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(function (sel) {
        var noneOption = Array.from(sel.options).find(function (opt) {
          return opt.value === "None";
        });
        if (noneOption) {
          sel.value = "None";
        } else {
          sel.selectedIndex = 0;
        }
      });
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions('None');
      }
      var sbSel = getSliderBowlSelect();
      if (sbSel) sbSel.value = '';
      motorSelects.forEach(function (sel) {
        if (sel.options.length) sel.value = "None";
      });
      controllerSelects.forEach(function (sel) {
        if (sel.options.length) sel.value = "None";
      });
      updateCalculations();
    }
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
}
addSafeEventListener(deleteSetupBtn, "click", handleDeleteSetupClick);
function resetSetupStateToDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var suspendable = typeof suspendProjectPersistence === 'function' && typeof resumeProjectPersistence === 'function';
  if (suspendable) {
    try {
      suspendProjectPersistence();
    } catch (error) {
      console.warn('Failed to suspend project persistence during setup reset', error);
    }
  }
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var preserveSetupNameInput = Boolean(config.preserveSetupNameInput);
  try {
    if (!preserveSetupNameInput && setupNameInput) {
      setupNameInput.value = "";
    }
    var resetSelectToDefault = function resetSelectToDefault(select) {
      if (!select || _typeof(select) !== 'object') return;
      var isCameraSelect = select === cameraSelect;
      var noneOption = Array.from(select.options || []).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        select.value = "None";
      } else if (select.options && select.options.length) {
        select.selectedIndex = 0;
      } else {
        select.value = "";
      }
      if (isCameraSelect) {
        callEventsCoreFunction('updateRecordingMediaOptions');
      }
    };
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(resetSelectToDefault);
    if (typeof updateCageSelectOptions === 'function') {
      try {
        updateCageSelectOptions('None');
      } catch (error) {
        console.warn('Failed to reset cage options while preparing setup switch', error);
      }
    }
    var sliderBowlSelect = typeof getSliderBowlSelect === 'function' ? getSliderBowlSelect() : null;
    if (sliderBowlSelect) {
      sliderBowlSelect.value = '';
    }
    if (Array.isArray(motorSelects)) {
      motorSelects.forEach(resetSelectToDefault);
    }
    if (Array.isArray(controllerSelects)) {
      controllerSelects.forEach(resetSelectToDefault);
    }
    if (typeof updateBatteryPlateVisibility === 'function') {
      try {
        updateBatteryPlateVisibility();
      } catch (error) {
        console.warn('Failed to reset battery plate visibility while preparing setup switch', error);
      }
    }
    if (typeof updateBatteryOptions === 'function') {
      try {
        updateBatteryOptions();
      } catch (error) {
        console.warn('Failed to reset battery options while preparing setup switch', error);
      }
    }
    if (typeof displayGearAndRequirements === 'function') {
      try {
        displayGearAndRequirements('');
      } catch (error) {
        console.warn('Failed to reset gear and requirements display while preparing setup switch', error);
      }
    }
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
    currentProjectInfo = null;
    if (projectForm) {
      try {
        populateProjectForm({});
      } catch (error) {
        console.warn('Failed to reset project form while preparing setup switch', error);
      }
    }
    if (typeof clearProjectAutoGearRules === 'function') {
      try {
        clearProjectAutoGearRules();
      } catch (error) {
        console.warn('Failed to clear project auto gear rules while preparing setup switch', error);
      }
    }
    if (typeof setManualDiagramPositions === 'function') {
      try {
        setManualDiagramPositions({}, {
          render: false
        });
      } catch (error) {
        console.warn('Failed to reset manual diagram positions while preparing setup switch', error);
      }
    }
    try {
      storeLoadedSetupStateSafe(null);
    } catch (error) {
      console.warn('Failed to reset stored setup state while preparing setup switch', error);
    }
    if (typeof globalThis !== 'undefined') {
      globalThis.__cineLastGearListHtml = '';
    }
  } finally {
    if (suspendable) {
      try {
        resumeProjectPersistence();
      } catch (error) {
        console.warn('Failed to resume project persistence after setup reset', error);
      }
    }
  }
}
function finalizeSetupSelection(nextSetupName) {
  if (typeof renderAutoGearRulesList === 'function') {
    try {
      renderAutoGearRulesList();
    } catch (error) {
      console.warn('Failed to render auto gear rules list after setup switch', error);
    }
  }
  if (typeof updateAutoGearCatalogOptions === 'function') {
    try {
      updateAutoGearCatalogOptions();
    } catch (error) {
      console.warn('Failed to update auto gear catalog options after setup switch', error);
    }
  }
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  if (typeof updateCalculations === 'function') {
    try {
      updateCalculations();
    } catch (error) {
      console.warn('Failed to update calculations after setup switch', error);
    }
  }
  if (typeof checkSetupChanged === 'function') {
    try {
      checkSetupChanged();
    } catch (error) {
      console.warn('Failed to evaluate setup changes after setup switch', error);
    }
  }
  if (typeof setActiveProjectCompressionHold === 'function') {
    setActiveProjectCompressionHold(nextSetupName);
  }
  lastSetupName = nextSetupName;
}
var setupSelectTarget = getSetupSelectElement();
addSafeEventListener(setupSelectTarget, "change", function (event) {
  var setupName = event.target.value;
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
  var previousKey = (lastSetupName && typeof lastSetupName === 'string' ? lastSetupName : '') || typedName || '';
  if (typeof setActiveProjectCompressionHold === 'function') {
    setActiveProjectCompressionHold(previousKey);
  }
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var normalizedLastSelection = normalizeProjectName(lastSetupName);
  var normalizedTargetSelection = normalizeProjectName(setupName);
  var autoSaveFlushed = false;
  if (typeof scheduleProjectAutoSave === 'function') {
    try {
      var normalizeForOverride = typeof normalizeSetupName === 'function' ? normalizeSetupName : function (value) {
        return typeof value === 'string' ? value.trim() : '';
      };
      var previousSelection = normalizeForOverride(typeof lastSetupName === 'string' ? lastSetupName : '');
      var storageKeyOverride = normalizeForOverride(previousKey);
      var overrides = {
        setupNameState: {
          typedName: typedName,
          selectedName: previousSelection,
          storageKey: storageKeyOverride,
          renameInProgress: Boolean(previousSelection && typedName && typedName !== previousSelection)
        }
      };
      scheduleProjectAutoSave({
        immediate: true,
        overrides: overrides
      });
      autoSaveFlushed = true;
    } catch (error) {
      console.warn('Failed to flush project autosave before switching setups', error);
    }
  }
  if (!autoSaveFlushed) {
    try {
      if (typeof saveCurrentSession === 'function') {
        saveCurrentSession();
      }
      if (typeof saveCurrentGearList === 'function') {
        saveCurrentGearList();
      }
    } catch (error) {
      console.warn('Failed to persist project state before switching setups', error);
    }
  }
  if (typeof saveProject === 'function') {
    var info = projectForm ? collectProjectFormData() : {};
    if (info) {
      info.sliderBowl = getEventsCoreValue('getSliderBowlValue');
      info.easyrig = getEventsCoreValue('getEasyrigValue');
    }
    var previousProjectInfo = deriveProjectInfo(info);
    currentProjectInfo = previousProjectInfo;
    var _normalizeForOverride = typeof normalizeSetupName === 'function' ? normalizeSetupName : function (value) {
      return typeof value === 'string' ? value.trim() : '';
    };
    var normalizedPreviousKey = _normalizeForOverride(previousKey);
    var normalizedTypedName = _normalizeForOverride(typedName);
    var renameInProgressForPrevious = Boolean(normalizedPreviousKey && normalizedTypedName && normalizedTypedName !== normalizedPreviousKey);
    var projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function' ? createProjectInfoSnapshotForStorage(previousProjectInfo, {
      projectNameOverride: renameInProgressForPrevious ? normalizedPreviousKey : undefined
    }) : previousProjectInfo;
    var previousPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
    var previousPayload = {
      projectInfo: projectInfoForStorage,
      gearList: getCurrentGearListHtml()
    };
    if (previousPowerSelection) {
      previousPayload.powerSelection = previousPowerSelection;
    }
    if (typeof getDiagramManualPositions === 'function') {
      var diagramPositions = getDiagramManualPositions();
      if (diagramPositions && Object.keys(diagramPositions).length) {
        previousPayload.diagramPositions = diagramPositions;
      }
    }
    var previousRules = getProjectScopedAutoGearRules();
    if (previousRules && previousRules.length) {
      previousPayload.autoGearRules = previousRules;
    }
    saveProject(previousKey, previousPayload, {
      skipOverwriteBackup: true
    });
  }
  if (typeof autoBackup === 'function' && normalizedTargetSelection !== normalizedLastSelection) {
    try {
      autoBackup({
        suppressSuccess: true,
        projectNameOverride: normalizeProjectName(previousKey),
        triggerAutoSaveNotification: true,
        reason: 'project-switch'
      });
    } catch (error) {
      console.warn('Failed to auto backup project before loading a different setup', error);
    }
  }
  resetSetupStateToDefaults();
  if (setupName === "") {
    finalizeSetupSelection(setupName);
    return;
  }
  {
    var setups = getSetups();
    var setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera;
      callEventsCoreFunction('updateRecordingMediaOptions');
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      applyBatteryPlateSelectionFromBattery(setup.battery, batteryPlateSelect.value);
      monitorSelect.value = setup.monitor;
      videoSelect.value = setup.video;
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions(setup.cage);
      } else if (cageSelect) {
        cageSelect.value = setup.cage || cageSelect.value;
      }
      (setup.motors || []).forEach(function (val, i) {
        if (motorSelects[i]) motorSelects[i].value = val;
      });
      (setup.controllers || []).forEach(function (val, i) {
        if (controllerSelects[i]) controllerSelects[i].value = val;
      });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      applyBatteryPlateSelectionFromBattery(setup.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
      hotswapSelect.value = setup.batteryHotswap || hotswapSelect.value;
      setSliderBowlValue(setup.sliderBowl || '');
      setEasyrigValue(setup.easyrig || '');
      var storedPowerApplied = false;
      if (setup.powerSelection && typeof applyStoredPowerSelection === 'function') {
        storedPowerApplied = applyStoredPowerSelection(setup.powerSelection, {
          preferExisting: false
        });
      }
      var storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, {
          preferExisting: false
        });
      }
      updateBatteryOptions();
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, {
          preferExisting: false
        });
        if (storedPowerApplied) {
          updateBatteryOptions();
        }
      }
      var storedHtml = typeof setup.gearList === 'string' && setup.gearList ? setup.gearList : typeof (storedProject === null || storedProject === void 0 ? void 0 : storedProject.gearList) === 'string' ? storedProject.gearList : '';
      currentProjectInfo = setup.projectInfo || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.projectInfo) || null;
      var regenerateGearList = function regenerateGearList(info) {
        return callEventsCoreFunction('generateGearListHtml', [info || {}], {
          defaultValue: ''
        }) || '';
      };
      var html = storedHtml;
      if (!html) {
        html = regenerateGearList(currentProjectInfo || {});
      }
      if (html && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = html;
      }
      if (typeof setManualDiagramPositions === 'function') {
        var _diagramPositions = {};
        if (typeof normalizeDiagramPositionsInput === 'function') {
          _diagramPositions = normalizeDiagramPositionsInput(storedProject === null || storedProject === void 0 ? void 0 : storedProject.diagramPositions);
          var setupDiagramPositions = normalizeDiagramPositionsInput(setup.diagramPositions);
          if (Object.keys(setupDiagramPositions).length) {
            _diagramPositions = _objectSpread(_objectSpread({}, _diagramPositions), setupDiagramPositions);
          }
        }
        setManualDiagramPositions(_diagramPositions, {
          render: false
        });
      }
      var projectRulesSource = Array.isArray(setup.autoGearRules) && setup.autoGearRules.length ? setup.autoGearRules : Array.isArray(storedProject === null || storedProject === void 0 ? void 0 : storedProject.autoGearRules) && storedProject.autoGearRules.length ? storedProject.autoGearRules : null;
      if (projectRulesSource) {
        useProjectAutoGearRules(projectRulesSource);
      } else {
        clearProjectAutoGearRules();
      }
      if (gearListOutput) {
        displayGearAndRequirements(html);
        populateProjectForm(currentProjectInfo || {});
        if (html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
        if (typeof saveProject === 'function') {
          var payload = {
            projectInfo: currentProjectInfo,
            gearListAndProjectRequirementsGenerated: Boolean(html)
          };
          var currentPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
          if (currentPowerSelection) {
            payload.powerSelection = currentPowerSelection;
          }
          if (typeof getDiagramManualPositions === 'function') {
            var _diagramPositions2 = getDiagramManualPositions();
            if (_diagramPositions2 && Object.keys(_diagramPositions2).length) {
              payload.diagramPositions = _diagramPositions2;
            }
          }
          var activeRules = getProjectScopedAutoGearRules();
          if (activeRules && activeRules.length) {
            payload.autoGearRules = activeRules;
          }
          if (setup.gearSelectors && Object.keys(setup.gearSelectors).length) {
            payload.gearSelectors = setup.gearSelectors;
          } else if (storedProject !== null && storedProject !== void 0 && storedProject.gearSelectors && Object.keys(storedProject.gearSelectors).length) {
            payload.gearSelectors = storedProject.gearSelectors;
          }
          saveProject(setupName, payload, {
            skipOverwriteBackup: true
          });
        }
      }
    } else {
      var _storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (_storedProject && typeof applyStoredPowerSelection === 'function' && _storedProject.powerSelection) {
        var applied = applyStoredPowerSelection(_storedProject.powerSelection, {
          preferExisting: false
        });
        if (applied) {
          updateBatteryOptions();
        }
      } else {
        updateBatteryOptions();
      }
      currentProjectInfo = (_storedProject === null || _storedProject === void 0 ? void 0 : _storedProject.projectInfo) || null;
      if (projectForm) populateProjectForm(currentProjectInfo || {});
      if (gearListOutput) {
        var _regenerateGearList = function _regenerateGearList(info) {
          return callEventsCoreFunction('generateGearListHtml', [info || {}], {
            defaultValue: ''
          }) || '';
        };
        var _storedHtml = typeof (_storedProject === null || _storedProject === void 0 ? void 0 : _storedProject.gearList) === 'string' ? _storedProject.gearList : '';
        var _html = _storedHtml || _regenerateGearList(currentProjectInfo || {});
        displayGearAndRequirements(_html);
        if (_html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
      } else {
        displayGearAndRequirements('');
      }
      clearProjectAutoGearRules();
      if (typeof setManualDiagramPositions === 'function') {
        var normalizedDiagram = _storedProject !== null && _storedProject !== void 0 && _storedProject.diagramPositions && typeof normalizeDiagramPositionsInput === 'function' ? normalizeDiagramPositionsInput(_storedProject.diagramPositions) : {};
        setManualDiagramPositions(normalizedDiagram || {}, {
          render: false
        });
      }
    }
    storeLoadedSetupStateSafe(getCurrentSetupState());
  }
  finalizeSetupSelection(setupName);
});
function populateSetupSelect() {
  var setupsProvider = typeof getSetups === 'function' ? getSetups : null;
  var setupSelectTarget = getSetupSelectElement();
  if (!setupSelectTarget) {
    console.warn('populateSetupSelect: setup select element unavailable, aborting populate');
    return;
  }
  var textBundle = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[currentLang] || texts.en || {} : {};
  var newSetupOptionLabel = typeof textBundle.newSetupOption === 'string' && textBundle.newSetupOption.trim() ? textBundle.newSetupOption : 'New setup';
  if (!setupsProvider) {
    console.warn('populateSetupSelect: getSetups is unavailable, using empty setup list');
  }
  var setups = setupsProvider ? setupsProvider() || {} : {};
  setupSelectTarget.innerHTML = "<option value=\"\">".concat(newSetupOptionLabel, "</option>");
  var includeAutoBackups = false;
  if (typeof showAutoBackups === 'boolean') {
    includeAutoBackups = showAutoBackups;
  } else if (typeof localStorage !== 'undefined') {
    try {
      includeAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
    } catch (error) {
      console.warn('Could not read auto backup visibility preference', error);
    }
  }
  if (includeAutoBackups && typeof ensureAutoBackupsFromProjects === 'function') {
    try {
      ensureAutoBackupsFromProjects();
    } catch (error) {
      console.warn('Failed to prepare auto backups before populating selector', error);
    }
  }
  var names = Object.keys(setups).filter(function (name) {
    return includeAutoBackups || !name.startsWith('auto-backup-');
  }).sort(function (a, b) {
    var autoA = a.startsWith('auto-backup-');
    var autoB = b.startsWith('auto-backup-');
    if (autoA !== autoB) return autoA ? 1 : -1;
    return localeSort(a, b);
  });
  var _iterator = _createForOfIteratorHelper(names),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      setupSelectTarget.appendChild(opt);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
populateSetupSelect();
checkSetupChanged();
function notifyAutoSaveFromBackup(message, backupName) {
  if (typeof message !== 'string') {
    return;
  }
  var trimmed = message.trim();
  if (!trimmed) {
    return;
  }
  if (typeof showNotification === 'function') {
    try {
      showNotification('success', trimmed);
    } catch (notifyError) {
      console.warn('Failed to display auto save notification after auto backup', notifyError);
    }
  }
  if (typeof document !== 'undefined' && typeof CustomEvent === 'function' && document && typeof document.dispatchEvent === 'function') {
    try {
      document.dispatchEvent(new CustomEvent('cine:auto-save-notification', {
        detail: {
          message: trimmed,
          source: 'auto-backup',
          backupName: backupName || null,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (eventError) {
      console.warn('Failed to dispatch auto save notification event after auto backup', eventError);
    }
  }
}
var AUTO_BACKUP_MAX_DELTA_SEQUENCE = 30;
var lastAutoBackupSignature = null;
var lastAutoBackupName = null;
var lastAutoBackupCreatedAtIso = null;
function createStableValueSignature(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    var signature = '[';
    for (var index = 0; index < value.length; index += 1) {
      if (index > 0) {
        signature += ',';
      }
      signature += createStableValueSignature(value[index]);
    }
    signature += ']';
    return signature;
  }
  if (value instanceof Date) {
    var timestamp = value.getTime();
    if (Number.isNaN(timestamp)) {
      return 'date:invalid';
    }
    return "date:".concat(timestamp);
  }
  var valueType = _typeof(value);
  if (valueType === 'number') {
    if (Number.isNaN(value)) {
      return 'number:NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'number:Infinity' : 'number:-Infinity';
    }
    return "number:".concat(value);
  }
  if (valueType === 'bigint') {
    return "bigint:".concat(value.toString());
  }
  if (valueType === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }
  if (valueType === 'string') {
    return "string:".concat(value);
  }
  if (valueType === 'symbol') {
    return "symbol:".concat(String(value));
  }
  if (valueType === 'function') {
    return "function:".concat(value.name || 'anonymous');
  }
  if (valueType === 'object') {
    var keys = Object.keys(value).sort();
    var _signature = '{';
    for (var _index = 0; _index < keys.length; _index += 1) {
      var key = keys[_index];
      if (_index > 0) {
        _signature += ',';
      }
      _signature += "".concat(JSON.stringify(key), ":").concat(createStableValueSignature(value[key]));
    }
    _signature += '}';
    return _signature;
  }
  return "".concat(valueType, ":").concat(String(value));
}
function computeAutoBackupStateSignature(setupState, gearSelectors, gearListGenerated) {
  return createStableValueSignature({
    setup: setupState || null,
    gearSelectors: gearSelectors || null,
    gearListGenerated: Boolean(gearListGenerated)
  });
}
function hasMeaningfulAutoBackupContent(setupState, gearSelectors, gearListGenerated) {
  var hasDeviceSelection = hasAnyDeviceSelectionSafe(setupState);
  var hasProjectInfo = Boolean(setupState && _typeof(setupState) === 'object' && setupState.projectInfo);
  var hasAutoGearRules = Array.isArray(setupState && setupState.autoGearRules) && setupState.autoGearRules.length > 0;
  var hasDiagramPositions = Boolean(setupState && setupState.diagramPositions && _typeof(setupState.diagramPositions) === 'object' && Object.keys(setupState.diagramPositions).length > 0);
  var hasGearSelectors = Boolean(gearSelectors && _typeof(gearSelectors) === 'object' && Object.keys(gearSelectors).length > 0);
  var hasPowerSelection = Boolean(setupState && setupState.powerSelection && _typeof(setupState.powerSelection) === 'object' && Object.keys(setupState.powerSelection).length > 0);
  var hasGeneratedGear = Boolean(gearListGenerated);
  return hasDeviceSelection || hasProjectInfo || hasAutoGearRules || hasDiagramPositions || hasGearSelectors || hasPowerSelection || hasGeneratedGear;
}
function getSortedAutoBackupNames(setups) {
  if (!setups || _typeof(setups) !== 'object') {
    return [];
  }
  return Object.keys(setups).filter(function (name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  }).sort();
}
function resolveLatestAutoBackupEntry(setups) {
  var names = getSortedAutoBackupNames(setups);
  if (!names.length) {
    return {
      name: null,
      entry: null
    };
  }
  var latestName = names[names.length - 1];
  var latestEntry = setups && _typeof(setups) === 'object' ? setups[latestName] : null;
  return {
    name: latestName,
    entry: latestEntry
  };
}
function computeStoredAutoBackupSignature(name, entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return createStableValueSignature(null);
  }
  var gearSelectors = null;
  if (entry.gearSelectors && _typeof(entry.gearSelectors) === 'object') {
    gearSelectors = entry.gearSelectors;
  }
  var gearListGenerated = false;
  if (typeof loadProject === 'function' && name) {
    try {
      var storedProject = loadProject(name);
      if (storedProject && _typeof(storedProject) === 'object') {
        if (!gearSelectors && storedProject.gearSelectors && _typeof(storedProject.gearSelectors) === 'object') {
          gearSelectors = storedProject.gearSelectors;
        }
        if (typeof storedProject.gearListAndProjectRequirementsGenerated === 'boolean') {
          gearListGenerated = storedProject.gearListAndProjectRequirementsGenerated;
        }
      }
    } catch (error) {
      console.warn('Failed to inspect stored project payload for auto backup signature', error);
    }
  }
  return computeAutoBackupStateSignature(entry, gearSelectors, gearListGenerated);
}
function ensureLastAutoBackupSignatureInitialized(setups) {
  if (lastAutoBackupSignature || !setups || _typeof(setups) !== 'object') {
    return;
  }
  var _resolveLatestAutoBac = resolveLatestAutoBackupEntry(setups),
    name = _resolveLatestAutoBac.name,
    entry = _resolveLatestAutoBac.entry;
  if (!name || !entry || _typeof(entry) !== 'object') {
    return;
  }
  try {
    lastAutoBackupSignature = computeStoredAutoBackupSignature(name, entry);
    lastAutoBackupName = name;
    var metadata = readAutoBackupMetadata(entry);
    if (metadata && typeof metadata.createdAt === 'string') {
      lastAutoBackupCreatedAtIso = metadata.createdAt;
      var parsed = Date.parse(metadata.createdAt);
      if (!Number.isNaN(parsed)) {
        lastAutoBackupCompletedAtMs = parsed;
      }
    }
  } catch (error) {
    lastAutoBackupSignature = null;
    console.warn('Failed to prime automatic backup signature cache', error);
  }
}
function readAutoBackupMetadata(entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return null;
  }
  var metadata = entry.__cineAutoBackupMetadata;
  if (!metadata || _typeof(metadata) !== 'object') {
    return null;
  }
  return metadata;
}
function attachAutoBackupMetadata(target, metadata) {
  if (!target || _typeof(target) !== 'object') {
    return;
  }
  var snapshotMetadata = metadata && _typeof(metadata) === 'object' ? {
    version: typeof metadata.version === 'number' ? metadata.version : 1,
    snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
    base: typeof metadata.base === 'string' ? metadata.base : null,
    sequence: typeof metadata.sequence === 'number' ? metadata.sequence : 0,
    createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
    changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
    removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : []
  } : null;
  try {
    Object.defineProperty(target, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: snapshotMetadata
    });
  } catch (error) {
    try {
      target.__cineAutoBackupMetadata = snapshotMetadata;
    } catch (assignmentError) {
      void assignmentError;
    }
  }
}
function determineNextAutoBackupPlan(setups) {
  if (!setups || _typeof(setups) !== 'object') {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var autoBackupNames = getSortedAutoBackupNames(setups);
  if (!autoBackupNames.length) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var latestName = autoBackupNames[autoBackupNames.length - 1];
  var latestEntry = setups[latestName];
  var latestMetadata = readAutoBackupMetadata(latestEntry);
  if (!latestEntry || !latestMetadata) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  var latestSequence = typeof latestMetadata.sequence === 'number' ? latestMetadata.sequence : 0;
  if (latestSequence >= AUTO_BACKUP_MAX_DELTA_SEQUENCE) {
    return {
      snapshotType: 'full',
      base: null,
      sequence: 0
    };
  }
  return {
    snapshotType: 'delta',
    base: latestName,
    sequence: latestSequence + 1
  };
}
function autoBackup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var setupSelectElement = getSetupSelectElement();
  if (!setupSelectElement) return null;
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var suppressSuccess = Boolean(config.suppressSuccess);
  var suppressError = Boolean(config.suppressError);
  var force = config.force === true;
  var reason = typeof config.reason === 'string' && config.reason ? config.reason : 'unspecified';
  var successMessage = typeof config.successMessage === 'string' && config.successMessage ? config.successMessage : 'Auto backup saved';
  var errorMessage = typeof config.errorMessage === 'string' && config.errorMessage ? config.errorMessage : 'Auto backup failed';
  var triggerAutoSaveNotification = Boolean(config.triggerAutoSaveNotification);
  var autoSaveNotificationMessage = typeof config.autoSaveNotificationMessage === 'string' && config.autoSaveNotificationMessage.trim() ? config.autoSaveNotificationMessage.trim() : successMessage;
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var hasProjectNameOverride = Object.prototype.hasOwnProperty.call(config, 'projectNameOverride');
  var overrideName = hasProjectNameOverride ? normalizeProjectName(config.projectNameOverride) : null;
  var selectedName = typeof setupSelectElement.value === 'string' ? setupSelectElement.value : '';
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '';
  var normalizedSelectedName = normalizeProjectName(selectedName);
  var normalizedTypedName = normalizeProjectName(typedName);
  var isAutoBackupName = function isAutoBackupName(name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  };
  var nowMs = Date.now();
  var lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
  var elapsedSinceLastAutoBackupMs = nowMs - lastCompletedMs;
  var enoughTimeElapsedSinceLastBackup = elapsedSinceLastAutoBackupMs >= AUTO_BACKUP_INTERVAL_MS;
  var enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;
  var enforceCadence = !force && !AUTO_BACKUP_CADENCE_EXEMPT_REASONS.has(reason);
  if (enforceCadence && !enoughTimeElapsedSinceLastBackup && !enoughChangesAccumulated) {
    var remainingIntervalMs = Math.max(0, AUTO_BACKUP_INTERVAL_MS - elapsedSinceLastAutoBackupMs);
    var skipped = {
      status: 'skipped',
      reason: 'cadence',
      context: reason,
      elapsedSinceLastAutoBackupMs: elapsedSinceLastAutoBackupMs,
      changesSinceSnapshot: autoBackupChangesSinceSnapshot,
      requiredIntervalMs: AUTO_BACKUP_INTERVAL_MS,
      requiredChangeThreshold: AUTO_BACKUP_CHANGE_THRESHOLD,
      remainingIntervalMs: remainingIntervalMs,
      remainingChanges: Math.max(0, AUTO_BACKUP_CHANGE_THRESHOLD - autoBackupChangesSinceSnapshot)
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup because cadence requirements are not met.', skipped);
    }
    recordAutoBackupRun(skipped);
    return skipped;
  }
  if (!force && !isAutoBackupReasonAllowed(reason)) {
    var _skipped = {
      status: 'skipped',
      reason: 'disallowed',
      context: reason || null
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup run because the trigger is not permitted.', {
        trigger: reason
      });
    }
    recordAutoBackupRun(_skipped);
    return _skipped;
  }
  if (!force && AUTO_BACKUP_RATE_LIMITED_REASONS.has(reason)) {
    var _nowMs = Date.now();
    var _lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
    var elapsedMs = _nowMs - _lastCompletedMs;
    var enoughTimeElapsed = elapsedMs >= AUTO_BACKUP_INTERVAL_MS;
    var _enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;
    if (!enoughTimeElapsed && !_enoughChangesAccumulated) {
      var _skipped2 = {
        status: 'skipped',
        reason: 'rate-limited',
        context: reason
      };
      recordAutoBackupRun(_skipped2);
      return _skipped2;
    }
  }
  var nameForBackup = '';
  if (overrideName !== null && overrideName !== undefined) {
    if (overrideName && isAutoBackupName(overrideName)) {
      var _skipped3 = {
        status: 'skipped',
        reason: 'auto-backup-selected',
        context: reason
      };
      recordAutoBackupRun(_skipped3);
      return _skipped3;
    }
    nameForBackup = overrideName;
  } else if (normalizedSelectedName && isAutoBackupName(normalizedSelectedName)) {
    if (normalizedTypedName && !isAutoBackupName(normalizedTypedName) && normalizedTypedName !== normalizedSelectedName) {
      nameForBackup = normalizedTypedName;
    } else {
      var _skipped4 = {
        status: 'skipped',
        reason: 'auto-backup-selected',
        context: reason
      };
      recordAutoBackupRun(_skipped4);
      return _skipped4;
    }
  } else if (normalizedSelectedName) {
    nameForBackup = normalizedSelectedName;
  } else if (normalizedTypedName) {
    nameForBackup = normalizedTypedName;
  }
  var hideIndicator = null;
  try {
    hideIndicator = showAutoBackupIndicatorSafe();
  } catch (indicatorError) {
    console.warn('Failed to prepare auto backup indicator', indicatorError);
    hideIndicator = null;
  }
  try {
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var baseName = "auto-backup-".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "-").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var normalizedName = nameForBackup || '';
    var backupName = normalizedName ? "".concat(baseName, "-").concat(normalizedName) : baseName;
    var currentSetup = _objectSpread({}, getCurrentSetupState());
    var setupsSnapshot = getSetups();
    ensureLastAutoBackupSignatureInitialized(setupsSnapshot);
    var plan = determineNextAutoBackupPlan(setupsSnapshot);
    var resolvedPlan = plan;
    if (plan.snapshotType === 'delta') {
      var baseEntry = plan.base && setupsSnapshot ? setupsSnapshot[plan.base] : null;
      if (!baseEntry || _typeof(baseEntry) !== 'object') {
        resolvedPlan = {
          snapshotType: 'full',
          base: null,
          sequence: 0
        };
      }
    }
    var currentGearListHtml = getCurrentGearListHtml();
    var gearListGenerated = Boolean(currentGearListHtml);
    currentSetup.gearListAndProjectRequirementsGenerated = gearListGenerated;
    var gearSelectorsRaw = callEventsCoreFunction('getGearListSelectors', [], {
      defaultValue: {}
    }) || {};
    var gearSelectors = callEventsCoreFunction('cloneGearListSelectors', [gearSelectorsRaw], {
      defaultValue: {}
    }) || {};
    if (!hasMeaningfulAutoBackupContent(currentSetup, gearSelectors, gearListGenerated)) {
      var _skipped5 = {
        status: 'skipped',
        reason: 'empty',
        context: reason
      };
      recordAutoBackupRun(_skipped5);
      return _skipped5;
    }
    if (gearSelectors && Object.keys(gearSelectors).length) {
      currentSetup.gearSelectors = gearSelectors;
    }
    var currentSignature = computeAutoBackupStateSignature(currentSetup, gearSelectors, gearListGenerated);
    var _resolveLatestAutoBac2 = resolveLatestAutoBackupEntry(setupsSnapshot),
      latestStoredName = _resolveLatestAutoBac2.name,
      latestStoredEntry = _resolveLatestAutoBac2.entry;
    if (!force && latestStoredName && latestStoredEntry) {
      try {
        var latestStoredSignature = computeStoredAutoBackupSignature(latestStoredName, latestStoredEntry);
        if (latestStoredSignature === currentSignature) {
          var latestMetadata = readAutoBackupMetadata(latestStoredEntry);
          var latestCreatedAt = latestMetadata && typeof latestMetadata.createdAt === 'string' ? latestMetadata.createdAt : null;
          lastAutoBackupSignature = currentSignature;
          lastAutoBackupName = latestStoredName;
          lastAutoBackupCreatedAtIso = latestCreatedAt;
          recordAutoBackupRun({
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason
          });
          lastAutoBackupReasonState.set(reason, {
            timestamp: now.valueOf(),
            signature: currentSignature
          });
          return {
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason
          };
        }
      } catch (signatureCompareError) {
        console.warn('Failed to compare current auto backup against latest snapshot before saving', signatureCompareError);
      }
    }
    if (!force) {
      var lastReasonState = lastAutoBackupReasonState.get(reason);
      if (lastReasonState) {
        var elapsedSinceReason = now.valueOf() - lastReasonState.timestamp;
        if (elapsedSinceReason < AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS && lastReasonState.signature === currentSignature) {
          var _skipped6 = {
            status: 'skipped',
            reason: 'duplicate-reason',
            name: lastAutoBackupName || null,
            createdAt: lastAutoBackupCreatedAtIso || null,
            context: reason
          };
          recordAutoBackupRun(_skipped6);
          return _skipped6;
        }
      }
    }
    if (!force && lastAutoBackupSignature && currentSignature === lastAutoBackupSignature) {
      var _skipped7 = {
        status: 'skipped',
        reason: 'unchanged',
        name: lastAutoBackupName || null,
        createdAt: lastAutoBackupCreatedAtIso || null,
        context: reason
      };
      recordAutoBackupRun(_skipped7);
      return _skipped7;
    }
    var timestamp = now.toISOString();
    var backupMetadata = {
      version: 1,
      snapshotType: resolvedPlan.snapshotType,
      base: resolvedPlan.base,
      sequence: resolvedPlan.sequence,
      createdAt: timestamp,
      changedKeys: [],
      removedKeys: []
    };
    attachAutoBackupMetadata(currentSetup, backupMetadata);
    var setups = setupsSnapshot;
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      var gearListText = typeof currentGearListHtml === 'string' ? currentGearListHtml : '';
      var projectInfoSnapshot = currentSetup.projectInfo || null;
      if (projectInfoSnapshot && typeof createProjectInfoSnapshotForStorage === 'function') {
        try {
          projectInfoSnapshot = createProjectInfoSnapshotForStorage(projectInfoSnapshot) || projectInfoSnapshot;
        } catch (projectInfoSnapshotError) {
          console.warn('Failed to normalize project info for auto backup payload', projectInfoSnapshotError);
        }
      }
      if (projectInfoSnapshot && typeof callEventsCoreFunction === 'function') {
        try {
          var clonedInfo = callEventsCoreFunction('cloneProjectInfoForStorage', [projectInfoSnapshot], {
            defaultValue: projectInfoSnapshot
          });
          if (clonedInfo) {
            projectInfoSnapshot = clonedInfo;
          }
        } catch (projectInfoCloneError) {
          console.warn('Failed to clone project info for auto backup payload', projectInfoCloneError);
        }
      }
      var payload = {
        projectInfo: projectInfoSnapshot,
        gearListAndProjectRequirementsGenerated: Boolean(gearListText)
      };
      if (gearListText) {
        payload.gearList = gearListText;
      }
      var currentPowerSelection = typeof getPowerSelectionSnapshot === 'function' ? getPowerSelectionSnapshot() : null;
      if (currentPowerSelection && _typeof(currentPowerSelection) === 'object' && Object.keys(currentPowerSelection).length) {
        payload.powerSelection = currentPowerSelection;
      }
      if (gearSelectors && Object.keys(gearSelectors).length) {
        payload.gearSelectors = gearSelectors;
      }
      if (typeof getDiagramManualPositions === 'function') {
        try {
          var diagramPositions = getDiagramManualPositions();
          if (diagramPositions && _typeof(diagramPositions) === 'object' && Object.keys(diagramPositions).length) {
            payload.diagramPositions = diagramPositions;
          }
        } catch (diagramError) {
          console.warn('Failed to capture diagram positions for auto backup payload', diagramError);
        }
      }
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        var clonedRules = activeRules;
        if (typeof callEventsCoreFunction === 'function') {
          try {
            clonedRules = callEventsCoreFunction('cloneProjectInfoForStorage', [activeRules], {
              defaultValue: activeRules
            }) || activeRules;
          } catch (ruleCloneError) {
            console.warn('Failed to clone auto gear rules for auto backup payload', ruleCloneError);
          }
        }
        payload.autoGearRules = clonedRules;
      }
      var hasPayloadContent = Boolean(payload.projectInfo && _typeof(payload.projectInfo) === 'object' && Object.keys(payload.projectInfo).length || payload.gearList || payload.gearListAndProjectRequirementsGenerated || payload.powerSelection && Object.keys(payload.powerSelection).length || payload.gearSelectors && Object.keys(payload.gearSelectors).length || payload.diagramPositions && Object.keys(payload.diagramPositions).length || payload.autoGearRules && payload.autoGearRules.length);
      if (hasPayloadContent) {
        attachAutoBackupMetadata(payload, backupMetadata);
        saveProject(backupName, payload);
      }
    }
    var prevValue = setupSelectElement.value;
    var prevName = setupNameInput ? setupNameInput.value : '';
    populateSetupSelect();
    setupSelectElement.value = prevValue;
    if (setupNameInput) setupNameInput.value = prevName;
    if (!suppressSuccess) {
      showNotification('success', successMessage);
    }
    if (triggerAutoSaveNotification) {
      notifyAutoSaveFromBackup(autoSaveNotificationMessage, backupName);
    }
    lastAutoBackupSignature = currentSignature;
    lastAutoBackupName = backupName;
    lastAutoBackupCreatedAtIso = timestamp;
    recordAutoBackupRun({
      status: 'success',
      name: backupName,
      createdAt: timestamp,
      context: reason
    });
    lastAutoBackupReasonState.set(reason, {
      timestamp: now.valueOf(),
      signature: currentSignature
    });
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    recordAutoBackupRun({
      status: 'error',
      reason: 'exception',
      context: reason
    });
    return null;
  } finally {
    if (typeof hideIndicator === 'function') {
      try {
        hideIndicator();
      } catch (hideError) {
        console.warn('Failed to hide auto backup indicator', hideError);
      }
    }
  }
}
function ensureAutoBackupBeforeDeletion(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var successMessage = config.successMessage || langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  var failureMessage = config.failureMessage || langTexts.preDeleteBackupFailed || fallbackTexts.preDeleteBackupFailed || 'Automatic backup failed. The action was cancelled.';
  var setupSelectElement = getSetupSelectElement();
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var selectedName = setupSelectElement && typeof setupSelectElement.value === 'string' ? normalizeProjectName(setupSelectElement.value) : '';
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? normalizeProjectName(setupNameInput.value) : '';
  var rememberedName = normalizeProjectName(typeof lastSetupName === 'string' ? lastSetupName : '');
  var isAutoBackupName = function isAutoBackupName(name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  };
  var candidateNames = [selectedName, typedName, rememberedName];
  var activeProjectName = candidateNames.find(function (name) {
    return name && !isAutoBackupName(name);
  }) || '';
  if (!activeProjectName) {
    if (config.notifyFailure !== false) {
      showNotification('error', failureMessage);
    }
    return null;
  }
  if (typeof scheduleProjectAutoSave === 'function') {
    try {
      scheduleProjectAutoSave(true);
    } catch (autoSaveError) {
      console.warn('Failed to flush project autosave before deletion backup', autoSaveError);
    }
  }
  var backupOutcome = {
    status: 'unsupported'
  };
  if (typeof createProjectDeletionBackup === 'function') {
    try {
      backupOutcome = createProjectDeletionBackup(activeProjectName);
    } catch (error) {
      console.error("Automatic backup before ".concat(context || 'deletion', " failed"), error);
      backupOutcome = {
        status: 'failed'
      };
    }
  }
  if (backupOutcome.status === 'created' || backupOutcome.status === 'skipped') {
    if (backupOutcome.status === 'created') {
      noteAutoBackupRelevantChange({
        reset: true
      });
    }
    if (config.notifySuccess !== false) {
      showNotification('success', successMessage);
    }
    return typeof backupOutcome.backupName === 'string' && backupOutcome.backupName ? backupOutcome.backupName : activeProjectName;
  }
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn("Automatic backup before ".concat(context || 'deletion', " failed."), backupOutcome);
  }
  if (config.notifyFailure !== false) {
    showNotification('error', failureMessage);
  }
  return null;
}
var autoBackupInterval = setInterval(function () {
  autoBackup({
    reason: 'interval'
  });
}, AUTO_BACKUP_INTERVAL_MS);
if (typeof autoBackupInterval.unref === 'function') {
  autoBackupInterval.unref();
}
var autoGearBackupInterval = setInterval(function () {
  if (!autoGearRulesDirtySinceBackup) return;
  createAutoGearBackup();
}, AUTO_GEAR_BACKUP_INTERVAL_MS);
if (typeof autoGearBackupInterval.unref === 'function') {
  autoGearBackupInterval.unref();
}
var hourlyBackupInterval = setInterval(function () {
  var fileName = createSettingsBackup(false);
  showNotification(fileName ? 'success' : 'error', fileName ? "Full app backup downloaded (".concat(fileName, ")") : 'Full app backup failed');
}, 60 * 60 * 1000);
if (typeof hourlyBackupInterval.unref === 'function') {
  hourlyBackupInterval.unref();
}
function showDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (!deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.remove('hidden');
  setButtonLabelWithIcon(toggleDeviceBtn, texts[currentLang].hideDeviceManager, ICON_GLYPHS.minus);
  toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'true');
  refreshDeviceLists();
  updateCalculations();
}
function hideDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.add('hidden');
  setButtonLabelWithIcon(toggleDeviceBtn, texts[currentLang].toggleDeviceManager, ICON_GLYPHS.gears);
  toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'false');
}
function toggleDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) {
    showDeviceManagerSection();
  } else {
    hideDeviceManagerSection();
  }
}
addSafeEventListener(toggleDeviceBtn, 'click', toggleDeviceManagerSection);
function getEventsLanguageTexts() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var allTexts = typeof texts !== 'undefined' && texts || (scope && _typeof(scope.texts) === 'object' ? scope.texts : null);
  var resolvedLang = typeof currentLang === 'string' && allTexts && _typeof(allTexts[currentLang]) === 'object' ? currentLang : 'en';
  var langTexts = allTexts && _typeof(allTexts[resolvedLang]) === 'object' && allTexts[resolvedLang] || {};
  var fallbackTexts = allTexts && _typeof(allTexts.en) === 'object' && allTexts.en || {};
  return {
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function resolveAutoBackupIndicatorMessage() {
  var _getEventsLanguageTex = getEventsLanguageTexts(),
    langTexts = _getEventsLanguageTex.langTexts,
    fallbackTexts = _getEventsLanguageTex.fallbackTexts;
  return langTexts && langTexts.autoBackupInProgressNotice || fallbackTexts && fallbackTexts.autoBackupInProgressNotice || 'Auto backup in progress. Performance may pause briefly.';
}
function registerEventsCineUiInternal(cineUi) {
  if (!cineUi || eventsCineUiRegistered) {
    return;
  }
  eventsCineUiRegistered = true;
  try {
    if (cineUi.controllers && typeof cineUi.controllers.register === 'function') {
      cineUi.controllers.register('deviceManagerSection', {
        show: showDeviceManagerSection,
        hide: hideDeviceManagerSection,
        toggle: toggleDeviceManagerSection
      });
    }
  } catch (error) {
    console.warn('cineUi controller registration failed', error);
  }
  try {
    if (cineUi.interactions && typeof cineUi.interactions.register === 'function') {
      cineUi.interactions.register('saveSetup', handleSaveSetupClick);
      cineUi.interactions.register('deleteSetup', handleDeleteSetupClick);
    }
  } catch (error) {
    console.warn('cineUi interaction registration failed', error);
  }
  try {
    if (cineUi.help && typeof cineUi.help.register === 'function') {
      cineUi.help.register('saveSetup', function () {
        var _getEventsLanguageTex2 = getEventsLanguageTexts(),
          langTexts = _getEventsLanguageTex2.langTexts,
          fallbackTexts = _getEventsLanguageTex2.fallbackTexts;
        return langTexts.saveSetupHelp || fallbackTexts.saveSetupHelp || 'Capture the current project—including devices, requirements and notes—so it can be restored instantly. The autosave status dot beside Project Name glows while changes are secured. Press Enter or Ctrl+S to save quickly; the Save button stays disabled until a name is entered.';
      });
      cineUi.help.register('autoBackupBeforeDeletion', function () {
        var _getEventsLanguageTex3 = getEventsLanguageTexts(),
          langTexts = _getEventsLanguageTex3.langTexts,
          fallbackTexts = _getEventsLanguageTex3.fallbackTexts;
        return langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic safety copy stored before deletion. Find the matching auto-backup entry under Saved Projects and rename it if you plan to keep it permanently.';
      });
    }
  } catch (error) {
    console.warn('cineUi help registration failed', error);
  }
}
function registerEventsCineUi() {
  var cineUi = resolveCineUi();
  if (!cineUi) {
    return false;
  }
  registerEventsCineUiInternal(cineUi);
  return true;
}
registerEventsCineUi();
function toggleDeviceDetails(button) {
  var details = button.closest('li').querySelector('.device-details');
  var expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    button.textContent = texts[currentLang].showDetails;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-help', texts[currentLang].showDetails);
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', texts[currentLang].hideDetails);
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      var rawName = typeof button.dataset.name === 'string' ? button.dataset.name : '';
      var rawCategory = typeof button.dataset.category === 'string' ? button.dataset.category : '';
      var rawSubcategory = typeof button.dataset.subcategory === 'string' ? button.dataset.subcategory : '';
      var detail = {
        name: rawName.trim(),
        category: rawCategory.trim(),
        subcategory: rawSubcategory.trim() || null
      };
      try {
        document.dispatchEvent(new CustomEvent('device-library:show-details', {
          detail: detail
        }));
      } catch (error) {
        console.warn('Failed to dispatch device-library:show-details event', error);
      }
    }
  }
}
function inferDeviceCategory(key, data) {
  var _data$power;
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || (_data$power = data.power) !== null && _data$power !== void 0 && _data$power.batteryPlateSupport) return "cameras";
  if (key === "monitors" || data.screenSizeInches !== undefined && !key.includes("viewfinder")) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
  return "generic";
}
function resolveDefaultLensMountType() {
  var _cameraSelect;
  var cameras = devices && devices.cameras ? devices.cameras : null;
  if (!cameras || _typeof(cameras) !== 'object') {
    return '';
  }
  var findPreferredMount = function findPreferredMount(cam) {
    if (!cam || _typeof(cam) !== 'object' || !Array.isArray(cam.lensMount)) {
      return '';
    }
    var nativeEntry = cam.lensMount.find(function (entry) {
      return entry && typeof entry.type === 'string' && typeof entry.mount === 'string' && entry.mount.toLowerCase() === 'native';
    });
    if (nativeEntry && nativeEntry.type) {
      return nativeEntry.type;
    }
    var fallback = cam.lensMount.find(function (entry) {
      return entry && typeof entry.type === 'string' && entry.type.trim();
    });
    return fallback ? fallback.type : '';
  };
  var selectedCameraName = typeof ((_cameraSelect = cameraSelect) === null || _cameraSelect === void 0 ? void 0 : _cameraSelect.value) === 'string' ? cameraSelect.value : '';
  if (selectedCameraName && cameras[selectedCameraName]) {
    var preferred = findPreferredMount(cameras[selectedCameraName]);
    if (preferred) {
      return preferred;
    }
  }
  var firstCamera = Object.values(cameras).find(function (entry) {
    return entry && _typeof(entry) === 'object';
  });
  if (firstCamera) {
    var _preferred = findPreferredMount(firstCamera);
    if (_preferred) {
      return _preferred;
    }
  }
  return '';
}
function normalizeLensFocusScale(value) {
  if (typeof normalizeFocusScale === 'function') {
    try {
      var _normalized = normalizeFocusScale(value);
      if (_normalized === 'imperial' || _normalized === 'metric') {
        return _normalized;
      }
    } catch (focusScaleNormalizeError) {
      void focusScaleNormalizeError;
    }
  }
  var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (normalized === 'imperial' || normalized === 'metric') {
    return normalized;
  }
  return '';
}
function applyCameraFizConnectors(connectors) {
  var normalized = Array.isArray(connectors) ? connectors.map(function (entry) {
    if (!entry || typeof entry === 'string') {
      return entry;
    }
    if (_typeof(entry) === 'object' && typeof entry.type === 'string') {
      return _objectSpread({}, entry);
    }
    return entry;
  }) : [];
  var applied = false;
  if (typeof setFizConnectors === 'function') {
    try {
      setFizConnectors(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setFizConnectors invocation failed', directApplyError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Direct setFizConnectors invocation failed', directApplyError);
      }
    }
  }
  if (!applied) {
    try {
      callEventsCoreFunction('setFizConnectors', [normalized], {
        defer: true
      });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setFizConnectors', coreInvokeError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to schedule setFizConnectors', coreInvokeError);
      }
    }
  }
  return applied;
}
function applyCameraTimecodes(timecodes) {
  var normalized = Array.isArray(timecodes) ? timecodes.map(function (entry) {
    if (!entry) {
      return entry;
    }
    if (typeof entry === 'string') {
      var trimmed = entry.trim();
      return trimmed ? {
        type: trimmed,
        notes: ''
      } : entry;
    }
    if (_typeof(entry) === 'object') {
      var normalizedEntry = _objectSpread({}, entry);
      if (typeof normalizedEntry.type !== 'string' || !normalizedEntry.type) {
        var derivedType = typeof normalizedEntry.format === 'string' && normalizedEntry.format || typeof normalizedEntry.name === 'string' && normalizedEntry.name || '';
        if (derivedType) {
          normalizedEntry.type = derivedType;
        }
      }
      if (typeof normalizedEntry.notes !== 'string') {
        if (typeof normalizedEntry.comment === 'string') {
          normalizedEntry.notes = normalizedEntry.comment;
        } else if (normalizedEntry.notes == null) {
          normalizedEntry.notes = '';
        }
      }
      return normalizedEntry;
    }
    return entry;
  }) : [];
  var applied = false;
  if (typeof setTimecodes === 'function') {
    try {
      setTimecodes(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setTimecodes invocation failed', directApplyError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Direct setTimecodes invocation failed', directApplyError);
      }
    }
  }
  if (!applied) {
    try {
      callEventsCoreFunction('setTimecodes', [normalized], {
        defer: true
      });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setTimecodes', coreInvokeError, {
            namespace: 'device-editor'
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to schedule setTimecodes', coreInvokeError);
      }
    }
  }
  return applied;
}
function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  var type = inferDeviceCategory(categoryKey, deviceData);
  if (wattFieldDiv) wattFieldDiv.style.display = "block";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  hideFormSection(lensFieldsDiv);
  clearDynamicFields();
  if (type === "batteries") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    newCapacityInput.value = deviceData.capacity || '';
    newPinAInput.value = deviceData.pinA || '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : deviceData.dtapA || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    var _deviceData$power, _deviceData$power2, _deviceData$power3;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
    var tmp = resolveFirstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = ((_deviceData$power = deviceData.power) === null || _deviceData$power === void 0 || (_deviceData$power = _deviceData$power.input) === null || _deviceData$power === void 0 ? void 0 : _deviceData$power.voltageRange) || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(((_deviceData$power2 = deviceData.power) === null || _deviceData$power2 === void 0 ? void 0 : _deviceData$power2.batteryPlateSupport) || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    callEventsCoreFunction('setLensMounts', [Array.isArray(deviceData.lensMount) ? deviceData.lensMount : []]);
    callEventsCoreFunction('setPowerDistribution', [((_deviceData$power3 = deviceData.power) === null || _deviceData$power3 === void 0 ? void 0 : _deviceData$power3.powerDistributionOutputs) || []], {
      defer: true
    });
    setVideoOutputs(deviceData.videoOutputs || []);
    applyCameraFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    applyCameraTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "lenses") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(lensFieldsDiv);
    var fallbackMount = resolveDefaultLensMountType();
    var mountOptions = [];
    if (Array.isArray(deviceData === null || deviceData === void 0 ? void 0 : deviceData.mountOptions)) {
      mountOptions = deviceData.mountOptions;
    } else if (Array.isArray(deviceData === null || deviceData === void 0 ? void 0 : deviceData.lensMount)) {
      mountOptions = deviceData.lensMount;
    } else if (typeof (deviceData === null || deviceData === void 0 ? void 0 : deviceData.mount) === 'string' && deviceData.mount.trim()) {
      mountOptions = [{
        type: deviceData.mount.trim(),
        mount: 'native'
      }];
    }
    setLensDeviceMountOptions(mountOptions, fallbackMount);
    if (lensFocusScaleSelect) {
      updateLensFocusScaleSelectOptions();
      var storedFocusScale = normalizeLensFocusScale(deviceData && deviceData.focusScale);
      lensFocusScaleSelect.value = storedFocusScale || '';
    }
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    var _deviceData$power4, _deviceData$video, _deviceData$video2, _deviceData$audioOutp, _deviceData$audioOutp2;
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = ((_deviceData$power4 = deviceData.power) === null || _deviceData$power4 === void 0 || (_deviceData$power4 = _deviceData$power4.input) === null || _deviceData$power4 === void 0 ? void 0 : _deviceData$power4.voltageRange) || '';
    var mpt = resolveFirstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || ((_deviceData$video = deviceData.video) === null || _deviceData$video === void 0 ? void 0 : _deviceData$video.inputs) || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || ((_deviceData$video2 = deviceData.video) === null || _deviceData$video2 === void 0 ? void 0 : _deviceData$video2.outputs) || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = deviceData.latencyMs || '';
    monitorAudioOutputInput.value = ((_deviceData$audioOutp = deviceData.audioOutput) === null || _deviceData$audioOutp === void 0 ? void 0 : _deviceData$audioOutp.portType) || ((_deviceData$audioOutp2 = deviceData.audioOutput) === null || _deviceData$audioOutp2 === void 0 ? void 0 : _deviceData$audioOutp2.type) || deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    var _deviceData$power5, _deviceData$video3, _deviceData$video4;
    showFormSection(viewfinderFieldsDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = ((_deviceData$power5 = deviceData.power) === null || _deviceData$power5 === void 0 || (_deviceData$power5 = _deviceData$power5.input) === null || _deviceData$power5 === void 0 ? void 0 : _deviceData$power5.voltageRange) || '';
    var vfpt = resolveFirstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || ((_deviceData$video3 = deviceData.video) === null || _deviceData$video3 === void 0 ? void 0 : _deviceData$video3.inputs) || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || ((_deviceData$video4 = deviceData.video) === null || _deviceData$video4 === void 0 ? void 0 : _deviceData$video4.outputs) || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    var _deviceData$video5, _deviceData$video6;
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = resolveFirstPowerInputType(deviceData);
    setVideoInputs(deviceData.videoInputs || ((_deviceData$video5 = deviceData.video) === null || _deviceData$video5 === void 0 ? void 0 : _deviceData$video5.inputs) || []);
    setVideoOutputsIO(deviceData.videoOutputs || ((_deviceData$video6 = deviceData.video) === null || _deviceData$video6 === void 0 ? void 0 : _deviceData$video6.outputs) || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = deviceData.latencyMs || '';
    motorConnectorInput.value = '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    var cc = Array.isArray(deviceData.fizConnectors) ? deviceData.fizConnectors.map(function (fc) {
      return fc.type;
    }).join(', ') : deviceData.fizConnector || '';
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "accessories.cables") {
    var _devices$accessories;
    wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    var subcats = Object.keys(((_devices$accessories = devices.accessories) === null || _devices$accessories === void 0 ? void 0 : _devices$accessories.cables) || {});
    newSubcategorySelect.innerHTML = '';
    for (var _i = 0, _subcats = subcats; _i < _subcats.length; _i++) {
      var sc = _subcats[_i];
      var opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    newSubcategorySelect.value = subcategory || '';
    newSubcategorySelect.disabled = false;
    buildDynamicFields("accessories.cables.".concat(subcategory), deviceData, categoryExcludedAttrs["accessories.cables.".concat(subcategory)] || []);
  } else {
    var watt = _typeof(deviceData) === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}
addSafeEventListener(deviceManagerSection, "click", function (event) {
  var button = event.target.closest('button');
  if (!button || !deviceManagerSection.contains(button)) {
    return;
  }
  if (button.classList.contains("detail-toggle")) {
    toggleDeviceDetails(button);
  } else if (button.classList.contains("edit-btn")) {
    var name = button.dataset.name;
    var categoryKey = button.dataset.category;
    var subcategory = button.dataset.subcategory;
    var categorySelect = resolveNewCategorySelect();
    if (!categorySelect) {
      console.warn('Cannot edit device: category select is unavailable');
      return;
    }
    if (!Array.from(categorySelect.options).some(function (opt) {
      return opt.value === categoryKey;
    })) {
      var _categoryNames$curren;
      var opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = ((_categoryNames$curren = categoryNames[currentLang]) === null || _categoryNames$curren === void 0 ? void 0 : _categoryNames$curren[categoryKey]) || categoryKey;
      categorySelect.appendChild(opt);
    }
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name;
    addDeviceBtn.dataset.originalCategory = categoryKey;
    if (categoryKey === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    categorySelect.value = categoryKey;
    newNameInput.value = name;
    categorySelect.dispatchEvent(new Event('change'));
    var deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      var _categoryKey$split = categoryKey.split('.'),
        _categoryKey$split2 = _slicedToArray(_categoryKey$split, 2),
        mainCat = _categoryKey$split2[0],
        subCat = _categoryKey$split2[1];
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }
    populateDeviceForm(categoryKey, deviceData, subcategory);
    setButtonLabelWithIcon(addDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
    document.getElementById("addDeviceHeading").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else if (button.classList.contains("delete-btn")) {
    var _name = button.dataset.name;
    var _categoryKey = button.dataset.category;
    var _subcategory = button.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", _name))) {
      if (_categoryKey === "accessories.cables") {
        delete devices.accessories.cables[_subcategory][_name];
      } else if (_categoryKey.includes('.')) {
        var _categoryKey$split3 = _categoryKey.split('.'),
          _categoryKey$split4 = _slicedToArray(_categoryKey$split3, 2),
          _mainCat = _categoryKey$split4[0],
          _subCat = _categoryKey$split4[1];
        delete devices[_mainCat][_subCat][_name];
      } else {
        delete devices[_categoryKey][_name];
      }
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceLists();
      updateMountTypeOptions();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.motors, true);
      });
      controllerSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.controllers, true);
      });
      populateSelect(distanceSelect, devices.fiz.distance, true);
      populateSelect(batterySelect, devices.batteries, true);
      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updatePowerDistTypeOptions();
      updatePowerDistVoltageOptions();
      updatePowerDistCurrentOptions();
      updateTimecodeTypeOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
    }
  }
});
addSafeEventListener(deviceManagerSection, 'keydown', function (event) {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});
var newCategorySelectElement = resolveNewCategorySelect();
if (newCategorySelectElement) {
  addSafeEventListener(newCategorySelectElement, "change", function () {
    var _addDeviceBtn;
    var wasEditing = ((_addDeviceBtn = addDeviceBtn) === null || _addDeviceBtn === void 0 ? void 0 : _addDeviceBtn.dataset.mode) === "edit";
    var previousName = newNameInput ? newNameInput.value : "";
    var val = newCategorySelectElement.value;
    placeWattField(val);
    clearDynamicFields();
    subcategoryFieldDiv.hidden = true;
    newSubcategorySelect.innerHTML = "";
    newSubcategorySelect.disabled = false;
    if (dtapRow) dtapRow.style.display = "";
    if (wattFieldDiv) wattFieldDiv.style.display = "block";
    hideFormSection(batteryFieldsDiv);
    hideFormSection(cameraFieldsDiv);
    hideFormSection(monitorFieldsDiv);
    hideFormSection(viewfinderFieldsDiv);
    hideFormSection(videoFieldsDiv);
    hideFormSection(motorFieldsDiv);
    hideFormSection(controllerFieldsDiv);
    hideFormSection(distanceFieldsDiv);
    if (val === "batteries" || val === "accessories.batteries" || val === "batteryHotswaps") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(batteryFieldsDiv);
      if (dtapRow) dtapRow.style.display = val === "batteryHotswaps" ? "none" : "";
    } else if (val === "cameras") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(cameraFieldsDiv);
    } else if (val === "lenses") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(lensFieldsDiv);
      setLensDeviceMountOptions([], resolveDefaultLensMountType());
      if (lensFocusScaleSelect) {
        updateLensFocusScaleSelectOptions();
        lensFocusScaleSelect.value = '';
      }
    } else if (val === "monitors" || val === "directorMonitors") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(monitorFieldsDiv);
    } else if (val === "viewfinders") {
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      showFormSection(viewfinderFieldsDiv);
    } else if (val === "video" || val === "wirelessReceivers" || val === "iosVideo") {
      showFormSection(videoFieldsDiv);
    } else if (val === "fiz.motors") {
      showFormSection(motorFieldsDiv);
    } else if (val === "fiz.controllers") {
      showFormSection(controllerFieldsDiv);
    } else if (val === "fiz.distance") {
      showFormSection(distanceFieldsDiv);
    } else if (val === "accessories.cables") {
      var _devices$accessories2;
      if (wattFieldDiv) wattFieldDiv.style.display = "none";
      subcategoryFieldDiv.hidden = false;
      var subcats = Object.keys(((_devices$accessories2 = devices.accessories) === null || _devices$accessories2 === void 0 ? void 0 : _devices$accessories2.cables) || {});
      for (var _i2 = 0, _subcats2 = subcats; _i2 < _subcats2.length; _i2++) {
        var sc = _subcats2[_i2];
        var opt = document.createElement('option');
        opt.value = sc;
        opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
        newSubcategorySelect.appendChild(opt);
      }
      if (newSubcategorySelect.value) {
        buildDynamicFields("accessories.cables.".concat(newSubcategorySelect.value), {}, categoryExcludedAttrs["accessories.cables.".concat(newSubcategorySelect.value)] || []);
      }
    } else {
      buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
    }
    newWattInput.value = "";
    newCapacityInput.value = "";
    newPinAInput.value = "";
    newDtapAInput.value = "";
    cameraWattInput.value = "";
    cameraVoltageInput.value = "";
    cameraPortTypeInput.value = "";
    monitorScreenSizeInput.value = "";
    monitorBrightnessInput.value = "";
    monitorWattInput.value = "";
    monitorVoltageInput.value = "";
    monitorPortTypeInput.value = "";
    monitorWirelessTxInput.checked = false;
    monitorLatencyInput.value = "";
    monitorAudioOutputInput.value = "";
    clearMonitorVideoInputs();
    clearMonitorVideoOutputs();
    viewfinderScreenSizeInput.value = "";
    viewfinderBrightnessInput.value = "";
    viewfinderWattInput.value = "";
    viewfinderVoltageInput.value = "";
    viewfinderPortTypeInput.value = "";
    viewfinderWirelessTxInput.checked = false;
    viewfinderLatencyInput.value = "";
    clearViewfinderVideoInputs();
    clearViewfinderVideoOutputs();
    clearBatteryPlates();
    clearRecordingMedia();
    clearLensMounts();
    clearLensDeviceMountOptions();
    if (lensFocusScaleSelect) {
      lensFocusScaleSelect.value = '';
    }
    callEventsCoreFunction('clearPowerDistribution', [], {
      defer: true
    });
    clearVideoOutputs();
    clearFizConnectors();
    clearViewfinders();
    clearTimecodes();
    videoPowerInput.value = "";
    clearVideoInputs();
    clearVideoOutputsIO();
    videoFrequencyInput.value = "";
    videoLatencyInput.value = "";
    motorConnectorInput.value = "";
    motorInternalInput.checked = false;
    motorTorqueInput.value = "";
    motorGearInput.value = "";
    motorNotesInput.value = "";
    controllerConnectorInput.value = "";
    controllerPowerInput.value = "";
    controllerBatteryInput.value = "";
    controllerConnectivityInput.value = "";
    controllerNotesInput.value = "";
    distanceConnectionInput.value = "";
    distanceMethodInput.value = "";
    distanceRangeInput.value = "";
    distanceAccuracyInput.value = "";
    distanceOutputInput.value = "";
    distanceNotesInput.value = "";
    if (val !== 'accessories.cables') {
      buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
    }
    if (newNameInput) {
      if (wasEditing) {
        newNameInput.value = previousName;
      } else {
        newNameInput.value = "";
      }
    }
    var cancelLabel = texts[currentLang].cancelEditBtn;
    if (wasEditing) {
      setButtonLabelWithIcon(addDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
      addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
      setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      showFormSection(cancelEditBtn);
    } else {
      setButtonLabelWithIcon(addDeviceBtn, texts[currentLang].addDeviceBtn, ICON_GLYPHS.add);
      addDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
      addDeviceBtn.dataset.mode = "add";
      delete addDeviceBtn.dataset.originalName;
      delete addDeviceBtn.dataset.originalSubcategory;
      delete addDeviceBtn.dataset.originalCategory;
      setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      hideFormSection(cancelEditBtn);
    }
  });
} else {
  console.warn('Device manager category select is unavailable; change handler not registered');
}
addSafeEventListener(newSubcategorySelect, 'change', function () {
  var categorySelect = resolveNewCategorySelect();
  if (categorySelect && categorySelect.value === 'accessories.cables') {
    buildDynamicFields("accessories.cables.".concat(newSubcategorySelect.value), {}, categoryExcludedAttrs["accessories.cables.".concat(newSubcategorySelect.value)] || []);
  }
});
function resetDeviceForm() {
  if (addDeviceBtn) {
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
  }
  if (cancelEditBtn) {
    hideFormSection(cancelEditBtn);
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  }
  var categorySelect = resolveNewCategorySelect();
  if (categorySelect && categorySelect.isConnected) {
    try {
      categorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}
addSafeEventListener(addDeviceBtn, "click", function () {
  var name = newNameInput.value.trim();
  var categorySelect = resolveNewCategorySelect();
  var category = categorySelect ? categorySelect.value : '';
  var isEditing = addDeviceBtn.dataset.mode === "edit";
  var originalName = addDeviceBtn.dataset.originalName;
  var originalCategory = addDeviceBtn.dataset.originalCategory;
  var subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  var originalSubcategory = addDeviceBtn.dataset.originalSubcategory;
  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }
  if (category === "accessories.cables" && !subcategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var targetCategory = getCategoryContainer(category, subcategory, {
    create: true
  });
  if (!targetCategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var storedOriginalCategory = originalCategory || category;
  var storedOriginalSubcategory = originalSubcategory || null;
  var originalCollection = isEditing ? getCategoryContainer(storedOriginalCategory, storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory : null, {
    create: false
  }) : null;
  var originalDeviceData = isEditing && originalCollection ? originalCollection[originalName] : undefined;
  var editingSameCategory = isEditing && storedOriginalCategory === category;
  var editingSamePath = editingSameCategory && (category !== "accessories.cables" || storedOriginalSubcategory === subcategory);
  if (!isEditing && targetCategory[name] !== undefined || isEditing && (name !== originalName || category === "accessories.cables" && subcategory !== originalSubcategory) && targetCategory[name] !== undefined) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }
  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    var capacity = parseFloat(newCapacityInput.value);
    var pinA = parseFloat(newPinAInput.value);
    var dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (isNaN(capacity) || isNaN(pinA) || capacity <= 0 || pinA <= 0 || category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0)) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    var existing = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA
      });
    } else {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA,
        dtapA: dtapA
      });
    }
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "accessories.cables") {
    var _existing = isEditing && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    targetCategory[name] = _objectSpread({}, _existing);
    applyDynamicFieldValues(targetCategory[name], "accessories.cables.".concat(subcategory), categoryExcludedAttrs["accessories.cables.".concat(subcategory)] || []);
  } else if (category === "cameras") {
    var watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = getPowerDistribution();
      videoOut = getVideoOutputs();
      fizCon = getFizConnectors();
      viewfinder = getViewfinders();
      timecode = getTimecodes();
      plateSupport = getBatteryPlates();
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          type: cameraPortTypeInput.value
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: getRecordingMedia(),
      viewfinder: viewfinder,
      lensMount: getLensMounts(),
      timecode: timecode
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
    updateMountTypeOptions();
  } else if (category === "lenses") {
    var _existing2 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    var mountOptions = getLensDeviceMountOptions();
    if (mountOptions.length) {
      _existing2.mountOptions = mountOptions;
      _existing2.mount = mountOptions[0].type || '';
    } else {
      delete _existing2.mountOptions;
      delete _existing2.mount;
    }
    if (lensFocusScaleSelect) {
      var selectedFocusScale = normalizeLensFocusScale(lensFocusScaleSelect.value);
      if (selectedFocusScale) {
        _existing2.focusScale = selectedFocusScale;
      } else {
        delete _existing2.focusScale;
      }
    }
    targetCategory[name] = _existing2;
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
    updateMountTypeOptions();
  } else if (category === "monitors" || category === "directorMonitors") {
    var _watt = parseFloat(monitorWattInput.value);
    if (isNaN(_watt) || _watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var screenSize = parseFloat(monitorScreenSizeInput.value);
    var brightness = parseFloat(monitorBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: _watt,
      power: {
        input: {
          voltageRange: monitorVoltageInput.value,
          type: monitorPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getMonitorVideoInputs(),
        outputs: getMonitorVideoOutputs()
      },
      wirelessTx: monitorWirelessTxInput.checked,
      latencyMs: monitorWirelessTxInput.checked ? monitorLatencyInput.value : undefined,
      audioOutput: monitorAudioOutputInput.value ? {
        portType: monitorAudioOutputInput.value
      } : undefined
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "viewfinders") {
    var _watt2 = parseFloat(viewfinderWattInput.value);
    if (isNaN(_watt2) || _watt2 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _screenSize = parseFloat(viewfinderScreenSizeInput.value);
    var _brightness = parseFloat(viewfinderBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(_screenSize) ? undefined : _screenSize,
      brightnessNits: isNaN(_brightness) ? undefined : _brightness,
      powerDrawWatts: _watt2,
      power: {
        input: {
          voltageRange: viewfinderVoltageInput.value,
          type: viewfinderPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getViewfinderVideoInputs(),
        outputs: getViewfinderVideoOutputs()
      },
      wirelessTx: viewfinderWirelessTxInput.checked,
      latencyMs: viewfinderWirelessTxInput.checked ? viewfinderLatencyInput.value : undefined
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    var _watt3 = parseFloat(newWattInput.value);
    if (isNaN(_watt3) || _watt3 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt3,
      power: {
        input: {
          type: videoPowerInput.value
        }
      },
      videoInputs: getVideoInputs(),
      videoOutputs: getVideoOutputsIO(),
      frequency: videoFrequencyInput.value,
      latencyMs: videoLatencyInput.value
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.motors") {
    var _watt4 = parseFloat(newWattInput.value);
    if (isNaN(_watt4) || _watt4 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt4,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(function (s) {
        return s.trim();
      }).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.controllers") {
    var _watt5 = parseFloat(newWattInput.value);
    if (isNaN(_watt5) || _watt5 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt5,
      fizConnector: controllerConnectorInput.value,
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.distance") {
    var _watt6 = parseFloat(newWattInput.value);
    if (isNaN(_watt6) || _watt6 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt6,
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else {
    var _watt7 = parseFloat(newWattInput.value);
    if (isNaN(_watt7) || _watt7 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _existing3 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    targetCategory[name] = _objectSpread(_objectSpread({}, _existing3), {}, {
      powerDrawWatts: _watt7
    });
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  }
  if (isEditing) {
    removeOriginalDeviceEntry(storedOriginalCategory, storedOriginalSubcategory, originalName, category, subcategory, name);
    addDeviceBtn.dataset.originalCategory = category;
    if (category === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    addDeviceBtn.dataset.originalName = name;
  }
  resetDeviceForm();
  storeDevices(devices);
  viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
  viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
  callEventsCoreFunction('updatePlateTypeOptions');
  callEventsCoreFunction('updatePowerPortOptions');
  callEventsCoreFunction('updatePowerDistTypeOptions');
  callEventsCoreFunction('updatePowerDistVoltageOptions');
  callEventsCoreFunction('updatePowerDistCurrentOptions');
  callEventsCoreFunction('updateRecordingMediaOptions');
  callEventsCoreFunction('updateTimecodeTypeOptions');
  refreshDeviceLists();
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(function (sel) {
    return populateSelect(sel, devices.fiz.motors, true);
  });
  controllerSelects.forEach(function (sel) {
    return populateSelect(sel, devices.fiz.controllers, true);
  });
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations();
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    var normalizedSubcategory = category === "accessories.cables" && subcategory ? subcategory.trim() || null : null;
    var detail = {
      name: name,
      category: category,
      subcategory: normalizedSubcategory
    };
    if (isEditing) {
      detail.original = {
        name: originalName || '',
        category: storedOriginalCategory || '',
        subcategory: storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory ? storedOriginalSubcategory : null : null
      };
    }
    try {
      document.dispatchEvent(new CustomEvent(isEditing ? 'device-library:update' : 'device-library:add', {
        detail: detail
      }));
    } catch (error) {
      console.warn('Failed to dispatch device library mutation event', error);
    }
  }
  var categoryKey = category.replace(".", "_");
  var categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
    alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
    alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});
addSafeEventListener(cancelEditBtn, "click", function () {
  resetDeviceForm();
});
addSafeEventListener(exportBtn, "click", function () {
  if (typeof autoBackup === 'function') {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'export'
      });
    } catch (error) {
      console.warn('Failed to auto backup before export', error);
    }
  }
  var dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  var blob = new Blob([dataStr], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
var exportAndRevertBtn = document.getElementById('exportAndRevertBtn');
if (exportAndRevertBtn) {
  addSafeEventListener(exportAndRevertBtn, 'click', function () {
    if (confirm(texts[currentLang].confirmExportAndRevert)) {
      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'export-revert'
          });
        } catch (error) {
          console.warn('Failed to auto backup before export and revert', error);
        }
      }
      var dataStr = JSON.stringify(devices, null, 2);
      var blob = new Blob([dataStr], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      var revertTimer = setTimeout(function () {
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500);
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    }
  });
}
addSafeEventListener(importDataBtn, "click", function () {
  importFileInput.click();
});
addSafeEventListener(importFileInput, "change", function (event) {
  var file = event.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    try {
      var importedData = JSON.parse(e.target.result);
      var result = parseDeviceDatabaseImport(importedData);
      if (!result.devices) {
        var summary = formatDeviceImportErrors(result.errors);
        console.error('Device import validation failed:', result.errors);
        alert(summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(summary) : texts[currentLang].alertImportError);
        return;
      }
      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'import'
          });
        } catch (error) {
          console.warn('Failed to auto backup before import', error);
        }
      }
      devices = result.devices;
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceLists();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
      motorSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.motors, true);
      });
      controllerSelects.forEach(function (sel) {
        return populateSelect(sel, devices.fiz.controllers, true);
      });
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
      applyFilters();
      updateCalculations();
      var deviceCount = countDeviceDatabaseEntries(devices);
      alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
      exportOutput.style.display = "block";
      exportOutput.value = JSON.stringify(devices, null, 2);
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      var errorMessage = error && error.message ? error.message : String(error);
      var _summary = formatDeviceImportErrors([errorMessage]);
      alert(_summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(_summary) : texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
});