function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  function getTranslator(translationFn) {
    if (typeof translationFn === 'function') {
      return translationFn;
    }
    return function fallbackTranslator(key, fallback) {
      void key;
      return typeof fallback === 'string' ? fallback : '';
    };
  }
  function normaliseRow(row, translator) {
    if (!row || _typeof(row) !== 'object') {
      return {
        label: translator('restoreVerificationUnknownMetric', 'Metric'),
        live: 0,
        sandbox: 0,
        diff: 0
      };
    }
    var label = typeof row.label === 'string' && row.label ? row.label : translator('restoreVerificationUnknownMetric', 'Metric');
    var live = typeof row.live === 'number' && Number.isFinite(row.live) ? row.live : 0;
    var sandbox = typeof row.sandbox === 'number' && Number.isFinite(row.sandbox) ? row.sandbox : 0;
    var diff = typeof row.diff === 'number' && Number.isFinite(row.diff) ? row.diff : sandbox - live;
    return {
      label: label,
      live: live,
      sandbox: sandbox,
      diff: diff
    };
  }
  function buildReport(options) {
    var translator = getTranslator(options && options.translation);
    var rows = Array.isArray(options && options.rows) ? options.rows : [];
    var normalisedRows = rows.map(function (row) {
      return normaliseRow(row, translator);
    });
    var differences = normalisedRows.filter(function (row) {
      return row.diff !== 0;
    });
    var matchMessage = translator('restoreVerificationMatch', 'Restore verification passed. Live data matches the backup snapshot.');
    var mismatchHeading = translator('restoreVerificationMismatch', 'Restore verification found differences. Review the counts before continuing:');
    var diffTemplate = translator('restoreVerificationDifference', '{label}: backup {expected}, live {actual}');
    if (!normalisedRows.length) {
      return {
        status: 'empty',
        rows: normalisedRows,
        differences: differences,
        alertMessage: matchMessage,
        notificationType: 'success',
        notificationMessage: matchMessage
      };
    }
    if (!differences.length) {
      return {
        status: 'match',
        rows: normalisedRows,
        differences: differences,
        alertMessage: matchMessage,
        notificationType: 'success',
        notificationMessage: matchMessage
      };
    }
    var detailLines = differences.map(function (row) {
      return diffTemplate.replace('{label}', row.label).replace('{expected}', String(row.sandbox)).replace('{actual}', String(row.live));
    });
    return {
      status: 'mismatch',
      rows: normalisedRows,
      differences: differences,
      alertMessage: "".concat(mismatchHeading, "\n").concat(detailLines.join('\n')),
      notificationType: 'warning',
      notificationMessage: mismatchHeading
    };
  }
  function buildFailureReport(options) {
    var translator = getTranslator(options && options.translation);
    var message = translator('restoreVerificationFailed', 'Restore verification could not confirm the imported data. Review the backup manually.');
    return {
      status: 'error',
      rows: [],
      differences: [],
      alertMessage: message,
      notificationType: 'warning',
      notificationMessage: message,
      error: options ? options.error : null
    };
  }
  var api = Object.freeze({
    buildReport: buildReport,
    buildFailureReport: buildFailureReport
  });
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineRestoreVerification', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: api
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.__cineRestoreVerification = api;
    }
  }
})();