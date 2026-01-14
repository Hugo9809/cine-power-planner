/**
 * Cine Power Planner V2 - Search Module
 * ====================================
 * Powers the V2 sidebar search with a dedicated index built from
 * legacy feature search data, device manifests, and shared normalization.
 */

import featureSearchNormalization from '../modules/features/feature-search-normalization.js';
import devicesCatalog from '../../data/devices/index.js';

const V2_SEARCH_FLAG = 'cine_use_v2_search';
const MAX_RESULTS = 40;

const DEFAULT_CATEGORY_LABELS = {
    cameras: 'Cameras',
    monitors: 'Monitors',
    video: 'Video',
    fiz: 'FIZ',
    batteries: 'Batteries',
    batteryHotswaps: 'Battery Hot Swap',
    carts: 'Carts',
    wirelessReceivers: 'Wireless',
    audio: 'Audio',
    lights: 'Lights',
    gimbals: 'Gimbals',
    drones: 'Drones',
    actionCameras: 'Action Cameras',
    accessories: 'Accessories',
    viewfinders: 'Viewfinders',
    directorMonitors: 'Director Monitors',
    iosVideo: 'iOS Video',
    videoAssist: 'Video Assist',
    media: 'Media',
    lenses: 'Lenses',
    filterOptions: 'Filters',
    recordingMediaBrands: 'Recording Media Brands',
    recordingMediaSizes: 'Recording Media Sizes',
    gearList: 'Gear List'
};

const normalizationApi = featureSearchNormalization
    && typeof featureSearchNormalization.normalizeSearchValue === 'function'
    ? featureSearchNormalization
    : {
        normalizeSearchValue: value => (typeof value === 'string' ? value.trim().toLowerCase() : '')
    };

const safeNormalize = value => normalizationApi.normalizeSearchValue(value || '');

const tokenize = value => safeNormalize(value)
    .split(' ')
    .map(token => token.trim())
    .filter(Boolean);

function shouldEnableV2Search() {
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.has('v2Search')) {
            const enabled = params.get('v2Search') === 'true';
            localStorage.setItem(V2_SEARCH_FLAG, enabled.toString());
            return enabled;
        }
        const stored = localStorage.getItem(V2_SEARCH_FLAG);
        if (stored === null) {
            return true;
        }
        return stored === 'true';
    } catch (error) {
        void error;
        return true;
    }
}

function resolveLegacyEntries() {
    const legacyEntries = Array.isArray(window.featureSearchEntries)
        ? window.featureSearchEntries
        : [];

    return legacyEntries.map(entry => {
        const label = entry?.optionLabel || entry?.display || entry?.label || '';
        const detail = entry?.detail || entry?.value?.detail || '';
        const display = entry?.display || label;
        const key = entry?.key || safeNormalize(display);
        const type = entry?.type || entry?.entryType || entry?.value?.type || 'feature';
        const keywords = [label, detail, display].filter(Boolean).join(' ');

        return {
            key: `legacy:${key}`,
            legacyKey: entry?.key || null,
            type,
            label,
            display,
            detail,
            keywords,
            legacyEntry: entry,
            legacyQuery: display || label
        };
    });
}

function buildDeviceEntries(catalog) {
    const results = [];
    if (!catalog || typeof catalog !== 'object') {
        return results;
    }

    const pushEntry = (label, categoryKey, categoryLabel) => {
        if (!label) return;
        const keywords = [label, categoryLabel, categoryKey].filter(Boolean).join(' ');
        results.push({
            key: `device:${safeNormalize(label)}`,
            type: 'device',
            label,
            display: label,
            detail: categoryLabel ? `Device · ${categoryLabel}` : 'Device',
            keywords,
            legacyQuery: label
        });
    };

    const processCategory = (categoryKey, data, categoryLabel) => {
        if (!data || typeof data !== 'object') return;
        Object.keys(data).forEach(name => {
            if (!name || name === 'accessories') return;
            pushEntry(name, categoryKey, categoryLabel);
        });
    };

    Object.entries(catalog).forEach(([categoryKey, data]) => {
        const label = DEFAULT_CATEGORY_LABELS[categoryKey] || categoryKey;
        if (categoryKey === 'accessories' && data && typeof data === 'object') {
            Object.entries(data).forEach(([subKey, subData]) => {
                const subLabel = DEFAULT_CATEGORY_LABELS[subKey] || subKey;
                const fullLabel = `${label} · ${subLabel}`;
                processCategory(subKey, subData, fullLabel);
            });
            return;
        }
        processCategory(categoryKey, data, label);
    });

    return results;
}

