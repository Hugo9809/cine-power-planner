/* global CORE_GLOBAL_SCOPE, CORE_PART2_RUNTIME_HELPERS, setSelectValue */

if (CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 2) already initialized. Skipping duplicate load.');
  }
} else {
  if (CORE_PART2_RUNTIME_SCOPE) {
    try {
      Object.defineProperty(CORE_PART2_RUNTIME_SCOPE, '__cineCorePart2Initialized', {
        configurable: true,
        writable: true,
        value: true,
      });
    } catch (corePart2InitError) {
      CORE_PART2_RUNTIME_SCOPE.__cineCorePart2Initialized = true;
      void corePart2InitError;
    }
  }

  const CORE_PART1_RUNNER =
    CORE_PART2_RUNTIME_SCOPE && CORE_PART2_RUNTIME_SCOPE.__cineCorePart1Runner;

  function corePart2Runtime() {
    console.log('app-core-new-2.js: corePart2Runtime starting');
    const CORE_SHARED_SCOPE_PART2 = CORE_PART2_RUNTIME_SCOPE;

    function resolveCoreSharedPart2() {
      if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.cineCoreShared) {
        return CORE_SHARED_SCOPE_PART2.cineCoreShared;
      }
      if (typeof require === 'function') {
        try {
          return require('./modules/core-shared.js');
        } catch (error) {
          void error;
        }
      }
      return null;
    }

    const CORE_SHARED_LOCAL =
      typeof CORE_SHARED !== 'undefined' && CORE_SHARED
        ? CORE_SHARED
        : resolveCoreSharedPart2() || {};
    console.log('app-core-new-2.js: CORE_SHARED_LOCAL resolved');

    const collectAutoGearSelectedValues = (function resolveCollectAutoGearSelectedValues() {
      const candidateScopes = [
        CORE_SHARED_LOCAL,
        CORE_PART2_RUNTIME_SCOPE,
        typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
      ].filter(scope => scope && (typeof scope === 'object' || typeof scope === 'function'));

      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        try {
          const candidate =
            (scope.autoGear && scope.autoGear.collectAutoGearSelectedValues)
            || (scope.autoGearUi && scope.autoGearUi.collectAutoGearSelectedValues)
            || scope.collectAutoGearSelectedValues;
          if (typeof candidate === 'function') {
            return candidate;
          }
        } catch (collectError) {
          void collectError;
        }
      }

      return function fallbackCollectAutoGearSelectedValues() { return []; };
    })();
    console.log('app-core-new-2.js: collectAutoGearSelectedValues resolved');

    function resolveCoreRuntimeHelpersPart2() {
      const candidates = [];

      if (typeof CORE_PART2_RUNTIME_HELPERS !== 'undefined' && CORE_PART2_RUNTIME_HELPERS) {
        candidates.push(CORE_PART2_RUNTIME_HELPERS);
      }

      if (CORE_SHARED_LOCAL && typeof CORE_SHARED_LOCAL.cineCoreRuntimeHelpers === 'object') {
        candidates.push(CORE_SHARED_LOCAL.cineCoreRuntimeHelpers);
      }

      if (
        typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' &&
        CORE_PART2_RUNTIME_SCOPE &&
        typeof CORE_PART2_RUNTIME_SCOPE.cineCoreRuntimeHelpers === 'object'
      ) {
        candidates.push(CORE_PART2_RUNTIME_SCOPE.cineCoreRuntimeHelpers);
      }

      if (
        typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
        CORE_GLOBAL_SCOPE &&
        typeof CORE_GLOBAL_SCOPE.cineCoreRuntimeHelpers === 'object'
      ) {
        candidates.push(CORE_GLOBAL_SCOPE.cineCoreRuntimeHelpers);
      }

      if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.cineCoreRuntimeHelpers === 'object') {
        candidates.push(globalThis.cineCoreRuntimeHelpers);
      }

      if (typeof window !== 'undefined' && window && typeof window.cineCoreRuntimeHelpers === 'object') {
        candidates.push(window.cineCoreRuntimeHelpers);
      }

      if (typeof self !== 'undefined' && self && typeof self.cineCoreRuntimeHelpers === 'object') {
        candidates.push(self.cineCoreRuntimeHelpers);
      }

      if (typeof global !== 'undefined' && global && typeof global.cineCoreRuntimeHelpers === 'object') {
        candidates.push(global.cineCoreRuntimeHelpers);
      }

      if (typeof require === 'function') {
        try {
          const required = require('./app-core-runtime-helpers.js');
          if (required && typeof required === 'object') {
            candidates.push(required);
          }
        } catch (runtimeHelpersError) {
          void runtimeHelpersError;
        }
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      }

      return null;
    }

    const CORE_PART2_HELPERS =
      typeof CORE_PART2_RUNTIME_HELPERS === 'object' && CORE_PART2_RUNTIME_HELPERS
        ? CORE_PART2_RUNTIME_HELPERS
        : null;

    const CORE_RUNTIME_FALLBACKS = resolveCoreRuntimeHelpersPart2() || {};
    console.log('app-core-new-2.js: CORE_RUNTIME_FALLBACKS resolved');

    const CORE_RUNTIME_UI_BRIDGE = (function resolveCoreRuntimeUiBridgePart2() {
      const candidates = [];

      if (typeof require === 'function') {
        try {
          const requiredBridge = require('./app-core-runtime-ui.js');
          if (requiredBridge && typeof requiredBridge === 'object') {
            candidates.push(requiredBridge);
          }
        } catch (bridgeError) {
          void bridgeError;
        }
      }

      const scopes = [];

      try {
        if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
          scopes.push(CORE_GLOBAL_SCOPE);
        }
      } catch (coreScopeError) {
        void coreScopeError;
      }

      try {
        if (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE) {
          scopes.push(CORE_PART2_RUNTIME_SCOPE);
        }
      } catch (runtimeScopeError) {
        void runtimeScopeError;
      }

      if (typeof globalThis !== 'undefined' && globalThis) {
        scopes.push(globalThis);
      }

      if (typeof window !== 'undefined' && window) {
        scopes.push(window);
      }

      if (typeof self !== 'undefined' && self) {
        scopes.push(self);
      }

      if (typeof global !== 'undefined' && global) {
        scopes.push(global);
      }

      for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope) {
          continue;
        }

        try {
          const bridge = scope.cineCoreRuntimeUiBridge;
          if (bridge && typeof bridge === 'object') {
            candidates.push(bridge);
          }
        } catch (scopeLookupError) {
          void scopeLookupError;
        }
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      }

      return {};
    })();
    console.log('app-core-new-2.js: CORE_RUNTIME_UI_BRIDGE resolved');

    var escapeHtml = typeof CORE_RUNTIME_UI_BRIDGE.escapeHtml === 'function'
      ? CORE_RUNTIME_UI_BRIDGE.escapeHtml
      : function escapeHtmlFallback(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      };

    const setButtonLabelWithIcon =
      typeof CORE_RUNTIME_UI_BRIDGE.setButtonLabelWithIcon === 'function'
        ? CORE_RUNTIME_UI_BRIDGE.setButtonLabelWithIcon
        : function setButtonLabelWithIconFallback(button, label) {
          if (!button) {
            return;
          }

          const safeLabel = typeof label === 'string' ? label : '';

          try {
            button.textContent = escapeHtml(safeLabel);
          } catch (assignError) {
            void assignError;
          }
        };

    const autoGearHelpers =
      CORE_PART2_HELPERS && typeof CORE_PART2_HELPERS.resolveAutoGearWeightHelpers === 'function'
        ? CORE_PART2_HELPERS.resolveAutoGearWeightHelpers({
          coreShared: CORE_SHARED_LOCAL,
          globalScope:
            typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE
              ? CORE_GLOBAL_SCOPE
              : null,
        })
        : null;
    console.log('app-core-new-2.js: autoGearHelpers resolved');

    const fallbackNormalizeAutoGearWeightOperator =
      typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightOperator === 'function'
        ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightOperator
        : function normalizeAutoGearWeightOperatorFallback() {
          return 'greater';
        };

    const fallbackNormalizeAutoGearWeightValue =
      typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightValue === 'function'
        ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearWeightValue
        : function normalizeAutoGearWeightValueFallback() {
          return null;
        };

    const fallbackFormatAutoGearWeight =
      typeof CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearWeight === 'function'
        ? CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearWeight
        : function formatAutoGearWeightFallback() {
          return '';
        };

    const fallbackGetAutoGearCameraWeightOperatorLabel =
      typeof CORE_RUNTIME_FALLBACKS.fallbackGetAutoGearCameraWeightOperatorLabel === 'function'
        ? CORE_RUNTIME_FALLBACKS.fallbackGetAutoGearCameraWeightOperatorLabel
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
      typeof CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearCameraWeight === 'function'
        ? CORE_RUNTIME_FALLBACKS.fallbackFormatAutoGearCameraWeight
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
        : typeof CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearCameraWeightCondition === 'function'
          ? CORE_RUNTIME_FALLBACKS.fallbackNormalizeAutoGearCameraWeightCondition
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

    const runtimeScopeTools =
      CORE_PART2_HELPERS && typeof CORE_PART2_HELPERS.resolveRuntimeScopeTools === 'function'
        ? CORE_PART2_HELPERS.resolveRuntimeScopeTools({
          runtimeScope: CORE_PART2_RUNTIME_SCOPE,
          sharedScope: CORE_SHARED_SCOPE_PART2,
          globalScope:
            typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE
              ? CORE_GLOBAL_SCOPE
              : null,
        })
        : null;

    let runtimeScopeCandidatesRef =
      runtimeScopeTools && Array.isArray(runtimeScopeTools.runtimeScopeCandidates)
        ? runtimeScopeTools.runtimeScopeCandidates
        : CORE_PART2_HELPERS &&
          typeof CORE_PART2_HELPERS.fallbackCreateRuntimeScopeCandidates === 'function'
          ? CORE_PART2_HELPERS.fallbackCreateRuntimeScopeCandidates(
            CORE_PART2_RUNTIME_SCOPE,
            CORE_SHARED_SCOPE_PART2,
            typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
          )
          : [];

    const runtimeScopeBridge =
      runtimeScopeTools && runtimeScopeTools.runtimeScopeBridge
        ? runtimeScopeTools.runtimeScopeBridge
        : null;

    const readCoreScopeValue =
      runtimeScopeTools && typeof runtimeScopeTools.readCoreScopeValue === 'function'
        ? runtimeScopeTools.readCoreScopeValue
        : CORE_PART2_HELPERS &&
          typeof CORE_PART2_HELPERS.fallbackReadCoreScopeValue === 'function'
          ? function readCoreScopeValue(name) {
            return CORE_PART2_HELPERS.fallbackReadCoreScopeValue(
              name,
              runtimeScopeCandidatesRef
            );
          }
          : function readCoreScopeValue() {
            return undefined;
          };

    const resolveCoreBinding = (name, fallback) => {
      const defaultValue = fallback;
      let candidate = readCoreScopeValue(name);

      if (typeof candidate === 'undefined' || candidate === null) {
        try {
          const globalScope =
            (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE)
            || (typeof globalThis !== 'undefined' && globalThis)
            || (typeof window !== 'undefined' && window)
            || null;
          if (globalScope && name in globalScope) {
            candidate = globalScope[name];
          }
        } catch (globalReadError) {
          void globalReadError;
          candidate = undefined;
        }
      }

      if (typeof candidate === 'undefined' || candidate === null) {
        return defaultValue;
      }

      return candidate;
    };

    const writeCoreScopeValue =
      runtimeScopeTools && typeof runtimeScopeTools.writeCoreScopeValue === 'function'
        ? runtimeScopeTools.writeCoreScopeValue
        : CORE_PART2_HELPERS &&
          typeof CORE_PART2_HELPERS.fallbackWriteCoreScopeValue === 'function'
          ? function writeCoreScopeValue(name, value) {
            return CORE_PART2_HELPERS.fallbackWriteCoreScopeValue(
              name,
              value,
              runtimeScopeCandidatesRef
            );
          }
          : function writeCoreScopeValue() {
            return false;
          };

    const declareCoreFallbackBinding =
      runtimeScopeTools && typeof runtimeScopeTools.declareCoreFallbackBinding === 'function'
        ? runtimeScopeTools.declareCoreFallbackBinding
        : CORE_PART2_HELPERS &&
          typeof CORE_PART2_HELPERS.fallbackDeclareCoreFallbackBinding === 'function'
          ? function declareCoreFallbackBinding(name, factory) {
            return CORE_PART2_HELPERS.fallbackDeclareCoreFallbackBinding(
              name,
              factory,
              runtimeScopeCandidatesRef
            );
          }
          : function declareCoreFallbackBinding(name, factory) {
            return typeof factory === 'function' ? factory() : factory;
          };

    const CORE_RUNTIME_SCOPE_CANDIDATES = runtimeScopeCandidatesRef;

    var normalizePowerPortType = resolveCoreBinding('normalizePowerPortType', () => []);
    var motorPriority = resolveCoreBinding('motorPriority', () => 0);
    var controllerPriority = resolveCoreBinding('controllerPriority', () => 0);
    var isArri = resolveCoreBinding('isArri', () => false);
    var isArriOrCmotion = resolveCoreBinding('isArriOrCmotion', () => false);
    var fizNeedsPower = resolveCoreBinding('fizNeedsPower', () => false);
    var fizPowerPort = resolveCoreBinding('fizPowerPort', () => '');
    var controllerDistancePort = resolveCoreBinding('controllerDistancePort', () => '');
    var controllerCamPort = resolveCoreBinding('controllerCamPort', () => '');
    var cameraFizPort = resolveCoreBinding('cameraFizPort', () => '');
    var motorFizPort = resolveCoreBinding('motorFizPort', () => '');
    var getSelectedPlate = resolveCoreBinding('getSelectedPlate', () => null);
    var isSelectedPlateNative = resolveCoreBinding('isSelectedPlateNative', () => false);
    const formatConnLabel = resolveCoreBinding('formatConnLabel', () => '');
    const connectionLabel = resolveCoreBinding('connectionLabel', () => '');
    const fizPort = resolveCoreBinding('fizPort', () => '');
    const iconGlyph = resolveCoreBinding('iconGlyph', () => '');
    const ICON_FONT_KEYS = resolveCoreBinding('ICON_FONT_KEYS', {});



    function resolveRuntimeScopeFunction(name, exclude) {
      if (typeof name !== 'string' || !name) {
        return null;
      }

      const exclusions = [];
      if (Array.isArray(exclude)) {
        for (let index = 0; index < exclude.length; index += 1) {
          const item = exclude[index];
          if (typeof item === 'function') {
            exclusions.push(item);
          }
        }
      } else if (typeof exclude === 'function') {
        exclusions.push(exclude);
      }

      const inspectCandidate = candidate => {
        if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
          return null;
        }

        try {
          const value = candidate[name];
          if (typeof value === 'function') {
            for (let idx = 0; idx < exclusions.length; idx += 1) {
              if (value === exclusions[idx]) {
                return null;
              }
            }
            return value;
          }
        } catch (candidateError) {
          void candidateError;
        }

        return null;
      };

      const directSources = [
        CORE_RUNTIME_UI_BRIDGE,
        CORE_RUNTIME_FALLBACKS,
        CORE_PART2_HELPERS,
      ];

      for (let index = 0; index < directSources.length; index += 1) {
        const resolved = inspectCandidate(directSources[index]);
        if (resolved) {
          return resolved;
        }
      }

      if (Array.isArray(CORE_RUNTIME_SCOPE_CANDIDATES)) {
        for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
          const candidate = CORE_RUNTIME_SCOPE_CANDIDATES[index];
          const resolved = inspectCandidate(candidate);
          if (resolved) {
            return resolved;
          }
        }
      }

      const scopeCandidates = [];

      if (
        typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' &&
        CORE_PART2_RUNTIME_SCOPE &&
        (typeof CORE_PART2_RUNTIME_SCOPE === 'object' || typeof CORE_PART2_RUNTIME_SCOPE === 'function')
      ) {
        scopeCandidates.push(CORE_PART2_RUNTIME_SCOPE);
      }

      if (
        CORE_SHARED_SCOPE_PART2 &&
        (typeof CORE_SHARED_SCOPE_PART2 === 'object' || typeof CORE_SHARED_SCOPE_PART2 === 'function')
      ) {
        scopeCandidates.push(CORE_SHARED_SCOPE_PART2);
      }

      if (
        typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
        CORE_GLOBAL_SCOPE &&
        (typeof CORE_GLOBAL_SCOPE === 'object' || typeof CORE_GLOBAL_SCOPE === 'function')
      ) {
        scopeCandidates.push(CORE_GLOBAL_SCOPE);
      }

      if (typeof globalThis !== 'undefined' && globalThis) {
        scopeCandidates.push(globalThis);
      }

      if (typeof window !== 'undefined' && window) {
        scopeCandidates.push(window);
      }

      if (typeof self !== 'undefined' && self) {
        scopeCandidates.push(self);
      }

      if (typeof global !== 'undefined' && global) {
        scopeCandidates.push(global);
      }

      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const resolved = inspectCandidate(scopeCandidates[index]);
        if (resolved) {
          return resolved;
        }
      }

      return null;
    }

    function createDynamicScopeFunctionResolver(name, fallback) {
      const fallbackFn = typeof fallback === 'function'
        ? fallback
        : function identityFallback(value) {
          return value;
        };

      function dynamicResolverProxy() {
        const args = Array.prototype.slice.call(arguments);
        const resolved = resolveRuntimeScopeFunction(name, dynamicResolverProxy);
        if (typeof resolved === 'function') {
          try {
            return resolved.apply(this, args);
          } catch (resolvedError) {
            void resolvedError;
          }
        }
        return fallbackFn.apply(this, args);
      }

      return dynamicResolverProxy;
    }

    function fallbackGetViewfinderFallbackLabelLocal(value) {
      if (value === '__none__') {
        const activeLang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
        const textSource =
          typeof texts === 'object' && texts
            ? texts[activeLang] || texts.en || {}
            : {};
        return (
          textSource.viewfinderExtensionNone
          || textSource.autoGearViewfinderExtensionNone
          || 'No'
        );
      }
      return typeof value === 'string' ? value : '';
    }

    function fallbackGetVideoDistributionFallbackLabelLocal(value) {
      if (value === '__none__') {
        const activeLang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
        const textSource =
          typeof texts === 'object' && texts
            ? texts[activeLang] || texts.en || {}
            : {};
        return (
          textSource.autoGearVideoDistributionNone
          || 'No video distribution selected'
        );
      }
      return typeof value === 'string' ? value : '';
    }

    const getViewfinderFallbackLabel = createDynamicScopeFunctionResolver(
      'getViewfinderFallbackLabel',
      fallbackGetViewfinderFallbackLabelLocal,
    );

    const getVideoDistributionFallbackLabel = createDynamicScopeFunctionResolver(
      'getVideoDistributionFallbackLabel',
      fallbackGetVideoDistributionFallbackLabelLocal,
    );

    function ensureGlobalFunctionBinding(name, fn) {
      if (typeof name !== 'string' || !name || typeof fn !== 'function') {
        return;
      }

      const assignToScope = scope => {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }
        try {
          if (typeof scope[name] !== 'function') {
            scope[name] = fn;
          }
        } catch (assignError) {
          void assignError;
        }
      };

      if (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE) {
        assignToScope(CORE_PART2_RUNTIME_SCOPE);
      }

      assignToScope(CORE_SHARED_SCOPE_PART2);

      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
        assignToScope(CORE_GLOBAL_SCOPE);
      }

      if (typeof globalThis !== 'undefined' && globalThis) {
        assignToScope(globalThis);
      }

      if (typeof window !== 'undefined' && window) {
        assignToScope(window);
      }

      if (typeof self !== 'undefined' && self) {
        assignToScope(self);
      }

      if (typeof global !== 'undefined' && global) {
        assignToScope(global);
      }
    }

    ensureGlobalFunctionBinding('getViewfinderFallbackLabel', getViewfinderFallbackLabel);
    ensureGlobalFunctionBinding('getVideoDistributionFallbackLabel', getVideoDistributionFallbackLabel);

    ensureGlobalFunctionBinding('clearMonitorVideoInputs', clearMonitorVideoInputs);
    ensureGlobalFunctionBinding('ensureDefaultProjectInfoSnapshot', ensureDefaultProjectInfoSnapshot);
    ensureGlobalFunctionBinding('storeLoadedSetupState', storeLoadedSetupState);
    ensureGlobalFunctionBinding('attachSelectSearch', attachSelectSearch);
    ensureGlobalFunctionBinding('clearViewfinderVideoInputs', clearViewfinderVideoInputs);
    ensureGlobalFunctionBinding('clearVideoPowerInputs', clearVideoPowerInputs);
    ensureGlobalFunctionBinding('clearVideoInputs', clearVideoInputs);
    ensureGlobalFunctionBinding('clearVideoOutputsIO', clearVideoOutputsIO);
    ensureGlobalFunctionBinding('refreshDeviceLists', refreshDeviceLists);
    ensureGlobalFunctionBinding('clearMonitorVideoOutputs', clearMonitorVideoOutputs);
    ensureGlobalFunctionBinding('storeLoadedSetupState', storeLoadedSetupState);
    ensureGlobalFunctionBinding('attachSelectSearch', attachSelectSearch);
    ensureGlobalFunctionBinding('powerInputTypes', powerInputTypes);
    ensureGlobalFunctionBinding('checkSetupChanged', checkSetupChanged);
    ensureGlobalFunctionBinding('hasProjectInfoData', hasProjectInfoData);
    ensureGlobalFunctionBinding('getCurrentProjectInfo', getCurrentProjectInfo);

    autoGearAutoPresetIdState = declareCoreFallbackBinding('autoGearAutoPresetId', () => {
      if (typeof loadAutoGearAutoPresetId === 'function') {
        try {
          const storedId = loadAutoGearAutoPresetId();
          return typeof storedId === 'string' ? storedId : '';
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear auto preset identifier from storage.', error);
          }
        }
      }
      return '';
    });

    baseAutoGearRulesState = declareCoreFallbackBinding('baseAutoGearRules', () => {
      if (typeof loadAutoGearRules === 'function') {
        try {
          const storedRules = loadAutoGearRules();
          return Array.isArray(storedRules) ? storedRules.slice() : [];
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Failed to recover automatic gear rules from storage.', error);
          }
        }
      }
      return [];
    });

    autoGearScenarioModeSelectRef = declareCoreFallbackBinding('autoGearScenarioModeSelect', () => null);

    safeGenerateConnectorSummaryFn = declareCoreFallbackBinding(
      'safeGenerateConnectorSummary',
      () => createFallbackSafeGenerateConnectorSummary(),
    );

    var currentProjectInfo = null;
    let loadedSetupState = null;
    let loadedSetupStateSignature = '';
    var restoringSession = false;
    var skipNextGearListRefresh = false;

    let defaultProjectInfoSnapshot = null;

    const CORE_BOOT_QUEUE_KEY_PART2 = (function resolveBootQueueKeyPart2(scope) {
      if (scope && typeof scope === 'object') {
        const existingPublic = scope.CORE_BOOT_QUEUE_KEY;
        const existingHidden = scope.__cineCoreBootQueueKey;

        if (typeof existingPublic === 'string' && existingPublic) {
          return existingPublic;
        }

        if (typeof existingHidden === 'string' && existingHidden) {
          return existingHidden;
        }
      }

      return '__coreRuntimeBootQueue';
    })(CORE_SHARED_SCOPE_PART2);

    const CORE_BOOT_QUEUE_PART2 = (function bootstrapCoreBootQueuePart2(existingQueue) {
      if (Array.isArray(existingQueue)) {
        return existingQueue;
      }

      if (CORE_SHARED_SCOPE_PART2 && typeof CORE_SHARED_SCOPE_PART2 === 'object') {
        const shared = CORE_SHARED_SCOPE_PART2.cineCoreShared;
        if (shared && typeof shared === 'object') {
          const sharedQueue = shared[CORE_BOOT_QUEUE_KEY_PART2];
          if (Array.isArray(sharedQueue)) {
            return sharedQueue;
          }
          if (Object.isExtensible(shared)) {
            shared[CORE_BOOT_QUEUE_KEY_PART2] = [];
            return shared[CORE_BOOT_QUEUE_KEY_PART2];
          }
        }

        if (!Array.isArray(CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE)) {
          CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = [];
        }
        return CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE;
      }

      return [];
    })(CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE);

    if (CORE_SHARED_SCOPE_PART2 && CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE_PART2) {
      CORE_SHARED_SCOPE_PART2.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE_PART2;
    }

    function flushCoreBootQueue() {
      if (!Array.isArray(CORE_BOOT_QUEUE_PART2) || CORE_BOOT_QUEUE_PART2.length === 0) {
        return;
      }

      const pending = CORE_BOOT_QUEUE_PART2.splice(0, CORE_BOOT_QUEUE_PART2.length);
      for (let index = 0; index < pending.length; index += 1) {
        const task = pending[index];
        if (typeof task !== 'function') {
          continue;
        }
        try {
          task();
        } catch (taskError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Core boot task failed', taskError);
          }
        }
      }
    }

    const AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL =
      (typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN)
        ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN
        : '__any__';

    const coreStableStringify = typeof CORE_SHARED_LOCAL.stableStringify === 'function'
      ? CORE_SHARED_LOCAL.stableStringify
      : typeof CORE_SHARED_LOCAL.fallbackStableStringify === 'function'
        ? CORE_SHARED_LOCAL.fallbackStableStringify
        : typeof CORE_RUNTIME_FALLBACKS.fallbackStableStringify === 'function'
          ? CORE_RUNTIME_FALLBACKS.fallbackStableStringify
          : function fallbackStableStringifyProxy(value) {
            try {
              return JSON.stringify(value);
            } catch (serializationError) {
              void serializationError;
            }
            return String(value);
          };

    const coreHumanizeKey = typeof CORE_SHARED_LOCAL.humanizeKey === 'function'
      ? CORE_SHARED_LOCAL.humanizeKey
      : typeof CORE_SHARED_LOCAL.fallbackHumanizeKey === 'function'
        ? CORE_SHARED_LOCAL.fallbackHumanizeKey
        : typeof CORE_RUNTIME_FALLBACKS.fallbackHumanizeKey === 'function'
          ? CORE_RUNTIME_FALLBACKS.fallbackHumanizeKey
          : function fallbackHumanizeKeyProxy(key) {
            const stringValue = typeof key === 'string' ? key : String(key || '');
            return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
          };

    const sharedDeviceManagerLists = (() => {
      const candidates = [
        CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object'
          ? CORE_PART2_RUNTIME_SCOPE
          : null,
        (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
          ? CORE_GLOBAL_SCOPE
          : null,
        (typeof globalThis !== 'undefined' && typeof globalThis === 'object') ? globalThis : null,
        (typeof window !== 'undefined' && typeof window === 'object') ? window : null,
        (typeof self !== 'undefined' && typeof self === 'object') ? self : null,
        (typeof global !== 'undefined' && typeof global === 'object') ? global : null,
      ].filter(Boolean);

      for (let index = 0; index < candidates.length; index += 1) {
        const scope = candidates[index];
        if (scope && scope.deviceManagerLists instanceof Map) {
          return scope.deviceManagerLists;
        }
      }

      const fallback = new Map();
      const assignTarget = candidates.find(scope => scope && Object.isExtensible(scope));
      if (assignTarget) {
        try {
          assignTarget.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(assignTarget, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }
      return fallback;
    })();

    const activeDeviceManagerLists = (() => {
      const candidateScopes = [
        CORE_PART2_RUNTIME_SCOPE && typeof CORE_PART2_RUNTIME_SCOPE === 'object' ? CORE_PART2_RUNTIME_SCOPE : null,
        CORE_SHARED_SCOPE_PART2 && typeof CORE_SHARED_SCOPE_PART2 === 'object' ? CORE_SHARED_SCOPE_PART2 : null,
        (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
          ? CORE_GLOBAL_SCOPE
          : null,
        (typeof globalThis !== 'undefined' && typeof globalThis === 'object') ? globalThis : null,
        (typeof window !== 'undefined' && typeof window === 'object') ? window : null,
        (typeof self !== 'undefined' && typeof self === 'object') ? self : null,
        (typeof global !== 'undefined' && typeof global === 'object') ? global : null,
      ].filter(Boolean);

      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        const existing = scope && scope.deviceManagerLists;
        if (existing instanceof Map) {
          return existing;
        }
      }

      const fallback = sharedDeviceManagerLists instanceof Map ? sharedDeviceManagerLists : new Map();

      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        if (!scope) continue;
        const extensible = typeof Object.isExtensible === 'function' ? Object.isExtensible(scope) : true;
        if (!extensible) continue;
        try {
          scope.deviceManagerLists = fallback;
        } catch (assignError) {
          void assignError;
          try {
            Object.defineProperty(scope, 'deviceManagerLists', {
              configurable: true,
              writable: true,
              value: fallback,
            });
          } catch (defineError) {
            void defineError;
          }
        }
      }

      return fallback;
    })();

    function callCoreFunctionFromPart2(functionName, args = [], options = {}) {
      if (typeof callCoreFunctionIfAvailable === 'function') {
        return callCoreFunctionIfAvailable(functionName, args, options);
      }

      const scope =
        CORE_SHARED_SCOPE_PART2 ||
        (typeof globalThis !== 'undefined' ? globalThis : null) ||
        (typeof window !== 'undefined' ? window : null) ||
        (typeof self !== 'undefined' ? self : null) ||
        (typeof global !== 'undefined' ? global : null);

      const target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;

      if (typeof target === 'function') {
        try {
          return target.apply(scope, args);
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error(`Failed to invoke ${functionName}`, invokeError);
          }
        }
        return undefined;
      }

      if (options && options.defer === true && Array.isArray(CORE_BOOT_QUEUE_PART2)) {
        CORE_BOOT_QUEUE_PART2.push(() => {
          callCoreFunctionFromPart2(functionName, args, { ...options, defer: false });
        });
      }

      return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue')
        ? options.defaultValue
        : undefined;
    }

    const AUTO_GEAR_CREW_OPTION_TOOLS = resolveCoreSupportModule(
      'cineCoreAppRuntimeAutoGearCrew',
      './modules/app-core/runtime.js'
    );

    const AUTO_GEAR_CREW_OPTION_NAMESPACE =
      AUTO_GEAR_CREW_OPTION_TOOLS ||
      (typeof globalThis !== 'undefined' && globalThis.cineCoreAppRuntimeAutoGearCrew)
      || (typeof window !== 'undefined' && window.cineCoreAppRuntimeAutoGearCrew)
      || (typeof self !== 'undefined' && self.cineCoreAppRuntimeAutoGearCrew)
      || (typeof global !== 'undefined' && global.cineCoreAppRuntimeAutoGearCrew)
      || (typeof require === 'function'
        ? (function requireAutoGearCrewHelpers() {
          try {
            return require('./modules/app-core/runtime.js');
          } catch (autoGearCrewRequireError) {
            void autoGearCrewRequireError;
            return null;
          }
        })()
        : null);

    const AUTO_GEAR_CREW_HELPERS =
      AUTO_GEAR_CREW_OPTION_NAMESPACE &&
        typeof AUTO_GEAR_CREW_OPTION_NAMESPACE.createAutoGearCrewOptionHelpers === 'function'
        ? AUTO_GEAR_CREW_OPTION_NAMESPACE.createAutoGearCrewOptionHelpers({
          documentRef: typeof document !== 'undefined' ? document : null,
          collectSelectedValues: collectAutoGearSelectedValues,
          computeMultiSelectSize: computeAutoGearMultiSelectSize,
          getCrewRoleEntries,
          autoGearFlexMinRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS,
          getLocalizedTexts: () => texts[currentLang] || texts.en || {},
          getDefaultLanguageTexts: () => texts.en || {},
        })
        : null;

    const refreshAutoGearCrewOptions =
      AUTO_GEAR_CREW_HELPERS && typeof AUTO_GEAR_CREW_HELPERS.refreshCrewOptions === 'function'
        ? AUTO_GEAR_CREW_HELPERS.refreshCrewOptions
        : function refreshAutoGearCrewOptionsFallback(selectElement, selected, key) {
          if (!selectElement || typeof document === 'undefined') {
            return;
          }

          const selectedValues = collectAutoGearSelectedValues(selected, key);

          selectElement.innerHTML = '';
          selectElement.multiple = true;

          const entries = getCrewRoleEntries();
          const seen = new Set();

          const appendOption = (value, label) => {
            if (!value || seen.has(value)) return;
            const option = document.createElement('option');
            option.value = value;
            option.textContent = label;
            if (selectedValues.includes(value)) {
              option.selected = true;
            }
            selectElement.appendChild(option);
            seen.add(value);
          };

          entries.forEach(entry => appendOption(entry.value, entry.label));

          selectedValues.forEach(value => {
            if (!seen.has(value)) {
              appendOption(value, value);
            }
          });

          const selectableOptions = Array.from(selectElement.options || []).filter(option => !option.disabled);
          selectElement.size = computeAutoGearMultiSelectSize(selectableOptions.length, {
            minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS,
          });
        };

    const getCrewRoleLabel =
      AUTO_GEAR_CREW_HELPERS && typeof AUTO_GEAR_CREW_HELPERS.getCrewRoleLabel === 'function'
        ? AUTO_GEAR_CREW_HELPERS.getCrewRoleLabel
        : function getCrewRoleLabelFallback(value) {
          if (typeof value !== 'string') return '';
          const trimmed = value.trim();
          if (!trimmed) return '';
          const langTexts = texts[currentLang] || texts.en || {};
          const crewRoleMap = langTexts.crewRoles || texts.en?.crewRoles || {};
          return crewRoleMap?.[trimmed] || trimmed;
        };

    function refreshAutoGearCameraOptions(selected) {
      if (!autoGearCameraSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'camera');

      autoGearCameraSelect.innerHTML = '';
      autoGearCameraSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearCameraSelect.appendChild(option);
        seen.add(value);
      };

      if (cameraSelect) {
        Array.from(cameraSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearCameraSelect.options || []).filter(option => !option.disabled).length;
      autoGearCameraSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }

    function refreshAutoGearCameraWeightCondition(selected) {
      const source = (() => {
        if (selected && typeof selected === 'object' && !Array.isArray(selected)) {
          return selected;
        }
        if (Array.isArray(selected) && selected.length) {
          if (selected.length >= 2) {
            return { operator: selected[0], value: selected[1] };
          }
          return { value: selected[0] };
        }
        if (autoGearEditorDraft?.cameraWeight) {
          return autoGearEditorDraft.cameraWeight;
        }
        return null;
      })();
      const operator = normalizeAutoGearWeightOperator(source?.operator);
      if (autoGearCameraWeightOperator) {
        autoGearCameraWeightOperator.value = operator;
      }
      const normalized = normalizeAutoGearCameraWeightCondition(source);
      if (autoGearCameraWeightValueInput) {
        if (normalized) {
          autoGearCameraWeightValueInput.value = String(normalized.value);
        } else if (source && typeof source?.value === 'string') {
          autoGearCameraWeightValueInput.value = source.value;
        } else if (source && typeof source?.value === 'number' && Number.isFinite(source.value)) {
          autoGearCameraWeightValueInput.value = String(Math.round(source.value));
        } else {
          autoGearCameraWeightValueInput.value = '';
        }
      }
    }

    function updateAutoGearCameraWeightDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('cameraWeight')) {
        autoGearEditorDraft.cameraWeight = null;
        return;
      }
      const operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
      const thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
      const normalized = normalizeAutoGearCameraWeightCondition({ operator: operatorValue, value: thresholdValue });
      if (normalized) {
        autoGearEditorDraft.cameraWeight = { ...normalized };
      } else if (operatorValue) {
        autoGearEditorDraft.cameraWeight = {
          operator: normalizeAutoGearWeightOperator(operatorValue),
          value: null,
        };
      } else {
        autoGearEditorDraft.cameraWeight = null;
      }
    }

    function updateAutoGearShootingDaysDraft() {
      if (!autoGearEditorDraft) return;
      if (!isAutoGearConditionActive('shootingDays')) {
        autoGearEditorDraft.shootingDays = null;
        return;
      }
      const modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
      const valueSource = autoGearShootingDaysInput ? autoGearShootingDaysInput.value : '';
      const normalized = normalizeAutoGearShootingDaysCondition({ mode: modeValue, value: valueSource });
      if (normalized) {
        autoGearEditorDraft.shootingDays = { ...normalized };
        return;
      }
      const fallbackMode = typeof normalizeAutoGearShootingDayMode === 'function'
        ? normalizeAutoGearShootingDayMode(modeValue)
        : (typeof modeValue === 'string' && modeValue ? modeValue.trim().toLowerCase() : 'minimum');
      if (fallbackMode) {
        autoGearEditorDraft.shootingDays = { mode: fallbackMode, value: null };
      } else {
        autoGearEditorDraft.shootingDays = null;
      }
    }

    function refreshAutoGearMonitorOptions(selected) {
      if (!autoGearMonitorSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'monitor');

      autoGearMonitorSelect.innerHTML = '';
      autoGearMonitorSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMonitorSelect.appendChild(option);
        seen.add(value);
      };

      if (monitorSelect) {
        Array.from(monitorSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearMonitorSelect.options || []).filter(option => !option.disabled).length;
      autoGearMonitorSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }

    function refreshAutoGearTripodOptions(select, selected, key, placeholderKey, selectorType) {
      if (!select) return;

      const selectedValues = collectAutoGearSelectedValues(selected, key);
      select.innerHTML = '';
      select.multiple = true;

      const langTexts = texts[currentLang] || texts.en || {};
      const placeholder = langTexts[placeholderKey]
        || texts.en?.[placeholderKey]
        || 'Select options';
      const entries = collectAutoGearTripodNames(selectorType)
        .map(entry => (typeof entry === 'string' ? { value: entry, label: entry } : entry))
        .filter(Boolean);
      const seen = new Set();
      const addOption = (value, label) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        const keyValue = trimmed.toLowerCase();
        if (seen.has(keyValue)) return;
        const option = document.createElement('option');
        option.value = trimmed;
        option.textContent = label || formatAutoGearSelectorValue(selectorType, trimmed);
        if (selectedValues.includes(trimmed)) {
          option.selected = true;
        }
        select.appendChild(option);
        seen.add(keyValue);
      };

      entries.forEach(entry => {
        if (!entry) return;
        addOption(entry.value, entry.label);
      });

      selectedValues.forEach(value => {
        if (!value) return;
        const keyValue = value.trim().toLowerCase();
        if (keyValue && !seen.has(keyValue)) {
          addOption(value, formatAutoGearSelectorValue(selectorType, value));
        }
      });

      if (!select.options.length) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = placeholder;
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
      }

      const visibleCount = Array.from(select.options || []).filter(option => !option.disabled).length;
      select.size = computeAutoGearMultiSelectSize(visibleCount, { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS });
    }

    function refreshAutoGearTripodHeadOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodHeadBrandSelect,
        selected,
        'tripodHeadBrand',
        'autoGearTripodHeadBrandPlaceholder',
        'tripodHeadBrand'
      );
    }

    function refreshAutoGearTripodBowlOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodBowlSelect,
        selected,
        'tripodBowl',
        'autoGearTripodBowlPlaceholder',
        'tripodBowl'
      );
    }

    function refreshAutoGearTripodTypesOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodTypesSelect,
        selected,
        'tripodTypes',
        'autoGearTripodTypesPlaceholder',
        'tripodTypes'
      );
    }

    function refreshAutoGearTripodSpreaderOptions(selected) {
      refreshAutoGearTripodOptions(
        autoGearTripodSpreaderSelect,
        selected,
        'tripodSpreader',
        'autoGearTripodSpreaderPlaceholder',
        'tripodSpreader'
      );
    }

    function refreshAutoGearWirelessOptions(selected) {
      if (!autoGearWirelessSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'wireless');

      autoGearWirelessSelect.innerHTML = '';
      autoGearWirelessSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearWirelessSelect.appendChild(option);
        seen.add(value);
      };

      if (videoSelect) {
        Array.from(videoSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearWirelessSelect.options || []).filter(option => !option.disabled).length;
      autoGearWirelessSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }

    function refreshAutoGearMotorsOptions(selected) {
      if (!autoGearMotorsSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'motors');
      const langTexts = texts[currentLang] || texts.en || {};

      autoGearMotorsSelect.innerHTML = '';
      autoGearMotorsSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = formatAutoGearMotorValue(value, langTexts);
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearMotorsSelect.appendChild(option);
        seen.add(value);
      };

      const sourceSelects = Array.isArray(motorSelects) ? motorSelects : [];
      sourceSelects.forEach(sel => {
        Array.from(sel?.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearMotorsSelect.options || []).filter(option => !option.disabled).length;
      autoGearMotorsSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }

    function refreshAutoGearControllersOptions(selected) {
      if (!autoGearControllersSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'controllers');

      autoGearControllersSelect.innerHTML = '';
      autoGearControllersSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearControllersSelect.appendChild(option);
        seen.add(value);
      };

      const sourceSelects = Array.isArray(controllerSelects) ? controllerSelects : [];
      sourceSelects.forEach(sel => {
        Array.from(sel?.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      });

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearControllersSelect.options || []).filter(option => !option.disabled).length;
      autoGearControllersSelect.size = computeAutoGearMultiSelectSize(visibleCount);
    }

    function refreshAutoGearDistanceOptions(selected) {
      if (!autoGearDistanceSelect) return;

      const selectedValues = collectAutoGearSelectedValues(selected, 'distance');

      autoGearDistanceSelect.innerHTML = '';
      autoGearDistanceSelect.multiple = true;

      const seen = new Set();
      const addOption = value => {
        if (!value || seen.has(value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        if (selectedValues.includes(value)) {
          option.selected = true;
        }
        autoGearDistanceSelect.appendChild(option);
        seen.add(value);
      };

      if (distanceSelect) {
        Array.from(distanceSelect.options || []).forEach(opt => {
          if (!opt || !opt.value || opt.value === 'None') return;
          const label = (opt.textContent || opt.value || '').trim();
          if (!label) return;
          addOption(label);
        });
      }

      selectedValues.forEach(value => {
        if (!seen.has(value)) addOption(value);
      });

      const visibleCount = Array.from(autoGearDistanceSelect.options || []).filter(option => !option.disabled).length;
      autoGearDistanceSelect.size = computeAutoGearMultiSelectSize(
        visibleCount,
        { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
      );
    }

    function populateAutoGearCategorySelect(select, currentValue) {
      if (!select) return;
      const current = typeof currentValue === 'string' ? currentValue : '';
      select.innerHTML = '';

      const sortedCategories = Array.from(GEAR_LIST_CATEGORIES).sort((a, b) =>
        a.localeCompare(b, currentLang || 'en', { sensitivity: 'base' })
      );

      sortedCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        if (current === cat) opt.selected = true;
        select.appendChild(opt);
      });
      const customOpt = document.createElement('option');
      customOpt.value = AUTO_GEAR_CUSTOM_CATEGORY;
      customOpt.textContent = texts[currentLang]?.autoGearCustomCategory
        || texts.en?.autoGearCustomCategory
        || 'Custom Additions';
      if (!current) customOpt.selected = true;
      select.appendChild(customOpt);
    }

    function updateAutoGearCatalogOptions() {
      if (!autoGearItemCatalog) return;
      const names = collectAutoGearCatalogNames();
      autoGearItemCatalog.innerHTML = '';
      names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        autoGearItemCatalog.appendChild(option);
      });
      updateAutoGearMonitorCatalogOptions();
      updateAutoGearMonitorDefaultOptions();
    }

    function updateAutoGearMonitorDefaultOptions(targets = autoGearMonitorDefaultControls) {
      const controls = Array.isArray(targets) ? targets : [targets];
      const placeholder = getAutoGearMonitorDefaultPlaceholder();
      controls.forEach(control => {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        const select = control.select;
        const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        const names = collectAutoGearMonitorNames(type === 'directorMonitor' ? 'directorMonitor' : 'monitor');
        const previousValue = select.value || '';
        select.innerHTML = '';
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = placeholder;
        select.appendChild(placeholderOption);
        const added = new Set(['']);
        names.forEach(name => {
          if (!name) return;
          const key = name.toLowerCase();
          if (added.has(key)) return;
          const option = document.createElement('option');
          option.value = name;
          option.textContent = formatAutoGearSelectorValue(type, name);
          select.appendChild(option);
          added.add(key);
        });
        const currentValue = getAutoGearMonitorDefault(control.key);
        let normalizedValue = '';
        if (currentValue) {
          const match = names.find(name => name.toLowerCase() === currentValue.toLowerCase());
          if (match) {
            normalizedValue = match;
          } else {
            const option = document.createElement('option');
            option.value = currentValue;
            option.textContent = formatAutoGearSelectorValue(type, currentValue);
            select.appendChild(option);
            normalizedValue = currentValue;
          }
        }
        select.value = normalizedValue;
        if (!normalizedValue && previousValue && select.value !== previousValue && select.querySelector(`option[value="${previousValue}"]`)) {
          select.value = previousValue;
        }
        select.disabled = names.length === 0 && !normalizedValue;
      });
    }

    function renderAutoGearMonitorDefaultsControls() {
      autoGearMonitorDefaultControls.forEach(control => {
        if (!control || !control.select || !Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, control.key)) {
          return;
        }
        const select = control.select;
        const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[control.key];
        const currentValue = getAutoGearMonitorDefault(control.key);
        if (currentValue && !Array.from(select.options || []).some(option => option.value === currentValue)) {
          const option = document.createElement('option');
          option.value = currentValue;
          option.textContent = formatAutoGearSelectorValue(type, currentValue);
          select.appendChild(option);
        }
        const normalizedValue = currentValue || '';
        if (select.value !== normalizedValue) {
          select.value = normalizedValue;
        }
      });
    }

    function formatAutoGearCount(count, singularKey, pluralKey) {
      const langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        const template = langTexts[singularKey] || texts.en?.[singularKey];
        return template ? template.replace('%s', '1') : '1';
      }
      const template = langTexts[pluralKey] || texts.en?.[pluralKey];
      return template ? template.replace('%s', String(count)) : String(count);
    }

    function formatAutoGearItemSummary(item, options = {}) {
      if (!item || typeof item !== 'object') return '';
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return '';
      const {
        quantity,
        name,
        category,
        screenSize,
        selectorType,
        selectorDefault,
        selectorEnabled,
        notes,
      } = normalized;
      const langTexts = texts[currentLang] || texts.en || {};
      const includeSign = !!options.includeSign;
      const listType = options.listType || (options.includeSign ? 'add' : '');
      const includeCategory = options.includeCategory !== false;
      const baseQuantity = normalizeAutoGearQuantity(quantity);
      const signPrefix = includeSign
        ? (listType === 'remove' ? '−' : '+')
        : '';
      const quantityText = signPrefix ? `${signPrefix}${baseQuantity}` : String(baseQuantity);
      const nameText = name || '';
      if (!nameText) return quantityText;
      const categoryLabel = category
        ? category
        : (langTexts.autoGearCustomCategory || texts.en?.autoGearCustomCategory || '');
      let summary;
      if (includeCategory && categoryLabel) {
        const withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory
          || texts.en?.autoGearItemSummaryWithCategory
          || '%s × %s (%s)';
        summary = formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
      } else {
        const baseTemplate = langTexts.autoGearItemSummary
          || texts.en?.autoGearItemSummary
          || '%s × %s';
        summary = formatWithPlaceholders(baseTemplate, quantityText, nameText);
      }
      const details = [];
      if (screenSize) {
        details.push(screenSize);
      }
      if (selectorType && selectorType !== 'none') {
        const selectorLabel = getAutoGearSelectorLabel(selectorType);
        const formattedDefault = selectorDefault ? formatAutoGearSelectorValue(selectorType, selectorDefault) : '';
        if (selectorEnabled) {
          const selectorTemplate = formattedDefault
            ? (langTexts.autoGearSelectorSummaryWithDefault
              || texts.en?.autoGearSelectorSummaryWithDefault
              || '%s selector (default: %s)')
            : (langTexts.autoGearSelectorSummary
              || texts.en?.autoGearSelectorSummary
              || '%s selector');
          const selectorText = formattedDefault
            ? formatWithPlaceholders(selectorTemplate, selectorLabel, formattedDefault)
            : formatWithPlaceholders(selectorTemplate, selectorLabel);
          details.push(selectorText);
        } else if (formattedDefault) {
          const defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector
            || texts.en?.autoGearSelectorSummaryNoSelector
            || '%s default: %s';
          details.push(formatWithPlaceholders(defaultTemplate, selectorLabel, formattedDefault));
        } else if (selectorLabel) {
          details.push(selectorLabel);
        }
      }
      if (notes) {
        details.push(notes);
      }
      if (normalized.ownGearId) {
        const ownGearBadge = langTexts.autoGearOwnGearBadge
          || texts.en?.autoGearOwnGearBadge
          || 'Own gear';
        if (ownGearBadge) details.push(ownGearBadge);
      }
      if (details.length) {
        summary += ` – ${details.join(' – ')}`;
      }
      return summary;
    }

    function formatWithPlaceholders(template, ...values) {
      if (typeof template !== 'string') {
        return values.join(' ');
      }
      return values.reduce((acc, value) => acc.replace('%s', value), template);
    }

    function formatAutoGearRuleCount(count) {
      const langTexts = texts[currentLang] || texts.en || {};
      if (count === 1) {
        const template = langTexts.autoGearRulesCountOne || texts.en?.autoGearRulesCountOne;
        return template ? template.replace('%s', '1') : '1';
      }
      const template = langTexts.autoGearRulesCountOther || texts.en?.autoGearRulesCountOther;
      return template ? template.replace('%s', String(count)) : String(count);
    }

    let autoGearBackupDateFormatter = null;
    let autoGearBackupDateFormatterLocale = '';

    function ensureAutoGearBackupDateFormatter() {
      const resolvedLocale = resolveLanguageCode(currentLang);
      if (
        autoGearBackupDateFormatter
        && autoGearBackupDateFormatterLocale === resolvedLocale
      ) {
        return autoGearBackupDateFormatter;
      }

      if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
        try {
          autoGearBackupDateFormatter = new Intl.DateTimeFormat(resolvedLocale, {
            dateStyle: 'medium',
            timeStyle: 'short',
          });
          autoGearBackupDateFormatterLocale = resolvedLocale;
          return autoGearBackupDateFormatter;
        } catch (formatterError) {
          console.warn('Failed to create automatic gear backup date formatter', formatterError);
        }
      }

      autoGearBackupDateFormatter = null;
      autoGearBackupDateFormatterLocale = '';
      return null;
    }

    function formatAutoGearBackupCount(count) {
      const langTexts = texts[currentLang] || texts.en || {};
      const fallbackTexts = texts.en || {};
      if (count === 1) {
        const template = langTexts.storageAutoBackupsCountOne || fallbackTexts.storageAutoBackupsCountOne;
        if (typeof template === 'string' && template.includes('%s')) {
          return template.replace('%s', '1');
        }
        return '1 auto backup';
      }
      const template = langTexts.storageAutoBackupsCountOther || fallbackTexts.storageAutoBackupsCountOther;
      if (typeof template === 'string' && template.includes('%s')) {
        return template.replace('%s', String(count));
      }
      return `${count} auto backups`;
    }

    function formatAutoGearBackupTime(isoString) {
      if (typeof isoString !== 'string') return '';
      const date = new Date(isoString);
      if (Number.isNaN(date.valueOf())) return isoString;
      const formatter = ensureAutoGearBackupDateFormatter();
      if (formatter) {
        try {
          return formatter.format(date);
        } catch (error) {
          console.warn('Failed to format automatic gear backup timestamp', error);
        }
      }
      if (typeof date.toLocaleString === 'function') {
        return date.toLocaleString();
      }
      return date.toISOString();
    }

    function formatAutoGearBackupMeta(backup) {
      if (!backup) return '';
      const langTexts = texts[currentLang] || texts.en || {};
      const timeLabel = formatAutoGearBackupTime(backup.createdAt);
      const ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
      const rulesLabel = ruleCount === 0
        ? (langTexts.autoGearBackupClearsRules
          || texts.en?.autoGearBackupClearsRules
          || 'Clears all rules')
        : formatAutoGearRuleCount(ruleCount);
      const template = langTexts.autoGearBackupMeta || texts.en?.autoGearBackupMeta;
      const baseSummary = template && template.includes('%s')
        ? formatWithPlaceholders(template, timeLabel, rulesLabel)
        : `${timeLabel} · ${rulesLabel}`;
      const note = typeof backup.note === 'string' ? backup.note.trim() : '';
      if (note) {
        return `${baseSummary} – ${note}`;
      }
      return baseSummary;
    }

    function getAutoGearBackupSelectPlaceholder() {
      return texts[currentLang]?.autoGearBackupSelectPlaceholder
        || texts.en?.autoGearBackupSelectPlaceholder
        || 'Select a backup to restore';
    }

    function updateAutoGearBackupRestoreButtonState() {
      if (!autoGearBackupRestoreButton) return;
      const hasSelection = Boolean(autoGearBackupSelect && autoGearBackupSelect.value);
      autoGearBackupRestoreButton.disabled = !hasSelection;
    }

    function updateAutoGearBackupRetentionWarning(message = '') {
      autoGearBackupRetentionWarningText = typeof message === 'string' ? message : '';
      if (!autoGearBackupRetentionWarning) {
        return;
      }
      if (autoGearBackupRetentionWarningText) {
        autoGearBackupRetentionWarning.textContent = autoGearBackupRetentionWarningText;
        autoGearBackupRetentionWarning.hidden = false;
      } else {
        autoGearBackupRetentionWarning.textContent = '';
        autoGearBackupRetentionWarning.hidden = true;
      }
    }

    function renderAutoGearBackupRetentionControls() {
      const limitValue = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      if (autoGearBackupRetentionInput) {
        autoGearBackupRetentionInput.setAttribute('min', String(globalThis.AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE));
        autoGearBackupRetentionInput.setAttribute('max', String(AUTO_GEAR_BACKUP_RETENTION_MAX));
        if (autoGearBackupRetentionInput.value !== String(limitValue)) {
          autoGearBackupRetentionInput.value = String(limitValue);
        }
      }
      if (autoGearBackupRetentionSummary) {
        const template = texts[currentLang]?.autoGearBackupRetentionSummary
          || texts.en?.autoGearBackupRetentionSummary
          || 'Keeping the latest {limit}. Currently {stored} stored.';
        const limitLabel = formatAutoGearBackupCount(limitValue);
        const storedLabel = formatAutoGearBackupCount(autoGearBackups.length);
        const summary = template
          .replace('{limit}', limitLabel)
          .replace('{stored}', storedLabel);
        autoGearBackupRetentionSummary.textContent = summary;
      }
      updateAutoGearBackupRetentionWarning(autoGearBackupRetentionWarningText);
    }

    function getAutoGearPresetById(presetId) {
      if (!presetId) return null;
      return autoGearPresets.find(preset => preset.id === presetId) || null;
    }

    function getAutoGearAutoPresetLabel() {
      const langTexts = texts[currentLang] || texts.en || {};
      return langTexts.autoGearAutoPresetLabel
        || texts.en?.autoGearAutoPresetLabel
        || 'Autosaved rules';
    }

    function setAutoGearAutoPresetId(presetId, options = {}) {
      const normalized = typeof presetId === 'string' ? presetId : '';
      const persist = options.persist !== false;
      const skipRender = options.skipRender === true;
      if (autoGearAutoPresetIdState === normalized) {
        if (!skipRender) renderAutoGearPresetsControls();
        return;
      }
      autoGearAutoPresetIdState = normalized;
      writeCoreScopeValue('autoGearAutoPresetId', autoGearAutoPresetIdState);
      if (persist) {
        persistAutoGearAutoPresetId(autoGearAutoPresetIdState);
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }

    function reconcileAutoGearAutoPresetState(options = {}) {
      if (!autoGearAutoPresetIdState) {
        if (options.persist !== false) {
          persistAutoGearAutoPresetId('');
        }
        return false;
      }
      const managedExists = autoGearPresets.some(preset => preset.id === autoGearAutoPresetIdState);
      const otherExists = autoGearPresets.some(preset => preset.id !== autoGearAutoPresetIdState);
      if (!managedExists || otherExists) {
        setAutoGearAutoPresetId('', {
          persist: options.persist !== false,
          skipRender: options.skipRender === true,
        });
        return true;
      }
      return false;
    }

    function syncAutoGearAutoPreset(rules) {
      const normalizedRules = Array.isArray(rules) ? rules : [];
      reconcileAutoGearAutoPresetState({ persist: true, skipRender: true });
      if (!autoGearAutoPresetIdState) {
        if (autoGearPresets.length > 0) {
          return false;
        }
        const label = getAutoGearAutoPresetLabel();
        const normalizedPreset = normalizeAutoGearPreset({
          id: generateAutoGearId('preset'),
          label,
          rules: normalizedRules,
        });
        if (!normalizedPreset) {
          return false;
        }
        autoGearPresets.push(normalizedPreset);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId(normalizedPreset.id, { persist: true, skipRender: true });
        setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
        return true;
      }
      const managedIndex = autoGearPresets.findIndex(preset => preset.id === autoGearAutoPresetIdState);
      if (managedIndex === -1) {
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        return false;
      }
      if (autoGearPresets.length > 1) {
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        return false;
      }
      const managedPreset = autoGearPresets[managedIndex];
      const updatedPreset = normalizeAutoGearPreset({
        id: managedPreset.id,
        label: managedPreset.label,
        rules: normalizedRules,
      });
      if (!updatedPreset) {
        autoGearPresets.splice(managedIndex, 1);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        setActiveAutoGearPresetId('', { persist: true, skipRender: true });
        return true;
      }
      if (managedPreset.fingerprint !== updatedPreset.fingerprint) {
        autoGearPresets[managedIndex] = updatedPreset;
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
      }
      setActiveAutoGearPresetId(updatedPreset.id, { persist: true, skipRender: true });
      return managedPreset.fingerprint !== updatedPreset.fingerprint;
    }

    function setActiveAutoGearPresetId(presetId, options = {}) {
      const normalized = typeof presetId === 'string' ? presetId : '';
      const persist = options.persist !== false;
      const skipRender = options.skipRender === true;
      if (activeAutoGearPresetId === normalized) {
        if (!skipRender) renderAutoGearPresetsControls();
        return;
      }
      activeAutoGearPresetId = normalized;
      if (persist) {
        persistActiveAutoGearPresetId(activeAutoGearPresetId);
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }

    function resolveBaseAutoGearRulesSnapshot() {
      if (Array.isArray(baseAutoGearRulesState)) {
        return baseAutoGearRulesState;
      }

      const resolved = readCoreScopeValue('baseAutoGearRules');
      if (Array.isArray(resolved)) {
        return resolved;
      }

      for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        const scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        try {
          const value = scope.baseAutoGearRules;
          if (Array.isArray(value)) {
            return value;
          }
        } catch (fallbackError) {
          void fallbackError;
        }
      }

      return [];
    }

    function alignActiveAutoGearPreset(options = {}) {
      const skipRender = options.skipRender === true;
      const rulesSource = resolveBaseAutoGearRulesSnapshot();
      const fingerprint = createAutoGearRulesFingerprint(rulesSource);
      const matching = autoGearPresets.find(preset => preset.fingerprint === fingerprint) || null;
      if (matching) {
        setActiveAutoGearPresetId(matching.id, { persist: true, skipRender: true });
      } else if (activeAutoGearPresetId) {
        setActiveAutoGearPresetId('', { persist: true, skipRender: true });
      }
      if (!skipRender) {
        renderAutoGearPresetsControls();
      }
    }

    function renderAutoGearPresetsControls() {
      if (!autoGearPresetSelect) return;
      const placeholderText = texts[currentLang]?.autoGearPresetPlaceholder
        || texts.en?.autoGearPresetPlaceholder
        || 'Custom rules';
      const presets = sortAutoGearPresets(autoGearPresets.slice());
      autoGearPresets = presets;

      autoGearPresetSelect.innerHTML = '';

      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholderText;
      autoGearPresetSelect.appendChild(placeholderOption);

      presets.forEach(preset => {
        const option = document.createElement('option');
        option.value = preset.id;
        option.textContent = preset.label;
        autoGearPresetSelect.appendChild(option);
      });

      const targetValue = activeAutoGearPresetId || '';
      autoGearPresetSelect.value = targetValue;
      if (!targetValue) {
        placeholderOption.selected = true;
      }

      autoGearPresetSelect.disabled = presets.length === 0;
      autoGearPresetSelect.setAttribute('aria-disabled', presets.length === 0 ? 'true' : 'false');

      if (autoGearDeletePresetButton) {
        autoGearDeletePresetButton.disabled = !activeAutoGearPresetId;
      }

    }

    let autoGearPresetNameDialog = null;
    let autoGearPresetNameForm = null;
    let autoGearPresetNameLabel = null;
    let autoGearPresetNameInput = null;
    let autoGearPresetNameError = null;
    let autoGearPresetNameCancelButton = null;
    let autoGearPresetNameConfirmButton = null;
    let autoGearPresetNamePending = null;
    let autoGearPresetNamePreviousFocus = null;
    let autoGearPresetNameRequiredMessage = '';

    function ensureAutoGearPresetNameDialog() {
      if (autoGearPresetNameDialog) {
        return autoGearPresetNameDialog;
      }
      if (typeof document === 'undefined') {
        return null;
      }
      const panel = document.getElementById('autoGearPresetPanel');
      if (!panel) {
        return null;
      }

      const dialog = document.createElement('div');
      dialog.className = 'auto-gear-preset-name-dialog';
      dialog.hidden = true;
      dialog.setAttribute('aria-hidden', 'true');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');

      const card = document.createElement('div');
      card.className = 'auto-gear-preset-name-card';

      const form = document.createElement('form');
      form.className = 'auto-gear-preset-name-form';

      const label = document.createElement('label');
      label.className = 'auto-gear-preset-name-label';
      label.id = 'autoGearPresetNamePromptLabel';
      label.setAttribute('for', 'autoGearPresetNameInput');

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'autoGearPresetNameInput';
      input.className = 'auto-gear-preset-name-input';
      input.autocomplete = 'off';
      input.spellcheck = true;

      const error = document.createElement('p');
      error.id = 'autoGearPresetNameError';
      error.className = 'auto-gear-preset-name-error';
      error.setAttribute('aria-live', 'polite');

      const actions = document.createElement('div');
      actions.className = 'dialog-actions';

      const cancelButton = document.createElement('button');
      cancelButton.type = 'button';

      const confirmButton = document.createElement('button');
      confirmButton.type = 'submit';

      actions.append(cancelButton, confirmButton);
      form.append(label, input, error, actions);
      card.appendChild(form);
      dialog.appendChild(card);
      panel.appendChild(dialog);

      dialog.setAttribute('aria-labelledby', label.id);
      input.setAttribute('aria-describedby', error.id);

      autoGearPresetNameDialog = dialog;
      autoGearPresetNameForm = form;
      autoGearPresetNameLabel = label;
      autoGearPresetNameInput = input;
      autoGearPresetNameError = error;
      autoGearPresetNameCancelButton = cancelButton;
      autoGearPresetNameConfirmButton = confirmButton;

      form.addEventListener('submit', handleAutoGearPresetNameSubmit);
      cancelButton.addEventListener('click', cancelAutoGearPresetNameDialog);
      dialog.addEventListener('keydown', handleAutoGearPresetNameKeydown);

      return autoGearPresetNameDialog;
    }

    function getAutoGearPresetNameFocusTargets() {
      return [autoGearPresetNameInput, autoGearPresetNameCancelButton, autoGearPresetNameConfirmButton]
        .filter(element => element && typeof element.focus === 'function' && !element.disabled);
    }

    function handleAutoGearPresetNameKeydown(event) {
      if (!autoGearPresetNameDialog || autoGearPresetNameDialog.hidden) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelAutoGearPresetNameDialog();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = getAutoGearPresetNameFocusTargets();
        if (!focusable.length) {
          return;
        }
        const active = document.activeElement;
        let currentIndex = focusable.indexOf(active);
        if (currentIndex === -1) {
          currentIndex = 0;
        }
        if (event.shiftKey) {
          currentIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        } else {
          currentIndex = (currentIndex + 1) % focusable.length;
        }
        event.preventDefault();
        const target = focusable[currentIndex];
        if (target) {
          target.focus({ preventScroll: true });
        }
      }
    }

    function handleAutoGearPresetNameSubmit(event) {
      if (event) {
        event.preventDefault();
      }
      if (!autoGearPresetNameInput) {
        return;
      }
      const value = autoGearPresetNameInput.value.trim();
      if (!value) {
        if (autoGearPresetNameError && autoGearPresetNameRequiredMessage) {
          autoGearPresetNameError.textContent = autoGearPresetNameRequiredMessage;
        }
        autoGearPresetNameInput.focus({ preventScroll: true });
        autoGearPresetNameInput.select();
        return;
      }
      closeAutoGearPresetNameDialog(value);
    }

    function closeAutoGearPresetNameDialog(result) {
      if (!autoGearPresetNameDialog) {
        return;
      }
      autoGearPresetNameDialog.classList.remove('is-visible');
      autoGearPresetNameDialog.setAttribute('aria-hidden', 'true');
      autoGearPresetNameDialog.hidden = true;
      if (autoGearPresetNameError) {
        autoGearPresetNameError.textContent = '';
      }
      if (autoGearPresetNameInput) {
        autoGearPresetNameInput.value = '';
      }
      autoGearPresetNameRequiredMessage = '';
      const restoreFocus = autoGearPresetNamePreviousFocus;
      autoGearPresetNamePreviousFocus = null;
      if (typeof restoreFocus === 'function') {
        restoreFocus();
      } else if (autoGearSavePresetButton && typeof autoGearSavePresetButton.focus === 'function') {
        autoGearSavePresetButton.focus({ preventScroll: true });
      }
      if (autoGearPresetNamePending) {
        const { resolve } = autoGearPresetNamePending;
        autoGearPresetNamePending = null;
        resolve(typeof result === 'string' ? result : null);
      }
    }

    function cancelAutoGearPresetNameDialog() {
      closeAutoGearPresetNameDialog(null);
    }

    function requestAutoGearPresetName(promptMessage, defaultName, requiredMessage) {
      if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
        let promptResponse;
        let promptError = null;
        const promptStartedAt = Date.now();
        try {
          promptResponse = window.prompt(promptMessage, defaultName);
        } catch (error) {
          promptError = error;
        }
        const promptDuration = Date.now() - promptStartedAt;
        if (typeof promptResponse === 'string') {
          return Promise.resolve(promptResponse.trim());
        }
        const promptLikelyBlocked = promptError || promptDuration < 20;
        if (!promptLikelyBlocked && promptResponse === null) {
          return Promise.resolve(null);
        }
        if (promptLikelyBlocked) {
          console.warn('Prompt unavailable, falling back to inline auto gear preset dialog', promptError);
        }
      }

      const dialog = ensureAutoGearPresetNameDialog();
      if (!dialog) {
        return Promise.resolve(defaultName ? defaultName.trim() : '');
      }

      const confirmLabel = texts[currentLang]?.autoGearSavePresetButton
        || texts.en?.autoGearSavePresetButton
        || 'Save preset';
      const cancelLabel = texts[currentLang]?.autoGearCancelEdit
        || texts.en?.autoGearCancelEdit
        || 'Cancel';

      autoGearPresetNameRequiredMessage = requiredMessage || '';
      if (autoGearPresetNameLabel) {
        autoGearPresetNameLabel.textContent = promptMessage || '';
      }
      if (autoGearPresetNameConfirmButton) {
        autoGearPresetNameConfirmButton.textContent = confirmLabel;
        autoGearPresetNameConfirmButton.setAttribute('aria-label', confirmLabel);
      }
      if (autoGearPresetNameCancelButton) {
        autoGearPresetNameCancelButton.textContent = cancelLabel;
        autoGearPresetNameCancelButton.setAttribute('aria-label', cancelLabel);
      }
      if (autoGearPresetNameError) {
        autoGearPresetNameError.textContent = '';
      }
      if (autoGearPresetNameInput) {
        autoGearPresetNameInput.value = defaultName || '';
      }

      dialog.hidden = false;
      dialog.setAttribute('aria-hidden', 'false');
      dialog.classList.add('is-visible');

      const previouslyFocused = typeof document !== 'undefined' ? document.activeElement : null;
      autoGearPresetNamePreviousFocus = () => {
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
          previouslyFocused.focus({ preventScroll: true });
        } else if (autoGearSavePresetButton && typeof autoGearSavePresetButton.focus === 'function') {
          autoGearSavePresetButton.focus({ preventScroll: true });
        }
      };

      setTimeout(() => {
        if (autoGearPresetNameInput) {
          autoGearPresetNameInput.focus({ preventScroll: true });
          autoGearPresetNameInput.select();
        }
      }, 0);

      return new Promise(resolve => {
        autoGearPresetNamePending = { resolve };
      });
    }

    function applyAutoGearBackupVisibility() {
      const show = !!autoGearBackupsVisible;
      if (autoGearShowBackupsCheckbox) {
        autoGearShowBackupsCheckbox.checked = show;
        autoGearShowBackupsCheckbox.setAttribute('aria-pressed', show ? 'true' : 'false');
      }
      if (autoGearBackupsSection) {
        autoGearBackupsSection.classList.toggle('auto-gear-backups-collapsed', !show);
        autoGearBackupsSection.setAttribute('aria-expanded', show ? 'true' : 'false');
      }
      if (autoGearBackupControls) {
        autoGearBackupControls.hidden = !show;
        autoGearBackupControls.setAttribute('aria-hidden', show ? 'false' : 'true');
      }
      if (autoGearBackupsHiddenNotice) {
        autoGearBackupsHiddenNotice.hidden = show;
      }
      if (!show) {
        if (autoGearBackupSelect) autoGearBackupSelect.disabled = true;
        if (autoGearBackupRestoreButton) autoGearBackupRestoreButton.disabled = true;
      } else {
        updateAutoGearBackupRestoreButtonState();
      }
    }

    function setAutoGearBackupsVisible(show) {
      const next = !!show;
      if (autoGearBackupsVisible === next) {
        applyAutoGearBackupVisibility();
        return;
      }
      autoGearBackupsVisible = next;
      persistAutoGearBackupVisibility(autoGearBackupsVisible);
      if (autoGearBackupsVisible) {
        renderAutoGearBackupControls();
      } else {
        applyAutoGearBackupVisibility();
      }
    }

    function handleAutoGearPresetSelection(event) {
      if (!event || !autoGearPresetSelect) return;
      if (sharedImportProjectPresetActive) {
        sharedImportProjectPresetActive = false;
        sharedImportPreviousPresetId = '';
      }
      const presetId = event.target.value;
      if (!presetId) {
        setActiveAutoGearPresetId('', { persist: true });
        return;
      }
      const preset = getAutoGearPresetById(presetId);
      if (!preset) {
        setActiveAutoGearPresetId('', { persist: true });
        renderAutoGearPresetsControls();
        return;
      }
      const confirmTemplate = texts[currentLang]?.autoGearPresetApplyConfirm
        || texts.en?.autoGearPresetApplyConfirm
        || `Replace your automatic gear rules with the preset "${preset.label}"?`;
      const confirmMessage = confirmTemplate.includes('%s')
        ? formatWithPlaceholders(confirmTemplate, preset.label)
        : confirmTemplate;

      const performApply = () => {
        setAutoGearRules(preset.rules);
        updateAutoGearCatalogOptions();
        renderAutoGearRulesList();
        const appliedMessage = texts[currentLang]?.autoGearPresetApplied
          || texts.en?.autoGearPresetApplied
          || 'Preset applied.';
        showNotification('success', appliedMessage);
      };

      if (typeof window.cineShowConfirmDialog === 'function') {
        window.cineShowConfirmDialog({
          title: texts[currentLang]?.autoGearPresetApplyTitle || 'Apply Preset',
          message: confirmMessage,
          confirmLabel: texts[currentLang]?.apply || 'Apply',
          cancelLabel: texts[currentLang]?.cancel || 'Cancel',
          onConfirm: performApply,
          onCancel: () => {
            autoGearPresetSelect.value = activeAutoGearPresetId || '';
          },
        });
        return;
      }

      console.warn('Missing window.cineShowConfirmDialog for handleAutoGearPresetSelection');
    }

    async function handleAutoGearSavePreset() {
      const rules = getAutoGearRules();
      const activePreset = getAutoGearPresetById(activeAutoGearPresetId);
      const previousAutoPresetId = autoGearAutoPresetIdState;
      const promptTemplate = texts[currentLang]?.autoGearPresetNamePrompt
        || texts.en?.autoGearPresetNamePrompt
        || 'Name this preset';
      const defaultName = activePreset ? activePreset.label : '';
      const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
        || texts.en?.autoGearPresetNameRequired
        || 'Enter a preset name to continue.';
      const response = await requestAutoGearPresetName(promptTemplate, defaultName, requiredMessage);
      if (response === null) return;
      const trimmed = typeof response === 'string' ? response.trim() : '';
      if (!trimmed) {
        if (typeof window.alert === 'function') {
          window.alert(requiredMessage);
        }
        return;
      }
      const normalizedName = trimmed;
      const existingByName = autoGearPresets.find(preset => preset.label.toLowerCase() === normalizedName.toLowerCase());
      let targetId = activePreset?.id || '';
      if (existingByName && existingByName.id !== targetId) {
        const overwriteTemplate = texts[currentLang]?.autoGearPresetOverwriteConfirm
          || texts.en?.autoGearPresetOverwriteConfirm
          || `Replace the existing preset "${normalizedName}"?`;
        const overwriteMessage = overwriteTemplate.includes('%s')
          ? formatWithPlaceholders(overwriteTemplate, normalizedName)
          : overwriteTemplate;
        let overwriteConfirmed = true;

        if (typeof window.cineShowConfirmDialog === 'function') {
          overwriteConfirmed = await new Promise((resolve) => {
            window.cineShowConfirmDialog({
              title: texts[currentLang]?.autoGearPresetOverwriteTitle || 'Overwrite Preset',
              message: overwriteMessage,
              confirmLabel: texts[currentLang]?.save || 'Save',
              cancelLabel: texts[currentLang]?.cancel || 'Cancel',
              onConfirm: () => resolve(true),
              onCancel: () => resolve(false),
            });
          });
        } else {
          console.warn('Missing window.cineShowConfirmDialog for handleAutoGearSavePreset');
          return;
        }

        if (!overwriteConfirmed) {
          return;
        }
        targetId = existingByName.id;
      }
      const presetId = targetId || generateAutoGearId('preset');
      const normalizedPreset = normalizeAutoGearPreset({ id: presetId, label: normalizedName, rules });
      if (!normalizedPreset) {
        const requiredMessage = texts[currentLang]?.autoGearPresetNameRequired
          || texts.en?.autoGearPresetNameRequired
          || 'Enter a preset name to continue.';
        if (typeof window.alert === 'function') {
          window.alert(requiredMessage);
        }
        return;
      }
      if (previousAutoPresetId) {
        setAutoGearAutoPresetId('', { persist: true, skipRender: true });
      }
      const existingIndex = autoGearPresets.findIndex(preset => preset.id === normalizedPreset.id);
      if (existingIndex >= 0) {
        autoGearPresets[existingIndex] = normalizedPreset;
      } else {
        if (previousAutoPresetId) {
          const autoPresetIndex = autoGearPresets.findIndex(
            preset => preset && preset.id === previousAutoPresetId,
          );
          if (autoPresetIndex >= 0) {
            autoGearPresets.splice(autoPresetIndex, 1);
          }
        }
        autoGearPresets.push(normalizedPreset);
      }
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      setActiveAutoGearPresetId(normalizedPreset.id, { persist: true, skipRender: true });
      renderAutoGearPresetsControls();
      const savedMessage = texts[currentLang]?.autoGearPresetSaved
        || texts.en?.autoGearPresetSaved
        || 'Automatic gear preset saved.';
      showNotification('success', savedMessage);
    }

    function handleAutoGearDeletePreset() {
      if (!activeAutoGearPresetId) return;
      const preset = getAutoGearPresetById(activeAutoGearPresetId);
      const label = preset ? preset.label : '';
      const confirmTemplate = texts[currentLang]?.autoGearPresetDeleteConfirm
        || texts.en?.autoGearPresetDeleteConfirm
        || 'Delete this preset?';
      const confirmMessage = label && confirmTemplate.includes('%s')
        ? formatWithPlaceholders(confirmTemplate, label)
        : confirmTemplate;

      const performDelete = () => {
        if (autoGearAutoPresetIdState && autoGearAutoPresetIdState === activeAutoGearPresetId) {
          setAutoGearAutoPresetId('', { persist: true, skipRender: true });
        }
        autoGearPresets = autoGearPresets.filter(entry => entry.id !== activeAutoGearPresetId);
        autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
        persistAutoGearPresets(autoGearPresets);
        setActiveAutoGearPresetId('', { persist: true, skipRender: true });
        renderAutoGearPresetsControls();
        const deletedMessage = texts[currentLang]?.autoGearPresetDeleted
          || texts.en?.autoGearPresetDeleted
          || 'Automatic gear preset deleted.';
        showNotification('success', deletedMessage);
      };

      if (typeof window.cineShowConfirmDialog === 'function') {
        window.cineShowConfirmDialog({
          title: texts[currentLang]?.autoGearPresetDeleteTitle || 'Delete Preset',
          message: confirmMessage,
          confirmLabel: texts[currentLang]?.delete || 'Delete',
          cancelLabel: texts[currentLang]?.cancel || 'Cancel',
          danger: true,
          onConfirm: performDelete,
        });
        return;
      }

      console.warn('Missing window.cineShowConfirmDialog for handleAutoGearDeletePreset');
    }

    function handleAutoGearShowBackupsToggle() {
      if (!autoGearShowBackupsCheckbox) return;
      setAutoGearBackupsVisible(autoGearShowBackupsCheckbox.checked);
    }

    function handleAutoGearBackupRetentionInput() {
      if (!autoGearBackupRetentionInput) return;
      if (autoGearBackupRetentionWarningText) {
        updateAutoGearBackupRetentionWarning('');
      }
    }

    function handleAutoGearBackupRetentionBlur() {
      setTimeout(() => {
        if (!autoGearBackupRetentionWarningText) {
          updateAutoGearBackupRetentionWarning('');
        }
      }, 0);
    }

    function handleAutoGearBackupRetentionChange() {
      if (!autoGearBackupRetentionInput) return;
      const rawValue = autoGearBackupRetentionInput.value;
      const parsed = Number(rawValue);
      if (!Number.isFinite(parsed)) {
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }

      const normalized = clampAutoGearBackupRetentionLimit(parsed);
      if (normalized === autoGearBackupRetention) {
        updateAutoGearBackupRetentionWarning('');
        renderAutoGearBackupRetentionControls();
        return;
      }

      const previousLimit = autoGearBackupRetention;

      if (normalized < previousLimit) {
        const trimmedEstimate = Math.max(0, autoGearBackups.length - normalized);
        const warningTemplate = texts[currentLang]?.autoGearBackupRetentionWarning
          || texts.en?.autoGearBackupRetentionWarning
          || 'Lowering to {limit} will remove {trimmed}. A safety snapshot will be saved first.';
        const warningMessage = warningTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));
        updateAutoGearBackupRetentionWarning(warningMessage);

        const confirmTemplate = texts[currentLang]?.autoGearBackupRetentionConfirm
          || texts.en?.autoGearBackupRetentionConfirm
          || 'Save a safety snapshot and trim older backups now?';
        const confirmMessage = confirmTemplate
          .replace('{limit}', formatAutoGearBackupCount(normalized))
          .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));

        const proceedWithRetentionChange = () => {
          const safetyBase = texts[currentLang]?.autoGearBackupRetentionSafetyNote
            || texts.en?.autoGearBackupRetentionSafetyNote
            || 'Retention lowered to {limit}.';
          const safetyTrimmed = texts[currentLang]?.autoGearBackupRetentionSafetyNoteTrimmed
            || texts.en?.autoGearBackupRetentionSafetyNoteTrimmed
            || 'Retention lowered to {limit}. Removed {trimmed} in this change.';
          const safetyTemplate = trimmedEstimate > 0 ? safetyTrimmed : safetyBase;
          const safetyNote = safetyTemplate
            .replace('{limit}', formatAutoGearBackupCount(normalized))
            .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedEstimate, 1)));

          const safetyResult = captureAutoGearBackupSnapshot({
            force: true,
            notifySuccess: false,
            note: safetyNote,
          });

          if (safetyResult.status !== 'created') {
            const failureMessage = texts[currentLang]?.autoGearBackupRetentionSafetyFailed
              || texts.en?.autoGearBackupRetentionSafetyFailed
              || 'Safety snapshot failed. Retention was not changed.';
            showNotification('error', failureMessage);
            autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
            updateAutoGearBackupRetentionWarning('');
            renderAutoGearBackupControls();
            renderAutoGearBackupRetentionControls();
            return;
          }

          const safetySavedMessage = texts[currentLang]?.autoGearBackupRetentionSafetySaved
            || texts.en?.autoGearBackupRetentionSafetySaved
            || 'Safety snapshot captured before trimming backups.';
          showNotification('success', safetySavedMessage);

          const trimResult = enforceAutoGearBackupRetentionLimit(normalized);
          if (!trimResult.success) {
            const failureMessage = texts[currentLang]?.autoGearBackupRetentionUpdateFailed
              || texts.en?.autoGearBackupRetentionUpdateFailed
              || 'Could not apply the new retention limit.';
            showNotification('error', failureMessage);
            autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
            updateAutoGearBackupRetentionWarning('');
            return;
          }

          const trimmedCount = trimResult.trimmed.length;
          const successTemplate = trimmedCount > 0
            ? texts[currentLang]?.autoGearBackupRetentionUpdated
            || texts.en?.autoGearBackupRetentionUpdated
            || 'Retention updated to {limit}. Removed {trimmed}.'
            : texts[currentLang]?.autoGearBackupRetentionUpdatedNoTrim
            || texts.en?.autoGearBackupRetentionUpdatedNoTrim
            || 'Retention updated to {limit}. No backups were removed.';
          const successMessage = successTemplate
            .replace('{limit}', formatAutoGearBackupCount(normalized))
            .replace('{trimmed}', formatAutoGearBackupCount(Math.max(trimmedCount, 1)));
          showNotification('success', successMessage);
          updateAutoGearBackupRetentionWarning('');
        };

        const cancelCallback = () => {
          autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
          updateAutoGearBackupRetentionWarning('');
          renderAutoGearBackupRetentionControls();
        };

        if (typeof window.cineShowConfirmDialog === 'function') {
          window.cineShowConfirmDialog({
            title: texts[currentLang]?.autoGearBackupRetentionTitle || 'Update Retention Limit',
            message: confirmMessage,
            confirmLabel: texts[currentLang]?.confirm || 'Confirm',
            cancelLabel: texts[currentLang]?.cancel || 'Cancel',
            onConfirm: proceedWithRetentionChange,
            onCancel: cancelCallback,
          });
          return;
        }

        console.warn('Missing window.cineShowConfirmDialog for handleAutoGearBackupRetentionChange');
        cancelCallback();
        return;

      }

      const increaseResult = enforceAutoGearBackupRetentionLimit(normalized);
      if (!increaseResult.success) {
        const failureMessage = texts[currentLang]?.autoGearBackupRetentionUpdateFailed
          || texts.en?.autoGearBackupRetentionUpdateFailed
          || 'Could not apply the new retention limit.';
        showNotification('error', failureMessage);
        autoGearBackupRetentionInput.value = String(autoGearBackupRetention);
        updateAutoGearBackupRetentionWarning('');
        return;
      }

      const successTemplate = texts[currentLang]?.autoGearBackupRetentionExpanded
        || texts.en?.autoGearBackupRetentionExpanded
        || 'Retention updated to {limit}.';
      const successMessage = successTemplate.replace('{limit}', formatAutoGearBackupCount(normalized));
      showNotification('success', successMessage);
      updateAutoGearBackupRetentionWarning('');
    }

    function renderAutoGearBackupControls() {
      if (!autoGearBackupSelect || !autoGearBackupEmptyMessage) return;

      const previousValue = autoGearBackupSelect.value;
      const placeholderText = getAutoGearBackupSelectPlaceholder();

      autoGearBackupSelect.innerHTML = '';

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = placeholderText;
      placeholder.disabled = true;
      autoGearBackupSelect.appendChild(placeholder);

      const availableIds = new Set(autoGearBackups.map(backup => backup.id));
      const retainSelection = previousValue && availableIds.has(previousValue);

      autoGearBackups.forEach(backup => {
        const option = document.createElement('option');
        option.value = backup.id;
        option.textContent = formatAutoGearBackupMeta(backup);
        if (backup.createdAt) {
          option.title = backup.createdAt;
        }
        if (retainSelection && backup.id === previousValue) {
          option.selected = true;
        }
        autoGearBackupSelect.appendChild(option);
      });

      if (!autoGearBackups.length) {
        placeholder.selected = true;
        autoGearBackupSelect.value = '';
        autoGearBackupSelect.disabled = true;
        autoGearBackupEmptyMessage.hidden = false;
      } else {
        autoGearBackupSelect.disabled = false;
        autoGearBackupEmptyMessage.hidden = true;
        if (retainSelection) {
          placeholder.selected = false;
          autoGearBackupSelect.value = previousValue;
        } else {
          placeholder.selected = true;
          autoGearBackupSelect.value = '';
        }
      }

      updateAutoGearBackupRestoreButtonState();
      applyAutoGearBackupVisibility();
      renderAutoGearBackupRetentionControls();
    }

    function extractAutoGearTriggers(rule) {
      if (!rule || typeof rule !== 'object') {
        return {
          always: false,
          scenarioLogic: 'all',
          scenarioPrimary: '',
          scenarioMultiplier: 1,
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          deliveryResolution: [],
          videoDistribution: [],
          camera: [],
          ownGear: [],
          monitor: [],
          crewPresent: [],
          crewAbsent: [],
          wireless: [],
          motors: [],
          controllers: [],
          distance: [],
          shootingDays: null,
        };
      }
      return {
        always: Boolean(rule.always),
        scenarioLogic: normalizeAutoGearScenarioLogic(rule.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(rule.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier),
        scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
        mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
        cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
        deliveryResolution: Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.slice() : [],
        videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
        camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
        ownGear: Array.isArray(rule.ownGear) ? rule.ownGear.slice() : [],
        monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
        crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
        crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
        wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
        motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
        controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
        distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
        shootingDays: rule.shootingDays ? normalizeAutoGearShootingDaysCondition(rule.shootingDays) : null,
      };
    }

    function snapshotAutoGearRuleForSummary(rule, index) {
      if (!rule || typeof rule !== 'object') return null;
      const baseIndex = Number.isInteger(index) ? index : 0;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : `rule-${baseIndex + 1}`;
      const label = typeof rule.label === 'string' ? rule.label : '';
      const enabled = rule.enabled !== false;
      const triggers = extractAutoGearTriggers(rule);
      const add = Array.isArray(rule.add) ? rule.add.map(autoGearItemSnapshot).filter(Boolean) : [];
      const remove = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSnapshot).filter(Boolean) : [];
      return {
        id,
        label,
        index: baseIndex,
        position: baseIndex + 1,
        enabled,
        add,
        remove,
        ...triggers,
      };
    }

    function createAutoGearRuleReference(rule) {
      if (!rule || typeof rule !== 'object') return null;
      const index = Number.isInteger(rule.index) ? rule.index : 0;
      const position = Number.isInteger(rule.position) ? rule.position : index + 1;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : `rule-${position}`;
      const label = typeof rule.label === 'string' ? rule.label : '';
      const enabled = rule.enabled !== false;
      return { id, label, index, position, enabled };
    }

    function dedupeAutoGearRuleReferences(refs) {
      const result = [];
      const seen = new Set();
      (Array.isArray(refs) ? refs : []).forEach(ref => {
        if (!ref || typeof ref !== 'object') return;
        const key = ref.id || `index-${ref.index}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({ ...ref });
      });
      return result;
    }

    function createAutoGearItemKey(item) {
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      return coreStableStringify({
        name: snapshot.name || '',
        category: snapshot.category || '',
        quantity: normalizeAutoGearQuantity(snapshot.quantity),
        screenSize: snapshot.screenSize || '',
        selectorType: snapshot.selectorType || 'none',
        selectorDefault: snapshot.selectorDefault || '',
        selectorEnabled: Boolean(snapshot.selectorEnabled),
        notes: snapshot.notes || '',
      });
    }

    function createAutoGearTriggerKeyForSummary(rule) {
      const triggers = extractAutoGearTriggers(rule);
      const sorted = {
        ...triggers,
        scenarios: triggers.scenarios.slice().sort(localeSort),
        mattebox: triggers.mattebox.slice().sort(localeSort),
        cameraHandle: triggers.cameraHandle.slice().sort(localeSort),
        viewfinderExtension: triggers.viewfinderExtension.slice().sort(localeSort),
        deliveryResolution: triggers.deliveryResolution.slice().sort(localeSort),
        videoDistribution: triggers.videoDistribution.slice().sort(localeSort),
        camera: triggers.camera.slice().sort(localeSort),
        ownGear: triggers.ownGear.slice().sort(localeSort),
        monitor: triggers.monitor.slice().sort(localeSort),
        crewPresent: triggers.crewPresent.slice().sort(localeSort),
        crewAbsent: triggers.crewAbsent.slice().sort(localeSort),
        wireless: triggers.wireless.slice().sort(localeSort),
        motors: triggers.motors.slice().sort(localeSort),
        controllers: triggers.controllers.slice().sort(localeSort),
        distance: triggers.distance.slice().sort(localeSort),
        shootingDays: triggers.shootingDays
          ? { mode: triggers.shootingDays.mode, value: triggers.shootingDays.value }
          : null,
      };
      return coreStableStringify(sorted);
    }

    function collectAutoGearScenarioCatalog() {
      if (typeof document === 'undefined') return [];
      const select = document.getElementById('requiredScenarios');
      if (!select) return [];
      const map = new Map();
      Array.from(select.options || []).forEach(option => {
        const value = typeof option.value === 'string' ? option.value.trim() : '';
        if (!value) return;
        const normalized = normalizeAutoGearTriggerValue(value) || value;
        if (map.has(normalized)) return;
        map.set(normalized, {
          value,
          label: option.textContent || value,
          normalized,
        });
      });
      return Array.from(map.values()).sort((a, b) => localeSort(a.label, b.label));
    }

    function getAutoGearRuleCoverageSummary(options = {}) {
      const sourceRules = Array.isArray(options.rules) ? options.rules : getAutoGearRules();
      const snapshots = [];
      (Array.isArray(sourceRules) ? sourceRules : []).forEach((rule, index) => {
        const snapshot = snapshotAutoGearRuleForSummary(rule, index);
        if (snapshot) {
          snapshots.push(snapshot);
        }
      });
      const activeSnapshots = snapshots.filter(rule => rule.enabled !== false);
      const disabledSnapshots = snapshots.filter(rule => rule.enabled === false);
      const summary = {
        generatedAt: new Date().toISOString(),
        totalRules: activeSnapshots.length,
        allRules: snapshots.length,
        disabledRules: dedupeAutoGearRuleReferences(
          disabledSnapshots.map(createAutoGearRuleReference).filter(Boolean),
        ),
      };

      const catalog = collectAutoGearScenarioCatalog();
      if (!activeSnapshots.length) {
        summary.duplicates = { totalGroups: 0, totalRules: 0, groups: [] };
        summary.conflicts = { totalItems: 0, totalRules: 0, items: [] };
        summary.net = {
          addItems: 0,
          addQuantity: 0,
          removeItems: 0,
          removeQuantity: 0,
          netQuantity: 0,
        };
        summary.scenarios = {
          catalog,
          coverage: [],
          uncovered: catalog.map(entry => ({
            value: entry.value,
            label: entry.label,
            normalized: entry.normalized,
          })),
          overlaps: [],
          rulesWithoutScenarios: [],
          total: catalog.length,
          coveredCount: 0,
        };
        autoGearSummaryLast = summary;
        return summary;
      }

      const duplicateMap = new Map();
      const duplicateRuleIds = new Set();
      activeSnapshots.forEach(snapshot => {
        const key = createAutoGearTriggerKeyForSummary(snapshot);
        if (!duplicateMap.has(key)) {
          duplicateMap.set(key, {
            triggers: extractAutoGearTriggers(snapshot),
            rules: [],
          });
        }
        const ref = createAutoGearRuleReference(snapshot);
        if (ref) {
          duplicateMap.get(key).rules.push(ref);
        }
      });
      const duplicateGroups = [];
      duplicateMap.forEach(entry => {
        const rules = dedupeAutoGearRuleReferences(entry.rules);
        if (rules.length <= 1) return;
        rules.forEach(ref => duplicateRuleIds.add(ref.id || `index-${ref.index}`));
        duplicateGroups.push({
          triggers: entry.triggers,
          rules,
        });
      });
      summary.duplicates = {
        totalGroups: duplicateGroups.length,
        totalRules: duplicateRuleIds.size,
        groups: duplicateGroups,
      };

      const conflictMap = new Map();
      const conflictRuleIds = new Set();
      activeSnapshots.forEach(snapshot => {
        const ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        snapshot.add.forEach(item => {
          const key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, { item, adds: [], removes: [] });
          }
          conflictMap.get(key).adds.push(ref);
        });
        snapshot.remove.forEach(item => {
          const key = createAutoGearItemKey(item);
          if (!key) return;
          if (!conflictMap.has(key)) {
            conflictMap.set(key, { item, adds: [], removes: [] });
          }
          conflictMap.get(key).removes.push(ref);
        });
      });
      const conflictItems = [];
      conflictMap.forEach(entry => {
        const adds = dedupeAutoGearRuleReferences(entry.adds);
        const removes = dedupeAutoGearRuleReferences(entry.removes);
        if (!adds.length || !removes.length) return;
        adds.forEach(ref => conflictRuleIds.add(ref.id || `index-${ref.index}`));
        removes.forEach(ref => conflictRuleIds.add(ref.id || `index-${ref.index}`));
        conflictItems.push({
          item: entry.item,
          adds,
          removes,
        });
      });
      summary.conflicts = {
        totalItems: conflictItems.length,
        totalRules: conflictRuleIds.size,
        items: conflictItems,
      };

      let addItems = 0;
      let addQuantity = 0;
      let removeItems = 0;
      let removeQuantity = 0;
      activeSnapshots.forEach(snapshot => {
        snapshot.add.forEach(item => {
          addItems += 1;
          addQuantity += normalizeAutoGearQuantity(item.quantity);
        });
        snapshot.remove.forEach(item => {
          removeItems += 1;
          removeQuantity += normalizeAutoGearQuantity(item.quantity);
        });
      });
      summary.net = {
        addItems,
        addQuantity,
        removeItems,
        removeQuantity,
        netQuantity: addQuantity - removeQuantity,
      };

      const scenarioLabelMap = new Map();
      catalog.forEach(entry => {
        scenarioLabelMap.set(entry.normalized, entry.label);
        scenarioLabelMap.set(entry.value, entry.label);
      });
      const coverageMap = new Map();
      activeSnapshots.forEach(snapshot => {
        const ref = createAutoGearRuleReference(snapshot);
        if (!ref) return;
        const list = Array.isArray(snapshot.scenarios) ? snapshot.scenarios : [];
        list.forEach(value => {
          if (typeof value !== 'string') return;
          const trimmed = value.trim();
          if (!trimmed) return;
          const normalized = normalizeAutoGearTriggerValue(trimmed) || trimmed;
          if (!coverageMap.has(normalized)) {
            coverageMap.set(normalized, {
              value: trimmed,
              normalized,
              rules: [],
            });
          }
          coverageMap.get(normalized).rules.push(ref);
        });
      });
      const coverage = Array.from(coverageMap.values()).map(entry => {
        const rules = dedupeAutoGearRuleReferences(entry.rules);
        return {
          value: entry.value,
          normalized: entry.normalized,
          label: scenarioLabelMap.get(entry.normalized) || scenarioLabelMap.get(entry.value) || entry.value,
          rules,
        };
      }).sort((a, b) => localeSort(a.label, b.label));
      const coveredKeys = new Set(coverage.map(entry => entry.normalized));
      const uncovered = catalog
        .filter(entry => !coveredKeys.has(entry.normalized))
        .map(entry => ({ value: entry.value, label: entry.label, normalized: entry.normalized }));
      uncovered.sort((a, b) => localeSort(a.label, b.label));
      const overlaps = coverage.filter(entry => entry.rules.length > 1);
      const rulesWithoutScenarios = dedupeAutoGearRuleReferences(
        activeSnapshots
          .filter(rule => !rule.always && (!Array.isArray(rule.scenarios) || !rule.scenarios.length))
          .map(createAutoGearRuleReference)
          .filter(Boolean),
      );

      summary.scenarios = {
        catalog,
        coverage,
        uncovered,
        overlaps,
        rulesWithoutScenarios,
        total: catalog.length,
        coveredCount: coverage.length,
      };

      autoGearSummaryLast = summary;
      return summary;
    }

    function formatAutoGearRuleReference(ref, langTexts) {
      if (!ref || typeof ref !== 'object') return '';
      const baseLabel = ref.label || langTexts.autoGearRuleBadgeUnnamed
        || texts.en?.autoGearRuleBadgeUnnamed
        || 'Automatic rule';
      const disabledLabel = ref.enabled === false
        ? (langTexts.autoGearRuleDisabledLabel || texts.en?.autoGearRuleDisabledLabel || 'Disabled')
        : '';
      const labeled = disabledLabel ? `${baseLabel} — ${disabledLabel}` : baseLabel;
      const positionText = formatNumberForLang(currentLang, ref.position || 1);
      if (ref.label) {
        const template = langTexts.autoGearSummaryRuleReference
          || texts.en?.autoGearSummaryRuleReference
          || 'Rule {position}: {label}';
        return template
          .replace('{position}', positionText)
          .replace('{label}', labeled);
      }
      const template = langTexts.autoGearSummaryRuleReferenceUntitled
        || texts.en?.autoGearSummaryRuleReferenceUntitled
        || 'Rule {position}';
      return template.replace('{position}', positionText);
    }

    function getAutoGearAnyMotorLabelForLang(langTexts) {
      const fallbackTexts = texts.en || {};
      const source = langTexts || fallbackTexts;
      return source.autoGearMotorsAny || fallbackTexts.autoGearMotorsAny || 'Any motor selected';
    }

    function formatAutoGearMotorValue(value, langTexts) {
      const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
      if (normalized === AUTO_GEAR_ANY_MOTOR_TOKEN_LOCAL) {
        return getAutoGearAnyMotorLabelForLang(langTexts);
      }
      return value;
    }

    function formatAutoGearTriggerDescription(triggers, analysis, langTexts) {
      if (!triggers) return '';
      const parts = [];
      if (triggers.always) {
        parts.push(langTexts.autoGearAlwaysMeta || texts.en?.autoGearAlwaysMeta || 'Always active');
      }
      const scenarioMap = new Map();
      (analysis?.scenarios?.catalog || []).forEach(entry => {
        scenarioMap.set(entry.normalized, entry.label);
        scenarioMap.set(entry.value, entry.label);
      });
      (analysis?.scenarios?.coverage || []).forEach(entry => {
        scenarioMap.set(entry.normalized, entry.label);
      });
      const formatScenarioLabel = value => {
        const normalized = normalizeAutoGearTriggerValue(value) || value;
        return scenarioMap.get(normalized) || value;
      };
      if (Array.isArray(triggers.scenarios) && triggers.scenarios.length) {
        const scenarioLabels = triggers.scenarios.map(formatScenarioLabel).filter(Boolean);
        const label = langTexts.autoGearScenariosLabel || texts.en?.autoGearScenariosLabel || 'Required scenarios';
        parts.push(`${label}: ${formatListForLang(currentLang, scenarioLabels)}`);
      }
      const scenarioLogic = normalizeAutoGearScenarioLogic(triggers.scenarioLogic);
      if (scenarioLogic) {
        const modeLabel = scenarioLogic === 'any'
          ? langTexts.autoGearScenarioModeAny || texts.en?.autoGearScenarioModeAny || 'Match any selected scenario'
          : scenarioLogic === 'multiplier'
            ? langTexts.autoGearScenarioModeMultiplier || texts.en?.autoGearScenarioModeMultiplier || 'Multiply when combined'
            : langTexts.autoGearScenarioModeAll || texts.en?.autoGearScenarioModeAll || 'Require every selected scenario';
        const modeHeading = langTexts.autoGearScenarioModeLabel
          || texts.en?.autoGearScenarioModeLabel
          || 'Scenario matching';
        let detail = modeLabel;
        if (scenarioLogic === 'multiplier') {
          const factorLabel = langTexts.autoGearScenarioFactorLabel
            || texts.en?.autoGearScenarioFactorLabel
            || 'Multiplier factor';
          const multiplier = normalizeAutoGearScenarioMultiplier(triggers.scenarioMultiplier);
          const multiplierText = formatNumberForLang(currentLang, multiplier || 1);
          const baseScenario = triggers.scenarioPrimary
            ? formatScenarioLabel(triggers.scenarioPrimary)
            : (triggers.scenarios && triggers.scenarios.length
              ? formatScenarioLabel(triggers.scenarios[0])
              : '');
          detail = baseScenario
            ? `${modeLabel} (${factorLabel}: ×${multiplierText}, ${baseScenario})`
            : `${modeLabel} (×${multiplierText})`;
        }
        parts.push(`${modeHeading}: ${detail}`);
      }
      const triggerConfigs = [
        { key: 'mattebox', labelKey: 'autoGearMatteboxLabel' },
        { key: 'cameraHandle', labelKey: 'autoGearCameraHandleLabel' },
        { key: 'viewfinderExtension', labelKey: 'autoGearViewfinderExtensionLabel', formatter: getViewfinderFallbackLabel },
        { key: 'deliveryResolution', labelKey: 'autoGearDeliveryResolutionLabel' },
        { key: 'videoDistribution', labelKey: 'autoGearVideoDistributionLabel', formatter: getVideoDistributionFallbackLabel },
        { key: 'camera', labelKey: 'autoGearCameraLabel' },
        {
          key: 'ownGear',
          labelKey: 'autoGearConditionOwnGearLabel',
          formatter: value => {
            if (typeof value !== 'string') return '';
            const trimmed = value.trim();
            if (!trimmed) return '';
            const record = typeof findAutoGearOwnGearById === 'function'
              ? findAutoGearOwnGearById(trimmed)
              : null;
            if (record) {
              const formatted = typeof formatAutoGearOwnGearLabel === 'function'
                ? formatAutoGearOwnGearLabel(record)
                : '';
              return formatted || record.name || trimmed;
            }
            const missingLabel = langTexts.autoGearOwnGearMissing
              || texts.en?.autoGearOwnGearMissing
              || 'Missing own gear';
            return `${missingLabel} (${trimmed})`;
          },
        },
        { key: 'monitor', labelKey: 'autoGearMonitorLabel' },
        { key: 'crewPresent', labelKey: 'autoGearCrewPresentLabel' },
        { key: 'crewAbsent', labelKey: 'autoGearCrewAbsentLabel' },
        { key: 'wireless', labelKey: 'autoGearWirelessLabel' },
        { key: 'motors', labelKey: 'autoGearMotorsLabel', formatter: value => formatAutoGearMotorValue(value, langTexts) },
        { key: 'controllers', labelKey: 'autoGearControllersLabel' },
        { key: 'distance', labelKey: 'autoGearDistanceLabel' },
      ];
      triggerConfigs.forEach(config => {
        const values = Array.isArray(triggers[config.key]) ? triggers[config.key].filter(Boolean) : [];
        if (!values.length) return;
        const label = langTexts[config.labelKey] || texts.en?.[config.labelKey] || config.labelKey;
        const formatted = values.map(value => {
          if (!config.formatter) return value;
          try {
            return config.formatter(value);
          } catch (error) {
            void error;
            return value;
          }
        }).filter(Boolean);
        if (formatted.length) {
          parts.push(`${label}: ${formatListForLang(currentLang, formatted)}`);
        }
      });
      if (Array.isArray(triggers.ownGear) && triggers.ownGear.length) {
        const ownGearLogic = normalizeAutoGearConditionLogic(triggers.ownGearLogic);
        if (ownGearLogic && ownGearLogic !== 'all') {
          const logicLabel = langTexts.autoGearConditionLogicLabel
            || texts.en?.autoGearConditionLogicLabel
            || 'Match behavior';
          let logicText = '';
          if (ownGearLogic === 'none') {
            logicText = langTexts.autoGearConditionLogicNone
              || texts.en?.autoGearConditionLogicNone
              || '';
          } else if (ownGearLogic === 'any') {
            logicText = langTexts.autoGearConditionLogicAny
              || texts.en?.autoGearConditionLogicAny
              || '';
          } else if (ownGearLogic === 'or') {
            logicText = langTexts.autoGearConditionLogicOr
              || texts.en?.autoGearConditionLogicOr
              || '';
          } else if (ownGearLogic === 'multiplier') {
            logicText = langTexts.autoGearConditionLogicMultiplier
              || texts.en?.autoGearConditionLogicMultiplier
              || '';
          }
          if (logicText) {
            parts.push(`${logicLabel}: ${logicText}`);
          }
        }
      }
      if (triggers.shootingDays && triggers.shootingDays.value) {
        const label = langTexts.autoGearShootingDaysLabel
          || texts.en?.autoGearShootingDaysLabel
          || 'Shooting days condition';
        const modeKey = triggers.shootingDays.mode === 'maximum'
          ? 'autoGearShootingDaysModeMaximum'
          : triggers.shootingDays.mode === 'every'
            ? 'autoGearShootingDaysModeEvery'
            : 'autoGearShootingDaysModeMinimum';
        const modeLabel = langTexts[modeKey] || texts.en?.[modeKey] || triggers.shootingDays.mode;
        const valueText = formatNumberForLang(currentLang, triggers.shootingDays.value);
        parts.push(`${label}: ${modeLabel} ${valueText}`);
      }
      return parts.join('; ');
    }

    function renderAutoGearRuleSummary(analysis, context = {}) {
      if (!autoGearSummarySection || !autoGearSummaryHeadingElem || !autoGearSummaryDescriptionElem || !autoGearSummaryCards || !autoGearSummaryDetails) {
        return;
      }
      const langTexts = texts[currentLang] || texts.en || {};
      const heading = langTexts.autoGearSummaryHeading
        || texts.en?.autoGearSummaryHeading
        || autoGearSummaryHeadingElem.textContent
        || 'Rule coverage overview';
      autoGearSummaryHeadingElem.textContent = heading;

      if (!analysis || typeof analysis.totalRules !== 'number') {
        autoGearSummarySection.hidden = true;
        return;
      }

      autoGearSummarySection.hidden = false;
      autoGearSummaryCards.innerHTML = '';
      autoGearSummaryDetails.innerHTML = '';

      const totalRules = analysis.totalRules;
      const filteredRules = typeof context.filteredRules === 'number' ? context.filteredRules : totalRules;
      const visibleRules = typeof context.visibleRules === 'number' ? context.visibleRules : filteredRules;
      const focus = context.focus || autoGearSummaryFocus || 'all';
      const hasSearchFilters = Boolean(context.hasSearchFilters);
      const focusApplied = Boolean(context.focusApplied);
      const disabledRules = Array.isArray(analysis.disabledRules) ? analysis.disabledRules : [];
      const disabledCount = disabledRules.length;
      const allRules = typeof analysis.allRules === 'number' ? analysis.allRules : totalRules + disabledCount;
      const scenarioTotal = typeof analysis.scenarios?.total === 'number'
        ? analysis.scenarios.total
        : Array.isArray(analysis.scenarios?.catalog)
          ? analysis.scenarios.catalog.length
          : 0;
      const scenarioCovered = typeof analysis.scenarios?.coveredCount === 'number'
        ? analysis.scenarios.coveredCount
        : Array.isArray(analysis.scenarios?.coverage)
          ? analysis.scenarios.coverage.length
          : 0;
      const overlapCount = Array.isArray(analysis.scenarios?.overlaps)
        ? analysis.scenarios.overlaps.length
        : 0;
      const hasScenarioCatalog = scenarioTotal > 0;
      const coveragePercent = hasScenarioCatalog && scenarioTotal
        ? Math.round((scenarioCovered / scenarioTotal) * 100)
        : 0;

      if (!totalRules && !disabledCount) {
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryEmpty
          || texts.en?.autoGearSummaryEmpty
          || 'Add a rule to unlock coverage insights.';
        return;
      }

      if (!totalRules && disabledCount) {
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryAllDisabled
          || texts.en?.autoGearSummaryAllDisabled
          || 'All automatic gear rules are disabled.';
      } else if (hasSearchFilters || (focus !== 'all' && focus !== 'uncovered') || focusApplied) {
        const template = langTexts.autoGearSummaryFilteredDescription
          || texts.en?.autoGearSummaryFilteredDescription
          || 'Showing {visible} of {total} rules after filters.';
        autoGearSummaryDescriptionElem.textContent = template
          .replace('{visible}', formatNumberForLang(currentLang, visibleRules))
          .replace('{filtered}', formatNumberForLang(currentLang, filteredRules))
          .replace('{total}', formatNumberForLang(currentLang, totalRules));
      } else {
        autoGearSummaryDescriptionElem.textContent = langTexts.autoGearSummaryDescription
          || texts.en?.autoGearSummaryDescription
          || 'Review duplicates, coverage gaps and conflicts before exporting or printing.';
      }
      if (disabledCount && totalRules) {
        const disabledTemplate = langTexts.autoGearSummaryDisabledSuffix
          || texts.en?.autoGearSummaryDisabledSuffix
          || '{count} disabled rules are ignored in coverage.';
        autoGearSummaryDescriptionElem.textContent = `${autoGearSummaryDescriptionElem.textContent} ${disabledTemplate.replace('{count}', formatNumberForLang(currentLang, disabledCount))}`.trim();
      }

      const formatRulesCount = count => {
        const template = count === 1
          ? langTexts.autoGearRulesCountOne || texts.en?.autoGearRulesCountOne || '%s rule'
          : langTexts.autoGearRulesCountOther || texts.en?.autoGearRulesCountOther || '%s rules';
        return template.replace('%s', formatNumberForLang(currentLang, count));
      };
      const coverageValue = hasScenarioCatalog
        ? `${formatNumberForLang(currentLang, coveragePercent)}%`
        : formatNumberForLang(currentLang, scenarioCovered);
      const coverageDescription = hasScenarioCatalog
        ? (langTexts.autoGearSummaryCoverageDescription
          || texts.en?.autoGearSummaryCoverageDescription
          || '{covered} of {total} scenarios covered')
          .replace('{covered}', formatNumberForLang(currentLang, scenarioCovered))
          .replace('{total}', formatNumberForLang(currentLang, scenarioTotal))
        : langTexts.autoGearSummaryCoverageEmpty
        || texts.en?.autoGearSummaryCoverageEmpty
        || 'Add scenarios to measure coverage.';

      const buildCard = (config) => {
        const { label, value, description, focusKey } = config;
        const isAction = Boolean(focusKey);
        const element = document.createElement(isAction ? 'button' : 'div');
        element.className = 'auto-gear-summary-card';
        if (isAction) {
          element.type = 'button';
          element.classList.add('auto-gear-summary-action');
          element.dataset.focus = focusKey;
          element.setAttribute('aria-pressed', autoGearSummaryFocus === focusKey ? 'true' : 'false');
        }
        const labelElem = document.createElement('p');
        labelElem.className = 'auto-gear-summary-label';
        labelElem.textContent = label;
        const valueElem = document.createElement('p');
        valueElem.className = 'auto-gear-summary-value';
        valueElem.textContent = value;
        element.appendChild(labelElem);
        element.appendChild(valueElem);
        if (description) {
          const descElem = document.createElement('p');
          descElem.className = 'auto-gear-summary-description';
          descElem.textContent = description;
          element.appendChild(descElem);
        }
        autoGearSummaryCards.appendChild(element);
      };

      const netValue = `${formatNumberForLang(currentLang, analysis.net.addQuantity)} / −${formatNumberForLang(currentLang, analysis.net.removeQuantity)}`;
      buildCard({
        label: langTexts.autoGearSummaryTotalLabel || texts.en?.autoGearSummaryTotalLabel || 'Rules',
        value: formatNumberForLang(currentLang, totalRules),
        description: langTexts.autoGearSummaryTotalDescription
          || texts.en?.autoGearSummaryTotalDescription
          || 'Saved in this setup',
      });
      buildCard({
        label: langTexts.autoGearSummaryCoverageLabel || texts.en?.autoGearSummaryCoverageLabel || 'Scenario coverage',
        value: coverageValue,
        description: coverageDescription,
      });
      buildCard({
        label: langTexts.autoGearSummaryNetLabel || texts.en?.autoGearSummaryNetLabel || 'Net change',
        value: netValue,
        description: (langTexts.autoGearSummaryNetDescription || texts.en?.autoGearSummaryNetDescription || 'Adds {adds} · Removes {removes}')
          .replace('{adds}', formatNumberForLang(currentLang, analysis.net.addItems))
          .replace('{removes}', formatNumberForLang(currentLang, analysis.net.removeItems)),
      });
      buildCard({
        label: langTexts.autoGearSummaryDuplicatesLabel || texts.en?.autoGearSummaryDuplicatesLabel || 'Duplicated triggers',
        value: formatNumberForLang(currentLang, analysis.duplicates.totalGroups),
        description: analysis.duplicates.totalGroups
          ? (langTexts.autoGearSummaryDuplicatesSome || texts.en?.autoGearSummaryDuplicatesSome || '{rules} across {groups} groups')
            .replace('{rules}', formatRulesCount(analysis.duplicates.totalRules))
            .replace('{groups}', formatNumberForLang(currentLang, analysis.duplicates.totalGroups))
          : langTexts.autoGearSummaryDuplicatesNone || texts.en?.autoGearSummaryDuplicatesNone || 'No duplicate triggers.',
        focusKey: 'duplicates',
      });
      buildCard({
        label: langTexts.autoGearSummaryConflictsLabel || texts.en?.autoGearSummaryConflictsLabel || 'Potential conflicts',
        value: formatNumberForLang(currentLang, analysis.conflicts.totalItems),
        description: analysis.conflicts.totalItems
          ? (langTexts.autoGearSummaryConflictsSome || texts.en?.autoGearSummaryConflictsSome || '{rules} affected across {items} items')
            .replace('{rules}', formatRulesCount(analysis.conflicts.totalRules))
            .replace('{items}', formatNumberForLang(currentLang, analysis.conflicts.totalItems))
          : langTexts.autoGearSummaryConflictsNone || texts.en?.autoGearSummaryConflictsNone || 'No conflicting adds/removes.',
        focusKey: 'conflicts',
      });
      buildCard({
        label: langTexts.autoGearSummaryOverlapsLabel || texts.en?.autoGearSummaryOverlapsLabel || 'Stacked scenarios',
        value: formatNumberForLang(currentLang, overlapCount),
        description: overlapCount
          ? (langTexts.autoGearSummaryOverlapsSome || texts.en?.autoGearSummaryOverlapsSome || '{count} scenarios touched by multiple rules')
            .replace('{count}', formatNumberForLang(currentLang, overlapCount))
          : langTexts.autoGearSummaryOverlapsNone || texts.en?.autoGearSummaryOverlapsNone || 'No scenarios currently stack multiple rules.',
        focusKey: 'overlaps',
      });
      buildCard({
        label: langTexts.autoGearSummaryUncoveredLabel || texts.en?.autoGearSummaryUncoveredLabel || 'Uncovered scenarios',
        value: formatNumberForLang(currentLang, analysis.scenarios.uncovered.length),
        description: analysis.scenarios.uncovered.length
          ? (langTexts.autoGearSummaryUncoveredSome || texts.en?.autoGearSummaryUncoveredSome || 'Review {count} scenario gaps')
            .replace('{count}', formatNumberForLang(currentLang, analysis.scenarios.uncovered.length))
          : langTexts.autoGearSummaryUncoveredNone || texts.en?.autoGearSummaryUncoveredNone || 'All required scenarios covered.',
        focusKey: 'uncovered',
      });

      const detailsFragment = document.createDocumentFragment();
      const intro = document.createElement('p');
      intro.className = 'auto-gear-summary-detail-text';
      intro.textContent = langTexts.autoGearSummaryDetailsIntro
        || texts.en?.autoGearSummaryDetailsIntro
        || 'Use the dashboard to audit coverage, overlaps and conflicts before exporting or printing.';
      detailsFragment.appendChild(intro);

      const appendRuleButtons = (container, rules) => {
        const jumpHelp = langTexts.autoGearSummaryJumpToRule
          || texts.en?.autoGearSummaryJumpToRule
          || 'Show rule';
        rules.forEach((ref, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.autoGearRule = ref.id;
          const label = formatAutoGearRuleReference(ref, langTexts);
          const disabledLabel = langTexts.autoGearRuleDisabledLabel
            || texts.en?.autoGearRuleDisabledLabel
            || 'Disabled';
          button.textContent = label;
          button.setAttribute('title', jumpHelp);
          if (ref.enabled === false) {
            button.dataset.disabled = 'true';
            button.setAttribute('aria-label', `${label} — ${disabledLabel}`);
          }
          container.appendChild(button);
          if (index < rules.length - 1) {
            container.appendChild(document.createTextNode(', '));
          }
        });
      };

      if (disabledCount) {
        const disabledIntro = document.createElement('p');
        disabledIntro.className = 'auto-gear-summary-detail-text auto-gear-summary-disabled-note';
        disabledIntro.textContent = langTexts.autoGearSummaryDisabledNote
          || texts.en?.autoGearSummaryDisabledNote
          || 'Disabled rules are visible below but ignored until re-enabled.';
        detailsFragment.appendChild(disabledIntro);
        if (disabledRules.length) {
          const disabledList = document.createElement('ul');
          disabledList.className = 'auto-gear-summary-list';
          const item = document.createElement('li');
          appendRuleButtons(item, disabledRules);
          disabledList.appendChild(item);
          detailsFragment.appendChild(disabledList);
        }
      }

      if (focus === 'duplicates') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsDuplicatesHeading
          || texts.en?.autoGearSummaryDetailsDuplicatesHeading
          || 'Rules sharing the same triggers';
        detailsFragment.appendChild(headingElem);
        if (!analysis.duplicates.groups.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryDuplicatesNone
            || texts.en?.autoGearSummaryDuplicatesNone
            || 'No duplicate triggers.';
          detailsFragment.appendChild(empty);
        } else {
          analysis.duplicates.groups.forEach(group => {
            const description = formatAutoGearTriggerDescription(group.triggers, analysis, langTexts);
            const descriptionElem = document.createElement('p');
            descriptionElem.className = 'auto-gear-summary-detail-text';
            descriptionElem.textContent = (langTexts.autoGearSummaryDuplicateGroupTitle
              || texts.en?.autoGearSummaryDuplicateGroupTitle
              || 'Matching triggers') + (description ? ` — ${description}` : '');
            detailsFragment.appendChild(descriptionElem);
            if (group.rules.length) {
              const list = document.createElement('ul');
              list.className = 'auto-gear-summary-list';
              const item = document.createElement('li');
              appendRuleButtons(item, group.rules);
              list.appendChild(item);
              detailsFragment.appendChild(list);
            }
          });
        }
      } else if (focus === 'conflicts') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsConflictsHeading
          || texts.en?.autoGearSummaryDetailsConflictsHeading
          || 'Gear touched by adds and removes';
        detailsFragment.appendChild(headingElem);
        if (!analysis.conflicts.items.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryConflictsNone
            || texts.en?.autoGearSummaryConflictsNone
            || 'No conflicting adds/removes.';
          detailsFragment.appendChild(empty);
        } else {
          analysis.conflicts.items.forEach(entry => {
            const title = document.createElement('p');
            title.className = 'auto-gear-summary-detail-text';
            title.textContent = formatAutoGearItemSummary(entry.item);
            detailsFragment.appendChild(title);
            const list = document.createElement('ul');
            list.className = 'auto-gear-summary-list';
            const addsItem = document.createElement('li');
            addsItem.textContent = (langTexts.autoGearSummaryConflictAddsLabel
              || texts.en?.autoGearSummaryConflictAddsLabel
              || 'Added by') + ': ';
            appendRuleButtons(addsItem, entry.adds);
            list.appendChild(addsItem);
            const removesItem = document.createElement('li');
            removesItem.textContent = (langTexts.autoGearSummaryConflictRemovesLabel
              || texts.en?.autoGearSummaryConflictRemovesLabel
              || 'Removed by') + ': ';
            appendRuleButtons(removesItem, entry.removes);
            list.appendChild(removesItem);
            detailsFragment.appendChild(list);
          });
        }
      } else if (focus === 'overlaps') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading
          || texts.en?.autoGearSummaryDetailsOverlapsHeading
          || 'Scenarios with stacked rules';
        detailsFragment.appendChild(headingElem);
        if (!analysis.scenarios.overlaps.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryDetailsOverlapsNone
            || texts.en?.autoGearSummaryDetailsOverlapsNone
            || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(empty);
        } else {
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = `${entry.label} — ${formatRulesCount(entry.rules.length)}`;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      } else if (focus === 'uncovered') {
        const headingElem = document.createElement('p');
        headingElem.className = 'auto-gear-summary-detail-title';
        headingElem.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading
          || texts.en?.autoGearSummaryDetailsUncoveredHeading
          || 'Scenarios without dedicated rules';
        detailsFragment.appendChild(headingElem);
        if (!analysis.scenarios.uncovered.length) {
          const empty = document.createElement('p');
          empty.className = 'auto-gear-summary-detail-text';
          empty.textContent = langTexts.autoGearSummaryUncoveredNone
            || texts.en?.autoGearSummaryUncoveredNone
            || 'All required scenarios covered.';
          detailsFragment.appendChild(empty);
        } else {
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      } else {
        if (analysis.scenarios.overlaps.length) {
          const headingElem = document.createElement('p');
          headingElem.className = 'auto-gear-summary-detail-title';
          headingElem.textContent = langTexts.autoGearSummaryDetailsOverlapsHeading
            || texts.en?.autoGearSummaryDetailsOverlapsHeading
            || 'Scenarios with stacked rules';
          detailsFragment.appendChild(headingElem);
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.overlaps.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = `${entry.label} — ${formatRulesCount(entry.rules.length)}`;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            if (entry.rules.length) {
              li.appendChild(document.createTextNode(' · '));
              appendRuleButtons(li, entry.rules);
            }
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        } else {
          const note = document.createElement('p');
          note.className = 'auto-gear-summary-detail-text';
          note.textContent = langTexts.autoGearSummaryDetailsOverlapsNone
            || texts.en?.autoGearSummaryDetailsOverlapsNone
            || 'No scenarios currently stack multiple rules.';
          detailsFragment.appendChild(note);
        }
        if (analysis.scenarios.uncovered.length) {
          const headingElem = document.createElement('p');
          headingElem.className = 'auto-gear-summary-detail-title';
          headingElem.textContent = langTexts.autoGearSummaryDetailsUncoveredHeading
            || texts.en?.autoGearSummaryDetailsUncoveredHeading
            || 'Scenarios without dedicated rules';
          detailsFragment.appendChild(headingElem);
          const list = document.createElement('ul');
          list.className = 'auto-gear-summary-list';
          analysis.scenarios.uncovered.forEach(entry => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.autoGearScenario = entry.value;
            button.textContent = entry.label;
            button.setAttribute('title', (langTexts.autoGearSummarySetScenarioFilter || texts.en?.autoGearSummarySetScenarioFilter || 'Filter to scenario').replace('{scenario}', entry.label));
            li.appendChild(button);
            list.appendChild(li);
          });
          detailsFragment.appendChild(list);
        }
      }

      if (focus !== 'all') {
        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.className = 'auto-gear-summary-reset';
        resetButton.dataset.autoGearSummaryReset = 'true';
        resetButton.textContent = langTexts.autoGearSummaryResetFocus
          || texts.en?.autoGearSummaryResetFocus
          || 'Clear dashboard filter';
        detailsFragment.appendChild(resetButton);
      } else if (!analysis.duplicates.groups.length && !analysis.conflicts.items.length && !analysis.scenarios.uncovered.length) {
        const empty = document.createElement('p');
        empty.className = 'auto-gear-summary-detail-text';
        empty.textContent = langTexts.autoGearSummaryDetailsFocusEmpty
          || texts.en?.autoGearSummaryDetailsFocusEmpty
          || 'Everything looks covered—no overlaps or conflicts detected.';
        detailsFragment.appendChild(empty);
      }

      autoGearSummaryDetails.appendChild(detailsFragment);
    }

    function setAutoGearSummaryFocus(value) {
      const allowed = value === 'duplicates' || value === 'conflicts' || value === 'overlaps' || value === 'uncovered' ? value : 'all';
      const next = autoGearSummaryFocus === allowed && allowed !== 'all' ? 'all' : allowed;
      if (autoGearSummaryFocus === next) {
        return;
      }
      autoGearSummaryFocus = next;
      renderAutoGearRulesList();
    }

    function focusAutoGearRuleById(ruleId) {
      if (!ruleId || !autoGearRulesList) return;
      const candidates = Array.from(autoGearRulesList.querySelectorAll('[data-rule-id]'));
      const target = candidates.find(element => element && element.dataset && element.dataset.ruleId === ruleId);
      if (!target) return;
      if (typeof target.scrollIntoView === 'function') {
        try {
          target.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } catch (error) {
          void error;
          target.scrollIntoView(true);
        }
      }
      const focusTarget = target.querySelector('.auto-gear-edit')
        || target.querySelector('button')
        || target;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (error) {
          void error;
          focusTarget.focus();
        }
      }
    }

    function renderAutoGearRulesList() {
      if (!autoGearRulesList) return;
      if (autoGearEditor && !autoGearEditor.hidden && !autoGearEditorDraft) {
        closeAutoGearEditor();
      }
      autoGearRulesList.innerHTML = '';
      const rules = getAutoGearRules();
      const analysis = getAutoGearRuleCoverageSummary({ rules });
      const scenarioFilter = refreshAutoGearScenarioFilterOptions(rules);
      const rawSearch = typeof autoGearSearchQuery === 'string' ? autoGearSearchQuery : '';
      const normalizedQuery = rawSearch.trim().toLowerCase();
      const filteredRules = rules.filter(rule =>
        autoGearRuleMatchesScenario(rule, scenarioFilter)
        && autoGearRuleMatchesSearch(rule, normalizedQuery)
      );
      const ruleIndexByObject = new Map();
      rules.forEach((rule, index) => {
        if (!rule || typeof rule !== 'object') return;
        ruleIndexByObject.set(rule, index);
      });
      let activeFocus = autoGearSummaryFocus || 'all';
      const focusRuleIds = (() => {
        if (activeFocus === 'duplicates' && analysis?.duplicates?.groups?.length) {
          const ids = new Set();
          analysis.duplicates.groups.forEach(group => {
            (group.rules || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
          });
          return ids.size ? ids : null;
        }
        if (activeFocus === 'conflicts' && analysis?.conflicts?.items?.length) {
          const ids = new Set();
          analysis.conflicts.items.forEach(item => {
            (item.adds || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
            (item.removes || []).forEach(ref => {
              if (!ref || typeof ref !== 'object') return;
              if (ref.id) ids.add(ref.id);
              ids.add(`index-${ref.index}`);
            });
          });
          return ids.size ? ids : null;
        }
        if (activeFocus !== 'all' && activeFocus !== 'uncovered') {
          activeFocus = 'all';
        }
        return null;
      })();
      if (autoGearSummaryFocus !== activeFocus) {
        autoGearSummaryFocus = activeFocus;
      }
      const hasFilters = Boolean(normalizedQuery) || scenarioFilter !== 'all' || activeFocus !== 'all';
      const allowSearch = rules.length > 0 || Boolean(rawSearch.trim());

      if (autoGearSearchInput) {
        if (autoGearSearchInput.value !== rawSearch) {
          autoGearSearchInput.value = rawSearch;
        }
        autoGearSearchInput.disabled = !allowSearch;
      }
      if (autoGearFilterScenarioSelect) {
        autoGearFilterScenarioSelect.value = autoGearScenarioFilter;
        if (autoGearFilterScenarioSelect.disabled) {
          autoGearFilterScenarioSelect.setAttribute('aria-disabled', 'true');
        } else {
          autoGearFilterScenarioSelect.removeAttribute('aria-disabled');
        }
      }
      if (autoGearFilterClearButton) {
        autoGearFilterClearButton.hidden = !hasFilters;
        autoGearFilterClearButton.disabled = !hasFilters;
      }
      const visibleRules = focusRuleIds
        ? filteredRules.filter(rule => {
          const id = typeof rule?.id === 'string' ? rule.id : '';
          if (id && focusRuleIds.has(id)) return true;
          const index = ruleIndexByObject.get(rule);
          if (typeof index === 'number' && focusRuleIds.has(`index-${index}`)) return true;
          return false;
        })
        : filteredRules;

      renderAutoGearRuleSummary(analysis, {
        focus: activeFocus,
        totalRules: rules.length,
        filteredRules: filteredRules.length,
        visibleRules: visibleRules.length,
        hasSearchFilters: Boolean(normalizedQuery) || scenarioFilter !== 'all',
        focusApplied: Boolean(focusRuleIds),
      });

      if (!visibleRules.length) {
        const empty = document.createElement('p');
        empty.className = 'auto-gear-empty';
        if (!rules.length && !hasFilters) {
          empty.textContent = texts[currentLang]?.autoGearNoRules
            || texts.en?.autoGearNoRules
            || 'No custom rules yet.';
        } else if (focusRuleIds && filteredRules.length) {
          empty.textContent = texts[currentLang]?.autoGearNoFocusMatches
            || texts.en?.autoGearNoFocusMatches
            || 'No rules match the selected dashboard filter.';
        } else {
          empty.textContent = texts[currentLang]?.autoGearNoMatches
            || texts.en?.autoGearNoMatches
            || 'No rules match your filters.';
        }
        autoGearRulesList.appendChild(empty);
        return;
      }

      visibleRules.forEach(rule => {
        const index = ruleIndexByObject.get(rule);
        const wrapper = document.createElement('div');
        wrapper.className = 'auto-gear-rule';
        wrapper.dataset.ruleId = rule.id;
        const isEnabled = rule.enabled !== false;
        if (!isEnabled) {
          wrapper.classList.add('auto-gear-rule-disabled');
        }
        if (typeof index === 'number' && index >= 0) {
          wrapper.dataset.ruleIndex = String(index);
        } else {
          delete wrapper.dataset.ruleIndex;
        }
        const info = document.createElement('div');
        info.className = 'auto-gear-rule-info';
        const title = document.createElement('p');
        title.className = 'auto-gear-rule-title';
        const scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios : [];
        const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
        const cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle : [];
        const rawViewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension : [];
        const viewfinderDisplayList = rawViewfinderList.map(getViewfinderFallbackLabel);
        const videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution : [];
        const videoDistributionDisplayList = videoDistributionList.map(getVideoDistributionFallbackLabel);
        const deliveryResolutionList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution : [];
        const cameraList = Array.isArray(rule.camera) ? rule.camera : [];
        const ownGearList = Array.isArray(rule.ownGear) ? rule.ownGear : [];
        const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
        const monitorList = Array.isArray(rule.monitor) ? rule.monitor : [];
        const crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent : [];
        const crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent : [];
        const wirelessList = Array.isArray(rule.wireless) ? rule.wireless : [];
        const motorsList = Array.isArray(rule.motors) ? rule.motors : [];
        const langTexts = texts[currentLang] || texts.en || {};
        const motorsDisplayList = motorsList.map(value => formatAutoGearMotorValue(value, langTexts));
        const controllersList = Array.isArray(rule.controllers) ? rule.controllers : [];
        const distanceList = Array.isArray(rule.distance) ? rule.distance : [];
        const shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
        const ownGearMissingLabel = langTexts.autoGearOwnGearMissing
          || texts.en?.autoGearOwnGearMissing
          || 'Missing own gear';
        const ownGearDisplayList = ownGearList.map(id => {
          if (typeof id !== 'string' || !id.trim()) return '';
          const record = typeof findAutoGearOwnGearById === 'function'
            ? findAutoGearOwnGearById(id)
            : null;
          if (record) {
            const formatted = typeof formatAutoGearOwnGearLabel === 'function'
              ? formatAutoGearOwnGearLabel(record)
              : '';
            return formatted || record.name || id;
          }
          return `${ownGearMissingLabel} (${id})`;
        }).filter(Boolean);
        const shootingDaysDisplayList = shootingCondition
          ? [String(shootingCondition.value)]
          : [];
        const cameraWeightDisplay = cameraWeightCondition
          ? formatAutoGearCameraWeight(cameraWeightCondition, langTexts)
          : '';
        const cameraWeightDisplayList = cameraWeightDisplay ? [cameraWeightDisplay] : [];
        const fallbackCandidates = [
          cameraList,
          cameraWeightDisplayList,
          monitorList,
          crewPresentList,
          crewAbsentList,
          wirelessList,
          motorsDisplayList,
          controllersList,
          distanceList,
          ownGearDisplayList,
          matteboxList,
          cameraHandleList,
          viewfinderDisplayList,
          deliveryResolutionList,
          videoDistributionDisplayList,
          shootingDaysDisplayList,
        ];
        const fallbackSource = scenarioList.length
          ? scenarioList
          : (fallbackCandidates.find(list => Array.isArray(list) && list.length) || []);
        const fallbackTitle = fallbackSource.length ? fallbackSource.join(' + ') : '';
        title.textContent = rule.label || fallbackTitle;
        info.appendChild(title);
        if (!isEnabled) {
          const disabledMeta = document.createElement('p');
          disabledMeta.className = 'auto-gear-rule-meta auto-gear-rule-disabled-meta';
          disabledMeta.textContent = texts[currentLang]?.autoGearRuleDisabledLabel
            || texts.en?.autoGearRuleDisabledLabel
            || 'Disabled';
          info.appendChild(disabledMeta);
        }
        if (rule.always) {
          const alwaysLabel = texts[currentLang]?.autoGearAlwaysMeta
            || texts.en?.autoGearAlwaysMeta
            || 'Always active';
          const alwaysMeta = document.createElement('p');
          alwaysMeta.className = 'auto-gear-rule-meta';
          alwaysMeta.textContent = alwaysLabel;
          info.appendChild(alwaysMeta);
        }
        if (scenarioList.length) {
          const scenarioLabel = texts[currentLang]?.projectFields?.requiredScenarios
            || texts.en?.projectFields?.requiredScenarios
            || 'Required Scenarios';
          const scenarioMeta = document.createElement('p');
          scenarioMeta.className = 'auto-gear-rule-meta';
          scenarioMeta.textContent = `${scenarioLabel}: ${scenarioList.join(' + ')}`;
          info.appendChild(scenarioMeta);
        }
        if (cameraList.length) {
          const cameraLabelText = texts[currentLang]?.autoGearCameraLabel
            || texts.en?.autoGearCameraLabel
            || 'Camera selection';
          const cameraMeta = document.createElement('p');
          cameraMeta.className = 'auto-gear-rule-meta';
          cameraMeta.textContent = `${cameraLabelText}: ${cameraList.join(' + ')}`;
          info.appendChild(cameraMeta);
        }
        if (ownGearList.length) {
          const ownGearLabelText = texts[currentLang]?.autoGearConditionOwnGearLabel
            || texts[currentLang]?.autoGearOwnGearLabel
            || texts.en?.autoGearConditionOwnGearLabel
            || texts.en?.autoGearOwnGearLabel
            || 'Own gear';
          if (ownGearDisplayList.length) {
            const ownGearMeta = document.createElement('p');
            ownGearMeta.className = 'auto-gear-rule-meta';
            ownGearMeta.textContent = `${ownGearLabelText}: ${ownGearDisplayList.join(' + ')}`;
            info.appendChild(ownGearMeta);
          }
          const ownGearLogic = normalizeAutoGearConditionLogic(rule.ownGearLogic);
          if (ownGearLogic && ownGearLogic !== 'all') {
            const logicLabel = texts[currentLang]?.autoGearConditionLogicLabel
              || texts.en?.autoGearConditionLogicLabel
              || 'Match behavior';
            let logicText = '';
            if (ownGearLogic === 'none') {
              logicText = texts[currentLang]?.autoGearConditionLogicNone
                || texts.en?.autoGearConditionLogicNone
                || '';
            } else if (ownGearLogic === 'any') {
              logicText = texts[currentLang]?.autoGearConditionLogicAny
                || texts.en?.autoGearConditionLogicAny
                || '';
            } else if (ownGearLogic === 'or') {
              logicText = texts[currentLang]?.autoGearConditionLogicOr
                || texts.en?.autoGearConditionLogicOr
                || '';
            } else if (ownGearLogic === 'multiplier') {
              logicText = texts[currentLang]?.autoGearConditionLogicMultiplier
                || texts.en?.autoGearConditionLogicMultiplier
                || '';
            }
            if (logicText) {
              const logicMeta = document.createElement('p');
              logicMeta.className = 'auto-gear-rule-meta';
              logicMeta.textContent = `${ownGearLabelText} – ${logicLabel}: ${logicText}`;
              info.appendChild(logicMeta);
            }
          }
        }
        if (cameraWeightCondition && cameraWeightDisplay) {
          const weightLabelText = texts[currentLang]?.autoGearCameraWeightLabel
            || texts.en?.autoGearCameraWeightLabel
            || 'Camera weight';
          const weightMeta = document.createElement('p');
          weightMeta.className = 'auto-gear-rule-meta';
          weightMeta.textContent = `${weightLabelText}: ${cameraWeightDisplay}`;
          info.appendChild(weightMeta);
        }
        if (monitorList.length) {
          const monitorLabelText = texts[currentLang]?.autoGearMonitorLabel
            || texts.en?.autoGearMonitorLabel
            || 'Onboard monitors';
          const monitorMeta = document.createElement('p');
          monitorMeta.className = 'auto-gear-rule-meta';
          monitorMeta.textContent = `${monitorLabelText}: ${monitorList.join(' + ')}`;
          info.appendChild(monitorMeta);
        }
        if (crewPresentList.length) {
          const crewPresentLabelText = texts[currentLang]?.autoGearCrewPresentLabel
            || texts.en?.autoGearCrewPresentLabel
            || 'Crew present';
          const crewMeta = document.createElement('p');
          crewMeta.className = 'auto-gear-rule-meta';
          const labels = crewPresentList.map(value => getCrewRoleLabel(value)).filter(Boolean);
          crewMeta.textContent = `${crewPresentLabelText}: ${labels.join(' + ')}`;
          info.appendChild(crewMeta);
        }
        if (crewAbsentList.length) {
          const crewAbsentLabelText = texts[currentLang]?.autoGearCrewAbsentLabel
            || texts.en?.autoGearCrewAbsentLabel
            || 'Crew absent';
          const crewAbsentMeta = document.createElement('p');
          crewAbsentMeta.className = 'auto-gear-rule-meta';
          const labels = crewAbsentList.map(value => getCrewRoleLabel(value)).filter(Boolean);
          crewAbsentMeta.textContent = `${crewAbsentLabelText}: ${labels.join(' + ')}`;
          info.appendChild(crewAbsentMeta);
        }
        if (wirelessList.length) {
          const wirelessLabelText = texts[currentLang]?.autoGearWirelessLabel
            || texts.en?.autoGearWirelessLabel
            || 'Wireless transmitters';
          const wirelessMeta = document.createElement('p');
          wirelessMeta.className = 'auto-gear-rule-meta';
          wirelessMeta.textContent = `${wirelessLabelText}: ${wirelessList.join(' + ')}`;
          info.appendChild(wirelessMeta);
        }
        if (motorsList.length) {
          const motorsLabelText = texts[currentLang]?.autoGearMotorsLabel
            || texts.en?.autoGearMotorsLabel
            || 'FIZ motors';
          const motorsMeta = document.createElement('p');
          motorsMeta.className = 'auto-gear-rule-meta';
          motorsMeta.textContent = `${motorsLabelText}: ${motorsDisplayList.join(' + ')}`;
          info.appendChild(motorsMeta);
        }
        if (controllersList.length) {
          const controllersLabelText = texts[currentLang]?.autoGearControllersLabel
            || texts.en?.autoGearControllersLabel
            || 'FIZ controllers';
          const controllersMeta = document.createElement('p');
          controllersMeta.className = 'auto-gear-rule-meta';
          controllersMeta.textContent = `${controllersLabelText}: ${controllersList.join(' + ')}`;
          info.appendChild(controllersMeta);
        }
        if (distanceList.length) {
          const distanceLabelText = texts[currentLang]?.autoGearDistanceLabel
            || texts.en?.autoGearDistanceLabel
            || 'FIZ distance devices';
          const distanceMeta = document.createElement('p');
          distanceMeta.className = 'auto-gear-rule-meta';
          distanceMeta.textContent = `${distanceLabelText}: ${distanceList.join(' + ')}`;
          info.appendChild(distanceMeta);
        }
        if (shootingCondition) {
          const shootingLabelText = texts[currentLang]?.autoGearShootingDaysLabel
            || texts.en?.autoGearShootingDaysLabel
            || 'Shooting days condition';
          const minimumLabel = texts[currentLang]?.autoGearShootingDaysModeMinimum
            || texts.en?.autoGearShootingDaysModeMinimum
            || 'Minimum';
          const maximumLabel = texts[currentLang]?.autoGearShootingDaysModeMaximum
            || texts.en?.autoGearShootingDaysModeMaximum
            || 'Maximum';
          const everyLabel = texts[currentLang]?.autoGearShootingDaysModeEvery
            || texts.en?.autoGearShootingDaysModeEvery
            || 'Every';
          const shootingMeta = document.createElement('p');
          shootingMeta.className = 'auto-gear-rule-meta';
          let formattedValue = String(shootingCondition.value);
          if (shootingCondition.mode === 'minimum') {
            formattedValue = `≥ ${shootingCondition.value}`;
            shootingMeta.textContent = `${shootingLabelText}: ${minimumLabel} ${formattedValue.replace('≥ ', '')}`;
          } else if (shootingCondition.mode === 'maximum') {
            formattedValue = `≤ ${shootingCondition.value}`;
            shootingMeta.textContent = `${shootingLabelText}: ${maximumLabel} ${formattedValue.replace('≤ ', '')}`;
          } else if (shootingCondition.mode === 'every') {
            shootingMeta.textContent = `${shootingLabelText}: ${everyLabel} ${shootingCondition.value}`;
          } else {
            shootingMeta.textContent = `${shootingLabelText}: ${formattedValue}`;
          }
          info.appendChild(shootingMeta);
        }
        if (matteboxList.length) {
          const matteboxLabelText = texts[currentLang]?.autoGearMatteboxLabel
            || texts.en?.autoGearMatteboxLabel
            || 'Mattebox options';
          const matteboxMeta = document.createElement('p');
          matteboxMeta.className = 'auto-gear-rule-meta';
          matteboxMeta.textContent = `${matteboxLabelText}: ${matteboxList.join(' + ')}`;
          info.appendChild(matteboxMeta);
        }
        if (cameraHandleList.length) {
          const cameraHandleLabelText = texts[currentLang]?.autoGearCameraHandleLabel
            || texts.en?.autoGearCameraHandleLabel
            || 'Camera handles';
          const cameraHandleMeta = document.createElement('p');
          cameraHandleMeta.className = 'auto-gear-rule-meta';
          cameraHandleMeta.textContent = `${cameraHandleLabelText}: ${cameraHandleList.join(' + ')}`;
          info.appendChild(cameraHandleMeta);
        }
        if (rawViewfinderList.length) {
          const viewfinderLabelText = texts[currentLang]?.autoGearViewfinderExtensionLabel
            || texts.en?.autoGearViewfinderExtensionLabel
            || 'Viewfinder extension';
          const viewfinderMeta = document.createElement('p');
          viewfinderMeta.className = 'auto-gear-rule-meta';
          viewfinderMeta.textContent = `${viewfinderLabelText}: ${viewfinderDisplayList.join(' + ')}`;
          info.appendChild(viewfinderMeta);
        }
        if (videoDistributionDisplayList.length) {
          const videoDistLabelText = texts[currentLang]?.autoGearVideoDistributionLabel
            || texts.en?.autoGearVideoDistributionLabel
            || 'Video distribution';
          const videoDistMeta = document.createElement('p');
          videoDistMeta.className = 'auto-gear-rule-meta';
          videoDistMeta.textContent = `${videoDistLabelText}: ${videoDistributionDisplayList.join(' + ')}`;
          info.appendChild(videoDistMeta);
        }
        if (deliveryResolutionList.length) {
          const deliveryLabelText = texts[currentLang]?.autoGearDeliveryResolutionLabel
            || texts.en?.autoGearDeliveryResolutionLabel
            || 'Delivery resolution';
          const deliveryMeta = document.createElement('p');
          deliveryMeta.className = 'auto-gear-rule-meta';
          deliveryMeta.textContent = `${deliveryLabelText}: ${deliveryResolutionList.join(' + ')}`;
          info.appendChild(deliveryMeta);
        }
        const addSummary = formatAutoGearCount(rule.add.length, 'autoGearAddsCountOne', 'autoGearAddsCountOther');
        const removeSummary = formatAutoGearCount(rule.remove.length, 'autoGearRemovalsCountOne', 'autoGearRemovalsCountOther');
        const countsMeta = document.createElement('p');
        countsMeta.className = 'auto-gear-rule-meta';
        countsMeta.textContent = `${addSummary} · ${removeSummary}`;
        info.appendChild(countsMeta);
        if (rule.add.length) {
          const addsLabel = document.createElement('p');
          addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
          addsLabel.textContent = texts[currentLang]?.autoGearAddsListLabel
            || texts.en?.autoGearAddsListLabel
            || 'Adds';
          info.appendChild(addsLabel);
          const addList = document.createElement('ul');
          addList.className = 'auto-gear-rule-items';
          rule.add.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'auto-gear-rule-item';
            listItem.textContent = formatAutoGearItemSummary(item);
            addList.appendChild(listItem);
          });
          info.appendChild(addList);
        }
        wrapper.appendChild(info);
        const actions = document.createElement('div');
        actions.className = 'auto-gear-rule-actions';
        const toggleWrapper = document.createElement('label');
        toggleWrapper.className = 'auto-gear-rule-toggle';
        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.className = 'auto-gear-enabled-toggle';
        toggle.checked = isEnabled;
        toggle.dataset.ruleId = rule.id;
        if (typeof index === 'number' && index >= 0) {
          toggle.dataset.ruleIndex = String(index);
        }
        const toggleOnLabel = texts[currentLang]?.autoGearRuleToggleEnable
          || texts.en?.autoGearRuleToggleEnable
          || 'Enable rule';
        const toggleOffLabel = texts[currentLang]?.autoGearRuleToggleDisable
          || texts.en?.autoGearRuleToggleDisable
          || 'Disable rule';
        const toggleLabel = isEnabled ? toggleOffLabel : toggleOnLabel;
        toggle.setAttribute('aria-label', toggleLabel);
        toggle.title = toggleLabel;
        const toggleStatus = document.createElement('span');
        toggleStatus.textContent = isEnabled
          ? (texts[currentLang]?.autoGearRuleEnabledLabel
            || texts.en?.autoGearRuleEnabledLabel
            || 'Enabled')
          : (texts[currentLang]?.autoGearRuleDisabledLabel
            || texts.en?.autoGearRuleDisabledLabel
            || 'Disabled');
        toggleWrapper.appendChild(toggle);
        toggleWrapper.appendChild(toggleStatus);
        actions.appendChild(toggleWrapper);
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'auto-gear-edit';
        editBtn.dataset.ruleId = rule.id;
        if (typeof index === 'number' && index >= 0) {
          editBtn.dataset.ruleIndex = String(index);
        } else {
          delete editBtn.dataset.ruleIndex;
        }
        const editLabel = texts[currentLang]?.editBtn || texts.en?.editBtn || 'Edit';
        editBtn.textContent = editLabel;
        editBtn.setAttribute('data-help', editLabel);
        actions.appendChild(editBtn);
        const duplicateBtn = document.createElement('button');
        duplicateBtn.type = 'button';
        duplicateBtn.className = 'auto-gear-duplicate';
        duplicateBtn.dataset.ruleId = rule.id;
        if (typeof index === 'number' && index >= 0) {
          duplicateBtn.dataset.ruleIndex = String(index);
        } else {
          delete duplicateBtn.dataset.ruleIndex;
        }
        const duplicateLabel = texts[currentLang]?.autoGearDuplicateRule
          || texts.en?.autoGearDuplicateRule
          || 'Duplicate';
        duplicateBtn.textContent = duplicateLabel;
        duplicateBtn.setAttribute('data-help', duplicateLabel);
        actions.appendChild(duplicateBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'auto-gear-delete';
        deleteBtn.dataset.ruleId = rule.id;
        if (typeof index === 'number' && index >= 0) {
          deleteBtn.dataset.ruleIndex = String(index);
        } else {
          delete deleteBtn.dataset.ruleIndex;
        }
        const deleteLabel = texts[currentLang]?.autoGearDeleteRule
          || texts.en?.autoGearDeleteRule
          || 'Delete';
        deleteBtn.textContent = deleteLabel;
        deleteBtn.setAttribute('data-help', deleteLabel);
        actions.appendChild(deleteBtn);
        wrapper.appendChild(actions);
        autoGearRulesList.appendChild(wrapper);
      });
    }

    function resetAutoGearDraftInputs(type) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      const ownGearSelect = isAdd ? autoGearAddOwnGearSelect : autoGearRemoveOwnGearSelect;
      if (nameInput) nameInput.value = '';
      if (quantityInput) quantityInput.value = '1';
      if (screenSizeInput) screenSizeInput.value = '';
      if (selectorTypeSelect) selectorTypeSelect.value = 'none';
      if (selectorDefaultInput) selectorDefaultInput.value = '';
      if (selectorDefaultInput && Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset, 'autoGearPreferredDefault')) {
        delete selectorDefaultInput.dataset.autoGearPreferredDefault;
      }
      if (notesInput) notesInput.value = '';
      if (ownGearSelect) {
        ownGearSelect.value = '';
        Array.from(ownGearSelect.querySelectorAll('option[data-auto-gear-fallback="true"]'))
          .forEach(option => option.remove());
      }
      if (nameInput && nameInput.dataset) {
        delete nameInput.dataset.autoGearOwnGearId;
        delete nameInput.dataset.autoGearOwnGearName;
      }
      const selectorTypeValue = selectorTypeSelect ? selectorTypeSelect.value : 'none';
      updateAutoGearMonitorCatalogOptions(selectorTypeValue, selectorDefaultInput);
    }

    function updateAutoGearItemButtonState(type) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const button = normalizedType === 'remove' ? autoGearRemoveItemButton : autoGearAddItemButton;
      if (!button) return;
      const langTexts = texts[currentLang] || texts.en || {};
      const isEditing = autoGearEditorActiveItem?.listType === normalizedType;
      const defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
      const defaultLabel = langTexts[defaultKey]
        || texts.en?.[defaultKey]
        || button.textContent
        || '';
      const updateLabel = langTexts.autoGearUpdateItemButton
        || texts.en?.autoGearUpdateItemButton
        || defaultLabel;
      const label = isEditing ? updateLabel : defaultLabel;
      const glyph = isEditing
        ? ICON_GLYPHS.save
        : (normalizedType === 'remove' ? ICON_GLYPHS.minus : ICON_GLYPHS.add);
      setButtonLabelWithIcon(button, label, glyph);
      button.setAttribute('data-help', label);
    }

    function readAutoGearOwnGearSelection(select) {
      if (!select) return null;
      const option = select.selectedOptions ? select.selectedOptions[0] : null;
      if (!option || !option.value) return null;
      const name = option.dataset.name || option.textContent || '';
      return {
        id: option.value,
        name,
        label: option.textContent || name,
        notes: option.dataset.notes || '',
      };
    }

    function applyAutoGearOwnGearSelection(type) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const select = normalizedType === 'remove' ? autoGearRemoveOwnGearSelect : autoGearAddOwnGearSelect;
      const nameInput = normalizedType === 'remove' ? autoGearRemoveNameInput : autoGearAddNameInput;
      const notesInput = normalizedType === 'remove' ? autoGearRemoveNotesInput : autoGearAddNotesInput;
      if (!select || !nameInput) return;
      const selection = readAutoGearOwnGearSelection(select);
      if (!selection) {
        if (nameInput.dataset) {
          delete nameInput.dataset.autoGearOwnGearId;
          delete nameInput.dataset.autoGearOwnGearName;
        }
        Array.from(select.querySelectorAll('option[data-auto-gear-fallback="true"]'))
          .forEach(option => option.remove());
        return;
      }
      if (selection.name) {
        nameInput.value = selection.name;
      }
      if (nameInput.dataset) {
        nameInput.dataset.autoGearOwnGearId = selection.id;
        nameInput.dataset.autoGearOwnGearName = selection.name || selection.label || '';
      }
      if (notesInput && !notesInput.value && selection.notes) {
        notesInput.value = selection.notes;
      }
    }

    function updateAutoGearDraftActionState() {
      updateAutoGearItemButtonState('add');
      updateAutoGearItemButtonState('remove');
    }

    function getAutoGearDraftList(type) {
      if (!autoGearEditorDraft) return null;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      return normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
    }

    function populateAutoGearDraftForm(type, item) {
      if (!item) return;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return;
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      const ownGearSelect = isAdd ? autoGearAddOwnGearSelect : autoGearRemoveOwnGearSelect;
      if (nameInput) nameInput.value = snapshot.name || '';
      if (quantityInput) quantityInput.value = String(normalizeAutoGearQuantity(snapshot.quantity));
      if (categorySelect) {
        const targetCategory = snapshot.category || AUTO_GEAR_CUSTOM_CATEGORY;
        let matched = false;
        Array.from(categorySelect.options || []).forEach(option => {
          if (option && option.value === targetCategory) {
            matched = true;
          }
        });
        categorySelect.value = matched ? targetCategory : AUTO_GEAR_CUSTOM_CATEGORY;
      }
      const activeCategory = categorySelect ? categorySelect.value : snapshot.category;
      const isMonitoring = isAutoGearMonitoringCategory(activeCategory);
      if (screenSizeInput) {
        screenSizeInput.value = isMonitoring ? (snapshot.screenSize || '') : '';
      }
      if (selectorTypeSelect) {
        const selectorValue = isMonitoring ? (snapshot.selectorType || 'none') : 'none';
        selectorTypeSelect.value = selectorValue;
        if (selectorDefaultInput) {
          selectorDefaultInput.dataset.autoGearPreferredDefault = isMonitoring ? (snapshot.selectorDefault || '') : '';
        }
        updateAutoGearMonitorCatalogOptions(selectorValue, selectorDefaultInput);
        if (selectorDefaultInput) {
          selectorDefaultInput.value = isMonitoring ? (snapshot.selectorDefault || '') : '';
        }
      } else if (selectorDefaultInput) {
        selectorDefaultInput.value = isMonitoring ? (snapshot.selectorDefault || '') : '';
      }
      if (notesInput) notesInput.value = snapshot.notes || '';
      if (ownGearSelect) {
        const targetId = snapshot.ownGearId || '';
        if (targetId && !ownGearSelect.querySelector(`option[value="${targetId}"]`)) {
          const fallbackOption = document.createElement('option');
          fallbackOption.value = targetId;
          fallbackOption.textContent = snapshot.ownGearLabel || snapshot.name || targetId;
          fallbackOption.dataset.name = snapshot.ownGearLabel || snapshot.name || '';
          if (snapshot.notes) fallbackOption.dataset.notes = snapshot.notes;
          fallbackOption.dataset.autoGearFallback = 'true';
          ownGearSelect.appendChild(fallbackOption);
        }
        ownGearSelect.value = targetId && ownGearSelect.querySelector(`option[value="${targetId}"]`) ? targetId : '';
      }
      if (nameInput && nameInput.dataset) {
        if (snapshot.ownGearId) {
          nameInput.dataset.autoGearOwnGearId = snapshot.ownGearId;
          nameInput.dataset.autoGearOwnGearName = snapshot.ownGearLabel || snapshot.name || '';
        } else {
          delete nameInput.dataset.autoGearOwnGearId;
          delete nameInput.dataset.autoGearOwnGearName;
        }
      }
      syncAutoGearMonitorFieldVisibility();
      if (nameInput) {
        try {
          nameInput.focus({ preventScroll: true });
          if (typeof nameInput.select === 'function') {
            nameInput.select();
          }
        } catch {
          nameInput.focus();
        }
      }
    }

    function clearAutoGearDraftItemEdit(type, options = {}) {
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const { skipRender = false } = options;
      if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType) {
        autoGearEditorActiveItem = null;
      }
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      if (!skipRender) {
        renderAutoGearDraftLists();
      }
    }

    function beginAutoGearDraftItemEdit(listType, itemId) {
      if (!autoGearEditorDraft || !itemId) return;
      const normalizedType = listType === 'remove' ? 'remove' : 'add';
      const list = getAutoGearDraftList(normalizedType);
      if (!Array.isArray(list)) return;
      if (
        autoGearEditorActiveItem
        && autoGearEditorActiveItem.listType === normalizedType
        && autoGearEditorActiveItem.itemId === itemId
      ) {
        clearAutoGearDraftItemEdit(normalizedType);
        return;
      }
      const target = list.find(entry => entry && entry.id === itemId);
      if (!target) return;
      autoGearEditorActiveItem = { listType: normalizedType, itemId };
      populateAutoGearDraftForm(normalizedType, target);
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }

    function getAutoGearItemIdentityData(item) {
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      const contexts = Array.isArray(normalized.contextNotes)
        ? normalized.contextNotes
          .map(value => (typeof value === 'string' ? value.trim() : ''))
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
        : [];
      const identity = [
        normalized.name || '',
        normalized.category || '',
        normalized.screenSize || '',
        normalized.selectorType || 'none',
        normalized.selectorDefault || '',
        normalized.selectorEnabled ? '1' : '0',
        normalized.notes || '',
        normalized.ownGearId || '',
        contexts.join('|'),
      ].join('||');
      return {
        identity,
        item: {
          ...normalized,
          contextNotes: contexts.slice(),
        },
      };
    }

    function normalizeAutoGearRuleForPreview(rule) {
      if (!rule || typeof rule !== 'object') return null;
      const add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
      const remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
      if (!add.length && !remove.length) return null;
      const id = typeof rule.id === 'string' && rule.id ? rule.id : '';
      return { id, add, remove };
    }

    function aggregateAutoGearRuleItems(rules, options = {}) {
      const allowDraftPreviewRules = Boolean(options.allowDraftPreviewRules);
      const aggregate = new Map();
      const list = Array.isArray(rules) ? rules : [];
      list.forEach(rule => {
        let normalizedRule = normalizeAutoGearRule(rule);
        if (!normalizedRule && allowDraftPreviewRules) {
          normalizedRule = normalizeAutoGearRuleForPreview(rule);
        }
        if (!normalizedRule) return;
        const ruleId = typeof normalizedRule.id === 'string' ? normalizedRule.id : '';
        normalizedRule.add.forEach(entry => {
          const identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          const { identity, item } = identityData;
          const quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          const existing = aggregate.get(identity) || {
            item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set(),
          };
          existing.add += quantity;
          if (ruleId) existing.addRules.add(ruleId);
          aggregate.set(identity, existing);
        });
        normalizedRule.remove.forEach(entry => {
          const identityData = getAutoGearItemIdentityData(entry);
          if (!identityData) return;
          const { identity, item } = identityData;
          const quantity = normalizeAutoGearQuantity(item.quantity);
          if (!Number.isFinite(quantity)) return;
          const existing = aggregate.get(identity) || {
            item,
            add: 0,
            remove: 0,
            addRules: new Set(),
            removeRules: new Set(),
          };
          existing.remove += quantity;
          if (ruleId) existing.removeRules.add(ruleId);
          aggregate.set(identity, existing);
        });
      });
      return aggregate;
    }

    function computeAutoGearDraftImpactState() {
      if (!autoGearEditorDraft) {
        return { available: false, entries: [], warnings: null };
      }
      const baseRules = getAutoGearRules();
      const draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      let previewRule = draftRule;
      let allowDraftPreviewRules = false;
      if (!previewRule) {
        previewRule = normalizeAutoGearRuleForPreview(autoGearEditorDraft);
        allowDraftPreviewRules = Boolean(previewRule);
      }
      if (!previewRule) {
        return { available: false, entries: [], warnings: null };
      }
      const previewRules = baseRules.slice();
      const matchIndex = previewRules.findIndex(rule => rule && rule.id === previewRule.id);
      if (matchIndex >= 0) {
        previewRules[matchIndex] = previewRule;
      } else {
        previewRules.push(previewRule);
      }
      const baseAggregate = aggregateAutoGearRuleItems(baseRules);
      const previewAggregate = aggregateAutoGearRuleItems(previewRules, { allowDraftPreviewRules });
      const keys = new Set([...baseAggregate.keys(), ...previewAggregate.keys()]);
      const entries = [];
      const warnings = { critical: [], conflict: [], redundant: [] };
      keys.forEach(identity => {
        const baseEntry = baseAggregate.get(identity);
        const previewEntry = previewAggregate.get(identity);
        if (!baseEntry && !previewEntry) return;
        const itemSource = previewEntry?.item || baseEntry?.item;
        if (!itemSource) return;
        const item = cloneAutoGearDraftItem(itemSource);
        const baseNet = baseEntry ? (baseEntry.add - baseEntry.remove) : 0;
        const previewNet = previewEntry ? (previewEntry.add - previewEntry.remove) : 0;
        const delta = previewNet - baseNet;
        const addRulesCount = previewEntry ? previewEntry.addRules.size : 0;
        const removeRulesCount = previewEntry ? previewEntry.removeRules.size : 0;
        const baseAddRulesCount = baseEntry ? baseEntry.addRules.size : 0;
        const conflict = previewEntry ? (previewEntry.add > 0 && previewEntry.remove > 0) : false;
        const stacked = addRulesCount > 1;
        const shouldDisplay = delta !== 0 || stacked || conflict;
        if (!shouldDisplay) return;
        entries.push({
          identity,
          item,
          baseNet,
          previewNet,
          delta,
          addRulesCount,
          removeRulesCount,
          conflict,
          stacked,
        });
        if (baseNet > 0 && previewNet <= 0) {
          warnings.critical.push({ item, baseNet, previewNet });
        }
        if (conflict) {
          warnings.conflict.push({ item, addRulesCount, removeRulesCount });
        }
        const newAddRules = addRulesCount - baseAddRulesCount;
        if (newAddRules > 0 && previewNet <= baseNet) {
          warnings.redundant.push({ item, addRulesCount, baseAddRulesCount });
        }
      });
      entries.sort((a, b) => {
        const deltaDiff = Math.abs(b.delta) - Math.abs(a.delta);
        if (deltaDiff !== 0) return deltaDiff;
        const previewDiff = Math.abs(b.previewNet) - Math.abs(a.previewNet);
        if (previewDiff !== 0) return previewDiff;
        return (a.item.name || '').localeCompare(b.item.name || '');
      });
      return { available: true, entries, warnings };
    }

    function formatAutoGearImpactNumber(value) {
      if (!Number.isFinite(value)) return '0';
      const rounded = Math.round(value);
      if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
        try {
          return new Intl.NumberFormat().format(rounded);
        } catch {
          // Ignore formatting errors and fall back to raw values
        }
      }
      return String(rounded);
    }

    function formatAutoGearImpactSigned(value) {
      if (!Number.isFinite(value) || value === 0) return '0';
      const rounded = Math.round(value);
      const absValue = Math.abs(rounded);
      const formattedAbs = formatAutoGearImpactNumber(absValue);
      return rounded > 0 ? `+${formattedAbs}` : `−${formattedAbs}`;
    }

    function formatAutoGearDraftItemLabel(item, quantity) {
      const snapshot = autoGearItemSnapshot(item);
      if (!snapshot) return '';
      const normalizedQuantity = Number.isFinite(quantity) && quantity !== 0
        ? Math.abs(Math.round(quantity))
        : normalizeAutoGearQuantity(snapshot.quantity) || 1;
      const summaryItem = {
        ...snapshot,
        quantity: normalizedQuantity > 0 ? normalizedQuantity : 1,
      };
      return formatAutoGearItemSummary(summaryItem, { includeSign: false });
    }

    function hasAutoGearDraftWarnings(warnings) {
      if (!warnings) return false;
      return Boolean(
        (Array.isArray(warnings.critical) && warnings.critical.length)
        || (Array.isArray(warnings.conflict) && warnings.conflict.length)
        || (Array.isArray(warnings.redundant) && warnings.redundant.length),
      );
    }

    function buildAutoGearDraftWarningMessages(warnings, langTexts) {
      if (!warnings) return [];
      const messages = [];
      const fallback = texts.en || {};
      const addMessage = (key, label) => {
        const template = langTexts[key] || fallback[key];
        if (template) {
          messages.push(formatWithPlaceholders(template, label));
        } else if (label) {
          messages.push(label);
        }
      };
      (Array.isArray(warnings.critical) ? warnings.critical : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.baseNet);
        addMessage('autoGearDraftWarningCritical', label);
      });
      (Array.isArray(warnings.conflict) ? warnings.conflict : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || entry.removeRulesCount || 1);
        addMessage('autoGearDraftWarningConflict', label);
      });
      (Array.isArray(warnings.redundant) ? warnings.redundant : []).forEach(entry => {
        const label = formatAutoGearDraftItemLabel(entry.item, entry.addRulesCount || 1);
        addMessage('autoGearDraftWarningRedundant', label);
      });
      return Array.from(new Set(messages));
    }

    function renderAutoGearDraftImpact() {
      if (!autoGearDraftImpactList) return;
      const langTexts = texts[currentLang] || texts.en || {};
      autoGearDraftImpactList.innerHTML = '';
      if (autoGearDraftWarningList) {
        autoGearDraftWarningList.innerHTML = '';
      }
      autoGearDraftPendingWarnings = null;

      if (!autoGearEditorDraft) {
        const message = langTexts.autoGearDraftImpactUnavailable
          || texts.en?.autoGearDraftImpactUnavailable
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }

      const impact = computeAutoGearDraftImpactState();
      autoGearDraftPendingWarnings = impact.available ? impact.warnings : null;

      if (!impact.available) {
        const message = langTexts.autoGearDraftImpactUnavailable
          || texts.en?.autoGearDraftImpactUnavailable
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
        if (autoGearDraftWarningContainer) {
          autoGearDraftWarningContainer.hidden = true;
        }
        return;
      }

      if (!impact.entries.length) {
        const message = langTexts.autoGearDraftImpactEmpty
          || texts.en?.autoGearDraftImpactEmpty
          || '';
        if (message) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-impact-empty';
          empty.textContent = message;
          autoGearDraftImpactList.appendChild(empty);
        }
      } else {
        const totalsTemplate = langTexts.autoGearDraftImpactTotals
          || texts.en?.autoGearDraftImpactTotals
          || 'Current total: %s → After save: %s';
        const changeTemplate = langTexts.autoGearDraftImpactChange
          || texts.en?.autoGearDraftImpactChange
          || 'Change: %s';
        impact.entries.forEach(entry => {
          const li = document.createElement('li');
          li.className = 'auto-gear-impact-item';
          if (entry.delta > 0) {
            li.classList.add('auto-gear-impact-positive');
          } else if (entry.delta < 0) {
            li.classList.add('auto-gear-impact-negative');
          }
          if (entry.stacked) {
            li.classList.add('auto-gear-impact-stacked');
          }
          const summary = document.createElement('div');
          summary.className = 'auto-gear-impact-summary';
          summary.textContent = formatAutoGearDraftItemLabel(entry.item, entry.previewNet || entry.baseNet || entry.delta);
          li.appendChild(summary);
          const totals = document.createElement('div');
          totals.className = 'auto-gear-impact-totals';
          totals.textContent = formatWithPlaceholders(
            totalsTemplate,
            formatAutoGearImpactNumber(entry.baseNet),
            formatAutoGearImpactNumber(entry.previewNet),
          );
          li.appendChild(totals);
          const delta = document.createElement('div');
          delta.className = 'auto-gear-impact-delta';
          delta.textContent = formatWithPlaceholders(changeTemplate, formatAutoGearImpactSigned(entry.delta));
          li.appendChild(delta);
          const metaTexts = [];
          if (entry.stacked) {
            const stackKey = entry.addRulesCount === 1
              ? 'autoGearDraftImpactStackedOne'
              : 'autoGearDraftImpactStackedOther';
            const stackTemplate = langTexts[stackKey] || texts.en?.[stackKey];
            if (stackTemplate) {
              metaTexts.push(formatWithPlaceholders(stackTemplate, formatAutoGearImpactNumber(entry.addRulesCount)));
            }
          }
          if (entry.conflict && entry.removeRulesCount > 0) {
            const conflictKey = entry.removeRulesCount === 1
              ? 'autoGearDraftImpactConflictOne'
              : 'autoGearDraftImpactConflictOther';
            const conflictTemplate = langTexts[conflictKey] || texts.en?.[conflictKey];
            if (conflictTemplate) {
              metaTexts.push(formatWithPlaceholders(
                conflictTemplate,
                formatAutoGearImpactNumber(entry.removeRulesCount),
              ));
            }
          }
          if (metaTexts.length) {
            const meta = document.createElement('div');
            meta.className = 'auto-gear-impact-meta';
            meta.textContent = metaTexts.join(' ');
            li.appendChild(meta);
          }
          autoGearDraftImpactList.appendChild(li);
        });
      }

      if (autoGearDraftWarningContainer) {
        const warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
        if (warningMessages.length) {
          autoGearDraftWarningContainer.hidden = false;
          if (autoGearDraftWarningList) {
            warningMessages.forEach(message => {
              const item = document.createElement('li');
              item.className = 'auto-gear-impact-warning-item';
              item.textContent = message;
              autoGearDraftWarningList.appendChild(item);
            });
          }
        } else {
          autoGearDraftWarningContainer.hidden = true;
        }
      }
    }

    function renderAutoGearDraftLists() {
      updateAutoGearDraftActionState();
      if (!autoGearEditorDraft) {
        if (autoGearAddList) autoGearAddList.innerHTML = '';
        if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
        renderAutoGearDraftImpact();
        return;
      }
      const renderList = (element, items, type) => {
        if (!element) return;
        element.innerHTML = '';
        if (!items.length) {
          const empty = document.createElement('li');
          empty.className = 'auto-gear-empty';
          empty.textContent = texts[currentLang]?.autoGearEmptyList
            || texts.en?.autoGearEmptyList
            || 'No items yet.';
          element.appendChild(empty);
          return;
        }
        items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'auto-gear-item';
          if (
            autoGearEditorActiveItem
            && autoGearEditorActiveItem.listType === type
            && autoGearEditorActiveItem.itemId === item.id
          ) {
            li.classList.add('auto-gear-item-editing');
          }
          const span = document.createElement('span');
          span.textContent = formatAutoGearItemSummary(item, { includeSign: true, listType: type });
          li.appendChild(span);
          const actions = document.createElement('span');
          actions.className = 'auto-gear-item-actions';
          const editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className = 'auto-gear-edit-entry';
          editBtn.dataset.listType = type;
          editBtn.dataset.itemId = item.id;
          const editLabel = texts[currentLang]?.autoGearListEdit
            || texts.en?.autoGearListEdit
            || 'Edit';
          editBtn.textContent = editLabel;
          editBtn.setAttribute('data-help', editLabel);
          editBtn.setAttribute(
            'aria-pressed',
            autoGearEditorActiveItem && autoGearEditorActiveItem.listType === type && autoGearEditorActiveItem.itemId === item.id
              ? 'true'
              : 'false'
          );
          actions.appendChild(editBtn);
          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'auto-gear-remove-entry';
          removeBtn.dataset.listType = type;
          removeBtn.dataset.itemId = item.id;
          const removeLabel = texts[currentLang]?.autoGearListRemove
            || texts.en?.autoGearListRemove
            || 'Remove';
          removeBtn.textContent = removeLabel;
          removeBtn.setAttribute('data-help', removeLabel);
          actions.appendChild(removeBtn);
          li.appendChild(actions);
          element.appendChild(li);
        });
      };
      renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
      renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
      renderAutoGearDraftImpact();
    }

    function openAutoGearEditor(ruleId, options = {}) {
      if (!autoGearEditor) return;
      const { initialDraft, highlightLabel = false, ruleIndex = null } = options;
      const rules = getAutoGearRules();
      let source = null;
      if (initialDraft) {
        source = initialDraft;
      } else if (ruleId) {
        source = rules.find(rule => rule && rule.id === ruleId) || null;
      }
      if (!source && ruleIndex !== null && ruleIndex !== undefined) {
        const parsedIndex = typeof ruleIndex === 'number'
          ? ruleIndex
          : Number.parseInt(ruleIndex, 10);
        if (Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < rules.length) {
          source = rules[parsedIndex] || null;
        }
      }
      if (!source && !initialDraft) {
        source = null;
      }
      autoGearEditorDraft = createAutoGearDraft(source);
      autoGearEditorActiveItem = null;
      autoGearEditor.hidden = false;
      autoGearEditor.setAttribute('aria-hidden', 'false');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'true');
      }
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.value = autoGearEditorDraft.label || '';
      }
      initializeAutoGearConditionsFromDraft();
      populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearEditorDraft.add[0]?.category || '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearEditorDraft.remove[0]?.category || '');
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
      if (autoGearRuleNameInput) {
        autoGearRuleNameInput.focus();
        if (highlightLabel && typeof autoGearRuleNameInput.select === 'function' && autoGearRuleNameInput.value) {
          try {
            autoGearRuleNameInput.select();
          } catch {
            // Ignore selection errors (for older browsers)
          }
        }
      }
    }

    function closeAutoGearEditor() {
      if (!autoGearEditor) return;
      autoGearEditor.hidden = true;
      autoGearEditor.setAttribute('aria-hidden', 'true');
      if (autoGearAddRuleBtn) {
        autoGearAddRuleBtn.setAttribute('aria-expanded', 'false');
      }
      autoGearEditorDraft = null;
      autoGearEditorActiveItem = null;
      if (autoGearRuleNameInput) autoGearRuleNameInput.value = '';
      clearAllAutoGearConditions();
      resetAutoGearDraftInputs('add');
      resetAutoGearDraftInputs('remove');
      syncAutoGearMonitorFieldVisibility();
      updateAutoGearDraftActionState();
      renderAutoGearDraftLists();
    }

    if (autoGearAddOwnGearSelect) {
      autoGearAddOwnGearSelect.addEventListener('change', () => applyAutoGearOwnGearSelection('add'));
    }
    if (autoGearRemoveOwnGearSelect) {
      autoGearRemoveOwnGearSelect.addEventListener('change', () => applyAutoGearOwnGearSelection('remove'));
    }

    function addAutoGearDraftItem(type) {
      if (!autoGearEditorDraft) return;
      const normalizedType = type === 'remove' ? 'remove' : 'add';
      const isAdd = normalizedType === 'add';
      const nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
      const categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
      const quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
      const screenSizeInput = isAdd ? autoGearAddScreenSizeInput : autoGearRemoveScreenSizeInput;
      const selectorTypeSelect = isAdd ? autoGearAddSelectorTypeSelect : autoGearRemoveSelectorTypeSelect;
      const selectorDefaultInput = isAdd ? autoGearAddSelectorDefaultInput : autoGearRemoveSelectorDefaultInput;
      const notesInput = isAdd ? autoGearAddNotesInput : autoGearRemoveNotesInput;
      const ownGearSelect = isAdd ? autoGearAddOwnGearSelect : autoGearRemoveOwnGearSelect;
      if (!nameInput || !categorySelect || !quantityInput) return;
      const parsedNames = parseAutoGearDraftNames(nameInput.value);
      if (!parsedNames.length) {
        const message = texts[currentLang]?.autoGearItemNameRequired
          || texts.en?.autoGearItemNameRequired
          || 'Enter an item name first.';
        window.alert(message);
        return;
      }
      const baseValues = {
        category: categorySelect.value || '',
        quantity: normalizeAutoGearQuantity(quantityInput.value),
        screenSize: screenSizeInput ? screenSizeInput.value : '',
        selectorType: selectorTypeSelect ? selectorTypeSelect.value : 'none',
        selectorDefault: selectorDefaultInput ? selectorDefaultInput.value : '',
        notes: notesInput ? notesInput.value : '',
        ownGearId: '',
        ownGearLabel: '',
      };
      const ownGearSelection = readAutoGearOwnGearSelection(ownGearSelect);
      if (ownGearSelection) {
        baseValues.ownGearId = ownGearSelection.id;
        baseValues.ownGearLabel = ownGearSelection.name || ownGearSelection.label || '';
      }
      if (isAutoGearMonitoringCategory(baseValues.category)) {
        baseValues.selectorEnabled = baseValues.selectorType !== 'none';
      } else {
        baseValues.screenSize = '';
        baseValues.selectorType = 'none';
        baseValues.selectorDefault = '';
        baseValues.selectorEnabled = false;
      }
      const editingTarget = autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType
        ? autoGearEditorActiveItem
        : null;
      if (editingTarget) {
        if (parsedNames.length !== 1) {
          const warning = texts[currentLang]?.autoGearEditSingleItemWarning
            || texts.en?.autoGearEditSingleItemWarning
            || 'Edit one item at a time.';
          window.alert(warning);
          return;
        }
        const entry = parsedNames[0];
        const quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity')
          ? normalizeAutoGearQuantity(entry.quantity)
          : baseValues.quantity;
        const list = getAutoGearDraftList(normalizedType);
        if (!Array.isArray(list)) return;
        const index = list.findIndex(item => item && item.id === editingTarget.itemId);
        if (index < 0) {
          clearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
          renderAutoGearDraftLists();
          updateAutoGearCatalogOptions();
          return;
        }
        const itemData = normalizeAutoGearItem({
          id: editingTarget.itemId,
          name: entry.name,
          category: baseValues.category,
          quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes,
          ownGearId: baseValues.ownGearId,
          ownGearLabel: baseValues.ownGearLabel,
          ownGearName: baseValues.ownGearLabel,
        });
        if (itemData) {
          list[index] = itemData;
        } else {
          list.splice(index, 1);
        }
        clearAutoGearDraftItemEdit(normalizedType, { skipRender: true });
        renderAutoGearDraftLists();
        updateAutoGearCatalogOptions();
        return;
      }
      parsedNames.forEach(entry => {
        const quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity')
          ? normalizeAutoGearQuantity(entry.quantity)
          : baseValues.quantity;
        const targetType = entry.listType || (isAdd ? 'add' : 'remove');
        const targetList = targetType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        const itemData = normalizeAutoGearItem({
          id: generateAutoGearId('item'),
          name: entry.name,
          category: baseValues.category,
          quantity,
          screenSize: baseValues.screenSize,
          selectorType: baseValues.selectorType,
          selectorDefault: baseValues.selectorDefault,
          selectorEnabled: baseValues.selectorEnabled,
          notes: baseValues.notes,
          ownGearId: baseValues.ownGearId,
          ownGearLabel: baseValues.ownGearLabel,
          ownGearName: baseValues.ownGearLabel,
        });
        if (itemData) {
          targetList.push(itemData);
        }
      });
      resetAutoGearDraftInputs(normalizedType);
      syncAutoGearMonitorFieldVisibility();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
    }

    function saveAutoGearRuleFromEditor() {
      if (!autoGearEditorDraft) return;
      const scenarios = isAutoGearConditionActive('scenarios') && autoGearScenariosSelect
        ? Array.from(autoGearScenariosSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(Boolean)
        : [];
      const rawScenarioMode = autoGearScenarioModeSelectRef
        ? normalizeAutoGearScenarioLogic(autoGearScenarioModeSelectRef.value)
        : 'all';
      const multiplierInputValue = autoGearScenarioFactorInput ? autoGearScenarioFactorInput.value : '1';
      const normalizedMultiplier = normalizeAutoGearScenarioMultiplier(multiplierInputValue);
      let scenarioMode = rawScenarioMode;
      if (scenarioMode === 'multiplier' && scenarios.length < 2) {
        scenarioMode = 'all';
      }
      const baseSelection = autoGearScenarioBaseSelect ? autoGearScenarioBaseSelect.value : '';
      const scenarioBase = scenarioMode === 'multiplier'
        ? normalizeAutoGearScenarioPrimary(baseSelection)
        : '';
      if (scenarioMode === 'multiplier' && scenarioBase && !scenarios.includes(scenarioBase)) {
        scenarios.push(scenarioBase);
      }
      const matteboxSelections = isAutoGearConditionActive('mattebox') && autoGearMatteboxSelect
        ? Array.from(autoGearMatteboxSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(Boolean)
        : [];
      const cameraHandleSelections = isAutoGearConditionActive('cameraHandle') && autoGearCameraHandleSelect
        ? Array.from(autoGearCameraHandleSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(Boolean)
        : [];
      const viewfinderSelections = isAutoGearConditionActive('viewfinderExtension') && autoGearViewfinderExtensionSelect
        ? Array.from(autoGearViewfinderExtensionSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const deliveryResolutionSelections = isAutoGearConditionActive('deliveryResolution') && autoGearDeliveryResolutionSelect
        ? Array.from(autoGearDeliveryResolutionSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      let videoDistributionSelections = isAutoGearConditionActive('videoDistribution') && autoGearVideoDistributionSelect
        ? Array.from(autoGearVideoDistributionSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(Boolean)
        : [];
      if (videoDistributionSelections.includes('__none__') && videoDistributionSelections.length > 1) {
        videoDistributionSelections = videoDistributionSelections.filter(value => value !== '__none__');
      }
      const cameraSelections = isAutoGearConditionActive('camera') && autoGearCameraSelect
        ? Array.from(autoGearCameraSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const ownGearSelections = isAutoGearConditionActive('ownGear') && autoGearOwnGearSelect
        ? Array.from(autoGearOwnGearSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const cameraWeightCondition = (() => {
        if (!isAutoGearConditionActive('cameraWeight')) return null;
        const operatorValue = autoGearCameraWeightOperator ? autoGearCameraWeightOperator.value : '';
        const thresholdValue = autoGearCameraWeightValueInput ? autoGearCameraWeightValueInput.value : '';
        const normalizedCondition = normalizeAutoGearCameraWeightCondition({ operator: operatorValue, value: thresholdValue });
        if (normalizedCondition) return normalizedCondition;
        const normalizedOperator = normalizeAutoGearWeightOperator(operatorValue);
        return normalizedOperator ? { operator: normalizedOperator, value: null } : null;
      })();
      const monitorSelections = isAutoGearConditionActive('monitor') && autoGearMonitorSelect
        ? Array.from(autoGearMonitorSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const crewPresentSelections = isAutoGearConditionActive('crewPresent') && autoGearCrewPresentSelect
        ? Array.from(autoGearCrewPresentSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const crewAbsentSelections = isAutoGearConditionActive('crewAbsent') && autoGearCrewAbsentSelect
        ? Array.from(autoGearCrewAbsentSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const wirelessSelections = isAutoGearConditionActive('wireless') && autoGearWirelessSelect
        ? Array.from(autoGearWirelessSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const motorSelections = isAutoGearConditionActive('motors') && autoGearMotorsSelect
        ? Array.from(autoGearMotorsSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const controllerSelections = isAutoGearConditionActive('controllers') && autoGearControllersSelect
        ? Array.from(autoGearControllersSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const distanceSelections = isAutoGearConditionActive('distance') && autoGearDistanceSelect
        ? Array.from(autoGearDistanceSelect.selectedOptions || [])
          .map(option => option.value)
          .filter(value => typeof value === 'string' && value.trim())
        : [];
      const draftConditionLogic = {};
      if (scenarioMode !== 'all') {
        draftConditionLogic.scenarios = scenarioMode;
      }
      const matteboxLogic = autoGearMatteboxModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMatteboxModeSelect.value)
        : 'all';
      const cameraHandleLogic = autoGearCameraHandleModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCameraHandleModeSelect.value)
        : 'all';
      const viewfinderLogic = autoGearViewfinderExtensionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearViewfinderExtensionModeSelect.value)
        : 'all';
      const deliveryLogic = autoGearDeliveryResolutionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearDeliveryResolutionModeSelect.value)
        : 'all';
      const videoDistributionLogic = autoGearVideoDistributionModeSelect
        ? normalizeAutoGearConditionLogic(autoGearVideoDistributionModeSelect.value)
        : 'all';
      const cameraLogic = autoGearCameraModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCameraModeSelect.value)
        : 'all';
      const ownGearLogic = autoGearOwnGearModeSelect
        ? normalizeAutoGearConditionLogic(autoGearOwnGearModeSelect.value)
        : 'all';
      const monitorLogic = autoGearMonitorModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMonitorModeSelect.value)
        : 'all';
      const crewPresentLogic = autoGearCrewPresentModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCrewPresentModeSelect.value)
        : 'all';
      const crewAbsentLogic = autoGearCrewAbsentModeSelect
        ? normalizeAutoGearConditionLogic(autoGearCrewAbsentModeSelect.value)
        : 'all';
      const wirelessLogic = autoGearWirelessModeSelect
        ? normalizeAutoGearConditionLogic(autoGearWirelessModeSelect.value)
        : 'all';
      const motorsLogic = autoGearMotorsModeSelect
        ? normalizeAutoGearConditionLogic(autoGearMotorsModeSelect.value)
        : 'all';
      const controllersLogic = autoGearControllersModeSelect
        ? normalizeAutoGearConditionLogic(autoGearControllersModeSelect.value)
        : 'all';
      const distanceLogic = autoGearDistanceModeSelect
        ? normalizeAutoGearConditionLogic(autoGearDistanceModeSelect.value)
        : 'all';
      if (matteboxLogic !== 'all') draftConditionLogic.mattebox = matteboxLogic;
      if (cameraHandleLogic !== 'all') draftConditionLogic.cameraHandle = cameraHandleLogic;
      if (viewfinderLogic !== 'all') draftConditionLogic.viewfinderExtension = viewfinderLogic;
      if (deliveryLogic !== 'all') draftConditionLogic.deliveryResolution = deliveryLogic;
      if (videoDistributionLogic !== 'all') draftConditionLogic.videoDistribution = videoDistributionLogic;
      if (cameraLogic !== 'all') draftConditionLogic.camera = cameraLogic;
      if (ownGearLogic !== 'all') draftConditionLogic.ownGear = ownGearLogic;
      if (monitorLogic !== 'all') draftConditionLogic.monitor = monitorLogic;
      if (crewPresentLogic !== 'all') draftConditionLogic.crewPresent = crewPresentLogic;
      if (crewAbsentLogic !== 'all') draftConditionLogic.crewAbsent = crewAbsentLogic;
      if (wirelessLogic !== 'all') draftConditionLogic.wireless = wirelessLogic;
      if (motorsLogic !== 'all') draftConditionLogic.motors = motorsLogic;
      if (controllersLogic !== 'all') draftConditionLogic.controllers = controllersLogic;
      if (distanceLogic !== 'all') draftConditionLogic.distance = distanceLogic;
      const shootingDaysRequirement = (() => {
        if (!isAutoGearConditionActive('shootingDays')) return null;
        if (!autoGearShootingDaysInput) return null;
        const modeValue = autoGearShootingDaysMode ? autoGearShootingDaysMode.value : 'minimum';
        const rawCondition = { mode: modeValue, value: autoGearShootingDaysInput.value };
        return normalizeAutoGearShootingDaysCondition(rawCondition);
      })();
      const alwaysActive = isAutoGearConditionActive('always');
      if (
        !alwaysActive
        && !scenarios.length
        && !matteboxSelections.length
        && !cameraHandleSelections.length
        && !viewfinderSelections.length
        && !deliveryResolutionSelections.length
        && !videoDistributionSelections.length
        && !cameraSelections.length
        && !ownGearSelections.length
        && !cameraWeightCondition
        && !monitorSelections.length
        && !crewPresentSelections.length
        && !crewAbsentSelections.length
        && !wirelessSelections.length
        && !motorSelections.length
        && !controllerSelections.length
        && !distanceSelections.length
        && !shootingDaysRequirement
      ) {
        const message = texts[currentLang]?.autoGearRuleConditionRequired
          || texts.en?.autoGearRuleConditionRequired
          || texts[currentLang]?.autoGearRuleScenarioRequired
          || texts.en?.autoGearRuleScenarioRequired
          || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension, delivery resolution or video distribution before saving.';
        window.alert(message);
        return;
      }
      if (
        isAutoGearConditionActive('cameraWeight')
        && (!cameraWeightCondition || !Number.isFinite(cameraWeightCondition.value))
      ) {
        const message = texts[currentLang]?.autoGearCameraWeightValueRequired
          || texts.en?.autoGearCameraWeightValueRequired
          || 'Enter a camera weight threshold before saving.';
        window.alert(message);
        if (autoGearCameraWeightValueInput) {
          try {
            autoGearCameraWeightValueInput.focus({ preventScroll: true });
          } catch {
            autoGearCameraWeightValueInput.focus();
          }
        }
        return;
      }
      if (autoGearRuleNameInput) {
        autoGearEditorDraft.label = autoGearRuleNameInput.value.trim();
      }
      autoGearEditorDraft.always = alwaysActive ? ['always'] : [];
      autoGearEditorDraft.scenarioLogic = scenarioMode;
      autoGearEditorDraft.scenarioMultiplier = scenarioMode === 'multiplier' ? normalizedMultiplier : 1;
      autoGearEditorDraft.scenarioPrimary = scenarioMode === 'multiplier' ? scenarioBase : '';
      autoGearEditorDraft.scenarios = scenarios;
      autoGearEditorDraft.mattebox = matteboxSelections;
      autoGearEditorDraft.cameraHandle = cameraHandleSelections;
      autoGearEditorDraft.viewfinderExtension = viewfinderSelections;
      autoGearEditorDraft.deliveryResolution = deliveryResolutionSelections;
      autoGearEditorDraft.videoDistribution = videoDistributionSelections;
      autoGearEditorDraft.camera = cameraSelections;
      autoGearEditorDraft.ownGear = ownGearSelections;
      autoGearEditorDraft.cameraWeight = cameraWeightCondition ? { ...cameraWeightCondition } : null;
      autoGearEditorDraft.monitor = monitorSelections;
      autoGearEditorDraft.crewPresent = crewPresentSelections;
      autoGearEditorDraft.crewAbsent = crewAbsentSelections;
      autoGearEditorDraft.wireless = wirelessSelections;
      autoGearEditorDraft.motors = motorSelections;
      autoGearEditorDraft.controllers = controllerSelections;
      autoGearEditorDraft.distance = distanceSelections;
      autoGearEditorDraft.matteboxLogic = matteboxLogic;
      autoGearEditorDraft.cameraHandleLogic = cameraHandleLogic;
      autoGearEditorDraft.viewfinderExtensionLogic = viewfinderLogic;
      autoGearEditorDraft.deliveryResolutionLogic = deliveryLogic;
      autoGearEditorDraft.videoDistributionLogic = videoDistributionLogic;
      autoGearEditorDraft.cameraLogic = cameraLogic;
      autoGearEditorDraft.ownGearLogic = ownGearLogic;
      autoGearEditorDraft.monitorLogic = monitorLogic;
      autoGearEditorDraft.crewPresentLogic = crewPresentLogic;
      autoGearEditorDraft.crewAbsentLogic = crewAbsentLogic;
      autoGearEditorDraft.wirelessLogic = wirelessLogic;
      autoGearEditorDraft.motorsLogic = motorsLogic;
      autoGearEditorDraft.controllersLogic = controllersLogic;
      autoGearEditorDraft.distanceLogic = distanceLogic;
      autoGearEditorDraft.conditionLogic = draftConditionLogic;
      autoGearEditorDraft.shootingDays = shootingDaysRequirement;
      if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
        const message = texts[currentLang]?.autoGearRuleNeedsItems
          || texts.en?.autoGearRuleNeedsItems
          || 'Add at least one item to add or remove.';
        window.alert(message);
        return;
      }
      renderAutoGearDraftImpact();
      const draftRule = normalizeAutoGearRule(autoGearEditorDraft);
      if (!draftRule) return;
      const langTexts = texts[currentLang] || texts.en || {};
      const warningMessages = buildAutoGearDraftWarningMessages(autoGearDraftPendingWarnings, langTexts);
      const performSave = () => {
        const rules = getAutoGearRules();
        const index = rules.findIndex(rule => rule.id === draftRule.id);
        if (index >= 0) {
          rules[index] = draftRule;
        } else {
          rules.push(draftRule);
        }
        setAutoGearRules(rules);
        updateAutoGearCatalogOptions();
        renderAutoGearRulesList();
        const successMessage = texts[currentLang]?.autoGearRuleSaved
          || texts.en?.autoGearRuleSaved
          || 'Automatic gear rule saved.';
        showNotification('success', successMessage);
        closeAutoGearEditor();
      };

      if (warningMessages.length) {
        const confirmBase = langTexts.autoGearDraftWarningConfirm
          || texts.en?.autoGearDraftWarningConfirm
          || 'Save anyway? Review the impact warnings below before confirming.';
        const details = warningMessages.map(message => `• ${message}`).join('\n');
        const confirmMessage = `${confirmBase}\n\n${details}`;

        if (typeof window.cineShowConfirmDialog === 'function') {
          window.cineShowConfirmDialog({
            title: langTexts.autoGearDraftWarningTitle || 'Save with Warnings',
            message: confirmMessage, // Note: dialog might not render newlines well unless it uses white-space: pre-wrap
            confirmLabel: langTexts.saveAnyway || 'Save Anyway',
            cancelLabel: langTexts.cancel || 'Cancel',
            danger: true,
            onConfirm: performSave,
          });
          return;
        }

        // Confirm fallback removed.
      }

      performSave();
    }

    function duplicateAutoGearRule(ruleId, ruleIndex) {
      const rules = getAutoGearRules();
      let original = null;
      if (ruleId) {
        original = rules.find(rule => rule && rule.id === ruleId) || null;
      }
      if (!original && ruleIndex !== null && ruleIndex !== undefined) {
        const parsedIndex = typeof ruleIndex === 'number'
          ? ruleIndex
          : Number.parseInt(ruleIndex, 10);
        if (Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < rules.length) {
          original = rules[parsedIndex] || null;
        }
      }
      if (!original) return;

      const langTexts = texts[currentLang] || texts.en || {};
      const suffixBase = typeof langTexts.autoGearDuplicateSuffix === 'string'
        ? langTexts.autoGearDuplicateSuffix.trim()
        : '';
      const fallbackSuffix = typeof texts.en?.autoGearDuplicateSuffix === 'string'
        ? texts.en.autoGearDuplicateSuffix.trim()
        : '';
      const suffix = suffixBase || fallbackSuffix || 'Copy';
      const baseLabel = typeof original.label === 'string' ? original.label.trim() : '';
      const existingLabels = new Set(
        rules
          .map(rule => (typeof rule?.label === 'string' ? rule.label.trim().toLowerCase() : ''))
          .filter(Boolean)
      );

      const formatCandidate = index => {
        if (baseLabel) {
          return index === 1
            ? `${baseLabel} (${suffix})`
            : `${baseLabel} (${suffix} ${index})`;
        }
        return index === 1 ? suffix : `${suffix} ${index}`;
      };

      let attempt = 1;
      let labelCandidate = formatCandidate(attempt);
      while (existingLabels.has(labelCandidate.trim().toLowerCase())) {
        attempt += 1;
        labelCandidate = formatCandidate(attempt);
      }

      const duplicateRule = {
        id: generateAutoGearId('rule'),
        label: labelCandidate,
        scenarioLogic: normalizeAutoGearScenarioLogic(original.scenarioLogic),
        scenarioPrimary: normalizeAutoGearScenarioPrimary(original.scenarioPrimary),
        scenarioMultiplier: normalizeAutoGearScenarioMultiplier(original.scenarioMultiplier),
        scenarios: Array.isArray(original.scenarios) ? original.scenarios.slice() : [],
        mattebox: Array.isArray(original.mattebox) ? original.mattebox.slice() : [],
        cameraHandle: Array.isArray(original.cameraHandle) ? original.cameraHandle.slice() : [],
        viewfinderExtension: Array.isArray(original.viewfinderExtension)
          ? original.viewfinderExtension.slice()
          : [],
        videoDistribution: Array.isArray(original.videoDistribution)
          ? original.videoDistribution.slice()
          : [],
        camera: Array.isArray(original.camera) ? original.camera.slice() : [],
        cameraWeight: normalizeAutoGearCameraWeightCondition(original.cameraWeight),
        monitor: Array.isArray(original.monitor) ? original.monitor.slice() : [],
        wireless: Array.isArray(original.wireless) ? original.wireless.slice() : [],
        motors: Array.isArray(original.motors) ? original.motors.slice() : [],
        controllers: Array.isArray(original.controllers) ? original.controllers.slice() : [],
        distance: Array.isArray(original.distance) ? original.distance.slice() : [],
        shootingDays: normalizeAutoGearShootingDaysCondition(original.shootingDays),
        add: Array.isArray(original.add)
          ? original.add.map(item => ({ ...item, id: generateAutoGearId('item') }))
          : [],
        remove: Array.isArray(original.remove)
          ? original.remove.map(item => ({ ...item, id: generateAutoGearId('item') }))
          : [],
      };

      openAutoGearEditor(null, { initialDraft: duplicateRule, highlightLabel: true });
    }

    function setAutoGearRuleEnabled(ruleId, enabled, ruleIndex) {
      const rules = getAutoGearRules();
      let index = -1;
      if (ruleId) {
        index = rules.findIndex(rule => rule && rule.id === ruleId);
      }
      if (index < 0 && ruleIndex !== null && ruleIndex !== undefined) {
        const parsedIndex = typeof ruleIndex === 'number'
          ? ruleIndex
          : Number.parseInt(ruleIndex, 10);
        if (Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < rules.length) {
          index = parsedIndex;
        }
      }
      if (index < 0) return false;
      const normalizedEnabled = enabled !== false;
      const updatedRule = normalizeAutoGearRule({ ...rules[index], enabled: normalizedEnabled });
      if (!updatedRule) return false;
      const nextRules = rules.slice();
      nextRules[index] = updatedRule;
      setAutoGearRules(nextRules);
      updateAutoGearCatalogOptions();
      renderAutoGearRulesList();
      if (typeof refreshGearListIfVisible === 'function') {
        refreshGearListIfVisible();
      }
      if (autoGearEditorDraft && autoGearEditorDraft.id === updatedRule.id) {
        autoGearEditorDraft.enabled = normalizedEnabled;
      }
      return normalizedEnabled;
    }

    function deleteAutoGearRule(ruleId, ruleIndex) {
      const rules = getAutoGearRules();
      let index = -1;
      if (ruleId) {
        index = rules.findIndex(rule => rule && rule.id === ruleId);
      }
      if (index < 0 && ruleIndex !== null && ruleIndex !== undefined) {
        const parsedIndex = typeof ruleIndex === 'number'
          ? ruleIndex
          : Number.parseInt(ruleIndex, 10);
        if (Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < rules.length) {
          index = parsedIndex;
        }
      }
      if (index < 0) return;
      const confirmation = texts[currentLang]?.autoGearDeleteConfirm
        || texts.en?.autoGearDeleteConfirm
        || 'Delete this rule?';
      const performRuleDelete = () => {
        const backupName = ensureAutoBackupBeforeDeletion('delete automatic gear rule');
        if (!backupName) return;
        rules.splice(index, 1);
        setAutoGearRules(rules);
        updateAutoGearCatalogOptions();
        renderAutoGearRulesList();
        if (autoGearEditorDraft && autoGearEditorDraft.id === ruleId) {
          closeAutoGearEditor();
        }
      };

      if (typeof window.cineShowConfirmDialog === 'function') {
        window.cineShowConfirmDialog({
          title: texts[currentLang]?.autoGearDeleteTitle || 'Delete Rule',
          message: confirmation,
          confirmLabel: texts[currentLang]?.delete || 'Delete',
          cancelLabel: texts[currentLang]?.cancel || 'Cancel',
          danger: true,
          onConfirm: performRuleDelete,
        });
        return;
      }

      console.warn('Missing window.cineShowConfirmDialog for deleteAutoGearRule');
    }

    function normalizeAutoGearPayloadMetadata(candidate) {
      if (!candidate || typeof candidate !== 'object') return null;
      const metadata = {};

      const assignIfString = (key, value) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
          metadata[key] = trimmed;
        }
      };

      assignIfString('type', candidate.type);
      assignIfString('version', candidate.version);

      const timestampFields = [
        ['createdAt', 'createdAt'],
        ['created_at', 'createdAt'],
        ['created', 'createdAt'],
        ['timestamp', 'timestamp'],
        ['exportedAt', 'exportedAt'],
        ['exported_at', 'exportedAt'],
        ['savedAt', 'savedAt'],
        ['saved_at', 'savedAt'],
        ['updatedAt', 'updatedAt'],
        ['updated_at', 'updatedAt'],
        ['modifiedAt', 'updatedAt'],
        ['modified_at', 'updatedAt'],
      ];

      timestampFields.forEach(([prop, target]) => {
        if (metadata[target]) return;
        assignIfString(target, candidate[prop]);
      });

      if (!metadata.timestamp) {
        const orderedKeys = ['createdAt', 'timestamp', 'exportedAt', 'savedAt', 'updatedAt'];
        for (let i = 0; i < orderedKeys.length; i += 1) {
          const key = orderedKeys[i];
          if (metadata[key]) {
            metadata.timestamp = metadata[key];
            metadata.timestampSource = key;
            break;
          }
        }
      }

      if (metadata.timestamp && !metadata.timestampSource) {
        metadata.timestampSource = 'timestamp';
      }

      return Object.keys(metadata).length ? metadata : null;
    }

    function collectAutoGearPayloadMetadata(...sources) {
      const queue = [];
      const visited = new Set();
      const metadata = {};

      const enqueue = value => {
        if (!value || typeof value !== 'object') return;
        if (visited.has(value)) return;
        visited.add(value);
        queue.push(value);
      };

      sources.forEach(source => enqueue(source));

      while (queue.length) {
        const candidate = queue.shift();
        const normalized = normalizeAutoGearPayloadMetadata(candidate);
        if (normalized) {
          ['type', 'version', 'createdAt', 'exportedAt', 'savedAt', 'updatedAt', 'timestamp', 'timestampSource'].forEach(key => {
            if (!normalized[key]) return;
            if (!Object.prototype.hasOwnProperty.call(metadata, key) || !metadata[key]) {
              metadata[key] = normalized[key];
            }
          });
        }

        if (candidate.meta && typeof candidate.meta === 'object') {
          enqueue(candidate.meta);
        }
        if (candidate.metadata && typeof candidate.metadata === 'object') {
          enqueue(candidate.metadata);
        }
      }

      return Object.keys(metadata).length ? metadata : null;
    }

    function parseAutoGearImportPayload(data) {
      const extractMonitorDefaults = source => {
        if (!source || typeof source !== 'object') return null;
        if (source.monitorDefaults && typeof source.monitorDefaults === 'object') {
          return source.monitorDefaults;
        }
        if (source.autoGearMonitorDefaults && typeof source.autoGearMonitorDefaults === 'object') {
          return source.autoGearMonitorDefaults;
        }
        return null;
      };

      const resolveValue = value => {
        if (typeof value !== 'string') return value;
        const trimmed = value.trim();
        if (!trimmed) return value;
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed === value) return parsed;
          return resolveValue(parsed);
        } catch {
          return value;
        }
      };

      const visited = new Set();
      const queue = [];

      const enqueue = (rawValue, parent, root, key) => {
        const value = resolveValue(rawValue);
        if (!value || typeof value !== 'object') {
          return;
        }
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
        queue.push({
          value,
          parent: parent && typeof parent === 'object' ? parent : null,
          root: root && typeof root === 'object' ? root : null,
          key: typeof key === 'string' ? key : '',
        });
      };

      const initialValue = resolveValue(data);
      if (Array.isArray(initialValue)) {
        const metadata = collectAutoGearPayloadMetadata(initialValue);
        return { rules: initialValue, monitorDefaults: null, metadata };
      }
      if (!initialValue || typeof initialValue !== 'object') {
        return null;
      }

      const initialRoot = !Array.isArray(initialValue) ? initialValue : null;
      enqueue(initialValue, null, initialRoot, '');

      while (queue.length) {
        const { value, parent, root, key } = queue.shift();
        const baseRoot = root || (value && typeof value === 'object' && !Array.isArray(value) ? value : null);

        if (Array.isArray(value)) {
          const treatAsRules = !parent || key === 'rules' || key === 'autoGearRules';
          if (treatAsRules) {
            const monitorDefaults = (parent ? extractMonitorDefaults(parent) : null)
              || (root ? extractMonitorDefaults(root) : null)
              || null;
            const metadata = collectAutoGearPayloadMetadata(
              parent,
              value,
              root,
              baseRoot,
            );
            return { rules: value, monitorDefaults, metadata };
          }
          value.forEach(item => {
            if (item && typeof item === 'object') {
              enqueue(item, parent, baseRoot, '');
            }
          });
          continue;
        }

        if (!value || typeof value !== 'object') {
          continue;
        }

        const monitorDefaultsFromValue = extractMonitorDefaults(value);
        const monitorDefaultsFromParent = parent ? extractMonitorDefaults(parent) : null;
        const monitorDefaultsFromRoot = root ? extractMonitorDefaults(root) : null;
        const fallbackDefaults = monitorDefaultsFromValue
          || monitorDefaultsFromParent
          || monitorDefaultsFromRoot
          || null;

        const rawAutoGearRules = Object.prototype.hasOwnProperty.call(value, 'autoGearRules')
          ? resolveValue(value.autoGearRules)
          : null;
        if (Array.isArray(rawAutoGearRules)) {
          const metadata = collectAutoGearPayloadMetadata(
            value,
            parent,
            root,
            baseRoot,
          );
          return { rules: rawAutoGearRules, monitorDefaults: fallbackDefaults, metadata };
        }

        const rawRules = Object.prototype.hasOwnProperty.call(value, 'rules')
          ? resolveValue(value.rules)
          : null;
        if (Array.isArray(rawRules)) {
          const metadata = collectAutoGearPayloadMetadata(
            value,
            parent,
            root,
            baseRoot,
          );
          return { rules: rawRules, monitorDefaults: fallbackDefaults, metadata };
        }
        if (rawRules && typeof rawRules === 'object') {
          const nestedAutoGearRules = Object.prototype.hasOwnProperty.call(rawRules, 'autoGearRules')
            ? resolveValue(rawRules.autoGearRules)
            : null;
          if (Array.isArray(nestedAutoGearRules)) {
            const nestedDefaults = extractMonitorDefaults(rawRules) || fallbackDefaults;
            const metadata = collectAutoGearPayloadMetadata(
              rawRules,
              value,
              parent,
              root,
              baseRoot,
            );
            return {
              rules: nestedAutoGearRules,
              monitorDefaults: nestedDefaults,
              metadata,
            };
          }
        }

        const containerEntries = [
          { value: value.data, key: 'data' },
          { value: value.payload, key: 'payload' },
          { value: value.bundle, key: 'bundle' },
          { value: value.project, key: 'project' },
          { value: value.config, key: 'config' },
          { value: value.settings, key: 'settings' },
          { value: value.content, key: 'content' },
          { value: value.body, key: 'body' },
          { value: value.autoGear, key: 'autoGear' },
          { value: value.rules, key: 'rules' },
          { value: value.autoGearRules, key: 'autoGearRules' },
          { value: value.meta, key: 'meta' },
          { value: value.metadata, key: 'metadata' },
        ];
        containerEntries.forEach(entry => {
          if (!entry.value) return;
          enqueue(entry.value, value, baseRoot, entry.key);
        });

        Object.keys(value).forEach(prop => {
          if (!Object.prototype.hasOwnProperty.call(value, prop)) return;
          if (prop === 'monitorDefaults' || prop === 'autoGearMonitorDefaults') return;
          if (prop === 'rules' || prop === 'autoGearRules') return;
          const child = value[prop];
          if (!child || typeof child === 'function') return;
          if (typeof child === 'object') {
            enqueue(child, value, baseRoot, prop);
          } else if (typeof child === 'string') {
            const resolvedChild = resolveValue(child);
            if (resolvedChild && resolvedChild !== child && typeof resolvedChild === 'object') {
              enqueue(resolvedChild, value, baseRoot, prop);
            }
          }
        });
      }

      return null;
    }

    function parseSemanticVersion(version) {
      if (typeof version !== 'string') return null;
      const trimmed = version.trim();
      if (!trimmed) return null;
      const match = trimmed.match(/^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/);
      if (!match) return null;
      return {
        major: Number.parseInt(match[1], 10),
        minor: Number.parseInt(match[2], 10),
        patch: Number.parseInt(match[3], 10),
        raw: trimmed,
      };
    }

    function compareSemanticVersions(a, b) {
      if (!a || !b) return null;
      if (a.major !== b.major) {
        return a.major > b.major ? 1 : -1;
      }
      if (a.minor !== b.minor) {
        return a.minor > b.minor ? 1 : -1;
      }
      if (a.patch !== b.patch) {
        return a.patch > b.patch ? 1 : -1;
      }
      return 0;
    }

    function isValidIsoTimestamp(value) {
      if (typeof value !== 'string') return false;
      const trimmed = value.trim();
      if (!trimmed) return false;
      const parsed = Date.parse(trimmed);
      if (Number.isNaN(parsed)) return false;
      return Number.isFinite(parsed);
    }

    function validateAutoGearImportPayload(parsed) {
      const initialMetadata = parsed?.metadata && typeof parsed.metadata === 'object'
        ? { ...parsed.metadata }
        : {};
      const validation = {
        metadata: initialMetadata,
        warnings: [],
        errors: [],
      };

      if (!parsed || !Array.isArray(parsed.rules)) {
        validation.errors.push({ code: 'invalid-rules' });
        return validation;
      }

      const metadata = validation.metadata;
      const expectedType = 'camera-power-planner/auto-gear-rules';
      const typeValue = typeof metadata.type === 'string' ? metadata.type.trim() : '';
      if (!typeValue) {
        validation.warnings.push({ code: 'missing-metadata', field: 'type' });
      } else if (typeValue !== expectedType) {
        validation.errors.push({ code: 'type-mismatch', expected: expectedType, actual: typeValue });
      } else {
        metadata.type = typeValue;
      }

      let versionValue = '';
      if (typeof metadata.version === 'string') {
        versionValue = metadata.version.trim();
        if (!versionValue) {
          validation.warnings.push({ code: 'missing-metadata', field: 'version' });
        }
      } else if (metadata.version != null) {
        validation.warnings.push({ code: 'invalid-metadata', field: 'version' });
      } else {
        validation.warnings.push({ code: 'missing-metadata', field: 'version' });
      }

      const parsedVersion = parseSemanticVersion(versionValue);
      if (versionValue && !parsedVersion) {
        validation.warnings.push({ code: 'invalid-version-format', value: versionValue });
      }
      metadata.version = versionValue;

      const timestampValue = typeof metadata.timestamp === 'string' ? metadata.timestamp.trim() : '';
      if (!timestampValue) {
        validation.warnings.push({ code: 'missing-metadata', field: 'timestamp' });
      } else if (!isValidIsoTimestamp(timestampValue)) {
        validation.warnings.push({ code: 'invalid-timestamp', value: timestampValue });
      }
      metadata.timestamp = timestampValue;

      const localVersion = typeof APP_VERSION === 'string' ? parseSemanticVersion(APP_VERSION) : null;
      if (parsedVersion && localVersion) {
        const comparison = compareSemanticVersions(parsedVersion, localVersion);
        if (comparison > 0) {
          validation.warnings.push({
            code: 'newer-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw,
          });
        } else if (comparison < 0) {
          validation.warnings.push({
            code: 'older-version',
            importedVersion: parsedVersion.raw,
            currentVersion: localVersion.raw,
          });
        }
      }

      if (!metadata.type && !metadata.version && !metadata.timestamp) {
        validation.metadata = null;
      }

      return validation;
    }

    function getAutoGearImportMetadataFieldLabel(field) {
      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');
      const key = field === 'timestamp'
        ? 'autoGearImportMetadataLabelTimestamp'
        : field === 'version'
          ? 'autoGearImportMetadataLabelVersion'
          : 'autoGearImportMetadataLabelType';
      return localeTexts?.[key]
        || englishTexts?.[key]
        || field;
    }

    function formatAutoGearImportWarningMessage(warning, metadata) {
      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');

      switch (warning.code) {
        case 'newer-version': {
          const template = localeTexts?.autoGearImportNewerVersionWarning
            || englishTexts?.autoGearImportNewerVersionWarning
            || 'Imported rules were created with version {importVersion}, which is newer than this build ({appVersion}).';
          return template
            .replace('{importVersion}', warning.importedVersion || metadata?.version || '')
            .replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
        }
        case 'older-version': {
          const template = localeTexts?.autoGearImportOlderVersionWarning
            || englishTexts?.autoGearImportOlderVersionWarning
            || 'Imported rules were created with version {importVersion}, which is older than this build ({appVersion}).';
          return template
            .replace('{importVersion}', warning.importedVersion || metadata?.version || '')
            .replace('{appVersion}', warning.currentVersion || APP_VERSION || '');
        }
        case 'invalid-version-format': {
          const template = localeTexts?.autoGearImportInvalidVersionWarning
            || englishTexts?.autoGearImportInvalidVersionWarning
            || 'Imported rules report version "{value}", which is not a valid semantic version string.';
          return template.replace('{value}', warning.value || metadata?.version || '');
        }
        case 'invalid-timestamp': {
          const template = localeTexts?.autoGearImportInvalidTimestampWarning
            || englishTexts?.autoGearImportInvalidTimestampWarning
            || 'The import timestamp "{value}" could not be verified.';
          return template.replace('{value}', warning.value || metadata?.timestamp || '');
        }
        default:
          return '';
      }
    }

    function displayAutoGearImportWarnings(warnings, metadata) {
      if (!Array.isArray(warnings) || !warnings.length) return;
      const missingFields = [];
      const invalidFields = [];

      warnings.forEach(warning => {
        if (!warning || typeof warning !== 'object') return;
        if (warning.code === 'missing-metadata' && warning.field) {
          if (!missingFields.includes(warning.field)) {
            missingFields.push(warning.field);
          }
        } else if (warning.code === 'invalid-metadata' && warning.field) {
          if (!invalidFields.includes(warning.field)) {
            invalidFields.push(warning.field);
          }
        } else {
          const message = formatAutoGearImportWarningMessage(warning, metadata);
          if (message) {
            showNotification('warning', message);
          }
        }
      });

      const localeTexts = getLanguageTexts(currentLang);
      const englishTexts = getLanguageTexts('en');

      if (missingFields.length) {
        const labels = missingFields.map(field => getAutoGearImportMetadataFieldLabel(field));
        const labelList = formatListForLang(currentLang, labels);
        const template = localeTexts?.autoGearImportMissingMetadataWarning
          || englishTexts?.autoGearImportMissingMetadataWarning
          || 'Imported rules are missing required metadata: {fields}.';
        showNotification('warning', template.replace('{fields}', labelList));
      }

      if (invalidFields.length) {
        const labels = invalidFields.map(field => getAutoGearImportMetadataFieldLabel(field));
        const labelList = formatListForLang(currentLang, labels);
        const template = localeTexts?.autoGearImportInvalidMetadataWarning
          || englishTexts?.autoGearImportInvalidMetadataWarning
          || 'Imported rules include invalid metadata: {fields}.';
        showNotification('warning', template.replace('{fields}', labelList));
      }
    }

    function importAutoGearRulesFromData(data, options = {}) {
      const previousRules = getAutoGearRules();
      const previousMonitorDefaults = getAutoGearMonitorDefaultsSnapshot();
      const parsed = parseAutoGearImportPayload(data);
      if (!parsed || !Array.isArray(parsed.rules)) {
        const error = new Error('Invalid automatic gear rules import payload');
        error.userMessage = texts[currentLang]?.autoGearImportSchemaError
          || texts.en?.autoGearImportSchemaError
          || 'Import failed. The file does not match the automatic gear rules export format.';
        error.validationWarnings = [];
        error.validationMetadata = null;
        throw error;
      }

      const validation = validateAutoGearImportPayload(parsed);
      if (validation.errors.length) {
        const message = texts[currentLang]?.autoGearImportSchemaError
          || texts.en?.autoGearImportSchemaError
          || 'Import failed. The file does not match the automatic gear rules export format.';
        const error = new Error(message);
        error.userMessage = message;
        error.validationErrors = validation.errors;
        error.validationWarnings = validation.warnings;
        error.validationMetadata = validation.metadata;
        throw error;
      }

      try {
        setAutoGearRules(parsed.rules);
        if (parsed.monitorDefaults && typeof parsed.monitorDefaults === 'object') {
          setAutoGearMonitorDefaults(parsed.monitorDefaults);
        } else {
          updateAutoGearMonitorDefaultOptions();
          renderAutoGearMonitorDefaultsControls();
        }
        closeAutoGearEditor();
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
      } catch (error) {
        setAutoGearRules(previousRules);
        setAutoGearMonitorDefaults(previousMonitorDefaults, { skipRender: true, skipRefresh: true });
        renderAutoGearRulesList();
        updateAutoGearCatalogOptions();
        renderAutoGearMonitorDefaultsControls();
        if (typeof refreshGearListIfVisible === 'function') {
          refreshGearListIfVisible();
        }
        throw error;
      }

      if (!options.silent) {
        const message = texts[currentLang]?.autoGearImportSuccess
          || texts.en?.autoGearImportSuccess
          || 'Automatic gear rules imported.';
        showNotification('success', message);
      }

      displayAutoGearImportWarnings(validation.warnings, validation.metadata);
      return getAutoGearRules();
    }

    function formatAutoGearExportFilename(date) {
      const { iso } = formatFullBackupFilename(date);
      const safeIso = iso.replace(/[:]/g, '-');
      return `${safeIso} auto gear rules.json`;
    }

    function exportAutoGearRules() {
      if (typeof document === 'undefined') return null;
      try {
        const rules = getBaseAutoGearRules();
        const monitorDefaults = getAutoGearMonitorDefaultsSnapshot();
        const coverage = getAutoGearRuleCoverageSummary({ rules });
        const payload = {
          type: 'camera-power-planner/auto-gear-rules',
          version: APP_VERSION,
          createdAt: new Date().toISOString(),
          rules,
          monitorDefaults,
        };
        if (coverage) {
          payload.coverage = coverage;
        }
        const json = JSON.stringify(payload, null, 2);
        if (typeof Blob !== 'function' || !URL || typeof URL.createObjectURL !== 'function') {
          throw new Error('Blob or URL APIs unavailable');
        }
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        const fileName = formatAutoGearExportFilename(new Date());
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        if (typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(url);
        }
        const message = texts[currentLang]?.autoGearExportSuccess
          || texts.en?.autoGearExportSuccess
          || 'Automatic gear rules downloaded.';
        showNotification('success', message);
        return fileName;
      } catch (error) {
        console.warn('Automatic gear rules export failed', error);
        const message = texts[currentLang]?.autoGearExportError
          || texts.en?.autoGearExportError
          || 'Automatic gear rules export failed.';
        showNotification('error', message);
        return null;
      }
    }

    function formatAutoGearPresetExportFilename(date) {
      const { iso } = formatFullBackupFilename(date);
      const safeIso = iso.replace(/[:]/g, '-');
      return `${safeIso} auto gear presets.json`;
    }

    function normalizeAutoGearPresetForExport(preset) {
      if (!preset || typeof preset !== 'object') {
        return null;
      }

      const label = typeof preset.label === 'string' ? preset.label : '';
      if (!label) {
        return null;
      }

      const id = typeof preset.id === 'string' && preset.id ? preset.id : generateAutoGearId('preset');
      const sourceRules = Array.isArray(preset.rules) ? preset.rules : [];
      let rules = [];

      if (sourceRules.length === 0) {
        rules = [];
      } else {
        try {
          rules = JSON.parse(JSON.stringify(sourceRules));
        } catch (cloneError) {
          void cloneError;
          rules = sourceRules.map((entry) => {
            if (!entry || typeof entry !== 'object') {
              return entry;
            }
            return { ...entry };
          });
        }
      }

      const fingerprint = typeof preset.fingerprint === 'string' && preset.fingerprint
        ? preset.fingerprint
        : createAutoGearRulesFingerprint(rules);

      return { id, label, rules, fingerprint };
    }

    function exportAutoGearPresets(options = {}) {
      const config = typeof options === 'object' && options !== null ? options : {};
      const notifySuccess = config.notifySuccess !== false;
      const notifyFailure = config.notifyFailure !== false;

      const presetSource = Array.isArray(autoGearPresets) ? autoGearPresets : [];
      const presets = presetSource
        .map(normalizeAutoGearPresetForExport)
        .filter(Boolean);

      if (!presets.length) {
        return { status: 'skipped', reason: 'empty' };
      }

      if (typeof document === 'undefined'
        || typeof Blob !== 'function'
        || !URL
        || typeof URL.createObjectURL !== 'function') {
        if (notifyFailure) {
          const message = texts[currentLang]?.autoGearPresetExportError
            || texts.en?.autoGearPresetExportError
            || 'Automatic gear preset export failed.';
          showNotification('error', message);
        }
        return { status: 'failed', reason: 'unsupported' };
      }

      try {
        const payload = {
          type: 'camera-power-planner/auto-gear-presets',
          version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
          createdAt: new Date().toISOString(),
          presets,
          activePresetId: typeof activeAutoGearPresetId === 'string' ? activeAutoGearPresetId : '',
          autoPresetId: typeof autoGearAutoPresetIdState === 'string' ? autoGearAutoPresetIdState : '',
        };

        const json = JSON.stringify(payload, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        const fileName = formatAutoGearPresetExportFilename(new Date());
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        if (typeof URL.revokeObjectURL === 'function') {
          URL.revokeObjectURL(url);
        }

        if (notifySuccess) {
          const message = texts[currentLang]?.autoGearPresetExportSuccess
            || texts.en?.autoGearPresetExportSuccess
            || 'Automatic gear presets downloaded.';
          showNotification('success', message);
        }

        return { status: 'exported', fileName };
      } catch (error) {
        console.warn('Automatic gear preset export failed', error);
        if (notifyFailure) {
          const message = texts[currentLang]?.autoGearPresetExportError
            || texts.en?.autoGearPresetExportError
            || 'Automatic gear preset export failed.';
          showNotification('error', message);
        }
        return { status: 'failed', reason: 'error', error };
      }
    }

    function captureAutoGearBackupSnapshot(options = {}) {
      const config = typeof options === 'object' && options !== null ? options : {};
      const force = config.force === true;
      const notifySuccess = config.notifySuccess !== false;
      const notifyFailure = config.notifyFailure !== false;
      const note = typeof config.note === 'string' ? config.note.trim() : '';

      if (!force && !autoGearRulesDirtySinceBackup) {
        return { status: 'skipped', reason: 'clean' };
      }

      const rules = getBaseAutoGearRules();
      const monitorDefaultsSnapshot = getAutoGearMonitorDefaultsSnapshot();
      const signature = getAutoGearConfigurationSignature(rules, monitorDefaultsSnapshot);

      if (!force && signature === autoGearRulesLastBackupSignature) {
        autoGearRulesDirtySinceBackup = false;
        return { status: 'skipped', reason: 'unchanged' };
      }

      const entry = {
        id: generateAutoGearId('backup'),
        createdAt: new Date().toISOString(),
        rules,
        monitorDefaults: monitorDefaultsSnapshot,
      };
      if (note) {
        entry.note = note;
      }

      const retentionLimit = clampAutoGearBackupRetentionLimit(autoGearBackupRetention);
      const effectiveLimit = Math.max(1, retentionLimit);
      const updatedBackups = [entry, ...autoGearBackups].slice(0, effectiveLimit);

      try {
        const persistedBackups = persistAutoGearBackups(updatedBackups) || [];
        const finalBackups = Array.isArray(persistedBackups) ? persistedBackups : [];
        autoGearBackups = finalBackups;
        const persistedEntry = finalBackups[0] || entry;
        const persistedSignature = finalBackups.length
          ? getAutoGearConfigurationSignature(
            finalBackups[0].rules,
            finalBackups[0].monitorDefaults,
          )
          : signature;
        autoGearRulesLastBackupSignature = persistedSignature;
        autoGearRulesLastPersistedSignature = persistedSignature;
        autoGearRulesDirtySinceBackup = false;
        renderAutoGearBackupControls();
        renderAutoGearBackupRetentionControls();
        if (notifySuccess) {
          const message = texts[currentLang]?.autoGearBackupSaved
            || texts.en?.autoGearBackupSaved
            || 'Automatic gear backup saved.';
          showNotification('success', message);
        }
        return { status: 'created', entry: persistedEntry };
      } catch (error) {
        console.warn('Automatic gear backup failed', error);
        autoGearRulesDirtySinceBackup = true;
        if (notifyFailure) {
          const message = texts[currentLang]?.autoGearBackupFailed
            || texts.en?.autoGearBackupFailed
            || 'Automatic gear backup failed.';
          showNotification('error', message);
        }
        return { status: 'error', error };
      }
    }

    function createAutoGearBackup(options = {}) {
      const result = captureAutoGearBackupSnapshot(options);
      return result.status === 'created';
    }

    function restoreAutoGearBackup(backupId) {
      if (!backupId) return false;
      const backup = autoGearBackups.find(entry => entry.id === backupId);
      if (!backup) return false;
      const confirmation = texts[currentLang]?.autoGearBackupRestoreConfirm
        || texts.en?.autoGearBackupRestoreConfirm
        || 'Replace your automatic gear rules with this backup?';
      const performRestore = () => {
        try {
          setAutoGearRules(Array.isArray(backup.rules) ? backup.rules : []);
          if (backup.monitorDefaults) {
            setAutoGearMonitorDefaults(backup.monitorDefaults, { skipRefresh: true });
          }
          closeAutoGearEditor();
          renderAutoGearRulesList();
          updateAutoGearCatalogOptions();
          renderAutoGearMonitorDefaultsControls();
          if (typeof refreshGearListIfVisible === 'function') {
            refreshGearListIfVisible();
          }
          autoGearRulesLastBackupSignature = getAutoGearConfigurationSignature(backup.rules, backup.monitorDefaults);
          autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
          autoGearRulesDirtySinceBackup = false;
          const message = texts[currentLang]?.autoGearBackupRestoreSuccess
            || texts.en?.autoGearBackupRestoreSuccess
            || 'Automatic gear backup restored.';
          showNotification('success', message);
        } catch (error) {
          console.warn('Failed to restore automatic gear backup', error);
          const message = texts[currentLang]?.autoGearBackupRestoreError
            || texts.en?.autoGearBackupRestoreError
            || 'Automatic gear backup restore failed.';
          showNotification('error', message);
        }
      };

      if (typeof window.cineShowConfirmDialog === 'function') {
        window.cineShowConfirmDialog({
          title: texts[currentLang]?.autoGearBackupRestoreTitle || 'Restore Backup',
          message: confirmation,
          confirmLabel: texts[currentLang]?.restore || 'Restore',
          cancelLabel: texts[currentLang]?.cancel || 'Cancel',
          danger: true,
          onConfirm: performRestore,
        });
        return true;
      }

      console.warn('Missing window.cineShowConfirmDialog for restoreAutoGearBackup');
      return false;
    }

    function handleAutoGearImportSelection(event) {
      const input = event?.target;
      const file = input && input.files && input.files[0];
      if (!file) return;
      const confirmation = texts[currentLang]?.autoGearImportConfirm
        || texts.en?.autoGearImportConfirm
        || 'Replace your automatic gear rules with the imported file?';
      const performImport = () => {
        if (typeof FileReader === 'undefined') {
          const errorMsg = texts[currentLang]?.autoGearImportError
            || texts.en?.autoGearImportError
            || 'Import failed. Please choose a valid automatic gear rules file.';
          showNotification('error', errorMsg);
          if (input) input.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const text = e?.target?.result;
            const parsed = JSON.parse(typeof text === 'string' ? text : '');
            importAutoGearRulesFromData(parsed);
          } catch (error) {
            console.warn('Automatic gear rules import failed', error);
            if (Array.isArray(error?.validationWarnings) && error.validationWarnings.length) {
              displayAutoGearImportWarnings(error.validationWarnings, error.validationMetadata || null);
            }
            const fallbackErrorMsg = texts[currentLang]?.autoGearImportError
              || texts.en?.autoGearImportError
              || 'Import failed. Please choose a valid automatic gear rules file.';
            const errorMsg = typeof error?.userMessage === 'string' && error.userMessage.trim()
              ? error.userMessage
              : fallbackErrorMsg;
            showNotification('error', errorMsg);
          } finally {
            if (input) input.value = '';
          }
        };
        reader.onerror = () => {
          const errorMsg = texts[currentLang]?.autoGearImportError
            || texts.en?.autoGearImportError
            || 'Import failed. Please choose a valid automatic gear rules file.';
          showNotification('error', errorMsg);
          if (input) input.value = '';
        };
        reader.readAsText(file);
      };

      if (typeof window.cineShowConfirmDialog === 'function') {
        window.cineShowConfirmDialog({
          title: texts[currentLang]?.autoGearImportTitle || 'Import Rules',
          message: confirmation,
          confirmLabel: texts[currentLang]?.import || 'Import',
          cancelLabel: texts[currentLang]?.cancel || 'Cancel',
          danger: true,
          onConfirm: performImport,
          onCancel: () => {
            if (input) input.value = '';
          },
        });
        return;
      }

      console.warn('Missing window.cineShowConfirmDialog for handleAutoGearImportSelection');
    }

    let lastActiveBeforeIosHelp = null;
    let lastActiveBeforeInstallGuide = null;
    let currentInstallGuidePlatform = null;

    function createLocalHelpModuleFallback() {
      function fallbackResolveStorageKey(explicitKey) {
        if (typeof explicitKey === 'string' && explicitKey) {
          return explicitKey;
        }
        if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
          return IOS_PWA_HELP_STORAGE_KEY;
        }
        if (
          typeof globalThis !== 'undefined'
          && globalThis
          && typeof globalThis.IOS_PWA_HELP_STORAGE_KEY === 'string'
          && globalThis.IOS_PWA_HELP_STORAGE_KEY
        ) {
          return globalThis.IOS_PWA_HELP_STORAGE_KEY;
        }
        if (
          typeof window !== 'undefined'
          && window
          && typeof window.IOS_PWA_HELP_STORAGE_KEY === 'string'
          && window.IOS_PWA_HELP_STORAGE_KEY
        ) {
          return window.IOS_PWA_HELP_STORAGE_KEY;
        }
        return 'iosPwaHelpShown';
      }

      function fallbackIsIosDevice(navigatorOverride) {
        const nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!nav) {
          return false;
        }
        const ua = nav.userAgent || '';
        const platform = nav.platform || '';
        const hasTouch = typeof nav.maxTouchPoints === 'number' && nav.maxTouchPoints > 1;
        return /iphone|ipad|ipod/i.test(ua) || (platform === 'MacIntel' && hasTouch);
      }

      function fallbackIsAndroidDevice(navigatorOverride) {
        const nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!nav) {
          return false;
        }
        const ua = nav.userAgent || '';
        const vendor = nav.vendor || '';
        return /android/i.test(ua) || /android/i.test(vendor);
      }

      function fallbackIsStandaloneDisplayMode(windowOverride, navigatorOverride) {
        const win = windowOverride || (typeof window !== 'undefined' ? window : null);
        const nav = navigatorOverride || (typeof navigator !== 'undefined' ? navigator : null);
        if (!win) {
          return false;
        }
        if (typeof win.matchMedia === 'function') {
          try {
            if (win.matchMedia('(display-mode: standalone)').matches) {
              return true;
            }
          } catch (error) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
              console.warn('matchMedia display-mode check failed', error);
            }
          }
        }
        if (nav && typeof nav.standalone === 'boolean') {
          return nav.standalone;
        }
        return false;
      }

      function fallbackHasDismissedIosPwaHelp(explicitKey) {
        const storageKey = fallbackResolveStorageKey(explicitKey);
        if (typeof localStorage === 'undefined' || !localStorage || typeof localStorage.getItem !== 'function') {
          return false;
        }
        try {
          return localStorage.getItem(storageKey) === '1';
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Could not read iOS PWA help dismissal flag', error);
          }
          return false;
        }
      }

      function fallbackMarkIosPwaHelpDismissed(explicitKey) {
        const storageKey = fallbackResolveStorageKey(explicitKey);
        if (typeof localStorage === 'undefined' || !localStorage || typeof localStorage.setItem !== 'function') {
          return;
        }
        try {
          localStorage.setItem(storageKey, '1');
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Could not store iOS PWA help dismissal', error);
          }
        }
      }

      function fallbackShouldShow(resolveDialog) {
        const dialog = typeof resolveDialog === 'function' ? resolveDialog() : resolveDialog || null;
        if (!dialog) {
          return false;
        }
        if (!fallbackIsIosDevice()) {
          return false;
        }
        if (!fallbackIsStandaloneDisplayMode()) {
          return false;
        }
        if (fallbackHasDismissedIosPwaHelp()) {
          return false;
        }
        return true;
      }

      return {
        resolveIosPwaHelpStorageKey: fallbackResolveStorageKey,
        isIosDevice: fallbackIsIosDevice,
        isAndroidDevice: fallbackIsAndroidDevice,
        isStandaloneDisplayMode: fallbackIsStandaloneDisplayMode,
        hasDismissedIosPwaHelp: fallbackHasDismissedIosPwaHelp,
        markIosPwaHelpDismissed: fallbackMarkIosPwaHelpDismissed,
        shouldShowIosPwaHelp: fallbackShouldShow,
      };
    }

    const helpModuleApi = (() => {
      if (typeof resolveHelpModuleApi === 'function') {
        try {
          return resolveHelpModuleApi();
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('resolveHelpModuleApi() failed in part 2', error);
          }
        }
      }
      const fallback = createLocalHelpModuleFallback();
      try {
        const globalScope =
          typeof globalThis !== 'undefined'
            ? globalThis
            : typeof window !== 'undefined'
              ? window
              : typeof self !== 'undefined'
                ? self
                : typeof global !== 'undefined'
                  ? global
                  : null;
        if (globalScope && !globalScope.__cineResolvedHelpModule) {
          globalScope.__cineResolvedHelpModule = fallback;
        }
      } catch (error) {
        void error;
      }
      return fallback;
    })();

    const FEATURE_SEARCH_MODULE_CACHE_KEY = '__cineResolvedFeatureSearchModule';

    function createFeatureSearchFallback() {
      return {
        normalizeSearchValue(value) {
          return typeof value === 'string' ? value.trim().toLowerCase() : '';
        },
        sanitizeHighlightTokens(tokens) {
          if (!Array.isArray(tokens) || !tokens.length) {
            return [];
          }

          const sanitized = [];
          for (let index = 0; index < tokens.length; index += 1) {
            const token = tokens[index];
            if (typeof token !== 'string') {
              continue;
            }
            const normalized = token.trim().toLowerCase();
            if (!normalized) {
              continue;
            }
            if (sanitized.indexOf(normalized) === -1) {
              sanitized.push(normalized);
            }
          }

          return sanitized;
        },
        collectHighlightRanges() {
          return [];
        },
        applyHighlight(element, text) {
          if (!element) {
            return;
          }

          const content = typeof text === 'string' ? text : '';
          element.textContent = content;
        },
        normalizeDetail(text) {
          return typeof text === 'string' ? text.trim() : '';
        },
      };
    }

    function resolveFeatureSearchModuleApi() {
      const globalScope = typeof getCoreGlobalObject === 'function'
        ? getCoreGlobalObject()
        : (typeof globalThis !== 'undefined'
          ? globalThis
          : typeof window !== 'undefined'
            ? window
            : typeof self !== 'undefined'
              ? self
              : typeof global !== 'undefined'
                ? global
                : null);

      if (globalScope && globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY]) {
        return globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY];
      }

      const moduleBase =
        (typeof cineModuleBase === 'object' && cineModuleBase)
        || (globalScope && typeof globalScope.cineModuleBase === 'object' ? globalScope.cineModuleBase : null);

      function logModuleWarning(message, error) {
        if (moduleBase && typeof moduleBase.safeWarn === 'function') {
          try {
            moduleBase.safeWarn(message, error);
            return;
          } catch (warnError) {
            void warnError;
          }
        }
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            if (typeof error === 'undefined') {
              console.warn(message);
            } else {
              console.warn(message, error);
            }
          } catch (consoleError) {
            void consoleError;
          }
        }
      }

      const candidates = [];

      if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
        let registry = null;
        try {
          registry = moduleBase.getModuleRegistry(globalScope);
        } catch (error) {
          logModuleWarning('Unable to resolve cine.features.featureSearch module registry.', error);
        }
        if (registry && typeof registry.get === 'function') {
          try {
            const fromRegistry = registry.get('cine.features.featureSearch');
            if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
              candidates.push(fromRegistry);
            }
          } catch (error) {
            logModuleWarning('Unable to read cine.features.featureSearch module.', error);
          }
        }
      }

      const scopeCandidates = [];
      if (globalScope && scopeCandidates.indexOf(globalScope) === -1) {
        scopeCandidates.push(globalScope);
      }
      if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) {
        scopeCandidates.push(globalThis);
      }
      if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) {
        scopeCandidates.push(window);
      }
      if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) {
        scopeCandidates.push(self);
      }
      if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) {
        scopeCandidates.push(global);
      }

      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }

        try {
          const exposed = scope.cineFeaturesFeatureSearch;
          if (exposed && candidates.indexOf(exposed) === -1) {
            candidates.push(exposed);
          }
        } catch (error) {
          void error;
        }
      }

      let resolvedApi = null;
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (
          candidate
          && typeof candidate === 'object'
          && typeof candidate.normalizeSearchValue === 'function'
        ) {
          resolvedApi = candidate;
          break;
        }
      }

      const api = resolvedApi || createFeatureSearchFallback();

      if (globalScope) {
        try {
          globalScope[FEATURE_SEARCH_MODULE_CACHE_KEY] = api;
        } catch (error) {
          void error;
        }
      }

      return api;
    }

    const featureSearchModuleApi = resolveFeatureSearchModuleApi();
    const fallbackFeatureSearchModuleApi = createFeatureSearchFallback();

    function isIosDevice() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isIosDevice === 'function') {
          return Boolean(helpModuleApi.isIosDevice());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isIosDevice() failed', error);
        }
      }
      return false;
    }

    function isAndroidDevice() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isAndroidDevice === 'function') {
          return Boolean(helpModuleApi.isAndroidDevice());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isAndroidDevice() failed', error);
        }
      }
      return false;
    }

    function isStandaloneDisplayMode() {
      try {
        if (helpModuleApi && typeof helpModuleApi.isStandaloneDisplayMode === 'function') {
          return Boolean(helpModuleApi.isStandaloneDisplayMode());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('isStandaloneDisplayMode() failed', error);
        }
      }
      return false;
    }

    function hasDismissedIosPwaHelp() {
      try {
        if (helpModuleApi && typeof helpModuleApi.hasDismissedIosPwaHelp === 'function') {
          return Boolean(helpModuleApi.hasDismissedIosPwaHelp());
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('hasDismissedIosPwaHelp() failed', error);
        }
      }
      return false;
    }

    function markIosPwaHelpDismissed() {
      try {
        if (helpModuleApi && typeof helpModuleApi.markIosPwaHelpDismissed === 'function') {
          helpModuleApi.markIosPwaHelpDismissed();
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('markIosPwaHelpDismissed() failed', error);
        }
      }
    }

    function getInstallBannerGlobalScope() {
      const candidates = [];
      if (typeof resolveInstallBannerGlobalScope === 'function') {
        try {
          const resolved = resolveInstallBannerGlobalScope();
          if (resolved) {
            candidates.push(resolved);
          }
        } catch (error) {
          console.warn('Failed to resolve shared install banner scope', error);
        }
      }
      const runtimeScopes = getCoreRuntimeScopesSnapshot();
      for (let index = 0; index < runtimeScopes.length; index += 1) {
        const scope = runtimeScopes[index];
        if (scope && typeof scope === 'object') {
          candidates.push(scope);
        }
      }
      if (typeof globalThis !== 'undefined' && globalThis && !candidates.includes(globalThis)) {
        candidates.push(globalThis);
      }
      if (typeof window !== 'undefined' && window && !candidates.includes(window)) {
        candidates.push(window);
      }
      if (typeof self !== 'undefined' && self && !candidates.includes(self)) {
        candidates.push(self);
      }
      if (typeof global !== 'undefined' && global && !candidates.includes(global)) {
        candidates.push(global);
      }
      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      }
      return null;
    }

    function resolveCoreRuntimeFunction(name) {
      if (typeof name !== 'string' || !name) {
        return null;
      }
      for (let index = 0; index < CORE_RUNTIME_SCOPE_CANDIDATES.length; index += 1) {
        const scope = CORE_RUNTIME_SCOPE_CANDIDATES[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }
        try {
          const candidate = scope[name];
          if (typeof candidate === 'function') {
            return candidate;
          }
        } catch (resolveError) {
          void resolveError;
        }
      }
      return null;
    }

    function configureIconOnlyButtonSafe(button, glyph, options = {}) {
      const resolvedConfigurator = resolveCoreRuntimeFunction('configureIconOnlyButton');
      if (typeof resolvedConfigurator === 'function') {
        try {
          resolvedConfigurator(button, glyph, options);
          return;
        } catch (configError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('configureIconOnlyButton failed, applying fallback configuration', configError);
          }
        }
      }

      if (!button) {
        return;
      }

      const resolvedGlyph = glyph || (() => {
        const glyphMap = readCoreScopeValue('ICON_GLYPHS');
        if (glyphMap && typeof glyphMap === 'object' && glyphMap.add) {
          return glyphMap.add;
        }
        return null;
      })();

      const setButtonLabelWithIconFn = resolveCoreRuntimeFunction('setButtonLabelWithIcon');
      if (typeof setButtonLabelWithIconFn === 'function') {
        try {
          setButtonLabelWithIconFn(button, '', resolvedGlyph);
        } catch (labelError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('setButtonLabelWithIcon fallback failed', labelError);
          }
        }
      }

      const {
        contextPaths = [],
        fallbackContext = '',
        actionKey = 'addEntry',
      } = options || {};

      const getLocalizedPathTextFn = resolveCoreRuntimeFunction('getLocalizedPathText');
      const ensureArray = (value) => {
        if (Array.isArray(value)) return value;
        if (value === null || value === undefined) return [];
        return [value];
      };

      let actionLabel = actionKey === 'removeEntry' ? 'Remove' : 'Add';
      if (typeof getLocalizedPathTextFn === 'function') {
        try {
          actionLabel = getLocalizedPathTextFn(
            ['projectForm', actionKey],
            actionKey === 'removeEntry' ? 'Remove' : 'Add',
          );
        } catch (actionLabelError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('getLocalizedPathText failed to resolve action label', actionLabelError);
          }
        }
      }

      let contextLabel = '';
      const contextCandidates = ensureArray(contextPaths);
      if (typeof getLocalizedPathTextFn === 'function') {
        for (let index = 0; index < contextCandidates.length; index += 1) {
          const contextPath = contextCandidates[index];
          if (!contextPath) {
            continue;
          }
          try {
            const resolvedLabel = getLocalizedPathTextFn(contextPath, '');
            if (resolvedLabel) {
              contextLabel = resolvedLabel;
              break;
            }
          } catch (contextLabelError) {
            void contextLabelError;
          }
        }
      }

      if (!contextLabel && typeof fallbackContext === 'string' && fallbackContext) {
        contextLabel = fallbackContext;
      }

      const normalizedContext = contextLabel ? contextLabel.replace(/[:：]\s*$/, '').trim() : '';
      const combinedLabel = [actionLabel, normalizedContext].filter(Boolean).join(' ').trim();
      if (combinedLabel) {
        try {
          button.setAttribute('aria-label', combinedLabel);
          button.setAttribute('title', combinedLabel);
        } catch (attributeError) {
          void attributeError;
        }
      }
    }

    function getInstallBannerDismissedInSession() {
      const scope = getInstallBannerGlobalScope();
      if (!scope) {
        return false;
      }
      if (typeof scope.installBannerDismissedInSession !== 'boolean') {
        scope.installBannerDismissedInSession = false;
        return false;
      }
      return scope.installBannerDismissedInSession;
    }

    function setInstallBannerDismissedInSession(value) {
      const scope = getInstallBannerGlobalScope();
      if (!scope) {
        return;
      }
      scope.installBannerDismissedInSession = Boolean(value);
    }

    function hasDismissedInstallBanner() {
      if (getInstallBannerDismissedInSession()) return true;
      if (typeof localStorage === 'undefined') return false;
      try {
        const storedValue = localStorage.getItem(globalThis.INSTALL_BANNER_DISMISSED_KEY);
        const dismissed = storedValue === '1';
        if (dismissed) {
          setInstallBannerDismissedInSession(true);
        }
        return dismissed;
      } catch (error) {
        console.warn('Could not read install banner dismissal flag', error);
        return getInstallBannerDismissedInSession();
      }
    }

    function markInstallBannerDismissed() {
      setInstallBannerDismissedInSession(true);
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(globalThis.INSTALL_BANNER_DISMISSED_KEY, '1');
      } catch (error) {
        console.warn('Could not store install banner dismissal', error);
      }
    }

    function shouldShowInstallBanner() {
      if (!installPromptBanner) return false;
      if (isStandaloneDisplayMode()) return false;
      if (hasDismissedInstallBanner()) return false;
      return isIosDevice() || isAndroidDevice();
    }

    function updateInstallBannerVisibility() {
      if (!installPromptBanner) return;
      const shouldShow = shouldShowInstallBanner();
      const root = typeof document !== 'undefined' ? document.documentElement : null;
      if (root && typeof root.classList !== 'undefined') {
        root.classList.toggle('install-banner-visible', shouldShow);
      }
      if (shouldShow) {
        installPromptBanner.removeAttribute('hidden');
        updateInstallBannerColors();
        updateInstallBannerPosition();
      } else {
        installPromptBanner.setAttribute('hidden', '');
        setInstallBannerOffset(0);
        installPromptBanner.style.removeProperty('top');
      }
    }

    function updateInstallBannerColors() {
      if (!installPromptBanner) return;
      if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
        return;
      }
      try {
        const root = document.documentElement;
        if (!root) return;
        const computed = window.getComputedStyle(root);
        const accentValue = computed.getPropertyValue('--accent-color').trim();
        if (!accentValue) {
          installPromptBanner.style.removeProperty('--install-banner-text-color');
          return;
        }
        const rgb = parseColorToRgb(accentValue);
        if (!rgb) return;
        const luminance = computeRelativeLuminance(rgb);
        const textColor = luminance > 0.55 ? '#000000' : '#ffffff';
        installPromptBanner.style.setProperty('--install-banner-text-color', textColor);
      } catch (error) {
        console.warn('Unable to update install banner colors', error);
      }
    }

    function renderInstallGuideContent(platform, lang = currentLang) {
      if (!installGuideDialog) return;
      const fallbackTexts = texts.en || {};
      const langTexts = texts[lang] || fallbackTexts;
      const isIos = platform === 'ios';

      const titleKey = isIos ? 'installHelpTitleIos' : 'installHelpTitleAndroid';
      const introKey = isIos ? 'installHelpIntroIos' : 'installHelpIntroAndroid';
      const stepsKey = isIos ? 'installHelpStepsIos' : 'installHelpStepsAndroid';
      const noteKey = isIos ? 'installHelpNoteIos' : 'installHelpNoteAndroid';

      const title = langTexts[titleKey] || fallbackTexts[titleKey] || '';
      if (installGuideTitle) installGuideTitle.textContent = title;

      const intro = langTexts[introKey] || fallbackTexts[introKey] || '';
      if (installGuideIntro) installGuideIntro.textContent = intro;

      const stepsSource = langTexts[stepsKey];
      const fallbackStepsSource = fallbackTexts[stepsKey];
      const toArray = value => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
      };
      const steps = toArray(stepsSource);
      const fallbackSteps = toArray(fallbackStepsSource);
      const effectiveSteps = steps.length ? steps : fallbackSteps;
      if (installGuideSteps) {
        installGuideSteps.textContent = '';
        effectiveSteps.forEach(step => {
          if (!step) return;
          const li = document.createElement('li');
          li.textContent = step;
          installGuideSteps.appendChild(li);
        });
      }

      const note = langTexts[noteKey] || fallbackTexts[noteKey] || '';
      if (installGuideNote) installGuideNote.textContent = note;

      if (installGuideDialog) {
        installGuideDialog.setAttribute('data-platform', platform);
      }

      if (!installGuideMigration || !installGuideMigrationTitle || !installGuideMigrationIntro || !installGuideMigrationSteps || !installGuideMigrationNote) {
        return;
      }

      if (isIos) {
        installGuideMigration.removeAttribute('hidden');
        const migrationTitle = langTexts.installHelpMigrationTitle || fallbackTexts.installHelpMigrationTitle || '';
        installGuideMigrationTitle.textContent = migrationTitle;
        const migrationIntro = langTexts.iosPwaHelpIntro || fallbackTexts.iosPwaHelpIntro || '';
        installGuideMigrationIntro.textContent = migrationIntro;
        const migrationSteps = [
          langTexts.iosPwaHelpStep1 || fallbackTexts.iosPwaHelpStep1,
          langTexts.iosPwaHelpStep2 || fallbackTexts.iosPwaHelpStep2,
          langTexts.iosPwaHelpStep3 || fallbackTexts.iosPwaHelpStep3,
          langTexts.iosPwaHelpStep4 || fallbackTexts.iosPwaHelpStep4,
        ].filter(Boolean);
        installGuideMigrationSteps.textContent = '';
        migrationSteps.forEach(step => {
          const li = document.createElement('li');
          li.textContent = step;
          installGuideMigrationSteps.appendChild(li);
        });
        const migrationNote = langTexts.iosPwaHelpNote || fallbackTexts.iosPwaHelpNote || '';
        installGuideMigrationNote.textContent = migrationNote;
      } else {
        installGuideMigration.setAttribute('hidden', '');
        installGuideMigrationTitle.textContent = '';
        installGuideMigrationIntro.textContent = '';
        installGuideMigrationSteps.textContent = '';
        installGuideMigrationNote.textContent = '';
      }
    }

    function openInstallGuide(platform) {
      if (!installGuideDialog) return;
      currentInstallGuidePlatform = platform;
      lastActiveBeforeInstallGuide = document.activeElement;
      renderInstallGuideContent(platform);
      installGuideDialog.removeAttribute('hidden');
      const focusTarget = installGuideClose || installGuideDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }

    function closeInstallGuide() {
      if (!installGuideDialog) return;
      installGuideDialog.setAttribute('hidden', '');
      currentInstallGuidePlatform = null;
      if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
        lastActiveBeforeInstallGuide.focus();
      }
    }

    function setupInstallBanner() {
      if (!installPromptBanner) return;

      if (installPromptBannerIcon) {
        applyIconGlyph(installPromptBannerIcon, ICON_GLYPHS.installApp);
      }

      if (installPromptBannerAction) {
        installPromptBannerAction.addEventListener('click', event => {
          event.preventDefault();
          const platform = isIosDevice() ? 'ios' : 'android';
          openInstallGuide(platform);
        });
      }

      if (installPromptBannerDismiss) {
        installPromptBannerDismiss.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          markInstallBannerDismissed();
          updateInstallBannerVisibility();
        });
      }

      if (installGuideClose) {
        installGuideClose.addEventListener('click', closeInstallGuide);
      }

      if (installGuideDialog) {
        installGuideDialog.addEventListener('click', event => {
          if (event.target === installGuideDialog) {
            closeInstallGuide();
          }
        });
      }

      applyInstallTexts(currentLang);
      updateInstallBannerColors();
      updateInstallBannerVisibility();
      updateInstallBannerPosition();

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateInstallBannerPosition);
        window.addEventListener('appinstalled', updateInstallBannerVisibility);
        if (typeof window.matchMedia === 'function') {
          try {
            const media = window.matchMedia('(display-mode: standalone)');
            const handleChange = () => updateInstallBannerVisibility();
            if (typeof media.addEventListener === 'function') {
              media.addEventListener('change', handleChange);
            } else if (typeof media.addListener === 'function') {
              media.addListener(handleChange);
            }
          } catch (error) {
            console.warn('matchMedia display-mode listener failed', error);
          }
        }
      }
    }

    function applyInstallTexts(lang) {
      const fallbackTexts = texts.en || {};
      const langTexts = texts[lang] || fallbackTexts;
      const bannerText = langTexts.installBannerText || fallbackTexts.installBannerText;
      if (installPromptBannerText && bannerText) {
        installPromptBannerText.textContent = bannerText;
      }
      if (installPromptBanner) {
        if (bannerText) {
          installPromptBanner.setAttribute('aria-label', bannerText);
          installPromptBanner.setAttribute('title', bannerText);
        } else {
          installPromptBanner.removeAttribute('aria-label');
          installPromptBanner.removeAttribute('title');
        }
      }
      if (installPromptBannerAction) {
        if (bannerText) {
          installPromptBannerAction.setAttribute('aria-label', bannerText);
          installPromptBannerAction.setAttribute('title', bannerText);
        } else {
          installPromptBannerAction.removeAttribute('aria-label');
          installPromptBannerAction.removeAttribute('title');
        }
      }
      const closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose;
      const dismissLabel =
        langTexts.installBannerDismiss ||
        fallbackTexts.installBannerDismiss ||
        closeLabel ||
        '';
      if (installPromptBannerDismiss) {
        const labelText = dismissLabel || '';
        setButtonLabelWithIcon(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
        if (labelText) {
          installPromptBannerDismiss.setAttribute('aria-label', labelText);
          installPromptBannerDismiss.setAttribute('title', labelText);
          const hiddenLabel = document.createElement('span');
          hiddenLabel.className = 'visually-hidden';
          hiddenLabel.textContent = labelText;
          installPromptBannerDismiss.appendChild(hiddenLabel);
        } else {
          installPromptBannerDismiss.removeAttribute('aria-label');
          installPromptBannerDismiss.removeAttribute('title');
        }
      }
      if (installGuideClose && closeLabel) {
        setButtonLabelWithIcon(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
        installGuideClose.setAttribute('aria-label', closeLabel);
        installGuideClose.setAttribute('title', closeLabel);
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
        renderInstallGuideContent(currentInstallGuidePlatform, lang);
      }

      updateInstallBannerPosition();
    }

    function resolveGlobalElement(name, elementId) {
      if (typeof name !== 'string' || !name) {
        return null;
      }

      const assignResolved = element => {
        if (!element || typeof element !== 'object') {
          return null;
        }
        try {
          CORE_PART2_RUNTIME_SCOPE[name] = element;
        } catch (assignError) {
          void assignError;
        }
        return element;
      };

      const globalValue = readGlobalScopeValue(name);
      if (globalValue && typeof globalValue === 'object') {
        const resolved = assignResolved(globalValue);
        if (resolved) {
          return resolved;
        }
      }

      if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
        try {
          const lookupId = typeof elementId === 'string' && elementId ? elementId : name;
          const fallback = document.getElementById(lookupId);
          if (fallback && typeof fallback === 'object') {
            const resolved = assignResolved(fallback);
            if (resolved) {
              return resolved;
            }
          }
        } catch (lookupError) {
          void lookupError;
        }
      }

      return null;
    }

    function resolveIosPwaHelpDialog() {
      return resolveGlobalElement('iosPwaHelpDialog', 'iosPwaHelpDialog');
    }

    function resolveIosPwaHelpClose() {
      return resolveGlobalElement('iosPwaHelpClose', 'iosPwaHelpClose');
    }

    const safeExposeCoreRuntimeConstant =
      typeof exposeCoreRuntimeConstant === 'function'
        ? exposeCoreRuntimeConstant
        : function noopExposeCoreRuntimeConstant() { };

    function shouldShowIosPwaHelp() {
      try {
        if (helpModuleApi && typeof helpModuleApi.shouldShowIosPwaHelp === 'function') {
          return Boolean(helpModuleApi.shouldShowIosPwaHelp(resolveIosPwaHelpDialog));
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('shouldShowIosPwaHelp() failed', error);
        }
      }
      return false;
    }

    function openIosPwaHelp() {
      const dialog = resolveIosPwaHelpDialog();
      if (!dialog) return;
      if (!shouldShowIosPwaHelp()) return;
      lastActiveBeforeIosHelp = document.activeElement;
      dialog.removeAttribute('hidden');
      const closeButton = resolveIosPwaHelpClose();
      const focusTarget = closeButton || dialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }

    function closeIosPwaHelp(storeDismissal = false) {
      const dialog = resolveIosPwaHelpDialog();
      if (!dialog) return;
      dialog.setAttribute('hidden', '');
      if (storeDismissal) {
        markIosPwaHelpDismissed();
      }
      if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
        lastActiveBeforeIosHelp.focus();
      }
    }

    function maybeShowIosPwaHelp() {
      openIosPwaHelp();
    }

    const iosPwaHelpCloseButton = resolveIosPwaHelpClose();
    if (iosPwaHelpCloseButton) {
      iosPwaHelpCloseButton.addEventListener('click', () => closeIosPwaHelp(true));
    }

    const iosPwaHelpDialogElement = resolveIosPwaHelpDialog();
    if (iosPwaHelpDialogElement) {
      iosPwaHelpDialogElement.addEventListener('click', event => {
        if (event.target === iosPwaHelpDialogElement) {
          closeIosPwaHelp(true);
        }
      });
    }

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' && event.key !== 'Esc') return;
      let handled = false;
      const activeIosDialog = resolveIosPwaHelpDialog();
      if (activeIosDialog && !activeIosDialog.hasAttribute('hidden')) {
        closeIosPwaHelp(true);
        handled = true;
      }
      if (installGuideDialog && !installGuideDialog.hasAttribute('hidden')) {
        closeInstallGuide();
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
    });

    function renderSettingsLogoPreview(dataUrl) {
      if (!settingsLogoPreview) return;
      if (dataUrl) {
        settingsLogoPreview.textContent = '';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.alt = '';
        settingsLogoPreview.appendChild(img);
        settingsLogoPreview.removeAttribute('hidden');
      } else {
        settingsLogoPreview.textContent = '';
        settingsLogoPreview.setAttribute('hidden', '');
      }
    }

    function loadStoredLogoPreview() {
      if (!settingsLogoPreview || typeof localStorage === 'undefined') return;
      let stored = null;
      try {
        stored = localStorage.getItem('customLogo');
      } catch (e) {
        console.warn('Could not load custom logo preview', e);
      }
      renderSettingsLogoPreview(stored);
    }

    const isPlainObjectValue = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

    const REQUIRED_DEVICE_CATEGORIES = [
      'cameras',
      'monitors',
      'video',
      'viewfinders',
      'directorMonitors',
      'iosVideo',
      'videoAssist',
      'media',
      'lenses',
      'fiz',
      'batteries',
      'batteryHotswaps',
      'wirelessReceivers',
      'accessories',
    ];
    const DEFAULT_FIZ_COLLECTIONS = ['motors', 'handUnits', 'controllers', 'distance'];
    const DEFAULT_ACCESSORY_COLLECTIONS = [
      'chargers',
      'cages',
      'powerPlates',
      'cameraSupport',
      'matteboxes',
      'filters',
      'rigging',
      'batteries',
      'cables',
      'videoAssist',
      'media',
      'cardReaders',
      'tripodHeads',
      'tripods',
      'sliders',
      'cameraStabiliser',
      'grip',
      'carts',
    ];
    const MAX_DEVICE_IMPORT_ERRORS = 5;

    function normalizeDeviceEntryCollection(collection) {
      if (isPlainObjectValue(collection)) {
        return { ...collection };
      }

      if (!Array.isArray(collection)) {
        return undefined;
      }

      if (!collection.length) {
        return {};
      }

      const converted = {};
      for (const entry of collection) {
        if (Array.isArray(entry) && entry.length >= 2) {
          const [name, value] = entry;
          if (typeof name === 'string' && isPlainObjectValue(value)) {
            converted[name] = value;
            continue;
          }
        }

        if (!isPlainObjectValue(entry)) {
          continue;
        }

        const name = typeof entry.name === 'string'
          ? entry.name
          : typeof entry.label === 'string'
            ? entry.label
            : typeof entry.title === 'string'
              ? entry.title
              : typeof entry.id === 'string'
                ? entry.id
                : null;

        let value = null;
        if (isPlainObjectValue(entry.data)) {
          value = entry.data;
        } else if (name) {
          const clone = { ...entry };
          delete clone.name;
          delete clone.label;
          delete clone.title;
          delete clone.id;
          if (isPlainObjectValue(clone) && Object.keys(clone).length) {
            value = clone;
          }
        }

        if (name && isPlainObjectValue(value)) {
          converted[name] = value;
        }
      }

      if (Object.keys(converted).length) {
        return converted;
      }

      return undefined;
    }

    function ensureNestedDeviceCollections(source, expectedKeys = []) {
      const target = {};
      if (isPlainObjectValue(source)) {
        for (const [key, value] of Object.entries(source)) {
          const normalized = normalizeDeviceEntryCollection(value);
          if (normalized !== undefined) {
            target[key] = normalized;
          } else if (value === undefined || value === null) {
            target[key] = {};
          } else if (isPlainObjectValue(value)) {
            target[key] = { ...value };
          } else {
            target[key] = value;
          }
        }
      }

      for (const key of expectedKeys) {
        if (Object.prototype.hasOwnProperty.call(target, key) && isPlainObjectValue(target[key])) {
          continue;
        }
        const normalized = normalizeDeviceEntryCollection(source && source[key]);
        if (normalized !== undefined) {
          target[key] = normalized;
        } else if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] == null) {
          target[key] = {};
        }
      }

      return target;
    }

    const LEGACY_DEVICE_CATEGORY_ALIASES = {
      batteryadapters: 'batteryHotswaps',
      batteryadapter: 'batteryHotswaps',
      batterieshotswap: 'batteryHotswaps',
      director: 'directorMonitors',
      directormonitors: 'directorMonitors',
      directorsmonitor: 'directorMonitors',
      ios: 'iosVideo',
      iosvideo: 'iosVideo',
      iosdevices: 'iosVideo',
      ios_video: 'iosVideo',
      iosmonitor: 'iosVideo',
      wireless: 'wirelessReceivers',
      wirelessvideo: 'wirelessReceivers',
      wirelessreceiver: 'wirelessReceivers',
    };

    const DEVICE_CATEGORY_NORMALIZED_LOOKUP = REQUIRED_DEVICE_CATEGORIES.map((category) => ({
      key: category,
      normalized: category.replace(/[^a-z0-9]+/gi, '').toLowerCase(),
    }));

    function normalizeLegacyDeviceCategoryKey(rawKey) {
      if (typeof rawKey !== 'string') {
        return null;
      }

      const trimmed = rawKey.trim();
      if (!trimmed) {
        return null;
      }

      if (REQUIRED_DEVICE_CATEGORIES.includes(trimmed)) {
        return trimmed;
      }

      const normalized = trimmed.replace(/[^a-z0-9]+/gi, '').toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LEGACY_DEVICE_CATEGORY_ALIASES, normalized)) {
        return LEGACY_DEVICE_CATEGORY_ALIASES[normalized];
      }

      for (let index = 0; index < DEVICE_CATEGORY_NORMALIZED_LOOKUP.length; index += 1) {
        const entry = DEVICE_CATEGORY_NORMALIZED_LOOKUP[index];
        if (entry.normalized === normalized) {
          return entry.key;
        }
      }

      if (!trimmed) {
        return null;
      }

      return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
    }

    const LEGACY_CATEGORY_VALUE_KEYS = [
      'devices',
      'entries',
      'items',
      'values',
      'collection',
      'collections',
      'data',
      'value',
    ];

    function convertLegacyDeviceCategoryValue(value) {
      if (value === null || value === undefined) {
        return value;
      }

      if (isMapLike(value)) {
        const converted = convertMapLikeToObject(value);
        if (converted) {
          return convertLegacyDeviceCategoryValue(converted);
        }
      }

      const normalizedCollection = normalizeDeviceEntryCollection(value);
      if (normalizedCollection !== undefined) {
        return normalizedCollection;
      }

      if (Array.isArray(value)) {
        const nested = {};
        let hasNestedAssignments = false;
        value.forEach((entry) => {
          if (Array.isArray(entry) && entry.length >= 2) {
            const nestedKey = normalizeLegacyDeviceCategoryKey(entry[0]);
            if (!nestedKey) {
              return;
            }
            nested[nestedKey] = convertLegacyDeviceCategoryValue(entry[1]);
            hasNestedAssignments = true;
            return;
          }

          if (!isPlainObjectValue(entry)) {
            return;
          }

          let nestedKey = null;
          if (typeof entry.category === 'string') {
            nestedKey = entry.category;
          } else if (typeof entry.key === 'string') {
            nestedKey = entry.key;
          } else if (typeof entry.name === 'string') {
            nestedKey = entry.name;
          } else if (typeof entry.id === 'string') {
            nestedKey = entry.id;
          } else if (typeof entry.type === 'string') {
            nestedKey = entry.type;
          } else if (typeof entry.section === 'string') {
            nestedKey = entry.section;
          } else if (typeof entry.title === 'string') {
            nestedKey = entry.title;
          }

          let nestedValue = null;
          for (let i = 0; i < LEGACY_CATEGORY_VALUE_KEYS.length; i += 1) {
            const key = LEGACY_CATEGORY_VALUE_KEYS[i];
            if (Object.prototype.hasOwnProperty.call(entry, key)) {
              nestedValue = entry[key];
              break;
            }
          }

          if (nestedValue === null || nestedValue === undefined) {
            const clone = { ...entry };
            delete clone.category;
            delete clone.key;
            delete clone.name;
            delete clone.id;
            delete clone.type;
            delete clone.section;
            delete clone.title;
            if (Object.keys(clone).length) {
              nestedValue = clone;
            }
          }

          const resolvedNestedKey = normalizeLegacyDeviceCategoryKey(nestedKey);
          if (!resolvedNestedKey) {
            return;
          }

          nested[resolvedNestedKey] = convertLegacyDeviceCategoryValue(nestedValue);
          hasNestedAssignments = true;
        });

        if (hasNestedAssignments) {
          return nested;
        }

        return value;
      }

      if (isPlainObjectValue(value)) {
        for (let i = 0; i < LEGACY_CATEGORY_VALUE_KEYS.length; i += 1) {
          const key = LEGACY_CATEGORY_VALUE_KEYS[i];
          if (Array.isArray(value[key])) {
            const normalized = normalizeDeviceEntryCollection(value[key]);
            if (normalized !== undefined) {
              return normalized;
            }
          }
          if (isMapLike(value[key])) {
            const converted = convertMapLikeToObject(value[key]);
            if (converted) {
              return convertLegacyDeviceCategoryValue(converted);
            }
          }
        }

        const nestedKeys = ['categories', 'sections', 'collections'];
        for (let i = 0; i < nestedKeys.length; i += 1) {
          const key = nestedKeys[i];
          if (Array.isArray(value[key])) {
            const normalized = convertLegacyDeviceCategoryValue(value[key]);
            if (normalized && typeof normalized === 'object') {
              return normalized;
            }
          }
        }
      }

      return value;
    }

    function convertLegacyDeviceDatabaseArray(entries) {
      if (!Array.isArray(entries)) {
        return null;
      }

      const converted = {};
      let assignments = 0;

      entries.forEach((entry) => {
        if (entry === null || entry === undefined) {
          return;
        }

        if (Array.isArray(entry) && entry.length >= 2) {
          const key = normalizeLegacyDeviceCategoryKey(entry[0]);
          if (!key) {
            return;
          }
          converted[key] = convertLegacyDeviceCategoryValue(entry[1]);
          assignments += 1;
          return;
        }

        if (!isPlainObjectValue(entry)) {
          return;
        }

        let key = null;
        if (typeof entry.category === 'string') {
          key = entry.category;
        } else if (typeof entry.key === 'string') {
          key = entry.key;
        } else if (typeof entry.name === 'string') {
          key = entry.name;
        } else if (typeof entry.id === 'string') {
          key = entry.id;
        } else if (typeof entry.type === 'string') {
          key = entry.type;
        } else if (typeof entry.section === 'string') {
          key = entry.section;
        } else if (typeof entry.title === 'string') {
          key = entry.title;
        }

        let value = null;
        for (let i = 0; i < LEGACY_CATEGORY_VALUE_KEYS.length; i += 1) {
          const candidateKey = LEGACY_CATEGORY_VALUE_KEYS[i];
          if (Object.prototype.hasOwnProperty.call(entry, candidateKey)) {
            value = entry[candidateKey];
            break;
          }
        }

        if (value === null || value === undefined) {
          const clone = { ...entry };
          delete clone.category;
          delete clone.key;
          delete clone.name;
          delete clone.id;
          delete clone.type;
          delete clone.section;
          delete clone.title;
          if (Object.keys(clone).length) {
            value = clone;
          }
        }

        const resolvedKey = normalizeLegacyDeviceCategoryKey(key);
        if (!resolvedKey) {
          return;
        }

        converted[resolvedKey] = convertLegacyDeviceCategoryValue(value);
        assignments += 1;
      });

      return assignments ? converted : null;
    }

    function mergeLegacyDeviceCategoryAssignments(target, source) {
      if (!source || typeof source !== 'object') {
        return false;
      }

      let merged = false;
      Object.entries(source).forEach(([key, value]) => {
        if (value === undefined) {
          return;
        }
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = value;
          merged = true;
          return;
        }
        if (isPlainObjectValue(target[key]) && isPlainObjectValue(value)) {
          target[key] = { ...value, ...target[key] };
          merged = true;
        }
      });

      return merged;
    }

    function convertLegacyDeviceDatabaseContainer(candidate) {
      if (candidate === null || candidate === undefined) {
        return candidate;
      }

      if (isMapLike(candidate)) {
        const converted = convertMapLikeToObject(candidate);
        if (converted) {
          return convertLegacyDeviceDatabaseContainer(converted);
        }
      }

      if (Array.isArray(candidate)) {
        const convertedArray = convertLegacyDeviceDatabaseArray(candidate);
        return convertedArray || candidate;
      }

      if (!isPlainObjectValue(candidate)) {
        return candidate;
      }

      const base = { ...candidate };
      let changed = false;

      const arrayKeys = ['categories', 'sections', 'collections'];
      for (let i = 0; i < arrayKeys.length; i += 1) {
        const key = arrayKeys[i];
        if (Array.isArray(candidate[key])) {
          const converted = convertLegacyDeviceDatabaseArray(candidate[key]);
          if (converted && mergeLegacyDeviceCategoryAssignments(base, converted)) {
            changed = true;
          }
        }
      }

      const nestedKeys = ['data', 'dataset', 'values', 'entries'];
      for (let i = 0; i < nestedKeys.length; i += 1) {
        const key = nestedKeys[i];
        if (!Object.prototype.hasOwnProperty.call(candidate, key)) {
          continue;
        }
        const nested = convertLegacyDeviceDatabaseContainer(candidate[key]);
        if (nested && isPlainObjectValue(nested) && looksLikeDeviceDatabase(nested)) {
          if (mergeLegacyDeviceCategoryAssignments(base, nested)) {
            changed = true;
          }
        }
      }

      if (changed) {
        return base;
      }

      return candidate;
    }

    function upgradeDeviceDatabaseSchema(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return candidate;
      }

      const upgraded = { ...candidate };

      for (const category of REQUIRED_DEVICE_CATEGORIES) {
        if (category === 'fiz') {
          const expectedFizKeys = collectReferenceFizKeys();
          upgraded.fiz = ensureNestedDeviceCollections(candidate.fiz, expectedFizKeys);
          continue;
        }

        if (category === 'accessories') {
          const expectedAccessoryKeys = collectReferenceAccessoryKeys();
          upgraded.accessories = ensureNestedDeviceCollections(candidate.accessories, expectedAccessoryKeys);
          continue;
        }

        const source = candidate[category];
        const normalized = normalizeDeviceEntryCollection(source);
        if (normalized !== undefined) {
          upgraded[category] = normalized;
        } else if (source === undefined || source === null) {
          upgraded[category] = {};
        } else if (isPlainObjectValue(source)) {
          upgraded[category] = { ...source };
        } else {
          upgraded[category] = source;
        }
      }

      return upgraded;
    }

    function isDeviceEntryObject(value) {
      if (!isPlainObjectValue(value)) {
        return false;
      }
      return Object.values(value).some((entry) => entry === null || typeof entry !== 'object' || Array.isArray(entry));
    }

    function countDeviceDatabaseEntries(collection) {
      if (!isPlainObjectValue(collection)) {
        return 0;
      }
      let total = 0;
      for (const [name, value] of Object.entries(collection)) {
        if (name === 'filterOptions' || name === 'None') {
          continue;
        }
        if (!isPlainObjectValue(value)) {
          continue;
        }
        if (isDeviceEntryObject(value)) {
          total += 1;
        } else {
          total += countDeviceDatabaseEntries(value);
        }
      }
      return total;
    }

    function looksLikeDeviceDatabase(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return false;
      }
      let matched = 0;
      for (const key of REQUIRED_DEVICE_CATEGORIES) {
        if (Object.prototype.hasOwnProperty.call(candidate, key)) {
          matched += 1;
        }
      }
      return matched >= 3;
    }

    function collectReferenceFizKeys() {
      const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
        ? globalThis.defaultDevices
        : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
      if (reference && isPlainObjectValue(reference.fiz)) {
        const keys = Object.keys(reference.fiz).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_FIZ_COLLECTIONS;
    }

    function collectReferenceAccessoryKeys() {
      const reference = typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.defaultDevices)
        ? globalThis.defaultDevices
        : (typeof globalThis !== 'undefined' && isPlainObjectValue(globalThis.devices) ? globalThis.devices : null);
      if (reference && isPlainObjectValue(reference.accessories)) {
        const keys = Object.keys(reference.accessories).filter(Boolean);
        if (keys.length) {
          return keys;
        }
      }
      return DEFAULT_ACCESSORY_COLLECTIONS;
    }

    function validateDeviceDatabaseStructure(candidate) {
      if (!isPlainObjectValue(candidate)) {
        return { devices: null, errors: ['Imported data must be a JSON object.'] };
      }

      const errors = [];
      const missing = [];

      for (const category of REQUIRED_DEVICE_CATEGORIES) {
        if (category === 'fiz') {
          if (!isPlainObjectValue(candidate.fiz)) {
            missing.push('fiz');
            continue;
          }
          const expectedFizKeys = collectReferenceFizKeys();
          const missingFiz = expectedFizKeys.filter((key) => !isPlainObjectValue(candidate.fiz[key]));
          if (missingFiz.length) {
            errors.push(`Missing FIZ categories: ${missingFiz.join(', ')}`);
          }
          continue;
        }
        if (category === 'accessories') {
          if (!isPlainObjectValue(candidate.accessories)) {
            missing.push('accessories');
            continue;
          }
          const expectedAccessoryKeys = collectReferenceAccessoryKeys();
          const missingAccessories = expectedAccessoryKeys.filter((key) => !isPlainObjectValue(candidate.accessories[key]));
          if (missingAccessories.length) {
            errors.push(`Missing accessory categories: ${missingAccessories.join(', ')}`);
          }
          continue;
        }
        if (!isPlainObjectValue(candidate[category])) {
          missing.push(category);
        }
      }

      if (missing.length) {
        errors.push(`Missing categories: ${missing.join(', ')}`);
      }

      if (candidate.accessories !== undefined) {
        if (!isPlainObjectValue(candidate.accessories)) {
          errors.push('Accessory collections must be objects.');
        } else {
          for (const [subKey, subValue] of Object.entries(candidate.accessories)) {
            if (!isPlainObjectValue(subValue)) {
              errors.push(`Accessory category "${subKey}" must be an object.`);
            }
          }
        }
      }

      if (candidate.filterOptions !== undefined && !Array.isArray(candidate.filterOptions)) {
        errors.push('Filter options must be provided as an array.');
      }

      if (candidate.fiz && isPlainObjectValue(candidate.fiz)) {
        for (const [subKey, subValue] of Object.entries(candidate.fiz)) {
          if (subValue !== undefined && !isPlainObjectValue(subValue)) {
            errors.push(`FIZ category "${subKey}" must be an object.`);
          }
        }
      }

      const structureErrors = [];
      const inspectCollections = (collection, path = []) => {
        if (!isPlainObjectValue(collection)) {
          return;
        }
        for (const [name, value] of Object.entries(collection)) {
          if (name === 'None' || name === 'filterOptions') {
            continue;
          }
          const nextPath = path.concat(name);
          if (!isPlainObjectValue(value)) {
            if (!Array.isArray(value)) {
              structureErrors.push(`${nextPath.join('.')} must be an object.`);
            }
          } else if (!isDeviceEntryObject(value)) {
            inspectCollections(value, nextPath);
          }
          if (structureErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
            return;
          }
        }
      };

      inspectCollections(candidate);
      errors.push(...structureErrors);

      const deviceCount = countDeviceDatabaseEntries(candidate);
      if (!deviceCount) {
        errors.push('The imported database does not contain any devices.');
      }

      const uniqueErrors = [];
      for (const message of errors) {
        if (message && !uniqueErrors.includes(message)) {
          uniqueErrors.push(message);
        }
        if (uniqueErrors.length >= MAX_DEVICE_IMPORT_ERRORS) {
          break;
        }
      }

      return {
        devices: uniqueErrors.length ? null : candidate,
        errors: uniqueErrors,
      };
    }

    function parseDeviceDatabaseImport(rawData) {
      if (Array.isArray(rawData)) {
        const converted = convertLegacyDeviceDatabaseContainer(rawData);
        if (!isPlainObjectValue(converted)) {
          return { devices: null, errors: ['Import file must contain a JSON object, but found an array.'] };
        }
        rawData = converted;
      }
      if (!isPlainObjectValue(rawData)) {
        return { devices: null, errors: ['Import file must contain a JSON object.'] };
      }

      if (Object.prototype.hasOwnProperty.call(rawData, 'devices') && !isPlainObjectValue(rawData.devices)) {
        return { devices: null, errors: ['The "devices" property must be an object.'] };
      }

      let candidate = Object.prototype.hasOwnProperty.call(rawData, 'devices') && isPlainObjectValue(rawData.devices)
        ? rawData.devices
        : (looksLikeDeviceDatabase(rawData) ? rawData : null);

      if (!candidate) {
        const convertedLegacy = convertLegacyDeviceDatabaseContainer(rawData);
        if (convertedLegacy && looksLikeDeviceDatabase(convertedLegacy)) {
          candidate = convertedLegacy;
        }
      }

      if (!candidate) {
        return { devices: null, errors: ['Could not find a device database in the selected file.'] };
      }

      const normalizedCandidate = upgradeDeviceDatabaseSchema(candidate);
      return validateDeviceDatabaseStructure(normalizedCandidate);
    }

    function formatDeviceImportErrors(errors) {
      if (!Array.isArray(errors) || !errors.length) {
        return '';
      }
      const lines = errors.slice(0, MAX_DEVICE_IMPORT_ERRORS).map((message) => `- ${message}`);
      return lines.join('\n');
    }

    function resolveLanguageCode(lang) {
      if (lang && texts && Object.prototype.hasOwnProperty.call(texts, lang)) {
        return lang;
      }
      return 'en';
    }

    function getLanguageTexts(lang) {
      const resolved = resolveLanguageCode(lang);
      return (texts && texts[resolved]) || texts.en || {};
    }

    const DEFAULT_INTL_CACHE_KEY = '__default__';

    const numberFormatCache = new Map();
    const pluralRulesCache = new Map();
    const listFormatCache = new Map();
    const LIST_FORMAT_OPTIONS = Object.freeze({ style: 'long', type: 'conjunction' });

    function serializeIntlOptions(options) {
      if (!options || typeof options !== 'object') {
        return options == null ? DEFAULT_INTL_CACHE_KEY : String(options);
      }
      const entries = [];
      for (const [key, value] of Object.entries(options)) {
        if (typeof value === 'undefined') continue;
        let normalizedValue;
        if (value && typeof value === 'object') {
          normalizedValue = serializeIntlOptions(value);
        } else {
          normalizedValue = String(value);
        }
        entries.push(`${key}:${normalizedValue}`);
      }
      if (!entries.length) {
        return DEFAULT_INTL_CACHE_KEY;
      }
      return entries.sort().join('|');
    }

    function getCachedIntlObject(cache, locale, options, factory) {
      const key = serializeIntlOptions(options);
      let localeCache = cache.get(locale);
      if (!localeCache) {
        localeCache = new Map();
        cache.set(locale, localeCache);
      }
      if (localeCache.has(key)) {
        return localeCache.get(key);
      }
      try {
        const instance = factory(locale, options);
        localeCache.set(key, instance);
        return instance;
      } catch (error) {
        localeCache.delete(key);
        throw error;
      }
    }

    function getNumberFormatter(locale, options) {
      return getCachedIntlObject(numberFormatCache, locale, options, (loc, opts) => new Intl.NumberFormat(loc, opts));
    }

    function getPluralRules(locale) {
      return getCachedIntlObject(pluralRulesCache, locale, undefined, loc => new Intl.PluralRules(loc));
    }

    function getListFormatter(locale) {
      return getCachedIntlObject(listFormatCache, locale, LIST_FORMAT_OPTIONS, loc => new Intl.ListFormat(loc, LIST_FORMAT_OPTIONS));
    }

    function formatNumberForLang(lang, value, options) {
      const resolved = resolveLanguageCode(lang);
      try {
        return getNumberFormatter(resolved, options).format(value);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getNumberFormatter('en', options).format(value);
          } catch (fallbackError) {
            console.warn('Number formatting failed', firstError, fallbackError);
            return String(value);
          }
        }
        console.warn('Number formatting failed', firstError);
        return String(value);
      }
    }

    function formatCountText(lang, langTexts, baseKey, count) {
      const resolved = resolveLanguageCode(lang);
      const localeTexts = langTexts || getLanguageTexts(resolved);
      const englishTexts = getLanguageTexts('en');
      let suffix = 'Other';
      try {
        const plural = getPluralRules(resolved).select(count);
        if (plural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            const fallbackPlural = getPluralRules('en').select(count);
            if (fallbackPlural === 'one' && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
              suffix = 'One';
            }
          } catch (fallbackError) {
            console.warn('Plural rules failed', firstError, fallbackError);
            if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
              suffix = 'One';
            }
          }
        } else if (count === 1 && (localeTexts[`${baseKey}One`] || englishTexts[`${baseKey}One`])) {
          suffix = 'One';
        }
      }
      const key = `${baseKey}${suffix}`;
      const template = localeTexts[key] || englishTexts[key] || '%s';
      const formatted = formatNumberForLang(resolved, count);
      return template.replace('%s', formatted);
    }

    function formatListForLang(lang, items) {
      const resolved = resolveLanguageCode(lang);
      if (!Array.isArray(items) || !items.length) return '';
      try {
        return getListFormatter(resolved).format(items);
      } catch (firstError) {
        if (resolved !== 'en') {
          try {
            return getListFormatter('en').format(items);
          } catch (fallbackError) {
            console.warn('List formatting failed', firstError, fallbackError);
            return items.join(', ');
          }
        }
        console.warn('List formatting failed', firstError);
        return items.join(', ');
      }
    }

    function normalizeTemperatureUnit(unit) {
      if (typeof unit === 'string') {
        const normalized = unit.trim().toLowerCase();
        if (normalized === TEMPERATURE_UNITS.fahrenheit) {
          return TEMPERATURE_UNITS.fahrenheit;
        }
        if (normalized === TEMPERATURE_UNITS.celsius) {
          return TEMPERATURE_UNITS.celsius;
        }
      }
      if (unit === TEMPERATURE_UNITS.fahrenheit) {
        return TEMPERATURE_UNITS.fahrenheit;
      }
      return TEMPERATURE_UNITS.celsius;
    }

    function getRuntimeTemperatureUnit() {
      const fallbackUnitCandidates = [];
      if (typeof temperatureUnit !== 'undefined') {
        fallbackUnitCandidates.push(temperatureUnit);
      }
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
        fallbackUnitCandidates.push(CORE_GLOBAL_SCOPE.temperatureUnit);
      }
      if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
        fallbackUnitCandidates.push(globalThis.temperatureUnit);
      }
      if (typeof window !== 'undefined' && window && typeof window === 'object') {
        fallbackUnitCandidates.push(window.temperatureUnit);
      }
      if (typeof self !== 'undefined' && self && typeof self === 'object') {
        fallbackUnitCandidates.push(self.temperatureUnit);
      }
      if (typeof global !== 'undefined' && global && typeof global === 'object') {
        fallbackUnitCandidates.push(global.temperatureUnit);
      }

      for (let index = 0; index < fallbackUnitCandidates.length; index += 1) {
        const candidate = fallbackUnitCandidates[index];
        if (typeof candidate === 'string' && candidate) {
          return candidate;
        }
      }

      return 'celsius';
    }

    function convertCelsiusToUnit(value, unit) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        return Number.NaN;
      }
      const resolvedUnit = normalizeTemperatureUnit(
        typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit
      );
      if (resolvedUnit === TEMPERATURE_UNITS.fahrenheit) {
        return (numeric * 9) / 5 + 32;
      }
      return numeric;
    }

    function getTemperatureUnitSymbolForLang(lang = currentLang, unit) {
      const resolvedUnit = normalizeTemperatureUnit(
        typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit
      );
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const key =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit
          ? 'temperatureUnitSymbolFahrenheit'
          : 'temperatureUnitSymbolCelsius';
      return (
        textsForLang[key] ||
        fallbackTexts[key] ||
        (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C')
      );
    }

    function getTemperatureUnitLabelForLang(lang = currentLang, unit) {
      const resolvedUnit = normalizeTemperatureUnit(
        typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit
      );
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const key =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit
          ? 'temperatureUnitFahrenheit'
          : 'temperatureUnitCelsius';
      return (
        textsForLang[key] ||
        fallbackTexts[key] ||
        (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)')
      );
    }

    function getTemperatureColumnLabelForLang(lang = currentLang, unit) {
      const textsForLang = getLanguageTexts(lang);
      const fallbackTexts = getLanguageTexts('en');
      const baseLabel =
        textsForLang.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
      const symbol = getTemperatureUnitSymbolForLang(
        lang,
        typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit
      );
      return `${baseLabel} (${symbol})`;
    }

    function formatTemperatureForDisplay(celsius, options = {}) {
      const {
        unit,
        lang = currentLang,
        includeSign = true
      } = options || {};
      const resolvedUnit = normalizeTemperatureUnit(
        typeof unit === 'undefined' ? getRuntimeTemperatureUnit() : unit
      );
      let converted = convertCelsiusToUnit(celsius, resolvedUnit);
      if (!Number.isFinite(converted)) {
        return '';
      }
      if (Math.abs(converted) < 1e-6) {
        converted = 0;
      }
      const isNegative = converted < 0;
      const isPositive = converted > 0;
      const absolute = Math.abs(converted);
      const isInteger = Math.abs(absolute - Math.round(absolute)) < 1e-6;
      const fractionDigits =
        resolvedUnit === TEMPERATURE_UNITS.fahrenheit && !isInteger ? 1 : 0;
      const formatted = formatNumberForLang(lang, absolute, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      });
      let prefix = '';
      if (includeSign === 'none') {
        prefix = '';
      } else if (includeSign === false || includeSign === 'negative') {
        if (isNegative) {
          prefix = '–';
        }
      } else {
        if (isPositive) {
          prefix = '+';
        } else if (isNegative) {
          prefix = '–';
        }
      }
      const symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
      return `${prefix}${formatted} ${symbol}`;
    }

    function summarizeCustomDevices() {
      if (typeof getDeviceChanges !== 'function') {
        return { total: 0, categories: [] };
      }
      const diff = getDeviceChanges();
      if (!diff || typeof diff !== 'object') {
        return { total: 0, categories: [] };
      }
      const categories = [];
      let total = 0;
      Object.entries(diff).forEach(([cat, entries]) => {
        if (!isPlainObjectValue(entries)) return;
        if (cat === 'fiz') {
          Object.entries(entries).forEach(([sub, subEntries]) => {
            if (!isPlainObjectValue(subEntries)) return;
            const keys = Object.keys(subEntries);
            if (!keys.length) return;
            categories.push({ key: `fiz.${sub}`, count: keys.length });
            total += keys.length;
          });
        } else {
          const keys = Object.keys(entries);
          if (!keys.length) return;
          categories.push({ key: cat, count: keys.length });
          total += keys.length;
        }
      });
      return { total, categories };
    }

    function hasGearListContent(entry) {
      if (!entry) return false;
      if (typeof entry === 'string') {
        return entry.trim().length > 0;
      }
      if (!isPlainObjectValue(entry)) {
        return false;
      }

      if (typeof entry.gearList === 'string') {
        return entry.gearList.trim().length > 0;
      }

      if (isPlainObjectValue(entry.gearList)) {
        return Object.values(entry.gearList).some((value) => (
          typeof value === 'string' && value.trim().length > 0
        ));
      }

      const legacyProjectHtml = typeof entry.projectHtml === 'string' && entry.projectHtml.trim().length > 0;
      const legacyGearHtml = typeof entry.gearHtml === 'string' && entry.gearHtml.trim().length > 0;
      if (legacyProjectHtml || legacyGearHtml) {
        return true;
      }

      return false;
    }

    function computeGearListCount(projectData, setupsData) {
      let count = 0;
      const countedNames = new Set();

      const addCount = (name, candidate) => {
        if (!hasGearListContent(candidate)) {
          return;
        }
        const normalizedName = typeof name === 'string' ? name : '';
        if (countedNames.has(normalizedName)) {
          return;
        }
        countedNames.add(normalizedName);
        count += 1;
      };

      if (typeof projectData === 'string') {
        addCount('', projectData);
      } else if (Array.isArray(projectData)) {
        projectData.forEach((entry, index) => {
          const key = isPlainObjectValue(entry) && typeof entry.name === 'string'
            ? entry.name
            : `legacy-${index}`;
          addCount(key, entry);
        });
      } else if (isPlainObjectValue(projectData)) {
        Object.entries(projectData).forEach(([name, entry]) => {
          addCount(name, entry);
        });
      } else {
        addCount('', projectData);
      }

      if (isPlainObjectValue(setupsData)) {
        Object.entries(setupsData).forEach(([name, setup]) => {
          addCount(name, setup);
        });
      }

      return count;
    }

    function computeFavoritesCount(favorites) {
      if (!isPlainObjectValue(favorites)) return 0;
      return Object.values(favorites).reduce((count, entry) => {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        return count;
      }, 0);
    }

    function computeFeedbackCount(feedback) {
      if (!isPlainObjectValue(feedback)) return 0;
      return Object.values(feedback).reduce((count, entry) => {
        if (Array.isArray(entry)) {
          return count + entry.length;
        }
        if (isPlainObjectValue(entry) && Array.isArray(entry.entries)) {
          return count + entry.entries.length;
        }
        return count;
      }, 0);
    }

    function pruneValueForImportantBackup(value) {
      if (Array.isArray(value)) {
        const pruned = value
          .map(item => pruneValueForImportantBackup(item))
          .filter(item => item !== undefined);
        return pruned.length ? pruned : undefined;
      }
      if (isPlainObjectValue(value)) {
        const result = {};
        Object.entries(value).forEach(([key, val]) => {
          const pruned = pruneValueForImportantBackup(val);
          if (pruned !== undefined) {
            result[key] = pruned;
          }
        });
        return Object.keys(result).length ? result : undefined;
      }
      if (value === null || value === undefined) {
        return undefined;
      }
      if (typeof value === 'string') {
        return value.trim() ? value : undefined;
      }
      return value;
    }

    function extractImportantProjectEntry(entry) {
      if (entry === null || entry === undefined) {
        return null;
      }
      if (typeof entry === 'string') {
        return entry.trim() ? { gearList: entry } : null;
      }
      if (Array.isArray(entry)) {
        const prunedArray = pruneValueForImportantBackup(entry);
        return prunedArray !== undefined ? { gearList: prunedArray } : null;
      }
      if (!isPlainObjectValue(entry)) {
        return null;
      }

      const projectSource = isPlainObjectValue(entry.project) ? entry.project : entry;
      const snapshot = {};

      const projectInfoSource = projectSource.projectInfo ?? entry.projectInfo;
      const projectInfo = pruneValueForImportantBackup(projectInfoSource);
      if (projectInfo !== undefined) {
        snapshot.projectInfo = projectInfo;
      }

      const gearListSource = projectSource.gearList ?? entry.gearList;
      if (typeof gearListSource === 'string') {
        if (gearListSource.trim()) {
          snapshot.gearList = gearListSource;
        }
      } else {
        const gearList = pruneValueForImportantBackup(gearListSource);
        if (gearList !== undefined) {
          snapshot.gearList = gearList;
        }
      }

      const gearSelectorsSource = projectSource.gearSelectors ?? entry.gearSelectors;
      const gearSelectors = pruneValueForImportantBackup(gearSelectorsSource);
      if (gearSelectors !== undefined) {
        snapshot.gearSelectors = gearSelectors;
      }

      const diagramPositionsSource = projectSource.diagramPositions ?? entry.diagramPositions;
      const diagramPositions = pruneValueForImportantBackup(diagramPositionsSource);
      if (diagramPositions !== undefined) {
        snapshot.diagramPositions = diagramPositions;
      }

      const powerSelectionSource = projectSource.powerSelection ?? entry.powerSelection;
      const deviceSelection = pruneValueForImportantBackup(powerSelectionSource);
      if (deviceSelection !== undefined) {
        snapshot.powerSelection = deviceSelection;
      }

      const autoGearRulesSource = projectSource.autoGearRules ?? entry.autoGearRules;
      if (Array.isArray(autoGearRulesSource)) {
        const autoGearRules = pruneValueForImportantBackup(autoGearRulesSource);
        if (autoGearRules !== undefined && autoGearRules.length) {
          snapshot.autoGearRules = autoGearRules;
        }
      }

      return Object.keys(snapshot).length ? snapshot : null;
    }

    function buildImportantProjectMap(collection) {
      if (!isPlainObjectValue(collection)) {
        return undefined;
      }
      const reduced = {};
      Object.entries(collection).forEach(([name, entry]) => {
        const important = extractImportantProjectEntry(entry);
        if (important) {
          reduced[name] = important;
        }
      });
      return Object.keys(reduced).length ? reduced : undefined;
    }

    function createImportantProjectData(data) {
      const importantData = {};

      if (isPlainObjectValue(data)) {
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'project' || key === 'setups' || key === 'autoGearRules') {
            return;
          }
          const pruned = pruneValueForImportantBackup(value);
          if (pruned !== undefined) {
            importantData[key] = pruned;
          }
        });
      }

      const project = extractImportantProjectEntry(data.project);
      const setups = buildImportantProjectMap(data.setups);
      if (project) {
        importantData.project = project;
      }
      if (setups) {
        importantData.setups = setups;
      }
      if (Array.isArray(data.autoGearRules)) {
        const autoGearRules = pruneValueForImportantBackup(data.autoGearRules);
        if (autoGearRules !== undefined && autoGearRules.length) {
          importantData.autoGearRules = autoGearRules;
        }
      }
      return importantData;
    }

    function estimateBackupSize(data) {
      if (typeof localStorage === 'undefined') return 0;
      try {
        const snapshot = {};
        for (let i = 0; i < localStorage.length; i += 1) {
          const key = localStorage.key(i);
          if (typeof key !== 'string') continue;
          snapshot[key] = localStorage.getItem(key);
        }
        const importantData = isPlainObjectValue(data) ? createImportantProjectData(data) : {};
        const payload = {
          version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
          generatedAt: new Date().toISOString(),
          settings: snapshot,
          data: importantData,
        };
        const json = JSON.stringify(payload);
        if (typeof TextEncoder !== 'undefined') {
          return new TextEncoder().encode(json).length;
        }
        return json.length;
      } catch (err) {
        console.warn('Could not calculate backup size preview', err);
        return 0;
      }
    }

    function formatSizeText(lang, langTexts, bytes) {
      const resolved = resolveLanguageCode(lang);
      if (!Number.isFinite(bytes) || bytes <= 0) {
        const zero = formatNumberForLang(resolved, 0, { maximumFractionDigits: 0 });
        const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
        return template.replace('%s', zero);
      }
      const kilobytes = bytes / 1024;
      let options;
      if (kilobytes >= 100) {
        options = { maximumFractionDigits: 0 };
      } else if (kilobytes >= 10) {
        options = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
      } else {
        options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
      }
      const formatted = formatNumberForLang(resolved, kilobytes, options);
      const template = langTexts.storageTotalSizeValue || (texts.en?.storageTotalSizeValue) || '~%s KB';
      return template.replace('%s', formatted);
    }

    function formatDeviceCategories(lang, categories) {
      if (!Array.isArray(categories) || !categories.length) return '';
      const resolved = resolveLanguageCode(lang);
      const lookup = (typeof categoryNames !== 'undefined' && categoryNames) || {};
      const localized = lookup[resolved] || lookup.en || {};
      const fallback = lookup.en || {};
      const items = categories
        .map(({ key, count }) => {
          const label = localized[key] || fallback[key] || key;
          const formattedCount = formatNumberForLang(resolved, count, { maximumFractionDigits: 0 });
          return { label, text: `${label} (${formattedCount})` };
        })
        .sort((a, b) => a.label.localeCompare(b.label, resolved, { sensitivity: 'base' }))
        .map((entry) => entry.text);
      return formatListForLang(resolved, items);
    }

    const AUTO_BACKUP_HELPERS_NAMESPACE = (() => {
      if (typeof require === 'function') {
        try {
          return require('./app-core-auto-backup.js');
        } catch (autoBackupRequireError) {
          void autoBackupRequireError;
        }
      }

      const candidateScopes = [
        typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' ? CORE_PART2_RUNTIME_SCOPE : null,
        typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
      ];

      for (let index = 0; index < candidateScopes.length; index += 1) {
        const scope = candidateScopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }

        try {
          if (scope.CORE_AUTO_BACKUP && typeof scope.CORE_AUTO_BACKUP === 'object') {
            return scope.CORE_AUTO_BACKUP;
          }
        } catch (lookupError) {
          void lookupError;
        }
      }

      return null;
    })();

    const STORAGE_SUMMARY_AUTO_BACKUP_PREFIX =
      AUTO_BACKUP_HELPERS_NAMESPACE && typeof AUTO_BACKUP_HELPERS_NAMESPACE.AUTO_BACKUP_NAME_PREFIX === 'string'
        ? AUTO_BACKUP_HELPERS_NAMESPACE.AUTO_BACKUP_NAME_PREFIX
        : 'auto-backup-';
    const STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX =
      AUTO_BACKUP_HELPERS_NAMESPACE
        && typeof AUTO_BACKUP_HELPERS_NAMESPACE.AUTO_BACKUP_DELETION_PREFIX === 'string'
        ? AUTO_BACKUP_HELPERS_NAMESPACE.AUTO_BACKUP_DELETION_PREFIX
        : 'auto-backup-before-delete-';
    const STORAGE_TIMESTAMP_KEYS = new Set([
      'timestamp',
      'createdat',
      'created_at',
      'savedat',
      'saved_at',
      'updatedat',
      'updated_at',
      'generatedat',
      'generated_at',
      'generatedon',
      'generated_on',
      'exportedat',
      'exported_at',
      'modifiedat',
      'modified_at',
      'iso',
    ]);
    const ISO_TIMESTAMP_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?(?:Z|[+-]\d{2}:\d{2})?$/;

    function isAutomaticBackupName(name) {
      if (typeof name !== 'string') return false;
      return (
        name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX)
        || name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX)
      );
    }

    function parseAutoBackupTimestamp(name) {
      if (typeof name !== 'string') return null;
      let remainder = '';
      if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_PREFIX.length);
      } else if (name.startsWith(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX)) {
        remainder = name.slice(STORAGE_SUMMARY_AUTO_BACKUP_DELETION_PREFIX.length);
      } else {
        return null;
      }
      const parts = remainder.split('-');
      if (parts.length < 6) {
        return null;
      }
      const values = parts.slice(0, 6).map(part => parseInt(part, 10));
      if (values.some(value => Number.isNaN(value))) {
        return null;
      }
      const [year, month, day, hour, minute, second] = values;
      const date = new Date(year, month - 1, day, hour, minute, second);
      if (Number.isNaN(date.getTime())) {
        return null;
      }
      return date;
    }

    function extractTimestampFromValue(value) {
      if (!value) return null;
      const visited = new Set();
      const queue = [value];
      let latest = null;

      const considerDate = (candidate) => {
        if (!(candidate instanceof Date)) return;
        if (Number.isNaN(candidate.getTime())) return;
        if (!latest || candidate > latest) {
          latest = candidate;
        }
      };

      while (queue.length) {
        const current = queue.shift();
        if (current === null || current === undefined) {
          continue;
        }
        if (typeof current === 'string') {
          const trimmed = current.trim();
          if (!trimmed) {
            continue;
          }
          if (ISO_TIMESTAMP_PATTERN.test(trimmed)) {
            considerDate(new Date(trimmed));
          }
          continue;
        }
        if (typeof current !== 'object') {
          continue;
        }
        if (visited.has(current)) {
          continue;
        }
        visited.add(current);
        if (Array.isArray(current)) {
          current.forEach((item) => {
            if (item && typeof item === 'object') {
              queue.push(item);
            } else if (typeof item === 'string') {
              queue.push(item);
            }
          });
          continue;
        }
        Object.entries(current).forEach(([key, val]) => {
          const normalizedKey = typeof key === 'string' ? key.toLowerCase() : '';
          if (typeof val === 'string') {
            const trimmed = val.trim();
            if (!trimmed) {
              return;
            }
            if (STORAGE_TIMESTAMP_KEYS.has(normalizedKey) || ISO_TIMESTAMP_PATTERN.test(trimmed)) {
              considerDate(new Date(trimmed));
            }
            return;
          }
          if (val && typeof val === 'object') {
            queue.push(val);
          }
        });
      }

      return latest;
    }

    function extractLatestManualSetupInfo(setups) {
      const result = { hasAny: false, date: null, name: '' };
      if (!isPlainObjectValue(setups)) {
        return result;
      }
      Object.entries(setups).forEach(([name, entry]) => {
        if (!name || typeof name !== 'string') {
          return;
        }
        if (isAutomaticBackupName(name)) {
          return;
        }
        result.hasAny = true;
        const timestamp = extractTimestampFromValue(entry);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }

    function extractLatestAutoBackupInfo(names) {
      const result = { hasAny: Array.isArray(names) && names.length > 0, date: null, name: '' };
      if (!Array.isArray(names)) {
        return result;
      }
      names.forEach((name) => {
        const timestamp = parseAutoBackupTimestamp(name);
        if (timestamp && (!result.date || timestamp > result.date)) {
          result.date = timestamp;
          result.name = name;
        }
      });
      return result;
    }

    function extractLatestFullBackupInfo(entries) {
      const result = { hasAny: Array.isArray(entries) && entries.length > 0, date: null, name: '' };
      if (!Array.isArray(entries)) {
        return result;
      }
      entries.forEach((entry) => {
        if (!entry) {
          return;
        }
        if (typeof entry === 'string') {
          const trimmed = entry.trim();
          if (!trimmed) {
            return;
          }
          const timestamp = new Date(trimmed);
          if (Number.isNaN(timestamp.getTime())) {
            return;
          }
          if (!result.date || timestamp > result.date) {
            result.date = timestamp;
            result.name = trimmed;
          }
          return;
        }
        if (typeof entry === 'object') {
          const timestamp = extractTimestampFromValue(entry);
          if (!timestamp) {
            return;
          }
          if (!result.date || timestamp > result.date) {
            result.date = timestamp;
            if (typeof entry.fileName === 'string' && entry.fileName.trim()) {
              result.name = entry.fileName.trim();
            } else if (typeof entry.name === 'string' && entry.name.trim()) {
              result.name = entry.name.trim();
            } else if (typeof entry.createdAt === 'string' && entry.createdAt.trim()) {
              result.name = entry.createdAt.trim();
            } else if (typeof entry.iso === 'string' && entry.iso.trim()) {
              result.name = entry.iso.trim();
            } else if (typeof entry.timestamp === 'string' && entry.timestamp.trim()) {
              result.name = entry.timestamp.trim();
            } else {
              result.name = '';
            }
          }
        }
      });
      return result;
    }

    function formatAbsoluteTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      const resolved = resolveLanguageCode(lang || currentLang);
      if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
        try {
          return new Intl.DateTimeFormat(resolved, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
        } catch (error) {
          console.warn('Failed to format absolute timestamp', error);
        }
      }
      return date.toISOString().replace('T', ' ').replace(/Z$/, ' UTC');
    }

    function formatRelativeTimestamp(date, lang) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      if (typeof Intl === 'undefined' || typeof Intl.RelativeTimeFormat !== 'function') {
        return '';
      }
      const resolved = resolveLanguageCode(lang || currentLang);
      const diffMs = date.getTime() - Date.now();
      const absDiff = Math.abs(diffMs);
      let unit = 'minute';
      let divisor = 60000;
      if (absDiff >= 86400000) {
        unit = 'day';
        divisor = 86400000;
      } else if (absDiff >= 3600000) {
        unit = 'hour';
        divisor = 3600000;
      } else if (absDiff < 60000) {
        unit = 'second';
        divisor = 1000;
      }
      const formatter = new Intl.RelativeTimeFormat(resolved, { numeric: 'auto' });
      const value = Math.round(diffMs / divisor);
      try {
        return formatter.format(value, unit);
      } catch (error) {
        console.warn('Failed to format relative timestamp', error);
        return '';
      }
    }

    function formatStatusTimestamp(date, lang, langTexts) {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return '';
      }
      const absolute = formatAbsoluteTimestamp(date, lang);
      const relative = formatRelativeTimestamp(date, lang);
      if (relative) {
        const template = langTexts.storageStatusTimestamp
          || texts.en?.storageStatusTimestamp
          || '{relative} ({absolute})';
        return template.replace('{relative}', relative).replace('{absolute}', absolute);
      }
      const fallbackTemplate = langTexts.storageStatusTimestampAbsolute
        || texts.en?.storageStatusTimestampAbsolute
        || '{absolute}';
      return fallbackTemplate.replace('{absolute}', absolute);
    }

    function applyStorageStatus(element, info, lang, langTexts, hasAny) {
      if (!element) return;
      if (info && info.date instanceof Date && !Number.isNaN(info.date.getTime())) {
        const timeText = formatStatusTimestamp(info.date, lang, langTexts);
        const display = info.name
          ? (langTexts.storageStatusWithName || texts.en?.storageStatusWithName || '{name} — {time}')
            .replace('{name}', info.name)
            .replace('{time}', timeText)
          : timeText;
        element.textContent = display;
        if (display) {
          element.setAttribute('data-help', display);
        } else {
          element.removeAttribute('data-help');
        }
        const absolute = formatAbsoluteTimestamp(info.date, lang);
        if (absolute) {
          element.setAttribute('title', absolute);
        } else {
          element.removeAttribute('title');
        }
        return;
      }
      if (hasAny) {
        const fallback = langTexts.storageStatusStoredWithoutTimestamp
          || texts.en?.storageStatusStoredWithoutTimestamp
          || langTexts.storageStatusNever
          || texts.en?.storageStatusNever
          || '';
        element.textContent = fallback;
        if (fallback) {
          element.setAttribute('data-help', fallback);
        } else {
          element.removeAttribute('data-help');
        }
        element.removeAttribute('title');
        return;
      }
      const emptyText = langTexts.storageStatusNever
        || texts.en?.storageStatusNever
        || '';
      element.textContent = emptyText;
      if (emptyText) {
        element.setAttribute('data-help', emptyText);
      } else {
        element.removeAttribute('data-help');
      }
      element.removeAttribute('title');
    }

    const STORAGE_STATUS_STALE_PROJECT_MS = 1000 * 60 * 60 * 48;
    const STORAGE_STATUS_STALE_AUTO_MS = 1000 * 60 * 60 * 12;
    const STORAGE_STATUS_STALE_FULL_MS = 1000 * 60 * 60 * 24 * 7;
    const storageStatusReminderElement =
      typeof storageStatusReminder !== 'undefined'
        ? storageStatusReminder
        : typeof document !== 'undefined'
          ? document.getElementById('storageStatusReminder')
          : null;

    function resolveStatusText(langTexts, key, fallback = '') {
      if (langTexts && typeof langTexts[key] === 'string' && langTexts[key].trim()) {
        return langTexts[key];
      }
      if (texts.en && typeof texts.en[key] === 'string' && texts.en[key].trim()) {
        return texts.en[key];
      }
      return fallback;
    }

    const CONNECTIVITY_REASON_TEXT_KEYS = {
      offline: 'reloadAppOfflineNotice',
      'cache-fallback': 'offlineIndicatorReasonCacheFallback',
      'get-failed': 'offlineIndicatorReasonGetFailed',
      timeout: 'offlineIndicatorReasonTimeout',
      unreachable: 'offlineIndicatorReasonUnreachable',
      'reload-blocked': 'offlineIndicatorReasonReloadBlocked',
      default: 'offlineIndicatorReasonUnknown',
    };

    function resolveConnectivityReasonText(langTexts, reason) {
      const key = CONNECTIVITY_REASON_TEXT_KEYS[reason] || CONNECTIVITY_REASON_TEXT_KEYS.default;
      return resolveStatusText(langTexts, key);
    }

    function isValidTimestamp(date) {
      return date instanceof Date && !Number.isNaN(date.getTime());
    }

    function updateStorageStatusReminder(manualInfo, autoInfo, fullBackupInfo, lang, langTexts) {
      if (!storageStatusReminderElement) {
        return;
      }

      while (storageStatusReminderElement.firstChild) {
        storageStatusReminderElement.removeChild(storageStatusReminderElement.firstChild);
      }
      storageStatusReminderElement.classList.remove('storage-status-reminder--warning', 'storage-status-reminder--ok');

      const reminders = [];
      const now = Date.now();

      const manualDate = manualInfo && isValidTimestamp(manualInfo.date) ? manualInfo.date : null;
      const autoDate = autoInfo && isValidTimestamp(autoInfo.date) ? autoInfo.date : null;
      const fullBackupDate = fullBackupInfo && isValidTimestamp(fullBackupInfo.date)
        ? fullBackupInfo.date
        : null;
      const storageSummaryList = document.getElementById('storageSummaryList');

      const connectivityState = typeof window !== 'undefined' && window && typeof window.cineConnectivityStatus === 'object'
        ? window.cineConnectivityStatus
        : null;

      if (connectivityState) {
        const connectivityStatus = typeof connectivityState.status === 'string' ? connectivityState.status : null;
        if (connectivityStatus === 'offline' || connectivityStatus === 'degraded') {
          const connectivityReason = typeof connectivityState.reason === 'string' ? connectivityState.reason : null;
          const template = resolveStatusText(langTexts, 'storageStatusReminderConnectivity');
          if (template) {
            const reasonText = resolveConnectivityReasonText(langTexts, connectivityReason);
            const reminderText = template.replace('{reason}', reasonText || '').replace(/\s+/g, ' ').trim();
            if (reminderText) {
              reminders.push(reminderText);
            }
          }
        }
      }

      const manualTimeText = manualDate
        ? (formatStatusTimestamp(manualDate, lang, langTexts) || formatAbsoluteTimestamp(manualDate, lang))
        : '';
      const autoTimeText = autoDate
        ? (formatStatusTimestamp(autoDate, lang, langTexts) || formatAbsoluteTimestamp(autoDate, lang))
        : '';
      const fullTimeText = fullBackupDate
        ? (formatStatusTimestamp(fullBackupDate, lang, langTexts) || formatAbsoluteTimestamp(fullBackupDate, lang))
        : '';

      if (!manualInfo || manualInfo.hasAny !== true) {
        const text = resolveStatusText(langTexts, 'storageStatusReminderSaveProject');
        if (text) {
          reminders.push(text);
        }
      } else if (manualDate && now - manualDate.getTime() > STORAGE_STATUS_STALE_PROJECT_MS) {
        const template = resolveStatusText(langTexts, 'storageStatusReminderRefreshProject');
        if (template) {
          reminders.push(template.replace('{time}', manualTimeText));
        }
      }

      if (!autoInfo || autoInfo.hasAny !== true) {
        const text = resolveStatusText(langTexts, 'storageStatusReminderAutoBackupFirst');
        if (text) {
          reminders.push(text);
        }
      } else if (autoDate && now - autoDate.getTime() > STORAGE_STATUS_STALE_AUTO_MS) {
        const template = resolveStatusText(langTexts, 'storageStatusReminderAutoBackup');
        if (template) {
          reminders.push(template.replace('{time}', autoTimeText));
        }
      }

      if (!fullBackupInfo || fullBackupInfo.hasAny !== true) {
        const text = resolveStatusText(langTexts, 'storageStatusReminderFullBackupFirst');
        if (text) {
          reminders.push(text);
        }
      } else if (fullBackupDate && now - fullBackupDate.getTime() > STORAGE_STATUS_STALE_FULL_MS) {
        const template = resolveStatusText(langTexts, 'storageStatusReminderFullBackup');
        if (template) {
          reminders.push(template.replace('{time}', fullTimeText));
        }
      }

      if (reminders.length > 0) {
        const list = document.createElement('ul');
        list.className = 'storage-status-reminder-list';
        reminders.forEach((text) => {
          if (!text) {
            return;
          }
          const item = document.createElement('li');
          item.textContent = text;
          list.appendChild(item);
        });
        if (list.childElementCount > 0) {
          storageStatusReminderElement.appendChild(list);
          storageStatusReminderElement.classList.add('storage-status-reminder--warning');
          storageStatusReminderElement.removeAttribute('hidden');
          storageStatusReminderElement.setAttribute('data-help', list.textContent || reminders.join(' '));
          return;
        }
      }

      const okText = resolveStatusText(langTexts, 'storageStatusReminderUpToDate');
      if (okText) {
        const note = document.createElement('p');
        note.className = 'storage-status-reminder-text';
        note.textContent = okText;
        storageStatusReminderElement.appendChild(note);
        storageStatusReminderElement.classList.add('storage-status-reminder--ok');
        storageStatusReminderElement.removeAttribute('hidden');
        storageStatusReminderElement.setAttribute('data-help', okText);
        return;
      }

      storageStatusReminderElement.setAttribute('hidden', '');
      storageStatusReminderElement.removeAttribute('data-help');
    }

    function createSummaryItemElement(item) {
      const li = document.createElement('li');
      li.className = 'storage-summary-item';
      const header = document.createElement('div');
      header.className = 'storage-summary-header';
      const label = document.createElement('span');
      label.className = 'storage-summary-label';
      label.textContent = item.label;
      header.appendChild(label);
      if (item.storageKey) {
        const code = document.createElement('code');
        code.className = 'storage-summary-key';
        code.textContent = item.storageKey;
        header.appendChild(code);
      }
      li.appendChild(header);
      if (item.value) {
        const valueElem = document.createElement('p');
        valueElem.className = 'storage-summary-value';
        valueElem.textContent = item.value;
        li.appendChild(valueElem);
      }
      if (item.description) {
        const desc = document.createElement('p');
        desc.className = 'storage-summary-description';
        desc.textContent = item.description;
        li.appendChild(desc);
      }
      if (item.extra) {
        const extras = Array.isArray(item.extra) ? item.extra : [item.extra];
        extras.filter(Boolean).forEach((text) => {
          const extraElem = document.createElement('p');
          extraElem.className = 'storage-summary-extra';
          extraElem.textContent = text;
          li.appendChild(extraElem);
        });
      }
      return li;
    }

    function readCriticalStorageGuardResult() {
      const tryInvoke = (fn) => {
        if (typeof fn !== 'function') {
          return null;
        }
        try {
          return fn();
        } catch (invokeError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to read critical storage guard result', invokeError);
          }
          return null;
        }
      };

      const direct = (typeof getLastCriticalStorageGuardResult === 'function')
        ? tryInvoke(() => getLastCriticalStorageGuardResult())
        : null;
      if (direct && typeof direct === 'object') {
        return direct;
      }

      const scopeCandidates = [
        CORE_SHARED_SCOPE_PART2,
        CORE_SHARED_LOCAL,
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
      ];

      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || typeof scope !== 'object') {
          continue;
        }
        const candidate = scope.__cineCriticalStorageGuard || scope.cineCriticalStorageGuard;
        if (candidate && typeof candidate === 'object') {
          return candidate;
        }
      }

      return null;
    }

    function updateStorageSummary() {
      if (typeof document === 'undefined' || !document) {
        return;
      }
      const summaryListEl = document.getElementById('storageSummaryList');
      const storageSummaryEmpty = document.getElementById('storageSummaryEmpty');
      if (!summaryListEl) return;
      while (summaryListEl.firstChild) {
        summaryListEl.removeChild(summaryListEl.firstChild);
      }
      const lang = resolveLanguageCode(currentLang);
      const langTexts = getLanguageTexts(lang);
      const exportedData = typeof exportAllData === 'function' ? exportAllData() : null;
      const data = isPlainObjectValue(exportedData) ? exportedData : {};
      const setups = isPlainObjectValue(data.setups) ? data.setups : {};
      const projectNames = Object.keys(setups);
      const totalProjects = projectNames.length;
      const autoBackupNames = projectNames.filter((name) => isAutomaticBackupName(name));
      const autoBackups = autoBackupNames.length;
      const manualProjectNames = projectNames.filter((name) => typeof name === 'string' && !isAutomaticBackupName(name));
      const gearListCount = computeGearListCount(data.project, setups);
      const favoritesCount = computeFavoritesCount(data.favorites);
      const feedbackCount = computeFeedbackCount(data.feedback);
      const sessionData = data.session;
      const hasSession = Boolean(
        (isPlainObjectValue(sessionData) && Object.keys(sessionData).length)
        || (Array.isArray(sessionData) && sessionData.length)
        || (typeof sessionData === 'string' && sessionData.trim())
      );
      const deviceSummary = summarizeCustomDevices();
      const approxBytes = estimateBackupSize(data);
      const rawFullBackups = Array.isArray(data.fullBackupHistory)
        ? data.fullBackupHistory
        : Array.isArray(data.fullBackups)
          ? data.fullBackups
          : [];
      const fullBackupCount = rawFullBackups.reduce((count, entry) => {
        if (!entry) return count;
        if (typeof entry === 'string') {
          return entry.trim() ? count + 1 : count;
        }
        if (typeof entry === 'object') {
          const createdAt = typeof entry.createdAt === 'string' ? entry.createdAt.trim() : '';
          const iso = typeof entry.iso === 'string' ? entry.iso.trim() : '';
          const timestamp = typeof entry.timestamp === 'string' ? entry.timestamp.trim() : '';
          if (createdAt || iso || timestamp) {
            return count + 1;
          }
        }
        return count;
      }, 0);

      const manualInfo = extractLatestManualSetupInfo(setups);
      const autoInfo = extractLatestAutoBackupInfo(autoBackupNames);
      const fullBackupInfo = extractLatestFullBackupInfo(rawFullBackups);
      const guardResult = readCriticalStorageGuardResult();
      let guardValue = langTexts.storageIntegrityGuardStatus || 'Active';
      if (guardResult && typeof guardResult === 'object') {
        const ensuredCount = Array.isArray(guardResult.ensured) ? guardResult.ensured.length : 0;
        const errorCount = Array.isArray(guardResult.errors) ? guardResult.errors.length : 0;
        const missingCount = Array.isArray(guardResult.skipped)
          ? guardResult.skipped.filter((entry) => entry && entry.reason === 'missing').length
          : 0;

        if (errorCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusIssue || '{count} issue(s) — check console')
            .replace('{count}', String(errorCount));
        } else if (ensuredCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusCreated || 'Mirrored {count} key(s) this session')
            .replace('{count}', String(ensuredCount));
        } else if (missingCount > 0) {
          guardValue = (langTexts.storageIntegrityGuardStatusMissing || 'Waiting for first save')
            .replace('{count}', String(missingCount));
        } else if (langTexts.storageIntegrityGuardStatus) {
          guardValue = langTexts.storageIntegrityGuardStatus;
        }
      }

      const items = [
        {
          storageKey: 'cameraPowerPlanner_setups',
          label: langTexts.storageKeyProjects || 'Saved projects',
          value: formatCountText(lang, langTexts, 'storageProjectsCount', totalProjects),
          description: langTexts.storageKeyProjectsDesc || '',
        },
        {
          label: langTexts.storageKeyAutoBackups || 'Auto backups',
          value: formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups),
          description: langTexts.storageKeyAutoBackupsDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_project',
          label: langTexts.storageKeyGearLists || 'Gear list snapshots',
          value: formatCountText(lang, langTexts, 'storageGearListsCount', gearListCount),
          description: langTexts.storageKeyGearListsDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_devices',
          label: langTexts.storageKeyDevices || 'Custom or modified devices',
          value: formatCountText(lang, langTexts, 'storageDevicesCount', deviceSummary.total),
          description: langTexts.storageKeyDevicesDesc || '',
          extra: deviceSummary.total > 0 && deviceSummary.categories.length
            ? (langTexts.storageDeviceCategories || texts.en?.storageDeviceCategories || 'Affected categories: %s')
              .replace('%s', formatDeviceCategories(lang, deviceSummary.categories))
            : null,
        },
        {
          storageKey: 'cameraPowerPlanner_favorites',
          label: langTexts.storageKeyFavorites || 'Pinned favorites',
          value: formatCountText(lang, langTexts, 'storageFavoritesCount', favoritesCount),
          description: langTexts.storageKeyFavoritesDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_feedback',
          label: langTexts.storageKeyFeedback || 'Runtime feedback',
          value: formatCountText(lang, langTexts, 'storageFeedbackCount', feedbackCount),
          description: langTexts.storageKeyFeedbackDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_session',
          label: langTexts.storageKeySession || 'Unsaved session',
          value: hasSession
            ? langTexts.storageSessionStored || texts.en?.storageSessionStored || 'Stored'
            : langTexts.storageSessionNotStored || texts.en?.storageSessionNotStored || 'Not stored',
          description: langTexts.storageKeySessionDesc || '',
        },
        {
          storageKey: 'cameraPowerPlanner_fullBackups',
          label: langTexts.storageKeyFullBackups || 'Full app backups',
          value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
          description: langTexts.storageKeyFullBackupsDesc || '',
        },
        {
          label: langTexts.storageKeyIntegrityGuard || 'Backup guardian',
          value: guardValue,
          description: langTexts.storageKeyIntegrityGuardDesc || '',
        },
        {
          storageKey: 'localStorage',
          label: langTexts.storageKeyTotalSize || 'Approximate backup size',
          value: formatSizeText(lang, langTexts, approxBytes),
          description: langTexts.storageKeyTotalSizeDesc || '',
        },
      ];

      items.forEach((item) => {
        summaryListEl.appendChild(createSummaryItemElement(item));
      });

      applyStorageStatus(
        storageStatusLastProjectValue,
        manualInfo,
        lang,
        langTexts,
        manualProjectNames.length > 0,
      );
      applyStorageStatus(
        storageStatusLastAutoBackupValue,
        autoInfo,
        lang,
        langTexts,
        autoBackupNames.length > 0,
      );
      applyStorageStatus(
        storageStatusLastFullBackupValue,
        fullBackupInfo,
        lang,
        langTexts,
        fullBackupCount > 0,
      );

      updateStorageStatusReminder(
        manualInfo,
        autoInfo,
        fullBackupInfo,
        lang,
        langTexts,
      );


      if (storageSummaryEmpty) {
        const hasData = Boolean(
          totalProjects
          || gearListCount
          || deviceSummary.total
          || favoritesCount
          || feedbackCount
          || hasSession
          || fullBackupCount
        );
        if (hasData) {
          storageSummaryEmpty.setAttribute('hidden', '');
        } else {
          storageSummaryEmpty.removeAttribute('hidden');
        }
      }
    }

    const settingsLogoInput = resolveGlobalElement('settingsLogo', 'settingsLogo');
    if (settingsLogoInput) {
      settingsLogoInput.addEventListener('change', () => {
        const file = settingsLogoInput.files && settingsLogoInput.files[0];
        if (!file) {
          loadStoredLogoPreview();
          return;
        }
        if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
          showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
          settingsLogoInput.value = '';
          loadStoredLogoPreview();
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          renderSettingsLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
    var settingsHighContrast = document.getElementById("settingsHighContrast");
    const settingsReduceMotion = document.getElementById("settingsReduceMotion");
    const settingsRelaxedSpacing = document.getElementById("settingsRelaxedSpacing");
    var backupSettings = document.getElementById("backupSettings");
    var restoreSettings = document.getElementById("restoreSettings");
    var factoryResetButton = document.getElementById("factoryResetButton");
    var restoreSettingsInput = document.getElementById("restoreSettingsInput");
    const restoreRehearsalButton = document.getElementById("restoreRehearsalButton");
    const restoreRehearsalSection = document.getElementById("restoreRehearsalSection");
    const restoreRehearsalHeading = document.getElementById("restoreRehearsalHeading");
    const restoreRehearsalIntro = document.getElementById("restoreRehearsalIntro");
    const restoreRehearsalModeLabel = document.getElementById("restoreRehearsalModeLabel");
    const restoreRehearsalModeBackupText = document.getElementById("restoreRehearsalModeBackupText");
    const restoreRehearsalModeProjectText = document.getElementById("restoreRehearsalModeProjectText");
    const restoreRehearsalFileLabel = document.getElementById("restoreRehearsalFileLabel");
    const restoreRehearsalBrowse = document.getElementById("restoreRehearsalBrowse");
    const restoreRehearsalFileName = document.getElementById("restoreRehearsalFileName");
    const restoreRehearsalStatus = document.getElementById("restoreRehearsalStatus");
    const restoreRehearsalRuleHeading = document.getElementById("restoreRehearsalRuleHeading");
    const restoreRehearsalRuleIntro = document.getElementById("restoreRehearsalRuleIntro");
    const restoreRehearsalRuleEmpty = document.getElementById("restoreRehearsalRuleEmpty");
    const restoreRehearsalProceedButton = document.getElementById("restoreRehearsalProceed");
    const restoreRehearsalAbortButton = document.getElementById("restoreRehearsalAbort");
    const restoreRehearsalTable = document.getElementById("restoreRehearsalTable");
    const restoreRehearsalTableCaption = document.getElementById("restoreRehearsalTableCaption");
    const restoreRehearsalMetricHeader = document.getElementById("restoreRehearsalMetricHeader");
    const restoreRehearsalLiveHeader = document.getElementById("restoreRehearsalLiveHeader");
    const restoreRehearsalSandboxHeader = document.getElementById("restoreRehearsalSandboxHeader");
    const restoreRehearsalDifferenceHeader = document.getElementById("restoreRehearsalDifferenceHeader");
    const restoreRehearsalCloseButton = document.getElementById("restoreRehearsalClose");
    const projectBackupsHeading = document.getElementById("projectBackupsHeading");
    const projectBackupsDescription = document.getElementById("projectBackupsDescription");
    var settingsShowAutoBackups = document.getElementById("settingsShowAutoBackups");
    var backupDiffToggleButton = document.getElementById("backupDiffToggleButton");
    var backupDiffSection = document.getElementById("backupDiffSection");
    var backupDiffHeading = document.getElementById("backupDiffHeading");
    var backupDiffIntro = document.getElementById("backupDiffIntro");
    var backupDiffPrimaryLabel = document.getElementById("backupDiffPrimaryLabel");
    var backupDiffSecondaryLabel = document.getElementById("backupDiffSecondaryLabel");
    var backupDiffPrimarySelect = document.getElementById("backupDiffPrimary");
    var backupDiffSecondarySelect = document.getElementById("backupDiffSecondary");
    var backupDiffEmptyState = document.getElementById("backupDiffEmptyState");
    var backupDiffSummary = document.getElementById("backupDiffSummary");
    var backupDiffList = document.getElementById("backupDiffList");
    var backupDiffListContainer = document.getElementById("backupDiffListContainer");
    var backupDiffNotesLabel = document.getElementById("backupDiffNotesLabel");
    var backupDiffNotes = document.getElementById("backupDiffNotes");
    var backupDiffExportButton = document.getElementById("backupDiffExport");
    var backupDiffCloseButton = document.getElementById("backupDiffClose");
    const aboutVersionElem = document.getElementById("aboutVersion");
    const supportLink = document.getElementById("supportLink");
    var settingsSave = document.getElementById("settingsSave");
    var settingsCancel = document.getElementById("settingsCancel");
    var featureSearch =
      typeof document !== 'undefined' ? document.getElementById("featureSearch") : null;
    var featureSearchDropdown =
      typeof document !== 'undefined' ? document.getElementById("featureSearchDropdown") : null;
    var featureMap = new Map();
    var actionMap = new Map();
    const featureSearchEntryIndex = new Map();
    const FEATURE_SEARCH_HISTORY_STORAGE_KEY = 'featureSearchHistory';
    const MAX_FEATURE_SEARCH_HISTORY = 50;
    const MAX_FEATURE_SEARCH_RECENTS = 5;
    let featureSearchHistoryLoaded = false;
    let featureSearchHistoryLoadInProgress = false;
    let featureSearchHistoryLoadRetryTimer = null;
    const FEATURE_SEARCH_HISTORY_RETRY_DELAY = 1000;
    const featureSearchHistory = new Map();
    let featureSearchHistorySaveTimer = null;

    const getFeatureSearchHistoryStorage = () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage;
        }
        if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
          return globalThis.localStorage;
        }
      } catch (err) {
        console.warn('Feature search history storage unavailable', err);
      }
      return null;
    };

    const buildFeatureSearchHistoryKey = (id, type = 'feature') => {
      if (!id) return '';
      return `${type}:${id}`;
    };

    const scheduleFeatureSearchHistorySave = () => {
      if (featureSearchHistorySaveTimer != null) {
        return;
      }
      const storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.setItem !== 'function') {
        return;
      }
      featureSearchHistorySaveTimer = setTimeout(() => {
        featureSearchHistorySaveTimer = null;
        try {
          const data = Array.from(featureSearchHistory.values())
            .slice()
            .sort((a, b) => b.lastUsed - a.lastUsed)
            .map(item => ({
              key: item.id,
              type: item.type,
              count: item.count,
              lastUsed: item.lastUsed,
              label: item.label,
            }));
          storage.setItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.warn('Could not persist feature search history', error);
        }
      }, 200);
    };

    const trimFeatureSearchHistory = () => {
      if (featureSearchHistory.size <= MAX_FEATURE_SEARCH_HISTORY) return;
      const entries = Array.from(featureSearchHistory.entries()).sort((a, b) => a[1].lastUsed - b[1].lastUsed);
      const excess = entries.length - MAX_FEATURE_SEARCH_HISTORY;
      for (let i = 0; i < excess; i += 1) {
        featureSearchHistory.delete(entries[i][0]);
      }
    };

    const resetFeatureSearchHistoryRetryTimer = () => {
      if (!featureSearchHistoryLoadRetryTimer) return;
      if (typeof clearTimeout === 'function') {
        clearTimeout(featureSearchHistoryLoadRetryTimer);
      }
      featureSearchHistoryLoadRetryTimer = null;
    };

    const scheduleFeatureSearchHistoryRetry = () => {
      // Retry reads after a short delay when storage temporarily refuses access.
      // This protects offline data integrity without hammering storage repeatedly.
      if (featureSearchHistoryLoadRetryTimer || typeof setTimeout !== 'function') {
        return;
      }
      featureSearchHistoryLoadRetryTimer = setTimeout(() => {
        featureSearchHistoryLoadRetryTimer = null;
        featureSearchHistoryLoadInProgress = false;
        loadFeatureSearchHistory();
      }, FEATURE_SEARCH_HISTORY_RETRY_DELAY);
    };

    const loadFeatureSearchHistory = () => {
      if (featureSearchHistoryLoaded || featureSearchHistoryLoadInProgress) {
        // Short-circuit once a stable snapshot has been read, while still allowing
        // retries to run if a previous attempt failed and scheduled a reload.
        return;
      }
      featureSearchHistoryLoadInProgress = true;
      const storage = getFeatureSearchHistoryStorage();
      if (!storage || typeof storage.getItem !== 'function') {
        featureSearchHistoryLoadInProgress = false;
        scheduleFeatureSearchHistoryRetry();
        return;
      }
      let raw = null;
      try {
        raw = storage.getItem(FEATURE_SEARCH_HISTORY_STORAGE_KEY);
      } catch (err) {
        featureSearchHistoryLoadInProgress = false;
        featureSearchHistoryLoaded = false;
        console.warn('Could not read feature search history', err);
        scheduleFeatureSearchHistoryRetry();
        return;
      }
      featureSearchHistoryLoadInProgress = false;
      featureSearchHistoryLoaded = true;
      resetFeatureSearchHistoryRetryTimer();
      if (!raw) return;
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.warn('Invalid feature search history payload', err);
        return;
      }
      if (!Array.isArray(parsed)) return;
      parsed.forEach(item => {
        if (!item || typeof item !== 'object') return;
        const id = typeof item.id === 'string'
          ? item.id
          : typeof item.key === 'string'
            ? item.key
            : null;
        const type = typeof item.type === 'string' ? item.type : 'feature';
        const combinedKey = buildFeatureSearchHistoryKey(id, type);
        if (!combinedKey) return;
        const count = Number.isFinite(item.count) && item.count > 0
          ? Math.min(Math.floor(item.count), 1_000_000)
          : 0;
        const lastUsed = Number.isFinite(item.lastUsed) ? item.lastUsed : 0;
        const label = typeof item.label === 'string' ? item.label : '';
        featureSearchHistory.set(combinedKey, {
          key: combinedKey,
          id,
          type,
          count,
          lastUsed,
          label,
        });
      });
      trimFeatureSearchHistory();
    };

    const cleanupFeatureSearchHistory = () => {
      let changed = false;
      for (const key of featureSearchHistory.keys()) {
        if (!featureSearchEntryIndex.has(key)) {
          featureSearchHistory.delete(key);
          changed = true;
        }
      }
      if (changed) {
        scheduleFeatureSearchHistorySave();
      }
    };

    const getFeatureSearchHistoryData = (key, type) => {
      if (!key) return null;
      loadFeatureSearchHistory();
      const combinedKey = buildFeatureSearchHistoryKey(key, type);
      return featureSearchHistory.get(combinedKey) || null;
    };

    const registerFeatureSearchUsage = (id, type = 'feature', label = '') => {
      if (!id) return;
      loadFeatureSearchHistory();
      const normalizedType = typeof type === 'string' && type ? type : 'feature';
      const combinedKey = buildFeatureSearchHistoryKey(id, normalizedType);
      const now = Date.now ? Date.now() : new Date().getTime();
      const existing = featureSearchHistory.get(combinedKey);
      const next = {
        key: combinedKey,
        id,
        type: normalizedType,
        count: existing ? Math.min(existing.count + 1, 1_000_000) : 1,
        lastUsed: now,
        label: label || existing?.label || '',
      };
      featureSearchHistory.set(combinedKey, next);
      trimFeatureSearchHistory();
      scheduleFeatureSearchHistorySave();
    };

    const resolveRecentFeatureSearchOptions = () => {
      const recentEntries = resolveRecentFeatureSearchEntries();
      if (!recentEntries.length) return [];
      const options = [];
      const seen = new Set();
      for (const entry of recentEntries) {
        const option = buildFeatureSearchOptionData(entry);
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        options.push(option);
        if (options.length >= MAX_FEATURE_SEARCH_RECENTS) break;
      }
      return options;
    };

    const resolveRecentFeatureSearchEntries = () => {
      loadFeatureSearchHistory();
      if (!featureSearchHistory.size) return [];
      const entries = Array.from(featureSearchHistory.values())
        .slice()
        .sort((a, b) => b.lastUsed - a.lastUsed);
      const results = [];
      const seen = new Set();
      for (const item of entries) {
        if (!item || !item.key) continue;
        if (seen.has(item.key)) continue;
        seen.add(item.key);
        const entry = featureSearchEntryIndex.get(item.key);
        if (!entry) continue;
        results.push(entry);
        if (results.length >= MAX_FEATURE_SEARCH_HISTORY) break;
      }
      return results;
    };

    const createDefaultSearchNormalizer = () => {
      /* eslint-disable no-control-regex, no-misleading-character-class */
      const ZERO_WIDTH_SPACES_PATTERN = /[\u200B\u200C\u200D\u2060]/g;
      const SPACE_VARIANTS_PATTERN = /[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;
      const COMBINING_MARKS_PATTERN = /[\u0300-\u036F]/g;
      const DASH_VARIANTS_PATTERN = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;
      const APOSTROPHE_VARIANTS_PATTERN = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
      const QUOTE_VARIANTS_PATTERN = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
      const SLASH_VARIANTS_PATTERN = /[\u2044\u2215]/g;
      const MULTIPLY_VARIANTS_PATTERN = /[×✕✖✗✘]/g;
      const DEGREE_VARIANTS_PATTERN = /[°º˚]/g;
      const ELLIPSIS_PATTERN = /[\u2026]/g;
      const TRADEMARK_PATTERN = /[\u00AE\u2122]/g;
      const GENERAL_PUNCTUATION_PATTERN = /[!#$%()*,:;<=>?@[\]^{|}~._]/g;
      /* eslint-enable no-control-regex, no-misleading-character-class */
      const ligatureEntries = [
        ['ß', 'ss'],
        ['æ', 'ae'],
        ['œ', 'oe'],
        ['ø', 'o'],
        ['þ', 'th'],
        ['ð', 'd'],
        ['đ', 'd'],
        ['ħ', 'h'],
        ['ı', 'i'],
        ['ĳ', 'ij'],
        ['ŋ', 'ng'],
        ['ł', 'l'],
        ['ſ', 's'],
      ];

      return value => {
        if (typeof value !== 'string') {
          return '';
        }

        let normalized = value.replace(ZERO_WIDTH_SPACES_PATTERN, '');

        if (typeof normalized.normalize === 'function') {
          try {
            normalized = normalized.normalize('NFKD');
          } catch (error) {
            void error;
          }
        }

        normalized = normalized
          .replace(SPACE_VARIANTS_PATTERN, ' ')
          .replace(APOSTROPHE_VARIANTS_PATTERN, ' ')
          .replace(QUOTE_VARIANTS_PATTERN, ' ')
          .replace(DASH_VARIANTS_PATTERN, ' ')
          .replace(SLASH_VARIANTS_PATTERN, ' ')
          .replace(MULTIPLY_VARIANTS_PATTERN, ' x ')
          .replace(DEGREE_VARIANTS_PATTERN, ' deg ')
          .replace(/\bdegrees?\b/gi, ' deg ')
          .replace(/&/g, ' and ')
          .replace(/\+/g, ' plus ')
          .replace(/@/g, ' at ')
          .replace(TRADEMARK_PATTERN, ' ')
          .replace(ELLIPSIS_PATTERN, ' ')
          .replace(GENERAL_PUNCTUATION_PATTERN, ' ');

        normalized = normalized.toLowerCase().replace(COMBINING_MARKS_PATTERN, '');

        for (let index = 0; index < ligatureEntries.length; index += 1) {
          const [source, replacement] = ligatureEntries[index];
          normalized = normalized.replace(new RegExp(source, 'g'), replacement);
        }

        normalized = normalized
          .replace(/['"`]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        return normalized;
      };
    };

    const fallbackNormalizeSearchValue = createDefaultSearchNormalizer();

    const normalizeSearchValue = value => {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.normalizeSearchValue === 'function') {
          return featureSearchModuleApi.normalizeSearchValue(value);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('normalizeSearchValue() failed', error);
        }
      }
      return fallbackNormalizeSearchValue(value);
    };
    safeExposeCoreRuntimeConstant('normalizeSearchValue', normalizeSearchValue);
    const FEATURE_SEARCH_EXTRA_SELECTOR = '[data-feature-search]';

    const FEATURE_SEARCH_TYPE_LABEL_KEYS = {
      feature: 'featureSearchTypeFeature',
      action: 'featureSearchTypeAction',
      device: 'featureSearchTypeDevice',
      help: 'featureSearchTypeHelp'
    };

    const getFeatureSearchEntryType = element => {
      if (!element) return 'feature';
      const explicit =
        element.dataset?.featureSearchType ||
        element.getAttribute('data-feature-search-type');
      if (explicit && explicit.trim()) {
        return explicit.trim().toLowerCase();
      }
      const tagName = element.tagName ? element.tagName.toLowerCase() : '';
      const role = element.getAttribute('role')?.toLowerCase() || '';
      if (tagName === 'button') return 'action';
      if (tagName === 'a' && element.hasAttribute('href')) return 'action';
      if (tagName === 'input') {
        const type = element.getAttribute('type')?.toLowerCase();
        if (type && ['button', 'submit', 'reset', 'image'].includes(type)) {
          return 'action';
        }
      }
      if (role === 'button' || role === 'menuitem') return 'action';
      return 'feature';
    };

    const getFeatureSearchLabel = element => {
      if (!element) return '';
      const { dataset } = element;
      const dataLabel = dataset?.featureSearchLabel || element.getAttribute('data-feature-search-label');
      if (dataLabel && dataLabel.trim()) return dataLabel.trim();
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();
      const title = element.getAttribute('title');
      if (title && title.trim()) return title.trim();
      const text = element.textContent;
      return text && text.trim() ? text.trim() : '';
    };

    const getFeatureSearchKeywords = element => {
      if (!element) return '';
      const { dataset } = element;
      const dataValue = dataset?.featureSearchKeywords || element.getAttribute('data-feature-search-keywords');
      return dataValue && dataValue.trim() ? dataValue.trim() : '';
    };

    var updateFeatureSearchValue = (newValue, originalNormalized) => {
      if (!featureSearch || typeof newValue !== 'string') return;
      const trimmed = newValue.trim();
      if (!trimmed) {
        featureSearch.value = '';
        restoreFeatureSearchDefaults();
        return;
      }
      if (originalNormalized && trimmed.toLowerCase() === originalNormalized) {
        return;
      }
      featureSearch.value = newValue;
      restoreFeatureSearchDefaults();
    };
    var helpMap = new Map();
    var deviceMap = new Map();
    var runFeatureSearch = () => { };

    var featureSearchEntries = [];
    var featureSearchDefaultOptions = [];
    var recordFeatureSearchUsage = (id, type, label) => {
      registerFeatureSearchUsage(id, type, label);
    };

    let featureSearchHighlightTokens = [];

    const sanitizeFeatureSearchHighlightTokens = tokens => {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.sanitizeHighlightTokens === 'function') {
          return featureSearchModuleApi.sanitizeHighlightTokens(tokens);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('sanitizeFeatureSearchHighlightTokens() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.sanitizeHighlightTokens(tokens);
    };

    const updateFeatureSearchHighlightTokens = tokens => {
      featureSearchHighlightTokens = sanitizeFeatureSearchHighlightTokens(tokens);
    };

    const collectFeatureSearchHighlightRanges = (text, tokens) => {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.collectHighlightRanges === 'function') {
          return featureSearchModuleApi.collectHighlightRanges(text, tokens);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('collectFeatureSearchHighlightRanges() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.collectHighlightRanges(text, tokens);
    };

    const applyFeatureSearchHighlight = (element, text) => {
      const tokens = featureSearchHighlightTokens;
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.applyHighlight === 'function') {
          featureSearchModuleApi.applyHighlight(element, text, tokens);
          return;
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('applyFeatureSearchHighlight() failed', error);
        }
      }
      fallbackFeatureSearchModuleApi.applyHighlight(element, text, tokens);
    };

    const normalizeFeatureSearchDetail = text => {
      try {
        if (featureSearchModuleApi && typeof featureSearchModuleApi.normalizeDetail === 'function') {
          return featureSearchModuleApi.normalizeDetail(text);
        }
      } catch (error) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn('normalizeFeatureSearchDetail() failed', error);
        }
      }
      return fallbackFeatureSearchModuleApi.normalizeDetail(text);
    };

    const featureSearchOptionIdMap = new Map();
    const featureSearchOptionIdRegistry = new Set();
    let featureSearchOptionIdSequence = 0;

    const sanitizeFeatureSearchOptionIdValue = value => {
      if (value == null) return '';
      let normalized = String(value).trim();
      if (!normalized) return '';
      if (typeof normalized.normalize === 'function') {
        try {
          normalized = normalized.normalize('NFKD');
        } catch (featureSearchNormalizeError) {
          void featureSearchNormalizeError;
        }
      }
      normalized = normalized.replace(/[\u0300-\u036f]/g, '');
      normalized = normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return normalized.replace(/^-+|-+$/g, '');
    };

    const getFeatureSearchOptionId = value => {
      const key = value == null ? '' : String(value);
      const existing = featureSearchOptionIdMap.get(key);
      if (existing) {
        return existing;
      }
      const sanitizedBase = sanitizeFeatureSearchOptionIdValue(key);
      let baseId = sanitizedBase ? `featureSearchOption-${sanitizedBase}` : '';
      if (!baseId) {
        featureSearchOptionIdSequence += 1;
        baseId = `featureSearchOption-generated-${featureSearchOptionIdSequence}`;
      }
      let candidate = baseId;
      let suffix = 1;
      while (featureSearchOptionIdRegistry.has(candidate)) {
        candidate = `${baseId}-${suffix}`;
        suffix += 1;
      }
      featureSearchOptionIdRegistry.add(candidate);
      featureSearchOptionIdMap.set(key, candidate);
      return candidate;
    };

    const buildFeatureSearchOptionData = entry => {
      if (!entry) return null;
      const value = typeof entry === 'string' ? entry : entry.display;
      if (!value) return null;
      const baseLabel =
        typeof entry === 'string'
          ? entry
          : entry.optionLabel || entry.display || '';

      const detail =
        typeof entry === 'object' && entry !== null
          ? normalizeFeatureSearchDetail(entry.detail)
          : '';

      // Simplify label: remove type prefix to reduce noise
      let label = baseLabel || value;

      if (detail) {
        label = `${label} — ${detail}`;
      }
      const id = getFeatureSearchOptionId(value);
      const optionKey = typeof entry === 'object' && entry !== null ? entry.key || '' : '';
      const optionType = typeof entry === 'object' && entry !== null ? entry.type || 'feature' : 'feature';
      const baseOption = {
        value,
        label: label || value,
        id,
        entry,
        entryKey: optionKey,
        entryType: optionType,
      };
      if (!label || label === value) {
        return baseOption;
      }
      return baseOption;
    };

    const normalizeFeatureSearchOption = value => {
      if (!value) return null;
      if (typeof value === 'object') {
        const optionValue = value.value || value.display || '';
        if (!optionValue) return null;
        const optionLabel = value.label || value.optionLabel || optionValue;
        const optionId = typeof value.id === 'string' && value.id.trim()
          ? value.id.trim()
          : getFeatureSearchOptionId(optionValue);
        return {
          value: optionValue,
          label: optionLabel,
          id: optionId,
          entry: value.entry,
          entryKey: value.entryKey,
          entryType: value.entryType,
        };
      }
      if (typeof value === 'string') {
        return { value, label: value, id: getFeatureSearchOptionId(value) };
      }
      return null;
    };

    const getFeatureSearchContainer = () => {
      if (!featureSearchDropdown || typeof featureSearchDropdown.closest !== 'function') {
        return null;
      }
      return featureSearchDropdown.closest('.feature-search');
    };

    const setFeatureSearchDropdownOpenClass = open => {
      const container = getFeatureSearchContainer();
      if (!container) return;
      if (open) {
        container.classList.add('feature-search-open');
      } else {
        container.classList.remove('feature-search-open');
      }
    };

    const renderFeatureSearchDropdown = options => {
      if (!featureSearchDropdown) return;
      featureSearchDropdown.innerHTML = '';

      const optionEntryMap =
        featureSearchDropdown.__optionEntries instanceof Map
          ? featureSearchDropdown.__optionEntries
          : new Map();
      optionEntryMap.clear();
      featureSearchDropdown.__optionEntries = optionEntryMap;

      if (!Array.isArray(options) || options.length === 0) {
        featureSearchDropdown.dataset.count = '0';
        featureSearchDropdown.dataset.open = 'false';
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
        return;
      }

      const list = document.createElement('div');
      list.className = 'feature-search-dropdown-list';

      options.forEach((option, index) => {
        if (!option || !option.value) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'feature-search-option';
        const optionId = option.id || getFeatureSearchOptionId(option.value);
        if (optionId) {
          button.id = optionId;
        }
        button.setAttribute('role', 'option');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        button.setAttribute('data-value', option.value);
        if (option.entryKey) {
          button.setAttribute('data-entry-key', option.entryKey);
        }
        if (option.entryType) {
          button.setAttribute('data-entry-type', option.entryType);
        }
        button.setAttribute('aria-label', option.label || option.value);
        button.setAttribute('aria-selected', 'false');

        if (optionId) {
          optionEntryMap.set(optionId, option.entry || null);
        }

        // Icon
        const entryValue = option.entry && typeof option.entry === 'object' ? option.entry.value : null;
        const iconGlyph = entryValue && entryValue.icon ? entryValue.icon : null;

        if (iconGlyph) {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'feature-search-option-icon';
          applyIconGlyph(iconSpan, iconGlyph);
          button.appendChild(iconSpan);
        }

        // Content Wrapper
        const contentDiv = document.createElement('div');
        contentDiv.className = 'feature-search-option-content';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'feature-search-option-label';
        const labelText = option.label || option.value;
        applyFeatureSearchHighlight(labelSpan, labelText);
        contentDiv.appendChild(labelSpan);

        const normalizedLabel = (labelText || '').trim().toLowerCase();
        const normalizedValue = option.value.trim().toLowerCase();
        if (normalizedValue && normalizedLabel && normalizedValue !== normalizedLabel) {
          const valueSpan = document.createElement('span');
          valueSpan.className = 'feature-search-option-value';
          applyFeatureSearchHighlight(valueSpan, option.value);
          contentDiv.appendChild(valueSpan);
        }

        button.appendChild(contentDiv);
        list.appendChild(button);
      });

      featureSearchDropdown.appendChild(list);
      featureSearchDropdown.dataset.count = String(options.length);
      featureSearchDropdown.dataset.activeIndex = '';

      if (featureSearchDropdown.dataset.open === 'true') {
        featureSearchDropdown.hidden = false;
        featureSearchDropdown.setAttribute('aria-expanded', 'true');
        setFeatureSearchDropdownOpenClass(true);
      } else {
        featureSearchDropdown.hidden = true;
        featureSearchDropdown.setAttribute('aria-expanded', 'false');
        setFeatureSearchDropdownOpenClass(false);
      }
    };

    const renderFeatureListOptions = values => {
      if (!Array.isArray(values)) {
        renderFeatureSearchDropdown([]);
        return;
      }

      const normalized = [];

      for (const value of values) {
        const optionData = normalizeFeatureSearchOption(value);
        if (!optionData || !optionData.value) continue;
        normalized.push(optionData);
      }

      renderFeatureSearchDropdown(normalized);
    };

    const FEATURE_SEARCH_MAX_RESULTS = 40;

    function restoreFeatureSearchDefaults() {
      updateFeatureSearchHighlightTokens([]);
      const values = [];
      const seen = new Set();
      const recentOptions = resolveRecentFeatureSearchOptions();
      for (const option of recentOptions) {
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        values.push(option);
      }
      for (const option of featureSearchDefaultOptions) {
        if (!option || !option.value || seen.has(option.value)) continue;
        seen.add(option.value);
        values.push(option);
      }
      renderFeatureListOptions(values.length ? values : featureSearchDefaultOptions);
    }

    const FEATURE_SEARCH_MATCH_PRIORITIES = {
      none: 0,
      fuzzy: 1,
      partial: 2,
      keySubset: 3,
      keyPrefix: 4,
      token: 5,
      exactKey: 6
    };

    const FEATURE_SEARCH_TYPE_PRIORITIES = {
      feature: 8,
      action: 10,
      device: 6,
      help: 1
    };

    const FEATURE_SEARCH_FILTER_ALIASES = new Map([
      ['feature', 'feature'],
      ['features', 'feature'],
      ['setting', 'feature'],
      ['settings', 'feature'],
      ['action', 'action'],
      ['actions', 'action'],
      ['command', 'action'],
      ['commands', 'action'],
      ['device', 'device'],
      ['devices', 'device'],
      ['gear', 'device'],
      ['equipment', 'device'],
      ['help', 'help'],
      ['doc', 'help'],
      ['docs', 'help'],
      ['guide', 'help'],
      ['guides', 'help'],
      ['support', 'help'],
      ['recent', 'recent'],
      ['recents', 'recent'],
      ['recently', 'recent'],
      ['history', 'recent'],
      ['histories', 'recent'],
      ['frequent', 'recent'],
      ['frequently', 'recent']
    ]);

    const FEATURE_SEARCH_FILTER_STRIP_PATTERN = /^[\s:> /=\-?,.]+/;

    const FEATURE_SEARCH_SMART_QUOTE_PATTERN = /[“”„«»]/g;

    const FEATURE_SEARCH_STOP_WORDS = new Set([
      'how',
      'do',
      'does',
      'did',
      'done',
      'doing',
      'can',
      'cant',
      'cannot',
      'should',
      'could',
      'would',
      'please',
      'need',
      'needs',
      'needing',
      'want',
      'wants',
      'wanting',
      'i',
      'im',
      'ive',
      'ill',
      'id',
      'we',
      'were',
      'weve',
      'well',
      'you',
      'youre',
      'youve',
      'youll',
      'they',
      'theyre',
      'theyve',
      'them',
      'us',
      'me',
      'my',
      'mine',
      'our',
      'ours',
      'your',
      'yours',
      'their',
      'theirs',
      'the',
      'and',
      'for',
      'with',
      'about',
      'what',
      'where',
      'when',
      'why',
      'which',
      'who',
      'whom',
      'whose',
      'this',
      'that',
      'these',
      'those',
      'also',
      'still',
      'really',
      'very',
      'just',
      'maybe',
      'perhaps',
      'again'
    ]);

    const FEATURE_SEARCH_STOP_WORD_MIN_LENGTH = 3;

    const filterFeatureSearchQueryTokens = tokens => {
      if (!Array.isArray(tokens) || tokens.length === 0) {
        return [];
      }

      const filtered = tokens.filter(token => {
        if (!token) {
          return false;
        }

        const normalizedToken = typeof token === 'string'
          ? token.trim().toLowerCase()
          : String(token).trim().toLowerCase();

        if (!normalizedToken) {
          return false;
        }

        const isStopWord = FEATURE_SEARCH_STOP_WORDS.has(normalizedToken);

        if (normalizedToken.length < FEATURE_SEARCH_STOP_WORD_MIN_LENGTH) {
          return !isStopWord;
        }

        return !isStopWord;
      });

      return filtered.length > 0 ? filtered : tokens.filter(Boolean);
    };

    const normalizeFeatureSearchQuotes = value =>
      typeof value === 'string'
        ? value.replace(FEATURE_SEARCH_SMART_QUOTE_PATTERN, '"')
        : '';

    const extractFeatureSearchQuotedPhrases = query => {
      if (typeof query !== 'string') {
        return [];
      }
      const normalized = normalizeFeatureSearchQuotes(query);
      if (!normalized) {
        return [];
      }
      const phrases = [];
      const regex = /"([^"]+)"/g;
      let match;
      while ((match = regex.exec(normalized))) {
        const phrase = (match[1] || '').trim();
        if (phrase.length < 2) {
          continue;
        }
        phrases.push(phrase);
      }
      return phrases;
    };

    const extractFeatureSearchFilter = query => {
      if (typeof query !== 'string') {
        return { filterType: null, queryText: '' };
      }
      const trimmed = query.trim();
      if (!trimmed) {
        return { filterType: null, queryText: '' };
      }
      const match = trimmed.match(/^([a-z]+)/i);
      if (!match) {
        return { filterType: null, queryText: trimmed };
      }
      const alias = match[1].toLowerCase();
      const filterType = FEATURE_SEARCH_FILTER_ALIASES.get(alias) || null;
      if (!filterType) {
        return { filterType: null, queryText: trimmed };
      }
      const remainderRaw = trimmed.slice(match[0].length);
      if (!remainderRaw) {
        return { filterType, queryText: '' };
      }
      const remainder = remainderRaw.replace(FEATURE_SEARCH_FILTER_STRIP_PATTERN, '').trim();
      return { filterType, queryText: remainder };
    };

    function scoreFeatureSearchEntry(entry, queryKey, queryTokens, rawQueryText, quotedPhrases = []) {
      if (!entry || !entry.key) return null;
      const display = entry.display;
      if (!display) return null;
      const entryKey = entry.key;
      const entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
      const primaryTokens = Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [];
      const validQueryTokens = Array.isArray(queryTokens)
        ? queryTokens.filter(Boolean)
        : [];
      const tokenDetails = validQueryTokens.length
        ? computeTokenMatchDetails(entryTokens, validQueryTokens)
        : { score: 0, matched: 0 };
      const primaryTokenDetails = validQueryTokens.length
        ? computeTokenMatchDetails(primaryTokens, validQueryTokens)
        : { score: 0, matched: 0 };
      const entryType = entry.type || 'feature';
      const history = getFeatureSearchHistoryData(entryKey, entryType);
      const historyCount = history?.count || 0;
      const historyLastUsed = history?.lastUsed || 0;
      const queryTokenCount = validQueryTokens.length;
      const allTokensMatched =
        queryTokenCount > 0 && tokenDetails.matched >= queryTokenCount;
      const phraseDetails = computePhraseMatchDetails(entry, validQueryTokens, rawQueryText);
      const quotedPhraseDetails = computeQuotedPhraseMatchDetails(entry, quotedPhrases);
      const labelMatchDetails = computeLabelMatchDetails(entry, rawQueryText);
      const nowTimestamp = typeof Date === 'function' && typeof Date.now === 'function'
        ? Date.now()
        : new Date().getTime();
      const historyBoostScore = computeHistoryBoostScore(
        historyCount,
        historyLastUsed,
        nowTimestamp
      );

      let bestType = 'none';
      let bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
      let fuzzyDistance = Number.POSITIVE_INFINITY;
      const updateType = type => {
        const priority = FEATURE_SEARCH_MATCH_PRIORITIES[type] || FEATURE_SEARCH_MATCH_PRIORITIES.none;
        if (priority > bestPriority) {
          bestType = type;
          bestPriority = priority;
        }
      };

      if (queryKey) {
        if (entryKey === queryKey) {
          updateType('exactKey');
        }
        if (entryKey.startsWith(queryKey)) {
          updateType('keyPrefix');
        }
        if (queryKey.startsWith(entryKey)) {
          updateType('keySubset');
        }
        if (entryKey.includes(queryKey) || queryKey.includes(entryKey)) {
          updateType('partial');
        }
      }

      if (tokenDetails.score > 0) {
        updateType('token');
      }

      if (bestPriority === FEATURE_SEARCH_MATCH_PRIORITIES.none && queryKey && entryKey) {
        const distance = computeLevenshteinDistance(entryKey, queryKey);
        if (isAcceptableFuzzyMatch(entryKey, queryKey, distance)) {
          fuzzyDistance = distance;
          updateType('fuzzy');
        }
      }

      return {
        entry,
        entryType,
        typePriority: FEATURE_SEARCH_TYPE_PRIORITIES[entryType] || 0,
        allTokensMatched,
        matchType: bestType,
        priority: bestPriority,
        tokenScore: tokenDetails.score,
        tokenMatches: tokenDetails.matched,
        primaryTokenScore: primaryTokenDetails.score,
        primaryTokenMatches: primaryTokenDetails.matched,
        phraseScore: phraseDetails.score,
        phraseMatched: phraseDetails.matched,
        fuzzyDistance,
        keyDistance: queryKey
          ? Math.abs(entryKey.length - queryKey.length)
          : Number.POSITIVE_INFINITY,
        keyLength: entryKey.length,
        historyCount,
        historyLastUsed,
        labelMatchLevel: labelMatchDetails.level,
        labelMatchScore: labelMatchDetails.score,
        historyBoostScore,
        quotedPhraseScore: quotedPhraseDetails.score,
        quotedPhraseMatches: quotedPhraseDetails.matched
      };
    }

    const compareFeatureSearchCandidates = (a, b) => {
      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;
      if (b.priority !== a.priority) return b.priority - a.priority;
      // Prioritise by type (Action > Feature > Device > Help) immediately after match quality
      if (b.typePriority !== a.typePriority) return b.typePriority - a.typePriority;
      if (Number(b.allTokensMatched) !== Number(a.allTokensMatched)) {
        return Number(b.allTokensMatched) - Number(a.allTokensMatched);
      }
      const aLabelLevel = typeof a.labelMatchLevel === 'number' ? a.labelMatchLevel : 0;
      const bLabelLevel = typeof b.labelMatchLevel === 'number' ? b.labelMatchLevel : 0;
      if (bLabelLevel !== aLabelLevel) {
        return bLabelLevel - aLabelLevel;
      }
      const aLabelScore = typeof a.labelMatchScore === 'number' ? a.labelMatchScore : 0;
      const bLabelScore = typeof b.labelMatchScore === 'number' ? b.labelMatchScore : 0;
      if (bLabelScore !== aLabelScore) {
        return bLabelScore - aLabelScore;
      }
      const aPhraseScore = typeof a.phraseScore === 'number' ? a.phraseScore : 0;
      const bPhraseScore = typeof b.phraseScore === 'number' ? b.phraseScore : 0;
      if (bPhraseScore !== aPhraseScore) {
        return bPhraseScore - aPhraseScore;
      }
      if (Number(b.phraseMatched) !== Number(a.phraseMatched)) {
        return Number(b.phraseMatched) - Number(a.phraseMatched);
      }
      const aQuotedMatches = typeof a.quotedPhraseMatches === 'number' ? a.quotedPhraseMatches : 0;
      const bQuotedMatches = typeof b.quotedPhraseMatches === 'number' ? b.quotedPhraseMatches : 0;
      if (bQuotedMatches !== aQuotedMatches) {
        return bQuotedMatches - aQuotedMatches;
      }
      const aQuotedScore = typeof a.quotedPhraseScore === 'number' ? a.quotedPhraseScore : 0;
      const bQuotedScore = typeof b.quotedPhraseScore === 'number' ? b.quotedPhraseScore : 0;
      if (bQuotedScore !== aQuotedScore) {
        return bQuotedScore - aQuotedScore;
      }
      const aPrimaryScore = typeof a.primaryTokenScore === 'number' ? a.primaryTokenScore : 0;
      const bPrimaryScore = typeof b.primaryTokenScore === 'number' ? b.primaryTokenScore : 0;
      if (bPrimaryScore !== aPrimaryScore) {
        return bPrimaryScore - aPrimaryScore;
      }
      const aPrimaryMatches = typeof a.primaryTokenMatches === 'number' ? a.primaryTokenMatches : 0;
      const bPrimaryMatches = typeof b.primaryTokenMatches === 'number' ? b.primaryTokenMatches : 0;
      if (bPrimaryMatches !== aPrimaryMatches) {
        return bPrimaryMatches - aPrimaryMatches;
      }
      if (b.tokenScore !== a.tokenScore) return b.tokenScore - a.tokenScore;
      if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches;
      const aHistoryBoost = typeof a.historyBoostScore === 'number' ? a.historyBoostScore : 0;
      const bHistoryBoost = typeof b.historyBoostScore === 'number' ? b.historyBoostScore : 0;
      if (bHistoryBoost !== aHistoryBoost) {
        return bHistoryBoost - aHistoryBoost;
      }
      if (b.typePriority !== a.typePriority) return b.typePriority - a.typePriority;
      if (b.historyCount !== a.historyCount) return b.historyCount - a.historyCount;
      if (b.historyLastUsed !== a.historyLastUsed) {
        return b.historyLastUsed - a.historyLastUsed;
      }
      if (
        a.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy &&
        b.priority === FEATURE_SEARCH_MATCH_PRIORITIES.fuzzy &&
        a.fuzzyDistance !== b.fuzzyDistance
      ) {
        return a.fuzzyDistance - b.fuzzyDistance;
      }
      if (a.keyDistance !== b.keyDistance) return a.keyDistance - b.keyDistance;
      if (a.keyLength !== b.keyLength) return a.keyLength - b.keyLength;
      const aLabel = a.entry?.display || '';
      const bLabel = b.entry?.display || '';
      return aLabel.localeCompare(bLabel, undefined, { sensitivity: 'base' });
    };

    function renderFeatureSearchFilteredDefaults(filterType) {
      if (!filterType) {
        restoreFeatureSearchDefaults();
        return;
      }
      if (filterType === 'recent') {
        const recentEntries = resolveRecentFeatureSearchEntries();
        if (!recentEntries.length) {
          renderFeatureListOptions([]);
          return;
        }
        const values = [];
        const seen = new Set();
        for (const entry of recentEntries) {
          if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
          const optionData = buildFeatureSearchOptionData(entry);
          if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
          seen.add(optionData.value);
          values.push(optionData);
        }
        renderFeatureListOptions(values);
        return;
      }

      const filteredEntries = featureSearchEntries.filter(
        entry => (entry?.type || 'feature') === filterType
      );
      if (!filteredEntries.length) {
        renderFeatureListOptions([]);
        return;
      }
      const scored = filteredEntries
        .map(entry => scoreFeatureSearchEntry(entry, '', [], ''))
        .filter(Boolean)
        .sort(compareFeatureSearchCandidates);
      const values = [];
      const seen = new Set();
      for (const item of scored) {
        if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
        const optionData = buildFeatureSearchOptionData(item.entry);
        if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
        seen.add(optionData.value);
        values.push(optionData);
      }
      if (values.length === 0) {
        const fallback = filteredEntries
          .slice()
          .sort((a, b) =>
            (a.display || '').localeCompare(b.display || '', undefined, { sensitivity: 'base' })
          );
        for (const entry of fallback) {
          if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
          const optionData = buildFeatureSearchOptionData(entry);
          if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
          seen.add(optionData.value);
          values.push(optionData);
        }
      }
      renderFeatureListOptions(values);
    }

    function updateFeatureSearchSuggestions(query) {
      const raw = typeof query === 'string' ? query : '';
      const rawTrimmed = raw.trim();
      const { filterType, queryText } = extractFeatureSearchFilter(rawTrimmed);
      const trimmed = queryText.trim();
      const quotedPhrases = extractFeatureSearchQuotedPhrases(queryText);
      const normalizedQuotedPhrases = quotedPhrases
        .map(phrase =>
          typeof phrase === 'string' ? phrase.replace(/\s+/g, ' ').trim().toLowerCase() : '',
        )
        .filter(Boolean);

      if (!trimmed && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }

      const highlightSegments = trimmed
        ? trimmed.split(/[^a-z0-9]+/i).filter(Boolean)
        : [];
      const queryKey = trimmed ? searchKey(trimmed) : '';
      const rawQueryTokens = trimmed ? searchTokens(trimmed) : [];
      const queryTokens = filterFeatureSearchQueryTokens(rawQueryTokens);
      const highlightTokens = [
        ...highlightSegments,
        ...queryTokens,
        ...normalizedQuotedPhrases
      ];
      updateFeatureSearchHighlightTokens(highlightTokens);
      const isRecentFilter = filterType === 'recent';
      if (!trimmed && isRecentFilter) {
        renderFeatureSearchFilteredDefaults(filterType);
        return;
      }

      const entries = isRecentFilter
        ? resolveRecentFeatureSearchEntries()
        : filterType
          ? featureSearchEntries.filter(entry => (entry?.type || 'feature') === filterType)
          : featureSearchEntries;

      if (entries.length === 0) {
        renderFeatureListOptions([]);
        return;
      }
      if (!queryKey && (!Array.isArray(queryTokens) || queryTokens.length === 0) && !filterType) {
        restoreFeatureSearchDefaults();
        return;
      }

      const scored = entries
        .map(entry => scoreFeatureSearchEntry(entry, queryKey, queryTokens, trimmed, quotedPhrases))
        .filter(Boolean);

      const enforceQuotedMatches = normalizedQuotedPhrases.length > 0
        ? scored.filter(item => Number(item.quotedPhraseMatches) >= normalizedQuotedPhrases.length)
        : scored;

      if (enforceQuotedMatches.length === 0) {
        if (normalizedQuotedPhrases.length > 0) {
          renderFeatureListOptions([]);
          return;
        }

        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }

      const meaningful = trimmed
        ? enforceQuotedMatches.filter(
          item =>
            item.priority > FEATURE_SEARCH_MATCH_PRIORITIES.none ||
            item.tokenScore > 0 ||
            item.primaryTokenScore > 0 ||
            item.phraseScore > 0 ||
            item.quotedPhraseScore > 0
        )
        : [];

      const candidates = (meaningful.length > 0 ? meaningful : enforceQuotedMatches).sort(
        compareFeatureSearchCandidates
      );

      const values = [];
      const seen = new Set();
      for (const item of candidates) {
        if (values.length >= FEATURE_SEARCH_MAX_RESULTS) break;
        const optionData = buildFeatureSearchOptionData(item.entry);
        if (!optionData || !optionData.value || seen.has(optionData.value)) continue;
        seen.add(optionData.value);
        values.push(optionData);
      }


      if (values.length === 0) {
        if (filterType) {
          renderFeatureSearchFilteredDefaults(filterType);
        } else {
          restoreFeatureSearchDefaults();
        }
        return;
      }

      renderFeatureListOptions(values);
    }
    // Provide a minimal search normaliser that lowercases values and strips
    // punctuation so searches stay functional before the advanced feature-search
    // module is available. It keeps behaviour consistent with the previous
    // release by falling back to whitespace removal when nothing else remains
    // (e.g. emoji-only headings). Full diacritic folding, symbol translation and
    // locale-aware normalisation only run once the complete module finishes
    // loading, preserving the richer matching for detailed searches.
    const FEATURE_SEARCH_ENGINE_MODULE_CACHE_KEY = '__cineResolvedFeatureSearchEngineModule';

    function createFeatureSearchEngineFallback() {
      const FALLBACK_FUZZY_DISTANCE = 2;

      function fallbackParseMarkSuffix(value) {
        if (typeof value !== 'string' || !value) {
          return { cleaned: '', number: null };
        }

        const cleaned = value.replace(/[^a-z0-9]+/gi, '').toLowerCase();
        if (!cleaned) {
          return { cleaned: '', number: null };
        }

        if (/^\d+$/.test(cleaned)) {
          return { cleaned, number: parseInt(cleaned, 10) };
        }

        return { cleaned, number: null };
      }

      const NUMBER_WORD_ONES = new Map([
        ['zero', 0],
        ['one', 1],
        ['two', 2],
        ['three', 3],
        ['four', 4],
        ['five', 5],
        ['six', 6],
        ['seven', 7],
        ['eight', 8],
        ['nine', 9],
      ]);

      const NUMBER_WORD_TEENS = new Map([
        ['ten', 10],
        ['eleven', 11],
        ['twelve', 12],
        ['thirteen', 13],
        ['fourteen', 14],
        ['fifteen', 15],
        ['sixteen', 16],
        ['seventeen', 17],
        ['eighteen', 18],
        ['nineteen', 19],
      ]);

      const NUMBER_WORD_TENS = new Map([
        ['twenty', 20],
        ['thirty', 30],
        ['forty', 40],
        ['fifty', 50],
        ['sixty', 60],
        ['seventy', 70],
        ['eighty', 80],
        ['ninety', 90],
      ]);

      const NUMBER_WORD_BASE = new Map([
        ...NUMBER_WORD_ONES,
        ...NUMBER_WORD_TEENS,
        ...NUMBER_WORD_TENS,
      ]);

      const NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort(
        (a, b) => b.length - a.length,
      );
      const NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort(
        (a, b) => b.length - a.length,
      );

      const NUMBER_WORD_PATTERN =
        NUMBER_WORD_BASE.size > 0
          ? new RegExp(
            `\\b(?:${NUMBER_WORD_BASE_KEYS.join('|')})(?:[\\s-](?:${NUMBER_WORD_ONES_KEYS.join('|')}))?\\b`,
            'gi',
          )
          : null;

      function fallbackNormalizeNumberWords(str) {
        if (!NUMBER_WORD_PATTERN || typeof str !== 'string' || !str) {
          return str;
        }

        return str.replace(NUMBER_WORD_PATTERN, match => {
          const lower = match.toLowerCase();
          if (NUMBER_WORD_BASE.has(lower)) {
            return String(NUMBER_WORD_BASE.get(lower));
          }
          const parts = lower.split(/[\s-]+/).filter(Boolean);
          if (parts.length === 2) {
            const tens = NUMBER_WORD_TENS.get(parts[0]);
            const ones = NUMBER_WORD_ONES.get(parts[1]);
            if (typeof tens === 'number' && typeof ones === 'number') {
              return String(tens + ones);
            }
          }
          return match;
        });
      }

      function fallbackCollectTokens(str) {
        if (!str) {
          return [];
        }

        return String(str)
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(Boolean);
      }

      return {
        FEATURE_SEARCH_FUZZY_MAX_DISTANCE: FALLBACK_FUZZY_DISTANCE,
        searchKey(value) {
          if (!value) {
            return '';
          }
          const lower = String(value).toLowerCase();
          const normalized = fallbackNormalizeNumberWords(lower);
          return normalized.replace(/[^a-z0-9]+/g, '');
        },
        searchTokens(value) {
          if (!value) {
            return [];
          }
          const lower = String(value).toLowerCase();
          const numberNormalized = fallbackNormalizeNumberWords(lower);
          const tokens = new Set();
          fallbackCollectTokens(lower).forEach(token => tokens.add(token));
          if (numberNormalized !== lower) {
            fallbackCollectTokens(numberNormalized).forEach(token => tokens.add(token));
          }
          return Array.from(tokens);
        },
        computeTokenMatchDetails() {
          return { score: 0, matched: 0 };
        },
        findBestSearchMatch() {
          return null;
        },
        getFuzzyDistance() {
          return Number.POSITIVE_INFINITY;
        },
        computeFuzzyTokenScore() {
          return 0;
        },
        parseMarkSuffix: fallbackParseMarkSuffix,
        normaliseMarkVariants(str) {
          if (typeof str !== 'string' || !str) {
            return str;
          }
          return str.replace(/\bmark\s*(\d+)\b/gi, 'mk$1');
        },
        normalizeUnicodeFractions(value) {
          return value;
        },
        normalizeNumberWords(value) {
          if (typeof value !== 'string' || !value) {
            return value;
          }
          return fallbackNormalizeNumberWords(value);
        },
        normalizeSpellingVariants(value) {
          return value;
        },
        applySearchTokenSynonyms() { },
      };
    }

    function resolveFeatureSearchEngineModuleApi() {
      const globalScope = typeof getCoreGlobalObject === 'function'
        ? getCoreGlobalObject()
        : (typeof globalThis !== 'undefined'
          ? globalThis
          : typeof window !== 'undefined'
            ? window
            : typeof self !== 'undefined'
              ? self
              : typeof global !== 'undefined'
                ? global
                : null);

      if (globalScope && globalScope[FEATURE_SEARCH_ENGINE_MODULE_CACHE_KEY]) {
        return globalScope[FEATURE_SEARCH_ENGINE_MODULE_CACHE_KEY];
      }

      const moduleBase =
        (typeof cineModuleBase === 'object' && cineModuleBase)
        || (globalScope && typeof globalScope.cineModuleBase === 'object' ? globalScope.cineModuleBase : null);

      function logModuleWarning(message, error) {
        if (moduleBase && typeof moduleBase.safeWarn === 'function') {
          try {
            moduleBase.safeWarn(message, error);
            return;
          } catch (warnError) {
            void warnError;
          }
        }
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            if (typeof error === 'undefined') {
              console.warn(message);
            } else {
              console.warn(message, error);
            }
          } catch (consoleError) {
            void consoleError;
          }
        }
      }

      const candidates = [];

      if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
        let registry = null;
        try {
          registry = moduleBase.getModuleRegistry(globalScope);
        } catch (error) {
          logModuleWarning('Unable to resolve cine.features.featureSearchEngine module registry.', error);
        }
        if (registry && typeof registry.get === 'function') {
          try {
            const fromRegistry = registry.get('cine.features.featureSearchEngine');
            if (fromRegistry && candidates.indexOf(fromRegistry) === -1) {
              candidates.push(fromRegistry);
            }
          } catch (error) {
            logModuleWarning('Unable to read cine.features.featureSearchEngine module.', error);
          }
        }
      }

      const scopeCandidates = [];
      if (globalScope && scopeCandidates.indexOf(globalScope) === -1) {
        scopeCandidates.push(globalScope);
      }
      if (typeof globalThis !== 'undefined' && scopeCandidates.indexOf(globalThis) === -1) {
        scopeCandidates.push(globalThis);
      }
      if (typeof window !== 'undefined' && scopeCandidates.indexOf(window) === -1) {
        scopeCandidates.push(window);
      }
      if (typeof self !== 'undefined' && scopeCandidates.indexOf(self) === -1) {
        scopeCandidates.push(self);
      }
      if (typeof global !== 'undefined' && scopeCandidates.indexOf(global) === -1) {
        scopeCandidates.push(global);
      }

      for (let index = 0; index < scopeCandidates.length; index += 1) {
        const scope = scopeCandidates[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          continue;
        }

        try {
          const exposed = scope.cineFeaturesFeatureSearchEngine;
          if (exposed && candidates.indexOf(exposed) === -1) {
            candidates.push(exposed);
          }
        } catch (error) {
          void error;
        }
      }

      for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (candidate && typeof candidate.createEngine === 'function') {
          if (globalScope && !globalScope[FEATURE_SEARCH_ENGINE_MODULE_CACHE_KEY]) {
            try {
              globalScope[FEATURE_SEARCH_ENGINE_MODULE_CACHE_KEY] = candidate;
            } catch (error) {
              void error;
            }
          }
          return candidate;
        }
      }

      return null;
    }

    const featureSearchEngineModuleApi = resolveFeatureSearchEngineModuleApi();
    const fallbackFeatureSearchEngine = createFeatureSearchEngineFallback();
    const featureSearchEngine =
      featureSearchEngineModuleApi && typeof featureSearchEngineModuleApi.createEngine === 'function'
        ? featureSearchEngineModuleApi.createEngine()
        : fallbackFeatureSearchEngine;

    const FEATURE_SEARCH_FUZZY_MAX_DISTANCE = Number.isFinite(
      featureSearchEngineModuleApi?.FEATURE_SEARCH_FUZZY_MAX_DISTANCE,
    )
      ? featureSearchEngineModuleApi.FEATURE_SEARCH_FUZZY_MAX_DISTANCE
      : featureSearchEngine.FEATURE_SEARCH_FUZZY_MAX_DISTANCE || fallbackFeatureSearchEngine.FEATURE_SEARCH_FUZZY_MAX_DISTANCE;

    const parseMarkSuffix = typeof featureSearchEngine.parseMarkSuffix === 'function'
      ? featureSearchEngine.parseMarkSuffix
      : fallbackFeatureSearchEngine.parseMarkSuffix;

    const normaliseMarkVariants = typeof featureSearchEngine.normaliseMarkVariants === 'function'
      ? featureSearchEngine.normaliseMarkVariants
      : fallbackFeatureSearchEngine.normaliseMarkVariants;
    ensureGlobalFunctionBinding('normaliseMarkVariants', normaliseMarkVariants);

    const normalizeUnicodeFractions = typeof featureSearchEngine.normalizeUnicodeFractions === 'function'
      ? featureSearchEngine.normalizeUnicodeFractions
      : fallbackFeatureSearchEngine.normalizeUnicodeFractions;

    const normalizeNumberWords = typeof featureSearchEngine.normalizeNumberWords === 'function'
      ? featureSearchEngine.normalizeNumberWords
      : fallbackFeatureSearchEngine.normalizeNumberWords;

    const normalizeSpellingVariants = typeof featureSearchEngine.normalizeSpellingVariants === 'function'
      ? featureSearchEngine.normalizeSpellingVariants
      : fallbackFeatureSearchEngine.normalizeSpellingVariants;

    const applySearchTokenSynonyms = typeof featureSearchEngine.applySearchTokenSynonyms === 'function'
      ? featureSearchEngine.applySearchTokenSynonyms
      : fallbackFeatureSearchEngine.applySearchTokenSynonyms;

    const searchKey = typeof featureSearchEngine.searchKey === 'function'
      ? value => featureSearchEngine.searchKey(value)
      : fallbackFeatureSearchEngine.searchKey;

    const searchTokens = typeof featureSearchEngine.searchTokens === 'function'
      ? value => featureSearchEngine.searchTokens(value)
      : fallbackFeatureSearchEngine.searchTokens;

    const computeTokenMatchDetails = typeof featureSearchEngine.computeTokenMatchDetails === 'function'
      ? (entryTokens, queryTokens) => featureSearchEngine.computeTokenMatchDetails(entryTokens, queryTokens)
      : fallbackFeatureSearchEngine.computeTokenMatchDetails;

    const findBestSearchMatch = typeof featureSearchEngine.findBestSearchMatch === 'function'
      ? (map, key, tokens = []) => featureSearchEngine.findBestSearchMatch(map, key, tokens)
      : fallbackFeatureSearchEngine.findBestSearchMatch;

    const getFuzzyDistance = typeof featureSearchEngine.getFuzzyDistance === 'function'
      ? (source, target) => featureSearchEngine.getFuzzyDistance(source, target)
      : fallbackFeatureSearchEngine.getFuzzyDistance;

    const computeFuzzyTokenScore = typeof featureSearchEngine.computeFuzzyTokenScore === 'function'
      ? (token, entryToken) => featureSearchEngine.computeFuzzyTokenScore(token, entryToken)
      : fallbackFeatureSearchEngine.computeFuzzyTokenScore;

    const FEATURE_CONTEXT_LIMIT = 3;

    const toTitleCase = str =>
      str.replace(/\b([a-z])/g, (_, ch) => ch.toUpperCase());

    const idToContextLabel = id => {
      if (!id) return '';
      const spaced = id
        .replace(/[-_]+/g, ' ')
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim();
      if (!spaced) return '';
      return toTitleCase(spaced);
    };

    const addUniqueContext = (contexts, seen, value, baseLabelLower) => {
      if (!value) return;
      const trimmed = value.trim();
      if (!trimmed) return;
      const normalized = trimmed.toLowerCase();
      if (normalized === baseLabelLower || seen.has(normalized)) return;
      contexts.push(trimmed);
      seen.add(normalized);
    };

    const collectFeatureContexts = (element, baseLabelLower) => {
      if (!element || !element.parentElement) return [];
      const contexts = [];
      const seen = new Set();
      let current = element.parentElement;
      while (current && contexts.length < FEATURE_CONTEXT_LIMIT) {
        if (typeof current.dataset?.featureContext === 'string') {
          current.dataset.featureContext
            .split(',')
            .map(part => part.trim())
            .filter(Boolean)
            .forEach(value => addUniqueContext(contexts, seen, value, baseLabelLower));
        }
        const labelledBy = current.getAttribute('aria-labelledby');
        if (labelledBy) {
          labelledBy
            .split(/\s+/)
            .map(id => id && typeof document !== 'undefined' && document && typeof document.getElementById === 'function' ? document.getElementById(id) : null)
            .filter(labelEl => labelEl && labelEl !== element)
            .forEach(labelEl => {
              addUniqueContext(
                contexts,
                seen,
                labelEl.textContent || '',
                baseLabelLower
              );
            });
        }
        const heading = current.querySelector(
          ':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > legend'
        );
        if (heading && heading !== element) {
          addUniqueContext(
            contexts,
            seen,
            heading.textContent || '',
            baseLabelLower
          );
        }
        if (current.id) {
          addUniqueContext(contexts, seen, idToContextLabel(current.id), baseLabelLower);
        }
        current = current.parentElement;
      }
      return contexts.reverse();
    };

    const collectFeatureSearchHelpTexts = element => {
      if (!element) return [];
      const texts = new Set();
      const MAX_TEXTS = 4;
      const clean = value => {
        if (typeof value !== 'string') return '';
        const normalized = value.replace(/\s+/g, ' ').trim();
        if (!normalized) return '';
        if (normalized.length > 160) {
          return normalized.slice(0, 160);
        }
        return normalized;
      };
      const add = value => {
        if (texts.size >= MAX_TEXTS) return;
        const cleaned = clean(value);
        if (cleaned) {
          texts.add(cleaned);
        }
      };
      const addFromElement = el => {
        if (!el) return;
        add(el.getAttribute('data-help'));
        add(el.getAttribute('aria-description'));
        add(el.getAttribute('title'));
      };

      add(element.getAttribute('data-help'));
      add(element.getAttribute('aria-description'));
      add(element.getAttribute('title'));

      const ownerDoc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);

      const processIdRefs = (attrName, collector) => {
        if (!ownerDoc) return;
        const attrValue = element.getAttribute(attrName);
        if (!attrValue) return;
        attrValue
          .split(/\s+/)
          .map(id => id && typeof ownerDoc.getElementById === 'function' ? ownerDoc.getElementById(id) : null)
          .filter(Boolean)
          .forEach(collector);
      };

      processIdRefs('aria-describedby', addFromElement);
      processIdRefs('aria-labelledby', addFromElement);

      if (element.labels && typeof element.labels === 'object') {
        Array.from(element.labels).forEach(addFromElement);
      }

      if (typeof element.closest === 'function') {
        const wrappingLabel = element.closest('label');
        if (wrappingLabel) addFromElement(wrappingLabel);
      }

      return Array.from(texts);
    };

    const buildFeatureEntryDetailText = entry => {
      if (!entry || typeof entry !== 'object') return '';
      const base = normalizeFeatureSearchDetail(
        entry.displayLabel || entry.baseLabel || entry.label || ''
      ).toLowerCase();
      const helpCandidates = [];
      if (Array.isArray(entry.helpTexts) && entry.helpTexts.length) {
        helpCandidates.push(...entry.helpTexts);
      }
      if (entry.element) {
        collectFeatureSearchHelpTexts(entry.element).forEach(text => {
          helpCandidates.push(text);
        });
      }
      for (const candidate of helpCandidates) {
        const detail = normalizeFeatureSearchDetail(candidate);
        if (detail && (!base || detail.toLowerCase() !== base)) {
          return detail;
        }
      }
      return '';
    };

    const buildHelpSectionDetailText = section => {
      if (!section) return '';
      const candidates = [];
      const summaryAttr = section.getAttribute('data-help-summary');
      if (summaryAttr) candidates.push(summaryAttr);
      const summaryEl = section.querySelector('[data-help-summary]');
      if (summaryEl && summaryEl.textContent) {
        candidates.push(summaryEl.textContent);
      }
      const ariaLabel = section.getAttribute('aria-label');
      if (ariaLabel) candidates.push(ariaLabel);
      const firstParagraph = section.querySelector('p');
      if (firstParagraph && firstParagraph.textContent) {
        candidates.push(firstParagraph.textContent);
      }
      if (!firstParagraph) {
        const firstListItem = section.querySelector('li');
        if (firstListItem && firstListItem.textContent) {
          candidates.push(firstListItem.textContent);
        }
      }
      for (const candidate of candidates) {
        const detail = normalizeFeatureSearchDetail(candidate);
        if (detail) return detail;
      }
      return '';
    };

    const buildDeviceEntryDetailText = entry => {
      if (!entry || typeof entry !== 'object') return '';
      if (entry.entryType === 'deviceLibrary') {
        const parts = [];
        if (entry.categoryLabel) parts.push(entry.categoryLabel);
        if (entry.summary) parts.push(entry.summary);
        return parts.join(' — ');
      }
      const select = entry.select;
      if (!select) return '';
      const base = normalizeFeatureSearchDetail(entry.label || '').toLowerCase();
      const helpTexts = collectFeatureSearchHelpTexts(select);
      for (const text of helpTexts) {
        const detail = normalizeFeatureSearchDetail(text);
        if (detail && (!base || detail.toLowerCase() !== base)) {
          return detail;
        }
      }
      const contexts = collectFeatureContexts(select, base);
      if (contexts.length) {
        const contextDetail = normalizeFeatureSearchDetail(contexts.join(' › '));
        if (contextDetail && (!base || contextDetail.toLowerCase() !== base)) {
          return contextDetail;
        }
      }
      return '';
    };

    const buildFeatureSearchEntry = (element, { label, keywords = '' }) => {
      if (!element || !label) return null;
      const baseLabel = label.trim();
      if (!baseLabel) return null;
      const baseKey = searchKey(baseLabel);
      if (!baseKey) return null;
      const baseLabelLower = baseLabel.toLowerCase();
      const contextLabels = collectFeatureContexts(element, baseLabelLower);
      const shouldCollectHelp =
        typeof element.hasAttribute === 'function' && element.hasAttribute('data-feature-search');
      const helpTexts = shouldCollectHelp ? collectFeatureSearchHelpTexts(element) : [];
      let combinedLabel = baseLabel;
      if (contextLabels.length) {
        combinedLabel = `${baseLabel} (${contextLabels.join(' › ')})`;
      }
      const primaryTokenSource = [baseLabel, contextLabels.join(' ')]
        .filter(Boolean)
        .join(' ');
      const combinedKeywords = [
        baseLabel,
        contextLabels.join(' '),
        keywords,
        helpTexts.join(' ')
      ]
        .filter(Boolean)
        .join(' ');
      let entryType = getFeatureSearchEntryType(element);
      if (entryType === 'feature') {
        const tagName = typeof element.tagName === 'string' ? element.tagName.toLowerCase() : '';
        if (tagName === 'option') {
          const ownerSelect = typeof element.closest === 'function' ? element.closest('select') : null;
          const selectType = ownerSelect?.dataset?.featureSearchType || ownerSelect?.getAttribute?.('data-feature-search-type');
          entryType = selectType?.trim()?.toLowerCase() || 'device';
        }
      }
      const primaryTokens = searchTokens(primaryTokenSource);
      const entry = {
        element,
        label: baseLabel,
        baseLabel,
        displayLabel: combinedLabel,
        context: contextLabels,
        primaryTokens,
        tokens: searchTokens(combinedKeywords),
        key: baseKey,
        optionValue: combinedLabel,
        helpTexts,
        entryType
      };
      const targetMap = entryType === 'action' ? actionMap : featureMap;
      const existing = targetMap.get(baseKey);
      if (!existing) {
        targetMap.set(baseKey, entry);
      } else if (Array.isArray(existing)) {
        if (!existing.some(item => item && item.element === element)) {
          existing.push(entry);
        }
      } else if (existing.element !== element) {
        targetMap.set(baseKey, [existing, entry]);
      }
      return entry;
    };

    const escapeFeatureSearchRegExp = value =>
      value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const collectFeatureSearchTexts = entry => {
      const texts = [];
      const push = text => {
        if (typeof text !== 'string') return;
        const normalized = text.trim().toLowerCase();
        if (!normalized) return;
        texts.push(normalized);
      };
      if (!entry || typeof entry !== 'object') {
        return texts;
      }
      push(entry.optionLabel);
      if (entry.display && entry.display !== entry.optionLabel) {
        push(entry.display);
      }
      if (entry.detail) {
        push(entry.detail);
      }
      const rawValue = entry.value;
      if (rawValue && typeof rawValue === 'object') {
        push(rawValue.baseLabel);
        push(rawValue.displayLabel);
        if (Array.isArray(rawValue.context) && rawValue.context.length) {
          push(rawValue.context.join(' '));
        }
        if (Array.isArray(rawValue.helpTexts) && rawValue.helpTexts.length) {
          push(rawValue.helpTexts.join(' '));
        }
      }
      return texts;
    };

    const computeLabelMatchDetails = (entry, rawQuery = '') => {
      const normalizedQuery = typeof rawQuery === 'string'
        ? rawQuery.replace(/\s+/g, ' ').trim().toLowerCase()
        : '';
      if (!normalizedQuery) {
        return { level: 0, score: 0 };
      }

      const labels = new Set();
      const addLabel = value => {
        if (typeof value !== 'string') return;
        const cleaned = value.replace(/\s+/g, ' ').trim().toLowerCase();
        if (!cleaned) return;
        labels.add(cleaned);
      };

      if (entry && typeof entry === 'object') {
        addLabel(entry.optionLabel);
        addLabel(entry.display);
        const rawValue = entry.value && typeof entry.value === 'object' ? entry.value : null;
        if (rawValue) {
          addLabel(rawValue.baseLabel);
          addLabel(rawValue.displayLabel);
          if (Array.isArray(rawValue.context)) {
            rawValue.context.forEach(addLabel);
          }
        }
      }

      if (labels.size === 0) {
        return { level: 0, score: 0 };
      }

      const queryLength = normalizedQuery.length;
      let bestLevel = 0;
      let bestScore = 0;
      const boundaryPattern = /[a-z0-9]/;

      labels.forEach(label => {
        if (label === normalizedQuery) {
          bestLevel = Math.max(bestLevel, 4);
          bestScore = Math.max(bestScore, Math.max(label.length * 8, 80));
          return;
        }

        if (label.startsWith(normalizedQuery)) {
          bestLevel = Math.max(bestLevel, 3);
          bestScore = Math.max(bestScore, Math.max(queryLength * 4, 36));
        }

        const index = label.indexOf(normalizedQuery);
        if (index !== -1) {
          const beforeChar = index > 0 ? label.charAt(index - 1) : '';
          const afterIndex = index + queryLength;
          const afterChar = afterIndex < label.length ? label.charAt(afterIndex) : '';
          const beforeBoundary = index === 0 || !boundaryPattern.test(beforeChar);
          const afterBoundary = afterIndex >= label.length || !boundaryPattern.test(afterChar);
          if (beforeBoundary && afterBoundary) {
            bestLevel = Math.max(bestLevel, 2);
            bestScore = Math.max(bestScore, Math.max(queryLength * 3, 28));
          } else {
            bestLevel = Math.max(bestLevel, 1);
            bestScore = Math.max(bestScore, Math.max(queryLength * 2, 14));
          }
        }
      });

      return { level: bestLevel, score: bestScore };
    };

    const computePhraseMatchDetails = (entry, queryTokens = [], rawQuery = '') => {
      const validTokens = Array.isArray(queryTokens)
        ? queryTokens.map(token => token && token.replace(/[^a-z0-9]+/g, '')).filter(Boolean)
        : [];
      const normalizedQuery = typeof rawQuery === 'string' ? rawQuery.trim().toLowerCase() : '';
      if (!validTokens.length && !normalizedQuery) {
        return { score: 0, matched: false };
      }
      const texts = collectFeatureSearchTexts(entry);
      if (!texts.length) {
        return { score: 0, matched: false };
      }

      let score = 0;
      let matched = false;

      if (normalizedQuery) {
        for (const text of texts) {
          if (text.includes(normalizedQuery)) {
            matched = true;
            score = Math.max(score, Math.max(1, normalizedQuery.length));
            break;
          }
        }
      }

      if (validTokens.length > 1) {
        const pattern = validTokens.map(escapeFeatureSearchRegExp).join('[\\s\\-_/·›>]*');
        if (pattern) {
          const regex = new RegExp(`\\b${pattern}`, 'i');
          for (const text of texts) {
            if (regex.test(text)) {
              matched = true;
              score = Math.max(score, validTokens.length * 6);
              break;
            }
          }
        }
      }

      return { score, matched };
    };

    const computeQuotedPhraseMatchDetails = (entry, phrases = []) => {
      if (!Array.isArray(phrases) || phrases.length === 0) {
        return { score: 0, matched: 0 };
      }
      const normalizedPhrases = phrases
        .map(phrase =>
          typeof phrase === 'string'
            ? phrase.replace(/\s+/g, ' ').trim().toLowerCase()
            : ''
        )
        .filter(phrase => phrase.length > 1);
      if (!normalizedPhrases.length) {
        return { score: 0, matched: 0 };
      }
      const texts = collectFeatureSearchTexts(entry);
      if (!texts.length) {
        return { score: 0, matched: 0 };
      }
      let matched = 0;
      let score = 0;
      normalizedPhrases.forEach(phrase => {
        let found = false;
        for (const text of texts) {
          if (text.includes(phrase)) {
            found = true;
            break;
          }
        }
        if (found) {
          matched += 1;
          score += Math.max(phrase.length * 4, 24);
        }
      });
      if (matched === 0) {
        return { score: 0, matched: 0 };
      }
      return { score, matched };
    };

    const computeHistoryBoostScore = (count = 0, lastUsed = 0, now = NaN) => {
      const usageCount = Number.isFinite(count) && count > 0 ? count : 0;
      const normalizedCount = Math.min(Math.max(usageCount, 0), 50);
      let score = normalizedCount * 2;

      const timestamp = Number.isFinite(lastUsed) && lastUsed > 0 ? lastUsed : 0;
      if (timestamp > 0) {
        const current = Number.isFinite(now)
          ? now
          : (typeof Date === 'function' && typeof Date.now === 'function'
            ? Date.now()
            : new Date().getTime());
        const age = Math.max(0, current - timestamp);
        const day = 24 * 60 * 60 * 1000;
        if (age <= day) {
          score += 20;
        } else if (age <= 7 * day) {
          score += 12;
        } else if (age <= 30 * day) {
          score += 6;
        } else if (age <= 90 * day) {
          score += 3;
        }
      }

      return score;
    };

    const computeLevenshteinDistance = (a, b) => {
      if (a === b) return 0;
      if (typeof a !== 'string' || typeof b !== 'string') {
        return Number.POSITIVE_INFINITY;
      }
      const aLen = a.length;
      const bLen = b.length;
      if (aLen === 0) return bLen;
      if (bLen === 0) return aLen;
      const prev = new Array(bLen + 1);
      const curr = new Array(bLen + 1);
      for (let j = 0; j <= bLen; j += 1) {
        prev[j] = j;
      }
      for (let i = 1; i <= aLen; i += 1) {
        curr[0] = i;
        const aCode = a.charCodeAt(i - 1);
        for (let j = 1; j <= bLen; j += 1) {
          const cost = aCode === b.charCodeAt(j - 1) ? 0 : 1;
          const deletion = prev[j] + 1;
          const insertion = curr[j - 1] + 1;
          const substitution = prev[j - 1] + cost;
          curr[j] = Math.min(deletion, insertion, substitution);
        }
        for (let j = 0; j <= bLen; j += 1) {
          prev[j] = curr[j];
        }
      }
      return prev[bLen];
    };

    const isAcceptableFuzzyMatch = (entryKey, queryKey, distance) => {
      if (!Number.isFinite(distance) || distance <= 0) {
        return false;
      }
      if (typeof entryKey !== 'string' || typeof queryKey !== 'string') {
        return false;
      }
      const maxLength = Math.max(entryKey.length, queryKey.length);
      if (maxLength === 0) return false;
      if (maxLength <= 3) {
        return distance <= 1;
      }
      if (maxLength <= 6) {
        return distance <= 2;
      }
      return distance <= 3 && distance / maxLength <= 0.4;
    };

    var STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
    const existingDevicesHeading = document.getElementById("existingDevicesHeading");
    const batteryComparisonSection = document.getElementById("batteryComparison");
    const batteryTableElem = document.getElementById("batteryTable");
    const breakdownListElem = document.getElementById("breakdownList");
    if (breakdownListElem) {
      try {
        safeExposeCoreRuntimeConstant('breakdownListElem', breakdownListElem);
      } catch (exposeError) {
        void exposeError;
      }
    }
    var runtimeFeedbackBtn = document.getElementById("runtimeFeedbackBtn");
    var generateGearListBtn = document.getElementById("generateGearListBtn");
    var deleteGearListProjectBtn = document.getElementById('deleteGearListProjectBtn');
    var gearListOutput = document.getElementById("gearListOutput");
    var projectRequirementsOutput = document.getElementById("projectRequirementsOutput");

    // Load accent color from localStorage
    var DEFAULT_ACCENT_COLOR = '#001589';
    var accentColor = DEFAULT_ACCENT_COLOR;
    var prevAccentColor = accentColor;
    var HIGH_CONTRAST_ACCENT_COLOR = '#ffffff';
    const DEFAULT_ACCENT_NORMALIZED = DEFAULT_ACCENT_COLOR.toLowerCase();

    const normalizeAccentValue = value =>
      typeof value === 'string' ? value.trim().toLowerCase() : '';

    const accentColorInputElement = resolveGlobalElement('accentColorInput', 'accentColorInput');
    const accentColorResetButtonElement = resolveGlobalElement('accentColorResetButton', 'accentColorReset');

    const updateAccentColorResetButtonState = () => {
      if (!accentColorResetButtonElement) return;
      const body = typeof document !== 'undefined' ? document.body : null;
      const pinkModeActive = !!(body && body.classList.contains('pink-mode'));
      const inputDisabled = !accentColorInputElement || accentColorInputElement.disabled;
      const currentValue = accentColorInputElement
        ? normalizeAccentValue(accentColorInputElement.value || '')
        : '';
      const isDefaultSelection = !currentValue || currentValue === DEFAULT_ACCENT_NORMALIZED;
      const shouldDisable = pinkModeActive || inputDisabled || isDefaultSelection;
      accentColorResetButtonElement.disabled = shouldDisable;
      if (shouldDisable) {
        accentColorResetButtonElement.setAttribute('aria-disabled', 'true');
      } else {
        accentColorResetButtonElement.removeAttribute('aria-disabled');
      }
    };

    const DARK_MODE_ACCENT_BOOST_CLASS = 'dark-accent-boost';
    const PINK_REFERENCE_COLOR = '#ff69b4';
    const PINK_LUMINANCE_TOLERANCE = 0.06;
    const BRIGHT_ACCENT_LUMINANCE_THRESHOLD = 0.6;
    const BRIGHT_ACCENT_MIN_SATURATION = 0.35;

    function parseRgbComponent(value) {
      const trimmed = value.trim();
      if (!trimmed) return null;
      if (trimmed.endsWith('%')) {
        const percent = Number.parseFloat(trimmed.slice(0, -1));
        if (Number.isNaN(percent)) return null;
        return Math.max(0, Math.min(255, Math.round((percent / 100) * 255)));
      }
      const numeric = Number.parseFloat(trimmed);
      if (Number.isNaN(numeric)) return null;
      return Math.max(0, Math.min(255, Math.round(numeric)));
    }

    function parseColorToRgb(color) {
      if (typeof color !== 'string') return null;
      const trimmed = color.trim();
      if (!trimmed) return null;
      const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
      if (hexMatch) {
        const hex = hexMatch[1];
        if (hex.length === 3) {
          return {
            r: Number.parseInt(hex[0] + hex[0], 16),
            g: Number.parseInt(hex[1] + hex[1], 16),
            b: Number.parseInt(hex[2] + hex[2], 16),
          };
        }
        return {
          r: Number.parseInt(hex.slice(0, 2), 16),
          g: Number.parseInt(hex.slice(2, 4), 16),
          b: Number.parseInt(hex.slice(4, 6), 16),
        };
      }
      const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
      if (rgbMatch) {
        const parts = rgbMatch[1].split(',');
        if (parts.length < 3) return null;
        const [r, g, b] = parts;
        const red = parseRgbComponent(r);
        const green = parseRgbComponent(g);
        const blue = parseRgbComponent(b);
        if ([red, green, blue].some(component => component === null)) return null;
        return { r: red, g: green, b: blue };
      }
      return null;
    }

    function computeRelativeLuminance(rgb) {
      if (!rgb || typeof rgb !== 'object') return 0;
      const clamp = component => {
        const numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.min(1, Math.max(0, numeric / 255));
      };
      const transform = value =>
        value <= 0.03928
          ? value / 12.92
          : Math.pow((value + 0.055) / 1.055, 2.4);
      const red = transform(clamp(rgb.r));
      const green = transform(clamp(rgb.g));
      const blue = transform(clamp(rgb.b));
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    function computeSaturation(rgb) {
      if (!rgb || typeof rgb !== 'object') return 0;
      const normalize = component => {
        const numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.max(0, Math.min(1, numeric / 255));
      };
      const r = normalize(rgb.r);
      const g = normalize(rgb.g);
      const b = normalize(rgb.b);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max === 0) return 0;
      if (max === min) return 0;
      return (max - min) / max;
    }

    const PINK_REFERENCE_LUMINANCE = (() => {
      const pinkRgb = parseColorToRgb(PINK_REFERENCE_COLOR);
      if (!pinkRgb) return 0.35;
      return computeRelativeLuminance(pinkRgb);
    })();

    function shouldEnableDarkModeAccentBoost({ color, highContrast } = {}) {
      if (typeof document === 'undefined') return false;
      if (!document.body || !document.body.classList.contains('dark-mode')) return false;
      if (document.body.classList.contains('pink-mode')) return false;
      if (highContrast) return false;
      if (typeof color !== 'string' || !color) return false;
      const rgb = parseColorToRgb(color);
      if (!rgb) return false;
      const luminance = computeRelativeLuminance(rgb);
      if (Math.abs(luminance - PINK_REFERENCE_LUMINANCE) <= PINK_LUMINANCE_TOLERANCE) {
        return true;
      }
      const saturation = computeSaturation(rgb);
      return (
        luminance >= BRIGHT_ACCENT_LUMINANCE_THRESHOLD &&
        saturation >= BRIGHT_ACCENT_MIN_SATURATION
      );
    }

    function refreshDarkModeAccentBoost(options = {}) {
      if (typeof document === 'undefined' || !document.body) return;
      const shouldEnable = shouldEnableDarkModeAccentBoost(options);
      document.body.classList.toggle(DARK_MODE_ACCENT_BOOST_CLASS, shouldEnable);
      updateInstallBannerColors();
    }

    var isHighContrastActive = () =>
      typeof document !== 'undefined' &&
      (document.documentElement.classList.contains('high-contrast') ||
        (document.body && document.body.classList.contains('high-contrast')));

    var hasCustomAccentSelection = () => {
      const normalized = normalizeAccentValue(accentColor);
      return normalized && normalized !== DEFAULT_ACCENT_NORMALIZED;
    };

    var shouldPreserveAccentInPinkMode = () => false;

    var applyAccentColor = (color) => {
      const highContrast = isHighContrastActive();
      const accentValue = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : color;
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--accent-color', accentValue);
      if (highContrast) {
        rootStyle.removeProperty('--link-color');
      } else {
        rootStyle.setProperty('--link-color', color);
      }
      if (document.body) {
        const bodyStyle = document.body.style;
        bodyStyle.setProperty('--accent-color', accentValue);
        if (highContrast) {
          bodyStyle.removeProperty('--link-color');
        } else {
          bodyStyle.setProperty('--link-color', color);
        }
      }
      refreshDarkModeAccentBoost({ color: accentValue, highContrast });
    };

    var clearAccentColorOverrides = () => {
      const root = document.documentElement;
      const rootStyle = root && root.style;
      if (rootStyle) {
        rootStyle.removeProperty('--accent-color');
        rootStyle.removeProperty('--link-color');
      }
      if (document.body) {
        const bodyStyle = document.body.style;
        bodyStyle.removeProperty('--accent-color');
        bodyStyle.removeProperty('--link-color');
      }
      refreshDarkModeAccentBoost({ color: null, highContrast: isHighContrastActive() });
    };

    try {
      const storedAccent = localStorage.getItem('accentColor');
      if (storedAccent) {
        accentColor = storedAccent;
        applyAccentColor(accentColor);
      }
    } catch (e) {
      console.warn('Could not load accent color', e);
    }
    prevAccentColor = accentColor;
    updateAccentColorResetButtonState();

    if (accentColorInputElement) {
      accentColorInputElement.addEventListener('input', () => {
        if (
          typeof document !== 'undefined' &&
          document.body &&
          document.body.classList.contains('pink-mode')
        ) {
          updateAccentColorResetButtonState();
          return;
        }
        const color = accentColorInputElement.value;
        applyAccentColor(color);
        updateAccentColorResetButtonState();
      });
    }

    if (accentColorResetButtonElement && accentColorInputElement) {
      accentColorResetButtonElement.addEventListener('click', () => {
        if (accentColorResetButtonElement.disabled || accentColorInputElement.disabled) return;
        if (
          typeof document !== 'undefined' &&
          document.body &&
          document.body.classList.contains('pink-mode')
        ) {
          updateAccentColorResetButtonState();
          return;
        }
        const currentValue = normalizeAccentValue(accentColorInputElement.value || '');
        if (currentValue === DEFAULT_ACCENT_NORMALIZED) {
          updateAccentColorResetButtonState();
          return;
        }
        accentColorInputElement.value = DEFAULT_ACCENT_COLOR;
        let eventHandled = false;
        try {
          const inputEvent = new Event('input', { bubbles: true });
          eventHandled = accentColorInputElement.dispatchEvent(inputEvent);
        } catch (error) {
          void error;
          if (typeof document !== 'undefined' && document.createEvent) {
            const legacyEvent = document.createEvent('Event');
            legacyEvent.initEvent('input', true, true);
            eventHandled = accentColorInputElement.dispatchEvent(legacyEvent);
          }
        }
        if (!eventHandled) {
          applyAccentColor(DEFAULT_ACCENT_COLOR);
        }
        updateAccentColorResetButtonState();
      });
    }

    // Font preferences
    var fontSize = '16';
    if (typeof window !== 'undefined') {
      try {
        Object.defineProperty(window, 'fontSize', {
          get: function () { return fontSize; },
          set: function (v) { fontSize = v; },
          configurable: true
        });
      } catch (e) { void e; }
    }
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
      try {
        Object.defineProperty(CORE_GLOBAL_SCOPE, 'fontSize', {
          get: function () { return fontSize; },
          set: function (v) { fontSize = v; },
          configurable: true
        });
      } catch (e) { void e; }
    }
    var fontFamily = "'Ubuntu', sans-serif";

    const uiScaleRoot = document.documentElement;
    const defaultUIScaleValues = {
      '--page-padding': 20,
      '--gap-size': 10,
      '--button-size': 32,
      '--border-radius': 5,
      '--form-label-width': 150,
      '--form-label-min-width': 120,
      '--form-action-width': 110
    };
    const uiScaleProperties = Object.keys(defaultUIScaleValues);
    const baseUIScaleValues = { ...defaultUIScaleValues };
    let baseFontSize = 16;

    if (uiScaleRoot) {
      try {
        const computedStyle = getComputedStyle(uiScaleRoot);
        const computedFontSize = parseFloat(computedStyle.fontSize);
        if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
          baseFontSize = computedFontSize;
        }
        for (const prop of uiScaleProperties) {
          const value = parseFloat(computedStyle.getPropertyValue(prop));
          if (Number.isFinite(value) && value > 0) {
            baseUIScaleValues[prop] = value;
          }
        }
      } catch (error) {
        console.warn('Unable to read computed styles for UI scaling', error);
      }
    }

    const customFontStorageKeyName =
      typeof CUSTOM_FONT_STORAGE_KEY_NAME !== 'undefined'
        ? CUSTOM_FONT_STORAGE_KEY_NAME
        : typeof CUSTOM_FONT_STORAGE_KEY !== 'undefined'
          ? CUSTOM_FONT_STORAGE_KEY
          : 'cameraPowerPlanner_customFonts';
    var customFontEntries = new Map();

    const SUPPORTED_FONT_TYPES = new Set([
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/font-woff',
      'application/font-woff2',
      'application/x-font-ttf',
      'application/x-font-opentype'
    ]);

    const SUPPORTED_FONT_EXTENSIONS = ['.ttf', '.otf', '.ttc', '.woff', '.woff2'];

    function loadCustomFontMetadataFromStorage() {
      if (typeof localStorage === 'undefined') return [];
      try {
        const raw = localStorage.getItem(customFontStorageKeyName);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .map(entry => ({
            id: entry && typeof entry.id === 'string' ? entry.id : null,
            name: entry && typeof entry.name === 'string' ? entry.name : '',
            data: entry && typeof entry.data === 'string' ? entry.data : ''
          }))
          .filter(entry => entry.id && entry.name && entry.data);
      } catch (error) {
        console.warn('Failed to load stored custom fonts', error);
        return [];
      }
    }

    function persistCustomFontsToStorage() {
      if (typeof localStorage === 'undefined') return true;
      try {
        const payload = Array.from(customFontEntries.values()).map(entry => ({
          id: entry.id,
          name: entry.name,
          data: entry.data
        }));
        localStorage.setItem(customFontStorageKeyName, JSON.stringify(payload));
        return true;
      } catch (error) {
        console.warn('Could not save custom fonts', error);
        return false;
      }
    }

    function sanitizeCustomFontName(name) {
      if (!name) return 'Custom Font';
      const trimmed = String(name).trim();
      if (!trimmed) return 'Custom Font';
      return trimmed.replace(/\s+/g, ' ').slice(0, 80);
    }

    function deriveFontNameFromFile(file) {
      if (!file) return 'Custom Font';
      const rawName = typeof file.name === 'string' ? file.name : '';
      if (!rawName) return 'Custom Font';
      const withoutExtension = rawName.replace(/\.[^.]+$/, '');
      const candidate = withoutExtension || rawName;
      return sanitizeCustomFontName(candidate);
    }

    function ensureUniqueCustomFontName(baseName) {
      const sanitizedBase = sanitizeCustomFontName(baseName);
      if (!settingsFontFamily) return sanitizedBase;
      let candidate = sanitizedBase;
      let suffix = 2;
      while (
        Array.from(settingsFontFamily.options).some(
          opt => opt.value === buildFontFamilyValue(candidate)
        )
      ) {
        candidate = `${sanitizedBase} ${suffix}`;
        suffix += 1;
      }
      return candidate;
    }

    function cssEscapeFontName(name) {
      if (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function') {
        return CSS.escape(name);
      }
      return String(name).replace(/['"\\]/g, match => `\\${match}`);
    }

    async function registerCustomFontSource(name, dataUrl, id) {
      if (!name || !dataUrl || typeof document === 'undefined') return false;
      let loaded = false;
      if (
        typeof FontFace === 'function' &&
        document.fonts &&
        typeof document.fonts.add === 'function'
      ) {
        try {
          const fontFace = new FontFace(name, `url(${dataUrl})`);
          await fontFace.load();
          document.fonts.add(fontFace);
          loaded = true;
        } catch (error) {
          console.warn('Failed to load custom font via FontFace', error);
        }
      }
      if (!loaded) {
        try {
          const safeId = id || cssEscapeFontName(name).replace(/[^a-z0-9_-]+/gi, '-');
          const styleId = `customFontStyle-${safeId}`;
          let styleElement = document.getElementById(styleId);
          if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            if (document.head) {
              document.head.appendChild(styleElement);
            } else {
              document.body.appendChild(styleElement);
            }
          }
          const escapedName = cssEscapeFontName(name);
          styleElement.textContent = `@font-face { font-family: '${escapedName}'; src: url(${dataUrl}); font-display: swap; }`;
          loaded = true;
        } catch (styleError) {
          console.warn('Failed to inject custom font style', styleError);
          return false;
        }
      }
      return loaded;
    }

    async function applyStoredCustomFont(entry) {
      if (!entry || !entry.id) return null;
      const value = buildFontFamilyValue(entry.name);
      const { option } = ensureFontFamilyOption(value, entry.name, localFontsGroup, 'uploaded');
      if (option) {
        option.dataset.fontId = entry.id;
      }
      await registerCustomFontSource(entry.name, entry.data, entry.id);
      return value;
    }

    async function loadStoredCustomFonts() {
      const stored = loadCustomFontMetadataFromStorage();
      if (!stored.length) return;
      for (const entry of stored) {
        const normalized = {
          id: entry.id,
          name: sanitizeCustomFontName(entry.name),
          data: entry.data
        };
        customFontEntries.set(normalized.id, normalized);
        try {
          await applyStoredCustomFont(normalized);
        } catch (error) {
          console.warn('Failed to restore custom font', normalized.name, error);
        }
      }
    }

    function resetCustomFontsForFactoryReset() {
      const hadEntries = customFontEntries && typeof customFontEntries.size === 'number'
        ? customFontEntries.size > 0
        : false;

      if (customFontEntries && typeof customFontEntries.clear === 'function') {
        customFontEntries.clear();
      }

      let removedUploadedOption = false;

      if (settingsFontFamily && settingsFontFamily.options) {
        const options = Array.from(settingsFontFamily.options || []);
        options.forEach(option => {
          if (!option || !option.dataset || option.dataset.source !== 'uploaded') {
            return;
          }
          removedUploadedOption = true;
          const fontId = option.dataset.fontId || '';
          if (option.parentNode && typeof option.parentNode.removeChild === 'function') {
            option.parentNode.removeChild(option);
          } else if (typeof settingsFontFamily.removeChild === 'function') {
            settingsFontFamily.removeChild(option);
          }
          if (fontId && typeof document !== 'undefined') {
            const styleId = `customFontStyle-${fontId}`;
            const styleNode = document.getElementById(styleId);
            if (styleNode && styleNode.parentNode) {
              styleNode.parentNode.removeChild(styleNode);
            }
          }
        });

        const hasCurrentSelection = options.some(
          option => option && option.value === settingsFontFamily.value,
        );
        if (!hasCurrentSelection) {
          if (settingsFontFamily.options.length) {
            settingsFontFamily.selectedIndex = 0;
          } else {
            settingsFontFamily.value = '';
          }
        }
      }

      if (typeof document !== 'undefined' && document.querySelectorAll) {
        const inlineStyles = document.querySelectorAll('style[id^="customFontStyle-"]');
        inlineStyles.forEach(styleNode => {
          if (styleNode && styleNode.parentNode) {
            styleNode.parentNode.removeChild(styleNode);
          }
        });
      }

      if (typeof setLocalFontsStatus === 'function' && (hadEntries || removedUploadedOption)) {
        setLocalFontsStatus(null);
      }
    }

    function isSupportedFontFile(file) {
      if (!file) return false;
      const type = typeof file.type === 'string' ? file.type.toLowerCase() : '';
      if (type && SUPPORTED_FONT_TYPES.has(type)) {
        return true;
      }
      const name = typeof file.name === 'string' ? file.name.toLowerCase() : '';
      return SUPPORTED_FONT_EXTENSIONS.some(ext => name.endsWith(ext));
    }

    function readFileAsDataURL(file) {
      return new Promise((resolve, reject) => {
        if (typeof FileReader !== 'function') {
          reject(new Error('FileReader is unavailable'));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
        try {
          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
    }

    async function addCustomFontFromData(name, dataUrl, { persist = true } = {}) {
      const uniqueName = ensureUniqueCustomFontName(name);
      const value = buildFontFamilyValue(uniqueName);
      const { option } = ensureFontFamilyOption(value, uniqueName, localFontsGroup, 'uploaded');
      if (!option) {
        return { name: uniqueName, value, persisted: false };
      }
      let entryId = option.dataset.fontId;
      if (!entryId) {
        entryId = `custom-font-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        option.dataset.fontId = entryId;
      }
      const entry = { id: entryId, name: uniqueName, data: dataUrl };
      customFontEntries.set(entryId, entry);
      await registerCustomFontSource(uniqueName, dataUrl, entryId);
      let persisted = true;
      if (persist && !persistCustomFontsToStorage()) {
        persisted = false;
      }
      return { name: uniqueName, value, persisted };
    }

    async function handleLocalFontFiles(fileList) {
      if (!fileList || fileList.length === 0) {
        setLocalFontsStatus('localFontsNoFonts');
        return;
      }
      if (localFontsButtonElement) {
        localFontsButtonElement.disabled = true;
      }
      const added = [];
      const unsupported = [];
      const failed = [];
      let persistFailure = false;
      for (const file of Array.from(fileList)) {
        if (!isSupportedFontFile(file)) {
          unsupported.push(file && typeof file.name === 'string' ? file.name : '');
          continue;
        }
        try {
          const dataUrl = await readFileAsDataURL(file);
          if (!dataUrl) {
            failed.push(file && file.name ? file.name : '');
            continue;
          }
          const result = await addCustomFontFromData(deriveFontNameFromFile(file), dataUrl);
          added.push(result);
          if (!result.persisted) {
            persistFailure = true;
          }
        } catch (error) {
          console.warn('Failed to import custom font', error);
          failed.push(file && typeof file.name === 'string' ? file.name : '');
        }
      }
      if (added.length > 0) {
        if (settingsFontFamily) {
          settingsFontFamily.value = added[0].value;
        }
        setLocalFontsStatus(
          'localFontsAdded',
          added.map(item => item.name).join(', ')
        );
      } else if (unsupported.length > 0) {
        setLocalFontsStatus('localFontsUnsupportedFiles', unsupported.join(', '));
      } else if (failed.length > 0) {
        setLocalFontsStatus('localFontsError');
      } else {
        setLocalFontsStatus('localFontsNoFonts');
      }

      if (persistFailure) {
        const message = getLocalizedText('localFontsSaveError');
        if (message) {
          showNotification('warning', message);
        }
      }
      if (unsupported.length > 0 && added.length > 0) {
        const message = getLocalizedText('localFontsUnsupportedFiles');
        if (message) {
          showNotification(
            'warning',
            message.replace('%s', unsupported.join(', '))
          );
        }
      }
      if (failed.length > 0) {
        const message = getLocalizedText('localFontsError');
        if (message) {
          showNotification('error', message);
        }
      }

      if (localFontsButtonElement) {
        localFontsButtonElement.disabled = false;
      }
    }

    async function normalizeFontResults(result) {
      if (!result) return [];
      if (Array.isArray(result)) return result;

      const hasSymbol = typeof Symbol === 'function';
      const asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator;
      if (asyncIteratorSymbol && typeof result[asyncIteratorSymbol] === 'function') {
        const fonts = [];
        for await (const font of result) {
          fonts.push(font);
        }
        return fonts;
      }

      const iteratorSymbol = hasSymbol && Symbol.iterator;
      if (iteratorSymbol && typeof result[iteratorSymbol] === 'function') {
        return Array.from(result);
      }

      return [];
    }

    const queryAvailableLocalFonts = (() => {
      if (typeof window === 'undefined') return null;
      if (typeof window.queryLocalFonts === 'function') {
        return async options => normalizeFontResults(await window.queryLocalFonts(options));
      }
      if (
        typeof navigator !== 'undefined' &&
        navigator &&
        navigator.fonts &&
        typeof navigator.fonts.query === 'function'
      ) {
        const { fonts } = navigator;
        return async options => normalizeFontResults(await fonts.query.call(fonts, options));
      }
      return null;
    })();

    const supportsLocalFonts = typeof queryAvailableLocalFonts === 'function';
    const localFontsButtonElement = resolveGlobalElement('localFontsButton', 'localFontsButton');
    var localFontsStatus = resolveGlobalElement('localFontsStatus', 'localFontsStatus');
    const localFontsInputElement = resolveGlobalElement('localFontsInput', 'localFontsInput');
    var settingsFontFamily =
      typeof settingsFontFamily !== 'undefined'
        ? settingsFontFamily
        : resolveGlobalElement('settingsFontFamily', 'settingsFontFamily');
    var settingsFontSize =
      typeof settingsFontSize !== 'undefined'
        ? settingsFontSize
        : resolveGlobalElement('settingsFontSize', 'settingsFontSize');
    const canUploadFontFiles =
      !!(
        localFontsInputElement &&
        typeof window !== 'undefined' &&
        typeof window.FileReader === 'function' &&
        typeof localFontsInputElement.click === 'function'
      );

    function getLocalizedText(key) {
      if (texts[currentLang] && texts[currentLang][key]) return texts[currentLang][key];
      if (texts.en && texts.en[key]) return texts.en[key];
      return '';
    }

    function guessFontFallback(name) {
      if (!name) return 'sans-serif';
      const lower = name.toLowerCase();
      if (/(mono|code|console|courier|menlo|fixed|inconsolata|monaco)/.test(lower)) {
        return 'monospace';
      }
      if (/(serif|times|garamond|georgia|baskerville|roman|palatino|bodoni|bookman)/.test(lower)) {
        return 'serif';
      }
      if (/(script|hand|brush|cursive|calligraphy|marker)/.test(lower)) {
        return 'cursive';
      }
      return 'sans-serif';
    }

    function buildFontFamilyValue(name) {
      if (!name) return fontFamily;
      const escaped = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `'${escaped}', ${guessFontFallback(name)}`;
    }

    function extractFontLabel(value) {
      if (!value) return '';
      const trimmed = value.trim();
      if (!trimmed) return '';
      const firstChar = trimmed[0];
      if (firstChar === "'" || firstChar === '"') {
        let result = '';
        for (let i = 1; i < trimmed.length; i += 1) {
          const ch = trimmed[i];
          if (ch === '\\') {
            if (i + 1 < trimmed.length) {
              result += trimmed[i + 1];
              i += 1;
            }
          } else if (ch === firstChar) {
            return result;
          } else {
            result += ch;
          }
        }
        return result;
      }
      const commaIdx = trimmed.indexOf(',');
      if (commaIdx !== -1) return trimmed.slice(0, commaIdx).trim();
      return trimmed;
    }

    function ensureFontFamilyOption(value, label, targetGroup, source) {
      if (!settingsFontFamily || !value) {
        return { option: null, created: false };
      }
      const existing = Array.from(settingsFontFamily.options).find(opt => opt.value === value);
      if (existing) {
        if (source) existing.dataset.source = source;
        if (label && !existing.textContent.trim()) existing.textContent = label;
        return { option: existing, created: false };
      }
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label || extractFontLabel(value);
      if (source) option.dataset.source = source;
      const container = targetGroup && typeof targetGroup.appendChild === 'function'
        ? targetGroup
        : settingsFontFamily;
      container.appendChild(option);
      return { option, created: true };
    }

    function setLocalFontsStatus(key, replacement) {
      if (!localFontsStatus || !key) {
        if (localFontsStatus) {
          localFontsStatus.textContent = '';
          localFontsStatus.setAttribute('hidden', '');
          delete localFontsStatus.dataset.statusKey;
          delete localFontsStatus.dataset.statusArg;
        }
        return;
      }
      const template = getLocalizedText(key);
      const hasReplacement = replacement !== undefined && replacement !== null;
      let message = template;
      if (hasReplacement) {
        const replacementText = String(replacement);
        message = template ? template.replace('%s', replacementText) : replacementText;
        localFontsStatus.dataset.statusArg = replacementText;
      } else {
        delete localFontsStatus.dataset.statusArg;
      }
      localFontsStatus.dataset.statusKey = key;
      localFontsStatus.textContent = message;
      localFontsStatus.removeAttribute('hidden');
    }

    async function requestLocalFonts() {
      if (!supportsLocalFonts || !localFontsButtonElement || !queryAvailableLocalFonts) return;
      localFontsButtonElement.disabled = true;
      try {
        const fonts = await queryAvailableLocalFonts();
        if (!Array.isArray(fonts) || fonts.length === 0) {
          setLocalFontsStatus('localFontsNoFonts');
          return;
        }
        const added = [];
        const duplicates = [];
        const seenValues = new Set();
        for (const font of fonts) {
          const rawName = font && (font.family || font.fullName || font.postscriptName);
          const name = rawName ? String(rawName).trim() : '';
          if (!name) continue;
          const value = buildFontFamilyValue(name);
          if (seenValues.has(value)) {
            duplicates.push(name);
            continue;
          }
          const { option, created } = ensureFontFamilyOption(
            value,
            name,
            localFontsGroup,
            'local'
          );
          if (!option) continue;
          seenValues.add(option.value);
          if (created) {
            added.push({ name, value: option.value });
          } else {
            duplicates.push(name);
          }
        }
        if (added.length > 0) {
          if (settingsFontFamily) {
            settingsFontFamily.value = added[0].value;
          }
          setLocalFontsStatus(
            'localFontsAdded',
            added.map(item => item.name).join(', ')
          );
        } else if (duplicates.length > 0) {
          setLocalFontsStatus('localFontsAlreadyAdded', duplicates.join(', '));
        } else {
          setLocalFontsStatus('localFontsNoFonts');
        }
      } catch (err) {
        console.error('Could not access local fonts', err);
        if (
          err &&
          (err.name === 'NotAllowedError' || err.name === 'SecurityError') &&
          canUploadFontFiles
        ) {
          setLocalFontsStatus('localFontsPermissionNeeded');
        } else {
          setLocalFontsStatus('localFontsError');
        }
      } finally {
        localFontsButtonElement.disabled = false;
      }
    }

    if (localFontsButtonElement) {
      if (supportsLocalFonts || canUploadFontFiles) {
        localFontsButtonElement.removeAttribute('hidden');
        localFontsButtonElement.addEventListener('click', () => {
          if (supportsLocalFonts) {
            requestLocalFonts();
          } else if (canUploadFontFiles && localFontsInputElement) {
            localFontsInputElement.click();
          }
        });
        if (!supportsLocalFonts && canUploadFontFiles) {
          setLocalFontsStatus('localFontsFileFallback');
        }
      } else {
        setLocalFontsStatus('localFontsUnsupported');
      }
    }

    if (localFontsInputElement) {
      localFontsInputElement.addEventListener('change', () => {
        if (localFontsInputElement.files && localFontsInputElement.files.length > 0) {
          handleLocalFontFiles(localFontsInputElement.files);
        } else {
          setLocalFontsStatus('localFontsNoFonts');
        }
        try {
          localFontsInputElement.value = '';
        } catch {
          // ignore reset errors
        }
      });
    }

    loadStoredCustomFonts().catch(error => {
      console.warn('Unable to restore stored custom fonts', error);
    });

    function applyFontSize(size) {
      const numericSize = parseFloat(size);
      if (!Number.isFinite(numericSize) || numericSize <= 0) {
        return;
      }

      document.documentElement.style.fontSize = `${numericSize}px`;

      if (!Number.isFinite(baseFontSize) || baseFontSize <= 0) {
        return;
      }

      const scale = numericSize / baseFontSize;
      for (const prop of uiScaleProperties) {
        const baseValue = baseUIScaleValues[prop];
        if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
        document.documentElement.style.setProperty(prop, `${baseValue * scale}px`);
      }
      document.documentElement.style.setProperty('--ui-scale', String(scale));
    }

    function applyFontFamily(family) {
      document.documentElement.style.setProperty('--font-family', family);
    }

    try {
      const storedSize = localStorage.getItem('fontSize');
      if (storedSize) {
        fontSize = storedSize;
        applyFontSize(fontSize);
      }
      const storedFamily = localStorage.getItem('fontFamily');
      if (storedFamily) {
        fontFamily = storedFamily;
        applyFontFamily(fontFamily);
      }
    } catch (e) {
      console.warn('Could not load font preferences', e);
    }

    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) {
      const hasStoredOption = Array.from(settingsFontFamily.options).some(
        opt => opt.value === fontFamily
      );
      if (!hasStoredOption && fontFamily) {
        ensureFontFamilyOption(fontFamily, extractFontLabel(fontFamily), localFontsGroup, 'local');
      }
      settingsFontFamily.value = fontFamily;
    }

    var revertAccentColor = () => {
      if (document.body && document.body.classList.contains('pink-mode')) {
        if (shouldPreserveAccentInPinkMode()) {
          applyAccentColor(prevAccentColor);
        } else {
          clearAccentColorOverrides();
        }
        return;
      }
      applyAccentColor(prevAccentColor);
    };

    function populateFeatureSearch() {
      featureMap.clear();
      helpMap.clear();
      deviceMap.clear();
      featureSearchEntries = [];
      featureSearchDefaultOptions = [];
      featureSearchEntryIndex.clear();
      const defaultOptionValues = new Set();
      const registerOption = entry => {
        const optionData = buildFeatureSearchOptionData(entry);
        if (!optionData || !optionData.value || defaultOptionValues.has(optionData.value)) {
          return;
        }
        defaultOptionValues.add(optionData.value);
        featureSearchDefaultOptions.push(optionData);
      };
      const registerDeviceMapEntry = (key, entry, options = {}) => {
        if (!key || !entry) return false;
        const skipIfExists = options && options.skipIfExists === true;
        if (!deviceMap.has(key)) {
          deviceMap.set(key, entry);
          return true;
        }
        if (skipIfExists) {
          return false;
        }
        const existing = deviceMap.get(key);
        if (Array.isArray(existing)) {
          existing.push(entry);
        } else {
          deviceMap.set(key, [existing, entry]);
        }
        return true;
      };
      const registerDeviceLibraryEntriesForSearch = () => {
        if (!deviceLibrarySearchEntries.length) {
          rebuildDeviceLibrarySearchIndex();
        }
        if (!deviceLibrarySearchEntries.length) {
          return;
        }
        deviceLibrarySearchEntries.forEach(entry => {
          if (!entry || !entry.label) return;
          const key = entry.key || searchKey(entry.label);
          const tokens = entry.tokens || searchTokens(entry.label);
          const primaryTokens = entry.primaryTokens || searchTokens(entry.label);
          const deviceEntry = {
            entryType: 'deviceLibrary',
            label: entry.label,
            value: entry.label,
            tokens,
            primaryTokens,
            element: entry.focusTarget || entry.element,
            rawElement: entry.element,
            categoryKey: entry.categoryKey,
            categoryLabel: entry.categoryLabel,
            summary: entry.summary,
            focusLibraryEntry: () => focusDeviceLibraryEntry(entry, { skipScroll: true }),
            highlightLibraryEntry: () => highlightDeviceLibraryElement(entry.focusTarget || entry.element),
          };
          registerDeviceMapEntry(key, deviceEntry);
          const optionLabel = `${entry.label} · ${entry.categoryLabel}`;
          const detail = buildDeviceEntryDetailText(deviceEntry) || entry.summary || entry.categoryLabel;
          const deviceData = {
            type: 'device',
            key,
            display: optionLabel,
            tokens,
            primaryTokens,
            value: deviceEntry,
            detail,
          };
          registerOption(deviceData);
          featureSearchEntries.push(deviceData);
        });
      };
      registerDeviceLibraryEntriesForSearch();
      document
        .querySelectorAll('h2[id], legend[id], h3[id], h4[id]')
        .forEach(el => {
          if (helpDialog && helpDialog.contains(el)) return;
          const name = el.textContent.trim();
          if (!name) return;
          const keywords = el.dataset?.searchKeywords || el.getAttribute('data-search-keywords') || '';
          const entry = buildFeatureSearchEntry(el, { label: name, keywords });
          if (!entry || !entry.key) return;
          const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
          if (!display) return;
          const entryData = {
            type: 'feature',
            key: entry.key,
            display,
            tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
            primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
            value: entry,
            optionLabel: entry.displayLabel || entry.baseLabel || display,
            detail: buildFeatureEntryDetailText(entry)
          };
          registerOption(entryData);
          featureSearchEntries.push(entryData);
        });

      try {
        const extraElements = document.querySelectorAll(FEATURE_SEARCH_EXTRA_SELECTOR);
        let processedExtras = 0;
        extraElements.forEach((el, index) => {
          if (processedExtras > 100) return;
          processedExtras++;
          if (el.tagName === 'BUTTON') return; // Skip buttons to test if they cause hang
          if (!el || (helpDialog && helpDialog.contains(el))) return;
          const label = getFeatureSearchLabel(el);
          if (!label) return;
          const keywords = getFeatureSearchKeywords(el);
          const entry = buildFeatureSearchEntry(el, { label, keywords });
          if (!entry || !entry.key) return;
          const display = entry.optionValue || entry.displayLabel || entry.baseLabel;
          if (!display) return;
          const entryType = getFeatureSearchEntryType(el);
          const entryData = {
            type: entryType,
            key: entry.key,
            display,
            tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
            primaryTokens: Array.isArray(entry.primaryTokens) ? entry.primaryTokens : [],
            value: entry,
            optionLabel: entry.displayLabel || entry.baseLabel || display,
            detail: buildFeatureEntryDetailText(entry)
          };
          registerOption(entryData);
          featureSearchEntries.push(entryData);
        });
      } catch (extraError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('app-core-new-2.js: error querying extra elements', extraError);
        }
      }
      if (helpDialog) {
        helpDialog.querySelectorAll('section[data-help-section]').forEach(section => {
          const heading = section.querySelector('h3');
          if (!heading) return;
          const label = heading.textContent.trim();
          if (!label) return;
          const keywords = section.dataset.helpKeywords || '';
          const key = searchKey(label);
          const tokens = searchTokens(`${label} ${keywords}`.trim());
          const primaryTokens = searchTokens(label);
          const helpEntry = {
            section,
            label,
            tokens
          };
          helpMap.set(key, helpEntry);
          const optionValue = `${label} (help)`;
          const helpData = {
            type: 'help',
            key,
            display: optionValue,
            tokens,
            primaryTokens,
            value: helpEntry,
            optionLabel: label,
            detail: buildHelpSectionDetailText(section)
          };
          registerOption(helpData);
          featureSearchEntries.push(helpData);
        });
      }

      document.querySelectorAll('select').forEach(sel => {
        sel.querySelectorAll('option').forEach(opt => {
          const name = opt.textContent.trim();
          if (!name || opt.value === 'None') return;
          const key = searchKey(name);
          if (deviceMap.has(key)) {
            return;
          }
          const keywords =
            opt.dataset?.searchKeywords ||
            opt.getAttribute('data-search-keywords') ||
            sel.dataset?.searchKeywords ||
            sel.getAttribute('data-search-keywords') ||
            '';
          const tokens = searchTokens(`${name} ${keywords}`.trim());
          const primaryTokens = searchTokens(name);
          const deviceEntry = {
            select: sel,
            value: opt.value,
            label: name,
            tokens
          };
          const added = registerDeviceMapEntry(key, deviceEntry, { skipIfExists: true });
          if (!added) {
            return;
          }
          const deviceData = {
            type: 'device',
            key,
            display: name,
            tokens,
            primaryTokens,
            value: deviceEntry,
            optionLabel: name,
            detail: buildDeviceEntryDetailText(deviceEntry)
          };
          registerOption(deviceData);
          featureSearchEntries.push(deviceData);
        });
      });

      // [COMMAND PALETTE] Register Actions
      const commandActions = [
        {
          label: 'Create New Project',
          key: 'action-create-new-project',
          action: 'create-new-project',
          keywords: 'new clear reset start scratch empty',
          detail: 'Clear current project and start fresh',
          icon: ICON_GLYPHS.resetView
        },
        {
          label: 'Save Project',
          key: 'action-save-project',
          action: 'save-project',
          keywords: 'save download keep store backup',
          detail: 'Save current configuration to file',
          icon: ICON_GLYPHS.save
        },
        {
          label: 'Export Project',
          key: 'action-export-project',
          action: 'export-project',
          keywords: 'export share send bundle package',
          detail: 'Create a shareable bundle',
          icon: ICON_GLYPHS.share
        },
        {
          label: 'Toggle Dark Mode',
          key: 'action-toggle-dark-mode',
          action: 'toggle-dark-mode',
          keywords: 'dark light theme mode night day switch toggle',
          detail: 'Switch between light and dark themes',
          icon: ICON_GLYPHS.moon
        },
        {
          label: 'Toggle Pink Mode',
          key: 'action-toggle-pink-mode',
          action: 'toggle-pink-mode',
          keywords: 'pink barbie theme mode color style switch toggle',
          detail: 'Toggle the special Pink Mode theme',
          icon: ICON_GLYPHS.star
        },
        {
          label: 'Open Settings',
          key: 'action-open-settings',
          action: 'open-settings',
          keywords: 'settings preferences config options gear setup',
          detail: 'Open application settings dialog',
          icon: ICON_GLYPHS.gears
        },
        {
          label: 'Open Help Center',
          key: 'action-open-help',
          action: 'open-help',
          keywords: 'help support guide manual docs documentation info',
          detail: 'Open the Help Center',
          icon: ICON_GLYPHS.note
        },
        {
          label: 'Force Reload',
          key: 'action-force-reload',
          action: 'force-reload',
          keywords: 'reload refresh restart update clear cache',
          detail: 'Reload the application and clear caches',
          icon: ICON_GLYPHS.reload
        }
      ];

      commandActions.forEach(cmd => {
        const key = cmd.key;
        const tokens = searchTokens(`${cmd.label} ${cmd.keywords}`.trim());
        const primaryTokens = searchTokens(cmd.label);

        const actionEntry = {
          type: 'action',
          key,
          display: cmd.label,
          tokens,
          primaryTokens,
          value: {
            type: 'action',
            action: cmd.action,
            label: cmd.label,
            key,
            icon: cmd.icon
          },
          optionLabel: cmd.label,
          detail: cmd.detail
        };

        registerOption(actionEntry);
        featureSearchEntries.push(actionEntry);
      });

      registerDeviceLibraryEntriesForSearch();
      featureSearchEntries.forEach(entry => {
        if (!entry || !entry.key) return;
        const type = entry.type || 'feature';
        const mapKey = buildFeatureSearchHistoryKey(entry.key, type);
        featureSearchEntryIndex.set(mapKey, entry);
      });
      loadFeatureSearchHistory();
      cleanupFeatureSearchHistory();
      renderFeatureListOptions(featureSearchDefaultOptions);
      if (featureSearch && featureSearch.value) {
        updateFeatureSearchSuggestions(featureSearch.value);
      }
    }

    function setProjectRequirementButtonsText() {
      const langTexts = texts[currentLang] || texts.en || {};
      const fallbackTexts = texts.en || {};
      const editLabel = langTexts.editProjectBtn || fallbackTexts.editProjectBtn || 'Edit Project requirements';
      const extraLabel = langTexts.addExtraGearBtn || fallbackTexts.addExtraGearBtn || 'Add temporary extra gear';
      const editBtn = document.getElementById('editProjectBtn');
      if (editBtn) {
        editBtn.textContent = editLabel;
        editBtn.setAttribute('title', editLabel);
        editBtn.setAttribute('data-help', editLabel);
      }
      const extraBtn = document.getElementById('addExtraGearBtn');
      if (extraBtn) {
        extraBtn.textContent = extraLabel;
        extraBtn.setAttribute('title', extraLabel);
        extraBtn.setAttribute('data-help', extraLabel);
      }
    }

    function ensureProjectRequirementButtons() {
      let container = null;
      if (projectRequirementsOutput && !projectRequirementsOutput.classList.contains('hidden')) {
        container = projectRequirementsOutput;
      } else if (gearListOutput && !gearListOutput.classList.contains('hidden')) {
        container = gearListOutput;
      }
      if (!container) {
        const editBtnExisting = document.getElementById('editProjectBtn');
        if (editBtnExisting) editBtnExisting.remove();
        const extraBtnExisting = document.getElementById('addExtraGearBtn');
        if (extraBtnExisting) extraBtnExisting.remove();
        return;
      }
      let btn = document.getElementById('editProjectBtn');
      if (!btn) {
        btn = document.createElement('button');
        btn.id = 'editProjectBtn';
      }

      const legacyButtonParent = btn.parentElement;
      if (legacyButtonParent && legacyButtonParent !== container && legacyButtonParent.id !== 'editProjectBtn') {
        legacyButtonParent.removeChild(btn);
      }

      if (!btn.dataset.editProjectBound) {
        btn.type = 'button';
        btn.addEventListener('click', () => {
          const infoForDialog = typeof getProjectDialogSeedInfo === 'function'
            ? getProjectDialogSeedInfo()
            : currentProjectInfo
              ? { ...currentProjectInfo }
              : (projectForm ? collectProjectFormData() : {});
          if (typeof openProjectDialogWithInfo === 'function') {
            openProjectDialogWithInfo(infoForDialog);
          } else {
            if (projectForm) {
              populateProjectForm(infoForDialog || {});
            }
            openDialog(projectDialog);
          }
        });
        btn.dataset.editProjectBound = 'true';
      }
      let extraBtn = document.getElementById('addExtraGearBtn');
      if (!extraBtn) {
        extraBtn = document.createElement('button');
        extraBtn.id = 'addExtraGearBtn';
      }
      if (!extraBtn.dataset.extraGearBound) {
        extraBtn.type = 'button';
        extraBtn.addEventListener('click', () => {
          try {
            if (typeof document !== 'undefined') {
              document.dispatchEvent(new CustomEvent('gearlist:add-extra-gear'));
            }
          } catch (error) {
            console.warn('Unable to request extra gear addition', error);
          }
        });
        extraBtn.dataset.extraGearBound = 'true';
      }
      const title = container.querySelector('h2');
      if (title && btn.parentElement !== container) {
        title.insertAdjacentElement('afterend', btn);
        if (extraBtn.parentElement !== container) {
          btn.insertAdjacentElement('afterend', extraBtn);
        }
      } else if (!title) {
        if (extraBtn.parentElement !== container) {
          container.prepend(extraBtn);
        }
        if (btn.parentElement !== container) {
          container.prepend(btn);
        }
      } else if (btn.parentElement === container && extraBtn.parentElement !== container) {
        btn.insertAdjacentElement('afterend', extraBtn);
      }
      btn.type = 'button';
      extraBtn.type = 'button';
      setProjectRequirementButtonsText();
    }

    function updateGearListButtonVisibility() {
      const hasGear =
        gearListOutput &&
        !gearListOutput.classList.contains('hidden') &&
        gearListOutput.innerHTML.trim() !== '';
      if (hasGear) {
        generateGearListBtn.classList.add('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.remove('hidden');
        }
        ensureProjectRequirementButtons();
      } else {
        generateGearListBtn.classList.remove('hidden');
        if (deleteGearListProjectBtn) {
          deleteGearListProjectBtn.classList.add('hidden');
        }
        const btn = document.getElementById('editProjectBtn');
        if (btn) btn.remove();
        const extraBtn = document.getElementById('addExtraGearBtn');
        if (extraBtn) extraBtn.remove();
      }
    }

    function annotateGearTableCategoryGroups(table) {
      if (!table) return;
      const groups = table.querySelectorAll('tbody.category-group');
      groups.forEach(group => {
        const headingCell = group.querySelector('.category-row td');
        if (!headingCell) return;
        const label = headingCell.textContent ? headingCell.textContent.trim() : '';
        if (!label) return;
        if (group.getAttribute('data-gear-table-category') === label) return;
        group.setAttribute('data-gear-table-category', label);
      });
    }

    function ensureGearTableCategoryGrouping(table) {
      if (!table) return;
      const doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
      if (!doc) return;
      const existingCategoryGroups = table.querySelectorAll('tbody.category-group');
      if (existingCategoryGroups.length) {
        existingCategoryGroups.forEach(group => {
          if (!group.classList.contains('category-group')) {
            group.classList.add('category-group');
          }
        });
        table.querySelectorAll('tbody').forEach(group => {
          if (group.querySelector('tr.category-row')) {
            group.classList.add('category-group');
          }
        });
        annotateGearTableCategoryGroups(table);
        return;
      }
      const rows = Array.from(table.rows || []);
      if (!rows.length) return;
      const newGroups = [];
      let currentGroup = null;
      rows.forEach(row => {
        if (row.classList.contains('category-row')) {
          currentGroup = doc.createElement('tbody');
          currentGroup.className = 'category-group';
          currentGroup.appendChild(row);
          newGroups.push(currentGroup);
        } else {
          if (!currentGroup) {
            currentGroup = doc.createElement('tbody');
            currentGroup.className = 'category-group';
            newGroups.push(currentGroup);
          }
          currentGroup.appendChild(row);
        }
      });
      Array.from(table.tBodies || []).forEach(body => {
        if (!body.rows.length || !body.classList.contains('category-group')) {
          body.remove();
        }
      });
      newGroups.forEach(group => {
        if (group.rows.length) table.appendChild(group);
      });
      annotateGearTableCategoryGroups(table);
    }

    let overviewTitleCandidatesCache = null;

    function getOverviewTitleCandidates() {
      if (overviewTitleCandidatesCache && overviewTitleCandidatesCache.length) {
        return overviewTitleCandidatesCache;
      }
      const variants = new Set();
      if (typeof texts === 'object' && texts !== null) {
        Object.values(texts).forEach(lang => {
          const label = lang && typeof lang.overviewTitle === 'string'
            ? lang.overviewTitle.trim()
            : '';
          if (label) variants.add(label);
        });
      }
      variants.add('Project Overview and Gear List');
      variants.add('Project Overview');
      overviewTitleCandidatesCache = Array.from(variants)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
      return overviewTitleCandidatesCache;
    }

    function extractProjectNameFromHeading(titleElement) {
      if (!titleElement) return '';
      if (typeof titleElement.getAttribute === 'function') {
        const attrName = titleElement.getAttribute('data-project-name');
        if (typeof attrName === 'string') {
          const trimmed = attrName.trim();
          if (trimmed) return trimmed;
        }
      }
      const textValue = typeof titleElement.textContent === 'string'
        ? titleElement.textContent.replace(/\s+/g, ' ').trim()
        : '';
      if (!textValue) return '';

      const quoteMatch = textValue.match(/[“"']([^“”"']+)[”"']/);
      if (quoteMatch && quoteMatch[1] && quoteMatch[1].trim()) {
        return quoteMatch[1].trim();
      }
      const guillemetMatch = textValue.match(/[«‹]([^»›]+)[»›]/);
      if (guillemetMatch && guillemetMatch[1] && guillemetMatch[1].trim()) {
        return guillemetMatch[1].trim();
      }

      const overviewCandidates = getOverviewTitleCandidates();
      const lowerText = textValue.toLowerCase();
      for (const label of overviewCandidates) {
        const normalizedLabel = label.trim();
        if (!normalizedLabel) continue;
        const lowerLabel = normalizedLabel.toLowerCase();
        if (lowerText.startsWith(lowerLabel)) {
          let remainder = textValue.slice(normalizedLabel.length).trim();
          if (!remainder) return '';
          remainder = remainder.replace(/^(?:for|pour|für|per|para)\b\s*/i, '').trim();
          remainder = remainder.replace(/^(?:the|le|la|les|den|die|das|el|los|las)\b\s*/i, '').trim();
          remainder = remainder.replace(/^[–—:-]+/, '').trim();
          remainder = remainder.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
          if (remainder) return remainder;
          return '';
        }
      }

      if (overviewCandidates.some(label => lowerText === label.toLowerCase())) {
        return '';
      }

      const stripped = textValue.replace(/^["'“”«»‹›]+/, '').replace(/["'“”«»‹›]+$/, '').trim();
      if (stripped && stripped !== textValue) {
        return stripped;
      }

      return textValue;
    }

    function splitGearListHtml(html) {
      if (!html) return { projectHtml: '', gearHtml: '' };
      // Support legacy storage formats where the gear list and project
      // requirements were saved separately as an object.
      if (typeof html === 'object') {
        const legacyProject = html.projectHtml || html.project || '';
        const legacyGear = html.gearHtml || html.gear || '';
        if (legacyProject || legacyGear) {
          return { projectHtml: legacyProject, gearHtml: legacyGear };
        }
        // Some old exports used a gearList property.
        html = html.gearList || '';
      }
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title = doc.querySelector('h2');
      const reqGrid = doc.querySelector('.requirements-grid');
      const titleHtml = title ? title.outerHTML : '';
      let headingHtml = '';
      let headingNodeUsed = null;
      if (reqGrid) {
        const isHeadingTag = element => Boolean(element && /^H[1-6]$/i.test(element.tagName));
        const headingIsProjectTitle = element => Boolean(title && element && typeof element.isSameNode === 'function' && element.isSameNode(title));
        const headingBeforeGrid = element => {
          if (!element || typeof element.compareDocumentPosition !== 'function') return false;
          return Boolean(element.compareDocumentPosition(reqGrid) & Node.DOCUMENT_POSITION_FOLLOWING);
        };

        let headingNode = null;
        let sibling = reqGrid.previousElementSibling;
        while (sibling) {
          if (isHeadingTag(sibling) && !headingIsProjectTitle(sibling) && headingBeforeGrid(sibling)) {
            headingNode = sibling;
            break;
          }
          sibling = sibling.previousElementSibling;
        }

        if (!headingNode) {
          const parent = reqGrid.parentElement;
          if (parent) {
            const candidates = Array.from(parent.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            for (let i = candidates.length - 1; i >= 0; i -= 1) {
              const candidate = candidates[i];
              if (!isHeadingTag(candidate)) continue;
              if (headingIsProjectTitle(candidate)) continue;
              if (headingBeforeGrid(candidate)) {
                headingNode = candidate;
                break;
              }
            }
          }
        }

        if (headingNode) {
          headingNodeUsed = headingNode;
          headingHtml = headingNode.outerHTML;
        } else {
          const fallbackLabel = reqGrid.getAttribute('data-heading') || 'Project Requirements';
          headingHtml = `<h3>${escapeHtml(fallbackLabel)}</h3>`;
        }
      }
      const projectHtml = reqGrid ? titleHtml + headingHtml + reqGrid.outerHTML : '';
      const projectName = extractProjectNameFromHeading(title);
      let table = doc.querySelector('.gear-table');
      if (!table) {
        const tables = Array.from(doc.querySelectorAll('table'));
        if (tables.length === 1) {
          table = tables[0];
        } else if (tables.length > 1) {
          const tableAfterGearHeading = tables.find(tbl => {
            const prev = tbl.previousElementSibling;
            return prev && prev.matches('h3') && /gear list/i.test(prev.textContent || '');
          });
          table = tableAfterGearHeading || tables[0];
        }
      }
      const gearHeadingHtml = projectName ? `<h2>Gear List: “${escapeHtml(projectName)}”</h2>` : '';
      let gearHtml = '';
      if (table) {
        ensureGearTableCategoryGrouping(table);
        gearHtml = gearHeadingHtml + table.outerHTML;
      }
      if (!gearHtml) {
        const bodyClone = doc.body ? doc.body.cloneNode(true) : null;
        const bodyHtml = doc.body ? doc.body.innerHTML.trim() : '';
        if (bodyClone) {
          if (title) {
            const cloneTitle = bodyClone.querySelector('h2');
            if (cloneTitle) cloneTitle.remove();
          }
          if (headingNodeUsed) {
            const headingTag = headingNodeUsed.tagName ? headingNodeUsed.tagName.toLowerCase() : '';
            const headingText = headingNodeUsed.textContent ? headingNodeUsed.textContent.trim() : '';
            const cloneHeading = headingTag ? bodyClone.querySelector(headingTag) : null;
            if (cloneHeading && (!headingText || (cloneHeading.textContent || '').trim() === headingText)) {
              cloneHeading.remove();
            }
          } else {
            const cloneHeading = bodyClone.querySelector('h3');
            if (cloneHeading && /project requirements/i.test(cloneHeading.textContent || '')) {
              cloneHeading.remove();
            }
          }
          if (reqGrid) {
            const cloneGrid = bodyClone.querySelector('.requirements-grid');
            if (cloneGrid) cloneGrid.remove();
          }
          const fallbackHtml = bodyClone.innerHTML.trim();
          if (fallbackHtml) {
            gearHtml = fallbackHtml;
          } else if (bodyHtml) {
            gearHtml = bodyHtml;
          }
        } else if (bodyHtml) {
          gearHtml = bodyHtml;
        }
      }
      return { projectHtml, gearHtml };
    }

    registerGearListSplitImplementation(splitGearListHtml);

    function registerGearListSplitImplementation(fn) {
      var candidates = [];

      if (typeof cineGearList === 'object' && cineGearList) {
        candidates.push(cineGearList);
      }

      if (typeof global !== 'undefined' && global && typeof global.cineGearList === 'object' && global.cineGearList) {
        if (candidates.indexOf(global.cineGearList) === -1) {
          candidates.push(global.cineGearList);
        }
      }

      if (typeof require === 'function') {
        try {
          var required = require('./modules/gear-list.js');
          if (required && typeof required === 'object' && candidates.indexOf(required) === -1) {
            candidates.push(required);
          }
        } catch (error) {
          void error;
        }
      }

      for (var index = 0; index < candidates.length; index += 1) {
        var candidate = candidates[index];
        if (!candidate || typeof candidate.setImplementation !== 'function') {
          continue;
        }
        try {
          candidate.setImplementation({ splitGearListHtml: fn }, { source: 'app-core-new-2' });
          return true;
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('Unable to register splitGearListHtml implementation with cineGearList.', error);
          }
        }
      }

      if (typeof global !== 'undefined') {
        global.splitGearListHtml = fn;
      }

      return false;
    }

    function describeRequirement(field, value) {
      const val = value || '';
      const parts = [];
      if (field === 'requiredScenarios') {
        const scenarios = val.split(',').map(s => s.trim());
        if (scenarios.includes('Rain Machine') || scenarios.includes('Extreme rain')) {
          parts.push('Adds rain deflector and cables for rain use.');
        }
        if (scenarios.includes('Trinity') || scenarios.includes('Steadicam')) {
          parts.push('Includes D-Tap splitters and extension cables for Steadicam/Trinity rigs.');
        }
        if (scenarios.includes('Gimbal')) {
          parts.push('Adds gimbal rigging and power accessories.');
        }
      } else if (field === 'mattebox') {
        const v = val.toLowerCase();
        if (v.includes('swing')) {
          parts.push('Adds ARRI LMB 4x5 Pro Set and accessories.');
        } else if (v.includes('rod')) {
          parts.push('Adds ARRI LMB 4x5 15mm LWS Set and accessories.');
        } else if (v.includes('clamp')) {
          parts.push('Adds ARRI LMB 4x5 Clamp-On Set with adapter rings.');
        }
      } else if (field === 'cameraHandle') {
        const selections = val.split(',').map(s => s.trim());
        if (selections.includes('Hand Grips')) {
          parts.push('Adds SHAPE Telescopic Handle kit.');
        }
        if (selections.includes('Handle Extension')) {
          parts.push('Adds ARRI HEX-3 handle extension.');
        }
        if (selections.includes('L-Handle')) {
          parts.push('Adds ARRI Handle Extension Set.');
        }
      } else if (field === 'viewfinderExtension') {
        if (val) parts.push('Adds viewfinder extension to support accessories.');
      } else if (field === 'gimbal') {
        if (val) parts.push('Includes selected gimbal and support accessories.');
      } else if (field === 'easyrig') {
        if (val && val !== 'no further stabilisation') {
          parts.push('Adds selected stabiliser to gear list.');
        }
      } else if (field === 'codec') {
        if (val) parts.push('Notes chosen codec for post-production reference.');
      } else if (field === 'monitoringConfiguration') {
        if (val)
          parts.push('Adds default monitors and cable sets for each role.');
      } else if (field === 'videoDistribution') {
        if (val) parts.push('Includes distribution hardware for the selected method.');
      }
      return parts.join(' ');
    }

    function handleRequirementBoxKeydown(event) {
      const key = event?.key;
      if (!key) return;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
        return;
      }
      if (!projectRequirementsOutput) return;
      const boxes = Array.from(projectRequirementsOutput.querySelectorAll('.requirement-box'));
      if (!boxes.length) return;
      const target = event.currentTarget;
      const currentIndex = boxes.indexOf(target);
      if (currentIndex === -1) return;
      event.preventDefault();
      let nextIndex = currentIndex;
      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + boxes.length) % boxes.length;
      } else if (key === 'ArrowRight' || key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % boxes.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = boxes.length - 1;
      }
      const nextBox = boxes[nextIndex];
      if (!nextBox || typeof nextBox.focus !== 'function') return;
      try {
        nextBox.focus({ preventScroll: true });
      } catch (focusError) {
        void focusError;
        nextBox.focus();
      }
    }

    const GEAR_TABLE_CATEGORY_META = Object.freeze({
      Camera: {
        summary: 'Primary camera body chosen for the current setup.',
        logic: 'Always included so the crew preps the selected camera package.'
      },
      'Camera Support': {
        summary: 'Baseplates, cages and handle accessories for mounting the camera.',
        logic: 'Matched to your camera body, selected handles and any scenario add-ons.'
      },
      Media: {
        summary: 'Recording media that works with the selected camera.',
        logic: 'Picks capacities that cover the camera codecs without running out of space.'
      },
      Lens: {
        summary: 'Optics selected in the project requirements.',
        logic: 'Pulled directly from your lens choices so they travel with the kit.'
      },
      'Lens Support': {
        summary: 'Lens support brackets, rails and rings sized for your glass.',
        logic: 'Added automatically when lenses or matte box setups require additional support.'
      },
      'Matte box + filter': {
        summary: 'Matte boxes, trays and filter packs.',
        logic: 'Generated from your matte box preference and filter selections, including required adapters.'
      },
      'LDS (FIZ)': {
        summary: 'Focus, iris and zoom control hardware.',
        logic: 'Reflects the motors and controllers picked in the wireless FIZ section.'
      },
      'Camera Batteries': {
        summary: 'Batteries dedicated to powering the camera body.',
        logic: 'Sized from the camera power draw, runtime targets and hot-swap rules.'
      },
      'Monitoring Batteries': {
        summary: 'Power for handheld and field monitors.',
        logic: 'Ensures each monitor package includes enough charged batteries for the day.'
      },
      Chargers: {
        summary: 'Charging stations for included battery systems.',
        logic: 'Adds compatible chargers so battery rotations stay balanced during the shoot.'
      },
      Monitoring: {
        summary: 'On-set monitoring packages for the crew.',
        logic: 'Derived from monitoring configuration and distribution preferences in project details.'
      },
      'Monitoring support': {
        summary: 'Stands, brackets, straps and cages supporting monitors.',
        logic: 'Auto-matched to monitor sizes and usage (handheld, stand or cart setups).'
      },
      Rigging: {
        summary: 'Arms, clamps and mounting hardware for accessories.',
        logic: 'Includes core rigging plus extras triggered by scenarios like Steadicam or gimbal use.'
      },
      Power: {
        summary: 'Power distribution cables and adapters.',
        logic: 'Covers how accessories receive power from the main battery ecosystem.'
      },
      Grip: {
        summary: 'Support gear like sliders, stabilisers and Easyrig options.',
        logic: 'Reflects stabilisation preferences and active shooting scenarios.'
      },
      'Carts and Transportation': {
        summary: 'Carts, cases and transport aids for the camera department.',
        logic: 'Included so the crew can move, stage and secure the package efficiently.'
      },
      Miscellaneous: {
        summary: 'Utility items that keep the crew efficient and comfortable.',
        logic: 'Adds weather protection and helpful tools based on scenarios and best practices.'
      },
      Consumables: {
        summary: 'Expendables such as tapes, wipes and covers.',
        logic: 'Scaled to shoot length and weather needs so consumables never run short.'
      }
    });

    const DEFAULT_GEAR_TABLE_CATEGORY_META = Object.freeze({
      summary: 'Automatically generated grouping of related equipment.',
      logic: 'Filled using your project requirements, selections and saved auto gear rules.'
    });

    const getGearTableCategoryMeta = category => {
      if (!category) return DEFAULT_GEAR_TABLE_CATEGORY_META;
      return GEAR_TABLE_CATEGORY_META[category] || DEFAULT_GEAR_TABLE_CATEGORY_META;
    };

    const buildGearTableCategoryHelp = category => {
      const meta = getGearTableCategoryMeta(category);
      const parts = [];
      if (category) parts.push(`${category} – ${meta.summary}`);
      else parts.push(meta.summary);
      if (meta.logic) parts.push(`Logic: ${meta.logic}`);
      return parts.join(' ');
    };

    const formatDeviceCategoryLabel = category => {
      if (typeof category !== 'string' || !category.trim()) return '';
      return category
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const formatDeviceCategoryPath = path => {
      if (!Array.isArray(path) || !path.length) return '';
      return path
        .map(part => formatDeviceCategoryLabel(part))
        .filter(Boolean)
        .join(' › ');
    };

    const DANGEROUS_SHARED_TAGS = new Set([
      'script',
      'style',
      'template',
      'iframe',
      'object',
      'embed',
      'link',
      'meta',
      'base'
    ]);

    const DANGEROUS_SHARED_ATTRS = new Set([
      'formaction',
      'action',
      'srcdoc'
    ]);

    function isSafeSharedUrl(value) {
      if (typeof value !== 'string') {
        return false;
      }

      const trimmed = value.trim();
      if (!trimmed) {
        return true;
      }

      if (trimmed.startsWith('#')) {
        return true;
      }

      if (/^(?:javascript|vbscript|data):/i.test(trimmed)) {
        return false;
      }

      try {
        const base = typeof window !== 'undefined' && window.location ? window.location.href : 'https://localhost';
        const url = new URL(trimmed, base);
        if (/^(?:javascript|vbscript|data):/i.test(url.protocol)) {
          return false;
        }
        if (typeof window !== 'undefined' && window.location && window.location.origin) {
          return url.origin === window.location.origin;
        }
        // If we cannot determine the origin, treat relative URLs as safe.
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      } catch (error) {
        if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
          return true;
        }
      }

      return false;
    }

    function sanitizeSharedHtml(html) {
      if (!html) {
        return '';
      }

      if (typeof html !== 'string') {
        return sanitizeSharedHtml(String(html));
      }

      let doc;
      try {
        doc = new DOMParser().parseFromString(html, 'text/html');
      } catch (error) {
        console.warn('Failed to parse shared HTML for sanitization', error);
        return '';
      }

      if (!doc || !doc.body) {
        return '';
      }

      DANGEROUS_SHARED_TAGS.forEach(tag => {
        doc.body.querySelectorAll(tag).forEach(node => {
          node.remove();
        });
      });

      doc.body.querySelectorAll('*').forEach(element => {
        Array.from(element.attributes).forEach(attribute => {
          const name = attribute.name.toLowerCase();
          if (name.startsWith('on')) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'style') {
            element.removeAttribute(attribute.name);
            return;
          }
          if (DANGEROUS_SHARED_ATTRS.has(name)) {
            element.removeAttribute(attribute.name);
            return;
          }
          if (name === 'href' || name === 'xlink:href' || name === 'src' || name === 'srcset') {
            const value = attribute.value || '';
            const parts = name === 'srcset'
              ? value.split(',').map(part => part.trim().split(/\s+/)[0]).filter(Boolean)
              : [value];
            if (!parts.every(isSafeSharedUrl)) {
              element.removeAttribute(attribute.name);
            }
            return;
          }
          if (name === 'target') {
            element.removeAttribute(attribute.name);
          }
        });
      });

      return doc.body.innerHTML;
    }

    function displayGearAndRequirements(html) {
      const { projectHtml, gearHtml } = splitGearListHtml(html);
      const safeProjectHtml = sanitizeSharedHtml(projectHtml);
      const safeGearHtml = sanitizeSharedHtml(gearHtml);
      if (projectRequirementsOutput) {
        if (safeProjectHtml) {
          projectRequirementsOutput.innerHTML = safeProjectHtml;
          projectRequirementsOutput.classList.remove('hidden');
          const requirementBoxes = Array.from(projectRequirementsOutput.querySelectorAll('.requirement-box'));
          requirementBoxes.forEach(box => {
            // Popup/Tooltip removal as per user request to prevent blocking buttons
            box.removeAttribute('title');
            box.removeAttribute('data-help');

            if (!box.hasAttribute('tabindex')) {
              box.setAttribute('tabindex', '0');
            }
            if (!box.hasAttribute('role')) {
              box.setAttribute('role', 'group');
            }

            box.addEventListener('keydown', handleRequirementBoxKeydown);
            box.querySelectorAll('.req-label, .req-value').forEach(el => {
              el.removeAttribute('title');
              el.removeAttribute('data-help');
            });
          });
          adjustGearListSelectWidths(projectRequirementsOutput);
        } else {
          projectRequirementsOutput.innerHTML = '';
          projectRequirementsOutput.classList.add('hidden');
        }
      }
      if (gearListOutput) {
        if (safeGearHtml) {
          gearListOutput.innerHTML = safeGearHtml;
          if (typeof ensureGearListCustomControls === 'function') {
            ensureGearListCustomControls(gearListOutput);
          }
          gearListOutput.classList.remove('hidden');
          if (typeof enhanceGearListItems === 'function') {
            enhanceGearListItems(gearListOutput);
          }
          applyFilterSelectionsToGearList();
          renderFilterDetails();
          const findDevice = name => {
            if (typeof name !== 'string' || !name.trim()) {
              return { info: null, category: '', categoryPath: [] };
            }
            const visited = new Set();
            const search = (node, path) => {
              if (!isPlainObjectValue(node) || visited.has(node)) return null;
              visited.add(node);
              if (
                Object.prototype.hasOwnProperty.call(node, name) &&
                isPlainObjectValue(node[name])
              ) {
                return { info: node[name], categoryPath: path };
              }
              for (const [key, value] of Object.entries(node)) {
                if (!isPlainObjectValue(value)) continue;
                const result = search(value, path.concat(key));
                if (result) return result;
              }
              return null;
            };
            const result = search(devices, []);
            if (result) {
              return {
                info: result.info,
                category: formatDeviceCategoryPath(result.categoryPath),
                categoryPath: result.categoryPath
              };
            }
            return { info: null, category: '', categoryPath: [] };
          };

          const buildGearItemHelp = ({
            name,
            countText,
            deviceInfo,
            libraryCategory,
            tableCategory
          }) => {
            const parts = [];
            const label = `${countText || ''}${name}`.trim();
            if (label) parts.push(label);
            const meta = getGearTableCategoryMeta(tableCategory);
            const categoryParts = [];
            if (tableCategory) categoryParts.push(`Gear list section: ${tableCategory}`);
            if (meta.summary) categoryParts.push(meta.summary);
            if (meta.logic) categoryParts.push(`Logic: ${meta.logic}`);
            if (!tableCategory && !categoryParts.length) {
              const fallback = getGearTableCategoryMeta('');
              if (fallback.summary) categoryParts.push(fallback.summary);
              if (fallback.logic) categoryParts.push(`Logic: ${fallback.logic}`);
            }
            if (categoryParts.length) parts.push(categoryParts.join(' – '));
            if (libraryCategory) parts.push(`Device library category: ${libraryCategory}`);
            if (deviceInfo) {
              let summary = generateSafeConnectorSummary(deviceInfo);
              summary = summary
                ? (function stripTags(s) {
                  let prev;
                  do {
                    prev = s;
                    s = s.replace(/<[^>]+>/g, '');
                  } while (s !== prev);
                  return s.replace(/\s+/g, ' ').trim();
                })(summary)
                : '';
              if (deviceInfo.notes)
                summary = summary ? `${summary}; Notes: ${deviceInfo.notes}` : deviceInfo.notes;
              if (summary) parts.push(summary);
            }
            return parts.join(' – ');
          };

          gearListOutput.querySelectorAll('tbody.category-group').forEach(group => {
            const headingCell = group.querySelector('.category-row td');
            if (!headingCell) return;
            const tableCategory = headingCell.textContent.trim();
            group.setAttribute('data-gear-table-category', tableCategory);
            const helpText = buildGearTableCategoryHelp(tableCategory);
            headingCell.setAttribute('title', helpText);
            headingCell.setAttribute('data-help', helpText);
          });

          gearListOutput.querySelectorAll('.gear-item').forEach(span => {
            const name = span.getAttribute('data-gear-name') || span.textContent.trim();
            const { info, category } = findDevice(name);
            const countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
            const count = countMatch ? `${countMatch[1]}x ` : '';
            const tableCategory = span
              .closest('tbody.category-group')
              ?.getAttribute('data-gear-table-category');
            const desc = buildGearItemHelp({
              name,
              countText: count,
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            span.setAttribute('title', desc);
            span.setAttribute('data-help', desc);
            span.querySelectorAll('select').forEach(sel => {
              sel.setAttribute('title', desc);
              sel.setAttribute('data-help', desc);
              initFavoritableSelect(sel);
            });
          });

          // Standalone selects (not wrapped in .gear-item) still need descriptive help
          gearListOutput.querySelectorAll('select').forEach(sel => {
            if (sel.getAttribute('data-help')) return;
            const selected = sel.selectedOptions && sel.selectedOptions[0];
            const name = selected ? selected.textContent.trim() : sel.value;
            const { info, category } = findDevice(name);
            const tableCategory = sel
              .closest('tbody.category-group')
              ?.getAttribute('data-gear-table-category');
            const desc = buildGearItemHelp({
              name,
              countText: '1x ',
              deviceInfo: info,
              libraryCategory: category,
              tableCategory: tableCategory || ''
            });
            sel.setAttribute('title', desc);
            sel.setAttribute('data-help', desc);
            initFavoritableSelect(sel);
          });
          adjustGearListSelectWidths(gearListOutput);
        } else {
          gearListOutput.innerHTML = '';
          gearListOutput.classList.add('hidden');
        }

        if (typeof ensureGearListActions === 'function') {
          ensureGearListActions();
        } else if (!gearListOutput.querySelector('#gearListActions')) {
          const actions = document.createElement('div');
          actions.id = 'gearListActions';
          const note = document.createElement('p');
          note.id = 'gearListAutosaveNote';
          note.className = 'gear-list-autosave-note';
          note.hidden = true;
          note.setAttribute('hidden', '');
          actions.appendChild(note);
          gearListOutput.appendChild(actions);
        }
      }
      if (loadedSetupState) {
        setSliderBowlValue(loadedSetupState.sliderBowl || '');
        setEasyrigValue(loadedSetupState.easyrig || '');
      }
      const combinedHtmlSnapshot = `${safeProjectHtml || ''}${safeGearHtml || ''}`.trim();
      if (combinedHtmlSnapshot && typeof globalThis !== 'undefined') {
        globalThis.__cineLastGearListHtml = combinedHtmlSnapshot;
      }
      updateGearListButtonVisibility();
      callCoreFunctionFromPart2('updateAutoGearHighlightToggleButton', [], { defer: true });
    }
    function getSliderBowlSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListSliderBowl') : null;
    }
    function getSliderBowlValue() {
      const sel = getSliderBowlSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.sliderBowl ? loadedSetupState.sliderBowl : '';
    }
    function setSliderBowlValue(val) {
      const sel = getSliderBowlSelect();
      if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }
    function getEasyrigSelect() {
      return gearListOutput ? gearListOutput.querySelector('#gearListEasyrig') : null;
    }
    function getEasyrigValue() {
      const sel = getEasyrigSelect();
      if (sel) return sel.value;
      return loadedSetupState && loadedSetupState.easyrig ? loadedSetupState.easyrig : '';
    }
    function setEasyrigValue(val) {
      const sel = getEasyrigSelect();
      if (sel && val && Array.from(sel.options).some(opt => opt.value === val)) {
        sel.value = val;
        adjustGearListSelectWidth(sel);
      }
    }

    function sanitizeProjectInfoValue(value) {
      if (value === null || value === undefined) return undefined;
      if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
      }
      if (typeof value === 'number') {
        return Number.isNaN(value) ? undefined : value;
      }
      if (typeof value === 'boolean') {
        return value ? value : undefined;
      }
      if (Array.isArray(value)) {
        const sanitized = value
          .map((item) => sanitizeProjectInfoValue(item))
          .filter((item) => item !== undefined);
        return sanitized.length ? sanitized : undefined;
      }
      if (typeof value === 'object') {
        const sanitizedObj = sanitizeProjectInfo(value);
        return sanitizedObj || undefined;
      }
      return undefined;
    }

    function sanitizeProjectInfo(info) {
      if (!info || typeof info !== 'object') return null;
      const result = {};
      Object.entries(info).forEach(([key, value]) => {
        const sanitized = sanitizeProjectInfoValue(value);
        if (sanitized !== undefined) {
          result[key] = sanitized;
        }
      });
      return Object.keys(result).length > 0 ? result : null;
    }

    function hasProjectInfoData(value) {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'number') {
        return !Number.isNaN(value);
      }
      if (typeof value === 'boolean') {
        return value;
      }
      if (Array.isArray(value)) {
        return value.some(item => hasProjectInfoData(item));
      }
      if (typeof value === 'object') {
        return Object.keys(value).some(key => hasProjectInfoData(value[key]));
      }
      return false;
    }

    function projectInfoEquals(a, b) {
      if (a === b) return true;
      if (!a || !b) return false;
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i += 1) {
          if (!projectInfoEquals(a[i], b[i])) return false;
        }
        return true;
      }
      if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        return aKeys.every((key) => projectInfoEquals(a[key], b[key]));
      }
      return false;
    }

    function ensureDefaultProjectInfoSnapshot() {
      if (defaultProjectInfoSnapshot !== null) return;
      // Treat an entirely empty project info payload as the only "default" state so
      // any restored values—including those matching the UI's initial selections—are
      // preserved when sanitizing project info for storage.
      defaultProjectInfoSnapshot = {};
    }

    function deriveProjectInfo(info) {
      ensureDefaultProjectInfoSnapshot();
      const sanitized = sanitizeProjectInfo(info);
      if (!sanitized) {
        if (hasProjectInfoData(info) && hasProjectInfoData(currentProjectInfo)) {
          return currentProjectInfo;
        }
        return null;
      }
      if (
        defaultProjectInfoSnapshot &&
        projectInfoEquals(sanitized, defaultProjectInfoSnapshot)
      ) {
        return null;
      }
      return sanitized;
    }

    function setCurrentProjectInfo(info) {
      currentProjectInfo = info;
    }

    function getCurrentProjectInfo() {
      return currentProjectInfo;
    }

    function computeSetupSignature(state) {
      if (!state) return '';
      return [
        state.camera || '',
        state.monitor || '',
        state.video || '',
        state.cage || '',
        coreStableStringify(state.motors || []),
        coreStableStringify(state.controllers || []),
        state.distance || '',
        state.batteryPlate || '',
        state.battery || '',
        state.batteryHotswap || '',
        state.sliderBowl || '',
        state.easyrig || '',
        coreStableStringify(state.projectInfo || null),
        coreStableStringify(state.autoGearRules || null),
        coreStableStringify(state.diagramPositions || null)
      ].join('||');
    }

    function storeLoadedSetupState(state) {
      loadedSetupState = state;
      loadedSetupStateSignature = computeSetupSignature(state);
    }

    function getCurrentSetupState() {
      const info = projectForm ? collectProjectFormData() : {};
      info.sliderBowl = getSliderBowlValue();
      info.easyrig = getEasyrigValue();
      const projectInfo = deriveProjectInfo(info);
      const state = {
        projectInfo
      };

      const addIfChanged = (key, value) => {
        if (value === null || value === undefined) return;
        if (typeof value === 'string') {
          const trimmed = value.trim();
          if (!trimmed || trimmed === 'None') return;
          state[key] = trimmed;
        } else if (Array.isArray(value)) {
          const filtered = value.filter(v => typeof v === 'string' && v.trim() && v !== 'None');
          if (filtered.length) state[key] = filtered;
        } else {
          state[key] = value;
        }
      };

      addIfChanged('camera', cameraSelect.value);
      addIfChanged('monitor', monitorSelect.value);
      addIfChanged('video', videoSelect.value);
      addIfChanged('cage', cageSelect.value);

      if (Array.isArray(motorSelects)) {
        addIfChanged('motors', motorSelects.map(sel => sel.value));
      }
      if (Array.isArray(controllerSelects)) {
        addIfChanged('controllers', controllerSelects.map(sel => sel.value));
      }

      addIfChanged('distance', distanceSelect.value);
      addIfChanged('batteryPlate', normalizeBatteryPlateValue(batteryPlateSelect.value, batterySelect.value));
      addIfChanged('battery', batterySelect.value);
      addIfChanged('batteryHotswap', hotswapSelect.value);
      addIfChanged('sliderBowl', info.sliderBowl);
      addIfChanged('easyrig', info.easyrig);
      const projectRules = getProjectScopedAutoGearRules();
      if (projectRules && projectRules.length) {
        state.autoGearRules = projectRules;
      }
      const diagramPositions = getDiagramManualPositions();
      if (Object.keys(diagramPositions).length) {
        state.diagramPositions = diagramPositions;
      }
      return state;
    }

    function hasAnyDeviceSelection(state) {
      if (!state) return false;
      const isMeaningfulSelection = (value) => {
        if (Array.isArray(value)) {
          return value.some((item) => isMeaningfulSelection(item));
        }
        if (value == null) return false;
        const normalized = typeof value === 'string' ? value.trim() : value;
        if (!normalized) return false;
        if (typeof normalized === 'string' && normalized.toLowerCase() === 'none') {
          return false;
        }
        return true;
      };

      const primarySelections = [
        state.camera,
        state.monitor,
        state.video,
        state.cage,
        state.batteryPlate,
        state.battery,
        state.batteryHotswap
      ];

      if (primarySelections.some((value) => isMeaningfulSelection(value))) {
        return true;
      }

      if (isMeaningfulSelection(state.motors)) {
        return true;
      }

      if (isMeaningfulSelection(state.controllers)) {
        return true;
      }

      return false;
    }

    function checkSetupChanged() {
      if (!saveSetupBtn) return;
      const setupNameInput = document.getElementById('setupName');
      const langTexts = texts[currentLang] || {};
      const fallbackTexts = texts.en || {};
      const saveLabel = langTexts.saveSetupBtn || fallbackTexts.saveSetupBtn || '';
      const updateLabel = langTexts.updateSetupBtn || fallbackTexts.updateSetupBtn || saveLabel;
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const selectedName = setupSelect && typeof setupSelect.value === 'string'
        ? setupSelect.value
        : '';
      if (selectedName && typedName && typedName !== selectedName) {
        setButtonLabelWithIcon(saveSetupBtn, updateLabel);
        return;
      }
      if (
        loadedSetupState &&
        selectedName &&
        typedName === selectedName
      ) {
        const currentSignature = computeSetupSignature(getCurrentSetupState());
        if (currentSignature !== loadedSetupStateSignature) {
          setButtonLabelWithIcon(saveSetupBtn, updateLabel);
          return;
        }
      }
      setButtonLabelWithIcon(saveSetupBtn, saveLabel);
    }

    var projectDialog = document.getElementById("projectDialog");
    var projectForm = document.getElementById("projectForm");
    var filterSelectElem = document.getElementById('filter');
    var filterDetailsStorage = document.getElementById('filterDetails');
    var matteboxSelect = document.getElementById('mattebox');
    var projectCancelBtn = document.getElementById("projectCancel");
    var projectDialogCloseBtn = document.getElementById("projectDialogClose");
    var feedbackDialog = document.getElementById("feedbackDialog");
    var feedbackForm = document.getElementById("feedbackForm");
    var feedbackCancelBtn = document.getElementById("fbCancel");
    var feedbackUseLocationBtn = document.getElementById("fbUseLocationBtn");
    const feedbackSubmitBtn = document.getElementById("fbSubmit");
    if (feedbackCancelBtn) {
      const cancelLabel =
        feedbackCancelBtn.textContent?.trim() ||
        texts[currentLang]?.cancelEditBtn ||
        texts.en?.cancelEditBtn ||
        'Cancel';
      setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
    }
    if (feedbackUseLocationBtn) {
      const locationLabel = feedbackUseLocationBtn.textContent?.trim() || 'Use Current Location';
      setButtonLabelWithIcon(feedbackUseLocationBtn, locationLabel, ICON_GLYPHS.pin);
    }
    if (feedbackSubmitBtn) {
      const submitLabel =
        feedbackSubmitBtn.textContent?.trim() ||
        texts[currentLang]?.feedbackSubmit ||
        texts.en?.feedbackSubmit ||
        'Save & Submit';
      setButtonLabelWithIcon(feedbackSubmitBtn, submitLabel, ICON_GLYPHS.paperPlane);
    }
    var loadFeedbackSafe = typeof loadFeedback === 'function' ? loadFeedback : () => ({});
    var saveFeedbackSafe = typeof saveFeedback === 'function' ? saveFeedback : () => { };
    var setupDiagramContainer = document.getElementById("diagramArea");
    const diagramLegend = document.getElementById("diagramLegend");
    var downloadDiagramBtn = document.getElementById("downloadDiagram");
    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");
    const resetViewBtn = document.getElementById("resetView");
    var gridSnapToggleBtn = document.getElementById("gridSnapToggle");
    const diagramHint = document.getElementById("diagramHint");

    const getCurrentGridSnap = () => {
      try {
        if (typeof getGridSnapState === 'function') {
          return Boolean(getGridSnapState());
        }
      } catch (gridSnapStateError) {
        void gridSnapStateError;
      }

      const scopedValue = readGlobalScopeValue('gridSnap');
      if (typeof scopedValue === 'boolean') {
        return scopedValue;
      }

      if (typeof gridSnap !== 'undefined') {
        try {
          return Boolean(gridSnap);
        } catch (legacyGridSnapReadError) {
          void legacyGridSnapReadError;
        }
      }

      return false;
    };


    let getDiagramManualPositions = () => ({
    });
    let setManualDiagramPositions = () => { };
    let renderSetupDiagram = () => { };
    let enableDiagramInteractions = () => { };
    let updateDiagramLegend = () => { };
    let getDiagramCss = () => '';
    let diagramConnectorIcons = {};
    let overviewSectionIcons = {};
    let DIAGRAM_MONITOR_ICON = null;
    let diagramIcons = {};

    const connectionDiagramModule = (typeof cineFeaturesConnectionDiagram === 'object' && cineFeaturesConnectionDiagram)
      || (typeof GLOBAL_SCOPE !== 'undefined' && GLOBAL_SCOPE.cineFeaturesConnectionDiagram)
      || null;




    function powerInputTypes(dev) {
      const out = [];
      if (!dev) return out;
      const add = t => {
        normalizePowerPortType(t).forEach(pt => out.push(pt));
      };
      if (dev.powerInput) {
        String(dev.powerInput)
          .split('/')
          .forEach(t => {
            if (t.trim()) add(t.trim());
          });
      }
      const inp = dev.power?.input;
      if (Array.isArray(inp)) {
        inp.forEach(i => {
          const typeVal = i && (i.type || i.portType);
          if (typeVal) add(typeVal);
        });
      } else if (inp) {
        const typeVal = inp.type || inp.portType;
        if (typeVal) add(typeVal);
      }
      return out;
    }

    function firstPowerInputType(dev) {
      const list = powerInputTypes(dev);
      return list.length ? list[0] : '';
    }

    function getAllPowerPortTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => powerInputTypes(cam).forEach(t => types.add(t)));
      Object.values(devices.viewfinders || {}).forEach(vf => powerInputTypes(vf).forEach(t => types.add(t)));
      Object.values(devices.monitors || {}).forEach(mon => powerInputTypes(mon).forEach(t => types.add(t)));
      Object.values(devices.video || {}).forEach(vd => powerInputTypes(vd).forEach(t => types.add(t)));
      Object.values(devices.fiz?.motors || {}).forEach(m => powerInputTypes(m).forEach(t => types.add(t)));
      Object.values(devices.fiz?.controllers || {}).forEach(c => powerInputTypes(c).forEach(t => types.add(t)));
      Object.values(devices.fiz?.distance || {}).forEach(d => powerInputTypes(d).forEach(t => types.add(t)));
      return Array.from(types).sort(localeSort);
    }

    if (connectionDiagramModule && typeof connectionDiagramModule.createConnectionDiagram === 'function') {
      try {
        const scheduleProjectAutoSaveFn =
          typeof globalThis !== 'undefined' &&
            typeof globalThis.scheduleProjectAutoSave === 'function'
            ? globalThis.scheduleProjectAutoSave
            : null;

        const saveCurrentSessionFn =
          typeof saveCurrentSession === 'function'
            ? saveCurrentSession
            : (typeof globalThis !== 'undefined' && typeof globalThis.saveCurrentSession === 'function'
              ? (...args) => globalThis.saveCurrentSession(...args)
              : undefined);

        const connectionDiagram = connectionDiagramModule.createConnectionDiagram({
          document,
          window,
          navigator,
          getTexts: () => texts,
          getCurrentLang: () => currentLang,
          getDevices: () => devices,
          getCameraSelect: () => cameraSelect,
          getMonitorSelect: () => monitorSelect,
          getVideoSelect: () => videoSelect,
          getDistanceSelect: () => distanceSelect,
          getBatterySelect: () => batterySelect,
          getMotorSelects: () => motorSelects,
          getControllerSelects: () => controllerSelects,
          getSetupDiagramContainer: () => setupDiagramContainer,
          getDiagramLegend: () => diagramLegend,
          getDiagramHint: () => diagramHint,
          getDownloadDiagramBtn: () => downloadDiagramBtn,
          getZoomInBtn: () => zoomInBtn,
          getZoomOutBtn: () => zoomOutBtn,
          getResetViewBtn: () => resetViewBtn,
          getGridSnapToggleBtn: () => gridSnapToggleBtn,
          getCurrentGridSnap,
          scheduleProjectAutoSave: scheduleProjectAutoSaveFn,
          saveCurrentSession: saveCurrentSessionFn,
          checkSetupChanged,
          motorPriority,
          controllerPriority,
          isArri,
          isArriOrCmotion,
          fizNeedsPower,
          fizPowerPort,
          controllerDistancePort,
          controllerCamPort,
          cameraFizPort,
          motorFizPort,
          getSelectedPlate,
          isSelectedPlateNative,
          firstPowerInputType,
          formatConnLabel,
          connectionLabel,
          fizPort,
          iconGlyph,
          ICON_FONT_KEYS,
          applyIconGlyph,
          resolveIconGlyph,
          positionSvgMarkup,
          ensureSvgHasAriaHidden,
          formatSvgCoordinate,
        });

        if (connectionDiagram && typeof connectionDiagram === 'object') {
          if (typeof connectionDiagram.renderSetupDiagram === 'function') {
            renderSetupDiagram = connectionDiagram.renderSetupDiagram;
          }
          if (typeof connectionDiagram.enableDiagramInteractions === 'function') {
            enableDiagramInteractions = connectionDiagram.enableDiagramInteractions;
          }
          if (typeof connectionDiagram.updateDiagramLegend === 'function') {
            updateDiagramLegend = connectionDiagram.updateDiagramLegend;
          }
          if (typeof connectionDiagram.getDiagramManualPositions === 'function') {
            getDiagramManualPositions = connectionDiagram.getDiagramManualPositions;
          }
          if (typeof connectionDiagram.setManualDiagramPositions === 'function') {
            setManualDiagramPositions = connectionDiagram.setManualDiagramPositions;
          }
          if (typeof connectionDiagram.getDiagramCss === 'function') {
            getDiagramCss = connectionDiagram.getDiagramCss;
          }
          if (connectionDiagram.diagramConnectorIcons) {
            diagramConnectorIcons = connectionDiagram.diagramConnectorIcons;
            if (typeof window !== 'undefined') window.diagramConnectorIcons = diagramConnectorIcons;
            else if (typeof globalThis !== 'undefined') globalThis.diagramConnectorIcons = diagramConnectorIcons;
          }
          if (connectionDiagram.overviewSectionIcons) {
            overviewSectionIcons = connectionDiagram.overviewSectionIcons;
          }
          if (connectionDiagram.diagramIcons) {
            diagramIcons = connectionDiagram.diagramIcons;
          }
          if (connectionDiagram.DIAGRAM_MONITOR_ICON) {
            DIAGRAM_MONITOR_ICON = connectionDiagram.DIAGRAM_MONITOR_ICON;
          }
        }
      } catch (diagramModuleError) {
        console.warn('Unable to initialize connection diagram module', diagramModuleError);
      }
    }

    const cameraProjectLegendIcon = document.getElementById('cameraProjectLegendIcon');
    if (cameraProjectLegendIcon && applyIconGlyph && diagramIcons.camera) {
      applyIconGlyph(cameraProjectLegendIcon, diagramIcons.camera);
    }

    // Load an image and optionally strip a solid background using Canvas
    // List filters for existing device categories

    // NEW SETUP MANAGEMENT DOM ELEMENTS
    var generateOverviewBtn = document.getElementById('generateOverviewBtn');

    const videoOutputOptions = [
      '3G-SDI',
      '6G-SDI',
      '12G-SDI',
      'Mini BNC',
      'HDMI',
      'Mini HDMI',
      'Micro HDMI'
    ];

    function getAllFizConnectorTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        if (Array.isArray(cam.fizConnectors)) {
          cam.fizConnectors.forEach(fc => {
            if (fc && fc.type) types.add(fc.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }

    let fizConnectorOptions = getAllFizConnectorTypes();

    function updateFizConnectorOptions() {
      fizConnectorOptions = getAllFizConnectorTypes();
      document.querySelectorAll('.fiz-connector-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        fizConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (fizConnectorOptions.includes(current)) {
          sel.value = current;
        }
      });
    }

    function getAllMotorConnectorTypes() {
      const types = new Set();
      Object.values(devices.fiz?.motors || {}).forEach(m => {
        if (m && m.fizConnector) types.add(m.fizConnector);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    let motorConnectorOptions = getAllMotorConnectorTypes();

    function updateMotorConnectorOptions() {
      motorConnectorOptions = getAllMotorConnectorTypes();
      if (motorConnectorInput) {
        const cur = motorConnectorInput.value;
        motorConnectorInput.innerHTML = '';
        addEmptyOption(motorConnectorInput);
        motorConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          motorConnectorInput.appendChild(opt);
        });
        if (motorConnectorOptions.includes(cur)) motorConnectorInput.value = cur;
      }
    }

    function getAllControllerConnectors() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && Array.isArray(c.fizConnectors)) {
          c.fizConnectors.forEach(fc => { if (fc && fc.type) types.add(fc.type); });
        }
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    function getAllControllerPowerSources() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.powerSource) types.add(c.powerSource);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    function getAllControllerBatteryTypes() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.batteryType) types.add(c.batteryType);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    function getAllControllerConnectivity() {
      const types = new Set();
      Object.values(devices.fiz?.controllers || {}).forEach(c => {
        if (c && c.connectivity) types.add(c.connectivity);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    let controllerConnectorOptions = getAllControllerConnectors();
    let controllerPowerOptions = getAllControllerPowerSources();
    let controllerBatteryOptions = getAllControllerBatteryTypes();
    let controllerConnectivityOptions = getAllControllerConnectivity();

    function updateControllerConnectorOptions() {
      controllerConnectorOptions = getAllControllerConnectors();
      if (controllerConnectorInput) {
        const cur = controllerConnectorInput.value;
        controllerConnectorInput.innerHTML = '';
        addEmptyOption(controllerConnectorInput);
        controllerConnectorOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectorInput.appendChild(opt);
        });
        if (controllerConnectorOptions.includes(cur)) controllerConnectorInput.value = cur;
      }
    }

    function updateControllerPowerOptions() {
      controllerPowerOptions = getAllControllerPowerSources();
      if (controllerPowerInput) {
        const cur = controllerPowerInput.value;
        controllerPowerInput.innerHTML = '';
        addEmptyOption(controllerPowerInput);
        controllerPowerOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerPowerInput.appendChild(opt);
        });
        if (controllerPowerOptions.includes(cur)) controllerPowerInput.value = cur;
      }
    }

    function updateControllerBatteryOptions() {
      controllerBatteryOptions = getAllControllerBatteryTypes();
      if (controllerBatteryInput) {
        const cur = controllerBatteryInput.value;
        controllerBatteryInput.innerHTML = '';
        addEmptyOption(controllerBatteryInput);
        controllerBatteryOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerBatteryInput.appendChild(opt);
        });
        if (controllerBatteryOptions.includes(cur)) controllerBatteryInput.value = cur;
      }
    }

    function updateControllerConnectivityOptions() {
      controllerConnectivityOptions = getAllControllerConnectivity();
      if (controllerConnectivityInput) {
        const cur = controllerConnectivityInput.value;
        controllerConnectivityInput.innerHTML = '';
        addEmptyOption(controllerConnectivityInput);
        controllerConnectivityOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          controllerConnectivityInput.appendChild(opt);
        });
        if (controllerConnectivityOptions.includes(cur)) controllerConnectivityInput.value = cur;
      }
    }

    function getAllDistanceConnections() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    function getAllDistanceMethods() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.measurementMethod) types.add(d.measurementMethod);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    function getAllDistanceDisplays() {
      const types = new Set();
      Object.values(devices.fiz?.distance || {}).forEach(d => {
        if (d && d.outputDisplay) types.add(d.outputDisplay);
      });
      return Array.from(types).filter(Boolean).sort(localeSort);
    }

    let distanceConnectionOptions = getAllDistanceConnections();
    let distanceMethodOptions = getAllDistanceMethods();
    let distanceDisplayOptions = getAllDistanceDisplays();

    function updateDistanceConnectionOptions() {
      distanceConnectionOptions = getAllDistanceConnections();
      if (distanceConnectionInput) {
        const cur = distanceConnectionInput.value;
        distanceConnectionInput.innerHTML = '';
        addEmptyOption(distanceConnectionInput);
        distanceConnectionOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceConnectionInput.appendChild(opt);
        });
        if (distanceConnectionOptions.includes(cur)) distanceConnectionInput.value = cur;
      }
    }

    function updateDistanceMethodOptions() {
      distanceMethodOptions = getAllDistanceMethods();
      if (distanceMethodInput) {
        const cur = distanceMethodInput.value;
        distanceMethodInput.innerHTML = '';
        addEmptyOption(distanceMethodInput);
        distanceMethodOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceMethodInput.appendChild(opt);
        });
        if (distanceMethodOptions.includes(cur)) distanceMethodInput.value = cur;
      }
    }

    function updateDistanceDisplayOptions() {
      distanceDisplayOptions = getAllDistanceDisplays();
      if (distanceOutputInput) {
        const cur = distanceOutputInput.value;
        distanceOutputInput.innerHTML = '';
        addEmptyOption(distanceOutputInput);
        distanceDisplayOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          distanceOutputInput.appendChild(opt);
        });
        if (distanceDisplayOptions.includes(cur)) distanceOutputInput.value = cur;
      }
    }

    var ensureElementIdResolver = null;
    var ensureElementIdFallbackCounter = 0;

    function fallbackEnsureElementId(element, baseText) {
      if (!element) {
        return '';
      }
      if (element.id) {
        return element.id;
      }
      var fallbackBase = typeof baseText === 'string' && baseText ? baseText : 'field';
      var normalized = fallbackBase.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!normalized) {
        normalized = 'field';
      }
      ensureElementIdFallbackCounter += 1;
      var candidate = normalized + '-' + ensureElementIdFallbackCounter;
      if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
        while (document.getElementById(candidate)) {
          ensureElementIdFallbackCounter += 1;
          candidate = normalized + '-' + ensureElementIdFallbackCounter;
        }
      }
      element.id = candidate;
      return candidate;
    }

    function getEnsureElementId() {
      if (ensureElementIdResolver && typeof ensureElementIdResolver === 'function') {
        return ensureElementIdResolver;
      }

      var directEnsure = typeof ensureElementId === 'function' ? ensureElementId : null;
      if (!directEnsure && typeof globalThis !== 'undefined' && globalThis) {
        var globalEnsure = globalThis.ensureElementId;
        if (typeof globalEnsure === 'function') {
          directEnsure = globalEnsure;
        }
      }

      if (typeof directEnsure === 'function') {
        ensureElementIdResolver = directEnsure;
        return ensureElementIdResolver;
      }

      ensureElementIdResolver = fallbackEnsureElementId;
      if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.ensureElementId !== 'function') {
        try {
          globalThis.ensureElementId = fallbackEnsureElementId;
        } catch (assignError) {
          void assignError;
        }
      }

      return ensureElementIdResolver;
    }

    function getHiddenLabelFactory() {
      if (typeof createHiddenLabel === 'function') {
        return createHiddenLabel;
      }
      if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis.createHiddenLabel === 'function') {
        return globalThis.createHiddenLabel;
      }
      return function fallbackCreateHiddenLabel(forId, text) {
        var label = document.createElement('label');
        label.className = 'visually-hidden';
        if (forId) {
          label.setAttribute('for', forId);
        }
        label.textContent = typeof text === 'string' ? text : '';
        return label;
      };
    }

    // Wrap a form field with a div containing a data-label attribute for styling.
    function createFieldWithLabel(el, label) {
      const wrapper = document.createElement('div');
      wrapper.className = 'field-with-label';
      wrapper.dataset.label = label;
      const ensureId = getEnsureElementId();
      const fieldId = typeof ensureId === 'function' ? ensureId(el, label) : fallbackEnsureElementId(el, label);
      const hiddenLabelFactory = getHiddenLabelFactory();
      const hiddenLabel = hiddenLabelFactory(fieldId, label);
      wrapper.appendChild(hiddenLabel);
      wrapper.appendChild(el);
      return wrapper;
    }

    // Helper used by select-row builders to insert an empty option.
    // Previously this inserted a blank option at the top of each select.
    // The UI no longer requires an empty choice, so this function is now a
    // no-op but kept for backward compatibility with existing calls.
    function addEmptyOption(/* select */) {
      // Intentionally left blank
    }

    // Utility to remove entries with value "None" or empty string
    function filterNoneEntries(list, prop = 'type') {
      if (!Array.isArray(list)) return [];
      return list.filter(item => {
        if (typeof item === 'string') {
          return item && item !== 'None';
        }
        if (item && Object.prototype.hasOwnProperty.call(item, prop)) {
          const val = item[prop];
          return val !== undefined && val !== null && val !== '' && val !== 'None';
        }
        return true;
      });
    }



    // Build a single row of the video output editor UI.
    function createVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-output-select';
      select.name = 'videoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoOutputsHeading', ['cameraVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setVideoOutputs(list) {
      videoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type;
          videoOutputsContainer.appendChild(createVideoOutputRow(t));
        });
      } else {
        videoOutputsContainer.appendChild(createVideoOutputRow());
      }
    }

    function getVideoOutputs() {
      return Array.from(videoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(vo => vo.type && vo.type !== 'None');
    }

    function clearVideoOutputs() {
      setVideoOutputs([]);
    }

    function createMonitorVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'monitor-video-input-select';
      select.name = 'monitorVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createMonitorVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoInputsHeading', ['monitorVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (monitorVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setMonitorVideoInputs(list) {
      monitorVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow(t));
        });
      } else {
        monitorVideoInputsContainer.appendChild(createMonitorVideoInputRow());
      }
    }

    function getMonitorVideoInputs() {
      return Array.from(monitorVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearMonitorVideoInputs() {
      setMonitorVideoInputs([]);
    }

    function createMonitorVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'monitor-video-output-select';
      select.name = 'monitorVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createMonitorVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['monitorVideoOutputsHeading', ['monitorVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (monitorVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setMonitorVideoOutputs(list) {
      monitorVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow(t));
        });
      } else {
        monitorVideoOutputsContainer.appendChild(createMonitorVideoOutputRow());
      }
    }

    function getMonitorVideoOutputs() {
      return Array.from(monitorVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearMonitorVideoOutputs() {
      setMonitorVideoOutputs([]);
    }

    function createViewfinderVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'viewfinder-video-input-select';
      select.name = 'viewfinderVideoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoInputsHeading', ['viewfinderVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderVideoInputsContainer && viewfinderVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setViewfinderVideoInputs(list) {
      if (!viewfinderVideoInputsContainer) return;
      viewfinderVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow(t));
        });
      } else {
        viewfinderVideoInputsContainer.appendChild(createViewfinderVideoInputRow());
      }
    }

    function getViewfinderVideoInputs() {
      if (!viewfinderVideoInputsContainer) return [];
      return Array.from(viewfinderVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearViewfinderVideoInputs() {
      setViewfinderVideoInputs([]);
    }

    function createViewfinderVideoOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'viewfinder-video-output-select';
      select.name = 'viewfinderVideoOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderVideoOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderVideoOutputsHeading', ['viewfinderVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderVideoOutputsContainer && viewfinderVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setViewfinderVideoOutputs(list) {
      if (!viewfinderVideoOutputsContainer) return;
      viewfinderVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow(t));
        });
      } else {
        viewfinderVideoOutputsContainer.appendChild(createViewfinderVideoOutputRow());
      }
    }

    function getViewfinderVideoOutputs() {
      if (!viewfinderVideoOutputsContainer) return [];
      return Array.from(viewfinderVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearViewfinderVideoOutputs() {
      setViewfinderVideoOutputs([]);
    }

    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);

    const videoPowerInputHelpers = (function resolveVideoPowerInputHelpers() {
      if (typeof require === 'function') {
        try {
          const helpers = require('./modules/video-power-inputs.js');
          if (helpers && typeof helpers.normalizePowerInputList === 'function') {
            return helpers;
          }
        } catch (helperError) {
          void helperError;
        }
      }
      return {};
    })();

    let cachedVideoPowerInputsContainer = null;

    function resolveVideoPowerInputsContainer() {
      if (
        cachedVideoPowerInputsContainer &&
        typeof cachedVideoPowerInputsContainer.querySelector === 'function'
      ) {
        return cachedVideoPowerInputsContainer;
      }

      let container = null;
      if (typeof videoPowerInputsContainer !== 'undefined' && videoPowerInputsContainer) {
        container = videoPowerInputsContainer;
      }
      if (!container && typeof document !== 'undefined') {
        container = document.getElementById('videoPowerInputsContainer');
      }
      if (container) {
        cachedVideoPowerInputsContainer = container;
        if (typeof videoPowerInputsContainer !== 'undefined') {
          videoPowerInputsContainer = container;
        } else if (typeof globalThis !== 'undefined') {
          try {
            globalThis.videoPowerInputsContainer = container;
          } catch (assignError) {
            void assignError;
          }
        }
      }
      return container;
    }

    let powerPortOptions = [];

    function ensurePowerPortOptionsInitialized() {
      if (!powerPortOptions || powerPortOptions.length === 0) {
        try {
          powerPortOptions = getAllPowerPortTypes();
        } catch (resolveError) {
          void resolveError;
          powerPortOptions = [];
        }
      }
      return powerPortOptions;
    }

    function resolveVideoPowerText(key, fallback) {
      const localeTexts = typeof getLanguageTexts === 'function'
        ? getLanguageTexts(currentLang)
        : texts?.[currentLang];
      const englishTexts = typeof getLanguageTexts === 'function'
        ? getLanguageTexts('en')
        : texts?.en;
      return (localeTexts && localeTexts[key])
        || (englishTexts && englishTexts[key])
        || fallback;
    }

    function fallbackNormalizePowerInputList(raw) {
      if (!raw) {
        return [];
      }
      const list = [];
      const appendEntry = value => {
        if (!value) {
          return;
        }
        const typeSource = Array.isArray(value.type) ? value.type : [value.type || value.portType || value.connectorType];
        const typeValues = (typeSource || [])
          .filter(item => typeof item === 'string' && item.trim())
          .map(item => item.trim());
        const voltageRange = typeof value.voltageRange === 'string' ? value.voltageRange : '';
        const notes = typeof value.notes === 'string' ? value.notes : '';
        if (!typeValues.length && !voltageRange && !notes) {
          return;
        }
        const entry = { type: typeValues };
        if (voltageRange) {
          entry.voltageRange = voltageRange;
        }
        if (notes) {
          entry.notes = notes;
        }
        list.push(entry);
      };
      if (Array.isArray(raw)) {
        raw.forEach(appendEntry);
      } else if (typeof raw === 'string' && raw.trim()) {
        appendEntry({ type: raw.trim() });
      } else if (typeof raw === 'object') {
        appendEntry(raw);
      }
      return list;
    }

    const normalizePowerInputList =
      typeof videoPowerInputHelpers.normalizePowerInputList === 'function'
        ? videoPowerInputHelpers.normalizePowerInputList
        : fallbackNormalizePowerInputList;

    function createVideoPowerInputRow(initialEntry = {}) {
      const currentPowerPortOptions = ensurePowerPortOptionsInitialized();
      const storedTypeValues = Array.isArray(initialEntry.type)
        ? initialEntry.type.filter(Boolean)
        : [];
      const primaryType = storedTypeValues.length ? storedTypeValues[0] : '';
      const voltageValue = typeof initialEntry.voltageRange === 'string' ? initialEntry.voltageRange : '';
      const notesValue = typeof initialEntry.notes === 'string' ? initialEntry.notes : '';

      const row = document.createElement('div');
      row.className = 'form-row video-power-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'video-power-type-select';
      typeSelect.name = 'videoPowerType';
      addEmptyOption(typeSelect);
      currentPowerPortOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (primaryType && !currentPowerPortOptions.includes(primaryType)) {
        const opt = document.createElement('option');
        opt.value = primaryType;
        opt.textContent = primaryType;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = primaryType;
      typeSelect.dataset.originalValue = primaryType;
      if (storedTypeValues.length) {
        try {
          row.dataset.originalTypeValues = JSON.stringify(storedTypeValues);
        } catch (serializeError) {
          void serializeError;
        }
      }
      typeSelect.addEventListener('change', () => {
        if (!row) return;
        if (typeSelect.value === typeSelect.dataset.originalValue && storedTypeValues.length) {
          try {
            row.dataset.originalTypeValues = JSON.stringify(storedTypeValues);
          } catch (serializeError) {
            delete row.dataset.originalTypeValues;
          }
        } else {
          delete row.dataset.originalTypeValues;
        }
      });
      row.appendChild(createFieldWithLabel(typeSelect, resolveVideoPowerText('videoPowerTypeLabel', 'Connector')));

      const voltageInput = document.createElement('input');
      voltageInput.type = 'text';
      voltageInput.className = 'video-power-voltage-input';
      voltageInput.value = voltageValue;
      voltageInput.placeholder = resolveVideoPowerText('videoPowerVoltagePlaceholder', 'Voltage range (e.g. 6-28V)');
      row.appendChild(createFieldWithLabel(voltageInput, resolveVideoPowerText('videoPowerVoltageLabel', 'Voltage range')));

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.className = 'video-power-notes-input';
      notesInput.value = notesValue;
      notesInput.placeholder = resolveVideoPowerText('videoPowerNotesPlaceholder', 'Notes (mount, adapter, etc.)');
      row.appendChild(createFieldWithLabel(notesInput, resolveVideoPowerText('videoPowerNotesLabel', 'Notes')));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoPowerInputsHeading', ['videoPowerInputLabel']],
        fallbackContext: 'Power Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoPowerInputRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoPowerInputsHeading', ['videoPowerInputLabel']],
        fallbackContext: 'Power Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        const container = resolveVideoPowerInputsContainer();
        if (container && container.children.length > 1) {
          row.remove();
        }
      });
      row.appendChild(removeBtn);

      return row;
    }

    function setVideoPowerInputs(raw) {
      const container = resolveVideoPowerInputsContainer();
      if (!container) {
        return;
      }
      container.innerHTML = '';
      const entries = normalizePowerInputList(raw);
      if (entries.length) {
        entries.forEach(entry => {
          container.appendChild(createVideoPowerInputRow(entry));
        });
      } else {
        container.appendChild(createVideoPowerInputRow());
      }
    }

    function getVideoPowerInputs() {
      const container = resolveVideoPowerInputsContainer();
      if (!container) {
        return undefined;
      }
      const rows = Array.from(container.querySelectorAll('.video-power-row'));
      const entries = rows.map(row => {
        const select = row.querySelector('.video-power-type-select');
        if (!select) {
          return null;
        }
        const stored = row.dataset.originalTypeValues;
        let typeValues;
        if (stored && select.value === (select.dataset.originalValue || '')) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length) {
              typeValues = parsed.filter(value => typeof value === 'string' && value.trim());
            }
          } catch (parseError) {
            void parseError;
            typeValues = undefined;
          }
        }
        if (!typeValues || !typeValues.length) {
          if (typeof select.value === 'string' && select.value && select.value !== 'None') {
            typeValues = [select.value];
          } else {
            typeValues = [];
          }
        }
        if (!typeValues.length) {
          return null;
        }
        const voltageInput = row.querySelector('.video-power-voltage-input');
        const notesInput = row.querySelector('.video-power-notes-input');
        const voltageValue = voltageInput && typeof voltageInput.value === 'string'
          ? voltageInput.value.trim()
          : '';
        const notesValue = notesInput && typeof notesInput.value === 'string'
          ? notesInput.value.trim()
          : '';
        const entry = { type: typeValues.slice() };
        if (voltageValue) {
          entry.voltageRange = voltageValue;
        }
        if (notesValue) {
          entry.notes = notesValue;
        }
        return entry;
      }).filter(Boolean);

      if (!entries.length) {
        return undefined;
      }
      if (entries.length === 1) {
        return entries[0];
      }
      return entries;
    }

    function clearVideoPowerInputs() {
      setVideoPowerInputs([]);
    }

    function createVideoInputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-input-select';
      select.name = 'videoInput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoInputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoInputsHeading', ['videoVideoInputsLabel']],
        fallbackContext: 'Video Inputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoVideoInputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setVideoInputs(list) {
      videoVideoInputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoInputsContainer.appendChild(createVideoInputRow(t));
        });
      } else {
        videoVideoInputsContainer.appendChild(createVideoInputRow());
      }
    }

    function getVideoInputs() {
      return Array.from(videoVideoInputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearVideoInputs() { setVideoInputs([]); }

    function createVideoIOOutputRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'video-output-select-io';
      select.name = 'videoIOOutput';
      addEmptyOption(select);
      videoOutputOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createVideoIOOutputRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['videoVideoOutputsHeading', ['videoVideoOutputsLabel']],
        fallbackContext: 'Video Outputs',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (videoVideoOutputsContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setVideoOutputsIO(list) {
      videoVideoOutputsContainer.innerHTML = '';
      const filtered = filterNoneEntries(list, 'type');
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type || item.portType;
          videoVideoOutputsContainer.appendChild(createVideoIOOutputRow(t));
        });
      } else {
        videoVideoOutputsContainer.appendChild(createVideoIOOutputRow());
      }
    }

    function getVideoOutputsIO() {
      return Array.from(videoVideoOutputsContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(v => v.type && v.type !== 'None');
    }

    function clearVideoOutputsIO() { setVideoOutputsIO([]); }

    // Build a row for editing a FIZ connector entry.
    function createFizConnectorRow(value = '') {
      const row = document.createElement('div');
      row.className = 'form-row';
      const select = document.createElement('select');
      select.className = 'fiz-connector-select';
      select.name = 'fizConnector';
      addEmptyOption(select);
      fizConnectorOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      select.value = value;
      row.appendChild(createFieldWithLabel(select, 'Type'));
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createFizConnectorRow());
      });
      row.appendChild(addBtn);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['fizConnectorHeading', ['cameraFIZConnectorLabel']],
        fallbackContext: 'FIZ Connector',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (fizConnectorContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);
      return row;
    }

    function setFizConnectors(list) {
      fizConnectorContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const t = typeof item === 'string' ? item : item.type;
          fizConnectorContainer.appendChild(createFizConnectorRow(t));
        });
      } else {
        fizConnectorContainer.appendChild(createFizConnectorRow());
      }
    }

    function getFizConnectors() {
      return Array.from(fizConnectorContainer.querySelectorAll('select'))
        .map(sel => ({ type: sel.value }))
        .filter(fc => fc.type && fc.type !== 'None');
    }

    function clearFizConnectors() {
      setFizConnectors([]);
    }

    function getAllRecordingMedia() {
      const selectedCameraName =
        cameraSelect && typeof cameraSelect.value === 'string'
          ? cameraSelect.value.trim()
          : '';

      const normalizedCameraName = selectedCameraName === 'None' ? '' : selectedCameraName;
      const selectedCamera =
        normalizedCameraName && devices && devices.cameras
          ? devices.cameras[normalizedCameraName]
          : null;

      const hasSpecificMedia = Array.isArray(selectedCamera?.recordingMedia)
        && selectedCamera.recordingMedia.length > 0;

      const sourceCameras = hasSpecificMedia
        ? [selectedCamera]
        : Object.values(devices?.cameras || {});

      const media = new Set();

      sourceCameras.forEach(cam => {
        if (!cam || !Array.isArray(cam.recordingMedia)) {
          return;
        }
        cam.recordingMedia.forEach(m => {
          if (!m) return;
          const type = typeof m === 'string' ? m : m.type;
          if (type) {
            media.add(type);
          }
        });
      });

      return Array.from(media).sort(localeSort);
    }

    let recordingMediaOptions = getAllRecordingMedia();

    function resolveRecordingMediaPlaceholder() {
      const fallbackProjectForm = (texts?.en && texts.en.projectForm) || {};
      const projectFormTexts = (texts?.[currentLang] && texts[currentLang].projectForm) || fallbackProjectForm;
      const placeholder = projectFormTexts.storageTypePlaceholder
        || fallbackProjectForm.storageTypePlaceholder
        || 'Select media type';
      const text = typeof placeholder === 'string' ? placeholder.trim() : '';
      return text || 'Select media type';
    }

    function appendRecordingMediaPlaceholder(select) {
      if (!select) return;
      const option = document.createElement('option');
      option.value = '';
      option.textContent = resolveRecordingMediaPlaceholder();
      option.dataset.placeholder = 'true';
      select.appendChild(option);
    }

    function updateRecordingMediaOptions() {
      recordingMediaOptions = getAllRecordingMedia();
      document.querySelectorAll('.recording-media-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        appendRecordingMediaPlaceholder(sel);
        recordingMediaOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (recordingMediaOptions.includes(cur)) {
          sel.value = cur;
        } else if (cur && cur !== 'None') {
          const opt = document.createElement('option');
          opt.value = cur;
          opt.textContent = cur;
          opt.dataset.extraOption = 'true';
          sel.appendChild(opt);
          sel.value = cur;
        } else {
          sel.value = '';
        }
      });
    }

    // Build a row allowing the user to specify recording media details.
    function createRecordingMediaRow(type = '', notes = '', brand = '') {
      const row = document.createElement('div');
      row.className = 'form-row';

      const select = document.createElement('select');
      select.className = 'recording-media-select';
      select.name = 'recordingMediaType';
      appendRecordingMediaPlaceholder(select);
      recordingMediaOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        select.appendChild(opt);
      });
      if (type) {
        if (!recordingMediaOptions.includes(type)) {
          const opt = document.createElement('option');
          opt.value = type;
          opt.textContent = type;
          select.appendChild(opt);
        }
        select.value = type;
      } else {
        select.value = '';
      }
      row.appendChild(createFieldWithLabel(select, 'Type'));

      const brands = (typeof devices !== 'undefined' && devices.recordingMediaBrands) || [];
      const sizes = (typeof devices !== 'undefined' && devices.recordingMediaSizes) || [];

      // Try to separate size from notes if possible, otherwise treat whole note as size context
      // For simple restoration, we treat the 'notes' field as the size value.
      const sizeValue = notes || '';

      const brandSelect = document.createElement('select');
      brandSelect.className = 'recording-media-brand-select';
      brandSelect.name = 'recordingMediaBrand';
      addEmptyOption(brandSelect);
      brands.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        brandSelect.appendChild(opt);
      });
      if (brand && !brands.includes(brand)) {
        const opt = document.createElement('option');
        opt.value = brand;
        opt.textContent = brand;
        opt.dataset.custom = 'true';
        brandSelect.appendChild(opt);
      }
      brandSelect.value = brand;
      row.appendChild(createFieldWithLabel(brandSelect, 'Brand'));

      const sizeSelect = document.createElement('select');
      sizeSelect.className = 'recording-media-size-select';
      sizeSelect.name = 'recordingMediaSize';
      addEmptyOption(sizeSelect);
      sizes.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        sizeSelect.appendChild(opt);
      });

      // If the current size/note value isn't in our standard list, add it as a custom option
      if (sizeValue && !sizes.includes(sizeValue)) {
        const opt = document.createElement('option');
        opt.value = sizeValue;
        opt.textContent = sizeValue;
        opt.dataset.custom = 'true';
        sizeSelect.appendChild(opt);
      }
      sizeSelect.value = sizeValue;
      row.appendChild(createFieldWithLabel(sizeSelect, 'Size'));

      // Optional extra notes input
      const extraNotesInput = document.createElement('input');
      extraNotesInput.type = 'text';
      extraNotesInput.placeholder = 'Extra details...';
      extraNotesInput.className = 'recording-media-extra-notes';
      // We don't populate this from 'notes' because 'notes' is consumed by sizeSelect. 
      // This is for *new* additions.
      row.appendChild(createFieldWithLabel(extraNotesInput, 'Notes'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createRecordingMediaRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['mediaHeading', ['cameraMediaLabel']],
        fallbackContext: 'Recording Media',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (cameraMediaContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);

      return row;
    }

    const setRecordingMediaLocal = list => {
      cameraMediaContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', notes = '', brand = '' } = item || {};
          cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes, brand));
        });
      } else {
        cameraMediaContainer.appendChild(createRecordingMediaRow());
      }
    };

    writeCoreScopeValue('setRecordingMedia', setRecordingMediaLocal);

    function getRecordingMedia() {
      return Array.from(cameraMediaContainer.querySelectorAll('.form-row'))
        .map(row => {
          const typeSel = row.querySelector('.recording-media-select');
          const brandSel = row.querySelector('.recording-media-brand-select');
          const sizeSel = row.querySelector('.recording-media-size-select');
          const extraInput = row.querySelector('.recording-media-extra-notes');

          if (!typeSel) return null;

          const type = typeSel.value;
          const brand = brandSel ? brandSel.value : '';
          const size = sizeSel ? sizeSel.value : '';
          const extra = extraInput ? extraInput.value : '';

          // Combine size and extra notes
          let finalNotes = size;
          if (extra) {
            finalNotes = finalNotes ? finalNotes + ' ' + extra : extra;
          }

          return { type, brand, notes: finalNotes };
        })
        .filter(m => m && m.type && m.type !== 'None');
    }

    writeCoreScopeValue('getRecordingMedia', getRecordingMedia);
    writeCoreScopeValue('updateRecordingMediaOptions', updateRecordingMediaOptions);

    function clearRecordingMedia() {
      setRecordingMediaLocal([]);
    }

    powerPortOptions = getAllPowerPortTypes();

    setVideoPowerInputs([]);

    function updatePowerPortOptions() {
      powerPortOptions = getAllPowerPortTypes();
      const current = cameraPortTypeInput.value;
      cameraPortTypeInput.innerHTML = '';
      addEmptyOption(cameraPortTypeInput);
      powerPortOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        cameraPortTypeInput.appendChild(opt);
      });
      if (powerPortOptions.includes(current)) cameraPortTypeInput.value = current;

      if (monitorPortTypeInput) {
        const curMon = monitorPortTypeInput.value;
        monitorPortTypeInput.innerHTML = '';
        addEmptyOption(monitorPortTypeInput);
        powerPortOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          monitorPortTypeInput.appendChild(opt);
        });
        if (powerPortOptions.includes(curMon)) monitorPortTypeInput.value = curMon;
      }

      if (typeof document !== 'undefined') {
        document.querySelectorAll('.video-power-type-select').forEach(sel => {
          const currentValue = sel.value;
          sel.innerHTML = '';
          addEmptyOption(sel);
          powerPortOptions.forEach(optVal => {
            const opt = document.createElement('option');
            opt.value = optVal;
            opt.textContent = optVal;
            sel.appendChild(opt);
          });
          if (currentValue && !powerPortOptions.includes(currentValue)) {
            const opt = document.createElement('option');
            opt.value = currentValue;
            opt.textContent = currentValue;
            sel.appendChild(opt);
          }
          sel.value = currentValue;
        });
      }
    }

    function getAllPlateTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        const list = cam.power?.batteryPlateSupport;
        if (Array.isArray(list)) {
          list.forEach(bp => {
            if (bp && bp.type) types.add(bp.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }

    let plateTypeOptions = getAllPlateTypes();

    function updatePlateTypeOptions() {
      plateTypeOptions = getAllPlateTypes();
      document.querySelectorAll('.battery-plate-type-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        plateTypeOptions.forEach(pt => {
          const opt = document.createElement('option');
          opt.value = pt;
          opt.textContent = pt;
          sel.appendChild(opt);
        });
        if (plateTypeOptions.includes(current)) sel.value = current;
      });
    }

    // Build a battery plate row with type, mount and optional notes fields.
    function createBatteryPlateRow(type = '', mount = 'native', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'battery-plate-type-select';
      typeSelect.name = 'batteryPlateType';
      addEmptyOption(typeSelect);
      plateTypeOptions.forEach(pt => {
        const opt = document.createElement('option');
        opt.value = pt;
        opt.textContent = pt;
        typeSelect.appendChild(opt);
      });
      if (type && !plateTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

      const mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'batteryPlateMount';
      ['native', 'adapted'].forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || '';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'batteryPlateNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createBatteryPlateRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['cameraPlatesLabel', ['powerInputsHeading']],
        fallbackContext: 'Battery Plates',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (batteryPlatesContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);

      return row;
    }

    const setBatteryPlatesLocal = list => {
      batteryPlatesContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', mount = 'native', notes = '' } = item || {};
          batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
        });
      } else {
        batteryPlatesContainer.appendChild(createBatteryPlateRow());
      }
    };

    writeCoreScopeValue('setBatteryPlates', setBatteryPlatesLocal);

    function getBatteryPlates() {
      return Array.from(batteryPlatesContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, mountSel, notesInput] = row.querySelectorAll('select, input');
          return { type: typeSel.value, mount: mountSel.value, notes: notesInput.value };
        })
        .filter(bp => bp.type && bp.type !== 'None');
    }

    writeCoreScopeValue('getBatteryPlates', getBatteryPlates);

    function clearBatteryPlates() {
      setBatteryPlatesLocal([]);
    }
    if (typeof window !== 'undefined') {
      window.clearBatteryPlates = clearBatteryPlates;
    }

    function getAllViewfinderTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(vf => {
            if (vf && vf.type) types.add(vf.type);
          });
        }
      });
      return Array.from(types).sort(localeSort);
    }

    function getAllViewfinderConnectors() {
      const conns = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        if (Array.isArray(cam.viewfinder)) {
          cam.viewfinder.forEach(vf => {
            if (vf && vf.connector) conns.add(vf.connector);
          });
        }
      });
      return Array.from(conns).filter(c => c).sort(localeSort);
    }

    var viewfinderTypeOptions = getAllViewfinderTypes();
    var viewfinderConnectorOptions = getAllViewfinderConnectors();

    // Build a viewfinder configuration row used in the camera editor.
    function createViewfinderRow(type = '', resolution = '', connector = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'viewfinder-type-select';
      typeSelect.name = 'viewfinderType';
      addEmptyOption(typeSelect);
      viewfinderTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !viewfinderTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

      const resInput = document.createElement('input');
      resInput.type = 'text';
      resInput.placeholder = 'Resolution';
      resInput.value = resolution;
      resInput.name = 'viewfinderResolution';
      row.appendChild(createFieldWithLabel(resInput, 'Resolution'));

      const connSelect = document.createElement('select');
      connSelect.className = 'viewfinder-connector-select';
      addEmptyOption(connSelect);
      connSelect.name = 'viewfinderConnector';
      viewfinderConnectorOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        connSelect.appendChild(opt);
      });
      if (connector && !viewfinderConnectorOptions.includes(connector)) {
        const opt = document.createElement('option');
        opt.value = connector;
        opt.textContent = connector;
        connSelect.appendChild(opt);
      }
      connSelect.value = connector;
      row.appendChild(createFieldWithLabel(connSelect, 'Connector'));

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'viewfinderNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createViewfinderRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['viewfinderHeading', ['cameraViewfinderLabel']],
        fallbackContext: 'Viewfinder',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (viewfinderContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);

      return row;
    }

    function setViewfinders(list) {
      viewfinderContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', resolution = '', connector = '', notes = '' } = item || {};
          viewfinderContainer.appendChild(createViewfinderRow(type, resolution, connector, notes));
        });
      } else {
        viewfinderContainer.appendChild(createViewfinderRow());
      }
    }

    function getViewfinders() {
      return Array.from(viewfinderContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSelect, resInput, connSelect, notesInput] = row.querySelectorAll('select, input');
          return {
            type: typeSelect.value,
            resolution: resInput.value,
            connector: connSelect.value,
            notes: notesInput.value
          };
        })
        .filter(vf => vf.type && vf.type !== 'None');
    }

    function clearViewfinders() {
      setViewfinders([]);
    }

    function getAllMountTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        if (Array.isArray(cam.lensMount)) {
          cam.lensMount.forEach(lm => {
            if (lm && lm.type) types.add(lm.type);
          });
        }
      });
      Object.values(devices.lenses || {}).forEach(lens => {
        if (!lens) return;
        if (Array.isArray(lens.mountOptions)) {
          lens.mountOptions.forEach(option => {
            if (option && option.type) types.add(option.type);
          });
        }
        const baseMount = typeof lens.mount === 'string' ? lens.mount.trim() : '';
        if (baseMount) types.add(baseMount);
      });
      return Array.from(types).sort(localeSort);
    }

    let mountTypeOptions = getAllMountTypes();

    function updateMountTypeOptions() {
      mountTypeOptions = getAllMountTypes();
      document.querySelectorAll('.lens-mount-type-select').forEach(sel => {
        const current = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        mountTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (mountTypeOptions.includes(current)) sel.value = current;
      });
    }

    // Build a lens mount row with type and mount selection fields.
    function createLensMountRow(type = '', mount = 'native', context) {
      const row = document.createElement('div');
      row.className = 'form-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'lens-mount-type-select';
      typeSelect.name = 'lensMountType';
      addEmptyOption(typeSelect);
      mountTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !mountTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type || '';
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

      const mountSelect = document.createElement('select');
      addEmptyOption(mountSelect);
      mountSelect.name = 'lensMount';
      ['native', 'adapted'].forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        mountSelect.appendChild(opt);
      });
      mountSelect.value = mount || 'native';
      row.appendChild(createFieldWithLabel(mountSelect, 'Mount'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      const headingId = context?.headingId || 'lensMountHeading';
      const labelId = context?.labelId || 'cameraLensMountLabel';
      const fallbackContext = context?.fallbackContext || 'Lens Mount';
      const targetContainer = context?.container || lensMountContainer;
      const minRows = Number.isFinite(context?.minRows) ? context.minRows : 1;
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: [headingId, [labelId]],
        fallbackContext,
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        const newRow = createLensMountRow('', 'native', context);
        if (targetContainer) {
          if (row.nextSibling) {
            targetContainer.insertBefore(newRow, row.nextSibling);
          } else {
            targetContainer.appendChild(newRow);
          }
        } else {
          row.after(newRow);
        }
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: [headingId, [labelId]],
        fallbackContext,
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        const container = targetContainer || row.parentElement;
        if (!container) return;
        const min = minRows < 1 ? 1 : minRows;
        if (container.children.length > min) {
          row.remove();
        }
      });
      row.appendChild(removeBtn);

      return row;
    }

    function setLensMounts(list) {
      lensMountContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', mount = 'native' } = item || {};
          lensMountContainer.appendChild(createLensMountRow(type, mount));
        });
      } else {
        lensMountContainer.appendChild(createLensMountRow());
      }
    }

    writeCoreScopeValue('setLensMounts', setLensMounts);

    function getLensMounts() {
      return Array.from(lensMountContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, mountSel] = row.querySelectorAll('select');
          return { type: typeSel.value, mount: mountSel.value };
        })
        .filter(lm => lm.type && lm.type !== 'None');
    }

    writeCoreScopeValue('getLensMounts', getLensMounts);

    function clearLensMounts() {
      setLensMounts([]);
    }

    function getLensDeviceMountContext() {
      return {
        container: lensMountOptionsContainer,
        headingId: 'lensDeviceMountHeading',
        labelId: 'lensDeviceMountLabel',
        fallbackContext: 'Lens Mount',
        minRows: 1,
      };
    }

    function setLensDeviceMountOptions(list, fallbackType = '') {
      if (!lensMountOptionsContainer) return;
      lensMountOptionsContainer.innerHTML = '';
      const filtered = Array.isArray(list) ? filterNoneEntries(list) : [];
      const mounts = filtered.length ? filtered.slice() : [];
      const normalizedFallback = typeof fallbackType === 'string' ? fallbackType.trim() : '';
      if (!mounts.length && normalizedFallback) {
        mounts.push({ type: normalizedFallback, mount: 'native' });
      }
      if (!mounts.length) {
        mounts.push({ type: '', mount: 'native' });
      }
      const context = getLensDeviceMountContext();
      mounts.forEach(entry => {
        const type = entry && typeof entry.type === 'string' ? entry.type : '';
        const mount = entry && typeof entry.mount === 'string' ? entry.mount : 'native';
        lensMountOptionsContainer.appendChild(createLensMountRow(type, mount, context));
      });
      updateMountTypeOptions();
    }

    function getLensDeviceMountOptions() {
      if (!lensMountOptionsContainer) return [];
      return Array.from(lensMountOptionsContainer.querySelectorAll('.form-row'))
        .map(row => {
          const selects = row ? row.querySelectorAll('select') : null;
          if (!selects || selects.length < 2) return null;
          const type = (selects[0].value || '').trim();
          if (!type) return null;
          const mount = (selects[1].value || '').trim().toLowerCase();
          return { type, mount: mount === 'adapted' ? 'adapted' : 'native' };
        })
        .filter(Boolean);
    }

    function clearLensDeviceMountOptions() {
      setLensDeviceMountOptions([]);
    }

    function getAllPowerDistTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.type) types.add(pd.type); });
        }
      });
      return Array.from(types).sort(localeSort);
    }

    let powerDistTypeOptions = getAllPowerDistTypes();
    function getAllPowerDistVoltages() {
      const volts = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.voltage) volts.add(pd.voltage); });
        }
      });
      return Array.from(volts).filter(v => v).sort(localeSort);
    }

    function getAllPowerDistCurrents() {
      const currents = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        const list = cam.power?.powerDistributionOutputs;
        if (Array.isArray(list)) {
          list.forEach(pd => { if (pd && pd.current) currents.add(pd.current); });
        }
      });
      return Array.from(currents).filter(c => c).sort(localeSort);
    }

    let powerDistVoltageOptions = getAllPowerDistVoltages();
    let powerDistCurrentOptions = getAllPowerDistCurrents();

    function updatePowerDistVoltageOptions() {
      powerDistVoltageOptions = getAllPowerDistVoltages();
      document.querySelectorAll('.power-dist-voltage-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistVoltageOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistVoltageOptions.includes(cur)) sel.value = cur;
      });
    }

    function updatePowerDistCurrentOptions() {
      powerDistCurrentOptions = getAllPowerDistCurrents();
      document.querySelectorAll('.power-dist-current-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistCurrentOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistCurrentOptions.includes(cur)) sel.value = cur;
      });
    }

    function updatePowerDistTypeOptions() {
      powerDistTypeOptions = getAllPowerDistTypes();
      document.querySelectorAll('.power-dist-type-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        powerDistTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (powerDistTypeOptions.includes(cur)) sel.value = cur;
      });
    }

    // Build a power distribution output row for the editor UI.
    function createPowerDistRow(type = '', voltage = '', current = '', wattage = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'power-dist-type-select';
      typeSelect.name = 'powerDistType';
      addEmptyOption(typeSelect);
      powerDistTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !powerDistTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

      const voltSelect = document.createElement('select');
      voltSelect.className = 'power-dist-voltage-select';
      addEmptyOption(voltSelect);
      voltSelect.name = 'powerDistVoltage';
      powerDistVoltageOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        voltSelect.appendChild(opt);
      });
      if (voltage && !powerDistVoltageOptions.includes(voltage)) {
        const opt = document.createElement('option');
        opt.value = voltage;
        opt.textContent = voltage;
        voltSelect.appendChild(opt);
      }
      voltSelect.value = voltage;
      row.appendChild(createFieldWithLabel(voltSelect, 'Voltage'));

      const currSelect = document.createElement('select');
      currSelect.className = 'power-dist-current-select';
      addEmptyOption(currSelect);
      currSelect.name = 'powerDistCurrent';
      powerDistCurrentOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        currSelect.appendChild(opt);
      });
      if (current && !powerDistCurrentOptions.includes(current)) {
        const opt = document.createElement('option');
        opt.value = current;
        opt.textContent = current;
        currSelect.appendChild(opt);
      }
      currSelect.value = current;
      row.appendChild(createFieldWithLabel(currSelect, 'Current'));

      const wattInput = document.createElement('input');
      wattInput.type = 'number';
      wattInput.step = '0.1';
      wattInput.placeholder = 'W';
      wattInput.value = wattage === null || wattage === undefined ? '' : wattage;
      wattInput.name = 'powerDistWatt';
      row.appendChild(createFieldWithLabel(wattInput, 'W'));

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'powerDistNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createPowerDistRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['powerDistributionHeading', ['cameraPowerDistLabel']],
        fallbackContext: 'Power Distribution',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (powerDistContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);

      return row;
    }

    function setPowerDistribution(list) {
      powerDistContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', voltage = '', current = '', wattage = '', notes = '' } = item || {};
          powerDistContainer.appendChild(createPowerDistRow(type, voltage, current, wattage, notes));
        });
      } else {
        powerDistContainer.appendChild(createPowerDistRow());
      }
    }

    function getPowerDistribution() {
      return Array.from(powerDistContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, voltSel, currSel, wattInput, notesInput] = row.querySelectorAll('select, input');
          return {
            type: typeSel.value,
            voltage: voltSel.value,
            current: currSel.value,
            wattage: wattInput.value ? parseFloat(wattInput.value) : null,
            notes: notesInput.value
          };
        })
        .filter(pd => pd.type && pd.type !== 'None');
    }

    function clearPowerDistribution() {
      setPowerDistribution([]);
    }

    function getAllTimecodeTypes() {
      const types = new Set();
      Object.values(devices.cameras || {}).forEach(cam => {
        const list = cam.timecode;
        if (Array.isArray(list)) {
          list.forEach(tc => { if (tc && tc.type) types.add(tc.type); });
        }
      });
      return Array.from(types).sort(localeSort);
    }

    let timecodeTypeOptions = getAllTimecodeTypes();

    function updateTimecodeTypeOptions() {
      timecodeTypeOptions = getAllTimecodeTypes();
      document.querySelectorAll('.timecode-type-select').forEach(sel => {
        const cur = sel.value;
        sel.innerHTML = '';
        addEmptyOption(sel);
        timecodeTypeOptions.forEach(optVal => {
          const opt = document.createElement('option');
          opt.value = optVal;
          opt.textContent = optVal;
          sel.appendChild(opt);
        });
        if (timecodeTypeOptions.includes(cur)) sel.value = cur;
      });
    }

    // Build a timecode connector row used for editing camera properties.
    function createTimecodeRow(type = '', notes = '') {
      const row = document.createElement('div');
      row.className = 'form-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'timecode-type-select';
      typeSelect.name = 'timecodeType';
      addEmptyOption(typeSelect);
      timecodeTypeOptions.forEach(optVal => {
        const opt = document.createElement('option');
        opt.value = optVal;
        opt.textContent = optVal;
        typeSelect.appendChild(opt);
      });
      if (type && !timecodeTypeOptions.includes(type)) {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.appendChild(opt);
      }
      typeSelect.value = type;
      row.appendChild(createFieldWithLabel(typeSelect, 'Type'));

      const notesInput = document.createElement('input');
      notesInput.type = 'text';
      notesInput.placeholder = 'Notes';
      notesInput.value = notes;
      notesInput.name = 'timecodeNotes';
      row.appendChild(createFieldWithLabel(notesInput, 'Notes'));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      configureIconOnlyButtonSafe(addBtn, ICON_GLYPHS.add, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'addEntry'
      });
      addBtn.addEventListener('click', () => {
        row.after(createTimecodeRow());
      });
      row.appendChild(addBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      configureIconOnlyButtonSafe(removeBtn, ICON_GLYPHS.minus, {
        contextPaths: ['timecodeHeading', ['cameraTimecodeLabel']],
        fallbackContext: 'Timecode',
        actionKey: 'removeEntry'
      });
      removeBtn.addEventListener('click', () => {
        if (timecodeContainer.children.length > 1) row.remove();
      });
      row.appendChild(removeBtn);

      return row;
    }

    function setTimecodes(list) {
      timecodeContainer.innerHTML = '';
      const filtered = filterNoneEntries(list);
      if (filtered.length) {
        filtered.forEach(item => {
          const { type = '', notes = '' } = item || {};
          timecodeContainer.appendChild(createTimecodeRow(type, notes));
        });
      } else {
        timecodeContainer.appendChild(createTimecodeRow());
      }
    }

    function getTimecodes() {
      return Array.from(timecodeContainer.querySelectorAll('.form-row'))
        .map(row => {
          const [typeSel, notesInput] = row.querySelectorAll('select, input');
          return { type: typeSel.value, notes: notesInput.value };
        })
        .filter(tc => tc.type && tc.type !== 'None');
    }

    function clearTimecodes() {
      setTimecodes([]);
    }

    function getFavoriteValues(id) {
      const favs = typeof loadFavorites === 'function' ? loadFavorites() : {};
      return Array.isArray(favs[id]) ? favs[id] : [];
    }

    const FAVORITE_BUTTON_BY_SELECT = new WeakMap();
    const FAVORITE_CHANGE_LISTENER_BY_SELECT = new WeakMap();
    const FAVORITE_BUTTON_LISTENER = new WeakMap();

    function applyFavoritesToSelect(selectElem) {
      if (!selectElem || !selectElem.id) return;
      const favVals = getFavoriteValues(selectElem.id);
      if (!favVals.length) return;
      const opts = Array.from(selectElem.options);
      const noneOpt = opts.find(o => o.value === 'None');
      const others = opts.filter(o => o !== noneOpt);
      const favOpts = [];
      const restOpts = [];
      others.forEach(o => (favVals.includes(o.value) ? favOpts.push(o) : restOpts.push(o)));
      favOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
      restOpts.sort((a, b) => localeSort(a.textContent, b.textContent));
      selectElem.innerHTML = '';
      if (noneOpt) selectElem.appendChild(noneOpt);
      favOpts.forEach(o => selectElem.appendChild(o));
      restOpts.forEach(o => selectElem.appendChild(o));
    }

    function getFavoriteButton(selectElem) {
      const button = FAVORITE_BUTTON_BY_SELECT.get(selectElem);
      if (button && button.isConnected) {
        return button;
      }
      return null;
    }

    function updateFavoriteButton(selectElem) {
      if (!selectElem) return;
      const favoriteButton = getFavoriteButton(selectElem);
      if (!favoriteButton) return;
      const favVals = getFavoriteValues(selectElem.id);
      const val = selectElem.value;
      const isFav = favVals.includes(val);
      favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
      favoriteButton.classList.toggle('favorited', isFav);
      favoriteButton.disabled = val === 'None';
      favoriteButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    }

    function toggleFavorite(selectElem) {
      if (!selectElem || !selectElem.id) return;
      const val = selectElem.value;
      if (val === 'None') return;
      const favs = loadFavorites();
      const list = Array.isArray(favs[selectElem.id]) ? favs[selectElem.id] : [];
      const idx = list.indexOf(val);
      if (idx === -1) list.push(val); else list.splice(idx, 1);
      if (list.length) favs[selectElem.id] = list; else delete favs[selectElem.id];
      saveFavorites(favs);
      applyFavoritesToSelect(selectElem);
      updateFavoriteButton(selectElem);
      adjustGearListSelectWidth(selectElem);
    }

    let selectWidthMeasureElement = null;

    function getSelectWidthMeasureElement() {
      if (selectWidthMeasureElement && selectWidthMeasureElement.isConnected) {
        return selectWidthMeasureElement;
      }
      const span = document.createElement('span');
      span.className = 'gear-select-width-measure';
      Object.assign(span.style, {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'pre',
        pointerEvents: 'none',
        top: '-9999px',
        left: '-9999px',
        padding: '0',
        margin: '0',
        border: '0'
      });
      const parent = document.body || document.documentElement;
      parent.appendChild(span);
      selectWidthMeasureElement = span;
      return span;
    }

    function measureSelectTextWidth(selectElem, text, styles) {
      const content = text && text.length ? text : '\u00a0';
      const computedStyles = styles || window.getComputedStyle(selectElem);
      if (!computedStyles) {
        return content.length * 8;
      }
      const measureElem = getSelectWidthMeasureElement();
      const parent = document.body || document.documentElement;
      if (measureElem.parentElement !== parent) parent.appendChild(measureElem);

      if (computedStyles.font && computedStyles.font !== 'normal normal normal medium/normal serif') {
        measureElem.style.font = computedStyles.font;
      } else {
        measureElem.style.fontStyle = computedStyles.fontStyle || 'normal';
        measureElem.style.fontVariant = computedStyles.fontVariant || 'normal';
        measureElem.style.fontWeight = computedStyles.fontWeight || '400';
        measureElem.style.fontStretch = computedStyles.fontStretch || 'normal';
        measureElem.style.fontSize = computedStyles.fontSize || '16px';
        measureElem.style.fontFamily = computedStyles.fontFamily || 'sans-serif';
        measureElem.style.lineHeight = computedStyles.lineHeight || 'normal';
      }
      measureElem.style.letterSpacing = computedStyles.letterSpacing || 'normal';
      measureElem.style.textTransform = computedStyles.textTransform || 'none';
      measureElem.textContent = content;
      return measureElem.getBoundingClientRect().width;
    }

    function adjustGearListSelectWidth(selectElem) {
      if (!selectElem || selectElem.multiple || selectElem.size > 1) return;
      const container = selectElem.closest('#gearListOutput, #projectRequirementsOutput');
      if (!container) return;
      const styles = window.getComputedStyle(selectElem);
      if (!styles || styles.display === 'none') {
        selectElem.style.removeProperty('--gear-select-width');
        return;
      }
      const selectedOption = selectElem.selectedOptions && selectElem.selectedOptions[0];
      const optionText = selectedOption ? selectedOption.textContent.trim() : selectElem.value || '';
      const textWidth = measureSelectTextWidth(selectElem, optionText, styles);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
      const borderRight = parseFloat(styles.borderRightWidth) || 0;
      const fontSize = parseFloat(styles.fontSize) || 16;
      // Reserve space for the native arrow that keeps the disclosure indicator
      // visible without leaving an oversized gap between the option text and the
      // edge of the control.
      const arrowReserve = Math.max(fontSize * 0.5, 10);
      const minWidth = Math.max(fontSize * 4, 56);
      const widthPx = Math.max(
        Math.ceil(textWidth + paddingLeft + paddingRight + borderLeft + borderRight + arrowReserve),
        minWidth
      );
      selectElem.style.setProperty('--gear-select-width', `${widthPx}px`);
    }

    function adjustGearListSelectWidths(container) {
      if (!container) return;
      container
        .querySelectorAll('select')
        .forEach(selectElem => adjustGearListSelectWidth(selectElem));
    }

    function ensureSelectWrapper(selectElem) {
      if (!selectElem) return null;
      let wrapper = selectElem.parentElement;
      if (!wrapper || !wrapper.classList.contains('select-wrapper')) {
        if (wrapper && wrapper.tagName === 'LABEL') {
          const label = wrapper;
          wrapper = document.createElement('div');
          wrapper.className = 'select-wrapper';
          label.parentElement.insertBefore(wrapper, label.nextSibling);
          wrapper.appendChild(selectElem);
        } else {
          wrapper = document.createElement('div');
          wrapper.className = 'select-wrapper';
          selectElem.insertAdjacentElement('beforebegin', wrapper);
          wrapper.appendChild(selectElem);
        }
      }
      return wrapper;
    }

    function initFavoritableSelect(selectElem) {
      if (!selectElem || !selectElem.id || selectElem.multiple || selectElem.hidden) return;
      const wrapper = ensureSelectWrapper(selectElem);
      const gearItem = selectElem.closest('.gear-item');

      function cleanupFavoriteButton(btn, ownerSelect = null) {
        if (!btn) return;
        const listener = FAVORITE_BUTTON_LISTENER.get(btn);
        if (listener) {
          btn.removeEventListener('click', listener);
          FAVORITE_BUTTON_LISTENER.delete(btn);
        }
        if (ownerSelect && FAVORITE_BUTTON_BY_SELECT.get(ownerSelect) === btn) {
          FAVORITE_BUTTON_BY_SELECT.delete(ownerSelect);
        }
        btn.remove();
      }

      let favoriteButton = getFavoriteButton(selectElem);

      if (wrapper) {
        const wrapperButtons = Array.from(wrapper.querySelectorAll('.favorite-toggle'));
        if (favoriteButton && !wrapperButtons.includes(favoriteButton)) {
          favoriteButton = null;
        }
        if (!favoriteButton && wrapperButtons.length > 0) {
          [favoriteButton] = wrapperButtons;
        }
        wrapperButtons.forEach(btn => {
          if (btn !== favoriteButton) cleanupFavoriteButton(btn, selectElem);
        });
      }

      if (gearItem) {
        Array.from(gearItem.querySelectorAll('.favorite-toggle'))
          .filter(
            btn =>
              btn !== favoriteButton && btn.getAttribute('data-fav-select-id') === selectElem.id
          )
          .forEach(btn => cleanupFavoriteButton(btn));
      }

      if (!favoriteButton) {
        favoriteButton = document.createElement('button');
        if (wrapper) {
          wrapper.appendChild(favoriteButton);
        } else {
          selectElem.after(favoriteButton);
        }
      } else if (wrapper && favoriteButton.parentElement !== wrapper) {
        wrapper.appendChild(favoriteButton);
      }

      const previousListener = FAVORITE_BUTTON_LISTENER.get(favoriteButton);
      if (previousListener) {
        favoriteButton.removeEventListener('click', previousListener);
      }
      favoriteButton.type = 'button';
      favoriteButton.className = 'favorite-toggle';
      favoriteButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
      favoriteButton.setAttribute('aria-pressed', 'false');
      favoriteButton.setAttribute('data-fav-select-id', selectElem.id);
      const clickHandler = () => toggleFavorite(selectElem);
      favoriteButton.addEventListener('click', clickHandler);
      FAVORITE_BUTTON_LISTENER.set(favoriteButton, clickHandler);

      if (!FAVORITE_CHANGE_LISTENER_BY_SELECT.has(selectElem)) {
        const changeListener = () => updateFavoriteButton(selectElem);
        selectElem.addEventListener('change', changeListener);
        FAVORITE_CHANGE_LISTENER_BY_SELECT.set(selectElem, changeListener);
      }

      FAVORITE_BUTTON_BY_SELECT.set(selectElem, favoriteButton);
      favoriteButton.setAttribute('data-fav-select-id', selectElem.id);

      const translations = (() => {
        const translationSource =
          (typeof texts === 'object' && texts) ||
          (typeof GLOBAL_SCOPE !== 'undefined' && GLOBAL_SCOPE && GLOBAL_SCOPE.texts) ||
          {};
        const activeTexts = translationSource?.[currentLang];
        const fallbackLangCandidates = [];
        if (
          typeof DEFAULT_LANGUAGE_SAFE === 'string' &&
          translationSource?.[DEFAULT_LANGUAGE_SAFE]
        ) {
          fallbackLangCandidates.push(DEFAULT_LANGUAGE_SAFE);
        }
        if (translationSource?.en) {
          fallbackLangCandidates.push('en');
        }
        const fallbackTexts = fallbackLangCandidates
          .map(langKey => translationSource?.[langKey])
          .find(bundle => bundle && typeof bundle === 'object') || {};
        const label =
          (activeTexts && activeTexts.favoriteToggleLabel) ||
          fallbackTexts.favoriteToggleLabel ||
          'Toggle favorite';
        const help =
          (activeTexts && activeTexts.favoriteToggleHelp) ||
          fallbackTexts.favoriteToggleHelp ||
          label;
        return { label, help };
      })();

      favoriteButton.setAttribute('aria-label', translations.label);
      favoriteButton.setAttribute('title', translations.label);
      favoriteButton.setAttribute('data-help', translations.help);

      applyFavoritesToSelect(selectElem);
      updateFavoriteButton(selectElem);
      adjustGearListSelectWidth(selectElem);
    }

    function applySelectValueAfterPopulate(selectElem, value, includeNone) {
      if (!selectElem) return;
      if (typeof setSelectValue === 'function') {
        setSelectValue(selectElem, value);
        return;
      }

      const normalized = value === undefined || value === null ? '' : value;
      selectElem.value = normalized;
      if (selectElem.value !== normalized) {
        if (normalized === 'None' && includeNone) {
          selectElem.value = 'None';
          if (selectElem.value !== 'None') {
            selectElem.selectedIndex = -1;
          }
        } else if (normalized === '') {
          selectElem.selectedIndex = -1;
        } else {
          selectElem.selectedIndex = -1;
        }
      }
    }

    function restoreSelectSelection(selectElem, previousValue, hadSelection, includeNone) {
      if (!selectElem) return;
      const options = Array.from(selectElem.options || []);

      if (hadSelection) {
        const optionExists = options.some(option => option && option.value === previousValue);
        if (optionExists) {
          applySelectValueAfterPopulate(selectElem, previousValue, includeNone);
          return;
        }
        if (includeNone && options.some(option => option && option.value === 'None')) {
          applySelectValueAfterPopulate(selectElem, 'None', includeNone);
          return;
        }
      } else {
        selectElem.selectedIndex = -1;
        return;
      }

      if (!options.length) {
        selectElem.selectedIndex = -1;
      }
    }

    // Populate dropdowns with device options
    function populateSelect(selectElem, optionsObj = {}, includeNone = true) {
      if (!selectElem) return;
      let previousValue = typeof selectElem.value === 'string' ? selectElem.value : '';
      let hadSelection = selectElem.selectedIndex !== -1;

      if (selectElem.dataset && selectElem.dataset.pendingValue) {
        previousValue = selectElem.dataset.pendingValue;
        hadSelection = true;
      }

      // Ensure we always work with an object so Object.keys does not throw if
      // `optionsObj` is passed as `null`.
      const opts = optionsObj && typeof optionsObj === "object" ? optionsObj : {};
      selectElem.innerHTML = "";
      if (includeNone) {
        const noneOpt = document.createElement("option");
        noneOpt.value = "None";
        const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
        noneOpt.textContent = noneMap[currentLang] || "None";
        selectElem.appendChild(noneOpt);
      }
      Object.keys(opts)
        .filter(name => name !== "None")
        .sort(localeSort)
        .forEach(name => {
          const opt = document.createElement("option");
          opt.value = name;
          opt.textContent = name;
          selectElem.appendChild(opt);
        });
      initFavoritableSelect(selectElem);
      restoreSelectSelection(selectElem, previousValue, hadSelection, includeNone);
    }

    function populateMonitorSelect() {
      const monitors = devices.monitors || {};

      const filtered = Object.fromEntries(
        Object.entries(monitors)
        // .filter(([, data]) => !(data.wirelessRX && !data.wirelessTx)) // Temporary disable filter
      );

      populateSelect(monitorSelect, filtered, true);
    }

    function getCompatibleCagesForCamera(cameraName) {
      const allCages = devices?.accessories?.cages || {};
      if (!cameraName || cameraName === 'None') {
        return allCages;
      }
      return Object.fromEntries(
        Object.entries(allCages).filter(([, cage]) => {
          if (!cage || typeof cage !== 'object') {
            return true;
          }
          const compat = cage.compatible;
          if (Array.isArray(compat)) {
            return compat.includes(cameraName);
          }
          if (typeof compat === 'string' && compat) {
            return compat === cameraName;
          }
          return !compat;
        })
      );
    }

    function applyCageSelectValue(value) {
      if (!cageSelect) return;
      if (typeof setSelectValue === 'function') {
        setSelectValue(cageSelect, value);
        return;
      }
      if (typeof value === 'string') {
        cageSelect.value = value;
        if (cageSelect.value !== value) {
          if (value === 'None') {
            cageSelect.value = 'None';
          } else {
            cageSelect.selectedIndex = -1;
          }
        }
        return;
      }
      cageSelect.value = '';
    }

    function updateCageSelectOptions(preferredValue) {
      if (!cageSelect) return;
      const cameraName = cameraSelect ? cameraSelect.value : '';
      const compatibleCages = getCompatibleCagesForCamera(cameraName);
      const desiredValue = typeof preferredValue === 'string' ? preferredValue : cageSelect.value;
      populateSelect(cageSelect, compatibleCages, true);

      const hasDesired =
        desiredValue && desiredValue !== 'None'
        && Object.prototype.hasOwnProperty.call(compatibleCages, desiredValue);

      if (hasDesired) {
        applyCageSelectValue(desiredValue);
        return;
      }

      const options = Array.from(cageSelect.options || []);
      const noneOption = options.find(opt => opt.value === 'None');
      if (desiredValue === 'None' && noneOption) {
        applyCageSelectValue('None');
        return;
      }

      if (noneOption) {
        applyCageSelectValue('None');
        return;
      }

      const firstOption = options.find(opt => opt.value && opt.value !== 'None');
      applyCageSelectValue(firstOption ? firstOption.value : '');
    }

    function filterSelect(selectElem, filterValue) {
      const text = filterValue.toLowerCase();
      Array.from(selectElem.options).forEach(opt => {
        if (opt.value === "None" || text === "" || opt.textContent.toLowerCase().includes(text)) {
          opt.hidden = false;
          opt.disabled = false;
        } else {
          opt.hidden = true;
          opt.disabled = true;
        }
      });
    }

    function filterDeviceList(listElem, filterValue) {
      const text = filterValue.toLowerCase();
      Array.from(listElem.querySelectorAll('li')).forEach(li => {
        const nameSpan = li.querySelector('.device-summary span');
        const name = nameSpan ? nameSpan.textContent.toLowerCase() : '';
        if (text === '' || name.includes(text)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    }

    // Attach in-select search filtering for a dropdown
    function attachSelectSearch(selectElem) {
      if (!selectElem) {
        return;
      }
      let searchStr = "";
      let timer;

      selectElem.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          searchStr = searchStr.slice(0, -1);
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else if (e.key === 'Escape') {
          searchStr = "";
          filterSelect(selectElem, searchStr);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          searchStr += e.key.toLowerCase();
          filterSelect(selectElem, searchStr);
          e.preventDefault();
        } else {
          return;
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
          searchStr = "";
        }, 1000);
        if (typeof timer.unref === 'function') {
          timer.unref();
        }
      });

      selectElem.addEventListener('blur', () => {
        searchStr = "";
        filterSelect(selectElem, "");
      });
    }

    function bindFilterInput(inputElem, callback) {
      if (!inputElem) {
        return;
      }
      inputElem.addEventListener("input", callback);
      inputElem.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          inputElem.value = "";
          callback();
        }
      });
      addInputClearButton(inputElem, callback);
    }

    function addInputClearButton(inputElem, callback) {
      const label = (texts[currentLang] && texts[currentLang].clearFilter) || "Clear filter";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "clear-input-btn";
      btn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'clear-icon');
      btn.setAttribute("aria-label", label);
      btn.title = label;
      btn.hidden = true;
      btn.addEventListener("click", () => {
        inputElem.value = "";
        callback();
        inputElem.focus();
      });
      inputElem.insertAdjacentElement("afterend", btn);
      const toggle = () => {
        btn.hidden = !inputElem.value;
      };
      inputElem.addEventListener("input", toggle);
      toggle();
    }

    const deviceLibrarySearchEntries = [];
    const deviceLibrarySearchMap = new Map();
    const deviceLibraryHighlightTimers = new WeakMap();
    const deviceLibrarySearchInput = document.getElementById('deviceLibrarySearch');
    const deviceLibrarySearchStatus = document.getElementById('deviceLibrarySearchStatus');

    function ensureDeviceLibraryEntryContext(entry) {
      if (!entry || !entry.categoryKey) return;
      if (!(activeDeviceManagerLists instanceof Map)) return;
      const categoryEntry = activeDeviceManagerLists.get(entry.categoryKey);
      if (!categoryEntry) return;
      const { list, filterInput } = categoryEntry;
      if (filterInput && filterInput.value) {
        filterInput.value = '';
        if (typeof filterDeviceList === 'function') {
          filterDeviceList(list, '');
        }
      }
    }

    function highlightDeviceLibraryElement(element) {
      if (!element || typeof element.classList?.add !== 'function') return;
      const existing = deviceLibraryHighlightTimers.get(element);
      if (existing) {
        clearTimeout(existing);
      }
      element.classList.add('feature-search-focus');
      const timeout = setTimeout(() => {
        element.classList.remove('feature-search-focus');
        deviceLibraryHighlightTimers.delete(element);
      }, 2500);
      if (typeof timeout.unref === 'function') {
        timeout.unref();
      }
      deviceLibraryHighlightTimers.set(element, timeout);
    }

    function rebuildDeviceLibrarySearchIndex() {
      deviceLibrarySearchEntries.length = 0;
      deviceLibrarySearchMap.clear();
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(({ list, heading }, categoryKey) => {
        if (!list) return;
        const categoryLabel = heading && heading.textContent
          ? heading.textContent.trim()
          : categoryKey;
        Array.from(list.querySelectorAll('li')).forEach(item => {
          const nameEl = item.querySelector('.device-summary span');
          if (!nameEl) return;
          const label = nameEl.textContent ? nameEl.textContent.trim() : '';
          if (!label || label === 'None') return;
          const summary = nameEl.getAttribute('title') || '';
          const key = searchKey(label);
          const focusTarget = nameEl;
          const entry = {
            key,
            label,
            summary,
            categoryKey,
            categoryLabel,
            element: item,
            focusTarget,
            labelLower: label.toLowerCase(),
            summaryLower: summary.toLowerCase(),
            categoryLabelLower: (categoryLabel || '').toLowerCase(),
            tokens: searchTokens(`${label} ${summary} ${categoryLabel}`.trim()),
            primaryTokens: searchTokens(label),
          };
          deviceLibrarySearchEntries.push(entry);
          const existing = deviceLibrarySearchMap.get(key);
          if (!existing) {
            deviceLibrarySearchMap.set(key, entry);
          } else if (Array.isArray(existing)) {
            existing.push(entry);
          } else {
            deviceLibrarySearchMap.set(key, [existing, entry]);
          }
        });
      });
    }

    function applyDeviceLibrarySearchStatus(queryText, visibleCount) {
      if (!deviceLibrarySearchStatus) return;
      const total = deviceLibrarySearchEntries.length;
      const langTexts =
        (texts && texts[currentLang]) ||
        (texts && texts.en) ||
        {};
      const formattedTotal = formatNumberForLang(currentLang, total);
      if (!queryText) {
        const template = langTexts.deviceLibrarySearchStatusDefault || 'Showing all {total} devices.';
        deviceLibrarySearchStatus.textContent = template.replace('{total}', formattedTotal);
        return;
      }
      if (!visibleCount) {
        const template = langTexts.deviceLibrarySearchNoResults || 'No devices match “{query}”.';
        deviceLibrarySearchStatus.textContent = template.replace('{query}', queryText);
        return;
      }
      const template = visibleCount === 1
        ? langTexts.deviceLibrarySearchResultOne || 'Showing {visible} of {total} devices.'
        : langTexts.deviceLibrarySearchResultOther || 'Showing {visible} of {total} devices.';
      const formattedVisible = formatNumberForLang(currentLang, visibleCount);
      deviceLibrarySearchStatus.textContent = template
        .replace('{visible}', formattedVisible)
        .replace('{total}', formattedTotal)
        .replace('{query}', queryText);
    }

    function focusDeviceLibraryEntry(entry, options = {}) {
      if (!entry || !entry.element) return;
      ensureDeviceLibraryEntryContext(entry);
      entry.element.hidden = false;
      const section = entry.element.closest('.device-category');
      if (section) {
        section.classList.remove('device-category--global-empty');
      }
      const target = entry.focusTarget || entry.element;
      if (typeof target.scrollIntoView === 'function') {
        try {
          target.scrollIntoView({ behavior: options.behavior || 'smooth', block: 'center' });
        } catch {
          target.scrollIntoView();
        }
      }
      highlightDeviceLibraryElement(target);
    }

    function focusDeviceLibraryMatch(query) {
      if (!query) return;
      if (!deviceLibrarySearchEntries.length) {
        rebuildDeviceLibrarySearchIndex();
      }
      const key = searchKey(query);
      const tokens = searchTokens(query);
      const match = findBestSearchMatch(deviceLibrarySearchMap, key, tokens);
      const entry = match && match.value;
      if (entry) {
        focusDeviceLibraryEntry(entry);
      }
    }

    function applyDeviceLibrarySearchFilter(options = {}) {
      if (!deviceLibrarySearchInput) return;
      if (!deviceLibrarySearchEntries.length) {
        rebuildDeviceLibrarySearchIndex();
      }
      const query = deviceLibrarySearchInput.value ? deviceLibrarySearchInput.value.trim() : '';
      const normalized = query.toLowerCase();
      let visibleCount = 0;
      deviceLibrarySearchEntries.forEach(entry => {
        const matches =
          !normalized ||
          entry.labelLower.includes(normalized) ||
          entry.categoryLabelLower.includes(normalized) ||
          (entry.summaryLower && entry.summaryLower.includes(normalized));
        entry.element.hidden = normalized && !matches;
        if (matches) {
          visibleCount += 1;
        }
      });
      if (activeDeviceManagerLists instanceof Map) {
        activeDeviceManagerLists.forEach(({ section }) => {
          if (!section) return;
          if (!normalized) {
            section.classList.remove('device-category--global-empty');
            return;
          }
          const hasVisible = Array.from(section.querySelectorAll('li')).some(li => !li.hidden && li.style.display !== 'none');
          section.classList.toggle('device-category--global-empty', !hasVisible);
        });
      }
      applyDeviceLibrarySearchStatus(query, visibleCount);
      if (options.scrollToMatch && query) {
        focusDeviceLibraryMatch(query);
      }
    }

    function updateDeviceLibrarySearchLocalization() {
      applyDeviceLibrarySearchFilter({ scrollToMatch: false });
    }

    if (deviceLibrarySearchInput) {
      bindFilterInput(deviceLibrarySearchInput, () => applyDeviceLibrarySearchFilter({ scrollToMatch: false }));
      deviceLibrarySearchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const value = deviceLibrarySearchInput.value ? deviceLibrarySearchInput.value.trim() : '';
          if (value) {
            focusDeviceLibraryMatch(value);
          }
        }
      });
      deviceLibrarySearchInput.addEventListener('search', () => {
        applyDeviceLibrarySearchFilter({ scrollToMatch: false });
        const value = deviceLibrarySearchInput.value ? deviceLibrarySearchInput.value.trim() : '';
        if (value) {
          focusDeviceLibraryMatch(value);
        }
      });
    }

    const filterHelperScope =
      (typeof globalThis !== 'undefined' && globalThis)
      || (typeof window !== 'undefined' && window)
      || (typeof self !== 'undefined' && self)
      || (typeof global !== 'undefined' && global)
      || null;

    if (filterHelperScope) {
      if (typeof filterHelperScope.filterSelect !== 'function') {
        filterHelperScope.filterSelect = filterSelect;
      }
      if (typeof filterHelperScope.filterDeviceList !== 'function') {
        filterHelperScope.filterDeviceList = filterDeviceList;
      }
      if (typeof filterHelperScope.attachSelectSearch !== 'function') {
        filterHelperScope.attachSelectSearch = attachSelectSearch;
      }
      if (typeof filterHelperScope.bindFilterInput !== 'function') {
        filterHelperScope.bindFilterInput = bindFilterInput;
      }
      if (typeof filterHelperScope.addInputClearButton !== 'function') {
        filterHelperScope.addInputClearButton = addInputClearButton;
      }
      if (typeof filterHelperScope.applyDeviceLibrarySearchFilter !== 'function') {
        filterHelperScope.applyDeviceLibrarySearchFilter = options =>
          applyDeviceLibrarySearchFilter(options || {});
      }
      if (typeof filterHelperScope.updateDeviceLibrarySearchLocalization !== 'function') {
        filterHelperScope.updateDeviceLibrarySearchLocalization = () =>
          updateDeviceLibrarySearchLocalization();
      }
    }

    function applyFilters() {
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(({ list, filterInput }) => {
        if (!list) return;
        const value = filterInput ? filterInput.value : '';
        filterDeviceList(list, value);
      });
      applyDeviceLibrarySearchFilter({ scrollToMatch: false });
    }

    if (filterHelperScope && typeof filterHelperScope.applyFilters !== 'function') {
      filterHelperScope.applyFilters = applyFilters;
    }

    // Initialize device selection dropdowns
    populateSelect(cameraSelect, devices.cameras || {}, true);
    populateMonitorSelect();
    populateSelect(videoSelect, devices.video || {}, true);
    updateCageSelectOptions();
    if (Array.isArray(motorSelects)) {
      motorSelects.forEach(sel => populateSelect(sel, (devices.fiz && devices.fiz.motors) || {}, true));
    }
    if (Array.isArray(controllerSelects)) {
      controllerSelects.forEach(sel => populateSelect(sel, (devices.fiz && devices.fiz.controllers) || {}, true));
    }
    populateSelect(distanceSelect, (devices.fiz && devices.fiz.distance) || {}, true);
    populateSelect(batterySelect, devices.batteries || {}, true);
    populateSelect(hotswapSelect, devices.batteryHotswaps || {}, true);
    updateBatteryPlateVisibility();
    updateBatteryOptions();

    // Enable search inside dropdowns
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect]
      .forEach(sel => attachSelectSearch(sel));
    if (Array.isArray(motorSelects)) {
      motorSelects.forEach(sel => attachSelectSearch(sel));
    }
    if (Array.isArray(controllerSelects)) {
      controllerSelects.forEach(sel => attachSelectSearch(sel));
    }

    if (cameraSelect) {
      cameraSelect.addEventListener('change', () => {
        updateRecordingMediaOptions();
        if (typeof window.updateStorageRequirementTypeOptions === 'function') {
          window.updateStorageRequirementTypeOptions();
        }
        if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
          try {
            document.dispatchEvent(new CustomEvent('camera-selection-changed'));
          } catch (error) {
            void error;
          }
        }
      });
    }
    applyFilters();
    setVideoOutputs([]);
    setMonitorVideoInputs([]);
    setMonitorVideoOutputs([]);

    ensureGlobalFunctionBinding('clearMonitorVideoInputs', clearMonitorVideoInputs);
    ensureGlobalFunctionBinding('ensureDefaultProjectInfoSnapshot', ensureDefaultProjectInfoSnapshot);

    setViewfinderVideoInputs([]);
    setViewfinderVideoOutputs([]);
    setFizConnectors([]);
    updateFizConnectorOptions();
    updateMotorConnectorOptions();
    updateControllerConnectorOptions();
    updateControllerPowerOptions();
    updateControllerBatteryOptions();
    updateControllerConnectivityOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();
    setViewfinders([]);
    setBatteryPlatesLocal([]);
    setRecordingMediaLocal([]);
    updateRecordingMediaOptions();
    updatePlateTypeOptions();
    setLensMounts([]);
    updateMountTypeOptions();
    updatePowerPortOptions();
    setPowerDistribution([]);
    updatePowerDistTypeOptions();
    updatePowerDistVoltageOptions();
    updatePowerDistCurrentOptions();
    setTimecodes([]);
    updateTimecodeTypeOptions();
    updateDistanceConnectionOptions();
    updateDistanceMethodOptions();
    updateDistanceDisplayOptions();

    // Set default selections for dropdowns

    // Kamera: Wenn Option „None“ existiert, dann setze sie – sonst erste Option
    const noneCameraOption = Array.from(cameraSelect.options).find(opt => opt.value === "None");
    if (noneCameraOption) {
      cameraSelect.value = "None";
    } else {
      cameraSelect.selectedIndex = 0;
    }

    // Für die anderen Dropdowns
    [monitorSelect, videoSelect, distanceSelect, batterySelect].forEach(sel => {
      const noneOption = Array.from(sel.options).find(opt => opt.value === "None");
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });

    // FIZ Dropdowns
    if (Array.isArray(motorSelects)) {
      motorSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    }
    if (Array.isArray(controllerSelects)) {
      controllerSelects.forEach(sel => { if (sel.options.length) sel.value = "None"; });
    }

    // Calculation function delegates to cineResults module for power and runtime processing
    function updateCalculations() {
      const cineResultsModule = typeof cineResults === 'object' ? cineResults : null;
      const runModuleUpdate =
        cineResultsModule && typeof cineResultsModule.updateCalculations === 'function'
          ? cineResultsModule.updateCalculations
          : null;
      if (!runModuleUpdate) {
        console.warn('cineResults.updateCalculations not available');
        return;
      }
      try {
        runModuleUpdate({
          document: typeof document !== 'undefined' ? document : null,
          elements: {
            cameraSelect,
            monitorSelect,
            videoSelect,
            distanceSelect,
            batterySelect,
            hotswapSelect,
            totalPowerElem: typeof totalPowerElem !== 'undefined' ? totalPowerElem : null,
            breakdownListElem: typeof breakdownListElem !== 'undefined' ? breakdownListElem : null,
            totalCurrent144Elem: typeof totalCurrent144Elem !== 'undefined' ? totalCurrent144Elem : null,
            totalCurrent12Elem: typeof totalCurrent12Elem !== 'undefined' ? totalCurrent12Elem : null,
            batteryLifeElem: typeof batteryLifeElem !== 'undefined' ? batteryLifeElem : null,
            batteryCountElem: typeof batteryCountElem !== 'undefined' ? batteryCountElem : null,
            batteryLifeLabelElem:
              typeof batteryLifeLabelElem !== 'undefined' ? batteryLifeLabelElem : null,
            runtimeAverageNoteElem:
              typeof runtimeAverageNoteElem !== 'undefined' ? runtimeAverageNoteElem : null,
            pinWarnElem: typeof pinWarnElem !== 'undefined' ? pinWarnElem : null,
            dtapWarnElem: typeof dtapWarnElem !== 'undefined' ? dtapWarnElem : null,
            hotswapWarnElem: typeof hotswapWarnElem !== 'undefined' ? hotswapWarnElem : null,
            batteryComparisonSection:
              typeof batteryComparisonSection !== 'undefined' ? batteryComparisonSection : null,
            batteryTableElem: typeof batteryTableElem !== 'undefined' ? batteryTableElem : null,
            setupDiagramContainer:
              typeof setupDiagramContainer !== 'undefined' ? setupDiagramContainer : null,
            connectionDiagram:
              typeof connectionDiagram !== 'undefined' ? connectionDiagram : null
          },
          state: {
            appState: typeof appState !== 'undefined' ? appState : {},
            currentSetup: getCurrentSetupState()
          },
          motorSelects,
          controllerSelects,
          getDevices: () => devices,
          getTexts: () => texts,
          getCurrentLang: () => currentLang,
          getCollator: () => (typeof collator !== 'undefined' ? collator : null),
          getSelectedPlate: typeof getSelectedPlate === 'function' ? getSelectedPlate : null,
          getMountVoltageConfig:
            typeof getMountVoltageConfig === 'function' ? getMountVoltageConfig : null,
          refreshTotalCurrentLabels:
            typeof refreshTotalCurrentLabels === 'function' ? refreshTotalCurrentLabels : null,
          updateBatteryOptions:
            typeof updateBatteryOptions === 'function' ? updateBatteryOptions : null,
          setStatusMessage: typeof setStatusMessage === 'function' ? setStatusMessage : null,
          setStatusLevel: typeof setStatusLevel === 'function' ? setStatusLevel : null,
          closePowerWarningDialog:
            typeof closePowerWarningDialog === 'function' ? closePowerWarningDialog : null,
          showPowerWarningDialog:
            typeof showPowerWarningDialog === 'function' ? showPowerWarningDialog : null,
          drawPowerDiagram: typeof drawPowerDiagram === 'function' ? drawPowerDiagram : null,
          renderFeedbackTable: typeof renderFeedbackTable === 'function' ? renderFeedbackTable : null,
          getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
          renderTemperatureNote:
            typeof renderTemperatureNote === 'function' ? renderTemperatureNote : null,
          checkFizCompatibility:
            typeof checkFizCompatibility === 'function' ? checkFizCompatibility : null,
          checkFizController:
            typeof checkFizController === 'function' ? checkFizController : null,
          checkArriCompatibility:
            typeof checkArriCompatibility === 'function' ? checkArriCompatibility : null,
          renderSetupDiagram: typeof renderSetupDiagram === 'function' ? renderSetupDiagram : null,
          refreshGearListIfVisible:
            typeof refreshGearListIfVisible === 'function' ? refreshGearListIfVisible : null,
          supportsBMountCamera:
            typeof supportsBMountCamera === 'function' ? supportsBMountCamera : null,
          supportsGoldMountCamera:
            typeof supportsGoldMountCamera === 'function' ? supportsGoldMountCamera : null,
          getCssVariableValue:
            typeof getCssVariableValue === 'function' ? getCssVariableValue : null,
          escapeHtml: typeof escapeHtml === 'function' ? escapeHtml : null,
          getLastRuntimeHours: () => lastRuntimeHours,
          setLastRuntimeHours: (value) => {
            lastRuntimeHours = value;
          },
        });
      } catch (error) {
        console.warn('cineResults.updateCalculations failed', error);
      }
    }

    if (typeof window !== 'undefined') {
      window.updateCalculations = updateCalculations;
    } else if (typeof globalThis !== 'undefined') {
      globalThis.updateCalculations = updateCalculations;
    }

    function getCurrentSetupKey() {
      const safeSelectValue = (select) => (
        select && typeof select.value === 'string'
          ? select.value
          : ''
      );

      const safeListValues = (list) => (
        Array.isArray(list)
          ? list
            .map(sel => safeSelectValue(sel))
            .filter(value => value && value !== 'None')
            .sort()
            .join(',')
          : ''
      );

      const camera = safeSelectValue(cameraSelect);
      const monitor = safeSelectValue(monitorSelect);
      const video = safeSelectValue(videoSelect);
      const cage = safeSelectValue(cageSelect);
      const motors = safeListValues(motorSelects);
      const controllers = safeListValues(controllerSelects);
      const distance = safeSelectValue(distanceSelect);
      const battery = safeSelectValue(batterySelect);
      const hotswap = safeSelectValue(hotswapSelect);
      const plate = typeof getSelectedPlate === 'function' ? (getSelectedPlate() || '') : '';

      return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
    }

    function deleteFeedbackEntry(key, index) {
      const feedbackData = loadFeedbackSafe();
      if (feedbackData[key]) {
        feedbackData[key].splice(index, 1);
        if (!feedbackData[key].length) {
          delete feedbackData[key];
        }
        saveFeedbackSafe(feedbackData);
        updateCalculations();
      }
    }

    function renderFeedbackTable(currentKey) {
      const container = document.getElementById('feedbackTableContainer');
      const table = document.getElementById('userFeedbackTable');
      const feedbackData = loadFeedbackSafe();
      // Filter out any stored location information to keep the table column hidden
      const entries = (feedbackData[currentKey] || []).map(entry => {
        const rest = { ...entry };
        delete rest.location;
        return rest;
      });

      if (!entries.length) {
        if (table) {
          table.innerHTML = '';
          table.classList.add('hidden');
        }
        if (container) container.classList.add('hidden');
        return null;
      }

      const columns = [
        { key: 'username', label: 'User' },
        { key: 'date', label: 'Date' },
        { key: 'cameraWifi', label: 'WIFI' },
        { key: 'resolution', label: 'Res' },
        { key: 'codec', label: 'Codec' },
        { key: 'framerate', label: 'FPS' },
        { key: 'firmware', label: 'Firmware' },
        { key: 'batteryAge', label: 'Battery Age (in years)' },
        { key: 'monitorBrightness', label: 'Monitor Brightness' },
        { key: 'temperature', label: 'temp' },
        { key: 'charging', label: 'Charging' },
        { key: 'runtime', label: 'runtime' },
        { key: 'batteriesPerDay', label: 'batteries a day' },
        { key: 'weighting', label: 'weight' }
      ];

      // Helper functions for weighting factors
      const parseResolution = str => {
        if (!str) return null;
        const s = String(str).toLowerCase();
        const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
        if (kMatch) return parseFloat(kMatch[1]) * 1000;
        const pMatch = s.match(/(\d{3,4})p/);
        if (pMatch) return parseInt(pMatch[1], 10);
        const xMatch = s.match(/x\s*(\d{3,4})/);
        if (xMatch) return parseInt(xMatch[1], 10);
        const numMatch = s.match(/(\d{3,4})/);
        return numMatch ? parseInt(numMatch[1], 10) : null;
      };
      const parseFramerate = str => {
        if (!str) return null;
        const m = String(str).match(/\d+(?:\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
      };
      const tempFactor = temp => {
        if (Number.isNaN(temp)) return 1;
        if (temp >= 25) return 1;
        if (temp >= 0) return 1 + (25 - temp) * 0.01;
        if (temp >= -10) return 1.25 + (-temp) * 0.035;
        if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
        return 2;
      };

      const resolutionWeight = res => {
        if (res >= 12000) return 3;
        if (res >= 8000) return 2;
        if (res >= 4000) return 1.5;
        if (res >= 1080) return 1;
        return res / 1080;
      };

      const codecWeight = codec => {
        if (!codec) return 1;
        const c = String(codec).toLowerCase();
        if (
          /(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)
        )
          return 1;
        if (/prores/.test(c)) return 1.1;
        if (/dnx|avid/.test(c)) return 1.2;
        if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
        if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
        if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
        return 1;
      };

      const camPower = devices?.cameras?.[cameraSelect?.value]?.powerDrawWatts || 0;
      const monitorPower = devices?.monitors?.[monitorSelect?.value]?.powerDrawWatts || 0;
      const videoPower = devices?.video?.[videoSelect?.value]?.powerDrawWatts || 0;
      const motorPower = motorSelects.reduce(
        (sum, sel) => sum + (devices?.fiz?.motors?.[sel.value]?.powerDrawWatts || 0),
        0
      );
      const controllerPower = controllerSelects.reduce(
        (sum, sel) => sum + (devices?.fiz?.controllers?.[sel.value]?.powerDrawWatts || 0),
        0
      );
      const distancePower = devices?.fiz?.distance?.[distanceSelect?.value]?.powerDrawWatts || 0;
      const otherPower = videoPower + motorPower + controllerPower + distancePower;
      const totalPower = camPower + monitorPower + otherPower;
      const specBrightness = devices?.monitors?.[monitorSelect?.value]?.brightnessNits;

      let weightedSum = 0;
      let weightTotal = 0;
      let count = 0;
      const breakdown = entries.map(e => {
        const rt = parseFloat(e.runtime);
        if (Number.isNaN(rt)) return null;

        let camFactor = 1;
        let monitorFactor = 1;

        const res = parseResolution(e.resolution);
        if (res) camFactor *= resolutionWeight(res);

        const fps = parseFramerate(e.framerate);
        if (fps) camFactor *= fps / 24;

        const wifi = (e.cameraWifi || '').toLowerCase();
        if (wifi.includes('on')) camFactor *= 1.1;

        const codec = e.codec;
        if (codec) camFactor *= codecWeight(codec);

        const entryBrightness = parseFloat(e.monitorBrightness);
        if (!Number.isNaN(entryBrightness) && specBrightness) {
          const ratio = entryBrightness / specBrightness;
          if (ratio < 1) monitorFactor *= ratio;
        }

        let weight = 1;
        if (totalPower > 0) {
          weight =
            (camFactor * camPower + monitorFactor * monitorPower + otherPower) /
            totalPower;
        }

        const temp = parseFloat(e.temperature);
        const tempMul = tempFactor(temp);
        const adjustedRuntime = rt * tempMul;

        weightedSum += adjustedRuntime * weight;
        weightTotal += weight;
        count++;

        return {
          temperature: tempMul,
          resolution: res ? resolutionWeight(res) : 1,
          framerate: fps ? fps / 24 : 1,
          wifi: wifi.includes('on') ? 1.1 : 1,
          codec: codec ? codecWeight(codec) : 1,
          monitor: monitorFactor,
          weight
        };
      });

      const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);
      let html = '<tr>' + columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('') + '<th></th></tr>';
      const deleteFeedbackLabel =
        texts[currentLang]?.deleteSetupBtn ||
        texts.en?.deleteSetupBtn ||
        'Delete';
      entries.forEach((entry, index) => {
        html += '<tr>';
        columns.forEach(c => {
          if (c.key === 'weighting') {
            const b = breakdown[index];
            if (b) {
              const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
              const share = b.weight * 100;
              const tooltip =
                `Temp ×${b.temperature.toFixed(2)}\n` +
                `Res ×${b.resolution.toFixed(2)}\n` +
                `FPS ×${b.framerate.toFixed(2)}\n` +
                `Codec ×${b.codec.toFixed(2)}\n` +
                `Wi-Fi ×${b.wifi.toFixed(2)}\n` +
                `Monitor ×${b.monitor.toFixed(2)}\n` +
                `Share ${share.toFixed(1)}%`;
              html +=
                `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${escapeHtml(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
            } else {
              html += '<td></td>';
            }
          } else if (c.key === 'date') {
            html += `<td>${escapeHtml(formatDateString(entry[c.key]))}</td>`;
          } else {
            html += `<td>${escapeHtml(entry[c.key] || '')}</td>`;
          }
        });
        html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">${iconMarkup(ICON_GLYPHS.trash, 'btn-icon')}${escapeHtml(deleteFeedbackLabel)}</button></td>`;
        html += '</tr>';
      });
      table.innerHTML = html;
      table.classList.remove('hidden');
      if (container) container.classList.remove('hidden');
      table.querySelectorAll('.deleteFeedbackBtn').forEach(btn => {
        btn.setAttribute('aria-label', deleteFeedbackLabel);
        btn.setAttribute('title', deleteFeedbackLabel);
        btn.addEventListener('click', () => {
          const key = decodeURIComponent(btn.dataset.key);
          const idx = parseInt(btn.dataset.index, 10);
          deleteFeedbackEntry(key, idx);
        });
      });

      if (count >= 3 && weightTotal > 0) {
        return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
      }
      return null;
    }

    // Normalize device data for comparison so that key ordering and undefined
    // values do not cause false positives when determining whether a device
    // differs from the default database.
    function normalizeDeviceValueForComparison(value) {
      if (Array.isArray(value)) {
        return value.map(item => normalizeDeviceValueForComparison(item));
      }
      if (isPlainObjectValue(value)) {
        const normalized = {};
        Object.keys(value)
          .filter(key => value[key] !== undefined)
          .sort()
          .forEach(key => {
            normalized[key] = normalizeDeviceValueForComparison(value[key]);
          });
        return normalized;
      }
      if (value === undefined) {
        return null;
      }
      return value;
    }

    function deviceEntriesEqual(a, b) {
      if (a === b) return true;
      if ((a === null || a === undefined) && (b === null || b === undefined)) {
        return true;
      }
      if (a === null || a === undefined || b === null || b === undefined) {
        return false;
      }
      const normalizedA = normalizeDeviceValueForComparison(a);
      const normalizedB = normalizeDeviceValueForComparison(b);
      return JSON.stringify(normalizedA) === JSON.stringify(normalizedB);
    }

    // Determine differences between the default device database and the current
    // in-memory `devices` object. Only changed, added or removed entries are
    // returned so they can be shared in a generated link.
    function getDeviceChanges() {
      if (!window.defaultDevices) return {};
      const diff = {};
      const record = (cat, name, val, sub) => {
        if (sub) {
          diff.fiz = diff.fiz || {};
          diff.fiz[sub] = diff.fiz[sub] || {};
          diff.fiz[sub][name] = val;
        } else {
          diff[cat] = diff[cat] || {};
          diff[cat][name] = val;
        }
      };
      const compare = (cat, defCat, curCat, sub) => {
        Object.keys(curCat).forEach(name => {
          const cur = curCat[name];
          const def = defCat[name];
          if (!def || !deviceEntriesEqual(cur, def)) {
            record(cat, name, cur, sub);
          }
        });
        Object.keys(defCat).forEach(name => {
          if (!curCat[name]) record(cat, name, null, sub);
        });
      };
      compare('cameras', window.defaultDevices.cameras || {}, devices.cameras || {});
      compare('viewfinders', window.defaultDevices.viewfinders || {}, devices.viewfinders || {});
      compare('monitors', window.defaultDevices.monitors || {}, devices.monitors || {});
      compare('video', window.defaultDevices.video || {}, devices.video || {});
      compare('batteries', window.defaultDevices.batteries || {}, devices.batteries || {});
      compare('batteryHotswaps', window.defaultDevices.batteryHotswaps || {}, devices.batteryHotswaps || {});
      ['motors', 'controllers', 'distance'].forEach(sub => {
        const defCat = window.defaultDevices.fiz ? (window.defaultDevices.fiz[sub] || {}) : {};
        const curCat = devices.fiz ? (devices.fiz[sub] || {}) : {};
        compare('fiz', defCat, curCat, sub);
        if (diff.fiz && diff.fiz[sub] && !Object.keys(diff.fiz[sub]).length) {
          delete diff.fiz[sub];
        }
      });
      if (diff.fiz && !Object.keys(diff.fiz).length) delete diff.fiz;
      Object.keys(diff).forEach(cat => {
        if (cat !== 'fiz' && !Object.keys(diff[cat]).length) delete diff[cat];
      });
      return diff;
    }

    // Apply a set of device changes to the current in-memory database and update
    // all related UI elements and localStorage. `changes` mirrors the structure
    // returned by getDeviceChanges().
    function applyDeviceChanges(changes) {
      if (!changes || typeof changes !== 'object') return;

      const applyToCategory = (target, delta) => {
        Object.keys(delta).forEach(name => {
          const val = delta[name];
          if (val === null) {
            delete target[name];
          } else {
            target[name] = val;
          }
        });
      };

      Object.keys(changes).forEach(cat => {
        if (cat === 'fiz') {
          Object.keys(changes.fiz || {}).forEach(sub => {
            devices.fiz[sub] = devices.fiz[sub] || {};
            applyToCategory(devices.fiz[sub], changes.fiz[sub]);
          });
        } else {
          devices[cat] = devices[cat] || {};
          applyToCategory(devices[cat], changes[cat]);
        }
      });

      unifyDevices(devices, { force: true });
      storeDevices(devices);
      refreshDeviceLists();
      updateMountTypeOptions();

      // Re-populate dropdowns to include any newly added devices
      populateSelect(cameraSelect, devices.cameras || {}, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video || {}, true);
      updateCageSelectOptions();
      if (Array.isArray(motorSelects)) {
        motorSelects.forEach(sel => populateSelect(sel, (devices.fiz && devices.fiz.motors) || {}, true));
      }
      if (Array.isArray(controllerSelects)) {
        controllerSelects.forEach(sel => populateSelect(sel, (devices.fiz && devices.fiz.controllers) || {}, true));
      }
      populateSelect(distanceSelect, (devices.fiz && devices.fiz.distance) || {}, true);
      populateSelect(batterySelect, devices.batteries, true);

      updateFizConnectorOptions();
      updateMotorConnectorOptions();
      updateControllerConnectorOptions();
      updateControllerPowerOptions();
      updateControllerBatteryOptions();
      updateControllerConnectivityOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
    }

    function formatValue(value) {
      if (Array.isArray(value)) {
        return value.map((v) => formatValue(v)).join('; ');
      }
      if (value && typeof value === 'object') {
        const parts = [];
        for (const k in value) {
          if (value[k] === '' || value[k] === null || value[k] === undefined) continue;
          parts.push(`${coreHumanizeKey(k)}: ${formatValue(value[k])}`);
        }
        return `{ ${parts.join(', ')} }`;
      }
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';
      return String(value);
    }

    function createDeviceDetailsList(deviceData) {
      const list = document.createElement('ul');
      list.className = 'device-detail-list';

      const appendItem = (key, value, parent) => {
        if (value === '' || value === null || value === undefined) return;
        const li = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = coreHumanizeKey(key) + ':';
        li.appendChild(label);

        if (Array.isArray(value)) {
          if (value.length && typeof value[0] === 'object') {
            const subList = document.createElement('ul');
            subList.className = 'device-detail-list';
            value.forEach((v) => {
              const subLi = document.createElement('li');
              subLi.appendChild(createDeviceDetailsList(v));
              subList.appendChild(subLi);
            });
            li.appendChild(subList);
          } else {
            li.appendChild(document.createTextNode(value.map((v) => formatValue(v)).join(', ')));
          }
        } else if (value && typeof value === 'object') {
          li.appendChild(createDeviceDetailsList(value));
        } else {
          li.appendChild(document.createTextNode(formatValue(value)));
        }

        parent.appendChild(li);
      };

      if (typeof deviceData !== 'object') {
        appendItem('powerDrawWatts', deviceData, list);
      } else {
        Object.keys(deviceData).forEach((k) => appendItem(k, deviceData[k], list));
      }

      return list;
    }
    function formatDateString(val) {
      if (!val) return '';
      const d = new Date(val);
      if (Number.isNaN(d.getTime())) return String(val);
      return d.toISOString().split('T')[0];
    }

    // Helper to render existing devices in the manager section
    function renderDeviceList(categoryKey, ulElement) {
      ulElement.innerHTML = "";
      let categoryDevices = devices[categoryKey];
      const globalTexts =
        (typeof texts === "object" && texts) ||
        (typeof window !== "undefined" && typeof window.texts === "object" && window.texts) ||
        {};
      const fallbackLangTexts =
        (typeof globalTexts.en === "object" && globalTexts.en) ||
        {};
      const activeLangTexts =
        (currentLang && typeof globalTexts[currentLang] === "object" && globalTexts[currentLang]) ||
        fallbackLangTexts;
      const resolveText = (key, fallback) => {
        if (activeLangTexts && typeof activeLangTexts[key] !== "undefined") {
          return activeLangTexts[key];
        }
        if (fallbackLangTexts && typeof fallbackLangTexts[key] !== "undefined") {
          return fallbackLangTexts[key];
        }
        return fallback || "";
      };

      // Handle nested FIZ categories
      if (categoryKey.includes('.')) {
        const [mainCat, subCat] = categoryKey.split('.');
        categoryDevices = devices[mainCat] && devices[mainCat][subCat];
      }
      if (!categoryDevices) return;

      const buildItem = (name, deviceData, subcategory) => {
        if (name === "None") return;
        const li = document.createElement("li");
        const header = document.createElement("div");
        header.className = "device-summary";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        let summary = generateSafeConnectorSummary(deviceData);
        if (summary) {
          // Remove all HTML tags by repeatedly applying the regex until nothing matches
          let previous;
          do {
            previous = summary;
            summary = summary.replace(/<[^>]+>/g, '');
          } while (summary !== previous);
          summary = summary.replace(/\s+/g, ' ').trim();
        } else {
          summary = '';
        }
        if (deviceData.notes) {
          summary = summary ? `${summary}; Notes: ${deviceData.notes}` : deviceData.notes;
        }
        if (summary) {
          nameSpan.setAttribute('title', summary);
          nameSpan.setAttribute('data-help', summary);
        }
        header.appendChild(nameSpan);

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "detail-toggle";
        toggleBtn.type = "button";
        toggleBtn.setAttribute("aria-expanded", "false");
        const showDetailsText = resolveText("showDetails", "Show Details");
        toggleBtn.textContent = showDetailsText;
        toggleBtn.setAttribute('data-help', showDetailsText);
        toggleBtn.dataset.name = name;
        toggleBtn.dataset.category = categoryKey;
        if (subcategory) toggleBtn.dataset.subcategory = subcategory;
        header.appendChild(toggleBtn);

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.dataset.name = name;
        editBtn.dataset.category = categoryKey;
        if (subcategory) editBtn.dataset.subcategory = subcategory;
        const editLabel = resolveText("editBtn", "Edit");
        const editHelp = resolveText("editBtnHelp", editLabel);
        editBtn.textContent = editLabel;
        editBtn.setAttribute('data-help', editHelp || editLabel);
        header.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.dataset.name = name;
        deleteBtn.dataset.category = categoryKey;
        if (subcategory) deleteBtn.dataset.subcategory = subcategory;
        const deleteLabel = resolveText("deleteDeviceBtn", "Delete");
        const deleteHelp = resolveText("deleteDeviceBtnHelp", deleteLabel);
        deleteBtn.textContent = deleteLabel;
        deleteBtn.setAttribute('data-help', deleteHelp || deleteLabel);
        header.appendChild(deleteBtn);

        li.appendChild(header);

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "device-details";
        detailsDiv.style.display = "none";
        detailsDiv.appendChild(createDeviceDetailsList(deviceData));
        li.appendChild(detailsDiv);

        ulElement.appendChild(li);
      };

      if (categoryKey === "accessories.cables" && categoryDevices && typeof categoryDevices === 'object') {
        Object.keys(categoryDevices)
          .sort(localeSort)
          .forEach(subcat => {
            const devs = categoryDevices[subcat] || {};
            Object.keys(devs)
              .filter(name => name !== 'None')
              .sort(localeSort)
              .forEach(name => {
                buildItem(name, devs[name], subcat);
              });
          });
      } else if (categoryDevices && typeof categoryDevices === 'object') {
        Object.keys(categoryDevices)
          .filter(name => name !== 'None')
          .sort(localeSort)
          .forEach(name => {
            buildItem(name, categoryDevices[name]);
          });
      }
    }

    function refreshDeviceLists() {
      syncDeviceManagerCategories();
      if (!(activeDeviceManagerLists instanceof Map)) return;
      activeDeviceManagerLists.forEach(({ list, filterInput }, categoryKey) => {
        if (!list) return;
        renderDeviceList(categoryKey, list);
        const filterValue = filterInput ? filterInput.value : '';
        filterDeviceList(list, filterValue);
      });
      rebuildDeviceLibrarySearchIndex();
      applyDeviceLibrarySearchFilter({ scrollToMatch: false });
      // Ensure the global feature search dataset is rebuilt with the latest
      // device-library entries so the top bar can find newly added gear.
      try {
        populateFeatureSearch();
      } catch (featureSearchError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to refresh feature search after device list update.', featureSearchError);
        }
      }
    }

    const CORE_PART2_GLOBAL_EXPORTS = {
      populateSelect,
      populateMonitorSelect,
      refreshDeviceLists,
      hasAnyDeviceSelection,
      refreshAutoGearCameraOptions,
      refreshAutoGearCameraWeightCondition,
      refreshAutoGearMonitorOptions,
      refreshAutoGearTripodHeadOptions,
      refreshAutoGearTripodBowlOptions,
      refreshAutoGearTripodTypesOptions,
      refreshAutoGearTripodSpreaderOptions,
      refreshAutoGearWirelessOptions,
      refreshAutoGearMotorsOptions,
      refreshAutoGearControllersOptions,
      refreshAutoGearCrewOptions,
      refreshAutoGearDistanceOptions,
      exportAutoGearRules,
      exportAutoGearPresets,
      updateAutoGearCameraWeightDraft,
      updateAutoGearShootingDaysDraft,
      checkSetupChanged,
      updateCalculations,
      feedbackCancelBtn,
      alignActiveAutoGearPreset,
      closeAutoGearEditor,
      reconcileAutoGearAutoPresetState,
      renderAutoGearBackupControls,
      renderAutoGearBackupRetentionControls,
      renderAutoGearDraftImpact,
      renderAutoGearDraftLists,
      renderAutoGearMonitorDefaultsControls,
      renderAutoGearPresetsControls,
      renderAutoGearRulesList,
      openAutoGearEditor,
      setAutoGearRuleEnabled,
      overviewSectionIcons,
      saveAutoGearRuleFromEditor,
      handleAutoGearImportSelection,
      handleAutoGearPresetSelection,
      handleAutoGearSavePreset,
      handleAutoGearDeletePreset,
      applyAutoGearBackupVisibility,
      setAutoGearBackupsVisible,
      setAutoGearAutoPresetId,
      syncAutoGearAutoPreset,
      updateAutoGearCatalogOptions,
      updateAutoGearItemButtonState,
      updateAutoGearMonitorDefaultOptions,
      applyFavoritesToSelect,
      updateFavoriteButton,
      toggleFavorite,
      accentColor,
      loadStoredLogoPreview,
      renderSettingsLogoPreview,
      normalizeSpellingVariants,
      prevAccentColor,
      revertAccentColor,
      DEFAULT_ACCENT_COLOR,
      HIGH_CONTRAST_ACCENT_COLOR,
      applyAccentColor,
      clearAccentColorOverrides,
      updateAccentColorResetButtonState,
      restoringSession,
      currentProjectInfo,
      deriveProjectInfo,
      projectForm,
      filterSelectElem,
      filterDetailsStorage,
      loadFeedbackSafe,
      saveFeedbackSafe,
      ensureDefaultProjectInfoSnapshot,
      skipNextGearListRefresh,
      refreshDarkModeAccentBoost,
      isHighContrastActive,
      feedbackUseLocationBtn,
      getSliderBowlValue,
      getEasyrigValue,
      setEasyrigValue,
      fontSize,
      fontFamily,
      normalizeSearchValue,
      clearRecordingMedia,
      setSliderBowlValue,
    };


    const ADDITIONAL_GLOBAL_EXPORT_ENTRIES = [
      ['setBatteryPlates', () => setBatteryPlatesLocal],
      ['getBatteryPlates', () => getBatteryPlates],
      ['setRecordingMedia', () => setRecordingMediaLocal],
      ['getRecordingMedia', () => getRecordingMedia],
      ['applyDarkMode', () => applyDarkMode],
      ['applyPinkMode', () => applyPinkMode],
      ['applyHighContrast', () => applyHighContrast],
      ['setupInstallBanner', () => setupInstallBanner],
      ['generatePrintableOverview', () => generatePrintableOverview],
      ['generateGearListHtml', () => generateGearListHtml],
      ['displayGearAndRequirements', () => displayGearAndRequirements],
      ['updateGearListButtonVisibility', () => updateGearListButtonVisibility],
      ['ensureZoomRemoteSetup', () => ensureZoomRemoteSetup],
      ['encodeSharedSetup', () => encodeSharedSetup],
      ['decodeSharedSetup', () => decodeSharedSetup],
      ['applySharedSetupFromUrl', () => applySharedSetupFromUrl],
      ['applySharedSetup', () => applySharedSetup],
      ['updateBatteryPlateVisibility', () => updateBatteryPlateVisibility],
      ['updateBatteryOptions', () => updateBatteryOptions],
      ['updatePlateTypeOptions', () => updatePlateTypeOptions],
      ['updatePowerPortOptions', () => updatePowerPortOptions],
      ['updatePowerDistTypeOptions', () => updatePowerDistTypeOptions],
      ['updatePowerDistVoltageOptions', () => updatePowerDistVoltageOptions],
      ['updatePowerDistCurrentOptions', () => updatePowerDistCurrentOptions],
      ['updateTimecodeTypeOptions', () => updateTimecodeTypeOptions],
      ['setPowerDistribution', () => setPowerDistribution],
      ['getPowerDistribution', () => getPowerDistribution],
      ['renderSetupDiagram', () => renderSetupDiagram],
      ['enableDiagramInteractions', () => enableDiagramInteractions],
      ['updateDiagramLegend', () => updateDiagramLegend],
      ['cameraFizPort', () => cameraFizPort],
      ['controllerCamPort', () => controllerCamPort],
      ['controllerDistancePort', () => controllerDistancePort],
      ['detectBrand', () => detectBrand],
      ['connectionLabel', () => connectionLabel],
      ['generateConnectorSummary', () => generateConnectorSummary],
      ['diagramConnectorIcons', () => diagramConnectorIcons],
      ['DIAGRAM_MONITOR_ICON', () => DIAGRAM_MONITOR_ICON],
      ['exportDiagramSvg', () => exportDiagramSvg],
      ['ensureDefaultProjectInfoSnapshot', () => ensureDefaultProjectInfoSnapshot],
      ['attachSelectSearch', () => attachSelectSearch],
      ['fixPowerInput', () => fixPowerInput],
      ['powerInputTypes', () => powerInputTypes],
      ['ensureList', () => ensureList],
      ['normalizeVideoType', () => normalizeVideoType],
      ['normalizeFizConnectorType', () => normalizeFizConnectorType],
      ['normalizeViewfinderType', () => normalizeViewfinderType],
      ['normalizePowerPortType', () => normalizePowerPortType],
      ['setMonitorVideoInputs', () => setMonitorVideoInputs],
      ['getMonitorVideoInputs', () => getMonitorVideoInputs],
      ['clearMonitorVideoInputs', () => clearMonitorVideoInputs],
      ['setMonitorVideoOutputs', () => setMonitorVideoOutputs],
      ['getMonitorVideoOutputs', () => getMonitorVideoOutputs],
      ['clearMonitorVideoOutputs', () => clearMonitorVideoOutputs],
      ['setVideoPowerInputs', () => setVideoPowerInputs],
      ['getVideoPowerInputs', () => getVideoPowerInputs],
      ['clearVideoPowerInputs', () => clearVideoPowerInputs],
      ['setVideoInputs', () => setVideoInputs],
      ['getVideoInputs', () => getVideoInputs],
      ['clearVideoInputs', () => clearVideoInputs],
      ['setVideoOutputs', () => setVideoOutputs],
      ['getVideoOutputs', () => getVideoOutputs],
      ['setVideoOutputsIO', () => setVideoOutputsIO],
      ['getVideoOutputsIO', () => getVideoOutputsIO],
      ['clearVideoOutputsIO', () => clearVideoOutputsIO],
      ['setViewfinderVideoInputs', () => setViewfinderVideoInputs],
      ['getViewfinderVideoInputs', () => getViewfinderVideoInputs],
      ['clearViewfinderVideoInputs', () => clearViewfinderVideoInputs],
      ['setViewfinderVideoOutputs', () => setViewfinderVideoOutputs],
      ['getViewfinderVideoOutputs', () => getViewfinderVideoOutputs],
      ['clearViewfinderVideoOutputs', () => clearViewfinderVideoOutputs],
      ['updateFizConnectorOptions', () => updateFizConnectorOptions],
      ['updateMotorConnectorOptions', () => updateMotorConnectorOptions],
      ['getCurrentSetupKey', () => getCurrentSetupKey],
      ['renderFeedbackTable', () => renderFeedbackTable],
      ['saveCurrentGearList', () => saveCurrentGearList],
      ['getPowerSelectionSnapshot', () => getPowerSelectionSnapshot],
      ['applyStoredPowerSelection', () => applyStoredPowerSelection],
      ['getGearListSelectors', () => getGearListSelectors],
      ['applyGearListSelectors', () => applyGearListSelectors],
      ['scenarioIcons', () => scenarioIcons],
      ['collectProjectFormData', () => collectProjectFormData],
      ['populateProjectForm', () => populateProjectForm],
      ['renderFilterDetails', () => renderFilterDetails],
      ['collectFilterSelections', () => collectFilterSelections],
      ['parseFilterTokens', () => parseFilterTokens],
      ['applyFilterSelectionsToGearList', () => applyFilterSelectionsToGearList],
      ['adjustGearListSelectWidth', () => adjustGearListSelectWidth],
      ['adjustGearListSelectWidths', () => adjustGearListSelectWidths],
      ['getDeviceChanges', () => getDeviceChanges],
      ['applyDeviceChanges', () => applyDeviceChanges],
      ['deviceMap', () => deviceMap],
      ['helpMap', () => helpMap],
      ['featureSearchEntries', () => featureSearchEntries],
      ['featureSearchDefaultOptions', () => featureSearchDefaultOptions],
      ['populateFeatureSearch', () => populateFeatureSearch],
      ['restoreFeatureSearchDefaults', () => restoreFeatureSearchDefaults],
      ['updateFeatureSearchValue', () => updateFeatureSearchValue],
      ['updateFeatureSearchSuggestions', () => updateFeatureSearchSuggestions],
      ['setCurrentProjectInfo', () => setCurrentProjectInfo],
      ['getCurrentProjectInfo', () => getCurrentProjectInfo],
      ['getCurrentSetupState', () => getCurrentSetupState],
      ['setSliderBowlValue', () => setSliderBowlValue],
      ['getSliderBowlSelect', () => getSliderBowlSelect],
      ['getEasyrigSelect', () => getEasyrigSelect],
      ['crewRoles', () => crewRoles],
      ['formatFullBackupFilename', () => formatFullBackupFilename],
      ['computeGearListCount', () => computeGearListCount],
      ['autoBackup', () => autoBackup],
      ['createSettingsBackup', () => createSettingsBackup],
      ['captureStorageSnapshot', () => captureStorageSnapshot],
      ['sanitizeBackupPayload', () => sanitizeBackupPayload],
      ['extractBackupSections', () => extractBackupSections],
      ['searchKey', () => searchKey],
      ['searchTokens', () => searchTokens],
      ['findBestSearchMatch', () => findBestSearchMatch],
      ['runFeatureSearch', () => runFeatureSearch],
      ['collectAutoGearCatalogNames', () => collectAutoGearCatalogNames],
      ['featureMap', () => featureMap],
      ['buildDefaultVideoDistributionAutoGearRules', () => buildDefaultVideoDistributionAutoGearRules],
      ['applyAutoGearRulesToTableHtml', () => applyAutoGearRulesToTableHtml],
      ['importAutoGearRulesFromData', () => importAutoGearRulesFromData],
      ['getAutoGearRuleCoverageSummary', () => getAutoGearRuleCoverageSummary],
      ['createAutoGearBackup', () => createAutoGearBackup],
      ['restoreAutoGearBackup', () => restoreAutoGearBackup],
      ['getAutoGearRules', () => getAutoGearRules],
      ['syncAutoGearRulesFromStorage', () => syncAutoGearRulesFromStorage],
      ['normalizeAutoGearCameraWeightCondition', () => normalizeAutoGearCameraWeightCondition],
      ['updateAutoGearItemButtonState', () => updateAutoGearItemButtonState],
      ['loadStoredLogoPreview', () => loadStoredLogoPreview],
      ['normalizeSpellingVariants', () => normalizeSpellingVariants],
      ['parseDeviceDatabaseImport', () => parseDeviceDatabaseImport],
      ['countDeviceDatabaseEntries', () => countDeviceDatabaseEntries],
      ['sanitizeShareFilename', () => sanitizeShareFilename],
      ['ensureJsonExtension', () => ensureJsonExtension],
      ['getDefaultShareFilename', () => getDefaultShareFilename],
      ['promptForSharedFilename', () => promptForSharedFilename],
      ['downloadSharedProject', () => downloadSharedProject],
      ['clearBatteryPlates', () => clearBatteryPlates],
      ['updateRecordingMediaOptions', () => updateRecordingMediaOptions],
      ['clearRecordingMedia', () => clearRecordingMedia],
      ['setLensMounts', () => setLensMounts],
      ['getLensMounts', () => getLensMounts],
      ['clearLensMounts', () => clearLensMounts],
      ['setLensDeviceMountOptions', () => setLensDeviceMountOptions],
      ['getLensDeviceMountOptions', () => getLensDeviceMountOptions],
      ['clearLensDeviceMountOptions', () => clearLensDeviceMountOptions],
      ['updateMountTypeOptions', () => updateMountTypeOptions],
      ['clearPowerDistribution', () => clearPowerDistribution],
      ['clearVideoOutputs', () => clearVideoOutputs],
      ['setFizConnectors', () => setFizConnectors],
      ['getFizConnectors', () => getFizConnectors],
      ['clearFizConnectors', () => clearFizConnectors],
      ['clearViewfinders', () => clearViewfinders],
      ['setTimecodes', () => setTimecodes],
      ['getTimecodes', () => getTimecodes],
      ['clearTimecodes', () => clearTimecodes],
      ['confirmAutoGearSelection', () => confirmAutoGearSelection],
      ['configureSharedImportOptions', () => configureSharedImportOptions],
      ['resolveSharedImportMode', () => resolveSharedImportMode],
      ['resetPlannerStateAfterFactoryReset', () => resetPlannerStateAfterFactoryReset],
      ['resetCustomFontsForFactoryReset', () => resetCustomFontsForFactoryReset],
      ['updateStorageSummary', () => updateStorageSummary],
      ['normaliseMarkVariants', () => normaliseMarkVariants],
      ['storeLoadedSetupState', () => storeLoadedSetupState],
    ];

    const resolvedAdditionalExports = ADDITIONAL_GLOBAL_EXPORT_ENTRIES.reduce(
      (acc, [exportName, getter]) => {
        try {
          const value = getter();
          if (typeof value !== 'undefined') {
            acc[exportName] = value;
          }
        } catch (error) {
          void error;
        }
        return acc;
      },
      {}
    );

    Object.assign(CORE_PART2_GLOBAL_EXPORTS, resolvedAdditionalExports);

    (function installCoreModuleExports() {
      const scope =
        (typeof globalThis !== 'undefined' && globalThis)
        || (typeof window !== 'undefined' && window)
        || (typeof self !== 'undefined' && self)
        || (typeof global !== 'undefined' && global)
        || null;

      if (!scope) {
        return;
      }

      const moduleBase = scope.cineModuleBase;
      const alreadyWrapped =
        !!(moduleBase && moduleBase.__cineSafeFreezeWrapped)
        || coreSafeFreezeRegistryHas(moduleBase);

      if (moduleBase && typeof moduleBase.freezeDeep === 'function' && !alreadyWrapped) {
        const originalFreezeDeep = moduleBase.freezeDeep;
        moduleBase.freezeDeep = function safeFreezeDeep(value, seen) {
          try {
            return originalFreezeDeep(value, seen);
          } catch (freezeError) {
            try {
              if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('cineModuleBase.freezeDeep fallback triggered for core module export.', freezeError);
              }
            } catch (warnError) {
              void warnError;
            }
            return value;
          }
        };

        coreSafeFreezeRegistryAdd(moduleBase);

        let marked = false;
        const markerKey = '__cineSafeFreezeWrapped';
        const hasExistingMarker = Object.prototype.hasOwnProperty.call(
          moduleBase,
          markerKey,
        );

        if (hasExistingMarker) {
          try {
            marked = Boolean(moduleBase[markerKey]);
          } catch (readMarkerError) {
            void readMarkerError;
            marked = true;
          }
        }

        let canAttachMarker = true;

        if (!marked && !hasExistingMarker && typeof Object.isExtensible === 'function') {
          try {
            canAttachMarker = Object.isExtensible(moduleBase);
          } catch (isExtensibleError) {
            void isExtensibleError;
            canAttachMarker = true;
          }
        }

        const shouldAttemptDirectMark = !marked && canAttachMarker;

        if (shouldAttemptDirectMark) {
          try {
            moduleBase[markerKey] = true;
            if (moduleBase[markerKey]) {
              marked = true;
            }
          } catch (assignError) {
            void assignError;
          }
        }

        if (
          !marked
          && shouldAttemptDirectMark
          && typeof Object.isExtensible === 'function'
        ) {
          try {
            if (!Object.isExtensible(moduleBase)) {
              canAttachMarker = false;
            }
          } catch (postAssignIsExtensibleError) {
            void postAssignIsExtensibleError;
          }
        }

        if (
          !marked
          && canAttachMarker
          && typeof Object.defineProperty === 'function'
        ) {
          try {
            Object.defineProperty(moduleBase, markerKey, {
              configurable: false,
              enumerable: false,
              writable: false,
              value: true,
            });
            marked = true;
          } catch (defineError) {
            void defineError;
          }
        }

        if (!marked && !coreSafeFreezeRegistryHas(moduleBase)) {
          coreSafeFreezeRegistryAdd(moduleBase);
        }
      }

      const MODULE_EXPORTS = {
        cineCoreProject: [
          'deriveProjectInfo',
          'updateCalculations',
          'checkSetupChanged',
          'currentProjectInfo',
          'setCurrentProjectInfo',
          'getCurrentProjectInfo',
          'collectProjectFormData',
          'populateProjectForm',
          'renderFilterDetails',
          'collectFilterSelections',
          'collectFilterTokens',
          'parseFilterTokens',
          'applyFilterSelectionsToGearList',
          'normalizeSpellingVariants',
          'normalizeSearchValue',
          'getPowerSelectionSnapshot',
          'applyStoredPowerSelection',
          'getGearListSelectors',
          'applyGearListSelectors',
        ],
        cineCoreGuard: [
          'ensureDefaultProjectInfoSnapshot',
          'skipNextGearListRefresh',
          'alignActiveAutoGearPreset',
          'reconcileAutoGearAutoPresetState',
          'openAutoGearEditor',
          'closeAutoGearEditor',
          'saveAutoGearRuleFromEditor',
          'handleAutoGearImportSelection',
          'handleAutoGearPresetSelection',
          'handleAutoGearSavePreset',
          'handleAutoGearDeletePreset',
          'applyAutoGearBackupVisibility',
          'renderAutoGearBackupControls',
          'renderAutoGearBackupRetentionControls',
          'renderAutoGearDraftImpact',
          'renderAutoGearDraftLists',
          'renderAutoGearMonitorDefaultsControls',
          'renderAutoGearPresetsControls',
          'renderAutoGearRulesList',
          'updateAutoGearCameraWeightDraft',
          'updateAutoGearShootingDaysDraft',
          'setAutoGearAutoPresetId',
          'syncAutoGearAutoPreset',
          'updateAutoGearCatalogOptions',
          'updateAutoGearItemButtonState',
          'updateAutoGearMonitorDefaultOptions',
          'applyFavoritesToSelect',
          'updateFavoriteButton',
          'toggleFavorite',
          'loadStoredLogoPreview',
          'renderSettingsLogoPreview',
          'loadFeedbackSafe',
          'saveFeedbackSafe',
          'saveCurrentGearList',
        ],
        cineCoreExperience: [
          'populateSelect',
          'refreshDeviceLists',
          'hasAnyDeviceSelection',
          'refreshAutoGearCameraOptions',
          'refreshAutoGearCameraWeightCondition',
          'refreshAutoGearMonitorOptions',
          'refreshAutoGearTripodHeadOptions',
          'refreshAutoGearTripodBowlOptions',
          'refreshAutoGearTripodTypesOptions',
          'refreshAutoGearTripodSpreaderOptions',
          'refreshAutoGearWirelessOptions',
          'refreshAutoGearMotorsOptions',
          'refreshAutoGearControllersOptions',
          'refreshAutoGearCrewOptions',
          'refreshAutoGearDistanceOptions',
          'exportAutoGearRules',
          'exportAutoGearPresets',
          'generatePrintableOverview',
          'generateGearListHtml',
          'displayGearAndRequirements',
          'updateGearListButtonVisibility',
          'overviewSectionIcons',
          'scenarioIcons',
          'populateFeatureSearch',
          'restoreFeatureSearchDefaults',
          'updateFeatureSearchValue',
          'updateFeatureSearchSuggestions',
          'featureSearchEntries',
          'featureSearchDefaultOptions',
          'applyAccentColor',
          'clearAccentColorOverrides',
          'updateAccentColorResetButtonState',
          'refreshDarkModeAccentBoost',
          'isHighContrastActive',
          'accentColor',
          'prevAccentColor',
          'revertAccentColor',
          'DEFAULT_ACCENT_COLOR',
          'HIGH_CONTRAST_ACCENT_COLOR',
          'fontSize',
          'fontFamily',
          'applyDarkMode',
          'applyPinkMode',
          'applyHighContrast',
          'setupInstallBanner',
          'ensureZoomRemoteSetup',
          'generateConnectorSummary',
          'diagramConnectorIcons',
          'DIAGRAM_MONITOR_ICON',
        ],
      };

      Object.entries(MODULE_EXPORTS).forEach(([moduleName, exportNames]) => {
        const moduleRef = scope[moduleName];
        if (!moduleRef || typeof moduleRef.install !== 'function') {
          return;
        }

        const payload = {};
        let hasValues = false;

        for (let index = 0; index < exportNames.length; index += 1) {
          const exportName = exportNames[index];
          if (Object.prototype.hasOwnProperty.call(CORE_PART2_GLOBAL_EXPORTS, exportName)) {
            payload[exportName] = CORE_PART2_GLOBAL_EXPORTS[exportName];
            hasValues = true;
          }
        }

        if (!hasValues) {
          return;
        }

        try {
          moduleRef.install(payload);
        } catch (installError) {
          try {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
              console.warn(`Failed to install exports for ${moduleName}.`, installError);
            }
          } catch (warnError) {
            void warnError;
          }
        }
      });
    })();

    const CORE_PART2_GLOBAL_SCOPE =
      CORE_SHARED_SCOPE_PART2 ||
      (typeof globalThis !== 'undefined' ? globalThis : null) ||
      (typeof window !== 'undefined' ? window : null) ||
      (typeof self !== 'undefined' ? self : null) ||
      (typeof global !== 'undefined' ? global : null);

    const CORE_PART2_RUNTIME = (function resolvePart2Runtime(scope) {
      if (!scope || typeof scope !== 'object') return null;
      if (scope.cineCoreRuntime && typeof scope.cineCoreRuntime === 'object') {
        return scope.cineCoreRuntime;
      }
      if (Object.isExtensible(scope)) {
        scope.cineCoreRuntime = {};
        return scope.cineCoreRuntime;
      }
      return null;
    })(CORE_PART2_GLOBAL_SCOPE);

    Object.entries(CORE_PART2_GLOBAL_EXPORTS).forEach(([name, value]) => {
      if (CORE_PART2_GLOBAL_SCOPE && Object.isExtensible(CORE_PART2_GLOBAL_SCOPE)) {
        CORE_PART2_GLOBAL_SCOPE[name] = value;
      }
      if (CORE_PART2_RUNTIME && Object.isExtensible(CORE_PART2_RUNTIME)) {
        CORE_PART2_RUNTIME[name] = value;
      }
    });

    console.log('app-core-new-2.js: About to flushCoreBootQueue');
    // Ensure deferred boot tasks from the first runtime segment execute before final renders
    flushCoreBootQueue();
    console.log('app-core-new-2.js: flushCoreBootQueue complete');

    // Initial render of device lists
    console.log('app-core-new-2.js: About to refreshDeviceLists');
    refreshDeviceLists();
    console.log('app-core-new-2.js: refreshDeviceLists complete');

    if (typeof module !== 'undefined' && module.exports) {
      module.exports = {
        normalizeAutoGearCameraWeightCondition,
        normalizeAutoGearWeightOperator,
        formatAutoGearCameraWeight,
        getAutoGearCameraWeightOperatorLabel,
      };
    }

    if (typeof globalThis !== 'undefined') {
      globalThis.checkSetupChanged = checkSetupChanged;
      globalThis.updateCalculations = updateCalculations;
      globalThis.projectDialog = projectDialog;
      globalThis.projectDialogCloseBtn = projectDialogCloseBtn;
      globalThis.projectCancelBtn = projectCancelBtn;
      globalThis.renderSetupDiagram = renderSetupDiagram;
      globalThis.clearRecordingMedia = clearRecordingMedia;
      globalThis.setSliderBowlValue = setSliderBowlValue;
    } else if (typeof window !== 'undefined') {
      window.checkSetupChanged = checkSetupChanged;
      window.updateCalculations = updateCalculations;
      window.projectDialog = projectDialog;
      window.projectDialogCloseBtn = projectDialogCloseBtn;
      window.projectCancelBtn = projectCancelBtn;
      window.renderSetupDiagram = renderSetupDiagram;
      window.clearRecordingMedia = clearRecordingMedia;
      window.setSliderBowlValue = setSliderBowlValue;
    }
    console.log('app-core-new-2.js: corePart2Runtime complete');
  }

  const corePart2ExecutedViaRunner = typeof CORE_PART1_RUNNER === 'function'
    ? CORE_PART1_RUNNER(corePart2Runtime)
    : false;

  if (!corePart2ExecutedViaRunner) {
    corePart2Runtime();
  }

}
