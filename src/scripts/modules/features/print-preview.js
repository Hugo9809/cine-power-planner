/* global cineModuleBase */

(function () {
    const GLOBAL_SCOPE = typeof window !== 'undefined' ? window : this;

    // --- Module Base Resolution ---
    function resolveModuleBase(scope) {
        if (typeof cineModuleBase === 'object' && cineModuleBase) return cineModuleBase;
        if (scope && typeof scope.cineModuleBase === 'object') return scope.cineModuleBase;
        return null;
    }

    const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || {
        freezeDeep: (v) => v,
        exposeGlobal: (n, v, s) => { if (s) s[n] = v; },
        registerOrQueueModule: () => { }
    };

    function resolveStorageApi() {
        if (GLOBAL_SCOPE.__cineStorageApi) return GLOBAL_SCOPE.__cineStorageApi;
        if (GLOBAL_SCOPE.cineStorage) return GLOBAL_SCOPE.cineStorage;
        return GLOBAL_SCOPE; // Fallback to window/global
    }

    // --- State & DOM Elements ---
    const state = {
        isOpen: false,
        elements: {},
        preferences: {
            layout: 'rental', // 'rental' or 'standard'
            sections: {
                project: true,
                devices: true,
                diagram: true,
                gearList: true,
                battery: true
            }
        }
    };

    function initializeDomReferences() {
        if (typeof document === 'undefined') return false;

        state.elements = {
            modal: document.getElementById('printPreviewModal'),
            closeBtn: document.getElementById('closePrintPreviewBtn'),
            paper: document.getElementById('printPreviewPaper'),

            // Toggles
            layoutToggle: document.getElementById('printLayoutRentalToggle'),
            sectionToggles: {
                project: document.getElementById('printSectionProject'),
                devices: document.getElementById('printSectionDevices'),
                diagram: document.getElementById('printSectionDiagram'),
                gearList: document.getElementById('printSectionGearList'),
                battery: document.getElementById('printSectionBattery')
            },

            // Actions
            exportBtn: document.getElementById('printPreviewExportBtn'),
            printBtn: document.getElementById('printPreviewPrintBtn')
        };

        // Load preferences
        const storage = resolveStorageApi();
        if (storage && typeof storage.loadUserProfile === 'function') {
            // We don't have a direct loadPrintPreferences, but loadUserProfile loads all prefs into memory usually?
            // Actually storage.js loads prefs into the profile or returns them.
            // Let's try to read from localStorage directly for now as a fallback or use a dedicated loader if we added one.
            // We didn't add loadPrintPreferences, but we can read the key directly if needed, or rely on the app state.
            // For now, let's try to read the key directly for simplicity in this module.
            try {
                const raw = localStorage.getItem('cineRentalPrintSections');
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed) {
                        if (parsed.layout) state.preferences.layout = parsed.layout;
                        if (parsed.sections) state.preferences.sections = { ...state.preferences.sections, ...parsed.sections };
                    }
                }
            } catch (e) {
                console.warn('Failed to load print preferences', e);
            }
        }

        // Apply preferences to UI
        if (state.elements.layoutToggle) {
            state.elements.layoutToggle.checked = state.preferences.layout === 'rental';
        }
        Object.entries(state.elements.sectionToggles).forEach(([key, el]) => {
            if (el) {
                el.checked = state.preferences.sections[key];
            }
        });

        return !!state.elements.modal;
    }

    function bindEvents() {
        if (!state.elements.modal) return;

        state.elements.closeBtn.addEventListener('click', closePreview);

        // Layout Toggle
        if (state.elements.layoutToggle) {
            state.elements.layoutToggle.addEventListener('change', (e) => {
                state.preferences.layout = e.target.checked ? 'rental' : 'standard';
                savePreferences();
                renderPreviewContent();
            });
        }

        // Section Toggles
        Object.entries(state.elements.sectionToggles).forEach(([key, el]) => {
            if (el) {
                el.addEventListener('change', (e) => {
                    state.preferences.sections[key] = e.target.checked;
                    savePreferences();
                    updateSectionVisibility();
                });
            }
        });

        // Actions
        if (state.elements.printBtn) {
            state.elements.printBtn.addEventListener('click', () => {
                triggerNativePrint();
            });
        }
        if (state.elements.exportBtn) {
            state.elements.exportBtn.addEventListener('click', () => {
                // For now, export is same as print but maybe with different title/settings
                triggerNativePrint();
            });
        }
    }

    // --- Rendering Logic ---

    function renderPreviewContent() {
        const paper = state.elements.paper;
        if (!paper) return;

        paper.innerHTML = ''; // Clear existing

        // 1. Header (Project Info)
        const header = document.createElement('div');
        header.className = 'preview-header';
        // Grab project info from global state or DOM
        const projectName = document.getElementById('setupName')?.value || 'Untitled Project';
        const production = document.getElementById('productionInput')?.value || '';
        const dateStr = new Date().toLocaleDateString();

        header.innerHTML = `
            <h1>Overview</h1>
            <p><strong>Project Name:</strong> ${projectName}</p>
            <p><strong>Production:</strong> ${production} | <strong>Date:</strong> ${dateStr}</p>
        `;
        paper.appendChild(header);

        // 2. Project Requirements
        if (state.preferences.sections.project) {
            const reqSection = document.createElement('section');
            reqSection.id = 'preview-section-project';
            reqSection.className = 'print-section';
            // Clone from main DOM if available, or mock for now
            const sourceReq = document.getElementById('projectRequirementsOutput');
            if (sourceReq) {
                reqSection.innerHTML = sourceReq.innerHTML;
            } else {
                reqSection.innerHTML = '<p><em>No project requirements data.</em></p>';
            }
            paper.appendChild(reqSection);
        }

        // 3. Device Selection (Rental Layout vs Standard)
        if (state.preferences.sections.devices) {
            const devSection = document.createElement('section');
            devSection.id = 'preview-section-devices';
            devSection.className = 'print-section';
            devSection.innerHTML = '<h2>Device Selection</h2>';

            if (state.preferences.layout === 'rental') {
                // Generate Grid Layout
                const grid = document.createElement('div');
                grid.className = 'device-category-container';

                const storage = resolveStorageApi();
                let devices = [];
                if (storage && typeof storage.loadProject === 'function') {
                    const project = storage.loadProject();
                    if (project && Array.isArray(project.devices)) {
                        devices = project.devices;
                    }
                }

                if (devices.length > 0) {
                    // Categorize devices
                    const categories = {
                        'Camera': [],
                        'Lens': [],
                        'Monitor': [],
                        'Wireless': [],
                        'Power': [],
                        'Support': [],
                        'Media': [],
                        'Cables': [],
                        'Light': [],
                        'Audio': [],
                        'Other': []
                    };

                    devices.forEach(dev => {
                        // Simple categorization logic based on device type or name
                        // This assumes device objects have a 'type' or similar property.
                        // If not, we might need to infer from name or use a default.
                        // Checking common properties...
                        let cat = 'Other';
                        const type = (dev.type || '').toLowerCase();
                        const name = (dev.name || '').toLowerCase();

                        if (type.includes('camera') || name.includes('camera')) cat = 'Camera';
                        else if (type.includes('lens') || name.includes('lens')) cat = 'Lens';
                        else if (type.includes('monitor') || name.includes('monitor')) cat = 'Monitor';
                        else if (type.includes('wireless') || type.includes('transmitter') || type.includes('receiver') || name.includes('teradek')) cat = 'Wireless';
                        else if (type.includes('battery') || type.includes('charger') || name.includes('battery')) cat = 'Power';
                        else if (type.includes('tripod') || type.includes('head') || name.includes('tripod')) cat = 'Support';
                        else if (type.includes('media') || type.includes('card') || type.includes('drive')) cat = 'Media';
                        else if (type.includes('cable')) cat = 'Cables';
                        else if (type.includes('light')) cat = 'Light';
                        else if (type.includes('audio') || type.includes('mic')) cat = 'Audio';

                        if (categories[cat]) {
                            categories[cat].push(dev);
                        } else {
                            categories['Other'].push(dev);
                        }
                    });

                    // Render categories
                    Object.entries(categories).forEach(([catName, items]) => {
                        if (items.length === 0) return;

                        const table = document.createElement('table');
                        table.className = 'device-category-table';
                        table.innerHTML = `
                            <thead>
                                <tr class="category-row"><th colspan="3">${catName}</th></tr>
                            </thead>
                            <tbody>
                                ${items.map(item => `
                                    <tr>
                                        <td>
                                            <div class="gear-item">
                                                <span>${item.brand || ''}</span>
                                                <span class="gear-select-value">${item.name || 'Unknown Device'}</span>
                                            </div>
                                        </td>
                                        <td>${item.quantity || 1}</td>
                                        <td>${item.notes || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        `;
                        grid.appendChild(table);
                    });
                } else {
                    grid.innerHTML = '<p>No devices in project.</p>';
                }

                devSection.appendChild(grid);
            } else {
                // Standard List
                const sourceDevs = document.getElementById('overviewDeviceSection');
                if (sourceDevs) {
                    devSection.innerHTML += sourceDevs.innerHTML;
                }
            }
            paper.appendChild(devSection);
        }

        // 4. Power Diagram
        if (state.preferences.sections.diagram) {
            const diagSection = document.createElement('section');
            diagSection.id = 'preview-section-diagram';
            diagSection.className = 'print-section';
            diagSection.innerHTML = '<h2>Power Diagram</h2>';
            const sourceDiag = document.getElementById('setupDiagram');
            if (sourceDiag) {
                // Canvas cloning is tricky. We might need to re-render or use toDataURL
                const canvas = sourceDiag.querySelector('canvas');
                if (canvas) {
                    const img = document.createElement('img');
                    img.src = canvas.toDataURL();
                    img.style.maxWidth = '100%';
                    diagSection.appendChild(img);
                } else {
                    diagSection.innerHTML += sourceDiag.innerHTML;
                }
            }
            paper.appendChild(diagSection);
        }

        // 5. Power Summary
        // Always show summary? Or controlled by 'battery' toggle? 
        // Mockup has "Power Summary" separate. Let's assume it's part of "Battery Comparison" or separate.
        // The mockup has "Power Summary" section. Let's add it if 'battery' is checked for now, or add a new toggle.
        // Re-using 'battery' toggle for Power Summary + Battery Comparison
        if (state.preferences.sections.battery) {
            const powerSection = document.createElement('section');
            powerSection.className = 'print-section';
            powerSection.innerHTML = '<h2>Power Summary</h2>';
            const sourceResults = document.getElementById('resultsSection'); // or heroCard
            if (sourceResults) {
                powerSection.innerHTML += sourceResults.innerHTML;
            }
            paper.appendChild(powerSection);
        }

        // 6. Gear List
        if (state.preferences.sections.gearList) {
            const gearSection = document.createElement('section');
            gearSection.id = 'preview-section-gearList';
            gearSection.className = 'print-section';
            gearSection.innerHTML = '<h2>Gear List</h2>';
            const sourceGear = document.getElementById('gearListOutput');
            if (sourceGear) {
                gearSection.innerHTML += sourceGear.innerHTML;
            }
            paper.appendChild(gearSection);
        }

        updateSectionVisibility();
    }

    function updateSectionVisibility() {
        // Logic to hide/show sections based on preferences
        // Since we re-render on layout change, this might be redundant if we just re-render on toggle too.
        // But for performance, we can just toggle display.
        const map = {
            project: 'preview-section-project',
            devices: 'preview-section-devices',
            diagram: 'preview-section-diagram',
            gearList: 'preview-section-gearList',
            // battery: ...
        };

        Object.entries(map).forEach(([key, id]) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = state.preferences.sections[key] ? 'block' : 'none';
            }
        });
    }

    function openPreview() {
        if (!state.elements.modal) initializeDomReferences();
        if (!state.elements.modal) return;

        bindEvents(); // Re-bind or check if bound
        renderPreviewContent();
        state.elements.modal.classList.remove('hidden');
        state.isOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closePreview() {
        if (!state.elements.modal) return;
        state.elements.modal.classList.add('hidden');
        state.isOpen = false;
        document.body.style.overflow = '';
    }

    function triggerNativePrint() {
        // We want to print ONLY the paper content.
        // The easiest way is to add a class to body that hides everything else via CSS media print
        document.body.classList.add('printing-preview');
        window.print();
        document.body.classList.remove('printing-preview');
    }

    function savePreferences() {
        const storage = resolveStorageApi();
        if (storage && typeof storage.savePrintPreferences === 'function') {
            storage.savePrintPreferences(state.preferences);
        }
    }

    // --- API ---
    const api = {
        open: openPreview,
        close: closePreview
    };

    // --- Registration ---
    MODULE_BASE.registerOrQueueModule(
        'cineFeaturePrintPreview',
        api,
        {
            category: 'feature',
            description: 'Print Preview Modal',
            connections: ['cineUi']
        }
    );

    MODULE_BASE.exposeGlobal('cineFeaturePrintPreview', api);

})();
