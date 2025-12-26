/* global getSchemaAttributesForCategory */
// --- EVENT LISTENERS ---
/* global CORE_GLOBAL_SCOPE, updateCageSelectOptions, updateGlobalDevicesReference, scheduleProjectAutoSave,
          ensureAutoBackupsFromProjects, getDiagramManualPositions,
          setManualDiagramPositions, normalizeDiagramPositionsInput,
          normalizeSetupName, createProjectInfoSnapshotForStorage,
          applyDynamicFieldValues, applyBatteryPlateSelectionFromBattery,
          getPowerSelectionSnapshot, applyStoredPowerSelection,
          callCoreFunctionIfAvailable, suspendProjectPersistence,
          createProjectDeletionBackup,
          resumeProjectPersistence,
          setLensDeviceMountOptions, getLensDeviceMountOptions,
          clearLensDeviceMountOptions, updateMountTypeOptions,
          updateLensFocusScaleSelectOptions,
          normalizeFocusScale, buildSettingsBackupPackage, deviceSchema,
          applyPendingProjectNameCollisionResolution,
          SAFE_LOCAL_STORAGE */

const EVENTS_UI_HELPERS = (function resolveUiHelpersForEvents() {
  if (typeof require === 'function') {
    try {
      const required = require('./app-core-ui-helpers.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (uiHelpersError) {
      void uiHelpersError;
    }
  }

  const scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }

  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }

  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }

  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }

  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope) {
      continue;
    }
    try {
      const helpers = scope.cineCoreUiHelpers;
      if (helpers && typeof helpers === 'object') {
        return helpers;
      }
    } catch (scopeLookupError) {
      void scopeLookupError;
    }
  }

  return {};
})();

const UI_CACHE = (function resolveUiCache() {
  if (typeof cineUiCache !== 'undefined') {
    return cineUiCache;
  }
  if (typeof require === 'function') {
    try {
      return require('./modules/ui-cache.js');
    } catch (e) {
      // Fallback or ignore
    }
  }
  // Ultimate fallback if module not loaded
  return {
    getElement: function (id) {
      return typeof document !== 'undefined' ? document.getElementById(id) : null;
    }
  };
})();

// Helper to define global getters for UI elements
function defineUiGetter(name, id) {
  const targetId = id || name;
  try {
    Object.defineProperty(globalThis, name, {
      get: function () {
        return UI_CACHE[targetId] || UI_CACHE.getElement(targetId);
      },
      configurable: true,
      enumerable: true // Mimic var behavior
    });
  } catch (e) {
    // Fallback for strict mode or environments where globalThis is frozen
    globalThis[name] = null;
  }
}

const DEVICE_STORAGE_KEY_FOR_EVENTS = 'cameraPowerPlanner_devices';

// Redefine global variables to use the UI_CACHE getters
defineUiGetter('toggleDeviceBtn', 'toggleDeviceManager');
defineUiGetter('deviceManagerSection', 'device-manager');

defineUiGetter('saveSetupBtn');
defineUiGetter('setupNameInput', 'setupName');
defineUiGetter('deleteSetupBtn');
defineUiGetter('addDeviceBtn');
defineUiGetter('cancelEditBtn');
defineUiGetter('languageSelect');
defineUiGetter('skipLink');
defineUiGetter('importDataBtn');
defineUiGetter('importFileInput');
defineUiGetter('exportBtn', 'exportDataBtn');
defineUiGetter('generateGearListBtn');
defineUiGetter('deleteGearListProjectBtn');
defineUiGetter('gearItemEditExtra');
defineUiGetter('newSubcategorySelect', 'newSubcategory');
defineUiGetter('newCategorySelect', 'newCategory');
defineUiGetter('subcategoryFieldDiv', 'subcategoryField');
defineUiGetter('lensFocusScaleSelect', 'lensFocusScaleUnit');
defineUiGetter('newNameInput', 'newName');
defineUiGetter('newWattInput', 'newWatt');
defineUiGetter('newCapacityInput', 'newCapacity');
defineUiGetter('newPinAInput', 'newPinA');
defineUiGetter('newDtapAInput', 'newDtapA');
defineUiGetter('menuToggle');
defineUiGetter('darkModeToggle');
defineUiGetter('pinkModeToggle');
defineUiGetter('settingsButton');
defineUiGetter('settingsDialog');
defineUiGetter('settingsSave');
defineUiGetter('settingsCancel');
defineUiGetter('settingsLanguage');
defineUiGetter('settingsDarkMode');
defineUiGetter('settingsPinkMode');
defineUiGetter('settingsHighContrast');
defineUiGetter('settingsReduceMotion');
defineUiGetter('settingsRelaxedSpacing');
defineUiGetter('settingsShowAutoBackups');
defineUiGetter('settingsTemperatureUnit');
defineUiGetter('settingsFontSize');
defineUiGetter('settingsFontFamily');
defineUiGetter('settingsLogo');
defineUiGetter('settingsLogoPreview');
defineUiGetter('accentColorInput');
defineUiGetter('helpButton');
defineUiGetter('reloadButton');
defineUiGetter('closeMenuButton');
defineUiGetter('openContactsBtn');
defineUiGetter('shareSetupBtn');
defineUiGetter('applySharedLinkBtn');
defineUiGetter('generateOverviewBtn');
defineUiGetter('runtimeFeedbackBtn');
defineUiGetter('zoomOut');
defineUiGetter('zoomIn');
defineUiGetter('resetView');
defineUiGetter('gridSnapToggle');
defineUiGetter('accentColorReset');
defineUiGetter('resolvedLocalFontsButton', 'localFontsButton');
defineUiGetter('documentationTrackerAddRelease');
defineUiGetter('mountVoltageReset');
defineUiGetter('autoGearSavePreset');
defineUiGetter('autoGearDeletePreset');
defineUiGetter('autoGearBackupRestore');
defineUiGetter('autoGearAddRule');
defineUiGetter('autoGearResetFactory');
defineUiGetter('autoGearHighlightToggle');
defineUiGetter('closePrintPreviewBtn');
defineUiGetter('printPreviewExportBtn');
defineUiGetter('printPreviewPrintBtn');
defineUiGetter('projectForm');

function initDomReferences() {
  // Deprecated: DOM references are now lazy-loaded via UI_CACHE.
  // Keeping this function signature for compatibility if called externally.
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDomReferences);
  } else {
    initDomReferences();
  }
}

// Part 2
defineUiGetter('cameraWattInput', 'cameraWatt');
defineUiGetter('monitorWattInput', 'monitorWatt');
defineUiGetter('viewfinderWattInput', 'viewfinderWatt');
defineUiGetter('cameraVoltageInput', 'cameraVoltage');
defineUiGetter('cameraPortTypeInput', 'cameraPortType');
defineUiGetter('monitorScreenSizeInput', 'monitorScreenSize');
defineUiGetter('monitorBrightnessInput', 'monitorBrightness');
defineUiGetter('monitorVoltageInput', 'monitorVoltage');
defineUiGetter('monitorPortTypeInput', 'monitorPortType');
defineUiGetter('monitorLatencyInput', 'monitorLatency');
defineUiGetter('monitorAudioOutputInput', 'monitorAudioOutput');
defineUiGetter('viewfinderScreenSizeInput', 'viewfinderScreenSize');
defineUiGetter('viewfinderBrightnessInput', 'viewfinderBrightness');
defineUiGetter('viewfinderVoltageInput', 'viewfinderVoltage');
defineUiGetter('viewfinderPortTypeInput', 'viewfinderPortType');
defineUiGetter('viewfinderLatencyInput', 'viewfinderLatency');

defineUiGetter('batteryFieldsDiv', 'batteryFields');
defineUiGetter('cameraFieldsDiv', 'cameraFields');
defineUiGetter('monitorFieldsDiv', 'monitorFields');
defineUiGetter('viewfinderFieldsDiv', 'viewfinderFields');
defineUiGetter('videoFieldsDiv', 'videoFields');
defineUiGetter('motorFieldsDiv', 'motorFields');
defineUiGetter('controllerFieldsDiv', 'controllerFields');
defineUiGetter('distanceFieldsDiv', 'distanceFields');
defineUiGetter('lensFieldsDiv', 'lensFields');
defineUiGetter('wattFieldDiv', 'wattField');
defineUiGetter('dynamicFieldsDiv', 'dynamicFields');

const STORAGE_HELPERS_FOR_EVENTS = (function resolveStorageHelpersForEvents() {
  const resolved = {};

  const assignHelper = (source, key) => {
    if (!source || typeof resolved[key] === 'function') {
      return;
    }
    const value = source[key];
    if (typeof value === 'function') {
      resolved[key] = value;
    }
  };

  if (typeof require === 'function') {
    try {
      const storageModule = require('./storage.js');
      if (storageModule && typeof storageModule === 'object') {
        assignHelper(storageModule, 'getSafeLocalStorage');
        assignHelper(storageModule, 'saveDeviceData');
        assignHelper(storageModule, 'clearUiCacheStorageEntries');
      }
    } catch (storageRequireError) {
      void storageRequireError;
    }
  }

  const scopeCandidates = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE === 'object' && CORE_GLOBAL_SCOPE) {
      scopeCandidates.push(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }

  if (typeof globalThis === 'object' && globalThis) {
    scopeCandidates.push(globalThis);
  }

  if (typeof window === 'object' && window) {
    scopeCandidates.push(window);
  }

  if (typeof self === 'object' && self) {
    scopeCandidates.push(self);
  }

  if (typeof global === 'object' && global) {
    scopeCandidates.push(global);
  }

  for (let index = 0; index < scopeCandidates.length; index += 1) {
    const scope = scopeCandidates[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    assignHelper(scope, 'getSafeLocalStorage');
    assignHelper(scope, 'saveDeviceData');
    assignHelper(scope, 'clearUiCacheStorageEntries');

    if (
      typeof resolved.getSafeLocalStorage === 'function'
      && typeof resolved.saveDeviceData === 'function'
      && typeof resolved.clearUiCacheStorageEntries === 'function'
    ) {
      break;
    }
  }

  return resolved;
})();

const STORAGE_BACKUP_SUFFIX_FOR_EVENTS = '__backup';
const STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS = '__legacyMigrationBackup';

function clearDeviceStorageVariantForEvents(keyVariant, options) {
  if (typeof keyVariant !== 'string' || !keyVariant) {
    return false;
  }

  const settings = options && typeof options === 'object' ? options : {};
  const removalKeys = new Set();
  removalKeys.add(keyVariant);

  if (typeof STORAGE_BACKUP_SUFFIX_FOR_EVENTS === 'string' && STORAGE_BACKUP_SUFFIX_FOR_EVENTS) {
    removalKeys.add(`${keyVariant}${STORAGE_BACKUP_SUFFIX_FOR_EVENTS}`);
  }

  if (
    typeof STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS === 'string'
    && STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS
  ) {
    removalKeys.add(`${keyVariant}${STORAGE_MIGRATION_BACKUP_SUFFIX_FOR_EVENTS}`);
  }

  let removed = false;
  const logPrefix = settings.logPrefix || 'Failed to clear device storage variant';

  const storageCandidates = new Set();

  if (typeof STORAGE_HELPERS_FOR_EVENTS.getSafeLocalStorage === 'function') {
    try {
      const safeStorage = STORAGE_HELPERS_FOR_EVENTS.getSafeLocalStorage();
      if (safeStorage) {
        storageCandidates.add(safeStorage);
      }
    } catch (safeStorageError) {
      try {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn(`${logPrefix}: safe storage lookup failed`, safeStorageError);
        }
      } catch (logError) {
        void logError;
      }
    }
  }

  try {
    if (typeof SAFE_LOCAL_STORAGE !== 'undefined' && SAFE_LOCAL_STORAGE) {
      storageCandidates.add(SAFE_LOCAL_STORAGE);
    }
  } catch (safeLocalStorageLookupError) {
    void safeLocalStorageLookupError;
  }

  try {
    if (typeof globalThis === 'object' && globalThis && globalThis.localStorage) {
      storageCandidates.add(globalThis.localStorage);
    }
  } catch (globalThisLookupError) {
    void globalThisLookupError;
  }

  try {
    if (typeof window === 'object' && window && window.localStorage) {
      storageCandidates.add(window.localStorage);
    }
  } catch (windowLookupError) {
    void windowLookupError;
  }

  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      storageCandidates.add(localStorage);
    }
  } catch (localStorageLookupError) {
    void localStorageLookupError;
  }

  const removalTargets = Array.from(removalKeys);

  storageCandidates.forEach((storage) => {
    if (!storage || typeof storage.removeItem !== 'function') {
      return;
    }

    for (let index = 0; index < removalTargets.length; index += 1) {
      const removalKey = removalTargets[index];
      if (typeof removalKey !== 'string' || !removalKey) {
        continue;
      }

      try {
        storage.removeItem(removalKey);
        removed = true;
      } catch (removeError) {
        try {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn(`${logPrefix} "${removalKey}"`, removeError);
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  });

  if (typeof STORAGE_HELPERS_FOR_EVENTS.clearUiCacheStorageEntries === 'function') {
    try {
      STORAGE_HELPERS_FOR_EVENTS.clearUiCacheStorageEntries(removalTargets);
    } catch (cacheClearError) {
      try {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to clear UI cache entries for device storage reset', cacheClearError);
        }
      } catch (logError) {
        void logError;
      }
    }
  }

  return removed;
}

function clearAllDeviceStorageVariantsForEvents() {
  const variants = getDeviceStorageKeyVariantsForEvents();
  if (!variants || typeof variants.forEach !== 'function') {
    return false;
  }

  let clearedAny = false;
  variants.forEach((keyVariant) => {
    if (typeof keyVariant !== 'string' || !keyVariant) {
      return;
    }

    if (
      typeof DEVICE_STORAGE_KEY_FOR_EVENTS === 'string'
      && keyVariant === DEVICE_STORAGE_KEY_FOR_EVENTS
      && typeof STORAGE_HELPERS_FOR_EVENTS.saveDeviceData === 'function'
    ) {
      try {
        STORAGE_HELPERS_FOR_EVENTS.saveDeviceData(null);
        clearedAny = true;
      } catch (storeError) {
        try {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Failed to clear primary device storage via saveDeviceData', storeError);
          }
        } catch (logError) {
          void logError;
        }
      }
    }

    const removedVariant = clearDeviceStorageVariantForEvents(keyVariant, {
      logPrefix: 'Failed to clear device storage variant',
    });
    if (removedVariant) {
      clearedAny = true;
    }
  });

  return clearedAny;
}

const CABLE_SUBCATEGORY_FALLBACK_KEYS = Object.freeze(['power', 'video', 'fiz', 'cables']);

function getCableSubcategoryKeysForUi(preferredKeys) {
  const values = [];
  const seen = new Set();

  const pushKey = (key) => {
    if (typeof key !== 'string') {
      return;
    }
    const trimmed = key.trim();
    if (!trimmed || seen.has(trimmed)) {
      return;
    }
    seen.add(trimmed);
    values.push(trimmed);
  };

  let schemaSubcategories = null;
  try {
    const schema = typeof deviceSchema !== 'undefined' ? deviceSchema : null;
    schemaSubcategories =
      schema && schema.accessories && schema.accessories.cables
        ? schema.accessories.cables
        : null;
  } catch (schemaLookupError) {
    void schemaLookupError;
    schemaSubcategories = null;
  }

  if (schemaSubcategories && typeof schemaSubcategories === 'object') {
    try {
      for (const key of Object.keys(schemaSubcategories)) {
        pushKey(key);
      }
    } catch (schemaIterationError) {
      void schemaIterationError;
    }
  }

  for (let index = 0; index < CABLE_SUBCATEGORY_FALLBACK_KEYS.length; index += 1) {
    pushKey(CABLE_SUBCATEGORY_FALLBACK_KEYS[index]);
  }

  let existingSubcategories = null;
  try {
    const devicesRoot = typeof devices !== 'undefined' ? devices : null;
    existingSubcategories =
      devicesRoot && devicesRoot.accessories && devicesRoot.accessories.cables
        ? devicesRoot.accessories.cables
        : null;
  } catch (devicesLookupError) {
    void devicesLookupError;
    existingSubcategories = null;
  }

  if (existingSubcategories && typeof existingSubcategories === 'object') {
    try {
      for (const key of Object.keys(existingSubcategories)) {
        pushKey(key);
      }
    } catch (existingIterationError) {
      void existingIterationError;
    }
  }

  if (Array.isArray(preferredKeys)) {
    for (let index = 0; index < preferredKeys.length; index += 1) {
      pushKey(preferredKeys[index]);
    }
  } else {
    pushKey(preferredKeys);
  }

  return values;
}

function getDeviceStorageKeyVariantsForEvents() {
  if (typeof require === 'function') {
    try {
      const storage = require('./storage.js');
      if (storage && typeof storage === 'object') {
        if (typeof storage.getDeviceStorageKeyVariants === 'function') {
          const variants = storage.getDeviceStorageKeyVariants();
          if (variants && typeof variants.forEach === 'function') {
            return Array.from(variants);
          }
        }
        if (typeof storage.getStorageKeyVariants === 'function') {
          const variants = storage.getStorageKeyVariants(DEVICE_STORAGE_KEY_FOR_EVENTS);
          if (variants && typeof variants.forEach === 'function') {
            return Array.from(variants);
          }
        }
      }
    } catch (storageHelperError) {
      void storageHelperError;
    }
  }

  const variants = new Set();

  if (typeof DEVICE_STORAGE_KEY_FOR_EVENTS === 'string' && DEVICE_STORAGE_KEY_FOR_EVENTS) {
    variants.add(DEVICE_STORAGE_KEY_FOR_EVENTS);

    if (DEVICE_STORAGE_KEY_FOR_EVENTS.startsWith('cameraPowerPlanner_')) {
      variants.add(
        `cinePowerPlanner_${DEVICE_STORAGE_KEY_FOR_EVENTS.slice('cameraPowerPlanner_'.length)}`,
      );
    } else if (DEVICE_STORAGE_KEY_FOR_EVENTS.startsWith('cinePowerPlanner_')) {
      variants.add(
        `cameraPowerPlanner_${DEVICE_STORAGE_KEY_FOR_EVENTS.slice('cinePowerPlanner_'.length)}`,
      );
    }
  }

  return Array.from(variants);
}

const setButtonLabelWithIconForEvents = (function resolveSetButtonLabelWithIconForEvents() {
  if (typeof EVENTS_UI_HELPERS.setButtonLabelWithIcon === 'function') {
    return EVENTS_UI_HELPERS.setButtonLabelWithIcon;
  }

  const candidates = [];

  try {
    if (
      typeof CORE_GLOBAL_SCOPE === 'object' &&
      CORE_GLOBAL_SCOPE &&
      typeof CORE_GLOBAL_SCOPE.setButtonLabelWithIcon === 'function'
    ) {
      candidates.push(CORE_GLOBAL_SCOPE.setButtonLabelWithIcon);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }

  if (
    typeof globalThis !== 'undefined' &&
    globalThis &&
    typeof globalThis.setButtonLabelWithIcon === 'function'
  ) {
    candidates.push(globalThis.setButtonLabelWithIcon);
  }

  if (typeof window !== 'undefined' && window && typeof window.setButtonLabelWithIcon === 'function') {
    candidates.push(window.setButtonLabelWithIcon);
  }

  if (typeof self !== 'undefined' && self && typeof self.setButtonLabelWithIcon === 'function') {
    candidates.push(self.setButtonLabelWithIcon);
  }

  if (typeof global !== 'undefined' && global && typeof global.setButtonLabelWithIcon === 'function') {
    candidates.push(global.setButtonLabelWithIcon);
  }

  if (candidates.length > 0) {
    return candidates[0];
  }

  return function setButtonLabelWithIconFallback(button, label) {
    if (!button) {
      return;
    }
    try {
      button.textContent = typeof label === 'string' ? label : '';
    } catch (assignError) {
      void assignError;
    }
  };
})();

const BACKUP_FEATURE_FOR_EVENTS = (function resolveBackupFeatureForEvents() {
  if (typeof require === 'function') {
    try {
      const required = require('./modules/features/backup.js');
      if (required && typeof required === 'object') {
        return required;
      }
    } catch (requireError) {
      void requireError;
    }
  }

  const scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (scopeError) {
    void scopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope) {
      continue;
    }
    try {
      const feature = scope.cineFeatureBackup;
      if (feature && typeof feature === 'object') {
        return feature;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }

  return {};
})();

const queueBackupPayloadForVaultForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.queueBackupPayloadForVault === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.queueBackupPayloadForVault
  : null;
const getQueuedBackupPayloadsForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.getQueuedBackupPayloads === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.getQueuedBackupPayloads
  : null;
const removeQueuedBackupRecordForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.removeBackupVaultRecord === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.removeBackupVaultRecord
  : null;
const openQueuedBackupVaultWindowForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.openQueuedBackupVaultWindow === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.openQueuedBackupVaultWindow
  : null;
const resolveQueuedBackupMessageForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.resolveQueuedBackupMessage === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.resolveQueuedBackupMessage
  : null;
const downloadBackupPayloadForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.downloadBackupPayload === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.downloadBackupPayload
  : null;
const isBackupVaultFallbackActiveForEvents = typeof BACKUP_FEATURE_FOR_EVENTS.isBackupVaultFallbackActive === 'function'
  ? BACKUP_FEATURE_FOR_EVENTS.isBackupVaultFallbackActive
  : null;

const buildSettingsBackupPackageForEvents = (function resolveBuildSettingsBackupPackage() {
  if (typeof buildSettingsBackupPackage === 'function') {
    return buildSettingsBackupPackage;
  }
  const scopes = [];
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }
  } catch (scopeError) {
    void scopeError;
  }
  if (typeof globalThis !== 'undefined' && globalThis) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global) {
    scopes.push(global);
  }
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope) {
      continue;
    }
    if (typeof scope.buildSettingsBackupPackage === 'function') {
      return scope.buildSettingsBackupPackage;
    }
  }
  return null;
})();

