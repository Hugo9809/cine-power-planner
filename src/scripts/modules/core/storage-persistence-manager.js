/**
 * Storage Persistence Manager
 * Handles browser storage persistence API and status rendering
 */

/**
 * Get storage manager instance from navigator
 * @returns {StorageManager|null} Storage manager or null
 */
function getStorageManagerInstance() {
    if (typeof navigator !== 'undefined' && navigator && typeof navigator.storage === 'object') {
        return navigator.storage;
    }
    return null;
}

/**
 * Format bytes as human-readable storage size
 * @param {number} bytes - Bytes to format
 * @param {string} lang - Language code for number formatting
 * @returns {string} Formatted string (e.g., "1.5 GB")
 */
function formatStoragePersistenceBytes(bytes, lang) {
    if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) {
        return '';
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let value = bytes;
    while (value >= 1024 && index < units.length - 1) {
        value /= 1024;
        index += 1;
    }
    let formatted = '';
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        try {
            const formatter = new Intl.NumberFormat(lang, {
                maximumFractionDigits: value >= 100 ? 0 : 1,
            });
            formatted = formatter.format(value);
        } catch (error) {
            console.warn('Unable to format storage size', error);
            formatted = value.toFixed(value >= 100 ? 0 : 1);
        }
    } else {
        formatted = value.toFixed(value >= 100 ? 0 : 1);
    }
    return `${formatted} ${units[index]}`;
}

/**
 * Check if Safari persistence incompatibility exists
 * @returns {boolean} True if Safari incompatibility detected
 */
function isSafariPersistenceIncompatibility() {
    if (typeof navigator === 'undefined' || !navigator) {
        return false;
    }

    const ua = navigator.userAgent || '';
    const isSafari = /Safari/i.test(ua) && !/Chrome/i.test(ua) && !/Chromium/i.test(ua);
    if (!isSafari) {
        return false;
    }

    const storageManager = getStorageManagerInstance();
    if (!storageManager || typeof storageManager.persist !== 'function') {
        return true;
    }

    return false;
}

/**
 * Log storage persistence estimate update
 * @param {Object} options - Logging options
 * @param {boolean} options.fromRequest - Whether triggered by user request
 * @param {Object} dependencies - Dependencies
 */
function logStoragePersistenceEstimateUpdate(options = {}, dependencies = {}) {
    const { fromRequest = false } = options || {};
    const {
        storagePersistenceState,
        getStoragePersistenceLangInfo,
        logSettingsEvent,
    } = dependencies;

    if (!storagePersistenceState) return;

    const quota =
        typeof storagePersistenceState.quota === 'number' && Number.isFinite(storagePersistenceState.quota)
            ? storagePersistenceState.quota
            : null;
    if (quota === null) {
        return;
    }

    const usage =
        typeof storagePersistenceState.usage === 'number' && Number.isFinite(storagePersistenceState.usage)
            ? storagePersistenceState.usage
            : null;
    const supported =
        typeof storagePersistenceState.supported === 'boolean' ? storagePersistenceState.supported : null;
    const persisted =
        typeof storagePersistenceState.persisted === 'boolean' ? storagePersistenceState.persisted : null;

    const { lang, langTexts, fallbackTexts } = getStoragePersistenceLangInfo ? getStoragePersistenceLangInfo() : { lang: 'en', langTexts: {}, fallbackTexts: {} };
    const quotaText = formatStoragePersistenceBytes(quota, lang);
    const usageText = usage !== null ? formatStoragePersistenceBytes(usage, lang) : '';

    let summary = '';
    if (usageText) {
        const template =
            (langTexts && langTexts.storagePersistenceUsage)
            || (fallbackTexts && fallbackTexts.storagePersistenceUsage)
            || '';
        summary = template.replace('{used}', usageText).replace('{quota}', quotaText);
    } else {
        const quotaTemplate =
            (langTexts && langTexts.loggingStorageQuotaOnly)
            || (fallbackTexts && fallbackTexts.loggingStorageQuotaOnly)
            || '';
        summary = quotaTemplate.replace('{quota}', quotaText);
    }

    const message =
        (langTexts && langTexts.loggingStorageEstimateUpdated)
        || (fallbackTexts && fallbackTexts.loggingStorageEstimateUpdated)
        || 'Storage estimate refreshed.';

    const unchanged =
        storagePersistenceState.lastLoggedUsage === usage
        && storagePersistenceState.lastLoggedQuota === quota
        && storagePersistenceState.lastLoggedSupported === supported
        && storagePersistenceState.lastLoggedPersisted === persisted
        && storagePersistenceState.lastLoggedSummary === summary;

    if (unchanged && !fromRequest) {
        return;
    }

    if (typeof logSettingsEvent === 'function') {
        logSettingsEvent(
            'info',
            message,
            {
                summary: summary || null,
                usageBytes: usage,
                usageDisplay: usageText || null,
                quotaBytes: quota,
                quotaDisplay: quotaText || null,
                supported,
                persisted,
                trigger: fromRequest ? 'user-request' : 'auto-refresh',
            },
            { source: 'storage-persistence' },
        );
    }

    storagePersistenceState.lastLoggedUsage = usage;
    storagePersistenceState.lastLoggedQuota = quota;
    storagePersistenceState.lastLoggedSupported = supported;
    storagePersistenceState.lastLoggedPersisted = persisted;
    storagePersistenceState.lastLoggedSummary = summary;
}

/**
 * Render storage persistence status to UI element
 * @param {Object} dependencies - Dependencies
 */
