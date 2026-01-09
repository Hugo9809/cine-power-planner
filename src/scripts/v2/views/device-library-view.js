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
    let activeTab = 'add'; // 'add' or 'browse'

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
                <p class="header-subtitle">${_t('deviceLibrarySubtitle') || 'Add, edit, and manage devices in your local database'}</p>
            </div>
            <div class="view-header-actions">
                <button class="v2-btn v2-btn-secondary" id="v2-export-db-btn">
                    <span class="icon">download</span>
                    <span>Export</span>
                </button>
                <button class="v2-btn v2-btn-secondary" id="v2-import-db-btn">
                    <span class="icon">upload</span>
                    <span>Import</span>
                </button>
            </div>
        `;
        return header;
    }

    /**
     * Create tabbed navigation
     */
    function createTabNav() {
        const tabNav = document.createElement('div');
        tabNav.className = 'device-library-tabs';
        tabNav.innerHTML = `
            <button class="device-library-tab active" data-tab="add">
                <span class="icon">add_circle</span>
                <span>${_t('tabAddDevice') || 'Add Device'}</span>
            </button>
            <button class="device-library-tab" data-tab="browse">
                <span class="icon">list</span>
                <span>${_t('tabBrowseLibrary') || 'Browse Library'}</span>
            </button>
        `;
        return tabNav;
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

        // Clear existing content
        v2Container.innerHTML = '';

        // Add View Header
        v2Container.appendChild(createViewHeader());

        // Add Tab Navigation
        v2Container.appendChild(createTabNav());

        // Create view content area
        const viewContent = document.createElement('div');
        viewContent.className = 'view-content';

        // ========================================
        // TAB 1: ADD DEVICE SECTION
        // ========================================
        const addDeviceSection = document.createElement('div');
        addDeviceSection.id = 'device-library-add-tab';
        addDeviceSection.className = 'device-library-tab-content active';

        const addDeviceCard = document.createElement('div');
        addDeviceCard.className = 'v2-card v2-device-library-card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'v2-card-header';
        cardHeader.innerHTML = `
            <div>
                <h3 class="v2-card-title">
                    <span class="icon section-icon">add_box</span>
                    ${_t('addNewDeviceTitle') || 'Add New Device'}
                </h3>
                <p class="v2-card-subtitle">${_t('addDeviceSubtitle') || 'Create a custom device entry for your database'}</p>
            </div>
        `;

        const cardBody = document.createElement('div');
        cardBody.className = 'v2-card-body';

        // Move the button-group (add device form) into card body
        const buttonGroup = legacyContainer.querySelector('.button-group');
        if (buttonGroup) {
            // Remove old headings
            const oldH3 = buttonGroup.querySelector('#addDeviceHeading');
            if (oldH3) oldH3.remove();

            // Enhance fieldset sections
            enhanceFormSections(buttonGroup);

            cardBody.appendChild(buttonGroup);
        }

        addDeviceCard.appendChild(cardHeader);
        addDeviceCard.appendChild(cardBody);
        addDeviceSection.appendChild(addDeviceCard);

        // ========================================
        // TAB 2: BROWSE LIBRARY SECTION
        // ========================================
        const browseSection = document.createElement('div');
        browseSection.id = 'device-library-browse-tab';
        browseSection.className = 'device-library-tab-content';

        const browseCard = document.createElement('div');
        browseCard.className = 'v2-card v2-device-library-card';

        const browseHeader = document.createElement('div');
        browseHeader.className = 'v2-card-header browse-header';
        browseHeader.innerHTML = `
            <div>
                <h3 class="v2-card-title">
                    <span class="icon section-icon">inventory_2</span>
                    ${_t('existingDevicesTitle') || 'Existing Devices'}
                </h3>
                <p class="v2-card-subtitle">${_t('existingDevicesSubtitle') || 'Browse and manage devices in your library'}</p>
            </div>
        `;

        const browseBody = document.createElement('div');
        browseBody.className = 'v2-card-body';

        // Move the search and device list into browse section
        const searchContainer = legacyContainer.querySelector('.device-library-search');
        const deviceListContainer = legacyContainer.querySelector('#deviceListContainer');
        const existingHeading = legacyContainer.querySelector('#existingDevicesHeading');

        if (existingHeading) existingHeading.remove();

        if (searchContainer) {
            // Apply V2 styles to search
            const searchInput = searchContainer.querySelector('input');
            if (searchInput) {
                searchInput.classList.add('v2-input');
            }
            browseBody.appendChild(searchContainer);
        }

        if (deviceListContainer) {
            deviceListContainer.classList.add('v2-device-list');
            browseBody.appendChild(deviceListContainer);
        }

        browseCard.appendChild(browseHeader);
        browseCard.appendChild(browseBody);
        browseSection.appendChild(browseCard);

        // Move remaining legacy children (export output, etc)
        while (legacyContainer.firstChild) {
            if (legacyContainer.firstChild.id === 'deviceManagerHeading') {
                legacyContainer.removeChild(legacyContainer.firstChild);
                continue;
            }
            // Skip if already moved
            if (legacyContainer.firstChild.classList &&
                (legacyContainer.firstChild.classList.contains('button-group') ||
                    legacyContainer.firstChild.classList.contains('device-library-search'))) {
                legacyContainer.removeChild(legacyContainer.firstChild);
                continue;
            }
            if (legacyContainer.firstChild.id === 'deviceListContainer') {
                legacyContainer.removeChild(legacyContainer.firstChild);
                continue;
            }
            // Move other elements to add section
            addDeviceSection.appendChild(legacyContainer.firstChild);
        }

        viewContent.appendChild(addDeviceSection);
        viewContent.appendChild(browseSection);
        v2Container.appendChild(viewContent);

        // Apply V2 Classes to Legacy Elements
        applyV2Styles(addDeviceCard);
        applyV2Styles(browseCard);

        // Attach tab navigation listeners
        attachTabListeners();

        // Attach export/import button handlers
        attachActionListeners();

        isReparented = true;
        console.log('[DeviceLibraryView] Reparenting complete.');
    }

    /**
     * Enhance form sections with icons and styling
     */
    function enhanceFormSections(container) {
        const sections = {
            'cameraFields': { icon: 'videocam', title: 'Camera Settings' },
            'monitorFields': { icon: 'desktop_windows', title: 'Monitor Settings' },
            'lensFields': { icon: 'blur_circular', title: 'Lens Settings' },
            'viewfinderFields': { icon: 'center_focus_weak', title: 'Viewfinder Settings' },
            'videoFields': { icon: 'sensors', title: 'Video TX Settings' },
            'motorFields': { icon: 'settings', title: 'Motor Settings' },
            'controllerFields': { icon: 'tune', title: 'Controller Settings' },
            'distanceFields': { icon: 'straighten', title: 'Distance Sensor Settings' },
            'batteryFields': { icon: 'battery_full', title: 'Battery Settings' }
        };

        Object.keys(sections).forEach(id => {
            const el = container.querySelector(`#${id}`);
            if (el) {
                el.classList.add('device-form-section');

                // Check if section header already exists  
                if (!el.querySelector('.section-header')) {
                    const header = document.createElement('div');
                    header.className = 'section-header';
                    header.innerHTML = `
                        <span class="icon section-icon">${sections[id].icon}</span>
                        <span class="section-title">${sections[id].title}</span>
                    `;
                    el.insertBefore(header, el.firstChild);
                }
            }
        });

        // Enhance subsections with icons
        const subsectionIcons = {
            'powerInputsHeading': 'bolt',
            'powerDistributionHeading': 'power',
            'videoOutputsHeading': 'connected_tv',
            'fizConnectorHeading': 'settings_input_composite',
            'mediaHeading': 'sd_card',
            'viewfinderHeading': 'visibility',
            'lensMountHeading': 'camera'
        };

        Object.keys(subsectionIcons).forEach(id => {
            const el = container.querySelector(`#${id}`);
            if (el && !el.querySelector('.icon')) {
                const icon = document.createElement('span');
                icon.className = 'icon';
                icon.textContent = subsectionIcons[id];
                el.insertBefore(icon, el.firstChild);
            }
        });
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
     * Attach tab navigation event listeners
     */
    function attachTabListeners() {
        const tabs = document.querySelectorAll('.device-library-tab');
        const contents = document.querySelectorAll('.device-library-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                activeTab = targetTab;

                // Update tab states
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update content visibility
                contents.forEach(c => c.classList.remove('active'));
                const targetContent = document.getElementById(`device-library-${targetTab}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    /**
     * Attach export/import button handlers
     */
    function attachActionListeners() {
        const exportBtn = document.getElementById('v2-export-db-btn');
        const importBtn = document.getElementById('v2-import-db-btn');
        const legacyExportBtn = document.getElementById('exportDataBtn');
        const legacyImportBtn = document.getElementById('importDataBtn');

        if (exportBtn && legacyExportBtn) {
            exportBtn.addEventListener('click', () => {
                legacyExportBtn.click();
            });
        }

        if (importBtn && legacyImportBtn) {
            importBtn.addEventListener('click', () => {
                legacyImportBtn.click();
            });
        }
    }

    /**
     * Restore Legacy Content (Cleanup)
     */
    function restoreLegacyContent() {
        if (!isReparented) return;

        const v2Container = document.getElementById(CONTENT_CONTAINER_ID);
        const legacyContainer = document.getElementById(LEGACY_CONTAINER_ID);

        if (v2Container && legacyContainer) {
            const cardBody = v2Container.querySelector('.v2-card-body');

            if (cardBody) {
                while (cardBody.firstChild) {
                    legacyContainer.appendChild(cardBody.firstChild);
                }
            } else {
                while (v2Container.firstChild) {
                    legacyContainer.appendChild(v2Container.firstChild);
                }
            }

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
            if (e.detail && e.detail.view === 'devices') {
                render();
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
