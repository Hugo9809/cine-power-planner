/**
 * Restore Rehearsal UI Controller
 *
 * Manages the UI interactions for the Restore Rehearsal feature,
 * enabling users to preview backup files in a sandbox before restoring.
 */

import * as RestoreRehearsalManager from '../features/restore-rehearsal-manager.js';
import { cineStorage } from '../../storage.js';
import {
    sanitizeBackupPayload,
    extractBackupSections
} from '../features/backup.js';

// --- Constants & State ---

let restoreRehearsalLastSnapshot = null;
let elements = {};

// --- Utilities ---

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getTexts() {
    return (typeof window !== 'undefined' && window.texts) || {};
}

function getCurrentLang() {
    return (typeof window !== 'undefined' && window.currentLang) || 'en';
}

function getScopedTexts() {
    const texts = getTexts();
    const currentLang = getCurrentLang();
    const lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    const langTexts = texts[lang] || texts.en || {};
    return { langTexts, texts };
}

function readFileAsText(file) {
    if (!file) {
        return Promise.reject(new Error('No file provided'));
    }
    if (typeof file.text === 'function') {
        return Promise.resolve().then(() => file.text());
    }
    return new Promise((resolve, reject) => {
        if (typeof FileReader !== 'function') {
            reject(new Error('No supported file reader available'));
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
        try {
            reader.readAsText(file);
        } catch (error) {
            reject(error);
        }
    });
}

// --- DOM References ---

function createRestoreRehearsalRefs() {
    const doc = typeof document !== 'undefined' ? document : null;
    if (!doc) {
        return {};
    }
    const modeInputs = [
        doc.getElementById('restoreRehearsalModeBackup'),
        doc.getElementById('restoreRehearsalModeProject'),
    ].filter(Boolean);
    return {
        button: doc.getElementById('restoreRehearsalButton'),
        section: doc.getElementById('restoreRehearsalSection'),
        heading: doc.getElementById('restoreRehearsalHeading'),
        closeButton: doc.getElementById('restoreRehearsalClose'),
        input: doc.getElementById('restoreRehearsalInput'),
        browseButton: doc.getElementById('restoreRehearsalBrowse'),
        fileName: doc.getElementById('restoreRehearsalFileName'),
        status: doc.getElementById('restoreRehearsalStatus'),
        table: doc.getElementById('restoreRehearsalTable'),
        tableBody: doc.getElementById('restoreRehearsalTableBody'),
        ruleSection: doc.getElementById('restoreRehearsalRuleSection'),
        ruleHeading: doc.getElementById('restoreRehearsalRuleHeading'),
        ruleIntro: doc.getElementById('restoreRehearsalRuleIntro'),
        ruleEmpty: doc.getElementById('restoreRehearsalRuleEmpty'),
        ruleList: doc.getElementById('restoreRehearsalRuleList'),
        actions: doc.getElementById('restoreRehearsalActions'),
        proceedButton: doc.getElementById('restoreRehearsalProceed'),
        abortButton: doc.getElementById('restoreRehearsalAbort'),
        modeInputs,
    };
}

function refreshRefs() {
    elements = createRestoreRehearsalRefs();
}

// --- Logic ---

function getRestoreRehearsalLiveSnapshot() {
    const exportAllData = cineStorage.exportAllData;
    const snapshot = typeof exportAllData === 'function' ? exportAllData() : {};
    const data = isPlainObject(snapshot) ? snapshot : {};
    return {
        counts: RestoreRehearsalManager.summarizeCountsFromData(data),
        rules: RestoreRehearsalManager.normalizeRestoreRehearsalRules(data.autoGearRules, 'live'),
    };
}

function resetRestoreRehearsalState(options = {}) {
    const { keepStatus = false } = options || {};
    const { langTexts, texts } = getScopedTexts();

    if (elements.fileName) {
        const fallback = texts.en?.restoreRehearsalNoFile || 'No file selected yet.';
        const message = langTexts.restoreRehearsalNoFile || fallback;
        elements.fileName.textContent = message;
    }
    if (!keepStatus && elements.status) {
        const fallback = texts.en?.restoreRehearsalReady || '';
        elements.status.textContent = langTexts.restoreRehearsalReady || fallback;
    }
    if (elements.table) {
        elements.table.setAttribute('hidden', '');
    }
    if (elements.tableBody) {
        while (elements.tableBody.firstChild) {
            elements.tableBody.removeChild(elements.tableBody.firstChild);
        }
    }
    if (elements.ruleSection) {
        elements.ruleSection.setAttribute('hidden', '');
    }
    if (elements.ruleList) {
        elements.ruleList.innerHTML = '';
    }
    if (elements.ruleEmpty) {
        elements.ruleEmpty.setAttribute('hidden', '');
    }
    if (elements.actions) {
        elements.actions.setAttribute('hidden', '');
    }
    restoreRehearsalLastSnapshot = null;
    if (elements.input) {
        elements.input.value = '';
    }
}

export function openRestoreRehearsal() {
    if (!elements.section) refreshRefs(); // Lazy init
    if (!elements.section) return;
    elements.section.removeAttribute('hidden');
    resetRestoreRehearsalState();
    if (elements.heading && typeof elements.heading.focus === 'function') {
        elements.heading.focus({ preventScroll: true });
    }
}

export function closeRestoreRehearsal() {
    resetRestoreRehearsalState();
    if (elements.section) {
        elements.section.setAttribute('hidden', '');
    }
}

function formatRestoreRehearsalSummary(rows) {
    const { langTexts, texts } = getScopedTexts();
    const joiner = langTexts.restoreRehearsalDifferenceListJoin || ', ';
    const diffs = rows
        .filter((row) => row.diff !== 0)
        .map((row) => `${row.label} (${row.diff > 0 ? '+' : '−'}${Math.abs(row.diff)})`);
    if (!diffs.length) {
        return langTexts.restoreRehearsalMatch
            || texts.en?.restoreRehearsalMatch
            || 'All counts match. The sandbox was cleared automatically.';
    }
    const template = langTexts.restoreRehearsalMismatch
        || texts.en?.restoreRehearsalMismatch
        || 'Differences detected: %s. The sandbox was cleared automatically.';
    return template.replace('%s', diffs.join(joiner));
}

function applyRestoreRehearsalDifferenceCell(cell, label, diff) {
    if (!cell) return;
    const { langTexts, texts } = getScopedTexts();
    cell.textContent = '';
    cell.classList.remove('restore-rehearsal-diff-match', 'restore-rehearsal-diff-positive', 'restore-rehearsal-diff-negative');
    if (diff === 0) {
        const text = langTexts.restoreRehearsalMatchLabel || texts.en?.restoreRehearsalMatchLabel || 'Match';
        cell.textContent = text;
        cell.classList.add('restore-rehearsal-diff-match');
        cell.setAttribute('aria-label', `${label} ${text}`);
        return;
    }
    const abs = Math.abs(diff);
    const template = diff > 0
        ? langTexts.restoreRehearsalIncreaseLabel || texts.en?.restoreRehearsalIncreaseLabel || 'Sandbox includes %d more %s.'
        : langTexts.restoreRehearsalDecreaseLabel || texts.en?.restoreRehearsalDecreaseLabel || 'Sandbox includes %d fewer %s.';
    const display = `${diff > 0 ? '+' : '−'}${abs}`;
    cell.textContent = display;
    cell.setAttribute('aria-label', template.replace('%d', abs).replace('%s', label));
    cell.classList.add(diff > 0 ? 'restore-rehearsal-diff-positive' : 'restore-rehearsal-diff-negative');
}

function renderRestoreRehearsalResults(rows, ruleDiff) {
    if (!elements.tableBody || !elements.status) return;
    while (elements.tableBody.firstChild) {
        elements.tableBody.removeChild(elements.tableBody.firstChild);
    }
    rows.forEach((row) => {
        const tr = document.createElement('tr');
        const metricCell = document.createElement('th');
        metricCell.scope = 'row';
        metricCell.textContent = row.label;
        tr.appendChild(metricCell);

        const liveCell = document.createElement('td');
        liveCell.textContent = String(row.live);
        tr.appendChild(liveCell);

        const sandboxCell = document.createElement('td');
        sandboxCell.textContent = String(row.sandbox);
        tr.appendChild(sandboxCell);

        const diffCell = document.createElement('td');
        applyRestoreRehearsalDifferenceCell(diffCell, row.label, row.diff);
        tr.appendChild(diffCell);

        elements.tableBody.appendChild(tr);
    });
    if (elements.table) {
        elements.table.removeAttribute('hidden');
    }
    elements.status.textContent = formatRestoreRehearsalSummary(rows);
    RestoreRehearsalManager.renderRestoreRehearsalRuleDiff(Array.isArray(ruleDiff) ? ruleDiff : [], {
        ruleSectionEl: elements.ruleSection,
        ruleListEl: elements.ruleList,
        ruleEmptyEl: elements.ruleEmpty,
        actionsEl: elements.actions
    });
}

function runRestoreRehearsal(file) {
    if (!file) return;
    const { langTexts, texts } = getScopedTexts();

    if (elements.status) {
        const processingText = langTexts.restoreRehearsalProcessing
            || texts.en?.restoreRehearsalProcessing
            || 'Loading file in an isolated sandbox…';
        elements.status.textContent = processingText;
    }
    readFileAsText(file)
        .then((raw) => {
            const mode = RestoreRehearsalManager.getSelectedRestoreRehearsalMode();
            let sandboxCounts;
            let sandboxRules = [];
            if (mode === 'project') {
                const sanitizedPayload = sanitizeBackupPayload(raw);
                if (!sanitizedPayload || !sanitizedPayload.trim()) {
                    const mismatchError = new Error('Restore rehearsal received an empty project bundle.');
                    mismatchError.code = 'restore-rehearsal-project-mismatch';
                    throw mismatchError;
                }
                const parsed = JSON.parse(sanitizedPayload);
                if (!RestoreRehearsalManager.looksLikeRestoreRehearsalProjectBundle(parsed)) {
                    const mismatchError = new Error('Restore rehearsal received an unrecognized project bundle.');
                    mismatchError.code = 'restore-rehearsal-project-mismatch';
                    throw mismatchError;
                }
                sandboxCounts = RestoreRehearsalManager.summarizeProjectBundle(parsed);
                sandboxRules = RestoreRehearsalManager.normalizeRestoreRehearsalRules(parsed.autoGearRules, 'sandbox');
            } else {
                const sanitizedPayload = sanitizeBackupPayload(raw);
                if (!sanitizedPayload || !sanitizedPayload.trim()) {
                    throw new Error('Backup payload empty');
                }
                const parsed = JSON.parse(sanitizedPayload);
                if (!RestoreRehearsalManager.looksLikeRestoreRehearsalBackupPayload(parsed)) {
                    const mismatchError = new Error('Restore rehearsal received an unrecognized backup payload.');
                    mismatchError.code = 'restore-rehearsal-backup-mismatch';
                    throw mismatchError;
                }
                const { data } = extractBackupSections(parsed);
                const normalizedData = isPlainObject(data) ? data : {};
                sandboxCounts = RestoreRehearsalManager.summarizeCountsFromData(normalizedData);
                sandboxRules = RestoreRehearsalManager.normalizeRestoreRehearsalRules(normalizedData.autoGearRules, 'sandbox');
            }
            const liveSnapshot = getRestoreRehearsalLiveSnapshot();
            const liveCounts = liveSnapshot && isPlainObject(liveSnapshot.counts) ? liveSnapshot.counts : {};
            const liveRules = liveSnapshot && Array.isArray(liveSnapshot.rules) ? liveSnapshot.rules : [];
            const rows = RestoreRehearsalManager.buildRestoreRehearsalRows(liveCounts, sandboxCounts, { mode });
            const ruleDiff = RestoreRehearsalManager.buildRestoreRehearsalRuleDiff(liveRules, sandboxRules);
            renderRestoreRehearsalResults(rows, ruleDiff);
            restoreRehearsalLastSnapshot = {
                fileName: typeof file.name === 'string' ? file.name : '',
                mode,
                processedAt: Date.now(),
                live: { counts: liveCounts, rules: liveRules },
                sandbox: { counts: sandboxCounts, rules: sandboxRules },
                diff: ruleDiff,
            };
            if (elements.input) {
                elements.input.value = '';
            }
        })
        .catch((error) => {
            console.warn('Restore rehearsal failed', error);
            restoreRehearsalLastSnapshot = null;
            if (elements.status) {
                let failureMessage;
                if (error && error.code === 'restore-rehearsal-project-mismatch') {
                    failureMessage = langTexts.restoreRehearsalProjectMismatch
                        || texts.en?.restoreRehearsalProjectMismatch;
                } else if (error && error.code === 'restore-rehearsal-backup-mismatch') {
                    failureMessage = langTexts.restoreRehearsalBackupMismatch
                        || texts.en?.restoreRehearsalBackupMismatch;
                }
                if (!failureMessage) {
                    failureMessage = langTexts.restoreRehearsalError
                        || texts.en?.restoreRehearsalError
                        || 'Restore rehearsal failed. Check the file and try again.';
                }
                elements.status.textContent = failureMessage;
            }
            if (elements.table) {
                elements.table.setAttribute('hidden', '');
            }
            if (elements.ruleSection) {
                elements.ruleSection.setAttribute('hidden', '');
            }
            if (elements.actions) {
                elements.actions.setAttribute('hidden', '');
            }
        })
        .finally(() => {
            if (elements.input) {
                try {
                    elements.input.value = '';
                } catch (resetError) {
                    void resetError;
                }
            }
        });
}

function handleRestoreRehearsalProceed() {
    const { langTexts, texts } = getScopedTexts();
    if (!restoreRehearsalLastSnapshot) {
        if (elements.status) {
            const readyText = langTexts.restoreRehearsalReady || texts.en?.restoreRehearsalReady || '';
            elements.status.textContent = readyText;
        }
        return;
    }
    const message = langTexts.restoreRehearsalProceedMessage
        || texts.en?.restoreRehearsalProceedMessage
        || 'Sandbox snapshot staged. Live data remains untouched until you perform a full restore.';
    if (elements.status) {
        elements.status.textContent = message;
    }
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
        try {
            document.dispatchEvent(new CustomEvent('restoreRehearsalProceed', {
                detail: {
                    fileName: restoreRehearsalLastSnapshot.fileName,
                    mode: restoreRehearsalLastSnapshot.mode,
                    processedAt: restoreRehearsalLastSnapshot.processedAt,
                    sandboxCounts: restoreRehearsalLastSnapshot.sandbox?.counts || {},
                    ruleChanges: Array.isArray(restoreRehearsalLastSnapshot.diff)
                        ? restoreRehearsalLastSnapshot.diff.length
                        : 0,
                },
            }));
        } catch (eventError) {
            console.warn('Restore rehearsal proceed notification failed', eventError);
        }
    }
}

