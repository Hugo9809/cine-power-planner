/**
 * Backup Diff Manager
 *
 * Manages the "Backup Diff" (Version Comparison) feature.
 * Handles computing deep differences between backup snapshots and rendering the diff UI.
 *
 * Extracted from app-session.js.
 */
import {
    detectPrimaryGlobalScope,
    formatNumberForComparison,
    normalizeVersionValue
} from '../core/session-runtime.js';

import {
    showNotification
} from '../ui/notifications.js';

import cineFeatureBackup from './backup.js';

import {
    formatFullBackupFilename
} from '../core/project-transfer-manager.js';

import { isPlainObject } from '../ui/ui-preferences.js';

// --- Constants ---

const SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

const BACKUP_DIFF_IGNORED_KEYS = new Set([
    'timestamp',
    'createdAt',
    'modifiedAt',
    'id',
    'uuid',
    '_id',
    'version',
    'appVersion',
    'history', // Ignore history array itself to prevent recursion/noise
    'backupHistory',
    'fullBackupHistory'
]);

const ARRAY_COMPARISON_KEY_CANDIDATES = [
    'name',
    'label',
    'title',
    'id',
    'uuid',
    'key',
    'slug',
];

const ARRAY_COMPARISON_KEY_LABEL_OVERRIDES = {
    id: 'ID',
    uuid: 'UUID',
};

const ARRAY_COMPARISON_KEY_LABEL_OMIT = new Set(['name', 'label', 'title']);


// --- State ---

const backupDiffState = {
    baseline: '',
    comparison: '',
    expanded: false,
};

let backupDiffOptionsCache = []; // Cache options to avoid re-reading IDB too often if we were doing that

// --- UI Toggle ---

export function toggleBackupDiffSection(elements, forceState) {
    const { sectionEl, toggleButtonEl } = elements;
    if (!sectionEl) return;

    const newState = typeof forceState === 'boolean' ? forceState : !backupDiffState.expanded;
    backupDiffState.expanded = newState;

    if (backupDiffState.expanded) {
        sectionEl.removeAttribute('hidden');
        populateBackupDiffSelectors(elements);
        if (toggleButtonEl) toggleButtonEl.setAttribute('aria-expanded', 'true');
    } else {
        sectionEl.setAttribute('hidden', '');
        if (toggleButtonEl) toggleButtonEl.setAttribute('aria-expanded', 'false');
    }
}

export function initializeBackupDiff(elements) {
    const {
        sectionEl,
        toggleButtonEl,
        closeButtonEl,
        primarySelectEl,
        secondarySelectEl,
        exportButtonEl,
        summaryEl
    } = elements;

    if (toggleButtonEl) {
        toggleButtonEl.addEventListener('click', () => toggleBackupDiffSection(elements));
    }
    if (closeButtonEl) {
        closeButtonEl.addEventListener('click', () => toggleBackupDiffSection(elements, false));
    }
    if (primarySelectEl) {
        primarySelectEl.addEventListener('change', (e) => handleBackupDiffSelectionChange(e, elements));
    }
    if (secondarySelectEl) {
        secondarySelectEl.addEventListener('change', (e) => handleBackupDiffSelectionChange(e, elements));
    }
    if (exportButtonEl) {
        exportButtonEl.addEventListener('click', () => handleBackupDiffExport(elements));
    }

    // Initial State
    if (summaryEl) {
        summaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
    }
    if (exportButtonEl) {
        exportButtonEl.disabled = true;
    }
    toggleBackupDiffSection(elements, false);
}

// --- Key/Path Formatting Helpers ---

const localeSort = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    }
    return 0;
};

function getDiffText(key, fallback) {
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};
    return langTexts[key] || (texts.en ? texts.en[key] : fallback) || fallback;
}

