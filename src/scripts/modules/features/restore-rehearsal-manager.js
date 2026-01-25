/**
 * Restore Rehearsal Manager
 *
 * Manages the "Restore Rehearsal" feature which allows users to preview and selectively restore
 * parts of a backup (projects, settings, gear) without overwriting everything.
 * Also handles "Backup Diff" visualization.
 *
 * Extracted from app-session.js.
 */

import {
    ensureSessionRuntimePlaceholder,
    resolveCompatibilityTexts,
    formatNumberForComparison,
    detectPrimaryGlobalScope
} from '../core/session-runtime.js';

import {
    isPlainObject
} from '../ui/ui-preferences.js';

// --- Constants ---

export const RESTORE_REHEARSAL_BACKUP_HINT_KEYS = [
    'data',
    'payload',
    'plannerData',
    'allData',
    'devices',
    'setups',
    'session',
    'sessions',
    'sessionStorage',
    'sessionState',
    'customLogo',
    'customFonts',
    'preferences',
    'schemaCache',
    'fullBackupHistory',
];

export const RESTORE_REHEARSAL_METRICS = [
    {
        key: 'projects',
        translationKey: 'restoreRehearsalMetricProjects',
        fallback: 'Projects',
        modes: ['backup', 'project'],
    },
    {
        key: 'projectDetails',
        translationKey: 'restoreRehearsalMetricProjectDetails',
        fallback: 'Project details',
        modes: ['backup', 'project'],
    },
    {
        key: 'projectCrew',
        translationKey: 'restoreRehearsalMetricCrew',
        fallback: 'Crew entries',
        modes: ['backup', 'project'],
    },
    {
        key: 'projectSchedules',
        translationKey: 'restoreRehearsalMetricSchedule',
        fallback: 'Schedule entries',
        modes: ['backup', 'project'],
    },
    {
        key: 'rules',
        translationKey: 'restoreRehearsalMetricRules',
        fallback: 'Rules',
        modes: ['backup', 'project'],
    },
    {
        key: 'favorites',
        translationKey: 'restoreRehearsalMetricFavorites',
        fallback: 'Favorites',
        modes: ['backup', 'project'],
    },
    {
        key: 'deviceLibrary',
        translationKey: 'restoreRehearsalMetricDeviceLibrary',
        fallback: 'Device library entries',
        modes: ['backup'],
    },
    {
        key: 'sessionSnapshots',
        translationKey: 'restoreRehearsalMetricSession',
        fallback: 'Stored session snapshot',
        modes: ['backup'],
    },
    {
        key: 'feedbackDrafts',
        translationKey: 'restoreRehearsalMetricFeedback',
        fallback: 'Feedback drafts',
        modes: ['backup'],
    },
    {
        key: 'autoGearPresets',
        translationKey: 'restoreRehearsalMetricAutoPresets',
        fallback: 'Automatic gear presets',
        modes: ['backup'],
    },
    {
        key: 'autoGearBackups',
        translationKey: 'restoreRehearsalMetricAutoBackups',
        fallback: 'Automatic gear backups',
        modes: ['backup'],
    },
    {
        key: 'fullBackupHistory',
        translationKey: 'restoreRehearsalMetricBackupHistory',
        fallback: 'Backup history entries',
        modes: ['backup'],
    },
    {
        key: 'customFonts',
        translationKey: 'restoreRehearsalMetricCustomFonts',
        fallback: 'Custom fonts',
        modes: ['backup'],
    },
    {
        key: 'customLogo',
        translationKey: 'restoreRehearsalMetricCustomLogo',
        fallback: 'Custom logo saved',
        modes: ['backup'],
    },
    {
        key: 'storedPreferences',
        translationKey: 'restoreRehearsalMetricPreferences',
        fallback: 'Stored preferences',
        modes: ['backup'],
    },
    {
        key: 'schemaCache',
        translationKey: 'restoreRehearsalMetricSchemaCache',
        fallback: 'Device schema cache',
        modes: ['backup'],
    },
];

export const RESTORE_REHEARSAL_PROJECT_HINT_KEYS = [
    'setupName',
    'camera',
    'monitor',
    'video',
    'cage',
    'distance',
    'batteryPlate',
    'battery',
    'batteryHotswap',
    'motors',
    'controllers',
    'project',
    'projectInfo',
    'projectHtml',
    'gearList',
    'gearSelectors',
    'autoGearRules',
    'favorites',
    'feedback',
    'changedDevices',
];

// --- State ---

let restoreRehearsalLastSnapshot = null;
let restoreRehearsalSandboxSnapshot = null;
let restoreRehearsalModeInputs = [];

// --- Helpers ---

const localeSort = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    }
    return 0;
};

export function createEmptyRestoreRehearsalCounts() {
    return RESTORE_REHEARSAL_METRICS.reduce((acc, metric) => {
        acc[metric.key] = 0;
        return acc;
    }, {});
}

export function countProjectsFromSetups(setups) {
    if (Array.isArray(setups)) {
        return setups.length;
    }
    if (isPlainObject(setups)) {
        return Object.keys(setups).length;
    }
    if (typeof setups === 'string' && setups.trim()) {
        return 1;
    }
    return 0;
}

export function countFavoritesEntries(favorites) {
    if (!isPlainObject(favorites)) return 0;
    return Object.values(favorites).reduce((count, entry) => {
        if (Array.isArray(entry)) {
            return count + entry.filter(Boolean).length;
        }
        if (isPlainObject(entry) && Array.isArray(entry.entries)) {
            return count + entry.entries.filter(Boolean).length;
        }
        return count;
    }, 0);
}

function projectInfoValueHasData(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return !Number.isNaN(value);
    if (typeof value === 'boolean') return value;
    if (Array.isArray(value)) {
        return value.some((item) => projectInfoValueHasData(item));
    }
    if (isPlainObject(value)) {
        return Object.keys(value).some((key) => projectInfoValueHasData(value[key]));
    }
    return false;
}

