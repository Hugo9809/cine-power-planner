/**
 * Cine Power Planner V2 - Legacy Shim Layer
 * ==========================================
 * Bridges V2 UI components with legacy DOM elements and event handlers.
 * 
 * Core responsibilities:
 * 1. Keep legacy IDs (setupSelect, cameraSelect, etc.) functional in the DOM
 * 2. Sync V2 UI state → hidden legacy elements
 * 3. Dispatch native events to trigger legacy handlers
 * 4. Ensure legacy scripts can still find their expected elements
 */

(function (global) {
    'use strict';

    // =====================
    // CRITICAL LEGACY IDS
    // =====================
    // These IDs are required by legacy scripts and must remain in the DOM.
    const CRITICAL_IDS = {
        // Project Management
        project: [
            'setupSelect',       // Project dropdown
            'setupName',         // Project name input
            'saveSetupBtn',      // Save project button
            'deleteSetupBtn'     // Delete project button
        ],

        // Device Selectors (Camera Package)
        devices: [
            'cameraSelect',      // Camera dropdown
            'monitorSelect',     // Monitor dropdown
            'videoSelect',       // Wireless transmitter dropdown
            'motor1Select',      // FIZ motor 1
            'motor2Select',      // FIZ motor 2
            'motor3Select',      // FIZ motor 3
            'motor4Select',      // FIZ motor 4
            'controller1Select', // FIZ controller 1
            'controller2Select', // FIZ controller 2
            'controller3Select', // FIZ controller 3
            'controller4Select', // FIZ controller 4
            'distanceSelect',    // Distance sensor
            'batteryPlateSelect',// Battery plate
            'batterySelect',     // Battery
            'batteryHotswapSelect' // Hotswap battery
        ],

        // Hidden (used by gear list, not shown in Camera Package UI)
        hidden: [
            'cageSelect'         // Cage select (for kit list only)
        ],

        // Power Summary
        power: [
            'heroCard',
            'heroTotalDraw',
            'heroAvailablePower',
            'heroRuntime',
            'heroCurrent144',
            'heroCurrent12',
            'heroBatteryCount',
            'breakdownList',
            'pinWarning',
            'dtapWarning',
            'hotswapWarning'
        ],

        // Outputs
        outputs: [
            'projectRequirementsOutput',
            'gearListOutput',
            'batteryTable',
            'powerDiagram'
        ]
    };

    // All critical IDs flattened
    const ALL_CRITICAL_IDS = Object.values(CRITICAL_IDS).flat();

    // =====================
    // STATE
    // =====================
    let legacyContainer = null;
    let syncEnabled = true;
    let eventListeners = new Map();

    // =====================
    // LEGACY CONTAINER
    // =====================

    /**
     * Ensure the legacy context container exists
     * This is a hidden container that holds legacy elements for scripts to access
     */
    function ensureLegacyContainer() {
        if (legacyContainer) return legacyContainer;

        legacyContainer = document.getElementById('v2-legacy-context');
        if (!legacyContainer) {
            legacyContainer = document.createElement('div');
            legacyContainer.id = 'v2-legacy-context';
            legacyContainer.setAttribute('aria-hidden', 'true');
            legacyContainer.style.cssText = 'position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);';
            document.body.appendChild(legacyContainer);
        }

        return legacyContainer;
    }

    /**
     * Move a legacy element to the hidden container (for elements not visible in V2)
     */
    function shimToLegacyContainer(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`[LegacyShim] Element not found: ${elementId}`);
            return null;
        }

        const container = ensureLegacyContainer();
        container.appendChild(element);

        return element;
    }

    // =====================
    // VALUE SYNCING
    // =====================

    /**
     * Sync a V2 select element's value to its legacy counterpart
     * @param {string} v2Id - The V2 element ID (e.g., 'v2-camera-select')
     * @param {string} legacyId - The legacy element ID (e.g., 'cameraSelect')
     */
    function syncSelectValue(v2Id, legacyId) {
        if (!syncEnabled) return;

        const v2Element = document.getElementById(v2Id);
        const legacyElement = document.getElementById(legacyId);

        if (!v2Element || !legacyElement) {
            return;
        }

        // Set the legacy element's value
        legacyElement.value = v2Element.value;

        // Dispatch change event to trigger legacy handlers
        dispatchNativeEvent(legacyElement, 'change');
    }

    /**
     * Sync a V2 input element's value to its legacy counterpart
     */
    function syncInputValue(v2Id, legacyId) {
        if (!syncEnabled) return;

        const v2Element = document.getElementById(v2Id);
        const legacyElement = document.getElementById(legacyId);

        if (!v2Element || !legacyElement) {
            return;
        }

        legacyElement.value = v2Element.value;
        dispatchNativeEvent(legacyElement, 'input');
    }

    /**
     * Sync legacy value TO a V2 element (for loading projects)
     */
    function syncToV2(legacyId, v2Id) {
        const legacyElement = document.getElementById(legacyId);
        const v2Element = document.getElementById(v2Id);

        if (!legacyElement || !v2Element) {
            return;
        }

        // Temporarily disable sync to prevent loops
        syncEnabled = false;
        v2Element.value = legacyElement.value;
        syncEnabled = true;
    }

    // =====================
    // EVENT DISPATCHING
    // =====================

    /**
     * Dispatch a native DOM event on an element
     * This ensures legacy event handlers are triggered properly
     */
    function dispatchNativeEvent(element, eventType, options = {}) {
        if (!element) return;

        const event = new Event(eventType, {
            bubbles: true,
            cancelable: true,
            ...options
        });

        element.dispatchEvent(event);
    }

    /**
     * Trigger a legacy button click
     */
    function triggerLegacyClick(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`[LegacyShim] Cannot trigger click, element not found: ${elementId}`);
            return false;
        }

        dispatchNativeEvent(element, 'click');
        return true;
    }

    // =====================
    // PROJECT OPERATIONS
    // =====================

    /**
     * Load a project by setting setupSelect and dispatching change
     * @param {string} projectName - The project name to load
     */
    function loadProject(projectName) {
        const setupSelect = document.getElementById('setupSelect');
        if (!setupSelect) {
            console.error('[LegacyShim] setupSelect not found');
            return false;
        }

        // Find the option with this value
        const option = Array.from(setupSelect.options).find(opt => opt.value === projectName);
        if (!option) {
            console.warn(`[LegacyShim] Project not found: ${projectName}`);
            return false;
        }

        setupSelect.value = projectName;
        dispatchNativeEvent(setupSelect, 'change');

        return true;
    }

    /**
     * Save the current project
     */
    function saveProject() {
        return triggerLegacyClick('saveSetupBtn');
    }

    /**
     * Delete the current project
     */
    function deleteProject() {
        return triggerLegacyClick('deleteSetupBtn');
    }

    /**
     * Create a new project
     * @param {string} projectName - The name for the new project
     */
    function createProject(projectName) {
        const setupSelect = document.getElementById('setupSelect');
        const setupNameInput = document.getElementById('setupName');

        if (!setupSelect || !setupNameInput) {
            console.error('[LegacyShim] Project elements not found');
            return false;
        }

        // Select "New Project" option (empty value)
        setupSelect.value = '';
        dispatchNativeEvent(setupSelect, 'change');

        // Set the project name
        setupNameInput.value = projectName;
        dispatchNativeEvent(setupNameInput, 'input');

        // Save the project
        return saveProject();
    }

    /**
     * Get all saved project names
     */
    function getProjectNames() {
        const setupSelect = document.getElementById('setupSelect');
        if (!setupSelect) return [];

        return Array.from(setupSelect.options)
            .map(opt => opt.value)
            .filter(val => val !== ''); // Exclude "New Project" option
    }

    // =====================
    // DEVICE SELECTION
    // =====================

    /**
     * Set a device selection value and trigger legacy update
     */
    function setDeviceValue(deviceId, value) {
        const element = document.getElementById(deviceId);
        if (!element) {
            console.warn(`[LegacyShim] Device element not found: ${deviceId}`);
            return false;
        }

        element.value = value;
        dispatchNativeEvent(element, 'change');

        return true;
    }

    /**
     * Get a device selection value
     */
    function getDeviceValue(deviceId) {
        const element = document.getElementById(deviceId);
        if (!element) return null;
        return element.value;
    }

    /**
     * Get all current device selections
     */
    function getDeviceSnapshot() {
        const snapshot = {};

        CRITICAL_IDS.devices.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                snapshot[id] = element.value;
            }
        });

        return snapshot;
    }

    // =====================
    // V2 BINDING HELPERS
    // =====================

    /**
     * Bind a V2 select to its legacy counterpart
     * When V2 select changes, legacy select is updated
     */
    function bindV2Select(v2Id, legacyId) {
        const v2Element = document.getElementById(v2Id);
        if (!v2Element) return;

        const handler = () => syncSelectValue(v2Id, legacyId);
        v2Element.addEventListener('change', handler);

        // Store for cleanup
        eventListeners.set(`${v2Id}:change`, { element: v2Element, handler });
    }

    /**
     * Bind a V2 input to its legacy counterpart
     */
    function bindV2Input(v2Id, legacyId) {
        const v2Element = document.getElementById(v2Id);
        if (!v2Element) return;

        const handler = () => syncInputValue(v2Id, legacyId);
        v2Element.addEventListener('input', handler);

        eventListeners.set(`${v2Id}:input`, { element: v2Element, handler });
    }

    /**
     * Listen for legacy element changes to update V2
     * Used when loading projects
     */
    function listenLegacyChanges(legacyId, v2Id) {
        const legacyElement = document.getElementById(legacyId);
        if (!legacyElement) return;

        const handler = () => syncToV2(legacyId, v2Id);
        legacyElement.addEventListener('change', handler);

        eventListeners.set(`${legacyId}:legacy:change`, { element: legacyElement, handler });
    }

    // =====================
    // CLEANUP
    // =====================

    /**
     * Remove all event listeners
     */
    function cleanup() {
        eventListeners.forEach(({ element, handler }, key) => {
            const eventType = key.split(':')[1];
            element.removeEventListener(eventType, handler);
        });
        eventListeners.clear();
    }

    // =====================
    // INITIALIZATION
    // =====================

    /**
     * Verify all critical IDs are present in the DOM
     */
    function verifyLegacyIds() {
        const missing = [];
        const found = [];

        ALL_CRITICAL_IDS.forEach(id => {
            if (document.getElementById(id)) {
                found.push(id);
            } else {
                missing.push(id);
            }
        });

        if (missing.length > 0) {
            console.warn(`[LegacyShim] Missing critical IDs:`, missing);
        }

        return { found, missing };
    }

    /**
     * Initialize the legacy shim
     */
    function init() {
        const { found, missing } = verifyLegacyIds();

        console.log(`[LegacyShim] Initialized. Found ${found.length}/${ALL_CRITICAL_IDS.length} critical elements.`);

        if (missing.length > 0) {
            console.warn(`[LegacyShim] Missing elements:`, missing);
        }
    }

    // =====================
    // PUBLIC API
    // =====================
    const LegacyShim = {
        // Container management
        ensureLegacyContainer,
        shimToLegacyContainer,

        // Value syncing
        syncSelectValue,
        syncInputValue,
        syncToV2,

        // Event dispatching
        dispatchNativeEvent,
        triggerLegacyClick,

        // Project operations
        loadProject,
        saveProject,
        deleteProject,
        createProject,
        getProjectNames,

        // Device operations
        setDeviceValue,
        getDeviceValue,
        getDeviceSnapshot,

        // V2 binding
        bindV2Select,
        bindV2Input,
        listenLegacyChanges,

        // Utilities
        verifyLegacyIds,
        cleanup,
        init,

        // Constants
        CRITICAL_IDS,
        ALL_CRITICAL_IDS
    };

    // Expose to global scope
    if (typeof global !== 'undefined') {
        global.cineLegacyShim = LegacyShim;
    }

    if (typeof window !== 'undefined') {
        window.cineLegacyShim = LegacyShim;
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
        module.exports = LegacyShim;
    }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
