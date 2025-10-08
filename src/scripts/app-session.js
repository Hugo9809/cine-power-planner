// --- SESSION STATE HANDLING ---
/* eslint-disable no-redeclare */
/* global resolveTemperatureStorageKey, TEMPERATURE_STORAGE_KEY,
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
          markProjectFormDataDirty */
/* eslint-enable no-redeclare */
/* global enqueueCoreBootTask */
const FALLBACK_STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
if (typeof globalThis !== 'undefined' && typeof globalThis.STRONG_SEARCH_MATCH_TYPES === 'undefined') {
  globalThis.STRONG_SEARCH_MATCH_TYPES = FALLBACK_STRONG_SEARCH_MATCH_TYPES;
}

const SESSION_DEEP_CLONE =
  CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone === 'function'
    ? CORE_GLOBAL_SCOPE.__cineDeepClone
    : function sessionFallbackDeepClone(value) {
        if (value === null || typeof value !== 'object') {
          return value;
        }

        try {
          return JSON.parse(JSON.stringify(value));
        } catch (cloneError) {
          void cloneError;
        }

        return value;
      };

if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
  try {
    CORE_GLOBAL_SCOPE.__cineDeepClone = SESSION_DEEP_CLONE;
  } catch (sessionDeepCloneError) {
    void sessionDeepCloneError;
  }
}
/* global triggerPinkModeIconRain, loadDeviceData, loadSetups, loadSessionState,
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
/* global FEEDBACK_TEMPERATURE_MIN: true, FEEDBACK_TEMPERATURE_MAX: true */
/* global getDiagramManualPositions, setManualDiagramPositions,
          normalizeDiagramPositionsInput, ensureAutoBackupsFromProjects */
/* global getMountVoltagePreferencesClone,
          mountVoltageResetButton, CORE_GLOBAL_SCOPE,
          resetMountVoltagePreferences, updateMountVoltageInputsFromState,
          applyMountVoltagePreferences, getMountVoltageStorageKeyName,
          getMountVoltageStorageBackupKeyName,
          parseStoredMountVoltages, SUPPORTED_MOUNT_VOLTAGE_TYPES,
          DEFAULT_MOUNT_VOLTAGES, mountVoltageInputs, parseVoltageValue */
/* global requestPersistentStorage */

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

function getSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
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

