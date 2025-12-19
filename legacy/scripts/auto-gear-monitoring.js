(function () {
  'use strict';

  if (typeof document === 'undefined') {
    return;
  }
  var SCENARIO_SELECT_ID = 'autoGearScenarios';
  var MONITORING_SELECT_IDS = ['autoGearVideoDistribution', 'autoGearMonitor', 'autoGearWireless'];
  var MONITORING_CONDITION_KEYS = ['videoDistribution', 'monitor', 'wireless'];
  var EDITOR_ID = 'autoGearEditor';
  var scenarioSelect = null;
  var scenarioObserver = null;
  var scenarioObserverTarget = null;
  var monitoringSelects = [];
  var editorElement = null;
  var editorObserver = null;
  var updateTimer = null;
  for (var i = 0; i < MONITORING_SELECT_IDS.length; i += 1) {
    monitoringSelects.push({
      id: MONITORING_SELECT_IDS[i],
      select: null,
      row: null,
      observer: null,
      observerTarget: null
    });
  }
  function findAncestorFormRow(element) {
    var current = element;
    while (current && current !== document && current !== document.body) {
      if (current.classList && current.classList.contains('form-row')) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }
  function resolveRow(element) {
    if (!element) {
      return null;
    }
    if (typeof element.closest === 'function') {
      return element.closest('.form-row');
    }
    return findAncestorFormRow(element);
  }
  function detachSelectListeners(select) {
    if (!select) {
      return;
    }
    select.removeEventListener('change', scheduleUpdate);
    select.removeEventListener('input', scheduleUpdate);
  }
  function attachSelectListeners(select) {
    if (!select) {
      return;
    }
    select.addEventListener('change', scheduleUpdate);
    select.addEventListener('input', scheduleUpdate);
  }
  function observeScenarioSelect(element) {
    if (scenarioObserver && scenarioObserverTarget !== element) {
      scenarioObserver.disconnect();
      scenarioObserver = null;
      scenarioObserverTarget = null;
    }
    if (!element || typeof MutationObserver !== 'function') {
      return;
    }
    if (!scenarioObserver) {
      scenarioObserver = new MutationObserver(scheduleUpdate);
    }
    if (scenarioObserverTarget === element) {
      return;
    }
    scenarioObserver.disconnect();
    scenarioObserver.observe(element, {
      attributes: true,
      attributeFilter: ['hidden', 'selected', 'value'],
      childList: true,
      subtree: true
    });
    scenarioObserverTarget = element;
  }
  function refreshScenarioSelect() {
    var element = document.getElementById(SCENARIO_SELECT_ID);
    if (scenarioSelect !== element) {
      detachSelectListeners(scenarioSelect);
      scenarioSelect = element;
      attachSelectListeners(scenarioSelect);
    }
    observeScenarioSelect(element);
  }
  function observeMonitoringSelect(data) {
    if (data.observer && data.observerTarget !== data.select) {
      data.observer.disconnect();
      data.observer = null;
      data.observerTarget = null;
    }
    if (!data.select || typeof MutationObserver !== 'function') {
      return;
    }
    if (!data.observer) {
      data.observer = new MutationObserver(scheduleUpdate);
    }
    if (data.observerTarget === data.select) {
      return;
    }
    data.observer.disconnect();
    data.observer.observe(data.select, {
      attributes: true,
      attributeFilter: ['hidden', 'selected', 'value'],
      childList: true,
      subtree: true
    });
    data.observerTarget = data.select;
  }
  function refreshMonitoringSelect(data) {
    var element = document.getElementById(data.id);
    if (data.select !== element) {
      detachSelectListeners(data.select);
      data.select = element;
      data.row = resolveRow(element);
      attachSelectListeners(data.select);
    } else if (!data.row || data.row && !data.row.contains(data.select)) {
      data.row = resolveRow(data.select);
    }
    observeMonitoringSelect(data);
  }
  function refreshEditorObserver() {
    var element = document.getElementById(EDITOR_ID);
    if (editorElement === element) {
      return;
    }
    if (editorObserver) {
      editorObserver.disconnect();
      editorObserver = null;
    }
    editorElement = element;
    if (!element || typeof MutationObserver !== 'function') {
      return;
    }
    editorObserver = new MutationObserver(scheduleUpdate);
    editorObserver.observe(element, {
      attributes: true,
      attributeFilter: ['hidden'],
      childList: true,
      subtree: true
    });
  }
  function refreshElements() {
    refreshScenarioSelect();
    for (var i = 0; i < monitoringSelects.length; i += 1) {
      refreshMonitoringSelect(monitoringSelects[i]);
    }
    refreshEditorObserver();
  }
  function optionText(value) {
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  }
  function scenarioTriggersMonitoring() {
    if (!scenarioSelect) {
      return false;
    }
    var needle = 'monitor';
    var options = scenarioSelect.selectedOptions || scenarioSelect.options;
    if (!options) {
      return false;
    }
    for (var i = 0; i < options.length; i += 1) {
      var option = options[i];
      if (!option || !option.selected) {
        continue;
      }
      var value = optionText(option.value).toLowerCase();
      var label = optionText(option.textContent).toLowerCase();
      if (value && value.indexOf(needle) !== -1 || label && label.indexOf(needle) !== -1) {
        return true;
      }
    }
    return false;
  }
  function selectHasSelection(select) {
    if (!select) {
      return false;
    }
    var options = select.selectedOptions || select.options;
    if (!options) {
      return false;
    }
    for (var i = 0; i < options.length; i += 1) {
      var option = options[i];
      if (!option || !option.selected) {
        continue;
      }
      var value = optionText(option.value).trim();
      if (value.length > 0) {
        return true;
      }
      var label = optionText(option.textContent).trim();
      if (label.length > 0) {
        return true;
      }
    }
    return false;
  }
  function hasMonitoringSelections() {
    for (var i = 0; i < monitoringSelects.length; i += 1) {
      if (selectHasSelection(monitoringSelects[i].select)) {
        return true;
      }
    }
    return false;
  }
  function hasActiveMonitoringConditions() {
    for (var i = 0; i < MONITORING_CONDITION_KEYS.length; i += 1) {
      var key = MONITORING_CONDITION_KEYS[i];
      if (typeof window !== 'undefined' && typeof window.isAutoGearConditionActive === 'function') {
        if (window.isAutoGearConditionActive(key)) {
          return true;
        }
      }
      var section = document.getElementById('autoGearCondition-' + key);
      if (section && !section.hidden && section.getAttribute('aria-hidden') !== 'true') {
        return true;
      }
    }
    return false;
  }
  function applyVisibility() {
    var shouldShow = scenarioTriggersMonitoring() || hasMonitoringSelections() || hasActiveMonitoringConditions();
    for (var i = 0; i < monitoringSelects.length; i += 1) {
      var data = monitoringSelects[i];
      if (!data.row || !data.select || !data.row.contains(data.select)) {
        data.row = resolveRow(data.select);
      }
      if (data.row) {
        var nextHidden = !shouldShow;
        if (data.row.hidden !== nextHidden) {
          data.row.hidden = nextHidden;
        }
      }
    }
  }
  function performUpdate() {
    refreshElements();
    applyVisibility();
  }
  function scheduleUpdate() {
    if (updateTimer !== null) {
      return;
    }
    updateTimer = setTimeout(function () {
      updateTimer = null;
      performUpdate();
    }, 0);
  }
  function init() {
    performUpdate();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  if (typeof window !== 'undefined') {
    if (!window.autoGearMonitoringVisibility) {
      window.autoGearMonitoringVisibility = {};
    }
    window.autoGearMonitoringVisibility.refresh = function () {
      performUpdate();
    };
  }
})();