function handleRestoreRehearsalAbort() {
    const { langTexts, texts } = getScopedTexts();
    const message = langTexts.restoreRehearsalAbortMessage
        || texts.en?.restoreRehearsalAbortMessage
        || 'Rehearsal sandbox cleared. Live data remains untouched.';
    restoreRehearsalLastSnapshot = null;
    resetRestoreRehearsalState({ keepStatus: true });
    if (elements.status) {
        elements.status.textContent = message;
    }
}

// --- Initialization ---

export function initializeRestoreRehearsalUI() {
    refreshRefs();
    if (elements.modeInputs) {
        RestoreRehearsalManager.registerRestoreRehearsalModeInputs(elements.modeInputs);
    }

    if (elements.button) {
        elements.button.addEventListener('click', () => {
            openRestoreRehearsal();
        });
    }

    if (elements.closeButton) {
        elements.closeButton.addEventListener('click', () => {
            closeRestoreRehearsal();
        });
    }

    if (elements.browseButton && elements.input) {
        elements.browseButton.addEventListener('click', () => {
            elements.input.click();
        });
    }
    if (elements.proceedButton) {
        elements.proceedButton.addEventListener('click', () => {
            handleRestoreRehearsalProceed();
        });
    }
    if (elements.abortButton) {
        elements.abortButton.addEventListener('click', () => {
            handleRestoreRehearsalAbort();
        });
    }

    if (elements.input) {
        elements.input.addEventListener('change', () => {
            const file = elements.input.files && elements.input.files[0];
            if (!file) {
                resetRestoreRehearsalState({ keepStatus: true });
                return;
            }
            if (elements.fileName) {
                elements.fileName.textContent = file.name || elements.fileName.textContent;
            }
            runRestoreRehearsal(file);
        });
    }

    // Export aliases required by app-session.js for window binding
    return {
        handleRestoreRehearsalProceed,
        handleRestoreRehearsalAbort
    }
}

// Aliases for compatibility
export {
    handleRestoreRehearsalProceed,
    handleRestoreRehearsalAbort
};