// Locate a logging helper without assuming a specific runtime. The application
// runs in browsers, service workers and occasionally Node based tooling, so we
// patiently walk through every known global scope until we find the shared
// cineLogging helper. When the dedicated logging resolver module is available
// we reuse it to guarantee consistent metadata and console fallbacks.
function collectLoggingResolverScopes() {
  const scopes = [];

  const primary = getGlobalScope();
  if (primary && scopes.indexOf(primary) === -1) {
    scopes.push(primary);
  }
  if (typeof globalThis !== 'undefined' && globalThis && scopes.indexOf(globalThis) === -1) {
    scopes.push(globalThis);
  }
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) {
    scopes.push(window);
  }
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) {
    scopes.push(self);
  }
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) {
    scopes.push(global);
  }

  return scopes;
}

function resolveLoggingResolver() {
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

  const scopes = collectLoggingResolverScopes();
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

function resolveLegacyEventsLogger() {
  const scopes = collectLoggingResolverScopes();

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    let logging = null;
    try {
      logging = scope.cineLogging || null;
    } catch (error) {
      logging = null;
    }

    if (logging && typeof logging.createLogger === 'function') {
      try {
        return logging.createLogger('events', { meta: { source: 'app-events' } });
      } catch (creationError) {
        try {
          if (typeof logging.error === 'function') {
            logging.error('Failed to create events logger', creationError, { namespace: 'events-bootstrap' });
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  }

  return null;
}

const eventsLogger = (function resolveEventsLogger() {
  const resolver = resolveLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      const logger = resolver.resolveLogger('events', { meta: { source: 'app-events' } });
      if (logger) {
        return logger;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }

  return resolveLegacyEventsLogger();
})();

const APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG =
  (typeof globalThis !== 'undefined' && globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG)
    ? globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG
    : '__cineAutoBackupRenamed';

// Some editor update routines depend on cached option lists. In legacy builds
// these lived in the global scope, so we eagerly create the arrays here to
// avoid ReferenceErrors while the modern modules initialise.
if (typeof viewfinderTypeOptions === 'undefined' || !Array.isArray(viewfinderTypeOptions)) {
  viewfinderTypeOptions = [];
}
if (typeof viewfinderConnectorOptions === 'undefined' || !Array.isArray(viewfinderConnectorOptions)) {
  viewfinderConnectorOptions = [];
}

// We frequently need a safe reference to the global scope to access runtime
// helpers. This tiny utility keeps that logic readable so future maintainers do
// not have to remember every possible environment in which the planner runs.
function getGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis) return globalThis;
  if (typeof window !== 'undefined' && window) return window;
  if (typeof self !== 'undefined' && self) return self;
  if (typeof global !== 'undefined' && global) return global;
  return null;
}

const resolvedDeviceManagerElements = {
  categorySelect: null,
};

function resolveNewCategorySelect() {
  const cached = resolvedDeviceManagerElements.categorySelect;
  if (cached && typeof cached === 'object') {
    if (typeof cached.isConnected === 'boolean') {
      if (cached.isConnected) {
        return cached;
      }
    } else if (cached.ownerDocument) {
      return cached;
    }
  }

  let element = null;
  if (typeof newCategorySelect !== 'undefined' && newCategorySelect) {
    element = newCategorySelect;
  } else if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    element = document.getElementById('newCategory');
    if (!element) console.warn('Debug: resolveNewCategorySelect found nothing for ID newCategory');
  }

  if (element) {
    resolvedDeviceManagerElements.categorySelect = element;
    const scope = getGlobalScope();
    if (scope && typeof scope === 'object') {
      try {
        scope.newCategorySelect = scope.newCategorySelect || element;
      } catch (assignError) {
        void assignError;
      }
    }
  }

  return element;
}

// Autosaves are intentionally conservative: we track how many field level
// mutations happen between runs and enforce a time based cadence. This keeps
// user data safe even if the browser throttles timers or the tab goes idle.
const AUTO_BACKUP_CHANGE_THRESHOLD = 50;
const AUTO_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
// A whitelist of contexts that may trigger an auto backup. Restricting the
// reasons prevents accidental writes when unrelated systems emit noise.
const AUTO_BACKUP_ALLOWED_REASONS = [
  'interval',
  'project-switch',
  'import',
  'export',
  'export-revert',
  'before-reload',
  'change-threshold',
];
const AUTO_BACKUP_RATE_LIMITED_REASONS = new Set(['import']);
const AUTO_BACKUP_CADENCE_EXEMPT_REASONS = new Set([
  'import',
  'export',
  'export-revert',
  'before-reload',
  'project-switch',
]);

const AUTO_BACKUP_LOG_META = { feature: 'auto-backup' };

const DEVICE_IMPORT_LOG_META = { feature: 'device-import', source: 'app-events' };
const MAX_SANITIZED_IMPORT_ERRORS = 10;

function sanitizeErrorForLogging(error) {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  if (typeof error !== 'object') {
    try {
      return { message: String(error) };
    } catch (stringifyError) {
      void stringifyError;
      return { message: 'Unknown error' };
    }
  }

  const sanitized = {};
  if (typeof error.name === 'string' && error.name) {
    sanitized.name = error.name;
  }
  if (typeof error.message === 'string' && error.message) {
    sanitized.message = error.message;
  }
  if (typeof error.code === 'string' || typeof error.code === 'number') {
    sanitized.code = error.code;
  }
  if (typeof error.lineNumber === 'number') {
    sanitized.lineNumber = error.lineNumber;
  }
  if (typeof error.columnNumber === 'number') {
    sanitized.columnNumber = error.columnNumber;
  }

  if (Object.keys(sanitized).length > 0) {
    return sanitized;
  }

  try {
    return { message: String(error) };
  } catch (fallbackError) {
    void fallbackError;
    return { message: 'Unknown error' };
  }
}

function sanitizeImportErrors(errors) {
  if (!Array.isArray(errors) || errors.length === 0) {
    return [];
  }

  const sanitized = [];
  for (let index = 0; index < errors.length && sanitized.length < MAX_SANITIZED_IMPORT_ERRORS; index += 1) {
    const candidate = errors[index];
    if (typeof candidate === 'string') {
      sanitized.push(candidate);
    } else if (candidate && typeof candidate === 'object') {
      const entry = {};
      if (typeof candidate.message === 'string' && candidate.message) {
        entry.message = candidate.message;
      }
      if (typeof candidate.code === 'string' || typeof candidate.code === 'number') {
        entry.code = candidate.code;
      }
      if (Object.keys(entry).length > 0) {
        sanitized.push(entry);
      } else {
        try {
          sanitized.push(String(candidate));
        } catch (stringifyError) {
          void stringifyError;
        }
      }
    } else {
      try {
        sanitized.push(String(candidate));
      } catch (stringifyError) {
        void stringifyError;
      }
    }
  }

  return sanitized;
}

function safeCountDevices(collection) {
  if (typeof countDeviceDatabaseEntries !== 'function') {
    return null;
  }

  if (!collection || typeof collection !== 'object') {
    return collection === null ? 0 : null;
  }

  try {
    return countDeviceDatabaseEntries(collection);
  } catch (error) {
    void error;
  }

  return null;
}

function buildDeviceCountsSnapshot(currentDevices, importedDevices) {
  const snapshot = {};
  const existingCount = safeCountDevices(currentDevices);
  if (typeof existingCount === 'number') {
    snapshot.existing = existingCount;
  }
  const importedCount = safeCountDevices(importedDevices);
  if (typeof importedCount === 'number') {
    snapshot.imported = importedCount;
  }
  return Object.keys(snapshot).length > 0 ? snapshot : null;
}

function logDeviceImportEvent(level, message, detail, metaOverrides) {
  if (!eventsLogger || typeof eventsLogger[level] !== 'function') {
    return;
  }

  const meta = metaOverrides && typeof metaOverrides === 'object'
    ? { ...DEVICE_IMPORT_LOG_META, ...metaOverrides }
    : DEVICE_IMPORT_LOG_META;

  try {
    eventsLogger[level](message, detail || {}, meta);
  } catch (loggerError) {
    void loggerError;
  }
}

function resolveConsoleMethodForLevel(level) {
  if (typeof level !== 'string') {
    return 'log';
  }
  const normalized = level.toLowerCase();
  if (normalized === 'warn' || normalized === 'error' || normalized === 'info' || normalized === 'debug') {
    return normalized === 'debug' && typeof console !== 'undefined' && console && typeof console.debug !== 'function'
      ? 'log'
      : normalized;
  }
  return 'log';
}

function resolveCoreAutoBackupNamespace() {
  if (typeof require === 'function') {
    try {
      return require('./app-core-auto-backup.js');
    } catch (autoBackupRequireError) {
      void autoBackupRequireError;
    }
  }

  const candidateScopes = [
    getGlobalScope(),
    typeof globalThis !== 'undefined' ? globalThis : null,
    typeof window !== 'undefined' ? window : null,
    typeof self !== 'undefined' ? self : null,
    typeof global !== 'undefined' ? global : null,
  ];

  for (let index = 0; index < candidateScopes.length; index += 1) {
    const scope = candidateScopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (scope.CORE_AUTO_BACKUP && typeof scope.CORE_AUTO_BACKUP === 'object') {
        return scope.CORE_AUTO_BACKUP;
      }
    } catch (lookupError) {
      void lookupError;
    }
  }

  return null;
}

const AUTO_BACKUP_LOGGER_NAMESPACE = resolveCoreAutoBackupNamespace();
const delegatedAutoBackupLogger =
  AUTO_BACKUP_LOGGER_NAMESPACE && typeof AUTO_BACKUP_LOGGER_NAMESPACE.logAutoBackupEvent === 'function'
    ? AUTO_BACKUP_LOGGER_NAMESPACE.logAutoBackupEvent
    : null;

function logAutoBackupEvent(level, message, detail, metaOverrides) {
  const resolvedLevel = typeof level === 'string' && level ? level : 'info';
  const resolvedMessage = typeof message === 'string' && message ? message : 'Auto backup event';
  const meta = metaOverrides && typeof metaOverrides === 'object'
    ? { ...AUTO_BACKUP_LOG_META, ...metaOverrides }
    : AUTO_BACKUP_LOG_META;

  let delegateHandled = false;
  if (delegatedAutoBackupLogger) {
    try {
      delegatedAutoBackupLogger(resolvedLevel, resolvedMessage, detail, meta);
      delegateHandled = true;
    } catch (delegateError) {
      delegateHandled = false;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        try {
          console.warn('Auto backup delegate logging failed', delegateError);
        } catch (delegateConsoleError) {
          void delegateConsoleError;
        }
      }
    }
  }

  let handledByLogger = false;
  if (eventsLogger && typeof eventsLogger[resolvedLevel] === 'function') {
    try {
      eventsLogger[resolvedLevel](resolvedMessage, detail, meta);
      handledByLogger = true;
    } catch (loggerError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Auto backup logger invocation failed', loggerError, {
            ...meta,
            originalLevel: resolvedLevel,
            originalMessage: resolvedMessage,
          });
        } catch (fallbackLogError) {
          void fallbackLogError;
        }
      }
    }
  }

  if (!(handledByLogger || delegateHandled) && typeof console !== 'undefined' && console) {
    const consoleMethod = resolveConsoleMethodForLevel(resolvedLevel);
    const fallback = typeof console[consoleMethod] === 'function' ? console[consoleMethod] : console.log;
    if (typeof fallback === 'function') {
      try {
        if (typeof detail !== 'undefined') {
          fallback.call(console, `[auto-backup] ${resolvedMessage}`, detail);
        } else {
          fallback.call(console, `[auto-backup] ${resolvedMessage}`);
        }
      } catch (consoleError) {
        void consoleError;
      }
    }
  }
}

function summarizeAutoBackupPayloadForLog(payload) {
  if (!payload || typeof payload !== 'object') {
    return { hasContent: false };
  }

  const summary = {
    hasContent: false,
    projectInfoKeys: 0,
    gearListLength: 0,
    gearListAndProjectRequirementsGenerated: Boolean(payload.gearListAndProjectRequirementsGenerated),
    powerSelectionKeys: 0,
    gearSelectorGroups: 0,
    diagramPositionCount: 0,
    autoGearRuleCount: 0,
  };

  const projectInfo = payload.projectInfo && typeof payload.projectInfo === 'object'
    ? payload.projectInfo
    : null;
  if (projectInfo) {
    try {
      summary.projectInfoKeys = Object.keys(projectInfo).length;
    } catch (projectInfoError) {
      summary.projectInfoKeys = 0;
    }
  }

  if (typeof payload.gearList === 'string') {
    summary.gearListLength = payload.gearList.length;
  }

  const powerSelection = payload.powerSelection && typeof payload.powerSelection === 'object'
    ? payload.powerSelection
    : null;
  if (powerSelection) {
    try {
      summary.powerSelectionKeys = Object.keys(powerSelection).length;
    } catch (powerSelectionError) {
      summary.powerSelectionKeys = 0;
    }
  }

  const gearSelectors = payload.gearSelectors && typeof payload.gearSelectors === 'object'
    ? payload.gearSelectors
    : null;
  if (gearSelectors) {
    try {
      summary.gearSelectorGroups = Object.keys(gearSelectors).length;
    } catch (gearSelectorsError) {
      summary.gearSelectorGroups = 0;
    }
  }

  const diagramPositions = payload.diagramPositions && typeof payload.diagramPositions === 'object'
    ? payload.diagramPositions
    : null;
  if (diagramPositions) {
    try {
      summary.diagramPositionCount = Object.keys(diagramPositions).length;
    } catch (diagramPositionsError) {
      summary.diagramPositionCount = 0;
    }
  }

  if (Array.isArray(payload.autoGearRules)) {
    summary.autoGearRuleCount = payload.autoGearRules.length;
  }

  summary.hasContent = Boolean(
    summary.projectInfoKeys
    || summary.gearListLength
    || summary.gearListAndProjectRequirementsGenerated
    || summary.powerSelectionKeys
    || summary.gearSelectorGroups
    || summary.diagramPositionCount
    || summary.autoGearRuleCount,
  );

  return summary;
}

function resolveAutoBackupLogLevel(status, reason) {
  const normalizedStatus = typeof status === 'string' ? status : '';
  const normalizedReason = typeof reason === 'string' ? reason : '';
  if (normalizedStatus === 'error') {
    return 'error';
  }
  if (normalizedStatus === 'success') {
    return 'info';
  }
  if (normalizedStatus === 'skipped') {
    if (normalizedReason === 'disallowed' || normalizedReason === 'auto-backup-selected') {
      return 'warn';
    }
    return 'info';
  }
  return 'debug';
}

function resolveAutoBackupLogMessage(status, reason) {
  const normalizedStatus = typeof status === 'string' ? status : '';
  const normalizedReason = typeof reason === 'string' ? reason : '';
  if (normalizedStatus === 'success') {
    return 'Auto backup completed successfully';
  }
  if (normalizedStatus === 'error') {
    return normalizedReason
      ? `Auto backup failed (${normalizedReason})`
      : 'Auto backup failed';
  }
  if (normalizedStatus === 'skipped') {
    return normalizedReason
      ? `Auto backup skipped (${normalizedReason})`
      : 'Auto backup skipped';
  }
  return 'Auto backup run recorded';
}

function createDefaultAutoBackupLogDetail(result) {
  if (!result || typeof result !== 'object') {
    return { status: 'unknown' };
  }

  const detail = {
    status: typeof result.status === 'string' ? result.status : 'unknown',
  };

  if (typeof result.reason === 'string' && result.reason) {
    detail.reason = result.reason;
  }
  if (typeof result.context === 'string' && result.context) {
    detail.context = result.context;
  }
  if (typeof result.elapsedSinceLastAutoBackupMs === 'number' && Number.isFinite(result.elapsedSinceLastAutoBackupMs)) {
    detail.elapsedSinceLastAutoBackupMs = Math.max(0, result.elapsedSinceLastAutoBackupMs);
  }
  if (typeof result.remainingIntervalMs === 'number' && Number.isFinite(result.remainingIntervalMs)) {
    detail.remainingIntervalMs = Math.max(0, result.remainingIntervalMs);
  }
  if (typeof result.changesSinceSnapshot === 'number' && Number.isFinite(result.changesSinceSnapshot)) {
    detail.changesSinceSnapshot = Math.max(0, result.changesSinceSnapshot);
  }
  if (typeof result.requiredChangeThreshold === 'number' && Number.isFinite(result.requiredChangeThreshold)) {
    detail.requiredChangeThreshold = Math.max(0, result.requiredChangeThreshold);
  }
  if (typeof result.remainingChanges === 'number' && Number.isFinite(result.remainingChanges)) {
    detail.remainingChanges = Math.max(0, result.remainingChanges);
  }
  if (typeof result.requiredIntervalMs === 'number' && Number.isFinite(result.requiredIntervalMs)) {
    detail.requiredIntervalMs = Math.max(0, result.requiredIntervalMs);
  }
  if (typeof result.name === 'string') {
    const trimmedName = result.name.trim();
    detail.hasName = trimmedName.length > 0;
    detail.nameLength = trimmedName.length;
    detail.nameWasAutoGenerated = trimmedName.startsWith('auto-backup-');
  }
  if (typeof result.createdAt === 'string' && result.createdAt) {
    detail.createdAt = result.createdAt;
  }

  return detail;
}

const AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS = 2 * 60 * 1000;
const lastAutoBackupReasonState = new Map();
const AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS = 800;

let autoBackupChangesSinceSnapshot = 0;
let autoBackupThresholdInProgress = false;
let autoBackupChangePendingCommit = false;
let lastAutoBackupCompletedAtMs = 0;
let lastImmediateAutoBackupCommitAtMs = 0;

function resetAutoBackupChangeCounter() {
  autoBackupChangesSinceSnapshot = 0;
}

function recordAutoBackupRun(result, logDetailOverride) {
  autoBackupThresholdInProgress = false;
  if (!result || typeof result !== 'object') {
    logAutoBackupEvent('warn', 'Auto backup run recorded without result metadata', { status: 'unknown' });
    return;
  }
  const status = typeof result.status === 'string' ? result.status : null;
  const reason = typeof result.reason === 'string' ? result.reason : null;
  const detail = logDetailOverride && typeof logDetailOverride === 'object'
    ? { ...logDetailOverride }
    : createDefaultAutoBackupLogDetail(result);
  const level = resolveAutoBackupLogLevel(status, reason);
  const message = resolveAutoBackupLogMessage(status, reason);
  logAutoBackupEvent(level, message, detail);

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
  const scope = getGlobalScope();
  const indicator = scope && typeof scope.__cineShowAutoBackupIndicator === 'function'
    ? scope.__cineShowAutoBackupIndicator
    : null;
  if (!indicator) {
    return () => { };
  }
  try {
    const message = resolveAutoBackupIndicatorMessage();
    const hide = indicator(message);
    return typeof hide === 'function' ? hide : () => { };
  } catch (indicatorError) {
    console.warn('Failed to show auto backup indicator', indicatorError);
    return () => { };
  }
}

function triggerAutoBackupForChangeThreshold(details) {
  if (autoBackupThresholdInProgress) {
    return;
  }
  autoBackupThresholdInProgress = true;
  const run = () => {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'change-threshold',
      });
    } catch (error) {
      console.warn('Failed to run auto backup after change threshold', error);
      autoBackupThresholdInProgress = false;
      logAutoBackupEvent('error', 'Auto backup change-threshold execution failed', {
        status: 'error',
        reason: 'change-threshold-run',
        errorName: error && typeof error.name === 'string' ? error.name : null,
        errorMessage: error && typeof error.message === 'string' ? error.message : null,
      });
    }
  };
  if (typeof queueMicrotask === 'function') {
    try {
      queueMicrotask(run);
      return;
    } catch (queueError) {
      console.warn('Failed to queue auto backup microtask', queueError);
      logAutoBackupEvent('warn', 'Auto backup microtask scheduling failed', {
        status: 'skipped',
        reason: 'microtask-scheduling',
        errorName: queueError && typeof queueError.name === 'string' ? queueError.name : null,
        errorMessage: queueError && typeof queueError.message === 'string' ? queueError.message : null,
      });
    }
  }
  const timer = setTimeout(run, 0);
  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}