function renderStoragePersistenceStatus(dependencies = {}) {
    const {
        storagePersistenceStatusEl,
        storagePersistenceState,
        sessionStoragePersistenceRequestButton,
        getStoragePersistenceLangInfo,
    } = dependencies;

    if (!storagePersistenceStatusEl) return;

    const { lang, langTexts, fallbackTexts } = getStoragePersistenceLangInfo ? getStoragePersistenceLangInfo() : { lang: 'en', langTexts: {}, fallbackTexts: {} };
    let message = '';
    let state = 'idle';

    if (!storagePersistenceState) return;

    if (storagePersistenceState.requestInFlight) {
        state = 'requesting';
        message = langTexts.storagePersistenceStatusRequesting
            || fallbackTexts.storagePersistenceStatusRequesting
            || '';
    } else if (storagePersistenceState.checking) {
        state = 'checking';
        message = langTexts.storagePersistenceStatusChecking
            || fallbackTexts.storagePersistenceStatusChecking
            || '';
    } else if (storagePersistenceState.supported === false) {
        state = 'unsupported';
        message = langTexts.storagePersistenceStatusUnsupported
            || fallbackTexts.storagePersistenceStatusUnsupported
            || '';
    } else if (storagePersistenceState.persisted) {
        state = 'granted';
        message = langTexts.storagePersistenceStatusGranted
            || fallbackTexts.storagePersistenceStatusGranted
            || '';
    } else if (storagePersistenceState.lastError) {
        state = 'error';
        message = langTexts.storagePersistenceStatusError
            || fallbackTexts.storagePersistenceStatusError
            || '';
    } else if (storagePersistenceState.requestAttempted && storagePersistenceState.lastRequestDenied) {
        state = 'denied';
        message = langTexts.storagePersistenceStatusDenied
            || fallbackTexts.storagePersistenceStatusDenied
            || '';
    } else {
        state = 'idle';
        message = langTexts.storagePersistenceStatusIdle
            || fallbackTexts.storagePersistenceStatusIdle
            || '';
    }

    const parts = [message];
    if (state === 'denied' && isSafariPersistenceIncompatibility()) {
        const safariWarning = langTexts.storagePersistenceStatusSafariIncompatible
            || fallbackTexts.storagePersistenceStatusSafariIncompatible
            || '';
        if (safariWarning) {
            parts.push(safariWarning);
        }
    }
    if (typeof storagePersistenceState.usage === 'number') {
        const usedText = formatStoragePersistenceBytes(storagePersistenceState.usage, lang);
        if (usedText) {
            if (typeof storagePersistenceState.quota === 'number' && storagePersistenceState.quota > 0) {
                const quotaText = formatStoragePersistenceBytes(storagePersistenceState.quota, lang);
                const template = langTexts.storagePersistenceUsage
                    || fallbackTexts.storagePersistenceUsage
                    || '';
                if (template) {
                    parts.push(template.replace('{used}', usedText).replace('{quota}', quotaText || ''));
                } else if (quotaText) {
                    parts.push(`${usedText} / ${quotaText}`);
                } else {
                    parts.push(usedText);
                }
            } else {
                const template = langTexts.storagePersistenceUsageUnknown
                    || fallbackTexts.storagePersistenceUsageUnknown
                    || '';
                if (template) {
                    parts.push(template.replace('{used}', usedText));
                } else {
                    parts.push(usedText);
                }
            }
        }
    }

    const combined = parts.filter(Boolean).join(' ').trim();
    const output = combined || message || '';
    storagePersistenceStatusEl.textContent = output;
    storagePersistenceStatusEl.dataset.state = state;
    storagePersistenceStatusEl.setAttribute('data-state', state);
    if (output) {
        storagePersistenceStatusEl.setAttribute('data-help', output);
    } else {
        storagePersistenceStatusEl.removeAttribute('data-help');
    }
    if (sessionStoragePersistenceRequestButton) {
        const shouldDisable = !storagePersistenceStatusEl
            || storagePersistenceState.supported === false
            || storagePersistenceState.persisted
            || storagePersistenceState.requestInFlight
            || storagePersistenceState.checking;
        sessionStoragePersistenceRequestButton.disabled = shouldDisable;
        sessionStoragePersistenceRequestButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
        const requestLabel = langTexts.storagePersistenceRequest
            || fallbackTexts.storagePersistenceRequest
            || sessionStoragePersistenceRequestButton.dataset.defaultLabel
            || sessionStoragePersistenceRequestButton.textContent
            || '';
        const requestHelp = langTexts.storagePersistenceRequestHelp
            || fallbackTexts.storagePersistenceRequestHelp
            || requestLabel;
        if (requestHelp) {
            sessionStoragePersistenceRequestButton.setAttribute('data-help', requestHelp);
            sessionStoragePersistenceRequestButton.setAttribute('title', requestHelp);
            sessionStoragePersistenceRequestButton.setAttribute('aria-label', requestHelp);
        }
    }

    if (typeof storagePersistenceStatusEl.dispatchEvent === 'function') {
        try {
            let event;
            const detail = { state, message: output, rawMessage: message };
            if (typeof CustomEvent === 'function') {
                event = new CustomEvent('storagepersistencechange', { detail });
            } else if (storagePersistenceStatusEl.ownerDocument && typeof storagePersistenceStatusEl.ownerDocument.createEvent === 'function') {
                event = storagePersistenceStatusEl.ownerDocument.createEvent('CustomEvent');
                event.initCustomEvent('storagepersistencechange', false, false, detail);
            }
            if (event) {
                storagePersistenceStatusEl.dispatchEvent(event);
            }
        } catch (eventError) {
            console.warn('Unable to broadcast storage persistence status change', eventError);
        }
    }
}

export const StoragePersistenceManager = {
    getStorageManagerInstance,
    formatStoragePersistenceBytes,
    isSafariPersistenceIncompatibility,
    logStoragePersistenceEstimateUpdate,
    renderStoragePersistenceStatus,
};
