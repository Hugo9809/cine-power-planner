/**
 * @fileoverview OVERVIEW MODULE: Print Manager
 * 
 * Manages the Print Options dialog, preferences persistence, and cleanup tasks.
 * 
 * @module modules/overview/print-manager
 */

import { logOverview } from './logging.js';

export const PRINT_PREFERENCES_STORAGE_KEY = 'cineRentalPrintSections';

// --- Cleanup State ---

let pendingPrintCleanup = null;

export function setPendingPrintCleanup(fn) {
    pendingPrintCleanup = fn;
}

export function runPendingPrintCleanup(reason) {
    if (typeof pendingPrintCleanup !== 'function') return;

    const cleanup = pendingPrintCleanup;
    pendingPrintCleanup = null;
    try {
        cleanup();
    } catch (cleanupError) {
        logOverview('warn', 'Failed to restore print state after workflow finished.', cleanupError, {
            action: 'print-cleanup',
            reason,
        });
    }
}

// --- Preferences ---

export function getPrintSectionConfig() {
    // Note checks for global window functions to support legacy behavior
    const gearListVisible = (typeof window.hasProjectInfoData === 'function' && typeof window.getCurrentProjectInfo === 'function')
        ? window.hasProjectInfoData(window.getCurrentProjectInfo())
        : true;

    return [
        {
            id: 'project',
            selector: '#projectRequirementsOutput',
            defaultVisible: true,
            labelKey: 'rentalPrintSectionProject',
            fallbackLabel: 'Project Requirements',
        },
        {
            id: 'devices',
            selector: '#overviewDeviceSection',
            defaultVisible: true,
            labelKey: 'rentalPrintSectionDevices',
            fallbackLabel: 'Camera Setup Devices',
        },
        {
            id: 'power',
            selector: '#resultsSection',
            defaultVisible: true,
            labelKey: 'rentalPrintSectionPower',
            fallbackLabel: 'Power Summary',
        },
        {
            id: 'battery',
            selector: '.battery-comparison-section',
            defaultVisible: true,
            labelKey: 'rentalPrintSectionBattery',
            fallbackLabel: 'Battery Comparison',
        },
        {
            id: 'diagram',
            selector: '#setupDiagram',
            defaultVisible: true,
            labelKey: 'rentalPrintSectionDiagram',
            fallbackLabel: 'Camera Diagram',
        },
        {
            id: 'gear',
            selector: '#gearListOutput',
            defaultVisible: gearListVisible,
            labelKey: 'rentalPrintSectionGearList',
            fallbackLabel: 'Gear List',
        },
    ];
}

