/**
 * Loading Indicator Manager
 * Handles the global loading indicator UI and bootstrap loading notice integration
 */

const GLOBAL_LOADING_INDICATOR_ID = 'cineGlobalLoadingIndicator';
let globalLoadingIndicatorRefCount = 0;
const GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS = 260;

const GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS = {
    default: 'globalLoadingIndicator',
    preparing: 'globalLoadingIndicatorPreparing',
    modules: 'globalLoadingIndicatorModules',
    data: 'globalLoadingIndicatorData',
    almost: 'globalLoadingIndicatorAlmostReady',
};

function getHighResolutionTimestamp() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        return performance.now();
    }
    return Date.now();
}

function resolveTexts() {
    // Access global texts and currentLang
    const scope = typeof globalThis !== 'undefined' ? globalThis
        : typeof window !== 'undefined' ? window
            : typeof self !== 'undefined' ? self : null;

    if (!scope) return { langTexts: null, fallbackTexts: null };

    const texts = scope.texts;
    const currentLang = scope.currentLang;

    const langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang]
        ? texts[currentLang]
        : null;
    const fallbackTexts = texts && typeof texts.en === 'object' && texts.en ? texts.en : null;

    return { langTexts, fallbackTexts };
}

function resolveGlobalLoadingIndicatorMessage(fallbackMessage) {
    if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
        return fallbackMessage.trim();
    }
    const { langTexts, fallbackTexts } = resolveTexts();
    const localized = langTexts && typeof langTexts.globalLoadingIndicator === 'string'
        ? langTexts.globalLoadingIndicator.trim()
        : '';
    if (localized) {
        return localized;
    }
    const fallback = fallbackTexts && typeof fallbackTexts.globalLoadingIndicator === 'string'
        ? fallbackTexts.globalLoadingIndicator.trim()
        : '';
    if (fallback) {
        return fallback;
    }
    return 'Loading…';
}

function resolveGlobalLoadingIndicatorMessageByKey(key, fallbackMessage) {
    const normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : '';
    const translationKey = normalizedKey && GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey]
        ? GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey]
        : GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS.default;

    const { langTexts, fallbackTexts } = resolveTexts();

    let localized = '';
    if (translationKey && langTexts && typeof langTexts[translationKey] === 'string') {
        localized = langTexts[translationKey].trim();
    }
    if (!localized && translationKey && fallbackTexts && typeof fallbackTexts[translationKey] === 'string') {
        localized = fallbackTexts[translationKey].trim();
    }

    const fallback = typeof fallbackMessage === 'string' && fallbackMessage.trim()
        ? fallbackMessage.trim()
        : '';
    if (!localized && fallback) {
        localized = fallback;
    }

    if (!localized) {
        localized = resolveGlobalLoadingIndicatorMessage(fallback);
    }

    return localized || 'Loading…';
}

function syncBootstrapLoadingNoticeLocalization() {
    if (typeof window === 'undefined') {
        return;
    }
    const notice = window.__cineLoadingNotice;
    if (!notice || typeof notice.applyLocalization !== 'function') {
        return;
    }
    const fallback = typeof notice.getFallbackMessages === 'function'
        ? notice.getFallbackMessages()
        : {};

    notice.applyLocalization({
        preparing: resolveGlobalLoadingIndicatorMessageByKey('preparing', fallback.preparing || ''),
        modules: resolveGlobalLoadingIndicatorMessageByKey('modules', fallback.modules || ''),
        data: resolveGlobalLoadingIndicatorMessageByKey('data', fallback.data || ''),
        almost: resolveGlobalLoadingIndicatorMessageByKey('almost', fallback.almost || ''),
    });
}

function refreshGlobalLoadingIndicatorText() {
    if (typeof document === 'undefined') {
        return;
    }
    const indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
    if (!indicator) {
        return;
    }
    const textTarget = indicator.querySelector('.global-loading-indicator-text');
    if (!textTarget) {
        return;
    }
    syncBootstrapLoadingNoticeLocalization();
    const mode = indicator.dataset.messageMode || 'auto';
    if (mode === 'custom') {
        const customMessage = indicator.dataset.customMessage || '';
        if (customMessage) {
            textTarget.textContent = customMessage;
        }
        return;
    }
    if (mode === 'key') {
        const messageKey = indicator.dataset.messageKey || 'default';
        const fallback = indicator.dataset.fallbackMessage || '';
        const message = resolveGlobalLoadingIndicatorMessageByKey(messageKey, fallback);
        if (message) {
            textTarget.textContent = message;
            indicator.dataset.currentMessage = message;
        }
        return;
    }
    const message = resolveGlobalLoadingIndicatorMessage();
    textTarget.textContent = message;
    indicator.dataset.currentMessage = message;
}

