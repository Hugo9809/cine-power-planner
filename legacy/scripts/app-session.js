function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var temperaturePreferenceStorageKey = typeof TEMPERATURE_STORAGE_KEY === 'string' ? TEMPERATURE_STORAGE_KEY : typeof resolveTemperatureStorageKey === 'function' ? resolveTemperatureStorageKey() : 'cameraPowerPlanner_temperatureUnit';
var recordFullBackupHistoryEntryFn = function recordFullBackupHistoryEntryFn() {};
try {
  var _require = require('./storage.js');
  recordFullBackupHistoryEntryFn = _require.recordFullBackupHistoryEntry;
} catch (error) {
  if (typeof window !== 'undefined' && window && typeof window.recordFullBackupHistoryEntry === 'function') {
    recordFullBackupHistoryEntryFn = window.recordFullBackupHistoryEntry;
  } else {
    void error;
  }
}
function saveCurrentSession() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (restoringSession || factoryResetInProgress) return;
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
  var state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    controllers: controllerSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo
  };
  storeSession(state);
  if (!options.skipGearList) {
    saveCurrentGearList();
  }
}
function autoSaveCurrentSetup() {
  if (factoryResetInProgress) return;
  if (!setupNameInput) return;
  var name = setupNameInput.value.trim();
  if (!name) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return;
  }
  var selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var setups = getSetups();
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
}
var projectAutoSaveTimer = null;
var factoryResetInProgress = false;
function runProjectAutoSave() {
  if (factoryResetInProgress) {
    projectAutoSaveTimer = null;
    return;
  }
  if (restoringSession) return;
  projectAutoSaveTimer = null;
  var hasSetupName = Boolean(setupNameInput && setupNameInput.value.trim());
  if (!hasSetupName) {
    saveCurrentSession();
  }
  autoSaveCurrentSetup();
  saveCurrentGearList();
}
function scheduleProjectAutoSave() {
  var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
  if (projectAutoSaveTimer && _typeof(projectAutoSaveTimer) === 'object' && typeof projectAutoSaveTimer.unref === 'function') {
    projectAutoSaveTimer.unref();
  }
}
if (projectForm) {
  projectForm.querySelectorAll('select[multiple]').forEach(function (sel) {
    sel.addEventListener('mousedown', function (e) {
      if (e.target.tagName !== 'OPTION') return;
      e.preventDefault();
      var option = e.target;
      var scrollTop = sel.scrollTop;
      option.selected = !option.selected;
      sel.dispatchEvent(new Event('change'));
      sel.focus();
      sel.scrollTop = scrollTop;
    });
    sel.addEventListener('dblclick', function (e) {
      e.preventDefault();
    });
  });
  projectForm.querySelectorAll('select').forEach(function (sel) {
    if (sel.id === 'requiredScenarios') return;
    sel.addEventListener('change', function () {
      return updateSelectIconBoxes(sel);
    });
    updateSelectIconBoxes(sel);
  });
  var queueProjectAutoSave = function queueProjectAutoSave() {
    return scheduleProjectAutoSave();
  };
  var flushProjectAutoSave = function flushProjectAutoSave() {
    return scheduleProjectAutoSave(true);
  };
  projectForm.addEventListener('input', queueProjectAutoSave);
  projectForm.addEventListener('change', flushProjectAutoSave);
  projectForm.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('change', saveCurrentSession);
  });
}
function setSelectValue(select, value) {
  if (!select) return;
  if (value === undefined) return;
  var normalized = value === null ? '' : value;
  select.value = normalized;
  if (select.value !== normalized) {
    var options = Array.from(select.options || []);
    var noneOption = options.find(function (opt) {
      return opt.value === 'None';
    });
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
  selects.forEach(function (select) {
    if (!select) return;
    var options = Array.from(select.options || []);
    var noneOption = options.find(function (opt) {
      return opt.value === 'None';
    });
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
  var state = loadSession();
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
      state.motors.forEach(function (val, i) {
        if (motorSelects[i]) setSelectValue(motorSelects[i], val);
      });
    }
    if (Array.isArray(state.controllers)) {
      state.controllers.forEach(function (val, i) {
        if (controllerSelects[i]) setSelectValue(controllerSelects[i], val);
      });
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
    var typedName = getCurrentProjectName();
    var storageKey = getCurrentProjectStorageKey();
    var fetchStoredProject = function fetchStoredProject(name) {
      return typeof loadProject === 'function' && typeof name === 'string' ? loadProject(name) : null;
    };
    var hasProjectPayload = function hasProjectPayload(project) {
      return project && (project.gearList || project.projectInfo);
    };
    var candidateNames = [];
    if (typedName) {
      candidateNames.push(typedName);
    }
    if (storageKey || storageKey === '') {
      if (!candidateNames.includes(storageKey)) {
        candidateNames.push(storageKey);
      }
    }
    var storedProject = null;
    for (var _i = 0, _candidateNames = candidateNames; _i < _candidateNames.length; _i++) {
      var name = _candidateNames[_i];
      storedProject = fetchStoredProject(name);
      if (hasProjectPayload(storedProject)) {
        break;
      }
    }
    if (!hasProjectPayload(storedProject) && state) {
      var fallbackName = typeof state.setupSelect === 'string' ? state.setupSelect.trim() : '';
      if (fallbackName && !candidateNames.includes(fallbackName)) {
        var fallbackProject = fetchStoredProject(fallbackName);
        if (hasProjectPayload(fallbackProject)) {
          storedProject = fallbackProject;
        }
      }
    }
    if (hasProjectPayload(storedProject)) {
      var mergedInfo = _objectSpread(_objectSpread({}, storedProject.projectInfo || {}), currentProjectInfo || {});
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
        updateGearListButtonVisibility();
      }
    }
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  restoringSession = false;
  saveCurrentSession();
}
function applySharedSetup(shared) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    var decoded = decodeSharedSetup(typeof shared === 'string' ? JSON.parse(shared) : shared);
    deactivateSharedImportProjectPreset();
    var sharedRulesFromData = Array.isArray(decoded.autoGearRules) ? decoded.autoGearRules : null;
    var providedRules = Array.isArray(options.sharedAutoGearRules) && options.sharedAutoGearRules.length ? options.sharedAutoGearRules : sharedRulesFromData;
    var hasProvidedRules = Array.isArray(providedRules) && providedRules.length > 0;
    var providedMode = options.autoGearMode;
    var modes = Array.isArray(providedMode) ? providedMode.slice() : typeof providedMode === 'string' ? [providedMode] : [];
    modes = modes.filter(function (value, index, arr) {
      return (value === 'none' || value === 'project' || value === 'global') && arr.indexOf(value) === index;
    });
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    if (modes.length > 1 && modes.includes('none')) {
      modes = modes.filter(function (value) {
        return value !== 'none';
      });
    }
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    var applyGlobal = modes.includes('global');
    var applyProject = modes.includes('project');
    var applyNoneOnly = modes.length === 1 && modes[0] === 'none';
    var autoGearUpdated = false;
    if (applyGlobal) {
      if (hasProvidedRules) {
        var merged = mergeAutoGearRules(getBaseAutoGearRules(), providedRules);
        var preset = ensureSharedAutoGearPreset(merged, decoded);
        if (preset) {
          setActiveAutoGearPresetId(preset.id, {
            persist: true,
            skipRender: true
          });
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
        var _preset = ensureSharedAutoGearPreset(providedRules, decoded);
        if (_preset) {
          activateSharedImportProjectPreset(_preset.id);
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
      decoded.motors.forEach(function (val, i) {
        if (motorSelects[i]) setSelectValue(motorSelects[i], val);
      });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach(function (val, i) {
        if (controllerSelects[i]) setSelectValue(controllerSelects[i], val);
      });
    }
    setSelectValue(batterySelect, decoded.battery);
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      var key = getCurrentSetupKey();
      var fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    currentProjectInfo = decoded.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
    var gearDisplayed = false;
    var combinedHtml = (decoded.projectHtml || '') + (decoded.gearList || '');
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
      var html = generateGearListHtml(decoded.projectInfo || {});
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
      var payload = {
        gearList: getCurrentGearListHtml(),
        projectInfo: decoded.projectInfo || null
      };
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      var storageKey = getCurrentProjectStorageKey({
        allowTyped: true
      });
      var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
      var selectedName = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value.trim() : '';
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
var manualQueryParamWarningShown = false;
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
  var query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return null;
  }
  var pairs = query.split('&');
  for (var i = 0; i < pairs.length; i += 1) {
    if (!pairs[i]) {
      continue;
    }
    var _pairs$i$split = pairs[i].split('='),
      _pairs$i$split2 = _slicedToArray(_pairs$i$split, 2),
      rawName = _pairs$i$split2[0],
      _pairs$i$split2$ = _pairs$i$split2[1],
      rawValue = _pairs$i$split2$ === void 0 ? '' : _pairs$i$split2$;
    if (!rawName) {
      continue;
    }
    var decodedName = void 0;
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
  var hasSearch = typeof window !== 'undefined' && window.location && typeof window.location.search === 'string';
  var search = hasSearch ? window.location.search : '';
  var shared = getQueryParam(search, 'shared');
  if (!shared) return;
  try {
    var data = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
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
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
if (cameraSelect) {
  cameraSelect.addEventListener('change', function () {
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
  monitoringConfigurationSelect.addEventListener('change', function () {
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
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect, setupSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
});
if (setupNameInput) {
  var handleSetupNameInput = function handleSetupNameInput() {
    var typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
    var selectedName = setupSelect ? setupSelect.value : '';
    var renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    saveCurrentSession({
      skipGearList: renameInProgress
    });
  };
  setupNameInput.addEventListener("input", handleSetupNameInput);
}
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
if (setupNameInput) setupNameInput.addEventListener("input", checkSetupChanged);
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
if (setupNameInput) setupNameInput.addEventListener("change", autoSaveCurrentSetup);
var flushProjectAutoSaveOnExit = function flushProjectAutoSaveOnExit() {
  if (factoryResetInProgress) return;
  scheduleProjectAutoSave(true);
};
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit();
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload'].forEach(function (eventName) {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}
if (setupNameInput && saveSetupBtn) {
  var toggleSaveSetupBtn = function toggleSaveSetupBtn() {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}
function updateThemeColor(isDark) {
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
  }
}
function setToggleIcon(button, glyph) {
  if (!button) return;
  var iconSpan = button.querySelector('.icon-glyph');
  if (!iconSpan) {
    iconSpan = document.createElement('span');
    iconSpan.className = 'icon-glyph';
    iconSpan.setAttribute('aria-hidden', 'true');
    button.textContent = '';
    button.appendChild(iconSpan);
  }
  var glyphConfig = glyph && _typeof(glyph) === 'object' && (glyph.markup || glyph.className) ? glyph : {
    value: glyph
  };
  var classNames = ['icon-glyph'];
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
  var highContrast = isHighContrastActive();
  var accentSource = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : accentColor;
  refreshDarkModeAccentBoost({
    color: accentSource,
    highContrast: highContrast
  });
  updateThemeColor(enabled);
  if (settingsDarkMode) {
    settingsDarkMode.checked = enabled;
  }
}
var darkModeEnabled = false;
try {
  var stored = localStorage.getItem("darkMode");
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
  darkModeToggle.addEventListener("click", function () {
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
var highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);
function stopPinkModeIconRotation() {
  if (pinkModeIconRotationTimer) {
    clearInterval(pinkModeIconRotationTimer);
    pinkModeIconRotationTimer = null;
  }
}
function triggerPinkModeIconAnimation() {
  var targets = [];
  if (pinkModeToggle) {
    var toggleIcon = pinkModeToggle.querySelector('.pink-mode-icon');
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
  targets.forEach(function (target) {
    target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
    target.getBoundingClientRect();
    target.classList.add(PINK_MODE_ICON_ANIMATION_CLASS);
    if (PINK_MODE_ICON_ANIMATION_RESET_DELAY > 0) {
      setTimeout(function () {
        target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
      }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
    }
  });
}
function applyPinkModeIcon(iconConfig) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? false : _ref$animate;
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
  var sequence = Array.isArray(pinkModeIcons.onSequence) ? pinkModeIcons.onSequence : [];
  if (!sequence.length) {
    applyPinkModeIcon(pinkModeIcons.off, {
      animate: false
    });
    return;
  }
  stopPinkModeIconRotation();
  if (!pinkModeToggle && !pinkModeHelpIcon) {
    return;
  }
  pinkModeIconIndex = 0;
  applyPinkModeIcon(sequence[pinkModeIconIndex], {
    animate: true
  });
  pinkModeIconRotationTimer = setInterval(function () {
    pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
    applyPinkModeIcon(sequence[pinkModeIconIndex], {
      animate: true
    });
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
    applyPinkModeIcon(pinkModeIcons.off, {
      animate: false
    });
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
var pinkModeEnabled = false;
var settingsInitialPinkMode = isPinkModeActive();
var settingsInitialTemperatureUnit = typeof temperatureUnit === 'string' ? temperatureUnit : 'celsius';
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
  var baseline = typeof settingsInitialTemperatureUnit === 'string' ? settingsInitialTemperatureUnit : 'celsius';
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
  pinkModeToggle.addEventListener("click", function () {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}
if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', function () {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}
if (settingsTemperatureUnit) {
  settingsTemperatureUnit.addEventListener('change', function () {
    applyTemperatureUnitPreference(settingsTemperatureUnit.value, {
      persist: false
    });
  });
}
if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', function () {
    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
    if (settingsShowAutoBackups) settingsShowAutoBackups.checked = showAutoBackups;
    if (accentColorInput) {
      var _stored = localStorage.getItem('accentColor');
      accentColorInput.value = _stored || accentColor;
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
    var activePanel = settingsDialog.querySelector('.settings-panel:not([hidden])');
    var first = activePanel === null || activePanel === void 0 ? void 0 : activePanel.querySelector('input:not([type="hidden"]), select:not(#settingsLanguage), textarea');
    if (first) {
      try {
        first.focus({
          preventScroll: true
        });
      } catch (_unused) {
        first.focus();
      }
    }
  });
  if (settingsCancel) {
    settingsCancel.addEventListener('click', function () {
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
    settingsSave.addEventListener('click', function () {
      if (settingsLanguage) {
        setLanguage(settingsLanguage.value);
      }
      if (settingsDarkMode) {
        var enabled = settingsDarkMode.checked;
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
        var _enabled = settingsHighContrast.checked;
        applyHighContrast(_enabled);
        try {
          localStorage.setItem('highContrast', _enabled);
        } catch (e) {
          console.warn('Could not save high contrast preference', e);
        }
      }
      if (settingsShowAutoBackups) {
        var _enabled2 = settingsShowAutoBackups.checked;
        var changed = _enabled2 !== showAutoBackups;
        showAutoBackups = _enabled2;
        try {
          localStorage.setItem('showAutoBackups', _enabled2);
        } catch (e) {
          console.warn('Could not save auto backup visibility preference', e);
        }
        if (changed) {
          var prevValue = setupSelect ? setupSelect.value : '';
          var prevName = setupNameInput ? setupNameInput.value : '';
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
        var color = accentColorInput.value;
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
        var size = settingsFontSize.value;
        applyFontSize(size);
        try {
          localStorage.setItem('fontSize', size);
        } catch (e) {
          console.warn('Could not save font size', e);
        }
        fontSize = size;
      }
      if (settingsFontFamily) {
        var family = settingsFontFamily.value;
        applyFontFamily(family);
        try {
          localStorage.setItem('fontFamily', family);
        } catch (e) {
          console.warn('Could not save font family', e);
        }
        fontFamily = family;
      }
      if (settingsLogo && settingsLogo.files && settingsLogo.files[0]) {
        var file = settingsLogo.files[0];
        if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
          var reader = new FileReader();
          reader.onload = function () {
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
  settingsDialog.addEventListener('click', function (e) {
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
  settingsDialog.addEventListener('cancel', function (e) {
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
    autoGearAddRuleBtn.addEventListener('click', function () {
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
    autoGearImportButton.addEventListener('click', function () {
      autoGearImportInput.click();
    });
    autoGearImportInput.addEventListener('change', handleAutoGearImportSelection);
  }
  if (autoGearSearchInput) {
    var updateQuery = function updateQuery(event) {
      var _event$target;
      setAutoGearSearchQuery((event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value) || '');
    };
    autoGearSearchInput.addEventListener('input', updateQuery);
    autoGearSearchInput.addEventListener('search', updateQuery);
  }
  if (autoGearFilterScenarioSelect) {
    autoGearFilterScenarioSelect.addEventListener('change', function (event) {
      var _event$target2;
      setAutoGearScenarioFilter((event === null || event === void 0 || (_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.value) || 'all');
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
    autoGearAddItemButton.addEventListener('click', function () {
      return addAutoGearDraftItem('add');
    });
  }
  if (autoGearRemoveItemButton) {
    autoGearRemoveItemButton.addEventListener('click', function () {
      return addAutoGearDraftItem('remove');
    });
  }
  if (autoGearSaveRuleButton) {
    autoGearSaveRuleButton.addEventListener('click', saveAutoGearRuleFromEditor);
  }
  if (autoGearCancelEditButton) {
    autoGearCancelEditButton.addEventListener('click', function () {
      closeAutoGearEditor();
      renderAutoGearDraftLists();
    });
  }
  if (autoGearRulesList) {
    autoGearRulesList.addEventListener('click', function (event) {
      var target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-edit')) {
        openAutoGearEditor(target.dataset.ruleId || '');
      } else if (target.classList.contains('auto-gear-delete')) {
        deleteAutoGearRule(target.dataset.ruleId || '');
      }
    });
  }
  if (autoGearBackupSelect) {
    autoGearBackupSelect.addEventListener('change', function () {
      updateAutoGearBackupRestoreButtonState();
    });
  }
  if (autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.addEventListener('change', handleAutoGearShowBackupsToggle);
  }
  if (autoGearBackupRestoreButton) {
    autoGearBackupRestoreButton.addEventListener('click', function () {
      if (!autoGearBackupSelect) return;
      var backupId = autoGearBackupSelect.value;
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
  var bindAutoGearSelectorCatalogSync = function bindAutoGearSelectorCatalogSync(typeSelect, defaultInput) {
    if (!typeSelect) return;
    var refreshCatalog = function refreshCatalog() {
      updateAutoGearMonitorCatalogOptions(typeSelect.value);
    };
    typeSelect.addEventListener('change', refreshCatalog);
    if (defaultInput) {
      defaultInput.addEventListener('focus', refreshCatalog);
    }
  };
  bindAutoGearSelectorCatalogSync(autoGearAddSelectorTypeSelect, autoGearAddSelectorDefaultInput);
  bindAutoGearSelectorCatalogSync(autoGearRemoveSelectorTypeSelect, autoGearRemoveSelectorDefaultInput);
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', function (event) {
      var target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-remove-entry')) {
        var listType = target.dataset.listType;
        var normalizedType = listType === 'remove' ? 'remove' : 'add';
        var itemId = target.dataset.itemId;
        if (!autoGearEditorDraft || !itemId) return;
        var list = normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        var index = list.findIndex(function (item) {
          return item.id === itemId;
        });
        if (index >= 0) {
          list.splice(index, 1);
          if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType && autoGearEditorActiveItem.itemId === itemId) {
            clearAutoGearDraftItemEdit(normalizedType, {
              skipRender: true
            });
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
var createAccentTint = function createAccentTint() {
  var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.16;
  var accentFallback = typeof accentColor === 'string' ? accentColor : DEFAULT_ACCENT_COLOR;
  var accentSource = getCssVariableValue('--accent-color', accentFallback);
  var rgb = parseColorToRgb(accentSource);
  if (!rgb) return null;
  return "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(alpha, ")");
};
function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  var id = 'backupNotificationContainer';
  var container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  var note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  var background;
  var textColor;
  if (type === 'error' || type === 'warning') {
    var backgroundVar = type === 'error' ? '--status-error-bg' : '--status-warning-bg';
    var fallbackBackground = type === 'error' ? '#fdd' : '#ffd';
    background = getCssVariableValue(backgroundVar, fallbackBackground);
    var textColorVar = type === 'error' ? '--status-error-text-color' : '--status-warning-text-color';
    textColor = getCssVariableValue(textColorVar, '#000');
  } else {
    background = createAccentTint() || getCssVariableValue('--status-success-bg', '#dfd');
    textColor = getCssVariableValue('--status-success-text-color', '#000');
  }
  note.style.background = background;
  note.style.color = textColor;
  container.appendChild(note);
  setTimeout(function () {
    note.remove();
    if (!container.children.length) {
      container.remove();
    }
  }, 4000);
}
function formatFullBackupFilename(date) {
  var safeDate = date instanceof Date && !Number.isNaN(date.valueOf()) ? date : new Date();
  var pad = function pad(n) {
    return String(n).padStart(2, '0');
  };
  var year = safeDate.getFullYear();
  var month = pad(safeDate.getMonth() + 1);
  var day = pad(safeDate.getDate());
  var hours = pad(safeDate.getHours());
  var minutes = pad(safeDate.getMinutes());
  var seconds = pad(safeDate.getSeconds());
  var offsetMinutes = safeDate.getTimezoneOffset();
  var offsetSuffix = 'Z';
  if (offsetMinutes !== 0) {
    var sign = offsetMinutes > 0 ? '-' : '+';
    var abs = Math.abs(offsetMinutes);
    var offsetHours = pad(Math.floor(abs / 60));
    var offsetMins = pad(abs % 60);
    offsetSuffix = "".concat(sign).concat(offsetHours, ":").concat(offsetMins);
  }
  var iso = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds).concat(offsetSuffix);
  var safeIso = iso.replace(/[:]/g, '-');
  return {
    iso: iso,
    fileName: "".concat(safeIso, " full app backup.json")
  };
}
function resolveSafeLocalStorage() {
  if (typeof getSafeLocalStorage === 'function') {
    try {
      var storage = getSafeLocalStorage();
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
  var snapshot = Object.create(null);
  if (!storage) return snapshot;
  try {
    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      var length = storage.length;
      for (var i = 0; i < length; i++) {
        var key = storage.key(i);
        if (typeof key !== 'string') continue;
        snapshot[key] = storage.getItem(key);
      }
    } else if (typeof storage.keys === 'function') {
      var keys = storage.keys();
      keys.forEach(function (key) {
        if (typeof key !== 'string') return;
        snapshot[key] = storage.getItem(key);
      });
    } else if (typeof storage.forEach === 'function') {
      storage.forEach(function (value, key) {
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
    return function () {
      return null;
    };
  }
  var message = typeof errorMessagePrefix === 'string' && errorMessagePrefix ? errorMessagePrefix : 'Failed to read storage key';
  return function (key) {
    if (typeof key !== 'string') {
      return null;
    }
    try {
      return storage.getItem(key);
    } catch (error) {
      console.warn("".concat(message), key, error);
      return null;
    }
  };
}
function restoreSessionStorageSnapshot(snapshot) {
  if (typeof sessionStorage === 'undefined' || !sessionStorage) {
    return;
  }
  var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
  var retainedKeys = new Set(entries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
      key = _ref3[0];
    return key;
  }));
  var keysToRemove = [];
  try {
    var _sessionStorage = sessionStorage,
      length = _sessionStorage.length;
    for (var i = 0; i < length; i += 1) {
      var key = sessionStorage.key(i);
      if (typeof key !== 'string') continue;
      if (!retainedKeys.has(key)) {
        keysToRemove.push(key);
      }
    }
  } catch (error) {
    console.warn('Failed to inspect sessionStorage during restore rollback', error);
  }
  keysToRemove.forEach(function (key) {
    try {
      sessionStorage.removeItem(key);
    } catch (removeError) {
      console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
    }
  });
  entries.forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
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
  var text;
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
  if (text.startsWith("\uFEFF")) {
    return text.replace(/^\uFEFF/, '');
  }
  return text;
}
var BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_'];
var BACKUP_STORAGE_KNOWN_KEYS = new Set(['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'customLogo', 'language', IOS_PWA_HELP_STORAGE_KEY]);
var BACKUP_METADATA_BASE_KEYS = new Set(['settings', 'storage', 'localStorage', 'values', 'entries', 'sessionStorage', 'sessionState', 'sessionEntries', 'payload', 'plannerData', 'allData', 'generatedAt', 'version', 'appVersion', 'applicationVersion']);
var BACKUP_DATA_KEYS = ['devices', 'setups', 'session', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'autoGearRules', 'autoGearSeeded', 'autoGearBackups', 'autoGearPresets', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearShowBackups', 'customLogo', 'customFonts', 'preferences', 'schemaCache', 'fullBackupHistory', 'fullBackups'];
function isPlainObject(value) {
  return value !== null && _typeof(value) === 'object' && !Array.isArray(value);
}
function normalizeStoredValue(value) {
  if (typeof value === 'string') return value;
  if (value === undefined || value === null) return '';
  if (_typeof(value) === 'object') {
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
  var source = section;
  if (typeof source === 'string') {
    var parsed = null;
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
  var snapshot = Object.create(null);
  var assignEntry = function assignEntry(key, value) {
    if (typeof key !== 'string' || !key) return;
    snapshot[key] = normalizeStoredValue(value);
  };
  if (Array.isArray(source)) {
    source.forEach(function (entry) {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (_typeof(entry) === 'object') {
        if (typeof entry.key === 'string') {
          var _ref6, _ref7, _ref8, _entry$value;
          assignEntry(entry.key, (_ref6 = (_ref7 = (_ref8 = (_entry$value = entry.value) !== null && _entry$value !== void 0 ? _entry$value : entry.val) !== null && _ref8 !== void 0 ? _ref8 : entry.data) !== null && _ref7 !== void 0 ? _ref7 : entry.content) !== null && _ref6 !== void 0 ? _ref6 : entry.string);
          return;
        }
        if (typeof entry.name === 'string') {
          var _ref9, _ref0, _ref1, _entry$value2;
          assignEntry(entry.name, (_ref9 = (_ref0 = (_ref1 = (_entry$value2 = entry.value) !== null && _entry$value2 !== void 0 ? _entry$value2 : entry.val) !== null && _ref1 !== void 0 ? _ref1 : entry.data) !== null && _ref0 !== void 0 ? _ref0 : entry.content) !== null && _ref9 !== void 0 ? _ref9 : entry.string);
          return;
        }
        if (Array.isArray(entry.entry)) {
          assignEntry(entry.entry[0], entry.entry[1]);
        }
      }
    });
  } else if (isPlainObject(source)) {
    Object.entries(source).forEach(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        key = _ref11[0],
        value = _ref11[1];
      assignEntry(key, value);
    });
  } else {
    return null;
  }
  return Object.keys(snapshot).length ? snapshot : null;
}
function extractFirstMatchingSnapshot(source, keys) {
  if (!isPlainObject(source)) return {
    snapshot: null,
    keyUsed: null
  };
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
      var snapshot = convertEntriesToSnapshot(source[key]);
      if (snapshot) {
        return {
          snapshot: snapshot,
          keyUsed: key
        };
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    snapshot: null,
    keyUsed: null
  };
}
function looksLikeStoredSettingKey(key) {
  if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
    return true;
  }
  return BACKUP_STORAGE_KEY_PREFIXES.some(function (prefix) {
    return key.startsWith(prefix);
  });
}
function restoreLocalStorageSnapshot(storage, snapshot) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }
  var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
  var targetKeys = new Set(entries.map(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 1),
      key = _ref13[0];
    return key;
  }));
  var keysToRemove = [];
  try {
    var length = storage.length;
    for (var i = 0; i < length; i += 1) {
      var key = storage.key(i);
      if (typeof key !== 'string') continue;
      if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
        keysToRemove.push(key);
      }
    }
  } catch (error) {
    console.warn('Failed to inspect storage during restore rollback', error);
  }
  keysToRemove.forEach(function (key) {
    try {
      storage.removeItem(key);
    } catch (removeError) {
      console.warn('Failed to remove storage key during restore rollback', key, removeError);
    }
  });
  entries.forEach(function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 2),
      key = _ref15[0],
      value = _ref15[1];
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
  var snapshot = Object.create(null);
  Object.entries(source).forEach(function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 2),
      key = _ref17[0],
      value = _ref17[1];
    if (metadataKeys.has(key)) return;
    if (!looksLikeStoredSettingKey(key)) return;
    snapshot[key] = normalizeStoredValue(value);
  });
  return Object.keys(snapshot).length ? snapshot : null;
}
function extractBackupSections(raw) {
  var parsed = isPlainObject(raw) ? raw : {};
  var versionValue = typeof parsed.version === 'string' ? parsed.version : typeof parsed.appVersion === 'string' ? parsed.appVersion : typeof parsed.applicationVersion === 'string' ? parsed.applicationVersion : undefined;
  var settingsResult = extractFirstMatchingSnapshot(parsed, ['settings', 'localStorage', 'storage', 'storedSettings', 'values', 'entries']);
  var sessionResult = extractFirstMatchingSnapshot(parsed, ['sessionStorage', 'session', 'sessions', 'sessionState', 'sessionEntries']);
  var metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
  if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
  if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);
  var settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
  var sessionSnapshot = sessionResult.snapshot;
  var dataSection = null;
  for (var _i2 = 0, _arr = ['data', 'payload', 'plannerData', 'allData']; _i2 < _arr.length; _i2++) {
    var key = _arr[_i2];
    if (isPlainObject(parsed[key])) {
      dataSection = parsed[key];
      break;
    }
  }
  if (!dataSection) {
    var fallback = {};
    BACKUP_DATA_KEYS.forEach(function (key) {
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
    data: isPlainObject(dataSection) ? dataSection : null
  };
}
function triggerBackupDownload(url, fileName) {
  if (typeof document === 'undefined') {
    return false;
  }
  var anchor;
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
  var parent = document.body || document.documentElement || document.head;
  var appended = false;
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
    return "data:application/json;charset=utf-8,".concat(encodeURIComponent(payload));
  } catch (error) {
    console.warn('Failed to encode backup data URL', error);
    return null;
  }
}
function getManualDownloadFallbackMessage() {
  if ((typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts) {
    var _texts$en;
    var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    var langTexts = texts[lang] || texts.en || {};
    var fallback = langTexts.manualDownloadFallback || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.manualDownloadFallback);
    if (fallback) {
      return fallback;
    }
  }
  return 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
}
function getManualDownloadCopyHint() {
  if ((typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts) {
    var _texts$en2;
    var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    var langTexts = texts[lang] || texts.en || {};
    var fallback = langTexts.manualDownloadCopyHint || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.manualDownloadCopyHint);
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
  var backupWindow = null;
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
    var doc = backupWindow.document;
    if (!doc) {
      return false;
    }
    var langAttr = document && document.documentElement && document.documentElement.getAttribute ? document.documentElement.getAttribute('lang') : 'en';
    doc.open();
    doc.write("<!DOCTYPE html><html lang=\"".concat(langAttr || 'en', "\"><head><meta charset=\"utf-8\"><title>Manual download</title></head><body></body></html>"));
    doc.close();
    try {
      doc.title = fileName || 'backup.json';
    } catch (titleError) {
      void titleError;
    }
    var body = doc.body;
    if (!body) {
      return false;
    }
    body.style.margin = '0';
    body.style.padding = '1.5rem';
    body.style.background = '#f8f9fb';
    body.style.color = '#0f172a';
    body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    var container = doc.createElement('div');
    container.style.maxWidth = '960px';
    container.style.margin = '0 auto';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';
    var heading = doc.createElement('h1');
    heading.textContent = fileName || 'Manual backup';
    heading.style.margin = '0';
    heading.style.fontSize = '1.5rem';
    heading.style.fontWeight = '600';
    var description = doc.createElement('p');
    description.textContent = getManualDownloadFallbackMessage();
    description.style.margin = '0';
    description.style.lineHeight = '1.5';
    var helper = doc.createElement('p');
    helper.textContent = getManualDownloadCopyHint();
    helper.style.margin = '0';
    helper.style.lineHeight = '1.5';
    var textArea = doc.createElement('textarea');
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
  var failureResult = {
    success: false,
    method: null
  };
  if (typeof payload !== 'string') {
    return failureResult;
  }
  var blob = null;
  if (typeof Blob !== 'undefined') {
    try {
      blob = new Blob([payload], {
        type: 'application/json'
      });
    } catch (blobError) {
      console.warn('Failed to create backup blob', blobError);
      blob = null;
    }
  }
  if (blob) {
    if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
      try {
        navigator.msSaveOrOpenBlob(blob, fileName);
        return {
          success: true,
          method: 'ms-save'
        };
      } catch (msError) {
        console.warn('Saving backup via msSaveOrOpenBlob failed', msError);
      }
    }
    if (typeof URL !== 'undefined' && URL && typeof URL.createObjectURL === 'function') {
      var objectUrl = null;
      try {
        objectUrl = URL.createObjectURL(blob);
      } catch (urlError) {
        console.warn('Failed to create backup object URL', urlError);
        objectUrl = null;
      }
      if (objectUrl) {
        var triggered = triggerBackupDownload(objectUrl, fileName);
        try {
          if (typeof URL.revokeObjectURL === 'function') {
            URL.revokeObjectURL(objectUrl);
          }
        } catch (revokeError) {
          console.warn('Failed to revoke backup object URL', revokeError);
        }
        if (triggered) {
          return {
            success: true,
            method: 'object-url'
          };
        }
      }
    }
  }
  var dataUrl = encodeBackupDataUrl(payload);
  if (dataUrl) {
    var _triggered = triggerBackupDownload(dataUrl, fileName);
    if (_triggered) {
      return {
        success: true,
        method: 'data-url'
      };
    }
  }
  if (openBackupFallbackWindow(payload, fileName)) {
    return {
      success: true,
      method: 'window-fallback'
    };
  }
  return failureResult;
}
var SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
var SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
var backupDiffOptionsCache = [];
var backupDiffState = {
  baseline: '',
  comparison: ''
};
function getDiffText(key) {
  var fallbackValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var langTexts = texts && typeof currentLang === 'string' ? texts[currentLang] : null;
  var fallbackTexts = texts && texts.en ? texts.en : {};
  if (langTexts && Object.prototype.hasOwnProperty.call(langTexts, key)) {
    var value = langTexts[key];
    if (typeof value === 'string' && value) {
      return value;
    }
  }
  if (fallbackTexts && Object.prototype.hasOwnProperty.call(fallbackTexts, key)) {
    var _value = fallbackTexts[key];
    if (typeof _value === 'string' && _value) {
      return _value;
    }
  }
  return fallbackValue;
}
function formatNumberForComparison(value) {
  var lang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
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
  return typeof name === 'string' && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX) || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
}
function parseAutoBackupName(name) {
  if (typeof name !== 'string') {
    return null;
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
    var remainder = name.slice(SESSION_AUTO_BACKUP_DELETION_PREFIX.length);
    var parts = remainder.split('-');
    if (parts.length >= 6) {
      var _parts = _toArray(parts),
        year = _parts[0],
        month = _parts[1],
        day = _parts[2],
        hour = _parts[3],
        minute = _parts[4],
        second = _parts[5],
        rest = _parts.slice(6);
      var date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
      var label = rest.join('-').trim();
      return {
        type: 'auto-backup-before-delete',
        date: Number.isNaN(date.valueOf()) ? null : date,
        label: label,
        includeSeconds: true
      };
    }
  } else if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
    var _remainder = name.slice(SESSION_AUTO_BACKUP_NAME_PREFIX.length);
    var _parts2 = _remainder.split('-');
    if (_parts2.length >= 5) {
      var _parts3 = _toArray(_parts2),
        _year = _parts3[0],
        _month = _parts3[1],
        _day = _parts3[2],
        _hour = _parts3[3],
        _minute = _parts3[4],
        _rest = _parts3.slice(5);
      var _date = new Date(Number(_year), Number(_month) - 1, Number(_day), Number(_hour), Number(_minute));
      var _label = _rest.join('-').trim();
      return {
        type: 'auto-backup',
        date: Number.isNaN(_date.valueOf()) ? null : _date,
        label: _label,
        includeSeconds: false
      };
    }
  }
  return null;
}
function formatTimestampForComparison(date, includeSeconds) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }
  var lang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
  var options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
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
  var parsed = parseAutoBackupName(name);
  if (!parsed) {
    var manualLabel = getDiffText('versionCompareManualLabel', 'Manual save');
    return "".concat(manualLabel, " \xB7 ").concat(name);
  }
  var typeLabel = parsed.type === 'auto-backup-before-delete' ? getDiffText('versionCompareAutoDeleteLabel', 'Auto backup before delete') : getDiffText('versionCompareAutoLabel', 'Auto backup');
  var timestamp = formatTimestampForComparison(parsed.date, parsed.includeSeconds);
  var suffix = parsed.label ? " \xB7 ".concat(parsed.label) : '';
  return timestamp ? "".concat(typeLabel, " \xB7 ").concat(timestamp).concat(suffix) : "".concat(typeLabel).concat(suffix ? " \xB7 ".concat(suffix) : '');
}
function collectBackupDiffOptions() {
  var setups = getSetups();
  if (!setups || _typeof(setups) !== 'object') {
    return [];
  }
  return Object.keys(setups).filter(function (name) {
    return typeof name === 'string' && name;
  }).map(function (name) {
    return {
      value: name,
      label: formatComparisonOptionLabel(name),
      data: setups[name]
    };
  }).sort(function (a, b) {
    var autoA = isAutoBackupName(a.value);
    var autoB = isAutoBackupName(b.value);
    if (autoA !== autoB) {
      return autoA ? 1 : -1;
    }
    return localeSort(a.label, b.label);
  });
}
function fillBackupDiffSelect(select, options, selectedValue) {
  if (!select) return;
  var placeholderText = getDiffText('versionCompareSelectPlaceholder', 'Select a version');
  var fragment = document.createDocumentFragment();
  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderText;
  placeholder.disabled = options.length > 0;
  placeholder.selected = true;
  fragment.appendChild(placeholder);
  options.forEach(function (option) {
    var opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    fragment.appendChild(opt);
  });
  select.innerHTML = '';
  select.appendChild(fragment);
  if (selectedValue && options.some(function (option) {
    return option.value === selectedValue;
  })) {
    select.value = selectedValue;
    placeholder.selected = false;
  } else {
    select.value = '';
  }
}
function clearBackupDiffResults() {
  if (backupDiffList) {
    backupDiffList.innerHTML = '';
  }
  if (backupDiffListContainer) {
    backupDiffListContainer.hidden = true;
  }
}
function formatDiffPath(parts) {
  if (!Array.isArray(parts) || !parts.length) {
    return getDiffText('versionCompareRootPath', 'Entire setup');
  }
  return parts.map(function (part) {
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
  var entries = [];
  function walk(baseValue, compareValue, path) {
    if (valuesEqual(baseValue, compareValue)) {
      return;
    }
    var baseIsObject = isPlainObject(baseValue);
    var compareIsObject = isPlainObject(compareValue);
    if (baseIsObject && compareIsObject) {
      var keys = new Set([].concat(_toConsumableArray(Object.keys(baseValue)), _toConsumableArray(Object.keys(compareValue))));
      keys.forEach(function (key) {
        var hasBase = Object.prototype.hasOwnProperty.call(baseValue, key);
        var hasCompare = Object.prototype.hasOwnProperty.call(compareValue, key);
        if (!hasBase) {
          entries.push({
            type: 'added',
            path: path.concat(key),
            before: undefined,
            after: compareValue[key]
          });
        } else if (!hasCompare) {
          entries.push({
            type: 'removed',
            path: path.concat(key),
            before: baseValue[key],
            after: undefined
          });
        } else {
          walk(baseValue[key], compareValue[key], path.concat(key));
        }
      });
      return;
    }
    var baseIsArray = Array.isArray(baseValue);
    var compareIsArray = Array.isArray(compareValue);
    if (baseIsArray && compareIsArray) {
      var maxLength = Math.max(baseValue.length, compareValue.length);
      for (var index = 0; index < maxLength; index += 1) {
        var hasBase = index < baseValue.length;
        var hasCompare = index < compareValue.length;
        var nextPath = path.concat("[".concat(index, "]"));
        if (!hasBase) {
          entries.push({
            type: 'added',
            path: nextPath,
            before: undefined,
            after: compareValue[index]
          });
        } else if (!hasCompare) {
          entries.push({
            type: 'removed',
            path: nextPath,
            before: baseValue[index],
            after: undefined
          });
        } else {
          walk(baseValue[index], compareValue[index], nextPath);
        }
      }
      return;
    }
    if (!baseIsObject && !baseIsArray && (compareIsObject || compareIsArray)) {
      entries.push({
        type: 'changed',
        path: path,
        before: baseValue,
        after: compareValue
      });
      return;
    }
    if ((baseIsObject || baseIsArray) && !compareIsObject && !compareIsArray) {
      entries.push({
        type: 'changed',
        path: path,
        before: baseValue,
        after: compareValue
      });
      return;
    }
    var changeType = baseValue === undefined ? 'added' : compareValue === undefined ? 'removed' : 'changed';
    entries.push({
      type: changeType,
      path: path,
      before: baseValue,
      after: compareValue
    });
  }
  walk(baseline, comparison, []);
  return entries;
}
function createDiffValueElement(value) {
  var element = document.createElement('pre');
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
  var block = document.createElement('div');
  block.className = 'diff-change';
  var label = document.createElement('span');
  label.className = 'diff-label';
  label.textContent = labelText;
  block.appendChild(label);
  block.appendChild(createDiffValueElement(value));
  return block;
}
function renderBackupDiffEntries(entries) {
  if (!backupDiffList || !backupDiffListContainer) {
    return;
  }
  backupDiffList.innerHTML = '';
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffListContainer.hidden = true;
    return;
  }
  backupDiffListContainer.hidden = false;
  entries.forEach(function (entry) {
    var item = document.createElement('li');
    item.className = "diff-entry diff-".concat(entry.type);
    var path = document.createElement('div');
    path.className = 'diff-path';
    path.textContent = formatDiffPath(entry.path);
    item.appendChild(path);
    if (entry.type === 'changed') {
      var status = document.createElement('span');
      status.className = 'diff-label diff-status';
      status.textContent = getDiffText('versionCompareChangeUpdated', 'Updated');
      item.appendChild(status);
      item.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeRemoved', 'Removed'), entry.before));
      item.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeAdded', 'Added'), entry.after));
    } else if (entry.type === 'added') {
      item.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeAdded', 'Added'), entry.after));
    } else if (entry.type === 'removed') {
      item.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeRemoved', 'Removed'), entry.before));
    }
    backupDiffList.appendChild(item);
  });
}
function formatDiffCount(count) {
  var key = count === 1 ? 'versionCompareDifferencesCountOne' : 'versionCompareDifferencesCountOther';
  var template = getDiffText(key, count === 1 ? '%s difference noted.' : '%s differences noted.');
  return template.replace('%s', formatNumberForComparison(count));
}
function formatDiffDetail(key, count) {
  var template = getDiffText(key, '%s');
  return template.replace('%s', formatNumberForComparison(count));
}
function updateBackupDiffSummary(entries) {
  if (!backupDiffSummary) {
    return;
  }
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffSummary.textContent = getDiffText('versionCompareIdentical', 'Versions match—no changes detected.');
    return;
  }
  var totals = {
    added: 0,
    removed: 0,
    changed: 0
  };
  entries.forEach(function (entry) {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });
  var summaryText = formatDiffCount(entries.length);
  var breakdown = [];
  if (totals.added) {
    breakdown.push(formatDiffDetail('versionCompareSummaryAdded', totals.added));
  }
  if (totals.removed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryRemoved', totals.removed));
  }
  if (totals.changed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryChanged', totals.changed));
  }
  backupDiffSummary.textContent = breakdown.length ? "".concat(summaryText, " (").concat(breakdown.join(' · '), ")") : summaryText;
}
function renderBackupDiff() {
  if (!backupDiffSummary) {
    return;
  }
  if (!backupDiffOptionsCache.length) {
    clearBackupDiffResults();
    backupDiffSummary.textContent = getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.');
    if (backupDiffExportButton) backupDiffExportButton.disabled = true;
    if (backupDiffNotes) backupDiffNotes.disabled = true;
    return;
  }
  if (backupDiffNotes) backupDiffNotes.disabled = false;
  var baseline = backupDiffState.baseline;
  var comparison = backupDiffState.comparison;
  if (!baseline || !comparison) {
    clearBackupDiffResults();
    backupDiffSummary.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
    if (backupDiffExportButton) backupDiffExportButton.disabled = true;
    return;
  }
  if (baseline === comparison) {
    clearBackupDiffResults();
    backupDiffSummary.textContent = getDiffText('versionCompareSameSelection', 'Select two different versions to compare.');
    if (backupDiffExportButton) backupDiffExportButton.disabled = true;
    return;
  }
  var optionsMap = new Map(backupDiffOptionsCache.map(function (option) {
    return [option.value, option];
  }));
  var baselineEntry = optionsMap.get(baseline);
  var comparisonEntry = optionsMap.get(comparison);
  if (!baselineEntry || !comparisonEntry) {
    clearBackupDiffResults();
    backupDiffSummary.textContent = getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.');
    if (backupDiffExportButton) backupDiffExportButton.disabled = true;
    return;
  }
  var diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  renderBackupDiffEntries(diffEntries);
  updateBackupDiffSummary(diffEntries);
  if (backupDiffExportButton) backupDiffExportButton.disabled = false;
}
function populateBackupDiffSelectors() {
  backupDiffOptionsCache = collectBackupDiffOptions();
  fillBackupDiffSelect(backupDiffPrimarySelect, backupDiffOptionsCache, backupDiffState.baseline);
  fillBackupDiffSelect(backupDiffSecondarySelect, backupDiffOptionsCache, backupDiffState.comparison);
  if (backupDiffEmptyState) {
    backupDiffEmptyState.hidden = backupDiffOptionsCache.length > 0;
  }
  renderBackupDiff();
}
function collapseBackupDiffSection() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!backupDiffSection) {
    return;
  }
  if (!backupDiffSection.hasAttribute('hidden')) {
    backupDiffSection.setAttribute('hidden', '');
  }
  if (backupDiffToggleButton) {
    backupDiffToggleButton.setAttribute('aria-expanded', 'false');
  }
  if (options.resetSelections) {
    backupDiffState.baseline = '';
    backupDiffState.comparison = '';
  }
  if (options.resetNotes && backupDiffNotes) {
    backupDiffNotes.value = '';
  }
}
function showBackupDiffSection() {
  if (!backupDiffSection) {
    return;
  }
  populateBackupDiffSelectors();
  backupDiffSection.removeAttribute('hidden');
  if (backupDiffToggleButton) {
    backupDiffToggleButton.setAttribute('aria-expanded', 'true');
  }
  if (backupDiffPrimarySelect) {
    try {
      backupDiffPrimarySelect.focus({
        preventScroll: true
      });
    } catch (error) {
      backupDiffPrimarySelect.focus();
    }
  }
}
function handleBackupDiffToggle() {
  if (!backupDiffSection) {
    return;
  }
  if (backupDiffSection.hasAttribute('hidden')) {
    showBackupDiffSection();
  } else {
    collapseBackupDiffSection();
  }
}
function handleBackupDiffSelectionChange(event) {
  var target = event && event.target ? event.target : null;
  if (!target) {
    return;
  }
  var value = typeof target.value === 'string' ? target.value : '';
  if (target === backupDiffPrimarySelect) {
    backupDiffState.baseline = value;
  } else if (target === backupDiffSecondarySelect) {
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
  var baseline = backupDiffState.baseline;
  var comparison = backupDiffState.comparison;
  if (!baseline || !comparison || baseline === comparison) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }
  var optionsMap = new Map(backupDiffOptionsCache.map(function (option) {
    return [option.value, option];
  }));
  var baselineEntry = optionsMap.get(baseline);
  var comparisonEntry = optionsMap.get(comparison);
  if (!baselineEntry || !comparisonEntry) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }
  var diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  var totals = {
    added: 0,
    removed: 0,
    changed: 0
  };
  diffEntries.forEach(function (entry) {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });
  var note = backupDiffNotes && typeof backupDiffNotes.value === 'string' ? backupDiffNotes.value.trim() : '';
  var timestamp = new Date();
  var _formatFullBackupFile = formatFullBackupFilename(timestamp),
    iso = _formatFullBackupFile.iso;
  var safeIso = iso.replace(/[:]/g, '-');
  var fileName = "cine-power-planner-version-log-".concat(safeIso, ".json");
  var exportPayload = {
    type: 'cine-power-planner-version-log',
    version: 1,
    createdAt: new Date().toISOString(),
    appVersion: typeof APP_VERSION === 'string' ? APP_VERSION : null,
    baseline: {
      id: baselineEntry.value,
      label: baselineEntry.label,
      type: getComparisonEntryType(baselineEntry.value),
      snapshot: cloneValueForExport(baselineEntry.data)
    },
    comparison: {
      id: comparisonEntry.value,
      label: comparisonEntry.label,
      type: getComparisonEntryType(comparisonEntry.value),
      snapshot: cloneValueForExport(comparisonEntry.data)
    },
    summary: {
      totalDifferences: diffEntries.length,
      added: totals.added,
      removed: totals.removed,
      updated: totals.changed
    },
    differences: diffEntries.map(function (entry) {
      return {
        type: entry.type,
        path: entry.path,
        before: entry.before,
        after: entry.after
      };
    })
  };
  if (note) {
    exportPayload.note = note;
  }
  var serialized;
  try {
    serialized = JSON.stringify(exportPayload, null, 2);
  } catch (error) {
    console.warn('Failed to serialize comparison export payload', error);
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
    return;
  }
  var downloadResult = downloadBackupPayload(serialized, fileName);
  if (downloadResult && downloadResult.success) {
    showNotification('success', getDiffText('versionCompareExportSuccess', 'Comparison log exported.'));
  } else {
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
  }
}
function applyPreferencesFromStorage(safeGetItem) {
  if (typeof safeGetItem !== 'function') {
    return {
      showAutoBackups: false,
      accentColor: null,
      language: null
    };
  }
  var restoredTemperatureUnit = safeGetItem(temperaturePreferenceStorageKey);
  if (restoredTemperatureUnit) {
    try {
      applyTemperatureUnitPreference(restoredTemperatureUnit, {
        persist: false
      });
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
  var showBackups = safeGetItem('showAutoBackups') === 'true';
  var color = safeGetItem('accentColor');
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
  var language = safeGetItem('language');
  return {
    showAutoBackups: showBackups,
    accentColor: color || null,
    language: language || null
  };
}
function captureSetupSelection() {
  return {
    value: setupSelect ? setupSelect.value : '',
    name: setupNameInput ? setupNameInput.value : ''
  };
}
function restoreSetupSelection(previousSelection, shouldShowAutoBackups) {
  if (!previousSelection || _typeof(previousSelection) !== 'object') {
    return;
  }
  var _previousSelection$va = previousSelection.value,
    value = _previousSelection$va === void 0 ? '' : _previousSelection$va,
    _previousSelection$na = previousSelection.name,
    name = _previousSelection$na === void 0 ? '' : _previousSelection$na;
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
function createSettingsBackup() {
  var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  try {
    var isEvent = notify && _typeof(notify) === 'object' && typeof notify.type === 'string';
    var shouldNotify = isEvent ? true : Boolean(notify);
    var _formatFullBackupFile2 = formatFullBackupFilename(timestamp),
      iso = _formatFullBackupFile2.iso,
      fileName = _formatFullBackupFile2.fileName;
    var safeStorage = resolveSafeLocalStorage();
    var settings = captureStorageSnapshot(safeStorage);
    var sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    var backup = {
      version: APP_VERSION,
      generatedAt: iso,
      settings: settings,
      sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
      data: typeof exportAllData === 'function' ? exportAllData() : {}
    };
    var payload = JSON.stringify(backup);
    var downloadResult = downloadBackupPayload(payload, fileName);
    if (!downloadResult || !downloadResult.success) {
      throw new Error('No supported download method available');
    }
    try {
      recordFullBackupHistoryEntryFn({
        createdAt: iso,
        fileName: fileName
      });
    } catch (historyError) {
      console.warn('Failed to record full backup history entry', historyError);
    }
    if (downloadResult.method === 'window-fallback') {
      var manualMessage = getManualDownloadFallbackMessage();
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
if (backupDiffToggleButton) {
  backupDiffToggleButton.addEventListener('click', handleBackupDiffToggle);
}
if (backupDiffCloseButton) {
  backupDiffCloseButton.addEventListener('click', function () {
    return collapseBackupDiffSection();
  });
}
if (backupDiffPrimarySelect) {
  backupDiffPrimarySelect.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffSecondarySelect) {
  backupDiffSecondarySelect.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffExportButton) {
  backupDiffExportButton.addEventListener('click', handleBackupDiffExport);
  backupDiffExportButton.disabled = true;
}
if (backupDiffSummary) {
  backupDiffSummary.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
}
if (backupDiffNotes) {
  backupDiffNotes.disabled = true;
}
if (backupDiffSection) {
  collapseBackupDiffSection();
}
if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', function () {
    return restoreSettingsInput.click();
  });
  restoreSettingsInput.addEventListener('change', function () {
    var file = restoreSettingsInput.files[0];
    if (!file) return;
    var langTexts = texts[currentLang] || {};
    var fallbackTexts = texts.en || {};
    var restoreFailureMessage = langTexts.restoreFailed || fallbackTexts.restoreFailed || 'Restore failed. Check the backup file and try again.';
    var backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before restore failed', error);
    }
    if (!backupFileName) {
      var failureMessage = langTexts.restoreBackupFailed || fallbackTexts.restoreBackupFailed || 'Backup failed. Restore cancelled.';
      showNotification('error', failureMessage);
      alert(failureMessage);
      restoreSettingsInput.value = '';
      return;
    }
    showNotification('success', 'Full app backup downloaded');
    var safeStorage = resolveSafeLocalStorage();
    var storedSettingsSnapshot = captureStorageSnapshot(safeStorage);
    var storedSessionSnapshot = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    var previousSelection = captureSetupSelection();
    var restoreMutated = false;
    var finalizeRestore = function finalizeRestore() {
      try {
        restoreSettingsInput.value = '';
      } catch (resetError) {
        void resetError;
      }
    };
    var revertAfterFailure = function revertAfterFailure() {
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
      var safeGetItem = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
      var preferenceState = applyPreferencesFromStorage(safeGetItem);
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
    var handleRestoreError = function handleRestoreError(error) {
      console.warn('Restore failed', error);
      showNotification('error', restoreFailureMessage);
      alert(restoreFailureMessage);
      finalizeRestore();
    };
    var processBackupPayload = function processBackupPayload(rawPayload) {
      try {
        var sanitizedPayload = sanitizeBackupPayload(rawPayload);
        if (!sanitizedPayload || !sanitizedPayload.trim()) {
          throw new Error('Backup payload empty');
        }
        var parsed = JSON.parse(sanitizedPayload);
        var _extractBackupSection = extractBackupSections(parsed),
          restoredSettings = _extractBackupSection.settings,
          restoredSession = _extractBackupSection.sessionStorage,
          data = _extractBackupSection.data,
          fileVersion = _extractBackupSection.fileVersion;
        var hasSettings = restoredSettings && Object.keys(restoredSettings).length > 0;
        var hasSessionEntries = restoredSession && Object.keys(restoredSession).length > 0;
        var hasDataEntries = data && Object.keys(data).length > 0;
        if (!hasSettings && !hasSessionEntries && !hasDataEntries) {
          throw new Error('Backup missing recognized sections');
        }
        if (fileVersion !== APP_VERSION) {
          alert("".concat(texts[currentLang].restoreVersionWarning, " (").concat(fileVersion || 'unknown', " \u2192 ").concat(APP_VERSION, ")"));
        }
        if (restoredSettings && _typeof(restoredSettings) === 'object') {
          if (safeStorage && typeof safeStorage.setItem === 'function') {
            restoreMutated = true;
            Object.entries(restoredSettings).forEach(function (_ref18) {
              var _ref19 = _slicedToArray(_ref18, 2),
                k = _ref19[0],
                v = _ref19[1];
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
          Object.entries(restoredSession).forEach(function (_ref20) {
            var _ref21 = _slicedToArray(_ref20, 2),
              key = _ref21[0],
              value = _ref21[1];
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
          syncAutoGearRulesFromStorage(data === null || data === void 0 ? void 0 : data.autoGearRules);
        } catch (rulesError) {
          console.warn('Failed to sync automatic gear rules after restore', rulesError);
        }
        var safeGetItem = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
        var preferenceState = applyPreferencesFromStorage(safeGetItem);
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
    var attemptTextFallback = function attemptTextFallback(reason) {
      if (!file || typeof file.text !== 'function') {
        return false;
      }
      if (reason) {
        console.warn('FileReader unavailable for restore, using file.text()', reason);
      } else {
        console.warn('FileReader unavailable for restore, using file.text()');
      }
      Promise.resolve().then(function () {
        return file.text();
      }).then(processBackupPayload).catch(handleRestoreError);
      return true;
    };
    var reader = null;
    if (typeof FileReader === 'function') {
      try {
        reader = new FileReader();
      } catch (readerError) {
        console.warn('Failed to create FileReader for restore', readerError);
        reader = null;
      }
    }
    if (reader && typeof reader.readAsText === 'function') {
      reader.onload = function (event) {
        var result = event && event.target ? event.target.result : '';
        processBackupPayload(result);
      };
      reader.onerror = function () {
        var error = reader.error || new Error('Failed to read backup file');
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
  var primarySelects = [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect];
  primarySelects.forEach(function (select) {
    if (!select) return;
    try {
      var options = Array.from(select.options || []);
      var noneOption = options.find(function (opt) {
        return opt.value === 'None';
      });
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
    var sliderSelect = getSliderBowlSelect();
    if (sliderSelect) sliderSelect.value = '';
  } catch (error) {
    console.warn('Failed to reset slider bowl selection during factory reset', error);
  }
  try {
    var easyrigSelect = getEasyrigSelect();
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
  factoryResetButton.addEventListener('click', function () {
    var langTexts = texts[currentLang] || texts.en || {};
    var confirmReset = langTexts.confirmFactoryReset || 'Create a backup and wipe all planner data?';
    if (!confirm(confirmReset)) return;
    var confirmResetAgain = langTexts.confirmFactoryResetAgain || 'This will permanently delete all saved planner data. Continue?';
    if (!confirm(confirmResetAgain)) return;
    if (typeof createSettingsBackup !== 'function') {
      var errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
      return;
    }
    var backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before factory reset failed', error);
    }
    if (!backupFileName) {
      var backupFailedMsg = langTexts.factoryResetBackupFailed || 'Backup failed. Data was not deleted.';
      showNotification('error', backupFailedMsg);
      return;
    }
    if (typeof clearAllData !== 'function') {
      var _errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg);
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
      var successMsg = langTexts.factoryResetSuccess || 'Backup downloaded. All planner data cleared. Reloading…';
      showNotification('success', successMsg);
      setTimeout(function () {
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
      var _errorMsg2 = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg2);
    }
  });
}
var UI_CACHE_STORAGE_KEYS_FOR_RELOAD = ['cameraPowerPlanner_schemaCache', 'cinePowerPlanner_schemaCache'];
var UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = ['', '__backup', '__legacyMigrationBackup'];
var uiCacheFallbackWarningKeys = new Set();
function collectFallbackUiCacheStorages() {
  var storages = new Set();
  var registerStorage = function registerStorage(candidate, label) {
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      return;
    }
    var hasRemove = typeof candidate.removeItem === 'function';
    var hasDelete = typeof candidate.delete === 'function';
    if (!hasRemove && !hasDelete) {
      return;
    }
    storages.add(candidate);
  };
  var _inspectScope = function inspectScope(scope, label) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    try {
      registerStorage(scope.SAFE_LOCAL_STORAGE, "".concat(label, ".SAFE_LOCAL_STORAGE"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".SAFE_LOCAL_STORAGE"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".SAFE_LOCAL_STORAGE"));
        console.warn("Unable to inspect ".concat(label, ".SAFE_LOCAL_STORAGE while clearing UI caches"), error);
      }
    }
    try {
      registerStorage(scope.localStorage, "".concat(label, ".localStorage"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".localStorage"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".localStorage"));
        console.warn("Unable to inspect ".concat(label, ".localStorage while clearing UI caches"), error);
      }
    }
    try {
      registerStorage(scope.sessionStorage, "".concat(label, ".sessionStorage"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".sessionStorage"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".sessionStorage"));
        console.warn("Unable to inspect ".concat(label, ".sessionStorage while clearing UI caches"), error);
      }
    }
    var nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".__cineGlobal"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".__cineGlobal"));
        console.warn("Unable to inspect ".concat(label, ".__cineGlobal while clearing UI caches"), error);
      }
    }
    if (nested && nested !== scope) {
      _inspectScope(nested, "".concat(label, ".__cineGlobal"));
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
  var scopeCandidates = [{
    scope: typeof globalThis !== 'undefined' ? globalThis : null,
    label: 'globalThis'
  }, {
    scope: typeof window !== 'undefined' ? window : null,
    label: 'window'
  }, {
    scope: typeof self !== 'undefined' ? self : null,
    label: 'self'
  }, {
    scope: typeof global !== 'undefined' ? global : null,
    label: 'global'
  }];
  if (typeof __cineGlobal !== 'undefined') {
    scopeCandidates.push({
      scope: __cineGlobal,
      label: '__cineGlobal'
    });
  }
  scopeCandidates.forEach(function (_ref22) {
    var scope = _ref22.scope,
      label = _ref22.label;
    _inspectScope(scope, label);
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
  var storages = collectFallbackUiCacheStorages();
  if (!storages || !storages.size) {
    return;
  }
  storages.forEach(function (storage) {
    UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach(function (baseKey) {
      if (typeof baseKey !== 'string' || !baseKey) {
        return;
      }
      UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach(function (suffix) {
        var entryKey = suffix ? "".concat(baseKey).concat(suffix) : baseKey;
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
function clearCachesAndReload() {
  return _clearCachesAndReload.apply(this, arguments);
}
function _clearCachesAndReload() {
  _clearCachesAndReload = _asyncToGenerator(_regenerator().m(function _callee() {
    var uiCacheCleared, registrations, _navigator, serviceWorker, regs, reg, readyReg, keys, _window, location, hasReplace, hasReload, navigationTriggered, paramName, timestamp, href, hash, hashIndex, pattern, replacement, _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          uiCacheCleared = false;
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
          _context.p = 1;
          if (!(typeof navigator !== 'undefined' && navigator.serviceWorker)) {
            _context.n = 13;
            break;
          }
          registrations = [];
          _navigator = navigator, serviceWorker = _navigator.serviceWorker;
          _context.p = 2;
          if (!(typeof serviceWorker.getRegistrations === 'function')) {
            _context.n = 4;
            break;
          }
          _context.n = 3;
          return serviceWorker.getRegistrations();
        case 3:
          regs = _context.v;
          if (Array.isArray(regs)) {
            regs.forEach(function (reg) {
              return registrations.push(reg);
            });
          }
          _context.n = 10;
          break;
        case 4:
          if (!(typeof serviceWorker.getRegistration === 'function')) {
            _context.n = 6;
            break;
          }
          _context.n = 5;
          return serviceWorker.getRegistration();
        case 5:
          reg = _context.v;
          if (reg) {
            registrations.push(reg);
          }
          _context.n = 10;
          break;
        case 6:
          if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
            _context.n = 10;
            break;
          }
          _context.p = 7;
          _context.n = 8;
          return serviceWorker.ready;
        case 8:
          readyReg = _context.v;
          if (readyReg) {
            registrations.push(readyReg);
          }
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          console.warn('Failed to await active service worker', _t);
        case 10:
          _context.n = 12;
          break;
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          console.warn('Failed to query service worker registrations', _t2);
        case 12:
          if (!registrations.length) {
            _context.n = 13;
            break;
          }
          _context.n = 13;
          return Promise.all(registrations.map(function (reg) {
            if (!reg || typeof reg.unregister !== 'function') {
              return Promise.resolve();
            }
            return reg.unregister().catch(function (unregisterError) {
              console.warn('Service worker unregister failed', unregisterError);
            });
          }));
        case 13:
          if (!(typeof caches !== 'undefined' && caches && typeof caches.keys === 'function')) {
            _context.n = 15;
            break;
          }
          _context.n = 14;
          return caches.keys();
        case 14:
          keys = _context.v;
          _context.n = 15;
          return Promise.all(keys.map(function (key) {
            if (!key || typeof caches.delete !== 'function') {
              return Promise.resolve(false);
            }
            return caches.delete(key).catch(function (cacheError) {
              console.warn('Failed to delete cache', key, cacheError);
              return false;
            });
          }));
        case 15:
          _context.n = 17;
          break;
        case 16:
          _context.p = 16;
          _t3 = _context.v;
          console.warn('Cache clear failed', _t3);
        case 17:
          _context.p = 17;
          try {
            if (typeof window !== 'undefined' && window.location) {
              _window = window, location = _window.location;
              hasReplace = location && typeof location.replace === 'function';
              hasReload = location && typeof location.reload === 'function';
              navigationTriggered = false;
              if (hasReplace) {
                paramName = 'forceReload';
                timestamp = Date.now().toString(36);
                href = location.href || '';
                hash = '';
                hashIndex = href.indexOf('#');
                if (hashIndex !== -1) {
                  hash = href.slice(hashIndex);
                  href = href.slice(0, hashIndex);
                }
                pattern = new RegExp('([?&])' + paramName + '=[^&]*');
                replacement = '$1' + paramName + '=' + timestamp;
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
          return _context.f(17);
        case 18:
          return _context.a(2);
      }
    }, _callee, null, [[7, 9], [2, 11], [1, 16, 17, 18]]);
  }));
  return _clearCachesAndReload.apply(this, arguments);
}
if (reloadButton) {
  reloadButton.addEventListener("click", clearCachesAndReload);
}
function exportDiagramSvg() {
  if (!setupDiagramContainer) return '';
  var svgEl = setupDiagramContainer.querySelector('svg');
  if (!svgEl) return '';
  var clone = svgEl.cloneNode(true);
  var labels = svgEl.querySelectorAll('.edge-label');
  var cloneLabels = clone.querySelectorAll('.edge-label');
  labels.forEach(function (lbl, idx) {
    if (cloneLabels[idx]) {
      cloneLabels[idx].textContent = lbl.textContent;
    }
  });
  var style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = getDiagramCss(false);
  clone.insertBefore(style, clone.firstChild);
  var serializer = new XMLSerializer();
  return serializer.serializeToString(clone);
}
function copyTextToClipboardBestEffort(text) {
  if (typeof text !== 'string' || !text) {
    return;
  }
  if (typeof navigator !== 'undefined' && navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).catch(function () {});
    return;
  }
  if (typeof document === 'undefined' || !document || !document.body || typeof document.createElement !== 'function') {
    return;
  }
  var textarea = null;
  var previousActiveElement = document.activeElement;
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
    } catch (_unused2) {}
    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch (_unused3) {}
    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch (_unused4) {}
    }
  } catch (_unused5) {} finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch (_unused6) {}
    }
  }
}
if (downloadDiagramBtn) {
  downloadDiagramBtn.addEventListener('click', function (e) {
    var source = exportDiagramSvg();
    if (!source) return;
    copyTextToClipboardBestEffort(source);
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var datePart = "".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "_").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var namePart = (getCurrentProjectName() || 'setup').replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '');
    var baseName = "".concat(datePart, "_").concat(namePart, "_diagram");
    var saveSvg = function saveSvg() {
      var blob = new Blob([source], {
        type: 'image/svg+xml;charset=utf-8'
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = "".concat(baseName, ".svg");
      a.click();
      URL.revokeObjectURL(url);
    };
    if (e.shiftKey) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function (blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = "".concat(baseName, ".jpg");
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
  gridSnapToggleBtn.addEventListener('click', function () {
    gridSnap = !gridSnap;
    gridSnapToggleBtn.classList.toggle('active', gridSnap);
    gridSnapToggleBtn.setAttribute('aria-pressed', gridSnap ? 'true' : 'false');
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
  });
}
if (helpButton && helpDialog) {
  var helpContent = helpDialog.querySelector('.help-content');
  var helpQuickLinkItems = new Map();
  var helpSectionHighlightTimers = new Map();
  var appTargetHighlightTimers = new Map();
  var featureSearchHighlightTimers = new Map();
  var highlightAppTarget = function highlightAppTarget(element) {
    if (!element) return;
    var target = element;
    var existing = appTargetHighlightTimers.get(target);
    if (existing) {
      clearTimeout(existing);
    }
    target.classList.add('help-target-focus');
    var timeout = setTimeout(function () {
      target.classList.remove('help-target-focus');
      appTargetHighlightTimers.delete(target);
    }, 2000);
    appTargetHighlightTimers.set(target, timeout);
  };
  var highlightFeatureSearchTargets = function highlightFeatureSearchTargets(targets) {
    if (!Array.isArray(targets) || targets.length === 0) return;
    var seen = new Set();
    targets.forEach(function (target) {
      var _target$classList;
      if (!target || typeof ((_target$classList = target.classList) === null || _target$classList === void 0 ? void 0 : _target$classList.add) !== 'function') return;
      if (seen.has(target)) return;
      seen.add(target);
      var existing = featureSearchHighlightTimers.get(target);
      if (existing) {
        clearTimeout(existing);
      }
      target.classList.add('feature-search-focus');
      var timeout = setTimeout(function () {
        target.classList.remove('feature-search-focus');
        featureSearchHighlightTimers.delete(target);
      }, 2500);
      featureSearchHighlightTimers.set(target, timeout);
    });
  };
  var findAssociatedLabelElements = function findAssociatedLabelElements(element) {
    if (!element) return [];
    var labels = new Set();
    var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (element.labels && _typeof(element.labels) === 'object') {
      Array.from(element.labels).forEach(function (label) {
        if (label) labels.add(label);
      });
    }
    if (typeof element.closest === 'function') {
      var wrappingLabel = element.closest('label');
      if (wrappingLabel) labels.add(wrappingLabel);
    }
    if (doc && typeof element.getAttribute === 'function') {
      var collectIdRefs = function collectIdRefs(attrValue) {
        if (!attrValue) return;
        attrValue.split(/\s+/).filter(Boolean).forEach(function (id) {
          var ref = doc.getElementById(id);
          if (ref) labels.add(ref);
        });
      };
      collectIdRefs(element.getAttribute('aria-labelledby'));
      collectIdRefs(element.getAttribute('aria-describedby'));
    }
    return Array.from(labels);
  };
  var focusFeatureElement = function focusFeatureElement(element) {
    if (!element) return;
    var settingsSection = element.closest('#settingsDialog');
    var settingsPanel = element.closest('.settings-panel');
    if (settingsPanel) {
      var labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
      var tabIds = labelledBy.split(/\s+/).map(function (id) {
        return id.trim();
      }).filter(Boolean);
      var matchingTabId = tabIds.find(function (id) {
        return document.getElementById(id);
      });
      if (matchingTabId) {
        activateSettingsTab(matchingTabId);
      }
    }
    if (settingsSection && !isDialogOpen(settingsDialog)) {
      var _settingsButton, _settingsButton$click;
      (_settingsButton = settingsButton) === null || _settingsButton === void 0 || (_settingsButton$click = _settingsButton.click) === null || _settingsButton$click === void 0 || _settingsButton$click.call(_settingsButton);
    }
    var dialog = element.closest('dialog');
    if (dialog && !isDialogOpen(dialog)) {
      if (dialog.id === 'projectDialog') {
        var _generateGearListBtn, _generateGearListBtn$;
        (_generateGearListBtn = generateGearListBtn) === null || _generateGearListBtn === void 0 || (_generateGearListBtn$ = _generateGearListBtn.click) === null || _generateGearListBtn$ === void 0 || _generateGearListBtn$.call(_generateGearListBtn);
      } else if (dialog.id === 'feedbackDialog') {
        var _runtimeFeedbackBtn, _runtimeFeedbackBtn$c;
        (_runtimeFeedbackBtn = runtimeFeedbackBtn) === null || _runtimeFeedbackBtn === void 0 || (_runtimeFeedbackBtn$c = _runtimeFeedbackBtn.click) === null || _runtimeFeedbackBtn$c === void 0 || _runtimeFeedbackBtn$c.call(_runtimeFeedbackBtn);
      } else if (dialog.id === 'overviewDialog') {
        var _generateOverviewBtn, _generateOverviewBtn$;
        (_generateOverviewBtn = generateOverviewBtn) === null || _generateOverviewBtn === void 0 || (_generateOverviewBtn$ = _generateOverviewBtn.click) === null || _generateOverviewBtn$ === void 0 || _generateOverviewBtn$.call(_generateOverviewBtn);
      } else {
        openDialog(dialog);
      }
    }
    var deviceManager = element.closest('#device-manager');
    if (deviceManager) {
      showDeviceManagerSection();
    }
    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    var hadTabIndex = element.hasAttribute('tabindex');
    var addedTabIndex = false;
    if (!hadTabIndex) {
      var tabIndex = element.tabIndex;
      if (typeof tabIndex === 'number' && tabIndex < 0) {
        element.setAttribute('tabindex', '-1');
        addedTabIndex = true;
      }
    }
    if (typeof element.focus === 'function') {
      try {
        element.focus({
          preventScroll: true
        });
      } catch (_unused7) {
        element.focus();
      }
    }
    if (addedTabIndex) {
      element.addEventListener('blur', function () {
        return element.removeAttribute('tabindex');
      }, {
        once: true
      });
    }
  };
  var focusHelpSectionHeading = function focusHelpSectionHeading(section) {
    if (!section) return;
    var heading = section.querySelector('h3, summary, h4, h5, h6') || section.querySelector('button, a');
    if (!heading) return;
    var hadTabIndex = heading.hasAttribute('tabindex');
    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
    try {
      heading.focus({
        preventScroll: true
      });
    } catch (_unused8) {
      heading.focus();
    }
    if (!hadTabIndex) {
      heading.addEventListener('blur', function () {
        return heading.removeAttribute('tabindex');
      }, {
        once: true
      });
    }
  };
  var highlightHelpSection = function highlightHelpSection(section) {
    if (!section) return;
    var existingTimer = helpSectionHighlightTimers.get(section);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    section.classList.add('help-section-focus');
    var timer = setTimeout(function () {
      section.classList.remove('help-section-focus');
      helpSectionHighlightTimers.delete(section);
    }, 1500);
    helpSectionHighlightTimers.set(section, timer);
  };
  var syncHelpQuickLinksVisibility = function syncHelpQuickLinksVisibility() {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    var hasVisible = false;
    helpQuickLinkItems.forEach(function (_ref23) {
      var section = _ref23.section,
        listItem = _ref23.listItem,
        button = _ref23.button;
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
  var applyQuickLinkLanguage = function applyQuickLinkLanguage(lang) {
    if (!helpQuickLinksNav) return;
    var langTexts = texts && texts[lang] || {};
    var fallbackTexts = texts && texts.en || {};
    var headingText = langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
    if (helpQuickLinksHeading && headingText) {
      helpQuickLinksHeading.textContent = headingText;
    }
    var ariaLabel = langTexts.helpQuickLinksAriaLabel || headingText || fallbackTexts.helpQuickLinksAriaLabel || 'Help topics quick navigation';
    helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
    var helpDescription = langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
    if (helpDescription) {
      helpQuickLinksNav.setAttribute('data-help', helpDescription);
    } else {
      helpQuickLinksNav.removeAttribute('data-help');
    }
    var template = langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
    helpQuickLinkItems.forEach(function (_ref24) {
      var button = _ref24.button,
        label = _ref24.label;
      if (!button) return;
      if (template) {
        var helpText = template.replace('%s', label);
        button.setAttribute('data-help', helpText);
        button.setAttribute('aria-label', helpText);
      } else {
        button.removeAttribute('data-help');
        button.setAttribute('aria-label', label);
      }
    });
  };
  updateHelpQuickLinksForLanguage = applyQuickLinkLanguage;
  var buildHelpQuickLinks = function buildHelpQuickLinks() {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
      helpQuickLinkItems.clear();
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinkItems.clear();
    helpQuickLinksList.textContent = '';
    var fragment = document.createDocumentFragment();
    var sections = Array.from(helpSectionsContainer.querySelectorAll('section[data-help-section]'));
    sections.forEach(function (section) {
      var id = section.id;
      if (!id) return;
      var heading = section.querySelector('h3');
      if (!heading) return;
      var headingIcon = heading.querySelector('.help-icon.icon-glyph');
      var label = heading.textContent || '';
      if (headingIcon) {
        var iconText = headingIcon.textContent || '';
        if (iconText) {
          var iconIndex = label.indexOf(iconText);
          if (iconIndex > -1) {
            label = label.slice(0, iconIndex) + label.slice(iconIndex + iconText.length);
          }
        }
      }
      label = label.trim();
      if (!label) return;
      var li = document.createElement('li');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'help-quick-link';
      button.dataset.targetId = id;
      button.setAttribute('aria-label', label);
      if (headingIcon) {
        var icon = headingIcon.cloneNode(true);
        icon.classList.remove('help-icon');
        icon.classList.add('help-quick-link-icon');
        button.appendChild(icon);
      }
      var labelSpan = document.createElement('span');
      labelSpan.className = 'help-quick-link-label';
      labelSpan.textContent = label;
      button.appendChild(labelSpan);
      button.addEventListener('click', function () {
        if (section.hasAttribute('hidden')) return;
        if (helpQuickLinksList) {
          helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
            return btn.classList.remove('active');
          });
        }
        button.classList.add('active');
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        highlightHelpSection(section);
        focusHelpSectionHeading(section);
        var quickLinkHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
        if (quickLinkHeading) {
          highlightFeatureSearchTargets([quickLinkHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
      });
      li.appendChild(button);
      fragment.appendChild(li);
      helpQuickLinkItems.set(id, {
        section: section,
        button: button,
        listItem: li,
        label: label
      });
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
    helpDialog.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-help-target]');
      if (!link) return;
      var rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
      var selector = rawSelector.trim();
      if (!selector) return;
      var focusEl;
      try {
        focusEl = document.querySelector(selector);
      } catch (_unused9) {
        focusEl = null;
      }
      if (!focusEl) return;
      e.preventDefault();
      var highlightSelector = link.dataset.helpHighlight || '';
      var highlightEl = focusEl;
      if (highlightSelector) {
        try {
          var candidate = document.querySelector(highlightSelector);
          if (candidate) {
            highlightEl = candidate;
          }
        } catch (_unused0) {}
      }
      var targetInsideHelp = helpDialog.contains(focusEl);
      var runFocus = function runFocus() {
        focusFeatureElement(focusEl);
        if (highlightEl) {
          highlightAppTarget(highlightEl);
        }
        var extraTargets = findAssociatedLabelElements(highlightEl || focusEl);
        if (extraTargets.length) {
          highlightFeatureSearchTargets(extraTargets);
        }
      };
      if (targetInsideHelp) {
        runFocus();
        return;
      }
      closeHelp(null);
      requestAnimationFrame(function () {
        requestAnimationFrame(runFocus);
      });
    });
  }
  var HELP_SEARCH_ACCENT_VARIANTS = new Map([['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'], ['b', 'ḃɓ'], ['c', 'çćĉċčƈ'], ['d', 'ďđḍḑḓ'], ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'], ['f', 'ƒḟ'], ['g', 'ğģĝġǵḡ'], ['h', 'ĥħḣḥḧẖ'], ['i', 'ìíîïĩīĭįıỉị'], ['j', 'ĵǰ'], ['k', 'ķƙḱḳḵ'], ['l', 'ĺļľłḷḽ'], ['m', 'ḿṁṃ'], ['n', 'ñńņňǹṅṇṋ'], ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'], ['p', 'ṕṗ'], ['q', 'ʠ'], ['r', 'ŕŗřȑȓṛṙ'], ['s', 'śŝşšșṡṣ'], ['t', 'ţťțṫṭṯ'], ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'], ['v', 'ṽṿ'], ['w', 'ŵẁẃẅẇẉ'], ['x', 'ẋẍ'], ['y', 'ýÿŷỳỷỹỵ'], ['z', 'źżžẑẓẕ']]);
  var normaliseHelpSearchText = function normaliseHelpSearchText(str) {
    if (!str) return '';
    var normalized = String(str).toLowerCase();
    if (typeof normalized.normalize === 'function') {
      normalized = normalized.normalize('NFD');
    }
    normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/[°º˚]/g, 'deg').replace(/\bdegrees?\b/g, 'deg').replace(/[×✕✖✗✘]/g, 'x');
    normalized = normalizeSpellingVariants(normalized);
    normalized = normaliseMarkVariants(normalized);
    return normalized.replace(/[^a-z0-9]+/g, '');
  };
  var buildHelpHighlightPattern = function buildHelpHighlightPattern(normalized) {
    if (!normalized) return null;
    var escapeRegExp = function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    var parts = [];
    var addLetterPattern = function addLetterPattern(char) {
      var variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
      var chars = new Set();
      var all = "".concat(char).concat(variants);
      var _iterator2 = _createForOfIteratorHelper(all),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ch = _step2.value;
          chars.add(ch);
          var upper = ch.toUpperCase();
          if (upper) chars.add(upper);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var escaped = Array.from(chars).map(escapeRegExp).join('');
      return "[".concat(escaped, "]");
    };
    var letters = Array.from(normalized);
    letters.forEach(function (char, index) {
      if (index > 0) parts.push('\\s*');
      if (/[a-z]/.test(char)) {
        parts.push(addLetterPattern(char));
      } else if (/[0-9]/.test(char)) {
        parts.push(char);
      } else {
        parts.push(escapeRegExp(char));
      }
    });
    return "(".concat(parts.join(''), ")");
  };
  updateHelpResultsSummaryText = function updateHelpResultsSummaryText() {
    var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      totalCount = _ref25.totalCount,
      visibleCount = _ref25.visibleCount,
      hasQuery = _ref25.hasQuery,
      queryText = _ref25.queryText;
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
    var storedTotal = Number(helpResultsSummary.dataset.totalCount || 0);
    if (!storedTotal) {
      helpResultsSummary.textContent = '';
      helpResultsSummary.setAttribute('hidden', '');
      return;
    }
    var storedVisible = Number(helpResultsSummary.dataset.visibleCount || 0);
    var storedHasQuery = helpResultsSummary.dataset.hasQuery === 'true';
    var storedQuery = helpResultsSummary.dataset.query || '';
    var langTexts = texts && texts[currentLang] || {};
    var fallbackTexts = texts && texts.en || {};
    var summaryText = '';
    if (storedHasQuery) {
      var template = langTexts.helpResultsSummaryFiltered || fallbackTexts.helpResultsSummaryFiltered;
      if (template) {
        summaryText = template.replace('%1$s', storedVisible).replace('%2$s', storedTotal).replace('%3$s', storedQuery);
      } else if (storedQuery) {
        summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics for \u201C").concat(storedQuery, "\u201D.");
      } else {
        summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics.");
      }
    } else {
      var _template = langTexts.helpResultsSummaryAll || fallbackTexts.helpResultsSummaryAll;
      if (_template) {
        summaryText = _template.replace('%s', storedTotal);
      } else {
        summaryText = "All ".concat(storedTotal, " help topics are shown.");
      }
    }
    helpResultsSummary.textContent = summaryText;
    helpResultsSummary.removeAttribute('hidden');
  };
  var filterHelp = function filterHelp() {
    if (!helpSearch) {
      if (helpResultsSummary) helpResultsSummary.setAttribute('hidden', '');
      return;
    }
    var rawQuery = helpSearch.value.trim();
    var normalizedQuery = normaliseHelpSearchText(rawQuery);
    var hasQuery = normalizedQuery.length > 0;
    var sections = Array.from(helpDialog.querySelectorAll('[data-help-section]'));
    var items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    var elements = sections.concat(items);
    var totalCount = elements.length;
    var visibleCount = 0;
    var highlightPattern = hasQuery ? buildHelpHighlightPattern(normalizedQuery) : null;
    var highlightMatches = function highlightMatches(root, pattern) {
      if (!pattern || typeof document.createTreeWalker !== 'function' || typeof NodeFilter === 'undefined') {
        return;
      }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(function (node) {
        var text = node.textContent;
        if (!text) return;
        var regex = new RegExp(pattern, 'giu');
        var firstMatch = regex.exec(text);
        if (!firstMatch) return;
        var frag = document.createDocumentFragment();
        var lastIndex = 0;
        var match = firstMatch;
        do {
          var start = match.index;
          var end = start + match[0].length;
          if (start > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, start)));
          }
          var mark = document.createElement('mark');
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
    elements.forEach(function (el) {
      var isFaqItem = el.classList.contains('faq-item');
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
        if (isFaqItem) {
          el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
        }
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      var text = normaliseHelpSearchText(el.textContent || '');
      var keywordText = normaliseHelpSearchText(el.dataset.helpKeywords || '');
      var matches = !hasQuery || text.includes(normalizedQuery) || keywordText.includes(normalizedQuery);
      if (matches) {
        if (hasQuery && highlightPattern) {
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
        el.setAttribute('hidden', '');
        if (isFaqItem) {
          el.removeAttribute('open');
        }
      }
    });
    if (typeof updateHelpResultsSummaryText === 'function') {
      updateHelpResultsSummaryText({
        totalCount: totalCount,
        visibleCount: visibleCount,
        hasQuery: hasQuery,
        queryText: rawQuery || normalizedQuery
      });
    }
    if (helpNoResults) {
      if (visibleCount > 0) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      if (hasQuery) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
    syncHelpQuickLinksVisibility();
  };
  var openHelp = function openHelp() {
    closeSideMenu();
    helpDialog.removeAttribute('hidden');
    openDialog(helpDialog);
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      if (helpQuickLinksList) {
        helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
          return btn.classList.remove('active');
        });
      }
      if (helpContent) {
        helpContent.scrollTop = 0;
      }
      helpSearch.focus();
    } else {
      try {
        helpDialog.focus({
          preventScroll: true
        });
      } catch (_unused1) {
        helpDialog.focus();
      }
    }
  };
  var closeHelp = function closeHelp() {
    var returnFocusEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : helpButton;
    closeDialog(helpDialog);
    helpDialog.setAttribute('hidden', '');
    if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
      try {
        returnFocusEl.focus({
          preventScroll: true
        });
      } catch (_unused10) {
        returnFocusEl.focus();
      }
    }
  };
  var toggleHelp = function toggleHelp() {
    if (!isDialogOpen(helpDialog)) {
      openHelp();
    } else {
      closeHelp();
    }
  };
  var hoverHelpActive = false;
  var hoverHelpTooltip;
  var hoverHelpCurrentTarget = null;
  var HOVER_HELP_TARGET_SELECTOR = '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';
  var findHoverHelpTarget = function findHoverHelpTarget(start) {
    if (!start) return null;
    var el = start.closest(HOVER_HELP_TARGET_SELECTOR);
    if (!el || el.tagName === 'SECTION') {
      return null;
    }
    return el;
  };
  var collectHoverHelpText = function collectHoverHelpText(el) {
    if (!el) return [];
    var parts = [];
    var addText = function addText(value) {
      if (typeof value !== 'string') return;
      var trimmed = value.trim();
      if (!trimmed) return;
      if (!parts.includes(trimmed)) parts.push(trimmed);
    };
    var addTextFromElement = function addTextFromElement(element) {
      var _ref26 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref26$includeTextCon = _ref26.includeTextContent,
        includeTextContent = _ref26$includeTextCon === void 0 ? false : _ref26$includeTextCon;
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
    var applyFromIds = function applyFromIds(ids) {
      if (!ids) return;
      ids.split(/\s+/).filter(Boolean).forEach(function (id) {
        var ref = document.getElementById(id);
        if (!ref) return;
        addTextFromElement(ref, {
          includeTextContent: true
        });
      });
    };
    applyFromIds(el.getAttribute('aria-labelledby'));
    addText(el.getAttribute('alt'));
    applyFromIds(el.getAttribute('aria-describedby'));
    findAssociatedLabelElements(el).forEach(function (labelEl) {
      addTextFromElement(labelEl, {
        includeTextContent: true
      });
    });
    if (!parts.length) {
      addText(el.textContent);
    }
    return parts;
  };
  var positionHoverHelpTooltip = function positionHoverHelpTooltip(target) {
    if (!hoverHelpTooltip || !target) return;
    var rect = target.getBoundingClientRect();
    var docEl = document.documentElement;
    var viewportWidth = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientWidth) || 0, window.innerWidth || 0);
    var viewportHeight = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientHeight) || 0, window.innerHeight || 0);
    var scrollX = window.scrollX || window.pageXOffset || 0;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var horizontalOffset = 12;
    var verticalOffset = 10;
    var viewportPadding = 8;
    var safeLeft = Number.isFinite(rect.left) ? rect.left : 0;
    var safeRight = Number.isFinite(rect.right) ? rect.right : safeLeft + (rect.width || 0);
    var safeTop = Number.isFinite(rect.top) ? rect.top : 0;
    var safeBottom = Number.isFinite(rect.bottom) ? rect.bottom : safeTop;
    var tooltipRect = hoverHelpTooltip.getBoundingClientRect();
    var tooltipWidth = tooltipRect.width || hoverHelpTooltip.offsetWidth || 0;
    var tooltipHeight = tooltipRect.height || hoverHelpTooltip.offsetHeight || 0;
    var top = safeBottom + scrollY + verticalOffset;
    var left = safeLeft + scrollX;
    if (tooltipWidth) {
      var viewportRightLimit = scrollX + viewportWidth - viewportPadding;
      var defaultRight = left + tooltipWidth;
      if (defaultRight > viewportRightLimit) {
        left = safeRight + scrollX - tooltipWidth - horizontalOffset;
      }
      var minLeft = scrollX + viewportPadding;
      var maxLeft = scrollX + Math.max(viewportWidth - tooltipWidth - viewportPadding, viewportPadding);
      if (left < minLeft) {
        left = minLeft;
      } else if (left > maxLeft) {
        left = maxLeft;
      }
    }
    if (tooltipHeight) {
      var minTop = scrollY + viewportPadding;
      var maxTop = scrollY + Math.max(viewportHeight - tooltipHeight - viewportPadding, viewportPadding);
      if (top > maxTop) {
        var aboveTop = safeTop + scrollY - tooltipHeight - verticalOffset;
        if (aboveTop >= minTop) {
          top = aboveTop;
        } else {
          top = Math.min(Math.max(top, minTop), maxTop);
        }
      } else if (top < minTop) {
        top = minTop;
      }
    }
    hoverHelpTooltip.style.top = "".concat(top, "px");
    hoverHelpTooltip.style.left = "".concat(left, "px");
  };
  var hideHoverHelpTooltip = function hideHoverHelpTooltip() {
    if (!hoverHelpTooltip) return;
    hoverHelpTooltip.setAttribute('hidden', '');
    hoverHelpTooltip.style.removeProperty('visibility');
  };
  var updateHoverHelpTooltip = function updateHoverHelpTooltip(target) {
    hoverHelpCurrentTarget = target || null;
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    var textParts = collectHoverHelpText(target);
    if (!textParts.length) {
      hideHoverHelpTooltip();
      return;
    }
    hoverHelpTooltip.textContent = textParts.join(' ');
    var wasHidden = hoverHelpTooltip.hasAttribute('hidden');
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
  var canInteractDuringHoverHelp = function canInteractDuringHoverHelp(target) {
    if (!hoverHelpActive || !target) return false;
    return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
  };
  var stopHoverHelp = function stopHoverHelp() {
    hoverHelpActive = false;
    hoverHelpCurrentTarget = null;
    if (hoverHelpTooltip) {
      hoverHelpTooltip.remove();
      hoverHelpTooltip = null;
    }
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };
  var startHoverHelp = function startHoverHelp() {
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
  var refreshTooltipPosition = function refreshTooltipPosition() {
    if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };
  document.addEventListener('mouseover', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    var target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });
  document.addEventListener('focusin', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    var target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });
  document.addEventListener('focusout', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
      hoverHelpCurrentTarget = null;
      hideHoverHelpTooltip();
    }
  });
  window.addEventListener('scroll', refreshTooltipPosition, true);
  window.addEventListener('resize', refreshTooltipPosition);
  document.addEventListener('mousedown', function (e) {
    if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
      e.preventDefault();
    }
  }, true);
  document.addEventListener('click', function (e) {
    if (!hoverHelpActive) return;
    if (canInteractDuringHoverHelp(e.target)) {
      return;
    }
    e.preventDefault();
    stopHoverHelp();
  });
  if (hoverHelpButton) {
    hoverHelpButton.addEventListener('click', function (e) {
      e.stopPropagation();
      startHoverHelp();
    });
  }
  var focusFeatureSearchInput = function focusFeatureSearchInput() {
    var _featureSearch$showPi, _featureSearch;
    if (!featureSearch) return;
    var sideMenu = document.getElementById('sideMenu');
    if (sideMenu !== null && sideMenu !== void 0 && sideMenu.contains(featureSearch)) {
      openSideMenu();
    }
    if (typeof featureSearch.scrollIntoView === 'function') {
      featureSearch.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    try {
      featureSearch.focus({
        preventScroll: true
      });
    } catch (_unused11) {
      featureSearch.focus();
    }
    if (typeof featureSearch.select === 'function') {
      featureSearch.select();
    }
    (_featureSearch$showPi = (_featureSearch = featureSearch).showPicker) === null || _featureSearch$showPi === void 0 || _featureSearch$showPi.call(_featureSearch);
  };
  runFeatureSearch = function runFeatureSearch(query) {
    var _featureSearch2;
    var rawQuery = typeof query === 'string' ? query : ((_featureSearch2 = featureSearch) === null || _featureSearch2 === void 0 ? void 0 : _featureSearch2.value) || '';
    var originalNormalized = normalizeSearchValue(rawQuery);
    var value = rawQuery.trim();
    if (!value) return;
    var lower = value.toLowerCase();
    var isHelp = lower.endsWith(' (help)');
    var clean = isHelp ? value.slice(0, -7).trim() : value;
    var cleanKey = searchKey(clean);
    var cleanTokens = searchTokens(clean);
    var helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    var deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    var featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    var helpScore = (helpMatch === null || helpMatch === void 0 ? void 0 : helpMatch.score) || 0;
    var deviceScore = (deviceMatch === null || deviceMatch === void 0 ? void 0 : deviceMatch.score) || 0;
    var featureScore = (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.score) || 0;
    var deviceStrong = deviceMatch ? STRONG_SEARCH_MATCH_TYPES.has(deviceMatch.matchType) : false;
    var featureStrong = featureMatch ? STRONG_SEARCH_MATCH_TYPES.has(featureMatch.matchType) : false;
    var bestNonHelpScore = Math.max(deviceScore, featureScore);
    var hasStrongNonHelp = deviceStrong || featureStrong;
    var preferHelp = !!helpMatch && (isHelp || !hasStrongNonHelp && helpScore > bestNonHelpScore);
    if (!isHelp && !preferHelp) {
      var shouldUseDevice = !!deviceMatch && (!featureMatch || deviceStrong && !featureStrong || deviceStrong === featureStrong && (deviceScore > featureScore || deviceScore === featureScore && (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.matchType) !== 'exactKey'));
      if (shouldUseDevice) {
        var device = deviceMatch.value;
        if (device && device.select) {
          device.select.value = device.value;
          device.select.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          if (device.label) {
            updateFeatureSearchValue(device.label, originalNormalized);
          }
          focusFeatureElement(device.select);
          var highlightTargets = [device.select].concat(_toConsumableArray(findAssociatedLabelElements(device.select)));
          highlightFeatureSearchTargets(highlightTargets);
          return;
        }
      }
      if (featureMatch) {
        var feature = featureMatch.value;
        var featureEl = (feature === null || feature === void 0 ? void 0 : feature.element) || feature;
        if (featureEl) {
          var _featureEl$textConten;
          var label = (feature === null || feature === void 0 ? void 0 : feature.label) || ((_featureEl$textConten = featureEl.textContent) === null || _featureEl$textConten === void 0 ? void 0 : _featureEl$textConten.trim());
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
          }
          focusFeatureElement(featureEl);
          var _highlightTargets = [featureEl].concat(_toConsumableArray(findAssociatedLabelElements(featureEl)));
          highlightFeatureSearchTargets(_highlightTargets);
          return;
        }
      }
    }
    if (helpMatch) {
      var helpEntry = helpMatch.value || {};
      var section = helpEntry.section;
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
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        highlightHelpSection(section);
        var sectionHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
        if (sectionHeading) {
          highlightFeatureSearchTargets([sectionHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
        var quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
        if (helpQuickLinksList) {
          helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
            return btn.classList.remove('active');
          });
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
    var handle = function handle() {
      return runFeatureSearch(featureSearch.value);
    };
    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('input', function () {
      var _featureSearch$showPi2, _featureSearch3;
      updateFeatureSearchSuggestions(featureSearch.value);
      (_featureSearch$showPi2 = (_featureSearch3 = featureSearch).showPicker) === null || _featureSearch$showPi2 === void 0 || _featureSearch$showPi2.call(_featureSearch3);
    });
    featureSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape' && featureSearch.value) {
        var _featureSearch$showPi3, _featureSearch4;
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        (_featureSearch$showPi3 = (_featureSearch4 = featureSearch).showPicker) === null || _featureSearch$showPi3 === void 0 || _featureSearch$showPi3.call(_featureSearch4);
        e.preventDefault();
      }
    });
  }
  helpButton.addEventListener('click', toggleHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (helpSearch) helpSearch.addEventListener('input', filterHelp);
  if (helpSearchClear) helpSearchClear.addEventListener('click', function () {
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    }
  });
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement.tagName;
    var isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    if (hoverHelpActive && e.key === 'Escape') {
      stopHoverHelp();
    } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
      e.preventDefault();
      closeHelp();
    } else if (e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)) {
      e.preventDefault();
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertAccentColor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (e.key === 'F1' || (e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      toggleHelp();
    } else if (e.key === '/' && !isTextField && (!helpDialog || !isDialogOpen(helpDialog))) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key === '?' && !isTextField || e.key.toLowerCase() === 'h' && !isTextField) {
      e.preventDefault();
      toggleHelp();
    } else if (isDialogOpen(helpDialog) && (e.key === '/' && !isTextField || e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey))) {
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
  helpDialog.addEventListener('click', function (e) {
    if (e.target === helpDialog) closeHelp();
  });
  helpDialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    closeHelp();
  });
}
var scenarioIcons = {
  Indoor: iconGlyph("\uF194", ICON_FONT_KEYS.ESSENTIAL),
  Outdoor: iconGlyph("\uF278", ICON_FONT_KEYS.ESSENTIAL),
  Studio: iconGlyph("\uF128", ICON_FONT_KEYS.FILM),
  Tripod: iconGlyph("\uF12C", ICON_FONT_KEYS.FILM),
  Handheld: iconGlyph("\uE93B", ICON_FONT_KEYS.UICONS),
  Easyrig: iconGlyph("\uE15B", ICON_FONT_KEYS.UICONS),
  'Cine Saddle': iconGlyph("\uF01B", ICON_FONT_KEYS.UICONS),
  Steadybag: iconGlyph("\uE925", ICON_FONT_KEYS.UICONS),
  Dolly: iconGlyph("\uF109", ICON_FONT_KEYS.FILM),
  Slider: iconGlyph("\uE112", ICON_FONT_KEYS.UICONS),
  Steadicam: iconGlyph("\uEFBD", ICON_FONT_KEYS.UICONS),
  Gimbal: iconGlyph("\uEA9C", ICON_FONT_KEYS.UICONS),
  Trinity: iconGlyph("\uEA4E", ICON_FONT_KEYS.UICONS),
  Rollcage: iconGlyph("\uF04C", ICON_FONT_KEYS.UICONS),
  'Car Mount': iconGlyph("\uE35B", ICON_FONT_KEYS.UICONS),
  Jib: iconGlyph("\uE553", ICON_FONT_KEYS.UICONS),
  'Undersling mode': iconGlyph("\uE0D8", ICON_FONT_KEYS.UICONS),
  Crane: iconGlyph("\uE554", ICON_FONT_KEYS.UICONS),
  'Remote Head': ICON_GLYPHS.controller,
  'Extreme cold (snow)': iconGlyph("\uF0FB", ICON_FONT_KEYS.UICONS),
  'Extreme rain': iconGlyph("\uE4A6", ICON_FONT_KEYS.UICONS),
  'Extreme heat': iconGlyph("\uE80F", ICON_FONT_KEYS.UICONS),
  'Rain Machine': iconGlyph("\uF153", ICON_FONT_KEYS.UICONS),
  'Slow Motion': iconGlyph("\uF373", ICON_FONT_KEYS.UICONS),
  'Battery Belt': ICON_GLYPHS.batteryBolt
};
function updateRequiredScenariosSummary() {
  if (!requiredScenariosSelect || !requiredScenariosSummary) return;
  requiredScenariosSummary.innerHTML = '';
  var selected = Array.from(requiredScenariosSelect.selectedOptions).map(function (o) {
    return o.value;
  });
  var hasDolly = selected.includes('Dolly');
  if (remoteHeadOption) {
    if (!hasDolly) {
      remoteHeadOption.hidden = true;
      remoteHeadOption.selected = false;
      selected = selected.filter(function (v) {
        return v !== 'Remote Head';
      });
    } else {
      remoteHeadOption.hidden = false;
    }
  }
  if (hasDolly && monitorSelect && (!monitorSelect.value || monitorSelect.value === 'None')) {
    var _devices;
    var defaultMonitor = 'SmallHD Ultra 7';
    if ((_devices = devices) !== null && _devices !== void 0 && (_devices = _devices.monitors) !== null && _devices !== void 0 && _devices[defaultMonitor]) {
      if (!Array.from(monitorSelect.options).some(function (o) {
        return o.value === defaultMonitor;
      })) {
        var opt = document.createElement('option');
        opt.value = defaultMonitor;
        opt.textContent = defaultMonitor;
        monitorSelect.appendChild(opt);
      }
      monitorSelect.value = defaultMonitor;
      monitorSelect.dispatchEvent(new Event('change'));
    }
  }
  if (videoDistributionSelect) {
    var ensureOption = function ensureOption(val) {
      var opt = Array.from(videoDistributionSelect.options).find(function (o) {
        return o.value === val;
      });
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
  selected.forEach(function (val) {
    var box = document.createElement('span');
    box.className = 'scenario-box';
    var iconSpan = document.createElement('span');
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
      if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(function (o) {
        o.selected = false;
      });
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
    filterSelectElem.addEventListener('change', function () {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  document.querySelectorAll('#projectForm select').forEach(function (sel) {
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
  var tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    ensureFeedbackTemperatureOptions(tempSelect);
    updateFeedbackTemperatureOptions();
  }
}
function populateLensDropdown() {
  if (!lensSelect) return;
  lensSelect.innerHTML = '';
  var lensData = devices && devices.lenses;
  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }
  if (!lensSelect.multiple) {
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(function (name) {
    var _ref27, _lens$minFocusMeters;
    var opt = document.createElement('option');
    opt.value = name;
    var lens = lensData[name] || {};
    var attrs = [];
    if (lens.weight_g) attrs.push("".concat(lens.weight_g, "g"));
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push("".concat(lens.frontDiameterMm, "mm clamp-on"));else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref27 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref27 !== void 0 ? _ref27 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (minFocus) attrs.push("".concat(minFocus, "m min focus"));
    opt.textContent = attrs.length ? "".concat(name, " (").concat(attrs.join(', '), ")") : name;
    lensSelect.appendChild(opt);
  });
}
function populateCameraPropertyDropdown(selectId, property) {
  var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var dropdown = document.getElementById(selectId);
  if (!dropdown) return;
  dropdown.innerHTML = '';
  var emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  dropdown.appendChild(emptyOpt);
  var camKey = cameraSelect && cameraSelect.value;
  var values = camKey && devices && devices.cameras && devices.cameras[camKey] ? devices.cameras[camKey][property] : null;
  if (Array.isArray(values)) {
    values.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      if (v === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
  }
}
function populateRecordingResolutionDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}
function populateSensorModeDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}
function populateCodecDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}
function populateFilterDropdown() {
  if (filterSelectElem && devices && Array.isArray(devices.filterOptions)) {
    if (!filterSelectElem.multiple) {
      var emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      filterSelectElem.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      filterSelectElem.appendChild(opt);
    });
  }
}
var filterId = function filterId(t) {
  return t.replace(/[^a-z0-9]/gi, '_');
};
function getFilterValueConfig(type) {
  switch (type) {
    case 'IRND':
      return {
        opts: ['0.3', '0.6', '0.9', '1.2', '1.5', '1.8', '2.1', '2.5'],
        defaults: ['0.3', '1.2']
      };
    case 'Diopter':
      return {
        opts: ['+1/4', '+1/2', '+1', '+2', '+3', '+4'],
        defaults: ['+1/2', '+1', '+2', '+4']
      };
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
      return {
        opts: ['1', '1/2', '1/4', '1/8', '1/16'],
        defaults: ['1/2', '1/4', '1/8']
      };
  }
}
function createFilterSizeSelect(type) {
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FILTER_SIZE;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$includeId = options.includeId,
    includeId = _options$includeId === void 0 ? true : _options$includeId,
    _options$idPrefix = options.idPrefix,
    idPrefix = _options$idPrefix === void 0 ? 'filter-size-' : _options$idPrefix;
  var sel = document.createElement('select');
  if (includeId) {
    sel.id = "".concat(idPrefix).concat(filterId(type));
  }
  var sizes = [DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [DEFAULT_FILTER_SIZE, '6x6', '95mm'];
  sizes.forEach(function (s) {
    var o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    if (s === selected) o.selected = true;
    sel.appendChild(o);
  });
  return sel;
}
function createFilterValueSelect(type, selected) {
  var sel = document.createElement('select');
  sel.id = "filter-values-".concat(filterId(type));
  sel.multiple = true;
  sel.setAttribute('multiple', '');
  var _getFilterValueConfig = getFilterValueConfig(type),
    opts = _getFilterValueConfig.opts,
    _getFilterValueConfig2 = _getFilterValueConfig.defaults,
    defaults = _getFilterValueConfig2 === void 0 ? [] : _getFilterValueConfig2;
  var selectedVals = Array.isArray(selected) ? selected.slice() : defaults.slice();
  var syncOption = function syncOption(option, isSelected) {
    option.selected = isSelected;
    if (isSelected) {
      option.setAttribute('selected', '');
    } else {
      option.removeAttribute('selected');
    }
  };
  var syncCheckbox = function syncCheckbox(checkbox, isChecked) {
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.setAttribute('checked', '');
    } else {
      checkbox.removeAttribute('checked');
    }
  };
  opts.forEach(function (o) {
    var opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    syncOption(opt, selectedVals.includes(o));
    sel.appendChild(opt);
  });
  sel.size = opts.length;
  sel.style.display = 'none';
  var container = document.createElement('span');
  container.className = 'filter-values-container';
  var checkboxName = "filterValues-".concat(filterId(type));
  opts.forEach(function (o) {
    var lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = checkboxName;
    cb.value = o;
    syncCheckbox(cb, selectedVals.includes(o));
    cb.addEventListener('change', function () {
      var opt = Array.from(sel.options).find(function (opt) {
        return opt.value === o;
      });
      if (opt) syncOption(opt, cb.checked);
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(o));
    container.appendChild(lbl);
  });
  sel.addEventListener('change', function () {
    Array.from(container.querySelectorAll('input[type="checkbox"]')).forEach(function (cb) {
      var opt = Array.from(sel.options).find(function (opt) {
        return opt.value === cb.value;
      });
      if (opt) syncOption(opt, opt.selected);
      syncCheckbox(cb, !!opt && opt.selected);
    });
  });
  container.appendChild(sel);
  return {
    container: container,
    select: sel
  };
}
function resolveFilterDisplayInfo(type) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FILTER_SIZE;
  switch (type) {
    case 'Diopter':
      return {
        label: 'Schneider CF DIOPTER FULL GEN2',
        gearName: 'Schneider CF DIOPTER FULL GEN2'
      };
    case 'Clear':
      return {
        label: 'Clear Filter',
        gearName: 'Clear Filter'
      };
    case 'IRND':
      return {
        label: 'IRND Filter Set',
        gearName: 'IRND Filter Set'
      };
    case 'Pol':
      return {
        label: 'Pol Filter',
        gearName: 'Pol Filter'
      };
    case 'Rota-Pol':
      {
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
      return {
        label: 'ND Grad HE Filter Set',
        gearName: 'ND Grad HE Filter Set'
      };
    case 'ND Grad SE':
      return {
        label: 'ND Grad SE Filter Set',
        gearName: 'ND Grad SE Filter Set'
      };
    default:
      return {
        label: "".concat(type, " Filter Set"),
        gearName: "".concat(type, " Filter Set")
      };
  }
}
function buildFilterGearEntries() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var entries = [];
  filters.forEach(function (_ref28) {
    var type = _ref28.type,
      _ref28$size = _ref28.size,
      size = _ref28$size === void 0 ? DEFAULT_FILTER_SIZE : _ref28$size,
      values = _ref28.values;
    if (!type) return;
    var sizeValue = size || DEFAULT_FILTER_SIZE;
    var idBase = "filter-".concat(filterId(type));
    switch (type) {
      case 'Diopter':
        {
          entries.push({
            id: "".concat(idBase, "-frame"),
            gearName: 'ARRI Diopter Frame 138mm',
            label: 'ARRI Diopter Frame 138mm',
            type: '',
            size: '',
            values: []
          });
          var diopterValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: "".concat(idBase, "-set"),
            gearName: 'Schneider CF DIOPTER FULL GEN2',
            label: 'Schneider CF DIOPTER FULL GEN2',
            type: type,
            size: '',
            values: diopterValues
          });
          break;
        }
      case 'Clear':
        {
          var _resolveFilterDisplay = resolveFilterDisplayInfo(type, sizeValue),
            label = _resolveFilterDisplay.label,
            gearName = _resolveFilterDisplay.gearName;
          entries.push({
            id: idBase,
            gearName: gearName,
            label: label,
            type: type,
            size: sizeValue,
            values: []
          });
          break;
        }
      case 'Pol':
        {
          var _resolveFilterDisplay2 = resolveFilterDisplayInfo(type, sizeValue),
            _label2 = _resolveFilterDisplay2.label,
            _gearName = _resolveFilterDisplay2.gearName;
          entries.push({
            id: idBase,
            gearName: _gearName,
            label: _label2,
            type: type,
            size: sizeValue,
            values: []
          });
          break;
        }
      case 'Rota-Pol':
        {
          var _resolveFilterDisplay3 = resolveFilterDisplayInfo(type, sizeValue),
            _label3 = _resolveFilterDisplay3.label,
            _gearName2 = _resolveFilterDisplay3.gearName;
          var displaySize = _label3.includes(sizeValue) ? '' : sizeValue;
          entries.push({
            id: idBase,
            gearName: _gearName2,
            label: _label3,
            type: type,
            size: displaySize,
            values: []
          });
          break;
        }
      case 'ND Grad HE':
      case 'ND Grad SE':
        {
          var _resolveFilterDisplay4 = resolveFilterDisplayInfo(type, sizeValue),
            _label4 = _resolveFilterDisplay4.label,
            _gearName3 = _resolveFilterDisplay4.gearName;
          var gradValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName3,
            label: _label4,
            type: type,
            size: sizeValue,
            values: gradValues
          });
          break;
        }
      default:
        {
          var _resolveFilterDisplay5 = resolveFilterDisplayInfo(type, sizeValue),
            _label5 = _resolveFilterDisplay5.label,
            _gearName4 = _resolveFilterDisplay5.gearName;
          var filterValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName4,
            label: _label5,
            type: type,
            size: sizeValue,
            values: filterValues
          });
        }
    }
  });
  return entries;
}
function formatFilterEntryText(entry) {
  var details = [];
  if (entry.size) details.push(entry.size);
  if (entry.values && entry.values.length) details.push(entry.values.join(', '));
  var suffix = details.length ? " (".concat(details.join(' • '), ")") : '';
  return "1x ".concat(entry.label).concat(suffix);
}
function updateGearListFilterEntries() {
  var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!gearListOutput) return;
  var entryMap = new Map(entries.map(function (entry) {
    return [entry.id, entry];
  }));
  gearListOutput.querySelectorAll('[data-filter-entry]').forEach(function (span) {
    var entryId = span.getAttribute('data-filter-entry');
    if (!entryId) return;
    var entry = entryMap.get(entryId);
    if (!entry) return;
    var hideSize = span.hasAttribute('data-filter-hide-size');
    var displayEntry = hideSize ? _objectSpread(_objectSpread({}, entry), {}, {
      size: ''
    }) : entry;
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
  return type === 'Diopter' || type === 'IRND' || type === 'ND Grad HE' || type === 'ND Grad SE' || type !== 'Clear' && type !== 'Pol' && type !== 'Rota-Pol';
}
function createFilterStorageValueSelect(type, selected) {
  var select = document.createElement('select');
  select.id = "filter-values-".concat(filterId(type));
  select.multiple = true;
  select.setAttribute('multiple', '');
  select.hidden = true;
  select.setAttribute('aria-hidden', 'true');
  var _getFilterValueConfig3 = getFilterValueConfig(type),
    opts = _getFilterValueConfig3.opts,
    _getFilterValueConfig4 = _getFilterValueConfig3.defaults,
    defaults = _getFilterValueConfig4 === void 0 ? [] : _getFilterValueConfig4;
  var chosen = Array.isArray(selected) ? selected.slice() : defaults.slice();
  opts.forEach(function (value) {
    var opt = document.createElement('option');
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
  details.forEach(function (detail) {
    var type = detail.type,
      size = detail.size,
      values = detail.values,
      needsSize = detail.needsSize,
      needsValues = detail.needsValues;
    if (needsSize) {
      var sizeSelect = createFilterSizeSelect(type, size);
      sizeSelect.hidden = true;
      sizeSelect.setAttribute('aria-hidden', 'true');
      sizeSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(sizeSelect);
    }
    if (needsValues) {
      var valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(valuesSelect);
    }
  });
}
function renderGearListFilterDetails(details) {
  var container = getGearListFilterDetailsContainer();
  if (!container) return;
  container.innerHTML = '';
  if (!details.length) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  details.forEach(function (detail) {
    var type = detail.type,
      label = detail.label,
      gearName = detail.gearName,
      entryId = detail.entryId,
      size = detail.size,
      values = detail.values,
      needsSize = detail.needsSize,
      needsValues = detail.needsValues,
      hideDetails = detail.hideDetails;
    var row = document.createElement('div');
    row.className = 'filter-detail';
    var heading = document.createElement('div');
    heading.className = 'filter-detail-label gear-item';
    if (entryId) heading.setAttribute('data-filter-entry', entryId);
    if (gearName) heading.setAttribute('data-gear-name', gearName);
    if (label) heading.setAttribute('data-filter-label', label);
    if (type) heading.setAttribute('data-filter-type', type);
    var shouldHideSize = !!needsSize;
    if (shouldHideSize) {
      heading.setAttribute('data-filter-hide-size', '');
    } else {
      heading.removeAttribute('data-filter-hide-size');
    }
    var displaySize = shouldHideSize ? '' : size && label && label.includes(size) ? '' : size;
    var displayValues = Array.isArray(values) ? values : undefined;
    if (label) {
      var entryInfo = {
        label: label,
        size: displaySize,
        values: displayValues
      };
      if (typeof hideDetails === 'boolean') {
        entryInfo.hideDetails = hideDetails;
      }
      heading.textContent = formatFilterEntryText(entryInfo);
    } else {
      heading.textContent = '';
    }
    row.appendChild(heading);
    var controls = document.createElement('div');
    controls.className = 'filter-detail-controls';
    if (needsSize) {
      var sizeLabel = document.createElement('label');
      sizeLabel.className = 'filter-detail-size';
      var sizeText = document.createElement('span');
      sizeText.className = 'filter-detail-sublabel';
      sizeText.textContent = 'Size';
      var sizeWrapper = document.createElement('span');
      sizeWrapper.className = 'select-wrapper';
      var sizeSelect = createFilterSizeSelect(type, size, {
        includeId: false
      });
      sizeSelect.setAttribute('data-storage-id', "filter-size-".concat(filterId(type)));
      sizeSelect.addEventListener('change', function () {
        var storageId = sizeSelect.getAttribute('data-storage-id');
        if (!storageId) return;
        syncGearListFilterSize(storageId, sizeSelect.value);
      });
      sizeWrapper.appendChild(sizeSelect);
      sizeLabel.append(sizeText, sizeWrapper);
      controls.appendChild(sizeLabel);
    }
    if (needsValues) {
      var valuesWrap = document.createElement('div');
      valuesWrap.className = 'filter-detail-values';
      var valueLabel = document.createElement('span');
      valueLabel.className = 'filter-detail-sublabel';
      valueLabel.textContent = 'Strengths';
      var optionsWrap = document.createElement('span');
      optionsWrap.className = 'filter-values-container';
      optionsWrap.setAttribute('data-storage-values', "filter-values-".concat(filterId(type)));
      var storageValuesId = optionsWrap.getAttribute('data-storage-values');
      var _getFilterValueConfig5 = getFilterValueConfig(type),
        opts = _getFilterValueConfig5.opts,
        _getFilterValueConfig6 = _getFilterValueConfig5.defaults,
        defaults = _getFilterValueConfig6 === void 0 ? [] : _getFilterValueConfig6;
      var checkboxName = "filterValues-".concat(filterId(type));
      var currentValues = values == null ? defaults : Array.isArray(values) ? values : [];
      opts.forEach(function (value) {
        var lbl = document.createElement('label');
        lbl.className = 'filter-value-option';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.name = checkboxName;
        cb.value = value;
        if (currentValues.includes(value)) {
          cb.checked = true;
          cb.setAttribute('checked', '');
        }
        cb.addEventListener('change', function () {
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
  var storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  if (storageSelect.value !== value) {
    storageSelect.value = value;
  }
  storageSelect.dispatchEvent(new Event('change'));
}
function syncGearListFilterValue(storageId, value, isSelected) {
  var storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  var changed = false;
  Array.from(storageSelect.options).forEach(function (opt) {
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
  var selected = Array.from(filterSelectElem.selectedOptions).map(function (o) {
    return o.value;
  }).filter(Boolean);
  var existingSelections = collectFilterSelections();
  var existingTokens = existingSelections ? parseFilterTokens(existingSelections) : currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : [];
  var existingMap = new Map(existingTokens.map(function (token) {
    return [token.type, token];
  }));
  var details = selected.map(function (type) {
    var prev = existingMap.get(type) || {};
    var size = prev.size || DEFAULT_FILTER_SIZE;
    var needsSize = type !== 'Diopter';
    var needsValues = filterTypeNeedsValueSelect(type);
    var _resolveFilterDisplay6 = resolveFilterDisplayInfo(type, size),
      label = _resolveFilterDisplay6.label,
      gearName = _resolveFilterDisplay6.gearName,
      hideDetails = _resolveFilterDisplay6.hideDetails;
    var entryId = "filter-".concat(filterId(type));
    if (type === 'Diopter') entryId = "".concat(entryId, "-set");
    return {
      type: type,
      label: label,
      gearName: gearName,
      entryId: entryId,
      size: size,
      values: Array.isArray(prev.values) ? prev.values.slice() : [],
      needsSize: needsSize,
      needsValues: needsValues,
      hideDetails: hideDetails
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  if (matteboxSelect) {
    var needsSwing = selected.some(function (t) {
      return t === 'ND Grad HE' || t === 'ND Grad SE';
    });
    if (needsSwing) matteboxSelect.value = 'Swing Away';
  }
}
function handleFilterDetailChange() {
  if (!filterSelectElem) return;
  var filterStr = collectFilterSelections();
  var entries = buildFilterGearEntries(parseFilterTokens(filterStr));
  updateGearListFilterEntries(entries);
  if (gearListOutput) adjustGearListSelectWidths(gearListOutput);
  saveCurrentSession();
  saveCurrentGearList();
  checkSetupChanged();
  renderFilterDetails();
}
function collectFilterSelections() {
  if (!filterSelectElem) return '';
  var selected = Array.from(filterSelectElem.selectedOptions).map(function (o) {
    return o.value;
  });
  var existing = currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : [];
  var existingMap = Object.fromEntries(existing.map(function (t) {
    return [t.type, t];
  }));
  var tokens = selected.map(function (type) {
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    var prev = existingMap[type] || {};
    var size = sizeSel ? sizeSel.value : prev.size || DEFAULT_FILTER_SIZE;
    var vals;
    var needsValues = filterTypeNeedsValueSelect(type);
    if (valSel) {
      vals = Array.from(valSel.selectedOptions).map(function (o) {
        return o.value;
      });
    } else if (Array.isArray(prev.values) && prev.values.length) {
      vals = prev.values.slice();
    } else {
      vals = [];
    }
    var valueSegment = '';
    if (needsValues) {
      valueSegment = vals.length ? ":".concat(vals.join('|')) : ':!';
    }
    return "".concat(type, ":").concat(size).concat(valueSegment);
  });
  return tokens.join(',');
}
function parseFilterTokens(str) {
  if (!str) return [];
  return str.split(',').map(function (s) {
    var parts = s.split(':').map(function (p) {
      return p.trim();
    });
    var type = parts[0];
    var size = parts[1] || DEFAULT_FILTER_SIZE;
    var vals = parts.length > 2 ? parts[2] : undefined;
    var values;
    if (vals === undefined) {
      values = undefined;
    } else if (vals === '' || vals === '!') {
      values = [];
    } else {
      values = vals.split('|').map(function (v) {
        return v.trim();
      }).filter(Boolean);
    }
    return {
      type: type,
      size: size,
      values: values
    };
  }).filter(function (t) {
    return t.type;
  });
}
function applyFilterSelectionsToGearList() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentProjectInfo;
  if (!gearListOutput) return;
  var tokens = info && info.filter ? parseFilterTokens(info.filter) : [];
  var entries = buildFilterGearEntries(tokens);
  updateGearListFilterEntries(entries);
  adjustGearListSelectWidths(gearListOutput);
}
function normalizeGearNameForComparison(name) {
  if (!name) return '';
  var normalized = String(name);
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
function collectFilterAccessories() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var items = [];
  filters.forEach(function (_ref29) {
    var type = _ref29.type;
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
  var functions = ['Toggle LUT', 'False Color', 'Peaking', 'Anamorphic Desqueeze', 'Surround View', '1:1 Zoom', 'Playback', 'Record', 'Zoom', 'Frame Lines', 'Frame Grab'];
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(function (id) {
    var sel = document.getElementById(id);
    if (!sel) return;
    functions.forEach(function (fn) {
      var opt = document.createElement('option');
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
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION: APP_VERSION,
    closeSideMenu: closeSideMenu,
    openSideMenu: openSideMenu,
    setupSideMenu: setupSideMenu,
    setupResponsiveControls: setupResponsiveControls,
    setLanguage: setLanguage,
    updateCalculations: updateCalculations,
    setBatteryPlates: setBatteryPlates,
    getBatteryPlates: getBatteryPlates,
    setRecordingMedia: setRecordingMedia,
    getRecordingMedia: getRecordingMedia,
    applyDarkMode: applyDarkMode,
    applyPinkMode: applyPinkMode,
    applyHighContrast: applyHighContrast,
    generatePrintableOverview: generatePrintableOverview,
    generateGearListHtml: generateGearListHtml,
    ensureZoomRemoteSetup: ensureZoomRemoteSetup,
    encodeSharedSetup: encodeSharedSetup,
    decodeSharedSetup: decodeSharedSetup,
    applySharedSetupFromUrl: applySharedSetupFromUrl,
    applySharedSetup: applySharedSetup,
    updateBatteryPlateVisibility: updateBatteryPlateVisibility,
    updateBatteryOptions: updateBatteryOptions,
    renderSetupDiagram: renderSetupDiagram,
    enableDiagramInteractions: enableDiagramInteractions,
    updateDiagramLegend: updateDiagramLegend,
    cameraFizPort: cameraFizPort,
    controllerCamPort: controllerCamPort,
    controllerDistancePort: controllerDistancePort,
    detectBrand: detectBrand,
    connectionLabel: connectionLabel,
    generateConnectorSummary: generateConnectorSummary,
    exportDiagramSvg: exportDiagramSvg,
    fixPowerInput: fixPowerInput,
    ensureList: ensureList,
    normalizeVideoType: normalizeVideoType,
    normalizeFizConnectorType: normalizeFizConnectorType,
    normalizeViewfinderType: normalizeViewfinderType,
    normalizePowerPortType: normalizePowerPortType,
    getCurrentSetupKey: getCurrentSetupKey,
    renderFeedbackTable: renderFeedbackTable,
    saveCurrentGearList: saveCurrentGearList,
    getGearListSelectors: getGearListSelectors,
    applyGearListSelectors: applyGearListSelectors,
    setSelectValue: setSelectValue,
    autoSaveCurrentSetup: autoSaveCurrentSetup,
    saveCurrentSession: saveCurrentSession,
    restoreSessionState: restoreSessionState,
    displayGearAndRequirements: displayGearAndRequirements,
    deleteCurrentGearList: deleteCurrentGearList,
    ensureGearListActions: ensureGearListActions,
    bindGearListEasyrigListener: bindGearListEasyrigListener,
    populateSelect: populateSelect,
    populateLensDropdown: populateLensDropdown,
    populateCameraPropertyDropdown: populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown: populateRecordingResolutionDropdown,
    populateSensorModeDropdown: populateSensorModeDropdown,
    populateCodecDropdown: populateCodecDropdown,
    updateRequiredScenariosSummary: updateRequiredScenariosSummary,
    updateMonitoringConfigurationOptions: updateMonitoringConfigurationOptions,
    updateViewfinderExtensionVisibility: updateViewfinderExtensionVisibility,
    scenarioIcons: scenarioIcons,
    collectProjectFormData: collectProjectFormData,
    populateProjectForm: populateProjectForm,
    renderFilterDetails: renderFilterDetails,
    collectFilterSelections: collectFilterSelections,
    parseFilterTokens: parseFilterTokens,
    applyFilterSelectionsToGearList: applyFilterSelectionsToGearList,
    setCurrentProjectInfo: setCurrentProjectInfo,
    getCurrentProjectInfo: getCurrentProjectInfo,
    crewRoles: crewRoles,
    formatFullBackupFilename: formatFullBackupFilename,
    computeGearListCount: computeGearListCount,
    autoBackup: autoBackup,
    createSettingsBackup: createSettingsBackup,
    captureStorageSnapshot: captureStorageSnapshot,
    sanitizeBackupPayload: sanitizeBackupPayload,
    extractBackupSections: extractBackupSections,
    searchKey: searchKey,
    searchTokens: searchTokens,
    findBestSearchMatch: findBestSearchMatch,
    runFeatureSearch: runFeatureSearch,
    __featureSearchInternals: {
      featureMap: featureMap,
      deviceMap: deviceMap,
      helpMap: helpMap,
      featureSearchEntries: featureSearchEntries,
      featureSearchDefaultOptions: featureSearchDefaultOptions,
      featureSearchInput: featureSearch,
      featureListElement: featureList,
      restoreFeatureSearchDefaults: restoreFeatureSearchDefaults,
      updateFeatureSearchSuggestions: updateFeatureSearchSuggestions
    },
    __customFontInternals: {
      addFromData: function addFromData(name, dataUrl, options) {
        return addCustomFontFromData(name, dataUrl, options);
      },
      getEntries: function getEntries() {
        return Array.from(customFontEntries.values());
      }
    },
    __sharedImportInternals: {
      getLastSharedSetupData: function getLastSharedSetupData() {
        return lastSharedSetupData;
      },
      setLastSharedSetupDataForTest: function setLastSharedSetupDataForTest(value) {
        lastSharedSetupData = value;
      },
      getLastSharedAutoGearRules: function getLastSharedAutoGearRules() {
        return lastSharedAutoGearRules;
      },
      setLastSharedAutoGearRulesForTest: function setLastSharedAutoGearRulesForTest(value) {
        lastSharedAutoGearRules = value;
      },
      isProjectPresetActive: function isProjectPresetActive() {
        return sharedImportProjectPresetActive;
      },
      setProjectPresetActiveForTest: function setProjectPresetActiveForTest(value) {
        sharedImportProjectPresetActive = !!value;
      },
      getPreviousPresetId: function getPreviousPresetId() {
        return sharedImportPreviousPresetId;
      },
      setPreviousPresetIdForTest: function setPreviousPresetIdForTest(value) {
        sharedImportPreviousPresetId = typeof value === 'string' ? value : '';
      },
      isPromptActive: function isPromptActive() {
        return sharedImportPromptActive;
      },
      setPromptActiveForTest: function setPromptActiveForTest(value) {
        sharedImportPromptActive = !!value;
      },
      getPendingSharedLinkListener: function getPendingSharedLinkListener() {
        return pendingSharedLinkListener;
      },
      setPendingSharedLinkListenerForTest: function setPendingSharedLinkListenerForTest(listener) {
        pendingSharedLinkListener = typeof listener === 'function' ? listener : null;
      }
    },
    collectAutoGearCatalogNames: collectAutoGearCatalogNames,
    buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionAutoGearRules,
    applyAutoGearRulesToTableHtml: applyAutoGearRulesToTableHtml,
    exportAutoGearRules: exportAutoGearRules,
    importAutoGearRulesFromData: importAutoGearRulesFromData,
    createAutoGearBackup: createAutoGearBackup,
    restoreAutoGearBackup: restoreAutoGearBackup,
    getAutoGearRules: getAutoGearRules,
    syncAutoGearRulesFromStorage: syncAutoGearRulesFromStorage,
    parseDeviceDatabaseImport: parseDeviceDatabaseImport,
    countDeviceDatabaseEntries: countDeviceDatabaseEntries,
    sanitizeShareFilename: sanitizeShareFilename,
    ensureJsonExtension: ensureJsonExtension,
    getDefaultShareFilename: getDefaultShareFilename,
    promptForSharedFilename: promptForSharedFilename,
    downloadSharedProject: downloadSharedProject,
    confirmAutoGearSelection: confirmAutoGearSelection,
    configureSharedImportOptions: configureSharedImportOptions,
    resolveSharedImportMode: resolveSharedImportMode,
    resetPlannerStateAfterFactoryReset: resetPlannerStateAfterFactoryReset,
    __autoGearInternals: {
      buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionAutoGearRules,
      buildVideoDistributionAutoRules: buildVideoDistributionAutoRules,
      buildAutoGearRulesFromBaseInfo: buildAutoGearRulesFromBaseInfo,
      seedAutoGearRulesFromCurrentProject: seedAutoGearRulesFromCurrentProject,
      clearAutoGearDefaultsSeeded: clearAutoGearDefaultsSeeded
    }
  };
}