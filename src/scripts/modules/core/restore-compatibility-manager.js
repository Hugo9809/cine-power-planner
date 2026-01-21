/**
 * Restore Compatibility Manager
 * Handles validation and reporting of backup restoration compatibility across app versions.
 */

const RESTORE_COMPATIBILITY_CORE_KEYS = [
    'devices',
    'setups',
    'project',
    'projects',
    'gearList',
    'favorites',
];

const RESTORE_COMPATIBILITY_OPTIONAL_KEYS = [
    'autoGearRules',
    'autoGearPresets',
    'autoGearBackups',
    'autoGearMonitorDefaults',
    'autoGearActivePresetId',
    'autoGearAutoPresetId',
    'autoGearShowBackups',
    'autoGearBackupRetention',
    'fullBackups',
    'fullBackupHistory',
    'session',
];

const RESTORE_COMPATIBILITY_STORAGE_KEYS = [
    'accentColor',
    'fontSize',
    'fontFamily',
    'language',
    'showAutoBackups',
    'customLogo',
    'customFonts',
];

const RESTORE_SECTION_LABEL_OVERRIDES = {
    autoGearRules: 'Automatic gear rules',
    autoGearPresets: 'Automatic gear presets',
    autoGearBackups: 'Automatic gear backups',
    autoGearMonitorDefaults: 'Monitor defaults',
    autoGearActivePresetId: 'Active auto gear preset',
    autoGearAutoPresetId: 'Auto gear auto preset',
    autoGearShowBackups: 'Auto gear backup visibility',
    autoGearBackupRetention: 'Auto gear backup retention',
    fullBackups: 'Full backups',
    fullBackupHistory: 'Full backup history',
    showAutoBackups: 'Automatic backup visibility',
};

// --- Helpers ---

function resolveGlobal(name) {
    if (typeof window !== 'undefined' && window[name]) return window[name];
    if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
    return null;
}

function normalizeVersionValue(value) {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
}

function resolveKnownAppVersion(explicitVersion) {
    const normalizedExplicit = normalizeVersionValue(explicitVersion);
    if (normalizedExplicit) return normalizedExplicit;

    const APP_VERSION = resolveGlobal('APP_VERSION');
    if (typeof APP_VERSION === 'string') {
        const normalized = normalizeVersionValue(APP_VERSION);
        if (normalized) return normalized;
    }
    return null;
}

function resolveCompatibilityTexts(langTexts, fallbackTexts) {
    const texts = resolveGlobal('texts') || {};
    const fallback = fallbackTexts || texts.en || {};
    const currentLang = resolveGlobal('currentLang') || 'en';
    const resolvedLang = langTexts || (texts[currentLang] || fallback);
    return { lang: currentLang, langTexts: resolvedLang, fallbackTexts: fallback };
}

function ensureMeaningfulValue(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number' || typeof value === 'boolean') return true;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return false;
}

