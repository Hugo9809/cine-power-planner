import { cineStorage } from '../storage.js';
import { cineCoreUiHelpers } from './app-core-ui-helpers.js';
import cineFeaturesConnectionDiagram from '../modules/features/connection-diagram.js';
import cineFeatureBackup from '../modules/features/backup.js';
import { cineLoggingResolver } from '../modules/logging-resolver.js';
import { cineCoreMountVoltage } from './modules/core/mount-voltage.js';
import '../modules/results.js';
import { generatePrintableOverview } from '../overview.js';
// Import globals available from other scripts (via Window usually, but explicitly needed for ESM)
// Note: Some of these might be available on window, but we import them to be explicit and avoid lint/runtime errors if window is not ready.
// However, since app-core-new-2.js exports to window/global, we might not be able to import strictly if it's not an ESM export.
// Wait, I am modifying app-core-new-2.js to add to CORE_PART2_GLOBAL_EXPORTS which ends up on window.
// So in app-session.js I might need to access them via window. or use a shim.
// But valid imports are better.
// Except app-core-new-2.js is NOT exporting via ESM syntax "export ...". It uses IFFE.
// So "import { adjustGearListSelectWidths } from ..." will FAIL if the file is not an ESM module that exports it.

// Correct approach for app-core-new-2.js: It is NOT an ESM module.
// So I cannot import from it using named imports.
// I must access it via `window.adjustGearListSelectWidths` or define it as a const from window.

// But app-core-new-1.js I modified to have "export". So I CAN import from it.
// app-setups.js I modified to have "export". So I CAN import from it.

// So for adjustGearListSelectWidths, I will use window.
// For updateTripodOptions and saveCurrentGearList, I will import.

import { generateGearListHtml } from '../modules/gear-list.js';
import { ensureZoomRemoteSetup, saveCurrentGearList } from './app-setups.js';
import {
  encodeSharedSetup,
  decodeSharedSetup,
  closeSideMenu,
  openSideMenu,
  setupSideMenu,
  setupResponsiveControls,
  updateTripodOptions,
  detectBrand,
  connectionLabel
} from './app-core-new-1.js';

import {
  ensureList,
  normalizeVideoType,
  normalizeFizConnectorType,
  normalizeViewfinderType,
  normalizePowerPortType,
  fixPowerInput
} from '../modules/device-normalization.js';

import { generateConnectorSummary } from './app-setups.js';

import {
  ensureNotificationContainer as importedEnsureNotificationContainer,
  showNotification as importedShowNotification,
  announceForceReloadOfflineNotice as importedAnnounceForceReloadOfflineNotice,
  resolveForceReloadOfflineNotice as importedResolveForceReloadOfflineNotice,
  getNotificationAccentColor as importedGetNotificationAccentColor,
  getNotificationTextColor as importedGetNotificationTextColor
} from '../modules/ui/notifications.js';

import {
  getSessionCloneScope,
  resolveSessionRuntimeFunction as importedResolveSessionRuntimeFunction,
  ensureSessionRuntimePlaceholder,
  whenGlobalValueAvailable,
  getSessionRuntimeScopes,
  resolveModuleApi,
  resolveKnownAppVersion,
  resolveMountVoltageNamespace,
  resolveMountVoltageRuntimeExports,
  getSessionRuntimeFunction,
  ensureDeferredScriptsLoaded,
  ensureOnboardingTourReady,
  resolveCompatibilityTexts,
  ensureMeaningfulValue,
  formatNumberForComparison,
  getManualDownloadFallbackMessage,
  getManualDownloadCopyHint,
  normalizeVersionValue
} from '../modules/core/session-runtime.js';

import {
  isPlainObject,
  applyFontSizeSafe,
  applyFontFamilySafe,
  readGridSnapState,
  writeGridSnapState,
  applyGridSnapUiState
} from '../modules/ui/ui-preferences.js';

import { projectLockService } from '../modules/storage/ProjectLockService.js';
import { createAppearanceManager, initialize as initializeAppearance } from '../modules/settings-and-appearance.js';
import { UrlHandler } from '../modules/core/url-handler.js';
import { EventBinder } from '../modules/core/event-binder.js';

import { ProjectStorageManager } from '../modules/core/project-storage-manager.js';
import { ProjectTransferManager } from '../modules/core/project-transfer-manager.js';
import { LoggingManager } from '../modules/core/logging-manager.js';
import { RestoreCompatibilityManager } from '../modules/core/restore-compatibility-manager.js';
import * as RestoreRehearsalManager from '../modules/features/restore-rehearsal-manager.js';
import * as BackupDiffManager from '../modules/features/backup-diff-manager.js';
import { HelpUiManager } from '../modules/ui/help-ui-manager.js';
import { ScenarioUiManager } from '../modules/ui/scenario-ui-manager.js';
import { SettingsUiManager } from '../modules/ui/settings-ui-manager.js';
import {
  collectFullBackupData,
  buildSettingsBackupPackage,
  createSettingsBackup,
  performSettingsBackup
} from '../modules/features/full-backup-manager.js';

import {
  configureAutosaveManager,
  scheduleProjectAutoSave,
  runProjectAutoSave,
  notifyAutoBackupChange
} from '../modules/core/autosave-manager.js';

import { initializeRestoreRehearsalUI } from '../modules/ui/restore-rehearsal-ui.js';
import { initializeSharedProjectUI } from '../modules/ui/shared-project-ui.js';
import { initializeSessionPersistenceManager } from '../modules/core/session-persistence-manager.js';

import { SessionState } from '../modules/core/session-state.js';
import { reloadActiveProjectFromStorage as reloadActiveProject } from '../modules/core/project-loader.js';
import * as LegacyInterop from '../modules/core/legacy-interop.js';
import { FeatureSearchManager } from '../modules/features/feature-search-manager.js';
import { ProjectImportManager } from '../modules/core/project-import-manager.js';
import { DeviceCapabilityManager } from '../modules/core/device-capability-manager.js';
import { ContactManager } from '../modules/features/contact-manager.js';
import { AutoGearManager } from '../modules/features/auto-gear-manager.js';
import { InitializationManager } from '../modules/core/initialization-manager.js';
import { UiPopulationManager } from '../modules/ui/ui-population-manager.js';

const downloadSharedProject = ProjectTransferManager.downloadSharedProject;

// Fallack for non-ESM globals
const adjustGearListSelectWidths = (typeof window !== 'undefined' ? window.adjustGearListSelectWidths : null) || (() => { });
const cameraFizPort = (typeof window !== 'undefined' ? window.cameraFizPort : null) || '';
const controllerCamPort = (typeof window !== 'undefined' ? window.controllerCamPort : null) || '';
const controllerDistancePort = (typeof window !== 'undefined' ? window.controllerDistancePort : null) || '';

// Shims for dynamic globals
const setBatteryPlates = (typeof window !== 'undefined' ? window.setBatteryPlates : null) || (() => { });
const getBatteryPlates = (typeof window !== 'undefined' ? window.getBatteryPlates : null) || (() => []);
const setRecordingMedia = (typeof window !== 'undefined' ? window.setRecordingMedia : null) || (() => { });
const getRecordingMedia = (typeof window !== 'undefined' ? window.getRecordingMedia : null) || (() => []);
const runFeatureSearch = (typeof window !== 'undefined' ? window.runFeatureSearch : null) || (() => { });
const featureMap = (typeof window !== 'undefined' ? window.featureMap : null) || {};
const actionMap = (typeof window !== 'undefined' ? window.actionMap : null) || {};
const deviceMap = (typeof window !== 'undefined' ? window.deviceMap : null) || {};
const helpMap = (typeof window !== 'undefined' ? window.helpMap : null) || {};
const featureSearchEntries = (typeof window !== 'undefined' ? window.featureSearchEntries : null) || [];
const featureSearchDefaultOptions = (typeof window !== 'undefined' ? window.featureSearchDefaultOptions : null) || [];
const featureSearch = (typeof window !== 'undefined' ? window.featureSearch : null) || null;


// Alias for session usage
const applySessionMountVoltagePreferences = cineCoreMountVoltage.applyMountVoltagePreferences;
if (typeof window !== 'undefined') window.applySessionMountVoltagePreferences = applySessionMountVoltagePreferences;

console.log('app-session.js: Starting execution (ESM)');
if (typeof window !== 'undefined') {
  if (typeof window.batteryPlateSelect === "undefined") window.batteryPlateSelect = document.getElementById("batteryPlateSelect");
}

const {
  saveSessionState,
  loadSessionState,
  getSafeLocalStorage,
  getProjectStorageRevisionKeyName,
  loadProject,
  clearUiCacheStorageEntries,
  loadAutoGearMonitorDefaults,
  loadDocumentationTracker,
  saveContacts: saveContactsToStorage
} = cineStorage;

// Fallback for globals that might not be fully modularized yet or rely on bootstrap
const CORE_SHARED = (typeof window !== 'undefined' && window.cineCoreShared) || (typeof globalThis !== 'undefined' && globalThis.cineCoreShared) || {};
const resolveTemperatureStorageKey = (typeof window !== 'undefined' && window.resolveTemperatureStorageKey) || (() => 'cameraPowerPlanner_temperatureUnit');
const TEMPERATURE_STORAGE_KEY = (typeof window !== 'undefined' && window.TEMPERATURE_STORAGE_KEY) || 'cameraPowerPlanner_temperatureUnit';
const getCurrentProjectStorageKey = (typeof window !== 'undefined' && window.getCurrentProjectStorageKey) || (() => 'cameraPowerPlanner_project');
const getUserProfileSnapshot = (typeof window !== 'undefined' && window.getUserProfileSnapshot) || (() => null);
const formatUserProfileProviderName = (typeof window !== 'undefined' && window.formatUserProfileProviderName) || ((n) => n);
const ensureContactForImportedOwner = (typeof window !== 'undefined' && window.ensureContactForImportedOwner) || (() => { });
const setGearItemProvider = (typeof window !== 'undefined' && window.setGearItemProvider) || (() => { });
const dispatchGearProviderDataChanged = (typeof window !== 'undefined' && window.dispatchGearProviderDataChanged) || (() => { });
const storagePersistenceRequestButton = (typeof window !== 'undefined' && window.storagePersistenceRequestButton) || null;
const enqueueCoreBootTask = (typeof window !== 'undefined' && window.enqueueCoreBootTask) || ((cb) => cb());
const CORE_GLOBAL_SCOPE = (typeof window !== 'undefined' && window.CORE_GLOBAL_SCOPE) || (typeof globalThis !== 'undefined' ? globalThis : {});

// Shared State Variables (Module Scope)

// Shared State Variables (Module Scope)
// Moved to SessionState.js

// Restoring missing global declarations to prevent ReferenceErrors
let currentProjectInfo = null;
let showAutoBackups = true;
const projectForm = typeof document !== 'undefined' ? document.getElementById('projectForm') : null;
const gearListOutput = typeof document !== 'undefined' ? document.getElementById('gearListOutput') : null;
const projectRequirementsOutput = typeof document !== 'undefined' ? document.getElementById('projectRequirementsOutput') : null;
// downloadDiagramButton is defined via ensureSessionRuntimePlaceholder later in this file
const helpDialog = typeof document !== 'undefined' ? document.getElementById('helpDialog') : null;
const helpSearch = typeof document !== 'undefined' ? document.getElementById('helpSearch') : null;
const helpSearchClear = typeof document !== 'undefined' ? document.getElementById('helpSearchClear') : null;

// Systemic Fix: Declaring all commonly accessed UI elements to prevent ReferenceErrors
const cameraSelect = typeof document !== 'undefined' ? document.getElementById('cameraSelect') : null;
const monitorSelect = typeof document !== 'undefined' ? document.getElementById('monitorSelect') : null;
const batteryPlateSelect = typeof document !== 'undefined' ? document.getElementById('batteryPlateSelect') : null;
const batteryHotswapSelect = typeof document !== 'undefined' ? document.getElementById('batteryHotswapSelect') : null;
const setupSelect = typeof document !== 'undefined' ? document.getElementById('setupSelect') : null;
const setupNameInput = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
const offlineIndicator = typeof document !== 'undefined' ? document.getElementById('offlineIndicator') : null;
const settingsDialog = typeof document !== 'undefined' ? document.getElementById('settingsDialog') : null;
const featureSearchInput = typeof document !== 'undefined' ? document.getElementById('featureSearchInput') : null;
const settingsDarkMode = typeof document !== 'undefined' ? document.getElementById('settingsDarkMode') : null;
const settingsPinkMode = typeof document !== 'undefined' ? document.getElementById('settingsPinkMode') : null;
const gridSnapToggle = typeof document !== 'undefined' ? document.getElementById('gridSnapToggle') : null;
const diagramArea = typeof document !== 'undefined' ? document.getElementById('diagramArea') : null;
const autoGearShowBackups = typeof document !== 'undefined' ? document.getElementById('autoGearShowBackups') : null;
const autoGearScenarioMode = typeof document !== 'undefined' ? document.getElementById('autoGearScenarioMode') : null;
const videoDistributionSelect = typeof document !== 'undefined' ? document.getElementById('videoDistributionSelect') : null;