function buildSearchIndex() {
    const entries = [];
    const index = new Map();
    const addEntry = entry => {
        if (!entry || !entry.label) return;
        const normalizedLabel = safeNormalize(entry.label);
        if (!normalizedLabel) return;
        const labelKey = `label:${normalizedLabel}`;
        if (index.has(labelKey)) return;
        const normalizedKeywords = safeNormalize(entry.keywords || '');
        const tokens = new Set([...tokenize(entry.label), ...tokenize(entry.keywords || '')]);
        const withMeta = {
            ...entry,
            normalizedLabel,
            normalizedKeywords,
            tokens
        };
        if (!index.has(withMeta.key)) {
            entries.push(withMeta);
        }
        index.set(withMeta.key, withMeta);
        if (entry.legacyKey) {
            index.set(`legacyKey:${entry.legacyKey}`, withMeta);
        }
        index.set(labelKey, withMeta);
    };

    resolveLegacyEntries().forEach(addEntry);
    buildDeviceEntries(devicesCatalog).forEach(addEntry);

    return { entries, index };
}

function resolveDefaultEntries(index) {
    const defaults = Array.isArray(window.featureSearchDefaultOptions)
        ? window.featureSearchDefaultOptions
        : [];
    if (!defaults.length) return [];

    const results = [];
    const seen = new Set();

    defaults.forEach(option => {
        if (!option) return;
        const entryKey = option.entryKey ? `legacyKey:${option.entryKey}` : null;
        const label = option.label || option.value || '';
        const normalizedLabel = label ? `label:${safeNormalize(label)}` : null;
        const entry = (entryKey && index.get(entryKey))
            || (normalizedLabel && index.get(normalizedLabel));
        if (entry && !seen.has(entry.key)) {
            results.push(entry);
            seen.add(entry.key);
        }
    });

    return results;
}

function scoreEntry(entry, query, queryTokens) {
    if (!entry) return 0;
    if (!query) return 0;
    if (entry.normalizedLabel === query) return 1000;
    if (entry.normalizedLabel.startsWith(query)) return 820;
    if (entry.normalizedLabel.includes(query)) return 650;
    let score = 0;
    if (entry.normalizedKeywords.includes(query)) {
        score += 120;
    }
    if (queryTokens.length) {
        let matched = 0;
        queryTokens.forEach(token => {
            if (entry.tokens.has(token)) matched += 1;
        });
        score += matched * 60;
    }
    if (entry.type === 'action') {
        score += 10;
    }
    return score;
}

