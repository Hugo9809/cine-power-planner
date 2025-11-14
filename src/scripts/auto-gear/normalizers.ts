/*
 * Auto Gear normalization helpers extracted from the primary runtime.
 * The code remains framework-free so it can run inside the legacy loader
 * while also being consumable from Node-based unit tests.
 */
// @ts-nocheck
/* global AUTO_GEAR_SELECTOR_TYPE_SET, AUTO_GEAR_SELECTOR_TYPE_MAP, DEVICE_GLOBAL_SCOPE,
  devices, CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE,
  CORE_SHARED, AUTO_GEAR_TRIPOD_FIELD_IDS, AUTO_GEAR_TRIPOD_SELECTOR_TYPES, localeSort,
  AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS, AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP,
  getLanguageTexts, currentLang, DEFAULT_LANGUAGE_SAFE, addArriKNumber, GEAR_LIST_CATEGORIES,
  AUTO_GEAR_CUSTOM_CATEGORY, texts, autoGearOwnGearSelect, collectAutoGearSelectedValues,
  getAutoGearOwnGearItems, autoGearEditorDraft, formatOwnGearQuantityText, findAutoGearOwnGearById,
  computeAutoGearMultiSelectSize, AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS, autoGearAddOwnGearSelect,
  autoGearRemoveOwnGearSelect, normalizeAutoGearCameraWeightCondition, stableStringify */

const AUTO_GEAR_NORMALIZER_SCOPE =
  (typeof globalThis !== 'undefined' && globalThis)
  || (typeof window !== 'undefined' && window)
  || (typeof self !== 'undefined' && self)
  || (typeof global !== 'undefined' && global)
  || {};

function getAutoGearFallbackLanguage() {
  if (typeof DEFAULT_LANGUAGE_SAFE === 'string' && DEFAULT_LANGUAGE_SAFE) {
    return DEFAULT_LANGUAGE_SAFE;
  }

  const scope = AUTO_GEAR_NORMALIZER_SCOPE || {};

  if (scope && typeof scope.DEFAULT_LANGUAGE_SAFE === 'string' && scope.DEFAULT_LANGUAGE_SAFE) {
    return scope.DEFAULT_LANGUAGE_SAFE;
  }

  if (scope && typeof scope.CPP_DEFAULT_LANGUAGE_SAFE === 'string' && scope.CPP_DEFAULT_LANGUAGE_SAFE) {
    return scope.CPP_DEFAULT_LANGUAGE_SAFE;
  }

  if (
    scope &&
    scope.cineCoreShared &&
    typeof scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE === 'string' &&
    scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE
  ) {
    return scope.cineCoreShared.DEFAULT_LANGUAGE_SAFE;
  }

  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.language === 'string' &&
    navigator.language
  ) {
    return navigator.language.slice(0, 2).toLowerCase();
  }

  return 'en';
}

function getAutoGearFallbackTexts() {
  const fallbackLang = getAutoGearFallbackLanguage();
  try {
    const fallbackTexts = getLanguageTexts(fallbackLang);
    if (fallbackTexts && typeof fallbackTexts === 'object') {
      return fallbackTexts;
    }
  } catch (error) {
    void error;
  }
  return {};
}

