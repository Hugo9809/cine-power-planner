/**
 * Session Runtime Utilities
 *
 * Provides runtime scope resolution for the session layer.
 * Extracted from app-session.js.
 */

import { detectGlobalScope, collectCandidateScopes } from '../helpers/scope-utils.js';

export const CORE_GLOBAL_SCOPE = detectGlobalScope();

/**
 * DEEP DIVE: Session Scope Resolution
 *
 * This function determines the "global" context for the current executing environment.
 * It is critical for the "Islands of Automation" architecture because it allows the session
 * state to anchor itself to whatever global object is available.
 */
export function getSessionCloneScope() {
    return CORE_GLOBAL_SCOPE;
}

export function getSessionRuntimeScopes() {
    return collectCandidateScopes(CORE_GLOBAL_SCOPE);
}

export function detectPrimaryGlobalScope() {
    return CORE_GLOBAL_SCOPE;
}

export function resolveModuleApi(name, validator) {
    if (typeof name !== 'string' || !name) {
        return null;
    }

    const validate = typeof validator === 'function' ? validator : value => !!value;
    const seen = new Set();
    const queue = [];

    const enqueueScope = candidate => {
        if (!candidate || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
            return;
        }
        if (seen.has(candidate)) {
            return;
        }
        seen.add(candidate);
        queue.push(candidate);
    };

    const nestedKeys = [
        'CORE_SHARED',
        'CORE_GLOBAL_SCOPE',
        'CORE_AGGREGATED_EXPORTS',
        'CORE_RUNTIME_SCOPE',
        'CORE_PART2_RUNTIME_SCOPE',
        'CORE_SCOPE',
        'CORE_SHARED_SCOPE_PART2',
        'cine',
        'cineGlobals',
        'cineModuleGlobals',
        'cineModuleBase',
        'cineModuleContext',
        'cineRuntime',
        'cinePersistence',
        'cineOffline',
        'cineUi',
        'APP',
        'app',
        '__cineGlobal',
        '__cineScope',
        '__cineModules',
        '__cineExports',
        '__cineRuntime',
    ];

    const checkCandidate = candidate => {
        if (!candidate) {
            return null;
        }
        try {
            if (validate(candidate)) {
                return candidate;
            }
        } catch (validationError) {
            void validationError;
        }
        return null;
    };

    const tryResolveFromScope = scope => {
        let directCandidate;
        try {
            directCandidate = scope[name];
        } catch (directError) {
            void directError;
            directCandidate = undefined;
        }
        const validatedDirect = checkCandidate(directCandidate);
        if (validatedDirect) {
            return validatedDirect;
        }

        let moduleGlobals;
        try {
            moduleGlobals = scope.cineModuleGlobals;
        } catch (globalsError) {
            void globalsError;
            moduleGlobals = null;
        }
        if (moduleGlobals && typeof moduleGlobals.getModule === 'function') {
            try {
                const viaGlobals = moduleGlobals.getModule(name);
                const validatedGlobal = checkCandidate(viaGlobals);
                if (validatedGlobal) {
                    return validatedGlobal;
                }
            } catch (globalLookupError) {
                void globalLookupError;
            }
        }

        let registry;
        try {
            registry = scope.cineModules;
        } catch (registryError) {
            void registryError;
            registry = null;
        }
        if (registry && typeof registry.get === 'function') {
            try {
                const viaRegistry = registry.get(name);
                const validatedRegistry = checkCandidate(viaRegistry);
                if (validatedRegistry) {
                    return validatedRegistry;
                }
            } catch (registryLookupError) {
                void registryLookupError;
            }
        }

        return null;
    };

    const runtimeScopes = getSessionRuntimeScopes();
    for (let index = 0; index < runtimeScopes.length; index += 1) {
        enqueueScope(runtimeScopes[index]);
    }

    while (queue.length) {
        const scope = queue.shift();
        if (!scope) {
            continue;
        }

        const resolved = tryResolveFromScope(scope);
        if (resolved) {
            return resolved;
        }

        for (let index = 0; index < nestedKeys.length; index += 1) {
            const key = nestedKeys[index];
            let nested;
            try {
                nested = scope[key];
            } catch (nestedError) {
                void nestedError;
                nested = undefined;
            }
            if (nested) {
                enqueueScope(nested);
            }
        }
    }

    return null;
}

