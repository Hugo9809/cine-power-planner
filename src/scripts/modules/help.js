/* global cineModuleBase */

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

  function fallbackExposeGlobal(scope, name, value, options) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return false;
    }

    const descriptor = {
      configurable: !options || options.configurable !== false,
      enumerable: !!(options && options.enumerable),
      value,
      writable: !!(options && options.writable),
    };

    try {
      Object.defineProperty(scope, name, descriptor);
      return true;
    } catch (error) {
      void error;
    }

    try {
      scope[name] = value;
      return true;
    } catch (assignmentError) {
      void assignmentError;
      return false;
    }
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? function freezeWithBase(value) {
        try {
          return MODULE_BASE.freezeDeep(value);
        } catch (error) {
          void error;
        }
        return value;
      }
    : function identity(value) {
        return value;
      };

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? function warnWithBase(message, detail) {
        try {
          MODULE_BASE.safeWarn(message, detail);
        } catch (error) {
          void error;
        }
      }
    : function fallbackSafeWarn(message, detail) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
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
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function exposeWithBase(name, value, scope, options) {
        const targetScope = scope || GLOBAL_SCOPE;
        try {
          return MODULE_BASE.exposeGlobal(name, value, targetScope, options);
        } catch (error) {
          void error;
        }
        return fallbackExposeGlobal(targetScope, name, value, options);
      }
    : function exposeFallback(name, value, scope, options) {
        return fallbackExposeGlobal(scope || GLOBAL_SCOPE, name, value, options);
      };

  const collectCandidateScopes = typeof MODULE_BASE.collectCandidateScopes === 'function'
    ? function collectScopes(primary) {
        try {
          return MODULE_BASE.collectCandidateScopes(primary || GLOBAL_SCOPE) || [];
        } catch (error) {
          void error;
        }
        return [];
      }
    : function fallbackCollectScopes(primary) {
        const scopes = [];
        const seed = primary || GLOBAL_SCOPE;
        if (seed && scopes.indexOf(seed) === -1) scopes.push(seed);
        if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
        if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
        if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
        if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
        return scopes.filter(Boolean);
      };

  function safeNormalizeSeedName(name) {
    if (typeof name !== 'string') {
      return '';
    }
    const trimmed = name.trim();
    return trimmed && trimmed.length ? trimmed : '';
  }

  function recordSeedEntry(target, name, value) {
    if (!target || typeof target.set !== 'function') {
      return;
    }

    const normalized = safeNormalizeSeedName(name);
    if (!normalized) {
      return;
    }

    if (typeof value === 'function') {
      target.set(normalized, value);
      return;
    }

    if (typeof value === 'string') {
      const text = value.trim();
      if (!text) {
        return;
      }
      target.set(normalized, text);
    }
  }

  function adoptEntriesFromRegistry(storage, registry) {
    if (!storage || !registry) {
      return;
    }

    if (typeof registry.forEach === 'function') {
      try {
        registry.forEach((entry, key) => {
          if (!entry) {
            return;
          }
          const resolver = typeof entry.resolver === 'function' ? entry.resolver : entry;
          recordSeedEntry(storage, key, resolver);
        });
        return;
      } catch (error) {
        void error;
      }
    }

    if (typeof registry.entries === 'function') {
      try {
        const iterator = registry.entries();
        if (iterator && typeof iterator[Symbol.iterator] === 'function') {
          for (const pair of iterator) {
            if (!Array.isArray(pair) || pair.length < 2) {
              continue;
            }
            const [key, entry] = pair;
            if (!entry) {
              continue;
            }
            const resolver = typeof entry.resolver === 'function' ? entry.resolver : entry;
            recordSeedEntry(storage, key, resolver);
          }
        }
      } catch (error) {
        void error;
      }
    }
  }

  function adoptEntriesFromHelpApi(storage, api) {
    if (!storage || !api || typeof api !== 'object') {
      return;
    }

    if (typeof api.list !== 'function' || typeof api.get !== 'function') {
      return;
    }

    let names = [];
    try {
      names = api.list();
    } catch (error) {
      void error;
      names = [];
    }

    if (!Array.isArray(names) || !names.length) {
      return;
    }

    for (let index = 0; index < names.length; index += 1) {
      const name = names[index];
      let resolver = null;

      try {
        resolver = api.get(name);
      } catch (error) {
        void error;
        resolver = null;
      }

      if (typeof resolver === 'function') {
        recordSeedEntry(storage, name, resolver);
      }
    }
  }

  function adoptEntriesFromHelpModule(storage, moduleCandidate) {
    if (!storage || !moduleCandidate || typeof moduleCandidate !== 'object') {
      return;
    }

    try {
      const internals = moduleCandidate.__internal;
      if (internals && internals.helpRegistry) {
        adoptEntriesFromRegistry(storage, internals.helpRegistry);
      }
    } catch (error) {
      void error;
    }

    try {
      const helpApi = moduleCandidate.help || moduleCandidate;
      adoptEntriesFromHelpApi(storage, helpApi);
    } catch (error) {
      void error;
    }
  }

  function collectExistingHelpEntries(scope) {
    const seeds = new Map();
    const scopes = collectCandidateScopes(scope || GLOBAL_SCOPE);
    const seenScopes = new Set();

    for (let index = 0; index < scopes.length; index += 1) {
      const candidateScope = scopes[index];
      if (!candidateScope || seenScopes.has(candidateScope)) {
        continue;
      }
      seenScopes.add(candidateScope);

      try {
        adoptEntriesFromHelpModule(seeds, candidateScope.cineHelpModule);
      } catch (error) {
        void error;
      }

      try {
        adoptEntriesFromHelpApi(seeds, candidateScope.cineHelp);
      } catch (error) {
        void error;
      }

      try {
        const uiCandidate = candidateScope.cineUi;
        if (uiCandidate && typeof uiCandidate === 'object') {
          if (uiCandidate.__internal && uiCandidate.__internal.helpRegistry) {
            adoptEntriesFromRegistry(seeds, uiCandidate.__internal.helpRegistry);
          }
          adoptEntriesFromHelpApi(seeds, uiCandidate.help);
        }
      } catch (error) {
        void error;
      }
    }

    const entries = [];
    seeds.forEach((value, name) => {
      entries.push({ name, value });
    });
    return entries;
  }

  function createHelpModule(overrides) {
    const freeze = overrides && typeof overrides.freezeDeep === 'function' ? overrides.freezeDeep : freezeDeep;
    const warn = overrides && typeof overrides.safeWarn === 'function' ? overrides.safeWarn : safeWarn;
    const seeds = overrides && Array.isArray(overrides.seedEntries)
      ? overrides.seedEntries.slice()
      : collectExistingHelpEntries(GLOBAL_SCOPE);

    const helpRegistry = new Map();
    const warnedNames = new Set();

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
      return function clonedHelpFunction() {
        return fn.apply(this, arguments);
      };
    }

    function sanitizeHelpEntry(name, value) {
      if (typeof value === 'string') {
        const text = value.trim();
        if (!text) {
          throw new Error(`cineUi help entry "${name}" cannot be empty.`);
        }
        return freeze({ resolver: () => text });
      }

      if (typeof value === 'function') {
        const resolver = cloneFunction(value);
        return freeze({ resolver });
      }

      throw new TypeError(`cineUi help entry "${name}" must be a string or function.`);
    }

    function warnDuplicate(name) {
      if (warnedNames.has(name)) {
        return;
      }
      warnedNames.add(name);
      warn(`cineUi help "${name}" was replaced. Using the latest registration.`);
    }

    function listRegistryKeys() {
      return Array.from(helpRegistry.keys()).sort();
    }

    const helpAPI = freeze({
      register(name, value) {
        const normalized = normalizeName(name);
        const sanitized = sanitizeHelpEntry(normalized, value);
        if (helpRegistry.has(normalized)) {
          warnDuplicate(normalized);
        }
        helpRegistry.set(normalized, sanitized);
        return sanitized.resolver;
      },
      get(name) {
        const normalized = normalizeName(name);
        const entry = helpRegistry.get(normalized);
        return entry ? entry.resolver : null;
      },
      resolve(name) {
        const resolver = this.get(name);
        if (typeof resolver !== 'function') {
          throw new Error(`cineUi help entry "${name}" is not registered.`);
        }
        return resolver.apply(null, Array.prototype.slice.call(arguments, 1));
      },
      list() {
        return listRegistryKeys();
      },
    });

    if (Array.isArray(seeds) && seeds.length) {
      for (let index = 0; index < seeds.length; index += 1) {
        const entry = seeds[index];
        if (!entry || typeof entry.name !== 'string') {
          continue;
        }

        const normalized = safeNormalizeSeedName(entry.name);
        if (!normalized) {
          continue;
        }

        const seedValue = entry.value;
        if (typeof seedValue !== 'function' && typeof seedValue !== 'string') {
          continue;
        }

        try {
          helpAPI.register(normalized, seedValue);
        } catch (error) {
          warn(`cineHelp could not migrate entry "${normalized}".`, error);
        }
      }
    }

    function clearRegistries() {
      helpRegistry.clear();
      warnedNames.clear();
    }

    const internal = freeze({
      helpRegistry,
      warnedNames,
      clearRegistries,
      normalizeName,
      sanitizeHelpEntry,
    });

    return freeze({
      help: helpAPI,
      __internal: internal,
    });
  }

  function exposeCreationFactory(factory) {
    const scopes = collectCandidateScopes(GLOBAL_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }
      const descriptor = {
        configurable: true,
        enumerable: false,
        writable: false,
        value: factory,
      };
      try {
        if (!scope.__cineCreateHelpModule) {
          Object.defineProperty(scope, '__cineCreateHelpModule', descriptor);
        }
      } catch (error) {
        void error;
        try {
          if (!scope.__cineCreateHelpModule) {
            scope.__cineCreateHelpModule = factory;
          }
        } catch (assignmentError) {
          void assignmentError;
        }
      }
    }
  }

  const moduleApi = createHelpModule();

  MODULE_BASE.registerOrQueueModule(
    'cineHelp',
    moduleApi,
    {
      category: 'ui',
      description: 'Shared registry for in-app help entries and resolvers.',
      replace: true,
    },
    function onError(error) {
      safeWarn('Unable to register cineHelp module.', error);
    },
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  exposeGlobal('cineHelp', moduleApi.help, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  exposeGlobal('cineHelpModule', moduleApi, GLOBAL_SCOPE, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  exposeCreationFactory(createHelpModule);

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();