function findMatches(entries, query) {
    const normalizedQuery = safeNormalize(query);
    if (!normalizedQuery) return [];
    const queryTokens = tokenize(query);
    return entries
        .map(entry => ({
            entry,
            score: scoreEntry(entry, normalizedQuery, queryTokens)
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label))
        .slice(0, MAX_RESULTS)
        .map(result => result.entry);
}

function ensureDropdown(input) {
    if (!input) return null;
    const wrapper = input.closest('.v2-search-input-wrapper') || input.parentElement;
    if (!wrapper) return null;

    let dropdown = document.getElementById('featureSearchDropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'featureSearchDropdown';
        dropdown.className = 'feature-search-dropdown';
        dropdown.setAttribute('role', 'listbox');
    }

    if (!wrapper.contains(dropdown)) {
        wrapper.appendChild(dropdown);
    }

    return dropdown;
}

function renderDropdown(dropdown, entries) {
    if (!dropdown) return;
    dropdown.innerHTML = '';

    if (!entries.length) {
        dropdown.dataset.count = '0';
        dropdown.dataset.open = 'false';
        dropdown.hidden = true;
        dropdown.setAttribute('aria-expanded', 'false');
        return;
    }

    const list = document.createElement('div');
    list.className = 'feature-search-dropdown-list';

    entries.forEach((entry, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'feature-search-option';
        const optionId = `v2-feature-search-${entry.key.replace(/[^a-z0-9_-]+/gi, '-')}`;
        button.id = optionId;
        button.setAttribute('role', 'option');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        button.setAttribute('data-value', entry.display || entry.label);
        button.setAttribute('data-entry-key', entry.key);
        button.setAttribute('aria-label', entry.label);
        button.setAttribute('aria-selected', 'false');

        const contentDiv = document.createElement('div');
        contentDiv.className = 'feature-search-option-content';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'feature-search-option-label';
        labelSpan.textContent = entry.label;
        contentDiv.appendChild(labelSpan);

        if (entry.detail) {
            const detailSpan = document.createElement('span');
            detailSpan.className = 'feature-search-option-value';
            detailSpan.textContent = entry.detail;
            contentDiv.appendChild(detailSpan);
        }

        button.appendChild(contentDiv);
        list.appendChild(button);
    });

    dropdown.appendChild(list);
    dropdown.dataset.count = String(entries.length);
    dropdown.dataset.activeIndex = '0';
    dropdown.dataset.open = 'true';
    dropdown.hidden = false;
    dropdown.setAttribute('aria-expanded', 'true');
}

function getDropdownOptions(dropdown) {
    if (!dropdown) return [];
    return Array.from(dropdown.querySelectorAll('[role="option"]'));
}

function setActiveOption(input, dropdown, index) {
    const options = getDropdownOptions(dropdown);
    if (!options.length) return null;
    const bounded = Math.max(0, Math.min(index, options.length - 1));
    options.forEach((option, optIndex) => {
        const isActive = optIndex === bounded;
        option.setAttribute('tabindex', isActive ? '0' : '-1');
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive && input && option.id) {
            input.setAttribute('aria-activedescendant', option.id);
        }
    });
    dropdown.dataset.activeIndex = String(bounded);
    return options[bounded];
}

function closeDropdown(input, dropdown) {
    if (!dropdown) return;
    dropdown.dataset.open = 'false';
    dropdown.hidden = true;
    dropdown.setAttribute('aria-expanded', 'false');
    dropdown.dataset.activeIndex = '';
    if (input && input.hasAttribute('aria-activedescendant')) {
        input.removeAttribute('aria-activedescendant');
    }
}

function openDropdown(dropdown) {
    if (!dropdown || dropdown.dataset.count === '0') return;
    dropdown.dataset.open = 'true';
    dropdown.hidden = false;
    dropdown.setAttribute('aria-expanded', 'true');
}

function dispatchV2SearchEvent(query) {
    window.dispatchEvent(new CustomEvent('v2:search', {
        detail: { query }
    }));
}