function fallbackHumanizeDiffKey(key) {
    if (typeof key !== 'string') {
        return String(key);
    }
    const spaced = key
        .replace(/[_\s-]+/g, ' ')
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .trim();
    if (!spaced) {
        return key;
    }
    return spaced
        .split(' ')
        .map(part => {
            if (!part) return part;
            if (part.length > 3 && part === part.toUpperCase()) {
                return part;
            }
            if (/^\d+$/.test(part)) {
                return formatNumberForComparison(Number(part));
            }
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(' ');
}

function humanizeDiffKey(key) {
    if (typeof key !== 'string') {
        return String(key);
    }
    // Note: humanizeKey might be available globally or imported, but for now we rely on fallback
    // If we had a shared utility for this, we'd import it.
    return fallbackHumanizeDiffKey(key);
}

export function createKeyedDiffPathSegment(keyName, keyValue) {
    let serializedValue;
    try {
        serializedValue = JSON.stringify(keyValue);
    } catch (error) {
        console.warn('Failed to serialize keyed diff path value', error);
        try {
            serializedValue = JSON.stringify(String(keyValue));
        } catch (stringError) {
            console.warn('Failed to stringify keyed diff fallback value', stringError);
            serializedValue = '"?"';
        }
    }
    return `[${keyName}=${serializedValue}]`;
}

export function parseKeyedDiffPathSegment(segment) {
    if (typeof segment !== 'string') {
        return null;
    }
    const match = segment.match(/^\[([^=[\]]+)=([\s\S]+)\]$/);
    if (!match) {
        return null;
    }
    const keyName = match[1];
    const rawValue = match[2];
    try {
        return { key: keyName, value: JSON.parse(rawValue) };
    } catch (error) {
        console.warn('Failed to parse keyed diff path segment', segment, error);
        return { key: keyName, value: rawValue };
    }
}

export function formatDiffListIndex(part) {
    if (typeof part !== 'string') {
        return null;
    }
    const indexMatch = part.match(/^\[(\d+)\]$/);
    if (indexMatch) {
        const index = Number(indexMatch[1]);
        if (!Number.isFinite(index) || index < 0) {
            return null;
        }
        const template = getDiffText('versionCompareListItemLabel', 'Item %s');
        return template.replace('%s', formatNumberForComparison(index + 1));
    }

    const keyedSegment = parseKeyedDiffPathSegment(part);
    if (keyedSegment) {
        const { key, value } = keyedSegment;
        let valueText;
        if (typeof value === 'number' && Number.isFinite(value)) {
            valueText = formatNumberForComparison(value);
        } else if (typeof value === 'string') {
            valueText = value;
        } else if (value === null) {
            valueText = 'null';
        } else {
            try {
                valueText = JSON.stringify(value);
            } catch (error) {
                console.warn('Failed to stringify keyed diff value', error);
                valueText = String(value);
            }
        }

        const template = getDiffText('versionCompareListItemLabel', 'Item %s');
        const baseLabel = template.replace('%s', valueText);

        if (ARRAY_COMPARISON_KEY_LABEL_OMIT.has(key)) {
            return baseLabel;
        }

        const overrideLabel = ARRAY_COMPARISON_KEY_LABEL_OVERRIDES[key];
        const keyLabel = overrideLabel || humanizeDiffKey(key);
        if (!keyLabel) {
            return baseLabel;
        }
        return `${keyLabel} · ${baseLabel}`;
    }

    return null;
}

function formatDiffPathSegment(part) {
    const listLabel = formatDiffListIndex(part);
    if (listLabel) {
        return listLabel;
    }
    if (typeof part !== 'string') {
        return String(part);
    }
    return humanizeDiffKey(part);
}

export function formatDiffPath(parts) {
    if (!Array.isArray(parts) || !parts.length) {
        return getDiffText('versionCompareRootPath', 'Entire setup');
    }
    return parts.map(formatDiffPathSegment).join(' › ');
}

// --- Deep Diff Intelligence ---

function isDiffKeyIgnored(key) {
    return BACKUP_DIFF_IGNORED_KEYS.has(key);
}

function isDiffComparablePrimitive(value) {
    if (value === null) {
        return true;
    }
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
}

function valuesEqual(a, b) {
    if (a === b) return true;
    return Number.isNaN(a) && Number.isNaN(b);
}

function arrayHasOnlyComparablePrimitives(array) {
    if (!Array.isArray(array)) {
        return false;
    }
    for (let i = 0; i < array.length; i += 1) {
        if (!isDiffComparablePrimitive(array[i])) {
            return false;
        }
    }
    return true;
}

function createPrimitiveDiffKey(value) {
    if (value === null) {
        return 'primitive:null';
    }
    if (typeof value === 'number') {
        if (Number.isNaN(value)) {
            return 'primitive:number:NaN';
        }
        if (Object.is(value, -0)) {
            return 'primitive:number:-0';
        }
        return `primitive:number:${value}`;
    }
    if (typeof value === 'string') {
        return `primitive:string:${value}`;
    }
    if (typeof value === 'boolean') {
        return `primitive:boolean:${value}`;
    }
    return `primitive:other:${String(value)}`;
}

function buildPrimitiveDiffIndex(array) {
    const counts = new Map();
    if (!Array.isArray(array)) {
        return counts;
    }
    for (let i = 0; i < array.length; i += 1) {
        const value = array[i];
        if (!isDiffComparablePrimitive(value)) {
            continue;
        }
        const key = createPrimitiveDiffKey(value);
        if (!counts.has(key)) {
            counts.set(key, { value, count: 0 });
        }
        const entry = counts.get(key);
        entry.count += 1;
    }
    return counts;
}

function formatPrimitiveDiffPathValue(value) {
    if (typeof value === 'number') {
        if (Number.isNaN(value)) {
            return 'NaN';
        }
        if (!Number.isFinite(value)) {
            return value > 0 ? 'Infinity' : '-Infinity';
        }
        if (Object.is(value, -0)) {
            return '-0';
        }
    }
    return value;
}


export function findArrayComparisonKey(baseArray, compareArray) {
    if (!Array.isArray(baseArray) || !Array.isArray(compareArray)) {
        return null;
    }

    const arrays = [baseArray, compareArray];
    for (const candidate of ARRAY_COMPARISON_KEY_CANDIDATES) {
        let hasValues = false;
        let valid = true;
        const seenByArray = arrays.map(() => new Set());

        for (let arrayIndex = 0; arrayIndex < arrays.length && valid; arrayIndex += 1) {
            const currentArray = arrays[arrayIndex];
            for (let i = 0; i < currentArray.length; i += 1) {
                const item = currentArray[i];
                if (!isPlainObject(item)) {
                    valid = false;
                    break;
                }
                if (!Object.prototype.hasOwnProperty.call(item, candidate)) {
                    valid = false;
                    break;
                }
                const keyValue = item[candidate];
                if (keyValue === null || keyValue === undefined) {
                    valid = false;
                    break;
                }
                if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
                    valid = false;
                    break;
                }
                hasValues = true;
                const serialized = String(keyValue);
                const seen = seenByArray[arrayIndex];
                if (seen.has(serialized)) {
                    valid = false;
                    break;
                }
                seen.add(serialized);
            }
        }

        if (valid && hasValues) {
            return candidate;
        }
    }

    return null;
}

function buildArrayKeyIndex(array, keyName) {
    const map = new Map();
    const order = [];
    if (!Array.isArray(array)) {
        return { map, order };
    }
    array.forEach(item => {
        if (!isPlainObject(item)) {
            return;
        }
        const keyValue = item[keyName];
        if (keyValue === null || keyValue === undefined) {
            return;
        }
        if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
            return;
        }
        const serialized = String(keyValue);
        if (map.has(serialized)) {
            return;
        }
        map.set(serialized, { value: item, keyValue });
        order.push(serialized);
    });
    return { map, order };
}

