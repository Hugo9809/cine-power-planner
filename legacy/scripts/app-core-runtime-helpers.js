function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function createArrayFromCandidates(primary, shared, globalScope) {
  var candidates = [];
  if (primary && (_typeof(primary) === 'object' || typeof primary === 'function')) {
    candidates.push(primary);
  }
  if (shared && (_typeof(shared) === 'object' || typeof shared === 'function')) {
    candidates.push(shared);
  }
  if (globalScope && (_typeof(globalScope) === 'object' || typeof globalScope === 'function')) {
    candidates.push(globalScope);
  }
  candidates.push(typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null);
  var resolved = [];
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      continue;
    }
    var duplicate = false;
    for (var check = 0; check < resolved.length; check += 1) {
      if (resolved[check] === candidate) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      resolved.push(candidate);
    }
  }
  return resolved;
}
function createDefaultLanguageTexts(scope) {
  if (scope && _typeof(scope) === 'object' && scope.texts && _typeof(scope.texts) === 'object' && scope.texts.en && _typeof(scope.texts.en) === 'object') {
    return scope.texts.en;
  }
  return {};
}
function fallbackNormalizeAutoGearWeightOperator(value) {
  if (typeof value !== 'string') return 'greater';
  var normalized = value.trim().toLowerCase();
  if (!normalized) return 'greater';
  if (normalized === '>' || normalized === 'gt' || normalized === 'greaterthan' || normalized === 'above' || normalized === 'over') {
    return 'greater';
  }
  if (normalized === '<' || normalized === 'lt' || normalized === 'lessthan' || normalized === 'below' || normalized === 'under') {
    return 'less';
  }
  if (normalized === '=' || normalized === '==' || normalized === 'equal' || normalized === 'equals' || normalized === 'exactly' || normalized === 'match' || normalized === 'matches') {
    return 'equal';
  }
  return 'greater';
}
function fallbackNormalizeAutoGearWeightValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    var rounded = Math.round(value);
    return rounded >= 0 ? rounded : null;
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (!trimmed) return null;
    var sanitized = trimmed.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
    if (!sanitized) return null;
    var parsed = Number.parseFloat(sanitized);
    if (!Number.isFinite(parsed)) return null;
    var _rounded = Math.round(parsed);
    return _rounded >= 0 ? _rounded : null;
  }
  return null;
}
function fallbackFormatAutoGearWeight(value) {
  if (!Number.isFinite(value)) return '';
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      return new Intl.NumberFormat().format(value);
    }
  } catch (error) {
    void error;
  }
  return String(value);
}
function createFallbackGetAutoGearCameraWeightOperatorLabel(normalizeOperator, fallbackTextsFactory) {
  return function fallbackGetAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    var textsForLang = langTexts || {};
    var fallbackTexts = fallbackTextsFactory();
    var normalized = normalizeOperator(operator);
    if (normalized === 'less') {
      return textsForLang.autoGearCameraWeightOperatorLess || fallbackTexts.autoGearCameraWeightOperatorLess || 'Lighter than';
    }
    if (normalized === 'equal') {
      return textsForLang.autoGearCameraWeightOperatorEqual || fallbackTexts.autoGearCameraWeightOperatorEqual || 'Exactly';
    }
    return textsForLang.autoGearCameraWeightOperatorGreater || fallbackTexts.autoGearCameraWeightOperatorGreater || 'Heavier than';
  };
}
function createFallbackFormatAutoGearCameraWeight(formatWeight, getOperatorLabel) {
  return function fallbackFormatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    var label = getOperatorLabel(condition.operator, langTexts);
    var formattedValue = formatWeight(condition.value);
    if (!label) {
      return "".concat(formattedValue, " g");
    }
    return "".concat(label, " ").concat(formattedValue, " g");
  };
}
function fallbackCreateRuntimeScopeCandidates(primaryScope, sharedScope, globalScope) {
  if (typeof collectRuntimeScopeCandidates === 'function') {
    return collectRuntimeScopeCandidates([primaryScope, sharedScope, globalScope]);
  }
  return createArrayFromCandidates(primaryScope, sharedScope, globalScope);
}
function fallbackReadCoreScopeValue(name, candidates) {
  if (typeof name !== 'string' || !name) {
    return undefined;
  }
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return undefined;
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (name in scope) {
        var value = scope[name];
        if (typeof value !== 'undefined') {
          return value;
        }
      }
    } catch (readError) {
      void readError;
    }
  }
  return undefined;
}
function fallbackWriteCoreScopeValue(name, value, candidates) {
  if (typeof name !== 'string' || !name) {
    return false;
  }
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return false;
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      scope[name] = value;
      return true;
    } catch (assignError) {
      void assignError;
    }
    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        writable: true,
        value: value
      });
      return true;
    } catch (defineError) {
      void defineError;
    }
  }
  return false;
}
function fallbackDeclareCoreFallbackBinding(name, factory, candidates) {
  var existing = fallbackReadCoreScopeValue(name, candidates);
  if (typeof existing !== 'undefined') {
    return existing;
  }
  var fallbackValue = typeof factory === 'function' ? factory() : factory;
  fallbackWriteCoreScopeValue(name, fallbackValue, candidates);
  return fallbackValue;
}
function resolveAutoGearWeightHelpers(options) {
  var opts = options || {};
  var shared = opts.coreShared && _typeof(opts.coreShared) === 'object' ? opts.coreShared : null;
  var globalScopeOverride = opts.globalScope && _typeof(opts.globalScope) === 'object' ? opts.globalScope : null;
  var fallbackTextsFactory = function resolveFallbackTexts() {
    return createDefaultLanguageTexts(globalScopeOverride || (typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null));
  };
  var normalizeOperator = shared && typeof shared.normalizeAutoGearWeightOperator === 'function' ? function safeNormalizeAutoGearWeightOperator(value) {
    try {
      var normalized = shared.normalizeAutoGearWeightOperator(value);
      return normalized || fallbackNormalizeAutoGearWeightOperator(value);
    } catch (error) {
      void error;
    }
    return fallbackNormalizeAutoGearWeightOperator(value);
  } : fallbackNormalizeAutoGearWeightOperator;
  var normalizeValue = shared && typeof shared.normalizeAutoGearWeightValue === 'function' ? function safeNormalizeAutoGearWeightValue(value) {
    try {
      var normalized = shared.normalizeAutoGearWeightValue(value);
      if (typeof normalized === 'number' || normalized === null) {
        return normalized;
      }
    } catch (error) {
      void error;
    }
    return fallbackNormalizeAutoGearWeightValue(value);
  } : fallbackNormalizeAutoGearWeightValue;
  var normalizeCameraWeightCondition = shared && typeof shared.normalizeAutoGearCameraWeightCondition === 'function' ? function safeNormalizeAutoGearCameraWeightCondition(condition) {
    try {
      var normalized = shared.normalizeAutoGearCameraWeightCondition(condition);
      return normalized || null;
    } catch (error) {
      void error;
    }
    return null;
  } : function normalizeAutoGearCameraWeightCondition() {
    return null;
  };
  var formatWeight = shared && typeof shared.formatAutoGearWeight === 'function' ? function safeFormatAutoGearWeight(value) {
    try {
      var formatted = shared.formatAutoGearWeight(value);
      if (typeof formatted === 'string') {
        return formatted;
      }
    } catch (error) {
      void error;
    }
    return fallbackFormatAutoGearWeight(value);
  } : fallbackFormatAutoGearWeight;
  var fallbackGetOperatorLabel = createFallbackGetAutoGearCameraWeightOperatorLabel(normalizeOperator, fallbackTextsFactory);
  var getOperatorLabel = shared && typeof shared.getAutoGearCameraWeightOperatorLabel === 'function' ? function safeGetAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    try {
      var label = shared.getAutoGearCameraWeightOperatorLabel(operator, langTexts);
      if (typeof label === 'string' && label) {
        return label;
      }
    } catch (error) {
      void error;
    }
    return fallbackGetOperatorLabel(operator, langTexts);
  } : fallbackGetOperatorLabel;
  var fallbackFormatCameraWeight = createFallbackFormatAutoGearCameraWeight(formatWeight, getOperatorLabel);
  var formatCameraWeight = shared && typeof shared.formatAutoGearCameraWeight === 'function' ? function safeFormatAutoGearCameraWeight(condition, langTexts) {
    try {
      var formatted = shared.formatAutoGearCameraWeight(condition, langTexts);
      if (typeof formatted === 'string') {
        return formatted;
      }
    } catch (error) {
      void error;
    }
    return fallbackFormatCameraWeight(condition, langTexts);
  } : fallbackFormatCameraWeight;
  return {
    normalizeAutoGearWeightOperator: normalizeOperator,
    normalizeAutoGearWeightValue: normalizeValue,
    normalizeAutoGearCameraWeightCondition: normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight: formatWeight,
    getAutoGearCameraWeightOperatorLabel: getOperatorLabel,
    formatAutoGearCameraWeight: formatCameraWeight,
    fallbackGetAutoGearCameraWeightOperatorLabel: fallbackGetAutoGearCameraWeightOperatorLabel,
    fallbackFormatAutoGearCameraWeight: fallbackFormatCameraWeight
  };
}
function resolveRuntimeScopeTools(options) {
  var opts = options || {};
  var runtimeScope = typeof opts.runtimeScope !== 'undefined' ? opts.runtimeScope : typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' ? CORE_PART2_RUNTIME_SCOPE : null;
  var sharedScope = typeof opts.sharedScope !== 'undefined' ? opts.sharedScope : typeof CORE_SHARED_SCOPE_PART2 !== 'undefined' ? CORE_SHARED_SCOPE_PART2 : null;
  var globalScope = typeof opts.globalScope !== 'undefined' ? opts.globalScope : typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null;
  var candidates = fallbackCreateRuntimeScopeCandidates(runtimeScope, sharedScope, globalScope);
  var resolver = typeof opts.resolveSupportModule === 'function' ? opts.resolveSupportModule : typeof resolveCoreSupportModule === 'function' ? resolveCoreSupportModule : null;
  var runtimeScopeBridge = null;
  if (resolver) {
    try {
      var bridgeTools = resolver('cineCoreAppRuntimeScopeBridge', './modules/app-core/runtime.js');
      if (bridgeTools && _typeof(bridgeTools) === 'object' && typeof bridgeTools.createRuntimeScopeBridge === 'function') {
        runtimeScopeBridge = bridgeTools.createRuntimeScopeBridge({
          primaryScope: runtimeScope,
          additionalScopes: [sharedScope, globalScope]
        });
      }
    } catch (bridgeError) {
      void bridgeError;
    }
  }
  if (runtimeScopeBridge && _typeof(runtimeScopeBridge) === 'object' && Array.isArray(runtimeScopeBridge.candidates) && runtimeScopeBridge.candidates.length > 0) {
    candidates = runtimeScopeBridge.candidates;
  }
  function localFallbackRead(name) {
    return fallbackReadCoreScopeValue(name, candidates);
  }
  function localFallbackWrite(name, value) {
    return fallbackWriteCoreScopeValue(name, value, candidates);
  }
  function localFallbackDeclare(name, factory) {
    return fallbackDeclareCoreFallbackBinding(name, factory, candidates);
  }
  return {
    runtimeScopeBridge: runtimeScopeBridge,
    runtimeScopeCandidates: candidates,
    readCoreScopeValue: runtimeScopeBridge && typeof runtimeScopeBridge.readValue === 'function' ? runtimeScopeBridge.readValue : localFallbackRead,
    writeCoreScopeValue: runtimeScopeBridge && typeof runtimeScopeBridge.writeValue === 'function' ? runtimeScopeBridge.writeValue : localFallbackWrite,
    declareCoreFallbackBinding: runtimeScopeBridge && typeof runtimeScopeBridge.declareFallbackBinding === 'function' ? runtimeScopeBridge.declareFallbackBinding : localFallbackDeclare,
    fallbackReadCoreScopeValue: localFallbackRead,
    fallbackWriteCoreScopeValue: localFallbackWrite,
    fallbackDeclareCoreFallbackBinding: localFallbackDeclare
  };
}
var CORE_PART2_RUNTIME_HELPERS = function initialisePart2RuntimeHelpers() {
  var helpers = null;
  if (typeof resolveCoreSupportModule === 'function') {
    try {
      var resolved = resolveCoreSupportModule('cineCorePart2RuntimeHelpers', './modules/app-core/runtime.js');
      if (resolved && _typeof(resolved) === 'object') {
        helpers = resolved;
      }
    } catch (helperResolutionError) {
      void helperResolutionError;
    }
  }
  if (helpers && _typeof(helpers) === 'object') {
    return helpers;
  }
  return {
    resolveAutoGearWeightHelpers: resolveAutoGearWeightHelpers,
    resolveRuntimeScopeTools: resolveRuntimeScopeTools,
    fallbackNormalizeAutoGearWeightOperator: fallbackNormalizeAutoGearWeightOperator,
    fallbackNormalizeAutoGearWeightValue: fallbackNormalizeAutoGearWeightValue,
    fallbackFormatAutoGearWeight: fallbackFormatAutoGearWeight,
    fallbackGetAutoGearCameraWeightOperatorLabel: createFallbackGetAutoGearCameraWeightOperatorLabel(fallbackNormalizeAutoGearWeightOperator, function fallbackTexts() {
      return createDefaultLanguageTexts(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
    }),
    fallbackFormatAutoGearCameraWeight: createFallbackFormatAutoGearCameraWeight(fallbackFormatAutoGearWeight, createFallbackGetAutoGearCameraWeightOperatorLabel(fallbackNormalizeAutoGearWeightOperator, function fallbackTexts() {
      return createDefaultLanguageTexts(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
    })),
    fallbackCreateRuntimeScopeCandidates: fallbackCreateRuntimeScopeCandidates,
    fallbackReadCoreScopeValue: fallbackReadCoreScopeValue,
    fallbackWriteCoreScopeValue: fallbackWriteCoreScopeValue,
    fallbackDeclareCoreFallbackBinding: fallbackDeclareCoreFallbackBinding
  };
}();
(function exposePart2RuntimeHelpers(namespace) {
  if (!namespace || _typeof(namespace) !== 'object') {
    return;
  }
  var candidateScopes = createArrayFromCandidates(typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' ? CORE_PART2_RUNTIME_SCOPE : null, typeof CORE_SHARED_SCOPE_PART2 !== 'undefined' ? CORE_SHARED_SCOPE_PART2 : null, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var existing = scope.cineCorePart2RuntimeHelpers;
      if (existing && _typeof(existing) === 'object') {
        if (typeof Object.assign === 'function') {
          Object.assign(existing, namespace);
        } else {
          for (var key in namespace) {
            if (Object.prototype.hasOwnProperty.call(namespace, key)) {
              existing[key] = namespace[key];
            }
          }
        }
        continue;
      }
      scope.cineCorePart2RuntimeHelpers = namespace;
    } catch (exposeError) {
      void exposeError;
    }
  }
})(CORE_PART2_RUNTIME_HELPERS);
