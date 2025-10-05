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

  function createUniqueList() {
    const items = [];
    return {
      push(candidate) {
        if (items.indexOf(candidate) === -1) {
          items.push(candidate);
        }
      },
      toArray() {
        return items.slice();
      },
    };
  }

  function collectCandidateScopes(primary) {
    const list = createUniqueList();

    function push(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      list.push(scope);
    }

    push(primary || detectGlobalScope());
    if (typeof globalThis !== 'undefined') push(globalThis);
    if (typeof window !== 'undefined') push(window);
    if (typeof self !== 'undefined') push(self);
    if (typeof global !== 'undefined') push(global);

    return list.toArray();
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

  function resolveFromScopes(propertyName, options) {
    const settings = options || {};
    const predicate = typeof settings.predicate === 'function' ? settings.predicate : null;
    const scopes = Array.isArray(settings.scopes)
      ? settings.scopes.slice()
      : collectCandidateScopes(settings.primaryScope || detectGlobalScope());

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      if (predicate) {
        try {
          if (predicate(scope, propertyName)) {
            return scope;
          }
        } catch (error) {
          void error;
        }
        continue;
      }

      const candidate = scope[propertyName];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return null;
  }

  function defineHiddenProperty(target, key, value) {
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
    } catch (error) {
      void error;
    }

    try {
      target[key] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
    }

    return false;
  }

  function ensureQueue(scope, key) {
    if (!scope || typeof scope !== 'object' || typeof key !== 'string' || !key) {
      return null;
    }

    let queue = scope[key];
    if (Array.isArray(queue)) {
      return queue;
    }

    if (defineHiddenProperty(scope, key, [])) {
      queue = scope[key];
      if (Array.isArray(queue)) {
        return queue;
      }
    }

    try {
      scope[key] = [];
      queue = scope[key];
    } catch (error) {
      void error;
      return null;
    }

    return queue;
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

  function freezeDeep(value, seen) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }

    if (shouldBypassDeepFreeze(value)) {
      return value;
    }

    const tracker = seen || new WeakSet();
    if (tracker.has(value)) {
      return value;
    }

    tracker.add(value);

    const keys = Object.getOwnPropertyNames(value);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }

      freezeDeep(descriptor.value, tracker);
    }

    return Object.freeze(value);
  }

  function safeWarn(message, detail) {
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

  const architecture = Object.freeze({
    detectGlobalScope,
    collectCandidateScopes,
    tryRequire,
    resolveFromScopes,
    defineHiddenProperty,
    ensureQueue,
    freezeDeep,
    safeWarn,
  });

  function createModuleArchitecture(options) {
    const settings = options || {};
    const customPrimaryScope =
      settings && (settings.primaryScope || settings.scope) &&
      (typeof settings.primaryScope === 'object' || typeof settings.primaryScope === 'function'
        ? settings.primaryScope
        : typeof settings.scope === 'object' || typeof settings.scope === 'function'
          ? settings.scope
          : null);

    const detectOverride =
      typeof settings.detectGlobalScope === 'function'
        ? settings.detectGlobalScope
        : function detectOverride() {
            return customPrimaryScope || detectGlobalScope();
          };

    const additionalScopes = Array.isArray(settings.additionalScopes)
      ? settings.additionalScopes.filter(function isObjectLike(value) {
          return value && (typeof value === 'object' || typeof value === 'function');
        })
      : [];

    const tryRequireOverride =
      typeof settings.tryRequire === 'function' ? settings.tryRequire : tryRequire;

    const resolveOverride =
      typeof settings.resolveFromScopes === 'function' ? settings.resolveFromScopes : null;

    const ensureQueueDefaultKey =
      typeof settings.pendingQueueKey === 'string' && settings.pendingQueueKey
        ? settings.pendingQueueKey
        : null;

    const freezeOverride =
      typeof settings.freezeDeep === 'function' ? settings.freezeDeep : freezeDeep;

    const warnOverride =
      typeof settings.safeWarn === 'function' ? settings.safeWarn : safeWarn;

    function collectWithExtras(primary) {
      const targetPrimary = primary || customPrimaryScope || detectOverride();
      const scopes = collectCandidateScopes(targetPrimary);

      for (let index = 0; index < additionalScopes.length; index += 1) {
        const scope = additionalScopes[index];
        if (scopes.indexOf(scope) === -1) {
          scopes.push(scope);
        }
      }

      return scopes;
    }

    function resolveWithExtras(propertyName, resolveOptions) {
      if (resolveOverride) {
        return resolveOverride(propertyName, resolveOptions);
      }

      const optionsToUse = resolveOptions ? { ...resolveOptions } : {};
      if (!optionsToUse.scopes && additionalScopes.length > 0) {
        optionsToUse.scopes = collectWithExtras(optionsToUse.primaryScope);
      }
      return resolveFromScopes(propertyName, optionsToUse);
    }

    function tryRequireWithOverride(modulePath) {
      return tryRequireOverride(modulePath);
    }

    function ensureQueueWithDefault(scope, key) {
      const queueKey = typeof key === 'string' && key ? key : ensureQueueDefaultKey;
      return ensureQueue(scope, queueKey || '__cinePendingModuleRegistrations__');
    }

    return Object.freeze({
      detectGlobalScope: detectOverride,
      collectCandidateScopes: collectWithExtras,
      tryRequire: tryRequireWithOverride,
      resolveFromScopes: resolveWithExtras,
      defineHiddenProperty,
      ensureQueue: ensureQueueWithDefault,
      freezeDeep: freezeOverride,
      safeWarn: warnOverride,
    });
  }

  const globalScope = detectGlobalScope();
  const architectureWithFactory = Object.freeze({
    ...architecture,
    createModuleArchitecture,
  });

  if (!globalScope.cineModuleArchitecture) {
    defineHiddenProperty(globalScope, 'cineModuleArchitecture', architectureWithFactory);
  }

  if (!globalScope.cineModuleArchitectureFactory) {
    defineHiddenProperty(globalScope, 'cineModuleArchitectureFactory', Object.freeze({
      createModuleArchitecture,
    }));
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = architectureWithFactory;
  }
})();

