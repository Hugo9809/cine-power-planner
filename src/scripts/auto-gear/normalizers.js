/*
 * Auto Gear normalization helpers extracted from the primary runtime.
 * The code remains framework-free so it can run inside the legacy loader
 * while also being consumable from Node-based unit tests.
 */
// @ts-nocheck
/* global AUTO_GEAR_SELECTOR_TYPE_SET, AUTO_GEAR_SELECTOR_TYPE_MAP, DEVICE_GLOBAL_SCOPE,
  devices, CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
  AUTO_GEAR_TRIPOD_FIELD_IDS, AUTO_GEAR_TRIPOD_SELECTOR_TYPES, localeSort,
  AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS, AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP,
  getLanguageTexts, currentLang, addArriKNumber, GEAR_LIST_CATEGORIES,
  AUTO_GEAR_CUSTOM_CATEGORY, texts, autoGearOwnGearSelect, collectAutoGearSelectedValues,
  getAutoGearOwnGearItems, autoGearEditorDraft, formatOwnGearQuantityText, findAutoGearOwnGearById,
  computeAutoGearMultiSelectSize, AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS, autoGearAddOwnGearSelect,
  autoGearRemoveOwnGearSelect, normalizeAutoGearCameraWeightCondition, stableStringify */
var AUTO_GEAR_NORMALIZER_SCOPE = (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || {};
function resolveAutoGearDefaultLanguageSource() {
    var candidateScopes = [
        AUTO_GEAR_NORMALIZER_SCOPE,
        AUTO_GEAR_NORMALIZER_SCOPE && AUTO_GEAR_NORMALIZER_SCOPE.global,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];
    for (var index = 0; index < candidateScopes.length; index += 1) {
        var scope = candidateScopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
            continue;
        if (typeof scope.DEFAULT_LANGUAGE_SAFE === 'string' && scope.DEFAULT_LANGUAGE_SAFE) {
            return scope.DEFAULT_LANGUAGE_SAFE;
        }
        if (typeof scope.CPP_DEFAULT_LANGUAGE_SAFE === 'string' &&
            scope.CPP_DEFAULT_LANGUAGE_SAFE) {
            return scope.CPP_DEFAULT_LANGUAGE_SAFE;
        }
        if (scope.cineCoreShared &&
            typeof scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE === 'string' &&
            scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE) {
            return scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE;
        }
    }
    return null;
}
function getAutoGearFallbackLanguage() {
    var resolved = resolveAutoGearDefaultLanguageSource();
    if (resolved) {
        return resolved;
    }
    if (typeof navigator !== 'undefined' &&
        typeof navigator.language === 'string' &&
        navigator.language) {
        return navigator.language.slice(0, 2).toLowerCase();
    }
    return 'en';
}
function assignAutoGearLanguageFallback(scope, fallbackLanguage) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
        return;
    var assignIfMissing = function (key) {
        if (typeof scope[key] !== 'string' || !scope[key]) {
            try {
                scope[key] = fallbackLanguage;
            }
            catch (assignError) {
                void assignError;
                try {
                    Object.defineProperty(scope, key, {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: fallbackLanguage,
                    });
                }
                catch (defineError) {
                    void defineError;
                }
            }
        }
    };
    assignIfMissing('DEFAULT_LANGUAGE_SAFE');
    assignIfMissing('CPP_DEFAULT_LANGUAGE_SAFE');
}
function ensureAutoGearDefaultLanguageGlobals() {
    var fallbackLanguage = getAutoGearFallbackLanguage();
    var candidateScopes = [
        AUTO_GEAR_NORMALIZER_SCOPE,
        AUTO_GEAR_NORMALIZER_SCOPE && AUTO_GEAR_NORMALIZER_SCOPE.global,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];
    candidateScopes.forEach(function (scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
            return;
        assignAutoGearLanguageFallback(scope, fallbackLanguage);
        if (scope.cineCoreShared && typeof scope.cineCoreShared === 'object') {
            assignAutoGearLanguageFallback(scope.cineCoreShared, fallbackLanguage);
        }
    });
}
ensureAutoGearDefaultLanguageGlobals();
function getAutoGearFallbackTexts() {
    var fallbackLang = getAutoGearFallbackLanguage();
    try {
        var fallbackTexts = getLanguageTexts(fallbackLang);
        if (fallbackTexts && typeof fallbackTexts === 'object') {
            return fallbackTexts;
        }
    }
    catch (error) {
        void error;
    }
    return {};
}
var AUTO_GEAR_DEFAULT_SELECTOR_TYPES = Object.freeze([
    'none',
    'monitor',
    'directorMonitor',
    'tripodHeadBrand',
    'tripodBowl',
    'tripodTypes',
    'tripodSpreader',
    'fizHandUnit',
]);
function ensureAutoGearSelectorTypeGlobals(scope) {
    var existingMap = scope && scope.AUTO_GEAR_SELECTOR_TYPE_MAP && typeof scope.AUTO_GEAR_SELECTOR_TYPE_MAP === 'object'
        ? scope.AUTO_GEAR_SELECTOR_TYPE_MAP
        : null;
    var resolvedMap = existingMap && Object.keys(existingMap).length
        ? existingMap
        : AUTO_GEAR_DEFAULT_SELECTOR_TYPES.reduce(function (acc, type) {
            acc[type.toLowerCase()] = type;
            return acc;
        }, Object.create(null));
    var existingSet = scope && scope.AUTO_GEAR_SELECTOR_TYPE_SET instanceof Set
        ? scope.AUTO_GEAR_SELECTOR_TYPE_SET
        : null;
    var resolvedSet = existingSet && existingSet.size
        ? existingSet
        : new Set(Object.keys(resolvedMap));
    if (scope && typeof scope === 'object') {
        if (!scope.AUTO_GEAR_SELECTOR_TYPE_MAP) {
            scope.AUTO_GEAR_SELECTOR_TYPE_MAP = resolvedMap;
        }
        if (!scope.AUTO_GEAR_SELECTOR_TYPE_SET) {
            scope.AUTO_GEAR_SELECTOR_TYPE_SET = resolvedSet;
        }
    }
    return {
        map: resolvedMap,
        set: resolvedSet,
    };
}
var AUTO_GEAR_SELECTOR_TYPE_GLOBALS = ensureAutoGearSelectorTypeGlobals(AUTO_GEAR_NORMALIZER_SCOPE);
var AUTO_GEAR_SELECTOR_TYPE_MAP_FALLBACK = AUTO_GEAR_SELECTOR_TYPE_GLOBALS.map;
var AUTO_GEAR_SELECTOR_TYPE_SET_FALLBACK = AUTO_GEAR_SELECTOR_TYPE_GLOBALS.set;
/**
 * Produce a deterministic-looking id for Auto Gear rules/presets.
 *
 * The IDs are stored alongside user data in localStorage, so we use the
 * strongest source of randomness that is available without requiring network
 * access. When `crypto.randomUUID` is not present we fall back to a timestamp
 * + Math.random combination to avoid collisions.
 *
 * @param {string} [prefix]
 * @returns {string}
 */
function generateAutoGearId(prefix) {
    var base = prefix || 'rule';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return "".concat(base, "-").concat(crypto.randomUUID());
    }
    return "".concat(base, "-").concat(Math.random().toString(36).slice(2), "-").concat(Date.now());
}
/**
 * Ensure that quantity values loaded from user input always resolve to a
 * positive integer. Keeping this logic in one place protects every feature
 * that relies on the quantity (lists, backups, exports, etc.) against
 * malformed form data.
 *
 * @param {unknown} value
 * @returns {number}
 */
function normalizeAutoGearQuantity(value) {
    var num = parseInt(value, 10);
    return Number.isFinite(num) && num > 0 ? num : 1;
}
/**
 * Convert the multi-line textarea input for Auto Gear lists into a structured
 * array.
 *
 * Besides providing a nicer UI this helper also keeps the import/export
 * behaviour easy to audit because the exact parsing rules are documented in
 * one place.
 *
 * @param {unknown} value
 * @returns {Array<{ name: string, quantity?: number, listType?: 'add'|'remove' }>} Parsed entries.
 */
function parseAutoGearDraftNames(value) {
    if (typeof value !== 'string')
        return [];
    var raw = value.trim();
    if (!raw)
        return [];
    var hasDelimiters = /[;\n\r]/.test(raw);
    var parts = hasDelimiters ? raw.split(/[;\n\r]+/) : [raw];
    return parts
        .map(function (part) {
            var segment = part.trim();
            if (!segment)
                return null;
            var signMatch = segment.match(/^([+-])\s*(.+)$/);
            var listType = signMatch ? (signMatch[1] === '-' ? 'remove' : 'add') : null;
            var content = signMatch ? signMatch[2].trim() : segment;
            if (!content)
                return null;
            var quantityMatch = content.match(/^(\d+)\s*[x×]\s*(.+)$/i);
            if (quantityMatch) {
                var name_1 = quantityMatch[2].trim();
                if (!name_1)
                    return null;
                return { name: name_1, quantity: normalizeAutoGearQuantity(quantityMatch[1]), listType: listType };
            }
            return { name: content, listType: listType };
        })
        .filter(Boolean);
}
/**
 * Shared helper that normalizes free-text fields used across the Auto Gear UI
 * and persistence layer. Normalization protects user data from spurious
 * whitespace differences when synchronizing or restoring from backups.
 *
 * @param {unknown} value Raw input value.
 * @param {{ collapseWhitespace?: boolean }} [options]
 * @returns {string}
 */