function noteAutoBackupRelevantChange(details = {}) {
  // Some change types (such as typing) emit a "pending" notification which we
  // coalesce until the change settles. Others explicitly request a commit when
  // the user performs a critical action like switching projects.
  if (details && details.reset === true) {
    resetAutoBackupChangeCounter();
    autoBackupChangePendingCommit = false;
    lastImmediateAutoBackupCommitAtMs = 0;
    return;
  }
  const pendingNotification = Boolean(details && details.pending === true);
  const commitRequested = Boolean(details && details.commit === true);
  const commitContext = details && typeof details.context === 'object' && details.context !== null
    ? details.context
    : null;

  if (pendingNotification) {
    autoBackupChangePendingCommit = true;
    return;
  }

  if (commitRequested && !autoBackupChangePendingCommit && details.force !== true) {
    return;
  }

  if (commitRequested || autoBackupChangePendingCommit) {
    autoBackupChangePendingCommit = false;

    const immediateCommit = Boolean(commitContext && commitContext.immediate === true);
    if (immediateCommit) {
      let commitTimestamp = null;
      if (
        commitContext
        && typeof commitContext.completedAt === 'number'
        && Number.isFinite(commitContext.completedAt)
      ) {
        commitTimestamp = commitContext.completedAt;
      } else if (
        commitContext
        && typeof commitContext.requestedAt === 'number'
        && Number.isFinite(commitContext.requestedAt)
      ) {
        commitTimestamp = commitContext.requestedAt;
      }
      if (!Number.isFinite(commitTimestamp)) {
        commitTimestamp = Date.now();
      }
      if (
        details.force !== true
        && lastImmediateAutoBackupCommitAtMs > 0
        && commitTimestamp >= lastImmediateAutoBackupCommitAtMs
        && commitTimestamp - lastImmediateAutoBackupCommitAtMs < AUTO_BACKUP_IMMEDIATE_COMMIT_DEBOUNCE_MS
      ) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
        return;
      }
      if (
        commitTimestamp >= lastImmediateAutoBackupCommitAtMs
        || lastImmediateAutoBackupCommitAtMs <= 0
      ) {
        lastImmediateAutoBackupCommitAtMs = commitTimestamp;
      }
    }

    autoBackupChangesSinceSnapshot = Math.min(
      AUTO_BACKUP_CHANGE_THRESHOLD,
      autoBackupChangesSinceSnapshot + 1,
    );
    if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
      triggerAutoBackupForChangeThreshold(details);
    }
    return;
  }

  autoBackupChangesSinceSnapshot = Math.min(
    AUTO_BACKUP_CHANGE_THRESHOLD,
    autoBackupChangesSinceSnapshot + 1,
  );
  if (autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD) {
    triggerAutoBackupForChangeThreshold(details);
  }
}

try {
  const scope = getGlobalScope();
  if (scope) {
    scope.__cineNoteAutoBackupChange = noteAutoBackupRelevantChange;
  }
} catch (changeExposeError) {
  console.warn('Failed to expose auto backup change tracker', changeExposeError);
}

function markAutoBackupDataAsRenamed(value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  try {
    value[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
  } catch (assignmentError) {
    void assignmentError;
  }
  const info = value.projectInfo;
  if (info && typeof info === 'object') {
    try {
      info[APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG] = true;
    } catch (infoError) {
      void infoError;
    }
  }
}

function callEventsCoreFunction(functionName, args = [], options = {}) {
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }

  const scope =
    (typeof globalThis !== 'undefined' ? globalThis : null)
    || (typeof window !== 'undefined' ? window : null)
    || (typeof self !== 'undefined' ? self : null)
    || (typeof global !== 'undefined' ? global : null)
    || null;

  const target =
    typeof functionName === 'string'
      ? scope && scope[functionName]
      : functionName;

  if (typeof target === 'function') {
    try {
      return target.apply(scope, args);
    } catch (invokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        const metadata = {
          functionName,
          deferred: !!(options && options.defer),
          argumentsSnapshot: Array.isArray(args) ? args.slice(0, 5) : null,
        };
        try {
          eventsLogger.error(`Failed to invoke ${functionName}`, invokeError, metadata);
        } catch (logError) {
          void logError;
        }
      }

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
        callEventsCoreFunction(functionName, args, { ...options, defer: false });
      });
    }
  }

  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue')
    ? options.defaultValue
    : undefined;
}

const CORE_FUNCTION_MISSING_SENTINEL = Object.freeze({ missing: true });

const VIDEO_POWER_INPUT_HELPERS = (function resolveVideoPowerInputHelpers() {
  if (typeof require === 'function') {
    try {
      const helpers = require('./modules/video-power-inputs.js');
      if (helpers && typeof helpers === 'object') {
        return helpers;
      }
    } catch (helperError) {
      void helperError;
    }
  }
  return {};
})();

function invokeCoreFunctionStrict(functionName, args = []) {
  const result = callEventsCoreFunction(functionName, args, { defaultValue: CORE_FUNCTION_MISSING_SENTINEL });
  if (result === CORE_FUNCTION_MISSING_SENTINEL) {
    const error = new ReferenceError(`Missing core function: ${functionName}`);
    if (eventsLogger && typeof eventsLogger.error === 'function') {
      try {
        eventsLogger.error(`Missing core function: ${functionName}`, error);
      } catch (logError) {
        void logError;
      }
    }
    throw error;
  }
  return result;
}

function resolveFirstPowerInputType(device) {
  let result;

  try {
    result = callEventsCoreFunction('firstPowerInputType', [device]);
  } catch (error) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn('Failed to resolve firstPowerInputType from core', error, {
          namespace: 'device-editor',
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

  if (result && typeof result === 'object') {
    const candidate = result.type || result.portType;
    if (typeof candidate === 'string') {
      return candidate;
    }
  }

  return '';
}

function resolveCoreOptionsArray(functionName, existingValues = []) {
  const fallback = Array.isArray(existingValues) ? existingValues.slice() : [];

  try {
    const result = callEventsCoreFunction(functionName);
    if (Array.isArray(result)) {
      return result.slice();
    }
  } catch (coreError) {
    if (eventsLogger && typeof eventsLogger.warn === 'function') {
      try {
        eventsLogger.warn(`Failed to resolve ${functionName}`, coreError);
      } catch (logError) {
        void logError;
      }
    }

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(`Failed to resolve ${functionName}`, coreError);
    }
  }

  return fallback;
}

function readGlobalArraySnapshot(key) {
  const scope = getGlobalScope();
  if (!scope || !key) {
    return [];
  }

  const value = scope[key];
  return Array.isArray(value) ? value.slice() : [];
}

function publishGlobalArraySnapshot(key, values) {
  const scope = getGlobalScope();
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
      console.warn(`Failed to persist ${key} options on the global scope`, error);
    }
  }
}

function syncCoreOptionsArray(globalKey, functionName, existingValues = []) {
  const aggregated = [];
  const seen = new Set();

  const addValues = (values) => {
    if (!Array.isArray(values)) {
      return;
    }
    for (let index = 0; index < values.length; index += 1) {
      const option = values[index];
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

  const resolved = resolveCoreOptionsArray(functionName, aggregated);
  const finalValues = Array.isArray(resolved) ? resolved : aggregated;

  publishGlobalArraySnapshot(globalKey, finalValues);

  return finalValues;
}

const initialViewfinderTypeOptions =
  typeof viewfinderTypeOptions !== 'undefined' && Array.isArray(viewfinderTypeOptions)
    ? viewfinderTypeOptions
    : [];
viewfinderTypeOptions = syncCoreOptionsArray(
  'viewfinderTypeOptions',
  'getAllViewfinderTypes',
  initialViewfinderTypeOptions,
);

const initialViewfinderConnectorOptions =
  typeof viewfinderConnectorOptions !== 'undefined' && Array.isArray(viewfinderConnectorOptions)
    ? viewfinderConnectorOptions
    : [];
viewfinderConnectorOptions = syncCoreOptionsArray(
  'viewfinderConnectorOptions',
  'getAllViewfinderConnectors',
  initialViewfinderConnectorOptions,
);

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

function refreshDeviceListsSafe() {
  if (typeof refreshDeviceLists === 'function') {
    try {
      refreshDeviceLists();
      return;
    } catch (refreshError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('refreshDeviceLists failed, retrying via core bridge.', refreshError);
      }
    }
  }
  if (typeof callEventsCoreFunction === 'function') {
    try {
      callEventsCoreFunction('refreshDeviceLists');
    } catch (bridgeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not refresh device lists via core bridge.', bridgeError);
      }
    }
  }
}

function hasAnyDeviceSelectionSafe(state) {
  const coreHelper = readCoreDeviceSelectionHelper();
  if (coreHelper) {
    try {
      return coreHelper(state);
    } catch (error) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        const statePreview =
          state && typeof state === 'object'
            ? Object.keys(state).slice(0, 10)
            : null;
        try {
          eventsLogger.warn(
            'Failed to evaluate device selections via core helper',
            error,
            { statePreview },
          );
        } catch (logError) {
          void logError;
        }
      }

      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to evaluate device selections via core helper', error);
      }
    }
  }

  if (!state || typeof state !== 'object') {
    return false;
  }

  const isMeaningfulSelection = value => {
    if (Array.isArray(value)) {
      return value.some(item => isMeaningfulSelection(item));
    }
    if (value == null) {
      return false;
    }
    const normalized = typeof value === 'string' ? value.trim() : value;
    if (!normalized) {
      return false;
    }
    if (typeof normalized === 'string') {
      const lower = normalized.toLowerCase();
      if (lower === 'none') {
        return false;
      }

      if (
        lower === '--'
        || lower === '—'
        || lower === 'n/a'
        || lower === 'tbd'
        || lower === 'pending'
        || lower.startsWith('-- ')
        || lower.startsWith('— ')
        || lower.startsWith('select ')
        || lower.startsWith('choose ')
        || lower.startsWith('pick ')
        || lower.startsWith('add ')
      ) {
        return false;
      }
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
    state.batteryHotswap,
  ];

  if (primarySelections.some(value => isMeaningfulSelection(value))) {
    return true;
  }

  if (isMeaningfulSelection(state.motors)) {
    return true;
  }

  if (isMeaningfulSelection(state.controllers)) {
    return true;
  }

  if (isMeaningfulSelection(state.distance)) {
    return true;
  }

  return false;
}

function getEventsCoreValue(functionName, options = {}) {
  const defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue')
    ? options.defaultValue
    : '';
  const value = callEventsCoreFunction(functionName, [], { defaultValue });
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
  callEventsCoreFunction('storeLoadedSetupState', [state], { defaultValue: undefined });
}

function resolveCineUi() {
  const scopes = [];

  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (scope.cineUi && typeof scope.cineUi === 'object') {
        return scope.cineUi;
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
    const element = document.getElementById('setupSelect');
    if (element) {
      return element;
    }
  }
  return null;
}

function addSafeEventListener(target, type, handler, options) {
  if (target && typeof target.addEventListener === 'function') {
    target.addEventListener(type, handler, options);
    return;
  }

  // Helper to find element by ID or selector
  const findElement = (str) => {
    let el = document.getElementById(str);
    if (!el) {
      try {
        el = document.querySelector(str);
      } catch (e) {
        // Ignore invalid selectors
      }
    }
    return el;
  };

  // If the target is a string, it's a selector or ID
  if (typeof target === 'string') {
    const el = findElement(target);
    if (el) {
      el.addEventListener(type, handler, options);
      return;
    }

    // Use the robust polling listener if available
    if (EVENTS_UI_HELPERS && typeof EVENTS_UI_HELPERS.whenElementAvailable === 'function') {
      EVENTS_UI_HELPERS.whenElementAvailable(target, (foundEl) => {
        // Re-verify it has addEventListener in case it's a weird object
        if (foundEl && typeof foundEl.addEventListener === 'function') {
          foundEl.addEventListener(type, handler, options);
        }
      });
      return;
    }
  }

  // Fallback for objects/names that are not strings or if helper missing
  document.addEventListener('DOMContentLoaded', () => {
    let el = null;
    if (typeof target === 'string') {
      el = findElement(target);
    } else if (target && target.id) {
      el = document.getElementById(target.id);
    }

    if (el && typeof el.addEventListener === 'function') {
      el.addEventListener(type, handler, options);
    }
  });
}

let eventsCineUiRegistered = false;

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
      console.warn('cineUi registration callback failed', callbackError);
    }
    return;
  }

  const key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }

  scope[key].push(callback);
}

enqueueCineUiRegistration(registerEventsCineUiInternal);

// Language selection
addSafeEventListener('languageSelect', "change", event => {
  const updateDropdowns = () => {
    if (typeof populateUserButtonDropdowns === 'function') {
      try {
        populateUserButtonDropdowns();
      } catch (userButtonError) {
        console.warn('Failed to refresh user button selectors after manual language change', userButtonError);
      }
    }
  };

  try {
    const result = setLanguage(event.target.value);
    if (result && typeof result.then === 'function') {
      result.then(updateDropdowns).catch(error => {
        console.warn('Language selection update failed', error);
      });
      return;
    }
  } catch (languageError) {
    console.warn('Language selection handler threw', languageError);
  }

  updateDropdowns();
});

addSafeEventListener('skipLink', "click", () => {
  const main = document.getElementById("mainContent");
  if (main) main.focus();
});

// Filtering inputs




// Setup management
function handleSaveSetupClick(optionsOrEvent) {
  const isSilent = optionsOrEvent && optionsOrEvent.silent === true;

  if (typeof applyPendingProjectNameCollisionResolution === 'function') {
    try {
      applyPendingProjectNameCollisionResolution();
    } catch (pendingError) {
      console.warn('Failed to finalize pending project name collision before saving setup', pendingError);
    }
  }
  const typedName = setupNameInput.value.trim();
  if (!typedName) {
    if (!isSilent) {
      if (typeof window.cineShowAlertDialog === 'function') {
        window.cineShowAlertDialog({
          title: langTexts.alertSetupNameTitle || fallbackTexts.alertSetupNameTitle || 'Project Name Required',
          message: texts[currentLang].alertSetupName
        });
      } else {
        alert(texts[currentLang].alertSetupName);
      }
    }
    return;
  }
  const currentSetup = { ...getCurrentSetupState() };
  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  const hasDeviceSelection = hasAnyDeviceSelectionSafe(currentSetup);
  const gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }

  const setupSelectElement = getSetupSelectElement();
  const selectedName = setupSelectElement && typeof setupSelectElement.value === 'string'
    ? setupSelectElement.value
    : '';
  const renamingExisting = Boolean(selectedName && typedName && selectedName !== typedName);
  const renamingAutoBackup = renamingExisting
    && typeof selectedName === 'string'
    && selectedName.startsWith('auto-backup-');
  let setups = getSetups();
  const setupsBeforeRename = renamingExisting
    ? JSON.parse(JSON.stringify(setups || {}))
    : null;
  let finalName = typedName;
  let storedProjectSnapshot = null;
  let didPersistProject = !renamingExisting;
  let didAttemptProjectPersist = false;

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
        const renamed = renameSetup(selectedName, typedName);
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

  const finalIsAutoBackup = typeof finalName === 'string' && finalName.startsWith('auto-backup-');
  if (renamingAutoBackup && finalIsAutoBackup) {
    markAutoBackupDataAsRenamed(currentSetup);
  }

  setups[finalName] = currentSetup;
  storeSetups(setups);

  if (renamingExisting && storedProjectSnapshot && typeof saveProject === 'function') {
    didAttemptProjectPersist = true;
    try {
      if (renamingAutoBackup && finalIsAutoBackup) {
        markAutoBackupDataAsRenamed(storedProjectSnapshot);
      }
      saveProject(finalName, storedProjectSnapshot, {
        skipOverwriteBackup: true,
        renamedFrom: selectedName
      });
      didPersistProject = true;
    } catch (error) {
      didPersistProject = false;
      console.warn('Failed to preserve project data during setup rename', error);
    }
    if (didPersistProject && typeof loadProject === 'function') {
      try {
        const persistedProject = loadProject(finalName);
        didPersistProject = Boolean(persistedProject && typeof persistedProject === 'object');
      } catch (error) {
        didPersistProject = false;
        console.warn('Failed to confirm project data after setup rename', error);
      }
    }
  } else if (renamingExisting && storedProjectSnapshot) {
    didAttemptProjectPersist = true;
    didPersistProject = false;
  }

  if (renamingExisting && didAttemptProjectPersist && !didPersistProject) {
    if (setupsBeforeRename) {
      storeSetups(setupsBeforeRename);
      setups = setupsBeforeRename;
    }
    finalName = selectedName;
    const warnMessage = langTexts.alertSetupRenameSaveFailed || fallbackTexts.alertSetupRenameSaveFailed;
    if (typeof warnMessage === 'string' && warnMessage) {
      if (typeof showNotification === 'function') {
        try {
          showNotification('warning', warnMessage);
        } catch (notifyError) {
          void notifyError;
        }
      } else {
        if (typeof window.cineShowAlertDialog === 'function') {
          window.cineShowAlertDialog({
            title: langTexts.alertSetupRenameSaveFailedTitle || 'Rename Failed',
            message: warnMessage
          });
        } else {
          alert(warnMessage);
        }
      }
    }
  }

  populateSetupSelect();
  if (!isSilent) {
    setupNameInput.value = finalName;
  }
  if (setupSelectElement) {
    setupSelectElement.value = finalName; // Select the saved setup (new or renamed)
  }
  lastSetupName = finalName;
  saveCurrentSession(); // Persist selection so refreshes restore this setup
  storeLoadedSetupStateSafe(getCurrentSetupState());
  checkSetupChanged();
  // Ensure the current gear list stays persisted with the project so setups
  // remain in sync with the automatically saved table.
  saveCurrentGearList();

  if (renamingExisting && selectedName && selectedName !== finalName && didPersistProject) {
    if (typeof deleteProject === 'function') {
      try {
        deleteProject(selectedName);
      } catch (error) {
        console.warn('Failed to remove old project entry during setup rename', error);
      }
    } else if (typeof saveProject === 'function') {
      try {
        saveProject(selectedName, { projectInfo: null, gearList: '' }, { skipOverwriteBackup: true });
      } catch (error) {
        console.warn('Failed to clear legacy project entry during setup rename', error);
      }
    }
  }

  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }

  const saveAlertTemplate = hasDeviceSelection
    ? (langTexts.alertSetupSaved || fallbackTexts.alertSetupSaved)
    : (
      langTexts.alertSetupSavedNoDevices
      || fallbackTexts.alertSetupSavedNoDevices
      || langTexts.alertSetupSaved
      || fallbackTexts.alertSetupSaved
    );
  if (!isSilent && typeof saveAlertTemplate === 'string' && saveAlertTemplate) {
    const message = saveAlertTemplate.replace("{name}", finalName);
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: langTexts.alertSetupSavedTitle || fallbackTexts.alertSetupSavedTitle || 'Project Saved',
        message: message
      });
    } else {
      alert(message);
    }
  }
}

addSafeEventListener('saveSetupBtn', "click", handleSaveSetupClick);

if (setupNameInput) {
  addSafeEventListener('setupName', "input", function () {
    if (saveSetupBtn) {
      saveSetupBtn.disabled = !setupNameInput.value.trim();
    }
    if (typeof checkSetupChanged === 'function') {
      try {
        checkSetupChanged();
      } catch (error) {
        console.warn('Failed to evaluate setup change status after name update', error);
      }
    }
  });

  addSafeEventListener('setupName', "keydown", function (event) {
    if (event.isComposing) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSaveSetupClick(event);
    }
  });
}

function handleDeleteSetupClick() {
  const setupSelectElement = getSetupSelectElement();
  const setupName = setupSelectElement && typeof setupSelectElement.value === 'string'
    ? setupSelectElement.value
    : '';
  if (!setupName) {
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertNoSetupSelectedTitle || 'No Project Selected',
        message: texts[currentLang].alertNoSetupSelected
      });
    } else {
      alert(texts[currentLang].alertNoSetupSelected);
    }
    return;
  }

  const performDeletion = () => {
    const backupName = ensureAutoBackupBeforeDeletion('delete setup');
    if (!backupName) {
      return;
    }
    let setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    if (typeof deleteProject === 'function') {
      deleteProject(setupName);
    }
    populateSetupSelect();
    setupNameInput.value = ""; // Clear setup name input

    let selectionResetHandled = false;
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
      // Reset dropdowns to "None" or first option after deleting current setup
      [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(sel => {
        const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
        if (noneOption) {
          sel.value = "None";
        } else {
          sel.selectedIndex = 0;
        }
      });
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions('None');
      }
      const sbSel = getSliderBowlSelect();
      if (sbSel) sbSel.value = '';
      motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
      controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
      updateCalculations(); // Recalculate after deleting setup
    }
    const message = texts[currentLang].alertSetupDeleted.replace("{name}", setupName);
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: (texts[currentLang] && texts[currentLang].deleteSetupTitle) || 'Project Deleted',
        message: message
      });
    } else {
      alert(message);
    }
  };

  if (typeof window.cineShowConfirmDialog === 'function') {
    window.cineShowConfirmDialog({
      title: (texts[currentLang] && texts[currentLang].deleteSetupTitle) || 'Delete Project',
      message: texts[currentLang].confirmDeleteSetup.replace("{name}", setupName),
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        setTimeout(() => {
          window.cineShowConfirmDialog({
            title: (texts[currentLang] && texts[currentLang].areYouSure) || 'Are you sure?',
            message: texts[currentLang].confirmDeleteSetupAgain,
            confirmLabel: 'Confirm Delete',
            danger: true,
            onConfirm: () => performDeletion()
          });
        }, 150);
      }
    });
  } else {
    if (
      confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) &&
      confirm(texts[currentLang].confirmDeleteSetupAgain)
    ) {
      performDeletion();
    }
  }
}