export function countCrewEntries(value) {
    if (!value) return 0;
    if (Array.isArray(value)) {
        return value.reduce((total, entry) => total + countCrewEntries(entry), 0);
    }
    if (typeof value === 'string') {
        return value
            .split(/\r?\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .length;
    }
    if (isPlainObject(value)) {
        if (Array.isArray(value.people)) {
            return countCrewEntries(value.people);
        }
        if (Array.isArray(value.entries)) {
            return countCrewEntries(value.entries);
        }
        if (typeof value.text === 'string') {
            return countCrewEntries(value.text);
        }
        if (
            typeof value.name === 'string'
            || typeof value.role === 'string'
            || typeof value.phone === 'string'
            || typeof value.email === 'string'
            || typeof value.website === 'string'
            || typeof value.text === 'string'
        ) {
            const name = typeof value.name === 'string' ? value.name.trim() : '';
            const role = typeof value.role === 'string' ? value.role.trim() : '';
            const phone = typeof value.phone === 'string' ? value.phone.trim() : '';
            const email = typeof value.email === 'string' ? value.email.trim() : '';
            const website = typeof value.website === 'string' ? value.website.trim() : '';
            const text = typeof value.text === 'string' ? value.text.trim() : '';
            return name || role || phone || email || website || text ? 1 : 0;
        }
        const nestedKeys = Object.keys(value).filter((key) => key !== '__html');
        if (nestedKeys.length) {
            return countCrewEntries(nestedKeys.map((key) => value[key]));
        }
    }
    return 0;
}

export function countScheduleEntries(value) {
    if (!value) return 0;
    if (Array.isArray(value)) {
        return value.reduce((total, entry) => total + countScheduleEntries(entry), 0);
    }
    if (typeof value === 'string') {
        return value
            .split(/\r?\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .length;
    }
    if (isPlainObject(value)) {
        if (Array.isArray(value.entries)) {
            return countScheduleEntries(value.entries);
        }
        if (typeof value.text === 'string') {
            return countScheduleEntries(value.text);
        }
        if (typeof value.label === 'string' || typeof value.value === 'string') {
            const label = typeof value.label === 'string' ? value.label.trim() : '';
            const val = typeof value.value === 'string' ? value.value.trim() : '';
            return label || val ? 1 : 0;
        }
        const nestedKeys = Object.keys(value).filter((key) => key !== '__html');
        if (nestedKeys.length) {
            return countScheduleEntries(nestedKeys.map((key) => value[key]));
        }
    }
    return 0;
}

export function summarizeProjectInfoStats(projectInfo) {
    if (typeof projectInfo === 'string') {
        try {
            const parsed = JSON.parse(projectInfo);
            if (isPlainObject(parsed)) {
                return summarizeProjectInfoStats(parsed);
            }
        } catch (parseError) {
            void parseError;
        }
    }

    if (!projectInfo || typeof projectInfo !== 'object' || Array.isArray(projectInfo)) {
        const hasDetails = projectInfoValueHasData(projectInfo);
        return {
            details: hasDetails ? 1 : 0,
            crew: 0,
            schedule: 0,
            hasDetails,
        };
    }

    let details = 0;
    let crew = 0;
    let schedule = 0;
    let hasDetails = false;

    Object.entries(projectInfo).forEach(([key, value]) => {
        if (key === 'projectName') return;
        if (projectInfoValueHasData(value)) {
            details += 1;
            hasDetails = true;
        }
        if (key === 'crew' || key === 'people') {
            const crewCount = countCrewEntries(value);
            if (crewCount > 0) {
                crew += crewCount;
                hasDetails = true;
            }
        }
        if (key === 'prepDays' || key === 'shootingDays' || key === 'returnDays') {
            const scheduleCount = countScheduleEntries(value);
            if (scheduleCount > 0) {
                schedule += scheduleCount;
                hasDetails = true;
            }
        }
    });

    return { details, crew, schedule, hasDetails };
}

export function summarizeProjectCollection(collection) {
    const result = {
        details: 0,
        crew: 0,
        schedule: 0,
        hasProjectInfo: false,
    };

    if (!collection) {
        return result;
    }

    const entries = Array.isArray(collection)
        ? collection
        : isPlainObject(collection)
            ? Object.values(collection)
            : [];

    entries.forEach((entry) => {
        if (!entry) return;
        let info = null;
        if (isPlainObject(entry) && Object.prototype.hasOwnProperty.call(entry, 'projectInfo')) {
            info = entry.projectInfo;
        } else if (
            isPlainObject(entry)
            && isPlainObject(entry.project)
            && Object.prototype.hasOwnProperty.call(entry.project, 'projectInfo')
        ) {
            info = entry.project.projectInfo;
        }
        if (!info) return;
        if (!result.hasProjectInfo) {
            result.hasProjectInfo = true;
        }
        const stats = summarizeProjectInfoStats(info);
        if (stats.hasDetails) {
            result.hasProjectInfo = true;
        }
        result.details += stats.details;
        result.crew += stats.crew;
        result.schedule += stats.schedule;
    });

    return result;
}

function countRestoreRehearsalDeviceEntries(devices) {
    if (!devices || typeof devices !== 'object') return 0;
    return Object.keys(devices).length;
}

function countRestoreRehearsalFeedbackDrafts(feedback) {
    if (!feedback || typeof feedback !== 'object') return 0;
    return Object.keys(feedback).length;
}

export function summarizeCountsFromData(data) {
    const counts = createEmptyRestoreRehearsalCounts();
    const setups = isPlainObject(data) && isPlainObject(data.setups) ? data.setups : {};
    const rules = isPlainObject(data) && Array.isArray(data.autoGearRules)
        ? data.autoGearRules
        : [];
    const favorites = isPlainObject(data) && isPlainObject(data.favorites)
        ? data.favorites
        : {};
    const storedProjects = isPlainObject(data) ? summarizeProjectCollection(data.project) : {
        details: 0,
        crew: 0,
        schedule: 0,
        hasProjectInfo: false,
    };
    const setupProjects = summarizeProjectCollection(setups);
    const projectDetails = Math.max(storedProjects.details, setupProjects.details);
    const projectCrew = Math.max(storedProjects.crew, setupProjects.crew);
    const projectSchedule = Math.max(storedProjects.schedule, setupProjects.schedule);
    counts.projects = countProjectsFromSetups(setups);
    counts.projectDetails = projectDetails;
    counts.projectCrew = projectCrew;
    counts.projectSchedules = projectSchedule;
    counts.rules = rules.length;
    counts.favorites = countFavoritesEntries(favorites);
    counts.deviceLibrary = countRestoreRehearsalDeviceEntries(isPlainObject(data) ? data.devices : null);
    const sessionState = isPlainObject(data) ? data.session : null;
    counts.sessionSnapshots = isPlainObject(sessionState) && Object.keys(sessionState).length ? 1 : 0;
    counts.feedbackDrafts = countRestoreRehearsalFeedbackDrafts(isPlainObject(data) ? data.feedback : null);
    counts.autoGearPresets = Array.isArray(data?.autoGearPresets)
        ? data.autoGearPresets.filter(Boolean).length
        : 0;
    counts.autoGearBackups = Array.isArray(data?.autoGearBackups)
        ? data.autoGearBackups.filter(Boolean).length
        : 0;
    counts.fullBackupHistory = Array.isArray(data?.fullBackupHistory)
        ? data.fullBackupHistory.filter(Boolean).length
        : 0;
    counts.customFonts = Array.isArray(data?.customFonts)
        ? data.customFonts.filter((entry) => {
            if (!entry) return false;
            if (typeof entry === 'string') {
                return entry.trim().length > 0;
            }
            if (isPlainObject(entry)) {
                return Object.keys(entry).length > 0;
            }
            return false;
        }).length
        : 0;
    counts.customLogo = typeof data?.customLogo === 'string' && data.customLogo.trim() ? 1 : 0;
    const storedPreferences = isPlainObject(data?.preferences) ? data.preferences : null;
    counts.storedPreferences = storedPreferences && Object.keys(storedPreferences).length ? 1 : 0;
    const schemaCache = data?.schemaCache;
    if (typeof schemaCache === 'string') {
        counts.schemaCache = schemaCache.trim() ? 1 : 0;
    } else if (isPlainObject(schemaCache)) {
        counts.schemaCache = Object.keys(schemaCache).length ? 1 : 0;
    }
    return counts;
}

export function bundleHasProject(bundle) {
    if (!isPlainObject(bundle)) return false;
    if (typeof bundle.setupName === 'string' && bundle.setupName.trim()) return true;
    if (typeof bundle.projectHtml === 'string' && bundle.projectHtml.trim()) return true;
    if (typeof bundle.gearList === 'string' && bundle.gearList.trim()) return true;
    if (isPlainObject(bundle.projectInfo) && Object.keys(bundle.projectInfo).length) return true;
    if (isPlainObject(bundle.gearSelectors) && Object.keys(bundle.gearSelectors).length) return true;
    const deviceFields = [
        'camera',
        'monitor',
        'video',
        'cage',
        'distance',
        'batteryPlate',
        'battery',
        'batteryHotswap',
    ];
    if (deviceFields.some((field) => typeof bundle[field] === 'string' && bundle[field].trim())) {
        return true;
    }
    if (Array.isArray(bundle.motors) && bundle.motors.some(Boolean)) return true;
    if (Array.isArray(bundle.controllers) && bundle.controllers.some(Boolean)) return true;
    return false;
}

export function hasAnyRestoreRehearsalKeys(source, keys) {
    if (!isPlainObject(source)) {
        return false;
    }
    for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            return true;
        }
    }
    return false;
}

