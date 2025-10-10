(function () {
  // Restore verification compares the live session to an imported backup so we
  // can reassure the user that no data was lost during restore or highlight the
  // exact discrepancies that still need attention.
  const GLOBAL_SCOPE =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  // Normalise translation access and provide a deterministic fallback so that
  // automated tests and offline usage still receive meaningful copy.
  function getTranslator(translationFn) {
    if (typeof translationFn === 'function') {
      return translationFn;
    }
    return function fallbackTranslator(key, fallback) {
      void key;
      return typeof fallback === 'string' ? fallback : '';
    };
  }

  // Validate a single metric row. This ensures broken payloads never bubble up
  // to the UI and keeps the table easy to reason about.
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

  // Build a rich report for UI consumption. The resulting object is consumed by
  // both alerts and toast notifications so we keep the shape explicit.
  function buildReport(options) {
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

  // Dedicated helper for catastrophic failures (e.g. parsing errors). We treat
  // these as warnings to encourage manual review of the backup instead of
  // silently continuing.
  function buildFailureReport(options) {
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

  const api = Object.freeze({
    buildReport,
    buildFailureReport,
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineRestoreVerification', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: api,
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.__cineRestoreVerification = api;
    }
  }
})();
