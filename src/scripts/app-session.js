// --- SESSION STATE HANDLING ---
/* global resolveTemperatureStorageKey, TEMPERATURE_STORAGE_KEY, updateCageSelectOptions, updateAccentColorResetButtonState, normalizeAccentValue, DEFAULT_ACCENT_NORMALIZED, autoGearSearchInput, setAutoGearSearchQuery, autoGearFilterScenarioSelect, setAutoGearScenarioFilter, autoGearFilterClearButton, clearAutoGearFilters, clearUiCacheStorageEntries, __cineGlobal */

const temperaturePreferenceStorageKey =
  typeof TEMPERATURE_STORAGE_KEY === 'string'
    ? TEMPERATURE_STORAGE_KEY
    : typeof resolveTemperatureStorageKey === 'function'
      ? resolveTemperatureStorageKey()
      : 'cameraPowerPlanner_temperatureUnit';

let recordFullBackupHistoryEntryFn = () => {};
try {
  ({ recordFullBackupHistoryEntry: recordFullBackupHistoryEntryFn } = require('./storage.js'));
} catch (error) {
  if (
    typeof window !== 'undefined'
    && window
    && typeof window.recordFullBackupHistoryEntry === 'function'
  ) {
    recordFullBackupHistoryEntryFn = window.recordFullBackupHistoryEntry;
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

function saveCurrentSession(options = {}) {
  if (restoringSession || factoryResetInProgress) return;
  const info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
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
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo
  };
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
    return;
  }
  const selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({ skipGearList: true });
    checkSetupChanged();
    return;
  }
  const currentSetup = { ...getCurrentSetupState() };
  const gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  const setups = getSetups();
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
}

let projectAutoSaveTimer = null;
let factoryResetInProgress = false;

function runProjectAutoSave() {
  if (factoryResetInProgress) {
    projectAutoSaveTimer = null;
    return;
  }
  if (restoringSession) return;
  projectAutoSaveTimer = null;
  const hasSetupName = Boolean(setupNameInput && setupNameInput.value.trim());
  if (!hasSetupName) {
    saveCurrentSession();
  }
  autoSaveCurrentSetup();
  saveCurrentGearList();
}

function scheduleProjectAutoSave(immediate = false) {
  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    return;
  }
  if (restoringSession) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    return;
  }
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
  projectAutoSaveTimer = setTimeout(runProjectAutoSave, 300);
  if (
    projectAutoSaveTimer &&
    typeof projectAutoSaveTimer === 'object' &&
    typeof projectAutoSaveTimer.unref === 'function'
  ) {
    projectAutoSaveTimer.unref();
  }
}

