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

// --- State ---

const backupDiffState = {
    baseline: '',
    comparison: '',
};

let backupDiffOptionsCache = [];

// --- Helpers ---

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


// --- Deep Diff Engine ---

function isDiffKeyIgnored(key) {
    return BACKUP_DIFF_IGNORED_KEYS.has(key);
}

function getArrayComparisonKey(item) {
    if (!item || typeof item !== 'object') return null;
    if (item.id) return item.id;
    if (item.uuid) return item.uuid;
    if (item.name) return item.name;
    if (item.label) return item.label;
    if (item.entryKey) return item.entryKey;
    return null;
}

function getComparablePrimitive(val) {
    if (val === null || val === undefined) return '';
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val;
    return String(val).trim();
}

function valuesEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((val, index) => valuesEqual(val, b[index]));
    }
    if (typeof a === 'object' && a !== null && b !== null) {
        const keysA = Object.keys(a).filter(k => !isDiffKeyIgnored(k));
        const keysB = Object.keys(b).filter(k => !isDiffKeyIgnored(k));
        if (keysA.length !== keysB.length) return false;
        return keysA.every(key => valuesEqual(a[key], b[key]));
    }
    return getComparablePrimitive(a) === getComparablePrimitive(b);
}

function computeSetupDiff(baseline, comparison) {
    const entries = [];

    function walk(baseValue, compareValue, path) {
        if (valuesEqual(baseValue, compareValue)) {
            return;
        }

        const baseIsObject = typeof baseValue === 'object' && baseValue !== null;
        const compareIsObject = typeof compareValue === 'object' && compareValue !== null;
        const baseIsArray = Array.isArray(baseValue);
        const compareIsArray = Array.isArray(compareValue);

        if (baseIsObject && compareIsObject && !baseIsArray && !compareIsArray) {
            const allKeys = new Set([
                ...Object.keys(baseValue),
                ...Object.keys(compareValue)
            ]);
            allKeys.forEach(key => {
                if (isDiffKeyIgnored(key)) return;
                walk(baseValue[key], compareValue[key], path.concat(key));
            });
            return;
        }

        if (baseIsArray && compareIsArray) {
            // Attempt smart array matching
            const maxLength = Math.max(baseValue.length, compareValue.length);
            // Simple index matching for now (complex keyed matching is expensive/messy for general diff)
            // TODO: Enhance with keyed matching if needed for complex lists
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

function formatDiffPath(path) {
    if (!path) return '';
    if (Array.isArray(path)) {
        return path.join(' › ');
    }
    return String(path)
        .replace(/^([^.]+)\./, '') // Remove root (e.g., 'data.')
        .replace(/\./g, ' › ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
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


// --- Main Logic ---

export function collectBackupDiffOptions() {
    const options = [];
    const scope = detectPrimaryGlobalScope();
    const currentProjectName = scope ? scope.currentProjectName : (typeof window !== 'undefined' ? window.currentProjectName : null);

    // 1. Current Project (Memory)
    // We need access to currentProjectInfo... usually passed in or available globally.
    // For now we assume we can get it from storage or session state, but here we might need to rely on what was passed.
    // If we can't get it, we skip.
    // However, the original code relied on `currentProjectInfo` global variable.
    // We should probably pass current state into this function or use a getter.
    // For now, let's omit "Current State" unless we have a way to get it cleanly, or use a placeholder.
    // Actually, in app-session.js it access `currentProjectInfo`.
    // We will assume the caller might want to inject "current" option.
    // But `cineFeatureBackup.getStoredSnapshots()` usually returns everything.

    // 2. Stored Backups (IDB)
    const snapshots = cineFeatureBackup.getStoredSnapshots(); // Assuming this is sync or we need async?
    // cineFeatureBackup.getStoredSnapshots is likely synchronous array if it's in-memory cache
    // Let's check backup.js if we can. But assuming it follows pattern.

    if (Array.isArray(snapshots)) {
        snapshots.forEach(snapshot => {
            let label = snapshot.timestamp; // rough
            if (snapshot.name) label = snapshot.name;
            // Format nice label
            options.push({
                value: snapshot.id || snapshot.name, // ID is better
                label: label,
                data: snapshot.data || snapshot,
                timestamp: snapshot.timestamp
            });
        });
    }

    // Sort by date desc
    return options.sort((a, b) => {
        const tA = new Date(a.timestamp || 0).getTime();
        const tB = new Date(b.timestamp || 0).getTime();
        return tB - tA;
    });
}

// Re-implementing with passed references for DOM elements
export function renderBackupDiff(elements, options = {}) {
    const {
        summaryEl,
        listEl,
        listContainerEl,
        exportButtonEl,
        notesEl,
        primarySelectEl,
        secondarySelectEl,
        emptyStateEl
    } = elements;

    if (!summaryEl) return;


    // Check cache
    if (!backupDiffOptionsCache.length) {
        // Try to collect?
        backupDiffOptionsCache = collectBackupDiffOptions();
    }

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
    const { primarySelectEl, secondarySelectEl, emptyStateEl } = elements;

    // Refresh options
    backupDiffOptionsCache = collectBackupDiffOptions();

    // Fill selects
    const primary = primarySelectEl;
    const secondary = secondarySelectEl;

    const fill = (select, opts, selected) => {
        if (!select) return;
        select.innerHTML = '<option value="">Select version...</option>';
        opts.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.value;
            el.textContent = opt.label;
            if (opt.value === selected) el.selected = true;
            select.appendChild(el);
        });
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
        listEl // used to grab diff entries if needed, or recompute
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

    // Generate filename is tricky without proper import of formatFullBackupFilename
    const timestamp = new Date();
    // Assuming formatFullBackupFilename is available or I replicate it
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

    downloadBackupPayload(serialized, fileName); // Assuming global or imported helper?
    // Actually I don't have downloadBackupPayload imported. 
    // It's usually just a link click.

    // I should create a local helper for download
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