function humanizeRestoreSectionKey(key) {
    if (RESTORE_SECTION_LABEL_OVERRIDES[key]) return RESTORE_SECTION_LABEL_OVERRIDES[key];
    if (typeof key !== 'string') return String(key);
    const spaced = key.replace(/[_\s-]+/g, ' ').replace(/([a-z\d])([A-Z])/g, '$1 $2').trim();
    if (!spaced) return key;
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function describeMissingSections(label, items) {
    if (!label || !Array.isArray(items) || !items.length) return '';
    const bulletList = items.map(item => `• ${humanizeRestoreSectionKey(item)}`).join('\n');
    return `${label}\n${bulletList}`;
}

// --- Core Logic ---

function evaluateRestoreCompatibilitySections({ data, settingsSnapshot, sessionSnapshot }) {
    const normalizedData = data && typeof data === 'object' ? data : null;
    const normalizedSettings = settingsSnapshot && typeof settingsSnapshot === 'object' ? settingsSnapshot : null;
    const normalizedSession = sessionSnapshot && typeof sessionSnapshot === 'object' ? sessionSnapshot : null;

    const missingCore = [];
    const missingOptional = [];
    const missingStorage = [];

    const checkDataKey = (key, bucket) => {
        if (!normalizedData || !Object.prototype.hasOwnProperty.call(normalizedData, key)) {
            bucket.push(key);
            return;
        }
        if (!ensureMeaningfulValue(normalizedData[key])) bucket.push(key);
    };

    RESTORE_COMPATIBILITY_CORE_KEYS.forEach(key => checkDataKey(key, missingCore));
    RESTORE_COMPATIBILITY_OPTIONAL_KEYS.forEach(key => checkDataKey(key, missingOptional));

    if (!normalizedSession) {
        if (!missingOptional.includes('session')) missingOptional.push('session');
    } else {
        // If present, check if it's empty
        if (!ensureMeaningfulValue(normalizedSession)) {
            if (!missingOptional.includes('session')) missingOptional.push('session');
        }
    }

    RESTORE_COMPATIBILITY_STORAGE_KEYS.forEach(key => {
        if (!normalizedSettings || !Object.prototype.hasOwnProperty.call(normalizedSettings, key)) {
            missingStorage.push(key);
            return;
        }
        if (!ensureMeaningfulValue(normalizedSettings[key])) missingStorage.push(key);
    });

    return { missingCore, missingOptional, missingStorage };
}

function buildRestoreCompatibilityReport(options = {}) {
    const {
        langTexts: providedLangTexts,
        fallbackTexts: providedFallbackTexts,
        fileVersion,
        targetVersion,
        data,
        settingsSnapshot,
        sessionSnapshot,
        backupFileName,
    } = options;

    const { langTexts, fallbackTexts } = resolveCompatibilityTexts(providedLangTexts, providedFallbackTexts);
    const evaluation = evaluateRestoreCompatibilitySections({ data, settingsSnapshot, sessionSnapshot });

    const getText = (key, fallback) => {
        if (langTexts && typeof langTexts[key] === 'string') return langTexts[key];
        if (fallbackTexts && typeof fallbackTexts[key] === 'string') return fallbackTexts[key];
        return fallback || '';
    };

    const messageParts = [];
    const summaryTitle = getText('restoreVersionSummaryTitle');
    if (summaryTitle) messageParts.push(summaryTitle);

    const unknownVersion = getText('restoreVersionUnknownVersion', 'unknown version');
    const headingTemplate = getText('restoreVersionSummaryHeading', 'This backup was created with {oldVersion} and you are running {newVersion}.');

    const normalizedFileVersion = normalizeVersionValue(fileVersion);
    const ACTIVE_APP_VERSION = resolveGlobal('ACTIVE_APP_VERSION');
    const normalizedTargetVersion = resolveKnownAppVersion(targetVersion) || ACTIVE_APP_VERSION || normalizeVersionValue(targetVersion);

    const heading = headingTemplate
        .replace('{oldVersion}', normalizedFileVersion || unknownVersion)
        .replace('{newVersion}', normalizedTargetVersion || unknownVersion);
    messageParts.push(heading);

    const warning = getText('restoreVersionWarning');
    if (warning) messageParts.push(warning);

    const coreSection = describeMissingSections(getText('restoreVersionCoreMissing', 'Not included in this backup:'), evaluation.missingCore);
    if (coreSection) messageParts.push(coreSection);

    const storageSection = describeMissingSections(getText('restoreVersionStorageMissing', 'Stored preferences not included:'), evaluation.missingStorage);
    if (storageSection) messageParts.push(storageSection);

    const optionalSection = describeMissingSections(getText('restoreVersionOptionalMissing', 'Optional items you may need to recreate:'), evaluation.missingOptional);
    if (optionalSection) messageParts.push(optionalSection);

    if (!evaluation.missingCore.length && !evaluation.missingStorage.length && !evaluation.missingOptional.length) {
        const noIssues = getText('restoreVersionNoIssues');
        if (noIssues) messageParts.push(noIssues);
    }

    if (backupFileName) {
        const backupLabel = getText('restoreVersionBackupLabel');
        if (backupLabel) messageParts.push(backupLabel.replace('{fileName}', backupFileName));
    }

    const tip = getText('restoreVersionTip');
    if (tip) messageParts.push(tip);

    const footer = getText('restoreVersionFooter');
    if (footer) messageParts.push(footer);

    return {
        evaluation,
        message: messageParts.filter(Boolean).join('\n\n'),
        langTexts,
        fallbackTexts,
    };
}

// --- Public API ---

export const RestoreCompatibilityManager = {
    /**
     * Verifies the integrity of a restored backup payload and generates a report.
     * @param {Object} payload - The restored data payload.
     * @returns {Object} Result object with notificationType, notificationMessage, and alertMessage.
     */
    verifyRestoredBackupIntegrity(payload) {
        const options = payload && typeof payload === 'object' && !Array.isArray(payload)
            && (payload.data || payload.settingsSnapshot || payload.sessionSnapshot)
            ? payload
            : { data: payload };

        const report = buildRestoreCompatibilityReport(options);
        const { evaluation, message, langTexts, fallbackTexts } = report;
        const missingCount = evaluation.missingCore.length + evaluation.missingStorage.length + evaluation.missingOptional.length;

        const warning = (langTexts && langTexts.restoreVersionWarning) ||
            (fallbackTexts && fallbackTexts.restoreVersionWarning) ||
            'Backup created with a different version. Some features might not transfer.';

        const success = (langTexts && langTexts.restoreVersionNoIssues) ||
            (fallbackTexts && fallbackTexts.restoreVersionNoIssues) ||
            'All modern data sections were found in this backup.';

        if (missingCount === 0) {
            return {
                notificationType: 'success',
                notificationMessage: success,
                alertMessage: '',
            };
        }

        return {
            notificationType: 'warning',
            notificationMessage: warning,
            alertMessage: message,
        };
    },

    /**
     * Helper to build just the message string (legacy support).
     */
    buildRestoreVersionCompatibilityMessage(options = {}) {
        return buildRestoreCompatibilityReport(options).message;
    }
};
