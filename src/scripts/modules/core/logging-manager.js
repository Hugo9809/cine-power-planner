
/**
 * Logging Manager Module
 * Handles the display, filtering, and export of application diagnostic logs.
 */

const LOGGING_LEVEL_PRIORITY = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};

const LOGGING_HISTORY_MIN = 50;
const LOGGING_HISTORY_MAX = 2000;
const LOGGING_EXPORT_STATUS_RESET_DELAY = 6000;

const loggingState = {
    initialized: false,
    loggingApi: null,
    unsubscribeHistory: null,
    unsubscribeConfig: null,
    retryTimer: null,
    renderScheduled: false,
    levelFilter: 'all',
    namespaceFilter: '',
    config: null,
    namespaceDebounce: null,
    statusResetTimer: null,
    degraded: false,
    dom: {} // Will hold references to DOM elements
};

// --- Helpers ---

function resolveGlobal(name) {
    if (typeof window !== 'undefined' && window[name]) return window[name];
    if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
    return null;
}



function getLoggingLangInfo() {
    const texts = resolveGlobal('texts') || {};
    const currentLang = resolveGlobal('currentLang') || 'en';
    const fallbackTexts = texts.en || {};
    const langTexts = texts[currentLang] || fallbackTexts;
    return { lang: currentLang, langTexts, fallbackTexts };
}

function resolveLoggingApi() {
    if (loggingState.loggingApi && typeof loggingState.loggingApi.getHistory === 'function') {
        return loggingState.loggingApi;
    }

    const scopes = [];
    if (typeof globalThis !== 'undefined') scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);

    for (const scope of scopes) {
        if (!scope || typeof scope.cineLogging !== 'object') continue;
        const candidate = scope.cineLogging;
        if (typeof candidate.getHistory === 'function' && typeof candidate.subscribe === 'function') {
            loggingState.loggingApi = candidate;
            return candidate;
        }
    }
    return null;
}

function describeError(error) {
    if (!error) return 'Unknown error';
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
}

function logSettingsEvent(level, message, details, meta) {
    const logging = resolveLoggingApi();
    if (logging && typeof logging.log === 'function') {
        logging.log(level, message, details, meta);
    }
}

function showNotification(level, message) {
    const globalNotify = resolveGlobal('showNotification');
    if (typeof globalNotify === 'function') {
        globalNotify(level, message);
    } else {
        console.log(`[Notification ${level}] ${message}`);
    }
}

function cloneLoggingExportValue(value) {
    if (value === null || typeof value !== 'object') return value;
    const SESSION_DEEP_CLONE = resolveGlobal('SESSION_DEEP_CLONE');
    if (typeof SESSION_DEEP_CLONE === 'function') {
        try { return SESSION_DEEP_CLONE(value); } catch { }
    }
    try { return JSON.parse(JSON.stringify(value)); } catch { }
    if (Array.isArray(value)) return value.slice();
    return { ...value };
}

function formatLogDetailValue(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

function createLogDetailsElement(label, value) {
    const details = document.createElement('details');
    details.className = 'log-entry-details';
    const summary = document.createElement('summary');
    summary.textContent = label;
    const pre = document.createElement('pre');
    pre.className = 'log-entry-detail';
    pre.textContent = formatLogDetailValue(value);
    details.appendChild(summary);
    details.appendChild(pre);
    return details;
}

function formatLogTimestamp(entry, langTexts, fallbackTexts) {
    const lang = getLoggingLangInfo().lang;
    const timestamp = typeof entry.timestamp === 'number' && Number.isFinite(entry.timestamp) ? entry.timestamp : null;
    let localText = '';

    if (timestamp != null) {
        const date = new Date(timestamp);
        if (!Number.isNaN(date.getTime())) {
            try {
                if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
                    const formatter = new Intl.DateTimeFormat(lang, { dateStyle: 'short', timeStyle: 'medium' });
                    localText = formatter.format(date);
                } else {
                    localText = date.toLocaleString();
                }
            } catch (e) {
                console.warn('Unable to format timestamp', e);
                localText = date.toISOString();
            }
        }
    }

    const iso = typeof entry.isoTimestamp === 'string' && entry.isoTimestamp
        ? entry.isoTimestamp
        : (timestamp != null ? new Date(timestamp).toISOString() : '');

    if (localText && iso && iso !== localText) {
        const template = langTexts.loggingTimestampCombined || fallbackTexts.loggingTimestampCombined || '{local} ({iso})';
        return template.replace('{local}', localText).replace('{iso}', iso);
    }
    return localText || iso || '';
}

