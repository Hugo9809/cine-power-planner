function getAutoGearVisibleRowCount(optionCount, minRows, maxRows) {
  if (!optionCount) {
    return 1;
  }

  const safeMin = Math.max(1, Math.floor(minRows));
  const safeMax = Math.max(safeMin, Math.floor(maxRows));

  if (optionCount < safeMin) {
    return safeMin;
  }

  if (optionCount > safeMax) {
    return safeMax;
  }

  return optionCount;
}

const autoGearMultiSelects = [
];

autoGearMultiSelects.forEach(select => {
  if (!select) return;
  select.multiple = true;
  enableAutoGearMultiSelectToggle(select);
});
  autoGearScenariosSelect.size = getAutoGearVisibleRowCount(selectableOptions.length, 6, 12);
  autoGearMatteboxSelect.size = getAutoGearVisibleRowCount(selectableOptions.length, 5, 10);
  autoGearCameraHandleSelect.size = getAutoGearVisibleRowCount(selectableOptions.length, 5, 10);
  autoGearViewfinderExtensionSelect.size = getAutoGearVisibleRowCount(selectableOptions.length, 4, 8);
  autoGearVideoDistributionSelect.size = getAutoGearVisibleRowCount(selectableOptions.length, 6, 12);
  const optionCount = Array.from(autoGearCameraSelect.options || []).filter(option => !option.disabled).length;
  autoGearCameraSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
  const optionCount = Array.from(autoGearMonitorSelect.options || []).filter(option => !option.disabled).length;
  autoGearMonitorSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
  const optionCount = Array.from(autoGearWirelessSelect.options || []).filter(option => !option.disabled).length;
  autoGearWirelessSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
  const optionCount = Array.from(autoGearMotorsSelect.options || []).filter(option => !option.disabled).length;
  autoGearMotorsSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
  const optionCount = Array.from(autoGearControllersSelect.options || []).filter(option => !option.disabled).length;
  autoGearControllersSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
  const optionCount = Array.from(autoGearDistanceSelect.options || []).filter(option => !option.disabled).length;
  autoGearDistanceSelect.size = getAutoGearVisibleRowCount(optionCount, 6, 12);
      remainder = remainder.replace(/^[–—:-]+/, '').trim();