// --- Main Comparison Logic ---

export function computeSetupDiff(baseline, comparison) {
    const entries = [];

    function walk(baseValue, compareValue, path) {
        if (valuesEqual(baseValue, compareValue)) {
            return;
        }

        const baseIsObject = isPlainObject(baseValue);
        const compareIsObject = isPlainObject(compareValue);

        if (baseIsObject && compareIsObject) {
            const keys = new Set([
                ...Object.keys(baseValue),
                ...Object.keys(compareValue)
            ]);
            keys.forEach(key => {
                if (isDiffKeyIgnored(key)) return;
                const hasBase = Object.prototype.hasOwnProperty.call(baseValue, key);
                const hasCompare = Object.prototype.hasOwnProperty.call(compareValue, key);
                if (!hasBase) {
                    entries.push({ type: 'added', path: path.concat(key), before: undefined, after: compareValue[key] });
                } else if (!hasCompare) {
                    entries.push({ type: 'removed', path: path.concat(key), before: baseValue[key], after: undefined });
                } else {
                    walk(baseValue[key], compareValue[key], path.concat(key));
                }
            });
            return;
        }

        const baseIsArray = Array.isArray(baseValue);
        const compareIsArray = Array.isArray(compareValue);

        if (baseIsArray && compareIsArray) {
            const comparisonKey = findArrayComparisonKey(baseValue, compareValue);
            if (comparisonKey) {
                const { map: baseIndex, order: baseOrder } = buildArrayKeyIndex(baseValue, comparisonKey);
                const { map: compareIndex, order: compareOrder } = buildArrayKeyIndex(compareValue, comparisonKey);
                const combinedOrder = [];
                const seenKeys = new Set();
                const appendKey = key => {
                    if (!seenKeys.has(key)) {
                        seenKeys.add(key);
                        combinedOrder.push(key);
                    }
                };
                baseOrder.forEach(appendKey);
                compareOrder.forEach(appendKey);

                combinedOrder.forEach(serializedKey => {
                    const baseEntry = baseIndex.get(serializedKey) || null;
                    const compareEntry = compareIndex.get(serializedKey) || null;
                    const keyValue = baseEntry ? baseEntry.keyValue : compareEntry ? compareEntry.keyValue : serializedKey;
                    const nextPath = path.concat(createKeyedDiffPathSegment(comparisonKey, keyValue));
                    if (!baseEntry && compareEntry) {
                        entries.push({ type: 'added', path: nextPath, before: undefined, after: compareEntry.value });
                    } else if (baseEntry && !compareEntry) {
                        entries.push({ type: 'removed', path: nextPath, before: baseEntry.value, after: undefined });
                    } else if (baseEntry && compareEntry) {
                        walk(baseEntry.value, compareEntry.value, nextPath);
                    }
                });
                return;
            }

            if (arrayHasOnlyComparablePrimitives(baseValue) && arrayHasOnlyComparablePrimitives(compareValue)) {
                const baseIndex = buildPrimitiveDiffIndex(baseValue);
                const compareIndex = buildPrimitiveDiffIndex(compareValue);
                const combinedOrder = [];
                const seenKeys = new Set();
                const appendKey = key => {
                    if (!seenKeys.has(key)) {
                        seenKeys.add(key);
                        combinedOrder.push(key);
                    }
                };
                for (let i = 0; i < baseValue.length; i += 1) {
                    appendKey(createPrimitiveDiffKey(baseValue[i]));
                }
                for (let i = 0; i < compareValue.length; i += 1) {
                    appendKey(createPrimitiveDiffKey(compareValue[i]));
                }

                combinedOrder.forEach(key => {
                    const baseEntry = baseIndex.get(key) || null;
                    const compareEntry = compareIndex.get(key) || null;
                    const baseCount = baseEntry ? baseEntry.count : 0;
                    const compareCount = compareEntry ? compareEntry.count : 0;
                    if (compareCount > baseCount) {
                        const addValue = compareEntry ? compareEntry.value : undefined;
                        const diff = compareCount - baseCount;
                        for (let i = 0; i < diff; i += 1) {
                            entries.push({
                                type: 'added',
                                path: path.concat(
                                    createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(addValue)),
                                ),
                                before: undefined,
                                after: addValue,
                            });
                        }
                    }
                    if (baseCount > compareCount) {
                        const removeValue = baseEntry ? baseEntry.value : undefined;
                        const diff = baseCount - compareCount;
                        for (let i = 0; i < diff; i += 1) {
                            entries.push({
                                type: 'removed',
                                path: path.concat(
                                    createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(removeValue)),
                                ),
                                before: removeValue,
                                after: undefined,
                            });
                        }
                    }
                });
                return;
            }

            // Fallback to index matching
            const maxLength = Math.max(baseValue.length, compareValue.length);
            for (let index = 0; index < maxLength; index += 1) {
                const hasBase = index < baseValue.length;
                const hasCompare = index < compareValue.length;
                const nextPath = path.concat(`[${index}]`);
                if (!hasBase) {
                    entries.push({ type: 'added', path: nextPath, before: undefined, after: compareValue[index] });
                } else if (!hasCompare) {
                    entries.push({ type: 'removed', path: nextPath, before: baseValue[index], after: undefined });
                } else {
                    walk(baseValue[index], compareValue[index], nextPath);
                }
            }
            return;
        }

        if (!baseIsObject && !baseIsArray && (compareIsObject || compareIsArray)) {
            entries.push({ type: 'changed', path, before: baseValue, after: compareValue });
            return;
        }
        if ((baseIsObject || baseIsArray) && !compareIsObject && !compareIsArray) {
            entries.push({ type: 'changed', path, before: baseValue, after: compareValue });
            return;
        }

        const changeType = baseValue === undefined ? 'added'
            : compareValue === undefined ? 'removed'
                : 'changed';
        entries.push({ type: changeType, path, before: baseValue, after: compareValue });
    }

    walk(baseline, comparison, []);
    return entries;
}