function setGlobalLoadingIndicatorMessageByKey(key, fallbackMessage) {
    if (typeof document === 'undefined') {
        return;
    }
    const indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
    if (!indicator) {
        return;
    }
    const normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : 'default';
    const resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(normalizedKey, fallbackMessage || '');
    const textTarget = indicator.querySelector('.global-loading-indicator-text');
    indicator.dataset.messageMode = 'key';
    indicator.dataset.messageKey = normalizedKey;
    if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
        indicator.dataset.fallbackMessage = fallbackMessage.trim();
    } else {
        delete indicator.dataset.fallbackMessage;
    }
    indicator.dataset.currentMessage = resolvedMessage;
    if (textTarget) {
        textTarget.textContent = resolvedMessage;
    }
    syncBootstrapLoadingNoticeLocalization();
}

function ensureNotificationContainer() {
    // Delegate to notifications module or create container
    if (typeof document === 'undefined') return null;
    let container = document.getElementById('cineNotificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'cineNotificationContainer';
        container.className = 'cine-notification-container';
        document.body.appendChild(container);
    }
    return container;
}

function removeNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

function ensureAutoBackupSpinnerStyles() {
    // Stub - styles should be ensured elsewhere or already loaded
}

function showGlobalLoadingIndicator(message) {
    if (typeof document === 'undefined') {
        return () => { };
    }
    const container = ensureNotificationContainer();
    if (!container) {
        return () => { };
    }
    ensureAutoBackupSpinnerStyles();

    const bootstrapNotice = typeof window !== 'undefined' ? window.__cineLoadingNotice : null;
    let indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
    if (!indicator && bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
        try {
            indicator = bootstrapNotice.ensureIndicator();
        } catch (bootstrapIndicatorError) {
            console.warn('Failed to adopt bootstrap loading indicator', bootstrapIndicatorError);
            indicator = null;
        }
    }
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = GLOBAL_LOADING_INDICATOR_ID;
    }

    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-busy', 'true');
    if (indicator.dataset && indicator.dataset.bootstrap) {
        delete indicator.dataset.bootstrap;
    }

    if (indicator.classList) {
        indicator.classList.add('cine-notification', 'cine-notification--loading');
    } else {
        indicator.className = [
            indicator.className || '',
            'cine-notification',
            'cine-notification--loading',
        ]
            .join(' ')
            .trim();
    }

    let spinner = indicator.querySelector('.cine-notification__spinner');
    if (!spinner) {
        spinner = document.createElement('span');
        spinner.className = 'cine-notification__spinner';
        spinner.setAttribute('aria-hidden', 'true');
        indicator.insertBefore(spinner, indicator.firstChild);
    }

    let textTarget = indicator.querySelector('.global-loading-indicator-text');
    if (!textTarget) {
        textTarget = document.createElement('span');
        textTarget.className = 'global-loading-indicator-text';
        indicator.appendChild(textTarget);
    }

    if (indicator.parentNode !== container) {
        container.appendChild(indicator);
    }

    if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
        try {
            bootstrapNotice.setBusy(true);
        } catch (bootstrapBusyError) {
            console.warn('Failed to mark bootstrap loading indicator busy', bootstrapBusyError);
        }
    }

    syncBootstrapLoadingNoticeLocalization();

    const isCustomMessage = Boolean(message && typeof message === 'string' && message.trim());
    let resolvedMessage;
    if (isCustomMessage) {
        resolvedMessage = resolveGlobalLoadingIndicatorMessage(message);
        indicator.dataset.messageMode = 'custom';
        indicator.dataset.customMessage = resolvedMessage;
    } else if (indicator.dataset.messageMode === 'key' && indicator.dataset.messageKey) {
        resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(
            indicator.dataset.messageKey,
            indicator.dataset.fallbackMessage || '',
        );
        indicator.dataset.currentMessage = resolvedMessage;
        indicator.dataset.customMessage = '';
    } else {
        resolvedMessage = resolveGlobalLoadingIndicatorMessage();
        indicator.dataset.messageMode = 'auto';
        indicator.dataset.customMessage = '';
        indicator.dataset.currentMessage = resolvedMessage;
    }

    if (textTarget) {
        textTarget.textContent = resolvedMessage;
    }

    if (bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
        bootstrapNotice.indicator = indicator;
    }

    globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount);
    globalLoadingIndicatorRefCount += 1;
    indicator.dataset.count = String(globalLoadingIndicatorRefCount);
    indicator.style.display = 'flex';

    const displayedAt = getHighResolutionTimestamp();
    let finalized = false;

    const finalizeHide = () => {
        if (finalized) {
            return;
        }
        finalized = true;
        globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount - 1);
        indicator.dataset.count = String(globalLoadingIndicatorRefCount);
        if (globalLoadingIndicatorRefCount === 0) {
            indicator.setAttribute('aria-busy', 'false');
            if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
                try {
                    bootstrapNotice.setBusy(false);
                } catch (bootstrapBusyResetError) {
                    console.warn('Failed to clear bootstrap loading indicator busy state', bootstrapBusyResetError);
                }
            }
            removeNode(indicator);
            if (!container.children.length) {
                removeNode(container);
            }
            if (bootstrapNotice && typeof bootstrapNotice === 'object') {
                bootstrapNotice.indicator = null;
            }
        }
    };

    return () => {
        if (finalized) {
            return;
        }
        const elapsed = getHighResolutionTimestamp() - displayedAt;
        if (elapsed < GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS) {
            const remaining = GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS - elapsed;
            if (typeof setTimeout === 'function') {
                setTimeout(finalizeHide, Math.max(16, remaining));
                return;
            }
        }
        finalizeHide();
    };
}