// Systemic Fix: Declaring missing global functions to prevent ReferenceErrors
// These functions are expected to be loaded by other scripts, but we provide safe fallbacks here.
const checkSetupChanged = (typeof window !== 'undefined' && typeof window.checkSetupChanged === 'function') ? window.checkSetupChanged : (() => { console.warn('checkSetupChanged not available'); });
const updateCalculations = (typeof window !== 'undefined' && typeof window.updateCalculations === 'function') ? window.updateCalculations : (() => { console.warn('updateCalculations not available'); });
// populateLensDropdown is defined as a function later in this file
const refreshTotalCurrentLabels = (typeof window !== 'undefined' && typeof window.refreshTotalCurrentLabels === 'function') ? window.refreshTotalCurrentLabels : (() => { });
const updateSetupUI = (typeof window !== 'undefined' && typeof window.updateSetupUI === 'function') ? window.updateSetupUI : (() => { });

// Safe wrapper functions for event handlers that may not be defined yet

// Legacy interop wrappers are now imported from modules/core/legacy-interop.js
// We alias them locally if needed to match the old naming convention in this file if we don't want to refactor all callsites immediately.
// But ideally we should just use LegacyInterop.safeX
const _safeUpdateCalculations = LegacyInterop.safeUpdateCalculations;
const _safeCheckSetupChanged = LegacyInterop.safeCheckSetupChanged;
const _safeSaveCurrentSession = LegacyInterop.safeSaveCurrentSession;
const _safeSaveCurrentGearList = LegacyInterop.safeSaveCurrentGearList;
const _safeAutoSaveCurrentSetup = LegacyInterop.safeAutoSaveCurrentSetup;
const _safeUpdateBatteryPlateVisibility = LegacyInterop.safeUpdateBatteryPlateVisibility;
const _safeUpdateBatteryOptions = LegacyInterop.safeUpdateBatteryOptions;

const _safeUpdateMonitoringConfigurationOptions = LegacyInterop.safeUpdateMonitoringConfigurationOptions;
const _safeUpdateViewfinderSettingsVisibility = LegacyInterop.safeUpdateViewfinderSettingsVisibility;
const _safePopulateRecordingResolutionDropdown = LegacyInterop.safePopulateRecordingResolutionDropdown;
const _safePopulateSensorModeDropdown = LegacyInterop.safePopulateSensorModeDropdown;
const _safePopulateSlowMotionRecordingResolutionDropdown = LegacyInterop.safePopulateSlowMotionRecordingResolutionDropdown;
const _safePopulateSlowMotionSensorModeDropdown = LegacyInterop.safePopulateSlowMotionSensorModeDropdown;
const _safePopulateFrameRateDropdown = LegacyInterop.safePopulateFrameRateDropdown;
const _safePopulateSlowMotionFrameRateDropdown = LegacyInterop.safePopulateSlowMotionFrameRateDropdown;

const _safeHandleMountVoltageInputChange = LegacyInterop.safeHandleMountVoltageInputChange;

// AutoGear bindings delegated to AutoGearManager
const _safeNormalizeAutoGearScenarioPrimary = (v) => AutoGearManager.normalizeScenarioPrimary(v);
const _safeNormalizeAutoGearScenarioMultiplier = (v) => AutoGearManager.normalizeScenarioMultiplier(v);
const _safeRemoveAutoGearCondition = (id) => AutoGearManager.removeCondition(id);
const _safeHandleAutoGearConditionShortcut = (e) => AutoGearManager.handleConditionShortcut(e);

const _safeHandleAutoGearImportSelection = (s) => AutoGearManager.handleImportSelection(s);
const _safeSetAutoGearSearchQuery = (q) => AutoGearManager.setSearchQuery(q);
const _safeSetAutoGearScenarioFilter = (f) => AutoGearManager.setScenarioFilter(f);
const _safeClearAutoGearFilters = () => AutoGearManager.clearFilters();
const _safeSetAutoGearSummaryFocus = (f) => AutoGearManager.setSummaryFocus(f);

const _safeHandleAutoGearPresetSelection = (id) => AutoGearManager.handlePresetSelection(id);
const _safeHandleAutoGearSavePreset = () => AutoGearManager.handleSavePreset();
const _safeHandleAutoGearDeletePreset = () => AutoGearManager.handleDeletePreset();
const _safeAddAutoGearDraftItem = (i) => AutoGearManager.addDraftItem(i);
const _safeSaveAutoGearRuleFromEditor = () => AutoGearManager.saveRuleFromEditor();
const _safeCloseAutoGearEditor = () => AutoGearManager.closeEditor();
const _safeRenderAutoGearDraftLists = () => AutoGearManager.renderDraftLists();
const _safeDuplicateAutoGearRule = (id) => AutoGearManager.duplicateRule(id);
const _safeInvokeSessionOpenAutoGearEditor = (...args) => AutoGearManager.invokeOpenEditor(...args);

const _safeUpdateAutoGearBackupRestoreButtonState = () => AutoGearManager.updateBackupRestoreButtonState();
const _safeHandleAutoGearShowBackupsToggle = () => AutoGearManager.handleShowBackupsToggle();
const _safeRestoreAutoGearBackup = (id) => AutoGearManager.restoreBackup(id);
const _safeSyncAutoGearMonitorFieldVisibility = () => AutoGearManager.syncMonitorFieldVisibility();
const _safeUpdateAutoGearMonitorCatalogOptions = () => AutoGearManager.updateMonitorCatalogOptions();
const _safeClearAutoGearDraftItemEdit = () => AutoGearManager.clearDraftItemEdit();
const _safeUpdateAutoGearCatalogOptions = () => AutoGearManager.updateCatalogOptions();
const _safeBeginAutoGearDraftItemEdit = (id) => AutoGearManager.beginDraftItemEdit(id);

/* global shareSetupBtn, updateCageSelectOptions, updateAccentColorResetButtonState,
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
          __cineGlobal, humanizeKey,
          normalizeBatteryPlateValue, applyBatteryPlateSelectionFromBattery,
          updateStorageRequirementTypeOptions,
          getPowerSelectionSnapshot, applyStoredPowerSelection,
          populateSetupSelect,
          displayGearAndRequirements, applyGearListSelectors,
          ensureGearListActions, bindGearListCageListener,
          bindGearListEasyrigListener, bindGearListSliderBowlListener,
          bindGearListEyeLeatherListener, bindGearListProGaffTapeListener,
          bindGearListDirectorMonitorListener, updateGearListButtonVisibility,
          useProjectAutoGearRules, clearProjectAutoGearRules,
          getCurrentSetupState, storeLoadedSetupStateSafe,
          normalizeDiagramPositionsInput,
          settingsReduceMotion, settingsRelaxedSpacing, callCoreFunctionIfAvailable,
          suspendProjectPersistence, resumeProjectPersistence,
          isProjectPersistenceSuspended,
          recordFeatureSearchUsage, extractFeatureSearchFilter,
          helpResultsSummary, helpResultsAssist, helpNoResultsSuggestions,
          markProjectFormDataDirty,
          enhanceGearItemElement,
          settingsFocusScale, focusScalePreference: true, normalizeFocusScale,
          applyFocusScalePreference: true, applyTemperatureUnitPreference: true,
          updateLensWorkflowCatalog, FOCUS_SCALE_STORAGE_KEY_NAME,
          contactsCache: true, sortContacts, renderContactsList,
          updateContactPickers, normalizeContactEntry, sanitizeContactValue */
// Keep a baseline set of match types so that the session search feature
// continues to work even when globals have not been initialised yet (for
// example during unit tests or offline restore flows).
const FALLBACK_STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
if (typeof globalThis !== 'undefined' && typeof globalThis.STRONG_SEARCH_MATCH_TYPES === 'undefined') {
  globalThis.STRONG_SEARCH_MATCH_TYPES = FALLBACK_STRONG_SEARCH_MATCH_TYPES;
}

const FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK =
  'Force reload requires an internet connection. Try again once you are back online.';

// Reference to the Pink Mode UI toggle. See docs/user/pink-mode-reference.md for feature details.
var pinkModeToggle =
  typeof pinkModeToggle !== 'undefined'
    ? pinkModeToggle
    : (typeof document !== 'undefined' && typeof document.getElementById === 'function')
      ? document.getElementById('pinkModeToggle')
      : null;

var darkModeToggle =
  typeof darkModeToggle !== 'undefined'
    ? darkModeToggle
    : (typeof document !== 'undefined' && typeof document.getElementById === 'function')
      ? document.getElementById('darkModeToggle')
      : null;

var hotswapSelect =
  typeof hotswapSelect !== 'undefined'
    ? hotswapSelect
    : (typeof document !== 'undefined' && typeof document.getElementById === 'function')
      ? document.getElementById('batteryHotswapSelect')
      : null;

if (typeof globalThis !== 'undefined' && hotswapSelect && typeof globalThis.hotswapSelect === 'undefined') {
  globalThis.hotswapSelect = hotswapSelect;
}

// --- SESSION STATE & EVENT BUS CONFIGURATION ---








/**
 * Session Scope Access
 * 
 * Logic extracted to session-runtime.js
 */

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
  return importedResolveForceReloadOfflineNotice();
}