const AUTO_GEAR_DEFAULT_SELECTOR_TYPES = Object.freeze([
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
  const existingMap =
    scope && scope.AUTO_GEAR_SELECTOR_TYPE_MAP && typeof scope.AUTO_GEAR_SELECTOR_TYPE_MAP === 'object'
      ? scope.AUTO_GEAR_SELECTOR_TYPE_MAP
      : null;

  const resolvedMap = existingMap && Object.keys(existingMap).length
    ? existingMap
    : AUTO_GEAR_DEFAULT_SELECTOR_TYPES.reduce((acc, type) => {
        acc[type.toLowerCase()] = type;
        return acc;
      }, Object.create(null));

  const existingSet =
    scope && scope.AUTO_GEAR_SELECTOR_TYPE_SET instanceof Set
      ? scope.AUTO_GEAR_SELECTOR_TYPE_SET
      : null;

  const resolvedSet = existingSet && existingSet.size
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

const AUTO_GEAR_SELECTOR_TYPE_GLOBALS = ensureAutoGearSelectorTypeGlobals(AUTO_GEAR_NORMALIZER_SCOPE);
const AUTO_GEAR_SELECTOR_TYPE_MAP_FALLBACK = AUTO_GEAR_SELECTOR_TYPE_GLOBALS.map;
const AUTO_GEAR_SELECTOR_TYPE_SET_FALLBACK = AUTO_GEAR_SELECTOR_TYPE_GLOBALS.set;

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
  const base = prefix || 'rule';
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${base}-${crypto.randomUUID()}`;
  }
  return `${base}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
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
  const num = parseInt(value, 10);
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
  if (typeof value !== 'string') return [];
  const raw = value.trim();
  if (!raw) return [];
  const hasDelimiters = /[;\n\r]/.test(raw);
  const parts = hasDelimiters ? raw.split(/[;\n\r]+/) : [raw];
  return parts
    .map(part => {
      const segment = part.trim();
      if (!segment) return null;
      const signMatch = segment.match(/^([+-])\s*(.+)$/);
      const listType = signMatch ? (signMatch[1] === '-' ? 'remove' : 'add') : null;
      const content = signMatch ? signMatch[2].trim() : segment;
      if (!content) return null;
      const quantityMatch = content.match(/^(\d+)\s*[x×]\s*(.+)$/i);
      if (quantityMatch) {
        const name = quantityMatch[2].trim();
        if (!name) return null;
        return { name, quantity: normalizeAutoGearQuantity(quantityMatch[1]), listType };
      }
      return { name: content, listType };
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
function normalizeAutoGearText(value, { collapseWhitespace = true } = {}) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!collapseWhitespace) return trimmed;
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
    const candidate = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!candidate) return 'none';
    const selectorSet =
        (typeof AUTO_GEAR_SELECTOR_TYPE_SET !== 'undefined' && AUTO_GEAR_SELECTOR_TYPE_SET)
            || AUTO_GEAR_SELECTOR_TYPE_SET_FALLBACK;
    const selectorMap =
        (typeof AUTO_GEAR_SELECTOR_TYPE_MAP !== 'undefined' && AUTO_GEAR_SELECTOR_TYPE_MAP)
            || AUTO_GEAR_SELECTOR_TYPE_MAP_FALLBACK;
    if (!selectorSet || !selectorSet.has(candidate)) return 'none';
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
  const text = normalizeAutoGearText(value);
  if (!text) return '';
  const options = getAutoGearSelectorOptions(type, context ? { selectorContext: context } : null);
  if (!options.length) return text;
  const match = options.find(option => option.toLowerCase() === text.toLowerCase());
  return match || text;
}

const AUTO_GEAR_MONITOR_DEFAULT_TYPES = {
  focus: 'monitor',
  handheld7: 'monitor',
  combo15: 'directorMonitor',
  director15: 'directorMonitor',
};

function normalizeAutoGearMonitorDefaults(value) {
  const result = {
    focus: '',
    handheld7: '',
    combo15: '',
    director15: '',
  };
  if (!value || typeof value !== 'object') {
    return result;
  }
  Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(key => {
    const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[key];
    const normalized = normalizeAutoGearSelectorDefault(type, value[key]);
    result[key] = normalized;
  });
  return result;
}

function resolveDevicesSnapshot() {
  if (DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && typeof DEVICE_GLOBAL_SCOPE.devices === 'object') {
    return DEVICE_GLOBAL_SCOPE.devices;
  }

  try {
    return typeof devices !== 'undefined' && devices && typeof devices === 'object' ? devices : null;
  } catch (error) {
    if (error && typeof error === 'object' && error.name === 'ReferenceError') {
      return null;
    }
    throw error;
  }
}

function updateGlobalDevicesReference(nextDevices) {
  const normalizedDevices =
    nextDevices && typeof nextDevices === 'object'
      ? nextDevices
      : {};

  const seenScopes = new Set();
  const scopes = [];

  const enqueueScope = scope => {
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
    if (typeof DEVICE_GLOBAL_SCOPE !== 'undefined') {
      enqueueScope(DEVICE_GLOBAL_SCOPE);
    }
  } catch (scopeError) {
    void scopeError;
  }

  enqueueScope(typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null);
  enqueueScope(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  enqueueScope(
    typeof CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE !== 'undefined'
      ? CORE_RUNTIME_PRIMARY_SCOPE_CANDIDATE
      : null,
  );
  enqueueScope(typeof globalThis !== 'undefined' ? globalThis : null);
  enqueueScope(typeof window !== 'undefined' ? window : null);
  enqueueScope(typeof self !== 'undefined' ? self : null);
  enqueueScope(typeof global !== 'undefined' ? global : null);

  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope) continue;

    try {
      scope.devices = normalizedDevices;
    } catch (assignError) {
      void assignError;

      try {
        Object.defineProperty(scope, 'devices', {
          configurable: true,
          writable: true,
          value: normalizedDevices,
        });
      } catch (defineError) {
        void defineError;
      }
    }

    try {
      const shared = scope.CORE_SHARED || scope.cineCoreShared;
      if (shared && typeof shared === 'object') {
        shared.devices = normalizedDevices;
        if (typeof shared.updateDevices === 'function') {
          try {
            shared.updateDevices(normalizedDevices);
          } catch (updateError) {
            void updateError;
          }
        }
      }
    } catch (sharedError) {
      void sharedError;
    }

    if (scope && scope.global && scope.global !== scope) {
      enqueueScope(scope.global);
    }

    const runtimeState = scope.__cineRuntimeState;
    if (runtimeState && typeof runtimeState === 'object') {
      try {
        runtimeState.devices = normalizedDevices;
      } catch (runtimeError) {
        void runtimeError;
      }
    }
  }

  const globalCoreShared =
    (typeof CORE_SHARED !== 'undefined' && CORE_SHARED)
    || (AUTO_GEAR_NORMALIZER_SCOPE && AUTO_GEAR_NORMALIZER_SCOPE.CORE_SHARED)
    || (AUTO_GEAR_NORMALIZER_SCOPE && AUTO_GEAR_NORMALIZER_SCOPE.cineCoreShared)
    || null;

  if (globalCoreShared && typeof globalCoreShared === 'object') {
    try {
      globalCoreShared.devices = normalizedDevices;
      if (typeof globalCoreShared.updateDevices === 'function') {
        globalCoreShared.updateDevices(normalizedDevices);
      }
    } catch (sharedAssignError) {
      void sharedAssignError;
    }
  }

  if (
    typeof module !== 'undefined'
    && module
    && typeof module.exports === 'object'
    && module.exports
  ) {
    try {
      module.exports.devices = normalizedDevices;
    } catch (moduleError) {
      void moduleError;
    }
  }

  return normalizedDevices;
}

function resolveTripodPreferenceSelect(type) {
  if (typeof document === 'undefined') return null;
  const id = AUTO_GEAR_TRIPOD_FIELD_IDS[type];
  if (!id) return null;
  return document.getElementById(id);
}

function collectTripodPreferenceOptions(type) {
  if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type)) return [];
  const select = resolveTripodPreferenceSelect(type);
  if (!select || !select.options) return [];
  const options = Array.from(select.options);
  const seen = new Set();
  const results = [];
  options.forEach(option => {
    if (!option) return;
    const value = typeof option.value === 'string' ? option.value.trim() : '';
    const label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
    const storeValue = value || label;
    if (!storeValue) return;
    const dedupeKey = storeValue.toLowerCase();
    if (seen.has(dedupeKey)) return;
    seen.add(dedupeKey);
    results.push({ value: storeValue, label: label || storeValue });
  });
  return results;
}