if (projectForm) {
  projectForm.querySelectorAll('select[multiple]').forEach(sel => {
    sel.addEventListener('mousedown', e => {
      if (e.target.tagName !== 'OPTION') return;
      e.preventDefault();
      const option = e.target;
      const scrollTop = sel.scrollTop;
      option.selected = !option.selected;
      sel.dispatchEvent(new Event('change'));
      sel.focus();
      sel.scrollTop = scrollTop;
    });
    sel.addEventListener('dblclick', e => {
      e.preventDefault();
    });
  });

  projectForm.querySelectorAll('select').forEach(sel => {
    if (sel.id === 'requiredScenarios') return;
    sel.addEventListener('change', () => updateSelectIconBoxes(sel));
    updateSelectIconBoxes(sel);
  });

  const queueProjectAutoSave = () => scheduleProjectAutoSave();
  const flushProjectAutoSave = () => scheduleProjectAutoSave(true);
  projectForm.addEventListener('input', queueProjectAutoSave);
  projectForm.addEventListener('change', flushProjectAutoSave);

  projectForm.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('change', saveCurrentSession);
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
  updateFavoriteButton(select);
  adjustGearListSelectWidth(select);
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
  const state = loadSession();
  storeLoadedSetupState(state || null);
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
    setSelectValue(hotswapSelect, state.batteryHotswap);
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
  if (gearListOutput || projectRequirementsOutput) {
    const typedName = getCurrentProjectName();
    const storageKey = getCurrentProjectStorageKey();
    const fetchStoredProject = name =>
      typeof loadProject === 'function' && typeof name === 'string'
        ? loadProject(name)
        : null;
    const hasProjectPayload = project =>
      project && (project.gearList || project.projectInfo);
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
      const mergedInfo = {
        ...(storedProject.projectInfo || {}),
        ...(currentProjectInfo || {})
      };
      currentProjectInfo = mergedInfo;
      if (projectForm) populateProjectForm(currentProjectInfo);
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
        if (state) {
          setSliderBowlValue(state.sliderBowl);
          setEasyrigValue(state.easyrig);
        }
        // Ensure the generator button reflects the restored gear list state
        updateGearListButtonVisibility();
      }
    }
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  restoringSession = false;
  saveCurrentSession();
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
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
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
    const combinedHtml = (decoded.projectHtml || '') + (decoded.gearList || '');
    if (combinedHtml) {
      displayGearAndRequirements(combinedHtml);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    } else if (decoded.projectInfo || decoded.gearSelectors) {
      const html = generateGearListHtml(decoded.projectInfo || {});
      displayGearAndRequirements(html);
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
    if (decoded.projectInfo || decoded.gearSelectors || decoded.gearList) {
      const payload = {
        gearList: getCurrentGearListHtml(),
        projectInfo: decoded.projectInfo || null
      };
      const activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      let storageKey = getCurrentProjectStorageKey({ allowTyped: true });
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const selectedName = setupSelect && typeof setupSelect.value === 'string'
        ? setupSelect.value.trim()
        : '';
      if (typedName && typedName !== selectedName) {
        storageKey = typedName;
      }
      saveProject(storageKey, payload);
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

function applySharedSetupFromUrl() {
  const hasSearch =
    typeof window !== 'undefined'
    && window.location
    && typeof window.location.search === 'string';
  const search = hasSearch ? window.location.search : '';
  const shared = getQueryParam(search, 'shared');
  if (!shared) return;
  try {
    const data = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    applySharedSetup(data);
    if (typeof updateCalculations === 'function') {
      updateCalculations();
    }
    if (window.history && window.history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {
    console.error('Failed to apply shared setup from URL', e);
  }
}

// --- EVENT LISTENERS FÜR NEUBERECHNUNG ---

// Sicherstellen, dass Änderungen an den Selects auch neu berechnen
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
if (cameraSelect) {
  cameraSelect.addEventListener('change', () => {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions();
    }
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
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

motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", updateCalculations); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect, setupSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentSession); });
if (setupNameInput) {
  const handleSetupNameInput = () => {
    const typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
    const selectedName = setupSelect ? setupSelect.value : '';
    const renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    saveCurrentSession({ skipGearList: renameInProgress });
  };
  setupNameInput.addEventListener("input", handleSetupNameInput);
}

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", saveCurrentGearList); });

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", checkSetupChanged); });
if (setupNameInput) setupNameInput.addEventListener("input", checkSetupChanged);

[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect]
  .forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
motorSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
controllerSelects.forEach(sel => { if (sel) sel.addEventListener("change", autoSaveCurrentSetup); });
if (setupNameInput) setupNameInput.addEventListener("change", autoSaveCurrentSetup);

const flushProjectAutoSaveOnExit = () => {
  if (factoryResetInProgress) return;
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

// Dark mode handling
function updateThemeColor(isDark) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
  }
}

function setToggleIcon(button, glyph) {
  if (!button) return;
  let iconSpan = button.querySelector('.icon-glyph');
  if (!iconSpan) {
    iconSpan = document.createElement('span');
    iconSpan.className = 'icon-glyph';
    iconSpan.setAttribute('aria-hidden', 'true');
    button.textContent = '';
    button.appendChild(iconSpan);
  }

  const glyphConfig =
    glyph && typeof glyph === 'object' && (glyph.markup || glyph.className)
      ? glyph
      : { value: glyph };

  const classNames = ['icon-glyph'];
  if (glyphConfig.className) {
    classNames.push(glyphConfig.className);
  }
  iconSpan.className = classNames.join(' ');

  if (glyphConfig.markup) {
    iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
    iconSpan.removeAttribute('data-icon-font');
  } else {
    applyIconGlyph(iconSpan, glyphConfig.value);
  }
}

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    document.documentElement.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.documentElement.classList.remove("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.sun);
      darkModeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.body.classList.remove("dark-mode");
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.moon);
      darkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  const highContrast = isHighContrastActive();
  const accentSource = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : accentColor;
  refreshDarkModeAccentBoost({ color: accentSource, highContrast });
  updateThemeColor(enabled);
  if (settingsDarkMode) {
    settingsDarkMode.checked = enabled;
  }
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

function applyHighContrast(enabled) {
  if (enabled) {
    if (document.body) {
      document.body.classList.add("high-contrast");
    }
    document.documentElement.classList.add("high-contrast");
    applyAccentColor(accentColor);
    if (document.body && document.body.classList.contains('pink-mode')) {
      clearAccentColorOverrides();
    }
  } else {
    if (document.body) {
      document.body.classList.remove("high-contrast");
    }
    document.documentElement.classList.remove("high-contrast");
    if (document.body && document.body.classList.contains('pink-mode')) {
      clearAccentColorOverrides();
    } else {
      applyAccentColor(accentColor);
    }
  }
}

let highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);

// Pink mode handling

function stopPinkModeIconRotation() {
  if (pinkModeIconRotationTimer) {
    clearInterval(pinkModeIconRotationTimer);
    pinkModeIconRotationTimer = null;
  }
}

function triggerPinkModeIconAnimation() {
  const targets = [];
  if (pinkModeToggle) {
    const toggleIcon = pinkModeToggle.querySelector('.pink-mode-icon');
    if (toggleIcon) {
      targets.push(toggleIcon);
    }
  }
  if (pinkModeHelpIcon) {
    targets.push(pinkModeHelpIcon);
  }
  if (!targets.length) {
    return;
  }
  targets.forEach(target => {
    target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
    // Force a reflow so the animation restarts even when toggled quickly
    target.getBoundingClientRect();
    target.classList.add(PINK_MODE_ICON_ANIMATION_CLASS);
    if (PINK_MODE_ICON_ANIMATION_RESET_DELAY > 0) {
      setTimeout(() => {
        target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
      }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
    }
  });
}

function applyPinkModeIcon(iconConfig, { animate = false } = {}) {
  if (!iconConfig) return;
  if (pinkModeToggle) {
    setToggleIcon(pinkModeToggle, iconConfig);
  }
  if (pinkModeHelpIcon) {
    pinkModeHelpIcon.className = 'help-icon icon-glyph icon-svg pink-mode-icon';
    pinkModeHelpIcon.innerHTML = iconConfig.markup || '';
  }
  if (animate) {
    triggerPinkModeIconAnimation();
  }
}

function startPinkModeIconRotation() {
  const sequence = Array.isArray(pinkModeIcons.onSequence)
    ? pinkModeIcons.onSequence
    : [];
  if (!sequence.length) {
    applyPinkModeIcon(pinkModeIcons.off, { animate: false });
    return;
  }
  stopPinkModeIconRotation();
  if (!pinkModeToggle && !pinkModeHelpIcon) {
    return;
  }
  pinkModeIconIndex = 0;
  applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
  pinkModeIconRotationTimer = setInterval(() => {
    pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
    applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
  }, PINK_MODE_ICON_INTERVAL_MS);
}

function applyPinkMode(enabled) {
  if (enabled) {
    document.body.classList.add("pink-mode");
    document.documentElement.classList.add("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = true;
    }
    clearAccentColorOverrides();
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "true");
    }
    startPinkModeIconRotation();
    startPinkModeAnimatedIcons();
  } else {
    stopPinkModeAnimatedIcons();
    document.body.classList.remove("pink-mode");
    document.documentElement.classList.remove("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = false;
    }
    applyAccentColor(accentColor);
    stopPinkModeIconRotation();
    applyPinkModeIcon(pinkModeIcons.off, { animate: false });
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  if (settingsPinkMode) {
    settingsPinkMode.checked = enabled;
  }
  if (typeof updateAccentColorResetButtonState === 'function') {
    updateAccentColorResetButtonState();
  }
}

function isPinkModeActive() {
  return !!(document.body && document.body.classList.contains('pink-mode'));
}

let pinkModeEnabled = false;

let settingsInitialPinkMode = isPinkModeActive();
let settingsInitialTemperatureUnit =
  typeof temperatureUnit === 'string' ? temperatureUnit : 'celsius';

function persistPinkModePreference(enabled) {
  pinkModeEnabled = !!enabled;
  applyPinkMode(pinkModeEnabled);
  try {
    localStorage.setItem('pinkMode', pinkModeEnabled);
  } catch (e) {
    console.warn('Could not save pink mode preference', e);
  }
}

function rememberSettingsPinkModeBaseline() {
  settingsInitialPinkMode = isPinkModeActive();
}

function revertSettingsPinkModeIfNeeded() {
  if (isPinkModeActive() !== settingsInitialPinkMode) {
    persistPinkModePreference(settingsInitialPinkMode);
  }
}

function rememberSettingsTemperatureUnitBaseline() {
  if (typeof temperatureUnit === 'string') {
    settingsInitialTemperatureUnit = temperatureUnit;
  }
}

function revertSettingsTemperatureUnitIfNeeded() {
  const baseline =
    typeof settingsInitialTemperatureUnit === 'string'
      ? settingsInitialTemperatureUnit
      : 'celsius';

  if (typeof applyTemperatureUnitPreference === 'function') {
    if (temperatureUnit !== baseline) {
      applyTemperatureUnitPreference(baseline, {
        persist: false,
        forceUpdate: true
      });
    } else if (settingsTemperatureUnit) {
      settingsTemperatureUnit.value = baseline;
    }
  } else if (settingsTemperatureUnit) {
    settingsTemperatureUnit.value = baseline;
  }
}

try {
  pinkModeEnabled = localStorage.getItem('pinkMode') === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();
rememberSettingsTemperatureUnitBaseline();

if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", () => {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}

if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', () => {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}

if (settingsTemperatureUnit) {
  settingsTemperatureUnit.addEventListener('change', () => {
    applyTemperatureUnitPreference(settingsTemperatureUnit.value, {
      persist: false
    });
  });
}

if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', () => {
    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
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
    if (settingsLogoPreview) loadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      refreshAutoGearScenarioOptions();
      refreshAutoGearMatteboxOptions();
      refreshAutoGearCameraHandleOptions();
      refreshAutoGearViewfinderExtensionOptions();
      refreshAutoGearVideoDistributionOptions();
      refreshAutoGearCameraOptions();
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
  });

  if (settingsCancel) {
    settingsCancel.addEventListener('click', () => {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
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
      if (settingsShowAutoBackups) {
        const enabled = settingsShowAutoBackups.checked;
        const changed = enabled !== showAutoBackups;
        showAutoBackups = enabled;
        try {
          localStorage.setItem('showAutoBackups', enabled);
        } catch (e) {
          console.warn('Could not save auto backup visibility preference', e);
        }
        if (changed) {
          const prevValue = setupSelect ? setupSelect.value : '';
          const prevName = setupNameInput ? setupNameInput.value : '';
          populateSetupSelect();
          if (setupSelect) {
            if (showAutoBackups || !prevValue.startsWith('auto-backup-')) {
              setupSelect.value = prevValue;
            } else {
              setupSelect.value = '';
            }
          }
          if (setupNameInput) {
            setupNameInput.value = prevName;
          }
        }
      }
      if (accentColorInput) {
        const color = accentColorInput.value;
        if (!document.body.classList.contains('pink-mode')) {
          applyAccentColor(color);
        }
        try {
          if (normalizeAccentValue(color) === DEFAULT_ACCENT_NORMALIZED) {
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
      if (settingsFontSize) {
        const size = settingsFontSize.value;
        applyFontSize(size);
        try {
          localStorage.setItem('fontSize', size);
        } catch (e) {
          console.warn('Could not save font size', e);
        }
        fontSize = size;
      }
      if (settingsFontFamily) {
        const family = settingsFontFamily.value;
        applyFontFamily(family);
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
          loadStoredLogoPreview();
        }
      }
      closeAutoGearEditor();
      collapseBackupDiffSection();
      rememberSettingsPinkModeBaseline();
      rememberSettingsTemperatureUnitBaseline();
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
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
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
    revertAccentColor();
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) loadStoredLogoPreview();
    closeAutoGearEditor();
    collapseBackupDiffSection();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  });

if (autoGearAddRuleBtn) {
  autoGearAddRuleBtn.addEventListener('click', () => {
    openAutoGearEditor();
  });
}
if (autoGearResetFactoryButton) {
  autoGearResetFactoryButton.addEventListener('click', resetAutoGearRulesToFactoryAdditions);
}
if (autoGearExportButton) {
  autoGearExportButton.addEventListener('click', exportAutoGearRules);
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
      const target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-edit')) {
        openAutoGearEditor(target.dataset.ruleId || '');
      } else if (target.classList.contains('auto-gear-delete')) {
        deleteAutoGearRule(target.dataset.ruleId || '');
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
      defaultInput.addEventListener('pointerdown', refreshCatalog);
    }
    refreshCatalog();
  };
  bindAutoGearSelectorCatalogSync(autoGearAddSelectorTypeSelect, autoGearAddSelectorDefaultInput);
  bindAutoGearSelectorCatalogSync(autoGearRemoveSelectorTypeSelect, autoGearRemoveSelectorDefaultInput);
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', event => {
      const target = event.target;
      if (!target || !target.classList.contains('auto-gear-remove-entry')) return;
      const listType = target.dataset.listType;
      const itemId = target.dataset.itemId;
      if (!autoGearEditorDraft || !itemId) return;
      const list = listType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
      const index = list.findIndex(item => item.id === itemId);
      if (index >= 0) {
        list.splice(index, 1);
        renderAutoGearDraftLists();
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

function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  const id = 'backupNotificationContainer';
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  const note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  let background;
  let textColor;
  if (type === 'error' || type === 'warning') {
    const backgroundVar = type === 'error' ? '--status-error-bg' : '--status-warning-bg';
    const fallbackBackground = type === 'error' ? '#fdd' : '#ffd';
    background = getCssVariableValue(backgroundVar, fallbackBackground);
    const textColorVar = type === 'error' ? '--status-error-text-color' : '--status-warning-text-color';
    textColor = getCssVariableValue(textColorVar, '#000');
  } else {
    background = createAccentTint() || getCssVariableValue('--status-success-bg', '#dfd');
    textColor = getCssVariableValue('--status-success-text-color', '#000');
  }
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

function formatFullBackupFilename(date) {
  const safeDate = date instanceof Date && !Number.isNaN(date.valueOf())
    ? date
    : new Date();
  const pad = n => String(n).padStart(2, '0');
  const year = safeDate.getFullYear();
  const month = pad(safeDate.getMonth() + 1);
  const day = pad(safeDate.getDate());
  const hours = pad(safeDate.getHours());
  const minutes = pad(safeDate.getMinutes());
  const seconds = pad(safeDate.getSeconds());
  const offsetMinutes = safeDate.getTimezoneOffset();
  let offsetSuffix = 'Z';
  if (offsetMinutes !== 0) {
    const sign = offsetMinutes > 0 ? '-' : '+';
    const abs = Math.abs(offsetMinutes);
    const offsetHours = pad(Math.floor(abs / 60));
    const offsetMins = pad(abs % 60);
    offsetSuffix = `${sign}${offsetHours}:${offsetMins}`;
  }
  const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSuffix}`;
  const safeIso = iso.replace(/[:]/g, '-');
  return {
    iso,
    fileName: `${safeIso} full app backup.json`,
  };
}

function resolveSafeLocalStorage() {
  if (typeof getSafeLocalStorage === 'function') {
    try {
      const storage = getSafeLocalStorage();
      if (storage) {
        return storage;
      }
    } catch (error) {
      console.warn('Unable to obtain safe local storage reference', error);
    }
  }
  if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
    return SAFE_LOCAL_STORAGE;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
}

function captureStorageSnapshot(storage) {
  const snapshot = Object.create(null);
  if (!storage) return snapshot;
  try {
    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      const length = storage.length;
      for (let i = 0; i < length; i++) {
        const key = storage.key(i);
        if (typeof key !== 'string') continue;
        snapshot[key] = storage.getItem(key);
      }
    } else if (typeof storage.keys === 'function') {
      const keys = storage.keys();
      keys.forEach((key) => {
        if (typeof key !== 'string') return;
        snapshot[key] = storage.getItem(key);
      });
    } else if (typeof storage.forEach === 'function') {
      storage.forEach((value, key) => {
        if (typeof key !== 'string') return;
        snapshot[key] = value;
      });
    }
  } catch (error) {
    console.warn('Failed to snapshot storage', error);
  }
  return snapshot;
}

function createSafeStorageReader(storage, errorMessagePrefix) {
  if (!storage || typeof storage.getItem !== 'function') {
    return () => null;
  }

  const message = typeof errorMessagePrefix === 'string' && errorMessagePrefix
    ? errorMessagePrefix
    : 'Failed to read storage key';

  return (key) => {
    if (typeof key !== 'string') {
      return null;
    }
    try {
      return storage.getItem(key);
    } catch (error) {
      console.warn(`${message}`, key, error);
      return null;
    }
  };
}

function restoreSessionStorageSnapshot(snapshot) {
  if (typeof sessionStorage === 'undefined' || !sessionStorage) {
    return;
  }

  const entries = snapshot && typeof snapshot === 'object'
    ? Object.entries(snapshot)
    : [];
  const retainedKeys = new Set(entries.map(([key]) => key));

  const keysToRemove = [];
  try {
    const { length } = sessionStorage;
    for (let i = 0; i < length; i += 1) {
      const key = sessionStorage.key(i);
      if (typeof key !== 'string') continue;
      if (!retainedKeys.has(key)) {
        keysToRemove.push(key);
      }
    }
  } catch (error) {
    console.warn('Failed to inspect sessionStorage during restore rollback', error);
  }

  keysToRemove.forEach((key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (removeError) {
      console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
    }
  });

  entries.forEach(([key, value]) => {
    if (typeof key !== 'string') return;
    try {
      sessionStorage.setItem(key, typeof value === 'string' ? value : String(value));
    } catch (setError) {
      console.warn('Failed to reapply sessionStorage key during restore rollback', key, setError);
    }
  });
}

function sanitizeBackupPayload(raw) {
  if (raw === null || raw === undefined) {
    return '';
  }

  let text;
  if (typeof raw === 'string') {
    text = raw;
  } else {
    try {
      text = String(raw);
    } catch (error) {
      console.warn('Failed to stringify backup payload', error);
      text = '';
    }
  }

  if (typeof text !== 'string') {
    return '';
  }

  if (text.startsWith('\uFEFF')) {
    return text.replace(/^\uFEFF/, '');
  }

  return text;
}

const BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_'];
const BACKUP_STORAGE_KNOWN_KEYS = new Set([
  'darkMode',
  'pinkMode',
  'highContrast',
  'showAutoBackups',
  'accentColor',
  'fontSize',
  'fontFamily',
  'customLogo',
  'language',
  IOS_PWA_HELP_STORAGE_KEY,
]);
const BACKUP_METADATA_BASE_KEYS = new Set([
  'settings',
  'storage',
  'localStorage',
  'values',
  'entries',
  'sessionStorage',
  'sessionState',
  'sessionEntries',
  'payload',
  'plannerData',
  'allData',
  'generatedAt',
  'version',
  'appVersion',
  'applicationVersion',
]);
const BACKUP_DATA_KEYS = [
  'devices',
  'setups',
  'session',
  'feedback',
  'project',
  'projects',
  'gearList',
  'favorites',
  'autoGearRules',
  'autoGearSeeded',
  'autoGearBackups',
  'autoGearPresets',
  'autoGearActivePresetId',
  'autoGearAutoPresetId',
  'autoGearShowBackups',
  'customLogo',
  'customFonts',
  'preferences',
  'schemaCache',
  'fullBackupHistory',
  'fullBackups',
];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeStoredValue(value) {
  if (typeof value === 'string') return value;
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.warn('Failed to serialize stored value for backup compatibility', error);
      return '';
    }
  }
  try {
    return String(value);
  } catch (error) {
    console.warn('Failed to normalize stored value for backup compatibility', error);
    return '';
  }
}

function convertEntriesToSnapshot(section) {
  if (!section) return null;

  let source = section;
  if (typeof source === 'string') {
    let parsed = null;
    try {
      parsed = JSON.parse(source);
    } catch (error) {
      parsed = null;
    }
    if (parsed && (Array.isArray(parsed) || isPlainObject(parsed))) {
      source = parsed;
    } else {
      return null;
    }
  }

  const snapshot = Object.create(null);
  const assignEntry = (key, value) => {
    if (typeof key !== 'string' || !key) return;
    snapshot[key] = normalizeStoredValue(value);
  };

  if (Array.isArray(source)) {
    source.forEach(entry => {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (typeof entry === 'object') {
        if (typeof entry.key === 'string') {
          assignEntry(entry.key, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
          return;
        }
        if (typeof entry.name === 'string') {
          assignEntry(entry.name, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
          return;
        }
        if (Array.isArray(entry.entry)) {
          assignEntry(entry.entry[0], entry.entry[1]);
        }
      }
    });
  } else if (isPlainObject(source)) {
    Object.entries(source).forEach(([key, value]) => {
      assignEntry(key, value);
    });
  } else {
    return null;
  }

  return Object.keys(snapshot).length ? snapshot : null;
}

function extractFirstMatchingSnapshot(source, keys) {
  if (!isPlainObject(source)) return { snapshot: null, keyUsed: null };
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const snapshot = convertEntriesToSnapshot(source[key]);
    if (snapshot) {
      return { snapshot, keyUsed: key };
    }
  }
  return { snapshot: null, keyUsed: null };
}

function looksLikeStoredSettingKey(key) {
  if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
    return true;
  }
  return BACKUP_STORAGE_KEY_PREFIXES.some(prefix => key.startsWith(prefix));
}

function restoreLocalStorageSnapshot(storage, snapshot) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }

  const entries = snapshot && typeof snapshot === 'object'
    ? Object.entries(snapshot)
    : [];
  const targetKeys = new Set(entries.map(([key]) => key));

  const keysToRemove = [];
  try {
    const { length } = storage;
    for (let i = 0; i < length; i += 1) {
      const key = storage.key(i);
      if (typeof key !== 'string') continue;
      if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
        keysToRemove.push(key);
      }
    }
  } catch (error) {
    console.warn('Failed to inspect storage during restore rollback', error);
  }

  keysToRemove.forEach((key) => {
    try {
      storage.removeItem(key);
    } catch (removeError) {
      console.warn('Failed to remove storage key during restore rollback', key, removeError);
    }
  });

  entries.forEach(([key, value]) => {
    if (typeof key !== 'string') return;
    try {
      if (value === null || value === undefined) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, typeof value === 'string' ? value : String(value));
      }
    } catch (setError) {
      console.warn('Failed to reapply storage key during restore rollback', key, setError);
    }
  });
}

function buildLegacyStorageFromRoot(source, metadataKeys) {
  if (!isPlainObject(source)) return null;
  const snapshot = Object.create(null);
  Object.entries(source).forEach(([key, value]) => {
    if (metadataKeys.has(key)) return;
    if (!looksLikeStoredSettingKey(key)) return;
    snapshot[key] = normalizeStoredValue(value);
  });
  return Object.keys(snapshot).length ? snapshot : null;
}

function extractBackupSections(raw) {
  const parsed = isPlainObject(raw) ? raw : {};
  const versionValue =
    typeof parsed.version === 'string'
      ? parsed.version
      : typeof parsed.appVersion === 'string'
        ? parsed.appVersion
        : typeof parsed.applicationVersion === 'string'
          ? parsed.applicationVersion
          : undefined;

  const settingsResult = extractFirstMatchingSnapshot(parsed, [
    'settings',
    'localStorage',
    'storage',
    'storedSettings',
    'values',
    'entries',
  ]);
  const sessionResult = extractFirstMatchingSnapshot(parsed, [
    'sessionStorage',
    'session',
    'sessions',
    'sessionState',
    'sessionEntries',
  ]);

  const metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
  if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
  if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);

  const settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
  const sessionSnapshot = sessionResult.snapshot;

  let dataSection = null;
  for (const key of ['data', 'payload', 'plannerData', 'allData']) {
    if (isPlainObject(parsed[key])) {
      dataSection = parsed[key];
      break;
    }
  }
  if (!dataSection) {
    const fallback = {};
    BACKUP_DATA_KEYS.forEach(key => {
      if (metadataKeys.has(key)) return;
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        fallback[key] = parsed[key];
      }
    });
    if (Object.keys(fallback).length) {
      dataSection = fallback;
    }
  }

  return {
    fileVersion: versionValue,
    settings: settingsSnapshot,
    sessionStorage: sessionSnapshot,
    data: isPlainObject(dataSection) ? dataSection : null,
  };
}

function triggerBackupDownload(url, fileName) {
  if (typeof document === 'undefined') {
    return false;
  }

  let anchor;
  try {
    anchor = document.createElement('a');
  } catch (error) {
    console.warn('Failed to create backup download link', error);
    return false;
  }

  if (!anchor || typeof anchor.click !== 'function' || !('download' in anchor)) {
    return false;
  }

  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = 'noopener';

  if (anchor.style) {
    try {
      if (typeof anchor.style.setProperty === 'function') {
        anchor.style.setProperty('display', 'none');
      } else {
        anchor.style.display = 'none';
      }
    } catch (styleError) {
      void styleError;
    }
  }

  const parent = document.body || document.documentElement || document.head;
  let appended = false;
  if (parent && typeof parent.appendChild === 'function') {
    try {
      parent.appendChild(anchor);
      appended = true;
    } catch (appendError) {
      void appendError;
    }
  }

  try {
    anchor.click();
  } catch (clickError) {
    console.warn('Failed to trigger backup download link', clickError);
    if (appended && anchor.parentNode && typeof anchor.parentNode.removeChild === 'function') {
      try {
        anchor.parentNode.removeChild(anchor);
      } catch (removeError) {
        void removeError;
      }
    }
    return false;
  }

  if (appended && anchor.parentNode && typeof anchor.parentNode.removeChild === 'function') {
    try {
      anchor.parentNode.removeChild(anchor);
    } catch (removeError2) {
      void removeError2;
    }
  }

  return true;
}

function encodeBackupDataUrl(payload) {
  try {
    return `data:application/json;charset=utf-8,${encodeURIComponent(payload)}`;
  } catch (error) {
    console.warn('Failed to encode backup data URL', error);
    return null;
  }
}

function getManualDownloadFallbackMessage() {
  if (typeof texts === 'object' && texts) {
    const lang = typeof currentLang === 'string' && texts[currentLang]
      ? currentLang
      : 'en';
    const langTexts = texts[lang] || texts.en || {};
    const fallback = langTexts.manualDownloadFallback || texts.en?.manualDownloadFallback;
    if (fallback) {
      return fallback;
    }
  }
  return 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
}

function getManualDownloadCopyHint() {
  if (typeof texts === 'object' && texts) {
    const lang = typeof currentLang === 'string' && texts[currentLang]
      ? currentLang
      : 'en';
    const langTexts = texts[lang] || texts.en || {};
    const fallback = langTexts.manualDownloadCopyHint || texts.en?.manualDownloadCopyHint;
    if (fallback) {
      return fallback;
    }
  }
  return 'Select all the text below and copy it to store the file safely.';
}

function openBackupFallbackWindow(payload, fileName) {
  if (typeof window === 'undefined' || typeof window.open !== 'function') {
    return false;
  }

  let backupWindow = null;
  try {
    backupWindow = window.open('', '_blank');
  } catch (openError) {
    console.warn('Failed to open manual backup window', openError);
    backupWindow = null;
  }

  if (!backupWindow) {
    return false;
  }

  try {
    const doc = backupWindow.document;
    if (!doc) {
      return false;
    }

    const langAttr = document && document.documentElement && document.documentElement.getAttribute
      ? document.documentElement.getAttribute('lang')
      : 'en';
    doc.open();
    doc.write(`<!DOCTYPE html><html lang="${langAttr || 'en'}"><head><meta charset="utf-8"><title>Manual download</title></head><body></body></html>`);
    doc.close();

    try {
      doc.title = fileName || 'backup.json';
    } catch (titleError) {
      void titleError;
    }

    const body = doc.body;
    if (!body) {
      return false;
    }

    body.style.margin = '0';
    body.style.padding = '1.5rem';
    body.style.background = '#f8f9fb';
    body.style.color = '#0f172a';
    body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

    const container = doc.createElement('div');
    container.style.maxWidth = '960px';
    container.style.margin = '0 auto';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const heading = doc.createElement('h1');
    heading.textContent = fileName || 'Manual backup';
    heading.style.margin = '0';
    heading.style.fontSize = '1.5rem';
    heading.style.fontWeight = '600';

    const description = doc.createElement('p');
    description.textContent = getManualDownloadFallbackMessage();
    description.style.margin = '0';
    description.style.lineHeight = '1.5';

    const helper = doc.createElement('p');
    helper.textContent = getManualDownloadCopyHint();
    helper.style.margin = '0';
    helper.style.lineHeight = '1.5';

    const textArea = doc.createElement('textarea');
    textArea.value = payload;
    textArea.readOnly = true;
    textArea.spellcheck = false;
    textArea.style.width = '100%';
    textArea.style.height = '70vh';
    textArea.style.resize = 'vertical';
    textArea.style.padding = '1rem';
    textArea.style.borderRadius = '1rem';
    textArea.style.border = '1px solid rgba(15, 23, 42, 0.15)';
    textArea.style.background = '#ffffff';
    textArea.style.fontFamily = "'SFMono-Regular', 'Roboto Mono', 'Menlo', 'Courier New', monospace";
    textArea.style.fontSize = '0.875rem';
    textArea.style.lineHeight = '1.5';
    textArea.style.boxShadow = '0 0.75rem 2.5rem rgba(15, 23, 42, 0.16)';

    container.appendChild(heading);
    container.appendChild(description);
    container.appendChild(helper);
    container.appendChild(textArea);
    body.appendChild(container);

    try {
      textArea.focus();
      textArea.select();
    } catch (focusError) {
      void focusError;
    }

    try {
      backupWindow.focus();
    } catch (focusWindowError) {
      void focusWindowError;
    }

    return true;
  } catch (renderError) {
    console.warn('Failed to render manual backup window', renderError);
    return false;
  }
}

function downloadBackupPayload(payload, fileName) {
  const failureResult = { success: false, method: null };

  if (typeof payload !== 'string') {
    return failureResult;
  }

  let blob = null;
  if (typeof Blob !== 'undefined') {
    try {
      blob = new Blob([payload], { type: 'application/json' });
    } catch (blobError) {
      console.warn('Failed to create backup blob', blobError);
      blob = null;
    }
  }

  if (blob) {
    if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
      try {
        navigator.msSaveOrOpenBlob(blob, fileName);
        return { success: true, method: 'ms-save' };
      } catch (msError) {
        console.warn('Saving backup via msSaveOrOpenBlob failed', msError);
      }
    }

    if (typeof URL !== 'undefined' && URL && typeof URL.createObjectURL === 'function') {
      let objectUrl = null;
      try {
        objectUrl = URL.createObjectURL(blob);
      } catch (urlError) {
        console.warn('Failed to create backup object URL', urlError);
        objectUrl = null;
      }

      if (objectUrl) {
        const triggered = triggerBackupDownload(objectUrl, fileName);
        try {
          if (typeof URL.revokeObjectURL === 'function') {
            URL.revokeObjectURL(objectUrl);
          }
        } catch (revokeError) {
          console.warn('Failed to revoke backup object URL', revokeError);
        }

        if (triggered) {
          return { success: true, method: 'object-url' };
        }
      }
    }
  }

  const dataUrl = encodeBackupDataUrl(payload);
  if (dataUrl) {
    const triggered = triggerBackupDownload(dataUrl, fileName);
    if (triggered) {
      return { success: true, method: 'data-url' };
    }
  }

  if (openBackupFallbackWindow(payload, fileName)) {
    return { success: true, method: 'window-fallback' };
  }

  return failureResult;
}

// --- Backup diff viewer ---
const SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

let backupDiffOptionsCache = [];
const backupDiffState = {
  baseline: '',
  comparison: '',
};

function getDiffText(key, fallbackValue = '') {
  const langTexts = texts && typeof currentLang === 'string' ? texts[currentLang] : null;
  const fallbackTexts = texts && texts.en ? texts.en : {};
  if (langTexts && Object.prototype.hasOwnProperty.call(langTexts, key)) {
    const value = langTexts[key];
    if (typeof value === 'string' && value) {
      return value;
    }
  }
  if (fallbackTexts && Object.prototype.hasOwnProperty.call(fallbackTexts, key)) {
    const value = fallbackTexts[key];
    if (typeof value === 'string' && value) {
      return value;
    }
  }
  return fallbackValue;
}

function formatNumberForComparison(value) {
  const lang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
  try {
    return new Intl.NumberFormat(lang).format(value);
  } catch (error) {
    if (lang !== 'en') {
      try {
        return new Intl.NumberFormat('en').format(value);
      } catch (fallbackError) {
        console.warn('Number formatting failed for comparison summary', error, fallbackError);
        return String(value);
      }
    }
    console.warn('Number formatting failed for comparison summary', error);
    return String(value);
  }
}

function isAutoBackupName(name) {
  return typeof name === 'string'
    && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)
      || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
}

function parseAutoBackupName(name) {
  if (typeof name !== 'string') {
    return null;
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
    const remainder = name.slice(SESSION_AUTO_BACKUP_DELETION_PREFIX.length);
    const parts = remainder.split('-');
    if (parts.length >= 6) {
      const [year, month, day, hour, minute, second, ...rest] = parts;
      const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
      );
      const label = rest.join('-').trim();
      return {
        type: 'auto-backup-before-delete',
        date: Number.isNaN(date.valueOf()) ? null : date,
        label,
        includeSeconds: true,
      };
    }
  } else if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
    const remainder = name.slice(SESSION_AUTO_BACKUP_NAME_PREFIX.length);
    const parts = remainder.split('-');
    if (parts.length >= 5) {
      const [year, month, day, hour, minute, ...rest] = parts;
      const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
      );
      const label = rest.join('-').trim();
      return {
        type: 'auto-backup',
        date: Number.isNaN(date.valueOf()) ? null : date,
        label,
        includeSeconds: false,
      };
    }
  }
  return null;
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

function formatComparisonOptionLabel(name) {
  if (typeof name !== 'string') {
    return '';
  }
  const parsed = parseAutoBackupName(name);
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
  const setups = getSetups();
  if (!setups || typeof setups !== 'object') {
    return [];
  }
  return Object.keys(setups)
    .filter(name => typeof name === 'string' && name)
    .map(name => ({
      value: name,
      label: formatComparisonOptionLabel(name),
      data: setups[name],
    }))
    .sort((a, b) => {
      const autoA = isAutoBackupName(a.value);
      const autoB = isAutoBackupName(b.value);
      if (autoA !== autoB) {
        return autoA ? 1 : -1;
      }
      return localeSort(a.label, b.label);
    });
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

function formatDiffPath(parts) {
  if (!Array.isArray(parts) || !parts.length) {
    return getDiffText('versionCompareRootPath', 'Entire setup');
  }
  return parts.map(part => {
    if (typeof part !== 'string') {
      return String(part);
    }
    return part;
  }).join(' › ');
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

function createDiffValueElement(value) {
  const element = document.createElement('pre');
  element.className = 'diff-value';
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

function createDiffChangeBlock(labelText, value) {
  const block = document.createElement('div');
  block.className = 'diff-change';
  const label = document.createElement('span');
  label.className = 'diff-label';
  label.textContent = labelText;
  block.appendChild(label);
  block.appendChild(createDiffValueElement(value));
  return block;
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
  entries.forEach(entry => {
    const item = document.createElement('li');
    item.className = `diff-entry diff-${entry.type}`;
    const path = document.createElement('div');
    path.className = 'diff-path';
    path.textContent = formatDiffPath(entry.path);
    item.appendChild(path);
    if (entry.type === 'changed') {
      const status = document.createElement('span');
      status.className = 'diff-label diff-status';
      status.textContent = getDiffText('versionCompareChangeUpdated', 'Updated');
      item.appendChild(status);
      item.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeRemoved', 'Removed'),
        entry.before,
      ));
      item.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeAdded', 'Added'),
        entry.after,
      ));
    } else if (entry.type === 'added') {
      item.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeAdded', 'Added'),
        entry.after,
      ));
    } else if (entry.type === 'removed') {
      item.appendChild(createDiffChangeBlock(
        getDiffText('versionCompareChangeRemoved', 'Removed'),
        entry.before,
      ));
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
    return JSON.parse(JSON.stringify(value));
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
    appVersion: typeof APP_VERSION === 'string' ? APP_VERSION : null,
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

function createSettingsBackup(notify = true, timestamp = new Date()) {
  try {
    const isEvent = notify && typeof notify === 'object' && typeof notify.type === 'string';
    const shouldNotify = isEvent ? true : Boolean(notify);
    const { iso, fileName } = formatFullBackupFilename(timestamp);
    const safeStorage = resolveSafeLocalStorage();
    const settings = captureStorageSnapshot(safeStorage);
    const sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    const backup = {
      version: APP_VERSION,
      generatedAt: iso,
      settings,
      sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
      data: typeof exportAllData === 'function' ? exportAllData() : {},
    };
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

if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', () => restoreSettingsInput.click());
  restoreSettingsInput.addEventListener('change', () => {
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
        loadStoredLogoPreview();
      } catch (logoError) {
        console.warn('Failed to refresh logo preview after restore failure', logoError);
      }
      try {
        syncAutoGearRulesFromStorage();
      } catch (rulesError) {
        console.warn('Failed to resync automatic gear rules after restore failure', rulesError);
      }
      const safeGetItem = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
      const preferenceState = applyPreferencesFromStorage(safeGetItem);
      showAutoBackups = preferenceState.showAutoBackups;
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
      if (preferenceState.language) {
        try {
          setLanguage(preferenceState.language);
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
        if (fileVersion !== APP_VERSION) {
          alert(`${texts[currentLang].restoreVersionWarning} (${fileVersion || 'unknown'} → ${APP_VERSION})`);
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
          loadStoredLogoPreview();
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
        const safeGetItem = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
        const preferenceState = applyPreferencesFromStorage(safeGetItem);
        showAutoBackups = preferenceState.showAutoBackups;
        populateSetupSelect();
        restoreSetupSelection(previousSelection, showAutoBackups);
        if (settingsShowAutoBackups) {
          settingsShowAutoBackups.checked = showAutoBackups;
        }
        if (preferenceState.language) {
          setLanguage(preferenceState.language);
        }
        alert(texts[currentLang].restoreSuccess);
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
  });
}

function resetPlannerStateAfterFactoryReset() {
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
    if (typeof loadStoredLogoPreview === 'function') {
      loadStoredLogoPreview();
    }
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
        fontSize = '16';
        applyFontSize(fontSize);
        if (settingsFontSize) {
          settingsFontSize.value = fontSize;
        }
      } catch (fontSizeError) {
        console.warn('Failed to reset font size during factory reset', fontSizeError);
      }
      try {
        fontFamily = "'Ubuntu', sans-serif";
        applyFontFamily(fontFamily);
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

async function clearCachesAndReload() {
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
      if (typeof window !== 'undefined' && window.location) {
        const { location } = window;
        const hasReplace = location && typeof location.replace === 'function';
        const hasReload = location && typeof location.reload === 'function';
        let navigationTriggered = false;
        if (hasReplace) {
          const paramName = 'forceReload';
          const timestamp = Date.now().toString(36);
          let href = location.href || '';
          let hash = '';
          const hashIndex = href.indexOf('#');
          if (hashIndex !== -1) {
            hash = href.slice(hashIndex);
            href = href.slice(0, hashIndex);
          }
          const pattern = new RegExp('([?&])' + paramName + '=[^&]*');
          const replacement = '$1' + paramName + '=' + timestamp;
          if (pattern.test(href)) {
            href = href.replace(pattern, replacement);
          } else if (href.indexOf('?') !== -1) {
            href += '&' + paramName + '=' + timestamp;
          } else if (href) {
            href += '?' + paramName + '=' + timestamp;
          }
          location.replace(href + hash);
          navigationTriggered = true;
        }
        if (!navigationTriggered && hasReload) {
          location.reload();
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

if (downloadDiagramBtn) {
  downloadDiagramBtn.addEventListener('click', (e) => {
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

if (gridSnapToggleBtn) {
  gridSnapToggleBtn.addEventListener('click', () => {
    gridSnap = !gridSnap;
    gridSnapToggleBtn.classList.toggle('active', gridSnap);
    gridSnapToggleBtn.setAttribute('aria-pressed', gridSnap ? 'true' : 'false');
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
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

  const focusFeatureElement = element => {
    if (!element) return;

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
      settingsButton?.click?.();
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
      button.className = 'help-quick-link';
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
    normalized = normalizeSpellingVariants(normalized);
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
    if (!helpResultsSummary) return;
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
    if (helpNoResults) {
      // Show or hide the "no results" indicator
      if (visibleCount > 0) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
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

  const collectHoverHelpText = el => {
    if (!el) return [];
    const parts = [];
    const addText = value => {
      if (typeof value !== 'string') return;
      const trimmed = value.trim();
      if (!trimmed) return;
      if (!parts.includes(trimmed)) parts.push(trimmed);
    };

    const addTextFromElement = (element, { includeTextContent = false } = {}) => {
      if (!element) return;
      addText(element.getAttribute('data-help'));
      addText(element.getAttribute('aria-label'));
      addText(element.getAttribute('aria-description'));
      addText(element.getAttribute('title'));
      if (includeTextContent) {
        addText(element.textContent);
      }
    };

    addTextFromElement(el);

    const applyFromIds = ids => {
      if (!ids) return;
      ids
        .split(/\s+/)
        .filter(Boolean)
        .forEach(id => {
          const ref = document.getElementById(id);
          if (!ref) return;
          addTextFromElement(ref, { includeTextContent: true });
        });
    };

    applyFromIds(el.getAttribute('aria-labelledby'));
    addText(el.getAttribute('alt'));
    applyFromIds(el.getAttribute('aria-describedby'));

    findAssociatedLabelElements(el).forEach(labelEl => {
      addTextFromElement(labelEl, { includeTextContent: true });
    });

    if (!parts.length) {
      addText(el.textContent);
    }

    return parts;
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

    let top = safeBottom + scrollY + verticalOffset;
    let left = safeLeft + scrollX;

    if (tooltipWidth) {
      const viewportRightLimit = scrollX + viewportWidth - viewportPadding;
      const defaultRight = left + tooltipWidth;
      if (defaultRight > viewportRightLimit) {
        left = safeRight + scrollX - tooltipWidth - horizontalOffset;
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
        const aboveTop = safeTop + scrollY - tooltipHeight - verticalOffset;
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
  };

  const updateHoverHelpTooltip = target => {
    hoverHelpCurrentTarget = target || null;
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    const textParts = collectHoverHelpText(target);
    if (!textParts.length) {
      hideHoverHelpTooltip();
      return;
    }
    hoverHelpTooltip.textContent = textParts.join(' ');
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
    const target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });

  document.addEventListener('focusin', e => {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
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
    featureSearch.showPicker?.();
  };

  runFeatureSearch = query => {
    const rawQuery = typeof query === 'string' ? query : featureSearch?.value || '';
    const originalNormalized = normalizeSearchValue(rawQuery);
    const value = rawQuery.trim();
    if (!value) return;
    const lower = value.toLowerCase();
    const isHelp = lower.endsWith(' (help)');
    const clean = isHelp ? value.slice(0, -7).trim() : value;
    const cleanKey = searchKey(clean);
    const cleanTokens = searchTokens(clean);

    const helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    const deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    const featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    const helpScore = helpMatch?.score || 0;
    const deviceScore = deviceMatch?.score || 0;
    const featureScore = featureMatch?.score || 0;
    const deviceStrong = deviceMatch ? STRONG_SEARCH_MATCH_TYPES.has(deviceMatch.matchType) : false;
    const featureStrong = featureMatch ? STRONG_SEARCH_MATCH_TYPES.has(featureMatch.matchType) : false;
    const bestNonHelpScore = Math.max(deviceScore, featureScore);
    const hasStrongNonHelp = deviceStrong || featureStrong;
    const preferHelp =
      !!helpMatch &&
      (isHelp || (!hasStrongNonHelp && helpScore > bestNonHelpScore));

    if (!isHelp && !preferHelp) {
      const shouldUseDevice =
        !!deviceMatch &&
        (!featureMatch ||
          (deviceStrong && !featureStrong) ||
          (deviceStrong === featureStrong &&
            (deviceScore > featureScore ||
              (deviceScore === featureScore && featureMatch?.matchType !== 'exactKey'))));
      if (shouldUseDevice) {
        const device = deviceMatch.value;
        if (device && device.select) {
          device.select.value = device.value;
          device.select.dispatchEvent(new Event('change', { bubbles: true }));
          if (device.label) {
            updateFeatureSearchValue(device.label, originalNormalized);
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
      if (featureMatch) {
        const feature = featureMatch.value;
        const featureEl = feature?.element || feature;
        if (featureEl) {
          const label = feature?.label || featureEl.textContent?.trim();
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
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
    const handle = () => runFeatureSearch(featureSearch.value);
    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('input', () => {
      updateFeatureSearchSuggestions(featureSearch.value);
      featureSearch.showPicker?.();
    });
    featureSearch.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape' && featureSearch.value) {
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        featureSearch.showPicker?.();
        e.preventDefault();
      }
    });
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

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
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
      revertAccentColor();
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
      (e.key.toLowerCase() === 'h' && !isTextField)
    ) {
      // Plain ? or H opens the dialog when not typing in a field
      e.preventDefault();
      toggleHelp();
    } else if (
      isDialogOpen(helpDialog) &&
      ((e.key === '/' && !isTextField) || (e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey)))
    ) {
      // When the dialog is open, / or Ctrl+F moves focus to the search box
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
    } else if (e.key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (settingsButton) settingsButton.click();
    } else if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key.toLowerCase() === 'd' && !isTextField) {
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
    } else if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (e.key.toLowerCase() === 'p' && !isTextField) {
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
  if (sharedLinkRow) {
    sharedLinkRow.classList.remove('hidden');
  }
  populateEnvironmentDropdowns();
  populateLensDropdown();
  populateFilterDropdown();
  if (filterSelectElem) {
    filterSelectElem.addEventListener('change', renderFilterDetails);
    filterSelectElem.addEventListener('change', () => {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  document.querySelectorAll('#projectForm select')
    .forEach(sel => {
      attachSelectSearch(sel);
      initFavoritableSelect(sel);
    });
  setupInstallBanner();
  setLanguage(currentLang);
  maybeShowIosPwaHelp();
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

function populateEnvironmentDropdowns() {
  const tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    ensureFeedbackTemperatureOptions(tempSelect);
    updateFeedbackTemperatureOptions();
  }

}

function populateLensDropdown() {
  if (!lensSelect) return;

  lensSelect.innerHTML = '';
  const lensData = devices && devices.lenses;

  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }

  if (!lensSelect.multiple) {
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(name => {
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
    lensSelect.appendChild(opt);
  });
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
  if (filterSelectElem && devices && Array.isArray(devices.filterOptions)) {
    if (!filterSelectElem.multiple) {
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      filterSelectElem.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      filterSelectElem.appendChild(opt);
    });
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

function createFilterSizeSelect(type, selected = DEFAULT_FILTER_SIZE, options = {}) {
  const { includeId = true, idPrefix = 'filter-size-' } = options;
  const sel = document.createElement('select');
  if (includeId) {
    sel.id = `${idPrefix}${filterId(type)}`;
  }
  let sizes = [DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [DEFAULT_FILTER_SIZE, '6x6', '95mm'];
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
  opts.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    syncOption(opt, selectedVals.includes(o));
    sel.appendChild(opt);
  });
  // Hidden select holds the values; checkboxes provide the UI
  sel.size = opts.length;
  sel.style.display = 'none';
  const container = document.createElement('span');
  container.className = 'filter-values-container';
  const checkboxName = `filterValues-${filterId(type)}`;
  opts.forEach(o => {
    const lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = checkboxName;
    cb.value = o;
    syncCheckbox(cb, selectedVals.includes(o));
    cb.addEventListener('change', () => {
      const opt = Array.from(sel.options).find(opt => opt.value === o);
      if (opt) syncOption(opt, cb.checked);
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(o));
    container.appendChild(lbl);
  });
  sel.addEventListener('change', () => {
    Array.from(container.querySelectorAll('input[type="checkbox"]')).forEach(cb => {
      const opt = Array.from(sel.options).find(opt => opt.value === cb.value);
      if (opt) syncOption(opt, opt.selected);
      syncCheckbox(cb, !!opt && opt.selected);
    });
  });
  container.appendChild(sel);
  return { container, select: sel };
}

function resolveFilterDisplayInfo(type, size = DEFAULT_FILTER_SIZE) {
  switch (type) {
    case 'Diopter':
      return { label: 'Schneider CF DIOPTER FULL GEN2', gearName: 'Schneider CF DIOPTER FULL GEN2' };
    case 'Clear':
      return { label: 'Clear Filter', gearName: 'Clear Filter' };
    case 'IRND':
      return { label: 'IRND Filter', gearName: 'IRND Filter' };
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
      return { label: 'ND Grad HE Filter', gearName: 'ND Grad HE Filter' };
    case 'ND Grad SE':
      return { label: 'ND Grad SE Filter', gearName: 'ND Grad SE Filter' };
    default:
      return { label: `${type} Filter Set`, gearName: `${type} Filter Set` };
  }
}

function buildFilterGearEntries(filters = []) {
  const entries = [];
  filters.forEach(({ type, size = DEFAULT_FILTER_SIZE, values }) => {
    if (!type) return;
    const sizeValue = size || DEFAULT_FILTER_SIZE;
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
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const gradValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: gradValues
        });
        break;
      }
      default: {
        const { label, gearName } = resolveFilterDisplayInfo(type, sizeValue);
        const filterValues = values == null
          ? (getFilterValueConfig(type).defaults || []).slice()
          : (Array.isArray(values) ? values.slice() : []);
        entries.push({
          id: idBase,
          gearName,
          label,
          type,
          size: sizeValue,
          values: filterValues
        });
      }
    }
  });
  return entries;
}

function formatFilterEntryText(entry) {
  const details = [];
  if (entry.size) details.push(entry.size);
  if (entry.values && entry.values.length) details.push(entry.values.join(', '));
  const suffix = details.length ? ` (${details.join(' • ')})` : '';
  return `1x ${entry.label}${suffix}`;
}

function updateGearListFilterEntries(entries = []) {
  if (!gearListOutput) return;
  const entryMap = new Map(entries.map(entry => [entry.id, entry]));
  gearListOutput.querySelectorAll('[data-filter-entry]').forEach(span => {
    const entryId = span.getAttribute('data-filter-entry');
    if (!entryId) return;
    const entry = entryMap.get(entryId);
    if (!entry) return;
    const hideSize = span.hasAttribute('data-filter-hide-size');
    const displayEntry = hideSize ? { ...entry, size: '' } : entry;
    span.textContent = formatFilterEntryText(displayEntry);
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
    const displaySize = shouldHideSize
      ? ''
      : (size && label && label.includes(size) ? '' : size);
    const displayValues = Array.isArray(values) ? values : undefined;
    if (label) {
      heading.textContent = formatFilterEntryText({
        label,
        size: displaySize,
        values: displayValues
      });
    } else {
      heading.textContent = '';
    }
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
  if (!filterSelectElem) return;
  const selected = Array.from(filterSelectElem.selectedOptions).map(o => o.value).filter(Boolean);
  const existingSelections = collectFilterSelections();
  const existingTokens = existingSelections
    ? parseFilterTokens(existingSelections)
    : (currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : []);
  const existingMap = new Map(existingTokens.map(token => [token.type, token]));
  const details = selected.map(type => {
    const prev = existingMap.get(type) || {};
    const size = prev.size || DEFAULT_FILTER_SIZE;
    const needsSize = type !== 'Diopter';
    const needsValues = filterTypeNeedsValueSelect(type);
    const { label, gearName } = resolveFilterDisplayInfo(type, size);
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
      needsValues
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  if (matteboxSelect) {
    const needsSwing = selected.some(t => t === 'ND Grad HE' || t === 'ND Grad SE');
    if (needsSwing) matteboxSelect.value = 'Swing Away';
  }
}

function handleFilterDetailChange() {
  if (!filterSelectElem) return;
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
  if (!filterSelectElem) return '';
  const selected = Array.from(filterSelectElem.selectedOptions).map(o => o.value);
  const existing = currentProjectInfo && currentProjectInfo.filter
    ? parseFilterTokens(currentProjectInfo.filter)
    : [];
  const existingMap = Object.fromEntries(existing.map(t => [t.type, t]));
  const tokens = selected.map(type => {
    const sizeSel = document.getElementById(`filter-size-${filterId(type)}`);
    const valSel = document.getElementById(`filter-values-${filterId(type)}`);
    const prev = existingMap[type] || {};
    const size = sizeSel ? sizeSel.value : (prev.size || DEFAULT_FILTER_SIZE);
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
    const size = parts[1] || DEFAULT_FILTER_SIZE;
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

function populateUserButtonDropdowns() {
  const functions = [
    'Toggle LUT',
    'False Color',
    'Peaking',
    'Anamorphic Desqueeze',
    'Surround View',
    '1:1 Zoom',
    'Playback',
    'Record',
    'Zoom',
    'Frame Lines',
    'Frame Grab'
  ];
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    functions.forEach(fn => {
      const opt = document.createElement('option');
      opt.value = fn;
      opt.textContent = fn;
      sel.appendChild(opt);
    });
    sel.size = functions.length;
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
    APP_VERSION,
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
