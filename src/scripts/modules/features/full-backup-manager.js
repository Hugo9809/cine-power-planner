/**
 * Full Backup Manager
 *
 * Manages the creation of full application backups, including settings, session data,
 * project data, and diagnostics.
 *
 * Extracted from app-session.js.
 */

import {
    resolveSafeLocalStorage,
    formatFullBackupFilename,
    captureStorageSnapshot,
    downloadBackupPayload
} from './backup.js';

import {
    isPlainObject
} from '../ui/ui-preferences.js';

import {
    getNotificationAccentColor,
    getNotificationTextColor,
    showNotification
} from '../ui/notifications.js';

import {
    normalizeVersionValue
} from '../core/session-runtime.js';

// --- Constants & Config ---

const backupFallbackLoaders = [
    {
        key: 'devices',
        loaderName: 'loadDeviceData',
        isValid: value => value === null || isPlainObject(value),
        loader: () => (typeof loadDeviceData === 'function' ? loadDeviceData() : undefined),
    },
    {
        key: 'setups',
        loaderName: 'loadSetups',
        isValid: value => isPlainObject(value),
        loader: () => (typeof loadSetups === 'function' ? loadSetups() : undefined),
    },
    {
        key: 'session',
        loaderName: 'loadSessionState',
        isValid: value => value === null || isPlainObject(value),
        loader: () => (typeof loadSessionState === 'function' ? loadSessionState() : undefined),
    },
    {
        key: 'feedback',
        loaderName: 'loadFeedback',
        isValid: value => value === null || isPlainObject(value),
        loader: () => (typeof loadFeedback === 'function' ? loadFeedback() : undefined),
    },
    {
        key: 'project',
        loaderName: 'loadProject',
        isValid: value => isPlainObject(value),
        loader: () => (typeof loadProject === 'function' ? loadProject() : undefined),
    },
    {
        key: 'favorites',
        loaderName: 'loadFavorites',
        isValid: value => isPlainObject(value),
        loader: () => (typeof loadFavorites === 'function' ? loadFavorites() : undefined),
    },
    {
        key: 'documentationTracker',
        loaderName: 'loadDocumentationTracker',
        isValid: value =>
            value === null
            || (isPlainObject(value) && Array.isArray(value.releases))
            || Array.isArray(value),
        loader: () =>
        (typeof loadDocumentationTracker === 'function'
            ? loadDocumentationTracker()
            : undefined),
    },
    {
        key: 'autoGearBackups',
        loaderName: 'loadAutoGearBackups',
        isValid: value => Array.isArray(value),
        loader: () => (typeof loadAutoGearBackups === 'function' ? loadAutoGearBackups() : undefined),
    },
    {
        key: 'autoGearPresets',
        loaderName: 'loadAutoGearPresets',
        isValid: value => Array.isArray(value),
        loader: () => (typeof loadAutoGearPresets === 'function' ? loadAutoGearPresets() : undefined),
    },
    {
        key: 'autoGearMonitorDefaults',
        loaderName: 'loadAutoGearMonitorDefaults',
        isValid: value => isPlainObject(value),
        loader: () => (
            typeof loadAutoGearMonitorDefaults === 'function'
                ? loadAutoGearMonitorDefaults()
                : undefined
        ),
    },
    {
        key: 'autoGearSeeded',
        loaderName: 'loadAutoGearSeedFlag',
        isValid: value => typeof value === 'boolean',
        loader: () => (typeof loadAutoGearSeedFlag === 'function' ? loadAutoGearSeedFlag() : undefined),
    },
    {
        key: 'autoGearActivePresetId',
        loaderName: 'loadAutoGearActivePresetId',
        isValid: value => typeof value === 'string',
        loader: () => (typeof loadAutoGearActivePresetId === 'function'
            ? loadAutoGearActivePresetId()
            : undefined),
    },
    {
        key: 'autoGearAutoPresetId',
        loaderName: 'loadAutoGearAutoPresetId',
        isValid: value => typeof value === 'string',
        loader: () => (typeof loadAutoGearAutoPresetId === 'function'
            ? loadAutoGearAutoPresetId()
            : undefined),
    },
    {
        key: 'autoGearShowBackups',
        loaderName: 'loadAutoGearBackupVisibility',
        isValid: value => typeof value === 'boolean',
        loader: () => (typeof loadAutoGearBackupVisibility === 'function'
            ? loadAutoGearBackupVisibility()
            : undefined),
    },
    {
        key: 'autoGearBackupRetention',
        loaderName: 'loadAutoGearBackupRetention',
        isValid: value => typeof value === 'number' && Number.isFinite(value),
        loader: () => (typeof loadAutoGearBackupRetention === 'function'
            ? loadAutoGearBackupRetention()
            : undefined),
    },
    {
        key: 'fullBackupHistory',
        loaderName: 'loadFullBackupHistory',
        isValid: value => Array.isArray(value),
        loader: () => (typeof loadFullBackupHistory === 'function' ? loadFullBackupHistory() : undefined),
    },
];