addSafeEventListener('deleteSetupBtn', "click", handleDeleteSetupClick);

function resetSetupStateToDefaults(options = {}) {
  const suspendable =
    typeof suspendProjectPersistence === 'function'
    && typeof resumeProjectPersistence === 'function';
  if (suspendable) {
    try {
      suspendProjectPersistence();
    } catch (error) {
      console.warn('Failed to suspend project persistence during setup reset', error);
    }
  }

  const config = typeof options === 'object' && options !== null ? options : {};
  const preserveSetupNameInput = Boolean(config.preserveSetupNameInput);

  try {
    if (!preserveSetupNameInput && setupNameInput) {
      setupNameInput.value = "";
    }

    const resetSelectToDefault = (select) => {
      if (!select || typeof select !== 'object') return;
      const isCameraSelect = select === cameraSelect;
      const noneOption = Array.from(select.options || []).find(opt => opt.value === "None");
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

    [
      cameraSelect,
      monitorSelect,
      videoSelect,
      cageSelect,
      distanceSelect,
      batterySelect,
      hotswapSelect,
    ].forEach(resetSelectToDefault);

    if (typeof updateCageSelectOptions === 'function') {
      try {
        updateCageSelectOptions('None');
      } catch (error) {
        console.warn('Failed to reset cage options while preparing setup switch', error);
      }
    }

    const sliderBowlSelect = typeof getSliderBowlSelect === 'function'
      ? getSliderBowlSelect()
      : null;
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
        setManualDiagramPositions({}, { render: false });
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

const setupSelectTarget = getSetupSelectElement();

addSafeEventListener('setupSelect', "change", (event) => {
  const setupName = event.target.value;
  const rawTypedName =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value
      : '';
  const typedName = rawTypedName.trim();
  const previousKey =
    (lastSetupName && typeof lastSetupName === 'string' ? lastSetupName : '')
    || typedName
    || '';
  if (typeof setActiveProjectCompressionHold === 'function') {
    setActiveProjectCompressionHold(previousKey);
  }
  const normalizeProjectName = (value) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  const normalizedLastSelection = normalizeProjectName(lastSetupName);
  const normalizedTargetSelection = normalizeProjectName(setupName);

  let autoSaveFlushed = false;
  if (typeof scheduleProjectAutoSave === 'function') {
    try {
      const normalizeForOverride = typeof normalizeSetupName === 'function'
        ? normalizeSetupName
        : (value => (typeof value === 'string' ? value.trim() : ''));
      const previousSelection = normalizeForOverride(
        typeof lastSetupName === 'string' ? lastSetupName : '',
      );
      const storageKeyOverride = normalizeForOverride(previousKey);
      const overrides = {
        setupNameState: {
          typedName,
          selectedName: previousSelection,
          storageKey: storageKeyOverride,
          renameInProgress: Boolean(
            previousSelection
            && typedName
            && typedName !== previousSelection,
          ),
          typedNameHasTrailingWhitespace: Boolean(
            typedName
            && typeof rawTypedName === 'string'
            && /\s$/.test(rawTypedName),
          ),
        },
      };
      scheduleProjectAutoSave({ immediate: true, overrides });
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
    const info = projectForm ? collectProjectFormData() : {};
    if (info) {
      info.sliderBowl = getEventsCoreValue('getSliderBowlValue');
      info.easyrig = getEventsCoreValue('getEasyrigValue');
    }
    const previousProjectInfo = deriveProjectInfo(info);
    currentProjectInfo = previousProjectInfo;
    const normalizeForOverride = typeof normalizeSetupName === 'function'
      ? normalizeSetupName
      : (value => (typeof value === 'string' ? value.trim() : ''));
    const normalizedPreviousKey = normalizeForOverride(previousKey);
    const normalizedTypedName = normalizeForOverride(typedName);
    const renameInProgressForPrevious = Boolean(
      normalizedPreviousKey
      && normalizedTypedName
      && normalizedTypedName !== normalizedPreviousKey,
    );
    const projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function'
      ? createProjectInfoSnapshotForStorage(previousProjectInfo, {
        projectNameOverride: renameInProgressForPrevious ? normalizedPreviousKey : undefined,
      })
      : previousProjectInfo;
    const previousPowerSelection = typeof getPowerSelectionSnapshot === 'function'
      ? getPowerSelectionSnapshot()
      : null;
    const previousPayload = {
      projectInfo: projectInfoForStorage,
      gearList: getCurrentGearListHtml()
    };
    if (previousPowerSelection) {
      previousPayload.powerSelection = previousPowerSelection;
    }
    if (typeof getDiagramManualPositions === 'function') {
      const diagramPositions = getDiagramManualPositions();
      if (diagramPositions && Object.keys(diagramPositions).length) {
        previousPayload.diagramPositions = diagramPositions;
      }
    }
    const previousRules = getProjectScopedAutoGearRules();
    if (previousRules && previousRules.length) {
      previousPayload.autoGearRules = previousRules;
    }
    saveProject(previousKey, previousPayload, { skipOverwriteBackup: true });
  }

  if (
    typeof autoBackup === 'function'
    && normalizedTargetSelection !== normalizedLastSelection
  ) {
    try {
      autoBackup({
        suppressSuccess: true,
        projectNameOverride: normalizeProjectName(previousKey),
        triggerAutoSaveNotification: true,
        reason: 'project-switch',
      });
    } catch (error) {
      console.warn('Failed to auto backup project before loading a different setup', error);
    }
  }

  resetSetupStateToDefaults();

  if (setupName === "") { // "-- New Setup --" selected
    finalizeSetupSelection(setupName);
    return;
  }

  {
    const setups = getSetups();
    const setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera || 'None';
      callEventsCoreFunction('updateRecordingMediaOptions');
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      applyBatteryPlateSelectionFromBattery(setup.battery || '', batteryPlateSelect.value);
      monitorSelect.value = setup.monitor || 'None';
      videoSelect.value = setup.video || 'None';
      if (typeof updateCageSelectOptions === 'function') {
        updateCageSelectOptions(setup.cage || 'None');
      } else if (cageSelect) {
        cageSelect.value = setup.cage || 'None';
      }
      (setup.motors || []).forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      (setup.controllers || []).forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance || 'None';
      batterySelect.value = setup.battery || 'None';
      applyBatteryPlateSelectionFromBattery(setup.battery || '', batteryPlateSelect ? batteryPlateSelect.value : '');
      hotswapSelect.value = setup.batteryHotswap || 'None';
      setSliderBowlValue(setup.sliderBowl || '');
      setEasyrigValue(setup.easyrig || '');
      let storedPowerApplied = false;
      if (setup.powerSelection && typeof applyStoredPowerSelection === 'function') {
        storedPowerApplied = applyStoredPowerSelection(setup.powerSelection, { preferExisting: false });
      }
      const storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, { preferExisting: false });
      }
      updateBatteryOptions();
      if (!storedPowerApplied && storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        storedPowerApplied = applyStoredPowerSelection(storedProject.powerSelection, { preferExisting: false });
        if (storedPowerApplied) {
          updateBatteryOptions();
        }
      }
      const storedHtml = typeof setup.gearList === 'string' && setup.gearList
        ? setup.gearList
        : (typeof storedProject?.gearList === 'string' ? storedProject.gearList : '');
      currentProjectInfo = setup.projectInfo || storedProject?.projectInfo || null;
      const regenerateGearList = (info) => callEventsCoreFunction(
        'generateGearListHtml',
        [info || {}],
        { defaultValue: '' },
      ) || '';
      let html = storedHtml;
      if (!html) {
        html = regenerateGearList(currentProjectInfo || {});
      }
      if (html && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = html;
      }
      if (typeof setManualDiagramPositions === 'function') {
        let diagramPositions = {};
        if (typeof normalizeDiagramPositionsInput === 'function') {
          diagramPositions = normalizeDiagramPositionsInput(storedProject?.diagramPositions);
          const setupDiagramPositions = normalizeDiagramPositionsInput(setup.diagramPositions);
          if (Object.keys(setupDiagramPositions).length) {
            diagramPositions = { ...diagramPositions, ...setupDiagramPositions };
          }
        }
        setManualDiagramPositions(diagramPositions, { render: false });
      }
      const projectRulesSource = Array.isArray(setup.autoGearRules) && setup.autoGearRules.length
        ? setup.autoGearRules
        : (Array.isArray(storedProject?.autoGearRules) && storedProject.autoGearRules.length
          ? storedProject.autoGearRules
          : null);
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
          const payload = {
            projectInfo: currentProjectInfo,
            gearListAndProjectRequirementsGenerated: Boolean(html)
          };
          const currentPowerSelection = typeof getPowerSelectionSnapshot === 'function'
            ? getPowerSelectionSnapshot()
            : null;
          if (currentPowerSelection) {
            payload.powerSelection = currentPowerSelection;
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
          if (setup.gearSelectors && Object.keys(setup.gearSelectors).length) {
            payload.gearSelectors = setup.gearSelectors;
          } else if (storedProject?.gearSelectors && Object.keys(storedProject.gearSelectors).length) {
            payload.gearSelectors = storedProject.gearSelectors;
          }
          saveProject(setupName, payload, { skipOverwriteBackup: true });
        }
      }
    } else {
      const storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      if (storedProject && typeof applyStoredPowerSelection === 'function' && storedProject.powerSelection) {
        const applied = applyStoredPowerSelection(storedProject.powerSelection, { preferExisting: false });
        if (applied) {
          updateBatteryOptions();
        }
      } else {
        updateBatteryOptions();
      }
      currentProjectInfo = storedProject?.projectInfo || null;
      if (projectForm) populateProjectForm(currentProjectInfo || {});
      if (gearListOutput) {
        const regenerateGearList = (info) => callEventsCoreFunction(
          'generateGearListHtml',
          [info || {}],
          { defaultValue: '' },
        ) || '';
        const storedHtml = typeof storedProject?.gearList === 'string' ? storedProject.gearList : '';
        const html = storedHtml || regenerateGearList(currentProjectInfo || {});
        displayGearAndRequirements(html);
        if (html) {
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
        const normalizedDiagram = storedProject?.diagramPositions && typeof normalizeDiagramPositionsInput === 'function'
          ? normalizeDiagramPositionsInput(storedProject.diagramPositions)
          : {};
        setManualDiagramPositions(normalizedDiagram || {}, { render: false });
      }
    }
    storeLoadedSetupStateSafe(getCurrentSetupState());
  }

  finalizeSetupSelection(setupName);
});


function populateSetupSelect() {
  const setupsProvider =
    typeof getSetups === 'function'
      ? getSetups
      : null;
  const setupSelectTarget = getSetupSelectElement();
  if (!setupSelectTarget) {
    console.warn('populateSetupSelect: setup select element unavailable, aborting populate');
    return;
  }
  const textBundle =
    typeof texts === 'object' && texts
      ? (texts[currentLang] || texts.en || {})
      : {};
  const newSetupOptionLabel =
    typeof textBundle.newSetupOption === 'string' && textBundle.newSetupOption.trim()
      ? textBundle.newSetupOption
      : 'New setup';
  if (!setupsProvider) {
    console.warn('populateSetupSelect: getSetups is unavailable, using empty setup list');
  }
  const setups = setupsProvider ? setupsProvider() || {} : {};
  setupSelectTarget.innerHTML = `<option value="">${newSetupOptionLabel}</option>`;
  let includeAutoBackups = false;
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
  const names = Object.keys(setups)
    .filter(name => includeAutoBackups || !name.startsWith('auto-backup-'))
    .sort((a, b) => {
      const autoA = a.startsWith('auto-backup-');
      const autoB = b.startsWith('auto-backup-');
      if (autoA !== autoB) return autoA ? 1 : -1; // Auto backups last
      return localeSort(a, b);
    });
  for (const name of names) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    setupSelectTarget.appendChild(opt);
  }
}
if (typeof EVENTS_UI_HELPERS.whenElementAvailable === 'function') {
  EVENTS_UI_HELPERS.whenElementAvailable('setupSelect', () => {
    populateSetupSelect();
    checkSetupChanged();
  });
} else {
  populateSetupSelect(); // Initial populate of setups
  checkSetupChanged();
}

function notifyAutoSaveFromBackup(message, backupName, severity) {
  if (typeof message !== 'string') {
    return;
  }
  const trimmed = message.trim();
  if (!trimmed) {
    return;
  }
  const notificationSeverity =
    typeof severity === 'string' && severity.trim() ? severity.trim() : 'success';
  if (typeof showNotification === 'function') {
    try {
      showNotification(notificationSeverity, trimmed);
    } catch (notifyError) {
      console.warn('Failed to display auto save notification after auto backup', notifyError);
    }
  }
  if (
    typeof document !== 'undefined'
    && typeof CustomEvent === 'function'
    && document
    && typeof document.dispatchEvent === 'function'
  ) {
    try {
      document.dispatchEvent(new CustomEvent('cine:auto-save-notification', {
        detail: {
          message: trimmed,
          source: 'auto-backup',
          backupName: backupName || null,
          severity: notificationSeverity,
          timestamp: new Date().toISOString(),
        },
      }));
    } catch (eventError) {
      console.warn('Failed to dispatch auto save notification event after auto backup', eventError);
    }
  }
}

const AUTO_BACKUP_MAX_DELTA_SEQUENCE = 30;
let lastAutoBackupSignature = null;
let lastAutoBackupName = null;
let lastAutoBackupCreatedAtIso = null;

function createStableValueSignature(value) {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    let signature = '[';
    for (let index = 0; index < value.length; index += 1) {
      if (index > 0) {
        signature += ',';
      }
      signature += createStableValueSignature(value[index]);
    }
    signature += ']';
    return signature;
  }
  if (value instanceof Date) {
    const timestamp = value.getTime();
    if (Number.isNaN(timestamp)) {
      return 'date:invalid';
    }
    return `date:${timestamp}`;
  }
  const valueType = typeof value;
  if (valueType === 'number') {
    if (Number.isNaN(value)) {
      return 'number:NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'number:Infinity' : 'number:-Infinity';
    }
    return `number:${value}`;
  }
  if (valueType === 'bigint') {
    return `bigint:${value.toString()}`;
  }
  if (valueType === 'boolean') {
    return value ? 'boolean:true' : 'boolean:false';
  }
  if (valueType === 'string') {
    return `string:${value}`;
  }
  if (valueType === 'symbol') {
    return `symbol:${String(value)}`;
  }
  if (valueType === 'function') {
    return `function:${value.name || 'anonymous'}`;
  }
  if (valueType === 'object') {
    const keys = Object.keys(value).sort();
    let signature = '{';
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (index > 0) {
        signature += ',';
      }
      signature += `${JSON.stringify(key)}:${createStableValueSignature(value[key])}`;
    }
    signature += '}';
    return signature;
  }
  return `${valueType}:${String(value)}`;
}

function computeAutoBackupStateSignature(setupState, gearSelectors, gearListGenerated) {
  return createStableValueSignature({
    setup: setupState || null,
    gearSelectors: gearSelectors || null,
    gearListGenerated: Boolean(gearListGenerated),
  });
}

function hasMeaningfulAutoBackupContent(setupState, gearSelectors, gearListGenerated) {
  const hasDeviceSelection = hasAnyDeviceSelectionSafe(setupState);

  const hasProjectInfo = Boolean(
    setupState
    && typeof setupState === 'object'
    && setupState.projectInfo,
  );

  const hasAutoGearRules = Array.isArray(
    setupState
    && setupState.autoGearRules,
  ) && setupState.autoGearRules.length > 0;

  const hasDiagramPositions = Boolean(
    setupState
    && setupState.diagramPositions
    && typeof setupState.diagramPositions === 'object'
    && Object.keys(setupState.diagramPositions).length > 0,
  );

  const hasGearSelectors = Boolean(
    gearSelectors
    && typeof gearSelectors === 'object'
    && Object.keys(gearSelectors).length > 0,
  );

  const hasPowerSelection = Boolean(
    setupState
    && setupState.powerSelection
    && typeof setupState.powerSelection === 'object'
    && Object.keys(setupState.powerSelection).length > 0,
  );

  const hasGeneratedGear = Boolean(gearListGenerated);

  return (
    hasDeviceSelection
    || hasProjectInfo
    || hasAutoGearRules
    || hasDiagramPositions
    || hasGearSelectors
    || hasPowerSelection
    || hasGeneratedGear
  );
}

function getSortedAutoBackupNames(setups) {
  if (!setups || typeof setups !== 'object') {
    return [];
  }
  return Object.keys(setups)
    .filter((name) => typeof name === 'string' && name.startsWith('auto-backup-'))
    .sort();
}

function resolveLatestAutoBackupEntry(setups) {
  const names = getSortedAutoBackupNames(setups);
  if (!names.length) {
    return { name: null, entry: null };
  }
  const latestName = names[names.length - 1];
  const latestEntry = setups && typeof setups === 'object' ? setups[latestName] : null;
  return { name: latestName, entry: latestEntry };
}

