/*
 * Cine Power Planner runtime split (part 1 of 2).
 *
 * This module stores the opening half of the monolithic app-core logic.
 * The verbose comment ensures GitHub treats this file as newly created
 * instead of a rename, which keeps large diffs readable even though the
 * runtime content itself is unchanged.
 *
 * Maintenance checklist for this split:
 *   1. Apply functional changes to both halves in lockstep.
 *   2. Update the legacy bundle mirrors when touching the source files.
 *   3. Keep loader.js and script.js aligned with the module filenames.
 *   4. Retain this explanatory block to avoid rename heuristics.
 *   5. Run integrity tests so bundling stays consistent.
 *   6. Verify offline storage helpers still load without data loss.
 *   7. Confirm autosave, backup and restore routines keep functioning.
 *   8. Preserve localisation hooks and translation updates.
 *   9. Respect the locally bundled icons and avoid external dependencies.
 *  10. Document any behavioural adjustments in the help materials.
 *
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 * This repetition is deliberate: it ensures the diff remains stable by
 * keeping the similarity score below Git's rename detection threshold.
 * Do not trim these notes unless the tooling issue has been resolved.
 */

var CORE_PART1_RUNTIME_SCOPE =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof self !== 'undefined'
        ? self
        : typeof global !== 'undefined'
          ? global
          : null;

if (CORE_PART1_RUNTIME_SCOPE && CORE_PART1_RUNTIME_SCOPE.__cineCorePart1Initialized) {
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn('Cine Power Planner core runtime (part 1) already initialized. Skipping duplicate load.');
  }
} else {
  if (CORE_PART1_RUNTIME_SCOPE) {
    try {
      Object.defineProperty(CORE_PART1_RUNTIME_SCOPE, '__cineCorePart1Initialized', {
        configurable: true,
        writable: true,
        value: true,
      });
    } catch (corePart1InitError) {
      CORE_PART1_RUNTIME_SCOPE.__cineCorePart1Initialized = true;
      void corePart1InitError;
    }
  }

const CORE_GLOBAL_SCOPE = CORE_PART1_RUNTIME_SCOPE;
const CORE_TEMPERATURE_QUEUE_KEY = "__cinePendingTemperatureNote";
const CORE_TEMPERATURE_RENDER_NAME = "renderTemperatureNote";

function getCoreGlobalObject() {
  if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === "object") {
    return CORE_GLOBAL_SCOPE;
  }
  if (typeof globalThis !== "undefined" && typeof globalThis === "object") {
    return globalThis;
  }
  if (typeof window !== "undefined" && typeof window === "object") {
    return window;
  }
  if (typeof self !== "undefined" && typeof self === "object") {
    return self;
  }
  if (typeof global !== "undefined" && typeof global === "object") {
    return global;
  }
  return null;
}

function ensureCoreGlobalValue(name, fallbackValue) {
  const fallbackProvider =
    typeof fallbackValue === 'function' ? fallbackValue : () => fallbackValue;

  if (typeof name !== 'string' || !name) {
    return fallbackProvider();
  }

  const scope = getCoreGlobalObject();
  if (!scope || typeof scope !== 'object') {
    return fallbackProvider();
  }

  let existing;
  try {
    existing = scope[name];
  } catch (readError) {
    existing = undefined;
    void readError;
  }

  if (typeof existing !== 'undefined') {
    return existing;
  }

  const value = fallbackProvider();

  try {
    scope[name] = value;
    return scope[name];
  } catch (assignError) {
    void assignError;
  }

  try {
    Object.defineProperty(scope, name, {
      configurable: true,
      writable: true,
      value,
    });
  } catch (defineError) {
    void defineError;
  }

  try {
    return scope[name];
  } catch (finalReadError) {
    void finalReadError;
  }

  return value;
}

var gridSnap = ensureCoreGlobalValue('gridSnap', () => false);

function dispatchTemperatureNoteRender(hours) {
  const scope = getCoreGlobalObject();
  let renderer = null;

  if (
    !renderer &&
    CORE_RUNTIME_STATE &&
    typeof CORE_RUNTIME_STATE.getAssignedTemperatureRenderer === 'function'
  ) {
    try {
      renderer = CORE_RUNTIME_STATE.getAssignedTemperatureRenderer();
    } catch (stateRendererError) {
      void stateRendererError;
    }
  }

  try {
    if (typeof renderTemperatureNote === "function") {
      renderer = renderTemperatureNote;
    }
  } catch (referenceError) {
    const isReferenceError =
      referenceError &&
      (referenceError.name === "ReferenceError" ||
        /is not defined|Cannot access uninitialized/i.test(
          String(referenceError && referenceError.message)
        ));

    if (!isReferenceError) {
      throw referenceError;
    }
  }

  if (!renderer && scope && typeof scope === "object") {
    try {
      const scopedRenderer = scope[CORE_TEMPERATURE_RENDER_NAME];
      if (typeof scopedRenderer === "function") {
        renderer = scopedRenderer;
      }
    } catch (readError) {
      void readError;
    }
  }

  if (typeof renderer === "function") {
    try {
      renderer(hours);
    } catch (renderError) {
      if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error("Temperature note renderer failed", renderError);
      }
    }
    return;
  }

  if (!scope || typeof scope !== "object") {
    return;
  }

  let pending = scope[CORE_TEMPERATURE_QUEUE_KEY];
  if (!pending || typeof pending !== "object") {
    pending = {};
  }
  pending.latestHours = hours;
  try {
    pending.updatedAt = Date.now ? Date.now() : new Date().getTime();
  } catch (timestampError) {
    void timestampError;
    pending.updatedAt = 0;
  }
  scope[CORE_TEMPERATURE_QUEUE_KEY] = pending;
}

function exposeCoreRuntimeConstant(name, value) {
  if (typeof name !== 'string' || !name) {
    return;
  }

  const scope =
    (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
      ? CORE_GLOBAL_SCOPE
      : typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
          ? window
          : typeof self !== 'undefined'
            ? self
            : typeof global !== 'undefined'
              ? global
              : null;

  if (!scope || typeof scope !== 'object') {
    return;
  }

  let descriptor = null;
  try {
    descriptor = Object.getOwnPropertyDescriptor(scope, name);
  } catch (descriptorError) {
    descriptor = null;
    void descriptorError;
  }

  if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
    return;
  }

  try {
    scope[name] = value;
    return;
  } catch (assignError) {
    void assignError;
  }

  try {
    Object.defineProperty(scope, name, {
      configurable: true,
      writable: true,
      value,
    });
  } catch (defineError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(`Unable to expose ${name} globally`, defineError);
    }
  }
}

function exposeCoreRuntimeConstants(constants) {
  if (!constants || typeof constants !== 'object') {
    return;
  }

  Object.keys(constants).forEach(key => {
    exposeCoreRuntimeConstant(key, constants[key]);
  });
}

function exposeCoreRuntimeBindings(bindings) {
  if (!bindings || typeof bindings !== 'object') {
    return;
  }

  const scope =
    (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
      ? CORE_GLOBAL_SCOPE
      : typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
          ? window
          : typeof self !== 'undefined'
            ? self
            : typeof global !== 'undefined'
              ? global
              : null;

  if (!scope || typeof scope !== 'object') {
    return;
  }

  Object.entries(bindings).forEach(([name, descriptor]) => {
    if (typeof name !== 'string' || !name) {
      return;
    }

    const getter = descriptor && typeof descriptor.get === 'function' ? descriptor.get : null;
    const setter = descriptor && typeof descriptor.set === 'function' ? descriptor.set : null;

    if (!getter) {
      return;
    }

    try {
      Object.defineProperty(scope, name, {
        configurable: true,
        enumerable: false,
        get: getter,
        set: setter || undefined,
      });
      return;
    } catch (defineError) {
      void defineError;
    }

    try {
      scope[name] = getter();
    } catch (assignError) {
      void assignError;
    }
  });
}

const CORE_PART1_VALID_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function runCoreRuntimeSegment(executor) {
  if (typeof executor !== 'function') {
    return false;
  }

  const scope =
    (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object')
      ? CORE_GLOBAL_SCOPE
      : typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
          ? window
          : typeof self !== 'undefined'
            ? self
            : typeof global !== 'undefined'
              ? global
              : null;

  try {
    executor.call(scope || this);
    return true;
  } catch (executionError) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('Cine Power Planner core runtime segment failed to evaluate.', executionError);
    }
  }

  return false;
}

if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
  try {
    Object.defineProperty(CORE_GLOBAL_SCOPE, '__cineCorePart1Runner', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: runCoreRuntimeSegment,
    });
  } catch (runnerDefineError) {
    CORE_GLOBAL_SCOPE.__cineCorePart1Runner = runCoreRuntimeSegment;
    void runnerDefineError;
  }
}

function resolveCoreShared() {
  if (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.cineCoreShared) {
    return CORE_GLOBAL_SCOPE.cineCoreShared;
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

const CORE_SHARED = resolveCoreShared() || {};

function createCoreRuntimeState(initialScopes) {
  const scopes = [];
  const seenScopes =
    typeof Set === 'function'
      ? new Set()
      : null;

  function registerScope(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    if (seenScopes) {
      if (seenScopes.has(scope)) {
        return;
      }
      seenScopes.add(scope);
      scopes.push(scope);
      return;
    }

    if (scopes.indexOf(scope) !== -1) {
      return;
    }

    scopes.push(scope);
  }

  if (Array.isArray(initialScopes)) {
    for (let index = 0; index < initialScopes.length; index += 1) {
      try {
        registerScope(initialScopes[index]);
      } catch (initialiseScopeError) {
        void initialiseScopeError;
      }
    }
  }

  function withEachScope(callback) {
    if (typeof callback !== 'function') {
      return;
    }

    for (let index = 0; index < scopes.length; index += 1) {
      try {
        callback(scopes[index], index);
      } catch (scopeCallbackError) {
        void scopeCallbackError;
      }
    }
  }

  function getScopes() {
    return scopes.slice();
  }

  function getPrimaryScope() {
    return scopes.length > 0 ? scopes[0] : null;
  }

  function ensureValue(name, fallbackValue) {
    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    if (typeof name !== 'string' || !name) {
      try {
        return fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        return undefined;
      }
    }

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (typeof scope[name] === 'undefined') {
          scope[name] = fallbackProvider();
        }
        return scope[name];
      } catch (ensureError) {
        void ensureError;
      }
    }

    try {
      return fallbackProvider();
    } catch (fallbackError) {
      void fallbackError;
      return undefined;
    }
  }

  function normaliseValue(name, validator, fallbackValue) {
    const fallbackProvider =
      typeof fallbackValue === 'function'
        ? fallbackValue
        : function provideStaticFallback() {
            return fallbackValue;
          };

    const validate =
      typeof validator === 'function'
        ? validator
        : function alwaysValid() {
            return true;
          };

    withEachScope(scope => {
      try {
        if (!validate(scope[name])) {
          scope[name] = fallbackProvider();
        }
      } catch (normaliseError) {
        void normaliseError;
      }
    });
  }

  function readValue(name) {
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        if (name in scope) {
          return scope[name];
        }
      } catch (readError) {
        void readError;
      }
    }

    return undefined;
  }

  let assignedTemperatureRenderer = null;

  function assignTemperatureRenderer(renderer) {
    if (typeof renderer !== 'function') {
      return;
    }

    assignedTemperatureRenderer = renderer;

    withEachScope(scope => {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      try {
        scope[CORE_TEMPERATURE_RENDER_NAME] = renderer;
        const pending = scope[CORE_TEMPERATURE_QUEUE_KEY];

        if (pending && typeof pending === 'object') {
          if (Object.prototype.hasOwnProperty.call(pending, 'latestHours')) {
            const hours = pending.latestHours;
            if (typeof hours !== 'undefined') {
              try {
                renderer(hours);
              } catch (temperatureRenderError) {
                if (
                  typeof console !== 'undefined' &&
                  typeof console.error === 'function'
                ) {
                  console.error(
                    'Failed to apply pending temperature note render',
                    temperatureRenderError,
                  );
                }
              }
            }
          }

          try {
            delete pending.latestHours;
          } catch (clearLatestError) {
            void clearLatestError;
            pending.latestHours = undefined;
          }
        }
      } catch (assignError) {
        void assignError;
      }
    });
  }

  function getAssignedTemperatureRenderer() {
    return assignedTemperatureRenderer;
  }

  const autoGearGuards = {
    isReferenceError() {
      return false;
    },
    repair() {
      return undefined;
    },
  };

  function setAutoGearGuards(nextGuards) {
    if (!nextGuards || typeof nextGuards !== 'object') {
      return;
    }

    if (typeof nextGuards.isReferenceError === 'function') {
      autoGearGuards.isReferenceError = nextGuards.isReferenceError;
    }

    if (typeof nextGuards.repair === 'function') {
      autoGearGuards.repair = nextGuards.repair;
    }
  }

  return {
    registerScope,
    withEachScope,
    getScopes,
    getPrimaryScope,
    ensureValue,
    normaliseValue,
    readValue,
    assignTemperatureRenderer,
    getAssignedTemperatureRenderer,
    autoGearGuards,
    setAutoGearGuards,
  };
}

const CORE_RUNTIME_STATE = ensureCoreGlobalValue('__cineRuntimeState', () => {
  const initialScopes = [
    CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object' ? CORE_GLOBAL_SCOPE : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ].filter(Boolean);

  return createCoreRuntimeState(initialScopes);
});

if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
  try {
    Object.defineProperty(CORE_GLOBAL_SCOPE, '__cineCreateRuntimeState', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: createCoreRuntimeState,
    });
  } catch (exposeCreateStateError) {
    try {
      CORE_GLOBAL_SCOPE.__cineCreateRuntimeState = createCoreRuntimeState;
    } catch (assignCreateStateError) {
      void assignCreateStateError;
    }
    void exposeCreateStateError;
  }
}

const CORE_BOOT_QUEUE_KEY = (function resolveCoreBootQueueKey(scope) {
  const fallbackKey = '__coreRuntimeBootQueue';

  if (scope && typeof scope === 'object') {
    const existingHidden = scope.__cineCoreBootQueueKey;
    const existingPublic = scope.CORE_BOOT_QUEUE_KEY;

    if (typeof existingPublic === 'string' && existingPublic) {
      try {
        scope.__cineCoreBootQueueKey = existingPublic;
      } catch (syncError) {
        void syncError;
        scope.__cineCoreBootQueueKey = existingPublic;
      }
      return existingPublic;
    }

    if (typeof existingHidden === 'string' && existingHidden) {
      if (typeof scope.CORE_BOOT_QUEUE_KEY !== 'string' || !scope.CORE_BOOT_QUEUE_KEY) {
        try {
          scope.CORE_BOOT_QUEUE_KEY = existingHidden;
        } catch (shadowError) {
          void shadowError;
          scope.CORE_BOOT_QUEUE_KEY = existingHidden;
        }
      }
      return existingHidden;
    }
  }

  const resolvedKey = fallbackKey;

  if (scope && typeof scope === 'object') {
    try {
      scope.__cineCoreBootQueueKey = resolvedKey;
    } catch (hiddenAssignError) {
      void hiddenAssignError;
      scope.__cineCoreBootQueueKey = resolvedKey;
    }

    if (typeof scope.CORE_BOOT_QUEUE_KEY !== 'string' || !scope.CORE_BOOT_QUEUE_KEY) {
      try {
        scope.CORE_BOOT_QUEUE_KEY = resolvedKey;
      } catch (publicAssignError) {
        void publicAssignError;
        scope.CORE_BOOT_QUEUE_KEY = resolvedKey;
      }
    }
  }

  return resolvedKey;
})(CORE_GLOBAL_SCOPE);

const CORE_BOOT_QUEUE = (function bootstrapCoreBootQueue(existingQueue) {
  if (Array.isArray(existingQueue)) {
    return existingQueue;
  }

  if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
    const shared = CORE_GLOBAL_SCOPE.cineCoreShared;
    if (shared && typeof shared === 'object') {
      const sharedQueue = shared[CORE_BOOT_QUEUE_KEY];
      if (Array.isArray(sharedQueue)) {
        return sharedQueue;
      }
      if (Object.isExtensible(shared)) {
        shared[CORE_BOOT_QUEUE_KEY] = [];
        return shared[CORE_BOOT_QUEUE_KEY];
      }
    }

    if (!Array.isArray(CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE)) {
      CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = [];
    }
    return CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE;
  }

  return [];
})(CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE);

if (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE) {
  CORE_GLOBAL_SCOPE.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE;
}

function enqueueCoreBootTask(task) {
  if (typeof task === 'function') {
    CORE_BOOT_QUEUE.push(task);
  }
}

function isAutoGearGlobalReferenceError(error) {
  if (!CORE_RUNTIME_STATE || !CORE_RUNTIME_STATE.autoGearGuards) {
    return false;
  }

  const guard = CORE_RUNTIME_STATE.autoGearGuards.isReferenceError;
  if (typeof guard !== 'function') {
    return false;
  }

  try {
    return guard(error) === true;
  } catch (guardError) {
    void guardError;
  }

  return false;
}

function repairAutoGearGlobals(scope) {
  if (!CORE_RUNTIME_STATE || !CORE_RUNTIME_STATE.autoGearGuards) {
    return;
  }

  const repair = CORE_RUNTIME_STATE.autoGearGuards.repair;
  if (typeof repair !== 'function') {
    return;
  }

  try {
    repair(scope);
  } catch (repairError) {
    void repairError;
  }
}

function callCoreFunctionIfAvailable(functionName, args = [], options = {}) {
  const scope =
    CORE_GLOBAL_SCOPE ||
    (typeof globalThis !== 'undefined' ? globalThis : null) ||
    (typeof window !== 'undefined' ? window : null) ||
    (typeof self !== 'undefined' ? self : null) ||
    (typeof global !== 'undefined' ? global : null);

  const target =
    typeof functionName === 'string'
      ? scope && scope[functionName]
      : functionName;

  if (typeof target === 'function') {
    let attempt = 0;
    while (attempt < 2) {
        try {
          return target.apply(scope, args);
        } catch (invokeError) {
          if (attempt === 0 && isAutoGearGlobalReferenceError(invokeError)) {
            repairAutoGearGlobals(scope);
            attempt += 1;
            continue;
          }

        if (typeof console !== 'undefined' && typeof console.error === 'function') {
          console.error(`Failed to invoke ${functionName}`, invokeError);
        }
        break;
      }
    }
    return undefined;
  }

  if (options && options.defer === true) {
    enqueueCoreBootTask(() => {
      callCoreFunctionIfAvailable(functionName, args, { ...options, defer: false });
    });
  }

  return typeof options !== 'undefined' && Object.prototype.hasOwnProperty.call(options, 'defaultValue')
    ? options.defaultValue
    : undefined;
}

const GRID_SNAP_STATE_STORAGE_KEY = '__cineGridSnapState';

function getGridSnapStateScopes() {
  if (CORE_RUNTIME_STATE && typeof CORE_RUNTIME_STATE.getScopes === 'function') {
    try {
      return CORE_RUNTIME_STATE.getScopes();
    } catch (scopeReadError) {
      void scopeReadError;
    }
  }

  const fallbackScopes = [];
  const candidates = [
    CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object' ? CORE_GLOBAL_SCOPE : null,
    typeof globalThis !== 'undefined' && typeof globalThis === 'object' ? globalThis : null,
    typeof window !== 'undefined' && typeof window === 'object' ? window : null,
    typeof self !== 'undefined' && typeof self === 'object' ? self : null,
    typeof global !== 'undefined' && typeof global === 'object' ? global : null,
  ];

  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (candidate && fallbackScopes.indexOf(candidate) === -1) {
      fallbackScopes.push(candidate);
    }
  }

  return fallbackScopes;
}

function normaliseGridSnapPreference(value, fallback = false) {
  if (value === true || value === false) {
    return value === true;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      return fallback;
    }
    if (['true', '1', 'yes', 'on', 'enabled', 'enable'].includes(normalized)) {
      return true;
    }
    if (['false', '0', 'no', 'off', 'disabled', 'disable'].includes(normalized)) {
      return false;
    }
    return fallback;
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return fallback;
    }
    return value > 0;
  }
  if (value && typeof value === 'object') {
    if (Object.prototype.hasOwnProperty.call(value, 'enabled')) {
      return normaliseGridSnapPreference(value.enabled, fallback);
    }
    if (Object.prototype.hasOwnProperty.call(value, 'value')) {
      return normaliseGridSnapPreference(value.value, fallback);
    }
  }
  return fallback;
}

function readInitialGridSnapPreference() {
  const scopes = getGridSnapStateScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      if (Object.prototype.hasOwnProperty.call(scope, GRID_SNAP_STATE_STORAGE_KEY)) {
        const stored = scope[GRID_SNAP_STATE_STORAGE_KEY];
        const normalized = normaliseGridSnapPreference(stored, undefined);
        if (typeof normalized === 'boolean') {
          return normalized;
        }
      }
    } catch (storageReadError) {
      void storageReadError;
    }

    try {
      if (Object.prototype.hasOwnProperty.call(scope, 'gridSnap')) {
        const legacy = scope.gridSnap;
        const normalizedLegacy = normaliseGridSnapPreference(legacy, undefined);
        if (typeof normalizedLegacy === 'boolean') {
          return normalizedLegacy;
        }
      }
    } catch (legacyReadError) {
      void legacyReadError;
    }
  }

  return undefined;
}

let gridSnapState = normaliseGridSnapPreference(readInitialGridSnapPreference(), false);
gridSnap = gridSnapState;
function syncGridSnapStateToScopes(value, originScope = null) {
  const scopes = getGridSnapStateScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || typeof scope !== 'object') {
      continue;
    }

    try {
      scope[GRID_SNAP_STATE_STORAGE_KEY] = value;
    } catch (assignStorageError) {
      try {
        Object.defineProperty(scope, GRID_SNAP_STATE_STORAGE_KEY, {
          configurable: true,
          writable: true,
          value,
        });
      } catch (defineStorageError) {
        void defineStorageError;
      }
    }

    if (originScope === scope) {
      continue;
    }

    try {
      scope.gridSnap = value;
    } catch (assignLegacyError) {
      try {
        Object.defineProperty(scope, 'gridSnap', {
          configurable: true,
          writable: true,
          value,
        });
      } catch (defineLegacyError) {
        void defineLegacyError;
      }
    }
  }

  gridSnap = value;
  return value;
}

function getGridSnapState() {
  return gridSnapState;
}

function setGridSnapState(value) {
  const normalized = normaliseGridSnapPreference(value, gridSnapState);
  gridSnapState = normalized;
  syncGridSnapStateToScopes(normalized);
  return gridSnapState;
}

function applyLegacyGridSnapValue(value) {
  const normalized = normaliseGridSnapPreference(value, gridSnapState);
  gridSnapState = normalized;
  gridSnap = normalized;
  return gridSnapState;
}

exposeCoreRuntimeConstant('applyLegacyGridSnapValue', applyLegacyGridSnapValue);

syncGridSnapStateToScopes(gridSnapState);

function safeFormatAutoGearItemSummary(item, options = {}) {
  if (typeof formatAutoGearItemSummary === 'function') {
    try {
      return formatAutoGearItemSummary(item, options);
    } catch (formatError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to format automatic gear item summary via direct formatter.', formatError);
      }
    }
  }

  const fallback = callCoreFunctionIfAvailable(
    'formatAutoGearItemSummary',
    [item, options],
    { defaultValue: '' },
  );

  if (typeof fallback === 'string') {
    return fallback;
  }
  if (fallback === null || typeof fallback === 'undefined') {
    return '';
  }
  try {
    return String(fallback);
  } catch (coerceError) {
    void coerceError;
    return '';
  }
}

function formatWithPlaceholdersSafe(template, ...values) {
  if (typeof formatWithPlaceholders === 'function') {
    try {
      return formatWithPlaceholders(template, ...values);
    } catch (formatError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to format placeholder template via direct formatter.', formatError);
      }
    }
  }

  const fallback = callCoreFunctionIfAvailable(
    'formatWithPlaceholders',
    [template, ...values],
    { defaultValue: null },
  );

  if (typeof fallback === 'string' && fallback) {
    return fallback;
  }

  let formatted = typeof template === 'string' ? template : String(template || '');
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    formatted = formatted.replace('%s', value);
  }
  return formatted;
}

(function ensureCoreRuntimePlaceholders() {
  const scope =
    CORE_GLOBAL_SCOPE ||
    (typeof globalThis !== 'undefined' ? globalThis : null) ||
    (typeof window !== 'undefined' ? window : null) ||
    (typeof self !== 'undefined' ? self : null) ||
    (typeof global !== 'undefined' ? global : null);

  if (!scope || typeof scope !== 'object') {
    return;
  }

  if (typeof scope.populateSelect !== 'function') {
    const placeholder = function populateSelectPlaceholder(selectElem, optionsObj = {}, includeNone = true) {
      if (!selectElem) {
        return;
      }

      const opts = optionsObj && typeof optionsObj === 'object' ? optionsObj : {};

      try {
        selectElem.innerHTML = '';
        if (includeNone) {
          const noneOpt = document.createElement('option');
          noneOpt.value = 'None';
          const noneMap = { de: 'Keine Auswahl', es: 'Ninguno', fr: 'Aucun' };
          const lang = typeof currentLang === 'string' ? currentLang : 'en';
          noneOpt.textContent = noneMap[lang] || 'None';
          selectElem.appendChild(noneOpt);
        }

        Object.keys(opts)
          .filter(name => name !== 'None')
          .sort(typeof localeSort === 'function' ? localeSort : undefined)
          .forEach(name => {
            const opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            selectElem.appendChild(opt);
          });
      } catch (populateError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('populateSelect placeholder failed to render options immediately', populateError);
        }
      }

      enqueueCoreBootTask(() => {
        const realPopulate =
          scope && typeof scope.populateSelect === 'function' && scope.populateSelect !== placeholder
            ? scope.populateSelect
            : null;
        if (realPopulate) {
          realPopulate(selectElem, optionsObj, includeNone);
        }
      });
    };

    try {
      scope.populateSelect = placeholder;
    } catch (assignError) {
      void assignError;
    }
  }

  const ensureFunctionPlaceholder = (name) => {
    if (typeof name !== 'string' || !name) {
      return;
    }
    if (typeof scope[name] === 'function') {
      return;
    }

    const placeholder = function coreDeferredFunctionPlaceholder(...args) {
      return callCoreFunctionIfAvailable(name, args, { defer: true });
    };

    try {
      scope[name] = placeholder;
    } catch (assignError) {
      void assignError;
    }
  };

  ensureFunctionPlaceholder('checkSetupChanged');
  ensureFunctionPlaceholder('updateCalculations');

  if (typeof scope.feedbackCancelBtn === 'undefined') {
    try {
      scope.feedbackCancelBtn = null;
    } catch (assignError) {
      void assignError;
    }
  }
})();

function fallbackStableStringify(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    return `[${value.map(item => fallbackStableStringify(item)).join(',')}]`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value).sort();
    const entries = keys.map(key => `${JSON.stringify(key)}:${fallbackStableStringify(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  return JSON.stringify(value);
}

const FALLBACK_HUMANIZE_OVERRIDES_PART1 = {
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

function fallbackHumanizeKey(key) {
  if (key && Object.prototype.hasOwnProperty.call(FALLBACK_HUMANIZE_OVERRIDES_PART1, key)) {
    return FALLBACK_HUMANIZE_OVERRIDES_PART1[key];
  }

  const stringValue = typeof key === 'string' ? key : String(key || '');
  return stringValue
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase());
}

var stableStringify = typeof CORE_SHARED.stableStringify === 'function'
  ? CORE_SHARED.stableStringify
  : fallbackStableStringify;

const humanizeKey = typeof CORE_SHARED.humanizeKey === 'function'
  ? CORE_SHARED.humanizeKey
  : fallbackHumanizeKey;

function fallbackResolveConnectorSummaryGenerator() {
  const scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof global !== 'undefined') scopes.push(global);
  if (typeof self !== 'undefined') scopes.push(self);

  for (const scope of scopes) {
    if (scope && typeof scope.generateConnectorSummary === 'function') {
      return scope.generateConnectorSummary;
    }
  }

  return null;
}

const resolveConnectorSummaryGenerator = typeof CORE_SHARED.resolveConnectorSummaryGenerator === 'function'
  ? CORE_SHARED.resolveConnectorSummaryGenerator
  : fallbackResolveConnectorSummaryGenerator;

let sessionSafeGenerateConnectorSummary = typeof CORE_SHARED.safeGenerateConnectorSummary === 'function'
  ? CORE_SHARED.safeGenerateConnectorSummary
  : function safeGenerateConnectorSummary(device) {
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
    };

function fallbackNormalizeAutoGearWeightOperator(value) {
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
}

const normalizeAutoGearWeightOperator = typeof CORE_SHARED.normalizeAutoGearWeightOperator === 'function'
  ? CORE_SHARED.normalizeAutoGearWeightOperator
  : fallbackNormalizeAutoGearWeightOperator;

const normalizeAutoGearWeightValue = typeof CORE_SHARED.normalizeAutoGearWeightValue === 'function'
  ? CORE_SHARED.normalizeAutoGearWeightValue
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
    };

const normalizeAutoGearCameraWeightCondition = typeof CORE_SHARED.normalizeAutoGearCameraWeightCondition === 'function'
  ? CORE_SHARED.normalizeAutoGearCameraWeightCondition
  : function normalizeAutoGearCameraWeightCondition() {
      return null;
    };

const formatAutoGearWeight = typeof CORE_SHARED.formatAutoGearWeight === 'function'
  ? CORE_SHARED.formatAutoGearWeight
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
    };

const getAutoGearCameraWeightOperatorLabel = typeof CORE_SHARED.getAutoGearCameraWeightOperatorLabel === 'function'
  ? CORE_SHARED.getAutoGearCameraWeightOperatorLabel
  : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
      const textsForLang = langTexts || {};
      const fallbackTexts = (CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.texts && CORE_GLOBAL_SCOPE.texts.en) || {};
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
    };

const formatAutoGearCameraWeight = typeof CORE_SHARED.formatAutoGearCameraWeight === 'function'
  ? CORE_SHARED.formatAutoGearCameraWeight
  : function formatAutoGearCameraWeight(condition, langTexts) {
      if (!condition || !Number.isFinite(condition.value)) return '';
      const label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
      const formattedValue = formatAutoGearWeight(condition.value);
      return `${label} ${formattedValue} g`;
    };

// Use `var` here instead of `let` because `index.html` loads the lz-string
// library from a CDN which defines a global `LZString` variable. Using `let`
// would attempt to create a new lexical binding and throw a SyntaxError in
// browsers that already have the global property. `var` simply reuses the
// existing global variable if present.
var LZString = CORE_SHARED.LZString;
if (!LZString && typeof CORE_SHARED.getLZString === 'function') {
  LZString = CORE_SHARED.getLZString();
}
if (!LZString) {
  LZString = {
    compressToEncodedURIComponent: s => s,
    decompressFromEncodedURIComponent: s => s
  };
}

var generatePrintableOverview;
try {
  ({ generatePrintableOverview } = require('./overview.js'));
} catch {
  // overview generation not needed in test environments without module support
}

var APP_VERSION = typeof CORE_SHARED.APP_VERSION === 'string' ? CORE_SHARED.APP_VERSION : '1.0.13';

if (typeof window !== 'undefined') {
  const lottie = window.lottie;
  if (lottie && typeof lottie.useWebWorker === 'function') {
    try {
      lottie.useWebWorker(false);
    } catch (error) {
      console.warn('Unable to disable Lottie web workers', error);
    }
  }
}
var IOS_PWA_HELP_STORAGE_KEY = 'iosPwaHelpShown';
const INSTALL_BANNER_DISMISSED_KEY = 'installPromptDismissed';

function resolveInstallBannerGlobalScope() {
  if (typeof globalThis !== 'undefined' && globalThis) {
    return globalThis;
  }
  if (typeof window !== 'undefined' && window) {
    return window;
  }
  if (typeof self !== 'undefined' && self) {
    return self;
  }
  if (typeof global !== 'undefined' && global) {
    return global;
  }
  return null;
}

const installBannerGlobalScope = resolveInstallBannerGlobalScope();
if (
  installBannerGlobalScope
  && typeof installBannerGlobalScope.installBannerDismissedInSession !== 'boolean'
) {
  installBannerGlobalScope.installBannerDismissedInSession = false;
}

const HELP_MODULE_CACHE_KEY = '__cineResolvedHelpModule';

function createFallbackHelpModuleApi() {
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

function resolveHelpModuleApi() {
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

  if (globalScope && globalScope[HELP_MODULE_CACHE_KEY]) {
    return globalScope[HELP_MODULE_CACHE_KEY];
  }

  const fallback = createFallbackHelpModuleApi();

  const moduleBase =
    (typeof cineModuleBase === 'object' && cineModuleBase)
      || (globalScope && typeof globalScope.cineModuleBase === 'object' ? globalScope.cineModuleBase : null);

  let registry = null;
  if (moduleBase && typeof moduleBase.getModuleRegistry === 'function') {
    try {
      registry = moduleBase.getModuleRegistry(globalScope);
    } catch (error) {
      if (typeof moduleBase.safeWarn === 'function') {
        moduleBase.safeWarn('Failed to resolve cine.features.help module registry.', error);
      } else if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('Failed to resolve cine.features.help module registry.', error);
      }
    }
  }

  let resolved = null;
  if (registry && typeof registry.get === 'function') {
    try {
      resolved = registry.get('cine.features.help');
    } catch (error) {
      if (moduleBase && typeof moduleBase.safeWarn === 'function') {
        moduleBase.safeWarn('Failed to read cine.features.help module.', error);
      } else if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('Failed to read cine.features.help module.', error);
      }
    }
  }

  if (!resolved && globalScope && typeof globalScope.cineFeaturesHelp === 'object') {
    resolved = globalScope.cineFeaturesHelp;
  }

  const api = resolved && typeof resolved.isIosDevice === 'function' ? resolved : fallback;

  if (globalScope) {
    try {
      globalScope[HELP_MODULE_CACHE_KEY] = api;
    } catch (error) {
      void error;
    }
  }

  return api;
}

const helpModuleApi = resolveHelpModuleApi();

const DEVICE_SCHEMA_PATH = 'src/data/schema.json';
const DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
const AUTO_GEAR_RULES_KEY =
  typeof AUTO_GEAR_RULES_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_RULES_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearRules';
const AUTO_GEAR_ANY_MOTOR_TOKEN = '__any__';
if (typeof globalThis !== 'undefined') {
  globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN = AUTO_GEAR_ANY_MOTOR_TOKEN;
}
const AUTO_GEAR_SEEDED_KEY =
  typeof AUTO_GEAR_SEEDED_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_SEEDED_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearSeeded';
const AUTO_GEAR_BACKUPS_KEY =
  typeof AUTO_GEAR_BACKUPS_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_BACKUPS_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearBackups';
const AUTO_GEAR_PRESETS_KEY =
  typeof AUTO_GEAR_PRESETS_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_PRESETS_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearPresets';
const AUTO_GEAR_ACTIVE_PRESET_KEY =
  typeof AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearActivePreset';
const AUTO_GEAR_AUTO_PRESET_KEY =
  typeof AUTO_GEAR_AUTO_PRESET_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_AUTO_PRESET_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearAutoPreset';
const AUTO_GEAR_BACKUP_VISIBILITY_KEY =
  typeof AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearShowBackups';
const AUTO_GEAR_BACKUP_RETENTION_KEY =
  typeof AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_BACKUP_RETENTION_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearBackupRetention';
const AUTO_GEAR_MONITOR_DEFAULTS_KEY =
  typeof AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY !== 'undefined'
    ? AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY
    : 'cameraPowerPlanner_autoGearMonitorDefaults';
var AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
const AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE = resolveAutoGearBackupRetentionMin();
const AUTO_GEAR_BACKUP_RETENTION_DEFAULT = resolveAutoGearBackupRetentionDefault();
const AUTO_GEAR_BACKUP_RETENTION_MAX = 50;
const AUTO_GEAR_MULTI_SELECT_MIN_ROWS = 8;
const AUTO_GEAR_MULTI_SELECT_MAX_ROWS = 12;
const AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS = 1;
function resolveAutoGearBackupRetentionMin() {
  const fallback = 1;
  const scopeCandidates = [];

  if (typeof globalThis !== 'undefined') scopeCandidates.push(globalThis);
  if (typeof window !== 'undefined') scopeCandidates.push(window);
  if (typeof global !== 'undefined') scopeCandidates.push(global);
  if (typeof self !== 'undefined') scopeCandidates.push(self);

  for (const scope of scopeCandidates) {
    if (scope && typeof scope.AUTO_GEAR_BACKUP_RETENTION_MIN === 'number') {
      return scope.AUTO_GEAR_BACKUP_RETENTION_MIN;
    }
  }

  for (const scope of scopeCandidates) {
    if (!scope) continue;
    try {
      scope.AUTO_GEAR_BACKUP_RETENTION_MIN = fallback;
      return fallback;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to persist auto gear backup retention minimum to scope.', error);
      }
    }
  }

  return fallback;
}

function resolveAutoGearBackupRetentionDefault() {
  const fallback = 12;
  const min = AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE || 1;
  const max = 50;
  const normalizedFallback = Math.min(Math.max(Math.round(fallback), min), max);
  const scopeCandidates = [];

  if (typeof globalThis !== 'undefined') scopeCandidates.push(globalThis);
  if (typeof window !== 'undefined') scopeCandidates.push(window);
  if (typeof global !== 'undefined') scopeCandidates.push(global);
  if (typeof self !== 'undefined') scopeCandidates.push(self);

  for (const scope of scopeCandidates) {
    if (!scope || typeof scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT !== 'number') {
      continue;
    }
    const candidate = scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    if (!Number.isFinite(candidate)) {
      continue;
    }
    const normalized = Math.min(Math.max(Math.round(candidate), min), max);
    if (normalized !== candidate) {
      try {
        scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = normalized;
      } catch (error) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Unable to normalize auto gear backup retention default globally.', error);
        }
      }
    }
    return normalized;
  }

  for (const scope of scopeCandidates) {
    if (!scope) {
      continue;
    }
    try {
      scope.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = normalizedFallback;
      return normalizedFallback;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to persist auto gear backup retention default to scope.', error);
      }
    }
  }

  return normalizedFallback;
}

function resolveTemperatureStorageKey() {
  const scope =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
          ? global
          : undefined;

  const fallback = 'cameraPowerPlanner_temperatureUnit';
  const existing =
    scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string'
      ? scope.TEMPERATURE_UNIT_STORAGE_KEY
      : fallback;

  if (scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY !== 'string') {
    try {
      scope.TEMPERATURE_UNIT_STORAGE_KEY = existing;
    } catch (error) {
      void error;
    }
  }

  return existing;
}

const TEMPERATURE_STORAGE_KEY = resolveTemperatureStorageKey();
const TEMPERATURE_UNITS = {
  celsius: 'celsius',
  fahrenheit: 'fahrenheit'
};
const TEMPERATURE_SCENARIOS = [
  { celsius: 40, factor: 1.0, color: '#d9534f' },
  { celsius: 25, factor: 1.0, color: '#5cb85c' },
  { celsius: 0, factor: 0.8, color: '#f0ad4e' },
  { celsius: -10, factor: 0.625, color: '#5bc0de' },
  { celsius: -20, factor: 0.5, color: '#0275d8' }
];

function resolveLanguageCode(lang) {
  if (typeof lang === 'string' && lang.trim()) {
    return lang.trim();
  }
  if (typeof currentLang === 'string' && currentLang.trim()) {
    return currentLang;
  }
  return 'en';
}

function getLanguageTexts(lang) {
  const resolved = resolveLanguageCode(lang);
  const allTexts = (typeof texts !== 'undefined' && texts) || {};
  if (allTexts && typeof allTexts[resolved] === 'object') {
    return allTexts[resolved] || {};
  }
  if (allTexts && typeof allTexts.en === 'object') {
    return allTexts.en || {};
  }
  return {};
}

function formatNumberForLang(lang, value, options) {
  const resolved = resolveLanguageCode(lang);
  try {
    return new Intl.NumberFormat(resolved, options).format(value);
  } catch (firstError) {
    try {
      return new Intl.NumberFormat('en', options).format(value);
    } catch (fallbackError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Number formatting failed', firstError, fallbackError);
      }
      return String(value);
    }
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

function convertCelsiusToUnit(value, unit = temperatureUnit) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return Number.NaN;
  }
  const resolvedUnit = normalizeTemperatureUnit(unit);
  if (resolvedUnit === TEMPERATURE_UNITS.fahrenheit) {
    return (numeric * 9) / 5 + 32;
  }
  return numeric;
}

function getTemperatureUnitSymbolForLang(lang = currentLang, unit = temperatureUnit) {
  const resolvedUnit = normalizeTemperatureUnit(unit);
  const langTexts = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  const key =
    resolvedUnit === TEMPERATURE_UNITS.fahrenheit
      ? 'temperatureUnitSymbolFahrenheit'
      : 'temperatureUnitSymbolCelsius';
  return (
    langTexts[key]
    || fallbackTexts[key]
    || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C')
  );
}

function getTemperatureUnitLabelForLang(lang = currentLang, unit = temperatureUnit) {
  const resolvedUnit = normalizeTemperatureUnit(unit);
  const langTexts = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  const key =
    resolvedUnit === TEMPERATURE_UNITS.fahrenheit
      ? 'temperatureUnitFahrenheit'
      : 'temperatureUnitCelsius';
  return (
    langTexts[key]
    || fallbackTexts[key]
    || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)')
  );
}

function getTemperatureColumnLabelForLang(lang = currentLang, unit = temperatureUnit) {
  const langTexts = getLanguageTexts(lang);
  const fallbackTexts = getLanguageTexts('en');
  const baseLabel = langTexts.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
  const symbol = getTemperatureUnitSymbolForLang(lang, unit);
  return `${baseLabel} (${symbol})`;
}

function formatTemperatureForDisplay(celsius, options = {}) {
  const { unit = temperatureUnit, lang = currentLang, includeSign = true } = options || {};
  const resolvedUnit = normalizeTemperatureUnit(unit);
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
    maximumFractionDigits: fractionDigits,
  });
  let prefix = '';
  if (includeSign === 'none') {
    prefix = '';
  } else if (includeSign === false || includeSign === 'negative') {
    if (isNegative) {
      prefix = '\u2013';
    }
  } else if (isPositive) {
    prefix = '+';
  } else if (isNegative) {
    prefix = '\u2013';
  }
  const symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
  return `${prefix}${formatted} ${symbol}`;
}

function renderTemperatureNote(baseHours) {
  if (typeof document === 'undefined') {
    return;
  }
  const container = document.getElementById('temperatureNote');
  if (!container) {
    return;
  }
  const langTexts = getLanguageTexts(currentLang);
  const fallbackTexts = getLanguageTexts('en');
  const heading = langTexts.temperatureNoteHeading || fallbackTexts.temperatureNoteHeading || '';
  let html = heading ? `<p>${heading}</p>` : '';
  if (!baseHours || !Number.isFinite(baseHours)) {
    container.innerHTML = html;
    return;
  }
  const temperatureHeader = getTemperatureColumnLabelForLang(currentLang, temperatureUnit);
  const runtimeHeader = langTexts.runtimeLabel || fallbackTexts.runtimeLabel || 'Runtime';
  const batteryHeader = langTexts.batteryCountTempLabel || fallbackTexts.batteryCountTempLabel || 'Batteries';
  html += `<table><tr><th>${temperatureHeader}</th><th>${runtimeHeader}</th><th>${batteryHeader}</th></tr>`;
  TEMPERATURE_SCENARIOS.forEach(scenario => {
    const runtime = baseHours * scenario.factor;
    const runtimeCell = Number.isFinite(runtime) ? runtime.toFixed(2) : '0.00';
    let batteries = '–';
    if (Number.isFinite(runtime) && runtime > 0) {
      batteries = String(Math.ceil(10 / runtime));
    }
    const temperatureCell = formatTemperatureForDisplay(scenario.celsius);
    html += `<tr><td style="color:${scenario.color}">${temperatureCell}</td><td>${runtimeCell}</td><td>${batteries}</td></tr>`;
  });
  html += '</table>';
  container.innerHTML = html;
}

function ensureFeedbackTemperatureOptions(select) {
  if (!select) return;
  const expectedOptions = FEEDBACK_TEMPERATURE_MAX - FEEDBACK_TEMPERATURE_MIN + 2;
  if (select.options.length === expectedOptions) {
    return;
  }
  const previousValue = select.value;
  select.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  emptyOpt.textContent = '';
  select.appendChild(emptyOpt);
  for (let temp = FEEDBACK_TEMPERATURE_MIN; temp <= FEEDBACK_TEMPERATURE_MAX; temp += 1) {
    const opt = document.createElement('option');
    opt.value = String(temp);
    select.appendChild(opt);
  }
  if (previousValue) {
    select.value = previousValue;
  }
}

function updateFeedbackTemperatureOptions(lang = currentLang, unit = temperatureUnit) {
  if (typeof document === 'undefined') {
    return;
  }
  const tempSelect = document.getElementById('fbTemperature');
  if (!tempSelect) return;
  ensureFeedbackTemperatureOptions(tempSelect);
  Array.from(tempSelect.options).forEach(option => {
    if (!option) return;
    if (option.value === '') {
      option.textContent = '';
      return;
    }
    const celsiusValue = Number(option.value);
    if (!Number.isFinite(celsiusValue)) return;
    option.textContent = formatTemperatureForDisplay(celsiusValue, {
      lang,
      unit,
      includeSign: 'negative',
    });
  });
}

function updateFeedbackTemperatureLabel(lang = currentLang, unit = temperatureUnit) {
  if (typeof document === 'undefined') {
    return;
  }
  const labelTextElem = document.getElementById('fbTemperatureLabelText');
  const labelElem = document.getElementById('fbTemperatureLabel');
  const label = `${getTemperatureColumnLabelForLang(lang, unit)}:`;
  if (labelTextElem) {
    labelTextElem.textContent = label;
  } else if (labelElem) {
    labelElem.textContent = label;
  }
}

function refreshFeedbackTemperatureLabel(lang = currentLang, unit = temperatureUnit) {
  let handled = false;
  try {
    if (typeof updateFeedbackTemperatureLabel === 'function') {
      updateFeedbackTemperatureLabel(lang, unit);
      handled = true;
    }
  } catch (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Fallback applied while updating feedback temperature label', error);
    }
  }

  if (handled) {
    return;
  }

  const labelTextElem = typeof document !== 'undefined'
    ? document.getElementById('fbTemperatureLabelText')
    : null;
  const labelElem = typeof document !== 'undefined'
    ? document.getElementById('fbTemperatureLabel')
    : null;
  if (!labelTextElem && !labelElem) {
    return;
  }
  const label = `${getTemperatureColumnLabelForLang(lang, unit)}:`;
  if (labelTextElem) {
    labelTextElem.textContent = label;
  } else if (labelElem) {
    labelElem.textContent = label;
  }
}

function applyTemperatureUnitPreference(unit, options = {}) {
  const normalized = normalizeTemperatureUnit(unit);
  const { persist = true, reRender = true, forceUpdate = false } = options || {};
  if (!forceUpdate && temperatureUnit === normalized) {
    return;
  }
  temperatureUnit = normalized;
  if (persist && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(TEMPERATURE_STORAGE_KEY, temperatureUnit);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save temperature unit preference', error);
      }
    }
  }
  if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
    settingsTemperatureUnit.value = temperatureUnit;
  }
  if (reRender) {
    refreshFeedbackTemperatureLabel();
    updateFeedbackTemperatureOptions();
    renderTemperatureNote(lastRuntimeHours);
  }
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
var localeSort = (a, b) => collator.compare(a, b);

const DEVICE_GLOBAL_SCOPE =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : undefined;

function updateGlobalDevicesReference(value) {
  if (!DEVICE_GLOBAL_SCOPE) {
    return;
  }

  try {
    DEVICE_GLOBAL_SCOPE.devices = value;
  } catch (assignError) {
    try {
      Object.defineProperty(DEVICE_GLOBAL_SCOPE, 'devices', {
        configurable: true,
        writable: true,
        value
      });
    } catch (defineError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose device database globally.', defineError);
      }
    }
  }
}

function initializeDeviceDatabase() {
  if (DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && typeof DEVICE_GLOBAL_SCOPE.devices === 'object') {
    return DEVICE_GLOBAL_SCOPE.devices;
  }

  if (typeof require === 'function') {
    try {
      const requiredDevices = require('../data');
      if (requiredDevices && typeof requiredDevices === 'object') {
        updateGlobalDevicesReference(requiredDevices);
        return requiredDevices;
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to load bundled device data.', error);
      }
    }
  }

  const fallback = {};
  updateGlobalDevicesReference(fallback);
  return fallback;
}

// Ensure the global `devices` reference always exists before any other logic
// accesses it. This avoids temporal dead zone errors in browsers that treat
// top-level bindings as lexical declarations.
var devices = initializeDeviceDatabase();

const FEEDBACK_TEMPERATURE_MIN = -20;
const FEEDBACK_TEMPERATURE_MAX = 50;
var temperatureUnit = TEMPERATURE_UNITS.celsius;
var autoGearBackupDateFormatter =
  typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function'
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

var newCategorySelect;
var newSubcategorySelect;
var subcategoryFieldDiv;
var newNameInput;
var newWattInput;
var wattFieldDiv;
let dynamicFieldsDiv;
var cameraFieldsDiv;
var cameraWattInput;
var cameraVoltageInput;
var cameraPortTypeInput;
var monitorFieldsDiv;
var monitorScreenSizeInput;
var monitorBrightnessInput;
var monitorWattInput;
var monitorVoltageInput;
var monitorPortTypeInput;
let monitorVideoInputsContainer;

try {
  if (typeof localStorage !== 'undefined') {
    const storedTemperatureUnit = localStorage.getItem(TEMPERATURE_STORAGE_KEY);
    if (storedTemperatureUnit) {
      temperatureUnit = normalizeTemperatureUnit(storedTemperatureUnit);
    }
  }
} catch (error) {
  console.warn('Could not load temperature unit preference', error);
}

var SUPPORTED_MOUNT_VOLTAGE_TYPES = (function resolveSupportedMounts() {
  if (
    CORE_GLOBAL_SCOPE &&
    Array.isArray(CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES) &&
    CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0
  ) {
    return CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES;
  }

  const created = Object.freeze(['V-Mount', 'Gold-Mount', 'B-Mount']);
  if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
    try {
      CORE_GLOBAL_SCOPE.SUPPORTED_MOUNT_VOLTAGE_TYPES = created;
    } catch (assignError) {
      void assignError;
    }
  }
  return created;
})();

  const MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK = 'cameraPowerPlanner_mountVoltages';
  let cachedMountVoltagePrimaryKey = '';
  let cachedMountVoltageBackupKey = '';
  let mountVoltageKeysResolved = false;

  const readGlobalMountVoltageKey = (property) => {
    if (!CORE_GLOBAL_SCOPE || typeof CORE_GLOBAL_SCOPE !== 'object') {
      return '';
    }
    const value = CORE_GLOBAL_SCOPE[property];
    return typeof value === 'string' && value ? value : '';
  };

  const assignGlobalMountVoltageKey = (property, value) => {
    if (!CORE_GLOBAL_SCOPE || typeof CORE_GLOBAL_SCOPE !== 'object') {
      return;
    }
    if (typeof value !== 'string' || !value) {
      return;
    }

    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(CORE_GLOBAL_SCOPE, property);
    } catch (descriptorError) {
      descriptor = null;
      void descriptorError;
    }

    if (descriptor && descriptor.configurable === false && descriptor.writable === false) {
      return;
    }

    try {
      CORE_GLOBAL_SCOPE[property] = value;
    } catch (assignError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(`Unable to expose ${property} globally`, assignError);
      }
    }
  };

  const resolveMountVoltageStorageKeys = () => {
    if (mountVoltageKeysResolved) {
      return;
    }

    let resolvedPrimary =
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY') ||
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED');

    if (!resolvedPrimary && typeof getMountVoltageStorageKeyName === 'function') {
      try {
        const resolvedKey = getMountVoltageStorageKeyName();
        if (typeof resolvedKey === 'string' && resolvedKey) {
          resolvedPrimary = resolvedKey;
        }
      } catch (mountVoltageKeyError) {
        console.warn('Unable to resolve mount voltage storage key name', mountVoltageKeyError);
      }
    }

    if (!resolvedPrimary && typeof MOUNT_VOLTAGE_STORAGE_KEY_NAME === 'string' && MOUNT_VOLTAGE_STORAGE_KEY_NAME) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_NAME;
    }

    if (!resolvedPrimary) {
      resolvedPrimary = MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    }

    let resolvedBackup =
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY') ||
      readGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED');

    if (!resolvedBackup && typeof getMountVoltageStorageBackupKeyName === 'function') {
      try {
        const backupKeyName = getMountVoltageStorageBackupKeyName();
        if (typeof backupKeyName === 'string' && backupKeyName) {
          resolvedBackup = backupKeyName;
        }
      } catch (backupKeyError) {
        console.warn('Unable to resolve mount voltage storage backup key name', backupKeyError);
      }
    }

    if (!resolvedBackup && resolvedPrimary) {
      resolvedBackup = `${resolvedPrimary}__backup`;
    }

    cachedMountVoltagePrimaryKey = resolvedPrimary || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
    cachedMountVoltageBackupKey = resolvedBackup || `${cachedMountVoltagePrimaryKey}__backup`;
    mountVoltageKeysResolved = true;

    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_KEY_RESOLVED', cachedMountVoltagePrimaryKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY', cachedMountVoltageBackupKey);
    assignGlobalMountVoltageKey('MOUNT_VOLTAGE_STORAGE_BACKUP_KEY_RESOLVED', cachedMountVoltageBackupKey);
  };

  const getMountVoltagePrimaryStorageKey = () => {
    if (!mountVoltageKeysResolved) {
      resolveMountVoltageStorageKeys();
    }
    return cachedMountVoltagePrimaryKey || MOUNT_VOLTAGE_STORAGE_KEY_FALLBACK;
  };

  const getMountVoltageBackupStorageKey = () => {
    if (!mountVoltageKeysResolved) {
      resolveMountVoltageStorageKeys();
    }
    return cachedMountVoltageBackupKey || `${getMountVoltagePrimaryStorageKey()}__backup`;
  };

var DEFAULT_MOUNT_VOLTAGES = (function resolveDefaultMountVoltages() {
  if (
    CORE_GLOBAL_SCOPE &&
    CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES &&
    typeof CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES === 'object'
  ) {
    return CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES;
  }

  const defaults = Object.freeze({
    'V-Mount': Object.freeze({ high: 14.4, low: 12 }),
    'Gold-Mount': Object.freeze({ high: 14.4, low: 12 }),
    'B-Mount': Object.freeze({ high: 33.6, low: 21.6 }),
  });

  if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
    try {
      CORE_GLOBAL_SCOPE.DEFAULT_MOUNT_VOLTAGES = defaults;
    } catch (assignError) {
      void assignError;
    }
  }

  return defaults;
})();
const TOTAL_CURRENT_LABEL_FALLBACK = 'Total Current (at {voltage}V):';
const TOTAL_CURRENT_HELP_HIGH_FALLBACK = 'Current draw at the battery\'s main output ({voltage}V).';
const TOTAL_CURRENT_HELP_LOW_FALLBACK = 'Current draw at auxiliary outputs ({voltage}V).';

let mountVoltagePreferences = cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
let mountVoltageInputs = null;
let mountVoltageSectionElem = null;
let mountVoltageHeadingElem = null;
let mountVoltageDescriptionElem = null;
let mountVoltageNoteElem = null;
let mountVoltageResetButton =
  (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && CORE_GLOBAL_SCOPE.mountVoltageResetButton)
    ? CORE_GLOBAL_SCOPE.mountVoltageResetButton
    : (typeof globalThis !== 'undefined' && globalThis && globalThis.mountVoltageResetButton)
      ? globalThis.mountVoltageResetButton
      : null;
let mountVoltageTitleElems = null;

function syncMountVoltageResetButtonGlobal(value) {
  const targetScope =
    (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE)
      ? CORE_GLOBAL_SCOPE
      : (typeof globalThis !== 'undefined' && globalThis)
        ? globalThis
        : (typeof window !== 'undefined' && window)
          ? window
          : (typeof self !== 'undefined' && self)
            ? self
            : (typeof global !== 'undefined' && global)
              ? global
              : null;
  if (!targetScope || typeof targetScope !== 'object') {
    return;
  }
  try {
    targetScope.mountVoltageResetButton = value;
  } catch (assignError) {
    void assignError;
    targetScope.mountVoltageResetButton = value;
  }
}

syncMountVoltageResetButtonGlobal(mountVoltageResetButton);

function parseVoltageValue(value, fallback) {
  let numeric = Number.NaN;
  if (typeof value === 'number') {
    numeric = value;
  } else if (typeof value === 'string') {
    const normalized = value.replace(',', '.');
    numeric = Number.parseFloat(normalized);
  }
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  if (numeric <= 0) {
    return fallback;
  }
  const clamped = Math.min(1000, Math.max(0.1, numeric));
  return Math.round(clamped * 100) / 100;
}

function cloneMountVoltageMap(source = DEFAULT_MOUNT_VOLTAGES) {
  const result = {};
  SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
    const entry = source && source[type] ? source[type] : DEFAULT_MOUNT_VOLTAGES[type];
    const high = parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[type].high);
    const low = parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[type].low);
    result[type] = { high, low };
  });
  return result;
}

function normalizeMountVoltageSource(source) {
  if (!source || typeof source !== 'object') {
    return cloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
  }
  return cloneMountVoltageMap(source);
}

function parseStoredMountVoltages(raw) {
  if (!raw) {
    return null;
  }
  try {
    if (typeof raw === 'string') {
      const parsed = JSON.parse(raw);
      return normalizeMountVoltageSource(parsed);
    }
    return normalizeMountVoltageSource(raw);
  } catch (error) {
    console.warn('Could not parse stored mount voltages', error);
    return null;
  }
}

function getDefaultMountKey(mount) {
  if (SUPPORTED_MOUNT_VOLTAGE_TYPES.includes(mount)) {
    return mount;
  }
  return 'V-Mount';
}

function getMountVoltageConfig(mount) {
  const key = getDefaultMountKey(mount);
  const entry = mountVoltagePreferences[key] || DEFAULT_MOUNT_VOLTAGES[key];
  return {
    high: parseVoltageValue(entry && entry.high, DEFAULT_MOUNT_VOLTAGES[key].high),
    low: parseVoltageValue(entry && entry.low, DEFAULT_MOUNT_VOLTAGES[key].low),
  };
}

function getActiveMountVoltageConfig() {
  const plate = getSelectedPlate();
  return getMountVoltageConfig(plate);
}

function formatVoltageForDisplay(voltage, lang = currentLang) {
  const numeric = Number(voltage);
  if (!Number.isFinite(numeric)) {
    return '';
  }
  const options = {
    maximumFractionDigits: 2,
    minimumFractionDigits: numeric % 1 === 0 ? 0 : 1,
  };
  if (typeof formatNumberForLang === 'function') {
    try {
      return formatNumberForLang(lang, numeric, options);
    } catch (error) {
      console.warn('formatNumberForLang failed for voltage display', error);
    }
  }
  try {
    const formatter = new Intl.NumberFormat(lang, options);
    return formatter.format(numeric);
  } catch (intlError) {
    void intlError;
  }
  return numeric.toFixed(options.minimumFractionDigits);
}

function getMountVoltagePreferencesClone() {
  return cloneMountVoltageMap(mountVoltagePreferences);
}

function persistMountVoltagePreferences(preferences) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  let serialized;
  try {
    serialized = JSON.stringify(preferences);
  } catch (serializationError) {
    console.warn('Could not serialize mount voltage preferences', serializationError);
    return;
  }

    const primaryMountVoltageKey = getMountVoltagePrimaryStorageKey();
    try {
      localStorage.setItem(primaryMountVoltageKey, serialized);
    } catch (storageError) {
      console.warn('Could not save mount voltage preferences', storageError);
    }

    const backupMountVoltageKey = getMountVoltageBackupStorageKey();
    try {
      localStorage.setItem(backupMountVoltageKey, serialized);
    } catch (backupError) {
      console.warn('Could not save mount voltage backup copy', backupError);
    }
}

const MOUNT_VOLTAGE_RUNTIME_EXPORTS = Object.freeze({
  // Mount voltage helpers must stay globally accessible for autosave/share flows.
  SUPPORTED_MOUNT_VOLTAGE_TYPES,
  DEFAULT_MOUNT_VOLTAGES,
  mountVoltageInputs,
  parseVoltageValue,
  cloneMountVoltageMap,
  getMountVoltagePreferencesClone,
  applyMountVoltagePreferences,
  parseStoredMountVoltages,
  resetMountVoltagePreferences,
  updateMountVoltageInputsFromState,
  persistMountVoltagePreferences,
});

// Immediately expose mount voltage helpers so downstream layers can recover even if
// subsequent refactors adjust the consolidated runtime export list. This keeps
// autosave/share/backup flows functional when the runtime is split across files.
exposeCoreRuntimeConstants(MOUNT_VOLTAGE_RUNTIME_EXPORTS);

function applyMountVoltagePreferences(preferences, options = {}) {
  const { persist = true, triggerUpdate = true } = options || {};
  mountVoltagePreferences = normalizeMountVoltageSource(preferences);
  if (persist) {
    persistMountVoltagePreferences(mountVoltagePreferences);
  }
  if (triggerUpdate) {
    updateMountVoltageInputsFromState();
    refreshTotalCurrentLabels(currentLang);
    if (typeof updateCalculations === 'function') {
      try {
        updateCalculations();
      } catch (calcError) {
        console.warn('Failed to refresh calculations after voltage change', calcError);
      }
    }
  }
}

function resetMountVoltagePreferences(options = {}) {
  applyMountVoltagePreferences(DEFAULT_MOUNT_VOLTAGES, options);
}

function formatVoltageInputValue(value) {
  return Number.isFinite(value) ? String(Math.round(Number(value) * 100) / 100) : '';
}

function updateMountVoltageInputsFromState() {
  if (!mountVoltageInputs) {
    return;
  }
  const preferences = mountVoltagePreferences || DEFAULT_MOUNT_VOLTAGES;
  SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
    const fields = mountVoltageInputs[type];
    if (!fields) return;
    const entry = preferences[type] || DEFAULT_MOUNT_VOLTAGES[type];
    if (fields.high) {
      fields.high.value = formatVoltageInputValue(entry && entry.high);
    }
    if (fields.low) {
      fields.low.value = formatVoltageInputValue(entry && entry.low);
    }
  });
}

function getTemplateString(lang, key, fallback) {
  const localeTexts = texts && texts[lang] ? texts[lang] : null;
  const defaultTexts = texts && texts.en ? texts.en : null;
  if (localeTexts && typeof localeTexts[key] === 'string') {
    return localeTexts[key];
  }
  if (defaultTexts && typeof defaultTexts[key] === 'string') {
    return defaultTexts[key];
  }
  return fallback;
}

function renderVoltageTemplate(template, voltage, lang, fallback) {
  const formatted = formatVoltageForDisplay(voltage, lang);
  const source = typeof template === 'string' && template.includes('{voltage}')
    ? template
    : fallback;
  if (typeof source !== 'string') {
    return formatted ? `${formatted} V` : '';
  }
  return source.replace('{voltage}', formatted);
}

function refreshTotalCurrentLabels(lang = currentLang, mount = null, voltages = null) {
  if (typeof document === 'undefined') {
    return;
  }
  const highLabelElem = document.getElementById('totalCurrent144Label');
  const lowLabelElem = document.getElementById('totalCurrent12Label');
  if (!highLabelElem || !lowLabelElem) {
    return;
  }
  const effectiveMount = mount || getSelectedPlate();
  const config = voltages || getMountVoltageConfig(effectiveMount);
  const highTemplate = getTemplateString(lang, 'totalCurrentHighLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
  const lowTemplate = getTemplateString(lang, 'totalCurrentLowLabelTemplate', TOTAL_CURRENT_LABEL_FALLBACK);
  const highHelpTemplate = getTemplateString(lang, 'totalCurrentHighHelpTemplate', TOTAL_CURRENT_HELP_HIGH_FALLBACK);
  const lowHelpTemplate = getTemplateString(lang, 'totalCurrentLowHelpTemplate', TOTAL_CURRENT_HELP_LOW_FALLBACK);
  highLabelElem.textContent = renderVoltageTemplate(highTemplate, config.high, lang, TOTAL_CURRENT_LABEL_FALLBACK);
  lowLabelElem.textContent = renderVoltageTemplate(lowTemplate, config.low, lang, TOTAL_CURRENT_LABEL_FALLBACK);
  highLabelElem.setAttribute(
    'data-help',
    renderVoltageTemplate(highHelpTemplate, config.high, lang, TOTAL_CURRENT_HELP_HIGH_FALLBACK)
  );
  lowLabelElem.setAttribute(
    'data-help',
    renderVoltageTemplate(lowHelpTemplate, config.low, lang, TOTAL_CURRENT_HELP_LOW_FALLBACK)
  );
}

function updateMountVoltageSettingLabels(lang = currentLang) {
  const localeTexts = texts && texts[lang] ? texts[lang] : texts.en;
  if (!localeTexts) return;
  if (mountVoltageHeadingElem) {
    mountVoltageHeadingElem.textContent = localeTexts.mountVoltageSettingsHeading
      || texts.en?.mountVoltageSettingsHeading
      || 'Battery mount voltages';
    const helpText = localeTexts.mountVoltageSettingsHelp
      || texts.en?.mountVoltageSettingsHelp
      || '';
    if (helpText) {
      mountVoltageHeadingElem.setAttribute('data-help', helpText);
    }
  }
  if (mountVoltageDescriptionElem) {
    mountVoltageDescriptionElem.textContent = localeTexts.mountVoltageDescription
      || texts.en?.mountVoltageDescription
      || '';
  }
  if (mountVoltageNoteElem) {
    mountVoltageNoteElem.textContent = localeTexts.mountVoltageNote
      || texts.en?.mountVoltageNote
      || '';
  }
  if (mountVoltageResetButton) {
    mountVoltageResetButton.textContent = localeTexts.mountVoltageReset
      || texts.en?.mountVoltageReset
      || 'Restore defaults';
    const resetHelp = localeTexts.mountVoltageResetHelp
      || texts.en?.mountVoltageResetHelp
      || '';
    if (resetHelp) {
      mountVoltageResetButton.setAttribute('data-help', resetHelp);
    }
  }
  if (mountVoltageTitleElems) {
    if (mountVoltageTitleElems.V) {
      mountVoltageTitleElems.V.textContent = localeTexts.mountVoltageCardLabelV
        || texts.en?.mountVoltageCardLabelV
        || 'V-Mount';
    }
    if (mountVoltageTitleElems.Gold) {
      mountVoltageTitleElems.Gold.textContent = localeTexts.mountVoltageCardLabelGold
        || texts.en?.mountVoltageCardLabelGold
        || 'Gold Mount';
    }
    if (mountVoltageTitleElems.B) {
      mountVoltageTitleElems.B.textContent = localeTexts.mountVoltageCardLabelB
        || texts.en?.mountVoltageCardLabelB
        || 'B-Mount';
    }
  }
  if (mountVoltageInputs) {
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(type => {
      const fields = mountVoltageInputs[type];
      if (!fields) return;
      if (fields.highLabel) {
        fields.highLabel.textContent = localeTexts.mountVoltageHighLabel
          || texts.en?.mountVoltageHighLabel
          || 'High-voltage output';
        const highHelp = localeTexts.mountVoltageHighHelp
          || texts.en?.mountVoltageHighHelp
          || '';
        if (highHelp) {
          fields.highLabel.setAttribute('data-help', highHelp);
          fields.high?.setAttribute('data-help', highHelp);
        }
      }
      if (fields.lowLabel) {
        fields.lowLabel.textContent = localeTexts.mountVoltageLowLabel
          || texts.en?.mountVoltageLowLabel
          || 'Low-voltage output';
        const lowHelp = localeTexts.mountVoltageLowHelp
          || texts.en?.mountVoltageLowHelp
          || '';
        if (lowHelp) {
          fields.lowLabel.setAttribute('data-help', lowHelp);
          fields.low?.setAttribute('data-help', lowHelp);
        }
      }
    });
  }
}

try {
  if (typeof localStorage !== 'undefined') {
    const storedVoltages = localStorage.getItem(getMountVoltagePrimaryStorageKey());
    const parsedVoltages = parseStoredMountVoltages(storedVoltages);
    if (parsedVoltages) {
      mountVoltagePreferences = parsedVoltages;
    } else {
      const backupVoltages = localStorage.getItem(getMountVoltageBackupStorageKey());
      const parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
      if (parsedBackupVoltages) {
        mountVoltagePreferences = parsedBackupVoltages;
        persistMountVoltagePreferences(parsedBackupVoltages);
      }
    }
  }
} catch (error) {
  console.warn('Could not load mount voltage preferences', error);
}

const schemaStorage = (() => {
  if (typeof window === 'undefined') return null;
  try {
    if (!('localStorage' in window)) return null;
    const { localStorage } = window;
    const testKey = '__schema_cache__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (error) {
    console.warn('Device schema cache disabled', error);
    return null;
  }
})();

function loadCachedDeviceSchema() {
  if (!schemaStorage) return null;
  try {
    const raw = schemaStorage.getItem(DEVICE_SCHEMA_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.warn('Failed to read cached device schema', error);
    try {
      schemaStorage.removeItem(DEVICE_SCHEMA_STORAGE_KEY);
    } catch (removeError) {
      console.warn('Failed to clear invalid cached device schema', removeError);
    }
    return null;
  }
}

function persistDeviceSchema(schema) {
  if (!schemaStorage) return;
  try {
    schemaStorage.setItem(DEVICE_SCHEMA_STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.warn('Failed to cache device schema', error);
  }
}

function isValidDeviceSchema(candidate) {
  return candidate && typeof candidate === 'object' && !Array.isArray(candidate);
}

async function loadDeviceSchemaFromCacheStorage() {
  if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
    return null;
  }

  const candidates = new Set([DEVICE_SCHEMA_PATH]);
  if (!DEVICE_SCHEMA_PATH.startsWith('./')) {
    candidates.add(`./${DEVICE_SCHEMA_PATH}`);
  }

  if (typeof window !== 'undefined' && window.location) {
    try {
      candidates.add(new URL(DEVICE_SCHEMA_PATH, window.location.href).toString());
    } catch (error) {
      console.warn('Failed to resolve schema.json cache URL', error);
    }
  }

  for (const url of candidates) {
    try {
      const response = await caches.match(url, { ignoreSearch: true });
      if (response) {
        return await response.clone().json();
      }
    } catch (error) {
      console.warn('Failed to read schema.json from cache entry', url, error);
    }
  }

  return null;
}

/**
 * Final step once a schema candidate has been retrieved.
 *
 * The schema can come from different places (bundled JSON, fetch, cache
 * storage, localStorage fallback). Centralizing the logic in a single helper
 * keeps the success path easy to reason about and guarantees that we only
 * call `populateCategoryOptions` once we have a valid object to work with.
 *
 * @param {unknown} candidate Potentially parsed schema object.
 */
function finalizeDeviceSchemaLoad(candidate) {
  if (isValidDeviceSchema(candidate)) {
    deviceSchema = candidate;
    persistDeviceSchema(candidate);
  } else if (!deviceSchema) {
    deviceSchema = cachedDeviceSchema || {};
  }

  populateCategoryOptions();
}

const cachedDeviceSchema = loadCachedDeviceSchema();

var deviceSchema;
try {
  deviceSchema = require('../data/schema.json');
} catch {
  // Falling back to the cached copy allows the app to keep functioning when
  // users are offline, which is critical for field usage.
  deviceSchema = cachedDeviceSchema;
  if (typeof fetch === 'function') {
    fetch(DEVICE_SCHEMA_PATH)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(`Unexpected response when loading schema.json: ${response ? response.status : 'no response'}`);
        }
        return response.json();
      })
      .then(finalizeDeviceSchemaLoad)
      .catch(error => {
        console.warn('Failed to fetch schema.json', error);
        if (typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') {
          finalizeDeviceSchemaLoad(deviceSchema);
          return;
        }

        loadDeviceSchemaFromCacheStorage()
          .then(schemaFromCache => {
            if (isValidDeviceSchema(schemaFromCache)) {
              finalizeDeviceSchemaLoad(schemaFromCache);
            } else {
              finalizeDeviceSchemaLoad(deviceSchema);
            }
          })
          .catch(cacheError => {
            console.warn('Failed to load schema.json from cache storage', cacheError);
            finalizeDeviceSchemaLoad(deviceSchema);
          });
      });
  } else {
    finalizeDeviceSchemaLoad(deviceSchema);
  }
}

const LEGAL_LINKS = {
  de: {
    imprint: "legal/impressum.html",
    privacy: "legal/datenschutz.html",
  },
  en: {
    imprint: "legal/impressum-en.html",
    privacy: "legal/datenschutz-en.html",
  },
  es: {
    imprint: "legal/impressum-es.html",
    privacy: "legal/datenschutz-es.html",
  },
  fr: {
    imprint: "legal/impressum-fr.html",
    privacy: "legal/datenschutz-fr.html",
  },
  it: {
    imprint: "legal/impressum-it.html",
    privacy: "legal/datenschutz-it.html",
  },
};

var AUTO_GEAR_CUSTOM_CATEGORY = '';
const GEAR_LIST_CATEGORIES = [
  'Camera',
  'Camera Support',
  'Media',
  'Lens',
  'Lens Support',
  'Matte box + filter',
  'LDS (FIZ)',
  'Camera Batteries',
  'Monitoring Batteries',
  'Chargers',
  'Monitoring',
  'Monitoring support',
  'Rigging',
  'Power',
  'Grip',
  'Carts and Transportation',
  'Miscellaneous',
  'Consumables',
];
const AUTO_GEAR_SELECTOR_TYPES = [
  'none',
  'monitor',
  'directorMonitor',
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
];
const AUTO_GEAR_SELECTOR_TYPE_SET = new Set(AUTO_GEAR_SELECTOR_TYPES);
const AUTO_GEAR_MONITOR_FALLBACKS = ['SmallHD Ultra 7', 'SmallHD Focus', 'SmallHD Cine 7'];
const AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set([
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
]);
const AUTO_GEAR_TRIPOD_FIELD_IDS = {
  tripodHeadBrand: 'tripodHeadBrand',
  tripodBowl: 'tripodBowl',
  tripodTypes: 'tripodTypes',
  tripodSpreader: 'tripodSpreader',
};

/**
 * Produce a deterministic-looking id for Auto Gear rules/presets.
 *
 * The IDs are stored alongside user data in localStorage, so we use the
 * strongest source of randomness that is available without requiring network
 * access. When `crypto.randomUUID` is not present we fall back to a timestamp
 * + Math.random combination to avoid collisions.
 *
 * @param {string} [prefix]
 * @returns {string}
 */
function generateAutoGearId(prefix) {
  const base = prefix || 'rule';
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${base}-${crypto.randomUUID()}`;
  }
  return `${base}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

/**
 * Ensure that quantity values loaded from user input always resolve to a
 * positive integer. Keeping this logic in one place protects every feature
 * that relies on the quantity (lists, backups, exports, etc.) against
 * malformed form data.
 *
 * @param {unknown} value
 * @returns {number}
 */
function normalizeAutoGearQuantity(value) {
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num > 0 ? num : 1;
}

/**
 * Convert the multi-line textarea input for Auto Gear lists into a structured
 * array.
 *
 * Besides providing a nicer UI this helper also keeps the import/export
 * behaviour easy to audit because the exact parsing rules are documented in
 * one place.
 *
 * @param {unknown} value
 * @returns {Array<{ name: string, quantity?: number, listType?: 'add'|'remove' }>} Parsed entries.
 */
function parseAutoGearDraftNames(value) {
  if (typeof value !== 'string') return [];
  const raw = value.trim();
  if (!raw) return [];
  const hasDelimiters = /[;\n\r]/.test(raw);
  const parts = hasDelimiters ? raw.split(/[;\n\r]+/) : [raw];
  return parts
    .map(part => {
      const segment = part.trim();
      if (!segment) return null;
      const signMatch = segment.match(/^([+-])\s*(.+)$/);
      const listType = signMatch ? (signMatch[1] === '-' ? 'remove' : 'add') : null;
      const content = signMatch ? signMatch[2].trim() : segment;
      if (!content) return null;
      const quantityMatch = content.match(/^(\d+)\s*[x×]\s*(.+)$/i);
      if (quantityMatch) {
        const name = quantityMatch[2].trim();
        if (!name) return null;
        return { name, quantity: normalizeAutoGearQuantity(quantityMatch[1]), listType };
      }
      return { name: content, listType };
    })
    .filter(Boolean);
}

/**
 * Shared helper that normalizes free-text fields used across the Auto Gear UI
 * and persistence layer. Normalization protects user data from spurious
 * whitespace differences when synchronizing or restoring from backups.
 *
 * @param {unknown} value Raw input value.
 * @param {{ collapseWhitespace?: boolean }} [options]
 * @returns {string}
 */
function normalizeAutoGearText(value, { collapseWhitespace = true } = {}) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!collapseWhitespace) return trimmed;
  return trimmed.replace(/\s+/g, ' ');
}

/**
 * Normalize selector types to one of the supported strings so that stored
 * rules remain compatible even if the list of valid selectors is extended in
 * the future.
 *
 * @param {unknown} value
 * @returns {'none'|'monitor'|'directorMonitor'|'tripodHeadBrand'|'tripodBowl'|'tripodTypes'|'tripodSpreader'}
 */
function normalizeAutoGearSelectorType(value) {
  const candidate = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!candidate) return 'none';
  return AUTO_GEAR_SELECTOR_TYPE_SET.has(candidate) ? candidate : 'none';
}

/**
 * Make sure the default value for selector inputs is both human readable and
 * validated against the available options so that restoring backups never
 * yields an impossible selection.
 *
 * @param {'none'|'monitor'|'directorMonitor'|'tripodHeadBrand'|'tripodBowl'|'tripodTypes'|'tripodSpreader'} type
 * @param {unknown} value
 * @returns {string}
 */
function normalizeAutoGearSelectorDefault(type, value) {
  const text = normalizeAutoGearText(value);
  if (!text) return '';
  const options = getAutoGearSelectorOptions(type);
  if (!options.length) return text;
  const match = options.find(option => option.toLowerCase() === text.toLowerCase());
  return match || text;
}

function resolveDevicesSnapshot() {
  if (DEVICE_GLOBAL_SCOPE && DEVICE_GLOBAL_SCOPE.devices && typeof DEVICE_GLOBAL_SCOPE.devices === 'object') {
    return DEVICE_GLOBAL_SCOPE.devices;
  }

  try {
    return typeof devices !== 'undefined' && devices && typeof devices === 'object' ? devices : null;
  } catch (error) {
    if (error && typeof error === 'object' && error.name === 'ReferenceError') {
      return null;
    }
    throw error;
  }
}

function resolveTripodPreferenceSelect(type) {
  if (typeof document === 'undefined') return null;
  const id = AUTO_GEAR_TRIPOD_FIELD_IDS[type];
  if (!id) return null;
  return document.getElementById(id);
}

function collectTripodPreferenceOptions(type) {
  if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type)) return [];
  const select = resolveTripodPreferenceSelect(type);
  if (!select || !select.options) return [];
  const options = Array.from(select.options);
  const seen = new Set();
  const results = [];
  options.forEach(option => {
    if (!option) return;
    const value = typeof option.value === 'string' ? option.value.trim() : '';
    const label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
    const storeValue = value || label;
    if (!storeValue) return;
    const dedupeKey = storeValue.toLowerCase();
    if (seen.has(dedupeKey)) return;
    seen.add(dedupeKey);
    results.push({ value: storeValue, label: label || storeValue });
  });
  return results;
}

function getAutoGearSelectorOptions(type) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  const catalog = resolveDevicesSnapshot();

  if (!catalog || typeof catalog !== 'object') {
    return [];
  }

  if (normalizedType === 'monitor') {
    const monitorDb = catalog && catalog.monitors ? catalog.monitors : null;
    if (!monitorDb || typeof monitorDb !== 'object') return [];
    return Object.keys(monitorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  if (normalizedType === 'directorMonitor') {
    const directorDb = catalog && catalog.directorMonitors ? catalog.directorMonitors : null;
    if (!directorDb || typeof directorDb !== 'object') return [];
    return Object.keys(directorDb).filter(name => name && name !== 'None').sort(localeSort);
  }
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
    return collectTripodPreferenceOptions(normalizedType).map(option => option.value);
  }
  return [];
}

function getAutoGearSelectorLabel(type) {
  const normalizedType = normalizeAutoGearSelectorType(type);
  const langTexts = texts[currentLang] || texts.en || {};
  if (normalizedType === 'monitor') {
    return langTexts.autoGearSelectorMonitorOption
      || texts.en?.autoGearSelectorMonitorOption
      || 'Monitor selector';
  }
  if (normalizedType === 'directorMonitor') {
    return langTexts.autoGearSelectorDirectorOption
      || texts.en?.autoGearSelectorDirectorOption
      || 'Director monitor selector';
  }
  if (normalizedType === 'tripodHeadBrand') {
    return langTexts.autoGearSelectorTripodHeadOption
      || texts.en?.autoGearSelectorTripodHeadOption
      || 'Tripod head selector';
  }
  if (normalizedType === 'tripodBowl') {
    return langTexts.autoGearSelectorTripodBowlOption
      || texts.en?.autoGearSelectorTripodBowlOption
      || 'Tripod bowl selector';
  }
  if (normalizedType === 'tripodTypes') {
    return langTexts.autoGearSelectorTripodTypesOption
      || texts.en?.autoGearSelectorTripodTypesOption
      || 'Tripod type selector';
  }
  if (normalizedType === 'tripodSpreader') {
    return langTexts.autoGearSelectorTripodSpreaderOption
      || texts.en?.autoGearSelectorTripodSpreaderOption
      || 'Tripod spreader selector';
  }
  return langTexts.autoGearSelectorNoneOption
    || texts.en?.autoGearSelectorNoneOption
    || 'No selector';
}

function getAutoGearSelectorScrollHint() {
  const langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearSelectorScrollHint
    || texts.en?.autoGearSelectorScrollHint
    || 'Scroll to see more devices.';
}

function getAutoGearSelectorDefaultPlaceholder() {
  const langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearSelectorDefaultPlaceholder
    || texts.en?.autoGearSelectorDefaultPlaceholder
    || 'Choose a default device';
}

function getAutoGearMonitorDefaultPlaceholder() {
  const langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearMonitorDefaultPlaceholder
    || texts.en?.autoGearMonitorDefaultPlaceholder
    || 'Use recommended automatically';
}

function formatAutoGearSelectorValue(type, value) {
  const normalizedValue = typeof value === 'string' ? value.trim() : '';
  if (!normalizedValue) return '';
  const normalizedType = normalizeAutoGearSelectorType(type);
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
    const options = collectTripodPreferenceOptions(normalizedType);
    const match = options.find(option => option.value.toLowerCase() === normalizedValue.toLowerCase());
    if (match && match.label) {
      return match.label;
    }
  }
  if (typeof addArriKNumber === 'function' && (normalizedType === 'monitor' || normalizedType === 'directorMonitor')) {
    return addArriKNumber(normalizedValue);
  }
  return normalizedValue;
}

function populateAutoGearCategorySelect(select, currentValue) {
  if (!select) return;

  const current = typeof currentValue === 'string' ? currentValue : '';
  const lang = typeof currentLang === 'string' ? currentLang : 'en';

  select.innerHTML = '';

  GEAR_LIST_CATEGORIES.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    if (current === category) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  const customOption = document.createElement('option');
  customOption.value = AUTO_GEAR_CUSTOM_CATEGORY;
  customOption.textContent = texts?.[lang]?.autoGearCustomCategory
    || texts?.en?.autoGearCustomCategory
    || 'Custom Additions';
  if (!current || current === AUTO_GEAR_CUSTOM_CATEGORY) {
    customOption.selected = true;
  }
  select.appendChild(customOption);
}

function isAutoGearMonitoringCategory(value) {
  if (typeof value !== 'string') return false;
  return value.trim().toLowerCase() === 'monitoring';
}

function isMonitoringCategorySelected(select) {
  if (!select) return false;
  const directValue = typeof select.value === 'string' ? select.value : '';
  if (isAutoGearMonitoringCategory(directValue)) {
    return true;
  }
  const option = select.options?.[select.selectedIndex] || null;
  if (!option) return false;
  const optionValue = typeof option.value === 'string' ? option.value : '';
  if (isAutoGearMonitoringCategory(optionValue)) {
    return true;
  }
  const optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
  return isAutoGearMonitoringCategory(optionLabel);
}

function matchesTripodCategory(value) {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!normalized) return false;
  if (normalized === 'camera support') return true;
  if (normalized === 'grip') return true;
  return normalized.includes('tripod');
}

function isTripodCategorySelected(select) {
  if (!select) return false;
  const directValue = typeof select.value === 'string' ? select.value : '';
  if (matchesTripodCategory(directValue)) return true;
  const option = select.options?.[select.selectedIndex] || null;
  if (!option) return false;
  if (matchesTripodCategory(option.value)) return true;
  const optionLabel = typeof option.textContent === 'string' ? option.textContent : '';
  return matchesTripodCategory(optionLabel);
}

function setAutoGearFieldVisibility(field, isVisible) {
  if (!field) return;
  if (isVisible) {
    field.hidden = false;
    field.removeAttribute('hidden');
    field.removeAttribute('aria-hidden');
    if (Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
      const storedDisplay = field.dataset.autoGearHiddenDisplay;
      if (storedDisplay) {
        field.style.display = storedDisplay;
      } else {
        field.style.removeProperty('display');
      }
      delete field.dataset.autoGearHiddenDisplay;
    } else if (field.style.display === 'none') {
      field.style.removeProperty('display');
    }
  } else {
    field.hidden = true;
    field.setAttribute('hidden', '');
    field.setAttribute('aria-hidden', 'true');
    if (!Object.prototype.hasOwnProperty.call(field.dataset, 'autoGearHiddenDisplay')) {
      field.dataset.autoGearHiddenDisplay = field.style.display || '';
    }
    field.style.display = 'none';
  }
}

function updateAutoGearMonitorFieldGroup(group) {
  if (!group || !group.select) return;
  const {
    select,
    screenSizeField,
    screenSizeInput,
    selectorTypeField,
    selectorTypeSelect,
    selectorDefaultField,
    selectorDefaultInput,
  } = group;
  const isMonitoring = isMonitoringCategorySelected(select);
  const isTripod = isTripodCategorySelected(select);
  const showScreenSize = isMonitoring;
  const showSelectorFields = isMonitoring || isTripod;
  setAutoGearFieldVisibility(screenSizeField, showScreenSize);
  setAutoGearFieldVisibility(selectorTypeField, showSelectorFields);
  setAutoGearFieldVisibility(selectorDefaultField, showSelectorFields);
  if (!showScreenSize && screenSizeInput) {
    screenSizeInput.value = '';
  }
  if (!showSelectorFields) {
    if (selectorTypeSelect) selectorTypeSelect.value = 'none';
    if (selectorDefaultInput) {
      selectorDefaultInput.value = '';
      if (Object.prototype.hasOwnProperty.call(selectorDefaultInput.dataset || {}, 'autoGearPreferredDefault')) {
        delete selectorDefaultInput.dataset.autoGearPreferredDefault;
      }
    }
  }
}

function extractAutoGearContextNotes(name) {
  const contexts = [];
  if (!name || typeof name !== 'string') {
    return { baseName: '', contexts };
  }
  let baseName = name.trim();
  const contextPattern = /^(.*\([^()]*\)) \(([^()]+)\)$/;
  let match = baseName.match(contextPattern);
  while (match) {
    const candidate = match[2].trim();
    if (/handheld\b/i.test(candidate) || /15-21"?$/.test(candidate)) {
      contexts.unshift(candidate);
      baseName = match[1].trim();
    } else {
      break;
    }
    match = baseName.match(contextPattern);
  }
  return { baseName, contexts };
}

function normalizeAutoGearItem(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const rawName = normalizeAutoGearText(entry.name);
  if (!rawName) return null;
  const { baseName, contexts } = extractAutoGearContextNotes(rawName);
  const name = baseName || rawName;
  const storedContexts = Array.isArray(entry.contextNotes)
    ? entry.contextNotes.filter(value => typeof value === 'string' && value.trim())
    : [];
  storedContexts.forEach(note => {
    const trimmed = note.trim();
    if (!trimmed) return;
    if (!contexts.includes(trimmed)) contexts.push(trimmed);
  });
  const category = normalizeAutoGearText(entry.category);
  const quantity = normalizeAutoGearQuantity(entry.quantity);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
  const screenSize = normalizeAutoGearText(entry.screenSize);
  const selectorType = normalizeAutoGearSelectorType(entry.selectorType);
  const selectorDefault = normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault);
  let selectorEnabled = !!entry.selectorEnabled;
  if (selectorType === 'none') {
    selectorEnabled = false;
  } else if (isAutoGearMonitoringCategory(category)) {
    selectorEnabled = true;
  }
  const notes = normalizeAutoGearText(entry.notes);
  return { id, name, category, quantity, screenSize, selectorType, selectorDefault, selectorEnabled, notes, contextNotes: contexts };
}

function normalizeAutoGearTriggerList(values) {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values
    .map(value => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)));
}

const AUTO_GEAR_SCENARIO_LOGIC_VALUES = new Set(['all', 'any', 'multiplier']);

function normalizeAutoGearScenarioLogic(value) {
  if (typeof value !== 'string') return 'all';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'any';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
  if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
    return 'multiplier';
  }
  return AUTO_GEAR_SCENARIO_LOGIC_VALUES.has(normalized) ? normalized : 'all';
}

const AUTO_GEAR_CONDITION_LOGIC_VALUES = new Set(['all', 'any', 'multiplier']);
const AUTO_GEAR_CONDITION_LOGIC_FIELDS = {
  mattebox: 'matteboxLogic',
  cameraHandle: 'cameraHandleLogic',
  viewfinderExtension: 'viewfinderExtensionLogic',
  deliveryResolution: 'deliveryResolutionLogic',
  videoDistribution: 'videoDistributionLogic',
  camera: 'cameraLogic',
  monitor: 'monitorLogic',
  tripodHeadBrand: 'tripodHeadBrandLogic',
  tripodBowl: 'tripodBowlLogic',
  tripodTypes: 'tripodTypesLogic',
  tripodSpreader: 'tripodSpreaderLogic',
  crewPresent: 'crewPresentLogic',
  crewAbsent: 'crewAbsentLogic',
  wireless: 'wirelessLogic',
  motors: 'motorsLogic',
  controllers: 'controllersLogic',
  distance: 'distanceLogic',
};

function normalizeAutoGearConditionLogic(value) {
  if (typeof value !== 'string') return 'all';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'any';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
  if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
    return 'multiplier';
  }
  return AUTO_GEAR_CONDITION_LOGIC_VALUES.has(normalized) ? normalized : 'all';
}

function readAutoGearConditionLogic(rule, key) {
  if (!rule || typeof rule !== 'object') return 'all';
  const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
  let raw;
  if (property && Object.prototype.hasOwnProperty.call(rule, property)) {
    raw = rule[property];
  }
  if (raw == null) {
    const alias = `${key}Mode`;
    if (Object.prototype.hasOwnProperty.call(rule, alias)) {
      raw = rule[alias];
    }
  }
  if (raw == null && rule.conditionLogic && typeof rule.conditionLogic === 'object') {
    raw = rule.conditionLogic[key];
  }
  return normalizeAutoGearConditionLogic(raw);
}

function normalizeAutoGearScenarioMultiplier(value) {
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num > 1 ? num : 1;
}

function normalizeAutoGearScenarioPrimary(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeVideoDistributionTriggerList(values) {
  if (!Array.isArray(values)) return [];
  const base = normalizeAutoGearTriggerList(values);
  const seen = new Set();
  const result = [];
  base.forEach(value => {
    const lower = value.toLowerCase();
    const normalized = lower === '__none__' || lower === 'none'
      ? '__none__'
      : value;
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    result.push(normalized);
  });
  return result;
}

function normalizeAutoGearTriggerValue(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function autoGearRuleMatteboxKey(rule) {
  if (!rule || typeof rule !== 'object') return '';
  const matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox : [];
  if (!matteboxList.length) return '';
  return matteboxList
    .map(normalizeAutoGearTriggerValue)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
    .join('|');
}

const AUTO_GEAR_SHOOTING_DAY_MODES = new Set(['minimum', 'maximum', 'every']);

function normalizeAutoGearShootingDayMode(value) {
  if (typeof value !== 'string') return 'minimum';
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'minimum';
  if (AUTO_GEAR_SHOOTING_DAY_MODES.has(normalized)) return normalized;
  if (normalized === 'min' || normalized === 'at least') return 'minimum';
  if (normalized === 'max' || normalized === 'at most') return 'maximum';
  if (normalized === 'each' || normalized === 'every') return 'every';
  return 'minimum';
}

function normalizeAutoGearShootingDayValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const rounded = Math.round(value);
    return rounded > 0 ? rounded : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number.parseInt(trimmed, 10);
    if (!Number.isFinite(parsed)) return null;
    return parsed > 0 ? parsed : null;
  }
  return null;
}

function normalizeAutoGearShootingDaysList(values) {
  if (!Array.isArray(values)) return [];
  const unique = new Set();
  values.forEach(value => {
    const normalized = normalizeAutoGearShootingDayValue(value);
    if (Number.isFinite(normalized) && normalized > 0) {
      unique.add(normalized);
    }
  });
  return Array.from(unique).sort((a, b) => a - b);
}

function normalizeAutoGearShootingDaysCondition(setting) {
  if (!setting) return null;
  if (Array.isArray(setting)) {
    const values = normalizeAutoGearShootingDaysList(setting);
    if (!values.length) return null;
    const maxValue = values[values.length - 1];
    return Number.isFinite(maxValue) && maxValue > 0
      ? { mode: 'minimum', value: maxValue }
      : null;
  }
  if (typeof setting === 'object') {
    const modeSource = setting.mode
      ?? setting.type
      ?? setting.comparison
      ?? setting.condition
      ?? setting.kind;
    const mode = normalizeAutoGearShootingDayMode(modeSource);
    const valueSource = setting.value
      ?? setting.count
      ?? setting.days
      ?? setting.minimum
      ?? setting.maximum
      ?? setting.frequency;
    const value = normalizeAutoGearShootingDayValue(valueSource);
    if (Number.isFinite(value) && value > 0) {
      return { mode, value };
    }
    return null;
  }
  const normalizedValue = normalizeAutoGearShootingDayValue(setting);
  if (Number.isFinite(normalizedValue) && normalizedValue > 0) {
    return { mode: 'minimum', value: normalizedValue };
  }
  return null;
}

function normalizeAutoGearRule(rule) {
  if (!rule || typeof rule !== 'object') return null;
  const id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
  const label = typeof rule.label === 'string' ? rule.label.trim() : '';
  let always = false;
  if (Array.isArray(rule.always)) {
    always = rule.always.some(value => {
      if (typeof value === 'string') {
        const trimmed = value.trim().toLowerCase();
        if (!trimmed) return false;
        if (trimmed === 'false' || trimmed === '0') return false;
        return true;
      }
      return Boolean(value);
    });
  } else if (typeof rule.always === 'string') {
    const trimmed = rule.always.trim().toLowerCase();
    always = trimmed === 'true' || (trimmed && trimmed !== 'false' && trimmed !== '0');
  } else {
    always = Boolean(rule.always);
  }
  let scenarios = normalizeAutoGearTriggerList(rule.scenarios);
  const scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
  let scenarioMultiplier = 1;
  let scenarioPrimary = '';
  if (scenarioLogic === 'multiplier') {
    scenarioMultiplier = normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier);
    const requestedPrimary = normalizeAutoGearScenarioPrimary(rule.scenarioPrimary);
    const normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
    if (normalizedPrimary) {
      const matched = scenarios.find(value => normalizeAutoGearTriggerValue(value) === normalizedPrimary);
      if (matched) {
        scenarioPrimary = matched;
      } else if (requestedPrimary) {
        scenarioPrimary = requestedPrimary;
        scenarios.push(requestedPrimary);
      }
    }
    if (!scenarioPrimary && scenarios.length) {
      scenarioPrimary = scenarios[0];
    }
  }
  scenarios = scenarios.sort((a, b) => a.localeCompare(b));
  if (scenarioLogic === 'multiplier' && scenarioPrimary) {
    const normalizedPrimary = normalizeAutoGearTriggerValue(scenarioPrimary);
    const hasPrimary = scenarios.some(value => normalizeAutoGearTriggerValue(value) === normalizedPrimary);
    if (!hasPrimary) {
      scenarios.push(scenarioPrimary);
      scenarios.sort((a, b) => a.localeCompare(b));
    }
  }
  const mattebox = normalizeAutoGearTriggerList(rule.mattebox).sort((a, b) => a.localeCompare(b));
  const cameraHandle = normalizeAutoGearTriggerList(rule.cameraHandle).sort((a, b) => a.localeCompare(b));
  const viewfinderExtension = normalizeAutoGearTriggerList(rule.viewfinderExtension).sort((a, b) => a.localeCompare(b));
  const deliveryResolution = normalizeAutoGearTriggerList(rule.deliveryResolution).sort((a, b) => a.localeCompare(b));
  const videoDistribution = normalizeVideoDistributionTriggerList(rule.videoDistribution)
    .sort((a, b) => a.localeCompare(b));
  const camera = normalizeAutoGearTriggerList(rule.camera).sort((a, b) => a.localeCompare(b));
  const cameraWeight = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
  const monitor = normalizeAutoGearTriggerList(rule.monitor).sort((a, b) => a.localeCompare(b));
  const tripodHeadBrand = normalizeAutoGearTriggerList(rule.tripodHeadBrand).sort((a, b) => a.localeCompare(b));
  const tripodBowl = normalizeAutoGearTriggerList(rule.tripodBowl).sort((a, b) => a.localeCompare(b));
  const tripodTypes = normalizeAutoGearTriggerList(rule.tripodTypes).sort((a, b) => a.localeCompare(b));
  const tripodSpreader = normalizeAutoGearTriggerList(rule.tripodSpreader).sort((a, b) => a.localeCompare(b));
  const crewPresent = normalizeAutoGearTriggerList(rule.crewPresent).sort((a, b) => a.localeCompare(b));
  const crewAbsent = normalizeAutoGearTriggerList(rule.crewAbsent).sort((a, b) => a.localeCompare(b));
  const wireless = normalizeAutoGearTriggerList(rule.wireless).sort((a, b) => a.localeCompare(b));
  const motors = normalizeAutoGearTriggerList(rule.motors).sort((a, b) => a.localeCompare(b));
  const controllers = normalizeAutoGearTriggerList(rule.controllers).sort((a, b) => a.localeCompare(b));
  const distance = normalizeAutoGearTriggerList(rule.distance).sort((a, b) => a.localeCompare(b));
  const shootingDays = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
  const matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
  const cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
  const viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
  const deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
  const videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
  const cameraLogic = readAutoGearConditionLogic(rule, 'camera');
  const monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
  const tripodHeadBrandLogic = readAutoGearConditionLogic(rule, 'tripodHeadBrand');
  const tripodBowlLogic = readAutoGearConditionLogic(rule, 'tripodBowl');
  const tripodTypesLogic = readAutoGearConditionLogic(rule, 'tripodTypes');
  const tripodSpreaderLogic = readAutoGearConditionLogic(rule, 'tripodSpreader');
  const crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
  const crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
  const wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
  const motorsLogic = readAutoGearConditionLogic(rule, 'motors');
  const controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
  const distanceLogic = readAutoGearConditionLogic(rule, 'distance');
  const conditionLogic = {};
  if (scenarioLogic && scenarioLogic !== 'all') {
    conditionLogic.scenarios = scenarioLogic;
  }
  if (matteboxLogic && matteboxLogic !== 'all') conditionLogic.mattebox = matteboxLogic;
  if (cameraHandleLogic && cameraHandleLogic !== 'all') conditionLogic.cameraHandle = cameraHandleLogic;
  if (viewfinderExtensionLogic && viewfinderExtensionLogic !== 'all') {
    conditionLogic.viewfinderExtension = viewfinderExtensionLogic;
  }
  if (deliveryResolutionLogic && deliveryResolutionLogic !== 'all') {
    conditionLogic.deliveryResolution = deliveryResolutionLogic;
  }
  if (videoDistributionLogic && videoDistributionLogic !== 'all') {
    conditionLogic.videoDistribution = videoDistributionLogic;
  }
  if (cameraLogic && cameraLogic !== 'all') conditionLogic.camera = cameraLogic;
  if (monitorLogic && monitorLogic !== 'all') conditionLogic.monitor = monitorLogic;
  if (tripodHeadBrandLogic && tripodHeadBrandLogic !== 'all') {
    conditionLogic.tripodHeadBrand = tripodHeadBrandLogic;
  }
  if (tripodBowlLogic && tripodBowlLogic !== 'all') {
    conditionLogic.tripodBowl = tripodBowlLogic;
  }
  if (tripodTypesLogic && tripodTypesLogic !== 'all') {
    conditionLogic.tripodTypes = tripodTypesLogic;
  }
  if (tripodSpreaderLogic && tripodSpreaderLogic !== 'all') {
    conditionLogic.tripodSpreader = tripodSpreaderLogic;
  }
  if (crewPresentLogic && crewPresentLogic !== 'all') conditionLogic.crewPresent = crewPresentLogic;
  if (crewAbsentLogic && crewAbsentLogic !== 'all') conditionLogic.crewAbsent = crewAbsentLogic;
  if (wirelessLogic && wirelessLogic !== 'all') conditionLogic.wireless = wirelessLogic;
  if (motorsLogic && motorsLogic !== 'all') conditionLogic.motors = motorsLogic;
  if (controllersLogic && controllersLogic !== 'all') conditionLogic.controllers = controllersLogic;
  if (distanceLogic && distanceLogic !== 'all') conditionLogic.distance = distanceLogic;
  if (
    !always &&
    !scenarios.length
    && !shootingDays
    && !mattebox.length
    && !cameraHandle.length
    && !viewfinderExtension.length
    && !deliveryResolution.length
    && !videoDistribution.length
    && !camera.length
    && !cameraWeight
    && !monitor.length
    && !tripodHeadBrand.length
    && !tripodBowl.length
    && !tripodTypes.length
    && !tripodSpreader.length
    && !crewPresent.length
    && !crewAbsent.length
    && !wireless.length
    && !motors.length
    && !controllers.length
    && !distance.length
  ) return null;
  const add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
  const remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
  if (!add.length && !remove.length) return null;
  return {
    id,
    label,
    always,
    scenarioLogic,
    scenarioPrimary,
    scenarioMultiplier,
    scenarios,
    mattebox,
    cameraHandle,
    viewfinderExtension,
    deliveryResolution,
    videoDistribution,
    camera,
    cameraWeight,
    monitor,
    tripodHeadBrand,
    tripodBowl,
    tripodTypes,
    tripodSpreader,
    crewPresent,
    crewAbsent,
    wireless,
    motors,
    controllers,
    distance,
    shootingDays,
    matteboxLogic,
    cameraHandleLogic,
    viewfinderExtensionLogic,
    deliveryResolutionLogic,
    videoDistributionLogic,
    cameraLogic,
    monitorLogic,
    tripodHeadBrandLogic,
    tripodBowlLogic,
    tripodTypesLogic,
    tripodSpreaderLogic,
    crewPresentLogic,
    crewAbsentLogic,
    wirelessLogic,
    motorsLogic,
    controllersLogic,
    distanceLogic,
    conditionLogic,
    add,
    remove,
  };
}

function autoGearItemSnapshot(item) {
  const normalized = normalizeAutoGearItem(item);
  if (!normalized) {
    return {
      name: '',
      category: '',
      quantity: 0,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
    };
  }
  const {
    name,
    category,
    quantity,
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
  } = normalized;
  return {
    name,
    category,
    quantity: normalizeAutoGearQuantity(quantity),
    screenSize,
    selectorType,
    selectorDefault,
    selectorEnabled,
    notes,
  };
}

function autoGearItemSortKey(item) {
  const snapshot = autoGearItemSnapshot(item);
  const name = snapshot.name || '';
  const category = snapshot.category || '';
  const quantity = normalizeAutoGearQuantity(snapshot.quantity);
  const screenSize = snapshot.screenSize || '';
  const selectorType = snapshot.selectorType || 'none';
  const selectorDefault = snapshot.selectorDefault || '';
  const selectorEnabled = snapshot.selectorEnabled ? '1' : '0';
  const notes = snapshot.notes || '';
  return `${name}|${category}|${quantity}|${screenSize}|${selectorType}|${selectorEnabled}|${selectorDefault}|${notes}`;
}

function snapshotAutoGearRuleForFingerprint(rule) {
  const normalized = normalizeAutoGearRule(rule);
  if (!normalized) return null;
  const mapItems = items => items
    .map(autoGearItemSnapshot)
    .sort((a, b) => autoGearItemSortKey(a).localeCompare(autoGearItemSortKey(b)));
  return {
    label: normalized.label || '',
    always: normalized.always ? 1 : 0,
    scenarios: normalized.scenarios.slice().sort((a, b) => a.localeCompare(b)),
    mattebox: normalized.mattebox.slice().sort((a, b) => a.localeCompare(b)),
    cameraHandle: normalized.cameraHandle.slice().sort((a, b) => a.localeCompare(b)),
    viewfinderExtension: normalized.viewfinderExtension.slice().sort((a, b) => a.localeCompare(b)),
    deliveryResolution: normalized.deliveryResolution.slice().sort((a, b) => a.localeCompare(b)),
    videoDistribution: normalized.videoDistribution.slice().sort((a, b) => a.localeCompare(b)),
    camera: normalized.camera.slice().sort((a, b) => a.localeCompare(b)),
    cameraWeight: normalized.cameraWeight
      ? { operator: normalized.cameraWeight.operator, value: normalized.cameraWeight.value }
      : null,
    monitor: normalized.monitor.slice().sort((a, b) => a.localeCompare(b)),
    tripodHeadBrand: normalized.tripodHeadBrand.slice().sort((a, b) => a.localeCompare(b)),
    tripodBowl: normalized.tripodBowl.slice().sort((a, b) => a.localeCompare(b)),
    tripodTypes: normalized.tripodTypes.slice().sort((a, b) => a.localeCompare(b)),
    tripodSpreader: normalized.tripodSpreader.slice().sort((a, b) => a.localeCompare(b)),
    crewPresent: normalized.crewPresent.slice().sort((a, b) => a.localeCompare(b)),
    crewAbsent: normalized.crewAbsent.slice().sort((a, b) => a.localeCompare(b)),
    wireless: normalized.wireless.slice().sort((a, b) => a.localeCompare(b)),
    motors: normalized.motors.slice().sort((a, b) => a.localeCompare(b)),
    controllers: normalized.controllers.slice().sort((a, b) => a.localeCompare(b)),
    distance: normalized.distance.slice().sort((a, b) => a.localeCompare(b)),
    shootingDays: normalizeAutoGearShootingDaysCondition(normalized.shootingDays),
    matteboxLogic: normalizeAutoGearConditionLogic(normalized.matteboxLogic),
    cameraHandleLogic: normalizeAutoGearConditionLogic(normalized.cameraHandleLogic),
    viewfinderExtensionLogic: normalizeAutoGearConditionLogic(normalized.viewfinderExtensionLogic),
    deliveryResolutionLogic: normalizeAutoGearConditionLogic(normalized.deliveryResolutionLogic),
    videoDistributionLogic: normalizeAutoGearConditionLogic(normalized.videoDistributionLogic),
    cameraLogic: normalizeAutoGearConditionLogic(normalized.cameraLogic),
    monitorLogic: normalizeAutoGearConditionLogic(normalized.monitorLogic),
    tripodHeadBrandLogic: normalizeAutoGearConditionLogic(normalized.tripodHeadBrandLogic),
    tripodBowlLogic: normalizeAutoGearConditionLogic(normalized.tripodBowlLogic),
    tripodTypesLogic: normalizeAutoGearConditionLogic(normalized.tripodTypesLogic),
    tripodSpreaderLogic: normalizeAutoGearConditionLogic(normalized.tripodSpreaderLogic),
    crewPresentLogic: normalizeAutoGearConditionLogic(normalized.crewPresentLogic),
    crewAbsentLogic: normalizeAutoGearConditionLogic(normalized.crewAbsentLogic),
    wirelessLogic: normalizeAutoGearConditionLogic(normalized.wirelessLogic),
    motorsLogic: normalizeAutoGearConditionLogic(normalized.motorsLogic),
    controllersLogic: normalizeAutoGearConditionLogic(normalized.controllersLogic),
    distanceLogic: normalizeAutoGearConditionLogic(normalized.distanceLogic),
    conditionLogic: normalized.conditionLogic
      ? Object.keys(normalized.conditionLogic).reduce((acc, key) => {
        acc[key] = normalizeAutoGearConditionLogic(normalized.conditionLogic[key]);
        return acc;
      }, {})
      : {},
    add: mapItems(normalized.add),
    remove: mapItems(normalized.remove),
  };
}

function autoGearRuleSortKey(rule) {
  const alwaysKey = rule && rule.always ? '1' : '0';
  const scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
  const matteboxKey = Array.isArray(rule.mattebox) ? rule.mattebox.join('|') : '';
  const cameraHandleKey = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.join('|') : '';
  const viewfinderKey = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.join('|') : '';
  const deliveryResolutionKey = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.join('|') : '';
  const videoDistributionKey = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.join('|') : '';
  const cameraKey = Array.isArray(rule.camera) ? rule.camera.join('|') : '';
  const cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule?.cameraWeight);
  const cameraWeightKey = cameraWeightCondition
    ? `${cameraWeightCondition.operator}:${cameraWeightCondition.value}`
    : '';
  const monitorKey = Array.isArray(rule.monitor) ? rule.monitor.join('|') : '';
  const tripodHeadBrandKey = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.join('|') : '';
  const tripodBowlKey = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.join('|') : '';
  const tripodTypesKey = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.join('|') : '';
  const tripodSpreaderKey = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.join('|') : '';
  const crewPresentKey = Array.isArray(rule.crewPresent) ? rule.crewPresent.join('|') : '';
  const crewAbsentKey = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.join('|') : '';
  const wirelessKey = Array.isArray(rule.wireless) ? rule.wireless.join('|') : '';
  const motorsKey = Array.isArray(rule.motors) ? rule.motors.join('|') : '';
  const controllersKey = Array.isArray(rule.controllers) ? rule.controllers.join('|') : '';
  const distanceKey = Array.isArray(rule.distance) ? rule.distance.join('|') : '';
  const shootingDaysCondition = normalizeAutoGearShootingDaysCondition(rule?.shootingDays);
  const shootingDaysKey = shootingDaysCondition
    ? `${shootingDaysCondition.mode}:${shootingDaysCondition.value}`
    : '';
  const matteboxLogicKey = normalizeAutoGearConditionLogic(rule?.matteboxLogic);
  const cameraHandleLogicKey = normalizeAutoGearConditionLogic(rule?.cameraHandleLogic);
  const viewfinderLogicKey = normalizeAutoGearConditionLogic(rule?.viewfinderExtensionLogic);
  const deliveryResolutionLogicKey = normalizeAutoGearConditionLogic(rule?.deliveryResolutionLogic);
  const videoDistributionLogicKey = normalizeAutoGearConditionLogic(rule?.videoDistributionLogic);
  const cameraLogicKey = normalizeAutoGearConditionLogic(rule?.cameraLogic);
  const monitorLogicKey = normalizeAutoGearConditionLogic(rule?.monitorLogic);
  const tripodHeadBrandLogicKey = normalizeAutoGearConditionLogic(rule?.tripodHeadBrandLogic);
  const tripodBowlLogicKey = normalizeAutoGearConditionLogic(rule?.tripodBowlLogic);
  const tripodTypesLogicKey = normalizeAutoGearConditionLogic(rule?.tripodTypesLogic);
  const tripodSpreaderLogicKey = normalizeAutoGearConditionLogic(rule?.tripodSpreaderLogic);
  const crewPresentLogicKey = normalizeAutoGearConditionLogic(rule?.crewPresentLogic);
  const crewAbsentLogicKey = normalizeAutoGearConditionLogic(rule?.crewAbsentLogic);
  const wirelessLogicKey = normalizeAutoGearConditionLogic(rule?.wirelessLogic);
  const motorsLogicKey = normalizeAutoGearConditionLogic(rule?.motorsLogic);
  const controllersLogicKey = normalizeAutoGearConditionLogic(rule?.controllersLogic);
  const distanceLogicKey = normalizeAutoGearConditionLogic(rule?.distanceLogic);
  const addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
  const removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
  return `${alwaysKey}|${scenarioKey}|${matteboxKey}|${cameraHandleKey}|${viewfinderKey}|${deliveryResolutionKey}|${videoDistributionKey}|${cameraKey}|${cameraWeightKey}|${monitorKey}|${tripodHeadBrandKey}|${tripodBowlKey}|${tripodTypesKey}|${tripodSpreaderKey}|${crewPresentKey}|${crewAbsentKey}|${wirelessKey}|${motorsKey}|${controllersKey}|${distanceKey}|${shootingDaysKey}|${matteboxLogicKey}|${cameraHandleLogicKey}|${viewfinderLogicKey}|${deliveryResolutionLogicKey}|${videoDistributionLogicKey}|${cameraLogicKey}|${monitorLogicKey}|${tripodHeadBrandLogicKey}|${tripodBowlLogicKey}|${tripodTypesLogicKey}|${tripodSpreaderLogicKey}|${crewPresentLogicKey}|${crewAbsentLogicKey}|${wirelessLogicKey}|${motorsLogicKey}|${controllersLogicKey}|${distanceLogicKey}|${rule.label || ''}|${addKey}|${removeKey}`;
}

function createAutoGearRulesFingerprint(rules) {
  const snapshot = (Array.isArray(rules) ? rules : [])
    .map(snapshotAutoGearRuleForFingerprint)
    .filter(Boolean)
    .sort((a, b) => autoGearRuleSortKey(a).localeCompare(autoGearRuleSortKey(b)));
  return stableStringify(snapshot);
}

function normalizeAutoGearPreset(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!label) return null;
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const rules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('preset');
  const fingerprint = createAutoGearRulesFingerprint(rules);
  return { id, label, rules, fingerprint };
}

function normalizeAutoGearBackupEntry(entry) {
  if (!entry || typeof entry !== 'object') return null;
  const rawCreatedAt = typeof entry.createdAt === 'string' ? entry.createdAt : null;
  const timestamp = rawCreatedAt ? Date.parse(rawCreatedAt) : NaN;
  if (!Number.isFinite(timestamp)) return null;
  const createdAt = new Date(timestamp).toISOString();
  const rawRules = Array.isArray(entry.rules) ? entry.rules : [];
  const normalizedRules = rawRules.map(normalizeAutoGearRule).filter(Boolean);
  const rules = rawRules.length === 0 ? [] : normalizedRules;
  const id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('backup');
  const monitorDefaults = normalizeAutoGearMonitorDefaults(entry.monitorDefaults);
  const note = typeof entry.note === 'string' ? entry.note : '';
  return { id, createdAt, rules, monitorDefaults, note };
}

function readAutoGearBackupsFromStorage(retentionLimit = AUTO_GEAR_BACKUP_RETENTION_DEFAULT) {
  let stored = [];
  if (typeof loadAutoGearBackups === 'function') {
    try {
      stored = loadAutoGearBackups();
    } catch (error) {
      console.warn('Failed to load automatic gear backups', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_BACKUPS_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to read automatic gear backups from storage', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  const limit = clampAutoGearBackupRetentionLimit(retentionLimit);
  return stored
    .map(normalizeAutoGearBackupEntry)
    .filter(Boolean)
    .sort((a, b) => {
      if (a.createdAt === b.createdAt) return 0;
      return a.createdAt > b.createdAt ? -1 : 1;
    })
    .slice(0, limit);
}

function sortAutoGearPresets(list) {
  return list.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true }));
}

function readAutoGearPresetsFromStorage() {
  let stored = [];
  if (typeof loadAutoGearPresets === 'function') {
    try {
      stored = loadAutoGearPresets();
    } catch (error) {
      console.warn('Failed to load automatic gear presets', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_PRESETS_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to read automatic gear presets from storage', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  return sortAutoGearPresets(stored.map(normalizeAutoGearPreset).filter(Boolean));
}

function persistAutoGearPresets(presets) {
  const payload = Array.isArray(presets)
    ? presets.map(preset => ({
        id: preset.id,
        label: preset.label,
        rules: Array.isArray(preset.rules) ? preset.rules : [],
      }))
    : [];
  if (typeof saveAutoGearPresets === 'function') {
    try {
      saveAutoGearPresets(payload);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear presets', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_PRESETS_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist automatic gear presets', error);
  }
}

const AUTO_GEAR_MONITOR_DEFAULT_TYPES = {
  focus: 'monitor',
  handheld7: 'monitor',
  combo15: 'directorMonitor',
  director15: 'directorMonitor',
};

const AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS = {
  focus: 'autoGearDefaultFocusMonitorLabel',
  handheld7: 'autoGearDefaultHandheldMonitorLabel',
  combo15: 'autoGearDefaultComboMonitorLabel',
  director15: 'autoGearDefaultDirectorMonitorLabel',
};

function normalizeAutoGearMonitorDefaults(value) {
  const result = {
    focus: '',
    handheld7: '',
    combo15: '',
    director15: '',
  };
  if (!value || typeof value !== 'object') {
    return result;
  }
  Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(key => {
    const type = AUTO_GEAR_MONITOR_DEFAULT_TYPES[key];
    const normalized = normalizeAutoGearSelectorDefault(type, value[key]);
    result[key] = normalized;
  });
  return result;
}

function readAutoGearMonitorDefaultsFromStorage() {
  let stored = {};
  if (typeof loadAutoGearMonitorDefaults === 'function') {
    try {
      stored = loadAutoGearMonitorDefaults();
    } catch (error) {
      console.warn('Failed to load automatic gear monitor defaults', error);
      stored = {};
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY);
      stored = raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn('Failed to read automatic gear monitor defaults from storage', error);
      stored = {};
    }
  }
  return normalizeAutoGearMonitorDefaults(stored);
}

function persistAutoGearMonitorDefaults(defaults) {
  const payload = normalizeAutoGearMonitorDefaults(defaults);
  if (typeof saveAutoGearMonitorDefaults === 'function') {
    try {
      saveAutoGearMonitorDefaults(payload);
      return payload;
    } catch (error) {
      console.warn('Failed to save automatic gear monitor defaults', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return payload;
  }
  try {
    localStorage.setItem(AUTO_GEAR_MONITOR_DEFAULTS_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist automatic gear monitor defaults', error);
  }
  return payload;
}

function readActiveAutoGearPresetIdFromStorage() {
  if (typeof loadAutoGearActivePresetId === 'function') {
    try {
      const value = loadAutoGearActivePresetId();
      return typeof value === 'string' ? value : '';
    } catch (error) {
      console.warn('Failed to load automatic gear active preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const value = localStorage.getItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.warn('Failed to read automatic gear active preset id from storage', error);
    return '';
  }
}

function persistActiveAutoGearPresetId(presetId) {
  if (typeof saveAutoGearActivePresetId === 'function') {
    try {
      saveAutoGearActivePresetId(typeof presetId === 'string' ? presetId : '');
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear active preset id', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (presetId) {
      localStorage.setItem(AUTO_GEAR_ACTIVE_PRESET_KEY, presetId);
    } else {
      localStorage.removeItem(AUTO_GEAR_ACTIVE_PRESET_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear active preset id', error);
  }
}

function readAutoGearAutoPresetIdFromStorage() {
  if (typeof loadAutoGearAutoPresetId === 'function') {
    try {
      const value = loadAutoGearAutoPresetId();
      return typeof value === 'string' ? value : '';
    } catch (error) {
      console.warn('Failed to load automatic gear auto preset id', error);
      return '';
    }
  }
  if (typeof localStorage === 'undefined') return '';
  try {
    const value = localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY);
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.warn('Failed to read automatic gear auto preset id from storage', error);
    return '';
  }
}

function persistAutoGearAutoPresetId(presetId) {
  if (typeof saveAutoGearAutoPresetId === 'function') {
    try {
      saveAutoGearAutoPresetId(typeof presetId === 'string' ? presetId : '');
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear auto preset id', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (presetId) {
      localStorage.setItem(AUTO_GEAR_AUTO_PRESET_KEY, presetId);
    } else {
      localStorage.removeItem(AUTO_GEAR_AUTO_PRESET_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear auto preset id', error);
  }
}

function readAutoGearBackupVisibilityFromStorage() {
  if (typeof loadAutoGearBackupVisibility === 'function') {
    try {
      return !!loadAutoGearBackupVisibility();
    } catch (error) {
      console.warn('Failed to load automatic gear backup visibility', error);
      return false;
    }
  }
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY) === '1';
  } catch (error) {
    console.warn('Failed to read automatic gear backup visibility from storage', error);
    return false;
  }
}

function persistAutoGearBackupVisibility(flag) {
  const enabled = !!flag;
  if (typeof saveAutoGearBackupVisibility === 'function') {
    try {
      saveAutoGearBackupVisibility(enabled);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear backup visibility', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    if (enabled) {
      localStorage.setItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY, '1');
    } else {
      localStorage.removeItem(AUTO_GEAR_BACKUP_VISIBILITY_KEY);
    }
  } catch (error) {
    console.warn('Failed to persist automatic gear backup visibility', error);
  }
}

function clampAutoGearBackupRetentionLimit(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
  }
  const rounded = Math.round(numeric);
  if (!Number.isFinite(rounded)) {
    return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
  }
  if (rounded < AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE) {
    return AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE;
  }
  if (rounded > AUTO_GEAR_BACKUP_RETENTION_MAX) {
    return AUTO_GEAR_BACKUP_RETENTION_MAX;
  }
  return rounded;
}

function readAutoGearBackupRetentionFromStorage() {
  if (typeof loadAutoGearBackupRetention === 'function') {
    try {
      return clampAutoGearBackupRetentionLimit(loadAutoGearBackupRetention());
    } catch (error) {
      console.warn('Failed to load automatic gear backup retention', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
  }
  try {
    const raw = localStorage.getItem(AUTO_GEAR_BACKUP_RETENTION_KEY);
    if (raw === null || raw === undefined) {
      return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    }
    try {
      const parsed = JSON.parse(raw);
      return clampAutoGearBackupRetentionLimit(parsed);
    } catch (parseError) {
      const numeric = Number(raw);
      if (Number.isFinite(numeric)) {
        return clampAutoGearBackupRetentionLimit(numeric);
      }
      throw parseError;
    }
  } catch (error) {
    console.warn('Failed to read automatic gear backup retention from storage', error);
    return AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
  }
}

function persistAutoGearBackupRetention(retention) {
  const normalized = clampAutoGearBackupRetentionLimit(retention);
  if (typeof saveAutoGearBackupRetention === 'function') {
    try {
      saveAutoGearBackupRetention(normalized);
      return true;
    } catch (error) {
      console.warn('Failed to save automatic gear backup retention', error);
    }
  }
  if (typeof localStorage === 'undefined') {
    return false;
  }
  try {
    localStorage.setItem(AUTO_GEAR_BACKUP_RETENTION_KEY, JSON.stringify(normalized));
    return true;
  } catch (error) {
    console.warn('Failed to persist automatic gear backup retention', error);
    return false;
  }
}

function persistAutoGearBackups(backups) {
  const payload = Array.isArray(backups)
    ? backups.map(entry => ({
        id: entry.id,
        createdAt: entry.createdAt,
        rules: Array.isArray(entry.rules) ? entry.rules : [],
        monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
        note: typeof entry.note === 'string' ? entry.note : undefined,
      }))
    : [];
  if (typeof saveAutoGearBackups === 'function') {
    saveAutoGearBackups(payload);
    return;
  }
  if (typeof localStorage === 'undefined') {
    throw new Error('Storage unavailable');
  }
  localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify(payload));
}

function enforceAutoGearBackupRetentionLimit(limit) {
  const normalized = clampAutoGearBackupRetentionLimit(limit);
  const previousLimit = autoGearBackupRetention;
  if (normalized === previousLimit) {
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    return { success: true, trimmed: [], previousLimit };
  }

  const previousBackups = autoGearBackups.slice();
  const trimmedEntries = [];

  const retentionPersisted = persistAutoGearBackupRetention(normalized);
  if (!retentionPersisted) {
    autoGearBackupRetentionInput && (autoGearBackupRetentionInput.value = String(autoGearBackupRetention));
    callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    return { success: false, error: new Error('retention-persist-failed'), previousLimit };
  }

  autoGearBackupRetention = normalized;

  if (autoGearBackups.length > normalized) {
    const updatedBackups = autoGearBackups.slice(0, normalized);
    trimmedEntries.push(...autoGearBackups.slice(normalized));
    try {
      persistAutoGearBackups(updatedBackups);
      autoGearBackups = updatedBackups;
    } catch (error) {
      console.warn('Failed to trim automatic gear backups to retention limit', error);
      autoGearBackupRetention = previousLimit;
      persistAutoGearBackupRetention(previousLimit);
      try {
        persistAutoGearBackups(previousBackups);
      } catch (restoreError) {
        console.warn('Failed to restore automatic gear backups after trim error', restoreError);
      }
      autoGearBackups = readAutoGearBackupsFromStorage(previousLimit);
      callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
      return { success: false, error, previousLimit };
    }
  }

  callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
  return { success: true, trimmed: trimmedEntries, previousLimit };
}

function readAutoGearRulesFromStorage() {
  let stored = [];
  if (typeof loadAutoGearRules !== 'undefined' && typeof loadAutoGearRules === 'function') {
    try {
      stored = loadAutoGearRules();
    } catch (error) {
      console.warn('Failed to load automatic gear rules', error);
      stored = [];
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(AUTO_GEAR_RULES_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to load automatic gear rules', error);
      stored = [];
    }
  }
  if (!Array.isArray(stored)) return [];
  return stored.map(normalizeAutoGearRule).filter(Boolean);
}

var autoGearRules = readAutoGearRulesFromStorage();
let baseAutoGearRulesState = autoGearRules.slice();
var projectScopedAutoGearRules = null;
var autoGearBackupRetention = readAutoGearBackupRetentionFromStorage();
var autoGearBackups = readAutoGearBackupsFromStorage(autoGearBackupRetention);
var autoGearPresets = readAutoGearPresetsFromStorage();
var activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
let autoGearAutoPresetIdState = readAutoGearAutoPresetIdFromStorage();
var autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
var autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
persistAutoGearBackupRetention(autoGearBackupRetention);
var factoryAutoGearRulesSnapshot = null;
var factoryAutoGearSeedContext = null;
var autoGearBackupRetentionWarningText = '';
var autoGearEditorDraft = null;
var autoGearEditorActiveItem = null;
var autoGearDraftPendingWarnings = null;
var autoGearSearchQuery = '';
var autoGearSummaryFocus = 'all';
var autoGearSummaryLast = null;
var autoGearScenarioFilter = 'all';

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
function getAutoGearBackupEntrySignature(entry) {
  if (!entry || typeof entry !== 'object') return '';
  return stableStringify({
    rules: Array.isArray(entry.rules) ? entry.rules : [],
    monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults),
    note: typeof entry.note === 'string' ? entry.note : '',
  });
}

function getAutoGearConfigurationSignature(
  rules = baseAutoGearRulesState,
  defaults = autoGearMonitorDefaults,
) {
  return stableStringify({
    rules: Array.isArray(rules) ? rules : [],
    monitorDefaults: normalizeAutoGearMonitorDefaults(defaults),
  });
}

function getAutoGearMonitorDefaultsSnapshot() {
  return normalizeAutoGearMonitorDefaults(autoGearMonitorDefaults);
}

const initialAutoGearRulesSignature = getAutoGearConfigurationSignature(autoGearRules, autoGearMonitorDefaults);
var autoGearRulesLastBackupSignature = autoGearBackups.length
  ? getAutoGearConfigurationSignature(autoGearBackups[0].rules, autoGearBackups[0].monitorDefaults)
  : initialAutoGearRulesSignature;
var autoGearRulesLastPersistedSignature = initialAutoGearRulesSignature;
var autoGearRulesDirtySinceBackup =
  autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;

enqueueCoreBootTask(() => {
  callCoreFunctionIfAvailable(
    'reconcileAutoGearAutoPresetState',
    [{ persist: true, skipRender: true }],
    { defer: true }
  );
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{ skipRender: true }], { defer: true });
});

function assignAutoGearRules(rules) {
  autoGearRules = Array.isArray(rules)
    ? rules.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  return autoGearRules;
}

function syncBaseAutoGearRulesState() {
  const signature = getAutoGearConfigurationSignature();
  autoGearRulesLastPersistedSignature = signature;
  autoGearRulesDirtySinceBackup = signature !== autoGearRulesLastBackupSignature;
}

function persistAutoGearRules() {
  if (typeof saveAutoGearRules !== 'undefined' && typeof saveAutoGearRules === 'function') {
    try {
      saveAutoGearRules(autoGearRules);
      return;
    } catch (error) {
      console.warn('Failed to save automatic gear rules', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_RULES_KEY, JSON.stringify(autoGearRules));
  } catch (error) {
    console.warn('Failed to save automatic gear rules', error);
  }
}

function getAutoGearMonitorDefault(key) {
  if (!Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, key)) {
    return '';
  }
  return normalizeAutoGearSelectorDefault(
    AUTO_GEAR_MONITOR_DEFAULT_TYPES[key],
    autoGearMonitorDefaults[key],
  );
}

function getAutoGearMonitorDefaults() {
  return { ...autoGearMonitorDefaults };
}

function setAutoGearMonitorDefaults(defaults, { skipRender = false, skipRefresh = false } = {}) {
  const normalized = normalizeAutoGearMonitorDefaults(defaults);
  let changed = false;
  Object.keys(AUTO_GEAR_MONITOR_DEFAULT_TYPES).forEach(key => {
    const existing = autoGearMonitorDefaults[key] || '';
    const next = normalized[key] || '';
    if (existing !== next) {
      changed = true;
    }
  });
  if (!changed) {
    if (!skipRender) {
      callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], { defer: true });
      callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], { defer: true });
    }
    return autoGearMonitorDefaults;
  }
  autoGearMonitorDefaults = persistAutoGearMonitorDefaults(normalized);
  syncBaseAutoGearRulesState();
  if (!skipRender) {
    callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], { defer: true });
    callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], { defer: true });
  }
  if (!skipRefresh && typeof refreshGearListIfVisible === 'function') {
    refreshGearListIfVisible();
  }
  return autoGearMonitorDefaults;
}

function setAutoGearMonitorDefault(key, value, options = {}) {
  if (!Object.prototype.hasOwnProperty.call(AUTO_GEAR_MONITOR_DEFAULT_TYPES, key)) {
    return getAutoGearMonitorDefault(key);
  }
  const current = autoGearMonitorDefaults[key] || '';
  const normalizedValue = normalizeAutoGearSelectorDefault(
    AUTO_GEAR_MONITOR_DEFAULT_TYPES[key],
    value,
  );
  if (current === normalizedValue) {
    if (!options.skipRender) {
      callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], { defer: true });
      callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], { defer: true });
    }
    return normalizedValue;
  }
  const nextDefaults = { ...autoGearMonitorDefaults, [key]: normalizedValue };
  setAutoGearMonitorDefaults(nextDefaults, options);
  return normalizedValue;
}

function setAutoGearRules(rules) {
  const normalized = assignAutoGearRules(rules);
  baseAutoGearRulesState = normalized.slice();
  projectScopedAutoGearRules = null;
  persistAutoGearRules();
  syncBaseAutoGearRulesState();
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{ skipRender: true }], { defer: true });
  callCoreFunctionIfAvailable('syncAutoGearAutoPreset', [normalized], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
}

function getAutoGearRules() {
  return autoGearRules.slice();
}

function syncAutoGearRulesFromStorage(rules) {
  if (Array.isArray(rules)) {
    setAutoGearRules(rules);
  } else {
    baseAutoGearRulesState = readAutoGearRulesFromStorage();
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
    syncBaseAutoGearRulesState();
  }
  autoGearBackupRetention = readAutoGearBackupRetentionFromStorage();
  autoGearBackups = readAutoGearBackupsFromStorage(autoGearBackupRetention);
  autoGearPresets = readAutoGearPresetsFromStorage();
  activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
  autoGearAutoPresetIdState = readAutoGearAutoPresetIdFromStorage();
  autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
  autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
  autoGearRulesLastBackupSignature = autoGearBackups.length
    ? getAutoGearConfigurationSignature(autoGearBackups[0].rules, autoGearBackups[0].monitorDefaults)
    : getAutoGearConfigurationSignature();
  autoGearRulesLastPersistedSignature = getAutoGearConfigurationSignature();
  autoGearRulesDirtySinceBackup = autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;
  callCoreFunctionIfAvailable(
    'reconcileAutoGearAutoPresetState',
    [{ persist: true, skipRender: true }],
    { defer: true }
  );
  callCoreFunctionIfAvailable('syncAutoGearAutoPreset', [baseAutoGearRulesState], { defer: true });
  callCoreFunctionIfAvailable('alignActiveAutoGearPreset', [{ skipRender: true }], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
  callCoreFunctionIfAvailable('closeAutoGearEditor', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
  callCoreFunctionIfAvailable('updateAutoGearCatalogOptions', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], { defer: true });
}

function useProjectAutoGearRules(rules) {
  if (Array.isArray(rules) && rules.length) {
    projectScopedAutoGearRules = assignAutoGearRules(rules).slice();
  } else {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
  }
}

function clearProjectAutoGearRules() {
  if (!projectScopedAutoGearRules || !projectScopedAutoGearRules.length) {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRulesState);
    return;
  }
  projectScopedAutoGearRules = null;
  assignAutoGearRules(baseAutoGearRulesState);
}

function getProjectScopedAutoGearRules() {
  return projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
}

function usingProjectAutoGearRules() {
  return Array.isArray(projectScopedAutoGearRules) && projectScopedAutoGearRules.length > 0;
}

function getBaseAutoGearRules() {
  return baseAutoGearRulesState.slice();
}

function autoGearRuleSignature(rule) {
  const snapshot = snapshotAutoGearRuleForFingerprint(rule);
  if (!snapshot) return '';
  return stableStringify(snapshot);
}

function mergeAutoGearRules(existing, incoming) {
  const normalizedExisting = Array.isArray(existing)
    ? existing.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  const seen = new Set(normalizedExisting.map(autoGearRuleSignature));
  (Array.isArray(incoming) ? incoming : []).forEach(rule => {
    const normalized = normalizeAutoGearRule(rule);
    if (!normalized) return;
    const signature = autoGearRuleSignature(normalized);
    if (seen.has(signature)) return;
    normalizedExisting.push(normalized);
    seen.add(signature);
  });
  return normalizedExisting;
}

function looksLikeGearName(name) {
  return typeof name === 'string' && name !== 'None' && (/[A-Z]/.test(name) || /\d/.test(name) || name.includes(' '));
}

function hasSeededAutoGearDefaults() {
  if (typeof loadAutoGearSeedFlag !== 'undefined' && typeof loadAutoGearSeedFlag === 'function') {
    try {
      return !!loadAutoGearSeedFlag();
    } catch (error) {
      console.warn('Failed to read automatic gear seed flag', error);
      return false;
    }
  }
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(AUTO_GEAR_SEEDED_KEY) === '1';
  } catch (error) {
    console.warn('Failed to read automatic gear seed flag', error);
    return false;
  }
}

function markAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(true);
      return;
    } catch (error) {
      console.warn('Failed to persist automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AUTO_GEAR_SEEDED_KEY, '1');
  } catch (error) {
    console.warn('Failed to persist automatic gear seed flag', error);
  }
}

function clearAutoGearDefaultsSeeded() {
  if (typeof saveAutoGearSeedFlag !== 'undefined' && typeof saveAutoGearSeedFlag === 'function') {
    try {
      saveAutoGearSeedFlag(false);
      return;
    } catch (error) {
      console.warn('Failed to clear automatic gear seed flag', error);
    }
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(AUTO_GEAR_SEEDED_KEY);
  } catch (error) {
    console.warn('Failed to clear automatic gear seed flag', error);
  }
}

function parseGearTableForAutoRules(html) {
  if (!html || typeof DOMParser !== 'function') return null;
  let doc;
  try {
    doc = new DOMParser().parseFromString(html, 'text/html');
  } catch (error) {
    console.warn('Failed to parse gear table for automatic rule seeding', error);
    return null;
  }
  const table = doc.querySelector('.gear-table');
  if (!table) return null;
  const categoryMaps = new Map();
  table.querySelectorAll('tbody.category-group').forEach(group => {
    const header = group.querySelector('.category-row td');
    if (!header) return;
    const category = header.textContent ? header.textContent.trim() : '';
    if (!category) return;
    const items = categoryMaps.get(category) || new Map();
    group.querySelectorAll('.gear-item').forEach(span => {
      const name = span.getAttribute('data-gear-name');
      if (!looksLikeGearName(name)) return;
      const text = span.textContent ? span.textContent.trim() : '';
      const match = text.match(/^(\d+)x\s+/);
      const quantity = match ? parseInt(match[1], 10) : 1;
      if (!Number.isFinite(quantity) || quantity <= 0) return;
      items.set(name, (items.get(name) || 0) + quantity);
    });
    if (items.size) categoryMaps.set(category, items);
  });
  return categoryMaps;
}

function diffGearTableMaps(baseMap, variantMap) {
  if (!baseMap || !variantMap) return { add: [], remove: [] };
  const add = [];
  const remove = [];
  const categories = new Set([...baseMap.keys(), ...variantMap.keys()]);
  categories.forEach(category => {
    const baseItems = baseMap.get(category) || new Map();
    const variantItems = variantMap.get(category) || new Map();
    const names = new Set([...baseItems.keys(), ...variantItems.keys()]);
    names.forEach(name => {
      const baseQty = baseItems.get(name) || 0;
      const variantQty = variantItems.get(name) || 0;
      if (variantQty > baseQty) {
        add.push({ name, category, quantity: variantQty - baseQty });
      } else if (variantQty < baseQty) {
        remove.push({ name, category, quantity: baseQty - variantQty });
      }
    });
  });
  return { add, remove };
}

function cloneAutoGearItems(items) {
  return items
    .map(item => {
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized };
    })
    .filter(Boolean);
}

function cloneAutoGearRuleItem(item) {
  if (!item || typeof item !== 'object') {
    return {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
      contextNotes: [],
    };
  }
  return {
    id: typeof item.id === 'string' ? item.id : '',
    name: typeof item.name === 'string' ? item.name : '',
    category: typeof item.category === 'string' ? item.category : '',
    quantity: normalizeAutoGearQuantity(item.quantity),
    screenSize: typeof item.screenSize === 'string' ? item.screenSize : '',
    selectorType: typeof item.selectorType === 'string' ? item.selectorType : 'none',
    selectorDefault: typeof item.selectorDefault === 'string' ? item.selectorDefault : '',
    selectorEnabled: !!item.selectorEnabled,
    notes: typeof item.notes === 'string' ? item.notes : '',
    contextNotes: Array.isArray(item.contextNotes) ? item.contextNotes.filter(Boolean) : [],
  };
}

function cloneAutoGearRule(rule) {
  if (!rule || typeof rule !== 'object') return null;
  return {
    id: typeof rule.id === 'string' ? rule.id : '',
    label: typeof rule.label === 'string' ? rule.label : '',
    always: Boolean(rule.always),
    scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
    mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
    cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
    viewfinderExtension: Array.isArray(rule.viewfinderExtension)
      ? rule.viewfinderExtension.slice()
      : [],
    videoDistribution: Array.isArray(rule.videoDistribution)
      ? rule.videoDistribution.slice()
      : [],
    camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
    monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
    tripodHeadBrand: Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.slice() : [],
    tripodBowl: Array.isArray(rule.tripodBowl) ? rule.tripodBowl.slice() : [],
    tripodTypes: Array.isArray(rule.tripodTypes) ? rule.tripodTypes.slice() : [],
    tripodSpreader: Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.slice() : [],
    crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
    crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
    wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
    motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
    controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
    distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
    shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
    add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearRuleItem) : [],
    remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearRuleItem) : [],
  };
}

function cloneAutoGearRules(rules) {
  return Array.isArray(rules)
    ? rules.map(cloneAutoGearRule).filter(Boolean)
    : [];
}

function setFactoryAutoGearRulesSnapshot(rules) {
  if (!Array.isArray(rules)) {
    factoryAutoGearRulesSnapshot = null;
    return;
  }
  factoryAutoGearRulesSnapshot = cloneAutoGearRules(rules);
}

function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
  const adjust = (items, type) => items
    .map(item => {
      let remaining = normalizeAutoGearQuantity(item.quantity);
      scenarioKeys.forEach(key => {
        const scenarioDiff = scenarioDiffMap.get(key);
        if (!scenarioDiff) return;
        const match = scenarioDiff[type].find(entry => entry.name === item.name && entry.category === item.category);
        if (match) {
          remaining -= normalizeAutoGearQuantity(match.quantity);
        }
      });
      remaining = Math.max(remaining, 0);
      if (remaining <= 0) return null;
      const normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return { ...normalized, quantity: remaining };
    })
    .filter(Boolean);
  return { add: adjust(diff.add, 'add'), remove: adjust(diff.remove, 'remove') };
}

function extractAutoGearSelections(value) {
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);
}

function buildCameraHandleAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.cameraHandle);
  const selectionSet = new Set(selections);
  const optionValues = [];

  if (typeof document !== 'undefined') {
    const handleSelect = document.getElementById('cameraHandle');
    if (handleSelect) {
      Array.from(handleSelect.options || []).forEach(option => {
        const value = typeof option.value === 'string' ? option.value.trim() : '';
        if (value) optionValues.push(value);
      });
    }
  }

  const candidates = Array.from(new Set(
    selections
      .concat(optionValues)
      .map(value => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean)
  ));

  if (!candidates.length) return [];

  const rules = [];

  candidates.forEach(candidate => {
    const trimmed = candidate.trim();
    if (!trimmed) return;

    let variantHandles;
    let diff;

    if (selectionSet.has(trimmed)) {
      variantHandles = selections.filter(value => value !== trimmed);
      const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      diff = diffGearTableMaps(variantMap, baselineMap);
    } else {
      variantHandles = selections.slice();
      variantHandles.push(trimmed);
      const variantInfo = { ...baseInfo, cameraHandle: variantHandles.join(', ') };
      const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
      const variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      diff = diffGearTableMaps(baselineMap, variantMap);
    }

    if (!diff || (!diff.add.length && !diff.remove.length)) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: trimmed,
      scenarios: [],
      mattebox: [],
      cameraHandle: [trimmed],
      viewfinderExtension: [],
      videoDistribution: [],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildViewfinderExtensionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.viewfinderExtension);
  if (!selections.length) return [];

  const uniqueSelections = Array.from(new Set(selections));
  const rules = [];

  uniqueSelections.forEach(selection => {
    const trimmed = selection.trim();
    if (!trimmed) return;

    const remainingSelections = selections.filter(value => value !== trimmed);
    const variantInfo = { ...baseInfo, viewfinderExtension: remainingSelections.join(', ') };
    const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
    const variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;

    const diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: getViewfinderFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [trimmed],
      videoDistribution: [],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildVideoDistributionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const selections = extractAutoGearSelections(baseInfo && baseInfo.videoDistribution);
  if (!selections.length) return [];

  const uniqueSelections = Array.from(new Set(selections));
  const rules = [];

  uniqueSelections.forEach(selection => {
    const trimmed = selection.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') return;

    const remainingSelections = selections.filter(value => value !== trimmed);
    const variantInfo = { ...baseInfo, videoDistribution: remainingSelections.join(', ') };
    const variantHtml = generateGearListHtml({ ...variantInfo, requiredScenarios: '' });
    const variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;

    const diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;

    const additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    const removals = cloneAutoGearItems(diff.remove);

    rules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals,
    });
  });

  return rules;
}

function buildOnboardMonitorRiggingAutoGearRules() {
  const select = typeof monitorSelect !== 'undefined' ? monitorSelect : null;
  if (!select || !select.options) {
    return [];
  }

  const rules = [];
  const seen = new Set();

  Array.from(select.options).forEach(option => {
    if (!option) return;
    const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
    if (!rawValue || rawValue === 'None') return;
    const label = typeof option.textContent === 'string' ? option.textContent.trim() : '';
    if (!label) return;
    const normalized = normalizeAutoGearTriggerValue(label);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);

    rules.push({
      id: generateAutoGearId('rule'),
      label: `Onboard monitor: ${label}`,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [],
      camera: [],
      monitor: [label],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      add: [
        {
          id: generateAutoGearId('item'),
          name: 'ULCS Arm mit 3/8" und 1/4" double',
          category: 'Rigging',
          quantity: 1,
          contextNotes: [`Onboard monitor: ${label}`],
        },
      ],
      remove: [],
    });
  });

  return rules;
}

function buildTripodPreferenceAutoGearRules(baseInfo = {}) {
  const brand = typeof baseInfo.tripodHeadBrand === 'string' ? baseInfo.tripodHeadBrand.trim() : '';
  const bowl = typeof baseInfo.tripodBowl === 'string' ? baseInfo.tripodBowl.trim() : '';
  if (!brand || !bowl) return [];

  const normalizedBrand = normalizeAutoGearTriggerValue(brand);
  const normalizedBowl = normalizeAutoGearTriggerValue(bowl);
  if (!normalizedBrand || !normalizedBowl) return [];

  const combos = [
    {
      brand: "O'Connor",
      entries: [
        { bowl: '100mm bowl', item: "O'Connor Ultimate 1040 Fluid-Head 100mm bowl" },
        { bowl: '150mm bowl', item: "O'Connor Ultimate 2560 Fluid-Head 150mm bowl" },
        { bowl: 'Mitchell Mount', item: "O'Connor Ultimate 2560 Fluid-Head Mitchell Mount" },
      ],
    },
    {
      brand: 'Sachtler',
      entries: [
        { bowl: '75mm bowl', item: 'Sachtler aktiv8 head 75mm bowl' },
        { bowl: '100mm bowl', item: 'Sachtler aktiv18T head 100mm bowl' },
        { bowl: '150mm bowl', item: 'Sachtler Cine 30 head 150mm bowl' },
        { bowl: 'Mitchell Mount', item: 'Sachtler Cine 30 head Mitchell mount' },
      ],
    },
  ];

  const matchedBrand = combos.find(entry => normalizeAutoGearTriggerValue(entry.brand) === normalizedBrand);
  if (!matchedBrand) return [];

  const matchingEntries = matchedBrand.entries.filter(entry => {
    return normalizeAutoGearTriggerValue(entry.bowl) === normalizedBowl;
  });
  if (!matchingEntries.length) return [];

  return matchingEntries.map(entry => {
    const itemName = entry.item;
    const contextNotes = ['Tripod preferences'];
    return {
      id: generateAutoGearId('rule'),
      label: `Tripod head: ${itemName}`,
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      cameraWeight: null,
      monitor: [],
      tripodHeadBrand: [matchedBrand.brand],
      tripodBowl: [entry.bowl],
      tripodTypes: [],
      tripodSpreader: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: null,
      add: [{
        id: generateAutoGearId('item'),
        name: itemName,
        category: 'Grip',
        quantity: 1,
        screenSize: '',
        selectorType: 'tripodHeadBrand',
        selectorDefault: itemName,
        selectorEnabled: true,
        notes: '',
        contextNotes,
      }],
      remove: [],
    };
  });
}

function buildDefaultVideoDistributionAutoGearRules(baseInfo = {}) {
  if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }

  const select = document.getElementById('videoDistribution');
  if (!select) return [];

  const optionValues = [];
  const seen = new Set();
  Array.from(select.options || []).forEach(option => {
    if (!option) return;
    const rawValue = typeof option.value === 'string' ? option.value.trim() : '';
    const normalized = normalizeVideoDistributionOptionValue(rawValue);
    if (!normalized || normalized === '__none__') return;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    optionValues.push(rawValue);
  });

  if (!optionValues.length) return [];

  const baseProjectInfo = { ...(baseInfo || {}) };
  delete baseProjectInfo.videoDistribution;
  const emptyHtml = generateGearListHtml({ ...baseProjectInfo, requiredScenarios: '' });
  const emptyMap = parseGearTableForAutoRules(emptyHtml);
  if (!emptyMap) return [];

  const generatedRules = [];
  const handledTriggers = new Set();

  optionValues.forEach(rawValue => {
    const trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!trimmed) return;
    const normalized = normalizeVideoDistributionOptionValue(trimmed);
    if (!normalized || handledTriggers.has(normalized)) return;
    handledTriggers.add(normalized);

    const infoForSelection = { ...(baseInfo || {}), videoDistribution: trimmed };
    const selectionHtml = generateGearListHtml({ ...infoForSelection, requiredScenarios: '' });
    const selectionMap = parseGearTableForAutoRules(selectionHtml);
    if (!selectionMap) return;

    const diff = diffGearTableMaps(emptyMap, selectionMap);
    const additions = cloneAutoGearItems(diff.add);
    const removals = cloneAutoGearItems(diff.remove);
    if (!additions.length && !removals.length) return;

    generatedRules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals,
    });
  });

  const hasIosOption = optionValues.some(value => value && value.toLowerCase() === 'ios video');
  if (hasIosOption) {
    const iosLabel = optionValues.find(value => value && value.toLowerCase() === 'ios video') || 'IOS Video';
    const normalizedIos = normalizeAutoGearTriggerValue(iosLabel);
    const hasGeneratedIosRule = generatedRules.some(rule =>
      Array.isArray(rule.videoDistribution)
        && rule.videoDistribution.some(value => normalizeAutoGearTriggerValue(value) === normalizedIos)
    );
    if (!hasGeneratedIosRule) {
      const createdNames = new Set();
      const createItem = (name, category, quantity = 1) => {
        if (!name || !category || quantity <= 0) return null;
        const key = `${name}|${category}`;
        if (createdNames.has(key)) return null;
        createdNames.add(key);
        return {
          id: generateAutoGearId('item'),
          name,
          category,
          quantity,
          screenSize: '',
          selectorType: 'none',
          selectorDefault: '',
          selectorEnabled: false,
          notes: '',
        };
      };

      const additions = [];
      const iosDevices = devices && typeof devices === 'object' ? devices.iosVideo : null;
      if (iosDevices && typeof iosDevices === 'object') {
        Object.keys(iosDevices).forEach(deviceName => {
          const item = createItem(deviceName, 'Monitoring');
          if (item) additions.push(item);
        });
      }

      if (!additions.length) {
        const fallback = createItem('Teradek - Link AX WifiRouter/Access Point', 'Monitoring');
        if (fallback) additions.push(fallback);
      }

      const pushSupport = (name, category, quantity = 1) => {
        const item = createItem(name, category, quantity);
        if (item) additions.push(item);
      };

      pushSupport('Apple iPad Air 5 or better', 'Monitoring', 1);
      pushSupport('USB-C Charger (iOS Video)', 'Monitoring support', 2);
      pushSupport('Wi-Fi Router (iOS Video Village)', 'Monitoring support');

      if (additions.length) {
        generatedRules.push({
          id: generateAutoGearId('rule'),
          label: getVideoDistributionFallbackLabel(iosLabel),
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [iosLabel],
          add: additions,
          remove: [],
        });
      }
    }
  }

  return generatedRules;
}

function buildDefaultMatteboxAutoGearRules() {
  const category = 'Matte box + filter';
  const createItems = names => names.map(name => ({
    id: generateAutoGearId('item'),
    name,
    category,
    quantity: 1,
  }));
  return [
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Swing Away',
      scenarios: [],
      mattebox: ['Swing Away'],
      add: createItems([
        'ARRI LMB 4x5 Pro Set',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Rod based',
      scenarios: [],
      mattebox: ['Rod based'],
      add: createItems([
        'ARRI LMB 4x5 15mm LWS Set 3-Stage',
        'ARRI LMB 19mm Studio Rod Adapter',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
      ]),
      remove: [],
    },
    {
      id: generateAutoGearId('rule'),
      label: 'Mattebox: Clamp On',
      scenarios: [],
      mattebox: ['Clamp On'],
      add: createItems([
        'ARRI LMB 4x5 Clamp-On (3-Stage)',
        'ARRI LMB 4x5 / LMB-6 Tray Catcher',
        'ARRI LMB 4x5 Side Flags',
        'ARRI LMB Flag Holders',
        'ARRI LMB 4x5 Set of Mattes spherical',
        'ARRI LMB Accessory Adapter',
        'ARRI Anti-Reflection Frame 4x5.65',
        'ARRI LMB 4x5 Clamp Adapter Set Pro',
      ]),
      remove: [],
    }
  ];
}

function buildAutoGearAnyMotorRule() {
  if (typeof captureSetupSelectValues !== 'function') return null;
  const setupValues = captureSetupSelectValues();
  const selectedMotors = Array.isArray(setupValues?.motors)
    ? setupValues.motors.filter(value => typeof value === 'string' && value && value !== 'None')
    : [];
  if (!selectedMotors.length) return null;

  const createItem = (name, category, quantity = 1) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
    };
  };

  const additions = [];
  const pushItem = (name, category, quantity = 1) => {
    const item = createItem(name, category, quantity);
    if (item) additions.push(item);
  };

  pushItem('Avenger C-Stand Sliding Leg 20" (Focus)', 'Grip');
  pushItem('Steelfingers Wheel C-Stand 3er Set (Focus)', 'Grip');
  pushItem('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)', 'Grip');
  pushItem('Tennis ball', 'Grip', 3);
  pushItem('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Monitoring support', 2);
  pushItem('Ultraslim BNC Cable 0.3 m (Focus)', 'Monitoring support', 2);
  pushItem('Bebob V150micro (V-Mount) (Focus)', 'Monitoring Batteries', 3);

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'FIZ motor support kit',
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    deliveryResolution: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [AUTO_GEAR_ANY_MOTOR_TOKEN],
    controllers: [],
    distance: [],
    add: additions,
    remove: [],
  };
}

function buildAlwaysAutoGearRule() {
  const createItem = (name, category, quantity = 1, options = {}) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
      selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
      selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
      selectorEnabled: options.selectorEnabled === true,
      notes: typeof options.notes === 'string' ? options.notes : '',
    };
  };
  const additions = [];
  const pushItem = (name, category, quantity, options) => {
    const item = createItem(name, category, quantity, options);
    if (item) additions.push(item);
  };
  [
    ['BNC Cable 0.5 m', 'Monitoring support', 1],
    ['BNC Cable 1 m', 'Monitoring support', 1],
    ['BNC Cable 5 m', 'Monitoring support', 1],
    ['BNC Cable 10 m', 'Monitoring support', 1],
    ['BNC Drum 25 m', 'Monitoring support', 1],
    ['ULCS Bracket with 1/4" to 1/4"', 'Rigging', 2],
    ['ULCS Bracket with 3/8" to 1/4"', 'Rigging', 2],
    ['Noga Arm', 'Rigging', 2],
    ['Mini Magic Arm', 'Rigging', 2],
    ['Cine Quick Release', 'Rigging', 4],
    ['SmallRig - Super lightweight 15mm RailBlock', 'Rigging', 1],
    ['Spigot with male 3/8" and 1/4"', 'Rigging', 3],
    ['Clapper Stick', 'Rigging', 2],
    ['D-Tap Splitter', 'Rigging', 2],
    ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung', 'Carts and Transportation', 1],
    ['Securing Straps (25mm wide)', 'Carts and Transportation', 10],
    ['Loading Ramp (pair, 420kg)', 'Carts and Transportation', 1],
    ['Ring Fitting for Airline Rails', 'Carts and Transportation', 20],
    ['Power Cable Drum 25-50 m', 'Power', 1],
    ['Power Cable 10 m', 'Power', 2],
    ['Power Cable 5 m', 'Power', 2],
    ['Power Strip', 'Power', 3],
    ['Power Three Way Splitter', 'Power', 3],
    ['PRCD-S (Portable Residual Current Device-Safety)', 'Power', 3],
  ].forEach(([name, category, quantity]) => pushItem(name, category, quantity));

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'Always',
    always: true,
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    add: additions,
    remove: [],
  };
}

function buildFiveDayConsumablesAutoGearRule() {
  const createItem = (name, category, quantity = 1, options = {}) => {
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name,
      category,
      quantity,
      screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
      selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
      selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
      selectorEnabled: options.selectorEnabled === true,
      notes: typeof options.notes === 'string' ? options.notes : '',
    };
  };

  const additions = [];
  const pushItem = (name, category, quantity, options) => {
    const item = createItem(name, category, quantity, options);
    if (item) additions.push(item);
  };

  pushItem('Bluestar eye leather made of microfiber oval, large', 'Consumables', 4);
  pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Primary color roll' });
  pushItem('Pro Gaff Tape', 'Consumables', 2, { notes: 'Secondary color roll' });
  pushItem('Clapper Stick', 'Rigging', 4);
  pushItem('Kimtech Wipes', 'Consumables', 2);
  pushItem('Sprigs Red 1/4"', 'Consumables', 1);

  if (!additions.length) return null;

  return {
    id: generateAutoGearId('rule'),
    label: 'Every 5 shooting days',
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    deliveryResolution: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    shootingDays: { mode: 'every', value: 5 },
    add: additions,
    remove: [],
  };
}

function ensureDefaultMatteboxAutoGearRules() {
  const defaults = buildDefaultMatteboxAutoGearRules();
  if (!defaults.length) return false;
  const existingKeys = new Set(
    autoGearRules
      .map(autoGearRuleMatteboxKey)
      .filter(Boolean)
  );
  const additions = defaults.filter(rule => {
    const key = autoGearRuleMatteboxKey(rule);
    if (!key) return false;
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  if (!additions.length) return false;
  setAutoGearRules(autoGearRules.concat(additions));
  return true;
}

function captureSetupSelectValues() {
  const captureList = list => list.map(sel => (sel && typeof sel.value === 'string') ? sel.value : '');
  const captured = {
    camera: cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '',
    monitor: monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '',
    video: videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '',
    cage: cageSelect && typeof cageSelect.value === 'string' ? cageSelect.value : '',
    distance: distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '',
    battery: batterySelect && typeof batterySelect.value === 'string' ? batterySelect.value : '',
    batteryPlate: batteryPlateSelect && typeof batteryPlateSelect.value === 'string'
      ? batteryPlateSelect.value
      : '',
    hotswap: hotswapSelect && typeof hotswapSelect.value === 'string' ? hotswapSelect.value : '',
    motors: captureList(motorSelects),
    controllers: captureList(controllerSelects),
    sliderBowl: typeof getSliderBowlValue === 'function' ? getSliderBowlValue() : '',
    easyrig: typeof getEasyrigValue === 'function' ? getEasyrigValue() : '',
  };
  return finalizeCapturedSetupValues(captured);
}

function finalizeCapturedSetupValues(values) {
  if (!values || typeof values !== 'object') {
    return values;
  }
  values.batteryPlate = normalizeBatteryPlateValue(values.batteryPlate, values.battery);
  return values;
}

function applySetupSelectValues(values) {
  if (!values || typeof values !== 'object') return;
  if (cameraSelect) {
    setSelectValue(cameraSelect, values.camera);
    if (typeof updateBatteryPlateVisibility === 'function') {
      updateBatteryPlateVisibility();
    }
    if (typeof updateBatteryOptions === 'function') {
      updateBatteryOptions();
    }
  }
  if (batteryPlateSelect) setSelectValue(batteryPlateSelect, values.batteryPlate);
  if (values && typeof values.battery === 'string') {
    applyBatteryPlateSelectionFromBattery(values.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
  }
  if (monitorSelect) setSelectValue(monitorSelect, values.monitor);
  if (videoSelect) setSelectValue(videoSelect, values.video);
  if (cageSelect) setSelectValue(cageSelect, values.cage);
  if (distanceSelect) setSelectValue(distanceSelect, values.distance);
  if (Array.isArray(values.motors)) {
    values.motors.forEach((val, index) => {
      if (motorSelects[index]) setSelectValue(motorSelects[index], val);
    });
  }
  if (Array.isArray(values.controllers)) {
    values.controllers.forEach((val, index) => {
      if (controllerSelects[index]) setSelectValue(controllerSelects[index], val);
    });
  }
  if (batterySelect) setSelectValue(batterySelect, values.battery);
  if (hotswapSelect) setSelectValue(hotswapSelect, values.hotswap);
  if (typeof setSliderBowlValue === 'function') setSliderBowlValue(values.sliderBowl);
  if (typeof setEasyrigValue === 'function') setEasyrigValue(values.easyrig);
}

function captureAutoGearSeedContext() {
  if (factoryAutoGearSeedContext) return;
  if (typeof collectProjectFormData !== 'function') return;
  const baseInfo = collectProjectFormData() || {};
  let projectDataClone;
  try {
    projectDataClone = JSON.parse(JSON.stringify(baseInfo));
  } catch (cloneError) {
    void cloneError;
    projectDataClone = { ...baseInfo };
  }
  const scenarioValues = requiredScenariosSelect
    ? Array.from(requiredScenariosSelect.options || [])
        .map(opt => opt && typeof opt.value === 'string' ? opt.value : '')
        .filter(value => value)
    : [];
  factoryAutoGearSeedContext = {
    projectFormData: projectDataClone,
    scenarioValues,
    setupValues: captureSetupSelectValues(),
  };
}

function buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues) {
  const rules = [];
  const canGenerateRules = typeof generateGearListHtml === 'function'
    && typeof parseGearTableForAutoRules === 'function';
  const scenarios = Array.isArray(scenarioValues)
    ? scenarioValues.filter(value => typeof value === 'string' && value)
    : [];

  let baselineMap = null;
  if (canGenerateRules) {
    const baselineHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: '' });
    baselineMap = parseGearTableForAutoRules(baselineHtml);

    if (baselineMap && scenarios.length) {
      const scenarioDiffMap = new Map();
      scenarios.forEach(value => {
        const scenarioHtml = generateGearListHtml({ ...baseInfo, requiredScenarios: value });
        const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        const diff = diffGearTableMaps(baselineMap, scenarioMap);
        const add = cloneAutoGearItems(diff.add);
        const remove = cloneAutoGearItems(diff.remove);
        if (!add.length && !remove.length) return;
        scenarioDiffMap.set(value, { add, remove });
        rules.push({
          id: generateAutoGearId('rule'),
          label: value,
          scenarios: [value],
          add,
          remove,
        });
      });

      const comboCandidates = [
        ['Handheld', 'Easyrig'],
        ['Slider', 'Undersling mode']
      ].filter(combo => combo.every(value => scenarios.includes(value)));

      comboCandidates.forEach(combo => {
        const combinedLabel = combo.join(' + ');
        const scenarioHtml = generateGearListHtml({
          ...baseInfo,
          requiredScenarios: combo.join(', ')
        });
        const scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        const diff = diffGearTableMaps(baselineMap, scenarioMap);
        const adjusted = subtractScenarioContributions({
          add: cloneAutoGearItems(diff.add),
          remove: cloneAutoGearItems(diff.remove)
        }, combo, scenarioDiffMap);
        if (!adjusted.add.length && !adjusted.remove.length) return;
        rules.push({
          id: generateAutoGearId('rule'),
          label: combinedLabel,
          scenarios: combo.slice(),
          add: adjusted.add,
          remove: adjusted.remove,
        });
      });

      const rainOverlapKeys = ['Extreme rain', 'Rain Machine'];
      const hasRainOverlap = rainOverlapKeys.every(key => scenarioDiffMap.has(key));
      if (hasRainOverlap) {
        const overlapRemovals = [
          { name: 'Schulz Sprayoff Micro', quantity: 1 },
          { name: 'Fischer RS to D-Tap cable 0,5m', quantity: 2 },
          { name: 'Spare Disc (Schulz Sprayoff Micro)', quantity: 1 },
        ].map(entry => ({
          id: generateAutoGearId('item'),
          name: entry.name,
          category: 'Matte box + filter',
          quantity: entry.quantity,
        }));
        rules.push({
          id: generateAutoGearId('rule'),
          label: 'Extreme rain + Rain Machine overlap',
          scenarios: rainOverlapKeys.slice(),
          add: [],
          remove: overlapRemovals,
        });
      }
    }
  }

  if (baselineMap) {
    buildCameraHandleAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
    buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));
    buildVideoDistributionAutoRules(baseInfo, baselineMap).forEach(rule => rules.push(rule));

    const existingSignatures = new Set(
      rules
        .map(autoGearRuleSignature)
        .filter(signature => typeof signature === 'string' && signature)
    );

    const appendUniqueRules = additionalRules => {
      if (!Array.isArray(additionalRules) || !additionalRules.length) {
        return;
      }
      additionalRules.forEach(rule => {
        const signature = autoGearRuleSignature(rule);
        if (!signature || existingSignatures.has(signature)) return;
        rules.push(rule);
        existingSignatures.add(signature);
      });
    };

    appendUniqueRules(buildDefaultVideoDistributionAutoGearRules(baseInfo));
    appendUniqueRules(buildOnboardMonitorRiggingAutoGearRules());
    appendUniqueRules(buildTripodPreferenceAutoGearRules(baseInfo));
  }

  const anyMotorRule = buildAutoGearAnyMotorRule();
  if (anyMotorRule) {
    const targetSignature = autoGearRuleSignature(anyMotorRule);
    const exists = rules.some(rule => autoGearRuleSignature(rule) === targetSignature);
    if (!exists) {
      rules.push(anyMotorRule);
    }
  }

  const alwaysRule = buildAlwaysAutoGearRule();
  if (alwaysRule) {
    rules.push(alwaysRule);
  }

  const fiveDayRule = buildFiveDayConsumablesAutoGearRule();
  if (fiveDayRule) {
    rules.push(fiveDayRule);
  }

  buildDefaultMatteboxAutoGearRules().forEach(rule => rules.push(rule));
  return rules;
}

function computeFactoryAutoGearRules() {
  captureAutoGearSeedContext();
  const context = factoryAutoGearSeedContext;
  if (!context) return null;

  const previousSelectValues = captureSetupSelectValues();
  const seededBeforeCompute = hasSeededAutoGearDefaults();
  const savedAutoGearRules = autoGearRules.slice();
  const savedBaseAutoGearRules = baseAutoGearRulesState.slice();
  const savedProjectScopedRules = projectScopedAutoGearRules
    ? projectScopedAutoGearRules.slice()
    : null;
  const savedBackupSignature = autoGearRulesLastBackupSignature;
  const savedPersistedSignature = autoGearRulesLastPersistedSignature;
  const savedDirtyFlag = autoGearRulesDirtySinceBackup;
  try {
    if (seededBeforeCompute) {
      clearAutoGearDefaultsSeeded();
    }
    assignAutoGearRules([]);
    baseAutoGearRulesState = [];
    projectScopedAutoGearRules = null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    applySetupSelectValues(context.setupValues);
    const baseInfoSource = context.projectFormData || {};
    let baseInfo;
    try {
      baseInfo = JSON.parse(JSON.stringify(baseInfoSource));
    } catch (cloneErr) {
      void cloneErr;
      baseInfo = { ...baseInfoSource };
    }
    const rules = buildAutoGearRulesFromBaseInfo(baseInfo, context.scenarioValues || []);
    if (rules.length) {
      setFactoryAutoGearRulesSnapshot(rules);
    }
    return rules;
  } finally {
    applySetupSelectValues(previousSelectValues);
    assignAutoGearRules(savedAutoGearRules);
    baseAutoGearRulesState = savedBaseAutoGearRules.slice();
    projectScopedAutoGearRules = savedProjectScopedRules
      ? savedProjectScopedRules.slice()
      : null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    if (seededBeforeCompute) {
      markAutoGearDefaultsSeeded();
    }
  }
}

function seedAutoGearRulesFromCurrentProject() {
  captureAutoGearSeedContext();
  const seededBefore = hasSeededAutoGearDefaults();

  if (autoGearRules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !seededBefore) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    } else if (!factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }

  if (seededBefore) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }

  const baseInfo = factoryAutoGearSeedContext && factoryAutoGearSeedContext.projectFormData
    ? { ...factoryAutoGearSeedContext.projectFormData }
    : (collectProjectFormData ? collectProjectFormData() : {});
  const scenarioValues = factoryAutoGearSeedContext && Array.isArray(factoryAutoGearSeedContext.scenarioValues)
    ? factoryAutoGearSeedContext.scenarioValues
    : (requiredScenariosSelect
        ? Array.from(requiredScenariosSelect.options || [])
            .map(opt => opt && opt.value)
            .filter(Boolean)
        : []);

  const rules = buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues);
  if (!rules.length) {
    const addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }
  setAutoGearRules(rules);
  markAutoGearDefaultsSeeded();
  setFactoryAutoGearRulesSnapshot(rules);
}

function resetAutoGearRulesToFactoryAdditions() {
  const langTexts = texts[currentLang] || texts.en || {};
  const confirmation = langTexts.autoGearResetFactoryConfirm
    || texts.en?.autoGearResetFactoryConfirm
    || 'Replace your automatic gear rules with the default additions?';
  if (typeof confirm === 'function' && !confirm(confirmation)) {
    return;
  }

  const backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
  if (!backupName) {
    return;
  }

  try {
    const factoryRules = computeFactoryAutoGearRules();
    let appliedRules = [];
    if (Array.isArray(factoryRules) && factoryRules.length) {
      setAutoGearRules(factoryRules);
      markAutoGearDefaultsSeeded();
      appliedRules = getAutoGearRules();
      setFactoryAutoGearRulesSnapshot(appliedRules);
    } else {
      setAutoGearRules([]);
      clearAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot([]);
    }
      callCoreFunctionIfAvailable('closeAutoGearEditor', [], { defer: true });
      const updatedRules = appliedRules.length ? appliedRules : getAutoGearRules();
      callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
      callCoreFunctionIfAvailable('renderAutoGearDraftLists', [], { defer: true });
      callCoreFunctionIfAvailable('updateAutoGearCatalogOptions', [], { defer: true });
    const messageKey = updatedRules.length
      ? 'autoGearResetFactoryDone'
      : 'autoGearResetFactoryEmpty';
    const fallback = updatedRules.length
      ? 'Automatic gear rules restored to factory additions.'
      : 'Factory additions unavailable. Automatic gear rules cleared.';
    const message = langTexts[messageKey]
      || texts.en?.[messageKey]
      || fallback;
    const type = updatedRules.length ? 'success' : 'warning';
    showNotification(type, message);
  } catch (error) {
    console.error('Failed to reset automatic gear rules to factory additions', error);
    const errorMsg = langTexts.autoGearResetFactoryError
      || texts.en?.autoGearResetFactoryError
      || 'Reset failed. Please try again.';
    showNotification('error', errorMsg);
  }
}

function collectAutoGearCatalogNames() {
  const names = new Set();
  const addName = name => {
    if (looksLikeGearName(name)) names.add(name);
  };
  const seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  const visit = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (seen) {
      if (seen.has(obj)) return;
      seen.add(obj);
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return;
      addName(key);
      visit(value);
    });
  };
  if (typeof devices === 'object' && devices) {
    visit(devices);
  }
  autoGearRules.forEach(rule => {
    [...rule.add, ...rule.remove].forEach(item => addName(item.name));
  });
  return Array.from(names).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

function normalizeAutoGearMonitorCatalogMode(value) {
  const normalized = normalizeAutoGearSelectorType(value);
  if (normalized === 'monitor' || normalized === 'directorMonitor') return normalized;
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalized)) return normalized;
  return 'none';
}

var autoGearMonitorCatalogMode = 'none';
var autoGearMonitorDefaultGroups = [];
var autoGearAddMonitorFieldGroup = null;
var autoGearRemoveMonitorFieldGroup = null;

function collectAutoGearMonitorNames(type = autoGearMonitorCatalogMode) {
  const mode = normalizeAutoGearMonitorCatalogMode(type);
  if (mode === 'none') return [];
  const includeMonitor = mode === 'monitor';
  const includeDirectorMonitor = mode === 'directorMonitor';
  const acceptedTypes = new Set();
  if (includeMonitor) acceptedTypes.add('monitor');
  if (includeDirectorMonitor) acceptedTypes.add('directorMonitor');

  const names = new Set();
  const addName = name => {
    if (typeof name === 'string') {
      const trimmed = name.trim();
      if (trimmed) names.add(trimmed);
    }
  };
  if (includeMonitor) {
    const monitorDb = devices && devices.monitors ? devices.monitors : null;
    if (monitorDb && typeof monitorDb === 'object') {
      Object.keys(monitorDb).forEach(addName);
    }
  }
  if (includeDirectorMonitor) {
    const directorDb = devices && devices.directorMonitors ? devices.directorMonitors : null;
    if (directorDb && typeof directorDb === 'object') {
      Object.keys(directorDb)
        .filter(name => name && name !== 'None')
        .forEach(addName);
    }
  }
  autoGearRules.forEach(rule => {
    const processItem = item => {
      if (!item || typeof item !== 'object') return;
      const selectorDefault = item.selectorDefault;
      if (!selectorDefault) return;
      const selectorType = normalizeAutoGearSelectorType(item.selectorType);
      if (acceptedTypes.has(selectorType)) addName(selectorDefault);
    };
    (rule.add || []).forEach(processItem);
    (rule.remove || []).forEach(processItem);
  });
  AUTO_GEAR_MONITOR_FALLBACKS.forEach(addName);
  return Array.from(names).sort(localeSort);
}

function collectAutoGearSelectorValuesFromRules(type) {
  const normalized = normalizeAutoGearSelectorType(type);
  if (normalized === 'none') return [];
  const values = new Set();
  const addValue = value => {
    if (typeof value !== 'string') return;
    const trimmed = value.trim();
    if (!trimmed) return;
    values.add(trimmed);
  };
  autoGearRules.forEach(rule => {
    const processItem = item => {
      if (!item || typeof item !== 'object') return;
      if (normalizeAutoGearSelectorType(item.selectorType) !== normalized) return;
      addValue(item.selectorDefault);
    };
    (rule.add || []).forEach(processItem);
    (rule.remove || []).forEach(processItem);
  });
  return Array.from(values);
}

function collectAutoGearTripodNames(type) {
  if (!AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(type)) return [];
  const baseOptions = collectTripodPreferenceOptions(type);
  const seen = new Set();
  const results = [];
  baseOptions.forEach(option => {
    if (!option || !option.value) return;
    const key = option.value.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    results.push({ value: option.value.trim(), label: option.label || option.value.trim() });
  });
  const extras = collectAutoGearSelectorValuesFromRules(type)
    .map(value => value.trim())
    .filter(Boolean)
    .sort(localeSort);
  extras.forEach(value => {
    const key = value.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    results.push({ value, label: value });
  });
  return results;
}

function collectAutoGearSelectorDefaultEntries(type) {
  const mode = normalizeAutoGearMonitorCatalogMode(type);
  if (mode === 'none') return [];
  if (mode === 'monitor' || mode === 'directorMonitor') {
    return collectAutoGearMonitorNames(mode).map(name => ({
      value: name,
      label: formatAutoGearSelectorValue(mode, name),
    }));
  }
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(mode)) {
    return collectAutoGearTripodNames(mode);
  }
  return [];
}

function updateAutoGearMonitorCatalogOptions(type = autoGearMonitorCatalogMode, targetElements) {
  autoGearMonitorCatalogMode = normalizeAutoGearMonitorCatalogMode(type);
  const targets = (() => {
    if (Array.isArray(targetElements)) {
      return targetElements.filter(Boolean);
    }
    if (targetElements) return [targetElements];
    return autoGearMonitorDefaultGroups
      .map(group => group.selectorDefaultInput)
      .filter(Boolean);
  })();
  targets.forEach(select => {
    const relatedGroup = autoGearMonitorDefaultGroups.find(group => group.selectorDefaultInput === select);
    const selectorType = relatedGroup?.selectorTypeSelect ? relatedGroup.selectorTypeSelect.value : autoGearMonitorCatalogMode;
    const mode = normalizeAutoGearMonitorCatalogMode(selectorType);
    const entries = mode === 'none' ? [] : collectAutoGearSelectorDefaultEntries(mode);
    const previousValue = select.value || '';
    const preferredValue = typeof select.dataset.autoGearPreferredDefault === 'string'
      ? select.dataset.autoGearPreferredDefault
      : '';
    if (Object.prototype.hasOwnProperty.call(select.dataset, 'autoGearPreferredDefault')) {
      delete select.dataset.autoGearPreferredDefault;
    }
    const placeholder = getAutoGearSelectorDefaultPlaceholder();
    select.innerHTML = '';
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);
    const added = new Set(['']);
    const addOption = (value, label) => {
      const trimmedValue = typeof value === 'string' ? value.trim() : '';
      if (!trimmedValue) return;
      const key = trimmedValue.toLowerCase();
      if (added.has(key)) return;
      const option = document.createElement('option');
      option.value = trimmedValue;
      option.textContent = label || formatAutoGearSelectorValue(mode, trimmedValue);
      select.appendChild(option);
      added.add(key);
    };
    entries.forEach(entry => {
      if (entry && typeof entry === 'object') {
        addOption(entry.value, entry.label);
      } else {
        addOption(entry);
      }
    });
    const desiredValue = preferredValue || previousValue;
    const desiredKey = desiredValue ? desiredValue.trim().toLowerCase() : '';
    const previousKey = previousValue ? previousValue.trim().toLowerCase() : '';
    if (desiredValue && !added.has(desiredKey)) {
      addOption(desiredValue);
    } else if (!desiredValue && previousValue && !added.has(previousKey)) {
      addOption(previousValue);
    }
    if (desiredValue && added.has(desiredKey)) {
      select.value = desiredValue;
    } else if (previousValue && added.has(previousKey)) {
      select.value = previousValue;
    } else {
      select.value = '';
    }
    const enableSelection = mode !== 'none' && select.options.length > 1;
    select.disabled = !enableSelection;
    const scrollHint = getAutoGearSelectorScrollHint();
    if (enableSelection && entries.length > 10) {
      select.setAttribute('title', scrollHint);
      select.setAttribute('data-help', scrollHint);
    } else {
      select.removeAttribute('title');
      select.removeAttribute('data-help');
    }
  });
}

var getCssVariableValue = (name, fallback = '') => {
  if (typeof document === 'undefined') return fallback;
  const root = document.documentElement;
  if (!root) return fallback;
  const computed = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
    ? window.getComputedStyle(root).getPropertyValue(name).trim()
    : '';
  if (computed) return computed;
  const inline = root.style.getPropertyValue(name).trim();
  return inline || fallback;
};

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const offlineModule =
      (typeof globalThis !== 'undefined' && globalThis && globalThis.cineOffline)
      || (typeof window !== 'undefined' && window && window.cineOffline)
      || null;

    if (offlineModule && typeof offlineModule.registerServiceWorker === 'function') {
      offlineModule.registerServiceWorker('service-worker.js', {
        immediate: true,
        window,
        navigator,
      });
      return;
    }

    try {
      navigator.serviceWorker.register('service-worker.js');
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Service worker registration failed via fallback path.', error);
      }
    }
  });
}

function getElementHeight(element) {
  if (!element) return 0;
  const rect = typeof element.getBoundingClientRect === 'function'
    ? element.getBoundingClientRect()
    : null;
  if (rect && typeof rect.height === 'number' && rect.height > 0) {
    return rect.height;
  }
  return element.offsetHeight || 0;
}

function setInstallBannerOffset(offset) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (!root) return;
  if (offset > 0) {
    root.style.setProperty('--install-banner-offset', `${Math.ceil(offset)}px`);
  } else {
    root.style.removeProperty('--install-banner-offset');
  }
}

let pendingInstallBannerPositionUpdate = false;

function scheduleInstallBannerPositionUpdate() {
  if (pendingInstallBannerPositionUpdate) return;
  if (typeof window === 'undefined') return;
  const scheduler =
    (typeof window.requestAnimationFrame === 'function' && window.requestAnimationFrame.bind(window)) ||
    (typeof window.setTimeout === 'function' && (callback => window.setTimeout(callback, 0)));
  if (!scheduler) return;
  pendingInstallBannerPositionUpdate = true;
  scheduler(() => {
    pendingInstallBannerPositionUpdate = false;
    updateInstallBannerPosition();
  });
}

function updateInstallBannerPosition() {
  if (typeof document === 'undefined') return;
  const installBanner = document.getElementById('installPromptBanner');
  if (!installBanner) {
    setInstallBannerOffset(0);
    return;
  }

  const offlineIndicator = document.getElementById('offlineIndicator');
  const offlineHeight = offlineIndicator && offlineIndicator.style.display !== 'none'
    ? getElementHeight(offlineIndicator)
    : 0;

  if (offlineHeight > 0) {
    installBanner.style.top = `${offlineHeight}px`;
  } else {
    installBanner.style.removeProperty('top');
  }

  const bannerVisible = !installBanner.hasAttribute('hidden');
  const bannerHeight = bannerVisible ? getElementHeight(installBanner) : 0;
  const totalOffset = offlineHeight + bannerHeight;

  setInstallBannerOffset(totalOffset);

  if (bannerVisible && !bannerHeight) {
    scheduleInstallBannerPositionUpdate();
  }
}

/**
 * Initialize the offline status indicator.
 *
 * Looks for an element with the id `offlineIndicator` and toggles its
 * visibility based on the browser's online state. If the element is not
 * found, the function quietly does nothing.
 */
function setupOfflineIndicator() {
  if (
    typeof document === 'undefined' ||
    typeof document.getElementById !== 'function' ||
    typeof navigator === 'undefined'
  ) {
    return;
  }

  const offlineIndicator = document.getElementById('offlineIndicator');
  if (!offlineIndicator) return;

  const updateOnlineStatus = () => {
    const isOnline = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
    offlineIndicator.style.display = isOnline ? 'none' : 'block';
    if (typeof updateInstallBannerPosition === 'function') {
      updateInstallBannerPosition();
    }
  };

  if (
    typeof window !== 'undefined' &&
    typeof window.addEventListener === 'function'
  ) {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  updateOnlineStatus();
}

if (typeof window !== 'undefined') {
  setupOfflineIndicator();
}

/**
 * Close the sidebar menu if it is open.
 */
function closeSideMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const toggle = document.getElementById('menuToggle');
  const body = typeof document !== 'undefined' ? document.body : null;
  if (!menu || !overlay || !toggle) return;
  menu.classList.remove('open');
  menu.scrollTop = 0;
  menu.setAttribute('hidden', '');
  overlay.classList.add('hidden');
  const menuLabel = toggle.dataset?.menuLabel || 'Menu';
  const menuHelp = toggle.dataset?.menuHelp || menuLabel;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', menuLabel);
  toggle.setAttribute('title', menuLabel);
  toggle.setAttribute('data-help', menuHelp);
  body?.classList.remove('menu-open');
}

/**
 * Open the sidebar menu if it is currently closed.
 */
function openSideMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const toggle = document.getElementById('menuToggle');
  const closeButton = document.getElementById('closeMenuButton');
  const body = typeof document !== 'undefined' ? document.body : null;
  if (!menu || !overlay || !toggle) return;
  if (menu.classList.contains('open')) return;
  menu.classList.add('open');
  menu.removeAttribute('hidden');
  overlay.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  const closeLabel =
    toggle.dataset?.closeLabel ||
    closeButton?.getAttribute('aria-label') ||
    'Close menu';
  const closeHelp =
    toggle.dataset?.closeHelp ||
    closeButton?.getAttribute('data-help') ||
    closeLabel;
  toggle.setAttribute('aria-label', closeLabel);
  toggle.setAttribute('title', closeLabel);
  toggle.setAttribute('data-help', closeHelp);
  body?.classList.add('menu-open');
}

/**
 * Initialize sidebar menu toggle.
 */
function setupSideMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeButton = document.getElementById('closeMenuButton');
  if (!toggle || !menu || !overlay) return;

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  });

  overlay.addEventListener('click', closeSideMenu);
  closeButton?.addEventListener('click', () => {
    closeSideMenu();
    toggle.focus();
  });
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    mobileQuery.addEventListener('change', event => {
      if (!event.matches && menu.classList.contains('open')) {
        closeSideMenu();
      }
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeSideMenu();
      toggle.focus();
    }
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        event.preventDefault();
        document.querySelector(hash)?.scrollIntoView();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      closeSideMenu();
    });
  });

  const triggerSidebarAction = action => {
    if (!action) return;
    if (action === 'open-settings') {
      document.getElementById('settingsButton')?.click();
    } else if (action === 'open-help') {
      document.getElementById('helpButton')?.click();
    }
  };

  menu.querySelectorAll('[data-sidebar-action]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      triggerSidebarAction(button.dataset.sidebarAction);
      closeSideMenu();
    });
  });
}

function setupResponsiveControls() {
  const topBar = document.getElementById('topBar');
  const featureSearch = topBar?.querySelector('.feature-search');
  const controls = topBar?.querySelector('.controls');
  const sidebarControls = document.querySelector('#sideMenu .sidebar-controls');
  if (
    !topBar ||
    !featureSearch ||
    !controls ||
    !sidebarControls ||
    typeof window.matchMedia !== 'function'
  )
    return;

  const mql = window.matchMedia('(max-width: 768px)');

  const relocate = () => {
    if (mql.matches) {
      sidebarControls.appendChild(featureSearch);
      sidebarControls.appendChild(controls);
    } else {
      topBar.appendChild(featureSearch);
      topBar.appendChild(controls);
    }
  };

  mql.addEventListener('change', relocate);
  relocate();
}

function initializeLayoutControls() {
  setupSideMenu();
  setupResponsiveControls();
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const runLayoutInitialization = () => {
    initializeLayoutControls();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLayoutInitialization, { once: true });
  } else {
    runLayoutInitialization();
  }
}

/**
 * Escape a string for safe insertion into HTML.
 *
 * The helper delays touching the DOM until first use to avoid
 * ReferenceErrors in environments where `document` is defined as an
 * uninitialised `let` binding (e.g. Safari). When no DOM is present the
 * original string is returned unchanged.
 *
 * @param {string} str - Text that may contain HTML characters.
 * @returns {string} The escaped string.
 */
let escapeDiv;
function escapeHtml(str) {
  if (!escapeDiv && typeof globalThis !== 'undefined' && globalThis.document) {
    escapeDiv = globalThis.document.createElement('div');
  }
  if (!escapeDiv) return String(str);
  escapeDiv.textContent = str;
  return escapeDiv.innerHTML;
}

// Use a Set for O(1) lookups when validating video output types
const VIDEO_OUTPUT_TYPES = new Set([
  '3G-SDI',
  '6G-SDI',
  '12G-SDI',
  'Mini BNC',
  'HDMI',
  'Mini HDMI',
  'Micro HDMI',
  'DisplayPort'
]);

var DEFAULT_FILTER_SIZE = '4x5.65';
const AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

var showAutoBackups = false;
try {
  if (typeof localStorage !== 'undefined') {
    showAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
  }
} catch (e) {
  console.warn('Could not load auto backup visibility preference', e);
}
function cloneProjectEntryForSetup(projectEntry) {
  if (!projectEntry || typeof projectEntry !== 'object') {
    return {};
  }

  const snapshot = {};
  const { projectInfo, gearList, autoGearRules } = projectEntry;

  if (projectInfo && typeof projectInfo === 'object') {
    try {
      snapshot.projectInfo = JSON.parse(JSON.stringify(projectInfo));
    } catch (error) {
      console.warn('Failed to clone project info for auto backup import', error);
      snapshot.projectInfo = projectInfo;
    }
  }
  if (projectEntry && typeof projectEntry.powerSelection === 'object') {
    try {
      snapshot.powerSelection = JSON.parse(JSON.stringify(projectEntry.powerSelection));
    } catch (error) {
      console.warn('Failed to clone project power selection for auto backup import', error);
      snapshot.powerSelection = projectEntry.powerSelection;
    }
  }

  if (typeof gearList === 'string' && gearList.trim()) {
    snapshot.gearList = gearList;
  }

  if (Array.isArray(autoGearRules) && autoGearRules.length) {
    try {
      snapshot.autoGearRules = JSON.parse(JSON.stringify(autoGearRules));
    } catch (error) {
      console.warn('Failed to clone auto gear rules for auto backup import', error);
      snapshot.autoGearRules = autoGearRules.slice();
    }
  }

  return snapshot;
}

function ensureAutoBackupsFromProjects() {
  if (typeof loadProject !== 'function') return false;

  let projects;
  try {
    projects = loadProject();
  } catch (error) {
    console.warn('Failed to read projects while syncing auto backups', error);
    return false;
  }

  if (!projects || typeof projects !== 'object') {
    return false;
  }

  const setups = getSetups();
  let changed = false;

  Object.keys(projects).forEach((name) => {
    if (typeof name !== 'string' || !name) return;
    const isAutoBackup = name.startsWith(AUTO_BACKUP_NAME_PREFIX)
      || name.startsWith(AUTO_BACKUP_DELETION_PREFIX);
    if (!isAutoBackup) return;
    if (Object.prototype.hasOwnProperty.call(setups, name)) return;

    const snapshot = cloneProjectEntryForSetup(projects[name]);
    setups[name] = snapshot;
    changed = true;
  });

  if (changed) {
    try {
      storeSetups(setups);
    } catch (error) {
      console.warn('Failed to persist imported auto backups from projects', error);
      return false;
    }
  }

  return changed;
}

if (showAutoBackups) {
  try {
    ensureAutoBackupsFromProjects();
  } catch (error) {
    console.warn('Failed to prepare auto backups from project storage', error);
  }
}

// Labels for B-Mount support are defined in translations.js using the keys
// batteryBMountLabel, totalCurrent336Label and totalCurrent216Label.

function getSetups() {
  return loadSetups();
}

function storeSetups(setups) {
  saveSetups(setups);
}

function storeDevices(deviceData) {
  saveDeviceData(deviceData);
}

function loadSession() {
  return typeof loadSessionState === 'function' ? loadSessionState() : null;
}

function storeSession(state) {
  if (typeof saveSessionState === 'function') {
    saveSessionState(state);
  }
}

/**
 * Toggle a dialog element's visibility, gracefully handling browsers that do
 * not support the dialog `showModal` or `close` APIs. When those methods are
 * unavailable the function falls back to manipulating the `open` attribute
 * directly.
 *
 * @param {HTMLDialogElement} dialog - The dialog to operate on.
 * @param {boolean} shouldOpen - Whether the dialog should be opened or
 *   closed.
 */
function toggleDialog(dialog, shouldOpen) {
  if (!dialog) return;
  if (shouldOpen) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  } else if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

/**
 * Open a dialog element, falling back to setting the `open` attribute when
 * the `showModal` method is unavailable.
 *
 * @param {HTMLDialogElement} dialog - The dialog to open.
 */
function openDialog(dialog) {
  toggleDialog(dialog, true);
}

/**
 * Close a dialog element, removing the `open` attribute if the `close`
 * method is not supported.
 *
 * @param {HTMLDialogElement} dialog - The dialog to close.
 */
function closeDialog(dialog) {
  toggleDialog(dialog, false);
}

/**
 * Determine whether a dialog element is currently open.
 *
 * @param {HTMLDialogElement} dialog - The dialog to inspect.
 * @returns {boolean} True if the dialog is open.
 */
function isDialogOpen(dialog) {
  if (!dialog) return false;
  if (typeof dialog.open === 'boolean') {
    return dialog.open;
  }
  return dialog.hasAttribute('open');
}

/**
 * Memoize a normalisation function for repeated lookups.
 *
 * The provided function receives both the original trimmed string and a
 * lowercase key. Results are cached to avoid recomputing normalisations for
 * the same input.
 *
 * @param {(value: string, key: string) => string} fn - Function that performs
 *   normalisation.
 * @returns {(value: string) => string} Wrapped function with memoisation and
 *   empty-string fallback for falsy inputs.
 */
function memoizeNormalization(fn) {
  const cache = new Map();
  return value => {
    if (!value) return '';
    const str = String(value)
      .replace(/[™®]/g, '')
      .trim();
    const key = str.toLowerCase();
    if (!cache.has(key)) cache.set(key, fn(str, key));
    return cache.get(key);
  };
}

const VIDEO_TYPE_PATTERNS = [
  { needles: ['12g'], value: '12G-SDI' },
  { needles: ['6g'], value: '6G-SDI' },
  { needles: ['3g'], value: '3G-SDI' },
  // Accept both "HD-SDI" and "HD SDI" spellings
  { needles: ['hd', 'sdi'], value: '3G-SDI' },
  { needles: ['mini', 'bnc'], value: 'Mini BNC' },
  { needles: ['micro', 'hdmi'], value: 'Micro HDMI' },
  { needles: ['mini', 'hdmi'], value: 'Mini HDMI' },
  { needles: ['hdmi'], value: 'HDMI' },
  { needles: ['displayport'], value: 'DisplayPort' },
  { needles: ['display', 'port'], value: 'DisplayPort' },
  { needles: ['dp'], value: 'DisplayPort' }
];

var normalizeVideoType = memoizeNormalization((_, key) => {
  const match = VIDEO_TYPE_PATTERNS.find(({ needles }) =>
    needles.every(n => key.includes(n))
  );
  return match ? match.value : '';
});

const FIZ_CONNECTOR_MAP = {
  'lemo 4-pin (lbus)': 'LBUS (LEMO 4-pin)',
  'lbus (lemo 4-pin)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo)': 'LBUS (LEMO 4-pin)',
  'lbus (4-pin lemo for motors)': 'LBUS (LEMO 4-pin)',
  '4-pin lemo (lbus)': 'LBUS (LEMO 4-pin)',
  'lemo 4-pin': 'LEMO 4-pin',
  '4-pin lemo': 'LEMO 4-pin',
  'lemo 7-pin': 'LEMO 7-pin',
  'lemo 7-pin 1b': 'LEMO 7-pin',
  '7-pin lemo': 'LEMO 7-pin',
  '7-pin lemo (lcs)': 'LEMO 7-pin (LCS)',
  '7-pin lemo (cam)': 'LEMO 7-pin (CAM)',
  'ext (lemo 7-pin)': 'EXT LEMO 7-pin',
  'hirose 12pin': 'Hirose 12-pin',
  '12-pin hirose': 'Hirose 12-pin',
  '12pin broadcast connector': 'Hirose 12-pin',
  'lens 12 pin': 'Hirose 12-pin',
  'lens terminal 12-pin': 'Hirose 12-pin',
  'lens terminal 12-pin jack': 'Hirose 12-pin',
  'lens terminal': 'Hirose 12-pin',
  'usb type-c': 'USB-C',
  'usb-c': 'USB-C',
  'usb-c (usb 3.2 / 3.1 gen 1)': 'USB-C',
  'usb-c / gigabit ethernet (via adapter)': 'USB-C',
  'active ef mount': 'Active EF mount',
  'lanc (2.5mm stereo mini jack)': 'LANC',
  '2.5 mm sub-mini (lanc)': 'LANC',
  'remote a (2.5mm)': 'REMOTE A connector',
  'remote control terminal': 'REMOTE A connector',
  'remote 8 pin': 'REMOTE B connector'
};

function createMapNormalizer(map) {
  return memoizeNormalization((str, key) => map[key] || str);
}

var normalizeFizConnectorType = createMapNormalizer(FIZ_CONNECTOR_MAP);

const VIEWFINDER_TYPE_MAP = {
  'dsmc3 red touch 7" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'red touch 7.0" lcd (optional)': 'RED Touch 7" LCD (Optional)',
  'lcd touch panel': 'LCD touchscreen',
  'lcd touchscreen': 'LCD touchscreen',
  'native lcd capacitive touchscreen': 'LCD touchscreen',
  'integrated touchscreen lcd': 'LCD touchscreen',
  'free-angle lcd': 'Vari-angle LCD',
  'lcd monitor (native)': 'Integrated LCD monitor',
  'native lcd viewfinder': 'Integrated LCD monitor',
  'lcd monitor lm-v2 (supplied)': 'LCD Monitor LM-V2',
  'integrated main monitor': 'Integrated LCD monitor',
  'optional evf-v70 viewfinder': 'EVF-V70 (Optional)',
  'optional evf-v50': 'EVF-V50 (Optional)',
  'optional oled viewfinder': 'OLED EVF (Optional)',
  'blackmagic pocket cinema camera pro evf (optional)': 'Blackmagic Pro EVF (Optional)',
  'external backlit lcd status display': 'LCD status display',
  'built-in fold-out lcd': 'Fold-out LCD',
  'oled lvf (live view finder)': 'OLED EVF',
  'lcd capacitive touchscreen': 'LCD touchscreen',
  'lemo 26 pin': 'LEMO 26-pin port'
};

var normalizeViewfinderType = createMapNormalizer(VIEWFINDER_TYPE_MAP);

const POWER_PORT_TYPE_MAP = {
  'lemo 8-pin (dc in / bat)': 'Bat LEMO 8-pin',
  'lemo 8-pin (bat)': 'Bat LEMO 8-pin',
  'bat (lemo 8-pin)': 'Bat LEMO 8-pin',
  'lemo 8-pin': 'Bat LEMO 8-pin',
  '2-pin dc-input': '2-pin DC-IN',
  '2-pin xlr': 'XLR 2-pin',
  '2-pin locking connector': 'LEMO 2-pin',
  '2-pin locking connector / 2-pin lemo': 'LEMO 2-pin',
  '4-pin xlr / dc in 12v': 'XLR 4-pin',
  '4-pin xlr / v-lock': 'XLR 4-pin',
  'xlr 4-pin jack': 'XLR 4-pin',
  'xlr 4-pin (main input)': 'XLR 4-pin',
  'xlr-type 4 pin (male) / square-shaped 5 pin connector (battery)': 'XLR 4-pin / Square 5-pin',
  '12-pin molex connector (at battery plate rear) / 4-pin xlr (external power)': 'Molex 12-pin / XLR 4-pin',
  'battery slot': 'Battery Slot',
  'usb-c': 'USB-C',
  'usb type-c': 'USB-C',
  'usb-c pd': 'USB-C PD',
  'usb-c (power delivery)': 'USB-C PD',
  'dc input': 'DC IN',
  'weipu sf610/s2 (12vdc) input': 'Weipu SF610/S2',
  '6-pin 1b dc-in / tb50 battery mount': '6-pin 1B DC-IN / TB50'
};

const mapPowerPortOne = createMapNormalizer(POWER_PORT_TYPE_MAP);

function normalizePowerPortType(type) {
  if (!type) return [];
  const toArray = val =>
    mapPowerPortOne(val)
      .split('/')
      .map(p => mapPowerPortOne(p))
      .filter(Boolean);
  return Array.isArray(type) ? type.flatMap(toArray) : toArray(type);
}

function ensureList(list, defaults) {
  if (!Array.isArray(list)) return [];
  return list.map(item =>
    typeof item === 'string'
      ? { ...defaults, type: item }
      : { ...defaults, ...(item || {}) }
  );
}

function fixPowerInput(dev) {
  if (!dev) return;
  if (dev.powerInput && !dev.power?.input) {
    dev.power = { ...(dev.power || {}), input: { type: normalizePowerPortType(dev.powerInput) } };
    delete dev.powerInput;
  }
  const input = dev.power?.input;
  if (!input) return;
  const normalizeEntry = it => {
    if (typeof it === 'string') {
      return { type: normalizePowerPortType(it) };
    }
    if (it) {
      const { portType: pType, type: tType, ...rest } = it;
      const typeField = (!tType && pType) ? pType : tType;
      return { ...rest, type: typeField ? normalizePowerPortType(typeField) : [] };
    }
    return { type: [] };
  };
  dev.power.input = Array.isArray(input) ? input.map(normalizeEntry) : normalizeEntry(input);
}

function applyFixPowerInput(collection) {
  if (!collection || typeof collection !== 'object') return;
  Object.values(collection).forEach(fixPowerInput);
}


// Normalize various camera properties so downstream logic works with
// consistent structures and value formats.
function unifyDevices(devicesData) {
  if (!devicesData || typeof devicesData !== 'object') return;
  Object.values(devicesData.cameras || {}).forEach(cam => {
    if (cam.power?.input && cam.power.input.powerDrawWatts !== undefined) {
      delete cam.power.input.powerDrawWatts;
    }
    fixPowerInput(cam);
    if (Array.isArray(cam.power?.batteryPlateSupport)) {
      cam.power.batteryPlateSupport = cam.power.batteryPlateSupport.map(it => {
        if (typeof it === 'string') {
          const m = it.match(/([^()]+)(?:\(([^)]+)\))?(?:\s*-\s*(.*))?/);
          const type = m ? m[1].trim() : it;
          let mount = m && m[2] ? m[2].trim().toLowerCase() : '';
          if (!mount) {
            mount = /adapted|via adapter/i.test(it) ? 'adapted' : 'native';
          } else if (/via adapter/i.test(mount)) {
            mount = 'adapted';
          }
          const notes = m && m[3] ? m[3].trim() : (/via adapter/i.test(it) ? 'via adapter' : '');
          return { type, mount, notes };
        }
        return {
          type: it.type || '',
          mount: (it.mount ? it.mount : (it.native ? 'native' : (it.adapted ? 'adapted' : 'native'))).toLowerCase(),
          notes: it.notes || ''
        };
      });
    }
    if (cam.power) {
      cam.power.powerDistributionOutputs = ensureList(cam.power.powerDistributionOutputs, {
        type: '',
        voltage: '',
        current: '',
        wattage: null,
        notes: ''
      });
    }
    cam.videoOutputs = ensureList(cam.videoOutputs, { type: '', notes: '' }).flatMap(vo => {
      const { count, ...rest } = vo || {};
      const norm = normalizeVideoType(rest.type);
      if (!VIDEO_OUTPUT_TYPES.has(norm)) return [];
      const parsedCount = parseInt(count, 10);
      const num = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
      const base = { ...rest, type: norm, notes: rest.notes || '' };
      return Array.from({ length: num }, () => ({ ...base }));
    });
    cam.fizConnectors = ensureList(cam.fizConnectors, { type: '', notes: '' }).map(fc => {
      const { type, ...rest } = fc || {};
      return { ...rest, type: normalizeFizConnectorType(type) };
    });
    cam.viewfinder = ensureList(cam.viewfinder, { type: '', resolution: '', connector: '', notes: '' }).map(vf => {
      const { type, ...rest } = vf || {};
      return {
        ...rest,
        type: normalizeViewfinderType(type)
      };
    });
    cam.recordingMedia = ensureList(cam.recordingMedia, { type: '', notes: '' }).map(m => {
      let { type = '', notes = '' } = m || {};
      const match = type.match(/^(.*?)(?:\((.*)\))?$/);
      if (match) {
        type = match[1].trim();
        notes = notes || (match[2] ? match[2].trim() : '');
      }
      if (/^SD UHS-II$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II` : 'UHS-II';
      } else if (/^SD \(UHS-II\/UHS-I\)$/i.test(type)) {
        type = 'SD Card';
        notes = 'UHS-II/UHS-I';
      } else if (type === 'CFast 2.0 card slots') {
        type = 'CFast 2.0';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (Dual Slots)') {
        type = 'CFexpress Type B';
        notes = notes || 'Dual Slots';
      } else if (type === 'CFexpress Type B (via adapter)') {
        type = 'CFexpress Type B';
        notes = notes || 'via adapter';
      } else if (/^SD UHS-II \(Dual Slots\)$/i.test(type)) {
        type = 'SD Card';
        notes = notes ? `${notes}; UHS-II (Dual Slots)` : 'UHS-II (Dual Slots)';
      } else if (type === 'SD Card (Dual Slots)') {
        type = 'SD Card';
        notes = notes || 'Dual Slots';
      } else if (type === 'SD card slot (for proxy/backup)') {
        type = 'SD Card';
        notes = notes || 'for proxy/backup';
      }
      return { type, notes };
    });
    cam.timecode = ensureList(cam.timecode, { type: '', notes: '' });
    cam.lensMount = ensureList(cam.lensMount, { type: '', mount: 'native', notes: '' })
      .map(lm => ({
        type: lm.type,
        mount: (lm.mount ? lm.mount.toLowerCase() : 'native'),
        notes: lm.notes || ''
      }))
      .filter((lm, idx, arr) =>
        idx === arr.findIndex(o => o.type === lm.type && o.mount === lm.mount && o.notes === lm.notes)
      );
  });

  ['monitors', 'video', 'viewfinders'].forEach(key => {
    applyFixPowerInput(devicesData[key]);
  });

  const fizGroups = devicesData.fiz || {};
  ['motors', 'controllers', 'distance'].forEach(key => {
    applyFixPowerInput(fizGroups[key]);
  });

  // Normalize FIZ motors
  Object.values(devicesData.fiz?.motors || {}).forEach(m => {
    if (!m) return;
    if (m.connector && !m.fizConnector) {
      m.fizConnector = m.connector;
      delete m.connector;
    }
    if (m.fizConnector) {
      m.fizConnector = normalizeFizConnectorType(m.fizConnector);
    }
  });

  // Normalize FIZ controllers
  Object.values(devicesData.fiz?.controllers || {}).forEach(c => {
    if (!c) return;
    if (c.FIZ_connector && !c.fizConnector && !c.fizConnectors) {
      c.fizConnector = c.FIZ_connector;
      delete c.FIZ_connector;
    }
    if (Array.isArray(c.fizConnectors)) {
      c.fizConnectors = c.fizConnectors.map(fc => {
        if (!fc) return { type: '' };
        const type = normalizeFizConnectorType(fc.type || fc);
        const notes = fc.notes || undefined;
        return notes ? { type, notes } : { type };
      });
    } else if (c.fizConnector) {
      const parts = String(c.fizConnector)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      c.fizConnectors = parts.map(p => ({ type: normalizeFizConnectorType(p) }));
      delete c.fizConnector;
    } else {
      c.fizConnectors = [];
    }
  });
}

// Store a deep copy of the initial 'devices' data as defined in the device files.
// This 'defaultDevices' will be used when reverting the database.
// Initialize defaultDevices only if it hasn't been declared yet, to prevent
// "already declared" errors if the script is loaded multiple times.
if (window.defaultDevices === undefined) {
  window.defaultDevices = JSON.parse(JSON.stringify(devices));
  unifyDevices(window.defaultDevices);
}

// Load any saved device data from localStorage
let storedDevices = loadDeviceData();
if (storedDevices) {
  // Merge stored devices with the defaults so that categories missing
  // from saved data (e.g. FIZ) fall back to the built-in definitions.
  const merged = JSON.parse(JSON.stringify(window.defaultDevices));
  for (const [key, value] of Object.entries(storedDevices)) {
    if (key === 'fiz' && value && typeof value === 'object') {
      merged.fiz = merged.fiz || {};
      for (const [sub, subVal] of Object.entries(value)) {
        merged.fiz[sub] = {
          ...(merged.fiz[sub] || {}),
          ...(subVal || {}),
        };
      }
    } else if (merged[key] && typeof merged[key] === 'object') {
      merged[key] = { ...merged[key], ...(value || {}) };
    } else {
      merged[key] = value;
    }
  }
  devices = merged;
  updateGlobalDevicesReference(devices);
}
unifyDevices(devices);

function getBatteryPlateSupport(name) {
  const cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return [];
  return cam.power.batteryPlateSupport.filter(Boolean);
}

function getSupportedBatteryPlates(name) {
  return getBatteryPlateSupport(name)
    .map(bp => bp.type)
    .filter(Boolean);
}

function getAvailableBatteryPlates(name) {
  const support = getBatteryPlateSupport(name);
  if (!support.length) return [];
  const nativeTypes = new Set(
    support
      .filter(bp => bp.mount === 'native' && bp.type)
      .map(bp => bp.type)
  );
  if (nativeTypes.size === 1 && nativeTypes.has('B-Mount')) {
    return ['B-Mount'];
  }
  return [...new Set(getSupportedBatteryPlates(name))];
}

function supportsMountCamera(name, mountType) {
  return getAvailableBatteryPlates(name).includes(mountType);
}

function supportsBMountCamera(name) {
  return supportsMountCamera(name, 'B-Mount');
}

function supportsGoldMountCamera(name) {
  return supportsMountCamera(name, 'Gold-Mount');
}

function getBatteriesByMount(mountType) {
  const out = {};
  for (const [name, info] of Object.entries(devices.batteries)) {
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}

function getHotswapsByMount(mountType) {
  const out = {};
  for (const [name, info] of Object.entries(devices.batteryHotswaps || {})) {
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}

function getBatteryMountType(batteryName) {
  if (!batteryName || batteryName === 'None') {
    return '';
  }
  const info = devices?.batteries?.[batteryName];
  const mount = info && typeof info.mount_type === 'string' ? info.mount_type : '';
  return mount || '';
}

function normalizeBatteryPlateValue(plateValue, batteryName) {
  const normalizedPlate = typeof plateValue === 'string' ? plateValue.trim() : '';
  const derivedMount = getBatteryMountType(batteryName);
  if (!derivedMount) {
    return normalizedPlate;
  }
  if (!normalizedPlate || normalizedPlate !== derivedMount) {
    return derivedMount;
  }
  return normalizedPlate;
}

function applyBatteryPlateSelectionFromBattery(batteryName, currentPlateValue) {
  const normalizedPlate = typeof currentPlateValue === 'string' ? currentPlateValue.trim() : '';
  const desiredPlate = normalizeBatteryPlateValue(normalizedPlate, batteryName);
  if (!batteryPlateSelect || !desiredPlate) {
    return desiredPlate || normalizedPlate;
  }
  const options = Array.from(batteryPlateSelect.options || []);
  const hasDesiredOption = options.some(option => option && option.value === desiredPlate);
  if (!hasDesiredOption) {
    return normalizedPlate;
  }
  if (batteryPlateSelect.value !== desiredPlate) {
    batteryPlateSelect.value = desiredPlate;
  }
  return desiredPlate;
}

function getSelectedPlate() {
  const camName = typeof cameraSelect?.value === 'string' ? cameraSelect.value : '';
  const plates = typeof getAvailableBatteryPlates === 'function'
    ? getAvailableBatteryPlates(camName)
    : [];
  if (!Array.isArray(plates) || !plates.length) return null;
  const plateValue = typeof batteryPlateSelect?.value === 'string' ? batteryPlateSelect.value : '';
  if (plateValue) {
    return plateValue;
  }
  if (plates.includes('V-Mount')) {
    return 'V-Mount';
  }
  return plates[0];
}

function isSelectedPlateNative(camName) {
  const plate = getSelectedPlate();
  const cam = devices.cameras[camName];
  if (!plate || !cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return false;
  return cam.power.batteryPlateSupport.some(bp => bp.type === plate && bp.mount === 'native');
}

function shortConnLabel(type) {
  if (!type) return '';
  return String(type).replace(/\(.*?\)/, '').trim();
}

function formatConnLabel(from, to) {
  const a = shortConnLabel(from);
  const b = shortConnLabel(to);
  if (!a) return b || '';
  if (!b || a.toLowerCase() === b.toLowerCase()) return a;
  return `${a} to ${b}`;
}


const hasCamConnector = str => /CAM/i.test(str);
const hasLemo7PinConnector = str => /7-pin/i.test(str);

// Collect a list of FIZ connector type strings from a device definition.
function getFizConnectorTypes(device) {
  if (!device) return [];
  if (Array.isArray(device.fizConnectors)) {
    return device.fizConnectors.map(fc => fc.type);
  }
  return device.fizConnector ? [device.fizConnector] : [];
}

function controllerCamPort(name) {
  const isRf = /cforce.*rf/i.test(name) || /RIA-1/i.test(name);
  if (isRf) return 'Cam';
  const c = devices.fiz?.controllers?.[name];
  if (c) {
    if (/UMC-4/i.test(name)) return '3-Pin R/S';
    const connStr = getFizConnectorTypes(c).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  const m = devices.fiz?.motors?.[name];
  if (m) {
    const connStr = getFizConnectorTypes(m).join(', ');
    if (hasCamConnector(connStr)) return 'Cam';
    if (hasLemo7PinConnector(connStr)) return 'LEMO 7-pin';
  }
  if (isArriOrCmotion(name) && !isRf) return 'LBUS';
  return 'FIZ Port';
}

function controllerDistancePort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/RIA-1/i.test(name) || /UMC-4/i.test(name)) return 'Serial';
  if (getFizConnectorTypes(c).some(type => /SERIAL/i.test(type))) return 'Serial';
  return 'LBUS';
}

function controllerPriority(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name) || /UMC-4/i.test(name)) return 0;
  if (/Master Grip/i.test(name) || /ZMU-4/i.test(name) || /OCU-1/i.test(name)) return 1;
  return 2;
}

function motorPriority(name) {
  const m = devices.fiz?.motors?.[name];
  if (m && m.internalController && /CAM/i.test(m.fizConnector || '')) return 0;
  return 1;
}
function isArriOrCmotion(name) {
  return /^(ARRI|Arri)/i.test(name) || /cmotion/i.test(name);
}

function isArri(name) {
  return /arri/i.test(name);
}
function fizNeedsPower(name) {
  const d = devices.fiz?.controllers?.[name] || devices.fiz?.motors?.[name];
  if (!d) return false;
  const ps = String(d.powerSource || '').toLowerCase();
  if (ps.includes('internal battery') && !ps.includes('external')) return false;
  return true;
}


function firstConnector(str) {
  if (!str) return '';
  return str.split(',')[0].trim();
}

/**
 * Returns the first FIZ connector for a device, optionally prioritizing
 * connectors that match a set of regular expressions. This consolidates the
 * repeated logic for choosing between `fizConnector` and `fizConnectors` while
 * keeping any existing preference order.
 *
 * @param {object} device - Device object that may include `fizConnector` or
 *   `fizConnectors`.
 * @param {RegExp[]} [preferredMatchers=[]] - Regex patterns to prioritize.
 * @returns {string} The normalized connector label or an empty string if none
 *   is found.
 */
function getFizPort(device, preferredMatchers = []) {
  if (!device) return '';
  const connectors = Array.isArray(device.fizConnectors)
    ? device.fizConnectors
    : [];
  for (const matcher of preferredMatchers) {
    const match = connectors.find(fc => matcher.test(fc.type));
    if (match) return firstConnector(match.type);
  }
  const portStr = device.fizConnector || connectors[0]?.type;
  return firstConnector(portStr);
}

function cameraFizPort(camName, controllerPort, deviceName = '') {
  const cam = devices.cameras[camName];
  if (!cam || !Array.isArray(cam.fizConnectors) || cam.fizConnectors.length === 0) return 'LBUS';
  if (!controllerPort) return cam.fizConnectors[0].type;

  // If a non-ARRI FIZ device is attached to an ARRI camera, prefer the EXT port
  if (isArri(camName) && deviceName && !isArri(deviceName)) {
    const ext = cam.fizConnectors.find(fc => /ext/i.test(fc.type));
    if (ext) return ext.type;
  }

  const norm = shortConnLabel(firstConnector(controllerPort)).toLowerCase();
  const match = cam.fizConnectors.find(fc => shortConnLabel(fc.type).toLowerCase() === norm);
  return match ? match.type : cam.fizConnectors[0].type;
}

function controllerFizPort(name) {
  const c = devices.fiz?.controllers?.[name];
  if (/UMC-4/i.test(name)) {
    return getFizPort(c, [/LCS/i]) || 'LCS (LEMO 7-pin)';
  }
  const port = getFizPort(c);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function motorFizPort(name) {
  const m = devices.fiz?.motors?.[name];
  const port = getFizPort(m);
  return port || (isArriOrCmotion(name) ? 'LBUS' : 'Proprietary');
}

function distanceFizPort(name) {
  const d = devices.fiz?.distance?.[name];
  if (!d) return 'LBUS';
  const port = getFizPort(d, [/LBUS/i, /SERIAL/i]);
  if (port) return port;
  return /preston/i.test(name) ? 'Serial' : 'LBUS';
}

function fizPort(name) {
  if (devices.fiz?.controllers?.[name]) return controllerFizPort(name);
  if (devices.fiz?.motors?.[name]) return motorFizPort(name);
  if (devices.fiz?.distance?.[name]) return distanceFizPort(name);
  return 'LBUS';
}

function fizPowerPort(name) {
  if (/cforce.*rf/i.test(name) || /RIA-1/i.test(name)) return 'Cam';
  return fizPort(name);
}

function sdiRate(type) {
  const m = /([\d.]+)G-SDI/i.exec(type || '');
  if (m) return parseFloat(m[1]);
  return /SDI/i.test(type || '') ? 1 : null;
}
function connectionLabel(outType, inType) {
  if (!outType || !inType) return "";
  if (/HDMI/i.test(outType) && /HDMI/i.test(inType)) return "HDMI";
  if (/SDI/i.test(outType) && /SDI/i.test(inType)) {
    const rate = Math.min(sdiRate(outType) || 0, sdiRate(inType) || 0) || sdiRate(outType) || sdiRate(inType) || 0;
    if (rate >= 12) return "12G-SDI";
    if (rate >= 6) return "6G-SDI";
    if (rate >= 3) return "3G-SDI";
    if (rate >= 1.5) return "1.5G-SDI";
    return "SDI";
  }
  if (/HDMI/i.test(outType)) return "HDMI";
  if (/SDI/i.test(outType)) return "SDI";
  return "";
}


function updateBatteryPlateVisibility() {
  const camName = cameraSelect.value;
  const plates = getAvailableBatteryPlates(camName);
  const current = batteryPlateSelect.value;
  batteryPlateSelect.innerHTML = '';
  if (plates.length) {
    plates.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt;
      opt.textContent = pt;
      batteryPlateSelect.appendChild(opt);
    });
    let def = current;
    if (!plates.includes(def)) {
      def = plates.includes('V-Mount') ? 'V-Mount' : plates[0];
    }
    batteryPlateSelect.value = def;
    batteryPlateRow.style.display = '';
  } else {
    batteryPlateRow.style.display = 'none';
    batteryPlateSelect.value = '';
  }
  updateViewfinderSettingsVisibility();
  updateViewfinderExtensionVisibility();
  updateMonitoringConfigurationOptions();
}

function updateViewfinderSettingsVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const config = monitoringConfigurationSelect?.value;
  const show = hasViewfinder && (config === 'Viewfinder only' || config === 'Viewfinder and Onboard');
  if (viewfinderSettingsRow) {
    if (show) {
      viewfinderSettingsRow.classList.remove('hidden');
    } else {
      viewfinderSettingsRow.classList.add('hidden');
      const vfSelect = document.getElementById('viewfinderSettings');
      if (vfSelect) {
        Array.from(vfSelect.options).forEach(o => { o.selected = false; });
      }
    }
  }
}

function updateMonitoringConfigurationOptions() {
  if (!monitoringConfigurationSelect) return;
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  const monitorSelected = monitorSelect && monitorSelect.value && monitorSelect.value !== 'None';
  const vfOnlyOption = Array.from(monitoringConfigurationSelect.options || [])
    .find(o => o.value === 'Viewfinder only');
  if (!vfOnlyOption) return;
  const show = hasViewfinder && !monitorSelected;
  vfOnlyOption.hidden = !show;
  if (monitoringConfigurationUserChanged) {
    if (!show && monitoringConfigurationSelect.value === 'Viewfinder only') {
      monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
    }
    updateViewfinderSettingsVisibility();
    return;
  }

  if (monitorSelected) {
    monitoringConfigurationSelect.value = hasViewfinder ? 'Viewfinder and Onboard' : 'Onboard Only';
  } else if (!hasViewfinder) {
    monitoringConfigurationSelect.value = 'Onboard Only';
  } else {
    monitoringConfigurationSelect.value = 'Viewfinder only';
  }
  updateViewfinderSettingsVisibility();
}

function updateViewfinderExtensionVisibility() {
  const cam = devices?.cameras?.[cameraSelect?.value];
  const hasViewfinder = Array.isArray(cam?.viewfinder) && cam.viewfinder.length > 0;
  if (viewfinderExtensionRow) {
    if (hasViewfinder) {
      viewfinderExtensionRow.classList.remove('hidden');
    } else {
      viewfinderExtensionRow.classList.add('hidden');
      const vfExtSel = document.getElementById('viewfinderExtension');
      if (vfExtSel) {
        vfExtSel.value = '';
      }
    }
  }
}

function updateBatteryLabel() {
  const label = document.getElementById('batteryLabel');
  if (!label) return;
  label.setAttribute('data-help', texts[currentLang].batterySelectHelp);
  if (getSelectedPlate() === 'B-Mount') {
    label.textContent = texts[currentLang].batteryBMountLabel || 'B-Mount Battery:';
  } else {
    label.textContent = texts[currentLang].batteryLabel;
  }
}

function updateBatteryOptions() {
  const current = batterySelect.value;
  const currentSwap = hotswapSelect.value;
  const plate = getSelectedPlate();
  const camName = cameraSelect.value;
  const supportsB = supportsBMountCamera(camName);
  const supportsGold = supportsGoldMountCamera(camName);
  let swaps;
  if (plate === 'B-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('B-Mount'), true);
    swaps = getHotswapsByMount('B-Mount');
  } else if (plate === 'V-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('V-Mount'), true);
    swaps = getHotswapsByMount('V-Mount');
  } else if (plate === 'Gold-Mount') {
    populateSelect(batterySelect, getBatteriesByMount('Gold-Mount'), true);
    swaps = getHotswapsByMount('Gold-Mount');
  } else {
    let bats = devices.batteries;
    if (!supportsB) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    if (!supportsGold) {
      bats = Object.fromEntries(Object.entries(bats).filter(([, b]) => b.mount_type !== 'Gold-Mount'));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(([, b]) => b.mount_type !== 'B-Mount'));
    }
    if (!supportsGold) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(([, b]) => b.mount_type !== 'Gold-Mount'));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([name]) => name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate')
    );
  }

  // Filter out hotswaps that cannot supply the required current
  const totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(
      Object.entries(swaps).filter(([, info]) => typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow)
    );
  }

  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(o => o.value === current)) {
    batterySelect.value = current;
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(batterySelect);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(() => {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(batterySelect);
      }
    });
  }
  if (Array.from(hotswapSelect.options).some(o => o.value === currentSwap)) {
    hotswapSelect.value = currentSwap;
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(hotswapSelect);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(() => {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(hotswapSelect);
      }
    });
  }
  updateBatteryLabel();
}

const BRAND_KEYWORDS = {
  arri: 'arri',
  cmotion: 'cmotion',
  focusbug: 'focusbug',
  tilta: 'tilta',
  preston: 'preston',
  chrosziel: 'chrosziel',
  smallrig: 'smallrig',
  dji: 'dji',
  redrock: 'redrock',
  teradek: 'teradek'
};

function detectBrand(name) {
  if (!name) return null;
  const n = String(name).trim().toLowerCase();
  if (n === 'none') return null;
  for (const [keyword, brand] of Object.entries(BRAND_KEYWORDS)) {
    if (n.includes(keyword)) return brand;
  }
  return 'other';
}

const STATUS_CLASS_BY_LEVEL = {
  info: 'status-message--info',
  success: 'status-message--success',
  warning: 'status-message--warning',
  danger: 'status-message--danger'
};

function setStatusLevel(element, level) {
  if (!element) return;

  const severityClasses = Object.values(STATUS_CLASS_BY_LEVEL);
  if (element.classList) {
    severityClasses.forEach(cls => element.classList.remove(cls));
  } else if (typeof element.className === 'string') {
    const remaining = element.className
      .split(/\s+/)
      .filter(Boolean)
      .filter(cls => !severityClasses.includes(cls));
    element.className = remaining.join(' ');
  }

  const normalized = level && STATUS_CLASS_BY_LEVEL[level] ? level : null;
  if (normalized) {
    const severityClass = STATUS_CLASS_BY_LEVEL[normalized];
    if (element.classList) {
      if (!element.classList.contains('status-message')) {
        element.classList.add('status-message');
      }
      element.classList.add(severityClass);
    } else if (typeof element.className === 'string') {
      const classes = element.className.split(/\s+/).filter(Boolean);
      if (!classes.includes('status-message')) {
        classes.push('status-message');
      }
      classes.push(severityClass);
      element.className = Array.from(new Set(classes)).join(' ');
    }
    if (element.dataset) {
      element.dataset.statusLevel = normalized;
    } else if (element.setAttribute) {
      element.setAttribute('data-status-level', normalized);
    }
  } else if (element.dataset && 'statusLevel' in element.dataset) {
    delete element.dataset.statusLevel;
  } else if (element.removeAttribute) {
    element.removeAttribute('data-status-level');
  }
}

function formatStatusMessage(message) {
  if (typeof message !== 'string' || message.length === 0) {
    return '';
  }

  const match = message.match(/^([A-ZÀ-ÖØ-Ý]+(?:[\s\u00A0-][A-ZÀ-ÖØ-Ý]+)*)([\s\u00A0]*:)([\s\u00A0]*)/u);
  if (match) {
    const [, label, colonPart, trailingSpace] = match;
    const rest = message.slice(match[0].length);
    return `<strong>${escapeHtml(label)}${escapeHtml(colonPart)}</strong>${escapeHtml(trailingSpace)}${escapeHtml(rest)}`;
  }

  return escapeHtml(message);
}

function setStatusMessage(element, message) {
  if (!element) return;
  if (!message) {
    element.textContent = '';
    return;
  }

  element.innerHTML = formatStatusMessage(message);
}

function formatCurrentValue(value) {
  if (!Number.isFinite(value)) return '0';
  const rounded = Number.parseFloat(value.toFixed(2));
  if (Number.isNaN(rounded)) return '0';
  return rounded.toString();
}

function checkFizCompatibility() {
  const brands = new Set();
  motorSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  controllerSelects.forEach(sel => { const b = detectBrand(sel.value); if (b) brands.add(b); });
  const distB = detectBrand(distanceSelect.value);
  if (distB) brands.add(distB);
  const cameraBrand = detectBrand(cameraSelect.value);

  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  let incompatible = false;
  const arr = Array.from(brands);

  if (cameraBrand === 'dji' && arr.some(b => b && b !== 'dji')) {
    incompatible = true;
  } else if (arr.length > 1) {
    const allowed = ['arri', 'cmotion', 'focusbug'];
    if (arr.every(b => allowed.includes(b))) {
      incompatible = false;
    } else {
      const filtered = arr.filter(b => b !== 'other');
      const distinct = new Set(filtered);
      if (distinct.size > 1) incompatible = true;
    }
  }

  if (incompatible) {
    setStatusMessage(compatElem, texts[currentLang].incompatibleFIZWarning);
    setStatusLevel(compatElem, 'danger');
  } else {
    setStatusMessage(compatElem, '');
    setStatusLevel(compatElem, null);
  }
}

function checkFizController() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem) return;

  const motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  if (!motors.length) return;

  const controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];

  const isAmira = /Arri Amira/i.test(camName);
  const onlyCforceMiniPlus = motors.length > 0 && motors.every(n => {
    const lower = n.toLowerCase();
    return ((lower.includes('cforce mini') && !lower.includes('rf')) || lower.includes('cforce plus'));
  });
  const hasRemoteController = controllers.some(n => /ria-1|umc-4|cforce.*rf/i.test(n)) || motors.some(n => /cforce.*rf/i.test(n));
  if (isAmira && onlyCforceMiniPlus && !hasRemoteController) {
    setStatusMessage(compatElem, texts[currentLang].amiraCforceRemoteWarning);
    setStatusLevel(compatElem, 'danger');
    return;
  }

  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  let hasController = cameraHasLBUS && /arri/i.test(camName);

  controllers.forEach(name => {
    const c = devices.fiz.controllers[name];
    if (!c) return;
    const connStr = (c.fizConnectors || []).map(fc => fc.type).join(', ');
    if (/CAM|SERIAL|Motor/i.test(connStr)) hasController = true;
    if (c.internalController) hasController = true;
  });

  motors.forEach(name => {
    const m = devices.fiz.motors[name];
    if (m && m.internalController) hasController = true;
  });

  const needController = motors.some(name => {
    const m = devices.fiz.motors[name];
    return m && m.internalController === false;
  });

  if (needController && !hasController) {
    setStatusMessage(compatElem, texts[currentLang].missingFIZControllerWarning);
    setStatusLevel(compatElem, 'danger');
  }
}

function checkArriCompatibility() {
  const compatElem = document.getElementById('compatWarning');
  if (!compatElem || compatElem.textContent) return;

  let motors = motorSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  motors.sort((a, b) => motorPriority(a) - motorPriority(b));
  const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
  const hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    const [m] = motors.splice(internalIdx, 1);
    motors.unshift(m);
  }
  let controllers = controllerSelects.map(sel => sel.value).filter(v => v && v !== 'None');
  controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));
  const distance = distanceSelect.value;

  const camName = cameraSelect.value;
  const cam = devices.cameras[camName];
  const cameraHasLBUS = Array.isArray(cam?.fizConnectors) &&
    cam.fizConnectors.some(fc => /LBUS/i.test(fc.type));
  const builtInController = cameraHasLBUS && /arri/i.test(camName);

  const usesUMC4 = controllers.some(n => /UMC-4/i.test(n));
  const usesRIA1 = controllers.some(n => /RIA-1/i.test(n));
  const usesRF = controllers.some(n => /cforce.*rf/i.test(n)) || motors.some(m => /cforce.*rf/i.test(m));

  const camCounts = /(Alexa Mini LF|Alexa Mini|Alexa 35)/i.test(camName);
  const onlyMasterGrip =
    controllers.length > 0 &&
    controllers.every(n => /Master Grip/i.test(n)) &&
    !camCounts;

  let msg = '';
  const clmRegex = /CLM-[345]/i;
  const hasCLM = motors.some(m => clmRegex.test(m));
  if (hasCLM && !usesUMC4) {
    msg = texts[currentLang].arriCLMNoUMC4Warning;
  } else if (usesUMC4 && motors.some(m => !clmRegex.test(m))) {
    msg = texts[currentLang].arriUMC4Warning;
  } else if ((usesRIA1 || usesRF) && motors.some(m => clmRegex.test(m))) {
    msg = texts[currentLang].arriRIA1Warning;
  } else if (
    distance &&
    distance !== 'None' &&
    !(usesUMC4 || usesRIA1 || usesRF || builtInController)
  ) {
    msg = texts[currentLang].distanceControllerWarning;
  } else if (onlyMasterGrip && !usesRF) {
    msg = texts[currentLang].masterGripWirelessWarning;
  }

  if (msg) {
    setStatusMessage(compatElem, msg);
    if (msg === texts[currentLang].arriUMC4Warning) {
      setStatusLevel(compatElem, 'warning');
    } else {
      setStatusLevel(compatElem, 'danger');
    }
  }
}

var gearItemTranslations = {};
// Load translations when not already present (mainly for tests)
if (typeof texts === 'undefined') {
  try {
    const translations = require('./translations.js');
    window.texts = translations.texts;
    window.categoryNames = translations.categoryNames;
    window.gearItems = translations.gearItems;
    gearItemTranslations = translations.gearItems || {};
  } catch (e) {
    console.warn('Failed to load translations', e);
  }
} else {
  gearItemTranslations = typeof gearItems !== 'undefined' ? gearItems : {};
}


const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES =
  typeof texts === "object" && texts !== null
    ? Object.keys(texts)
    : [DEFAULT_LANGUAGE];

function resolveLanguagePreference(candidate) {
  if (!candidate) {
    return { language: DEFAULT_LANGUAGE, matched: false };
  }

  const normalized = String(candidate).toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(normalized)) {
    return { language: normalized, matched: true };
  }

  const short = normalized.slice(0, 2);
  if (SUPPORTED_LANGUAGES.includes(short)) {
    return { language: short, matched: true };
  }

  return { language: DEFAULT_LANGUAGE, matched: false };
}

var autoGearHeadingElem = document.getElementById('autoGearHeading');
var autoGearDescriptionElem = document.getElementById('autoGearDescription');
var autoGearMonitorDefaultsSection = document.getElementById('autoGearMonitorDefaultsSection');
var autoGearMonitorDefaultsHeading = document.getElementById('autoGearMonitorDefaultsHeading');
var autoGearMonitorDefaultsDescription = document.getElementById('autoGearMonitorDefaultsDescription');
var autoGearDefaultFocusMonitorSelect = document.getElementById('autoGearDefaultFocusMonitor');
var autoGearDefaultHandheldMonitorSelect = document.getElementById('autoGearDefaultHandheldMonitor');
var autoGearDefaultComboMonitorSelect = document.getElementById('autoGearDefaultComboMonitor');
var autoGearDefaultDirectorMonitorSelect = document.getElementById('autoGearDefaultDirectorMonitor');
var autoGearDefaultFocusMonitorLabel = document.getElementById('autoGearDefaultFocusMonitorLabel');
var autoGearDefaultHandheldMonitorLabel = document.getElementById('autoGearDefaultHandheldMonitorLabel');
var autoGearDefaultComboMonitorLabel = document.getElementById('autoGearDefaultComboMonitorLabel');
var autoGearDefaultDirectorMonitorLabel = document.getElementById('autoGearDefaultDirectorMonitorLabel');
var autoGearMonitorDefaultControls = [
  {
    key: 'focus',
    select: autoGearDefaultFocusMonitorSelect,
    label: autoGearDefaultFocusMonitorLabel,
  },
  {
    key: 'handheld7',
    select: autoGearDefaultHandheldMonitorSelect,
    label: autoGearDefaultHandheldMonitorLabel,
  },
  {
    key: 'combo15',
    select: autoGearDefaultComboMonitorSelect,
    label: autoGearDefaultComboMonitorLabel,
  },
  {
    key: 'director15',
    select: autoGearDefaultDirectorMonitorSelect,
    label: autoGearDefaultDirectorMonitorLabel,
  },
];
autoGearMonitorDefaultControls.forEach(control => {
  if (!control || !control.select) return;
  control.select.addEventListener('change', event => {
    setAutoGearMonitorDefault(control.key, event.target.value);
  });
});

var autoGearSearchInput = document.getElementById('autoGearSearch');
var autoGearSearchLabel = document.getElementById('autoGearSearchLabel');
var autoGearFilterScenarioLabel = document.getElementById('autoGearFilterScenarioLabel');
var autoGearFilterScenarioSelect = document.getElementById('autoGearFilterScenario');
var autoGearFilterClearButton = document.getElementById('autoGearFilterClear');
var autoGearSummarySection = document.getElementById('autoGearSummary');
var autoGearSummaryHeadingElem = document.getElementById('autoGearSummaryHeading');
var autoGearSummaryDescriptionElem = document.getElementById('autoGearSummaryDescription');
var autoGearSummaryCards = document.getElementById('autoGearSummaryCards');
var autoGearSummaryDetails = document.getElementById('autoGearSummaryDetails');
var autoGearRulesList = document.getElementById('autoGearRulesList');
var autoGearPresetDescription = document.getElementById('autoGearPresetDescription');
var autoGearPresetLabel = document.getElementById('autoGearPresetLabel');
var autoGearPresetSelect = document.getElementById('autoGearPresetSelect');
var autoGearSavePresetButton = document.getElementById('autoGearSavePreset');
var autoGearDeletePresetButton = document.getElementById('autoGearDeletePreset');
var autoGearAddRuleBtn = document.getElementById('autoGearAddRule');
var autoGearResetFactoryButton = document.getElementById('autoGearResetFactory');
var autoGearEditor = document.getElementById('autoGearEditor');
var autoGearConditionControls = document.getElementById('autoGearConditionControls');
var autoGearConditionSelectLabel = document.getElementById('autoGearConditionSelectLabel');
var autoGearConditionSelect = document.getElementById('autoGearConditionSelect');
var autoGearConditionAddButton = document.getElementById('autoGearConditionAdd');
var autoGearConditionList = document.getElementById('autoGearConditionList');
var autoGearAlwaysLabel = document.getElementById('autoGearAlwaysLabel');
var autoGearAlwaysHelp = document.getElementById('autoGearAlwaysHelp');
var autoGearCameraWeightSection = document.getElementById('autoGearCondition-cameraWeight');

var autoGearConditionSections = {
  always: document.getElementById('autoGearCondition-always'),
  scenarios: document.getElementById('autoGearCondition-scenarios'),
  shootingDays: document.getElementById('autoGearCondition-shootingDays'),
  mattebox: document.getElementById('autoGearCondition-mattebox'),
  cameraHandle: document.getElementById('autoGearCondition-cameraHandle'),
  viewfinderExtension: document.getElementById('autoGearCondition-viewfinderExtension'),
  deliveryResolution: document.getElementById('autoGearCondition-deliveryResolution'),
  videoDistribution: document.getElementById('autoGearCondition-videoDistribution'),
  camera: document.getElementById('autoGearCondition-camera'),
  cameraWeight: autoGearCameraWeightSection,
  monitor: document.getElementById('autoGearCondition-monitor'),
  tripodHeadBrand: document.getElementById('autoGearCondition-tripodHeadBrand'),
  tripodBowl: document.getElementById('autoGearCondition-tripodBowl'),
  tripodTypes: document.getElementById('autoGearCondition-tripodTypes'),
  tripodSpreader: document.getElementById('autoGearCondition-tripodSpreader'),
  crewPresent: document.getElementById('autoGearCondition-crewPresent'),
  crewAbsent: document.getElementById('autoGearCondition-crewAbsent'),
  wireless: document.getElementById('autoGearCondition-wireless'),
  motors: document.getElementById('autoGearCondition-motors'),
  controllers: document.getElementById('autoGearCondition-controllers'),
  distance: document.getElementById('autoGearCondition-distance'),
};

var autoGearConditionAddShortcuts = {
  always: autoGearConditionSections.always?.querySelector('.auto-gear-condition-add') || null,
  scenarios: autoGearConditionSections.scenarios?.querySelector('.auto-gear-condition-add') || null,
  shootingDays: autoGearConditionSections.shootingDays?.querySelector('.auto-gear-condition-add') || null,
  mattebox: autoGearConditionSections.mattebox?.querySelector('.auto-gear-condition-add') || null,
  cameraHandle: autoGearConditionSections.cameraHandle?.querySelector('.auto-gear-condition-add') || null,
  viewfinderExtension: autoGearConditionSections.viewfinderExtension?.querySelector('.auto-gear-condition-add') || null,
  deliveryResolution: autoGearConditionSections.deliveryResolution?.querySelector('.auto-gear-condition-add') || null,
  videoDistribution: autoGearConditionSections.videoDistribution?.querySelector('.auto-gear-condition-add') || null,
  camera: autoGearConditionSections.camera?.querySelector('.auto-gear-condition-add') || null,
  cameraWeight: autoGearConditionSections.cameraWeight?.querySelector('.auto-gear-condition-add') || null,
  monitor: autoGearConditionSections.monitor?.querySelector('.auto-gear-condition-add') || null,
  tripodHeadBrand: autoGearConditionSections.tripodHeadBrand?.querySelector('.auto-gear-condition-add') || null,
  tripodBowl: autoGearConditionSections.tripodBowl?.querySelector('.auto-gear-condition-add') || null,
  tripodTypes: autoGearConditionSections.tripodTypes?.querySelector('.auto-gear-condition-add') || null,
  tripodSpreader: autoGearConditionSections.tripodSpreader?.querySelector('.auto-gear-condition-add') || null,
  crewPresent: autoGearConditionSections.crewPresent?.querySelector('.auto-gear-condition-add') || null,
  crewAbsent: autoGearConditionSections.crewAbsent?.querySelector('.auto-gear-condition-add') || null,
  wireless: autoGearConditionSections.wireless?.querySelector('.auto-gear-condition-add') || null,
  motors: autoGearConditionSections.motors?.querySelector('.auto-gear-condition-add') || null,
  controllers: autoGearConditionSections.controllers?.querySelector('.auto-gear-condition-add') || null,
  distance: autoGearConditionSections.distance?.querySelector('.auto-gear-condition-add') || null,
};

var autoGearConditionRemoveButtons = {
  always: autoGearConditionSections.always?.querySelector('.auto-gear-condition-remove') || null,
  scenarios: autoGearConditionSections.scenarios?.querySelector('.auto-gear-condition-remove') || null,
  shootingDays: autoGearConditionSections.shootingDays?.querySelector('.auto-gear-condition-remove') || null,
  mattebox: autoGearConditionSections.mattebox?.querySelector('.auto-gear-condition-remove') || null,
  cameraHandle: autoGearConditionSections.cameraHandle?.querySelector('.auto-gear-condition-remove') || null,
  viewfinderExtension: autoGearConditionSections.viewfinderExtension?.querySelector('.auto-gear-condition-remove') || null,
  deliveryResolution: autoGearConditionSections.deliveryResolution?.querySelector('.auto-gear-condition-remove') || null,
  videoDistribution: autoGearConditionSections.videoDistribution?.querySelector('.auto-gear-condition-remove') || null,
  camera: autoGearConditionSections.camera?.querySelector('.auto-gear-condition-remove') || null,
  cameraWeight: autoGearConditionSections.cameraWeight?.querySelector('.auto-gear-condition-remove') || null,
  monitor: autoGearConditionSections.monitor?.querySelector('.auto-gear-condition-remove') || null,
  tripodHeadBrand: autoGearConditionSections.tripodHeadBrand?.querySelector('.auto-gear-condition-remove') || null,
  tripodBowl: autoGearConditionSections.tripodBowl?.querySelector('.auto-gear-condition-remove') || null,
  tripodTypes: autoGearConditionSections.tripodTypes?.querySelector('.auto-gear-condition-remove') || null,
  tripodSpreader: autoGearConditionSections.tripodSpreader?.querySelector('.auto-gear-condition-remove') || null,
  crewPresent: autoGearConditionSections.crewPresent?.querySelector('.auto-gear-condition-remove') || null,
  crewAbsent: autoGearConditionSections.crewAbsent?.querySelector('.auto-gear-condition-remove') || null,
  wireless: autoGearConditionSections.wireless?.querySelector('.auto-gear-condition-remove') || null,
  motors: autoGearConditionSections.motors?.querySelector('.auto-gear-condition-remove') || null,
  controllers: autoGearConditionSections.controllers?.querySelector('.auto-gear-condition-remove') || null,
  distance: autoGearConditionSections.distance?.querySelector('.auto-gear-condition-remove') || null,
};

if (autoGearAddRuleBtn) {
  autoGearAddRuleBtn.setAttribute('aria-controls', 'autoGearEditor');
  autoGearAddRuleBtn.setAttribute(
    'aria-expanded',
    autoGearEditor && !autoGearEditor.hidden ? 'true' : 'false'
  );
}
if (autoGearEditor) {
  autoGearEditor.setAttribute('aria-hidden', autoGearEditor.hidden ? 'true' : 'false');
}
var autoGearRuleNameInput = document.getElementById('autoGearRuleName');
var autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
var autoGearScenariosSelect = document.getElementById('autoGearScenarios');
var autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
let autoGearScenarioModeSelectElement = document.getElementById('autoGearScenarioMode');
var autoGearScenarioModeLabel = document.getElementById('autoGearScenarioModeLabel');
var autoGearScenarioMultiplierContainer = document.getElementById('autoGearScenarioMultiplierContainer');
var autoGearScenarioBaseSelect = document.getElementById('autoGearScenarioBase');
var autoGearScenarioBaseLabel = document.getElementById('autoGearScenarioBaseLabel');
var autoGearScenarioFactorInput = document.getElementById('autoGearScenarioFactor');
var autoGearScenarioFactorLabel = document.getElementById('autoGearScenarioFactorLabel');
var autoGearShootingDaysMode = document.getElementById('autoGearShootingDaysMode');
var autoGearShootingDaysInput = document.getElementById('autoGearShootingDays');
var autoGearShootingDaysLabel = document.getElementById('autoGearShootingDaysLabel');
var autoGearShootingDaysHelp = document.getElementById('autoGearShootingDaysHelp');
var autoGearShootingDaysValueLabel = document.getElementById('autoGearShootingDaysCountLabel');
var autoGearMatteboxSelect = document.getElementById('autoGearMattebox');
var autoGearMatteboxLabel = document.getElementById('autoGearMatteboxLabel');
var autoGearMatteboxModeLabel = document.getElementById('autoGearMatteboxModeLabel');
var autoGearMatteboxModeSelect = document.getElementById('autoGearMatteboxMode');
var autoGearCameraHandleSelect = document.getElementById('autoGearCameraHandle');
var autoGearCameraHandleLabel = document.getElementById('autoGearCameraHandleLabel');
var autoGearCameraHandleModeLabel = document.getElementById('autoGearCameraHandleModeLabel');
var autoGearCameraHandleModeSelect = document.getElementById('autoGearCameraHandleMode');
var autoGearViewfinderExtensionSelect = document.getElementById('autoGearViewfinderExtension');
var autoGearViewfinderExtensionLabel = document.getElementById('autoGearViewfinderExtensionLabel');
var autoGearViewfinderExtensionModeLabel = document.getElementById('autoGearViewfinderExtensionModeLabel');
var autoGearViewfinderExtensionModeSelect = document.getElementById('autoGearViewfinderExtensionMode');
var autoGearDeliveryResolutionSelect = document.getElementById('autoGearDeliveryResolution');
var autoGearDeliveryResolutionLabel = document.getElementById('autoGearDeliveryResolutionLabel');
var autoGearDeliveryResolutionModeLabel = document.getElementById('autoGearDeliveryResolutionModeLabel');
var autoGearDeliveryResolutionModeSelect = document.getElementById('autoGearDeliveryResolutionMode');
var autoGearVideoDistributionSelect = document.getElementById('autoGearVideoDistribution');
var autoGearVideoDistributionLabel = document.getElementById('autoGearVideoDistributionLabel');
var autoGearVideoDistributionModeLabel = document.getElementById('autoGearVideoDistributionModeLabel');
var autoGearVideoDistributionModeSelect = document.getElementById('autoGearVideoDistributionMode');
var autoGearCameraSelect = document.getElementById('autoGearCamera');
var autoGearCameraLabel = document.getElementById('autoGearCameraLabel');
var autoGearCameraModeLabel = document.getElementById('autoGearCameraModeLabel');
var autoGearCameraModeSelect = document.getElementById('autoGearCameraMode');
var autoGearCameraWeightLabel = document.getElementById('autoGearCameraWeightLabel');
var autoGearCameraWeightOperator = document.getElementById('autoGearCameraWeightOperator');
var autoGearCameraWeightOperatorLabel = document.getElementById('autoGearCameraWeightOperatorLabel');
var autoGearCameraWeightValueInput = document.getElementById('autoGearCameraWeightValue');
var autoGearCameraWeightValueLabel = document.getElementById('autoGearCameraWeightValueLabel');
var autoGearCameraWeightHelp = document.getElementById('autoGearCameraWeightHelp');
var autoGearMonitorSelect = document.getElementById('autoGearMonitor');
var autoGearMonitorLabel = document.getElementById('autoGearMonitorLabel');
var autoGearMonitorModeLabel = document.getElementById('autoGearMonitorModeLabel');
var autoGearMonitorModeSelect = document.getElementById('autoGearMonitorMode');
var autoGearTripodHeadBrandSelect = document.getElementById('autoGearTripodHeadBrand');
var autoGearTripodHeadBrandLabel = document.getElementById('autoGearTripodHeadBrandLabel');
var autoGearTripodHeadBrandModeLabel = document.getElementById('autoGearTripodHeadBrandModeLabel');
var autoGearTripodHeadBrandModeSelect = document.getElementById('autoGearTripodHeadBrandMode');
var autoGearTripodBowlSelect = document.getElementById('autoGearTripodBowl');
var autoGearTripodBowlLabel = document.getElementById('autoGearTripodBowlLabel');
var autoGearTripodBowlModeLabel = document.getElementById('autoGearTripodBowlModeLabel');
var autoGearTripodBowlModeSelect = document.getElementById('autoGearTripodBowlMode');
var autoGearTripodTypesSelect = document.getElementById('autoGearTripodTypes');
var autoGearTripodTypesLabel = document.getElementById('autoGearTripodTypesLabel');
var autoGearTripodTypesModeLabel = document.getElementById('autoGearTripodTypesModeLabel');
var autoGearTripodTypesModeSelect = document.getElementById('autoGearTripodTypesMode');
var autoGearTripodSpreaderSelect = document.getElementById('autoGearTripodSpreader');
var autoGearTripodSpreaderLabel = document.getElementById('autoGearTripodSpreaderLabel');
var autoGearTripodSpreaderModeLabel = document.getElementById('autoGearTripodSpreaderModeLabel');
var autoGearTripodSpreaderModeSelect = document.getElementById('autoGearTripodSpreaderMode');
var autoGearCrewPresentSelect = document.getElementById('autoGearCrewPresent');
var autoGearCrewPresentLabel = document.getElementById('autoGearCrewPresentLabel');
var autoGearCrewPresentModeLabel = document.getElementById('autoGearCrewPresentModeLabel');
var autoGearCrewPresentModeSelect = document.getElementById('autoGearCrewPresentMode');
var autoGearCrewAbsentSelect = document.getElementById('autoGearCrewAbsent');
var autoGearCrewAbsentLabel = document.getElementById('autoGearCrewAbsentLabel');
var autoGearCrewAbsentModeLabel = document.getElementById('autoGearCrewAbsentModeLabel');
var autoGearCrewAbsentModeSelect = document.getElementById('autoGearCrewAbsentMode');
var autoGearWirelessSelect = document.getElementById('autoGearWireless');
var autoGearWirelessLabel = document.getElementById('autoGearWirelessLabel');
var autoGearWirelessModeLabel = document.getElementById('autoGearWirelessModeLabel');
var autoGearWirelessModeSelect = document.getElementById('autoGearWirelessMode');
var autoGearMotorsSelect = document.getElementById('autoGearMotors');
var autoGearMotorsLabel = document.getElementById('autoGearMotorsLabel');
var autoGearMotorsModeLabel = document.getElementById('autoGearMotorsModeLabel');
var autoGearMotorsModeSelect = document.getElementById('autoGearMotorsMode');
var autoGearControllersSelect = document.getElementById('autoGearControllers');
var autoGearControllersLabel = document.getElementById('autoGearControllersLabel');
var autoGearControllersModeLabel = document.getElementById('autoGearControllersModeLabel');
var autoGearControllersModeSelect = document.getElementById('autoGearControllersMode');
var autoGearDistanceSelect = document.getElementById('autoGearDistance');
var autoGearDistanceLabel = document.getElementById('autoGearDistanceLabel');
var autoGearDistanceModeLabel = document.getElementById('autoGearDistanceModeLabel');
var autoGearDistanceModeSelect = document.getElementById('autoGearDistanceMode');
var autoGearConditionLabels = {
  always: autoGearAlwaysLabel,
  scenarios: autoGearScenariosLabel,
  shootingDays: autoGearShootingDaysLabel,
  mattebox: autoGearMatteboxLabel,
  cameraHandle: autoGearCameraHandleLabel,
  viewfinderExtension: autoGearViewfinderExtensionLabel,
  deliveryResolution: autoGearDeliveryResolutionLabel,
  videoDistribution: autoGearVideoDistributionLabel,
  camera: autoGearCameraLabel,
  cameraWeight: autoGearCameraWeightLabel,
  monitor: autoGearMonitorLabel,
  tripodHeadBrand: autoGearTripodHeadBrandLabel,
  tripodBowl: autoGearTripodBowlLabel,
  tripodTypes: autoGearTripodTypesLabel,
  tripodSpreader: autoGearTripodSpreaderLabel,
  crewPresent: autoGearCrewPresentLabel,
  crewAbsent: autoGearCrewAbsentLabel,
  wireless: autoGearWirelessLabel,
  motors: autoGearMotorsLabel,
  controllers: autoGearControllersLabel,
  distance: autoGearDistanceLabel,
};
var autoGearConditionSelects = {
  always: null,
  scenarios: autoGearScenariosSelect,
  shootingDays: autoGearShootingDaysInput,
  mattebox: autoGearMatteboxSelect,
  cameraHandle: autoGearCameraHandleSelect,
  viewfinderExtension: autoGearViewfinderExtensionSelect,
  deliveryResolution: autoGearDeliveryResolutionSelect,
  videoDistribution: autoGearVideoDistributionSelect,
  camera: autoGearCameraSelect,
  cameraWeight: autoGearCameraWeightValueInput,
  monitor: autoGearMonitorSelect,
  tripodHeadBrand: autoGearTripodHeadBrandSelect,
  tripodBowl: autoGearTripodBowlSelect,
  tripodTypes: autoGearTripodTypesSelect,
  tripodSpreader: autoGearTripodSpreaderSelect,
  crewPresent: autoGearCrewPresentSelect,
  crewAbsent: autoGearCrewAbsentSelect,
  wireless: autoGearWirelessSelect,
  motors: autoGearMotorsSelect,
  controllers: autoGearControllersSelect,
  distance: autoGearDistanceSelect,
};
var autoGearConditionLogicLabels = {
  mattebox: autoGearMatteboxModeLabel,
  cameraHandle: autoGearCameraHandleModeLabel,
  viewfinderExtension: autoGearViewfinderExtensionModeLabel,
  deliveryResolution: autoGearDeliveryResolutionModeLabel,
  videoDistribution: autoGearVideoDistributionModeLabel,
  camera: autoGearCameraModeLabel,
  monitor: autoGearMonitorModeLabel,
  tripodHeadBrand: autoGearTripodHeadBrandModeLabel,
  tripodBowl: autoGearTripodBowlModeLabel,
  tripodTypes: autoGearTripodTypesModeLabel,
  tripodSpreader: autoGearTripodSpreaderModeLabel,
  crewPresent: autoGearCrewPresentModeLabel,
  crewAbsent: autoGearCrewAbsentModeLabel,
  wireless: autoGearWirelessModeLabel,
  motors: autoGearMotorsModeLabel,
  controllers: autoGearControllersModeLabel,
  distance: autoGearDistanceModeLabel,
};
var autoGearConditionLogicSelects = {
  mattebox: autoGearMatteboxModeSelect,
  cameraHandle: autoGearCameraHandleModeSelect,
  viewfinderExtension: autoGearViewfinderExtensionModeSelect,
  deliveryResolution: autoGearDeliveryResolutionModeSelect,
  videoDistribution: autoGearVideoDistributionModeSelect,
  camera: autoGearCameraModeSelect,
  monitor: autoGearMonitorModeSelect,
  tripodHeadBrand: autoGearTripodHeadBrandModeSelect,
  tripodBowl: autoGearTripodBowlModeSelect,
  tripodTypes: autoGearTripodTypesModeSelect,
  tripodSpreader: autoGearTripodSpreaderModeSelect,
  crewPresent: autoGearCrewPresentModeSelect,
  crewAbsent: autoGearCrewAbsentModeSelect,
  wireless: autoGearWirelessModeSelect,
  motors: autoGearMotorsModeSelect,
  controllers: autoGearControllersModeSelect,
  distance: autoGearDistanceModeSelect,
};
Object.values(autoGearConditionLogicSelects).forEach(select => {
  if (select) select.disabled = true;
});
const AUTO_GEAR_CONDITION_KEYS = [
  'always',
  'scenarios',
  'shootingDays',
  'mattebox',
  'cameraHandle',
  'viewfinderExtension',
  'deliveryResolution',
  'videoDistribution',
  'camera',
  'cameraWeight',
  'monitor',
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
  'crewPresent',
  'crewAbsent',
  'wireless',
  'motors',
  'controllers',
  'distance',
];
const AUTO_GEAR_REPEATABLE_CONDITIONS = new Set([
  'scenarios',
  'mattebox',
  'cameraHandle',
  'viewfinderExtension',
  'deliveryResolution',
  'videoDistribution',
  'camera',
  'monitor',
  'tripodHeadBrand',
  'tripodBowl',
  'tripodTypes',
  'tripodSpreader',
  'crewPresent',
  'crewAbsent',
  'wireless',
  'motors',
  'controllers',
  'distance',
]);
const AUTO_GEAR_CONDITION_FALLBACK_LABELS = {
  always: 'Always include',
  scenarios: 'Required scenarios',
  shootingDays: 'Shooting days condition',
  mattebox: 'Mattebox options',
  cameraHandle: 'Camera handles',
  viewfinderExtension: 'Viewfinder extension',
  deliveryResolution: 'Delivery resolution',
  videoDistribution: 'Video distribution',
  camera: 'Camera',
  cameraWeight: 'Camera weight',
  monitor: 'Onboard monitor',
  tripodHeadBrand: 'Tripod head brand',
  tripodBowl: 'Tripod bowl size',
  tripodTypes: 'Tripod types',
  tripodSpreader: 'Tripod spreader',
  crewPresent: 'Crew present',
  crewAbsent: 'Crew absent',
  wireless: 'Wireless transmitter',
  motors: 'FIZ motors',
  controllers: 'FIZ controllers',
  distance: 'FIZ distance devices',
};

// Determine initial language (default English)
var currentLang = DEFAULT_LANGUAGE;
var updateHelpQuickLinksForLanguage;
var updateHelpResultsSummaryText;
let lastRuntimeHours = null;
try {
  const savedLang = localStorage.getItem("language");
  const resolvedSaved = resolveLanguagePreference(savedLang);
  if (savedLang && resolvedSaved.matched) {
    currentLang = resolvedSaved.language;
  } else if (typeof navigator !== "undefined") {
    const navLangs = Array.isArray(navigator.languages)
      ? navigator.languages
      : [navigator.language];
    for (const lang of navLangs) {
      const resolvedNavigator = resolveLanguagePreference(lang);
      if (resolvedNavigator.matched) {
        currentLang = resolvedNavigator.language;
        break;
      }
    }
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}

// Helper to apply translations to all UI text
function setLanguage(lang) {
  const requested = typeof lang === "string" ? lang : "";
  const resolved = resolveLanguagePreference(requested);
  let normalizedLang = resolved.language;
  if (!texts[normalizedLang]) {
    console.warn(
      `Missing translation bundle for "${normalizedLang}". Falling back to ${DEFAULT_LANGUAGE}.`
    );
    normalizedLang = DEFAULT_LANGUAGE;
  }
  if (
    requested &&
    normalizedLang === DEFAULT_LANGUAGE &&
    !resolved.matched &&
    requested.slice(0, 2).toLowerCase() !== DEFAULT_LANGUAGE
  ) {
    console.warn(
      `Unsupported language preference "${requested}". Falling back to ${DEFAULT_LANGUAGE}.`
    );
  }

  lang = normalizedLang;
  currentLang = lang;
  // persist selected language
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // ensure dropdown reflects the active language
  if (languageSelect) {
    languageSelect.value = lang;
  }
  if (settingsLanguage) {
    settingsLanguage.value = lang;
  }
  // update html lang attribute for better persistence
  document.documentElement.lang = lang;
  // Document title and main heading share the same text
  document.title = texts[lang].appTitle;
  document.getElementById("mainTitle").textContent = texts[lang].appTitle;
  document.getElementById("tagline").textContent = texts[lang].tagline;
  const doc = typeof document !== "undefined" ? document : null;
  const runtimeScope = getCoreGlobalObject();
  const resolveRuntimeValue = (name) => {
    if (!name) return undefined;
    if (runtimeScope && typeof runtimeScope === "object") {
      try {
        if (name in runtimeScope) {
          return runtimeScope[name];
        }
      } catch (scopeError) {
        void scopeError;
      }
    }
    if (typeof globalThis !== "undefined" && globalThis !== runtimeScope) {
      try {
        if (name in globalThis) {
          return globalThis[name];
        }
      } catch (globalError) {
        void globalError;
      }
    }
    return undefined;
  };
  const registerResolvedElement = (globalName, element) => {
    if (!globalName || !element) {
      return element;
    }
    try {
      exposeCoreRuntimeConstant(globalName, element);
    } catch (exposeError) {
      void exposeError;
    }
    return element;
  };
  const resolveElement = (globalName, elementId) => {
    let existing = null;
    try {
      existing = resolveRuntimeValue(globalName);
    } catch (resolveError) {
      console.warn(
        `Failed to resolve runtime value for "${globalName}"`,
        resolveError,
      );
      existing = null;
    }

    if (existing && typeof existing === "object") {
      return existing;
    }

    if (doc && typeof doc.getElementById === "function" && elementId) {
      try {
        const element = doc.getElementById(elementId);
        return registerResolvedElement(globalName, element);
      } catch (resolveDomError) {
        console.warn(
          `Failed to resolve document element "${elementId}"`,
          resolveDomError,
        );
        return null;
      }
    }

    return null;
  };
  const settingsShowAutoBackupsEl = resolveElement(
    "settingsShowAutoBackups",
    "settingsShowAutoBackups"
  );
  const backupSettingsButton = resolveElement("backupSettings", "backupSettings");
  const backupDiffToggleButtonEl = resolveElement(
    "backupDiffToggleButton",
    "backupDiffToggleButton"
  );
  const backupDiffHeadingEl = resolveElement("backupDiffHeading", "backupDiffHeading");
  const backupDiffIntroEl = resolveElement("backupDiffIntro", "backupDiffIntro");
  const backupDiffPrimaryLabelEl = resolveElement(
    "backupDiffPrimaryLabel",
    "backupDiffPrimaryLabel"
  );
  const backupDiffPrimarySelectEl = resolveElement(
    "backupDiffPrimarySelect",
    "backupDiffPrimary"
  );
  const backupDiffSecondaryLabelEl = resolveElement(
    "backupDiffSecondaryLabel",
    "backupDiffSecondaryLabel"
  );
  const backupDiffSecondarySelectEl = resolveElement(
    "backupDiffSecondarySelect",
    "backupDiffSecondary"
  );
  const backupDiffEmptyStateEl = resolveElement(
    "backupDiffEmptyState",
    "backupDiffEmptyState"
  );
  const backupDiffNotesLabelEl = resolveElement(
    "backupDiffNotesLabel",
    "backupDiffNotesLabel"
  );
  const backupDiffNotesEl = resolveElement("backupDiffNotes", "backupDiffNotes");
  const backupDiffExportButtonEl = resolveElement(
    "backupDiffExportButton",
    "backupDiffExport"
  );
  const backupDiffCloseButtonEl = resolveElement(
    "backupDiffCloseButton",
    "backupDiffClose"
  );
  const restoreRehearsalButton = resolveElement(
    "restoreRehearsalButton",
    "restoreRehearsalButton"
  );
  const restoreRehearsalHeading = resolveElement(
    "restoreRehearsalHeading",
    "restoreRehearsalHeading"
  );
  const restoreRehearsalIntro = resolveElement(
    "restoreRehearsalIntro",
    "restoreRehearsalIntro"
  );
  const restoreRehearsalModeLabel = resolveElement(
    "restoreRehearsalModeLabel",
    "restoreRehearsalModeLabel"
  );
  const restoreRehearsalModeBackupText = resolveElement(
    "restoreRehearsalModeBackupText",
    "restoreRehearsalModeBackupText"
  );
  const restoreRehearsalModeProjectText = resolveElement(
    "restoreRehearsalModeProjectText",
    "restoreRehearsalModeProjectText"
  );
  const restoreRehearsalFileLabel = resolveElement(
    "restoreRehearsalFileLabel",
    "restoreRehearsalFileLabel"
  );
  const restoreRehearsalBrowse = resolveElement(
    "restoreRehearsalBrowse",
    "restoreRehearsalBrowse"
  );
  const restoreRehearsalFileName = resolveElement(
    "restoreRehearsalFileName",
    "restoreRehearsalFileName"
  );
  const restoreRehearsalStatus = resolveElement(
    "restoreRehearsalStatus",
    "restoreRehearsalStatus"
  );
  const restoreRehearsalRuleHeading = resolveElement(
    "restoreRehearsalRuleHeading",
    "restoreRehearsalRuleHeading"
  );
  const restoreRehearsalRuleIntro = resolveElement(
    "restoreRehearsalRuleIntro",
    "restoreRehearsalRuleIntro"
  );
  const restoreRehearsalRuleEmpty = resolveElement(
    "restoreRehearsalRuleEmpty",
    "restoreRehearsalRuleEmpty"
  );
  const restoreRehearsalTableCaption = resolveElement(
    "restoreRehearsalTableCaption",
    "restoreRehearsalTableCaption"
  );
  const restoreRehearsalMetricHeader = resolveElement(
    "restoreRehearsalMetricHeader",
    "restoreRehearsalMetricHeader"
  );
  const restoreRehearsalLiveHeader = resolveElement(
    "restoreRehearsalLiveHeader",
    "restoreRehearsalLiveHeader"
  );
  const restoreRehearsalSandboxHeader = resolveElement(
    "restoreRehearsalSandboxHeader",
    "restoreRehearsalSandboxHeader"
  );
  const restoreRehearsalDifferenceHeader = resolveElement(
    "restoreRehearsalDifferenceHeader",
    "restoreRehearsalDifferenceHeader"
  );
  const restoreRehearsalCloseButton = resolveElement(
    "restoreRehearsalCloseButton",
    "restoreRehearsalClose"
  );
  const restoreRehearsalProceedButton = resolveElement(
    "restoreRehearsalProceedButton",
    "restoreRehearsalProceed"
  );
  const restoreRehearsalAbortButton = resolveElement(
    "restoreRehearsalAbortButton",
    "restoreRehearsalAbort"
  );
  if (skipLink) skipLink.textContent = texts[lang].skipToContent;
  const offlineElem = document.getElementById("offlineIndicator");
  if (offlineElem) {
    offlineElem.textContent = texts[lang].offlineIndicator;
    const offlineHelp =
      texts[lang].offlineIndicatorHelp || texts[lang].offlineIndicator;
    offlineElem.setAttribute("data-help", offlineHelp);
  }
  applyInstallTexts(lang);
  const legalLinks = LEGAL_LINKS[lang] || LEGAL_LINKS.en;
  const impressumElem = document.getElementById("impressumLink");
  if (impressumElem) {
    impressumElem.textContent = texts[lang].impressum;
    if (legalLinks?.imprint) {
      impressumElem.setAttribute("href", legalLinks.imprint);
    }
  }
  const privacyElem = document.getElementById("privacyLink");
  if (privacyElem) {
    privacyElem.textContent = texts[lang].privacy;
    if (legalLinks?.privacy) {
      privacyElem.setAttribute("href", legalLinks.privacy);
    }
  }
  // Section headings with descriptive hover help
  const setupManageHeadingElem = document.getElementById("setupManageHeading");
  setupManageHeadingElem.textContent = texts[lang].setupManageHeading;
  setupManageHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupManageHeadingHelp
  );

  const deviceSelectionHeadingElem = document.getElementById("deviceSelectionHeading");
  deviceSelectionHeadingElem.textContent = texts[lang].deviceSelectionHeading;
  deviceSelectionHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceSelectionHeadingHelp
  );

  const resultsHeadingElem = document.getElementById("resultsHeading");
  resultsHeadingElem.textContent = texts[lang].resultsHeading; // Fixed typo here
  resultsHeadingElem.setAttribute(
    "data-help",
    texts[lang].resultsHeadingHelp
  );

  const deviceManagerHeadingElem = document.getElementById("deviceManagerHeading");
  deviceManagerHeadingElem.textContent = texts[lang].deviceManagerHeading;
  deviceManagerHeadingElem.setAttribute(
    "data-help",
    texts[lang].deviceManagerHeadingHelp
  );

  const batteryComparisonHeadingElem = document.getElementById("batteryComparisonHeading");
  batteryComparisonHeadingElem.textContent = texts[lang].batteryComparisonHeading;
  batteryComparisonHeadingElem.setAttribute(
    "data-help",
    texts[lang].batteryComparisonHeadingHelp
  );

  const setupDiagramHeadingElem = document.getElementById("setupDiagramHeading");
  setupDiagramHeadingElem.textContent = texts[lang].setupDiagramHeading;
  setupDiagramHeadingElem.setAttribute(
    "data-help",
    texts[lang].setupDiagramHeadingHelp
  );

  const sideMenuLinks = document.querySelectorAll("#sideMenu [data-nav-key]");
  sideMenuLinks.forEach((link) => {
    const navKey = link.dataset.navKey;
    if (!navKey) {
      return;
    }
    const label = texts[lang][navKey];
    if (label) {
      link.textContent = label;
      link.setAttribute("aria-label", label);
    }
    const helpKey = `${navKey}Help`;
    const helpText = texts[lang][helpKey];
    if (helpText) {
      link.setAttribute("title", helpText);
      link.setAttribute("data-help", helpText);
    } else {
      link.removeAttribute("title");
      link.removeAttribute("data-help");
    }
  });
  // Setup manager labels and buttons
  const savedSetupsLabelElem = document.getElementById("savedSetupsLabel");
  savedSetupsLabelElem.textContent = texts[lang].savedSetupsLabel;
  savedSetupsLabelElem.setAttribute("data-help", texts[lang].setupSelectHelp);
  const setupNameLabelElem = document.getElementById("setupNameLabel");
  setupNameLabelElem.textContent = texts[lang].setupNameLabel;
  setupNameLabelElem.setAttribute("data-help", texts[lang].setupNameHelp);
  setButtonLabelWithIcon(deleteSetupBtn, texts[lang].deleteSetupBtn, ICON_GLYPHS.trash);
  const sharedLinkLabelElem = document.getElementById("sharedLinkLabel");
  sharedLinkLabelElem.textContent = texts[lang].sharedLinkLabel;
  sharedLinkLabelElem.setAttribute("data-help", texts[lang].sharedLinkHelp);
  setButtonLabelWithIcon(
    applySharedLinkBtn,
    texts[lang].loadSharedLinkBtn,
    ICON_GLYPHS.fileImport
  );

  // Descriptive hover help for setup management controls
  setupSelect.setAttribute("data-help", texts[lang].setupSelectHelp);
  setupNameInput.setAttribute("data-help", texts[lang].setupNameHelp);

  deleteSetupBtn.setAttribute("title", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("aria-label", texts[lang].deleteSetupHelp);
  deleteSetupBtn.setAttribute("data-help", texts[lang].deleteSetupHelp);

  saveSetupBtn.setAttribute("title", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("aria-label", texts[lang].saveSetupHelp);
  saveSetupBtn.setAttribute("data-help", texts[lang].saveSetupHelp);

  generateOverviewBtn.setAttribute("title", texts[lang].generateOverviewBtn);
  generateOverviewBtn.setAttribute("data-help", texts[lang].generateOverviewHelp);

  generateGearListBtn.setAttribute("title", texts[lang].generateGearListBtn);
  generateGearListBtn.setAttribute("data-help", texts[lang].generateGearListHelp);

  const deleteGearListHelp =
    texts[lang].deleteGearListBtnHelp || texts[lang].deleteGearListBtn;
  if (deleteGearListProjectBtn) {
    setButtonLabelWithIcon(
      deleteGearListProjectBtn,
      texts[lang].deleteGearListBtn,
      ICON_GLYPHS.trash
    );
    deleteGearListProjectBtn.setAttribute("title", deleteGearListHelp);
    deleteGearListProjectBtn.setAttribute("data-help", deleteGearListHelp);
    deleteGearListProjectBtn.setAttribute("aria-label", deleteGearListHelp);
  }

  const editProjectBtnElem = document.getElementById("editProjectBtn");
  if (editProjectBtnElem) {
    editProjectBtnElem.textContent = texts[lang].editProjectBtn;
    editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
    editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
  }

  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);

  if (shareDialogHeadingElem) {
    const heading = texts[lang].shareDialogTitle
      || texts.en?.shareDialogTitle
      || shareDialogHeadingElem.textContent;
    shareDialogHeadingElem.textContent = heading;
  }

  if (shareFilenameLabelElem) {
    const filenameLabel = texts[lang].shareFilenameLabel
      || texts.en?.shareFilenameLabel
      || shareFilenameLabelElem.textContent;
    shareFilenameLabelElem.textContent = filenameLabel;
  }

  if (shareConfirmBtn) {
    const confirmLabel = texts[lang].shareDialogConfirm
      || texts.en?.shareDialogConfirm
      || shareConfirmBtn.textContent;
    setButtonLabelWithIcon(shareConfirmBtn, confirmLabel, ICON_GLYPHS.fileExport);
    shareConfirmBtn.setAttribute('title', confirmLabel);
    shareConfirmBtn.setAttribute('aria-label', confirmLabel);
    shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
  }

  if (shareCancelBtn) {
    const cancelLabel = texts[lang].shareDialogCancel
      || texts.en?.shareDialogCancel
      || shareCancelBtn.textContent;
    setButtonLabelWithIcon(shareCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
    shareCancelBtn.setAttribute('title', cancelLabel);
    shareCancelBtn.setAttribute('aria-label', cancelLabel);
  }

  if (shareIncludeAutoGearText) {
    const label = texts[lang].shareIncludeAutoGearLabel
      || texts.en?.shareIncludeAutoGearLabel
      || shareIncludeAutoGearText.textContent;
    shareIncludeAutoGearText.textContent = label;
    const help = texts[lang].shareIncludeAutoGearHelp
      || texts.en?.shareIncludeAutoGearHelp
      || label;
    if (shareIncludeAutoGearLabelElem) {
      shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
    }
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
    }
  }

  let sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
  if (sharedImportDialogHeading) {
    const title = texts[lang].sharedImportDialogTitle
      || texts.en?.sharedImportDialogTitle
      || sharedImportDialogHeading.textContent;
    sharedImportDialogHeading.textContent = title;
  }
  if (sharedImportDialogMessage) {
    const message = texts[lang].sharedImportDialogMessage
      || texts.en?.sharedImportDialogMessage
      || sharedImportDialogMessage.textContent;
    sharedImportDialogMessage.textContent = message;
    sharedImportDialogMessage.setAttribute('data-help', message);
  }
  if (sharedImportConfirmBtn) {
    const label = texts[lang].sharedImportDialogConfirm
      || texts.en?.sharedImportDialogConfirm
      || sharedImportConfirmBtn.textContent;
    setButtonLabelWithIcon(sharedImportConfirmBtn, label, ICON_GLYPHS.check);
    sharedImportConfirmBtn.setAttribute('data-help', label);
  }
  if (sharedImportCancelBtn) {
    const label = texts[lang].sharedImportDialogCancel
      || texts.en?.sharedImportDialogCancel
      || sharedImportCancelBtn.textContent;
    setButtonLabelWithIcon(sharedImportCancelBtn, label, ICON_GLYPHS.circleX);
    sharedImportCancelBtn.setAttribute('data-help', label);
  }
  if (sharedImportLegend) {
    const legend = texts[lang].sharedImportAutoGearLabel
      || texts.en?.sharedImportAutoGearLabel
      || sharedImportLegend.textContent;
    sharedImportLegend.textContent = legend;
    sharedImportLegendText = legend;
    if (sharedImportOptions) {
      sharedImportOptions.setAttribute('data-help', legend);
    }
  }
  if (sharedImportModeSelect && sharedImportLegendText) {
    sharedImportModeSelect.setAttribute('aria-label', sharedImportLegendText);
    sharedImportModeSelect.setAttribute('data-help', sharedImportLegendText);
  }
  if (sharedImportModeNoneOption) {
    const label = texts[lang].sharedImportAutoGearNone
      || texts.en?.sharedImportAutoGearNone
      || sharedImportModeNoneOption.textContent;
    sharedImportModeNoneOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearNoneHelp
      || texts.en?.sharedImportAutoGearNoneHelp
      || label;
    sharedImportModeNoneOption.setAttribute('data-help', help);
    sharedImportModeNoneOption.setAttribute('title', help);
    sharedImportModeNoneOption.setAttribute('aria-label', label);
  }
  if (sharedImportModeProjectOption) {
    const label = texts[lang].sharedImportAutoGearProject
      || texts.en?.sharedImportAutoGearProject
      || sharedImportModeProjectOption.textContent;
    sharedImportModeProjectOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearProjectHelp
      || texts.en?.sharedImportAutoGearProjectHelp
      || label;
    sharedImportModeProjectOption.setAttribute('data-help', help);
    sharedImportModeProjectOption.setAttribute('title', help);
    sharedImportModeProjectOption.setAttribute('aria-label', label);
  }
  if (sharedImportModeGlobalOption) {
    const label = texts[lang].sharedImportAutoGearGlobal
      || texts.en?.sharedImportAutoGearGlobal
      || sharedImportModeGlobalOption.textContent;
    sharedImportModeGlobalOption.textContent = label;
    const help = texts[lang].sharedImportAutoGearGlobalHelp
      || texts.en?.sharedImportAutoGearGlobalHelp
      || label;
    sharedImportModeGlobalOption.setAttribute('data-help', help);
    sharedImportModeGlobalOption.setAttribute('title', help);
    sharedImportModeGlobalOption.setAttribute('aria-label', label);
  }

  applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
  applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);

  runtimeFeedbackBtn.setAttribute("title", texts[lang].runtimeFeedbackBtn);
  runtimeFeedbackBtn.setAttribute("data-help", texts[lang].runtimeFeedbackBtnHelp);
  setButtonLabelWithIcon(runtimeFeedbackBtn, texts[lang].runtimeFeedbackBtn, ICON_GLYPHS.feedback);
  // Update the "-- New Setup --" option text
  if (setupSelect.options.length > 0) {
    setupSelect.options[0].textContent = texts[lang].newSetupOption;
  }
  checkSetupChanged();
  // Device selection labels with help
  const cameraLabelElem = document.getElementById("cameraLabel");
  cameraLabelElem.textContent = texts[lang].cameraLabel;
  cameraLabelElem.setAttribute("data-help", texts[lang].cameraSelectHelp);

  const monitorLabelElem = document.getElementById("monitorLabel");
  monitorLabelElem.textContent = texts[lang].monitorLabel;
  monitorLabelElem.setAttribute("data-help", texts[lang].monitorSelectHelp);

  const videoLabelElem = document.getElementById("videoLabel");
  videoLabelElem.textContent = texts[lang].videoLabel;
  videoLabelElem.setAttribute("data-help", texts[lang].videoSelectHelp);

  const cageLabelElem = document.getElementById("cageLabel");
  if (cageLabelElem) {
    cageLabelElem.textContent = texts[lang].cageLabel;
    cageLabelElem.setAttribute("data-help", texts[lang].cageSelectHelp);
  }

  const distanceLabelElem = document.getElementById("distanceLabel");
  distanceLabelElem.textContent = texts[lang].distanceLabel;
  distanceLabelElem.setAttribute("data-help", texts[lang].distanceSelectHelp);

  const batteryPlateLabelElem = document.getElementById("batteryPlateLabel");
  batteryPlateLabelElem.textContent = texts[lang].batteryPlateLabel;
  batteryPlateLabelElem.setAttribute("data-help", texts[lang].batteryPlateSelectHelp);

  const batteryHotswapLabelElem = document.getElementById("batteryHotswapLabel");
  if (batteryHotswapLabelElem) {
    batteryHotswapLabelElem.textContent = texts[lang].batteryHotswapLabel;
    batteryHotswapLabelElem.setAttribute("data-help", texts[lang].batteryHotswapSelectHelp);
  }

  updateBatteryLabel();
  // FIZ legend and labels
  const fizLegendElem = document.getElementById("fizLegend");
  if (fizLegendElem) {
    fizLegendElem.textContent = texts[lang].fizLegend;
    fizLegendElem.setAttribute("data-help", texts[lang].fizLegendHelp);
  }
  const fizMotorsLabelElem = document.getElementById("fizMotorsLabel");
  if (fizMotorsLabelElem) {
    fizMotorsLabelElem.textContent = texts[lang].fizMotorsLabel;
    fizMotorsLabelElem.setAttribute("data-help", texts[lang].fizMotorsHelp);
  }
  const fizControllersLabelElem = document.getElementById("fizControllersLabel");
  if (fizControllersLabelElem) {
    fizControllersLabelElem.textContent = texts[lang].fizControllersLabel;
    fizControllersLabelElem.setAttribute(
      "data-help",
      texts[lang].fizControllersHelp
    );
  }
  document
    .querySelectorAll('#motorNotesLabel,#controllerNotesLabel,#distanceNotesLabel')
    .forEach(el => {
      el.textContent = texts[lang].notesLabel;
    });
  // Results labels
  const breakdownListTarget =
    typeof breakdownListElem !== "undefined" && breakdownListElem
      ? breakdownListElem
      : document.getElementById('breakdownList');
  if (breakdownListTarget) {
    breakdownListTarget.setAttribute("data-help", texts[lang].breakdownListHelp);
  }

  const totalPowerLabelElem = document.getElementById("totalPowerLabel");
  totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
  totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);

  refreshTotalCurrentLabels(lang);
  updateMountVoltageSettingLabels(lang);

  const batteryCountLabelElem = document.getElementById("batteryCountLabel");
  batteryCountLabelElem.textContent = texts[lang].batteryCountLabel;
  batteryCountLabelElem.setAttribute(
    "data-help",
    texts[lang].batteryCountHelp
  );

  if (pinWarnElem)
    pinWarnElem.setAttribute("data-help", texts[lang].pinWarningHelp);
  if (dtapWarnElem)
    dtapWarnElem.setAttribute("data-help", texts[lang].dtapWarningHelp);
  if (hotswapWarnElem)
    hotswapWarnElem.setAttribute("data-help", texts[lang].hotswapWarningHelp);
  if (powerWarningTitleElem)
    powerWarningTitleElem.textContent = texts[lang].powerWarningTitle;
  if (powerWarningLimitsHeadingElem)
    powerWarningLimitsHeadingElem.textContent = texts[lang].powerWarningLimitsHeading;
  if (powerWarningAdviceElem)
    powerWarningAdviceElem.textContent = texts[lang].powerWarningAdvice;
  if (powerWarningCloseBtn)
    setButtonLabelWithIcon(powerWarningCloseBtn, texts[lang].powerWarningClose, ICON_GLYPHS.check);
  const unitElem = document.getElementById("batteryLifeUnit");
  if (unitElem) unitElem.textContent = texts[lang].batteryLifeUnit;
  const fb = renderFeedbackTable(getCurrentSetupKey());
  if (batteryLifeLabelElem) {
    let label = texts[lang].batteryLifeLabel;
    if (fb) {
      const userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
      const idx = label.indexOf(')');
      if (idx !== -1) {
        label = `${label.slice(0, idx)}, ${userNote}${label.slice(idx)}`;
      }
    }
    batteryLifeLabelElem.textContent = label;
    batteryLifeLabelElem.setAttribute(
      "data-help",
      texts[lang].batteryLifeHelp
    );
  }
  if (runtimeAverageNoteElem) {
    runtimeAverageNoteElem.textContent =
      fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
  }
  dispatchTemperatureNoteRender(lastRuntimeHours);
  refreshFeedbackTemperatureLabel(lang, temperatureUnit);
  updateFeedbackTemperatureOptions(lang, temperatureUnit);
  const tempNoteElem = document.getElementById("temperatureNote");
  if (tempNoteElem)
    tempNoteElem.setAttribute("data-help", texts[lang].temperatureNoteHelp);
  // Add device form labels and button
  document.getElementById("addDeviceHeading").textContent = texts[lang].addDeviceHeading;
  document.getElementById("categoryLabel").textContent = texts[lang].categoryLabel;
  document.getElementById("subcategoryLabel").textContent = texts[lang].subcategoryLabel;
  document.getElementById("deviceNameLabel").textContent = texts[lang].deviceNameLabel;
  document.getElementById("consumptionLabel").textContent = texts[lang].consumptionLabel;
  document.getElementById("capacityLabel").textContent = texts[lang].capacityLabel;
  document.getElementById("pinLabel").textContent = texts[lang].pinLabel;
  document.getElementById("dtapLabel").textContent = texts[lang].dtapLabel;
  document.getElementById("cameraWattLabel").textContent = texts[lang].cameraWattLabel;
  document.getElementById("cameraVoltageLabel").textContent = texts[lang].cameraVoltageLabel;
  document.getElementById("cameraPortTypeLabel").textContent = texts[lang].cameraPortTypeLabel;
  document.getElementById("cameraPlatesLabel").textContent = texts[lang].cameraPlatesLabel;
  document.getElementById("cameraMediaLabel").textContent = texts[lang].cameraMediaLabel;
  document.getElementById("cameraLensMountLabel").textContent = texts[lang].cameraLensMountLabel;
  document.getElementById("cameraPowerDistLabel").textContent = texts[lang].powerDistributionLabel;
  document.getElementById("cameraVideoOutputsLabel").textContent = texts[lang].videoOutputsLabel;
  document.getElementById("cameraFIZConnectorLabel").textContent = texts[lang].fizConnectorLabel;
  document.getElementById("cameraViewfinderLabel").textContent = texts[lang].viewfinderLabel;
  document.getElementById("cameraTimecodeLabel").textContent = texts[lang].timecodeLabel;
  document.getElementById("powerInputsHeading").textContent = texts[lang].powerInputsHeading;
  document.getElementById("powerDistributionHeading").textContent = texts[lang].powerDistributionHeading;
  document.getElementById("videoOutputsHeading").textContent = texts[lang].videoOutputsHeading;
  document.getElementById("fizConnectorHeading").textContent = texts[lang].fizConnectorHeading;
  document.getElementById("mediaHeading").textContent = texts[lang].mediaHeading;
  document.getElementById("viewfinderHeading").textContent = texts[lang].viewfinderHeading;
  document.getElementById("lensMountHeading").textContent = texts[lang].lensMountHeading;
  document.getElementById("timecodeHeading").textContent = texts[lang].timecodeHeading;
  document.getElementById("monitorScreenSizeLabel").textContent = texts[lang].monitorScreenSizeLabel;
  document.getElementById("monitorBrightnessLabel").textContent = texts[lang].monitorBrightnessLabel;
  document.getElementById("monitorWattLabel").textContent = texts[lang].monitorWattLabel;
  document.getElementById("monitorVoltageLabel").textContent = texts[lang].monitorVoltageLabel;
  document.getElementById("monitorPortTypeLabel").textContent = texts[lang].monitorPortTypeLabel;
  document.getElementById("monitorVideoInputsHeading").textContent = texts[lang].monitorVideoInputsHeading;
  document.getElementById("monitorVideoOutputsHeading").textContent = texts[lang].monitorVideoOutputsHeading;
  document.getElementById("monitorVideoInputsLabel").textContent = texts[lang].monitorVideoInputsLabel;
  document.getElementById("monitorVideoOutputsLabel").textContent = texts[lang].monitorVideoOutputsLabel;
  document.getElementById("monitorWirelessTxLabel").textContent = texts[lang].monitorWirelessTxLabel;
  document.getElementById("monitorLatencyLabel").textContent = texts[lang].monitorLatencyLabel;
  document.getElementById("monitorAudioOutputLabel").textContent = texts[lang].monitorAudioOutputLabel;
  document.getElementById("viewfinderDetailsHeading").textContent = texts[lang].viewfinderDetailsHeading;
  document.getElementById("viewfinderScreenSizeLabel").textContent = texts[lang].viewfinderScreenSizeLabel;
  document.getElementById("viewfinderBrightnessLabel").textContent = texts[lang].viewfinderBrightnessLabel;
  document.getElementById("viewfinderWattLabel").textContent = texts[lang].viewfinderWattLabel;
  document.getElementById("viewfinderVoltageLabel").textContent = texts[lang].viewfinderVoltageLabel;
  document.getElementById("viewfinderPortTypeLabel").textContent = texts[lang].viewfinderPortTypeLabel;
  document.getElementById("viewfinderVideoInputsHeading").textContent = texts[lang].viewfinderVideoInputsHeading;
  document.getElementById("viewfinderVideoOutputsHeading").textContent = texts[lang].viewfinderVideoOutputsHeading;
  document.getElementById("viewfinderVideoInputsLabel").textContent = texts[lang].viewfinderVideoInputsLabel;
  document.getElementById("viewfinderVideoOutputsLabel").textContent = texts[lang].viewfinderVideoOutputsLabel;
  document.getElementById("viewfinderWirelessTxLabel").textContent = texts[lang].viewfinderWirelessTxLabel;
  document.getElementById("viewfinderLatencyLabel").textContent = texts[lang].viewfinderLatencyLabel;
  document.getElementById("videoVideoInputsHeading").textContent = texts[lang].videoVideoInputsHeading;
  document.getElementById("videoVideoInputsLabel").textContent = texts[lang].videoVideoInputsLabel;
  document.getElementById("videoVideoOutputsHeading").textContent = texts[lang].videoVideoOutputsHeading;
  document.getElementById("videoVideoOutputsLabel").textContent = texts[lang].videoVideoOutputsLabel;
  document.getElementById("monitorDetailsHeading").textContent = texts[lang].monitorDetailsHeading;
  document.getElementById("monitorPowerHeading").textContent = texts[lang].monitorPowerHeading;
  // Determine text for Add/Update button
  const addDeviceLabel = texts[lang].addDeviceBtn;
  const updateDeviceLabel = texts[lang].updateDeviceBtn;
  if (addDeviceBtn.dataset.mode === "edit") {
    setButtonLabelWithIcon(addDeviceBtn, updateDeviceLabel, ICON_GLYPHS.save);
    addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
  } else {
    setButtonLabelWithIcon(addDeviceBtn, addDeviceLabel, ICON_GLYPHS.add);
    addDeviceBtn.setAttribute('data-help', texts[lang].addDeviceBtnHelp);
  }
  setButtonLabelWithIcon(cancelEditBtn, texts[lang].cancelEditBtn, ICON_GLYPHS.circleX);
  cancelEditBtn.setAttribute('data-help', texts[lang].cancelEditBtnHelp);
  setButtonLabelWithIcon(exportBtn, texts[lang].exportDataBtn, ICON_GLYPHS.fileExport);
  exportBtn.setAttribute('data-help', texts[lang].exportDataBtnHelp);
  setButtonLabelWithIcon(importDataBtn, texts[lang].importDataBtn, ICON_GLYPHS.fileImport);
  importDataBtn.setAttribute('data-help', texts[lang].importDataBtnHelp);
  // Placeholders for inputs
  setupNameInput.placeholder = texts[lang].setupNameLabel.replace(":", "");
  newNameInput.placeholder = texts[lang].placeholder_deviceName;
  newWattInput.placeholder = texts[lang].placeholder_watt;
  newCapacityInput.placeholder = texts[lang].placeholder_capacity;
  newPinAInput.placeholder = texts[lang].placeholder_pin;
  newDtapAInput.placeholder = texts[lang].placeholder_dtap;
  cameraVoltageInput.placeholder = texts[lang].placeholder_voltage;
  monitorVoltageInput.placeholder = texts[lang].placeholder_voltage;
  updateDeviceManagerLocalization(lang);
  // Toggle device manager button text (depends on current visibility)
  if (deviceManagerSection.classList.contains('hidden')) {
    setButtonLabelWithIcon(toggleDeviceBtn, texts[lang].toggleDeviceManager, ICON_GLYPHS.gears);
    toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "false");
  } else {
    setButtonLabelWithIcon(toggleDeviceBtn, texts[lang].hideDeviceManager, ICON_GLYPHS.minus);
    toggleDeviceBtn.setAttribute("title", texts[lang].hideDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].hideDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "true");
  }
  // Update newCategory select option texts
  Array.from(newCategorySelect.options).forEach(opt => {
    opt.textContent = getCategoryLabel(opt.value, lang);
  });
  // Update "None" option text in all dropdowns
  const noneMap = { de: "Keine Auswahl", es: "Ninguno", fr: "Aucun" };
  document.querySelectorAll('select option[value="None"]').forEach(opt => {
    opt.textContent = noneMap[lang] || "None";
  });
  // Save language preference
  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language to localStorage", e);
  }
  // Recalculate and update dynamic content (results, breakdown, battery comparison)
  refreshDeviceLists(); // Call refreshDeviceLists to update Edit/Delete buttons in the list
  applyFilters();
  updateCalculations();

  const existingDevicesHeading =
    typeof document !== 'undefined'
      ? document.getElementById('existingDevicesHeading')
      : null;
  if (existingDevicesHeading) {
    existingDevicesHeading.textContent = texts[lang].existingDevicesHeading;
  }
  if (darkModeToggle) {
    darkModeToggle.setAttribute("title", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute("aria-label", texts[lang].darkModeLabel);
    darkModeToggle.setAttribute(
      "data-help",
      texts[lang].darkModeHelp || texts[lang].darkModeLabel
    );
  }
  if (pinkModeToggle) {
    pinkModeToggle.setAttribute("title", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute("aria-label", texts[lang].pinkModeLabel);
    pinkModeToggle.setAttribute(
      "data-help",
      texts[lang].pinkModeHelp || texts[lang].pinkModeLabel
    );
  }
  if (settingsButton) {
    settingsButton.setAttribute("title", texts[lang].settingsButton);
    settingsButton.setAttribute("aria-label", texts[lang].settingsButton);
    settingsButton.setAttribute(
      "data-help",
      texts[lang].settingsButtonHelp || texts[lang].settingsButton
    );
  }
  const settingsTitleElem = document.getElementById("settingsTitle");
  if (settingsTitleElem) {
    settingsTitleElem.textContent = texts[lang].settingsHeading;
    settingsTitleElem.setAttribute(
      "data-help",
      texts[lang].settingsHeadingHelp || texts[lang].settingsHeading
    );
  }
  if (settingsTablist) {
    const sectionsLabel =
      texts[lang].settingsSectionsLabel ||
      texts.en?.settingsSectionsLabel ||
      settingsTablist.getAttribute('aria-label') ||
      texts[lang].settingsHeading ||
      'Settings sections';
    settingsTablist.setAttribute('aria-label', sectionsLabel);
  }
  const getSettingsTabLabelText = button => {
    if (!button || typeof button !== 'object') return '';
    const labelNode = button.querySelector?.('.settings-tab-label');
    if (labelNode && typeof labelNode.textContent === 'string') {
      const trimmed = labelNode.textContent.trim();
      if (trimmed) return trimmed;
    }
    return typeof button.textContent === 'string' ? button.textContent.trim() : '';
  };
  const summarizeSettingsTabHelp = helpText => {
    if (typeof helpText !== 'string') return '';
    const trimmed = helpText.trim();
    if (!trimmed) return '';
    const sentenceMatch = trimmed.match(/^[^.!?。！？]*[.!?。！？]/u);
    if (sentenceMatch && sentenceMatch[0]) {
      const sentence = sentenceMatch[0].trim();
      if (sentence.length >= 24 || trimmed.length <= 90) {
        return sentence;
      }
    }
    if (trimmed.length <= 90) return trimmed;
    const truncated = trimmed.slice(0, 90);
    let cutIndex = truncated.length;
    while (cutIndex > 0 && truncated[cutIndex - 1] && truncated[cutIndex - 1].trim() !== '') {
      cutIndex -= 1;
    }
    const safeCut = cutIndex > 0 ? truncated.slice(0, cutIndex).trimEnd() : '';
    return `${safeCut || truncated.trim()}…`;
  };
  const applySettingsTabLabel = (button, labelValue, helpValue) => {
    if (!button) return;
    const label = (labelValue || getSettingsTabLabelText(button) || '').trim();
    const labelElement = button.querySelector?.('.settings-tab-label');
    if (labelElement) {
      labelElement.textContent = label;
    } else {
      button.textContent = label;
    }
    if (label) {
      button.setAttribute('aria-label', label);
    } else {
      button.removeAttribute('aria-label');
    }
    const help = (helpValue || label || '').trim();
    if (help) {
      button.setAttribute('data-help', help);
      button.setAttribute('title', help);
    } else {
      button.removeAttribute('data-help');
      button.removeAttribute('title');
    }
    const summary = summarizeSettingsTabHelp(help);
    if (summary) {
      button.setAttribute('data-summary', summary);
    } else {
      button.removeAttribute('data-summary');
    }
    const captionElement = button.querySelector?.('.settings-tab-caption');
    if (captionElement) {
      const captionText = summary || label;
      captionElement.textContent = captionText;
      if (captionText) {
        captionElement.removeAttribute('hidden');
      } else {
        captionElement.setAttribute('hidden', '');
      }
    }
  };
  if (settingsTabGeneral) {
    const generalLabel =
      texts[lang].settingsTabGeneral ||
      texts.en?.settingsTabGeneral ||
      getSettingsTabLabelText(settingsTabGeneral) ||
      'General';
    const generalHelp =
      texts[lang].settingsTabGeneralHelp ||
      texts.en?.settingsTabGeneralHelp ||
      texts[lang].settingsHeadingHelp ||
      generalLabel;
    applySettingsTabLabel(settingsTabGeneral, generalLabel, generalHelp);
    if (generalSettingsHeading) {
      generalSettingsHeading.textContent = generalLabel;
      generalSettingsHeading.setAttribute('data-help', generalHelp);
    }
    if (generalLanguageHeading) {
      const sectionHeading =
        texts[lang].generalSectionLanguageHeading ||
        texts.en?.generalSectionLanguageHeading ||
        generalLanguageHeading.textContent;
      generalLanguageHeading.textContent = sectionHeading;
    }
    if (generalAppearanceHeading) {
      const sectionHeading =
        texts[lang].generalSectionAppearanceHeading ||
        texts.en?.generalSectionAppearanceHeading ||
        generalAppearanceHeading.textContent;
      generalAppearanceHeading.textContent = sectionHeading;
    }
    if (generalTypographyHeading) {
      const sectionHeading =
        texts[lang].generalSectionTypographyHeading ||
        texts.en?.generalSectionTypographyHeading ||
        generalTypographyHeading.textContent;
      generalTypographyHeading.textContent = sectionHeading;
    }
    if (generalBrandingHeading) {
      const sectionHeading =
        texts[lang].generalSectionBrandingHeading ||
        texts.en?.generalSectionBrandingHeading ||
        generalBrandingHeading.textContent;
      generalBrandingHeading.textContent = sectionHeading;
    }
  }
  applySettingsTabLabel(
    settingsTabAutoGear,
    texts[lang].settingsTabAutoGear ||
      texts.en?.settingsTabAutoGear ||
      texts[lang].autoGearHeading ||
      texts.en?.autoGearHeading,
    texts[lang].settingsTabAutoGearHelp ||
      texts.en?.settingsTabAutoGearHelp ||
      texts[lang].autoGearHeadingHelp ||
      texts.en?.autoGearHeadingHelp
  );
  applySettingsTabLabel(
    settingsTabAccessibility,
    texts[lang].settingsTabAccessibility ||
      texts.en?.settingsTabAccessibility ||
      texts[lang].accessibilityHeading ||
      texts.en?.accessibilityHeading,
    texts[lang].settingsTabAccessibilityHelp ||
      texts.en?.settingsTabAccessibilityHelp ||
      texts[lang].accessibilityHeadingHelp ||
      texts.en?.accessibilityHeadingHelp
  );
  applySettingsTabLabel(
    settingsTabBackup,
    texts[lang].settingsTabBackup ||
      texts.en?.settingsTabBackup ||
      texts[lang].backupHeading ||
      texts.en?.backupHeading,
    texts[lang].settingsTabBackupHelp ||
      texts.en?.settingsTabBackupHelp ||
      texts[lang].backupHeadingHelp ||
      texts.en?.backupHeadingHelp
  );
  applySettingsTabLabel(
    settingsTabData,
    texts[lang].settingsTabData ||
      texts.en?.settingsTabData ||
      texts[lang].dataHeading ||
      texts.en?.dataHeading,
    texts[lang].settingsTabDataHelp ||
      texts.en?.settingsTabDataHelp ||
      texts[lang].dataHeadingHelp ||
      texts.en?.dataHeadingHelp
  );
  applySettingsTabLabel(
    settingsTabAbout,
    texts[lang].settingsTabAbout ||
      texts.en?.settingsTabAbout ||
      texts[lang].aboutHeading ||
      texts.en?.aboutHeading,
    texts[lang].settingsTabAboutHelp ||
      texts.en?.settingsTabAboutHelp ||
      texts[lang].aboutHeadingHelp ||
      texts.en?.aboutHeadingHelp
  );
  const settingsLanguageLabel = document.getElementById("settingsLanguageLabel");
  if (settingsLanguageLabel) {
    settingsLanguageLabel.textContent = texts[lang].languageSetting;
    const languageHelp =
      texts[lang].settingsLanguageHelp || texts[lang].languageSetting;
    settingsLanguageLabel.setAttribute("data-help", languageHelp);
    if (settingsLanguage) {
      settingsLanguage.setAttribute("data-help", languageHelp);
      settingsLanguage.setAttribute("aria-label", texts[lang].languageSetting);
    }
  }
  const settingsDarkLabel = document.getElementById("settingsDarkModeLabel");
  if (settingsDarkLabel) {
    settingsDarkLabel.textContent = texts[lang].darkModeSetting;
    const darkModeHelp =
      texts[lang].settingsDarkModeHelp || texts[lang].darkModeSetting;
    settingsDarkLabel.setAttribute("data-help", darkModeHelp);
    if (settingsDarkMode) {
      settingsDarkMode.setAttribute("data-help", darkModeHelp);
      settingsDarkMode.setAttribute("aria-label", texts[lang].darkModeSetting);
    }
  }
  const settingsPinkLabel = document.getElementById("settingsPinkModeLabel");
  if (settingsPinkLabel) {
    settingsPinkLabel.textContent = texts[lang].pinkModeSetting;
    const pinkModeHelp =
      texts[lang].settingsPinkModeHelp || texts[lang].pinkModeSetting;
    settingsPinkLabel.setAttribute("data-help", pinkModeHelp);
    if (settingsPinkMode) {
      settingsPinkMode.setAttribute("data-help", pinkModeHelp);
      settingsPinkMode.setAttribute("aria-label", texts[lang].pinkModeSetting);
    }
  }
  const accentLabel = document.getElementById("accentColorLabel");
  const accentHelp = texts[lang].accentColorHelp || texts[lang].accentColorSetting;
  if (accentLabel) {
    accentLabel.textContent = texts[lang].accentColorSetting;
    accentLabel.setAttribute("data-help", accentHelp);
  }
  if (accentColorInput) {
    accentColorInput.setAttribute("data-help", accentHelp);
    accentColorInput.setAttribute("aria-label", texts[lang].accentColorSetting);
  }
  if (accentColorResetButton) {
    const accentResetLabel =
      (texts[lang] && texts[lang].accentColorReset) ||
      (texts.en && texts.en.accentColorReset) ||
      accentColorResetButton.textContent ||
      'Reset to default';
    const accentResetHelp =
      (texts[lang] && texts[lang].accentColorResetHelp) || accentHelp;
    accentColorResetButton.textContent = accentResetLabel;
    accentColorResetButton.setAttribute('data-help', accentResetHelp);
    accentColorResetButton.setAttribute('aria-label', accentResetHelp);
    accentColorResetButton.setAttribute('title', accentResetHelp);
  }
  const settingsTemperatureUnitLabel = document.getElementById('settingsTemperatureUnitLabel');
  if (settingsTemperatureUnitLabel) {
    settingsTemperatureUnitLabel.textContent = texts[lang].temperatureUnitSetting;
    const tempUnitHelp =
      texts[lang].temperatureUnitSettingHelp || texts[lang].temperatureUnitSetting;
    settingsTemperatureUnitLabel.setAttribute('data-help', tempUnitHelp);
    if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
      settingsTemperatureUnit.setAttribute('data-help', tempUnitHelp);
      settingsTemperatureUnit.setAttribute('aria-label', texts[lang].temperatureUnitSetting);
      Array.from(settingsTemperatureUnit.options || []).forEach(option => {
        if (!option) return;
        const normalized = normalizeTemperatureUnit(option.value);
        option.textContent = getTemperatureUnitLabelForLang(lang, normalized);
      });
      settingsTemperatureUnit.value = temperatureUnit;
    }
  }
  const fontSizeLabel = document.getElementById("settingsFontSizeLabel");
  if (fontSizeLabel) {
    fontSizeLabel.textContent = texts[lang].fontSizeSetting;
    const sizeHelp =
      texts[lang].fontSizeSettingHelp || texts[lang].fontSizeSetting;
    fontSizeLabel.setAttribute("data-help", sizeHelp);
    if (settingsFontSize) {
      settingsFontSize.setAttribute("data-help", sizeHelp);
      settingsFontSize.setAttribute("aria-label", texts[lang].fontSizeSetting);
    }
  }
  const fontFamilyLabel = document.getElementById("settingsFontFamilyLabel");
  if (fontFamilyLabel) {
    fontFamilyLabel.textContent = texts[lang].fontFamilySetting;
    const familyHelp =
      texts[lang].fontFamilySettingHelp || texts[lang].fontFamilySetting;
    fontFamilyLabel.setAttribute("data-help", familyHelp);
    if (settingsFontFamily) {
      settingsFontFamily.setAttribute("data-help", familyHelp);
      settingsFontFamily.setAttribute("aria-label", texts[lang].fontFamilySetting);
    }
  }
  if (localFontsButton) {
    const localFontsHelp =
      texts[lang].localFontsButtonHelp || localFontsButton.textContent;
    localFontsButton.setAttribute("data-help", localFontsHelp);
    localFontsButton.setAttribute("title", localFontsHelp);
    localFontsButton.setAttribute("aria-label", localFontsHelp);
  }
  if (bundledFontGroup) {
    const builtInLabel =
      (texts[lang] && texts[lang].bundledFontsGroup) ||
      (texts.en && texts.en.bundledFontsGroup) ||
      bundledFontGroup.label;
    if (builtInLabel) bundledFontGroup.label = builtInLabel;
  }
  if (localFontsGroup) {
    const localLabel =
      (texts[lang] && texts[lang].localFontsGroup) ||
      (texts.en && texts.en.localFontsGroup) ||
      localFontsGroup.label;
    if (localLabel) localFontsGroup.label = localLabel;
  }
  if (localFontsButton) {
    const localFontsLabel =
      (texts[lang] && texts[lang].localFontsButton) ||
      (texts.en && texts.en.localFontsButton) ||
      localFontsButton.textContent;
    if (localFontsLabel) {
      setButtonLabelWithIcon(localFontsButton, localFontsLabel, ICON_GLYPHS.add);
      localFontsButton.setAttribute('aria-label', localFontsLabel);
      localFontsButton.setAttribute('title', localFontsLabel);
    }
  }
  if (localFontsStatus && localFontsStatus.dataset.statusKey) {
    const statusKey = localFontsStatus.dataset.statusKey;
    const arg = localFontsStatus.dataset.statusArg;
    let template =
      (texts[lang] && texts[lang][statusKey]) ||
      (texts.en && texts.en[statusKey]) ||
      '';
    if (template && arg !== undefined && arg !== null) {
      template = template.replace('%s', arg);
    } else if (!template && arg !== undefined && arg !== null) {
      template = arg;
    }
    localFontsStatus.textContent = template;
  }
  const settingsLogoLabel = document.getElementById("settingsLogoLabel");
  if (settingsLogoLabel) {
    settingsLogoLabel.textContent = texts[lang].logoSetting;
    const logoHelp = texts[lang].logoSettingHelp || texts[lang].logoSetting;
    settingsLogoLabel.setAttribute("data-help", logoHelp);
    if (settingsLogo) {
      settingsLogo.setAttribute("data-help", logoHelp);
      settingsLogo.setAttribute("aria-label", texts[lang].logoSetting);
    }
  }
  if (autoGearHeadingElem) {
    autoGearHeadingElem.textContent = texts[lang].autoGearHeading || texts.en?.autoGearHeading || 'Automatic Gear Rules';
    const headingHelp = texts[lang].autoGearHeadingHelp || texts.en?.autoGearHeadingHelp;
    if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
  }
  if (autoGearDescriptionElem) {
    autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || texts.en?.autoGearDescription || '';
  }
  if (autoGearMonitorDefaultsHeading) {
    const heading = texts[lang].autoGearMonitorDefaultsHeading
      || texts.en?.autoGearMonitorDefaultsHeading
      || autoGearMonitorDefaultsHeading.textContent;
    autoGearMonitorDefaultsHeading.textContent = heading;
  }
  if (autoGearMonitorDefaultsDescription) {
    const description = texts[lang].autoGearMonitorDefaultsDescription
      || texts.en?.autoGearMonitorDefaultsDescription
      || autoGearMonitorDefaultsDescription.textContent;
    autoGearMonitorDefaultsDescription.textContent = description;
  }
  autoGearMonitorDefaultControls.forEach(control => {
    if (!control) return;
    const labelKey = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS[control.key];
    const labelText = labelKey
      ? texts[lang][labelKey]
        || texts.en?.[labelKey]
        || control.label?.textContent
      : control.label?.textContent;
    if (control.label && labelText) {
      control.label.textContent = labelText;
      control.label.setAttribute('data-help', labelText);
    }
    if (control.select && labelText) {
      control.select.setAttribute('aria-label', labelText);
      control.select.setAttribute('data-help', labelText);
    }
  });
    callCoreFunctionIfAvailable('updateAutoGearMonitorDefaultOptions', [], { defer: true });
    callCoreFunctionIfAvailable('renderAutoGearMonitorDefaultsControls', [], { defer: true });
  if (autoGearPresetDescription) {
    autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription
      || texts.en?.autoGearPresetDescription
      || '';
  }
  if (autoGearPresetLabel) {
    const label = texts[lang].autoGearPresetLabel
      || texts.en?.autoGearPresetLabel
      || autoGearPresetLabel.textContent;
    const help = texts[lang].autoGearPresetDescription
      || texts.en?.autoGearPresetDescription
      || label;
    autoGearPresetLabel.textContent = label;
    autoGearPresetLabel.setAttribute('data-help', help);
    if (autoGearPresetSelect) {
      autoGearPresetSelect.setAttribute('aria-label', label);
      autoGearPresetSelect.setAttribute('data-help', help);
    }
  }
  if (autoGearSavePresetButton) {
    const label = texts[lang].autoGearSavePresetButton
      || texts.en?.autoGearSavePresetButton
      || autoGearSavePresetButton.textContent;
    setButtonLabelWithIcon(autoGearSavePresetButton, label, ICON_GLYPHS.save);
    autoGearSavePresetButton.setAttribute('data-help', label);
    autoGearSavePresetButton.setAttribute('aria-label', label);
  }
  if (autoGearDeletePresetButton) {
    const label = texts[lang].autoGearDeletePresetButton
      || texts.en?.autoGearDeletePresetButton
      || autoGearDeletePresetButton.textContent;
    setButtonLabelWithIcon(autoGearDeletePresetButton, label, ICON_GLYPHS.trash);
    autoGearDeletePresetButton.setAttribute('data-help', label);
    autoGearDeletePresetButton.setAttribute('aria-label', label);
  }
  if (autoGearAddRuleBtn) {
    const label = texts[lang].autoGearAddRule || texts.en?.autoGearAddRule || autoGearAddRuleBtn.textContent;
    setButtonLabelWithIcon(autoGearAddRuleBtn, label, ICON_GLYPHS.add);
    const help = texts[lang].autoGearHeadingHelp || texts.en?.autoGearHeadingHelp || label;
    autoGearAddRuleBtn.setAttribute('data-help', help);
  }
  if (autoGearResetFactoryButton) {
    const label = texts[lang].autoGearResetFactoryButton
      || texts.en?.autoGearResetFactoryButton
      || autoGearResetFactoryButton.textContent;
    const help = texts[lang].autoGearResetFactoryHelp
      || texts.en?.autoGearResetFactoryHelp
      || label;
    setButtonLabelWithIcon(autoGearResetFactoryButton, label, ICON_GLYPHS.reload);
    autoGearResetFactoryButton.setAttribute('data-help', help);
    autoGearResetFactoryButton.setAttribute('title', help);
    autoGearResetFactoryButton.setAttribute('aria-label', label);
  }
  if (autoGearExportButton) {
    const label = texts[lang].autoGearExportButton
      || texts.en?.autoGearExportButton
      || autoGearExportButton.textContent;
    const help = texts[lang].autoGearExportHelp
      || texts.en?.autoGearExportHelp
      || label;
    setButtonLabelWithIcon(autoGearExportButton, label, ICON_GLYPHS.fileExport);
    autoGearExportButton.setAttribute('data-help', help);
    autoGearExportButton.setAttribute('title', help);
    autoGearExportButton.setAttribute('aria-label', label);
  }
  if (autoGearImportButton) {
    const label = texts[lang].autoGearImportButton
      || texts.en?.autoGearImportButton
      || autoGearImportButton.textContent;
    const help = texts[lang].autoGearImportHelp
      || texts.en?.autoGearImportHelp
      || label;
    setButtonLabelWithIcon(autoGearImportButton, label, ICON_GLYPHS.fileImport);
    autoGearImportButton.setAttribute('data-help', help);
    autoGearImportButton.setAttribute('title', help);
    autoGearImportButton.setAttribute('aria-label', label);
  }
  if (autoGearSearchLabel) {
    const label = texts[lang].autoGearSearchLabel
      || texts.en?.autoGearSearchLabel
      || autoGearSearchLabel.textContent;
    const help = texts[lang].autoGearSearchHelp
      || texts.en?.autoGearSearchHelp
      || label;
    autoGearSearchLabel.textContent = label;
    autoGearSearchLabel.setAttribute('data-help', help);
    if (autoGearSearchInput) {
      const placeholder = texts[lang].autoGearSearchPlaceholder
        || texts.en?.autoGearSearchPlaceholder
        || autoGearSearchInput.getAttribute('placeholder')
        || '';
      autoGearSearchInput.setAttribute('placeholder', placeholder);
      autoGearSearchInput.setAttribute('aria-label', label);
      autoGearSearchInput.setAttribute('data-help', help);
    }
  }
  if (autoGearFilterScenarioLabel) {
    const label = texts[lang].autoGearFilterScenarioLabel
      || texts.en?.autoGearFilterScenarioLabel
      || autoGearFilterScenarioLabel.textContent;
    const help = texts[lang].autoGearFilterScenarioHelp
      || texts.en?.autoGearFilterScenarioHelp
      || label;
    autoGearFilterScenarioLabel.textContent = label;
    autoGearFilterScenarioLabel.setAttribute('data-help', help);
    if (autoGearFilterScenarioSelect) {
      autoGearFilterScenarioSelect.setAttribute('aria-label', label);
      autoGearFilterScenarioSelect.setAttribute('data-help', help);
    }
  }
  if (autoGearFilterClearButton) {
    const label = texts[lang].autoGearFilterClear
      || texts.en?.autoGearFilterClear
      || autoGearFilterClearButton.textContent;
    setButtonLabelWithIcon(autoGearFilterClearButton, label, ICON_GLYPHS.circleX);
    autoGearFilterClearButton.setAttribute('data-help', label);
    autoGearFilterClearButton.setAttribute('aria-label', label);
  }
  refreshAutoGearScenarioFilterOptions(getAutoGearRules());
  if (autoGearBackupsHeading) {
    autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading
      || texts.en?.autoGearBackupsHeading
      || autoGearBackupsHeading.textContent;
  }
  if (autoGearBackupsDescription) {
    const description = texts[lang].autoGearBackupsDescription
      || texts.en?.autoGearBackupsDescription
      || '';
    autoGearBackupsDescription.textContent = description;
    if (description) {
      autoGearBackupsDescription.setAttribute('data-help', description);
    }
  }
  if (autoGearShowBackupsLabel) {
    const label = texts[lang].autoGearShowBackupsLabel
      || texts.en?.autoGearShowBackupsLabel
      || autoGearShowBackupsLabel.textContent;
    const help = texts[lang].autoGearShowBackupsHelp
      || texts.en?.autoGearShowBackupsHelp
      || label;
    autoGearShowBackupsLabel.textContent = label;
    autoGearShowBackupsLabel.setAttribute('data-help', help);
    if (autoGearShowBackupsCheckbox) {
      autoGearShowBackupsCheckbox.setAttribute('aria-label', label);
      autoGearShowBackupsCheckbox.setAttribute('data-help', help);
    }
  }
  if (autoGearBackupsHiddenNotice) {
    const hiddenText = texts[lang].autoGearBackupsHidden
      || texts.en?.autoGearBackupsHidden
      || autoGearBackupsHiddenNotice.textContent;
    autoGearBackupsHiddenNotice.textContent = hiddenText;
  }
  if (autoGearBackupRetentionLabel) {
    const label = texts[lang].autoGearBackupRetentionLabel
      || texts.en?.autoGearBackupRetentionLabel
      || autoGearBackupRetentionLabel.textContent;
    const help = texts[lang].autoGearBackupRetentionHelp
      || texts.en?.autoGearBackupRetentionHelp
      || label;
    autoGearBackupRetentionLabel.textContent = label;
    autoGearBackupRetentionLabel.setAttribute('data-help', help);
    if (autoGearBackupRetentionInput) {
      autoGearBackupRetentionInput.setAttribute('aria-label', label);
      autoGearBackupRetentionInput.setAttribute('title', label);
    }
  }
    if (autoGearBackupRetentionSummary) {
      callCoreFunctionIfAvailable('renderAutoGearBackupRetentionControls', [], { defer: true });
    }
  if (autoGearBackupSelectLabel) {
    const label = texts[lang].autoGearBackupSelectLabel
      || texts.en?.autoGearBackupSelectLabel
      || autoGearBackupSelectLabel.textContent;
    autoGearBackupSelectLabel.textContent = label;
    if (autoGearBackupSelect) {
      autoGearBackupSelect.setAttribute('aria-label', label);
      autoGearBackupSelect.setAttribute('title', label);
    }
  }
  if (autoGearBackupRestoreButton) {
    const label = texts[lang].autoGearBackupRestore
      || texts.en?.autoGearBackupRestore
      || autoGearBackupRestoreButton.textContent;
    setButtonLabelWithIcon(autoGearBackupRestoreButton, label, ICON_GLYPHS.fileImport);
    autoGearBackupRestoreButton.setAttribute('aria-label', label);
    autoGearBackupRestoreButton.setAttribute('title', label);
  }
  if (autoGearBackupEmptyMessage) {
    const emptyText = texts[lang].autoGearBackupEmpty
      || texts.en?.autoGearBackupEmpty
      || autoGearBackupEmptyMessage.textContent;
    autoGearBackupEmptyMessage.textContent = emptyText;
  }
    if (autoGearBackupSelect) {
      callCoreFunctionIfAvailable('renderAutoGearBackupControls', [], { defer: true });
    }
  if (autoGearRuleNameLabel) {
    const label = texts[lang].autoGearRuleNameLabel || texts.en?.autoGearRuleNameLabel || autoGearRuleNameLabel.textContent;
    autoGearRuleNameLabel.textContent = label;
    const help = texts[lang].autoGearRuleNameHelp || texts.en?.autoGearRuleNameHelp || label;
    autoGearRuleNameLabel.setAttribute('data-help', help);
    if (autoGearRuleNameInput) {
      autoGearRuleNameInput.setAttribute('data-help', help);
      autoGearRuleNameInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearConditionSelectLabel) {
    const label = texts[lang].autoGearConditionSelectLabel
      || texts.en?.autoGearConditionSelectLabel
      || autoGearConditionSelectLabel.textContent
      || 'Add a condition';
    const help = texts[lang].autoGearConditionSelectHelp
      || texts.en?.autoGearConditionSelectHelp
      || label;
    autoGearConditionSelectLabel.textContent = label;
    autoGearConditionSelectLabel.setAttribute('data-help', help);
    if (autoGearConditionSelect) {
      autoGearConditionSelect.setAttribute('aria-label', label);
      autoGearConditionSelect.setAttribute('data-help', help);
    }
  }
  if (autoGearConditionAddButton) {
    const label = texts[lang].autoGearAddCondition
      || texts.en?.autoGearAddCondition
      || autoGearConditionAddButton.textContent
      || 'Add condition';
    setButtonLabelWithIcon(autoGearConditionAddButton, label, ICON_GLYPHS.add);
    autoGearConditionAddButton.setAttribute('aria-label', label);
    autoGearConditionAddButton.setAttribute('data-help', label);
  }
  if (autoGearAlwaysLabel) {
    const label = texts[lang].autoGearAlwaysLabel
      || texts.en?.autoGearAlwaysLabel
      || autoGearAlwaysLabel.textContent
      || 'Always include';
    const help = texts[lang].autoGearAlwaysHelp
      || texts.en?.autoGearAlwaysHelp
      || label;
    autoGearAlwaysLabel.textContent = label;
    autoGearAlwaysLabel.setAttribute('data-help', help);
    if (autoGearAlwaysHelp) {
      autoGearAlwaysHelp.textContent = help;
      autoGearAlwaysHelp.setAttribute('data-help', help);
    }
  }
  configureAutoGearConditionButtons();
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (autoGearScenariosLabel) {
    const label = texts[lang].autoGearScenariosLabel || texts.en?.autoGearScenariosLabel || autoGearScenariosLabel.textContent;
    autoGearScenariosLabel.textContent = label;
    const help = texts[lang].autoGearScenariosHelp || texts.en?.autoGearScenariosHelp || label;
    autoGearScenariosLabel.setAttribute('data-help', help);
    if (autoGearScenariosSelect) {
      autoGearScenariosSelect.setAttribute('data-help', help);
      autoGearScenariosSelect.setAttribute('aria-label', label);
    }
    if (autoGearScenarioModeLabel) {
      const modeLabel = texts[lang].autoGearScenarioModeLabel
        || texts.en?.autoGearScenarioModeLabel
        || autoGearScenarioModeLabel.textContent
        || 'Scenario matching';
      const modeHelp = texts[lang].autoGearScenarioModeHelp
        || texts.en?.autoGearScenarioModeHelp
        || modeLabel;
      autoGearScenarioModeLabel.textContent = modeLabel;
      autoGearScenarioModeLabel.setAttribute('data-help', modeHelp);
      if (autoGearScenarioModeSelectElement) {
        autoGearScenarioModeSelectElement.setAttribute('data-help', modeHelp);
        autoGearScenarioModeSelectElement.setAttribute('aria-label', modeLabel);
      }
    }
    if (autoGearScenarioBaseLabel) {
      const baseLabel = texts[lang].autoGearScenarioBaseLabel
        || texts.en?.autoGearScenarioBaseLabel
        || autoGearScenarioBaseLabel.textContent
        || 'Base scenario';
      const baseHelp = texts[lang].autoGearScenarioBaseHelp
        || texts.en?.autoGearScenarioBaseHelp
        || baseLabel;
      autoGearScenarioBaseLabel.textContent = baseLabel;
      autoGearScenarioBaseLabel.setAttribute('data-help', baseHelp);
      if (autoGearScenarioBaseSelect) {
        autoGearScenarioBaseSelect.setAttribute('data-help', baseHelp);
        autoGearScenarioBaseSelect.setAttribute('aria-label', baseLabel);
      }
    }
    if (autoGearScenarioFactorLabel) {
      const factorLabel = texts[lang].autoGearScenarioFactorLabel
        || texts.en?.autoGearScenarioFactorLabel
        || autoGearScenarioFactorLabel.textContent
        || 'Multiplier factor';
      const factorHelp = texts[lang].autoGearScenarioFactorHelp
        || texts.en?.autoGearScenarioFactorHelp
        || factorLabel;
      autoGearScenarioFactorLabel.textContent = factorLabel;
      autoGearScenarioFactorLabel.setAttribute('data-help', factorHelp);
      if (autoGearScenarioFactorInput) {
        autoGearScenarioFactorInput.setAttribute('data-help', factorHelp);
        autoGearScenarioFactorInput.setAttribute('aria-label', factorLabel);
      }
    }
  }
  if (autoGearShootingDaysLabel) {
    const label = texts[lang].autoGearShootingDaysLabel
      || texts.en?.autoGearShootingDaysLabel
      || autoGearShootingDaysLabel.textContent
      || 'Shooting days condition';
    const help = texts[lang].autoGearShootingDaysHelp
      || texts.en?.autoGearShootingDaysHelp
      || label;
    const minimumLabel = texts[lang].autoGearShootingDaysModeMinimum
      || texts.en?.autoGearShootingDaysModeMinimum
      || 'Minimum';
    const maximumLabel = texts[lang].autoGearShootingDaysModeMaximum
      || texts.en?.autoGearShootingDaysModeMaximum
      || 'Maximum';
    const everyLabel = texts[lang].autoGearShootingDaysModeEvery
      || texts.en?.autoGearShootingDaysModeEvery
      || 'Every';
    const valueLabel = texts[lang].autoGearShootingDaysValueLabel
      || texts.en?.autoGearShootingDaysValueLabel
      || 'Shooting days value';
    autoGearShootingDaysLabel.textContent = label;
    autoGearShootingDaysLabel.setAttribute('data-help', help);
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.setAttribute('data-help', help);
      autoGearShootingDaysMode.setAttribute('aria-label', label);
      Array.from(autoGearShootingDaysMode.options || []).forEach(option => {
        if (!option || typeof option.value !== 'string') return;
        if (option.value === 'minimum') {
          option.textContent = minimumLabel;
        } else if (option.value === 'maximum') {
          option.textContent = maximumLabel;
        } else if (option.value === 'every') {
          option.textContent = everyLabel;
        }
      });
    }
    if (autoGearShootingDaysValueLabel) {
      autoGearShootingDaysValueLabel.textContent = valueLabel;
      autoGearShootingDaysValueLabel.setAttribute('data-help', help);
    }
    if (autoGearShootingDaysInput) {
      autoGearShootingDaysInput.setAttribute('data-help', help);
      autoGearShootingDaysInput.setAttribute('aria-label', valueLabel || label);
    }
    if (autoGearShootingDaysHelp) {
      autoGearShootingDaysHelp.textContent = help;
      autoGearShootingDaysHelp.setAttribute('data-help', help);
    }
  }
  if (autoGearMatteboxLabel) {
    const label = texts[lang].autoGearMatteboxLabel || texts.en?.autoGearMatteboxLabel || autoGearMatteboxLabel.textContent;
    autoGearMatteboxLabel.textContent = label;
    const help = texts[lang].autoGearMatteboxHelp || texts.en?.autoGearMatteboxHelp || label;
    autoGearMatteboxLabel.setAttribute('data-help', help);
    if (autoGearMatteboxSelect) {
      autoGearMatteboxSelect.setAttribute('data-help', help);
      autoGearMatteboxSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCameraHandleLabel) {
    const label = texts[lang].autoGearCameraHandleLabel || texts.en?.autoGearCameraHandleLabel || autoGearCameraHandleLabel.textContent;
    autoGearCameraHandleLabel.textContent = label;
    const help = texts[lang].autoGearCameraHandleHelp || texts.en?.autoGearCameraHandleHelp || label;
    autoGearCameraHandleLabel.setAttribute('data-help', help);
    if (autoGearCameraHandleSelect) {
      autoGearCameraHandleSelect.setAttribute('data-help', help);
      autoGearCameraHandleSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearViewfinderExtensionLabel) {
    const label = texts[lang].autoGearViewfinderExtensionLabel || texts.en?.autoGearViewfinderExtensionLabel || autoGearViewfinderExtensionLabel.textContent;
    autoGearViewfinderExtensionLabel.textContent = label;
    const help = texts[lang].autoGearViewfinderExtensionHelp || texts.en?.autoGearViewfinderExtensionHelp || label;
    autoGearViewfinderExtensionLabel.setAttribute('data-help', help);
    if (autoGearViewfinderExtensionSelect) {
      autoGearViewfinderExtensionSelect.setAttribute('data-help', help);
      autoGearViewfinderExtensionSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearDeliveryResolutionLabel) {
    const label = texts[lang].autoGearDeliveryResolutionLabel || texts.en?.autoGearDeliveryResolutionLabel || autoGearDeliveryResolutionLabel.textContent;
    autoGearDeliveryResolutionLabel.textContent = label;
    const help = texts[lang].autoGearDeliveryResolutionHelp || texts.en?.autoGearDeliveryResolutionHelp || label;
    autoGearDeliveryResolutionLabel.setAttribute('data-help', help);
    if (autoGearDeliveryResolutionSelect) {
      autoGearDeliveryResolutionSelect.setAttribute('data-help', help);
      autoGearDeliveryResolutionSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearVideoDistributionLabel) {
    const label = texts[lang].autoGearVideoDistributionLabel || texts.en?.autoGearVideoDistributionLabel || autoGearVideoDistributionLabel.textContent;
    autoGearVideoDistributionLabel.textContent = label;
    const help = texts[lang].autoGearVideoDistributionHelp || texts.en?.autoGearVideoDistributionHelp || label;
    autoGearVideoDistributionLabel.setAttribute('data-help', help);
    if (autoGearVideoDistributionSelect) {
      autoGearVideoDistributionSelect.setAttribute('data-help', help);
      autoGearVideoDistributionSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCameraLabel) {
    const label = texts[lang].autoGearCameraLabel || texts.en?.autoGearCameraLabel || autoGearCameraLabel.textContent;
    autoGearCameraLabel.textContent = label;
    const help = texts[lang].autoGearCameraHelp || texts.en?.autoGearCameraHelp || label;
    autoGearCameraLabel.setAttribute('data-help', help);
    if (autoGearCameraSelect) {
      autoGearCameraSelect.setAttribute('data-help', help);
      autoGearCameraSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCameraWeightLabel) {
    const label = texts[lang].autoGearCameraWeightLabel
      || texts.en?.autoGearCameraWeightLabel
      || autoGearCameraWeightLabel.textContent
      || 'Camera weight';
    const help = texts[lang].autoGearCameraWeightHelp
      || texts.en?.autoGearCameraWeightHelp
      || label;
    autoGearCameraWeightLabel.textContent = label;
    autoGearCameraWeightLabel.setAttribute('data-help', help);
  }
  if (autoGearCameraWeightOperatorLabel) {
    const label = texts[lang].autoGearCameraWeightOperatorLabel
      || texts.en?.autoGearCameraWeightOperatorLabel
      || autoGearCameraWeightOperatorLabel.textContent
      || 'Weight comparison';
    autoGearCameraWeightOperatorLabel.textContent = label;
    autoGearCameraWeightOperatorLabel.setAttribute('data-help', label);
    if (autoGearCameraWeightOperator) {
      autoGearCameraWeightOperator.setAttribute('data-help', label);
      autoGearCameraWeightOperator.setAttribute('aria-label', label);
      const greaterLabel = texts[lang].autoGearCameraWeightOperatorGreater
        || texts.en?.autoGearCameraWeightOperatorGreater
        || 'Heavier than';
      const lessLabel = texts[lang].autoGearCameraWeightOperatorLess
        || texts.en?.autoGearCameraWeightOperatorLess
        || 'Lighter than';
      const equalLabel = texts[lang].autoGearCameraWeightOperatorEqual
        || texts.en?.autoGearCameraWeightOperatorEqual
        || 'Exactly';
      Array.from(autoGearCameraWeightOperator.options || []).forEach(option => {
        if (!option) return;
        if (option.value === 'greater') {
          option.textContent = greaterLabel;
        } else if (option.value === 'less') {
          option.textContent = lessLabel;
        } else if (option.value === 'equal') {
          option.textContent = equalLabel;
        }
      });
    }
  }
  if (autoGearCameraWeightValueLabel) {
    const label = texts[lang].autoGearCameraWeightValueLabel
      || texts.en?.autoGearCameraWeightValueLabel
      || autoGearCameraWeightValueLabel.textContent
      || 'Weight threshold (grams)';
    const help = texts[lang].autoGearCameraWeightHelp
      || texts.en?.autoGearCameraWeightHelp
      || label;
    autoGearCameraWeightValueLabel.textContent = label;
    autoGearCameraWeightValueLabel.setAttribute('data-help', help);
    if (autoGearCameraWeightValueInput) {
      autoGearCameraWeightValueInput.setAttribute('data-help', help);
      autoGearCameraWeightValueInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearCameraWeightHelp) {
    const help = texts[lang].autoGearCameraWeightHelp
      || texts.en?.autoGearCameraWeightHelp
      || autoGearCameraWeightHelp.textContent
      || '';
    autoGearCameraWeightHelp.textContent = help;
    if (help) {
      autoGearCameraWeightHelp.setAttribute('data-help', help);
    }
  }
  if (autoGearMonitorLabel) {
    const label = texts[lang].autoGearMonitorLabel || texts.en?.autoGearMonitorLabel || autoGearMonitorLabel.textContent;
    autoGearMonitorLabel.textContent = label;
    const help = texts[lang].autoGearMonitorHelp || texts.en?.autoGearMonitorHelp || label;
    autoGearMonitorLabel.setAttribute('data-help', help);
    if (autoGearMonitorSelect) {
      autoGearMonitorSelect.setAttribute('data-help', help);
      autoGearMonitorSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearTripodHeadBrandLabel) {
    const label = texts[lang].autoGearTripodHeadBrandLabel
      || texts.en?.autoGearTripodHeadBrandLabel
      || autoGearTripodHeadBrandLabel.textContent;
    autoGearTripodHeadBrandLabel.textContent = label;
    const help = texts[lang].autoGearTripodHeadBrandHelp
      || texts.en?.autoGearTripodHeadBrandHelp
      || label;
    autoGearTripodHeadBrandLabel.setAttribute('data-help', help);
    if (autoGearTripodHeadBrandSelect) {
      autoGearTripodHeadBrandSelect.setAttribute('data-help', help);
      autoGearTripodHeadBrandSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearTripodBowlLabel) {
    const label = texts[lang].autoGearTripodBowlLabel
      || texts.en?.autoGearTripodBowlLabel
      || autoGearTripodBowlLabel.textContent;
    autoGearTripodBowlLabel.textContent = label;
    const help = texts[lang].autoGearTripodBowlHelp
      || texts.en?.autoGearTripodBowlHelp
      || label;
    autoGearTripodBowlLabel.setAttribute('data-help', help);
    if (autoGearTripodBowlSelect) {
      autoGearTripodBowlSelect.setAttribute('data-help', help);
      autoGearTripodBowlSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearTripodTypesLabel) {
    const label = texts[lang].autoGearTripodTypesLabel
      || texts.en?.autoGearTripodTypesLabel
      || autoGearTripodTypesLabel.textContent;
    autoGearTripodTypesLabel.textContent = label;
    const help = texts[lang].autoGearTripodTypesHelp
      || texts.en?.autoGearTripodTypesHelp
      || label;
    autoGearTripodTypesLabel.setAttribute('data-help', help);
    if (autoGearTripodTypesSelect) {
      autoGearTripodTypesSelect.setAttribute('data-help', help);
      autoGearTripodTypesSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearTripodSpreaderLabel) {
    const label = texts[lang].autoGearTripodSpreaderLabel
      || texts.en?.autoGearTripodSpreaderLabel
      || autoGearTripodSpreaderLabel.textContent;
    autoGearTripodSpreaderLabel.textContent = label;
    const help = texts[lang].autoGearTripodSpreaderHelp
      || texts.en?.autoGearTripodSpreaderHelp
      || label;
    autoGearTripodSpreaderLabel.setAttribute('data-help', help);
    if (autoGearTripodSpreaderSelect) {
      autoGearTripodSpreaderSelect.setAttribute('data-help', help);
      autoGearTripodSpreaderSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCrewPresentLabel) {
    const label = texts[lang].autoGearCrewPresentLabel
      || texts.en?.autoGearCrewPresentLabel
      || autoGearCrewPresentLabel.textContent;
    autoGearCrewPresentLabel.textContent = label;
    const help = texts[lang].autoGearCrewPresentHelp
      || texts.en?.autoGearCrewPresentHelp
      || label;
    autoGearCrewPresentLabel.setAttribute('data-help', help);
    if (autoGearCrewPresentSelect) {
      autoGearCrewPresentSelect.setAttribute('data-help', help);
      autoGearCrewPresentSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearCrewAbsentLabel) {
    const label = texts[lang].autoGearCrewAbsentLabel
      || texts.en?.autoGearCrewAbsentLabel
      || autoGearCrewAbsentLabel.textContent;
    autoGearCrewAbsentLabel.textContent = label;
    const help = texts[lang].autoGearCrewAbsentHelp
      || texts.en?.autoGearCrewAbsentHelp
      || label;
    autoGearCrewAbsentLabel.setAttribute('data-help', help);
    if (autoGearCrewAbsentSelect) {
      autoGearCrewAbsentSelect.setAttribute('data-help', help);
      autoGearCrewAbsentSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearWirelessLabel) {
    const label = texts[lang].autoGearWirelessLabel || texts.en?.autoGearWirelessLabel || autoGearWirelessLabel.textContent;
    autoGearWirelessLabel.textContent = label;
    const help = texts[lang].autoGearWirelessHelp || texts.en?.autoGearWirelessHelp || label;
    autoGearWirelessLabel.setAttribute('data-help', help);
    if (autoGearWirelessSelect) {
      autoGearWirelessSelect.setAttribute('data-help', help);
      autoGearWirelessSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearMotorsLabel) {
    const label = texts[lang].autoGearMotorsLabel || texts.en?.autoGearMotorsLabel || autoGearMotorsLabel.textContent;
    autoGearMotorsLabel.textContent = label;
    const help = texts[lang].autoGearMotorsHelp || texts.en?.autoGearMotorsHelp || label;
    autoGearMotorsLabel.setAttribute('data-help', help);
    if (autoGearMotorsSelect) {
      autoGearMotorsSelect.setAttribute('data-help', help);
      autoGearMotorsSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearControllersLabel) {
    const label = texts[lang].autoGearControllersLabel || texts.en?.autoGearControllersLabel || autoGearControllersLabel.textContent;
    autoGearControllersLabel.textContent = label;
    const help = texts[lang].autoGearControllersHelp || texts.en?.autoGearControllersHelp || label;
    autoGearControllersLabel.setAttribute('data-help', help);
    if (autoGearControllersSelect) {
      autoGearControllersSelect.setAttribute('data-help', help);
      autoGearControllersSelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearDistanceLabel) {
    const label = texts[lang].autoGearDistanceLabel || texts.en?.autoGearDistanceLabel || autoGearDistanceLabel.textContent;
    autoGearDistanceLabel.textContent = label;
    const help = texts[lang].autoGearDistanceHelp || texts.en?.autoGearDistanceHelp || label;
    autoGearDistanceLabel.setAttribute('data-help', help);
    if (autoGearDistanceSelect) {
      autoGearDistanceSelect.setAttribute('data-help', help);
      autoGearDistanceSelect.setAttribute('aria-label', label);
    }
  }
  const logicLabelText = texts[lang].autoGearConditionLogicLabel
    || texts.en?.autoGearConditionLogicLabel
    || 'Match behavior';
  const logicHelpText = texts[lang].autoGearConditionLogicHelp
    || texts.en?.autoGearConditionLogicHelp
    || logicLabelText;
  const logicOptionTexts = {
    all: texts[lang]?.autoGearConditionLogicAll
      || texts.en?.autoGearConditionLogicAll
      || 'Require every selected value',
    any: texts[lang]?.autoGearConditionLogicAny
      || texts.en?.autoGearConditionLogicAny
      || 'Match any selected value',
    multiplier: texts[lang]?.autoGearConditionLogicMultiplier
      || texts.en?.autoGearConditionLogicMultiplier
      || 'Multiply by matched values',
  };
  Object.entries(autoGearConditionLogicSelects).forEach(([key, select]) => {
    const label = autoGearConditionLogicLabels[key];
    if (label) {
      label.textContent = logicLabelText;
      label.setAttribute('data-help', logicHelpText);
    }
    if (select) {
      select.setAttribute('aria-label', logicLabelText);
      select.setAttribute('data-help', logicHelpText);
      select.setAttribute('title', logicHelpText);
      Array.from(select.options || []).forEach(option => {
        if (!option) return;
        const optionText = logicOptionTexts[option.value];
        if (optionText) option.textContent = optionText;
      });
    }
  });
  if (autoGearAddItemsHeading) {
    autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || texts.en?.autoGearAddItemsHeading || autoGearAddItemsHeading.textContent;
  }
  if (autoGearAddItemLabel) {
    const label = texts[lang].autoGearAddItemLabel || texts.en?.autoGearAddItemLabel || autoGearAddItemLabel.textContent;
    const hint = texts[lang].autoGearAddMultipleHint || texts.en?.autoGearAddMultipleHint || '';
    const helpText = hint ? `${label} – ${hint}` : label;
    autoGearAddItemLabel.textContent = label;
    autoGearAddItemLabel.setAttribute('data-help', helpText);
    if (autoGearAddNameInput) {
      autoGearAddNameInput.setAttribute('aria-label', label);
      autoGearAddNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearAddNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearAddNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearAddCategoryLabel) {
    const label = texts[lang].autoGearAddCategoryLabel || texts.en?.autoGearAddCategoryLabel || autoGearAddCategoryLabel.textContent;
    autoGearAddCategoryLabel.textContent = label;
    if (autoGearAddCategorySelect) {
      autoGearAddCategorySelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddQuantityLabel) {
    const label = texts[lang].autoGearAddQuantityLabel || texts.en?.autoGearAddQuantityLabel || autoGearAddQuantityLabel.textContent;
    autoGearAddQuantityLabel.textContent = label;
    if (autoGearAddQuantityInput) {
      autoGearAddQuantityInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddScreenSizeLabel) {
    const label = texts[lang].autoGearAddScreenSizeLabel || texts.en?.autoGearAddScreenSizeLabel || autoGearAddScreenSizeLabel.textContent;
    autoGearAddScreenSizeLabel.textContent = label;
    if (autoGearAddScreenSizeInput) {
      autoGearAddScreenSizeInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddSelectorTypeLabel) {
    const label = texts[lang].autoGearAddSelectorTypeLabel || texts.en?.autoGearAddSelectorTypeLabel || autoGearAddSelectorTypeLabel.textContent;
    autoGearAddSelectorTypeLabel.textContent = label;
    if (autoGearAddSelectorTypeSelect) {
      autoGearAddSelectorTypeSelect.setAttribute('aria-label', label);
      const noneLabel = texts[lang].autoGearSelectorNoneOption || texts.en?.autoGearSelectorNoneOption || 'No selector';
      const monitorLabel = texts[lang].autoGearSelectorMonitorOption || texts.en?.autoGearSelectorMonitorOption || 'Monitor selector';
      const directorLabel = texts[lang].autoGearSelectorDirectorOption || texts.en?.autoGearSelectorDirectorOption || 'Director monitor selector';
      const tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || texts.en?.autoGearSelectorTripodHeadOption || 'Tripod head selector';
      const tripodBowlLabel = texts[lang].autoGearSelectorTripodBowlOption || texts.en?.autoGearSelectorTripodBowlOption || 'Tripod bowl selector';
      const tripodTypesLabel = texts[lang].autoGearSelectorTripodTypesOption || texts.en?.autoGearSelectorTripodTypesOption || 'Tripod type selector';
      const tripodSpreaderLabel = texts[lang].autoGearSelectorTripodSpreaderOption || texts.en?.autoGearSelectorTripodSpreaderOption || 'Tripod spreader selector';
      const selectorLabels = new Map([
        ['none', noneLabel],
        ['monitor', monitorLabel],
        ['directorMonitor', directorLabel],
        ['tripodHeadBrand', tripodHeadLabel],
        ['tripodBowl', tripodBowlLabel],
        ['tripodTypes', tripodTypesLabel],
        ['tripodSpreader', tripodSpreaderLabel],
      ]);
      Array.from(autoGearAddSelectorTypeSelect.options || []).forEach(opt => {
        const text = selectorLabels.get(opt.value);
        if (text) opt.textContent = text;
      });
    }
  }
  if (autoGearAddSelectorDefaultLabel) {
    const label = texts[lang].autoGearAddSelectorDefaultLabel || texts.en?.autoGearAddSelectorDefaultLabel || autoGearAddSelectorDefaultLabel.textContent;
    autoGearAddSelectorDefaultLabel.textContent = label;
    if (autoGearAddSelectorDefaultInput) {
      autoGearAddSelectorDefaultInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddNotesLabel) {
    const label = texts[lang].autoGearAddNotesLabel || texts.en?.autoGearAddNotesLabel || autoGearAddNotesLabel.textContent;
    autoGearAddNotesLabel.textContent = label;
    if (autoGearAddNotesInput) {
      autoGearAddNotesInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearAddItemButton) {
    if (typeof updateAutoGearItemButtonState === 'function') {
      updateAutoGearItemButtonState('add');
    }
  }
  if (autoGearRemoveItemsHeading) {
    autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || texts.en?.autoGearRemoveItemsHeading || autoGearRemoveItemsHeading.textContent;
  }
  if (autoGearRemoveItemLabel) {
    const label = texts[lang].autoGearRemoveItemLabel || texts.en?.autoGearRemoveItemLabel || autoGearRemoveItemLabel.textContent;
    const hint = texts[lang].autoGearRemoveMultipleHint || texts.en?.autoGearRemoveMultipleHint || '';
    const helpText = hint ? `${label} – ${hint}` : label;
    autoGearRemoveItemLabel.textContent = label;
    autoGearRemoveItemLabel.setAttribute('data-help', helpText);
    if (autoGearRemoveNameInput) {
      autoGearRemoveNameInput.setAttribute('aria-label', label);
      autoGearRemoveNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearRemoveNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearRemoveNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearRemoveCategoryLabel) {
    const label = texts[lang].autoGearRemoveCategoryLabel || texts.en?.autoGearRemoveCategoryLabel || autoGearRemoveCategoryLabel.textContent;
    autoGearRemoveCategoryLabel.textContent = label;
    if (autoGearRemoveCategorySelect) {
      autoGearRemoveCategorySelect.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveQuantityLabel) {
    const label = texts[lang].autoGearRemoveQuantityLabel || texts.en?.autoGearRemoveQuantityLabel || autoGearRemoveQuantityLabel.textContent;
    autoGearRemoveQuantityLabel.textContent = label;
    if (autoGearRemoveQuantityInput) {
      autoGearRemoveQuantityInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveScreenSizeLabel) {
    const label = texts[lang].autoGearRemoveScreenSizeLabel || texts.en?.autoGearRemoveScreenSizeLabel || autoGearRemoveScreenSizeLabel.textContent;
    autoGearRemoveScreenSizeLabel.textContent = label;
    if (autoGearRemoveScreenSizeInput) {
      autoGearRemoveScreenSizeInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveSelectorTypeLabel) {
    const label = texts[lang].autoGearRemoveSelectorTypeLabel || texts.en?.autoGearRemoveSelectorTypeLabel || autoGearRemoveSelectorTypeLabel.textContent;
    autoGearRemoveSelectorTypeLabel.textContent = label;
    if (autoGearRemoveSelectorTypeSelect) {
      autoGearRemoveSelectorTypeSelect.setAttribute('aria-label', label);
      const noneLabel = texts[lang].autoGearSelectorNoneOption || texts.en?.autoGearSelectorNoneOption || 'No selector';
      const monitorLabel = texts[lang].autoGearSelectorMonitorOption || texts.en?.autoGearSelectorMonitorOption || 'Monitor selector';
      const directorLabel = texts[lang].autoGearSelectorDirectorOption || texts.en?.autoGearSelectorDirectorOption || 'Director monitor selector';
      const tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || texts.en?.autoGearSelectorTripodHeadOption || 'Tripod head selector';
      const tripodBowlLabel = texts[lang].autoGearSelectorTripodBowlOption || texts.en?.autoGearSelectorTripodBowlOption || 'Tripod bowl selector';
      const tripodTypesLabel = texts[lang].autoGearSelectorTripodTypesOption || texts.en?.autoGearSelectorTripodTypesOption || 'Tripod type selector';
      const tripodSpreaderLabel = texts[lang].autoGearSelectorTripodSpreaderOption || texts.en?.autoGearSelectorTripodSpreaderOption || 'Tripod spreader selector';
      const selectorLabels = new Map([
        ['none', noneLabel],
        ['monitor', monitorLabel],
        ['directorMonitor', directorLabel],
        ['tripodHeadBrand', tripodHeadLabel],
        ['tripodBowl', tripodBowlLabel],
        ['tripodTypes', tripodTypesLabel],
        ['tripodSpreader', tripodSpreaderLabel],
      ]);
      Array.from(autoGearRemoveSelectorTypeSelect.options || []).forEach(opt => {
        const text = selectorLabels.get(opt.value);
        if (text) opt.textContent = text;
      });
    }
  }
  if (autoGearRemoveSelectorDefaultLabel) {
    const label = texts[lang].autoGearRemoveSelectorDefaultLabel || texts.en?.autoGearRemoveSelectorDefaultLabel || autoGearRemoveSelectorDefaultLabel.textContent;
    autoGearRemoveSelectorDefaultLabel.textContent = label;
    if (autoGearRemoveSelectorDefaultInput) {
      autoGearRemoveSelectorDefaultInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearRemoveNotesLabel) {
    const label = texts[lang].autoGearRemoveNotesLabel || texts.en?.autoGearRemoveNotesLabel || autoGearRemoveNotesLabel.textContent;
    autoGearRemoveNotesLabel.textContent = label;
    if (autoGearRemoveNotesInput) {
      autoGearRemoveNotesInput.setAttribute('aria-label', label);
    }
  }
  if (autoGearDraftImpactHeading) {
    const heading = texts[lang].autoGearDraftImpactHeading
      || texts.en?.autoGearDraftImpactHeading
      || autoGearDraftImpactHeading.textContent;
    autoGearDraftImpactHeading.textContent = heading;
  }
  if (autoGearDraftImpactDescription) {
    const description = texts[lang].autoGearDraftImpactDescription
      || texts.en?.autoGearDraftImpactDescription
      || autoGearDraftImpactDescription.textContent;
    autoGearDraftImpactDescription.textContent = description;
    if (autoGearDraftImpactHeading) {
      autoGearDraftImpactHeading.setAttribute('data-help', description);
    }
    if (autoGearDraftImpactContainer) {
      autoGearDraftImpactContainer.setAttribute('data-help', description);
    }
  }
  if (autoGearDraftWarningHeading) {
    const heading = texts[lang].autoGearDraftWarningHeading
      || texts.en?.autoGearDraftWarningHeading
      || autoGearDraftWarningHeading.textContent;
    autoGearDraftWarningHeading.textContent = heading;
  }
  if (autoGearRemoveItemButton) {
    if (typeof updateAutoGearItemButtonState === 'function') {
      updateAutoGearItemButtonState('remove');
    }
  }
  if (autoGearSaveRuleButton) {
    const label = texts[lang].autoGearSaveRule || texts.en?.autoGearSaveRule || autoGearSaveRuleButton.textContent;
    setButtonLabelWithIcon(autoGearSaveRuleButton, label);
    autoGearSaveRuleButton.setAttribute('data-help', label);
  }
  if (autoGearCancelEditButton) {
    const label = texts[lang].autoGearCancelEdit || texts.en?.autoGearCancelEdit || autoGearCancelEditButton.textContent;
    setButtonLabelWithIcon(autoGearCancelEditButton, label, ICON_GLYPHS.circleX);
    autoGearCancelEditButton.setAttribute('data-help', label);
  }
  if (autoGearAddCategorySelect) {
    populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearAddCategorySelect.value);
  }
  if (autoGearRemoveCategorySelect) {
    populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearRemoveCategorySelect.value);
  }
  syncAutoGearMonitorFieldVisibility();
  if (autoGearScenariosSelect) {
    refreshAutoGearScenarioOptions(autoGearEditorDraft?.scenarios);
  }
  if (autoGearMatteboxSelect) {
    refreshAutoGearMatteboxOptions(autoGearEditorDraft?.mattebox);
  }
  if (autoGearCameraHandleSelect) {
    refreshAutoGearCameraHandleOptions(autoGearEditorDraft?.cameraHandle);
  }
  if (autoGearViewfinderExtensionSelect) {
    refreshAutoGearViewfinderExtensionOptions(autoGearEditorDraft?.viewfinderExtension);
  }
  if (autoGearDeliveryResolutionSelect) {
    refreshAutoGearDeliveryResolutionOptions(autoGearEditorDraft?.deliveryResolution);
  }
  if (autoGearVideoDistributionSelect) {
    refreshAutoGearVideoDistributionOptions(autoGearEditorDraft?.videoDistribution);
  }
  seedAutoGearRulesFromCurrentProject();
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearDraftLists', [], { defer: true });
  callCoreFunctionIfAvailable('updateAutoGearCatalogOptions', [], { defer: true });
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
  callCoreFunctionIfAvailable('applyAutoGearBackupVisibility', [], { defer: true });
  const contrastLabel = document.getElementById("settingsHighContrastLabel");
  if (contrastLabel) {
    contrastLabel.textContent = texts[lang].highContrastSetting;
    const contrastHelp =
      texts[lang].highContrastSettingHelp || texts[lang].highContrastSetting;
    contrastLabel.setAttribute("data-help", contrastHelp);
    if (settingsHighContrast) {
      settingsHighContrast.setAttribute("data-help", contrastHelp);
      settingsHighContrast.setAttribute(
        "aria-label",
        texts[lang].highContrastSetting
      );
    }
  }
  const accessibilityHeading = document.getElementById("accessibilityHeading");
  if (accessibilityHeading) {
    accessibilityHeading.textContent = texts[lang].accessibilityHeading;
    accessibilityHeading.setAttribute(
      "data-help",
      texts[lang].accessibilityHeadingHelp || texts[lang].accessibilityHeading
    );
  }
  const backupHeading = document.getElementById("backupHeading");
  if (backupHeading) {
    backupHeading.textContent = texts[lang].backupHeading;
    backupHeading.setAttribute(
      "data-help",
      texts[lang].backupHeadingHelp || texts[lang].backupHeading
    );
  }
  const projectBackupsHeading =
    typeof document !== 'undefined'
      ? document.getElementById('projectBackupsHeading')
      : null;
  if (projectBackupsHeading) {
    const headingText = texts[lang].projectBackupsHeading || "Project Backups";
    projectBackupsHeading.textContent = headingText;
    const descriptionText = texts[lang].projectBackupsDescription || "";
    if (descriptionText) {
      projectBackupsHeading.setAttribute("data-help", descriptionText);
    } else {
      projectBackupsHeading.removeAttribute("data-help");
    }
  }
  const projectBackupsDescription =
    typeof document !== 'undefined'
      ? document.getElementById('projectBackupsDescription')
      : null;
  if (projectBackupsDescription) {
    const descriptionText = texts[lang].projectBackupsDescription || "";
    if (descriptionText) {
      projectBackupsDescription.textContent = descriptionText;
      projectBackupsDescription.hidden = false;
    } else {
      projectBackupsDescription.textContent = "";
      projectBackupsDescription.hidden = true;
    }
  }
  if (dataHeading) {
    dataHeading.textContent = texts[lang].dataHeading;
    const dataHelp = texts[lang].dataHeadingHelp || texts[lang].dataHeading;
    dataHeading.setAttribute("data-help", dataHelp);
  }
  if (storageSummaryIntro) {
    storageSummaryIntro.textContent = texts[lang].storageSummaryIntro;
  }
  if (storageSummaryFootnote) {
    storageSummaryFootnote.textContent = texts[lang].storageSummaryFootnote;
  }
  if (storageSummaryEmpty) {
    storageSummaryEmpty.textContent = texts[lang].storageSummaryEmpty;
  }
  if (storageActionsHeading) {
    const headingText = texts[lang].storageActionsHeading
      || texts.en?.storageActionsHeading
      || storageActionsHeading.textContent;
    storageActionsHeading.textContent = headingText;
    const headingHelp = texts[lang].storageActionsHeadingHelp
      || texts.en?.storageActionsHeadingHelp
      || headingText;
    storageActionsHeading.setAttribute('data-help', headingHelp);
  }
  if (storageActionsIntro) {
    storageActionsIntro.textContent = texts[lang].storageActionsIntro
      || texts.en?.storageActionsIntro
      || storageActionsIntro.textContent;
  }
  if (storageBackupNowButton) {
    const backupLabel = texts[lang].storageBackupNow
      || texts.en?.storageBackupNow
      || storageBackupNowButton.textContent;
    setButtonLabelWithIcon(storageBackupNowButton, backupLabel, ICON_GLYPHS.fileExport);
    const backupHelp = texts[lang].storageBackupNowHelp
      || texts.en?.storageBackupNowHelp
      || backupLabel;
    storageBackupNowButton.setAttribute('data-help', backupHelp);
    storageBackupNowButton.setAttribute('title', backupHelp);
  }
  if (storageOpenBackupTabButton) {
    const openLabel = texts[lang].storageOpenBackupTab
      || texts.en?.storageOpenBackupTab
      || storageOpenBackupTabButton.textContent;
    setButtonLabelWithIcon(storageOpenBackupTabButton, openLabel, ICON_GLYPHS.settingsBackup);
    const openHelp = texts[lang].storageOpenBackupTabHelp
      || texts.en?.storageOpenBackupTabHelp
      || openLabel;
    storageOpenBackupTabButton.setAttribute('data-help', openHelp);
    storageOpenBackupTabButton.setAttribute('title', openHelp);
  }
  if (storageStatusHeading) {
    const statusHeading = texts[lang].storageStatusHeading
      || texts.en?.storageStatusHeading
      || storageStatusHeading.textContent;
    storageStatusHeading.textContent = statusHeading;
    const statusHelp = texts[lang].storageStatusHeadingHelp
      || texts.en?.storageStatusHeadingHelp
      || statusHeading;
    storageStatusHeading.setAttribute('data-help', statusHelp);
  }
  if (storageStatusLastProjectLabel) {
    storageStatusLastProjectLabel.textContent = texts[lang].storageStatusLastProjectLabel
      || texts.en?.storageStatusLastProjectLabel
      || storageStatusLastProjectLabel.textContent;
  }
  if (storageStatusLastAutoBackupLabel) {
    storageStatusLastAutoBackupLabel.textContent = texts[lang].storageStatusLastAutoBackupLabel
      || texts.en?.storageStatusLastAutoBackupLabel
      || storageStatusLastAutoBackupLabel.textContent;
  }
  if (storageStatusLastFullBackupLabel) {
    storageStatusLastFullBackupLabel.textContent = texts[lang].storageStatusLastFullBackupLabel
      || texts.en?.storageStatusLastFullBackupLabel
      || storageStatusLastFullBackupLabel.textContent;
  }
  const statusDefaultText = texts[lang].storageStatusNever
    || texts.en?.storageStatusNever
    || (storageStatusLastProjectValue ? storageStatusLastProjectValue.textContent : '');
  if (storageStatusLastProjectValue) {
    storageStatusLastProjectValue.textContent = statusDefaultText;
  }
  if (storageStatusLastAutoBackupValue) {
    storageStatusLastAutoBackupValue.textContent = statusDefaultText;
  }
  if (storageStatusLastFullBackupValue) {
    storageStatusLastFullBackupValue.textContent = statusDefaultText;
  }
  const showAutoBackupsLabel = document.getElementById("settingsShowAutoBackupsLabel");
  if (showAutoBackupsLabel) {
    showAutoBackupsLabel.textContent = texts[lang].showAutoBackupsSetting;
    const autoBackupsHelp =
      texts[lang].showAutoBackupsHelp || texts[lang].showAutoBackupsSetting;
    showAutoBackupsLabel.setAttribute("data-help", autoBackupsHelp);
    if (settingsShowAutoBackupsEl) {
      settingsShowAutoBackupsEl.setAttribute("data-help", autoBackupsHelp);
      settingsShowAutoBackupsEl.setAttribute(
        "aria-label",
        texts[lang].showAutoBackupsSetting
      );
    }
  }
  if (backupDiffToggleButtonEl) {
    const compareLabel = texts[lang].versionCompareButton || 'Compare versions';
    setButtonLabelWithIcon(backupDiffToggleButtonEl, compareLabel, ICON_GLYPHS.note);
    const compareHelp = texts[lang].versionCompareButtonHelp || compareLabel;
    backupDiffToggleButtonEl.setAttribute('data-help', compareHelp);
    backupDiffToggleButtonEl.setAttribute('title', compareHelp);
  }
  if (backupDiffHeadingEl) {
    backupDiffHeadingEl.textContent = texts[lang].versionCompareHeading || 'Version comparison';
  }
  if (backupDiffIntroEl) {
    backupDiffIntroEl.textContent = texts[lang].versionCompareIntro || '';
  }
  if (backupDiffPrimaryLabelEl) {
    const primaryLabel = texts[lang].versionComparePrimaryLabel || 'Baseline version';
    backupDiffPrimaryLabelEl.textContent = primaryLabel;
    if (backupDiffPrimarySelectEl) {
      backupDiffPrimarySelectEl.setAttribute('aria-label', primaryLabel);
    }
  }
  if (backupDiffSecondaryLabelEl) {
    const compareLabelText = texts[lang].versionCompareSecondaryLabel || 'Comparison version';
    backupDiffSecondaryLabelEl.textContent = compareLabelText;
    if (backupDiffSecondarySelectEl) {
      backupDiffSecondarySelectEl.setAttribute('aria-label', compareLabelText);
    }
  }
  if (backupDiffEmptyStateEl) {
    backupDiffEmptyStateEl.textContent =
      texts[lang].versionCompareEmpty
      || 'Save a project or wait for auto-backups to start comparing versions.';
  }
  if (backupDiffNotesLabelEl) {
    backupDiffNotesLabelEl.textContent = texts[lang].versionCompareNotesLabel || 'Incident notes';
  }
  if (backupDiffNotesEl) {
    const placeholder = texts[lang].versionCompareNotesPlaceholder
      || 'Record context, on-set observations, or required follow-up.';
    backupDiffNotesEl.placeholder = placeholder;
  }
  if (backupDiffExportButtonEl) {
    const exportLabel = texts[lang].versionCompareExport || 'Export log';
    setButtonLabelWithIcon(backupDiffExportButtonEl, exportLabel, ICON_GLYPHS.fileExport);
    const exportHelp = texts[lang].versionCompareExportHelp || exportLabel;
    backupDiffExportButtonEl.setAttribute('data-help', exportHelp);
    backupDiffExportButtonEl.setAttribute('title', exportHelp);
  }
  if (backupDiffCloseButtonEl) {
    const closeLabel = texts[lang].versionCompareClose
      || texts[lang].cancelSettings
      || 'Close';
    setButtonLabelWithIcon(backupDiffCloseButtonEl, closeLabel, ICON_GLYPHS.circleX);
  }
  if (backupSettingsButton) {
    const backupLabel = texts[lang].backupSettings;
    setButtonLabelWithIcon(backupSettingsButton, backupLabel, ICON_GLYPHS.fileExport);
    const backupHelp =
      texts[lang].backupSettingsHelp || backupLabel;
    backupSettingsButton.setAttribute("data-help", backupHelp);
    backupSettingsButton.setAttribute("title", backupHelp);
    backupSettingsButton.setAttribute("aria-label", backupHelp);
  }
  if (restoreSettings) {
    const restoreLabel = texts[lang].restoreSettings;
    setButtonLabelWithIcon(restoreSettings, restoreLabel, ICON_GLYPHS.fileImport);
    const restoreHelp =
      texts[lang].restoreSettingsHelp || restoreLabel;
    restoreSettings.setAttribute("data-help", restoreHelp);
    restoreSettings.setAttribute("title", restoreHelp);
    restoreSettings.setAttribute("aria-label", restoreHelp);
  }
  if (restoreRehearsalButton) {
    const rehearsalLabel = texts[lang].restoreRehearsalButton || 'Restore rehearsal';
    setButtonLabelWithIcon(restoreRehearsalButton, rehearsalLabel, ICON_GLYPHS.load);
    const rehearsalHelp = texts[lang].restoreRehearsalButtonHelp || rehearsalLabel;
    restoreRehearsalButton.setAttribute('data-help', rehearsalHelp);
    restoreRehearsalButton.setAttribute('title', rehearsalHelp);
    restoreRehearsalButton.setAttribute('aria-label', rehearsalHelp);
  }
  if (restoreRehearsalHeading) {
    restoreRehearsalHeading.textContent = texts[lang].restoreRehearsalHeading || restoreRehearsalHeading.textContent;
  }
  if (restoreRehearsalIntro) {
    restoreRehearsalIntro.textContent = texts[lang].restoreRehearsalIntro || restoreRehearsalIntro.textContent;
  }
  if (restoreRehearsalModeLabel) {
    restoreRehearsalModeLabel.textContent = texts[lang].restoreRehearsalModeLabel || restoreRehearsalModeLabel.textContent;
  }
  if (restoreRehearsalModeBackupText) {
    restoreRehearsalModeBackupText.textContent = texts[lang].restoreRehearsalModeBackup || restoreRehearsalModeBackupText.textContent;
  }
  if (restoreRehearsalModeProjectText) {
    restoreRehearsalModeProjectText.textContent = texts[lang].restoreRehearsalModeProject || restoreRehearsalModeProjectText.textContent;
  }
  if (restoreRehearsalFileLabel) {
    restoreRehearsalFileLabel.textContent = texts[lang].restoreRehearsalFileLabel || restoreRehearsalFileLabel.textContent;
  }
  if (restoreRehearsalBrowse) {
    const browseLabel = texts[lang].restoreRehearsalFileButton || 'Choose file';
    setButtonLabelWithIcon(restoreRehearsalBrowse, browseLabel, ICON_GLYPHS.fileImport);
    restoreRehearsalBrowse.setAttribute('data-help', browseLabel);
    restoreRehearsalBrowse.setAttribute('title', browseLabel);
    restoreRehearsalBrowse.setAttribute('aria-label', browseLabel);
  }
  if (restoreRehearsalFileName) {
    restoreRehearsalFileName.textContent = texts[lang].restoreRehearsalNoFile || restoreRehearsalFileName.textContent;
  }
  if (restoreRehearsalStatus) {
    restoreRehearsalStatus.textContent = texts[lang].restoreRehearsalReady || '';
  }
  if (restoreRehearsalRuleHeading) {
    restoreRehearsalRuleHeading.textContent = texts[lang].restoreRehearsalRuleHeading
      || texts.en?.restoreRehearsalRuleHeading
      || restoreRehearsalRuleHeading.textContent;
  }
  if (restoreRehearsalRuleIntro) {
    restoreRehearsalRuleIntro.textContent = texts[lang].restoreRehearsalRuleIntro
      || texts.en?.restoreRehearsalRuleIntro
      || restoreRehearsalRuleIntro.textContent;
  }
  if (restoreRehearsalRuleEmpty) {
    restoreRehearsalRuleEmpty.textContent = texts[lang].restoreRehearsalRuleEmpty
      || texts.en?.restoreRehearsalRuleEmpty
      || restoreRehearsalRuleEmpty.textContent;
  }
  if (restoreRehearsalTableCaption) {
    restoreRehearsalTableCaption.textContent = texts[lang].restoreRehearsalTableCaption || restoreRehearsalTableCaption.textContent;
  }
  if (restoreRehearsalMetricHeader) {
    restoreRehearsalMetricHeader.textContent = texts[lang].restoreRehearsalMetricColumn || restoreRehearsalMetricHeader.textContent;
  }
  if (restoreRehearsalLiveHeader) {
    restoreRehearsalLiveHeader.textContent = texts[lang].restoreRehearsalLiveColumn || restoreRehearsalLiveHeader.textContent;
  }
  if (restoreRehearsalSandboxHeader) {
    restoreRehearsalSandboxHeader.textContent = texts[lang].restoreRehearsalSandboxColumn || restoreRehearsalSandboxHeader.textContent;
  }
  if (restoreRehearsalDifferenceHeader) {
    restoreRehearsalDifferenceHeader.textContent = texts[lang].restoreRehearsalDifferenceColumn || restoreRehearsalDifferenceHeader.textContent;
  }
  const resolvedRestoreRehearsalCloseButton =
    typeof restoreRehearsalCloseButton !== 'undefined'
      ? restoreRehearsalCloseButton
      : resolveElement('restoreRehearsalCloseButton', 'restoreRehearsalClose');

  if (resolvedRestoreRehearsalCloseButton) {
    const closeLabel = texts[lang].restoreRehearsalClose || texts[lang].cancelSettings || 'Close';
    setButtonLabelWithIcon(resolvedRestoreRehearsalCloseButton, closeLabel, ICON_GLYPHS.circleX);
    resolvedRestoreRehearsalCloseButton.setAttribute('title', closeLabel);
    resolvedRestoreRehearsalCloseButton.setAttribute('aria-label', closeLabel);
  }
  if (restoreRehearsalProceedButton) {
    const proceedLabel = texts[lang].restoreRehearsalProceed
      || texts.en?.restoreRehearsalProceed
      || 'Continue rehearsal restore';
    const proceedHelp = texts[lang].restoreRehearsalProceedHelp
      || texts.en?.restoreRehearsalProceedHelp
      || proceedLabel;
    setButtonLabelWithIcon(restoreRehearsalProceedButton, proceedLabel, ICON_GLYPHS.check);
    restoreRehearsalProceedButton.setAttribute('data-help', proceedHelp);
    restoreRehearsalProceedButton.setAttribute('title', proceedHelp);
    restoreRehearsalProceedButton.setAttribute('aria-label', proceedHelp);
  }
  if (restoreRehearsalAbortButton) {
    const abortLabel = texts[lang].restoreRehearsalAbort
      || texts.en?.restoreRehearsalAbort
      || 'Abort rehearsal';
    const abortHelp = texts[lang].restoreRehearsalAbortHelp
      || texts.en?.restoreRehearsalAbortHelp
      || abortLabel;
    setButtonLabelWithIcon(restoreRehearsalAbortButton, abortLabel, ICON_GLYPHS.circleX);
    restoreRehearsalAbortButton.setAttribute('data-help', abortHelp);
    restoreRehearsalAbortButton.setAttribute('title', abortHelp);
    restoreRehearsalAbortButton.setAttribute('aria-label', abortHelp);
  }
  if (factoryResetButton) {
    const resetLabel = texts[lang].factoryResetButton || "Factory reset";
    const resetHelp =
      texts[lang].factoryResetButtonHelp || resetLabel;
    setButtonLabelWithIcon(factoryResetButton, resetLabel, ICON_GLYPHS.reload);
    factoryResetButton.setAttribute("data-help", resetHelp);
    factoryResetButton.setAttribute("title", resetHelp);
    factoryResetButton.setAttribute("aria-label", resetHelp);
  }
  const aboutHeading = document.getElementById("aboutHeading");
  if (aboutHeading) {
    aboutHeading.textContent = texts[lang].aboutHeading;
    aboutHeading.setAttribute(
      "data-help",
      texts[lang].aboutHeadingHelp || texts[lang].aboutHeading
    );
  }
  const aboutVersionElem =
    typeof document !== 'undefined' ? document.getElementById('aboutVersion') : null;
  if (aboutVersionElem)
    aboutVersionElem.textContent = `${texts[lang].versionLabel} ${APP_VERSION}`;
  const supportLink =
    typeof document !== 'undefined' ? document.getElementById('supportLink') : null;
  if (supportLink) {
    supportLink.textContent = texts[lang].supportLink;
    const supportHelp =
      texts[lang].supportLinkHelp || texts[lang].supportLink;
    supportLink.setAttribute("data-help", supportHelp);
    supportLink.setAttribute("title", supportHelp);
  }
  if (settingsSave) {
    const label = texts[lang].saveSettings || texts.en?.saveSettings || settingsSave.textContent;
    setButtonLabelWithIcon(settingsSave, label);
    const saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || label;
    settingsSave.setAttribute("data-help", saveHelp);
    settingsSave.setAttribute("title", saveHelp);
    settingsSave.setAttribute("aria-label", saveHelp);
  }
  if (settingsCancel) {
    const cancelLabel =
      texts[lang].cancelSettings || texts.en?.cancelSettings || settingsCancel.textContent;
    setButtonLabelWithIcon(settingsCancel, cancelLabel, ICON_GLYPHS.circleX);
    const cancelHelp =
      texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || cancelLabel;
    settingsCancel.setAttribute("data-help", cancelHelp);
    settingsCancel.setAttribute("title", cancelHelp);
    settingsCancel.setAttribute("aria-label", cancelHelp);
  }
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    const menuLabel =
      texts[lang].menuToggleLabel ||
      texts.en?.menuToggleLabel ||
      menuToggle.getAttribute("aria-label") ||
      "Menu";
    const closeLabel =
      texts[lang].sideMenuClose ||
      texts.en?.sideMenuClose ||
      menuToggle.dataset.closeLabel ||
      "Close menu";
    const closeHelp = texts[lang].sideMenuCloseHelp || closeLabel;
    menuToggle.setAttribute("title", menuLabel);
    menuToggle.setAttribute("aria-label", menuLabel);
    const menuHelp = texts[lang].menuToggleHelp || menuLabel;
    menuToggle.setAttribute("data-help", menuHelp);
    menuToggle.dataset.menuLabel = menuLabel;
    menuToggle.dataset.menuHelp = menuHelp;
    menuToggle.dataset.closeLabel = closeLabel;
    menuToggle.dataset.closeHelp = closeHelp;
  }
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu) {
    const sideMenuHelp = texts[lang].sideMenuHelp;
    if (sideMenuHelp) {
      sideMenu.setAttribute("data-help", sideMenuHelp);
    } else {
      sideMenu.removeAttribute("data-help");
    }
  }
  const sideMenuTitle = document.getElementById("sideMenuTitle");
  if (sideMenuTitle) {
    const titleLabel =
      texts[lang].sideMenuTitle ||
      texts.en?.sideMenuTitle ||
      sideMenuTitle.textContent;
    sideMenuTitle.textContent = titleLabel;
    const titleHelp =
      texts[lang].sideMenuTitleHelp ||
      texts[lang].sideMenuHelp ||
      titleLabel;
    sideMenuTitle.setAttribute("data-help", titleHelp);
  }
  const closeMenuButton = document.getElementById("closeMenuButton");
  const closeMenuLabel = document.getElementById("closeMenuLabel");
  if (closeMenuButton) {
    const closeLabel =
      texts[lang].sideMenuClose ||
      texts.en?.sideMenuClose ||
      closeMenuButton.getAttribute("aria-label") ||
      "Close menu";
    const closeHelp = texts[lang].sideMenuCloseHelp || closeLabel;
    closeMenuButton.setAttribute("aria-label", closeLabel);
    closeMenuButton.setAttribute("title", closeHelp);
    closeMenuButton.setAttribute("data-help", closeHelp);
    if (closeMenuLabel) {
      closeMenuLabel.textContent = closeLabel;
    }
  }
  if (reloadButton) {
    reloadButton.setAttribute("title", texts[lang].reloadAppLabel);
    reloadButton.setAttribute("aria-label", texts[lang].reloadAppLabel);
    reloadButton.setAttribute(
      "data-help",
      texts[lang].reloadAppHelp || texts[lang].reloadAppLabel
    );
  }
  if (featureSearch) {
    featureSearch.setAttribute("placeholder", texts[lang].featureSearchPlaceholder);
    featureSearch.setAttribute("aria-label", texts[lang].featureSearchLabel);
    featureSearch.setAttribute(
      "data-help",
      texts[lang].featureSearchHelp || texts[lang].featureSearchLabel
    );
  }
    if (helpButton) {
      helpButton.setAttribute(
        "title",
        texts[lang].helpButtonTitle || texts[lang].helpButtonLabel
      );
      helpButton.setAttribute("aria-label", texts[lang].helpButtonLabel);
      helpButton.setAttribute(
        "data-help",
        texts[lang].helpButtonHelp ||
          texts[lang].helpButtonTitle ||
          texts[lang].helpButtonLabel
      );
      const helpShortcutList = texts[lang].helpButtonShortcuts;
      if (typeof helpShortcutList === 'string' && helpShortcutList.trim()) {
        helpButton.setAttribute('data-shortcuts', helpShortcutList);
      } else {
        helpButton.removeAttribute('data-shortcuts');
      }
      const helpAriaShortcuts =
        texts[lang].helpButtonAriaShortcuts ||
        'F1 Control+Slash Meta+Slash Shift+Slash KeyH';
      if (typeof helpAriaShortcuts === 'string' && helpAriaShortcuts.trim()) {
        helpButton.setAttribute('aria-keyshortcuts', helpAriaShortcuts);
      } else {
        helpButton.removeAttribute('aria-keyshortcuts');
      }
    if (hoverHelpButton) {
    setButtonLabelWithIcon(hoverHelpButton, texts[lang].hoverHelpButtonLabel, ICON_GLYPHS.note);
    hoverHelpButton.setAttribute("aria-label", texts[lang].hoverHelpButtonLabel);
    hoverHelpButton.setAttribute(
      "data-help",
      texts[lang].hoverHelpButtonHelp || texts[lang].hoverHelpButtonLabel
    );
    }
    if (helpSearch) {
      helpSearch.setAttribute("placeholder", texts[lang].helpSearchPlaceholder);
      helpSearch.setAttribute("aria-label", texts[lang].helpSearchLabel);
      helpSearch.setAttribute(
        "data-help",
        texts[lang].helpSearchHelp || texts[lang].helpSearchLabel
      );
    }
    if (helpSearchClear) {
      helpSearchClear.setAttribute("title", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute("aria-label", texts[lang].helpSearchClear);
      helpSearchClear.setAttribute(
        "data-help",
        texts[lang].helpSearchClearHelp || texts[lang].helpSearchClear
      );
    }
    if (closeHelpBtn) {
      setButtonLabelWithIcon(closeHelpBtn, texts[lang].helpClose, ICON_GLYPHS.circleX);
      closeHelpBtn.setAttribute("title", texts[lang].helpClose);
      closeHelpBtn.setAttribute("aria-label", texts[lang].helpClose);
      closeHelpBtn.setAttribute(
        "data-help",
        texts[lang].helpCloseHelp || texts[lang].helpClose
      );
    }
    if (document.getElementById("helpTitle")) {
      document.getElementById("helpTitle").textContent = texts[lang].helpTitle;
    }
    if (helpNoResults) helpNoResults.textContent = texts[lang].helpNoResults;
    if (typeof updateHelpResultsSummaryText === 'function') {
      updateHelpResultsSummaryText();
    }
    if (typeof updateHelpQuickLinksForLanguage === 'function') {
      updateHelpQuickLinksForLanguage(lang);
    }
  }

  // NEW SETUP MANAGEMENT BUTTONS TEXTS
  setButtonLabelWithIcon(
    document.getElementById("generateOverviewBtn"),
    texts[lang].generateOverviewBtn,
    ICON_GLYPHS.overview
  );
  setButtonLabelWithIcon(
    document.getElementById("generateGearListBtn"),
    texts[lang].generateGearListBtn,
    ICON_GLYPHS.gearList
  );
  setButtonLabelWithIcon(
    document.getElementById("shareSetupBtn"),
    texts[lang].shareSetupBtn,
    ICON_GLYPHS.fileExport
  );
  const exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) {
    setButtonLabelWithIcon(exportRevert, texts[lang].exportAndRevertBtn, ICON_GLYPHS.reload);
    exportRevert.setAttribute('data-help', texts[lang].exportAndRevertBtnHelp);
  }

  const downloadDiagramButton =
    (typeof downloadDiagramBtn !== 'undefined' && downloadDiagramBtn)
    || (
      typeof document !== 'undefined'
        && document
        && typeof document.getElementById === 'function'
          ? document.getElementById('downloadDiagram')
          : null
    );

  if (downloadDiagramButton) {
    downloadDiagramButton.textContent = texts[lang].downloadDiagramBtn;
    downloadDiagramButton.setAttribute("title", texts[lang].downloadDiagramBtn);
    downloadDiagramButton.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
    downloadDiagramButton.setAttribute("data-help", texts[lang].downloadDiagramHelp);
  }
  if (gridSnapToggleBtn) {
    setButtonLabelWithIcon(gridSnapToggleBtn, texts[lang].gridSnapToggle, ICON_GLYPHS.magnet);
    gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
    let snapActive = false;
    try {
      snapActive = Boolean(getGridSnapState());
    } catch (gridSnapReadError) {
      void gridSnapReadError;
      try {
        snapActive = Boolean(gridSnap);
      } catch (legacyGridSnapError) {
        void legacyGridSnapError;
      }
    }
    gridSnapToggleBtn.setAttribute('aria-pressed', snapActive ? 'true' : 'false');
  }
  const resetViewBtn =
    typeof document !== 'undefined' ? document.getElementById('resetView') : null;
  if (resetViewBtn) {
    setButtonLabelWithIcon(resetViewBtn, texts[lang].resetViewBtn, ICON_GLYPHS.resetView);
    resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
  }
  const zoomInBtn =
    typeof document !== 'undefined' ? document.getElementById('zoomIn') : null;
  if (zoomInBtn) {
    setButtonLabelWithIcon(zoomInBtn, '', ICON_GLYPHS.add);
    zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
  }
  const zoomOutBtn =
    typeof document !== 'undefined' ? document.getElementById('zoomOut') : null;
  if (zoomOutBtn) {
    setButtonLabelWithIcon(zoomOutBtn, '', ICON_GLYPHS.minus);
    zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
  }
  const diagramHint =
    typeof document !== 'undefined' ? document.getElementById('diagramHint') : null;
  if (diagramHint) {
    diagramHint.textContent = texts[lang].diagramMoveHint;
  }
  const fallbackProjectForm = texts.en && texts.en.projectForm ? texts.en.projectForm : {};
  const projectFormTexts = texts[lang].projectForm || fallbackProjectForm;
  if (projectFormTexts) {
    const setLabelText = (element, key) => {
      if (!element) return;
      const value = projectFormTexts[key] || fallbackProjectForm[key];
      if (value) element.textContent = value;
    };
    setLabelText(projectDialogHeading, 'heading');
    setLabelText(projectNameLabel, 'projectName');
    setLabelText(productionCompanyLabel, 'productionCompany');
    setLabelText(rentalHouseLabel, 'rentalHouse');
    setLabelText(crewHeadingElem, 'crewHeading');
    if (crewLabelElem) {
      const crewLabelText = projectFormTexts.crewHeading || fallbackProjectForm.crewHeading;
      if (crewLabelText) {
        crewLabelElem.textContent = `${crewLabelText}:`;
      }
    }
    setLabelText(prepLabelElem, 'prepLabel');
    setLabelText(shootLabelElem, 'shootLabel');
    setLabelText(deliveryResolutionLabel, 'deliveryResolution');
    setLabelText(recordingResolutionLabel, 'recordingResolution');
    setLabelText(sensorModeLabel, 'sensorMode');
    setLabelText(aspectRatioLabel, 'aspectRatio');
    setLabelText(codecLabel, 'codec');
    setLabelText(baseFrameRateLabel, 'baseFrameRate');
    setLabelText(lensesHeadingElem, 'lensesHeading');
    setLabelText(lensesLabelElem, 'lensesLabel');
    setLabelText(riggingHeadingElem, 'riggingHeading');
    setLabelText(requiredScenariosLabel, 'requiredScenarios');
    setLabelText(cameraHandleLabel, 'cameraHandle');
    setLabelText(viewfinderExtensionLabel, 'viewfinderExtension');
    setLabelText(matteboxFilterHeadingElem, 'matteboxFilterHeading');
    setLabelText(matteboxLabel, 'mattebox');
    setLabelText(filterLabel, 'filter');
    setLabelText(monitoringHeadingElem, 'monitoringHeading');
    setLabelText(monitoringConfigurationLabel, 'monitoringConfiguration');
    setLabelText(viewfinderSettingsLabel, 'viewfinderSettings');
    setLabelText(frameGuidesLabel, 'frameGuides');
    setLabelText(aspectMaskOpacityLabel, 'aspectMaskOpacity');
    setLabelText(videoDistributionLabel, 'videoDistribution');
    setLabelText(monitorUserButtonsLabel, 'monitorUserButtons');
    setLabelText(cameraUserButtonsLabel, 'cameraUserButtons');
    setLabelText(viewfinderUserButtonsLabel, 'viewfinderUserButtons');
    setLabelText(tripodPreferencesHeading, 'tripodPreferencesHeading');
    setLabelText(tripodHeadBrandLabel, 'tripodHeadBrand');
    setLabelText(tripodBowlLabel, 'tripodBowl');
    setLabelText(tripodTypesLabel, 'tripodTypes');
    setLabelText(tripodSpreaderLabel, 'tripodSpreader');
    if (viewfinderExtensionSelect && viewfinderExtensionSelect.options.length >= 2) {
      const noneLabel = projectFormTexts.viewfinderExtensionNone || fallbackProjectForm.viewfinderExtensionNone;
      const yesLabel = projectFormTexts.viewfinderExtensionYes || fallbackProjectForm.viewfinderExtensionYes;
      if (noneLabel) viewfinderExtensionSelect.options[0].textContent = noneLabel;
      if (yesLabel) viewfinderExtensionSelect.options[1].textContent = yesLabel;
    }
      const projectCancelButton =
        typeof document !== 'undefined'
          ? document.getElementById('projectCancel')
          : null;
      const cancelText =
        projectFormTexts.cancel ||
        fallbackProjectForm.cancel ||
        (projectCancelButton
          ? projectCancelButton.textContent
          : projectDialogCloseBtn?.getAttribute('aria-label')) ||
        'Cancel';
      if (projectCancelButton) {
        setButtonLabelWithIcon(projectCancelButton, cancelText, ICON_GLYPHS.circleX);
      }
    if (projectDialogCloseBtn) {
      projectDialogCloseBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
      projectDialogCloseBtn.setAttribute('aria-label', cancelText);
      projectDialogCloseBtn.setAttribute('title', cancelText);
      projectDialogCloseBtn.setAttribute('data-help', cancelText);
    }
    if (projectSubmitBtn) {
      const submitText = projectFormTexts.submit || fallbackProjectForm.submit;
      if (submitText) {
        setButtonLabelWithIcon(projectSubmitBtn, submitText, ICON_GLYPHS.check);
        projectSubmitBtn.setAttribute('aria-label', submitText);
      }
    }
    const crewPlaceholders = {
      name: projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder,
      phone: projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder,
      email: projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder
    };
    const crewRoleLabels = texts[lang].crewRoles || (texts.en && texts.en.crewRoles) || {};
    document.querySelectorAll('#crewContainer .person-row').forEach(row => {
      const roleSelect = row.querySelector('select');
      if (roleSelect) {
        const currentValue = roleSelect.value;
        Array.from(roleSelect.options).forEach(opt => {
          const roleKey = opt.value;
          opt.textContent = crewRoleLabels[roleKey] || roleKey;
        });
        roleSelect.value = currentValue;
      }
      const nameInput = row.querySelector('.person-name');
      if (nameInput && crewPlaceholders.name) nameInput.placeholder = crewPlaceholders.name;
      const phoneInput = row.querySelector('.person-phone');
      if (phoneInput && crewPlaceholders.phone) phoneInput.placeholder = crewPlaceholders.phone;
      const emailInput = row.querySelector('.person-email');
      if (emailInput && crewPlaceholders.email) emailInput.placeholder = crewPlaceholders.email;
    });
    const stripTrailingPunctuation = value => (typeof value === 'string' ? value.replace(/[\s\u00a0]*[:：]\s*$/, '') : value);
    const addEntryLabel = projectFormTexts.addEntry || fallbackProjectForm.addEntry || 'Add';
    if (addPersonBtn) {
      const crewLabel = stripTrailingPunctuation(projectFormTexts.crewHeading || fallbackProjectForm.crewHeading || 'Crew');
      const label = `${addEntryLabel} ${crewLabel}`.trim();
      setButtonLabelWithIcon(addPersonBtn, label, ICON_GLYPHS.add);
      addPersonBtn.setAttribute('aria-label', label);
      addPersonBtn.setAttribute('data-help', label);
    }
    if (addPrepBtn) {
      const prepLabel = stripTrailingPunctuation(projectFormTexts.prepLabel || fallbackProjectForm.prepLabel || 'Prep');
      const label = `${addEntryLabel} ${prepLabel}`.trim();
      setButtonLabelWithIcon(addPrepBtn, label, ICON_GLYPHS.add);
      addPrepBtn.setAttribute('aria-label', label);
      addPrepBtn.setAttribute('data-help', label);
    }
    if (addShootBtn) {
      const shootLabel = stripTrailingPunctuation(projectFormTexts.shootLabel || fallbackProjectForm.shootLabel || 'Shoot');
      const label = `${addEntryLabel} ${shootLabel}`.trim();
      setButtonLabelWithIcon(addShootBtn, label, ICON_GLYPHS.add);
      addShootBtn.setAttribute('aria-label', label);
      addShootBtn.setAttribute('data-help', label);
    }
  }
  if (iosPwaHelpTitle) iosPwaHelpTitle.textContent = texts[lang].iosPwaHelpTitle;
  if (iosPwaHelpIntro) iosPwaHelpIntro.textContent = texts[lang].iosPwaHelpIntro;
  if (iosPwaHelpStep1) iosPwaHelpStep1.textContent = texts[lang].iosPwaHelpStep1;
  if (iosPwaHelpStep2) iosPwaHelpStep2.textContent = texts[lang].iosPwaHelpStep2;
  if (iosPwaHelpStep3) iosPwaHelpStep3.textContent = texts[lang].iosPwaHelpStep3;
  if (iosPwaHelpStep4) iosPwaHelpStep4.textContent = texts[lang].iosPwaHelpStep4;
  if (iosPwaHelpNote) iosPwaHelpNote.textContent = texts[lang].iosPwaHelpNote;
  if (iosPwaHelpClose) {
    const closeText = texts[lang].iosPwaHelpClose;
    setButtonLabelWithIcon(iosPwaHelpClose, closeText, ICON_GLYPHS.check);
    iosPwaHelpClose.setAttribute('aria-label', closeText);
  }

  document.querySelectorAll('.favorite-toggle').forEach(btn => {
    btn.setAttribute('aria-label', texts[lang].favoriteToggleLabel);
    btn.setAttribute('title', texts[lang].favoriteToggleLabel);
    btn.setAttribute(
      'data-help',
      texts[lang].favoriteToggleHelp || texts[lang].favoriteToggleLabel
    );
  });
  ensureGearListActions();
  updateDiagramLegend();
  updateStorageSummary();
  callCoreFunctionIfAvailable('populateFeatureSearch', [], { defer: true });
}

// Reference elements (DOM Elements)
var cameraSelect    = document.getElementById("cameraSelect");
var monitorSelect   = document.getElementById("monitorSelect");
var videoSelect     = document.getElementById("videoSelect");
var videoDistributionSelect = document.getElementById("videoDistribution");
var cageSelect      = document.getElementById("cageSelect");
var motorSelects    = [
  document.getElementById("motor1Select"),
  document.getElementById("motor2Select"),
  document.getElementById("motor3Select"),
  document.getElementById("motor4Select")
];
var controllerSelects = [
  document.getElementById("controller1Select"),
  document.getElementById("controller2Select"),
  document.getElementById("controller3Select"),
  document.getElementById("controller4Select")
];
var distanceSelect = document.getElementById("distanceSelect");
var batterySelect  = document.getElementById("batterySelect");
var hotswapSelect  = document.getElementById("batteryHotswapSelect");
var lensSelect     = document.getElementById("lenses");
var requiredScenariosSelect = document.getElementById("requiredScenarios");
var requiredScenariosSummary = document.getElementById("requiredScenariosSummary");
var remoteHeadOption = requiredScenariosSelect ?
  requiredScenariosSelect.querySelector('option[value="Remote Head"]') : null;
var tripodPreferencesSection = document.getElementById("tripodPreferencesSection");
var tripodPreferencesRow = document.getElementById("tripodPreferencesRow");
var tripodPreferencesHeading = document.getElementById("tripodPreferencesHeading");
var tripodHeadBrandSelect = document.getElementById("tripodHeadBrand");
var tripodBowlSelect = document.getElementById("tripodBowl");
var tripodTypesSelect = document.getElementById("tripodTypes");
var tripodSpreaderSelect = document.getElementById("tripodSpreader");
var monitoringConfigurationSelect = document.getElementById("monitoringConfiguration");
const viewfinderSettingsRow = document.getElementById("viewfinderSettingsRow");
const viewfinderExtensionRow = document.getElementById("viewfinderExtensionRow");
const projectDialogHeading = document.getElementById("projectDialogHeading");
var projectDialogCloseBtn = document.getElementById("projectDialogClose");
const projectNameLabel = document.getElementById("projectNameLabel");
const productionCompanyLabel = document.getElementById("productionCompanyLabel");
const rentalHouseLabel = document.getElementById("rentalHouseLabel");
const crewHeadingElem = document.getElementById("crewHeading");
const crewLabelElem = document.getElementById("crewLabel");
const prepLabelElem = document.getElementById("prepLabel");
const shootLabelElem = document.getElementById("shootLabel");
const deliveryResolutionLabel = document.getElementById("deliveryResolutionLabel");
const deliveryResolutionSelect = document.getElementById("deliveryResolution");
const recordingResolutionLabel = document.getElementById("recordingResolutionLabel");
const sensorModeLabel = document.getElementById("sensorModeLabel");
const aspectRatioLabel = document.getElementById("aspectRatioLabel");
const codecLabel = document.getElementById("codecLabel");
const baseFrameRateLabel = document.getElementById("baseFrameRateLabel");
const lensesHeadingElem = document.getElementById("lensesHeading");
const lensesLabelElem = document.getElementById("lensesLabel");
const riggingHeadingElem = document.getElementById("riggingHeading");
const requiredScenariosLabel = document.getElementById("requiredScenariosLabel");
const cameraHandleLabel = document.getElementById("cameraHandleLabel");
const viewfinderExtensionLabel = document.getElementById("viewfinderExtensionLabel");
const viewfinderExtensionSelect = document.getElementById("viewfinderExtension");
const matteboxFilterHeadingElem = document.getElementById("matteboxFilterHeading");
const matteboxLabel = document.getElementById("matteboxLabel");
const filterLabel = document.getElementById("filterLabel");
const monitoringHeadingElem = document.getElementById("monitoringHeading");
const monitoringConfigurationLabel = document.getElementById("monitoringConfigurationLabel");
const viewfinderSettingsLabel = document.getElementById("viewfinderSettingsLabel");
const frameGuidesLabel = document.getElementById("frameGuidesLabel");
const aspectMaskOpacityLabel = document.getElementById("aspectMaskOpacityLabel");
const videoDistributionLabel = document.getElementById("videoDistributionLabel");
const monitorUserButtonsLabel = document.getElementById("monitorUserButtonsLabel");
const cameraUserButtonsLabel = document.getElementById("cameraUserButtonsLabel");
const viewfinderUserButtonsLabel = document.getElementById("viewfinderUserButtonsLabel");
const tripodHeadBrandLabel = document.getElementById("tripodHeadBrandLabel");
const tripodBowlLabel = document.getElementById("tripodBowlLabel");
const tripodTypesLabel = document.getElementById("tripodTypesLabel");
const tripodSpreaderLabel = document.getElementById("tripodSpreaderLabel");
const projectSubmitBtn = document.getElementById("projectSubmit");
var crewContainer = document.getElementById("crewContainer");
const addPersonBtn = document.getElementById("addPersonBtn");
var prepContainer = document.getElementById("prepContainer");
const addPrepBtn = document.getElementById("addPrepBtn");
var shootContainer = document.getElementById("shootContainer");
const addShootBtn = document.getElementById("addShootBtn");

var monitoringConfigurationUserChanged = false;

var crewRoles = [
  // Production
  'Producer',
  'Production Manager',
  'Director',
  'Assistant Director',
  'Production Assistant',

  // Camera
  'DoP',
  'Camera Operator',
  'B-Camera Operator',
  'Steadicam Operator',
  'Drone Operator',
  '1st AC',
  '2nd AC',
  'DIT',
  'Video Operator',

  // Lighting
  'Key Gaffer',
  'Gaffer',
  'Best Boy Electric',
  'Electrician',
  'Rigging Gaffer',

  // Grip
  'Key Grip',
  'Best Boy Grip',
  'Grip',
  'Dolly Grip',
  'Rigging Grip'
];

var ICON_FONT_KEYS = Object.freeze({
  ESSENTIAL: 'essential',
  FILM: 'film',
  GADGET: 'gadget',
  UICONS: 'uicons',
  TEXT: 'text'
});

const VALID_ICON_FONTS = new Set(Object.values(ICON_FONT_KEYS));

function iconGlyph(char, font = ICON_FONT_KEYS.UICONS) {
  const normalizedFont = VALID_ICON_FONTS.has(font) ? font : ICON_FONT_KEYS.UICONS;
  return Object.freeze({ char, font: normalizedFont });
}

function resolveIconGlyph(glyph) {
  if (!glyph) {
    return { char: '', font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
  }
  if (glyph.markup) {
    const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
    return {
      markup: glyph.markup,
      className: glyph.className || '',
      font: ICON_FONT_KEYS.UICONS,
      size
    };
  }
  if (typeof glyph === 'string') {
    return { char: glyph, font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
  }
  if (typeof glyph === 'object') {
    const char = typeof glyph.char === 'string' ? glyph.char : '';
    const fontKey = glyph.font && VALID_ICON_FONTS.has(glyph.font)
      ? glyph.font
      : ICON_FONT_KEYS.UICONS;
    const className = typeof glyph.className === 'string' ? glyph.className : '';
    const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
    if (glyph.markup) {
      return {
        markup: glyph.markup,
        className,
        font: fontKey,
        size
      };
    }
    return { char, font: fontKey, className, size };
  }
  return { char: '', font: ICON_FONT_KEYS.UICONS, className: '', size: undefined };
}

function applyIconGlyph(element, glyph) {
  if (!element) return;
  const resolved = resolveIconGlyph(glyph);
  if (resolved.markup) {
    element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
    element.setAttribute('aria-hidden', 'true');
    if (resolved.className) {
      resolved.className
        .split(/\s+/)
        .filter(Boolean)
        .forEach(cls => element.classList.add(cls));
    }
    element.removeAttribute('data-icon-font');
    return;
  }
  const char = resolved.char || '';
  element.textContent = char;
  if (char) {
    element.setAttribute('data-icon-font', resolved.font);
  } else {
    element.removeAttribute('data-icon-font');
  }
}

function formatSvgCoordinate(value) {
  if (!Number.isFinite(value)) return '0';
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function positionSvgMarkup(markup, centerX, centerY, size = 24) {
  if (typeof markup !== 'string') {
    return { markup: '', x: '0', y: '0' };
  }
  const trimmed = markup.trim();
  if (!trimmed) {
    return { markup: '', x: '0', y: '0' };
  }
  const half = size / 2;
  const x = formatSvgCoordinate(centerX);
  const y = formatSvgCoordinate(centerY);
  const width = formatSvgCoordinate(size);
  const height = formatSvgCoordinate(size);
  const cleaned = trimmed.replace(/<svg\b([^>]*)>/i, (match, attrs = '') => {
    let attrText = attrs
      .replace(/\s+x\s*=\s*"[^"]*"/gi, '')
      .replace(/\s+y\s*=\s*"[^"]*"/gi, '')
      .trim();
    const additions = [];
    const hasWidth = /(?:^|\s)width\s*=/i.test(attrText);
    const hasHeight = /(?:^|\s)height\s*=/i.test(attrText);
    if (!hasWidth) additions.push(`width="${width}"`);
    if (!hasHeight) additions.push(`height="${height}"`);
    additions.push(`x="-${formatSvgCoordinate(half)}"`);
    additions.push(`y="-${formatSvgCoordinate(half)}"`);
    attrText = [attrText, ...additions].filter(Boolean).join(' ').trim();
    return attrText ? `<svg ${attrText}>` : '<svg>';
  });
  return { markup: cleaned, x, y };
}

function glyphText(glyph) {
  const resolved = resolveIconGlyph(glyph);
  return resolved.char || '';
}

const PRODUCTION_COMPANY_ICON = iconGlyph('\uE2D5', ICON_FONT_KEYS.UICONS);
const RENTAL_HOUSE_ICON = iconGlyph('\uEA09', ICON_FONT_KEYS.UICONS);
const ASPECT_RATIO_ICON = iconGlyph('\uE86E', ICON_FONT_KEYS.UICONS);
const REQUIRED_SCENARIOS_ICON = iconGlyph('\uF4D4', ICON_FONT_KEYS.UICONS);
const MONITORING_SUPPORT_ICON = iconGlyph('\uEFFC', ICON_FONT_KEYS.UICONS);

const STAR_ICON_SVG = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="0"
    />
  </svg>
`.trim();

var ICON_GLYPHS = Object.freeze({
  batteryBolt: iconGlyph('\uE1A6', ICON_FONT_KEYS.UICONS),
  batteryFull: iconGlyph('\uE1A9', ICON_FONT_KEYS.UICONS),
  bolt: iconGlyph('\uF1F8', ICON_FONT_KEYS.ESSENTIAL),
  plug: iconGlyph('\uEE75', ICON_FONT_KEYS.UICONS),
  sliders: iconGlyph('\uF143', ICON_FONT_KEYS.ESSENTIAL),
  screen: iconGlyph('\uF11D', ICON_FONT_KEYS.GADGET),
  brightness: iconGlyph('\uE2B3', ICON_FONT_KEYS.UICONS),
  wifi: iconGlyph('\uF4AC', ICON_FONT_KEYS.UICONS),
  gears: iconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS),
  controller: iconGlyph('\uF117', ICON_FONT_KEYS.GADGET),
  distance: iconGlyph('\uEFB9', ICON_FONT_KEYS.UICONS),
  sensor: iconGlyph('\uEC2B', ICON_FONT_KEYS.UICONS),
  viewfinder: iconGlyph('\uF114', ICON_FONT_KEYS.FILM),
  camera: iconGlyph('\uE333', ICON_FONT_KEYS.UICONS),
  trash: iconGlyph('\uF254', ICON_FONT_KEYS.ESSENTIAL),
  reload: iconGlyph('\uF202', ICON_FONT_KEYS.ESSENTIAL),
  load: iconGlyph('\uE0E0', ICON_FONT_KEYS.UICONS),
  installApp: iconGlyph('\uE9D4', ICON_FONT_KEYS.UICONS),
  add: Object.freeze({ char: '+', font: ICON_FONT_KEYS.TEXT, className: 'icon-text' }),
  minus: Object.freeze({ char: '−', font: ICON_FONT_KEYS.TEXT, className: 'icon-text' }),
  check: iconGlyph('\uE3D8', ICON_FONT_KEYS.UICONS),
  fileExport: iconGlyph('\uE7AB', ICON_FONT_KEYS.UICONS),
  fileImport: iconGlyph('\uE7C7', ICON_FONT_KEYS.UICONS),
  save: iconGlyph('\uF207', ICON_FONT_KEYS.ESSENTIAL),
  share: iconGlyph('\uF219', ICON_FONT_KEYS.ESSENTIAL),
  paperPlane: iconGlyph('\uED67', ICON_FONT_KEYS.UICONS),
  magnet: iconGlyph('\uF1B5', ICON_FONT_KEYS.ESSENTIAL),
  codec: iconGlyph('\uE4CD', ICON_FONT_KEYS.UICONS),
  timecode: iconGlyph('\uF10E', ICON_FONT_KEYS.FILM),
  audioIn: iconGlyph('\uF1C3', ICON_FONT_KEYS.ESSENTIAL),
  audioOut: iconGlyph('\uF22F', ICON_FONT_KEYS.ESSENTIAL),
  note: iconGlyph('\uF13E', ICON_FONT_KEYS.ESSENTIAL),
  overview: iconGlyph('\uF1F5', ICON_FONT_KEYS.UICONS),
  gearList: iconGlyph('\uE467', ICON_FONT_KEYS.UICONS),
  feedback: iconGlyph('\uE791', ICON_FONT_KEYS.UICONS),
  resetView: iconGlyph('\uEB6D', ICON_FONT_KEYS.UICONS),
  pin: iconGlyph('\uF1EF', ICON_FONT_KEYS.ESSENTIAL),
  sun: iconGlyph('\uF1FE', ICON_FONT_KEYS.UICONS),
  moon: iconGlyph('\uEC7E', ICON_FONT_KEYS.UICONS),
  circleX: iconGlyph('\uF131', ICON_FONT_KEYS.ESSENTIAL),
  settingsGeneral: iconGlyph('\uE5A3', ICON_FONT_KEYS.UICONS),
  settingsAutoGear: iconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS),
  settingsAccessibility: iconGlyph('\uF392', ICON_FONT_KEYS.UICONS),
  settingsBackup: iconGlyph('\uE5BD', ICON_FONT_KEYS.UICONS),
  settingsData: iconGlyph('\uE5C7', ICON_FONT_KEYS.UICONS),
  settingsAbout: iconGlyph('\uEA4F', ICON_FONT_KEYS.UICONS),
  star: Object.freeze({
    markup: STAR_ICON_SVG,
    className: 'icon-svg favorite-star-icon'
  }),
  warning: iconGlyph('\uF26F', ICON_FONT_KEYS.ESSENTIAL)
});

function iconMarkup(glyph, classNameOrOptions = 'info-icon', options = null) {
  if (!glyph) return '';
  let opts = {};
  let resolvedClassName = 'info-icon';
  if (typeof classNameOrOptions === 'string' || classNameOrOptions === null) {
    resolvedClassName = classNameOrOptions || '';
    if (options && typeof options === 'object') {
      opts = options;
    }
  } else if (classNameOrOptions && typeof classNameOrOptions === 'object') {
    opts = classNameOrOptions;
    resolvedClassName = classNameOrOptions.className || 'info-icon';
  }
  if (typeof opts.className === 'string') {
    resolvedClassName = opts.className;
  }
  const styleParts = [];
  if (typeof opts.size === 'string' && opts.size.trim()) {
    styleParts.push(`--icon-size: ${opts.size.trim()}`);
  }
  if (typeof opts.scale === 'string' && opts.scale.trim()) {
    styleParts.push(`--icon-scale: ${opts.scale.trim()}`);
  }
  if (typeof opts.style === 'string' && opts.style.trim()) {
    styleParts.push(opts.style.trim());
  }
  const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';
  const resolved = resolveIconGlyph(glyph);
  const classes = ['icon-glyph'];
  if (resolvedClassName) classes.unshift(resolvedClassName);
  if (resolved.markup) {
    if (resolved.className) classes.push(resolved.className);
    const markup = ensureSvgHasAriaHidden(resolved.markup);
    return `<span class="${classes.join(' ')}"${styleAttr} aria-hidden="true">${markup}</span>`;
  }
  const char = resolved.char || '';
  if (!char) return '';
  return `<span class="${classes.join(' ')}"${styleAttr} data-icon-font="${resolved.font}" aria-hidden="true">${char}</span>`;
}

const HORSE_ICON_SVG = `
  <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z"
      fill="#805333"
    />
    <path
      d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z"
      fill="#a56a43"
    />
    <path
      d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z"
      fill="#cb8252"
    />
    <circle cx="42" cy="26" r="3" fill="#2c2f38" />
    <circle cx="54" cy="43" r="1" fill="#805333" />
    <path
      d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"
      fill="#cf976a"
    />
    <circle cx="41" cy="25" r="1.25" fill="#ecf0f1" />
  </svg>
`.trim();

const PINK_MODE_ICON_FILES = Object.freeze([
  'src/illustrations/unicorns/unicorn.svg',
  'src/illustrations/unicorns/unicorn-2.svg',
  'src/illustrations/unicorns/celebrate.svg',
  'src/illustrations/unicorns/sunglasses.svg',
  'src/illustrations/unicorns/toy.svg'
]);

function createPinkModeIconImageMarkup(path) {
  if (typeof path !== 'string' || !path) {
    return '';
  }
  const safePath = escapeHtml(path);
  return `<img src="${safePath}" alt="" loading="lazy" decoding="async" aria-hidden="true" class="pink-mode-icon-image">`;
}

const PINK_MODE_ICON_FALLBACK_MARKUP = Object.freeze(
  PINK_MODE_ICON_FILES.map(createPinkModeIconImageMarkup).filter(Boolean)
);

const PINK_MODE_ANIMATED_ICON_FILES = Object.freeze([
  'src/animations/cat.json',
  'src/animations/cup.json',
  'src/animations/cupcake.json',
  'src/animations/flamingo.json',
  'src/animations/float.json',
  'src/animations/float-2.json',
  'src/animations/fox.json',
  'src/animations/heart.json',
  'src/animations/horn.json',
  'src/animations/invitation.json',
  'src/animations/mask.json',
  'src/animations/rainbow.json',
  'src/animations/rocking-horse.json',
  'src/animations/slippers.json',
  'src/animations/sunglasses.json',
  'src/animations/unicorn.json',
  'animated icons 3/camera.json',
  'animated icons 3/director-chair.json',
  'animated icons 3/dog.json',
  'animated icons 3/fox.json',
  'animated icons 3/fox-2.json',
  'animated icons 3/fox-3.json',
  'animated icons 3/horse.json',
  'animated icons 3/mountains.json',
  'animated icons 3/movie-camera.json',
  'animated icons 3/pinata.json',
  'animated icons 3/script.json',
  'animated icons 3/video-camera.json'
]);

const PINK_MODE_ICON_RAIN_MIN_COUNT = 12;
const PINK_MODE_ICON_RAIN_MAX_COUNT = 20;
const PINK_MODE_ICON_RAIN_MIN_DURATION_MS = 3600;
const PINK_MODE_ICON_RAIN_MAX_DURATION_MS = 5600;
const PINK_MODE_ICON_RAIN_MIN_SIZE_PX = 52;
const PINK_MODE_ICON_RAIN_MAX_SIZE_PX = 88;
const PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN = 12;
const PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX = 26;
const PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT = 0;
const PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN = -12;
const PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX = 12;
const PINK_MODE_ICON_RAIN_MIN_SCALE = 0.78;
const PINK_MODE_ICON_RAIN_MAX_SCALE = 1.12;
const PINK_MODE_ICON_RAIN_MAX_ACTIVE = 48;
const PINK_MODE_ICON_RAIN_COOLDOWN_MS = 12000;
const PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS = 960;

var pinkModeIcons = {
  off: Object.freeze({
    className: 'icon-svg pink-mode-icon',
    markup: HORSE_ICON_SVG
  }),
  onSequence: Object.freeze([])
};

var pinkModeIconRotationTimer = null;
var pinkModeIconIndex = 0;

const PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS = 14800;
const PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS = 23800;
const PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS = 6400;
const PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS = 10800;
const PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX = 72;
const PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX = 72;
const PINK_MODE_ANIMATED_ICON_MAX_ACTIVE = 4;
const PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS = 12;
const PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX = 28;
const PINK_MODE_ANIMATED_ICON_MIN_SCALE = 0.65;
const PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN = 920;
const PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="menu"]',
  '[role="dialog"]',
  '[role="listbox"]',
  '[role="combobox"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
  '.form-row',
  '.form-row-actions',
  '.form-actions',
  '.toolbar',
  '.controls',
  '.dialog',
  '.modal'
].join(', ');
const PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT = 6;
const PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX = 120;
const PINK_MODE_ANIMATED_ICON_PROBE_POINTS = Object.freeze([
  Object.freeze({ x: 0, y: 0 }),
  Object.freeze({ x: 0.35, y: 0 }),
  Object.freeze({ x: -0.35, y: 0 }),
  Object.freeze({ x: 0, y: 0.35 }),
  Object.freeze({ x: 0, y: -0.35 }),
  Object.freeze({ x: 0.25, y: 0.25 }),
  Object.freeze({ x: -0.25, y: 0.25 }),
  Object.freeze({ x: 0.25, y: -0.25 }),
  Object.freeze({ x: -0.25, y: -0.25 })
]);

let pinkModeAnimatedIconLayer = null;
let pinkModeIconRainLayer = null;
let pinkModeAnimatedIconTimeoutId = null;
let pinkModeAnimatedIconsActive = false;
let pinkModeAnimatedIconTemplates = null;
let pinkModeAnimatedIconTemplatesPromise = null;
const pinkModeAnimatedIconInstances = new Set();
let pinkModeAnimatedIconLastTemplateName = null;
const pinkModeAnimatedIconPlacementHistory = [];
const pinkModeIconRainInstances = new Set();
let pinkModeIconRainLastTriggeredAt = 0;
let pinkModeAnimatedIconPressListenerCleanup = null;
let pinkModeAnimatedIconLastTouchTime = 0;

const pinkModeReduceMotionQuery =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

function ensureSvgHasAriaHidden(markup) {
  if (typeof markup !== 'string') return '';
  const trimmed = markup.trim();
  if (!trimmed) return '';
  if (!/^<svg\b/i.test(trimmed)) return trimmed;
  if (/\baria-hidden\s*=\s*['"]/i.test(trimmed)) return trimmed;
  return trimmed.replace(/<svg\b/i, match => `${match} aria-hidden="true"`);
}

function normalizePinkModeIconMarkup(markup) {
  if (typeof markup !== 'string') return '';
  const trimmed = markup.trim();
  if (!trimmed) return '';
  // Preserve the original SVG colors for pink mode artwork instead of forcing
  // them to match the accent color.
  return trimmed;
}

function setPinkModeIconSequence(markupList) {
  if (!Array.isArray(markupList) || !markupList.length) {
    return false;
  }
  const configs = markupList
    .map(ensureSvgHasAriaHidden)
    .map(normalizePinkModeIconMarkup)
    .filter(Boolean)
    .map(markup =>
      Object.freeze({
        className: 'icon-svg pink-mode-icon',
        markup
      })
    );
  if (!configs.length) {
    return false;
  }
  pinkModeIcons.onSequence = Object.freeze(configs);
  if (
    typeof document !== 'undefined' &&
    document.body &&
    document.body.classList.contains('pink-mode')
  ) {
    if (typeof stopPinkModeIconRotation === 'function') {
      stopPinkModeIconRotation();
    }
    pinkModeIconIndex = 0;
    if (typeof applyPinkModeIcon === 'function') {
      applyPinkModeIcon(pinkModeIcons.onSequence[pinkModeIconIndex], { animate: false });
    }
    if (typeof startPinkModeIconRotation === 'function') {
      startPinkModeIconRotation();
    }
  }
  return true;
}

async function loadPinkModeIconsFromFiles() {
  if (typeof fetch !== 'function') {
    return;
  }
  const responses = await Promise.all(
    PINK_MODE_ICON_FILES.map(path =>
      fetch(path)
        .then(response => (response.ok ? response.text() : null))
        .catch(() => null)
    )
  );
  const markupList = responses.filter(Boolean);
  if (markupList.length) {
    setPinkModeIconSequence(markupList);
  }
}

async function loadPinkModeAnimatedIconTemplates() {
  if (pinkModeAnimatedIconTemplates) {
    return pinkModeAnimatedIconTemplates;
  }
  if (pinkModeAnimatedIconTemplatesPromise) {
    return pinkModeAnimatedIconTemplatesPromise;
  }
  if (typeof fetch !== 'function') {
    pinkModeAnimatedIconTemplates = Object.freeze([]);
    return pinkModeAnimatedIconTemplates;
  }
  pinkModeAnimatedIconTemplatesPromise = Promise.all(
    PINK_MODE_ANIMATED_ICON_FILES.map(path =>
      fetch(path)
        .then(response => (response.ok ? response.text() : null))
        .catch(() => null)
    )
  )
    .then(contents =>
      Object.freeze(
        contents
          .map((content, index) =>
            content
              ? Object.freeze({
                  name: PINK_MODE_ANIMATED_ICON_FILES[index],
                  data: content
                })
              : null
          )
          .filter(Boolean)
      )
    )
    .catch(error => {
      console.warn('Could not load pink mode animated icons', error);
      return Object.freeze([]);
    })
    .then(templates => {
      pinkModeAnimatedIconTemplates = templates;
      return templates;
    });
  return pinkModeAnimatedIconTemplatesPromise;
}

function ensurePinkModeAnimationLayer(options) {
  if (typeof document === 'undefined') {
    return null;
  }
  const useGlobalLayer = Boolean(options && options.global);
  const host = useGlobalLayer
    ? document.body || document.getElementById('mainContent')
    : document.getElementById('mainContent') || document.body;
  if (!host) {
    return null;
  }
  let layer = useGlobalLayer ? pinkModeIconRainLayer : pinkModeAnimatedIconLayer;
  if (layer && layer.isConnected && host.contains(layer)) {
    return layer;
  }
  if (layer && layer.parentNode) {
    layer.parentNode.removeChild(layer);
  }
  layer = document.createElement('div');
  layer.className = useGlobalLayer
    ? 'pink-mode-animation-layer pink-mode-animation-layer--global'
    : 'pink-mode-animation-layer';
  layer.setAttribute('aria-hidden', 'true');
  host.appendChild(layer);
  if (useGlobalLayer) {
    pinkModeIconRainLayer = layer;
  } else {
    pinkModeAnimatedIconLayer = layer;
  }
  return layer;
}

function computePinkModeAnimationAvoidRegions(layer) {
  if (
    typeof document === 'undefined' ||
    typeof document.querySelectorAll !== 'function'
  ) {
    return Object.freeze([]);
  }
  const elements = document.querySelectorAll(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR);
  if (!elements || !elements.length) {
    return Object.freeze([]);
  }
  const regions = [];
  for (const element of elements) {
    if (!element) {
      continue;
    }
    if (layer && layer.contains(element)) {
      continue;
    }
    if (typeof element.getBoundingClientRect !== 'function') {
      continue;
    }
    const rect = element.getBoundingClientRect();
    if (!rect) {
      continue;
    }
    const { width, height, left, right, top, bottom } = rect;
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      continue;
    }
    if (width <= 0 || height <= 0) {
      continue;
    }
    const margin = Math.max(
      PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
      Math.min(width, height) * 0.3
    );
    regions.push({ left, right, top, bottom, margin });
  }
  return Object.freeze(regions);
}

function collectPinkModeAnimationInstanceRegions(layer) {
  if (!pinkModeAnimatedIconInstances.size) {
    return Object.freeze([]);
  }
  const regions = [];
  for (const instance of pinkModeAnimatedIconInstances) {
    if (!instance || !instance.container) {
      continue;
    }
    const node = instance.container;
    if (!node.isConnected) {
      continue;
    }
    if (layer && node.parentNode && layer !== node.parentNode && !layer.contains(node)) {
      continue;
    }
    if (typeof node.getBoundingClientRect !== 'function') {
      continue;
    }
    const rect = node.getBoundingClientRect();
    if (!rect) {
      continue;
    }
    const { left, right, top, bottom, width, height } = rect;
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      continue;
    }
    if (width <= 0 || height <= 0) {
      continue;
    }
    const largestSide = Math.max(width, height);
    regions.push({
      left,
      right,
      top,
      bottom,
      margin: Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX * 1.25, largestSide * 0.6)
    });
  }
  return Object.freeze(regions);
}

function callPinkModeAnimatedIconPressHandler() {
  let handler = null;
  if (typeof window !== 'undefined' && typeof window.handlePinkModeIconPress === 'function') {
    handler = window.handlePinkModeIconPress;
  } else if (typeof handlePinkModeIconPress === 'function') {
    handler = handlePinkModeIconPress;
  }
  if (typeof handler === 'function') {
    try {
      handler();
      return true;
    } catch (error) {
      console.warn('Could not process pink mode icon press', error);
    }
  }
  return false;
}

function extractPinkModeAnimatedIconPoint(event) {
  if (!event) {
    return null;
  }
  if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
    return { x: event.clientX, y: event.clientY };
  }
  const touches =
    (event.touches && event.touches.length ? event.touches : null) ||
    (event.changedTouches && event.changedTouches.length ? event.changedTouches : null);
  if (touches) {
    const touch = touches[0];
    if (touch && typeof touch.clientX === 'number' && typeof touch.clientY === 'number') {
      return { x: touch.clientX, y: touch.clientY };
    }
  }
  return null;
}

function isPointWithinRect(point, rect) {
  if (!point || !rect) {
    return false;
  }
  const { x, y } = point;
  const { left, right, top, bottom } = rect;
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return false;
  }
  if (!Number.isFinite(left) || !Number.isFinite(right) || !Number.isFinite(top) || !Number.isFinite(bottom)) {
    return false;
  }
  return x >= left && x <= right && y >= top && y <= bottom;
}

function detectPinkModeAnimatedIconPress(point) {
  if (!point || !pinkModeAnimatedIconInstances.size) {
    return false;
  }
  const instances = Array.from(pinkModeAnimatedIconInstances);
  for (let index = instances.length - 1; index >= 0; index -= 1) {
    const instance = instances[index];
    if (!instance || instance.destroyed) {
      continue;
    }
    const container = instance.container;
    if (!container || !container.isConnected || typeof container.getBoundingClientRect !== 'function') {
      continue;
    }
    const rect = container.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) {
      continue;
    }
    if (isPointWithinRect(point, rect) && callPinkModeAnimatedIconPressHandler()) {
      return true;
    }
  }
  return false;
}

function handlePinkModeAnimatedIconPointerEvent(event) {
  if (!event || event.defaultPrevented || !event.isTrusted) {
    return;
  }
  if (typeof event.button === 'number' && event.button !== 0) {
    return;
  }
  const pointerType = typeof event.pointerType === 'string' ? event.pointerType.toLowerCase() : '';
  if (pointerType === 'touch' || pointerType === 'pen') {
    pinkModeAnimatedIconLastTouchTime = Date.now();
  } else {
    pinkModeAnimatedIconLastTouchTime = 0;
  }
  const point = extractPinkModeAnimatedIconPoint(event);
  if (!point) {
    return;
  }
  detectPinkModeAnimatedIconPress(point);
}

function handlePinkModeAnimatedIconMouseEvent(event) {
  if (!event || event.defaultPrevented || !event.isTrusted) {
    return;
  }
  if (typeof event.button === 'number' && event.button !== 0) {
    return;
  }
  if (pinkModeAnimatedIconLastTouchTime) {
    const now = Date.now();
    if (now - pinkModeAnimatedIconLastTouchTime < 450) {
      return;
    }
  }
  const point = extractPinkModeAnimatedIconPoint(event);
  if (!point) {
    return;
  }
  detectPinkModeAnimatedIconPress(point);
}

function handlePinkModeAnimatedIconTouchEvent(event) {
  if (!event || !event.isTrusted) {
    return;
  }
  pinkModeAnimatedIconLastTouchTime = Date.now();
  const point = extractPinkModeAnimatedIconPoint(event);
  if (!point) {
    return;
  }
  detectPinkModeAnimatedIconPress(point);
}

function teardownPinkModeAnimatedIconPressListener() {
  if (!pinkModeAnimatedIconPressListenerCleanup) {
    return;
  }
  try {
    pinkModeAnimatedIconPressListenerCleanup();
  } catch (cleanupError) {
    console.warn('Could not detach pink mode animation press listener', cleanupError);
  }
  pinkModeAnimatedIconPressListenerCleanup = null;
  pinkModeAnimatedIconLastTouchTime = 0;
}

function ensurePinkModeAnimatedIconPressListener() {
  if (pinkModeAnimatedIconPressListenerCleanup || typeof document === 'undefined') {
    return;
  }
  const target = document;
  if (!target) {
    return;
  }
  if (typeof window !== 'undefined' && typeof window.PointerEvent === 'function') {
    target.addEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
    pinkModeAnimatedIconPressListenerCleanup = () => {
      target.removeEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
      pinkModeAnimatedIconLastTouchTime = 0;
    };
    return;
  }
  target.addEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
  target.addEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
  pinkModeAnimatedIconPressListenerCleanup = () => {
    target.removeEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
    target.removeEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
    pinkModeAnimatedIconLastTouchTime = 0;
  };
}

function isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions) {
  if (
    typeof document === 'undefined' ||
    typeof document.elementFromPoint !== 'function'
  ) {
    return true;
  }
  const viewportWidth =
    typeof window !== 'undefined' && typeof window.innerWidth === 'number'
      ? window.innerWidth
      : document.documentElement && typeof document.documentElement.clientWidth === 'number'
        ? document.documentElement.clientWidth
        : null;
  const viewportHeight =
    typeof window !== 'undefined' && typeof window.innerHeight === 'number'
      ? window.innerHeight
      : document.documentElement && typeof document.documentElement.clientHeight === 'number'
        ? document.documentElement.clientHeight
        : null;
  const baseX = (hostRect ? hostRect.left : 0) + x;
  const baseY = (hostRect ? hostRect.top : 0) + y;
  const candidate = {
    left: baseX - size / 2,
    right: baseX + size / 2,
    top: baseY - size / 2,
    bottom: baseY + size / 2
  };

  if (Array.isArray(avoidRegions) && avoidRegions.length) {
    for (const region of avoidRegions) {
      if (!region) {
        continue;
      }
      const regionMargin =
        typeof region.margin === 'number'
          ? Math.max(
              PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
              size * 0.25,
              region.margin
            )
          : Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25);
      if (
        candidate.left < region.right + regionMargin &&
        candidate.right > region.left - regionMargin &&
        candidate.top < region.bottom + regionMargin &&
        candidate.bottom > region.top - regionMargin
      ) {
        return false;
      }
    }
  }

  for (const point of PINK_MODE_ANIMATED_ICON_PROBE_POINTS) {
    const sampleX = baseX + point.x * size;
    const sampleY = baseY + point.y * size;
    if (
      viewportWidth !== null && (sampleX < 0 || sampleX > viewportWidth)
    ) {
      continue;
    }
    if (
      viewportHeight !== null && (sampleY < 0 || sampleY > viewportHeight)
    ) {
      continue;
    }
    const elementsAtPoint =
      typeof document.elementsFromPoint === 'function'
        ? document.elementsFromPoint(sampleX, sampleY)
        : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);
    for (const element of elementsAtPoint) {
      if (!element) {
        continue;
      }
      if (layer && element === layer) {
        continue;
      }
      if (layer && layer.contains(element)) {
        return false;
      }
      if (
        (typeof element.matches === 'function' && element.matches(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR)) ||
        (typeof element.closest === 'function' && element.closest(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR))
      ) {
        return false;
      }
    }
  }
  return true;
}

function findPinkModeAnimationPlacement({
  layer,
  hostRect,
  hostTop,
  visibleTop,
  visibleBottom,
  horizontalPadding,
  verticalPadding,
  hostWidth,
  size,
  avoidRegions,
  leftMarginExtension = 0,
  rightMarginExtension = 0
}) {
  const minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
  const maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
  const marginLeft = Math.max(0, leftMarginExtension);
  const marginRight = Math.max(0, rightMarginExtension);
  const baseMinX = horizontalPadding;
  const baseMaxX = Math.max(hostWidth - horizontalPadding, baseMinX);
  const minX = baseMinX - marginLeft;
  const maxX = baseMaxX + marginRight;

  for (let attempt = 0; attempt < PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS; attempt += 1) {
    const y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
    const x = maxX > minX ? minX + Math.random() * (maxX - minX) : minX;
    if (isPinkModeAnimationSpotClear(layer, hostRect, x, y, size, avoidRegions)) {
      return { x, y };
    }
  }
  return null;
}

function destroyPinkModeAnimatedIconInstance(instance) {
  if (!instance || instance.destroyed) {
    return;
  }
  if (typeof instance.cleanup === 'function') {
    try {
      instance.cleanup();
    } catch (cleanupError) {
      console.warn('Could not detach pink mode animation interactions', cleanupError);
    }
    instance.cleanup = null;
  }
  instance.destroyed = true;
  if (instance.animation && typeof instance.animation.destroy === 'function') {
    try {
      instance.animation.destroy();
    } catch (error) {
      console.warn('Could not dispose pink mode animation', error);
    }
  }
  if (instance.container && instance.container.parentNode) {
    instance.container.parentNode.removeChild(instance.container);
  }
  pinkModeAnimatedIconInstances.delete(instance);
  if (!pinkModeAnimatedIconInstances.size) {
    teardownPinkModeAnimatedIconPressListener();
  }
}

function destroyPinkModeIconRainInstance(instance) {
  if (!instance || instance.destroyed) {
    return;
  }
  if (typeof instance.cleanup === 'function') {
    try {
      instance.cleanup();
    } catch (cleanupError) {
      console.warn('Could not detach pink mode rain interactions', cleanupError);
    }
    instance.cleanup = null;
  }
  instance.destroyed = true;
  if (instance.animation && typeof instance.animation.destroy === 'function') {
    try {
      instance.animation.destroy();
    } catch (error) {
      console.warn('Could not dispose pink mode rain animation', error);
    }
  }
  if (instance.container && instance.container.parentNode) {
    instance.container.parentNode.removeChild(instance.container);
  }
  pinkModeIconRainInstances.delete(instance);
  if (
    !pinkModeIconRainInstances.size &&
    pinkModeIconRainLayer &&
    pinkModeIconRainLayer.parentNode
  ) {
    pinkModeIconRainLayer.parentNode.removeChild(pinkModeIconRainLayer);
    pinkModeIconRainLayer = null;
  }
}

function spawnPinkModeIconRainInstance(templates) {
  if (
    !Array.isArray(templates) ||
    !templates.length ||
    typeof window === 'undefined' ||
    !window.lottie ||
    typeof window.lottie.loadAnimation !== 'function'
  ) {
    return false;
  }
  const layer = ensurePinkModeAnimationLayer({ global: true });
  if (!layer) {
    return false;
  }
  const sanitizedTemplates = templates.filter(Boolean);
  if (!sanitizedTemplates.length) {
    return false;
  }

  const activeTemplateNames = new Set();
  for (const instance of pinkModeIconRainInstances) {
    if (!instance) continue;
    const { templateName } = instance;
    if (typeof templateName === 'string' && templateName) {
      activeTemplateNames.add(templateName);
    }
  }
  for (const instance of pinkModeAnimatedIconInstances) {
    if (!instance) continue;
    const { templateName } = instance;
    if (typeof templateName === 'string' && templateName) {
      activeTemplateNames.add(templateName);
    }
  }

  let availableTemplates = sanitizedTemplates.filter(template => {
    if (!template || typeof template.name !== 'string') {
      return true;
    }
    return !activeTemplateNames.has(template.name);
  });

  if (!availableTemplates.length) {
    availableTemplates = sanitizedTemplates;
  }

  const template =
    availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  if (!template || !template.data) {
    return false;
  }

  const container = document.createElement('div');
  container.className = 'pink-mode-animation-instance pink-mode-icon-rain';
  container.setAttribute('aria-hidden', 'true');

  const size = Math.round(
    Math.random() * (PINK_MODE_ICON_RAIN_MAX_SIZE_PX - PINK_MODE_ICON_RAIN_MIN_SIZE_PX) +
      PINK_MODE_ICON_RAIN_MIN_SIZE_PX
  );
  container.style.setProperty('--pink-mode-animation-size', `${size}px`);

  let minHorizontalPercent = 0;
  let maxHorizontalPercent = 100;
  if (typeof window !== 'undefined' && window.visualViewport) {
    const viewport = window.visualViewport;
    const layoutWidth =
      typeof window.innerWidth === 'number' && window.innerWidth > 0
        ? window.innerWidth
        : typeof viewport.width === 'number' && viewport.width > 0
          ? viewport.width
          : 0;
    const visualWidth =
      typeof viewport.width === 'number' && viewport.width > 0
        ? viewport.width
        : layoutWidth;
    if (layoutWidth > 0 && visualWidth > 0) {
      const rawOffsetLeft =
        typeof viewport.offsetLeft === 'number'
          ? viewport.offsetLeft
          : typeof viewport.pageLeft === 'number'
            ? viewport.pageLeft
            : 0;
      const offsetLeft = Math.min(
        Math.max(rawOffsetLeft, 0),
        Math.max(layoutWidth - visualWidth, 0)
      );
      const offsetRight = Math.max(
        0,
        layoutWidth - visualWidth - offsetLeft
      );
      const computedMin = (offsetLeft / layoutWidth) * 100;
      const computedMax = 100 - (offsetRight / layoutWidth) * 100;
      if (
        Number.isFinite(computedMin) &&
        Number.isFinite(computedMax) &&
        computedMax > computedMin
      ) {
        minHorizontalPercent = Math.max(0, Math.min(100, computedMin));
        maxHorizontalPercent = Math.max(
          minHorizontalPercent,
          Math.min(100, computedMax)
        );
      }
    }
  }

  const horizontalMargin = Math.max(
    0,
    Math.min(40, PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT)
  );
  minHorizontalPercent = Math.max(minHorizontalPercent, horizontalMargin);
  maxHorizontalPercent = Math.min(100 - horizontalMargin, maxHorizontalPercent);
  if (maxHorizontalPercent <= minHorizontalPercent) {
    minHorizontalPercent = 0;
    maxHorizontalPercent = 100;
  }

  const horizontalPercent =
    Math.random() * (maxHorizontalPercent - minHorizontalPercent) +
    minHorizontalPercent;
  container.style.setProperty(
    '--pink-mode-animation-x',
    `${horizontalPercent.toFixed(2)}%`
  );

  const verticalOffset =
    Math.random() *
      (PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX -
        PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN) +
    PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN;
  container.style.setProperty(
    '--pink-mode-animation-y',
    `-${verticalOffset.toFixed(2)}vh`
  );

  const duration = Math.round(
    Math.random() *
      (PINK_MODE_ICON_RAIN_MAX_DURATION_MS - PINK_MODE_ICON_RAIN_MIN_DURATION_MS) +
      PINK_MODE_ICON_RAIN_MIN_DURATION_MS
  );
  container.style.setProperty('--pink-mode-rain-duration', `${duration}ms`);

  const scale =
    Math.random() *
      (PINK_MODE_ICON_RAIN_MAX_SCALE - PINK_MODE_ICON_RAIN_MIN_SCALE) +
    PINK_MODE_ICON_RAIN_MIN_SCALE;
  container.style.setProperty('--pink-mode-rain-scale', scale.toFixed(3));

  const drift =
    Math.random() *
      (PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX -
        PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN) +
    PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN;
  container.style.setProperty('--pink-mode-rain-drift', `${drift.toFixed(2)}vw`);

  const rotation = Math.random() * 40 - 20;
  container.style.setProperty(
    '--pink-mode-rain-rotation',
    `${rotation.toFixed(2)}deg`
  );

  layer.appendChild(container);

  let animationData;
  try {
    animationData = JSON.parse(template.data);
  } catch (error) {
    console.warn('Could not parse pink mode rain animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  let animationInstance;
  try {
    animationInstance = window.lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    });
  } catch (error) {
    console.warn('Could not start pink mode rain animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  const instance = {
    container,
    animation: animationInstance,
    destroyed: false,
    templateName: typeof template.name === 'string' ? template.name : null
  };

  container.addEventListener(
    'animationend',
    () => {
      destroyPinkModeIconRainInstance(instance);
    },
    { once: true }
  );

  pinkModeIconRainInstances.add(instance);
  if (pinkModeIconRainInstances.size > PINK_MODE_ICON_RAIN_MAX_ACTIVE) {
    const oldest = pinkModeIconRainInstances.values().next().value;
    if (oldest && oldest !== instance) {
      destroyPinkModeIconRainInstance(oldest);
    }
  }

  return true;
}

function triggerPinkModeIconRain() {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !document.body ||
    (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches)
  ) {
    return;
  }

  const now = Date.now();
  if (
    pinkModeIconRainLastTriggeredAt &&
    now - pinkModeIconRainLastTriggeredAt < PINK_MODE_ICON_RAIN_COOLDOWN_MS
  ) {
    return;
  }
  pinkModeIconRainLastTriggeredAt = now;

  loadPinkModeAnimatedIconTemplates()
    .then(templates => {
      if (!Array.isArray(templates) || !templates.length) {
        return templates;
      }

      const maxAdditional = Math.max(
        0,
        PINK_MODE_ICON_RAIN_MAX_COUNT - PINK_MODE_ICON_RAIN_MIN_COUNT
      );
      const dropCount =
        PINK_MODE_ICON_RAIN_MIN_COUNT + Math.round(Math.random() * maxAdditional);

      for (let i = 0; i < dropCount; i += 1) {
        const delay = Math.round(
          Math.random() * PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS + i * 60
        );
        window.setTimeout(() => {
          spawnPinkModeIconRainInstance(templates);
        }, delay);
      }

      return templates;
    })
    .catch(error => {
      console.warn('Could not trigger pink mode icon rain', error);
    });
}

function spawnPinkModeAnimatedIconInstance(templates) {
  if (
    !pinkModeAnimatedIconsActive ||
    !Array.isArray(templates) ||
    !templates.length ||
    typeof window === 'undefined' ||
    !window.lottie ||
    typeof window.lottie.loadAnimation !== 'function'
  ) {
    return false;
  }
  const layer = ensurePinkModeAnimationLayer();
  if (!layer) {
    return false;
  }
  const sanitizedTemplates = templates.filter(Boolean);
  if (!sanitizedTemplates.length) {
    return false;
  }

  const activeTemplateNames = new Set();
  for (const instance of pinkModeAnimatedIconInstances) {
    if (!instance) {
      continue;
    }
    const templateName =
      typeof instance.templateName === 'string' && instance.templateName
        ? instance.templateName
        : null;
    if (templateName) {
      activeTemplateNames.add(templateName);
    }
  }

  let availableTemplates = sanitizedTemplates.filter(template => {
    if (!template || typeof template.name !== 'string') {
      return true;
    }
    return !activeTemplateNames.has(template.name);
  });

  if (!availableTemplates.length) {
    return false;
  }

  if (availableTemplates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
    const filteredTemplates = availableTemplates.filter(
      template => template && template.name !== pinkModeAnimatedIconLastTemplateName
    );
    if (filteredTemplates.length) {
      availableTemplates = filteredTemplates;
    }
  }

  const template =
    availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  if (!template || !template.data) {
    return false;
  }
  const container = document.createElement('div');
  container.className = 'pink-mode-animation-instance';
  container.setAttribute('aria-hidden', 'true');
  const duration = Math.round(
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS - PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS) +
      PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS
  );
  const baseSize =
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX - PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX) +
    PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX;
  const viewportWidth =
    typeof window !== 'undefined' && typeof window.innerWidth === 'number'
      ? window.innerWidth
      : document.documentElement && typeof document.documentElement.clientWidth === 'number'
        ? document.documentElement.clientWidth
        : null;
  const viewportScale =
    viewportWidth && viewportWidth < PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN
      ? Math.max(
          PINK_MODE_ANIMATED_ICON_MIN_SCALE,
          viewportWidth / PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN
        )
      : 1;
  const size = Math.max(
    Math.round(baseSize * viewportScale),
    Math.round(PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX * PINK_MODE_ANIMATED_ICON_MIN_SCALE)
  );
  const host = layer.parentElement || document.body;
  const viewportHeight =
    typeof window !== 'undefined' && window.innerHeight
      ? window.innerHeight
      : document.documentElement && document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : size * 4;
  const viewportTop =
    typeof window !== 'undefined' && typeof window.scrollY === 'number'
      ? window.scrollY
      : document.documentElement && typeof document.documentElement.scrollTop === 'number'
        ? document.documentElement.scrollTop
        : 0;
  const viewportBottom = viewportTop + viewportHeight;
  const hostRect = host ? host.getBoundingClientRect() : null;
  const hostTop = hostRect ? hostRect.top + viewportTop : 0;
  const hostHeight =
    host && typeof host.scrollHeight === 'number' && host.scrollHeight > 0
      ? host.scrollHeight
      : hostRect && hostRect.height
        ? hostRect.height
        : viewportHeight;
  const hostBottom = hostTop + hostHeight;
  let visibleTop = Math.max(hostTop, viewportTop);
  let visibleBottom = Math.min(hostBottom, viewportBottom);
  if (visibleBottom <= visibleTop) {
    visibleTop = hostTop;
    visibleBottom = hostBottom;
  }
  const hostWidth =
    host && typeof host.clientWidth === 'number' && host.clientWidth > 0
      ? host.clientWidth
      : viewportWidth || size * 4;
  const hostOffsetLeft =
    hostRect && Number.isFinite(hostRect.left) ? hostRect.left : 0;
  const hostOffsetTop =
    hostRect && Number.isFinite(hostRect.top) ? hostRect.top : 0;
  const safeHorizontalRange = Math.max(hostWidth, size * 3);
  const safeVerticalRange = Math.max(hostHeight, size * 3);
  const horizontalPadding = Math.min(
    Math.max(size * 0.6 + 48, 48),
    safeHorizontalRange / 2
  );
  const verticalPadding = Math.min(
    Math.max(size * 0.6 + 64, 64),
    safeVerticalRange / 2
  );
  const hostRight =
    hostRect && Number.isFinite(hostRect.right)
      ? hostRect.right
      : hostOffsetLeft + hostWidth;
  const leftMarginSpace =
    viewportWidth && Number.isFinite(hostOffsetLeft)
      ? Math.max(0, hostOffsetLeft)
      : 0;
  const rightMarginSpace =
    viewportWidth && Number.isFinite(hostRight)
      ? Math.max(0, viewportWidth - hostRight)
      : leftMarginSpace;
  let leftMarginExtension = 0;
  let rightMarginExtension = 0;
  if (
    viewportWidth &&
    hostWidth &&
    viewportWidth > hostWidth &&
    (leftMarginSpace > 0 || rightMarginSpace > 0)
  ) {
    const marginSafetyBuffer = Math.min(horizontalPadding, Math.max(size * 0.4, 32));
    leftMarginExtension = Math.max(0, leftMarginSpace - marginSafetyBuffer);
    rightMarginExtension = Math.max(0, rightMarginSpace - marginSafetyBuffer);
  }
  const historicalAvoidRegions = pinkModeAnimatedIconPlacementHistory
    .map(spot => {
      if (!spot) {
        return null;
      }
      const { x: spotX, y: spotY, size: spotSize } = spot;
      if (!Number.isFinite(spotX) || !Number.isFinite(spotY)) {
        return null;
      }
      const halfSize =
        Number.isFinite(spotSize) && spotSize > 0
          ? spotSize / 2
          : PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX / 2;
      const margin = Math.max(
        PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
        PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX,
        halfSize
      );
      const centerX = hostOffsetLeft + spotX;
      const centerY = hostOffsetTop + spotY;
      return {
        left: centerX - halfSize,
        right: centerX + halfSize,
        top: centerY - halfSize,
        bottom: centerY + halfSize,
        margin
      };
    })
    .filter(Boolean);
  const avoidRegions = [
    ...computePinkModeAnimationAvoidRegions(layer),
    ...collectPinkModeAnimationInstanceRegions(layer),
    ...historicalAvoidRegions
  ];
  const placement = findPinkModeAnimationPlacement({
    layer,
    hostRect,
    hostTop,
    visibleTop,
    visibleBottom,
    horizontalPadding,
    verticalPadding,
    hostWidth,
    size,
    avoidRegions,
    leftMarginExtension,
    rightMarginExtension
  });
  if (!placement) {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }
  const { x, y } = placement;
  pinkModeAnimatedIconPlacementHistory.push({ x, y, size });
  if (pinkModeAnimatedIconPlacementHistory.length > PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT) {
    pinkModeAnimatedIconPlacementHistory.splice(
      0,
      pinkModeAnimatedIconPlacementHistory.length - PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT
    );
  }
  container.style.setProperty('--pink-mode-animation-duration', `${duration}ms`);
  container.style.setProperty('--pink-mode-animation-size', `${size}px`);
  container.style.setProperty('--pink-mode-animation-x', `${x}px`);
  container.style.setProperty('--pink-mode-animation-y', `${y}px`);
  layer.appendChild(container);

  let animationData;
  try {
    animationData = JSON.parse(template.data);
  } catch (error) {
    console.warn('Could not parse pink mode animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  let animationInstance;
  try {
    animationInstance = window.lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    });
  } catch (error) {
    console.warn('Could not start pink mode animation', error);
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }

  const instance = {
    container,
    animation: animationInstance,
    destroyed: false,
    templateName: typeof template.name === 'string' ? template.name : null
  };

  container.addEventListener(
    'animationend',
    () => {
      destroyPinkModeAnimatedIconInstance(instance);
    },
    { once: true }
  );

  pinkModeAnimatedIconInstances.add(instance);
  if (pinkModeAnimatedIconInstances.size > PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
    const oldest = pinkModeAnimatedIconInstances.values().next().value;
    if (oldest && oldest !== instance) {
      destroyPinkModeAnimatedIconInstance(oldest);
    }
  }

  pinkModeAnimatedIconLastTemplateName = typeof template.name === 'string' ? template.name : null;
  ensurePinkModeAnimatedIconPressListener();

  return true;
}

function scheduleNextPinkModeAnimatedIcon(templates) {
  if (!pinkModeAnimatedIconsActive) {
    return;
  }
  const delay = Math.round(
    Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS - PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS) +
      PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS
  );
  pinkModeAnimatedIconTimeoutId = window.setTimeout(() => {
    pinkModeAnimatedIconTimeoutId = null;
    if (!pinkModeAnimatedIconsActive) {
      return;
    }
    spawnPinkModeAnimatedIconInstance(templates);
    if (pinkModeAnimatedIconsActive) {
      scheduleNextPinkModeAnimatedIcon(templates);
    }
  }, delay);
  if (
    pinkModeAnimatedIconTimeoutId &&
    typeof pinkModeAnimatedIconTimeoutId.unref === 'function'
  ) {
    pinkModeAnimatedIconTimeoutId.unref();
  }
}

function startPinkModeAnimatedIcons() {
  if (pinkModeAnimatedIconsActive) {
    return;
  }
  if (!document || !document.body) {
    return;
  }
  if (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
    return;
  }
  if (
    typeof window === 'undefined' ||
    !window.lottie ||
    typeof window.lottie.loadAnimation !== 'function'
  ) {
    return;
  }
  pinkModeAnimatedIconsActive = true;
  loadPinkModeAnimatedIconTemplates()
    .then(templates => {
      if (!pinkModeAnimatedIconsActive) {
        return templates;
      }
      if (!templates.length) {
        stopPinkModeAnimatedIcons();
        return templates;
      }
      spawnPinkModeAnimatedIconInstance(templates);
      scheduleNextPinkModeAnimatedIcon(templates);
      return templates;
    })
    .catch(error => {
      console.warn('Could not prepare pink mode animated icons', error);
      stopPinkModeAnimatedIcons();
    });
}

function stopPinkModeAnimatedIcons() {
  pinkModeAnimatedIconsActive = false;
  if (pinkModeAnimatedIconTimeoutId) {
    clearTimeout(pinkModeAnimatedIconTimeoutId);
    pinkModeAnimatedIconTimeoutId = null;
  }
  if (pinkModeAnimatedIconInstances.size) {
    Array.from(pinkModeAnimatedIconInstances).forEach(instance => {
      destroyPinkModeAnimatedIconInstance(instance);
    });
    pinkModeAnimatedIconInstances.clear();
  }
  if (!pinkModeAnimatedIconInstances.size) {
    teardownPinkModeAnimatedIconPressListener();
  }
  pinkModeAnimatedIconPlacementHistory.length = 0;
  if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
    pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
  }
  pinkModeAnimatedIconLayer = null;
  pinkModeAnimatedIconLastTemplateName = null;
}

if (pinkModeReduceMotionQuery) {
  const handlePinkModeReduceMotionChange = event => {
    if (event.matches) {
      stopPinkModeAnimatedIcons();
    } else if (document.body && document.body.classList.contains('pink-mode')) {
      startPinkModeAnimatedIcons();
    }
  };
  if (typeof pinkModeReduceMotionQuery.addEventListener === 'function') {
    pinkModeReduceMotionQuery.addEventListener('change', handlePinkModeReduceMotionChange);
  } else if (typeof pinkModeReduceMotionQuery.addListener === 'function') {
    pinkModeReduceMotionQuery.addListener(handlePinkModeReduceMotionChange);
  }
}

var PINK_MODE_ICON_INTERVAL_MS = 30000;
var PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
var PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;

var projectFieldIcons = {
  productionCompany: PRODUCTION_COMPANY_ICON,
  rentalHouse: RENTAL_HOUSE_ICON,
  crew: iconGlyph('\uF404', ICON_FONT_KEYS.UICONS),
  prepDays: iconGlyph('\uE312', ICON_FONT_KEYS.UICONS),
  shootingDays: iconGlyph('\uE311', ICON_FONT_KEYS.UICONS),
  deliveryResolution: iconGlyph('\uEF69', ICON_FONT_KEYS.UICONS),
  recordingResolution: ICON_GLYPHS.camera,
  aspectRatio: ASPECT_RATIO_ICON,
  codec: ICON_GLYPHS.codec,
  baseFrameRate: iconGlyph('\uE46F', ICON_FONT_KEYS.UICONS),
  sensorMode: ICON_GLYPHS.sensor,
  requiredScenarios: REQUIRED_SCENARIOS_ICON,
  lenses: iconGlyph('\uE0A3', ICON_FONT_KEYS.UICONS),
  cameraHandle: iconGlyph('\uF2DC', ICON_FONT_KEYS.UICONS),
  viewfinderExtension: iconGlyph('\uE338', ICON_FONT_KEYS.UICONS),
  gimbal: iconGlyph('\uEA9C', ICON_FONT_KEYS.UICONS),
  monitoringSupport: MONITORING_SUPPORT_ICON,
  monitoringConfiguration: iconGlyph('\uF0D0', ICON_FONT_KEYS.UICONS),
  monitorUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS),
  cameraUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS),
  viewfinderUserButtons: iconGlyph('\uF0D1', ICON_FONT_KEYS.UICONS)
};

function updateSelectIconBoxes(sel) {
  if (!sel) return;
  const multiSelected = sel.multiple
    ? Array.from(sel.selectedOptions || [])
    : [];
  const hasValue = sel.multiple
    ? multiSelected.some(opt => typeof opt.value === 'string' ? opt.value.trim() !== '' : !!opt.value)
    : (typeof sel.value === 'string'
      ? sel.value.trim() !== ''
      : (sel.value !== null && sel.value !== undefined && String(sel.value).trim() !== ''));
  sel.classList.toggle('select-placeholder', !hasValue);
  if (sel.id === 'requiredScenarios') {
    return;
  }
  const parent = sel.parentNode;
  if (!parent || typeof parent.querySelector !== 'function') {
    return;
  }
  let container = parent.querySelector('.icon-box-summary');
  if (!container) {
    container = document.createElement('div');
    container.className = 'icon-box-summary';
    parent.insertBefore(container, sel.nextSibling);
  }
  container.innerHTML = '';
  const opts = sel.multiple
    ? multiSelected
    : (hasValue && sel.selectedIndex >= 0 ? [sel.options[sel.selectedIndex]] : []);
  opts.forEach(opt => {
    const box = document.createElement('span');
    box.className = 'icon-box';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon icon-glyph';
    let glyph = projectFieldIcons[sel.name] || ICON_GLYPHS.pin;
    if (opt.dataset.icon) {
      glyph = iconGlyph(opt.dataset.icon, opt.dataset.iconFont || ICON_FONT_KEYS.UICONS);
    }
    applyIconGlyph(iconSpan, glyph);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(opt.value));
    container.appendChild(box);
  });
}

function setButtonLabelWithIcon(button, label, glyph = ICON_GLYPHS.save) {
  if (!button) return;
  const safeLabel = typeof label === 'string' ? escapeHtml(label) : '';
  const iconHtml = iconMarkup(glyph, 'btn-icon');
  button.innerHTML = `${iconHtml}${safeLabel}`;
}

function getLocalizedPathText(path, fallback = '') {
  if (!path) return fallback;
  const keys = Array.isArray(path) ? path : typeof path === 'string' ? [path] : [];
  if (!keys.length) return fallback;
  const langTexts = (texts && texts[currentLang]) || {};
  const fallbackTexts = (texts && texts.en) || {};
  const resolve = (source) => keys.reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, source);
  const localized = resolve(langTexts);
  if (localized !== undefined && localized !== null && localized !== '') {
    return String(localized);
  }
  const fallbackValue = resolve(fallbackTexts);
  if (fallbackValue !== undefined && fallbackValue !== null && fallbackValue !== '') {
    return String(fallbackValue);
  }
  return fallback;
}

function configureIconOnlyButton(button, glyph, options = {}) {
  if (!button) return;
  const {
    contextPaths = [],
    fallbackContext = '',
    actionKey = 'addEntry'
  } = options || {};
  setButtonLabelWithIcon(button, '', glyph || ICON_GLYPHS.add);
  const actionLabel = getLocalizedPathText(['projectForm', actionKey], actionKey === 'removeEntry' ? 'Remove' : 'Add');
  const paths = Array.isArray(contextPaths) ? contextPaths : [contextPaths];
  let contextLabel = '';
  for (const path of paths) {
    if (!path) continue;
    const resolved = getLocalizedPathText(path, '');
    if (resolved) {
      contextLabel = resolved;
      break;
    }
  }
  if (!contextLabel && typeof fallbackContext === 'string') {
    contextLabel = fallbackContext;
  }
  const normalizedContext = contextLabel ? contextLabel.replace(/[:：]\s*$/, '').trim() : '';
  const combinedLabel = [actionLabel, normalizedContext].filter(Boolean).join(' ').trim();
  if (combinedLabel) {
    button.setAttribute('aria-label', combinedLabel);
    button.setAttribute('title', combinedLabel);
  }
}

let generatedFieldIdCounter = 0;

function sanitizeForId(value, fallback = 'field') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || fallback;
}

function ensureElementId(element, baseText = 'field') {
  if (!element) return '';
  if (element.id) return element.id;
  const base = sanitizeForId(baseText, 'field');
  let id = '';
  do {
    generatedFieldIdCounter += 1;
    id = `${base}-${generatedFieldIdCounter}`;
  } while (document.getElementById(id));
  element.id = id;
  return id;
}

function createHiddenLabel(forId, text) {
  const label = document.createElement('label');
  label.className = 'visually-hidden';
  label.setAttribute('for', forId);
  label.textContent = typeof text === 'string' ? text : '';
  return label;
}

function createCrewRow(data = {}) {
  if (!crewContainer) return;
  const row = document.createElement('div');
  row.className = 'person-row';
  const roleSel = document.createElement('select');
  roleSel.name = 'crewRole';
  crewRoles.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    const roleLabels = texts[currentLang]?.crewRoles || texts.en?.crewRoles || {};
    opt.textContent = roleLabels[r] || r;
    roleSel.appendChild(opt);
  });
  if (data.role) roleSel.value = data.role;
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'crewName';
  const fallbackProjectForm = texts.en?.projectForm || {};
  const projectFormTexts = texts[currentLang]?.projectForm || fallbackProjectForm;
  nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
  nameInput.className = 'person-name';
  nameInput.value = data.name || '';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.name = 'crewPhone';
  phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
  phoneInput.className = 'person-phone';
  phoneInput.value = data.phone || '';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'crewEmail';
  emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
  emailInput.className = 'person-email';
  emailInput.value = data.email || '';
  const crewRoleLabelText = projectFormTexts.crewRoleLabel || fallbackProjectForm.crewRoleLabel || 'Crew role';
  const crewNameLabelText = projectFormTexts.crewNameLabel || fallbackProjectForm.crewNameLabel || 'Crew member name';
  const crewPhoneLabelText = projectFormTexts.crewPhoneLabel || fallbackProjectForm.crewPhoneLabel || 'Crew member phone';
  const crewEmailLabelText = projectFormTexts.crewEmailLabel || fallbackProjectForm.crewEmailLabel || 'Crew member email';
  const roleLabel = createHiddenLabel(ensureElementId(roleSel, crewRoleLabelText), crewRoleLabelText);
  const nameLabel = createHiddenLabel(ensureElementId(nameInput, crewNameLabelText), crewNameLabelText);
  const phoneLabel = createHiddenLabel(ensureElementId(phoneInput, crewPhoneLabelText), crewPhoneLabelText);
  const emailLabel = createHiddenLabel(ensureElementId(emailInput, crewEmailLabelText), crewEmailLabelText);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  const removeBase = texts[currentLang]?.projectForm?.removeEntry
    || texts.en?.projectForm?.removeEntry
    || 'Remove';
  const crewHeading = texts[currentLang]?.projectForm?.crewHeading
    || texts.en?.projectForm?.crewHeading
    || 'Crew';
  const removeCrewLabel = `${removeBase} ${crewHeading}`.trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeCrewLabel);
  removeBtn.setAttribute('title', removeCrewLabel);
  removeBtn.setAttribute('data-help', removeCrewLabel);
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(roleLabel, roleSel, nameLabel, nameInput, phoneLabel, phoneInput, emailLabel, emailInput, removeBtn);
  crewContainer.appendChild(row);
}

function createPrepRow(data = {}) {
  if (!prepContainer) return;
  const row = document.createElement('div');
  row.className = 'period-row';
  const start = document.createElement('input');
  start.type = 'date';
  start.name = 'prepStart';
  start.className = 'prep-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'prepLabel');
  const span = document.createElement('span');
  span.textContent = 'to';
  const end = document.createElement('input');
  end.type = 'date';
  end.name = 'prepEnd';
  end.className = 'prep-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'prepLabel');
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  const removeBase = texts[currentLang]?.projectForm?.removeEntry
    || texts.en?.projectForm?.removeEntry
    || 'Remove';
  const prepLabelText = texts[currentLang]?.projectForm?.prepLabel || texts.en?.projectForm?.prepLabel || 'Prep';
  const removePrepLabel = `${removeBase} ${prepLabelText}`.trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removePrepLabel);
  removeBtn.setAttribute('title', removePrepLabel);
  removeBtn.setAttribute('data-help', removePrepLabel);
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  prepContainer.appendChild(row);
}

function createShootRow(data = {}) {
  if (!shootContainer) return;
  const row = document.createElement('div');
  row.className = 'period-row';
  const start = document.createElement('input');
  start.type = 'date';
  start.name = 'shootStart';
  start.className = 'shoot-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'shootLabel');
  const span = document.createElement('span');
  span.textContent = 'to';
  const end = document.createElement('input');
  end.type = 'date';
  end.name = 'shootEnd';
  end.className = 'shoot-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'shootLabel');
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  const removeBase = texts[currentLang]?.projectForm?.removeEntry
    || texts.en?.projectForm?.removeEntry
    || 'Remove';
  const shootLabelText = texts[currentLang]?.projectForm?.shootLabel || texts.en?.projectForm?.shootLabel || 'Shoot';
  const removeShootLabel = `${removeBase} ${shootLabelText}`.trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeShootLabel);
  removeBtn.setAttribute('title', removeShootLabel);
  removeBtn.setAttribute('data-help', removeShootLabel);
  removeBtn.addEventListener('click', () => {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  shootContainer.appendChild(row);
}

if (addPersonBtn) {
  addPersonBtn.addEventListener('click', () => createCrewRow());
}
if (addPrepBtn) {
  addPrepBtn.addEventListener('click', () => createPrepRow());
}
if (addShootBtn) {
  addShootBtn.addEventListener('click', () => createShootRow());
}

function updateTripodOptions() {
  const headBrand = tripodHeadBrandSelect ? tripodHeadBrandSelect.value : '';
  const bowl = tripodBowlSelect ? tripodBowlSelect.value : '';
  const headOpts = tripodHeadBrandSelect ? Array.from(tripodHeadBrandSelect.options) : [];
  const bowlOpts = tripodBowlSelect ? Array.from(tripodBowlSelect.options) : [];
  headOpts.forEach(o => { o.hidden = false; });
  bowlOpts.forEach(o => { o.hidden = false; });
  if (headBrand === 'OConnor') {
    const opt = bowlOpts.find(o => o.value === '75mm bowl');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === '75mm bowl') tripodBowlSelect.value = '';
  }
  if (headBrand === 'Sachtler') {
    const opt = bowlOpts.find(o => o.value === 'Mitchell Mount');
    if (opt) opt.hidden = true;
    if (tripodBowlSelect.value === 'Mitchell Mount') tripodBowlSelect.value = '';
  }
  if (bowl === '75mm bowl') {
    const opt = headOpts.find(o => o.value === 'OConnor');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'OConnor') tripodHeadBrandSelect.value = '';
  }
  if (bowl === 'Mitchell Mount') {
    const opt = headOpts.find(o => o.value === 'Sachtler');
    if (opt) opt.hidden = true;
    if (tripodHeadBrandSelect.value === 'Sachtler') tripodHeadBrandSelect.value = '';
  }
}

var totalPowerElem            = document.getElementById("totalPower");
var totalCurrent144Elem       = document.getElementById("totalCurrent144");
var totalCurrent12Elem        = document.getElementById("totalCurrent12");
var batteryLifeElem           = document.getElementById("batteryLife");
var batteryLifeLabelElem      = document.getElementById("batteryLifeLabel");
var runtimeAverageNoteElem    = document.getElementById("runtimeAverageNote");
var batteryCountElem          = document.getElementById("batteryCount");
var pinWarnElem               = document.getElementById("pinWarning");
var dtapWarnElem              = document.getElementById("dtapWarning");
var hotswapWarnElem           = document.getElementById("hotswapWarning");
var powerWarningDialog        = document.getElementById("powerWarningDialog");
var powerWarningTitleElem     = document.getElementById("powerWarningTitle");
var powerWarningMessageElem   = document.getElementById("powerWarningMessage");
var powerWarningLimitsHeadingElem = document.getElementById("powerWarningLimitsHeading");
var powerWarningPinsDetailElem    = document.getElementById("powerWarningPinsDetail");
var powerWarningDtapDetailElem    = document.getElementById("powerWarningDtapDetail");
var powerWarningAdviceElem        = document.getElementById("powerWarningAdvice");
var powerWarningCloseBtn          = document.getElementById("powerWarningCloseBtn");
var powerDiagramElem              = document.getElementById("powerDiagram");
var powerDiagramBarElem           = document.getElementById("powerDiagramBar");
var maxPowerTextElem              = document.getElementById("maxPowerText");
var powerDiagramLegendElem        = document.getElementById("powerDiagramLegend");

let currentPowerWarningKey = '';
let dismissedPowerWarningKey = '';

function closePowerWarningDialog(options = {}) {
  if (!powerWarningDialog) return;
  if (isDialogOpen(powerWarningDialog)) {
    closeDialog(powerWarningDialog);
  } else if (powerWarningDialog.removeAttribute) {
    powerWarningDialog.removeAttribute('open');
  }
  currentPowerWarningKey = '';
  if (!options.keepDismissed) {
    dismissedPowerWarningKey = '';
  }
}

function dismissPowerWarningDialog() {
  if (!powerWarningDialog) return;
  if (currentPowerWarningKey) {
    dismissedPowerWarningKey = currentPowerWarningKey;
  }
  closePowerWarningDialog({ keepDismissed: true });
}

function showPowerWarningDialog(context) {
  if (!powerWarningDialog) return;
  const {
    batteryName,
    current,
    hasPinLimit,
    pinLimit,
    hasDtapRating,
    dtapLimit,
    dtapAllowed,
  } = context || {};

  const safeBatteryName = batteryName && batteryName.trim() ? batteryName.trim() : (batterySelect?.value || '');
  const formattedCurrent = formatCurrentValue(Number(current) || 0);
  const langTexts = texts[currentLang] || texts.en || {};
  const messageTemplate = langTexts.powerWarningMessage || texts.en?.powerWarningMessage || '';
  const message = messageTemplate
    ? messageTemplate
        .replace(/\{battery\}/g, safeBatteryName)
        .replace(/\{current\}/g, formattedCurrent)
    : `${safeBatteryName} exceeds every available output (${formattedCurrent}A).`;
  if (powerWarningMessageElem) {
    powerWarningMessageElem.textContent = message;
  }

  const pinsDetail = hasPinLimit
    ? (langTexts.powerWarningPinsDetail || texts.en?.powerWarningPinsDetail || 'Pins limit: {max}A')
        .replace(/\{max\}/g, formatCurrentValue(Number(pinLimit) || 0))
    : (langTexts.powerWarningPinsUnavailable || texts.en?.powerWarningPinsUnavailable || 'Pins limit unavailable.');
  if (powerWarningPinsDetailElem) {
    powerWarningPinsDetailElem.textContent = pinsDetail;
  }

  let dtapDetail = '';
  if (hasDtapRating && dtapAllowed) {
    dtapDetail = (langTexts.powerWarningDtapDetail || texts.en?.powerWarningDtapDetail || 'D-Tap limit: {max}A')
      .replace(/\{max\}/g, formatCurrentValue(Number(dtapLimit) || 0));
  } else if (hasDtapRating && !dtapAllowed) {
    dtapDetail = langTexts.powerWarningDtapBlocked || texts.en?.powerWarningDtapBlocked || 'D-Tap cannot be used with the current configuration.';
  } else {
    dtapDetail = langTexts.powerWarningDtapUnavailable || texts.en?.powerWarningDtapUnavailable || 'No D-Tap output is available.';
  }
  if (powerWarningDtapDetailElem) {
    powerWarningDtapDetailElem.textContent = dtapDetail;
  }

  const keyParts = [
    safeBatteryName,
    formattedCurrent,
    hasPinLimit ? formatCurrentValue(Number(pinLimit) || 0) : 'no-pin',
    hasDtapRating ? formatCurrentValue(Number(dtapLimit) || 0) : 'no-dtap',
    dtapAllowed ? 'dtap-allowed' : 'dtap-blocked'
  ];
  const nextKey = keyParts.join('|');

  if (dismissedPowerWarningKey && dismissedPowerWarningKey !== nextKey) {
    dismissedPowerWarningKey = '';
  }

  currentPowerWarningKey = nextKey;

  if (dismissedPowerWarningKey === nextKey) {
    return;
  }

  if (!isDialogOpen(powerWarningDialog)) {
    openDialog(powerWarningDialog);
  }
}

if (powerWarningCloseBtn) {
  powerWarningCloseBtn.addEventListener('click', dismissPowerWarningDialog);
}
if (powerWarningDialog) {
  powerWarningDialog.addEventListener('cancel', event => {
    event.preventDefault();
    dismissPowerWarningDialog();
  });
}

function drawPowerDiagram(availableWatt, segments, maxPinA) {
  if (!powerDiagramElem || !powerDiagramBarElem || !maxPowerTextElem || !powerDiagramLegendElem) return;
  if (!availableWatt || availableWatt <= 0) {
    powerDiagramElem.classList.add("hidden");
    powerDiagramBarElem.innerHTML = "";
    powerDiagramLegendElem.innerHTML = "";
    maxPowerTextElem.textContent = "";
    setStatusLevel(maxPowerTextElem, null);
    return;
  }
  powerDiagramElem.classList.remove("hidden");
  powerDiagramBarElem.innerHTML = "";
  powerDiagramLegendElem.innerHTML = "";
  const MAX_WIDTH = 300;
  const total = segments.reduce((sum, s) => sum + s.power, 0);
  const scale = MAX_WIDTH / Math.max(availableWatt, total);
  const limitPos = availableWatt * scale;

  segments.forEach(seg => {
    const width = seg.power * scale;
    if (width <= 0) return;
    const div = document.createElement("div");
    div.className = `segment ${seg.className}`;
    div.style.width = `${width}px`;
    div.setAttribute("title", `${seg.label} ${seg.power.toFixed(1)} W`);
    powerDiagramBarElem.appendChild(div);

    const legendItem = document.createElement("span");
    const swatch = document.createElement("span");
    swatch.className = `swatch ${seg.className}`;
    legendItem.appendChild(swatch);
    legendItem.appendChild(document.createTextNode(seg.label.replace(/:$/, "")));
    powerDiagramLegendElem.appendChild(legendItem);
  });

  if (total > availableWatt) {
    const over = document.createElement("div");
    over.className = "over-usage";
    over.style.left = `${limitPos}px`;
    powerDiagramBarElem.appendChild(over);
  }

  const limit = document.createElement("div");
  limit.className = "limit-line";
  limit.style.left = `${limitPos}px`;
  if (typeof maxPinA === 'number' && maxPinA > 0) {
    const label = document.createElement("span");
    label.className = "limit-label";
    label.textContent = `${texts[currentLang].pinLabel} ${maxPinA} A`;
    limit.appendChild(label);
  }
  powerDiagramBarElem.appendChild(limit);

  powerDiagramElem.classList.toggle("over", total > availableWatt);
  maxPowerTextElem.textContent = `${texts[currentLang].availablePowerLabel} ${availableWatt.toFixed(0)} W`;
  setStatusLevel(maxPowerTextElem, total > availableWatt ? 'danger' : null);
}

var setupSelect     = document.getElementById("setupSelect");
var setupNameInput  = document.getElementById("setupName");
var saveSetupBtn    = document.getElementById("saveSetupBtn");
var deleteSetupBtn  = document.getElementById("deleteSetupBtn");
var shareSetupBtn   = document.getElementById("shareSetupBtn");
var sharedLinkRow   = document.getElementById("sharedLinkRow");
var sharedLinkInput = document.getElementById("sharedLinkInput");
var shareLinkMessage = document.getElementById("shareLinkMessage");
var shareIncludeAutoGearCheckbox = document.getElementById("shareIncludeAutoGear");

function sanitizeShareFilename(name) {
  if (!name) return '';
  const trimmed = String(name).trim();
  if (!trimmed) return '';
  const sanitized = trimmed
    .replace(/[\\/:*?"<>|]+/g, '_')
    .replace(/\s+/g, ' ')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .trim();
  return sanitized;
}

function ensureJsonExtension(filename) {
  if (!filename) return '';
  return /\.json$/i.test(filename) ? filename : `${filename}.json`;
}

function getDefaultShareFilename(setupName) {
  const sanitized = sanitizeShareFilename(setupName);
  return sanitized || 'project';
}

function promptForSharedFilename(setupName) {
  const defaultName = getDefaultShareFilename(setupName);
  const template = getLocalizedText('shareFilenamePrompt') || '';
  const promptMessage = template.includes('{defaultName}')
    ? template.replace('{defaultName}', defaultName)
    : template || 'Enter a name for the exported project file:';
  if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
    const response = window.prompt(promptMessage, defaultName);
    if (response === null) {
      return null;
    }
    const sanitized = sanitizeShareFilename(response);
    if (!sanitized) {
      const invalidMessage =
        getLocalizedText('shareFilenameInvalid')
        || 'Please enter a valid file name to continue.';
      if (typeof window.alert === 'function') {
        window.alert(invalidMessage);
      }
      return null;
    }
    return ensureJsonExtension(sanitized);
  }
  return ensureJsonExtension(defaultName);
}

function confirmAutoGearSelection(defaultInclude) {
  const confirmMessage =
    getLocalizedText('shareIncludeAutoGearConfirm')
    || 'Include automatic gear rules in the shared file? Select OK to include them or Cancel to skip.';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    return window.confirm(confirmMessage);
  }
  return !!defaultInclude;
}
var shareDialog = document.getElementById("shareDialog");
var shareForm = document.getElementById("shareForm");
const shareDialogHeadingElem = document.getElementById("shareDialogHeading");
var shareFilenameInput = document.getElementById("shareFilename");
const shareFilenameLabelElem = document.getElementById("shareFilenameLabel");
var shareFilenameMessage = document.getElementById("shareFilenameMessage");
var shareCancelBtn = document.getElementById("shareCancelBtn");
const shareConfirmBtn = document.getElementById("shareConfirmBtn");
const shareIncludeAutoGearText = document.getElementById("shareIncludeAutoGearText");
var shareIncludeAutoGearLabelElem = document.getElementById("shareIncludeAutoGearLabel");
if (shareFilenameInput && shareFilenameMessage) {
  shareFilenameInput.setAttribute('aria-describedby', 'shareFilenameMessage');
}
var sharedImportDialog = document.getElementById("sharedImportDialog");
var sharedImportForm = document.getElementById("sharedImportForm");
const sharedImportDialogHeading = document.getElementById("sharedImportDialogHeading");
const sharedImportDialogMessage = document.getElementById("sharedImportDialogMessage");
const sharedImportOptions = document.getElementById("sharedImportOptions");
const sharedImportLegend = document.getElementById("sharedImportLegend");
var sharedImportModeSelect = document.getElementById("sharedImportModeSelect");
const sharedImportModeNoneOption = document.getElementById("sharedImportModeNoneOption");
const sharedImportModeProjectOption = document.getElementById("sharedImportModeProjectOption");
const sharedImportModeGlobalOption = document.getElementById("sharedImportModeGlobalOption");
const sharedImportConfirmBtn = document.getElementById("sharedImportConfirmBtn");
var sharedImportCancelBtn = document.getElementById("sharedImportCancelBtn");
if (sharedImportModeSelect) {
  Array.from(sharedImportModeSelect.options || []).forEach(option => {
    if (option.value === "none") return;
    option.disabled = true;
  });
}
var sharedImportPromptActive = false;
var pendingSharedLinkListener = null;
var lastSetupName = setupSelect ? setupSelect.value : '';
var applySharedLinkBtn = document.getElementById("applySharedLinkBtn");
const sharedKeyMap = {
  setupName: "s",
  camera: "c",
  monitor: "m",
  video: "v",
  cage: "g",
  motors: "o",
  controllers: "r",
  distance: "d",
  batteryPlate: "p",
  battery: "b",
  batteryHotswap: "h",
  powerSelection: "w",
  projectInfo: "i",
  projectHtml: "q",
  gearSelectors: "e",
  gearList: "l",
  changedDevices: "x",
  feedback: "f",
  autoGearRules: "a",
  autoGearCoverage: "z",
  diagramPositions: "y"
};
const sharedKeyMapKeys = Object.keys(sharedKeyMap);

var lastSharedSetupData = null;
var lastSharedAutoGearRules = null;
var sharedImportPreviousPresetId = '';
var sharedImportProjectPresetActive = false;
let sharedImportPreparedForImport = false;

function cloneSharedImportValue(value) {
  if (value == null) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to clone shared import value', error);
    return null;
  }
}

function storeSharedImportData(data, rules) {
  lastSharedSetupData = cloneSharedImportValue(data);
  lastSharedAutoGearRules = cloneSharedImportValue(rules);
}

function clearStoredSharedImportData() {
  lastSharedSetupData = null;
  lastSharedAutoGearRules = null;
  sharedImportPreparedForImport = false;
}

function resetSharedImportStateForFactoryReset() {
  clearStoredSharedImportData();
  sharedImportPromptActive = false;
  if (sharedImportDialog) {
    closeDialog(sharedImportDialog);
  }
  if (typeof configureSharedImportOptions === 'function') {
    configureSharedImportOptions([]);
  }
  if (sharedLinkInput) {
    if (
      pendingSharedLinkListener
      && typeof sharedLinkInput.removeEventListener === 'function'
    ) {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    }
    sharedLinkInput.value = '';
  }
  pendingSharedLinkListener = null;
  sharedImportPreviousPresetId = '';
  sharedImportProjectPresetActive = false;
}

function deactivateSharedImportProjectPreset() {
  if (!sharedImportProjectPresetActive) return;
  const targetPresetId = sharedImportPreviousPresetId || '';
  callCoreFunctionIfAvailable(
    'setActiveAutoGearPresetId',
    [targetPresetId, { persist: false, skipRender: true }],
    { defer: true }
  );
  sharedImportProjectPresetActive = false;
  sharedImportPreviousPresetId = '';
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
}

function activateSharedImportProjectPreset(presetId) {
  if (!presetId) return;
  if (!sharedImportProjectPresetActive) {
    sharedImportPreviousPresetId = activeAutoGearPresetId || '';
  }
  sharedImportProjectPresetActive = true;
  callCoreFunctionIfAvailable(
    'setActiveAutoGearPresetId',
    [presetId, { persist: false, skipRender: true }],
    { defer: true }
  );
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
}

function getSharedImportProjectName(sharedData) {
  if (!sharedData || typeof sharedData !== 'object') return '';
  const projectName = sharedData.projectInfo && typeof sharedData.projectInfo.projectName === 'string'
    ? sharedData.projectInfo.projectName.trim()
    : '';
  if (projectName) return projectName;
  if (typeof sharedData.setupName === 'string') {
    const normalized = sharedData.setupName.trim();
    if (normalized) return normalized;
  }
  return '';
}

function getSharedImportPresetLabel(sharedData) {
  const langTexts = texts[currentLang] || texts.en || {};
  const fallback = langTexts.sharedImportAutoGearPresetFallback
    || texts.en?.sharedImportAutoGearPresetFallback
    || 'Shared automatic gear rules';
  const projectName = getSharedImportProjectName(sharedData);
  if (!projectName) {
    return fallback;
  }
  const template = langTexts.sharedImportAutoGearPresetName
    || texts.en?.sharedImportAutoGearPresetName
    || '%s';
  if (template.includes('%s')) {
    return formatWithPlaceholdersSafe(template, projectName);
  }
  return `${template} ${projectName}`.trim();
}

function ensureSharedAutoGearPreset(rules, sharedData) {
  const normalizedRules = Array.isArray(rules)
    ? rules.map(normalizeAutoGearRule).filter(Boolean)
    : [];
  if (!normalizedRules.length) return null;
  const label = getSharedImportPresetLabel(sharedData);
  const fingerprint = createAutoGearRulesFingerprint(normalizedRules);
  let preset = autoGearPresets.find(entry => entry.fingerprint === fingerprint) || null;
  const fallback = texts[currentLang]?.sharedImportAutoGearPresetFallback
    || texts.en?.sharedImportAutoGearPresetFallback
    || 'Shared automatic gear rules';
  if (preset) {
    if (label && preset.label !== label && preset.label === fallback) {
      preset = { ...preset, label };
      autoGearPresets = autoGearPresets.map(entry => (entry.id === preset.id ? preset : entry));
      autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
      persistAutoGearPresets(autoGearPresets);
      callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
    }
    return preset;
  }
  const normalizedPreset = normalizeAutoGearPreset({
    id: generateAutoGearId('preset'),
    label,
    rules: normalizedRules,
  });
  if (!normalizedPreset) return null;
  autoGearPresets.push(normalizedPreset);
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  if (autoGearAutoPresetIdState) {
    callCoreFunctionIfAvailable(
      'setAutoGearAutoPresetId',
      ['', { persist: true, skipRender: true }],
      { defer: true }
    );
  }
  callCoreFunctionIfAvailable('renderAutoGearPresetsControls', [], { defer: true });
  return normalizedPreset;
}

function configureSharedImportOptions(sharedRules) {
  if (!sharedImportModeSelect) {
    return Array.isArray(sharedRules) && sharedRules.length > 0;
  }
  const hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  const options = Array.from(sharedImportModeSelect.options || []);
  options.forEach(option => {
    if (option.value === 'none') {
      option.disabled = false;
      option.selected = !hasRules;
    } else {
      option.disabled = !hasRules;
      option.selected = hasRules && option.value === 'project';
    }
  });
  return hasRules;
}

function sharedImportRulesDiffer(sharedRules) {
  if (!Array.isArray(sharedRules) || !sharedRules.length) return false;
  if (typeof getAutoGearRules !== 'function') return true;
  try {
    const currentRules = getAutoGearRules();
    return stableStringify(sharedRules) !== stableStringify(currentRules || []);
  } catch (error) {
    console.warn('Failed to compare automatic gear rules', error);
    return true;
  }
}

function applyStoredSharedImport() {
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}

function finalizeSharedImportPrompt() {
  sharedImportPromptActive = false;
  if (sharedImportDialog) closeDialog(sharedImportDialog);
}

function openSharedImportPrompt() {
  if (!sharedImportDialog) return;
  sharedImportPromptActive = true;
  openDialog(sharedImportDialog);
  const focusTarget = sharedImportModeSelect || sharedImportConfirmBtn || sharedImportCancelBtn;
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
}

function processSharedProjectData(data) {
  try {
    sharedImportPromptActive = false;
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    const sharedRules = Array.isArray(parsed.autoGearRules) ? parsed.autoGearRules : null;
    sharedImportPreparedForImport = false;
    prepareSharedImportContext();
    storeSharedImportData(parsed, sharedRules);
    const hasRules = configureSharedImportOptions(sharedRules);
    const shouldPrompt = hasRules && sharedImportRulesDiffer(sharedRules) && !!sharedImportDialog;
    if (shouldPrompt) {
      openSharedImportPrompt();
      return;
    }
    applyStoredSharedImport();
  } catch (error) {
    clearStoredSharedImportData();
    console.error('Failed to parse shared project', error);
    alert(texts[currentLang].invalidSharedLink);
  }
}

function readSharedProjectFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    processSharedProjectData(reader.result);
  };
  reader.onerror = () => {
    console.error('Failed to load shared project file', reader.error);
    clearStoredSharedImportData();
    alert(texts[currentLang].invalidSharedLink);
  };
  reader.readAsText(file);
}

function prepareSharedImportContext() {
  if (sharedImportPreparedForImport) {
    return;
  }
  sharedImportPreparedForImport = true;

  try {
    if (typeof scheduleProjectAutoSave === 'function') {
      scheduleProjectAutoSave(true);
    } else if (typeof saveCurrentSession === 'function') {
      saveCurrentSession();
      if (typeof saveCurrentGearList === 'function') {
        saveCurrentGearList();
      }
    }
  } catch (error) {
    console.warn('Failed to persist current project before shared import', error);
  }

  let selectionCleared = false;
  if (setupSelect && typeof setupSelect.dispatchEvent === 'function') {
    try {
      const currentValue = typeof setupSelect.value === 'string' ? setupSelect.value : '';
      const typedName = setupNameInput && typeof setupNameInput.value === 'string'
        ? setupNameInput.value.trim()
        : '';
      const previousSelection = typeof lastSetupName === 'string' ? lastSetupName : '';
      const shouldDispatch = Boolean(currentValue || previousSelection || typedName);
      setupSelect.value = '';
      if (shouldDispatch) {
        setupSelect.dispatchEvent(new Event('change'));
      }
      selectionCleared = true;
    } catch (error) {
      console.warn('Failed to reset setup selection before shared import', error);
    }
  }

  if (selectionCleared && setupNameInput) {
    try {
      if (setupNameInput.value) {
        setupNameInput.value = '';
        setupNameInput.dispatchEvent(new Event('input'));
      }
    } catch (error) {
      console.warn('Failed to reset setup name before shared import', error);
    }
  }
}

function reapplySharedImportSelection() {
  if (lastSharedSetupData === null) return;
  const storedData = cloneSharedImportValue(lastSharedSetupData);
  if (!storedData) return;
  const storedRules = cloneSharedImportValue(lastSharedAutoGearRules);
  const mode = resolveSharedImportMode(storedRules);
  applySharedSetup(storedData, {
    autoGearMode: mode,
    sharedAutoGearRules: storedRules,
  });
  updateCalculations();
}

function resolveSharedImportMode(sharedRules) {
  const hasRules = Array.isArray(sharedRules) && sharedRules.length > 0;
  if (!sharedImportModeSelect) {
    return hasRules ? 'project' : 'none';
  }
  const selectedValues = Array.from(sharedImportModeSelect.selectedOptions || [])
    .map(option => option.value)
    .filter(value => value === 'none' || value === 'project' || value === 'global');
  if (!hasRules) {
    return 'none';
  }
  let modes = Array.from(new Set(selectedValues));
  if (!modes.length) {
    return 'project';
  }
  if (modes.length > 1 && modes.includes('none')) {
    modes = modes.filter(value => value !== 'none');
  }
  if (!modes.length) {
    return 'project';
  }
  if (modes.length === 1) {
    return modes[0];
  }
  return modes;
}

function encodeSharedSetup(setup) {
  const out = {};
  sharedKeyMapKeys.forEach(key => {
    if (setup[key] != null) out[sharedKeyMap[key]] = setup[key];
  });
  return out;
}

function decodeSharedSetup(setup) {
  if (!setup || typeof setup !== "object") return {};

  let hasLongKeys = false;
  let hasShortKeys = false;
  let needsMerge = false;

  for (let index = 0; index < sharedKeyMapKeys.length; index += 1) {
    const key = sharedKeyMapKeys[index];
    const hasLongKey = Object.prototype.hasOwnProperty.call(setup, key);
    const short = sharedKeyMap[key];
    const hasShortKey = Object.prototype.hasOwnProperty.call(setup, short);

    if (hasLongKey) {
      hasLongKeys = true;
    }
    if (hasShortKey) {
      hasShortKeys = true;
      if (!hasLongKey && setup[short] != null) {
        needsMerge = true;
      }
    }
  }

  if (!hasLongKeys && !hasShortKeys) {
    return {};
  }

  if (!hasLongKeys) {
    const out = {};
    sharedKeyMapKeys.forEach(key => {
      const short = sharedKeyMap[key];
      if (setup[short] != null) out[key] = setup[short];
    });
    return out;
  }

  if (!needsMerge) {
    return setup;
  }

  const merged = { ...setup };
  sharedKeyMapKeys.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(merged, key)) {
      return;
    }
    const short = sharedKeyMap[key];
    if (setup[short] != null) {
      merged[key] = setup[short];
    }
  });
  return merged;
}
var deviceManagerSection = document.getElementById("device-manager");
var toggleDeviceBtn = document.getElementById("toggleDeviceManager");
const deviceListContainer = document.getElementById("deviceListContainer");
const deviceManagerLists = (() => {
  const globalScope =
    (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE)
      ? CORE_GLOBAL_SCOPE
      : (typeof globalThis !== 'undefined' && globalThis)
        ? globalThis
        : (typeof window !== 'undefined' && window)
          ? window
          : (typeof self !== 'undefined' && self)
            ? self
            : (typeof global !== 'undefined' && global)
              ? global
              : null;

  if (
    globalScope &&
    globalScope.deviceManagerLists &&
    globalScope.deviceManagerLists instanceof Map
  ) {
    return globalScope.deviceManagerLists;
  }

  const created = new Map();
  if (globalScope && typeof globalScope === 'object') {
    try {
      globalScope.deviceManagerLists = created;
    } catch (assignError) {
      void assignError;
      globalScope.deviceManagerLists = created;
    }
  }
  return created;
})();

const filterHelperScope = (() => {
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) return CORE_GLOBAL_SCOPE;
  if (typeof globalThis !== 'undefined' && globalThis) return globalThis;
  if (typeof window !== 'undefined' && window) return window;
  if (typeof self !== 'undefined' && self) return self;
  if (typeof global !== 'undefined' && global) return global;
  return null;
})();

function fallbackFilterSelect(selectElem, filterValue) {
  if (!selectElem || typeof selectElem !== "object") {
    return;
  }
  const text = (filterValue || "").toLowerCase();
  Array.from(selectElem.options || []).forEach(option => {
    if (!option || typeof option !== "object") return;
    const isMatch =
      option.value === "None"
      || text === ""
      || (option.textContent || "").toLowerCase().includes(text);
    option.hidden = !isMatch;
    option.disabled = !isMatch;
  });
}

function fallbackFilterDeviceList(listElem, filterValue) {
  if (!listElem || typeof listElem !== "object") {
    return;
  }
  const text = (filterValue || "").toLowerCase();
  Array.from(listElem.querySelectorAll ? listElem.querySelectorAll("li") : []).forEach(item => {
    if (!item || typeof item !== "object") return;
    const summary = item.querySelector ? item.querySelector(".device-summary span") : null;
    const content = summary && typeof summary.textContent === "string" ? summary.textContent.toLowerCase() : "";
    item.style.display = text === "" || content.includes(text) ? "" : "none";
  });
}

function fallbackAddInputClearButton(inputElem, callback) {
  if (!inputElem || typeof inputElem !== "object" || typeof inputElem.insertAdjacentElement !== "function") {
    return;
  }
  const translationSource =
    (typeof texts === "object" && texts)
      || (typeof window !== "undefined" && typeof window.texts === "object" && window.texts)
      || null;
  const clearLabel =
    (translationSource && translationSource[currentLang] && translationSource[currentLang].clearFilter)
      || "Clear filter";
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear-input-btn";
  clearBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, "clear-icon");
  clearBtn.setAttribute("aria-label", clearLabel);
  clearBtn.title = clearLabel;
  clearBtn.hidden = true;
  clearBtn.addEventListener("click", () => {
    inputElem.value = "";
    if (typeof callback === "function") {
      callback();
    }
    if (typeof inputElem.focus === "function") {
      inputElem.focus();
    }
  });
  inputElem.insertAdjacentElement("afterend", clearBtn);
  const toggle = () => {
    clearBtn.hidden = !inputElem.value;
  };
  inputElem.addEventListener("input", toggle);
  toggle();
}

function fallbackBindFilterInput(inputElem, callback) {
  if (!inputElem || typeof inputElem !== "object") {
    return;
  }
  const handler = typeof callback === "function" ? callback : () => {};
  inputElem.addEventListener("input", handler);
  inputElem.addEventListener("keydown", event => {
    if (event && event.key === "Escape") {
      inputElem.value = "";
      handler();
    }
  });
  fallbackAddInputClearButton(inputElem, handler);
}

function ensureFilterHelpers() {
  const scope = filterHelperScope && typeof filterHelperScope === "object"
    ? filterHelperScope
    : {};
  const attachHelper = (key, fn) => {
    if (typeof scope[key] === "function") {
      return;
    }
    try {
      scope[key] = fn;
    } catch (assignError) {
      try {
        Object.defineProperty(scope, key, {
          configurable: true,
          writable: true,
          value: fn,
        });
      } catch (defineError) {
        void defineError;
      }
    }
  };
  attachHelper("filterSelect", fallbackFilterSelect);
  attachHelper("filterDeviceList", fallbackFilterDeviceList);
  attachHelper("bindFilterInput", fallbackBindFilterInput);
  attachHelper("addInputClearButton", fallbackAddInputClearButton);
  return scope;
}

ensureFilterHelpers();

function applyFilters() {
  const helpers = ensureFilterHelpers();
  const filterFn = typeof helpers.filterDeviceList === "function"
    ? helpers.filterDeviceList
    : fallbackFilterDeviceList;
  if (!(deviceManagerLists instanceof Map)) {
    return;
  }
  deviceManagerLists.forEach(entry => {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const { list, filterInput } = entry;
    if (!list || typeof list !== "object") {
      return;
    }
    const value = filterInput && typeof filterInput.value === "string"
      ? filterInput.value
      : "";
    try {
      filterFn(list, value);
    } catch (filterError) {
      console.warn("Failed to apply device manager filters", filterError);
    }
  });
}
const deviceManagerPreferredOrder = [
  "cameras",
  "viewfinders",
  "monitors",
  "video",
  "wirelessReceivers",
  "directorMonitors",
  "iosVideo",
  "lenses",
  "fiz.motors",
  "fiz.controllers",
  "fiz.handUnits",
  "fiz.distance",
  "batteries",
  "batteryHotswaps",
  "accessories.batteries",
  "accessories.powerPlates",
  "accessories.cables",
  "accessories.cages",
  "accessories.cameraSupport",
  "accessories.cameraStabiliser",
  "accessories.chargers",
  "accessories.videoAssist",
  "accessories.media",
  "accessories.filters",
  "accessories.matteboxes",
  "accessories.rigging",
  "accessories.grip",
  "accessories.sliders",
  "accessories.tripodHeads",
  "accessories.tripods",
  "accessories.carts"
];

function normalizeCategoryKey(key) {
  if (!key) return null;
  if (key === "accessories" || key === "fiz" || key === "filterOptions") return null;
  if (key.startsWith("accessories.cables.")) return "accessories.cables";
  if (key === "videoAssist" && devices?.accessories?.videoAssist) return "accessories.videoAssist";
  if (key === "media" && devices?.accessories?.media) return "accessories.media";
  return key;
}

function getCategoryLabel(categoryKey, lang = currentLang) {
  if (!categoryKey) return "";
  const langNames = (typeof categoryNames === "object" && categoryNames && categoryNames[lang]) || {};
  if (langNames[categoryKey]) return langNames[categoryKey];
  const fallbackNames = (typeof categoryNames === "object" && categoryNames && categoryNames.en) || {};
  if (fallbackNames[categoryKey]) return fallbackNames[categoryKey];
  const parts = categoryKey.split('.');
  if (parts[0] === "accessories" && parts.length > 1) {
    const rest = parts.slice(1).map(part => humanizeKey(part));
    return `${humanizeKey('accessory')} ${rest.join(' ')}`.trim();
  }
  if (parts[0] === "fiz" && parts.length > 1) {
    const rest = parts.slice(1).map(part => humanizeKey(part));
    return `FIZ ${rest.join(' ')}`.trim();
  }
  return parts.map(part => humanizeKey(part)).join(' ');
}

function collectDeviceManagerCategories() {
  const categories = new Set();
  const addCategory = (key) => {
    const normalized = normalizeCategoryKey(key);
    if (!normalized) return;
    categories.add(normalized);
  };

  const traverseSchema = (node, path = []) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node.attributes)) {
      addCategory(path.join('.'));
    }
    Object.entries(node).forEach(([childKey, value]) => {
      if (childKey === 'attributes') return;
      if (value && typeof value === 'object') {
        traverseSchema(value, path.concat(childKey));
      }
    });
  };

  if (deviceSchema) {
    traverseSchema(deviceSchema, []);
  }

  const addFromData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return;
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'accessories') {
        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue && typeof subValue === 'object' && !Array.isArray(subValue)) {
              addCategory(`accessories.${subKey}`);
            }
          });
        }
      } else if (key === 'fiz') {
        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue && typeof subValue === 'object' && !Array.isArray(subValue)) {
              addCategory(`fiz.${subKey}`);
            }
          });
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        addCategory(key);
      }
    });
  };

  addFromData(devices);

  const sorted = Array.from(categories);
  const orderMap = new Map(deviceManagerPreferredOrder.map((key, index) => [key, index]));
  sorted.sort((a, b) => {
    const idxA = orderMap.has(a) ? orderMap.get(a) : deviceManagerPreferredOrder.length;
    const idxB = orderMap.has(b) ? orderMap.get(b) : deviceManagerPreferredOrder.length;
    if (idxA !== idxB) return idxA - idxB;
    return a.localeCompare(b);
  });
  return sorted;
}

function createDeviceCategorySection(categoryKey) {
  if (!deviceListContainer || deviceManagerLists.has(categoryKey)) return deviceManagerLists.get(categoryKey) || null;
  const section = document.createElement('div');
  section.className = 'device-category';
  const sanitizedId = categoryKey.replace(/[^a-z0-9]+/gi, '_');
  const heading = document.createElement('h4');
  heading.id = `category_${sanitizedId}`;
  heading.dataset.categoryKey = categoryKey;
  section.appendChild(heading);
  const filterInput = document.createElement('input');
  filterInput.type = 'search';
  filterInput.className = 'list-filter';
  filterInput.id = `${sanitizedId}ListFilter`;
  filterInput.dataset.categoryKey = categoryKey;
  const filterLabel = createHiddenLabel(ensureElementId(filterInput, `${sanitizedId}-list-filter`), `Filter ${categoryKey}`);
  section.appendChild(filterLabel);
  section.appendChild(filterInput);
  const list = document.createElement('ul');
  list.className = 'device-ul';
  const listId = sanitizedId === 'cameras' ? 'cameraList' : `${sanitizedId}List`;
  list.id = listId;
  if (sanitizedId === 'cameras') {
    list.setAttribute('data-current-id', 'camerasList');
  }
  section.appendChild(list);
  deviceListContainer.appendChild(section);

  const resolveFilterScope = () => {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    if (typeof global !== 'undefined') return global;
    return null;
  };

  const attachFilterBinding = () => {
    const scope = resolveFilterScope();
    const bindFn = scope && scope.bindFilterInput;
    const filterFn = scope && scope.filterDeviceList;
    if (typeof bindFn !== 'function' || typeof filterFn !== 'function') {
      return false;
    }
    bindFn(filterInput, () => filterFn(list, filterInput.value));
    return true;
  };

  if (!attachFilterBinding()) {
    enqueueCoreBootTask(() => {
      attachFilterBinding();
    });
  }
  const entry = { section, heading, filterInput, filterLabel, list, sanitizedId };
  deviceManagerLists.set(categoryKey, entry);
  return entry;
}

function updateDeviceManagerLocalization(lang = currentLang) {
  if (!deviceManagerLists.size) return;
  const placeholderTemplate = (texts[lang] && texts[lang].placeholder_filter) || 'Filter {item}...';
  const clearLabel = (texts[lang] && texts[lang].clearFilter) || 'Clear filter';
  deviceManagerLists.forEach((entry, categoryKey) => {
    const label = getCategoryLabel(categoryKey, lang);
    if (entry.heading) {
      entry.heading.textContent = label;
    }
    if (entry.filterInput) {
      const placeholder = placeholderTemplate.replace('{item}', label.toLowerCase());
      entry.filterInput.placeholder = placeholder;
      entry.filterInput.setAttribute('aria-label', placeholder);
      entry.filterInput.setAttribute('autocomplete', 'off');
      entry.filterInput.setAttribute('autocorrect', 'off');
      entry.filterInput.setAttribute('autocapitalize', 'off');
      entry.filterInput.setAttribute('spellcheck', 'false');
      entry.filterInput.setAttribute('inputmode', 'search');
      if (entry.filterLabel) {
        const labelText = placeholder.replace(/\s*(?:\.{3}|\u2026)$/, '');
        entry.filterLabel.textContent = labelText;
      }
      const clearBtn = entry.filterInput.nextElementSibling;
      if (clearBtn && clearBtn.classList.contains('clear-input-btn')) {
        clearBtn.setAttribute('aria-label', clearLabel);
        clearBtn.title = clearLabel;
      }
    }
  });
}

function syncDeviceManagerCategories() {
  if (!deviceListContainer) return;
  const categories = collectDeviceManagerCategories();
  const desiredSet = new Set(categories);
  const existingKeys = Array.from(deviceManagerLists.keys());
  categories.forEach(categoryKey => {
    if (!deviceManagerLists.has(categoryKey)) {
      createDeviceCategorySection(categoryKey);
    }
  });
  existingKeys.forEach(categoryKey => {
    if (!desiredSet.has(categoryKey)) {
      const entry = deviceManagerLists.get(categoryKey);
      if (entry && entry.section && entry.section.parentNode) {
        entry.section.parentNode.removeChild(entry.section);
      }
      deviceManagerLists.delete(categoryKey);
    }
  });
  categories.forEach(categoryKey => {
    const entry = deviceManagerLists.get(categoryKey);
    if (entry && entry.section) {
      deviceListContainer.appendChild(entry.section);
    }
  });
  updateDeviceManagerLocalization(currentLang);
}
function getCurrentProjectName() {
  const typedName =
    (setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '') || '';
  if (typedName) {
    return typedName;
  }
  return (setupSelect && setupSelect.value) || '';
}

function normalizeSetupName(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
}

function getSetupNameState() {
  const rawTyped =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value
      : '';
  const rawSelected =
    setupSelect && typeof setupSelect.value === 'string'
      ? setupSelect.value
      : '';
  const typedName = normalizeSetupName(rawTyped);
  const selectedName = normalizeSetupName(rawSelected);
  const renameInProgress = Boolean(
    selectedName
    && typedName
    && typedName !== selectedName,
  );
  const storageKey = selectedName || typedName || '';
  return {
    typedName,
    selectedName,
    renameInProgress,
    storageKey,
  };
}

function createProjectInfoSnapshotForStorage(baseInfo, options = {}) {
  if (baseInfo == null || typeof baseInfo !== 'object') {
    return baseInfo == null ? null : baseInfo;
  }
  const { projectNameOverride } = options;
  if (typeof projectNameOverride !== 'string' || !projectNameOverride) {
    return baseInfo;
  }
  if (
    typeof baseInfo.projectName === 'string'
    && normalizeSetupName(baseInfo.projectName) === projectNameOverride
  ) {
    return baseInfo;
  }
  return { ...baseInfo, projectName: projectNameOverride };
}

function getCurrentProjectStorageKey(options = {}) {
  const typedName =
    setupNameInput && typeof setupNameInput.value === 'string'
      ? setupNameInput.value.trim()
      : '';
  const selectedName =
    setupSelect && typeof setupSelect.value === 'string'
      ? setupSelect.value.trim()
      : '';

  if (options.allowTyped && typedName) {
    return typedName;
  }

  if (selectedName) {
    return selectedName;
  }

  if (!setupSelect) {
    return '';
  }

  if (
    typedName &&
    Array.from((setupSelect && setupSelect.options) || []).some(
      option => option && option.value === typedName
    )
  ) {
    return typedName;
  }

  return '';
}
newCategorySelect = document.getElementById("newCategory");
newSubcategorySelect = document.getElementById("newSubcategory");
subcategoryFieldDiv = document.getElementById("subcategoryField");
newNameInput = document.getElementById("newName");
newWattInput = document.getElementById("newWatt");
wattFieldDiv = document.getElementById("wattField");
dynamicFieldsDiv = document.getElementById("dynamicFields");
cameraFieldsDiv = document.getElementById("cameraFields");
cameraWattInput = document.getElementById("cameraWatt");
cameraVoltageInput = document.getElementById("cameraVoltage");
cameraPortTypeInput = document.getElementById("cameraPortType");
monitorFieldsDiv = document.getElementById("monitorFields");
monitorScreenSizeInput = document.getElementById("monitorScreenSize");
monitorBrightnessInput = document.getElementById("monitorBrightness");
monitorWattInput = document.getElementById("monitorWatt");
monitorVoltageInput = document.getElementById("monitorVoltage");
monitorPortTypeInput = document.getElementById("monitorPortType");
monitorVideoInputsContainer = document.getElementById("monitorVideoInputsContainer");

function populateCategoryOptions() {
  if (!newCategorySelect && typeof document !== 'undefined') {
    newCategorySelect = document.getElementById('newCategory');
  }
  if (!newCategorySelect) return;
  newCategorySelect.innerHTML = '';
  const addOpt = (val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = getCategoryLabel(val, currentLang);
    newCategorySelect.appendChild(opt);
  };

  // Add categories from schema when available
  if (deviceSchema) {
    if (deviceSchema.accessories) {
      for (const [sub, obj] of Object.entries(deviceSchema.accessories)) {
        if (sub === 'cables') {
          addOpt('accessories.cables');
        } else if (obj && obj.attributes) {
          addOpt(`accessories.${sub}`);
        }
      }
    }
    for (const [key, obj] of Object.entries(deviceSchema)) {
      if (key === 'accessories' || key === 'fiz') continue;
      if (obj && obj.attributes) addOpt(key);
    }
    if (deviceSchema.fiz) {
      for (const [sub, obj] of Object.entries(deviceSchema.fiz)) {
        if (obj && obj.attributes) addOpt(`fiz.${sub}`);
      }
    }
  }

  // Include any categories present in the device database that were not in the schema
  if (typeof devices === 'object') {
    const existing = new Set(Array.from(newCategorySelect.options).map(o => o.value));
    const addIfMissing = (val) => { if (!existing.has(val)) { addOpt(val); existing.add(val); } };
    for (const [key, obj] of Object.entries(devices)) {
      if (key === 'accessories') {
        for (const sub of Object.keys(obj || {})) {
          addIfMissing(`accessories.${sub}`);
        }
      } else if (key === 'fiz') {
        for (const sub of Object.keys(obj || {})) {
          addIfMissing(`fiz.${sub}`);
        }
      } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        addIfMissing(key);
      }
    }
  }

  syncDeviceManagerCategories();
}

populateCategoryOptions();

function getCategoryContainer(categoryKey, subcategory, { create = false } = {}) {
  if (!categoryKey) {
    return null;
  }
  if (categoryKey === 'accessories.cables') {
    if (!subcategory) {
      return null;
    }
    if (!devices.accessories) {
      if (!create) return null;
      devices.accessories = {};
    }
    if (!devices.accessories.cables) {
      if (!create) return null;
      devices.accessories.cables = {};
    }
    if (!devices.accessories.cables[subcategory]) {
      if (!create) return null;
      devices.accessories.cables[subcategory] = {};
    }
    return devices.accessories.cables[subcategory];
  }

  if (categoryKey.includes('.')) {
    const [mainCat, subCat] = categoryKey.split('.');
    if (!devices[mainCat]) {
      if (!create) return null;
      devices[mainCat] = {};
    }
    if (!devices[mainCat][subCat]) {
      if (!create) return null;
      devices[mainCat][subCat] = {};
    }
    return devices[mainCat][subCat];
  }

  if (!devices[categoryKey]) {
    if (!create) return null;
    devices[categoryKey] = {};
  }
  return devices[categoryKey];
}

function removeOriginalDeviceEntry(originalCategory, originalSubcategory, originalName, newCategory, newSubcategory, newName) {
  if (!originalCategory || !originalName) {
    return;
  }
  const movedCategory = originalCategory !== newCategory;
  const movedSubcategory =
    originalCategory === 'accessories.cables' && originalSubcategory !== newSubcategory;
  const renamed = originalName !== newName;
  if (!movedCategory && !movedSubcategory && !renamed) {
    return;
  }

  const container = getCategoryContainer(
    originalCategory,
    originalCategory === 'accessories.cables' ? originalSubcategory : null,
    { create: false }
  );
  if (!container || !Object.prototype.hasOwnProperty.call(container, originalName)) {
    return;
  }
  delete container[originalName];
  if (
    originalCategory === 'accessories.cables' &&
    devices.accessories?.cables &&
    container &&
    originalSubcategory &&
    !Object.keys(container).length
  ) {
    delete devices.accessories.cables[originalSubcategory];
  }
}
const monitorVideoOutputsContainer = document.getElementById("monitorVideoOutputsContainer");
var monitorWirelessTxInput = document.getElementById("monitorWirelessTx");
var monitorLatencyInput = document.getElementById("monitorLatency");
var monitorAudioOutputInput = document.getElementById("monitorAudioOutput");
var viewfinderFieldsDiv = document.getElementById("viewfinderFields");
var viewfinderScreenSizeInput = document.getElementById("viewfinderScreenSize");
var viewfinderBrightnessInput = document.getElementById("viewfinderBrightness");
var viewfinderWattInput = document.getElementById("viewfinderWatt");
var viewfinderVoltageInput = document.getElementById("viewfinderVoltage");
var viewfinderPortTypeInput = document.getElementById("viewfinderPortType");
const viewfinderVideoInputsContainer = document.getElementById("viewfinderVideoInputsContainer");
const viewfinderVideoOutputsContainer = document.getElementById("viewfinderVideoOutputsContainer");
var viewfinderWirelessTxInput = document.getElementById("viewfinderWirelessTx");
var viewfinderLatencyInput = document.getElementById("viewfinderLatency");
var videoFieldsDiv = document.getElementById("videoFields");
var videoPowerInput = document.getElementById("videoPower");
const videoVideoInputsContainer = document.getElementById("videoVideoInputsContainer");
const videoVideoOutputsContainer = document.getElementById("videoVideoOutputsContainer");
var videoFrequencyInput = document.getElementById("videoFrequency");
var videoLatencyInput = document.getElementById("videoLatency");

function showFormSection(section) {
  if (!section) return;
  section.classList.remove('hidden');
  if (typeof section.removeAttribute === 'function') {
    section.removeAttribute('hidden');
  }
  section.hidden = false;
  section.style.display = '';
}

function hideFormSection(section) {
  if (!section) return;
  section.classList.add('hidden');
  if (typeof section.setAttribute === 'function') {
    section.setAttribute('hidden', '');
  }
  section.hidden = true;
  section.style.display = 'none';
}
const addDeviceForm = wattFieldDiv ? wattFieldDiv.parentNode : null;
function placeWattField(category, data) {
  if (!wattFieldDiv || !addDeviceForm) return;
  const isVideoLike =
    category === "video" ||
    category === "wirelessReceivers" ||
    category === "iosVideo" ||
    (data && (data.videoInputs || data.videoOutputs || data.frequency));
  if (isVideoLike) {
    videoFieldsDiv.insertBefore(wattFieldDiv, videoFieldsDiv.firstChild);
  } else {
    addDeviceForm.insertBefore(wattFieldDiv, cameraFieldsDiv);
  }
}
var motorFieldsDiv = document.getElementById("motorFields");
var motorConnectorInput = document.getElementById("motorConnector");
var motorInternalInput = document.getElementById("motorInternal");
var motorTorqueInput = document.getElementById("motorTorque");
var motorGearInput = document.getElementById("motorGearTypes");
var motorNotesInput = document.getElementById("motorNotes");
var controllerFieldsDiv = document.getElementById("controllerFields");
var controllerConnectorInput = document.getElementById("controllerConnector");
var controllerPowerInput = document.getElementById("controllerPower");
var controllerBatteryInput = document.getElementById("controllerBattery");
var controllerConnectivityInput = document.getElementById("controllerConnectivity");
var controllerNotesInput = document.getElementById("controllerNotes");
var distanceFieldsDiv = document.getElementById("distanceFields");
var distanceConnectionInput = document.getElementById("distanceConnection");
var distanceMethodInput = document.getElementById("distanceMethod");
var distanceRangeInput = document.getElementById("distanceRange");
var distanceAccuracyInput = document.getElementById("distanceAccuracy");
var distanceOutputInput = document.getElementById("distanceOutput");
var distanceNotesInput = document.getElementById("distanceNotes");
const batteryPlatesContainer = document.getElementById("batteryPlatesContainer");
const cameraMediaContainer = document.getElementById("cameraMediaContainer");
const lensMountContainer = document.getElementById("lensMountContainer");
const powerDistContainer = document.getElementById("powerDistContainer");
const videoOutputsContainer = document.getElementById("videoOutputsContainer");
const fizConnectorContainer = document.getElementById("fizConnectorContainer");
const viewfinderContainer = document.getElementById("viewfinderContainer");
const timecodeContainer = document.getElementById("timecodeContainer");
var batteryFieldsDiv = document.getElementById("batteryFields");
const batteryPlateRow = document.getElementById("batteryPlateRow");
var batteryPlateSelect = document.getElementById("batteryPlateSelect");
var newCapacityInput = document.getElementById("newCapacity");
var newPinAInput    = document.getElementById("newPinA");
var newDtapAInput   = document.getElementById("newDtapA");
var dtapRow         = newDtapAInput ? newDtapAInput.parentElement : null;
var addDeviceBtn    = document.getElementById("addDeviceBtn");
var cancelEditBtn  = document.getElementById("cancelEditBtn");
var exportBtn       = document.getElementById("exportDataBtn");
var exportOutput    = document.getElementById("exportOutput");
var importFileInput = document.getElementById("importFileInput");
var importDataBtn   = document.getElementById("importDataBtn");
var skipLink       = document.getElementById("skipLink");

var categoryExcludedAttrs = {
  batteries: ["capacity", "pinA", "dtapA"],
  batteryHotswaps: ["capacity", "pinA"],
  "accessories.batteries": ["capacity", "pinA"],
  cameras: ["powerDrawWatts", "power", "recordingMedia", "lensMount", "videoOutputs", "fizConnectors", "viewfinder", "timecode"],
  monitors: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs", "audioOutput"],
  viewfinders: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs"],
  video: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  wirelessReceivers: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  iosVideo: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  "fiz.motors": ["fizConnectors", "gearTypes", "internalController", "notes", "powerDrawWatts", "torqueNm"],
  "fiz.controllers": ["batteryType", "connectivity", "fizConnectors", "internalController", "notes", "powerDrawWatts", "powerSource"],
  "fiz.distance": ["accuracy", "connectionCompatibility", "measurementMethod", "measurementRange", "notes", "outputDisplay", "powerDrawWatts"]
};

const schemaFieldConfigs = {
  '*': {
    brand: { type: 'text', placeholder: 'ARRI' },
    model: { type: 'text', placeholder: 'Mini LF' },
    notes: { type: 'textarea', rows: 3, placeholder: 'Additional notes' }
  },
  batteries: {
    mount_type: { type: 'text', placeholder: 'V-Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  'accessories.batteries': {
    mount_type: { type: 'text', placeholder: 'V-Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  batteryHotswaps: {
    mount_type: { type: 'text', placeholder: 'Gold Mount' },
    pinV: { type: 'number', step: '0.1', suffix: 'V' },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  cameras: {
    recordingCodecs: { type: 'list', placeholder: 'ProRes 422 HQ' },
    resolutions: { type: 'list', placeholder: '4.5K Open Gate' },
    sensorModes: { type: 'list', placeholder: 'LF Open Gate' },
    viewfinder: { type: 'json', rows: 4 },
    timecode: { type: 'json', rows: 3 },
    weight_g: { type: 'number', step: '1', suffix: 'g' }
  },
  monitors: {
    audioInput: { type: 'text', placeholder: '3.5mm stereo' },
    audioIo: { type: 'text', placeholder: 'SDI / HDMI' },
    audioOutput: { type: 'text', placeholder: '3.5mm stereo' },
    bluetooth: { type: 'boolean' },
    latencyMs: { type: 'text', placeholder: '< 1ms' },
    wireless: { type: 'text', placeholder: 'Bolt 6' },
    wirelessRX: { type: 'boolean' },
    wirelessTx: { type: 'boolean' }
  },
  video: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  wirelessReceivers: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  iosVideo: {
    frequency: { type: 'text', placeholder: '5 GHz' },
    latencyMs: { type: 'text', placeholder: '1 ms' }
  },
  'fiz.motors': {
    gearTypes: { type: 'list', placeholder: '0.8 MOD' },
    internalController: { type: 'boolean' }
  },
  'fiz.controllers': {
    connectivity: { type: 'text', placeholder: '2.4 GHz' },
    internalController: { type: 'boolean' }
  },
  'fiz.distance': {
    accuracy: { type: 'text', placeholder: '± 1"' }
  }
};

function formatAttributeLabel(attr) {
  return attr
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, ch => ch.toUpperCase())
    .trim();
}

function resolveSchemaFieldConfig(category, attr) {
  if (!category) return schemaFieldConfigs['*'][attr] || null;
  const parts = category.split('.');
  while (parts.length) {
    const key = parts.join('.');
    if (schemaFieldConfigs[key] && schemaFieldConfigs[key][attr]) {
      return schemaFieldConfigs[key][attr];
    }
    parts.pop();
  }
  return schemaFieldConfigs['*'][attr] || null;
}

function autoRows(text, min = 3, max = 10) {
  if (!text) return min;
  const lines = text.split('\n').length + 1;
  return Math.max(min, Math.min(max, lines));
}

function createSchemaField(category, attr, value) {
  const config = resolveSchemaFieldConfig(category, attr) || {};
  const attrId = `attr-${attr}`;
  const labelText = config.label || formatAttributeLabel(attr);
  let inputType = config.type;

  if (!inputType) {
    if (Array.isArray(value)) {
      inputType = value.every(item => typeof item === 'string') ? 'list' : 'json';
    } else if (typeof value === 'number') {
      inputType = 'number';
    } else if (typeof value === 'boolean') {
      inputType = 'boolean';
    } else if (value && typeof value === 'object') {
      inputType = 'json';
    } else {
      inputType = 'text';
    }
  }

  if (inputType === 'boolean') {
    const row = document.createElement('div');
    row.className = 'form-row schema-form-row';

    const label = document.createElement('label');
    label.setAttribute('for', attrId);
    label.textContent = labelText;
    row.appendChild(label);

    const controlContainer = document.createElement('div');
    controlContainer.className = 'schema-control schema-control--checkbox';
    const inlineWrap = document.createElement('div');
    inlineWrap.className = 'schema-control-inline';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = attrId;
    input.className = 'schema-input schema-input--checkbox';
    input.dataset.attrType = 'boolean';
    input.checked = value === undefined ? !!config.default : !!value;
    inlineWrap.appendChild(input);

    controlContainer.appendChild(inlineWrap);
    if (config.help) {
      const help = document.createElement('p');
      help.className = 'schema-field-help';
      help.textContent = config.help;
      controlContainer.appendChild(help);
    }

    row.appendChild(controlContainer);
    return row;
  }

  const row = document.createElement('div');
  row.className = 'form-row schema-form-row';
  const label = document.createElement('label');
  label.setAttribute('for', attrId);
  label.textContent = labelText;
  row.appendChild(label);

  let control;
  if (inputType === 'list' || inputType === 'json' || inputType === 'textarea') {
    control = document.createElement('textarea');
    control.className = 'schema-input schema-input--textarea';
    control.id = attrId;
    const textValue = value === undefined || value === null
      ? ''
      : inputType === 'list' && Array.isArray(value)
        ? value.join('\n')
        : typeof value === 'string'
          ? value
          : JSON.stringify(value, null, 2);
    control.value = textValue;
    control.rows = config.rows || autoRows(control.value);
  } else {
    control = document.createElement('input');
    control.className = 'schema-input';
    control.id = attrId;
    control.type = inputType === 'number' ? 'number' : 'text';
    if (inputType === 'number') {
      if (config.step) control.step = config.step;
    }
    if (value !== undefined && value !== null) {
      control.value = value;
    }
  }

  control.dataset.attrType = inputType;
  if (config.placeholder && !control.value) {
    control.placeholder = config.placeholder;
  }

  const controlContainer = document.createElement('div');
  controlContainer.className = 'schema-control';
  const inlineWrap = document.createElement('div');
  inlineWrap.className = 'schema-control-inline';
  inlineWrap.appendChild(control);
  if (config.suffix) {
    const suffix = document.createElement('span');
    suffix.className = 'schema-field-suffix';
    suffix.textContent = config.suffix;
    inlineWrap.appendChild(suffix);
  }
  controlContainer.appendChild(inlineWrap);

  if (config.help) {
    const help = document.createElement('p');
    help.className = 'schema-field-help';
    help.textContent = config.help;
    controlContainer.appendChild(help);
  }

  row.appendChild(controlContainer);

  return row;
}

function getSchemaAttributesForCategory(category) {
  if (!deviceSchema) return [];
  const parts = category.split('.');
  let node = deviceSchema;
  for (const p of parts) {
    node = node && node[p];
    if (!node) return [];
  }
  return Array.isArray(node.attributes) ? node.attributes : [];
}

function getCombinedCategoryAttributes(category, data = {}, exclude = []) {
  const seen = new Set();
  const attrs = [];
  const skip = (attr) => !attr || exclude.includes(attr) || seen.has(attr);

  for (const attr of getSchemaAttributesForCategory(category)) {
    if (skip(attr)) continue;
    seen.add(attr);
    attrs.push(attr);
  }

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const key of Object.keys(data)) {
      if (skip(key)) continue;
      seen.add(key);
      attrs.push(key);
    }
  }

  return attrs;
}

function clearDynamicFields() {
  if (!dynamicFieldsDiv) return;
  dynamicFieldsDiv.innerHTML = '';
  dynamicFieldsDiv.hidden = true;
  if (dynamicFieldsDiv.dataset) {
    delete dynamicFieldsDiv.dataset.attrs;
  }
}

function buildDynamicFields(category, data = {}, exclude = []) {
  if (!dynamicFieldsDiv) return;
  const attrs = getCombinedCategoryAttributes(category, data, exclude);
  dynamicFieldsDiv.innerHTML = '';
  if (!attrs.length) {
    dynamicFieldsDiv.hidden = true;
    if (dynamicFieldsDiv.dataset) {
      delete dynamicFieldsDiv.dataset.attrs;
    }
    return;
  }
  dynamicFieldsDiv.hidden = false;
  if (dynamicFieldsDiv.dataset) {
    dynamicFieldsDiv.dataset.attrs = JSON.stringify(attrs);
  }
  const list = document.createElement('div');
  list.className = 'schema-attribute-list';
  for (const attr of attrs) {
    const value = data && data[attr] !== undefined ? data[attr] : undefined;
    list.appendChild(createSchemaField(category, attr, value));
  }
  dynamicFieldsDiv.appendChild(list);
}

const COLLECTED_DYNAMIC_ATTRS_SYMBOL =
  typeof Symbol === 'function' ? Symbol('collectedDynamicAttrs') : '__collectedDynamicAttrs';

function markCollectedDynamicAttributes(target, attrs) {
  if (!target || !Array.isArray(attrs)) {
    return;
  }
  try {
    Object.defineProperty(target, COLLECTED_DYNAMIC_ATTRS_SYMBOL, {
      configurable: true,
      enumerable: false,
      value: attrs.slice(),
    });
  } catch (error) {
    void error;
  }
}

function getCollectedDynamicAttributes(source) {
  if (!source || typeof source !== 'object') {
    return [];
  }
  const attrs = source[COLLECTED_DYNAMIC_ATTRS_SYMBOL];
  return Array.isArray(attrs) ? attrs : [];
}

function removeClearedDynamicAttributes(target, attrs, values) {
  if (!target || !Array.isArray(attrs)) {
    return;
  }
  attrs.forEach(attr => {
    if (
      Object.prototype.hasOwnProperty.call(target, attr) &&
      !Object.prototype.hasOwnProperty.call(values, attr)
    ) {
      delete target[attr];
    }
  });
}

function collectDynamicFieldValues(category, exclude = []) {
  let attrs = [];
  if (dynamicFieldsDiv && dynamicFieldsDiv.dataset && dynamicFieldsDiv.dataset.attrs) {
    try {
      const parsed = JSON.parse(dynamicFieldsDiv.dataset.attrs);
      if (Array.isArray(parsed)) {
        attrs = parsed;
      }
    } catch (err) {
      console.warn('Failed to parse dynamic field attributes', err);
    }
  }
  if (!attrs.length) {
    attrs = getCombinedCategoryAttributes(category, {}, exclude);
  }
  const filteredAttrs = attrs.filter(attr => !exclude.includes(attr));
  const result = {};
  for (const attr of filteredAttrs) {
    const el = document.getElementById(`attr-${attr}`);
    if (!el) {
      continue;
    }
    const type = el.dataset.attrType || el.type;
    if (type === 'boolean') {
      result[attr] = el.checked;
      continue;
    }
    if (type === 'list') {
      const list = el.value
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean);
      if (list.length) {
        result[attr] = list;
      }
      continue;
    }
    if (type === 'json') {
      const raw = el.value.trim();
      if (raw) {
        try {
          result[attr] = JSON.parse(raw);
        } catch {
          result[attr] = raw;
        }
      }
      continue;
    }
    if (type === 'number') {
      const num = parseFloat(el.value);
      if (!isNaN(num)) {
        result[attr] = num;
      }
      continue;
    }
    if (el.value !== '') {
      result[attr] = el.value;
    }
  }
  markCollectedDynamicAttributes(result, filteredAttrs);
  return result;
}

function applyDynamicFieldValues(target, category, exclude = []) {
  if (!target) {
    return {};
  }
  const values = collectDynamicFieldValues(category, exclude);
  Object.assign(target, values);
  const attrs = getCollectedDynamicAttributes(values);
  removeClearedDynamicAttributes(target, attrs, values);
  return values;
}
var languageSelect  = document.getElementById("languageSelect");
var pinkModeToggle  = document.getElementById("pinkModeToggle");
var pinkModeHelpIcon = document.getElementById("pinkModeHelpIcon");
var darkModeToggle  = document.getElementById("darkModeToggle");
var helpButton      = document.getElementById("helpButton");
var reloadButton    = document.getElementById("reloadButton");
var helpDialog      = document.getElementById("helpDialog");
var closeHelpBtn    = document.getElementById("closeHelp");
var helpSearch      = document.getElementById("helpSearch");
var helpNoResults   = document.getElementById("helpNoResults");
var helpResultsSummary = document.getElementById("helpResultsSummary");
var helpResultsAssist = document.getElementById("helpResultsAssist");
var helpSearchClear = document.getElementById("helpSearchClear");
var helpSectionsContainer = document.getElementById("helpSections");
var helpQuickLinksNav = document.getElementById("helpQuickLinks");
var helpQuickLinksHeading = document.getElementById("helpQuickLinksHeading");
var helpQuickLinksList = document.getElementById("helpQuickLinksList");
const installPromptBanner = document.getElementById("installPromptBanner");
const installPromptBannerText = document.getElementById("installPromptBannerText");
const installPromptBannerAction = document.getElementById("installPromptBannerAction");
const installPromptBannerIcon = document.getElementById("installPromptBannerIcon");
const installPromptBannerDismiss = document.getElementById("installPromptBannerDismiss");
const installGuideDialog = document.getElementById("installGuideDialog");
const installGuideTitle = document.getElementById("installGuideTitle");
const installGuideIntro = document.getElementById("installGuideIntro");
const installGuideSteps = document.getElementById("installGuideSteps");
const installGuideNote = document.getElementById("installGuideNote");
const installGuideMigration = document.getElementById("installGuideMigration");
const installGuideMigrationTitle = document.getElementById("installGuideMigrationTitle");
const installGuideMigrationIntro = document.getElementById("installGuideMigrationIntro");
const installGuideMigrationSteps = document.getElementById("installGuideMigrationSteps");
const installGuideMigrationNote = document.getElementById("installGuideMigrationNote");
const installGuideClose = document.getElementById("installGuideClose");
var iosPwaHelpDialog = document.getElementById("iosPwaHelpDialog");
const iosPwaHelpTitle = document.getElementById("iosPwaHelpTitle");
const iosPwaHelpIntro = document.getElementById("iosPwaHelpIntro");
const iosPwaHelpStep1 = document.getElementById("iosPwaHelpStep1");
mountVoltageSectionElem = document.getElementById('mountVoltageSettings');
mountVoltageHeadingElem = document.getElementById('mountVoltageHeading');
mountVoltageDescriptionElem = document.getElementById('mountVoltageDescription');
mountVoltageNoteElem = document.getElementById('mountVoltageNote');
mountVoltageResetButton = document.getElementById('mountVoltageReset');
syncMountVoltageResetButtonGlobal(mountVoltageResetButton);
mountVoltageTitleElems = {
  V: document.getElementById('mountVoltageVTitle'),
  Gold: document.getElementById('mountVoltageGoldTitle'),
  B: document.getElementById('mountVoltageBTitle'),
};
mountVoltageInputs = {
  'V-Mount': {
    high: document.getElementById('mountVoltageVHigh'),
    low: document.getElementById('mountVoltageVLow'),
    highLabel: document.getElementById('mountVoltageVHighLabel'),
    lowLabel: document.getElementById('mountVoltageVLowLabel'),
  },
  'Gold-Mount': {
    high: document.getElementById('mountVoltageGoldHigh'),
    low: document.getElementById('mountVoltageGoldLow'),
    highLabel: document.getElementById('mountVoltageGoldHighLabel'),
    lowLabel: document.getElementById('mountVoltageGoldLowLabel'),
  },
  'B-Mount': {
    high: document.getElementById('mountVoltageBHigh'),
    low: document.getElementById('mountVoltageBLow'),
    highLabel: document.getElementById('mountVoltageBHighLabel'),
    lowLabel: document.getElementById('mountVoltageBLowLabel'),
  },
};
updateMountVoltageInputsFromState();
updateMountVoltageSettingLabels(currentLang);
const iosPwaHelpStep2 = document.getElementById("iosPwaHelpStep2");
const iosPwaHelpStep3 = document.getElementById("iosPwaHelpStep3");

setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  loadPinkModeIconsFromFiles().catch(() => {});
}
const iosPwaHelpStep4 = document.getElementById("iosPwaHelpStep4");
const iosPwaHelpNote = document.getElementById("iosPwaHelpNote");
var iosPwaHelpClose = document.getElementById("iosPwaHelpClose");

let installBannerSetupComplete = false;
let currentInstallGuidePlatform = null;
let lastActiveBeforeInstallGuide = null;
let lastActiveBeforeIosHelp = null;

function parseRgbComponent(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }
  if (typeof value !== 'string') return null;
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

function getInstallBannerDismissedInSession() {
  if (!installBannerGlobalScope || typeof installBannerGlobalScope !== 'object') {
    return false;
  }
  if (typeof installBannerGlobalScope.installBannerDismissedInSession !== 'boolean') {
    installBannerGlobalScope.installBannerDismissedInSession = false;
    return false;
  }
  return installBannerGlobalScope.installBannerDismissedInSession;
}

function setInstallBannerDismissedInSession(value) {
  if (!installBannerGlobalScope || typeof installBannerGlobalScope !== 'object') {
    return;
  }
  installBannerGlobalScope.installBannerDismissedInSession = Boolean(value);
}

function hasDismissedInstallBanner() {
  if (getInstallBannerDismissedInSession()) return true;
  if (typeof localStorage === 'undefined') return false;
  try {
    const storedValue = localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY);
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
    localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, '1');
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

  installGuideDialog.setAttribute('data-platform', platform);

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
    try {
      focusTarget.focus();
    } catch {
      focusTarget.focus();
    }
  }
}

function closeInstallGuide() {
  if (!installGuideDialog) return;
  installGuideDialog.setAttribute('hidden', '');
  currentInstallGuidePlatform = null;
  if (lastActiveBeforeInstallGuide && typeof lastActiveBeforeInstallGuide.focus === 'function') {
    try {
      lastActiveBeforeInstallGuide.focus();
    } catch {
      lastActiveBeforeInstallGuide.focus();
    }
  }
}

function setupInstallBanner() {
  if (!installPromptBanner) return false;

  if (installBannerSetupComplete) {
    applyInstallTexts(currentLang);
    updateInstallBannerColors();
    updateInstallBannerVisibility();
    updateInstallBannerPosition();
    return true;
  }

  installBannerSetupComplete = true;

  if (installPromptBannerIcon && typeof applyIconGlyph === 'function') {
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
    installGuideClose.addEventListener('click', () => {
      closeInstallGuide();
    });
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

  return true;
}

function applyInstallTexts(lang) {
  const fallbackTexts = texts.en || {};
  const langTexts = texts[lang] || fallbackTexts;
  const bannerText = langTexts.installBannerText || fallbackTexts.installBannerText || '';
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

  const closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose || '';
  const dismissLabel =
    langTexts.installBannerDismiss ||
    fallbackTexts.installBannerDismiss ||
    closeLabel ||
    '';

  if (installPromptBannerDismiss) {
    const labelText = dismissLabel || '';
    if (typeof setButtonLabelWithIcon === 'function') {
      setButtonLabelWithIcon(installPromptBannerDismiss, '', ICON_GLYPHS.circleX);
    }
    Array.from(installPromptBannerDismiss.querySelectorAll('.visually-hidden')).forEach(node => {
      if (node && node.parentNode === installPromptBannerDismiss) {
        installPromptBannerDismiss.removeChild(node);
      }
    });
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

  if (installGuideClose) {
    if (closeLabel && typeof setButtonLabelWithIcon === 'function') {
      setButtonLabelWithIcon(installGuideClose, closeLabel, ICON_GLYPHS.circleX);
      installGuideClose.setAttribute('aria-label', closeLabel);
      installGuideClose.setAttribute('title', closeLabel);
    } else if (!closeLabel) {
      installGuideClose.removeAttribute('aria-label');
      installGuideClose.removeAttribute('title');
    }
  }

  if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
    renderInstallGuideContent(currentInstallGuidePlatform, lang);
  }

  updateInstallBannerPosition();
  updateInstallBannerColors();
}

function shouldShowIosPwaHelp() {
  try {
    if (helpModuleApi && typeof helpModuleApi.shouldShowIosPwaHelp === 'function') {
      return Boolean(helpModuleApi.shouldShowIosPwaHelp(() => iosPwaHelpDialog));
    }
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('shouldShowIosPwaHelp() failed', error);
    }
  }
  return false;
}

function openIosPwaHelp() {
  if (!iosPwaHelpDialog) return;
  if (!shouldShowIosPwaHelp()) return;
  lastActiveBeforeIosHelp = document.activeElement;
  iosPwaHelpDialog.removeAttribute('hidden');
  const focusTarget = iosPwaHelpClose || iosPwaHelpDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    try {
      focusTarget.focus();
    } catch {
      focusTarget.focus();
    }
  }
}

function closeIosPwaHelp(storeDismissal = false) {
  if (!iosPwaHelpDialog) return;
  iosPwaHelpDialog.setAttribute('hidden', '');
  if (storeDismissal) {
    markIosPwaHelpDismissed();
  }
  if (lastActiveBeforeIosHelp && typeof lastActiveBeforeIosHelp.focus === 'function') {
    try {
      lastActiveBeforeIosHelp.focus();
    } catch {
      lastActiveBeforeIosHelp.focus();
    }
  }
}

function maybeShowIosPwaHelp() {
  openIosPwaHelp();
}

if (iosPwaHelpClose) {
  iosPwaHelpClose.addEventListener('click', () => closeIosPwaHelp(true));
}

if (iosPwaHelpDialog) {
  iosPwaHelpDialog.addEventListener('click', event => {
    if (event.target === iosPwaHelpDialog) {
      closeIosPwaHelp(true);
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' && event.key !== 'Esc') return;
  let handled = false;
  if (iosPwaHelpDialog && !iosPwaHelpDialog.hasAttribute('hidden')) {
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
var hoverHelpButton = document.getElementById("hoverHelpButton");
var settingsButton  = document.getElementById("settingsButton");
const settingsButtonIcon = settingsButton?.querySelector?.('.settings-button-icon');
var settingsDialog  = document.getElementById("settingsDialog");
if (settingsButton) {
  settingsButton.setAttribute('data-allow-hover-help', '');
}
if (settingsButtonIcon) {
  applyIconGlyph(settingsButtonIcon, ICON_GLYPHS.gears);
  settingsButtonIcon.setAttribute('aria-hidden', 'true');
}
if (settingsDialog) {
  settingsDialog.setAttribute('data-allow-hover-help', '');
}
const settingsTablist = document.getElementById('settingsTablist');
const settingsTabButtons = settingsTablist
  ? Array.from(settingsTablist.querySelectorAll('[role="tab"]'))
  : [];
const settingsTabsContainer = settingsTablist
  ? settingsTablist.closest('.settings-tabs-container') || settingsTablist
  : null;
const settingsTabsScrollPrev = document.getElementById('settingsTabsScrollPrev');
const settingsTabsScrollNext = document.getElementById('settingsTabsScrollNext');
let settingsTabsOverflowFrame = 0;

const SETTINGS_TABS_SIDEBAR_QUERY = '(max-width: 720px)';
const settingsTabsOrientationQuery =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(SETTINGS_TABS_SIDEBAR_QUERY)
    : null;

function applySettingsTabsOrientation(matches) {
  if (!settingsTablist) return;
  settingsTablist.setAttribute('aria-orientation', matches ? 'vertical' : 'horizontal');
  scheduleSettingsTabsOverflowUpdate();
}

if (settingsTabsOrientationQuery) {
  try {
    applySettingsTabsOrientation(settingsTabsOrientationQuery.matches);
    const handleSettingsTabsOrientationChange = event => {
      applySettingsTabsOrientation(event.matches);
    };
    if (typeof settingsTabsOrientationQuery.addEventListener === 'function') {
      settingsTabsOrientationQuery.addEventListener('change', handleSettingsTabsOrientationChange);
    } else if (typeof settingsTabsOrientationQuery.addListener === 'function') {
      settingsTabsOrientationQuery.addListener(handleSettingsTabsOrientationChange);
    }
  } catch {
    applySettingsTabsOrientation(false);
  }
} else if (settingsTablist) {
  settingsTablist.setAttribute('aria-orientation', 'horizontal');
}

function updateSettingsTabsOverflowIndicators() {
  if (!settingsTablist || !settingsTabsContainer) {
    if (settingsTabsScrollPrev) {
      settingsTabsScrollPrev.hidden = true;
    }
    if (settingsTabsScrollNext) {
      settingsTabsScrollNext.hidden = true;
    }
    return;
  }

  const scrollWidth = typeof settingsTablist.scrollWidth === 'number'
    ? settingsTablist.scrollWidth
    : 0;
  const clientWidth = typeof settingsTablist.clientWidth === 'number'
    ? settingsTablist.clientWidth
    : 0;
  const rawScrollLeft = typeof settingsTablist.scrollLeft === 'number'
    ? settingsTablist.scrollLeft
    : Number(settingsTablist.scrollLeft) || 0;
  const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
  const scrollLeft = Math.min(maxScrollLeft, Math.max(0, rawScrollLeft));
  const canScroll = scrollWidth > clientWidth + 4;
  const atStart = !canScroll || scrollLeft <= 1;
  const atEnd = !canScroll || Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;

  settingsTabsContainer.classList.toggle('is-scrollable', canScroll);
  settingsTabsContainer.classList.toggle('is-at-start', atStart);
  settingsTabsContainer.classList.toggle('is-at-end', atEnd);

  if (settingsTabsScrollPrev) {
    settingsTabsScrollPrev.hidden = !canScroll;
    settingsTabsScrollPrev.disabled = atStart;
  }

  if (settingsTabsScrollNext) {
    settingsTabsScrollNext.hidden = !canScroll;
    settingsTabsScrollNext.disabled = atEnd;
  }
}

function scheduleSettingsTabsOverflowUpdate() {
  if (!settingsTablist) return;

  if (
    typeof window !== 'undefined' &&
    typeof window.requestAnimationFrame === 'function'
  ) {
    if (settingsTabsOverflowFrame) {
      if (typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(settingsTabsOverflowFrame);
      }
      settingsTabsOverflowFrame = 0;
    }

    settingsTabsOverflowFrame = window.requestAnimationFrame(() => {
      settingsTabsOverflowFrame = 0;
      updateSettingsTabsOverflowIndicators();
    });
  } else {
    updateSettingsTabsOverflowIndicators();
  }
}

function scrollSettingsTabs(direction) {
  if (!settingsTablist) return;

  const distance = settingsTablist.clientWidth
    ? settingsTablist.clientWidth * 0.75
    : 200;
  const amount = direction * distance;

  if (typeof settingsTablist.scrollBy === 'function') {
    try {
      settingsTablist.scrollBy({ left: amount, behavior: 'smooth' });
    } catch {
      settingsTablist.scrollLeft += amount;
    }
  } else {
    settingsTablist.scrollLeft += amount;
  }

  scheduleSettingsTabsOverflowUpdate();
}

if (settingsTabsScrollPrev) {
  settingsTabsScrollPrev.addEventListener('click', () => {
    scrollSettingsTabs(-1);
  });
}

if (settingsTabsScrollNext) {
  settingsTabsScrollNext.addEventListener('click', () => {
    scrollSettingsTabs(1);
  });
}

if (settingsTablist) {
  let settingsTabsPassiveOptions = false;
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    try {
      const passiveTestHandler = () => {};
      const passiveTestOptions = Object.defineProperty({}, 'passive', {
        get() {
          settingsTabsPassiveOptions = { passive: true };
          return false;
        },
      });
      window.addEventListener('testPassive', passiveTestHandler, passiveTestOptions);
      window.removeEventListener('testPassive', passiveTestHandler, passiveTestOptions);
    } catch {
      settingsTabsPassiveOptions = false;
    }
  }

  settingsTablist.addEventListener(
    'scroll',
    () => {
      scheduleSettingsTabsOverflowUpdate();
    },
    settingsTabsPassiveOptions
  );

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('resize', scheduleSettingsTabsOverflowUpdate, settingsTabsPassiveOptions);
  }
}
const settingsTabPanels = settingsDialog
  ? Array.from(settingsDialog.querySelectorAll('.settings-panel'))
  : [];
const settingsTabGeneral = document.getElementById('settingsTab-general');
const settingsTabAutoGear = document.getElementById('settingsTab-autoGear');
const settingsTabAccessibility = document.getElementById('settingsTab-accessibility');
const settingsTabBackup = document.getElementById('settingsTab-backup');
const settingsTabData = document.getElementById('settingsTab-data');
const settingsTabAbout = document.getElementById('settingsTab-about');
const settingsTabIconAssignments = [
  [settingsTabGeneral, ICON_GLYPHS.settingsGeneral],
  [settingsTabAutoGear, ICON_GLYPHS.settingsAutoGear],
  [settingsTabAccessibility, ICON_GLYPHS.settingsAccessibility],
  [settingsTabBackup, ICON_GLYPHS.settingsBackup],
  [settingsTabData, ICON_GLYPHS.settingsData],
  [settingsTabAbout, ICON_GLYPHS.settingsAbout]
];
settingsTabIconAssignments.forEach(([button, glyph]) => {
  if (!button || !glyph) return;
  const iconElement = button.querySelector?.('.settings-tab-icon');
  if (!iconElement) return;
  applyIconGlyph(iconElement, glyph);
  iconElement.setAttribute('aria-hidden', 'true');
});
const generalSettingsHeading = document.getElementById('generalSettingsHeading');
const generalLanguageHeading = document.getElementById('generalLanguageHeading');
const generalAppearanceHeading = document.getElementById('generalAppearanceHeading');
const generalTypographyHeading = document.getElementById('generalTypographyHeading');
const generalBrandingHeading = document.getElementById('generalBrandingHeading');
var settingsLanguage = document.getElementById("settingsLanguage");
var settingsDarkMode = document.getElementById("settingsDarkMode");
var settingsPinkMode = document.getElementById("settingsPinkMode");
var accentColorInput = document.getElementById("accentColorInput");
var accentColorResetButton = document.getElementById("accentColorReset");
var settingsTemperatureUnit = document.getElementById('settingsTemperatureUnit');
var settingsFontSize = document.getElementById("settingsFontSize");
var settingsFontFamily = document.getElementById("settingsFontFamily");
const localFontsButton = document.getElementById("localFontsButton");
const localFontsInput = document.getElementById("localFontsInput");
const localFontsStatus = document.getElementById("localFontsStatus");
const localFontsGroup = document.getElementById("localFontsGroup");
const bundledFontGroup = document.getElementById("bundledFontOptions");
var settingsLogo = document.getElementById("settingsLogo");
var settingsLogoPreview = document.getElementById("settingsLogoPreview");

var activeSettingsTabId = '';
if (settingsTabButtons.length) {
  const initiallySelected = settingsTabButtons.find(button => button.getAttribute('aria-selected') === 'true');
  activeSettingsTabId = initiallySelected?.id || settingsTabButtons[0].id;
  try {
    const storedTab = localStorage.getItem('settingsActiveTab');
    if (storedTab && settingsTabButtons.some(button => button.id === storedTab)) {
      activeSettingsTabId = storedTab;
    }
  } catch (e) {
    console.warn('Could not load settings tab preference', e);
  }
}

function activateSettingsTab(tabId, options = {}) {
  if (!settingsTabButtons.length) return;
  const { focusTab = false } = options || {};
  let target = settingsTabButtons.find(button => button.id === tabId);
  if (!target) {
    target = settingsTabButtons[0];
  }
  if (!target) return;

  settingsTabButtons.forEach(button => {
    const selected = button === target;
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    button.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) {
      try {
        button.focus({ preventScroll: true });
      } catch {
        button.focus();
      }
    }
    button.classList.toggle('active', selected);
  });

  settingsTabPanels.forEach(panel => {
    if (!panel) return;
    const labelledBy = panel.getAttribute('aria-labelledby') || '';
    const labelledIds = labelledBy
      .split(/\s+/)
      .map(id => id.trim())
      .filter(Boolean);
    if (labelledIds.includes(target.id)) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });

  if (
    settingsTablist &&
    typeof settingsTablist.scrollWidth === 'number' &&
    typeof settingsTablist.clientWidth === 'number' &&
    settingsTablist.scrollWidth > settingsTablist.clientWidth + 4 &&
    typeof target.scrollIntoView === 'function'
  ) {
    try {
      target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    } catch {
      target.scrollIntoView();
    }
  }

  scheduleSettingsTabsOverflowUpdate();

  activeSettingsTabId = target.id;
  try {
    localStorage.setItem('settingsActiveTab', activeSettingsTabId);
  } catch (e) {
    console.warn('Could not save settings tab preference', e);
  }
}

if (settingsTabButtons.length) {
  activateSettingsTab(activeSettingsTabId);
  settingsTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      activateSettingsTab(button.id);
    });
    button.addEventListener('keydown', event => {
      const { key } = event;
      if (!key) return;
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End'].includes(key)) {
        return;
      }
      event.preventDefault();
      const currentIndex = settingsTabButtons.indexOf(button);
      if (currentIndex === -1) return;
      let nextIndex = currentIndex;
      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + settingsTabButtons.length) % settingsTabButtons.length;
      } else if (key === 'ArrowRight' || key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % settingsTabButtons.length;
      } else if (key === 'Home') {
        nextIndex = 0;
      } else if (key === 'End') {
        nextIndex = settingsTabButtons.length - 1;
      }
      const nextTab = settingsTabButtons[nextIndex];
      if (nextTab) {
        activateSettingsTab(nextTab.id, { focusTab: true });
      }
    });
  });
}

if (storageOpenBackupTabButton) {
  storageOpenBackupTabButton.addEventListener('click', () => {
    activateSettingsTab('settingsTab-backup', { focusTab: true });
    const backupButton = document.getElementById('backupSettings');
    if (backupButton && typeof backupButton.focus === 'function') {
      try {
        backupButton.focus({ preventScroll: true });
      } catch {
        backupButton.focus();
      }
    }
  });
}

var autoGearConditionConfigs = AUTO_GEAR_CONDITION_KEYS.reduce((acc, key) => {
  const section = autoGearConditionSections[key] || null;
  acc[key] = {
    key,
    section,
    label: autoGearConditionLabels[key] || null,
    select: autoGearConditionSelects[key] || null,
    addShortcut: autoGearConditionAddShortcuts[key] || null,
    removeButton: autoGearConditionRemoveButtons[key] || null,
    logicLabel: autoGearConditionLogicLabels[key] || null,
    logicSelect: autoGearConditionLogicSelects[key] || null,
  };
  if (section) {
    section.setAttribute('aria-hidden', section.hidden ? 'true' : 'false');
  }
  return acc;
}, {});
const createDeferredAutoGearRefresher = functionName => selected =>
  callCoreFunctionIfAvailable(functionName, [selected], { defer: true });

var autoGearConditionRefreshers = {
  always: null,
  scenarios: refreshAutoGearScenarioOptions,
  shootingDays: refreshAutoGearShootingDaysValue,
  mattebox: refreshAutoGearMatteboxOptions,
  cameraHandle: refreshAutoGearCameraHandleOptions,
  viewfinderExtension: refreshAutoGearViewfinderExtensionOptions,
  deliveryResolution: refreshAutoGearDeliveryResolutionOptions,
  videoDistribution: refreshAutoGearVideoDistributionOptions,
  camera: createDeferredAutoGearRefresher('refreshAutoGearCameraOptions'),
  cameraWeight: createDeferredAutoGearRefresher('refreshAutoGearCameraWeightCondition'),
  monitor: createDeferredAutoGearRefresher('refreshAutoGearMonitorOptions'),
  tripodHeadBrand: createDeferredAutoGearRefresher('refreshAutoGearTripodHeadOptions'),
  tripodBowl: createDeferredAutoGearRefresher('refreshAutoGearTripodBowlOptions'),
  tripodTypes: createDeferredAutoGearRefresher('refreshAutoGearTripodTypesOptions'),
  tripodSpreader: createDeferredAutoGearRefresher('refreshAutoGearTripodSpreaderOptions'),
  crewPresent: selected =>
    callCoreFunctionIfAvailable(
      'refreshAutoGearCrewOptions',
      [autoGearCrewPresentSelect, selected, 'crewPresent'],
      { defer: true },
    ),
  crewAbsent: selected =>
    callCoreFunctionIfAvailable(
      'refreshAutoGearCrewOptions',
      [autoGearCrewAbsentSelect, selected, 'crewAbsent'],
      { defer: true },
    ),
  wireless: createDeferredAutoGearRefresher('refreshAutoGearWirelessOptions'),
  motors: createDeferredAutoGearRefresher('refreshAutoGearMotorsOptions'),
  controllers: createDeferredAutoGearRefresher('refreshAutoGearControllersOptions'),
  distance: createDeferredAutoGearRefresher('refreshAutoGearDistanceOptions'),
};
var autoGearActiveConditions = new Set();

function getAutoGearConditionConfig(key) {
  if (!key) return null;
  if (Object.prototype.hasOwnProperty.call(autoGearConditionConfigs, key)) {
    return autoGearConditionConfigs[key];
  }
  return null;
}

function getAutoGearConditionLabel(key) {
  const config = getAutoGearConditionConfig(key);
  if (config && config.label && typeof config.label.textContent === 'string') {
    const text = config.label.textContent.trim();
    if (text) return text;
  }
  const fallback = AUTO_GEAR_CONDITION_FALLBACK_LABELS[key];
  if (typeof fallback === 'string' && fallback) {
    return fallback;
  }
  if (typeof key === 'string' && key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase());
  }
  return '';
}

function isAutoGearConditionActive(key) {
  return autoGearActiveConditions.has(key);
}

function refreshAutoGearConditionPicker() {
  if (!autoGearConditionSelect) return;
  const previousValue = autoGearConditionSelect.value || '';
  const placeholderLabel = texts[currentLang]?.autoGearConditionPlaceholder
    || texts.en?.autoGearConditionPlaceholder
    || 'Choose a condition';
  autoGearConditionSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderLabel;
  autoGearConditionSelect.appendChild(placeholder);
  const available = AUTO_GEAR_CONDITION_KEYS.filter(key => {
    if (!autoGearActiveConditions.has(key)) {
      return true;
    }
    return AUTO_GEAR_REPEATABLE_CONDITIONS.has(key);
  });
  available.forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = getAutoGearConditionLabel(key);
    autoGearConditionSelect.appendChild(option);
  });
  if (previousValue && available.includes(previousValue)) {
    autoGearConditionSelect.value = previousValue;
  } else {
    autoGearConditionSelect.value = '';
  }
  autoGearConditionSelect.disabled = available.length === 0;
}

function updateAutoGearConditionAddButtonState() {
  const hasSelection = autoGearConditionSelect && autoGearConditionSelect.value;
  const disabledPicker = autoGearConditionSelect ? autoGearConditionSelect.disabled : true;
  if (autoGearConditionAddButton) {
    autoGearConditionAddButton.disabled = !hasSelection || disabledPicker;
  }
  const hasAvailable = AUTO_GEAR_CONDITION_KEYS.some(key => {
    if (!autoGearActiveConditions.has(key)) {
      return true;
    }
    return AUTO_GEAR_REPEATABLE_CONDITIONS.has(key);
  });
  AUTO_GEAR_CONDITION_KEYS.forEach(key => {
    const shortcut = autoGearConditionAddShortcuts[key];
    if (shortcut) {
      shortcut.disabled = !hasAvailable;
    }
  });
}

function focusAutoGearConditionPicker() {
  if (autoGearConditionSelect) {
    try {
      autoGearConditionSelect.focus({ preventScroll: true });
    } catch {
      autoGearConditionSelect.focus();
    }
  }
}

function focusAutoGearConditionSection(key, options = {}) {
  const config = getAutoGearConditionConfig(key);
  if (!config || !config.section) {
    return;
  }
  const { section, select } = config;
  const { flash = false } = options || {};
  if (section.hidden) {
    section.hidden = false;
    section.setAttribute('aria-hidden', 'false');
  }
  if (flash && section.classList) {
    section.classList.add('auto-gear-condition-flash');
    const schedule = typeof window !== 'undefined' && typeof window.setTimeout === 'function'
      ? window.setTimeout
      : setTimeout;
    schedule(() => {
      section.classList.remove('auto-gear-condition-flash');
    }, 1200);
  }
  const target = select || section.querySelector('select, input, button');
  if (!target) return;
  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
}

function notifyAutoGearConditionRepeat(key) {
  if (typeof showNotification !== 'function') {
    return;
  }
  const template = texts[currentLang]?.autoGearConditionRepeatHint
    || texts.en?.autoGearConditionRepeatHint
    || '';
  if (!template) return;
  const label = getAutoGearConditionLabel(key);
  let message;
  if (label) {
    message = template.replace('{condition}', label);
  } else if (template.includes(' {condition}')) {
    message = template.replace(' {condition}', '');
  } else {
    message = template.replace('{condition}', '');
  }
  if (message) {
    showNotification('info', message);
  }
}

function handleAutoGearConditionShortcut() {
  if (!autoGearConditionSelect) {
    focusAutoGearConditionPicker();
    return;
  }
  if (autoGearConditionSelect.disabled) {
    focusAutoGearConditionPicker();
    return;
  }
  const availableOptions = Array.from(autoGearConditionSelect.options || [])
    .filter(option => option.value);
  if (availableOptions.length === 1) {
    autoGearConditionSelect.value = availableOptions[0].value;
    addAutoGearConditionFromPicker();
    return;
  }
  focusAutoGearConditionPicker();
}

function configureAutoGearConditionButtons() {
  const addLabel = texts[currentLang]?.autoGearConditionAddShortcut
    || texts.en?.autoGearConditionAddShortcut
    || 'Add another condition';
  const removeLabel = texts[currentLang]?.autoGearConditionRemove
    || texts.en?.autoGearConditionRemove
    || 'Remove this condition';
  AUTO_GEAR_CONDITION_KEYS.forEach(key => {
    const config = getAutoGearConditionConfig(key);
    if (!config) return;
    if (config.addShortcut) {
      setButtonLabelWithIcon(config.addShortcut, '', ICON_GLYPHS.add);
      config.addShortcut.setAttribute('aria-label', addLabel);
      config.addShortcut.setAttribute('title', addLabel);
      config.addShortcut.setAttribute('data-help', addLabel);
    }
    if (config.removeButton) {
      setButtonLabelWithIcon(config.removeButton, '', ICON_GLYPHS.minus);
      config.removeButton.setAttribute('aria-label', removeLabel);
      config.removeButton.setAttribute('title', removeLabel);
      config.removeButton.setAttribute('data-help', removeLabel);
    }
  });
}

function addAutoGearCondition(key, options = {}) {
  const config = getAutoGearConditionConfig(key);
  if (!config) return false;
  if (autoGearActiveConditions.has(key)) {
    if (AUTO_GEAR_REPEATABLE_CONDITIONS.has(key)) {
      focusAutoGearConditionSection(key, { flash: true });
      notifyAutoGearConditionRepeat(key);
      return true;
    }
    if (options.focus !== false && config.select) {
      try {
        config.select.focus({ preventScroll: true });
      } catch {
        config.select.focus();
      }
    }
    return false;
  }
  autoGearActiveConditions.add(key);
  if (config.section) {
    config.section.hidden = false;
    config.section.setAttribute('aria-hidden', 'false');
  }
  if (autoGearEditorDraft) {
    if (key === 'always') {
      autoGearEditorDraft.always = ['always'];
    } else if (key === 'shootingDays') {
      if (!autoGearEditorDraft.shootingDays) {
        autoGearEditorDraft.shootingDays = null;
      }
    } else if (!Array.isArray(autoGearEditorDraft[key])) {
      autoGearEditorDraft[key] = [];
    }
  }
  let values;
  if (key === 'always') {
    values = ['always'];
  } else if (key === 'shootingDays') {
    if (options.initialValues) {
      values = options.initialValues;
    } else if (autoGearEditorDraft?.shootingDays) {
      values = autoGearEditorDraft.shootingDays;
    } else {
      values = null;
    }
  } else {
    values = Array.isArray(options.initialValues)
      ? options.initialValues
      : (Array.isArray(autoGearEditorDraft?.[key]) ? autoGearEditorDraft[key] : []);
  }
  const refresher = autoGearConditionRefreshers[key];
  if (typeof refresher === 'function') {
    refresher(values);
  }
  if (config.logicSelect) {
    const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    const stored = property && autoGearEditorDraft
      ? normalizeAutoGearConditionLogic(autoGearEditorDraft[property])
      : 'all';
    config.logicSelect.value = stored;
    config.logicSelect.disabled = false;
  }
  if (autoGearConditionSelect) {
    autoGearConditionSelect.value = '';
  }
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (options.focus !== false && config.select) {
    try {
      config.select.focus({ preventScroll: true });
    } catch {
      config.select.focus();
    }
  }
  return true;
}

function addAutoGearConditionFromPicker() {
  if (!autoGearConditionSelect) return false;
  const key = autoGearConditionSelect.value;
  if (!key) {
    focusAutoGearConditionPicker();
    return false;
  }
  const result = addAutoGearCondition(key, { focus: true });
  if (result && autoGearConditionSelect) {
    autoGearConditionSelect.value = '';
  }
  updateAutoGearConditionAddButtonState();
  return result;
}

function removeAutoGearCondition(key, options = {}) {
  const config = getAutoGearConditionConfig(key);
  if (!config) return false;
  if (!autoGearActiveConditions.has(key)) return false;
  autoGearActiveConditions.delete(key);
  if (config.section) {
    config.section.hidden = true;
    config.section.setAttribute('aria-hidden', 'true');
  }
  if (config.logicSelect) {
    config.logicSelect.value = 'all';
    config.logicSelect.disabled = true;
  }
  if (!options.preserveDraft && autoGearEditorDraft) {
    if (key === 'always') {
      autoGearEditorDraft.always = [];
    } else if (key === 'shootingDays') {
      autoGearEditorDraft.shootingDays = null;
    } else if (key === 'cameraWeight') {
      autoGearEditorDraft.cameraWeight = null;
    } else if (Array.isArray(autoGearEditorDraft[key])) {
      autoGearEditorDraft[key] = [];
    }
    const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
    if (property) {
      autoGearEditorDraft[property] = 'all';
      if (autoGearEditorDraft.conditionLogic && typeof autoGearEditorDraft.conditionLogic === 'object') {
        delete autoGearEditorDraft.conditionLogic[key];
      }
    }
  }
  if (config.select) {
    Array.from(config.select.options || []).forEach(option => {
      option.selected = false;
    });
    config.select.value = '';
  }
  if (key === 'cameraWeight') {
    if (autoGearCameraWeightOperator) {
      autoGearCameraWeightOperator.value = 'greater';
    }
    if (autoGearCameraWeightValueInput) {
      autoGearCameraWeightValueInput.value = '';
    }
  }
  if (key === 'shootingDays') {
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.value = 'minimum';
    }
    if (autoGearShootingDaysInput) {
      autoGearShootingDaysInput.value = '';
    }
  }
  const refresher = autoGearConditionRefreshers[key];
  if (typeof refresher === 'function') {
    if (key === 'shootingDays') {
      refresher(null);
    } else {
      refresher([]);
    }
  }
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (options.focusPicker) {
    focusAutoGearConditionPicker();
  }
  return true;
}

function clearAllAutoGearConditions(options = {}) {
  const { preserveDraft = false } = options || {};
  Array.from(autoGearActiveConditions).forEach(key => {
    removeAutoGearCondition(key, { preserveDraft, focusPicker: false });
  });
  AUTO_GEAR_CONDITION_KEYS.forEach(key => {
    if (autoGearActiveConditions.has(key)) return;
    const config = getAutoGearConditionConfig(key);
    if (!config) return;
    if (config.section) {
      config.section.hidden = true;
      config.section.setAttribute('aria-hidden', 'true');
    }
    if (!preserveDraft && autoGearEditorDraft) {
      if (key === 'always') {
        autoGearEditorDraft.always = [];
      } else if (key === 'shootingDays') {
        autoGearEditorDraft.shootingDays = null;
      } else if (key === 'cameraWeight') {
        autoGearEditorDraft.cameraWeight = null;
      } else if (Array.isArray(autoGearEditorDraft[key])) {
        autoGearEditorDraft[key] = [];
      }
      const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
      if (property) {
        autoGearEditorDraft[property] = 'all';
        if (autoGearEditorDraft.conditionLogic && typeof autoGearEditorDraft.conditionLogic === 'object') {
          delete autoGearEditorDraft.conditionLogic[key];
        }
      }
    }
    if (config.select) {
      Array.from(config.select.options || []).forEach(option => {
        option.selected = false;
      });
      config.select.value = '';
    }
    if (config.logicSelect) {
      config.logicSelect.value = 'all';
      config.logicSelect.disabled = true;
    }
    if (key === 'cameraWeight') {
      if (autoGearCameraWeightOperator) {
        autoGearCameraWeightOperator.value = 'greater';
      }
      if (autoGearCameraWeightValueInput) {
        autoGearCameraWeightValueInput.value = '';
      }
    }
    if (key === 'shootingDays') {
      if (autoGearShootingDaysMode) {
        autoGearShootingDaysMode.value = 'minimum';
      }
      if (autoGearShootingDaysInput) {
        autoGearShootingDaysInput.value = '';
      }
    }
    const refresher = autoGearConditionRefreshers[key];
    if (typeof refresher === 'function') {
      if (key === 'shootingDays') {
        const source = preserveDraft ? autoGearEditorDraft?.shootingDays : null;
        refresher(source || null);
      } else {
        refresher(preserveDraft ? autoGearEditorDraft?.[key] : []);
      }
    }
  });
  autoGearActiveConditions.clear();
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
}

function initializeAutoGearConditionsFromDraft() {
  clearAllAutoGearConditions({ preserveDraft: true });
  AUTO_GEAR_CONDITION_KEYS.forEach(key => {
    let hasValue = false;
    let values = [];
    if (key === 'always') {
      values = autoGearEditorDraft?.always && autoGearEditorDraft.always.length ? ['always'] : [];
      hasValue = values.length > 0;
    } else if (key === 'shootingDays') {
      const condition = autoGearEditorDraft?.shootingDays
        ? normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays)
        : null;
      if (condition) {
        values = condition;
        hasValue = true;
      }
    } else if (key === 'cameraWeight') {
      const condition = autoGearEditorDraft?.cameraWeight || null;
      if (condition && typeof condition === 'object') {
        values = condition;
        hasValue = true;
      }
    } else if (Array.isArray(autoGearEditorDraft?.[key])) {
      values = autoGearEditorDraft[key].filter(value => {
        if (typeof value === 'number') {
          return Number.isFinite(value) && value > 0;
        }
        if (typeof value === 'string') {
          return value.trim();
        }
        return false;
      });
      hasValue = values.length > 0;
    }
    if (hasValue) {
      addAutoGearCondition(key, { focus: false, initialValues: values });
    } else {
      const refresher = autoGearConditionRefreshers[key];
      if (typeof refresher === 'function') {
        if (key === 'shootingDays') {
          refresher(null);
        } else {
          refresher([]);
        }
      }
      const config = getAutoGearConditionConfig(key);
      if (config) {
        if (config.section) {
          config.section.hidden = true;
          config.section.setAttribute('aria-hidden', 'true');
        }
        if (config.select) {
          config.select.value = '';
        }
        if (key === 'shootingDays') {
          if (autoGearShootingDaysMode) {
            autoGearShootingDaysMode.value = 'minimum';
          }
          if (autoGearShootingDaysInput) {
            autoGearShootingDaysInput.value = '';
          }
        }
      }
    }
  });
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (autoGearScenarioModeSelectElement && autoGearEditorDraft) {
    autoGearScenarioModeSelectElement.value = normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic);
  }
  if (autoGearScenarioFactorInput) {
    const storedMultiplier = autoGearEditorDraft
      ? normalizeAutoGearScenarioMultiplier(autoGearEditorDraft.scenarioMultiplier)
      : 1;
    autoGearScenarioFactorInput.value = String(storedMultiplier);
  }
  applyAutoGearScenarioSettings(getAutoGearScenarioSelectedValues());
}

refreshAutoGearConditionPicker();
updateAutoGearConditionAddButtonState();
configureAutoGearConditionButtons();
if (autoGearShootingDaysMode) {
  const handleShootingDaysModeChange = () => {
    updateAutoGearShootingDaysDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], { defer: true });
  };
  autoGearShootingDaysMode.addEventListener('input', handleShootingDaysModeChange);
  autoGearShootingDaysMode.addEventListener('change', handleShootingDaysModeChange);
}
if (autoGearShootingDaysInput) {
  const handleShootingDaysValueInput = () => {
    updateAutoGearShootingDaysDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], { defer: true });
  };
  autoGearShootingDaysInput.addEventListener('input', handleShootingDaysValueInput);
  autoGearShootingDaysInput.addEventListener('change', handleShootingDaysValueInput);
  autoGearShootingDaysInput.addEventListener('blur', handleShootingDaysValueInput);
}
Object.entries(autoGearConditionLogicSelects).forEach(([key, select]) => {
  if (!select) return;
  const property = AUTO_GEAR_CONDITION_LOGIC_FIELDS[key];
  const handleLogicChange = () => {
    const normalized = normalizeAutoGearConditionLogic(select.value);
    select.value = normalized;
    if (autoGearEditorDraft && property) {
      autoGearEditorDraft[property] = normalized;
      if (!autoGearEditorDraft.conditionLogic || typeof autoGearEditorDraft.conditionLogic !== 'object') {
        autoGearEditorDraft.conditionLogic = {};
      }
      if (normalized === 'all') {
        delete autoGearEditorDraft.conditionLogic[key];
      } else {
        autoGearEditorDraft.conditionLogic[key] = normalized;
      }
    }
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], { defer: true });
  };
  select.addEventListener('input', handleLogicChange);
  select.addEventListener('change', handleLogicChange);
});
if (autoGearCameraWeightOperator) {
  const handleCameraWeightOperatorChange = () => {
    updateAutoGearCameraWeightDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], { defer: true });
  };
  autoGearCameraWeightOperator.addEventListener('input', handleCameraWeightOperatorChange);
  autoGearCameraWeightOperator.addEventListener('change', handleCameraWeightOperatorChange);
}
if (autoGearCameraWeightValueInput) {
  const handleCameraWeightValueInput = () => {
    updateAutoGearCameraWeightDraft();
    callCoreFunctionIfAvailable('renderAutoGearDraftImpact', [], { defer: true });
  };
  autoGearCameraWeightValueInput.addEventListener('input', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('change', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('blur', handleCameraWeightValueInput);
}
var autoGearAddItemsHeading = document.getElementById('autoGearAddItemsHeading');
var autoGearAddItemLabel = document.getElementById('autoGearAddItemLabel');
var autoGearAddCategoryLabel = document.getElementById('autoGearAddCategoryLabel');
var autoGearAddQuantityLabel = document.getElementById('autoGearAddQuantityLabel');
var autoGearAddScreenSizeLabel = document.getElementById('autoGearAddScreenSizeLabel');
var autoGearAddSelectorTypeLabel = document.getElementById('autoGearAddSelectorTypeLabel');
var autoGearAddSelectorDefaultLabel = document.getElementById('autoGearAddSelectorDefaultLabel');
var autoGearAddNotesLabel = document.getElementById('autoGearAddNotesLabel');
var autoGearAddNameInput = document.getElementById('autoGearAddName');
var autoGearAddCategorySelect = document.getElementById('autoGearAddCategory');
var autoGearAddQuantityInput = document.getElementById('autoGearAddQuantity');
var autoGearAddScreenSizeInput = document.getElementById('autoGearAddScreenSize');
var autoGearAddSelectorTypeSelect = document.getElementById('autoGearAddSelectorType');
var autoGearAddSelectorDefaultInput = document.getElementById('autoGearAddSelectorDefault');
var autoGearAddNotesInput = document.getElementById('autoGearAddNotes');
var autoGearAddItemButton = document.getElementById('autoGearAddItemButton');
var autoGearAddList = document.getElementById('autoGearAddList');
var autoGearRemoveItemsHeading = document.getElementById('autoGearRemoveItemsHeading');
var autoGearRemoveItemLabel = document.getElementById('autoGearRemoveItemLabel');
var autoGearRemoveCategoryLabel = document.getElementById('autoGearRemoveCategoryLabel');
var autoGearRemoveQuantityLabel = document.getElementById('autoGearRemoveQuantityLabel');
var autoGearRemoveScreenSizeLabel = document.getElementById('autoGearRemoveScreenSizeLabel');
var autoGearRemoveSelectorTypeLabel = document.getElementById('autoGearRemoveSelectorTypeLabel');
var autoGearRemoveSelectorDefaultLabel = document.getElementById('autoGearRemoveSelectorDefaultLabel');
var autoGearRemoveNotesLabel = document.getElementById('autoGearRemoveNotesLabel');
var autoGearRemoveNameInput = document.getElementById('autoGearRemoveName');
var autoGearRemoveCategorySelect = document.getElementById('autoGearRemoveCategory');
var autoGearRemoveQuantityInput = document.getElementById('autoGearRemoveQuantity');
var autoGearRemoveScreenSizeInput = document.getElementById('autoGearRemoveScreenSize');
var autoGearRemoveSelectorTypeSelect = document.getElementById('autoGearRemoveSelectorType');
var autoGearRemoveSelectorDefaultInput = document.getElementById('autoGearRemoveSelectorDefault');
var autoGearRemoveNotesInput = document.getElementById('autoGearRemoveNotes');
var autoGearRemoveItemButton = document.getElementById('autoGearRemoveItemButton');
var autoGearRemoveList = document.getElementById('autoGearRemoveList');
var autoGearDraftImpactContainer = document.getElementById('autoGearDraftImpact');
var autoGearDraftImpactHeading = document.getElementById('autoGearDraftImpactHeading');
var autoGearDraftImpactDescription = document.getElementById('autoGearDraftImpactDescription');
var autoGearDraftImpactList = document.getElementById('autoGearDraftImpactList');
var autoGearDraftWarningContainer = document.getElementById('autoGearDraftWarningContainer');
var autoGearDraftWarningHeading = document.getElementById('autoGearDraftWarningHeading');
var autoGearDraftWarningList = document.getElementById('autoGearDraftWarningList');
var autoGearSaveRuleButton = document.getElementById('autoGearSaveRule');
var autoGearCancelEditButton = document.getElementById('autoGearCancelEdit');
var autoGearItemCatalog = document.getElementById('autoGearItemCatalog');

function enableAutoGearMultiSelectToggle(select) {
  if (!select || !select.multiple) return;

  const handlePointerToggle = event => {
    if (!select.multiple || event.defaultPrevented) return;

    const isPointerEvent = typeof PointerEvent !== 'undefined' && event instanceof PointerEvent;
    if (isPointerEvent && event.pointerType && event.pointerType !== 'mouse') {
      return;
    }

    if (typeof event.button === 'number' && event.button !== 0) {
      return;
    }

    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    const option = event.target instanceof HTMLOptionElement ? event.target : null;
    if (!option || option.disabled) {
      return;
    }

    event.preventDefault();

    option.selected = !option.selected;

    const dispatchEvent = type => {
      try {
        const evt = new Event(type, { bubbles: true });
        select.dispatchEvent(evt);
      } catch {
        const evt = document.createEvent('Event');
        evt.initEvent(type, true, true);
        select.dispatchEvent(evt);
      }
    };

    dispatchEvent('input');
    dispatchEvent('change');

    if (typeof select.focus === 'function') {
      try {
        select.focus({ preventScroll: true });
      } catch {
        select.focus();
      }
    }
  };

  if (typeof window !== 'undefined' && typeof window.PointerEvent !== 'undefined') {
    select.addEventListener('pointerdown', handlePointerToggle);
  } else {
    select.addEventListener('mousedown', handlePointerToggle);
  }
}

[
  autoGearScenariosSelect,
  autoGearMatteboxSelect,
  autoGearCameraHandleSelect,
  autoGearViewfinderExtensionSelect,
  autoGearVideoDistributionSelect,
  autoGearCameraSelect,
  autoGearMonitorSelect,
  autoGearCrewPresentSelect,
  autoGearCrewAbsentSelect,
  autoGearWirelessSelect,
  autoGearMotorsSelect,
  autoGearControllersSelect,
  autoGearDistanceSelect,
].forEach(enableAutoGearMultiSelectToggle);

var autoGearAddScreenSizeField = autoGearAddScreenSizeInput?.closest('.auto-gear-field')
  || autoGearAddScreenSizeLabel?.closest('.auto-gear-field')
  || null;
var autoGearAddSelectorTypeField = autoGearAddSelectorTypeSelect?.closest('.auto-gear-field')
  || autoGearAddSelectorTypeLabel?.closest('.auto-gear-field')
  || null;
var autoGearAddSelectorDefaultField = autoGearAddSelectorDefaultInput?.closest('.auto-gear-field')
  || autoGearAddSelectorDefaultLabel?.closest('.auto-gear-field')
  || null;
var autoGearRemoveScreenSizeField = autoGearRemoveScreenSizeInput?.closest('.auto-gear-field')
  || autoGearRemoveScreenSizeLabel?.closest('.auto-gear-field')
  || null;
var autoGearRemoveSelectorTypeField = autoGearRemoveSelectorTypeSelect?.closest('.auto-gear-field')
  || autoGearRemoveSelectorTypeLabel?.closest('.auto-gear-field')
  || null;
var autoGearRemoveSelectorDefaultField = autoGearRemoveSelectorDefaultInput?.closest('.auto-gear-field')
  || autoGearRemoveSelectorDefaultLabel?.closest('.auto-gear-field')
  || null;

autoGearAddMonitorFieldGroup = {
  select: autoGearAddCategorySelect,
  screenSizeField: autoGearAddScreenSizeField,
  screenSizeInput: autoGearAddScreenSizeInput,
  selectorTypeField: autoGearAddSelectorTypeField,
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultField: autoGearAddSelectorDefaultField,
  selectorDefaultInput: autoGearAddSelectorDefaultInput,
};

autoGearRemoveMonitorFieldGroup = {
  select: autoGearRemoveCategorySelect,
  screenSizeField: autoGearRemoveScreenSizeField,
  screenSizeInput: autoGearRemoveScreenSizeInput,
  selectorTypeField: autoGearRemoveSelectorTypeField,
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultField: autoGearRemoveSelectorDefaultField,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput,
};

autoGearMonitorDefaultGroups = [
  {
    selectorTypeSelect: autoGearAddSelectorTypeSelect,
    selectorDefaultInput: autoGearAddSelectorDefaultInput,
  },
  {
    selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
    selectorDefaultInput: autoGearRemoveSelectorDefaultInput,
  },
].filter(group => group.selectorDefaultInput);

function syncAutoGearMonitorFieldVisibility() {
  if (autoGearAddMonitorFieldGroup) {
    updateAutoGearMonitorFieldGroup(autoGearAddMonitorFieldGroup);
  }
  if (autoGearRemoveMonitorFieldGroup) {
    updateAutoGearMonitorFieldGroup(autoGearRemoveMonitorFieldGroup);
  }
}
var autoGearExportButton = document.getElementById('autoGearExport');
var autoGearImportButton = document.getElementById('autoGearImport');
var autoGearImportInput = document.getElementById('autoGearImportInput');
var autoGearBackupsSection = document.getElementById('autoGearBackupsSection');
var autoGearBackupsHeading = document.getElementById('autoGearBackupsHeading');
var autoGearBackupsDescription = document.getElementById('autoGearBackupsDescription');
var autoGearBackupSelectLabel = document.getElementById('autoGearBackupSelectLabel');
var autoGearBackupSelect = document.getElementById('autoGearBackupSelect');
var autoGearBackupRestoreButton = document.getElementById('autoGearBackupRestore');
var autoGearBackupControls = document.getElementById('autoGearBackupControls');
var autoGearBackupEmptyMessage = document.getElementById('autoGearBackupEmpty');
var autoGearBackupRetentionLabel = document.getElementById('autoGearBackupRetentionLabel');
var autoGearBackupRetentionInput = document.getElementById('autoGearBackupRetention');
var autoGearBackupRetentionSummary = document.getElementById('autoGearBackupRetentionSummary');
var autoGearBackupRetentionWarning = document.getElementById('autoGearBackupRetentionWarning');
var autoGearShowBackupsCheckbox = document.getElementById('autoGearShowBackups');
var autoGearShowBackupsLabel = document.getElementById('autoGearShowBackupsLabel');
var autoGearBackupsHiddenNotice = document.getElementById('autoGearBackupsHidden');
const dataHeading = document.getElementById("dataHeading");
const storageSummaryIntro = document.getElementById("storageSummaryIntro");
const storageSummaryList = document.getElementById("storageSummaryList");
const storageSummaryEmpty = document.getElementById("storageSummaryEmpty");
const storageSummaryFootnote = document.getElementById("storageSummaryFootnote");
var storageActionsHeading = document.getElementById('storageActionsHeading');
var storageActionsIntro = document.getElementById('storageActionsIntro');
var storageBackupNowButton = document.getElementById('storageBackupNow');
var storageOpenBackupTabButton = document.getElementById('storageOpenBackupTab');
var storageStatusHeading = document.getElementById('storageStatusHeading');
var storageStatusLastProjectLabel = document.getElementById('storageStatusLastProjectLabel');
var storageStatusLastProjectValue = document.getElementById('storageStatusLastProjectValue');
var storageStatusLastAutoBackupLabel = document.getElementById('storageStatusLastAutoBackupLabel');
var storageStatusLastAutoBackupValue = document.getElementById('storageStatusLastAutoBackupValue');
var storageStatusLastFullBackupLabel = document.getElementById('storageStatusLastFullBackupLabel');
var storageStatusLastFullBackupValue = document.getElementById('storageStatusLastFullBackupValue');

if (autoGearBackupRetentionInput) {
  const queueAutoGearRetentionHandler = handlerName => {
    callCoreFunctionIfAvailable(handlerName, [], { defer: true });
  };

  autoGearBackupRetentionInput.addEventListener('input', () => {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionInput');
  });
  autoGearBackupRetentionInput.addEventListener('blur', () => {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionBlur');
  });
  autoGearBackupRetentionInput.addEventListener('change', () => {
    queueAutoGearRetentionHandler('handleAutoGearBackupRetentionChange');
  });
}

function computeAutoGearMultiSelectSize(optionCount, {
  fallback,
  minRows = AUTO_GEAR_MULTI_SELECT_MIN_ROWS,
  maxRows = AUTO_GEAR_MULTI_SELECT_MAX_ROWS,
} = {}) {
  const effectiveFallback = Number.isFinite(fallback) && fallback >= minRows
    ? fallback
    : minRows;
  if (!Number.isFinite(optionCount) || optionCount <= 0) {
    return effectiveFallback;
  }
  const boundedMax = Number.isFinite(maxRows) && maxRows >= minRows ? maxRows : minRows;
  return Math.max(minRows, Math.min(optionCount, boundedMax));
}

function setAutoGearSearchQuery(value) {
  const nextValue = typeof value === 'string' ? value : '';
  if (autoGearSearchQuery === nextValue) return;
  autoGearSearchQuery = nextValue;
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
}

function setAutoGearScenarioFilter(value) {
  const nextValue = typeof value === 'string' && value !== 'all' ? value : 'all';
  if (autoGearScenarioFilter === nextValue) return;
  autoGearScenarioFilter = nextValue;
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
}

function clearAutoGearFilters() {
  autoGearSearchQuery = '';
  autoGearScenarioFilter = 'all';
  autoGearSummaryFocus = 'all';
  if (autoGearSearchInput && autoGearSearchInput.value !== '') {
    autoGearSearchInput.value = '';
  }
  if (autoGearFilterScenarioSelect && autoGearFilterScenarioSelect.value !== 'all') {
    autoGearFilterScenarioSelect.value = 'all';
  }
  callCoreFunctionIfAvailable('renderAutoGearRulesList', [], { defer: true });
  if (autoGearSearchInput && typeof autoGearSearchInput.focus === 'function') {
    try {
      autoGearSearchInput.focus({ preventScroll: true });
    } catch {
      autoGearSearchInput.focus();
    }
  }
}

function autoGearRuleMatchesScenario(rule, scenarioValue) {
  if (!scenarioValue || scenarioValue === 'all') return true;
  if (!rule || !Array.isArray(rule.scenarios)) return false;
  return rule.scenarios.some(value => value === scenarioValue);
}

function autoGearRuleMatchesSearch(rule, query) {
  const normalizedQuery = typeof query === 'string' ? query.trim().toLowerCase() : '';
  if (!normalizedQuery) return true;
  const haystack = [];
  const pushValues = values => {
    if (!Array.isArray(values)) return;
    values.forEach(value => {
      if (typeof value === 'string' && value) {
        haystack.push(value);
      }
    });
  };
  if (rule && typeof rule.label === 'string') {
    haystack.push(rule.label);
  }
  if (rule && rule.always) {
    haystack.push('always');
    const alwaysText = texts[currentLang]?.autoGearAlwaysMeta
      || texts.en?.autoGearAlwaysMeta
      || 'Always active';
    if (alwaysText) {
      haystack.push(alwaysText);
    }
  }
  pushValues(rule?.scenarios);
  pushValues(rule?.mattebox);
  pushValues(rule?.cameraHandle);
  pushValues(rule?.viewfinderExtension);
  pushValues(rule?.deliveryResolution);
  pushValues(rule?.videoDistribution);
  pushValues(rule?.camera);
  pushValues(rule?.monitor);
  pushValues(rule?.crewPresent);
  pushValues(rule?.crewAbsent);
  pushValues(rule?.wireless);
  pushValues(rule?.motors);
  pushValues(rule?.controllers);
  pushValues(rule?.distance);
  const shootingCondition = normalizeAutoGearShootingDaysCondition(rule?.shootingDays);
  if (shootingCondition) {
    const shootingLabel = texts[currentLang]?.autoGearShootingDaysLabel
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
    if (shootingLabel) {
      haystack.push(shootingLabel);
    }
    haystack.push(String(shootingCondition.value));
    if (shootingCondition.mode === 'minimum') {
      haystack.push(minimumLabel);
    } else if (shootingCondition.mode === 'maximum') {
      haystack.push(maximumLabel);
    } else if (shootingCondition.mode === 'every') {
      haystack.push(everyLabel);
    }
  }
  const collectItems = items => {
    if (!Array.isArray(items)) return;
    items.forEach(item => {
      if (!item || typeof item !== 'object') return;
      if (typeof item.name === 'string' && item.name) {
        haystack.push(item.name);
      }
      if (typeof item.notes === 'string' && item.notes) {
        haystack.push(item.notes);
      }
      if (typeof item.category === 'string' && item.category) {
        haystack.push(item.category);
      }
      if (typeof item.screenSize === 'string' && item.screenSize) {
        haystack.push(item.screenSize);
      }
      if (item.selector && typeof item.selector === 'object') {
        if (typeof item.selector.type === 'string' && item.selector.type) {
          haystack.push(item.selector.type);
        }
        if (typeof item.selector.default === 'string' && item.selector.default) {
          haystack.push(item.selector.default);
        }
      }
      haystack.push(safeFormatAutoGearItemSummary(item));
    });
  };
  collectItems(rule?.add);
  collectItems(rule?.remove);
  return haystack.some(value =>
    typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)
  );
}

function collectAutoGearScenarioFilterOptions(rules) {
  const options = new Map();
  const source = document.getElementById('requiredScenarios');
  if (source) {
    Array.from(source.options || []).forEach(option => {
      const value = typeof option.value === 'string' ? option.value.trim() : '';
      if (!value) return;
      const label = option.textContent || value;
      if (!options.has(value)) {
        options.set(value, label);
      }
    });
  }
  if (Array.isArray(rules)) {
    rules.forEach(rule => {
      if (!rule || !Array.isArray(rule.scenarios)) return;
      rule.scenarios.forEach(value => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        if (!options.has(trimmed)) {
          options.set(trimmed, trimmed);
        }
      });
    });
  }
  return Array.from(options.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => localeSort(a.label, b.label));
}

function refreshAutoGearScenarioFilterOptions(rules) {
  if (!autoGearFilterScenarioSelect) return autoGearScenarioFilter;
  const options = collectAutoGearScenarioFilterOptions(rules);
  const anyLabel = texts[currentLang]?.autoGearFilterScenarioAny
    || texts.en?.autoGearFilterScenarioAny
    || 'All scenarios';
  autoGearFilterScenarioSelect.innerHTML = '';
  const anyOption = document.createElement('option');
  anyOption.value = 'all';
  anyOption.textContent = anyLabel;
  autoGearFilterScenarioSelect.appendChild(anyOption);
  options.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    if (value === autoGearScenarioFilter) {
      option.selected = true;
    }
    autoGearFilterScenarioSelect.appendChild(option);
  });
  const optionsAvailable = options.length > 0;
  autoGearFilterScenarioSelect.disabled = !optionsAvailable;
  if (!optionsAvailable && autoGearScenarioFilter !== 'all') {
    autoGearScenarioFilter = 'all';
  } else if (
    autoGearScenarioFilter !== 'all' &&
    !options.some(option => option.value === autoGearScenarioFilter)
  ) {
    autoGearScenarioFilter = 'all';
  }
  autoGearFilterScenarioSelect.value = autoGearScenarioFilter;
  return autoGearScenarioFilter;
}

function cloneAutoGearDraftItem(item) {
  const normalized = normalizeAutoGearItem(item);
  if (normalized) return normalized;
  return {
    id: generateAutoGearId('item'),
    name: '',
    category: '',
    quantity: 1,
    screenSize: '',
    selectorType: 'none',
    selectorDefault: '',
    selectorEnabled: false,
    notes: '',
  };
}

function createAutoGearDraft(rule) {
  if (rule) {
    const scenarioLogic = normalizeAutoGearScenarioLogic(rule.scenarioLogic);
    const matteboxLogic = readAutoGearConditionLogic(rule, 'mattebox');
    const cameraHandleLogic = readAutoGearConditionLogic(rule, 'cameraHandle');
    const viewfinderExtensionLogic = readAutoGearConditionLogic(rule, 'viewfinderExtension');
    const deliveryResolutionLogic = readAutoGearConditionLogic(rule, 'deliveryResolution');
    const videoDistributionLogic = readAutoGearConditionLogic(rule, 'videoDistribution');
    const cameraLogic = readAutoGearConditionLogic(rule, 'camera');
    const monitorLogic = readAutoGearConditionLogic(rule, 'monitor');
    const crewPresentLogic = readAutoGearConditionLogic(rule, 'crewPresent');
    const crewAbsentLogic = readAutoGearConditionLogic(rule, 'crewAbsent');
    const wirelessLogic = readAutoGearConditionLogic(rule, 'wireless');
    const motorsLogic = readAutoGearConditionLogic(rule, 'motors');
    const controllersLogic = readAutoGearConditionLogic(rule, 'controllers');
    const distanceLogic = readAutoGearConditionLogic(rule, 'distance');
    const draftConditionLogic = {};
    if (scenarioLogic !== 'all') draftConditionLogic.scenarios = scenarioLogic;
    if (matteboxLogic !== 'all') draftConditionLogic.mattebox = matteboxLogic;
    if (cameraHandleLogic !== 'all') draftConditionLogic.cameraHandle = cameraHandleLogic;
    if (viewfinderExtensionLogic !== 'all') draftConditionLogic.viewfinderExtension = viewfinderExtensionLogic;
    if (deliveryResolutionLogic !== 'all') draftConditionLogic.deliveryResolution = deliveryResolutionLogic;
    if (videoDistributionLogic !== 'all') draftConditionLogic.videoDistribution = videoDistributionLogic;
    if (cameraLogic !== 'all') draftConditionLogic.camera = cameraLogic;
    if (monitorLogic !== 'all') draftConditionLogic.monitor = monitorLogic;
    if (crewPresentLogic !== 'all') draftConditionLogic.crewPresent = crewPresentLogic;
    if (crewAbsentLogic !== 'all') draftConditionLogic.crewAbsent = crewAbsentLogic;
    if (wirelessLogic !== 'all') draftConditionLogic.wireless = wirelessLogic;
    if (motorsLogic !== 'all') draftConditionLogic.motors = motorsLogic;
    if (controllersLogic !== 'all') draftConditionLogic.controllers = controllersLogic;
    if (distanceLogic !== 'all') draftConditionLogic.distance = distanceLogic;
    return {
      id: rule.id,
      label: rule.label || '',
      always: rule.always ? ['always'] : [],
      scenarioLogic,
      scenarioPrimary: normalizeAutoGearScenarioPrimary(rule.scenarioPrimary),
      scenarioMultiplier: normalizeAutoGearScenarioMultiplier(rule.scenarioMultiplier),
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
      cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
      viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
      deliveryResolution: Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.slice() : [],
      videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
      camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
      cameraWeight: rule.cameraWeight
        ? normalizeAutoGearCameraWeightCondition(rule.cameraWeight) || null
        : null,
      monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
      crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
      crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
      wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
      motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
      controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
      distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
      shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearDraftItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearDraftItem) : [],
      matteboxLogic,
      cameraHandleLogic,
      viewfinderExtensionLogic,
      deliveryResolutionLogic,
      videoDistributionLogic,
      cameraLogic,
      monitorLogic,
      crewPresentLogic,
      crewAbsentLogic,
      wirelessLogic,
      motorsLogic,
      controllersLogic,
      distanceLogic,
      conditionLogic: draftConditionLogic,
    };
  }
  return {
    id: generateAutoGearId('rule'),
    label: '',
    always: [],
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
    cameraWeight: null,
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    shootingDays: null,
    add: [],
    remove: [],
    matteboxLogic: 'all',
    cameraHandleLogic: 'all',
    viewfinderExtensionLogic: 'all',
    deliveryResolutionLogic: 'all',
    videoDistributionLogic: 'all',
    cameraLogic: 'all',
    monitorLogic: 'all',
    crewPresentLogic: 'all',
    crewAbsentLogic: 'all',
    wirelessLogic: 'all',
    motorsLogic: 'all',
    controllersLogic: 'all',
    distanceLogic: 'all',
    conditionLogic: {},
  };
}

function refreshAutoGearShootingDaysValue(selected) {
  if (!autoGearShootingDaysInput) return;
  const condition = (() => {
    if (selected && typeof selected === 'object' && !Array.isArray(selected)) {
      return normalizeAutoGearShootingDaysCondition(selected);
    }
    if (Array.isArray(selected) && selected.length) {
      return normalizeAutoGearShootingDaysCondition({ mode: 'minimum', value: selected[0] });
    }
    if (autoGearEditorDraft?.shootingDays) {
      return normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays);
    }
    return null;
  })();
  const mode = condition ? condition.mode : 'minimum';
  if (autoGearShootingDaysMode) {
    autoGearShootingDaysMode.value = AUTO_GEAR_SHOOTING_DAY_MODES.has(mode) ? mode : 'minimum';
  }
  const value = condition ? condition.value : '';
  autoGearShootingDaysInput.value = value ? String(value) : '';
}

function refreshAutoGearScenarioOptions(selected) {
  if (!autoGearScenariosSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.scenarios)
        ? autoGearEditorDraft.scenarios
        : [];

  const selectedValues = Array.from(
    new Set(
      candidateValues
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean)
    )
  );

  autoGearScenariosSelect.innerHTML = '';
  autoGearScenariosSelect.multiple = true;

  const source = document.getElementById('requiredScenarios');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearScenariosSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearScenarioPlaceholder
      || texts.en?.autoGearScenarioPlaceholder
      || 'Select scenarios';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearScenariosSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearScenariosSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearScenariosSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearScenariosSelect.options || []).filter(option => !option.disabled);
  autoGearScenariosSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
  applyAutoGearScenarioSettings(selectedValues);
}

function getAutoGearScenarioSelectedValues() {
  if (!autoGearScenariosSelect) return [];
  return Array.from(autoGearScenariosSelect.selectedOptions || [])
    .map(option => (option ? option.value : ''))
    .filter(value => typeof value === 'string' && value.trim());
}

function applyAutoGearScenarioSettings(selectedValues) {
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const uniqueValues = Array.from(new Set(values));
  const desiredMode = autoGearEditorDraft
    ? normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic)
    : normalizeAutoGearScenarioLogic(autoGearScenarioModeSelectElement?.value);
  if (autoGearScenarioModeSelectElement) {
    const modeLabels = {
      all: texts[currentLang]?.autoGearScenarioModeAll
        || texts.en?.autoGearScenarioModeAll
        || 'Require every selected scenario',
      any: texts[currentLang]?.autoGearScenarioModeAny
        || texts.en?.autoGearScenarioModeAny
        || 'Match any selected scenario',
      multiplier: texts[currentLang]?.autoGearScenarioModeMultiplier
        || texts.en?.autoGearScenarioModeMultiplier
        || 'Multiply when combined',
    };
    Array.from(autoGearScenarioModeSelectElement.options || []).forEach(option => {
      if (!option) return;
      if (option.value === 'multiplier') {
        option.disabled = uniqueValues.length < 2;
      } else {
        option.disabled = false;
      }
      const label = modeLabels[option.value] || modeLabels.all;
      if (label) {
        option.textContent = label;
      }
    });
    let nextMode = desiredMode;
    if (nextMode === 'multiplier' && uniqueValues.length < 2) {
      nextMode = 'all';
    }
    autoGearScenarioModeSelectElement.value = nextMode;
    if (autoGearEditorDraft && autoGearEditorDraft.scenarioLogic !== nextMode) {
      autoGearEditorDraft.scenarioLogic = nextMode;
    }
    updateAutoGearScenarioMultiplierVisibility(nextMode, uniqueValues);
  } else {
    updateAutoGearScenarioMultiplierVisibility(desiredMode, uniqueValues);
  }
}

function updateAutoGearScenarioMultiplierVisibility(mode, selectedValues) {
  if (!autoGearScenarioMultiplierContainer) return;
  const normalizedMode = normalizeAutoGearScenarioLogic(mode);
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const shouldShow = normalizedMode === 'multiplier' && values.length >= 1;
  autoGearScenarioMultiplierContainer.hidden = !shouldShow;
  autoGearScenarioMultiplierContainer.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  if (autoGearScenarioFactorInput) {
    autoGearScenarioFactorInput.disabled = !shouldShow;
  }
  refreshAutoGearScenarioBaseSelect(values, { forceDisable: !shouldShow });
}

function refreshAutoGearScenarioBaseSelect(selectedValues, options = {}) {
  if (!autoGearScenarioBaseSelect) return;
  const { forceDisable = false } = options;
  const values = Array.isArray(selectedValues)
    ? selectedValues.filter(value => typeof value === 'string' && value.trim())
    : [];
  const uniqueValues = Array.from(new Set(values));
  const previousValue = autoGearScenarioBaseSelect.value || '';
  autoGearScenarioBaseSelect.innerHTML = '';
  if (forceDisable || !uniqueValues.length) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearScenarioBasePlaceholder
      || texts.en?.autoGearScenarioBasePlaceholder
      || 'Select a base scenario';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearScenarioBaseSelect.appendChild(placeholder);
    autoGearScenarioBaseSelect.disabled = true;
    return;
  }
  uniqueValues.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    autoGearScenarioBaseSelect.appendChild(option);
  });
  const preferred = autoGearEditorDraft
    ? normalizeAutoGearScenarioPrimary(autoGearEditorDraft.scenarioPrimary)
    : '';
  const normalizedPreferred = normalizeAutoGearTriggerValue(preferred);
  let nextValue = '';
  if (normalizedPreferred) {
    const matched = uniqueValues.find(value => normalizeAutoGearTriggerValue(value) === normalizedPreferred);
    if (matched) {
      nextValue = matched;
    }
  }
  if (!nextValue && previousValue) {
    const normalizedPrevious = normalizeAutoGearTriggerValue(previousValue);
    const matchedPrevious = uniqueValues.find(value => normalizeAutoGearTriggerValue(value) === normalizedPrevious);
    if (matchedPrevious) {
      nextValue = matchedPrevious;
    }
  }
  if (!nextValue) {
    nextValue = uniqueValues[0];
  }
  autoGearScenarioBaseSelect.value = nextValue;
  autoGearScenarioBaseSelect.disabled = false;
}

function refreshAutoGearMatteboxOptions(selected) {
  if (!autoGearMatteboxSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.mattebox)
        ? autoGearEditorDraft.mattebox
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearMatteboxSelect.innerHTML = '';
  autoGearMatteboxSelect.multiple = true;

  const source = document.getElementById('mattebox');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearMatteboxSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearMatteboxPlaceholder
      || texts.en?.autoGearMatteboxPlaceholder
      || 'Select mattebox options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearMatteboxSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearMatteboxSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearMatteboxSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearMatteboxSelect.options || []).filter(option => !option.disabled);
  autoGearMatteboxSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearCameraHandleOptions(selected) {
  if (!autoGearCameraHandleSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.cameraHandle)
        ? autoGearEditorDraft.cameraHandle
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearCameraHandleSelect.innerHTML = '';
  autoGearCameraHandleSelect.multiple = true;

  const source = document.getElementById('cameraHandle');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      if (!opt.value) return;
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(opt.value)) {
        option.selected = true;
      }
      autoGearCameraHandleSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearCameraHandlePlaceholder
      || texts.en?.autoGearCameraHandlePlaceholder
      || 'Select camera handles';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearCameraHandleSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearCameraHandleSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = value;
        fallbackOption.selected = true;
        autoGearCameraHandleSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearCameraHandleSelect.options || []).filter(option => !option.disabled);
  autoGearCameraHandleSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function resolveViewfinderOptionValue(option) {
  if (!option) return '';
  const raw = typeof option.value === 'string' ? option.value : '';
  return raw ? raw : '__none__';
}

function getViewfinderFallbackLabel(value) {
  if (value === '__none__') {
    return texts[currentLang]?.viewfinderExtensionNone
      || texts.en?.viewfinderExtensionNone
      || 'No';
  }
  return value;
}

function getVideoDistributionFallbackLabel(value) {
  if (value === '__none__') {
    return texts[currentLang]?.autoGearVideoDistributionNone
      || texts.en?.autoGearVideoDistributionNone
      || 'No video distribution selected';
  }
  return value;
}

function normalizeVideoDistributionOptionValue(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const lower = trimmed.toLowerCase();
  if (lower === '__none__' || lower === 'none') return '__none__';
  return trimmed;
}

function refreshAutoGearViewfinderExtensionOptions(selected) {
  if (!autoGearViewfinderExtensionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.viewfinderExtension)
        ? autoGearEditorDraft.viewfinderExtension
        : [];

  const selectedValues = Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));

  autoGearViewfinderExtensionSelect.innerHTML = '';
  autoGearViewfinderExtensionSelect.multiple = true;

  const source = document.getElementById('viewfinderExtension');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const option = document.createElement('option');
      const value = resolveViewfinderOptionValue(opt);
      option.value = value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(value)) {
        option.selected = true;
      }
      autoGearViewfinderExtensionSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearViewfinderExtensionPlaceholder
      || texts.en?.autoGearViewfinderExtensionPlaceholder
      || 'Select viewfinder extension options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearViewfinderExtensionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearViewfinderExtensionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = getViewfinderFallbackLabel(value);
        fallbackOption.selected = true;
        autoGearViewfinderExtensionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearViewfinderExtensionSelect.options || []).filter(option => !option.disabled);
  autoGearViewfinderExtensionSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearDeliveryResolutionOptions(selected) {
  if (!autoGearDeliveryResolutionSelect) return;

  const selectedValues = collectAutoGearSelectedValues(selected, 'deliveryResolution');

  autoGearDeliveryResolutionSelect.innerHTML = '';
  autoGearDeliveryResolutionSelect.multiple = true;

  const seen = new Set();
  const addOption = (value, label) => {
    const normalized = typeof value === 'string' ? value.trim() : '';
    if (!normalized || seen.has(normalized)) return;
    const option = document.createElement('option');
    option.value = normalized;
    option.textContent = label || normalized;
    if (selectedValues.includes(normalized)) {
      option.selected = true;
    }
    autoGearDeliveryResolutionSelect.appendChild(option);
    seen.add(normalized);
  };

  if (deliveryResolutionSelect) {
    Array.from(deliveryResolutionSelect.options || []).forEach(opt => {
      if (!opt || typeof opt.value !== 'string') return;
      const value = opt.value.trim();
      if (!value) return;
      const label = (opt.textContent || value).trim();
      addOption(value, label);
    });
  }

  selectedValues.forEach(value => {
    if (!seen.has(value)) addOption(value, value);
  });

  if (!autoGearDeliveryResolutionSelect.options.length) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearDeliveryResolutionPlaceholder
      || texts.en?.autoGearDeliveryResolutionPlaceholder
      || 'Select delivery resolutions';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearDeliveryResolutionSelect.appendChild(placeholder);
  }

  const visibleCount = Array.from(autoGearDeliveryResolutionSelect.options || []).filter(option => !option.disabled).length;
  autoGearDeliveryResolutionSelect.size = computeAutoGearMultiSelectSize(
    visibleCount,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function refreshAutoGearVideoDistributionOptions(selected) {
  if (!autoGearVideoDistributionSelect) return;

  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.videoDistribution)
        ? autoGearEditorDraft.videoDistribution
        : [];

  const normalizedSelections = Array.from(new Set(
    candidateValues
      .map(normalizeVideoDistributionOptionValue)
      .filter(Boolean)
  ));
  const hasNoneSelection = normalizedSelections.includes('__none__');
  const selectedValues = normalizedSelections.filter(value => value !== '__none__');

  autoGearVideoDistributionSelect.innerHTML = '';
  autoGearVideoDistributionSelect.multiple = true;

  const noneOption = document.createElement('option');
  noneOption.value = '__none__';
  noneOption.textContent = getVideoDistributionFallbackLabel('__none__');
  if (hasNoneSelection) {
    noneOption.selected = true;
  }
  autoGearVideoDistributionSelect.appendChild(noneOption);

  const source = document.getElementById('videoDistribution');
  let hasOptions = false;

  if (source) {
    Array.from(source.options).forEach(opt => {
      const value = normalizeVideoDistributionOptionValue(opt.value);
      if (!value) return;
      if (value === '__none__') {
        if (hasNoneSelection) {
          noneOption.selected = true;
        }
        return;
      }
      const option = document.createElement('option');
      option.value = value;
      option.textContent = opt.textContent;
      if (selectedValues.includes(value)) {
        option.selected = true;
      }
      autoGearVideoDistributionSelect.appendChild(option);
      hasOptions = true;
    });
  }

  if (!hasOptions) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = texts[currentLang]?.autoGearVideoDistributionPlaceholder
      || texts.en?.autoGearVideoDistributionPlaceholder
      || 'Select video distribution options';
    placeholder.disabled = true;
    placeholder.selected = true;
    autoGearVideoDistributionSelect.appendChild(placeholder);
  } else {
    selectedValues.forEach(value => {
      const exists = Array.from(autoGearVideoDistributionSelect.options || []).some(
        option => option && option.value === value
      );
      if (!exists) {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = value;
        fallbackOption.textContent = getVideoDistributionFallbackLabel(value);
        fallbackOption.selected = true;
        autoGearVideoDistributionSelect.appendChild(fallbackOption);
      }
    });
  }

  const selectableOptions = Array.from(autoGearVideoDistributionSelect.options || []).filter(option => !option.disabled);
  autoGearVideoDistributionSelect.size = computeAutoGearMultiSelectSize(
    selectableOptions.length,
    { minRows: AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS }
  );
}

function collectAutoGearSelectedValues(selected, key) {
  const candidateValues = Array.isArray(selected)
    ? selected
    : typeof selected === 'string' && selected
      ? [selected]
      : Array.isArray(autoGearEditorDraft?.[key])
        ? autoGearEditorDraft[key]
        : [];
  return Array.from(new Set(
    candidateValues
      .filter(value => typeof value === 'string')
      .map(value => value.trim())
      .filter(Boolean)
  ));
}

function getCrewRoleEntries() {
  const langTexts = texts[currentLang] || texts.en || {};
  const crewRoleMap = langTexts.crewRoles || texts.en?.crewRoles || {};
  const seen = new Set();
  const entries = [];
  Object.entries(crewRoleMap).forEach(([value, label]) => {
    if (typeof value !== 'string') return;
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    const key = trimmedValue.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    const displayLabel = typeof label === 'string' && label.trim() ? label.trim() : trimmedValue;
    entries.push({ value: trimmedValue, label: displayLabel });
  });
  return entries.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
}

exposeCoreRuntimeConstant('setupInstallBanner', setupInstallBanner);
exposeCoreRuntimeConstant('maybeShowIosPwaHelp', maybeShowIosPwaHelp);
exposeCoreRuntimeConstant('updateSelectIconBoxes', updateSelectIconBoxes);
const CORE_RUNTIME_CONSTANTS = {
  CORE_GLOBAL_SCOPE,
  CORE_BOOT_QUEUE_KEY,
  CORE_BOOT_QUEUE,
  CORE_SHARED,
  INSTALL_BANNER_DISMISSED_KEY,
  AUTO_GEAR_ANY_MOTOR_TOKEN,
  AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE,
  AUTO_GEAR_BACKUP_RETENTION_MAX,
  AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS,
  AUTO_GEAR_MONITOR_DEFAULT_TYPES,
  GEAR_LIST_CATEGORIES,
  TEMPERATURE_STORAGE_KEY,
  TEMPERATURE_UNITS,
  TEMPERATURE_SCENARIOS,
  FEEDBACK_TEMPERATURE_MIN,
  FEEDBACK_TEMPERATURE_MAX,
};

// Ensure mount voltage helpers remain reachable from the session layer.
Object.assign(CORE_RUNTIME_CONSTANTS, MOUNT_VOLTAGE_RUNTIME_EXPORTS);

Object.assign(CORE_RUNTIME_CONSTANTS, {
  // Pink mode animated icon controls are required for theme toggles during imports.
  startPinkModeAnimatedIcons,
  stopPinkModeAnimatedIcons,
  pinkModeIcons,
  ensureSvgHasAriaHidden,
  triggerPinkModeIconRain,
  PINK_MODE_ICON_INTERVAL_MS,
  PINK_MODE_ICON_ANIMATION_CLASS,
  PINK_MODE_ICON_ANIMATION_RESET_DELAY,
  getGridSnapState,
  setGridSnapState,
});

exposeCoreRuntimeConstants(CORE_RUNTIME_CONSTANTS);

exposeCoreRuntimeBindings({
  safeGenerateConnectorSummary: {
    get: () => sessionSafeGenerateConnectorSummary,
    set: value => {
      if (typeof value === 'function') {
        sessionSafeGenerateConnectorSummary = value;
      }
    },
  },
  baseAutoGearRules: {
    get: () => baseAutoGearRulesState,
    set: value => {
      if (Array.isArray(value)) {
        baseAutoGearRulesState = value;
      }
    },
  },
  autoGearAutoPresetId: {
    get: () => autoGearAutoPresetIdState,
    set: value => {
      if (typeof value === 'string') {
        autoGearAutoPresetIdState = value;
      } else if (value === null || typeof value === 'undefined') {
        autoGearAutoPresetIdState = '';
      }
    },
  },
  autoGearScenarioModeSelect: {
    get: () => autoGearScenarioModeSelectElement,
    set: value => {
      autoGearScenarioModeSelectElement = value || null;
    },
  },
  pinkModeIconRotationTimer: {
    get: () => pinkModeIconRotationTimer,
    set: value => {
      if (typeof value === 'number' || value === null || typeof value === 'object') {
        pinkModeIconRotationTimer = value;
      }
    },
  },
  pinkModeIconIndex: {
    get: () => pinkModeIconIndex,
    set: value => {
      if (typeof value === 'number') {
        pinkModeIconIndex = value;
      }
    },
  },
});

}

