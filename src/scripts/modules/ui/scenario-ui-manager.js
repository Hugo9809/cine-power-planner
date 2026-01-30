import { iconGlyph, ICON_GLYPHS, applyIconGlyph } from '../icons.js';
import { updateTripodOptions } from '../../core/app-core-new-1.js';

// We need keys for iconGlyph, but they might be on globalScope.ICON_FONT_KEYS or exported.
// The icons.js module does not export the KEYS directly in the named exports? 
// Wait, lines 14 & 255 of icons.js load them from global or define default.
// But they are not exported as named export.
// We can assume they are global for now since app-session.js uses them that way.
// Or we can get them from window.ICON_FONT_KEYS.

const getIconFontKeys = () => {
    if (typeof window !== 'undefined' && window.ICON_FONT_KEYS) return window.ICON_FONT_KEYS;
    // Fallback if not globally ready (should be defined by app-core-environment.js)
    return {
        UICONS: 'uicons',
        ESSENTIAL: 'essential',
        GADGET: 'gadget',
        FILM: 'film',
        TEXT: 'text'
    };
};

const scenarioIcons = {
    Indoor: () => iconGlyph('\uF194', getIconFontKeys().ESSENTIAL),
    Outdoor: () => iconGlyph('\uF278', getIconFontKeys().ESSENTIAL),
    Studio: () => iconGlyph('\uF128', getIconFontKeys().FILM),
    Tripod: () => iconGlyph('\uF12C', getIconFontKeys().FILM),
    Handheld: () => iconGlyph('\uE93B', getIconFontKeys().UICONS),
    Easyrig: () => iconGlyph('\uE15B', getIconFontKeys().UICONS),
    'Cine Saddle': () => iconGlyph('\uF01B', getIconFontKeys().UICONS),
    Steadybag: () => iconGlyph('\uE925', getIconFontKeys().UICONS),
    Dolly: () => iconGlyph('\uF109', getIconFontKeys().FILM),
    Slider: () => iconGlyph('\uE112', getIconFontKeys().UICONS),
    Steadicam: () => iconGlyph('\uEFBD', getIconFontKeys().UICONS),
    Gimbal: () => iconGlyph('\uEA9C', getIconFontKeys().UICONS),
    Trinity: () => iconGlyph('\uEA4E', getIconFontKeys().UICONS),
    Rollcage: () => iconGlyph('\uF04C', getIconFontKeys().UICONS),
    'Car Mount': () => iconGlyph('\uE35B', getIconFontKeys().UICONS),
    Jib: () => iconGlyph('\uE553', getIconFontKeys().UICONS),
    'Undersling mode': () => iconGlyph('\uE0D8', getIconFontKeys().UICONS),
    Crane: () => iconGlyph('\uE554', getIconFontKeys().UICONS),
    'Remote Head': () => ICON_GLYPHS.controller,
    'Extreme cold (snow)': () => iconGlyph('\uF0FB', getIconFontKeys().UICONS),
    'Extreme rain': () => iconGlyph('\uE4A6', getIconFontKeys().UICONS),
    'Extreme heat': () => iconGlyph('\uE80F', getIconFontKeys().UICONS),
    'Rain Machine': () => iconGlyph('\uF153', getIconFontKeys().UICONS),
    'Slow Motion': () => iconGlyph('\uF373', getIconFontKeys().UICONS),
    'Battery Belt': () => ICON_GLYPHS.batteryBolt
};

