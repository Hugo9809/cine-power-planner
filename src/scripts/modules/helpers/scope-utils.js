/**
 * Cine Power Planner Scope Utilities
 *
 * Pure ESM module for cross-environment global scope detection.
 * Provides utilities to locate and interact with the global scope across
 * browsers, workers, Node environments, and legacy contexts.
 *
 * @module helpers/scope-utils
 * @see {@link ../runtime-environment.js} for the aggregate API
 * @see {@link ../../docs/dev/architecture/runtime-environment.md} for architecture docs
 *
 * Extracted from app-core-environment.js during Vite migration (Step 24).
 */

/**
 * Locate the best-available global scope in a resilient, legacy-safe way.
 * Falls back to an empty object to avoid throwing in sandboxed/offline contexts.
 * Exists to provide a stable entry point for global access across browsers,
 * workers, Node-like runtimes, and legacy environments.
 *
 * @returns {object} The detected global scope or a safe empty object fallback.
 */
function baseDetectGlobalScope() {
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

const FALLBACK_SCOPE = baseDetectGlobalScope();
const DETECT_CACHE = { value: null, time: 0 };

/**
 * Safely define a non-enumerable property on a target without throwing.
 * Uses defineProperty when possible, then falls back to assignment.
 * Exists to cache helper results on globals even in restricted environments.
 *
 * @param {object|Function|null|undefined} target - The object or function to receive the property.
 * @param {string} key - The property name to define.
 * @param {*} value - The value to assign.
 * @returns {boolean} True when the property was set, otherwise false.
 */
function safeAssign(target, key, value) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    return false;
  }

  try {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      writable: true,
      value,
    });
    return true;
  } catch (defineError) {
    void defineError;
  }

  try {
    target[key] = value;
    return true;
  } catch (assignmentError) {
    void assignmentError;
  }

  return false;
}

/**
 * Detect and cache the global scope with non-throwing access.
 * Uses a cached value when available, with a fallback object as a safety net.
 * Exists to provide consistent global access in offline/legacy deployments.
 *
 * @returns {object} The detected global scope or a safe fallback.
 */
export function detectGlobalScope() {
  if (DETECT_CACHE.value && typeof DETECT_CACHE.value === 'object') {
    return DETECT_CACHE.value;
  }

  try {
    const detected = baseDetectGlobalScope();
    if (detected && (typeof detected === 'object' || typeof detected === 'function')) {
      DETECT_CACHE.value = detected;
      DETECT_CACHE.time = Date.now();
      return detected;
    }
  } catch (detectionError) {
    void detectionError;
  }

  return FALLBACK_SCOPE;
}

/**
 * Collect unique candidate scopes for resilient global lookups.
 * Includes optional primary/extras, detected globals, and known fallbacks.
 * Never throws; failures in detection are ignored.
 * Exists to unify multi-environment access (browser, worker, Node) without
 * breaking offline or legacy contexts.
 *
 * @param {object|Function|null|undefined} primary - Preferred scope to try first.
 * @param {Array<object|Function>|null|undefined} extras - Additional scopes to add.
 * @param {Function|null|undefined} detect - Optional detector (defaults to detectGlobalScope).
 * @returns {Array<object|Function>} A de-duplicated list of candidate scopes.
 */
export function collectCandidateScopes(primary, extras, detect) {
  const seen = [];
  const append = (scope) => {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }
    if (seen.indexOf(scope) === -1) {
      seen.push(scope);
    }
  };

  append(primary);

  const detectFn = typeof detect === 'function' ? detect : detectGlobalScope;

  try {
    append(detectFn());
  } catch (detectError) {
    void detectError;
  }

  if (Array.isArray(extras)) {
    for (let index = 0; index < extras.length; index += 1) {
      append(extras[index]);
    }
  }

  if (typeof globalThis !== 'undefined') append(globalThis);
  if (typeof window !== 'undefined') append(window);
  if (typeof self !== 'undefined') append(self);
  if (typeof global !== 'undefined') append(global);

  append(FALLBACK_SCOPE);

  return seen.slice();
}