export function ensureSessionRuntimePlaceholder(name, fallbackValue) {
    const scope = detectPrimaryGlobalScope();

    const fallbackProvider =
        typeof fallbackValue === 'function'
            ? fallbackValue
            : () => fallbackValue;

    if (!scope || typeof scope !== 'object') {
        return fallbackProvider();
    }

    try {
        const existing = scope[name];
        if (typeof existing === 'undefined' || existing === null) {
            const val = fallbackProvider();
            if (typeof val !== 'undefined' && val !== null) {
                scope[name] = val;
            }
            return val;
        }
        return existing;
    } catch (placeholderError) {
        void placeholderError;
        return fallbackProvider();
    }
}

export function whenGlobalValueAvailable(name, validator, onResolve, options = {}) {
    if (typeof name !== 'string' || !name) {
        return false;
    }
    if (typeof validator !== 'function' || typeof onResolve !== 'function') {
        return false;
    }

    const scope = detectPrimaryGlobalScope();
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return false;
    }

    const attemptsLimit = typeof options.maxAttempts === 'number' ? options.maxAttempts : 150;
    const continueIndefinitely = attemptsLimit < 0;
    const interval = typeof options.interval === 'number' && options.interval > 0 ? options.interval : 200;

    const invokeResolve = value => {
        try {
            onResolve(value);
        } catch (handlerError) {
            if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
                console.error(`whenGlobalValueAvailable: handler for ${name} threw.`, handlerError);
            }
        }
    };

    const attempt = value => {
        if (!validator(value)) {
            return false;
        }
        invokeResolve(value);
        return true;
    };

    const initialCandidate = (() => {
        try {
            return scope[name];
        } catch (accessError) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                console.warn(`whenGlobalValueAvailable: unable to read ${name} during initial attempt.`, accessError);
            }
            return undefined;
        }
    })();

    if (attempt(initialCandidate)) {
        return true;
    }

    let attempts = 0;
    let cancelled = false;
    const timers = [];

    const clearTimers = () => {
        cancelled = true;
        for (let index = 0; index < timers.length; index += 1) {
            try {
                clearTimeout(timers[index]);
            } catch (clearError) {
                void clearError;
            }
        }
        timers.length = 0;
    };

    const handleTimeout = () => {
        if (typeof options.onTimeout === 'function') {
            try {
                options.onTimeout();
            } catch (timeoutError) {
                if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                    console.warn(`whenGlobalValueAvailable: timeout handler for ${name} failed.`, timeoutError);
                }
            }
        }
    };

    const poll = () => {
        if (cancelled) {
            return;
        }

        attempts += 1;

        let candidate = undefined;
        try {
            candidate = scope[name];
        } catch (accessError) {
            if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                console.warn(`whenGlobalValueAvailable: unable to read ${name} during polling.`, accessError);
            }
            candidate = undefined;
        }

        if (attempt(candidate)) {
            clearTimers();
            return;
        }

        if (!continueIndefinitely && attempts >= attemptsLimit) {
            clearTimers();
            handleTimeout();
            return;
        }

        const handle = setTimeout(poll, interval);
        timers.push(handle);
    };

    const initialHandle = setTimeout(poll, interval);
    timers.push(initialHandle);

    return true;
}

export function normalizeVersionValue(value) {
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
}