function computeStoredAutoBackupSignature(name, entry) {
  if (!entry || typeof entry !== 'object') {
    return createStableValueSignature(null);
  }

  let gearSelectors = null;
  if (entry.gearSelectors && typeof entry.gearSelectors === 'object') {
    gearSelectors = entry.gearSelectors;
  }

  let gearListGenerated = false;
  if (typeof loadProject === 'function' && name) {
    try {
      const storedProject = loadProject(name);
      if (storedProject && typeof storedProject === 'object') {
        if (!gearSelectors && storedProject.gearSelectors && typeof storedProject.gearSelectors === 'object') {
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
  if (lastAutoBackupSignature || !setups || typeof setups !== 'object') {
    return;
  }
  const { name, entry } = resolveLatestAutoBackupEntry(setups);
  if (!name || !entry || typeof entry !== 'object') {
    return;
  }
  try {
    lastAutoBackupSignature = computeStoredAutoBackupSignature(name, entry);
    lastAutoBackupName = name;
    const metadata = readAutoBackupMetadata(entry);
    if (metadata && typeof metadata.createdAt === 'string') {
      lastAutoBackupCreatedAtIso = metadata.createdAt;
      const parsed = Date.parse(metadata.createdAt);
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
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const metadata = entry.__cineAutoBackupMetadata;
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }

  return metadata;
}

function attachAutoBackupMetadata(target, metadata) {
  if (!target || typeof target !== 'object') {
    return;
  }

  const snapshotMetadata = metadata && typeof metadata === 'object'
    ? {
      version: typeof metadata.version === 'number' ? metadata.version : 1,
      snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
      base: typeof metadata.base === 'string' ? metadata.base : null,
      sequence: typeof metadata.sequence === 'number' ? metadata.sequence : 0,
      createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
      changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
      removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : [],
    }
    : null;

  try {
    Object.defineProperty(target, '__cineAutoBackupMetadata', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: snapshotMetadata,
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
  if (!setups || typeof setups !== 'object') {
    return { snapshotType: 'full', base: null, sequence: 0 };
  }

  const autoBackupNames = getSortedAutoBackupNames(setups);

  if (!autoBackupNames.length) {
    return { snapshotType: 'full', base: null, sequence: 0 };
  }

  const latestName = autoBackupNames[autoBackupNames.length - 1];
  const latestEntry = setups[latestName];
  const latestMetadata = readAutoBackupMetadata(latestEntry);

  if (!latestEntry || !latestMetadata) {
    return { snapshotType: 'full', base: null, sequence: 0 };
  }

  const latestSequence = typeof latestMetadata.sequence === 'number'
    ? latestMetadata.sequence
    : 0;

  if (latestSequence >= AUTO_BACKUP_MAX_DELTA_SEQUENCE) {
    return { snapshotType: 'full', base: null, sequence: 0 };
  }

  return {
    snapshotType: 'delta',
    base: latestName,
    sequence: latestSequence + 1,
  };
}

// Automatic backups run every 10 minutes or after 50 tracked changes to the
// planner. Other operations reuse the most recent snapshot unless this cadence
// has elapsed so editors are not flooded with redundant copies. Saved backups
// appear in the setup selector but do not change the currently selected setup.
// Intervals are unref'ed when possible so Node environments can exit cleanly.
function autoBackup(options = {}) {
  const setupSelectElement = getSetupSelectElement();
  if (!setupSelectElement) return null;
  const config = typeof options === 'object' && options !== null ? options : {};
  const suppressSuccess = Boolean(config.suppressSuccess);
  const suppressError = Boolean(config.suppressError);
  const force = config.force === true;
  const reason = typeof config.reason === 'string' && config.reason
    ? config.reason
    : 'unspecified';
  const successMessage = typeof config.successMessage === 'string' && config.successMessage
    ? config.successMessage
    : 'Auto backup saved';
  const errorMessage = typeof config.errorMessage === 'string' && config.errorMessage
    ? config.errorMessage
    : 'Auto backup failed';
  const triggerAutoSaveNotification = Boolean(config.triggerAutoSaveNotification);
  const autoSaveNotificationMessage = typeof config.autoSaveNotificationMessage === 'string'
    && config.autoSaveNotificationMessage.trim()
    ? config.autoSaveNotificationMessage.trim()
    : successMessage;
  const normalizeProjectName = (value) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  const hasProjectNameOverride = Object.prototype.hasOwnProperty.call(
    config,
    'projectNameOverride',
  );
  const overrideName = hasProjectNameOverride
    ? normalizeProjectName(config.projectNameOverride)
    : null;
  const selectedName = typeof setupSelectElement.value === 'string'
    ? setupSelectElement.value
    : '';
  const typedName = setupNameInput && typeof setupNameInput.value === 'string'
    ? setupNameInput.value
    : '';
  const normalizedSelectedName = normalizeProjectName(selectedName);
  const normalizedTypedName = normalizeProjectName(typedName);
  const isAutoBackupName = (name) => typeof name === 'string' && name.startsWith('auto-backup-');

  const nowMs = Date.now();
  const lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
  const elapsedSinceLastAutoBackupMs = nowMs - lastCompletedMs;
  const enoughTimeElapsedSinceLastBackup = elapsedSinceLastAutoBackupMs >= AUTO_BACKUP_INTERVAL_MS;
  const enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;

  const enforceCadence = !force && !AUTO_BACKUP_CADENCE_EXEMPT_REASONS.has(reason);
  if (enforceCadence && !enoughTimeElapsedSinceLastBackup && !enoughChangesAccumulated) {
    const remainingIntervalMs = Math.max(0, AUTO_BACKUP_INTERVAL_MS - elapsedSinceLastAutoBackupMs);
    const skipped = {
      status: 'skipped',
      reason: 'cadence',
      context: reason,
      elapsedSinceLastAutoBackupMs,
      changesSinceSnapshot: autoBackupChangesSinceSnapshot,
      requiredIntervalMs: AUTO_BACKUP_INTERVAL_MS,
      requiredChangeThreshold: AUTO_BACKUP_CHANGE_THRESHOLD,
      remainingIntervalMs,
      remainingChanges: Math.max(0, AUTO_BACKUP_CHANGE_THRESHOLD - autoBackupChangesSinceSnapshot),
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup because cadence requirements are not met.', skipped);
    }
    recordAutoBackupRun(skipped);
    return skipped;
  }

  if (!force && !isAutoBackupReasonAllowed(reason)) {
    const skipped = {
      status: 'skipped',
      reason: 'disallowed',
      context: reason || null,
    };
    if (typeof console !== 'undefined' && typeof console.debug === 'function') {
      console.debug('Skipping auto backup run because the trigger is not permitted.', {
        trigger: reason,
      });
    }
    recordAutoBackupRun(skipped);
    return skipped;
  }

  if (!force && AUTO_BACKUP_RATE_LIMITED_REASONS.has(reason)) {
    const nowMs = Date.now();
    const lastCompletedMs = lastAutoBackupCompletedAtMs || 0;
    const elapsedMs = nowMs - lastCompletedMs;
    const enoughTimeElapsed = elapsedMs >= AUTO_BACKUP_INTERVAL_MS;
    const enoughChangesAccumulated = autoBackupChangesSinceSnapshot >= AUTO_BACKUP_CHANGE_THRESHOLD;
    if (!enoughTimeElapsed && !enoughChangesAccumulated) {
      const skipped = {
        status: 'skipped',
        reason: 'rate-limited',
        context: reason,
      };
      recordAutoBackupRun(skipped);
      return skipped;
    }
  }

  let nameForBackup = '';
  if (overrideName !== null && overrideName !== undefined) {
    if (overrideName && isAutoBackupName(overrideName)) {
      const skipped = { status: 'skipped', reason: 'auto-backup-selected', context: reason };
      recordAutoBackupRun(skipped);
      return skipped;
    }
    nameForBackup = overrideName;
  } else if (normalizedSelectedName && isAutoBackupName(normalizedSelectedName)) {
    if (
      normalizedTypedName &&
      !isAutoBackupName(normalizedTypedName) &&
      normalizedTypedName !== normalizedSelectedName
    ) {
      nameForBackup = normalizedTypedName;
    } else {
      const skipped = { status: 'skipped', reason: 'auto-backup-selected', context: reason };
      recordAutoBackupRun(skipped);
      return skipped;
    }
  } else if (normalizedSelectedName) {
    nameForBackup = normalizedSelectedName;
  } else if (normalizedTypedName) {
    nameForBackup = normalizedTypedName;
  }

  let hideIndicator = null;
  try {
    hideIndicator = showAutoBackupIndicatorSafe();
  } catch (indicatorError) {
    console.warn('Failed to prepare auto backup indicator', indicatorError);
    hideIndicator = null;
  }

  try {
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const baseName = `auto-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    const normalizedName = nameForBackup || '';
    const currentSetup = { ...getCurrentSetupState() };
    const setupsSnapshot = getSetups();
    let backupName = normalizedName ? `${baseName}-${normalizedName}` : baseName;
    if (setupsSnapshot && typeof setupsSnapshot === 'object') {
      let suffixIndex = 1;
      while (Object.prototype.hasOwnProperty.call(setupsSnapshot, backupName)) {
        const suffixLabel = `copy-${suffixIndex}`;
        const baseWithSuffix = `${baseName}-${suffixLabel}`;
        backupName = normalizedName ? `${baseWithSuffix}-${normalizedName}` : baseWithSuffix;
        suffixIndex += 1;
      }
    }
    ensureLastAutoBackupSignatureInitialized(setupsSnapshot);
    const plan = determineNextAutoBackupPlan(setupsSnapshot);
    let resolvedPlan = plan;
    if (plan.snapshotType === 'delta') {
      const baseEntry = plan.base && setupsSnapshot ? setupsSnapshot[plan.base] : null;
      if (!baseEntry || typeof baseEntry !== 'object') {
        resolvedPlan = { snapshotType: 'full', base: null, sequence: 0 };
      }
    }
    const currentGearListHtml = getCurrentGearListHtml();
    const gearListGenerated = Boolean(currentGearListHtml);
    let payloadSummaryForLog = null;
    currentSetup.gearListAndProjectRequirementsGenerated = gearListGenerated;
    const gearSelectorsRaw = callEventsCoreFunction('getGearListSelectors', [], { defaultValue: {} }) || {};
    const gearSelectors = callEventsCoreFunction('cloneGearListSelectors', [gearSelectorsRaw], { defaultValue: {} }) || {};
    if (!hasMeaningfulAutoBackupContent(currentSetup, gearSelectors, gearListGenerated)) {
      const skipped = {
        status: 'skipped',
        reason: 'empty',
        context: reason,
      };
      recordAutoBackupRun(skipped);
      return skipped;
    }
    if (gearSelectors && Object.keys(gearSelectors).length) {
      currentSetup.gearSelectors = gearSelectors;
    }
    const currentSignature = computeAutoBackupStateSignature(currentSetup, gearSelectors, gearListGenerated);
    const { name: latestStoredName, entry: latestStoredEntry } = resolveLatestAutoBackupEntry(setupsSnapshot);
    if (
      !force
      && latestStoredName
      && latestStoredEntry
    ) {
      try {
        const latestStoredSignature = computeStoredAutoBackupSignature(
          latestStoredName,
          latestStoredEntry,
        );
        if (latestStoredSignature === currentSignature) {
          const latestMetadata = readAutoBackupMetadata(latestStoredEntry);
          const latestCreatedAt = latestMetadata && typeof latestMetadata.createdAt === 'string'
            ? latestMetadata.createdAt
            : null;
          lastAutoBackupSignature = currentSignature;
          lastAutoBackupName = latestStoredName;
          lastAutoBackupCreatedAtIso = latestCreatedAt;
          recordAutoBackupRun({
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason,
          });
          lastAutoBackupReasonState.set(reason, {
            timestamp: now.valueOf(),
            signature: currentSignature,
          });
          return {
            status: 'skipped',
            reason: 'unchanged',
            name: latestStoredName,
            createdAt: latestCreatedAt,
            context: reason,
          };
        }
      } catch (signatureCompareError) {
        console.warn(
          'Failed to compare current auto backup against latest snapshot before saving',
          signatureCompareError,
        );
      }
    }
    if (!force) {
      const lastReasonState = lastAutoBackupReasonState.get(reason);
      if (lastReasonState) {
        const elapsedSinceReason = now.valueOf() - lastReasonState.timestamp;
        if (
          elapsedSinceReason < AUTO_BACKUP_REASON_DEDUP_INTERVAL_MS
          && lastReasonState.signature === currentSignature
        ) {
          const skipped = {
            status: 'skipped',
            reason: 'duplicate-reason',
            name: lastAutoBackupName || null,
            createdAt: lastAutoBackupCreatedAtIso || null,
            context: reason,
          };
          recordAutoBackupRun(skipped);
          return skipped;
        }
      }
    }
    if (!force && lastAutoBackupSignature && currentSignature === lastAutoBackupSignature) {
      const skipped = {
        status: 'skipped',
        reason: 'unchanged',
        name: lastAutoBackupName || null,
        createdAt: lastAutoBackupCreatedAtIso || null,
        context: reason,
      };
      recordAutoBackupRun(skipped);
      return skipped;
    }
    const timestamp = now.toISOString();
    const backupMetadata = {
      version: 1,
      snapshotType: resolvedPlan.snapshotType,
      base: resolvedPlan.base,
      sequence: resolvedPlan.sequence,
      createdAt: timestamp,
      changedKeys: [],
      removedKeys: [],
    };
    attachAutoBackupMetadata(currentSetup, backupMetadata);
    const setups = setupsSnapshot;
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      const gearListText = typeof currentGearListHtml === 'string'
        ? currentGearListHtml
        : '';

      let projectInfoSnapshot = currentSetup.projectInfo || null;
      if (projectInfoSnapshot && typeof createProjectInfoSnapshotForStorage === 'function') {
        try {
          projectInfoSnapshot = createProjectInfoSnapshotForStorage(projectInfoSnapshot) || projectInfoSnapshot;
        } catch (projectInfoSnapshotError) {
          console.warn('Failed to normalize project info for auto backup payload', projectInfoSnapshotError);
        }
      }

      if (projectInfoSnapshot && typeof callEventsCoreFunction === 'function') {
        try {
          const clonedInfo = callEventsCoreFunction(
            'cloneProjectInfoForStorage',
            [projectInfoSnapshot],
            { defaultValue: projectInfoSnapshot },
          );
          if (clonedInfo) {
            projectInfoSnapshot = clonedInfo;
          }
        } catch (projectInfoCloneError) {
          console.warn('Failed to clone project info for auto backup payload', projectInfoCloneError);
        }
      }

      const payload = {
        projectInfo: projectInfoSnapshot,
        gearListAndProjectRequirementsGenerated: Boolean(gearListText)
      };

      if (gearListText) {
        payload.gearList = gearListText;
      }

      const currentPowerSelection = typeof getPowerSelectionSnapshot === 'function'
        ? getPowerSelectionSnapshot()
        : null;
      if (currentPowerSelection && typeof currentPowerSelection === 'object' && Object.keys(currentPowerSelection).length) {
        payload.powerSelection = currentPowerSelection;
      }

      if (gearSelectors && Object.keys(gearSelectors).length) {
        payload.gearSelectors = gearSelectors;
      }

      if (typeof getDiagramManualPositions === 'function') {
        try {
          const diagramPositions = getDiagramManualPositions();
          if (diagramPositions && typeof diagramPositions === 'object' && Object.keys(diagramPositions).length) {
            payload.diagramPositions = diagramPositions;
          }
        } catch (diagramError) {
          console.warn('Failed to capture diagram positions for auto backup payload', diagramError);
        }
      }

      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        let clonedRules = activeRules;
        if (typeof callEventsCoreFunction === 'function') {
          try {
            clonedRules = callEventsCoreFunction(
              'cloneProjectInfoForStorage',
              [activeRules],
              { defaultValue: activeRules },
            ) || activeRules;
          } catch (ruleCloneError) {
            console.warn('Failed to clone auto gear rules for auto backup payload', ruleCloneError);
          }
        }
        payload.autoGearRules = clonedRules;
      }

      const hasPayloadContent = Boolean(
        (payload.projectInfo && typeof payload.projectInfo === 'object' && Object.keys(payload.projectInfo).length)
        || payload.gearList
        || payload.gearListAndProjectRequirementsGenerated
        || (payload.powerSelection && Object.keys(payload.powerSelection).length)
        || (payload.gearSelectors && Object.keys(payload.gearSelectors).length)
        || (payload.diagramPositions && Object.keys(payload.diagramPositions).length)
        || (payload.autoGearRules && payload.autoGearRules.length)
      );

      if (hasPayloadContent) {
        attachAutoBackupMetadata(payload, backupMetadata);
        saveProject(backupName, payload);
        payloadSummaryForLog = summarizeAutoBackupPayloadForLog(payload);
      } else {
        payloadSummaryForLog = summarizeAutoBackupPayloadForLog(payload);
      }
    }
    const prevValue = setupSelectElement.value;
    const prevName = setupNameInput ? setupNameInput.value : '';
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
    const successLogDetail = {
      status: 'success',
      reason,
      context: reason,
      snapshotType: resolvedPlan.snapshotType,
      hasPlanBase: Boolean(resolvedPlan.base),
      sequence: resolvedPlan.sequence,
      appendedProjectName: Boolean(nameForBackup),
      backupNameLength: typeof backupName === 'string' ? backupName.length : 0,
      changesSinceSnapshot: autoBackupChangesSinceSnapshot,
      elapsedSinceLastAutoBackupMs,
      force,
      gearListGenerated,
      payloadSummary: payloadSummaryForLog || null,
    };
    recordAutoBackupRun({
      status: 'success',
      name: backupName,
      createdAt: timestamp,
      context: reason,
    }, successLogDetail);
    lastAutoBackupReasonState.set(reason, {
      timestamp: now.valueOf(),
      signature: currentSignature,
    });
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    const errorDetail = {
      status: 'error',
      reason: 'exception',
      context: reason,
      errorName: e && typeof e.name === 'string' ? e.name : null,
      errorMessage: e && typeof e.message === 'string' ? e.message : null,
    };
    if (e && typeof e.stack === 'string' && e.stack) {
      const stackPreview = e.stack.split('\n').slice(0, 5).join('\n');
      errorDetail.errorStackPreview = stackPreview;
    }
    recordAutoBackupRun({ status: 'error', reason: 'exception', context: reason }, errorDetail);
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

function ensureAutoBackupBeforeDeletion(context, options = {}) {
  const config = typeof options === 'object' && options !== null ? options : {};
  const langTexts = texts[currentLang] || {};
  const fallbackTexts = texts.en || {};
  const successMessage = config.successMessage
    || langTexts.preDeleteBackupSuccess
    || fallbackTexts.preDeleteBackupSuccess
    || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  const failureMessage = config.failureMessage
    || langTexts.preDeleteBackupFailed
    || fallbackTexts.preDeleteBackupFailed
    || 'Automatic backup failed. The action was cancelled.';

  const setupSelectElement = getSetupSelectElement();
  const normalizeProjectName = (value) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  const selectedName = setupSelectElement && typeof setupSelectElement.value === 'string'
    ? normalizeProjectName(setupSelectElement.value)
    : '';
  const typedName = setupNameInput && typeof setupNameInput.value === 'string'
    ? normalizeProjectName(setupNameInput.value)
    : '';
  const rememberedName = normalizeProjectName(
    typeof lastSetupName === 'string' ? lastSetupName : '',
  );
  const isAutoBackupName = (name) => typeof name === 'string' && name.startsWith('auto-backup-');
  const candidateNames = [selectedName, typedName, rememberedName];
  const activeProjectName = candidateNames.find((name) => name && !isAutoBackupName(name)) || '';

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

  let backupOutcome = { status: 'unsupported' };
  if (typeof createProjectDeletionBackup === 'function') {
    try {
      backupOutcome = createProjectDeletionBackup(activeProjectName);
    } catch (error) {
      console.error(`Automatic backup before ${context || 'deletion'} failed`, error);
      backupOutcome = { status: 'failed' };
    }
  }

  if (backupOutcome.status === 'created' || backupOutcome.status === 'skipped') {
    if (backupOutcome.status === 'created') {
      noteAutoBackupRelevantChange({ reset: true });
    }
    if (config.notifySuccess !== false) {
      showNotification('success', successMessage);
    }
    return typeof backupOutcome.backupName === 'string'
      && backupOutcome.backupName
      ? backupOutcome.backupName
      : activeProjectName;
  }

  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(
      `Automatic backup before ${context || 'deletion'} failed.`,
      backupOutcome,
    );
  }
  if (config.notifyFailure !== false) {
    showNotification('error', failureMessage);
  }
  return null;
}
const QUEUED_BACKUP_GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart'];
let queuedBackupBanner = null;
let queuedBackupBannerMessageEl = null;
let queuedBackupBannerActionEl = null;
let queuedBackupGestureBound = false;
let queuedBackupFlushScheduled = false;
let queuedBackupFlushInProgress = false;
let autoBackupSchedulerTimer = null;
let autoGearBackupSchedulerTimer = null;
let hourlyBackupSchedulerTimer = null;

function getQueuedBackupBannerTexts() {
  const langTexts = (typeof texts === 'object' && texts && texts[currentLang]) || {};
  const fallbackTexts = (typeof texts === 'object' && texts && texts.en) || {};
  return {
    singular: langTexts.queuedBackupBannerMessageOne
      || fallbackTexts.queuedBackupBannerMessageOne
      || '1 backup saved in the local vault.',
    plural: langTexts.queuedBackupBannerMessageOther
      || fallbackTexts.queuedBackupBannerMessageOther
      || '{count} backups saved in the local vault.',
    gesture: langTexts.queuedBackupBannerGesture
      || fallbackTexts.queuedBackupBannerGesture
      || 'Interact with the planner to export them safely.',
    action: langTexts.queuedBackupBannerAction
      || fallbackTexts.queuedBackupBannerAction
      || 'Open local backup vault',
    fallbackHint: langTexts.queuedBackupFallbackHint
      || fallbackTexts.queuedBackupFallbackHint
      || 'Emergency fallback storage active. Export queued backups immediately.',
  };
}

function ensureQueuedBackupBannerElements() {
  if (typeof document === 'undefined') {
    return null;
  }
  if (queuedBackupBanner && queuedBackupBannerMessageEl && queuedBackupBannerActionEl) {
    return queuedBackupBanner;
  }

  const banner = document.createElement('section');
  banner.id = 'cineQueuedBackupBanner';
  banner.style.position = 'fixed';
  banner.style.right = '1.5rem';
  banner.style.left = '1.5rem';
  banner.style.bottom = '1.5rem';
  banner.style.maxWidth = '28rem';
  banner.style.marginLeft = 'auto';
  banner.style.padding = '1rem 1.25rem';
  banner.style.borderRadius = '1.25rem';
  banner.style.background = 'rgba(15, 22, 36, 0.92)';
  banner.style.color = '#f5f7fb';
  banner.style.boxShadow = '0 1.5rem 3.5rem rgba(5, 8, 17, 0.28)';
  banner.style.zIndex = '9999';
  banner.style.display = 'none';
  banner.style.flexDirection = 'column';
  banner.style.gap = '0.75rem';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'assertive');
  banner.setAttribute('aria-hidden', 'true');

  const messageEl = document.createElement('p');
  messageEl.style.margin = '0';
  messageEl.style.lineHeight = '1.5';
  messageEl.style.fontSize = '0.95rem';

  const actionEl = document.createElement('button');
  actionEl.type = 'button';
  actionEl.style.alignSelf = 'flex-start';
  actionEl.style.background = '#ffbf3c';
  actionEl.style.color = '#11131a';
  actionEl.style.border = 'none';
  actionEl.style.borderRadius = '999px';
  actionEl.style.padding = '0.55rem 1.5rem';
  actionEl.style.fontWeight = '600';
  actionEl.style.cursor = 'pointer';
  actionEl.addEventListener('click', (event) => {
    try {
      event.preventDefault();
    } catch (preventDefaultError) {
      void preventDefaultError;
    }
    if (typeof openQueuedBackupVaultWindowForEvents === 'function') {
      Promise.resolve()
        .then(() => openQueuedBackupVaultWindowForEvents())
        .catch((vaultError) => {
          console.warn('Failed to open queued backup vault window', vaultError);
        });
    }
  });

  banner.appendChild(messageEl);
  banner.appendChild(actionEl);
  try {
    (document.body || document.documentElement).appendChild(banner);
  } catch (appendError) {
    console.warn('Failed to attach queued backup banner to document', appendError);
  }

  queuedBackupBanner = banner;
  queuedBackupBannerMessageEl = messageEl;
  queuedBackupBannerActionEl = actionEl;
  return banner;
}

function showQueuedBackupBanner(count, fallbackActive) {
  const banner = ensureQueuedBackupBannerElements();
  if (!banner || !queuedBackupBannerMessageEl || !queuedBackupBannerActionEl) {
    return;
  }
  const textsForBanner = getQueuedBackupBannerTexts();
  const countValue = typeof count === 'number' && Number.isFinite(count) ? count : 1;
  const baseMessageTemplate = countValue === 1 ? textsForBanner.singular : textsForBanner.plural;
  const message = baseMessageTemplate.replace('{count}', String(countValue));
  const gesture = textsForBanner.gesture.replace('{count}', String(countValue));
  const parts = [`${message} ${gesture}`.trim()];
  if (fallbackActive) {
    parts.push(textsForBanner.fallbackHint);
  }
  queuedBackupBannerMessageEl.textContent = parts.join(' ').trim();
  queuedBackupBannerActionEl.textContent = textsForBanner.action;
  banner.style.display = 'flex';
  banner.setAttribute('aria-hidden', 'false');
  attachQueuedBackupGestureListeners();
}

function hideQueuedBackupBanner() {
  if (!queuedBackupBanner) {
    return;
  }
  queuedBackupBanner.style.display = 'none';
  queuedBackupBanner.setAttribute('aria-hidden', 'true');
}

function attachQueuedBackupGestureListeners() {
  if (queuedBackupGestureBound || typeof document === 'undefined') {
    return;
  }
  const handler = handleQueuedBackupGesture;
  for (let index = 0; index < QUEUED_BACKUP_GESTURE_EVENTS.length; index += 1) {
    const eventName = QUEUED_BACKUP_GESTURE_EVENTS[index];
    try {
      document.addEventListener(eventName, handler, { passive: true });
    } catch (listenerError) {
      document.addEventListener(eventName, handler);
    }
  }
  queuedBackupGestureBound = true;
}

function detachQueuedBackupGestureListeners() {
  if (!queuedBackupGestureBound || typeof document === 'undefined') {
    return;
  }
  const handler = handleQueuedBackupGesture;
  for (let index = 0; index < QUEUED_BACKUP_GESTURE_EVENTS.length; index += 1) {
    const eventName = QUEUED_BACKUP_GESTURE_EVENTS[index];
    try {
      document.removeEventListener(eventName, handler, { passive: true });
    } catch (listenerError) {
      document.removeEventListener(eventName, handler);
    }
  }
  queuedBackupGestureBound = false;
}

function handleQueuedBackupGesture() {
  requestQueuedBackupFlush('gesture');
}

function requestQueuedBackupFlush(trigger) {
  if (queuedBackupFlushScheduled) {
    return;
  }
  if (typeof getQueuedBackupPayloadsForEvents !== 'function'
    || typeof downloadBackupPayloadForEvents !== 'function') {
    return;
  }
  queuedBackupFlushScheduled = true;
  Promise.resolve().then(() => {
    queuedBackupFlushScheduled = false;
    flushQueuedBackupVault(trigger);
  });
}

function updateQueuedBackupBannerFromVault() {
  if (typeof getQueuedBackupPayloadsForEvents !== 'function') {
    hideQueuedBackupBanner();
    detachQueuedBackupGestureListeners();
    return Promise.resolve(0);
  }
  return Promise.resolve(getQueuedBackupPayloadsForEvents())
    .then((entries) => {
      const count = Array.isArray(entries) ? entries.length : 0;
      const fallbackActive = typeof isBackupVaultFallbackActiveForEvents === 'function'
        ? Boolean(isBackupVaultFallbackActiveForEvents())
        : false;
      if (count > 0) {
        showQueuedBackupBanner(count, fallbackActive);
      } else {
        hideQueuedBackupBanner();
        detachQueuedBackupGestureListeners();
      }
      return count;
    })
    .catch((error) => {
      console.warn('Failed to update queued backup banner from vault', error);
      hideQueuedBackupBanner();
      detachQueuedBackupGestureListeners();
      return 0;
    });
}

async function flushQueuedBackupVault(trigger) {
  if (queuedBackupFlushInProgress) {
    return;
  }
  if (typeof getQueuedBackupPayloadsForEvents !== 'function'
    || typeof downloadBackupPayloadForEvents !== 'function') {
    return;
  }
  queuedBackupFlushInProgress = true;
  try {
    const entries = await Promise.resolve(getQueuedBackupPayloadsForEvents())
      .then((value) => (Array.isArray(value) ? value : []))
      .catch((error) => {
        console.warn('Failed to read queued backups for deferred download', error);
        return [];
      });
    if (!entries.length) {
      hideQueuedBackupBanner();
      detachQueuedBackupGestureListeners();
      return;
    }
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      let result = null;
      try {
        result = downloadBackupPayloadForEvents(entry.payload, entry.fileName, {
          skipQueue: true,
          source: entry && entry.metadata && entry.metadata.source ? entry.metadata.source : 'automatic',
          reason: trigger || 'gesture-flush',
          queueMetadata: entry && entry.metadata ? entry.metadata : {},
        });
      } catch (downloadError) {
        console.warn('Deferred backup download attempt threw an error', downloadError);
        result = null;
      }
      if (result && result.success) {
        if (typeof removeQueuedBackupRecordForEvents === 'function') {
          try {
            await removeQueuedBackupRecordForEvents(entry.id);
          } catch (removeError) {
            console.warn('Failed to remove queued backup after export', removeError);
          }
        }
      } else {
        const message = result && result.queueMessage
          ? result.queueMessage
          : (resolveQueuedBackupMessageForEvents
            ? resolveQueuedBackupMessageForEvents(entry.fileName)
            : 'Automatic downloads are still blocked. Keep working offline and try again after interacting with the planner.');
        if (typeof showNotification === 'function') {
          try {
            showNotification('warning', message);
          } catch (notifyError) {
            void notifyError;
          }
        }
        break;
      }
    }
  } finally {
    queuedBackupFlushInProgress = false;
    updateQueuedBackupBannerFromVault();
  }
}

function handleQueuedBackupVaultQueuedEvent() {
  updateQueuedBackupBannerFromVault();
  attachQueuedBackupGestureListeners();
}

function handleQueuedBackupFallbackChangedEvent() {
  updateQueuedBackupBannerFromVault();
}

function scheduleAutoBackupTimer() {
  if (autoBackupSchedulerTimer) {
    try {
      clearTimeout(autoBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  autoBackupSchedulerTimer = setTimeout(() => {
    try {
      autoBackup({ reason: 'interval' });
    } catch (autoBackupError) {
      console.warn('Scheduled auto backup run failed', autoBackupError);
    }
    scheduleAutoBackupTimer();
  }, AUTO_BACKUP_INTERVAL_MS);
  if (autoBackupSchedulerTimer && typeof autoBackupSchedulerTimer.unref === 'function') {
    autoBackupSchedulerTimer.unref();
  }
}

function scheduleAutoGearBackupTimer() {
  if (autoGearBackupSchedulerTimer) {
    try {
      clearTimeout(autoGearBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  autoGearBackupSchedulerTimer = setTimeout(() => {
    try {
      if (autoGearRulesDirtySinceBackup) {
        createAutoGearBackup();
      }
    } catch (gearBackupError) {
      console.warn('Scheduled auto gear backup failed', gearBackupError);
    }
    scheduleAutoGearBackupTimer();
  }, AUTO_GEAR_BACKUP_INTERVAL_MS);
  if (autoGearBackupSchedulerTimer && typeof autoGearBackupSchedulerTimer.unref === 'function') {
    autoGearBackupSchedulerTimer.unref();
  }
}

function queueScheduledFullBackup() {
  if (typeof queueBackupPayloadForVaultForEvents !== 'function'
    || typeof buildSettingsBackupPackageForEvents !== 'function') {
    return;
  }
  try {
    const packageInfo = buildSettingsBackupPackageForEvents(new Date());
    if (!packageInfo || typeof packageInfo.payload !== 'string') {
      return;
    }
    queueBackupPayloadForVaultForEvents(packageInfo.fileName, packageInfo.payload, {
      source: 'hourly-scheduler',
      reason: 'hourly-auto',
      createdAt: packageInfo.iso,
    });
    if (resolveQueuedBackupMessageForEvents) {
      try {
        const queuedMessage = resolveQueuedBackupMessageForEvents(packageInfo.fileName);
        if (queuedMessage && typeof showNotification === 'function') {
          showNotification('info', queuedMessage);
        }
      } catch (messageError) {
        void messageError;
      }
    }
    updateQueuedBackupBannerFromVault();
  } catch (queueError) {
    console.warn('Failed to queue scheduled full backup payload', queueError);
  }
}

function scheduleHourlyBackupTimer() {
  if (hourlyBackupSchedulerTimer) {
    try {
      clearTimeout(hourlyBackupSchedulerTimer);
    } catch (clearError) {
      void clearError;
    }
  }
  hourlyBackupSchedulerTimer = setTimeout(() => {
    queueScheduledFullBackup();
    scheduleHourlyBackupTimer();
  }, 60 * 60 * 1000);
  if (hourlyBackupSchedulerTimer && typeof hourlyBackupSchedulerTimer.unref === 'function') {
    hourlyBackupSchedulerTimer.unref();
  }
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('cineBackupVault:queued', handleQueuedBackupVaultQueuedEvent);
  window.addEventListener('cineBackupVault:fallbackChanged', handleQueuedBackupFallbackChangedEvent);
}
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('cineBackupVault:queued', handleQueuedBackupVaultQueuedEvent);
  document.addEventListener('cineBackupVault:fallbackChanged', handleQueuedBackupFallbackChangedEvent);
}

if (typeof setTimeout === 'function') {
  scheduleAutoBackupTimer();
  scheduleAutoGearBackupTimer();
  scheduleHourlyBackupTimer();
}
updateQueuedBackupBannerFromVault();

function showDeviceManagerSection() {
  const section = deviceManagerSection || document.getElementById('device-manager');
  const btn = toggleDeviceBtn || document.getElementById('toggleDeviceManager');
  if (!section || !btn) return;
  if (!section.classList.contains('hidden')) return;
  section.classList.remove('hidden');
  document.body.classList.add('device-manager-active');
  const { langTexts, fallbackTexts } = getEventsLanguageTexts();
  const hideLabel = langTexts.hideDeviceManager || fallbackTexts.hideDeviceManager || 'Close Device Data';
  const hideHelp = langTexts.hideDeviceManagerHelp || fallbackTexts.hideDeviceManagerHelp || 'Close defaults library editor';
  setButtonLabelWithIconForEvents(btn, hideLabel, ICON_GLYPHS.minus);
  btn.setAttribute('title', hideLabel);
  btn.setAttribute('data-help', hideHelp);
  btn.setAttribute('aria-expanded', 'true');
  refreshDeviceListsSafe();
  updateCalculations();
}

function hideDeviceManagerSection() {
  const section = deviceManagerSection || document.getElementById('device-manager');
  const btn = toggleDeviceBtn || document.getElementById('toggleDeviceManager');
  if (!section || !btn) return;
  if (section.classList.contains('hidden')) return;
  section.classList.add('hidden');
  document.body.classList.remove('device-manager-active');
  const { langTexts, fallbackTexts } = getEventsLanguageTexts();
  const toggleLabel = langTexts.toggleDeviceManager || fallbackTexts.toggleDeviceManager || 'Edit Device Data…';
  const toggleHelp = langTexts.toggleDeviceManagerHelp || fallbackTexts.toggleDeviceManagerHelp || 'Manage available batteries, cameras, lenses...';
  setButtonLabelWithIconForEvents(btn, toggleLabel, ICON_GLYPHS.gears);
  btn.setAttribute('title', toggleLabel);
  btn.setAttribute('data-help', toggleHelp);
  btn.setAttribute('aria-expanded', 'false');
}

function toggleDeviceManagerSection() {
  const section = deviceManagerSection || document.getElementById('device-manager');
  const btn = toggleDeviceBtn || document.getElementById('toggleDeviceManager');
  if (!section || !btn) return;
  if (section.classList.contains('hidden')) {
    showDeviceManagerSection();
  } else {
    hideDeviceManagerSection();
  }
}

// Toggle device manager visibility
function bindDeviceManagerToggleHandler() {
  if (bindDeviceManagerToggleHandler.bound) {
    return;
  }
  bindDeviceManagerToggleHandler.bound = true;

  if (typeof document !== 'undefined' && document && typeof document.addEventListener === 'function') {
    document.addEventListener('click', (event) => {
      if (!event) {
        return;
      }
      const target = event.target;
      if (!target || typeof target.closest !== 'function') {
        return;
      }
      const button = target.closest('#toggleDeviceManager');
      if (!button) {
        return;
      }
      toggleDeviceManagerSection();
    });
  }
}

bindDeviceManagerToggleHandler();


function getEventsLanguageTexts() {
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

function resolveAutoBackupIndicatorMessage() {
  const { langTexts, fallbackTexts } = getEventsLanguageTexts();
  return (
    (langTexts && langTexts.autoBackupInProgressNotice)
    || (fallbackTexts && fallbackTexts.autoBackupInProgressNotice)
    || 'Auto backup in progress. Performance may pause briefly.'
  );
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
        toggle: toggleDeviceManagerSection,
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
      cineUi.help.register('saveSetup', () => {
        const { langTexts, fallbackTexts } = getEventsLanguageTexts();
        return (
          langTexts.saveSetupHelp
          || fallbackTexts.saveSetupHelp
          || 'Capture the current project—including devices, requirements and notes—so it can be restored instantly. The autosave status dot beside Project Name glows while changes are secured. Press Enter or Ctrl+S to save quickly; the Save button stays disabled until a name is entered.'
        );
      });

      cineUi.help.register('autoBackupBeforeDeletion', () => {
        const { langTexts, fallbackTexts } = getEventsLanguageTexts();
        return (
          langTexts.preDeleteBackupSuccess
          || fallbackTexts.preDeleteBackupSuccess
          || 'Automatic safety copy stored before deletion. Find the matching auto-backup entry under Saved Projects and rename it if you plan to keep it permanently.'
        );
      });
    }
  } catch (error) {
    console.warn('cineUi help registration failed', error);
  }
}

function registerEventsCineUi() {
  const cineUi = resolveCineUi();
  if (!cineUi) {
    return false;
  }

  registerEventsCineUiInternal(cineUi);
  return true;
}

registerEventsCineUi();


function toggleDeviceDetails(button) {
  const li = button.closest('li');
  if (!li) return;
  const details = li.querySelector('.device-details');
  if (!details) return;
  const expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    const { langTexts, fallbackTexts } = getEventsLanguageTexts();
    const showDetailsLabel = langTexts.showDetails || fallbackTexts.showDetails || 'Show Details';
    button.textContent = showDetailsLabel;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-help', showDetailsLabel);
  } else {
    details.style.display = 'block';
    const { langTexts, fallbackTexts } = getEventsLanguageTexts();
    const hideDetailsLabel = langTexts.hideDetails || fallbackTexts.hideDetails || 'Hide Details';
    button.textContent = hideDetailsLabel;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', hideDetailsLabel);
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      const rawName = typeof button.dataset.name === 'string' ? button.dataset.name : '';
      const rawCategory = typeof button.dataset.category === 'string' ? button.dataset.category : '';
      const rawSubcategory = typeof button.dataset.subcategory === 'string' ? button.dataset.subcategory : '';
      const detail = {
        name: rawName.trim(),
        category: rawCategory.trim(),
        subcategory: rawSubcategory.trim() || null,
      };
      try {
        document.dispatchEvent(new CustomEvent('device-library:show-details', { detail }));
      } catch (error) {
        console.warn('Failed to dispatch device-library:show-details event', error);
      }
    }
  }
}

function inferDeviceCategory(key, data) {
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || data.power?.batteryPlateSupport) return "cameras";
  if (key === "lenses" || data.mountOptions || data.focusScale) return "lenses";
  if (key === "monitors" || (data.screenSizeInches !== undefined && !key.includes("viewfinder"))) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "distances";
  if (key === "accessories.cables" || (typeof key === 'string' && key.startsWith("accessories.cables"))) return "accessories.cables";
  return "generic";
}

function resolveDefaultLensMountType() {
  const cameras = devices && devices.cameras ? devices.cameras : null;
  if (!cameras || typeof cameras !== 'object') {
    return '';
  }
  const findPreferredMount = (cam) => {
    if (!cam || typeof cam !== 'object' || !Array.isArray(cam.lensMount)) {
      return '';
    }
    const nativeEntry = cam.lensMount.find(entry => (
      entry
      && typeof entry.type === 'string'
      && typeof entry.mount === 'string'
      && entry.mount.toLowerCase() === 'native'
    ));
    if (nativeEntry && nativeEntry.type) {
      return nativeEntry.type;
    }
    const fallback = cam.lensMount.find(entry => entry && typeof entry.type === 'string' && entry.type.trim());
    return fallback ? fallback.type : '';
  };

  const selectedCameraName = typeof cameraSelect?.value === 'string' ? cameraSelect.value : '';
  if (selectedCameraName && cameras[selectedCameraName]) {
    const preferred = findPreferredMount(cameras[selectedCameraName]);
    if (preferred) {
      return preferred;
    }
  }

  const firstCamera = Object.values(cameras).find(entry => entry && typeof entry === 'object');
  if (firstCamera) {
    const preferred = findPreferredMount(firstCamera);
    if (preferred) {
      return preferred;
    }
  }

  return '';
}

function normalizeLensFocusScale(value) {
  if (typeof normalizeFocusScale === 'function') {
    try {
      const normalized = normalizeFocusScale(value);
      if (normalized === 'imperial' || normalized === 'metric') {
        return normalized;
      }
    } catch (focusScaleNormalizeError) {
      void focusScaleNormalizeError;
    }
  }
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (normalized === 'imperial' || normalized === 'metric') {
    return normalized;
  }
  return '';
}

function applyCameraFizConnectors(connectors) {
  const normalized = Array.isArray(connectors)
    ? connectors.map(entry => {
      if (!entry || typeof entry === 'string') {
        return entry;
      }
      if (typeof entry === 'object' && typeof entry.type === 'string') {
        return { ...entry };
      }
      return entry;
    })
    : [];

  let applied = false;

  if (typeof setFizConnectors === 'function') {
    try {
      setFizConnectors(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setFizConnectors invocation failed', directApplyError, {
            namespace: 'device-editor',
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
      callEventsCoreFunction('setFizConnectors', [normalized], { defer: true });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setFizConnectors', coreInvokeError, {
            namespace: 'device-editor',
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
  const normalized = Array.isArray(timecodes)
    ? timecodes.map(entry => {
      if (!entry) {
        return entry;
      }

      if (typeof entry === 'string') {
        const trimmed = entry.trim();
        return trimmed ? { type: trimmed, notes: '' } : entry;
      }

      if (typeof entry === 'object') {
        const normalizedEntry = { ...entry };

        if (typeof normalizedEntry.type !== 'string' || !normalizedEntry.type) {
          const derivedType =
            (typeof normalizedEntry.format === 'string' && normalizedEntry.format) ||
            (typeof normalizedEntry.name === 'string' && normalizedEntry.name) ||
            '';
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
    })
    : [];

  let applied = false;

  if (typeof setTimecodes === 'function') {
    try {
      setTimecodes(normalized);
      applied = true;
    } catch (directApplyError) {
      if (eventsLogger && typeof eventsLogger.warn === 'function') {
        try {
          eventsLogger.warn('Direct setTimecodes invocation failed', directApplyError, {
            namespace: 'device-editor',
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
      callEventsCoreFunction('setTimecodes', [normalized], { defer: true });
      applied = true;
    } catch (coreInvokeError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to schedule setTimecodes', coreInvokeError, {
            namespace: 'device-editor',
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
  const resolve = (val, id) => val || (typeof document !== 'undefined' ? document.getElementById(id) : null);

  // Re-resolve potentially null global references JIT
  const wattDiv = resolve(typeof wattFieldDiv !== 'undefined' ? wattFieldDiv : null, 'wattField');
  const batteryDiv = resolve(typeof batteryFieldsDiv !== 'undefined' ? batteryFieldsDiv : null, 'batteryFields');
  const cameraDiv = resolve(typeof cameraFieldsDiv !== 'undefined' ? cameraFieldsDiv : null, 'cameraFields');
  const monitorDiv = resolve(typeof monitorFieldsDiv !== 'undefined' ? monitorFieldsDiv : null, 'monitorFields');
  const viewfinderDiv = resolve(typeof viewfinderFieldsDiv !== 'undefined' ? viewfinderFieldsDiv : null, 'viewfinderFields');
  const videoDiv = resolve(typeof videoFieldsDiv !== 'undefined' ? videoFieldsDiv : null, 'videoFields');
  const motorDiv = resolve(typeof motorFieldsDiv !== 'undefined' ? motorFieldsDiv : null, 'motorFields');
  const controllerDiv = resolve(typeof controllerFieldsDiv !== 'undefined' ? controllerFieldsDiv : null, 'controllerFields');
  const distanceDiv = resolve(typeof distanceFieldsDiv !== 'undefined' ? distanceFieldsDiv : null, 'distanceFields');
  const lensDiv = resolve(typeof lensFieldsDiv !== 'undefined' ? lensFieldsDiv : null, 'lensFields');
  const subcategoryDiv = resolve(typeof subcategoryFieldDiv !== 'undefined' ? subcategoryFieldDiv : null, 'subcategoryField');
  const dynamicDiv = resolve(typeof dynamicFieldsDiv !== 'undefined' ? dynamicFieldsDiv : null, 'dynamicFields');

  placeWattField(categoryKey, deviceData);
  const type = inferDeviceCategory(categoryKey, deviceData);

  if (wattDiv) wattDiv.style.display = "";

  hideFormSection(batteryDiv);
  hideFormSection(cameraDiv);
  hideFormSection(monitorDiv);
  hideFormSection(viewfinderDiv);
  hideFormSection(videoDiv);
  hideFormSection(motorDiv);
  hideFormSection(controllerDiv);
  hideFormSection(distanceDiv);
  hideFormSection(lensDiv);

  clearDynamicFields();

  if (type === "batteries") {
    if (wattDiv) wattDiv.style.display = "none";
    showFormSection(batteryDiv);
    newCapacityInput.value = deviceData.capacity ?? '';
    newPinAInput.value = deviceData.pinA ?? '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : (deviceData.dtapA ?? '');
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    if (wattDiv) wattDiv.style.display = "none";
    showFormSection(cameraDiv);
    const tmp = resolveFirstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(deviceData.power?.batteryPlateSupport || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    callEventsCoreFunction('setLensMounts', [
      Array.isArray(deviceData.lensMount) ? deviceData.lensMount : [],
    ]);
    callEventsCoreFunction(
      'setPowerDistribution',
      [deviceData.power?.powerDistributionOutputs || []],
      { defer: true }
    );
    setVideoOutputs(deviceData.videoOutputs || []);
    applyCameraFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    applyCameraTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "lenses") {
    if (wattDiv) wattDiv.style.display = "none";
    showFormSection(lensDiv);
    const fallbackMount = resolveDefaultLensMountType();
    let mountOptions = [];
    if (Array.isArray(deviceData?.mountOptions)) {
      mountOptions = deviceData.mountOptions;
    } else if (Array.isArray(deviceData?.lensMount)) {
      mountOptions = deviceData.lensMount;
    } else if (typeof deviceData?.mount === 'string' && deviceData.mount.trim()) {
      mountOptions = [{ type: deviceData.mount.trim(), mount: 'native' }];
    }
    setLensDeviceMountOptions(mountOptions, fallbackMount);
    if (lensFocusScaleSelect) {
      updateLensFocusScaleSelectOptions();
      const storedFocusScale = normalizeLensFocusScale(deviceData && deviceData.focusScale);
      lensFocusScaleSelect.value = storedFocusScale || '';
    }
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    if (wattDiv) wattDiv.style.display = "none";
    showFormSection(monitorDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const mpt = resolveFirstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = deviceData.latencyMs ?? '';
    monitorAudioOutputInput.value =
      deviceData.audioOutput?.portType ||
      deviceData.audioOutput?.type ||
      deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    if (wattDiv) wattDiv.style.display = "none";
    showFormSection(viewfinderDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const vfpt = resolveFirstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs ?? '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    showFormSection(videoDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    callEventsCoreFunction('setVideoPowerInputs', [
      deviceData.power?.input || deviceData.powerInput || null,
    ]);
    setVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setVideoOutputsIO(deviceData.videoOutputs || deviceData.video?.outputs || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = deviceData.latencyMs ?? '';
    motorConnectorInput.value = '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    const cc = Array.isArray(deviceData.fizConnectors)
      ? deviceData.fizConnectors.map(fc => fc.type).join(', ')
      : (deviceData.fizConnector || '');
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "distances") {
    showFormSection(distanceDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "accessories.cables") {
    if (wattDiv) {
      wattDiv.style.display = "none";
    }
    if (subcategoryDiv) {
      subcategoryDiv.hidden = false;
    }
    const subcategoryKeys = getCableSubcategoryKeysForUi(subcategory ? [subcategory] : []);
    if (newSubcategorySelect) {
      newSubcategorySelect.innerHTML = '';
      for (let index = 0; index < subcategoryKeys.length; index += 1) {
        const sc = subcategoryKeys[index];
        const opt = document.createElement('option');
        opt.value = sc;
        opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
        newSubcategorySelect.appendChild(opt);
      }
    }
    const effectiveSubcategory =
      subcategory && subcategoryKeys.includes(subcategory)
        ? subcategory
        : (newSubcategorySelect && newSubcategorySelect.options.length > 0 ? newSubcategorySelect.options[0].value : '');

    if (newSubcategorySelect) {
      newSubcategorySelect.value = effectiveSubcategory || '';
      // Allow selecting a different subcategory while editing so devices can
      // be reorganised without re-creating them from scratch.
      newSubcategorySelect.disabled = false;
    }
    if (effectiveSubcategory) {
      buildDynamicFields(
        `accessories.cables.${effectiveSubcategory}`,
        deviceData,
        categoryExcludedAttrs[`accessories.cables.${effectiveSubcategory}`] || []
      );
    }
  } else {
    const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
    if (newWattInput) {
      newWattInput.value = watt || '';
    }

    // Check if the category actually uses wattage
    const schemaAttrs = typeof getSchemaAttributesForCategory === 'function'
      ? getSchemaAttributesForCategory(categoryKey)
      : [];
    const hasWattage = schemaAttrs.includes('powerDrawWatts') || (deviceData && deviceData.powerDrawWatts !== undefined);

    if (wattFieldDiv) {
      wattFieldDiv.style.display = hasWattage ? "" : "none";
    }

    const hasDtap = schemaAttrs.includes('dtapA') || schemaAttrs.includes('pinA') || (deviceData && (deviceData.dtapA !== undefined || deviceData.pinA !== undefined));
    if (dtapRow) {
      dtapRow.style.display = hasDtap ? "" : "none";
    }

    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}

// Handle "Edit" and "Delete" buttons in device lists (event delegation)
addSafeEventListener('device-manager', "click", (event) => {
  if (!event || !event.target) return;

  let button = null;
  try {
    if (typeof event.target.closest === 'function') {
      button = event.target.closest('button');
    } else if (event.target.parentElement && typeof event.target.parentElement.closest === 'function') {
      button = event.target.parentElement.closest('button');
    }
  } catch (e) { /* ignore */ }

  if (!button) {
    return;
  }

  // Ensure the button is actually inside the section (redundant but safe)
  try {
    if (event.currentTarget && typeof event.currentTarget.contains === 'function' && !event.currentTarget.contains(button)) {
      return;
    }
  } catch (e) { /* ignore */ }

  if (button.classList.contains("detail-toggle")) {
    toggleDeviceDetails(button);
  } else if (button.classList.contains("edit-btn")) {
    const name = button.dataset.name;
    const categoryKey = button.dataset.category;
    const subcategory = button.dataset.subcategory;
    const categorySelect = resolveNewCategorySelect();

    if (!categorySelect) {
      console.warn('Cannot edit device: category select is unavailable');
      return;
    }

    // Ensure category exists in selector
    if (!Array.from(categorySelect.options).some(opt => opt.value === categoryKey)) {
      const opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = categoryNames[currentLang]?.[categoryKey] || categoryKey;
      categorySelect.appendChild(opt);
    }

    const safeAddDeviceBtn = addDeviceBtn;
    if (safeAddDeviceBtn) {
      safeAddDeviceBtn.dataset.mode = "edit";
      safeAddDeviceBtn.dataset.originalName = name;
      safeAddDeviceBtn.dataset.originalCategory = categoryKey;
      if (categoryKey === "accessories.cables" && subcategory) {
        safeAddDeviceBtn.dataset.originalSubcategory = subcategory;
      } else {
        delete safeAddDeviceBtn.dataset.originalSubcategory;
      }
    }

    // Set form for editing
    categorySelect.value = categoryKey;
    newNameInput.value = name;
    // Trigger change handler so fields are cleared and rebuilt for the category
    categorySelect.dispatchEvent(new Event('change'));

    let deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      const [mainCat, subCat] = categoryKey.split('.');
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }

    populateDeviceForm(categoryKey, deviceData, subcategory);
    // Change button to "Update"
    const safeAddDeviceBtnForEdit = addDeviceBtn;
    if (safeAddDeviceBtnForEdit) {
      setButtonLabelWithIconForEvents(safeAddDeviceBtnForEdit, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
      safeAddDeviceBtnForEdit.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    }

    const safeCancelEditBtn = cancelEditBtn;
    if (safeCancelEditBtn) {
      setButtonLabelWithIconForEvents(safeCancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
      safeCancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      showFormSection(safeCancelEditBtn);
    }
    document.getElementById("addDeviceHeading").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (button.classList.contains("delete-btn")) {
    const name = button.dataset.name;
    const categoryKey = button.dataset.category;
    const subcategory = button.dataset.subcategory;

    const performDeviceDeletion = () => {
      if (categoryKey === "accessories.cables") {
        delete devices.accessories.cables[subcategory][name];
      } else if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        delete devices[mainCat][subCat][name];
      } else {
        delete devices[categoryKey][name];
      }
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceListsSafe();
      callCoreFunctionIfAvailable('updateMountTypeOptions', [], { defer: true });
      // Re-populate all dropdowns and update calculations
      const curCameraSelect = typeof cameraSelect !== 'undefined' ? cameraSelect : (typeof document !== 'undefined' ? document.getElementById('cameraSelect') : null);
      const curVideoSelect = typeof videoSelect !== 'undefined' ? videoSelect : (typeof document !== 'undefined' ? document.getElementById('videoSelect') : null);
      const curDistanceSelect = typeof distanceSelect !== 'undefined' ? distanceSelect : (typeof document !== 'undefined' ? document.getElementById('distanceSelect') : null);
      const curBatterySelect = typeof batterySelect !== 'undefined' ? batterySelect : (typeof document !== 'undefined' ? document.getElementById('batterySelect') : null);

      populateSelect(curCameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(curVideoSelect, devices.video, true);

      const fiz = devices.fiz || {};
      const curMotorSelects = (typeof motorSelects !== 'undefined' && Array.isArray(motorSelects)) ? motorSelects : [
        document.getElementById("motor1Select"),
        document.getElementById("motor2Select"),
        document.getElementById("motor3Select"),
        document.getElementById("motor4Select")
      ];
      const curControllerSelects = (typeof controllerSelects !== 'undefined' && Array.isArray(controllerSelects)) ? controllerSelects : [
        document.getElementById("controller1Select"),
        document.getElementById("controller2Select")
      ];

      curMotorSelects.forEach(sel => populateSelect(sel, fiz.motors, true));
      curControllerSelects.forEach(sel => populateSelect(sel, fiz.controllers, true));
      populateSelect(curDistanceSelect, fiz.distance, true);
      populateSelect(curBatterySelect, devices.batteries, true);
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
    };

    if (typeof window.cineShowConfirmDialog === 'function') {
      window.cineShowConfirmDialog({
        title: (texts[currentLang] && texts[currentLang].deleteDeviceTitle) || 'Delete Device',
        message: texts[currentLang].confirmDeleteDevice.replace("{name}", name),
        confirmLabel: 'Delete',
        danger: true,
        onConfirm: () => performDeviceDeletion()
      });
    } else {
      if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
        performDeviceDeletion();
      }
    }
  }
});

function resolveDeviceManagerSectionForEvents() {
  return deviceManagerSection || document.getElementById('device-manager');
}

addSafeEventListener('device-manager', 'keydown', (event) => {
  if (!resolveDeviceManagerSectionForEvents()) {
    return;
  }
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});

// Category selection in add device form
// Category selection in add device form
addSafeEventListener('newCategory', "change", () => {
  console.log('[newCategory change] Category change event fired');
  const wasEditing = addDeviceBtn?.dataset.mode === "edit";
  const previousName = newNameInput ? newNameInput.value : "";
  const newCategorySelectElement = document.getElementById('newCategory');
  const val = (newCategorySelectElement ? newCategorySelectElement.value : '').trim();
  const type = (typeof inferDeviceCategory === 'function') ? inferDeviceCategory(val, {}) : 'generic';

  console.log('[newCategory change] Inferred type:', type, 'for value:', `"${val}"`);

  placeWattField(val);
  clearDynamicFields();
  if (subcategoryFieldDiv) subcategoryFieldDiv.hidden = true;
  const previousSubcategoryValue = newSubcategorySelect ? newSubcategorySelect.value : '';
  if (newSubcategorySelect) {
    newSubcategorySelect.innerHTML = "";
    newSubcategorySelect.disabled = false;
  }
  if (dtapRow) dtapRow.style.display = "";
  if (wattFieldDiv) wattFieldDiv.style.display = "";

  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  hideFormSection(lensFieldsDiv);

  if (type === "batteries") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    if (dtapRow) dtapRow.style.display = (val === "batteryHotswaps" || val === "accessories.batteryHotswaps") ? "none" : "";
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "cameras") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "lenses") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(lensFieldsDiv);
    setLensDeviceMountOptions([], resolveDefaultLensMountType());
    if (lensFocusScaleSelect) {
      updateLensFocusScaleSelectOptions();
      lensFocusScaleSelect.value = '';
    }
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "monitors") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(monitorFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "viewfinders") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(viewfinderFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "video") {
    showFormSection(videoFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "distances") {
    showFormSection(distanceFieldsDiv);
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  } else if (type === "accessories.cables") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    if (subcategoryFieldDiv) subcategoryFieldDiv.hidden = false;
    const subcategoryKeys = getCableSubcategoryKeysForUi(
      previousSubcategoryValue ? [previousSubcategoryValue] : []
    );
    for (let index = 0; index < subcategoryKeys.length; index += 1) {
      const sc = subcategoryKeys[index];
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    const effectiveSubcategory =
      previousSubcategoryValue && subcategoryKeys.includes(previousSubcategoryValue)
        ? previousSubcategoryValue
        : (newSubcategorySelect.options.length > 0 ? newSubcategorySelect.options[0].value : '');
    newSubcategorySelect.value = (newSubcategorySelect && effectiveSubcategory) || '';
    if (effectiveSubcategory) {
      buildDynamicFields(
        `accessories.cables.${effectiveSubcategory}`,
        {},
        categoryExcludedAttrs[`accessories.cables.${effectiveSubcategory}`] || []
      );
    }
  } else {
    // Generic branch
    const schemaAttrs = typeof getSchemaAttributesForCategory === 'function' ? getSchemaAttributesForCategory(val) : [];
    const hasWattage = schemaAttrs.includes('powerDrawWatts');
    if (wattFieldDiv) {
      wattFieldDiv.style.display = hasWattage ? "" : "none";
    }
    const hasDtap = schemaAttrs.includes('dtapA') || schemaAttrs.includes('pinA');
    if (dtapRow) {
      dtapRow.style.display = hasDtap ? "" : "none";
    }
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  }
  if (newWattInput) newWattInput.value = "";
  if (newCapacityInput) newCapacityInput.value = "";
  if (newPinAInput) newPinAInput.value = "";
  if (newDtapAInput) newDtapAInput.value = "";
  if (cameraWattInput) cameraWattInput.value = "";
  if (cameraVoltageInput) cameraVoltageInput.value = "";
  if (cameraPortTypeInput) cameraPortTypeInput.value = "";
  if (monitorScreenSizeInput) monitorScreenSizeInput.value = "";
  if (monitorBrightnessInput) monitorBrightnessInput.value = "";
  if (monitorWattInput) monitorWattInput.value = "";
  if (monitorVoltageInput) monitorVoltageInput.value = "";
  if (monitorPortTypeInput) monitorPortTypeInput.value = "";
  if (monitorWirelessTxInput) monitorWirelessTxInput.checked = false;
  if (monitorLatencyInput) monitorLatencyInput.value = "";
  if (monitorAudioOutputInput) monitorAudioOutputInput.value = "";
  if (typeof clearMonitorVideoInputs === 'function') {
    clearMonitorVideoInputs();
  } else if (typeof window !== 'undefined' && typeof window.clearMonitorVideoInputs === 'function') {
    window.clearMonitorVideoInputs();
  }
  if (typeof clearMonitorVideoOutputs === 'function') {
    clearMonitorVideoOutputs();
  } else if (typeof window !== 'undefined' && typeof window.clearMonitorVideoOutputs === 'function') {
    window.clearMonitorVideoOutputs();
  }
  if (viewfinderScreenSizeInput) viewfinderScreenSizeInput.value = "";
  if (viewfinderBrightnessInput) viewfinderBrightnessInput.value = "";
  if (viewfinderWattInput) viewfinderWattInput.value = "";
  if (viewfinderVoltageInput) viewfinderVoltageInput.value = "";
  if (viewfinderPortTypeInput) viewfinderPortTypeInput.value = "";
  if (viewfinderWirelessTxInput) viewfinderWirelessTxInput.checked = false;
  if (viewfinderLatencyInput) viewfinderLatencyInput.value = "";
  if (typeof clearViewfinderVideoInputs === 'function') {
    clearViewfinderVideoInputs();
  }
  if (typeof clearViewfinderVideoOutputs === 'function') {
    clearViewfinderVideoOutputs();
  }
  clearBatteryPlates();
  if (typeof clearRecordingMedia === 'function') {
    clearRecordingMedia();
  }
  clearLensMounts();
  clearLensDeviceMountOptions();
  if (lensFocusScaleSelect) {
    lensFocusScaleSelect.value = '';
  }
  callEventsCoreFunction('clearPowerDistribution', [], { defer: true });
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  clearTimecodes();
  callEventsCoreFunction('clearVideoPowerInputs');
  clearVideoInputs();
  clearVideoOutputsIO();
  if (videoFrequencyInput) videoFrequencyInput.value = "";
  if (videoLatencyInput) videoLatencyInput.value = "";
  if (motorConnectorInput) motorConnectorInput.value = "";
  if (motorInternalInput) motorInternalInput.checked = false;
  if (motorTorqueInput) motorTorqueInput.value = "";
  if (motorGearInput) motorGearInput.value = "";
  if (motorNotesInput) motorNotesInput.value = "";
  if (controllerConnectorInput) controllerConnectorInput.value = "";
  if (controllerPowerInput) controllerPowerInput.value = "";
  if (controllerBatteryInput) controllerBatteryInput.value = "";
  if (controllerConnectivityInput) controllerConnectivityInput.value = "";
  if (controllerNotesInput) controllerNotesInput.value = "";
  if (distanceConnectionInput) distanceConnectionInput.value = "";
  if (distanceMethodInput) distanceMethodInput.value = "";
  if (distanceRangeInput) distanceRangeInput.value = "";
  if (distanceAccuracyInput) distanceAccuracyInput.value = "";
  if (distanceOutputInput) distanceOutputInput.value = "";
  if (distanceNotesInput) distanceNotesInput.value = "";
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
  const cancelLabel = texts[currentLang].cancelEditBtn;
  if (wasEditing) {
    const safeAddDeviceBtn = addDeviceBtn;
    if (safeAddDeviceBtn) {
      setButtonLabelWithIconForEvents(safeAddDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
      safeAddDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    }
    const safeCancelEditBtn = cancelEditBtn;
    if (safeCancelEditBtn) {
      setButtonLabelWithIconForEvents(safeCancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      safeCancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      showFormSection(safeCancelEditBtn);
    }
  } else {
    const safeAddDeviceBtn = addDeviceBtn;
    if (safeAddDeviceBtn) {
      setButtonLabelWithIconForEvents(safeAddDeviceBtn, texts[currentLang].addDeviceBtn, ICON_GLYPHS.add);
      safeAddDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
      safeAddDeviceBtn.dataset.mode = "add";
      delete safeAddDeviceBtn.dataset.originalName;
      delete safeAddDeviceBtn.dataset.originalSubcategory;
      delete safeAddDeviceBtn.dataset.originalCategory;
    }
    const safeCancelEditBtn = cancelEditBtn;
    if (safeCancelEditBtn) {
      setButtonLabelWithIconForEvents(safeCancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
      safeCancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
      hideFormSection(safeCancelEditBtn);
    }
  }
});


addSafeEventListener('newSubcategory', 'change', () => {
  const categorySelect = document.getElementById('newCategory');
  if (categorySelect && categorySelect.value === 'accessories.cables') {
    buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`, {}, categoryExcludedAttrs[`accessories.cables.${newSubcategorySelect.value}`] || []);
  }
});

function resetDeviceForm() {
  const safeAddDeviceBtn = addDeviceBtn;
  if (safeAddDeviceBtn) {
    safeAddDeviceBtn.dataset.mode = "add";
    delete safeAddDeviceBtn.dataset.originalName;
    delete safeAddDeviceBtn.dataset.originalSubcategory;
    delete safeAddDeviceBtn.dataset.originalCategory;
  }
  const safeCancelEditBtn = cancelEditBtn;
  if (safeCancelEditBtn) {
    hideFormSection(safeCancelEditBtn);
    setButtonLabelWithIconForEvents(safeCancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    safeCancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  }
  // Trigger change handler to reset fields and button text, guarding against
  // missing DOM elements in test environments.
  const categorySelect = resolveNewCategorySelect();
  if (categorySelect && categorySelect.isConnected) {
    try {
      categorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}

function clearDeviceManagerFilterForCategory(categoryKey, deviceName) {
  if (!categoryKey || typeof document === 'undefined' || !document) {
    return;
  }
  const normalizedCategory = String(categoryKey);
  const filterInput =
    document.querySelector(`input.list-filter[data-category-key="${normalizedCategory}"]`) ||
    document.getElementById(`${normalizedCategory.replace(/[^a-z0-9]+/gi, '_')}ListFilter`);
  if (!filterInput) {
    return;
  }
  const rawFilter = typeof filterInput.value === 'string' ? filterInput.value : '';
  const trimmedFilter = rawFilter.trim();
  if (!trimmedFilter) {
    return;
  }
  const normalizedFilter = trimmedFilter.toLowerCase();
  const normalizedName =
    typeof deviceName === 'string' && deviceName ? deviceName.trim().toLowerCase() : '';
  if (normalizedName && normalizedName.includes(normalizedFilter)) {
    return;
  }
  filterInput.value = '';
  try {
    filterInput.dispatchEvent(new Event('input', { bubbles: true }));
  } catch (inputError) {
    void inputError;
  }
  try {
    filterInput.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (changeError) {
    void changeError;
  }
}


// Add/Update device logic
function applyDynamicFieldsToDevice(container, key, categoryKey, excludedAttributes) {
  if (!container || typeof container !== 'object' || !key) {
    applyDynamicFieldValues(undefined, categoryKey, excludedAttributes);
    return;
  }

  const currentEntry = container[key];
  const updatedEntry = applyDynamicFieldValues(currentEntry, categoryKey, excludedAttributes);

  if (updatedEntry && updatedEntry !== currentEntry) {
    container[key] = updatedEntry;
  }
}

addSafeEventListener('addDeviceBtn', "click", (event) => {
  if (event && typeof event.preventDefault === 'function') {
    try {
      event.preventDefault();
    } catch (preventDefaultError) {
      void preventDefaultError;
    }
  }
  const name = newNameInput.value.trim();
  const categorySelect = resolveNewCategorySelect();
  const category = categorySelect ? categorySelect.value : '';
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;
  const originalCategory = addDeviceBtn.dataset.originalCategory;
  const subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  const originalSubcategory = addDeviceBtn.dataset.originalSubcategory;

  if (!name) {
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceNameTitle || 'Name Required',
        message: texts[currentLang].alertDeviceName
      });
    } else {
      alert(texts[currentLang].alertDeviceName);
    }
    return;
  }

  if (category === "accessories.cables" && !subcategory) {
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceFieldsTitle || 'Incomplete Data',
        message: texts[currentLang].alertDeviceFields
      });
    } else {
      alert(texts[currentLang].alertDeviceFields);
    }
    return;
  }

  const targetCategory = getCategoryContainer(category, subcategory, { create: true });
  if (!targetCategory) {
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceFieldsTitle || 'Incomplete Data',
        message: texts[currentLang].alertDeviceFields
      });
    } else {
      alert(texts[currentLang].alertDeviceFields);
    }
    return;
  }

  const storedOriginalCategory = originalCategory || category;
  const storedOriginalSubcategory = originalSubcategory || null;
  const originalCollection = isEditing
    ? getCategoryContainer(
      storedOriginalCategory,
      storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory : null,
      { create: false }
    )
    : null;
  const originalDeviceData = isEditing && originalCollection ? originalCollection[originalName] : undefined;
  const editingSameCategory = isEditing && storedOriginalCategory === category;
  const editingSamePath = editingSameCategory && (
    category !== "accessories.cables" || storedOriginalSubcategory === subcategory
  );

  const categoryChanged = isEditing && storedOriginalCategory !== category;
  const cablePathChanged =
    isEditing && (
      (category === "accessories.cables" && subcategory !== storedOriginalSubcategory) ||
      (storedOriginalCategory === "accessories.cables" && storedOriginalSubcategory !== subcategory)
    );
  const nameChanged = isEditing && name !== originalName;

  // Check for duplicate name if adding, or if the destination path differs during edit
  if (
    (!isEditing && targetCategory[name] !== undefined) ||
    (isEditing && targetCategory[name] !== undefined && (nameChanged || categoryChanged || cablePathChanged))
  ) {
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceExistsTitle || 'Device Exists',
        message: texts[currentLang].alertDeviceExists
      });
    } else {
      alert(texts[currentLang].alertDeviceExists);
    }
    return;
  }

  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (
      isNaN(capacity) ||
      isNaN(pinA) ||
      capacity < 0 ||
      pinA < 0 ||
      (category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0))
    ) {
      if (typeof window.cineShowAlertDialog === 'function') {
        window.cineShowAlertDialog({
          title: texts[currentLang].alertDeviceFieldsTitle || 'Incomplete Data',
          message: texts[currentLang].alertDeviceFields
        });
      } else {
        alert(texts[currentLang].alertDeviceFields);
      }
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA };
    } else {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA, dtapA: dtapA };
    }
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "accessories.cables") {
    const existing = isEditing && originalDeviceData ? { ...originalDeviceData } : {};
    targetCategory[name] = { ...existing };
    applyDynamicFieldsToDevice(
      targetCategory,
      name,
      `accessories.cables.${subcategory}`,
      categoryExcludedAttrs[`accessories.cables.${subcategory}`] || []
    );
  } else if (category === "cameras") {
    const watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    let powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = invokeCoreFunctionStrict('getPowerDistribution');
      videoOut = invokeCoreFunctionStrict('getVideoOutputs');
      fizCon = invokeCoreFunctionStrict('getFizConnectors');
      viewfinder = invokeCoreFunctionStrict('getViewfinders');
      timecode = invokeCoreFunctionStrict('getTimecodes');
      plateSupport = invokeCoreFunctionStrict('getBatteryPlates');
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
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
    callCoreFunctionIfAvailable('updateMountTypeOptions', [], { defer: true });
  } else if (category === "lenses") {
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    const mountOptions = getLensDeviceMountOptions();
    if (mountOptions.length) {
      existing.mountOptions = mountOptions;
      existing.mount = mountOptions[0].type || '';
    } else {
      delete existing.mountOptions;
      delete existing.mount;
    }
    if (lensFocusScaleSelect) {
      const selectedFocusScale = normalizeLensFocusScale(lensFocusScaleSelect.value);
      if (selectedFocusScale) {
        existing.focusScale = selectedFocusScale;
      } else {
        delete existing.focusScale;
      }
    }
    targetCategory[name] = existing;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
    callCoreFunctionIfAvailable('updateMountTypeOptions', [], { defer: true });
  } else if (category === "monitors" || category === "directorMonitors") {
    const watt = parseFloat(monitorWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(monitorScreenSizeInput.value);
    const brightness = parseFloat(monitorBrightnessInput.value);
    const monitorLatencyRaw =
      typeof monitorLatencyInput.value === 'string'
        ? monitorLatencyInput.value.trim()
        : '';
    const monitorLatencyValue = monitorLatencyRaw !== '' ? monitorLatencyRaw : undefined;
    const monitorData = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
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
      audioOutput: monitorAudioOutputInput.value ? { portType: monitorAudioOutputInput.value } : undefined
    };
    if (typeof monitorLatencyValue !== 'undefined') {
      monitorData.latencyMs = monitorLatencyValue;
    }
    targetCategory[name] = monitorData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "viewfinders") {
    const watt = parseFloat(viewfinderWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(viewfinderScreenSizeInput.value);
    const brightness = parseFloat(viewfinderBrightnessInput.value);
    const viewfinderLatencyRaw =
      typeof viewfinderLatencyInput.value === 'string'
        ? viewfinderLatencyInput.value.trim()
        : '';
    const viewfinderLatencyValue = viewfinderLatencyRaw !== '' ? viewfinderLatencyRaw : undefined;
    const viewfinderData = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: watt,
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
    };
    if (typeof viewfinderLatencyValue !== 'undefined') {
      viewfinderData.latencyMs = viewfinderLatencyValue;
    }
    targetCategory[name] = viewfinderData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const videoLatencyRaw =
      typeof videoLatencyInput.value === 'string' ? videoLatencyInput.value.trim() : '';
    const videoLatencyValue = videoLatencyRaw !== '' ? videoLatencyRaw : undefined;
    let videoPowerInputs;
    try {
      videoPowerInputs = invokeCoreFunctionStrict('getVideoPowerInputs', []);
    } catch (powerInputError) {
      if (eventsLogger && typeof eventsLogger.error === 'function') {
        try {
          eventsLogger.error('Failed to collect video power inputs', powerInputError, {
            namespace: 'device-editor',
          });
        } catch (logError) {
          void logError;
        }
      }
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Failed to collect video power inputs', powerInputError);
      }
      videoPowerInputs = undefined;
    }
    const existingVideoDevice =
      isEditing && originalDeviceData && typeof originalDeviceData === 'object'
        ? (() => {
          try {
            return JSON.parse(JSON.stringify(originalDeviceData));
          } catch (cloneError) {
            void cloneError;
            return { ...originalDeviceData };
          }
        })()
        : {};
    const videoDeviceData =
      existingVideoDevice && typeof existingVideoDevice === 'object'
        ? existingVideoDevice
        : {};
    videoDeviceData.powerDrawWatts = watt;

    const normalizedInputs = getVideoInputs();
    if (Array.isArray(normalizedInputs) && normalizedInputs.length) {
      videoDeviceData.videoInputs = normalizedInputs;
    } else {
      delete videoDeviceData.videoInputs;
    }

    const normalizedOutputs = getVideoOutputsIO();
    if (Array.isArray(normalizedOutputs) && normalizedOutputs.length) {
      videoDeviceData.videoOutputs = normalizedOutputs;
    } else {
      delete videoDeviceData.videoOutputs;
    }

    const rawFrequency =
      typeof videoFrequencyInput.value === 'string'
        ? videoFrequencyInput.value.trim()
        : '';
    if (rawFrequency) {
      videoDeviceData.frequency = rawFrequency;
    } else {
      delete videoDeviceData.frequency;
    }

    if (typeof videoPowerInputs !== 'undefined') {
      const mergePowerInput =
        typeof VIDEO_POWER_INPUT_HELPERS.mergePowerInput === 'function'
          ? VIDEO_POWER_INPUT_HELPERS.mergePowerInput
          : (power, input) => {
            const base = power && typeof power === 'object' ? { ...power } : {};
            base.input = input;
            return base;
          };
      const mergedPower = mergePowerInput(videoDeviceData.power, videoPowerInputs);
      if (mergedPower && Object.keys(mergedPower).length) {
        videoDeviceData.power = mergedPower;
      } else {
        delete videoDeviceData.power;
      }
    } else {
      delete videoDeviceData.power;
    }
    if (typeof videoLatencyValue !== 'undefined') {
      videoDeviceData.latencyMs = videoLatencyValue;
    } else {
      delete videoDeviceData.latencyMs;
    }
    targetCategory[name] = videoDeviceData;
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.motors") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(s => s.trim()).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.controllers") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      fizConnector: controllerConnectorInput.value,
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else if (category === "fiz.distance") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    targetCategory[name] = { ...existing, powerDrawWatts: watt };
    applyDynamicFieldsToDevice(targetCategory, name, category, categoryExcludedAttrs[category] || []);
  }

  if (isEditing) {
    removeOriginalDeviceEntry(
      storedOriginalCategory,
      storedOriginalSubcategory,
      originalName,
      category,
      subcategory,
      name
    );
    addDeviceBtn.dataset.originalCategory = category;
    if (category === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    addDeviceBtn.dataset.originalName = name;
  }

  clearDeviceManagerFilterForCategory(category, name);

  // After adding/updating, reset form and refresh lists
  resetDeviceForm();

  if (typeof updateGlobalDevicesReference === 'function') {
    updateGlobalDevicesReference(devices);
  }
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
  refreshDeviceListsSafe();
  // Re-populate all dropdowns to include the new/updated device
  const curCameraSelect = typeof cameraSelect !== 'undefined' ? cameraSelect : (typeof document !== 'undefined' ? document.getElementById('cameraSelect') : null);
  const curVideoSelect = typeof videoSelect !== 'undefined' ? videoSelect : (typeof document !== 'undefined' ? document.getElementById('videoSelect') : null);
  const curDistanceSelect = typeof distanceSelect !== 'undefined' ? distanceSelect : (typeof document !== 'undefined' ? document.getElementById('distanceSelect') : null);
  const curBatterySelect = typeof batterySelect !== 'undefined' ? batterySelect : (typeof document !== 'undefined' ? document.getElementById('batterySelect') : null);

  populateSelect(curCameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(curVideoSelect, devices.video, true);

  const fiz = devices.fiz || {};
  const curMotorSelects = (typeof motorSelects !== 'undefined' && Array.isArray(motorSelects)) ? motorSelects : [
    document.getElementById("motor1Select"),
    document.getElementById("motor2Select"),
    document.getElementById("motor3Select"),
    document.getElementById("motor4Select")
  ];
  const curControllerSelects = (typeof controllerSelects !== 'undefined' && Array.isArray(controllerSelects)) ? controllerSelects : [
    document.getElementById("controller1Select"),
    document.getElementById("controller2Select")
  ];

  curMotorSelects.forEach(sel => populateSelect(sel, fiz.motors, true));
  curControllerSelects.forEach(sel => populateSelect(sel, fiz.controllers, true));
  populateSelect(curDistanceSelect, fiz.distance, true);
  populateSelect(curBatterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations(); // Update calculations after device data changes

  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    const normalizedSubcategory =
      category === "accessories.cables" && subcategory ? subcategory.trim() || null : null;
    const detail = {
      name,
      category,
      subcategory: normalizedSubcategory,
    };
    if (isEditing) {
      detail.original = {
        name: originalName || '',
        category: storedOriginalCategory || '',
        subcategory:
          storedOriginalCategory === "accessories.cables"
            ? (storedOriginalSubcategory ? storedOriginalSubcategory : null)
            : null,
      };
    }
    try {
      document.dispatchEvent(new CustomEvent(
        isEditing ? 'device-library:update' : 'device-library:add',
        { detail },
      ));
    } catch (error) {
      console.warn('Failed to dispatch device library mutation event', error);
    }
  }

  let categoryKey = category.replace(".", "_");
  let categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
    const message = texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay);
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceUpdatedTitle || 'Device Updated',
        message: message
      });
    } else {
      alert(message);
    }
  } else {
    const message = texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay);
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: texts[currentLang].alertDeviceAddedTitle || 'Device Added',
        message: message
      });
    } else {
      alert(message);
    }
  }
});

