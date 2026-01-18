/**
 * App Events Manager
 * 
 * Central hub for initializing global event listeners and handling event logic.
 * Extracted from app-events.js.
 */

import { cineCoreUiHelpers } from '../../core/app-core-ui-helpers.js';

const EVENTS_UI_HELPERS = cineCoreUiHelpers || {};

/**
 * Safely adds an event listener to a target element.
 * If the target is not available immediately, it retries when DOM is ready or via polling.
 * 
 * @param {HTMLElement|string} target - The element or ID/selector string.
 * @param {string} type - The event name.
 * @param {Function} handler - The event handler.
 * @param {Object} [options] - Event options.
 */
export function addSafeEventListener(target, type, handler, options) {
    if (target && typeof target.addEventListener === 'function') {
        target.addEventListener(type, handler, options);
        return;
    }

    // Helper to find element by ID or selector
    const findElement = (str) => {
        let el = document.getElementById(str);
        if (!el) {
            try {
                el = document.querySelector(str);
            } catch (e) {
                // Ignore invalid selectors
            }
        }
        return el;
    };

    // If the target is a string, it's a selector or ID
    if (typeof target === 'string') {
        const el = findElement(target);
        if (el) {
            el.addEventListener(type, handler, options);
            return;
        }

        // Use the robust polling listener if available
        if (EVENTS_UI_HELPERS && typeof EVENTS_UI_HELPERS.whenElementAvailable === 'function') {
            EVENTS_UI_HELPERS.whenElementAvailable(target, (foundEl) => {
                // Re-verify it has addEventListener in case it's a weird object
                if (foundEl && typeof foundEl.addEventListener === 'function') {
                    foundEl.addEventListener(type, handler, options);
                }
            });
            return;
        }
    }

    // Fallback for objects/names that are not strings or if helper missing
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            let el = null;
            if (typeof target === 'string') {
                el = findElement(target);
            } else if (target && target.id) {
                el = document.getElementById(target.id);
            }

            if (el && typeof el.addEventListener === 'function') {
                el.addEventListener(type, handler, options);
            }
        });
    }
}

/**
 * Enqueues a callback to be run when the cineUi system is ready.
 * @param {Function} callback 
 */
export function enqueueCineUiRegistration(callback) {
    const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

    if (!scope || typeof callback !== 'function') {
        return;
    }

    try {
        const existing = scope.cineUi && typeof scope.cineUi === 'object'
            ? scope.cineUi
            : null;

        if (existing) {
            callback(existing);
            return;
        }
    } catch (callbackError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('cineUi registration callback failed', callbackError);
        }
        return;
    }

    const key = '__cineUiReadyQueue';
    if (!Array.isArray(scope[key])) {
        scope[key] = [];
    }

    scope[key].push(callback);
}

/**
 * Initialize core app events
 */
export function initAppEvents() {
    console.log('App Events Manager initialized');
}
