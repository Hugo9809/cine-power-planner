/**
 * Cine Power Planner V2 - Device Library View
 * ===========================================
 * Manages the Device Library view by integrating the legacy Device Manager.
 * 
 * Strategy:
 * This view acts as a wrapper for the existing (Legacy) Device Manager logic.
 * Instead of rewriting the complex CRUD logic for devices, we simply:
 * 1. Create a modern V2 view structure with header and sections
 * 2. "Borrow" the DOM elements from the legacy #device-manager section.
 * 3. Reparent them into the V2 layout with proper styling.
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
    let legacyVisibilityState = null;

    // =====================
    // HELPER: Translations
    // =====================
    function _t(key) {
        if (typeof window !== 'undefined' && window.texts) {
            const langSelect = document.getElementById('languageSelect');
            const lang = (langSelect && langSelect.value) ||
                (typeof window.currentLanguage === 'string' && window.currentLanguage) ||
                'en';

            const dict = window.texts[lang] || window.texts['en'];
            if (dict) {
                return key.split('.').reduce((o, i) => (o ? o[i] : null), dict) || key;
            }
        }
        return key;
    }

    // =====================
    // DOM MANIPULATION
    // =====================

    /**
     * Inject action buttons into the existing view-header (from index.html)
     */
    function injectHeaderActions() {
        const viewSection = document.getElementById('view-devices');
        if (!viewSection) return;

        const existingHeader = viewSection.querySelector('.view-header');
        if (!existingHeader) return;

        // Check if actions already exist
        let actionsContainer = existingHeader.querySelector('.view-header-actions');
        if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'view-header-actions';
            existingHeader.appendChild(actionsContainer);
        }

        // Clear and add our buttons
        actionsContainer.innerHTML = `
            <button class="v2-btn v2-btn-secondary" id="v2-export-db-btn" title="Export database to file">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Export</span>
            </button>
            <button class="v2-btn v2-btn-secondary" id="v2-import-db-btn" title="Import database from file">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>Import</span>
            </button>
            <button class="v2-btn v2-btn-danger" id="v2-reset-db-btn" title="Reset to default database">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                <span>Reset</span>
            </button>
        `;
    }

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
            return;
        }

        // --- HIERARCHY PRESERVATION FIX ---
        // Instead of taking children OUT of #device-manager, we move #device-manager ITSELF
        // into our view. This preserves event delegation on #device-manager.

        // 1. Create a placeholder to know where to put it back later
        legacyVisibilityState = legacyContainer.classList.contains('hidden');
        const placeholder = document.createElement('div');
        placeholder.id = 'device-manager-placeholder';
        placeholder.style.display = 'none';
        legacyContainer.parentNode.insertBefore(placeholder, legacyContainer);

        // 2. Inject action buttons into existing header (not a new one)
        injectHeaderActions();

        // 3. Clear V2 content container (not creating header here anymore)
        v2Container.innerHTML = '';

        // 3. Create wrapper for content tiles
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'device-library-content-wrapper';

        // 4. Move #device-manager into our container
        legacyContainer.classList.remove('hidden');

        // 5. Organize content into TWO SEPARATE TILES

        // Tile 1: Add New Device Form
        const formTile = document.createElement('section');
        formTile.className = 'v2-card device-library-form-tile';
        formTile.innerHTML = '<h2 class="tile-heading">Add New Device</h2>';

        // Tile 2: Existing Devices List
        const listTile = document.createElement('section');
        listTile.className = 'v2-card device-library-list-tile';
        listTile.innerHTML = '<h2 class="tile-heading">Existing Devices</h2>';

        // 6. Process legacy children and move to appropriate tiles
        const children = Array.from(legacyContainer.children);
        children.forEach(child => {
            // Hide all duplicate headings
            if (child.id === 'deviceManagerHeading' || child.id === 'addDeviceHeading' || child.id === 'existingDevicesHeading') {
                child.style.display = 'none';
            }
            // Hide legacy action buttons (now in header)
            else if (child.id === 'exportDataBtn' || child.id === 'importDataBtn' || child.id === 'exportAndRevertBtn') {
                child.style.display = 'none';
            }
            // Button group (Add New Device form) -> Form Tile
            else if (child.classList.contains('button-group')) {
                // Hide extra buttons within button-group (Export/Import/Reset now in header)
                const extraButtons = child.querySelectorAll('#exportDataBtn, #importDataBtn, #exportAndRevertBtn');
                extraButtons.forEach(btn => btn.style.display = 'none');

                formTile.appendChild(child);
            }
            // Search and device list -> List Tile
            else if (child.classList.contains('device-library-search') || child.id === 'deviceListContainer') {
                if (child.classList.contains('device-library-search')) {
                    const searchInput = child.querySelector('input');
                    if (searchInput) {
                        searchInput.classList.add('v2-input');
                        const tVal = _t('searchPlaceholder');
                        searchInput.placeholder = (tVal && tVal !== 'searchPlaceholder') ? tVal : 'Search all device categories...';
                    }
                }
                listTile.appendChild(child);
            }
        });

        // 7. Append tiles to wrapper
        contentWrapper.appendChild(formTile);
        contentWrapper.appendChild(listTile);

        // 8. Add wrapper to container and legacy container for event delegation
        v2Container.appendChild(contentWrapper);
        v2Container.appendChild(legacyContainer); // Keep for event delegation, hidden
        legacyContainer.style.display = 'none'; // Hide original container

        // Apply V2 Classes to the tile content
        applyV2Styles(formTile);
        applyV2Styles(listTile);

        // Apply V2 Classes
        applyV2Styles(legacyContainer);

        // Attach export/import button handlers
        attachActionListeners();

        // Trigger device list population
        // Uses syncDeviceManagerCategories as the primary method (verified to work)
        // Falls back to refreshDeviceLists or loadDeviceData if available
        const triggerDeviceListPopulation = () => {
            if (typeof window.syncDeviceManagerCategories === 'function') {
                console.log('[DeviceLibraryView] Triggering syncDeviceManagerCategories...');
                try {
                    window.syncDeviceManagerCategories();
                    return true;
                } catch (e) {
                    console.warn('[DeviceLibraryView] syncDeviceManagerCategories failed:', e);
                }
            }
            if (typeof window.refreshDeviceLists === 'function') {
                console.log('[DeviceLibraryView] Triggering refreshDeviceLists...');
                try {
                    window.refreshDeviceLists();
                    return true;
                } catch (e) {
                    console.warn('[DeviceLibraryView] refreshDeviceLists failed:', e);
                }
            }
            if (typeof window.loadDeviceData === 'function') {
                console.log('[DeviceLibraryView] Triggering loadDeviceData...');
                try {
                    window.loadDeviceData();
                    return true;
                } catch (e) {
                    console.warn('[DeviceLibraryView] loadDeviceData failed:', e);
                }
            }
            console.warn('[DeviceLibraryView] No device list population function found');
            return false;
        };

        // Try immediately and also with a small delay (in case functions aren't ready yet)
        if (!triggerDeviceListPopulation()) {
            setTimeout(triggerDeviceListPopulation, 100);
        }

        isReparented = true;
        console.log('[DeviceLibraryView] Reparenting complete (Hierarchy Preserved).');
    }



    /**
     * Apply V2 classes to legacy elements
     */
    function applyV2Styles(container) {
        // Inputs
        const inputs = container.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]');
        inputs.forEach(el => el.classList.add('v2-input'));

        // Selects
        const selects = container.querySelectorAll('select');
        selects.forEach(el => el.classList.add('v2-select'));

        // Buttons
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.classList.contains('v2-btn')) return; // Skip already styled
            btn.classList.add('v2-btn');

            if (btn.textContent.toLowerCase().includes('add') ||
                btn.textContent.toLowerCase().includes('save')) {
                btn.classList.add('v2-btn-primary');
            }
        });

        // Form Rows
        const rows = container.querySelectorAll('.form-row');
        rows.forEach(row => row.classList.add('v2-form-row'));

        // Labels
        const labels = container.querySelectorAll('label');
        labels.forEach(label => label.classList.add('v2-label'));
    }

    /**
     * Attach export/import button handlers
     */
    function handleExportClick() {
        const legacyExportBtn = document.getElementById('exportDataBtn');
        if (legacyExportBtn) {
            legacyExportBtn.click();
        }
    }

    function handleImportClick() {
        const legacyImportBtn = document.getElementById('importDataBtn');
        if (legacyImportBtn) {
            legacyImportBtn.click();
        }
    }

    function attachActionListeners() {
        const exportBtn = document.getElementById('v2-export-db-btn');
        const importBtn = document.getElementById('v2-import-db-btn');
        const resetBtn = document.getElementById('v2-reset-db-btn');

        if (exportBtn) {
            exportBtn.removeEventListener('click', handleExportClick);
            exportBtn.addEventListener('click', handleExportClick);
        }

        if (importBtn) {
            importBtn.removeEventListener('click', handleImportClick);
            importBtn.addEventListener('click', handleImportClick);
        }

        if (resetBtn) {
            resetBtn.removeEventListener('click', handleResetClick);
            resetBtn.addEventListener('click', handleResetClick);
        }
    }

    function handleResetClick() {
        // Trigger the legacy exportAndRevert button
        const legacyBtn = document.getElementById('exportAndRevertBtn');
        if (legacyBtn) {
            legacyBtn.click();
        } else {
            console.warn('[DeviceLibraryView] Legacy reset button not found');
        }
    }

    /**
     * Restore Legacy Content (Cleanup)
     */
    function restoreLegacyContent() {
        if (!isReparented) return;

        const v2Container = document.getElementById(CONTENT_CONTAINER_ID);
        const legacyContainer = document.getElementById(LEGACY_CONTAINER_ID); // This is now inside v2Container
        const placeholder = document.getElementById('device-manager-placeholder');

        if (legacyContainer) {
            // 1. Move content out of panels back to legacyContainer root
            const listContent = legacyContainer.querySelector('.device-list-panel .panel-content');
            const formContent = legacyContainer.querySelector('.device-form-panel .panel-content');

            if (listContent) {
                while (listContent.firstChild) {
                    legacyContainer.appendChild(listContent.firstChild);
                }
            }

            if (formContent) {
                while (formContent.firstChild) {
                    legacyContainer.appendChild(formContent.firstChild);
                }
            }

            // Remove panels
            const panels = legacyContainer.querySelectorAll('.v2-panel');
            panels.forEach(p => p.remove());

            // Remove layout class
            legacyContainer.classList.remove('device-library-layout');

            // 2. Put #device-manager back to placeholder
            if (legacyVisibilityState === true) {
                legacyContainer.classList.add('hidden');
            } else if (legacyVisibilityState === false) {
                legacyContainer.classList.remove('hidden');
            }

            if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.insertBefore(legacyContainer, placeholder);
                placeholder.remove();
            } else {
                // Fallback: append to body (should ideally not happen if flow is correct)
                document.body.appendChild(legacyContainer);
            }
        }

        if (v2Container) {
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
        reparentLegacyContent();
    }

    /**
     * Initialize the view module
     */
    function init() {
        if (isInitialized) return;

        console.log('[DeviceLibraryView] Initializing...');

        document.addEventListener('v2:viewchange', (e) => {
            if (!e.detail) {
                return;
            }

            if (e.detail.view === 'devices') {
                render();
                return;
            }

            if (isReparented) {
                restoreLegacyContent();
            }
        });

        // Listen for language changes
        document.addEventListener('v2:languagechange', () => {
            if (isReparented) {
                // Re-render to update translations
                restoreLegacyContent();
                isReparented = false;
                render();
            }
        });

        isInitialized = true;
        console.log('[DeviceLibraryView] Initialized');
    }

    // =====================
    // PUBLIC API
    // =====================
    const DeviceLibraryView = {
        init,
        render,
        restoreLegacyContent
    };

    global.cineV2DeviceLibrary = DeviceLibraryView;

})(typeof window !== 'undefined' ? window : this);