function normalizeAutoGearText(value, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.collapseWhitespace, collapseWhitespace = _c === void 0 ? true : _c;
    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value);
    }
    if (typeof value !== 'string')
        return '';
    var trimmed = value.trim();
    if (!collapseWhitespace)
        return trimmed;
    return trimmed.replace(/\s+/g, ' ');
}
/**
 * Normalize selector types to one of the supported strings so that stored
 * rules remain compatible even if the list of valid selectors is extended in
 * the future.
 *
 * @param {unknown} value
 * @returns {'none'|'monitor'|'directorMonitor'|'tripodHeadBrand'|'tripodBowl'|'tripodTypes'|'tripodSpreader'|'fizHandUnit'}
 */
function normalizeAutoGearSelectorType(value) {
    var candidate = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!candidate)
        return 'none';
    var selectorSet = (typeof AUTO_GEAR_SELECTOR_TYPE_SET !== 'undefined' && AUTO_GEAR_SELECTOR_TYPE_SET)
        || AUTO_GEAR_SELECTOR_TYPE_SET_FALLBACK;
    var selectorMap = (typeof AUTO_GEAR_SELECTOR_TYPE_MAP !== 'undefined' && AUTO_GEAR_SELECTOR_TYPE_MAP)
        || AUTO_GEAR_SELECTOR_TYPE_MAP_FALLBACK;
    if (!selectorSet || !selectorSet.has(candidate))
        return 'none';
    return (selectorMap && selectorMap[candidate]) || 'none';
}
/**
 * Make sure the default value for selector inputs is both human readable and
 * validated against the available options so that restoring backups never
 * yields an impossible selection.
 *
 * @param {'none'|'monitor'|'directorMonitor'|'tripodHeadBrand'|'tripodBowl'|'tripodTypes'|'tripodSpreader'} type
 * @param {unknown} value
 * @returns {string}
 */
