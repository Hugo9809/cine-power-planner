function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
generateOverviewBtn.addEventListener('click', function () {
  if (!setupSelect.value) {
    alert(texts[currentLang].alertSelectSetupForOverview);
    return;
  }
  generatePrintableOverview();
});
function batteryPinsSufficient() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (!isFinite(totalCurrentLow)) return true;
  return totalCurrentLow <= battData.pinA;
}
function alertPinExceeded() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  alert(texts[currentLang].warnPinExceeded.replace('{current}', totalCurrentLow.toFixed(2)).replace('{max}', battData.pinA));
}
generateGearListBtn.addEventListener('click', function () {
  if (!setupSelect.value) {
    alert(texts[currentLang].alertSelectSetupForOverview);
    return;
  }
  if (!batteryPinsSufficient()) {
    alertPinExceeded();
    return;
  }
  populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
  populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
  populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
  openDialog(projectDialog);
});
if (deleteGearListProjectBtn) {
  deleteGearListProjectBtn.addEventListener('click', function () {
    deleteCurrentGearList();
  });
}
if (projectCancelBtn) {
  projectCancelBtn.addEventListener('click', function () {
    closeDialog(projectDialog);
  });
}
if (projectDialogCloseBtn) {
  projectDialogCloseBtn.addEventListener('click', function () {
    if (projectCancelBtn) {
      projectCancelBtn.click();
    } else {
      closeDialog(projectDialog);
    }
  });
}
if (projectForm) {
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!batteryPinsSufficient()) {
      alertPinExceeded();
      return;
    }
    var info = collectProjectFormData();
    currentProjectInfo = info;
    ensureZoomRemoteSetup(info);
    var html = generateGearListHtml(info);
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    saveCurrentSession();
    scheduleProjectAutoSave(true);
    closeDialog(projectDialog);
  });
}
function downloadSharedProject(shareFileName, includeAutoGear) {
  if (!shareFileName) return;
  var setupName = getCurrentProjectName();
  var currentSetup = {
    setupName: setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(function (sel) {
      return sel.value;
    }),
    controllers: controllerSelects.map(function (sel) {
      return sel.value;
    }),
    distance: distanceSelect.value,
    batteryPlate: batteryPlateSelect.value,
    battery: batterySelect.value,
    batteryHotswap: hotswapSelect.value
  };
  if (currentProjectInfo) {
    currentSetup.projectInfo = currentProjectInfo;
  } else {
    var project = typeof loadProject === 'function' ? loadProject(setupName) : null;
    if (project && project.projectInfo) {
      currentSetup.projectInfo = project.projectInfo;
    }
  }
  var gearSelectors = getGearListSelectors();
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  var combinedHtml = getCurrentGearListHtml();
  if (combinedHtml) {
    var _splitGearListHtml = splitGearListHtml(combinedHtml),
      projectHtml = _splitGearListHtml.projectHtml,
      gearHtml = _splitGearListHtml.gearHtml;
    if (projectHtml) currentSetup.projectHtml = projectHtml;
    if (gearHtml) {
      currentSetup.gearList = projectHtml ? gearHtml.replace(/<h2[^>]*>.*?<\/h2>/, '') : gearHtml;
    }
  }
  var deviceChanges = getDeviceChanges();
  if (Object.keys(deviceChanges).length) {
    currentSetup.changedDevices = deviceChanges;
  }
  var key = getCurrentSetupKey();
  var feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
  }
  var notifyShareFailure = function notifyShareFailure(error) {
    if (error) {
      console.warn('Project export failed', error);
    } else {
      console.warn('Project export failed');
    }
    var failureMessage = getLocalizedText('shareExportFailed') || 'Project export failed.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = failureMessage;
      setStatusLevel(shareLinkMessage, 'danger');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(function () {
          return shareLinkMessage.classList.add('hidden');
        }, 6000);
      }
    } else if (typeof alert === 'function') {
      alert(failureMessage);
    }
  };
  var json;
  try {
    json = JSON.stringify(currentSetup, null, 2);
  } catch (serializationError) {
    console.error('Failed to serialize shared project', serializationError);
    notifyShareFailure(serializationError);
    return;
  }
  var downloadResult = downloadBackupPayload(json, shareFileName);
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }
  if (!downloadResult || !downloadResult.success) {
    notifyShareFailure();
    return;
  }
  if (downloadResult.method === 'window-fallback') {
    var manualMessage = typeof getManualDownloadFallbackMessage === 'function' ? getManualDownloadFallbackMessage() : getLocalizedText('manualDownloadFallback') || 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = manualMessage;
      setStatusLevel(shareLinkMessage, 'warning');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(function () {
          return shareLinkMessage.classList.add('hidden');
        }, 8000);
      }
    } else if (typeof alert === 'function') {
      alert(manualMessage);
    }
    return;
  }
  if (shareLinkMessage) {
    shareLinkMessage.textContent = texts[currentLang].shareLinkCopied;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    if (typeof setTimeout === 'function') {
      setTimeout(function () {
        return shareLinkMessage.classList.add('hidden');
      }, 4000);
    }
  }
}
shareSetupBtn.addEventListener('click', function () {
  saveCurrentGearList();
  var setupName = getCurrentProjectName();
  var defaultName = getDefaultShareFilename(setupName);
  var defaultFilename = ensureJsonExtension(defaultName);
  if (!shareDialog || !shareForm || !shareFilenameInput) {
    var shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    var _rulesForShare = getAutoGearRules();
    var _hasAutoGearRules = Array.isArray(_rulesForShare) && _rulesForShare.length > 0;
    var includeAutoGear = _hasAutoGearRules ? confirmAutoGearSelection(shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false) : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && _hasAutoGearRules;
    }
    downloadSharedProject(shareFileName, includeAutoGear);
    return;
  }
  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');
  if (shareFilenameMessage) {
    var template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}') ? template.replace('{defaultName}', defaultName) : template;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }
  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function () {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(function () {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
});
if (shareForm) {
  shareForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!shareFilenameInput) return;
    var sanitized = sanitizeShareFilename(shareFilenameInput.value);
    if (!sanitized) {
      var invalidMessage = getLocalizedText('shareFilenameInvalid') || 'Please enter a valid file name to continue.';
      shareFilenameInput.setCustomValidity(invalidMessage);
      shareFilenameInput.reportValidity();
      return;
    }
    shareFilenameInput.setCustomValidity('');
    var shareFileName = ensureJsonExtension(sanitized);
    var includeAutoGear = !!(shareIncludeAutoGearCheckbox && !shareIncludeAutoGearCheckbox.disabled && shareIncludeAutoGearCheckbox.checked);
    closeDialog(shareDialog);
    downloadSharedProject(shareFileName, includeAutoGear);
  });
}
if (shareCancelBtn) {
  shareCancelBtn.addEventListener('click', function () {
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}
if (shareDialog) {
  shareDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}
if (sharedLinkInput) {
  sharedLinkInput.addEventListener('change', function () {
    if (pendingSharedLinkListener) return;
    var file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  });
}
if (applySharedLinkBtn && sharedLinkInput) {
  applySharedLinkBtn.addEventListener('click', function () {
    if (pendingSharedLinkListener) {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
      pendingSharedLinkListener = null;
    }
    var _handleSelection = function handleSelection() {
      sharedLinkInput.removeEventListener('change', _handleSelection);
      pendingSharedLinkListener = null;
      var file = sharedLinkInput.files && sharedLinkInput.files[0];
      if (file) {
        readSharedProjectFile(file);
      }
    };
    pendingSharedLinkListener = _handleSelection;
    sharedLinkInput.addEventListener('change', _handleSelection);
    sharedLinkInput.value = '';
    sharedLinkInput.click();
    if (sharedLinkInput.files && sharedLinkInput.files.length) {
      _handleSelection();
    }
  });
}
if (sharedImportModeSelect) {
  sharedImportModeSelect.addEventListener('change', function () {
    if (sharedImportPromptActive) return;
    if (lastSharedSetupData === null) return;
    reapplySharedImportSelection();
  });
}
if (sharedImportForm) {
  sharedImportForm.addEventListener('submit', function (event) {
    event.preventDefault();
    finalizeSharedImportPrompt();
    applyStoredSharedImport();
  });
}
if (sharedImportCancelBtn) {
  sharedImportCancelBtn.addEventListener('click', function () {
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}
if (sharedImportDialog) {
  sharedImportDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}
if (runtimeFeedbackBtn && feedbackDialog && feedbackForm) {
  runtimeFeedbackBtn.addEventListener('click', function () {
    var _devices, _cam$resolutions, _cam$recordingCodecs;
    var today = new Date().toISOString().split('T')[0];
    var motVals = motorSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
    var ctrlVals = controllerSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
    document.getElementById('fbDate').value = today;
    document.getElementById('fbCamera').value = cameraSelect.value || '';
    document.getElementById('fbBatteryPlate').value = getSelectedPlate() || '';
    document.getElementById('fbBattery').value = batterySelect.value || '';
    document.getElementById('fbWirelessVideo').value = videoSelect.value || '';
    document.getElementById('fbMonitor').value = monitorSelect.value || '';
    var cam = (_devices = devices) === null || _devices === void 0 || (_devices = _devices.cameras) === null || _devices === void 0 ? void 0 : _devices[cameraSelect.value];
    document.getElementById('fbResolution').value = (cam === null || cam === void 0 || (_cam$resolutions = cam.resolutions) === null || _cam$resolutions === void 0 ? void 0 : _cam$resolutions[0]) || '';
    document.getElementById('fbCodec').value = (cam === null || cam === void 0 || (_cam$recordingCodecs = cam.recordingCodecs) === null || _cam$recordingCodecs === void 0 ? void 0 : _cam$recordingCodecs[0]) || '';
    document.getElementById('fbControllers').value = ctrlVals.join(', ');
    document.getElementById('fbMotors').value = motVals.join(', ');
    var fbDistance = document.getElementById('fbDistance');
    if (fbDistance && distanceSelect) {
      fbDistance.innerHTML = distanceSelect.innerHTML;
      fbDistance.value = distanceSelect.value || '';
    }
    openDialog(feedbackDialog);
  });
  feedbackCancelBtn.addEventListener('click', function () {
    closeDialog(feedbackDialog);
  });
  if (feedbackUseLocationBtn) {
    feedbackUseLocationBtn.addEventListener('click', function () {
      var locationInput = document.getElementById('fbLocation');
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
      feedbackUseLocationBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(function (pos) {
        var _pos$coords = pos.coords,
          latitude = _pos$coords.latitude,
          longitude = _pos$coords.longitude;
        locationInput.value = "".concat(latitude.toFixed(5), ", ").concat(longitude.toFixed(5));
        feedbackUseLocationBtn.disabled = false;
      }, function () {
        feedbackUseLocationBtn.disabled = false;
        alert('Unable to retrieve your location');
      });
    });
  }
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var entry = {
      username: document.getElementById('fbUsername').value.trim(),
      date: document.getElementById('fbDate').value,
      location: document.getElementById('fbLocation').value.trim(),
      camera: document.getElementById('fbCamera').value.trim(),
      batteryPlate: document.getElementById('fbBatteryPlate').value.trim(),
      lensMount: document.getElementById('fbLensMount').value.trim(),
      resolution: document.getElementById('fbResolution').value.trim(),
      codec: document.getElementById('fbCodec').value.trim(),
      framerate: document.getElementById('fbFramerate').value.trim(),
      cameraWifi: document.getElementById('fbWifi').value,
      firmware: document.getElementById('fbFirmware').value.trim(),
      battery: document.getElementById('fbBattery').value.trim(),
      batteryAge: document.getElementById('fbBatteryAge').value.trim(),
      wirelessVideo: document.getElementById('fbWirelessVideo').value.trim(),
      monitor: document.getElementById('fbMonitor').value.trim(),
      monitorBrightness: document.getElementById('fbMonitorBrightness').value.trim(),
      lens: document.getElementById('fbLens').value.trim(),
      lensData: document.getElementById('fbLensData').value.trim(),
      controllers: document.getElementById('fbControllers').value.trim(),
      motors: document.getElementById('fbMotors').value.trim(),
      distance: document.getElementById('fbDistance').value.trim(),
      temperature: document.getElementById('fbTemperature').value.trim(),
      charging: document.getElementById('fbCharging').value.trim(),
      runtime: document.getElementById('fbRuntime').value.trim(),
      batteriesPerDay: document.getElementById('fbBatteriesPerDay').value.trim()
    };
    var key = getCurrentSetupKey();
    var feedback = loadFeedbackSafe();
    if (!feedback[key]) feedback[key] = [];
    feedback[key].push(entry);
    saveFeedbackSafe(feedback);
    var lines = [];
    Object.entries(entry).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      lines.push("".concat(k, ": ").concat(v));
    });
    var subject = encodeURIComponent('Cine Power Planner Runtime Feedback');
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = "mailto:info@lucazanner.de?subject=".concat(subject, "&body=").concat(body);
    closeDialog(feedbackDialog);
    updateCalculations();
  });
}
function summarizeByType(list) {
  if (!Array.isArray(list)) return {};
  return list.reduce(function (counts, it) {
    if (it !== null && it !== void 0 && it.type) {
      counts[it.type] = (counts[it.type] || 0) + 1;
    }
    return counts;
  }, {});
}
function renderInfoLabel(text) {
  var str = text != null ? String(text).trim() : '';
  if (!str) return '';
  return "<span class=\"info-box-label\">".concat(escapeHtml(str), ":</span> ");
}
function connectorBlocks(items, icon) {
  var cls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'neutral-conn';
  var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  if (!Array.isArray(items) || items.length === 0) return '';
  var counts = summarizeByType(items);
  var entries = Object.entries(counts).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      type = _ref4[0],
      count = _ref4[1];
    return "".concat(escapeHtml(type)).concat(count > 1 ? " \xD7".concat(count) : '');
  });
  if (!entries.length) return '';
  var labelText = label ? "".concat(label).concat(dir ? " ".concat(dir) : '') : '';
  var labelHtml = renderInfoLabel(labelText);
  var iconHtml = iconMarkup(icon, 'connector-icon');
  return "<span class=\"connector-block ".concat(cls, "\">").concat(iconHtml).concat(labelHtml).concat(entries.join(', '), "</span>");
}
function generateConnectorSummary(device) {
  var _device$power, _device$video, _device$video2, _device$audioInput, _device$audioOutput, _device$audioIo, _device$power2, _device$power3;
  if (!device || _typeof(device) !== 'object') return '';
  var portHtml = '';
  var connectors = [{
    items: (_device$power = device.power) === null || _device$power === void 0 ? void 0 : _device$power.powerDistributionOutputs,
    icon: diagramConnectorIcons.powerOut,
    cls: 'power-conn',
    label: 'Power',
    dir: 'Out'
  }, {
    items: powerInputTypes(device).map(function (t) {
      return {
        type: t
      };
    }),
    icon: diagramConnectorIcons.powerIn,
    cls: 'power-conn',
    label: 'Power',
    dir: 'In'
  }, {
    items: device.fizConnectors,
    icon: diagramConnectorIcons.fiz,
    cls: 'fiz-conn',
    label: 'FIZ Port'
  }, {
    items: ((_device$video = device.video) === null || _device$video === void 0 ? void 0 : _device$video.inputs) || device.videoInputs,
    icon: diagramConnectorIcons.video,
    cls: 'video-conn',
    label: 'Video',
    dir: 'In'
  }, {
    items: ((_device$video2 = device.video) === null || _device$video2 === void 0 ? void 0 : _device$video2.outputs) || device.videoOutputs,
    icon: diagramConnectorIcons.video,
    cls: 'video-conn',
    label: 'Video',
    dir: 'Out'
  }, {
    items: device.timecode,
    icon: diagramConnectorIcons.timecode,
    cls: 'neutral-conn',
    label: 'Timecode'
  }, {
    items: (_device$audioInput = device.audioInput) !== null && _device$audioInput !== void 0 && _device$audioInput.portType ? [{
      type: device.audioInput.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioIn,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'In'
  }, {
    items: (_device$audioOutput = device.audioOutput) !== null && _device$audioOutput !== void 0 && _device$audioOutput.portType ? [{
      type: device.audioOutput.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioOut,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'Out'
  }, {
    items: (_device$audioIo = device.audioIo) !== null && _device$audioIo !== void 0 && _device$audioIo.portType ? [{
      type: device.audioIo.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioIo,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'I/O'
  }];
  for (var _i = 0, _connectors = connectors; _i < _connectors.length; _i++) {
    var _connectors$_i = _connectors[_i],
      items = _connectors$_i.items,
      icon = _connectors$_i.icon,
      cls = _connectors$_i.cls,
      label = _connectors$_i.label,
      dir = _connectors$_i.dir;
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }
  var specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(diagramConnectorIcons.powerSpec)).concat(renderInfoLabel('Power')).concat(device.powerDrawWatts, " W</span>");
  }
  if ((_device$power2 = device.power) !== null && _device$power2 !== void 0 && (_device$power2 = _device$power2.input) !== null && _device$power2 !== void 0 && _device$power2.voltageRange) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryBolt)).concat(renderInfoLabel('Voltage')).concat(escapeHtml(String(device.power.input.voltageRange)), "V</span>");
  }
  if (typeof device.weight_g === 'number') {
    var weightLabel = "".concat(device.weight_g, " g");
    specHtml += "<span class=\"info-box neutral-conn\">".concat(iconMarkup(ICON_GLYPHS.gears)).concat(renderInfoLabel('Weight')).concat(escapeHtml(weightLabel), "</span>");
  }
  if (typeof device.capacity === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryFull)).concat(renderInfoLabel('Capacity')).concat(device.capacity, " Wh</span>");
  }
  if (typeof device.pinA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Pins')).concat(device.pinA, "A</span>");
  }
  if (typeof device.dtapA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('D-Tap')).concat(device.dtapA, "A</span>");
  }
  if (device.mount_type) {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Mount')).concat(escapeHtml(String(device.mount_type)), "</span>");
  }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(DIAGRAM_MONITOR_ICON)).concat(renderInfoLabel('Screen')).concat(device.screenSizeInches, "\"</span>");
  }
  if (typeof device.brightnessNits === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.brightness)).concat(renderInfoLabel('Brightness')).concat(device.brightnessNits, " nits</span>");
  }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.wifi)).concat(renderInfoLabel('Wireless')).concat(device.wirelessTx, "</span>");
  }
  if (device.internalController) {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(diagramConnectorIcons.controller)).concat(renderInfoLabel('Controller'), "Internal</span>");
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(diagramConnectorIcons.torque)).concat(renderInfoLabel('Torque')).concat(device.torqueNm, " Nm</span>");
  }
  if (device.powerSource) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(diagramConnectorIcons.powerSource)).concat(renderInfoLabel('Power Source')).concat(escapeHtml(String(device.powerSource)), "</span>");
  }
  var uniqueList = function uniqueList(list) {
    if (!Array.isArray(list)) return [];
    var seen = new Set();
    var values = [];
    list.forEach(function (entry) {
      var str = entry != null ? String(entry).trim() : '';
      if (!str || seen.has(str)) return;
      seen.add(str);
      values.push(escapeHtml(str));
    });
    return values;
  };
  var appendListBox = function appendListBox(html, values, label, cls, icon) {
    var formatted = uniqueList(values);
    if (!formatted.length) return html;
    var iconHtml = iconMarkup(icon);
    var labelHtml = renderInfoLabel(label);
    var valuesHtml = "<span class=\"info-box-values\">".concat(formatted.join(', '), "</span>");
    return "".concat(html, "<span class=\"info-box ").concat(cls, " info-box-list\">").concat(iconHtml).concat(labelHtml).concat(valuesHtml, "</span>");
  };
  var recordingHtml = '';
  if (Array.isArray(device.sensorModes)) {
    recordingHtml = appendListBox(recordingHtml, device.sensorModes, 'Sensor Modes', 'video-conn', ICON_GLYPHS.sensor);
  }
  if (Array.isArray(device.resolutions)) {
    recordingHtml = appendListBox(recordingHtml, device.resolutions, 'Resolutions', 'video-conn', ICON_GLYPHS.screen);
  }
  if (Array.isArray(device.recordingCodecs)) {
    recordingHtml = appendListBox(recordingHtml, device.recordingCodecs, 'Codecs', 'video-conn', ICON_GLYPHS.camera);
  }
  if (Array.isArray(device.recordingMedia)) {
    var mediaTypes = device.recordingMedia.map(function (item) {
      return item && item.type ? item.type : '';
    });
    recordingHtml = appendListBox(recordingHtml, mediaTypes, 'Media', 'video-conn', ICON_GLYPHS.save);
  }
  var extraHtml = '';
  if (Array.isArray((_device$power3 = device.power) === null || _device$power3 === void 0 ? void 0 : _device$power3.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
    var types = device.power.batteryPlateSupport.map(function (p) {
      var mount = p.mount ? " (".concat(escapeHtml(p.mount), ")") : '';
      return "".concat(escapeHtml(p.type)).concat(mount);
    });
    extraHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Battery Plate')).concat(types.join(', '), "</span>");
  }
  if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
    var _types = device.viewfinder.map(function (v) {
      return escapeHtml(v.type);
    });
    extraHtml += "<span class=\"info-box video-conn\">".concat(renderInfoLabel('Viewfinder')).concat(_types.join(', '), "</span>");
  }
  if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
    var _types2 = device.gearTypes.map(function (g) {
      return escapeHtml(g);
    });
    extraHtml += "<span class=\"info-box fiz-conn\">".concat(renderInfoLabel('Gear')).concat(_types2.join(', '), "</span>");
  }
  if (device.connectivity) {
    extraHtml += "<span class=\"info-box video-conn\">".concat(renderInfoLabel('Connectivity')).concat(escapeHtml(String(device.connectivity)), "</span>");
  }
  if (device.notes) {
    extraHtml += "<span class=\"info-box neutral-conn\">".concat(renderInfoLabel('Notes')).concat(escapeHtml(String(device.notes)), "</span>");
  }
  var lensHtml = '';
  if (Array.isArray(device.lensMount)) {
    var boxes = device.lensMount.map(function (lm) {
      var mount = lm.mount ? " (".concat(escapeHtml(lm.mount), ")") : '';
      return "<span class=\"info-box neutral-conn\">".concat(escapeHtml(lm.type)).concat(mount, "</span>");
    }).join('');
    if (boxes) lensHtml = "<div class=\"lens-mount-box\">".concat(boxes, "</div>");
  }
  var html = '';
  var section = function section(label, content) {
    if (!content) return '';
    return "<div class=\"info-label\">".concat(label, "</div>").concat(content);
  };
  html += section('Ports', portHtml);
  html += section('Specs', specHtml);
  html += section('Recording', recordingHtml);
  html += section('Extras', extraHtml);
  if (lensHtml) html += "<div class=\"info-label\">Lens Mount</div>".concat(lensHtml);
  return html ? "<div class=\"connector-summary\">".concat(html, "</div>") : '';
}
function suggestChargerCounts(total) {
  var quad = Math.floor(total / 4);
  var remainder = total % 4;
  var dual = 0;
  var single = 0;
  if (remainder === 0) {} else if (remainder === 3) {
    quad += 1;
  } else if (remainder > 0) {
    dual += 1;
  }
  return {
    quad: quad,
    dual: dual,
    single: single
  };
}
function addArriKNumber(name) {
  if (!name) return name;
  var d = typeof devices !== 'undefined' ? devices : {};
  var collections = [d.viewfinders, d.directorMonitors, d.iosVideo, d.videoAssist, d.media, d.lenses];
  for (var _i2 = 0, _collections = collections; _i2 < _collections.length; _i2++) {
    var col = _collections[_i2];
    if (col && col[name]) {
      var item = col[name];
      if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
        return name.replace(/^ARRI\s*/i, "ARRI ".concat(item.kNumber, " "));
      }
      return name;
    }
  }
  if (d.accessories) {
    var _findItem = function findItem(obj) {
      if (!obj) return null;
      if (obj[name]) return obj[name];
      for (var _i3 = 0, _Object$values = Object.values(obj); _i3 < _Object$values.length; _i3++) {
        var val = _Object$values[_i3];
        if (val && _typeof(val) === 'object') {
          var found = _findItem(val);
          if (found) return found;
        }
      }
      return null;
    };
    for (var _i4 = 0, _Object$values2 = Object.values(d.accessories); _i4 < _Object$values2.length; _i4++) {
      var _col = _Object$values2[_i4];
      var _item = _findItem(_col);
      if (_item) {
        if (_item.brand && _item.brand.toUpperCase().includes('ARRI') && _item.kNumber && !name.includes(_item.kNumber)) {
          return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, "ARRI ".concat(_item.kNumber, " ")) : "ARRI ".concat(_item.kNumber, " ").concat(name);
        }
        return name;
      }
    }
  }
  return name;
}
var sanitizeFizContext = function sanitizeFizContext(context) {
  return (context || '').replace(/[()]/g, '').replace(/\s{2,}/g, ' ').trim();
};
var formatFizCable = function formatFizCable(name, context) {
  var cleaned = sanitizeFizContext(context);
  return cleaned ? "".concat(name, " (").concat(cleaned, ")") : name;
};
function suggestArriFizCables() {
  var _cameraSelect, _distanceSelect;
  var CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
  var CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
  var CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
  var cables = [];
  var lbusLengths = [];
  var camSpare = [];
  var camera = ((_cameraSelect = cameraSelect) === null || _cameraSelect === void 0 ? void 0 : _cameraSelect.value) || '';
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var distance = ((_distanceSelect = distanceSelect) === null || _distanceSelect === void 0 ? void 0 : _distanceSelect.value) || '';
  var motor = motors[0] || '';
  var hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
  var hasRIA = controllers.includes('Arri RIA-1');
  var hasUDM = distance.includes('UDM');
  var hasLCube = distance.includes('LCube');
  if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
  var isCforceMiniRF = /cforce mini rf/i.test(motor);
  var isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
  var motorContext = motor ? "for ".concat(motor) : 'for FIZ motor';
  var masterGripContext = 'for Arri Master Grip (single unit)';
  var distanceContext = distance ? "for ".concat(distance) : 'for distance sensor';
  var controllersToCheck = [];
  if (hasRIA) controllersToCheck.push('Arri RIA-1');
  if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
  var primaryController = controllersToCheck[0] || controllers[0] || '';
  var pushLbus = function pushLbus(len, contextOverride) {
    var formatted = String(len).replace('.', ',');
    var ctx = contextOverride || motorContext;
    cables.push(formatFizCable("LBUS to LBUS ".concat(formatted, "m"), ctx));
    lbusLengths.push(Number(len));
  };
  if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
    pushLbus(0.3);
    if (hasLCube) pushLbus(0.4, distanceContext);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (camera === 'Arri Alexa 35' && isCforceMini) {
    pushLbus(0.3);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (isCforceMiniRF) {
    if (hasLCube) {
      pushLbus(0.4, distanceContext);
      if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (hasMasterGrip) {
      pushLbus(0.5, masterGripContext);
    }
  } else if (hasRIA && isCforceMini) {
    pushLbus(0.4);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  }
  if (controllersToCheck.length) {
    var _devices$accessories;
    var cablesData = ((_devices$accessories = devices.accessories) === null || _devices$accessories === void 0 ? void 0 : _devices$accessories.cables) || {};
    var chosen = null;
    for (var _i5 = 0, _Object$entries = Object.entries(cablesData); _i5 < _Object$entries.length; _i5++) {
      var _data$lengthM, _cablesData$chosen$le;
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i5], 2),
        name = _Object$entries$_i[0],
        data = _Object$entries$_i[1];
      var connectors = [];
      if (Array.isArray(data.connectors)) connectors.push.apply(connectors, _toConsumableArray(data.connectors));
      if (data.from) connectors.push(data.from);
      if (data.to) connectors.push(data.to);
      if (!connectors.some(function (c) {
        return /CAM \(7-pin/i.test(c);
      })) continue;
      var ctrlOk = (data.compatibleControllers || []).some(function (cc) {
        return controllersToCheck.some(function (ct) {
          return cc.toLowerCase().includes(ct.toLowerCase());
        });
      });
      if (!ctrlOk) continue;
      var camOk = !data.compatibleCameras || data.compatibleCameras.some(function (c) {
        return c.toLowerCase() === camera.toLowerCase();
      });
      if (!camOk) continue;
      if (!chosen || ((_data$lengthM = data.lengthM) !== null && _data$lengthM !== void 0 ? _data$lengthM : Infinity) < ((_cablesData$chosen$le = cablesData[chosen].lengthM) !== null && _cablesData$chosen$le !== void 0 ? _cablesData$chosen$le : Infinity)) {
        chosen = name;
      }
    }
    if (chosen) {
      var camContext = camera ? "for ".concat(camera) : 'for camera control';
      cables.push(formatFizCable(chosen, camContext));
      camSpare.push(chosen);
    } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
      var fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
      var fallbackContext = primaryController ? "for ".concat(primaryController, " power") : 'for controller power';
      cables.push(formatFizCable(fallback, fallbackContext));
      camSpare.push(fallback);
    }
  }
  if (hasUDM) {
    if (hasLCube) {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
    } else {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
    }
  }
  if (lbusLengths.length) {
    var shortest = Math.min.apply(Math, lbusLengths);
    var formattedShortest = String(shortest).replace('.', ',');
    cables.push(formatFizCable("LBUS to LBUS ".concat(formattedShortest, "m"), 'spare'));
    cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
  }
  camSpare.forEach(function (n) {
    return cables.push(formatFizCable(n, 'spare'));
  });
  return cables;
}
function collectAccessories() {
  var _acc$cables, _acc$cables2;
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref5$hasMotor = _ref5.hasMotor,
    hasMotor = _ref5$hasMotor === void 0 ? false : _ref5$hasMotor,
    _ref5$videoDistPrefs = _ref5.videoDistPrefs,
    videoDistPrefs = _ref5$videoDistPrefs === void 0 ? [] : _ref5$videoDistPrefs;
  var cameraSupport = [];
  var misc = [];
  var monitoringSupport = ['BNC Cable 0.5 m', 'BNC Cable 1 m', 'BNC Cable 5 m', 'BNC Cable 10 m', 'BNC Drum 25 m'];
  var rigging = [];
  var chargers = [];
  var fizCables = [];
  var acc = devices.accessories || {};
  var excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);
  if (batterySelect.value) {
    var _devices$batteries$ba;
    var mount = (_devices$batteries$ba = devices.batteries[batterySelect.value]) === null || _devices$batteries$ba === void 0 ? void 0 : _devices$batteries$ba.mount_type;
    if (acc.powerPlates) {
      for (var _i6 = 0, _Object$entries2 = Object.entries(acc.powerPlates); _i6 < _Object$entries2.length; _i6++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i6], 2),
          name = _Object$entries2$_i[0],
          plate = _Object$entries2$_i[1];
        if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
          cameraSupport.push(name);
        }
      }
    }
    if (acc.chargers) {
      var _batteryCountElem;
      var camCount = parseInt(((_batteryCountElem = batteryCountElem) === null || _batteryCountElem === void 0 ? void 0 : _batteryCountElem.textContent) || '', 10);
      if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
      var monCount = 0;
      if (Array.isArray(videoDistPrefs)) {
        var handheldCount = videoDistPrefs.filter(function (v) {
          return /Monitor(?: \d+")? handheld$/.test(v);
        }).length;
        monCount += handheldCount * 3;
        var largeCount = videoDistPrefs.filter(function (v) {
          var m = v.match(/Monitor (\d+(?:\.\d+)?)/);
          return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
        }).length;
        monCount += largeCount * 2;
      }
      if (hasMotor) monCount += 3;
      var total = camCount + monCount;
      if (total > 0) {
        var counts = suggestChargerCounts(total);
        var findName = function findName(slots) {
          for (var _i7 = 0, _Object$entries3 = Object.entries(acc.chargers); _i7 < _Object$entries3.length; _i7++) {
            var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i7], 2),
              _name = _Object$entries3$_i[0],
              charger = _Object$entries3$_i[1];
            if (charger.mount === mount && charger.slots === slots) return _name;
          }
          return null;
        };
        var pushCharger = function pushCharger(slots, count) {
          var n = findName(slots);
          if (!n) return;
          for (var i = 0; i < count; i++) chargers.push(n);
        };
        pushCharger(4, counts.quad);
        pushCharger(2, counts.dual);
        pushCharger(1, counts.single);
      }
    }
  }
  if (cameraSelect.value && acc.cages) {
    if (!cageSelect.value || cageSelect.value === 'None') {
      for (var _i8 = 0, _Object$entries4 = Object.entries(acc.cages); _i8 < _Object$entries4.length; _i8++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i8], 2),
          _name2 = _Object$entries4$_i[0],
          cage = _Object$entries4$_i[1];
        if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(_name2);
      }
    }
  }
  var powerCableDb = ((_acc$cables = acc.cables) === null || _acc$cables === void 0 ? void 0 : _acc$cables.power) || {};
  var gatherPower = function gatherPower(data) {
    var _data$power;
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : misc;
    var includeExcluded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var input = data === null || data === void 0 || (_data$power = data.power) === null || _data$power === void 0 || (_data$power = _data$power.input) === null || _data$power === void 0 ? void 0 : _data$power.type;
    var types = Array.isArray(input) ? input : input ? [input] : [];
    types.forEach(function (t) {
      for (var _i9 = 0, _Object$entries5 = Object.entries(powerCableDb); _i9 < _Object$entries5.length; _i9++) {
        var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i9], 2),
          _name3 = _Object$entries5$_i[0],
          cable = _Object$entries5$_i[1];
        var isExcluded = excludedCables.has(_name3);
        if (cable.to === t && (!isExcluded || includeExcluded)) target.push(_name3);
      }
    });
  };
  gatherPower(devices.cameras[cameraSelect.value]);
  gatherPower(devices.video[videoSelect.value]);
  var onboardMonitor = devices.monitors[monitorSelect.value];
  if (onboardMonitor) {
    var _onboardMonitor$power;
    var monitorLabel = 'Onboard monitor';
    var powerType = onboardMonitor === null || onboardMonitor === void 0 || (_onboardMonitor$power = onboardMonitor.power) === null || _onboardMonitor$power === void 0 || (_onboardMonitor$power = _onboardMonitor$power.input) === null || _onboardMonitor$power === void 0 ? void 0 : _onboardMonitor$power.type;
    var hasLemo2 = Array.isArray(powerType) ? powerType.includes('LEMO 2-pin') : powerType === 'LEMO 2-pin';
    if (hasLemo2) {
      monitoringSupport.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"));
    }
    var cameraData = devices.cameras[cameraSelect.value];
    var camVideo = ((cameraData === null || cameraData === void 0 ? void 0 : cameraData.videoOutputs) || []).map(function (v) {
      var _v$type;
      return (_v$type = v.type) === null || _v$type === void 0 ? void 0 : _v$type.toUpperCase();
    });
    var monVideo = (onboardMonitor.videoInputs || []).map(function (v) {
      var _v$type2;
      return (_v$type2 = v.type) === null || _v$type2 === void 0 ? void 0 : _v$type2.toUpperCase();
    });
    var hasSDI = camVideo.some(function (t) {
      return t && t.includes('SDI');
    }) && monVideo.some(function (t) {
      return t && t.includes('SDI');
    });
    var hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
    if (hasSDI) {
      monitoringSupport.push("Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"), "Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"));
    } else if (hasHDMI) {
      monitoringSupport.push("Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"), "Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"));
    }
    rigging.push("ULCS Arm mit 3/8\" und 1/4\" double (".concat(monitorLabel, ")"));
  }
  if (videoSelect.value) {
    var rxName = videoSelect.value.replace(/ TX\b/, ' RX');
    if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      gatherPower(devices.wirelessReceivers[rxName]);
    }
  }
  motorSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.motors[sel.value]);
  });
  controllerSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.controllers[sel.value]);
  });
  gatherPower(devices.fiz.distance[distanceSelect.value]);
  var fizCableDb = ((_acc$cables2 = acc.cables) === null || _acc$cables2 === void 0 ? void 0 : _acc$cables2.fiz) || {};
  var getFizConnectors = function getFizConnectors(data) {
    var list = [];
    if (!data) return list;
    if (Array.isArray(data.fizConnectors)) {
      data.fizConnectors.forEach(function (fc) {
        var type = fc && _typeof(fc) === 'object' ? fc.type : fc;
        if (type) list.push(type);
      });
    }
    if (data.fizConnector) list.push(data.fizConnector);
    return _toConsumableArray(new Set(list.filter(Boolean)));
  };
  var pushFizCable = function pushFizCable(name, context) {
    fizCables.push(formatFizCable(name, context));
  };
  var pairContextCounts = {};
  var buildPairContext = function buildPairContext(motorName, controllerName) {
    var parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
    if (!parts.length) return '';
    var base = parts.join(' ↔ ');
    var key = base.toLowerCase();
    var next = (pairContextCounts[key] || 0) + 1;
    pairContextCounts[key] = next;
    return next > 1 ? "".concat(base, " #").concat(next) : base;
  };
  var matchesCable = function matchesCable(cable, from, to) {
    if (!cable) return false;
    var fromToMatch = function fromToMatch(a, b) {
      return cable.from === a && cable.to === b || cable.from === b && cable.to === a;
    };
    if (cable.from && cable.to) {
      if (fromToMatch(from, to)) return true;
    }
    if (Array.isArray(cable.connectors)) {
      var connectors = cable.connectors;
      if (connectors.includes(from) && connectors.includes(to)) return true;
    }
    return false;
  };
  var motorEntries = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.motors[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  var controllerEntries = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.controllers[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  motorEntries.forEach(function (motorEntry) {
    var motorConns = getFizConnectors(motorEntry.data);
    controllerEntries.forEach(function (controllerEntry) {
      var controllerConns = getFizConnectors(controllerEntry.data);
      motorConns.forEach(function (mConn) {
        controllerConns.forEach(function (cConn) {
          if (mConn !== cConn) return;
          for (var _i0 = 0, _Object$entries6 = Object.entries(fizCableDb); _i0 < _Object$entries6.length; _i0++) {
            var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i0], 2),
              _name4 = _Object$entries6$_i[0],
              cable = _Object$entries6$_i[1];
            if (matchesCable(cable, mConn, cConn)) {
              var context = buildPairContext(motorEntry.name, controllerEntry.name);
              pushFizCable(_name4, context);
            }
          }
        });
      });
    });
  });
  suggestArriFizCables().forEach(function (name) {
    return fizCables.push(name);
  });
  var miscUnique = _toConsumableArray(new Set(misc));
  var monitoringSupportList = monitoringSupport.slice();
  var riggingUnique = _toConsumableArray(new Set(rigging));
  for (var i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
  return {
    cameraSupport: _toConsumableArray(new Set(cameraSupport)),
    chargers: chargers,
    fizCables: fizCables,
    misc: miscUnique,
    monitoringSupport: monitoringSupportList,
    rigging: riggingUnique
  };
}
function collectProjectFormData() {
  var _crewContainer;
  if (!projectForm) return {};
  var formData = new FormData(projectForm);
  var getValue = function getValue(name) {
    var raw = formData.get(name);
    return typeof raw === 'string' ? raw.trim() : '';
  };
  var getMultiValue = function getMultiValue(name) {
    var values = formData.getAll(name);
    if (!values || values.length === 0) return '';
    return values.map(function (value) {
      return typeof value === 'string' ? value : String(value);
    }).join(', ');
  };
  var viewfinderSettings = getMultiValue('viewfinderSettings');
  var frameGuides = getMultiValue('frameGuides');
  var aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
  var filterStr = collectFilterSelections();
  var filterTypes = filterStr ? filterStr.split(',').map(function (s) {
    return s.split(':')[0];
  }) : [];
  var matteboxVal = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  }) ? 'Swing Away' : getValue('mattebox');
  var people = Array.from(((_crewContainer = crewContainer) === null || _crewContainer === void 0 ? void 0 : _crewContainer.querySelectorAll('.person-row')) || []).map(function (row) {
    var _row$querySelector, _row$querySelector2, _row$querySelector3, _row$querySelector4;
    return {
      role: (_row$querySelector = row.querySelector('select')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.value,
      name: (_row$querySelector2 = row.querySelector('.person-name')) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.value.trim(),
      phone: (_row$querySelector3 = row.querySelector('.person-phone')) === null || _row$querySelector3 === void 0 ? void 0 : _row$querySelector3.value.trim(),
      email: (_row$querySelector4 = row.querySelector('.person-email')) === null || _row$querySelector4 === void 0 || (_row$querySelector4 = _row$querySelector4.value) === null || _row$querySelector4 === void 0 ? void 0 : _row$querySelector4.trim()
    };
  }).filter(function (person) {
    return person.role && person.name;
  });
  var collectRanges = function collectRanges(container, startSel, endSel) {
    return Array.from((container === null || container === void 0 ? void 0 : container.querySelectorAll('.period-row')) || []).map(function (row) {
      var _row$querySelector5, _row$querySelector6;
      var start = (_row$querySelector5 = row.querySelector(startSel)) === null || _row$querySelector5 === void 0 ? void 0 : _row$querySelector5.value;
      var end = (_row$querySelector6 = row.querySelector(endSel)) === null || _row$querySelector6 === void 0 ? void 0 : _row$querySelector6.value;
      return [start, end].filter(Boolean).join(' to ');
    }).filter(Boolean);
  };
  var prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
  var shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');
  var gearValues = gearListOutput ? function () {
    var ids = ['gearListDirectorMonitor', 'gearListDopMonitor', 'gearListGafferMonitor', 'gearListDirectorMonitor15', 'gearListComboMonitor15', 'gearListDopMonitor15', 'gearListFocusMonitor', 'gearListProGaffColor1', 'gearListProGaffWidth1', 'gearListProGaffColor2', 'gearListProGaffWidth2', 'gearListEyeLeatherColor'];
    var map = new Map();
    ids.forEach(function (id) {
      var el = gearListOutput.querySelector("#".concat(id));
      if (!el) return;
      var value = el.value;
      map.set(id, typeof value === 'string' ? value : value == null ? '' : String(value));
    });
    return map;
  }() : null;
  var getGearValue = function getGearValue(id) {
    return gearValues && gearValues.has(id) ? gearValues.get(id) : '';
  };
  var proGaffColor1 = getGearValue('gearListProGaffColor1');
  var proGaffWidth1 = getGearValue('gearListProGaffWidth1');
  var proGaffColor2 = getGearValue('gearListProGaffColor2');
  var proGaffWidth2 = getGearValue('gearListProGaffWidth2');
  var info = _objectSpread(_objectSpread({
    productionCompany: getValue('productionCompany'),
    rentalHouse: getValue('rentalHouse')
  }, people.length ? {
    people: people
  } : {}), {}, {
    prepDays: prepDays,
    shootingDays: shootingDays,
    deliveryResolution: getValue('deliveryResolution'),
    recordingResolution: getValue('recordingResolution'),
    aspectRatio: getMultiValue('aspectRatio'),
    codec: getValue('codec'),
    baseFrameRate: getValue('baseFrameRate'),
    sensorMode: getValue('sensorMode'),
    lenses: getMultiValue('lenses'),
    requiredScenarios: getMultiValue('requiredScenarios'),
    cameraHandle: getMultiValue('cameraHandle'),
    viewfinderExtension: getValue('viewfinderExtension'),
    viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
    mattebox: matteboxVal,
    gimbal: getMultiValue('gimbal'),
    viewfinderSettings: viewfinderSettings,
    frameGuides: frameGuides,
    aspectMaskOpacity: aspectMaskOpacity,
    videoDistribution: getMultiValue('videoDistribution'),
    monitoringConfiguration: getValue('monitoringConfiguration'),
    monitorUserButtons: getMultiValue('monitorUserButtons'),
    cameraUserButtons: getMultiValue('cameraUserButtons'),
    viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
    tripodHeadBrand: getValue('tripodHeadBrand'),
    tripodBowl: getValue('tripodBowl'),
    tripodTypes: getMultiValue('tripodTypes'),
    tripodSpreader: getValue('tripodSpreader'),
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    filter: filterStr
  });
  var assignGearField = function assignGearField(prop, id) {
    var value = getGearValue(id);
    if (value) {
      info[prop] = value;
    }
  };
  assignGearField('directorMonitor', 'gearListDirectorMonitor');
  assignGearField('dopMonitor', 'gearListDopMonitor');
  assignGearField('gafferMonitor', 'gearListGafferMonitor');
  assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
  assignGearField('comboMonitor15', 'gearListComboMonitor15');
  assignGearField('dopMonitor15', 'gearListDopMonitor15');
  info.focusMonitor = getGearValue('gearListFocusMonitor') || '';
  if (proGaffColor1 || proGaffWidth1) {
    info.proGaffColor1 = proGaffColor1 || '';
    info.proGaffWidth1 = proGaffWidth1 || '';
  }
  if (proGaffColor2 || proGaffWidth2) {
    info.proGaffColor2 = proGaffColor2 || '';
    info.proGaffWidth2 = proGaffWidth2 || '';
  }
  var currentProjectName = getCurrentProjectName();
  if (currentProjectName) {
    info.projectName = currentProjectName;
  }
  return info;
}
function populateProjectForm() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!projectForm) return;
  projectForm.reset();
  var setVal = function setVal(name, value) {
    if (value === undefined) return;
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (field) field.value = value;
  };
  var setMulti = function setMulti(name, values) {
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (!field || values === undefined) return;
    var arr = Array.isArray(values) ? values : values ? values.split(',').map(function (v) {
      return v.trim();
    }) : [];
    Array.from(field.options).forEach(function (opt) {
      opt.selected = arr.includes(opt.value);
    });
  };
  populateRecordingResolutionDropdown(info.recordingResolution);
  populateSensorModeDropdown(info.sensorMode);
  populateCodecDropdown(info.codec);
  setVal('productionCompany', info.productionCompany);
  setVal('rentalHouse', info.rentalHouse);
  if (crewContainer) {
    crewContainer.innerHTML = '';
    (info.people || []).forEach(function (p) {
      return createCrewRow(p);
    });
  }
  if (prepContainer) {
    prepContainer.innerHTML = '';
    var prepArr = Array.isArray(info.prepDays) ? info.prepDays : info.prepDays ? String(info.prepDays).split('\n') : [''];
    if (!prepArr.length) prepArr.push('');
    prepArr.forEach(function (r) {
      var _r$split = r.split(' to '),
        _r$split2 = _slicedToArray(_r$split, 2),
        start = _r$split2[0],
        end = _r$split2[1];
      createPrepRow({
        start: start,
        end: end
      });
    });
  }
  if (shootContainer) {
    shootContainer.innerHTML = '';
    var shootArr = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? String(info.shootingDays).split('\n') : [''];
    if (!shootArr.length) shootArr.push('');
    shootArr.forEach(function (r) {
      var _r$split3 = r.split(' to '),
        _r$split4 = _slicedToArray(_r$split3, 2),
        start = _r$split4[0],
        end = _r$split4[1];
      createShootRow({
        start: start,
        end: end
      });
    });
  }
  setVal('deliveryResolution', info.deliveryResolution);
  setMulti('aspectRatio', info.aspectRatio);
  setVal('baseFrameRate', info.baseFrameRate);
  setVal('sensorMode', info.sensorMode);
  setMulti('lenses', info.lenses);
  setMulti('requiredScenarios', info.requiredScenarios);
  setMulti('cameraHandle', info.cameraHandle);
  setVal('viewfinderExtension', info.viewfinderExtension);
  setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
  setVal('mattebox', info.mattebox);
  setMulti('gimbal', info.gimbal);
  setMulti('viewfinderSettings', info.viewfinderSettings);
  setMulti('frameGuides', info.frameGuides);
  setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
  setMulti('videoDistribution', info.videoDistribution);
  setVal('monitoringConfiguration', info.monitoringConfiguration);
  setMulti('monitorUserButtons', info.monitorUserButtons);
  setMulti('cameraUserButtons', info.cameraUserButtons);
  setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
  setVal('tripodHeadBrand', info.tripodHeadBrand);
  setVal('tripodBowl', info.tripodBowl);
  setMulti('tripodTypes', info.tripodTypes);
  setVal('tripodSpreader', info.tripodSpreader);
  setSliderBowlValue(info.sliderBowl || '');
  setEasyrigValue(info.easyrig || '');
  var filterTokens = parseFilterTokens(info.filter);
  setMulti('filter', filterTokens.map(function (t) {
    return t.type;
  }));
  renderFilterDetails();
  filterTokens.forEach(function (_ref6) {
    var type = _ref6.type,
      size = _ref6.size,
      values = _ref6.values;
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    if (sizeSel) sizeSel.value = size;
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    if (valSel) {
      var arr = Array.isArray(values) ? values : [];
      Array.from(valSel.options).forEach(function (opt) {
        opt.selected = arr.includes(opt.value);
      });
    }
  });
}
function ensureZoomRemoteSetup(info) {
  if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!motors.length) return;
  if (motors.length < 2 && motorSelects[1]) {
    var second = motors[0];
    if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
      second = 'Arri Cforce Mini';
    }
    motorSelects[1].value = second;
    motors = motorSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
  }
  var allowed = new Set(['Arri Master Grip (single unit)', 'Arri ZMU-4 (body only, wired)', 'Tilta Nucleus-M Hand Grip (single)', 'Tilta Nucleus-M II Handle (single)']);
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!controllers.some(function (c) {
    return allowed.has(c);
  })) {
    var brand = detectBrand(motors[0]);
    var ctrl = null;
    if (brand === 'arri') {
      ctrl = 'Arri Master Grip (single unit)';
    } else if (brand === 'tilta') {
      ctrl = 'Tilta Nucleus-M Hand Grip (single)';
    }
    if (ctrl && controllerSelects[0]) {
      controllerSelects[0].value = ctrl;
    }
  }
  if (typeof updateCalculations === 'function') updateCalculations();
  if (typeof saveCurrentSession === 'function') saveCurrentSession();
}
function stripAutoGearContext(name) {
  return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}