// --- UI Helpers ---

function createDiffValueElement(value, variant) {
    const element = document.createElement('pre');
    element.className = 'diff-value';
    if (variant) {
        element.className += ` diff-value-${variant}`;
    }
    if (value === undefined) {
        element.textContent = getDiffText('versionCompareMissingValue', 'Not present');
        return element;
    }
    if (value === null) {
        element.textContent = 'null';
        return element;
    }
    if (typeof value === 'string') {
        element.textContent = value;
        return element;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        element.textContent = String(value);
        return element;
    }
    try {
        element.textContent = JSON.stringify(value, null, 2);
    } catch (error) {
        console.warn('Failed to stringify diff value', error);
        element.textContent = String(value);
    }
    return element;
}

function createDiffChangeBlock(labelText, value, variant) {
    const block = document.createElement('div');
    block.className = 'diff-change';
    if (variant) {
        block.classList.add(`diff-change-${variant}`);
    }
    const label = document.createElement('span');
    label.className = 'diff-label';
    label.textContent = labelText;
    block.appendChild(label);
    block.appendChild(createDiffValueElement(value, variant));
    return block;
}

function createDiffStatusBadge(type) {
    const badge = document.createElement('span');
    badge.className = 'diff-label diff-status-badge';
    let variant = 'changed';
    let textKey = 'versionCompareChangeUpdated';
    let fallbackText = 'Updated';
    if (type === 'added') {
        variant = 'added';
        textKey = 'versionCompareChangeAdded';
        fallbackText = 'Added';
    } else if (type === 'removed') {
        variant = 'removed';
        textKey = 'versionCompareChangeRemoved';
        fallbackText = 'Removed';
    } else if (type === 'changed') {
        variant = 'changed';
        textKey = 'versionCompareChangeUpdated';
        fallbackText = 'Updated';
    }
    badge.classList.add(`diff-status-${variant}`);
    badge.textContent = getDiffText(textKey, fallbackText);
    return badge;
}