export function looksLikeRestoreRehearsalProjectBundle(bundle) {
    if (!isPlainObject(bundle)) {
        return false;
    }
    if (bundleHasProject(bundle)) {
        return true;
    }
    if (hasAnyRestoreRehearsalKeys(bundle, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
        return true;
    }
    const nestedProject = isPlainObject(bundle.project) ? bundle.project : null;
    if (hasAnyRestoreRehearsalKeys(nestedProject, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
        return true;
    }
    return false;
}

export function looksLikeRestoreRehearsalBackupPayload(payload) {
    if (!isPlainObject(payload)) {
        return false;
    }
    if (hasAnyRestoreRehearsalKeys(payload, RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
        return true;
    }
    const candidateKeys = ['data', 'payload', 'plannerData', 'allData'];
    for (let i = 0; i < candidateKeys.length; i += 1) {
        const key = candidateKeys[i];
        if (hasAnyRestoreRehearsalKeys(payload[key], RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
            return true;
        }
    }
    return false;
}

export function summarizeProjectBundle(bundle) {
    const summary = createEmptyRestoreRehearsalCounts();
    if (!isPlainObject(bundle)) {
        return summary;
    }
    const favorites = isPlainObject(bundle.favorites) ? bundle.favorites : {};
    let projectInfo = null;
    if (isPlainObject(bundle.projectInfo) || typeof bundle.projectInfo === 'string') {
        projectInfo = bundle.projectInfo;
    } else if (isPlainObject(bundle.project) && (isPlainObject(bundle.project.projectInfo) || typeof bundle.project.projectInfo === 'string')) {
        projectInfo = bundle.project.projectInfo;
    }
    const projectStats = summarizeProjectInfoStats(projectInfo);
    summary.projects = bundleHasProject(bundle) ? 1 : 0;
    summary.projectDetails = projectStats.details;
    summary.projectCrew = projectStats.crew;
    summary.projectSchedules = projectStats.schedule;
    summary.rules = Array.isArray(bundle.autoGearRules) ? bundle.autoGearRules.length : 0;
    summary.favorites = countFavoritesEntries(favorites);
    return summary;
}

// --- Live Snapshot Management ---

export function setRestoreRehearsalLastSnapshot(snapshot) {
    restoreRehearsalLastSnapshot = snapshot;
}

export function getRestoreRehearsalLiveSnapshot() {
    return restoreRehearsalLastSnapshot;
}

export function getRestoreRehearsalLiveCounts() {
    const snapshot = getRestoreRehearsalLiveSnapshot();
    return snapshot && snapshot.counts ? snapshot.counts : {};
}

// --- Sandbox Snapshot Management ---

export function setRestoreRehearsalSandboxSnapshot(snapshot) {
    restoreRehearsalSandboxSnapshot = snapshot;
}

export function getRestoreRehearsalSandboxSnapshot() {
    return restoreRehearsalSandboxSnapshot;
}

export function getRestoreRehearsalSandboxCounts() {
    const snapshot = getRestoreRehearsalSandboxSnapshot();
    return snapshot && snapshot.counts ? snapshot.counts : {};
}

// --- UI Logic ---

export function updateRestoreRehearsalUI(elements) {
    const {
        statusEl,
        tableEl,
        tableBodyEl,
        proceedButtonEl,
        fileNameEl,
        ruleSectionEl,
        ruleListEl,
        ruleEmptyEl,
        actionsEl
    } = elements;

    // Resolve language texts
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};

    const liveCounts = getRestoreRehearsalLiveCounts();
    const sandboxCounts = getRestoreRehearsalSandboxCounts();
    const mode = getSelectedRestoreRehearsalMode();

    const rows = buildRestoreRehearsalRows(liveCounts, sandboxCounts, { mode });

    if (tableBodyEl) {
        tableBodyEl.innerHTML = '';
        rows.forEach((row) => {
            const tr = document.createElement('tr');
            const tdLabel = document.createElement('td');
            tdLabel.textContent = row.label;
            tr.appendChild(tdLabel);

            const tdLive = document.createElement('td');
            tdLive.textContent = formatNumberForComparison(row.live);
            tr.appendChild(tdLive);

            const tdSandbox = document.createElement('td');
            tdSandbox.textContent = formatNumberForComparison(row.sandbox);
            tr.appendChild(tdSandbox);

            const tdDiff = document.createElement('td');
            const diffVal = row.diff;
            if (diffVal > 0) {
                tdDiff.textContent = `+${formatNumberForComparison(diffVal)}`;
                tdDiff.className = 'diff-positive';
            } else if (diffVal < 0) {
                tdDiff.textContent = formatNumberForComparison(diffVal);
                tdDiff.className = 'diff-negative';
            } else {
                tdDiff.textContent = '-';
                tdDiff.className = 'diff-neutral';
            }
            tr.appendChild(tdDiff);
            tableBodyEl.appendChild(tr);
        });
    }

    if (tableEl && tableEl.hasAttribute('hidden')) {
        tableEl.removeAttribute('hidden');
    }

    // Rule Diff
    const liveRules = getRestoreRehearsalLiveSnapshot()?.rules || [];
    const sandboxRules = getRestoreRehearsalSandboxSnapshot()?.rules || [];
    const ruleDifferences = buildRestoreRehearsalRuleDiff(liveRules, sandboxRules);

    renderRestoreRehearsalRuleDiff(ruleDifferences, {
        ruleSectionEl,
        ruleListEl,
        ruleEmptyEl,
        actionsEl
    });

    if (proceedButtonEl) {
        proceedButtonEl.disabled = false;
    }

    if (statusEl) {
        statusEl.textContent = langTexts.restoreRehearsalReady || 'Review changes before restoring.';
    }
}

// --- Mode Selection ---

export function registerRestoreRehearsalModeInputs(inputs) {
    restoreRehearsalModeInputs = Array.isArray(inputs) ? inputs : [];
}

export function getSelectedRestoreRehearsalMode() {
    if (!Array.isArray(restoreRehearsalModeInputs) || !restoreRehearsalModeInputs.length) {
        return 'backup';
    }
    const selected = restoreRehearsalModeInputs.find((input) => input && input.checked);
    return selected && typeof selected.value === 'string' ? selected.value : 'backup';
}

// --- UI Rendering Builders ---

export function buildRestoreRehearsalRows(liveCounts, sandboxCounts, options = {}) {
    // Resolve language texts
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';

    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};

    const mode = typeof options.mode === 'string' ? options.mode : 'backup';
    const metrics = RESTORE_REHEARSAL_METRICS
        .filter((metric) => metric.modes.includes(mode))
        .map((metric) => ({
            key: metric.key,
            label: langTexts[metric.translationKey] || metric.fallback,
        }));
    return metrics.map((metric) => {
        const live = typeof liveCounts[metric.key] === 'number' ? liveCounts[metric.key] : 0;
        const sandbox = typeof sandboxCounts[metric.key] === 'number' ? sandboxCounts[metric.key] : 0;
        return {
            key: metric.key,
            label: metric.label,
            live,
            sandbox,
            diff: sandbox - live,
        };
    });
}

// --- Helpers ---

function getDiffText(key, fallback) {
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};
    return langTexts[key] || (texts.en ? texts.en[key] : fallback) || fallback;
}

export function createDiffStatusBadge(type) {
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

export function renderRestoreRehearsalRuleDiff(differences, elements) {
    const {
        ruleSectionEl,
        ruleListEl,
        ruleEmptyEl,
        actionsEl
    } = elements;

    if (!ruleSectionEl || !ruleListEl || !ruleEmptyEl) {
        return;
    }

    const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';


    ruleListEl.innerHTML = '';
    const hasDifferences = Array.isArray(differences) && differences.length > 0;
    if (!hasDifferences) {
        if (ruleEmptyEl) {
            ruleEmptyEl.textContent = langTexts.restoreRehearsalRuleEmpty
                || fallbackTexts.restoreRehearsalRuleEmpty
                || 'No automatic gear rule differences found.';
            ruleEmptyEl.removeAttribute('hidden');
        }
        ruleSectionEl.removeAttribute('hidden');
        if (actionsEl) {
            actionsEl.removeAttribute('hidden');
        }
        return;
    }
    ruleEmptyEl.setAttribute('hidden', '');
    const liveTitle = langTexts.restoreRehearsalLiveColumn
        || fallbackTexts.restoreRehearsalLiveColumn
        || 'Live profile';
    const sandboxTitle = langTexts.restoreRehearsalSandboxColumn
        || fallbackTexts.restoreRehearsalSandboxColumn
        || 'Sandbox import';
    const emptyText = langTexts.restoreRehearsalRuleNone
        || fallbackTexts.restoreRehearsalRuleNone
        || 'None';

    differences.forEach((entry) => {
        if (!entry) return;
        const item = document.createElement('li');
        const typeClass = entry.status ? ` diff-${entry.status}` : '';
        item.className = `diff-entry${typeClass}`;

        const header = document.createElement('div');
        header.className = 'diff-entry-header';

        const path = document.createElement('div');
        path.className = 'diff-path';
        const fallbackLabel = entry.label
            || entry.sandbox?.displayName
            || entry.live?.displayName
            || langTexts.restoreRehearsalRuleFallback
            || fallbackTexts.restoreRehearsalRuleFallback
            || 'Automatic rule change';
        path.textContent = fallbackLabel;
        header.appendChild(path);

        header.appendChild(createDiffStatusBadge(entry.status || 'changed'));
        item.appendChild(header);

        const columns = document.createElement('div');
        columns.className = 'restore-rehearsal-rule-columns';
        if (entry.status === 'changed') {
            columns.classList.add('restore-rehearsal-rule-columns--split');
        }

        if (entry.live) {
            const variant = entry.status === 'added' ? null : 'removed';
            columns.appendChild(createRestoreRehearsalRuleColumn(liveTitle, entry.live, variant, langTexts, fallbackTexts, emptyText, texts, currentLang));
        }
        if (entry.sandbox) {
            const variant = entry.status === 'removed' ? null : 'added';
            columns.appendChild(createRestoreRehearsalRuleColumn(sandboxTitle, entry.sandbox, variant, langTexts, fallbackTexts, emptyText, texts, currentLang));
        }

        item.appendChild(columns);
        ruleListEl.appendChild(item);
    });
}


// --- Backup Diff UI ---

function createDiffValueElement(value, variant) {
    const element = document.createElement('span');
    element.className = 'diff-value';
    if (variant) {
        element.classList.add(`diff-value-${variant}`);
    }
    if (value === null || value === undefined) {
        element.textContent = '(empty)';
        element.classList.add('diff-value-empty');
        return element;
    }
    if (typeof value === 'boolean') {
        element.textContent = value ? 'True' : 'False';
        return element;
    }
    if (typeof value === 'object') {
        if (Object.keys(value).length === 0) {
            element.textContent = '(empty object)';
            element.classList.add('diff-value-empty');
            return element;
        }
        // Fallback for simple objects
        element.textContent = String(value);
        return element;
    }
    element.textContent = String(value);
    return element;
}

export function formatDiffPath(path) {
    if (!path) return '';
    return path
        .replace(/^([^.]+)\./, '') // Remove root (e.g., 'data.')
        .replace(/\./g, ' › ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

export function sortDiffEntries(entries) {
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

export function renderBackupDiffEntries(entries, elements) {
    const { listEl, containerEl } = elements;

    if (!listEl || !containerEl) {
        return;
    }
    listEl.innerHTML = '';
    if (!Array.isArray(entries) || !entries.length) {
        containerEl.hidden = true;
        return;
    }
    containerEl.hidden = false;
    const decoratedEntries = sortDiffEntries(entries);
    decoratedEntries.forEach(({ entry, pathText }) => {
        if (!entry) {
            return;
        }
        const item = document.createElement('li');
        const typeClass = entry.type ? ` diff-${entry.type}` : '';
        item.className = `diff-entry${typeClass}`;

        const header = document.createElement('div');
        header.className = 'diff-entry-header';

        const path = document.createElement('div');
        path.className = 'diff-path';
        path.textContent = pathText;
        header.appendChild(path);

        header.appendChild(createDiffStatusBadge(entry.type || 'changed'));
        item.appendChild(header);

        const changeGroup = document.createElement('div');
        changeGroup.className = 'diff-change-group';

        if (entry.type === 'changed') {
            changeGroup.classList.add('diff-change-group--split');
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeRemoved', 'Removed'),
                entry.oldValue || entry.before,
                'removed',
            ));
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeAdded', 'Added'),
                entry.newValue || entry.after,
                'added',
            ));
        } else if (entry.type === 'added') {
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeAdded', 'Added'),
                entry.newValue || entry.after,
                'added',
            ));
        } else if (entry.type === 'removed') {
            changeGroup.appendChild(createDiffChangeBlock(
                getDiffText('versionCompareChangeRemoved', 'Removed'),
                entry.oldValue || entry.before,
                'removed',
            ));
        }

        if (changeGroup.childNodes.length) {
            item.appendChild(changeGroup);
        }

        listEl.appendChild(item);
    });
}


