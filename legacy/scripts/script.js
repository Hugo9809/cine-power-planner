function handleSchemaLoadFailure(baseSchema, error, message) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    if (message && typeof error !== 'undefined') {
      console.warn(message, error);
    } else if (message) {
      console.warn(message);
    } else if (typeof error !== 'undefined') {
      console.warn('Failed to fetch schema.json', error);
    }
  }
  if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
    finalizeDeviceSchemaLoad(baseSchema);
    return;
  }
  loadDeviceSchemaFromCacheStorage().then(function (schemaFromCache) {
    if (isValidDeviceSchema(schemaFromCache)) {
      finalizeDeviceSchemaLoad(schemaFromCache);
    } else {
      finalizeDeviceSchemaLoad(baseSchema);
    }
  }).catch(function (cacheError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to load schema.json from cache storage', cacheError);
    }
    finalizeDeviceSchemaLoad(baseSchema);
  });
}
function loadDeviceSchemaViaLegacyRequest(fallbackSchema) {
  if (typeof XMLHttpRequest === 'undefined') {
    finalizeDeviceSchemaLoad(fallbackSchema);
    return;
  }
  try {
    var request = new XMLHttpRequest();
    var resolved = false;
    var fallbackToCache = function fallbackToCache(error, message) {
      if (resolved) {
        return;
      }
      resolved = true;
      handleSchemaLoadFailure(fallbackSchema, error, message);
    };
    request.open('GET', DEVICE_SCHEMA_PATH, true);
    if ('responseType' in request) {
      try {
        request.responseType = 'json';
      } catch (typeError) {
        void typeError;
      }
    }
    request.onreadystatechange = function () {
      if (request.readyState !== 4 || resolved) {
        return;
      }
      var status = request.status;
      if (status >= 200 && status < 300 || status === 0) {
        var payload = null;
        if (request.response && _typeof(request.response) === 'object') {
          payload = request.response;
        }
        if (!payload && typeof request.responseText === 'string' && request.responseText) {
          try {
            payload = JSON.parse(request.responseText);
          } catch (parseError) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn('Unable to parse schema.json response text from legacy request', parseError);
            }
          }
        }
        if (isValidDeviceSchema(payload)) {
          resolved = true;
          finalizeDeviceSchemaLoad(payload);
          return;
        }
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Legacy schema request returned invalid data. Falling back to cache.');
        }
        fallbackToCache();
        return;
      }
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Legacy schema request failed with status', status);
      }
      fallbackToCache();
    };
    request.onerror = function (event) {
      fallbackToCache(event, 'Legacy schema request encountered an error');
    };
    request.send(null);
  } catch (xhrError) {
    handleSchemaLoadFailure(fallbackSchema, xhrError, 'Legacy schema request threw an exception');
  }
}
      handleSchemaLoadFailure(deviceSchema, error, 'Failed to fetch schema.json');
  } else if (typeof XMLHttpRequest === 'function') {
    loadDeviceSchemaViaLegacyRequest(deviceSchema);
function normalizeVideoDistributionTriggerList(values) {
  if (!Array.isArray(values)) return [];
  var base = normalizeAutoGearTriggerList(values);
  var seen = new Set();
  var result = [];
  base.forEach(function (value) {
    var lower = value.toLowerCase();
    var normalized = lower === '__none__' || lower === 'none' ? '__none__' : value;
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    result.push(normalized);
  });
  return result;
}
  var videoDistribution = normalizeVideoDistributionTriggerList(rule.videoDistribution).sort(function (a, b) {
function resetSharedImportStateForFactoryReset() {
  clearStoredSharedImportData();
  sharedImportPromptActive = false;
  if (sharedImportDialog) {
    closeDialog(sharedImportDialog);
  }
  if (typeof configureSharedImportOptions === 'function') {
    configureSharedImportOptions([]);
  }
  if (sharedLinkInput) {
    if (pendingSharedLinkListener && typeof sharedLinkInput.removeEventListener === 'function') {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    }
    sharedLinkInput.value = '';
  }
  pendingSharedLinkListener = null;
  sharedImportPreviousPresetId = '';
  sharedImportProjectPresetActive = false;
}
function getVideoDistributionFallbackLabel(value) {
  if (value === '__none__') {
    var _texts$currentLang12, _texts$en106;
    return ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearVideoDistributionNone) || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearVideoDistributionNone) || 'No video distribution selected';
  }
  return value;
}
function normalizeVideoDistributionOptionValue(value) {
  if (typeof value !== 'string') return '';
  var trimmed = value.trim();
  if (!trimmed) return '';
  var lower = trimmed.toLowerCase();
  if (lower === '__none__' || lower === 'none') return '__none__';
  return trimmed;
}
    var _texts$currentLang13, _texts$en107;
    placeholder.textContent = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearViewfinderExtensionPlaceholder) || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearViewfinderExtensionPlaceholder) || 'Select viewfinder extension options';
  var normalizedSelections = Array.from(new Set(candidateValues.map(normalizeVideoDistributionOptionValue).filter(Boolean)));
  var hasNoneSelection = normalizedSelections.includes('__none__');
  var selectedValues = normalizedSelections.filter(function (value) {
    return value !== '__none__';
  });
  var noneOption = document.createElement('option');
  noneOption.value = '__none__';
  noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
  if (hasNoneSelection) {
    noneOption.selected = true;
  }
  autoGearVideoDistributionSelect.appendChild(noneOption);
      var value = normalizeVideoDistributionOptionValue(opt.value);
      if (!value) return;
      if (value === '__none__') {
        if (hasNoneSelection) {
          noneOption.selected = true;
        }
        return;
      }
      option.value = value;
      if (selectedValues.includes(value)) {
    var _texts$currentLang14, _texts$en108;
    placeholder.textContent = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearVideoDistributionPlaceholder) || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearVideoDistributionPlaceholder) || 'Select video distribution options';
        fallbackOption.textContent = getVideoDistributionFallbackLabel(value);
  var _texts$currentLang15, _texts$en109;
  customOpt.textContent = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearCustomCategory) || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearCustomCategory) || 'Custom Additions';
  var _texts$en111;
    var _texts$en110;
    var _template = langTexts[singularKey] || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110[singularKey]);
  var template = langTexts[pluralKey] || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111[pluralKey]);
  var _texts$en112;
  var categoryLabel = category ? category : langTexts.autoGearCustomCategory || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearCustomCategory) || '';
    var _texts$en113;
    var withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearItemSummaryWithCategory) || '%s × %s (%s)';
    var _texts$en114;
    var baseTemplate = langTexts.autoGearItemSummary || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearItemSummary) || '%s × %s';
      var _texts$en115, _texts$en116;
      var selectorTemplate = formattedDefault ? langTexts.autoGearSelectorSummaryWithDefault || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearSelectorSummaryWithDefault) || '%s selector (default: %s)' : langTexts.autoGearSelectorSummary || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearSelectorSummary) || '%s selector';
      var _texts$en117;
      var defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.autoGearSelectorSummaryNoSelector) || '%s default: %s';
  var _texts$en119;
    var _texts$en118;
    var _template2 = langTexts.autoGearRulesCountOne || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearRulesCountOne);
  var template = langTexts.autoGearRulesCountOther || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.autoGearRulesCountOther);
  var _texts$en120, _texts$en121;
  var rulesLabel = ruleCount === 0 ? langTexts.autoGearBackupClearsRules || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearBackupClearsRules) || 'Clears all rules' : formatAutoGearRuleCount(ruleCount);
  var template = langTexts.autoGearBackupMeta || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearBackupMeta);
  var _texts$currentLang16, _texts$en122;
  return ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearBackupSelectPlaceholder) || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.autoGearBackupSelectPlaceholder) || 'Select a backup to restore';
  var _texts$en123;
  return langTexts.autoGearAutoPresetLabel || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearAutoPresetLabel) || 'Autosaved rules';
  var _texts$currentLang17, _texts$en124;
  var placeholderText = ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.autoGearPresetPlaceholder) || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearPresetPlaceholder) || 'Custom rules';
  var _texts$currentLang18, _texts$en125, _texts$currentLang19, _texts$en126;
  var confirmTemplate = ((_texts$currentLang18 = texts[currentLang]) === null || _texts$currentLang18 === void 0 ? void 0 : _texts$currentLang18.autoGearPresetApplyConfirm) || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearPresetApplyConfirm) || "Replace your automatic gear rules with the preset \"".concat(preset.label, "\"?");
  var appliedMessage = ((_texts$currentLang19 = texts[currentLang]) === null || _texts$currentLang19 === void 0 ? void 0 : _texts$currentLang19.autoGearPresetApplied) || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearPresetApplied) || 'Preset applied.';
  var _texts$currentLang20, _texts$en127, _texts$currentLang25, _texts$en132;
  var promptTemplate = ((_texts$currentLang20 = texts[currentLang]) === null || _texts$currentLang20 === void 0 ? void 0 : _texts$currentLang20.autoGearPresetNamePrompt) || ((_texts$en127 = texts.en) === null || _texts$en127 === void 0 ? void 0 : _texts$en127.autoGearPresetNamePrompt) || 'Name this preset';
    var _texts$currentLang21, _texts$en128;
    var requiredMessage = ((_texts$currentLang21 = texts[currentLang]) === null || _texts$currentLang21 === void 0 ? void 0 : _texts$currentLang21.autoGearPresetNameRequired) || ((_texts$en128 = texts.en) === null || _texts$en128 === void 0 ? void 0 : _texts$en128.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    var _texts$currentLang22, _texts$en129;
    var _requiredMessage = ((_texts$currentLang22 = texts[currentLang]) === null || _texts$currentLang22 === void 0 ? void 0 : _texts$currentLang22.autoGearPresetNameRequired) || ((_texts$en129 = texts.en) === null || _texts$en129 === void 0 ? void 0 : _texts$en129.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    var _texts$currentLang23, _texts$en130;
    var overwriteTemplate = ((_texts$currentLang23 = texts[currentLang]) === null || _texts$currentLang23 === void 0 ? void 0 : _texts$currentLang23.autoGearPresetOverwriteConfirm) || ((_texts$en130 = texts.en) === null || _texts$en130 === void 0 ? void 0 : _texts$en130.autoGearPresetOverwriteConfirm) || "Replace the existing preset \"".concat(normalizedName, "\"?");
    var _texts$currentLang24, _texts$en131;
    var _requiredMessage2 = ((_texts$currentLang24 = texts[currentLang]) === null || _texts$currentLang24 === void 0 ? void 0 : _texts$currentLang24.autoGearPresetNameRequired) || ((_texts$en131 = texts.en) === null || _texts$en131 === void 0 ? void 0 : _texts$en131.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
  var savedMessage = ((_texts$currentLang25 = texts[currentLang]) === null || _texts$currentLang25 === void 0 ? void 0 : _texts$currentLang25.autoGearPresetSaved) || ((_texts$en132 = texts.en) === null || _texts$en132 === void 0 ? void 0 : _texts$en132.autoGearPresetSaved) || 'Automatic gear preset saved.';
  var _texts$currentLang26, _texts$en133, _texts$currentLang27, _texts$en134;
  var confirmTemplate = ((_texts$currentLang26 = texts[currentLang]) === null || _texts$currentLang26 === void 0 ? void 0 : _texts$currentLang26.autoGearPresetDeleteConfirm) || ((_texts$en133 = texts.en) === null || _texts$en133 === void 0 ? void 0 : _texts$en133.autoGearPresetDeleteConfirm) || 'Delete this preset?';
  var deletedMessage = ((_texts$currentLang27 = texts[currentLang]) === null || _texts$currentLang27 === void 0 ? void 0 : _texts$currentLang27.autoGearPresetDeleted) || ((_texts$en134 = texts.en) === null || _texts$en134 === void 0 ? void 0 : _texts$en134.autoGearPresetDeleted) || 'Automatic gear preset deleted.';
    var _texts$currentLang28, _texts$en135;
    empty.textContent = ((_texts$currentLang28 = texts[currentLang]) === null || _texts$currentLang28 === void 0 ? void 0 : _texts$currentLang28.autoGearNoRules) || ((_texts$en135 = texts.en) === null || _texts$en135 === void 0 ? void 0 : _texts$en135.autoGearNoRules) || 'No custom rules yet.';
    var _texts$currentLang35, _texts$en142, _texts$currentLang36, _texts$en143;
    var videoDistributionDisplayList = videoDistributionList.map(getVideoDistributionFallbackLabel);
    var fallbackSource = scenarioList.length ? scenarioList : matteboxList.length ? matteboxList : cameraHandleList.length ? cameraHandleList : viewfinderDisplayList.length ? viewfinderDisplayList : videoDistributionDisplayList.length ? videoDistributionDisplayList : [];
      var _texts$currentLang29, _texts$en136;
      var scenarioLabel = ((_texts$currentLang29 = texts[currentLang]) === null || _texts$currentLang29 === void 0 || (_texts$currentLang29 = _texts$currentLang29.projectFields) === null || _texts$currentLang29 === void 0 ? void 0 : _texts$currentLang29.requiredScenarios) || ((_texts$en136 = texts.en) === null || _texts$en136 === void 0 || (_texts$en136 = _texts$en136.projectFields) === null || _texts$en136 === void 0 ? void 0 : _texts$en136.requiredScenarios) || 'Required Scenarios';
      var _texts$currentLang30, _texts$en137;
      var matteboxLabelText = ((_texts$currentLang30 = texts[currentLang]) === null || _texts$currentLang30 === void 0 ? void 0 : _texts$currentLang30.autoGearMatteboxLabel) || ((_texts$en137 = texts.en) === null || _texts$en137 === void 0 ? void 0 : _texts$en137.autoGearMatteboxLabel) || 'Mattebox options';
      var _texts$currentLang31, _texts$en138;
      var cameraHandleLabelText = ((_texts$currentLang31 = texts[currentLang]) === null || _texts$currentLang31 === void 0 ? void 0 : _texts$currentLang31.autoGearCameraHandleLabel) || ((_texts$en138 = texts.en) === null || _texts$en138 === void 0 ? void 0 : _texts$en138.autoGearCameraHandleLabel) || 'Camera handles';
      var _texts$currentLang32, _texts$en139;
      var viewfinderLabelText = ((_texts$currentLang32 = texts[currentLang]) === null || _texts$currentLang32 === void 0 ? void 0 : _texts$currentLang32.autoGearViewfinderExtensionLabel) || ((_texts$en139 = texts.en) === null || _texts$en139 === void 0 ? void 0 : _texts$en139.autoGearViewfinderExtensionLabel) || 'Viewfinder extension';
    if (videoDistributionDisplayList.length) {
      var _texts$currentLang33, _texts$en140;
      var videoDistLabelText = ((_texts$currentLang33 = texts[currentLang]) === null || _texts$currentLang33 === void 0 ? void 0 : _texts$currentLang33.autoGearVideoDistributionLabel) || ((_texts$en140 = texts.en) === null || _texts$en140 === void 0 ? void 0 : _texts$en140.autoGearVideoDistributionLabel) || 'Video distribution';
      videoDistMeta.textContent = "".concat(videoDistLabelText, ": ").concat(videoDistributionDisplayList.join(' + '));
      var _texts$currentLang34, _texts$en141;
      addsLabel.textContent = ((_texts$currentLang34 = texts[currentLang]) === null || _texts$currentLang34 === void 0 ? void 0 : _texts$currentLang34.autoGearAddsListLabel) || ((_texts$en141 = texts.en) === null || _texts$en141 === void 0 ? void 0 : _texts$en141.autoGearAddsListLabel) || 'Adds';
    var editLabel = ((_texts$currentLang35 = texts[currentLang]) === null || _texts$currentLang35 === void 0 ? void 0 : _texts$currentLang35.editBtn) || ((_texts$en142 = texts.en) === null || _texts$en142 === void 0 ? void 0 : _texts$en142.editBtn) || 'Edit';
    var deleteLabel = ((_texts$currentLang36 = texts[currentLang]) === null || _texts$currentLang36 === void 0 ? void 0 : _texts$currentLang36.autoGearDeleteRule) || ((_texts$en143 = texts.en) === null || _texts$en143 === void 0 ? void 0 : _texts$en143.autoGearDeleteRule) || 'Delete';
      var _texts$currentLang37, _texts$en144;
      empty.textContent = ((_texts$currentLang37 = texts[currentLang]) === null || _texts$currentLang37 === void 0 ? void 0 : _texts$currentLang37.autoGearEmptyList) || ((_texts$en144 = texts.en) === null || _texts$en144 === void 0 ? void 0 : _texts$en144.autoGearEmptyList) || 'No items yet.';
      var _texts$currentLang38, _texts$en145;
      var removeLabel = ((_texts$currentLang38 = texts[currentLang]) === null || _texts$currentLang38 === void 0 ? void 0 : _texts$currentLang38.autoGearListRemove) || ((_texts$en145 = texts.en) === null || _texts$en145 === void 0 ? void 0 : _texts$en145.autoGearListRemove) || 'Remove';
    var _texts$currentLang39, _texts$en146;
    var message = ((_texts$currentLang39 = texts[currentLang]) === null || _texts$currentLang39 === void 0 ? void 0 : _texts$currentLang39.autoGearItemNameRequired) || ((_texts$en146 = texts.en) === null || _texts$en146 === void 0 ? void 0 : _texts$en146.autoGearItemNameRequired) || 'Enter an item name first.';
  var _texts$currentLang43, _texts$en150;
  if (videoDistributionSelections.includes('__none__') && videoDistributionSelections.length > 1) {
    videoDistributionSelections = videoDistributionSelections.filter(function (value) {
      return value !== '__none__';
    });
  }
    var _texts$currentLang40, _texts$en147, _texts$currentLang41, _texts$en148;
    var message = ((_texts$currentLang40 = texts[currentLang]) === null || _texts$currentLang40 === void 0 ? void 0 : _texts$currentLang40.autoGearRuleConditionRequired) || ((_texts$en147 = texts.en) === null || _texts$en147 === void 0 ? void 0 : _texts$en147.autoGearRuleConditionRequired) || ((_texts$currentLang41 = texts[currentLang]) === null || _texts$currentLang41 === void 0 ? void 0 : _texts$currentLang41.autoGearRuleScenarioRequired) || ((_texts$en148 = texts.en) === null || _texts$en148 === void 0 ? void 0 : _texts$en148.autoGearRuleScenarioRequired) || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension or video distribution before saving.';
    var _texts$currentLang42, _texts$en149;
    var _message = ((_texts$currentLang42 = texts[currentLang]) === null || _texts$currentLang42 === void 0 ? void 0 : _texts$currentLang42.autoGearRuleNeedsItems) || ((_texts$en149 = texts.en) === null || _texts$en149 === void 0 ? void 0 : _texts$en149.autoGearRuleNeedsItems) || 'Add at least one item to add or remove.';
  var successMessage = ((_texts$currentLang43 = texts[currentLang]) === null || _texts$currentLang43 === void 0 ? void 0 : _texts$currentLang43.autoGearRuleSaved) || ((_texts$en150 = texts.en) === null || _texts$en150 === void 0 ? void 0 : _texts$en150.autoGearRuleSaved) || 'Automatic gear rule saved.';
  var _texts$currentLang44, _texts$en151;
  var confirmation = ((_texts$currentLang44 = texts[currentLang]) === null || _texts$currentLang44 === void 0 ? void 0 : _texts$currentLang44.autoGearDeleteConfirm) || ((_texts$en151 = texts.en) === null || _texts$en151 === void 0 ? void 0 : _texts$en151.autoGearDeleteConfirm) || 'Delete this rule?';
    var _texts$currentLang45, _texts$en152;
    var message = ((_texts$currentLang45 = texts[currentLang]) === null || _texts$currentLang45 === void 0 ? void 0 : _texts$currentLang45.autoGearImportSuccess) || ((_texts$en152 = texts.en) === null || _texts$en152 === void 0 ? void 0 : _texts$en152.autoGearImportSuccess) || 'Automatic gear rules imported.';
    var _texts$currentLang46, _texts$en153;
    var message = ((_texts$currentLang46 = texts[currentLang]) === null || _texts$currentLang46 === void 0 ? void 0 : _texts$currentLang46.autoGearExportSuccess) || ((_texts$en153 = texts.en) === null || _texts$en153 === void 0 ? void 0 : _texts$en153.autoGearExportSuccess) || 'Automatic gear rules downloaded.';
    var _texts$currentLang47, _texts$en154;
    var _message2 = ((_texts$currentLang47 = texts[currentLang]) === null || _texts$currentLang47 === void 0 ? void 0 : _texts$currentLang47.autoGearExportError) || ((_texts$en154 = texts.en) === null || _texts$en154 === void 0 ? void 0 : _texts$en154.autoGearExportError) || 'Automatic gear rules export failed.';
    var _texts$currentLang48, _texts$en155;
    var message = ((_texts$currentLang48 = texts[currentLang]) === null || _texts$currentLang48 === void 0 ? void 0 : _texts$currentLang48.autoGearBackupSaved) || ((_texts$en155 = texts.en) === null || _texts$en155 === void 0 ? void 0 : _texts$en155.autoGearBackupSaved) || 'Automatic gear backup saved.';
    var _texts$currentLang49, _texts$en156;
    var _message3 = ((_texts$currentLang49 = texts[currentLang]) === null || _texts$currentLang49 === void 0 ? void 0 : _texts$currentLang49.autoGearBackupFailed) || ((_texts$en156 = texts.en) === null || _texts$en156 === void 0 ? void 0 : _texts$en156.autoGearBackupFailed) || 'Automatic gear backup failed.';
  var _texts$currentLang50, _texts$en157;
  var confirmation = ((_texts$currentLang50 = texts[currentLang]) === null || _texts$currentLang50 === void 0 ? void 0 : _texts$currentLang50.autoGearBackupRestoreConfirm) || ((_texts$en157 = texts.en) === null || _texts$en157 === void 0 ? void 0 : _texts$en157.autoGearBackupRestoreConfirm) || 'Replace your automatic gear rules with this backup?';
    var _texts$currentLang51, _texts$en158;
    var message = ((_texts$currentLang51 = texts[currentLang]) === null || _texts$currentLang51 === void 0 ? void 0 : _texts$currentLang51.autoGearBackupRestoreSuccess) || ((_texts$en158 = texts.en) === null || _texts$en158 === void 0 ? void 0 : _texts$en158.autoGearBackupRestoreSuccess) || 'Automatic gear backup restored.';
    var _texts$currentLang52, _texts$en159;
    var _message4 = ((_texts$currentLang52 = texts[currentLang]) === null || _texts$currentLang52 === void 0 ? void 0 : _texts$currentLang52.autoGearBackupRestoreError) || ((_texts$en159 = texts.en) === null || _texts$en159 === void 0 ? void 0 : _texts$en159.autoGearBackupRestoreError) || 'Automatic gear backup restore failed.';
  var _texts$currentLang53, _texts$en160;
  var confirmation = ((_texts$currentLang53 = texts[currentLang]) === null || _texts$currentLang53 === void 0 ? void 0 : _texts$currentLang53.autoGearImportConfirm) || ((_texts$en160 = texts.en) === null || _texts$en160 === void 0 ? void 0 : _texts$en160.autoGearImportConfirm) || 'Replace your automatic gear rules with the imported file?';
    var _texts$currentLang54, _texts$en161;
    var errorMsg = ((_texts$currentLang54 = texts[currentLang]) === null || _texts$currentLang54 === void 0 ? void 0 : _texts$currentLang54.autoGearImportError) || ((_texts$en161 = texts.en) === null || _texts$en161 === void 0 ? void 0 : _texts$en161.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
      var _texts$currentLang55, _texts$en162;
      var _errorMsg = ((_texts$currentLang55 = texts[currentLang]) === null || _texts$currentLang55 === void 0 ? void 0 : _texts$currentLang55.autoGearImportError) || ((_texts$en162 = texts.en) === null || _texts$en162 === void 0 ? void 0 : _texts$en162.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
    var _texts$currentLang56, _texts$en163;
    var errorMsg = ((_texts$currentLang56 = texts[currentLang]) === null || _texts$currentLang56 === void 0 ? void 0 : _texts$currentLang56.autoGearImportError) || ((_texts$en163 = texts.en) === null || _texts$en163 === void 0 ? void 0 : _texts$en163.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
  var _texts$en165;
    var _texts$en164;
    var _template3 = langTexts.storageTotalSizeValue || ((_texts$en164 = texts.en) === null || _texts$en164 === void 0 ? void 0 : _texts$en164.storageTotalSizeValue) || '~%s KB';
  var template = langTexts.storageTotalSizeValue || ((_texts$en165 = texts.en) === null || _texts$en165 === void 0 ? void 0 : _texts$en165.storageTotalSizeValue) || '~%s KB';
  var _texts$en166, _texts$en167, _texts$en168;
    extra: deviceSummary.total > 0 && deviceSummary.categories.length ? (langTexts.storageDeviceCategories || ((_texts$en166 = texts.en) === null || _texts$en166 === void 0 ? void 0 : _texts$en166.storageDeviceCategories) || 'Affected categories: %s').replace('%s', formatDeviceCategories(lang, deviceSummary.categories)) : null
    value: hasSession ? langTexts.storageSessionStored || ((_texts$en167 = texts.en) === null || _texts$en167 === void 0 ? void 0 : _texts$en167.storageSessionStored) || 'Stored' : langTexts.storageSessionNotStored || ((_texts$en168 = texts.en) === null || _texts$en168 === void 0 ? void 0 : _texts$en168.storageSessionNotStored) || 'Not stored',
    var _ref142,
      _ref142$persist,
          _ref142 = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {}, _ref142$persist = _ref142.persist, persist = _ref142$persist === void 0 ? true : _ref142$persist;
  var _feedbackCancelBtn$te, _texts$currentLang57, _texts$en169;
  var cancelLabel = ((_feedbackCancelBtn$te = feedbackCancelBtn.textContent) === null || _feedbackCancelBtn$te === void 0 ? void 0 : _feedbackCancelBtn$te.trim()) || ((_texts$currentLang57 = texts[currentLang]) === null || _texts$currentLang57 === void 0 ? void 0 : _texts$currentLang57.cancelEditBtn) || ((_texts$en169 = texts.en) === null || _texts$en169 === void 0 ? void 0 : _texts$en169.cancelEditBtn) || 'Cancel';
  var _feedbackSubmitBtn$te, _texts$currentLang58, _texts$en170;
  var submitLabel = ((_feedbackSubmitBtn$te = feedbackSubmitBtn.textContent) === null || _feedbackSubmitBtn$te === void 0 ? void 0 : _feedbackSubmitBtn$te.trim()) || ((_texts$currentLang58 = texts[currentLang]) === null || _texts$currentLang58 === void 0 ? void 0 : _texts$currentLang58.feedbackSubmit) || ((_texts$en170 = texts.en) === null || _texts$en170 === void 0 ? void 0 : _texts$en170.feedbackSubmit) || 'Save & Submit';
  var _devices6, _devices7, _devices8, _devices1, _devices10, _texts$currentLang59, _texts$en171;
  var deleteFeedbackLabel = ((_texts$currentLang59 = texts[currentLang]) === null || _texts$currentLang59 === void 0 ? void 0 : _texts$currentLang59.deleteSetupBtn) || ((_texts$en171 = texts.en) === null || _texts$en171 === void 0 ? void 0 : _texts$en171.deleteSetupBtn) || 'Delete';
  var videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean).map(getVideoDistributionFallbackLabel) : [];
  var _texts$en172;
  var unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed || ((_texts$en172 = texts.en) === null || _texts$en172 === void 0 ? void 0 : _texts$en172.autoGearRuleTooltipUnnamed) || 'Added by automatic gear rule';
    var _texts$en173;
    var namedTemplate = langTexts.autoGearRuleTooltipNamed || ((_texts$en173 = texts.en) === null || _texts$en173 === void 0 ? void 0 : _texts$en173.autoGearRuleTooltipNamed) || "".concat(unnamedTemplate, ": %s");
  var _texts$currentLang60, _texts$en174;
  var labelText = rawCategory ? rawCategory : ((_texts$currentLang60 = texts[currentLang]) === null || _texts$currentLang60 === void 0 ? void 0 : _texts$currentLang60.autoGearCustomCategory) || ((_texts$en174 = texts.en) === null || _texts$en174 === void 0 ? void 0 : _texts$en174.autoGearCustomCategory) || 'Custom Additions';
  var videoDistribution = [];
  if (info && Array.isArray(info.videoDistribution)) {
    videoDistribution = info.videoDistribution;
  } else if (info && typeof info.videoDistribution === 'string') {
    videoDistribution = info.videoDistribution.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean);
  }
  var normalizedVideoDistributionRaw = videoDistribution.map(normalizeVideoDistributionOptionValue).map(function (value) {
    return value === '__none__' ? '__none__' : normalizeAutoGearTriggerValue(value);
  }).filter(function (value) {
    return value || value === '__none__';
  });
  var hasRealVideoDistributionSelection = normalizedVideoDistributionRaw.some(function (value) {
    return value !== '__none__';
  });
  var normalizedVideoDistribution = hasRealVideoDistributionSelection ? normalizedVideoDistributionRaw.filter(function (value) {
    return value !== '__none__';
  }) : ['__none__'];
  var _devices$accessories6, _texts$currentLang61, _texts$en175, _texts$currentLang62, _texts$en176, _texts$currentLang63, _texts$en177, _devices$accessories7;
  var crewRoleLabels = ((_texts$currentLang61 = texts[currentLang]) === null || _texts$currentLang61 === void 0 ? void 0 : _texts$currentLang61.crewRoles) || ((_texts$en175 = texts.en) === null || _texts$en175 === void 0 ? void 0 : _texts$en175.crewRoles) || {};
  var projectLabels = ((_texts$currentLang62 = texts[currentLang]) === null || _texts$currentLang62 === void 0 ? void 0 : _texts$currentLang62.projectFields) || ((_texts$en176 = texts.en) === null || _texts$en176 === void 0 ? void 0 : _texts$en176.projectFields) || {};
  var projectFormTexts = ((_texts$currentLang63 = texts[currentLang]) === null || _texts$currentLang63 === void 0 ? void 0 : _texts$currentLang63.projectForm) || ((_texts$en177 = texts.en) === null || _texts$en177 === void 0 ? void 0 : _texts$en177.projectForm) || {};
  try {
    resetSharedImportStateForFactoryReset();
  } catch (error) {
    console.warn('Failed to reset shared import state during factory reset', error);
  }
    var addTextFromElement = function addTextFromElement(element) {
      var _ref138 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref138$includeTextCo = _ref138.includeTextContent,
        includeTextContent = _ref138$includeTextCo === void 0 ? false : _ref138$includeTextCo;
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
        addTextFromElement(ref, {
          includeTextContent: true
        });
    findAssociatedLabelElements(el).forEach(function (labelEl) {
      addTextFromElement(labelEl, {
        includeTextContent: true
      });
    });
    if (!parts.length) {
      addText(el.textContent);
    }
    var _ref139, _lens$minFocusMeters2;
    var minFocus = (_ref139 = (_lens$minFocusMeters2 = lens.minFocusMeters) !== null && _lens$minFocusMeters2 !== void 0 ? _lens$minFocusMeters2 : lens.minFocus) !== null && _ref139 !== void 0 ? _ref139 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
  filters.forEach(function (_ref140) {
    var type = _ref140.type,
      _ref140$size = _ref140.size,
      size = _ref140$size === void 0 ? DEFAULT_FILTER_SIZE : _ref140$size,
      values = _ref140.values;
  filters.forEach(function (_ref141) {
    var type = _ref141.type;
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