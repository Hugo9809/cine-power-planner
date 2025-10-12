// --- EVENT LISTENERS ---
/* global updateCageSelectOptions, updateGlobalDevicesReference, scheduleProjectAutoSave,
          ensureAutoBackupsFromProjects, getDiagramManualPositions,
          setManualDiagramPositions, normalizeDiagramPositionsInput,
          normalizeSetupName, createProjectInfoSnapshotForStorage,
          applyDynamicFieldValues, applyBatteryPlateSelectionFromBattery,
          getPowerSelectionSnapshot, applyStoredPowerSelection,
          callCoreFunctionIfAvailable, suspendProjectPersistence,
          createProjectDeletionBackup,
          resumeProjectPersistence, lensFieldsDiv,
          setLensDeviceMountOptions, getLensDeviceMountOptions,
          clearLensDeviceMountOptions, updateMountTypeOptions,
          lensFocusScaleSelect, updateLensFocusScaleSelectOptions,
          normalizeFocusScale */

// Locate a logging helper without assuming a specific runtime. The application
// runs in browsers, service workers and occasionally Node based tooling, so we
// patiently walk through every known global scope until we find the shared
// cineLogging helper. Keeping this logic centralised makes it far easier for
// on-call engineers to diagnose sync or autosave issues when working offline.
const eventsLogger = (function resolveEventsLogger() {
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

function recordAutoBackupRun(result) {
  autoBackupThresholdInProgress = false;
  if (!result || typeof result !== 'object') {
    return;
  }
  const status = typeof result.status === 'string' ? result.status : null;
  const reason = typeof result.reason === 'string' ? result.reason : null;
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
    return () => {};
  }
  try {
    const message = resolveAutoBackupIndicatorMessage();
    const hide = indicator(message);
    return typeof hide === 'function' ? hide : () => {};
  } catch (indicatorError) {
    console.warn('Failed to show auto backup indicator', indicatorError);
    return () => {};
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
  if (!target || typeof target.addEventListener !== 'function') return;
  target.addEventListener(type, handler, options);
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
addSafeEventListener(languageSelect, "change", (event) => {
  setLanguage(event.target.value);
  if (typeof populateUserButtonDropdowns === 'function') {
    try {
      populateUserButtonDropdowns();
    } catch (userButtonError) {
      console.warn('Failed to refresh user button selectors after manual language change', userButtonError);
    }
  }
});

addSafeEventListener(skipLink, "click", () => {
  const main = document.getElementById("mainContent");
  if (main) main.focus();
});

// Filtering inputs




// Setup management
function handleSaveSetupClick() {
  const typedName = setupNameInput.value.trim();
  if (!typedName) {
    alert(texts[currentLang].alertSetupName);
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
  let finalName = typedName;
  let storedProjectSnapshot = null;

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
    try {
      if (renamingAutoBackup && finalIsAutoBackup) {
        markAutoBackupDataAsRenamed(storedProjectSnapshot);
      }
      saveProject(finalName, storedProjectSnapshot, { skipOverwriteBackup: true });
    } catch (error) {
      console.warn('Failed to preserve project data during setup rename', error);
    }
  }

  populateSetupSelect();
  setupNameInput.value = finalName;
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

  if (renamingExisting && selectedName && selectedName !== finalName) {
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
  if (typeof saveAlertTemplate === 'string' && saveAlertTemplate) {
    alert(saveAlertTemplate.replace("{name}", finalName));
  }
}

addSafeEventListener(saveSetupBtn, "click", handleSaveSetupClick);

function handleDeleteSetupClick() {
  const setupSelectElement = getSetupSelectElement();
  const setupName = setupSelectElement && typeof setupSelectElement.value === 'string'
    ? setupSelectElement.value
    : '';
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (
    confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) &&
    confirm(texts[currentLang].confirmDeleteSetupAgain)
  ) {
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
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
}

addSafeEventListener(deleteSetupBtn, "click", handleDeleteSetupClick);

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

addSafeEventListener(setupSelectTarget, "change", (event) => {
    const setupName = event.target.value;
  const typedName =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '';
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
      (setup.motors || []).forEach((val, i) => { if (motorSelects[i]) motorSelects[i].value = val; });
      (setup.controllers || []).forEach((val, i) => { if (controllerSelects[i]) controllerSelects[i].value = val; });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      applyBatteryPlateSelectionFromBattery(setup.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
      hotswapSelect.value = setup.batteryHotswap || hotswapSelect.value;
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
populateSetupSelect(); // Initial populate of setups
checkSetupChanged();

function notifyAutoSaveFromBackup(message, backupName) {
  if (typeof message !== 'string') {
    return;
  }
  const trimmed = message.trim();
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
    const baseName = `auto-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const normalizedName = nameForBackup || '';
    const backupName = normalizedName ? `${baseName}-${normalizedName}` : baseName;
    const currentSetup = { ...getCurrentSetupState() };
    const setupsSnapshot = getSetups();
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
    recordAutoBackupRun({
      status: 'success',
      name: backupName,
      createdAt: timestamp,
      context: reason,
    });
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
    recordAutoBackupRun({ status: 'error', reason: 'exception', context: reason });
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
const autoBackupInterval = setInterval(() => {
  autoBackup({ reason: 'interval' });
}, AUTO_BACKUP_INTERVAL_MS);
if (typeof autoBackupInterval.unref === 'function') {
  autoBackupInterval.unref();
}

const autoGearBackupInterval = setInterval(() => {
  if (!autoGearRulesDirtySinceBackup) return;
  createAutoGearBackup();
}, AUTO_GEAR_BACKUP_INTERVAL_MS);
if (typeof autoGearBackupInterval.unref === 'function') {
  autoGearBackupInterval.unref();
}

const hourlyBackupInterval = setInterval(() => {
  const fileName = createSettingsBackup(false);
  showNotification(
    fileName ? 'success' : 'error',
    fileName ? `Full app backup downloaded (${fileName})` : 'Full app backup failed',
  );
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

// Toggle device manager visibility
addSafeEventListener(toggleDeviceBtn, 'click', toggleDeviceManagerSection);

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
  const details = button.closest('li').querySelector('.device-details');
  const expanded = button.getAttribute('aria-expanded') === 'true';
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
  if (key === "monitors" || (data.screenSizeInches !== undefined && !key.includes("viewfinder"))) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
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

function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  const type = inferDeviceCategory(categoryKey, deviceData);
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
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : (deviceData.dtapA || '');
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
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
    setTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "lenses") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(lensFieldsDiv);
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
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const mpt = resolveFirstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = deviceData.latencyMs || '';
    monitorAudioOutputInput.value =
      deviceData.audioOutput?.portType ||
      deviceData.audioOutput?.type ||
      deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    showFormSection(viewfinderFieldsDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const vfpt = resolveFirstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = resolveFirstPowerInputType(deviceData);
    setVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setVideoOutputsIO(deviceData.videoOutputs || deviceData.video?.outputs || []);
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
    const cc = Array.isArray(deviceData.fizConnectors)
      ? deviceData.fizConnectors.map(fc => fc.type).join(', ')
      : (deviceData.fizConnector || '');
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
    wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    newSubcategorySelect.innerHTML = '';
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    newSubcategorySelect.value = subcategory || '';
    // Allow selecting a different subcategory while editing so devices can
    // be reorganised without re-creating them from scratch.
    newSubcategorySelect.disabled = false;
    buildDynamicFields(`accessories.cables.${subcategory}`, deviceData, categoryExcludedAttrs[`accessories.cables.${subcategory}`] || []);
  } else {
    const watt = typeof deviceData === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}

// Handle "Edit" and "Delete" buttons in device lists (event delegation)
addSafeEventListener(deviceManagerSection, "click", (event) => {
  const button = event.target.closest('button');
  if (!button || !deviceManagerSection.contains(button)) {
    return;
  }

  if (button.classList.contains("detail-toggle")) {
    toggleDeviceDetails(button);
  } else if (button.classList.contains("edit-btn")) {
    const name = button.dataset.name;
    const categoryKey = button.dataset.category;
    const subcategory = button.dataset.subcategory;

    // Ensure category exists in selector
    if (!Array.from(newCategorySelect.options).some(opt => opt.value === categoryKey)) {
      const opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = categoryNames[currentLang]?.[categoryKey] || categoryKey;
      newCategorySelect.appendChild(opt);
    }

    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name;
    addDeviceBtn.dataset.originalCategory = categoryKey;
    if (categoryKey === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }

    // Set form for editing
    newCategorySelect.value = categoryKey;
    newNameInput.value = name;
    // Trigger change handler so fields are cleared and rebuilt for the category
    newCategorySelect.dispatchEvent(new Event('change'));

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
    setButtonLabelWithIcon(addDeviceBtn, texts[currentLang].updateDeviceBtn, ICON_GLYPHS.save);
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
    document.getElementById("addDeviceHeading").scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (button.classList.contains("delete-btn")) {
    const name = button.dataset.name;
    const categoryKey = button.dataset.category;
    const subcategory = button.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", name))) {
      if (categoryKey === "accessories.cables") {
        delete devices.accessories.cables[subcategory][name];
      } else if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        delete devices[mainCat][subCat][name];
      } else {
        delete devices[categoryKey][name];
      }
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceLists();
      updateMountTypeOptions();
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
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

addSafeEventListener(deviceManagerSection, 'keydown', (event) => {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});

// Category selection in add device form
addSafeEventListener(newCategorySelect, "change", () => {
  const wasEditing = addDeviceBtn?.dataset.mode === "edit";
  const previousName = newNameInput ? newNameInput.value : "";
  const val = newCategorySelect.value;
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
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    const subcats = Object.keys(devices.accessories?.cables || {});
    for (const sc of subcats) {
      const opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    if (newSubcategorySelect.value) {
      buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`, {}, categoryExcludedAttrs[`accessories.cables.${newSubcategorySelect.value}`] || []);
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
  callEventsCoreFunction('clearPowerDistribution', [], { defer: true });
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
  const cancelLabel = texts[currentLang].cancelEditBtn;
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

addSafeEventListener(newSubcategorySelect, 'change', () => {
  if (newCategorySelect.value === 'accessories.cables') {
    buildDynamicFields(`accessories.cables.${newSubcategorySelect.value}`, {}, categoryExcludedAttrs[`accessories.cables.${newSubcategorySelect.value}`] || []);
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
  // Trigger change handler to reset fields and button text, guarding against
  // missing DOM elements in test environments.
  if (newCategorySelect.isConnected) {
    try {
      newCategorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}


// Add/Update device logic
addSafeEventListener(addDeviceBtn, "click", () => {
  const name = newNameInput.value.trim();
  const category = newCategorySelect.value;
  const isEditing = addDeviceBtn.dataset.mode === "edit";
  const originalName = addDeviceBtn.dataset.originalName;
  const originalCategory = addDeviceBtn.dataset.originalCategory;
  const subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  const originalSubcategory = addDeviceBtn.dataset.originalSubcategory;

  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }

  if (category === "accessories.cables" && !subcategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }

  const targetCategory = getCategoryContainer(category, subcategory, { create: true });
  if (!targetCategory) {
    alert(texts[currentLang].alertDeviceFields);
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

  // Check for duplicate name if adding, or if name changed during edit
  if ((!isEditing && targetCategory[name] !== undefined) ||
      (isEditing && (name !== originalName || (category === "accessories.cables" && subcategory !== originalSubcategory)) && targetCategory[name] !== undefined)) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }

  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    const capacity = parseFloat(newCapacityInput.value);
    const pinA = parseFloat(newPinAInput.value);
    const dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (
      isNaN(capacity) ||
      isNaN(pinA) ||
      capacity <= 0 ||
      pinA <= 0 ||
      (category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0))
    ) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA };
    } else {
      targetCategory[name] = { ...existing, capacity: capacity, pinA: pinA, dtapA: dtapA };
    }
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "accessories.cables") {
    const existing = isEditing && originalDeviceData ? { ...originalDeviceData } : {};
    targetCategory[name] = { ...existing };
    applyDynamicFieldValues(
      targetCategory[name],
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
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
    updateMountTypeOptions();
  } else if (category === "monitors" || category === "directorMonitors") {
    const watt = parseFloat(monitorWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(monitorScreenSizeInput.value);
    const brightness = parseFloat(monitorBrightnessInput.value);
    targetCategory[name] = {
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
      latencyMs: monitorWirelessTxInput.checked ? monitorLatencyInput.value : undefined,
      audioOutput: monitorAudioOutputInput.value ? { portType: monitorAudioOutputInput.value } : undefined
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "viewfinders") {
    const watt = parseFloat(viewfinderWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const screenSize = parseFloat(viewfinderScreenSizeInput.value);
    const brightness = parseFloat(viewfinderBrightnessInput.value);
    targetCategory[name] = {
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
      latencyMs: viewfinderWirelessTxInput.checked ? viewfinderLatencyInput.value : undefined
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: { input: { type: videoPowerInput.value } },
      videoInputs: getVideoInputs(),
      videoOutputs: getVideoOutputsIO(),
      frequency: videoFrequencyInput.value,
      latencyMs: videoLatencyInput.value
    };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
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
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
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
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
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
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
  } else {
    const watt = parseFloat(newWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    const existing = editingSamePath && originalDeviceData ? { ...originalDeviceData } : {};
    targetCategory[name] = { ...existing, powerDrawWatts: watt };
    applyDynamicFieldValues(targetCategory[name], category, categoryExcludedAttrs[category] || []);
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

  // After adding/updating, reset form and refresh lists
  resetDeviceForm();

  storeDevices(devices);
  viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
  viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
  updatePlateTypeOptions();
  updatePowerPortOptions();
  updatePowerDistTypeOptions();
  updatePowerDistVoltageOptions();
  updatePowerDistCurrentOptions();
  updateRecordingMediaOptions();
  updateTimecodeTypeOptions();
  refreshDeviceLists();
  // Re-populate all dropdowns to include the new/updated device
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(sel => populateSelect(sel, devices.fiz.motors, true));
  controllerSelects.forEach(sel => populateSelect(sel, devices.fiz.controllers, true));
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
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
      alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
      alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});

// Cancel editing and revert form to add mode
addSafeEventListener(cancelEditBtn, "click", () => {
  resetDeviceForm();
});

// Export device data
addSafeEventListener(exportBtn, "click", () => {
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
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

const exportAndRevertBtn = document.getElementById('exportAndRevertBtn'); 

if (exportAndRevertBtn) {
  addSafeEventListener(exportAndRevertBtn, 'click', () => {
    // Step 1: Export the current database
    if (confirm(texts[currentLang].confirmExportAndRevert)) { // Confirmation for both actions
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
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Give a small delay to ensure download prompt appears before next step
      const revertTimer = setTimeout(() => {
        // Step 2: Remove saved database and reload page so device files are re-read
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500); // 500ms delay
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    }
  });
}

// Import device data
  addSafeEventListener(importDataBtn, "click", () => {
  importFileInput.click(); // Trigger the file input click
});

  addSafeEventListener(importFileInput, "change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      const result = parseDeviceDatabaseImport(importedData);

      if (!result.devices) {
        const summary = formatDeviceImportErrors(result.errors);
        console.error('Device import validation failed:', result.errors);
        alert(summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError);
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
          console.warn('Failed to auto backup before import', error);
        }
      }

      devices = result.devices; // Overwrite current devices with imported data
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = syncCoreOptionsArray('viewfinderTypeOptions', 'getAllViewfinderTypes', viewfinderTypeOptions);
      viewfinderConnectorOptions = syncCoreOptionsArray('viewfinderConnectorOptions', 'getAllViewfinderConnectors', viewfinderConnectorOptions);
      refreshDeviceLists(); // Update device manager lists
      // Re-populate all dropdowns and update calculations
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
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
      applyFilters();
      updateCalculations();

      const deviceCount = countDeviceDatabaseEntries(devices);
      alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
      exportOutput.style.display = "block"; // Show the textarea
      exportOutput.value = JSON.stringify(devices, null, 2); // Display the newly imported data
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      const errorMessage = error && error.message ? error.message : String(error);
      const summary = formatDeviceImportErrors([errorMessage]);
      alert(summary ? `${texts[currentLang].alertImportError}\n${summary}` : texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // Clear the file input for re-selection of the same file
});