const settingsLogger = (() => {
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
      '--button-size': 24,
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
  return ensureSessionRuntimePlaceholder(
    functionName,
    () => (...invocationArgs) => callSessionCoreFunction(functionName, invocationArgs, options),
  );
}

const AUTO_GEAR_RUNTIME_HANDLERS = [
  'handleAutoGearImportSelection',
  'handleAutoGearPresetSelection',
  'handleAutoGearSavePreset',
  'handleAutoGearDeletePreset',
  'handleAutoGearShowBackupsToggle',
  'handleAutoGearConditionShortcut',
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

const temperaturePreferenceStorageKey =
  typeof TEMPERATURE_STORAGE_KEY === 'string'
    ? TEMPERATURE_STORAGE_KEY
    : typeof resolveTemperatureStorageKey === 'function'
      ? resolveTemperatureStorageKey()
      : 'cameraPowerPlanner_temperatureUnit';

let recordFullBackupHistoryEntryFn = () => {};
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
      || typeof value.text === 'string'
    ) {
      const name = typeof value.name === 'string' ? value.name.trim() : '';
      const role = typeof value.role === 'string' ? value.role.trim() : '';
      const phone = typeof value.phone === 'string' ? value.phone.trim() : '';
      const email = typeof value.email === 'string' ? value.email.trim() : '';
      const text = typeof value.text === 'string' ? value.text.trim() : '';
      return name || role || phone || email || text ? 1 : 0;
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
    if (key === 'prepDays' || key === 'shootingDays') {
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
  currentProjectInfo = deriveProjectInfo(info);
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
    context.setupNameState = {
      typedName,
      selectedName,
      storageKey,
      renameInProgress,
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
    notifyAutoBackupChange({ commit: true });
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

  if (overrides !== undefined) {
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

  notifyAutoBackupChange({ immediate, overrides: overrides !== undefined, pending: true });
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

  projectForm.querySelectorAll('select').forEach(sel => {
    const handleUpdate = () => updateSelectIconBoxes(sel);
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

function restoreSessionState() {
  restoringSession = true;
  const loadedState = loadSession();
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
    const typedName = getCurrentProjectName();
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

function applySharedSetup(shared, options = {}) {
  try {
    const decoded = decodeSharedSetup(
      typeof shared === 'string' ? JSON.parse(shared) : shared
    );
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
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const storageKey = selectedName || typedName;
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
        saveProject(storageKey, payload);
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
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    if (typeof updateStorageRequirementTypeOptions === 'function') {
      updateStorageRequirementTypeOptions();
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

const flushProjectAutoSaveOnExit = () => {
  if (factoryResetInProgress) return;
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
  notifyAutoBackupChange({ immediate: true, reason: 'before-exit', pending: true });
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
};
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit();
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload'].forEach((eventName) => {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}

// Enable Save button only when a setup name is entered and allow Enter to save
if (setupNameInput && saveSetupBtn) {
  const toggleSaveSetupBtn = () => {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}

const warnMountVoltageHelper = typeof warnMissingMountVoltageHelper === 'function'
  ? warnMissingMountVoltageHelper
  : () => {};

let updateThemeColor = () => {};
let setToggleIcon = () => {};
let applyDarkMode = () => {};
let applyHighContrast = () => {};
let applyReduceMotion = () => {};
let applyRelaxedSpacing = () => {};
let applyPinkMode = () => {};
let persistPinkModePreference = () => {};
let rememberSettingsPinkModeBaseline = () => {};
let revertSettingsPinkModeIfNeeded = () => {};
let rememberSettingsTemperatureUnitBaseline = () => {};
let revertSettingsTemperatureUnitIfNeeded = () => {};
let applyShowAutoBackupsPreference = () => {};
let rememberSettingsShowAutoBackupsBaseline = () => {};
let revertSettingsShowAutoBackupsIfNeeded = () => {};
let rememberSettingsMountVoltagesBaseline = () => {};
let revertSettingsMountVoltagesIfNeeded = () => {};
let handlePinkModeIconPress = () => {};
let triggerPinkModeIconAnimation = () => {};
let startPinkModeIconRotation = () => {};
let stopPinkModeIconRotation = () => {};
let startPinkModeAnimatedIconRotation = () => {};
let stopPinkModeAnimatedIconRotation = () => {};
let applyPinkModeIcon = () => {};
let isPinkModeActive = () => !!(typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode'));

const appearanceModuleFactory = ensureSessionRuntimePlaceholder(
  'cineSettingsAppearance',
  () => null,
);

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
  icons: {
    registry: typeof ICON_GLYPHS === 'object' ? ICON_GLYPHS : null,
    applyIconGlyph: typeof applyIconGlyph === 'function' ? (element, glyph) => applyIconGlyph(element, glyph) : null,
    ensureSvgHasAriaHidden: typeof ensureSvgHasAriaHidden === 'function' ? ensureSvgHasAriaHidden : null,
    pinkModeIcons: typeof pinkModeIcons === 'object' ? pinkModeIcons : null,
    startPinkModeAnimatedIcons: typeof startPinkModeAnimatedIcons === 'function' ? startPinkModeAnimatedIcons : null,
    stopPinkModeAnimatedIcons: typeof stopPinkModeAnimatedIcons === 'function' ? stopPinkModeAnimatedIcons : null,
    triggerPinkModeIconRain: typeof triggerPinkModeIconRain === 'function' ? triggerPinkModeIconRain : null,
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
  },
  preferences: {
    getTemperatureUnit: () => temperatureUnit,
    setTemperatureUnit: value => {
      temperatureUnit = value;
    },
    applyTemperatureUnitPreference: typeof applyTemperatureUnitPreference === 'function' ? applyTemperatureUnitPreference : null,
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

const appearanceModule = appearanceModuleFactory && typeof appearanceModuleFactory.initialize === 'function'
  ? appearanceModuleFactory.initialize(appearanceContext)
  : null;

if (appearanceModule) {
  updateThemeColor = appearanceModule.updateThemeColor || updateThemeColor;
  setToggleIcon = appearanceModule.setToggleIcon || setToggleIcon;
  applyDarkMode = appearanceModule.applyDarkMode || applyDarkMode;
  applyHighContrast = appearanceModule.applyHighContrast || applyHighContrast;
  applyReduceMotion = appearanceModule.applyReduceMotion || applyReduceMotion;
  applyRelaxedSpacing = appearanceModule.applyRelaxedSpacing || applyRelaxedSpacing;
  applyPinkMode = appearanceModule.applyPinkMode || applyPinkMode;
  persistPinkModePreference = appearanceModule.persistPinkModePreference || persistPinkModePreference;
  rememberSettingsPinkModeBaseline = appearanceModule.rememberSettingsPinkModeBaseline || rememberSettingsPinkModeBaseline;
  revertSettingsPinkModeIfNeeded = appearanceModule.revertSettingsPinkModeIfNeeded || revertSettingsPinkModeIfNeeded;
  rememberSettingsTemperatureUnitBaseline = appearanceModule.rememberSettingsTemperatureUnitBaseline || rememberSettingsTemperatureUnitBaseline;
  revertSettingsTemperatureUnitIfNeeded = appearanceModule.revertSettingsTemperatureUnitIfNeeded || revertSettingsTemperatureUnitIfNeeded;
  applyShowAutoBackupsPreference = appearanceModule.applyShowAutoBackupsPreference || applyShowAutoBackupsPreference;
  rememberSettingsShowAutoBackupsBaseline = appearanceModule.rememberSettingsShowAutoBackupsBaseline || rememberSettingsShowAutoBackupsBaseline;
  revertSettingsShowAutoBackupsIfNeeded = appearanceModule.revertSettingsShowAutoBackupsIfNeeded || revertSettingsShowAutoBackupsIfNeeded;
  rememberSettingsMountVoltagesBaseline = appearanceModule.rememberSettingsMountVoltagesBaseline || rememberSettingsMountVoltagesBaseline;
  revertSettingsMountVoltagesIfNeeded = appearanceModule.revertSettingsMountVoltagesIfNeeded || revertSettingsMountVoltagesIfNeeded;
  handlePinkModeIconPress = appearanceModule.handlePinkModeIconPress || handlePinkModeIconPress;
  triggerPinkModeIconAnimation = appearanceModule.triggerPinkModeIconAnimation || triggerPinkModeIconAnimation;
  startPinkModeIconRotation = appearanceModule.startPinkModeIconRotation || startPinkModeIconRotation;
  stopPinkModeIconRotation = appearanceModule.stopPinkModeIconRotation || stopPinkModeIconRotation;
  startPinkModeAnimatedIconRotation = appearanceModule.startPinkModeAnimatedIconRotation || startPinkModeAnimatedIconRotation;
  stopPinkModeAnimatedIconRotation = appearanceModule.stopPinkModeAnimatedIconRotation || stopPinkModeAnimatedIconRotation;
  applyPinkModeIcon = appearanceModule.applyPinkModeIcon || applyPinkModeIcon;
  isPinkModeActive = appearanceModule.isPinkModeActive || isPinkModeActive;
} else if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
  console.warn('cineSettingsAppearance module is not available; settings appearance features are limited.');
}

let darkModeEnabled = false;
try {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    darkModeEnabled = stored === "true";
  } else if (typeof window.matchMedia === "function") {
    darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
} catch (e) {
  console.warn("Could not load dark mode preference", e);
}
applyDarkMode(darkModeEnabled);

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    darkModeEnabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(darkModeEnabled);
    try {
      localStorage.setItem("darkMode", darkModeEnabled);
    } catch (e) {
      console.warn("Could not save dark mode preference", e);
    }
  });
}

let highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);

if (typeof window !== 'undefined') {
  window.handlePinkModeIconPress = () => {
    handlePinkModeIconPress();
  };
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
rememberSettingsShowAutoBackupsBaseline();
rememberSettingsMountVoltagesBaseline();

if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", event => {
    if (event && event.isTrusted) {
      handlePinkModeIconPress();
    }
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
    if (typeof applyTemperatureUnitPreference === 'function') {
      applyTemperatureUnitPreference(settingsTemperatureUnit.value, {
        persist: false
      });
    }
  });
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
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
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
    if (settingsTemperatureUnit) settingsTemperatureUnit.value = temperatureUnit;
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      refreshAutoGearScenarioOptions();
      refreshAutoGearMatteboxOptions();
      refreshAutoGearCameraHandleOptions();
      refreshAutoGearViewfinderExtensionOptions();
      refreshAutoGearVideoDistributionOptions();
      callSessionCoreFunction('refreshAutoGearCameraOptions', [], { defer: true });
      refreshAutoGearMonitorOptions();
      refreshAutoGearWirelessOptions();
      refreshAutoGearMotorsOptions();
      refreshAutoGearControllersOptions();
      refreshAutoGearDistanceOptions();
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

  if (settingsSave) {
    settingsSave.addEventListener('click', () => {
      if (settingsLanguage) {
        setLanguage(settingsLanguage.value);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after language change', userButtonError);
          }
        }
      }
      if (settingsDarkMode) {
        const enabled = settingsDarkMode.checked;
        applyDarkMode(enabled);
        try {
          localStorage.setItem('darkMode', enabled);
        } catch (e) {
          console.warn('Could not save dark mode preference', e);
        }
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
      if (settingsTemperatureUnit) {
        applyTemperatureUnitPreference(settingsTemperatureUnit.value);
        rememberSettingsTemperatureUnitBaseline();
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
      rememberSettingsShowAutoBackupsBaseline();
      rememberSettingsMountVoltagesBaseline();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }

  settingsDialog.addEventListener('click', e => {
    if (e.target === settingsDialog) {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
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
    }
  });

  settingsDialog.addEventListener('cancel', e => {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertSettingsTemperatureUnitIfNeeded();
    rememberSettingsTemperatureUnitBaseline();
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
  return null;
};

if (autoGearResetFactoryButton) {
  const resetAutoGearRulesHandler = resolveResetAutoGearRulesHandler();

  if (resetAutoGearRulesHandler) {
    autoGearResetFactoryButton.addEventListener('click', resetAutoGearRulesHandler);
  } else {
    autoGearResetFactoryButton.disabled = true;
    autoGearResetFactoryButton.setAttribute('aria-disabled', 'true');
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Automatic gear reset action unavailable: reset handler missing.');
    }
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

const ensureNotificationContainer = () => {
  if (typeof document === 'undefined') return null;
  const id = 'backupNotificationContainer';
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  container.style.top = getNotificationTopOffset();
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
    note.remove();
    if (!container.children.length) {
      container.remove();
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
    return () => {};
  }
  const container = ensureNotificationContainer();
  if (!container) {
    return () => {};
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
      indicator.remove();
      if (!container.children.length) {
        container.remove();
      }
    }
  };
};

const GLOBAL_LOADING_INDICATOR_ID = 'cineGlobalLoadingIndicator';
let globalLoadingIndicatorRefCount = 0;

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
  const mode = indicator.dataset.messageMode || 'auto';
  if (mode === 'custom') {
    const customMessage = indicator.dataset.customMessage || '';
    if (customMessage) {
      textTarget.textContent = customMessage;
    }
    return;
  }
  const message = resolveGlobalLoadingIndicatorMessage();
  textTarget.textContent = message;
  indicator.dataset.currentMessage = message;
};

const showGlobalLoadingIndicator = (message) => {
  if (typeof document === 'undefined') {
    return () => {};
  }
  const container = ensureNotificationContainer();
  if (!container) {
    return () => {};
  }
  ensureAutoBackupSpinnerStyles();

  let indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = GLOBAL_LOADING_INDICATOR_ID;
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
    textNode.className = 'global-loading-indicator-text';
    indicator.appendChild(textNode);

    container.appendChild(indicator);
  }

  const resolvedMessage = resolveGlobalLoadingIndicatorMessage(message);
  const isCustomMessage = Boolean(message && typeof message === 'string' && message.trim());
  const textTarget = indicator.querySelector('.global-loading-indicator-text');
  if (textTarget) {
    textTarget.textContent = resolvedMessage;
  }
  indicator.dataset.messageMode = isCustomMessage ? 'custom' : 'auto';
  if (isCustomMessage) {
    indicator.dataset.customMessage = resolvedMessage;
  } else {
    indicator.dataset.customMessage = '';
    indicator.dataset.currentMessage = resolvedMessage;
  }

  globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount);
  globalLoadingIndicatorRefCount += 1;
  indicator.dataset.count = String(globalLoadingIndicatorRefCount);
  indicator.style.display = 'flex';

  return () => {
    globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount - 1);
    if (globalLoadingIndicatorRefCount === 0) {
      indicator.remove();
      if (!container.children.length) {
        container.remove();
      }
    }
  };
};

try {
  const scope = typeof globalThis !== 'undefined'
    ? globalThis
    : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null));
  if (scope) {
    scope.__cineShowAutoBackupIndicator = showAutoBackupActivityIndicator;
    scope.__cineShowGlobalLoadingIndicator = showGlobalLoadingIndicator;
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
      applyTemperatureUnitPreference(restoredTemperatureUnit, { persist: false });
    } catch (error) {
      console.warn('Failed to apply restored temperature unit preference', error);
    }
  }

  try {
    applyDarkMode(safeGetItem('darkMode') === 'true');
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

function createSettingsBackup(notify = true, timestamp = new Date()) {
  try {
    const isEvent = notify && typeof notify === 'object' && typeof notify.type === 'string';
    const shouldNotify = isEvent ? true : Boolean(notify);
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
    const downloadResult = downloadBackupPayload(payload, fileName);
    if (!downloadResult || !downloadResult.success) {
      throw new Error('No supported download method available');
    }
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
    return fileName;
  } catch (e) {
    console.warn('Backup failed', e);
    if (notify) {
      showNotification('error', 'Backup failed');
    }
    return null;
  }
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

const storagePersistenceRequestButton = typeof document !== 'undefined'
  ? document.getElementById('storagePersistenceRequest')
  : null;
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
  const { langTexts, fallbackTexts } = getLoggingLangInfo();
  const text = (langTexts && langTexts[key]) || (fallbackTexts && fallbackTexts[key]) || '';
  loggingStatusEl.textContent = text;
  if (text) {
    loggingStatusEl.setAttribute('data-help', text);
  } else {
    loggingStatusEl.removeAttribute('data-help');
  }
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

  setLoggingStatusKey('loggingStatusIdle');
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

function updateLoggingConfig(partial) {
  const logging = resolveLoggingApi();
  if (!logging || typeof logging.setConfig !== 'function' || !partial || typeof partial !== 'object') {
    return;
  }
  try {
    logging.setConfig(partial);
  } catch (error) {
    console.warn('Unable to update logging config', error);
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
    applyLoggingConfig(typeof logging.getConfig === 'function' ? logging.getConfig() : {});
  } catch (error) {
    console.warn('Unable to read logging config', error);
  }

  detachLoggingSubscriptions();

  if (typeof logging.subscribe === 'function') {
    loggingState.unsubscribeHistory = logging.subscribe(() => {
      setLoggingStatusKey('loggingStatusUpdating');
      scheduleLoggingRender();
    });
  }
  if (typeof logging.subscribeConfig === 'function') {
    loggingState.unsubscribeConfig = logging.subscribeConfig(snapshot => {
      applyLoggingConfig(snapshot || {});
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
      setLoggingStatusKey('loggingStatusUpdating');
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
        setLoggingStatusKey('loggingStatusUpdating');
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
      setLoggingStatusKey('loggingStatusUpdating');
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
      setLoggingStatusKey('loggingStatusUpdating');
      updateLoggingConfig({ [key]: checked });
    });
  };

  registerToggleHandler(loggingConsoleOutputInput, 'consoleOutput');
  registerToggleHandler(loggingCaptureConsoleInput, 'captureConsole');
  registerToggleHandler(loggingCaptureErrorsInput, 'captureGlobalErrors');
  registerToggleHandler(loggingPersistSessionInput, 'persistSession');

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
  if (storagePersistenceState.requestInFlight) {
    message = langTexts.storagePersistenceStatusRequesting
      || fallbackTexts.storagePersistenceStatusRequesting
      || '';
  } else if (storagePersistenceState.checking) {
    message = langTexts.storagePersistenceStatusChecking
      || fallbackTexts.storagePersistenceStatusChecking
      || '';
  } else if (storagePersistenceState.supported === false) {
    message = langTexts.storagePersistenceStatusUnsupported
      || fallbackTexts.storagePersistenceStatusUnsupported
      || '';
  } else if (storagePersistenceState.persisted) {
    message = langTexts.storagePersistenceStatusGranted
      || fallbackTexts.storagePersistenceStatusGranted
      || '';
  } else if (storagePersistenceState.lastError) {
    message = langTexts.storagePersistenceStatusError
      || fallbackTexts.storagePersistenceStatusError
      || '';
  } else if (storagePersistenceState.requestAttempted && storagePersistenceState.lastRequestDenied) {
    message = langTexts.storagePersistenceStatusDenied
      || fallbackTexts.storagePersistenceStatusDenied
      || '';
  } else {
    message = langTexts.storagePersistenceStatusIdle
      || fallbackTexts.storagePersistenceStatusIdle
      || '';
  }

  const parts = [message];
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

  storagePersistenceState.supported = true;
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
  if (!storageManager || typeof storageManager.persist !== 'function') {
    storagePersistenceState.supported = Boolean(storageManager);
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
        setLanguage(restoredPreferences.language);
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
        setLanguage(restoredPreferenceState.language);
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
      const sliderSelect = getSliderBowlSelect();
      if (sliderSelect) sliderSelect.value = '';
    } catch (error) {
      console.warn('Failed to reset slider bowl selection during factory reset', error);
    }

    try {
      const easyrigSelect = getEasyrigSelect();
      if (easyrigSelect) easyrigSelect.value = '';
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
      resetCustomFontsForFactoryReset();
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

if (factoryResetButton) {
  factoryResetButton.addEventListener('click', () => {
    const langTexts = texts[currentLang] || texts.en || {};
    const confirmReset = langTexts.confirmFactoryReset
      || 'Create a backup and wipe all planner data?';
    if (!confirm(confirmReset)) return;
    const confirmResetAgain = langTexts.confirmFactoryResetAgain
      || 'This will permanently delete all saved planner data. Continue?';
    if (!confirm(confirmResetAgain)) return;

    if (typeof createSettingsBackup !== 'function') {
      const errorMsg = langTexts.factoryResetError
        || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
      return;
    }

    let backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before factory reset failed', error);
    }

    if (!backupFileName) {
      const backupFailedMsg = langTexts.factoryResetBackupFailed
        || 'Backup failed. Data was not deleted.';
      showNotification('error', backupFailedMsg);
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
      clearAllData();
      try {
        resetPlannerStateAfterFactoryReset();
      } catch (resetError) {
        console.warn('Failed to reset planner state after factory reset', resetError);
      }
      try {
        darkModeEnabled = false;
        applyDarkMode(false);
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

  const verifyDelays = [120, 360];

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
  const hashFallback = hashBase ? `${hashBase}#forceReload-${Date.now().toString(36)}` : '';

  const steps = [];

  let nextDelay = 350;

  const queueStep = run => {
    steps.push({
      delay: nextDelay,
      run,
    });
    nextDelay += 300;
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
    const reloadDelay = steps.length ? nextDelay : 350;
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
  const originalHref = forceReloadUrl.originalHref;
  const nextHref = forceReloadUrl.nextHref;
  const baseHref = normaliseForceReloadHref(originalHref, originalHref) || originalHref;

  return {
    win,
    location,
    hasReplace,
    hasAssign,
    hasReload,
    originalHref,
    nextHref,
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

async function clearCachesAndReload() {
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

  if (offlineModule && typeof offlineModule.reloadApp === 'function') {
    try {
      const result = await offlineModule.reloadApp({
        window,
        navigator: typeof navigator !== 'undefined' ? navigator : undefined,
        caches: typeof caches !== 'undefined' ? caches : undefined,
      });

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

  try {
    if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
      const registrations = [];
      const { serviceWorker } = navigator;
      try {
        if (typeof serviceWorker.getRegistrations === 'function') {
          const regs = await serviceWorker.getRegistrations();
          if (Array.isArray(regs)) {
            regs.forEach(reg => registrations.push(reg));
          }
        } else if (typeof serviceWorker.getRegistration === 'function') {
          const reg = await serviceWorker.getRegistration();
          if (reg) {
            registrations.push(reg);
          }
        } else if (serviceWorker.ready && typeof serviceWorker.ready.then === 'function') {
          try {
            const readyReg = await serviceWorker.ready;
            if (readyReg) {
              registrations.push(readyReg);
            }
          } catch (readyError) {
            console.warn('Failed to await active service worker', readyError);
          }
        }
      } catch (queryError) {
        console.warn('Failed to query service worker registrations', queryError);
      }

      if (registrations.length) {
        await Promise.all(registrations.map(reg => {
          if (!reg || typeof reg.unregister !== 'function') {
            return Promise.resolve();
          }
          return reg.unregister().catch(unregisterError => {
            console.warn('Service worker unregister failed', unregisterError);
          });
        }));
      }
    }

    if (typeof caches !== 'undefined' && caches && typeof caches.keys === 'function') {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => {
        if (!key || typeof caches.delete !== 'function') {
          return Promise.resolve(false);
        }
        return caches.delete(key).catch(cacheError => {
          console.warn('Failed to delete cache', key, cacheError);
          return false;
        });
      }));
    }
  } catch (error) {
    console.warn('Cache clear failed', error);
  } finally {
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
  }
}

if (reloadButton) {
  reloadButton.addEventListener("click", clearCachesAndReload);
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
  style.textContent = getDiagramCss(false);
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
    navigator.clipboard.writeText(text).catch(() => {});
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
    const namePart = (getCurrentProjectName() || 'setup')
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
    if (!element) return;

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
      hoverHelpTooltip.remove();
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
    if (typeof e?.clientX === 'number' && typeof e?.clientY === 'number') {
      hoverHelpPointerClientX = e.clientX;
      hoverHelpPointerClientY = e.clientY;
    }
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
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    hoverHelpPointerClientX = e.clientX;
    hoverHelpPointerClientY = e.clientY;
    if (hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };

  window.addEventListener('pointermove', updatePointerPosition, true);
  window.addEventListener('pointerdown', updatePointerPosition, true);

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

    const getDropdownOptions = () => {
      if (!featureSearchDropdown) return [];
      return Array.from(
        featureSearchDropdown.querySelectorAll('[role="option"]') || []
      );
    };

    const setActiveDropdownOption = index => {
      const options = getDropdownOptions();
      if (!options.length) return null;
      const bounded = Math.max(0, Math.min(index, options.length - 1));
      options.forEach((option, optIndex) => {
        option.setAttribute('tabindex', optIndex === bounded ? '0' : '-1');
      });
      options[bounded].focus();
      if (featureSearchDropdown) {
        featureSearchDropdown.dataset.activeIndex = String(bounded);
      }
      return options[bounded];
    };

    const closeFeatureSearchDropdown = () => {
      if (!featureSearchDropdown) return;
      featureSearchDropdown.dataset.open = 'false';
      featureSearchDropdown.hidden = true;
      featureSearchDropdown.setAttribute('aria-expanded', 'false');
      featureSearchDropdown.dataset.activeIndex = '';
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
      const container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.add('feature-search-open');
    };

    const applyFeatureSearchSuggestion = value => {
      if (!featureSearch || !value) return;
      featureSearch.value = value;
      try {
        featureSearch.focus({ preventScroll: true });
      } catch {
        featureSearch.focus();
      }
      featureSearch.setSelectionRange?.(value.length, value.length);
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
        setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
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
          setActiveDropdownOption(options.length - 1);
        } else {
          const prevIndex = Number(activeIndex) - 1;
          setActiveDropdownOption(prevIndex >= 0 ? prevIndex : options.length - 1);
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
        applyFeatureSearchSuggestion(value);
      });
      featureSearchDropdown.addEventListener('keydown', e => {
        const options = getDropdownOptions();
        if (!options.length) return;
        const activeElement = document.activeElement;
        const currentIndex = options.indexOf(activeElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          setActiveDropdownOption(prevIndex);
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActiveDropdownOption(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          setActiveDropdownOption(options.length - 1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex >= 0 && options[currentIndex]) {
            const value = options[currentIndex].getAttribute('data-value') || '';
            if (value) {
              applyFeatureSearchSuggestion(value);
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
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
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
  setLanguage(currentLang);
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
  ensureDefaultProjectInfoSnapshot();
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
  const maxTemp = typeof FEEDBACK_TEMPERATURE_MAX === 'number' ? FEEDBACK_TEMPERATURE_MAX : 50;
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
    const attrs = [];
    if (lens.weight_g) attrs.push(`${lens.weight_g}g`);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push(`${lens.frontDiameterMm}mm clamp-on`);
      else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
    if (minFocus) attrs.push(`${minFocus}m min focus`);
    opt.textContent = attrs.length ? `${name} (${attrs.join(', ')})` : name;
    if (previousSelection.has(name)) {
      opt.selected = true;
    }
    fragment.appendChild(opt);
  }

  lensSelect.innerHTML = '';
  lensSelect.appendChild(fragment);
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
      return { opts: ['0.3','0.6','0.9','1.2','1.5','1.8','2.1','2.5'], defaults: ['0.3','1.2'] };
    case 'Diopter':
      return { opts: ['+1/4','+1/2','+1','+2','+3','+4'], defaults: ['+1/2','+1','+2','+4'] };
    case 'ND Grad HE':
      return {
        opts: ['0.3 HE Vertical','0.6 HE Vertical','0.9 HE Vertical','1.2 HE Vertical','0.3 HE Horizontal','0.6 HE Horizontal','0.9 HE Horizontal','1.2 HE Horizontal'],
        defaults: ['0.3 HE Horizontal','0.6 HE Horizontal','0.9 HE Horizontal']
      };
    case 'ND Grad SE':
      return {
        opts: ['0.3 SE Vertical','0.6 SE Vertical','0.9 SE Vertical','1.2 SE Vertical','0.3 SE Horizontal','0.6 SE Horizontal','0.9 SE Horizontal','1.2 SE Horizontal'],
        defaults: ['0.3 SE Horizontal','0.6 SE Horizontal','0.9 SE Horizontal']
      };
    default:
      return { opts: ['1','1/2','1/4','1/8','1/16'], defaults: ['1/2','1/4','1/8'] };
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

function renderFilterDetailsStorage(details) {
  if (!filterDetailsStorage) return;
  filterDetailsStorage.innerHTML = '';
  if (!details.length) {
    filterDetailsStorage.hidden = true;
    return;
  }
  filterDetailsStorage.hidden = true;
  details.forEach(detail => {
    const { type, size, values, needsSize, needsValues } = detail;
    if (needsSize) {
      const sizeSelect = createFilterSizeSelect(type, size);
      sizeSelect.hidden = true;
      sizeSelect.setAttribute('aria-hidden', 'true');
      sizeSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(sizeSelect);
    }
    if (needsValues) {
      const valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(valuesSelect);
    }
  });
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
    if (label) heading.setAttribute('data-filter-label', label);
    if (type) heading.setAttribute('data-filter-type', type);
    const shouldHideSize = !!needsSize;
    if (shouldHideSize) {
      heading.setAttribute('data-filter-hide-size', '');
    } else {
      heading.removeAttribute('data-filter-hide-size');
    }
    heading.textContent = label ? `1x ${label}` : '';
    row.appendChild(heading);
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
    storageSelect.dispatchEvent(new Event('change'));
  }
}

function renderFilterDetails() {
  const select = resolveFilterSelectElement();
  if (!select) return;
  const selected = Array.from(select.selectedOptions).map(o => o.value).filter(Boolean);
  const existingSelections = collectFilterSelections();
  const existingTokens = existingSelections
    ? parseFilterTokens(existingSelections)
    : (currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : []);
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
  const selected = Array.from(select.selectedOptions).map(o => o.value);
  const existing = currentProjectInfo && currentProjectInfo.filter
    ? parseFilterTokens(currentProjectInfo.filter)
    : [];
  const existingMap = Object.fromEntries(existing.map(t => [t.type, t]));
  const tokens = selected.map(type => {
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
  return tokens.join(',');
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Export functions for testing in Node environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION: typeof ACTIVE_APP_VERSION === 'string' ? ACTIVE_APP_VERSION : APP_VERSION,
    closeSideMenu,
    openSideMenu,
    setupSideMenu,
    setupResponsiveControls,
    setLanguage,
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
    populateSensorModeDropdown,
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
      featureListElement: featureList,
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

const missingMountVoltageWarnings = new Set();

function warnMissingMountVoltageHelper(helperName, error) {
  const key = typeof helperName === 'string' && helperName ? helperName : 'unknown';
  if (missingMountVoltageWarnings.has(key)) {
    return;
  }
  missingMountVoltageWarnings.add(key);
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    const message = `Mount voltage helper "${key}" is unavailable; using defaults to protect user data.`;
    if (error) {
      console.warn(message, error);
    } else {
      console.warn(message);
    }
  }
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
    : (value, fallback) => {
        const numeric = Number(value);
        if (Number.isFinite(numeric)) {
          return numeric;
        }
        const fallbackNumeric = Number(fallback);
        return Number.isFinite(fallbackNumeric) ? fallbackNumeric : 0;
      };
  if (Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES)) {
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
      const defaults = DEFAULT_MOUNT_VOLTAGES?.[type] || {};
      clone[type] = {
        high: parse(defaults.high, defaults.high),
        low: parse(defaults.low, defaults.low),
      };
    });
  }
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
    : (value, fallback) => {
        const numeric = Number(value);
        if (Number.isFinite(numeric)) {
          return numeric;
        }
        const fallbackNumeric = Number(fallback);
        return Number.isFinite(fallbackNumeric) ? fallbackNumeric : 0;
      };
  const defaultClones = cloneMountVoltageDefaultsForSession();
  SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
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
  applySessionMountVoltagePreferences(values, { persist: false, triggerUpdate: true });
}