export function resolveKnownAppVersion(explicitVersion) {
    const normalizedExplicit = normalizeVersionValue(explicitVersion);
    if (normalizedExplicit) {
        return normalizedExplicit;
    }

    try {
        if (typeof APP_VERSION === 'string') {
            const normalized = normalizeVersionValue(APP_VERSION);
            if (normalized) {
                return normalized;
            }
        }
    } catch (appVersionError) {
        void appVersionError;
    }

    const seen = new Set();
    const queue = [];

    const enqueueCandidate = value => {
        if (!value) {
            return;
        }
        const type = typeof value;
        if (type !== 'object' && type !== 'function') {
            return;
        }
        if (seen.has(value)) {
            return;
        }
        seen.add(value);
        queue.push(value);
    };

    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        enqueueCandidate(scopes[index]);
    }

    try {
        if (typeof CORE_SHARED !== 'undefined' && CORE_SHARED) {
            enqueueCandidate(CORE_SHARED);
        }
    } catch (coreSharedError) {
        void coreSharedError;
    }

    try {
        if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
            enqueueCandidate(CORE_GLOBAL_SCOPE);
        }
    } catch (coreGlobalError) {
        void coreGlobalError;
    }

    const versionKeys = ['APP_VERSION', 'appVersion', 'applicationVersion', 'version'];
    const nestedKeys = [
        'CORE_SHARED',
        'CORE_GLOBAL_SCOPE',
        'CORE_AGGREGATED_EXPORTS',
        'CORE_RUNTIME_SCOPE',
        'CORE_PART2_RUNTIME_SCOPE',
        'CORE_SCOPE',
        'CORE_SHARED_SCOPE_PART2',
        'cineCoreShared',
        'cineModules',
        'cineModuleGlobals',
        'cineModuleBase',
        'cineModuleContext',
        'cineRuntime',
        'cinePersistence',
        'cineOffline',
        'cineUi',
        'cineGlobals',
        'cine',
        'APP',
        'app',
        'globalScope',
        'scope',
        'exports',
        'module',
        'modules',
        'environment',
        'context',
        'runtime',
        'shared',
        'globals',
        '__cineGlobal',
        '__cineScope',
        '__cineModules',
        '__cineExports',
        '__cineRuntime',
        'details',
        'meta',
        'metadata',
        'build',
        'buildInfo',
    ];

    let iterationCount = 0;
    while (queue.length) {
        iterationCount++;
        if (iterationCount > 1000) {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('resolveKnownAppVersion: exceeded max iterations');
            }
            break;
        }
        const candidate = queue.shift();
        if (!candidate) {
            continue;
        }

        for (let index = 0; index < versionKeys.length; index += 1) {
            const key = versionKeys[index];
            let value;
            try {
                value = candidate[key];
            } catch (readError) {
                value = undefined;
                void readError;
            }
            const normalized = normalizeVersionValue(value);
            if (normalized) {
                return normalized;
            }
        }

        for (let index = 0; index < nestedKeys.length; index += 1) {
            const nestedKey = nestedKeys[index];
            let nestedValue;
            try {
                nestedValue = candidate[nestedKey];
            } catch (nestedError) {
                nestedValue = null;
                void nestedError;
            }
            enqueueCandidate(nestedValue);
        }

        let keys = [];
        try {
            keys = Object.keys(candidate);
        } catch (keysError) {
            keys = [];
            void keysError;
        }
        const limitedKeys = keys.length > 50 ? keys.slice(0, 50) : keys;
        for (let index = 0; index < limitedKeys.length; index += 1) {
            const key = limitedKeys[index];
            if (!/(version|core|cine|shared|global|app)/i.test(key)) {
                continue;
            }
            let nested;
            try {
                nested = candidate[key];
            } catch (valueError) {
                nested = null;
                void valueError;
            }
            enqueueCandidate(nested);
        }
    }

    return null;
}

export function resolveMountVoltageNamespace() {
    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
        }

        try {
            const namespace = scope.cineCoreMountVoltage;
            if (namespace && typeof namespace === 'object') {
                return namespace;
            }
        } catch (resolveError) {
            void resolveError;
        }
    }

    return null;
}

export function resolveMountVoltageRuntimeExports() {
    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
        }

        try {
            const exports = scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS;
            if (exports && typeof exports === 'object') {
                return exports;
            }
        } catch (resolveError) {
            void resolveError;
        }
    }

    return null;
}

export function resolveSessionRuntimeFunction(name) {
    if (typeof name !== 'string' || !name) {
        return null;
    }

    const mountNamespace = resolveMountVoltageNamespace();
    if (mountNamespace && typeof mountNamespace[name] === 'function') {
        return mountNamespace[name];
    }

    const mountRuntimeExports = resolveMountVoltageRuntimeExports();
    if (mountRuntimeExports && typeof mountRuntimeExports[name] === 'function') {
        return mountRuntimeExports[name];
    }

    const scopes = getSessionRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        let candidate = null;
        try {
            candidate = scope[name];
        } catch (resolveError) {
            candidate = null;
            void resolveError;
        }

        if (typeof candidate === 'function') {
            return candidate;
        }
    }

    return null;
}