function sanitizeLoggingFileSegment(segment) {
    if (typeof segment !== 'string') return '';
    const trimmed = segment.trim();
    if (!trimmed) return '';
    return trimmed.replace(/[^A-Za-z0-9.-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function buildLoggingExportMetadata(date = new Date()) {
    let referenceDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
    let isoTimestamp = '';
    try { isoTimestamp = referenceDate.toISOString(); } catch { isoTimestamp = ''; }

    if (!isoTimestamp) {
        referenceDate = new Date();
        isoTimestamp = String(Date.now());
    }

    const stampSource = isoTimestamp || String(Date.now());
    const sanitizedStamp = sanitizeLoggingFileSegment(stampSource.replace(/[:.]/g, '-')) || String(Date.now());

    const appVer = resolveGlobal('ACTIVE_APP_VERSION') || resolveGlobal('APP_VERSION') || '';
    const sanitizedVersion = sanitizeLoggingFileSegment(appVer);

    const parts = ['cine-power-planner-log'];
    if (sanitizedVersion) parts.push(`v${sanitizedVersion}`);
    parts.push(sanitizedStamp);

    const timezoneOffsetMinutes = typeof referenceDate.getTimezoneOffset === 'function' ? 0 - referenceDate.getTimezoneOffset() : null;

    return {
        isoTimestamp,
        timezoneOffsetMinutes,
        fileName: `${parts.join('-')}.json`
    };
}

function setLoggingStatusKey(key) {
    if (!loggingState.dom.loggingStatusEl) return;

    if (loggingState.statusResetTimer != null) {
        clearTimeout(loggingState.statusResetTimer);
        loggingState.statusResetTimer = null;
    }

    const { langTexts, fallbackTexts } = getLoggingLangInfo();
    const text = (langTexts && langTexts[key]) || (fallbackTexts && fallbackTexts[key]) || '';

    loggingState.dom.loggingStatusEl.textContent = text;
    if (text) {
        loggingState.dom.loggingStatusEl.setAttribute('data-help', text);
    } else {
        loggingState.dom.loggingStatusEl.removeAttribute('data-help');
    }
}

function scheduleLoggingStatusReset(delay = 5000, fallbackKey = 'loggingStatusIdle') {
    if (loggingState.statusResetTimer != null) {
        clearTimeout(loggingState.statusResetTimer);
        loggingState.statusResetTimer = null;
    }
    const timeout = typeof delay === 'number' && Number.isFinite(delay) ? Math.max(0, delay) : 5000;
    loggingState.statusResetTimer = setTimeout(() => {
        loggingState.statusResetTimer = null;
        if (fallbackKey) setLoggingStatusKey(fallbackKey);
    }, timeout);
}

function setLoggingControlsDisabled(disabled) {
    const {
        loggingLevelFilterEl, loggingNamespaceFilterEl, loggingHistoryLimitInput,
        loggingConsoleOutputInput, loggingCaptureConsoleInput, loggingCaptureErrorsInput,
        loggingPersistSessionInput, sessionLoggingExportButton
    } = loggingState.dom;

    const inputs = [
        loggingLevelFilterEl, loggingNamespaceFilterEl, loggingHistoryLimitInput,
        loggingConsoleOutputInput, loggingCaptureConsoleInput, loggingCaptureErrorsInput,
        loggingPersistSessionInput, sessionLoggingExportButton
    ];

    inputs.forEach(input => {
        if (!input) return;
        input.disabled = !!disabled;
        input.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    });
}

function sanitizeLoggingConfigPartial(partial) {
    if (!partial || typeof partial !== 'object') return null;
    const MAX_STRING_LENGTH = 64;
    const summary = {};

    try {
        summary.keys = Object.keys(partial).slice(0, 20);
        summary.values = summary.keys.reduce((acc, key) => {
            const value = partial[key];
            if (value == null || typeof value === 'boolean') {
                acc[key] = value;
            } else if (typeof value === 'number') {
                acc[key] = Number.isFinite(value) ? value : '[number]';
            } else if (typeof value === 'string') {
                const trimmed = value.length > MAX_STRING_LENGTH ? `${value.slice(0, MAX_STRING_LENGTH)}…` : value;
                acc[key] = trimmed;
                if (value.length > MAX_STRING_LENGTH) acc[`${key}Length`] = value.length;
            } else if (Array.isArray(value)) {
                acc[key] = `[array:${value.length}]`;
            } else if (typeof value === 'object') {
                try { acc[key] = `[object:${Object.keys(value).length}]`; } catch { acc[key] = '[object]'; }
            } else {
                acc[key] = `[${typeof value}]`;
            }
            return acc;
        }, {});
    } catch (e) {
        summary.error = describeError(e);
    }
    return summary;
}

// --- Public API ---

export const LoggingManager = {
    initialize(domElements) {
        if (loggingState.initialized) return;
        loggingState.dom = { ...domElements };

        const {
            loggingSectionEl, loggingLevelFilterEl, loggingNamespaceFilterEl,
            loggingHistoryLimitInput, loggingConsoleOutputInput, loggingCaptureConsoleInput,
            loggingCaptureErrorsInput, loggingPersistSessionInput, sessionLoggingExportButton,
            loggingNamespaceHelpEl
        } = loggingState.dom;

        if (!loggingSectionEl) return;
        loggingState.initialized = true;

        if (loggingLevelFilterEl) {
            loggingState.levelFilter = loggingLevelFilterEl.value || 'all';
            loggingLevelFilterEl.addEventListener('change', () => {
                loggingState.levelFilter = loggingLevelFilterEl.value || 'all';
                if (!loggingState.degraded) setLoggingStatusKey('loggingStatusUpdating');
                LoggingManager.scheduleRender({ immediate: true });
            });
        }

        if (loggingNamespaceFilterEl) {
            loggingNamespaceFilterEl.value = '';
            loggingNamespaceFilterEl.addEventListener('input', () => {
                if (loggingState.namespaceDebounce) clearTimeout(loggingState.namespaceDebounce);
                loggingState.namespaceDebounce = setTimeout(() => {
                    loggingState.namespaceDebounce = null;
                    loggingState.namespaceFilter = loggingNamespaceFilterEl.value || '';
                    if (!loggingState.degraded) setLoggingStatusKey('loggingStatusUpdating');
                    LoggingManager.scheduleRender({ immediate: true });
                }, 200);
            });
        }

        if (loggingHistoryLimitInput) {
            const applyLimitUpdate = () => {
                const raw = loggingHistoryLimitInput.value;
                const parsed = parseInt(raw, 10);
                if (!Number.isFinite(parsed)) {
                    if (loggingState.config?.historyLimit) loggingHistoryLimitInput.value = loggingState.config.historyLimit;
                    return;
                }
                const clamped = Math.min(Math.max(parsed, LOGGING_HISTORY_MIN), LOGGING_HISTORY_MAX);
                if (loggingState.config?.historyLimit === clamped && parsed !== clamped) {
                    loggingHistoryLimitInput.value = clamped;
                    return;
                }
                loggingHistoryLimitInput.value = clamped;
                if (!loggingState.degraded) setLoggingStatusKey('loggingStatusUpdating');
                LoggingManager.updateConfig({ historyLimit: clamped });
            };
            loggingHistoryLimitInput.addEventListener('change', applyLimitUpdate);
            loggingHistoryLimitInput.addEventListener('blur', applyLimitUpdate);
        }

        const registerToggle = (input, key) => {
            if (!input) return;
            input.addEventListener('change', () => {
                const checked = !!input.checked;
                input.setAttribute('aria-checked', checked ? 'true' : 'false');
                if (!loggingState.degraded) setLoggingStatusKey('loggingStatusUpdating');
                LoggingManager.updateConfig({ [key]: checked });
            });
        };

        registerToggle(loggingConsoleOutputInput, 'consoleOutput');
        registerToggle(loggingCaptureConsoleInput, 'captureConsole');
        registerToggle(loggingCaptureErrorsInput, 'captureGlobalErrors');
        registerToggle(loggingPersistSessionInput, 'persistSession');

        if (sessionLoggingExportButton) {
            sessionLoggingExportButton.addEventListener('click', () => LoggingManager.exportHistory());
        }

        if (loggingNamespaceHelpEl) {
            loggingNamespaceHelpEl.setAttribute('aria-live', 'polite');
        }

        LoggingManager.attachSubscriptions();
    },

    attachSubscriptions() {
        const logging = resolveLoggingApi();
        if (!logging) {
            LoggingManager.detachSubscriptions();
            setLoggingControlsDisabled(true);
            if (loggingState.dom.loggingUnavailableEl) loggingState.dom.loggingUnavailableEl.removeAttribute('hidden');

            if (!loggingState.retryTimer && typeof setTimeout === 'function') {
                loggingState.retryTimer = setTimeout(() => {
                    loggingState.retryTimer = null;
                    LoggingManager.attachSubscriptions();
                }, 2000);
            }
            return;
        }

        if (loggingState.retryTimer) {
            clearTimeout(loggingState.retryTimer);
            loggingState.retryTimer = null;
        }

        try {
            const config = typeof logging.getConfig === 'function' ? logging.getConfig() : {};
            LoggingManager.applyConfig(config);
            loggingState.degraded = false;
        } catch (error) {
            loggingState.degraded = true;
            setLoggingStatusKey('loggingStatusError');
            logSettingsEvent('warn', 'Failed to load diagnostics logging config', { message: describeError(error) }, { namespace: 'logging-panel' });
        }

        LoggingManager.detachSubscriptions();

        if (typeof logging.subscribe === 'function') {
            loggingState.unsubscribeHistory = logging.subscribe(() => {
                if (!loggingState.degraded) setLoggingStatusKey('loggingStatusUpdating');
                LoggingManager.scheduleRender();
            });
        }
        if (typeof logging.subscribeConfig === 'function') {
            loggingState.unsubscribeConfig = logging.subscribeConfig(snapshot => {
                LoggingManager.applyConfig(snapshot || {});
                if (loggingState.degraded) {
                    loggingState.degraded = false;
                    setLoggingStatusKey('loggingStatusIdle');
                }
            });
        }
        LoggingManager.scheduleRender({ immediate: true });
    },

    detachSubscriptions() {
        if (loggingState.unsubscribeHistory) {
            try { loggingState.unsubscribeHistory(); } catch { }
        }
        if (loggingState.unsubscribeConfig) {
            try { loggingState.unsubscribeConfig(); } catch { }
        }
        loggingState.unsubscribeHistory = null;
        loggingState.unsubscribeConfig = null;
    },

    applyConfig(config) {
        if (!config || typeof config !== 'object') return;
        loggingState.config = config;
        const { langTexts, fallbackTexts } = getLoggingLangInfo();

        if (loggingState.dom.loggingHistoryLimitInput && typeof config.historyLimit === 'number') {
            loggingState.dom.loggingHistoryLimitInput.value = config.historyLimit;
            const template = langTexts.loggingHistoryLimitStatus || fallbackTexts.loggingHistoryLimitStatus || '';
            if (loggingState.dom.loggingHistoryLimitHelpEl && template) {
                loggingState.dom.loggingHistoryLimitHelpEl.textContent = template.replace('{count}', String(config.historyLimit));
            }
        }

        const setToggle = (input, value) => {
            if (!input) return;
            const checked = !!value;
            input.checked = checked;
            input.setAttribute('aria-checked', checked ? 'true' : 'false');
        };

        setToggle(loggingState.dom.loggingConsoleOutputInput, config.consoleOutput !== false);
        setToggle(loggingState.dom.loggingCaptureConsoleInput, config.captureConsole === true);
        setToggle(loggingState.dom.loggingCaptureErrorsInput, config.captureGlobalErrors !== false);
        setToggle(loggingState.dom.loggingPersistSessionInput, config.persistSession !== false);
    },

    updateConfig(partial) {
        const logging = resolveLoggingApi();
        if (!logging || typeof logging.setConfig !== 'function') return;
        try {
            logging.setConfig(partial);
        } catch (error) {
            console.warn('Unable to update logging config', error);
            logSettingsEvent('error', 'Failed to update diagnostics logging config', {
                message: describeError(error),
                partial: sanitizeLoggingConfigPartial(partial)
            }, { namespace: 'logging-config' });
            setLoggingStatusKey('loggingStatusError');
        }
    },

    scheduleRender(options = {}) {
        if (loggingState.renderScheduled && !options.immediate) return;
        if (options.immediate) {
            LoggingManager.renderHistory();
            return;
        }
        loggingState.renderScheduled = true;
        const schedule = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(cb, 50);
        schedule(() => LoggingManager.renderHistory());
    },

    renderHistory() {
        loggingState.renderScheduled = false;
        const { loggingSectionEl, loggingHistoryListEl, loggingUnavailableEl, loggingEmptyEl } = loggingState.dom;
        if (!loggingSectionEl || !loggingHistoryListEl) return;

        const logging = resolveLoggingApi();
        const { langTexts, fallbackTexts } = getLoggingLangInfo();

        if (!logging || typeof logging.getHistory !== 'function') {
            setLoggingControlsDisabled(true);
            if (loggingUnavailableEl) loggingUnavailableEl.removeAttribute('hidden');
            if (loggingEmptyEl) loggingEmptyEl.setAttribute('hidden', '');
            loggingHistoryListEl.textContent = '';
            setLoggingStatusKey('loggingStatusError');
            return;
        }

        setLoggingControlsDisabled(false);
        if (loggingUnavailableEl) loggingUnavailableEl.setAttribute('hidden', '');

        let history = [];
        try {
            const snapshot = logging.getHistory({});
            if (Array.isArray(snapshot)) history = snapshot;
        } catch (error) {
            console.warn('Unable to read history', error);
            setLoggingStatusKey('loggingStatusError');
            // Log error safely...
        }

        const namespaceQuery = (loggingState.namespaceFilter || '').trim().toLowerCase();
        const threshold = loggingState.levelFilter === 'all'
            ? -Infinity
            : (LOGGING_LEVEL_PRIORITY[loggingState.levelFilter] || LOGGING_LEVEL_PRIORITY.warn);

        const entries = history.slice().reverse().filter(entry => {
            if (!entry || typeof entry !== 'object') return false;
            const level = (entry.level || 'info').toLowerCase();
            const priority = LOGGING_LEVEL_PRIORITY[level] ?? LOGGING_LEVEL_PRIORITY.info;
            if (priority < threshold) return false;
            if (namespaceQuery && (entry.namespace || '').toLowerCase().indexOf(namespaceQuery) === -1) return false;
            return true;
        });

        const fragment = document.createDocumentFragment();
        const levelLabels = {
            debug: langTexts.loggingLevelDebug || fallbackTexts.loggingLevelDebug || 'Debug',
            info: langTexts.loggingLevelInfo || fallbackTexts.loggingLevelInfo || 'Info',
            warn: langTexts.loggingLevelWarn || fallbackTexts.loggingLevelWarn || 'Warn',
            error: langTexts.loggingLevelError || fallbackTexts.loggingLevelError || 'Error',
        };

        entries.forEach(entry => {
            const level = (entry.level || 'info').toLowerCase();
            const li = document.createElement('li');
            li.className = `log-entry level-${level}`;

            const header = document.createElement('div');
            header.className = 'log-entry-header';

            const msg = document.createElement('span');
            msg.className = 'log-entry-message';
            msg.textContent = entry.message || '';

            const badge = document.createElement('span');
            badge.className = 'log-entry-level';
            badge.textContent = levelLabels[level] || levelLabels.info;

            header.appendChild(msg);
            header.appendChild(badge);
            li.appendChild(header);

            const dl = document.createElement('dl');
            dl.className = 'log-entry-meta';

            const addRow = (label, value) => {
                const div = document.createElement('div');
                div.className = 'log-entry-meta-row';
                const dt = document.createElement('dt');
                dt.textContent = label;
                const dd = document.createElement('dd');
                dd.textContent = value;
                div.appendChild(dt);
                div.appendChild(dd);
                dl.appendChild(div);
            };

            addRow(
                langTexts.loggingEntryTimestampLabel || fallbackTexts.loggingEntryTimestampLabel || 'Time',
                formatLogTimestamp(entry, langTexts, fallbackTexts)
            );

            if (entry.namespace) {
                addRow(
                    langTexts.loggingEntryNamespaceLabel || fallbackTexts.loggingEntryNamespaceLabel || 'Namespace',
                    entry.namespace
                );
            }
            li.appendChild(dl);

            if (entry.meta != null) {
                li.appendChild(createLogDetailsElement(langTexts.loggingEntryMetaLabel || fallbackTexts.loggingEntryMetaLabel || 'Meta', entry.meta));
            }
            if (entry.detail != null) {
                li.appendChild(createLogDetailsElement(langTexts.loggingEntryDetailLabel || fallbackTexts.loggingEntryDetailLabel || 'Details', entry.detail));
            }

            fragment.appendChild(li);
        });

        loggingHistoryListEl.textContent = '';
        loggingHistoryListEl.appendChild(fragment);

        if (loggingEmptyEl) {
            if (entries.length === 0) {
                const emptyKey = history.length > 0 ? 'loggingEmptyFiltered' : 'loggingEmptyState';
                const msg = (langTexts && langTexts[emptyKey]) || (fallbackTexts && fallbackTexts[emptyKey]) || 'No logs.';
                loggingEmptyEl.textContent = msg;
                loggingEmptyEl.removeAttribute('hidden');
                if (msg) loggingEmptyEl.setAttribute('data-help', msg);
            } else {
                loggingEmptyEl.setAttribute('hidden', '');
                loggingEmptyEl.removeAttribute('data-help');
            }
        }

        if (!loggingState.degraded) setLoggingStatusKey('loggingStatusIdle');
    },

    exportHistory() {
        const logging = resolveLoggingApi();
        const { langTexts, fallbackTexts } = getLoggingLangInfo();
        const { sessionLoggingExportButton } = loggingState.dom;

        const downloadBackupPayload = resolveGlobal('downloadBackupPayload');
        if (typeof downloadBackupPayload !== 'function') {
            showNotification('error', 'Download function unavailable.');
            return;
        }

        const shouldRestoreDisabled = sessionLoggingExportButton && !sessionLoggingExportButton.disabled;
        if (sessionLoggingExportButton) {
            sessionLoggingExportButton.disabled = true;
            sessionLoggingExportButton.setAttribute('aria-disabled', 'true');
        }

        try {
            if (!logging || typeof logging.getHistory !== 'function') {
                setLoggingStatusKey('loggingStatusError');
                scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);
                return;
            }

            setLoggingStatusKey('loggingStatusExporting');

            const snapshot = logging.getHistory({}) || [];
            if (!Array.isArray(snapshot)) throw new Error('Invalid snapshot');

            const historySnapshot = cloneLoggingExportValue(snapshot);
            let configSnapshot = null;
            let statsSnapshot = null;

            try { configSnapshot = cloneLoggingExportValue(logging.getConfig()); } catch { }
            try { statsSnapshot = cloneLoggingExportValue(logging.getStats()); } catch { }

            const metadata = buildLoggingExportMetadata(new Date());
            const exportPayload = {
                exportedAt: metadata.isoTimestamp,
                timezoneOffsetMinutes: metadata.timezoneOffsetMinutes,
                filters: { level: loggingState.levelFilter, namespace: loggingState.namespaceFilter },
                history: historySnapshot,
                historyLength: historySnapshot.length
            };

            const appVar = resolveGlobal('ACTIVE_APP_VERSION') || resolveGlobal('APP_VERSION');
            if (appVar) exportPayload.appVersion = appVar;
            if (configSnapshot) exportPayload.config = configSnapshot;
            if (statsSnapshot) exportPayload.stats = statsSnapshot;

            const serialized = JSON.stringify(exportPayload, null, 2);
            if (!serialized) throw new Error('Empty payload');

            const result = downloadBackupPayload(serialized, metadata.fileName);
            if (!result || !result.success) throw new Error('Download failed');

            logSettingsEvent('info', 'Diagnostics log exported', { fileName: metadata.fileName }, { namespace: 'logging-export' });

            const successMsg = langTexts.loggingExportSuccess || fallbackTexts.loggingExportSuccess || 'Exported';
            showNotification('success', successMsg);

            setLoggingStatusKey('loggingStatusExported');
            scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);

            if (result.method === 'manual' || result.method === 'window-fallback') {
                const getManualDownloadFallbackMessage = resolveGlobal('getManualDownloadFallbackMessage');
                const manualMessage = getManualDownloadFallbackMessage ? getManualDownloadFallbackMessage() : 'Download manually.';
                showNotification('warning', manualMessage);
            }

        } catch (error) {
            const msg = describeError(error);
            logSettingsEvent('error', 'Export failed', { message: msg }, { namespace: 'logging-export' });
            showNotification('error', msg || 'Export failed');
            setLoggingStatusKey('loggingStatusExportFailed');
            scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);
        } finally {
            if (sessionLoggingExportButton && shouldRestoreDisabled) {
                sessionLoggingExportButton.disabled = false;
                sessionLoggingExportButton.setAttribute('aria-disabled', 'false');
            }
        }
    },

    log(level, message, details, meta) {
        logSettingsEvent(level, message, details, meta);
    }
};
