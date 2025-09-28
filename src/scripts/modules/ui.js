(function () {
  const GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
          ? self
          : typeof global !== 'undefined'
            ? global
            : {};

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

  function resolveModuleRegistry() {
    const required = tryRequire('./registry.js');
    if (required && typeof required === 'object') {
      return required;
    }

    const scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (scope && typeof scope.cineModules === 'object') {
        return scope.cineModules;
      }
    }

    return null;
  }

  const MODULE_REGISTRY = resolveModuleRegistry();

  const controllerRegistry = new Map();
  const interactionRegistry = new Map();
  const orchestrationRegistry = new Map();
  const helpRegistry = new Map();

  const WARNED_NAMES = new Set();

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

  function normalizeName(name) {
    if (typeof name === 'string' && name.trim()) {
      return name.trim();
    }

    throw new TypeError('cineUi registry names must be non-empty strings.');
  }

  function cloneFunction(fn) {
    if (typeof fn !== 'function') {
      return null;
    }

    return function uiWrapper() {
      return fn.apply(this, arguments);
    };
  }

  function freezeDeep(value, seen = new WeakSet()) {
    if (!value || typeof value !== 'object') {
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

  function sanitizeDescriptor(name, descriptor) {
    if (!descriptor || typeof descriptor !== 'object') {
      throw new TypeError(`cineUi controller "${name}" requires a descriptor object.`);
    }

    const entries = {};
    const propNames = Object.getOwnPropertyNames(descriptor);

    for (let index = 0; index < propNames.length; index += 1) {
      const prop = propNames[index];
      const value = descriptor[prop];
      if (typeof value === 'function') {
        entries[prop] = cloneFunction(value);
      }
    }

    if (!Object.keys(entries).length) {
      throw new Error(`cineUi controller "${name}" did not provide any callable actions.`);
    }

    return freezeDeep(entries);
  }

  function sanitizeInteraction(name, handler) {
    const fn = cloneFunction(handler);
    if (!fn) {
      throw new TypeError(`cineUi interaction "${name}" must be a function.`);
    }
    return freezeDeep({ handler: fn });
  }

  function sanitizeInitializer(name, initializer) {
    const fn = cloneFunction(initializer);
    if (!fn) {
      throw new TypeError(`cineUi initializer "${name}" must be a function.`);
    }
    return freezeDeep({ initializer: fn });
  }

  function sanitizeHelpEntry(name, value) {
    if (typeof value === 'string') {
      const text = value.trim();
      if (!text) {
        throw new Error(`cineUi help entry "${name}" cannot be empty.`);
      }
      return freezeDeep({ resolver: () => text });
    }

    if (typeof value === 'function') {
      const resolver = cloneFunction(value);
      return freezeDeep({ resolver });
    }

    throw new TypeError(`cineUi help entry "${name}" must be a string or function.`);
  }

  function warnDuplicate(name, type) {
    const key = `${type}:${name}`;
    if (WARNED_NAMES.has(key)) {
      return;
    }
    WARNED_NAMES.add(key);
    safeWarn(`cineUi ${type} "${name}" was replaced. Using the latest registration.`);
  }

  function listRegistryKeys(registry) {
    return Array.from(registry.keys()).sort();
  }

  const controllersAPI = freezeDeep({
    register(name, descriptor) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeDescriptor(normalized, descriptor);
      if (controllerRegistry.has(normalized)) {
        warnDuplicate(normalized, 'controller');
      }
      controllerRegistry.set(normalized, sanitized);
      return sanitized;
    },
    get(name) {
      const normalized = normalizeName(name);
      return controllerRegistry.get(normalized) || null;
    },
    invoke(name, action, ...args) {
      const controller = this.get(name);
      if (!controller) {
        throw new Error(`cineUi controller "${name}" is not registered.`);
      }
      const operation = controller[action];
      if (typeof operation !== 'function') {
        throw new Error(`cineUi controller "${name}" does not expose "${action}".`);
      }
      return operation.apply(controller, args);
    },
    list() {
      return listRegistryKeys(controllerRegistry);
    },
  });

  const interactionsAPI = freezeDeep({
    register(name, handler) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeInteraction(normalized, handler);
      if (interactionRegistry.has(normalized)) {
        warnDuplicate(normalized, 'interaction');
      }
      interactionRegistry.set(normalized, sanitized);
      return sanitized.handler;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = interactionRegistry.get(normalized);
      return entry ? entry.handler : null;
    },
    trigger(name, ...args) {
      const handler = this.get(name);
      if (typeof handler !== 'function') {
        throw new Error(`cineUi interaction "${name}" is not registered.`);
      }
      return handler.apply(null, args);
    },
    list() {
      return listRegistryKeys(interactionRegistry);
    },
  });

  const orchestrationAPI = freezeDeep({
    register(name, initializer) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeInitializer(normalized, initializer);
      if (orchestrationRegistry.has(normalized)) {
        warnDuplicate(normalized, 'initializer');
      }
      orchestrationRegistry.set(normalized, sanitized);
      return sanitized.initializer;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = orchestrationRegistry.get(normalized);
      return entry ? entry.initializer : null;
    },
    run(name, ...args) {
      const initializer = this.get(name);
      if (typeof initializer !== 'function') {
        throw new Error(`cineUi initializer "${name}" is not registered.`);
      }
      return initializer.apply(null, args);
    },
    list() {
      return listRegistryKeys(orchestrationRegistry);
    },
  });

  const helpAPI = freezeDeep({
    register(name, value) {
      const normalized = normalizeName(name);
      const sanitized = sanitizeHelpEntry(normalized, value);
      if (helpRegistry.has(normalized)) {
        warnDuplicate(normalized, 'help');
      }
      helpRegistry.set(normalized, sanitized);
      return sanitized.resolver;
    },
    get(name) {
      const normalized = normalizeName(name);
      const entry = helpRegistry.get(normalized);
      return entry ? entry.resolver : null;
    },
    resolve(name, ...args) {
      const resolver = this.get(name);
      if (typeof resolver !== 'function') {
        throw new Error(`cineUi help entry "${name}" is not registered.`);
      }
      return resolver.apply(null, args);
    },
    list() {
      return listRegistryKeys(helpRegistry);
    },
  });

  function clearRegistries() {
    controllerRegistry.clear();
    interactionRegistry.clear();
    orchestrationRegistry.clear();
    helpRegistry.clear();
    WARNED_NAMES.clear();
  }

  const uiAPI = {
    controllers: controllersAPI,
    interactions: interactionsAPI,
    orchestration: orchestrationAPI,
    help: helpAPI,
    __internal: {
      controllerRegistry,
      interactionRegistry,
      orchestrationRegistry,
      helpRegistry,
      clearRegistries,
    },
  };

  freezeDeep(uiAPI);

  if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
    try {
      MODULE_REGISTRY.register('cineUi', uiAPI, {
        category: 'ui',
        description: 'UI controller registry for dialogs, interactions, orchestration, and help copy.',
      });
    } catch (error) {
      safeWarn('Unable to register cineUi module.', error);
    }
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      if (GLOBAL_SCOPE.cineUi !== uiAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cineUi', {
          configurable: true,
          enumerable: false,
          value: uiAPI,
          writable: false,
        });
      }
    } catch (error) {
      safeWarn('Unable to expose cineUi globally.', error);
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = uiAPI;
  }
})();