// Cancel editing and revert form to add mode
addSafeEventListener('cancelEditBtn', "click", () => {
  resetDeviceForm();
});

// Export device data
addSafeEventListener('exportDataBtn', "click", () => {
  if (typeof autoBackup === 'function') {
    try {
      autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'export',
      });
    } catch (error) {
      console.warn('Failed to auto backup before export', error);
    }
  }
  const dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 1500);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
});

const exportAndRevertBtn = document.getElementById('exportAndRevertBtn');

if (exportAndRevertBtn) {
  addSafeEventListener('exportAndRevertBtn', 'click', () => {
    const performExportAndRevert = () => {
      // Reusing the export logic from the existing 'Export Database' button
      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'export-revert',
          });
        } catch (error) {
          console.warn('Failed to auto backup before export and revert', error);
        }
      }
      const dataStr = JSON.stringify(devices, null, 2);
      // For simplicity, let's just trigger a download directly.
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json"; // Suggests it's a backup
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 1500);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);

      // Give a small delay to ensure download prompt appears before next step
      const revertTimer = setTimeout(() => {
        // Step 2: Remove saved database and reload page so device files are re-read
        const clearedVariants = clearAllDeviceStorageVariantsForEvents();
        if (!clearedVariants) {
          try {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn('Unable to confirm device storage reset during export & revert');
            }
          } catch (logError) {
            void logError;
          }
        }

        if (typeof window.cineShowAlertDialog === 'function') {
          window.cineShowAlertDialog({
            title: texts[currentLang].alertExportAndRevertSuccessTitle || 'Database Reset',
            message: texts[currentLang].alertExportAndRevertSuccess
          });
        } else {
          alert(texts[currentLang].alertExportAndRevertSuccess);
        }
        location.reload();
      }, 500); // 500ms delay
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    };

    if (typeof window.cineShowConfirmDialog === 'function') {
      window.cineShowConfirmDialog({
        title: (texts[currentLang] && texts[currentLang].exportAndRevertTitle) || 'Export and Revert',
        message: texts[currentLang].confirmExportAndRevert,
        confirmLabel: 'Export & Revert',
        danger: true,
        onConfirm: () => performExportAndRevert()
      });
    } else {
      if (confirm(texts[currentLang].confirmExportAndRevert)) { // Confirmation for both actions
        performExportAndRevert();
      }
    }
  });
}

