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
