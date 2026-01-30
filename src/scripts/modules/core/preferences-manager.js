/**
 * Preferences Manager
 * Handles loading and applying user preferences from storage
 */

/**
 * Apply preferences from storage
 * @param {Function} safeGetItem - Function to safely get items from storage
 * @param {Object} dependencies - Dependencies object containing functions and elements
 * @returns {Object} Applied preferences summary
 */
function applyPreferencesFromStorage(safeGetItem, dependencies = {}) {
    if (typeof safeGetItem !== 'function') {
        return { showAutoBackups: false, accentColor: null, language: null };
    }

    const {
        temperaturePreferenceStorageKey,
        applyTemperatureUnitPreferenceWithFallback,
        FOCUS_SCALE_STORAGE_KEY_NAME,
        normalizeFocusScale,
        applyFocusScalePreference,
        settingsFocusScale,
        rememberSettingsFocusScaleBaseline,
        setThemePreference,
        PINK_MODE_STORAGE_KEY,
        LEGACY_PINK_MODE_STORAGE_KEY,
        applyPinkMode,
        applyHighContrast,
        applyReduceMotion,
        applyRelaxedSpacing,
        accentColorInput,
        updateAccentColorResetButtonState,
        getMountVoltageStorageKeyName,
        getMountVoltageStorageBackupKeyName,
        parseStoredMountVoltages,
        applySessionMountVoltagePreferences,
        getSessionRuntimeFunction,
        warnMissingMountVoltageHelper,
        rememberSettingsMountVoltagesBaseline,
    } = dependencies;

    // Restore temperature unit
    const restoredTemperatureUnit = safeGetItem(temperaturePreferenceStorageKey);
    if (restoredTemperatureUnit && typeof applyTemperatureUnitPreferenceWithFallback === 'function') {
        try {
            applyTemperatureUnitPreferenceWithFallback(restoredTemperatureUnit, { persist: false });
        } catch (error) {
            console.warn('Failed to apply restored temperature unit preference', error);
        }
    }

    // Restore focus scale
    const focusScaleStorageKey =
        (typeof FOCUS_SCALE_STORAGE_KEY_NAME === 'string' && FOCUS_SCALE_STORAGE_KEY_NAME)
        || (typeof globalThis !== 'undefined'
            && globalThis
            && typeof globalThis.FOCUS_SCALE_STORAGE_KEY_NAME === 'string'
            && globalThis.FOCUS_SCALE_STORAGE_KEY_NAME)
        || 'cameraPowerPlanner_focusScale';

    const storedFocusScale = safeGetItem(focusScaleStorageKey);
    let restoredFocusScale = null;
    if (storedFocusScale) {
        let normalizedFocusScale = null;
        if (typeof normalizeFocusScale === 'function') {
            try {
                normalizedFocusScale = normalizeFocusScale(storedFocusScale);
            } catch (error) {
                console.warn('Failed to normalize restored focus scale preference', error);
            }
        }
        if (typeof normalizedFocusScale !== 'string' || !normalizedFocusScale) {
            normalizedFocusScale =
                typeof storedFocusScale === 'string' ? storedFocusScale.trim().toLowerCase() : '';
        }

        if (normalizedFocusScale === 'metric' || normalizedFocusScale === 'imperial') {
            restoredFocusScale = normalizedFocusScale;
            try {
                if (typeof applyFocusScalePreference === 'function') {
                    applyFocusScalePreference(normalizedFocusScale, { persist: false, forceUpdate: true });
                }
            } catch (error) {
                console.warn('Failed to apply restored focus scale preference', error);
            }

            // Update session focus scale
            if (dependencies.sessionFocusScale !== undefined) {
                dependencies.sessionFocusScale = normalizedFocusScale;
            }

            try {
                if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
                    settingsFocusScale.value = normalizedFocusScale;
                }
            } catch (error) {
                console.warn('Failed to sync restored focus scale selection', error);
            }

            if (typeof rememberSettingsFocusScaleBaseline === 'function') {
                try {
                    rememberSettingsFocusScaleBaseline();
                } catch (error) {
                    console.warn('Failed to update focus scale baseline after restore', error);
                }
            }

            if (typeof globalThis !== 'undefined' && globalThis) {
                try {
                    globalThis.focusScalePreference = normalizedFocusScale;
                } catch (error) {
                    console.warn('Failed to update global focus scale preference', error);
                }
            }

            if (typeof dependencies.focusScalePreference !== 'undefined') {
                try {
                    dependencies.focusScalePreference = normalizedFocusScale;
                } catch (error) {
                    console.warn('Failed to update scoped focus scale preference', error);
                }
            }
        }
    }

    // Restore theme preferences
    try {
        if (typeof setThemePreference === 'function') {
            setThemePreference(safeGetItem('darkMode') === 'true', { persist: true });
        }
    } catch (error) {
        console.warn('Failed to apply restored dark mode preference', error);
    }
    try {
        if (typeof applyPinkMode === 'function') {
            let storedPinkMode = safeGetItem(PINK_MODE_STORAGE_KEY);
            if (storedPinkMode === null || storedPinkMode === undefined || storedPinkMode === '') {
                storedPinkMode = safeGetItem(LEGACY_PINK_MODE_STORAGE_KEY);
            }
            applyPinkMode(storedPinkMode === 'true');
        }
    } catch (error) {
        console.warn('Failed to apply restored pink mode preference', error);
    }
    try {
        if (typeof applyHighContrast === 'function') {
            applyHighContrast(safeGetItem('highContrast') === 'true');
        }
    } catch (error) {
        console.warn('Failed to apply restored high contrast preference', error);
    }
    try {
        if (typeof applyReduceMotion === 'function') {
            applyReduceMotion(safeGetItem('reduceMotion') === 'true');
        }
    } catch (error) {
        console.warn('Failed to apply restored reduce motion preference', error);
    }
    try {
        if (typeof applyRelaxedSpacing === 'function') {
            applyRelaxedSpacing(safeGetItem('relaxedSpacing') === 'true');
        }
    } catch (error) {
        console.warn('Failed to apply restored relaxed spacing preference', error);
    }

    // Restore auto backups visibility and accent color
    const showBackups = safeGetItem('showAutoBackups') === 'true';
    const color = safeGetItem('accentColor');
    if (color) {
        try {
            document.documentElement.style.setProperty('--accent-color', color);
            document.documentElement.style.setProperty('--link-color', color);
        } catch (error) {
            console.warn('Failed to apply restored accent color', error);
        }
        if (dependencies.accentColor !== undefined) {
            dependencies.accentColor = color;
        }
        if (dependencies.prevAccentColor !== undefined) {
            dependencies.prevAccentColor = color;
        }
        if (accentColorInput) {
            accentColorInput.value = color;
        }
        if (typeof updateAccentColorResetButtonState === 'function') {
            updateAccentColorResetButtonState();
        }
    }

    const language = safeGetItem('language');

    // Restore mount voltage preferences
    try {
        const mountVoltageKeyName =
            typeof getMountVoltageStorageKeyName === 'function'
                ? getMountVoltageStorageKeyName()
                : 'cameraPowerPlanner_mountVoltages';
        const storedVoltages = safeGetItem(mountVoltageKeyName);
        let parsedVoltages = parseStoredMountVoltages ? parseStoredMountVoltages(storedVoltages) : null;
        let shouldPersistVoltages = false;

        if (!parsedVoltages) {
            const backupKey =
                typeof getMountVoltageStorageBackupKeyName === 'function'
                    ? getMountVoltageStorageBackupKeyName()
                    : `${mountVoltageKeyName}__backup`;
            const backupVoltages = safeGetItem(backupKey);
            if (backupVoltages !== undefined && backupVoltages !== null) {
                const parsedBackupVoltages = parseStoredMountVoltages ? parseStoredMountVoltages(backupVoltages) : null;
                if (parsedBackupVoltages) {
                    parsedVoltages = parsedBackupVoltages;
                    shouldPersistVoltages = true;
                }
            }
        }

        if (parsedVoltages && typeof applySessionMountVoltagePreferences === 'function') {
            applySessionMountVoltagePreferences(parsedVoltages, { persist: shouldPersistVoltages, triggerUpdate: true });
            const updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction ? getSessionRuntimeFunction('updateMountVoltageInputsFromState') : null;
            if (updateMountVoltageInputsFromStateFn) {
                try {
                    updateMountVoltageInputsFromStateFn();
                } catch (updateError) {
                    if (typeof warnMissingMountVoltageHelper === 'function') {
                        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
                    }
                }
            } else {
                if (typeof warnMissingMountVoltageHelper === 'function') {
                    warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
                }
            }
            if (typeof rememberSettingsMountVoltagesBaseline === 'function') {
                rememberSettingsMountVoltagesBaseline();
            }
        }
    } catch (voltageError) {
        console.warn('Failed to apply restored mount voltage preferences', voltageError);
    }

    return {
        showAutoBackups: showBackups,
        accentColor: color || null,
        language: language || null,
        focusScale: restoredFocusScale,
    };
}

/**
 * Capture current setup selection state
 * @param {Object} elements - DOM elements object
 * @returns {Object} Current setup selection
 */
function captureSetupSelection(elements = {}) {
    const { setupSelect, setupNameInput } = elements;
    return {
        value: setupSelect ? setupSelect.value : '',
        name: setupNameInput ? setupNameInput.value : '',
    };
}

/**
 * Restore setup selection state
 * @param {Object} previousSelection - Previous selection state
 * @param {boolean} shouldShowAutoBackups - Whether to show auto backups
 * @param {Object} elements - DOM elements object
 */
function restoreSetupSelection(previousSelection, shouldShowAutoBackups, elements = {}) {
    if (!previousSelection || typeof previousSelection !== 'object') {
        return;
    }

    const { value = '', name = '' } = previousSelection;
    const { setupSelect, setupNameInput } = elements;

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

export const PreferencesManager = {
    applyPreferencesFromStorage,
    captureSetupSelection,
    restoreSetupSelection,
};
