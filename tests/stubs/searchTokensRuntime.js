const engineModule = require('../../src/scripts/modules/features/feature-search-engine.js');

function createFallbackEngine() {
  return {
    searchTokens(value) {
      if (!value) {
        return [];
      }
      return String(value)
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
    },
  };
}

const engine = engineModule && typeof engineModule.createEngine === 'function'
  ? engineModule.createEngine()
  : createFallbackEngine();

module.exports = {
  searchTokens: engine.searchTokens,
};