export function loadPrintPreferences() {
    if (typeof localStorage === 'undefined') return null;
    try {
        const raw = localStorage.getItem(PRINT_PREFERENCES_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;

        if (parsed.sections || parsed.layout) {
            return {
                sections: parsed.sections ? { ...parsed.sections } : {},
                layout: typeof parsed.layout === 'string' ? parsed.layout : 'standard',
            };
        }
        return {
            sections: { ...parsed },
            layout: 'rental',
        };
    } catch (error) {
        logOverview('warn', 'Unable to read rental print section preferences.', error, {
            action: 'rental-print-load-preferences',
        });
    }
    return null;
}

export function savePrintPreferences(preferences) {
    if (typeof localStorage === 'undefined') return false;
    try {
        const serialized = JSON.stringify(preferences || {});
        localStorage.setItem(PRINT_PREFERENCES_STORAGE_KEY, serialized);
        return true;
    } catch (error) {
        logOverview('warn', 'Unable to persist rental print section preferences.', error, {
            action: 'rental-print-save-preferences',
        });
    }
    return false;
}

// --- Dialog Management ---

let printOptionsDialogContext = null;

export function getPrintOptionsDialogContext() {
    if (printOptionsDialogContext) return printOptionsDialogContext;
    if (typeof document === 'undefined') return null;

    const dialog = document.getElementById('printOptionsDialog');
    if (!dialog) return null;

    // Helper to close dialog (assumes global closeDialog exists)
    const safeClose = (d) => { if (typeof window.closeDialog === 'function') window.closeDialog(d); };

    if (!dialog.hasAttribute('data-print-backdrop-close')) {
        dialog.addEventListener('click', (event) => {
            if (event && event.target === dialog) safeClose(dialog);
        });
        dialog.addEventListener('cancel', (event) => {
            if (event) event.preventDefault();
            safeClose(dialog);
        });
        dialog.setAttribute('data-print-backdrop-close', 'true');
    }

    const form = dialog.querySelector('#printOptionsForm');
    const sections = dialog.querySelector('#printOptionsSections');
    const selectAllBtn = dialog.querySelector('#printOptionsSelectAllBtn');
    const cancelBtn = dialog.querySelector('#printOptionsCancelBtn');
    const exportBtn = dialog.querySelector('#printOptionsExportBtn');
    const printBtn = dialog.querySelector('#printOptionsPrintBtn');
    const title = dialog.querySelector('#printOptionsDialogTitle');
    const description = dialog.querySelector('#printOptionsDialogDescription');
    const layoutFieldset = dialog.querySelector('#printOptionsLayout');
    const layoutLabel = dialog.querySelector('#printOptionsLayoutLabel');
    const layoutChoices = dialog.querySelector('#printOptionsLayoutChoices');

    if (!form || !sections || !title || !description || !selectAllBtn || !cancelBtn || !exportBtn || !printBtn) {
        return null;
    }

    printOptionsDialogContext = {
        dialog, form, sections, selectAllBtn, cancelBtn, exportBtn, printBtn,
        layoutFieldset, layoutLabel, layoutChoices, title, description,
    };
    return printOptionsDialogContext;
}

export function populatePrintOptionsDialog(context, preferences, onConfirm) {
    if (!context) return;

    // Globals assumed: texts, currentLang
    const texts = window.texts;
    const currentLang = window.currentLang;

    const langTexts = (texts && texts[currentLang]) || texts?.en || {};
    const fallbackTexts = texts?.en || {};
    const getTxt = (key, fallback) => langTexts[key] || fallbackTexts[key] || fallback;

    const title = getTxt('rentalPrintDialogTitle', 'Export PDF / Print');
    const description = getTxt('rentalPrintDialogDescription', 'Choose what to include before exporting or printing.');
    const sectionsLabel = getTxt('rentalPrintDialogSectionsLabel', 'Sections to include');
    const exportLabel = getTxt('rentalPrintDialogConfirm', 'Export PDF');
    const cancelLabel = getTxt('rentalPrintDialogCancel', 'Cancel');
    const selectAllLabel = getTxt('rentalPrintDialogSelectAll', 'Select all');
    const printLabel = getTxt('printBtn', 'Print');
    const layoutLabelText = getTxt('printOptionsLayoutLabel', 'Layout');
    const layoutStandardLabel = getTxt('printOptionsLayoutStandard', 'Standard layout');
    const layoutRentalLabel = getTxt('printOptionsLayoutRental', 'Rental-friendly layout');

    context.title.textContent = title;
    context.description.textContent = description;
    context.selectAllBtn.textContent = selectAllLabel;
    context.cancelBtn.textContent = cancelLabel;
    context.exportBtn.textContent = exportLabel;
    context.printBtn.textContent = printLabel;

    context.sections.innerHTML = '';
    const legend = document.createElement('legend');
    legend.textContent = sectionsLabel;
    context.sections.appendChild(legend);

    const sectionConfig = getPrintSectionConfig();
    const preferenceSections = (preferences && typeof preferences.sections === 'object') ? preferences.sections : preferences;

    sectionConfig.forEach(section => {
        const label = langTexts[section.labelKey] || fallbackTexts[section.labelKey] || section.fallbackLabel;
        const wrapper = document.createElement('label');
        wrapper.className = 'print-options-section';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'print-section';
        input.value = section.id;
        input.id = `printSection_${section.id}`;

        const preferenceValue = preferenceSections && Object.prototype.hasOwnProperty.call(preferenceSections, section.id)
            ? preferenceSections[section.id]
            : section.defaultVisible;

        input.checked = preferenceValue !== false;

        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        wrapper.appendChild(input);
        wrapper.appendChild(textSpan);
        context.sections.appendChild(wrapper);
    });

    if (context.layoutFieldset && context.layoutLabel && context.layoutChoices) {
        context.layoutLabel.textContent = layoutLabelText;
        context.layoutChoices.innerHTML = '';
        const currentLayout = (preferences && typeof preferences.layout === 'string') ? preferences.layout : 'standard';

        const layoutOptions = [
            { value: 'standard', label: layoutStandardLabel },
            { value: 'rental', label: layoutRentalLabel },
        ];

        layoutOptions.forEach(option => {
            const wrapper = document.createElement('label');
            wrapper.className = 'print-options-section';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'print-layout';
            input.value = option.value;
            if (option.value === currentLayout) input.checked = true;

            const textSpan = document.createElement('span');
            textSpan.textContent = option.label;
            wrapper.appendChild(input);
            wrapper.appendChild(textSpan);
            context.layoutChoices.appendChild(wrapper);
        });
        context.layoutFieldset.hidden = false;
    } else if (context.layoutFieldset) {
        context.layoutFieldset.hidden = true;
    }

    const normalizedPreferences = (preferences && typeof preferences === 'object') ? preferences : {};
    context.form._printConfirmHandler = typeof onConfirm === 'function' ? onConfirm : null;

    if (typeof context.form._removeDialogListeners === 'function') {
        context.form._removeDialogListeners();
        context.form._removeDialogListeners = null;
    }

    const collectSelections = () => {
        const selections = {};
        context.form.querySelectorAll('input[name="print-section"]').forEach(input => {
            selections[input.value] = input.checked;
        });
        const layoutInput = context.form.querySelector('input[name="print-layout"]:checked');
        return {
            sections: selections,
            layout: layoutInput ? layoutInput.value : (normalizedPreferences.layout || 'standard'),
        };
    };

    const safeClose = (d) => { if (typeof window.closeDialog === 'function') window.closeDialog(d); };

    const handleConfirm = (event, mode) => {
        event.preventDefault();
        const result = collectSelections();
        savePrintPreferences(result);
        safeClose(context.dialog);
        if (typeof context.form._printConfirmHandler === 'function') {
            context.form._printConfirmHandler({ mode, preferences: result });
        }
    };

    const submitHandler = e => handleConfirm(e, 'export');
    const printHandler = e => handleConfirm(e, 'print');
    const cancelHandler = e => { e.preventDefault(); safeClose(context.dialog); };
    const selectAllHandler = e => {
        e.preventDefault();
        context.form.querySelectorAll('input[name="print-section"]').forEach(input => { input.checked = true; });
    };

    context.form.addEventListener('submit', submitHandler);
    context.exportBtn.addEventListener('click', submitHandler);
    context.printBtn.addEventListener('click', printHandler);
    context.cancelBtn.addEventListener('click', cancelHandler);
    context.selectAllBtn.addEventListener('click', selectAllHandler);

    context.form._removeDialogListeners = () => {
        context.form.removeEventListener('submit', submitHandler);
        context.exportBtn.removeEventListener('click', submitHandler);
        context.printBtn.removeEventListener('click', printHandler);
        context.cancelBtn.removeEventListener('click', cancelHandler);
        context.selectAllBtn.removeEventListener('click', selectAllHandler);
    };
}
