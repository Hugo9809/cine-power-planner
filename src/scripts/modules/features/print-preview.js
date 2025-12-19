/* global cineModuleBase, cineCoreAppLocalizationAccessors */

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

    function getText(key, defaultText) {
        const accessors = typeof cineCoreAppLocalizationAccessors !== 'undefined' ? cineCoreAppLocalizationAccessors : (typeof window !== 'undefined' ? window.cineCoreAppLocalizationAccessors : null);

        if (accessors && typeof accessors.getLanguageTexts === 'function') {
            const lang = (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'en';
            const texts = accessors.getLanguageTexts(lang);
            const parts = key.split('.');
            let current = texts;
            for (const part of parts) {
                if (current && typeof current === 'object' && part in current) {
                    current = current[part];
                } else {
                    return defaultText;
                }
            }
            return current || defaultText;
        }
        return defaultText;
    }

    function localizeStaticContent() {
        if (!state.elements.modal) return;

        const sidebar = state.elements.modal.querySelector('.mockup-sidebar');
        if (!sidebar) return;

        // Title
        const title = sidebar.querySelector('.mockup-sidebar-header h2');
        if (title) title.textContent = getText('printPreview.title', 'Print & Export');

        // Close/Back Btn
        if (state.elements.closeBtn) {
            state.elements.closeBtn.setAttribute('aria-label', getText('printPreview.backLabel', 'Back'));
            const textSpan = state.elements.closeBtn.querySelector('.btn-text');
            if (textSpan) textSpan.textContent = getText('printPreview.backLabel', 'Back');
        }

        // Layout Mode
        const layoutTitle = sidebar.querySelector('.control-section:nth-child(2) .section-title');
        if (layoutTitle) layoutTitle.textContent = getText('printPreview.layoutModeTitle', 'Layout Mode');

        const rentalLabel = sidebar.querySelector('label[for="printLayoutRentalToggle"]');
        if (rentalLabel && rentalLabel.childNodes.length > 0) {
            // Assuming text is the last child or we replace the text node
            const textNode = Array.from(rentalLabel.childNodes).find(n => n.nodeType === 3 && n.textContent.trim().length > 0);
            if (textNode) textNode.textContent = getText('printPreview.layoutRentalLabel', 'Rental Friendly');
        }

        const rentalDesc = sidebar.querySelector('.control-section:nth-child(2) p');
        if (rentalDesc) rentalDesc.textContent = getText('printPreview.layoutRentalDescription', 'Optimizes layout for rental by grouping items by category.');

        // Sections
        const sectionsTitle = sidebar.querySelector('.control-section:nth-child(3) .section-title');
        if (sectionsTitle) sectionsTitle.textContent = getText('printPreview.sectionsTitle', 'Sections');

        const sectionLabels = {
            'printSectionProject': 'printPreview.sectionProject',
            'printSectionDevices': 'printPreview.sectionDevices',
            'printSectionDiagram': 'printPreview.sectionDiagram',
            'printSectionGearList': 'printPreview.sectionGearList',
            'printSectionBattery': 'printPreview.sectionBattery'
        };

        Object.entries(sectionLabels).forEach(([id, key]) => {
            const label = sidebar.querySelector(`label[for="${id}"]`);
            if (label) {
                // Try finding a direct text node
                let textNode = Array.from(label.childNodes).find(node => node.nodeType === 3 && node.textContent.trim().length > 0);

                // If not found, look for a span (common in styled checkboxes)
                if (!textNode) {
                    const span = label.querySelector('span:not(.slider)');
                    if (span && span.textContent.trim().length > 0) {
                        // Update the span's text directly
                        span.textContent = getText(key, span.textContent.trim());
                        return;
                    }
                }

                if (textNode) {
                    // Wrap text in a relative span to ensure it sits above any absolute positioned inputs/pseudo-elements
                    const newText = getText(key, textNode.textContent.trim());
                    const span = document.createElement('span');
                    span.style.position = 'relative';
                    span.style.zIndex = '1';
                    span.textContent = ' ' + newText;
                    textNode.replaceWith(span);
                }
            }
        });

        // Buttons
        if (state.elements.exportBtn) {
            const icon = state.elements.exportBtn.querySelector('.icon-glyph');
            state.elements.exportBtn.innerHTML = '';
            if (icon) state.elements.exportBtn.appendChild(icon);
            state.elements.exportBtn.appendChild(document.createTextNode(' ' + getText('printPreview.exportPdfButton', 'Export PDF')));
        }

        if (state.elements.printBtn) {
            const icon = state.elements.printBtn.querySelector('.icon-glyph');
            state.elements.printBtn.innerHTML = '';
            if (icon) state.elements.printBtn.appendChild(icon);
            state.elements.printBtn.appendChild(document.createTextNode(' ' + getText('printPreview.printButton', 'Print')));
        }
    }

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
            printBtn: document.getElementById('printPreviewPrintBtn'),


        };

        return !!state.elements.modal;
    }

    function bindEvents() {
        if (!state.elements.modal) return;



        // Close Button
        if (state.elements.closeBtn) {
            const newCloseBtn = state.elements.closeBtn.cloneNode(true);
            state.elements.closeBtn.parentNode.replaceChild(newCloseBtn, state.elements.closeBtn);
            state.elements.closeBtn = newCloseBtn;
            state.elements.closeBtn.addEventListener('click', closePreview);
        }

        // Layout Toggle
        if (state.elements.layoutToggle) {
            state.elements.layoutToggle.addEventListener('change', (e) => {
                const isRental = e.target.checked;
                state.preferences.layout = isRental ? 'rental' : 'standard';

                // Automatically adjust section visibility based on layout mode
                // Rental Mode: Show Project and Gear List only. Hide Devices, Diagram, Power/Battery.
                if (isRental) {
                    if (state.elements.sectionToggles.devices) state.elements.sectionToggles.devices.checked = false;
                    if (state.elements.sectionToggles.diagram) state.elements.sectionToggles.diagram.checked = false;
                    if (state.elements.sectionToggles.battery) state.elements.sectionToggles.battery.checked = true; // Use battery check for summary? User said incomplete. Let's keep it checked but content changes? 
                    // User said: "it should only show the project requirements and gear list and hide everything else."
                    // So hide battery too? "Power summary is also incomplete". Maybe they want it?
                    // "It should only show the project requirements and gear list and hide everything else." -> This implies Power Summary should be hidden too.

                    if (state.elements.sectionToggles.battery) state.elements.sectionToggles.battery.checked = false;

                    state.preferences.sections.devices = false;
                    state.preferences.sections.diagram = false;
                    state.preferences.sections.battery = false;
                } else {
                    // Restore standard defaults
                    if (state.elements.sectionToggles.devices) state.elements.sectionToggles.devices.checked = true;
                    if (state.elements.sectionToggles.diagram) state.elements.sectionToggles.diagram.checked = true;
                    if (state.elements.sectionToggles.battery) state.elements.sectionToggles.battery.checked = true;

                    state.preferences.sections.devices = true;
                    state.preferences.sections.diagram = true;
                    state.preferences.sections.battery = true;
                }

                updateSectionVisibility(); // Update UI state (checkboxes) before render? 
                // renderPreviewContent uses state.preferences.sections too.
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

    // Delegated listener for the "Print / Export" button inside the dynamically generated Overview Dialog
    // This ensures we catch the click even if the element is created later or by another script
    if (typeof document !== 'undefined' && document.body) {
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('#openPrintOptionsBtn');
            if (target) {
                e.preventDefault();
                e.stopImmediatePropagation(); // Prevent overview.js from opening the old dialog
                openPreview();
            }
        }, { capture: true }); // Use capture to intercept before bubbling listeners
    }

    function generateRentalDeviceGrid() {
        // Try to find the device section. It might be 'overviewDeviceSection' or inside 'setup-config'
        let sourceDevs = document.getElementById('overviewDeviceSection');

        // Fallback: try to construct it from the live DOM if the specific ID isn't found
        // This is a bit of a hack, but it handles the case where overview.js hasn't generated the ID yet
        if (!sourceDevs) {
            // Look for the header "Configure Devices" and assume content follows? 
            // Or better, check if we can find .device-category elements
            const potentialCategories = document.querySelectorAll('.device-category');
            if (potentialCategories.length > 0) {
                // We found categories in the DOM, let's use them
                const container = document.createElement('div');
                container.className = 'device-category-container';
                potentialCategories.forEach(cat => {
                    container.appendChild(cat.cloneNode(true));
                });
                return container.outerHTML;
            }
            return '<p>No devices selected or overview not generated.</p>';
        }

        const container = document.createElement('div');
        container.className = 'device-category-container';

        // Fix: Check for existing categories first (handling nested structure from overview.js)
        const existingCategories = sourceDevs.querySelectorAll('.device-category');
        if (existingCategories.length > 0) {
            existingCategories.forEach(cat => {
                container.appendChild(cat.cloneNode(true));
            });
            return container.outerHTML;
        }

        // Parse the source HTML to find categories and devices (Legacy flat structure support)
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
                    title.textContent = getText('categoryNames.other', 'Other');
                    currentCategoryDiv.appendChild(title);
                    container.appendChild(currentCategoryDiv);
                }
                // Clone the device block
                const clone = child.cloneNode(true);
                currentCategoryDiv.appendChild(clone);
            } else if (child.classList.contains('device-category')) {
                // If it's already a category div (nested structure), just clone it
                container.appendChild(child.cloneNode(true));
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
                    <div style="font-size: 0.8em; color: #166534; text-transform: uppercase; font-weight: bold;">${getText('printPreview.generatedTotalLoad', 'Total Load')}</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #14532d;">${totalWatt}</div>
                    <div style="font-size: 0.8em; color: #166534;">${peakLoad ? getText('printPreview.generatedPeak', 'Peak:') + ' ' + peakLoad : ''}</div>
                </div>
                <div style="flex: 1; background: #eff6ff; padding: 10px; border: 1px solid #bfdbfe; border-radius: 4px;">
                    <div style="font-size: 0.8em; color: #1e40af; text-transform: uppercase; font-weight: bold;">${getText('printPreview.generatedEstRuntime', 'Est. Runtime')}</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #1e3a8a;">${runtime}</div>
                    <div style="font-size: 0.8em; color: #1e40af;">${getText('printPreview.generatedWith', 'w/')} ${batteryName}</div>
                </div>
                <div style="flex: 1; background: #fff7ed; padding: 10px; border: 1px solid #fed7aa; border-radius: 4px;">
                    <div style="font-size: 0.8em; color: #9a3412; text-transform: uppercase; font-weight: bold;">${getText('printPreview.generatedDailyNeeds', 'Daily Needs')}</div>
                    <div style="font-size: 1.5em; font-weight: bold; color: #7c2d12;">${batteryCount} ${getText('printPreview.generatedBatts', 'Batts')}</div>
                    <div style="font-size: 0.8em; color: #9a3412;">${getText('printPreview.generatedFor12hDay', 'for 12h day')}</div>
                </div>
            </div>
        `;
    }

    // --- Rendering Logic ---

    function renderPreviewContent() {
        const paper = state.elements.paper;
        if (!paper) return;

        paper.innerHTML = ''; // Clear existing

        const isRental = state.preferences.layout === 'rental';

        // 1. Header (Project Info)
        const header = document.createElement('div');
        header.className = 'preview-header';
        const projectName = document.getElementById('setupName')?.value || 'Untitled Project';
        const production = document.getElementById('productionInput')?.value || '';
        const dateStr = new Date().toLocaleDateString();

        header.innerHTML = `
            <h1>${getText('printPreview.generatedTitle', 'Overview')}</h1>
            <p><strong>${getText('printPreview.generatedProjectNameLabel', 'Project Name:')}</strong> ${projectName}</p>
            <p><strong>${getText('printPreview.generatedProductionLabel', 'Production:')}</strong> ${production} | <strong>${getText('printPreview.generatedDateLabel', 'Date:')}</strong> ${dateStr}</p>
        `;
        paper.appendChild(header);

        // 2. Project Requirements
        const reqSection = document.createElement('section');
        reqSection.id = 'preview-section-project';
        reqSection.className = 'print-section project-requirements-section';
        const sourceReq = document.getElementById('projectRequirementsOutput');
        if (sourceReq) {
            reqSection.innerHTML = sourceReq.innerHTML;
        } else reqSection.innerHTML = '<p><em>' + getText('printPreview.generatedNoProjectRequirements', 'No project requirements data.') + '</em></p>';
        paper.appendChild(reqSection);

        // 3. Device Selection
        // In Rental Mode, we hide this section by default (via toggle), but if it *is* enabled, 
        // we might want to respect the "Rental Friendly Layout" (grouped grid) vs Standard.
        // However, the user said "Rental friendly layout... should only show project requirements and gear list".
        // So we might not render it at all if isRental is true to be safe, 
        // OR rely on updateSectionVisibility hiding it.
        // Let's render it but use the rental layout if sections.devices is true.
        // But wait, the loop below appends it.

        const devSection = document.createElement('section');
        devSection.id = 'preview-section-devices';
        devSection.className = 'print-section';
        devSection.innerHTML = '<h2>' + getText('printPreview.generatedDeviceSelectionTitle', 'Device Selection') + '</h2>';

        if (state.preferences.layout === 'rental') {
            devSection.innerHTML += generateRentalDeviceGrid();
        } else {
            const sourceDevs = document.getElementById('overviewDeviceSection');
            if (sourceDevs) {
                devSection.innerHTML += sourceDevs.innerHTML;
            } else {
                // Fallback attempt
                const potentialCategories = document.querySelectorAll('.device-category');
                if (potentialCategories.length > 0) {
                    potentialCategories.forEach(cat => {
                        devSection.appendChild(cat.cloneNode(true));
                    });
                } else {
                    devSection.innerHTML += '<p>' + getText('printPreview.generatedNoDevicesSelected', 'No devices selected.') + '</p>';
                }
            }
        }
        paper.appendChild(devSection);

        // 4. Power Diagram
        const diagSection = document.createElement('section');
        diagSection.id = 'preview-section-diagram';
        diagSection.className = 'print-section';
        diagSection.innerHTML = '<h2>' + getText('printPreview.generatedPowerDiagramTitle', 'Power Diagram') + '</h2>';
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
        powerSection.innerHTML = '<h2>' + getText('printPreview.generatedPowerSummaryTitle', 'Power Summary') + '</h2>';
        powerSection.innerHTML += generatePowerSummary();

        // Also append Battery Comparison Table if needed
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
        gearSection.innerHTML = '<h2>' + getText('printPreview.generatedGearListTitle', 'Gear List') + '</h2>';
        const sourceGear = document.getElementById('gearListOutput');
        if (sourceGear) {
            // Clone first to manipulate
            const clonedGear = sourceGear.cloneNode(true);

            // Cleanup: Remove Edit buttons/toggles anywhere in the gear list
            const interactives = clonedGear.querySelectorAll('.gear-rental-toggle, .gear-edit-btn, button, .ui-only');
            interactives.forEach(el => el.remove());

            if (isRental) {
                // Filter: "Hide own gear and gear that is not provided by the rental"
                const items = clonedGear.querySelectorAll('.gear-item');
                items.forEach(item => {
                    const text = item.textContent || '';
                    const attrs = item.getAttribute('data-gear-attributes') || '';
                    const rentalNote = item.getAttribute('data-rental-note') || '';

                    // Check for "Own Gear" markers
                    const isOwnGear = text.includes('Own Gear') || attrs.includes('Own Gear') || rentalNote.includes('Own Gear');

                    if (isOwnGear) {
                        // Remove the item.
                        // Items are often followed by <br> in the legacy format.
                        const next = item.nextSibling;
                        if (next && next.nodeName === 'BR') {
                            next.remove();
                        }
                        item.remove();
                    }
                });

                // Cleanup empty categories
                const categories = clonedGear.querySelectorAll('tbody.category-group, .gear-category');
                categories.forEach(cat => {
                    // Check if it has any remaining gear items
                    const hasItems = cat.querySelectorAll('.gear-item').length > 0;
                    if (!hasItems) {
                        cat.style.display = 'none';
                    }
                });
            }

            gearSection.appendChild(clonedGear);
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
                // Respect the preference, which we updated in the toggle listener
                // But double check rental constraints?
                // If the user manually re-enables a section in Rental Mode, should we allow it?
                // Yes, flexibility is good. The Toggle preset handled the default state.
                el.style.display = state.preferences.sections[key] ? 'block' : 'none';
            }
        });
    }

    function openPreview() {
        if (!state.elements.modal) initializeDomReferences();
        if (!state.elements.modal) return;

        // bindEvents() and localizeStaticContent() are called on init
        // We re-render content to ensure it's fresh
        renderPreviewContent();

        // Use showModal for top-layer stacking
        if (typeof state.elements.modal.showModal === 'function') {
            // Check if already open to avoid error
            if (!state.elements.modal.open) {
                state.elements.modal.showModal();
            }
        }

        state.elements.modal.classList.remove('hidden');
        state.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closePreview() {
        if (!state.elements.modal) return;

        if (typeof state.elements.modal.close === 'function') {
            // Check if open before closing to avoid error
            if (state.elements.modal.open) {
                state.elements.modal.close();
            }
        }

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

    // --- Initialization ---
    function init() {
        if (initializeDomReferences()) {
            bindEvents();
            localizeStaticContent();
        }
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

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
