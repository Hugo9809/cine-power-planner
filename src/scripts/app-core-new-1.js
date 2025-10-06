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

var APP_VERSION = typeof CORE_SHARED.APP_VERSION === 'string' ? CORE_SHARED.APP_VERSION : '1.0.14';

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
const storagePersistenceSection = document.getElementById("storagePersistence");
const storagePersistenceHeading = document.getElementById("storagePersistenceHeading");
const storagePersistenceIntro = document.getElementById("storagePersistenceIntro");
const storagePersistenceRequestButton = document.getElementById("storagePersistenceRequest");
const storagePersistenceStatus = document.getElementById("storagePersistenceStatus");
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

const AUTO_GEAR_SCENARIO_FALLBACK_VALUES = Object.freeze([
  'Indoor',
  'Outdoor',
  'Studio',
  'Tripod',
  'Handheld',
  'Easyrig',
  'Cine Saddle',
  'Steadybag',
  'Dolly',
  'Slider',
  'Steadicam',
  'Gimbal',
  'Trinity',
  'Rollcage',
  'Car Mount',
  'Jib',
  'Undersling mode',
  'Crane',
  'Remote Head',
  'Extreme cold (snow)',
  'Extreme rain',
  'Extreme heat',
  'Rain Machine',
  'Slow Motion',
  'Battery Belt',
]);

function getAutoGearScenarioFallbackOptions() {
  const normalizeEntry = entry => {
    if (!entry || typeof entry !== 'object') {
      return null;
    }

    const { value, label } = entry;
    if (typeof value !== 'string') {
      return null;
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return null;
    }

    const displayLabel =
      typeof label === 'string' && label.trim()
        ? label.trim()
        : trimmedValue;

    return { value: trimmedValue, label: displayLabel };
  };

  const resolveFromSession = () => {
    const sessionEntries = callCoreFunctionIfAvailable(
      'getRequiredScenarioOptionEntries',
      [],
      { defaultValue: null },
    );

    if (Array.isArray(sessionEntries) && sessionEntries.length) {
      const normalized = sessionEntries
        .map(normalizeEntry)
        .filter(Boolean);
      if (normalized.length) {
        return normalized;
      }
    }
    return null;
  };

  const resolveFromScenarioIcons = () => {
    const scope = getCoreGlobalObject();
    const scenarioIcons = scope && scope.scenarioIcons;
    if (!scenarioIcons || typeof scenarioIcons !== 'object') {
      return null;
    }

    const entries = Object.keys(scenarioIcons)
      .filter(key => typeof key === 'string')
      .map(key => key.trim())
      .filter(Boolean)
      .map(value => ({ value, label: value }));

    return entries.length ? entries : null;
  };

  const resolveFromFallbackValues = () =>
    AUTO_GEAR_SCENARIO_FALLBACK_VALUES.map(value => ({ value, label: value }));

  return (
    resolveFromSession()
    || resolveFromScenarioIcons()
    || resolveFromFallbackValues()
  ).sort((a, b) => localeSort(a.label, b.label));
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
  if (!options.size) {
    getAutoGearScenarioFallbackOptions().forEach(({ value, label }) => {
      if (!options.has(value)) {
        options.set(value, label);
      }
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

