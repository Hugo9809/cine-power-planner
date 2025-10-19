(function initTranslationsLoader() {
  'use strict';

  var DEFAULT_LANGUAGE = 'en';
  var LOCALE_SCRIPTS = {
    en: { url: 'src/scripts/translations/en.js', preloaded: true },
    it: { url: 'src/scripts/translations/it.js' },
    es: { url: 'src/scripts/translations/es.js' },
    fr: { url: 'src/scripts/translations/fr.js' },
    de: { url: 'src/scripts/translations/de.js' },
  };

  var LOCALE_LOADING_MESSAGES = {
    en: 'Loading data…',
    it: 'Caricamento dei dati…',
    es: 'Cargando datos…',
    fr: 'Chargement des données…',
    de: 'Daten werden geladen …',
  };

  function resolveGlobalScope() {
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

  var scope = resolveGlobalScope();
  if (!scope) {
    return;
  }

  var registryKey = '__cineTranslations';
  var loaderStateKey = '__cineTranslationsLoaderState';

  function ensureRegistry() {
    if (scope[registryKey] && typeof scope[registryKey] === 'object') {
      return scope[registryKey];
    }

    try {
      scope[registryKey] = {};
    } catch (assignError) {
      void assignError;
      scope[registryKey] = {};
    }

    return scope[registryKey];
  }

  function ensureLoaderState() {
    if (
      scope[loaderStateKey] &&
      typeof scope[loaderStateKey] === 'object'
    ) {
      return scope[loaderStateKey];
    }

    var state = {
      defaultLocale: null,
      loading: {},
    };

    try {
      scope[loaderStateKey] = state;
    } catch (assignError) {
      void assignError;
      scope[loaderStateKey] = state;
    }

    return state;
  }

    function ensureContainer(name) {
      if (scope[name] && typeof scope[name] === 'object') {
        return scope[name];
      }

      var container = {};

      try {
        scope[name] = container;
      } catch (assignError) {
        void assignError;
        try {
          Object.defineProperty(scope, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: container,
          });
        } catch (defineError) {
          void defineError;
          scope[name] = container;
        }
      }

      return container;
    }

    function tryAssignContainerValue(target, key, value) {
      if (!target || typeof target !== 'object') {
        return false;
      }

      var assigned = false;

      try {
        target[key] = value;
        assigned = target[key] === value;
      } catch (assignError) {
        void assignError;
      }

      if (!assigned && typeof Object.defineProperty === 'function') {
        try {
          Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: value,
          });
          assigned = target[key] === value;
        } catch (defineError) {
          void defineError;
        }
      }

      return assigned;
    }

    function cloneContainerEntries(source) {
      var clone = {};

      if (!source || typeof source !== 'object') {
        return clone;
      }

      try {
        var descriptors = Object.getOwnPropertyDescriptors
          ? Object.getOwnPropertyDescriptors(source)
          : null;

        if (descriptors) {
          Object.keys(descriptors).forEach(function cloneDescriptor(key) {
            var descriptor = descriptors[key];

            if (!descriptor) {
              return;
            }

            if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
              try {
                Object.defineProperty(clone, key, descriptor);
                return;
              } catch (accessorError) {
                void accessorError;
              }
            }

            try {
              Object.defineProperty(clone, key, {
                configurable: true,
                enumerable: descriptor.enumerable === true,
                writable: true,
                value: descriptor.value,
              });
            } catch (defineError) {
              void defineError;
              try {
                clone[key] = source[key];
              } catch (copyError) {
                void copyError;
              }
            }
          });

          return clone;
        }
      } catch (descriptorError) {
        void descriptorError;
      }

      try {
        var keys = Object.keys(source);
        for (var index = 0; index < keys.length; index += 1) {
          var key = keys[index];
          clone[key] = source[key];
        }
      } catch (copyKeysError) {
        void copyKeysError;
      }

      return clone;
    }

    function replaceContainerReference(containerName, replacement) {
      if (!scope || !containerName) {
        return false;
      }

      var replaced = false;

      try {
        scope[containerName] = replacement;
        replaced = scope[containerName] === replacement;
      } catch (assignError) {
        void assignError;
      }

      if (replaced) {
        return true;
      }

      var descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(scope, containerName);
      } catch (descriptorError) {
        void descriptorError;
      }

      if (descriptor) {
        if (!replaced && typeof descriptor.set === 'function') {
          try {
            descriptor.set.call(scope, replacement);
            replaced = scope[containerName] === replacement;
          } catch (setterError) {
            void setterError;
          }
        }

        if (!replaced && descriptor.configurable) {
          try {
            Object.defineProperty(scope, containerName, {
              configurable: true,
              enumerable: descriptor.enumerable === true,
              writable: true,
              value: replacement,
            });
            replaced = scope[containerName] === replacement;
          } catch (redefineError) {
            void redefineError;
          }
        }
      }

      return replaced;
    }

    function ensureContainerAssignment(containerName, container, locale, value) {
      var targetContainer = container && typeof container === 'object' ? container : null;

      if (!targetContainer) {
        return { container: container, assigned: false };
      }

      if (tryAssignContainerValue(targetContainer, locale, value)) {
        return { container: targetContainer, assigned: true };
      }

      var replacement = cloneContainerEntries(targetContainer);
      if (tryAssignContainerValue(replacement, locale, value) && replaceContainerReference(containerName, replacement)) {
        return { container: replacement, assigned: true };
      }

      var fallback = {};
      if (tryAssignContainerValue(fallback, locale, value) && replaceContainerReference(containerName, fallback)) {
        return { container: fallback, assigned: true };
      }

      return { container: targetContainer, assigned: false };
    }

    function cloneTranslationValue(value) {
      if (Array.isArray(value)) {
        return value.map(function cloneArrayItem(item) {
          return cloneTranslationValue(item);
      });
    }

    if (value && typeof value === 'object') {
      var clone = {};
      var keys = Object.keys(value);
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        clone[key] = cloneTranslationValue(value[key]);
      }
      return clone;
    }

    return value;
  }

  function freezeTranslationTree(value, seen) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    var tracker = seen;
    var useWeakMap = typeof WeakMap === 'function';

    if (!tracker) {
      tracker = useWeakMap ? new WeakMap() : [];
    }

    if (useWeakMap) {
      if (tracker.has(value)) {
        return value;
      }
      tracker.set(value, true);
    } else {
      for (var index = 0; index < tracker.length; index += 1) {
        if (tracker[index] === value) {
          return value;
        }
      }
      tracker.push(value);
    }

    if (Array.isArray(value)) {
      for (var arrayIndex = 0; arrayIndex < value.length; arrayIndex += 1) {
        freezeTranslationTree(value[arrayIndex], tracker);
      }
    } else {
      var keys = Object.keys(value);
      for (var keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
        var key = keys[keyIndex];
        freezeTranslationTree(value[key], tracker);
      }
    }

    try {
      if (typeof Object.isFrozen !== 'function' || !Object.isFrozen(value)) {
        Object.freeze(value);
      }
    } catch (freezeError) {
      void freezeError;
    }

    return value;
  }

  function alignTranslationValue(referenceValue, translationValue) {
    var referenceType = Array.isArray(referenceValue)
      ? 'array'
      : referenceValue === null
        ? 'null'
        : typeof referenceValue;

    var translationType = Array.isArray(translationValue)
      ? 'array'
      : translationValue === null
        ? 'null'
        : typeof translationValue;

    if (referenceType === 'array') {
      if (translationType !== 'array') {
        return cloneTranslationValue(referenceValue);
      }

      var maxLength = referenceValue.length;
      var aligned = new Array(maxLength);

      for (var index = 0; index < maxLength; index += 1) {
        var referenceItem = referenceValue[index];
        var translationItem = index < translationValue.length
          ? translationValue[index]
          : undefined;

        aligned[index] = alignTranslationValue(referenceItem, translationItem);
      }

      return aligned;
    }

    if (referenceType === 'object') {
      if (translationType !== 'object') {
        return cloneTranslationValue(referenceValue);
      }

      var alignedObject = translationValue && typeof translationValue === 'object'
        ? translationValue
        : {};
      var referenceKeys = Object.keys(referenceValue || {});

      for (var keyIndex = 0; keyIndex < referenceKeys.length; keyIndex += 1) {
        var key = referenceKeys[keyIndex];
        var referenceChild = referenceValue[key];
        var translationChild = Object.prototype.hasOwnProperty.call(alignedObject, key)
          ? alignedObject[key]
          : undefined;

        alignedObject[key] = alignTranslationValue(referenceChild, translationChild);
      }

      Object.keys(alignedObject).forEach(function removeUnexpected(key) {
        if (!Object.prototype.hasOwnProperty.call(referenceValue, key)) {
          delete alignedObject[key];
        }
      });

      return alignedObject;
    }

    if (translationType === referenceType && typeof translationValue !== 'undefined') {
      return translationValue;
    }

    return cloneTranslationValue(referenceValue);
  }

  function alignDataset(referenceDataset, localeDataset) {
    var result = {};
    var referenceKeys = Object.keys(referenceDataset || {});

    for (var index = 0; index < referenceKeys.length; index += 1) {
      var key = referenceKeys[index];
      var referenceValue = referenceDataset[key];
      var localeValue = localeDataset && Object.prototype.hasOwnProperty.call(localeDataset, key)
        ? localeDataset[key]
        : undefined;

      result[key] = alignTranslationValue(referenceValue, localeValue);
    }

    return result;
  }

  function resolveLocaleKey(candidate) {
    if (typeof candidate !== 'string') {
      return DEFAULT_LANGUAGE;
    }

    var trimmed = candidate.trim();
    if (!trimmed) {
      return DEFAULT_LANGUAGE;
    }

    var lower = trimmed.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(LOCALE_SCRIPTS, lower)) {
      return lower;
    }

    var lowerKeys = Object.keys(LOCALE_SCRIPTS);
    for (var index = 0; index < lowerKeys.length; index += 1) {
      var key = lowerKeys[index];
      if (key.toLowerCase() === lower) {
        return key;
      }
    }

    var short = lower.split('-')[0];
    if (Object.prototype.hasOwnProperty.call(LOCALE_SCRIPTS, short)) {
      return short;
    }

    return DEFAULT_LANGUAGE;
  }

  function getLocaleData(locale) {
    var registry = ensureRegistry();
    return registry && typeof registry === 'object' ? registry[locale] : null;
  }

  function registerLocaleData(locale, data) {
    if (!data || typeof data !== 'object') {
      return null;
    }

    var loaderState = ensureLoaderState();
    var textsContainer = ensureContainer('texts');
    var categoryNamesContainer = ensureContainer('categoryNames');
    var gearItemsContainer = ensureContainer('gearItems');

    var localeTexts = data.texts && typeof data.texts === 'object' ? data.texts : {};
    var localeCategoryNames = data.categoryNames && typeof data.categoryNames === 'object'
      ? data.categoryNames
      : {};
    var localeGearItems = data.gearItems && typeof data.gearItems === 'object'
      ? data.gearItems
      : {};

    var isDefaultLocale = locale === DEFAULT_LANGUAGE;
    var defaultLocale = loaderState.defaultLocale;

    if (isDefaultLocale || !defaultLocale) {
      var frozenTexts = freezeTranslationTree(localeTexts);
      var frozenCategoryNames = freezeTranslationTree(localeCategoryNames);
      var frozenGearItems = freezeTranslationTree(localeGearItems);

      defaultLocale = {
        texts: frozenTexts,
        categoryNames: frozenCategoryNames,
        gearItems: frozenGearItems,
      };

      loaderState = assignDefaultLocale(loaderState, defaultLocale);
      defaultLocale = loaderState.defaultLocale || defaultLocale;
    }

    var reference = defaultLocale || {
      texts: {},
      categoryNames: {},
      gearItems: {},
    };

    var alignedTexts = isDefaultLocale
      ? reference.texts
      : alignDataset(reference.texts, localeTexts);
    var alignedCategoryNames = isDefaultLocale
      ? reference.categoryNames
      : alignDataset(reference.categoryNames, localeCategoryNames);
    var alignedGearItems = isDefaultLocale
      ? reference.gearItems
      : alignDataset(reference.gearItems, localeGearItems);

    var textsAssignment = ensureContainerAssignment('texts', textsContainer, locale, alignedTexts);
    textsContainer = textsAssignment.container;

    var categoryNamesAssignment = ensureContainerAssignment(
      'categoryNames',
      categoryNamesContainer,
      locale,
      alignedCategoryNames
    );
    categoryNamesContainer = categoryNamesAssignment.container;

    var gearItemsAssignment = ensureContainerAssignment(
      'gearItems',
      gearItemsContainer,
      locale,
      alignedGearItems
    );
    gearItemsContainer = gearItemsAssignment.container;

    var assignmentsSucceeded =
      textsAssignment.assigned &&
      categoryNamesAssignment.assigned &&
      gearItemsAssignment.assigned;

    if (!assignmentsSucceeded) {
      if (
        typeof console !== 'undefined' &&
        console &&
        typeof console.warn === 'function'
      ) {
        console.warn('Failed to fully register locale data', locale);
      }
    }

    if (Object.prototype.hasOwnProperty.call(LOCALE_SCRIPTS, locale)) {
      LOCALE_SCRIPTS[locale].loaded = assignmentsSucceeded;
    }

    return {
      texts: alignedTexts,
      categoryNames: alignedCategoryNames,
      gearItems: alignedGearItems,
    };
  }

  function assignDefaultLocale(loaderState, nextDefaultLocale) {
    if (!loaderState || typeof loaderState !== 'object') {
      var initialState = { defaultLocale: nextDefaultLocale, loading: {} };
      try {
        scope[loaderStateKey] = initialState;
        return initialState;
      } catch (initialAssignError) {
        void initialAssignError;
        try {
          Object.defineProperty(scope, loaderStateKey, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: initialState,
          });
        } catch (initialDefineError) {
          void initialDefineError;
        }
        return initialState;
      }
    }

    try {
      loaderState.defaultLocale = nextDefaultLocale;
      return loaderState;
    } catch (assignError) {
      void assignError;
    }

    var descriptor;
    try {
      descriptor = Object.getOwnPropertyDescriptor(loaderState, 'defaultLocale');
    } catch (descriptorError) {
      void descriptorError;
      descriptor = null;
    }

    if (!descriptor || descriptor.configurable) {
      try {
        Object.defineProperty(loaderState, 'defaultLocale', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: nextDefaultLocale,
        });
        return loaderState;
      } catch (defineError) {
        void defineError;
      }
    }

    var replacement = {};
    var keys = Object.keys(loaderState);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (key === 'defaultLocale') {
        continue;
      }
      replacement[key] = loaderState[key];
    }

    replacement.defaultLocale = nextDefaultLocale;

    try {
      scope[loaderStateKey] = replacement;
      return replacement;
    } catch (replaceError) {
      void replaceError;
      try {
        Object.defineProperty(scope, loaderStateKey, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: replacement,
        });
        return replacement;
      } catch (defineStateError) {
        void defineStateError;
      }
    }

    return loaderState;
  }

  function resolveLoadingMessage(locale) {
    var textsContainer = ensureContainer('texts');
    var localeTexts = textsContainer && textsContainer[locale];
    if (localeTexts && typeof localeTexts.globalLoadingIndicator === 'string') {
      return localeTexts.globalLoadingIndicator;
    }
    if (Object.prototype.hasOwnProperty.call(LOCALE_LOADING_MESSAGES, locale)) {
      return LOCALE_LOADING_MESSAGES[locale];
    }
    return LOCALE_LOADING_MESSAGES[DEFAULT_LANGUAGE] || 'Loading…';
  }

  function showLoadingState(locale) {
    var doc = typeof document !== 'undefined' ? document : null;
    if (!doc) {
      return;
    }

    var message = resolveLoadingMessage(locale);
    var indicator = doc.querySelector('.global-loading-indicator-text');
    if (indicator) {
      try {
        indicator.textContent = message;
        indicator.setAttribute('data-loading-language', locale || '');
      } catch (indicatorError) {
        void indicatorError;
      }
    }

    if (doc.documentElement) {
      try {
        if (locale) {
          doc.documentElement.setAttribute('data-language-loading', locale);
        } else {
          doc.documentElement.removeAttribute('data-language-loading');
        }
      } catch (attributeError) {
        void attributeError;
      }
    }
  }

  function clearLoadingState() {
    var doc = typeof document !== 'undefined' ? document : null;
    if (!doc) {
      return;
    }

    var indicator = doc.querySelector('.global-loading-indicator-text');
    if (indicator) {
      try {
        indicator.removeAttribute('data-loading-language');
      } catch (indicatorError) {
        void indicatorError;
      }
    }

    if (doc.documentElement) {
      try {
        doc.documentElement.removeAttribute('data-language-loading');
      } catch (attributeError) {
        void attributeError;
      }
    }
  }

  function loadLocaleScript(locale) {
    var scripts = LOCALE_SCRIPTS[locale];
    if (!scripts) {
      return Promise.resolve(null);
    }

    if (scripts.loaded) {
      return Promise.resolve(getLocaleData(locale));
    }

    var registryData = getLocaleData(locale);
    if (registryData) {
      scripts.loaded = true;
      return Promise.resolve(registryData);
    }

    var loaderState = ensureLoaderState();
    if (loaderState.loading[locale]) {
      return loaderState.loading[locale];
    }

    if (typeof document === 'undefined' || !document || !document.createElement) {
      if (typeof require === 'function') {
        try {
          require('./translations/' + locale + '.js');
          scripts.loaded = true;
          return getLocaleData(locale);
        } catch (requireError) {
          throw requireError;
        }
      }
      return null;
    }

    var existingTag = document.querySelector('script[data-translation-locale="' + locale + '"]');
    if (existingTag) {
      return new Promise(function waitForExisting(resolve, reject) {
        existingTag.addEventListener('load', function onLoad() {
          scripts.loaded = true;
          resolve(getLocaleData(locale));
        });
        existingTag.addEventListener('error', function onError(event) {
          void event;
          reject(new Error('Failed to load translations for ' + locale + '.'));
        });
      });
    }

    loaderState.loading[locale] = new Promise(function startLoading(resolve, reject) {
      var script = document.createElement('script');
      script.async = true;
      script.src = scripts.url;
      script.setAttribute('data-translation-locale', locale);
      script.onload = function handleLoad() {
        scripts.loaded = true;
        delete loaderState.loading[locale];
        resolve(getLocaleData(locale));
      };
      script.onerror = function handleError(event) {
        delete loaderState.loading[locale];
        var error = event && event.error
          ? event.error
          : new Error('Failed to load translations for ' + locale + '.');
        reject(error);
      };

      try {
        document.head.appendChild(script);
      } catch (appendError) {
        delete loaderState.loading[locale];
        reject(appendError);
      }
    });

    return loaderState.loading[locale];
  }

  function ensureDefaultLanguageLoaded() {
    var loaderState = ensureLoaderState();
    if (loaderState.defaultLocale && loaderState.defaultLocale.texts) {
      return loaderState.defaultLocale;
    }

    var existing = getLocaleData(DEFAULT_LANGUAGE);
    if (existing) {
      return registerLocaleData(DEFAULT_LANGUAGE, existing);
    }

    if (typeof require === 'function') {
      try {
        require('./translations/' + DEFAULT_LANGUAGE + '.js');
        return registerLocaleData(DEFAULT_LANGUAGE, getLocaleData(DEFAULT_LANGUAGE));
      } catch (requireError) {
        void requireError;
      }
    }

    var loaded = null;
    try {
      loaded = loadLocaleScript(DEFAULT_LANGUAGE);
    } catch (loadError) {
      throw loadError;
    }

    if (loaded && typeof loaded.then === 'function') {
      return loaded.then(function applyDefault(data) {
        if (data) {
          return registerLocaleData(DEFAULT_LANGUAGE, data);
        }
        return registerLocaleData(DEFAULT_LANGUAGE, getLocaleData(DEFAULT_LANGUAGE));
      });
    }

    if (loaded) {
      return registerLocaleData(DEFAULT_LANGUAGE, loaded);
    }

    return registerLocaleData(DEFAULT_LANGUAGE, getLocaleData(DEFAULT_LANGUAGE));
  }

  function loadLanguage(requestedLanguage) {
    var locale = resolveLocaleKey(requestedLanguage);
    var defaultResult = ensureDefaultLanguageLoaded();

    function applyLocaleAfterDefault() {
      if (locale === DEFAULT_LANGUAGE) {
        var defaultData = getLocaleData(DEFAULT_LANGUAGE);
        return registerLocaleData(DEFAULT_LANGUAGE, defaultData || {});
      }

      var localeResult = null;
      try {
        localeResult = loadLocaleScript(locale);
      } catch (localeError) {
        throw localeError;
      }

      if (localeResult && typeof localeResult.then === 'function') {
        return localeResult.then(function applyLocale(data) {
          var localeData = data || getLocaleData(locale);
          if (!localeData) {
            return registerLocaleData(DEFAULT_LANGUAGE, getLocaleData(DEFAULT_LANGUAGE) || {});
          }
          return registerLocaleData(locale, localeData);
        });
      }

      var localeData = localeResult || getLocaleData(locale);
      if (!localeData) {
        return registerLocaleData(DEFAULT_LANGUAGE, getLocaleData(DEFAULT_LANGUAGE) || {});
      }
      return registerLocaleData(locale, localeData);
    }

    if (defaultResult && typeof defaultResult.then === 'function') {
      return defaultResult.then(function () {
        return applyLocaleAfterDefault();
      });
    }

    return applyLocaleAfterDefault();
  }

  function prefetchLanguage(requestedLanguage) {
    var locale = resolveLocaleKey(requestedLanguage);
    if (locale === DEFAULT_LANGUAGE) {
      return ensureDefaultLanguageLoaded();
    }
    return ensureDefaultLanguageLoaded().then(function onDefaultReady() {
      return loadLocaleScript(locale).then(function afterLoad(data) {
        if (data) {
          registerLocaleData(locale, data);
        }
        return data || getLocaleData(locale) || null;
      });
    });
  }

  function getAvailableLanguages() {
    return Object.keys(LOCALE_SCRIPTS);
  }

  var loaderInterface = {
    defaultLanguage: DEFAULT_LANGUAGE,
    loadLanguage: loadLanguage,
    prefetchLanguage: prefetchLanguage,
    showLoadingState: showLoadingState,
    clearLoadingState: clearLoadingState,
    resolveLocaleKey: resolveLocaleKey,
    getAvailableLanguages: getAvailableLanguages,
    isLanguageReady: function isLanguageReady(locale) {
      var key = resolveLocaleKey(locale);
      var container = ensureContainer('texts');
      return !!(container && container[key]);
    },
  };

  Object.defineProperty(loaderInterface, 'texts', {
    configurable: false,
    enumerable: true,
    get: function getTexts() {
      return ensureContainer('texts');
    },
  });

  Object.defineProperty(loaderInterface, 'categoryNames', {
    configurable: false,
    enumerable: true,
    get: function getCategoryNames() {
      return ensureContainer('categoryNames');
    },
  });

  Object.defineProperty(loaderInterface, 'gearItems', {
    configurable: false,
    enumerable: true,
    get: function getGearItems() {
      return ensureContainer('gearItems');
    },
  });

  var registry = ensureRegistry();
  var initialDefault = registry[DEFAULT_LANGUAGE];
  if (!initialDefault && typeof require === 'function') {
    try {
      require('./translations/' + DEFAULT_LANGUAGE + '.js');
      initialDefault = registry[DEFAULT_LANGUAGE];
    } catch (bootstrapError) {
      void bootstrapError;
    }
  }
  if (initialDefault) {
    registerLocaleData(DEFAULT_LANGUAGE, initialDefault);
  }

  function ensureGlobalLexicalBinding(name, value) {
    if (!name) {
      return;
    }

    try {
      if (typeof scope.Function === 'function') {
        scope.Function(
          'value',
          "try { if (typeof " +
            name +
            " === 'undefined') { " +
            name +
            " = value; } } catch (error) { void error; } return " +
            name +
            ';'
        )(value);
      }
    } catch (lexicalError) {
      void lexicalError;
    }
  }

  ensureGlobalLexicalBinding('texts', loaderInterface.texts);
  ensureGlobalLexicalBinding('categoryNames', loaderInterface.categoryNames);
  ensureGlobalLexicalBinding('gearItems', loaderInterface.gearItems);

  function exposeLoaderInterface(targetScope, value) {
    if (!targetScope) {
      return;
    }

    var assigned = false;

    try {
      if (!targetScope.translations || typeof targetScope.translations !== 'object') {
        targetScope.translations = value;
        assigned = targetScope.translations === value;
      }
    } catch (directAssignError) {
      void directAssignError;
    }

    var descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(targetScope, 'translations');
    } catch (descriptorError) {
      void descriptorError;
    }

    if (!assigned && targetScope.translations && typeof targetScope.translations === 'object') {
      try {
        var existing = targetScope.translations;
        var interfaceDescriptors = Object.getOwnPropertyDescriptors
          ? Object.getOwnPropertyDescriptors(loaderInterface)
          : null;

        if (interfaceDescriptors) {
          var descriptorKeys = Object.keys(interfaceDescriptors);
          for (var index = 0; index < descriptorKeys.length; index += 1) {
            var key = descriptorKeys[index];
            var definition = interfaceDescriptors[key];
            try {
              Object.defineProperty(existing, key, definition);
            } catch (defineExistingError) {
              void defineExistingError;
            }
          }
        } else {
          for (var simpleKey in loaderInterface) {
            if (Object.prototype.hasOwnProperty.call(loaderInterface, simpleKey)) {
              try {
                existing[simpleKey] = loaderInterface[simpleKey];
              } catch (copyError) {
                void copyError;
              }
            }
          }
        }

        assigned = true;
      } catch (mergeError) {
        void mergeError;
      }
    }

    if (assigned) {
      return;
    }

    if (descriptor && typeof descriptor.set === 'function') {
      try {
        descriptor.set.call(targetScope, value);
        assigned = targetScope.translations === value;
      } catch (setterError) {
        void setterError;
      }
    }

    if (assigned) {
      return;
    }

    var propertyDescriptor = {
      configurable: true,
      enumerable: true,
      writable: true,
      value: value,
    };

    if (!descriptor) {
      try {
        Object.defineProperty(targetScope, 'translations', propertyDescriptor);
        assigned = targetScope.translations === value;
      } catch (defineError) {
        void defineError;
      }
    } else if (descriptor.configurable) {
      propertyDescriptor.enumerable = descriptor.enumerable === true;
      try {
        Object.defineProperty(targetScope, 'translations', propertyDescriptor);
        assigned = targetScope.translations === value;
      } catch (redefineError) {
        void redefineError;
      }
    }

    if (assigned) {
      return;
    }

    try {
      if (!targetScope.__cineTranslationsLoader__) {
        Object.defineProperty(targetScope, '__cineTranslationsLoader__', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: value,
        });
      } else {
        targetScope.__cineTranslationsLoader__ = value;
      }
    } catch (fallbackError) {
      void fallbackError;
    }
  }

  exposeLoaderInterface(scope, loaderInterface);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = loaderInterface;
  }
})();
