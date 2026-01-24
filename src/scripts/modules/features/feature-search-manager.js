/**
 * Feature Search Manager
 * Handles the logic for the global feature search (Command Palette).
 */

export const FeatureSearchManager = {
    // Dependencies shimmed from window for now, or passed in via init
    featureMap: (typeof window !== 'undefined' ? window.featureMap : null) || {},
    actionMap: (typeof window !== 'undefined' ? window.actionMap : null) || {},
    deviceMap: (typeof window !== 'undefined' ? window.deviceMap : null) || {},
    helpMap: (typeof window !== 'undefined' ? window.helpMap : null) || {},

    // State
    highlightTimers: new Map(),

    // DOM Elements (resolved on demand or init)
    elements: {
        input: null,
        dropdown: null,
        helpSearch: null,
        helpNoResults: null,
        helpNoResultsSuggestions: null,
        helpQuickLinksList: null,
        sideMenu: null,
    },

    init(options = {}) {
        if (typeof document === 'undefined') return;

        this.elements.input = document.getElementById('featureSearchInput');
        this.elements.dropdown = document.getElementById('featureSearchDropdown');
        this.elements.helpSearch = document.getElementById('helpSearch');
        this.elements.helpNoResults = document.getElementById('helpNoResults');
        this.elements.helpNoResultsSuggestions = document.getElementById('helpNoResultsSuggestions');
        this.elements.helpQuickLinksList = document.getElementById('helpQuickLinksList');
        this.elements.sideMenu = document.getElementById('sideMenu');

        if (options.maps) {
            this.featureMap = options.maps.featureMap || this.featureMap;
            this.actionMap = options.maps.actionMap || this.actionMap;
            this.deviceMap = options.maps.deviceMap || this.deviceMap;
            this.helpMap = options.maps.helpMap || this.helpMap;
        }

        if (typeof options.focusHandler === 'function') {
            this.externalFocusHandler = options.focusHandler;
        }
    },

    normalizeSearchValue(val) {
        if (typeof val !== 'string') return '';
        return val.trim().toLowerCase();
    },

    searchKey(str) {
        if (typeof str !== 'string' || !str) return '';
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    },

    searchTokens(str) {
        if (typeof str !== 'string' || !str) return new Set();
        return new Set(str.toLowerCase().split(/[\s\-_]+/).filter(Boolean));
    },

    findBestSearchMatch(map, key, tokens) {
        if (typeof window !== 'undefined' && typeof window.findBestSearchMatch === 'function') {
            return window.findBestSearchMatch(map, key, tokens);
        }
        return null;
    },

    updateFeatureSearchValue(label, query) {
        if (this.elements.input) this.elements.input.value = label;
    },

    focusFeatureElement(element) {
        if (this.externalFocusHandler) {
            this.externalFocusHandler(element);
            return;
        }

        if (!element) return;
        if (this.elements.sideMenu && this.elements.sideMenu.contains(element)) {
            if (typeof window.openSideMenu === 'function') window.openSideMenu();
        }

        if (typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        try {
            if (typeof element.focus === 'function') element.focus({ preventScroll: true });
        } catch {
            if (typeof element.focus === 'function') element.focus();
        }

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (typeof element.select === 'function') element.select();
        }

        if (element.tagName === 'SELECT' && !element.hasAttribute('data-skip-native-picker')) {
            if (typeof window.safeShowPicker === 'function') window.safeShowPicker(element);
        }
    },

    highlightFeatureSearchTargets(targets) {
        if (!Array.isArray(targets) || !targets.length) return;

        targets.forEach(target => {
            if (!target) return;
            target.classList.add('feature-highlight');

            if (this.highlightTimers.has(target)) {
                clearTimeout(this.highlightTimers.get(target));
                this.highlightTimers.delete(target);
            }

            const timeout = setTimeout(() => {
                target.classList.remove('feature-highlight');
                this.highlightTimers.delete(target);
            }, 2000);

            this.highlightTimers.set(target, timeout);
        });
    },

    findAssociatedLabelElements(element) {
        if (!element || typeof document === 'undefined') return [];
        const labels = [];
        if (element.id) {
            const linked = document.querySelectorAll(`label[for="${element.id}"]`);
            linked.forEach(l => labels.push(l));
        }
        const parentLabel = element.closest('label');
        if (parentLabel && !labels.includes(parentLabel)) {
            labels.push(parentLabel);
        }
        return labels;
    },

    recordFeatureSearchUsage(key, type, label) {
        if (typeof console !== 'undefined' && console.debug) {
            console.debug('Search usage:', key, type, label);
        }
    },

    runFeatureSearch(query) {
        const input = this.elements.input;
        const rawQuery = typeof query === 'string' ? query : (input ? input.value : '');
        const originalNormalized = this.normalizeSearchValue(rawQuery);
        const value = rawQuery.trim();

        if (!value) return;

        const hasFilterHelper = typeof window.extractFeatureSearchFilter === 'function';
        const filterData = hasFilterHelper
            ? window.extractFeatureSearchFilter(value)
            : { filterType: null, queryText: value };

        const filterType = filterData?.filterType || null;
        const filteredQuery = filterType ? filterData.queryText : value;
        // eslint-disable-next-line
        const normalizedFiltered = typeof filteredQuery === 'string' ? filteredQuery.trim() : '';
        const lower = value.toLowerCase();
        const isHelpSuggestion = lower.endsWith(' (help)');
        const cleanSource = isHelpSuggestion
            ? value.slice(0, -7).trim()
            : normalizedFiltered || (typeof filteredQuery === 'string' ? filteredQuery.trim() : '');

        if (filterType === 'help' && !isHelpSuggestion && !cleanSource) {
            if (typeof window.openHelp === 'function') window.openHelp();
            const helpSearch = this.elements.helpSearch;
            if (helpSearch) {
                helpSearch.value = '';
                if (typeof window.filterHelp === 'function') window.filterHelp();
                helpSearch.focus();
            }
            return;
        }

        const clean = cleanSource || (filterType ? '' : value);
        const cleanKey = this.searchKey(clean);
        const cleanTokens = this.searchTokens(clean);

        const helpMatch = this.findBestSearchMatch(this.helpMap, cleanKey, cleanTokens);
        const deviceMatch = this.findBestSearchMatch(this.deviceMap, cleanKey, cleanTokens);
        const featureOnlyMatch = this.findBestSearchMatch(this.featureMap, cleanKey, cleanTokens);
        const actionMatch = this.findBestSearchMatch(this.actionMap, cleanKey, cleanTokens);

        const featureMatch = (() => {
            if (filterType === 'feature') return featureOnlyMatch;
            if (filterType === 'action') return actionMatch;
            if (!actionMatch) return featureOnlyMatch;
            if (!featureOnlyMatch) return actionMatch;
            if (actionMatch.score > featureOnlyMatch.score) return actionMatch;
            if (featureOnlyMatch.score > actionMatch.score) return featureOnlyMatch;
            return actionMatch;
        })();

        const helpScore = helpMatch?.score || 0;
        const deviceScore = deviceMatch?.score || 0;

        const strongTypes = (typeof window.STRONG_SEARCH_MATCH_TYPES !== 'undefined')
            ? window.STRONG_SEARCH_MATCH_TYPES
            : (typeof window.FALLBACK_STRONG_SEARCH_MATCH_TYPES !== 'undefined' ? window.FALLBACK_STRONG_SEARCH_MATCH_TYPES : new Set());

        const deviceStrong = deviceMatch ? strongTypes.has(deviceMatch.matchType) : false;
        const filterTargetsDevices = filterType === 'device';
        const filterTargetsActions = filterType === 'action';
        const filterTargetsFeatures = filterType === 'feature';
        const filterBlocksDevices = filterTargetsFeatures || filterTargetsActions;

        const normalizedFeatureMatch = (() => {
            if (!featureMatch) return null;
            const entry = featureMatch.value;
            if (!entry) return null;
            const entryType = entry.entryType || 'feature';
            if (entryType === 'device') return null;
            if (filterTargetsDevices) return null;
            if (filterTargetsFeatures && entryType !== 'feature') return null;
            if (filterTargetsActions && entryType !== 'action') return null;
            return { match: featureMatch, entryType, entry };
        })();

        const fallbackFeatureMatch =
            featureMatch && featureMatch.value && featureMatch.value.entryType !== 'device'
                ? featureMatch
                : null;

        const featureMatchForComparison = normalizedFeatureMatch?.match || fallbackFeatureMatch;
        const featureScore = featureMatchForComparison?.score || 0;
        const featureStrong = featureMatchForComparison
            ? strongTypes.has(featureMatchForComparison.matchType)
            : false;

        const bestNonHelpScore = Math.max(deviceScore, featureScore);
        const hasStrongNonHelp = deviceStrong || featureStrong;
        const preferHelp =
            !!helpMatch &&
            (isHelpSuggestion || filterType === 'help' || (!hasStrongNonHelp && helpScore > bestNonHelpScore));

        if (!isHelpSuggestion && !preferHelp) {
            const featureMatchType = featureMatchForComparison?.matchType;
            const shouldUseDevice =
                (!filterBlocksDevices &&
                    (!!deviceMatch &&
                        (!featureMatchForComparison ||
                            (deviceStrong && !featureStrong) ||
                            (deviceStrong === featureStrong &&
                                (deviceScore > featureScore ||
                                    (deviceScore === featureScore && featureMatchType !== 'exactKey')))))) ||
                (filterTargetsDevices && !!deviceMatch);

            if (shouldUseDevice) {
                const device = deviceMatch.value;
                if (device && device.select) {
                    device.select.value = device.value;
                    device.select.dispatchEvent(new Event('change', { bubbles: true }));
                    if (device.label) {
                        this.updateFeatureSearchValue(device.label, originalNormalized);
                    }

                    let deviceLabel = device.label;
                    if (!deviceLabel && device.select) {
                        const selectedOption = Array.from(device.select.options || []).find(opt => opt.value === device.value);
                        if (selectedOption && selectedOption.textContent) {
                            deviceLabel = selectedOption.textContent.trim();
                        }
                    }
                    this.recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);

                    this.focusFeatureElement(device.select);
                    const highlights = [device.select, ...this.findAssociatedLabelElements(device.select)];
                    this.highlightFeatureSearchTargets(highlights);
                    return;
                }
                if (device && device.entryType === 'deviceLibrary' && (device.element || device.rawElement)) {
                    const deviceLabel = device.label || clean;
                    if (deviceLabel) this.updateFeatureSearchValue(deviceLabel, originalNormalized);
                    this.recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);

                    if (typeof device.focusLibraryEntry === 'function') device.focusLibraryEntry();

                    const focusTarget = device.element || device.rawElement;
                    if (focusTarget) {
                        this.focusFeatureElement(focusTarget);
                        this.highlightFeatureSearchTargets([focusTarget, ...this.findAssociatedLabelElements(focusTarget)]);
                    }
                    if (typeof device.highlightLibraryEntry === 'function') device.highlightLibraryEntry();
                    return;
                }
            }

            if (normalizedFeatureMatch) {
                const feature = normalizedFeatureMatch.entry;
                const featureEl = feature?.element || feature;
                if (featureEl) {
                    const label = feature?.label || featureEl.textContent?.trim();
                    if (label) this.updateFeatureSearchValue(label, originalNormalized);

                    const type = normalizedFeatureMatch.entryType || 'feature';
                    const usageKey = normalizedFeatureMatch.match?.key || featureMatch?.key;
                    this.recordFeatureSearchUsage(usageKey, type, label);

                    this.focusFeatureElement(featureEl);
                    this.highlightFeatureSearchTargets([featureEl, ...this.findAssociatedLabelElements(featureEl)]);
                    return;
                }
            }
        }

        if (helpMatch) {
            const helpEntry = helpMatch.value || {};
            const section = helpEntry.section;
            this.recordFeatureSearchUsage(helpMatch.key, 'help', helpEntry.label);
            if (typeof window.openHelp === 'function') window.openHelp();

            if (this.elements.helpSearch) {
                this.elements.helpSearch.value = clean;
                if (typeof window.filterHelp === 'function') window.filterHelp();
            }

            if (section) {
                if (section.hasAttribute('hidden')) {
                    section.removeAttribute('hidden');
                    if (this.elements.helpNoResults) this.elements.helpNoResults.setAttribute('hidden', '');
                    if (this.elements.helpNoResultsSuggestions) this.elements.helpNoResultsSuggestions.setAttribute('hidden', '');
                    if (typeof window.syncHelpQuickLinksVisibility === 'function') window.syncHelpQuickLinksVisibility();
                }
                if (typeof section.scrollIntoView === 'function') {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                if (typeof window.highlightHelpSection === 'function') window.highlightHelpSection(section);

                const sectionHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
                this.highlightFeatureSearchTargets([sectionHeading || section]);
            }
            return;
        }

        if (typeof window.openHelp === 'function') window.openHelp();
        if (this.elements.helpSearch) {
            this.elements.helpSearch.value = clean;
            if (typeof window.filterHelp === 'function') window.filterHelp();
            this.highlightFeatureSearchTargets([this.elements.helpSearch]);
        }
    }
};
