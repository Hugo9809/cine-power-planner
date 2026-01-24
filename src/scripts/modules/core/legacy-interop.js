/**
 * Legacy Interop Module
 * 
 * Provides safe wrappers for calling global functions that might not be defined immediately
 * due to load order or legacy script structures.
 */

function resolveGlobalFunction(name) {
    if (typeof globalThis !== 'undefined' && typeof globalThis[name] === 'function') {
        return globalThis[name];
    }
    if (typeof window !== 'undefined' && typeof window[name] === 'function') {
        return window[name];
    }
    return null;
}

export function safeUpdateCalculations(...args) {
    const fn = resolveGlobalFunction('updateCalculations');
    if (fn) return fn(...args);
}

export function safeCheckSetupChanged(...args) {
    const fn = resolveGlobalFunction('checkSetupChanged');
    if (fn) return fn(...args);
}

export function safeSaveCurrentSession(...args) {
    const fn = resolveGlobalFunction('saveCurrentSession');
    if (fn) return fn(...args);
}

export function safeSaveCurrentGearList(...args) {
    const fn = resolveGlobalFunction('saveCurrentGearList');
    if (fn) return fn(...args);
}

export function safeAutoSaveCurrentSetup(...args) {
    const fn = resolveGlobalFunction('autoSaveCurrentSetup');
    if (fn) return fn(...args);
}

export function safeUpdateBatteryPlateVisibility(...args) {
    const fn = resolveGlobalFunction('updateBatteryPlateVisibility');
    if (fn) return fn(...args);
}

export function safeUpdateBatteryOptions(...args) {
    const fn = resolveGlobalFunction('updateBatteryOptions');
    if (fn) return fn(...args);
}

export function safeUpdateMonitoringConfigurationOptions(...args) {
    const fn = resolveGlobalFunction('updateMonitoringConfigurationOptions');
    if (fn) return fn(...args);
}

export function safeUpdateViewfinderSettingsVisibility(...args) {
    const fn = resolveGlobalFunction('updateViewfinderSettingsVisibility');
    if (fn) return fn(...args);
}

export function safePopulateRecordingResolutionDropdown(...args) {
    const fn = resolveGlobalFunction('populateRecordingResolutionDropdown');
    if (fn) return fn(...args);
}

export function safePopulateSensorModeDropdown(...args) {
    const fn = resolveGlobalFunction('populateSensorModeDropdown');
    if (fn) return fn(...args);
}

export function safePopulateSlowMotionRecordingResolutionDropdown(...args) {
    const fn = resolveGlobalFunction('populateSlowMotionRecordingResolutionDropdown');
    if (fn) return fn(...args);
}

export function safePopulateSlowMotionSensorModeDropdown(...args) {
    const fn = resolveGlobalFunction('populateSlowMotionSensorModeDropdown');
    if (fn) return fn(...args);
}

export function safePopulateFrameRateDropdown(...args) {
    const fn = resolveGlobalFunction('populateFrameRateDropdown');
    if (fn) return fn(...args);
}

export function safePopulateSlowMotionFrameRateDropdown(...args) {
    const fn = resolveGlobalFunction('populateSlowMotionFrameRateDropdown');
    if (fn) return fn(...args);
}

export function safeHandleMountVoltageInputChange(...args) {
    const fn = resolveGlobalFunction('handleMountVoltageInputChange');
    if (fn) return fn(...args);
}

export function safeNormalizeAutoGearScenarioPrimary(...args) {
    const fn = resolveGlobalFunction('normalizeAutoGearScenarioPrimary');
    if (fn) return fn(...args);
}

export function safeNormalizeAutoGearScenarioMultiplier(...args) {
    const fn = resolveGlobalFunction('normalizeAutoGearScenarioMultiplier');
    if (fn) return fn(...args);
}

