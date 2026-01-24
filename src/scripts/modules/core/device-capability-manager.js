/**
 * Device Capability Manager
 * Handles device-specific logic such as Lens Focus Scales,
 * Camera Frame Rates, Resolutions, and formatting.
 */

// Constants for Frame Rates
const PREFERRED_FRAME_RATE_VALUES = Object.freeze([
    0.75, 1, 8, 12, 12.5, 15, 23.976, 24, 25, 29.97, 30,
    47.952, 48, 50, 59.94, 60, 72, 75, 90, 96, 100, 110,
    112, 120, 144, 150, 160, 170, 180, 200, 240
]);

const FALLBACK_FRAME_RATE_VALUES = Object.freeze([
    '0.75', '1', '8', '12', '12.5', '15', '23.976', '24', '25',
    '29.97', '30', '48', '50', '59.94', '60', '72', '75', '90',
    '96', '100', '110', '112', '120', '144', '150', '160', '170',
    '180', '200', '240'
]);

export const DeviceCapabilityManager = {
    // Dependencies shimmed from window or passed in init
    resolveCompatibilityTexts: (typeof window !== 'undefined' ? window.resolveCompatibilityTexts : () => ({ lang: 'en-US' })),
    localeSort: (typeof window !== 'undefined' ? window.localeSort : undefined),
    updateLensWorkflowCatalog: (typeof window !== 'undefined' ? window.updateLensWorkflowCatalog : null),
    markProjectFormDataDirty: (typeof window !== 'undefined' ? window.markProjectFormDataDirty : null),
    resolveRuntimeFunction: (name) => (typeof window !== 'undefined' && typeof window[name] === 'function' ? window[name] : null),

    // --- Lens Logic ---

    normalizeFocusScaleValue(value) {
        if (typeof value !== 'string') return '';
        const normalized = value.trim().toLowerCase();
        return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
    },

    resolveFocusScaleMode(sessionPreference, globalPreference) {
        // Priority: Explicit Argument -> Window Preference -> Session Preference -> Global Default -> 'metric'
        const scope = (typeof window !== 'undefined' ? window : null);
        const scopePreference = scope && typeof scope.focusScalePreference === 'string'
            ? scope.focusScalePreference
            : null;

        // sessionPreference passed from caller
        const fallbackPreference = sessionPreference || scopePreference || (typeof globalPreference === 'string' ? globalPreference : null);

        const rawPreference = fallbackPreference || 'metric';

        // Check for global normalizeFocusScale logic
        const normalizeFocusScale = this.resolveRuntimeFunction('normalizeFocusScale');
        if (normalizeFocusScale) {
            try {
                const normalized = normalizeFocusScale(rawPreference);
                if (normalized === 'imperial' || normalized === 'metric') return normalized;
            } catch (e) {
                // ignore
            }
        }

        const normalized = this.normalizeFocusScaleValue(rawPreference);
        return normalized || 'metric';
    },

    resolveLensFocusScaleMode(lens, currentMode, normalizeFocusScaleFn) {
        if (!lens || typeof lens !== 'object') return currentMode;

        const normalizeFn = normalizeFocusScaleFn || this.resolveRuntimeFunction('normalizeFocusScale');
        if (normalizeFn) {
            try {
                const normalized = normalizeFn(lens.focusScale);
                if (normalized === 'imperial' || normalized === 'metric') return normalized;
            } catch (e) {
                // ignore
            }
        }

        const override = this.normalizeFocusScaleValue(lens.focusScale);
        return override || currentMode;
    },

    formatLensNumber(value, options = {}, lang = 'en-US') {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) return '';

        const maximumFractionDigits = typeof options.maximumFractionDigits === 'number' ? options.maximumFractionDigits : 0;
        const minimumFractionDigits = typeof options.minimumFractionDigits === 'number' ? options.minimumFractionDigits : Math.min(0, maximumFractionDigits);

        if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
            try {
                return new Intl.NumberFormat(lang, { maximumFractionDigits, minimumFractionDigits }).format(numeric);
            } catch (e) {
                // ignore
            }
        }

        const digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
        try { return numeric.toFixed(digits); } catch (e) { return String(numeric); }
    },

    formatLensWeight(value, mode, lang) {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) return '';

        if (mode === 'imperial') {
            const pounds = numeric / 453.59237;
            const digits = pounds >= 10 ? 1 : 2;
            const formatted = this.formatLensNumber(pounds, { maximumFractionDigits: digits, minimumFractionDigits: 0 }, lang);
            return formatted ? `${formatted} lb` : '';
        }
        const formatted = this.formatLensNumber(numeric, { maximumFractionDigits: 0, minimumFractionDigits: 0 }, lang);
        return formatted ? `${formatted} g` : '';
    },

    formatLensDiameter(value, mode, lang) {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) return '';

        if (mode === 'imperial') {
            const inches = numeric / 25.4;
            const digits = inches >= 10 ? 1 : 2;
            const formatted = this.formatLensNumber(inches, { maximumFractionDigits: digits, minimumFractionDigits: 0 }, lang);
            return formatted ? `${formatted} in` : '';
        }
        const formatted = this.formatLensNumber(numeric, { maximumFractionDigits: 1, minimumFractionDigits: 0 }, lang);
        return formatted ? `${formatted} mm` : '';
    },

    formatLensMinFocus(value, mode, lang) {
        const numeric = typeof value === 'string' ? Number(value) : value;
        if (!Number.isFinite(numeric)) return '';

        if (mode === 'imperial') {
            const feet = numeric * 3.280839895;
            const digits = feet < 10 ? 2 : 1;
            const formatted = this.formatLensNumber(feet, { maximumFractionDigits: digits, minimumFractionDigits: digits }, lang);
            return formatted ? `${formatted} ft` : '';
        }
        const digits = numeric < 1 ? 2 : 1;
        const formatted = this.formatLensNumber(numeric, { maximumFractionDigits: digits, minimumFractionDigits: digits }, lang);
        return formatted ? `${formatted} m` : '';
    },

    populateLensDropdown(targetSelect, options = {}) {
        const {
            devices = (typeof window !== 'undefined' ? window.devices : {}),
            sessionFocusScale,
            globalPreference
        } = options;

        if (!targetSelect) return;

        const lensData = (devices && devices.lenses && Object.keys(devices.lenses).length ? devices.lenses : null)
            || (devices && devices.accessories && devices.accessories.lenses) || null;

        if (!lensData || Object.keys(lensData).length === 0) return;

        const focusScaleMode = this.resolveFocusScaleMode(sessionFocusScale, globalPreference);
        const { lang } = this.resolveCompatibilityTexts();

        const previousSelection = new Set(Array.from(targetSelect.selectedOptions || []).map(opt => opt.value));
        const fragment = document.createDocumentFragment();

        if (!targetSelect.multiple) {
            const emptyOpt = document.createElement('option');
            emptyOpt.value = '';
            fragment.appendChild(emptyOpt);
        }

        const lensNames = Object.keys(lensData);
        lensNames.sort(this.localeSort);

        const normalizeFn = this.resolveRuntimeFunction('normalizeFocusScale');

        for (let index = 0; index < lensNames.length; index++) {
            const name = lensNames[index];
            const opt = document.createElement('option');
            opt.value = name;
            const lens = lensData[name] || {};
            const lensMode = this.resolveLensFocusScaleMode(lens, focusScaleMode, normalizeFn);

            const attrs = [];
            const w = this.formatLensWeight(lens.weight_g, lensMode, lang);
            if (w) attrs.push(w);

            if (lens.clampOn) {
                if (lens.frontDiameterMm) {
                    const d = this.formatLensDiameter(lens.frontDiameterMm, lensMode, lang);
                    attrs.push(d ? `${d} clamp-on` : 'clamp-on');
                } else {
                    attrs.push('clamp-on');
                }
            } else if (lens.clampOn === false) {
                attrs.push('no clamp-on');
            }

            const minFocus = lens.minFocusMeters ?? lens.minFocus ?? (lens.minFocusCm ? lens.minFocusCm / 100 : null);
            if (Number.isFinite(minFocus) && minFocus > 0) {
                const mf = this.formatLensMinFocus(minFocus, lensMode, lang);
                if (mf) attrs.push(`${mf} min focus`);
            }

            opt.textContent = attrs.length ? `${name} (${attrs.join(', ')})` : name;
            if (previousSelection.has(name)) opt.selected = true;
            fragment.appendChild(opt);
        }

        targetSelect.innerHTML = '';
        targetSelect.appendChild(fragment);

        if (this.updateLensWorkflowCatalog) {
            try { this.updateLensWorkflowCatalog({ preserveSelections: true, skipEvent: true, skipDirty: true }); }
            catch (e) { /* ignore */ }
        }
    },

    // --- Frame Rate Logic ---

    formatFrameRateValue(value) {
        const numeric = typeof value === 'number' ? value : Number.parseFloat(value);
        if (!Number.isFinite(numeric)) return '';
        const rounded = Math.round(numeric * 1000) / 1000;
        if (Number.isInteger(rounded)) return String(rounded);
        return rounded.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
    },

    tokenizeFrameRateContext(value) {
        if (typeof value !== 'string' || !value) return [];
        const normalizedValue = value.toLowerCase();
        const baseTokens = normalizedValue
            .replace(/[\u2013\u2014]/g, '-')
            .replace(/[()]/g, ' ')
            .replace(/[[\]]/g, ' ')
            .split(/[\s,/]+/)
            .map(token => token.replace(/[^a-z0-9:.+-]/g, '').replace(/^[:.+-]+|[:.+-]+$/g, ''))
            .filter(token => token && token !== 'fps');

        const tokens = new Set(baseTokens);
        const addAliasToken = alias => {
            if (!alias) return;
            const normalizedAlias = alias.replace(/[^a-z0-9]/g, '');
            if (normalizedAlias) tokens.add(normalizedAlias);
        };

        const resolutionValue = normalizedValue.replace(/\u00d7/g, 'x');
        const compactValue = resolutionValue.replace(/\s+/g, '');
        const includes = text => resolutionValue.includes(text);
        const compactIncludes = text => compactValue.includes(text);

        if (includes('uhd') || includes('ultra hd') || compactIncludes('ultrahd') || /3840\s*x\s*2160/.test(resolutionValue)) {
            addAliasToken('uhd');
            addAliasToken('4k');
        }
        if (includes('dci') || /4096\s*x\s*2160/.test(resolutionValue)) {
            addAliasToken('dci');
            addAliasToken('4k');
        }
        if (compactIncludes('2048x1080') || /2048\s*x\s*1080/.test(resolutionValue) || /(?:^|[^a-z0-9])2k(?:[^a-z0-9]|$)/.test(resolutionValue)) {
            addAliasToken('2k');
            addAliasToken('dci');
        }
        if (compactIncludes('fullhd') || includes('full hd') || includes('full-hd') || includes('fhd') || includes('1080p') || /1920\s*x\s*1080/.test(resolutionValue)) {
            addAliasToken('hd');
            addAliasToken('fhd');
            addAliasToken('1080p');
        }
        if (includes('720p') || /1280\s*x\s*720/.test(resolutionValue)) {
            addAliasToken('hd');
            addAliasToken('720p');
        }
        if (/(?:^|[^a-z0-9])6k(?:[^a-z0-9]|$)/.test(resolutionValue)) addAliasToken('6k');
        if (/(?:^|[^a-z0-9])8k(?:[^a-z0-9]|$)/.test(resolutionValue)) addAliasToken('8k');
        if (/(?:^|[^a-z0-9])4k(?:[^a-z0-9]|$)/.test(resolutionValue) || includes('4k')) addAliasToken('4k');

        return Array.from(tokens);
    },

    normalizeMatchTarget(value) {
        if (typeof value !== 'string' || !value) return '';
        return value.toLowerCase().replace(/[^a-z0-9]/g, '');
    },

    includePreferredValuesForRange(minValue, maxValue, set) {
        if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || !set) return;
        const low = Math.min(minValue, maxValue);
        const high = Math.max(minValue, maxValue);
        PREFERRED_FRAME_RATE_VALUES.forEach(candidate => {
            if (candidate >= low - 0.0005 && candidate <= high + 0.0005) {
                const formatted = this.formatFrameRateValue(candidate);
                if (formatted) set.add(formatted);
            }
        });
    },

    parseFrameRateNumericValues(entry) {
        if (typeof entry !== 'string' || !entry.trim()) return [];

        const normalized = entry.replace(/[\u2013\u2014]/g, '-');
        const parts = normalized.split(':');
        const numericSection = parts.length > 1 ? parts.slice(1).join(':') : normalized;
        const values = new Set();

        const rangePattern = /(\d+(?:\.\d+)?)(?:\s*(?:-|to)\s*)(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
        let match;
        while ((match = rangePattern.exec(numericSection))) {
            const minVal = Number.parseFloat(match[1]);
            const maxVal = Number.parseFloat(match[2]);
            const minFormatted = this.formatFrameRateValue(minVal);
            const maxFormatted = this.formatFrameRateValue(maxVal);
            if (minFormatted) values.add(minFormatted);
            if (maxFormatted) values.add(maxFormatted);
            this.includePreferredValuesForRange(minVal, maxVal, values);
        }

        const upToPattern = /(?:up to|≤|<=|less than|max(?:imum)?(?:\s*of)?)\s*(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/gi;
        while ((match = upToPattern.exec(numericSection))) {
            const formatted = this.formatFrameRateValue(match[1]);
            if (formatted) {
                values.add(formatted);
                this.includePreferredValuesForRange(0, Number.parseFloat(match[1]), values);
            }
        }

        const explicitPattern = /(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
        while ((match = explicitPattern.exec(numericSection))) {
            const formatted = this.formatFrameRateValue(match[1]);
            if (formatted) values.add(formatted);
        }

        if (!values.size) {
            const commaSection = numericSection.split('fps')[0] || numericSection;
            const listPattern = /(\d+(?:\.\d+)?)/g;
            while ((match = listPattern.exec(commaSection))) {
                const formatted = this.formatFrameRateValue(match[1]);
                if (formatted) values.add(formatted);
            }
        }

        return Array.from(values);
    },

    buildFrameRateSuggestions(entries, contextTokens) {
        const suggestions = new Map();
        const groups = contextTokens.filter(group => Array.isArray(group) && group.length);

        entries.forEach((entry) => {
            if (typeof entry !== 'string') return;
            const cleaned = entry.trim();
            if (!cleaned) return;
            const [label] = cleaned.split(':');
            const entryTokens = this.tokenizeFrameRateContext(label);
            const numericValues = this.parseFrameRateNumericValues(cleaned);
            const baseScore = entryTokens.length ? 1 : 0;
            let score = baseScore;

            if (groups.length && entryTokens.length) {
                const tokenSet = new Set(entryTokens);
                groups.forEach(group => {
                    let matches = 0;
                    group.forEach(token => {
                        if (tokenSet.has(token)) matches += 1;
                    });
                    if (matches) {
                        score += matches * 3;
                        if (matches === group.length) score += 2;
                    }
                });
            }

            numericValues.forEach(rawValue => {
                const formatted = this.formatFrameRateValue(rawValue);
                if (!formatted) return;
                const existing = suggestions.get(formatted);
                if (!existing || score > existing.score) {
                    suggestions.set(formatted, { score, label: cleaned, tokens: entryTokens });
                }
            });
        });

        if (!suggestions.size) {
            return {
                values: Array.from(FALLBACK_FRAME_RATE_VALUES),
                metadata: new Map(),
            };
        }

        const sortedEntries = Array.from(suggestions.entries()).sort((a, b) => {
            if (b[1].score !== a[1].score) return b[1].score - a[1].score;
            const aNum = Number.parseFloat(a[0]);
            const bNum = Number.parseFloat(b[0]);
            if (Number.isFinite(aNum) && Number.isFinite(bNum)) return aNum - bNum;
            return a[0].localeCompare(b[0]);
        });

        return {
            values: sortedEntries.map(([value]) => value),
            metadata: new Map(sortedEntries),
        };
    },

    findMaxFrameRateForSensor(entries, sensorTokens, sensorLabel = '') {
        if (!Array.isArray(entries) || !entries.length) return null;
        if (!Array.isArray(sensorTokens) || !sensorTokens.length) return null;

        const sensorTokenSet = new Set(sensorTokens);
        if (!sensorTokenSet.size) return null;

        const normalizedSensorLabel = this.normalizeMatchTarget(sensorLabel);
        const normalizedSensorTokens = new Set(sensorTokens.map(t => this.normalizeMatchTarget(t)).filter(Boolean));

        let bestMatchScore = 0;
        let bestMaxValue = Number.NEGATIVE_INFINITY;

        entries.forEach(entry => {
            if (typeof entry !== 'string') return;
            const cleaned = entry.trim();
            if (!cleaned) return;

            const [label] = cleaned.split(':');
            const entryTokens = this.tokenizeFrameRateContext(label);
            const numericValues = this.parseFrameRateNumericValues(cleaned)
                .map(value => Number.parseFloat(value))
                .filter(Number.isFinite);

            if (!numericValues.length) return;

            let matchScore = 0;
            const normalizedEntryLabel = this.normalizeMatchTarget(label);
            const normalizedEntryTokens = entryTokens.map(t => this.normalizeMatchTarget(t)).filter(Boolean);

            entryTokens.forEach(token => {
                if (sensorTokenSet.has(token)) matchScore += 4;
            });

            normalizedEntryTokens.forEach(entryToken => {
                if (normalizedSensorTokens.has(entryToken)) {
                    matchScore += 2;
                    return;
                }
                for (const sensorToken of normalizedSensorTokens) {
                    if (sensorToken && entryToken.includes(sensorToken)) {
                        matchScore += 1;
                        break;
                    }
                }
            });

            if (normalizedSensorLabel && normalizedEntryLabel && normalizedEntryLabel.includes(normalizedSensorLabel)) {
                matchScore += Math.max(sensorTokenSet.size * 4, 8);
            }

            if (!matchScore) return;

            const entryMaxValue = Math.max(...numericValues);
            if (matchScore > bestMatchScore || (matchScore === bestMatchScore && entryMaxValue > bestMaxValue)) {
                bestMatchScore = matchScore;
                bestMaxValue = entryMaxValue;
            }
        });

        if (!bestMatchScore || !Number.isFinite(bestMaxValue)) return null;
        return bestMaxValue;
    },

    normalizeRecordingFrameRateValue(value) {
        if (typeof value === 'number' && Number.isFinite(value)) return this.formatFrameRateValue(value);
        if (typeof value !== 'string') return '';
        const trimmed = value.trim();
        if (!trimmed) return '';
        const numericMatch = trimmed.match(/-?\d+(?:\.\d+)?/);
        if (!numericMatch) return trimmed;
        return this.formatFrameRateValue(numericMatch[0]) || trimmed;
    },

    populateCameraPropertyDropdown(selectId, property, selected = '', cameraSelectKey) {
        const populate = (dropdown) => {
            dropdown.innerHTML = '';
            const emptyOpt = document.createElement('option');
            emptyOpt.value = '';
            dropdown.appendChild(emptyOpt);

            const camKey = cameraSelectKey || '';
            const safeDevices = (typeof window !== 'undefined' && window.devices) || {};
            const values = camKey && safeDevices && safeDevices.cameras && safeDevices.cameras[camKey]
                ? safeDevices.cameras[camKey][property] : null;

            if (Array.isArray(values)) {
                values.forEach(v => {
                    const opt = document.createElement('option');
                    opt.value = v;
                    opt.textContent = v;
                    if (v === selected) opt.selected = true;
                    dropdown.appendChild(opt);
                });
            }
        };

        // UI Helpers dependency?
        const scope = typeof window !== 'undefined' ? window : {};
        const dropdown = typeof document !== 'undefined' ? document.getElementById(selectId) : null;
        if (dropdown) populate(dropdown);
        else if (scope.cineCoreUiHelpers && typeof scope.cineCoreUiHelpers.whenElementAvailable === 'function') {
            scope.cineCoreUiHelpers.whenElementAvailable(selectId, populate);
        }
    }
};
