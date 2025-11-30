// --- SESSION STATE HANDLING ---
/* eslint-disable no-redeclare */
/* global cineFeaturesConnectionDiagram, shareSetupBtn, saveSessionState, loadSessionState,
          CORE_GLOBAL_SCOPE, resolveTemperatureStorageKey, TEMPERATURE_STORAGE_KEY,
          updateCageSelectOptions, updateAccentColorResetButtonState,
          normalizeAccentValue, DEFAULT_ACCENT_NORMALIZED: true,
          DEFAULT_ACCENT_COLOR: true, HIGH_CONTRAST_ACCENT_COLOR: true,
          accentColor: true, prevAccentColor: true,
          restoringSession: true, filterSelectElem: true,
          autoGearSearchInput, setAutoGearSearchQuery,
          autoGearFilterScenarioSelect, setAutoGearScenarioFilter,
          autoGearFilterClearButton, clearAutoGearFilters,
          autoGearSummaryCards, autoGearSummaryDetails,
          setAutoGearSummaryFocus, focusAutoGearRuleById,
          autoGearConditionSelect, updateAutoGearConditionAddButtonState,
          autoGearConditionAddButton, addAutoGearConditionFromPicker,
          autoGearConditionList, removeAutoGearCondition,
          handleAutoGearConditionShortcut, loadAutoGearRules,
          duplicateAutoGearRule, autoGearScenarioModeSelect,
          normalizeAutoGearScenarioLogic, applyAutoGearScenarioSettings,
          getAutoGearScenarioSelectedValues, autoGearScenarioBaseSelect,
          normalizeAutoGearScenarioPrimary, autoGearScenarioFactorInput,
          normalizeAutoGearScenarioMultiplier,
          isAutoGearHighlightEnabled, setAutoGearHighlightEnabled,
          updateAutoGearHighlightToggleButton,
          clearUiCacheStorageEntries, __cineGlobal, humanizeKey,
          normalizeBatteryPlateValue, applyBatteryPlateSelectionFromBattery,
          updateStorageRequirementTypeOptions,
          getPowerSelectionSnapshot, applyStoredPowerSelection,
          settingsReduceMotion, settingsRelaxedSpacing, callCoreFunctionIfAvailable,
          suspendProjectPersistence, resumeProjectPersistence,
          isProjectPersistenceSuspended,
          recordFeatureSearchUsage, extractFeatureSearchFilter,
          helpResultsSummary, helpResultsAssist, helpNoResultsSuggestions,
          isProjectPersistenceSuspended, suspendProjectPersistence,
          resumeProjectPersistence, stableStringify, CORE_SHARED,
          markProjectFormDataDirty, loadAutoGearMonitorDefaults, loadDocumentationTracker,
          enhanceGearItemElement,
          settingsFocusScale, focusScalePreference: true, normalizeFocusScale,
          applyFocusScalePreference: true, applyTemperatureUnitPreference: true,
          updateLensWorkflowCatalog, FOCUS_SCALE_STORAGE_KEY_NAME,
          contactsCache: true, sortContacts, saveContactsToStorage, renderContactsList,
          updateContactPickers, normalizeContactEntry, sanitizeContactValue */
/* eslint-enable no-redeclare */
/* global enqueueCoreBootTask */
/* global getUserProfileSnapshot, formatUserProfileProviderName,
          ensureContactForImportedOwner, setGearItemProvider,
          dispatchGearProviderDataChanged */
// Keep a baseline set of match types so that the session search feature
// continues to work even when globals have not been initialised yet (for
// example during unit tests or offline restore flows).
const FALLBACK_STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
if (typeof globalThis !== 'undefined' && typeof globalThis.STRONG_SEARCH_MATCH_TYPES === 'undefined') {
  globalThis.STRONG_SEARCH_MATCH_TYPES = FALLBACK_STRONG_SEARCH_MATCH_TYPES;
}

const FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK =
  'Force reload requires an internet connection. Try again once you are back online.';

// Determine which global scope we can use for deep cloning. The order mirrors
// the environments the planner needs to support: main window first, followed by
// worker-like contexts and finally Node during testing.
function getSessionCloneScope() {
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
    return CORE_GLOBAL_SCOPE;
  }

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

  return null;
}

function resolveSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
  }

  const candidates = [];
  const seen = new Set();
  const enqueue = (scope) => {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }
    if (seen.has(scope)) {
      return;
    }
    seen.add(scope);
    candidates.push(scope);
  };

  try { enqueue(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null); } catch { /* noop */ }
  try { enqueue(typeof globalThis !== 'undefined' ? globalThis : null); } catch { /* noop */ }
  try { enqueue(typeof window !== 'undefined' ? window : null); } catch { /* noop */ }
  try { enqueue(typeof self !== 'undefined' ? self : null); } catch { /* noop */ }
  try { enqueue(typeof global !== 'undefined' ? global : null); } catch { /* noop */ }

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope) {
      continue;
    }

    try {
      const directCandidate = scope[name];
      if (typeof directCandidate === 'function') {
        return directCandidate;
      }
    } catch (directError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('resolveSessionRuntimeFunction: failed to read candidate from scope', name, directError);
      }
    }

    try {
      const nestedScope = scope.CORE_GLOBAL_SCOPE || scope.core || scope.__cineRuntimeState;
      if (nestedScope && !seen.has(nestedScope)) {
        enqueue(nestedScope);
        // Re-evaluate the nested scope immediately to surface direct matches sooner.
        const nestedCandidate = nestedScope[name];
        if (typeof nestedCandidate === 'function') {
          return nestedCandidate;
        }
      }
    } catch (nestedError) {
      if (typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug('resolveSessionRuntimeFunction: nested scope probe failed', name, nestedError);
      }
    }
  }

  return null;
}

function isNavigatorExplicitlyOffline(navigatorLike) {
  if (!navigatorLike || typeof navigatorLike !== 'object') {
    return false;
  }

  if (typeof navigatorLike.onLine !== 'boolean') {
    return false;
  }

  return navigatorLike.onLine === false;
}

function resolveForceReloadOfflineNotice() {
  let notice = '';

  if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) {
      const dataset = indicator.dataset || {};
      const dataNotice =
        (typeof dataset.forceReloadNotice === 'string' && dataset.forceReloadNotice.trim())
          ? dataset.forceReloadNotice.trim()
          : null;
      const dataHelp =
        (typeof dataset.reloadNotice === 'string' && dataset.reloadNotice.trim())
          ? dataset.reloadNotice.trim()
          : null;
      const helpAttr =
        typeof indicator.getAttribute === 'function'
          ? indicator.getAttribute('data-help')
          : null;
      const helpAttrNormalized = typeof helpAttr === 'string' && helpAttr.trim() ? helpAttr.trim() : null;
      const textContent = typeof indicator.textContent === 'string' && indicator.textContent.trim()
        ? indicator.textContent.trim()
        : null;

      notice = dataNotice || dataHelp || helpAttrNormalized || textContent || '';

      if (!notice) {
        const baseLabel =
          (typeof dataset.baseLabel === 'string' && dataset.baseLabel.trim())
            ? dataset.baseLabel.trim()
            : null;
        if (baseLabel) {
          notice = baseLabel;
        }
      }

      if (notice) {
        return notice;
      }
    }
  }

  const resolveLocale = resolveSessionRuntimeFunction('resolveLocaleString');
  if (typeof resolveLocale === 'function') {
    try {
      const localized = resolveLocale('reloadAppOfflineNotice');
      if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
      }
    } catch (localeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('resolveForceReloadOfflineNotice: failed to resolve locale string', localeError);
      }
    }
  }

  return FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
}

function announceForceReloadOfflineNotice() {
  const notice = resolveForceReloadOfflineNotice();
  let handled = false;

  if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) {
      handled = true;

      if (indicator.dataset) {
        indicator.dataset.forceReloadNotice = notice;
        indicator.dataset.reloadNotice = notice;
      }

      if (typeof indicator.setAttribute === 'function') {
        indicator.setAttribute('data-help', notice);
        indicator.setAttribute('role', 'status');
        indicator.setAttribute('aria-live', 'polite');
      }

      if (typeof indicator.removeAttribute === 'function') {
        indicator.removeAttribute('hidden');
      }

      if (typeof indicator.textContent === 'string' || typeof indicator.textContent === 'object') {
        indicator.textContent = notice;
      }
    }
  }

  if (!handled && typeof window !== 'undefined' && typeof window.alert === 'function') {
    try {
      window.alert(notice);
    } catch (alertError) {
      void alertError;
    }
  }
}

try {
  if (typeof globalThis !== 'undefined' && globalThis) {
    if (typeof globalThis.announceForceReloadOfflineNotice !== 'function') {
      globalThis.announceForceReloadOfflineNotice = announceForceReloadOfflineNotice;
    }
  }
} catch (exposeError) {
  void exposeError;
}

function safeGetCurrentProjectName(defaultValue = '') {
  const resolver = resolveSessionRuntimeFunction('getCurrentProjectName');
  if (typeof resolver !== 'function') {
    return defaultValue;
  }

  try {
    const resolved = resolver();
    if (typeof resolved === 'string' && resolved.trim()) {
      return resolved;
    }
  } catch (projectNameError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('safeGetCurrentProjectName: runtime call failed, using fallback', projectNameError);
    }
  }

  return defaultValue;
}

function resolveSetLanguageFn() {
  return resolveSessionRuntimeFunction('setLanguage');
}

function applySetLanguage(languageCode, options = {}) {
  const setLanguageFn = resolveSetLanguageFn();
  if (typeof setLanguageFn !== 'function') {
    if (!options?.silent && typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('applySetLanguage: setLanguage runtime function not available');
    }
    return false;
  }

  try {
    setLanguageFn(languageCode);
    return true;
  } catch (setLanguageError) {
    if (!options?.silent && typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('applySetLanguage: setLanguage execution failed', setLanguageError);
    }
    return false;
  }
}

// Basic JSON cloning fallback. We lean on this when structuredClone is not
// available so that session data stays isolated from the UI state.
function sessionJsonDeepClone(value) {
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

// Attempt to obtain a native structuredClone implementation. Using the native
// version keeps complex objects (like Maps or Sets) intact when the runtime
// supports them, but we still have a safe fallback when it does not.
function sessionResolveStructuredClone(scope) {
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

// Wrap structuredClone so that errors never bubble into the autosave layer. If
// cloning fails, we quietly fall back to JSON cloning and keep the session
// usable for the user.
function sessionCreateResilientDeepClone(scope) {
  const structuredCloneImpl = sessionResolveStructuredClone(scope);

  if (!structuredCloneImpl) {
    return sessionJsonDeepClone;
  }

  return function sessionResilientDeepClone(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    try {
      return structuredCloneImpl(value);
    } catch (structuredCloneError) {
      void structuredCloneError;
    }

    return sessionJsonDeepClone(value);
  };
}

let sensorModeDropdown;
let recordingResolutionDropdown;
let slowMotionSensorModeDropdown;
let slowMotionRecordingResolutionDropdown;
let slowMotionAspectRatioSelect;
let slowMotionRecordingFrameRateInput;
let slowMotionRecordingFrameRateHint;
let slowMotionRecordingFrameRateOptionsList;

const SESSION_DEEP_CLONE =
  CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone === 'function'
    ? CORE_GLOBAL_SCOPE.__cineDeepClone
    : sessionCreateResilientDeepClone(getSessionCloneScope());

// Cache the resolved deep clone helper globally so other modules (and legacy
// entry points) can reuse the exact same logic without duplicating work.
if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
  try {
    CORE_GLOBAL_SCOPE.__cineDeepClone = SESSION_DEEP_CLONE;
  } catch (sessionDeepCloneError) {
    void sessionDeepCloneError;
  }
}
/* global triggerPinkModeIconRain, loadDeviceData, loadSetups,
          loadFeedback, loadFavorites, loadAutoGearBackups,
          loadAutoGearPresets, loadAutoGearSeedFlag, loadAutoGearActivePresetId,
          loadAutoGearAutoPresetId, loadAutoGearBackupVisibility,
          loadAutoGearBackupRetention, loadFullBackupHistory */
/* global getGridSnapState: true, setGridSnapState: true */
/* global formatFullBackupFilename, resolveSafeLocalStorage, captureStorageSnapshot,
          createSafeStorageReader, restoreSessionStorageSnapshot, restoreLocalStorageSnapshot,
          sanitizeBackupPayload, parseBackupDataString, normalizeBackupDataSection,
          normalizeBackupDataValue, mergeBackupDataSections, extractBackupSections,
          triggerBackupDownload, encodeBackupDataUrl, openBackupFallbackWindow,
          downloadBackupPayload, isAutoBackupName, parseAutoBackupName,
          SESSION_AUTO_BACKUP_NAME_PREFIX, SESSION_AUTO_BACKUP_DELETION_PREFIX */
/* global FEEDBACK_TEMPERATURE_MIN: true, FEEDBACK_TEMPERATURE_MAX_LIMIT: true */
/* global getDiagramManualPositions, setManualDiagramPositions,
          normalizeDiagramPositionsInput, ensureAutoBackupsFromProjects */
/* global getMountVoltagePreferencesClone,
          mountVoltageResetButton,
          resetMountVoltagePreferences, updateMountVoltageInputsFromState,
          applyMountVoltagePreferences, getMountVoltageStorageKeyName,
          getMountVoltageStorageBackupKeyName,
          parseStoredMountVoltages, SUPPORTED_MOUNT_VOLTAGE_TYPES,
          DEFAULT_MOUNT_VOLTAGES, mountVoltageInputs, parseVoltageValue */
/* global requestPersistentStorage */

let missingMountVoltageWarnings = null;

function resolveMissingMountVoltageWarnings() {
  if (missingMountVoltageWarnings instanceof Set) {
    return missingMountVoltageWarnings;
  }

  const candidateScopes = [
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
    try {
      const existing = scope.__cineMissingMountVoltageWarnings;
      if (existing instanceof Set) {
        missingMountVoltageWarnings = existing;
        return existing;
      }
    } catch (readError) {
      void readError;
    }
  }

  const created = new Set();
  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    try {
      scope.__cineMissingMountVoltageWarnings = created;
      break;
    } catch (assignError) {
      void assignError;
    }
  }

  missingMountVoltageWarnings = created;
  return created;
}

function warnMissingMountVoltageHelper(helperName, error) {
  const warnings = resolveMissingMountVoltageWarnings();
  const key = typeof helperName === 'string' && helperName ? helperName : 'unknown';
  if (warnings.has(key)) {
    return;
  }
  warnings.add(key);
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    const message = `Mount voltage helper "${key}" is unavailable; using defaults to protect user data.`;
    if (error) {
      console.warn(message, error);
    } else {
      console.warn(message);
    }
  }
}

// Lazily create globally shared placeholders so that other modules can safely
// attach state without mutating the global namespace unexpectedly. This keeps
// backwards compatibility with legacy entry points.
function ensureSessionRuntimePlaceholder(name, fallbackValue) {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  const fallbackProvider =
    typeof fallbackValue === 'function'
      ? fallbackValue
      : () => fallbackValue;

  if (!scope || typeof scope !== 'object') {
    return fallbackProvider();
  }

  try {
    if (typeof scope[name] === 'undefined') {
      scope[name] = fallbackProvider();
    }
    return scope[name];
  } catch (placeholderError) {
    void placeholderError;
    return fallbackProvider();
  }
}

function detectPrimaryGlobalScope() {
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
  return null;
}

function whenGlobalValueAvailable(name, validator, onResolve, options = {}) {
  if (typeof name !== 'string' || !name) {
    return false;
  }
  if (typeof validator !== 'function' || typeof onResolve !== 'function') {
    return false;
  }

  const scope = detectPrimaryGlobalScope();
  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return false;
  }

  const attemptsLimit = typeof options.maxAttempts === 'number' ? options.maxAttempts : 150;
  const continueIndefinitely = attemptsLimit < 0;
  const interval = typeof options.interval === 'number' && options.interval > 0 ? options.interval : 200;

  const invokeResolve = value => {
    try {
      onResolve(value);
    } catch (handlerError) {
      if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
        console.error(`whenGlobalValueAvailable: handler for ${name} threw.`, handlerError);
      }
    }
  };

  const attempt = value => {
    if (!validator(value)) {
      return false;
    }
    invokeResolve(value);
    return true;
  };

  const initialCandidate = (() => {
    try {
      return scope[name];
    } catch (accessError) {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn(`whenGlobalValueAvailable: unable to read ${name} during initial attempt.`, accessError);
      }
      return undefined;
    }
  })();

  if (attempt(initialCandidate)) {
    return true;
  }

  let attempts = 0;
  let cancelled = false;
  const timers = [];

  const clearTimers = () => {
    cancelled = true;
    for (let index = 0; index < timers.length; index += 1) {
      try {
        clearTimeout(timers[index]);
      } catch (clearError) {
        void clearError;
      }
    }
    timers.length = 0;
  };

  const handleTimeout = () => {
    if (typeof options.onTimeout === 'function') {
      try {
        options.onTimeout();
      } catch (timeoutError) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn(`whenGlobalValueAvailable: timeout handler for ${name} failed.`, timeoutError);
        }
      }
    }
  };

  const poll = () => {
    if (cancelled) {
      return;
    }

    attempts += 1;

    let candidate = undefined;
    try {
      candidate = scope[name];
    } catch (accessError) {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn(`whenGlobalValueAvailable: unable to read ${name} during polling.`, accessError);
      }
      candidate = undefined;
    }

    if (attempt(candidate)) {
      clearTimers();
      return;
    }

    if (!continueIndefinitely && attempts >= attemptsLimit) {
      clearTimers();
      handleTimeout();
      return;
    }

    const handle = setTimeout(poll, interval);
    timers.push(handle);
  };

  const initialHandle = setTimeout(poll, interval);
  timers.push(initialHandle);

  return true;
}

function getSessionRuntimeScopes() {
  const scopes = [];

  const addScope = candidate => {
    if (!candidate || typeof candidate !== 'object') {
      return;
    }
    if (scopes.indexOf(candidate) === -1) {
      scopes.push(candidate);
    }
  };

  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      addScope(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }

  addScope(typeof globalThis !== 'undefined' ? globalThis : null);
  addScope(typeof window !== 'undefined' ? window : null);
  addScope(typeof self !== 'undefined' ? self : null);
  addScope(typeof global !== 'undefined' ? global : null);

  return scopes;
}

function resolveModuleApi(name, validator) {
  if (typeof name !== 'string' || !name) {
    return null;
  }

  const validate = typeof validator === 'function' ? validator : value => !!value;

  const seen = new Set();
  const queue = [];

  const enqueueScope = candidate => {
    if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      return;
    }
    if (seen.has(candidate)) {
      return;
    }
    seen.add(candidate);
    queue.push(candidate);
  };

  const nestedKeys = [
    'CORE_SHARED',
    'CORE_GLOBAL_SCOPE',
    'CORE_AGGREGATED_EXPORTS',
    'CORE_RUNTIME_SCOPE',
    'CORE_PART2_RUNTIME_SCOPE',
    'CORE_SCOPE',
    'CORE_SHARED_SCOPE_PART2',
    'cine',
    'cineGlobals',
    'cineModuleGlobals',
    'cineModuleBase',
    'cineModuleContext',
    'cineRuntime',
    'cinePersistence',
    'cineOffline',
    'cineUi',
    'APP',
    'app',
    '__cineGlobal',
    '__cineScope',
    '__cineModules',
    '__cineExports',
    '__cineRuntime',
  ];

  const checkCandidate = candidate => {
    if (!candidate) {
      return null;
    }
    try {
      if (validate(candidate)) {
        return candidate;
      }
    } catch (validationError) {
      void validationError;
    }
    return null;
  };

  const tryResolveFromScope = scope => {
    let directCandidate;
    try {
      directCandidate = scope[name];
    } catch (directError) {
      void directError;
      directCandidate = undefined;
    }
    const validatedDirect = checkCandidate(directCandidate);
    if (validatedDirect) {
      return validatedDirect;
    }

    let moduleGlobals;
    try {
      moduleGlobals = scope.cineModuleGlobals;
    } catch (globalsError) {
      void globalsError;
      moduleGlobals = null;
    }
    if (moduleGlobals && typeof moduleGlobals.getModule === 'function') {
      try {
        const viaGlobals = moduleGlobals.getModule(name);
        const validatedGlobal = checkCandidate(viaGlobals);
        if (validatedGlobal) {
          return validatedGlobal;
        }
      } catch (globalLookupError) {
        void globalLookupError;
      }
    }

    let registry;
    try {
      registry = scope.cineModules;
    } catch (registryError) {
      void registryError;
      registry = null;
    }
    if (registry && typeof registry.get === 'function') {
      try {
        const viaRegistry = registry.get(name);
        const validatedRegistry = checkCandidate(viaRegistry);
        if (validatedRegistry) {
          return validatedRegistry;
        }
      } catch (registryLookupError) {
        void registryLookupError;
      }
    }

    return null;
  };

  enqueueScope(detectPrimaryGlobalScope());
  const runtimeScopes = getSessionRuntimeScopes();
  for (let index = 0; index < runtimeScopes.length; index += 1) {
    enqueueScope(runtimeScopes[index]);
  }

  while (queue.length) {
    const scope = queue.shift();
    if (!scope) {
      continue;
    }

    const resolved = tryResolveFromScope(scope);
    if (resolved) {
      return resolved;
    }

    for (let index = 0; index < nestedKeys.length; index += 1) {
      const key = nestedKeys[index];
      let nested;
      try {
        nested = scope[key];
      } catch (nestedError) {
        void nestedError;
        nested = undefined;
      }
      if (nested) {
        enqueueScope(nested);
      }
    }
  }

  return null;
}

function normalizeVersionValue(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function resolveKnownAppVersion(explicitVersion) {
  const normalizedExplicit = normalizeVersionValue(explicitVersion);
  if (normalizedExplicit) {
    return normalizedExplicit;
  }

  try {
    if (typeof APP_VERSION === 'string') {
      const normalized = normalizeVersionValue(APP_VERSION);
      if (normalized) {
        return normalized;
      }
    }
  } catch (appVersionError) {
    void appVersionError;
  }

  const seen = new Set();
  const queue = [];

  const enqueueCandidate = value => {
    if (!value) {
      return;
    }
    const type = typeof value;
    if (type !== 'object' && type !== 'function') {
      return;
    }
    if (seen.has(value)) {
      return;
    }
    seen.add(value);
    queue.push(value);
  };

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    enqueueCandidate(scopes[index]);
  }

  try {
    if (typeof CORE_SHARED !== 'undefined' && CORE_SHARED) {
      enqueueCandidate(CORE_SHARED);
    }
  } catch (coreSharedError) {
    void coreSharedError;
  }

  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      enqueueCandidate(CORE_GLOBAL_SCOPE);
    }
  } catch (coreGlobalError) {
    void coreGlobalError;
  }

  const versionKeys = ['APP_VERSION', 'appVersion', 'applicationVersion', 'version'];
  const nestedKeys = [
    'CORE_SHARED',
    'CORE_GLOBAL_SCOPE',
    'CORE_AGGREGATED_EXPORTS',
    'CORE_RUNTIME_SCOPE',
    'CORE_PART2_RUNTIME_SCOPE',
    'CORE_SCOPE',
    'CORE_SHARED_SCOPE_PART2',
    'cineCoreShared',
    'cineModules',
    'cineModuleGlobals',
    'cineModuleBase',
    'cineModuleContext',
    'cineRuntime',
    'cinePersistence',
    'cineOffline',
    'cineUi',
    'cineGlobals',
    'cine',
    'APP',
    'app',
    'globalScope',
    'scope',
    'exports',
    'module',
    'modules',
    'environment',
    'context',
    'runtime',
    'shared',
    'globals',
    '__cineGlobal',
    '__cineScope',
    '__cineModules',
    '__cineExports',
    '__cineRuntime',
    'details',
    'meta',
    'metadata',
    'build',
    'buildInfo',
  ];

  while (queue.length) {
    const candidate = queue.shift();
    if (!candidate) {
      continue;
    }

    for (let index = 0; index < versionKeys.length; index += 1) {
      const key = versionKeys[index];
      let value;
      try {
        value = candidate[key];
      } catch (readError) {
        value = undefined;
        void readError;
      }
      const normalized = normalizeVersionValue(value);
      if (normalized) {
        return normalized;
      }
    }

    for (let index = 0; index < nestedKeys.length; index += 1) {
      const nestedKey = nestedKeys[index];
      let nestedValue;
      try {
        nestedValue = candidate[nestedKey];
      } catch (nestedError) {
        nestedValue = null;
        void nestedError;
      }
      enqueueCandidate(nestedValue);
    }

    let keys = [];
    try {
      keys = Object.keys(candidate);
    } catch (keysError) {
      keys = [];
      void keysError;
    }
    const limitedKeys = keys.length > 50 ? keys.slice(0, 50) : keys;
    for (let index = 0; index < limitedKeys.length; index += 1) {
      const key = limitedKeys[index];
      if (!/(version|core|cine|shared|global|app)/i.test(key)) {
        continue;
      }
      let nested;
      try {
        nested = candidate[key];
      } catch (valueError) {
        nested = null;
        void valueError;
      }
      enqueueCandidate(nested);
    }
  }

  return null;
}

const ACTIVE_APP_VERSION = resolveKnownAppVersion(
  typeof APP_VERSION === 'string' ? APP_VERSION : null,
);

function resolveMountVoltageNamespace() {
  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const namespace = scope.cineCoreMountVoltage;
      if (namespace && typeof namespace === 'object') {
        return namespace;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }

  return null;
}

function resolveMountVoltageRuntimeExports() {
  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const exports = scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS;
      if (exports && typeof exports === 'object') {
        return exports;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }

  return null;
}

function getSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
  }

  const mountNamespace = resolveMountVoltageNamespace();
  if (mountNamespace && typeof mountNamespace[name] === 'function') {
    return mountNamespace[name];
  }

  const mountRuntimeExports = resolveMountVoltageRuntimeExports();
  if (mountRuntimeExports && typeof mountRuntimeExports[name] === 'function') {
    return mountRuntimeExports[name];
  }

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    let candidate = null;
    try {
      candidate = scope[name];
    } catch (resolveError) {
      candidate = null;
      void resolveError;
    }

    if (typeof candidate === 'function') {
      return candidate;
    }
  }

  return null;
}

function resolveSettingsLoggingResolver() {
  if (typeof require === 'function') {
    try {
      const required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (error) {
      void error;
    }
  }

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }

  return null;
}

function resolveLegacySettingsLogger() {
  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }
    try {
      const logging = scope.cineLogging;
      if (logging && typeof logging.createLogger === 'function') {
        try {
          return logging.createLogger('settings', { meta: { source: 'app-session' } });
        } catch (creationError) {
          try {
            if (typeof logging.error === 'function') {
              logging.error(
                'Failed to create settings logger',
                creationError,
                { namespace: 'settings-bootstrap' },
              );
            }
          } catch (logError) {
            void logError;
          }
        }
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}

const settingsLogger = (() => {
  const resolver = resolveSettingsLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      const logger = resolver.resolveLogger('settings', { meta: { source: 'app-session' } });
      if (logger) {
        return logger;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }

  return resolveLegacySettingsLogger();
})();

function logSettingsEvent(level, message, detail, meta) {
  const normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  let handled = false;
  if (settingsLogger && typeof settingsLogger[normalizedLevel] === 'function') {
    try {
      settingsLogger[normalizedLevel](message, detail, meta);
      handled = true;
    } catch (loggingError) {
      handled = false;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Settings logger invocation failed', loggingError);
      }
    }
  }
  if (handled || typeof console === 'undefined' || !console) {
    return;
  }
  let fallback = null;
  if (normalizedLevel === 'error' && typeof console.error === 'function') {
    fallback = console.error;
  } else if (normalizedLevel === 'warn' && typeof console.warn === 'function') {
    fallback = console.warn;
  } else if (typeof console.info === 'function') {
    fallback = console.info;
  } else if (typeof console.log === 'function') {
    fallback = console.log;
  }
  if (typeof fallback === 'function') {
    try {
      fallback.call(console, `[settings] ${message}`, detail || null, meta || null);
    } catch (consoleError) {
      void consoleError;
    }
  }
}

let pendingSettingsOpenContext = null;

function prepareSettingsOpenContext(context) {
  if (context && typeof context === 'object') {
    pendingSettingsOpenContext = { ...context };
  } else {
    pendingSettingsOpenContext = null;
  }
}

function consumeSettingsOpenContext(defaultContext) {
  const context = pendingSettingsOpenContext;
  pendingSettingsOpenContext = null;
  if (context && typeof context === 'object') {
    return { ...context };
  }
  if (defaultContext && typeof defaultContext === 'object') {
    return { ...defaultContext };
  }
  return { reason: 'settings-button' };
}

function resolveSettingsDialog() {
  if (typeof settingsDialog !== 'undefined' && settingsDialog) {
    return settingsDialog;
  }
  if (typeof document !== 'undefined' && document) {
    try {
      return document.getElementById('settingsDialog');
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}

function resolveSettingsButton() {
  if (typeof settingsButton !== 'undefined' && settingsButton) {
    return settingsButton;
  }
  if (typeof document !== 'undefined' && document) {
    try {
      return document.getElementById('settingsButton');
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}

function ensureDeferredScriptsLoaded(reason) {
  const scope = (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  if (!scope) return null;

  let result = null;

  try {
    if (typeof scope.cineEnsureDeferredScriptsLoaded === 'function') {
      result = scope.cineEnsureDeferredScriptsLoaded({ reason });
    }
  } catch (ensureError) {
    void ensureError;
    result = null;
  }

  if (!result) {
    try {
      result = scope.cineDeferredScriptsReady;
    } catch (readError) {
      void readError;
      result = null;
    }
  }

  return result;
}

function ensureOnboardingTourReady(reason) {
  const scope = (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  if (!scope) {
    return null;
  }

  let loader = null;

  try {
    if (typeof scope.cineEnsureOnboardingTourLoaded === 'function') {
      loader = scope.cineEnsureOnboardingTourLoaded(reason);
    }
  } catch (error) {
    void error;
    loader = null;
  }

  if (loader && typeof loader.then === 'function') {
    loader.catch(loadError => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Onboarding tour module failed to pre-load for help interactions.', loadError);
      }
    });
  }

  return loader;
}

function requestSettingsOpen(context) {
  const dialog = resolveSettingsDialog();
  const trigger = resolveSettingsButton();
  const openBefore = dialog
    ? (typeof isDialogOpen === 'function' ? isDialogOpen(dialog) : !!(dialog && dialog.open))
    : false;
  const detail = context && typeof context === 'object' ? { ...context } : {};
  if (typeof detail.openBefore !== 'boolean') {
    detail.openBefore = openBefore;
  }
  ensureDeferredScriptsLoaded('settings-open');
  if (trigger && typeof trigger.click === 'function') {
    prepareSettingsOpenContext(detail);
    try {
      trigger.click();
    } catch (clickError) {
      prepareSettingsOpenContext(null);
      logSettingsEvent('error', 'Settings dialog open request failed during click',
        { ...detail, buttonAvailable: true },
        { action: 'open-request' },
      );
      throw clickError;
    }
    return true;
  }
  logSettingsEvent('warn', 'Settings dialog open request unavailable',
    { ...detail, buttonAvailable: false },
    { action: 'open-request' },
  );
  return false;
}

function resolveCompatibilityTexts(langTexts, fallbackTexts) {
  const translations = typeof texts === 'object' && texts ? texts : {};
  const resolvedFallback = fallbackTexts || translations.en || {};
  const lang = typeof currentLang === 'string' && translations[currentLang]
    ? currentLang
    : 'en';
  const resolvedLang = langTexts || translations[lang] || resolvedFallback;
  return { lang, langTexts: resolvedLang, fallbackTexts: resolvedFallback };
}

function ensureMeaningfulValue(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  return false;
}

const formatNumberForComparison = ensureSessionRuntimePlaceholder(
  'formatNumberForComparison',
  () => {
    const formatterCache = new Map();

    const getFormatter = (lang, hasFraction) => {
      const cacheKey = `${lang}|${hasFraction ? 'fraction' : 'integer'}`;
      if (formatterCache.has(cacheKey)) {
        return formatterCache.get(cacheKey);
      }

      if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        try {
          const formatter = new Intl.NumberFormat(lang, {
            maximumFractionDigits: hasFraction ? 2 : 0,
          });
          formatterCache.set(cacheKey, formatter);
          return formatter;
        } catch (error) {
          console.warn('Unable to create comparison number formatter', error);
        }
      }

      formatterCache.set(cacheKey, null);
      return null;
    };

    return (input) => {
      if (input === null || input === undefined) {
        return '';
      }

      const numeric = typeof input === 'number'
        ? input
        : Number(typeof input === 'string' ? input.trim() : input);

      if (!Number.isFinite(numeric)) {
        return typeof input === 'string' ? input : String(input);
      }

      const { lang } = resolveCompatibilityTexts();
      const hasFraction = Math.abs(numeric % 1) > Number.EPSILON;
      const formatter = getFormatter(lang, hasFraction);

      if (formatter) {
        try {
          return formatter.format(numeric);
        } catch (error) {
          console.warn('Comparison number formatting failed', error);
        }
      }

      try {
        return numeric.toLocaleString(lang);
      } catch (localeError) {
        void localeError;
      }

      return String(numeric);
    };
  },
);

const getManualDownloadFallbackMessage = ensureSessionRuntimePlaceholder(
  'getManualDownloadFallbackMessage',
  () => () => {
    const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
    return langTexts.manualDownloadFallback
      || fallbackTexts.manualDownloadFallback
      || 'The download did not start automatically. A new tab opened with the file contents so you can copy or save them manually.';
  },
);

const getManualDownloadCopyHint = ensureSessionRuntimePlaceholder(
  'getManualDownloadCopyHint',
  () => () => {
    const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
    return langTexts.manualDownloadCopyHint
      || fallbackTexts.manualDownloadCopyHint
      || 'Select all the text below and copy it to keep the file safe.';
  },
);

let backupDiffOptionsCache = ensureSessionRuntimePlaceholder(
  'backupDiffOptionsCache',
  () => [],
);

let backupDiffState = ensureSessionRuntimePlaceholder(
  'backupDiffState',
  () => ({ baseline: '', comparison: '' }),
);

const RESTORE_COMPATIBILITY_CORE_KEYS = [
  'devices',
  'setups',
  'project',
  'projects',
  'gearList',
  'favorites',
];

const RESTORE_COMPATIBILITY_OPTIONAL_KEYS = [
  'autoGearRules',
  'autoGearPresets',
  'autoGearBackups',
  'autoGearMonitorDefaults',
  'autoGearActivePresetId',
  'autoGearAutoPresetId',
  'autoGearShowBackups',
  'autoGearBackupRetention',
  'fullBackups',
  'fullBackupHistory',
  'session',
];

const RESTORE_COMPATIBILITY_STORAGE_KEYS = [
  'accentColor',
  'fontSize',
  'fontFamily',
  'language',
  'showAutoBackups',
  'customLogo',
  'customFonts',
];

const RESTORE_SECTION_LABEL_OVERRIDES = {
  autoGearRules: 'Automatic gear rules',
  autoGearPresets: 'Automatic gear presets',
  autoGearBackups: 'Automatic gear backups',
  autoGearMonitorDefaults: 'Monitor defaults',
  autoGearActivePresetId: 'Active auto gear preset',
  autoGearAutoPresetId: 'Auto gear auto preset',
  autoGearShowBackups: 'Auto gear backup visibility',
  autoGearBackupRetention: 'Auto gear backup retention',
  fullBackups: 'Full backups',
  fullBackupHistory: 'Full backup history',
  showAutoBackups: 'Automatic backup visibility',
};

function humanizeRestoreSectionKey(key) {
  if (RESTORE_SECTION_LABEL_OVERRIDES[key]) {
    return RESTORE_SECTION_LABEL_OVERRIDES[key];
  }
  if (typeof key !== 'string') {
    return String(key);
  }
  const spaced = key
    .replace(/[_\s-]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .trim();
  if (!spaced) {
    return key;
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function evaluateRestoreCompatibilitySections({ data, settingsSnapshot, sessionSnapshot }) {
  const normalizedData = data && typeof data === 'object' ? data : null;
  const normalizedSettings = settingsSnapshot && typeof settingsSnapshot === 'object'
    ? settingsSnapshot
    : null;
  const normalizedSession = sessionSnapshot && typeof sessionSnapshot === 'object'
    ? sessionSnapshot
    : null;

  const missingCore = [];
  const missingOptional = [];
  const missingStorage = [];

  const checkDataKey = (key, bucket) => {
    if (!normalizedData || !Object.prototype.hasOwnProperty.call(normalizedData, key)) {
      bucket.push(key);
      return;
    }
    if (!ensureMeaningfulValue(normalizedData[key])) {
      bucket.push(key);
    }
  };

  RESTORE_COMPATIBILITY_CORE_KEYS.forEach(key => checkDataKey(key, missingCore));
  RESTORE_COMPATIBILITY_OPTIONAL_KEYS.forEach(key => checkDataKey(key, missingOptional));

  if (!normalizedSession || !ensureMeaningfulValue(normalizedSession)) {
    if (!missingOptional.includes('session')) {
      missingOptional.push('session');
    }
  }

  RESTORE_COMPATIBILITY_STORAGE_KEYS.forEach(key => {
    if (!normalizedSettings || !Object.prototype.hasOwnProperty.call(normalizedSettings, key)) {
      missingStorage.push(key);
      return;
    }
    if (!ensureMeaningfulValue(normalizedSettings[key])) {
      missingStorage.push(key);
    }
  });

  return {
    missingCore,
    missingOptional,
    missingStorage,
  };
}

function describeMissingSections(label, items) {
  if (!label || !Array.isArray(items) || !items.length) {
    return '';
  }
  const bulletList = items
    .map(item => `• ${humanizeRestoreSectionKey(item)}`)
    .join('\n');
  return `${label}\n${bulletList}`;
}

function buildRestoreCompatibilityReport(options = {}) {
  const {
    langTexts: providedLangTexts,
    fallbackTexts: providedFallbackTexts,
    fileVersion,
    targetVersion,
    data,
    settingsSnapshot,
    sessionSnapshot,
    backupFileName,
  } = options;

  const { langTexts, fallbackTexts } = resolveCompatibilityTexts(
    providedLangTexts,
    providedFallbackTexts,
  );

  const evaluation = evaluateRestoreCompatibilitySections({
    data,
    settingsSnapshot,
    sessionSnapshot,
  });

  const getText = (key, fallback) => {
    if (langTexts && typeof langTexts[key] === 'string') {
      return langTexts[key];
    }
    if (fallbackTexts && typeof fallbackTexts[key] === 'string') {
      return fallbackTexts[key];
    }
    return fallback || '';
  };

  const messageParts = [];
  const summaryTitle = getText('restoreVersionSummaryTitle');
  if (summaryTitle) {
    messageParts.push(summaryTitle);
  }

  const unknownVersion = getText('restoreVersionUnknownVersion', 'unknown version');
  const headingTemplate = getText(
    'restoreVersionSummaryHeading',
    'This backup was created with {oldVersion} and you are running {newVersion}.',
  );
  const normalizedFileVersion = normalizeVersionValue(fileVersion);
  const normalizedTargetVersion =
    resolveKnownAppVersion(targetVersion)
    || ACTIVE_APP_VERSION
    || normalizeVersionValue(targetVersion);
  const heading = headingTemplate
    .replace('{oldVersion}', normalizedFileVersion || unknownVersion)
    .replace('{newVersion}', normalizedTargetVersion || unknownVersion);
  messageParts.push(heading);

  const warning = getText('restoreVersionWarning');
  if (warning) {
    messageParts.push(warning);
  }

  const coreSection = describeMissingSections(
    getText('restoreVersionCoreMissing', 'Not included in this backup:'),
    evaluation.missingCore,
  );
  if (coreSection) {
    messageParts.push(coreSection);
  }

  const storageSection = describeMissingSections(
    getText('restoreVersionStorageMissing', 'Stored preferences not included:'),
    evaluation.missingStorage,
  );
  if (storageSection) {
    messageParts.push(storageSection);
  }

  const optionalSection = describeMissingSections(
    getText('restoreVersionOptionalMissing', 'Optional items you may need to recreate:'),
    evaluation.missingOptional,
  );
  if (optionalSection) {
    messageParts.push(optionalSection);
  }

  if (
    !evaluation.missingCore.length
    && !evaluation.missingStorage.length
    && !evaluation.missingOptional.length
  ) {
    const noIssues = getText('restoreVersionNoIssues');
    if (noIssues) {
      messageParts.push(noIssues);
    }
  }

  if (backupFileName) {
    const backupLabel = getText('restoreVersionBackupLabel');
    if (backupLabel) {
      messageParts.push(backupLabel.replace('{fileName}', backupFileName));
    }
  }

  const tip = getText('restoreVersionTip');
  if (tip) {
    messageParts.push(tip);
  }

  const footer = getText('restoreVersionFooter');
  if (footer) {
    messageParts.push(footer);
  }

  return {
    evaluation,
    message: messageParts.filter(Boolean).join('\n\n'),
    langTexts,
    fallbackTexts,
  };
}

const buildRestoreVersionCompatibilityMessage = ensureSessionRuntimePlaceholder(
  'buildRestoreVersionCompatibilityMessage',
  () => (options = {}) => buildRestoreCompatibilityReport(options).message,
);

const verifyRestoredBackupIntegrity = ensureSessionRuntimePlaceholder(
  'verifyRestoredBackupIntegrity',
  () => (payload) => {
    const options = payload && typeof payload === 'object' && !Array.isArray(payload)
      && (payload.data || payload.settingsSnapshot || payload.sessionSnapshot)
      ? payload
      : { data: payload };

    const report = buildRestoreCompatibilityReport(options);
    const { evaluation, message, langTexts, fallbackTexts } = report;
    const missingCount = evaluation.missingCore.length
      + evaluation.missingStorage.length
      + evaluation.missingOptional.length;

    const warning = (langTexts && langTexts.restoreVersionWarning)
      || (fallbackTexts && fallbackTexts.restoreVersionWarning)
      || 'Backup created with a different version. Some features might not transfer.';

    const success = (langTexts && langTexts.restoreVersionNoIssues)
      || (fallbackTexts && fallbackTexts.restoreVersionNoIssues)
      || 'All modern data sections were found in this backup.';

    if (missingCount === 0) {
      return {
        notificationType: 'success',
        notificationMessage: success,
        alertMessage: '',
      };
    }

    return {
      notificationType: 'warning',
      notificationMessage: warning,
      alertMessage: message,
    };
  },
);

function invokeSessionRevertAccentColor() {
  const revertFn = getSessionRuntimeFunction('revertAccentColor');
  if (typeof revertFn !== 'function') {
    return;
  }

  try {
    revertFn();
  } catch (revertError) {
    console.warn('Failed to revert accent color', revertError);
  }
}

function invokeSessionOpenAutoGearEditor(...args) {
  const openFn = getSessionRuntimeFunction('openAutoGearEditor');
  if (typeof openFn !== 'function') {
    console.warn('Auto Gear editor runtime is not available yet.');
    return;
  }

  try {
    openFn(...args);
  } catch (openError) {
    console.warn('Failed to open Auto Gear editor', openError);
  }
}

ensureSessionRuntimePlaceholder('autoGearScenarioModeSelect', null);

const normalizeAccentValueSafe = ensureSessionRuntimePlaceholder(
  'normalizeAccentValue',
  () => value => (typeof value === 'string' ? value.trim().toLowerCase() : ''),
);

const isPlainObjectFallback = value => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isPlainObject = ensureSessionRuntimePlaceholder(
  'isPlainObject',
  () => isPlainObjectFallback,
);

const applyFontSizeSafe = ensureSessionRuntimePlaceholder(
  'applyFontSize',
  () => {
    const defaultUIScaleValues = {
      '--page-padding': 20,
      '--gap-size': 10,
      '--button-size': 32,
      '--border-radius': 5,
      '--form-label-width': 150,
      '--form-label-min-width': 120,
      '--form-action-width': 110,
    };
    const uiScaleProperties = Object.keys(defaultUIScaleValues);
    const baseUIScaleValues = { ...defaultUIScaleValues };
    let baseFontSize = null;

    const resolveBaseMetrics = () => {
      if (baseFontSize !== null) {
        return;
      }

      baseFontSize = 16;

      const root =
        typeof document !== 'undefined' && document
          ? document.documentElement
          : null;
      if (!root) {
        return;
      }

      try {
        const computed =
          typeof window !== 'undefined'
            && window
            && typeof window.getComputedStyle === 'function'
            ? window.getComputedStyle(root)
            : null;
        if (!computed) {
          return;
        }

        const computedFontSize = parseFloat(computed.fontSize);
        if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
          baseFontSize = computedFontSize;
        }

        for (let index = 0; index < uiScaleProperties.length; index += 1) {
          const prop = uiScaleProperties[index];
          const rawValue = computed.getPropertyValue(prop);
          const numericValue = parseFloat(rawValue);
          if (Number.isFinite(numericValue) && numericValue > 0) {
            baseUIScaleValues[prop] = numericValue;
          }
        }
      } catch (metricsError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to capture base UI scale metrics', metricsError);
        }
      }
    };

    return size => {
      const root =
        typeof document !== 'undefined' && document
          ? document.documentElement
          : null;
      if (!root) {
        return;
      }

      const numericSize = Number.parseFloat(size);
      if (!Number.isFinite(numericSize) || numericSize <= 0) {
        return;
      }

      resolveBaseMetrics();

      root.style.fontSize = `${numericSize}px`;

      const referenceFontSize = Number.isFinite(baseFontSize) && baseFontSize > 0
        ? baseFontSize
        : numericSize;
      const rawScale = referenceFontSize > 0 ? numericSize / referenceFontSize : 1;
      const scale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1;

      for (let index = 0; index < uiScaleProperties.length; index += 1) {
        const prop = uiScaleProperties[index];
        const baseValue = baseUIScaleValues[prop];
        if (Number.isFinite(baseValue) && baseValue > 0) {
          root.style.setProperty(prop, `${baseValue * scale}px`);
        }
      }

      root.style.setProperty('--ui-scale', String(scale));
    };
  },
);

const applyFontFamilySafe = ensureSessionRuntimePlaceholder(
  'applyFontFamily',
  () => family => {
    const root =
      typeof document !== 'undefined' && document ? document.documentElement : null;
    if (!root) {
      return;
    }

    try {
      root.style.setProperty('--font-family', family || '');
    } catch (fontFamilyError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to apply font family', fontFamilyError);
      }
    }
  },
);

const downloadDiagramButton = ensureSessionRuntimePlaceholder(
  'downloadDiagramBtn',
  () => {
    if (
      typeof document === 'undefined'
      || !document
      || typeof document.getElementById !== 'function'
    ) {
      return null;
    }

    try {
      return document.getElementById('downloadDiagram');
    } catch (resolveError) {
      void resolveError;
      return null;
    }
  },
);

const gridSnapToggleButton = ensureSessionRuntimePlaceholder(
  'gridSnapToggleBtn',
  () => {
    if (
      typeof document === 'undefined'
      || !document
      || typeof document.getElementById !== 'function'
    ) {
      return null;
    }

    try {
      return document.getElementById('gridSnapToggle');
    } catch (resolveError) {
      void resolveError;
      return null;
    }
  },
);

const GRID_SNAP_STORAGE_KEY = '__cineGridSnapState';

const readGridSnapState = () => {
  try {
    if (typeof getGridSnapState === 'function') {
      return Boolean(getGridSnapState());
    }
  } catch (gridSnapReadError) {
    void gridSnapReadError;
  }

  if (typeof gridSnap !== 'undefined') {
    try {
      return Boolean(gridSnap);
    } catch (legacyGridSnapError) {
      void legacyGridSnapError;
    }
  }

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      const stored = scope[GRID_SNAP_STORAGE_KEY];
      if (typeof stored === 'boolean') {
        return stored;
      }
    } catch (storedReadError) {
      void storedReadError;
    }

    try {
      const legacy = scope.gridSnap;
      if (typeof legacy === 'boolean') {
        return legacy;
      }
    } catch (legacyScopeError) {
      void legacyScopeError;
    }
  }

  return false;
};

const writeGridSnapState = value => {
  const desired = value === true;

  try {
    if (typeof setGridSnapState === 'function') {
      return Boolean(setGridSnapState(desired));
    }
  } catch (gridSnapWriteError) {
    void gridSnapWriteError;
  }

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      scope[GRID_SNAP_STORAGE_KEY] = desired;
    } catch (assignStorageError) {
      try {
        Object.defineProperty(scope, GRID_SNAP_STORAGE_KEY, {
          configurable: true,
          writable: true,
          value: desired,
        });
      } catch (defineStorageError) {
        void defineStorageError;
      }
    }

    try {
      scope.gridSnap = desired;
    } catch (assignLegacyError) {
      try {
        Object.defineProperty(scope, 'gridSnap', {
          configurable: true,
          writable: true,
          value: desired,
        });
      } catch (defineLegacyError) {
        void defineLegacyError;
      }
    }
  }

  try {
    if (typeof applyLegacyGridSnapValue === 'function') {
      return Boolean(applyLegacyGridSnapValue(desired));
    }
  } catch (legacyGridSnapError) {
    void legacyGridSnapError;
  }

  return desired;
};

const resolveDiagramContainer = () => {
  if (typeof setupDiagramContainer !== 'undefined' && setupDiagramContainer) {
    return setupDiagramContainer;
  }
  if (
    typeof document !== 'undefined'
    && document
    && typeof document.getElementById === 'function'
  ) {
    try {
      return document.getElementById('diagramArea');
    } catch (diagramResolveError) {
      void diagramResolveError;
    }
  }
  return null;
};

const applyGridSnapUiState = enabled => {
  const diagramContainer = resolveDiagramContainer();
  if (gridSnapToggleButton) {
    gridSnapToggleButton.classList.toggle('active', enabled);
    gridSnapToggleButton.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
  if (diagramContainer) {
    diagramContainer.classList.toggle('grid-snap', enabled);
  }
};

applyGridSnapUiState(readGridSnapState());

function getGlobalCineUi() {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  if (!scope || typeof scope !== 'object') {
    return null;
  }

  try {
    const candidate = scope.cineUi;
    return candidate && typeof candidate === 'object' ? candidate : null;
  } catch (error) {
    void error;
    return null;
  }
}

function isCineUiEntryRegistered(registry, name) {
  if (!registry || typeof registry !== 'object') {
    return false;
  }

  if (typeof registry.get === 'function') {
    try {
      return Boolean(registry.get(name));
    } catch (error) {
      void error;
    }
  }

  if (typeof registry.list === 'function') {
    try {
      const entries = registry.list();
      return Array.isArray(entries) && entries.indexOf(name) !== -1;
    } catch (error) {
      void error;
    }
  }

  return false;
}

function registerCineUiEntries(registry, entries, warningMessage) {
  if (!registry || typeof registry.register !== 'function') {
    return;
  }

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry || typeof entry.name !== 'string') {
      continue;
    }

    if (isCineUiEntryRegistered(registry, entry.name)) {
      continue;
    }

    try {
      registry.register(entry.name, entry.value);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(warningMessage, error);
      }
    }
  }
}

function safeLoadStoredLogoPreview() {
  if (typeof loadStoredLogoPreview !== 'function') {
    return;
  }

  try {
    loadStoredLogoPreview();
  } catch (error) {
    console.warn('Failed to load stored logo preview', error);
  }
}

function areSessionEntriesRegistered(cineUi) {
  if (!cineUi || typeof cineUi !== 'object') {
    return false;
  }

  const controllers = cineUi.controllers;
  const interactions = cineUi.interactions;
  const help = cineUi.help;

  return (
    isCineUiEntryRegistered(controllers, 'backupSettings')
    && isCineUiEntryRegistered(controllers, 'restoreSettings')
    && isCineUiEntryRegistered(interactions, 'performBackup')
    && isCineUiEntryRegistered(interactions, 'openRestorePicker')
    && isCineUiEntryRegistered(interactions, 'applyRestoreFile')
    && isCineUiEntryRegistered(help, 'backupSettings')
    && isCineUiEntryRegistered(help, 'restoreSettings')
  );
}

let sessionCineUiRegistered = areSessionEntriesRegistered(getGlobalCineUi());

function enqueueCineUiRegistration(callback) {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  if (!scope || typeof callback !== 'function') {
    return;
  }

  try {
    const existing = scope.cineUi && typeof scope.cineUi === 'object'
      ? scope.cineUi
      : null;

    if (existing) {
      callback(existing);
      return;
    }
  } catch (callbackError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cineUi registration callback (session) failed', callbackError);
    }
    return;
  }

  const key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }

  scope[key].push(callback);
}

enqueueCineUiRegistration(registerSessionCineUiInternal);

const SESSION_GLOBAL_SCOPE =
  (typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE)
  || (typeof globalThis !== 'undefined' ? globalThis : null)
  || (typeof window !== 'undefined' ? window : null)
  || (typeof self !== 'undefined' ? self : null)
  || (typeof global !== 'undefined' ? global : null)
  || null;

const SESSION_DEFAULT_ACCENT_COLOR_FALLBACK = '#001589';
const SESSION_HIGH_CONTRAST_ACCENT_COLOR_FALLBACK = '#ffffff';

const resolvedDefaultAccentColor = (() => {
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR === 'string') {
    const candidate = SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR.trim();
    if (candidate) {
      return candidate;
    }
  }
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.accentColor === 'string') {
    const seeded = SESSION_GLOBAL_SCOPE.accentColor.trim();
    if (seeded) {
      return seeded;
    }
  }
  return SESSION_DEFAULT_ACCENT_COLOR_FALLBACK;
})();

const resolvedDefaultAccentNormalized =
  typeof resolvedDefaultAccentColor === 'string'
    ? resolvedDefaultAccentColor.toLowerCase()
    : SESSION_DEFAULT_ACCENT_COLOR_FALLBACK.toLowerCase();

const resolvedHighContrastAccentColor = (() => {
  if (
    SESSION_GLOBAL_SCOPE
    && typeof SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR === 'string'
  ) {
    const candidate = SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR.trim();
    if (candidate) {
      return candidate;
    }
  }
  return SESSION_HIGH_CONTRAST_ACCENT_COLOR_FALLBACK;
})();

const resolvedAccentColor = (() => {
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.accentColor === 'string') {
    const candidate = SESSION_GLOBAL_SCOPE.accentColor.trim();
    if (candidate) {
      return candidate;
    }
  }
  return resolvedDefaultAccentColor;
})();

const hasDefaultAccentColor =
  typeof DEFAULT_ACCENT_COLOR === 'string'
  && DEFAULT_ACCENT_COLOR.trim();
if (!hasDefaultAccentColor) {
  try {
    DEFAULT_ACCENT_COLOR = resolvedDefaultAccentColor;
  } catch (assignDefaultAccentError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR = resolvedDefaultAccentColor;
    }
    void assignDefaultAccentError;
  }
}

const hasDefaultAccentNormalized =
  typeof DEFAULT_ACCENT_NORMALIZED === 'string'
  && DEFAULT_ACCENT_NORMALIZED;
if (!hasDefaultAccentNormalized) {
  try {
    DEFAULT_ACCENT_NORMALIZED = resolvedDefaultAccentNormalized;
  } catch (assignNormalizedAccentError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_NORMALIZED = resolvedDefaultAccentNormalized;
    }
    void assignNormalizedAccentError;
  }
}

const hasHighContrastAccent =
  typeof HIGH_CONTRAST_ACCENT_COLOR === 'string'
  && HIGH_CONTRAST_ACCENT_COLOR.trim();
if (!hasHighContrastAccent) {
  try {
    HIGH_CONTRAST_ACCENT_COLOR = resolvedHighContrastAccentColor;
  } catch (assignHighContrastAccentError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR = resolvedHighContrastAccentColor;
    }
    void assignHighContrastAccentError;
  }
}

const hasAccentColor =
  typeof accentColor === 'string'
  && accentColor.trim();
if (!hasAccentColor) {
  try {
    accentColor = resolvedAccentColor;
  } catch (assignAccentColorError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.accentColor = resolvedAccentColor;
    }
    void assignAccentColorError;
  }
}

const hasPrevAccentColor =
  typeof prevAccentColor === 'string'
  && prevAccentColor.trim();
if (!hasPrevAccentColor) {
  try {
    prevAccentColor = resolvedAccentColor;
  } catch (assignPrevAccentError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.prevAccentColor = resolvedAccentColor;
    }
    void assignPrevAccentError;
  }
}

if (typeof restoringSession !== 'boolean') {
  try {
    restoringSession = false;
  } catch (assignRestoringSessionError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.restoringSession = false;
    }
    void assignRestoringSessionError;
  }
}

if (typeof filterSelectElem === 'undefined') {
  try {
    filterSelectElem = null;
  } catch (assignFilterSelectError) {
    if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE === 'object') {
      SESSION_GLOBAL_SCOPE.filterSelectElem = null;
    }
    void assignFilterSelectError;
  }
}

function resolveFilterSelectElement() {
  if (
    filterSelectElem &&
    typeof filterSelectElem === 'object' &&
    typeof filterSelectElem.tagName === 'string'
  ) {
    return filterSelectElem;
  }
  if (typeof document === 'undefined' || !document) {
    return null;
  }
  try {
    const resolved = document.getElementById('filter');
    if (resolved) {
      filterSelectElem = resolved;
      return resolved;
    }
  } catch (resolveFilterSelectError) {
    void resolveFilterSelectError;
  }
  return filterSelectElem;
}

function callSessionCoreFunction(functionName, args = [], options = {}) {
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }

  const scope =
    (typeof globalThis !== 'undefined' ? globalThis : null)
    || (typeof window !== 'undefined' ? window : null)
    || (typeof self !== 'undefined' ? self : null)
    || (typeof global !== 'undefined' ? global : null);

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

  if (options && options.defer === true) {
    const queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
    if (queue) {
      queue.push(() => {
        callSessionCoreFunction(functionName, args, { ...options, defer: false });
      });
    }
  }

  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue')
    ? options.defaultValue
    : undefined;
}

function ensureSessionRuntimeFunction(functionName, options = {}) {
  return ensureSessionRuntimePlaceholder(functionName, () => {
    const proxy = (...invocationArgs) => callSessionCoreFunction(functionName, invocationArgs, options);
    try {
      Object.defineProperty(proxy, '__cineSessionProxy__', {
        value: true,
        writable: false,
        enumerable: false,
      });
    } catch (defineProxyFlagError) {
      void defineProxyFlagError;
      try {
        proxy.__cineSessionProxy__ = true;
      } catch (assignProxyFlagError) {
        void assignProxyFlagError;
      }
    }
    return proxy;
  });
}

const AUTO_GEAR_RUNTIME_HANDLERS = [
  'handleAutoGearImportSelection',
  'handleAutoGearPresetSelection',
  'handleAutoGearSavePreset',
  'handleAutoGearDeletePreset',
  'handleAutoGearShowBackupsToggle',
  'handleAutoGearConditionShortcut',
  'saveAutoGearRuleFromEditor',
];

for (let index = 0; index < AUTO_GEAR_RUNTIME_HANDLERS.length; index += 1) {
  const handlerName = AUTO_GEAR_RUNTIME_HANDLERS[index];
  ensureSessionRuntimeFunction(handlerName, { defer: true });
}

const AUTO_GEAR_RUNTIME_FUNCTIONS = [
  'setAutoGearSummaryFocus',
  'focusAutoGearRuleById',
  'setAutoGearSearchQuery',
  'setAutoGearScenarioFilter',
  'clearAutoGearFilters',
];

for (let index = 0; index < AUTO_GEAR_RUNTIME_FUNCTIONS.length; index += 1) {
  const functionName = AUTO_GEAR_RUNTIME_FUNCTIONS[index];
  ensureSessionRuntimeFunction(functionName, { defer: true });
}

function getSessionCoreValue(functionName, options = {}) {
  const defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue')
    ? options.defaultValue
    : '';
  const value = callSessionCoreFunction(functionName, [], { defaultValue });
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

function deriveSessionProjectInfo(info) {
  const fallback = info && typeof info === 'object' ? { ...info } : {};
  const derived = callSessionCoreFunction('deriveProjectInfo', [info], { defaultValue: fallback });

  if (derived && typeof derived === 'object') {
    return derived;
  }

  return fallback;
}

const temperaturePreferenceStorageKey =
  typeof TEMPERATURE_STORAGE_KEY === 'string'
    ? TEMPERATURE_STORAGE_KEY
    : typeof resolveTemperatureStorageKey === 'function'
      ? resolveTemperatureStorageKey()
      : 'cameraPowerPlanner_temperatureUnit';

const sessionGlobalScope = getSessionCloneScope();

function normalizeTemperatureUnitValue(value) {
  if (value === 'fahrenheit' || value === 'celsius') {
    return value;
  }
  return value && typeof value === 'string' ? value.toLowerCase() : 'celsius';
}

function resolveInitialTemperatureUnit() {
  if (sessionGlobalScope && typeof sessionGlobalScope.temperatureUnit === 'string') {
    return normalizeTemperatureUnitValue(sessionGlobalScope.temperatureUnit);
  }

  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      const stored = localStorage.getItem(temperaturePreferenceStorageKey);
      if (typeof stored === 'string' && stored) {
        return normalizeTemperatureUnitValue(stored);
      }
    }
  } catch (temperatureStorageError) {
    console.warn('Unable to read stored temperature unit preference', temperatureStorageError);
  }

  return 'celsius';
}

let localTemperatureUnit = resolveInitialTemperatureUnit();

function resolveTemperatureUnitPreferenceController() {
  if (typeof applyTemperatureUnitPreference === 'function') {
    return applyTemperatureUnitPreference;
  }

  if (
    sessionGlobalScope
    && typeof sessionGlobalScope.applyTemperatureUnitPreference === 'function'
  ) {
    return sessionGlobalScope.applyTemperatureUnitPreference;
  }

  if (typeof globalThis !== 'undefined') {
    try {
      const candidate = globalThis.applyTemperatureUnitPreference;
      if (typeof candidate === 'function') {
        return candidate;
      }
    } catch (globalReadError) {
      void globalReadError;
    }
  }

  return null;
}

function applyTemperatureUnitPreferenceWithFallback(preferredUnit, options = {}) {
  const normalized = normalizeTemperatureUnitValue(preferredUnit);
  const shouldPersist = !(
    options
    && typeof options === 'object'
    && Object.prototype.hasOwnProperty.call(options, 'persist')
    && options.persist === false
  );

  const controller = resolveTemperatureUnitPreferenceController();
  if (controller) {
    try {
      controller(preferredUnit, options);
    } catch (controllerError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(
          'Could not apply temperature unit preference via controller',
          controllerError,
        );
      }
    }
  }

  try {
    localTemperatureUnit = normalized;
  } catch (assignError) {
    void assignError;
  }

  if (sessionGlobalScope && typeof sessionGlobalScope === 'object') {
    try {
      sessionGlobalScope.temperatureUnit = normalized;
    } catch (temperatureScopeError) {
      if (typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug(
          'Unable to propagate temperature unit preference to session scope',
          temperatureScopeError,
        );
      }
    }
  }

  if (shouldPersist) {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.setItem(temperaturePreferenceStorageKey, normalized);
      }
    } catch (temperaturePersistError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save temperature unit preference', temperaturePersistError);
      }
    }
  }

  return normalized;
}

if (sessionGlobalScope && typeof sessionGlobalScope === 'object') {
  try {
    Object.defineProperty(sessionGlobalScope, 'temperatureUnit', {
      configurable: true,
      enumerable: true,
      get() {
        return localTemperatureUnit;
      },
      set(value) {
        localTemperatureUnit = normalizeTemperatureUnitValue(value);
      },
    });
  } catch (defineTemperaturePropertyError) {
    void defineTemperaturePropertyError;
    try {
      sessionGlobalScope.temperatureUnit = localTemperatureUnit;
    } catch (sessionTemperatureExposeError) {
      void sessionTemperatureExposeError;
    }
  }
}

let recordFullBackupHistoryEntryFn = () => { };
let ensureCriticalStorageBackupsFn = () => ({ ensured: [], skipped: [], errors: [] });
try {
  ({
    recordFullBackupHistoryEntry: recordFullBackupHistoryEntryFn,
    ensureCriticalStorageBackups: ensureCriticalStorageBackupsFn,
  } = require('./storage.js'));
} catch (error) {
  if (
    typeof window !== 'undefined'
    && window
    && typeof window.recordFullBackupHistoryEntry === 'function'
  ) {
    recordFullBackupHistoryEntryFn = window.recordFullBackupHistoryEntry;
  }
  if (
    typeof window !== 'undefined'
    && window
    && typeof window.ensureCriticalStorageBackups === 'function'
  ) {
    ensureCriticalStorageBackupsFn = window.ensureCriticalStorageBackups;
  } else {
    void error;
  }
}

const createBackupDiffRefs = () => {
  const doc = typeof document !== 'undefined' ? document : null;
  if (!doc) {
    return {
      toggleButton: null,
      section: null,
      primarySelect: null,
      secondarySelect: null,
      emptyState: null,
      summary: null,
      list: null,
      listContainer: null,
      notes: null,
      exportButton: null,
      closeButton: null,
    };
  }
  return {
    toggleButton: doc.getElementById('backupDiffToggleButton'),
    section: doc.getElementById('backupDiffSection'),
    primarySelect: doc.getElementById('backupDiffPrimary'),
    secondarySelect: doc.getElementById('backupDiffSecondary'),
    emptyState: doc.getElementById('backupDiffEmptyState'),
    summary: doc.getElementById('backupDiffSummary'),
    list: doc.getElementById('backupDiffList'),
    listContainer: doc.getElementById('backupDiffListContainer'),
    notes: doc.getElementById('backupDiffNotes'),
    exportButton: doc.getElementById('backupDiffExport'),
    closeButton: doc.getElementById('backupDiffClose'),
  };
};

const {
  toggleButton: backupDiffToggleButtonEl,
  section: backupDiffSectionEl,
  primarySelect: backupDiffPrimarySelectEl,
  secondarySelect: backupDiffSecondarySelectEl,
  emptyState: backupDiffEmptyStateEl,
  summary: backupDiffSummaryEl,
  list: backupDiffListEl,
  listContainer: backupDiffListContainerEl,
  notes: backupDiffNotesEl,
  exportButton: backupDiffExportButtonEl,
  closeButton: backupDiffCloseButtonEl,
} = createBackupDiffRefs();

function createRestoreRehearsalRefs() {
  const doc = typeof document !== 'undefined' ? document : null;
  if (!doc) {
    return {
      button: null,
      section: null,
      heading: null,
      closeButton: null,
      input: null,
      browseButton: null,
      fileName: null,
      status: null,
      table: null,
      tableBody: null,
      ruleSection: null,
      ruleHeading: null,
      ruleIntro: null,
      ruleEmpty: null,
      ruleList: null,
      actions: null,
      proceedButton: null,
      abortButton: null,
      modeInputs: [],
    };
  }
  const modeInputs = [
    doc.getElementById('restoreRehearsalModeBackup'),
    doc.getElementById('restoreRehearsalModeProject'),
  ].filter(Boolean);
  return {
    button: doc.getElementById('restoreRehearsalButton'),
    section: doc.getElementById('restoreRehearsalSection'),
    heading: doc.getElementById('restoreRehearsalHeading'),
    closeButton: doc.getElementById('restoreRehearsalClose'),
    input: doc.getElementById('restoreRehearsalInput'),
    browseButton: doc.getElementById('restoreRehearsalBrowse'),
    fileName: doc.getElementById('restoreRehearsalFileName'),
    status: doc.getElementById('restoreRehearsalStatus'),
    table: doc.getElementById('restoreRehearsalTable'),
    tableBody: doc.getElementById('restoreRehearsalTableBody'),
    ruleSection: doc.getElementById('restoreRehearsalRuleSection'),
    ruleHeading: doc.getElementById('restoreRehearsalRuleHeading'),
    ruleIntro: doc.getElementById('restoreRehearsalRuleIntro'),
    ruleEmpty: doc.getElementById('restoreRehearsalRuleEmpty'),
    ruleList: doc.getElementById('restoreRehearsalRuleList'),
    actions: doc.getElementById('restoreRehearsalActions'),
    proceedButton: doc.getElementById('restoreRehearsalProceed'),
    abortButton: doc.getElementById('restoreRehearsalAbort'),
    modeInputs,
  };
}

const {
  button: restoreRehearsalButtonEl,
  section: restoreRehearsalSectionEl,
  heading: restoreRehearsalHeadingEl,
  closeButton: restoreRehearsalCloseButtonEl,
  input: restoreRehearsalInputEl,
  browseButton: restoreRehearsalBrowseButtonEl,
  fileName: restoreRehearsalFileNameEl,
  status: restoreRehearsalStatusEl,
  table: restoreRehearsalTableEl,
  tableBody: restoreRehearsalTableBodyEl,
  ruleSection: restoreRehearsalRuleSectionEl,
  ruleHeading: restoreRehearsalRuleHeadingEl,
  ruleIntro: restoreRehearsalRuleIntroEl,
  ruleEmpty: restoreRehearsalRuleEmptyEl,
  ruleList: restoreRehearsalRuleListEl,
  actions: restoreRehearsalActionsEl,
  proceedButton: restoreRehearsalProceedButtonEl,
  abortButton: restoreRehearsalAbortButtonEl,
  modeInputs: restoreRehearsalModeInputs,
} = createRestoreRehearsalRefs();

let restoreRehearsalLastSnapshot = null;

function createEmptyRestoreRehearsalCounts() {
  return RESTORE_REHEARSAL_METRICS.reduce((acc, metric) => {
    acc[metric.key] = 0;
    return acc;
  }, {});
}

function countProjectsFromSetups(setups) {
  if (Array.isArray(setups)) {
    return setups.length;
  }
  if (isPlainObject(setups)) {
    return Object.keys(setups).length;
  }
  if (typeof setups === 'string' && setups.trim()) {
    return 1;
  }
  return 0;
}

function countFavoritesEntries(favorites) {
  if (!isPlainObject(favorites)) return 0;
  return Object.values(favorites).reduce((count, entry) => {
    if (Array.isArray(entry)) {
      return count + entry.filter(Boolean).length;
    }
    if (isPlainObject(entry) && Array.isArray(entry.entries)) {
      return count + entry.entries.filter(Boolean).length;
    }
    return count;
  }, 0);
}

function projectInfoValueHasData(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !Number.isNaN(value);
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    return value.some((item) => projectInfoValueHasData(item));
  }
  if (isPlainObject(value)) {
    return Object.keys(value).some((key) => projectInfoValueHasData(value[key]));
  }
  return false;
}

function countCrewEntries(value) {
  if (!value) return 0;
  if (Array.isArray(value)) {
    return value.reduce((total, entry) => total + countCrewEntries(entry), 0);
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .length;
  }
  if (isPlainObject(value)) {
    if (Array.isArray(value.people)) {
      return countCrewEntries(value.people);
    }
    if (Array.isArray(value.entries)) {
      return countCrewEntries(value.entries);
    }
    if (typeof value.text === 'string') {
      return countCrewEntries(value.text);
    }
    if (
      typeof value.name === 'string'
      || typeof value.role === 'string'
      || typeof value.phone === 'string'
      || typeof value.email === 'string'
      || typeof value.website === 'string'
      || typeof value.text === 'string'
    ) {
      const name = typeof value.name === 'string' ? value.name.trim() : '';
      const role = typeof value.role === 'string' ? value.role.trim() : '';
      const phone = typeof value.phone === 'string' ? value.phone.trim() : '';
      const email = typeof value.email === 'string' ? value.email.trim() : '';
      const website = typeof value.website === 'string' ? value.website.trim() : '';
      const text = typeof value.text === 'string' ? value.text.trim() : '';
      return name || role || phone || email || website || text ? 1 : 0;
    }
    const nestedKeys = Object.keys(value).filter((key) => key !== '__html');
    if (nestedKeys.length) {
      return countCrewEntries(nestedKeys.map((key) => value[key]));
    }
  }
  return 0;
}

function countScheduleEntries(value) {
  if (!value) return 0;
  if (Array.isArray(value)) {
    return value.reduce((total, entry) => total + countScheduleEntries(entry), 0);
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .length;
  }
  if (isPlainObject(value)) {
    if (Array.isArray(value.entries)) {
      return countScheduleEntries(value.entries);
    }
    if (typeof value.text === 'string') {
      return countScheduleEntries(value.text);
    }
    if (typeof value.label === 'string' || typeof value.value === 'string') {
      const label = typeof value.label === 'string' ? value.label.trim() : '';
      const val = typeof value.value === 'string' ? value.value.trim() : '';
      return label || val ? 1 : 0;
    }
    const nestedKeys = Object.keys(value).filter((key) => key !== '__html');
    if (nestedKeys.length) {
      return countScheduleEntries(nestedKeys.map((key) => value[key]));
    }
  }
  return 0;
}

function summarizeProjectInfoStats(projectInfo) {
  if (typeof projectInfo === 'string') {
    try {
      const parsed = JSON.parse(projectInfo);
      if (isPlainObject(parsed)) {
        return summarizeProjectInfoStats(parsed);
      }
    } catch (parseError) {
      void parseError;
    }
  }

  if (!projectInfo || typeof projectInfo !== 'object' || Array.isArray(projectInfo)) {
    const hasDetails = projectInfoValueHasData(projectInfo);
    return {
      details: hasDetails ? 1 : 0,
      crew: 0,
      schedule: 0,
      hasDetails,
    };
  }

  let details = 0;
  let crew = 0;
  let schedule = 0;
  let hasDetails = false;

  Object.entries(projectInfo).forEach(([key, value]) => {
    if (key === 'projectName') return;
    if (projectInfoValueHasData(value)) {
      details += 1;
      hasDetails = true;
    }
    if (key === 'crew' || key === 'people') {
      const crewCount = countCrewEntries(value);
      if (crewCount > 0) {
        crew += crewCount;
        hasDetails = true;
      }
    }
    if (key === 'prepDays' || key === 'shootingDays' || key === 'returnDays') {
      const scheduleCount = countScheduleEntries(value);
      if (scheduleCount > 0) {
        schedule += scheduleCount;
        hasDetails = true;
      }
    }
  });

  return { details, crew, schedule, hasDetails };
}

function summarizeProjectCollection(collection) {
  const result = {
    details: 0,
    crew: 0,
    schedule: 0,
    hasProjectInfo: false,
  };

  if (!collection) {
    return result;
  }

  const entries = Array.isArray(collection)
    ? collection
    : isPlainObject(collection)
      ? Object.values(collection)
      : [];

  entries.forEach((entry) => {
    if (!entry) return;
    let info = null;
    if (isPlainObject(entry) && Object.prototype.hasOwnProperty.call(entry, 'projectInfo')) {
      info = entry.projectInfo;
    } else if (
      isPlainObject(entry)
      && isPlainObject(entry.project)
      && Object.prototype.hasOwnProperty.call(entry.project, 'projectInfo')
    ) {
      info = entry.project.projectInfo;
    }
    if (!info) return;
    if (!result.hasProjectInfo) {
      result.hasProjectInfo = true;
    }
    const stats = summarizeProjectInfoStats(info);
    if (stats.hasDetails) {
      result.hasProjectInfo = true;
    }
    result.details += stats.details;
    result.crew += stats.crew;
    result.schedule += stats.schedule;
  });

  return result;
}

function summarizeCountsFromData(data) {
  const counts = createEmptyRestoreRehearsalCounts();
  const setups = isPlainObject(data) && isPlainObject(data.setups) ? data.setups : {};
  const rules = isPlainObject(data) && Array.isArray(data.autoGearRules)
    ? data.autoGearRules
    : [];
  const favorites = isPlainObject(data) && isPlainObject(data.favorites)
    ? data.favorites
    : {};
  const storedProjects = isPlainObject(data) ? summarizeProjectCollection(data.project) : {
    details: 0,
    crew: 0,
    schedule: 0,
    hasProjectInfo: false,
  };
  const setupProjects = summarizeProjectCollection(setups);
  const projectDetails = Math.max(storedProjects.details, setupProjects.details);
  const projectCrew = Math.max(storedProjects.crew, setupProjects.crew);
  const projectSchedule = Math.max(storedProjects.schedule, setupProjects.schedule);
  counts.projects = countProjectsFromSetups(setups);
  counts.projectDetails = projectDetails;
  counts.projectCrew = projectCrew;
  counts.projectSchedules = projectSchedule;
  counts.rules = rules.length;
  counts.favorites = countFavoritesEntries(favorites);
  counts.deviceLibrary = countRestoreRehearsalDeviceEntries(isPlainObject(data) ? data.devices : null);
  const sessionState = isPlainObject(data) ? data.session : null;
  counts.sessionSnapshots = isPlainObject(sessionState) && Object.keys(sessionState).length ? 1 : 0;
  counts.feedbackDrafts = countRestoreRehearsalFeedbackDrafts(isPlainObject(data) ? data.feedback : null);
  counts.autoGearPresets = Array.isArray(data?.autoGearPresets)
    ? data.autoGearPresets.filter(Boolean).length
    : 0;
  counts.autoGearBackups = Array.isArray(data?.autoGearBackups)
    ? data.autoGearBackups.filter(Boolean).length
    : 0;
  counts.fullBackupHistory = Array.isArray(data?.fullBackupHistory)
    ? data.fullBackupHistory.filter(Boolean).length
    : 0;
  counts.customFonts = Array.isArray(data?.customFonts)
    ? data.customFonts.filter((entry) => {
      if (!entry) return false;
      if (typeof entry === 'string') {
        return entry.trim().length > 0;
      }
      if (isPlainObject(entry)) {
        return Object.keys(entry).length > 0;
      }
      return false;
    }).length
    : 0;
  counts.customLogo = typeof data?.customLogo === 'string' && data.customLogo.trim() ? 1 : 0;
  const storedPreferences = isPlainObject(data?.preferences) ? data.preferences : null;
  counts.storedPreferences = storedPreferences && Object.keys(storedPreferences).length ? 1 : 0;
  const schemaCache = data?.schemaCache;
  if (typeof schemaCache === 'string') {
    counts.schemaCache = schemaCache.trim() ? 1 : 0;
  } else if (isPlainObject(schemaCache)) {
    counts.schemaCache = Object.keys(schemaCache).length ? 1 : 0;
  }
  return counts;
}

function bundleHasProject(bundle) {
  if (!isPlainObject(bundle)) return false;
  if (typeof bundle.setupName === 'string' && bundle.setupName.trim()) return true;
  if (typeof bundle.projectHtml === 'string' && bundle.projectHtml.trim()) return true;
  if (typeof bundle.gearList === 'string' && bundle.gearList.trim()) return true;
  if (isPlainObject(bundle.projectInfo) && Object.keys(bundle.projectInfo).length) return true;
  if (isPlainObject(bundle.gearSelectors) && Object.keys(bundle.gearSelectors).length) return true;
  const deviceFields = [
    'camera',
    'monitor',
    'video',
    'cage',
    'distance',
    'batteryPlate',
    'battery',
    'batteryHotswap',
  ];
  if (deviceFields.some((field) => typeof bundle[field] === 'string' && bundle[field].trim())) {
    return true;
  }
  if (Array.isArray(bundle.motors) && bundle.motors.some(Boolean)) return true;
  if (Array.isArray(bundle.controllers) && bundle.controllers.some(Boolean)) return true;
  return false;
}

const RESTORE_REHEARSAL_BACKUP_HINT_KEYS = [
  'data',
  'payload',
  'plannerData',
  'allData',
  'devices',
  'setups',
  'session',
  'sessions',
  'sessionStorage',
  'sessionState',
  'customLogo',
  'customFonts',
  'preferences',
  'schemaCache',
  'fullBackupHistory',
];

const RESTORE_REHEARSAL_METRICS = [
  {
    key: 'projects',
    translationKey: 'restoreRehearsalMetricProjects',
    fallback: 'Projects',
    modes: ['backup', 'project'],
  },
  {
    key: 'projectDetails',
    translationKey: 'restoreRehearsalMetricProjectDetails',
    fallback: 'Project details',
    modes: ['backup', 'project'],
  },
  {
    key: 'projectCrew',
    translationKey: 'restoreRehearsalMetricCrew',
    fallback: 'Crew entries',
    modes: ['backup', 'project'],
  },
  {
    key: 'projectSchedules',
    translationKey: 'restoreRehearsalMetricSchedule',
    fallback: 'Schedule entries',
    modes: ['backup', 'project'],
  },
  {
    key: 'rules',
    translationKey: 'restoreRehearsalMetricRules',
    fallback: 'Rules',
    modes: ['backup', 'project'],
  },
  {
    key: 'favorites',
    translationKey: 'restoreRehearsalMetricFavorites',
    fallback: 'Favorites',
    modes: ['backup', 'project'],
  },
  {
    key: 'deviceLibrary',
    translationKey: 'restoreRehearsalMetricDeviceLibrary',
    fallback: 'Device library entries',
    modes: ['backup'],
  },
  {
    key: 'sessionSnapshots',
    translationKey: 'restoreRehearsalMetricSession',
    fallback: 'Stored session snapshot',
    modes: ['backup'],
  },
  {
    key: 'feedbackDrafts',
    translationKey: 'restoreRehearsalMetricFeedback',
    fallback: 'Feedback drafts',
    modes: ['backup'],
  },
  {
    key: 'autoGearPresets',
    translationKey: 'restoreRehearsalMetricAutoPresets',
    fallback: 'Automatic gear presets',
    modes: ['backup'],
  },
  {
    key: 'autoGearBackups',
    translationKey: 'restoreRehearsalMetricAutoBackups',
    fallback: 'Automatic gear backups',
    modes: ['backup'],
  },
  {
    key: 'fullBackupHistory',
    translationKey: 'restoreRehearsalMetricBackupHistory',
    fallback: 'Backup history entries',
    modes: ['backup'],
  },
  {
    key: 'customFonts',
    translationKey: 'restoreRehearsalMetricCustomFonts',
    fallback: 'Custom fonts',
    modes: ['backup'],
  },
  {
    key: 'customLogo',
    translationKey: 'restoreRehearsalMetricCustomLogo',
    fallback: 'Custom logo saved',
    modes: ['backup'],
  },
  {
    key: 'storedPreferences',
    translationKey: 'restoreRehearsalMetricPreferences',
    fallback: 'Stored preferences',
    modes: ['backup'],
  },
  {
    key: 'schemaCache',
    translationKey: 'restoreRehearsalMetricSchemaCache',
    fallback: 'Device schema cache',
    modes: ['backup'],
  },
];

const RESTORE_REHEARSAL_PROJECT_HINT_KEYS = [
  'setupName',
  'camera',
  'monitor',
  'video',
  'cage',
  'distance',
  'batteryPlate',
  'battery',
  'batteryHotswap',
  'motors',
  'controllers',
  'project',
  'projectInfo',
  'projectHtml',
  'gearList',
  'gearSelectors',
  'autoGearRules',
  'favorites',
  'feedback',
  'changedDevices',
];

function hasAnyRestoreRehearsalKeys(source, keys) {
  if (!isPlainObject(source)) {
    return false;
  }
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      return true;
    }
  }
  return false;
}

function looksLikeRestoreRehearsalProjectBundle(bundle) {
  if (!isPlainObject(bundle)) {
    return false;
  }
  if (bundleHasProject(bundle)) {
    return true;
  }
  if (hasAnyRestoreRehearsalKeys(bundle, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
    return true;
  }
  const nestedProject = isPlainObject(bundle.project) ? bundle.project : null;
  if (hasAnyRestoreRehearsalKeys(nestedProject, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
    return true;
  }
  return false;
}

function looksLikeRestoreRehearsalBackupPayload(payload) {
  if (!isPlainObject(payload)) {
    return false;
  }
  if (hasAnyRestoreRehearsalKeys(payload, RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
    return true;
  }
  const candidateKeys = ['data', 'payload', 'plannerData', 'allData'];
  for (let i = 0; i < candidateKeys.length; i += 1) {
    const key = candidateKeys[i];
    if (hasAnyRestoreRehearsalKeys(payload[key], RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
      return true;
    }
  }
  return false;
}

function summarizeProjectBundle(bundle) {
  const summary = createEmptyRestoreRehearsalCounts();
  if (!isPlainObject(bundle)) {
    return summary;
  }
  const favorites = isPlainObject(bundle.favorites) ? bundle.favorites : {};
  let projectInfo = null;
  if (isPlainObject(bundle.projectInfo) || typeof bundle.projectInfo === 'string') {
    projectInfo = bundle.projectInfo;
  } else if (isPlainObject(bundle.project) && (isPlainObject(bundle.project.projectInfo) || typeof bundle.project.projectInfo === 'string')) {
    projectInfo = bundle.project.projectInfo;
  }
  const projectStats = summarizeProjectInfoStats(projectInfo);
  summary.projects = bundleHasProject(bundle) ? 1 : 0;
  summary.projectDetails = projectStats.details;
  summary.projectCrew = projectStats.crew;
  summary.projectSchedules = projectStats.schedule;
  summary.rules = Array.isArray(bundle.autoGearRules) ? bundle.autoGearRules.length : 0;
  summary.favorites = countFavoritesEntries(favorites);
  return summary;
}

function getRestoreRehearsalLiveCounts() {
  const snapshot = getRestoreRehearsalLiveSnapshot();
  return snapshot && snapshot.counts ? snapshot.counts : {};
}

function getSelectedRestoreRehearsalMode() {
  if (!Array.isArray(restoreRehearsalModeInputs) || !restoreRehearsalModeInputs.length) {
    return 'backup';
  }
  const selected = restoreRehearsalModeInputs.find((input) => input && input.checked);
  return selected && typeof selected.value === 'string' ? selected.value : 'backup';
}

function buildRestoreRehearsalRows(liveCounts, sandboxCounts, options = {}) {
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  const mode = typeof options.mode === 'string' ? options.mode : 'backup';
  const metrics = RESTORE_REHEARSAL_METRICS
    .filter((metric) => metric.modes.includes(mode))
    .map((metric) => ({
      key: metric.key,
      label: langTexts[metric.translationKey] || metric.fallback,
    }));
  return metrics.map((metric) => {
    const live = typeof liveCounts[metric.key] === 'number' ? liveCounts[metric.key] : 0;
    const sandbox = typeof sandboxCounts[metric.key] === 'number' ? sandboxCounts[metric.key] : 0;
    return {
      key: metric.key,
      label: metric.label,
      live,
      sandbox,
      diff: sandbox - live,
    };
  });
}

function normalizeRestoreRehearsalScenarioLogic(value) {
  if (typeof value !== 'string') {
    return 'all';
  }
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return 'all';
  }
  if (normalized === 'any' || normalized === 'or') {
    return 'any';
  }
  if (normalized === 'multiplier' || normalized === 'multiply') {
    return 'multiplier';
  }
  return 'all';
}

function normalizeRestoreRehearsalScenarioMultiplier(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      const parsed = Number(trimmed);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return 1;
}

function normalizeRestoreRehearsalRuleItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  const normalizedItems = items
    .map((item) => {
      if (!isPlainObject(item)) return null;
      const name = typeof item.name === 'string' ? item.name.trim() : '';
      if (!name) return null;
      const category = typeof item.category === 'string' ? item.category.trim() : '';
      let quantity = 1;
      if (typeof item.quantity === 'number' && Number.isFinite(item.quantity)) {
        quantity = item.quantity;
      } else if (typeof item.quantity === 'string') {
        const trimmedQuantity = item.quantity.trim();
        if (trimmedQuantity) {
          const parsedQuantity = Number(trimmedQuantity);
          if (Number.isFinite(parsedQuantity)) {
            quantity = parsedQuantity;
          }
        }
      }
      const notes = typeof item.notes === 'string' ? item.notes.trim() : '';
      const screenSize = typeof item.screenSize === 'string' ? item.screenSize.trim() : '';
      const selectorType = typeof item.selectorType === 'string' ? item.selectorType.trim() : '';
      const selectorDefault = typeof item.selectorDefault === 'string' ? item.selectorDefault.trim() : '';
      const selectorEnabled = Boolean(item.selectorEnabled);
      const contextNotes = Array.isArray(item.contextNotes)
        ? item.contextNotes
          .map((note) => (typeof note === 'string' ? note.trim() : ''))
          .filter(Boolean)
        : [];
      contextNotes.sort((a, b) => a.localeCompare(b));
      const normalized = {
        id: typeof item.id === 'string' ? item.id : '',
        name,
        category,
        quantity,
        notes,
        screenSize,
        selectorType,
        selectorDefault,
        selectorEnabled,
        contextNotes,
      };
      const signatureSource = {
        name,
        category,
        quantity,
        notes,
        screenSize,
        selectorType,
        selectorDefault,
        selectorEnabled,
        contextNotes,
      };
      normalized.signature = JSON.stringify(signatureSource);
      return normalized;
    })
    .filter(Boolean);
  normalizedItems.sort((a, b) => {
    const categoryA = a.category || '';
    const categoryB = b.category || '';
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    return a.name.localeCompare(b.name);
  });
  return normalizedItems;
}

function formatRestoreRehearsalRuleItem(item) {
  if (!item) {
    return '';
  }
  const quantity = item.quantity;
  const hasQuantity = quantity !== undefined && quantity !== null && quantity !== 1;
  const displayQuantity = hasQuantity ? ` ×${formatNumberForComparison(quantity)}` : '';
  const categorySuffix = item.category ? ` (${item.category})` : '';
  const notesSuffix = item.notes ? ` — ${item.notes}` : '';
  const contextSuffix = Array.isArray(item.contextNotes) && item.contextNotes.length
    ? ` (${item.contextNotes.join(', ')})`
    : '';
  const screenSuffix = item.screenSize ? ` [${item.screenSize}]` : '';
  const selectorParts = [];
  if (item.selectorType && item.selectorType !== 'none') {
    selectorParts.push(item.selectorType);
  }
  if (item.selectorDefault) {
    selectorParts.push(item.selectorDefault);
  }
  const selectorSuffix = selectorParts.length ? ` {${selectorParts.join(': ')}}` : '';
  return `${item.name}${categorySuffix}${displayQuantity}${notesSuffix}${contextSuffix}${screenSuffix}${selectorSuffix}`;
}

function normalizeRestoreRehearsalRule(rule, index, origin) {
  if (!isPlainObject(rule)) {
    return null;
  }
  const normalized = {
    id: typeof rule.id === 'string' ? rule.id : '',
    label: typeof rule.label === 'string' ? rule.label.trim() : '',
    always: Boolean(rule.always),
  };
  normalized.scenarioLogic = normalizeRestoreRehearsalScenarioLogic(rule.scenarioLogic);
  normalized.scenarioMultiplier = normalizeRestoreRehearsalScenarioMultiplier(rule.scenarioMultiplier);
  if (normalized.scenarioLogic !== 'multiplier') {
    normalized.scenarioMultiplier = 1;
  }
  normalized.scenarioPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary.trim() : '';
  const scenarios = Array.isArray(rule.scenarios)
    ? rule.scenarios
      .map((value) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean)
    : [];
  const scenarioSet = new Set(scenarios);
  normalized.scenarios = Array.from(scenarioSet).sort((a, b) => a.localeCompare(b));
  normalized.addItems = normalizeRestoreRehearsalRuleItems(rule.add);
  normalized.removeItems = normalizeRestoreRehearsalRuleItems(rule.remove);
  const addSignatures = normalized.addItems.map((item) => item.signature).sort();
  const removeSignatures = normalized.removeItems.map((item) => item.signature).sort();
  normalized.signature = JSON.stringify({
    always: normalized.always,
    scenarioLogic: normalized.scenarioLogic,
    scenarioPrimary: normalized.scenarioPrimary,
    scenarioMultiplier: normalized.scenarioMultiplier,
    scenarios: normalized.scenarios,
    add: addSignatures,
    remove: removeSignatures,
  });
  const fallbackParts = [
    normalized.label.toLowerCase(),
    normalized.scenarios.join('|').toLowerCase(),
    normalized.addItems.map((item) => item.name.toLowerCase()).join('|'),
    normalized.removeItems.map((item) => item.name.toLowerCase()).join('|'),
  ].filter(Boolean);
  const fallbackSignature = fallbackParts.join('::');
  normalized.matchKey = normalized.id
    ? `id:${normalized.id}`
    : fallbackSignature
      ? `fallback:${fallbackSignature}`
      : `index:${origin}:${index}`;
  normalized.entryKey = `${normalized.matchKey}|${origin}|${index}`;
  if (normalized.label) {
    normalized.displayName = normalized.label;
  } else if (normalized.scenarios.length) {
    normalized.displayName = normalized.scenarios.join(' + ');
  } else if (normalized.id) {
    normalized.displayName = normalized.id;
  } else {
    normalized.displayName = `Rule ${index + 1}`;
  }
  return normalized;
}

function normalizeRestoreRehearsalRules(value, origin = 'sandbox') {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((rule, index) => normalizeRestoreRehearsalRule(rule, index, origin))
    .filter(Boolean);
}

function indexRestoreRehearsalRules(rules) {
  const map = new Map();
  if (!Array.isArray(rules)) {
    return map;
  }
  rules.forEach((rule) => {
    if (!rule || !rule.matchKey) return;
    const bucket = map.get(rule.matchKey);
    if (bucket) {
      bucket.push(rule);
    } else {
      map.set(rule.matchKey, [rule]);
    }
  });
  return map;
}

function buildRestoreRehearsalRuleDiff(liveRules, sandboxRules) {
  const liveList = Array.isArray(liveRules) ? liveRules : [];
  const sandboxList = Array.isArray(sandboxRules) ? sandboxRules : [];
  const liveIndex = indexRestoreRehearsalRules(liveList);
  const unmatchedLive = new Set(liveList.filter(Boolean));
  const differences = [];

  sandboxList.forEach((sandboxRule) => {
    if (!sandboxRule) return;
    let liveRule = null;
    const bucket = sandboxRule.matchKey ? liveIndex.get(sandboxRule.matchKey) : null;
    if (bucket && bucket.length) {
      liveRule = bucket.shift();
      if (!bucket.length) {
        liveIndex.delete(sandboxRule.matchKey);
      }
    }
    if (liveRule) {
      unmatchedLive.delete(liveRule);
      if (liveRule.signature !== sandboxRule.signature) {
        differences.push({
          status: 'changed',
          label: sandboxRule.displayName || liveRule.displayName,
          live: liveRule,
          sandbox: sandboxRule,
          key: `changed:${sandboxRule.entryKey}`,
        });
      }
    } else {
      differences.push({
        status: 'added',
        label: sandboxRule.displayName,
        live: null,
        sandbox: sandboxRule,
        key: `added:${sandboxRule.entryKey}`,
      });
    }
  });

  unmatchedLive.forEach((liveRule) => {
    if (!liveRule) return;
    differences.push({
      status: 'removed',
      label: liveRule.displayName,
      live: liveRule,
      sandbox: null,
      key: `removed:${liveRule.entryKey}`,
    });
  });

  const compareStrings = typeof localeSort === 'function'
    ? (a, b) => localeSort(a, b)
    : (a, b) => a.localeCompare(b);

  const statusPriority = {
    changed: 0,
    removed: 1,
    added: 2,
  };

  return differences.sort((a, b) => {
    const priorityA = statusPriority[a.status] ?? Number.MAX_SAFE_INTEGER;
    const priorityB = statusPriority[b.status] ?? Number.MAX_SAFE_INTEGER;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return compareStrings(a.label || '', b.label || '');
  });
}

function formatRestoreRehearsalRuleScenarioLines(rule, langTexts) {
  if (!rule) {
    return [];
  }
  const fallbackTexts = texts.en || {};
  const logicLabel = langTexts.restoreRehearsalRuleLogicLabel
    || fallbackTexts.restoreRehearsalRuleLogicLabel
    || 'Scenario logic';
  const baseLabel = langTexts.restoreRehearsalRuleBaseLabel
    || fallbackTexts.restoreRehearsalRuleBaseLabel
    || 'Base scenario';
  const multiplierLabel = langTexts.restoreRehearsalRuleMultiplierLabel
    || fallbackTexts.restoreRehearsalRuleMultiplierLabel
    || 'Multiplier';
  const requiredLabel = langTexts.restoreRehearsalRuleRequiredLabel
    || texts[currentLang]?.projectFields?.requiredScenarios
    || fallbackTexts.projectFields?.requiredScenarios
    || 'Required scenarios';
  const alwaysLabel = langTexts.restoreRehearsalRuleAlwaysLabel
    || fallbackTexts.restoreRehearsalRuleAlwaysLabel
    || 'Always active';
  const noneLabel = langTexts.restoreRehearsalRuleNone
    || fallbackTexts.restoreRehearsalRuleNone
    || 'None';

  let logicText = fallbackTexts.autoGearScenarioModeAll || 'Require every selected scenario';
  if (rule.scenarioLogic === 'any') {
    logicText = texts[currentLang]?.autoGearScenarioModeAny
      || fallbackTexts.autoGearScenarioModeAny
      || 'Match any selected scenario';
  } else if (rule.scenarioLogic === 'multiplier') {
    logicText = texts[currentLang]?.autoGearScenarioModeMultiplier
      || fallbackTexts.autoGearScenarioModeMultiplier
      || 'Multiply when combined';
  } else {
    logicText = texts[currentLang]?.autoGearScenarioModeAll
      || fallbackTexts.autoGearScenarioModeAll
      || 'Require every selected scenario';
  }

  const lines = [`${logicLabel}: ${logicText}`];

  if (rule.scenarioPrimary) {
    lines.push(`${baseLabel}: ${rule.scenarioPrimary}`);
  }

  if (rule.scenarioLogic === 'multiplier' && rule.scenarioMultiplier !== 1) {
    lines.push(`${multiplierLabel}: ×${formatNumberForComparison(rule.scenarioMultiplier)}`);
  }

  if (rule.scenarios && rule.scenarios.length) {
    lines.push(`${requiredLabel}: ${rule.scenarios.join(' + ')}`);
  } else {
    lines.push(`${requiredLabel}: ${noneLabel}`);
  }

  if (rule.always) {
    lines.push(alwaysLabel);
  }

  return lines;
}

function createRestoreRehearsalRuleList(entries, emptyText) {
  const list = document.createElement('ul');
  list.className = 'restore-rehearsal-rule-list';
  const lines = Array.isArray(entries) ? entries.filter((line) => typeof line === 'string' && line.trim()) : [];
  if (!lines.length) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = emptyText;
    list.appendChild(emptyItem);
    return list;
  }
  lines.forEach((line) => {
    const item = document.createElement('li');
    item.textContent = line;
    list.appendChild(item);
  });
  return list;
}

function createRestoreRehearsalRuleSection(label, entries, emptyText) {
  const section = document.createElement('div');
  section.className = 'restore-rehearsal-rule-section';
  const heading = document.createElement('span');
  heading.className = 'restore-rehearsal-rule-section-label';
  heading.textContent = label;
  section.appendChild(heading);
  section.appendChild(createRestoreRehearsalRuleList(entries, emptyText));
  return section;
}

function createRestoreRehearsalRuleColumn(title, rule, variant, langTexts, emptyText) {
  const column = document.createElement('div');
  column.className = 'restore-rehearsal-rule-column';
  if (variant) {
    column.classList.add(`restore-rehearsal-rule-column--${variant}`);
  }
  const heading = document.createElement('div');
  heading.className = 'restore-rehearsal-rule-column-title';
  heading.textContent = title;
  column.appendChild(heading);

  const additions = rule ? rule.addItems.map((item) => formatRestoreRehearsalRuleItem(item)).filter(Boolean) : [];
  column.appendChild(createRestoreRehearsalRuleSection(
    langTexts.restoreRehearsalRuleAddsLabel
    || texts.en?.restoreRehearsalRuleAddsLabel
    || 'Automatic additions',
    additions,
    emptyText,
  ));

  const removals = rule ? rule.removeItems.map((item) => formatRestoreRehearsalRuleItem(item)).filter(Boolean) : [];
  column.appendChild(createRestoreRehearsalRuleSection(
    langTexts.restoreRehearsalRuleRemovesLabel
    || texts.en?.restoreRehearsalRuleRemovesLabel
    || 'Automatic removals',
    removals,
    emptyText,
  ));

  const scenarioLines = formatRestoreRehearsalRuleScenarioLines(rule, langTexts);
  column.appendChild(createRestoreRehearsalRuleSection(
    langTexts.restoreRehearsalRuleScenariosLabel
    || texts.en?.restoreRehearsalRuleScenariosLabel
    || 'Scenario scope',
    scenarioLines,
    emptyText,
  ));

  return column;
}

function renderRestoreRehearsalRuleDiff(differences) {
  if (!restoreRehearsalRuleSectionEl || !restoreRehearsalRuleListEl || !restoreRehearsalRuleEmptyEl) {
    return;
  }
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  restoreRehearsalRuleListEl.innerHTML = '';
  const hasDifferences = Array.isArray(differences) && differences.length > 0;
  if (!hasDifferences) {
    if (restoreRehearsalRuleEmptyEl) {
      restoreRehearsalRuleEmptyEl.textContent = langTexts.restoreRehearsalRuleEmpty
        || texts.en?.restoreRehearsalRuleEmpty
        || 'No automatic gear rule differences found.';
      restoreRehearsalRuleEmptyEl.removeAttribute('hidden');
    }
    restoreRehearsalRuleSectionEl.removeAttribute('hidden');
    if (restoreRehearsalActionsEl) {
      restoreRehearsalActionsEl.removeAttribute('hidden');
    }
    return;
  }
  restoreRehearsalRuleEmptyEl.setAttribute('hidden', '');
  const liveTitle = langTexts.restoreRehearsalLiveColumn
    || texts.en?.restoreRehearsalLiveColumn
    || 'Live profile';
  const sandboxTitle = langTexts.restoreRehearsalSandboxColumn
    || texts.en?.restoreRehearsalSandboxColumn
    || 'Sandbox import';
  const emptyText = langTexts.restoreRehearsalRuleNone
    || texts.en?.restoreRehearsalRuleNone
    || 'None';

  differences.forEach((entry) => {
    if (!entry) return;
    const item = document.createElement('li');
    const typeClass = entry.status ? ` diff-${entry.status}` : '';
    item.className = `diff-entry${typeClass}`;

    const header = document.createElement('div');
    header.className = 'diff-entry-header';

    const path = document.createElement('div');
    path.className = 'diff-path';
    const fallbackLabel = entry.label
      || entry.sandbox?.displayName
      || entry.live?.displayName
      || langTexts.restoreRehearsalRuleFallback
      || texts.en?.restoreRehearsalRuleFallback
      || 'Automatic rule change';
    path.textContent = fallbackLabel;
    header.appendChild(path);

    header.appendChild(createDiffStatusBadge(entry.status || 'changed'));
    item.appendChild(header);

    const columns = document.createElement('div');
    columns.className = 'restore-rehearsal-rule-columns';
    if (entry.status === 'changed') {
      columns.classList.add('restore-rehearsal-rule-columns--split');
    }

    if (entry.live) {
      const variant = entry.status === 'added' ? null : 'removed';
      columns.appendChild(createRestoreRehearsalRuleColumn(liveTitle, entry.live, variant, langTexts, emptyText));
    }
    if (entry.sandbox) {
      const variant = entry.status === 'removed' ? null : 'added';
      columns.appendChild(createRestoreRehearsalRuleColumn(sandboxTitle, entry.sandbox, variant, langTexts, emptyText));
    }

    item.appendChild(columns);
    restoreRehearsalRuleListEl.appendChild(item);
  });

  restoreRehearsalRuleSectionEl.removeAttribute('hidden');
  if (restoreRehearsalActionsEl) {
    restoreRehearsalActionsEl.removeAttribute('hidden');
  }
}

function getRestoreRehearsalLiveSnapshot() {
  const snapshot = typeof exportAllData === 'function' ? exportAllData() : {};
  const data = isPlainObject(snapshot) ? snapshot : {};
  return {
    counts: summarizeCountsFromData(data),
    rules: normalizeRestoreRehearsalRules(data.autoGearRules, 'live'),
  };
}

function resetRestoreRehearsalState(options = {}) {
  const { keepStatus = false } = options || {};
  if (restoreRehearsalFileNameEl) {
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const fallback = texts.en?.restoreRehearsalNoFile || 'No file selected yet.';
    const message = texts[lang]?.restoreRehearsalNoFile || fallback;
    restoreRehearsalFileNameEl.textContent = message;
  }
  if (!keepStatus && restoreRehearsalStatusEl) {
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const fallback = texts.en?.restoreRehearsalReady || '';
    restoreRehearsalStatusEl.textContent = texts[lang]?.restoreRehearsalReady || fallback;
  }
  if (restoreRehearsalTableEl) {
    restoreRehearsalTableEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalTableBodyEl) {
    while (restoreRehearsalTableBodyEl.firstChild) {
      restoreRehearsalTableBodyEl.removeChild(restoreRehearsalTableBodyEl.firstChild);
    }
  }
  if (restoreRehearsalRuleSectionEl) {
    restoreRehearsalRuleSectionEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalRuleListEl) {
    restoreRehearsalRuleListEl.innerHTML = '';
  }
  if (restoreRehearsalRuleEmptyEl) {
    restoreRehearsalRuleEmptyEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalActionsEl) {
    restoreRehearsalActionsEl.setAttribute('hidden', '');
  }
  restoreRehearsalLastSnapshot = null;
  if (restoreRehearsalInputEl) {
    restoreRehearsalInputEl.value = '';
  }
}

function openRestoreRehearsal() {
  if (!restoreRehearsalSectionEl) return;
  restoreRehearsalSectionEl.removeAttribute('hidden');
  resetRestoreRehearsalState();
  if (restoreRehearsalHeadingEl && typeof restoreRehearsalHeadingEl.focus === 'function') {
    restoreRehearsalHeadingEl.focus({ preventScroll: true });
  }
}

function closeRestoreRehearsal() {
  resetRestoreRehearsalState();
  if (restoreRehearsalSectionEl) {
    restoreRehearsalSectionEl.setAttribute('hidden', '');
  }
}

function readFileAsText(file) {
  if (!file) {
    return Promise.reject(new Error('No file provided'));
  }
  if (typeof file.text === 'function') {
    return Promise.resolve().then(() => file.text());
  }
  return new Promise((resolve, reject) => {
    if (typeof FileReader !== 'function') {
      reject(new Error('No supported file reader available'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    try {
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
}

function formatRestoreRehearsalSummary(rows) {
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  const joiner = langTexts.restoreRehearsalDifferenceListJoin || ', ';
  const diffs = rows
    .filter((row) => row.diff !== 0)
    .map((row) => `${row.label} (${row.diff > 0 ? '+' : '−'}${Math.abs(row.diff)})`);
  if (!diffs.length) {
    return langTexts.restoreRehearsalMatch
      || texts.en?.restoreRehearsalMatch
      || 'All counts match. The sandbox was cleared automatically.';
  }
  const template = langTexts.restoreRehearsalMismatch
    || texts.en?.restoreRehearsalMismatch
    || 'Differences detected: %s. The sandbox was cleared automatically.';
  return template.replace('%s', diffs.join(joiner));
}

function applyRestoreRehearsalDifferenceCell(cell, label, diff) {
  if (!cell) return;
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  cell.textContent = '';
  cell.classList.remove('restore-rehearsal-diff-match', 'restore-rehearsal-diff-positive', 'restore-rehearsal-diff-negative');
  if (diff === 0) {
    const text = langTexts.restoreRehearsalMatchLabel || texts.en?.restoreRehearsalMatchLabel || 'Match';
    cell.textContent = text;
    cell.classList.add('restore-rehearsal-diff-match');
    cell.setAttribute('aria-label', `${label} ${text}`);
    return;
  }
  const abs = Math.abs(diff);
  const template = diff > 0
    ? langTexts.restoreRehearsalIncreaseLabel || texts.en?.restoreRehearsalIncreaseLabel || 'Sandbox includes %d more %s.'
    : langTexts.restoreRehearsalDecreaseLabel || texts.en?.restoreRehearsalDecreaseLabel || 'Sandbox includes %d fewer %s.';
  const display = `${diff > 0 ? '+' : '−'}${abs}`;
  cell.textContent = display;
  cell.setAttribute('aria-label', template.replace('%d', abs).replace('%s', label));
  cell.classList.add(diff > 0 ? 'restore-rehearsal-diff-positive' : 'restore-rehearsal-diff-negative');
}

function renderRestoreRehearsalResults(rows, ruleDiff) {
  if (!restoreRehearsalTableBodyEl || !restoreRehearsalStatusEl) return;
  while (restoreRehearsalTableBodyEl.firstChild) {
    restoreRehearsalTableBodyEl.removeChild(restoreRehearsalTableBodyEl.firstChild);
  }
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    const metricCell = document.createElement('th');
    metricCell.scope = 'row';
    metricCell.textContent = row.label;
    tr.appendChild(metricCell);

    const liveCell = document.createElement('td');
    liveCell.textContent = String(row.live);
    tr.appendChild(liveCell);

    const sandboxCell = document.createElement('td');
    sandboxCell.textContent = String(row.sandbox);
    tr.appendChild(sandboxCell);

    const diffCell = document.createElement('td');
    applyRestoreRehearsalDifferenceCell(diffCell, row.label, row.diff);
    tr.appendChild(diffCell);

    restoreRehearsalTableBodyEl.appendChild(tr);
  });
  if (restoreRehearsalTableEl) {
    restoreRehearsalTableEl.removeAttribute('hidden');
  }
  restoreRehearsalStatusEl.textContent = formatRestoreRehearsalSummary(rows);
  renderRestoreRehearsalRuleDiff(Array.isArray(ruleDiff) ? ruleDiff : []);
}

function countRestoreRehearsalDeviceEntries(devices) {
  if (typeof countDeviceDatabaseEntries === 'function') {
    try {
      const direct = countDeviceDatabaseEntries(devices);
      if (typeof direct === 'number' && Number.isFinite(direct)) {
        return direct;
      }
    } catch (deviceCountError) {
      console.warn('Primary device counting failed during restore rehearsal', deviceCountError);
    }
  }

  const skipKeys = new Set(['filterOptions', 'None']);
  const isEntryObject = (value) => {
    if (!isPlainObject(value)) {
      return false;
    }
    return Object.values(value).some((entry) => entry === null || typeof entry !== 'object' || Array.isArray(entry));
  };

  const fallbackCount = (collection) => {
    if (!isPlainObject(collection)) {
      return 0;
    }
    let total = 0;
    Object.entries(collection).forEach(([name, value]) => {
      if (!name || skipKeys.has(name)) {
        return;
      }
      if (isEntryObject(value)) {
        total += 1;
        return;
      }
      total += fallbackCount(value);
    });
    return total;
  };

  return fallbackCount(devices);
}

function countRestoreRehearsalFeedbackDrafts(feedback) {
  if (!isPlainObject(feedback)) {
    return 0;
  }
  return Object.values(feedback).reduce((total, entry) => {
    if (!entry) {
      return total;
    }
    if (Array.isArray(entry)) {
      return total + entry.filter(Boolean).length;
    }
    if (typeof entry === 'string') {
      return entry.trim() ? total + 1 : total;
    }
    if (isPlainObject(entry)) {
      return Object.keys(entry).length ? total + 1 : total;
    }
    return total + 1;
  }, 0);
}

function runRestoreRehearsal(file) {
  if (!file) return;
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  if (restoreRehearsalStatusEl) {
    const processingText = langTexts.restoreRehearsalProcessing
      || texts.en?.restoreRehearsalProcessing
      || 'Loading file in an isolated sandbox…';
    restoreRehearsalStatusEl.textContent = processingText;
  }
  readFileAsText(file)
    .then((raw) => {
      const mode = getSelectedRestoreRehearsalMode();
      let sandboxCounts;
      let sandboxRules = [];
      if (mode === 'project') {
        const sanitizedPayload = sanitizeBackupPayload(raw);
        if (!sanitizedPayload || !sanitizedPayload.trim()) {
          const mismatchError = new Error('Restore rehearsal received an empty project bundle.');
          mismatchError.code = 'restore-rehearsal-project-mismatch';
          throw mismatchError;
        }
        const parsed = JSON.parse(sanitizedPayload);
        if (!looksLikeRestoreRehearsalProjectBundle(parsed)) {
          const mismatchError = new Error('Restore rehearsal received an unrecognized project bundle.');
          mismatchError.code = 'restore-rehearsal-project-mismatch';
          throw mismatchError;
        }
        sandboxCounts = summarizeProjectBundle(parsed);
        sandboxRules = normalizeRestoreRehearsalRules(parsed.autoGearRules, 'sandbox');
      } else {
        const sanitizedPayload = sanitizeBackupPayload(raw);
        if (!sanitizedPayload || !sanitizedPayload.trim()) {
          throw new Error('Backup payload empty');
        }
        const parsed = JSON.parse(sanitizedPayload);
        if (!looksLikeRestoreRehearsalBackupPayload(parsed)) {
          const mismatchError = new Error('Restore rehearsal received an unrecognized backup payload.');
          mismatchError.code = 'restore-rehearsal-backup-mismatch';
          throw mismatchError;
        }
        const { data } = extractBackupSections(parsed);
        const normalizedData = isPlainObject(data) ? data : {};
        sandboxCounts = summarizeCountsFromData(normalizedData);
        sandboxRules = normalizeRestoreRehearsalRules(normalizedData.autoGearRules, 'sandbox');
      }
      const liveSnapshot = getRestoreRehearsalLiveSnapshot();
      const liveCounts = liveSnapshot && isPlainObject(liveSnapshot.counts) ? liveSnapshot.counts : {};
      const liveRules = liveSnapshot && Array.isArray(liveSnapshot.rules) ? liveSnapshot.rules : [];
      const rows = buildRestoreRehearsalRows(liveCounts, sandboxCounts, { mode });
      const ruleDiff = buildRestoreRehearsalRuleDiff(liveRules, sandboxRules);
      renderRestoreRehearsalResults(rows, ruleDiff);
      restoreRehearsalLastSnapshot = {
        fileName: typeof file.name === 'string' ? file.name : '',
        mode,
        processedAt: Date.now(),
        live: { counts: liveCounts, rules: liveRules },
        sandbox: { counts: sandboxCounts, rules: sandboxRules },
        diff: ruleDiff,
      };
      if (restoreRehearsalInputEl) {
        restoreRehearsalInputEl.value = '';
      }
    })
    .catch((error) => {
      console.warn('Restore rehearsal failed', error);
      restoreRehearsalLastSnapshot = null;
      if (restoreRehearsalStatusEl) {
        let failureMessage;
        if (error && error.code === 'restore-rehearsal-project-mismatch') {
          failureMessage = langTexts.restoreRehearsalProjectMismatch
            || texts.en?.restoreRehearsalProjectMismatch;
        } else if (error && error.code === 'restore-rehearsal-backup-mismatch') {
          failureMessage = langTexts.restoreRehearsalBackupMismatch
            || texts.en?.restoreRehearsalBackupMismatch;
        }
        if (!failureMessage) {
          failureMessage = langTexts.restoreRehearsalError
            || texts.en?.restoreRehearsalError
            || 'Restore rehearsal failed. Check the file and try again.';
        }
        restoreRehearsalStatusEl.textContent = failureMessage;
      }
      if (restoreRehearsalTableEl) {
        restoreRehearsalTableEl.setAttribute('hidden', '');
      }
      if (restoreRehearsalRuleSectionEl) {
        restoreRehearsalRuleSectionEl.setAttribute('hidden', '');
      }
      if (restoreRehearsalActionsEl) {
        restoreRehearsalActionsEl.setAttribute('hidden', '');
      }
    })
    .finally(() => {
      if (restoreRehearsalInputEl) {
        try {
          restoreRehearsalInputEl.value = '';
        } catch (resetError) {
          void resetError;
        }
      }
    });
}

function handleRestoreRehearsalProceed() {
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  if (!restoreRehearsalLastSnapshot) {
    if (restoreRehearsalStatusEl) {
      const readyText = langTexts.restoreRehearsalReady || texts.en?.restoreRehearsalReady || '';
      restoreRehearsalStatusEl.textContent = readyText;
    }
    return;
  }
  const message = langTexts.restoreRehearsalProceedMessage
    || texts.en?.restoreRehearsalProceedMessage
    || 'Sandbox snapshot staged. Live data remains untouched until you perform a full restore.';
  if (restoreRehearsalStatusEl) {
    restoreRehearsalStatusEl.textContent = message;
  }
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    try {
      document.dispatchEvent(new CustomEvent('restoreRehearsalProceed', {
        detail: {
          fileName: restoreRehearsalLastSnapshot.fileName,
          mode: restoreRehearsalLastSnapshot.mode,
          processedAt: restoreRehearsalLastSnapshot.processedAt,
          sandboxCounts: restoreRehearsalLastSnapshot.sandbox?.counts || {},
          ruleChanges: Array.isArray(restoreRehearsalLastSnapshot.diff)
            ? restoreRehearsalLastSnapshot.diff.length
            : 0,
        },
      }));
    } catch (eventError) {
      console.warn('Restore rehearsal proceed notification failed', eventError);
    }
  }
}

function handleRestoreRehearsalAbort() {
  const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  const langTexts = texts[lang] || texts.en || {};
  const message = langTexts.restoreRehearsalAbortMessage
    || texts.en?.restoreRehearsalAbortMessage
    || 'Rehearsal sandbox cleared. Live data remains untouched.';
  restoreRehearsalLastSnapshot = null;
  resetRestoreRehearsalState({ keepStatus: true });
  if (restoreRehearsalStatusEl) {
    restoreRehearsalStatusEl.textContent = message;
  }
}

function saveCurrentSession(options = {}) {
  if (restoringSession || factoryResetInProgress) return;
  if (typeof isProjectPersistenceSuspended === 'function' && isProjectPersistenceSuspended()) {
    return;
  }
  const info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSessionCoreValue('getSliderBowlValue');
  info.easyrig = getSessionCoreValue('getEasyrigValue');
  currentProjectInfo = deriveSessionProjectInfo(info);
  const batteryValue = batterySelect ? batterySelect.value : '';
  const batteryPlateValue = batteryPlateSelect ? batteryPlateSelect.value : '';
  const state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(sel => sel ? sel.value : ''),
    controllers: controllerSelects.map(sel => sel ? sel.value : ''),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: normalizeBatteryPlateValue(batteryPlateValue, batteryValue),
    battery: batteryValue,
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo,
    autoGearHighlight: typeof isAutoGearHighlightEnabled === 'function'
      ? !!isAutoGearHighlightEnabled()
      : false
  };
  if (typeof getDiagramManualPositions === 'function') {
    const diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      state.diagramPositions = diagramPositions;
    }
  }
  storeSession(state);
  // Persist the current gear list and project requirements alongside the
  // session so they survive reloads without requiring a manual save action.
  if (!options.skipGearList) {
    saveCurrentGearList();
  }
}

function autoSaveCurrentSetup() {
  if (factoryResetInProgress) return;
  if (!setupNameInput) return;
  const name = setupNameInput.value.trim();
  if (!name) {
    saveCurrentSession({ skipGearList: true });
    checkSetupChanged();
    return false;
  }
  const selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({ skipGearList: true });
    checkSetupChanged();
    return false;
  }
  const setups = getSetups();
  const existingSetup = setups && typeof setups === 'object' ? setups[name] : undefined;
  const existingSetupSignature = existingSetup ? stableStringify(existingSetup) : '';
  const currentSetup = { ...getCurrentSetupState() };
  const gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  if (typeof getDiagramManualPositions === 'function') {
    const diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    } else if (Object.prototype.hasOwnProperty.call(currentSetup, 'diagramPositions')) {
      delete currentSetup.diagramPositions;
    }
  }
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
  const updatedSignature = stableStringify(currentSetup);
  return existingSetupSignature !== updatedSignature;
}

const PROJECT_AUTOSAVE_BASE_DELAY_MS = 300;
const PROJECT_AUTOSAVE_RETRY_DELAY_MS = 900;
const PROJECT_AUTOSAVE_RETRY_CAP_MS = 5000;
const PROJECT_AUTOSAVE_MAX_RETRIES = 4;

let projectAutoSaveTimer = null;
let projectAutoSaveFailureCount = 0;
let projectAutoSavePendingWhileRestoring = null;
let factoryResetInProgress = false;
let projectAutoSaveOverrides = null;
let projectAutoSaveLastRequestContext = null;

function notifyAutoBackupChange(details) {
  try {
    const scope = typeof globalThis !== 'undefined'
      ? globalThis
      : (typeof window !== 'undefined'
        ? window
        : (typeof self !== 'undefined' ? self : null));
    const notifier = scope && typeof scope.__cineNoteAutoBackupChange === 'function'
      ? scope.__cineNoteAutoBackupChange
      : null;
    if (notifier) {
      notifier(details || {});
    }
  } catch (changeError) {
    console.warn('Failed to record auto backup change context', changeError);
  }
}

function setProjectAutoSaveOverrides(overrides) {
  if (!overrides || typeof overrides !== 'object') {
    projectAutoSaveOverrides = null;
    return;
  }
  const context = {};
  if (overrides.setupNameState && typeof overrides.setupNameState === 'object') {
    const state = overrides.setupNameState;
    const typedName = typeof state.typedName === 'string' ? state.typedName : '';
    const selectedName = typeof state.selectedName === 'string' ? state.selectedName : '';
    const storageKey = typeof state.storageKey === 'string' ? state.storageKey : '';
    const renameInProgress = typeof state.renameInProgress === 'boolean'
      ? state.renameInProgress
      : Boolean(selectedName && typedName && typedName !== selectedName);
    const typedNameHasTrailingWhitespace = Boolean(
      typedName
      && state
      && typeof state.typedNameHasTrailingWhitespace === 'boolean'
      && state.typedNameHasTrailingWhitespace,
    );
    context.setupNameState = {
      typedName,
      selectedName,
      storageKey,
      renameInProgress,
      typedNameHasTrailingWhitespace,
    };
  }
  projectAutoSaveOverrides = context.setupNameState ? context : null;
}

function getProjectAutoSaveOverrides() {
  return projectAutoSaveOverrides;
}

function clearProjectAutoSaveOverrides() {
  projectAutoSaveOverrides = null;
}

function getProjectAutoSaveDelay() {
  if (projectAutoSaveFailureCount <= 0) {
    return PROJECT_AUTOSAVE_BASE_DELAY_MS;
  }
  const scaledDelay = PROJECT_AUTOSAVE_BASE_DELAY_MS
    + PROJECT_AUTOSAVE_RETRY_DELAY_MS * (projectAutoSaveFailureCount - 1);
  return Math.min(scaledDelay, PROJECT_AUTOSAVE_RETRY_CAP_MS);
}

function runProjectAutoSave() {
  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    clearProjectAutoSaveOverrides();
    return;
  }

  if (restoringSession) {
    projectAutoSaveTimer = null;
    if (projectAutoSavePendingWhileRestoring !== 'immediate') {
      projectAutoSavePendingWhileRestoring = projectAutoSavePendingWhileRestoring || 'queued';
    }
    return;
  }

  projectAutoSaveTimer = null;
  projectAutoSavePendingWhileRestoring = null;

  const pendingRequestContext = projectAutoSaveLastRequestContext;
  projectAutoSaveLastRequestContext = null;

  let encounteredError = false;

  const guard = (fn, context, onSuccess) => {
    if (typeof fn !== 'function') {
      return { ok: true, result: undefined };
    }
    try {
      const result = fn();
      if (typeof onSuccess === 'function') {
        try {
          onSuccess(result);
        } catch (callbackError) {
          console.warn('Auto backup mutation observer callback failed', callbackError);
        }
      }
      return { ok: true, result };
    } catch (error) {
      encounteredError = true;
      console.error(`Project autosave failed while ${context}.`, error);
      return { ok: false, result: undefined };
    }
  };

  let setupMutationDetected = false;
  let gearListMutationDetected = false;

  const hasSetupName = Boolean(
    setupNameInput
    && typeof setupNameInput.value === 'string'
    && setupNameInput.value.trim(),
  );

  if (!hasSetupName) {
    guard(() => saveCurrentSession(), 'saving the current session state');
  }

  const setupSaveResult = guard(
    autoSaveCurrentSetup,
    'saving the current setup',
    (result) => {
      if (result === true) {
        setupMutationDetected = true;
      }
    },
  );
  if (!setupSaveResult.ok) {
    guard(
      () => saveCurrentSession({ skipGearList: true }),
      'saving the current session state as a fallback',
    );
  }

  guard(
    saveCurrentGearList,
    'saving the gear list',
    (result) => {
      if (result === true) {
        gearListMutationDetected = true;
      }
    },
  );

  if (encounteredError) {
    if (projectAutoSaveFailureCount < PROJECT_AUTOSAVE_MAX_RETRIES) {
      projectAutoSaveFailureCount += 1;
      scheduleProjectAutoSave();
    } else if (projectAutoSaveFailureCount === PROJECT_AUTOSAVE_MAX_RETRIES) {
      console.warn('Project autosave retries have been paused after repeated failures.');
    }
    clearProjectAutoSaveOverrides();
    return;
  }

  projectAutoSaveFailureCount = 0;
  clearProjectAutoSaveOverrides();

  if (!encounteredError && (setupMutationDetected || gearListMutationDetected)) {
    const contextNow = Date.now();
    const requestTimestamp = pendingRequestContext && typeof pendingRequestContext.requestedAt === 'number'
      && Number.isFinite(pendingRequestContext.requestedAt)
      ? pendingRequestContext.requestedAt
      : contextNow;
    notifyAutoBackupChange({
      commit: true,
      context: {
        immediate: Boolean(pendingRequestContext && pendingRequestContext.immediate),
        overrides: Boolean(pendingRequestContext && pendingRequestContext.overrides),
        requestedAt: requestTimestamp,
        completedAt: contextNow,
      },
    });
  }
}

function scheduleProjectAutoSave(immediateOrOptions = false) {
  let immediate = false;
  let overrides;
  if (typeof immediateOrOptions === 'object' && immediateOrOptions !== null) {
    immediate = Boolean(immediateOrOptions.immediate);
    overrides = immediateOrOptions.overrides;
  } else {
    immediate = Boolean(immediateOrOptions);
    overrides = undefined;
  }

  const overridesProvided = overrides !== undefined;

  if (overridesProvided) {
    setProjectAutoSaveOverrides(overrides);
  }

  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    clearProjectAutoSaveOverrides();
    return;
  }
  if (restoringSession) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    const pendingState = immediate ? 'immediate' : 'queued';
    if (projectAutoSavePendingWhileRestoring !== 'immediate') {
      projectAutoSavePendingWhileRestoring = pendingState;
    }
    return;
  }
  projectAutoSavePendingWhileRestoring = null;

  const requestTimestamp = Date.now();
  projectAutoSaveLastRequestContext = {
    immediate,
    overrides: overridesProvided,
    requestedAt: requestTimestamp,
  };

  notifyAutoBackupChange({ immediate, overrides: overridesProvided, pending: true });
  if (immediate) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    runProjectAutoSave();
    return;
  }
  if (projectAutoSaveTimer) {
    clearTimeout(projectAutoSaveTimer);
  }
  const delay = getProjectAutoSaveDelay();
  projectAutoSaveTimer = setTimeout(runProjectAutoSave, delay);
  if (
    projectAutoSaveTimer &&
    typeof projectAutoSaveTimer === 'object' &&
    typeof projectAutoSaveTimer.unref === 'function'
  ) {
    projectAutoSaveTimer.unref();
  }
}

if (projectForm) {
  const resolveOptionFromEvent = (event, select) => {
    const findClosestSelect = (node) => {
      if (!node || typeof node !== 'object') {
        return null;
      }
      if (typeof node.closest === 'function') {
        return node.closest('select');
      }
      let parent = node.parentElement;
      while (parent && parent.tagName !== 'SELECT') {
        parent = parent.parentElement;
      }
      return parent && parent.tagName === 'SELECT' ? parent : null;
    };

    const isOption = node =>
      node && typeof node === 'object' && node.tagName === 'OPTION' && findClosestSelect(node) === select;

    if (isOption(event.target)) {
      return event.target;
    }

    if (typeof event.composedPath === 'function') {
      const optionFromPath = event.composedPath().find(isOption);
      if (optionFromPath) {
        return optionFromPath;
      }
    }

    if (event.target && typeof event.target.closest === 'function') {
      const optionFromTarget = event.target.closest('option');
      if (isOption(optionFromTarget)) {
        return optionFromTarget;
      }
    }

    const point = (() => {
      if (event.type && event.type.startsWith('touch') && event.touches && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
      if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
        return { x: event.clientX, y: event.clientY };
      }
      return null;
    })();

    if (point && typeof document !== 'undefined' && typeof document.elementFromPoint === 'function') {
      const element = document.elementFromPoint(point.x, point.y);
      if (isOption(element)) {
        return element;
      }
      if (element && typeof element.closest === 'function') {
        const optionFromPoint = element.closest('option');
        if (isOption(optionFromPoint)) {
          return optionFromPoint;
        }
      }
    }

    return null;
  };

  const attachMultiSelectToggle = (sel) => {
    if (!sel) {
      return;
    }

    const toggleSelection = (event) => {
      if (typeof event.button === 'number' && event.button !== 0) {
        return;
      }

      const option = resolveOptionFromEvent(event, sel);
      if (!option || option.disabled) {
        return;
      }

      event.preventDefault();

      const scrollTop = sel.scrollTop;
      const newSelected = !option.selected;
      option.selected = newSelected;
      if (newSelected) {
        option.setAttribute('selected', '');
      } else {
        option.removeAttribute('selected');
      }

      const changeEvent = new Event('change', { bubbles: true });
      sel.dispatchEvent(changeEvent);

      if (typeof sel.focus === 'function') {
        try {
          sel.focus({ preventScroll: true });
        } catch (focusError) {
          sel.focus();
          void focusError;
        }
      }

      sel.scrollTop = scrollTop;
    };

    const pointerSupported = typeof window !== 'undefined' && typeof window.PointerEvent === 'function';

    if (pointerSupported) {
      sel.addEventListener('pointerdown', toggleSelection);
    } else {
      sel.addEventListener('mousedown', toggleSelection);
      sel.addEventListener('touchstart', (event) => {
        toggleSelection(event);
      }, { passive: false });
    }

    sel.addEventListener('dblclick', (event) => {
      event.preventDefault();
    });
  };

  projectForm.querySelectorAll('select[multiple]').forEach(sel => {
    attachMultiSelectToggle(sel);
  });

  const safeUpdateSelectIconBoxes = (selectElement) => {
    if (!selectElement) {
      return;
    }
    const localFn = typeof updateSelectIconBoxes === 'function' ? updateSelectIconBoxes : null;
    const globalFn =
      typeof globalThis !== 'undefined' && globalThis && typeof globalThis.updateSelectIconBoxes === 'function'
        ? globalThis.updateSelectIconBoxes
        : null;
    const target = localFn || globalFn;
    if (typeof target !== 'function') {
      return;
    }
    try {
      target(selectElement);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('updateSelectIconBoxes handler failed', error);
      }
    }
  };

  projectForm.querySelectorAll('select').forEach(sel => {
    const handleUpdate = () => safeUpdateSelectIconBoxes(sel);
    sel.addEventListener('change', handleUpdate);
    handleUpdate();
  });

  const noteProjectFormDirty = () => {
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
  };

  const queueProjectAutoSave = () => {
    noteProjectFormDirty();
    scheduleProjectAutoSave();
  };
  const flushProjectAutoSave = () => {
    noteProjectFormDirty();
    scheduleProjectAutoSave(true);
  };
  projectForm.addEventListener('input', queueProjectAutoSave);
  projectForm.addEventListener('change', flushProjectAutoSave);

  projectForm.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('change', event => {
      noteProjectFormDirty();
      saveCurrentSession(event);
    });
  });
}

function setSelectValue(select, value) {
  if (!select) return;
  if (value === undefined) return;
  const normalized = value === null ? '' : value;
  select.value = normalized;
  if (select.value !== normalized) {
    const options = Array.from(select.options || []);
    const noneOption = options.find(opt => opt.value === 'None');
    if (normalized === '' && !options.length) {
      select.value = '';
    } else if (normalized === '') {
      if (noneOption) {
        select.value = 'None';
      } else {
        select.selectedIndex = -1;
      }
    } else if (noneOption) {
      select.value = 'None';
    } else {
      select.selectedIndex = -1;
    }
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(select);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(() => {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(select);
      }
    });
  }

  if (select === cameraSelect && typeof callCoreFunctionIfAvailable === 'function') {
    callCoreFunctionIfAvailable('updateRecordingMediaOptions');
  }

  if (typeof adjustGearListSelectWidth === 'function') {
    adjustGearListSelectWidth(select);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(() => {
      if (typeof adjustGearListSelectWidth === 'function') {
        adjustGearListSelectWidth(select);
      }
    });
  }
}

function resetSelectsToNone(selects) {
  selects.forEach(select => {
    if (!select) return;
    const options = Array.from(select.options || []);
    const noneOption = options.find(opt => opt.value === 'None');
    if (noneOption) {
      select.value = 'None';
    } else if (!options.length) {
      select.value = '';
    } else {
      select.selectedIndex = -1;
    }
  });
}

const _loadSession = (typeof window !== 'undefined' && typeof window.loadSession === 'function')
  ? window.loadSession
  : function loadSessionFallback() {
    return typeof loadSessionState === 'function' ? loadSessionState() : null;
  };

const _storeSession = (typeof window !== 'undefined' && typeof window.storeSession === 'function')
  ? window.storeSession
  : function storeSessionFallback(state) {
    if (typeof saveSessionState === 'function') {
      saveSessionState(state);
    }
  };

function restoreSessionState() {
  restoringSession = true;
  const loadedState = _loadSession();
  const state = (loadedState && typeof loadedState === 'object') ? { ...loadedState } : null;
  if (state) {
    const savedBattery = typeof state.battery === 'string' ? state.battery : '';
    const savedPlate = typeof state.batteryPlate === 'string' ? state.batteryPlate : '';
    const derivedPlate = typeof normalizeBatteryPlateValue === 'function'
      ? normalizeBatteryPlateValue(savedPlate, savedBattery)
      : savedPlate;
    state.batteryPlate = derivedPlate;
  }
  storeLoadedSetupState(state || null);
  let sessionDiagramPositions = {};
  if (state && typeof state.diagramPositions === 'object' && typeof normalizeDiagramPositionsInput === 'function') {
    sessionDiagramPositions = normalizeDiagramPositionsInput(state.diagramPositions);
  }
  if (typeof setManualDiagramPositions === 'function') {
    setManualDiagramPositions(sessionDiagramPositions, { render: false });
  }
  resetSelectsToNone(motorSelects);
  resetSelectsToNone(controllerSelects);
  if (state) {
    if (setupNameInput) {
      setupNameInput.value = state.setupName || '';
      setupNameInput.dispatchEvent(new Event('input'));
    }
    setSelectValue(cameraSelect, state.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, state.batteryPlate);
    applyBatteryPlateSelectionFromBattery(state.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    updateBatteryOptions();
    setSelectValue(monitorSelect, state.monitor);
    setSelectValue(videoSelect, state.video);
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions(state.cage);
    } else {
      setSelectValue(cageSelect, state.cage);
    }
    setSelectValue(distanceSelect, state.distance);
    if (Array.isArray(state.motors)) {
      state.motors.forEach((val, i) => { if (motorSelects[i]) setSelectValue(motorSelects[i], val); });
    }
    if (Array.isArray(state.controllers)) {
      state.controllers.forEach((val, i) => { if (controllerSelects[i]) setSelectValue(controllerSelects[i], val); });
    }
    setSelectValue(batterySelect, state.battery);
    applyBatteryPlateSelectionFromBattery(state.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    setSelectValue(hotswapSelect, state.batteryHotswap);
    if ((state && typeof state.battery === 'string' && state.battery.trim())
      || (state && typeof state.batteryHotswap === 'string' && state.batteryHotswap.trim())) {
      updateBatteryOptions();
    }
    setSelectValue(setupSelect, state.setupSelect);
    currentProjectInfo = state.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
  } else {
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }

  if (gearListOutput || projectRequirementsOutput) {
    const typedName = safeGetCurrentProjectName();
    const storageKey = getCurrentProjectStorageKey();
    const fetchStoredProject = name =>
      typeof loadProject === 'function' && typeof name === 'string'
        ? loadProject(name)
        : null;
    const hasProjectPayload = (project) => {
      if (!project || typeof project !== 'object') {
        return false;
      }

      if (Object.prototype.hasOwnProperty.call(project, 'gearList')) {
        return true;
      }
      if (Object.prototype.hasOwnProperty.call(project, 'gearSelectors')) {
        const selectors = project.gearSelectors;
        if (selectors && typeof selectors === 'object' && Object.keys(selectors).length) {
          return true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(project, 'gearListAndProjectRequirementsGenerated')) {
        return true;
      }

      return Boolean(
        project.projectInfo
        || project.powerSelection
        || (project.autoGearRules && project.autoGearRules.length)
        || (project.diagramPositions && Object.keys(project.diagramPositions).length)
      );
    };
    const candidateNames = [];
    if (typedName) {
      candidateNames.push(typedName);
    }
    if (storageKey || storageKey === '') {
      if (!candidateNames.includes(storageKey)) {
        candidateNames.push(storageKey);
      }
    }
    let storedProject = null;
    for (const name of candidateNames) {
      storedProject = fetchStoredProject(name);
      if (hasProjectPayload(storedProject)) {
        break;
      }
    }
    if (!hasProjectPayload(storedProject) && state) {
      const fallbackName = typeof state.setupSelect === 'string' ? state.setupSelect.trim() : '';
      if (fallbackName && !candidateNames.includes(fallbackName)) {
        const fallbackProject = fetchStoredProject(fallbackName);
        if (hasProjectPayload(fallbackProject)) {
          storedProject = fallbackProject;
        }
      }
    }
    if (hasProjectPayload(storedProject)) {
      if (
        storedProject
        && storedProject.powerSelection
        && typeof applyStoredPowerSelection === 'function'
      ) {
        const applied = applyStoredPowerSelection(storedProject.powerSelection);
        if (applied) {
          updateBatteryOptions();
        }
      }
      const storedHasProjectInfo = Object.prototype.hasOwnProperty.call(storedProject, 'projectInfo');
      const storedProjectInfo = storedHasProjectInfo
        && storedProject.projectInfo
        && typeof storedProject.projectInfo === 'object'
        ? storedProject.projectInfo
        : null;
      const sessionProjectInfo = currentProjectInfo && typeof currentProjectInfo === 'object'
        ? currentProjectInfo
        : null;

      let nextProjectInfo = null;
      if (storedHasProjectInfo) {
        if (storedProjectInfo && sessionProjectInfo) {
          nextProjectInfo = { ...storedProjectInfo, ...sessionProjectInfo };
        } else if (storedProjectInfo) {
          nextProjectInfo = { ...storedProjectInfo };
        } else {
          nextProjectInfo = null;
        }
      } else if (sessionProjectInfo) {
        nextProjectInfo = { ...sessionProjectInfo };
      }

      currentProjectInfo = nextProjectInfo;
      if (projectForm) populateProjectForm(currentProjectInfo || {});
      if (
        typeof normalizeDiagramPositionsInput === 'function'
        && typeof setManualDiagramPositions === 'function'
      ) {
        const storedDiagramPositions = normalizeDiagramPositionsInput(storedProject.diagramPositions);
        const combinedDiagramPositions = Object.keys(storedDiagramPositions).length
          ? { ...storedDiagramPositions, ...sessionDiagramPositions }
          : sessionDiagramPositions;
        setManualDiagramPositions(combinedDiagramPositions, { render: false });
        sessionDiagramPositions = combinedDiagramPositions;
      }
      displayGearAndRequirements(storedProject.gearList);
      if (gearListOutput && storedProject.gearList) {
        gearListOutput.classList.remove('hidden');
        skipNextGearListRefresh = true;
      }
      if (gearListOutput) {
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        if (
          storedProject
          && isPlainObject(storedProject.gearSelectors)
          && Object.keys(storedProject.gearSelectors).length
        ) {
          applyGearListSelectors(storedProject.gearSelectors);
        }
        if (state) {
          setSliderBowlValue(state.sliderBowl);
          setEasyrigValue(state.easyrig);
        }
        // Ensure the generator button reflects the restored gear list state
        updateGearListButtonVisibility();
      }
    } else if (currentProjectInfo && typeof generateGearListHtml === 'function') {
      const regeneratedHtml = generateGearListHtml(currentProjectInfo || {});
      if (regeneratedHtml) {
        displayGearAndRequirements(regeneratedHtml);
        if (gearListOutput) {
          gearListOutput.classList.remove('hidden');
          skipNextGearListRefresh = true;
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
          if (state) {
            setSliderBowlValue(state.sliderBowl);
            setEasyrigValue(state.easyrig);
          }
          updateGearListButtonVisibility();
        }
      }
    }
  }
  const highlightPreference = state && Object.prototype.hasOwnProperty.call(state, 'autoGearHighlight')
    ? Boolean(state.autoGearHighlight)
    : false;
  if (typeof setAutoGearHighlightEnabled === 'function') {
    setAutoGearHighlightEnabled(highlightPreference);
  } else if (gearListOutput && gearListOutput.classList) {
    gearListOutput.classList.toggle('show-auto-gear-highlight', highlightPreference);
    callSessionCoreFunction('updateAutoGearHighlightToggleButton', [], { defer: true });
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  if (typeof setActiveProjectCompressionHold === 'function') {
    let compressionHoldKey = '';
    if (typeof getCurrentProjectStorageKey === 'function') {
      try {
        compressionHoldKey = getCurrentProjectStorageKey({ allowTyped: true }) || '';
      } catch (holdError) {
        console.warn('Unable to determine active project key for compression hold after session restore', holdError);
        compressionHoldKey = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '';
      }
    } else if (setupSelect && typeof setupSelect.value === 'string') {
      compressionHoldKey = setupSelect.value;
    }
    setActiveProjectCompressionHold(compressionHoldKey);
  }
  restoringSession = false;
  saveCurrentSession();
  const pendingAutoSaveState = projectAutoSavePendingWhileRestoring;
  projectAutoSavePendingWhileRestoring = null;
  if (pendingAutoSaveState === 'immediate') {
    scheduleProjectAutoSave(true);
  } else if (pendingAutoSaveState === 'queued') {
    scheduleProjectAutoSave();
  }
}

function ensureImportedProjectBaseNameSession(rawName) {
  const trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  if (!trimmed) {
    return 'Project-imported';
  }

  const importedMatch = trimmed.match(/^(.*?)-imported(?:-(\d+))?$/i);
  if (importedMatch) {
    const prefix = typeof importedMatch[1] === 'string'
      ? importedMatch[1].trim()
      : '';
    return prefix ? `${prefix}-imported` : 'Project-imported';
  }

  if (trimmed.toLowerCase().endsWith('-imported')) {
    return trimmed;
  }

  return `${trimmed}-imported`;
}

function resolveImportedProjectNamingContextSession(rawName) {
  const trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  const base = ensureImportedProjectBaseNameSession(rawName);

  if (!trimmed) {
    return {
      base,
      initialCandidate: base,
      suffixStart: 2,
    };
  }

  const importedMatch = trimmed.match(/^(.*?)-imported(?:-(\d+))?$/i);
  const parsedSuffix = importedMatch && importedMatch[2]
    ? Number(importedMatch[2])
    : NaN;
  const suffixStart = Number.isFinite(parsedSuffix) ? parsedSuffix + 1 : 2;

  if (importedMatch) {
    return {
      base,
      initialCandidate: trimmed,
      suffixStart,
    };
  }

  return {
    base,
    initialCandidate: base,
    suffixStart: 2,
  };
}

function generateUniqueImportedProjectNameSession(baseName, usedNames, normalizedNames) {
  const normalized = normalizedNames
    || new Set(
      [...usedNames]
        .map((name) => (typeof name === 'string' ? name.trim().toLowerCase() : ''))
        .filter((name) => name),
    );

  const context = resolveImportedProjectNamingContextSession(baseName);
  let candidate = typeof context.initialCandidate === 'string'
    ? context.initialCandidate.trim()
    : '';

  if (!candidate) {
    candidate = context.base || 'Project-imported';
  }

  let normalizedCandidate = candidate.trim().toLowerCase();
  let suffix = context.suffixStart;
  while (normalizedCandidate && normalized.has(normalizedCandidate)) {
    const base = context.base || 'Project-imported';
    candidate = `${base}-${suffix++}`;
    normalizedCandidate = candidate.trim().toLowerCase();
  }

  usedNames.add(candidate);
  if (normalizedCandidate) {
    normalized.add(normalizedCandidate);
  }

  return candidate;
}

function persistImportedProjectWithFallback(payload, nameCandidates) {
  if (!payload || typeof saveProject !== 'function') {
    return '';
  }

  let usedNames = new Set();
  let normalizedNames = new Set();

  if (typeof loadProject === 'function') {
    try {
      const existingProjects = loadProject();
      if (existingProjects && typeof existingProjects === 'object') {
        const entries = Object.keys(existingProjects);
        usedNames = new Set(entries);
        normalizedNames = new Set(
          entries
            .map((name) => (typeof name === 'string' ? name.trim().toLowerCase() : ''))
            .filter((name) => name),
        );
      }
    } catch (projectReadError) {
      console.warn(
        'Unable to read existing projects while generating fallback name for imported project',
        projectReadError,
      );
    }
  }

  const candidates = Array.isArray(nameCandidates) ? nameCandidates : [];
  let baseName = '';
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = typeof candidates[index] === 'string' ? candidates[index].trim() : '';
    if (candidate) {
      baseName = candidate;
      break;
    }
  }
  if (!baseName) {
    baseName = 'Imported project';
  }

  const storageKey = generateUniqueImportedProjectNameSession(baseName, usedNames, normalizedNames);
  saveProject(storageKey, payload, { skipOverwriteBackup: true });
  return storageKey;
}

function clearOwnedGearExportArtifacts(element) {
  if (!element || typeof element.querySelectorAll !== 'function') {
    return;
  }
  element.removeAttribute('data-gear-owned-export-label');
  const badges = element.querySelectorAll('[data-gear-owned-export]');
  badges.forEach(badge => {
    if (badge && badge.parentElement) {
      badge.parentElement.removeChild(badge);
    }
  });
}

function applyImportedOwnedGearMarkers(markers, options = {}) {
  if (!Array.isArray(markers) || !markers.length) {
    return false;
  }
  const root = options && options.root ? options.root : gearListOutput;
  if (!root || typeof root.querySelector !== 'function') {
    return false;
  }

  const userProfile = typeof getUserProfileSnapshot === 'function'
    ? getUserProfileSnapshot()
    : null;
  const importerProfileName = userProfile && typeof userProfile.name === 'string'
    ? userProfile.name.trim()
    : '';
  const importerProfileNameLower = importerProfileName ? importerProfileName.toLowerCase() : '';
  const importerDisplayName = typeof formatUserProfileProviderName === 'function'
    ? formatUserProfileProviderName(importerProfileName)
    : importerProfileName;
  const importerDisplayNameLower = importerDisplayName ? importerDisplayName.toLowerCase() : '';

  let applied = false;

  markers.forEach(marker => {
    if (!marker || !marker.ownedId) {
      return;
    }
    const selectorId = (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function')
      ? CSS.escape(marker.ownedId)
      : String(marker.ownedId).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const element = root.querySelector(`[data-gear-own-gear-id="${selectorId}"]`);
    if (!element) {
      return;
    }

    clearOwnedGearExportArtifacts(element);

    const ownerDisplayName = typeof marker.ownerDisplayName === 'string'
      ? marker.ownerDisplayName.trim()
      : '';
    const ownerDisplayLower = ownerDisplayName ? ownerDisplayName.toLowerCase() : '';
    const ownerProfileName = typeof marker.ownerProfileName === 'string'
      ? marker.ownerProfileName.trim()
      : '';
    const ownerProfileLower = ownerProfileName ? ownerProfileName.toLowerCase() : '';
    const providerLabelFallback = typeof marker.providerLabel === 'string'
      ? marker.providerLabel.trim()
      : ownerDisplayName;

    const matchesImporter = Boolean(
      (importerProfileNameLower && ownerProfileLower && importerProfileNameLower === ownerProfileLower)
      || (importerDisplayNameLower && ownerDisplayLower && importerDisplayNameLower === ownerDisplayLower)
      || (importerProfileNameLower && ownerDisplayLower && importerProfileNameLower === ownerDisplayLower)
    );

    let providerValue = '';
    let providerLabel = providerLabelFallback;

    if (matchesImporter) {
      providerValue = 'user';
      providerLabel = '';
    } else if (marker.ownerType === 'contact' || ownerDisplayName) {
      const ensuredContact = typeof ensureContactForImportedOwner === 'function'
        ? ensureContactForImportedOwner(ownerDisplayName || providerLabelFallback, {
          contactId: marker.contactId,
          fallbackLabel: providerLabelFallback,
        })
        : null;
      if (ensuredContact && ensuredContact.value) {
        providerValue = ensuredContact.value;
        providerLabel = ensuredContact.label || providerLabelFallback;
      } else if (typeof marker.providerValue === 'string' && marker.providerValue.startsWith('contact:')) {
        providerValue = marker.providerValue;
      } else if (marker.providerValue && marker.providerValue !== 'user') {
        providerValue = marker.providerValue;
      }
    } else if (typeof marker.providerValue === 'string' && marker.providerValue) {
      providerValue = marker.providerValue;
    }

    if (typeof setGearItemProvider === 'function') {
      setGearItemProvider(element, providerValue, { label: providerLabel });
    } else {
      if (providerValue) {
        element.setAttribute('data-gear-provider', providerValue);
      } else {
        element.removeAttribute('data-gear-provider');
      }
      if (providerLabel) {
        element.setAttribute('data-gear-provider-label', providerLabel);
      } else {
        element.removeAttribute('data-gear-provider-label');
      }
    }

    applied = true;
  });

  if (applied && typeof dispatchGearProviderDataChanged === 'function') {
    dispatchGearProviderDataChanged('owned-gear-import');
  }

  return applied;
}

function mergeSharedContactsIntoCache(sharedContacts) {
  if (!Array.isArray(sharedContacts) || !sharedContacts.length) {
    return { added: 0, updated: 0 };
  }

  if (typeof contactsCache === 'undefined') {
    return { added: 0, updated: 0 };
  }

  const sanitize = value => {
    if (typeof sanitizeContactValue === 'function') {
      return sanitizeContactValue(value);
    }
    return typeof value === 'string' ? value.trim() : '';
  };

  const existingContacts = Array.isArray(contactsCache) ? contactsCache.slice() : [];
  let added = 0;
  let updated = 0;

  sharedContacts.forEach(entry => {
    if (!entry || typeof entry !== 'object') {
      return;
    }

    const normalized = typeof normalizeContactEntry === 'function'
      ? normalizeContactEntry(entry)
      : { ...entry };
    if (!normalized || typeof normalized !== 'object') {
      return;
    }

    const id = sanitize(normalized.id || entry.id);
    if (!id) {
      return;
    }

    const existingIndex = existingContacts.findIndex(contact => contact && contact.id === id);
    const createdAt = Number.isFinite(normalized.createdAt)
      ? normalized.createdAt
      : Number.isFinite(entry.createdAt)
        ? entry.createdAt
        : Date.now();
    const updatedAtCandidate = Number.isFinite(normalized.updatedAt)
      ? normalized.updatedAt
      : Number.isFinite(entry.updatedAt)
        ? entry.updatedAt
        : createdAt;

    if (existingIndex !== -1) {
      const existing = existingContacts[existingIndex];
      let changed = false;
      ['name', 'role', 'phone', 'email', 'website', 'notes'].forEach(field => {
        const incoming = sanitize(
          Object.prototype.hasOwnProperty.call(normalized, field)
            ? normalized[field]
            : entry[field]
        );
        if (!incoming) {
          return;
        }
        const currentValue = sanitize(existing[field]);
        if (!currentValue) {
          existing[field] = incoming;
          changed = true;
        }
      });
      const incomingAvatar = sanitize(normalized.avatar || entry.avatar);
      if (incomingAvatar && !sanitize(existing.avatar)) {
        existing.avatar = incomingAvatar;
        changed = true;
      }
      if (!Number.isFinite(existing.createdAt) && Number.isFinite(createdAt)) {
        existing.createdAt = createdAt;
        changed = true;
      }
      if (
        Number.isFinite(updatedAtCandidate)
        && (!Number.isFinite(existing.updatedAt) || existing.updatedAt < updatedAtCandidate)
      ) {
        existing.updatedAt = updatedAtCandidate;
        changed = true;
      } else if (changed && Number.isFinite(existing.updatedAt)) {
        existing.updatedAt = Date.now();
      } else if (changed && !Number.isFinite(existing.updatedAt)) {
        existing.updatedAt = Date.now();
      }
      if (changed) {
        updated += 1;
      }
      return;
    }

    const newContact = {
      id,
      name: sanitize(normalized.name || entry.name),
      role: sanitize(normalized.role || entry.role),
      phone: sanitize(normalized.phone || entry.phone),
      email: sanitize(normalized.email || entry.email),
      website: sanitize(normalized.website || entry.website),
      notes: sanitize(normalized.notes || entry.notes),
      avatar: sanitize(normalized.avatar || entry.avatar),
      createdAt,
      updatedAt: updatedAtCandidate,
    };
    if (!newContact.avatar) {
      delete newContact.avatar;
    }
    existingContacts.push(newContact);
    added += 1;
  });

  if (!added && !updated) {
    return { added: 0, updated: 0 };
  }

  try {
    if (typeof sortContacts === 'function') {
      contactsCache = sortContacts(existingContacts);
    } else {
      contactsCache = existingContacts.filter(Boolean);
    }
  } catch (sortError) {
    console.warn('Shared contact merge could not sort contacts', sortError);
    contactsCache = existingContacts.filter(Boolean);
  }

  if (typeof saveContactsToStorage === 'function') {
    try {
      saveContactsToStorage(contactsCache);
    } catch (saveError) {
      console.warn('Shared contact merge could not persist contacts', saveError);
    }
  }
  if (typeof renderContactsList === 'function') {
    try {
      renderContactsList();
    } catch (renderError) {
      void renderError;
    }
  }
  if (typeof updateContactPickers === 'function') {
    try {
      updateContactPickers();
    } catch (pickerError) {
      void pickerError;
    }
  }

  return { added, updated };
}

function resolveProjectNameCollisionForImport(baseName) {
  const trimmed = typeof baseName === 'string' ? baseName.trim() : '';
  if (!trimmed) {
    return { name: trimmed, changed: false };
  }
  if (typeof loadProject !== 'function') {
    return { name: trimmed, changed: false };
  }
  let existingProjects;
  try {
    existingProjects = loadProject();
  } catch (projectReadError) {
    console.warn('Unable to inspect existing projects during shared import', projectReadError);
    existingProjects = null;
  }
  if (!existingProjects || typeof existingProjects !== 'object') {
    return { name: trimmed, changed: false };
  }
  const normalizedExisting = new Set(
    Object.keys(existingProjects)
      .map((key) => (typeof key === 'string' ? key.trim().toLowerCase() : ''))
      .filter((key) => key),
  );
  const normalizedCandidate = trimmed.toLowerCase();
  if (!normalizedExisting.has(normalizedCandidate)) {
    return { name: trimmed, changed: false };
  }
  let suffix = 2;
  let candidate = `${trimmed} (${suffix})`;
  let normalizedCandidateWithSuffix = candidate.trim().toLowerCase();
  while (normalizedExisting.has(normalizedCandidateWithSuffix)) {
    suffix += 1;
    candidate = `${trimmed} (${suffix})`;
    normalizedCandidateWithSuffix = candidate.trim().toLowerCase();
  }
  return { name: candidate, changed: true };
}

function applySharedSetup(shared, options = {}) {
  try {
    const decoded = decodeSharedSetup(
      typeof shared === 'string' ? JSON.parse(shared) : shared
    );
    if (decoded && decoded.contacts) {
      mergeSharedContactsIntoCache(decoded.contacts);
    }
    deactivateSharedImportProjectPreset();
    const sharedRulesFromData = Array.isArray(decoded.autoGearRules) ? decoded.autoGearRules : null;
    const providedRules = Array.isArray(options.sharedAutoGearRules) && options.sharedAutoGearRules.length
      ? options.sharedAutoGearRules
      : sharedRulesFromData;
    const hasProvidedRules = Array.isArray(providedRules) && providedRules.length > 0;
    const providedMode = options.autoGearMode;
    let modes = Array.isArray(providedMode)
      ? providedMode.slice()
      : (typeof providedMode === 'string' ? [providedMode] : []);
    modes = modes.filter((value, index, arr) => (
      (value === 'none' || value === 'project' || value === 'global')
      && arr.indexOf(value) === index
    ));
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    if (modes.length > 1 && modes.includes('none')) {
      modes = modes.filter(value => value !== 'none');
    }
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    const applyGlobal = modes.includes('global');
    const applyProject = modes.includes('project');
    const applyNoneOnly = modes.length === 1 && modes[0] === 'none';
    let autoGearUpdated = false;
    if (applyGlobal) {
      if (hasProvidedRules) {
        const merged = mergeAutoGearRules(getBaseAutoGearRules(), providedRules);
        const preset = ensureSharedAutoGearPreset(merged, decoded);
        if (preset) {
          setActiveAutoGearPresetId(preset.id, { persist: true, skipRender: true });
        }
        setAutoGearRules(merged);
        autoGearUpdated = true;
      } else if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        autoGearUpdated = true;
      }
    }
    if (applyProject) {
      if (hasProvidedRules) {
        const preset = ensureSharedAutoGearPreset(providedRules, decoded);
        if (preset) {
          activateSharedImportProjectPreset(preset.id);
        }
        useProjectAutoGearRules(providedRules);
      } else {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
      }
      autoGearUpdated = true;
    } else if (!applyGlobal && (applyNoneOnly || !hasProvidedRules)) {
      if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
        autoGearUpdated = true;
      }
    }
    if (autoGearUpdated) {
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
    }
    if (decoded.changedDevices) {
      applyDeviceChanges(decoded.changedDevices);
    }
    if (setupNameInput && decoded.setupName) {
      setupNameInput.value = decoded.setupName;
      setupNameInput.dispatchEvent(new Event('input'));
    }
    resetSelectsToNone(motorSelects);
    resetSelectsToNone(controllerSelects);
    setSelectValue(cameraSelect, decoded.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, decoded.batteryPlate);
    applyBatteryPlateSelectionFromBattery(decoded.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    updateBatteryOptions();
    setSelectValue(monitorSelect, decoded.monitor);
    setSelectValue(videoSelect, decoded.video);
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions(decoded.cage);
    } else {
      setSelectValue(cageSelect, decoded.cage);
    }
    setSelectValue(distanceSelect, decoded.distance);
    if (Array.isArray(decoded.motors)) {
      decoded.motors.forEach((val, i) => { if (motorSelects[i]) setSelectValue(motorSelects[i], val); });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach((val, i) => { if (controllerSelects[i]) setSelectValue(controllerSelects[i], val); });
    }
    setSelectValue(batterySelect, decoded.battery);
    applyBatteryPlateSelectionFromBattery(decoded.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    let sharedPowerApplied = false;
    if (decoded.powerSelection && typeof applyStoredPowerSelection === 'function') {
      sharedPowerApplied = applyStoredPowerSelection(decoded.powerSelection);
    }
    if ((typeof decoded.battery === 'string' && decoded.battery.trim())
      || (typeof decoded.batteryHotswap === 'string' && decoded.batteryHotswap.trim())) {
      updateBatteryOptions();
    } else if (sharedPowerApplied) {
      updateBatteryOptions();
    }
    if (typeof setManualDiagramPositions === 'function') {
      let sharedDiagramPositions = {};
      if (typeof normalizeDiagramPositionsInput === 'function' && decoded.diagramPositions) {
        sharedDiagramPositions = normalizeDiagramPositionsInput(decoded.diagramPositions);
      }
      setManualDiagramPositions(sharedDiagramPositions, { render: false });
    }
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      const key = getCurrentSetupKey();
      const fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    currentProjectInfo = decoded.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
    let gearDisplayed = false;
    let combinedHtml = '';
    if (decoded.projectHtml || decoded.gearList) {
      combinedHtml = `${decoded.projectHtml || ''}${decoded.gearList || ''}`;
    }
    if (!combinedHtml && decoded.projectInfo && typeof generateGearListHtml === 'function') {
      combinedHtml = generateGearListHtml(decoded.projectInfo || {});
    }
    if (!combinedHtml && typeof generateGearListHtml === 'function') {
      combinedHtml = generateGearListHtml(currentProjectInfo || {});
    }
    if (combinedHtml) {
      displayGearAndRequirements(combinedHtml);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    }
    if (decoded.gearSelectors && gearDisplayed) {
      applyGearListSelectors(decoded.gearSelectors);
    }
    if (gearDisplayed && Array.isArray(decoded.ownedGearMarkers) && decoded.ownedGearMarkers.length) {
      applyImportedOwnedGearMarkers(decoded.ownedGearMarkers, { root: gearListOutput });
    }
    if (
      decoded.projectInfo
      || decoded.gearSelectors
      || decoded.gearList
      || Object.prototype.hasOwnProperty.call(decoded, 'gearListAndProjectRequirementsGenerated')
    ) {
      const currentGearList = getCurrentGearListHtml();
      const payload = {
        projectInfo: decoded.projectInfo || null,
        gearListAndProjectRequirementsGenerated: Boolean(currentGearList)
      };
      if (decoded.gearSelectors && Object.keys(decoded.gearSelectors).length) {
        payload.gearSelectors = decoded.gearSelectors;
      }
      if (typeof getDiagramManualPositions === 'function') {
        const diagramPositions = getDiagramManualPositions();
        if (diagramPositions && Object.keys(diagramPositions).length) {
          payload.diagramPositions = diagramPositions;
        }
      }
      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      const selectedName = setupSelect && typeof setupSelect.value === 'string'
        ? setupSelect.value.trim()
        : '';
      let typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      let storageKey = selectedName || typedName;
      if (!selectedName && storageKey) {
        const resolved = resolveProjectNameCollisionForImport(storageKey);
        if (resolved.changed && resolved.name) {
          storageKey = resolved.name;
          typedName = resolved.name;
          if (setupNameInput && setupNameInput.value !== resolved.name) {
            setupNameInput.value = resolved.name;
            try {
              setupNameInput.dispatchEvent(new Event('input'));
            } catch (dispatchError) {
              void dispatchError;
            }
          }
        }
      }
      const hasSelectors = Object.prototype.hasOwnProperty.call(payload, 'gearSelectors');
      const hasAutoRules = payload.autoGearRules && payload.autoGearRules.length;
      if (
        typeof storageKey === 'string'
        && (
          payload.projectInfo
          || hasSelectors
          || payload.gearListAndProjectRequirementsGenerated
          || hasAutoRules
          || payload.diagramPositions
        )
      ) {
        if (!hasAutoRules) {
          delete payload.autoGearRules;
        }
        saveProject(storageKey, payload, { skipOverwriteBackup: true });
      } else if (
        payload
        && (
          payload.projectInfo
          || hasSelectors
          || payload.gearListAndProjectRequirementsGenerated
          || hasAutoRules
          || payload.diagramPositions
        )
      ) {
        if (!hasAutoRules) {
          delete payload.autoGearRules;
        }
        const fallbackNames = [
          decoded.setupName,
          decoded.projectInfo && decoded.projectInfo.projectName,
          payload.projectInfo && payload.projectInfo.projectName,
        ];
        const generatedKey = persistImportedProjectWithFallback(payload, fallbackNames);
        if (generatedKey) {
          if (setupNameInput && setupNameInput.value !== generatedKey) {
            setupNameInput.value = generatedKey;
            setupNameInput.dispatchEvent(new Event('input'));
          }
          if (typeof populateSetupSelect === 'function') {
            try {
              populateSetupSelect();
            } catch (refreshError) {
              console.warn(
                'Unable to refresh project selector after saving imported project without a provided name',
                refreshError,
              );
            }
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to apply shared setup', e);
    alert(texts[currentLang].invalidSharedLink);
  }
}

let manualQueryParamWarningShown = false;

function getQueryParam(search, key) {
  if (!key) {
    return null;
  }

  if (typeof URLSearchParams === 'function') {
    try {
      return new URLSearchParams(search).get(key);
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Falling back to manual query parameter parsing.', error);
      }
      manualQueryParamWarningShown = true;
    }
  }

  if (typeof search !== 'string' || search.length === 0) {
    return null;
  }

  const query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return null;
  }

  const pairs = query.split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    if (!pairs[i]) {
      continue;
    }

    const [rawName, rawValue = ''] = pairs[i].split('=');
    if (!rawName) {
      continue;
    }

    let decodedName;
    try {
      decodedName = decodeURIComponent(rawName.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter name', rawName, error);
      }
      manualQueryParamWarningShown = true;
      continue;
    }

    if (decodedName !== key) {
      continue;
    }

    try {
      return decodeURIComponent(rawValue.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter value', rawValue, error);
      }
      manualQueryParamWarningShown = true;
      return rawValue;
    }
  }

  return null;
}

function buildSearchWithoutShared(search) {
  if (typeof search !== 'string' || search.length === 0) {
    return '';
  }

  const query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return '';
  }

  const preserved = [];
  const pairs = query.split('&');
  for (let index = 0; index < pairs.length; index += 1) {
    const pair = pairs[index];
    if (!pair) {
      continue;
    }

    const [rawName] = pair.split('=');
    if (!rawName) {
      preserved.push(pair);
      continue;
    }

    let decodedName;
    try {
      decodedName = decodeURIComponent(rawName.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter name', rawName, error);
      }
      manualQueryParamWarningShown = true;
      decodedName = rawName;
    }

    if (decodedName === 'shared') {
      continue;
    }

    preserved.push(pair);
  }

  if (preserved.length === 0) {
    return '';
  }

  return `?${preserved.join('&')}`;
}

function removeSharedQueryParamFromLocation() {
  if (typeof window === 'undefined') {
    return;
  }

  const { location, history } = window;
  if (!location || !history || typeof history.replaceState !== 'function') {
    return;
  }

  const pathname = typeof location.pathname === 'string' && location.pathname ? location.pathname : '/';
  const search = typeof location.search === 'string' ? location.search : '';
  const hash = typeof location.hash === 'string' ? location.hash : '';

  let updatedSearch = '';
  let handledWithNativeApi = false;

  if (typeof URLSearchParams === 'function') {
    try {
      const params = new URLSearchParams(search);
      params.delete('shared');
      const serialized = params.toString();
      updatedSearch = serialized ? `?${serialized}` : '';
      handledWithNativeApi = true;
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to rewrite query string with URLSearchParams', error);
      }
      manualQueryParamWarningShown = true;
    }
  }

  if (!handledWithNativeApi) {
    updatedSearch = buildSearchWithoutShared(search);
  }

  const currentSearch = search || '';
  const nextSearch = typeof updatedSearch === 'string' ? updatedSearch : '';

  const currentUrl = `${pathname}${currentSearch}${hash}`;
  const nextUrl = `${pathname}${nextSearch}${hash}`;

  if (currentUrl !== nextUrl) {
    history.replaceState(null, '', nextUrl);
  }
}

function applySharedSetupFromUrl() {
  const hasSearch =
    typeof window !== 'undefined'
    && window.location
    && typeof window.location.search === 'string';
  const search = hasSearch ? window.location.search : '';
  const shared = getQueryParam(search, 'shared');
  if (!shared) return;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(shared);
    if (typeof decompressed !== 'string') {
      throw new Error('Shared payload could not be decompressed');
    }
    const data = JSON.parse(decompressed);
    applySharedSetup(data);
    if (typeof updateCalculations === 'function') {
      updateCalculations();
    }
    removeSharedQueryParamFromLocation();
  } catch (e) {
    console.error('Failed to apply shared setup from URL', e);
  }
}

// --- EVENT LISTENERS FÜR NEUBERECHNUNG ---

function getTrackedPowerSelects() {
  const maybeHotswap = typeof hotswapSelect === 'undefined' ? null : hotswapSelect;
  return [
    cameraSelect,
    monitorSelect,
    videoSelect,
    cageSelect,
    distanceSelect,
    batterySelect,
    maybeHotswap,
    batteryPlateSelect,
  ].filter(Boolean);
}

function getTrackedPowerSelectsWithSetup() {
  const selects = getTrackedPowerSelects();
  const maybeSetup = typeof setupSelect === 'undefined' ? null : setupSelect;
  if (maybeSetup) {
    selects.push(maybeSetup);
  }
  return selects;
}

function forEachTrackedSelect(collection, handler) {
  if (!collection || typeof handler !== 'function') {
    return;
  }
  if (typeof collection.forEach === 'function') {
    collection.forEach(handler);
    return;
  }
  const list = Array.isArray(collection) ? collection : Array.from(collection || []);
  list.forEach(handler);
}

// Sicherstellen, dass Änderungen an den Selects auch neu berechnen
forEachTrackedSelect(getTrackedPowerSelects(), (sel) => {
  sel.addEventListener('change', updateCalculations);
});
if (cameraSelect) {
  cameraSelect.addEventListener('change', () => {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions();
    }
    const desiredFrameRate = currentProjectInfo && currentProjectInfo.recordingFrameRate;
    const desiredSlowMotionFrameRate = currentProjectInfo && currentProjectInfo.slowMotionRecordingFrameRate;
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateSlowMotionRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.slowMotionRecordingResolution);
    populateSlowMotionSensorModeDropdown(currentProjectInfo && currentProjectInfo.slowMotionSensorMode);
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(desiredFrameRate);
    }
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(desiredSlowMotionFrameRate);
    }
    if (typeof updateStorageRequirementTypeOptions === 'function') {
      updateStorageRequirementTypeOptions();
    }
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      try {
        document.dispatchEvent(new CustomEvent('camera-selection-changed'));
      } catch (error) {
        void error;
      }
    }
  });
}

if (sensorModeDropdown) {
  sensorModeDropdown.addEventListener('change', () => {
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(getCurrentFrameRateInputValue());
    }
  });
}

if (recordingResolutionDropdown) {
  recordingResolutionDropdown.addEventListener('change', () => {
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(getCurrentFrameRateInputValue());
    }
  });
}

if (slowMotionSensorModeDropdown) {
  slowMotionSensorModeDropdown.addEventListener('change', () => {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}

if (slowMotionRecordingResolutionDropdown) {
  slowMotionRecordingResolutionDropdown.addEventListener('change', () => {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}

if (slowMotionAspectRatioSelect) {
  slowMotionAspectRatioSelect.addEventListener('change', () => {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}
if (monitoringConfigurationSelect) {
  monitoringConfigurationSelect.addEventListener('change', () => {
    monitoringConfigurationUserChanged = true;
    updateViewfinderSettingsVisibility();
  });
}
if (monitorSelect) {
  monitorSelect.addEventListener('change', updateMonitoringConfigurationOptions);
}
if (batteryPlateSelect) batteryPlateSelect.addEventListener('change', updateBatteryOptions);
if (batterySelect) batterySelect.addEventListener('change', updateBatteryOptions);
if (hotswapSelect) hotswapSelect.addEventListener('change', updateCalculations);

forEachTrackedSelect(motorSelects, (sel) => { if (sel) sel.addEventListener('change', updateCalculations); });
forEachTrackedSelect(controllerSelects, (sel) => { if (sel) sel.addEventListener('change', updateCalculations); });

forEachTrackedSelect(getTrackedPowerSelectsWithSetup(), (sel) => {
  sel.addEventListener('change', saveCurrentSession);
});
forEachTrackedSelect(motorSelects, (sel) => { if (sel) sel.addEventListener('change', saveCurrentSession); });
forEachTrackedSelect(controllerSelects, (sel) => { if (sel) sel.addEventListener('change', saveCurrentSession); });
if (setupNameInput) {
  const handleSetupNameInput = () => {
    const typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
    const selectedName = setupSelect ? setupSelect.value : '';
    const renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    saveCurrentSession({ skipGearList: renameInProgress });
  };
  setupNameInput.addEventListener("input", handleSetupNameInput);
}

forEachTrackedSelect(getTrackedPowerSelects(), (sel) => {
  sel.addEventListener('change', saveCurrentGearList);
});
forEachTrackedSelect(motorSelects, (sel) => { if (sel) sel.addEventListener('change', saveCurrentGearList); });
forEachTrackedSelect(controllerSelects, (sel) => { if (sel) sel.addEventListener('change', saveCurrentGearList); });

forEachTrackedSelect(getTrackedPowerSelects(), (sel) => {
  sel.addEventListener('change', checkSetupChanged);
});
forEachTrackedSelect(motorSelects, (sel) => { if (sel) sel.addEventListener('change', checkSetupChanged); });
forEachTrackedSelect(controllerSelects, (sel) => { if (sel) sel.addEventListener('change', checkSetupChanged); });
if (setupNameInput) setupNameInput.addEventListener('input', checkSetupChanged);

forEachTrackedSelect(getTrackedPowerSelects(), (sel) => {
  sel.addEventListener('change', autoSaveCurrentSetup);
});
forEachTrackedSelect(motorSelects, (sel) => { if (sel) sel.addEventListener('change', autoSaveCurrentSetup); });
forEachTrackedSelect(controllerSelects, (sel) => { if (sel) sel.addEventListener('change', autoSaveCurrentSetup); });
if (setupNameInput) setupNameInput.addEventListener('change', autoSaveCurrentSetup);

function flushProjectAutoSaveOnExit(eventOrOptions) {
  if (factoryResetInProgress) return;

  let event = null;
  let options = null;
  if (eventOrOptions && typeof eventOrOptions === 'object') {
    if (typeof eventOrOptions.type === 'string') {
      event = eventOrOptions;
    } else {
      options = eventOrOptions;
    }
  }

  const providedReason = options && typeof options.reason === 'string' && options.reason.trim()
    ? options.reason.trim()
    : null;
  const eventReason = event && typeof event.type === 'string' && event.type
    ? `before-${event.type}`
    : null;
  const flushReason = providedReason || eventReason || 'before-exit';

  const scope = typeof globalThis !== 'undefined'
    ? globalThis
    : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null));
  let hideIndicator = null;
  if (scope && typeof scope.__cineShowAutoBackupIndicator === 'function') {
    try {
      const langTexts = texts[currentLang] || {};
      const fallbackTexts = texts.en || {};
      const message = langTexts.autoBackupInProgressNotice
        || fallbackTexts.autoBackupInProgressNotice
        || 'Auto backup in progress. Performance may pause briefly.';
      hideIndicator = scope.__cineShowAutoBackupIndicator(message);
    } catch (indicatorError) {
      console.warn('Failed to show auto backup indicator before exit', indicatorError);
      hideIndicator = null;
    }
  }
  notifyAutoBackupChange({ immediate: true, reason: flushReason, pending: true });
  try {
    if (scope && typeof scope.autoBackup === 'function') {
      scope.autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'before-reload',
      });
    }
  } catch (backupError) {
    console.warn('Failed to auto backup before exit', backupError);
  } finally {
    if (hideIndicator) {
      try {
        hideIndicator();
      } catch (hideError) {
        console.warn('Failed to hide auto backup indicator after exit flush', hideError);
      }
    }
  }
  scheduleProjectAutoSave(true);
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit({ reason: 'before-visibility-hidden' });
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload', 'freeze'].forEach((eventName) => {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}

// Enable Save button only when a setup name is entered. Enter saves only after
// the input is finalized (no active composition), aligning with the IME guard.
if (setupNameInput && saveSetupBtn) {
  const toggleSaveSetupBtn = () => {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 229) {
      return;
    }

    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}

const warnMountVoltageHelper = typeof warnMissingMountVoltageHelper === 'function'
  ? warnMissingMountVoltageHelper
  : () => { };

let updateThemeColor = () => { };
let setToggleIcon = () => { };
let applyDarkMode = () => { };
let applyHighContrast = () => { };
let applyReduceMotion = () => { };
let applyRelaxedSpacing = () => { };
let applyPinkMode = () => { };
let persistPinkModePreference = () => { };
let rememberSettingsPinkModeBaseline = () => { };
let revertSettingsPinkModeIfNeeded = () => { };
let rememberSettingsTemperatureUnitBaseline = () => { };
let revertSettingsTemperatureUnitIfNeeded = () => { };
let rememberSettingsFocusScaleBaseline = () => { };
let revertSettingsFocusScaleIfNeeded = () => { };
let applyShowAutoBackupsPreference = () => { };
let rememberSettingsShowAutoBackupsBaseline = () => { };
let revertSettingsShowAutoBackupsIfNeeded = () => { };
let rememberSettingsMountVoltagesBaseline = () => { };
let revertSettingsMountVoltagesIfNeeded = () => { };
let handlePinkModeIconPress = () => { };
let triggerPinkModeIconAnimation = () => { };

const pendingPinkModeSupportCalls = [];
let pinkModeSupportFlushScheduled = false;
const PINK_MODE_SUPPORT_QUEUE_LIMIT = 25;

function clonePinkModeSupportArgs(args) {
  if (!Array.isArray(args)) {
    return args;
  }

  try {
    return args.slice();
  } catch (error) {
    void error;
  }

  return args;
}

function invokePinkModeSupport(methodName, args, warningMessage) {
  if (typeof PINK_MODE_SUPPORT_API === 'undefined' || !PINK_MODE_SUPPORT_API) {
    return undefined;
  }

  const method = PINK_MODE_SUPPORT_API[methodName];
  if (typeof method !== 'function') {
    return undefined;
  }

  try {
    return method.apply(PINK_MODE_SUPPORT_API, Array.isArray(args) ? args : []);
  } catch (error) {
    if (
      typeof console !== 'undefined' &&
      console &&
      typeof console.warn === 'function' &&
      warningMessage
    ) {
      console.warn(warningMessage, error);
    }
  }

  return undefined;
}

function flushPendingPinkModeSupportCalls() {
  pinkModeSupportFlushScheduled = false;

  if (typeof PINK_MODE_SUPPORT_API === 'undefined' || !PINK_MODE_SUPPORT_API) {
    if (pendingPinkModeSupportCalls.length && typeof setTimeout === 'function') {
      pinkModeSupportFlushScheduled = true;
      setTimeout(flushPendingPinkModeSupportCalls, 50);
    }
    return;
  }

  while (pendingPinkModeSupportCalls.length) {
    const entry = pendingPinkModeSupportCalls.shift();
    if (!entry) {
      continue;
    }
    try {
      invokePinkModeSupport(entry.methodName, entry.args, entry.warningMessage);
    } catch (error) {
      void error;
    }
  }
}

function schedulePinkModeSupportFlush() {
  if (pinkModeSupportFlushScheduled || typeof setTimeout !== 'function') {
    return;
  }

  pinkModeSupportFlushScheduled = true;
  setTimeout(flushPendingPinkModeSupportCalls, 0);
}

function enqueuePinkModeSupportCall(methodName, args, warningMessage) {
  if (pendingPinkModeSupportCalls.length >= PINK_MODE_SUPPORT_QUEUE_LIMIT) {
    pendingPinkModeSupportCalls.shift();
  }

  pendingPinkModeSupportCalls.push({
    methodName,
    args: clonePinkModeSupportArgs(args),
    warningMessage,
  });

  schedulePinkModeSupportFlush();
}

function callPinkModeSupport(methodName, args, warningMessage) {
  const apiReady = typeof PINK_MODE_SUPPORT_API !== 'undefined' && PINK_MODE_SUPPORT_API;

  if (!apiReady) {
    enqueuePinkModeSupportCall(methodName, args, warningMessage);
    return undefined;
  }

  const result = invokePinkModeSupport(methodName, args, warningMessage);

  if (pendingPinkModeSupportCalls.length) {
    flushPendingPinkModeSupportCalls();
  }

  return result;
}

const FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN = () =>
  callPinkModeSupport('triggerPinkModeIconRain', null, 'cineSession: triggerPinkModeIconRain failed.');
let sessionTriggerPinkModeIconRain =
  typeof window !== 'undefined' && typeof window.triggerPinkModeIconRain === 'function'
    ? window.triggerPinkModeIconRain
    : FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN;
let startPinkModeIconRotation = () => { };
let stopPinkModeIconRotation = () => { };
const FALLBACK_START_PINK_MODE_ANIMATED_ICONS = () =>
  callPinkModeSupport('startPinkModeAnimatedIcons', null, 'cineSession: startPinkModeAnimatedIcons failed.');
let sessionStartPinkModeAnimatedIcons =
  typeof window !== 'undefined' && typeof window.startPinkModeAnimatedIcons === 'function'
    ? window.startPinkModeAnimatedIcons
    : FALLBACK_START_PINK_MODE_ANIMATED_ICONS;
const FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS = () =>
  callPinkModeSupport('stopPinkModeAnimatedIcons', null, 'cineSession: stopPinkModeAnimatedIcons failed.');
let sessionStopPinkModeAnimatedIcons =
  typeof window !== 'undefined' && typeof window.stopPinkModeAnimatedIcons === 'function'
    ? window.stopPinkModeAnimatedIcons
    : FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS;
let startPinkModeAnimatedIconRotation = () => { };
let stopPinkModeAnimatedIconRotation = () => { };
let applyPinkModeIcon = () => { };
let isPinkModeActive = () => !!(typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode'));

const appearanceModuleFactoryPlaceholder = ensureSessionRuntimePlaceholder(
  'cineSettingsAppearance',
  () => null,
);

const appearanceModuleValidator = candidate => !!candidate && typeof candidate.initialize === 'function';

let appearanceModule = null;
let themePreferenceController = null;
let appearanceModuleInitialized = false;
let appearanceModuleUnavailableWarningHandle = null;

function clearAppearanceModuleUnavailableWarning() {
  if (appearanceModuleUnavailableWarningHandle === null) {
    return;
  }

  try {
    clearTimeout(appearanceModuleUnavailableWarningHandle);
  } catch (clearError) {
    void clearError;
  }

  appearanceModuleUnavailableWarningHandle = null;
}

function warnAppearanceModuleUnavailable() {
  if (appearanceModuleInitialized) {
    return;
  }

  if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
    console.warn('cineSettingsAppearance module is not available; settings appearance features are limited.');
  }
}

function scheduleAppearanceModuleUnavailableWarning() {
  if (appearanceModuleUnavailableWarningHandle !== null) {
    return;
  }

  if (typeof setTimeout !== 'function') {
    warnAppearanceModuleUnavailable();
    return;
  }

  appearanceModuleUnavailableWarningHandle = setTimeout(() => {
    appearanceModuleUnavailableWarningHandle = null;
    warnAppearanceModuleUnavailable();
  }, 1500);
}

const appearanceContext = {
  document: typeof document !== 'undefined' ? document : null,
  window: typeof window !== 'undefined' ? window : null,
  elements: {
    darkModeToggle: typeof darkModeToggle !== 'undefined' ? darkModeToggle : null,
    pinkModeToggle: typeof pinkModeToggle !== 'undefined' ? pinkModeToggle : null,
    pinkModeHelpIcon: typeof pinkModeHelpIcon !== 'undefined' ? pinkModeHelpIcon : null,
  },
  settings: {
    darkMode: typeof settingsDarkMode !== 'undefined' ? settingsDarkMode : null,
    highContrast: typeof settingsHighContrast !== 'undefined' ? settingsHighContrast : null,
    pinkMode: typeof settingsPinkMode !== 'undefined' ? settingsPinkMode : null,
    reduceMotion: typeof settingsReduceMotion !== 'undefined' ? settingsReduceMotion : null,
    relaxedSpacing: typeof settingsRelaxedSpacing !== 'undefined' ? settingsRelaxedSpacing : null,
    showAutoBackups: typeof settingsShowAutoBackups !== 'undefined' ? settingsShowAutoBackups : null,
    temperatureUnit: typeof settingsTemperatureUnit !== 'undefined' ? settingsTemperatureUnit : null,
    focusScale: typeof settingsFocusScale !== 'undefined' ? settingsFocusScale : null,
  },
  accent: {
    accentColorInput: typeof accentColorInput !== 'undefined' ? accentColorInput : null,
    getAccentColor: () => accentColor,
    setAccentColor: value => {
      accentColor = value;
    },
    getPrevAccentColor: () => prevAccentColor,
    setPrevAccentColor: value => {
      prevAccentColor = value;
    },
    getHighContrastAccentColor: () => HIGH_CONTRAST_ACCENT_COLOR,
    clearAccentColorOverrides: () => {
      if (typeof clearAccentColorOverrides === 'function') {
        clearAccentColorOverrides();
      }
    },
    applyAccentColor: value => {
      if (typeof applyAccentColor === 'function') {
        applyAccentColor(value);
      }
    },
    updateAccentColorResetButtonState: () => {
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    },
    refreshDarkModeAccentBoost: payload => {
      if (typeof refreshDarkModeAccentBoost === 'function') {
        refreshDarkModeAccentBoost(payload);
      }
    },
    isHighContrastActive: () => (typeof isHighContrastActive === 'function' ? isHighContrastActive() : false),
  },
  cameraColors: {
    getColors: () => getCameraLetterColorsSafeSession(),
    setColors: palette => applyCameraLetterColors(palette),
  },
  icons: {
    registry: typeof ICON_GLYPHS === 'object' ? ICON_GLYPHS : null,
    applyIconGlyph: typeof applyIconGlyph === 'function' ? (element, glyph) => applyIconGlyph(element, glyph) : null,
    ensureSvgHasAriaHidden: typeof ensureSvgHasAriaHidden === 'function' ? ensureSvgHasAriaHidden : null,
    pinkModeIcons: typeof pinkModeIcons === 'object' ? pinkModeIcons : null,
    startPinkModeAnimatedIcons: (...args) => {
      const impl =
        (typeof window !== 'undefined' && typeof window.startPinkModeAnimatedIcons === 'function'
          ? window.startPinkModeAnimatedIcons
          : null) || sessionStartPinkModeAnimatedIcons;
      return typeof impl === 'function' ? impl(...args) : undefined;
    },
    stopPinkModeAnimatedIcons: (...args) => {
      const impl =
        (typeof window !== 'undefined' && typeof window.stopPinkModeAnimatedIcons === 'function'
          ? window.stopPinkModeAnimatedIcons
          : null) || sessionStopPinkModeAnimatedIcons;
      return typeof impl === 'function' ? impl(...args) : undefined;
    },
    triggerPinkModeIconRain: (...args) => {
      const impl =
        (typeof window !== 'undefined' && typeof window.triggerPinkModeIconRain === 'function'
          ? window.triggerPinkModeIconRain
          : null) || sessionTriggerPinkModeIconRain;
      return typeof impl === 'function' ? impl(...args) : undefined;
    },
  },
  storage: {
    getLocalStorage: () => {
      try {
        return typeof localStorage !== 'undefined' ? localStorage : null;
      } catch (storageError) {
        void storageError;
        return null;
      }
    },
    getSafeLocalStorage: () => {
      try {
        if (typeof getSafeLocalStorage === 'function') {
          return getSafeLocalStorage();
        }
      } catch (storageError) {
        console.warn('cineSettingsAppearance: getSafeLocalStorage threw while building context', storageError);
      }
      return null;
    },
    resolveSafeLocalStorage: () => {
      try {
        if (typeof resolveSafeLocalStorage === 'function') {
          return resolveSafeLocalStorage();
        }
      } catch (storageError) {
        console.warn('cineSettingsAppearance: resolveSafeLocalStorage threw while building context', storageError);
      }
      return null;
    },
  },
  preferences: {
    getTemperatureUnit: () => localTemperatureUnit,
    setTemperatureUnit: value => {
      localTemperatureUnit = normalizeTemperatureUnitValue(value);
    },
    applyTemperatureUnitPreference: applyTemperatureUnitPreferenceWithFallback,
    getFocusScale: () => {
      const globalScale = typeof focusScalePreference === 'string'
        ? focusScalePreference
        : sessionFocusScale;
      sessionFocusScale =
        typeof normalizeFocusScale === 'function' ? normalizeFocusScale(globalScale) : globalScale;
      return sessionFocusScale;
    },
    setFocusScale: value => {
      sessionFocusScale =
        typeof normalizeFocusScale === 'function' ? normalizeFocusScale(value) : value;
    },
    applyFocusScalePreference:
      typeof applyFocusScalePreference === 'function'
        ? (value, opts) => {
          applyFocusScalePreference(value, opts);
          sessionFocusScale =
            typeof normalizeFocusScale === 'function' ? normalizeFocusScale(value) : value;
        }
        : null,
    getShowAutoBackups: () => showAutoBackups,
    setShowAutoBackups: value => {
      showAutoBackups = Boolean(value);
    },
    ensureAutoBackupsFromProjects: typeof ensureAutoBackupsFromProjects === 'function' ? ensureAutoBackupsFromProjects : null,
  },
  autoBackups: {
    populateSetupSelect: typeof populateSetupSelect === 'function' ? populateSetupSelect : null,
    setupSelect: typeof setupSelect !== 'undefined' ? setupSelect : null,
    setupNameInput: typeof setupNameInput !== 'undefined' ? setupNameInput : null,
  },
  mountVoltages: {
    getPreferencesClone: () => getSessionMountVoltagePreferencesClone(),
    applyPreferences: (preferences, options) => applySessionMountVoltagePreferences(preferences, options),
    supportedTypes: typeof SUPPORTED_MOUNT_VOLTAGE_TYPES !== 'undefined' ? SUPPORTED_MOUNT_VOLTAGE_TYPES : [],
    defaultVoltages: typeof DEFAULT_MOUNT_VOLTAGES !== 'undefined' ? DEFAULT_MOUNT_VOLTAGES : {},
    updateInputsFromState: () => {
      const updateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
      if (updateFn) {
        try {
          updateFn();
        } catch (updateError) {
          warnMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
        }
      } else {
        warnMountVoltageHelper('updateMountVoltageInputsFromState');
      }
    },
    warnMissingHelper: (name, error) => {
      warnMountVoltageHelper(name, error);
    },
  },
};

function detectSystemThemePreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('cineSettingsAppearance: detectSystemPreference failed', error);
    }
  }
  return null;
}

function buildThemePreferenceController(module) {
  if (!module || typeof module.createThemePreferenceController !== 'function') {
    return null;
  }

  try {
    return module.createThemePreferenceController({
      detectSystemPreference: detectSystemThemePreference,
    });
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('cineSettingsAppearance: failed to create theme preference controller.', error);
    }
  }

  return null;
}

function applyAppearanceModuleBindings(module) {
  if (!module || typeof module !== 'object') {
    return false;
  }

  appearanceModule = module;
  clearAppearanceModuleUnavailableWarning();

  updateThemeColor = module.updateThemeColor || updateThemeColor;
  setToggleIcon = module.setToggleIcon || setToggleIcon;
  applyDarkMode = module.applyDarkMode || applyDarkMode;
  applyHighContrast = module.applyHighContrast || applyHighContrast;
  applyReduceMotion = module.applyReduceMotion || applyReduceMotion;
  applyRelaxedSpacing = module.applyRelaxedSpacing || applyRelaxedSpacing;
  applyPinkMode = module.applyPinkMode || applyPinkMode;
  persistPinkModePreference = module.persistPinkModePreference || persistPinkModePreference;
  rememberSettingsPinkModeBaseline = module.rememberSettingsPinkModeBaseline || rememberSettingsPinkModeBaseline;
  revertSettingsPinkModeIfNeeded = module.revertSettingsPinkModeIfNeeded || revertSettingsPinkModeIfNeeded;
  rememberSettingsTemperatureUnitBaseline = module.rememberSettingsTemperatureUnitBaseline || rememberSettingsTemperatureUnitBaseline;
  revertSettingsTemperatureUnitIfNeeded = module.revertSettingsTemperatureUnitIfNeeded || revertSettingsTemperatureUnitIfNeeded;
  rememberSettingsFocusScaleBaseline = module.rememberSettingsFocusScaleBaseline || rememberSettingsFocusScaleBaseline;
  revertSettingsFocusScaleIfNeeded = module.revertSettingsFocusScaleIfNeeded || revertSettingsFocusScaleIfNeeded;
  applyShowAutoBackupsPreference = module.applyShowAutoBackupsPreference || applyShowAutoBackupsPreference;
  rememberSettingsShowAutoBackupsBaseline = module.rememberSettingsShowAutoBackupsBaseline || rememberSettingsShowAutoBackupsBaseline;
  revertSettingsShowAutoBackupsIfNeeded = module.revertSettingsShowAutoBackupsIfNeeded || revertSettingsShowAutoBackupsIfNeeded;
  rememberSettingsMountVoltagesBaseline = module.rememberSettingsMountVoltagesBaseline || rememberSettingsMountVoltagesBaseline;
  revertSettingsMountVoltagesIfNeeded = module.revertSettingsMountVoltagesIfNeeded || revertSettingsMountVoltagesIfNeeded;
  handlePinkModeIconPress = module.handlePinkModeIconPress || handlePinkModeIconPress;
  triggerPinkModeIconAnimation = module.triggerPinkModeIconAnimation || triggerPinkModeIconAnimation;
  sessionTriggerPinkModeIconRain = module.triggerPinkModeIconRain || sessionTriggerPinkModeIconRain;
  startPinkModeIconRotation = module.startPinkModeIconRotation || startPinkModeIconRotation;
  stopPinkModeIconRotation = module.stopPinkModeIconRotation || stopPinkModeIconRotation;
  if (typeof module.startPinkModeAnimatedIcons === 'function') {
    const previousStart = sessionStartPinkModeAnimatedIcons;
    const moduleStart = module.startPinkModeAnimatedIcons;
    sessionStartPinkModeAnimatedIcons = (...args) => {
      const iconsContext = appearanceContext && appearanceContext.icons ? appearanceContext.icons : null;
      const previousIconsStart = iconsContext ? iconsContext.startPinkModeAnimatedIcons : undefined;
      const hasWindow = typeof window !== 'undefined';
      const previousWindowStart = hasWindow ? window.startPinkModeAnimatedIcons : undefined;
      let fallbackInvoked = false;
      let fallbackResult;
      const trackFallbackStart = (...innerArgs) => {
        fallbackInvoked = true;
        fallbackResult = previousStart(...innerArgs);
        return fallbackResult;
      };

      if (iconsContext) {
        iconsContext.startPinkModeAnimatedIcons = trackFallbackStart;
      }
      if (hasWindow) {
        window.startPinkModeAnimatedIcons = trackFallbackStart;
      }

      try {
        const result = moduleStart(...args);
        if (fallbackInvoked) {
          return fallbackResult;
        }
        if (typeof result === 'undefined') {
          return previousStart(...args);
        }
        return result;
      } catch (startError) {
        void startError;
        if (fallbackInvoked) {
          return fallbackResult;
        }
        return previousStart(...args);
      } finally {
        if (iconsContext) {
          iconsContext.startPinkModeAnimatedIcons = previousIconsStart;
        }
        if (hasWindow) {
          window.startPinkModeAnimatedIcons = previousWindowStart;
        }
      }
    };
  }

  if (typeof module.stopPinkModeAnimatedIcons === 'function') {
    const previousStop = sessionStopPinkModeAnimatedIcons;
    const moduleStop = module.stopPinkModeAnimatedIcons;
    sessionStopPinkModeAnimatedIcons = (...args) => {
      const iconsContext = appearanceContext && appearanceContext.icons ? appearanceContext.icons : null;
      const previousIconsStop = iconsContext ? iconsContext.stopPinkModeAnimatedIcons : undefined;
      const hasWindow = typeof window !== 'undefined';
      const previousWindowStop = hasWindow ? window.stopPinkModeAnimatedIcons : undefined;
      let fallbackInvoked = false;
      let fallbackResult;
      const trackFallbackStop = (...innerArgs) => {
        fallbackInvoked = true;
        fallbackResult = previousStop(...innerArgs);
        return fallbackResult;
      };

      if (iconsContext) {
        iconsContext.stopPinkModeAnimatedIcons = trackFallbackStop;
      }
      if (hasWindow) {
        window.stopPinkModeAnimatedIcons = trackFallbackStop;
      }

      try {
        const result = moduleStop(...args);
        if (fallbackInvoked) {
          return fallbackResult;
        }
        if (typeof result === 'undefined') {
          return previousStop(...args);
        }
        return result;
      } catch (stopError) {
        void stopError;
        if (fallbackInvoked) {
          return fallbackResult;
        }
        return previousStop(...args);
      } finally {
        if (iconsContext) {
          iconsContext.stopPinkModeAnimatedIcons = previousIconsStop;
        }
        if (hasWindow) {
          window.stopPinkModeAnimatedIcons = previousWindowStop;
        }
      }
    };
  }
  startPinkModeAnimatedIconRotation = module.startPinkModeAnimatedIconRotation || startPinkModeAnimatedIconRotation;
  stopPinkModeAnimatedIconRotation = module.stopPinkModeAnimatedIconRotation || stopPinkModeAnimatedIconRotation;
  applyPinkModeIcon = module.applyPinkModeIcon || applyPinkModeIcon;
  isPinkModeActive = module.isPinkModeActive || isPinkModeActive;

  if (typeof window !== 'undefined') {
    window.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
    window.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
    window.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
  }

  if (appearanceContext && appearanceContext.icons) {
    appearanceContext.icons.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
    appearanceContext.icons.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
    appearanceContext.icons.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
  }

  const controller = buildThemePreferenceController(module);
  if (controller) {
    themePreferenceController = controller;
  }

  return true;
}

function initializeAppearanceModule(factory) {
  if (!factory || typeof factory.initialize !== 'function') {
    return false;
  }

  let module = null;
  try {
    module = factory.initialize(appearanceContext) || null;
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
      console.error('cineSettingsAppearance: initialize() threw.', error);
    }
    return false;
  }

  if (!module || typeof module !== 'object') {
    return false;
  }

  return applyAppearanceModuleBindings(module);
}

function attemptAppearanceModuleInitialization(moduleCandidate) {
  if (!appearanceModuleValidator(moduleCandidate)) {
    return false;
  }
  if (appearanceModuleInitialized) {
    return true;
  }
  const initialized = initializeAppearanceModule(moduleCandidate);
  if (initialized) {
    appearanceModuleInitialized = true;
    clearAppearanceModuleUnavailableWarning();
  }
  return initialized;
}

const resolvedAppearanceModuleFactory = appearanceModuleValidator(appearanceModuleFactoryPlaceholder)
  ? appearanceModuleFactoryPlaceholder
  : resolveModuleApi('cineSettingsAppearance', appearanceModuleValidator);

const appearanceModuleReady = attemptAppearanceModuleInitialization(resolvedAppearanceModuleFactory);

if (!appearanceModuleReady) {
  scheduleAppearanceModuleUnavailableWarning();

  const appearanceModuleWaitOptions = {
    interval: 200,
    maxAttempts: 300,
    onTimeout: () => {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('cineSettingsAppearance module failed to load after waiting. Appearance features remain limited.');
      }
      clearAppearanceModuleUnavailableWarning();
    },
  };

  const announceIfInitialized = moduleCandidate => {
    const wasInitialized = appearanceModuleInitialized;
    if (attemptAppearanceModuleInitialization(moduleCandidate) && !wasInitialized) {
      clearAppearanceModuleUnavailableWarning();
      if (typeof console !== 'undefined' && console && typeof console.info === 'function') {
        console.info('cineSettingsAppearance module became available after deferred load.');
      }
    }
  };

  whenGlobalValueAvailable(
    'cineSettingsAppearance',
    appearanceModuleValidator,
    announceIfInitialized,
    appearanceModuleWaitOptions,
  );

  whenGlobalValueAvailable(
    'cineModuleGlobals',
    candidate => candidate && typeof candidate.whenModuleAvailable === 'function',
    moduleGlobals => {
      if (appearanceModuleInitialized) {
        return;
      }

      let resolvedModule = null;
      if (typeof moduleGlobals.getModule === 'function') {
        try {
          resolvedModule = moduleGlobals.getModule('cineSettingsAppearance');
        } catch (moduleLookupError) {
          void moduleLookupError;
          resolvedModule = null;
        }
      }

      if (appearanceModuleValidator(resolvedModule)) {
        announceIfInitialized(resolvedModule);
        return;
      }

      if (typeof moduleGlobals.whenModuleAvailable === 'function') {
        try {
          moduleGlobals.whenModuleAvailable('cineSettingsAppearance', moduleCandidate => {
            if (appearanceModuleValidator(moduleCandidate)) {
              announceIfInitialized(moduleCandidate);
            }
          });
        } catch (subscriptionError) {
          void subscriptionError;
        }
      }
    },
    { interval: 200, maxAttempts: 150 },
  );

  whenGlobalValueAvailable(
    'cineModules',
    candidate => candidate && typeof candidate.get === 'function',
    registry => {
      if (appearanceModuleInitialized) {
        return;
      }

      let resolvedModule = null;
      try {
        resolvedModule = registry.get('cineSettingsAppearance');
      } catch (registryLookupError) {
        void registryLookupError;
        resolvedModule = null;
      }

      if (appearanceModuleValidator(resolvedModule)) {
        announceIfInitialized(resolvedModule);
      }
    },
    { interval: 200, maxAttempts: 150 },
  );
}

const CAMERA_LETTERS = ['A', 'B', 'C', 'D', 'E'];
const CAMERA_COLOR_STORAGE_KEY_SESSION = 'cameraPowerPlanner_cameraColors';

function normalizeCameraColorValue(value) {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (/^[0-9a-f]{6}$/i.test(trimmed)) {
    return `#${trimmed.toLowerCase()}`;
  }
  return '';
}

function generateDefaultCameraColor(letter) {
  if (letter !== 'E') {
    return '';
  }
  const generateChannel = () => {
    let value = 0;
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const array = new Uint8Array(1);
      crypto.getRandomValues(array);
      value = array[0] / 255;
    } else {
      value = Math.random();
    }
    const channel = Math.floor(value * 200) + 28;
    return Math.max(24, Math.min(232, channel));
  };
  const components = [generateChannel(), generateChannel(), generateChannel()];
  return `#${components.map(component => component.toString(16).padStart(2, '0')).join('')}`;
}

function getDefaultCameraLetterColors() {
  const defaults = {
    A: '#d32f2f',
    B: '#1e88e5',
    C: '#fdd835',
    D: '#43a047',
    E: '#7b1fa2',
  };
  const generated = generateDefaultCameraColor('E');
  if (generated) {
    defaults.E = generated;
  }
  return defaults;
}

let cachedCameraLetterColors = null;

function loadCameraLetterColors() {
  if (cachedCameraLetterColors) {
    return cachedCameraLetterColors;
  }
  const defaults = getDefaultCameraLetterColors();
  let stored = null;
  try {
    const raw = localStorage.getItem(CAMERA_COLOR_STORAGE_KEY_SESSION);
    if (raw) {
      stored = JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Failed to read stored camera colors', error);
    stored = null;
  }
  const resolved = { ...defaults };
  if (stored && typeof stored === 'object') {
    CAMERA_LETTERS.forEach(letter => {
      const incoming = stored[letter] || stored[letter.toLowerCase()];
      const normalized = normalizeCameraColorValue(incoming);
      if (normalized) {
        resolved[letter] = normalized;
      }
    });
  } else {
    try {
      localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(resolved));
    } catch (persistError) {
      console.warn('Unable to persist default camera colors', persistError);
    }
  }
  cachedCameraLetterColors = resolved;
  return resolved;
}

function getCameraLetterColorsSafeSession() {
  const colors = loadCameraLetterColors();
  return { ...colors };
}

function applyCameraLetterColors(newColors = {}) {
  const current = { ...loadCameraLetterColors() };
  let changed = false;
  CAMERA_LETTERS.forEach(letter => {
    const incoming = newColors[letter] || newColors[letter.toLowerCase()];
    const normalized = normalizeCameraColorValue(incoming);
    if (normalized && current[letter] !== normalized) {
      current[letter] = normalized;
      changed = true;
    }
  });
  if (!changed) {
    return current;
  }
  cachedCameraLetterColors = current;
  try {
    localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(current));
  } catch (storeError) {
    console.warn('Failed to persist camera color preferences', storeError);
  }
  if (typeof document !== 'undefined'
    && typeof document.dispatchEvent === 'function'
    && typeof CustomEvent === 'function') {
    try {
      document.dispatchEvent(new CustomEvent('camera-colors-changed'));
    } catch (dispatchError) {
      console.warn('Failed to broadcast camera color change', dispatchError);
    }
  }
  return current;
}

function getCameraColorInputElements() {
  if (typeof document === 'undefined') {
    return [];
  }
  return CAMERA_LETTERS.map(letter => {
    const id = `cameraColor${letter}`;
    let element = null;
    try {
      element = typeof window !== 'undefined' && window[id]
        ? window[id]
        : document.getElementById(id);
    } catch (error) {
      void error;
      element = null;
    }
    return element ? { letter, element } : null;
  }).filter(Boolean);
}

function updateCameraColorInputsFromState() {
  const colors = getCameraLetterColorsSafeSession();
  getCameraColorInputElements().forEach(entry => {
    if (!entry || !entry.element) {
      return;
    }
    const value = colors[entry.letter] || '';
    if (value) {
      entry.element.value = value;
    }
  });
}

function collectCameraColorInputValues() {
  const result = {};
  getCameraColorInputElements().forEach(entry => {
    if (!entry || !entry.element) return;
    const normalized = normalizeCameraColorValue(entry.element.value || '');
    if (normalized) {
      result[entry.letter] = normalized;
    }
  });
  return result;
}

try {
  if (typeof window !== 'undefined') {
    window.getCameraLetterColors = () => getCameraLetterColorsSafeSession();
    window.setCameraLetterColors = palette => applyCameraLetterColors(palette);
  }
} catch (cameraColorExposeError) {
  console.warn('Unable to expose camera color helpers', cameraColorExposeError);
}



const themePreferenceGlobalScope = (typeof globalThis !== 'undefined'
  ? globalThis
  : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
      ? self
      : typeof global !== 'undefined'
        ? global
        : null);

const setThemePreference = (value, options = {}) => {
  const normalized = !!value;
  if (themePreferenceController && typeof themePreferenceController.setValue === 'function') {
    themePreferenceController.setValue(normalized, options);
    return;
  }
  applyDarkMode(normalized);
  const serialized = normalized ? 'true' : 'false';
  const persistTargets = [];
  try {
    if (typeof resolveSafeLocalStorage === 'function') {
      const safeStorage = resolveSafeLocalStorage();
      if (safeStorage && typeof safeStorage.setItem === 'function') {
        persistTargets.push({ name: 'safeLocalStorage', storage: safeStorage });
      }
    }
  } catch (error) {
    console.warn('Could not resolve SafeLocalStorage while persisting dark mode preference', error);
  }
  try {
    if (typeof localStorage !== 'undefined') {
      persistTargets.push({ name: 'localStorage', storage: localStorage });
    }
  } catch (error) {
    console.warn('Could not access localStorage while persisting dark mode preference', error);
  }
  persistTargets.forEach(entry => {
    if (!entry || !entry.storage || typeof entry.storage.setItem !== 'function') {
      return;
    }
    try {
      entry.storage.setItem('darkMode', serialized);
    } catch (persistError) {
      console.warn(`Could not persist dark mode preference to ${entry.name}`, persistError);
    }
  });
};

const getThemePreference = () => {
  if (themePreferenceController && typeof themePreferenceController.getValue === 'function') {
    return !!themePreferenceController.getValue();
  }
  return typeof document !== 'undefined'
    && document.body
    && typeof document.body.classList !== 'undefined'
    && document.body.classList.contains('dark-mode');
};

const registerThemeControl = (element, config) => {
  if (!themePreferenceController || typeof themePreferenceController.registerControl !== 'function') {
    return () => { };
  }
  try {
    return themePreferenceController.registerControl(element, config);
  } catch (registrationError) {
    console.warn('Failed to register theme control', registrationError);
    return () => { };
  }
};

let unregisterHeaderThemeControl = () => { };
let unregisterSettingsThemeControl = () => { };

if (themePreferenceController) {
  if (darkModeToggle) {
    unregisterHeaderThemeControl = registerThemeControl(darkModeToggle, { type: 'button' });
  }
  if (settingsDarkMode) {
    unregisterSettingsThemeControl = registerThemeControl(settingsDarkMode, { type: 'checkbox' });
  }
} else {
  let fallbackDarkMode = false;
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('darkMode') : null;
    if (stored !== null) {
      fallbackDarkMode = stored === 'true';
    } else if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      fallbackDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch (loadError) {
    console.warn('Could not load dark mode preference', loadError);
  }
  applyDarkMode(fallbackDarkMode);
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      setThemePreference(!document.body.classList.contains('dark-mode'));
    });
  }
  if (settingsDarkMode) {
    settingsDarkMode.addEventListener('change', () => {
      setThemePreference(settingsDarkMode.checked);
    });
  }
}

if (themePreferenceGlobalScope) {
  try {
    themePreferenceGlobalScope.cineThemePreference = themePreferenceController
      ? {
        registerControl: (element, options) => registerThemeControl(element, options),
        setValue: (value, options) => setThemePreference(value, options),
        getValue: () => getThemePreference(),
        reloadFromStorage: options => (
          themePreferenceController && typeof themePreferenceController.reloadFromStorage === 'function'
            ? themePreferenceController.reloadFromStorage(options)
            : getThemePreference()
        ),
      }
      : null;
  } catch (exposeError) {
    console.warn('Unable to expose theme preference bridge', exposeError);
  }
}

let sessionFocusScale = typeof focusScalePreference === 'string'
  ? focusScalePreference
  : 'metric';

let highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);

if (typeof window !== 'undefined') {
  window.handlePinkModeIconPress = handlePinkModeIconPress;
  window.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
  window.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
  window.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
}

let pinkModeEnabled = false;
try {
  pinkModeEnabled = localStorage.getItem('pinkMode') === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();
rememberSettingsTemperatureUnitBaseline();
rememberSettingsFocusScaleBaseline();
rememberSettingsShowAutoBackupsBaseline();
rememberSettingsMountVoltagesBaseline();

if (pinkModeToggle) {
  pinkModeToggle.addEventListener('click', () => {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}

if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', () => {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}

if (settingsShowAutoBackups) {
  settingsShowAutoBackups.addEventListener('change', () => {
    applyShowAutoBackupsPreference(settingsShowAutoBackups.checked);
  });
}

if (settingsTemperatureUnit) {
  settingsTemperatureUnit.addEventListener('change', () => {
    applyTemperatureUnitPreferenceWithFallback(settingsTemperatureUnit.value, {
      persist: false,
    });
  });
}

if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
  settingsFocusScale.addEventListener('change', () => {
    if (typeof applyFocusScalePreference === 'function') {
      applyFocusScalePreference(settingsFocusScale.value, { persist: false });
      sessionFocusScale =
        typeof normalizeFocusScale === 'function'
          ? normalizeFocusScale(settingsFocusScale.value)
          : settingsFocusScale.value;
    }
    try {
      populateLensDropdown();
    } catch (focusScalePopulateError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to refresh lens dropdown after focus scale change', focusScalePopulateError);
      }
    }
  });
}

if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
  settingsFocusScale.value = sessionFocusScale;
}

const mountVoltageInputNodes = Array.from(
  typeof document !== 'undefined'
    ? document.querySelectorAll('.mount-voltage-input')
    : []
);

mountVoltageInputNodes.forEach(input => {
  input.addEventListener('change', handleMountVoltageInputChange);
  input.addEventListener('blur', handleMountVoltageInputChange);
});

const mountVoltageResetButtonRef = (() => {
  const candidateScopes = [
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
    const button = scope && scope.mountVoltageResetButton;
    if (button) {
      return button;
    }
  }

  return null;
})();

if (mountVoltageResetButtonRef) {
  mountVoltageResetButtonRef.addEventListener('click', () => {
    const resetMountVoltagePreferencesFn = getSessionRuntimeFunction('resetMountVoltagePreferences');
    if (resetMountVoltagePreferencesFn) {
      try {
        resetMountVoltagePreferencesFn({ persist: false, triggerUpdate: true });
      } catch (resetError) {
        warnMissingMountVoltageHelper('resetMountVoltagePreferences', resetError);
      }
    } else {
      warnMissingMountVoltageHelper('resetMountVoltagePreferences');
    }

    const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
      }
    } else {
      warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
    }
  });
}

if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', () => {
    const context = consumeSettingsOpenContext({ reason: 'settings-button' });
    const hiddenBefore = typeof settingsDialog.hasAttribute === 'function'
      ? settingsDialog.hasAttribute('hidden')
      : null;
    const openBefore = typeof isDialogOpen === 'function'
      ? isDialogOpen(settingsDialog)
      : !!(settingsDialog && settingsDialog.open);
    logSettingsEvent(
      'info',
      'Settings dialog open requested',
      { ...context, openBefore, hiddenBefore },
      { action: 'open-request' },
    );

    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    rememberSettingsFocusScaleBaseline();
    rememberSettingsShowAutoBackupsBaseline();
    rememberSettingsMountVoltagesBaseline();
    const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
      }
    } else {
      warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
    }
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = getThemePreference();
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
    if (settingsReduceMotion) {
      const reduceMotionActive = document.documentElement.classList.contains('reduce-motion');
      settingsReduceMotion.checked = reduceMotionActive;
    }
    if (settingsRelaxedSpacing) {
      const relaxedSpacingActive = document.documentElement.classList.contains('relaxed-spacing');
      settingsRelaxedSpacing.checked = relaxedSpacingActive;
    }
    if (settingsShowAutoBackups) settingsShowAutoBackups.checked = showAutoBackups;
    if (accentColorInput) {
      const stored = localStorage.getItem('accentColor');
      accentColorInput.value = stored || accentColor;
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    }
    updateCameraColorInputsFromState();
    if (settingsTemperatureUnit) settingsTemperatureUnit.value = localTemperatureUnit;
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      callSessionCoreFunction('refreshAutoGearScenarioOptions');
      callSessionCoreFunction('refreshAutoGearMatteboxOptions');
      callSessionCoreFunction('refreshAutoGearCameraHandleOptions');
      callSessionCoreFunction('refreshAutoGearViewfinderExtensionOptions');
      callSessionCoreFunction('refreshAutoGearVideoDistributionOptions');
      callSessionCoreFunction('refreshAutoGearCameraOptions', [], { defer: true });
      callSessionCoreFunction('refreshAutoGearMonitorOptions');
      callSessionCoreFunction('refreshAutoGearWirelessOptions');
      callSessionCoreFunction('refreshAutoGearMotorsOptions');
      callSessionCoreFunction('refreshAutoGearControllersOptions');
      callSessionCoreFunction('refreshAutoGearDistanceOptions');
      populateAutoGearCategorySelect(autoGearAddCategorySelect, '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, '');
      renderAutoGearRulesList();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
      callSessionCoreFunction('renderAutoGearBackupControls', [], { defer: true });
      callSessionCoreFunction('applyAutoGearBackupVisibility', [], { defer: true });
    }
    if (activeSettingsTabId) {
      activateSettingsTab(activeSettingsTabId);
    }
    collapseBackupDiffSection();
    settingsDialog.removeAttribute('hidden');
    openDialog(settingsDialog);
    scheduleSettingsTabsOverflowUpdate();
    // Focus the first control except the language selector to avoid opening it automatically
    const activePanel = settingsDialog.querySelector('.settings-panel:not([hidden])');
    const first = activePanel?.querySelector('input:not([type="hidden"]), select:not(#settingsLanguage), textarea');
    if (first) {
      try {
        first.focus({ preventScroll: true });
      } catch {
        first.focus();
      }
    }

    const hiddenAfter = typeof settingsDialog.hasAttribute === 'function'
      ? settingsDialog.hasAttribute('hidden')
      : null;
    const openAfter = typeof isDialogOpen === 'function'
      ? isDialogOpen(settingsDialog)
      : !!(settingsDialog && settingsDialog.open);
    const resultDetail = { ...context, openBefore, openAfter, hiddenAfter };
    logSettingsEvent(
      openAfter ? 'info' : 'warn',
      openAfter ? 'Settings dialog opened' : 'Settings dialog did not open',
      resultDetail,
      { action: 'open-result' },
    );
  });

  if (settingsCancel) {
    settingsCancel.addEventListener('click', () => {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertSettingsFocusScaleIfNeeded();
      rememberSettingsFocusScaleBaseline();
      revertSettingsShowAutoBackupsIfNeeded();
      rememberSettingsShowAutoBackupsBaseline();
      revertSettingsMountVoltagesIfNeeded();
      rememberSettingsMountVoltagesBaseline();
      invokeSessionRevertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) safeLoadStoredLogoPreview();
      closeAutoGearEditor();
      collapseBackupDiffSection();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }

  const applySettingsAndCloseDialog = () => {
    if (!settingsDialog) {
      return;
    }

    if (settingsLanguage) {
      applySetLanguage(settingsLanguage.value);
      if (typeof populateUserButtonDropdowns === 'function') {
        try {
          populateUserButtonDropdowns();
        } catch (userButtonError) {
          console.warn('Failed to refresh user button selectors after language change', userButtonError);
        }
      }
    }
    if (settingsDarkMode) {
      setThemePreference(settingsDarkMode.checked, { persist: true });
    }
    if (settingsPinkMode) {
      persistPinkModePreference(settingsPinkMode.checked);
    }
    if (settingsHighContrast) {
      const enabled = settingsHighContrast.checked;
      applyHighContrast(enabled);
      try {
        localStorage.setItem('highContrast', enabled);
      } catch (e) {
        console.warn('Could not save high contrast preference', e);
      }
    }
    if (settingsReduceMotion) {
      const enabled = settingsReduceMotion.checked;
      applyReduceMotion(enabled);
      try {
        localStorage.setItem('reduceMotion', enabled);
      } catch (e) {
        console.warn('Could not save reduce motion preference', e);
      }
    }
    if (settingsRelaxedSpacing) {
      const enabled = settingsRelaxedSpacing.checked;
      applyRelaxedSpacing(enabled);
      try {
        localStorage.setItem('relaxedSpacing', enabled);
      } catch (e) {
        console.warn('Could not save relaxed spacing preference', e);
      }
    }
    if (settingsShowAutoBackups) {
      applyShowAutoBackupsPreference(settingsShowAutoBackups.checked);
    }
    const autoGearShowBackupsToggle =
      typeof document !== 'undefined' && typeof document.getElementById === 'function'
        ? document.getElementById('autoGearShowBackups')
        : null;
    if (autoGearShowBackupsToggle) {
      callSessionCoreFunction(
        'setAutoGearBackupsVisible',
        [Boolean(autoGearShowBackupsToggle.checked)],
      );
    }
    if (accentColorInput) {
      const color = accentColorInput.value;
      if (!document.body.classList.contains('pink-mode')) {
        applyAccentColor(color);
      }
      try {
        if (normalizeAccentValueSafe(color) === DEFAULT_ACCENT_NORMALIZED) {
          localStorage.removeItem('accentColor');
        } else {
          localStorage.setItem('accentColor', color);
        }
      } catch (e) {
        console.warn('Could not save accent color', e);
      }
      accentColor = color;
      prevAccentColor = color;
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    }
    const cameraPalette = collectCameraColorInputValues();
    const normalizedPalette = applyCameraLetterColors(cameraPalette);
    const colorEntries = getCameraColorInputElements();
    colorEntries.forEach(entry => {
      const normalized = normalizedPalette[entry.letter];
      if (normalized) {
        entry.element.value = normalized;
      }
    });
    if (settingsTemperatureUnit) {
      const selectedTemperatureUnit =
        typeof settingsTemperatureUnit.value === 'string'
          ? settingsTemperatureUnit.value
          : 'celsius';

      applyTemperatureUnitPreferenceWithFallback(selectedTemperatureUnit);

      rememberSettingsTemperatureUnitBaseline();
    }
    if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
      if (typeof applyFocusScalePreference === 'function') {
        applyFocusScalePreference(settingsFocusScale.value);
      }
      rememberSettingsFocusScaleBaseline();
      sessionFocusScale =
        typeof normalizeFocusScale === 'function'
          ? normalizeFocusScale(settingsFocusScale.value)
          : settingsFocusScale.value;
    }
    applySessionMountVoltagePreferences(collectMountVoltageFormValues(), {
      persist: true,
      triggerUpdate: true
    });
    rememberSettingsMountVoltagesBaseline();
    if (settingsFontSize) {
      const size = settingsFontSize.value;
      applyFontSizeSafe(size);
      try {
        localStorage.setItem('fontSize', size);
      } catch (e) {
        console.warn('Could not save font size', e);
      }
      fontSize = size;
    }
    if (settingsFontFamily) {
      const family = settingsFontFamily.value;
      applyFontFamilySafe(family);
      try {
        localStorage.setItem('fontFamily', family);
      } catch (e) {
        console.warn('Could not save font family', e);
      }
      fontFamily = family;
    }
    if (settingsLogo && settingsLogo.files && settingsLogo.files[0]) {
      const file = settingsLogo.files[0];
      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            localStorage.setItem('customLogo', reader.result);
          } catch (e) {
            console.warn('Could not save custom logo', e);
          }
          renderSettingsLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
        if (settingsLogo) settingsLogo.value = '';
        safeLoadStoredLogoPreview();
      }
    }
    closeAutoGearEditor();
    collapseBackupDiffSection();
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    rememberSettingsFocusScaleBaseline();
    rememberSettingsShowAutoBackupsBaseline();
    rememberSettingsMountVoltagesBaseline();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  };

  if (settingsSave) {
    settingsSave.addEventListener('click', () => {
      applySettingsAndCloseDialog();
    });
  }

  settingsDialog.addEventListener('click', e => {
    if (e.target === settingsDialog) {
      applySettingsAndCloseDialog();
    }
  });

  settingsDialog.addEventListener('cancel', e => {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertSettingsTemperatureUnitIfNeeded();
    rememberSettingsTemperatureUnitBaseline();
    revertSettingsFocusScaleIfNeeded();
    rememberSettingsFocusScaleBaseline();
    revertSettingsShowAutoBackupsIfNeeded();
    rememberSettingsShowAutoBackupsBaseline();
    revertSettingsMountVoltagesIfNeeded();
    rememberSettingsMountVoltagesBaseline();
    invokeSessionRevertAccentColor();
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    closeAutoGearEditor();
    collapseBackupDiffSection();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  });

  if (autoGearAddRuleBtn) {
    autoGearAddRuleBtn.addEventListener('click', () => {
      invokeSessionOpenAutoGearEditor();
    });
  }
  if (autoGearConditionSelect) {
    autoGearConditionSelect.addEventListener('change', () => {
      updateAutoGearConditionAddButtonState();
    });
  }
  if (autoGearConditionAddButton) {
    autoGearConditionAddButton.addEventListener('click', () => {
      addAutoGearConditionFromPicker();
    });
  }
  const autoGearScenarioModeSelectHandle = (() => {
    let resolvedHandle = null;

    try {
      if (typeof autoGearScenarioModeSelect !== 'undefined') {
        resolvedHandle = autoGearScenarioModeSelect;
      }
    } catch (resolveAutoGearScenarioModeSelectError) {
      void resolveAutoGearScenarioModeSelectError;
    }

    if (!resolvedHandle) {
      const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

      if (scope && typeof scope === 'object' && 'autoGearScenarioModeSelect' in scope) {
        resolvedHandle = scope.autoGearScenarioModeSelect || null;
      }
    }

    if (
      !resolvedHandle
      && typeof document !== 'undefined'
      && document
      && typeof document.getElementById === 'function'
    ) {
      try {
        resolvedHandle = document.getElementById('autoGearScenarioMode') || null;
      } catch (resolveAutoGearScenarioModeSelectElementError) {
        void resolveAutoGearScenarioModeSelectElementError;
      }
    }

    return resolvedHandle;
  })();

  if (autoGearScenarioModeSelectHandle && typeof autoGearScenarioModeSelectHandle.addEventListener === 'function') {
    autoGearScenarioModeSelectHandle.addEventListener('change', () => {
      if (autoGearEditorDraft) {
        const selectValue =
          typeof autoGearScenarioModeSelectHandle.value === 'string'
            ? autoGearScenarioModeSelectHandle.value
            : '';

        autoGearEditorDraft.scenarioLogic = normalizeAutoGearScenarioLogic(selectValue);
      }

      applyAutoGearScenarioSettings(getAutoGearScenarioSelectedValues());
    });
  }
  if (autoGearScenarioBaseSelect) {
    autoGearScenarioBaseSelect.addEventListener('change', () => {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioPrimary = normalizeAutoGearScenarioPrimary(autoGearScenarioBaseSelect.value);
      }
    });
  }
  if (autoGearScenarioFactorInput) {
    const handleFactorUpdate = () => {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioMultiplier = normalizeAutoGearScenarioMultiplier(autoGearScenarioFactorInput.value);
      }
    };
    autoGearScenarioFactorInput.addEventListener('change', handleFactorUpdate);
    autoGearScenarioFactorInput.addEventListener('input', handleFactorUpdate);
  }
  if (autoGearConditionList) {
    autoGearConditionList.addEventListener('click', event => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest('button')
        : null;
      if (!target) return;
      if (target.classList.contains('auto-gear-condition-remove')) {
        const condition = target.dataset.condition || '';
        if (condition) {
          removeAutoGearCondition(condition, { focusPicker: true });
        }
        return;
      }
      if (target.classList.contains('auto-gear-condition-add')) {
        handleAutoGearConditionShortcut();
      }
    });
  }
  const resolveResetAutoGearRulesHandler = () => {
    if (typeof resetAutoGearRulesToFactoryAdditions === 'function') {
      return resetAutoGearRulesToFactoryAdditions;
    }
    if (typeof globalThis !== 'undefined'
      && typeof globalThis.resetAutoGearRulesToFactoryAdditions === 'function') {
      return globalThis.resetAutoGearRulesToFactoryAdditions;
    }
    const moduleApi = resolveModuleApi(
      'cineFeatureAutoGearRules',
      candidate => candidate && typeof candidate.resetAutoGearRulesToFactoryAdditions === 'function',
    );
    if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
      return moduleApi.resetAutoGearRulesToFactoryAdditions;
    }
    return null;
  };

  if (autoGearResetFactoryButton) {
    let autoGearResetUnavailableWarningHandle = null;

    const clearAutoGearResetUnavailableWarning = () => {
      if (autoGearResetUnavailableWarningHandle === null) {
        return;
      }

      try {
        clearTimeout(autoGearResetUnavailableWarningHandle);
      } catch (clearError) {
        void clearError;
      }

      autoGearResetUnavailableWarningHandle = null;
    };

    const warnAutoGearResetUnavailable = () => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function' && !resetHandlerAttached) {
        console.warn('Automatic gear reset action unavailable: reset handler missing.');
      }
    };

    const scheduleAutoGearResetUnavailableWarning = () => {
      if (autoGearResetUnavailableWarningHandle !== null) {
        return;
      }

      if (typeof setTimeout !== 'function') {
        warnAutoGearResetUnavailable();
        return;
      }

      autoGearResetUnavailableWarningHandle = setTimeout(() => {
        autoGearResetUnavailableWarningHandle = null;
        warnAutoGearResetUnavailable();
      }, 1500);
    };

    const enableResetButton = () => {
      autoGearResetFactoryButton.disabled = false;
      autoGearResetFactoryButton.setAttribute('aria-disabled', 'false');
    };

    const disableResetButton = () => {
      autoGearResetFactoryButton.disabled = true;
      autoGearResetFactoryButton.setAttribute('aria-disabled', 'true');
    };

    let resetHandlerAttached = false;

    const attachResetHandler = (handler) => {
      if (resetHandlerAttached || typeof handler !== 'function') {
        return false;
      }

      autoGearResetFactoryButton.addEventListener('click', handler);
      enableResetButton();
      resetHandlerAttached = true;
      clearAutoGearResetUnavailableWarning();
      return true;
    };

    const initialHandler = resolveResetAutoGearRulesHandler();

    const attachHandlerIfAvailable = (handler, options = {}) => {
      if (!attachResetHandler(handler)) {
        return false;
      }
      if (options.logReenabledReason === 'deferredModuleLoad'
        && typeof console !== 'undefined'
        && typeof console.info === 'function') {
        console.info('Automatic gear reset action re-enabled after deferred module load.');
      }
      return true;
    };

    if (!attachHandlerIfAvailable(initialHandler)) {
      disableResetButton();
      scheduleAutoGearResetUnavailableWarning();

      whenGlobalValueAvailable(
        'resetAutoGearRulesToFactoryAdditions',
        candidate => typeof candidate === 'function',
        candidate => {
          attachHandlerIfAvailable(candidate, { logReenabledReason: 'deferredModuleLoad' });
        },
        {
          interval: 200,
          maxAttempts: 300,
          onTimeout: () => {
            clearAutoGearResetUnavailableWarning();
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn('Automatic gear reset action unavailable after waiting for handler registration.');
            }
          },
        },
      );

      whenGlobalValueAvailable(
        'cineModuleGlobals',
        candidate => candidate && typeof candidate.whenModuleAvailable === 'function',
        moduleGlobals => {
          if (resetHandlerAttached) {
            return;
          }

          const attachFromModule = moduleApi => {
            if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
              attachHandlerIfAvailable(
                moduleApi.resetAutoGearRulesToFactoryAdditions,
                { logReenabledReason: 'deferredModuleLoad' },
              );
            }
          };

          if (typeof moduleGlobals.getModule === 'function') {
            try {
              const moduleApi = moduleGlobals.getModule('cineFeatureAutoGearRules');
              attachFromModule(moduleApi);
            } catch (moduleLookupError) {
              void moduleLookupError;
            }
          }

          if (!resetHandlerAttached && typeof moduleGlobals.whenModuleAvailable === 'function') {
            try {
              moduleGlobals.whenModuleAvailable('cineFeatureAutoGearRules', moduleApi => {
                attachFromModule(moduleApi);
              });
            } catch (subscriptionError) {
              void subscriptionError;
            }
          }
        },
        { interval: 200, maxAttempts: 150 },
      );

      whenGlobalValueAvailable(
        'cineModules',
        candidate => candidate && typeof candidate.get === 'function',
        registry => {
          if (resetHandlerAttached) {
            return;
          }
          try {
            const moduleApi = registry.get('cineFeatureAutoGearRules');
            if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
              attachHandlerIfAvailable(moduleApi.resetAutoGearRulesToFactoryAdditions);
            }
          } catch (registryLookupError) {
            void registryLookupError;
          }
        },
        { interval: 200, maxAttempts: 150 },
      );
    }
  }
  if (autoGearExportButton) {
    autoGearExportButton.addEventListener('click', () => {
      callSessionCoreFunction('exportAutoGearRules', [], { defer: true });
    });
  }
  if (autoGearImportButton && autoGearImportInput) {
    autoGearImportButton.addEventListener('click', () => {
      autoGearImportInput.click();
    });
    autoGearImportInput.addEventListener('change', handleAutoGearImportSelection);
  }
  if (autoGearSearchInput) {
    const updateQuery = event => {
      setAutoGearSearchQuery(event?.target?.value || '');
    };
    autoGearSearchInput.addEventListener('input', updateQuery);
    autoGearSearchInput.addEventListener('search', updateQuery);
  }
  if (autoGearFilterScenarioSelect) {
    autoGearFilterScenarioSelect.addEventListener('change', event => {
      setAutoGearScenarioFilter(event?.target?.value || 'all');
    });
  }
  if (autoGearFilterClearButton) {
    autoGearFilterClearButton.addEventListener('click', clearAutoGearFilters);
  }
  if (autoGearSummaryCards) {
    autoGearSummaryCards.addEventListener('click', event => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest('.auto-gear-summary-action')
        : null;
      if (!target || target.disabled) return;
      const focus = target.dataset.focus || 'all';
      setAutoGearSummaryFocus(focus);
    });
  }
  if (autoGearSummaryDetails) {
    autoGearSummaryDetails.addEventListener('click', event => {
      const element = event.target instanceof HTMLElement ? event.target : null;
      if (!element) return;
      const scenarioButton = element.closest('button[data-auto-gear-scenario]');
      if (scenarioButton) {
        const scenario = scenarioButton.dataset.autoGearScenario || '';
        if (scenario) {
          setAutoGearSummaryFocus('all');
          setAutoGearScenarioFilter(scenario);
        }
        return;
      }
      const ruleButton = element.closest('button[data-auto-gear-rule]');
      if (ruleButton) {
        focusAutoGearRuleById(ruleButton.dataset.autoGearRule || '');
        return;
      }
      const resetButton = element.closest('button[data-auto-gear-summary-reset]');
      if (resetButton) {
        setAutoGearSummaryFocus('all');
      }
    });
  }
  if (autoGearPresetSelect) {
    autoGearPresetSelect.addEventListener('change', handleAutoGearPresetSelection);
  }
  if (autoGearSavePresetButton) {
    autoGearSavePresetButton.addEventListener('click', handleAutoGearSavePreset);
  }
  if (autoGearDeletePresetButton) {
    autoGearDeletePresetButton.addEventListener('click', handleAutoGearDeletePreset);
  }
  if (autoGearAddItemButton) {
    autoGearAddItemButton.addEventListener('click', () => addAutoGearDraftItem('add'));
  }
  if (autoGearRemoveItemButton) {
    autoGearRemoveItemButton.addEventListener('click', () => addAutoGearDraftItem('remove'));
  }
  if (autoGearSaveRuleButton) {
    autoGearSaveRuleButton.addEventListener('click', saveAutoGearRuleFromEditor);
  }
  if (autoGearCancelEditButton) {
    autoGearCancelEditButton.addEventListener('click', () => {
      closeAutoGearEditor();
      renderAutoGearDraftLists();
    });
  }
  if (autoGearRulesList) {
    autoGearRulesList.addEventListener('click', event => {
      const targetElement = event.target;
      const button = targetElement && typeof targetElement.closest === 'function'
        ? targetElement.closest('button')
        : null;
      if (!button) return;
      if (button.classList.contains('auto-gear-edit')) {
        const ruleId = button.dataset.ruleId || '';
        const ruleIndex = button.dataset.ruleIndex;
        const options = {};
        if (ruleIndex !== undefined) {
          options.ruleIndex = ruleIndex;
        }
        invokeSessionOpenAutoGearEditor(ruleId, options);
      } else if (button.classList.contains('auto-gear-duplicate')) {
        const ruleId = button.dataset.ruleId || '';
        duplicateAutoGearRule(ruleId, button.dataset.ruleIndex);
      } else if (button.classList.contains('auto-gear-delete')) {
        const ruleId = button.dataset.ruleId || '';
        const ruleIndex = button.dataset.ruleIndex;
        const args = ruleIndex !== undefined ? [ruleId, ruleIndex] : [ruleId];
        callSessionCoreFunction('deleteAutoGearRule', args);
      }
    });
    autoGearRulesList.addEventListener('change', event => {
      const targetElement = event.target;
      if (!targetElement || !(targetElement instanceof HTMLElement)) return;
      if (targetElement.classList.contains('auto-gear-enabled-toggle')) {
        const ruleId = targetElement.dataset.ruleId || '';
        const ruleIndex = targetElement.dataset.ruleIndex;
        callSessionCoreFunction('setAutoGearRuleEnabled', [ruleId, targetElement.checked, ruleIndex]);
      }
    });
  }
  if (autoGearBackupSelect) {
    autoGearBackupSelect.addEventListener('change', () => {
      updateAutoGearBackupRestoreButtonState();
    });
  }
  if (autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.addEventListener('change', handleAutoGearShowBackupsToggle);
  }
  if (autoGearBackupRestoreButton) {
    autoGearBackupRestoreButton.addEventListener('click', () => {
      if (!autoGearBackupSelect) return;
      const backupId = autoGearBackupSelect.value;
      if (backupId) {
        restoreAutoGearBackup(backupId);
      }
    });
  }
  if (autoGearAddCategorySelect) {
    autoGearAddCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  if (autoGearRemoveCategorySelect) {
    autoGearRemoveCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  const bindAutoGearSelectorCatalogSync = (typeSelect, defaultInput) => {
    if (!typeSelect) return;
    const refreshCatalog = () => {
      updateAutoGearMonitorCatalogOptions(typeSelect.value, defaultInput);
    };
    typeSelect.addEventListener('change', refreshCatalog);
    if (defaultInput) {
      defaultInput.addEventListener('focus', refreshCatalog);
      defaultInput.addEventListener('click', refreshCatalog);
    }
    refreshCatalog();
  };
  bindAutoGearSelectorCatalogSync(autoGearAddSelectorTypeSelect, autoGearAddSelectorDefaultInput);
  bindAutoGearSelectorCatalogSync(autoGearRemoveSelectorTypeSelect, autoGearRemoveSelectorDefaultInput);
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', event => {
      const target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-remove-entry')) {
        const listType = target.dataset.listType;
        const normalizedType = listType === 'remove' ? 'remove' : 'add';
        const itemId = target.dataset.itemId;
        if (!autoGearEditorDraft || !itemId) return;
        const list = normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        const index = list.findIndex(item => item.id === itemId);
        if (index >= 0) {
          list.splice(index, 1);
          if (
            autoGearEditorActiveItem
            && autoGearEditorActiveItem.listType === normalizedType
            && autoGearEditorActiveItem.itemId === itemId
          ) {
            clearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
          }
          renderAutoGearDraftLists();
          updateAutoGearCatalogOptions();
        }
        return;
      }
      if (target.classList.contains('auto-gear-edit-entry')) {
        beginAutoGearDraftItemEdit(target.dataset.listType, target.dataset.itemId);
      }
    });
  }
}

syncAutoGearMonitorFieldVisibility();

const removeNode = (node) => {
  if (!node || typeof node !== 'object') {
    return;
  }
  try {
    if (typeof node.remove === 'function') {
      node.remove();
      return;
    }
  } catch (removeError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to remove node via native remove()', removeError);
    }
  }
  const parent = node.parentNode;
  if (parent && typeof parent.removeChild === 'function') {
    parent.removeChild(node);
  }
};

const createAccentTint = (alpha = 0.16) => {
  const accentFallback = typeof accentColor === 'string'
    ? accentColor
    : DEFAULT_ACCENT_COLOR;
  const accentSource = getCssVariableValue('--accent-color', accentFallback);
  const rgb = parseColorToRgb(accentSource);
  if (!rgb) return null;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const getNotificationAccentColor = () => {
  const fallback = typeof accentColor === 'string' && accentColor
    ? accentColor
    : DEFAULT_ACCENT_COLOR;
  const resolved = getCssVariableValue('--accent-color', fallback);
  return resolved || fallback;
};

const getNotificationTextColor = (backgroundColor) => {
  try {
    if (typeof computeRelativeLuminance === 'function') {
      const rgb = parseColorToRgb(backgroundColor);
      if (rgb) {
        const luminance = computeRelativeLuminance(rgb);
        return luminance > 0.55 ? '#000000' : '#ffffff';
      }
    }
  } catch (colorError) {
    console.warn('Failed to determine notification text color', colorError);
  }
  return '#ffffff';
};

const getNotificationTopOffset = () => {
  const baseOffset = 16;
  let offset = baseOffset;
  try {
    const topBar = document.getElementById('topBar');
    if (topBar && typeof topBar.getBoundingClientRect === 'function') {
      const rect = topBar.getBoundingClientRect();
      if (rect && typeof rect.bottom === 'number' && rect.bottom > 0) {
        offset = Math.max(offset, rect.bottom + baseOffset);
      }
    }
  } catch (measureError) {
    console.warn('Failed to measure top bar for notifications', measureError);
  }
  return `${Math.ceil(offset)}px`;
};

let notificationContainerEnsureScheduled = false;

const scheduleNotificationContainerEnsure = () => {
  if (notificationContainerEnsureScheduled) {
    return;
  }
  notificationContainerEnsureScheduled = true;
  const trigger = () => {
    notificationContainerEnsureScheduled = false;
    try {
      ensureNotificationContainer();
    } catch (scheduleError) {
      console.warn('Failed to ensure notification container after scheduling', scheduleError);
    }
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(trigger);
  } else if (typeof setTimeout === 'function') {
    setTimeout(trigger, 16);
  }
};

const ensureNotificationContainer = () => {
  if (typeof document === 'undefined') return null;
  const id = 'backupNotificationContainer';
  let container = document.getElementById(id);
  let isNew = false;
  if (!container && typeof window !== 'undefined') {
    const bootstrapNotice = window.__cineLoadingNotice;
    if (bootstrapNotice && typeof bootstrapNotice.ensureContainer === 'function') {
      try {
        container = bootstrapNotice.ensureContainer();
      } catch (noticeError) {
        console.warn('Failed to reuse bootstrap notification container', noticeError);
        container = null;
      }
    }
  }
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    isNew = true;
  }

  if (container.classList && !container.classList.contains('cine-notification-stack')) {
    container.classList.add('cine-notification-stack');
  }
  if (container.dataset && container.dataset.bootstrap) {
    delete container.dataset.bootstrap;
  }

  const preferredParent = (typeof document.body !== 'undefined' && document.body)
    ? document.body
    : (typeof document.documentElement !== 'undefined' ? document.documentElement : null);

  if (preferredParent) {
    if (container.parentNode !== preferredParent) {
      preferredParent.appendChild(container);
    }
    container.style.top = getNotificationTopOffset();
  } else if (!container.parentNode) {
    // Document still parsing without a body element. Retry once the DOM has progressed.
    scheduleNotificationContainerEnsure();
  }

  if (isNew && typeof document.addEventListener === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        try {
          ensureNotificationContainer();
        } catch (ensureError) {
          console.warn('Failed to ensure notification container after DOMContentLoaded', ensureError);
        }
      }, { once: true });
    } else {
      scheduleNotificationContainerEnsure();
    }
  }

  if (typeof window !== 'undefined') {
    const bootstrapNotice = window.__cineLoadingNotice;
    if (bootstrapNotice && typeof bootstrapNotice === 'object') {
      bootstrapNotice.container = container;
    }
  }

  return container;
};

function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  const container = ensureNotificationContainer();
  if (!container) {
    return;
  }
  const note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  const background = getNotificationAccentColor();
  const textColor = getNotificationTextColor(background);
  note.style.background = background;
  note.style.color = textColor;
  container.appendChild(note);
  setTimeout(() => {
    removeNode(note);
    if (!container.children.length) {
      removeNode(container);
    }
  }, 4000);
}

const AUTO_BACKUP_INDICATOR_ID = 'cineAutoBackupIndicator';
const AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID = 'cineAutoBackupSpinnerStyles';
let autoBackupIndicatorRefCount = 0;

const ensureAutoBackupSpinnerStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID)) {
    return;
  }
  const style = document.createElement('style');
  style.id = AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID;
  style.textContent = `@keyframes cineAutoBackupSpinnerRotate {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }`;
  document.head.appendChild(style);
};

const showAutoBackupActivityIndicator = (message) => {
  if (typeof document === 'undefined') {
    return () => { };
  }
  const container = ensureNotificationContainer();
  if (!container) {
    return () => { };
  }
  ensureAutoBackupSpinnerStyles();

  let indicator = document.getElementById(AUTO_BACKUP_INDICATOR_ID);
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = AUTO_BACKUP_INDICATOR_ID;
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';
    indicator.style.gap = '0.75rem';
    indicator.style.padding = '0.75rem 1.25rem';
    indicator.style.marginTop = '0.5rem';
    indicator.style.borderRadius = '0.75rem';
    indicator.style.border = 'none';
    indicator.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
    indicator.style.background = 'rgba(32, 40, 62, 0.92)';
    indicator.style.color = '#ffffff';
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');

    const spinner = document.createElement('span');
    spinner.style.display = 'inline-block';
    spinner.style.width = '1.5rem';
    spinner.style.height = '1.5rem';
    spinner.style.borderRadius = '50%';
    spinner.style.border = '0.2rem solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderTopColor = '#ffffff';
    spinner.style.animation = 'cineAutoBackupSpinnerRotate 1s linear infinite';
    spinner.setAttribute('aria-hidden', 'true');
    indicator.appendChild(spinner);

    const textNode = document.createElement('span');
    textNode.className = 'auto-backup-indicator-text';
    indicator.appendChild(textNode);

    container.appendChild(indicator);
  }

  const textTarget = indicator.querySelector('.auto-backup-indicator-text');
  if (textTarget) {
    textTarget.textContent = message;
  }

  autoBackupIndicatorRefCount += 1;
  indicator.dataset.count = String(autoBackupIndicatorRefCount);
  indicator.style.display = 'flex';

  return () => {
    autoBackupIndicatorRefCount = Math.max(0, autoBackupIndicatorRefCount - 1);
    if (autoBackupIndicatorRefCount === 0) {
      removeNode(indicator);
      if (!container.children.length) {
        removeNode(container);
      }
    }
  };
};

const GLOBAL_LOADING_INDICATOR_ID = 'cineGlobalLoadingIndicator';
let globalLoadingIndicatorRefCount = 0;
const GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS = {
  default: 'globalLoadingIndicator',
  preparing: 'globalLoadingIndicatorPreparing',
  modules: 'globalLoadingIndicatorModules',
  data: 'globalLoadingIndicatorData',
  almost: 'globalLoadingIndicatorAlmostReady',
};

const resolveGlobalLoadingIndicatorMessage = (fallbackMessage) => {
  if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
    return fallbackMessage.trim();
  }
  const langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang]
    ? texts[currentLang]
    : null;
  const fallbackTexts = texts && typeof texts.en === 'object' && texts.en ? texts.en : null;
  const localized = langTexts && typeof langTexts.globalLoadingIndicator === 'string'
    ? langTexts.globalLoadingIndicator.trim()
    : '';
  if (localized) {
    return localized;
  }
  const fallback = fallbackTexts && typeof fallbackTexts.globalLoadingIndicator === 'string'
    ? fallbackTexts.globalLoadingIndicator.trim()
    : '';
  if (fallback) {
    return fallback;
  }
  return 'Loading…';
};

const resolveGlobalLoadingIndicatorMessageByKey = (key, fallbackMessage) => {
  const normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : '';
  const translationKey = normalizedKey && GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey]
    ? GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey]
    : GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS.default;

  const langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang]
    ? texts[currentLang]
    : null;
  const fallbackTexts = texts && typeof texts.en === 'object' && texts.en ? texts.en : null;

  let localized = '';
  if (translationKey && langTexts && typeof langTexts[translationKey] === 'string') {
    localized = langTexts[translationKey].trim();
  }
  if (!localized && translationKey && fallbackTexts && typeof fallbackTexts[translationKey] === 'string') {
    localized = fallbackTexts[translationKey].trim();
  }

  const fallback = typeof fallbackMessage === 'string' && fallbackMessage.trim()
    ? fallbackMessage.trim()
    : '';
  if (!localized && fallback) {
    localized = fallback;
  }

  if (!localized) {
    localized = resolveGlobalLoadingIndicatorMessage(fallback);
  }

  return localized || 'Loading…';
};

const syncBootstrapLoadingNoticeLocalization = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const notice = window.__cineLoadingNotice;
  if (!notice || typeof notice.applyLocalization !== 'function') {
    return;
  }
  const fallback = typeof notice.getFallbackMessages === 'function'
    ? notice.getFallbackMessages()
    : {};

  notice.applyLocalization({
    preparing: resolveGlobalLoadingIndicatorMessageByKey('preparing', fallback.preparing || ''),
    modules: resolveGlobalLoadingIndicatorMessageByKey('modules', fallback.modules || ''),
    data: resolveGlobalLoadingIndicatorMessageByKey('data', fallback.data || ''),
    almost: resolveGlobalLoadingIndicatorMessageByKey('almost', fallback.almost || ''),
  });
};

const refreshGlobalLoadingIndicatorText = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator) {
    return;
  }
  const textTarget = indicator.querySelector('.global-loading-indicator-text');
  if (!textTarget) {
    return;
  }
  syncBootstrapLoadingNoticeLocalization();
  const mode = indicator.dataset.messageMode || 'auto';
  if (mode === 'custom') {
    const customMessage = indicator.dataset.customMessage || '';
    if (customMessage) {
      textTarget.textContent = customMessage;
    }
    return;
  }
  if (mode === 'key') {
    const messageKey = indicator.dataset.messageKey || 'default';
    const fallback = indicator.dataset.fallbackMessage || '';
    const message = resolveGlobalLoadingIndicatorMessageByKey(messageKey, fallback);
    if (message) {
      textTarget.textContent = message;
      indicator.dataset.currentMessage = message;
    }
    return;
  }
  const message = resolveGlobalLoadingIndicatorMessage();
  textTarget.textContent = message;
  indicator.dataset.currentMessage = message;
};

const GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS = 260;

const setGlobalLoadingIndicatorMessageByKey = (key, fallbackMessage) => {
  if (typeof document === 'undefined') {
    return;
  }
  const indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator) {
    return;
  }
  const normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : 'default';
  const resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(normalizedKey, fallbackMessage || '');
  const textTarget = indicator.querySelector('.global-loading-indicator-text');
  indicator.dataset.messageMode = 'key';
  indicator.dataset.messageKey = normalizedKey;
  if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
    indicator.dataset.fallbackMessage = fallbackMessage.trim();
  } else {
    delete indicator.dataset.fallbackMessage;
  }
  indicator.dataset.currentMessage = resolvedMessage;
  if (textTarget) {
    textTarget.textContent = resolvedMessage;
  }
  syncBootstrapLoadingNoticeLocalization();
};

const getHighResolutionTimestamp = () => {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
};

const showGlobalLoadingIndicator = (message) => {
  if (typeof document === 'undefined') {
    return () => { };
  }
  const container = ensureNotificationContainer();
  if (!container) {
    return () => { };
  }
  ensureAutoBackupSpinnerStyles();

  const bootstrapNotice = typeof window !== 'undefined' ? window.__cineLoadingNotice : null;
  let indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator && bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
    try {
      indicator = bootstrapNotice.ensureIndicator();
    } catch (bootstrapIndicatorError) {
      console.warn('Failed to adopt bootstrap loading indicator', bootstrapIndicatorError);
      indicator = null;
    }
  }
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = GLOBAL_LOADING_INDICATOR_ID;
  }

  indicator.setAttribute('role', 'status');
  indicator.setAttribute('aria-live', 'polite');
  indicator.setAttribute('aria-busy', 'true');
  if (indicator.dataset && indicator.dataset.bootstrap) {
    delete indicator.dataset.bootstrap;
  }

  if (indicator.classList) {
    indicator.classList.add('cine-notification', 'cine-notification--loading');
  } else {
    indicator.className = [
      indicator.className || '',
      'cine-notification',
      'cine-notification--loading',
    ]
      .join(' ')
      .trim();
  }

  let spinner = indicator.querySelector('.cine-notification__spinner');
  if (!spinner) {
    spinner = document.createElement('span');
    spinner.className = 'cine-notification__spinner';
    spinner.setAttribute('aria-hidden', 'true');
    indicator.insertBefore(spinner, indicator.firstChild);
  }

  let textTarget = indicator.querySelector('.global-loading-indicator-text');
  if (!textTarget) {
    textTarget = document.createElement('span');
    textTarget.className = 'global-loading-indicator-text';
    indicator.appendChild(textTarget);
  }

  if (indicator.parentNode !== container) {
    container.appendChild(indicator);
  }

  if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
    try {
      bootstrapNotice.setBusy(true);
    } catch (bootstrapBusyError) {
      console.warn('Failed to mark bootstrap loading indicator busy', bootstrapBusyError);
    }
  }

  syncBootstrapLoadingNoticeLocalization();

  const isCustomMessage = Boolean(message && typeof message === 'string' && message.trim());
  let resolvedMessage;
  if (isCustomMessage) {
    resolvedMessage = resolveGlobalLoadingIndicatorMessage(message);
    indicator.dataset.messageMode = 'custom';
    indicator.dataset.customMessage = resolvedMessage;
  } else if (indicator.dataset.messageMode === 'key' && indicator.dataset.messageKey) {
    resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(
      indicator.dataset.messageKey,
      indicator.dataset.fallbackMessage || '',
    );
    indicator.dataset.currentMessage = resolvedMessage;
    indicator.dataset.customMessage = '';
  } else {
    resolvedMessage = resolveGlobalLoadingIndicatorMessage();
    indicator.dataset.messageMode = 'auto';
    indicator.dataset.customMessage = '';
    indicator.dataset.currentMessage = resolvedMessage;
  }

  if (textTarget) {
    textTarget.textContent = resolvedMessage;
  }

  if (bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
    bootstrapNotice.indicator = indicator;
  }

  globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount);
  globalLoadingIndicatorRefCount += 1;
  indicator.dataset.count = String(globalLoadingIndicatorRefCount);
  indicator.style.display = 'flex';

  const displayedAt = getHighResolutionTimestamp();
  let finalized = false;

  const finalizeHide = () => {
    if (finalized) {
      return;
    }
    finalized = true;
    globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount - 1);
    indicator.dataset.count = String(globalLoadingIndicatorRefCount);
    if (globalLoadingIndicatorRefCount === 0) {
      indicator.setAttribute('aria-busy', 'false');
      if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
        try {
          bootstrapNotice.setBusy(false);
        } catch (bootstrapBusyResetError) {
          console.warn('Failed to clear bootstrap loading indicator busy state', bootstrapBusyResetError);
        }
      }
      removeNode(indicator);
      if (!container.children.length) {
        removeNode(container);
      }
      if (bootstrapNotice && typeof bootstrapNotice === 'object') {
        bootstrapNotice.indicator = null;
      }
    }
  };

  return () => {
    if (finalized) {
      return;
    }
    const elapsed = getHighResolutionTimestamp() - displayedAt;
    if (elapsed < GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS) {
      const remaining = GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS - elapsed;
      if (typeof setTimeout === 'function') {
        setTimeout(finalizeHide, Math.max(16, remaining));
        return;
      }
    }
    finalizeHide();
  };
};

try {
  const scope = typeof globalThis !== 'undefined'
    ? globalThis
    : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null));
  if (scope) {
    scope.__cineShowAutoBackupIndicator = showAutoBackupActivityIndicator;
    scope.__cineShowGlobalLoadingIndicator = showGlobalLoadingIndicator;
    scope.__cineSetGlobalLoadingIndicatorMessageKey = setGlobalLoadingIndicatorMessageByKey;
  }
} catch (indicatorExposeError) {
  console.warn('Failed to expose auto backup indicator helper', indicatorExposeError);
}

const installGlobalFetchLoadingIndicator = () => {
  const scope = typeof globalThis !== 'undefined'
    ? globalThis
    : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null));
  if (!scope || typeof scope.fetch !== 'function') {
    return;
  }
  if (scope.__cineFetchWithLoadingIndicatorInstalled) {
    return;
  }
  const originalFetch = scope.fetch;
  const getMessage = () => resolveGlobalLoadingIndicatorMessage();
  const showIndicator =
    typeof scope.__cineShowGlobalLoadingIndicator === 'function'
      ? scope.__cineShowGlobalLoadingIndicator
      : showGlobalLoadingIndicator;

  const finalizeHide = (hide) => {
    if (typeof hide === 'function') {
      try {
        hide();
      } catch (hideError) {
        console.warn('Failed to hide global loading indicator after fetch', hideError);
      }
    }
  };

  scope.fetch = function fetchWithLoadingIndicator(input, init) {
    let hide = null;
    try {
      hide = showIndicator(getMessage());
    } catch (indicatorError) {
      console.warn('Failed to show global loading indicator before fetch', indicatorError);
      hide = null;
    }
    let response;
    try {
      response = originalFetch.apply(this, arguments);
    } catch (syncError) {
      finalizeHide(hide);
      throw syncError;
    }
    if (!response || typeof response.then !== 'function') {
      finalizeHide(hide);
      return response;
    }
    if (typeof response.finally === 'function') {
      return response.finally(() => {
        finalizeHide(hide);
      });
    }
    return response.then(
      (value) => {
        finalizeHide(hide);
        return value;
      },
      (error) => {
        finalizeHide(hide);
        throw error;
      },
    );
  };
  scope.__cineFetchWithLoadingIndicatorInstalled = true;
};

try {
  installGlobalFetchLoadingIndicator();
} catch (loadingInstallError) {
  console.warn('Failed to install global loading indicator for fetch', loadingInstallError);
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('languagechange', () => {
    try {
      refreshGlobalLoadingIndicatorText();
    } catch (languageIndicatorError) {
      console.warn('Failed to refresh global loading indicator after language change', languageIndicatorError);
    }
  });
}

const INITIAL_LOADING_INDICATOR_IDLE_TIMEOUT_MS = 480;
let initialLoadingIndicatorHide = null;
let initialLoadingIndicatorStarted = false;
let initialLoadingIndicatorSettled = false;

const ensureInitialLoadingIndicatorVisible = () => {
  if (initialLoadingIndicatorStarted || initialLoadingIndicatorSettled) {
    return;
  }
  if (typeof showGlobalLoadingIndicator !== 'function') {
    return;
  }
  try {
    const hide = showGlobalLoadingIndicator();
    if (typeof hide === 'function') {
      initialLoadingIndicatorHide = hide;
    } else {
      initialLoadingIndicatorHide = null;
    }
    initialLoadingIndicatorStarted = true;
  } catch (initialIndicatorError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to show initial global loading indicator', initialIndicatorError);
    }
    initialLoadingIndicatorHide = null;
    initialLoadingIndicatorStarted = false;
  }
};

const hideInitialLoadingIndicatorSafely = () => {
  const hide = initialLoadingIndicatorHide;
  initialLoadingIndicatorHide = null;
  initialLoadingIndicatorStarted = false;
  if (typeof hide === 'function') {
    try {
      hide();
    } catch (initialIndicatorHideError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to hide initial global loading indicator', initialIndicatorHideError);
      }
    }
  }
};

const finalizeInitialLoadingIndicator = () => {
  if (initialLoadingIndicatorSettled) {
    return;
  }
  initialLoadingIndicatorSettled = true;

  if (!initialLoadingIndicatorStarted && !initialLoadingIndicatorHide) {
    return;
  }

  const scheduleHide = () => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(hideInitialLoadingIndicatorSafely, {
        timeout: INITIAL_LOADING_INDICATOR_IDLE_TIMEOUT_MS,
      });
      return;
    }
    if (typeof setTimeout === 'function') {
      setTimeout(hideInitialLoadingIndicatorSafely, GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS);
      return;
    }
    hideInitialLoadingIndicatorSafely();
  };

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scheduleHide);
  } else {
    scheduleHide();
  }
};

function getDiffText(key, fallbackValue = '') {
  if (typeof key !== 'string' || !key) {
    return typeof fallbackValue === 'string' ? fallbackValue : `${fallbackValue ?? ''}`;
  }

  const normalizedFallback =
    typeof fallbackValue === 'string' ? fallbackValue : `${fallbackValue ?? ''}`;
  const langTexts =
    texts && typeof currentLang === 'string' && currentLang && texts[currentLang]
      ? texts[currentLang]
      : null;
  const defaultTexts = texts && typeof texts.en === 'object' ? texts.en : null;

  const resolveCandidate = source => {
    if (!source || typeof source !== 'object') {
      return null;
    }
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      return null;
    }
    const value = source[key];
    if (typeof value !== 'string') {
      return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  };

  const localized = resolveCandidate(langTexts);
  if (localized) {
    return localized;
  }

  const fallbackLocalized = resolveCandidate(defaultTexts);
  if (fallbackLocalized) {
    return fallbackLocalized;
  }

  return normalizedFallback;
}

function formatTimestampForComparison(date, includeSeconds) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }
  const lang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  if (includeSeconds) {
    options.second = '2-digit';
  }
  try {
    return new Intl.DateTimeFormat(lang, options).format(date);
  } catch (error) {
    if (lang !== 'en') {
      try {
        return new Intl.DateTimeFormat('en', options).format(date);
      } catch (fallbackError) {
        console.warn('Date formatting failed for comparison timestamp', error, fallbackError);
      }
    } else {
      console.warn('Date formatting failed for comparison timestamp', error);
    }
  }
  return date.toISOString();
}

function formatComparisonOptionLabel(name, parsedDetails) {
  if (typeof name !== 'string') {
    return '';
  }
  const parsed = parsedDetails || parseAutoBackupName(name);
  if (!parsed) {
    const manualLabel = getDiffText('versionCompareManualLabel', 'Manual save');
    return `${manualLabel} · ${name}`;
  }
  const typeLabel = parsed.type === 'auto-backup-before-delete'
    ? getDiffText('versionCompareAutoDeleteLabel', 'Auto backup before delete')
    : getDiffText('versionCompareAutoLabel', 'Auto backup');
  const timestamp = formatTimestampForComparison(parsed.date, parsed.includeSeconds);
  const suffix = parsed.label ? ` · ${parsed.label}` : '';
  return timestamp
    ? `${typeLabel} · ${timestamp}${suffix}`
    : `${typeLabel}${suffix ? ` · ${suffix}` : ''}`;
}

function collectBackupDiffOptions() {
  const options = [];
  const setups = getSetups();
  if (setups && typeof setups === 'object') {
    const setupOptions = Object.keys(setups)
      .filter(name => typeof name === 'string' && name)
      .map(name => {
        const parsed = parseAutoBackupName(name);
        const label = formatComparisonOptionLabel(name, parsed);
        const hasValidDate = parsed
          && parsed.date instanceof Date
          && !Number.isNaN(parsed.date.valueOf());
        return {
          value: name,
          label,
          data: setups[name],
          parsed,
          timestamp: hasValidDate ? parsed.date.getTime() : null,
        };
      })
      .sort((a, b) => {
        const autoA = Boolean(a.parsed);
        const autoB = Boolean(b.parsed);
        if (autoA !== autoB) {
          return autoA ? 1 : -1;
        }
        if (autoA && autoB) {
          const timeA = typeof a.timestamp === 'number' ? a.timestamp : null;
          const timeB = typeof b.timestamp === 'number' ? b.timestamp : null;
          if (timeA !== null && timeB !== null && timeA !== timeB) {
            return timeB - timeA;
          }
          if (timeA !== null && timeB === null) {
            return -1;
          }
          if (timeA === null && timeB !== null) {
            return 1;
          }
        }
        return localeSort(a.label, b.label);
      })
      .map(({ parsed, timestamp, ...option }) => option);
    options.push(...setupOptions);
  }

  return options;
}

function fillBackupDiffSelect(select, options, selectedValue) {
  if (!select) return;
  const placeholderText = getDiffText('versionCompareSelectPlaceholder', 'Select a version');
  const fragment = document.createDocumentFragment();
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderText;
  placeholder.disabled = options.length > 0;
  placeholder.selected = true;
  fragment.appendChild(placeholder);

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    fragment.appendChild(opt);
  });

  select.innerHTML = '';
  select.appendChild(fragment);

  if (selectedValue && options.some(option => option.value === selectedValue)) {
    select.value = selectedValue;
    placeholder.selected = false;
  } else {
    select.value = '';
  }
}

function clearBackupDiffResults() {
  if (backupDiffListEl) {
    backupDiffListEl.innerHTML = '';
  }
  if (backupDiffListContainerEl) {
    backupDiffListContainerEl.hidden = true;
  }
}

function fallbackHumanizeDiffKey(key) {
  if (typeof key !== 'string') {
    return String(key);
  }
  const spaced = key
    .replace(/[_\s-]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
  if (!spaced) {
    return key;
  }
  return spaced
    .split(' ')
    .map(part => {
      if (!part) return part;
      if (part.length > 3 && part === part.toUpperCase()) {
        return part;
      }
      if (/^\d+$/.test(part)) {
        return formatNumberForComparison(Number(part));
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function humanizeDiffKey(key) {
  if (typeof key !== 'string') {
    return String(key);
  }
  if (typeof humanizeKey === 'function') {
    try {
      const result = humanizeKey(key);
      if (typeof result === 'string' && result) {
        return result;
      }
    } catch (error) {
      console.warn('Failed to humanize diff key via humanizeKey', error);
    }
  }
  return fallbackHumanizeDiffKey(key);
}

const ARRAY_COMPARISON_KEY_CANDIDATES = [
  'name',
  'label',
  'title',
  'id',
  'uuid',
  'key',
  'slug',
];

const ARRAY_COMPARISON_KEY_LABEL_OVERRIDES = {
  id: 'ID',
  uuid: 'UUID',
};

const ARRAY_COMPARISON_KEY_LABEL_OMIT = new Set(['name', 'label', 'title']);

function isDiffComparablePrimitive(value) {
  if (value === null) {
    return true;
  }
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}

function arrayHasOnlyComparablePrimitives(array) {
  if (!Array.isArray(array)) {
    return false;
  }
  for (let i = 0; i < array.length; i += 1) {
    if (!isDiffComparablePrimitive(array[i])) {
      return false;
    }
  }
  return true;
}

function createPrimitiveDiffKey(value) {
  if (value === null) {
    return 'primitive:null';
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'primitive:number:NaN';
    }
    if (Object.is(value, -0)) {
      return 'primitive:number:-0';
    }
    return `primitive:number:${value}`;
  }
  if (typeof value === 'string') {
    return `primitive:string:${value}`;
  }
  if (typeof value === 'boolean') {
    return `primitive:boolean:${value}`;
  }
  return `primitive:other:${String(value)}`;
}

function buildPrimitiveDiffIndex(array) {
  const counts = new Map();
  if (!Array.isArray(array)) {
    return counts;
  }
  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];
    if (!isDiffComparablePrimitive(value)) {
      continue;
    }
    const key = createPrimitiveDiffKey(value);
    if (!counts.has(key)) {
      counts.set(key, { value, count: 0 });
    }
    const entry = counts.get(key);
    entry.count += 1;
  }
  return counts;
}

function formatPrimitiveDiffPathValue(value) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'Infinity' : '-Infinity';
    }
    if (Object.is(value, -0)) {
      return '-0';
    }
  }
  return value;
}

function createKeyedDiffPathSegment(keyName, keyValue) {
  let serializedValue;
  try {
    serializedValue = JSON.stringify(keyValue);
  } catch (error) {
    console.warn('Failed to serialize keyed diff path value', error);
    try {
      serializedValue = JSON.stringify(String(keyValue));
    } catch (stringError) {
      console.warn('Failed to stringify keyed diff fallback value', stringError);
      serializedValue = '"?"';
    }
  }
  return `[${keyName}=${serializedValue}]`;
}

function parseKeyedDiffPathSegment(segment) {
  if (typeof segment !== 'string') {
    return null;
  }
  const match = segment.match(/^\[([^=[\]]+)=([\s\S]+)\]$/);
  if (!match) {
    return null;
  }
  const keyName = match[1];
  const rawValue = match[2];
  try {
    return { key: keyName, value: JSON.parse(rawValue) };
  } catch (error) {
    console.warn('Failed to parse keyed diff path segment', segment, error);
    return { key: keyName, value: rawValue };
  }
}

function findArrayComparisonKey(baseArray, compareArray) {
  if (!Array.isArray(baseArray) || !Array.isArray(compareArray)) {
    return null;
  }

  const arrays = [baseArray, compareArray];
  for (const candidate of ARRAY_COMPARISON_KEY_CANDIDATES) {
    let hasValues = false;
    let valid = true;
    const seenByArray = arrays.map(() => new Set());

    for (let arrayIndex = 0; arrayIndex < arrays.length && valid; arrayIndex += 1) {
      const currentArray = arrays[arrayIndex];
      for (let i = 0; i < currentArray.length; i += 1) {
        const item = currentArray[i];
        if (!isPlainObject(item)) {
          valid = false;
          break;
        }
        if (!Object.prototype.hasOwnProperty.call(item, candidate)) {
          valid = false;
          break;
        }
        const keyValue = item[candidate];
        if (keyValue === null || keyValue === undefined) {
          valid = false;
          break;
        }
        if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
          valid = false;
          break;
        }
        hasValues = true;
        const serialized = String(keyValue);
        const seen = seenByArray[arrayIndex];
        if (seen.has(serialized)) {
          valid = false;
          break;
        }
        seen.add(serialized);
      }
    }

    if (valid && hasValues) {
      return candidate;
    }
  }

  return null;
}

function buildArrayKeyIndex(array, keyName) {
  const map = new Map();
  const order = [];
  if (!Array.isArray(array)) {
    return { map, order };
  }
  array.forEach(item => {
    if (!isPlainObject(item)) {
      return;
    }
    const keyValue = item[keyName];
    if (keyValue === null || keyValue === undefined) {
      return;
    }
    if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
      return;
    }
    const serialized = String(keyValue);
    if (map.has(serialized)) {
      return;
    }
    map.set(serialized, { value: item, keyValue });
    order.push(serialized);
  });
  return { map, order };
}

function formatDiffListIndex(part) {
  if (typeof part !== 'string') {
    return null;
  }
  const indexMatch = part.match(/^\[(\d+)\]$/);
  if (indexMatch) {
    const index = Number(indexMatch[1]);
    if (!Number.isFinite(index) || index < 0) {
      return null;
    }
    const template = getDiffText('versionCompareListItemLabel', 'Item %s');
    return template.replace('%s', formatNumberForComparison(index + 1));
  }

  const keyedSegment = parseKeyedDiffPathSegment(part);
  if (keyedSegment) {
    const { key, value } = keyedSegment;
    let valueText;
    if (typeof value === 'number' && Number.isFinite(value)) {
      valueText = formatNumberForComparison(value);
    } else if (typeof value === 'string') {
      valueText = value;
    } else if (value === null) {
      valueText = 'null';
    } else {
      try {
        valueText = JSON.stringify(value);
      } catch (error) {
        console.warn('Failed to stringify keyed diff value', error);
        valueText = String(value);
      }
    }

    const template = getDiffText('versionCompareListItemLabel', 'Item %s');
    const baseLabel = template.replace('%s', valueText);

    if (ARRAY_COMPARISON_KEY_LABEL_OMIT.has(key)) {
      return baseLabel;
    }

    const overrideLabel = ARRAY_COMPARISON_KEY_LABEL_OVERRIDES[key];
    const keyLabel = overrideLabel || humanizeDiffKey(key);
    if (!keyLabel) {
      return baseLabel;
    }
    return `${keyLabel} · ${baseLabel}`;
  }

  return null;
}

function formatDiffPathSegment(part) {
  const listLabel = formatDiffListIndex(part);
  if (listLabel) {
    return listLabel;
  }
  if (typeof part !== 'string') {
    return String(part);
  }
  return humanizeDiffKey(part);
}

function formatDiffPath(parts) {
  if (!Array.isArray(parts) || !parts.length) {
    return getDiffText('versionCompareRootPath', 'Entire setup');
  }
  return parts.map(formatDiffPathSegment).join(' › ');
}

function valuesEqual(a, b) {
  if (a === b) return true;
  return Number.isNaN(a) && Number.isNaN(b);
}

function computeSetupDiff(baseline, comparison) {
  const entries = [];

  function walk(baseValue, compareValue, path) {
    if (valuesEqual(baseValue, compareValue)) {
      return;
    }

    const baseIsObject = isPlainObject(baseValue);
    const compareIsObject = isPlainObject(compareValue);

    if (baseIsObject && compareIsObject) {
      const keys = new Set([
        ...Object.keys(baseValue),
        ...Object.keys(compareValue),
      ]);
      keys.forEach(key => {
        const hasBase = Object.prototype.hasOwnProperty.call(baseValue, key);
        const hasCompare = Object.prototype.hasOwnProperty.call(compareValue, key);
        if (!hasBase) {
          entries.push({ type: 'added', path: path.concat(key), before: undefined, after: compareValue[key] });
        } else if (!hasCompare) {
          entries.push({ type: 'removed', path: path.concat(key), before: baseValue[key], after: undefined });
        } else {
          walk(baseValue[key], compareValue[key], path.concat(key));
        }
      });
      return;
    }

    const baseIsArray = Array.isArray(baseValue);
    const compareIsArray = Array.isArray(compareValue);
    if (baseIsArray && compareIsArray) {
      const comparisonKey = findArrayComparisonKey(baseValue, compareValue);
      if (comparisonKey) {
        const { map: baseIndex, order: baseOrder } = buildArrayKeyIndex(baseValue, comparisonKey);
        const { map: compareIndex, order: compareOrder } = buildArrayKeyIndex(compareValue, comparisonKey);
        const combinedOrder = [];
        const seenKeys = new Set();
        const appendKey = key => {
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            combinedOrder.push(key);
          }
        };
        baseOrder.forEach(appendKey);
        compareOrder.forEach(appendKey);

        combinedOrder.forEach(serializedKey => {
          const baseEntry = baseIndex.get(serializedKey) || null;
          const compareEntry = compareIndex.get(serializedKey) || null;
          const keyValue = baseEntry ? baseEntry.keyValue : compareEntry ? compareEntry.keyValue : serializedKey;
          const nextPath = path.concat(createKeyedDiffPathSegment(comparisonKey, keyValue));
          if (!baseEntry && compareEntry) {
            entries.push({ type: 'added', path: nextPath, before: undefined, after: compareEntry.value });
          } else if (baseEntry && !compareEntry) {
            entries.push({ type: 'removed', path: nextPath, before: baseEntry.value, after: undefined });
          } else if (baseEntry && compareEntry) {
            walk(baseEntry.value, compareEntry.value, nextPath);
          }
        });
        return;
      }

      if (arrayHasOnlyComparablePrimitives(baseValue) && arrayHasOnlyComparablePrimitives(compareValue)) {
        const baseIndex = buildPrimitiveDiffIndex(baseValue);
        const compareIndex = buildPrimitiveDiffIndex(compareValue);
        const combinedOrder = [];
        const seenKeys = new Set();
        const appendKey = key => {
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            combinedOrder.push(key);
          }
        };
        for (let i = 0; i < baseValue.length; i += 1) {
          appendKey(createPrimitiveDiffKey(baseValue[i]));
        }
        for (let i = 0; i < compareValue.length; i += 1) {
          appendKey(createPrimitiveDiffKey(compareValue[i]));
        }

        combinedOrder.forEach(key => {
          const baseEntry = baseIndex.get(key) || null;
          const compareEntry = compareIndex.get(key) || null;
          const baseCount = baseEntry ? baseEntry.count : 0;
          const compareCount = compareEntry ? compareEntry.count : 0;
          if (compareCount > baseCount) {
            const addValue = compareEntry ? compareEntry.value : undefined;
            const diff = compareCount - baseCount;
            for (let i = 0; i < diff; i += 1) {
              entries.push({
                type: 'added',
                path: path.concat(
                  createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(addValue)),
                ),
                before: undefined,
                after: addValue,
              });
            }
          }
          if (baseCount > compareCount) {
            const removeValue = baseEntry ? baseEntry.value : undefined;
            const diff = baseCount - compareCount;
            for (let i = 0; i < diff; i += 1) {
              entries.push({
                type: 'removed',
                path: path.concat(
                  createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(removeValue)),
                ),
                before: removeValue,
                after: undefined,
              });
            }
          }
        });
        return;
      }

      const maxLength = Math.max(baseValue.length, compareValue.length);
      for (let index = 0; index < maxLength; index += 1) {
        const hasBase = index < baseValue.length;
        const hasCompare = index < compareValue.length;
        const nextPath = path.concat(`[${index}]`);
        if (!hasBase) {
          entries.push({ type: 'added', path: nextPath, before: undefined, after: compareValue[index] });
        } else if (!hasCompare) {
          entries.push({ type: 'removed', path: nextPath, before: baseValue[index], after: undefined });
        } else {
          walk(baseValue[index], compareValue[index], nextPath);
        }
      }
      return;
    }

    if (!baseIsObject && !baseIsArray && (compareIsObject || compareIsArray)) {
      entries.push({ type: 'changed', path, before: baseValue, after: compareValue });
      return;
    }
    if ((baseIsObject || baseIsArray) && !compareIsObject && !compareIsArray) {
      entries.push({ type: 'changed', path, before: baseValue, after: compareValue });
      return;
    }

    const changeType = baseValue === undefined ? 'added'
      : compareValue === undefined ? 'removed'
        : 'changed';
    entries.push({ type: changeType, path, before: baseValue, after: compareValue });
  }

  walk(baseline, comparison, []);
  return entries;
}

function createDiffValueElement(value, variant) {
  const element = document.createElement('pre');
  element.className = 'diff-value';
  if (variant) {
    element.className += ` diff-value-${variant}`;
  }
  if (value === undefined) {
    element.textContent = getDiffText('versionCompareMissingValue', 'Not present');
    return element;
  }
  if (value === null) {
    element.textContent = 'null';
    return element;
  }
  if (typeof value === 'string') {
    element.textContent = value;
    return element;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    element.textContent = String(value);
    return element;
  }
  try {
    element.textContent = JSON.stringify(value, null, 2);
  } catch (error) {
    console.warn('Failed to stringify diff value', error);
    element.textContent = String(value);
  }
  return element;
}

function createDiffChangeBlock(labelText, value, variant) {
  const block = document.createElement('div');
  block.className = 'diff-change';
  if (variant) {
    block.classList.add(`diff-change-${variant}`);
  }
  const label = document.createElement('span');
  label.className = 'diff-label';
  label.textContent = labelText;
  block.appendChild(label);
  block.appendChild(createDiffValueElement(value, variant));
  return block;
}

function createDiffStatusBadge(type) {
  const badge = document.createElement('span');
  badge.className = 'diff-label diff-status-badge';
  let variant = 'changed';
  let textKey = 'versionCompareChangeUpdated';
  let fallbackText = 'Updated';
  if (type === 'added') {
    variant = 'added';
    textKey = 'versionCompareChangeAdded';
    fallbackText = 'Added';
  } else if (type === 'removed') {
    variant = 'removed';
    textKey = 'versionCompareChangeRemoved';
    fallbackText = 'Removed';
  } else if (type === 'changed') {
    variant = 'changed';
    textKey = 'versionCompareChangeUpdated';
    fallbackText = 'Updated';
  }
  badge.classList.add(`diff-status-${variant}`);
  badge.textContent = getDiffText(textKey, fallbackText);
  return badge;
}

function sortDiffEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  const typeRank = { changed: 0, added: 1, removed: 2 };
  const compareStrings = typeof localeSort === 'function'
    ? (a, b) => localeSort(a, b)
    : (a, b) => a.localeCompare(b);
  return entries
    .map(entry => ({
      entry,
      pathText: formatDiffPath(entry && entry.path),
      rank: entry && entry.type && Object.prototype.hasOwnProperty.call(typeRank, entry.type)
        ? typeRank[entry.type]
        : 3,
    }))
    .sort((a, b) => {
      if (a.rank !== b.rank) {
        return a.rank - b.rank;
      }
      return compareStrings(a.pathText, b.pathText);
    });
}

function renderBackupDiffEntries(entries) {
  if (!backupDiffListEl || !backupDiffListContainerEl) {
    return;
  }
  backupDiffListEl.innerHTML = '';
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffListContainerEl.hidden = true;
    return;
  }
  backupDiffListContainerEl.hidden = false;
  const decoratedEntries = sortDiffEntries(entries);
  decoratedEntries.forEach(({ entry, pathText }) => {
    if (!entry) {
      return;
    }
    const item = document.createElement('li');
    const typeClass = entry.type ? ` diff-${entry.type}` : '';
    item.className = `diff-entry${typeClass}`;

    const header = document.createElement('div');
    header.className = 'diff-entry-header';

    const path = document.createElement('div');
    path.className = 'diff-path';
    path.textContent = pathText;
    header.appendChild(path);

    header.appendChild(createDiffStatusBadge(entry.type));
    item.appendChild(header);

    const changeGroup = document.createElement('div');
    changeGroup.className = 'diff-change-group';

    if (entry.type === 'changed') {
      changeGroup.classList.add('diff-change-group--split');
      changeGroup.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeRemoved', 'Removed'),
        entry.before,
        'removed',
      ));
      changeGroup.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeAdded', 'Added'),
        entry.after,
        'added',
      ));
    } else if (entry.type === 'added') {
      changeGroup.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeAdded', 'Added'),
        entry.after,
        'added',
      ));
    } else if (entry.type === 'removed') {
      changeGroup.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeRemoved', 'Removed'),
        entry.before,
        'removed',
      ));
    } else {
      changeGroup.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeUpdated', 'Updated'),
        entry.after,
        'changed',
      ));
    }

    if (changeGroup.childNodes.length) {
      item.appendChild(changeGroup);
    }
    backupDiffListEl.appendChild(item);
  });
}

function formatDiffCount(count) {
  const key = count === 1
    ? 'versionCompareDifferencesCountOne'
    : 'versionCompareDifferencesCountOther';
  const template = getDiffText(key, count === 1 ? '%s difference noted.' : '%s differences noted.');
  return template.replace('%s', formatNumberForComparison(count));
}

function formatDiffDetail(key, count) {
  const template = getDiffText(key, '%s');
  return template.replace('%s', formatNumberForComparison(count));
}

function updateBackupDiffSummary(entries) {
  if (!backupDiffSummaryEl) {
    return;
  }
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffSummaryEl.textContent = getDiffText('versionCompareIdentical', 'Versions match—no changes detected.');
    return;
  }
  const totals = { added: 0, removed: 0, changed: 0 };
  entries.forEach(entry => {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });
  const summaryText = formatDiffCount(entries.length);
  const breakdown = [];
  if (totals.added) {
    breakdown.push(formatDiffDetail('versionCompareSummaryAdded', totals.added));
  }
  if (totals.removed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryRemoved', totals.removed));
  }
  if (totals.changed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryChanged', totals.changed));
  }
  backupDiffSummaryEl.textContent = breakdown.length
    ? `${summaryText} (${breakdown.join(' · ')})`
    : summaryText;
}

function renderBackupDiff() {
  if (!backupDiffSummaryEl) {
    return;
  }
  if (!backupDiffOptionsCache.length) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    if (backupDiffNotesEl) backupDiffNotesEl.disabled = true;
    return;
  }

  if (backupDiffNotesEl) backupDiffNotesEl.disabled = false;

  const baseline = backupDiffState.baseline;
  const comparison = backupDiffState.comparison;

  if (!baseline || !comparison) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }

  if (baseline === comparison) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareSameSelection', 'Select two different versions to compare.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }

  const optionsMap = new Map(backupDiffOptionsCache.map(option => [option.value, option]));
  const baselineEntry = optionsMap.get(baseline);
  const comparisonEntry = optionsMap.get(comparison);

  if (!baselineEntry || !comparisonEntry) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }

  const diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  renderBackupDiffEntries(diffEntries);
  updateBackupDiffSummary(diffEntries);
  if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = false;
}

function populateBackupDiffSelectors() {
  backupDiffOptionsCache = collectBackupDiffOptions();
  fillBackupDiffSelect(backupDiffPrimarySelectEl, backupDiffOptionsCache, backupDiffState.baseline);
  fillBackupDiffSelect(backupDiffSecondarySelectEl, backupDiffOptionsCache, backupDiffState.comparison);
  if (backupDiffEmptyStateEl) {
    backupDiffEmptyStateEl.hidden = backupDiffOptionsCache.length > 0;
  }
  renderBackupDiff();
}

function collapseBackupDiffSection(options = {}) {
  if (!backupDiffSectionEl) {
    return;
  }
  if (!backupDiffSectionEl.hasAttribute('hidden')) {
    backupDiffSectionEl.setAttribute('hidden', '');
  }
  if (backupDiffToggleButtonEl) {
    backupDiffToggleButtonEl.setAttribute('aria-expanded', 'false');
  }
  if (options.resetSelections) {
    backupDiffState.baseline = '';
    backupDiffState.comparison = '';
  }
  if (options.resetNotes && backupDiffNotesEl) {
    backupDiffNotesEl.value = '';
  }
}

function showBackupDiffSection() {
  if (!backupDiffSectionEl) {
    return;
  }
  populateBackupDiffSelectors();
  backupDiffSectionEl.removeAttribute('hidden');
  if (backupDiffToggleButtonEl) {
    backupDiffToggleButtonEl.setAttribute('aria-expanded', 'true');
  }
  if (backupDiffPrimarySelectEl) {
    try {
      backupDiffPrimarySelectEl.focus({ preventScroll: true });
    } catch (error) {
      backupDiffPrimarySelectEl.focus();
    }
  }
}

function handleBackupDiffToggle() {
  if (!backupDiffSectionEl) {
    return;
  }
  if (backupDiffSectionEl.hasAttribute('hidden')) {
    showBackupDiffSection();
  } else {
    collapseBackupDiffSection();
  }
}

function handleBackupDiffSelectionChange(event) {
  const target = event && event.target ? event.target : null;
  if (!target) {
    return;
  }
  const value = typeof target.value === 'string' ? target.value : '';
  if (target === backupDiffPrimarySelectEl) {
    backupDiffState.baseline = value;
  } else if (target === backupDiffSecondarySelectEl) {
    backupDiffState.comparison = value;
  }
  renderBackupDiff();
}

function getComparisonEntryType(name) {
  if (typeof name !== 'string') {
    return 'manual';
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
    return 'auto-backup-before-delete';
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
    return 'auto-backup';
  }
  return 'manual';
}

function cloneValueForExport(value) {
  if (value === undefined) {
    return undefined;
  }
  try {
    return SESSION_DEEP_CLONE(value);
  } catch (error) {
    console.warn('Failed to clone comparison snapshot for export', error);
    return value;
  }
}

function handleBackupDiffExport() {
  if (!backupDiffOptionsCache.length) {
    showNotification('warning', getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.'));
    return;
  }
  const baseline = backupDiffState.baseline;
  const comparison = backupDiffState.comparison;
  if (!baseline || !comparison || baseline === comparison) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }
  const optionsMap = new Map(backupDiffOptionsCache.map(option => [option.value, option]));
  const baselineEntry = optionsMap.get(baseline);
  const comparisonEntry = optionsMap.get(comparison);
  if (!baselineEntry || !comparisonEntry) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }

  const diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  const totals = { added: 0, removed: 0, changed: 0 };
  diffEntries.forEach(entry => {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });

  const note = backupDiffNotesEl && typeof backupDiffNotesEl.value === 'string'
    ? backupDiffNotesEl.value.trim()
    : '';

  const timestamp = new Date();
  const { iso } = formatFullBackupFilename(timestamp);
  const safeIso = iso.replace(/[:]/g, '-');
  const fileName = `cine-power-planner-version-log-${safeIso}.json`;

  const exportPayload = {
    type: 'cine-power-planner-version-log',
    version: 1,
    createdAt: new Date().toISOString(),
    appVersion: typeof ACTIVE_APP_VERSION === 'string'
      ? ACTIVE_APP_VERSION
      : normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null),
    baseline: {
      id: baselineEntry.value,
      label: baselineEntry.label,
      type: getComparisonEntryType(baselineEntry.value),
      snapshot: cloneValueForExport(baselineEntry.data),
    },
    comparison: {
      id: comparisonEntry.value,
      label: comparisonEntry.label,
      type: getComparisonEntryType(comparisonEntry.value),
      snapshot: cloneValueForExport(comparisonEntry.data),
    },
    summary: {
      totalDifferences: diffEntries.length,
      added: totals.added,
      removed: totals.removed,
      updated: totals.changed,
    },
    differences: diffEntries.map(entry => ({
      type: entry.type,
      path: entry.path,
      before: entry.before,
      after: entry.after,
    })),
  };

  if (note) {
    exportPayload.note = note;
  }

  let serialized;
  try {
    serialized = JSON.stringify(exportPayload, null, 2);
  } catch (error) {
    console.warn('Failed to serialize comparison export payload', error);
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
    return;
  }

  const downloadResult = downloadBackupPayload(serialized, fileName);
  if (downloadResult && downloadResult.success) {
    showNotification('success', getDiffText('versionCompareExportSuccess', 'Comparison log exported.'));
  } else {
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
  }
}

function applyPreferencesFromStorage(safeGetItem) {
  if (typeof safeGetItem !== 'function') {
    return { showAutoBackups: false, accentColor: null, language: null };
  }

  const restoredTemperatureUnit = safeGetItem(temperaturePreferenceStorageKey);
  if (restoredTemperatureUnit) {
    try {
      applyTemperatureUnitPreferenceWithFallback(restoredTemperatureUnit, { persist: false });
    } catch (error) {
      console.warn('Failed to apply restored temperature unit preference', error);
    }
  }

  const focusScaleStorageKey =
    (typeof FOCUS_SCALE_STORAGE_KEY_NAME === 'string' && FOCUS_SCALE_STORAGE_KEY_NAME)
    || (typeof globalThis !== 'undefined'
      && globalThis
      && typeof globalThis.FOCUS_SCALE_STORAGE_KEY_NAME === 'string'
      && globalThis.FOCUS_SCALE_STORAGE_KEY_NAME)
    || 'cameraPowerPlanner_focusScale';

  const storedFocusScale = safeGetItem(focusScaleStorageKey);
  let restoredFocusScale = null;
  if (storedFocusScale) {
    let normalizedFocusScale = null;
    if (typeof normalizeFocusScale === 'function') {
      try {
        normalizedFocusScale = normalizeFocusScale(storedFocusScale);
      } catch (error) {
        console.warn('Failed to normalize restored focus scale preference', error);
      }
    }
    if (typeof normalizedFocusScale !== 'string' || !normalizedFocusScale) {
      normalizedFocusScale =
        typeof storedFocusScale === 'string' ? storedFocusScale.trim().toLowerCase() : '';
    }

    if (normalizedFocusScale === 'metric' || normalizedFocusScale === 'imperial') {
      restoredFocusScale = normalizedFocusScale;
      try {
        if (typeof applyFocusScalePreference === 'function') {
          applyFocusScalePreference(normalizedFocusScale, { persist: false, forceUpdate: true });
        }
      } catch (error) {
        console.warn('Failed to apply restored focus scale preference', error);
      }

      sessionFocusScale = normalizedFocusScale;

      try {
        if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
          settingsFocusScale.value = normalizedFocusScale;
        }
      } catch (error) {
        console.warn('Failed to sync restored focus scale selection', error);
      }

      if (typeof rememberSettingsFocusScaleBaseline === 'function') {
        try {
          rememberSettingsFocusScaleBaseline();
        } catch (error) {
          console.warn('Failed to update focus scale baseline after restore', error);
        }
      }

      if (typeof globalThis !== 'undefined' && globalThis) {
        try {
          globalThis.focusScalePreference = normalizedFocusScale;
        } catch (error) {
          console.warn('Failed to update global focus scale preference', error);
        }
      }

      if (typeof focusScalePreference !== 'undefined') {
        try {
          focusScalePreference = normalizedFocusScale;
        } catch (error) {
          console.warn('Failed to update scoped focus scale preference', error);
        }
      }
    }
  }

  try {
    setThemePreference(safeGetItem('darkMode') === 'true', { persist: true });
  } catch (error) {
    console.warn('Failed to apply restored dark mode preference', error);
  }
  try {
    applyPinkMode(safeGetItem('pinkMode') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored pink mode preference', error);
  }
  try {
    applyHighContrast(safeGetItem('highContrast') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored high contrast preference', error);
  }
  try {
    applyReduceMotion(safeGetItem('reduceMotion') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored reduce motion preference', error);
  }
  try {
    applyRelaxedSpacing(safeGetItem('relaxedSpacing') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored relaxed spacing preference', error);
  }

  const showBackups = safeGetItem('showAutoBackups') === 'true';
  const color = safeGetItem('accentColor');
  if (color) {
    try {
      document.documentElement.style.setProperty('--accent-color', color);
      document.documentElement.style.setProperty('--link-color', color);
    } catch (error) {
      console.warn('Failed to apply restored accent color', error);
    }
    accentColor = color;
    prevAccentColor = color;
    if (accentColorInput) {
      accentColorInput.value = color;
    }
    if (typeof updateAccentColorResetButtonState === 'function') {
      updateAccentColorResetButtonState();
    }
  }

  const language = safeGetItem('language');

  try {
    const mountVoltageKeyName =
      typeof getMountVoltageStorageKeyName === 'function'
        ? getMountVoltageStorageKeyName()
        : 'cameraPowerPlanner_mountVoltages';
    const storedVoltages = safeGetItem(mountVoltageKeyName);
    let parsedVoltages = parseStoredMountVoltages(storedVoltages);
    let shouldPersistVoltages = false;

    if (!parsedVoltages) {
      const backupKey =
        typeof getMountVoltageStorageBackupKeyName === 'function'
          ? getMountVoltageStorageBackupKeyName()
          : `${mountVoltageKeyName}__backup`;
      const backupVoltages = safeGetItem(backupKey);
      if (backupVoltages !== undefined && backupVoltages !== null) {
        const parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
        if (parsedBackupVoltages) {
          parsedVoltages = parsedBackupVoltages;
          shouldPersistVoltages = true;
        }
      }
    }

    if (parsedVoltages) {
      applySessionMountVoltagePreferences(parsedVoltages, { persist: shouldPersistVoltages, triggerUpdate: true });
      const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
      if (updateMountVoltageInputsFromStateFn) {
        try {
          updateMountVoltageInputsFromStateFn();
        } catch (updateError) {
          warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
        }
      } else {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
      }
      rememberSettingsMountVoltagesBaseline();
    }
  } catch (voltageError) {
    console.warn('Failed to apply restored mount voltage preferences', voltageError);
  }

  return {
    showAutoBackups: showBackups,
    accentColor: color || null,
    language: language || null,
    focusScale: restoredFocusScale,
  };
}

function captureSetupSelection() {
  return {
    value: setupSelect ? setupSelect.value : '',
    name: setupNameInput ? setupNameInput.value : '',
  };
}

function restoreSetupSelection(previousSelection, shouldShowAutoBackups) {
  if (!previousSelection || typeof previousSelection !== 'object') {
    return;
  }

  const { value = '', name = '' } = previousSelection;

  if (setupSelect) {
    try {
      if (shouldShowAutoBackups || !value || !value.startsWith('auto-backup-')) {
        setupSelect.value = value;
      } else {
        setupSelect.value = '';
      }
    } catch (error) {
      console.warn('Failed to restore setup selection after restore', error);
    }
  }

  if (setupNameInput) {
    try {
      setupNameInput.value = name || '';
    } catch (error) {
      console.warn('Failed to restore setup name after restore', error);
    }
  }
}

const backupFallbackLoaders = [
  {
    key: 'devices',
    loaderName: 'loadDeviceData',
    isValid: value => value === null || isPlainObject(value),
    loader: () => (typeof loadDeviceData === 'function' ? loadDeviceData() : undefined),
  },
  {
    key: 'setups',
    loaderName: 'loadSetups',
    isValid: value => isPlainObject(value),
    loader: () => (typeof loadSetups === 'function' ? loadSetups() : undefined),
  },
  {
    key: 'session',
    loaderName: 'loadSessionState',
    isValid: value => value === null || isPlainObject(value),
    loader: () => (typeof loadSessionState === 'function' ? loadSessionState() : undefined),
  },
  {
    key: 'feedback',
    loaderName: 'loadFeedback',
    isValid: value => value === null || isPlainObject(value),
    loader: () => (typeof loadFeedback === 'function' ? loadFeedback() : undefined),
  },
  {
    key: 'project',
    loaderName: 'loadProject',
    isValid: value => isPlainObject(value),
    loader: () => (typeof loadProject === 'function' ? loadProject() : undefined),
  },
  {
    key: 'favorites',
    loaderName: 'loadFavorites',
    isValid: value => isPlainObject(value),
    loader: () => (typeof loadFavorites === 'function' ? loadFavorites() : undefined),
  },
  {
    key: 'documentationTracker',
    loaderName: 'loadDocumentationTracker',
    isValid: value =>
      value === null
      || (isPlainObject(value) && Array.isArray(value.releases))
      || Array.isArray(value),
    loader: () =>
    (typeof loadDocumentationTracker === 'function'
      ? loadDocumentationTracker()
      : undefined),
  },
  {
    key: 'autoGearBackups',
    loaderName: 'loadAutoGearBackups',
    isValid: value => Array.isArray(value),
    loader: () => (typeof loadAutoGearBackups === 'function' ? loadAutoGearBackups() : undefined),
  },
  {
    key: 'autoGearPresets',
    loaderName: 'loadAutoGearPresets',
    isValid: value => Array.isArray(value),
    loader: () => (typeof loadAutoGearPresets === 'function' ? loadAutoGearPresets() : undefined),
  },
  {
    key: 'autoGearMonitorDefaults',
    loaderName: 'loadAutoGearMonitorDefaults',
    isValid: value => isPlainObject(value),
    loader: () => (
      typeof loadAutoGearMonitorDefaults === 'function'
        ? loadAutoGearMonitorDefaults()
        : undefined
    ),
  },
  {
    key: 'autoGearSeeded',
    loaderName: 'loadAutoGearSeedFlag',
    isValid: value => typeof value === 'boolean',
    loader: () => (typeof loadAutoGearSeedFlag === 'function' ? loadAutoGearSeedFlag() : undefined),
  },
  {
    key: 'autoGearActivePresetId',
    loaderName: 'loadAutoGearActivePresetId',
    isValid: value => typeof value === 'string',
    loader: () => (typeof loadAutoGearActivePresetId === 'function'
      ? loadAutoGearActivePresetId()
      : undefined),
  },
  {
    key: 'autoGearAutoPresetId',
    loaderName: 'loadAutoGearAutoPresetId',
    isValid: value => typeof value === 'string',
    loader: () => (typeof loadAutoGearAutoPresetId === 'function'
      ? loadAutoGearAutoPresetId()
      : undefined),
  },
  {
    key: 'autoGearShowBackups',
    loaderName: 'loadAutoGearBackupVisibility',
    isValid: value => typeof value === 'boolean',
    loader: () => (typeof loadAutoGearBackupVisibility === 'function'
      ? loadAutoGearBackupVisibility()
      : undefined),
  },
  {
    key: 'autoGearBackupRetention',
    loaderName: 'loadAutoGearBackupRetention',
    isValid: value => typeof value === 'number' && Number.isFinite(value),
    loader: () => (typeof loadAutoGearBackupRetention === 'function'
      ? loadAutoGearBackupRetention()
      : undefined),
  },
  {
    key: 'fullBackupHistory',
    loaderName: 'loadFullBackupHistory',
    isValid: value => Array.isArray(value),
    loader: () => (typeof loadFullBackupHistory === 'function' ? loadFullBackupHistory() : undefined),
  },
];

function describeError(error) {
  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error.message === 'string' && error.message.trim()) {
    return error.message;
  }
  try {
    return JSON.stringify(error);
  } catch (serializationError) {
    void serializationError;
  }
  try {
    return String(error);
  } catch (stringifyError) {
    void stringifyError;
  }
  return null;
}

function recordDiagnostic(diagnostics, section, status, options = {}) {
  if (!Array.isArray(diagnostics)) {
    return;
  }
  const entry = { section, status };
  if (options.source && typeof options.source === 'string') {
    entry.source = options.source;
  }
  if (typeof options.message === 'string') {
    const trimmedMessage = options.message.trim();
    if (trimmedMessage) {
      entry.message = trimmedMessage;
    }
  }
  diagnostics.push(entry);
}

function applyBackupFallbacks(target, diagnostics) {
  if (!target || typeof target !== 'object') {
    return;
  }

  backupFallbackLoaders.forEach(({ key, loader, loaderName, isValid }) => {
    const currentValue = target[key];
    if (isValid(currentValue)) {
      return;
    }
    if (typeof loader !== 'function') {
      return;
    }
    try {
      const fallbackValue = loader();
      if (fallbackValue === undefined) {
        recordDiagnostic(diagnostics, key, 'missing', { source: loaderName });
        return;
      }
      target[key] = fallbackValue;
      recordDiagnostic(diagnostics, key, 'recovered', { source: loaderName });
    } catch (error) {
      console.warn(`Failed to recover ${key} for full backup`, error);
      const message = describeError(error);
      recordDiagnostic(diagnostics, key, 'error', { source: loaderName, message });
    }
  });
}

function mergeAutoGearRuleLists(primary, secondary) {
  const baseList = Array.isArray(primary) ? primary.slice() : [];
  if (!Array.isArray(secondary) || !secondary.length) {
    return { combined: baseList, changed: false };
  }

  const existingIds = new Set(
    baseList
      .map(entry => (entry && typeof entry.id === 'string' ? entry.id : null))
      .filter(Boolean),
  );

  let changed = false;
  secondary.forEach(entry => {
    if (!entry) {
      return;
    }
    const identifier = entry && typeof entry.id === 'string' ? entry.id : null;
    if (identifier && existingIds.has(identifier)) {
      return;
    }
    if (identifier) {
      existingIds.add(identifier);
    }
    baseList.push(entry);
    changed = true;
  });

  return { combined: baseList, changed };
}

function collectFullBackupData() {
  const diagnostics = [];
  let rawData = {};
  let exportAttempted = false;
  let exportFailed = false;

  if (typeof exportAllData === 'function') {
    exportAttempted = true;
    try {
      rawData = exportAllData();
    } catch (error) {
      exportFailed = true;
      console.warn('Failed to collect planner data for full backup', error);
      const message = describeError(error);
      recordDiagnostic(diagnostics, 'exportAllData', 'error', {
        source: 'exportAllData',
        message,
      });
      rawData = {};
    }
  } else {
    recordDiagnostic(diagnostics, 'exportAllData', 'missing', { source: 'exportAllData' });
  }

  let data = {};
  if (isPlainObject(rawData)) {
    data = { ...rawData };
  } else if (exportAttempted && !exportFailed && rawData && typeof rawData === 'object') {
    data = { ...rawData };
    recordDiagnostic(diagnostics, 'exportAllData', 'coerced', { source: 'exportAllData' });
  } else {
    if (exportAttempted && !exportFailed) {
      recordDiagnostic(diagnostics, 'exportAllData', 'invalid', { source: 'exportAllData' });
    }
    data = {};
  }

  applyBackupFallbacks(data, diagnostics);

  if (!Array.isArray(data.autoGearRules)) {
    let rules = null;
    let ruleSource = '';
    let recovered = false;
    if (typeof getBaseAutoGearRules === 'function') {
      try {
        const baseRules = getBaseAutoGearRules();
        if (Array.isArray(baseRules)) {
          rules = baseRules.slice();
          ruleSource = 'getBaseAutoGearRules';
          recovered = true;
        }
      } catch (error) {
        console.warn('Failed to capture automatic gear rules from state for full backup', error);
        const message = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'getBaseAutoGearRules',
          message,
        });
      }
    }

    let storedRules = null;
    if (typeof loadAutoGearRules === 'function') {
      try {
        storedRules = loadAutoGearRules();
      } catch (error) {
        console.warn('Failed to load automatic gear rules from storage for full backup', error);
        const message = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'loadAutoGearRules',
          message,
        });
      }
    }

    if (Array.isArray(storedRules) && storedRules.length) {
      if (!Array.isArray(rules) || !rules.length) {
        rules = storedRules;
        ruleSource = 'loadAutoGearRules';
        recovered = true;
      } else {
        const { combined, changed } = mergeAutoGearRuleLists(rules, storedRules);
        rules = combined;
        if (changed) {
          recovered = true;
          ruleSource = ruleSource ? `${ruleSource}+loadAutoGearRules` : 'loadAutoGearRules';
        }
      }
    }

    if (Array.isArray(rules)) {
      data.autoGearRules = rules;
      recordDiagnostic(diagnostics, 'autoGearRules', recovered ? 'recovered' : 'preserved', {
        source: ruleSource || (Array.isArray(storedRules) && storedRules.length ? 'loadAutoGearRules' : ''),
      });
    } else {
      data.autoGearRules = [];
      recordDiagnostic(diagnostics, 'autoGearRules', 'defaulted');
    }
  }

  return { data, diagnostics };
}

function buildSettingsBackupPackage(timestamp = new Date()) {
  const { iso, fileName } = formatFullBackupFilename(timestamp);
  const safeStorage = resolveSafeLocalStorage();
  const settings = captureStorageSnapshot(safeStorage);
  const sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
  const { data: backupData, diagnostics } = collectFullBackupData();
  const backupVersion =
    ACTIVE_APP_VERSION
    || normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null);
  const backup = {
    version: backupVersion || undefined,
    generatedAt: iso,
    settings,
    sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
    data: backupData,
  };
  if (Array.isArray(diagnostics) && diagnostics.length) {
    backup.diagnostics = diagnostics;
  }
  const payload = JSON.stringify(backup);

  return {
    fileName,
    payload,
    iso,
    backup,
    diagnostics,
  };
}

function performSettingsBackup(notify = true, timestamp = new Date(), options = {}) {
  try {
    const config = typeof options === 'object' && options !== null ? options : {};
    const isEvent = notify && typeof notify === 'object' && typeof notify.type === 'string';
    const shouldNotify = config.deferDownload ? false : (isEvent ? true : Boolean(notify));
    const { fileName, payload, iso } = buildSettingsBackupPackage(timestamp);

    if (config.deferDownload) {
      return {
        fileName,
        payload,
        createdAt: iso,
      };
    }

    const downloadResult = downloadBackupPayload(payload, fileName);
    if (!downloadResult || (!downloadResult.success && !downloadResult.queued)) {
      throw new Error('No supported download method available');
    }

    if (downloadResult.success) {
      try {
        recordFullBackupHistoryEntryFn({ createdAt: iso, fileName });
      } catch (historyError) {
        console.warn('Failed to record full backup history entry', historyError);
      }
      if (downloadResult.method === 'window-fallback') {
        const manualMessage = getManualDownloadFallbackMessage();
        showNotification('warning', manualMessage);
        if (typeof alert === 'function') {
          alert(manualMessage);
        }
      } else if (shouldNotify) {
        showNotification('success', 'Full app backup downloaded');
      }
    } else if (downloadResult.queued && downloadResult.queueMessage) {
      showNotification('warning', downloadResult.queueMessage);
    }

    return { fileName, downloadResult };
  } catch (e) {
    console.warn('Backup failed', e);
    if (notify) {
      showNotification('error', 'Backup failed');
    }
    return null;
  }
}

function createSettingsBackup(notify = true, timestamp = new Date()) {
  const result = performSettingsBackup(notify, timestamp);
  return result ? result.fileName : null;
}

if (backupSettings) {
  backupSettings.addEventListener('click', createSettingsBackup);
}
const storageBackupNowControl = typeof document !== 'undefined'
  ? document.getElementById('storageBackupNow')
  : null;
if (storageBackupNowControl) {
  storageBackupNowControl.addEventListener('click', createSettingsBackup);
}

// storagePersistenceRequestButton already declared in app-core-new-1.js
const storagePersistenceStatusEl = typeof document !== 'undefined'
  ? document.getElementById('storagePersistenceStatus')
  : null;
const loggingSectionEl = typeof document !== 'undefined'
  ? document.getElementById('loggingSection')
  : null;
const loggingHistoryListEl = typeof document !== 'undefined'
  ? document.getElementById('loggingHistory')
  : null;
const loggingStatusEl = typeof document !== 'undefined'
  ? document.getElementById('loggingStatus')
  : null;
const loggingEmptyEl = typeof document !== 'undefined'
  ? document.getElementById('loggingEmpty')
  : null;
const loggingUnavailableEl = typeof document !== 'undefined'
  ? document.getElementById('loggingUnavailable')
  : null;
const loggingLevelFilterEl = typeof document !== 'undefined'
  ? document.getElementById('loggingLevelFilter')
  : null;
const loggingNamespaceFilterEl = typeof document !== 'undefined'
  ? document.getElementById('loggingNamespaceFilter')
  : null;
const loggingNamespaceHelpEl = typeof document !== 'undefined'
  ? document.getElementById('loggingNamespaceFilterHelp')
  : null;
// const loggingExportButton = typeof document !== 'undefined'
//   ? document.getElementById('loggingExportBtn')
//   : null;
const loggingHistoryLimitInput = typeof document !== 'undefined'
  ? document.getElementById('loggingHistoryLimit')
  : null;
const loggingHistoryLimitHelpEl = typeof document !== 'undefined'
  ? document.getElementById('loggingHistoryLimitHelp')
  : null;
const loggingConsoleOutputInput = typeof document !== 'undefined'
  ? document.getElementById('loggingConsoleOutput')
  : null;
const loggingCaptureConsoleInput = typeof document !== 'undefined'
  ? document.getElementById('loggingCaptureConsole')
  : null;
const loggingCaptureErrorsInput = typeof document !== 'undefined'
  ? document.getElementById('loggingCaptureErrors')
  : null;
const loggingPersistSessionInput = typeof document !== 'undefined'
  ? document.getElementById('loggingPersistSession')
  : null;

const storagePersistenceRequestButton = typeof document !== 'undefined'
  ? document.getElementById('storagePersistenceRequestBtn')
  : null;

const sessionLoggingExportButton = typeof document !== 'undefined'
  ? document.getElementById('loggingExportBtn')
  : null;

const storagePersistenceState = {
  supported: null,
  persisted: null,
  usage: null,
  quota: null,
  checking: false,
  requestInFlight: false,
  requestAttempted: false,
  lastRequestDenied: false,
  lastError: null,
  lastLoggedUsage: null,
  lastLoggedQuota: null,
  lastLoggedSupported: null,
  lastLoggedPersisted: null,
  lastLoggedSummary: null,
};

let storagePersistenceCheckToken = 0;

function logStoragePersistenceEstimateUpdate(options = {}) {
  const { fromRequest = false } = options || {};
  const quota =
    typeof storagePersistenceState.quota === 'number' && Number.isFinite(storagePersistenceState.quota)
      ? storagePersistenceState.quota
      : null;
  if (quota === null) {
    return;
  }

  const usage =
    typeof storagePersistenceState.usage === 'number' && Number.isFinite(storagePersistenceState.usage)
      ? storagePersistenceState.usage
      : null;
  const supported =
    typeof storagePersistenceState.supported === 'boolean' ? storagePersistenceState.supported : null;
  const persisted =
    typeof storagePersistenceState.persisted === 'boolean' ? storagePersistenceState.persisted : null;

  const { lang, langTexts, fallbackTexts } = getStoragePersistenceLangInfo();
  const quotaText = formatStoragePersistenceBytes(quota, lang);
  const usageText = usage !== null ? formatStoragePersistenceBytes(usage, lang) : '';

  let summary = '';
  if (usageText) {
    const template =
      (langTexts && langTexts.storagePersistenceUsage)
      || (fallbackTexts && fallbackTexts.storagePersistenceUsage)
      || '';
    summary = template.replace('{used}', usageText).replace('{quota}', quotaText);
  } else {
    const quotaTemplate =
      (langTexts && langTexts.loggingStorageQuotaOnly)
      || (fallbackTexts && fallbackTexts.loggingStorageQuotaOnly)
      || '';
    summary = quotaTemplate.replace('{quota}', quotaText);
  }

  const message =
    (langTexts && langTexts.loggingStorageEstimateUpdated)
    || (fallbackTexts && fallbackTexts.loggingStorageEstimateUpdated)
    || 'Storage estimate refreshed.';

  const unchanged =
    storagePersistenceState.lastLoggedUsage === usage
    && storagePersistenceState.lastLoggedQuota === quota
    && storagePersistenceState.lastLoggedSupported === supported
    && storagePersistenceState.lastLoggedPersisted === persisted
    && storagePersistenceState.lastLoggedSummary === summary;

  if (unchanged && !fromRequest) {
    return;
  }

  logSettingsEvent(
    'info',
    message,
    {
      summary: summary || null,
      usageBytes: usage,
      usageDisplay: usageText || null,
      quotaBytes: quota,
      quotaDisplay: quotaText || null,
      supported,
      persisted,
      trigger: fromRequest ? 'user-request' : 'auto-refresh',
    },
    { source: 'storage-persistence' },
  );

  storagePersistenceState.lastLoggedUsage = usage;
  storagePersistenceState.lastLoggedQuota = quota;
  storagePersistenceState.lastLoggedSupported = supported;
  storagePersistenceState.lastLoggedPersisted = persisted;
  storagePersistenceState.lastLoggedSummary = summary;
}

const LOGGING_LEVEL_PRIORITY = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const LOGGING_HISTORY_MIN = 50;
const LOGGING_HISTORY_MAX = 2000;
const LOGGING_EXPORT_STATUS_RESET_DELAY = 6000;

const loggingState = {
  initialized: false,
  loggingApi: null,
  unsubscribeHistory: null,
  unsubscribeConfig: null,
  retryTimer: null,
  renderScheduled: false,
  levelFilter: 'all',
  namespaceFilter: '',
  config: null,
  namespaceDebounce: null,
  statusResetTimer: null,
  degraded: false,
};

function getLoggingLangInfo() {
  const fallbackTexts = texts && texts.en ? texts.en : {};
  const lang = typeof currentLang === 'string' && texts && texts[currentLang]
    ? currentLang
    : 'en';
  const langTexts = (texts && texts[lang]) || fallbackTexts;
  return { lang, langTexts, fallbackTexts };
}

function setLoggingStatusKey(key) {
  if (!loggingStatusEl) {
    return;
  }
  if (loggingState.statusResetTimer != null) {
    clearTimeout(loggingState.statusResetTimer);
    loggingState.statusResetTimer = null;
  }
  const { langTexts, fallbackTexts } = getLoggingLangInfo();
  const text = (langTexts && langTexts[key]) || (fallbackTexts && fallbackTexts[key]) || '';
  loggingStatusEl.textContent = text;
  if (text) {
    loggingStatusEl.setAttribute('data-help', text);
  } else {
    loggingStatusEl.removeAttribute('data-help');
  }
}

function scheduleLoggingStatusReset(delay = 5000, fallbackKey = 'loggingStatusIdle') {
  if (loggingState.statusResetTimer != null) {
    clearTimeout(loggingState.statusResetTimer);
    loggingState.statusResetTimer = null;
  }
  if (typeof setTimeout !== 'function') {
    if (fallbackKey) {
      setLoggingStatusKey(fallbackKey);
    }
    return;
  }
  const timeout = typeof delay === 'number' && Number.isFinite(delay) ? Math.max(0, delay) : 5000;
  loggingState.statusResetTimer = setTimeout(() => {
    loggingState.statusResetTimer = null;
    if (fallbackKey) {
      setLoggingStatusKey(fallbackKey);
    }
  }, timeout);
}

function resolveLoggingApi() {
  if (loggingState.loggingApi && typeof loggingState.loggingApi.getHistory === 'function') {
    return loggingState.loggingApi;
  }

  const scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }
    try {
      const candidate = scope.cineLogging;
      if (
        candidate
        && typeof candidate === 'object'
        && typeof candidate.getHistory === 'function'
        && typeof candidate.subscribe === 'function'
      ) {
        loggingState.loggingApi = candidate;
        return candidate;
      }
    } catch (error) {
      console.warn('Unable to resolve cineLogging', error);
    }
  }

  return null;
}

function detachLoggingSubscriptions() {
  if (loggingState.unsubscribeHistory) {
    try {
      loggingState.unsubscribeHistory();
    } catch (error) {
      console.warn('Failed to detach logging history subscription', error);
    }
  }
  if (loggingState.unsubscribeConfig) {
    try {
      loggingState.unsubscribeConfig();
    } catch (error) {
      console.warn('Failed to detach logging config subscription', error);
    }
  }
  loggingState.unsubscribeHistory = null;
  loggingState.unsubscribeConfig = null;
}

function setLoggingControlsDisabled(disabled) {
  const inputs = [
    loggingLevelFilterEl,
    loggingNamespaceFilterEl,
    loggingHistoryLimitInput,
    loggingConsoleOutputInput,
    loggingCaptureConsoleInput,
    loggingCaptureErrorsInput,
    loggingPersistSessionInput,
    sessionLoggingExportButton,
  ];
  inputs.forEach(input => {
    if (!input) return;
    input.disabled = !!disabled;
    if (disabled) {
      input.setAttribute('aria-disabled', 'true');
    } else {
      input.setAttribute('aria-disabled', 'false');
    }
  });
}

function formatLogDetailValue(value) {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
}

function formatLogTimestamp(entry, langTexts, fallbackTexts) {
  const lang = typeof currentLang === 'string' && texts && texts[currentLang]
    ? currentLang
    : 'en';
  const timestamp = typeof entry.timestamp === 'number' && Number.isFinite(entry.timestamp)
    ? entry.timestamp
    : null;
  let localText = '';
  if (timestamp != null) {
    const date = new Date(timestamp);
    if (!Number.isNaN(date.getTime())) {
      try {
        if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
          const formatter = new Intl.DateTimeFormat(lang, {
            dateStyle: 'short',
            timeStyle: 'medium',
          });
          localText = formatter.format(date);
        } else {
          localText = date.toLocaleString();
        }
      } catch (error) {
        console.warn('Unable to format log timestamp', error);
        localText = date.toISOString();
      }
    }
  }
  const iso = typeof entry.isoTimestamp === 'string' && entry.isoTimestamp
    ? entry.isoTimestamp
    : (timestamp != null ? new Date(timestamp).toISOString() : '');
  if (localText && iso && iso !== localText) {
    const template = langTexts.loggingTimestampCombined
      || fallbackTexts.loggingTimestampCombined
      || '{local} ({iso})';
    return template.replace('{local}', localText).replace('{iso}', iso);
  }
  return localText || iso || '';
}

function createLogDetailsElement(label, value) {
  const details = document.createElement('details');
  details.className = 'log-entry-details';
  const summary = document.createElement('summary');
  summary.textContent = label;
  const pre = document.createElement('pre');
  pre.className = 'log-entry-detail';
  pre.textContent = formatLogDetailValue(value);
  details.appendChild(summary);
  details.appendChild(pre);
  return details;
}

function sanitizeLoggingFileSegment(segment) {
  if (typeof segment !== 'string') {
    return '';
  }
  const trimmed = segment.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.replace(/[^A-Za-z0-9.-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function buildLoggingExportMetadata(date = new Date()) {
  let referenceDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    referenceDate = new Date();
  }

  let isoTimestamp = '';
  if (referenceDate && typeof referenceDate.toISOString === 'function') {
    try {
      isoTimestamp = referenceDate.toISOString();
    } catch (isoError) {
      void isoError;
      isoTimestamp = '';
    }
  }

  if (!isoTimestamp) {
    const fallbackDate = new Date(Date.now());
    try {
      isoTimestamp = fallbackDate.toISOString();
      referenceDate = fallbackDate;
    } catch (fallbackIsoError) {
      void fallbackIsoError;
      isoTimestamp = String(Date.now());
    }
  }

  const stampSource = isoTimestamp || String(Date.now());
  const sanitizedStamp = sanitizeLoggingFileSegment(stampSource.replace(/[:.]/g, '-'))
    || sanitizeLoggingFileSegment(stampSource)
    || String(Date.now());

  const versionCandidate = typeof ACTIVE_APP_VERSION === 'string' && ACTIVE_APP_VERSION
    ? ACTIVE_APP_VERSION
    : (typeof APP_VERSION === 'string' && APP_VERSION ? APP_VERSION : '');
  const sanitizedVersion = sanitizeLoggingFileSegment(versionCandidate);

  const parts = ['cine-power-planner-log'];
  if (sanitizedVersion) {
    parts.push(`v${sanitizedVersion}`);
  }
  parts.push(sanitizedStamp);

  const timezoneOffsetMinutes = typeof referenceDate.getTimezoneOffset === 'function'
    ? 0 - referenceDate.getTimezoneOffset()
    : null;

  return {
    isoTimestamp,
    timezoneOffsetMinutes,
    fileName: `${parts.join('-')}.json`,
  };
}

function cloneLoggingExportValue(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  try {
    return SESSION_DEEP_CLONE(value);
  } catch (cloneError) {
    void cloneError;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (jsonError) {
    void jsonError;
  }
  if (Array.isArray(value)) {
    return value.slice();
  }
  return { ...value };
}

function exportLoggingHistory() {
  const logging = resolveLoggingApi();
  const { langTexts, fallbackTexts } = getLoggingLangInfo();
  const unavailableMessage = (langTexts && langTexts.loggingExportUnavailable)
    || (fallbackTexts && fallbackTexts.loggingExportUnavailable)
    || '';
  const errorMessage = (langTexts && langTexts.loggingExportError)
    || (fallbackTexts && fallbackTexts.loggingExportError)
    || '';
  const successMessage = (langTexts && langTexts.loggingExportSuccess)
    || (fallbackTexts && fallbackTexts.loggingExportSuccess)
    || 'Diagnostics log exported.';

  const shouldRestoreDisabled = sessionLoggingExportButton && !sessionLoggingExportButton.disabled;
  if (sessionLoggingExportButton) {
    sessionLoggingExportButton.disabled = true;
    sessionLoggingExportButton.setAttribute('aria-disabled', 'true');
  }

  try {
    if (!logging || typeof logging.getHistory !== 'function') {
      if (unavailableMessage) {
        showNotification('error', unavailableMessage);
      }
      setLoggingStatusKey('loggingStatusError');
      scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY, 'loggingStatusIdle');
      return;
    }

    setLoggingStatusKey('loggingStatusExporting');

    const snapshot = logging.getHistory({}) || [];
    if (!Array.isArray(snapshot)) {
      throw new Error('Invalid diagnostics history snapshot.');
    }
    const historySource = snapshot;

    let historySnapshot = cloneLoggingExportValue(historySource);
    if (!Array.isArray(historySnapshot)) {
      historySnapshot = historySource.slice();
    }

    let configSnapshot = null;
    if (typeof logging.getConfig === 'function') {
      try {
        const config = logging.getConfig();
        if (config && typeof config === 'object') {
          const clonedConfig = cloneLoggingExportValue(config);
          configSnapshot = clonedConfig && typeof clonedConfig === 'object'
            ? clonedConfig
            : { ...config };
        }
      } catch (configError) {
        logSettingsEvent(
          'warn',
          'Diagnostics log export config capture failed',
          { message: describeError(configError) },
          { namespace: 'logging-export' },
        );
      }
    }

    let statsSnapshot = null;
    if (typeof logging.getStats === 'function') {
      try {
        const stats = logging.getStats();
        if (stats && typeof stats === 'object') {
          const clonedStats = cloneLoggingExportValue(stats);
          statsSnapshot = clonedStats && typeof clonedStats === 'object'
            ? clonedStats
            : { ...stats };
        }
      } catch (statsError) {
        logSettingsEvent(
          'warn',
          'Diagnostics log export stats capture failed',
          { message: describeError(statsError) },
          { namespace: 'logging-export' },
        );
      }
    }

    const metadata = buildLoggingExportMetadata(new Date());
    const exportPayload = {
      exportedAt: metadata.isoTimestamp,
      timezoneOffsetMinutes: metadata.timezoneOffsetMinutes,
      filters: {
        level: loggingState.levelFilter || 'all',
        namespace: loggingState.namespaceFilter || '',
      },
      history: historySnapshot,
      historyLength: historySnapshot.length,
    };

    const appVersion = typeof ACTIVE_APP_VERSION === 'string' && ACTIVE_APP_VERSION
      ? ACTIVE_APP_VERSION
      : (typeof APP_VERSION === 'string' && APP_VERSION ? APP_VERSION : null);
    if (appVersion) {
      exportPayload.appVersion = appVersion;
    }
    if (configSnapshot && typeof configSnapshot === 'object') {
      exportPayload.config = configSnapshot;
    }
    if (statsSnapshot && typeof statsSnapshot === 'object') {
      exportPayload.stats = statsSnapshot;
    }

    const serialized = JSON.stringify(exportPayload, null, 2);
    if (!serialized) {
      throw new Error('Empty diagnostics export payload.');
    }

    if (typeof downloadBackupPayload !== 'function') {
      throw new Error('downloadBackupPayload unavailable.');
    }

    const downloadResult = downloadBackupPayload(serialized, metadata.fileName);
    if (!downloadResult || !downloadResult.success) {
      throw new Error('Diagnostics log download failed.');
    }

    logSettingsEvent(
      'info',
      'Diagnostics log exported',
      { entries: historySnapshot.length, fileName: metadata.fileName },
      { namespace: 'logging-export' },
    );

    if (successMessage) {
      showNotification('success', successMessage);
    }
    setLoggingStatusKey('loggingStatusExported');
    scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);

    if (downloadResult.method === 'manual' || downloadResult.method === 'window-fallback') {
      const manualMessage = getManualDownloadFallbackMessage();
      if (manualMessage) {
        showNotification('warning', manualMessage);
      }
    }
  } catch (error) {
    const message = describeError(error);
    logSettingsEvent(
      'error',
      'Diagnostics log export failed',
      { message: message || null },
      { namespace: 'logging-export' },
    );
    const failureMessage = errorMessage || message || 'Log export failed.';
    if (failureMessage) {
      showNotification('error', failureMessage);
    }
    setLoggingStatusKey('loggingStatusExportFailed');
    scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);
  } finally {
    if (sessionLoggingExportButton && shouldRestoreDisabled) {
      sessionLoggingExportButton.disabled = false;
      sessionLoggingExportButton.setAttribute('aria-disabled', 'false');
    }
  }
}

function renderLoggingHistory() {
  loggingState.renderScheduled = false;
  if (!loggingSectionEl || !loggingHistoryListEl) {
    return;
  }
  const logging = resolveLoggingApi();
  const { langTexts, fallbackTexts } = getLoggingLangInfo();

  if (!logging || typeof logging.getHistory !== 'function') {
    setLoggingControlsDisabled(true);
    if (loggingUnavailableEl) {
      loggingUnavailableEl.removeAttribute('hidden');
    }
    if (loggingEmptyEl) {
      loggingEmptyEl.setAttribute('hidden', '');
    }
    if (loggingHistoryListEl) {
      loggingHistoryListEl.textContent = '';
    }
    setLoggingStatusKey('loggingStatusError');
    return;
  }

  setLoggingControlsDisabled(false);
  if (loggingUnavailableEl) {
    loggingUnavailableEl.setAttribute('hidden', '');
  }

  let history = [];
  try {
    const snapshot = logging.getHistory({});
    if (Array.isArray(snapshot)) {
      history = snapshot;
    }
  } catch (error) {
    console.warn('Unable to read logging history', error);
    const filtersDetail = {};
    if (Object.prototype.hasOwnProperty.call(loggingState, 'levelFilter')) {
      const levelValue = loggingState.levelFilter;
      filtersDetail.level = typeof levelValue === 'undefined' ? null : levelValue;
    }
    if (Object.prototype.hasOwnProperty.call(loggingState, 'namespaceFilter')) {
      const namespaceValue = loggingState.namespaceFilter;
      filtersDetail.namespace = typeof namespaceValue === 'undefined' ? null : namespaceValue;
    }
    const detail = {
      message: describeError(error),
    };
    if (Object.keys(filtersDetail).length > 0) {
      detail.filters = filtersDetail;
    }
    logSettingsEvent(
      'error',
      'Failed to read diagnostics history',
      detail,
      { namespace: 'logging-panel' },
    );
    setLoggingStatusKey('loggingStatusError');
    history = [];
  }

  const namespaceQuery = typeof loggingState.namespaceFilter === 'string'
    ? loggingState.namespaceFilter.trim().toLowerCase()
    : '';
  const threshold = loggingState.levelFilter === 'all'
    ? -Infinity
    : LOGGING_LEVEL_PRIORITY[loggingState.levelFilter] || LOGGING_LEVEL_PRIORITY.warn;

  const entries = history
    .slice()
    .reverse()
    .filter(entry => {
      if (!entry || typeof entry !== 'object') {
        return false;
      }
      const level = typeof entry.level === 'string' ? entry.level.toLowerCase() : 'info';
      const priority = LOGGING_LEVEL_PRIORITY[level] ?? LOGGING_LEVEL_PRIORITY.info;
      if (priority < threshold) {
        return false;
      }
      if (namespaceQuery) {
        const namespace = typeof entry.namespace === 'string' ? entry.namespace.toLowerCase() : '';
        if (!namespace.includes(namespaceQuery)) {
          return false;
        }
      }
      return true;
    });

  const fragment = document.createDocumentFragment();
  const levelLabels = {
    debug: langTexts.loggingLevelDebug || fallbackTexts.loggingLevelDebug || 'Debug',
    info: langTexts.loggingLevelInfo || fallbackTexts.loggingLevelInfo || 'Info',
    warn: langTexts.loggingLevelWarn || fallbackTexts.loggingLevelWarn || 'Warn',
    error: langTexts.loggingLevelError || fallbackTexts.loggingLevelError || 'Error',
  };

  entries.forEach(entry => {
    const level = typeof entry.level === 'string' ? entry.level.toLowerCase() : 'info';
    const listItem = document.createElement('li');
    listItem.className = `log-entry level-${level}`;

    const header = document.createElement('div');
    header.className = 'log-entry-header';

    const message = document.createElement('span');
    message.className = 'log-entry-message';
    message.textContent = typeof entry.message === 'string' ? entry.message : '';

    const levelBadge = document.createElement('span');
    levelBadge.className = 'log-entry-level';
    levelBadge.textContent = levelLabels[level] || levelLabels.info;

    header.appendChild(message);
    header.appendChild(levelBadge);

    listItem.appendChild(header);

    const metaList = document.createElement('dl');
    metaList.className = 'log-entry-meta';

    const timestampRow = document.createElement('div');
    timestampRow.className = 'log-entry-meta-row';
    const timestampLabel = document.createElement('dt');
    timestampLabel.textContent = langTexts.loggingEntryTimestampLabel
      || fallbackTexts.loggingEntryTimestampLabel
      || 'Time';
    const timestampValue = document.createElement('dd');
    timestampValue.textContent = formatLogTimestamp(entry, langTexts, fallbackTexts);
    timestampRow.appendChild(timestampLabel);
    timestampRow.appendChild(timestampValue);
    metaList.appendChild(timestampRow);

    const namespace = typeof entry.namespace === 'string' ? entry.namespace : '';
    if (namespace) {
      const namespaceRow = document.createElement('div');
      namespaceRow.className = 'log-entry-meta-row';
      const namespaceLabel = document.createElement('dt');
      namespaceLabel.textContent = langTexts.loggingEntryNamespaceLabel
        || fallbackTexts.loggingEntryNamespaceLabel
        || 'Namespace';
      const namespaceValue = document.createElement('dd');
      namespaceValue.textContent = namespace;
      namespaceRow.appendChild(namespaceLabel);
      namespaceRow.appendChild(namespaceValue);
      metaList.appendChild(namespaceRow);
    }

    listItem.appendChild(metaList);

    if (entry.meta != null) {
      const metaDetails = createLogDetailsElement(
        langTexts.loggingEntryMetaLabel || fallbackTexts.loggingEntryMetaLabel || 'Meta',
        entry.meta,
      );
      listItem.appendChild(metaDetails);
    }

    if (entry.detail != null) {
      const detailDetails = createLogDetailsElement(
        langTexts.loggingEntryDetailLabel || fallbackTexts.loggingEntryDetailLabel || 'Details',
        entry.detail,
      );
      listItem.appendChild(detailDetails);
    }

    fragment.appendChild(listItem);
  });

  loggingHistoryListEl.textContent = '';
  loggingHistoryListEl.appendChild(fragment);

  if (loggingEmptyEl) {
    if (entries.length === 0) {
      const emptyKey = history.length > 0 ? 'loggingEmptyFiltered' : 'loggingEmptyState';
      const emptyMessage = (langTexts && langTexts[emptyKey])
        || (fallbackTexts && fallbackTexts[emptyKey])
        || (emptyKey === 'loggingEmptyFiltered'
          ? 'No log entries match the current filters.'
          : 'No log entries captured yet.');
      loggingEmptyEl.textContent = emptyMessage;
      loggingEmptyEl.removeAttribute('hidden');
      if (emptyMessage) {
        loggingEmptyEl.setAttribute('data-help', emptyMessage);
      }
    } else {
      loggingEmptyEl.setAttribute('hidden', '');
      loggingEmptyEl.removeAttribute('data-help');
    }
  }

  if (!loggingState.degraded) {
    setLoggingStatusKey('loggingStatusIdle');
  }
}

function scheduleLoggingRender(options = {}) {
  if (loggingState.renderScheduled && !options.immediate) {
    return;
  }
  if (options.immediate) {
    renderLoggingHistory();
    return;
  }
  loggingState.renderScheduled = true;
  const schedule = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : callback => setTimeout(callback, 50);
  schedule(() => {
    renderLoggingHistory();
  });
}

function applyLoggingConfig(config) {
  if (!config || typeof config !== 'object') {
    return;
  }
  loggingState.config = config;
  const { langTexts, fallbackTexts } = getLoggingLangInfo();
  if (loggingHistoryLimitInput && typeof config.historyLimit === 'number') {
    loggingHistoryLimitInput.value = config.historyLimit;
    const template = langTexts.loggingHistoryLimitStatus
      || fallbackTexts.loggingHistoryLimitStatus
      || (loggingHistoryLimitHelpEl ? loggingHistoryLimitHelpEl.textContent : '');
    if (loggingHistoryLimitHelpEl && template) {
      loggingHistoryLimitHelpEl.textContent = template.replace('{count}', String(config.historyLimit));
    }
  }
  const setToggleState = (input, value) => {
    if (!input) return;
    const checked = !!value;
    input.checked = checked;
    input.setAttribute('aria-checked', checked ? 'true' : 'false');
  };
  setToggleState(loggingConsoleOutputInput, config.consoleOutput !== false);
  setToggleState(loggingCaptureConsoleInput, config.captureConsole === true);
  setToggleState(loggingCaptureErrorsInput, config.captureGlobalErrors !== false);
  setToggleState(loggingPersistSessionInput, config.persistSession !== false);
}

function sanitizeLoggingConfigPartial(partial) {
  if (!partial || typeof partial !== 'object') {
    return null;
  }

  const MAX_STRING_LENGTH = 64;
  const summary = {};

  try {
    const keys = Object.keys(partial);
    summary.keys = keys.slice(0, 20);

    summary.values = summary.keys.reduce((accumulator, key) => {
      const value = partial[key];
      if (value == null || typeof value === 'boolean') {
        accumulator[key] = value;
        return accumulator;
      }

      if (typeof value === 'number') {
        accumulator[key] = Number.isFinite(value) ? value : '[number]';
        return accumulator;
      }

      if (typeof value === 'string') {
        const trimmed = value.length > MAX_STRING_LENGTH
          ? `${value.slice(0, MAX_STRING_LENGTH)}…`
          : value;
        accumulator[key] = trimmed;
        if (value.length > MAX_STRING_LENGTH) {
          accumulator[`${key}Length`] = value.length;
        }
        return accumulator;
      }

      if (Array.isArray(value)) {
        accumulator[key] = `[array:${value.length}]`;
        return accumulator;
      }

      if (typeof value === 'object') {
        let objectSize = null;
        try {
          objectSize = Object.keys(value).length;
        } catch (objectSizeError) {
          void objectSizeError;
        }
        accumulator[key] = `[object${objectSize != null ? `:${objectSize}` : ''}]`;
        return accumulator;
      }

      accumulator[key] = `[${typeof value}]`;
      return accumulator;
    }, {});
  } catch (sanitizationError) {
    summary.error = describeError(sanitizationError);
  }

  return summary;
}

function updateLoggingConfig(partial) {
  const logging = resolveLoggingApi();
  if (!logging || typeof logging.setConfig !== 'function' || !partial || typeof partial !== 'object') {
    return;
  }
  try {
    logging.setConfig(partial);
  } catch (error) {
    console.warn('Unable to update logging config', error);
    logSettingsEvent(
      'error',
      'Failed to update diagnostics logging config',
      {
        message: describeError(error),
        partial: sanitizeLoggingConfigPartial(partial),
      },
      { namespace: 'logging-config' },
    );
    setLoggingStatusKey('loggingStatusError');
  }
}

function attachLoggingSubscriptions() {
  const logging = resolveLoggingApi();
  if (!logging) {
    detachLoggingSubscriptions();
    setLoggingControlsDisabled(true);
    if (loggingUnavailableEl) {
      loggingUnavailableEl.removeAttribute('hidden');
    }
    if (loggingState.retryTimer == null && typeof setTimeout === 'function') {
      loggingState.retryTimer = setTimeout(() => {
        loggingState.retryTimer = null;
        attachLoggingSubscriptions();
      }, 2000);
    }
    return;
  }

  if (loggingState.retryTimer != null) {
    clearTimeout(loggingState.retryTimer);
    loggingState.retryTimer = null;
  }

  try {
    const config = typeof logging.getConfig === 'function' ? logging.getConfig() : {};
    applyLoggingConfig(config);
    loggingState.degraded = false;
  } catch (error) {
    loggingState.degraded = true;
    setLoggingStatusKey('loggingStatusError');
    logSettingsEvent(
      'warn',
      'Failed to load diagnostics logging config snapshot',
      { message: describeError(error) },
      { namespace: 'logging-panel' },
    );
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('Unable to read logging config', error);
    }
  }

  detachLoggingSubscriptions();

  if (typeof logging.subscribe === 'function') {
    loggingState.unsubscribeHistory = logging.subscribe(() => {
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      scheduleLoggingRender();
    });
  }
  if (typeof logging.subscribeConfig === 'function') {
    loggingState.unsubscribeConfig = logging.subscribeConfig(snapshot => {
      applyLoggingConfig(snapshot || {});
      if (loggingState.degraded) {
        loggingState.degraded = false;
        setLoggingStatusKey('loggingStatusIdle');
      }
    });
  }

  scheduleLoggingRender({ immediate: true });
}

function initializeLoggingPanel() {
  if (!loggingSectionEl || loggingState.initialized) {
    return;
  }
  loggingState.initialized = true;

  if (loggingLevelFilterEl) {
    const value = typeof loggingLevelFilterEl.value === 'string' && loggingLevelFilterEl.value
      ? loggingLevelFilterEl.value
      : 'all';
    loggingState.levelFilter = value;
    loggingLevelFilterEl.addEventListener('change', () => {
      const selected = typeof loggingLevelFilterEl.value === 'string' ? loggingLevelFilterEl.value : 'all';
      loggingState.levelFilter = selected;
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      scheduleLoggingRender({ immediate: true });
    });
  }

  if (loggingNamespaceFilterEl) {
    loggingNamespaceFilterEl.value = '';
    const debounceDelay = 200;
    loggingNamespaceFilterEl.addEventListener('input', () => {
      if (loggingState.namespaceDebounce) {
        clearTimeout(loggingState.namespaceDebounce);
      }
      loggingState.namespaceDebounce = setTimeout(() => {
        loggingState.namespaceDebounce = null;
        loggingState.namespaceFilter = loggingNamespaceFilterEl.value || '';
        if (!loggingState.degraded) {
          setLoggingStatusKey('loggingStatusUpdating');
        }
        scheduleLoggingRender({ immediate: true });
      }, debounceDelay);
    });
  }

  if (loggingHistoryLimitInput) {
    const applyLimitUpdate = () => {
      const raw = loggingHistoryLimitInput.value;
      const parsed = parseInt(raw, 10);
      if (!Number.isFinite(parsed)) {
        if (loggingState.config && typeof loggingState.config.historyLimit === 'number') {
          loggingHistoryLimitInput.value = loggingState.config.historyLimit;
        }
        return;
      }
      const clamped = Math.min(Math.max(parsed, LOGGING_HISTORY_MIN), LOGGING_HISTORY_MAX);
      if (loggingState.config && loggingState.config.historyLimit === clamped) {
        if (parsed !== clamped) {
          loggingHistoryLimitInput.value = clamped;
        }
        return;
      }
      loggingHistoryLimitInput.value = clamped;
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      updateLoggingConfig({ historyLimit: clamped });
    };
    loggingHistoryLimitInput.addEventListener('change', applyLimitUpdate);
    loggingHistoryLimitInput.addEventListener('blur', applyLimitUpdate);
  }

  const registerToggleHandler = (input, key) => {
    if (!input) return;
    input.addEventListener('change', () => {
      const checked = !!input.checked;
      if (loggingState.config && loggingState.config[key] === checked) {
        input.setAttribute('aria-checked', checked ? 'true' : 'false');
        return;
      }
      input.setAttribute('aria-checked', checked ? 'true' : 'false');
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      updateLoggingConfig({ [key]: checked });
    });
  };

  registerToggleHandler(loggingConsoleOutputInput, 'consoleOutput');
  registerToggleHandler(loggingCaptureConsoleInput, 'captureConsole');
  registerToggleHandler(loggingCaptureErrorsInput, 'captureGlobalErrors');
  registerToggleHandler(loggingPersistSessionInput, 'persistSession');

  if (sessionLoggingExportButton) {
    sessionLoggingExportButton.addEventListener('click', () => {
      exportLoggingHistory();
    });
  }

  if (loggingNamespaceHelpEl) {
    loggingNamespaceHelpEl.setAttribute('aria-live', 'polite');
  }

  attachLoggingSubscriptions();
}

function getStoragePersistenceLangInfo() {
  const fallbackTexts = texts && texts.en ? texts.en : {};
  const lang = typeof currentLang === 'string' && texts && texts[currentLang]
    ? currentLang
    : 'en';
  const langTexts = (texts && texts[lang]) || fallbackTexts;
  return { lang, langTexts, fallbackTexts };
}

function getStorageManagerInstance() {
  if (typeof navigator !== 'undefined' && navigator && typeof navigator.storage === 'object') {
    return navigator.storage;
  }
  return null;
}

function formatStoragePersistenceBytes(bytes, lang) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) {
    return '';
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  let formatted = '';
  if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
    try {
      const formatter = new Intl.NumberFormat(lang, {
        maximumFractionDigits: value >= 100 ? 0 : 1,
      });
      formatted = formatter.format(value);
    } catch (error) {
      console.warn('Unable to format storage size', error);
      formatted = value.toFixed(value >= 100 ? 0 : 1);
    }
  } else {
    formatted = value.toFixed(value >= 100 ? 0 : 1);
  }
  return `${formatted} ${units[index]}`;
}

function renderStoragePersistenceStatus() {
  if (!storagePersistenceStatusEl) return;
  const { lang, langTexts, fallbackTexts } = getStoragePersistenceLangInfo();
  let message = '';
  let state = 'idle';
  if (storagePersistenceState.requestInFlight) {
    state = 'requesting';
    message = langTexts.storagePersistenceStatusRequesting
      || fallbackTexts.storagePersistenceStatusRequesting
      || '';
  } else if (storagePersistenceState.checking) {
    state = 'checking';
    message = langTexts.storagePersistenceStatusChecking
      || fallbackTexts.storagePersistenceStatusChecking
      || '';
  } else if (storagePersistenceState.supported === false) {
    state = 'unsupported';
    message = langTexts.storagePersistenceStatusUnsupported
      || fallbackTexts.storagePersistenceStatusUnsupported
      || '';
  } else if (storagePersistenceState.persisted) {
    state = 'granted';
    message = langTexts.storagePersistenceStatusGranted
      || fallbackTexts.storagePersistenceStatusGranted
      || '';
  } else if (storagePersistenceState.lastError) {
    state = 'error';
    message = langTexts.storagePersistenceStatusError
      || fallbackTexts.storagePersistenceStatusError
      || '';
  } else if (storagePersistenceState.requestAttempted && storagePersistenceState.lastRequestDenied) {
    state = 'denied';
    message = langTexts.storagePersistenceStatusDenied
      || fallbackTexts.storagePersistenceStatusDenied
      || '';
  } else {
    state = 'idle';
    message = langTexts.storagePersistenceStatusIdle
      || fallbackTexts.storagePersistenceStatusIdle
      || '';
  }

  const parts = [message];
  if (state === 'denied' && isSafariPersistenceIncompatibility()) {
    const safariWarning = langTexts.storagePersistenceStatusSafariIncompatible
      || fallbackTexts.storagePersistenceStatusSafariIncompatible
      || '';
    if (safariWarning) {
      parts.push(safariWarning);
    }
  }
  if (typeof storagePersistenceState.usage === 'number') {
    const usedText = formatStoragePersistenceBytes(storagePersistenceState.usage, lang);
    if (usedText) {
      if (typeof storagePersistenceState.quota === 'number' && storagePersistenceState.quota > 0) {
        const quotaText = formatStoragePersistenceBytes(storagePersistenceState.quota, lang);
        const template = langTexts.storagePersistenceUsage
          || fallbackTexts.storagePersistenceUsage
          || '';
        if (template) {
          parts.push(template.replace('{used}', usedText).replace('{quota}', quotaText || ''));
        } else if (quotaText) {
          parts.push(`${usedText} / ${quotaText}`);
        } else {
          parts.push(usedText);
        }
      } else {
        const template = langTexts.storagePersistenceUsageUnknown
          || fallbackTexts.storagePersistenceUsageUnknown
          || '';
        if (template) {
          parts.push(template.replace('{used}', usedText));
        } else {
          parts.push(usedText);
        }
      }
    }
  }

  const combined = parts.filter(Boolean).join(' ').trim();
  const output = combined || message || '';
  storagePersistenceStatusEl.textContent = output;
  storagePersistenceStatusEl.dataset.state = state;
  storagePersistenceStatusEl.setAttribute('data-state', state);
  if (output) {
    storagePersistenceStatusEl.setAttribute('data-help', output);
  } else {
    storagePersistenceStatusEl.removeAttribute('data-help');
  }
  if (storagePersistenceRequestButton) {
    const shouldDisable = !storagePersistenceStatusEl
      || storagePersistenceState.supported === false
      || storagePersistenceState.persisted
      || storagePersistenceState.requestInFlight
      || storagePersistenceState.checking;
    storagePersistenceRequestButton.disabled = shouldDisable;
    storagePersistenceRequestButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
    const requestLabel = langTexts.storagePersistenceRequest
      || fallbackTexts.storagePersistenceRequest
      || storagePersistenceRequestButton.dataset.defaultLabel
      || storagePersistenceRequestButton.textContent
      || '';
    const requestHelp = langTexts.storagePersistenceRequestHelp
      || fallbackTexts.storagePersistenceRequestHelp
      || requestLabel;
    if (requestHelp) {
      storagePersistenceRequestButton.setAttribute('data-help', requestHelp);
      storagePersistenceRequestButton.setAttribute('title', requestHelp);
      storagePersistenceRequestButton.setAttribute('aria-label', requestHelp);
    }
  }

  if (typeof storagePersistenceStatusEl.dispatchEvent === 'function') {
    try {
      let event;
      const detail = { state, message: output, rawMessage: message };
      if (typeof CustomEvent === 'function') {
        event = new CustomEvent('storagepersistencechange', { detail });
      } else if (storagePersistenceStatusEl.ownerDocument && typeof storagePersistenceStatusEl.ownerDocument.createEvent === 'function') {
        event = storagePersistenceStatusEl.ownerDocument.createEvent('CustomEvent');
        event.initCustomEvent('storagepersistencechange', false, false, detail);
      }
      if (event) {
        storagePersistenceStatusEl.dispatchEvent(event);
      }
    } catch (eventError) {
      console.warn('Unable to broadcast storage persistence status change', eventError);
    }
  }
}

function isSafariPersistenceIncompatibility() {
  if (typeof navigator === 'undefined' || !navigator) {
    return false;
  }

  const nav = navigator;
  if (typeof nav !== 'object' || nav === null) {
    return false;
  }

  if (typeof window !== 'undefined' && window && typeof window.safari === 'object' && window.safari) {
    if (typeof window.safari.pushNotification === 'object') {
      return true;
    }
  }

  const vendor = typeof nav.vendor === 'string' ? nav.vendor : '';
  const userAgent = typeof nav.userAgent === 'string' ? nav.userAgent : '';

  if (!vendor && !userAgent) {
    return false;
  }

  const normalisedVendor = vendor.toLowerCase().trim();
  const normalisedUserAgent = userAgent.toLowerCase();

  const exclusionTokens = ['crios', 'fxios', 'edgios', 'edga', 'edge', 'opr/', 'opt/', 'opera', 'chrome', 'chromium'];
  for (let index = 0; index < exclusionTokens.length; index += 1) {
    if (normalisedUserAgent.includes(exclusionTokens[index])) {
      return false;
    }
  }

  const vendorIndicatesSafariFamily = normalisedVendor.includes('apple');
  const userAgentHasSafariToken = normalisedUserAgent.includes('safari');
  const userAgentHasAppleWebkitToken = normalisedUserAgent.includes('applewebkit');
  const userAgentHasVersionToken = normalisedUserAgent.includes('version/');
  const userAgentHasMobileToken = normalisedUserAgent.includes('mobile/');
  const userAgentHasPlatformToken =
    normalisedUserAgent.includes('macintosh')
    || normalisedUserAgent.includes('iphone')
    || normalisedUserAgent.includes('ipad')
    || normalisedUserAgent.includes('ipod')
    || normalisedUserAgent.includes('watch')
    || normalisedUserAgent.includes('apple tv');

  const vendorIsEffectivelyEmpty = normalisedVendor.length === 0;
  const userAgentSignalsSafariFamily =
    userAgentHasSafariToken
    || (userAgentHasAppleWebkitToken && (userAgentHasVersionToken || userAgentHasMobileToken || userAgentHasPlatformToken));
  const fallbackSafariMatch = vendorIsEffectivelyEmpty && userAgentHasAppleWebkitToken && userAgentSignalsSafariFamily;

  if (!vendorIndicatesSafariFamily && !fallbackSafariMatch) {
    return false;
  }

  return vendorIndicatesSafariFamily ? userAgentSignalsSafariFamily : fallbackSafariMatch;
}

async function refreshStoragePersistenceStatus(options = {}) {
  if (!storagePersistenceStatusEl) {
    return;
  }
  const { fromRequest = false } = options || {};
  const checkToken = ++storagePersistenceCheckToken;
  storagePersistenceState.checking = true;
  if (!fromRequest) {
    storagePersistenceState.lastError = null;
  }
  renderStoragePersistenceStatus();

  const storageManager = getStorageManagerInstance();
  if (!storageManager) {
    if (checkToken !== storagePersistenceCheckToken) {
      return;
    }
    storagePersistenceState.supported = false;
    storagePersistenceState.persisted = false;
    storagePersistenceState.usage = null;
    storagePersistenceState.quota = null;
    storagePersistenceState.checking = false;
    if (fromRequest) {
      storagePersistenceState.lastRequestDenied = true;
    }
    renderStoragePersistenceStatus();
    return;
  }

  const supportsPersist = typeof storageManager.persist === 'function';
  storagePersistenceState.supported = supportsPersist;
  let persistedValue = storagePersistenceState.persisted;
  if (typeof storageManager.persisted === 'function') {
    try {
      persistedValue = await storageManager.persisted();
    } catch (error) {
      console.warn('Unable to determine persistent storage state', error);
    }
  }

  let usageValue = storagePersistenceState.usage;
  let quotaValue = storagePersistenceState.quota;
  if (typeof storageManager.estimate === 'function') {
    try {
      const estimate = await storageManager.estimate();
      if (estimate && typeof estimate === 'object') {
        if (typeof estimate.usage === 'number' && Number.isFinite(estimate.usage)) {
          usageValue = estimate.usage;
        }
        if (typeof estimate.quota === 'number' && Number.isFinite(estimate.quota)) {
          quotaValue = estimate.quota;
        }
      }
    } catch (error) {
      console.warn('Unable to estimate storage usage', error);
    }
  }

  if (checkToken !== storagePersistenceCheckToken) {
    return;
  }

  storagePersistenceState.persisted = Boolean(persistedValue);
  storagePersistenceState.usage = typeof usageValue === 'number' && Number.isFinite(usageValue)
    ? usageValue
    : null;
  storagePersistenceState.quota = typeof quotaValue === 'number' && Number.isFinite(quotaValue)
    ? quotaValue
    : null;
  storagePersistenceState.checking = false;
  if (fromRequest) {
    storagePersistenceState.lastRequestDenied = !storagePersistenceState.persisted;
  }
  logStoragePersistenceEstimateUpdate({ fromRequest });
  renderStoragePersistenceStatus();
}

async function handleStoragePersistenceRequest(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  if (!storagePersistenceRequestButton || storagePersistenceState.requestInFlight) {
    return;
  }
  const storageManager = getStorageManagerInstance();
  storagePersistenceState.requestAttempted = true;
  const supportsPersist = Boolean(
    storageManager && typeof storageManager.persist === 'function'
  );
  if (!supportsPersist) {
    storagePersistenceState.supported = supportsPersist;
    storagePersistenceState.lastRequestDenied = true;
    storagePersistenceState.lastError = null;
    renderStoragePersistenceStatus();
    return;
  }

  storagePersistenceState.requestInFlight = true;
  storagePersistenceState.lastError = null;
  renderStoragePersistenceStatus();

  let granted = false;
  let alreadyGranted = false;
  try {
    if (typeof requestPersistentStorage === 'function') {
      const result = await requestPersistentStorage();
      if (result && typeof result.supported === 'boolean') {
        storagePersistenceState.supported = result.supported;
      }
      if (result && typeof result.granted === 'boolean') {
        granted = result.granted;
      }
      if (result && typeof result.alreadyGranted === 'boolean') {
        alreadyGranted = result.alreadyGranted;
      }
      if (result && result.error) {
        storagePersistenceState.lastError = result.error;
        console.warn('Persistent storage request error', result.error);
      }
    } else {
      granted = await storageManager.persist();
    }
  } catch (error) {
    storagePersistenceState.lastError = error;
    console.warn('Persistent storage request failed', error);
  }

  storagePersistenceState.requestInFlight = false;
  storagePersistenceState.lastRequestDenied = !(granted || alreadyGranted);
  if (granted || alreadyGranted) {
    storagePersistenceState.persisted = true;
  }
  renderStoragePersistenceStatus();
  refreshStoragePersistenceStatus({ fromRequest: true }).catch(error => {
    console.warn('Persistent storage status refresh failed', error);
  });
}

if (storagePersistenceRequestButton) {
  storagePersistenceRequestButton.addEventListener('click', handleStoragePersistenceRequest);
}

if (storagePersistenceStatusEl) {
  refreshStoragePersistenceStatus().catch(error => {
    console.warn('Persistent storage status initialization failed', error);
  });
}

initializeLoggingPanel();

if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') {
  window.addEventListener('beforeunload', () => {
    detachLoggingSubscriptions();
    if (loggingState.retryTimer != null) {
      clearTimeout(loggingState.retryTimer);
      loggingState.retryTimer = null;
    }
  });
}

ensureSessionRuntimePlaceholder('renderStoragePersistenceStatus', () => renderStoragePersistenceStatus);
ensureSessionRuntimePlaceholder('refreshStoragePersistenceStatus', () => refreshStoragePersistenceStatus);

if (backupDiffToggleButtonEl) {
  backupDiffToggleButtonEl.addEventListener('click', handleBackupDiffToggle);
}
if (backupDiffCloseButtonEl) {
  backupDiffCloseButtonEl.addEventListener('click', () => collapseBackupDiffSection());
}
if (backupDiffPrimarySelectEl) {
  backupDiffPrimarySelectEl.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffSecondarySelectEl) {
  backupDiffSecondarySelectEl.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffExportButtonEl) {
  backupDiffExportButtonEl.addEventListener('click', handleBackupDiffExport);
  backupDiffExportButtonEl.disabled = true;
}
if (backupDiffSummaryEl) {
  backupDiffSummaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
}
if (backupDiffNotesEl) {
  backupDiffNotesEl.disabled = true;
}
if (backupDiffSectionEl) {
  collapseBackupDiffSection();
}

function handleRestoreSettingsClick() {
  if (restoreSettingsInput) {
    restoreSettingsInput.click();
  }
}

function handleRestoreSettingsInputChange() {
  const file = restoreSettingsInput.files[0];
  if (!file) return;

  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  const restoreFailureMessage =
    langTexts.restoreFailed
    || fallbackTexts.restoreFailed
    || 'Restore failed. Check the backup file and try again.';

  let backupFileName = null;
  try {
    backupFileName = createSettingsBackup(false, new Date());
  } catch (error) {
    console.error('Backup before restore failed', error);
  }

  if (!backupFileName) {
    const failureMessage = langTexts.restoreBackupFailed
      || fallbackTexts.restoreBackupFailed
      || 'Backup failed. Restore cancelled.';
    showNotification('error', failureMessage);
    alert(failureMessage);
    restoreSettingsInput.value = '';
    return;
  }

  showNotification('success', 'Full app backup downloaded');

  const safeStorage = resolveSafeLocalStorage();
  const storedSettingsSnapshot = captureStorageSnapshot(safeStorage);
  const storedSessionSnapshot = captureStorageSnapshot(
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
  );
  const previousSelection = captureSetupSelection();
  let restoreMutated = false;

  const finalizeRestore = () => {
    try {
      restoreSettingsInput.value = '';
    } catch (resetError) {
      void resetError;
    }
  };

  const revertAfterFailure = () => {
    try {
      restoreLocalStorageSnapshot(safeStorage, storedSettingsSnapshot);
    } catch (restoreError) {
      console.warn('Failed to restore localStorage snapshot after restore failure', restoreError);
    }
    try {
      restoreSessionStorageSnapshot(storedSessionSnapshot);
    } catch (sessionError) {
      console.warn('Failed to restore sessionStorage snapshot after restore failure', sessionError);
    }
    try {
      safeLoadStoredLogoPreview();
    } catch (logoError) {
      console.warn('Failed to refresh logo preview after restore failure', logoError);
    }
    try {
      syncAutoGearRulesFromStorage();
    } catch (rulesError) {
      console.warn('Failed to resync automatic gear rules after restore failure', rulesError);
    }
    const restoredPreferenceReader = createSafeStorageReader(
      safeStorage,
      'Failed to read restored storage key',
    );
    const restoredPreferences = applyPreferencesFromStorage(restoredPreferenceReader);
    showAutoBackups = restoredPreferences.showAutoBackups;
    try {
      populateSetupSelect();
    } catch (populateError) {
      console.warn('Failed to repopulate setup selector after restore failure', populateError);
    }
    restoreSetupSelection(previousSelection, showAutoBackups);
    if (settingsShowAutoBackups) {
      try {
        settingsShowAutoBackups.checked = showAutoBackups;
      } catch (checkboxError) {
        console.warn('Failed to restore automatic backup visibility toggle after restore failure', checkboxError);
      }
    }
    if (restoredPreferences.language) {
      try {
        applySetLanguage(restoredPreferences.language);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after restoring language', userButtonError);
          }
        }
      } catch (languageError) {
        console.warn('Failed to restore language after restore failure', languageError);
      }
    }
  };

  const handleRestoreError = (error) => {
    console.warn('Restore failed', error);
    showNotification('error', restoreFailureMessage);
    alert(restoreFailureMessage);
    finalizeRestore();
  };

  const processBackupPayload = (rawPayload) => {
    try {
      const sanitizedPayload = sanitizeBackupPayload(rawPayload);
      if (!sanitizedPayload || !sanitizedPayload.trim()) {
        throw new Error('Backup payload empty');
      }
      const parsed = JSON.parse(sanitizedPayload);
      const {
        settings: restoredSettings,
        sessionStorage: restoredSession,
        data,
        fileVersion,
      } = extractBackupSections(parsed);

      const hasSettings = restoredSettings && Object.keys(restoredSettings).length > 0;
      const hasSessionEntries = restoredSession && Object.keys(restoredSession).length > 0;
      const hasDataEntries = data && Object.keys(data).length > 0;
      if (!hasSettings && !hasSessionEntries && !hasDataEntries) {
        throw new Error('Backup missing recognized sections');
      }
      const normalizedFileVersion = normalizeVersionValue(fileVersion);
      const normalizedAppVersion =
        ACTIVE_APP_VERSION
        || normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null);
      if (normalizedFileVersion !== normalizedAppVersion) {
        const compatibilityMessage = buildRestoreVersionCompatibilityMessage({
          langTexts,
          fallbackTexts,
          fileVersion: normalizedFileVersion,
          targetVersion: normalizedAppVersion,
          data,
          settingsSnapshot: restoredSettings,
          sessionSnapshot: restoredSession,
          backupFileName,
        });
        alert(compatibilityMessage);
      }
      if (restoredSettings && typeof restoredSettings === 'object') {
        if (safeStorage && typeof safeStorage.setItem === 'function') {
          restoreMutated = true;
          Object.entries(restoredSettings).forEach(([k, v]) => {
            if (typeof k !== 'string') return;
            try {
              if (v === null || v === undefined) {
                if (typeof safeStorage.removeItem === 'function') {
                  safeStorage.removeItem(k);
                }
              } else {
                safeStorage.setItem(k, String(v));
              }
            } catch (storageError) {
              console.warn('Failed to restore storage entry', k, storageError);
            }
          });
        }
      }
      if (restoredSession && typeof sessionStorage !== 'undefined') {
        restoreMutated = true;
        Object.entries(restoredSession).forEach(([key, value]) => {
          try {
            sessionStorage.setItem(key, value);
          } catch (sessionError) {
            console.warn('Failed to restore sessionStorage entry', key, sessionError);
          }
        });
      }
      try {
        safeLoadStoredLogoPreview();
      } catch (logoError) {
        console.warn('Failed to refresh logo preview after restore', logoError);
      }
      if (data && typeof importAllData === 'function') {
        restoreMutated = true;
        importAllData(data);
      }
      try {
        syncAutoGearRulesFromStorage(data?.autoGearRules);
      } catch (rulesError) {
        console.warn('Failed to sync automatic gear rules after restore', rulesError);
      }
      const preferenceReader = createSafeStorageReader(
        safeStorage,
        'Failed to read restored storage key',
      );
      const restoredPreferenceState = applyPreferencesFromStorage(preferenceReader);
      showAutoBackups = restoredPreferenceState.showAutoBackups;
      populateSetupSelect();
      restoreSetupSelection(previousSelection, showAutoBackups);
      if (settingsShowAutoBackups) {
        settingsShowAutoBackups.checked = showAutoBackups;
      }
      if (restoredPreferenceState.language) {
        applySetLanguage(restoredPreferenceState.language);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after applying restored preferences', userButtonError);
          }
        }
      }
      if (restoredSession && typeof sessionStorage !== 'undefined') {
        Object.entries(restoredSession).forEach(([key, value]) => {
          try {
            sessionStorage.setItem(key, value);
          } catch (sessionError) {
            console.warn('Failed to refresh sessionStorage entry after restore', key, sessionError);
          }
        });
      }

      let verificationResult = null;
      try {
        verificationResult = verifyRestoredBackupIntegrity(data);
      } catch (verificationError) {
        console.warn('Restore verification execution failed', verificationError);
        verificationResult = null;
      }

      if (
        verificationResult
        && verificationResult.notificationType
        && verificationResult.notificationMessage
      ) {
        showNotification(verificationResult.notificationType, verificationResult.notificationMessage);
      }

      const successMessage = texts[currentLang].restoreSuccess;
      const alertSegments = [successMessage];
      if (verificationResult && verificationResult.alertMessage) {
        alertSegments.push(verificationResult.alertMessage);
      }
      alert(alertSegments.join('\n\n'));
      finalizeRestore();
    } catch (err) {
      if (restoreMutated) {
        try {
          revertAfterFailure();
        } catch (revertError) {
          console.warn('Failed to restore previous state after restore error', revertError);
        }
      }
      handleRestoreError(err);
    }
  };

  const attemptTextFallback = (reason) => {
    if (!file || typeof file.text !== 'function') {
      return false;
    }
    if (reason) {
      console.warn('FileReader unavailable for restore, using file.text()', reason);
    } else {
      console.warn('FileReader unavailable for restore, using file.text()');
    }
    Promise.resolve()
      .then(() => file.text())
      .then(processBackupPayload)
      .catch(handleRestoreError);
    return true;
  };

  let reader = null;
  if (typeof FileReader === 'function') {
    try {
      reader = new FileReader();
    } catch (readerError) {
      console.warn('Failed to create FileReader for restore', readerError);
      reader = null;
    }
  }

  if (reader && typeof reader.readAsText === 'function') {
    reader.onload = event => {
      const result = event && event.target ? event.target.result : '';
      processBackupPayload(result);
    };
    reader.onerror = () => {
      const error = reader.error || new Error('Failed to read backup file');
      console.warn('FileReader failed while reading restore file', error);
      if (!attemptTextFallback(error)) {
        handleRestoreError(error);
      }
    };
    try {
      reader.readAsText(file);
      return;
    } catch (readError) {
      console.warn('Failed to read restore file', readError);
      if (!attemptTextFallback(readError)) {
        handleRestoreError(readError);
      }
      return;
    }
  }

  if (!attemptTextFallback()) {
    handleRestoreError(new Error('No supported file reader available'));
  }
}

if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', handleRestoreSettingsClick);
  restoreSettingsInput.addEventListener('change', handleRestoreSettingsInputChange);
}

function getSessionLanguageTexts() {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  const allTexts =
    (typeof texts !== 'undefined' && texts)
    || (scope && typeof scope.texts === 'object' ? scope.texts : null);

  const resolvedLang =
    typeof currentLang === 'string'
      && allTexts
      && typeof allTexts[currentLang] === 'object'
      ? currentLang
      : 'en';

  const langTexts =
    (allTexts && typeof allTexts[resolvedLang] === 'object' && allTexts[resolvedLang])
    || {};

  const fallbackTexts =
    (allTexts && typeof allTexts.en === 'object' && allTexts.en)
    || {};

  return { langTexts, fallbackTexts };
}

function registerSessionCineUiInternal(cineUi) {
  if (!cineUi || sessionCineUiRegistered) {
    return;
  }

  registerCineUiEntries(
    cineUi.controllers,
    [
      {
        name: 'backupSettings',
        value: {
          execute: createSettingsBackup,
        },
      },
      {
        name: 'restoreSettings',
        value: {
          openPicker: handleRestoreSettingsClick,
          processFile: handleRestoreSettingsInputChange,
        },
      },
    ],
    'cineUi controller registration (session) failed'
  );

  registerCineUiEntries(
    cineUi.interactions,
    [
      { name: 'performBackup', value: createSettingsBackup },
      { name: 'openRestorePicker', value: handleRestoreSettingsClick },
      { name: 'applyRestoreFile', value: handleRestoreSettingsInputChange },
    ],
    'cineUi interaction registration (session) failed'
  );

  registerCineUiEntries(
    cineUi.help,
    [
      {
        name: 'backupSettings',
        value: () => {
          const { langTexts, fallbackTexts } = getSessionLanguageTexts();
          return (
            langTexts.backupSettingsHelp
            || fallbackTexts.backupSettingsHelp
            || 'Download a full JSON backup containing every project, device edit, preference, auto-gear rule and runtime log stored on this device. Keep multiple copies in your offline archive.'
          );
        },
      },
      {
        name: 'restoreSettings',
        value: () => {
          const { langTexts, fallbackTexts } = getSessionLanguageTexts();
          return (
            langTexts.restoreSettingsHelp
            || fallbackTexts.restoreSettingsHelp
            || 'Restore a full JSON backup. The planner captures a fresh safety copy first, then applies the selected file so you can roll back immediately if anything looks wrong.'
          );
        },
      },
    ],
    'cineUi help registration (session) failed'
  );

  sessionCineUiRegistered = areSessionEntriesRegistered(cineUi);
}

function registerSessionCineUi() {
  const cineUi =
    (typeof globalThis !== 'undefined' && globalThis.cineUi)
    || (typeof window !== 'undefined' && window.cineUi)
    || (typeof self !== 'undefined' && self.cineUi)
    || null;

  if (!cineUi) {
    return false;
  }

  registerSessionCineUiInternal(cineUi);
  return true;
}

registerSessionCineUi();

if (restoreRehearsalButtonEl) {
  restoreRehearsalButtonEl.addEventListener('click', () => {
    openRestoreRehearsal();
  });
}

if (restoreRehearsalCloseButtonEl) {
  restoreRehearsalCloseButtonEl.addEventListener('click', () => {
    closeRestoreRehearsal();
  });
}

if (restoreRehearsalBrowseButtonEl && restoreRehearsalInputEl) {
  restoreRehearsalBrowseButtonEl.addEventListener('click', () => {
    restoreRehearsalInputEl.click();
  });
}
if (restoreRehearsalProceedButtonEl) {
  restoreRehearsalProceedButtonEl.addEventListener('click', () => {
    handleRestoreRehearsalProceed();
  });
}
if (restoreRehearsalAbortButtonEl) {
  restoreRehearsalAbortButtonEl.addEventListener('click', () => {
    handleRestoreRehearsalAbort();
  });
}

if (restoreRehearsalInputEl) {
  restoreRehearsalInputEl.addEventListener('change', () => {
    const file = restoreRehearsalInputEl.files && restoreRehearsalInputEl.files[0];
    if (!file) {
      resetRestoreRehearsalState({ keepStatus: true });
      return;
    }
    if (restoreRehearsalFileNameEl) {
      restoreRehearsalFileNameEl.textContent = file.name || restoreRehearsalFileNameEl.textContent;
    }
    runRestoreRehearsal(file);
  });
}

function resetPlannerStateAfterFactoryReset() {
  const suspendable =
    typeof suspendProjectPersistence === 'function'
    && typeof resumeProjectPersistence === 'function';
  if (suspendable) {
    try {
      suspendProjectPersistence();
    } catch (error) {
      console.warn('Failed to suspend project persistence during factory reset cleanup', error);
    }
  }

  try {
    try {
      if (typeof storeLoadedSetupState === 'function') {
        storeLoadedSetupState(null);
      }
    } catch (error) {
      console.warn('Failed to reset loaded setup state during factory reset', error);
    }

    try {
      currentProjectInfo = null;
    } catch (error) {
      console.warn('Failed to clear in-memory project info during factory reset', error);
    }

    try {
      if (typeof populateProjectForm === 'function') {
        populateProjectForm({});
      } else if (projectForm && typeof projectForm.reset === 'function') {
        projectForm.reset();
      }
    } catch (error) {
      console.warn('Failed to reset project form during factory reset', error);
    }

    try {
      displayGearAndRequirements('');
    } catch (error) {
      console.warn('Failed to reset gear displays during factory reset', error);
      if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
      }
      if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
      }
    }

    const primarySelects = [
      cameraSelect,
      monitorSelect,
      videoSelect,
      cageSelect,
      distanceSelect,
      batterySelect,
      hotswapSelect,
      batteryPlateSelect,
    ];
    primarySelects.forEach(select => {
      if (!select) return;
      try {
        const options = Array.from(select.options || []);
        const noneOption = options.find(opt => opt.value === 'None');
        if (noneOption) {
          select.value = 'None';
        } else if (options.length) {
          select.selectedIndex = 0;
        } else {
          select.value = '';
        }
      } catch (selectError) {
        console.warn('Failed to reset selector during factory reset', selectError);
      }
    });

    try {
      resetSelectsToNone(motorSelects);
    } catch (error) {
      console.warn('Failed to reset motor selections during factory reset', error);
    }

    try {
      resetSelectsToNone(controllerSelects);
    } catch (error) {
      console.warn('Failed to reset controller selections during factory reset', error);
    }

    try {
      if (typeof getSliderBowlSelect === 'function') {
        const sliderSelect = getSliderBowlSelect();
        if (sliderSelect) sliderSelect.value = '';
      } else {
        console.warn(
          'Skipping slider bowl selection reset during factory reset because helper is unavailable'
        );
      }
    } catch (error) {
      console.warn('Failed to reset slider bowl selection during factory reset', error);
    }

    try {
      if (typeof getEasyrigSelect === 'function') {
        const easyrigSelect = getEasyrigSelect();
        if (easyrigSelect) easyrigSelect.value = '';
      } else {
        console.warn(
          'Skipping Easyrig selection reset during factory reset because helper is unavailable'
        );
      }
    } catch (error) {
      console.warn('Failed to reset Easyrig selection during factory reset', error);
    }

    try {
      if (setupNameInput) {
        setupNameInput.value = '';
      }
    } catch (error) {
      console.warn('Failed to clear setup name during factory reset', error);
    }

    try {
      if (setupSelect) {
        populateSetupSelect();
        setupSelect.value = '';
      }
    } catch (error) {
      console.warn('Failed to reset setup selector options during factory reset', error);
    }

    try {
      syncAutoGearRulesFromStorage();
    } catch (error) {
      console.warn('Failed to sync automatic gear rules during factory reset', error);
      try {
        clearProjectAutoGearRules();
      } catch (fallbackError) {
        console.warn('Failed to clear project automatic gear rules during factory reset', fallbackError);
      }
    }

    try {
      renderAutoGearRulesList();
    } catch (error) {
      console.warn('Failed to render automatic gear rules during factory reset', error);
    }

    try {
      resetSharedImportStateForFactoryReset();
    } catch (error) {
      console.warn('Failed to reset shared import state during factory reset', error);
    }

    try {
      updateAutoGearCatalogOptions();
    } catch (error) {
      console.warn('Failed to refresh automatic gear catalog during factory reset', error);
    }

    try {
      updateBatteryPlateVisibility();
    } catch (error) {
      console.warn('Failed to reset battery plate visibility during factory reset', error);
    }

    try {
      updateBatteryOptions();
    } catch (error) {
      console.warn('Failed to reset battery options during factory reset', error);
    }

    try {
      safeLoadStoredLogoPreview();
    } catch (error) {
      console.warn('Failed to reset custom logo preview during factory reset', error);
    }

    try {
      if (typeof resetCustomFontsForFactoryReset === 'function') {
        resetCustomFontsForFactoryReset();
      } else {
        console.warn(
          'Skipping custom font reset during factory reset because helper is unavailable'
        );
      }
    } catch (error) {
      console.warn('Failed to reset custom fonts during factory reset', error);
    }

    try {
      updateStorageSummary();
    } catch (error) {
      console.warn('Failed to update storage summary during factory reset', error);
    }

    try {
      ensureGearListActions();
    } catch (error) {
      console.warn('Failed to ensure gear list actions during factory reset', error);
    }

    try {
      checkSetupChanged();
    } catch (error) {
      console.warn('Failed to refresh setup state during factory reset', error);
    }

    try {
      updateCalculations();
    } catch (error) {
      console.warn('Failed to update calculations during factory reset', error);
    }
  } finally {
    if (suspendable) {
      try {
        resumeProjectPersistence();
      } catch (error) {
        console.warn('Failed to resume project persistence after factory reset cleanup', error);
      }
    }
  }
}

// Generic Confirmation Dialog Helper
window.cineShowConfirmDialog = (options) => {
  const {
    title,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    danger = false,
  } = options || {};

  const dialog = document.getElementById('appConfirmDialog');
  const titleEl = document.getElementById('appConfirmTitle');
  const messageEl = document.getElementById('appConfirmMessage');
  const confirmBtn = document.getElementById('appConfirmBtn');
  const cancelBtn = document.getElementById('appConfirmCancelBtn');

  if (!dialog || !confirmBtn || !cancelBtn) {
    console.warn('Confirmation dialog elements missing');
    return;
  }

  if (titleEl) titleEl.textContent = title || 'Confirm';
  if (messageEl) messageEl.textContent = message || 'Are you sure?';

  confirmBtn.textContent = confirmLabel || 'Confirm';
  cancelBtn.textContent = cancelLabel || 'Cancel';

  if (danger) {
    confirmBtn.classList.add('danger');
  } else {
    confirmBtn.classList.remove('danger');
  }

  // Clone buttons to remove old listeners
  const newConfirmBtn = confirmBtn.cloneNode(true);
  const newCancelBtn = cancelBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

  const close = () => {
    if (typeof dialog.close === 'function') {
      dialog.close();
    }
    dialog.setAttribute('hidden', '');
  };

  newConfirmBtn.addEventListener('click', () => {
    close();
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  });

  newCancelBtn.addEventListener('click', () => {
    close();
    if (typeof onCancel === 'function') {
      onCancel();
    }
  });

  dialog.removeAttribute('hidden');
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  }
};

if (factoryResetButton) {
  factoryResetButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const langTexts = texts[currentLang] || texts.en || {};

    window.cineShowConfirmDialog({
      title: langTexts.factoryResetTitle || 'Factory Reset',
      message: langTexts.confirmFactoryReset || 'Create a backup and wipe all planner data? This action cannot be undone.',
      confirmLabel: langTexts.factoryResetConfirm || 'Reset Everything',
      cancelLabel: langTexts.cancel || 'Cancel',
      danger: true,
      onConfirm: async () => {
        if (typeof performSettingsBackup !== 'function') {
          const errorMsg = langTexts.factoryResetError
            || 'Factory reset failed. Please try again.';
          showNotification('error', errorMsg);
          return;
        }

        let backupResult = null;
        try {
          backupResult = performSettingsBackup(false, new Date());
        } catch (error) {
          console.error('Backup before factory reset failed', error);
        }

        if (!backupResult || !backupResult.fileName) {
          const backupFailedMsg = langTexts.factoryResetBackupFailed
            || 'Backup failed. Data was not deleted.';
          showNotification('error', backupFailedMsg);
          return;
        }

        let downloadPermissionState = 'unknown';
        let finalDownloadPermissionState = 'unknown';
        const downloadResult = backupResult.downloadResult;
        const permissionMonitor = downloadResult && downloadResult.permission
          ? downloadResult.permission
          : null;

        if (permissionMonitor && permissionMonitor.initial && typeof permissionMonitor.initial.then === 'function') {
          try {
            downloadPermissionState = await permissionMonitor.initial;
          } catch (permissionError) {
            console.warn('Failed to inspect automatic download permission before factory reset', permissionError);
            downloadPermissionState = 'unknown';
          }
        }

        if (downloadPermissionState === 'denied') {
          const deniedMsg = langTexts.factoryResetDownloadBlocked
            || 'The backup download was blocked. Data was not deleted.';
          showNotification('error', deniedMsg);
          if (typeof alert === 'function') {
            alert(deniedMsg);
          }
          return;
        }

        if (downloadPermissionState === 'prompt') {
          const waitMsg = langTexts.factoryResetAwaitDownload
            || 'Allow downloads to save your backup. The factory reset will continue after you accept the download.';
          showNotification('info', waitMsg);
          if (typeof alert === 'function') {
            alert(waitMsg);
          }
        }

        if (permissionMonitor && permissionMonitor.ready && typeof permissionMonitor.ready.then === 'function') {
          try {
            finalDownloadPermissionState = await permissionMonitor.ready;
          } catch (permissionAwaitError) {
            console.warn('Failed to await automatic download permission before factory reset', permissionAwaitError);
            finalDownloadPermissionState = 'unknown';
          }
        } else {
          finalDownloadPermissionState = downloadPermissionState;
        }

        if (downloadPermissionState === 'prompt') {
          if (typeof finalDownloadPermissionState !== 'string' || !finalDownloadPermissionState) {
            finalDownloadPermissionState = 'unknown';
          }
          if (finalDownloadPermissionState !== 'granted') {
            const deniedMsg = langTexts.factoryResetDownloadBlocked
              || 'The backup download was blocked. Data was not deleted.';
            showNotification('error', deniedMsg);
            if (typeof alert === 'function') {
              alert(deniedMsg);
            }
            return;
          }
        } else if (finalDownloadPermissionState === 'denied') {
          const deniedMsg = langTexts.factoryResetDownloadBlocked
            || 'The backup download was blocked. Data was not deleted.';
          showNotification('error', deniedMsg);
          if (typeof alert === 'function') {
            alert(deniedMsg);
          }
          return;
        }

        if (typeof clearAllData !== 'function') {
          const errorMsg = langTexts.factoryResetError
            || 'Factory reset failed. Please try again.';
          showNotification('error', errorMsg);
          return;
        }

        try {
          factoryResetInProgress = true;
          if (typeof globalThis !== 'undefined') {
            try {
              globalThis.__cameraPowerPlannerFactoryResetting = true;
            } catch (flagError) {
              console.warn('Unable to flag factory reset on global scope', flagError);
            }
          }
          if (projectAutoSaveTimer) {
            clearTimeout(projectAutoSaveTimer);
            projectAutoSaveTimer = null;
          }
          try {
            stopPinkModeIconRotation();
            stopPinkModeAnimatedIcons();
          } catch (animationError) {
            console.warn('Failed to stop pink mode animations during factory reset', animationError);
          }
          await clearAllData();
          try {
            if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
              const eventName = 'cameraPowerPlannerFactoryReset';
              let eventInstance = null;
              if (typeof window.CustomEvent === 'function') {
                eventInstance = new window.CustomEvent(eventName);
              } else if (typeof document !== 'undefined' && typeof document.createEvent === 'function') {
                eventInstance = document.createEvent('Event');
                eventInstance.initEvent(eventName, false, false);
              }
              if (eventInstance) {
                window.dispatchEvent(eventInstance);
              }
            }
          } catch (factoryResetEventError) {
            console.warn('Failed to dispatch factory reset event', factoryResetEventError);
          }
          try {
            resetPlannerStateAfterFactoryReset();
          } catch (resetError) {
            console.warn('Failed to reset planner state after factory reset', resetError);
          }
          try {
            setThemePreference(false, { persist: true });
          } catch (darkError) {
            console.warn('Failed to reset dark mode during factory reset', darkError);
          }
          try {
            highContrastEnabled = false;
            applyHighContrast(false);
            if (settingsHighContrast) {
              settingsHighContrast.checked = false;
            }
          } catch (contrastError) {
            console.warn('Failed to reset high contrast during factory reset', contrastError);
          }
          try {
            pinkModeEnabled = false;
            applyPinkMode(false);
            rememberSettingsPinkModeBaseline();
          } catch (pinkError) {
            console.warn('Failed to reset pink mode during factory reset', pinkError);
          }
          showAutoBackups = false;
          if (settingsShowAutoBackups) {
            settingsShowAutoBackups.checked = false;
          }
          try {
            accentColor = DEFAULT_ACCENT_COLOR;
            prevAccentColor = DEFAULT_ACCENT_COLOR;
            clearAccentColorOverrides();
            applyAccentColor(accentColor);
            if (accentColorInput) {
              accentColorInput.value = DEFAULT_ACCENT_COLOR;
            }
            if (typeof updateAccentColorResetButtonState === 'function') {
              updateAccentColorResetButtonState();
            }
          } catch (accentError) {
            console.warn('Failed to reset accent color during factory reset', accentError);
          }
          try {
            const resetMountVoltagePreferencesFn = getSessionRuntimeFunction('resetMountVoltagePreferences');
            if (resetMountVoltagePreferencesFn) {
              resetMountVoltagePreferencesFn({ persist: true, triggerUpdate: true });
            } else {
              warnMissingMountVoltageHelper('resetMountVoltagePreferences');
            }

            const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
            if (updateMountVoltageInputsFromStateFn) {
              updateMountVoltageInputsFromStateFn();
            } else {
              warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
            }

            rememberSettingsMountVoltagesBaseline();
          } catch (voltageResetError) {
            console.warn('Failed to reset mount voltages during factory reset', voltageResetError);
          }
          try {
            fontSize = '16';
            applyFontSizeSafe(fontSize);
            if (settingsFontSize) {
              settingsFontSize.value = fontSize;
            }
          } catch (fontSizeError) {
            console.warn('Failed to reset font size during factory reset', fontSizeError);
          }
          try {
            fontFamily = "'Ubuntu', sans-serif";
            applyFontFamilySafe(fontFamily);
            if (settingsFontFamily) {
              settingsFontFamily.value = fontFamily;
            }
          } catch (fontFamilyError) {
            console.warn('Failed to reset font family during factory reset', fontFamilyError);
          }
          if (settingsDialog) {
            settingsDialog.setAttribute('hidden', '');
          }
          const successMsg = langTexts.factoryResetSuccess
            || 'Backup downloaded. All planner data cleared. Reloading…';
          showNotification('success', successMsg);
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.location && window.location.reload) {
              window.location.reload();
            }
          }, 600);
        } catch (error) {
          console.error('Factory reset failed', error);
          factoryResetInProgress = false;
          if (typeof globalThis !== 'undefined') {
            try {
              delete globalThis.__cameraPowerPlannerFactoryResetting;
            } catch (cleanupError) {
              console.warn('Unable to clear factory reset flag from global scope', cleanupError);
            }
          }
          const errorMsg = langTexts.factoryResetError
            || 'Factory reset failed. Please try again.';
          showNotification('error', errorMsg);
        }
      }
    });
  });
}

const UI_CACHE_STORAGE_KEYS_FOR_RELOAD = [
  'cameraPowerPlanner_schemaCache',
  'cinePowerPlanner_schemaCache',
];
const UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = [
  '',
  '__backup',
  '__legacyMigrationBackup',
];

const uiCacheFallbackWarningKeys = new Set();

function collectFallbackUiCacheStorages() {
  const storages = new Set();

  const registerStorage = (candidate, label) => {
    if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
      return;
    }
    const hasRemove = typeof candidate.removeItem === 'function';
    const hasDelete = typeof candidate.delete === 'function';
    if (!hasRemove && !hasDelete) {
      return;
    }
    storages.add(candidate);
  };

  const inspectScope = (scope, label) => {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    try {
      registerStorage(scope.SAFE_LOCAL_STORAGE, `${label}.SAFE_LOCAL_STORAGE`);
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has(`${label}.SAFE_LOCAL_STORAGE`)) {
        uiCacheFallbackWarningKeys.add(`${label}.SAFE_LOCAL_STORAGE`);
        console.warn(`Unable to inspect ${label}.SAFE_LOCAL_STORAGE while clearing UI caches`, error);
      }
    }

    try {
      registerStorage(scope.localStorage, `${label}.localStorage`);
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has(`${label}.localStorage`)) {
        uiCacheFallbackWarningKeys.add(`${label}.localStorage`);
        console.warn(`Unable to inspect ${label}.localStorage while clearing UI caches`, error);
      }
    }

    try {
      registerStorage(scope.sessionStorage, `${label}.sessionStorage`);
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has(`${label}.sessionStorage`)) {
        uiCacheFallbackWarningKeys.add(`${label}.sessionStorage`);
        console.warn(`Unable to inspect ${label}.sessionStorage while clearing UI caches`, error);
      }
    }

    let nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has(`${label}.__cineGlobal`)) {
        uiCacheFallbackWarningKeys.add(`${label}.__cineGlobal`);
        console.warn(`Unable to inspect ${label}.__cineGlobal while clearing UI caches`, error);
      }
    }

    if (nested && nested !== scope) {
      inspectScope(nested, `${label}.__cineGlobal`);
    }
  };

  registerStorage(resolveSafeLocalStorage(), 'safeLocalStorage');

  if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
    try {
      registerStorage(SAFE_LOCAL_STORAGE, 'SAFE_LOCAL_STORAGE');
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has('SAFE_LOCAL_STORAGE')) {
        uiCacheFallbackWarningKeys.add('SAFE_LOCAL_STORAGE');
        console.warn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
      }
    }
  }

  const scopeCandidates = [
    { scope: typeof globalThis !== 'undefined' ? globalThis : null, label: 'globalThis' },
    { scope: typeof window !== 'undefined' ? window : null, label: 'window' },
    { scope: typeof self !== 'undefined' ? self : null, label: 'self' },
    { scope: typeof global !== 'undefined' ? global : null, label: 'global' },
  ];

  if (typeof __cineGlobal !== 'undefined') {
    scopeCandidates.push({ scope: __cineGlobal, label: '__cineGlobal' });
  }

  scopeCandidates.forEach(({ scope, label }) => {
    inspectScope(scope, label);
  });

  if (typeof localStorage !== 'undefined') {
    registerStorage(localStorage, 'localStorage');
  }

  if (typeof sessionStorage !== 'undefined') {
    registerStorage(sessionStorage, 'sessionStorage');
  }

  return storages;
}

function clearUiCacheEntriesFallback() {
  const storages = collectFallbackUiCacheStorages();
  if (!storages || !storages.size) {
    return;
  }

  storages.forEach((storage) => {
    UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach((baseKey) => {
      if (typeof baseKey !== 'string' || !baseKey) {
        return;
      }

      UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach((suffix) => {
        const entryKey = suffix ? `${baseKey}${suffix}` : baseKey;
        try {
          if (typeof storage.removeItem === 'function') {
            storage.removeItem(entryKey);
          } else if (typeof storage.delete === 'function') {
            storage.delete(entryKey);
          }
        } catch (error) {
          console.warn('Failed to remove UI cache entry', entryKey, error);
        }
      });
    });
  });
}

const CACHE_KEY_TOKENS_FOR_RELOAD = ['cine-power-planner', 'cinepowerplanner'];

function resolveCineCacheNameForReload() {
  const scopes = [
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const name = scope.CINE_CACHE_NAME;
      if (typeof name === 'string' && name) {
        return name;
      }
    } catch (error) {
      void error;
    }
  }

  return '';
}

function isRelevantCacheKeyForReload(key, explicitName, lowerExplicit) {
  if (typeof key !== 'string' || !key) {
    return false;
  }

  if (explicitName && (key === explicitName || key.toLowerCase() === lowerExplicit)) {
    return true;
  }

  const lowerKey = key.toLowerCase();
  for (let index = 0; index < CACHE_KEY_TOKENS_FOR_RELOAD.length; index += 1) {
    if (lowerKey.includes(CACHE_KEY_TOKENS_FOR_RELOAD[index])) {
      return true;
    }
  }

  return false;
}

function readLocationHrefSafe(locationLike) {
  if (!locationLike || typeof locationLike !== 'object') {
    return '';
  }

  try {
    const href = locationLike.href;
    return typeof href === 'string' ? href : '';
  } catch (error) {
    void error;
    return '';
  }
}

function readLocationPathnameSafe(locationLike) {
  if (!locationLike || typeof locationLike !== 'object') {
    return '';
  }

  try {
    const pathname = locationLike.pathname;
    return typeof pathname === 'string' ? pathname : '';
  } catch (error) {
    void error;
    return '';
  }
}

function readLocationOriginSafe(locationLike) {
  if (!locationLike || typeof locationLike !== 'object') {
    return '';
  }

  try {
    const origin = locationLike.origin;
    if (typeof origin === 'string' && origin) {
      return origin;
    }
  } catch (error) {
    void error;
  }

  const href = readLocationHrefSafe(locationLike);
  if (!href) {
    return '';
  }

  if (typeof URL === 'function') {
    try {
      return new URL(href).origin;
    } catch (originError) {
      void originError;
    }
  }

  const originMatch = href.match(/^([a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+)/);
  return originMatch && originMatch[1] ? originMatch[1] : '';
}

function getForceReloadBaseCandidates(locationLike, originalHref) {
  const candidates = [];
  const unique = new Set();

  const addCandidate = value => {
    if (typeof value !== 'string') {
      return;
    }

    const trimmed = value.trim();
    if (!trimmed || unique.has(trimmed)) {
      return;
    }

    unique.add(trimmed);
    candidates.push(trimmed);
  };

  const safeHref = readLocationHrefSafe(locationLike);
  if (safeHref) {
    addCandidate(safeHref);
  }

  if (typeof originalHref === 'string' && originalHref) {
    addCandidate(originalHref);
  }

  const origin = readLocationOriginSafe(locationLike);
  const pathname = readLocationPathnameSafe(locationLike);

  if (origin) {
    if (pathname) {
      addCandidate(`${origin}${pathname}`);
    }
    addCandidate(`${origin}/`);
  }

  if (typeof window !== 'undefined' && window && window.location) {
    const windowHref = readLocationHrefSafe(window.location);
    if (windowHref) {
      addCandidate(windowHref);
    }
  }

  return candidates;
}

function normaliseForceReloadHref(value, baseHref) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (typeof URL === 'function') {
    try {
      return new URL(trimmed).toString();
    } catch (primaryError) {
      void primaryError;

      if (typeof baseHref === 'string' && baseHref) {
        try {
          return new URL(trimmed, baseHref).toString();
        } catch (secondaryError) {
          void secondaryError;
        }
      }
    }
  }

  return trimmed;
}

function buildForceReloadHref(locationLike, paramName) {
  const param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
  const timestamp = Date.now().toString(36);
  const originalHref = readLocationHrefSafe(locationLike);
  const baseCandidates = getForceReloadBaseCandidates(locationLike, originalHref);

  if (!originalHref) {
    return {
      originalHref,
      nextHref: originalHref,
      param,
      timestamp,
    };
  }

  if (typeof URL === 'function') {
    const urlCandidates = [originalHref, ...baseCandidates];

    for (let index = 0; index < urlCandidates.length; index += 1) {
      const candidate = urlCandidates[index];

      try {
        const url = index === 0 ? new URL(candidate) : new URL(originalHref, candidate);
        url.searchParams.set(param, timestamp);
        return {
          originalHref,
          nextHref: url.toString(),
          param,
          timestamp,
        };
      } catch (candidateError) {
        void candidateError;
      }
    }
  }

  let href = originalHref;
  let hash = '';
  const hashIndex = href.indexOf('#');
  if (hashIndex !== -1) {
    hash = href.slice(hashIndex);
    href = href.slice(0, hashIndex);
  }

  const pattern = new RegExp(`([?&])${param}=[^&]*`);
  const replacement = `$1${param}=${timestamp}`;

  if (pattern.test(href)) {
    href = href.replace(pattern, replacement);
  } else if (href.indexOf('?') !== -1) {
    href += `&${param}=${timestamp}`;
  } else if (href) {
    href += `?${param}=${timestamp}`;
  }

  if (typeof URL === 'function') {
    for (let index = 0; index < baseCandidates.length; index += 1) {
      const candidate = baseCandidates[index];

      try {
        const absolute = new URL(href + hash, candidate).toString();
        return {
          originalHref,
          nextHref: absolute,
          param,
          timestamp,
        };
      } catch (absoluteError) {
        void absoluteError;
      }
    }
  }

  return {
    originalHref,
    nextHref: href ? href + hash : originalHref,
    param,
    timestamp,
  };
}

function waitForReloadNavigation(beforeHref, options = {}) {
  if (typeof window === 'undefined' || !window) {
    return Promise.resolve(false);
  }

  const win = window;
  const startHref = typeof beforeHref === 'string' ? beforeHref : '';
  const timeout =
    options && typeof options.timeout === 'number' && options.timeout > 0
      ? options.timeout
      : 1500;
  const pollInterval =
    options && typeof options.interval === 'number' && options.interval > 0
      ? options.interval
      : 60;
  const schedule =
    typeof win.setTimeout === 'function' ? win.setTimeout.bind(win) : setTimeout;
  const cancel =
    typeof win.clearTimeout === 'function' ? win.clearTimeout.bind(win) : clearTimeout;

  return new Promise(resolve => {
    let resolved = false;
    let pollTimer = null;
    let timeoutTimer = null;

    const cleanup = () => {
      if (pollTimer) {
        try {
          cancel(pollTimer);
        } catch (cancelError) {
          void cancelError;
        }
        pollTimer = null;
      }
      if (timeoutTimer) {
        try {
          cancel(timeoutTimer);
        } catch (timeoutCancelError) {
          void timeoutCancelError;
        }
        timeoutTimer = null;
      }

      if (typeof win.removeEventListener === 'function') {
        try {
          win.removeEventListener('beforeunload', handleUnload, true);
        } catch (removeBeforeUnloadError) {
          void removeBeforeUnloadError;
        }
        try {
          win.removeEventListener('pagehide', handleUnload, true);
        } catch (removePagehideError) {
          void removePagehideError;
        }
        try {
          win.removeEventListener('unload', handleUnload, true);
        } catch (removeUnloadError) {
          void removeUnloadError;
        }
      }
    };

    const finish = value => {
      if (resolved) {
        return;
      }
      resolved = true;
      cleanup();
      resolve(value);
    };

    const handleUnload = () => {
      finish(true);
    };

    const evaluate = () => {
      if (resolved) {
        return;
      }

      try {
        const currentHref = readLocationHrefSafe(win.location);
        if (startHref && currentHref && currentHref !== startHref) {
          finish(true);
          return;
        }
      } catch (readError) {
        void readError;
      }

      pollTimer = schedule(evaluate, pollInterval);
    };

    if (typeof win.addEventListener === 'function') {
      try {
        win.addEventListener('beforeunload', handleUnload, true);
      } catch (beforeUnloadError) {
        void beforeUnloadError;
      }
      try {
        win.addEventListener('pagehide', handleUnload, true);
      } catch (pageHideError) {
        void pageHideError;
      }
      try {
        win.addEventListener('unload', handleUnload, true);
      } catch (unloadError) {
        void unloadError;
      }
    }

    evaluate();
    timeoutTimer = schedule(() => {
      finish(false);
    }, timeout);
  });
}

function scheduleForceReloadNavigationWarning(
  locationLike,
  baseHref,
  description,
  before,
  expected,
  initialAfter,
) {
  let schedule = null;

  try {
    if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
      schedule = window.setTimeout.bind(window);
    }
  } catch (error) {
    void error;
  }

  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      console.warn('Forced reload navigation attempt did not update location', {
        description,
        before,
        after: initialAfter,
        expected,
      });
      return;
    }
  }

  let resolved = false;

  const evaluate = () => {
    const currentRaw = readLocationHrefSafe(locationLike);
    const current = normaliseForceReloadHref(currentRaw, baseHref);

    if (
      (expected && (current === expected || current === `${expected}#`))
      || (before !== current && current && (!expected || current === expected))
    ) {
      resolved = true;
      return { matched: true, value: current };
    }

    return { matched: false, value: current };
  };

  const verifyDelays = [90, 240, 480];

  verifyDelays.forEach((delay, index) => {
    const isFinalCheck = index === verifyDelays.length - 1;

    const runCheck = () => {
      if (resolved) {
        return;
      }

      const result = evaluate();

      if (result.matched) {
        return;
      }

      if (isFinalCheck) {
        resolved = true;
        console.warn('Forced reload navigation attempt did not update location', {
          description,
          before,
          after: result.value,
          expected,
        });
      }
    };

    try {
      schedule(runCheck, delay);
    } catch (scheduleError) {
      void scheduleError;
      if (isFinalCheck) {
        runCheck();
      }
    }
  });
}

function attemptForceReloadNavigation(locationLike, nextHref, baseHref, applyFn, description) {
  if (!locationLike || typeof applyFn !== 'function' || typeof nextHref !== 'string' || !nextHref) {
    return false;
  }

  const beforeRaw = readLocationHrefSafe(locationLike);
  const before = normaliseForceReloadHref(beforeRaw, baseHref);

  try {
    applyFn(nextHref);
  } catch (error) {
    console.warn('Forced reload navigation helper failed', { description, error });
    return false;
  }

  const afterRaw = readLocationHrefSafe(locationLike);
  const after = normaliseForceReloadHref(afterRaw, baseHref);
  const expected = normaliseForceReloadHref(nextHref, baseHref);

  if (
    (expected && (after === expected || after === `${expected}#`))
    || (before !== after && after && (!expected || after === expected))
  ) {
    return true;
  }

  scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, after);

  return false;
}

function attemptForceReloadHistoryFallback(win, locationLike, nextHref, baseHref) {
  if (!win || !locationLike || typeof nextHref !== 'string' || !nextHref) {
    return false;
  }

  let historyLike = null;
  try {
    historyLike = win.history || null;
  } catch (error) {
    console.warn('Forced reload history access failed', error);
    historyLike = null;
  }

  if (!historyLike || typeof historyLike.replaceState !== 'function') {
    return false;
  }

  const beforeRaw = readLocationHrefSafe(locationLike);
  const before = normaliseForceReloadHref(beforeRaw, baseHref);
  const expected = normaliseForceReloadHref(nextHref, baseHref);

  let replaceUrl = nextHref;
  try {
    const reference = beforeRaw || baseHref || undefined;
    const parsed = typeof URL === 'function' ? new URL(nextHref, reference) : null;
    if (parsed) {
      replaceUrl = `${parsed.pathname || ''}${parsed.search || ''}${parsed.hash || ''}` || parsed.toString();
    }
  } catch (error) {
    console.warn('Forced reload history fallback URL parse failed', error);
    replaceUrl = nextHref;
  }

  let stateSnapshot = null;
  let hasStateSnapshot = false;

  try {
    stateSnapshot = historyLike.state;
    hasStateSnapshot = true;
  } catch (stateError) {
    console.warn('Forced reload history state snapshot failed', stateError);
  }

  try {
    historyLike.replaceState(hasStateSnapshot ? stateSnapshot : null, '', replaceUrl);
  } catch (replaceError) {
    console.warn('Forced reload history replaceState failed', replaceError);
    return false;
  }

  const afterRaw = readLocationHrefSafe(locationLike);
  const after = normaliseForceReloadHref(afterRaw, baseHref);

  const updated =
    (expected && (after === expected || after === `${expected}#`))
    || (before !== after && after && (!expected || after === expected));

  if (!updated) {
    scheduleForceReloadNavigationWarning(
      locationLike,
      baseHref,
      'history.replaceState',
      before,
      expected,
      after,
    );
    return false;
  }

  if (typeof locationLike.reload === 'function') {
    try {
      locationLike.reload();
      return true;
    } catch (reloadError) {
      console.warn('Forced reload via history replaceState reload failed', reloadError);
    }
  }

  return true;
}

function scheduleForceReloadFallbacks(win, locationLike, options = {}) {
  if (!win || !locationLike) {
    return;
  }

  let schedule = null;
  try {
    if (typeof win.setTimeout === 'function') {
      schedule = win.setTimeout.bind(win);
    }
  } catch (error) {
    void error;
  }

  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      return;
    }
  }

  const hasReload = options.hasReload === true && typeof locationLike.reload === 'function';
  const baseHref = typeof options.baseHref === 'string' ? options.baseHref : '';
  const nextHref = typeof options.nextHref === 'string' ? options.nextHref : '';
  const originalHref = typeof options.originalHref === 'string' ? options.originalHref : '';

  const fallbackHref = nextHref || baseHref || originalHref || '';
  const hashBase = fallbackHref ? fallbackHref.split('#')[0] : baseHref || originalHref || '';
  const fallbackToken =
    typeof options.timestamp === 'string' && options.timestamp
      ? options.timestamp
      : Date.now().toString(36);
  const hashFallback = hashBase ? `${hashBase}#forceReload-${fallbackToken}` : '';

  const steps = [];

  let nextDelay = 120;
  const delayIncrement = 120;

  const queueStep = run => {
    steps.push({
      delay: nextDelay,
      run,
    });
    nextDelay += delayIncrement;
  };

  if (fallbackHref) {
    if (typeof locationLike.assign === 'function') {
      queueStep(() => {
        try {
          locationLike.assign(fallbackHref);
        } catch (error) {
          console.warn('Forced reload fallback via location.assign failed', error);
        }
      });
    }

    if (typeof locationLike.replace === 'function') {
      queueStep(() => {
        try {
          locationLike.replace(fallbackHref);
        } catch (error) {
          console.warn('Forced reload fallback via location.replace failed', error);
        }
      });
    }

    queueStep(() => {
      try {
        locationLike.href = fallbackHref;
      } catch (error) {
        console.warn('Forced reload fallback via href assignment failed', error);
      }
    });
  }

  if (hashFallback && hashFallback !== fallbackHref) {
    queueStep(() => {
      try {
        locationLike.href = hashFallback;
      } catch (error) {
        console.warn('Forced reload fallback via hash injection failed', error);
      }
    });
  }

  if (hasReload) {
    const reloadDelay = steps.length ? Math.max(nextDelay, 280) : 280;
    steps.push({
      delay: reloadDelay,
      run() {
        try {
          locationLike.reload();
        } catch (error) {
          console.warn('Timed force reload fallback failed', error);
        }
      },
    });
  }

  if (!steps.length) {
    return;
  }

  steps.forEach(step => {
    try {
      schedule(step.run, step.delay);
    } catch (scheduleError) {
      console.warn('Unable to schedule forced reload fallback', scheduleError);
    }
  });
}

function prepareForceReloadContext(win) {
  if (!win || !win.location) {
    return null;
  }

  const { location } = win;
  const hasReplace = typeof location.replace === 'function';
  const hasAssign = typeof location.assign === 'function';
  const hasReload = typeof location.reload === 'function';
  const forceReloadUrl = buildForceReloadHref(location, 'forceReload');
  const { originalHref, nextHref, timestamp } = forceReloadUrl;
  const baseHref = normaliseForceReloadHref(originalHref, originalHref) || originalHref;

  return {
    win,
    location,
    hasReplace,
    hasAssign,
    hasReload,
    originalHref,
    nextHref,
    timestamp,
    baseHref,
  };
}

function executeForceReloadContext(context) {
  if (!context || !context.location) {
    return false;
  }

  const {
    win,
    location,
    hasReplace,
    hasAssign,
    hasReload,
    originalHref,
    nextHref,
    timestamp,
    baseHref,
  } = context;

  let navigationTriggered = false;

  if (hasReplace && nextHref) {
    navigationTriggered = attemptForceReloadNavigation(
      location,
      nextHref,
      baseHref,
      url => location.replace(url),
      'location.replace',
    );
  }

  if (!navigationTriggered && hasAssign && nextHref) {
    navigationTriggered = attemptForceReloadNavigation(
      location,
      nextHref,
      baseHref,
      url => location.assign(url),
      'location.assign',
    );
  }

  if (!navigationTriggered && nextHref && nextHref !== originalHref) {
    navigationTriggered = attemptForceReloadNavigation(
      location,
      nextHref,
      baseHref,
      url => {
        location.href = url;
      },
      'location.href assignment',
    );
  }

  if (!navigationTriggered && win && nextHref) {
    navigationTriggered = attemptForceReloadHistoryFallback(win, location, nextHref, baseHref);
  }

  const canOnlyReload = !nextHref || nextHref === originalHref;

  if (!navigationTriggered && canOnlyReload && hasReload) {
    try {
      location.reload();
      navigationTriggered = true;
    } catch (reloadError) {
      console.warn('Forced reload via location.reload failed', reloadError);
    }
  }

  if (!navigationTriggered) {
    scheduleForceReloadFallbacks(win, location, {
      originalHref,
      baseHref,
      nextHref,
      hasReload,
      timestamp,
    });
  }

  return navigationTriggered;
}

function tryForceReload(win) {
  const context = prepareForceReloadContext(win);
  if (!context) {
    return false;
  }
  return executeForceReloadContext(context);
}

function createReloadFallback(win, delayMs = 4500) {
  if (!win) {
    return null;
  }

  let schedule = null;
  let cancel = null;

  try {
    if (typeof win.setTimeout === 'function') {
      schedule = win.setTimeout.bind(win);
    }
  } catch (scheduleError) {
    void scheduleError;
  }

  try {
    if (typeof win.clearTimeout === 'function') {
      cancel = win.clearTimeout.bind(win);
    }
  } catch (cancelError) {
    void cancelError;
  }

  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      return {
        triggerNow() {
          tryForceReload(win);
        },
      };
    }
  }

  if (!cancel) {
    cancel = typeof clearTimeout === 'function' ? clearTimeout : null;
  }

  let executed = false;
  let timerId = null;

  const run = () => {
    if (executed) {
      return;
    }
    executed = true;
    timerId = null;

    try {
      if (!tryForceReload(win) && win && win.location && typeof win.location.reload === 'function') {
        win.location.reload();
      }
    } catch (error) {
      console.warn('Force reload fallback execution failed', error);
      try {
        if (win && win.location && typeof win.location.reload === 'function') {
          win.location.reload();
        }
      } catch (reloadError) {
        console.warn('Ultimate force reload fallback failed', reloadError);
      }
    }
  };

  try {
    timerId = schedule(run, delayMs);
  } catch (scheduleError) {
    console.warn('Unable to schedule reload fallback timer', scheduleError);
    run();
  }

  return {
    triggerNow() {
      if (executed) {
        return;
      }

      if (timerId != null && typeof cancel === 'function') {
        try {
          cancel(timerId);
        } catch (cancelError) {
          void cancelError;
        }
      }

      run();
    },
  };
}

// Slower machines routinely need ~4s to finish the offline module's reload gate.
// Give it extra headroom so we do not fall back to the manual cache purge unless
// the service worker truly stalled.
const OFFLINE_RELOAD_TIMEOUT_MS = 5000;
const FORCE_RELOAD_CLEANUP_TIMEOUT_MS = 700;

function awaitPromiseWithSoftTimeout(promise, timeoutMs, onTimeout, onLateRejection) {
  if (!promise || typeof promise.then !== 'function') {
    return Promise.resolve({ timedOut: false, result: promise });
  }

  const ms = typeof timeoutMs === 'number' && timeoutMs >= 0 ? timeoutMs : null;
  const schedule = typeof setTimeout === 'function' ? setTimeout : null;
  const cancel = typeof clearTimeout === 'function' ? clearTimeout : null;

  if (ms === null || !schedule) {
    return promise.then(result => ({ timedOut: false, result }));
  }

  let finished = false;
  let timerId = null;

  return new Promise((resolve, reject) => {
    promise.then(
      value => {
        if (finished) {
          return value;
        }

        finished = true;
        if (timerId != null && cancel) {
          try {
            cancel(timerId);
          } catch (cancelError) {
            void cancelError;
          }
        }

        resolve({ timedOut: false, result: value });
        return value;
      },
      error => {
        if (finished) {
          if (typeof onLateRejection === 'function') {
            try {
              onLateRejection(error);
            } catch (lateError) {
              void lateError;
            }
          }
          return null;
        }

        finished = true;
        if (timerId != null && cancel) {
          try {
            cancel(timerId);
          } catch (cancelError) {
            void cancelError;
          }
        }

        reject(error);
        return null;
      },
    );

    timerId = schedule(() => {
      if (finished) {
        return;
      }

      finished = true;

      if (typeof onTimeout === 'function') {
        try {
          onTimeout();
        } catch (timeoutError) {
          void timeoutError;
        }
      }

      resolve({ timedOut: true, result: undefined });
    }, ms);
  });
}

function observeServiceWorkerControllerChangeForSession(navigatorLike) {
  const nav = navigatorLike && typeof navigatorLike === 'object' ? navigatorLike : null;
  if (!nav || !nav.serviceWorker) {
    return null;
  }

  const { serviceWorker } = nav;
  if (!serviceWorker) {
    return null;
  }

  let resolved = false;
  let detach = null;
  let resolver = null;
  let attached = false;

  const finalize = (value) => {
    if (resolved) {
      return;
    }

    resolved = true;

    const currentResolver = resolver;
    resolver = null;

    if (typeof detach === 'function') {
      try {
        detach();
      } catch (error) {
        void error;
      }
      detach = null;
    }

    if (typeof currentResolver === 'function') {
      try {
        currentResolver(value);
      } catch (resolveError) {
        void resolveError;
      }
    }
  };

  const promise = new Promise((resolve) => {
    resolver = resolve;

    if (serviceWorker.controller) {
      finalize(true);
      return;
    }

    const handler = () => {
      finalize(true);
    };

    try {
      if (typeof serviceWorker.addEventListener === 'function') {
        serviceWorker.addEventListener('controllerchange', handler);
        detach = () => {
          try {
            serviceWorker.removeEventListener('controllerchange', handler);
          } catch (removeError) {
            void removeError;
          }
        };
        attached = true;
      } else if ('oncontrollerchange' in serviceWorker) {
        const previous = serviceWorker.oncontrollerchange;
        serviceWorker.oncontrollerchange = function controllerchangeProxy(event) {
          if (typeof previous === 'function') {
            try {
              previous.call(this, event);
            } catch (previousError) {
              console.warn('Existing service worker controllerchange handler failed', previousError);
            }
          }
          handler(event);
        };
        detach = () => {
          try {
            serviceWorker.oncontrollerchange = previous;
          } catch (restoreError) {
            void restoreError;
          }
        };
        attached = true;
      } else {
        finalize(false);
      }
    } catch (error) {
      console.warn('Failed to observe service worker controllerchange', error);
      finalize(false);
    }
  });

  if (!attached && !serviceWorker.controller) {
    finalize(false);
    return null;
  }

  return {
    promise,
    cancel() {
      finalize(false);
    },
  };
}

async function collectServiceWorkerRegistrationsForReload(serviceWorker) {
  if (!serviceWorker) {
    return [];
  }

  const registrations = [];
  const pushRegistration = (registration) => {
    if (registration) {
      registrations.push(registration);
    }
  };

  try {
    if (typeof serviceWorker.getRegistrations === 'function') {
      const regs = await serviceWorker.getRegistrations();
      if (Array.isArray(regs)) {
        regs.forEach(pushRegistration);
      }
    } else if (typeof serviceWorker.getRegistration === 'function') {
      const reg = await serviceWorker.getRegistration();
      pushRegistration(reg);
    } else if (serviceWorker.ready && typeof serviceWorker.ready.then === 'function') {
      try {
        const readyReg = await serviceWorker.ready;
        pushRegistration(readyReg);
      } catch (readyError) {
        console.warn('Failed to await active service worker', readyError);
      }
    }
  } catch (queryError) {
    console.warn('Failed to query service worker registrations', queryError);
  }

  return registrations;
}

async function clearCachesAndReload() {
  const sessionNavigator = typeof navigator !== 'undefined' ? navigator : undefined;

  if (isNavigatorExplicitlyOffline(sessionNavigator)) {
    announceForceReloadOfflineNotice();
    return { blocked: true, reason: 'offline' };
  }

  try {
    flushProjectAutoSaveOnExit({ reason: 'before-manual-reload' });
  } catch (flushError) {
    console.warn('Failed to flush auto save before manual reload', flushError);
  }

  const reloadFallback =
    typeof window !== 'undefined' && window ? createReloadFallback(window) : null;

  const offlineModule =
    (typeof globalThis !== 'undefined' && globalThis && globalThis.cineOffline)
    || (typeof window !== 'undefined' && window && window.cineOffline)
    || null;

  const beforeReloadHref =
    typeof window !== 'undefined' && window && window.location
      ? readLocationHrefSafe(window.location)
      : '';

  const sessionCaches = typeof caches !== 'undefined' ? caches : undefined;
  const serviceWorkerLike = sessionNavigator && sessionNavigator.serviceWorker
    ? sessionNavigator.serviceWorker
    : null;
  const serviceWorkerRegistrationsPromise = serviceWorkerLike
    ? collectServiceWorkerRegistrationsForReload(serviceWorkerLike)
    : Promise.resolve([]);

  if (offlineModule && typeof offlineModule.reloadApp === 'function') {
    try {
      const reloadAttempt = offlineModule.reloadApp({
        window,
        navigator: sessionNavigator,
        caches: sessionCaches,
        onOfflineReloadBlocked: announceForceReloadOfflineNotice,
      });

      const { timedOut, result } = await awaitPromiseWithSoftTimeout(
        reloadAttempt,
        OFFLINE_RELOAD_TIMEOUT_MS,
        () => {
          console.warn(
            'Offline module reload timed out; continuing with manual fallback after soft timeout.',
            { timeoutMs: OFFLINE_RELOAD_TIMEOUT_MS },
          );
        },
        (lateError) => {
          console.warn('Offline module reload promise rejected after timeout', lateError);
        },
      );

      if (!timedOut) {
        const reloadHandled =
          result === true ||
          (result &&
            typeof result === 'object' &&
            (result.reloadTriggered === true || result.navigationTriggered === true));

        if (reloadHandled) {
          const navigationObserved = await waitForReloadNavigation(beforeReloadHref).catch(() => false);
          if (navigationObserved) {
            return;
          }
        }
      }
    } catch (offlineReloadError) {
      console.warn('Offline module reload failed, falling back to manual refresh', offlineReloadError);
    }
  }

  let uiCacheCleared = false;
  try {
    if (typeof clearUiCacheStorageEntries === 'function') {
      clearUiCacheStorageEntries();
      uiCacheCleared = true;
    }
  } catch (uiCacheError) {
    console.warn('Failed to clear UI caches via storage helper', uiCacheError);
  }

  if (!uiCacheCleared) {
    try {
      clearUiCacheEntriesFallback();
      uiCacheCleared = true;
    } catch (fallbackError) {
      console.warn('Fallback UI cache clear failed', fallbackError);
    }
  }

  let serviceWorkerCleanupPromise = Promise.resolve(false);
  let cacheCleanupPromise = Promise.resolve(false);

  if (serviceWorkerLike) {
    serviceWorkerCleanupPromise = (async () => {
      try {
        const registrations = await serviceWorkerRegistrationsPromise;
        if (!registrations.length) {
          return false;
        }

        await Promise.all(registrations.map(reg => {
          if (!reg || typeof reg.unregister !== 'function') {
            return Promise.resolve(false);
          }
          return reg.unregister().catch(unregisterError => {
            console.warn('Service worker unregister failed', unregisterError);
            return false;
          });
        }));

        return true;
      } catch (cleanupError) {
        console.warn('Service worker cleanup failed', cleanupError);
        return false;
      }
    })();
  }

  if (sessionCaches && typeof sessionCaches.keys === 'function') {
    cacheCleanupPromise = (async () => {
      try {
        const keys = await sessionCaches.keys();
        if (!Array.isArray(keys) || !keys.length) {
          return false;
        }

        const explicitName = resolveCineCacheNameForReload();
        const lowerExplicit = explicitName ? explicitName.toLowerCase() : null;
        const relevantKeys = keys.filter(key =>
          isRelevantCacheKeyForReload(key, explicitName, lowerExplicit)
        );

        if (!relevantKeys.length) {
          return false;
        }

        let removedAny = false;

        await Promise.all(relevantKeys.map(key => {
          if (!key || typeof sessionCaches.delete !== 'function') {
            return Promise.resolve(false);
          }

          return sessionCaches.delete(key)
            .then(result => {
              removedAny = removedAny || !!result;
              return result;
            })
            .catch(cacheError => {
              console.warn('Failed to delete cache', key, cacheError);
              return false;
            });
        }));

        return removedAny;
      } catch (cacheError) {
        console.warn('Cache clear failed', cacheError);
        return false;
      }
    })();
  }

  let controllerChangeWatcher = null;
  let serviceWorkerGatePromise = serviceWorkerCleanupPromise;

  if (sessionNavigator && sessionNavigator.serviceWorker) {
    controllerChangeWatcher = observeServiceWorkerControllerChangeForSession(sessionNavigator);
    if (controllerChangeWatcher && controllerChangeWatcher.promise && serviceWorkerCleanupPromise && typeof serviceWorkerCleanupPromise.then === 'function') {
      serviceWorkerGatePromise = Promise.race([
        serviceWorkerCleanupPromise,
        controllerChangeWatcher.promise,
      ]);
    }
  }

  try {
    await awaitPromiseWithSoftTimeout(
      serviceWorkerGatePromise,
      FORCE_RELOAD_CLEANUP_TIMEOUT_MS,
      () => {
        console.warn('Service worker cleanup timed out before reload; continuing anyway.', {
          timeoutMs: FORCE_RELOAD_CLEANUP_TIMEOUT_MS,
        });
      },
      (lateError) => {
        console.warn('Service worker cleanup failed after reload triggered', lateError);
      },
    );
  } catch (cleanupError) {
    console.warn('Service worker cleanup failed', cleanupError);
  } finally {
    if (controllerChangeWatcher && typeof controllerChangeWatcher.cancel === 'function') {
      try {
        controllerChangeWatcher.cancel();
      } catch (controllerCleanupError) {
        void controllerCleanupError;
      }
    }
  }

  try {
    if (reloadFallback && typeof reloadFallback.triggerNow === 'function') {
      reloadFallback.triggerNow();
    } else {
      const win = typeof window !== 'undefined' ? window : null;
      if (!tryForceReload(win) && win && win.location && typeof win.location.reload === 'function') {
        win.location.reload();
      }
    }
  } catch (reloadError) {
    console.warn('Forced reload failed', reloadError);
    if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
      window.location.reload();
    }
  }

  try {
    await cacheCleanupPromise;
  } catch (cacheError) {
    console.warn('Cache clear failed', cacheError);
  }
}

const sessionReloadButton = typeof document !== 'undefined' ? document.getElementById('reloadButton') : null;
if (sessionReloadButton) {
  sessionReloadButton.addEventListener("click", clearCachesAndReload);
}

function exportDiagramSvg() {
  if (!setupDiagramContainer) return '';
  const svgEl = setupDiagramContainer.querySelector('svg');
  if (!svgEl) return '';

  const clone = svgEl.cloneNode(true);
  const labels = svgEl.querySelectorAll('.edge-label');
  const cloneLabels = clone.querySelectorAll('.edge-label');
  labels.forEach((lbl, idx) => {
    if (cloneLabels[idx]) {
      // innerHTML isn't consistently supported for SVG <text> elements in all browsers,
      // which could result in empty connection labels in the exported SVG. Using
      // textContent ensures the label text is preserved across environments.
      cloneLabels[idx].textContent = lbl.textContent;
    }
  });
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  // Always export using the bright theme regardless of the current mode
  let getDiagramCssFn = typeof getDiagramCss === 'function' ? getDiagramCss : null;
  if (!getDiagramCssFn && typeof cineFeaturesConnectionDiagram === 'object' && typeof cineFeaturesConnectionDiagram.getDiagramCss === 'function') {
    getDiagramCssFn = cineFeaturesConnectionDiagram.getDiagramCss;
  }
  style.textContent = getDiagramCssFn ? getDiagramCssFn(false) : '';
  clone.insertBefore(style, clone.firstChild);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(clone);
}

function copyTextToClipboardBestEffort(text) {
  if (typeof text !== 'string' || !text) {
    return;
  }

  if (
    typeof navigator !== 'undefined' &&
    navigator &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    navigator.clipboard.writeText(text).catch(() => { });
    return;
  }

  if (
    typeof document === 'undefined' ||
    !document ||
    !document.body ||
    typeof document.createElement !== 'function'
  ) {
    return;
  }

  let textarea = null;
  const previousActiveElement = document.activeElement;

  try {
    textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    try {
      textarea.focus();
    } catch {
      // Ignore focus errors on platforms that disallow programmatic focus.
    }

    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch {
      // Ignore selection errors; execCommand may still succeed.
    }

    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch {
        // Ignore execCommand failures to avoid breaking the export flow.
      }
    }
  } catch {
    // Ignore clipboard fallback errors.
  } finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }

    if (
      previousActiveElement &&
      typeof previousActiveElement.focus === 'function'
    ) {
      try {
        previousActiveElement.focus();
      } catch {
        // Ignore focus restoration errors.
      }
    }
  }
}

if (downloadDiagramButton) {
  downloadDiagramButton.addEventListener('click', (e) => {
    const source = exportDiagramSvg();
    if (!source) return;

    copyTextToClipboardBestEffort(source);
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const namePart = (safeGetCurrentProjectName('setup') || 'setup')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '');
    const baseName = `${datePart}_${namePart}_diagram`;

    const saveSvg = () => {
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    };

    if (e.shiftKey) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${baseName}.jpg`;
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    } else {
      saveSvg();
    }
  });
}

if (gridSnapToggleButton) {
  gridSnapToggleButton.addEventListener('click', () => {
    const nextState = !readGridSnapState();
    const finalState = writeGridSnapState(nextState);
    applyGridSnapUiState(finalState);
  });
}

if (helpButton && helpDialog) {
  // --- Help dialog and hover help -----------------------------------------
  // Provides a modal help dialog with live filtering and a "hover for help"
  // mode that exposes descriptions for interface controls. The following
  // functions manage searching, opening/closing the dialog and tooltip-based
  // hover help.
  const helpContent = helpDialog.querySelector('.help-content');
  const helpQuickLinkItems = new Map();
  const helpSectionHighlightTimers = new Map();
  const appTargetHighlightTimers = new Map();
  const featureSearchHighlightTimers = new Map();

  const ensureHelpLinksUseButtonStyle = () => {
    if (!helpContent) return;
    const helpLinks = helpContent.querySelectorAll('a.help-link');
    helpLinks.forEach(link => {
      link.classList.add('button-link');
    });
  };

  ensureHelpLinksUseButtonStyle();

  const highlightAppTarget = element => {
    if (!element) return;
    const target = element;
    const existing = appTargetHighlightTimers.get(target);
    if (existing) {
      clearTimeout(existing);
    }
    target.classList.add('help-target-focus');
    const timeout = setTimeout(() => {
      target.classList.remove('help-target-focus');
      appTargetHighlightTimers.delete(target);
    }, 2000);
    appTargetHighlightTimers.set(target, timeout);
  };

  const highlightFeatureSearchTargets = targets => {
    if (!Array.isArray(targets) || targets.length === 0) return;
    const seen = new Set();
    targets.forEach(target => {
      if (!target || typeof target.classList?.add !== 'function') return;
      if (seen.has(target)) return;
      seen.add(target);
      const existing = featureSearchHighlightTimers.get(target);
      if (existing) {
        clearTimeout(existing);
      }
      target.classList.add('feature-search-focus');
      const timeout = setTimeout(() => {
        target.classList.remove('feature-search-focus');
        featureSearchHighlightTimers.delete(target);
      }, 2500);
      featureSearchHighlightTimers.set(target, timeout);
    });
  };

  const findAssociatedLabelElements = element => {
    if (!element) return [];
    const labels = new Set();
    const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (element.labels && typeof element.labels === 'object') {
      Array.from(element.labels).forEach(label => {
        if (label) labels.add(label);
      });
    }
    if (typeof element.closest === 'function') {
      const wrappingLabel = element.closest('label');
      if (wrappingLabel) labels.add(wrappingLabel);
    }
    if (doc && typeof element.getAttribute === 'function') {
      const collectIdRefs = attrValue => {
        if (!attrValue) return;
        attrValue
          .split(/\s+/)
          .filter(Boolean)
          .forEach(id => {
            const ref = doc.getElementById(id);
            if (ref) labels.add(ref);
          });
      };
      collectIdRefs(element.getAttribute('aria-labelledby'));
      collectIdRefs(element.getAttribute('aria-describedby'));
    }
    return Array.from(labels);
  };

  const ensureFeatureSearchVisibility = element => {
    if (!element || typeof element !== 'object' || typeof element.nodeType !== 'number') {
      return;
    }

    if (
      backupDiffSectionEl &&
      backupDiffSectionEl.contains(element) &&
      backupDiffSectionEl.hasAttribute('hidden')
    ) {
      if (typeof showBackupDiffSection === 'function') {
        try {
          showBackupDiffSection();
        } catch (error) {
          console.warn('Unable to open backup diff section for feature search target', error);
          backupDiffSectionEl.removeAttribute('hidden');
        }
      } else {
        backupDiffSectionEl.removeAttribute('hidden');
      }
    }

    if (
      restoreRehearsalSectionEl &&
      restoreRehearsalSectionEl.contains(element) &&
      restoreRehearsalSectionEl.hasAttribute('hidden')
    ) {
      if (typeof openRestoreRehearsal === 'function') {
        try {
          openRestoreRehearsal();
        } catch (error) {
          console.warn('Unable to open restore rehearsal section for feature search target', error);
          restoreRehearsalSectionEl.removeAttribute('hidden');
        }
      } else {
        restoreRehearsalSectionEl.removeAttribute('hidden');
      }
    }
  };

  const focusFeatureElement = element => {
    if (!element) return;

    ensureFeatureSearchVisibility(element);

    const settingsSection = element.closest('#settingsDialog');
    const settingsPanel = element.closest('.settings-panel');
    if (settingsPanel) {
      const labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
      const tabIds = labelledBy
        .split(/\s+/)
        .map(id => id.trim())
        .filter(Boolean);
      const matchingTabId = tabIds.find(id => document.getElementById(id));
      if (matchingTabId) {
        activateSettingsTab(matchingTabId);
      }
    }
    if (settingsSection && !isDialogOpen(settingsDialog)) {
      const context = {
        reason: 'feature-search',
        targetId: typeof element.id === 'string' && element.id ? element.id : null,
      };
      if (typeof element.getAttribute === 'function') {
        const label =
          element.getAttribute('aria-label') ||
          element.getAttribute('data-help') ||
          element.getAttribute('data-feature-key');
        if (label) {
          context.targetLabel = label;
        }
        const role = element.getAttribute('role');
        if (role) {
          context.targetRole = role;
        }
      }
      requestSettingsOpen(context);
    }

    const dialog = element.closest('dialog');
    if (dialog && !isDialogOpen(dialog)) {
      if (dialog.id === 'projectDialog') {
        generateGearListBtn?.click?.();
      } else if (dialog.id === 'feedbackDialog') {
        runtimeFeedbackBtn?.click?.();
      } else if (dialog.id === 'overviewDialog') {
        generateOverviewBtn?.click?.();
      } else {
        openDialog(dialog);
      }
    }

    const deviceManager = element.closest('#device-manager');
    if (deviceManager) {
      showDeviceManagerSection();
    }

    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const hadTabIndex = element.hasAttribute('tabindex');
    let addedTabIndex = false;
    if (!hadTabIndex) {
      const tabIndex = element.tabIndex;
      if (typeof tabIndex === 'number' && tabIndex < 0) {
        element.setAttribute('tabindex', '-1');
        addedTabIndex = true;
      }
    }

    if (typeof element.focus === 'function') {
      try {
        element.focus({ preventScroll: true });
      } catch {
        element.focus();
      }
    }

    if (addedTabIndex) {
      element.addEventListener(
        'blur',
        () => element.removeAttribute('tabindex'),
        { once: true }
      );
    }
  };

  const focusHelpSectionHeading = section => {
    if (!section) return;
    const heading =
      section.querySelector('h3, summary, h4, h5, h6') ||
      section.querySelector('button, a');
    if (!heading) return;
    const hadTabIndex = heading.hasAttribute('tabindex');
    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
    try {
      heading.focus({ preventScroll: true });
    } catch {
      heading.focus();
    }
    if (!hadTabIndex) {
      heading.addEventListener(
        'blur',
        () => heading.removeAttribute('tabindex'),
        { once: true }
      );
    }
  };

  const highlightHelpSection = section => {
    if (!section) return;
    const existingTimer = helpSectionHighlightTimers.get(section);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    section.classList.add('help-section-focus');
    const timer = setTimeout(() => {
      section.classList.remove('help-section-focus');
      helpSectionHighlightTimers.delete(section);
    }, 1500);
    helpSectionHighlightTimers.set(section, timer);
  };

  let helpQuickLinksArrangeFrame = null;
  let helpQuickLinksResizeTimer = null;

  const arrangeHelpQuickLinksByLineCount = () => {
    if (!helpQuickLinksList || !helpQuickLinksList.childElementCount) {
      return;
    }

    const applyGrouping = () => {
      helpQuickLinksList
        .querySelectorAll('li[data-quick-link-spacer="true"]')
        .forEach(removeNode);
      const items = Array.from(helpQuickLinksList.children);
      if (!items.length) return;

      const multiLineItems = [];
      const singleLineItems = [];
      const hiddenItems = [];

      items.forEach((item, index) => {
        const button = item.querySelector('.help-quick-link');
        if (!button) {
          hiddenItems.push({ index, node: item });
          return;
        }
        if (item.hasAttribute('hidden')) {
          hiddenItems.push({ index, node: item, button });
          button.classList.remove('help-quick-link-multiline');
          return;
        }

        const label = button.querySelector('.help-quick-link-label');
        if (!label) {
          singleLineItems.push({ index, node: item, button });
          button.classList.remove('help-quick-link-multiline');
          return;
        }

        const computed = window.getComputedStyle(label);
        let lineHeight = Number.parseFloat(computed.lineHeight);
        if (!lineHeight || Number.isNaN(lineHeight)) {
          lineHeight = Number.parseFloat(computed.fontSize) || 0;
        }
        const labelHeight = label.offsetHeight || label.getBoundingClientRect().height;
        const lineCount = lineHeight ? Math.round(labelHeight / lineHeight) : 1;
        const isMultiLine = lineCount > 1;
        button.classList.toggle('help-quick-link-multiline', isMultiLine);
        if (isMultiLine) {
          multiLineItems.push({ index, node: item, button });
        } else {
          singleLineItems.push({ index, node: item, button });
        }
      });

      if (!multiLineItems.length && !singleLineItems.length) {
        return;
      }

      const fragment = document.createDocumentFragment();
      const sortedMulti = multiLineItems.sort((a, b) => a.index - b.index);
      const sortedSingle = singleLineItems.sort((a, b) => a.index - b.index);
      const totalPairs = Math.max(
        Math.ceil(sortedMulti.length / 2),
        Math.ceil(sortedSingle.length / 2)
      );
      for (let pairIndex = 0; pairIndex < totalPairs; pairIndex += 1) {
        const multiStart = pairIndex * 2;
        if (multiStart < sortedMulti.length) {
          fragment.appendChild(sortedMulti[multiStart].node);
          if (multiStart + 1 < sortedMulti.length) {
            fragment.appendChild(sortedMulti[multiStart + 1].node);
          } else if (sortedSingle.length) {
            const spacer = document.createElement('li');
            spacer.dataset.quickLinkSpacer = 'true';
            spacer.setAttribute('aria-hidden', 'true');
            spacer.setAttribute('role', 'presentation');
            spacer.className = 'help-quick-link-spacer';
            fragment.appendChild(spacer);
          }
        }
        const singleStart = pairIndex * 2;
        if (singleStart < sortedSingle.length) {
          fragment.appendChild(sortedSingle[singleStart].node);
          if (singleStart + 1 < sortedSingle.length) {
            fragment.appendChild(sortedSingle[singleStart + 1].node);
          }
        }
      }
      hiddenItems
        .sort((a, b) => a.index - b.index)
        .forEach(({ node }) => fragment.appendChild(node));

      if (fragment.childNodes.length) {
        helpQuickLinksList.appendChild(fragment);
      }
    };

    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      if (helpQuickLinksArrangeFrame) {
        window.cancelAnimationFrame(helpQuickLinksArrangeFrame);
      }
      helpQuickLinksArrangeFrame = window.requestAnimationFrame(() => {
        helpQuickLinksArrangeFrame = null;
        applyGrouping();
      });
    } else {
      applyGrouping();
    }
  };

  const scheduleHelpQuickLinksArrangement = () => {
    if (helpQuickLinksResizeTimer) {
      clearTimeout(helpQuickLinksResizeTimer);
    }
    helpQuickLinksResizeTimer = setTimeout(() => {
      helpQuickLinksResizeTimer = null;
      arrangeHelpQuickLinksByLineCount();
    }, 150);
  };

  const syncHelpQuickLinksVisibility = () => {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    let hasVisible = false;
    helpQuickLinkItems.forEach(({ section, listItem, button }) => {
      if (section && !section.hasAttribute('hidden')) {
        listItem.removeAttribute('hidden');
        hasVisible = true;
      } else {
        listItem.setAttribute('hidden', '');
        if (button) button.classList.remove('active');
      }
    });
    if (hasVisible) {
      helpQuickLinksNav.removeAttribute('hidden');
      arrangeHelpQuickLinksByLineCount();
    } else {
      helpQuickLinksNav.setAttribute('hidden', '');
    }
  };

  const applyQuickLinkLanguage = lang => {
    if (!helpQuickLinksNav) return;
    const langTexts = (texts && texts[lang]) || {};
    const fallbackTexts = (texts && texts.en) || {};
    const headingText =
      langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
    if (helpQuickLinksHeading && headingText) {
      helpQuickLinksHeading.textContent = headingText;
    }
    const ariaLabel =
      langTexts.helpQuickLinksAriaLabel ||
      headingText ||
      fallbackTexts.helpQuickLinksAriaLabel ||
      'Help topics quick navigation';
    helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
    const helpDescription =
      langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
    if (helpDescription) {
      helpQuickLinksNav.setAttribute('data-help', helpDescription);
    } else {
      helpQuickLinksNav.removeAttribute('data-help');
    }
    const template =
      langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
    helpQuickLinkItems.forEach(({ button, label }) => {
      if (!button) return;
      if (template) {
        const helpText = template.replace('%s', label);
        button.setAttribute('data-help', helpText);
        button.setAttribute('aria-label', helpText);
      } else {
        button.removeAttribute('data-help');
        button.setAttribute('aria-label', label);
      }
    });
    arrangeHelpQuickLinksByLineCount();
  };

  updateHelpQuickLinksForLanguage = applyQuickLinkLanguage;

  const buildHelpQuickLinks = () => {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
      helpQuickLinkItems.clear();
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinkItems.clear();
    helpQuickLinksList.textContent = '';
    const fragment = document.createDocumentFragment();
    const sections = Array.from(
      helpSectionsContainer.querySelectorAll('section[data-help-section]')
    );
    sections.forEach(section => {
      const id = section.id;
      if (!id) return;
      const heading = section.querySelector('h3');
      if (!heading) return;
      const headingIcon = heading.querySelector('.help-icon.icon-glyph');
      let label = heading.textContent || '';
      if (headingIcon) {
        const iconText = headingIcon.textContent || '';
        if (iconText) {
          const iconIndex = label.indexOf(iconText);
          if (iconIndex > -1) {
            label =
              label.slice(0, iconIndex) +
              label.slice(iconIndex + iconText.length);
          }
        }
      }
      label = label.trim();
      if (!label) return;
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'help-quick-link button-link';
      button.dataset.targetId = id;
      button.setAttribute('aria-label', label);

      if (headingIcon) {
        const icon = headingIcon.cloneNode(true);
        icon.classList.remove('help-icon');
        icon.classList.add('help-quick-link-icon');
        button.appendChild(icon);
      }

      const labelSpan = document.createElement('span');
      labelSpan.className = 'help-quick-link-label';
      labelSpan.textContent = label;
      button.appendChild(labelSpan);
      button.addEventListener('click', () => {
        if (section.hasAttribute('hidden')) return;
        if (helpQuickLinksList) {
          helpQuickLinksList
            .querySelectorAll('.help-quick-link.active')
            .forEach(btn => btn.classList.remove('active'));
        }
        button.classList.add('active');
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        highlightHelpSection(section);
        focusHelpSectionHeading(section);
        const quickLinkHeading =
          section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') ||
          section.querySelector('button, a');
        if (quickLinkHeading) {
          highlightFeatureSearchTargets([quickLinkHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
      });
      li.appendChild(button);
      fragment.appendChild(li);
      helpQuickLinkItems.set(id, { section, button, listItem: li, label });
    });
    if (!fragment.childNodes.length) {
      helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinksList.appendChild(fragment);
    applyQuickLinkLanguage(currentLang);
    syncHelpQuickLinksVisibility();
  };

  buildHelpQuickLinks();

  if (typeof window !== 'undefined') {
    window.addEventListener(
      'resize',
      () => {
        if (!helpQuickLinksList || helpQuickLinksNav?.hasAttribute('hidden')) {
          return;
        }
        scheduleHelpQuickLinksArrangement();
      },
      { passive: true }
    );
  }

  if (helpDialog) {
    helpDialog.addEventListener('click', e => {
      const link = e.target.closest('a[data-help-target]');
      if (!link) return;
      const rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
      const selector = rawSelector.trim();
      if (!selector) return;
      let focusEl;
      try {
        focusEl = document.querySelector(selector);
      } catch {
        focusEl = null;
      }
      if (!focusEl) return;
      e.preventDefault();
      const highlightSelector = link.dataset.helpHighlight || '';
      let highlightEl = focusEl;
      if (highlightSelector) {
        try {
          const candidate = document.querySelector(highlightSelector);
          if (candidate) {
            highlightEl = candidate;
          }
        } catch {
          // ignore selector errors and fall back to the focus element
        }
      }
      const targetInsideHelp = helpDialog.contains(focusEl);
      const runFocus = () => {
        focusFeatureElement(focusEl);
        if (highlightEl) {
          highlightAppTarget(highlightEl);
        }
        const extraTargets = findAssociatedLabelElements(highlightEl || focusEl);
        if (extraTargets.length) {
          highlightFeatureSearchTargets(extraTargets);
        }
      };
      if (targetInsideHelp) {
        runFocus();
        return;
      }
      closeHelp(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(runFocus);
      });
    });
  }

  // Search and filtering for the help dialog. Every keystroke scans both
  // high-level sections and individual FAQ items, restoring their original
  // markup, highlighting matches and hiding entries that do not include the
  // query. A message is shown if nothing matches and the clear button is
  // toggled based on the presence of a query.
  const HELP_SEARCH_ACCENT_VARIANTS = new Map([
    ['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'],
    ['b', 'ḃɓ'],
    ['c', 'çćĉċčƈ'],
    ['d', 'ďđḍḑḓ'],
    ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'],
    ['f', 'ƒḟ'],
    ['g', 'ğģĝġǵḡ'],
    ['h', 'ĥħḣḥḧẖ'],
    ['i', 'ìíîïĩīĭįıỉị'],
    ['j', 'ĵǰ'],
    ['k', 'ķƙḱḳḵ'],
    ['l', 'ĺļľłḷḽ'],
    ['m', 'ḿṁṃ'],
    ['n', 'ñńņňǹṅṇṋ'],
    ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'],
    ['p', 'ṕṗ'],
    ['q', 'ʠ'],
    ['r', 'ŕŗřȑȓṛṙ'],
    ['s', 'śŝşšșṡṣ'],
    ['t', 'ţťțṫṭṯ'],
    ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'],
    ['v', 'ṽṿ'],
    ['w', 'ŵẁẃẅẇẉ'],
    ['x', 'ẋẍ'],
    ['y', 'ýÿŷỳỷỹỵ'],
    ['z', 'źżžẑẓẕ']
  ]);

  const normaliseHelpSearchText = str => {
    if (!str) return '';
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
      .replace(/&/g, 'and')
      .replace(/\+/g, 'plus')
      .replace(/[°º˚]/g, 'deg')
      .replace(/\bdegrees?\b/g, 'deg')
      .replace(/[×✕✖✗✘]/g, 'x');
    if (typeof normalizeSpellingVariants === 'function') {
      normalized = normalizeSpellingVariants(normalized);
    }
    normalized = normaliseMarkVariants(normalized);
    return normalized.replace(/[^a-z0-9]+/g, '');
  };

  const buildHelpHighlightPattern = normalized => {
    if (!normalized) return null;
    const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = [];
    const addLetterPattern = char => {
      const variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
      const chars = new Set();
      const all = `${char}${variants}`;
      for (const ch of all) {
        chars.add(ch);
        const upper = ch.toUpperCase();
        if (upper) chars.add(upper);
      }
      const escaped = Array.from(chars)
        .map(escapeRegExp)
        .join('');
      return `[${escaped}]`;
    };
    const letters = Array.from(normalized);
    letters.forEach((char, index) => {
      if (index > 0) parts.push('\\s*');
      if (/[a-z]/.test(char)) {
        parts.push(addLetterPattern(char));
      } else if (/[0-9]/.test(char)) {
        parts.push(char);
      } else {
        parts.push(escapeRegExp(char));
      }
    });
    return `(${parts.join('')})`;
  };

  updateHelpResultsSummaryText = ({
    totalCount,
    visibleCount,
    hasQuery,
    queryText
  } = {}) => {
    const hideAssist = () => {
      if (!helpResultsAssist) return;
      helpResultsAssist.textContent = '';
      helpResultsAssist.setAttribute('hidden', '');
    };
    if (!helpResultsSummary) {
      hideAssist();
      return;
    }
    if (typeof totalCount === 'number' && Number.isFinite(totalCount)) {
      helpResultsSummary.dataset.totalCount = String(totalCount);
    }
    if (typeof visibleCount === 'number' && Number.isFinite(visibleCount)) {
      helpResultsSummary.dataset.visibleCount = String(visibleCount);
    }
    if (typeof hasQuery === 'boolean') {
      helpResultsSummary.dataset.hasQuery = hasQuery ? 'true' : 'false';
    }
    if (typeof queryText === 'string') {
      helpResultsSummary.dataset.query = queryText;
    }
    const storedTotal = Number(helpResultsSummary.dataset.totalCount || 0);
    if (!storedTotal) {
      helpResultsSummary.textContent = '';
      helpResultsSummary.setAttribute('hidden', '');
      hideAssist();
      return;
    }
    const storedVisible = Number(
      helpResultsSummary.dataset.visibleCount || 0
    );
    const storedHasQuery = helpResultsSummary.dataset.hasQuery === 'true';
    const storedQuery = helpResultsSummary.dataset.query || '';
    const langTexts = (texts && texts[currentLang]) || {};
    const fallbackTexts = (texts && texts.en) || {};
    let summaryText = '';
    if (storedHasQuery) {
      const template =
        langTexts.helpResultsSummaryFiltered ||
        fallbackTexts.helpResultsSummaryFiltered;
      if (template) {
        summaryText = template
          .replace('%1$s', storedVisible)
          .replace('%2$s', storedTotal)
          .replace('%3$s', storedQuery);
      } else if (storedQuery) {
        summaryText = `Showing ${storedVisible} of ${storedTotal} help topics for “${storedQuery}”.`;
      } else {
        summaryText = `Showing ${storedVisible} of ${storedTotal} help topics.`;
      }
    } else {
      const template =
        langTexts.helpResultsSummaryAll ||
        fallbackTexts.helpResultsSummaryAll;
      if (template) {
        summaryText = template.replace('%s', storedTotal);
      } else {
        summaryText = `All ${storedTotal} help topics are shown.`;
      }
    }
    helpResultsSummary.textContent = summaryText;
    helpResultsSummary.removeAttribute('hidden');
    if (helpResultsAssist) {
      if (storedVisible > 0) {
        const assistTemplate =
          langTexts.helpResultsAssist || fallbackTexts.helpResultsAssist;
        const assistText =
          assistTemplate ||
          'Tip: Press Tab to move into the quick links, or press Enter to open the top visible topic.';
        helpResultsAssist.textContent = assistText;
        helpResultsAssist.removeAttribute('hidden');
      } else {
        hideAssist();
      }
    }
  };

  const filterHelp = () => {
    // Bail out early if the search input is missing
    if (!helpSearch) {
      if (helpResultsSummary) helpResultsSummary.setAttribute('hidden', '');
      return;
    }
    const rawQuery = helpSearch.value.trim();
    const normalizedQuery = normaliseHelpSearchText(rawQuery);
    const hasQuery = normalizedQuery.length > 0;
    // Treat sections and FAQ items uniformly so the same logic can filter both
    const sections = Array.from(
      helpDialog.querySelectorAll('[data-help-section]')
    );
    const items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    const elements = sections.concat(items);
    const totalCount = elements.length;
    let visibleCount = 0;
    const highlightPattern = hasQuery
      ? buildHelpHighlightPattern(normalizedQuery)
      : null;
    const highlightMatches = (root, pattern) => {
      if (
        !pattern ||
        typeof document.createTreeWalker !== 'function' ||
        typeof NodeFilter === 'undefined'
      ) {
        return;
      }
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null
      );
      const textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(node => {
        const text = node.textContent;
        if (!text) return;
        const regex = new RegExp(pattern, 'giu');
        const firstMatch = regex.exec(text);
        if (!firstMatch) return;
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match = firstMatch;
        do {
          const start = match.index;
          const end = start + match[0].length;
          if (start > lastIndex) {
            frag.appendChild(
              document.createTextNode(text.slice(lastIndex, start))
            );
          }
          const mark = document.createElement('mark');
          mark.textContent = text.slice(start, end);
          frag.appendChild(mark);
          lastIndex = end;
          if (regex.lastIndex === start) {
            regex.lastIndex++;
          }
        } while ((match = regex.exec(text)) !== null);
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(frag, node);
        }
      });
    };
    elements.forEach(el => {
      const isFaqItem = el.classList.contains('faq-item');
      // Save original HTML once so that repeated filtering doesn't permanently
      // insert <mark> tags; restore it before applying a new highlight. While
      // doing so, capture the default open state for FAQ <details> elements so
      // the search can temporarily expand matches and restore the original
      // collapsed/expanded configuration when cleared.
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
        if (isFaqItem) {
          el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
        }
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      const text = normaliseHelpSearchText(el.textContent || '');
      const keywordText = normaliseHelpSearchText(
        el.dataset.helpKeywords || ''
      );
      const matches =
        !hasQuery ||
        text.includes(normalizedQuery) ||
        keywordText.includes(normalizedQuery);
      if (matches) {
        if (hasQuery && highlightPattern) {
          // Highlight the matching text while preserving the rest of the content
          highlightMatches(el, highlightPattern);
        }
        el.removeAttribute('hidden');
        if (isFaqItem) {
          if (hasQuery) {
            el.setAttribute('open', '');
          } else if (el.dataset.defaultOpen === 'true') {
            el.setAttribute('open', '');
          } else {
            el.removeAttribute('open');
          }
        }
        visibleCount += 1;
      } else {
        // Hide entries that do not match and collapse FAQ answers while they
        // are filtered out so reopening the dialog starts from a clean state.
        el.setAttribute('hidden', '');
        if (isFaqItem) {
          el.removeAttribute('open');
        }
      }
    });
    if (typeof updateHelpResultsSummaryText === 'function') {
      updateHelpResultsSummaryText({
        totalCount,
        visibleCount,
        hasQuery,
        queryText: rawQuery || normalizedQuery
      });
    }
    const showNoResults = hasQuery && visibleCount === 0;
    if (helpNoResults) {
      // Show or hide the "no results" indicator
      if (!showNoResults) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (typeof helpNoResultsSuggestions !== 'undefined' && helpNoResultsSuggestions) {
      if (!showNoResults) {
        helpNoResultsSuggestions.setAttribute('hidden', '');
      } else {
        helpNoResultsSuggestions.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      // Only show the clear button when there is text in the search box
      if (hasQuery) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
    syncHelpQuickLinksVisibility();
  };

  // Display the help dialog. The search box is reset so stale filter state
  // doesn't persist between openings, and focus is moved to the search field
  // for immediate typing.
  const openHelp = () => {
    ensureOnboardingTourReady('help-open');
    closeSideMenu();
    helpDialog.removeAttribute('hidden');
    openDialog(helpDialog);
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp(); // ensure all sections are visible again
      if (helpQuickLinksList) {
        helpQuickLinksList
          .querySelectorAll('.help-quick-link.active')
          .forEach(btn => btn.classList.remove('active'));
      }
      if (helpContent) {
        helpContent.scrollTop = 0;
      }
      helpSearch.focus();
    } else {
      try {
        helpDialog.focus({ preventScroll: true });
      } catch {
        helpDialog.focus();
      }
    }
  };

  // Hide the dialog and return focus to the button that opened it
  const closeHelp = (returnFocusEl = helpButton) => {
    closeDialog(helpDialog);
    helpDialog.setAttribute('hidden', '');
    if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
      try {
        returnFocusEl.focus({ preventScroll: true });
      } catch {
        returnFocusEl.focus();
      }
    }
  };

  // Convenience helper for toggling the dialog open or closed
  const toggleHelp = () => {
    if (!isDialogOpen(helpDialog)) {
      openHelp();
    } else {
      closeHelp();
    }
  };



  // Hover help mode displays a tooltip describing whichever element the user
  // points at or focuses. It is triggered from a button inside the dialog and
  // uses the same data-help/aria-* attributes that power the dialog content.
  let hoverHelpActive = false;
  let hoverHelpTooltip;
  let hoverHelpCurrentTarget = null;
  let hoverHelpHighlightedTarget = null;
  let hoverHelpPointerClientX = null;
  let hoverHelpPointerClientY = null;

  const parseHoverHelpSelectorList = value => {
    if (typeof value !== 'string') return [];
    return value
      .split(',')
      .map(selector => selector.trim())
      .filter(Boolean);
  };

  const parseHoverHelpIdList = value => {
    if (typeof value !== 'string') return [];
    return value
      .split(/\s+/)
      .map(id => id.trim())
      .filter(Boolean);
  };

  const getHoverHelpReferenceElements = element => {
    if (!element || !document?.querySelector) return [];

    const references = [];
    const seen = new Set();

    const addCandidate = candidate => {
      if (!candidate || !(candidate instanceof Element)) return;
      if (candidate === element) return;
      if (seen.has(candidate)) return;
      seen.add(candidate);
      references.push(candidate);
    };

    const addFromSelectors = raw => {
      parseHoverHelpSelectorList(raw).forEach(selector => {
        try {
          const match = document.querySelector(selector);
          addCandidate(match);
        } catch {
          // Ignore invalid selectors – hover help should continue gracefully.
        }
      });
    };

    const addFromIds = raw => {
      parseHoverHelpIdList(raw).forEach(id => {
        const match = document.getElementById(id);
        addCandidate(match);
      });
    };

    addFromSelectors(element.getAttribute('data-hover-help-target'));
    addFromSelectors(element.getAttribute('data-hover-help-source'));

    if (!element.hasAttribute('data-hover-help-skip-help-target')) {
      addFromSelectors(element.getAttribute('data-help-target'));
    }

    addFromIds(element.getAttribute('data-hover-help-targets'));

    return references;
  };

  const HOVER_HELP_TARGET_SELECTOR =
    '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';

  const findHoverHelpTarget = start => {
    if (!start) return null;
    const el = start.closest(HOVER_HELP_TARGET_SELECTOR);
    if (!el || el.tagName === 'SECTION') {
      return null;
    }
    return el;
  };

  const HOVER_HELP_SHORTCUT_TOKEN_MAP = {
    control: 'Ctrl',
    ctrl: 'Ctrl',
    meta: 'Cmd',
    cmd: 'Cmd',
    command: 'Cmd',
    option: 'Alt',
    alt: 'Alt',
    shift: 'Shift',
    enter: 'Enter',
    return: 'Enter',
    escape: 'Esc',
    esc: 'Esc',
    space: 'Space',
    spacebar: 'Space',
    tab: 'Tab',
    slash: '/',
    question: '?',
    backslash: '\\',
    minus: '−',
    dash: '−',
    plus: '+',
    period: '.',
    comma: ',',
    semicolon: ';',
    colon: ':',
    arrowup: '↑',
    arrowdown: '↓',
    arrowleft: '←',
    arrowright: '→',
    pageup: 'Page Up',
    pagedown: 'Page Down',
    home: 'Home',
    end: 'End',
    delete: 'Delete',
    backspace: 'Backspace',
    insert: 'Insert'
  };

  const formatHoverHelpShortcutToken = token => {
    if (typeof token !== 'string') return '';
    const clean = token.trim();
    if (!clean) return '';
    const lower = clean.toLowerCase();
    if (HOVER_HELP_SHORTCUT_TOKEN_MAP[lower]) {
      return HOVER_HELP_SHORTCUT_TOKEN_MAP[lower];
    }
    if (/^f\d{1,2}$/i.test(clean)) {
      return clean.toUpperCase();
    }
    if (/^key[a-z]$/i.test(clean)) {
      return clean.slice(3).toUpperCase();
    }
    if (/^digit\d$/i.test(clean)) {
      return clean.slice(5);
    }
    if (/^numpad\d$/i.test(clean)) {
      return `Numpad ${clean.slice(6)}`;
    }
    if (/^numpad(add|subtract|multiply|divide)$/i.test(lower)) {
      const op = lower.slice(6);
      const symbolMap = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
      return `Numpad ${symbolMap[op] || op}`;
    }
    if (clean.length === 1) {
      return clean.toUpperCase();
    }
    return clean.replace(/^[a-z]/, c => c.toUpperCase());
  };

  const formatHoverHelpShortcut = shortcut => {
    if (typeof shortcut !== 'string') return '';
    const parts = shortcut
      .split('+')
      .map(formatHoverHelpShortcutToken)
      .filter(Boolean);
    if (!parts.length) {
      return '';
    }
    return parts.join(' + ');
  };

  const splitHoverHelpShortcutList = value => {
    if (typeof value !== 'string') return [];
    return value
      .split(/[;,\n\u2022\u2027\u00b7]+/)
      .map(part => part.trim())
      .filter(Boolean);
  };

  const gatherHoverHelpShortcuts = element => {
    if (!element) return [];
    const shortcuts = [];
    const attrValues = [
      element.getAttribute('data-shortcut'),
      element.getAttribute('data-shortcuts'),
      element.getAttribute('data-help-shortcut'),
      element.getAttribute('data-help-shortcuts')
    ];
    attrValues.forEach(value => {
      splitHoverHelpShortcutList(value).forEach(item => {
        if (item) shortcuts.push(item);
      });
    });
    const ariaShortcuts = element.getAttribute('aria-keyshortcuts');
    if (ariaShortcuts) {
      ariaShortcuts
        .split(/\s+/)
        .map(formatHoverHelpShortcut)
        .filter(Boolean)
        .forEach(item => shortcuts.push(item));
    }
    return shortcuts;
  };

  const getHoverHelpLocaleValue = key => {
    if (!texts || typeof texts !== 'object') return '';
    const fallback = typeof texts.en === 'object' ? texts.en[key] : '';
    if (typeof currentLang === 'string' && texts[currentLang]) {
      const value = texts[currentLang][key];
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }
    return typeof fallback === 'string' ? fallback : '';
  };

  const getHoverHelpFallbackKeys = element => {
    if (!element) return [];

    const keys = [];
    const push = key => {
      if (!key || keys.includes(key)) return;
      keys.push(key);
    };

    const role = (element.getAttribute('role') || '').toLowerCase();
    const tagName = element.tagName ? element.tagName.toLowerCase() : '';
    const typeAttr = (element.getAttribute('type') || '').toLowerCase();
    const elementType = typeof element.type === 'string' ? element.type.toLowerCase() : '';
    const inputType = typeAttr || elementType;
    const ariaHasPopup = (element.getAttribute('aria-haspopup') || '').toLowerCase();
    const ariaPressed = (element.getAttribute('aria-pressed') || '').toLowerCase();

    if (role === 'dialog' || role === 'alertdialog') {
      push('hoverHelpFallbackDialog');
    }
    if (role === 'alertdialog') {
      push('hoverHelpFallbackAlert');
    }
    if (role === 'tablist') {
      push('hoverHelpFallbackTablist');
    }
    if (role === 'tab') {
      push('hoverHelpFallbackTab');
    }
    if (role === 'menu') {
      push('hoverHelpFallbackMenu');
    }
    if (role === 'menuitem') {
      push('hoverHelpFallbackMenu');
    }
    if (role === 'listbox') {
      push('hoverHelpFallbackSelect');
    }
    if (role === 'link') {
      push('hoverHelpFallbackLink');
    }
    if (role === 'progressbar') {
      push('hoverHelpFallbackProgress');
    }
    if (role === 'status') {
      push('hoverHelpFallbackStatus');
    }
    if (role === 'alert') {
      push('hoverHelpFallbackAlert');
    }
    if (role === 'switch') {
      push('hoverHelpFallbackSwitch');
    }
    if (role === 'checkbox' || role === 'menuitemcheckbox') {
      push('hoverHelpFallbackCheckbox');
    }
    if (role === 'radio' || role === 'menuitemradio') {
      push('hoverHelpFallbackRadio');
    }
    if (role === 'slider') {
      push('hoverHelpFallbackSlider');
    }
    if (role === 'spinbutton') {
      push('hoverHelpFallbackNumberInput');
    }
    if (role === 'textbox' || role === 'searchbox') {
      push('hoverHelpFallbackTextInput');
    }
    if (role === 'combobox') {
      push('hoverHelpFallbackSelect');
    }

    if (tagName === 'button' || role === 'button' || element.matches?.("input[type='button']") || element.matches?.("input[type='submit']") || element.matches?.("input[type='reset']")) {
      if (ariaHasPopup && ariaHasPopup !== 'false') {
        push('hoverHelpFallbackMenuButton');
      }
      if (ariaPressed === 'true' || ariaPressed === 'mixed' || ariaPressed === 'false') {
        push('hoverHelpFallbackToggleButton');
      }
      push('hoverHelpFallbackButton');
    } else if (tagName === 'a' && element.hasAttribute('href')) {
      push('hoverHelpFallbackLink');
    } else if (tagName === 'select') {
      push('hoverHelpFallbackSelect');
    } else if (tagName === 'textarea') {
      push('hoverHelpFallbackTextarea');
    } else if (tagName === 'details') {
      push('hoverHelpFallbackDetails');
    } else if (tagName === 'input') {
      switch (inputType) {
        case 'checkbox':
          push('hoverHelpFallbackCheckbox');
          break;
        case 'radio':
          push('hoverHelpFallbackRadio');
          break;
        case 'range':
          push('hoverHelpFallbackSlider');
          break;
        case 'number':
          push('hoverHelpFallbackNumberInput');
          break;
        case 'file':
          push('hoverHelpFallbackFileInput');
          break;
        case 'color':
          push('hoverHelpFallbackColorInput');
          break;
        default:
          push('hoverHelpFallbackTextInput');
          break;
      }
    } else if (element.isContentEditable) {
      push('hoverHelpFallbackTextarea');
    }

    push('hoverHelpFallbackGeneric');
    return keys;
  };

  const collectHoverHelpContent = el => {
    if (!el) {
      return { label: '', details: [] };
    }

    const seen = new Set();
    const labelParts = [];
    const detailParts = [];
    const shortcutParts = [];

    const addUnique = (value, bucket) => {
      if (typeof value !== 'string') return;
      const trimmed = value.replace(/\s+/g, ' ').trim();
      if (!trimmed || seen.has(trimmed)) return;
      seen.add(trimmed);
      bucket.push(trimmed);
    };

    const addLabelText = value => addUnique(value, labelParts);
    const addDetailText = value => addUnique(value, detailParts);
    const addShortcutText = value => addUnique(value, shortcutParts);

    const addTextFromElement = (
      element,
      { includeTextContent = false, preferTextAsLabel = false } = {}
    ) => {
      if (!element) return;
      addDetailText(element.getAttribute('data-help'));
      addDetailText(element.getAttribute('aria-description'));
      addDetailText(element.getAttribute('title'));
      addDetailText(element.getAttribute('aria-placeholder'));
      addLabelText(element.getAttribute('aria-label'));
      addLabelText(element.getAttribute('alt'));
      const placeholderAttr = element.getAttribute('placeholder');
      addDetailText(placeholderAttr);
      if (element.placeholder && element.placeholder !== placeholderAttr) {
        addDetailText(element.placeholder);
      }
      const roleDescription = element.getAttribute('aria-roledescription');
      if (roleDescription) {
        if (preferTextAsLabel) {
          addLabelText(roleDescription);
        } else {
          addDetailText(roleDescription);
        }
      }
      gatherHoverHelpShortcuts(element).forEach(addShortcutText);
      if (includeTextContent) {
        const text = element.textContent;
        if (preferTextAsLabel) {
          addLabelText(text);
        } else {
          addDetailText(text);
        }
      }
    };

    const applyFromIds = (ids, { preferTextAsLabel = false } = {}) => {
      if (!ids) return;
      ids
        .split(/\s+/)
        .map(id => id.trim())
        .filter(Boolean)
        .forEach(id => {
          const ref = document.getElementById(id);
          if (!ref) return;
          addTextFromElement(ref, {
            includeTextContent: true,
            preferTextAsLabel
          });
        });
    };

    const visitedElements = new Set();
    const queue = [
      { element: el, preferTextAsLabel: true, includeTextContent: false }
    ];

    while (queue.length) {
      const {
        element: current,
        preferTextAsLabel,
        includeTextContent
      } = queue.shift();
      if (!current || visitedElements.has(current)) {
        continue;
      }
      visitedElements.add(current);

      addTextFromElement(current, { includeTextContent, preferTextAsLabel });

      applyFromIds(current.getAttribute('aria-labelledby'), {
        preferTextAsLabel: true
      });
      applyFromIds(current.getAttribute('aria-describedby'));
      applyFromIds(current.getAttribute('aria-details'));
      applyFromIds(current.getAttribute('aria-errormessage'));
      applyFromIds(current.getAttribute('aria-controls'));

      findAssociatedLabelElements(current).forEach(labelEl => {
        addTextFromElement(labelEl, {
          includeTextContent: true,
          preferTextAsLabel: true
        });
      });

      getHoverHelpReferenceElements(current).forEach(proxyEl => {
        queue.push({
          element: proxyEl,
          preferTextAsLabel: false,
          includeTextContent: true
        });
      });
    }

    if (!labelParts.length) {
      addLabelText(el.textContent);
    }

    if (!detailParts.length && labelParts.length > 1) {
      labelParts.slice(1).forEach(text => addDetailText(text));
    }

    if (!detailParts.length) {
      const fallbackKeys = getHoverHelpFallbackKeys(el);
      let addedFallback = false;
      fallbackKeys.forEach(key => {
        const text = getHoverHelpLocaleValue(key);
        if (!text) return;
        addedFallback = true;
        addDetailText(text);
      });
      if (!addedFallback) {
        addDetailText(getHoverHelpLocaleValue('hoverHelpFallbackGeneric'));
      }
    }

    return {
      label: labelParts[0] || '',
      details: detailParts,
      shortcuts: shortcutParts
    };
  };

  const clearHoverHelpHighlight = () => {
    if (hoverHelpHighlightedTarget && hoverHelpHighlightedTarget.classList) {
      hoverHelpHighlightedTarget.classList.remove('hover-help-highlight');
    }
    hoverHelpHighlightedTarget = null;
  };

  const setHoverHelpHighlight = target => {
    if (hoverHelpHighlightedTarget === target) return;
    clearHoverHelpHighlight();
    if (target && target.classList && typeof target.classList.add === 'function') {
      target.classList.add('hover-help-highlight');
      hoverHelpHighlightedTarget = target;
    }
  };

  const usingPointerAnchor = () =>
    hoverHelpActive &&
    hoverHelpTooltip &&
    typeof hoverHelpPointerClientX === 'number' &&
    typeof hoverHelpPointerClientY === 'number' &&
    Number.isFinite(hoverHelpPointerClientX) &&
    Number.isFinite(hoverHelpPointerClientY);

  const extractPointerClientCoords = event => {
    if (!event) return null;
    const hasClient =
      typeof event.clientX === 'number' &&
      typeof event.clientY === 'number' &&
      Number.isFinite(event.clientX) &&
      Number.isFinite(event.clientY);
    if (hasClient) {
      return [event.clientX, event.clientY];
    }
    const hasPage =
      typeof event.pageX === 'number' &&
      typeof event.pageY === 'number' &&
      Number.isFinite(event.pageX) &&
      Number.isFinite(event.pageY);
    if (hasPage) {
      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      return [event.pageX - scrollX, event.pageY - scrollY];
    }
    return null;
  };

  const recordPointerFromEvent = event => {
    if (!hoverHelpActive || !hoverHelpTooltip) return false;
    const coords = extractPointerClientCoords(event);
    if (!coords) return false;
    const [clientX, clientY] = coords;
    hoverHelpPointerClientX = clientX;
    hoverHelpPointerClientY = clientY;
    return true;
  };

  const positionHoverHelpTooltip = target => {
    if (!hoverHelpTooltip || !target) return;
    const rect = target.getBoundingClientRect();
    const docEl = document.documentElement;
    const viewportWidth = Math.max(docEl?.clientWidth || 0, window.innerWidth || 0);
    const viewportHeight = Math.max(docEl?.clientHeight || 0, window.innerHeight || 0);
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const horizontalOffset = 12;
    const verticalOffset = 10;
    const viewportPadding = 8;

    const safeLeft = Number.isFinite(rect.left) ? rect.left : 0;
    const safeRight = Number.isFinite(rect.right) ? rect.right : safeLeft + (rect.width || 0);
    const safeTop = Number.isFinite(rect.top) ? rect.top : 0;
    const safeBottom = Number.isFinite(rect.bottom) ? rect.bottom : safeTop;

    const tooltipRect = hoverHelpTooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width || hoverHelpTooltip.offsetWidth || 0;
    const tooltipHeight = tooltipRect.height || hoverHelpTooltip.offsetHeight || 0;

    const pointerAnchored = usingPointerAnchor();

    const pointerClientX = (() => {
      if (pointerAnchored && typeof hoverHelpPointerClientX === 'number') {
        return hoverHelpPointerClientX;
      }
      if (Number.isFinite(rect.left)) {
        return safeLeft + (rect.width || 0) / 2;
      }
      return viewportWidth / 2;
    })();

    const preferLeftSide = (() => {
      if (tooltipWidth) {
        const requiredSpace = tooltipWidth + horizontalOffset + viewportPadding;
        const availableRight = viewportWidth - pointerClientX;
        const availableLeft = pointerClientX;
        if (availableRight < requiredSpace && availableLeft >= requiredSpace) {
          return true;
        }
      }
      const rightSideThreshold = viewportWidth * 0.6;
      return pointerClientX >= rightSideThreshold;
    })();

    let top = pointerAnchored
      ? hoverHelpPointerClientY + scrollY + verticalOffset
      : safeBottom + scrollY + verticalOffset;
    let left;

    if (pointerAnchored) {
      left = hoverHelpPointerClientX + scrollX + horizontalOffset;
      if (preferLeftSide) {
        left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
      }
    } else {
      const baseAnchor = preferLeftSide ? safeRight : safeLeft;
      left = baseAnchor + scrollX + (preferLeftSide ? -horizontalOffset : horizontalOffset);
      if (preferLeftSide) {
        left -= tooltipWidth;
      }
    }

    if (tooltipWidth) {
      const viewportRightLimit = scrollX + viewportWidth - viewportPadding;
      const defaultRight = left + tooltipWidth;
      if (defaultRight > viewportRightLimit) {
        if (pointerAnchored) {
          left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
        } else {
          left = safeRight + scrollX - tooltipWidth - horizontalOffset;
        }
      } else if (left < scrollX + viewportPadding && preferLeftSide) {
        left = Math.max(left, scrollX + viewportPadding);
      }

      const minLeft = scrollX + viewportPadding;
      const maxLeft =
        scrollX + Math.max(viewportWidth - tooltipWidth - viewportPadding, viewportPadding);
      if (left < minLeft) {
        left = minLeft;
      } else if (left > maxLeft) {
        left = maxLeft;
      }
    }

    if (tooltipHeight) {
      const minTop = scrollY + viewportPadding;
      const maxTop = scrollY + Math.max(viewportHeight - tooltipHeight - viewportPadding, viewportPadding);
      if (top > maxTop) {
        const aboveTop = pointerAnchored
          ? hoverHelpPointerClientY + scrollY - tooltipHeight - verticalOffset
          : safeTop + scrollY - tooltipHeight - verticalOffset;
        if (aboveTop >= minTop) {
          top = aboveTop;
        } else {
          top = Math.min(Math.max(top, minTop), maxTop);
        }
      } else if (top < minTop) {
        top = minTop;
      }
    }

    hoverHelpTooltip.style.top = `${top}px`;
    hoverHelpTooltip.style.left = `${left}px`;
  };

  const hideHoverHelpTooltip = () => {
    if (!hoverHelpTooltip) return;
    hoverHelpTooltip.setAttribute('hidden', '');
    hoverHelpTooltip.style.removeProperty('visibility');
    hoverHelpPointerClientX = null;
    hoverHelpPointerClientY = null;
    clearHoverHelpHighlight();
  };

  const createHoverHelpDetailsFragment = detailText => {
    const fragment = document.createDocumentFragment();
    if (!Array.isArray(detailText) || detailText.length === 0) {
      return fragment;
    }

    const addParagraph = text => {
      if (!text) return;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      fragment.appendChild(paragraph);
    };

    let listBuffer = [];

    const flushList = () => {
      if (!listBuffer.length) return;
      const list = document.createElement('ul');
      listBuffer.forEach(itemText => {
        const item = document.createElement('li');
        item.textContent = itemText;
        list.appendChild(item);
      });
      fragment.appendChild(list);
      listBuffer = [];
    };

    const addListItem = text => {
      if (!text) return;
      listBuffer.push(text);
    };

    detailText.forEach(part => {
      if (typeof part !== 'string') return;
      const normalisedPart = part
        .replace(/\r\n/g, '\n')
        .replace(/\s*[•‣▪◦⋅·]\s*/g, '\n• ');
      const lines = normalisedPart
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean);

      lines.forEach(line => {
        const bulletMatch = line.match(/^[•\-–—]\s*(.+)$/);
        if (bulletMatch) {
          addListItem(bulletMatch[1].trim());
          return;
        }

        flushList();
        addParagraph(line);
      });

      flushList();
    });

    flushList();

    if (!fragment.childElementCount) {
      addParagraph(detailText.filter(Boolean).join(' '));
    }

    return fragment;
  };

  const updateHoverHelpTooltip = target => {
    hoverHelpCurrentTarget = target || null;
    setHoverHelpHighlight(target || null);
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    const { label, details, shortcuts } = collectHoverHelpContent(target);
    const hasLabel = typeof label === 'string' && label.trim().length > 0;
    const detailText = Array.isArray(details) ? details.filter(Boolean) : [];
    const shortcutList = Array.isArray(shortcuts)
      ? shortcuts.filter(Boolean)
      : [];
    if (!hasLabel && detailText.length === 0 && shortcutList.length === 0) {
      hideHoverHelpTooltip();
      return;
    }
    // Defensive check: if we only have a label but it matches the text content (or is just a title)
    // and there are no details or shortcuts, it might look like an empty box or just a label repetition.
    // For now, we'll enforce that if there are no details and no shortcuts, we hide it
    // UNLESS the label is significantly different or we want to show just a label.
    // However, the user issue is "empty hover box", which implies it might be showing *nothing* or just a header.
    // If detailText is empty, let's ensure we don't show a box with just a header if that header is redundant.
    // But strictly for "empty box", we should ensure we have *something* to show.

    if (detailText.length === 0 && shortcutList.length === 0) {
      // If we have a label but no details, it might be the "empty" box the user sees if the label is empty string or just whitespace
      // despite the check above.
      // Let's be stricter:
      if (!hasLabel || label.trim() === '') {
        hideHoverHelpTooltip();
        return;
      }
    }
    hoverHelpTooltip.textContent = '';
    if (hasLabel) {
      const titleEl = document.createElement('div');
      titleEl.className = 'hover-help-heading';
      titleEl.textContent = label.trim();
      hoverHelpTooltip.appendChild(titleEl);
    }
    if (detailText.length) {
      const bodyEl = document.createElement('div');
      bodyEl.className = 'hover-help-details';
      bodyEl.appendChild(createHoverHelpDetailsFragment(detailText));
      hoverHelpTooltip.appendChild(bodyEl);
    }
    if (shortcutList.length) {
      const shortcutsWrapper = document.createElement('div');
      shortcutsWrapper.className = 'hover-help-shortcuts';
      const headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
      if (headingText) {
        const headingEl = document.createElement('div');
        headingEl.className = 'hover-help-shortcuts-heading';
        headingEl.textContent = headingText;
        shortcutsWrapper.appendChild(headingEl);
      }
      const listEl = document.createElement('ul');
      listEl.className = 'hover-help-shortcuts-list';
      shortcutList.forEach(shortcutText => {
        if (!shortcutText) return;
        const item = document.createElement('li');
        item.className = 'hover-help-shortcut';
        item.textContent = shortcutText;
        listEl.appendChild(item);
      });
      if (listEl.childElementCount) {
        shortcutsWrapper.appendChild(listEl);
        hoverHelpTooltip.appendChild(shortcutsWrapper);
      }
    }
    const exitHint = getHoverHelpLocaleValue('hoverHelpExitHint');
    if (exitHint) {
      const hintEl = document.createElement('div');
      hintEl.className = 'hover-help-hint';
      hintEl.textContent = exitHint;
      hoverHelpTooltip.appendChild(hintEl);
    }
    const wasHidden = hoverHelpTooltip.hasAttribute('hidden');
    if (wasHidden) {
      hoverHelpTooltip.style.visibility = 'hidden';
      hoverHelpTooltip.removeAttribute('hidden');
    }
    positionHoverHelpTooltip(target);
    if (wasHidden) {
      hoverHelpTooltip.style.removeProperty('visibility');
    }
    hoverHelpTooltip.removeAttribute('hidden');
  };

  const canInteractDuringHoverHelp = target => {
    if (!hoverHelpActive || !target) return false;
    return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
  };

  // Exit hover-help mode and clean up tooltip/cursor state
  const stopHoverHelp = () => {
    hoverHelpActive = false;
    hoverHelpCurrentTarget = null;
    if (hoverHelpTooltip) {
      removeNode(hoverHelpTooltip);
      hoverHelpTooltip = null;
    }
    clearHoverHelpHighlight();
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };

  // Start hover-help mode: close the dialog, create the tooltip element and
  // switch the cursor to the standard help cursor.
  const startHoverHelp = () => {
    hoverHelpActive = true;
    closeHelp();
    document.body.style.cursor = 'help';
    document.body.classList.add('hover-help-active');
    clearHoverHelpHighlight();
    hoverHelpTooltip = document.createElement('div');
    hoverHelpTooltip.id = 'hoverHelpTooltip';
    hoverHelpTooltip.setAttribute('role', 'tooltip');
    hoverHelpTooltip.setAttribute('hidden', '');
    document.body.appendChild(hoverHelpTooltip);
  };

  const refreshTooltipPosition = () => {
    if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };

  document.addEventListener('mouseover', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    recordPointerFromEvent(e);
    const target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });

  document.addEventListener('focusin', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    hoverHelpPointerClientX = null;
    hoverHelpPointerClientY = null;
    const target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });

  document.addEventListener('focusout', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
      hoverHelpCurrentTarget = null;
      hideHoverHelpTooltip();
    }
  });

  window.addEventListener('scroll', refreshTooltipPosition, true);
  window.addEventListener('resize', refreshTooltipPosition);

  const updatePointerPosition = e => {
    if (!recordPointerFromEvent(e)) return;
    if (hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };

  if (typeof window !== 'undefined' && 'PointerEvent' in window) {
    window.addEventListener('pointermove', updatePointerPosition, true);
    window.addEventListener('pointerdown', updatePointerPosition, true);
  } else {
    window.addEventListener('mousemove', updatePointerPosition, true);
    window.addEventListener('mousedown', updatePointerPosition, true);
  }

  // Prevent interacting with controls like dropdowns while hover help is active
  document.addEventListener(
    'mousedown',
    e => {
      if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  document.addEventListener('click', e => {
    // Any click while in hover-help mode exits the mode and removes the tooltip
    if (!hoverHelpActive) return;
    if (canInteractDuringHoverHelp(e.target)) {
      return;
    }
    e.preventDefault();
    stopHoverHelp();
  });

  if (hoverHelpButton) {
    // Dedicated button inside the dialog to enable hover-help mode
    hoverHelpButton.addEventListener('click', e => {
      e.stopPropagation();
      startHoverHelp(); // activate tooltip mode
    });
  }

  const focusFeatureSearchInput = () => {
    if (!featureSearch) return;
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu?.contains(featureSearch)) {
      openSideMenu();
    }
    if (typeof featureSearch.scrollIntoView === 'function') {
      featureSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    try {
      featureSearch.focus({ preventScroll: true });
    } catch {
      featureSearch.focus();
    }
    if (typeof featureSearch.select === 'function') {
      featureSearch.select();
    }
    if (!featureSearch.hasAttribute('data-skip-native-picker')) {
      safeShowPicker(featureSearch);
    }
  };

  runFeatureSearch = query => {
    const rawQuery = typeof query === 'string' ? query : featureSearch?.value || '';
    const originalNormalized = normalizeSearchValue(rawQuery);
    const value = rawQuery.trim();
    if (!value) return;
    const hasFilterHelper = typeof extractFeatureSearchFilter === 'function';
    const filterData = hasFilterHelper
      ? extractFeatureSearchFilter(value)
      : { filterType: null, queryText: value };
    const filterType = filterData?.filterType || null;
    const filteredQuery = filterType ? filterData.queryText : value;
    const normalizedFiltered = typeof filteredQuery === 'string' ? filteredQuery.trim() : '';
    const lower = value.toLowerCase();
    const isHelpSuggestion = lower.endsWith(' (help)');
    const cleanSource = isHelpSuggestion
      ? value.slice(0, -7).trim()
      : normalizedFiltered || (typeof filteredQuery === 'string' ? filteredQuery.trim() : '');
    if (filterType === 'help' && !isHelpSuggestion && !cleanSource) {
      openHelp();
      if (helpSearch) {
        helpSearch.value = '';
        filterHelp();
        helpSearch.focus();
      }
      return;
    }
    const clean = cleanSource || (filterType ? '' : value);
    const cleanKey = searchKey(clean);
    const cleanTokens = searchTokens(clean);

    const helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    const deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    const featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    const helpScore = helpMatch?.score || 0;
    const deviceScore = deviceMatch?.score || 0;
    const strongSearchMatchTypes =
      typeof STRONG_SEARCH_MATCH_TYPES !== 'undefined' &&
        STRONG_SEARCH_MATCH_TYPES instanceof Set
        ? STRONG_SEARCH_MATCH_TYPES
        : FALLBACK_STRONG_SEARCH_MATCH_TYPES;

    const deviceStrong = deviceMatch ? strongSearchMatchTypes.has(deviceMatch.matchType) : false;
    const filterTargetsDevices = filterType === 'device';
    const filterTargetsActions = filterType === 'action';
    const filterTargetsFeatures = filterType === 'feature';
    const filterBlocksDevices = filterTargetsFeatures || filterTargetsActions;
    const normalizedFeatureMatch = (() => {
      if (!featureMatch) return null;
      const entry = featureMatch.value;
      if (!entry) return null;
      const entryType = entry.entryType || 'feature';
      if (entryType === 'device') return null;
      if (filterTargetsDevices) return null;
      if (filterTargetsFeatures && entryType !== 'feature') return null;
      if (filterTargetsActions && entryType !== 'action') return null;
      return { match: featureMatch, entryType, entry };
    })();
    const fallbackFeatureMatch =
      featureMatch && featureMatch.value && featureMatch.value.entryType !== 'device'
        ? featureMatch
        : null;
    const featureMatchForComparison = normalizedFeatureMatch?.match || fallbackFeatureMatch;
    const featureScore = featureMatchForComparison?.score || 0;
    const featureStrong = featureMatchForComparison
      ? strongSearchMatchTypes.has(featureMatchForComparison.matchType)
      : false;
    const bestNonHelpScore = Math.max(deviceScore, featureScore);
    const hasStrongNonHelp = deviceStrong || featureStrong;
    const preferHelp =
      !!helpMatch &&
      (isHelpSuggestion || filterType === 'help' || (!hasStrongNonHelp && helpScore > bestNonHelpScore));

    if (!isHelpSuggestion && !preferHelp) {
      const featureMatchType = featureMatchForComparison?.matchType;
      const shouldUseDevice =
        (!filterBlocksDevices &&
          (!!deviceMatch &&
            (!featureMatchForComparison ||
              (deviceStrong && !featureStrong) ||
              (deviceStrong === featureStrong &&
                (deviceScore > featureScore ||
                  (deviceScore === featureScore && featureMatchType !== 'exactKey')))))) ||
        (filterTargetsDevices && !!deviceMatch);
      if (shouldUseDevice) {
        const device = deviceMatch.value;
        if (device && device.select) {
          device.select.value = device.value;
          device.select.dispatchEvent(new Event('change', { bubbles: true }));
          if (device.label) {
            updateFeatureSearchValue(device.label, originalNormalized);
          }
          if (typeof recordFeatureSearchUsage === 'function') {
            let deviceLabel = device.label;
            if (!deviceLabel && device.select) {
              const selectedOption = Array.from(device.select.options || []).find(opt => opt.value === device.value);
              if (selectedOption && selectedOption.textContent) {
                deviceLabel = selectedOption.textContent.trim();
              }
            }
            recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);
          }
          focusFeatureElement(device.select);
          const highlightTargets = [
            device.select,
            ...findAssociatedLabelElements(device.select)
          ];
          highlightFeatureSearchTargets(highlightTargets);
          return;
        }
        if (device && device.entryType === 'deviceLibrary' && (device.element || device.rawElement)) {
          const deviceLabel = device.label || clean;
          if (deviceLabel) {
            updateFeatureSearchValue(deviceLabel, originalNormalized);
          }
          if (typeof recordFeatureSearchUsage === 'function') {
            recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);
          }
          if (typeof device.focusLibraryEntry === 'function') {
            device.focusLibraryEntry();
          }
          const focusTarget = device.element || device.rawElement;
          if (focusTarget) {
            focusFeatureElement(focusTarget);
            const highlightTargets = [
              focusTarget,
              ...findAssociatedLabelElements(focusTarget)
            ];
            highlightFeatureSearchTargets(highlightTargets);
          }
          if (typeof device.highlightLibraryEntry === 'function') {
            device.highlightLibraryEntry();
          }
          return;
        }
      }
      if (normalizedFeatureMatch) {
        const feature = normalizedFeatureMatch.entry;
        const featureEl = feature?.element || feature;
        if (featureEl) {
          const label = feature?.label || featureEl.textContent?.trim();
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
          }
          if (typeof recordFeatureSearchUsage === 'function') {
            const type = normalizedFeatureMatch.entryType || 'feature';
            const usageKey = normalizedFeatureMatch.match?.key || featureMatch?.key;
            recordFeatureSearchUsage(usageKey, type, label);
          }
          focusFeatureElement(featureEl);
          const highlightTargets = [
            featureEl,
            ...findAssociatedLabelElements(featureEl)
          ];
          highlightFeatureSearchTargets(highlightTargets);
          return;
        }
      }
    }
    if (helpMatch) {
      const helpEntry = helpMatch.value || {};
      const section = helpEntry.section;
      if (typeof recordFeatureSearchUsage === 'function') {
        recordFeatureSearchUsage(helpMatch.key, 'help', helpEntry.label);
      }
      openHelp();
      if (helpSearch) {
        helpSearch.value = clean;
        filterHelp();
      }
      if (section) {
        if (section.hasAttribute('hidden')) {
          section.removeAttribute('hidden');
          if (helpNoResults) {
            helpNoResults.setAttribute('hidden', '');
          }
          if (typeof helpNoResultsSuggestions !== 'undefined' && helpNoResultsSuggestions) {
            helpNoResultsSuggestions.setAttribute('hidden', '');
          }
          syncHelpQuickLinksVisibility();
        }
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        highlightHelpSection(section);
        const sectionHeading =
          section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') ||
          section.querySelector('button, a');
        if (sectionHeading) {
          highlightFeatureSearchTargets([sectionHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
        const quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
        if (helpQuickLinksList) {
          helpQuickLinksList
            .querySelectorAll('.help-quick-link.active')
            .forEach(btn => btn.classList.remove('active'));
        }
        if (quickLink && quickLink.button) {
          quickLink.button.classList.add('active');
        }
      }
      return;
    }
    openHelp();
    if (helpSearch) {
      helpSearch.value = clean;
      filterHelp();
      highlightFeatureSearchTargets([helpSearch]);
    }
  };

  if (featureSearch) {
    const featureSearchDropdown = document.getElementById('featureSearchDropdown');

    const resolveFeatureSearchOptionEntry = option => {
      if (!option || !featureSearchDropdown) return null;
      const dropdown = option.closest('#featureSearchDropdown') || featureSearchDropdown;
      const map = dropdown && dropdown.__optionEntries instanceof Map
        ? dropdown.__optionEntries
        : null;
      if (!map) return null;
      if (option.id && map.has(option.id)) {
        return map.get(option.id) || null;
      }
      const entryKey = option.getAttribute('data-entry-key');
      if (entryKey) {
        for (const value of map.values()) {
          if (value && value.key === entryKey) {
            return value;
          }
        }
      }
      return null;
    };

    const openFeatureSearchEntry = (entry, queryValue) => {
      if (!entry) return false;
      const entryType = entry.type || entry.entryType || 'feature';
      const normalizedQuery = normalizeSearchValue(queryValue || '');
      const label = entry.label || entry.display || entry.optionLabel || normalizedQuery || '';
      const usageKey = entry.key || null;
      const recordUsage = () => {
        if (typeof recordFeatureSearchUsage === 'function' && usageKey) {
          const type = entryType === 'deviceLibrary' ? 'device' : entryType;
          recordFeatureSearchUsage(usageKey, type, label);
        }
      };

      if (entryType === 'device') {
        if (entry.select) {
          entry.select.value = entry.value;
          entry.select.dispatchEvent(new Event('change', { bubbles: true }));
          if (label) {
            updateFeatureSearchValue(label, normalizedQuery);
          }
          recordUsage();
          focusFeatureElement(entry.select);
          const highlightTargets = [entry.select, ...findAssociatedLabelElements(entry.select)];
          highlightFeatureSearchTargets(highlightTargets);
          return true;
        }
        if (entry.entryType === 'deviceLibrary' && (entry.element || entry.rawElement)) {
          if (label) {
            updateFeatureSearchValue(label, normalizedQuery);
          }
          recordUsage();
          if (typeof entry.focusLibraryEntry === 'function') {
            entry.focusLibraryEntry();
          }
          const focusTarget = entry.element || entry.rawElement;
          if (focusTarget) {
            focusFeatureElement(focusTarget);
            const highlightTargets = [focusTarget, ...findAssociatedLabelElements(focusTarget)];
            highlightFeatureSearchTargets(highlightTargets);
          }
          if (typeof entry.highlightLibraryEntry === 'function') {
            entry.highlightLibraryEntry();
          }
          return true;
        }
      }

      if (entryType === 'feature') {
        const featureEl = entry.element || entry;
        if (featureEl) {
          if (label) {
            updateFeatureSearchValue(label, normalizedQuery);
          }
          recordUsage();
          focusFeatureElement(featureEl);
          const highlightTargets = [featureEl, ...findAssociatedLabelElements(featureEl)];
          highlightFeatureSearchTargets(highlightTargets);
          return true;
        }
      }

      if (entryType === 'help') {
        recordUsage();
        openHelp();
        if (helpSearch) {
          helpSearch.value = label || normalizedQuery;
          filterHelp();
        }
        const section = entry.section;
        if (section) {
          if (section.hasAttribute('hidden')) {
            section.removeAttribute('hidden');
            if (helpNoResults) {
              helpNoResults.setAttribute('hidden', '');
            }
            if (typeof helpNoResultsSuggestions !== 'undefined' && helpNoResultsSuggestions) {
              helpNoResultsSuggestions.setAttribute('hidden', '');
            }
            syncHelpQuickLinksVisibility();
          }
          if (typeof section.scrollIntoView === 'function') {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          highlightHelpSection(section);
          const sectionHeading =
            section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') ||
            section.querySelector('button, a');
          if (sectionHeading) {
            highlightFeatureSearchTargets([sectionHeading]);
          } else {
            highlightFeatureSearchTargets([section]);
          }
          const quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
          if (helpQuickLinksList) {
            helpQuickLinksList
              .querySelectorAll('.help-quick-link.active')
              .forEach(btn => btn.classList.remove('active'));
          }
          if (quickLink && quickLink.button) {
            quickLink.button.classList.add('active');
          }
          return true;
        }
      }

      if (entryType === 'action') {
        recordUsage();
        const actionKey = entry.action;

        switch (actionKey) {
          case 'create-new-project':
            if (typeof setupSelect !== 'undefined' && setupSelect) {
              setupSelect.value = '';
              setupSelect.dispatchEvent(new Event('change', { bubbles: true }));
              if (typeof checkSetupChanged === 'function') checkSetupChanged();
            }
            return true;

          case 'save-project':
            if (typeof saveSetupBtn !== 'undefined' && saveSetupBtn) {
              saveSetupBtn.click();
            }
            return true;

          case 'export-project':
            if (typeof shareSetupBtn !== 'undefined' && shareSetupBtn) {
              shareSetupBtn.click();
            }
            return true;

          case 'toggle-dark-mode':
            if (typeof darkModeToggle !== 'undefined' && darkModeToggle) {
              darkModeToggle.click();
            }
            return true;

          case 'toggle-pink-mode':
            if (typeof pinkModeToggle !== 'undefined' && pinkModeToggle) {
              pinkModeToggle.click();
            }
            return true;

          case 'open-settings':
            if (typeof settingsButton !== 'undefined' && settingsButton) {
              settingsButton.click();
            }
            return true;

          case 'open-help':
            if (typeof helpButton !== 'undefined' && helpButton) {
              helpButton.click();
            }
            return true;

          case 'force-reload':
            if (typeof reloadButton !== 'undefined' && reloadButton) {
              reloadButton.click();
            }
            return true;
        }
      }

      return false;
    };

    const getDropdownOptions = () => {
      if (!featureSearchDropdown) return [];
      return Array.from(featureSearchDropdown.querySelectorAll('[role="option"]') || []);
    };

    const clearFeatureSearchActiveState = () => {
      const options = getDropdownOptions();
      options.forEach(option => {
        option.setAttribute('tabindex', '-1');
        option.setAttribute('aria-selected', 'false');
      });
      if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
        featureSearch.removeAttribute('aria-activedescendant');
      }
    };

    const setActiveDropdownOption = (index, { focusOption = false } = {}) => {
      const options = getDropdownOptions();
      if (!options.length) {
        if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
          featureSearch.removeAttribute('aria-activedescendant');
        }
        return null;
      }
      const bounded = Math.max(0, Math.min(index, options.length - 1));
      options.forEach((option, optIndex) => {
        const isActive = optIndex === bounded;
        option.setAttribute('tabindex', isActive ? '0' : '-1');
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          if (featureSearch) {
            if (option.id) {
              featureSearch.setAttribute('aria-activedescendant', option.id);
            } else if (featureSearch.hasAttribute('aria-activedescendant')) {
              featureSearch.removeAttribute('aria-activedescendant');
            }
          }
          if (focusOption) {
            option.focus();
          }
        }
      });
      if (featureSearchDropdown) {
        featureSearchDropdown.dataset.activeIndex = String(bounded);
      }
      return options[bounded];
    };

    const closeFeatureSearchDropdown = () => {
      if (!featureSearchDropdown) return;
      clearFeatureSearchActiveState();
      featureSearchDropdown.dataset.open = 'false';
      featureSearchDropdown.hidden = true;
      featureSearchDropdown.setAttribute('aria-expanded', 'false');
      featureSearchDropdown.dataset.activeIndex = '';
      if (featureSearch) {
        featureSearch.setAttribute('aria-expanded', 'false');
      }
      const container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.remove('feature-search-open');
    };

    const openFeatureSearchDropdown = () => {
      if (!featureSearchDropdown) return;
      if (featureSearchDropdown.dataset.count === '0') {
        closeFeatureSearchDropdown();
        return;
      }
      featureSearchDropdown.dataset.open = 'true';
      featureSearchDropdown.hidden = false;
      featureSearchDropdown.setAttribute('aria-expanded', 'true');
      if (featureSearch) {
        featureSearch.setAttribute('aria-expanded', 'true');
      }
      const container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.add('feature-search-open');
      const options = getDropdownOptions();
      if (!options.length) {
        if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
          featureSearch.removeAttribute('aria-activedescendant');
        }
        return;
      }
      const activeIndexAttr = featureSearchDropdown.dataset.activeIndex;
      const parsedIndex = typeof activeIndexAttr === 'string' && activeIndexAttr !== ''
        ? Number(activeIndexAttr)
        : NaN;
      const shouldFocusOption = document.activeElement && document.activeElement !== featureSearch;
      if (Number.isNaN(parsedIndex)) {
        setActiveDropdownOption(0, { focusOption: shouldFocusOption });
      } else {
        setActiveDropdownOption(parsedIndex, { focusOption: shouldFocusOption });
      }
    };

    const applyFeatureSearchSuggestion = (value, option) => {
      if (!featureSearch || !value) return;
      const entry = option ? resolveFeatureSearchOptionEntry(option) : null;
      featureSearch.value = value;
      try {
        featureSearch.focus({ preventScroll: true });
      } catch {
        featureSearch.focus();
      }
      featureSearch.setSelectionRange?.(value.length, value.length);
      if (entry && openFeatureSearchEntry(entry, value)) {
        updateFeatureSearchSuggestions(value);
        closeFeatureSearchDropdown();
        return;
      }
      updateFeatureSearchSuggestions(value);
      runFeatureSearch(value);
      closeFeatureSearchDropdown();
    };

    const handle = () => {
      closeFeatureSearchDropdown();
      runFeatureSearch(featureSearch.value);
    };

    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('focus', () => {
      openFeatureSearchDropdown();
    });
    featureSearch.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (
          !featureSearchDropdown ||
          featureSearchDropdown.contains(document.activeElement)
        ) {
          return;
        }
        closeFeatureSearchDropdown();
      }, 100);
    });
    featureSearch.addEventListener('input', () => {
      updateFeatureSearchSuggestions(featureSearch.value);
      openFeatureSearchDropdown();
    });
    featureSearch.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape') {
        if (featureSearch.value) {
          featureSearch.value = '';
          restoreFeatureSearchDefaults();
        }
        closeFeatureSearchDropdown();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
          return;
        }
        e.preventDefault();
        openFeatureSearchDropdown();
        const options = getDropdownOptions();
        const activeIndex = featureSearchDropdown.dataset.activeIndex;
        const nextIndex = activeIndex ? Number(activeIndex) + 1 : 0;
        setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex, { focusOption: false });
      } else if (e.key === 'ArrowUp') {
        if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
          return;
        }
        e.preventDefault();
        openFeatureSearchDropdown();
        const options = getDropdownOptions();
        if (!options.length) return;
        const activeIndex = featureSearchDropdown.dataset.activeIndex;
        if (!activeIndex) {
          setActiveDropdownOption(options.length - 1, { focusOption: false });
        } else {
          const prevIndex = Number(activeIndex) - 1;
          setActiveDropdownOption(prevIndex >= 0 ? prevIndex : options.length - 1, { focusOption: false });
        }
      }
    });

    if (featureSearchDropdown) {
      featureSearchDropdown.addEventListener('mousedown', e => {
        const option = e.target.closest('[data-value]');
        if (option) {
          e.preventDefault();
        }
      });
      featureSearchDropdown.addEventListener('click', e => {
        const option = e.target.closest('[data-value]');
        if (!option) return;
        const value = option.getAttribute('data-value') || '';
        if (!value) return;
        applyFeatureSearchSuggestion(value, option);
      });
      featureSearchDropdown.addEventListener('keydown', e => {
        const options = getDropdownOptions();
        if (!options.length) return;
        const activeElement = document.activeElement;
        const currentIndex = options.indexOf(activeElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex, { focusOption: true });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          setActiveDropdownOption(prevIndex, { focusOption: true });
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActiveDropdownOption(0, { focusOption: true });
        } else if (e.key === 'End') {
          e.preventDefault();
          setActiveDropdownOption(options.length - 1, { focusOption: true });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex >= 0 && options[currentIndex]) {
            const value = options[currentIndex].getAttribute('data-value') || '';
            if (value) {
              applyFeatureSearchSuggestion(value, options[currentIndex]);
            }
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeFeatureSearchDropdown();
          focusFeatureSearchInput();
        } else if (e.key === 'Tab') {
          closeFeatureSearchDropdown();
        }
      });
      featureSearchDropdown.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (
            document.activeElement === featureSearch ||
            (featureSearchDropdown && featureSearchDropdown.contains(document.activeElement))
          ) {
            return;
          }
          closeFeatureSearchDropdown();
        }, 100);
      });
    }
  }

  // Wire up button clicks and search field interactions
  helpButton.addEventListener('click', toggleHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (helpSearch) helpSearch.addEventListener('input', filterHelp);
  if (helpSearchClear) helpSearchClear.addEventListener('click', () => {
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    }
  });

  function safeShowPicker(input) {
    if (!input || typeof input.showPicker !== 'function') return;
    try {
      input.showPicker();
    } catch (err) {
      if (err && err.name === 'NotAllowedError') return;
      console.warn('Unable to show picker', err);
    }
  }

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    const key = typeof e.key === 'string' ? e.key : '';
    const lowerKey = key.toLowerCase();
    // Keyboard shortcuts controlling the help dialog and hover-help mode
    if (hoverHelpActive && e.key === 'Escape') {
      // Escape exits hover-help mode
      stopHoverHelp();
    } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
      // Escape closes the help dialog
      e.preventDefault();
      closeHelp();
    } else if (
      e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)
    ) {
      e.preventDefault();
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertSettingsFocusScaleIfNeeded();
      rememberSettingsFocusScaleBaseline();
      invokeSessionRevertAccentColor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (
      e.key === 'F1' ||
      ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
    ) {
      // F1 or Ctrl+/ toggles the dialog even while typing
      e.preventDefault();
      toggleHelp();
    } else if (
      e.key === '/' &&
      !isTextField &&
      (!helpDialog || !isDialogOpen(helpDialog))
    ) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (
      (e.key === '?' && !isTextField) ||
      (lowerKey === 'h' && !isTextField)
    ) {
      // Plain ? or H opens the dialog when not typing in a field
      e.preventDefault();
      toggleHelp();
    } else if (
      isDialogOpen(helpDialog) &&
      ((e.key === '/' && !isTextField) || (lowerKey === 'f' && (e.ctrlKey || e.metaKey)))
    ) {
      // When the dialog is open, / or Ctrl+F moves focus to the search box
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
    } else if (key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      requestSettingsOpen({
        reason: 'keyboard-shortcut',
        key,
        ctrl: !!e.ctrlKey,
        meta: !!e.metaKey,
        shift: !!e.shiftKey,
      });
    } else if (lowerKey === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (lowerKey === 'd' && !isTextField) {
      setThemePreference(!getThemePreference());
    } else if (lowerKey === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (lowerKey === 'p' && !isTextField) {
      persistPinkModePreference(!document.body.classList.contains('pink-mode'));
    }
  });

  helpDialog.addEventListener('click', e => {
    // Clicking the semi-transparent backdrop (not the dialog content) closes it
    if (e.target === helpDialog) closeHelp();
  });

  helpDialog.addEventListener('cancel', e => {
    e.preventDefault();
    closeHelp();
  });
}

// Initial calculation and language set after DOM is ready
// Initialize immediately if DOM is already loaded (e.g. when scripts are
// injected after `DOMContentLoaded` fired). Otherwise wait for the event.


const scenarioIcons = {
  Indoor: iconGlyph('\uF194', ICON_FONT_KEYS.ESSENTIAL),
  Outdoor: iconGlyph('\uF278', ICON_FONT_KEYS.ESSENTIAL),
  Studio: iconGlyph('\uF128', ICON_FONT_KEYS.FILM),
  Tripod: iconGlyph('\uF12C', ICON_FONT_KEYS.FILM),
  Handheld: iconGlyph('\uE93B', ICON_FONT_KEYS.UICONS),
  Easyrig: iconGlyph('\uE15B', ICON_FONT_KEYS.UICONS),
  'Cine Saddle': iconGlyph('\uF01B', ICON_FONT_KEYS.UICONS),
  Steadybag: iconGlyph('\uE925', ICON_FONT_KEYS.UICONS),
  Dolly: iconGlyph('\uF109', ICON_FONT_KEYS.FILM),
  Slider: iconGlyph('\uE112', ICON_FONT_KEYS.UICONS),
  Steadicam: iconGlyph('\uEFBD', ICON_FONT_KEYS.UICONS),
  Gimbal: iconGlyph('\uEA9C', ICON_FONT_KEYS.UICONS),
  Trinity: iconGlyph('\uEA4E', ICON_FONT_KEYS.UICONS),
  Rollcage: iconGlyph('\uF04C', ICON_FONT_KEYS.UICONS),
  'Car Mount': iconGlyph('\uE35B', ICON_FONT_KEYS.UICONS),
  Jib: iconGlyph('\uE553', ICON_FONT_KEYS.UICONS),
  'Undersling mode': iconGlyph('\uE0D8', ICON_FONT_KEYS.UICONS),
  Crane: iconGlyph('\uE554', ICON_FONT_KEYS.UICONS),
  'Remote Head': ICON_GLYPHS.controller,
  'Extreme cold (snow)': iconGlyph('\uF0FB', ICON_FONT_KEYS.UICONS),
  'Extreme rain': iconGlyph('\uE4A6', ICON_FONT_KEYS.UICONS),
  'Extreme heat': iconGlyph('\uE80F', ICON_FONT_KEYS.UICONS),
  'Rain Machine': iconGlyph('\uF153', ICON_FONT_KEYS.UICONS),
  'Slow Motion': iconGlyph('\uF373', ICON_FONT_KEYS.UICONS),
  'Battery Belt': ICON_GLYPHS.batteryBolt
};

function registerRequiredScenarioOptionEntriesGetter(getter) {
  if (typeof getter !== 'function') {
    return;
  }

  const scopes = getSessionRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      scope.getRequiredScenarioOptionEntries = getter;
    } catch (assignError) {
      try {
        Object.defineProperty(scope, 'getRequiredScenarioOptionEntries', {
          configurable: true,
          writable: true,
          value: getter,
        });
      } catch (defineError) {
        void defineError;
      }
    }
  }
}

function getRequiredScenarioOptionEntries() {
  const options = new Map();

  if (requiredScenariosSelect && requiredScenariosSelect.options) {
    Array.from(requiredScenariosSelect.options).forEach(option => {
      if (!option) return;
      if (option.disabled) return;
      const value = typeof option.value === 'string' ? option.value.trim() : '';
      if (!value) return;
      const label = typeof option.textContent === 'string' && option.textContent.trim()
        ? option.textContent.trim()
        : value;
      if (!options.has(value)) {
        options.set(value, label);
      }
    });
  }

  Object.keys(scenarioIcons).forEach(key => {
    if (typeof key !== 'string') return;
    const value = key.trim();
    if (!value || options.has(value)) {
      return;
    }
    options.set(value, value);
  });

  return Array.from(options.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
}

registerRequiredScenarioOptionEntriesGetter(getRequiredScenarioOptionEntries);

function updateRequiredScenariosSummary() {
  if (!requiredScenariosSelect || !requiredScenariosSummary) return;
  requiredScenariosSummary.innerHTML = '';
  let selected = Array.from(requiredScenariosSelect.selectedOptions).map(o => o.value);
  const hasDolly = selected.includes('Dolly');
  if (remoteHeadOption) {
    if (!hasDolly) {
      remoteHeadOption.hidden = true;
      remoteHeadOption.selected = false;
      selected = selected.filter(v => v !== 'Remote Head');
    } else {
      remoteHeadOption.hidden = false;
    }
  }
  if (
    hasDolly &&
    monitorSelect &&
    (!monitorSelect.value || monitorSelect.value === 'None')
  ) {
    const defaultMonitor = 'SmallHD Ultra 7';
    if (devices?.monitors?.[defaultMonitor]) {
      if (!Array.from(monitorSelect.options).some(o => o.value === defaultMonitor)) {
        const opt = document.createElement('option');
        opt.value = defaultMonitor;
        opt.textContent = defaultMonitor;
        monitorSelect.appendChild(opt);
      }
      monitorSelect.value = defaultMonitor;
      monitorSelect.dispatchEvent(new Event('change'));
    }
  }
  if (videoDistributionSelect) {
    const ensureOption = val => {
      let opt = Array.from(videoDistributionSelect.options).find(o => o.value === val);
      if (!opt) {
        opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        videoDistributionSelect.appendChild(opt);
      }
    };
    ensureOption('DoP Monitor 7" handheld');
    ensureOption('DoP Monitor 15-21"');
  }
  selected.forEach(val => {
    const box = document.createElement('span');
    box.className = 'scenario-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'scenario-icon icon-glyph';
    applyIconGlyph(iconSpan, scenarioIcons[val] || ICON_GLYPHS.pin);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(val));
    requiredScenariosSummary.appendChild(box);
  });
  if (tripodPreferencesRow) {
    if (selected.includes('Tripod')) {
      tripodPreferencesRow.classList.remove('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.remove('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.remove('hidden');
    } else {
      tripodPreferencesRow.classList.add('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.add('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.add('hidden');
      if (tripodHeadBrandSelect) tripodHeadBrandSelect.value = '';
      if (tripodBowlSelect) tripodBowlSelect.value = '';
      if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(o => { o.selected = false; });
      if (tripodSpreaderSelect) tripodSpreaderSelect.value = '';
      updateTripodOptions();
    }
  }
}

function initApp() {
  try {
    ensureCriticalStorageBackupsFn();
  } catch (criticalGuardError) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('Critical storage backup guard failed during initialization', criticalGuardError);
    }
  }
  const resolvedFilterSelect = resolveFilterSelectElement();
  if (sharedLinkRow) {
    sharedLinkRow.classList.remove('hidden');
  }
  applySetLanguage(currentLang);
  populateEnvironmentDropdowns();
  populateLensDropdown();
  populateFilterDropdown();
  if (resolvedFilterSelect) {
    resolvedFilterSelect.addEventListener('change', renderFilterDetails);
    resolvedFilterSelect.addEventListener('change', () => {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  schedulePostRenderTask(() => {
    document.querySelectorAll('#projectForm select')
      .forEach(sel => {
        attachSelectSearch(sel);
        callSessionCoreFunction('initFavoritableSelect', [sel], { defer: true });
      });
  });
  schedulePostRenderTask(() => {
    if (
      typeof globalThis !== 'undefined'
      && typeof globalThis.setupInstallBanner === 'function'
    ) {
      try {
        globalThis.setupInstallBanner();
      } catch (installError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to set up install banner', installError);
        }
      }
    }
    if (typeof maybeShowIosPwaHelp === 'function') {
      try {
        maybeShowIosPwaHelp();
      } catch (iosHelpError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to display iOS PWA help prompt', iosHelpError);
        }
      }
    }
  });
  resetDeviceForm();
  if (typeof ensureDefaultProjectInfoSnapshot === 'function') {
    ensureDefaultProjectInfoSnapshot();
  } else if (typeof window !== 'undefined' && typeof window.ensureDefaultProjectInfoSnapshot === 'function') {
    window.ensureDefaultProjectInfoSnapshot();
  }
  restoreSessionState();
  applySharedSetupFromUrl();
  if (requiredScenariosSelect) {
    requiredScenariosSelect.addEventListener('change', updateRequiredScenariosSummary);
    updateRequiredScenariosSummary();
  }
  if (tripodHeadBrandSelect) {
    tripodHeadBrandSelect.addEventListener('change', updateTripodOptions);
  }
  if (tripodBowlSelect) {
    tripodBowlSelect.addEventListener('change', updateTripodOptions);
  }
  updateTripodOptions();
  updateViewfinderExtensionVisibility();
  updateCalculations();
  applyFilters();
}

function ensureFeedbackTemperatureOptionsSafe(select) {
  if (!select) return;
  if (typeof ensureFeedbackTemperatureOptions === 'function') {
    ensureFeedbackTemperatureOptions(select);
    return;
  }

  const minTemp = typeof FEEDBACK_TEMPERATURE_MIN === 'number' ? FEEDBACK_TEMPERATURE_MIN : -20;
  const maxTemp = typeof FEEDBACK_TEMPERATURE_MAX_LIMIT === 'number' ? FEEDBACK_TEMPERATURE_MAX_LIMIT : 50;
  const expectedOptions = maxTemp - minTemp + 2;
  if (select.options.length === expectedOptions) {
    return;
  }

  const previousValue = select.value;
  select.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  emptyOpt.textContent = '';
  select.appendChild(emptyOpt);

  for (let temp = minTemp; temp <= maxTemp; temp += 1) {
    const opt = document.createElement('option');
    opt.value = String(temp);
    opt.textContent = String(temp);
    select.appendChild(opt);
  }

  if (previousValue) {
    const previousOption = Array.from(select.options).find(option => option.value === previousValue);
    if (previousOption) {
      select.value = previousValue;
    }
  }
}

function updateFeedbackTemperatureOptionsSafe() {
  if (typeof updateFeedbackTemperatureOptions === 'function') {
    updateFeedbackTemperatureOptions();
    return;
  }

  const tempSelect = document.getElementById('fbTemperature');
  if (!tempSelect) return;

  ensureFeedbackTemperatureOptionsSafe(tempSelect);
  Array.from(tempSelect.options).forEach(option => {
    if (!option) return;
    if (option.value === '') {
      option.textContent = '';
      return;
    }
    option.textContent = `${option.value}°C`;
  });
}

const POST_RENDER_TIMEOUT_MS = 120;

function schedulePostRenderTask(task, options = {}) {
  if (typeof task !== 'function') {
    return;
  }

  const timeout = typeof options.timeout === 'number' && options.timeout >= 0
    ? options.timeout
    : POST_RENDER_TIMEOUT_MS;

  const runTaskSafely = (deadline) => {
    try {
      task(deadline);
    } catch (taskError) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Deferred task failed during post-render scheduling', taskError);
      }
    }
  };

  const scheduleIdle = () => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(runTaskSafely, { timeout });
      return;
    }

    setTimeout(runTaskSafely, timeout);
  };

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scheduleIdle);
  } else {
    scheduleIdle();
  }
}

function populateEnvironmentDropdowns() {
  const tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    ensureFeedbackTemperatureOptionsSafe(tempSelect);
    updateFeedbackTemperatureOptionsSafe();
  }

}

function populateLensDropdown() {
  if (!lensSelect) return;

  const normalizeFocusScaleValue = (value) => {
    if (typeof value !== 'string') {
      return '';
    }
    const normalized = value.trim().toLowerCase();
    return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
  };
  const resolveFocusScaleMode = () => {
    const scope =
      (typeof globalThis !== 'undefined' && globalThis)
      || (typeof window !== 'undefined' && window)
      || (typeof self !== 'undefined' && self)
      || (typeof global !== 'undefined' && global)
      || null;
    const scopePreference = scope && typeof scope.focusScalePreference === 'string'
      ? scope.focusScalePreference
      : null;
    const fallbackPreference =
      typeof sessionFocusScale !== 'undefined' && sessionFocusScale
        ? sessionFocusScale
        : typeof focusScalePreference === 'string'
          ? focusScalePreference
          : null;
    const rawPreference = scopePreference || fallbackPreference || 'metric';
    if (typeof normalizeFocusScale === 'function') {
      try {
        const normalized = normalizeFocusScale(rawPreference);
        if (normalized === 'imperial' || normalized === 'metric') {
          return normalized;
        }
      } catch (normalizeError) {
        void normalizeError;
      }
    }
    const normalized = normalizeFocusScaleValue(rawPreference);
    return normalized || 'metric';
  };
  const focusScaleMode = resolveFocusScaleMode();
  const useImperialFocusScale = focusScaleMode === 'imperial';
  const resolveLensFocusScaleMode = (lens) => {
    if (!lens || typeof lens !== 'object') {
      return focusScaleMode;
    }
    if (typeof normalizeFocusScale === 'function') {
      try {
        const normalized = normalizeFocusScale(lens.focusScale);
        if (normalized === 'imperial' || normalized === 'metric') {
          return normalized;
        }
      } catch (lensNormalizeError) {
        void lensNormalizeError;
      }
    }
    const override = normalizeFocusScaleValue(lens.focusScale);
    return override || focusScaleMode;
  };
  const { lang: focusScaleLang } = resolveCompatibilityTexts();
  const formatLensNumber = (value, options = {}) => {
    const numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    const maximumFractionDigits = typeof options.maximumFractionDigits === 'number'
      ? options.maximumFractionDigits
      : 0;
    const minimumFractionDigits = typeof options.minimumFractionDigits === 'number'
      ? options.minimumFractionDigits
      : Math.min(0, maximumFractionDigits);
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      try {
        return new Intl.NumberFormat(focusScaleLang, {
          maximumFractionDigits,
          minimumFractionDigits,
        }).format(numeric);
      } catch (formatError) {
        void formatError;
      }
    }
    const digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
    try {
      return numeric.toFixed(digits);
    } catch (toFixedError) {
      void toFixedError;
    }
    return String(numeric);
  };
  const formatLensWeight = (value, mode = focusScaleMode) => {
    const numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    const useImperial = mode === 'imperial';
    if (useImperial) {
      const pounds = numeric / 453.59237;
      const digits = pounds >= 10 ? 1 : 2;
      const formatted = formatLensNumber(pounds, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
      return formatted ? `${formatted} lb` : '';
    }
    const formatted = formatLensNumber(numeric, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
    return formatted ? `${formatted} g` : '';
  };
  const formatLensDiameter = (value, mode = focusScaleMode) => {
    const numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    const useImperial = mode === 'imperial';
    if (useImperial) {
      const inches = numeric / 25.4;
      const digits = inches >= 10 ? 1 : 2;
      const formatted = formatLensNumber(inches, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
      return formatted ? `${formatted} in` : '';
    }
    const formatted = formatLensNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 });
    return formatted ? `${formatted} mm` : '';
  };
  const formatLensMinFocus = (value, mode = focusScaleMode) => {
    const numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    const useImperial = mode === 'imperial';
    if (useImperial) {
      const feet = numeric * 3.280839895;
      const digits = feet < 10 ? 2 : 1;
      const formatted = formatLensNumber(feet, { maximumFractionDigits: digits, minimumFractionDigits: digits });
      return formatted ? `${formatted} ft` : '';
    }
    const digits = numeric < 1 ? 2 : 1;
    const formatted = formatLensNumber(numeric, { maximumFractionDigits: digits, minimumFractionDigits: digits });
    return formatted ? `${formatted} m` : '';
  };

  const lensData =
    (devices && devices.lenses && Object.keys(devices.lenses).length ? devices.lenses : null)
    || (devices && devices.accessories && devices.accessories.lenses)
    || null;

  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }

  const previousSelection = new Set(Array.from(lensSelect.selectedOptions || []).map(opt => opt.value));

  const fragment = document.createDocumentFragment();

  if (!lensSelect.multiple) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    fragment.appendChild(emptyOpt);
  }

  const lensNames = Object.keys(lensData);
  const sortFn = typeof localeSort === 'function' ? localeSort : undefined;
  lensNames.sort(sortFn);

  for (let index = 0; index < lensNames.length; index += 1) {
    const name = lensNames[index];
    const opt = document.createElement('option');
    opt.value = name;
    const lens = lensData[name] || {};
    const lensFocusScaleMode = resolveLensFocusScaleMode(lens);
    const attrs = [];
    const formattedWeight = formatLensWeight(lens.weight_g, lensFocusScaleMode);
    if (formattedWeight) attrs.push(formattedWeight);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) {
        const formattedDiameter = formatLensDiameter(lens.frontDiameterMm, lensFocusScaleMode);
        attrs.push(formattedDiameter ? `${formattedDiameter} clamp-on` : 'clamp-on');
      }
      else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
    if (Number.isFinite(minFocus) && minFocus > 0) {
      const formattedMinFocus = formatLensMinFocus(minFocus, lensFocusScaleMode);
      if (formattedMinFocus) {
        attrs.push(`${formattedMinFocus} min focus`);
      }
    }
    opt.textContent = attrs.length ? `${name} (${attrs.join(', ')})` : name;
    if (previousSelection.has(name)) {
      opt.selected = true;
    }
    fragment.appendChild(opt);
  }

  lensSelect.innerHTML = '';
  lensSelect.appendChild(fragment);

  if (typeof updateLensWorkflowCatalog === 'function') {
    try {
      updateLensWorkflowCatalog({ preserveSelections: true, skipEvent: true, skipDirty: true });
    } catch (catalogError) {
      void catalogError;
    }
  }
}

function populateCameraPropertyDropdown(selectId, property, selected = '') {
  const dropdown = document.getElementById(selectId);
  if (!dropdown) return;

  dropdown.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  dropdown.appendChild(emptyOpt);

  const camKey = cameraSelect && cameraSelect.value;
  const values =
    camKey && devices && devices.cameras && devices.cameras[camKey]
      ? devices.cameras[camKey][property]
      : null;
  if (Array.isArray(values)) {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      if (v === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
  }
}

function populateRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}

const recordingFrameRateInput =
  typeof document !== 'undefined'
    ? document.getElementById('recordingFrameRate')
    : null;

const recordingFrameRateHint =
  typeof document !== 'undefined'
    ? document.getElementById('recordingFrameRateHint')
    : null;

const recordingFrameRateOptionsList =
  typeof document !== 'undefined'
    ? document.getElementById('recordingFrameRateOptions')
    : null;

slowMotionRecordingFrameRateInput =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionRecordingFrameRate')
    : null;

slowMotionRecordingFrameRateHint =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionRecordingFrameRateHint')
    : null;

slowMotionRecordingFrameRateOptionsList =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionRecordingFrameRateOptions')
    : null;

sensorModeDropdown =
  typeof document !== 'undefined'
    ? document.getElementById('sensorMode')
    : null;

slowMotionSensorModeDropdown =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionSensorMode')
    : null;

recordingResolutionDropdown =
  typeof document !== 'undefined'
    ? document.getElementById('recordingResolution')
    : null;

slowMotionRecordingResolutionDropdown =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionRecordingResolution')
    : null;

slowMotionAspectRatioSelect =
  typeof document !== 'undefined'
    ? document.getElementById('slowMotionAspectRatio')
    : null;

const PREFERRED_FRAME_RATE_VALUES = Object.freeze([
  0.75,
  1,
  8,
  12,
  12.5,
  15,
  23.976,
  24,
  25,
  29.97,
  30,
  47.952,
  48,
  50,
  59.94,
  60,
  72,
  75,
  90,
  96,
  100,
  110,
  112,
  120,
  144,
  150,
  160,
  170,
  180,
  200,
  240,
]);

const FALLBACK_FRAME_RATE_VALUES = Object.freeze([
  '0.75',
  '1',
  '8',
  '12',
  '12.5',
  '15',
  '23.976',
  '24',
  '25',
  '29.97',
  '30',
  '48',
  '50',
  '59.94',
  '60',
  '72',
  '75',
  '90',
  '96',
  '100',
  '110',
  '112',
  '120',
  '144',
  '150',
  '160',
  '170',
  '180',
  '200',
  '240',
]);

const MIN_RECORDING_FRAME_RATE = 1;
const FRAME_RATE_RANGE_TOLERANCE = 0.0005;

function formatFrameRateValue(value) {
  const numeric = typeof value === 'number' ? value : Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return '';
  const rounded = Math.round(numeric * 1000) / 1000;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
}

function tokenizeFrameRateContext(value) {
  if (typeof value !== 'string' || !value) return [];

  const normalizedValue = value.toLowerCase();
  const baseTokens = normalizedValue
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[()]/g, ' ')
    .replace(/[[\]]/g, ' ')
    .split(/[\s,/]+/)
    .map(token => token.replace(/[^a-z0-9:.+-]/g, '').replace(/^[:.+-]+|[:.+-]+$/g, ''))
    .filter(token => token && token !== 'fps');

  const tokens = new Set(baseTokens);
  const addAliasToken = alias => {
    if (!alias) return;
    const normalizedAlias = alias.replace(/[^a-z0-9]/g, '');
    if (normalizedAlias) {
      tokens.add(normalizedAlias);
    }
  };

  const resolutionValue = normalizedValue.replace(/\u00d7/g, 'x');
  const compactValue = resolutionValue.replace(/\s+/g, '');
  const includes = text => resolutionValue.includes(text);
  const compactIncludes = text => compactValue.includes(text);

  if (
    includes('uhd') ||
    includes('ultra hd') ||
    compactIncludes('ultrahd') ||
    /3840\s*x\s*2160/.test(resolutionValue)
  ) {
    addAliasToken('uhd');
    addAliasToken('4k');
  }

  if (
    includes('dci') ||
    /4096\s*x\s*2160/.test(resolutionValue)
  ) {
    addAliasToken('dci');
    addAliasToken('4k');
  }

  if (
    compactIncludes('2048x1080') ||
    /2048\s*x\s*1080/.test(resolutionValue) ||
    /(?:^|[^a-z0-9])2k(?:[^a-z0-9]|$)/.test(resolutionValue)
  ) {
    addAliasToken('2k');
    addAliasToken('dci');
  }

  if (
    compactIncludes('fullhd') ||
    includes('full hd') ||
    includes('full-hd') ||
    includes('fhd') ||
    includes('1080p') ||
    /1920\s*x\s*1080/.test(resolutionValue)
  ) {
    addAliasToken('hd');
    addAliasToken('fhd');
    addAliasToken('1080p');
  }

  if (
    includes('720p') ||
    /1280\s*x\s*720/.test(resolutionValue)
  ) {
    addAliasToken('hd');
    addAliasToken('720p');
  }

  if (/(?:^|[^a-z0-9])6k(?:[^a-z0-9]|$)/.test(resolutionValue)) {
    addAliasToken('6k');
  }

  if (/(?:^|[^a-z0-9])8k(?:[^a-z0-9]|$)/.test(resolutionValue)) {
    addAliasToken('8k');
  }

  if (/(?:^|[^a-z0-9])4k(?:[^a-z0-9]|$)/.test(resolutionValue) || includes('4k')) {
    addAliasToken('4k');
  }

  return Array.from(tokens);
}

function normalizeMatchTarget(value) {
  if (typeof value !== 'string' || !value) {
    return '';
  }
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function includePreferredValuesForRange(minValue, maxValue, set) {
  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || !set) {
    return;
  }
  const low = Math.min(minValue, maxValue);
  const high = Math.max(minValue, maxValue);
  PREFERRED_FRAME_RATE_VALUES.forEach(candidate => {
    if (candidate >= low - 0.0005 && candidate <= high + 0.0005) {
      const formatted = formatFrameRateValue(candidate);
      if (formatted) {
        set.add(formatted);
      }
    }
  });
}

function parseFrameRateNumericValues(entry) {
  if (typeof entry !== 'string' || !entry.trim()) {
    return [];
  }

  const normalized = entry.replace(/[\u2013\u2014]/g, '-');
  const parts = normalized.split(':');
  const numericSection = parts.length > 1 ? parts.slice(1).join(':') : normalized;
  const values = new Set();

  const rangePattern = /(\d+(?:\.\d+)?)(?:\s*(?:-|to)\s*)(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
  let match = rangePattern.exec(numericSection);
  while (match) {
    const minStr = match[1];
    const maxStr = match[2];
    const minVal = Number.parseFloat(minStr);
    const maxVal = Number.parseFloat(maxStr);
    const minFormatted = formatFrameRateValue(minVal);
    const maxFormatted = formatFrameRateValue(maxVal);
    if (minFormatted) values.add(minFormatted);
    if (maxFormatted) values.add(maxFormatted);
    includePreferredValuesForRange(minVal, maxVal, values);
    match = rangePattern.exec(numericSection);
  }

  const upToPattern = /(?:up to|≤|<=|less than|max(?:imum)?(?:\s*of)?)\s*(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/gi;
  while ((match = upToPattern.exec(numericSection))) {
    const formatted = formatFrameRateValue(match[1]);
    if (formatted) {
      values.add(formatted);
      includePreferredValuesForRange(0, Number.parseFloat(match[1]), values);
    }
  }

  const explicitPattern = /(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
  while ((match = explicitPattern.exec(numericSection))) {
    const formatted = formatFrameRateValue(match[1]);
    if (formatted) {
      values.add(formatted);
    }
  }

  if (!values.size) {
    const commaSection = numericSection.split('fps')[0] || numericSection;
    const listPattern = /(\d+(?:\.\d+)?)/g;
    while ((match = listPattern.exec(commaSection))) {
      const formatted = formatFrameRateValue(match[1]);
      if (formatted) {
        values.add(formatted);
      }
    }
  }

  return Array.from(values);
}

function normalizeRecordingFrameRateValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return formatFrameRateValue(value);
  }
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const numericMatch = trimmed.match(/-?\d+(?:\.\d+)?/);
  if (!numericMatch) {
    return trimmed;
  }
  return formatFrameRateValue(numericMatch[0]) || trimmed;
}

function buildFrameRateSuggestions(entries, contextTokens) {
  const suggestions = new Map();
  const groups = contextTokens.filter(group => Array.isArray(group) && group.length);

  entries.forEach((entry) => {
    if (typeof entry !== 'string') return;
    const cleaned = entry.trim();
    if (!cleaned) return;
    const [label] = cleaned.split(':');
    const entryTokens = tokenizeFrameRateContext(label);
    const numericValues = parseFrameRateNumericValues(cleaned);
    const baseScore = entryTokens.length ? 1 : 0;
    let score = baseScore;
    if (groups.length && entryTokens.length) {
      const tokenSet = new Set(entryTokens);
      groups.forEach(group => {
        let matches = 0;
        group.forEach(token => {
          if (tokenSet.has(token)) {
            matches += 1;
          }
        });
        if (matches) {
          score += matches * 3;
          if (matches === group.length) {
            score += 2;
          }
        }
      });
    }

    numericValues.forEach(rawValue => {
      const formatted = formatFrameRateValue(rawValue);
      if (!formatted) return;
      const existing = suggestions.get(formatted);
      if (!existing || score > existing.score) {
        suggestions.set(formatted, { score, label: cleaned, tokens: entryTokens });
      }
    });
  });

  if (!suggestions.size) {
    return {
      values: Array.from(FALLBACK_FRAME_RATE_VALUES),
      metadata: new Map(),
    };
  }

  const sortedEntries = Array.from(suggestions.entries()).sort((a, b) => {
    if (b[1].score !== a[1].score) {
      return b[1].score - a[1].score;
    }
    const aNum = Number.parseFloat(a[0]);
    const bNum = Number.parseFloat(b[0]);
    if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
      return aNum - bNum;
    }
    return a[0].localeCompare(b[0]);
  });

  return {
    values: sortedEntries.map(([value]) => value),
    metadata: new Map(sortedEntries),
  };
}

function findMaxFrameRateForSensor(entries, sensorTokens, sensorLabel = '') {
  if (!Array.isArray(entries) || !entries.length) {
    return null;
  }
  if (!Array.isArray(sensorTokens) || !sensorTokens.length) {
    return null;
  }

  const sensorTokenSet = new Set(sensorTokens);
  if (!sensorTokenSet.size) {
    return null;
  }

  const normalizedSensorLabel = normalizeMatchTarget(sensorLabel);
  const normalizedSensorTokens = new Set(
    sensorTokens
      .map(normalizeMatchTarget)
      .filter(Boolean)
  );

  let bestMatchScore = 0;
  let bestMaxValue = Number.NEGATIVE_INFINITY;

  entries.forEach(entry => {
    if (typeof entry !== 'string') return;
    const cleaned = entry.trim();
    if (!cleaned) return;

    const [label] = cleaned.split(':');
    const entryTokens = tokenizeFrameRateContext(label);
    const numericValues = parseFrameRateNumericValues(cleaned)
      .map(value => Number.parseFloat(value))
      .filter(Number.isFinite);

    if (!numericValues.length) {
      return;
    }

    let matchScore = 0;
    const normalizedEntryLabel = normalizeMatchTarget(label);
    const normalizedEntryTokens = entryTokens
      .map(normalizeMatchTarget)
      .filter(Boolean);

    entryTokens.forEach(token => {
      if (sensorTokenSet.has(token)) {
        matchScore += 4;
      }
    });

    normalizedEntryTokens.forEach(entryToken => {
      if (normalizedSensorTokens.has(entryToken)) {
        matchScore += 2;
        return;
      }
      for (const sensorToken of normalizedSensorTokens) {
        if (sensorToken && entryToken.includes(sensorToken)) {
          matchScore += 1;
          break;
        }
      }
    });

    if (
      normalizedSensorLabel &&
      normalizedEntryLabel &&
      normalizedEntryLabel.includes(normalizedSensorLabel)
    ) {
      matchScore += Math.max(sensorTokenSet.size * 4, 8);
    }

    if (!matchScore) {
      return;
    }

    const entryMaxValue = Math.max(...numericValues);
    if (
      matchScore > bestMatchScore ||
      (matchScore === bestMatchScore && entryMaxValue > bestMaxValue)
    ) {
      bestMatchScore = matchScore;
      bestMaxValue = entryMaxValue;
    }
  });

  if (!bestMatchScore || !Number.isFinite(bestMaxValue)) {
    return null;
  }

  return bestMaxValue;
}

function getFrameRateInputValue(input) {
  if (!input) return '';
  const raw = input.value;
  return typeof raw === 'string' ? raw.trim() : '';
}

function getCurrentFrameRateInputValue() {
  return getFrameRateInputValue(recordingFrameRateInput);
}

function collectFrameRateContextTokens(select) {
  if (!select) {
    return [];
  }
  if (select.multiple) {
    return Array.from(select.selectedOptions || [])
      .map(option => tokenizeFrameRateContext(option && option.value))
      .reduce((acc, tokens) => (tokens && tokens.length ? acc.concat(tokens) : acc), []);
  }
  const value = typeof select.value === 'string' ? select.value : '';
  return tokenizeFrameRateContext(value);
}

function populateFrameRateDropdownFor(config = {}) {
  const {
    selected = '',
    recordingInput,
    optionsList,
    sensorSelect,
    resolutionSelect,
    aspectSelect,
    hintElement,
  } = config;

  if (!recordingInput || !optionsList) {
    return;
  }

  const normalizedSelected = normalizeRecordingFrameRateValue(selected);
  let currentValue = normalizedSelected || getFrameRateInputValue(recordingInput);
  const camKey = cameraSelect && cameraSelect.value;
  const frameRateEntries =
    camKey && devices && devices.cameras && devices.cameras[camKey]
      ? devices.cameras[camKey].frameRates
      : null;

  const sensorValue = sensorSelect && typeof sensorSelect.value === 'string'
    ? sensorSelect.value
    : '';
  const sensorTokens = tokenizeFrameRateContext(sensorValue);
  const resolutionValue = resolutionSelect && typeof resolutionSelect.value === 'string'
    ? resolutionSelect.value
    : '';
  const resolutionTokens = tokenizeFrameRateContext(resolutionValue);
  const aspectTokens = collectFrameRateContextTokens(aspectSelect);

  const sensorModeMaxFrameRate = findMaxFrameRateForSensor(
    Array.isArray(frameRateEntries) ? frameRateEntries : [],
    sensorTokens,
    sensorValue
  );
  const resolutionMaxFrameRate = findMaxFrameRateForSensor(
    Array.isArray(frameRateEntries) ? frameRateEntries : [],
    resolutionTokens,
    recordingResolutionDropdown && recordingResolutionDropdown.value
  );

  const { values: suggestions } = buildFrameRateSuggestions(
    Array.isArray(frameRateEntries) ? frameRateEntries : [],
    [
      sensorTokens,
      resolutionTokens,
      aspectTokens,
    ]
  );

  optionsList.innerHTML = '';
  const uniqueValues = new Set();
  const filteredSuggestions = [];
  const numericCandidates = [];
  const allowedMaxCandidates = [];
  if (Number.isFinite(sensorModeMaxFrameRate)) {
    allowedMaxCandidates.push(sensorModeMaxFrameRate);
  }
  if (Number.isFinite(resolutionMaxFrameRate)) {
    allowedMaxCandidates.push(resolutionMaxFrameRate);
  }
  const allowedMaxFrameRate = allowedMaxCandidates.length
    ? Math.min(...allowedMaxCandidates)
    : null;

  suggestions.forEach(originalValue => {
    if (!originalValue) return;
    let value = originalValue;
    const numeric = Number.parseFloat(value);
    if (Number.isFinite(numeric)) {
      if (numeric + FRAME_RATE_RANGE_TOLERANCE < MIN_RECORDING_FRAME_RATE) {
        return;
      }
      if (
        allowedMaxFrameRate !== null &&
        numeric > allowedMaxFrameRate + FRAME_RATE_RANGE_TOLERANCE
      ) {
        return;
      }
      const formatted = formatFrameRateValue(numeric);
      if (formatted) {
        value = formatted;
      }
      numericCandidates.push({ numeric, formatted: value });
    }
    if (uniqueValues.has(value)) return;
    uniqueValues.add(value);
    filteredSuggestions.push(value);
    const opt = document.createElement('option');
    opt.value = value;
    optionsList.appendChild(opt);
  });

  if (currentValue && !uniqueValues.has(currentValue)) {
    const numericForList = Number.parseFloat(currentValue);
    if (
      !Number.isFinite(numericForList) ||
      numericForList + FRAME_RATE_RANGE_TOLERANCE >= MIN_RECORDING_FRAME_RATE
    ) {
      const opt = document.createElement('option');
      opt.value = currentValue;
      optionsList.appendChild(opt);
    }
  }

  const maxCandidate = numericCandidates.reduce(
    (best, entry) => (entry.numeric > best.numeric ? entry : best),
    { numeric: Number.NEGATIVE_INFINITY, formatted: '' }
  );
  let maxFrameRate = maxCandidate.numeric;
  if (Number.isFinite(allowedMaxFrameRate)) {
    maxFrameRate = Number.isFinite(maxFrameRate)
      ? Math.min(maxFrameRate, allowedMaxFrameRate)
      : allowedMaxFrameRate;
  }
  const formattedMaxFrameRate = Number.isFinite(maxFrameRate)
    ? maxCandidate.formatted || formatFrameRateValue(maxFrameRate)
    : '';
  const minValue = formatFrameRateValue(MIN_RECORDING_FRAME_RATE);
  const numericCurrent = Number.parseFloat(currentValue);
  let adjustedValue = currentValue;
  let valueChanged = false;

  if (
    Number.isFinite(maxFrameRate) &&
    Number.isFinite(numericCurrent) &&
    numericCurrent > maxFrameRate + FRAME_RATE_RANGE_TOLERANCE
  ) {
    const clampedValue = formattedMaxFrameRate || formatFrameRateValue(maxFrameRate);
    if (clampedValue) {
      adjustedValue = clampedValue;
      if (adjustedValue !== currentValue) {
        valueChanged = true;
      }
    }
  }

  if (
    minValue &&
    Number.isFinite(numericCurrent) &&
    numericCurrent + FRAME_RATE_RANGE_TOLERANCE < MIN_RECORDING_FRAME_RATE
  ) {
    adjustedValue = minValue;
    if (adjustedValue !== currentValue) {
      valueChanged = true;
    }
  }

  if (valueChanged) {
    recordingInput.value = adjustedValue;
    currentValue = adjustedValue;
    recordingInput.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    recordingInput.value = currentValue;
  }

  const placeholderCandidate = filteredSuggestions[0];
  if (!currentValue && placeholderCandidate) {
    recordingInput.placeholder = placeholderCandidate;
  } else if (recordingInput.placeholder) {
    recordingInput.placeholder = '';
  }

  if (minValue) {
    recordingInput.min = minValue;
  }

  if (formattedMaxFrameRate) {
    recordingInput.setAttribute('max', formattedMaxFrameRate);
  } else {
    recordingInput.removeAttribute('max');
  }

  if (hintElement) {
    let hintMessage = '';
    if (formattedMaxFrameRate) {
      const template = hintElement.getAttribute('data-range-template');
      hintMessage = template
        ? template.replace('{max}', formattedMaxFrameRate)
        : `Enter a recording frame rate from ${minValue} to ${formattedMaxFrameRate} fps.`;
    } else {
      hintMessage = hintElement.getAttribute('data-default-message') || '';
    }
    hintElement.textContent = hintMessage;
    hintElement.hidden = !hintMessage;
  }
}

function populateFrameRateDropdown(selected = '') {
  populateFrameRateDropdownFor({
    selected,
    recordingInput: recordingFrameRateInput,
    optionsList: recordingFrameRateOptionsList,
    sensorSelect: sensorModeDropdown,
    resolutionSelect: recordingResolutionDropdown,
    hintElement: recordingFrameRateHint,
  });
}

function populateSlowMotionFrameRateDropdown(selected = '') {
  populateFrameRateDropdownFor({
    selected,
    recordingInput: slowMotionRecordingFrameRateInput,
    optionsList: slowMotionRecordingFrameRateOptionsList,
    sensorSelect: slowMotionSensorModeDropdown,
    resolutionSelect: slowMotionRecordingResolutionDropdown,
    aspectSelect: slowMotionAspectRatioSelect,
    hintElement: slowMotionRecordingFrameRateHint,
  });
}

function populateSlowMotionRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('slowMotionRecordingResolution', 'resolutions', selected);
}

function populateSlowMotionSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('slowMotionSensorMode', 'sensorModes', selected);
}

function populateSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}

function populateCodecDropdown(selected = '') {
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}

function populateFilterDropdown() {
  const select = resolveFilterSelectElement();
  if (select && devices && Array.isArray(devices.filterOptions)) {
    const fragment = document.createDocumentFragment();
    if (!select.multiple) {
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      fragment.appendChild(emptyOpt);
    }
    for (let index = 0; index < devices.filterOptions.length; index += 1) {
      const value = devices.filterOptions[index];
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      fragment.appendChild(opt);
    }
    select.innerHTML = '';
    select.appendChild(fragment);
  }
}

const filterId = t => t.replace(/[^a-z0-9]/gi, '_');

function getFilterValueConfig(type) {
  switch (type) {
    case 'IRND':
      return { opts: ['0.3', '0.6', '0.9', '1.2', '1.5', '1.8', '2.1', '2.5'], defaults: ['0.3', '1.2'] };
    case 'Diopter':
      return { opts: ['+1/4', '+1/2', '+1', '+2', '+3', '+4'], defaults: ['+1/2', '+1', '+2', '+4'] };
    case 'ND Grad HE':
      return {
        opts: ['0.3 HE Vertical', '0.6 HE Vertical', '0.9 HE Vertical', '1.2 HE Vertical', '0.3 HE Horizontal', '0.6 HE Horizontal', '0.9 HE Horizontal', '1.2 HE Horizontal'],
        defaults: ['0.3 HE Horizontal', '0.6 HE Horizontal', '0.9 HE Horizontal']
      };
    case 'ND Grad SE':
      return {
        opts: ['0.3 SE Vertical', '0.6 SE Vertical', '0.9 SE Vertical', '1.2 SE Vertical', '0.3 SE Horizontal', '0.6 SE Horizontal', '0.9 SE Horizontal', '1.2 SE Horizontal'],
        defaults: ['0.3 SE Horizontal', '0.6 SE Horizontal', '0.9 SE Horizontal']
      };
    default:
      return { opts: ['1', '1/2', '1/4', '1/8', '1/16'], defaults: ['1/2', '1/4', '1/8'] };
  }
}

const SESSION_DEFAULT_FILTER_SIZE = ensureSessionRuntimePlaceholder(
  'DEFAULT_FILTER_SIZE',
  () => '4x5.65'
);

function createFilterSizeSelect(type, selected = SESSION_DEFAULT_FILTER_SIZE, options = {}) {
  const { includeId = true, idPrefix = 'filter-size-' } = options;
  const sel = document.createElement('select');
  if (includeId) {
    sel.id = `${idPrefix}${filterId(type)}`;
  }
  let sizes = [SESSION_DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [SESSION_DEFAULT_FILTER_SIZE, '6x6', '95mm'];
  sizes.forEach(s => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    if (s === selected) o.selected = true;
    sel.appendChild(o);
  });
  return sel;
}

/* exported createFilterValueSelect */
function createFilterValueSelect(type, selected) {
  const sel = document.createElement('select');
  sel.id = `filter-values-${filterId(type)}`;
  // Allow selecting multiple strengths for a given filter
  // Use both the property and attribute to ensure HTML serialization
  sel.multiple = true;
  sel.setAttribute('multiple', '');
  const { opts, defaults = [] } = getFilterValueConfig(type);
  const selectedVals = Array.isArray(selected)
    ? selected.slice()
    : defaults.slice();
  const syncOption = (option, isSelected) => {
    option.selected = isSelected;
    if (isSelected) {
      option.setAttribute('selected', '');
    } else {
      option.removeAttribute('selected');
    }
  };
  const syncCheckbox = (checkbox, isChecked) => {
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.setAttribute('checked', '');
    } else {
      checkbox.removeAttribute('checked');
    }
  };
  const optionsByValue = new Map();
  const optionFragment = document.createDocumentFragment();
  for (let index = 0; index < opts.length; index += 1) {
    const value = opts[index];
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    syncOption(opt, selectedVals.includes(value));
    optionsByValue.set(value, opt);
    optionFragment.appendChild(opt);
  }
  sel.appendChild(optionFragment);
  // Hidden select holds the values; checkboxes provide the UI
  sel.size = opts.length;
  sel.style.display = 'none';
  const container = document.createElement('span');
  container.className = 'filter-values-container';
  const checkboxName = `filterValues-${filterId(type)}`;
  const checkboxFragment = document.createDocumentFragment();
  const checkboxesByValue = new Map();
  for (let index = 0; index < opts.length; index += 1) {
    const value = opts[index];
    const lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = checkboxName;
    cb.value = value;
    syncCheckbox(cb, selectedVals.includes(value));
    cb.addEventListener('change', () => {
      const opt = optionsByValue.get(value);
      if (opt) {
        syncOption(opt, cb.checked);
      }
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(value));
    checkboxesByValue.set(value, cb);
    checkboxFragment.appendChild(lbl);
  }
  container.appendChild(checkboxFragment);
  sel.addEventListener('change', () => {
    optionsByValue.forEach((opt, value) => {
      const selected = !!opt && opt.selected;
      syncOption(opt, selected);
      const checkbox = checkboxesByValue.get(value);
      if (checkbox) {
        syncCheckbox(checkbox, selected);
      }
    });
  });
  container.appendChild(sel);
  return { container, select: sel };
}

function resolveFilterDisplayInfo(type, size = SESSION_DEFAULT_FILTER_SIZE) {
  switch (type) {
    case 'Diopter':
      return { label: 'Schneider CF DIOPTER FULL GEN2', gearName: 'Schneider CF DIOPTER FULL GEN2' };
    case 'Clear':
      return { label: 'Clear Filter', gearName: 'Clear Filter' };
    case 'IRND':
      return { label: 'IRND Filter Set', gearName: 'IRND Filter Set', hideDetails: false };
    case 'Pol':
      return { label: 'Pol Filter', gearName: 'Pol Filter' };
    case 'Rota-Pol': {
      if (size === '6x6') {
        return {
          label: 'ARRI Rota Pola Filter Frame (6x6)',
          gearName: 'ARRI Rota Pola Filter Frame (6x6)'
        };
      }
      if (size === '95mm') {
        return {
          label: 'Tilta 95mm Polarizer Filter for Tilta Mirage',
          gearName: 'Tilta 95mm Polarizer Filter for Tilta Mirage'
        };
      }
      return {
        label: 'ARRI Rota Pola Filter Frame',
        gearName: 'ARRI Rota Pola Filter Frame'
      };
    }
    case 'ND Grad HE':
      return { label: 'ND Grad HE Filter Set', gearName: 'ND Grad HE Filter Set', hideDetails: false };
    case 'ND Grad SE':
      return { label: 'ND Grad SE Filter Set', gearName: 'ND Grad SE Filter Set', hideDetails: false };
    default:
      return { label: `${type} Filter Set`, gearName: `${type} Filter Set`, hideDetails: true };
  }
}

function buildFilterGearEntries(filters = []) {
  const entries = [];
  filters.forEach(({ type, size = SESSION_DEFAULT_FILTER_SIZE, values }) => {
    if (!type) return;
    const sizeValue = size || SESSION_DEFAULT_FILTER_SIZE;
    const idBase = `filter-${filterId(type)}`;
    switch (type) {
      case 'Diopter': {
        entries.push({
          id: `${idBase}-frame`,
          gearName: 'ARRI Diopter Frame 138mm',
          label: 'ARRI Diopter Frame 138mm',
          type: '',
          size: '',
          values: []
        });
        const diopterValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: `${idBase}-set`,
          gearName: 'Schneider CF DIOPTER FULL GEN2',
          label: 'Schneider CF DIOPTER FULL GEN2',
          type,
          size: '',
          values: diopterValues
        });
        break;
      }
      case 'Clear': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: []
        });
        break;
      }
      case 'Pol': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: []
        });
        break;
      }
      case 'Rota-Pol': {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const displaySize = label.includes(sizeValue) ? '' : sizeValue;
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: displaySize,
          values: []
        });
        break;
      }
      case 'ND Grad HE':
      case 'ND Grad SE': {
        const { label, gearName, hideDetails } = resolveFilterDisplayInfo(type, sizeValue);
        const gradValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          hideDetails,
          type,
          size: sizeValue,
          values: gradValues
        });
        break;
      }
      default: {
        const { label, gearName, hideDetails } = resolveFilterDisplayInfo(type, sizeValue);
        const filterValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          hideDetails,
          type,
          size: sizeValue,
          values: filterValues
        });
      }
    }
  });
  return entries;
}

function updateGearListFilterEntries(entries = []) {
  if (!gearListOutput) return;
  const entryMap = new Map(entries.map(entry => [entry.id, entry]));
  gearListOutput.querySelectorAll('[data-filter-entry]').forEach(span => {
    const entryId = span.getAttribute('data-filter-entry');
    if (!entryId) return;
    const entry = entryMap.get(entryId);
    if (!entry) return;
    const labelText = typeof entry?.label === 'string' ? entry.label : '';
    span.textContent = labelText ? `1x ${labelText}` : '';
    span.setAttribute('data-gear-name', entry.gearName);
    span.setAttribute('data-filter-label', entry.label);
    if (entry.type) {
      span.setAttribute('data-filter-type', entry.type);
    } else {
      span.removeAttribute('data-filter-type');
    }
  });
}

function getGearListFilterDetailsContainer() {
  return gearListOutput ? gearListOutput.querySelector('#gearListFilterDetails') : null;
}

function filterTypeNeedsValueSelect(type) {
  return type === 'Diopter'
    || type === 'IRND'
    || type === 'ND Grad HE'
    || type === 'ND Grad SE'
    || (type !== 'Clear' && type !== 'Pol' && type !== 'Rota-Pol');
}

function createFilterStorageValueSelect(type, selected) {
  const select = document.createElement('select');
  select.id = `filter-values-${filterId(type)}`;
  select.multiple = true;
  select.setAttribute('multiple', '');
  select.hidden = true;
  select.setAttribute('aria-hidden', 'true');
  const { opts, defaults = [] } = getFilterValueConfig(type);
  const chosen = Array.isArray(selected) ? selected.slice() : defaults.slice();
  opts.forEach(value => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    if (chosen.includes(value)) {
      opt.selected = true;
      opt.setAttribute('selected', '');
    }
    select.appendChild(opt);
  });
  return select;
}

function resolveFilterDetailsStorageElement() {
  if (typeof filterDetailsStorage !== 'undefined' && filterDetailsStorage) {
    return filterDetailsStorage;
  }
  if (typeof document === 'undefined') return null;
  const element = document.getElementById('filterDetails');
  if (!element) return null;
  try {
    if (typeof globalThis !== 'undefined' && globalThis) {
      globalThis.filterDetailsStorage = element;
    } else if (typeof window !== 'undefined' && window) {
      window.filterDetailsStorage = element;
    }
  } catch (ex) {
    void ex;
  }
  return element;
}

function renderFilterDetailsStorage(details) {
  const storageRoot = resolveFilterDetailsStorageElement();
  if (!storageRoot) return;
  storageRoot.innerHTML = '';
  if (!details.length) {
    storageRoot.hidden = true;
    return;
  }
  storageRoot.hidden = true;
  details.forEach(detail => {
    const { type, size, values, needsSize, needsValues } = detail;
    if (needsSize) {
      const sizeSelect = createFilterSizeSelect(type, size);
      sizeSelect.hidden = true;
      sizeSelect.setAttribute('aria-hidden', 'true');
      sizeSelect.addEventListener('change', handleFilterDetailChange);
      storageRoot.appendChild(sizeSelect);
    }
    if (needsValues) {
      const valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      storageRoot.appendChild(valuesSelect);
    }
  });
}

function resolveGlobalScope() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof window !== 'undefined') return window;
  if (typeof self !== 'undefined') return self;
  if (typeof global !== 'undefined') return global;
  return null;
}

function ensureFilterDetailEditButton(element) {
  if (!element) return null;
  const existing = element.querySelector('.gear-item-edit-btn');
  if (existing) return existing;

  const doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;

  const scope = resolveGlobalScope();
  let editLabel = 'Edit item';
  const textGetter = scope && typeof scope.getGearItemEditTexts === 'function'
    ? scope.getGearItemEditTexts
    : null;
  if (textGetter) {
    try {
      const texts = textGetter.call(scope) || {};
      if (texts.editButtonLabel && typeof texts.editButtonLabel === 'string') {
        const trimmed = texts.editButtonLabel.trim();
        if (trimmed) {
          editLabel = trimmed;
        }
      }
    } catch {
      // Ignore localization lookup failures and use fallback label.
    }
  }

  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'gear-item-edit-btn';
  button.setAttribute('data-gear-edit', '');

  if (editLabel) {
    button.setAttribute('aria-label', editLabel);
    button.setAttribute('title', editLabel);
  }

  const setLabelWithIcon = scope && typeof scope.setButtonLabelWithIcon === 'function'
    ? scope.setButtonLabelWithIcon
    : null;
  const iconRegistry = scope && scope.ICON_GLYPHS ? scope.ICON_GLYPHS : null;
  const editGlyph = iconRegistry
    ? (
      iconRegistry.sliders
      || iconRegistry.gears
      || iconRegistry.gearList
      || iconRegistry.settingsGeneral
      || iconRegistry.note
      || null
    )
    : null;
  if (setLabelWithIcon && editGlyph) {
    setLabelWithIcon.call(scope, button, '', editGlyph);
  } else if (editLabel) {
    button.textContent = editLabel;
  }

  const noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan && noteSpan.parentNode === element) {
    element.insertBefore(button, noteSpan.nextSibling);
  } else {
    element.appendChild(button);
  }

  return button;
}

function renderGearListFilterDetails(details) {
  const container = getGearListFilterDetailsContainer();
  if (!container) return;
  container.innerHTML = '';
  if (!details.length) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  details.forEach(detail => {
    const {
      type,
      label,
      gearName,
      entryId,
      size,
      values,
      needsSize,
      needsValues
    } = detail;
    const row = document.createElement('div');
    row.className = 'filter-detail';
    if (gearName) {
      row.setAttribute('data-gear-name', gearName);
    }
    if (type) {
      row.setAttribute('data-filter-type', type);
    }
    const heading = document.createElement('div');
    heading.className = 'filter-detail-label gear-item';
    if (entryId) heading.setAttribute('data-filter-entry', entryId);
    if (gearName) heading.setAttribute('data-gear-name', gearName);
    if (label) {
      heading.setAttribute('data-filter-label', label);
      heading.setAttribute('data-gear-label', label);
    }
    if (type) heading.setAttribute('data-filter-type', type);
    const shouldHideSize = !!needsSize;
    if (shouldHideSize) {
      heading.setAttribute('data-filter-hide-size', '');
    } else {
      heading.removeAttribute('data-filter-hide-size');
    }
    heading.textContent = label ? `1x ${label}` : '';
    row.appendChild(heading);
    if (typeof enhanceGearItemElement === 'function') {
      enhanceGearItemElement(heading);
    }
    ensureFilterDetailEditButton(heading);
    const controls = document.createElement('div');
    controls.className = 'filter-detail-controls';
    if (needsSize) {
      const sizeLabel = document.createElement('label');
      sizeLabel.className = 'filter-detail-size';
      const sizeText = document.createElement('span');
      sizeText.className = 'filter-detail-sublabel';
      sizeText.textContent = 'Size';
      const sizeWrapper = document.createElement('span');
      sizeWrapper.className = 'select-wrapper';
      const sizeSelect = createFilterSizeSelect(type, size, { includeId: false });
      sizeSelect.setAttribute('data-storage-id', `filter-size-${filterId(type)}`);
      sizeSelect.addEventListener('change', () => {
        const storageId = sizeSelect.getAttribute('data-storage-id');
        if (!storageId) return;
        syncGearListFilterSize(storageId, sizeSelect.value);
      });
      sizeWrapper.appendChild(sizeSelect);
      sizeLabel.append(sizeText, sizeWrapper);
      controls.appendChild(sizeLabel);
    }
    if (needsValues) {
      const valuesWrap = document.createElement('div');
      valuesWrap.className = 'filter-detail-values';
      const valueLabel = document.createElement('span');
      valueLabel.className = 'filter-detail-sublabel';
      valueLabel.textContent = 'Strengths';
      const optionsWrap = document.createElement('span');
      optionsWrap.className = 'filter-values-container';
      optionsWrap.setAttribute('data-storage-values', `filter-values-${filterId(type)}`);
      const storageValuesId = optionsWrap.getAttribute('data-storage-values');
      const { opts, defaults = [] } = getFilterValueConfig(type);
      const checkboxName = `filterValues-${filterId(type)}`;
      const currentValues = values == null ? defaults : (Array.isArray(values) ? values : []);
      opts.forEach(value => {
        const lbl = document.createElement('label');
        lbl.className = 'filter-value-option';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.name = checkboxName;
        cb.value = value;
        if (currentValues.includes(value)) {
          cb.checked = true;
          cb.setAttribute('checked', '');
        }
        cb.addEventListener('change', () => {
          if (!storageValuesId) return;
          syncGearListFilterValue(storageValuesId, value, cb.checked);
        });
        lbl.append(cb, document.createTextNode(value));
        optionsWrap.appendChild(lbl);
      });
      valuesWrap.append(valueLabel, optionsWrap);
      controls.appendChild(valuesWrap);
    }
    row.appendChild(controls);
    container.appendChild(row);
  });
  adjustGearListSelectWidths(container);
}

function syncGearListFilterSize(storageId, value) {
  const storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  if (storageSelect.value !== value) {
    storageSelect.value = value;
  }
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  storageSelect.dispatchEvent(new Event('change'));
}

function syncGearListFilterValue(storageId, value, isSelected) {
  const storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  let changed = false;
  Array.from(storageSelect.options).forEach(opt => {
    if (opt.value !== value) return;
    if (opt.selected !== isSelected) {
      opt.selected = isSelected;
      changed = true;
      if (isSelected) {
        opt.setAttribute('selected', '');
      } else {
        opt.removeAttribute('selected');
      }
    }
  });
  if (changed) {
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    storageSelect.dispatchEvent(new Event('change'));
  }
}

function renderFilterDetails(providedTokens) {
  const select = resolveFilterSelectElement();
  if (!select) return;
  const selected = Array.from(select.selectedOptions).map(o => o.value).filter(Boolean);
  let existingTokens;
  if (Array.isArray(providedTokens)) {
    existingTokens = providedTokens
      .filter(token => token && token.type)
      .map(token => ({
        type: token.type,
        size: token.size,
        values: token.values === undefined
          ? undefined
          : (Array.isArray(token.values) ? token.values.slice() : token.values)
      }));
  } else {
    const existingSelections = collectFilterSelections();
    if (existingSelections) {
      existingTokens = parseFilterTokens(existingSelections);
    } else if (currentProjectInfo && currentProjectInfo.filter) {
      existingTokens = parseFilterTokens(currentProjectInfo.filter);
    } else {
      existingTokens = [];
    }
  }
  const existingMap = new Map(existingTokens.map(token => [token.type, token]));
  const details = selected.map(type => {
    const prev = existingMap.get(type) || {};
    const size = prev.size || SESSION_DEFAULT_FILTER_SIZE;
    const needsSize = type !== 'Diopter';
    const needsValues = filterTypeNeedsValueSelect(type);
    const { label, gearName, hideDetails } = resolveFilterDisplayInfo(type, size);
    let entryId = `filter-${filterId(type)}`;
    if (type === 'Diopter') entryId = `${entryId}-set`;
    return {
      type,
      label,
      gearName,
      entryId,
      size,
      values: Array.isArray(prev.values) ? prev.values.slice() : [],
      needsSize,
      needsValues,
      hideDetails
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  let gearEntries = buildFilterGearEntries(existingTokens);
  if (!gearEntries.length) {
    gearEntries = details
      .map(detail => ({
        id: detail.entryId,
        gearName: detail.gearName,
        label: detail.label,
        type: detail.type,
        hideDetails: detail.hideDetails
      }))
      .filter(entry => entry.id && entry.label);
  }
  updateGearListFilterEntries(gearEntries);
  const matteboxTarget = typeof matteboxSelect !== 'undefined'
    ? matteboxSelect
    : (typeof document !== 'undefined' ? document.getElementById('mattebox') : null);
  if (matteboxTarget) {
    const needsSwing = selected.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    if (needsSwing) matteboxTarget.value = 'Swing Away';
  }
}

function handleFilterDetailChange() {
  if (!resolveFilterSelectElement()) return;
  const filterStr = collectFilterSelections();
  const entries = buildFilterGearEntries(parseFilterTokens(filterStr));
  updateGearListFilterEntries(entries);
  if (gearListOutput) adjustGearListSelectWidths(gearListOutput);
  saveCurrentSession();
  saveCurrentGearList();
  checkSetupChanged();
  renderFilterDetails();
}

function collectFilterSelections() {
  const select = resolveFilterSelectElement();
  if (!select) return '';

  const selected = Array.from(select.selectedOptions)
    .map(option => (typeof option.value === 'string' ? option.value.trim() : ''))
    .filter(Boolean);

  const existingSelectionString = currentProjectInfo && typeof currentProjectInfo.filter === 'string'
    ? currentProjectInfo.filter
    : '';
  const existingTokens = existingSelectionString
    ? parseFilterTokens(existingSelectionString)
    : [];
  const existingMap = Object.fromEntries(existingTokens.map(token => [token.type, token]));

  const existingStringMap = {};
  if (existingSelectionString) {
    existingSelectionString.split(',').forEach(tokenStr => {
      const trimmed = typeof tokenStr === 'string' ? tokenStr.trim() : '';
      if (!trimmed) return;
      const type = trimmed.split(':')[0]?.trim();
      if (type) {
        existingStringMap[type] = trimmed;
      }
    });
  }

  const selectedTokens = selected.map(type => {
    const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
    const valSel = document.getElementById(`filter-values-${filterId(type)}`);
    const prev = existingMap[type] || {};
    const size = sizeSel ? sizeSel.value : (prev.size || SESSION_DEFAULT_FILTER_SIZE);
    let vals;
    const needsValues = filterTypeNeedsValueSelect(type);
    if (valSel) {
      vals = Array.from(valSel.selectedOptions).map(o => o.value);
    } else if (Array.isArray(prev.values) && prev.values.length) {
      vals = prev.values.slice();
    } else {
      vals = [];
    }
    let valueSegment = '';
    if (needsValues) {
      valueSegment = vals.length ? `:${vals.join('|')}` : ':!';
    }
    return `${type}:${size}${valueSegment}`;
  });

  const availableTypes = new Set(
    Array.from(select.options)
      .map(option => (typeof option.value === 'string' ? option.value.trim() : ''))
      .filter(Boolean),
  );
  const selectedTypes = new Set(selected);

  existingTokens.forEach(token => {
    if (!token || !token.type) return;
    if (selectedTypes.has(token.type)) return;
    if (availableTypes.has(token.type)) return;

    const preserved = existingStringMap[token.type]
      || (() => {
        const size = token.size || SESSION_DEFAULT_FILTER_SIZE;
        const values = Array.isArray(token.values) ? token.values.filter(Boolean) : [];
        let segment = '';
        if (filterTypeNeedsValueSelect(token.type)) {
          segment = values.length ? `:${values.join('|')}` : ':!';
        }
        return `${token.type}:${size}${segment}`;
      })();
    selectedTokens.push(preserved);
  });

  return selectedTokens.join(',');
}

function parseFilterTokens(str) {
  if (!str) return [];
  return str.split(',').map(s => {
    const parts = s.split(':').map(p => p.trim());
    const type = parts[0];
    const size = parts[1] || SESSION_DEFAULT_FILTER_SIZE;
    const vals = parts.length > 2 ? parts[2] : undefined;
    let values;
    if (vals === undefined) {
      values = undefined;
    } else if (vals === '' || vals === '!') {
      values = [];
    } else {
      values = vals.split('|').map(v => v.trim()).filter(Boolean);
    }
    return { type, size, values };
  }).filter(t => t.type);
}

function applyFilterSelectionsToGearList(info = currentProjectInfo) {
  if (!gearListOutput) return;
  resolveFilterSelectElement();
  const tokens = info && info.filter ? parseFilterTokens(info.filter) : [];
  const entries = buildFilterGearEntries(tokens);
  updateGearListFilterEntries(entries);
  adjustGearListSelectWidths(gearListOutput);
}

function normalizeGearNameForComparison(name) {
  if (!name) return '';
  let normalized = String(name);
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  } else if (typeof String.prototype.normalize === 'function') {
    normalized = String.prototype.normalize.call(normalized, 'NFD');
  }
  normalized = normalized.replace(/[\u0300-\u036f]/g, '');
  normalized = normalized.replace(/\bfuer\b/gi, 'for');
  normalized = normalized.replace(/\bfur\b/gi, 'for');
  normalized = normalized.toLowerCase();
  return normalized.replace(/[^a-z0-9]+/g, '');
}

function buildFilterSelectHtml() {
  return '<div id="gearListFilterDetails" class="hidden" aria-live="polite"></div>';
}

function collectFilterAccessories(filters = []) {
  const items = [];
  filters.forEach(({ type }) => {
    switch (type) {
      case 'ND Grad HE':
      case 'ND Grad SE':
        break;
      default:
        break;
    }
  });
  return items;
}

const USER_BUTTON_FUNCTION_ITEMS = [
  { key: 'user1', value: 'User 1' },
  { key: 'user2', value: 'User 2' },
  { key: 'user3', value: 'User 3' },
  { key: 'user4', value: 'User 4' },
  { key: 'toggleLut', value: 'Toggle LUT' },
  { key: 'falseColor', value: 'False Color' },
  { key: 'peaking', value: 'Peaking' },
  { key: 'anamorphicDesqueeze', value: 'Anamorphic Desqueeze' },
  { key: 'surroundView', value: 'Surround View' },
  { key: 'oneToOneZoom', value: '1:1 Zoom' },
  { key: 'waveform', value: 'Waveform' },
  { key: 'histogram', value: 'Histogram' },
  { key: 'vectorscope', value: 'Vectorscope' },
  { key: 'zebra', value: 'Zebra' },
  { key: 'playback', value: 'Playback' },
  { key: 'record', value: 'Record' },
  { key: 'zoom', value: 'Zoom' },
  { key: 'frameLines', value: 'Frame Lines' },
  { key: 'frameGrab', value: 'Frame Grab' },
  { key: 'wb', value: 'WB' },
  { key: 'iso', value: 'ISO' },
  { key: 'nd', value: 'ND' },
  { key: 'fps', value: 'FPS' },
  { key: 'shutter', value: 'Shutter' }
];

function populateUserButtonDropdowns() {
  const lang = typeof currentLang === 'string' && texts[currentLang]
    ? currentLang
    : 'en';
  const fallbackProjectForm = texts?.en?.projectForm || {};
  const langProjectForm = texts?.[lang]?.projectForm || fallbackProjectForm;
  const labels = langProjectForm.userButtonFunctions || {};
  const fallbackLabels = fallbackProjectForm.userButtonFunctions || {};

  const items = USER_BUTTON_FUNCTION_ITEMS.map(item => {
    const label = labels[item.key] || fallbackLabels[item.key] || item.value;
    return { ...item, label };
  });

  const knownValues = new Set(items.map(item => item.value));

  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;

    const previouslySelected = new Set(
      Array.from(sel.selectedOptions || []).map(opt => opt.value)
    );

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < items.length; index += 1) {
      const { value, label } = items[index];
      if (!value) {
        continue;
      }
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      if (previouslySelected.has(value)) {
        opt.selected = true;
      }
      fragment.appendChild(opt);
    }

    previouslySelected.forEach(value => {
      if (knownValues.has(value)) {
        return;
      }
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      opt.selected = true;
      fragment.appendChild(opt);
    });

    sel.innerHTML = '';
    sel.appendChild(fragment);

    const optionCount = sel.options ? sel.options.length : 0;
    sel.size = optionCount > 0 ? optionCount : USER_BUTTON_FUNCTION_ITEMS.length;
  });
}

const runInitAppWithInitialLoadingIndicator = () => {
  ensureInitialLoadingIndicatorVisible();
  try {
    initApp();
  } finally {
    finalizeInitialLoadingIndicator();
  }
};

ensureInitialLoadingIndicatorVisible();

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitAppWithInitialLoadingIndicator);
  } else {
    runInitAppWithInitialLoadingIndicator();
  }
} else {
  finalizeInitialLoadingIndicator();
}

// Export functions for testing in Node environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION: typeof ACTIVE_APP_VERSION === 'string' ? ACTIVE_APP_VERSION : APP_VERSION,
    closeSideMenu,
    openSideMenu,
    setupSideMenu,
    setupResponsiveControls,
    setLanguage: applySetLanguage,
    applySetLanguage,
    safeGetCurrentProjectName,
    updateCalculations,
    setBatteryPlates,
    getBatteryPlates,
    setRecordingMedia,
    getRecordingMedia,
    applyDarkMode,
    applyPinkMode,
    applyHighContrast,
    generatePrintableOverview,
    generateGearListHtml,
    ensureZoomRemoteSetup,
    encodeSharedSetup,
    decodeSharedSetup,
    applySharedSetupFromUrl,
    applySharedSetup,
    updateBatteryPlateVisibility,
    updateBatteryOptions,
    renderSetupDiagram,
    enableDiagramInteractions,
    updateDiagramLegend,
    cameraFizPort,
    controllerCamPort,
    controllerDistancePort,
    detectBrand,
    connectionLabel,
    generateConnectorSummary,
    exportDiagramSvg,
    fixPowerInput,
    ensureList,
    normalizeVideoType,
    normalizeFizConnectorType,
    normalizeViewfinderType,
    normalizePowerPortType,

    getCurrentSetupKey,
    renderFeedbackTable,
    saveCurrentGearList,
    getPowerSelectionSnapshot,
    applyStoredPowerSelection,
    getGearListSelectors,
    applyGearListSelectors,
    setSelectValue,
    autoSaveCurrentSetup,
    saveCurrentSession,
    restoreSessionState,
    displayGearAndRequirements,
    deleteCurrentGearList,
    ensureGearListActions,
    bindGearListEasyrigListener,
    populateSelect,
    populateLensDropdown,
    populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown,
    populateSlowMotionRecordingResolutionDropdown,
    populateFrameRateDropdown,
    populateSlowMotionFrameRateDropdown,
    populateSensorModeDropdown,
    populateSlowMotionSensorModeDropdown,
    populateCodecDropdown,
    updateRequiredScenariosSummary,
    getRequiredScenarioOptionEntries,
    updateMonitoringConfigurationOptions,
    updateViewfinderExtensionVisibility,
    scenarioIcons,
    collectProjectFormData,
    populateProjectForm,
    renderFilterDetails,
    collectFilterSelections,
    parseFilterTokens,
    applyFilterSelectionsToGearList,
    setCurrentProjectInfo,
    getCurrentProjectInfo,
    crewRoles,
    formatFullBackupFilename,
    computeGearListCount,
    autoBackup,
    createSettingsBackup,
    buildSettingsBackupPackage,
    captureStorageSnapshot,
    sanitizeBackupPayload,
    extractBackupSections,
    searchKey,
    searchTokens,
    findBestSearchMatch,
    runFeatureSearch,
    computeSetupDiff,
    __versionCompareInternals: {
      formatDiffPath,
      formatDiffListIndex,
      createKeyedDiffPathSegment,
      parseKeyedDiffPathSegment,
      findArrayComparisonKey,
    },
    __featureSearchInternals: {
      featureMap,
      deviceMap,
      helpMap,
      featureSearchEntries,
      featureSearchDefaultOptions,
      featureSearchInput: featureSearch,
      featureSearchDropdownElement:
        typeof globalThis !== 'undefined' && globalThis.featureSearchDropdown
          ? globalThis.featureSearchDropdown
          : null,
      restoreFeatureSearchDefaults,
      updateFeatureSearchSuggestions,
    },
    __customFontInternals: {
      addFromData: (name, dataUrl, options) => addCustomFontFromData(name, dataUrl, options),
      getEntries: () => Array.from(customFontEntries.values()),
    },
    __sharedImportInternals: {
      getLastSharedSetupData: () => lastSharedSetupData,
      setLastSharedSetupDataForTest: (value) => {
        lastSharedSetupData = value;
      },
      getLastSharedAutoGearRules: () => lastSharedAutoGearRules,
      setLastSharedAutoGearRulesForTest: (value) => {
        lastSharedAutoGearRules = value;
      },
      isProjectPresetActive: () => sharedImportProjectPresetActive,
      setProjectPresetActiveForTest: (value) => {
        sharedImportProjectPresetActive = !!value;
      },
      getPreviousPresetId: () => sharedImportPreviousPresetId,
      setPreviousPresetIdForTest: (value) => {
        sharedImportPreviousPresetId = typeof value === 'string' ? value : '';
      },
      isPromptActive: () => sharedImportPromptActive,
      setPromptActiveForTest: (value) => {
        sharedImportPromptActive = !!value;
      },
      getPendingSharedLinkListener: () => pendingSharedLinkListener,
      setPendingSharedLinkListenerForTest: (listener) => {
        pendingSharedLinkListener = typeof listener === 'function' ? listener : null;
      },
    },
    __mountVoltageInternals: {
      getSessionMountVoltagePreferencesClone,
      applySessionMountVoltagePreferences,
      cloneMountVoltageDefaultsForSession,
    },
    collectAutoGearCatalogNames,
    buildDefaultVideoDistributionAutoGearRules,
    applyAutoGearRulesToTableHtml,
    exportAutoGearRules,
    importAutoGearRulesFromData,
    createAutoGearBackup,
    restoreAutoGearBackup,
    getAutoGearRules,
    syncAutoGearRulesFromStorage,
    parseDeviceDatabaseImport,
    countDeviceDatabaseEntries,
    sanitizeShareFilename,
    ensureJsonExtension,
    getDefaultShareFilename,
    promptForSharedFilename,
    downloadSharedProject,
    confirmAutoGearSelection,
    configureSharedImportOptions,
    resolveSharedImportMode,
    resetPlannerStateAfterFactoryReset,
    __autoGearInternals: {
      buildDefaultVideoDistributionAutoGearRules,
      buildVideoDistributionAutoRules,
      buildAutoGearRulesFromBaseInfo,
      seedAutoGearRulesFromCurrentProject,
      clearAutoGearDefaultsSeeded,
    },
  };
}

function fallbackParseVoltageValue(value, fallback) {
  const toNumeric = candidate => {
    if (typeof candidate === 'number') {
      return candidate;
    }
    if (typeof candidate === 'string') {
      const normalized = candidate.replace(',', '.');
      return Number.parseFloat(normalized);
    }
    return Number.NaN;
  };

  const clampVoltage = numeric => {
    const clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  };

  const numeric = toNumeric(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return clampVoltage(numeric);
  }

  const fallbackNumeric = toNumeric(fallback);
  if (Number.isFinite(fallbackNumeric) && fallbackNumeric > 0) {
    return clampVoltage(fallbackNumeric);
  }

  return 0;
}

function resolveSupportedMountVoltageTypes() {
  if (Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES) && SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0) {
    return SUPPORTED_MOUNT_VOLTAGE_TYPES;
  }

  const inputKeys = mountVoltageInputs && typeof mountVoltageInputs === 'object'
    ? Object.keys(mountVoltageInputs)
    : [];
  if (inputKeys.length > 0) {
    return inputKeys;
  }

  if (DEFAULT_MOUNT_VOLTAGES && typeof DEFAULT_MOUNT_VOLTAGES === 'object') {
    try {
      return Object.keys(DEFAULT_MOUNT_VOLTAGES);
    } catch (defaultKeysError) {
      void defaultKeysError;
    }
  }

  return [];
}

function cloneMountVoltageDefaultsForSession() {
  const runtimeCloneMountVoltageMap = getSessionRuntimeFunction('cloneMountVoltageMap');
  if (runtimeCloneMountVoltageMap) {
    try {
      return runtimeCloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
    } catch (cloneError) {
      warnMissingMountVoltageHelper('cloneMountVoltageMap', cloneError);
    }
  } else {
    warnMissingMountVoltageHelper('cloneMountVoltageMap');
  }
  if (DEFAULT_MOUNT_VOLTAGES && typeof DEFAULT_MOUNT_VOLTAGES === 'object') {
    try {
      return SESSION_DEEP_CLONE(DEFAULT_MOUNT_VOLTAGES);
    } catch (serializationError) {
      void serializationError;
    }
  }
  const clone = {};
  const parse = typeof parseVoltageValue === 'function'
    ? (value, fallback) => parseVoltageValue(value, fallback)
    : (value, fallback) => fallbackParseVoltageValue(value, fallback);
  resolveSupportedMountVoltageTypes().forEach(type => {
    const defaults = DEFAULT_MOUNT_VOLTAGES?.[type] || {};
    clone[type] = {
      high: parse(defaults.high, defaults.high),
      low: parse(defaults.low, defaults.low),
    };
  });
  return clone;
}

function getSessionMountVoltagePreferencesClone() {
  const getMountVoltagePreferencesCloneFn = getSessionRuntimeFunction('getMountVoltagePreferencesClone');
  if (getMountVoltagePreferencesCloneFn) {
    try {
      const clone = getMountVoltagePreferencesCloneFn();
      if (clone && typeof clone === 'object') {
        return clone;
      }
    } catch (helperError) {
      warnMissingMountVoltageHelper('getMountVoltagePreferencesClone', helperError);
    }
  } else {
    warnMissingMountVoltageHelper('getMountVoltagePreferencesClone');
  }
  return cloneMountVoltageDefaultsForSession();
}

function applySessionMountVoltagePreferences(preferences, options = {}) {
  const applyMountVoltagePreferencesFn = getSessionRuntimeFunction('applyMountVoltagePreferences');
  if (applyMountVoltagePreferencesFn) {
    try {
      applyMountVoltagePreferencesFn(preferences, options);
      return;
    } catch (helperError) {
      warnMissingMountVoltageHelper('applyMountVoltagePreferences', helperError);
    }
  } else {
    warnMissingMountVoltageHelper('applyMountVoltagePreferences');
  }
  if (options && options.triggerUpdate) {
    const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        void updateError;
      }
    }
  }
}

function collectMountVoltageFormValues() {
  const updated = getSessionMountVoltagePreferencesClone();
  const parse = typeof parseVoltageValue === 'function'
    ? (value, fallback) => parseVoltageValue(value, fallback)
    : (value, fallback) => fallbackParseVoltageValue(value, fallback);
  const defaultClones = cloneMountVoltageDefaultsForSession();
  const supportedTypes = resolveSupportedMountVoltageTypes();
  supportedTypes.forEach(type => {
    const fields = mountVoltageInputs?.[type];
    if (!fields) return;
    const defaults = DEFAULT_MOUNT_VOLTAGES?.[type] || { high: 0, low: 0 };
    let target = updated[type];
    if (!target || typeof target !== 'object') {
      target = defaultClones[type] ? { ...defaultClones[type] } : { high: defaults.high, low: defaults.low };
      updated[type] = target;
    }
    if (fields.high) {
      target.high = parse(fields.high.value, target.high ?? defaults.high);
    }
    if (fields.low) {
      target.low = parse(fields.low.value, target.low ?? defaults.low);
    }
  });
  return updated;
}

function handleMountVoltageInputChange() {
  const values = collectMountVoltageFormValues();
  applySessionMountVoltagePreferences(values, { persist: true, triggerUpdate: true });
}