function getAutoGearSelectorOptions(type, itemOrContext) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  const catalog = resolveDevicesSnapshot();

  if (!catalog || typeof catalog !== 'object') {
    return [];
  }

  if (normalizedType === 'monitor') {
    const monitorDb = catalog && catalog.monitors ? catalog.monitors : null;
    if (!monitorDb || typeof monitorDb !== 'object') return [];
    return Object.keys(monitorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  if (normalizedType === 'directorMonitor') {
    const directorDb = catalog && catalog.directorMonitors ? catalog.directorMonitors : null;
    if (!directorDb || typeof directorDb !== 'object') return [];
    return Object.keys(directorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  if (normalizedType === 'fizHandUnit') {
    const groups = typeof AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object'
      ? AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS
      : (typeof globalThis !== 'undefined' && typeof globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS === 'object'
        ? globalThis.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS
        : Object.create(null));
    const motorMap = typeof AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object'
      ? AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP
      : (typeof globalThis !== 'undefined' && typeof globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP === 'object'
        ? globalThis.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP
        : Object.create(null));
    let contextValue = '';
    if (itemOrContext && typeof itemOrContext === 'object') {
      const context = itemOrContext.selectorContext || itemOrContext.context;
      if (typeof context === 'string') {
        contextValue = context.trim();
      }
    } else if (typeof itemOrContext === 'string') {
      contextValue = itemOrContext.trim();
    }
    let group = null;
    if (contextValue) {
      group = groups[contextValue] || null;
      if (!group) {
        const normalizedContext = normalizeAutoGearTriggerValue(contextValue);
        if (normalizedContext) {
          if (groups[normalizedContext]) {
            group = groups[normalizedContext];
          } else if (motorMap[normalizedContext] && groups[motorMap[normalizedContext]]) {
            group = groups[motorMap[normalizedContext]];
          }
        }
      }
    }
    if (group && Array.isArray(group.options)) {
      return group.options.slice();
    }
    const fallback = [];
    Object.values(groups).forEach(entry => {
      if (!entry || !Array.isArray(entry.options)) return;
      entry.options.forEach(option => {
        if (!option || fallback.includes(option)) return;
        fallback.push(option);
      });
    });
    return fallback;
  }
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
    return collectTripodPreferenceOptions(normalizedType).map(option => option.value);
  }
  return [];
}

function getAutoGearSelectorLabel(type) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  const langTexts = getLanguageTexts(currentLang);
  const fallbackTexts = getAutoGearFallbackTexts();
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
  const langTexts = getLanguageTexts(currentLang);
  const fallbackTexts = getAutoGearFallbackTexts();
  return langTexts.autoGearSelectorScrollHint
    || fallbackTexts.autoGearSelectorScrollHint
    || 'Scroll to see more devices.';
}

function getAutoGearSelectorDefaultPlaceholder() {
  const langTexts = getLanguageTexts(currentLang);
  const fallbackTexts = getAutoGearFallbackTexts();
  return langTexts.autoGearSelectorDefaultPlaceholder
    || fallbackTexts.autoGearSelectorDefaultPlaceholder
    || 'Choose a default device';
}

function getAutoGearMonitorDefaultPlaceholder() {
  const langTexts = getLanguageTexts(currentLang);
  const fallbackTexts = getAutoGearFallbackTexts();
  return langTexts.autoGearMonitorDefaultPlaceholder
    || fallbackTexts.autoGearMonitorDefaultPlaceholder
    || 'Use recommended automatically';
}

function formatAutoGearSelectorValue(type, value) {
  const normalizedValue = typeof value === 'string' ? value.trim() : '';
  if (!normalizedValue) return '';
  const normalizedType = normalizeAutoGearSelectorType(type);
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
    const options = collectTripodPreferenceOptions(normalizedType);
    const match = options.find(option => option.value.toLowerCase() === normalizedValue.toLowerCase());
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
  if (!select) return;

  const current = typeof currentValue === 'string' ? currentValue : '';
  const lang = typeof currentLang === 'string' ? currentLang : 'en';

  select.innerHTML = '';

  GEAR_LIST_CATEGORIES.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    if (current === category) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  const customOption = document.createElement('option');
  customOption.value = AUTO_GEAR_CUSTOM_CATEGORY;
  customOption.textContent = texts?.[lang]?.autoGearCustomCategory
    || texts?.en?.autoGearCustomCategory
    || 'Custom Additions';
  if (!current || current === AUTO_GEAR_CUSTOM_CATEGORY) {
    customOption.selected = true;
  }
  select.appendChild(customOption);
}

function formatAutoGearOwnGearLabel(item) {
  if (!item || typeof item.name !== 'string') return '';
  const quantityValue = typeof item?.quantity === 'number'
    ? String(item.quantity)
    : item?.quantity;
  const quantityText = formatOwnGearQuantityText(quantityValue);
  if (quantityText) {
    return `${item.name} (${quantityText})`;
  }
  return item.name;
}

function refreshAutoGearOwnGearConditionOptions(selected) {
  if (!autoGearOwnGearSelect) return;

  const selectedValues = Array.isArray(selected)
    ? selected
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean)
    : collectAutoGearSelectedValues(selected, 'ownGear');

  autoGearOwnGearSelect.innerHTML = '';
  autoGearOwnGearSelect.multiple = true;

  const items = getAutoGearOwnGearItems();
  const seen = new Set();

  const appendOption = (id, label, options = {}) => {
    if (typeof id !== 'string') return;
    const trimmedId = id.trim();
    if (!trimmedId || seen.has(trimmedId)) return;
    const option = document.createElement('option');
    option.value = trimmedId;
    option.textContent = label || trimmedId;
    if (options.dataset && option.dataset) {
      Object.entries(options.dataset).forEach(([key, value]) => {
        if (value == null) return;
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

  items.forEach(item => {
    if (!item || typeof item.id !== 'string') return;
    const trimmedId = item.id.trim();
    if (!trimmedId) return;
    const dataset = {};
    if (typeof item.name === 'string' && item.name) {
      dataset.name = item.name;
    }
    const formattedQuantity = formatOwnGearQuantityText(item.quantity);
    if (formattedQuantity) {
      dataset.quantity = formattedQuantity;
    }
    if (typeof item.notes === 'string' && item.notes) {
      dataset.notes = item.notes;
    }
    appendOption(trimmedId, formatAutoGearOwnGearLabel(item) || item.name || trimmedId, { dataset });
  });

  selectedValues.forEach(value => {
    if (!value || seen.has(value)) return;
    const record = typeof findAutoGearOwnGearById === 'function'
      ? findAutoGearOwnGearById(value)
      : null;
    const label = record?.name || value;
    appendOption(value, label, { fallback: true });
  });

  const selectableOptions = Array.from(autoGearOwnGearSelect.options || []).filter(option => !option.disabled);
  autoGearOwnGearSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
  const hasSelectable = selectableOptions.some(option => option.dataset.autoGearFallback !== 'true');
  autoGearOwnGearSelect.disabled = !hasSelectable && selectedValues.length === 0;
}

function updateAutoGearOwnGearOptions() {
  const selects = [autoGearAddOwnGearSelect, autoGearRemoveOwnGearSelect].filter(Boolean);
  if (!selects.length) return;
  const items = getAutoGearOwnGearItems();
  selects.forEach(select => {
    if (!select) return;
    const currentValue = select.value || '';
    const placeholder = select.getAttribute('data-placeholder')
      || texts[currentLang]?.autoGearOwnGearPlaceholder
      || texts.en?.autoGearOwnGearPlaceholder
      || 'Manual entry';
    select.innerHTML = '';
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);
    items.forEach(item => {
      if (!item || typeof item.id !== 'string' || !item.id || typeof item.name !== 'string') return;
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = formatAutoGearOwnGearLabel(item) || item.name;
      option.dataset.name = item.name;
      if (item.notes) option.dataset.notes = item.notes;
      if (item.source) option.dataset.source = item.source;
      const formattedQuantity = formatOwnGearQuantityText(item.quantity);
      if (formattedQuantity) option.dataset.quantity = formattedQuantity;
      if (item.id === currentValue) option.selected = true;
      select.appendChild(option);
    });
    if (currentValue && select.value !== currentValue) {
      if (select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
      } else {
        select.value = '';
      }
    }
    select.disabled = items.length === 0;
  });

  refreshAutoGearOwnGearConditionOptions(Array.isArray(autoGearEditorDraft?.ownGear)
    ? autoGearEditorDraft.ownGear
    : undefined);
}

function isAutoGearMonitoringCategory(value) {
  if (typeof value !== 'string') return false;
  return value.trim().toLowerCase() === 'monitoring';
}

function isMonitoringCategorySelected(select) {
  if (!select) return false;
  const directValue = typeof select.value === 'string' ? select.value : '';
  if (isAutoGearMonitoringCategory(directValue)) {
    return true;
  }
  const option = select.options?.[select.selectedIndex] || null;
  if (!option) return false;
  const optionValue = typeof option.value === 'string' ? option.value : '';
  if (isAutoGearMonitoringCategory(optionValue)) {
    return true;
  }
  const optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
  return isAutoGearMonitoringCategory(optionLabel);
}

function matchesTripodCategory(value) {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!normalized) return false;
  if (normalized === 'camera support') return true;
  if (normalized === 'grip') return true;
  return normalized.includes('tripod');
}

function isTripodCategorySelected(select) {
  if (!select) return false;
  const directValue = typeof select.value === 'string' ? select.value : '';
  if (matchesTripodCategory(directValue)) return true;
  const option = select.options?.[select.selectedIndex] || null;
  if (!option) return false;
  if (matchesTripodCategory(option.value)) return true;
  const optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
  return matchesTripodCategory(optionLabel);
}

function setAutoGearFieldVisibility(field, isVisible) {
  if (!field) return;
  if (isVisible) {
    field.hidden = false;
    field.removeAttribute('hidden');
    field.removeAttribute('aria-hidden');
    if (Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
      const storedDisplay = field.dataset.autoGearHiddenDisplay;
      if (storedDisplay) {
        field.style.display = storedDisplay;
      } else {
        field.style.removeProperty('display');
      }
      delete field.dataset.autoGearHiddenDisplay;
    } else if (field.style.display === 'none') {
      field.style.removeProperty('display');
    }
  } else {
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
  if (!group || !group.select) return;
  const {
    select,
    screenSizeField,
    screenSizeInput,
    selectorTypeField,
    selectorTypeSelect,
    selectorDefaultField,
    selectorDefaultInput,
  } = group;
  const isMonitoring = isMonitoringCategorySelected(select);
  const isTripod = isTripodCategorySelected(select);
  const showScreenSize = isMonitoring;
  const showSelectorFields = isMonitoring || isTripod;
  setAutoGearFieldVisibility(screenSizeField, showScreenSize);
  setAutoGearFieldVisibility(selectorTypeField, showSelectorFields);
  setAutoGearFieldVisibility(selectorDefaultField, showSelectorFields);
  if (!showScreenSize && screenSizeInput) {
    screenSizeInput.value = '';
  }
  if (!showSelectorFields) {
    if (selectorTypeSelect) selectorTypeSelect.value = 'none';
    if (selectorDefaultInput) {
      selectorDefaultInput.value = '';
      if (Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset || {}, 'autoGearPreferredDefault')) {
        delete selectorDefaultInput.dataset.autoGearPreferredDefault;
      }
    }
  }
}

function extractAutoGearContextNotes(name) {
  const contexts = [];
  if (!name || typeof name !== 'string') {
    return { baseName: '', contexts };
  }
  let baseName = name.trim();
  const contextPattern = /^(.*\([^()]*\)) \(([^()]+)\)$/;
  let match = baseName.match(contextPattern);
  while (match) {
    const candidate = match[2].trim();
    if (/handheld\b/i.test(candidate) || /15-21"?$/.test(candidate)) {
      contexts.unshift(candidate);
      baseName = match[1].trim();
    } else {
      break;
    }
    match = baseName.match(contextPattern);
  }
  return { baseName, contexts };
}

function normalizeAutoGearItem(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const requestedName = normalizeAutoGearText(entry.name);
  const ownGearSourceId = typeof entry.ownGearId === 'string' ? entry.ownGearId.trim() : '';
  const ownGearFallbackLabel = normalizeAutoGearText(entry.ownGearLabel);
  const ownGearNameInput = normalizeAutoGearText(entry.ownGearName);
  let ownGearRecord = null;
  if (ownGearSourceId) {
    ownGearRecord = findAutoGearOwnGearById(ownGearSourceId) || null;
  }
  const rawName = ownGearRecord?.name
    || ownGearNameInput
    || requestedName;
  if (!rawName) return null;
  const { baseName, contexts } = extractAutoGearContextNotes(requestedName || rawName);
  let name = baseName || rawName;
  const storedContexts = Array.isArray(entry.contextNotes)
    ? entry.contextNotes.filter(value => typeof value === 'string' && value.trim())
    : [];
  storedContexts.forEach(note => {
    const trimmed = note.trim();
    if (!trimmed) return;
    if (!contexts.includes(trimmed)) contexts.push(trimmed);
  });
  const category = normalizeAutoGearText(entry.category);
  const quantity = normalizeAutoGearQuantity(entry.quantity);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
  const screenSize = normalizeAutoGearText(entry.screenSize);
  const selectorType = normalizeAutoGearSelectorType(entry.selectorType);
  const selectorContext = typeof entry.selectorContext === 'string'
    ? entry.selectorContext.trim()
    : '';
  const selectorDefault = normalizeAutoGearSelectorDefault(
    selectorType,
    entry.selectorDefault,
    selectorContext
  );
  let selectorEnabled = !!entry.selectorEnabled;
  if (selectorType === 'none') {
    selectorEnabled = false;
  } else if (isAutoGearMonitoringCategory(category)) {
    selectorEnabled = true;
  }
  let notes = normalizeAutoGearText(entry.notes);
  let ownGearId = '';
  let ownGearLabel = '';
  if (ownGearRecord) {
    ownGearId = ownGearRecord.id;
    ownGearLabel = ownGearRecord.name || '';
    name = ownGearRecord.name || name;
    if (!notes && typeof ownGearRecord.notes === 'string') {
      const trimmedNotes = normalizeAutoGearText(ownGearRecord.notes);
      if (trimmedNotes) notes = trimmedNotes;
    }
  } else if (ownGearSourceId) {
    ownGearId = ownGearSourceId;
    ownGearLabel = ownGearFallbackLabel || ownGearNameInput || name;
  }
  return {
    id,
    name,
    category,
    quantity,
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    selectorContext,
    notes,
    contextNotes: contexts,
    ownGearId,
    ownGearLabel,
  };
}

function normalizeAutoGearTriggerList(values) {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values
    .map(value => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)));
}