function sortDiffEntries(entries) {
    if (!Array.isArray(entries)) {
        return [];
    }
    const typeRank = { changed: 0, added: 1, removed: 2 };
    const compareStrings = (a, b) => localeSort(a, b);
    return entries
        .map(entry => ({
            entry,
            pathText: formatDiffPath(entry && entry.path),
            rank: entry && entry.type && Object.prototype.hasOwnProperty.call(typeRank, entry.type)
                ? typeRank[entry.type]
                : 3,
        }))
        .sort((a, b) => {
            if (a.rank !== b.rank) {
                return a.rank - b.rank;
            }
            return compareStrings(a.pathText, b.pathText);
        });
}

function formatDiffCount(count) {
    const key = count === 1
        ? 'versionCompareDifferencesCountOne'
        : 'versionCompareDifferencesCountOther';
    const template = getDiffText(key, count === 1 ? '%s difference noted.' : '%s differences noted.');
    return template.replace('%s', formatNumberForComparison(count));
}

function formatDiffDetail(key, count) {
    const template = getDiffText(key, '%s');
    return template.replace('%s', formatNumberForComparison(count));
}


// --- Main Logic & UI Connection ---

// --- Option Collection & Formatting ---

function formatTimestampForComparison(date) {
    if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return '';
    try {
        return new Intl.DateTimeFormat('en', {
            year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
        }).format(date);
    } catch (e) {
        return date.toISOString();
    }
}