export function formatDiffCount(count) {
    const key = count === 1
        ? 'versionCompareDifferencesCountOne'
        : 'versionCompareDifferencesCountOther';
    const template = getDiffText(key, count === 1 ? '%s difference noted.' : '%s differences noted.');
    return template.replace('%s', formatNumberForComparison(count));
}

export function formatDiffDetail(key, count) {
    const template = getDiffText(key, '%s');
    return template.replace('%s', formatNumberForComparison(count));
}

export function updateBackupDiffSummary(entries, summaryEl) {
    if (!summaryEl) {
        return;
    }
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

function normalizeRestoreRehearsalScenarioLogic(value) {
    if (typeof value !== 'string') {
        return 'all';
    }
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
        return 'all';
    }
    if (normalized === 'any' || normalized === 'or') {
        return 'any';
    }
    if (normalized === 'multiplier' || normalized === 'multiply') {
        return 'multiplier';
    }
    return 'all';
}

function normalizeRestoreRehearsalScenarioMultiplier(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed) {
            const parsed = Number(trimmed);
            if (Number.isFinite(parsed)) {
                return parsed;
            }
        }
    }
    return 1;
}

function normalizeRestoreRehearsalRuleItems(items) {
    if (!Array.isArray(items)) {
        return [];
    }
    const normalizedItems = items
        .map((item) => {
            if (!isPlainObject(item)) return null;
            const name = typeof item.name === 'string' ? item.name.trim() : '';
            if (!name) return null;
            const category = typeof item.category === 'string' ? item.category.trim() : '';
            let quantity = 1;
            if (typeof item.quantity === 'number' && Number.isFinite(item.quantity)) {
                quantity = item.quantity;
            } else if (typeof item.quantity === 'string') {
                const trimmedQuantity = item.quantity.trim();
                if (trimmedQuantity) {
                    const parsedQuantity = Number(trimmedQuantity);
                    if (Number.isFinite(parsedQuantity)) {
                        quantity = parsedQuantity;
                    }
                }
            }
            const notes = typeof item.notes === 'string' ? item.notes.trim() : '';
            const screenSize = typeof item.screenSize === 'string' ? item.screenSize.trim() : '';
            const selectorType = typeof item.selectorType === 'string' ? item.selectorType.trim() : '';
            const selectorDefault = typeof item.selectorDefault === 'string' ? item.selectorDefault.trim() : '';
            const selectorEnabled = Boolean(item.selectorEnabled);
            const contextNotes = Array.isArray(item.contextNotes)
                ? item.contextNotes
                    .map((note) => (typeof note === 'string' ? note.trim() : ''))
                    .filter(Boolean)
                : [];
            contextNotes.sort((a, b) => {
                if (typeof a === 'string' && typeof b === 'string') {
                    return a.localeCompare(b);
                }
                return 0;
            });
            const normalized = {
                id: typeof item.id === 'string' ? item.id : '',
                name,
                category,
                quantity,
                notes,
                screenSize,
                selectorType,
                selectorDefault,
                selectorEnabled,
                contextNotes,
            };
            const signatureSource = {
                name,
                category,
                quantity,
                notes,
                screenSize,
                selectorType,
                selectorDefault,
                selectorEnabled,
                contextNotes,
            };
            normalized.signature = JSON.stringify(signatureSource);
            return normalized;
        })
        .filter(Boolean);
    normalizedItems.sort((a, b) => {
        const categoryA = a.category || '';
        const categoryB = b.category || '';
        if (categoryA !== categoryB) {
            return categoryA.localeCompare(categoryB);
        }
        return a.name.localeCompare(b.name);
    });
    return normalizedItems;
}