export function ensureDeferredScriptsLoaded(reason) {
    const scope = detectPrimaryGlobalScope();

    if (!scope) return null;

    let result = null;

    try {
        if (typeof scope.cineEnsureDeferredScriptsLoaded === 'function') {
            result = scope.cineEnsureDeferredScriptsLoaded({ reason });
        }
    } catch (ensureError) {
        void ensureError;
        result = null;
    }

    if (!result) {
        try {
            result = scope.cineDeferredScriptsReady;
        } catch (readError) {
            void readError;
            result = null;
        }
    }

    return result;
}

export function ensureOnboardingTourReady(reason) {
    const scope = detectPrimaryGlobalScope();

    if (!scope) {
        return null;
    }

    let loader = null;

    try {
        if (typeof scope.cineEnsureOnboardingTourLoaded === 'function') {
            loader = scope.cineEnsureOnboardingTourLoaded(reason);
        }
    } catch (error) {
        void error;
        loader = null;
    }

    if (loader && typeof loader.then === 'function') {
        loader.catch(loadError => {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn('Onboarding tour module failed to pre-load for help interactions.', loadError);
            }
        });
    }

    return loader;
}

export function resolveCompatibilityTexts(langTexts, fallbackTexts) {
    const scope = detectPrimaryGlobalScope();
    const texts = scope && scope.texts ? scope.texts : {};
    const currentLang = scope && scope.currentLang ? scope.currentLang : 'en';

    const translations = typeof texts === 'object' && texts ? texts : {};
    const resolvedFallback = fallbackTexts || translations.en || {};
    const lang = typeof currentLang === 'string' && translations[currentLang]
        ? currentLang
        : 'en';
    const resolvedLang = langTexts || translations[lang] || resolvedFallback;
    return { lang, langTexts: resolvedLang, fallbackTexts: resolvedFallback };
}

export function ensureMeaningfulValue(value) {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length > 0;
    }
    return false;
}

export const formatNumberForComparison = ensureSessionRuntimePlaceholder(
    'formatNumberForComparison',
    () => {
        const formatterCache = new Map();

        const getFormatter = (lang, hasFraction) => {
            const cacheKey = `${lang}|${hasFraction ? 'fraction' : 'integer'}`;
            if (formatterCache.has(cacheKey)) {
                return formatterCache.get(cacheKey);
            }

            if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
                try {
                    const formatter = new Intl.NumberFormat(lang, {
                        maximumFractionDigits: hasFraction ? 2 : 0,
                    });
                    formatterCache.set(cacheKey, formatter);
                    return formatter;
                } catch (error) {
                    console.warn('Unable to create comparison number formatter', error);
                }
            }

            formatterCache.set(cacheKey, null);
            return null;
        };

        return (input) => {
            if (input === null || input === undefined) {
                return '';
            }

            const numeric = typeof input === 'number'
                ? input
                : Number(typeof input === 'string' ? input.trim() : input);

            if (!Number.isFinite(numeric)) {
                return typeof input === 'string' ? input : String(input);
            }

            const { lang } = resolveCompatibilityTexts();
            const hasFraction = Math.abs(numeric % 1) > Number.EPSILON;
            const formatter = getFormatter(lang, hasFraction);

            if (formatter) {
                try {
                    return formatter.format(numeric);
                } catch (error) {
                    console.warn('Comparison number formatting failed', error);
                }
            }

            try {
                return numeric.toLocaleString(lang);
            } catch (localeError) {
                void localeError;
            }

            return String(numeric);
        };
    },
);

export const getManualDownloadFallbackMessage = ensureSessionRuntimePlaceholder(
    'getManualDownloadFallbackMessage',
    () => () => {
        const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
        return langTexts.manualDownloadFallback
            || fallbackTexts.manualDownloadFallback
            || 'The download did not start automatically. A new tab opened with the file contents so you can copy or save them manually.';
    },
);

export const getManualDownloadCopyHint = ensureSessionRuntimePlaceholder(
    'getManualDownloadCopyHint',
    () => () => {
        const { langTexts, fallbackTexts } = resolveCompatibilityTexts();
        return langTexts.manualDownloadCopyHint
            || fallbackTexts.manualDownloadCopyHint
            || 'Select all the text below and copy it to keep the file safe.';
    },
);
