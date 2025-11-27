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

        return !!state.elements.modal;
    }

    function bindEvents() {
        if (!state.elements.modal) return;

        state.elements.closeBtn.addEventListener('click', closePreview);

        // Layout Toggle
        if (state.elements.layoutToggle) {
            state.elements.layoutToggle.addEventListener('change', (e) => {
                state.preferences.layout = e.target.checked ? 'rental' : 'standard';
                renderPreviewContent();
            });
        }

        // Section Toggles
        Object.entries(state.elements.sectionToggles).forEach(([key, el]) => {
            if (el) {
                el.addEventListener('change', (e) => {
                    state.preferences.sections[key] = e.target.checked;
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

                // TODO: Real logic to grab devices from state and populate grid
                // For now, cloning the overview list and wrapping it
                const sourceDevs = document.getElementById('overviewDeviceSection');
                if (sourceDevs) {
                    // This is a simplification. Real implementation needs to parse the device list.
                    // For the prototype, we'll just dump the source HTML.
                    // Ideally we iterate over `GLOBAL_SCOPE.devices` or similar.
                    grid.innerHTML = sourceDevs.innerHTML;
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