// --- Helpers ---

function describeError(error) {
    if (!error) {
        return null;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (typeof error.message === 'string' && error.message.trim()) {
        return error.message;
    }
    try {
        return JSON.stringify(error);
    } catch (serializationError) {
        void serializationError;
    }
    try {
        return String(error);
    } catch (stringifyError) {
        void stringifyError;
    }
    return null;
}

function recordDiagnostic(diagnostics, section, status, options = {}) {
    if (!Array.isArray(diagnostics)) {
        return;
    }
    const entry = { section, status };
    if (options.source && typeof options.source === 'string') {
        entry.source = options.source;
    }
    if (typeof options.message === 'string') {
        const trimmedMessage = options.message.trim();
        if (trimmedMessage) {
            entry.message = trimmedMessage;
        }
    }
    diagnostics.push(entry);
}

function applyBackupFallbacks(target, diagnostics) {
    if (!target || typeof target !== 'object') {
        return;
    }

    backupFallbackLoaders.forEach(({ key, loader, loaderName, isValid }) => {
        const currentValue = target[key];
        if (isValid(currentValue)) {
            return;
        }
        if (typeof loader !== 'function') {
            return;
        }
        try {
            const fallbackValue = loader();
            if (fallbackValue === undefined) {
                recordDiagnostic(diagnostics, key, 'missing', { source: loaderName });
                return;
            }
            target[key] = fallbackValue;
            recordDiagnostic(diagnostics, key, 'recovered', { source: loaderName });
        } catch (error) {
            console.warn(`Failed to recover ${key} for full backup`, error);
            const message = describeError(error);
            recordDiagnostic(diagnostics, key, 'error', { source: loaderName, message });
        }
    });
}

function mergeAutoGearRuleLists(primary, secondary) {
    const baseList = Array.isArray(primary) ? primary.slice() : [];
    if (!Array.isArray(secondary) || !secondary.length) {
        return { combined: baseList, changed: false };
    }

    const existingIds = new Set(
        baseList
            .map(entry => (entry && typeof entry.id === 'string' ? entry.id : null))
            .filter(Boolean),
    );

    let changed = false;
    secondary.forEach(entry => {
        if (!entry) {
            return;
        }
        const identifier = entry && typeof entry.id === 'string' ? entry.id : null;
        if (identifier && existingIds.has(identifier)) {
            return;
        }
        if (identifier) {
            existingIds.add(identifier);
        }
        baseList.push(entry);
        changed = true;
    });

    return { combined: baseList, changed };
}

// --- Main Backup Logic ---

export async function collectFullBackupData() {
    const diagnostics = [];
    let rawData = {};
    let exportAttempted = false;
    let exportFailed = false;

    if (typeof prepareBackupForExport === 'function') {
        try {
            await prepareBackupForExport();
        } catch (e) {
            console.warn('Failed to prepare backup vault cache', e);
        }
    }

    if (typeof exportAllData === 'function') {
        exportAttempted = true;
        try {
            rawData = exportAllData();
        } catch (error) {
            exportFailed = true;
            console.warn('Failed to collect planner data for full backup', error);
            const message = describeError(error);
            recordDiagnostic(diagnostics, 'exportAllData', 'error', {
                source: 'exportAllData',
                message,
            });
            rawData = {};
        }
    } else {
        recordDiagnostic(diagnostics, 'exportAllData', 'missing', { source: 'exportAllData' });
    }

    let data = {};
    if (isPlainObject(rawData)) {
        data = { ...rawData };
    } else if (exportAttempted && !exportFailed && rawData && typeof rawData === 'object') {
        data = { ...rawData };
        recordDiagnostic(diagnostics, 'exportAllData', 'coerced', { source: 'exportAllData' });
    } else {
        if (exportAttempted && !exportFailed) {
            recordDiagnostic(diagnostics, 'exportAllData', 'invalid', { source: 'exportAllData' });
        }
        data = {};
    }

    applyBackupFallbacks(data, diagnostics);

    if (!Array.isArray(data.autoGearRules)) {
        let rules = null;
        let ruleSource = '';
        let recovered = false;
        if (typeof getBaseAutoGearRules === 'function') {
            try {
                const baseRules = getBaseAutoGearRules();
                if (Array.isArray(baseRules)) {
                    rules = baseRules.slice();
                    ruleSource = 'getBaseAutoGearRules';
                    recovered = true;
                }
            } catch (error) {
                console.warn('Failed to capture automatic gear rules from state for full backup', error);
                const message = describeError(error);
                recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
                    source: 'getBaseAutoGearRules',
                    message,
                });
            }
        }

        let storedRules = null;
        if (typeof loadAutoGearRules === 'function') {
            try {
                storedRules = loadAutoGearRules();
            } catch (error) {
                console.warn('Failed to load automatic gear rules from storage for full backup', error);
                const message = describeError(error);
                recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
                    source: 'loadAutoGearRules',
                    message,
                });
            }
        }

        if (Array.isArray(storedRules) && storedRules.length) {
            if (!Array.isArray(rules) || !rules.length) {
                rules = storedRules;
                ruleSource = 'loadAutoGearRules';
                recovered = true;
            } else {
                const { combined, changed } = mergeAutoGearRuleLists(rules, storedRules);
                rules = combined;
                if (changed) {
                    recovered = true;
                    ruleSource = ruleSource ? `${ruleSource}+loadAutoGearRules` : 'loadAutoGearRules';
                }
            }
        }

        if (Array.isArray(rules)) {
            data.autoGearRules = rules;
            recordDiagnostic(diagnostics, 'autoGearRules', recovered ? 'recovered' : 'preserved', {
                source: ruleSource || (Array.isArray(storedRules) && storedRules.length ? 'loadAutoGearRules' : ''),
            });
        } else {
            data.autoGearRules = [];
            recordDiagnostic(diagnostics, 'autoGearRules', 'defaulted');
        }
    }

    return { data, diagnostics };
}

