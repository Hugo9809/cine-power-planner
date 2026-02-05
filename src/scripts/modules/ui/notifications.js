/**
 * UI Notifications Module
 * 
 * Manages toast notifications and the notification container.
 * Replaces legacy showNotification logic in app-session.js.
 */

import { getCssVariableValue, parseColorToRgb, computeRelativeLuminance } from './color-utils.js';

const DEFAULT_ACCENT_COLOR = '#ff0055'; // Pink Mode Default
const NOTIFICATION_CONTAINER_ID = 'backupNotificationContainer';

export function getNotificationAccentColor() {
    const fallback = DEFAULT_ACCENT_COLOR;
    const resolved = getCssVariableValue('--accent-color', fallback);
    return resolved || fallback;
}

export function getNotificationTextColor(backgroundColor) {
    try {
        const rgb = parseColorToRgb(backgroundColor);
        if (rgb) {
            const luminance = computeRelativeLuminance(rgb);
            return luminance > 0.55 ? '#000000' : '#ffffff';
        }
    } catch (colorError) {
        console.warn('Failed to determine notification text color', colorError);
    }
    return '#ffffff';
}

function getNotificationTopOffset() {
    const baseOffset = 16;
    let offset = baseOffset;
    if (typeof document === 'undefined') return `${baseOffset}px`;

    try {
        const topBar = document.getElementById('topBar');
        if (topBar && typeof topBar.getBoundingClientRect === 'function') {
            const rect = topBar.getBoundingClientRect();
            if (rect && typeof rect.bottom === 'number' && rect.bottom > 0) {
                offset = Math.max(offset, rect.bottom + baseOffset);
            }
        }
    } catch {
        // Ignore
    }
    return `${Math.ceil(offset)}px`;
}

let notificationContainerEnsureScheduled = false;

function scheduleNotificationContainerEnsure() {
    if (notificationContainerEnsureScheduled) return;
    notificationContainerEnsureScheduled = true;

    const trigger = () => {
        notificationContainerEnsureScheduled = false;
        try {
            ensureNotificationContainer();
        } catch (e) {
            console.warn('Failed to ensure notification container', e);
        }
    };

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(trigger);
    } else {
        setTimeout(trigger, 16);
    }
}

export function ensureNotificationContainer() {
    if (typeof document === 'undefined') return null;

    let container = document.getElementById(NOTIFICATION_CONTAINER_ID);
    let isNew = false;

    if (!container && typeof window !== 'undefined') {
        // Reuse bootstrap container if available
        const bootstrapNotice = window.__cineLoadingNotice;
        if (bootstrapNotice && typeof bootstrapNotice.ensureContainer === 'function') {
            try {
                container = bootstrapNotice.ensureContainer();
            } catch {
                container = null;
            }
        }
    }

    if (!container) {
        container = document.createElement('div');
        container.id = NOTIFICATION_CONTAINER_ID;
        Object.assign(container.style, {
            position: 'fixed',
            right: '1rem',
            zIndex: '10000',
        });
        isNew = true;
    }

    if (container.classList && !container.classList.contains('cine-notification-stack')) {
        container.classList.add('cine-notification-stack');
    }
    if (container.dataset && container.dataset.bootstrap) {
        delete container.dataset.bootstrap;
    }

    const preferredParent = document.body || document.documentElement;
    if (preferredParent) {
        if (container.parentNode !== preferredParent) {
            preferredParent.appendChild(container);
        }
        container.style.top = getNotificationTopOffset();
    } else {
        scheduleNotificationContainerEnsure();
    }

    if (isNew && typeof document.addEventListener === 'function') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => ensureNotificationContainer(), { once: true });
        } else {
            scheduleNotificationContainerEnsure();
        }
    }

    if (typeof window !== 'undefined') {
        const bootstrapNotice = window.__cineLoadingNotice;
        if (bootstrapNotice && typeof bootstrapNotice === 'object') {
            bootstrapNotice.container = container;
        }
    }

    return container;
}

const removeNode = (node) => {
    if (!node) return;
    if (typeof node.remove === 'function') {
        node.remove();
        return;
    }
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
};

export function showNotification(type, message, duration = 4000) {
    if (typeof document === 'undefined') return;

    const container = ensureNotificationContainer();
    if (!container) return;

    const note = document.createElement('div');
    note.textContent = message;

    const background = getNotificationAccentColor();
    const textColor = getNotificationTextColor(background);

    Object.assign(note.style, {
        padding: '0.75rem 1.25rem',
        marginTop: '0.5rem',
        borderRadius: '0.75rem',
        border: 'none',
        boxShadow: '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)',
        background: background,
        color: textColor,
    });

    container.appendChild(note);

    setTimeout(() => {
        removeNode(note);
        if (!container.children.length) {
            removeNode(container);
        }
    }, duration);
}

// Offline Notice Helpers

const FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK = 'Force reload requires an internet connection. Try again once you are back online.';

export function resolveForceReloadOfflineNotice() {
    // Check DOM for pre-rendered notice
    if (typeof document !== 'undefined') {
        const indicator = document.getElementById('offlineIndicator');
        if (indicator) {
            const dataset = indicator.dataset || {};
            const notice = dataset.forceReloadNotice
                || dataset.reloadNotice
                || indicator.getAttribute('data-help')
                || indicator.textContent;

            if (notice && notice.trim()) return notice.trim();
        }
    }

    // Try to resolve via global translator if available
    if (typeof window !== 'undefined' && typeof window.resolveLocaleString === 'function') {
        try {
            const localized = window.resolveLocaleString('reloadAppOfflineNotice');
            if (localized && localized.trim()) return localized.trim();
        } catch {
            // ignore
        }
    }

    return FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
}

export function announceForceReloadOfflineNotice() {
    const notice = resolveForceReloadOfflineNotice();
    let handled = false;

    if (typeof document !== 'undefined') {
        const indicator = document.getElementById('offlineIndicator');
        if (indicator) {
            handled = true;
            if (indicator.dataset) {
                indicator.dataset.forceReloadNotice = notice;
                indicator.dataset.reloadNotice = notice;
            }
            indicator.setAttribute('data-help', notice);
            indicator.setAttribute('role', 'status');
            indicator.setAttribute('aria-live', 'polite');
            indicator.removeAttribute('hidden');
            indicator.textContent = notice;
        }
    }

    if (!handled && typeof window !== 'undefined') {
        if (typeof window.alert === 'function') window.alert(notice);
    }
}

export const NotificationManager = {
    getNotificationAccentColor,
    getNotificationTextColor,
    ensureNotificationContainer,
    showNotification,
    announceForceReloadOfflineNotice,
    resolveForceReloadOfflineNotice
};