function formatComparisonOptionLabel(name, parsed) {
    if (!parsed) return `Manual save · ${name}`;
    const typeLabel = parsed.type === cineFeatureBackup.constants.SESSION_AUTO_BACKUP_DELETION_PREFIX
        ? 'Auto backup before delete'
        : 'Auto backup';
    const ts = formatTimestampForComparison(parsed.date);
    return `${typeLabel} · ${ts}`;
}

export function collectBackupDiffOptions(dataProvider) {
    const options = [];
    let sourceData = {};

    if (typeof dataProvider === 'function') {
        sourceData = dataProvider();
    }

    if (isPlainObject(sourceData)) {
        Object.keys(sourceData).forEach(name => {
            const parsed = cineFeatureBackup.parseAutoBackupName ? cineFeatureBackup.parseAutoBackupName(name) : null;
            const label = formatComparisonOptionLabel(name, parsed);
            options.push({
                value: name,
                label: label,
                data: sourceData[name],
                timestamp: parsed && parsed.date ? parsed.date.getTime() : 0
            });
        });
    } else if (Array.isArray(sourceData)) {
        sourceData.forEach(item => {
            options.push({
                value: item.id || item.name,
                label: item.label || item.name || item.id,
                data: item.data || item,
                timestamp: item.timestamp || 0
            });
        });
    }

    return options.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

// Re-implementing with passed references for DOM elements
export function renderBackupDiff(elements, options = {}) {
    const {
        summaryEl,
        listEl,
        listContainerEl,
        exportButtonEl,
        notesEl,
        dataProvider // Passed from initialize or update
    } = elements;

    if (!summaryEl) return;

    // Refresh cache if needed or if forced
    // For now we refresh every time render is called to ensure fresh data
    backupDiffOptionsCache = collectBackupDiffOptions(dataProvider);

    if (!backupDiffOptionsCache.length) {
        clearBackupDiffResults(elements);
        summaryEl.textContent = getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.');
        if (exportButtonEl) exportButtonEl.disabled = true;
        if (notesEl) notesEl.disabled = true;
        return;
    }

    if (notesEl) notesEl.disabled = false;

    const baseline = backupDiffState.baseline;
    const comparison = backupDiffState.comparison;

    if (!baseline || !comparison) {
        clearBackupDiffResults(elements);
        summaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
        if (exportButtonEl) exportButtonEl.disabled = true;
        return;
    }

    if (baseline === comparison) {
        clearBackupDiffResults(elements);
        summaryEl.textContent = getDiffText('versionCompareSameSelection', 'Select two different versions to compare.');
        if (exportButtonEl) exportButtonEl.disabled = true;
        return;
    }

    const optionsMap = new Map(backupDiffOptionsCache.map(opt => [opt.value, opt]));
    const baselineEntry = optionsMap.get(baseline);
    const comparisonEntry = optionsMap.get(comparison);

    if (!baselineEntry || !comparisonEntry) {
        clearBackupDiffResults(elements);
        summaryEl.textContent = getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.');
        if (exportButtonEl) exportButtonEl.disabled = true;
        return;
    }

    const diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
    renderBackupDiffEntries(diffEntries, listEl, listContainerEl);
    updateBackupDiffSummary(diffEntries, summaryEl);
    if (exportButtonEl) exportButtonEl.disabled = false;
}

function renderBackupDiffEntries(entries, listEl, containerEl) {
    if (!listEl || !containerEl) return;

    listEl.innerHTML = '';
    if (!Array.isArray(entries) || !entries.length) {
        containerEl.hidden = true;
        return;
    }
    containerEl.hidden = false;
    const decoratedEntries = sortDiffEntries(entries);
    decoratedEntries.forEach(({ entry, pathText }) => {
        if (!entry) return;
        const item = document.createElement('li');
        const typeClass = entry.type ? ` diff-${entry.type}` : '';
        item.className = `diff-entry${typeClass}`;

        const header = document.createElement('div');
        header.className = 'diff-entry-header';

        const path = document.createElement('div');
        path.className = 'diff-path';
        path.textContent = pathText;
        header.appendChild(path);

        header.appendChild(createDiffStatusBadge(entry.type));
        item.appendChild(header);

        const changeGroup = document.createElement('div');
        changeGroup.className = 'diff-change-group';

        if (entry.type === 'changed') {
            changeGroup.classList.add('diff-change-group--split');
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeRemoved', 'Removed'),
                entry.before,
                'removed',
            ));
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeAdded', 'Added'),
                entry.after,
                'added',
            ));
        } else if (entry.type === 'added') {
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeAdded', 'Added'),
                entry.after,
                'added',
            ));
        } else if (entry.type === 'removed') {
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeRemoved', 'Removed'),
                entry.before,
                'removed',
            ));
        } else {
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeUpdated', 'Updated'),
                entry.after,
                'changed',
            ));
        }

        if (changeGroup.childNodes.length) {
            item.appendChild(changeGroup);
        }
        listEl.appendChild(item);
    });
}