function installGlobalFetchLoadingIndicator() {
    const scope = typeof globalThis !== 'undefined'
        ? globalThis
        : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null));
    if (!scope || typeof scope.fetch !== 'function') {
        return;
    }
    if (scope.__cineFetchWithLoadingIndicatorInstalled) {
        return;
    }
    const originalFetch = scope.fetch;
    const getMessage = () => resolveGlobalLoadingIndicatorMessage();
    const showIndicator =
        typeof scope.__cineShowGlobalLoadingIndicator === 'function'
            ? scope.__cineShowGlobalLoadingIndicator
            : showGlobalLoadingIndicator;

    const finalizeHide = (hide) => {
        if (typeof hide === 'function') {
            try {
                hide();
            } catch (hideError) {
                console.warn('Failed to hide global loading indicator after fetch', hideError);
            }
        }
    };

    scope.fetch = function fetchWithLoadingIndicator(input, init) {
        let hide = null;
        try {
            hide = showIndicator(getMessage());
        } catch (indicatorError) {
            console.warn('Failed to show global loading indicator before fetch', indicatorError);
            hide = null;
        }
        let response;
        try {
            response = originalFetch.apply(this, arguments);
        } catch (syncError) {
            finalizeHide(hide);
            throw syncError;
        }
        if (!response || typeof response.then !== 'function') {
            finalizeHide(hide);
            return response;
        }
        if (typeof response.finally === 'function') {
            return response.finally(() => {
                finalizeHide(hide);
            });
        }
        return response.then(
            (value) => {
                finalizeHide(hide);
                return value;
            },
            (error) => {
                finalizeHide(hide);
                throw error;
            },
        );
    };
    scope.__cineFetchWithLoadingIndicatorInstalled = true;
}

export const LoadingIndicatorManager = {
    GLOBAL_LOADING_INDICATOR_ID,
    GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS,
    GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS,
    resolveGlobalLoadingIndicatorMessage,
    resolveGlobalLoadingIndicatorMessageByKey,
    syncBootstrapLoadingNoticeLocalization,
    refreshGlobalLoadingIndicatorText,
    setGlobalLoadingIndicatorMessageByKey,
    showGlobalLoadingIndicator,
    installGlobalFetchLoadingIndicator,
    getHighResolutionTimestamp,
};