const AUTO_GEAR_SCENARIO_LOGIC_VALUES = new Set(['all', 'any', 'multiplier']);

function normalizeAutoGearScenarioLogic(value) {
  if (typeof value !== 'string') return 'all';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'any';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
  if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
    return 'multiplier';
  }
  return AUTO_GEAR_SCENARIO_LOGIC_VALUES.has(normalized) ? normalized : 'all';
}

const AUTO_GEAR_CONDITION_LOGIC_VALUES = new Set(['all', 'any', 'or', 'none', 'multiplier']);
const AUTO_GEAR_CONDITION_LOGIC_FIELDS = {
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
  if (typeof value !== 'string') return 'all';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'or';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
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
  if (!rule || typeof rule !== 'object') return 'all';
  const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
  let raw;
  if (property && Object.prototype.hasOwnProperty.call(rule, property)) {
    raw = rule[property];
  }
  if (raw == null) {
    const alias = `${key}Mode`;
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
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num > 1 ? num : 1;
}

function normalizeAutoGearScenarioPrimary(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeVideoDistributionTriggerList(values) {
  if (!Array.isArray(values)) return [];
  const base = normalizeAutoGearTriggerList(values);
  const seen = new Set();
  const result = [];
  base.forEach(value => {
    const lower = value.toLowerCase();
    const normalized = lower === '__none__' || lower === 'none'
      ? '__none__'
      : value;
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    result.push(normalized);
  });
  return result;
}

function normalizeAutoGearTriggerValue(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function autoGearRuleMatteboxKey(rule) {
  if (!rule || typeof rule !== 'object') return '';
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
  if (!matteboxList.length) return '';
  return matteboxList
    .map(normalizeAutoGearTriggerValue)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('|');
}

const AUTO_GEAR_SHOOTING_DAY_MODES = new Set(['minimum', 'maximum', 'every']);

function normalizeAutoGearShootingDayMode(value) {
  if (typeof value !== 'string') return 'minimum';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'minimum';
  if (AUTO_GEAR_SHOOTING_DAY_MODES.has(normalized)) return normalized;
  if (normalized === 'min' || normalized === 'at least') return 'minimum';
  if (normalized === 'max' || normalized === 'at most') return 'maximum';
  if (normalized === 'each' || normalized === 'every') return 'every';
  return 'minimum';
}

function normalizeAutoGearShootingDayValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const rounded = Math.round(value);
    return rounded > 0 ? rounded : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number.parseInt(trimmed, 10);
    if (!Number.isFinite(parsed)) return null;
    return parsed > 0 ? parsed : null;
  }
  return null;
}

function normalizeAutoGearShootingDaysList(values) {
  if (!Array.isArray(values)) return [];
  const unique = new Set();
  values.forEach(value => {
    const normalized = normalizeAutoGearShootingDayValue(value);
    if (Number.isFinite(normalized) && normalized > 0) {
      unique.add(normalized);
    }
  });
  return Array.from(unique).sort((a, b) => a - b);
}

function normalizeAutoGearShootingDaysCondition(setting) {
  if (!setting) return null;
  if (Array.isArray(setting)) {
    const values = normalizeAutoGearShootingDaysList(setting);
    if (!values.length) return null;
    const maxValue = values[values.length - 1];
    return Number.isFinite(maxValue) && maxValue > 0
      ? { mode: 'minimum', value: maxValue }
      : null;
  }
  if (typeof setting === 'object') {
    const modeSource = setting.mode
      ?? setting.type
      ?? setting.comparison
      ?? setting.condition
      ?? setting.kind;
    const mode = normalizeAutoGearShootingDayMode(modeSource);
    const valueSource = setting.value
      ?? setting.count
      ?? setting.days
      ?? setting.minimum
      ?? setting.maximum
      ?? setting.frequency;
    const value = normalizeAutoGearShootingDayValue(valueSource);
    if (Number.isFinite(value) && value > 0) {
      return { mode, value };
    }
    return null;
  }
  const normalizedValue = normalizeAutoGearShootingDayValue(setting);
  if (Number.isFinite(normalizedValue) && normalizedValue > 0) {
    return { mode: 'minimum', value: normalizedValue };
  }
  return null;
}

function normalizeAutoGearRule(rule) {
  if (!rule || typeof rule !== 'object') return null;
  const id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  let always = false;
  if (Array.isArray(rule.always)) {
    always = rule.always.some(value => {
      if (typeof value === 'string') {
        const trimmed = value.trim().toLowerCase();
        if (!trimmed) return false;
        if (trimmed === 'false' || trimmed === '0') return false;
        return true;
      }
      return Boolean(value);
    });
  } else if (typeof rule.always === 'string') {
    const trimmed = rule.always.trim().toLowerCase();
    always = trimmed === 'true' || (trimmed && trimmed !== 'false' && trimmed !== '0');
  } else {
    always = Boolean(rule.always);
  }
  let scenarios = normalizeAutoGearTriggerList(rule.scenarios);
  const scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
  let scenarioMultiplier = 1;
  let scenarioPrimary = '';
  if (scenarioLogic === 'multiplier') {
    scenarioMultiplier = normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier);
    const requestedPrimary = normalizeAutoGearScenarioPrimary(rule.scenarioPrimary);
    const normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
    if (normalizedPrimary) {
      const matched = scenarios.find(value => normalizeAutoGearTriggerValue(value) === normalizedPrimary);
      if (matched) {
        scenarioPrimary = matched;
      } else if (requestedPrimary) {
        scenarioPrimary = requestedPrimary;
        scenarios.push(requestedPrimary);
      }
    }
    if (!scenarioPrimary && scenarios.length) {
      scenarioPrimary = scenarios[0];
    }
  }
  scenarios = scenarios.sort((a, b) => a.localeCompare(b));
  if (scenarioLogic === 'multiplier' && scenarioPrimary) {
    const normalizedPrimary = normalizeAutoGearTriggerValue(scenarioPrimary);
    const hasPrimary = scenarios.some(value => normalizeAutoGearTriggerValue(value) === normalizedPrimary);
    if (!hasPrimary) {
      scenarios.push(scenarioPrimary);
      scenarios.sort((a, b) => a.localeCompare(b));
    }
  }
  const mattebox = normalizeAutoGearTriggerList(rule.mattebox).sort((a, b) => a.localeCompare(b));
  const cameraHandle = normalizeAutoGearTriggerList(rule.cameraHandle).sort((a, b) => a.localeCompare(b));
  const viewfinderExtension = normalizeAutoGearTriggerList(rule.viewfinderExtension).sort((a, b) => a.localeCompare(b));
  const deliveryResolution = normalizeAutoGearTriggerList(rule.deliveryResolution).sort((a, b) => a.localeCompare(b));
  const videoDistribution = normalizeVideoDistributionTriggerList(rule.videoDistribution)
    .sort((a, b) => a.localeCompare(b));
  const camera = normalizeAutoGearTriggerList(rule.camera).sort((a, b) => a.localeCompare(b));
  const ownGear = normalizeAutoGearTriggerList(rule.ownGear).sort((a, b) => a.localeCompare(b));
  const cameraWeight = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
  const monitor = normalizeAutoGearTriggerList(rule.monitor).sort((a, b) => a.localeCompare(b));
  const tripodHeadBrand = normalizeAutoGearTriggerList(rule.tripodHeadBrand).sort((a, b) => a.localeCompare(b));
  const tripodBowl = normalizeAutoGearTriggerList(rule.tripodBowl).sort((a, b) => a.localeCompare(b));
  const tripodTypes = normalizeAutoGearTriggerList(rule.tripodTypes).sort((a, b) => a.localeCompare(b));
  const tripodSpreader = normalizeAutoGearTriggerList(rule.tripodSpreader).sort((a, b) => a.localeCompare(b));
  const crewPresent = normalizeAutoGearTriggerList(rule.crewPresent).sort((a, b) => a.localeCompare(b));
  const crewAbsent = normalizeAutoGearTriggerList(rule.crewAbsent).sort((a, b) => a.localeCompare(b));
  const wireless = normalizeAutoGearTriggerList(rule.wireless).sort((a, b) => a.localeCompare(b));
  const motors = normalizeAutoGearTriggerList(rule.motors).sort((a, b) => a.localeCompare(b));
  const controllers = normalizeAutoGearTriggerList(rule.controllers).sort((a, b) => a.localeCompare(b));
  const distance = normalizeAutoGearTriggerList(rule.distance).sort((a, b) => a.localeCompare(b));
  const shootingDays = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
  const matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
  const cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
  const viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
  const deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
  const videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
  const cameraLogic = readAutoGearConditionLogic(rule, 'camera');
  const ownGearLogic = readAutoGearConditionLogic(rule, 'ownGear');
  const monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
  const tripodHeadBrandLogic = readAutoGearConditionLogic(rule, 'tripodHeadBrand');
  const tripodBowlLogic = readAutoGearConditionLogic(rule, 'tripodBowl');
  const tripodTypesLogic = readAutoGearConditionLogic(rule, 'tripodTypes');
  const tripodSpreaderLogic = readAutoGearConditionLogic(rule, 'tripodSpreader');
  const crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
  const crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
  const wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
  const motorsLogic = readAutoGearConditionLogic(rule, 'motors');
  const controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
  const distanceLogic = readAutoGearConditionLogic(rule, 'distance');
  const conditionLogic = {};
  if (scenarioLogic && scenarioLogic !== 'all') {
    conditionLogic.scenarios = scenarioLogic;
  }
  if (matteboxLogic && matteboxLogic !== 'all') conditionLogic.mattebox = matteboxLogic;
  if (cameraHandleLogic && cameraHandleLogic !== 'all') conditionLogic.cameraHandle = cameraHandleLogic;
  if (viewfinderExtensionLogic && viewfinderExtensionLogic !== 'all') {
    conditionLogic.viewfinderExtension = viewfinderExtensionLogic;
  }
  if (deliveryResolutionLogic && deliveryResolutionLogic !== 'all') {
    conditionLogic.deliveryResolution = deliveryResolutionLogic;
  }
  if (videoDistributionLogic && videoDistributionLogic !== 'all') {
    conditionLogic.videoDistribution = videoDistributionLogic;
  }
  if (cameraLogic && cameraLogic !== 'all') conditionLogic.camera = cameraLogic;
  if (ownGearLogic && ownGearLogic !== 'all') conditionLogic.ownGear = ownGearLogic;
  if (monitorLogic && monitorLogic !== 'all') conditionLogic.monitor = monitorLogic;
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
  if (crewPresentLogic && crewPresentLogic !== 'all') conditionLogic.crewPresent = crewPresentLogic;
  if (crewAbsentLogic && crewAbsentLogic !== 'all') conditionLogic.crewAbsent = crewAbsentLogic;
  if (wirelessLogic && wirelessLogic !== 'all') conditionLogic.wireless = wirelessLogic;
  if (motorsLogic && motorsLogic !== 'all') conditionLogic.motors = motorsLogic;
  if (controllersLogic && controllersLogic !== 'all') conditionLogic.controllers = controllersLogic;
  if (distanceLogic && distanceLogic !== 'all') conditionLogic.distance = distanceLogic;
  if (
    !always &&
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
    && !distance.length
  ) return null;
  const add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
  const remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
  if (!add.length && !remove.length) return null;
  return {
    id,
    label,
    always,
    scenarioLogic,
    scenarioPrimary,
    scenarioMultiplier,
    scenarios,
    mattebox,
    cameraHandle,
    viewfinderExtension,
    deliveryResolution,
    videoDistribution,
    camera,
    ownGear,
    cameraWeight,
    monitor,
    tripodHeadBrand,
    tripodBowl,
    tripodTypes,
    tripodSpreader,
    crewPresent,
    crewAbsent,
    wireless,
    motors,
    controllers,
    distance,
    shootingDays,
    matteboxLogic,
    cameraHandleLogic,
    viewfinderExtensionLogic,
    deliveryResolutionLogic,
    videoDistributionLogic,
    cameraLogic,
    ownGearLogic,
    monitorLogic,
    tripodHeadBrandLogic,
    tripodBowlLogic,
    tripodTypesLogic,
    tripodSpreaderLogic,
    crewPresentLogic,
    crewAbsentLogic,
    wirelessLogic,
    motorsLogic,
    controllersLogic,
    distanceLogic,
    conditionLogic,
    add,
    remove,
  };
}