export function formatRestoreRehearsalRuleItem(item) {
    if (!item) {
        return '';
    }
    const quantity = item.quantity;
    const hasQuantity = quantity !== undefined && quantity !== null && quantity !== 1;
    const displayQuantity = hasQuantity ? ` ×${formatNumberForComparison(quantity)}` : '';
    const categorySuffix = item.category ? ` (${item.category})` : '';
    const notesSuffix = item.notes ? ` — ${item.notes}` : '';
    const contextSuffix = Array.isArray(item.contextNotes) && item.contextNotes.length
        ? ` (${item.contextNotes.join(', ')})`
        : '';
    const screenSuffix = item.screenSize ? ` [${item.screenSize}]` : '';
    const selectorParts = [];
    if (item.selectorType && item.selectorType !== 'none') {
        selectorParts.push(item.selectorType);
    }
    if (item.selectorDefault) {
        selectorParts.push(item.selectorDefault);
    }
    const selectorSuffix = selectorParts.length ? ` {${selectorParts.join(': ')}}` : '';
    return `${item.name}${categorySuffix}${displayQuantity}${notesSuffix}${contextSuffix}${screenSuffix}${selectorSuffix}`;
}

function normalizeRestoreRehearsalRule(rule, index, origin) {
    if (!isPlainObject(rule)) {
        return null;
    }
    const normalized = {
        id: typeof rule.id === 'string' ? rule.id : '',
        label: typeof rule.label === 'string' ? rule.label.trim() : '',
        always: Boolean(rule.always),
    };
    normalized.scenarioLogic = normalizeRestoreRehearsalScenarioLogic(rule.scenarioLogic);
    normalized.scenarioMultiplier = normalizeRestoreRehearsalScenarioMultiplier(rule.scenarioMultiplier);
    if (normalized.scenarioLogic !== 'multiplier') {
        normalized.scenarioMultiplier = 1;
    }
    normalized.scenarioPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary.trim() : '';
    const scenarios = Array.isArray(rule.scenarios)
        ? rule.scenarios
            .map((value) => (typeof value === 'string' ? value.trim() : ''))
            .filter(Boolean)
        : [];
    const scenarioSet = new Set(scenarios);
    normalized.scenarios = Array.from(scenarioSet).sort((a, b) => a.localeCompare(b));
    normalized.addItems = normalizeRestoreRehearsalRuleItems(rule.add);
    normalized.removeItems = normalizeRestoreRehearsalRuleItems(rule.remove);
    const addSignatures = normalized.addItems.map((item) => item.signature).sort();
    const removeSignatures = normalized.removeItems.map((item) => item.signature).sort();
    normalized.signature = JSON.stringify({
        always: normalized.always,
        scenarioLogic: normalized.scenarioLogic,
        scenarioPrimary: normalized.scenarioPrimary,
        scenarioMultiplier: normalized.scenarioMultiplier,
        scenarios: normalized.scenarios,
        add: addSignatures,
        remove: removeSignatures,
    });
    const fallbackParts = [
        normalized.label.toLowerCase(),
        normalized.scenarios.join('|').toLowerCase(),
        normalized.addItems.map((item) => item.name.toLowerCase()).join('|'),
        normalized.removeItems.map((item) => item.name.toLowerCase()).join('|'),
    ].filter(Boolean);
    const fallbackSignature = fallbackParts.join('::');
    normalized.matchKey = normalized.id
        ? `id:${normalized.id}`
        : fallbackSignature
            ? `fallback:${fallbackSignature}`
            : `index:${origin}:${index}`;
    normalized.entryKey = `${normalized.matchKey}|${origin}|${index}`;
    if (normalized.label) {
        normalized.displayName = normalized.label;
    } else if (normalized.scenarios.length) {
        normalized.displayName = normalized.scenarios.join(' + ');
    } else if (normalized.id) {
        normalized.displayName = normalized.id;
    } else {
        normalized.displayName = `Rule ${index + 1}`;
    }
    return normalized;
}