export function safeRemoveAutoGearCondition(...args) {
    const fn = resolveGlobalFunction('removeAutoGearCondition');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearConditionShortcut(...args) {
    const fn = resolveGlobalFunction('handleAutoGearConditionShortcut');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearImportSelection(...args) {
    const fn = resolveGlobalFunction('handleAutoGearImportSelection');
    if (fn) return fn(...args);
}

export function safeSetAutoGearSearchQuery(...args) {
    const fn = resolveGlobalFunction('setAutoGearSearchQuery');
    if (fn) return fn(...args);
}

export function safeSetAutoGearScenarioFilter(...args) {
    const fn = resolveGlobalFunction('setAutoGearScenarioFilter');
    if (fn) return fn(...args);
}

export function safeClearAutoGearFilters(...args) {
    const fn = resolveGlobalFunction('clearAutoGearFilters');
    if (fn) return fn(...args);
}

export function safeSetAutoGearSummaryFocus(...args) {
    const fn = resolveGlobalFunction('setAutoGearSummaryFocus');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearPresetSelection(...args) {
    const fn = resolveGlobalFunction('handleAutoGearPresetSelection');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearSavePreset(...args) {
    const fn = resolveGlobalFunction('handleAutoGearSavePreset');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearDeletePreset(...args) {
    const fn = resolveGlobalFunction('handleAutoGearDeletePreset');
    if (fn) return fn(...args);
}

export function safeAddAutoGearDraftItem(...args) {
    const fn = resolveGlobalFunction('addAutoGearDraftItem');
    if (fn) return fn(...args);
}

export function safeSaveAutoGearRuleFromEditor(...args) {
    const fn = resolveGlobalFunction('saveAutoGearRuleFromEditor');
    if (fn) return fn(...args);
}

export function safeCloseAutoGearEditor(...args) {
    const fn = resolveGlobalFunction('closeAutoGearEditor');
    if (fn) return fn(...args);
}

export function safeRenderAutoGearDraftLists(...args) {
    const fn = resolveGlobalFunction('renderAutoGearDraftLists');
    if (fn) return fn(...args);
}

export function safeDuplicateAutoGearRule(...args) {
    const fn = resolveGlobalFunction('duplicateAutoGearRule');
    if (fn) return fn(...args);
}

export function safeInvokeSessionOpenAutoGearEditor(...args) {
    const fn = resolveGlobalFunction('invokeSessionOpenAutoGearEditor');
    if (fn) return fn(...args);
}

export function safeUpdateAutoGearBackupRestoreButtonState(...args) {
    const fn = resolveGlobalFunction('updateAutoGearBackupRestoreButtonState');
    if (fn) return fn(...args);
}

export function safeHandleAutoGearShowBackupsToggle(...args) {
    const fn = resolveGlobalFunction('handleAutoGearShowBackupsToggle');
    if (fn) return fn(...args);
}

export function safeRestoreAutoGearBackup(...args) {
    const fn = resolveGlobalFunction('restoreAutoGearBackup');
    if (fn) return fn(...args);
}

export function safeSyncAutoGearMonitorFieldVisibility(...args) {
    const fn = resolveGlobalFunction('syncAutoGearMonitorFieldVisibility');
    if (fn) return fn(...args);
}

export function safeUpdateAutoGearMonitorCatalogOptions(...args) {
    const fn = resolveGlobalFunction('updateAutoGearMonitorCatalogOptions');
    if (fn) return fn(...args);
}

export function safeClearAutoGearDraftItemEdit(...args) {
    const fn = resolveGlobalFunction('clearAutoGearDraftItemEdit');
    if (fn) return fn(...args);
}

export function safeUpdateAutoGearCatalogOptions(...args) {
    const fn = resolveGlobalFunction('updateAutoGearCatalogOptions');
    if (fn) return fn(...args);
}

export function safeBeginAutoGearDraftItemEdit(...args) {
    const fn = resolveGlobalFunction('beginAutoGearDraftItemEdit');
    if (fn) return fn(...args);
}