function normalizeAutoGearName(name) {
  return stripAutoGearContext(name).toLowerCase();
}
function matchesAutoGearItem(target, actual) {
  if (!target || !actual) return false;
  var normTarget = normalizeAutoGearName(target);
  var normActual = normalizeAutoGearName(actual);
  if (normTarget === normActual) return true;
  return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}
function getSpanCount(span) {
  if (!span) return 1;
  var text = span.textContent || '';
  var match = text.trim().match(/^(\d+)x\s+/);
  return match ? parseInt(match[1], 10) : 1;
}
function updateSpanCountInPlace(span, newCount) {
  if (!span) return;
  var walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
  var textNode = null;
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (/\d+x\s+/i.test(node.textContent)) {
      textNode = node;
      break;
    }
  }
  if (!textNode) {
    span.insertBefore(document.createTextNode("".concat(newCount, "x ")), span.firstChild);
    return;
  }
  var value = textNode.textContent || '';
  var match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
  if (match) {
    textNode.textContent = "".concat(match[1]).concat(newCount, "x ").concat(match[3]);
  } else {
    textNode.textContent = value.replace(/^(\d+)x\s+/, "".concat(newCount, "x "));
  }
}
function cleanupAutoGearCell(cell) {
  if (!cell) return;
  var nodes = Array.from(cell.childNodes);
  var previousWasBreak = true;
  nodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
      cell.removeChild(node);
      return;
    }
    if (node.nodeName === 'BR') {
      if (previousWasBreak || !node.nextSibling) {
        cell.removeChild(node);
        return;
      }
      previousWasBreak = true;
    } else {
      previousWasBreak = false;
    }
  });
  while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
    cell.removeChild(cell.firstChild);
  }
  while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
    cell.removeChild(cell.lastChild);
  }
  var textContent = cell.textContent ? cell.textContent.trim() : '';
  if (!textContent && !cell.querySelector('.gear-item')) {
    var row = cell.closest('tr');
    var section = row ? row.closest('tbody') : null;
    if (section && section.classList.contains('auto-gear-category')) {
      section.remove();
    }
  }
}
function analyzeAutoGearSegment(nodes) {
  if (!nodes || !nodes.length) return null;
  var span = nodes.find(function (node) {
    return node.nodeType === 1 && node.classList && node.classList.contains('gear-item');
  });
  if (span) {
    var name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    var _count = getSpanCount(span);
    return {
      span: span,
      name: name,
      count: _count
    };
  }
  var wrapper = document.createElement('div');
  nodes.forEach(function (node) {
    return wrapper.appendChild(node.cloneNode(true));
  });
  var text = wrapper.innerHTML.replace(/<select[\s\S]*?<\/select>/gi, '').replace(/<[^>]+>/g, '').trim();
  if (!text) return null;
  var match = text.match(/^(\d+)x\s+/);
  var count = 1;
  if (match) {
    count = parseInt(match[1], 10);
    text = text.slice(match[0].length).trim();
  }
  return {
    span: null,
    name: text,
    count: count,
    wrapper: wrapper
  };
}
function updateRawSegmentCount(nodes, info, newCount) {
  if (!nodes.length) return;
  var updated = false;
  var _iterator = _createForOfIteratorHelper(nodes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      if (node.nodeType === Node.TEXT_NODE) {
        var value = node.textContent || '';
        if (/\d+x\s+/i.test(value)) {
          node.textContent = value.replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
        if (value.trim()) {
          node.textContent = "".concat(newCount, "x ").concat(value.trim().replace(/^(\d+)x\s+/, ''));
          updated = true;
          break;
        }
      } else if (node.nodeType === 1) {
        var child = node.firstChild;
        if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
          child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (!updated) {
    var first = nodes[0];
    var parent = first.parentNode;
    if (parent) {
      parent.insertBefore(document.createTextNode("".concat(newCount, "x ").concat(info.name)), first);
    }
  }
}
function removeAutoGearItem(cell, item, remainingOverride) {
  if (!cell) return normalizeAutoGearQuantity(item.quantity);
  var remaining = typeof remainingOverride === 'number' ? remainingOverride : normalizeAutoGearQuantity(item.quantity);
  if (remaining <= 0) return remaining;
  var nodes = Array.from(cell.childNodes);
  if (!nodes.length) return remaining;
  var segments = [];
  var current = [];
  nodes.forEach(function (node) {
    if (node.nodeName === 'BR') {
      segments.push({
        nodes: current,
        separator: node
      });
      current = [];
    } else {
      current.push(node);
    }
  });
  segments.push({
    nodes: current,
    separator: null
  });
  var modified = false;
  segments.forEach(function (segment) {
    if (!segment.nodes.length || remaining <= 0) return;
    var info = analyzeAutoGearSegment(segment.nodes);
    if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
    if (info.span) {
      var currentCount = info.count;
      if (currentCount > remaining) {
        updateSpanCountInPlace(info.span, currentCount - remaining);
        remaining = 0;
      } else {
        remaining -= currentCount;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
      }
      modified = true;
    } else {
      if (info.count > remaining && info.count > 1) {
        updateRawSegmentCount(segment.nodes, info, info.count - remaining);
        remaining = 0;
        modified = true;
      } else {
        remaining -= info.count;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
        modified = true;
      }
    }
  });
  if (modified) {
    cleanupAutoGearCell(cell);
  }
  return remaining;
}
function getAutoGearRuleDisplayLabel(rule) {
  if (!rule || _typeof(rule) !== 'object') return '';
  var label = typeof rule.label === 'string' ? rule.label.trim() : '';
  if (label) return label;
  var scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (scenarioList.length) return scenarioList.join(' + ');
  var cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
  if (cameraList.length) return cameraList.join(' + ');
  var monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
  if (monitorList.length) return monitorList.join(' + ');
  var wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
  if (wirelessList.length) return wirelessList.join(' + ');
  var motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
  if (motorsList.length) return motorsList.join(' + ');
  var controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
  if (controllersList.length) return controllersList.join(' + ');
  var distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
  if (distanceList.length) return distanceList.join(' + ');
  var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (matteboxList.length) return matteboxList.join(' + ');
  var cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
  if (cameraHandleList.length) return cameraHandleList.join(' + ');
  var viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean).map(getViewfinderFallbackLabel) : [];
  if (viewfinderList.length) return viewfinderList.join(' + ');
  var videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean).map(getVideoDistributionFallbackLabel) : [];
  if (videoDistributionList.length) return videoDistributionList.join(' + ');
  return '';
}
function formatAutoGearRuleTooltip(rule) {
  var _texts$en;
  var langTexts = texts[currentLang] || texts.en || {};
  var unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearRuleTooltipUnnamed) || 'Added by automatic gear rule';
  if (!rule || _typeof(rule) !== 'object') return unnamedTemplate;
  var label = getAutoGearRuleDisplayLabel(rule);
  if (label) {
    var _texts$en2;
    var namedTemplate = langTexts.autoGearRuleTooltipNamed || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.autoGearRuleTooltipNamed) || "".concat(unnamedTemplate, ": %s");
    return namedTemplate.replace('%s', label);
  }
  return unnamedTemplate;
}

