/* global cineLocale */

(function () {
  'use strict';

  function detectScope(primary) {
    if (
      primary &&
      (typeof primary === 'object' || typeof primary === 'function')
    ) {
      return primary;
    }

    if (
      typeof globalThis !== 'undefined' &&
      globalThis &&
      (typeof globalThis === 'object' || typeof globalThis === 'function')
    ) {
      return globalThis;
    }

    if (
      typeof window !== 'undefined' &&
      window &&
      (typeof window === 'object' || typeof window === 'function')
    ) {
      return window;
    }

    if (
      typeof self !== 'undefined' &&
      self &&
      (typeof self === 'object' || typeof self === 'function')
    ) {
      return self;
    }

    if (
      typeof global !== 'undefined' &&
      global &&
      (typeof global === 'object' || typeof global === 'function')
    ) {
      return global;
    }

    return null;
  }

  function collectCandidateScopes(primary) {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    function push(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      if (seen) {
        if (seen.has(scope)) {
          return;
        }
        seen.add(scope);
      } else if (scopes.indexOf(scope) !== -1) {
        return;
      }

      scopes.push(scope);
    }

    push(primary);
    push(typeof globalThis !== 'undefined' ? globalThis : null);
    push(typeof window !== 'undefined' ? window : null);
    push(typeof self !== 'undefined' ? self : null);
    push(typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function tryRequireLocaleModule() {
    if (typeof require !== 'function') {
      return null;
    }

    try {
      const required = require('../localization.js');
      return required && typeof required === 'object' ? required : null;
    } catch (requireError) {
      void requireError;
    }

    return null;
  }

  function fallbackResolveLocaleModule(primary) {
    if (typeof cineLocale !== 'undefined' && cineLocale && typeof cineLocale === 'object') {
      return cineLocale;
    }

    const candidateScopes = collectCandidateScopes(primary);

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        const moduleCandidate = scope.cineLocale;
        if (moduleCandidate && typeof moduleCandidate === 'object') {
          return moduleCandidate;
        }
      } catch (localeLookupError) {
        void localeLookupError;
      }
    }

    const required = tryRequireLocaleModule();
    if (required) {
      return required;
    }

    return null;
  }

  function fallbackNormalizeLanguageCode(lang, defaultLanguage) {
    if (!lang) {
      return defaultLanguage || 'en';
    }

    try {
      return String(lang).trim().toLowerCase();
    } catch (normalizeError) {
      void normalizeError;
    }

    return defaultLanguage || 'en';
  }

  function fallbackIsRtlLanguage(lang, rtlCodes, defaultLanguage) {
    const normalized = fallbackNormalizeLanguageCode(lang, defaultLanguage);
    const base = normalized.split('-')[0];
    const codes = Array.isArray(rtlCodes) && rtlCodes.length > 0
      ? rtlCodes
      : DEFAULT_RTL_CODES;

    return codes.indexOf(base) !== -1;
  }

  function fallbackApplyLocaleMetadata(target, lang, direction) {
    if (!target) {
      return;
    }

    if (lang) {
      try {
        target.lang = lang;
      } catch (setLangError) {
        void setLangError;
      }
    }

    if (direction) {
      try {
        target.dir = direction;
      } catch (setDirError) {
        void setDirError;
      }
    }
  }

  function createBridgeInvoker(bridge, runtimeScope) {
    if (!bridge || typeof bridge !== 'object') {
      return function noopInvoke() {
        return { invoked: false, value: undefined };
      };
    }

    return function invokeBridge(methodName) {
      if (!methodName || typeof bridge[methodName] !== 'function') {
        return { invoked: false, value: undefined };
      }

      const args = [];
      for (let index = 1; index < arguments.length; index += 1) {
        args.push(arguments[index]);
      }
      args.push(runtimeScope);

      try {
        return { invoked: true, value: bridge[methodName].apply(bridge, args) };
      } catch (bridgeError) {
        void bridgeError;
      }

      return { invoked: true, value: undefined };
    };
  }

  function ensureFrozenArray(values, fallback) {
    if (!Array.isArray(values) || values.length === 0) {
      return fallback || DEFAULT_RTL_CODES;
    }

    const clone = values.slice();
    return Object.freeze(clone);
  }

  const DEFAULT_RTL_CODES = Object.freeze(['ar', 'fa', 'he', 'ur']);

  function resolveRuntimeLocale(options) {
    const runtimeScopeCandidate = options && typeof options === 'object'
      ? options.runtimeScope
      : null;
    const bridgeCandidate = options && typeof options === 'object'
      ? options.localizationBridge
      : null;

    const runtimeScope = detectScope(runtimeScopeCandidate);
    const callBridge = createBridgeInvoker(bridgeCandidate, runtimeScope);

    const localeModuleResult = callBridge('resolveLocaleModule');
    const fallbackLocaleModule = fallbackResolveLocaleModule(runtimeScope);
    const localeModule =
      localeModuleResult.invoked && localeModuleResult.value && typeof localeModuleResult.value === 'object'
        ? localeModuleResult.value
        : fallbackLocaleModule;

    const defaultLanguage = (function resolveDefaultLanguage() {
      const bridged = callBridge('getDefaultLanguage');
      if (bridged.invoked && typeof bridged.value === 'string' && bridged.value) {
        return bridged.value;
      }

      if (
        localeModule &&
        typeof localeModule.DEFAULT_LANGUAGE === 'string' &&
        localeModule.DEFAULT_LANGUAGE
      ) {
        return localeModule.DEFAULT_LANGUAGE;
      }

      return 'en';
    })();

    const rtlLanguageCodes = (function resolveRtlLanguageCodes() {
      const bridged = callBridge('getRtlLanguageCodes');
      if (bridged.invoked && Array.isArray(bridged.value) && bridged.value.length > 0) {
        return ensureFrozenArray(bridged.value);
      }

      if (
        localeModule &&
        Array.isArray(localeModule.RTL_LANGUAGE_CODES) &&
        localeModule.RTL_LANGUAGE_CODES.length > 0
      ) {
        return ensureFrozenArray(localeModule.RTL_LANGUAGE_CODES);
      }

      return DEFAULT_RTL_CODES;
    })();

    function normalizeLanguageCode(lang) {
      const bridged = callBridge('normalizeLanguageCode', lang);
      if (bridged.invoked && typeof bridged.value === 'string' && bridged.value) {
        return bridged.value;
      }

      return fallbackNormalizeLanguageCode(lang, defaultLanguage);
    }

    function isRtlLanguage(lang) {
      const bridged = callBridge('isRtlLanguage', lang);
      if (bridged.invoked && typeof bridged.value === 'boolean') {
        return bridged.value;
      }

      return fallbackIsRtlLanguage(lang, rtlLanguageCodes, defaultLanguage);
    }

    function resolveDocumentDirection(lang) {
      const bridged = callBridge('resolveDocumentDirection', lang);
      if (bridged.invoked && (bridged.value === 'rtl' || bridged.value === 'ltr')) {
        return bridged.value;
      }

      if (typeof document !== 'undefined' && document && document.documentElement) {
        try {
          const docDir = document.documentElement.getAttribute('dir');
          if (docDir === 'rtl' || docDir === 'ltr') {
            return docDir;
          }
        } catch (documentDirectionError) {
          void documentDirectionError;
        }
      }

      return isRtlLanguage(lang) ? 'rtl' : 'ltr';
    }

    function applyLocaleMetadata(target, lang, direction) {
      const bridged = callBridge('applyLocaleMetadata', target, lang, direction);
      if (bridged.invoked) {
        return bridged.value;
      }

      return fallbackApplyLocaleMetadata(target, lang, direction);
    }

    function resolveLocaleModule() {
      return localeModule;
    }

    return Object.freeze({
      resolveLocaleModule,
      DEFAULT_LANGUAGE: defaultLanguage,
      RTL_LANGUAGE_CODES: rtlLanguageCodes,
      normalizeLanguageCode,
      isRtlLanguage,
      resolveDocumentDirection,
      applyLocaleMetadata,
    });
  }

  const namespace = {
    resolveRuntimeLocale,
  };

  const globalScope = detectScope();
  const targetName = 'cineCoreRuntimeLocale';
  const existing =
    globalScope && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};

  for (const key of Object.keys(namespace)) {
    existing[key] = namespace[key];
  }

  if (globalScope && (typeof globalScope === 'object' || typeof globalScope === 'function')) {
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = existing;
  }
})();