export function normalizeRestoreRehearsalRules(value, origin = 'sandbox') {
    if (!Array.isArray(value)) {
        return [];
    }
    return value
        .map((rule, index) => normalizeRestoreRehearsalRule(rule, index, origin))
        .filter(Boolean);
}

function indexRestoreRehearsalRules(rules) {
    const map = new Map();
    if (!Array.isArray(rules)) {
        return map;
    }
    rules.forEach((rule) => {
        if (!rule || !rule.matchKey) return;
        const bucket = map.get(rule.matchKey);
        if (bucket) {
            bucket.push(rule);
        } else {
            map.set(rule.matchKey, [rule]);
        }
    });
    return map;
}

export function buildRestoreRehearsalRuleDiff(liveRules, sandboxRules) {
    const liveList = Array.isArray(liveRules) ? liveRules : [];
    const sandboxList = Array.isArray(sandboxRules) ? sandboxRules : [];
    const liveIndex = indexRestoreRehearsalRules(liveList);
    const unmatchedLive = new Set(liveList.filter(Boolean));
    const differences = [];

    sandboxList.forEach((sandboxRule) => {
        if (!sandboxRule) return;
        let liveRule = null;
        const bucket = sandboxRule.matchKey ? liveIndex.get(sandboxRule.matchKey) : null;
        if (bucket && bucket.length) {
            liveRule = bucket.shift();
            if (!bucket.length) {
                liveIndex.delete(sandboxRule.matchKey);
            }
        }
        if (liveRule) {
            unmatchedLive.delete(liveRule);
            if (liveRule.signature !== sandboxRule.signature) {
                differences.push({
                    status: 'changed',
                    label: sandboxRule.displayName || liveRule.displayName,
                    live: liveRule,
                    sandbox: sandboxRule,
                    key: `changed:${sandboxRule.entryKey}`,
                });
            }
        } else {
            differences.push({
                status: 'added',
                label: sandboxRule.displayName,
                live: null,
                sandbox: sandboxRule,
                key: `added:${sandboxRule.entryKey}`,
            });
        }
    });

    unmatchedLive.forEach((liveRule) => {
        if (!liveRule) return;
        differences.push({
            status: 'removed',
            label: liveRule.displayName,
            live: liveRule,
            sandbox: null,
            key: `removed:${liveRule.entryKey}`,
        });
    });

    const compareStrings = (a, b) => localeSort(a, b);

    const statusPriority = {
        changed: 0,
        removed: 1,
        added: 2,
    };

    return differences.sort((a, b) => {
        const priorityA = statusPriority[a.status] ?? Number.MAX_SAFE_INTEGER;
        const priorityB = statusPriority[b.status] ?? Number.MAX_SAFE_INTEGER;
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return compareStrings(a.label || '', b.label || '');
    });
}

