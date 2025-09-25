var connectorSummaryHelpers = null;
if (typeof require === 'function') {
  try {
    connectorSummaryHelpers = require('./connector-summary.js');
  } catch (error) {
    void error;
var connectorSummaryGlobalSource = typeof globalThis !== 'undefined' && globalThis.__cineConnectorSummary || typeof window !== 'undefined' && window.__cineConnectorSummary || typeof global !== 'undefined' && global.__cineConnectorSummary || typeof self !== 'undefined' && self.__cineConnectorSummary || null;
var connectorSummaryExports = connectorSummaryHelpers && _typeof(connectorSummaryHelpers) === 'object' ? connectorSummaryHelpers : connectorSummaryGlobalSource && _typeof(connectorSummaryGlobalSource) === 'object' ? connectorSummaryGlobalSource : null;
var resolveConnectorSummaryGenerator = connectorSummaryExports && typeof connectorSummaryExports.resolveConnectorSummaryGenerator === 'function' ? connectorSummaryExports.resolveConnectorSummaryGenerator : function resolveConnectorSummaryGenerator() {
  return null;
};
var safeGenerateConnectorSummary = connectorSummaryExports && typeof connectorSummaryExports.safeGenerateConnectorSummary === 'function' ? connectorSummaryExports.safeGenerateConnectorSummary : function safeGenerateConnectorSummary(device) {
};
