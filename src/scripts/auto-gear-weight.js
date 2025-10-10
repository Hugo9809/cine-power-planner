// ---------------------------------------------------------------------------
// Auto gear weight helpers
// ---------------------------------------------------------------------------
// These utilities normalise and evaluate weight related rules for the automatic
// gear selection feature. The routines are shared between the modern module
// loader and the legacy global bundle, which is why the implementation keeps its
// own dependency surface tiny and operates purely on primitives. Human friendly
// comments here explain the reasoning behind each transformation so the
// behaviour stays predictable when future contributors adjust parsing or add new
// weight units.
(function initAutoGearWeightHelpers(globalScope) {
  if (!globalScope || typeof globalScope !== 'object') {
    globalScope = {};
  }

  // Accept a fixed set of operators. Using an object instead of an array makes
  // membership checks O(1) when we encounter previously normalised strings.
  var operatorLookup = {
    greater: true,
    less: true,
    equal: true
  };

  // Interpret user provided operator tokens. The comparison builder allows
  // people to type shorthand such as "gt" or mathematical symbols. Anything we
  // do not explicitly recognise is treated as "greater" so the planner errs on
  // the side of being conservative (showing more equipment rather than less).
  function normalizeAutoGearWeightOperator(value) {
    if (typeof value !== 'string') return 'greater';
    var normalized = value.trim().toLowerCase();
    if (!normalized) return 'greater';
    if (normalized === '>' || normalized === 'gt' || normalized === 'greaterthan' || normalized === 'above' || normalized === 'over') {
      return 'greater';
    }
    if (normalized === '<' || normalized === 'lt' || normalized === 'lessthan' || normalized === 'below' || normalized === 'under') {
      return 'less';
    }
    if (
      normalized === '=' ||
      normalized === '==' ||
      normalized === 'equal' ||
      normalized === 'equals' ||
      normalized === 'exactly' ||
      normalized === 'match' ||
      normalized === 'matches'
    ) {
      return 'equal';
    }
    return operatorLookup[normalized] ? normalized : 'greater';
  }

  // Parse a weight value supplied as either a number or a human readable
  // string. The function supports metric and imperial units and gracefully
  // ignores unknown fragments so that imported projects from older releases do
  // not fail. The result is always returned in grams because that is what the
  // planner stores internally.
  function normalizeAutoGearWeightValue(value) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      var roundedNumber = Math.round(value);
      return roundedNumber >= 0 ? roundedNumber : null;
    }
    if (typeof value === 'string') {
      var trimmed = value.trim();
      if (!trimmed) return null;
      var lowerCased = trimmed.toLowerCase();
      var multiplier = 1;
      var unitFragment = lowerCased.replace(/[-0-9.,]/g, ' ');
      var unitTokens = unitFragment
        .split(/\s+/)
        .map(function (token) { return token.replace(/[^a-z]/g, ''); })
        .filter(Boolean);
      for (var i = 0; i < unitTokens.length; i += 1) {
        var token = unitTokens[i];
        if (token === 'kg' || token === 'kilogram' || token === 'kilograms' || token === 'kilo' || token === 'kilos') {
          multiplier = 1000;
          break;
        }
        if (token === 'lb' || token === 'lbs' || token === 'pound' || token === 'pounds') {
          multiplier = 453.59237;
          break;
        }
        if (token === 'oz' || token === 'ounce' || token === 'ounces') {
          multiplier = 28.349523125;
          break;
        }
      }
      var sanitized = lowerCased.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
      if (!sanitized) return null;
      var parsed = Number.parseFloat(sanitized);
      if (!Number.isFinite(parsed)) return null;
      var converted = parsed * multiplier;
      var roundedParsed = Math.round(converted);
      return roundedParsed >= 0 ? roundedParsed : null;
    }
    return null;
  }

  // Consume a loosely structured condition object (or array) and convert it
  // into the canonical `{ operator, value }` shape used by the rest of the
  // runtime. This ensures serialised backups from previous versions continue to
  // hydrate correctly even if the key names changed.
  function normalizeAutoGearCameraWeightCondition(setting) {
    if (!setting) return null;
    if (Array.isArray(setting)) {
      if (setting.length >= 2) {
        return normalizeAutoGearCameraWeightCondition({ operator: setting[0], value: setting[1] });
      }
      if (setting.length === 1) {
        return normalizeAutoGearCameraWeightCondition({ value: setting[0] });
      }
      return null;
    }
    if (typeof setting === 'object') {
      var operatorSource =
        setting.operator !== undefined ? setting.operator :
        setting.comparison !== undefined ? setting.comparison :
        setting.type !== undefined ? setting.type :
        setting.mode !== undefined ? setting.mode :
        setting.condition;
      var operator = normalizeAutoGearWeightOperator(operatorSource);
      var valueSource =
        setting.value !== undefined ? setting.value :
        setting.weight !== undefined ? setting.weight :
        setting.threshold !== undefined ? setting.threshold :
        setting.grams !== undefined ? setting.grams :
        setting.g !== undefined ? setting.g :
        setting.amount;
      var normalizedValue = normalizeAutoGearWeightValue(valueSource);
      if (normalizedValue == null) return null;
      return { operator: operator, value: normalizedValue };
    }
    if (typeof setting === 'number' || typeof setting === 'string') {
      var normalized = normalizeAutoGearWeightValue(setting);
      if (normalized == null) return null;
      return { operator: 'greater', value: normalized };
    }
    return null;
  }

  // Format a plain number using the user's locale if possible. Errors are
  // swallowed deliberately because some browsers restrict Intl usage during
  // private mode or low memory situations, and we would rather show the raw
  // value than crash.
  function formatAutoGearWeight(value) {
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

  // Look up the translated label for a given operator. We prefer the language
  // specific texts if available and fall back to English so that even partially
  // translated installations remain usable.
  function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    var textsForLang = langTexts && typeof langTexts === 'object' ? langTexts : {};
    var globalTexts = globalScope && globalScope.texts && typeof globalScope.texts === 'object'
      ? globalScope.texts
      : { en: {} };
    var fallback = globalTexts.en || {};
    var normalized = normalizeAutoGearWeightOperator(operator);
    if (normalized === 'less') {
      return textsForLang.autoGearCameraWeightOperatorLess || fallback.autoGearCameraWeightOperatorLess || 'Lighter than';
    }
    if (normalized === 'equal') {
      return textsForLang.autoGearCameraWeightOperatorEqual || fallback.autoGearCameraWeightOperatorEqual || 'Exactly';
    }
    return textsForLang.autoGearCameraWeightOperatorGreater || fallback.autoGearCameraWeightOperatorGreater || 'Heavier than';
  }

  // Combine the operator label and the numeric value into a sentence fragment
  // that can be displayed directly in the UI.
  function formatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
    var formattedValue = formatAutoGearWeight(condition.value);
    return label + ' ' + formattedValue + ' g';
  }

  // Evaluate a weight condition against the currently selected camera weight.
  // The logic is intentionally straightforward so it matches the copy shown to
  // the user.
  function evaluateAutoGearCameraWeightCondition(condition, selectedCameraWeight) {
    if (!condition || !Number.isFinite(condition.value)) return false;
    if (!Number.isFinite(selectedCameraWeight)) return false;
    var operator = normalizeAutoGearWeightOperator(condition.operator);
    if (operator === 'less') {
      return selectedCameraWeight < condition.value;
    }
    if (operator === 'equal') {
      return selectedCameraWeight === condition.value;
    }
    return selectedCameraWeight > condition.value;
  }

  var exported = {
    normalizeAutoGearWeightOperator: normalizeAutoGearWeightOperator,
    normalizeAutoGearWeightValue: normalizeAutoGearWeightValue,
    normalizeAutoGearCameraWeightCondition: normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight: formatAutoGearWeight,
    getAutoGearCameraWeightOperatorLabel: getAutoGearCameraWeightOperatorLabel,
    formatAutoGearCameraWeight: formatAutoGearCameraWeight,
    evaluateAutoGearCameraWeightCondition: evaluateAutoGearCameraWeightCondition
  };

  for (var key in exported) {
    if (Object.prototype.hasOwnProperty.call(exported, key)) {
      globalScope[key] = exported[key];
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
})(typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : {});