function extractAutoGearRuleSource(rule) {
  if (!rule || _typeof(rule) !== 'object') return null;
  var id = typeof rule.id === 'string' ? rule.id.trim() : '';
  var label = getAutoGearRuleDisplayLabel(rule);
  if (!id && !label) return null;
  return {
    id: id,
    label: label
  };
}

function normalizeAutoGearRuleSourceEntry(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') {
    var trimmed = entry.trim();
    if (!trimmed) return null;
    return {
      id: '',
      label: trimmed
    };
  }
  if (_typeof(entry) !== 'object') return null;
  var id = typeof entry.id === 'string' ? entry.id.trim() : '';
  var label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!id && !label) return null;
  return {
    id: id,
    label: label
  };
}

function dedupeAutoGearRuleSources(entries) {
  if (!Array.isArray(entries) || !entries.length) return [];
  var seen = new Set();
  var normalized = [];
  entries.forEach(function (entry) {
    var source = normalizeAutoGearRuleSourceEntry(entry);
    if (!source) return;
    var idKey = source.id ? source.id.toLowerCase() : '';
    var labelKey = source.label ? source.label.toLowerCase() : '';
    var key = idKey ? "id:".concat(idKey) : labelKey ? "label:".concat(labelKey) : '';
    if (!key || seen.has(key)) return;
    seen.add(key);
    normalized.push({
      id: source.id,
      label: source.label
    });
  });
  return normalized;
}