function applySelection(entry, queryValue) {
    if (!entry) return;
    const query = entry.legacyQuery || entry.display || entry.label || queryValue || '';
    if (!query) return;

    if (typeof window.runFeatureSearch === 'function') {
        window.runFeatureSearch(query);
        return;
    }

    const legacyInput = document.getElementById('featureSearch');
    if (legacyInput) {
        legacyInput.value = query;
        legacyInput.dispatchEvent(new Event('input', { bubbles: true }));
        legacyInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

function resolveEntryFromOption(option, entryIndex) {
    if (!option) return null;
    const entryKey = option.getAttribute('data-entry-key');
    if (entryKey && entryIndex.has(entryKey)) {
        return entryIndex.get(entryKey);
    }
    const label = option.getAttribute('data-value') || '';
    if (!label) return null;
    return entryIndex.get(`label:${safeNormalize(label)}`) || null;
}

function setupSearchEvents(input, dropdown) {
    let indexState = buildSearchIndex();
    let currentResults = [];

    const refreshIndex = () => {
        indexState = buildSearchIndex();
    };

    const updateResults = query => {
        refreshIndex();
        if (!query) {
            currentResults = resolveDefaultEntries(indexState.index);
        } else {
            currentResults = findMatches(indexState.entries, query);
        }
        renderDropdown(dropdown, currentResults);
        if (dropdown.dataset.count !== '0') {
            setActiveOption(input, dropdown, 0);
        }
    };

    input.addEventListener('input', e => {
        e.stopPropagation();
        const query = e.target.value.trim();
        updateResults(query);
        openDropdown(dropdown);
        dispatchV2SearchEvent(query);
    });

    input.addEventListener('focus', () => {
        updateResults(input.value.trim());
        openDropdown(dropdown);
    });

    input.addEventListener('blur', () => {
        window.setTimeout(() => {
            if (dropdown.contains(document.activeElement)) return;
            closeDropdown(input, dropdown);
        }, 120);
    });

    input.addEventListener('keydown', e => {
        e.stopPropagation();
        const options = getDropdownOptions(dropdown);
        const activeIndex = dropdown.dataset.activeIndex ? Number(dropdown.dataset.activeIndex) : 0;

        if (e.key === 'Enter') {
            const option = options[activeIndex];
            const entry = resolveEntryFromOption(option, indexState.index);
            applySelection(entry, input.value.trim());
            closeDropdown(input, dropdown);
            return;
        }

        if (e.key === 'Escape') {
            if (input.value) {
                input.value = '';
                updateResults('');
                dispatchV2SearchEvent('');
            }
            closeDropdown(input, dropdown);
            e.preventDefault();
            return;
        }

        if (e.key === 'ArrowDown') {
            if (!options.length) return;
            e.preventDefault();
            const next = activeIndex + 1 >= options.length ? 0 : activeIndex + 1;
            setActiveOption(input, dropdown, next);
            return;
        }

        if (e.key === 'ArrowUp') {
            if (!options.length) return;
            e.preventDefault();
            const prev = activeIndex - 1 < 0 ? options.length - 1 : activeIndex - 1;
            setActiveOption(input, dropdown, prev);
        }
    });

    dropdown.addEventListener('mousedown', e => {
        const option = e.target.closest('[data-value]');
        if (option) {
            e.preventDefault();
        }
    });

    dropdown.addEventListener('click', e => {
        const option = e.target.closest('[data-value]');
        if (!option) return;
        const entry = resolveEntryFromOption(option, indexState.index);
        applySelection(entry, input.value.trim());
        closeDropdown(input, dropdown);
    });

    dropdown.addEventListener('keydown', e => {
        const options = getDropdownOptions(dropdown);
        if (!options.length) return;
        const activeElement = document.activeElement;
        const currentIndex = options.indexOf(activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = currentIndex >= 0 ? currentIndex + 1 : 0;
            const option = setActiveOption(input, dropdown, next >= options.length ? 0 : next);
            option?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
            const option = setActiveOption(input, dropdown, prev);
            option?.focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex >= 0 && options[currentIndex]) {
                const entry = resolveEntryFromOption(options[currentIndex], indexState.index);
                applySelection(entry, input.value.trim());
                closeDropdown(input, dropdown);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown(input, dropdown);
            input.focus();
        }
    });
}

function setupV2Search({ inputId } = {}) {
    if (!shouldEnableV2Search()) {
        return false;
    }
    const input = document.getElementById(inputId || 'v2SidebarSearchInput');
    if (!input) return false;

    const dropdown = ensureDropdown(input);
    if (!dropdown) return false;

    setupSearchEvents(input, dropdown);
    return true;
}

export { setupV2Search, shouldEnableV2Search };
export default { setupV2Search, shouldEnableV2Search };