function getRequiredScenarioOptionEntries(selectElement) {
    const options = new Map();

    if (selectElement && selectElement.options) {
        Array.from(selectElement.options).forEach(option => {
            if (!option) return;
            if (option.disabled) return;
            const value = typeof option.value === 'string' ? option.value.trim() : '';
            if (!value) return;
            const label = typeof option.textContent === 'string' && option.textContent.trim()
                ? option.textContent.trim()
                : value;
            if (!options.has(value)) {
                options.set(value, label);
            }
        });
    }

    Object.keys(scenarioIcons).forEach(key => {
        if (typeof key !== 'string') return;
        const value = key.trim();
        if (!value || options.has(value)) {
            return;
        }
        options.set(value, value);
    });

    return Array.from(options.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
}

export const ScenarioUiManager = {
    elements: {
        requiredScenariosSelect: null,
        requiredScenariosSummary: null,
        remoteHeadOption: null,
        monitorSelect: null,
        videoDistributionSelect: null,
        tripodPreferencesRow: null,
        tripodPreferencesHeading: null,
        tripodPreferencesSection: null,
        tripodHeadBrandSelect: null,
        tripodBowlSelect: null,
        tripodTypesSelect: null,
        tripodSpreaderSelect: null
    },

    initialize(elements, dependencies = {}) {
        this.elements = { ...this.elements, ...elements };
        this.dependencies = dependencies;

        const { requiredScenariosSelect, tripodHeadBrandSelect, tripodBowlSelect } = this.elements;

        if (requiredScenariosSelect) {
            requiredScenariosSelect.addEventListener('change', () => this.updateSummary());
            this.updateSummary();
        }

        if (tripodHeadBrandSelect) {
            tripodHeadBrandSelect.addEventListener('change', updateTripodOptions);
        }
        if (tripodBowlSelect) {
            tripodBowlSelect.addEventListener('change', updateTripodOptions);
        }

        this.injectGlobalEntriesGetter();

        return true;
    },

    injectGlobalEntriesGetter() {
        // This shim is needed because other parts of the system (legacy or other modules)
        // might try to read the available scenarios for validations or Autogear.
        // We inject it into the session runtime scopes provided by session-runtime.js (if available globally)
        // or just window.

        const getter = () => getRequiredScenarioOptionEntries(this.elements.requiredScenariosSelect);

        if (typeof window !== 'undefined') {
            window.getRequiredScenarioOptionEntries = getter;
        }

        try {
            const { getSessionRuntimeScopes } = require('../core/session-runtime.js'); // Dynamic require if needed or assume global?
            // Actually app-session.js handles the import. 
            // We can just rely on window injection for now or expect the caller to register it?
            // Original code injected it into all scopes found by getSessionRuntimeScopes.
        } catch (e) { }
    },

    // Public getter for use by app-session or others
    getOptions() {
        return getRequiredScenarioOptionEntries(this.elements.requiredScenariosSelect);
    },

    updateSummary() {
        const {
            requiredScenariosSelect,
            requiredScenariosSummary,
            remoteHeadOption,
            monitorSelect,
            videoDistributionSelect,
            tripodPreferencesRow,
            tripodPreferencesHeading,
            tripodPreferencesSection,
            tripodHeadBrandSelect,
            tripodBowlSelect,
            tripodTypesSelect,
            tripodSpreaderSelect
        } = this.elements;

        if (!requiredScenariosSelect || !requiredScenariosSummary) return;

        requiredScenariosSummary.innerHTML = '';
        let selected = Array.from(requiredScenariosSelect.selectedOptions).map(o => o.value);
        const hasDolly = selected.includes('Dolly');

        if (remoteHeadOption) {
            if (!hasDolly) {
                remoteHeadOption.hidden = true;
                remoteHeadOption.selected = false;
                selected = selected.filter(v => v !== 'Remote Head');
            } else {
                remoteHeadOption.hidden = false;
            }
        }

        if (
            hasDolly &&
            monitorSelect &&
            (!monitorSelect.value || monitorSelect.value === 'None')
        ) {
            const defaultMonitor = 'SmallHD Ultra 7';
            // Fix for potential ReferenceError: devices is not defined
            const safeDevices = (typeof window !== 'undefined' && window.devices) || {};
            if (safeDevices?.monitors?.[defaultMonitor]) {
                if (!Array.from(monitorSelect.options).some(o => o.value === defaultMonitor)) {
                    const opt = document.createElement('option');
                    opt.value = defaultMonitor;
                    opt.textContent = defaultMonitor;
                    monitorSelect.appendChild(opt);
                }
                monitorSelect.value = defaultMonitor;
                monitorSelect.dispatchEvent(new Event('change'));
            }
        }

        if (videoDistributionSelect) {
            const ensureOption = val => {
                let opt = Array.from(videoDistributionSelect.options).find(o => o.value === val);
                if (!opt) {
                    opt = document.createElement('option');
                    opt.value = val;
                    opt.textContent = val;
                    videoDistributionSelect.appendChild(opt);
                }
            };
            ensureOption('DoP Monitor 7" handheld');
            ensureOption('DoP Monitor 15-21"');
        }

        selected.forEach(val => {
            const box = document.createElement('span');
            box.className = 'scenario-box';
            const iconSpan = document.createElement('span');
            iconSpan.className = 'scenario-icon icon-glyph';

            const iconFactory = scenarioIcons[val];
            const icon = iconFactory ? iconFactory() : ICON_GLYPHS.pin;

            applyIconGlyph(iconSpan, icon);
            box.appendChild(iconSpan);
            box.appendChild(document.createTextNode(val));
            requiredScenariosSummary.appendChild(box);
        });

        if (tripodPreferencesRow) {
            if (selected.includes('Tripod')) {
                tripodPreferencesRow.classList.remove('hidden');
                if (tripodPreferencesHeading) tripodPreferencesHeading.classList.remove('hidden');
                if (tripodPreferencesSection) tripodPreferencesSection.classList.remove('hidden');
            } else {
                tripodPreferencesRow.classList.add('hidden');
                if (tripodPreferencesHeading) tripodPreferencesHeading.classList.add('hidden');
                if (tripodPreferencesSection) tripodPreferencesSection.classList.add('hidden');
                if (tripodHeadBrandSelect) tripodHeadBrandSelect.value = '';
                if (tripodBowlSelect) tripodBowlSelect.value = '';
                if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(o => { o.selected = false; });
                if (tripodSpreaderSelect) tripodSpreaderSelect.value = '';
                updateTripodOptions();
            }
        }
    }
};