function updateBackupDiffSummary(entries, summaryEl) {
    if (!summaryEl) return;
    if (!Array.isArray(entries) || !entries.length) {
        summaryEl.textContent = getDiffText('versionCompareIdentical', 'Versions match—no changes detected.');
        return;
    }
    const totals = { added: 0, removed: 0, changed: 0 };
    entries.forEach(entry => {
        if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
            totals[entry.type] += 1;
        }
    });
    const summaryText = formatDiffCount(entries.length);
    const breakdown = [];
    if (totals.added) {
        breakdown.push(formatDiffDetail('versionCompareSummaryAdded', totals.added));
    }
    if (totals.removed) {
        breakdown.push(formatDiffDetail('versionCompareSummaryRemoved', totals.removed));
    }
    if (totals.changed) {
        breakdown.push(formatDiffDetail('versionCompareSummaryChanged', totals.changed));
    }
    summaryEl.textContent = breakdown.length
        ? `${summaryText} (${breakdown.join(' · ')})`
        : summaryText;
}

export function clearBackupDiffResults(elements) {
    const { listEl, listContainerEl } = elements;
    if (listEl) listEl.innerHTML = '';
    if (listContainerEl) listContainerEl.hidden = true;
}

export function populateBackupDiffSelectors(elements) {
    const { primarySelectEl, secondarySelectEl, emptyStateEl, dataProvider } = elements;

    // Refresh options
    backupDiffOptionsCache = collectBackupDiffOptions(dataProvider);

    // Fill selects
    const primary = primarySelectEl;
    const secondary = secondarySelectEl;

    const fill = (select, opts, selected) => {
        if (!select) return;
        select.innerHTML = '<option value="">Select version...</option>';
        const fragment = document.createDocumentFragment();
        opts.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.value;
            el.textContent = opt.label;
            if (opt.value === selected) el.selected = true;
            fragment.appendChild(el);
        });
        select.appendChild(fragment);
    };

    fill(primary, backupDiffOptionsCache, backupDiffState.baseline);
    fill(secondary, backupDiffOptionsCache, backupDiffState.comparison);

    if (emptyStateEl) {
        emptyStateEl.hidden = backupDiffOptionsCache.length > 0;
    }

    renderBackupDiff(elements);
}

