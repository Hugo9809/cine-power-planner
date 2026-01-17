/**
 * @fileoverview CORE MODULE: Loading Indicator
 * 
 * Manages the global loading indicator ("Preparing planner...") used during
 * the application bootstrap phase.
 * 
 * This module is designed to be "resilient" - it works even if other parts
 * of the app (like translations or styling) haven't loaded yet.
 * 
 * @module modules/loading-indicator
 * @see {@link ../../docs/dev/architecture/legacy-integration.md} for bootstrap context
 */

const CONTAINER_ID = 'backupNotificationContainer';
const INDICATOR_ID = 'cineGlobalLoadingIndicator';
const STACK_CLASS = 'cine-notification-stack';
const INDICATOR_BASE_CLASS = 'cine-notification';
const INDICATOR_LOADING_CLASS = 'cine-notification--loading';
const SPINNER_CLASS = 'cine-notification__spinner';
const TEXT_CLASS = 'global-loading-indicator-text';

const FALLBACK_MESSAGES = {
    preparing: 'Preparing planner…',
    modules: 'Loading planner interface…',
    data: 'Loading planner data…',
    almost: 'Almost ready…',
};

let localizedMessages = {};
let currentKey = 'preparing';
let container = null;
let indicator = null;
let hideTimeoutId = null;

function cancelScheduledHide() {
    if (hideTimeoutId !== null) {
        if (typeof clearTimeout === 'function') {
            clearTimeout(hideTimeoutId);
        }
        hideTimeoutId = null;
    }
}

function updateNoticeReferences(scope) {
    if (scope && scope.__cineLoadingNotice && typeof scope.__cineLoadingNotice === 'object') {
        scope.__cineLoadingNotice.container = container;
        scope.__cineLoadingNotice.indicator = indicator;
    }
}