export async function buildSettingsBackupPackage(timestamp = new Date()) {
    const { iso, fileName } = formatFullBackupFilename(timestamp);
    const safeStorage = resolveSafeLocalStorage();
    const settings = captureStorageSnapshot(safeStorage);
    const sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    const { data: backupData, diagnostics } = await collectFullBackupData();
    const backupVersion =
        (typeof ACTIVE_APP_VERSION !== 'undefined' ? ACTIVE_APP_VERSION : null)
        || normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null);
    const backup = {
        version: backupVersion || undefined,
        generatedAt: iso,
        settings,
        sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
        data: backupData || {},
    };

    // [Debug] Log export stats
    const dataKeys = backup.data ? Object.keys(backup.data) : [];
    console.log(`[Backup] Generated package with ${dataKeys.length} keys`, dataKeys);
    if (dataKeys.length === 0) {
        console.warn('[Backup] Warning: Backup data object is empty.');
    }

    if (Array.isArray(diagnostics) && diagnostics.length) {
        backup.diagnostics = diagnostics;
    }
    const payload = JSON.stringify(backup);

    return {
        fileName,
        payload,
        iso,
        backup,
        diagnostics,
    };
}

export async function performSettingsBackup(notify = true, timestamp = new Date(), options = {}) {
    try {
        const config = typeof options === 'object' && options !== null ? options : {};
        const isEvent = notify && typeof notify === 'object' && typeof notify.type === 'string';
        const shouldNotify = config.deferDownload ? false : (isEvent ? true : Boolean(notify));
        const { fileName, payload, iso } = await buildSettingsBackupPackage(timestamp);

        if (config.deferDownload) {
            return {
                fileName,
                payload,
                createdAt: iso,
            };
        }

        const downloadResult = downloadBackupPayload(payload, fileName);
        if (!downloadResult || (!downloadResult.success && !downloadResult.queued)) {
            throw new Error('No supported download method available');
        }

        if (downloadResult.success) {
            try {
                if (typeof recordFullBackupHistoryEntry === 'function') {
                    recordFullBackupHistoryEntry({ createdAt: iso, fileName });
                } else if (typeof window !== 'undefined' && typeof window.recordFullBackupHistoryEntry === 'function') {
                    window.recordFullBackupHistoryEntry({ createdAt: iso, fileName });
                }
            } catch (historyError) {
                console.warn('Failed to record full backup history entry', historyError);
            }
            if (downloadResult.method === 'window-fallback') {
                const manualMessage = typeof getManualDownloadFallbackMessage === 'function'
                    ? getManualDownloadFallbackMessage()
                    : 'Download started in a new window. Please save the file manually.';

                showNotification('warning', manualMessage);
                if (typeof window.cineShowAlertDialog === 'function') {
                    window.cineShowAlertDialog({
                        title: 'Download Blocked',
                        message: manualMessage
                    });
                } else if (typeof alert === 'function') {
                    alert(manualMessage);
                }
            } else if (shouldNotify) {
                showNotification('success', 'Full app backup downloaded');
            }
        } else if (downloadResult.queued && downloadResult.queueMessage) {
            showNotification('warning', downloadResult.queueMessage);
        }

        return { fileName, downloadResult };
    } catch (e) {
        console.warn('Backup failed', e);
        if (notify) {
            showNotification('error', 'Backup failed');
        }
        return null;
    }
}

export function createSettingsBackup(notifyOrEvent = true, timestamp = new Date()) {
    // Defensive: Handle case where called as event listener (1st arg is event)
    let notify = notifyOrEvent;
    let time = timestamp;

    const hasEventConstructor = typeof Event !== 'undefined';
    if (
        notifyOrEvent
        && typeof notifyOrEvent === 'object'
        && ((hasEventConstructor && notifyOrEvent instanceof Event)
            || (!hasEventConstructor && !!notifyOrEvent.type))
    ) {
        // Called as event listener
        notify = true;
        time = new Date();
    }

    return performSettingsBackup(notify, time).then(result => {
        return result ? result.fileName : null;
    });
} 
