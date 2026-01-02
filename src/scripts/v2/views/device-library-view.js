/**
 * Cine Power Planner V2 - Device Library View
 * ===========================================
 * Manages the Device Library view by integrating the legacy Device Manager.
 * 
 * Strategy:
 * This view acts as a wrapper for the existing (Legacy) Device Manager logic.
 * Instead of rewriting the complex CRUD logic for devices, we simply:
 * 1. "Borrow" the DOM elements from the legacy #device-manager section.
 * 2. Reparent them into the V2 #view-devices layout.
 * 3. Ensure they are visible and styled correctly.
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const CONTENT_CONTAINER_ID = 'v2-device-library-content';
    const LEGACY_CONTAINER_ID = 'device-manager';

    // =====================
    // STATE
    // =====================
    let isInitialized = false;
    let isReparented = false;

    // =====================
    // DOM MANIPULATION
    // =====================

    /**
     * Move Legacy Device Manager elements into V2 View
     */
    function reparentLegacyContent() {
        if (isReparented) return;

        console.log('[DeviceLibraryView] Reparenting legacy content...');

        const v2Container = document.getElementById(CONTENT_CONTAINER_ID);
        const legacyContainer = document.getElementById(LEGACY_CONTAINER_ID);

        if (!v2Container) {
            console.error(`[DeviceLibraryView] V2 Container #${CONTENT_CONTAINER_ID} not found.`);
            return;
        }

        if (!legacyContainer) {
            console.error(`[DeviceLibraryView] Legacy Container #${LEGACY_CONTAINER_ID} not found.`);
            // Fallback: Try again later?
            return;
        }

        // 1. Move all children from Legacy to V2
        // We use a document fragment to minimize reflows, though dealing with live nodes means
        // they are moved immediately.
        while (legacyContainer.firstChild) {
            v2Container.appendChild(legacyContainer.firstChild);
        }

        // 2. Ensure visible
        // The legacy styles might have `display: none` or `.hidden` classes on children
        // We might need to clean those up.
        // For now, removing the `.hidden` class from the reparented structure is usually key.
        // BUT: The legacy logic might rely on toggling the #device-manager itself.
        // Since we moved the *children*, #device-manager is now empty.

        // We need to make sure the children themselves are visible.
        // The legacy app uses `section.hidden` to toggle views. 
        // Inside #device-manager, the content is just forms and lists.

        // Let's add a class to v2Container to help with styling if needed
        v2Container.classList.add('v2-legacy-content-wrapper');

        isReparented = true;
        console.log('[DeviceLibraryView] Reparenting complete.');
    }

    /**
     * Restore Legacy Content (Cleanup)
     * Useful if we disable V2
     */
    function restoreLegacyContent() {
        if (!isReparented) return;

        const v2Container = document.getElementById(CONTENT_CONTAINER_ID);
        const legacyContainer = document.getElementById(LEGACY_CONTAINER_ID);

        if (v2Container && legacyContainer) {
            while (v2Container.firstChild) {
                legacyContainer.appendChild(v2Container.firstChild);
            }
        }

        isReparented = false;
        console.log('[DeviceLibraryView] Restored legacy content.');
    }

    // =====================
    // INITIALIZATION
    // =====================

    /**
     * Render the view
     */
    function render() {
        // Ensure content is moved
        reparentLegacyContent();
    }

    /**
     * Initialize the view module
     */
    function init() {
        if (isInitialized) return;

        console.log('[DeviceLibraryView] Initializing...');

        // Listen for V2 View Changes
        document.addEventListener('v2:viewchange', (e) => {
            if (e.detail && e.detail.view === 'devices') {
                render();
            }
        });

        // Also listen for V2 Disable to restore content
        // We can hook into the global event or just check periodically?
        // Ideally ViewManager should dispatch a teardown event, but for now
        // we can rely on page reload which resets everything naturally.
        // If dynamic toggling is supported without reload, we'd need a v2:disable event.

        isInitialized = true;
        console.log('[DeviceLibraryView] Initialized');
    }

    // =====================
    // PUBLIC API
    // =====================
    const DeviceLibraryView = {
        init,
        render,
        restoreLegacyContent // Exposed for debugging or advanced teardown
    };

    // Expose Global
    global.cineV2DeviceLibrary = DeviceLibraryView;

})(typeof window !== 'undefined' ? window : this);
