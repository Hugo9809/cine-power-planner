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

        // Create a V2 Card Wrapper
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'v2-card v2-device-library-card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'v2-card-header';
        cardHeader.innerHTML = `
            <div>
                <h3 class="v2-card-title">Device Manager</h3>
                <p class="v2-card-subtitle">
                    Add or edit devices in your local library. 
                    <a href="#/help" class="v2-link-subtle" style="font-size: 0.9em; margin-left: 8px;">Learn more</a>
                </p>
            </div>
        `;

        const cardBody = document.createElement('div');
        cardBody.className = 'v2-card-body';

        // Move legacy children into card body
        while (legacyContainer.firstChild) {
            // Check if it's the heading (we replaced it)
            if (legacyContainer.firstChild.id === 'deviceManagerHeading') {
                legacyContainer.removeChild(legacyContainer.firstChild); // Remove duplicative heading
                continue;
            }
            if (legacyContainer.firstChild.id === 'addDeviceHeading') {
                legacyContainer.removeChild(legacyContainer.firstChild); // Remove duplicative heading
                continue;
            }
            cardBody.appendChild(legacyContainer.firstChild);
        }

        cardWrapper.appendChild(cardHeader);
        cardWrapper.appendChild(cardBody);
        v2Container.appendChild(cardWrapper);

        // Apply V2 Classes to Legacy Elements
        applyV2Styles(cardBody);

        isReparented = true;
        console.log('[DeviceLibraryView] Reparenting complete.');
    }

    /**
     * Apply V2 classes to legacy elements
     * @param {HTMLElement} container 
     */
    function applyV2Styles(container) {
        // Inputs
        const inputs = container.querySelectorAll('input[type="text"], input[type="number"]');
        inputs.forEach(el => el.classList.add('v2-input'));

        // Selects
        const selects = container.querySelectorAll('select');
        selects.forEach(el => el.classList.add('v2-select'));

        // Buttons
        // Legacy buttons often have no class or specific classes. 
        // We'll target them by tag or common legacy classes if known. Since we don't have many, just buttons.
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => {
            // Distinguish types if possible. V2 default is secondary/ghost usually unless strictly primary.
            // Let's make them default buttons for now.
            btn.classList.add('v2-btn');

            // If it's the "Add Device" button (often implied by context or specific ID logic in legacy),
            // We might want to make it primary. 
            // Checking text content is risky but effective for legacy shims.
            if (btn.textContent.toLowerCase().includes('add') || btn.textContent.toLowerCase().includes('save')) {
                btn.classList.add('v2-btn-primary');
            }
        });

        // Form Rows
        // Legacy uses .form-row. We can map this to .v2-form-row via CSS or add the class.
        // Adding class is safer for scoping.
        const rows = container.querySelectorAll('.form-row');
        rows.forEach(row => row.classList.add('v2-form-row'));

        // Labels
        const labels = container.querySelectorAll('label');
        labels.forEach(label => label.classList.add('v2-label'));
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
            // In V2 we wrapped everything in a .v2-card-body inside a .v2-card
            const cardBody = v2Container.querySelector('.v2-card-body');

            if (cardBody) {
                while (cardBody.firstChild) {
                    // Remove V2 classes before returning? 
                    // Might be safer to leave them or strip them if they cause legacy issues.
                    // Legacy CSS shouldn't care about extra classes usually.
                    legacyContainer.appendChild(cardBody.firstChild);
                }
            } else {
                // Fallback if structure is weird
                while (v2Container.firstChild) {
                    legacyContainer.appendChild(v2Container.firstChild);
                }
            }

            // Clear the wrapper
            v2Container.innerHTML = '';
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
