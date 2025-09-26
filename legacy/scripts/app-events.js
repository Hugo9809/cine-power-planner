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
var APP_EVENTS_AUTO_BACKUP_RENAMED_FLAG = typeof globalThis !== 'undefined' && globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG ? globalThis.__CINE_AUTO_BACKUP_RENAMED_FLAG : '__cineAutoBackupRenamed';
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
function resolveCineUi() {
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof self !== 'undefined') scopes.push(self);
  if (typeof global !== 'undefined') scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      if (scope.cineUi && _typeof(scope.cineUi) === 'object') {
        return scope.cineUi;
      }
    } catch (error) {
      void error;
    }
  }
  return null;
}
var eventsCineUi = resolveCineUi();
languageSelect.addEventListener("change", function (event) {
  setLanguage(event.target.value);
});
if (skipLink) {
  skipLink.addEventListener("click", function () {
    var main = document.getElementById("mainContent");
    if (main) main.focus();
  });
}
function handleSaveSetupClick() {
  var typedName = setupNameInput.value.trim();
  if (!typedName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  if (!hasAnyDeviceSelection(currentSetup)) {
    var message = langTexts.alertSetupNeedsDevice || fallbackTexts.alertSetupNeedsDevice || 'Please select at least one device before saving a project.';
    alert(message);
    return;
  }
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var selectedName = setupSelect ? setupSelect.value : '';
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
      saveProject(finalName, storedProjectSnapshot);
    } catch (error) {
      console.warn('Failed to preserve project data during setup rename', error);
    }
  }
  populateSetupSelect();
  setupNameInput.value = finalName;
  setupSelect.value = finalName;
  lastSetupName = finalName;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
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
        });
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
saveSetupBtn.addEventListener("click", handleSaveSetupClick);
function handleDeleteSetupClick() {
  var setupName = setupSelect.value;
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
    if (setupSelect) {
      lastSetupName = '';
      setupSelect.value = "";
      setupSelect.dispatchEvent(new Event('change'));
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
      storeLoadedSetupState(null);
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
deleteSetupBtn.addEventListener("click", handleDeleteSetupClick);
function resetSetupStateToDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var preserveSetupNameInput = Boolean(config.preserveSetupNameInput);
  if (!preserveSetupNameInput && setupNameInput) {
    setupNameInput.value = "";
  }
  var resetSelectToDefault = function resetSelectToDefault(select) {
    if (!select || _typeof(select) !== 'object') return;
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
  if (typeof storeLoadedSetupState === 'function') {
    try {
      storeLoadedSetupState(null);
    } catch (error) {
      console.warn('Failed to reset stored setup state while preparing setup switch', error);
    }
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.__cineLastGearListHtml = '';
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
setupSelect.addEventListener("change", function (event) {
  var setupName = event.target.value;
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
  var previousKey = (lastSetupName && typeof lastSetupName === 'string' ? lastSetupName : '') || typedName || '';
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
      info.sliderBowl = getSliderBowlValue();
      info.easyrig = getEasyrigValue();
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
    var previousPayload = {
      projectInfo: projectInfoForStorage,
      gearList: getCurrentGearListHtml()
    };
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
    saveProject(previousKey, previousPayload);
  }
  if (typeof autoBackup === 'function' && normalizedTargetSelection !== normalizedLastSelection) {
    try {
      autoBackup({
        suppressSuccess: true,
        projectNameOverride: normalizeProjectName(previousKey),
        triggerAutoSaveNotification: true
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
      updateBatteryOptions();
      var storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      var html = setup.gearList || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.gearList) || '';
      if (html && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = html;
      }
      currentProjectInfo = setup.projectInfo || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.projectInfo) || null;
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
            gearList: html
          };
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
          saveProject(setupName, payload);
        }
      }
    } else {
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      displayGearAndRequirements('');
      clearProjectAutoGearRules();
      if (typeof setManualDiagramPositions === 'function') {
        setManualDiagramPositions({}, {
          render: false
        });
      }
    }
    storeLoadedSetupState(getCurrentSetupState());
  }
  finalizeSetupSelection(setupName);
});
function populateSetupSelect() {
  var setups = getSetups();
  setupSelect.innerHTML = "<option value=\"\">".concat(texts[currentLang].newSetupOption, "</option>");
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
      setupSelect.appendChild(opt);
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
function autoBackup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!setupSelect) return null;
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var suppressSuccess = Boolean(config.suppressSuccess);
  var suppressError = Boolean(config.suppressError);
  var successMessage = typeof config.successMessage === 'string' && config.successMessage ? config.successMessage : 'Auto backup saved';
  var errorMessage = typeof config.errorMessage === 'string' && config.errorMessage ? config.errorMessage : 'Auto backup failed';
  var triggerAutoSaveNotification = Boolean(config.triggerAutoSaveNotification);
  var autoSaveNotificationMessage = typeof config.autoSaveNotificationMessage === 'string' && config.autoSaveNotificationMessage.trim() ? config.autoSaveNotificationMessage.trim() : successMessage;
  var normalizeProjectName = function normalizeProjectName(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  };
  var hasProjectNameOverride = Object.prototype.hasOwnProperty.call(config, 'projectNameOverride');
  var overrideName = hasProjectNameOverride ? normalizeProjectName(config.projectNameOverride) : null;
  var selectedName = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '';
  var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '';
  var normalizedSelectedName = normalizeProjectName(selectedName);
  var normalizedTypedName = normalizeProjectName(typedName);
  var isAutoBackupName = function isAutoBackupName(name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  };
  var nameForBackup = '';
  if (overrideName !== null && overrideName !== undefined) {
    if (overrideName && isAutoBackupName(overrideName)) {
      return {
        status: 'skipped',
        reason: 'auto-backup-selected'
      };
    }
    nameForBackup = overrideName;
  } else if (normalizedSelectedName && isAutoBackupName(normalizedSelectedName)) {
    if (normalizedTypedName && !isAutoBackupName(normalizedTypedName) && normalizedTypedName !== normalizedSelectedName) {
      nameForBackup = normalizedTypedName;
    } else {
      return {
        status: 'skipped',
        reason: 'auto-backup-selected'
      };
    }
  } else if (normalizedSelectedName) {
    nameForBackup = normalizedSelectedName;
  } else if (normalizedTypedName) {
    nameForBackup = normalizedTypedName;
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
    var gearListHtml = getCurrentGearListHtml();
    if (!gearListHtml) {
      var activeName = (setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value.trim() : '') || (setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '');
      if (activeName) {
        var _setups = typeof getSetups === 'function' ? getSetups() : null;
        var storedSetup = _setups && _typeof(_setups) === 'object' ? _setups[activeName] : null;
        if (storedSetup && typeof storedSetup.gearList === 'string' && storedSetup.gearList.trim()) {
          gearListHtml = storedSetup.gearList;
        } else if (typeof loadProject === 'function') {
          try {
            var storedProject = loadProject(activeName);
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
    var setups = getSetups();
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      var payload = {
        gearList: gearListHtml || '',
        projectInfo: currentSetup.projectInfo || null
      };
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      if (payload.gearList || payload.projectInfo || payload.autoGearRules) {
        saveProject(backupName, payload);
      }
    }
    var prevValue = setupSelect.value;
    var prevName = setupNameInput ? setupNameInput.value : '';
    populateSetupSelect();
    setupSelect.value = prevValue;
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
function ensureAutoBackupBeforeDeletion(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var successMessage = config.successMessage || langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  var failureMessage = config.failureMessage || langTexts.preDeleteBackupFailed || fallbackTexts.preDeleteBackupFailed || 'Automatic backup failed. The action was cancelled.';
  var autoBackupOptions = _objectSpread({
    suppressSuccess: true,
    suppressError: true
  }, config.autoBackupOptions || {});
  var backupResult = null;
  if (typeof autoBackup === 'function') {
    try {
      backupResult = autoBackup(autoBackupOptions);
    } catch (error) {
      console.error("Automatic backup before ".concat(context || 'deletion', " failed"), error);
      backupResult = null;
    }
  }
  var backupName = null;
  if (typeof backupResult === 'string') {
    backupName = backupResult;
  } else if (backupResult && _typeof(backupResult) === 'object') {
    if (backupResult.status === 'skipped') {
      return backupResult;
    }
    if (typeof backupResult.name === 'string' && backupResult.name) {
      backupName = backupResult.name;
    }
  }
  if (!backupName) {
    showNotification('error', failureMessage);
    return null;
  }
  if (config.notifySuccess !== false) {
    showNotification('success', successMessage);
  }
  return backupName;
}
var autoBackupInterval = setInterval(autoBackup, 10 * 60 * 1000);
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
if (toggleDeviceBtn) {
  toggleDeviceBtn.addEventListener('click', toggleDeviceManagerSection);
}
if (eventsCineUi) {
  try {
    if (eventsCineUi.controllers && typeof eventsCineUi.controllers.register === 'function') {
      eventsCineUi.controllers.register('deviceManagerSection', {
        show: showDeviceManagerSection,
        hide: hideDeviceManagerSection,
        toggle: toggleDeviceManagerSection
      });
    }
  } catch (error) {
    console.warn('cineUi controller registration failed', error);
  }
  try {
    if (eventsCineUi.interactions && typeof eventsCineUi.interactions.register === 'function') {
      eventsCineUi.interactions.register('saveSetup', handleSaveSetupClick);
      eventsCineUi.interactions.register('deleteSetup', handleDeleteSetupClick);
    }
  } catch (error) {
    console.warn('cineUi interaction registration failed', error);
  }
  try {
    if (eventsCineUi.help && typeof eventsCineUi.help.register === 'function') {
      eventsCineUi.help.register('saveSetup', function () {
        var langTexts = texts[currentLang] || {};
        var fallbackTexts = texts.en || {};
        return langTexts.saveSetupHelp || fallbackTexts.saveSetupHelp || 'Store the current project so it is never lost. Press Enter or Ctrl+S to save instantly.';
      });
      eventsCineUi.help.register('autoBackupBeforeDeletion', function () {
        var langTexts = texts[currentLang] || {};
        var fallbackTexts = texts.en || {};
        return langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic backup saved. Restore it anytime from Saved Projects.';
      });
    }
  } catch (error) {
    console.warn('cineUi help registration failed', error);
  }
}
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
    var tmp = firstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = ((_deviceData$power = deviceData.power) === null || _deviceData$power === void 0 || (_deviceData$power = _deviceData$power.input) === null || _deviceData$power === void 0 ? void 0 : _deviceData$power.voltageRange) || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(((_deviceData$power2 = deviceData.power) === null || _deviceData$power2 === void 0 ? void 0 : _deviceData$power2.batteryPlateSupport) || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    setLensMounts(deviceData.lensMount || []);
    setPowerDistribution(((_deviceData$power3 = deviceData.power) === null || _deviceData$power3 === void 0 ? void 0 : _deviceData$power3.powerDistributionOutputs) || []);
    setVideoOutputs(deviceData.videoOutputs || []);
    setFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    setTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    var _deviceData$power4, _deviceData$video, _deviceData$video2, _deviceData$audioOutp, _deviceData$audioOutp2;
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = ((_deviceData$power4 = deviceData.power) === null || _deviceData$power4 === void 0 || (_deviceData$power4 = _deviceData$power4.input) === null || _deviceData$power4 === void 0 ? void 0 : _deviceData$power4.voltageRange) || '';
    var mpt = firstPowerInputType(deviceData);
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
    var vfpt = firstPowerInputType(deviceData);
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
    videoPowerInput.value = firstPowerInputType(deviceData);
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
deviceManagerSection.addEventListener("click", function (event) {
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
    if (!Array.from(newCategorySelect.options).some(function (opt) {
      return opt.value === categoryKey;
    })) {
      var _categoryNames$curren;
      var opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = ((_categoryNames$curren = categoryNames[currentLang]) === null || _categoryNames$curren === void 0 ? void 0 : _categoryNames$curren[categoryKey]) || categoryKey;
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
    newCategorySelect.value = categoryKey;
    newNameInput.value = name;
    newCategorySelect.dispatchEvent(new Event('change'));
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
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
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
deviceManagerSection.addEventListener('keydown', function (event) {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});
newCategorySelect.addEventListener("change", function () {
  var _addDeviceBtn;
  var wasEditing = ((_addDeviceBtn = addDeviceBtn) === null || _addDeviceBtn === void 0 ? void 0 : _addDeviceBtn.dataset.mode) === "edit";
  var previousName = newNameInput ? newNameInput.value : "";
  var val = newCategorySelect.value;
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
newSubcategorySelect.addEventListener('change', function () {
  if (newCategorySelect.value === 'accessories.cables') {
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
  if (newCategorySelect.isConnected) {
    try {
      newCategorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}
addDeviceBtn.addEventListener("click", function () {
  var name = newNameInput.value.trim();
  var category = newCategorySelect.value;
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
    var _existing2 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    targetCategory[name] = _objectSpread(_objectSpread({}, _existing2), {}, {
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
  var categoryKey = category.replace(".", "_");
  var categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
    alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
    alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});
cancelEditBtn.addEventListener("click", function () {
  resetDeviceForm();
});
exportBtn.addEventListener("click", function () {
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
  exportAndRevertBtn.addEventListener('click', function () {
    if (confirm(texts[currentLang].confirmExportAndRevert)) {
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
importDataBtn.addEventListener("click", function () {
  importFileInput.click();
});
importFileInput.addEventListener("change", function (event) {
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
      devices = result.devices;
      if (typeof updateGlobalDevicesReference === 'function') {
        updateGlobalDevicesReference(devices);
      }
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
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