function formatRestoreRehearsalRuleScenarioLines(rule, langTexts, fallbackTexts, texts, currentLang) {
    if (!rule) {
        return [];
    }
    const resolvedFallback = fallbackTexts || {};

    const logicLabel = langTexts.restoreRehearsalRuleLogicLabel
        || resolvedFallback.restoreRehearsalRuleLogicLabel
        || 'Scenario logic';
    const baseLabel = langTexts.restoreRehearsalRuleBaseLabel
        || resolvedFallback.restoreRehearsalRuleBaseLabel
        || 'Base scenario';
    const multiplierLabel = langTexts.restoreRehearsalRuleMultiplierLabel
        || resolvedFallback.restoreRehearsalRuleMultiplierLabel
        || 'Multiplier';
    const requiredLabel = langTexts.restoreRehearsalRuleRequiredLabel
        || texts[currentLang]?.projectFields?.requiredScenarios
        || resolvedFallback.projectFields?.requiredScenarios
        || 'Required scenarios';
    const alwaysLabel = langTexts.restoreRehearsalRuleAlwaysLabel
        || resolvedFallback.restoreRehearsalRuleAlwaysLabel
        || 'Always active';
    const noneLabel = langTexts.restoreRehearsalRuleNone
        || resolvedFallback.restoreRehearsalRuleNone
        || 'None';

    let logicText = resolvedFallback.autoGearScenarioModeAll || 'Require every selected scenario';
    if (rule.scenarioLogic === 'any') {
        logicText = texts[currentLang]?.autoGearScenarioModeAny
            || resolvedFallback.autoGearScenarioModeAny
            || 'Match any selected scenario';
    } else if (rule.scenarioLogic === 'multiplier') {
        logicText = texts[currentLang]?.autoGearScenarioModeMultiplier
            || resolvedFallback.autoGearScenarioModeMultiplier
            || 'Multiply when combined';
    } else {
        logicText = texts[currentLang]?.autoGearScenarioModeAll
            || resolvedFallback.autoGearScenarioModeAll
            || 'Require every selected scenario';
    }

    const lines = [`${logicLabel}: ${logicText}`];

    if (rule.scenarioPrimary) {
        lines.push(`${baseLabel}: ${rule.scenarioPrimary}`);
    }

    if (rule.scenarioLogic === 'multiplier' && rule.scenarioMultiplier !== 1) {
        lines.push(`${multiplierLabel}: ×${formatNumberForComparison(rule.scenarioMultiplier)}`);
    }

    if (rule.scenarios && rule.scenarios.length) {
        lines.push(`${requiredLabel}: ${rule.scenarios.join(' + ')}`);
    } else {
        lines.push(`${requiredLabel}: ${noneLabel}`);
    }

    if (rule.always) {
        lines.push(alwaysLabel);
    }

    return lines;
}

// --- UI Rendering ---

function createRestoreRehearsalRuleList(entries, emptyText) {
    const list = document.createElement('ul');
    list.className = 'restore-rehearsal-rule-list';
    const lines = Array.isArray(entries) ? entries.filter((line) => typeof line === 'string' && line.trim()) : [];
    if (!lines.length) {
        const emptyItem = document.createElement('li');
        emptyItem.textContent = emptyText;
        list.appendChild(emptyItem);
        return list;
    }
    lines.forEach((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        list.appendChild(item);
    });
    return list;
}

function createRestoreRehearsalRuleSection(label, entries, emptyText) {
    const section = document.createElement('div');
    section.className = 'restore-rehearsal-rule-section';
    const heading = document.createElement('span');
    heading.className = 'restore-rehearsal-rule-section-label';
    heading.textContent = label;
    section.appendChild(heading);
    section.appendChild(createRestoreRehearsalRuleList(entries, emptyText));
    return section;
}

function createRestoreRehearsalRuleColumn(title, rule, variant, langTexts, fallbackTexts, emptyText, texts, currentLang) {
    const column = document.createElement('div');
    column.className = 'restore-rehearsal-rule-column';
    if (variant) {
        column.classList.add(`restore-rehearsal-rule-column--${variant}`);
    }
    const heading = document.createElement('div');
    heading.className = 'restore-rehearsal-rule-column-title';
    heading.textContent = title;
    column.appendChild(heading);

    const additions = rule ? rule.addItems.map((item) => formatRestoreRehearsalRuleItem(item)).filter(Boolean) : [];
    const resolvedFallback = fallbackTexts || {};

    column.appendChild(createRestoreRehearsalRuleSection(
        langTexts.restoreRehearsalRuleAddsLabel
        || resolvedFallback.restoreRehearsalRuleAddsLabel
        || 'Automatic additions',
        additions,
        emptyText,
    ));

    const removals = rule ? rule.removeItems.map((item) => formatRestoreRehearsalRuleItem(item)).filter(Boolean) : [];
    column.appendChild(createRestoreRehearsalRuleSection(
        langTexts.restoreRehearsalRuleRemovesLabel
        || resolvedFallback.restoreRehearsalRuleRemovesLabel
        || 'Automatic removals',
        removals,
        emptyText,
    ));

    const scenarioLines = formatRestoreRehearsalRuleScenarioLines(rule, langTexts, fallbackTexts, texts, currentLang);
    column.appendChild(createRestoreRehearsalRuleSection(
        langTexts.restoreRehearsalRuleScenariosLabel
        || resolvedFallback.restoreRehearsalRuleScenariosLabel
        || 'Scenario scope',
        scenarioLines,
        emptyText,
    ));

    return column;
}

export function createDiffStatusBadge(type) {
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
    // getDiffText needs access to texts
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};

    const resolvedText = langTexts[textKey] || (texts.en ? texts.en[textKey] : fallbackText) || fallbackText;
    badge.textContent = resolvedText;
    return badge;
}

