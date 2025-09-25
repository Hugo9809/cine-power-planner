// connector-summary.js – Connector summary helpers extracted from the legacy bundle
/* global generateConnectorSummary */

(function createLegacyConnectorSummaryModule(globalScope) {
  var scope = globalScope
    || (typeof globalThis !== 'undefined' ? globalThis : null)
    || (typeof window !== 'undefined' ? window : null)
    || (typeof self !== 'undefined' ? self : null)
    || (typeof global !== 'undefined' ? global : null)
    || null;

  var cachedConnectorSummaryGenerator = null;
  var connectorSummaryCachePrimed = false;

  function resolveConnectorSummaryGenerator() {
    if (connectorSummaryCachePrimed && typeof cachedConnectorSummaryGenerator === 'function') {
      return cachedConnectorSummaryGenerator;
    }

    var scopes = [];
    if (typeof globalThis !== 'undefined') scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof global !== 'undefined') scopes.push(global);
    if (typeof self !== 'undefined') scopes.push(self);

    for (var index = 0; index < scopes.length; index += 1) {
      var candidateScope = scopes[index];
      if (candidateScope && typeof candidateScope.generateConnectorSummary === 'function') {
        cachedConnectorSummaryGenerator = candidateScope.generateConnectorSummary;
        connectorSummaryCachePrimed = true;
        return cachedConnectorSummaryGenerator;
      }
    }

    if (typeof generateConnectorSummary === 'function') {
      cachedConnectorSummaryGenerator = generateConnectorSummary;
      connectorSummaryCachePrimed = true;
      return cachedConnectorSummaryGenerator;
    }

    return null;
  }

  function safeGenerateConnectorSummary(device) {
    if (!device) {
      return '';
    }

    var generator = resolveConnectorSummaryGenerator();
    if (typeof generator !== 'function') {
      return '';
    }

    try {
      var summary = generator(device);
      return summary || '';
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to generate connector summary', error);
      }
      return '';
    }
  }

  var exportsObject = {
    resolveConnectorSummaryGenerator: resolveConnectorSummaryGenerator,
    safeGenerateConnectorSummary: safeGenerateConnectorSummary
  };

  if (scope && typeof scope === 'object') {
    if (typeof scope.__cineConnectorSummary !== 'object' || scope.__cineConnectorSummary === null) {
      try {
        Object.defineProperty(scope, '__cineConnectorSummary', {
          value: exportsObject,
          configurable: true,
          enumerable: false,
          writable: true
        });
      } catch (definitionError) {
        void definitionError;
        scope.__cineConnectorSummary = exportsObject;
      }
    }

    if (typeof scope.resolveConnectorSummaryGenerator !== 'function') {
      scope.resolveConnectorSummaryGenerator = resolveConnectorSummaryGenerator;
    }
    if (typeof scope.safeGenerateConnectorSummary !== 'function') {
      scope.safeGenerateConnectorSummary = safeGenerateConnectorSummary;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObject;
  }
})(typeof globalThis !== 'undefined' && globalThis
  || typeof window !== 'undefined' && window
  || typeof self !== 'undefined' && self
  || typeof global !== 'undefined' && global
  || null);
