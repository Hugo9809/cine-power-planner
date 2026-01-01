/**
 * Cine Power Planner V2 - Device Library View
 * =============================================
 * Manages the V2 Device Library view by reparenting the legacy
 * #device-manager section content into the V2 view container.
 *
 * This approach reuses all existing device manager functionality
 * while presenting it within the V2 navigation structure.
 */

(function (global) {
    'use strict';

    const VIEW_ID = 'view-devices';
    const LEGACY_SECTION_ID = 'device-manager';
    const CONTENT_CONTAINER_ID = 'v2-device-library-content';
    const LEGACY_TOGGLE_ID = 'toggleDeviceManager';

    let isInitialized = false;
    let isActive = false;
    let legacyParent = null;
    let legacyNextSibling = null;

    /**
     * Initialize the Device Library view controller
     */
    function init() {
        if (isInitialized) return;
        isInitialized = true;

        // Listen for V2 view changes
        document.addEventListener('v2:viewchange', handleViewChange);

        // Check if we should activate immediately based on current hash
        const hash = window.location.hash || '';
        if (hash.match(/^#?\/?devices?\/?$/i)) {
            activateView();
        }

        console.log('[V2 DeviceLibrary] Initialized');
    }

    /**
     * Handle view change events from the ViewManager
     */
    function handleViewChange(event) {
        const detail = event && event.detail ? event.detail : {};
        const viewName = detail.view;

        if (viewName === 'devices') {
            activateView();
        } else if (isActive) {
            deactivateView();
        }
    }

    /**
     * Activate the Device Library view
     * Reparents legacy device-manager content into the V2 view
     */
    function activateView() {
        if (isActive) return;

        const viewElement = document.getElementById(VIEW_ID);
        const legacySection = document.getElementById(LEGACY_SECTION_ID);
        const contentContainer = document.getElementById(CONTENT_CONTAINER_ID);

        if (!viewElement || !legacySection) {
            console.warn('[V2 DeviceLibrary] Required elements not found');
            return;
        }

        // Store original location for restoration
        legacyParent = legacySection.parentNode;
        legacyNextSibling = legacySection.nextSibling;

        // Determine where to place the content
        const targetContainer = contentContainer || viewElement;

        // Move legacy section into V2 view
        targetContainer.appendChild(legacySection);

        // Ensure the section is visible (remove hidden class)
        legacySection.classList.remove('hidden');
        document.body.classList.add('device-manager-active');

        // Hide the legacy toggle button in V2 mode
        const legacyToggle = document.getElementById(LEGACY_TOGGLE_ID);
        if (legacyToggle) {
            legacyToggle.style.display = 'none';
        }

        // Refresh device lists to ensure data is current
        if (typeof global.refreshDeviceLists === 'function') {
            try {
                global.refreshDeviceLists();
            } catch (e) {
                console.warn('[V2 DeviceLibrary] Failed to refresh device lists:', e);
            }
        }

        // Update calculations
        if (typeof global.updateCalculations === 'function') {
            try {
                global.updateCalculations();
            } catch (e) {
                console.warn('[V2 DeviceLibrary] Failed to update calculations:', e);
            }
        }

        isActive = true;
        console.log('[V2 DeviceLibrary] View activated');
    }

    /**
     * Deactivate the Device Library view
     * Restores legacy section to original location for V1 compatibility
     */
    function deactivateView() {
        if (!isActive) return;

        const legacySection = document.getElementById(LEGACY_SECTION_ID);

        if (legacySection && legacyParent) {
            // Restore to original position
            if (legacyNextSibling && legacyNextSibling.parentNode === legacyParent) {
                legacyParent.insertBefore(legacySection, legacyNextSibling);
            } else {
                legacyParent.appendChild(legacySection);
            }

            // Restore hidden state for legacy UI
            // Only hide if not in V2 mode to maintain V1 toggle behavior
            const isV2Mode = document.body.classList.contains('v2-mode');
            if (!isV2Mode) {
                legacySection.classList.add('hidden');
                document.body.classList.remove('device-manager-active');
            }
        }

        // Restore legacy toggle button visibility
        const legacyToggle = document.getElementById(LEGACY_TOGGLE_ID);
        if (legacyToggle) {
            legacyToggle.style.display = '';
        }

        isActive = false;
        legacyParent = null;
        legacyNextSibling = null;

        console.log('[V2 DeviceLibrary] View deactivated');
    }

    /**
     * Check if the view is currently active
     */
    function isViewActive() {
        return isActive;
    }

    // Public API
    const DeviceLibraryView = {
        init,
        activate: activateView,
        deactivate: deactivateView,
        isActive: isViewActive
    };

    // Expose to global scope
    if (typeof global !== 'undefined') {
        global.cineV2DeviceLibrary = DeviceLibraryView;
    }

    if (typeof window !== 'undefined') {
        window.cineV2DeviceLibrary = DeviceLibraryView;
    }

    // Auto-initialize when DOM is ready
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = DeviceLibraryView;
    }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
