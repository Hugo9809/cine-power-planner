function setAutoGearFieldVisibility(field, control, visible) {
  if (!field) return;
  if (visible) {
    field.removeAttribute('hidden');
    field.removeAttribute('aria-hidden');
    field.removeAttribute('inert');
  } else {
    field.setAttribute('hidden', '');
    field.setAttribute('aria-hidden', 'true');
    field.setAttribute('inert', '');
  }
  if (control) {
    control.disabled = !visible;
  }
}
  var selectorType = selectorTypeSelect ? normalizeAutoGearSelectorType(selectorTypeSelect.value) : 'none';
  var showSelectorExtras = isMonitoring && selectorType !== 'none';
  setAutoGearFieldVisibility(screenSizeField, screenSizeInput, isMonitoring);
  setAutoGearFieldVisibility(selectorTypeField, selectorTypeSelect, isMonitoring);
  setAutoGearFieldVisibility(selectorDefaultField, selectorDefaultInput, showSelectorExtras);
  setAutoGearFieldVisibility(selectorIncludeField, selectorIncludeCheckbox, showSelectorExtras);
  }
  if (!showSelectorExtras) {
  var isMonitoringCategory = isAutoGearMonitoringCategory(category);
  var screenSize = isMonitoringCategory ? normalizeAutoGearText(entry.screenSize) : '';
  var selectorType = isMonitoringCategory ? normalizeAutoGearSelectorType(entry.selectorType) : 'none';
  var selectorDefault = isMonitoringCategory ? normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault) : '';
  var selectorEnabled = isMonitoringCategory && selectorType !== 'none' ? !!entry.selectorEnabled : false;
  syncAutoGearMonitorFieldVisibility();
  syncAutoGearMonitorFieldVisibility();
  if (autoGearAddSelectorTypeSelect) {
    autoGearAddSelectorTypeSelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  if (autoGearRemoveSelectorTypeSelect) {
    autoGearRemoveSelectorTypeSelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