export function renderRestoreRehearsalRuleDiff(differences, elements) {
    const {
        ruleSectionEl,
        ruleListEl,
        ruleEmptyEl,
        actionsEl
    } = elements;

    if (!ruleSectionEl || !ruleListEl || !ruleEmptyEl) {
        return;
    }

    const scope = detectPrimaryGlobalScope();
    consttexts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';
    const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
    const texts = scope.texts || {};

    ruleListEl.innerHTML = '';
    const hasDifferences = Array.isArray(differences) && differences.length > 0;
    if (!hasDifferences) {
        if (ruleEmptyEl) {
            ruleEmptyEl.textContent = langTexts.restoreRehearsalRuleEmpty
                || fallbackTexts.restoreRehearsalRuleEmpty
                || 'No automatic gear rule differences found.';
            ruleEmptyEl.removeAttribute('hidden');
        }
        ruleSectionEl.removeAttribute('hidden');
        if (actionsEl) {
            actionsEl.removeAttribute('hidden');
        }
        return;
    }
    ruleEmptyEl.setAttribute('hidden', '');
    const liveTitle = langTexts.restoreRehearsalLiveColumn
        || fallbackTexts.restoreRehearsalLiveColumn
        || 'Live profile';
    const sandboxTitle = langTexts.restoreRehearsalSandboxColumn
        || fallbackTexts.restoreRehearsalSandboxColumn
        || 'Sandbox import';
    const emptyText = langTexts.restoreRehearsalRuleNone
        || fallbackTexts.restoreRehearsalRuleNone
        || 'None';

    differences.forEach((entry) => {
        if (!entry) return;
        const item = document.createElement('li');
        const typeClass = entry.status ? ` diff-${entry.status}` : '';
        item.className = `diff-entry${typeClass}`;

        const header = document.createElement('div');
        header.className = 'diff-entry-header';

        const path = document.createElement('div');
        path.className = 'diff-path';
        const fallbackLabel = entry.label
            || entry.sandbox?.displayName
            || entry.live?.displayName
            || langTexts.restoreRehearsalRuleFallback
            || fallbackTexts.restoreRehearsalRuleFallback
            || 'Automatic rule change';
        path.textContent = fallbackLabel;
        header.appendChild(path);

        header.appendChild(createDiffStatusBadge(entry.status || 'changed'));
        item.appendChild(header);

        const columns = document.createElement('div');
        columns.className = 'restore-rehearsal-rule-columns';
        if (entry.status === 'changed') {
            columns.classList.add('restore-rehearsal-rule-columns--split');
        }

        if (entry.live) {
            const variant = entry.status === 'added' ? null : 'removed';
            columns.appendChild(createRestoreRehearsalRuleColumn(liveTitle, entry.live, variant, langTexts, fallbackTexts, emptyText, texts, currentLang));
        }
        if (entry.sandbox) {
            const variant = entry.status === 'removed' ? null : 'added';
            columns.appendChild(createRestoreRehearsalRuleColumn(sandboxTitle, entry.sandbox, variant, langTexts, fallbackTexts, emptyText, texts, currentLang));
        }

        item.appendChild(columns);
        ruleListEl.appendChild(item);
    });
}


// --- Backup Diff UI ---

function createDiffValueElement(value, variant) {
    const element = document.createElement('span');
    element.className = 'diff-value';
    if (variant) {
        element.classList.add(`diff-value-${variant}`);
    }
    if (value === null || value === undefined) {
        element.textContent = '(empty)';
        element.classList.add('diff-value-empty');
        return element;
    }
    if (typeof value === 'boolean') {
        element.textContent = value ? 'True' : 'False';
        return element;
    }
    if (typeof value === 'object') {
        if (Object.keys(value).length === 0) {
            element.textContent = '(empty object)';
            element.classList.add('diff-value-empty');
            return element;
        }
        // Fallback for simple objects
        element.textContent = String(value);
        return element;
    }
    element.textContent = String(value);
    return element;
}

export function formatDiffPath(path) {
    if (!path) return '';
    return path
        .replace(/^([^.]+)\./, '') // Remove root (e.g., 'data.')
        .replace(/\./g, ' › ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

export function sortDiffEntries(entries) {
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

export function renderBackupDiffEntries(entries, elements) {
    const { listEl, containerEl } = elements;

    if (!listEl || !containerEl) {
        return;
    }
    listEl.innerHTML = '';
    if (!Array.isArray(entries) || !entries.length) {
        containerEl.hidden = true;
        return;
    }
    containerEl.hidden = false;
    const decoratedEntries = sortDiffEntries(entries);
    decoratedEntries.forEach(({ entry, pathText }) => {
        if (!entry) {
            return;
        }
        const item = document.createElement('li');
        const typeClass = entry.type ? ` diff-${entry.type}` : '';
        item.className = `diff-entry${typeClass}`;

        const header = document.createElement('div');
        header.className = 'diff-entry-header';

        const path = document.createElement('div');
        path.className = 'diff-path';
        path.textContent = pathText;
        header.appendChild(path);

        header.appendChild(createDiffStatusBadge(entry.type || 'changed'));
        item.appendChild(header);

        if (entry.type === 'changed') {
            const diffBody = document.createElement('div');
            diffBody.className = 'diff-body';

            const fromBlock = document.createElement('div');
            fromBlock.className = 'diff-change diff-change-removed';
            const fromLabel = document.createElement('span');
            fromLabel.className = 'diff-label';
            fromLabel.textContent = 'Previous';
            fromBlock.appendChild(fromLabel);
            fromBlock.appendChild(createDiffValueElement(entry.oldValue, 'removed'));

            const toBlock = document.createElement('div');
            toBlock.className = 'diff-change diff-change-added';
            const toLabel = document.createElement('span');
            toLabel.className = 'diff-label';
            toLabel.textContent = 'New';
            toBlock.appendChild(toLabel);
            toBlock.appendChild(createDiffValueElement(entry.newValue, 'added'));

            diffBody.appendChild(fromBlock);
            diffBody.appendChild(toBlock);
            item.appendChild(diffBody);
        } else if (entry.type === 'added') {
            const diffBody = document.createElement('div');
            diffBody.className = 'diff-body';
            const valBlock = document.createElement('div');
            valBlock.className = 'diff-change diff-change-added';
            valBlock.appendChild(createDiffValueElement(entry.newValue, 'added'));
            diffBody.appendChild(valBlock);
            item.appendChild(diffBody);
        } else if (entry.type === 'removed') {
            const diffBody = document.createElement('div');
            diffBody.className = 'diff-body';
            const valBlock = document.createElement('div');
            valBlock.className = 'diff-change diff-change-removed';
            valBlock.appendChild(createDiffValueElement(entry.oldValue, 'removed'));
            diffBody.appendChild(valBlock);
            item.appendChild(diffBody);
        }

        listEl.appendChild(item);
    });
}