function formatAutoGearSelectorDisplayValue(type, value) {
  var normalizedValue = typeof value === 'string' ? value : value == null ? '' : String(value);
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
  if (typeof scope.formatAutoGearSelectorValue === 'function') {
    return scope.formatAutoGearSelectorValue(type, normalizedValue);
  }
  if (typeof addArriKNumber === 'function' && (type === 'monitor' || type === 'directorMonitor')) {
    return addArriKNumber(normalizedValue);
  }
  return normalizedValue;
}

function getAutoGearRuleSources(span) {
  if (!span || !span.dataset) return [];
  var dataset = span.dataset;
  var raw = typeof dataset.autoGearRuleSources === 'string' ? dataset.autoGearRuleSources : '';
  var sources = [];
  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        sources = dedupeAutoGearRuleSources(parsed);
      }
    } catch (error) {
      console.warn('Failed to parse automatic gear rule metadata', error);
      sources = [];
    }
  }
  if (!sources.length) {
    sources = dedupeAutoGearRuleSources([
      {
        id: dataset.autoGearRuleId,
        label: dataset.autoGearRuleLabel
      }
    ]);
  }
  return sources;
}

function setAutoGearRuleSources(span, entries) {
  if (!span || !span.dataset) return;
  var normalized = dedupeAutoGearRuleSources(entries);
  var dataset = span.dataset;
  if (!normalized.length) {
    delete dataset.autoGearRuleSources;
    delete dataset.autoGearRuleId;
    delete dataset.autoGearRuleLabel;
    return;
  }
  try {
    dataset.autoGearRuleSources = JSON.stringify(normalized);
  } catch (error) {
    console.warn('Failed to serialize automatic gear rule metadata', error);
  }
  var primary = normalized[0];
  if (primary.id) {
    dataset.autoGearRuleId = primary.id;
  } else {
    delete dataset.autoGearRuleId;
  }
  if (primary.label) {
    dataset.autoGearRuleLabel = primary.label;
  } else {
    delete dataset.autoGearRuleLabel;
  }
}

function appendAutoGearRuleSource(span, rule) {
  if (!span || !span.dataset) return;
  var addition = extractAutoGearRuleSource(rule);
  var existing = getAutoGearRuleSources(span);
  if (addition) {
    existing.push(addition);
  }
  setAutoGearRuleSources(span, existing);
}

function buildAutoGearRuleTooltipFromSources(sources) {
  if (!Array.isArray(sources) || !sources.length) return '';
  var labels = sources.map(function (source) {
    if (!source) return '';
    var label = typeof source.label === 'string' ? source.label.trim() : '';
    if (label) return label;
    var id = typeof source.id === 'string' ? source.id.trim() : '';
    return id;
  }).filter(Boolean);
  if (!labels.length) return '';
  return formatAutoGearRuleTooltip({
    label: labels.join(', ')
  });
}

function refreshAutoGearRuleBadge(span) {
  if (!span || !span.classList || !span.classList.contains('auto-gear-item')) {
    return;
  }
  var sources = getAutoGearRuleSources(span);
  setAutoGearRuleSources(span, sources);
  applyAutoGearRuleColors(span);
  var badgeTexts = sources.map(function (source) {
    return formatAutoGearRuleBadgeText(source.label, source.id);
  }).filter(Boolean);
  var existingBadges = Array.from(span.querySelectorAll('.auto-gear-rule-badge'));
  if (!badgeTexts.length) {
    existingBadges.forEach(function (node) {
      return node.remove();
    });
    if (span.dataset && Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearRuleBadge')) {
      delete span.dataset.autoGearRuleBadge;
    }
    var emptyTooltip = buildAutoGearRuleTooltipFromSources(sources);
    if (emptyTooltip) {
      span.title = emptyTooltip;
    } else {
      span.removeAttribute('title');
    }
    return;
  }
  badgeTexts.forEach(function (text, index) {
    var badge = existingBadges[index];
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'auto-gear-rule-badge';
      span.appendChild(badge);
    }
    badge.textContent = text;
  });
  if (existingBadges.length > badgeTexts.length) {
    existingBadges.slice(badgeTexts.length).forEach(function (node) {
      return node.remove();
    });
  }
  if (span.dataset) {
    try {
      span.dataset.autoGearRuleBadge = JSON.stringify(badgeTexts);
    } catch (error) {
      console.warn('Failed to serialize automatic gear rule badge labels', error);
    }
  }
  var tooltip = buildAutoGearRuleTooltipFromSources(sources);
  if (tooltip) {
    span.title = tooltip;
  } else {
    span.removeAttribute('title');
  }
}
function configureAutoGearSpan(span, normalizedItem, quantity, rule) {
  if (!span || !normalizedItem) return;
  var name = normalizedItem.name ? normalizedItem.name.trim() : '';
  if (!name) return;
  while (span.firstChild) {
    span.removeChild(span.firstChild);
  }
  span.classList.add('gear-item');
  span.classList.add('auto-gear-item');
  span.setAttribute('data-gear-name', name);
  if (span.dataset) {
    var source = extractAutoGearRuleSource(rule);
    setAutoGearRuleSources(span, source ? [source] : []);
  }
  var tooltipSources = getAutoGearRuleSources(span);
  var tooltip = tooltipSources.length ? buildAutoGearRuleTooltipFromSources(tooltipSources) : formatAutoGearRuleTooltip(rule);
  if (tooltip) {
    span.title = tooltip;
  } else {
    span.removeAttribute('title');
  }
  var displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
  span.appendChild(document.createTextNode("".concat(quantity, "x ").concat(displayName)));
  if (normalizedItem.screenSize) {
    span.appendChild(document.createTextNode(" - ".concat(normalizedItem.screenSize)));
  }
  var selectorType = normalizedItem.selectorType || 'none';
  var selectorDefault = normalizedItem.selectorDefault || '';
  var selectorLabel = getAutoGearSelectorLabel(selectorType);
  if (selectorType && selectorType !== 'none') {
    if (normalizedItem.selectorEnabled) {
      var options = getAutoGearSelectorOptions(selectorType);
      var sanitizedRuleId = rule && rule.id ? rule.id.replace(/[^a-zA-Z0-9_-]/g, '') : 'rule';
      var selectId = "autoGearSelector_".concat(sanitizedRuleId, "_").concat(normalizedItem.id);
      var select = document.createElement('select');
      select.id = selectId;
      select.className = 'auto-gear-selector';
      select.dataset.autoGearSelectorType = selectorType;
      if (selectorLabel) {
        select.setAttribute('aria-label', selectorLabel);
      }
      var normalizedDefaultValue = '';
      options.forEach(function (optionName) {
        var option = document.createElement('option');
        option.value = optionName;
        option.textContent = formatAutoGearSelectorDisplayValue(selectorType, optionName);
        if (!normalizedDefaultValue && selectorDefault && optionName.toLowerCase() === selectorDefault.toLowerCase()) {
          normalizedDefaultValue = option.value;
        }
        select.appendChild(option);
      });
      if (selectorDefault && !normalizedDefaultValue) {
        var fallbackOption = document.createElement('option');
        fallbackOption.value = selectorDefault;
        fallbackOption.textContent = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
        select.insertBefore(fallbackOption, select.firstChild);
        normalizedDefaultValue = selectorDefault;
      }
      if (normalizedDefaultValue) {
        select.value = normalizedDefaultValue;
      } else if (select.options.length) {
        select.selectedIndex = 0;
      }
      if (!select.options.length) {
        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = selectorLabel || '';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        select.disabled = true;
      }
      var wrapper = document.createElement('span');
      wrapper.className = 'auto-gear-selector-container';
      wrapper.appendChild(select);
      span.appendChild(document.createTextNode(' - '));
      span.appendChild(wrapper);
    } else if (selectorDefault) {
      var formattedDefault = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
      span.appendChild(document.createTextNode(" - ".concat(selectorLabel, ": ").concat(formattedDefault)));
    } else if (selectorLabel) {
      span.appendChild(document.createTextNode(" - ".concat(selectorLabel)));
    }
  }
  if (normalizedItem.notes) {
    var delimiter = normalizedItem.notes.trim().toLowerCase().startsWith('incl') ? ' ' : ' – ';
    span.appendChild(document.createTextNode("".concat(delimiter).concat(normalizedItem.notes)));
  }
}
function addAutoGearItem(cell, item, rule) {
  if (!cell) return;
  var normalizedItem = normalizeAutoGearItem(item);
  if (!normalizedItem) return;
  var quantity = normalizeAutoGearQuantity(normalizedItem.quantity);
  if (quantity <= 0) return;
  var name = normalizedItem.name ? normalizedItem.name.trim() : '';
  if (!name) return;
  var spans = Array.from(cell.querySelectorAll('.gear-item'));
  for (var _i1 = 0, _spans = spans; _i1 < _spans.length; _i1++) {
    var _span = _spans[_i1];
    var spanName = _span.getAttribute('data-gear-name') || (_span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    if (matchesAutoGearItem(name, spanName)) {
      if (_span.classList.contains('auto-gear-item')) {
        var newCount = getSpanCount(_span) + quantity;
        updateSpanCountInPlace(_span, newCount);
        if (rule && _typeof(rule) === 'object') {
          appendAutoGearRuleSource(_span, rule);
        } else if (_span.dataset) {
          setAutoGearRuleSources(_span, getAutoGearRuleSources(_span));
        }
        var tooltip = buildAutoGearRuleTooltipFromSources(getAutoGearRuleSources(_span));
        if (tooltip) {
          _span.title = tooltip;
        } else {
          _span.removeAttribute('title');
        }
        applyAutoGearRuleColors(_span, rule);
        refreshAutoGearRuleBadge(_span);
      } else {
        configureAutoGearSpan(_span, normalizedItem, quantity, rule);
      }
      return;
    }
  }
  if (cell.childNodes.length) {
    cell.appendChild(document.createElement('br'));
  }
  var span = document.createElement('span');
  configureAutoGearSpan(span, normalizedItem, quantity, rule);
  cell.appendChild(span);
}
function ensureAutoGearCategory(table, category) {
  var _texts$currentLang, _texts$en3;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var existing = Array.from(table.querySelectorAll('tbody.category-group')).find(function (body) {
    if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
      return body.dataset.autoCategory === rawCategory;
    }
    var headerCell = body.querySelector('.category-row td');
    return headerCell && headerCell.textContent.trim() === label;
  });
  if (existing) {
    var cell = existing.querySelector('tr:not(.category-row) td');
    return cell || null;
  }
  var body = document.createElement('tbody');
  body.className = 'category-group auto-gear-category';
  body.dataset.autoCategory = rawCategory;
  var headerRow = document.createElement('tr');
  headerRow.className = 'category-row';
  var headerCell = document.createElement('td');
  var labelText = rawCategory ? rawCategory : ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.autoGearCustomCategory) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearCustomCategory) || 'Custom Additions';
  headerCell.textContent = labelText;
  headerRow.appendChild(headerCell);
  body.appendChild(headerRow);
  var itemsRow = document.createElement('tr');
  var itemsCell = document.createElement('td');
  itemsRow.appendChild(itemsCell);
  body.appendChild(itemsRow);
  table.appendChild(body);
  return itemsCell;
}
function findAutoGearCategoryCell(table, category) {
  if (!table) return null;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var bodies = Array.from(table.querySelectorAll('tbody.category-group'));
  for (var _i10 = 0, _bodies = bodies; _i10 < _bodies.length; _i10++) {
    var body = _bodies[_i10];
    if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
      if (body.dataset.autoCategory === rawCategory) {
        var cell = body.querySelector('tr:not(.category-row) td');
        if (cell) return cell;
      }
      continue;
    }
    var headerCell = body.querySelector('.category-row td');
    if (!headerCell) continue;
    var headerLabel = headerCell.textContent.trim();
    if (rawCategory) {
      if (headerLabel === rawCategory) {
        var _cell = body.querySelector('tr:not(.category-row) td');
        if (_cell) return _cell;
      }
    } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
      var _cell2 = body.querySelector('tr:not(.category-row) td');
      if (_cell2) return _cell2;
    }
  }
  return null;
}
function normalizeAutoGearScenarioLogicValue(value) {
  if (typeof value !== 'string') return 'all';
  var normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'any';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
  if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
    return 'multiplier';
  }
  return normalized === 'all' ? 'all' : 'all';
}

function normalizeAutoGearScenarioMultiplierValue(value) {
  var num = parseInt(value, 10);
  return isFinite(num) && num > 1 ? num : 1;
}

function computeAutoGearScenarioOutcome(rule, scenarioSet) {
  if (!rule || typeof rule !== 'object') {
    return { active: true, multiplier: 1 };
  }
  var rawList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (!rawList.length) {
    return { active: true, multiplier: 1 };
  }
  var normalizedTargets = rawList
    .map(normalizeAutoGearTriggerValue)
    .filter(Boolean);
  if (!normalizedTargets.length) {
    return { active: false, multiplier: 0 };
  }
  var logic = normalizeAutoGearScenarioLogicValue(rule.scenarioLogic);
  if (logic === 'any') {
    var hasAny = normalizedTargets.some(function (target) {
      return scenarioSet.has(target);
    });
    return { active: hasAny, multiplier: hasAny ? 1 : 0 };
  }
  if (logic === 'multiplier') {
    var requestedPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary : '';
    var normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
    var baseTarget = '';
    if (normalizedPrimary && normalizedTargets.indexOf(normalizedPrimary) >= 0) {
      baseTarget = normalizedPrimary;
    } else {
      baseTarget = normalizedTargets[0] || '';
    }
    if (!baseTarget || !scenarioSet.has(baseTarget)) {
      return { active: false, multiplier: 0 };
    }
    var extras = normalizedTargets.filter(function (target) {
      return target !== baseTarget;
    });
    if (!extras.length) {
      return { active: true, multiplier: 1 };
    }
    var extrasSatisfied = extras.every(function (target) {
      return scenarioSet.has(target);
    });
    var multiplier = normalizeAutoGearScenarioMultiplierValue(rule.scenarioMultiplier);
    return { active: true, multiplier: extrasSatisfied ? multiplier : 1 };
  }
  var allPresent = normalizedTargets.every(function (target) {
    return scenarioSet.has(target);
  });
  return { active: allPresent, multiplier: allPresent ? 1 : 0 };
}

