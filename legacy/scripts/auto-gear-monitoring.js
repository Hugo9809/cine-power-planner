(function () {
  function toArray(list) {
    if (!list) {
      return [];
    }
    return Array.prototype.slice.call(list);
  }

  function findFormRow(element) {
    var node = element;
    while (node) {
      if (node.classList && node.classList.contains('form-row')) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function optionText(option) {
    if (!option) {
      return '';
    }
    if (typeof option.text === 'string') {
      return option.text;
    }
    if (typeof option.textContent === 'string') {
      return option.textContent;
    }
    if (typeof option.innerText === 'string') {
      return option.innerText;
    }
    return '';
  }

  function hasMonitoringScenario(select) {
    if (!select || !select.options) {
      return false;
    }
    for (var i = 0; i < select.options.length; i += 1) {
      var option = select.options[i];
      if (!option || !option.selected) {
        continue;
      }
      var value = typeof option.value === 'string' ? option.value : '';
      var label = optionText(option);
      var combined = (value + ' ' + label).toLowerCase();
      if (combined.indexOf('monitor') !== -1) {
        return true;
      }
    }
    return false;
  }

  function selectHasValue(select) {
    if (!select || !select.options) {
      return false;
    }
    for (var i = 0; i < select.options.length; i += 1) {
      var option = select.options[i];
      if (!option) {
        continue;
      }
      if (option.selected) {
        var value = typeof option.value === 'string' ? option.value.trim() : '';
        if (value) {
          return true;
        }
      }
    }
    return false;
  }

  function scheduleSync(callback) {
    if (typeof callback !== 'function') {
      return;
    }
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(callback);
      return;
    }
    setTimeout(callback, 0);
  }

  function init() {
    var scenarios = document.getElementById('autoGearScenarios');
    if (!scenarios) {
      return;
    }

    var monitoringControls = [
      document.getElementById('autoGearVideoDistribution'),
      document.getElementById('autoGearMonitor'),
      document.getElementById('autoGearWireless')
    ];
    var formRows = monitoringControls
      .map(function (select) { return select ? findFormRow(select) : null; })
      .filter(function (row) { return Boolean(row); });

    if (!formRows.length) {
      return;
    }

    function shouldShowControls() {
      if (hasMonitoringScenario(scenarios)) {
        return true;
      }
      for (var i = 0; i < monitoringControls.length; i += 1) {
        if (selectHasValue(monitoringControls[i])) {
          return true;
        }
      }
      return false;
    }

    function updateVisibility() {
      var show = shouldShowControls();
      for (var i = 0; i < formRows.length; i += 1) {
        formRows[i].hidden = !show;
      }
    }

    function handleEvent() {
      scheduleSync(updateVisibility);
    }

    scenarios.addEventListener('change', handleEvent);
    scenarios.addEventListener('input', handleEvent);

    for (var i = 0; i < monitoringControls.length; i += 1) {
      var control = monitoringControls[i];
      if (control) {
        control.addEventListener('change', handleEvent);
        control.addEventListener('input', handleEvent);
      }
    }

    var editor = document.getElementById('autoGearEditor');
    if (typeof MutationObserver === 'function') {
      var observer = new MutationObserver(handleEvent);
      observer.observe(scenarios, { attributes: true, childList: true, subtree: true });
      if (editor) {
        observer.observe(editor, { attributes: true, attributeFilter: ['hidden'] });
      }
      for (var j = 0; j < monitoringControls.length; j += 1) {
        var select = monitoringControls[j];
        if (select) {
          observer.observe(select, { attributes: true, childList: true, subtree: true });
        }
      }
    }

    var triggers = toArray(document.querySelectorAll('#autoGearAddRule, #autoGearCancelEdit'));
    triggers.push(document.getElementById('autoGearRulesList'));
    for (var k = 0; k < triggers.length; k += 1) {
      var trigger = triggers[k];
      if (trigger) {
        trigger.addEventListener('click', handleEvent, true);
      }
    }

    updateVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
