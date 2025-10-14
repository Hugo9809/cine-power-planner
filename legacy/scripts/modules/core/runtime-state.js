function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var MODULE_ID = 'modules/core/runtime-state.js';
  var GLOBAL_KEY = 'cineCoreRuntimeModules';
  var HAS = Object.prototype.hasOwnProperty;
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return null;
  }
  var globalScope = detectGlobalScope();
  function resolveNamespace() {
    if (typeof require === 'function') {
      var candidates = ['./runtime.js', '../runtime.js'];
      for (var index = 0; index < candidates.length; index += 1) {
        var candidate = candidates[index];
        try {
          var _namespace = require(candidate);
          if (_namespace && _typeof(_namespace) === 'object') {
            return _namespace;
          }
        } catch (error) {
          void error;
        }
      }
    }
    if (globalScope && _typeof(globalScope[GLOBAL_KEY]) === 'object' && globalScope[GLOBAL_KEY]) {
      return globalScope[GLOBAL_KEY];
    }
    return null;
  }
  var namespace = resolveNamespace();
  function ensureGlobalTarget() {
    if (!globalScope) {
      return null;
    }
    var current = globalScope[GLOBAL_KEY];
    if (current && _typeof(current) === 'object') {
      return current;
    }
    try {
      var created = {};
      globalScope[GLOBAL_KEY] = created;
      return created;
    } catch (error) {
      void error;
    }
    return null;
  }
  var existingExport = globalScope && globalScope[GLOBAL_KEY] && _typeof(globalScope[GLOBAL_KEY]) === 'object' && HAS.call(globalScope[GLOBAL_KEY], MODULE_ID) ? globalScope[GLOBAL_KEY][MODULE_ID] : undefined;
  var moduleExport = namespace && HAS.call(namespace, MODULE_ID) ? namespace[MODULE_ID] : existingExport;
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = moduleExport;
    return;
  }
  var target = ensureGlobalTarget();
  if (!target) {
    return;
  }
  if (typeof moduleExport !== 'undefined') {
    target[MODULE_ID] = moduleExport;
  }
})();