function autoGearItemSnapshot(item) {
  const normalized = normalizeAutoGearItem(item);
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
  const {
    name,
    category,
    quantity,
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
    ownGearId,
    ownGearLabel,
  } = normalized;
  return {
    name,
    category,
    quantity: normalizeAutoGearQuantity(quantity),
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
    ownGearId,
    ownGearLabel,
  };
}

function autoGearItemSortKey(item) {
  const snapshot = autoGearItemSnapshot(item);
  const name = snapshot.name || '';
  const category = snapshot.category || '';
  const quantity = normalizeAutoGearQuantity(snapshot.quantity);
  const screenSize = snapshot.screenSize || '';
  const selectorType = snapshot.selectorType || 'none';
  const selectorDefault = snapshot.selectorDefault || '';
  const selectorEnabled = snapshot.selectorEnabled ? '1' : '0';
  const notes = snapshot.notes || '';
  const ownGearId = snapshot.ownGearId || '';
  const ownGearLabel = snapshot.ownGearLabel || '';
  return `${name}|${category}|${quantity}|${screenSize}|${selectorType}|${selectorEnabled}|${selectorDefault}|${notes}|${ownGearId}|${ownGearLabel}`;
}

function snapshotAutoGearRuleForFingerprint(rule) {
  const normalized = normalizeAutoGearRule(rule);
  if (!normalized) return null;
  const mapItems = items => items
    .map(autoGearItemSnapshot)
    .sort((a, b) => autoGearItemSortKey(a).localeCompare(autoGearItemSortKey(b)));
  return {
    label: normalized.label || '',
    always: normalized.always ? 1 : 0,
    scenarios: normalized.scenarios.slice().sort((a, b) => a.localeCompare(b)),
    mattebox: normalized.mattebox.slice().sort((a, b) => a.localeCompare(b)),
    cameraHandle: normalized.cameraHandle.slice().sort((a, b) => a.localeCompare(b)),
    viewfinderExtension: normalized.viewfinderExtension.slice().sort((a, b) => a.localeCompare(b)),
    deliveryResolution: normalized.deliveryResolution.slice().sort((a, b) => a.localeCompare(b)),
    videoDistribution: normalized.videoDistribution.slice().sort((a, b) => a.localeCompare(b)),
    camera: normalized.camera.slice().sort((a, b) => a.localeCompare(b)),
    cameraWeight: normalized.cameraWeight
      ? { operator: normalized.cameraWeight.operator, value: normalized.cameraWeight.value }
      : null,
    monitor: normalized.monitor.slice().sort((a, b) => a.localeCompare(b)),
    tripodHeadBrand: normalized.tripodHeadBrand.slice().sort((a, b) => a.localeCompare(b)),
    tripodBowl: normalized.tripodBowl.slice().sort((a, b) => a.localeCompare(b)),
    tripodTypes: normalized.tripodTypes.slice().sort((a, b) => a.localeCompare(b)),
    tripodSpreader: normalized.tripodSpreader.slice().sort((a, b) => a.localeCompare(b)),
    crewPresent: normalized.crewPresent.slice().sort((a, b) => a.localeCompare(b)),
    crewAbsent: normalized.crewAbsent.slice().sort((a, b) => a.localeCompare(b)),
    wireless: normalized.wireless.slice().sort((a, b) => a.localeCompare(b)),
    motors: normalized.motors.slice().sort((a, b) => a.localeCompare(b)),
    controllers: normalized.controllers.slice().sort((a, b) => a.localeCompare(b)),
    distance: normalized.distance.slice().sort((a, b) => a.localeCompare(b)),
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
      ? Object.keys(normalized.conditionLogic).reduce((acc, key) => {
        acc[key] = normalizeAutoGearConditionLogic(normalized.conditionLogic[key]);
        return acc;
      }, {})
      : {},
    add: mapItems(normalized.add),
    remove: mapItems(normalized.remove),
  };
}

