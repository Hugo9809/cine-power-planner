(function () {
  function fallbackDetectGlobalScope() {
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
    return {};
  }

  function fallbackCollectCandidateScopes(primary) {
    const scopes = [];

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    }

    pushScope(primary);
    if (typeof globalThis !== 'undefined') pushScope(globalThis);
    if (typeof window !== 'undefined') pushScope(window);
    if (typeof self !== 'undefined') pushScope(self);
    if (typeof global !== 'undefined') pushScope(global);

    return scopes;
  }

  function fallbackLoadModuleEnvironment(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleEnvironment === 'object') {
        return candidate.cineModuleEnvironment;
      }
    }

    return null;
  }

  function fallbackLoadEnvironmentBridge(scope) {
    if (typeof require === 'function') {
      try {
        return require('./environment-bridge.js');
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineEnvironmentBridge === 'object') {
        return candidate.cineEnvironmentBridge;
      }
    }

    return null;
  }

  function fallbackResolveModuleGlobals(scope) {
    if (typeof require === 'function') {
      try {
        const required = require('./globals.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    const candidates = fallbackCollectCandidateScopes(scope);

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && typeof candidate.cineModuleGlobals === 'object') {
        return candidate.cineModuleGlobals;
      }
    }

    return null;
  }

  function fallbackTryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }

  const LOCAL_SCOPE = fallbackDetectGlobalScope();

  function resolveEnvironmentContext(scope) {
    const targetScope = scope || LOCAL_SCOPE;

    if (typeof require === 'function') {
      try {
        const required = require('./environment-context.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (targetScope && typeof targetScope.cineModuleEnvironmentContext === 'object') {
      return targetScope.cineModuleEnvironmentContext;
    }

    return null;
  }

  const ENVIRONMENT_CONTEXT = resolveEnvironmentContext(LOCAL_SCOPE);

  const detectGlobalScope =
    ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.detectGlobalScope === 'function'
      ? function detectWithContext() {
          try {
            return ENVIRONMENT_CONTEXT.detectGlobalScope();
          } catch (error) {
            void error;
          }
          return fallbackDetectGlobalScope();
        }
      : fallbackDetectGlobalScope;

  const PRIMARY_SCOPE =
    ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getPrimaryScope === 'function'
      ? ENVIRONMENT_CONTEXT.getPrimaryScope()
      : detectGlobalScope();

  const GLOBAL_SCOPE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.getGlobalScope === 'function'
      ? ENVIRONMENT_CONTEXT.getGlobalScope(PRIMARY_SCOPE)
      : null)
    || PRIMARY_SCOPE;

  const MODULE_ENV =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleEnvironment === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleEnvironment(GLOBAL_SCOPE)
      : null)
    || fallbackLoadModuleEnvironment(GLOBAL_SCOPE);

  const ENV_BRIDGE =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveEnvironmentBridge === 'function'
      ? ENVIRONMENT_CONTEXT.resolveEnvironmentBridge(GLOBAL_SCOPE)
      : null)
    || fallbackLoadEnvironmentBridge(GLOBAL_SCOPE);

  const MODULE_GLOBALS =
    (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleGlobals === 'function'
      ? ENVIRONMENT_CONTEXT.resolveModuleGlobals(GLOBAL_SCOPE)
      : null)
    || fallbackResolveModuleGlobals(GLOBAL_SCOPE);

  function informModuleGlobals(name, api) {
    if (!MODULE_GLOBALS || typeof MODULE_GLOBALS.recordModule !== 'function') {
      return;
    }

    try {
      MODULE_GLOBALS.recordModule(name, api);
    } catch (error) {
      void error;
    }
  }

  const tryRequire = (function resolveTryRequire() {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.tryRequire === 'function') {
      return function tryRequireThroughContext(modulePath) {
        const result = ENVIRONMENT_CONTEXT.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.tryRequire === 'function') {
      return MODULE_GLOBALS.tryRequire;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.tryRequire === 'function') {
      return function bridgeTryRequire(modulePath) {
        const result = ENV_BRIDGE.tryRequire(modulePath);
        return typeof result === 'undefined' ? fallbackTryRequire(modulePath) : result;
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.tryRequire === 'function') {
      return MODULE_ENV.tryRequire;
    }

    return fallbackTryRequire;
  })();

  function fallbackResolveModuleRegistry(scope) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.resolveModuleRegistry === 'function') {
      try {
        const resolved = MODULE_GLOBALS.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(scope || GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.resolveModuleRegistry === 'function') {
      try {
        return MODULE_ENV.resolveModuleRegistry(scope || GLOBAL_SCOPE);
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = fallbackCollectCandidateScopes(scope || GLOBAL_SCOPE);

    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  function resolveModuleRegistry(scope) {
    if (ENVIRONMENT_CONTEXT && typeof ENVIRONMENT_CONTEXT.resolveModuleRegistry === 'function') {
      try {
        const resolved = ENVIRONMENT_CONTEXT.resolveModuleRegistry(scope || GLOBAL_SCOPE);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return fallbackResolveModuleRegistry(scope);
  }

  const MODULE_REGISTRY = (function () {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getModuleRegistry === 'function') {
      try {
        const shared = MODULE_GLOBALS.getModuleRegistry(GLOBAL_SCOPE);
        if (shared) {
          return shared;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getModuleRegistry === 'function') {
      try {
        const bridged = ENV_BRIDGE.getModuleRegistry(GLOBAL_SCOPE);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.getModuleRegistry === 'function') {
      try {
        const provided = MODULE_ENV.getModuleRegistry(GLOBAL_SCOPE);
        if (provided) {
          return provided;
        }
      } catch (error) {
        void error;
      }
    }
    return resolveModuleRegistry();
  })();

  const PENDING_QUEUE_KEY = (function resolvePendingKey() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getPendingQueueKey === 'function') {
      try {
        const sharedKey = MODULE_GLOBALS.getPendingQueueKey();
        if (typeof sharedKey === 'string' && sharedKey) {
          return sharedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getPendingQueueKey === 'function') {
      try {
        const bridgedKey = ENV_BRIDGE.getPendingQueueKey();
        if (typeof bridgedKey === 'string' && bridgedKey) {
          return bridgedKey;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.PENDING_QUEUE_KEY === 'string') {
      return MODULE_ENV.PENDING_QUEUE_KEY;
    }

    return '__cinePendingModuleRegistrations__';
  })();

  function cloneOptions(options) {
    if (!options || typeof options !== 'object') {
      return {};
    }

    const copy = {};
    const keys = Object.keys(options);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      copy[key] = options[key];
    }

    return copy;
  }

  function fallbackQueueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }

    const payload = Object.freeze({
      name,
      api,
      options: Object.freeze(cloneOptions(options)),
    });

    let queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: [],
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  function queueModuleRegistration(name, api, options) {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.queueModuleRegistration === 'function') {
      try {
        if (MODULE_GLOBALS.queueModuleRegistration(name, api, options, GLOBAL_SCOPE)) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.queueModuleRegistration === 'function') {
      try {
        const bridged = ENV_BRIDGE.queueModuleRegistration(name, api, options);
        if (bridged) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.queueModuleRegistration === 'function') {
      return MODULE_ENV.queueModuleRegistration(name, api, options, GLOBAL_SCOPE);
    }

    return fallbackQueueModuleRegistration(name, api, options);
  }

  function fallbackRegisterOrQueue(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          try {
            onError(error);
          } catch (callbackError) {
            void callbackError;
          }
        } else {
          void error;
        }
      }
    }

    queueModuleRegistration(name, api, options);
    return false;
  }

  const registerOrQueueModule = (function resolveRegisterOrQueue() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const registered = MODULE_GLOBALS.registerOrQueueModule(
            name,
            api,
            options,
            onError,
            GLOBAL_SCOPE,
            MODULE_REGISTRY,
          );
          if (registered) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        try {
          const bridged = ENV_BRIDGE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
          if (bridged) {
            return true;
          }
        } catch (error) {
          void error;
        }

        return fallbackRegisterOrQueue(name, api, options, onError);
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.registerOrQueueModule === 'function') {
      return function registerOrQueueModule(name, api, options, onError) {
        return MODULE_ENV.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, MODULE_REGISTRY);
      };
    }

    return fallbackRegisterOrQueue;
  })();

  function resolveImmutability(scope) {
    const targetScope = scope || GLOBAL_SCOPE;

    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.getImmutability === 'function') {
      try {
        const resolved = MODULE_GLOBALS.getImmutability(targetScope);
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.getImmutability === 'function') {
      try {
        const bridged = ENV_BRIDGE.getImmutability(targetScope);
        if (bridged) {
          return bridged;
        }
      } catch (error) {
        void error;
      }
    }

    if (MODULE_ENV && typeof MODULE_ENV.resolveImmutability === 'function') {
      try {
        const moduleProvided = MODULE_ENV.resolveImmutability(targetScope);
        if (moduleProvided) {
          return moduleProvided;
        }
      } catch (error) {
        void error;
      }
    }

    const required = tryRequire('./immutability.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = fallbackCollectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModuleImmutability === 'object') {
        return candidate.cineModuleImmutability;
      }
    }

    return null;
  }

  function createFallbackImmutability() {
    function shouldBypass(value) {
      if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
        return false;
      }

      try {
        if (typeof value.pipe === 'function' && typeof value.unpipe === 'function') {
          return true;
        }

        if (typeof value.on === 'function' && typeof value.emit === 'function') {
          if (typeof value.write === 'function' || typeof value.read === 'function') {
            return true;
          }

          const ctorName = value.constructor && value.constructor.name;
          if (ctorName && /Stream|Emitter|Port/i.test(ctorName)) {
            return true;
          }
        }

        if (typeof Symbol !== 'undefined' && value[Symbol.toStringTag]) {
          const tag = value[Symbol.toStringTag];
          if (typeof tag === 'string' && /Stream|Port/i.test(tag)) {
            return true;
          }
        }
      } catch (inspectionError) {
        void inspectionError;
      }

      return false;
    }

    function freeze(value, seen = new WeakSet()) {
      if (!value || typeof value !== 'object') {
        return value;
      }

      if (shouldBypass(value)) {
        return value;
      }

      if (seen.has(value)) {
        return value;
      }

      seen.add(value);

      const keys = Object.getOwnPropertyNames(value);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
          continue;
        }
        freeze(descriptor.value, seen);
      }

      return Object.freeze(value);
    }

    return {
      shouldBypassDeepFreeze: shouldBypass,
      freezeDeep: freeze,
    };
  }

  const FALLBACK_IMMUTABILITY = createFallbackImmutability();
  let activeImmutability = resolveImmutability(GLOBAL_SCOPE) || FALLBACK_IMMUTABILITY;

  function getImmutability() {
    if (activeImmutability !== FALLBACK_IMMUTABILITY) {
      return activeImmutability;
    }

    const resolved = resolveImmutability(GLOBAL_SCOPE);
    if (resolved && resolved !== activeImmutability) {
      activeImmutability = resolved;
    }

    return activeImmutability;
  }

  function freezeDeep(value, seen) {
    const provider = getImmutability();

    try {
      return provider.freezeDeep(value, seen);
    } catch (error) {
      void error;
    }

    return FALLBACK_IMMUTABILITY.freezeDeep(value, seen);
  }

  function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }

    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  }

  const safeWarn = (function resolveSafeWarn() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.safeWarn === 'function') {
      return MODULE_GLOBALS.safeWarn;
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.safeWarn === 'function') {
      return function bridgeSafeWarn(message, detail) {
        try {
          ENV_BRIDGE.safeWarn(message, detail);
        } catch (error) {
          void error;
          fallbackSafeWarn(message, detail);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.safeWarn === 'function') {
      return MODULE_ENV.safeWarn;
    }

    return fallbackSafeWarn;
  })();

  function fallbackExposeGlobal(name, value) {
    if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
      return false;
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, name, {
        configurable: true,
        enumerable: false,
        value,
        writable: false,
      });
      return true;
    } catch (error) {
      void error;
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (assignmentError) {
        void assignmentError;
        return false;
      }
    }
  }

  const exposeGlobal = (function resolveExposeGlobal() {
    if (MODULE_GLOBALS && typeof MODULE_GLOBALS.exposeGlobal === 'function') {
      return function moduleGlobalsExpose(name, value, options) {
        try {
          return MODULE_GLOBALS.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (ENV_BRIDGE && typeof ENV_BRIDGE.exposeGlobal === 'function') {
      return function bridgeExposeGlobal(name, value, options) {
        try {
          return ENV_BRIDGE.exposeGlobal(name, value, options);
        } catch (error) {
          void error;
          return fallbackExposeGlobal(name, value);
        }
      };
    }

    if (MODULE_ENV && typeof MODULE_ENV.exposeGlobal === 'function') {
      return function exposeGlobal(name, value, options) {
        return MODULE_ENV.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      };
    }

    return fallbackExposeGlobal;
  })();

  function createStableStringify() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.stableStringify === 'function') {
      return GLOBAL_SCOPE.stableStringify;
    }

    function stableStringify(value) {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (Array.isArray(value)) {
        return `[${value.map(item => stableStringify(item)).join(',')}]`;
      }
      if (typeof value === 'object') {
        const keys = Object.keys(value).sort();
        const entries = keys.map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
        return `{${entries.join(',')}}`;
      }
      return JSON.stringify(value);
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.stableStringify = stableStringify;
      } catch (error) {
        void error;
      }
    }

    return stableStringify;
  }

  const HUMANIZE_OVERRIDES = {
    powerDrawWatts: 'Power (W)',
    capacity: 'Capacity (Wh)',
    pinA: 'Pin A',
    dtapA: 'D-Tap A',
    mount_type: 'Mount',
    screenSizeInches: 'Screen Size (in)',
    brightnessNits: 'Brightness (nits)',
    torqueNm: 'Torque (Nm)',
    internalController: 'Internal Controller',
    powerSource: 'Power Source',
    batteryType: 'Battery Type',
    connectivity: 'Connectivity'
  };

  function createHumanizeKey() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.humanizeKey === 'function') {
      return GLOBAL_SCOPE.humanizeKey;
    }

    function humanizeKey(key) {
      if (key && Object.prototype.hasOwnProperty.call(HUMANIZE_OVERRIDES, key)) {
        return HUMANIZE_OVERRIDES[key];
      }

      const stringValue = typeof key === 'string' ? key : String(key || '');
      return stringValue
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (c) => c.toUpperCase());
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.humanizeKey = humanizeKey;
      } catch (error) {
        void error;
      }
    }

    return humanizeKey;
  }

  const stableStringify = createStableStringify();
  const humanizeKey = createHumanizeKey();

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

    for (const scope of scopes) {
      if (scope && typeof scope.generateConnectorSummary === 'function') {
        cachedConnectorSummaryGenerator = scope.generateConnectorSummary;
        connectorSummaryCachePrimed = true;
        return cachedConnectorSummaryGenerator;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.generateConnectorSummary === 'function') {
      cachedConnectorSummaryGenerator = GLOBAL_SCOPE.generateConnectorSummary;
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

  let autoGearWeightHelpers = null;
  if (typeof require === 'function') {
    try {
      autoGearWeightHelpers = require('../auto-gear-weight.js');
    } catch (error) {
      void error;
    }
  }

  const autoGearWeightScope = GLOBAL_SCOPE || {};

  const normalizeAutoGearWeightOperator =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightOperator === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearWeightOperator
      : typeof autoGearWeightScope.normalizeAutoGearWeightOperator === 'function'
        ? autoGearWeightScope.normalizeAutoGearWeightOperator
        : function normalizeAutoGearWeightOperator(value) {
            if (typeof value !== 'string') return 'greater';
            const normalized = value.trim().toLowerCase();
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
            return 'greater';
          });

  const normalizeAutoGearWeightValue =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightValue === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearWeightValue
      : typeof autoGearWeightScope.normalizeAutoGearWeightValue === 'function'
        ? autoGearWeightScope.normalizeAutoGearWeightValue
        : function normalizeAutoGearWeightValue(value) {
            if (typeof value === 'number' && Number.isFinite(value)) {
              const rounded = Math.round(value);
              return rounded >= 0 ? rounded : null;
            }
            if (typeof value === 'string') {
              const trimmed = value.trim();
              if (!trimmed) return null;
              const sanitized = trimmed.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
              if (!sanitized) return null;
              const parsed = Number.parseFloat(sanitized);
              if (!Number.isFinite(parsed)) return null;
              const rounded = Math.round(parsed);
              return rounded >= 0 ? rounded : null;
            }
            return null;
          });

  const normalizeAutoGearCameraWeightCondition =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition === 'function'
      ? autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition
      : typeof autoGearWeightScope.normalizeAutoGearCameraWeightCondition === 'function'
        ? autoGearWeightScope.normalizeAutoGearCameraWeightCondition
        : function normalizeAutoGearCameraWeightCondition() {
            return null;
          });

  const formatAutoGearWeight =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearWeight === 'function'
      ? autoGearWeightHelpers.formatAutoGearWeight
      : typeof autoGearWeightScope.formatAutoGearWeight === 'function'
        ? autoGearWeightScope.formatAutoGearWeight
        : function formatAutoGearWeight(value) {
            if (!Number.isFinite(value)) return '';
            try {
              if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
                return new Intl.NumberFormat().format(value);
              }
            } catch (error) {
              void error;
            }
            return String(value);
          });

  const getAutoGearCameraWeightOperatorLabel =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel === 'function'
      ? autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel
      : typeof autoGearWeightScope.getAutoGearCameraWeightOperatorLabel === 'function'
        ? autoGearWeightScope.getAutoGearCameraWeightOperatorLabel
        : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
            const textsForLang = langTexts || {};
            const fallbackTexts = (autoGearWeightScope && autoGearWeightScope.texts && autoGearWeightScope.texts.en) || {};
            const normalized = normalizeAutoGearWeightOperator(operator);
            if (normalized === 'less') {
              return textsForLang.autoGearCameraWeightOperatorLess
                || fallbackTexts.autoGearCameraWeightOperatorLess
                || 'Lighter than';
            }
            if (normalized === 'equal') {
              return textsForLang.autoGearCameraWeightOperatorEqual
                || fallbackTexts.autoGearCameraWeightOperatorEqual
                || 'Exactly';
            }
            return textsForLang.autoGearCameraWeightOperatorGreater
              || fallbackTexts.autoGearCameraWeightOperatorGreater
              || 'Heavier than';
          });

  const formatAutoGearCameraWeight =
    (autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearCameraWeight === 'function'
      ? autoGearWeightHelpers.formatAutoGearCameraWeight
      : typeof autoGearWeightScope.formatAutoGearCameraWeight === 'function'
        ? autoGearWeightScope.formatAutoGearCameraWeight
        : function formatAutoGearCameraWeight(condition, langTexts) {
            if (!condition || !Number.isFinite(condition.value)) return '';
            const label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
            const formattedValue = formatAutoGearWeight(condition.value);
            return `${label} ${formattedValue} g`;
          });

  function resolveLzString() {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      return GLOBAL_SCOPE.LZString;
    }

    let resolved = null;
    if (typeof require === 'function') {
      try {
        resolved = require('lz-string');
      } catch (error) {
        void error;
      }
    }

    if (!resolved && GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      resolved = GLOBAL_SCOPE.LZString;
    }

    if (!resolved) {
      resolved = {
        compressToEncodedURIComponent: s => s,
        decompressFromEncodedURIComponent: s => s,
        compressToUTF16: s => s,
        decompressFromUTF16: s => s,
      };
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
      try {
        GLOBAL_SCOPE.LZString = resolved;
      } catch (error) {
        void error;
      }
    }

    return resolved;
  }

  const LZString = resolveLzString();

  const APP_VERSION = '1.0.16';

  const shared = freezeDeep({
    APP_VERSION,
    stableStringify,
    humanizeKey,
    resolveConnectorSummaryGenerator,
    safeGenerateConnectorSummary,
    normalizeAutoGearWeightOperator,
    normalizeAutoGearWeightValue,
    normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight,
    getAutoGearCameraWeightOperatorLabel,
    formatAutoGearCameraWeight,
    LZString,
    getLZString() {
      return LZString;
    },
  });

  informModuleGlobals('cineCoreShared', shared);

  registerOrQueueModule('cineCoreShared', shared, {
    category: 'shared',
    description: 'Shared helpers for deterministic stringification, weights, and version markers.',
    replace: true,
    connections: ['cineModuleEnvironment', 'cineModuleGlobals', 'cineModuleContext'],
  });

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    if (!GLOBAL_SCOPE.APP_VERSION) {
      const exposedVersion = exposeGlobal('APP_VERSION', APP_VERSION, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
      if (!exposedVersion) {
        safeWarn('Unable to expose APP_VERSION globally for cineCoreShared.');
      }
    }

    const exposedShared = exposeGlobal('cineCoreShared', shared, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
    if (!exposedShared) {
      safeWarn('Unable to expose cineCoreShared globally.');
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = shared;
  }
})();
