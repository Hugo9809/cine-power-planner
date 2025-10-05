(function () {
  function detectGlobalScope() {
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

  function tryRequire(modulePath) {
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

  function createUniqueScopeList() {
    const scopes = [];

    return {
      push(scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
          return;
        }
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      },
      toArray() {
        return scopes.slice();
      },
    };
  }

  function collectCandidateScopes(primary) {
    const list = createUniqueScopeList();
    list.push(primary);
    if (typeof globalThis !== 'undefined') list.push(globalThis);
    if (typeof window !== 'undefined') list.push(window);
    if (typeof self !== 'undefined') list.push(self);
    if (typeof global !== 'undefined') list.push(global);
    return list.toArray();
  }

  function defineHiddenProperty(target, name, value) {
    if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
      return false;
    }

    try {
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value,
      });
      return true;
    } catch (error) {
      void error;
    }

    try {
      target[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function shouldBypassDeepFreeze(value) {
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

  function freezeDeep(value, seen = new WeakSet()) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
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
      freezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  function freezeArray(values) {
    const cloned = Array.isArray(values) ? values.slice() : [];
    return freezeDeep(cloned);
  }

  function freezeObject(value) {
    if (!value || typeof value !== 'object') {
      return value;
    }
    const clone = { ...value };
    return freezeDeep(clone);
  }

  function ensureQueue(scope, key) {
    if (!scope || typeof scope !== 'object') {
      return null;
    }

    const queueKey = typeof key === 'string' && key ? key : '__cinePendingModuleRegistrations__';
    let queue = null;

    try {
      queue = scope[queueKey];
    } catch (error) {
      void error;
      queue = null;
    }

    if (Array.isArray(queue)) {
      return queue;
    }

    if (defineHiddenProperty(scope, queueKey, [])) {
      queue = scope[queueKey];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      scope[queueKey] = [];
      queue = scope[queueKey];
    } catch (assignmentError) {
      void assignmentError;
      return null;
    }

    return Array.isArray(queue) ? queue : null;
  }

  function queueModuleRegistration(scope, name, api, options) {
    const targetScope = scope || detectGlobalScope();
    const queue = ensureQueue(targetScope, '__cinePendingModuleRegistrations__');
    if (!queue) {
      return false;
    }

    const payload = freezeDeep({
      name,
      api,
      options: freezeObject(options || {}),
    });

    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }

    return true;
  }

  function resolveModuleRegistry(scope) {
    const targetScope = scope || detectGlobalScope();

    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = collectCandidateScopes(targetScope);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
      if (candidate && typeof candidate.cineModules === 'object') {
        return candidate.cineModules;
      }
    }

    return null;
  }

  const GLOBAL_SCOPE = detectGlobalScope();
  const API = Object.freeze({
    shouldBypassDeepFreeze,
    freezeDeep,
    freezeArray,
    freezeObject,
  });

  const registry = resolveModuleRegistry(GLOBAL_SCOPE);
  const registrationOptions = {
    category: 'infrastructure',
    description: 'Shared immutability helpers that provide consistent deep freezing across modules.',
    replace: true,
  };

  if (registry && typeof registry.register === 'function') {
    try {
      registry.register('cineModuleImmutability', API, registrationOptions);
    } catch (error) {
      void error;
      queueModuleRegistration(GLOBAL_SCOPE, 'cineModuleImmutability', API, registrationOptions);
    }
  } else {
    queueModuleRegistration(GLOBAL_SCOPE, 'cineModuleImmutability', API, registrationOptions);
  }

  if (!GLOBAL_SCOPE.cineModuleImmutability) {
    defineHiddenProperty(GLOBAL_SCOPE, 'cineModuleImmutability', API);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = API;
  }
})();
