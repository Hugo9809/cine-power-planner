function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function initAutoGearWeightHelpers(globalScope) {
  if (!globalScope || _typeof(globalScope) !== 'object') {
    globalScope = {};
  }
  var operatorLookup = {
    greater: true,
    less: true,
    equal: true
  };
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
    if (normalized === '=' || normalized === '==' || normalized === 'equal' || normalized === 'equals' || normalized === 'exactly' || normalized === 'match' || normalized === 'matches') {
      return 'equal';
    }
    return operatorLookup[normalized] ? normalized : 'greater';
  }
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
      var unitTokens = unitFragment.split(/\s+/).map(function (token) {
        return token.replace(/[^a-z]/g, '');
      }).filter(Boolean);
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
  function normalizeAutoGearCameraWeightCondition(setting) {
    if (!setting) return null;
    if (Array.isArray(setting)) {
      if (setting.length >= 2) {
        return normalizeAutoGearCameraWeightCondition({
          operator: setting[0],
          value: setting[1]
        });
      }
      if (setting.length === 1) {
        return normalizeAutoGearCameraWeightCondition({
          value: setting[0]
        });
      }
      return null;
    }
    if (_typeof(setting) === 'object') {
      var operatorSource = setting.operator !== undefined ? setting.operator : setting.comparison !== undefined ? setting.comparison : setting.type !== undefined ? setting.type : setting.mode !== undefined ? setting.mode : setting.condition;
      var operator = normalizeAutoGearWeightOperator(operatorSource);
      var valueSource = setting.value !== undefined ? setting.value : setting.weight !== undefined ? setting.weight : setting.threshold !== undefined ? setting.threshold : setting.grams !== undefined ? setting.grams : setting.g !== undefined ? setting.g : setting.amount;
      var normalizedValue = normalizeAutoGearWeightValue(valueSource);
      if (normalizedValue == null) return null;
      return {
        operator: operator,
        value: normalizedValue
      };
    }
    if (typeof setting === 'number' || typeof setting === 'string') {
      var normalized = normalizeAutoGearWeightValue(setting);
      if (normalized == null) return null;
      return {
        operator: 'greater',
        value: normalized
      };
    }
    return null;
  }
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
  function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    var textsForLang = langTexts && _typeof(langTexts) === 'object' ? langTexts : {};
    var globalTexts = globalScope && globalScope.texts && _typeof(globalScope.texts) === 'object' ? globalScope.texts : {
      en: {}
    };
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
  function formatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
    var formattedValue = formatAutoGearWeight(condition.value);
    return label + ' ' + formattedValue + ' g';
  }
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
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});