function autoGearRuleSortKey(rule) {
  const alwaysKey = rule && rule.always ? '1' : '0';
  const scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
  const matteboxKey = Array.isArray(rule.mattebox) ? rule.mattebox.join('|') : '';
  const cameraHandleKey = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.join('|') : '';
  const viewfinderKey = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.join('|') : '';
  const deliveryResolutionKey = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.join('|') : '';
  const videoDistributionKey = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.join('|') : '';
  const cameraKey = Array.isArray(rule.camera) ? rule.camera.join('|') : '';
  const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule?.cameraWeight);
  const cameraWeightKey = cameraWeightCondition
    ? `${cameraWeightCondition.operator}:${cameraWeightCondition.value}`
    : '';
  const monitorKey = Array.isArray(rule.monitor) ? rule.monitor.join('|') : '';
  const tripodHeadBrandKey = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.join('|') : '';
  const tripodBowlKey = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.join('|') : '';
  const tripodTypesKey = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.join('|') : '';
  const tripodSpreaderKey = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.join('|') : '';
  const crewPresentKey = Array.isArray(rule.crewPresent) ? rule.crewPresent.join('|') : '';
  const crewAbsentKey = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.join('|') : '';
  const wirelessKey = Array.isArray(rule.wireless) ? rule.wireless.join('|') : '';
  const motorsKey = Array.isArray(rule.motors) ? rule.motors.join('|') : '';
  const controllersKey = Array.isArray(rule.controllers) ? rule.controllers.join('|') : '';
  const distanceKey = Array.isArray(rule.distance) ? rule.distance.join('|') : '';
  const shootingDaysCondition = normalizeAutoGearShootingDaysCondition(rule?.shootingDays);
  const shootingDaysKey = shootingDaysCondition
    ? `${shootingDaysCondition.mode}:${shootingDaysCondition.value}`
    : '';
  const matteboxLogicKey = normalizeAutoGearConditionLogic(rule?.matteboxLogic);
  const cameraHandleLogicKey = normalizeAutoGearConditionLogic(rule?.cameraHandleLogic);
  const viewfinderLogicKey = normalizeAutoGearConditionLogic(rule?.viewfinderExtensionLogic);
  const deliveryResolutionLogicKey = normalizeAutoGearConditionLogic(rule?.deliveryResolutionLogic);
  const videoDistributionLogicKey = normalizeAutoGearConditionLogic(rule?.videoDistributionLogic);
  const cameraLogicKey = normalizeAutoGearConditionLogic(rule?.cameraLogic);
  const monitorLogicKey = normalizeAutoGearConditionLogic(rule?.monitorLogic);
  const tripodHeadBrandLogicKey = normalizeAutoGearConditionLogic(rule?.tripodHeadBrandLogic);
  const tripodBowlLogicKey = normalizeAutoGearConditionLogic(rule?.tripodBowlLogic);
  const tripodTypesLogicKey = normalizeAutoGearConditionLogic(rule?.tripodTypesLogic);
  const tripodSpreaderLogicKey = normalizeAutoGearConditionLogic(rule?.tripodSpreaderLogic);
  const crewPresentLogicKey = normalizeAutoGearConditionLogic(rule?.crewPresentLogic);
  const crewAbsentLogicKey = normalizeAutoGearConditionLogic(rule?.crewAbsentLogic);
  const wirelessLogicKey = normalizeAutoGearConditionLogic(rule?.wirelessLogic);
  const motorsLogicKey = normalizeAutoGearConditionLogic(rule?.motorsLogic);
  const controllersLogicKey = normalizeAutoGearConditionLogic(rule?.controllersLogic);
  const distanceLogicKey = normalizeAutoGearConditionLogic(rule?.distanceLogic);
  const addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
  const removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
  return `${alwaysKey}|${scenarioKey}|${matteboxKey}|${cameraHandleKey}|${viewfinderKey}|${deliveryResolutionKey}|${videoDistributionKey}|${cameraKey}|${cameraWeightKey}|${monitorKey}|${tripodHeadBrandKey}|${tripodBowlKey}|${tripodTypesKey}|${tripodSpreaderKey}|${crewPresentKey}|${crewAbsentKey}|${wirelessKey}|${motorsKey}|${controllersKey}|${distanceKey}|${shootingDaysKey}|${matteboxLogicKey}|${cameraHandleLogicKey}|${viewfinderLogicKey}|${deliveryResolutionLogicKey}|${videoDistributionLogicKey}|${cameraLogicKey}|${monitorLogicKey}|${tripodHeadBrandLogicKey}|${tripodBowlLogicKey}|${tripodTypesLogicKey}|${tripodSpreaderLogicKey}|${crewPresentLogicKey}|${crewAbsentLogicKey}|${wirelessLogicKey}|${motorsLogicKey}|${controllersLogicKey}|${distanceLogicKey}|${rule.label || ''}|${addKey}|${removeKey}`;
}