export function handleBackupDiffSelectionChange(event, elements) {
    const target = event && event.target ? event.target : null;
    if (!target) return;

    const value = target.value;
    if (target === elements.primarySelectEl) {
        backupDiffState.baseline = value;
    } else if (target === elements.secondarySelectEl) {
        backupDiffState.comparison = value;
    }
    renderBackupDiff(elements);
}

function getComparisonEntryType(name) {
    if (typeof name !== 'string') {
        return 'manual';
    }
    if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
        return 'auto-backup-before-delete';
    }
    if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
        return 'auto-backup';
    }
    return 'manual';
}

function cloneValueForExport(value) {
    if (value === undefined) return undefined;
    if (typeof structuredClone === 'function') return structuredClone(value);
    try {
        return JSON.parse(JSON.stringify(value));
    } catch (e) {
        return value;
    }
}

export function handleBackupDiffExport(elements) {
    const {
        summaryEl,
        exportButtonEl,
        notesEl,
    } = elements;

    if (!backupDiffOptionsCache.length) {
        showNotification('warning', getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.'));
        return;
    }
    const baseline = backupDiffState.baseline;
    const comparison = backupDiffState.comparison;
    if (!baseline || !comparison || baseline === comparison) {
        showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
        return;
    }
    const optionsMap = new Map(backupDiffOptionsCache.map(option => [option.value, option]));
    const baselineEntry = optionsMap.get(baseline);
    const comparisonEntry = optionsMap.get(comparison);
    if (!baselineEntry || !comparisonEntry) {
        showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
        return;
    }

    const diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
    const totals = { added: 0, removed: 0, changed: 0 };
    diffEntries.forEach(entry => {
        if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
            totals[entry.type] += 1;
        }
    });

    const note = notesEl && typeof notesEl.value === 'string'
        ? notesEl.value.trim()
        : '';

    const timestamp = new Date();
    const { iso } = formatFullBackupFilename(timestamp);
    const safeIso = iso.replace(/[:]/g, '-');
    const fileName = `cine-power-planner-version-log-${safeIso}.json`;


    // APP_VERSION? use normalized
    // We can assume '1.0.0' default

    const exportPayload = {
        type: 'cine-power-planner-version-log',
        version: 1,
        createdAt: new Date().toISOString(),
        appVersion: 'session-export', // Placeholder or pass in
        baseline: {
            id: baselineEntry.value,
            label: baselineEntry.label,
            type: getComparisonEntryType(baselineEntry.value),
            snapshot: cloneValueForExport(baselineEntry.data),
        },
        comparison: {
            id: comparisonEntry.value,
            label: comparisonEntry.label,
            type: getComparisonEntryType(comparisonEntry.value),
            snapshot: cloneValueForExport(comparisonEntry.data),
        },
        summary: {
            totalDifferences: diffEntries.length,
            added: totals.added,
            removed: totals.removed,
            updated: totals.changed,
        },
        differences: diffEntries.map(entry => ({
            type: entry.type,
            path: entry.path,
            before: entry.before,
            after: entry.after,
        })),
    };

    if (note) {
        exportPayload.note = note;
    }

    let serialized;
    try {
        serialized = JSON.stringify(exportPayload, null, 2);
    } catch (error) {
        console.warn('Failed to serialize comparison export payload', error);
        showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
        return;
    }

    // Download trigger
    const blob = new Blob([serialized], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('success', getDiffText('versionCompareExportSuccess', 'Comparison log exported.'));
}
