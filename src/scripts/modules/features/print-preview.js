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

        // Remove existing listeners to avoid duplicates if re-bound
        const newCloseBtn = state.elements.closeBtn.cloneNode(true);
        state.elements.closeBtn.parentNode.replaceChild(newCloseBtn, state.elements.closeBtn);
        state.elements.closeBtn = newCloseBtn;
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
            const newPrintBtn = state.elements.printBtn.cloneNode(true);
            state.elements.printBtn.parentNode.replaceChild(newPrintBtn, state.elements.printBtn);
            state.elements.printBtn = newPrintBtn;
            state.elements.printBtn.addEventListener('click', () => {
                triggerNativePrint();
            });
        }
        if (state.elements.exportBtn) {
            const newExportBtn = state.elements.exportBtn.cloneNode(true);
            state.elements.exportBtn.parentNode.replaceChild(newExportBtn, state.elements.exportBtn);
            state.elements.exportBtn = newExportBtn;
            state.elements.exportBtn.addEventListener('click', () => {
                triggerNativePrint();
            });
        }
    }

    // --- Helper Functions ---

    function generateRentalDeviceGrid() {
        const sourceDevs = document.getElementById('overviewDeviceSection');
        if (!sourceDevs) return '<p>No devices selected.</p>';

        const container = document.createElement('div');
        container.className = 'device-category-container';

        // Parse the source HTML to find categories and devices
        // Assuming structure: <h3>Category</h3> ... <div class="device-block">...</div>
        // We need to group them.

        const children = Array.from(sourceDevs.children);
        let currentCategoryDiv = null;

        children.forEach(child => {
            if (child.tagName === 'H3') {
                // New Category
                currentCategoryDiv = document.createElement('div');
                currentCategoryDiv.className = 'device-category';

                const title = document.createElement('h3');
                title.innerHTML = child.innerHTML; // Keep icons
                currentCategoryDiv.appendChild(title);

                container.appendChild(currentCategoryDiv);
            } else if (child.classList.contains('device-block')) {
                if (!currentCategoryDiv) {
                    // Orphaned device, create a generic category
                    currentCategoryDiv = document.createElement('div');
                    currentCategoryDiv.className = 'device-category';
                    const title = document.createElement('h3');
                    title.textContent = 'Other';
                    currentCategoryDiv.appendChild(title);
                    container.appendChild(currentCategoryDiv);
                }
                // Clone the device block
                const clone = child.cloneNode(true);
                currentCategoryDiv.appendChild(clone);
            }
        });

        return container.outerHTML;
    }

    function generatePowerSummary() {
        // Extract values from main DOM
        const totalWatt = document.getElementById('totalPower')?.textContent || '0 W';
        const runtime = document.getElementById('batteryLife')?.textContent || '—';
        const batteryCount = document.getElementById('batteryCount')?.textContent || '0';

        // Try to get more details if available
        const batteryName = document.getElementById('batterySelect')?.selectedOptions[0]?.text || 'Battery';
        const peakLoad = document.getElementById('totalCurrent144Elem')?.textContent || ''; // Approximation

        return `
            <div style="display: flex; gap: 15px;">
                <div style="flex: 1; background: #f0fdf4; padding: 10px; border: 1px solid #bbf7d0; border-radius: 4px;">
                    <div style="font-size: 0.8em; color: #166534; text-transform: uppercase; font-weight: bold;">Total Load</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #14532d;">${totalWatt}</div>
                    <div style="font-size: 0.8em; color: #166534;">${peakLoad ? 'Peak: ' + peakLoad : ''}</div>
                </div>
                <div style="flex: 1; background: #eff6ff; padding: 10px; border: 1px solid #bfdbfe; border-radius: 4px;">
                    <div style="font-size: 0.8em; color: #1e40af; text-transform: uppercase; font-weight: bold;">Est. Runtime</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #1e3a8a;">${runtime}</div>
                    <div style="font-size: 0.8em; color: #1e40af;">w/ ${batteryName}</div>
                </div>
                <div style="flex: 1; background: #fff7ed; padding: 10px; border: 1px solid #fed7aa; border-radius: 4px;">
                    <div style="font-size: 0.8em; color: #9a3412; text-transform: uppercase; font-weight: bold;">Daily Needs</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #7c2d12;">${batteryCount} Batts</div>
                    <div style="font-size: 0.8em; color: #9a3412;">for 12h day</div>
                </div>
            </div>
        `;
    }

    // --- Rendering Logic ---

    function renderPreviewContent() {
        const paper = state.elements.paper;
        if (!paper) return;

        paper.innerHTML = ''; // Clear existing

        // 1. Header (Project Info)
        const header = document.createElement('div');
        header.className = 'preview-header';
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
        const reqSection = document.createElement('section');
        reqSection.id = 'preview-section-project';
        reqSection.className = 'print-section project-requirements-section';
        const sourceReq = document.getElementById('projectRequirementsOutput');
        if (sourceReq) {
            reqSection.innerHTML = sourceReq.innerHTML;
        } else {
            reqSection.innerHTML = '<p><em>No project requirements data.</em></p>';
        }
        paper.appendChild(reqSection);

        // 3. Device Selection (Rental Layout vs Standard)
        const devSection = document.createElement('section');
        devSection.id = 'preview-section-devices';
        devSection.className = 'print-section';
        devSection.innerHTML = '<h2>Device Selection</h2>';

        if (state.preferences.layout === 'rental') {
            devSection.innerHTML += generateRentalDeviceGrid();
        } else {
            const sourceDevs = document.getElementById('overviewDeviceSection');
            if (sourceDevs) {
                devSection.innerHTML += sourceDevs.innerHTML;
            }
        }
        paper.appendChild(devSection);

        // 4. Power Diagram
        const diagSection = document.createElement('section');
        diagSection.id = 'preview-section-diagram';
        diagSection.className = 'print-section';
        diagSection.innerHTML = '<h2>Power Diagram</h2>';
        const sourceDiag = document.getElementById('setupDiagram');
        if (sourceDiag) {
            // Clone SVG or Canvas
            const svg = sourceDiag.querySelector('svg');
            if (svg) {
                diagSection.appendChild(svg.cloneNode(true));
            } else {
                diagSection.innerHTML += sourceDiag.innerHTML;
            }
        }
        paper.appendChild(diagSection);

        // 5. Power Summary
        const powerSection = document.createElement('section');
        powerSection.id = 'preview-section-battery'; // Using battery ID for toggle mapping
        powerSection.className = 'print-section';
        powerSection.style.marginTop = '20px';
        powerSection.innerHTML = '<h2>Power Summary</h2>';
        powerSection.innerHTML += generatePowerSummary();

        // Also append Battery Comparison Table if needed, or just the summary
        const sourceBatteryTable = document.getElementById('batteryComparison');
        if (sourceBatteryTable) {
            const batteryClone = sourceBatteryTable.cloneNode(true);
            // Remove the heading from clone as we have our own section heading
            const heading = batteryClone.querySelector('h2');
            if (heading) heading.remove();
            powerSection.appendChild(batteryClone);
        }

        paper.appendChild(powerSection);

        // 6. Gear List
        const gearSection = document.createElement('section');
        gearSection.id = 'preview-section-gearList';
        gearSection.className = 'print-section gear-list-section';
        gearSection.innerHTML = '<h2>Gear List</h2>';
        const sourceGear = document.getElementById('gearListOutput');
        if (sourceGear) {
            gearSection.innerHTML += sourceGear.innerHTML;
        }
        paper.appendChild(gearSection);

        updateSectionVisibility();
    }

    function updateSectionVisibility() {
        const map = {
            project: 'preview-section-project',
            devices: 'preview-section-devices',
            diagram: 'preview-section-diagram',
            gearList: 'preview-section-gearList',
            battery: 'preview-section-battery'
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

        bindEvents();
        renderPreviewContent();
        state.elements.modal.classList.remove('hidden');
        state.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closePreview() {
        if (!state.elements.modal) return;
        state.elements.modal.classList.add('hidden');
        state.isOpen = false;
        document.body.style.overflow = '';
    }

    function triggerNativePrint() {
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