function normalizeAutoGearSelectorDefault(type, value, context) {
    var text = normalizeAutoGearText(value);
    if (!text)
        return '';
    var options = getAutoGearSelectorOptions(type, context ? { selectorContext: context } : null);
    if (!options.length)
        return text;
    var match = options.find(function (option) { return option.toLowerCase() === text.toLowerCase(); });
    return match || text;
}
var AUTO_GEAR_MONITOR_DEFAULT_TYPES = {
    focus: 'monitor',
    handheld7: 'monitor',
    combo15: 'directorMonitor',
    director15: 'directorMonitor',
};
function normalizeAutoGearMonitorDefaults(value) {
    var result = {
        focus: '',
        handheld7: '',
        combo15: '',
        director15: '',
    };
    if (!value || typeof value !== 'object') {
        return result;
    }
    Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(function (key) {
        var type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[key];
        var normalized = normalizeAutoGearSelectorDefault(type, value[key]);
        result[key] = normalized;
    });
    return result;
}
function resolveDevicesSnapshot() {
    if (typeof DEVICE_GLOBAL_SCOPE !== 'undefined' && DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && typeof DEVICE_GLOBAL_SCOPE.devices === 'object') {
        return DEVICE_GLOBAL_SCOPE.devices;
    }
    try {
        return typeof devices !== 'undefined' && devices && typeof devices === 'object' ? devices : null;
    }
    catch (error) {
        if (error && typeof error === 'object' && error.name === 'ReferenceError') {
            return null;
        }
        throw error;
    }
}
function updateGlobalDevicesReference(nextDevices) {
    var normalizedDevices = nextDevices && typeof nextDevices === 'object'
        ? nextDevices
        : {};
    var seenScopes = new Set();
    var scopes = [];
    var enqueueScope = function (scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
        }
        if (seenScopes.has(scope)) {
            return;
        }
        seenScopes.add(scope);
        scopes.push(scope);
    };
    try {
        if (typeof DEVICE_GLOBAL_SCOPE !== 'undefined' && DEVICE_GLOBAL_SCOPE) {
            enqueueScope(DEVICE_GLOBAL_SCOPE);
        }
    }
    catch (scopeError) {
        void scopeError;
    }
    enqueueScope(typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null);
    enqueueScope(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
    enqueueScope(typeof CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE !== 'undefined'
        ? CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
        : null);
    enqueueScope(typeof globalThis !== 'undefined' ? globalThis : null);
    enqueueScope(typeof window !== 'undefined' ? window : null);
    enqueueScope(typeof self !== 'undefined' ? self : null);
    enqueueScope(typeof global !== 'undefined' ? global : null);
    for (var index = 0; index < scopes.length; index += 1) {
        var scope = scopes[index];
        if (!scope)
            continue;
        try {
            scope.devices = normalizedDevices;
        }
        catch (assignError) {
            void assignError;
            try {
                Object.defineProperty(scope, 'devices', {
                    configurable: true,
                    writable: true,
                    value: normalizedDevices,
                });
            }
            catch (defineError) {
                void defineError;
            }
        }
        try {
            var shared = scope.CORE_SHARED || scope.cineCoreShared;
            if (shared && typeof shared === 'object') {
                shared.devices = normalizedDevices;
                if (typeof shared.updateDevices === 'function') {
                    try {
                        shared.updateDevices(normalizedDevices);
                    }
                    catch (updateError) {
                        void updateError;
                    }
                }
            }
        }
        catch (sharedError) {
            void sharedError;
        }
        if (scope && scope.global && scope.global !== scope) {
            enqueueScope(scope.global);
        }
        var runtimeState = scope.__cineRuntimeState;
        if (runtimeState && typeof runtimeState === 'object') {
            try {
                runtimeState.devices = normalizedDevices;
            }
            catch (runtimeError) {
                void runtimeError;
            }
        }
    }
    var globalCoreShared = resolveAutoGearCoreShared();
    if (globalCoreShared && typeof globalCoreShared === 'object') {
        try {
            globalCoreShared.devices = normalizedDevices;
            if (typeof globalCoreShared.updateDevices === 'function') {
                globalCoreShared.updateDevices(normalizedDevices);
            }
        }
        catch (sharedAssignError) {
            void sharedAssignError;
        }
    }
    if (typeof module !== 'undefined'
        && module
        && typeof module.exports === 'object'
        && module.exports) {
        try {
            module.exports.devices = normalizedDevices;
        }
        catch (moduleError) {
            void moduleError;
        }
    }
    return normalizedDevices;
}
function resolveAutoGearCoreShared() {
    var candidateScopes = [
        AUTO_GEAR_NORMALIZER_SCOPE,
        AUTO_GEAR_NORMALIZER_SCOPE && AUTO_GEAR_NORMALIZER_SCOPE.global,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];
    for (var index = 0; index < candidateScopes.length; index += 1) {
        var scope = candidateScopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function'))
            continue;
        if (scope.CORE_SHARED && typeof scope.CORE_SHARED === 'object') {
            return scope.CORE_SHARED;
        }
        if (scope.cineCoreShared && typeof scope.cineCoreShared === 'object') {
            return scope.cineCoreShared;
        }
    }
    return null;
}
function resolveTripodPreferenceSelect(type) {
    if (typeof document === 'undefined')
        return null;
    var id = AUTO_GEAR_TRIPOD_FIELD_IDS[type];
    if (!id)
        return null;
    return document.getElementById(id);
}
function collectTripodPreferenceOptions(type) {
    if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type))
        return [];
    var select = resolveTripodPreferenceSelect(type);
    if (!select || !select.options)
        return [];
    var options = Array.from(select.options);
    var seen = new Set();
    var results = [];
    options.forEach(function (option) {
        if (!option)
            return;
        var value = typeof option.value === 'string' ? option.value.trim() : '';
        var label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
        var storeValue = value || label;
        if (!storeValue)
            return;
        var dedupeKey = storeValue.toLowerCase();
        if (seen.has(dedupeKey))
            return;
        seen.add(dedupeKey);
        results.push({ value: storeValue, label: label || storeValue });
    });
    return results;
}
function getAutoGearSelectorOptions(type, itemOrContext) {
    var normalizedType = normalizeAutoGearSelectorType(type);
    var catalog = resolveDevicesSnapshot();
    if (!catalog || typeof catalog !== 'object') {
        return [];
    }
    if (normalizedType === 'monitor') {
        var monitorDb = catalog && catalog.monitors ? catalog.monitors : null;
        if (!monitorDb || typeof monitorDb !== 'object')
            return [];
        return Object.keys(monitorDb).filter(function (name) { return name && name !== 'None'; }).sort(localeSort);
    }
    if (normalizedType === 'directorMonitor') {
        var directorDb = catalog && catalog.directorMonitors ? catalog.directorMonitors : null;
        if (!directorDb || typeof directorDb !== 'object')
            return [];
        return Object.keys(directorDb).filter(function (name) { return name && name !== 'None'; }).sort(localeSort);
    }
    if (normalizedType === 'fizHandUnit') {
        var groups = typeof AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object'
            ? AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS
            : (typeof globalThis !== 'undefined' && typeof globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object'
                ? globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS
                : Object.create(null));
        var motorMap = typeof AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object'
            ? AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP
            : (typeof globalThis !== 'undefined' && typeof globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object'
                ? globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP
                : Object.create(null));
        var contextValue = '';
        if (itemOrContext && typeof itemOrContext === 'object') {
            var context = itemOrContext.selectorContext || itemOrContext.context;
            if (typeof context === 'string') {
                contextValue = context.trim();
            }
        }
        else if (typeof itemOrContext === 'string') {
            contextValue = itemOrContext.trim();
        }
        var group = null;
        if (contextValue) {
            group = groups[contextValue] || null;
            if (!group) {
                var normalizedContext = normalizeAutoGearTriggerValue(contextValue);
                if (normalizedContext) {
                    if (groups[normalizedContext]) {
                        group = groups[normalizedContext];
                    }
                    else if (motorMap[normalizedContext] && groups[motorMap[normalizedContext]]) {
                        group = groups[motorMap[normalizedContext]];
                    }
                }
            }
        }
        if (group && Array.isArray(group.options)) {
            return group.options.slice();
        }
        var fallback_1 = [];
        Object.values(groups).forEach(function (entry) {
            if (!entry || !Array.isArray(entry.options))
                return;
            entry.options.forEach(function (option) {
                if (!option || fallback_1.includes(option))
                    return;
                fallback_1.push(option);
            });
        });
        return fallback_1;
    }
    if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
        return collectTripodPreferenceOptions(normalizedType).map(function (option) { return option.value; });
    }
    return [];
}
function getAutoGearSelectorLabel(type) {
    var normalizedType = normalizeAutoGearSelectorType(type);
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getAutoGearFallbackTexts();
    if (normalizedType === 'monitor') {
        return langTexts.autoGearSelectorMonitorOption
            || fallbackTexts.autoGearSelectorMonitorOption
            || 'Monitor selector';
    }
    if (normalizedType === 'directorMonitor') {
        return langTexts.autoGearSelectorDirectorOption
            || fallbackTexts.autoGearSelectorDirectorOption
            || 'Director monitor selector';
    }
    if (normalizedType === 'tripodHeadBrand') {
        return langTexts.autoGearSelectorTripodHeadOption
            || fallbackTexts.autoGearSelectorTripodHeadOption
            || 'Tripod head selector';
    }
    if (normalizedType === 'tripodBowl') {
        return langTexts.autoGearSelectorTripodBowlOption
            || fallbackTexts.autoGearSelectorTripodBowlOption
            || 'Tripod bowl selector';
    }
    if (normalizedType === 'tripodTypes') {
        return langTexts.autoGearSelectorTripodTypesOption
            || fallbackTexts.autoGearSelectorTripodTypesOption
            || 'Tripod type selector';
    }
    if (normalizedType === 'tripodSpreader') {
        return langTexts.autoGearSelectorTripodSpreaderOption
            || fallbackTexts.autoGearSelectorTripodSpreaderOption
            || 'Tripod spreader selector';
    }
    if (normalizedType === 'fizHandUnit') {
        return langTexts.autoGearSelectorFizHandUnitOption
            || fallbackTexts.autoGearSelectorFizHandUnitOption
            || 'FIZ hand unit selector';
    }
    return langTexts.autoGearSelectorNoneOption
        || fallbackTexts.autoGearSelectorNoneOption
        || 'No selector';
}
function getAutoGearSelectorScrollHint() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getAutoGearFallbackTexts();
    return langTexts.autoGearSelectorScrollHint
        || fallbackTexts.autoGearSelectorScrollHint
        || 'Scroll to see more devices.';
}
function getAutoGearSelectorDefaultPlaceholder() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getAutoGearFallbackTexts();
    return langTexts.autoGearSelectorDefaultPlaceholder
        || fallbackTexts.autoGearSelectorDefaultPlaceholder
        || 'Choose a default device';
}
function getAutoGearMonitorDefaultPlaceholder() {
    var langTexts = getLanguageTexts(currentLang);
    var fallbackTexts = getAutoGearFallbackTexts();
    return langTexts.autoGearMonitorDefaultPlaceholder
        || fallbackTexts.autoGearMonitorDefaultPlaceholder
        || 'Use recommended automatically';
}
function formatAutoGearSelectorValue(type, value) {
    var normalizedValue = typeof value === 'string' ? value.trim() : '';
    if (!normalizedValue)
        return '';
    var normalizedType = normalizeAutoGearSelectorType(type);
    if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
        var options = collectTripodPreferenceOptions(normalizedType);
        var match = options.find(function (option) { return option.value.toLowerCase() === normalizedValue.toLowerCase(); });
        if (match && match.label) {
            return match.label;
        }
    }
    if (typeof addArriKNumber === 'function'
        && (normalizedType === 'monitor' || normalizedType === 'directorMonitor' || normalizedType === 'fizHandUnit')) {
        return addArriKNumber(normalizedValue);
    }
    return normalizedValue;
}
function populateAutoGearCategorySelect(select, currentValue) {
    var _a, _b;
    if (!select)
        return;
    var current = typeof currentValue === 'string' ? currentValue : '';
    var lang = typeof currentLang === 'string' ? currentLang : 'en';
    select.innerHTML = '';
    GEAR_LIST_CATEGORIES.forEach(function (category) {
        var option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        if (current === category) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    var customOption = document.createElement('option');
    customOption.value = AUTO_GEAR_CUSTOM_CATEGORY;
    customOption.textContent = ((_a = texts === null || texts === void 0 ? void 0 : texts[lang]) === null || _a === void 0 ? void 0 : _a.autoGearCustomCategory)
        || ((_b = texts === null || texts === void 0 ? void 0 : texts.en) === null || _b === void 0 ? void 0 : _b.autoGearCustomCategory)
        || 'Custom Additions';
    if (!current || current === AUTO_GEAR_CUSTOM_CATEGORY) {
        customOption.selected = true;
    }
    select.appendChild(customOption);
}
function formatAutoGearOwnGearLabel(item) {
    if (!item || typeof item.name !== 'string')
        return '';
    var quantityValue = typeof (item === null || item === void 0 ? void 0 : item.quantity) === 'number'
        ? String(item.quantity)
        : item === null || item === void 0 ? void 0 : item.quantity;
    var quantityText = formatOwnGearQuantityText(quantityValue);
    if (quantityText) {
        return "".concat(item.name, " (").concat(quantityText, ")");
    }
    return item.name;
}
function refreshAutoGearOwnGearConditionOptions(selected) {
    if (!autoGearOwnGearSelect)
        return;
    var selectedValues = Array.isArray(selected)
        ? selected
            .filter(function (value) { return typeof value === 'string'; })
            .map(function (value) { return value.trim(); })
            .filter(Boolean)
        : collectAutoGearSelectedValues(selected, 'ownGear');
    autoGearOwnGearSelect.innerHTML = '';
    autoGearOwnGearSelect.multiple = true;
    var items = getAutoGearOwnGearItems();
    var seen = new Set();
    var appendOption = function (id, label, options) {
        if (options === void 0) { options = {}; }
        if (typeof id !== 'string')
            return;
        var trimmedId = id.trim();
        if (!trimmedId || seen.has(trimmedId))
            return;
        var option = document.createElement('option');
        option.value = trimmedId;
        option.textContent = label || trimmedId;
        if (options.dataset && option.dataset) {
            Object.entries(options.dataset).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value == null)
                    return;
                option.dataset[key] = value;
            });
        }
        if (options.fallback) {
            option.dataset.autoGearFallback = 'true';
        }
        if (selectedValues.includes(trimmedId)) {
            option.selected = true;
        }
        autoGearOwnGearSelect.appendChild(option);
        seen.add(trimmedId);
    };
    items.forEach(function (item) {
        if (!item || typeof item.id !== 'string')
            return;
        var trimmedId = item.id.trim();
        if (!trimmedId)
            return;
        var dataset = {};
        if (typeof item.name === 'string' && item.name) {
            dataset.name = item.name;
        }
        var formattedQuantity = formatOwnGearQuantityText(item.quantity);
        if (formattedQuantity) {
            dataset.quantity = formattedQuantity;
        }
        if (typeof item.notes === 'string' && item.notes) {
            dataset.notes = item.notes;
        }
        appendOption(trimmedId, formatAutoGearOwnGearLabel(item) || item.name || trimmedId, { dataset: dataset });
    });
    selectedValues.forEach(function (value) {
        if (!value || seen.has(value))
            return;
        var record = typeof findAutoGearOwnGearById === 'function'
            ? findAutoGearOwnGearById(value)
            : null;
        var label = (record === null || record === void 0 ? void 0 : record.name) || value;
        appendOption(value, label, { fallback: true });
    });
    var selectableOptions = Array.from(autoGearOwnGearSelect.options || []).filter(function (option) { return !option.disabled; });
    autoGearOwnGearSelect.size = computeAutoGearMultiSelectSize(selectableOptions.length, { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS });
    var hasSelectable = selectableOptions.some(function (option) { return option.dataset.autoGearFallback !== 'true'; });
    autoGearOwnGearSelect.disabled = !hasSelectable && selectedValues.length === 0;
}
function updateAutoGearOwnGearOptions() {
    var selects = [autoGearAddOwnGearSelect, autoGearRemoveOwnGearSelect].filter(Boolean);
    if (!selects.length)
        return;
    var items = getAutoGearOwnGearItems();
    selects.forEach(function (select) {
        var _a, _b;
        if (!select)
            return;
        var currentValue = select.value || '';
        var placeholder = select.getAttribute('data-placeholder')
            || ((_a = texts[currentLang]) === null || _a === void 0 ? void 0 : _a.autoGearOwnGearPlaceholder)
            || ((_b = texts.en) === null || _b === void 0 ? void 0 : _b.autoGearOwnGearPlaceholder)
            || 'Manual entry';
        select.innerHTML = '';
        var placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = placeholder;
        select.appendChild(placeholderOption);
        items.forEach(function (item) {
            if (!item || typeof item.id !== 'string' || !item.id || typeof item.name !== 'string')
                return;
            var option = document.createElement('option');
            option.value = item.id;
            option.textContent = formatAutoGearOwnGearLabel(item) || item.name;
            option.dataset.name = item.name;
            if (item.notes)
                option.dataset.notes = item.notes;
            if (item.source)
                option.dataset.source = item.source;
            var formattedQuantity = formatOwnGearQuantityText(item.quantity);
            if (formattedQuantity)
                option.dataset.quantity = formattedQuantity;
            if (item.id === currentValue)
                option.selected = true;
            select.appendChild(option);
        });
        if (currentValue && select.value !== currentValue) {
            if (select.querySelector("option[value=\"".concat(currentValue, "\"]"))) {
                select.value = currentValue;
            }
            else {
                select.value = '';
            }
        }
        select.disabled = items.length === 0;
    });
    refreshAutoGearOwnGearConditionOptions(Array.isArray(autoGearEditorDraft === null || autoGearEditorDraft === void 0 ? void 0 : autoGearEditorDraft.ownGear)
        ? autoGearEditorDraft.ownGear
        : undefined);
}
function isAutoGearMonitoringCategory(value) {
    if (typeof value !== 'string')
        return false;
    return value.trim().toLowerCase() === 'monitoring';
}
function isMonitoringCategorySelected(select) {
    var _a;
    if (!select)
        return false;
    var directValue = typeof select.value === 'string' ? select.value : '';
    if (isAutoGearMonitoringCategory(directValue)) {
        return true;
    }
    var option = ((_a = select.options) === null || _a === void 0 ? void 0 : _a[select.selectedIndex]) || null;
    if (!option)
        return false;
    var optionValue = typeof option.value === 'string' ? option.value : '';
    if (isAutoGearMonitoringCategory(optionValue)) {
        return true;
    }
    var optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
    return isAutoGearMonitoringCategory(optionLabel);
}
function matchesTripodCategory(value) {
    var normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!normalized)
        return false;
    if (normalized === 'camera support')
        return true;
    if (normalized === 'grip')
        return true;
    return normalized.includes('tripod');
}
function isTripodCategorySelected(select) {
    var _a;
    if (!select)
        return false;
    var directValue = typeof select.value === 'string' ? select.value : '';
    if (matchesTripodCategory(directValue))
        return true;
    var option = ((_a = select.options) === null || _a === void 0 ? void 0 : _a[select.selectedIndex]) || null;
    if (!option)
        return false;
    if (matchesTripodCategory(option.value))
        return true;
    var optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
    return matchesTripodCategory(optionLabel);
}
function setAutoGearFieldVisibility(field, isVisible) {
    if (!field)
        return;
    if (isVisible) {
        field.hidden = false;
        field.removeAttribute('hidden');
        field.removeAttribute('aria-hidden');
        if (Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
            var storedDisplay = field.dataset.autoGearHiddenDisplay;
            if (storedDisplay) {
                field.style.display = storedDisplay;
            }
            else {
                field.style.removeProperty('display');
            }
            delete field.dataset.autoGearHiddenDisplay;
        }
        else if (field.style.display === 'none') {
            field.style.removeProperty('display');
        }
    }
    else {
        field.hidden = true;
        field.setAttribute('hidden', '');
        field.setAttribute('aria-hidden', 'true');
        if (!Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
            field.dataset.autoGearHiddenDisplay = field.style.display || '';
        }
        field.style.display = 'none';
    }
}
function updateAutoGearMonitorFieldGroup(group) {
    if (!group || !group.select)
        return;
    var select = group.select, screenSizeField = group.screenSizeField, screenSizeInput = group.screenSizeInput, selectorTypeField = group.selectorTypeField, selectorTypeSelect = group.selectorTypeSelect, selectorDefaultField = group.selectorDefaultField, selectorDefaultInput = group.selectorDefaultInput;
    var isMonitoring = isMonitoringCategorySelected(select);
    var isTripod = isTripodCategorySelected(select);
    var showScreenSize = isMonitoring;
    var showSelectorFields = isMonitoring || isTripod;
    setAutoGearFieldVisibility(screenSizeField, showScreenSize);
    setAutoGearFieldVisibility(selectorTypeField, showSelectorFields);
    setAutoGearFieldVisibility(selectorDefaultField, showSelectorFields);
    if (!showScreenSize && screenSizeInput) {
        screenSizeInput.value = '';
    }
    if (!showSelectorFields) {
        if (selectorTypeSelect)
            selectorTypeSelect.value = 'none';
        if (selectorDefaultInput) {
            selectorDefaultInput.value = '';
            if (Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset || {}, 'autoGearPreferredDefault')) {
                delete selectorDefaultInput.dataset.autoGearPreferredDefault;
            }
        }
    }
}
function extractAutoGearContextNotes(name) {
    var contexts = [];
    if (!name || typeof name !== 'string') {
        return { baseName: '', contexts: contexts };
    }
    var baseName = name.trim();
    var contextPattern = /^(.*\([^()]*\)) \(([^()]+)\)$/;
    var match = baseName.match(contextPattern);
    while (match) {
        var candidate = match[2].trim();
        if (/handheld\b/i.test(candidate) || /15-21"?$/.test(candidate)) {
            contexts.unshift(candidate);
            baseName = match[1].trim();
        }
        else {
            break;
        }
        match = baseName.match(contextPattern);
    }
    return { baseName: baseName, contexts: contexts };
}
function normalizeAutoGearItem(entry) {
    if (!entry || typeof entry !== 'object')
        return null;
    var requestedName = normalizeAutoGearText(entry.name);
    var ownGearSourceId = typeof entry.ownGearId === 'string' ? entry.ownGearId.trim() : '';
    var ownGearFallbackLabel = normalizeAutoGearText(entry.ownGearLabel);
    var ownGearNameInput = normalizeAutoGearText(entry.ownGearName);
    var ownGearRecord = null;
    if (ownGearSourceId) {
        ownGearRecord = findAutoGearOwnGearById(ownGearSourceId) || null;
    }
    var rawName = (ownGearRecord === null || ownGearRecord === void 0 ? void 0 : ownGearRecord.name)
        || ownGearNameInput
        || requestedName;
    if (!rawName)
        return null;
    var _a = extractAutoGearContextNotes(requestedName || rawName), baseName = _a.baseName, contexts = _a.contexts;
    var name = baseName || rawName;
    var storedContexts = Array.isArray(entry.contextNotes)
        ? entry.contextNotes.filter(function (value) { return typeof value === 'string' && value.trim(); })
        : [];
    storedContexts.forEach(function (note) {
        var trimmed = note.trim();
        if (!trimmed)
            return;
        if (!contexts.includes(trimmed))
            contexts.push(trimmed);
    });
    var category = normalizeAutoGearText(entry.category);
    var quantity = normalizeAutoGearQuantity(entry.quantity);
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
    var screenSize = normalizeAutoGearText(entry.screenSize);
    var selectorType = normalizeAutoGearSelectorType(entry.selectorType);
    var selectorContext = typeof entry.selectorContext === 'string'
        ? entry.selectorContext.trim()
        : '';
    var selectorDefault = normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault, selectorContext);
    var selectorEnabled = !!entry.selectorEnabled;
    if (selectorType === 'none') {
        selectorEnabled = false;
    }
    else if (isAutoGearMonitoringCategory(category)) {
        selectorEnabled = true;
    }
    var notes = normalizeAutoGearText(entry.notes);
    var ownGearId = '';
    var ownGearLabel = '';
    if (ownGearRecord) {
        ownGearId = ownGearRecord.id;
        ownGearLabel = ownGearRecord.name || '';
        name = ownGearRecord.name || name;
        if (!notes && typeof ownGearRecord.notes === 'string') {
            var trimmedNotes = normalizeAutoGearText(ownGearRecord.notes);
            if (trimmedNotes)
                notes = trimmedNotes;
        }
    }
    else if (ownGearSourceId) {
        ownGearId = ownGearSourceId;
        ownGearLabel = ownGearFallbackLabel || ownGearNameInput || name;
    }
    return {
        id: id,
        name: name,
        category: category,
        quantity: quantity,
        screenSize: screenSize,
        selectorType: selectorType,
        selectorDefault: selectorDefault,
        selectorEnabled: selectorEnabled,
        selectorContext: selectorContext,
        notes: notes,
        contextNotes: contexts,
        ownGearId: ownGearId,
        ownGearLabel: ownGearLabel,
    };
}
function normalizeAutoGearTriggerList(values) {
    if (!Array.isArray(values))
        return [];
    return Array.from(new Set(values
        .map(function (value) { return (typeof value === 'string' ? value.trim() : ''); })
        .filter(Boolean)));
}
var AUTO_GEAR_SCENARIO_LOGIC_VALUES = new Set(['all', 'any', 'multiplier']);
function normalizeAutoGearScenarioLogic(value) {
    if (typeof value !== 'string')
        return 'all';
    var normalized = value.trim().toLowerCase();
    if (!normalized)
        return 'all';
    if (normalized === 'or')
        return 'any';
    if (normalized === 'and')
        return 'all';
    if (normalized === 'any')
        return 'any';
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
        return 'multiplier';
    }
    return AUTO_GEAR_SCENARIO_LOGIC_VALUES.has(normalized) ? normalized : 'all';
}
var AUTO_GEAR_CONDITION_LOGIC_VALUES = new Set(['all', 'any', 'or', 'none', 'multiplier']);
var AUTO_GEAR_CONDITION_LOGIC_FIELDS = {
    mattebox: 'matteboxLogic',
    cameraHandle: 'cameraHandleLogic',
    viewfinderExtension: 'viewfinderExtensionLogic',
    deliveryResolution: 'deliveryResolutionLogic',
    videoDistribution: 'videoDistributionLogic',
    camera: 'cameraLogic',
    ownGear: 'ownGearLogic',
    monitor: 'monitorLogic',
    tripodHeadBrand: 'tripodHeadBrandLogic',
    tripodBowl: 'tripodBowlLogic',
    tripodTypes: 'tripodTypesLogic',
    tripodSpreader: 'tripodSpreaderLogic',
    crewPresent: 'crewPresentLogic',
    crewAbsent: 'crewAbsentLogic',
    wireless: 'wirelessLogic',
    motors: 'motorsLogic',
    controllers: 'controllersLogic',
    distance: 'distanceLogic',
};
function normalizeAutoGearConditionLogic(value) {
    if (typeof value !== 'string')
        return 'all';
    var normalized = value.trim().toLowerCase();
    if (!normalized)
        return 'all';
    if (normalized === 'or')
        return 'or';
    if (normalized === 'and')
        return 'all';
    if (normalized === 'any')
        return 'any';
    if (normalized === 'none' || normalized === 'no' || normalized === 'exclude' || normalized === 'absent') {
        return 'none';
    }
    if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
        return 'multiplier';
    }
    if (!AUTO_GEAR_CONDITION_LOGIC_VALUES.has(normalized)) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unknown auto gear condition logic joiner. Falling back to "all".', value);
        }
        return 'all';
    }
    return normalized;
}
function readAutoGearConditionLogic(rule, key) {
    if (!rule || typeof rule !== 'object')
        return 'all';
    var property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    var raw;
    if (property && Object.prototype.hasOwnProperty.call(rule, property)) {
        raw = rule[property];
    }
    if (raw == null) {
        var alias = "".concat(key, "Mode");
        if (Object.prototype.hasOwnProperty.call(rule, alias)) {
            raw = rule[alias];
        }
    }
    if (raw == null && rule.conditionLogic && typeof rule.conditionLogic === 'object') {
        raw = rule.conditionLogic[key];
    }
    return normalizeAutoGearConditionLogic(raw);
}
function normalizeAutoGearScenarioMultiplier(value) {
    var num = parseInt(value, 10);
    return Number.isFinite(num) && num > 1 ? num : 1;
}
function normalizeAutoGearScenarioPrimary(value) {
    return typeof value === 'string' ? value.trim() : '';
}
function normalizeVideoDistributionTriggerList(values) {
    if (!Array.isArray(values))
        return [];
    var base = normalizeAutoGearTriggerList(values);
    var seen = new Set();
    var result = [];
    base.forEach(function (value) {
        var lower = value.toLowerCase();
        var normalized = lower === '__none__' || lower === 'none'
            ? '__none__'
            : value;
        if (!normalized || seen.has(normalized))
            return;
        seen.add(normalized);
        result.push(normalized);
    });
    return result;
}
function normalizeAutoGearTriggerValue(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
}
function autoGearRuleMatteboxKey(rule) {
    if (!rule || typeof rule !== 'object')
        return '';
    var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
    if (!matteboxList.length)
        return '';
    return matteboxList
        .map(normalizeAutoGearTriggerValue)
        .filter(Boolean)
        .sort(function (a, b) { return a.localeCompare(b); })
        .join('|');
}
var AUTO_GEAR_SHOOTING_DAY_MODES = new Set(['minimum', 'maximum', 'every']);
function normalizeAutoGearShootingDayMode(value) {
    if (typeof value !== 'string')
        return 'minimum';
    var normalized = value.trim().toLowerCase();
    if (!normalized)
        return 'minimum';
    if (AUTO_GEAR_SHOOTING_DAY_MODES.has(normalized))
        return normalized;
    if (normalized === 'min' || normalized === 'at least')
        return 'minimum';
    if (normalized === 'max' || normalized === 'at most')
        return 'maximum';
    if (normalized === 'each' || normalized === 'every')
        return 'every';
    return 'minimum';
}
function normalizeAutoGearShootingDayValue(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        var rounded = Math.round(value);
        return rounded > 0 ? rounded : null;
    }
    if (typeof value === 'string') {
        var trimmed = value.trim();
        if (!trimmed)
            return null;
        var parsed = Number.parseInt(trimmed, 10);
        if (!Number.isFinite(parsed))
            return null;
        return parsed > 0 ? parsed : null;
    }
    return null;
}
function normalizeAutoGearShootingDaysList(values) {
    if (!Array.isArray(values))
        return [];
    var unique = new Set();
    values.forEach(function (value) {
        var normalized = normalizeAutoGearShootingDayValue(value);
        if (Number.isFinite(normalized) && normalized > 0) {
            unique.add(normalized);
        }
    });
    return Array.from(unique).sort(function (a, b) { return a - b; });
}
function normalizeAutoGearShootingDaysCondition(setting) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (!setting)
        return null;
    if (Array.isArray(setting)) {
        var values = normalizeAutoGearShootingDaysList(setting);
        if (!values.length)
            return null;
        var maxValue = values[values.length - 1];
        return Number.isFinite(maxValue) && maxValue > 0
            ? { mode: 'minimum', value: maxValue }
            : null;
    }
    if (typeof setting === 'object') {
        var modeSource = (_d = (_c = (_b = (_a = setting.mode) !== null && _a !== void 0 ? _a : setting.type) !== null && _b !== void 0 ? _b : setting.comparison) !== null && _c !== void 0 ? _c : setting.condition) !== null && _d !== void 0 ? _d : setting.kind;
        var mode = normalizeAutoGearShootingDayMode(modeSource);
        var valueSource = (_j = (_h = (_g = (_f = (_e = setting.value) !== null && _e !== void 0 ? _e : setting.count) !== null && _f !== void 0 ? _f : setting.days) !== null && _g !== void 0 ? _g : setting.minimum) !== null && _h !== void 0 ? _h : setting.maximum) !== null && _j !== void 0 ? _j : setting.frequency;
        var value = normalizeAutoGearShootingDayValue(valueSource);
        if (Number.isFinite(value) && value > 0) {
            return { mode: mode, value: value };
        }
        return null;
    }
    var normalizedValue = normalizeAutoGearShootingDayValue(setting);
    if (Number.isFinite(normalizedValue) && normalizedValue > 0) {
        return { mode: 'minimum', value: normalizedValue };
    }
    return null;
}
function normalizeAutoGearRule(rule) {
    if (!rule || typeof rule !== 'object')
        return null;
    var id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
    var label = typeof rule.label === 'string' ? rule.label.trim() : '';
    var enabled = true;
    if (typeof rule.enabled === 'string') {
        var normalized = rule.enabled.trim().toLowerCase();
        if (normalized === 'false' || normalized === '0') {
            enabled = false;
        }
    }
    else if (rule.enabled === false) {
        enabled = false;
    }
    var always = false;
    if (Array.isArray(rule.always)) {
        always = rule.always.some(function (value) {
            if (typeof value === 'string') {
                var trimmed = value.trim().toLowerCase();
                if (!trimmed)
                    return false;
                if (trimmed === 'false' || trimmed === '0')
                    return false;
                return true;
            }
            return Boolean(value);
        });
    }
    else if (typeof rule.always === 'string') {
        var trimmed = rule.always.trim().toLowerCase();
        always = trimmed === 'true' || (trimmed && trimmed !== 'false' && trimmed !== '0');
    }
    else {
        always = Boolean(rule.always);
    }
    var scenarios = normalizeAutoGearTriggerList(rule.scenarios);
    var scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
    var scenarioMultiplier = 1;
    var scenarioPrimary = '';
    if (scenarioLogic === 'multiplier') {
        scenarioMultiplier = normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier);
        var requestedPrimary = normalizeAutoGearScenarioPrimary(rule.scenarioPrimary);
        var normalizedPrimary_1 = normalizeAutoGearTriggerValue(requestedPrimary);
        if (normalizedPrimary_1) {
            var matched = scenarios.find(function (value) { return normalizeAutoGearTriggerValue(value) === normalizedPrimary_1; });
            if (matched) {
                scenarioPrimary = matched;
            }
            else if (requestedPrimary) {
                scenarioPrimary = requestedPrimary;
                scenarios.push(requestedPrimary);
            }
        }
        if (!scenarioPrimary && scenarios.length) {
            scenarioPrimary = scenarios[0];
        }
    }
    scenarios = scenarios.sort(function (a, b) { return a.localeCompare(b); });
    if (scenarioLogic === 'multiplier' && scenarioPrimary) {
        var normalizedPrimary_2 = normalizeAutoGearTriggerValue(scenarioPrimary);
        var hasPrimary = scenarios.some(function (value) { return normalizeAutoGearTriggerValue(value) === normalizedPrimary_2; });
        if (!hasPrimary) {
            scenarios.push(scenarioPrimary);
            scenarios.sort(function (a, b) { return a.localeCompare(b); });
        }
    }
    var mattebox = normalizeAutoGearTriggerList(rule.mattebox).sort(function (a, b) { return a.localeCompare(b); });
    var cameraHandle = normalizeAutoGearTriggerList(rule.cameraHandle).sort(function (a, b) { return a.localeCompare(b); });
    var viewfinderExtension = normalizeAutoGearTriggerList(rule.viewfinderExtension).sort(function (a, b) { return a.localeCompare(b); });
    var deliveryResolution = normalizeAutoGearTriggerList(rule.deliveryResolution).sort(function (a, b) { return a.localeCompare(b); });
    var videoDistribution = normalizeVideoDistributionTriggerList(rule.videoDistribution)
        .sort(function (a, b) { return a.localeCompare(b); });
    var camera = normalizeAutoGearTriggerList(rule.camera).sort(function (a, b) { return a.localeCompare(b); });
    var ownGear = normalizeAutoGearTriggerList(rule.ownGear).sort(function (a, b) { return a.localeCompare(b); });
    var cameraWeight = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
    var monitor = normalizeAutoGearTriggerList(rule.monitor).sort(function (a, b) { return a.localeCompare(b); });
    var tripodHeadBrand = normalizeAutoGearTriggerList(rule.tripodHeadBrand).sort(function (a, b) { return a.localeCompare(b); });
    var tripodBowl = normalizeAutoGearTriggerList(rule.tripodBowl).sort(function (a, b) { return a.localeCompare(b); });
    var tripodTypes = normalizeAutoGearTriggerList(rule.tripodTypes).sort(function (a, b) { return a.localeCompare(b); });
    var tripodSpreader = normalizeAutoGearTriggerList(rule.tripodSpreader).sort(function (a, b) { return a.localeCompare(b); });
    var crewPresent = normalizeAutoGearTriggerList(rule.crewPresent).sort(function (a, b) { return a.localeCompare(b); });
    var crewAbsent = normalizeAutoGearTriggerList(rule.crewAbsent).sort(function (a, b) { return a.localeCompare(b); });
    var wireless = normalizeAutoGearTriggerList(rule.wireless).sort(function (a, b) { return a.localeCompare(b); });
    var motors = normalizeAutoGearTriggerList(rule.motors).sort(function (a, b) { return a.localeCompare(b); });
    var controllers = normalizeAutoGearTriggerList(rule.controllers).sort(function (a, b) { return a.localeCompare(b); });
    var distance = normalizeAutoGearTriggerList(rule.distance).sort(function (a, b) { return a.localeCompare(b); });
    var shootingDays = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
    var matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
    var cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
    var viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
    var deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
    var videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
    var cameraLogic = readAutoGearConditionLogic(rule, 'camera');
    var ownGearLogic = readAutoGearConditionLogic(rule, 'ownGear');
    var monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
    var tripodHeadBrandLogic = readAutoGearConditionLogic(rule, 'tripodHeadBrand');
    var tripodBowlLogic = readAutoGearConditionLogic(rule, 'tripodBowl');
    var tripodTypesLogic = readAutoGearConditionLogic(rule, 'tripodTypes');
    var tripodSpreaderLogic = readAutoGearConditionLogic(rule, 'tripodSpreader');
    var crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
    var crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
    var wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
    var motorsLogic = readAutoGearConditionLogic(rule, 'motors');
    var controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
    var distanceLogic = readAutoGearConditionLogic(rule, 'distance');
    var conditionLogic = {};
    if (scenarioLogic && scenarioLogic !== 'all') {
        conditionLogic.scenarios = scenarioLogic;
    }
    if (matteboxLogic && matteboxLogic !== 'all')
        conditionLogic.mattebox = matteboxLogic;
    if (cameraHandleLogic && cameraHandleLogic !== 'all')
        conditionLogic.cameraHandle = cameraHandleLogic;
    if (viewfinderExtensionLogic && viewfinderExtensionLogic !== 'all') {
        conditionLogic.viewfinderExtension = viewfinderExtensionLogic;
    }
    if (deliveryResolutionLogic && deliveryResolutionLogic !== 'all') {
        conditionLogic.deliveryResolution = deliveryResolutionLogic;
    }
    if (videoDistributionLogic && videoDistributionLogic !== 'all') {
        conditionLogic.videoDistribution = videoDistributionLogic;
    }
    if (cameraLogic && cameraLogic !== 'all')
        conditionLogic.camera = cameraLogic;
    if (ownGearLogic && ownGearLogic !== 'all')
        conditionLogic.ownGear = ownGearLogic;
    if (monitorLogic && monitorLogic !== 'all')
        conditionLogic.monitor = monitorLogic;
    if (tripodHeadBrandLogic && tripodHeadBrandLogic !== 'all') {
        conditionLogic.tripodHeadBrand = tripodHeadBrandLogic;
    }
    if (tripodBowlLogic && tripodBowlLogic !== 'all') {
        conditionLogic.tripodBowl = tripodBowlLogic;
    }
    if (tripodTypesLogic && tripodTypesLogic !== 'all') {
        conditionLogic.tripodTypes = tripodTypesLogic;
    }
    if (tripodSpreaderLogic && tripodSpreaderLogic !== 'all') {
        conditionLogic.tripodSpreader = tripodSpreaderLogic;
    }
    if (crewPresentLogic && crewPresentLogic !== 'all')
        conditionLogic.crewPresent = crewPresentLogic;
    if (crewAbsentLogic && crewAbsentLogic !== 'all')
        conditionLogic.crewAbsent = crewAbsentLogic;
    if (wirelessLogic && wirelessLogic !== 'all')
        conditionLogic.wireless = wirelessLogic;
    if (motorsLogic && motorsLogic !== 'all')
        conditionLogic.motors = motorsLogic;
    if (controllersLogic && controllersLogic !== 'all')
        conditionLogic.controllers = controllersLogic;
    if (distanceLogic && distanceLogic !== 'all')
        conditionLogic.distance = distanceLogic;
    if (!always &&
        !scenarios.length
        && !shootingDays
        && !mattebox.length
        && !cameraHandle.length
        && !viewfinderExtension.length
        && !deliveryResolution.length
        && !videoDistribution.length
        && !camera.length
        && !ownGear.length
        && !cameraWeight
        && !monitor.length
        && !tripodHeadBrand.length
        && !tripodBowl.length
        && !tripodTypes.length
        && !tripodSpreader.length
        && !crewPresent.length
        && !crewAbsent.length
        && !wireless.length
        && !motors.length
        && !controllers.length
        && !distance.length)
        return null;
    var add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
    var remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
    if (!add.length && !remove.length)
        return null;
    return {
        id: id,
        label: label,
        always: always,
        scenarioLogic: scenarioLogic,
        scenarioPrimary: scenarioPrimary,
        scenarioMultiplier: scenarioMultiplier,
        scenarios: scenarios,
        mattebox: mattebox,
        cameraHandle: cameraHandle,
        viewfinderExtension: viewfinderExtension,
        deliveryResolution: deliveryResolution,
        videoDistribution: videoDistribution,
        camera: camera,
        ownGear: ownGear,
        cameraWeight: cameraWeight,
        monitor: monitor,
        tripodHeadBrand: tripodHeadBrand,
        tripodBowl: tripodBowl,
        tripodTypes: tripodTypes,
        tripodSpreader: tripodSpreader,
        crewPresent: crewPresent,
        crewAbsent: crewAbsent,
        wireless: wireless,
        motors: motors,
        controllers: controllers,
        distance: distance,
        shootingDays: shootingDays,
        matteboxLogic: matteboxLogic,
        cameraHandleLogic: cameraHandleLogic,
        viewfinderExtensionLogic: viewfinderExtensionLogic,
        deliveryResolutionLogic: deliveryResolutionLogic,
        videoDistributionLogic: videoDistributionLogic,
        cameraLogic: cameraLogic,
        ownGearLogic: ownGearLogic,
        monitorLogic: monitorLogic,
        tripodHeadBrandLogic: tripodHeadBrandLogic,
        tripodBowlLogic: tripodBowlLogic,
        tripodTypesLogic: tripodTypesLogic,
        tripodSpreaderLogic: tripodSpreaderLogic,
        crewPresentLogic: crewPresentLogic,
        crewAbsentLogic: crewAbsentLogic,
        wirelessLogic: wirelessLogic,
        motorsLogic: motorsLogic,
        controllersLogic: controllersLogic,
        distanceLogic: distanceLogic,
        conditionLogic: conditionLogic,
        add: add,
        remove: remove,
        enabled: enabled,
    };
}
function autoGearItemSnapshot(item) {
    var normalized = normalizeAutoGearItem(item);
    if (!normalized) {
        return {
            name: '',
            category: '',
            quantity: 0,
            screenSize: '',
            selectorType: 'none',
            selectorDefault: '',
            selectorEnabled: false,
            notes: '',
            ownGearId: '',
            ownGearLabel: '',
        };
    }
    var name = normalized.name, category = normalized.category, quantity = normalized.quantity, screenSize = normalized.screenSize, selectorType = normalized.selectorType, selectorDefault = normalized.selectorDefault, selectorEnabled = normalized.selectorEnabled, notes = normalized.notes, ownGearId = normalized.ownGearId, ownGearLabel = normalized.ownGearLabel;
    return {
        name: name,
        category: category,
        quantity: normalizeAutoGearQuantity(quantity),
        screenSize: screenSize,
        selectorType: selectorType,
        selectorDefault: selectorDefault,
        selectorEnabled: selectorEnabled,
        notes: notes,
        ownGearId: ownGearId,
        ownGearLabel: ownGearLabel,
    };
}
function autoGearItemSortKey(item) {
    var snapshot = autoGearItemSnapshot(item);
    var name = snapshot.name || '';
    var category = snapshot.category || '';
    var quantity = normalizeAutoGearQuantity(snapshot.quantity);
    var screenSize = snapshot.screenSize || '';
    var selectorType = snapshot.selectorType || 'none';
    var selectorDefault = snapshot.selectorDefault || '';
    var selectorEnabled = snapshot.selectorEnabled ? '1' : '0';
    var notes = snapshot.notes || '';
    var ownGearId = snapshot.ownGearId || '';
    var ownGearLabel = snapshot.ownGearLabel || '';
    return "".concat(name, "|").concat(category, "|").concat(quantity, "|").concat(screenSize, "|").concat(selectorType, "|").concat(selectorEnabled, "|").concat(selectorDefault, "|").concat(notes, "|").concat(ownGearId, "|").concat(ownGearLabel);
}
function snapshotAutoGearRuleForFingerprint(rule) {
    var normalized = normalizeAutoGearRule(rule);
    if (!normalized)
        return null;
    var mapItems = function (items) {
        return items
            .map(autoGearItemSnapshot)
            .sort(function (a, b) { return autoGearItemSortKey(a).localeCompare(autoGearItemSortKey(b)); });
    };
    return {
        label: normalized.label || '',
        always: normalized.always ? 1 : 0,
        scenarios: normalized.scenarios.slice().sort(function (a, b) { return a.localeCompare(b); }),
        mattebox: normalized.mattebox.slice().sort(function (a, b) { return a.localeCompare(b); }),
        cameraHandle: normalized.cameraHandle.slice().sort(function (a, b) { return a.localeCompare(b); }),
        viewfinderExtension: normalized.viewfinderExtension.slice().sort(function (a, b) { return a.localeCompare(b); }),
        deliveryResolution: normalized.deliveryResolution.slice().sort(function (a, b) { return a.localeCompare(b); }),
        videoDistribution: normalized.videoDistribution.slice().sort(function (a, b) { return a.localeCompare(b); }),
        camera: normalized.camera.slice().sort(function (a, b) { return a.localeCompare(b); }),
        cameraWeight: normalized.cameraWeight
            ? { operator: normalized.cameraWeight.operator, value: normalized.cameraWeight.value }
            : null,
        monitor: normalized.monitor.slice().sort(function (a, b) { return a.localeCompare(b); }),
        tripodHeadBrand: normalized.tripodHeadBrand.slice().sort(function (a, b) { return a.localeCompare(b); }),
        tripodBowl: normalized.tripodBowl.slice().sort(function (a, b) { return a.localeCompare(b); }),
        tripodTypes: normalized.tripodTypes.slice().sort(function (a, b) { return a.localeCompare(b); }),
        tripodSpreader: normalized.tripodSpreader.slice().sort(function (a, b) { return a.localeCompare(b); }),
        crewPresent: normalized.crewPresent.slice().sort(function (a, b) { return a.localeCompare(b); }),
        crewAbsent: normalized.crewAbsent.slice().sort(function (a, b) { return a.localeCompare(b); }),
        wireless: normalized.wireless.slice().sort(function (a, b) { return a.localeCompare(b); }),
        motors: normalized.motors.slice().sort(function (a, b) { return a.localeCompare(b); }),
        controllers: normalized.controllers.slice().sort(function (a, b) { return a.localeCompare(b); }),
        distance: normalized.distance.slice().sort(function (a, b) { return a.localeCompare(b); }),
        shootingDays: normalizeAutoGearShootingDaysCondition(normalized.shootingDays),
        matteboxLogic: normalizeAutoGearConditionLogic(normalized.matteboxLogic),
        cameraHandleLogic: normalizeAutoGearConditionLogic(normalized.cameraHandleLogic),
        viewfinderExtensionLogic: normalizeAutoGearConditionLogic(normalized.viewfinderExtensionLogic),
        deliveryResolutionLogic: normalizeAutoGearConditionLogic(normalized.deliveryResolutionLogic),
        videoDistributionLogic: normalizeAutoGearConditionLogic(normalized.videoDistributionLogic),
        cameraLogic: normalizeAutoGearConditionLogic(normalized.cameraLogic),
        monitorLogic: normalizeAutoGearConditionLogic(normalized.monitorLogic),
        tripodHeadBrandLogic: normalizeAutoGearConditionLogic(normalized.tripodHeadBrandLogic),
        tripodBowlLogic: normalizeAutoGearConditionLogic(normalized.tripodBowlLogic),
        tripodTypesLogic: normalizeAutoGearConditionLogic(normalized.tripodTypesLogic),
        tripodSpreaderLogic: normalizeAutoGearConditionLogic(normalized.tripodSpreaderLogic),
        crewPresentLogic: normalizeAutoGearConditionLogic(normalized.crewPresentLogic),
        crewAbsentLogic: normalizeAutoGearConditionLogic(normalized.crewAbsentLogic),
        wirelessLogic: normalizeAutoGearConditionLogic(normalized.wirelessLogic),
        motorsLogic: normalizeAutoGearConditionLogic(normalized.motorsLogic),
        controllersLogic: normalizeAutoGearConditionLogic(normalized.controllersLogic),
        distanceLogic: normalizeAutoGearConditionLogic(normalized.distanceLogic),
        conditionLogic: normalized.conditionLogic
            ? Object.keys(normalized.conditionLogic).reduce(function (acc, key) {
                acc[key] = normalizeAutoGearConditionLogic(normalized.conditionLogic[key]);
                return acc;
            }, {})
            : {},
        add: mapItems(normalized.add),
        remove: mapItems(normalized.remove),
        enabled: normalized.enabled ? 1 : 0,
    };
}
function autoGearRuleSortKey(rule) {
    var alwaysKey = rule && rule.always ? '1' : '0';
    var scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
    var matteboxKey = Array.isArray(rule.mattebox) ? rule.mattebox.join('|') : '';
    var cameraHandleKey = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.join('|') : '';
    var viewfinderKey = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.join('|') : '';
    var deliveryResolutionKey = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.join('|') : '';
    var videoDistributionKey = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.join('|') : '';
    var cameraKey = Array.isArray(rule.camera) ? rule.camera.join('|') : '';
    var cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule === null || rule === void 0 ? void 0 : rule.cameraWeight);
    var cameraWeightKey = cameraWeightCondition
        ? "".concat(cameraWeightCondition.operator, ":").concat(cameraWeightCondition.value)
        : '';
    var monitorKey = Array.isArray(rule.monitor) ? rule.monitor.join('|') : '';
    var tripodHeadBrandKey = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.join('|') : '';
    var tripodBowlKey = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.join('|') : '';
    var tripodTypesKey = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.join('|') : '';
    var tripodSpreaderKey = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.join('|') : '';
    var crewPresentKey = Array.isArray(rule.crewPresent) ? rule.crewPresent.join('|') : '';
    var crewAbsentKey = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.join('|') : '';
    var wirelessKey = Array.isArray(rule.wireless) ? rule.wireless.join('|') : '';
    var motorsKey = Array.isArray(rule.motors) ? rule.motors.join('|') : '';
    var controllersKey = Array.isArray(rule.controllers) ? rule.controllers.join('|') : '';
    var distanceKey = Array.isArray(rule.distance) ? rule.distance.join('|') : '';
    var shootingDaysCondition = normalizeAutoGearShootingDaysCondition(rule === null || rule === void 0 ? void 0 : rule.shootingDays);
    var shootingDaysKey = shootingDaysCondition
        ? "".concat(shootingDaysCondition.mode, ":").concat(shootingDaysCondition.value)
        : '';
    var matteboxLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.matteboxLogic);
    var cameraHandleLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.cameraHandleLogic);
    var viewfinderLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.viewfinderExtensionLogic);
    var deliveryResolutionLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.deliveryResolutionLogic);
    var videoDistributionLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.videoDistributionLogic);
    var cameraLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.cameraLogic);
    var monitorLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.monitorLogic);
    var tripodHeadBrandLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodHeadBrandLogic);
    var tripodBowlLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodBowlLogic);
    var tripodTypesLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodTypesLogic);
    var tripodSpreaderLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.tripodSpreaderLogic);
    var crewPresentLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.crewPresentLogic);
    var crewAbsentLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.crewAbsentLogic);
    var wirelessLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.wirelessLogic);
    var motorsLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.motorsLogic);
    var controllersLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.controllersLogic);
    var distanceLogicKey = normalizeAutoGearConditionLogic(rule === null || rule === void 0 ? void 0 : rule.distanceLogic);
    var addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
    var removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
    return "".concat(alwaysKey, "|").concat(scenarioKey, "|").concat(matteboxKey, "|").concat(cameraHandleKey, "|").concat(viewfinderKey, "|").concat(deliveryResolutionKey, "|").concat(videoDistributionKey, "|").concat(cameraKey, "|").concat(cameraWeightKey, "|").concat(monitorKey, "|").concat(tripodHeadBrandKey, "|").concat(tripodBowlKey, "|").concat(tripodTypesKey, "|").concat(tripodSpreaderKey, "|").concat(crewPresentKey, "|").concat(crewAbsentKey, "|").concat(wirelessKey, "|").concat(motorsKey, "|").concat(controllersKey, "|").concat(distanceKey, "|").concat(shootingDaysKey, "|").concat(matteboxLogicKey, "|").concat(cameraHandleLogicKey, "|").concat(viewfinderLogicKey, "|").concat(deliveryResolutionLogicKey, "|").concat(videoDistributionLogicKey, "|").concat(cameraLogicKey, "|").concat(monitorLogicKey, "|").concat(tripodHeadBrandLogicKey, "|").concat(tripodBowlLogicKey, "|").concat(tripodTypesLogicKey, "|").concat(tripodSpreaderLogicKey, "|").concat(crewPresentLogicKey, "|").concat(crewAbsentLogicKey, "|").concat(wirelessLogicKey, "|").concat(motorsLogicKey, "|").concat(controllersLogicKey, "|").concat(distanceLogicKey, "|").concat(rule.label || '', "|").concat(addKey, "|").concat(removeKey);
}
function createAutoGearRulesFingerprint(rules) {
    var snapshot = (Array.isArray(rules) ? rules : [])
        .map(snapshotAutoGearRuleForFingerprint)
        .filter(Boolean)
        .sort(function (a, b) { return autoGearRuleSortKey(a).localeCompare(autoGearRuleSortKey(b)); });
    return stableStringify(snapshot);
}
function normalizeAutoGearPreset(entry) {
    if (!entry || typeof entry !== 'object')
        return null;
    var label = typeof entry.label === 'string' ? entry.label.trim() : '';
    if (!label)
        return null;
    var rawRules = Array.isArray(entry.rules) ? entry.rules : [];
    var rules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('preset');
    var fingerprint = createAutoGearRulesFingerprint(rules);
    return { id: id, label: label, rules: rules, fingerprint: fingerprint };
}
function normalizeAutoGearBackupEntry(entry) {
    if (!entry || typeof entry !== 'object')
        return null;
    var rawCreatedAt = typeof entry.createdAt === 'string' ? entry.createdAt : null;
    var timestamp = rawCreatedAt ? Date.parse(rawCreatedAt) : NaN;
    if (!Number.isFinite(timestamp))
        return null;
    var createdAt = new Date(timestamp).toISOString();
    var rawRules = Array.isArray(entry.rules) ? entry.rules : [];
    var normalizedRules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
    var rules = rawRules.length === 0 ? [] : normalizedRules;
    var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('backup');
    var monitorDefaults = normalizeAutoGearMonitorDefaults(entry.monitorDefaults);
    var note = typeof entry.note === 'string' ? entry.note : '';
    return { id: id, createdAt: createdAt, rules: rules, monitorDefaults: monitorDefaults, note: note };
}
var AUTO_GEAR_NORMALIZER_EXPORTS = {
    generateAutoGearId: generateAutoGearId,
    normalizeAutoGearQuantity: normalizeAutoGearQuantity,
    parseAutoGearDraftNames: parseAutoGearDraftNames,
    normalizeAutoGearText: normalizeAutoGearText,
    normalizeAutoGearSelectorType: normalizeAutoGearSelectorType,
    normalizeAutoGearSelectorDefault: normalizeAutoGearSelectorDefault,
    resolveDevicesSnapshot: resolveDevicesSnapshot,
    updateGlobalDevicesReference: updateGlobalDevicesReference,
    resolveTripodPreferenceSelect: resolveTripodPreferenceSelect,
    collectTripodPreferenceOptions: collectTripodPreferenceOptions,
    getAutoGearSelectorOptions: getAutoGearSelectorOptions,
    getAutoGearSelectorLabel: getAutoGearSelectorLabel,
    getAutoGearSelectorScrollHint: getAutoGearSelectorScrollHint,
    getAutoGearSelectorDefaultPlaceholder: getAutoGearSelectorDefaultPlaceholder,
    getAutoGearMonitorDefaultPlaceholder: getAutoGearMonitorDefaultPlaceholder,
    formatAutoGearSelectorValue: formatAutoGearSelectorValue,
    populateAutoGearCategorySelect: populateAutoGearCategorySelect,
    formatAutoGearOwnGearLabel: formatAutoGearOwnGearLabel,
    refreshAutoGearOwnGearConditionOptions: refreshAutoGearOwnGearConditionOptions,
    updateAutoGearOwnGearOptions: updateAutoGearOwnGearOptions,
    isAutoGearMonitoringCategory: isAutoGearMonitoringCategory,
    isMonitoringCategorySelected: isMonitoringCategorySelected,
    matchesTripodCategory: matchesTripodCategory,
    isTripodCategorySelected: isTripodCategorySelected,
    setAutoGearFieldVisibility: setAutoGearFieldVisibility,
    updateAutoGearMonitorFieldGroup: updateAutoGearMonitorFieldGroup,
    extractAutoGearContextNotes: extractAutoGearContextNotes,
    normalizeAutoGearItem: normalizeAutoGearItem,
    normalizeAutoGearTriggerList: normalizeAutoGearTriggerList,
    normalizeAutoGearScenarioLogic: normalizeAutoGearScenarioLogic,
    normalizeAutoGearConditionLogic: normalizeAutoGearConditionLogic,
    readAutoGearConditionLogic: readAutoGearConditionLogic,
    normalizeAutoGearScenarioMultiplier: normalizeAutoGearScenarioMultiplier,
    normalizeAutoGearScenarioPrimary: normalizeAutoGearScenarioPrimary,
    normalizeVideoDistributionTriggerList: normalizeVideoDistributionTriggerList,
    normalizeAutoGearTriggerValue: normalizeAutoGearTriggerValue,
    normalizeAutoGearShootingDayMode: normalizeAutoGearShootingDayMode,
    normalizeAutoGearShootingDayValue: normalizeAutoGearShootingDayValue,
    normalizeAutoGearShootingDaysList: normalizeAutoGearShootingDaysList,
    normalizeAutoGearShootingDaysCondition: normalizeAutoGearShootingDaysCondition,
    normalizeAutoGearRule: normalizeAutoGearRule,
    autoGearItemSnapshot: autoGearItemSnapshot,
    autoGearItemSortKey: autoGearItemSortKey,
    autoGearRuleMatteboxKey: autoGearRuleMatteboxKey,
    snapshotAutoGearRuleForFingerprint: snapshotAutoGearRuleForFingerprint,
    autoGearRuleSortKey: autoGearRuleSortKey,
    createAutoGearRulesFingerprint: createAutoGearRulesFingerprint,
    normalizeAutoGearPreset: normalizeAutoGearPreset,
    normalizeAutoGearBackupEntry: normalizeAutoGearBackupEntry,
    normalizeAutoGearMonitorDefaults: normalizeAutoGearMonitorDefaults,
    AUTO_GEAR_MONITOR_DEFAULT_TYPES: AUTO_GEAR_MONITOR_DEFAULT_TYPES,
};
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AUTO_GEAR_NORMALIZER_EXPORTS;
}
if (typeof globalThis !== 'undefined') {
    var target = (typeof globalThis.AUTO_GEAR_NORMALIZER_EXPORTS === 'object'
        && globalThis.AUTO_GEAR_NORMALIZER_EXPORTS)
        ? globalThis.AUTO_GEAR_NORMALIZER_EXPORTS
        : (globalThis.AUTO_GEAR_NORMALIZER_EXPORTS = {});
    Object.assign(target, AUTO_GEAR_NORMALIZER_EXPORTS);
    Object.assign(globalThis, AUTO_GEAR_NORMALIZER_EXPORTS);
    globalThis.AUTO_GEAR_MONITOR_DEFAULT_TYPES = AUTO_GEAR_MONITOR_DEFAULT_TYPES;
    globalThis.normalizeAutoGearMonitorDefaults = normalizeAutoGearMonitorDefaults;
}
