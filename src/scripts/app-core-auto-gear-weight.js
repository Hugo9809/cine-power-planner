(function registerAutoGearWeightHelpers(globalScope) {
  function createAutoGearWeightHelpers({
    corePart2Helpers,
    coreRuntimeFallbacks,
    coreShared,
    coreGlobalScope,
  }) {
    const autoGearHelpers =
      corePart2Helpers && typeof corePart2Helpers.resolveAutoGearWeightHelpers === 'function'
        ? corePart2Helpers.resolveAutoGearWeightHelpers({
            coreShared,
            globalScope: coreGlobalScope || null,
          })
        : null;

    const fallbackNormalizeAutoGearWeightOperator =
      typeof coreRuntimeFallbacks?.fallbackNormalizeAutoGearWeightOperator === 'function'
        ? coreRuntimeFallbacks.fallbackNormalizeAutoGearWeightOperator
        : function normalizeAutoGearWeightOperatorFallback() {
            return 'greater';
          };

    const fallbackNormalizeAutoGearWeightValue =
      typeof coreRuntimeFallbacks?.fallbackNormalizeAutoGearWeightValue === 'function'
        ? coreRuntimeFallbacks.fallbackNormalizeAutoGearWeightValue
        : function normalizeAutoGearWeightValueFallback() {
            return null;
          };

    const fallbackFormatAutoGearWeight =
      typeof coreRuntimeFallbacks?.fallbackFormatAutoGearWeight === 'function'
        ? coreRuntimeFallbacks.fallbackFormatAutoGearWeight
        : function formatAutoGearWeightFallback() {
            return '';
          };

    const fallbackGetAutoGearCameraWeightOperatorLabel =
      typeof coreRuntimeFallbacks?.fallbackGetAutoGearCameraWeightOperatorLabel === 'function'
        ? coreRuntimeFallbacks.fallbackGetAutoGearCameraWeightOperatorLabel
        : function getAutoGearCameraWeightOperatorLabelFallback(operator, langTexts) {
            const textsForLang = langTexts || {};
            const normalized = fallbackNormalizeAutoGearWeightOperator(operator);
            if (normalized === 'less') {
              return textsForLang.autoGearCameraWeightOperatorLess || '';
            }
            if (normalized === 'equal') {
              return textsForLang.autoGearCameraWeightOperatorEqual || '';
            }
            return textsForLang.autoGearCameraWeightOperatorGreater || '';
          };

    const fallbackFormatAutoGearCameraWeight =
      typeof coreRuntimeFallbacks?.fallbackFormatAutoGearCameraWeight === 'function'
        ? coreRuntimeFallbacks.fallbackFormatAutoGearCameraWeight
        : function formatAutoGearCameraWeightFallback(condition, langTexts) {
            if (!condition || !Number.isFinite(condition.value)) {
              return '';
            }
            const label = fallbackGetAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
            const formattedValue = fallbackFormatAutoGearWeight(condition.value);
            return label ? `${label} ${formattedValue} g` : `${formattedValue} g`;
          };

    const normalizeAutoGearWeightOperator =
      autoGearHelpers && typeof autoGearHelpers.normalizeAutoGearWeightOperator === 'function'
        ? autoGearHelpers.normalizeAutoGearWeightOperator
        : fallbackNormalizeAutoGearWeightOperator;

    const normalizeAutoGearWeightValue =
      autoGearHelpers && typeof autoGearHelpers.normalizeAutoGearWeightValue === 'function'
        ? autoGearHelpers.normalizeAutoGearWeightValue
        : fallbackNormalizeAutoGearWeightValue;

    const normalizeAutoGearCameraWeightCondition =
      autoGearHelpers && typeof autoGearHelpers.normalizeAutoGearCameraWeightCondition === 'function'
        ? autoGearHelpers.normalizeAutoGearCameraWeightCondition
        : typeof coreRuntimeFallbacks?.fallbackNormalizeAutoGearCameraWeightCondition === 'function'
          ? coreRuntimeFallbacks.fallbackNormalizeAutoGearCameraWeightCondition
          : function normalizeAutoGearCameraWeightConditionFallback() {
              return null;
            };

    const formatAutoGearWeight =
      autoGearHelpers && typeof autoGearHelpers.formatAutoGearWeight === 'function'
        ? autoGearHelpers.formatAutoGearWeight
        : fallbackFormatAutoGearWeight;

    const getAutoGearCameraWeightOperatorLabel =
      autoGearHelpers && typeof autoGearHelpers.getAutoGearCameraWeightOperatorLabel === 'function'
        ? autoGearHelpers.getAutoGearCameraWeightOperatorLabel
        : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
            return fallbackGetAutoGearCameraWeightOperatorLabel(operator, langTexts);
          };

    const formatAutoGearCameraWeight =
      autoGearHelpers && typeof autoGearHelpers.formatAutoGearCameraWeight === 'function'
        ? autoGearHelpers.formatAutoGearCameraWeight
        : fallbackFormatAutoGearCameraWeight;

    return {
      autoGearHelpers,
      normalizeAutoGearWeightOperator,
      normalizeAutoGearWeightValue,
      normalizeAutoGearCameraWeightCondition,
      formatAutoGearWeight,
      getAutoGearCameraWeightOperatorLabel,
      formatAutoGearCameraWeight,
    };
  }

  if (globalScope && Object.isExtensible(globalScope)) {
    globalScope.CINE_CORE_PART2_CREATE_AUTO_GEAR_WEIGHT_HELPERS = createAutoGearWeightHelpers;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this);
