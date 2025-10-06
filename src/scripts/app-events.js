// --- EVENT LISTENERS ---
/* global updateCageSelectOptions, updateGlobalDevicesReference, scheduleProjectAutoSave,
          ensureAutoBackupsFromProjects, getDiagramManualPositions,
          setManualDiagramPositions, normalizeDiagramPositionsInput,
          normalizeSetupName, createProjectInfoSnapshotForStorage,
          applyDynamicFieldValues, applyBatteryPlateSelectionFromBattery,
          getPowerSelectionSnapshot, applyStoredPowerSelection,
          callCoreFunctionIfAvailable */

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
  if (!hasAnyDeviceSelectionSafe(currentSetup)) {
    const message =
      langTexts.alertSetupNeedsDevice ||
      fallbackTexts.alertSetupNeedsDevice ||
      'Please select at least one device before saving a project.';
    alert(message);
    return;
  }
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
      saveProject(finalName, storedProjectSnapshot);
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
        saveProject(selectedName, { projectInfo: null, gearList: '' });
      } catch (error) {
        console.warn('Failed to clear legacy project entry during setup rename', error);
      }
    }
  }

  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }

  alert(texts[currentLang].alertSetupSaved.replace("{name}", finalName));
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
      const noneOption = Array.from(select.options || []).find(opt => opt.value === "None");
      if (noneOption) {
        select.value = "None";
      } else if (select.options && select.options.length) {
        select.selectedIndex = 0;
      } else {
        select.value = "";
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
    saveProject(previousKey, previousPayload);
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
      const html = setup.gearList || storedProject?.gearList || '';
      if (html && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = html;
      }
      currentProjectInfo = setup.projectInfo || storedProject?.projectInfo || null;
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
            gearList: html
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
          saveProject(setupName, payload);
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
        const html = storedProject?.gearList || '';
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

  const autoBackupNames = Object.keys(setups)
    .filter((name) => typeof name === 'string' && name.startsWith('auto-backup-'))
    .sort();

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

// Auto-save backups every 10 minutes. Saved backups appear in the setup
// selector but do not change the currently selected setup. Intervals are
// unref'ed when possible so Node environments can exit cleanly.
function autoBackup(options = {}) {
  const setupSelectElement = getSetupSelectElement();
  if (!setupSelectElement) return null;
  const config = typeof options === 'object' && options !== null ? options : {};
  const suppressSuccess = Boolean(config.suppressSuccess);
  const suppressError = Boolean(config.suppressError);
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

  let nameForBackup = '';
  if (overrideName !== null && overrideName !== undefined) {
    if (overrideName && isAutoBackupName(overrideName)) {
      return { status: 'skipped', reason: 'auto-backup-selected' };
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
      return { status: 'skipped', reason: 'auto-backup-selected' };
    }
  } else if (normalizedSelectedName) {
    nameForBackup = normalizedSelectedName;
  } else if (normalizedTypedName) {
    nameForBackup = normalizedTypedName;
  }

  try {
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const baseName = `auto-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}`;
    const normalizedName = nameForBackup || '';
    const backupName = normalizedName ? `${baseName}-${normalizedName}` : baseName;
    const currentSetup = { ...getCurrentSetupState() };
    const setupsSnapshot = getSetups();
    const plan = determineNextAutoBackupPlan(setupsSnapshot);
    let resolvedPlan = plan;
    if (plan.snapshotType === 'delta') {
      const baseEntry = plan.base && setupsSnapshot ? setupsSnapshot[plan.base] : null;
      if (!baseEntry || typeof baseEntry !== 'object') {
        resolvedPlan = { snapshotType: 'full', base: null, sequence: 0 };
      }
    }
    let gearListHtml = getCurrentGearListHtml();
    if (!gearListHtml) {
      const activeName = (typeof setupSelectElement.value === 'string'
        ? setupSelectElement.value.trim()
        : '')
        || (setupNameInput && typeof setupNameInput.value === 'string'
          ? setupNameInput.value.trim()
          : '');
      if (activeName) {
        const setups = typeof getSetups === 'function' ? getSetups() : null;
        const storedSetup = setups && typeof setups === 'object' ? setups[activeName] : null;
        if (storedSetup && typeof storedSetup.gearList === 'string' && storedSetup.gearList.trim()) {
          gearListHtml = storedSetup.gearList;
        } else if (typeof loadProject === 'function') {
          try {
            const storedProject = loadProject(activeName);
            if (storedProject && typeof storedProject.gearList === 'string' && storedProject.gearList.trim()) {
              gearListHtml = storedProject.gearList;
            }
          } catch (error) {
            console.warn('Failed to read stored project while preparing auto backup', error);
          }
        }
      }
      if (!gearListHtml && typeof globalThis !== 'undefined' && typeof globalThis.__cineLastGearListHtml === 'string') {
        gearListHtml = globalThis.__cineLastGearListHtml;
      }
    }
    if (gearListHtml) {
      currentSetup.gearList = gearListHtml;
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
      const payload = {
        gearList: gearListHtml || '',
        projectInfo: currentSetup.projectInfo || null,
      };
      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      if (payload.gearList || payload.projectInfo || payload.autoGearRules) {
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
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    return null;
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
  const autoBackupOptions = {
    suppressSuccess: true,
    suppressError: true,
    ...(config.autoBackupOptions || {}),
  };

  let backupResult = null;
  if (typeof autoBackup === 'function') {
    try {
      backupResult = autoBackup(autoBackupOptions);
    } catch (error) {
      console.error(`Automatic backup before ${context || 'deletion'} failed`, error);
      backupResult = null;
    }
  }

  let backupName = null;
  let backupSkipped = null;
  if (typeof backupResult === 'string') {
    backupName = backupResult;
  } else if (backupResult && typeof backupResult === 'object') {
    if (backupResult.status === 'skipped') {
      backupSkipped = backupResult;
    }
    if (typeof backupResult.name === 'string' && backupResult.name) {
      backupName = backupResult.name;
    }
  }

  if (!backupName) {
    if (backupSkipped) {
      const reason = typeof backupSkipped.reason === 'string' && backupSkipped.reason
        ? backupSkipped.reason
        : 'unspecified';
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(
          `Automatic backup before ${context || 'deletion'} was skipped (${reason}). The action was cancelled to protect user data.`,
        );
      }
    }
    showNotification('error', failureMessage);
    return null;
  }

  if (config.notifySuccess !== false) {
    showNotification('success', successMessage);
  }

  return backupName;
}
const autoBackupInterval = setInterval(autoBackup, 10 * 60 * 1000);
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
          || 'Store the current project so it is never lost. Press Enter or Ctrl+S to save instantly.'
        );
      });

      cineUi.help.register('autoBackupBeforeDeletion', () => {
        const { langTexts, fallbackTexts } = getEventsLanguageTexts();
        return (
          langTexts.preDeleteBackupSuccess
          || fallbackTexts.preDeleteBackupSuccess
          || 'Automatic backup saved. Restore it anytime from Saved Projects.'
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
    const tmp = firstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(deviceData.power?.batteryPlateSupport || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    setLensMounts(deviceData.lensMount || []);
    setPowerDistribution(deviceData.power?.powerDistributionOutputs || []);
    setVideoOutputs(deviceData.videoOutputs || []);
    setFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    setTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = deviceData.power?.input?.voltageRange || '';
    const mpt = firstPowerInputType(deviceData);
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
    const vfpt = firstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || deviceData.video?.inputs || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || deviceData.video?.outputs || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = firstPowerInputType(deviceData);
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
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
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
  clearPowerDistribution();
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
  viewfinderTypeOptions = getAllViewfinderTypes();
  viewfinderConnectorOptions = getAllViewfinderConnectors();
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

      devices = result.devices; // Overwrite current devices with imported data
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
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