function createAutoGearRulesFingerprint(rules) {
  const snapshot = (Array.isArray(rules) ? rules : [])
    .map(snapshotAutoGearRuleForFingerprint)
    .filter(Boolean)
    .sort((a, b) => autoGearRuleSortKey(a).localeCompare(autoGearRuleSortKey(b)));
  return stableStringify(snapshot);
}

function normalizeAutoGearPreset(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!label) return null;
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const rules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('preset');
  const fingerprint = createAutoGearRulesFingerprint(rules);
  return { id, label, rules, fingerprint };
}

function normalizeAutoGearBackupEntry(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const rawCreatedAt = typeof entry.createdAt === 'string' ? entry.createdAt : null;
  const timestamp = rawCreatedAt ? Date.parse(rawCreatedAt) : NaN;
  if (!Number.isFinite(timestamp)) return null;
  const createdAt = new Date(timestamp).toISOString();
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const normalizedRules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const rules = rawRules.length === 0 ? [] : normalizedRules;
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('backup');
  const monitorDefaults = normalizeAutoGearMonitorDefaults(entry.monitorDefaults);
  const note = typeof entry.note === 'string' ? entry.note : '';
  return { id, createdAt, rules, monitorDefaults, note };
}

const AUTO_GEAR_NORMALIZER_EXPORTS = {
  generateAutoGearId,
  normalizeAutoGearQuantity,
  parseAutoGearDraftNames,
  normalizeAutoGearText,
  normalizeAutoGearSelectorType,
  normalizeAutoGearSelectorDefault,
  resolveDevicesSnapshot,
  updateGlobalDevicesReference,
  resolveTripodPreferenceSelect,
  collectTripodPreferenceOptions,
  getAutoGearSelectorOptions,
  getAutoGearSelectorLabel,
  getAutoGearSelectorScrollHint,
  getAutoGearSelectorDefaultPlaceholder,
  getAutoGearMonitorDefaultPlaceholder,
  formatAutoGearSelectorValue,
  populateAutoGearCategorySelect,
  formatAutoGearOwnGearLabel,
  refreshAutoGearOwnGearConditionOptions,
  updateAutoGearOwnGearOptions,
  isAutoGearMonitoringCategory,
  isMonitoringCategorySelected,
  matchesTripodCategory,
  isTripodCategorySelected,
  setAutoGearFieldVisibility,
  updateAutoGearMonitorFieldGroup,
  extractAutoGearContextNotes,
  normalizeAutoGearItem,
  normalizeAutoGearTriggerList,
  normalizeAutoGearScenarioLogic,
  normalizeAutoGearConditionLogic,
  readAutoGearConditionLogic,
  normalizeAutoGearScenarioMultiplier,
  normalizeAutoGearScenarioPrimary,
  normalizeVideoDistributionTriggerList,
  normalizeAutoGearTriggerValue,
  normalizeAutoGearShootingDayMode,
  normalizeAutoGearShootingDayValue,
  normalizeAutoGearShootingDaysList,
  normalizeAutoGearShootingDaysCondition,
  normalizeAutoGearRule,
  autoGearItemSnapshot,
  autoGearItemSortKey,
  autoGearRuleMatteboxKey,
  snapshotAutoGearRuleForFingerprint,
  autoGearRuleSortKey,
  createAutoGearRulesFingerprint,
  normalizeAutoGearPreset,
  normalizeAutoGearBackupEntry,
  normalizeAutoGearMonitorDefaults,
  AUTO_GEAR_MONITOR_DEFAULT_TYPES,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTO_GEAR_NORMALIZER_EXPORTS;
}

if (typeof globalThis !== 'undefined') {
  const target =
    (typeof globalThis.AUTO_GEAR_NORMALIZER_EXPORTS === 'object'
      && globalThis.AUTO_GEAR_NORMALIZER_EXPORTS)
      ? globalThis.AUTO_GEAR_NORMALIZER_EXPORTS
      : (globalThis.AUTO_GEAR_NORMALIZER_EXPORTS = {});
  Object.assign(target, AUTO_GEAR_NORMALIZER_EXPORTS);
  Object.assign(globalThis, AUTO_GEAR_NORMALIZER_EXPORTS);
  globalThis.AUTO_GEAR_MONITOR_DEFAULT_TYPES = AUTO_GEAR_MONITOR_DEFAULT_TYPES;
  globalThis.normalizeAutoGearMonitorDefaults = normalizeAutoGearMonitorDefaults;
}

