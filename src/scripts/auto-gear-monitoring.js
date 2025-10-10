// ---------------------------------------------------------------------------
// Auto gear monitoring visibility helper
// ---------------------------------------------------------------------------
// This module keeps a handful of monitoring related form rows in sync with the
// currently selected scenario. The planner exposes additional dropdowns when a
// monitoring scenario is active, but the elements live in the DOM regardless of
// the user choice so that autosave and offline restore can continue to map the
// form fields correctly. Instead of removing nodes we simply toggle their
// visibility – this plays nicely with screen readers and prevents focus loss.
//
// The code below performs three core tasks:
//   1. Wire up MutationObservers that detect when the scenario dropdown and the
//      monitoring selects receive new options (for example after a restore).
//   2. Listen to user input and debounce the expensive work so that typing or
//      rapid selection changes never cause layout thrash.
//   3. Decide if any of the selects contain a relevant value and show/hide the
//      surrounding rows accordingly.
//
// The helper is intentionally dependency free so that it remains robust when
// executed in isolation by legacy entry points or during service worker driven
// offline restores.
(function () {
  'use strict';

  if (typeof document === 'undefined') {
    return;
  }

  // Identifier of the master scenario select element. When its label or value
  // mentions "monitor" we reveal the monitoring specific dropdowns.
  var SCENARIO_SELECT_ID = 'autoGearScenarios';

  // Identifiers for the monitoring dropdowns that share the visibility toggle.
  // New selects can be added here without touching the runtime logic below.
  var MONITORING_SELECT_IDS = [
    'autoGearVideoDistribution',
    'autoGearMonitor',
    'autoGearWireless'
  ];

  // The editor container is observed so we can respond to async DOM updates
  // when the auto gear UI is swapped out or injected dynamically.
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
      observerTarget: null,
    });
  }

  // In older browsers (or legacy contexts without Element.closest) we walk up
  // the DOM tree manually to locate the parent ".form-row" wrapper. Keeping the
  // implementation small lets us re-use it as a fallback for resolveRow.
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

  // Consistently resolve the surrounding form row so we can toggle the hidden
  // attribute. Using Element.closest when available keeps the helper fast while
  // gracefully falling back to the manual search above.
  function resolveRow(element) {
    if (!element) {
      return null;
    }

    if (typeof element.closest === 'function') {
      return element.closest('.form-row');
    }

    return findAncestorFormRow(element);
  }

  // Remove listeners from a select element when it is detached or replaced in
  // the DOM. This avoids duplicate handlers when the restore flow recreates
  // nodes.
  function detachSelectListeners(select) {
    if (!select) {
      return;
    }

    select.removeEventListener('change', scheduleUpdate);
    select.removeEventListener('input', scheduleUpdate);
  }

  // Complement to detachSelectListeners – ensures every select we track emits
  // events that trigger the visibility refresh.
  function attachSelectListeners(select) {
    if (!select) {
      return;
    }

    select.addEventListener('change', scheduleUpdate);
    select.addEventListener('input', scheduleUpdate);
  }

  // Watch the scenario select for dynamic changes (think translations loading,
  // or backup restore injecting new options). When a mutation happens we
  // schedule a refresh so the UI reflects the new state immediately.
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
      subtree: true,
    });
    scenarioObserverTarget = element;
  }

  // Resolve the current scenario select element, attach listeners and hook up
  // the MutationObserver.
  function refreshScenarioSelect() {
    var element = document.getElementById(SCENARIO_SELECT_ID);

    if (scenarioSelect !== element) {
      detachSelectListeners(scenarioSelect);
      scenarioSelect = element;
      attachSelectListeners(scenarioSelect);
    }

    observeScenarioSelect(element);
  }

  // Mirror the scenario observer logic for each monitoring select. We keep the
  // observer reference inside the descriptor object so that individual selects
  // can be reattached without recreating everything.
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
      subtree: true,
    });
    data.observerTarget = data.select;
  }

  // Ensure the references for a monitoring select stay up to date and that the
  // row pointer is recalculated whenever the DOM structure changes.
  function refreshMonitoringSelect(data) {
    var element = document.getElementById(data.id);

    if (data.select !== element) {
      detachSelectListeners(data.select);
      data.select = element;
      data.row = resolveRow(element);
      attachSelectListeners(data.select);
    } else if (!data.row || (data.row && !data.row.contains(data.select))) {
      data.row = resolveRow(data.select);
    }

    observeMonitoringSelect(data);
  }

  // When the editor wrapper is replaced we must watch the new node so the
  // helper remains responsive. This is particularly important after imports or
  // template switches.
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
      subtree: true,
    });
  }

  // Keep all references in sync by calling the refresh routines in a single
  // place. This is executed before every visibility update.
  function refreshElements() {
    refreshScenarioSelect();

    for (var i = 0; i < monitoringSelects.length; i += 1) {
      refreshMonitoringSelect(monitoringSelects[i]);
    }

    refreshEditorObserver();
  }

  // Helpers -----------------------------------------------------------------
  // The functions below deal with interrogating option text and determining if
  // any of the selects actually contain a user choice that implies monitoring
  // hardware.
  function optionText(value) {
    if (value == null) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return String(value);
  }

  // Decide if the selected scenario indicates monitoring gear. The check is a
  // loose contains lookup to remain resilient to localisation changes.
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

      if ((value && value.indexOf(needle) !== -1) || (label && label.indexOf(needle) !== -1)) {
        return true;
      }
    }

    return false;
  }

  // Confirm whether the provided select has any non-empty value or label
  // selected. Treating whitespace as empty keeps the UI clean even with odd
  // imports.
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

  // Aggregate helper that checks if any of the monitored selects currently has
  // a selection.
  function hasMonitoringSelections() {
    for (var i = 0; i < monitoringSelects.length; i += 1) {
      if (selectHasSelection(monitoringSelects[i].select)) {
        return true;
      }
    }

    return false;
  }

  // Apply the computed visibility state to every monitoring row. We resolve the
  // row lazily so that dynamically inserted selects are handled automatically.
  function applyVisibility() {
    var shouldShow = scenarioTriggersMonitoring() || hasMonitoringSelections();

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

  // Perform a full refresh of DOM references and toggle the rows. This is the
  // single point of truth called from debounced listeners and manual refreshes.
  function performUpdate() {
    refreshElements();
    applyVisibility();
  }

  // Debounce updates using setTimeout so rapid change events do not cause a
  // cascade of synchronous DOM queries. The zero delay keeps the UI responsive
  // while still batching multiple events into a single refresh.
  function scheduleUpdate() {
    if (updateTimer !== null) {
      return;
    }

    updateTimer = setTimeout(function () {
      updateTimer = null;
      performUpdate();
    }, 0);
  }

  // Kick everything off after the DOM has settled. We run immediately when the
  // document is already interactive so navigation restores feel instant.
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