// Import device data
addSafeEventListener('importDataBtn', "click", () => {
  importFileInput.click(); // Trigger the file input click
});

addSafeEventListener('importFileInput', "change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  const importFileName = typeof file.name === 'string' && file.name ? file.name : null;
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      const result = parseDeviceDatabaseImport(importedData);
      const importDeviceCounts = buildDeviceCountsSnapshot(devices, result.devices);

      if (!result.devices) {
        const summary = formatDeviceImportErrors(result.errors);
        logDeviceImportEvent(
          'warn',
          'Device import validation failed',
          {
            fileName: importFileName,
            deviceCounts: importDeviceCounts,
            validationErrors: sanitizeImportErrors(result.errors),
            errorCount: Array.isArray(result.errors) ? result.errors.length : 0,
          },
          { action: 'validate' }
        );
        console.error('Device import validation failed:', result.errors);
        const message = summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError;
        if (typeof window.cineShowAlertDialog === 'function') {
          window.cineShowAlertDialog({
            title: texts[currentLang].alertImportErrorTitle || 'Import Error',
            message: message
          });
        } else {
          alert(message);
        }
        return;
      }

      if (typeof autoBackup === 'function') {
        try {
          autoBackup({
            suppressSuccess: true,
            triggerAutoSaveNotification: true,
            reason: 'import',
          });
        } catch (error) {
          logDeviceImportEvent(
            'warn',
            'Auto backup before device import failed',
            {
              fileName: importFileName,
              deviceCounts: importDeviceCounts,
              error: sanitizeErrorForLogging(error),
            },
            { action: 'auto-backup' }
          );
          console.warn('Failed to auto backup before import', error);
        }
      }

      devices = result.devices; // Overwrite current devices with imported data
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices, { force: true });
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceListsSafe(); // Update device manager lists
      // Re-populate all dropdowns and update calculations
      const curCameraSelect = typeof cameraSelect !== 'undefined' ? cameraSelect : (typeof document !== 'undefined' ? document.getElementById('cameraSelect') : null);
      const curVideoSelect = typeof videoSelect !== 'undefined' ? videoSelect : (typeof document !== 'undefined' ? document.getElementById('videoSelect') : null);
      const curDistanceSelect = typeof distanceSelect !== 'undefined' ? distanceSelect : (typeof document !== 'undefined' ? document.getElementById('distanceSelect') : null);
      const curBatterySelect = typeof batterySelect !== 'undefined' ? batterySelect : (typeof document !== 'undefined' ? document.getElementById('batterySelect') : null);

      populateSelect(curCameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(curVideoSelect, devices.video, true);

      const fiz = devices.fiz || {};
      const curMotorSelects = (typeof motorSelects !== 'undefined' && Array.isArray(motorSelects)) ? motorSelects : [
        document.getElementById("motor1Select"),
        document.getElementById("motor2Select"),
        document.getElementById("motor3Select"),
        document.getElementById("motor4Select")
      ];
      const curControllerSelects = (typeof controllerSelects !== 'undefined' && Array.isArray(controllerSelects)) ? controllerSelects : [
        document.getElementById("controller1Select"),
        document.getElementById("controller2Select")
      ];

      curMotorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
      curControllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
      populateSelect(curDistanceSelect, devices.fiz.distance, true);
      populateSelect(curBatterySelect, devices.batteries, true);
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

      const deviceCount = countDeviceDatabaseEntries(devices);
      const message = texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount);
      if (typeof window.cineShowAlertDialog === 'function') {
        window.cineShowAlertDialog({
          title: texts[currentLang].alertImportSuccessTitle || 'Import Successful',
          message: message
        });
      } else {
        alert(message);
      }
      exportOutput.style.display = "block"; // Show the textarea
      exportOutput.value = JSON.stringify(devices, null, 2); // Display the newly imported data
    } catch (error) {
      logDeviceImportEvent(
        'error',
        'Failed to import device data',
        {
          fileName: importFileName,
          deviceCounts: buildDeviceCountsSnapshot(devices, null),
          error: sanitizeErrorForLogging(error),
        },
        { action: 'parse' }
      );
      console.error("Error parsing or importing data:", error);
      const errorMessage = error && error.message ? error.message : String(error);
      const summary = formatDeviceImportErrors([errorMessage]);
      const message = summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError;
      if (typeof window.cineShowAlertDialog === 'function') {
        window.cineShowAlertDialog({
          title: texts[currentLang].alertImportErrorTitle || 'Import Error',
          message: message
        });
      } else {
        alert(message);
      }
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Clear the file input for re-selection of the same file
});