/**
 * Attempt a CommonJS require without throwing.
 * Returns null when require is unavailable or the module cannot be loaded.
 * Exists to support legacy/offline environments where dynamic imports differ.
 *
 * @param {string} modulePath - The module identifier to require.
 * @returns {*} The required module value or null on failure.
 */
export function tryRequire(modulePath) {
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

/**
 * Resolve a property-owning scope from a list of candidate globals.
 * Uses optional predicate and safe property checks to avoid throwing.
 * Exists to safely discover globals across multiple runtime contexts.
 *
 * @param {string} propertyName - The global property to look for.
 * @param {object} [options] - Configuration for scope collection and filtering.
 * @param {Function} [options.predicate] - Optional predicate(scope, propertyName) for early match.
 * @param {Array<object|Function>} [options.scopes] - Pre-seeded scopes to inspect first.
 * @param {object|Function} [options.primaryScope] - Primary scope candidate.
 * @param {Array<object|Function>} [options.additionalScopes] - Additional scope candidates.
 * @param {Function} [options.detect] - Custom global detector function.
 * @returns {object|Function|null} The first matching scope or null when not found.
 */
export function resolveFromScopes(propertyName, options) {
  const settings = options || {};
  const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
  const scoped = Array.isArray(settings.scopes) ? settings.scopes.slice() : [];
  const candidates = collectCandidateScopes(
    settings.primaryScope,
    settings.additionalScopes,
    settings.detect
  );

  for (let index = 0; index < candidates.length; index += 1) {
    if (scoped.indexOf(candidates[index]) === -1) {
      scoped.push(candidates[index]);
    }
  }

  for (let index = 0; index < scoped.length; index += 1) {
    const scope = scoped[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    if (predicate) {
      try {
        if (predicate(scope, propertyName)) {
          return scope;
        }
      } catch (predicateError) {
        void predicateError;
      }
    }

    try {
      if (propertyName in scope) {
        return scope;
      }
    } catch (accessError) {
      void accessError;
    }
  }

  return null;
}

/**
 * Read or initialize a cached value on the global scope.
 * Uses a safe, non-throwing define/assign with fallback to direct value.
 * When key is falsy, returns the factory result without caching.
 * Exists to persist shared utilities across loads in offline/legacy runtimes.
 *
 * @param {string} key - Global cache key to read/write.
 * @param {Function|*} factory - Value or factory to produce the value.
 * @returns {*} The cached or newly-created value.
 */
export function getCachedGlobalValue(key, factory) {
  if (!key) {
    return typeof factory === 'function' ? factory() : factory;
  }

  const scope = detectGlobalScope();
  if (scope && typeof scope === 'object') {
    if (Object.prototype.hasOwnProperty.call(scope, key)) {
      return scope[key];
    }

    const value = typeof factory === 'function' ? factory() : factory;
    if (safeAssign(scope, key, value)) {
      try {
        return scope[key];
      } catch (error) {
        void error;
      }
    }
    return value;
  }

  return typeof factory === 'function' ? factory() : factory;
}

const api = {
  baseDetectGlobalScope, // Exported as member of API object but generic
  detectGlobalScope,
  collectCandidateScopes,
  tryRequire,
  defineHiddenProperty: safeAssign,
  resolveFromScopes,
  getCachedGlobalValue,
};

// Global Assignment
const GLOBAL_SCOPE = detectGlobalScope();

if (GLOBAL_SCOPE && !GLOBAL_SCOPE.cineScopeUtils) {
  safeAssign(GLOBAL_SCOPE, 'cineScopeUtils', api);
}

export {
  baseDetectGlobalScope,
  safeAssign as defineHiddenProperty,
  api as cineScopeUtils
};