function announceForceReloadOfflineNotice() {
  return importedAnnounceForceReloadOfflineNotice();
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

// --- PROJECT LOCK MANAGER ---
// Implements exclusive access to projects using Web Locks API
// compatibility adapter for ProjectLockService matching legacy webLockManager API
const projectLockAdapter = {
  requestLock: async (projectName) => {
    // Legacy behavior: Release any existing locks first (singleton behavior)
    if (projectLockService.localLocks && projectLockService.localLocks.size > 0) {
      const pids = Array.from(projectLockService.localLocks.keys());
      await Promise.all(pids.map(p => projectLockService.releaseLock(p)));
    }

    // Attempt acquire
    if (!projectName) return true; // match web-lock-manager safe guard

    const result = await projectLockService.acquireLock(projectName);
    return result.success;
  },
  releaseLock: async (projectName) => {
    // Legacy behavior: if no project name, release all (assumes returning to dashboard)
    if (!projectName) {
      if (projectLockService.localLocks) {
        const pids = Array.from(projectLockService.localLocks.keys());
        await Promise.all(pids.map(p => projectLockService.releaseLock(p)));
      }
    } else {
      await projectLockService.releaseLock(projectName);
    }
  },
  isLocked: (projectName) => {
    const info = projectLockService.getLockInfo(projectName);
    return info.status === 'locked_by_self';
  }
};

(function (scope) {
  if (scope.cineProjectLockManager) return;
  scope.cineProjectLockManager = projectLockAdapter;
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : {}));

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

const PROJECT_STORAGE_REV_KEY_FALLBACK = ProjectStorageManager.getRevisionKey();



function resolveProjectStorageRevisionKeyName() {
  return ProjectStorageManager.getRevisionKey();
}

function readProjectStorageRevisionValue() {
  return ProjectStorageManager.readRevision();
}

function resolveActiveProjectStorageKey() {
  return ProjectStorageManager.resolveActiveProjectStorageKey(setupSelect);
}

/**
 * DEEP DIVE: Project Reload & Hydration
 *
 * This function handles the critical task of reloading the "Active Project" from disk
 * into the running application state (DOM + Memory).
 *
 * Key behaviors:
 * 1. Checks constraints: Won't reload if a 'Factory Reset' is in progress or persistence is suspended.
 * 2. Identity Check: Resolves WHICH project key is active (from URL, Dropdown, or fallback).
 * 3. Data Load: Fetches the raw JSON model.
 * 4. OPTIMIZATION: Computes a `stableStringify` hash of the current state vs. the disk state.
 *    - If they match, it skips the reload entirely to prevent DOM thrashing and focus loss.
 * 5. Hydration: If they differ, it strictly re-applies all sub-systems (Batteries, Diagram, Gear List).
 */
function reloadActiveProjectFromStorage(options = {}) {
  // Delegate to the new ProjectLoader module
  // Pass the SessionState to ensure flags are respected if the loader checks them internally
  // (Note: The loader imports SessionState directly, so we just call it)
  return reloadActiveProject(options);
}


function scheduleProjectStorageSync(options = {}) {
  ProjectStorageManager.scheduleSync(reloadActiveProjectFromStorage, options);
}

ProjectStorageManager.initAutoSync(
  reloadActiveProjectFromStorage,
  () => SessionState.isProjectAutoSaving
);

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
    return setLanguageFn(languageCode, options);
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
  typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone === 'function'
    ? CORE_GLOBAL_SCOPE.__cineDeepClone
    : sessionCreateResilientDeepClone(getSessionCloneScope());

// Cache the resolved deep clone helper globally so other modules (and legacy
// entry points) can reuse the exact same logic without duplicating work.
if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
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



function resolveMissingMountVoltageWarnings() {
  if (SessionState.missingMountVoltageWarnings instanceof Set) {
    return SessionState.missingMountVoltageWarnings;
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
        SessionState.missingMountVoltageWarnings = existing;
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

  SessionState.missingMountVoltageWarnings = created;
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
// ensureSessionRuntimePlaceholder delegated to session-runtime.js

// whenGlobalValueAvailable delegated to session-runtime.js

// resolveModuleApi delegated to session-runtime.js

// resolveKnownAppVersion delegated to session-runtime.js

const ACTIVE_APP_VERSION = resolveKnownAppVersion(
  typeof APP_VERSION === 'string' ? APP_VERSION : null,
);

// resolution logic delegated to session-runtime.js




function logSettingsEvent(level, message, detail, meta) {
  SettingsUiManager.logEvent(level, message, detail, meta);
}

function prepareSettingsOpenContext(context) {
  SettingsUiManager.prepareOpenContext(context);
}

function consumeSettingsOpenContext(defaultContext) {
  return SettingsUiManager.consumeOpenContext(defaultContext);
}

function resolveSettingsDialog() {
  return SettingsUiManager.resolveDialog();
}

function resolveSettingsButton() {
  return SettingsUiManager.resolveButton();
}

function requestSettingsOpen(context) {
  return SettingsUiManager.requestOpen(context);
}
}

// Compatibility texts and formatNumberForComparison delegated to session-runtime.js




const buildRestoreVersionCompatibilityMessage = RestoreCompatibilityManager.buildRestoreVersionCompatibilityMessage;
const verifyRestoredBackupIntegrity = RestoreCompatibilityManager.verifyRestoredBackupIntegrity;

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

// isPlainObject and font helpers delegated to ui-preferences.js

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

// Grid snap helpers delegated to ui-preferences.js
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

// restoringSession migrated to SessionState
if (typeof window !== 'undefined') {
  try {
    Object.defineProperty(window, 'restoringSession', {
      get: () => SessionState.restoringSession,
      set: (val) => { SessionState.restoringSession = val; },
      configurable: true
    });
  } catch (e) {
    // Fallback if property is already defined non-configurable
    console.warn('Could not define restoringSession proxy', e);
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

let backupDiffToggleButtonEl;
let backupDiffSectionEl;
let backupDiffPrimarySelectEl;
let backupDiffSecondarySelectEl;
let backupDiffEmptyStateEl;
let backupDiffSummaryEl;
let backupDiffListEl;
let backupDiffListContainerEl;
let backupDiffNotesEl;
let backupDiffExportButtonEl;
let backupDiffCloseButtonEl;

({
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
} = createBackupDiffRefs());

/* Restore Rehearsal UI Delegation */
const {
  handleRestoreRehearsalProceed,
  handleRestoreRehearsalAbort
} = initializeRestoreRehearsalUI();

/* Shared Project UI Delegation */
const {
  applySharedSetup,
  applySharedSetupFromUrl
} = initializeSharedProjectUI();

/* Session Persistence Delegation */
const {
  saveCurrentSession,
  autoSaveCurrentSetup,
  restoreSessionState
} = initializeSessionPersistenceManager();


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
if (typeof window !== 'undefined') window.getTrackedPowerSelects = getTrackedPowerSelects;

function getTrackedPowerSelectsWithSetup() {
  const selects = getTrackedPowerSelects();
  const maybeSetup = typeof setupSelect === 'undefined' ? null : setupSelect;
  if (maybeSetup) {
    selects.push(maybeSetup);
  }
  return selects;
}
if (typeof window !== 'undefined') window.getTrackedPowerSelectsWithSetup = getTrackedPowerSelectsWithSetup;

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
const bindPowerSessionEvents = () => {
  // Helper to get element robustly
  const getEl = (output, id) => output || document.getElementById(id);

  const cameraSelectEl = getEl(typeof cameraSelect !== 'undefined' ? cameraSelect : null, 'cameraSelect');
  const sensorModeDropdownEl = getEl(typeof sensorModeDropdown !== 'undefined' ? sensorModeDropdown : null, 'sensorModeDropdown');
  const recordingResolutionDropdownEl = getEl(typeof recordingResolutionDropdown !== 'undefined' ? recordingResolutionDropdown : null, 'recordingResolutionDropdown');
  const slowMotionSensorModeDropdownEl = getEl(typeof slowMotionSensorModeDropdown !== 'undefined' ? slowMotionSensorModeDropdown : null, 'slowMotionSensorModeDropdown');
  const slowMotionRecordingResolutionDropdownEl = getEl(typeof slowMotionRecordingResolutionDropdown !== 'undefined' ? slowMotionRecordingResolutionDropdown : null, 'slowMotionRecordingResolutionDropdown');
  const slowMotionAspectRatioSelectEl = getEl(typeof slowMotionAspectRatioSelect !== 'undefined' ? slowMotionAspectRatioSelect : null, 'slowMotionAspectRatioSelect');
  const monitoringConfigurationSelectEl = getEl(typeof monitoringConfigurationSelect !== 'undefined' ? monitoringConfigurationSelect : null, 'monitoringConfigurationSelect');
  const monitorSelectEl = getEl(typeof monitorSelect !== 'undefined' ? monitorSelect : null, 'monitorSelect');
  const batteryPlateSelectEl = getEl(typeof batteryPlateSelect !== 'undefined' ? batteryPlateSelect : null, 'batteryPlateSelect');
  const batterySelectEl = getEl(typeof batterySelect !== 'undefined' ? batterySelect : null, 'batterySelect');

  // Check if critical elements are missing
  if (!cameraSelectEl && document.readyState === 'loading') {
    return false; // Retry later
  }

  forEachTrackedSelect(getTrackedPowerSelects(), (sel) => {
    sel.removeEventListener('change', _safeUpdateCalculations);
    sel.addEventListener('change', _safeUpdateCalculations);
  });

  if (cameraSelectEl) {
    // To prevent double binding of inline functions, checks are needed.
    if (!cameraSelectEl.dataset.sessionBound) {
      cameraSelectEl.dataset.sessionBound = 'true';
      cameraSelectEl.addEventListener('change', () => {
        _safeUpdateBatteryPlateVisibility();
        _safeUpdateBatteryOptions();
        if (typeof updateCageSelectOptions === 'function') {
          updateCageSelectOptions();
        }
        const desiredFrameRate = currentProjectInfo && currentProjectInfo.recordingFrameRate;
        const desiredSlowMotionFrameRate = currentProjectInfo && currentProjectInfo.slowMotionRecordingFrameRate;
        _safePopulateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
        _safePopulateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
        _safePopulateSlowMotionRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.slowMotionRecordingResolution);
        _safePopulateSlowMotionSensorModeDropdown(currentProjectInfo && currentProjectInfo.slowMotionSensorMode);
        _safePopulateFrameRateDropdown(desiredFrameRate);
        _safePopulateSlowMotionFrameRateDropdown(desiredSlowMotionFrameRate);
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
  }

  if (sensorModeDropdownEl && !sensorModeDropdownEl.dataset.sessionBound) {
    sensorModeDropdownEl.dataset.sessionBound = 'true';
    sensorModeDropdownEl.addEventListener('change', () => {
      _safePopulateFrameRateDropdown(getCurrentFrameRateInputValue());
    });
  }

  if (recordingResolutionDropdownEl && !recordingResolutionDropdownEl.dataset.sessionBound) {
    recordingResolutionDropdownEl.dataset.sessionBound = 'true';
    recordingResolutionDropdownEl.addEventListener('change', () => {
      _safePopulateFrameRateDropdown(getCurrentFrameRateInputValue());
    });
  }

  if (slowMotionSensorModeDropdownEl && !slowMotionSensorModeDropdownEl.dataset.sessionBound) {
    slowMotionSensorModeDropdownEl.dataset.sessionBound = 'true';
    slowMotionSensorModeDropdownEl.addEventListener('change', () => {
      _safePopulateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    });
  }

  if (slowMotionRecordingResolutionDropdownEl && !slowMotionRecordingResolutionDropdownEl.dataset.sessionBound) {
    slowMotionRecordingResolutionDropdownEl.dataset.sessionBound = 'true';
    slowMotionRecordingResolutionDropdownEl.addEventListener('change', () => {
      _safePopulateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    });
  }

  if (slowMotionAspectRatioSelectEl && !slowMotionAspectRatioSelectEl.dataset.sessionBound) {
    slowMotionAspectRatioSelectEl.dataset.sessionBound = 'true';
    slowMotionAspectRatioSelectEl.addEventListener('change', () => {
      _safePopulateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    });
  }

  if (monitoringConfigurationSelectEl && !monitoringConfigurationSelectEl.dataset.sessionBound) {
    monitoringConfigurationSelectEl.dataset.sessionBound = 'true';
    monitoringConfigurationSelectEl.addEventListener('change', () => {
      monitoringConfigurationUserChanged = true;
      _safeUpdateViewfinderSettingsVisibility();
    });
  }

  if (monitorSelectEl && !monitorSelectEl.dataset.sessionBound) {
    monitorSelectEl.dataset.sessionBound = 'true';
    monitorSelectEl.addEventListener('change', _safeUpdateMonitoringConfigurationOptions);
  }

  if (batteryPlateSelectEl) batteryPlateSelectEl.addEventListener('change', _safeUpdateBatteryOptions);
  if (typeof batterySelect !== 'undefined' && batterySelect) batterySelect.addEventListener('change', _safeUpdateBatteryOptions);
  if (typeof hotswapSelect !== 'undefined' && hotswapSelect) hotswapSelect.addEventListener('change', _safeUpdateCalculations);

  return true;
};

if (!bindPowerSessionEvents()) {
  document.addEventListener('DOMContentLoaded', bindPowerSessionEvents);
}

// --- EVENT BINDING (MIGRATED TO EventBinder) ---

const eventBinderContext = {
  callbacks: {
    onSaveSession: (options) => saveCurrentSession(options),

    // Note: EventBinder might pass the event object as argument to these handlers, 
    // but the `_safe*` wrappers ignore extra arguments or handle them gracefully.
    onSaveGearList: _safeSaveCurrentGearList,
    onCheckSetupChanged: _safeCheckSetupChanged,
    onAutoSave: _safeAutoSaveCurrentSetup,

    onExit: flushProjectAutoSaveOnExit
  },
  elements: {
    setupNameInput: setupNameInput
  }
};

EventBinder.bindGlobalEvents(eventBinderContext);

// Common Select Listeners
// We collect all tracked selects and bind generic change handlers via EventBinder helper
const allTrackedSelects = [
  ...getTrackedPowerSelects(),
  ...(typeof motorSelects !== 'undefined' ? motorSelects : []),
  ...(typeof controllerSelects !== 'undefined' ? controllerSelects : [])
];

// 1. Change -> Save Gear List
EventBinder.bindChangeListeners(allTrackedSelects, _safeSaveCurrentGearList);

// 2. Change -> Check Setup Changed
EventBinder.bindChangeListeners(allTrackedSelects, _safeCheckSetupChanged);
if (typeof setupNameInput !== 'undefined' && setupNameInput) {
  setupNameInput.addEventListener('input', _safeCheckSetupChanged);
}

// 3. Change -> Auto Save
EventBinder.bindChangeListeners(allTrackedSelects, _safeAutoSaveCurrentSetup);
if (typeof setupNameInput !== 'undefined' && setupNameInput) {
  setupNameInput.addEventListener('change', _safeAutoSaveCurrentSetup);
}


function flushProjectAutoSaveOnExit(eventOrOptions) {
  if (SessionState.factoryResetInProgress) return;

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

function getSessionMountVoltagePreferencesClone() {
  if (typeof mountVoltagePreferences !== 'object' || !mountVoltagePreferences) {
    return {
      'Arri Alexa 35': '24V',
      'Arri Alexa Mini LF': '12V',
      'Arri Alexa Mini': '12V',
      'Arri Amira': '12V',
      'Sony Venice 2': '24V',
      'Sony Venice': '24V',
      'Red V-Raptor XL': '24V',
      'Red V-Raptor': '12V',
      'Red Komodo-X': '12V',
      'Red Komodo': '12V',
    };
  }
  try {
    return JSON.parse(JSON.stringify(mountVoltagePreferences));
  } catch (error) {
    console.warn('cineSession: Failed to clone mount voltage preferences', error);
    return {};
  }
}

function cloneMountVoltageDefaultsForSession() {
  if (cineCoreMountVoltage && typeof cineCoreMountVoltage.cloneMountVoltageMap === 'function') {
    return cineCoreMountVoltage.cloneMountVoltageMap();
  }
  return {};
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
let pinkModePreferenceController = null;
const pendingThemeControls = [];
const pendingPinkModeControls = [];

const processPendingControls = (controller, queue) => {
  if (!controller || typeof controller.registerControl !== 'function' || !Array.isArray(queue)) {
    return;
  }
  while (queue.length > 0) {
    const item = queue.shift();
    if (item && item.element) {
      try {
        const unregister = controller.registerControl(item.element, item.options);
        if (typeof item.callback === 'function') {
          item.callback(unregister);
        }
      } catch (e) {
        console.warn('Failed to process pending control registration', e);
      }
    }
  }
};
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
    themeVariantSelect: typeof themeVariantSelect !== 'undefined' ? themeVariantSelect : null,
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
    get ensureSvgHasAriaHidden() {
      if (typeof ensureSvgHasAriaHidden === 'function') return ensureSvgHasAriaHidden;
      if (typeof window !== 'undefined' && typeof window.ensureSvgHasAriaHidden === 'function') return window.ensureSvgHasAriaHidden;
      return null;
    },
    get ensurePinkModeLottieRuntime() {
      const scope = typeof window !== 'undefined' ? window : {};
      const support = scope.cineCorePinkModeSupport || (scope.PINK_MODE_SUPPORT_API) || {};

      return (typeof ensurePinkModeLottieRuntime === 'function' ? ensurePinkModeLottieRuntime : null) ||
        (typeof scope.ensurePinkModeLottieRuntime === 'function' ? scope.ensurePinkModeLottieRuntime : null) ||
        (typeof support.ensurePinkModeLottieRuntime === 'function' ? support.ensurePinkModeLottieRuntime : null) ||
        (typeof support.resolvePinkModeLottieRuntime === 'function' ? support.resolvePinkModeLottieRuntime : null) ||
        null;
    },
    get pinkModeIcons() {
      if (typeof pinkModeIcons === 'object' && pinkModeIcons) return pinkModeIcons;
      if (typeof window !== 'undefined' && window.pinkModeIcons) return window.pinkModeIcons;
      if (typeof globalThis !== 'undefined' && globalThis.pinkModeIcons) return globalThis.pinkModeIcons;
      return null;
    },
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

function buildPinkModePreferenceController(module) {
  if (!module || typeof module.createPinkModePreferenceController !== 'function') {
    return null;
  }

  try {
    return module.createPinkModePreferenceController({});
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('cineSettingsAppearance: failed to create pink mode preference controller.', error);
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
    processPendingControls(themePreferenceController, pendingThemeControls);
  }

  const pinkController = buildPinkModePreferenceController(module);
  if (pinkController) {
    pinkModePreferenceController = pinkController;
    processPendingControls(pinkModePreferenceController, pendingPinkModeControls);
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
  if (typeof document !== 'undefined') {
    if (!appearanceContext.elements.darkModeToggle) {
      appearanceContext.elements.darkModeToggle = darkModeToggle || document.getElementById('darkModeToggle');
    }
    if (!appearanceContext.elements.pinkModeToggle) {
      appearanceContext.elements.pinkModeToggle = pinkModeToggle || document.getElementById('pinkModeToggle');
    }
    if (!appearanceContext.elements.themeVariantSelect) {
      appearanceContext.elements.themeVariantSelect = document.getElementById('themeVariantSelect');
    }
    if (!appearanceContext.settings.darkMode) {
      appearanceContext.settings.darkMode = (typeof settingsDarkMode !== 'undefined' ? settingsDarkMode : null) || document.getElementById('settingsDarkMode');
    }
    if (!appearanceContext.settings.pinkMode) {
      appearanceContext.settings.pinkMode = (typeof settingsPinkMode !== 'undefined' ? settingsPinkMode : null) || document.getElementById('settingsPinkMode');
    }
  }

  const initialized = initializeAppearanceModule(moduleCandidate);
  if (initialized) {
    appearanceModuleInitialized = true;
    clearAppearanceModuleUnavailableWarning();
  }
  return initialized;
}

// ESM Direct Initialization (replaces legacy dynamic module loading)
let appearanceModuleReady = false;
try {
  const appearanceManager = initializeAppearance(appearanceContext);
  if (appearanceManager && typeof appearanceManager === 'object') {
    appearanceModule = appearanceManager;
    appearanceModuleInitialized = true;
    appearanceModuleReady = true;

    // Bind functions from the ESM manager
    updateThemeColor = appearanceManager.updateThemeColor || updateThemeColor;
    setToggleIcon = appearanceManager.setToggleIcon || setToggleIcon;
    applyDarkMode = appearanceManager.applyDarkMode || applyDarkMode;
    applyHighContrast = appearanceManager.applyHighContrast || applyHighContrast;
    applyReduceMotion = appearanceManager.applyReduceMotion || applyReduceMotion;
    applyRelaxedSpacing = appearanceManager.applyRelaxedSpacing || applyRelaxedSpacing;
    applyPinkMode = appearanceManager.applyPinkMode || applyPinkMode;
    persistPinkModePreference = appearanceManager.persistPinkModePreference || persistPinkModePreference;
    applyShowAutoBackupsPreference = appearanceManager.applyShowAutoBackupsPreference || applyShowAutoBackupsPreference;
    isPinkModeActive = appearanceManager.isPinkModeActive || isPinkModeActive;

    // Build preference controllers
    if (typeof appearanceManager.createThemePreferenceController === 'function') {
      const controller = appearanceManager.createThemePreferenceController({
        detectSystemPreference: detectSystemThemePreference,
      });
      if (controller) {
        themePreferenceController = controller;
        processPendingControls(themePreferenceController, pendingThemeControls);
      }
    }

    if (typeof appearanceManager.createPinkModePreferenceController === 'function') {
      const pinkController = appearanceManager.createPinkModePreferenceController({});
      if (pinkController) {
        pinkModePreferenceController = pinkController;
        processPendingControls(pinkModePreferenceController, pendingPinkModeControls);
      }
    }

    clearAppearanceModuleUnavailableWarning();
  }
} catch (initError) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('cineSettingsAppearance ESM initialization failed, falling back to dynamic loading.', initError);
  }
}

// Legacy fallback: only used if ESM init failed
const resolvedAppearanceModuleFactory = !appearanceModuleReady
  ? (appearanceModuleValidator(appearanceModuleFactoryPlaceholder)
    ? appearanceModuleFactoryPlaceholder
    : resolveModuleApi('cineSettingsAppearance', appearanceModuleValidator))
  : null;

if (!appearanceModuleReady && resolvedAppearanceModuleFactory) {
  appearanceModuleReady = attemptAppearanceModuleInitialization(resolvedAppearanceModuleFactory);
}

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

const setPinkModePreference = (value, options = {}) => {
  const normalized = !!value;
  if (pinkModePreferenceController && typeof pinkModePreferenceController.setValue === 'function') {
    pinkModePreferenceController.setValue(normalized, options);
    return;
  }

  applyPinkMode(normalized);
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
    console.warn('Could not resolve SafeLocalStorage while persisting pink mode preference', error);
  }
  try {
    if (typeof localStorage !== 'undefined') {
      persistTargets.push({ name: 'localStorage', storage: localStorage });
    }
  } catch (error) {
    console.warn('Could not access localStorage while persisting pink mode preference', error);
  }

  persistTargets.forEach(entry => {
    if (!entry || !entry.storage || typeof entry.storage.setItem !== 'function') {
      return;
    }
    try {
      entry.storage.setItem(PINK_MODE_STORAGE_KEY, serialized);
      entry.storage.setItem(LEGACY_PINK_MODE_STORAGE_KEY, serialized);
    } catch (persistError) {
      console.warn(`Could not persist pink mode preference to ${entry.name}`, persistError);
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

const getPinkModePreference = () => {
  if (pinkModePreferenceController && typeof pinkModePreferenceController.getValue === 'function') {
    return !!pinkModePreferenceController.getValue();
  }
  return isPinkModeActive();
};

let unregisterHeaderThemeControl = () => { };
let unregisterSettingsThemeControl = () => { };

const registerThemeControl = (element, config) => {
  if (themePreferenceController && typeof themePreferenceController.registerControl === 'function') {
    return themePreferenceController.registerControl(element, config);
  }
  let unregister = () => { };
  pendingThemeControls.push({
    element,
    config,
    callback: (fn) => { unregister = fn; }
  });
  return () => unregister();
};

const registerPinkModeControl = (element, config) => {
  if (pinkModePreferenceController && typeof pinkModePreferenceController.registerControl === 'function') {
    return pinkModePreferenceController.registerControl(element, config);
  }
  let unregister = () => { };
  pendingPinkModeControls.push({
    element,
    options: config,
    callback: (fn) => { unregister = fn; }
  });
  return () => unregister();
};

const resolveThemeVariant = (darkEnabled, pinkEnabled) => {
  if (pinkEnabled) {
    return darkEnabled ? 'pink-dark' : 'pink-light';
  }
  return darkEnabled ? 'dark' : 'light';
};

const applyThemeVariantSelection = (variant) => {
  const normalized = typeof variant === 'string' ? variant : 'light';
  switch (normalized) {
    case 'dark':
      setThemePreference(true, { source: 'theme-variant' });
      setPinkModePreference(false, { source: 'theme-variant' });
      return;
    case 'pink-light':
      setThemePreference(false, { source: 'theme-variant' });
      setPinkModePreference(true, { source: 'theme-variant' });
      return;
    case 'pink-dark':
      setThemePreference(true, { source: 'theme-variant' });
      setPinkModePreference(true, { source: 'theme-variant' });
      return;
    case 'light':
    default:
      setThemePreference(false, { source: 'theme-variant' });
      setPinkModePreference(false, { source: 'theme-variant' });
  }
};

if (darkModeToggle || (typeof document !== 'undefined' && document.getElementById('darkModeToggle'))) {
  unregisterHeaderThemeControl = registerThemeControl(darkModeToggle || document.getElementById('darkModeToggle'), { type: 'button' });
}
if (typeof settingsDarkMode !== 'undefined' || (typeof document !== 'undefined' && document.getElementById('settingsDarkMode'))) {
  const settingsToggle = (typeof settingsDarkMode !== 'undefined' ? settingsDarkMode : null) || document.getElementById('settingsDarkMode');
  if (settingsToggle) {
    unregisterSettingsThemeControl = registerThemeControl(settingsToggle, { type: 'checkbox' });
  }
}

if (typeof document !== 'undefined') {
  const themeVariantSelect = document.getElementById('themeVariantSelect');
  if (themeVariantSelect) {
    const initialVariant = resolveThemeVariant(getThemePreference(), getPinkModePreference());
    if (themeVariantSelect.value !== initialVariant) {
      themeVariantSelect.value = initialVariant;
    }

    themeVariantSelect.addEventListener('change', () => {
      applyThemeVariantSelection(themeVariantSelect.value);
    });
  }
}

if (!themePreferenceController) {
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
}

if (themePreferenceGlobalScope) {
  try {
    themePreferenceGlobalScope.cineThemePreference = {
      registerControl: (element, options) => {
        if (themePreferenceController && typeof themePreferenceController.registerControl === 'function') {
          return themePreferenceController.registerControl(element, options);
        }
        let unregister = () => { };
        pendingThemeControls.push({
          element,
          options,
          callback: (fn) => { unregister = fn; }
        });
        return () => unregister();
      },
      setValue: (value, options) => setThemePreference(value, options),
      getValue: () => getThemePreference(),
      reloadFromStorage: options => (
        themePreferenceController && typeof themePreferenceController.reloadFromStorage === 'function'
          ? themePreferenceController.reloadFromStorage(options)
          : getThemePreference()
      ),
    };

    themePreferenceGlobalScope.cinePinkModePreference = {
      registerControl: (element, options) => {
        if (pinkModePreferenceController && typeof pinkModePreferenceController.registerControl === 'function') {
          return pinkModePreferenceController.registerControl(element, options);
        }
        let unregister = () => { };
        pendingPinkModeControls.push({
          element,
          options,
          callback: (fn) => { unregister = fn; }
        });
        return () => unregister();
      },
      setValue: (value, options) => {
        if (pinkModePreferenceController && typeof pinkModePreferenceController.setValue === 'function') {
          return pinkModePreferenceController.setValue(value, options);
        }
        return false;
      },
      getValue: () => {
        if (pinkModePreferenceController && typeof pinkModePreferenceController.getValue === 'function') {
          return pinkModePreferenceController.getValue();
        }
        return isPinkModeActive();
      },
      reloadFromStorage: options => {
        if (pinkModePreferenceController && typeof pinkModePreferenceController.reloadFromStorage === 'function') {
          return pinkModePreferenceController.reloadFromStorage(options);
        }
        return isPinkModeActive();
      },
    };
  } catch (exposeError) {
    console.warn('Unable to expose theme preference bridge', exposeError);
  }
}

const PINK_MODE_STORAGE_KEY = 'cameraPowerPlanner_pinkMode';
const LEGACY_PINK_MODE_STORAGE_KEY = 'pinkMode';

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

let fontSize = 'medium';
try {
  const storedFontSize = localStorage.getItem('fontSize');
  if (storedFontSize) fontSize = storedFontSize;
} catch (e) {
  console.warn('Could not load font size preference', e);
}

let fontFamily = 'inter';
try {
  const storedFontFamily = localStorage.getItem('fontFamily');
  if (storedFontFamily) fontFamily = storedFontFamily;
} catch (e) {
  console.warn('Could not load font family preference', e);
}

if (typeof window !== 'undefined') {
  window.handlePinkModeIconPress = handlePinkModeIconPress;
  window.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
  window.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
  window.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
}

let pinkModeEnabled = false;
try {
  let storedPinkMode = localStorage.getItem(PINK_MODE_STORAGE_KEY);
  if (storedPinkMode === null || storedPinkMode === undefined || storedPinkMode === '') {
    storedPinkMode = localStorage.getItem(LEGACY_PINK_MODE_STORAGE_KEY);
  }
  pinkModeEnabled = storedPinkMode === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();
rememberSettingsTemperatureUnitBaseline();
rememberSettingsFocusScaleBaseline();
rememberSettingsShowAutoBackupsBaseline();
rememberSettingsMountVoltagesBaseline();

if (pinkModeToggle || (typeof document !== 'undefined' && document.getElementById('pinkModeToggle'))) {
  registerPinkModeControl(pinkModeToggle || document.getElementById('pinkModeToggle'), { type: 'button' });
}
if (typeof settingsPinkMode !== 'undefined' || (typeof document !== 'undefined' && document.getElementById('settingsPinkMode'))) {
  const settingsToggle = (typeof settingsPinkMode !== 'undefined' ? settingsPinkMode : null) || document.getElementById('settingsPinkMode');
  if (settingsToggle) {
    registerPinkModeControl(settingsToggle, { type: 'checkbox' });
  }
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
  input.addEventListener('change', _safeHandleMountVoltageInputChange);
  input.addEventListener('blur', _safeHandleMountVoltageInputChange);
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

const initialSettingsButton = resolveSettingsButton();
const initialSettingsDialog = resolveSettingsDialog();

if (initialSettingsButton && initialSettingsDialog) {
  const settingsButton = initialSettingsButton;
  const settingsDialog = initialSettingsDialog;
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
    if (settingsShowAutoBackups) {
      // Fix for ReferenceError: showAutoBackups is not defined
      const safeShowAutoBackups = typeof showAutoBackups !== 'undefined' ? showAutoBackups : true;
      settingsShowAutoBackups.checked = safeShowAutoBackups;
    }
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

  const applySettingsAndCloseDialog = async () => {
    if (!settingsDialog) {
      return;
    }

    if (settingsLanguage) {
      await applySetLanguage(settingsLanguage.value);
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
    // Explicitly resolve the element to ensure we have the latest reference
    const settingsLogoEl = document.getElementById('settingsLogo');
    if (settingsLogoEl && settingsLogoEl.files && settingsLogoEl.files[0]) {
      const file = settingsLogoEl.files[0];
      console.log('[Settings] Logo upload detected:', file.name, file.type, file.size);

      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        console.log('[Settings] Logo format valid (SVG). Reading file...');
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target.result) {
            console.error('[Settings] FileReader result is empty');
            showNotification('error', 'Failed to read logo file');
            return;
          }
          console.log('[Settings] Logo file read success. Length:', e.target.result.length);
          try {
            localStorage.setItem('customLogo', e.target.result);
            console.log('[Settings] Logo saved to localStorage');
          } catch (e) {
            console.warn('[Settings] Could not save custom logo to localStorage', e);
            showNotification('error', 'Failed to save logo to storage (quota exceeded?)');
          }
          renderSettingsLogoPreview(e.target.result);
        };
        reader.onerror = (err) => {
          console.error('[Settings] FileReader error:', err);
          showNotification('error', 'Error reading logo file');
        };
        reader.readAsDataURL(file);
      } else {
        console.warn('[Settings] Unsupported logo format:', file.type);
        showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format. Please use SVG.');
        if (settingsLogoEl) settingsLogoEl.value = '';
        safeLoadStoredLogoPreview();
      }
    } else {
      if (settingsLogoEl && settingsLogoEl.files && settingsLogoEl.files.length === 0) {
        // No file selected, do nothing (user might have just opened settings without changing logo)
      } else if (!settingsLogoEl) {
        console.warn('[Settings] settingsLogo element not found during save');
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

  if (typeof autoGearAddRuleBtn !== 'undefined' && autoGearAddRuleBtn) {
    autoGearAddRuleBtn.addEventListener('click', () => {
      if (typeof invokeSessionOpenAutoGearEditor === 'function') {
        invokeSessionOpenAutoGearEditor();
      } else if (typeof globalThis !== 'undefined' && typeof globalThis.invokeSessionOpenAutoGearEditor === 'function') {
        globalThis.invokeSessionOpenAutoGearEditor();
      } else if (typeof window !== 'undefined' && typeof window.invokeSessionOpenAutoGearEditor === 'function') {
        window.invokeSessionOpenAutoGearEditor();
      }
    });
  }
  if (typeof autoGearConditionSelect !== 'undefined' && autoGearConditionSelect) {
    autoGearConditionSelect.addEventListener('change', () => {
      if (typeof updateAutoGearConditionAddButtonState === 'function') {
        updateAutoGearConditionAddButtonState();
      } else if (typeof globalThis !== 'undefined' && typeof globalThis.updateAutoGearConditionAddButtonState === 'function') {
        globalThis.updateAutoGearConditionAddButtonState();
      }
    });
  }
  if (typeof autoGearConditionAddButton !== 'undefined' && autoGearConditionAddButton) {
    autoGearConditionAddButton.addEventListener('click', () => {
      if (typeof addAutoGearConditionFromPicker === 'function') {
        addAutoGearConditionFromPicker();
      } else if (typeof globalThis !== 'undefined' && typeof globalThis.addAutoGearConditionFromPicker === 'function') {
        globalThis.addAutoGearConditionFromPicker();
      }
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
  if (typeof autoGearScenarioBaseSelect !== 'undefined' && autoGearScenarioBaseSelect) {
    autoGearScenarioBaseSelect.addEventListener('change', () => {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioPrimary = _safeNormalizeAutoGearScenarioPrimary(autoGearScenarioBaseSelect.value);
      }
    });
  }
  if (typeof autoGearScenarioFactorInput !== 'undefined' && autoGearScenarioFactorInput) {
    const handleFactorUpdate = () => {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioMultiplier = _safeNormalizeAutoGearScenarioMultiplier(autoGearScenarioFactorInput.value);
      }
    };
    autoGearScenarioFactorInput.addEventListener('change', handleFactorUpdate);
    autoGearScenarioFactorInput.addEventListener('input', handleFactorUpdate);
  }
  if (typeof autoGearConditionList !== 'undefined' && autoGearConditionList) {
    autoGearConditionList.addEventListener('click', event => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest('button')
        : null;
      if (!target) return;
      if (target.classList.contains('auto-gear-condition-remove')) {
        const condition = target.dataset.condition || '';
        if (condition) {
          _safeRemoveAutoGearCondition(condition, { focusPicker: true });
        }
        return;
      }
      if (target.classList.contains('auto-gear-condition-add')) {
        _safeHandleAutoGearConditionShortcut();
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

  if (typeof autoGearResetFactoryButton !== 'undefined' && autoGearResetFactoryButton) {
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
  if (typeof autoGearExportButton !== 'undefined' && autoGearExportButton) {
    autoGearExportButton.addEventListener('click', () => {
      callSessionCoreFunction('exportAutoGearRules', [], { defer: true });
    });
  }
  if (typeof autoGearImportButton !== 'undefined' && autoGearImportButton && typeof autoGearImportInput !== 'undefined' && autoGearImportInput) {
    autoGearImportButton.addEventListener('click', () => {
      autoGearImportInput.click();
    });
    autoGearImportInput.addEventListener('change', _safeHandleAutoGearImportSelection);
  }
  if (typeof autoGearSearchInput !== 'undefined' && autoGearSearchInput) {
    const updateQuery = event => {
      _safeSetAutoGearSearchQuery(event?.target?.value || '');
    };
    autoGearSearchInput.addEventListener('input', updateQuery);
    autoGearSearchInput.addEventListener('search', updateQuery);
  }
  if (typeof autoGearFilterScenarioSelect !== 'undefined' && autoGearFilterScenarioSelect) {
    autoGearFilterScenarioSelect.addEventListener('change', event => {
      _safeSetAutoGearScenarioFilter(event?.target?.value || 'all');
    });
  }
  if (typeof autoGearFilterClearButton !== 'undefined' && autoGearFilterClearButton) {
    autoGearFilterClearButton.addEventListener('click', _safeClearAutoGearFilters);
  }
  if (typeof autoGearSummaryCards !== 'undefined' && autoGearSummaryCards) {
    autoGearSummaryCards.addEventListener('click', event => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest('.auto-gear-summary-action')
        : null;
      if (!target || target.disabled) return;
      const focus = target.dataset.focus || 'all';
      _safeSetAutoGearSummaryFocus(focus);
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
  if (typeof autoGearPresetSelect !== 'undefined' && autoGearPresetSelect) {
    autoGearPresetSelect.addEventListener('change', _safeHandleAutoGearPresetSelection);
  }
  if (typeof autoGearSavePresetButton !== 'undefined' && autoGearSavePresetButton) {
    autoGearSavePresetButton.addEventListener('click', _safeHandleAutoGearSavePreset);
  }
  if (typeof autoGearDeletePresetButton !== 'undefined' && autoGearDeletePresetButton) {
    autoGearDeletePresetButton.addEventListener('click', _safeHandleAutoGearDeletePreset);
  }
  if (typeof autoGearAddItemButton !== 'undefined' && autoGearAddItemButton) {
    autoGearAddItemButton.addEventListener('click', () => _safeAddAutoGearDraftItem('add'));
  }
  if (typeof autoGearRemoveItemButton !== 'undefined' && autoGearRemoveItemButton) {
    autoGearRemoveItemButton.addEventListener('click', () => _safeAddAutoGearDraftItem('remove'));
  }
  if (typeof autoGearSaveRuleButton !== 'undefined' && autoGearSaveRuleButton) {
    autoGearSaveRuleButton.addEventListener('click', _safeSaveAutoGearRuleFromEditor);
  }
  if (typeof autoGearCancelEditButton !== 'undefined' && autoGearCancelEditButton) {
    autoGearCancelEditButton.addEventListener('click', () => {
      _safeCloseAutoGearEditor();
      _safeRenderAutoGearDraftLists();
    });
  }
  if (typeof autoGearRulesList !== 'undefined' && autoGearRulesList) {
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
        _safeInvokeSessionOpenAutoGearEditor(ruleId, options);
      } else if (button.classList.contains('auto-gear-duplicate')) {
        const ruleId = button.dataset.ruleId || '';
        _safeDuplicateAutoGearRule(ruleId, button.dataset.ruleIndex);
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
  if (typeof autoGearBackupSelect !== 'undefined' && autoGearBackupSelect) {
    autoGearBackupSelect.addEventListener('change', () => {
      _safeUpdateAutoGearBackupRestoreButtonState();
    });
  }
  if (typeof autoGearShowBackupsCheckbox !== 'undefined' && autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.addEventListener('change', _safeHandleAutoGearShowBackupsToggle);
  }
  if (typeof autoGearBackupRestoreButton !== 'undefined' && autoGearBackupRestoreButton) {
    autoGearBackupRestoreButton.addEventListener('click', () => {
      if (!autoGearBackupSelect) return;
      const backupId = autoGearBackupSelect.value;
      if (backupId) {
        _safeRestoreAutoGearBackup(backupId);
      }
    });
  }
  if (typeof autoGearAddCategorySelect !== 'undefined' && autoGearAddCategorySelect) {
    autoGearAddCategorySelect.addEventListener('change', _safeSyncAutoGearMonitorFieldVisibility);
  }
  if (typeof autoGearRemoveCategorySelect !== 'undefined' && autoGearRemoveCategorySelect) {
    autoGearRemoveCategorySelect.addEventListener('change', _safeSyncAutoGearMonitorFieldVisibility);
  }
  const bindAutoGearSelectorCatalogSync = (typeSelect, defaultInput) => {
    if (!typeSelect) return;
    const refreshCatalog = () => {
      _safeUpdateAutoGearMonitorCatalogOptions(typeSelect.value, defaultInput);
    };
    typeSelect.addEventListener('change', refreshCatalog);
    if (defaultInput) {
      defaultInput.addEventListener('focus', refreshCatalog);
      defaultInput.addEventListener('click', refreshCatalog);
    }
    refreshCatalog();
  };
  if (typeof autoGearAddSelectorTypeSelect !== 'undefined' && typeof autoGearAddSelectorDefaultInput !== 'undefined') {
    bindAutoGearSelectorCatalogSync(autoGearAddSelectorTypeSelect, autoGearAddSelectorDefaultInput);
  }
  if (typeof autoGearRemoveSelectorTypeSelect !== 'undefined' && typeof autoGearRemoveSelectorDefaultInput !== 'undefined') {
    bindAutoGearSelectorCatalogSync(autoGearRemoveSelectorTypeSelect, autoGearRemoveSelectorDefaultInput);
  }
  if (typeof autoGearEditor !== 'undefined' && autoGearEditor) {
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
            _safeClearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
          }
          _safeRenderAutoGearDraftLists();
          _safeUpdateAutoGearCatalogOptions();
        }
        return;
      }
      if (target.classList.contains('auto-gear-edit-entry')) {
        _safeBeginAutoGearDraftItemEdit(target.dataset.listType, target.dataset.itemId);
      }
    });
  }
}

_safeSyncAutoGearMonitorFieldVisibility();

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

const getNotificationAccentColor = () => importedGetNotificationAccentColor();

const getNotificationTextColor = (backgroundColor) => importedGetNotificationTextColor(backgroundColor);

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

const ensureNotificationContainer = () => importedEnsureNotificationContainer();

function showNotification(type, message) {
  return importedShowNotification(type, message);
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
    let storedPinkMode = safeGetItem(PINK_MODE_STORAGE_KEY);
    if (storedPinkMode === null || storedPinkMode === undefined || storedPinkMode === '') {
      storedPinkMode = safeGetItem(LEGACY_PINK_MODE_STORAGE_KEY);
    }
    applyPinkMode(storedPinkMode === 'true');
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


if (typeof backupSettings !== 'undefined' && backupSettings) {
  backupSettings.addEventListener('click', createSettingsBackup);
}
const storageBackupNowControl = typeof document !== 'undefined'
  ? document.getElementById('storageBackupNow')
  : null;
if (storageBackupNowControl) {
  storageBackupNowControl.addEventListener('click', createSettingsBackup);
}

// storagePersistenceRequestButton already declared in app-core-new-1.js
const sessionStoragePersistenceRequestButton = typeof document !== 'undefined'
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




// Logging Logic migrated to LoggingManager


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
  if (sessionStoragePersistenceRequestButton) {
    const shouldDisable = !storagePersistenceStatusEl
      || storagePersistenceState.supported === false
      || storagePersistenceState.persisted
      || storagePersistenceState.requestInFlight
      || storagePersistenceState.checking;
    sessionStoragePersistenceRequestButton.disabled = shouldDisable;
    sessionStoragePersistenceRequestButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
    const requestLabel = langTexts.storagePersistenceRequest
      || fallbackTexts.storagePersistenceRequest
      || sessionStoragePersistenceRequestButton.dataset.defaultLabel
      || sessionStoragePersistenceRequestButton.textContent
      || '';
    const requestHelp = langTexts.storagePersistenceRequestHelp
      || fallbackTexts.storagePersistenceRequestHelp
      || requestLabel;
    if (requestHelp) {
      sessionStoragePersistenceRequestButton.setAttribute('data-help', requestHelp);
      sessionStoragePersistenceRequestButton.setAttribute('title', requestHelp);
      sessionStoragePersistenceRequestButton.setAttribute('aria-label', requestHelp);
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
  if (!sessionStoragePersistenceRequestButton || storagePersistenceState.requestInFlight) {
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

if (sessionStoragePersistenceRequestButton) {
  sessionStoragePersistenceRequestButton.addEventListener('click', handleStoragePersistenceRequest);
}

if (storagePersistenceStatusEl) {
  refreshStoragePersistenceStatus().catch(error => {
    console.warn('Persistent storage status initialization failed', error);
  });
}


LoggingManager.initialize({
  loggingSectionEl,
  loggingHistoryListEl,
  loggingStatusEl,
  loggingEmptyEl,
  loggingUnavailableEl,
  loggingLevelFilterEl,
  loggingNamespaceFilterEl,
  loggingNamespaceHelpEl,
  loggingHistoryLimitInput,
  loggingHistoryLimitHelpEl,
  loggingConsoleOutputInput,
  loggingCaptureConsoleInput,
  loggingCaptureErrorsInput,
  loggingPersistSessionInput,
  sessionLoggingExportButton
});

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

// Initialize Backup Diff
if (BackupDiffManager && typeof BackupDiffManager.initializeBackupDiff === 'function') {
  BackupDiffManager.initializeBackupDiff({
    sectionEl: backupDiffSectionEl,
    toggleButtonEl: backupDiffToggleButtonEl,
    closeButtonEl: backupDiffCloseButtonEl,
    primarySelectEl: backupDiffPrimarySelectEl,
    secondarySelectEl: backupDiffSecondarySelectEl,
    exportButtonEl: backupDiffExportButtonEl,
    summaryEl: backupDiffSummaryEl,
    listEl: backupDiffListEl,
    listContainerEl: backupDiffListContainerEl,
    notesEl: backupDiffNotesEl,
    emptyStateEl: backupDiffEmptyStateEl,
    dataProvider: () => (typeof getSetups === 'function' ? getSetups() : {}),
  });
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
  let backupDownloadResult = null;
  try {
    const backupResult = performSettingsBackup(false, new Date());
    backupFileName = backupResult ? backupResult.fileName : null;
    backupDownloadResult = backupResult ? backupResult.downloadResult : null;
  } catch (error) {
    console.error('Backup before restore failed', error);
  }

  if (!backupFileName || !backupDownloadResult || (!backupDownloadResult.success && !backupDownloadResult.queued)) {
    const failureMessage = langTexts.restoreBackupFailed
      || fallbackTexts.restoreBackupFailed
      || 'Backup failed. Restore cancelled.';
    showNotification('error', failureMessage);
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: 'Restore Failed',
        message: failureMessage
      });
    } else {
      alert(failureMessage);
    }
    restoreSettingsInput.value = '';
    return;
  }

  if (backupDownloadResult.success) {
    showNotification('success', 'Full app backup downloaded');
  } else if (backupDownloadResult.queued) {
    const queuedBackupMessage = backupDownloadResult.queueMessage
      || fallbackTexts.queuedBackupDownloadDeferred
      || 'Automatic downloads were blocked. The backup was saved to the local vault.';
    const queuedConfirmMessage = langTexts.restoreBackupQueuedConfirm
      || fallbackTexts.restoreBackupQueuedConfirm
      || 'The safety backup is waiting in the local vault. Continue with the restore now?';
    showNotification('warning', queuedBackupMessage);
    let restoreConfirmed = false;
    if (typeof confirm === 'function') {
      restoreConfirmed = confirm(`${queuedBackupMessage}\n\n${queuedConfirmMessage}`);
    } else if (typeof alert === 'function') {
      alert(`${queuedBackupMessage}\n\n${queuedConfirmMessage}`);
      restoreConfirmed = true;
    }
    if (!restoreConfirmed) {
      restoreSettingsInput.value = '';
      return;
    }
  }

  const safeStorage = resolveSafeLocalStorage();
  const storedSettingsSnapshot = captureStorageSnapshot(safeStorage);
  const storedSessionSnapshot = captureStorageSnapshot(
    typeof sessionStorage !== 'undefined' ? sessionStorage : null,
  );
  const previousSelection = captureSetupSelection();
  let restoreMutated = false;

  const finalizeRestore = async () => {
    try {
      restoreSettingsInput.value = '';
    } catch (resetError) {
      void resetError;
    }
  };

  const revertAfterFailure = async () => {
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
        await applySetLanguage(restoredPreferences.language);
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
    if (typeof window.cineShowAlertDialog === 'function') {
      window.cineShowAlertDialog({
        title: 'Restore Failed',
        message: restoreFailureMessage
      });
    } else {
      alert(restoreFailureMessage);
    }
    finalizeRestore();
  };

  const processBackupPayload = async (rawPayload) => {
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
        if (typeof window.cineShowAlertDialog === 'function') {
          window.cineShowAlertDialog({
            title: 'Version Compatibility',
            message: compatibilityMessage
          });
        } else {
          alert(compatibilityMessage);
        }
      }
      const shouldRestoreSettings =
        restoredSettings
        && typeof restoredSettings === 'object'
        && !Array.isArray(restoredSettings);
      const shouldRestoreSession =
        restoredSession
        && typeof restoredSession === 'object'
        && !Array.isArray(restoredSession);
      if (shouldRestoreSettings) {
        restoreMutated = true;
        restoreLocalStorageSnapshot(safeStorage, restoredSettings);
      }
      if (shouldRestoreSession) {
        restoreMutated = true;
        restoreSessionStorageSnapshot(restoredSession);
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
      if (typeof populateSetupSelect === 'function') populateSetupSelect();
      restoreSetupSelection(previousSelection, showAutoBackups);
      if (settingsShowAutoBackups) {
        settingsShowAutoBackups.checked = showAutoBackups;
      }
      if (restoredPreferenceState.language) {
        await applySetLanguage(restoredPreferenceState.language);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after applying restored preferences', userButtonError);
          }
        }
      }
      if (shouldRestoreSession) {
        restoreSessionStorageSnapshot(restoredSession);
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
      const message = alertSegments.join('\n\n');
      if (typeof window.cineShowAlertDialog === 'function') {
        window.cineShowAlertDialog({
          title: 'Restore Successful',
          message: message
        });
      } else {
        alert(message);
      }
      finalizeRestore();
    } catch (err) {
      if (restoreMutated) {
        try {
          await revertAfterFailure();
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


if (typeof globalThis !== 'undefined') {
  globalThis.applySharedSetup = applySharedSetup;
  globalThis.applySharedSetupFromUrl = applySharedSetupFromUrl;
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
  if (messageEl) {
    if (typeof message === 'string' && message.includes('\n')) {
      messageEl.innerHTML = message.replace(/\n/g, '<br>');
    } else {
      messageEl.textContent = message || 'Are you sure?';
    }
  }

  confirmBtn.textContent = confirmLabel || 'Confirm';
  cancelBtn.textContent = cancelLabel || 'Cancel';
  cancelBtn.style.display = 'inline-block';

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

window.cineShowAlertDialog = (options) => {
  const config = typeof options === 'string' ? { message: options } : (options || {});
  const {
    title,
    message,
    confirmLabel,
    onConfirm,
  } = config;

  const dialog = document.getElementById('appConfirmDialog');
  const titleEl = document.getElementById('appConfirmTitle');
  const messageEl = document.getElementById('appConfirmMessage');
  const confirmBtn = document.getElementById('appConfirmBtn');
  const cancelBtn = document.getElementById('appConfirmCancelBtn');

  if (!dialog || !confirmBtn || !cancelBtn) {
    console.warn('Alert dialog elements missing');
    if (typeof alert === 'function') alert(message);
    return;
  }

  if (titleEl) titleEl.textContent = title || 'Notification';
  if (messageEl) {
    if (typeof message === 'string' && message.includes('\n')) {
      messageEl.innerHTML = message.replace(/\n/g, '<br>');
    } else {
      messageEl.textContent = message || '';
    }
  }

  confirmBtn.textContent = confirmLabel || 'OK';
  confirmBtn.classList.remove('danger');
  cancelBtn.style.display = 'none';

  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

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
          backupResult = await performSettingsBackup(false, new Date());
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
          SessionState.factoryResetInProgress = true;
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
          SessionState.factoryResetInProgress = false;
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

const bindDownloadDiagramListener = () => {
  const btn = downloadDiagramButton || document.getElementById('downloadDiagram');
  if (!btn) return false;

  // Remove existing to avoid double binding if called twice
  btn.removeEventListener('click', handleDownloadDiagramClick);
  btn.addEventListener('click', handleDownloadDiagramClick);
  return true;
};

function handleDownloadDiagramClick(e) {
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
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
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
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000);
      }, 'image/jpeg', 0.95);
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  } else {
    saveSvg();
  }
}

const bindGridSnapListener = () => {
  const btn = gridSnapToggleButton || document.getElementById('gridSnapToggle');
  if (!btn) return false;

  btn.removeEventListener('click', handleGridSnapClick);
  btn.addEventListener('click', handleGridSnapClick);
  return true;
};

function handleGridSnapClick() {
  const nextState = !readGridSnapState();
  const finalState = writeGridSnapState(nextState);
  applyGridSnapUiState(finalState);
}

if (!bindDownloadDiagramListener()) {
  document.addEventListener('DOMContentLoaded', bindDownloadDiagramListener);
}

if (!bindGridSnapListener()) {
  document.addEventListener('DOMContentLoaded', bindGridSnapListener);
}

const ensureFeatureSearchVisibility = element => {
  if (!element || typeof element !== 'object' || typeof element.nodeType !== 'number') {
    return;
  }

  if (
    typeof backupDiffSectionEl !== 'undefined' && backupDiffSectionEl &&
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
    typeof restoreRehearsalSectionEl !== 'undefined' && restoreRehearsalSectionEl &&
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

  const deviceManager = element.closest('#device-manager');
  if (deviceManager) {
    if (typeof showDeviceManagerSection === 'function') showDeviceManagerSection();
  }
};

const focusFeatureElement = element => {
  if (!element) return;
  if (typeof element.closest !== 'function') return;

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
    if (matchingTabId && typeof activateSettingsTab === 'function') {
      activateSettingsTab(matchingTabId);
    }
  }
  if (settingsSection && typeof isDialogOpen === 'function' && !isDialogOpen(settingsDialog)) {
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
    if (typeof requestSettingsOpen === 'function') requestSettingsOpen(context);
  }

  const dialog = element.closest('dialog');
  if (dialog && typeof isDialogOpen === 'function' && !isDialogOpen(dialog)) {
    if (dialog.id === 'projectDialog' && typeof generateGearListBtn !== 'undefined' && generateGearListBtn?.click) {
      generateGearListBtn.click();
    } else if (dialog.id === 'feedbackDialog' && typeof runtimeFeedbackBtn !== 'undefined' && runtimeFeedbackBtn?.click) {
      runtimeFeedbackBtn.click();
    } else if (dialog.id === 'overviewDialog' && typeof generateOverviewBtn !== 'undefined' && generateOverviewBtn?.click) {
      generateOverviewBtn.click();
    } else {
      if (typeof openDialog === 'function') openDialog(dialog);
    }
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

const setupHelpSystem = () => {
  const btn = typeof helpButton !== 'undefined' ? helpButton : document.getElementById('helpButton');
  if (!btn) return false;

  // Prevent double init handled by manager

  // Initialize Help UI Logic
  const initResult = HelpUiManager.initialize({
    helpButton: btn,
    helpDialog: typeof helpDialog !== 'undefined' ? helpDialog : document.getElementById('helpDialog'),
    helpSearch: typeof helpSearch !== 'undefined' ? helpSearch : document.getElementById('helpSearch'),
    helpResultsSummary: typeof helpResultsSummary !== 'undefined' ? helpResultsSummary : document.getElementById('helpResultsSummary'),
    helpResultsAssist: typeof helpResultsAssist !== 'undefined' ? helpResultsAssist : document.getElementById('helpResultsAssist'),
    helpNoResults: typeof helpNoResults !== 'undefined' ? helpNoResults : document.getElementById('helpNoResults'),
    helpNoResultsSuggestions: typeof helpNoResultsSuggestions !== 'undefined' ? helpNoResultsSuggestions : document.getElementById('helpNoResultsSuggestions'),
    helpSearchClear: typeof helpSearchClear !== 'undefined' ? helpSearchClear : document.getElementById('helpSearchClear'),
    helpQuickLinksNav: typeof helpQuickLinksNav !== 'undefined' ? helpQuickLinksNav : document.getElementById('helpQuickLinksNav'),
    helpQuickLinksList: typeof helpQuickLinksList !== 'undefined' ? helpQuickLinksList : document.getElementById('helpQuickLinksList'),
    helpSectionsContainer: typeof helpSectionsContainer !== 'undefined' ? helpSectionsContainer : document.getElementById('helpSectionsContainer'),
    helpQuickLinksHeading: typeof helpQuickLinksHeading !== 'undefined' ? helpQuickLinksHeading : document.getElementById('helpQuickLinksHeading'),
    hoverHelpButton: typeof hoverHelpButton !== 'undefined' ? hoverHelpButton : document.getElementById('hoverHelpEnable')
  }, {
    openDialog: (d) => typeof openDialog === 'function' && openDialog(d),
    closeDialog: (d) => typeof closeDialog === 'function' && closeDialog(d),
    requestFeatureFocus: focusFeatureElement
  });

  // Initialize Feature Search
  FeatureSearchManager.init({
    focusHandler: focusFeatureElement
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    const key = typeof e.key === 'string' ? e.key : '';
    const lowerKey = key.toLowerCase();

    // Hover Help Exit
    if (e.key === 'Escape' && document.body.classList.contains('hover-help-active')) {
      HelpUiManager.stopHoverHelp();
    }
    else if (e.key === 'Escape' && isDialogOpen(btn.closest('dialog') || document.getElementById('helpDialog'))) { // HelpUiManager handles backing out internal links but main dialog close here
      e.preventDefault();
      HelpUiManager.closeHelp();
    }
    else if (
      e.key === 'Escape' && typeof settingsDialog !== 'undefined' && settingsDialog && isDialogOpen(settingsDialog)
    ) {
      e.preventDefault();
      if (typeof revertSettingsPinkModeIfNeeded === 'function') revertSettingsPinkModeIfNeeded();
      if (typeof rememberSettingsPinkModeBaseline === 'function') rememberSettingsPinkModeBaseline();
      if (typeof revertSettingsTemperatureUnitIfNeeded === 'function') revertSettingsTemperatureUnitIfNeeded();
      if (typeof rememberSettingsTemperatureUnitBaseline === 'function') rememberSettingsTemperatureUnitBaseline();
      if (typeof revertSettingsFocusScaleIfNeeded === 'function') revertSettingsFocusScaleIfNeeded();
      if (typeof rememberSettingsFocusScaleBaseline === 'function') rememberSettingsFocusScaleBaseline();
      if (typeof invokeSessionRevertAccentColor === 'function') invokeSessionRevertAccentColor();
      if (typeof closeDialog === 'function') closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (
      e.key === 'F1' ||
      ((e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey))
    ) {
      e.preventDefault();
      HelpUiManager.toggleHelp();
    } else if (
      e.key === '/' &&
      !isTextField &&
      (!isDialogOpen(document.getElementById('helpDialog')))
    ) {
      e.preventDefault();
      // Open help (search focused by default in openHelp)
      HelpUiManager.openHelp();
    } else if (
      (e.key === '?' && !isTextField) ||
      (lowerKey === 'h' && !isTextField)
    ) {
      e.preventDefault();
      HelpUiManager.toggleHelp();
    } else if (
      isDialogOpen(document.getElementById('helpDialog')) &&
      ((e.key === '/' && !isTextField) || (lowerKey === 'f' && (e.ctrlKey || e.metaKey)))
    ) {
      e.preventDefault();
      const hs = document.getElementById('helpSearch');
      if (hs) hs.focus();
    } else if (key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (typeof requestSettingsOpen === 'function') {
        requestSettingsOpen({
          reason: 'keyboard-shortcut',
          key,
          ctrl: !!e.ctrlKey,
          meta: !!e.metaKey,
          shift: !!e.shiftKey,
        });
      }
    } else if (lowerKey === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Focus feature search (which is inside Help)
      HelpUiManager.openHelp();
    } else if (lowerKey === 'd' && !isTextField) {
      if (typeof getThemePreference === 'function' && typeof setThemePreference === 'function')
        setThemePreference(!getThemePreference());
    } else if (lowerKey === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (typeof saveSetupBtn !== 'undefined' && saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (lowerKey === 'p' && !isTextField) {
      if (typeof persistPinkModePreference === 'function')
        persistPinkModePreference(!document.body.classList.contains('pink-mode'));
    }
  });

  // Dialog backdrop click handled by HelpUiManager

  return true;
}

if (!setupHelpSystem()) {
  document.addEventListener('DOMContentLoaded', setupHelpSystem);
}

// Initial calculation and language set after DOM is ready
// Initialize immediately if DOM is already loaded (e.g. when scripts are
// injected after `DOMContentLoaded` fired). Otherwise wait for the event.



function initApp() {
  InitializationManager.initialize();

  ScenarioUiManager.initialize({
    requiredScenariosSelect: typeof requiredScenariosSelect !== 'undefined' ? requiredScenariosSelect : document.getElementById('requiredScenariosSelect'),
    requiredScenariosSummary: typeof requiredScenariosSummary !== 'undefined' ? requiredScenariosSummary : document.getElementById('requiredScenariosSummary'),
    remoteHeadOption: typeof remoteHeadOption !== 'undefined' ? remoteHeadOption : document.getElementById('remoteHeadOption'),
    monitorSelect: typeof monitorSelect !== 'undefined' ? monitorSelect : document.getElementById('monitorSelect'),
    videoDistributionSelect: typeof videoDistributionSelect !== 'undefined' ? videoDistributionSelect : document.getElementById('videoDistributionSelect'),
    tripodPreferencesRow: typeof tripodPreferencesRow !== 'undefined' ? tripodPreferencesRow : document.getElementById('tripodPreferencesRow'),
    tripodPreferencesHeading: typeof tripodPreferencesHeading !== 'undefined' ? tripodPreferencesHeading : document.getElementById('tripodPreferencesHeading'),
    tripodPreferencesSection: typeof tripodPreferencesSection !== 'undefined' ? tripodPreferencesSection : document.getElementById('tripodPreferencesSection'),
    tripodHeadBrandSelect: typeof tripodHeadBrandSelect !== 'undefined' ? tripodHeadBrandSelect : document.getElementById('tripodHeadBrandSelect'),
    tripodBowlSelect: typeof tripodBowlSelect !== 'undefined' ? tripodBowlSelect : document.getElementById('tripodBowlSelect'),
    tripodTypesSelect: typeof tripodTypesSelect !== 'undefined' ? tripodTypesSelect : document.getElementById('tripodTypesSelect'),
    tripodSpreaderSelect: typeof tripodSpreaderSelect !== 'undefined' ? tripodSpreaderSelect : document.getElementById('tripodSpreaderSelect')
  });

  if (typeof updateTripodOptions === 'function') updateTripodOptions();
  if (typeof updateViewfinderExtensionVisibility === 'function') updateViewfinderExtensionVisibility();
  if (typeof updateCalculations === 'function') updateCalculations();
  if (typeof applyFilters === 'function') applyFilters();
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


// schedulePostRenderTask delegated to InitializationManager
function schedulePostRenderTask(task, timeout = 100) {
  InitializationManager.schedulePostRenderTask(task, timeout);
}

// populateEnvironmentDropdowns delegated to UiPopulationManager
function populateEnvironmentDropdowns() {
  UiPopulationManager.populateEnvironmentDropdowns();
}

// populateLensDropdown delegated to UiPopulationManager
function populateLensDropdown() {
  UiPopulationManager.populateLensDropdown();
}

function populateCameraPropertyDropdown(selectId, property, selected = '') {
  const camKey = (typeof cameraSelect !== 'undefined' && cameraSelect) ? cameraSelect.value : '';
  DeviceCapabilityManager.populateCameraPropertyDropdown(selectId, property, selected, camKey);
}


function populateRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}
if (typeof window !== 'undefined') {
  window.populateRecordingResolutionDropdown = populateRecordingResolutionDropdown;
} else if (typeof globalThis !== 'undefined') {
  globalThis.populateRecordingResolutionDropdown = populateRecordingResolutionDropdown;
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
    // Redundant frame rate helpers removed (moved to DeviceCapabilityManager).

    if (minFormatted) values.add(minFormatted);
    if (maxFormatted) values.add(maxFormatted);
    includePreferredValuesForRange(minVal, maxVal, values);

    match = rangePattern.exec(numericSection);
  }

  return Array.from(values);
}
function findMaxFrameRateForSensor(entries, sensorTokens, sensorLabel = '') {
  return DeviceCapabilityManager.findMaxFrameRateForSensor(entries, sensorTokens, sensorLabel);
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
      .map(option => DeviceCapabilityManager.tokenizeFrameRateContext(option && option.value))
      .reduce((acc, tokens) => (tokens && tokens.length ? acc.concat(tokens) : acc), []);
  }
  const value = typeof select.value === 'string' ? select.value : '';
  return DeviceCapabilityManager.tokenizeFrameRateContext(value);
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

  const normalizedSelected = DeviceCapabilityManager.normalizeRecordingFrameRateValue(selected);
  let currentValue = normalizedSelected || getFrameRateInputValue(recordingInput);
  const camKey = cameraSelect && cameraSelect.value;
  // Fix for potential ReferenceError: devices is not defined
  const safeDevices = (typeof window !== 'undefined' && window.devices) || {};
  const frameRateEntries =
    camKey && safeDevices && safeDevices.cameras && safeDevices.cameras[camKey]
      ? safeDevices.cameras[camKey].frameRates
      : null;

  const sensorValue = sensorSelect && typeof sensorSelect.value === 'string'
    ? sensorSelect.value
    : '';
  const sensorTokens = DeviceCapabilityManager.tokenizeFrameRateContext(sensorValue);
  const resolutionValue = resolutionSelect && typeof resolutionSelect.value === 'string'
    ? resolutionSelect.value
    : '';
  const resolutionTokens = DeviceCapabilityManager.tokenizeFrameRateContext(resolutionValue);
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

  const { values: suggestions } = DeviceCapabilityManager.buildFrameRateSuggestions(
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
  const resolve = (val, id) => val || (typeof document !== 'undefined' ? document.getElementById(id) : null);
  const inputEl = resolve(recordingFrameRateInput, 'recordingFrameRate');

  if (!inputEl && typeof cineCoreUiHelpers !== 'undefined' && typeof cineCoreUiHelpers.whenElementAvailable === 'function') {
    cineCoreUiHelpers.whenElementAvailable('recordingFrameRate', () => populateFrameRateDropdown(selected));
    return;
  }

  populateFrameRateDropdownFor({
    selected,
    recordingInput: inputEl,
    optionsList: resolve(recordingFrameRateOptionsList, 'recordingFrameRateOptions'),
    sensorSelect: resolve(sensorModeDropdown, 'sensorMode'),
    resolutionSelect: resolve(recordingResolutionDropdown, 'recordingResolution'),
    hintElement: resolve(recordingFrameRateHint, 'recordingFrameRateHint'),
  });
}

function populateSlowMotionFrameRateDropdown(selected = '') {
  const resolve = (val, id) => val || (typeof document !== 'undefined' ? document.getElementById(id) : null);
  const inputEl = resolve(slowMotionRecordingFrameRateInput, 'slowMotionRecordingFrameRate');

  if (!inputEl && typeof cineCoreUiHelpers !== 'undefined' && typeof cineCoreUiHelpers.whenElementAvailable === 'function') {
    cineCoreUiHelpers.whenElementAvailable('slowMotionRecordingFrameRate', () => populateSlowMotionFrameRateDropdown(selected));
    return;
  }

  populateFrameRateDropdownFor({
    selected,
    recordingInput: inputEl,
    optionsList: resolve(slowMotionRecordingFrameRateOptionsList, 'slowMotionRecordingFrameRateOptions'),
    sensorSelect: resolve(slowMotionSensorModeDropdown, 'slowMotionSensorMode'),
    resolutionSelect: resolve(slowMotionRecordingResolutionDropdown, 'slowMotionRecordingResolution'),
    aspectSelect: resolve(slowMotionAspectRatioSelect, 'slowMotionAspectRatio'),
    hintElement: resolve(slowMotionRecordingFrameRateHint, 'slowMotionRecordingFrameRateHint'),
  });
}

function populateSlowMotionRecordingResolutionDropdown(selected = '') {
  populateCameraPropertyDropdown('slowMotionRecordingResolution', 'resolutions', selected);
}
if (typeof window !== 'undefined') window.populateSlowMotionRecordingResolutionDropdown = populateSlowMotionRecordingResolutionDropdown;

function populateSlowMotionSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('slowMotionSensorMode', 'sensorModes', selected);
}
if (typeof window !== 'undefined') window.populateSlowMotionSensorModeDropdown = populateSlowMotionSensorModeDropdown;

function populateSensorModeDropdown(selected = '') {
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}
if (typeof window !== 'undefined') window.populateSensorModeDropdown = populateSensorModeDropdown;

function populateCodecDropdown(selected = '') {
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}

function populateFilterDropdown() {
  UiPopulationManager.populateFilterDropdown();
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
if (typeof window !== 'undefined') window.buildFilterGearEntries = buildFilterGearEntries;

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
    } else {
      // Fix for ReferenceError: currentProjectInfo is not defined
      const safeProjectInfo = typeof currentProjectInfo !== 'undefined' ? currentProjectInfo : {};
      if (safeProjectInfo && safeProjectInfo.filter) {
        existingTokens = parseFilterTokens(safeProjectInfo.filter);
      } else {
        existingTokens = [];
      }
    }
  }
  const existingMap = new Map(existingTokens.map(token => [token.type, token]));
  const details = selected.map(type => {
    const prev = existingMap.get(type) || {};
    const size = prev.size || SESSION_DEFAULT_FILTER_SIZE;
    const needsSize = type !== 'Diopter';
    const needsValues = filterTypeNeedsValueSelect(type);
    const { label, gearName, hideDetails } = resolveFilterDisplayInfo(type, size);
    let entryId = `filter - ${filterId(type)} `;
    if (type === 'Diopter') entryId = `${entryId} -set`;
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
if (typeof window !== 'undefined') window.renderFilterDetails = renderFilterDetails;

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

  // Fix for ReferenceError: currentProjectInfo is not defined
  const safeCurrentProjectInfo = typeof currentProjectInfo !== 'undefined' ? currentProjectInfo : {};
  const existingSelectionString = safeCurrentProjectInfo && typeof safeCurrentProjectInfo.filter === 'string'
    ? safeCurrentProjectInfo.filter
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
    const sizeSel = document.getElementById(`filter - size - ${filterId(type)} `);
    const valSel = document.getElementById(`filter - values - ${filterId(type)} `);
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
      valueSegment = vals.length ? `:${vals.join('|')} ` : ':!';
    }
    return `${type}:${size}${valueSegment} `;
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
          segment = values.length ? `:${values.join('|')} ` : ':!';
        }
        return `${token.type}:${size}${segment} `;
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

function applyFilterSelectionsToGearList(info) {
  const projectInfo = info || (typeof currentProjectInfo !== 'undefined' ? currentProjectInfo : {});
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
if (typeof window !== 'undefined') window.applyFilterSelectionsToGearList = applyFilterSelectionsToGearList;

function buildFilterSelectHtml() {
  return '<div id="gearListFilterDetails" class="hidden" aria-live="polite"></div>';
}
if (typeof window !== 'undefined') window.buildFilterSelectHtml = buildFilterSelectHtml;

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
if (typeof window !== 'undefined') window.collectFilterAccessories = collectFilterAccessories;

// populateUserButtonDropdowns delegated to UiPopulationManager
function populateUserButtonDropdowns() {
  UiPopulationManager.populateUserButtonDropdowns();
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

/* Exported Session API */
const cineCoreSession = {
  APP_VERSION: typeof ACTIVE_APP_VERSION === 'string' ? ACTIVE_APP_VERSION : (typeof APP_VERSION !== 'undefined' ? APP_VERSION : 'unknown'),
  closeSideMenu,
  openSideMenu,
  setupSideMenu,
  setupResponsiveControls,
  setLanguage: applySetLanguage,
  applySetLanguage,
  safeGetCurrentProjectName,
  updateCalculations: function (...args) {
    if (typeof globalThis !== 'undefined' && typeof globalThis.updateCalculations === 'function') {
      return globalThis.updateCalculations(...args);
    }
    return undefined;
  },
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
  updateBatteryPlateVisibility: _safeUpdateBatteryPlateVisibility,
  updateBatteryOptions: _safeUpdateBatteryOptions,

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

  setSelectValue,
  autoSaveCurrentSetup: _safeAutoSaveCurrentSetup,
  saveCurrentSession: _safeSaveCurrentSession,
  saveCurrentGearList: function (...args) {
    if (typeof globalThis !== 'undefined' && typeof globalThis.saveCurrentGearList === 'function') {
      return globalThis.saveCurrentGearList(...args);
    }
    return undefined;
  },
  crewRoles: typeof globalThis !== 'undefined' && Array.isArray(globalThis.crewRoles) ? globalThis.crewRoles : [],
  setSliderBowlValue: function (...args) {
    if (typeof globalThis !== 'undefined' && typeof globalThis.setSliderBowlValue === 'function') {
      return globalThis.setSliderBowlValue(...args);
    }
    return undefined;
  },
  setEasyrigValue: function (...args) {
    if (typeof globalThis !== 'undefined' && typeof globalThis.setEasyrigValue === 'function') {
      return globalThis.setEasyrigValue(...args);
    }
    return undefined;
  },
  restoreSessionState,

  scenarioIcons,

  renderFilterDetails,
  collectFilterSelections,
  parseFilterTokens,
  applyFilterSelectionsToGearList,

  createSettingsBackup,
  buildSettingsBackupPackage,
  captureStorageSnapshot,
  sanitizeBackupPayload,
  extractBackupSections,

  runFeatureSearch,
  computeSetupDiff: BackupDiffManager.computeSetupDiff,
  __versionCompareInternals: {
    formatDiffPath: BackupDiffManager.formatDiffPath,
    formatDiffListIndex: BackupDiffManager.formatDiffListIndex,
    createKeyedDiffPathSegment: BackupDiffManager.createKeyedDiffPathSegment,
    parseKeyedDiffPathSegment: BackupDiffManager.parseKeyedDiffPathSegment,
    findArrayComparisonKey: BackupDiffManager.findArrayComparisonKey,
  },
  __featureSearchInternals: {
    featureMap,
    actionMap,
    deviceMap,
    helpMap,
    featureSearchEntries,
    featureSearchDefaultOptions,
    featureSearchInput: featureSearch,
    featureSearchDropdownElement:
      typeof globalThis !== 'undefined' && globalThis.featureSearchDropdown
        ? globalThis.featureSearchDropdown
        : null,
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

  resetPlannerStateAfterFactoryReset,
  __autoGearInternals: {
    buildVideoDistributionAutoRules: (typeof window !== 'undefined' && window.buildVideoDistributionAutoRules) || undefined,
  },

  // Explicitly added to module API for ESM access
  populateFilterDropdown,
  populateFrameRateDropdownFor,
  populateSlowMotionFrameRateDropdown,
  populateSensorModeDropdown,
  populateCodecDropdown,
  populateRecordingResolutionDropdown
};

// Expose globals for backward compatibility
if (typeof window !== 'undefined') {
  window.cineCoreSession = cineCoreSession;

  const EXPOSE_LIST = [
    'saveCurrentSession',
    'autoSaveCurrentSetup',
    'createSettingsBackup',
    'handleRestoreRehearsalProceed',
    'handleRestoreRehearsalAbort',
    'downloadSharedProject',
    'encodeSharedSetup',
    'decodeSharedSetup',
    'applySharedSetup',
    'applySharedSetupFromUrl',
    // Added during ESM conversion to ensure UI availability
    'renderFilterDetails',
    'populateFilterDropdown',
    'populateFrameRateDropdownFor',
    'populateSlowMotionFrameRateDropdown',
    'populateSensorModeDropdown',
    'populateCodecDropdown',
    'populateRecordingResolutionDropdown'
  ];

  EXPOSE_LIST.forEach(key => {
    if (cineCoreSession[key]) {
      window[key] = cineCoreSession[key];
    }
  });

  if (cineCoreSession.__autoGearInternals) {
    window.__autoGearInternals = cineCoreSession.__autoGearInternals;
  }
}

export default cineCoreSession;
console.log('app-session.js: Execution complete (ESM)');

/* cineAppSession Shim for Persistence & Runtime Integrity */
const cineAppSession = {
  // Persistence Bindings
  saveCurrentSession,
  autoSaveCurrentSetup,
  saveCurrentGearList,
  restoreSessionState,

  // Backups
  collectFullBackupData,
  createSettingsBackup,
  captureStorageSnapshot,
  sanitizeBackupPayload,

  // Sharing & Restore
  encodeSharedSetup,
  decodeSharedSetup,
  applySharedSetup,
  applySharedSetupFromUrl,
  downloadSharedProject,
  saveProject,
  handleRestoreRehearsalProceed,
  handleRestoreRehearsalAbort,

  // Aliases for direct binding resolution if needed by name overrides
  proceed: handleRestoreRehearsalProceed,
  abort: handleRestoreRehearsalAbort,
  downloadProject: downloadSharedProject
};

if (typeof window !== 'undefined') {
  window.cineAppSession = cineAppSession;

  // Ensure specific globals expected by legacy code or direct checks are present
  // (Redundant safety for the integrity check)
  if (!window.handleRestoreRehearsalProceed) window.handleRestoreRehearsalProceed = handleRestoreRehearsalProceed;
  if (!window.handleRestoreRehearsalAbort) window.handleRestoreRehearsalAbort = handleRestoreRehearsalAbort;
  if (!window.downloadSharedProject) window.downloadSharedProject = downloadSharedProject;
}

export { cineAppSession };