function createScaledAutoGearItem(item, quantity) {
  if (!item || typeof item !== 'object') {
    return item;
  }
  if (typeof Object.assign === 'function') {
    return Object.assign({}, item, { quantity: quantity });
  }
  var copy = {};
  for (var key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      copy[key] = item[key];
    }
  }
  copy.quantity = quantity;
  return copy;
}

function applyAutoGearRulesToTableHtml(tableHtml, info) {
  if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  var scenarios = info && info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var normalizedScenarioSet = new Set(scenarios.map(normalizeAutoGearTriggerValue).filter(Boolean));
  var selectedMattebox = info && typeof info.mattebox === 'string' ? info.mattebox.trim() : '';
  var normalizedMattebox = normalizeAutoGearTriggerValue(selectedMattebox);
  var cameraHandles = info && typeof info.cameraHandle === 'string' ? info.cameraHandle.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var normalizedCameraHandles = cameraHandles.map(normalizeAutoGearTriggerValue).filter(Boolean);
  var cameraHandleSet = new Set(normalizedCameraHandles);
  var rawViewfinderExtension = info && typeof info.viewfinderExtension === 'string' ? info.viewfinderExtension.trim() : '';
  var hasViewfinderSelection = Boolean(rawViewfinderExtension);
  var normalizedViewfinderExtension = hasViewfinderSelection ? normalizeAutoGearTriggerValue(rawViewfinderExtension) : '';
  var videoDistribution = [];
  if (info && Array.isArray(info.videoDistribution)) {
    videoDistribution = info.videoDistribution;
  } else if (info && typeof info.videoDistribution === 'string') {
    videoDistribution = info.videoDistribution.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean);
  }
  var normalizedVideoDistribution = videoDistribution.map(normalizeVideoDistributionOptionValue).map(function (value) {
    return value === '__none__' ? '' : normalizeAutoGearTriggerValue(value);
  }).filter(Boolean);
  var videoDistributionSet = new Set(normalizedVideoDistribution);
  var rawCameraSelection = info && typeof info.cameraSelection === 'string' ? info.cameraSelection.trim() : '';
  var normalizedCameraSelection = normalizeAutoGearTriggerValue(rawCameraSelection);
  var rawMonitorSelection = info && typeof info.monitorSelection === 'string' ? info.monitorSelection.trim() : '';
  var normalizedMonitorSelection = normalizeAutoGearTriggerValue(rawMonitorSelection);
  var rawWirelessSelection = info && typeof info.wirelessSelection === 'string' ? info.wirelessSelection.trim() : '';
  var normalizedWirelessSelection = normalizeAutoGearTriggerValue(rawWirelessSelection);
  var rawMotorSelections = [];
  if (info) {
    if (Array.isArray(info.motorSelections)) {
      rawMotorSelections.push.apply(rawMotorSelections, _toConsumableArray(info.motorSelections));
    }
    if (Array.isArray(info.motors)) {
      rawMotorSelections.push.apply(rawMotorSelections, _toConsumableArray(info.motors));
    }
  }
  var normalizedMotorSet = new Set(rawMotorSelections.filter(function (value) {
    return typeof value === 'string';
  }).map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean));
  var rawControllerSelections = [];
  if (info) {
    if (Array.isArray(info.controllerSelections)) {
      rawControllerSelections.push.apply(rawControllerSelections, _toConsumableArray(info.controllerSelections));
    }
    if (Array.isArray(info.controllers)) {
      rawControllerSelections.push.apply(rawControllerSelections, _toConsumableArray(info.controllers));
    }
  }
  var normalizedControllerSet = new Set(rawControllerSelections.filter(function (value) {
    return typeof value === 'string';
  }).map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean));
  var rawDistanceSelection = info && typeof info.distanceSelection === 'string' ? info.distanceSelection.trim() : '';
  var normalizedDistanceSelection = normalizeAutoGearTriggerValue(rawDistanceSelection);
  if (!scenarios.length) {
    var hasRuleWithoutScenario = autoGearRules.some(function (rule) {
      var scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
      return scenarioList.length === 0;
    });
    if (!hasRuleWithoutScenario) return tableHtml;
  }
  var touchesMatteboxCategory = function touchesMatteboxCategory(rule) {
    if (!rule || _typeof(rule) !== 'object') return false;
    var lists = [];
    if (Array.isArray(rule.add)) lists.push(rule.add);
    if (Array.isArray(rule.remove)) lists.push(rule.remove);
    return lists.some(function (entries) {
      return entries.some(function (entry) {
        if (!entry || _typeof(entry) !== 'object') return false;
        var category = typeof entry.category === 'string' ? entry.category.trim().toLowerCase() : '';
        return category === 'matte box + filter';
      });
    });
  };
  var triggeredEntries = [];
  autoGearRules.forEach(function (rule) {
    if (!rule) return;
    var multiplier = 1;
    if (rule.always) {
      multiplier = 1;
    } else {
      var scenarioOutcome = computeAutoGearScenarioOutcome(rule, normalizedScenarioSet);
      if (!scenarioOutcome.active) return;
      multiplier = scenarioOutcome.multiplier || 1;
    }
    var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
    if (matteboxList.length) {
      var _normalizedTargets = matteboxList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets.length) return;
      if (!normalizedMattebox) return;
      if (_normalizedTargets.indexOf(normalizedMattebox) === -1) return;
    }
    var cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
    if (cameraList.length) {
      var _normalizedTargets2 = cameraList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets2.length) return;
      if (!normalizedCameraSelection) return;
      if (_normalizedTargets2.indexOf(normalizedCameraSelection) === -1) return;
    }
    var monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
    if (monitorList.length) {
      var _normalizedTargets3 = monitorList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets3.length) return;
      if (!normalizedMonitorSelection) return;
      if (_normalizedTargets3.indexOf(normalizedMonitorSelection) === -1) return;
    }
    var wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
    if (wirelessList.length) {
      var _normalizedTargets4 = wirelessList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets4.length) return;
      if (!normalizedWirelessSelection) return;
      if (_normalizedTargets4.indexOf(normalizedWirelessSelection) === -1) return;
    }
    var motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
    if (motorsList.length) {
      var _normalizedTargets5 = motorsList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets5.length) return;
      if (!_normalizedTargets5.every(function (target) {
        return normalizedMotorSet.has(target);
      })) return;
    }
    var controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
    if (controllersList.length) {
      var _normalizedTargets6 = controllersList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets6.length) return;
      if (!_normalizedTargets6.every(function (target) {
        return normalizedControllerSet.has(target);
      })) return;
    }
    var distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
    if (distanceList.length) {
      var _normalizedTargets7 = distanceList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets7.length) return;
      if (!normalizedDistanceSelection) return;
      if (_normalizedTargets7.indexOf(normalizedDistanceSelection) === -1) return;
    }
    var cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
    if (cameraHandleList.length) {
      var _normalizedTargets8 = cameraHandleList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets8.length) return;
      if (!_normalizedTargets8.every(function (target) {
        return cameraHandleSet.has(target);
      })) return;
    }
    var viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean) : [];
    if (viewfinderList.length) {
      var _normalizedTargets9 = viewfinderList.map(function (value) {
        return normalizeAutoGearTriggerValue(value);
      }).filter(Boolean);
      if (!_normalizedTargets9.length) return;
      if (!normalizedViewfinderExtension) return;
      if (_normalizedTargets9.indexOf(normalizedViewfinderExtension) === -1) return;
    }
    var videoDistList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
    if (videoDistList.length) {
      var _normalizedTargets0 = videoDistList.map(function (value) {
        return normalizeVideoDistributionOptionValue(value);
      }).map(function (value) {
        return value === '__none__' ? '' : normalizeAutoGearTriggerValue(value);
      }).filter(Boolean);
      if (!_normalizedTargets0.length) return;
      if (!_normalizedTargets0.every(function (target) {
        return videoDistributionSet.has(target);
      })) return;
    }
    triggeredEntries.push({ rule: rule, multiplier: multiplier });
  });
  if (!triggeredEntries.length) return tableHtml;

  if (normalizedMattebox) {
    triggeredEntries = triggeredEntries.filter(function (entry) {
      var rule = entry.rule;
      if (!touchesMatteboxCategory(rule)) return true;
      var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
      if (!matteboxList.length) return false;
      var normalizedTargets = matteboxList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!normalizedTargets.length) return false;
      return normalizedTargets.indexOf(normalizedMattebox) !== -1;
    });
    if (!triggeredEntries.length) return tableHtml;
  }
  var container = document.createElement('div');
  container.innerHTML = tableHtml;
  var table = container.querySelector('.gear-table');
  if (!table) return tableHtml;
  triggeredEntries.forEach(function (entry) {
    var rule = entry.rule;
    var multiplier = entry.multiplier;
    var parsedMultiplier = parseInt(multiplier, 10);
    if (!isFinite(parsedMultiplier) || parsedMultiplier < 1) {
      parsedMultiplier = 1;
    }
    rule.remove.forEach(function (item) {
      var remaining = normalizeAutoGearQuantity(item.quantity) * parsedMultiplier;
      if (remaining <= 0) return;
      var primaryCell = findAutoGearCategoryCell(table, item.category);
      if (primaryCell) {
        remaining = removeAutoGearItem(primaryCell, item, remaining);
      }
      if (remaining > 0) {
        var gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
        for (var i = 0; i < gearCells.length; i += 1) {
          var cell = gearCells[i];
          if (cell === primaryCell) continue;
          remaining = removeAutoGearItem(cell, item, remaining);
          if (remaining <= 0) break;
        }
      }
    });
    rule.add.forEach(function (item) {
      var baseQuantity = normalizeAutoGearQuantity(item.quantity);
      var quantity = baseQuantity * parsedMultiplier;
      var scaledItem = quantity === baseQuantity ? item : createScaledAutoGearItem(item, quantity);
      var cell = ensureAutoGearCategory(table, item.category);
      if (cell) addAutoGearItem(cell, scaledItem, rule);
    });
  });
  return container.innerHTML;
}