function cleanupIndicatorIfIdle(scope) {
    cancelScheduledHide();
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
    indicator = null;
    if (container) {
        if (container.children && container.children.length === 0 && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        if (container.children && container.children.length === 0) {
            container = null;
        }
    }
    updateNoticeReferences(scope);
}

function scheduleHideAfterComplete(scope) {
    if (hideTimeoutId !== null) {
        return;
    }
    if (typeof setTimeout !== 'function') {
        cleanupIndicatorIfIdle(scope);
        return;
    }
    hideTimeoutId = setTimeout(() => {
        hideTimeoutId = null;
        if (indicator && indicator.dataset && indicator.dataset.preventBootstrapHide === 'true') {
            return;
        }
        cleanupIndicatorIfIdle(scope);
    }, 600);
}

function getLocalizedMessage(key) {
    const trimmedKey = typeof key === 'string' ? key.trim() : '';
    if (!trimmedKey) {
        return '';
    }
    if (localizedMessages && typeof localizedMessages === 'object') {
        const localized = localizedMessages[trimmedKey];
        if (typeof localized === 'string' && localized.trim()) {
            return localized.trim();
        }
    }
    const fallback = FALLBACK_MESSAGES[trimmedKey];
    if (typeof fallback === 'string' && fallback.trim()) {
        return fallback.trim();
    }
    return '';
}

export function ensureContainer(scope) {
    if (container && container.parentNode) {
        updateNoticeReferences(scope);
        return container;
    }
    cancelScheduledHide();
    const existing = document.getElementById(CONTAINER_ID);
    container = existing || document.createElement('div');
    container.id = CONTAINER_ID;
    if (container.classList) {
        container.classList.add(STACK_CLASS);
    } else {
        container.className = [container.className || '', STACK_CLASS].join(' ').trim();
    }
    container.setAttribute('role', 'presentation');
    container.dataset.bootstrap = 'true';

    const parent = document.body || document.documentElement;
    if (parent && container.parentNode !== parent) {
        parent.appendChild(container);
    }

    updateNoticeReferences(scope);

    return container;
}

export function ensureIndicator(scope) {
    if (indicator && indicator.parentNode) {
        updateNoticeReferences(scope);
        return indicator;
    }

    cancelScheduledHide();
    container = ensureContainer(scope);
    const existing = document.getElementById(INDICATOR_ID);
    indicator = existing || document.createElement('div');
    indicator.id = INDICATOR_ID;
    if (indicator.classList) {
        indicator.classList.add(INDICATOR_BASE_CLASS, INDICATOR_LOADING_CLASS);
    } else {
        indicator.className = [
            indicator.className || '',
            INDICATOR_BASE_CLASS,
            INDICATOR_LOADING_CLASS,
        ]
            .join(' ')
            .trim();
    }
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-busy', 'true');
    indicator.dataset.bootstrap = 'true';

    let spinner = indicator.querySelector('.' + SPINNER_CLASS);
    if (!spinner) {
        spinner = document.createElement('span');
        spinner.className = SPINNER_CLASS;
        spinner.setAttribute('aria-hidden', 'true');
        indicator.insertBefore(spinner, indicator.firstChild);
    }

    let textNode = indicator.querySelector('.' + TEXT_CLASS);
    if (!textNode) {
        textNode = document.createElement('span');
        textNode.className = TEXT_CLASS;
        indicator.appendChild(textNode);
    }

    if (container && indicator.parentNode !== container) {
        container.appendChild(indicator);
    }

    updateNoticeReferences(scope);

    return indicator;
}

export function updateMessage() {
    const target = indicator ? indicator.querySelector('.' + TEXT_CLASS) : null;
    if (!target) {
        return;
    }
    let message = getLocalizedMessage(currentKey);
    if (!message && currentKey !== 'preparing') {
        message = getLocalizedMessage('preparing');
    }
    if (!message) {
        message = 'Loading…';
    }
    target.textContent = message;
    indicator.dataset.messageMode = 'key';
    indicator.dataset.messageKey = currentKey;
    indicator.dataset.fallbackMessage = message;
    indicator.dataset.currentMessage = message;
}

export function setBusy(isBusy) {
    if (!indicator) {
        return;
    }
    if (isBusy) {
        indicator.setAttribute('aria-busy', 'true');
    } else {
        indicator.setAttribute('aria-busy', 'false');
    }
}

export function setMessageKey(key, scope) {
    const normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : 'preparing';
    currentKey = normalizedKey;
    ensureIndicator(scope);
    updateMessage();
}

export function applyLocalization(map) {
    localizedMessages = map && typeof map === 'object' ? map : {};
    updateMessage();
}

export function getCurrentKey() {
    return currentKey;
}

export function getFallbackMessages() {
    return { ...FALLBACK_MESSAGES };
}

export function handleProgress(event, scope) {
    if (!event) {
        return;
    }
    const detail = event.detail || {};
    const total = Number(detail.total);
    const index = Number(detail.index);
    let key = 'modules';
    if (Number.isFinite(total) && total > 0 && Number.isFinite(index)) {
        if (index + 1 >= total) {
            key = 'almost';
        } else if (index > 0) {
            key = 'data';
        }
    }
    setMessageKey(key, scope);
}

export function handleComplete(scope) {
    setMessageKey('almost', scope);
    setBusy(false);
    scheduleHideAfterComplete(scope);
    if (typeof setTimeout === 'function') {
        try {
            setTimeout(() => {
                if (
                    indicator &&
                    indicator.dataset &&
                    indicator.dataset.bootstrap === 'true'
                ) {
                    cleanupIndicatorIfIdle(scope);
                }
            }, 800);
        } catch (fallbackHideError) {
            void fallbackHideError;
        }
    }
}

function relocateContainerIfNeeded(scope) {
    if (!container) {
        return;
    }
    const parent = container.parentNode;
    if (!parent || parent === document.body) {
        return;
    }
    if (document.body) {
        document.body.appendChild(container);
    }
}

export function initLoadingIndicator(scope = window) {
    if (!scope || typeof document === 'undefined') {
        return;
    }

    if (scope.__cineLoadingNotice && scope.__cineLoadingNotice.indicator) {
        return;
    }

    container = ensureContainer(scope);
    indicator = ensureIndicator(scope);
    setMessageKey(currentKey, scope);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => relocateContainerIfNeeded(scope), {
            once: true,
        });
    } else {
        relocateContainerIfNeeded(scope);
    }

    document.addEventListener('cine-loader-progress', (e) => handleProgress(e, scope));
    document.addEventListener('cine-loader-complete', () => handleComplete(scope), false);

    scope.__cineLoadingNotice = {
        container,
        indicator,
        ensureContainer: () => ensureContainer(scope),
        ensureIndicator: () => ensureIndicator(scope),
        setMessageKey: (key) => setMessageKey(key, scope),
        applyLocalization,
        setBusy,
        refresh: updateMessage,
        getCurrentKey,
        getFallbackMessages,
    };
}
