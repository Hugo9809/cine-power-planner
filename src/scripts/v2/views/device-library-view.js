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
     * Create the view header
     */
    function createViewHeader() {
        const header = document.createElement('header');
        header.className = 'view-header';
        header.innerHTML = `
            <div class="header-content">
                <h1>${_t('deviceLibraryTitle') || 'Device Library'}</h1>
                <p class="header-subtitle">${_t('deviceLibrarySubtitle') || 'Database Management'} / ${_t('v2ui.revision') || 'REV.01'}</p>
            </div>
            <div class="view-header-actions">
                <button class="v2-btn" id="v2-export-db-btn">
                    <span class="icon">download</span>
                    <span>Export</span>
                </button>
                <button class="v2-btn" id="v2-import-db-btn">
                    <span class="icon">upload</span>
                    <span>Import</span>
                </button>
            </div>
        `;
        return header;
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

        // 2. Clear V2 container and add header
        v2Container.innerHTML = '';
        v2Container.appendChild(createViewHeader());

        // 3. Move #device-manager into V2 container
        v2Container.appendChild(legacyContainer);

        // BUG FIX: Remove 'hidden' class from legacy container so it becomes visible
        // The legacy #device-manager starts hidden; we must show it in V2 context.
        legacyContainer.classList.remove('hidden');

        // legacyContainer.classList.add('device-library-layout'); // REMOVED: Restore V1 (no grid)

        // 4. Organize children - SKIP PANEL CREATION FOR V1 LAYOUT RESTORATION
        // We just want to apply V2 styles to the existing structure, not change the layout.

        const children = Array.from(legacyContainer.children);
        children.forEach(child => {
            if (child.classList.contains('device-library-search')) {
                const searchInput = child.querySelector('input');
                if (searchInput) {
                    searchInput.classList.add('v2-input');
                    const tVal = _t('searchPlaceholder');
                    searchInput.placeholder = (tVal && tVal !== 'searchPlaceholder') ? tVal : 'Search database...';
                    // searchInput.style.marginBottom = '20px'; // Add some spacing if needed
                }
            }
            else if (child.classList.contains('button-group')) {
                // Keep strictly V1 UI, no extra icons or panel styling.
                // Just let it flow.
            }
            // headings etc: let's keep them or hide them? 
            // If we use CreateViewHeader, we might have double headings.
            else if (child.id === 'deviceManagerHeading') {
                child.style.display = 'none'; // Hide legacy main heading
            }
        });

        // 5. Append organized panels - SKIPPED

        // Apply V2 Classes
        applyV2Styles(legacyContainer);

        // Attach export/import button handlers
        attachActionListeners();

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

        if (exportBtn) {
            exportBtn.removeEventListener('click', handleExportClick);
            exportBtn.addEventListener('click', handleExportClick);
        }

        if (importBtn) {
            importBtn.removeEventListener('click', handleImportClick);
            importBtn.addEventListener('click', handleImportClick);
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