function formatPhoneHref(phone) {
  if (typeof phone !== 'string') return '';
  var trimmed = phone.trim();
  if (!trimmed) return '';
  var sanitized = trimmed.replace(/[^0-9+*#;,]/g, '');
  return sanitized ? sanitized : '';
}
function formatEmailHref(email) {
  if (typeof email !== 'string') return '';
  var trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) return '';
  var normalized = trimmed.replace(/\s+/g, '');
  if (!normalized || !normalized.includes('@')) return '';
  var encoded = encodeURIComponent(normalized);
  return encoded ? encoded.replace(/%40/g, '@') : '';
}
function formatRequirementValue(rawValue) {
  if (rawValue && _typeof(rawValue) === 'object') {
    if (typeof rawValue.__html === 'string' && rawValue.__html) {
      return rawValue.__html;
    }
    if (Array.isArray(rawValue) && rawValue.length) {
      var html = rawValue.map(function (item) {
        return typeof item === 'string' ? escapeHtml(item) : escapeHtml(String(item || ''));
      }).join('<br>');
      if (html) return html;
    }
    if (typeof rawValue.text === 'string' && rawValue.text) {
      return escapeHtml(rawValue.text).replace(/\n/g, '<br>');
    }
  }
  var value = typeof rawValue === 'string' ? rawValue : rawValue == null ? '' : String(rawValue);
  return escapeHtml(value).replace(/\n/g, '<br>');
}
function generateGearListHtml() {
  var _devices$accessories2, _texts$currentLang2, _texts$en4, _texts$currentLang3, _texts$en5, _texts$currentLang4, _texts$en6, _devices$accessories3;
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getText = function getText(sel) {
    return sel && sel.options && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text.trim() : '';
  };
  var selectedNames = {
    camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
    monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
    video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
    motors: motorSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    controllers: controllerSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
    cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
    battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
  };
  var hasMotor = selectedNames.motors.length > 0;
  var videoDistPrefs = info.videoDistribution ? info.videoDistribution.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var handheldPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
    return m ? {
      role: m[1],
      size: m[2] ? parseFloat(m[2]) : undefined
    } : null;
  }).filter(Boolean);
  var largeMonitorPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
    return m ? {
      role: m[1]
    } : null;
  }).filter(Boolean);
  if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
    selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
  } else {
    selectedNames.viewfinder = "";
  }
  var _collectAccessories = collectAccessories({
      hasMotor: hasMotor,
      videoDistPrefs: videoDistPrefs
    }),
    cameraSupportAcc = _collectAccessories.cameraSupport,
    chargersAcc = _collectAccessories.chargers,
    fizCableAcc = _collectAccessories.fizCables,
    miscAcc = _collectAccessories.misc,
    monitoringSupportAcc = _collectAccessories.monitoringSupport,
    riggingAcc = _collectAccessories.rigging;
  for (var i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 1/4" to 1/4"');
  for (var _i12 = 0; _i12 < 2; _i12++) riggingAcc.push('ULCS Bracket with 3/8" to 1/4"');
  for (var _i13 = 0; _i13 < 2; _i13++) riggingAcc.push('Noga Arm');
  for (var _i14 = 0; _i14 < 2; _i14++) riggingAcc.push('Mini Magic Arm');
  for (var _i15 = 0; _i15 < 4; _i15++) riggingAcc.push('Cine Quick Release');
  riggingAcc.push('SmallRig - Super lightweight 15mm RailBlock');
  for (var _i16 = 0; _i16 < 3; _i16++) riggingAcc.push('Spigot with male 3/8" and 1/4"');
  for (var _i17 = 0; _i17 < 2; _i17++) riggingAcc.push('Clapper Stick');
  for (var _i18 = 0; _i18 < 2; _i18++) riggingAcc.push('D-Tap Splitter');
  var cagesDb = ((_devices$accessories2 = devices.accessories) === null || _devices$accessories2 === void 0 ? void 0 : _devices$accessories2.cages) || {};
  var compatibleCages = [];
  if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
    for (var _i19 = 0, _Object$entries7 = Object.entries(cagesDb); _i19 < _Object$entries7.length; _i19++) {
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i19], 2),
        name = _Object$entries7$_i[0],
        cage = _Object$entries7$_i[1];
      if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
        compatibleCages.push(name);
      }
    }
  }
  var supportAccNoCages = cameraSupportAcc.filter(function (item) {
    return !compatibleCages.includes(item);
  });
  var scenarios = info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var hasSeededScenarioRules = hasSeededAutoGearDefaults();
  var allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
  var isScenarioActive = function isScenarioActive(scenario) {
    return allowLegacyScenarioGear && scenarios.includes(scenario);
  };
  var isAnyScenarioActive = function isAnyScenarioActive(list) {
    return allowLegacyScenarioGear && list.some(function (value) {
      return scenarios.includes(value);
    });
  };
  var hasGimbal = isScenarioActive('Gimbal');
  if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
    for (var _i20 = 0; _i20 < 2; _i20++) {
      riggingAcc.push('D-Tap Splitter');
      riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
    }
    for (var _i21 = 0; _i21 < 2; _i21++) {
      riggingAcc.push('D-Tap Extension 50 cm (Spare)');
    }
  }
  var handleSelections = info.cameraHandle ? info.cameraHandle.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var viewfinderExtSelections = info.viewfinderExtension ? info.viewfinderExtension.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var monitoringSettings = [].concat(_toConsumableArray(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.frameGuides ? info.frameGuides.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.monitoringSettings ? info.monitoringSettings.split(',').map(function (s) {
    return s.trim();
  }) : [])).filter(Boolean);
  var selectedLensNames = info.lenses ? info.lenses.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var maxLensFront = selectedLensNames.reduce(function (max, name) {
    var lens = devices.lenses && devices.lenses[name];
    return Math.max(max, lens && lens.frontDiameterMm || 0);
  }, 0);
  var parsedFilters = parseFilterTokens(info.filter);
  var filterTypes = parsedFilters.map(function (f) {
    return f.type;
  });
  var needsSwingAway = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  });
  var filterEntries = buildFilterGearEntries(parsedFilters);
  var filterSelections = collectFilterAccessories(parsedFilters);
  if (filterEntries.length && filterSelections.length) {
    var filterNames = new Set(filterEntries.map(function (entry) {
      return normalizeGearNameForComparison(entry.gearName);
    }));
    filterSelections = filterSelections.filter(function (item) {
      return !filterNames.has(normalizeGearNameForComparison(item));
    });
  }
  var filterSelectHtml = buildFilterSelectHtml(parsedFilters, filterEntries);
  if (info.mattebox && !needsSwingAway) {
    var matteboxSelection = info.mattebox.toLowerCase();
    if (matteboxSelection.includes('clamp')) {
      var lensNames = info.lenses ? info.lenses.split(',').map(function (s) {
        return s.trim();
      }).filter(Boolean) : [];
      var diameters = _toConsumableArray(new Set(lensNames.map(function (n) {
        return devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm;
      }).filter(Boolean)));
      diameters.forEach(function (d) {
        return filterSelections.push("ARRI LMB 4x5 Clamp Adapter ".concat(d, "mm"));
      });
    }
  }
  viewfinderExtSelections.forEach(function (vf) {
    return supportAccNoCages.push(vf);
  });
  if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
    filterSelections.push('Schulz Sprayoff Micro');
    filterSelections.push('Fischer RS to D-Tap cable 0,5m');
    filterSelections.push('Fischer RS to D-Tap cable 0,5m');
    filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
  }
  var gimbalSelectionsFinal = [];
  var selectedGimbal = '';
  if (hasGimbal) {
    var gimbalSelections = info.gimbal ? info.gimbal.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean) : [];
    var bigLens = maxLensFront > 95;
    if (gimbalSelections.length) {
      gimbalSelectionsFinal = gimbalSelections.map(function (g) {
        return /Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g;
      });
      if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
    } else {
      var _cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
      var weight = _cam && _cam.weight_g;
      var isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
      selectedGimbal = bigLens ? 'DJI Ronin 2' : isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2';
      gimbalSelectionsFinal = [selectedGimbal];
    }
    if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
      filterSelections.push('Tilta Mirage VND Kit');
      filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
      filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
      filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
    } else {
      filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
    }
  }
  var receiverLabels = [];
  handheldPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " handheld"));
  });
  largeMonitorPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " 15-21\""));
  });
  if (hasMotor) receiverLabels.push('Focus');
  var receiverCount = receiverLabels.length;
  if (selectedNames.video) {
    monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
    var rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      var receivers = receiverCount || 1;
      for (var _i22 = 0; _i22 < receivers; _i22++) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
      }
    }
  }
  var addMonitorCables = function addMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"));
  };
  handheldPrefs.forEach(function (p) {
    return addMonitorCables("".concat(p.role, " handheld"));
  });
  var addLargeMonitorCables = function addLargeMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"));
  };
  largeMonitorPrefs.forEach(function (p) {
    return addLargeMonitorCables("".concat(p.role, " 15-21\""));
  });
  if (hasMotor) {
    monitoringSupportAcc.push('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Ultraslim BNC Cable 0.3 m (Focus)', 'Ultraslim BNC Cable 0.3 m (Focus)');
  }
  var handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
  var addHandle = function addHandle() {
    if (!supportAccNoCages.includes(handleName)) {
      supportAccNoCages.push(handleName);
    }
  };
  if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
    addHandle();
  }
  if (handleSelections.includes('Hand Grips')) {
    addHandle();
  }
  if (handleSelections.includes('Handle Extension')) {
    supportAccNoCages.push('ARRI K2.0019797 HEX-3');
  }
  if (handleSelections.includes('L-Handle')) {
    supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
  }
  var projectInfo = _objectSpread({}, info);
  var crewRoleLabels = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.crewRoles) || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.crewRoles) || {};
  if (Array.isArray(info.people)) {
    var crewEntriesHtml = [];
    var crewEntriesText = [];
    info.people.filter(function (p) {
      return p.role && p.name;
    }).forEach(function (p) {
      var roleLabel = crewRoleLabels[p.role] || p.role || '';
      var safeRole = escapeHtml(roleLabel);
      var nameValue = typeof p.name === 'string' ? p.name.trim() : p.name ? String(p.name).trim() : '';
      if (!nameValue) {
        return;
      }
      var safeName = escapeHtml(nameValue);
      var detailLinks = [];
      var detailText = [];
      var phoneValue = typeof p.phone === 'string' ? p.phone.trim() : p.phone ? String(p.phone).trim() : '';
      if (phoneValue) {
        var phoneHref = formatPhoneHref(phoneValue);
        var safePhone = escapeHtml(phoneValue);
        detailText.push(phoneValue);
        if (phoneHref) {
          detailLinks.push("<a href=\"tel:".concat(phoneHref, "\" class=\"req-contact-link\">").concat(safePhone, "</a>"));
        } else {
          detailLinks.push(safePhone);
        }
      }
      var emailValue = typeof p.email === 'string' ? p.email.trim() : p.email ? String(p.email).trim() : '';
      if (emailValue) {
        var emailHref = formatEmailHref(emailValue);
        var safeEmail = escapeHtml(emailValue);
        detailText.push(emailValue);
        if (emailHref) {
          detailLinks.push("<a href=\"mailto:".concat(emailHref, "\" class=\"req-contact-link\">").concat(safeEmail, "</a>"));
        } else {
          detailLinks.push(safeEmail);
        }
      }
      var linkDetails = detailLinks.length ? " (".concat(detailLinks.join(', '), ")") : '';
      var plainDetails = detailText.length ? " (".concat(detailText.join(', '), ")") : '';
      crewEntriesHtml.push("<span class=\"crew-entry\">".concat(safeRole, ": ").concat(safeName).concat(linkDetails, "</span>"));
      crewEntriesText.push("".concat(roleLabel, ": ").concat(nameValue).concat(plainDetails));
    });
    if (crewEntriesHtml.length) {
      projectInfo.crew = {
        __html: crewEntriesHtml.join('<br>'),
        text: crewEntriesText.join('\n')
      };
    }
  }
  delete projectInfo.people;
  if (Array.isArray(info.prepDays)) {
    projectInfo.prepDays = info.prepDays.join('\n');
  }
  if (Array.isArray(info.shootingDays)) {
    projectInfo.shootingDays = info.shootingDays.join('\n');
  }
  if (monitoringSettings.length) {
    projectInfo.monitoringSupport = monitoringSettings.join(', ');
  }
  delete projectInfo.monitoringSettings;
  delete projectInfo.viewfinderSettings;
  delete projectInfo.frameGuides;
  delete projectInfo.aspectMaskOpacity;
  var projectTitleSource = getCurrentProjectName() || info.projectName || '';
  var projectTitle = escapeHtml(projectTitleSource);
  var projectLabels = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.projectFields) || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.projectFields) || {};
  var projectFormTexts = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.projectForm) || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.projectForm) || {};
  var excludedFields = new Set(['cameraHandle', 'viewfinderExtension', 'mattebox', 'videoDistribution', 'monitoringConfiguration', 'focusMonitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'sliderBowl', 'easyrig', 'lenses', 'viewfinderSettings', 'frameGuides', 'aspectMaskOpacity', 'filter', 'viewfinderEyeLeatherColor', 'directorMonitor', 'dopMonitor', 'gafferMonitor', 'directorMonitor15', 'comboMonitor15', 'dopMonitor15', 'proGaffColor1', 'proGaffWidth1', 'proGaffColor2', 'proGaffWidth2']);
  var infoEntries = Object.entries(projectInfo).filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      k = _ref8[0],
      v = _ref8[1];
    return v && k !== 'projectName' && !excludedFields.has(k);
  });
  var boxesHtml = infoEntries.length ? '<div class="requirements-grid">' + infoEntries.map(function (_ref9) {
    var _ref0 = _slicedToArray(_ref9, 2),
      k = _ref0[0],
      v = _ref0[1];
    var value = formatRequirementValue(v);
    var label = projectLabels[k] || k;
    var iconHtml = iconMarkup(projectFieldIcons[k], {
      className: 'req-icon',
      size: 'var(--req-icon-size)'
    });
    return "<div class=\"requirement-box\" data-field=\"".concat(k, "\">").concat(iconHtml, "<span class=\"req-label\">").concat(escapeHtml(label), "</span><span class=\"req-value\">").concat(value, "</span></div>");
  }).join('') + '</div>' : '';
  var requirementsHeading = projectFormTexts.heading || 'Project Requirements';
  var infoHtml = infoEntries.length ? "<h3>".concat(escapeHtml(requirementsHeading), "</h3>").concat(boxesHtml) : '';
  var formatItems = function formatItems(arr) {
    var counts = {};
    arr.filter(Boolean).map(addArriKNumber).forEach(function (item) {
      var match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : item.trim();
      var ctx = match && match[2] ? match[2].trim() : '';
      if (!counts[base]) {
        counts[base] = {
          total: 0,
          ctxCounts: {}
        };
      }
      counts[base].total++;
      counts[base].ctxCounts[ctx] = (counts[base].ctxCounts[ctx] || 0) + 1;
    });
    return Object.entries(counts).sort(function (_ref1, _ref10) {
      var _ref11 = _slicedToArray(_ref1, 1),
        a = _ref11[0];
      var _ref12 = _slicedToArray(_ref10, 1),
        b = _ref12[0];
      return a.localeCompare(b, undefined, {
        sensitivity: 'base'
      });
    }).map(function (_ref13) {
      var _gearItemTranslations;
      var _ref14 = _slicedToArray(_ref13, 2),
        base = _ref14[0],
        _ref14$ = _ref14[1],
        total = _ref14$.total,
        ctxCounts = _ref14$.ctxCounts;
      var ctxKeys = Object.keys(ctxCounts);
      var hasContext = ctxKeys.some(function (c) {
        return c;
      });
      var ctxParts = [];
      if (hasContext) {
        if (base === 'sand bag') {
          var realEntries = Object.entries(ctxCounts).filter(function (_ref15) {
            var _ref16 = _slicedToArray(_ref15, 1),
              c = _ref16[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref17, _ref18) {
            var _ref19 = _slicedToArray(_ref17, 1),
              a = _ref19[0];
            var _ref20 = _slicedToArray(_ref18, 1),
              b = _ref20[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var usedCount = realEntries.reduce(function (sum, _ref21) {
            var _ref22 = _slicedToArray(_ref21, 2),
              count = _ref22[1];
            return sum + count;
          }, 0);
          var spareCount = total - usedCount;
          ctxParts = realEntries.map(function (_ref23) {
            var _ref24 = _slicedToArray(_ref23, 2),
              c = _ref24[0],
              count = _ref24[1];
            return "".concat(count, "x ").concat(c);
          });
          if (spareCount > 0) ctxParts.push("".concat(spareCount, "x Spare"));
        } else if (base.startsWith('Bebob ')) {
          var _realEntries = Object.entries(ctxCounts).filter(function (_ref25) {
            var _ref26 = _slicedToArray(_ref25, 1),
              c = _ref26[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref27, _ref28) {
            var _ref29 = _slicedToArray(_ref27, 1),
              a = _ref29[0];
            var _ref30 = _slicedToArray(_ref28, 1),
              b = _ref30[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var _usedCount = _realEntries.reduce(function (sum, _ref31) {
            var _ref32 = _slicedToArray(_ref31, 2),
              count = _ref32[1];
            return sum + count;
          }, 0);
          var _spareCount = total - _usedCount;
          ctxParts = _realEntries.map(function (_ref33) {
            var _ref34 = _slicedToArray(_ref33, 2),
              c = _ref34[0],
              count = _ref34[1];
            return "".concat(count, "x ").concat(c);
          });
          if (_spareCount > 0) ctxParts.push("".concat(_spareCount, "x Spare"));
        } else {
          var _realEntries2 = Object.entries(ctxCounts).filter(function (_ref35) {
            var _ref36 = _slicedToArray(_ref35, 1),
              c = _ref36[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref37, _ref38) {
            var _ref39 = _slicedToArray(_ref37, 1),
              a = _ref39[0];
            var _ref40 = _slicedToArray(_ref38, 1),
              b = _ref40[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          ctxParts = _realEntries2.map(function (_ref41) {
            var _ref42 = _slicedToArray(_ref41, 2),
              c = _ref42[0],
              count = _ref42[1];
            return "".concat(count, "x ").concat(c);
          });
          var _spareCount2 = Object.entries(ctxCounts).filter(function (_ref43) {
            var _ref44 = _slicedToArray(_ref43, 1),
              c = _ref44[0];
            return c && c.toLowerCase() === 'spare';
          }).reduce(function (sum, _ref45) {
            var _ref46 = _slicedToArray(_ref45, 2),
              count = _ref46[1];
            return sum + count;
          }, 0);
          if (_spareCount2 > 0) {
            ctxParts.push("".concat(_spareCount2, "x Spare"));
          } else if (base === 'D-Tap Extension 50 cm') {
            var _usedCount2 = _realEntries2.reduce(function (sum, _ref47) {
              var _ref48 = _slicedToArray(_ref47, 2),
                count = _ref48[1];
              return sum + count;
            }, 0);
            var remaining = total - _usedCount2;
            if (remaining > 0) ctxParts.push("".concat(remaining, "x Spare"));
          }
        }
      }
      var ctxStr = ctxParts.length ? " (".concat(ctxParts.join(', '), ")") : '';
      var translatedBase = ((_gearItemTranslations = gearItemTranslations[currentLang]) === null || _gearItemTranslations === void 0 ? void 0 : _gearItemTranslations[base]) || base;
      var displayName = "".concat(translatedBase).concat(ctxStr);
      var dataName = "".concat(base).concat(ctxStr);
      return "<span class=\"gear-item\" data-gear-name=\"".concat(escapeHtml(dataName), "\">").concat(total, "x ").concat(escapeHtml(displayName), "</span>");
    }).join('<br>');
  };
  var ensureItems = function ensureItems(arr, categoryPath) {
    if (typeof registerDevice !== 'function') return;
    var entries = {};
    arr.filter(Boolean).forEach(function (item) {
      var match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : item.trim();
      entries[base] = entries[base] || {};
    });
    if (Object.keys(entries).length) {
      registerDevice(categoryPath, entries);
    }
  };
  var categoryGroups = [];
  var addRow = function addRow(cat, items) {
    categoryGroups.push("<tbody class=\"category-group\"><tr class=\"category-row\"><td>".concat(cat, "</td></tr><tr><td>").concat(items, "</td></tr></tbody>"));
  };
  addRow('Camera', formatItems([selectedNames.camera]));
  var cameraSupportText = formatItems(supportAccNoCages);
  var cageSelectHtml = '';
  if (compatibleCages.length) {
    var options = compatibleCages.map(function (c) {
      return "<option value=\"".concat(escapeHtml(c), "\"").concat(c === selectedNames.cage ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(c)), "</option>");
    }).join('');
    cageSelectHtml = "<span class=\"cage-select-wrapper\"><span>1x</span><select id=\"gearListCage\">".concat(options, "</select></span>");
  }
  addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
  var mediaItems = '';
  var cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
  if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
    var sizeMap = {
      'CFexpress Type A': '320GB',
      'CFast 2.0': '512GB',
      'CFexpress Type B': '512GB',
      'Codex Compact Drive': '1TB',
      'AXS Memory A-Series slot': '1TB',
      'SD': '128GB',
      'SD Card': '128GB',
      'SDXC': '128GB',
      'XQD Card': '120GB',
      'RED MINI-MAG': '512GB',
      'REDMAG 1.8" SSD': '512GB',
      'Blackmagic Media Module': '8TB',
      'DJI PROSSD': '1TB',
      'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
      'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
      'USB-C to external SSD/HDD': '1TB'
    };
    mediaItems = cam.recordingMedia.slice(0, 1).map(function (m) {
      var type = m && m.type ? m.type : '';
      if (!type) return '';
      var size = '';
      if (m.notes) {
        var match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
        if (match) size = match[1].toUpperCase();
      }
      if (!size) size = sizeMap[type] || '512GB';
      return "4x ".concat(escapeHtml(size), " ").concat(escapeHtml(type), "<br>2x ").concat(escapeHtml(type), " reader with USB-C");
    }).filter(Boolean).join('<br>');
  }
  addRow('Media', mediaItems);
  var lensDisplayNames = selectedLensNames.map(function (name) {
    var _ref49, _lens$minFocusMeters;
    var lens = devices.lenses && devices.lenses[name];
    var base = addArriKNumber(name);
    if (!lens) return base;
    var attrs = [];
    if (lens.weight_g) attrs.push("".concat(lens.weight_g, "g"));
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push("".concat(lens.frontDiameterMm, "mm clamp-on"));else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref49 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref49 !== void 0 ? _ref49 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (minFocus) attrs.push("".concat(minFocus, "m min focus"));
    return attrs.length ? "".concat(base, " (").concat(attrs.join(', '), ")") : base;
  });
  addRow('Lens', formatItems(lensDisplayNames));
  var parseRodTypes = function parseRodTypes(raw) {
    if (!raw && raw !== 0) return [];
    var values = Array.isArray(raw) ? raw : [raw];
    var rodSet = new Set();
    values.forEach(function (value) {
      var text = (value !== null && value !== void 0 ? value : '').toString().toLowerCase();
      if (!text) return;
      if (/\b15\s*mm\b/.test(text)) rodSet.add('15mm');
      if (/\b19\s*mm\b/.test(text)) rodSet.add('19mm');
    });
    var order = ['15mm', '19mm'];
    return order.filter(function (type) {
      return rodSet.has(type);
    });
  };
  var lensSupportItems = [];
  var requiredRodTypes = new Set();
  var addedRodPairs = new Set();
  selectedLensNames.forEach(function (name) {
    var lens = devices.lenses && devices.lenses[name];
    if (!lens) return;
    var normalizedRodTypes = parseRodTypes(lens.rodStandard);
    var rodType = normalizedRodTypes[0] || (lens.rodStandard ? lens.rodStandard : '15mm');
    var baseRodType = normalizedRodTypes[0] || (rodType === '19mm' ? '19mm' : '15mm');
    var rodLength = lens.rodLengthCm || (baseRodType === '19mm' ? 45 : 30);
    var rodKey = "".concat(baseRodType, "-").concat(rodLength);
    if (!addedRodPairs.has(rodKey)) {
      lensSupportItems.push("".concat(baseRodType, " rods ").concat(rodLength, "cm"));
      addedRodPairs.add(rodKey);
    }
    var typesForRequirement = normalizedRodTypes.length ? normalizedRodTypes : [baseRodType];
    typesForRequirement.forEach(function (rt) {
      return requiredRodTypes.add(rt);
    });
    if (lens.needsLensSupport) {
      lensSupportItems.push("".concat(baseRodType, " lens support"));
    }
  });
  var cageRod = (_devices$accessories3 = devices.accessories) === null || _devices$accessories3 === void 0 || (_devices$accessories3 = _devices$accessories3.cages) === null || _devices$accessories3 === void 0 || (_devices$accessories3 = _devices$accessories3[selectedNames.cage]) === null || _devices$accessories3 === void 0 ? void 0 : _devices$accessories3.rodStandard;
  var cageRodTypes = parseRodTypes(cageRod);
  var hasCageRodInfo = Array.isArray(cageRod) ? cageRod.length > 0 : Boolean(cageRod);
  requiredRodTypes.forEach(function (rt) {
    if (hasCageRodInfo && !cageRodTypes.includes(rt)) {
      lensSupportItems.push("".concat(glyphText(ICON_GLYPHS.warning), "\xA0cage incompatible with ").concat(rt, " rods"));
    }
  });
  addRow('Lens Support', formatItems(lensSupportItems));
  addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
  var motorItems = [];
  var clmSpareAdded = {
    clm3: false,
    clm4: false,
    clm5: false
  };
  selectedNames.motors.forEach(function (name) {
    var lower = name.toLowerCase();
    if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
      motorItems.push('ARRI KK.0040345 CFORCE MINI RF Basic Set 2');
    } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
      motorItems.push('ARRI KK.0040344 Cforce Mini Basic Set 2');
    } else if (/cforce\s*plus/.test(lower)) {
      motorItems.push('Arri KK.0008824 cforce plus Basic Set');
      motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
    } else if (/clm-3/.test(lower)) {
      motorItems.push('Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set');
      if (!clmSpareAdded.clm3) {
        motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
        clmSpareAdded.clm3 = true;
      }
    } else if (/clm-4/.test(lower)) {
      motorItems.push('ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)');
      if (!clmSpareAdded.clm4) {
        motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
        clmSpareAdded.clm4 = true;
      }
    } else if (/clm-5/.test(lower)) {
      motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set');
      if (!clmSpareAdded.clm5) {
        motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
        clmSpareAdded.clm5 = true;
      }
    } else {
      motorItems.push(name);
    }
  });
  var distanceItems = [];
  var distanceName = selectedNames.distance;
  if (distanceName) {
    var lowerName = distanceName.toLowerCase();
    if (lowerName === 'udm-1 + lcube') {
      distanceItems.push('Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
      var hasRiaController = selectedNames.controllers.some(function (ctrl) {
        return /ria-1/i.test(ctrl);
      });
      var isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
      if (!hasRiaController && !isAlexa35) {
        distanceItems.push('Arri KK.0009001 LCUBE CUB-1 Basic Set');
      }
    } else {
      distanceItems.push(distanceName);
    }
  }
  addRow('LDS (FIZ)', formatItems([].concat(motorItems, _toConsumableArray(selectedNames.controllers), distanceItems, _toConsumableArray(fizCableAcc))));
  var batteryItems = '';
  if (selectedNames.battery) {
    var count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
    if (!count || isNaN(count)) count = 1;
    var safeBatt = escapeHtml(addArriKNumber(selectedNames.battery));
    batteryItems = "".concat(count, "x ").concat(safeBatt);
    var swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
    if (swapName) {
      batteryItems += "<br>1x ".concat(escapeHtml(swapName));
    }
  }
  addRow('Camera Batteries', batteryItems);
  var monitoringItems = '';
  var monitorSizes = [];
  if (selectedNames.viewfinder) {
    monitoringItems += "1x <strong>Viewfinder</strong> - ".concat(escapeHtml(addArriKNumber(selectedNames.viewfinder)));
  }
  if (selectedNames.monitor) {
    var _devices2;
    var size = (_devices2 = devices) === null || _devices2 === void 0 || (_devices2 = _devices2.monitors) === null || _devices2 === void 0 || (_devices2 = _devices2[selectedNames.monitor]) === null || _devices2 === void 0 ? void 0 : _devices2.screenSizeInches;
    if (size) monitorSizes.push(size);
    var sizeHtml = size ? "".concat(size, "&quot; - ") : '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>Onboard Monitor</strong> - ".concat(sizeHtml).concat(escapeHtml(addArriKNumber(selectedNames.monitor)), " - incl. Sunhood");
  }
  handheldPrefs.forEach(function (_ref50) {
    var role = _ref50.role,
      size = _ref50.size;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor' : "".concat(role.toLowerCase(), "Monitor");
    var defaultName = info[infoKey] && names.includes(info[infoKey]) ? info[infoKey] : names.includes('SmallHD Ultra 7') ? 'SmallHD Ultra 7' : names[0];
    if (!info[infoKey] && size) {
      var sized = names.find(function (n) {
        return monitorsDb[n].screenSizeInches === size;
      });
      if (size === 7 && names.includes('SmallHD Ultra 7')) {
        defaultName = 'SmallHD Ultra 7';
      } else if (sized) {
        defaultName = sized;
      }
    }
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var labelRole = role.replace(/s$/, '');
    var selectedSize = devices && devices.monitors && devices.monitors[defaultName] ? devices.monitors[defaultName].screenSizeInches : '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>".concat(labelRole, " Handheld Monitor</strong> - <span id=\"monitorSize").concat(idSuffix, "\">").concat(selectedSize, "&quot;</span> - <select id=\"gearList").concat(idSuffix, "Monitor\">").concat(opts, "</select> incl. Directors cage, shoulder strap, sunhood, rigging for teradeks");
    monitorSizes.push(selectedSize);
  });
  largeMonitorPrefs.forEach(function (_ref51) {
    var _dirDb$defaultName;
    var role = _ref51.role;
    var dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
    var names = Object.keys(dirDb).filter(function (n) {
      return n !== 'None';
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
    var defaultName = info[infoKey] && names.includes(info[infoKey]) ? info[infoKey] : 'SmallHD Cine 24" 4K High-Bright Monitor';
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var size = ((_dirDb$defaultName = dirDb[defaultName]) === null || _dirDb$defaultName === void 0 ? void 0 : _dirDb$defaultName.screenSizeInches) || '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>".concat(role, " Monitor</strong> - <span id=\"monitorSize").concat(idSuffix, "15\">").concat(size, "&quot;</span> - <select id=\"gearList").concat(idSuffix, "Monitor15\">").concat(opts, "</select> incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)");
    if (size) monitorSizes.push(size);
  });
  if (hasMotor) {
    var _monitorsDb$defaultNa;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var defaultName = info.focusMonitor && names.includes(info.focusMonitor) ? info.focusMonitor : names.includes('TV Logic F7HS') ? 'TV Logic F7HS' : names[0];
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var selectedSize = ((_monitorsDb$defaultNa = monitorsDb[defaultName]) === null || _monitorsDb$defaultNa === void 0 ? void 0 : _monitorsDb$defaultNa.screenSizeInches) || '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>Focus Monitor</strong> - <span id=\"monitorSizeFocus\">".concat(selectedSize, "&quot;</span> - <select id=\"gearListFocusMonitor\">").concat(opts, "</select> incl Directors cage, shoulder strap, sunhood, rigging for teradeks");
    if (selectedSize) monitorSizes.push(selectedSize);
  }
  var monitoringGear = [];
  var wirelessSize = monitorSizes.includes(5) ? 5 : null;
  var wirelessSizeHtml = wirelessSize ? "".concat(wirelessSize, "&quot; - ") : '';
  if (selectedNames.video) {
    monitoringGear.push("Wireless Transmitter - ".concat(wirelessSizeHtml).concat(addArriKNumber(selectedNames.video)));
    var _rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[_rxName]) {
      receiverLabels.forEach(function (label) {
        monitoringGear.push("Wireless Receiver - ".concat(wirelessSizeHtml).concat(addArriKNumber(_rxName), " (").concat(label, ")"));
      });
    }
  }
  if (monitoringGear.length) {
    var gearHtml = formatItems(monitoringGear).replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>').replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>').replace(/&amp;quot;/g, '&quot;');
    monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
  }
  var monitoringBatteryItems = [];
  var bebob98 = Object.keys(devices.batteries || {}).find(function (n) {
    return /V98micro/i.test(n);
  }) || 'Bebob V98micro';
  handheldPrefs.forEach(function (p) {
    for (var _i23 = 0; _i23 < 3; _i23++) monitoringBatteryItems.push("".concat(bebob98, " (").concat(p.role, " handheld)"));
  });
  if (hasMotor) {
    var bebob150 = Object.keys(devices.batteries || {}).find(function (n) {
      return /V150micro/i.test(n);
    }) || 'Bebob V150micro';
    for (var _i24 = 0; _i24 < 3; _i24++) monitoringBatteryItems.push("".concat(bebob150, " (Focus)"));
  }
  var bebob290 = Object.keys(devices.batteries || {}).find(function (n) {
    return /V290RM-Cine/i.test(n);
  }) || 'Bebob V290RM-Cine';
  largeMonitorPrefs.forEach(function (p) {
    monitoringBatteryItems.push("".concat(bebob290, " (").concat(p.role, " 15-21\")"), "".concat(bebob290, " (").concat(p.role, " 15-21\")"));
  });
  addRow('Monitoring Batteries', formatItems(monitoringBatteryItems));
  addRow('Chargers', formatItems(chargersAcc));
  addRow('Monitoring', monitoringItems);
  ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
  var monitoringSupportHardware = formatItems(monitoringSupportAcc);
  var monitoringSupportItems = monitoringSupportHardware;
  addRow('Monitoring support', monitoringSupportItems);
  var cartsTransportationItems = ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung'].concat(_toConsumableArray(Array(10).fill('Securing Straps (25mm wide)')), ['Loading Ramp (pair, 420kg)'], _toConsumableArray(Array(20).fill('Ring Fitting for Airline Rails')));
  ensureItems(cartsTransportationItems, 'accessories.carts');
  var gripItems = [];
  var needsStandardTripod = false;
  var sliderSelectHtml = '';
  var easyrigSelectHtml = '';
  handheldPrefs.forEach(function (p) {
    gripItems.push("Avenger C-Stand Sliding Leg 20\" (".concat(p.role, " handheld)"));
    gripItems.push("Steelfingers Wheel C-Stand 3er Set (".concat(p.role, " handheld)"));
    gripItems.push("Lite-Tite Swivel Aluminium Umbrella Adapter (".concat(p.role, " handheld)"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " handheld)"));
  });
  largeMonitorPrefs.forEach(function (p) {
    gripItems.push("Matthews Monitor Stand II (249562) (".concat(p.role, " 15-21\")"));
    gripItems.push("Avenger C590 Conka Bonka Stativ-Verl\xE4ngerungen Set (".concat(p.role, " 15-21\")"));
    gripItems.push("Impact Baby to Junior Receiver Adapter (".concat(p.role, " 15-21\")"));
    gripItems.push("Matthews BIG F'ING Monitor Wheel Set (3 pieces) (".concat(p.role, " 15-21\")"));
    riggingAcc.push("ULCS Bracket with 1/4\" to 1/4\" (".concat(p.role, " 15-21\")"));
    gripItems.push("Manfrotto 635 Quick-Action Super Clamp (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Cine Quick Release (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
  });
  if (hasMotor) {
    gripItems.push('Avenger C-Stand Sliding Leg 20" (Focus)');
    gripItems.push('Steelfingers Wheel C-Stand 3er Set (Focus)');
    gripItems.push('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)');
  }
  if (isScenarioActive('Easyrig')) {
    var stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
    var _opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
    var _options = ['no further stabilisation'].concat(_toConsumableArray(_opts));
    var optsHtml = _options.map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    easyrigSelectHtml = "1x Easyrig 5 Vario <select id=\"gearListEasyrig\">".concat(optsHtml, "</select>");
  }
  if (hasGimbal) {
    gripItems.push.apply(gripItems, _toConsumableArray(gimbalSelectionsFinal));
  }
  var frictionArmCount = hasGimbal ? 2 : 1;
  gripItems.push.apply(gripItems, _toConsumableArray(Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm')));
  if (hasGimbal) {
    gripItems.push('Avenger D200B Grip Head');
    gripItems.push('Spigot with male 3/8" and 1/4"');
  }
  if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
  if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
  if (isScenarioActive('Jib')) {
    gripItems.push('Pro Sup EJIb-Arm');
    gripItems.push('Jib counter weights');
    needsStandardTripod = true;
  }
  if (isScenarioActive('Slider')) {
    var _options2 = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\"").concat(o === info.sliderBowl ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    sliderSelectHtml = "1x Prosup Tango Roller <select id=\"gearListSliderBowl\">".concat(_options2, "</select>");
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Paganini set');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
  }
  if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
    gripItems.push('Tango Beam');
  }
  if (isScenarioActive('Outdoor')) {
    riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
  }
  if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
    gripItems.push('Large Umbrella');
    gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
  }
  var tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var bowlType = info.tripodBowl;
  var spreader = info.tripodSpreader;
  var headBrand = info.tripodHeadBrand;
  var headMap = {
    'OConnor': {
      '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
      '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
      'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
    },
    'Sachtler': {
      '75mm bowl': 'Sachtler aktiv8T S2068T',
      '100mm bowl': 'Sachtler aktiv18T S2088T',
      '150mm bowl': 'Sachtler Cine 30 3007'
    }
  };
  var headName = headMap[headBrand] && headMap[headBrand][bowlType];
  if (headName) {
    gripItems.push("".concat(headName, " ").concat(bowlType));
  }
  tripodTypes.forEach(function (t) {
    var base = bowlType ? "".concat(bowlType, " ").concat(t) : t;
    if (t === 'Hi-Head') {
      gripItems.push(base);
    } else if (spreader) {
      gripItems.push("".concat(base, " + ").concat(spreader));
    } else {
      gripItems.push(base);
    }
    if (t === 'Frog Tripod') {
      gripItems.push('Sand bag (Frog Tripod)');
    }
    if (t === 'Hi-Head') {
      gripItems.push('Sand bag (Hi-Head)');
    }
  });
  if (needsStandardTripod && !gripItems.some(function (item) {
    return /Standard Tripod/.test(item);
  })) {
    gripItems.push('Standard Tripod');
  }
  var standCount = gripItems.filter(function (item) {
    return /\bstand\b/i.test(item) && !/wheel/i.test(item);
  }).length;
  if (standCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(standCount * 3).fill('Tennis ball')));
  }
  var maglinerCount = cartsTransportationItems.filter(function (item) {
    return /Magliner/i.test(item);
  }).length;
  if (maglinerCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(maglinerCount * 2).fill('Wooden wedge')));
  }
  ensureItems(riggingAcc, 'accessories.rigging');
  ensureItems(gripItems, 'accessories.grip');
  var riggingItems = formatItems(riggingAcc);
  addRow('Rigging', riggingItems);
  var powerItems = ['Power Cable Drum 25-50 m'].concat(_toConsumableArray(Array(2).fill('Power Cable 10 m')), _toConsumableArray(Array(2).fill('Power Cable 5 m')), _toConsumableArray(Array(3).fill('Power Strip')), _toConsumableArray(Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)')), _toConsumableArray(Array(3).fill('Power Three Way Splitter')));
  if (isScenarioActive('Studio')) {
    powerItems.push('Camera Power Supply');
  }
  ensureItems(powerItems, 'accessories.power');
  addRow('Power', formatItems(powerItems));
  addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
  addRow('Carts and Transportation', formatItems(cartsTransportationItems));
  var miscExcluded = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable', 'BNC SDI Cable', 'Ultraslim BNC Cable 0.5 m']);
  var miscItems = _toConsumableArray(miscAcc).filter(function (item) {
    return !miscExcluded.has(item);
  });
  var consumables = [];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  var eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
  var gaffTapeSelections = [{
    id: 1,
    color: info.proGaffColor1 || 'red',
    width: info.proGaffWidth1 || '24mm'
  }, {
    id: 2,
    color: info.proGaffColor2 || 'blue',
    width: info.proGaffWidth2 || '24mm'
  }];
  var baseConsumables = [{
    name: 'Kimtech Wipes',
    count: 1
  }, {
    name: 'Sprigs Red 1/4"',
    count: 1,
    noScale: true
  }, {
    name: 'Clapper Stick',
    count: 2,
    klappen: true
  }];
  var eyeLeatherCount = hasViewfinder ? 2 : 0;
  var shootDays = 0;
  var isWinterShoot = false;
  var shootRanges = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? [info.shootingDays] : [];
  var winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
  shootRanges.forEach(function (r) {
    var parts = r.split(' to ');
    if (parts.length === 2) {
      var start = new Date(parts[0]);
      var end = new Date(parts[1]);
      if (!isNaN(start) && !isNaN(end)) {
        shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        if (!isWinterShoot) {
          var m = new Date(start);
          m.setHours(0, 0, 0, 0);
          while (m <= end) {
            if (winterMonths.has(m.getMonth())) {
              isWinterShoot = true;
              break;
            }
            m.setMonth(m.getMonth() + 1);
          }
        }
      }
    }
  });
  var multiplier = 1;
  if (shootDays > 21) {
    multiplier = 4;
  } else if (shootDays > 14) {
    multiplier = 3;
  } else if (shootDays > 7) {
    multiplier = 2;
  }
  var klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
  for (var _i25 = 0, _baseConsumables = baseConsumables; _i25 < _baseConsumables.length; _i25++) {
    var item = _baseConsumables[_i25];
    var _count2 = item.count;
    if (item.noScale) {} else if (item.klappen) {
      _count2 *= klappenMultiplier;
    } else {
      _count2 *= multiplier;
    }
    for (var _i26 = 0; _i26 < _count2; _i26++) consumables.push(item.name);
  }
  if (eyeLeatherCount) eyeLeatherCount *= multiplier;
  var needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
  if (needsRainProtection && selectedNames.camera) {
    miscItems.push("Rain Cover ".concat(addArriKNumber(selectedNames.camera)));
  }
  var needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
  if (needsUmbrellas) {
    if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
    if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
  }
  if (needsRainProtection) {
    var _monitorSizes = [];
    if (monitorSelect && monitorSelect.value) {
      var m = devices.monitors[monitorSelect.value];
      if (m && m.screenSizeInches) _monitorSizes.push(m.screenSizeInches);
    }
    var monitorsAbove10 = _monitorSizes.filter(function (s) {
      return s > 10;
    }).length;
    var monitorsUnder10 = _monitorSizes.filter(function (s) {
      return s <= 10;
    }).length;
    for (var _i27 = 0; _i27 < monitorsAbove10 + 2; _i27++) consumables.push('CapIt Large');
    for (var _i28 = 0; _i28 < monitorsUnder10 + 3; _i28++) consumables.push('CapIt Medium');
    for (var _i29 = 0; _i29 < 3; _i29++) consumables.push('CapIt Small');
    for (var _i30 = 0; _i30 < 10; _i30++) consumables.push('Shower Cap');
    consumables.push('Magliner Rain Cover Transparent');
  }
  var needsHairDryer = isWinterShoot && isScenarioActive('Outdoor') || isScenarioActive('Extreme cold (snow)');
  var needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
  if (needsHairDryer) {
    miscItems.push('Hair Dryer');
    if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
      miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
    } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
      miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
    }
  }
  if (needsHandAndFeetWarmers) {
    var warmersCount = Math.max(shootDays, 1) * 2;
    for (var _i31 = 0; _i31 < warmersCount; _i31++) miscItems.push('Hand Warmers');
    for (var _i32 = 0; _i32 < warmersCount; _i32++) miscItems.push('Feet Warmers');
  }
  var gaffColors = [['red', 'Red'], ['blue', 'Blue'], ['green', 'Green'], ['yellow', 'Yellow'], ['black', 'Black'], ['pink', 'Pink'], ['orange', 'Orange'], ['violette', 'Violette'], ['white', 'White']];
  var gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
  var proGaffCount = multiplier;
  var proGaffHtml = gaffTapeSelections.map(function (_ref52) {
    var id = _ref52.id,
      color = _ref52.color,
      width = _ref52.width;
    var colorOpts = gaffColors.map(function (_ref53) {
      var _ref54 = _slicedToArray(_ref53, 2),
        val = _ref54[0],
        label = _ref54[1];
      return "<option value=\"".concat(val, "\"").concat(val === color ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    var widthOpts = gaffWidths.map(function (val) {
      return "<option value=\"".concat(val, "\"").concat(val === width ? ' selected' : '', ">").concat(val, "</option>");
    }).join('');
    return "<span class=\"gear-item\" data-gear-name=\"Pro Gaff Tape\">".concat(proGaffCount, "x Pro Gaff Tape <select id=\"gearListProGaffColor").concat(id, "\">").concat(colorOpts, "</select> <select id=\"gearListProGaffWidth").concat(id, "\">").concat(widthOpts, "</select></span>");
  }).join('<br>');
  var eyeLeatherHtml = '';
  if (eyeLeatherCount) {
    var colors = [['red', 'Red'], ['blue', 'Blue'], ['natural', 'Natural'], ['green', 'Green'], ['purple', 'Purple'], ['orange', 'Orange'], ['gray', 'Gray'], ['yellow', 'Yellow'], ['jaguar', 'Jaguar'], ['killer bee', 'Killer Bee'], ['green rabbit', 'Green Rabbit'], ['black', 'Black']];
    var _options3 = colors.map(function (_ref55) {
      var _ref56 = _slicedToArray(_ref55, 2),
        val = _ref56[0],
        label = _ref56[1];
      return "<option value=\"".concat(val, "\"").concat(val === eyeLeatherColor ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    eyeLeatherHtml = "<span class=\"gear-item\" data-gear-name=\"Bluestar eye leather made of microfiber oval, large\">".concat(eyeLeatherCount, "x Bluestar eye leather made of microfiber oval, large <select id=\"gearListEyeLeatherColor\">").concat(_options3, "</select></span>");
  }
  addRow('Miscellaneous', formatItems(miscItems));
  addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
  var body = "<h2>".concat(projectTitle, "</h2>");
  if (infoHtml) body += infoHtml;
  var tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
  var infoForRules = _objectSpread(_objectSpread({}, info), {}, {
    cameraSelection: selectedNames.camera,
    monitorSelection: selectedNames.monitor,
    wirelessSelection: selectedNames.video,
    motorSelections: selectedNames.motors.slice(),
    controllerSelections: selectedNames.controllers.slice(),
    distanceSelection: selectedNames.distance
  });
  var adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, infoForRules);
  body += '<h3>Gear List</h3>' + adjustedTable;
  return body;
}
function getCurrentGearListHtml() {
  if (!gearListOutput && !projectRequirementsOutput) return '';
  var projHtml = '';
  if (projectRequirementsOutput) {
    var projClone = projectRequirementsOutput.cloneNode(true);
    var editBtn = projClone.querySelector('#editProjectBtn');
    if (editBtn) editBtn.remove();
    var t = projClone.querySelector('h2');
    if (t) t.remove();
    projHtml = projClone.innerHTML.trim();
  }
  var gearHtml = '';
  if (gearListOutput) {
    var clone = gearListOutput.cloneNode(true);
    var actions = clone.querySelector('#gearListActions');
    if (actions) actions.remove();
    var _editBtn = clone.querySelector('#editProjectBtn');
    if (_editBtn) _editBtn.remove();
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    ['Director', 'Combo', 'Dop'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor15"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    var cageSel = clone.querySelector('#gearListCage');
    if (cageSel) {
      var originalSel = gearListOutput.querySelector('#gearListCage');
      var val = originalSel ? originalSel.value : cageSel.value;
      Array.from(cageSel.options).forEach(function (opt) {
        if (opt.value === val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var easyrigSel = clone.querySelector('#gearListEasyrig');
    if (easyrigSel) {
      var _originalSel = gearListOutput.querySelector('#gearListEasyrig');
      var _val = _originalSel ? _originalSel.value : easyrigSel.value;
      Array.from(easyrigSel.options).forEach(function (opt) {
        if (opt.value === _val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var sliderSel = clone.querySelector('#gearListSliderBowl');
    if (sliderSel) {
      var _originalSel2 = gearListOutput.querySelector('#gearListSliderBowl');
      var _val2 = _originalSel2 ? _originalSel2.value : sliderSel.value;
      Array.from(sliderSel.options).forEach(function (opt) {
        if (opt.value === _val2) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var eyeSel = clone.querySelector('#gearListEyeLeatherColor');
    if (eyeSel) {
      var _originalSel3 = gearListOutput.querySelector('#gearListEyeLeatherColor');
      var _val3 = _originalSel3 ? _originalSel3.value : eyeSel.value;
      Array.from(eyeSel.options).forEach(function (opt) {
        if (opt.value === _val3) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    [1, 2].forEach(function (i) {
      var colorSel = clone.querySelector("#gearListProGaffColor".concat(i));
      if (colorSel) {
        var _originalSel4 = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
        var _val4 = _originalSel4 ? _originalSel4.value : colorSel.value;
        Array.from(colorSel.options).forEach(function (opt) {
          if (opt.value === _val4) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
      var widthSel = clone.querySelector("#gearListProGaffWidth".concat(i));
      if (widthSel) {
        var _originalSel5 = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
        var _val5 = _originalSel5 ? _originalSel5.value : widthSel.value;
        Array.from(widthSel.options).forEach(function (opt) {
          if (opt.value === _val5) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    clone.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      if (cb.checked) {
        cb.setAttribute('checked', '');
      } else {
        cb.removeAttribute('checked');
      }
    });
    var table = clone.querySelector('.gear-table');
    gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
  }
  if (!projHtml && !gearHtml) return '';
  var projectName = getCurrentProjectName();
  var titleHtml = projectName ? "<h2>".concat(projectName, "</h2>") : '';
  return "".concat(titleHtml).concat(projHtml).concat(gearHtml).trim();
}
function getGearListSelectors() {
  if (!gearListOutput) return {};
  var selectors = {};
  gearListOutput.querySelectorAll('select[id]').forEach(function (sel) {
    selectors[sel.id] = sel.multiple ? Array.from(sel.selectedOptions).map(function (o) {
      return o.value;
    }) : sel.value;
  });
  return selectors;
}
function applyGearListSelectors(selectors) {
  if (!gearListOutput || !selectors) return;
  Object.entries(selectors).forEach(function (_ref57) {
    var _ref58 = _slicedToArray(_ref57, 2),
      id = _ref58[0],
      value = _ref58[1];
    var sel = gearListOutput.querySelector("#".concat(id));
    if (sel) {
      if (sel.multiple) {
        var vals = Array.isArray(value) ? value : [value];
        Array.from(sel.options).forEach(function (opt) {
          opt.selected = vals.includes(opt.value);
        });
        sel.dispatchEvent(new Event('change'));
      } else {
        sel.value = value;
        sel.dispatchEvent(new Event('change'));
      }
    }
  });
}
function saveCurrentGearList() {
  if (factoryResetInProgress) return;
  var html = getCurrentGearListHtml();
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
  var projectStorageKey = getCurrentProjectStorageKey({
    allowTyped: true
  });
  var storageKey = getCurrentProjectStorageKey();
  var projectRules = getProjectScopedAutoGearRules();
  if (typeof saveProject === 'function' && typeof projectStorageKey === 'string') {
    var payload = {
      projectInfo: currentProjectInfo,
      gearList: html
    };
    if (projectRules && projectRules.length) {
      payload.autoGearRules = projectRules;
    }
    saveProject(projectStorageKey, payload);
  }
  if (!storageKey) return;
  var setups = getSetups();
  var existing = setups[storageKey];
  if (!existing && !html && !currentProjectInfo && !(projectRules && projectRules.length)) {
    return;
  }
  var setup = existing || {};
  var changed = false;
  if (html) {
    if (setup.gearList !== html) {
      setup.gearList = html;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
    delete setup.gearList;
    changed = true;
  }
  if (currentProjectInfo) {
    if (setup.projectInfo !== currentProjectInfo) {
      setup.projectInfo = currentProjectInfo;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
    delete setup.projectInfo;
    changed = true;
  }
  var existingRules = setup.autoGearRules;
  var existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
  var newRulesSig = projectRules && projectRules.length ? stableStringify(projectRules) : '';
  if (newRulesSig) {
    if (existingRulesSig !== newRulesSig) {
      setup.autoGearRules = projectRules;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
    delete setup.autoGearRules;
    changed = true;
  }
  if (!existing) {
    setups[storageKey] = setup;
    storeSetups(setups);
  } else if (changed) {
    setups[storageKey] = setup;
    storeSetups(setups);
  }
}
function deleteCurrentGearList() {
  if (!confirm(texts[currentLang].confirmDeleteGearList)) return false;
  if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return false;
  var backupName = ensureAutoBackupBeforeDeletion('delete gear list');
  if (!backupName) return false;
  var storageKey = getCurrentProjectStorageKey();
  if (typeof deleteProject === 'function') {
    deleteProject(storageKey);
  } else if (typeof saveProject === 'function') {
    saveProject(storageKey, {
      projectInfo: null,
      gearList: ''
    });
  }
  var setups = getSetups();
  if (setups && _typeof(setups) === 'object') {
    var existingSetup = setups[storageKey];
    if (existingSetup && _typeof(existingSetup) === 'object') {
      var changed = false;
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
        delete existingSetup.gearList;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'projectInfo')) {
        delete existingSetup.projectInfo;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'autoGearRules')) {
        delete existingSetup.autoGearRules;
        changed = true;
      }
      if (changed) {
        storeSetups(setups);
      }
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
  if (projectForm) populateProjectForm({});
  storeSession({
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
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    projectInfo: null
  });
  if (typeof autoSaveCurrentSetup === 'function') {
    autoSaveCurrentSetup();
    if (storageKey) {
      var setupsAfterSave = getSetups();
      var savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
      if (savedSetup && _typeof(savedSetup) === 'object') {
        var resaved = false;
        if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
          delete savedSetup.gearList;
          resaved = true;
        }
        if (Object.prototype.hasOwnProperty.call(savedSetup, 'projectInfo')) {
          delete savedSetup.projectInfo;
          resaved = true;
        }
        if (resaved) {
          storeSetups(setupsAfterSave);
        }
      }
    }
  }
  currentProjectInfo = null;
  updateGearListButtonVisibility();
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    var eventDetail = {
      projectName: storageKey,
      backupName: backupName,
      source: 'deleteCurrentGearList'
    };
    try {
      document.dispatchEvent(new CustomEvent('gearlist:deleted', {
        detail: eventDetail
      }));
    } catch (error) {
      if (typeof document.createEvent === 'function') {
        var fallbackEvent = document.createEvent('CustomEvent');
        fallbackEvent.initCustomEvent('gearlist:deleted', false, false, eventDetail);
        document.dispatchEvent(fallbackEvent);
      } else {
        console.warn('Unable to dispatch gearlist:deleted event', error);
      }
    }
  }
  return true;
}
function ensureGearListActions() {
  if (!gearListOutput) return;
  var actions = document.getElementById('gearListActions');
  if (!actions) {
    actions = document.createElement('div');
    actions.id = 'gearListActions';
    gearListOutput.appendChild(actions);
  }
  var existingDeleteBtn = actions.querySelector('#deleteGearListBtn');
  if (existingDeleteBtn) {
    existingDeleteBtn.removeEventListener('click', deleteCurrentGearList);
    existingDeleteBtn.remove();
  }
  var autoSaveNote = document.getElementById('gearListAutosaveNote');
  if (!autoSaveNote) {
    autoSaveNote = document.createElement('p');
    autoSaveNote.id = 'gearListAutosaveNote';
    autoSaveNote.className = 'gear-list-autosave-note';
    actions.appendChild(autoSaveNote);
  } else if (!actions.contains(autoSaveNote)) {
    actions.appendChild(autoSaveNote);
  }
  var noteText = texts[currentLang] && texts[currentLang].gearListAutosaveNote || '';
  var trimmedNoteText = typeof noteText === 'string' ? noteText.trim() : '';
  var hasNoteText = trimmedNoteText.length > 0;
  if (hasNoteText) {
    autoSaveNote.hidden = false;
    autoSaveNote.removeAttribute('hidden');
    autoSaveNote.textContent = trimmedNoteText;
    autoSaveNote.setAttribute('title', trimmedNoteText);
    autoSaveNote.setAttribute('data-help', trimmedNoteText);
  } else {
    autoSaveNote.textContent = '';
    autoSaveNote.setAttribute('title', '');
    autoSaveNote.setAttribute('data-help', '');
    autoSaveNote.hidden = true;
  }
  if (!gearListOutput._filterListenerBound) {
    gearListOutput.addEventListener('change', function (e) {
      var target = e.target;
      if (target && target.matches('select')) {
        adjustGearListSelectWidth(target);
      }
      var shouldSync = false;
      if (target.matches('.filter-values-container input[type="checkbox"]')) {
        var container = target.closest('.filter-values-container');
        var storageId = container && container.getAttribute('data-storage-values');
        var sel = container && container.querySelector('select');
        if (target.checked) {
          target.setAttribute('checked', '');
        } else {
          target.removeAttribute('checked');
        }
        if (storageId) {
          syncGearListFilterValue(storageId, target.value, target.checked);
        } else if (sel) {
          var opt = Array.from(sel.options).find(function (opt) {
            return opt.value === target.value;
          });
          if (opt) opt.selected = target.checked;
          sel.dispatchEvent(new Event('change'));
        }
        shouldSync = true;
      } else if (target.matches('select[data-storage-id]')) {
        var _storageId = target.getAttribute('data-storage-id');
        if (_storageId) {
          syncGearListFilterSize(_storageId, target.value);
        }
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-size-')) {
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-values-')) {
        shouldSync = true;
      } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
        shouldSync = true;
      }
      if (shouldSync) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._filterListenerBound = true;
  }
  if (!gearListOutput._inputListenerBound) {
    gearListOutput.addEventListener('input', function (e) {
      var target = e.target;
      if (!target) return;
      if (target.closest('#gearListActions')) return;
      if (target.matches('input, textarea')) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._inputListenerBound = true;
  }
}
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  var handlerKey = '__cameraPowerPlannerGearDeleteHandler';
  if (!document[handlerKey]) {
    var handleGearDeleteRequest = function handleGearDeleteRequest() {
      try {
        deleteCurrentGearList();
      } catch (error) {
        console.warn('Failed to handle gear list deletion request', error);
      }
    };
    document.addEventListener('gearlist:delete-requested', handleGearDeleteRequest);
    Object.defineProperty(document, handlerKey, {
      value: handleGearDeleteRequest,
      configurable: true,
      writable: false,
      enumerable: false
    });
  }
}
function bindGearListCageListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListCage');
  if (sel) {
    sel.addEventListener('change', function (e) {
      if (cageSelect) {
        cageSelect.value = e.target.value;
        cageSelect.dispatchEvent(new Event('change'));
      }
      saveCurrentGearList();
    });
  }
}
function bindGearListEasyrigListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEasyrig');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListSliderBowlListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListSliderBowl');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListEyeLeatherListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
    });
  }
}
function bindGearListProGaffTapeListener() {
  if (!gearListOutput) return;
  [1, 2].forEach(function (i) {
    var colorSel = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
    var widthSel = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
    [colorSel, widthSel].forEach(function (sel) {
      if (sel) {
        sel.addEventListener('change', function () {
          saveCurrentGearList();
        });
      }
    });
  });
}
function bindGearListDirectorMonitorListener() {
  if (!gearListOutput) return;
  ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
  ['Director', 'Combo', 'Dop'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role, "15"));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
}
function refreshGearListIfVisible() {
  if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
  if (restoringSession) return;
  if (skipNextGearListRefresh) {
    skipNextGearListRefresh = false;
    return;
  }
  if (projectForm) {
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
    var info = collectProjectFormData();
    info.sliderBowl = getSliderBowlValue();
    info.easyrig = getEasyrigValue();
    currentProjectInfo = deriveProjectInfo(info);
  } else {
    var _info = {
      sliderBowl: getSliderBowlValue(),
      easyrig: getEasyrigValue()
    };
    currentProjectInfo = deriveProjectInfo(_info);
  }
  var html = generateGearListHtml(currentProjectInfo || {});
  if (currentProjectInfo) {
    displayGearAndRequirements(html);
  } else {
    var _splitGearListHtml2 = splitGearListHtml(html),
      gearHtml = _splitGearListHtml2.gearHtml;
    gearListOutput.innerHTML = gearHtml;
  }
  ensureGearListActions();
  bindGearListCageListener();
  bindGearListEasyrigListener();
  bindGearListSliderBowlListener();
  bindGearListEyeLeatherListener();
  bindGearListProGaffTapeListener();
  bindGearListDirectorMonitorListener();
  saveCurrentSession();
}