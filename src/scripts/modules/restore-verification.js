/**
 * @fileoverview UTILITY MODULE: Restore Verification
 * 
 * Compares the live session to an imported backup sandbox to verifying data integrity.
 * Provides report generation for UI alerts and notifications.
 * 
 * @module modules/restore-verification
 */

/**
 * Normalise translation access and provide a deterministic fallback.
 * @param {Function} translationFn - The translation function (e.g. t())
 * @returns {Function} A safe translation function
 */
function getTranslator(translationFn) {
    if (typeof translationFn === 'function') {
        return translationFn;
    }
    return function fallbackTranslator(key, fallback) {
        void key;
        return typeof fallback === 'string' ? fallback : '';
    };
}

/**
 * Validate a single metric row.
 * @param {Object} row - The row data {label, live, sandbox, diff}
 * @param {Function} translator - Translator function
 * @returns {Object} Normalised row
 */
function normaliseRow(row, translator) {
    if (!row || typeof row !== 'object') {
        return {
            label: translator('restoreVerificationUnknownMetric', 'Metric'),
            live: 0,
            sandbox: 0,
            diff: 0,
        };
    }

    const label = typeof row.label === 'string' && row.label
        ? row.label
        : translator('restoreVerificationUnknownMetric', 'Metric');
    const live = typeof row.live === 'number' && Number.isFinite(row.live) ? row.live : 0;
    const sandbox = typeof row.sandbox === 'number' && Number.isFinite(row.sandbox) ? row.sandbox : 0;
    const diff = typeof row.diff === 'number' && Number.isFinite(row.diff)
        ? row.diff
        : sandbox - live;

    return { label, live, sandbox, diff };
}

/**
 * Build a rich report for UI consumption.
 * @param {Object} options - { rows: Array, translation: Function }
 * @returns {Object} Report object
 */
export function buildReport(options) {
    const translator = getTranslator(options && options.translation);
    const rows = Array.isArray(options && options.rows) ? options.rows : [];
    const normalisedRows = rows.map(row => normaliseRow(row, translator));
    const differences = normalisedRows.filter(row => row.diff !== 0);

    const matchMessage = translator(
        'restoreVerificationMatch',
        'Restore verification passed. Live data matches the backup snapshot.',
    );
    const mismatchHeading = translator(
        'restoreVerificationMismatch',
        'Restore verification found differences. Review the counts before continuing:',
    );
    const diffTemplate = translator(
        'restoreVerificationDifference',
        '{label}: backup {expected}, live {actual}',
    );

    if (!normalisedRows.length) {
        return {
            status: 'empty',
            rows: normalisedRows,
            differences,
            alertMessage: matchMessage,
            notificationType: 'success',
            notificationMessage: matchMessage,
        };
    }

    if (!differences.length) {
        return {
            status: 'match',
            rows: normalisedRows,
            differences,
            alertMessage: matchMessage,
            notificationType: 'success',
            notificationMessage: matchMessage,
        };
    }

    const detailLines = differences.map((row) => {
        return diffTemplate
            .replace('{label}', row.label)
            .replace('{expected}', String(row.sandbox))
            .replace('{actual}', String(row.live));
    });

    return {
        status: 'mismatch',
        rows: normalisedRows,
        differences,
        alertMessage: `${mismatchHeading}\n${detailLines.join('\n')}`,
        notificationType: 'warning',
        notificationMessage: mismatchHeading,
    };
}

/**
 * Build a failure report for catastrophic failures.
 * @param {Object} options - { error: Error, translation: Function }
 * @returns {Object} Failure report object
 */
export function buildFailureReport(options) {
    const translator = getTranslator(options && options.translation);
    const message = translator(
        'restoreVerificationFailed',
        'Restore verification could not confirm the imported data. Review the backup manually.',
    );
    return {
        status: 'error',
        rows: [],
        differences: [],
        alertMessage: message,
        notificationType: 'warning',
        notificationMessage: message,
        error: options ? options.error : null,
    };
}
