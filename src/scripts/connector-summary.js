// connector-summary.js – Connector summary helpers extracted from app-core
/* global generateConnectorSummary */

(function createConnectorSummaryModule(globalScope) {
  const scope = globalScope
    || (typeof globalThis !== 'undefined' ? globalThis : null)
    || (typeof window !== 'undefined' ? window : null)
    || (typeof self !== 'undefined' ? self : null)
    || (typeof global !== 'undefined' ? global : null)
    || null;

  let cachedConnectorSummaryGenerator = null;
  let connectorSummaryCachePrimed = false;

  function resolveConnectorSummaryGenerator() {
    if (connectorSummaryCachePrimed && typeof cachedConnectorSummaryGenerator === 'function') {
      return cachedConnectorSummaryGenerator;
    }

    const scopes = [];
    if (typeof globalThis !== 'undefined') scopes.push(globalThis);
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof global !== 'undefined') scopes.push(global);
    if (typeof self !== 'undefined') scopes.push(self);

    for (const candidateScope of scopes) {
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

    const generator = resolveConnectorSummaryGenerator();
    if (typeof generator !== 'function') {
      return '';
    }

    try {
      const summary = generator(device);
      return summary || '';
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to generate connector summary', error);
      }
      return '';
    }
  }

  const exportsObject = {
    resolveConnectorSummaryGenerator,
    safeGenerateConnectorSummary
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
})((typeof globalThis !== 'undefined' && globalThis)
  || (typeof window !== 'undefined' && window)
  || (typeof self !== 'undefined' && self)
  || (typeof global !== 'undefined' && global)
  || null);
