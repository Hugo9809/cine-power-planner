/**
 * Cine Power Planner Runtime Environment
 *
 * Aggregate ESM module for environment and runtime state utilities.
 * Unifies scope collection, freeze registries, global value management,
 * and auxiliary helpers (Auto Gear, Icons, Connectors) into a single API.
 *
 * This is the primary entry point for runtime utilities in modern ESM code.
 * Legacy code should continue using app-core-environment.js which imports
 * from this module and exposes globals for backward compatibility.
 *
 * @module runtime-environment
 * @see {@link ./docs/dev/architecture/runtime-environment.md} for architecture docs
 * @see {@link ./helpers/scope-utils.js} for scope detection
 * @see {@link ./helpers/freeze-registry.js} for freeze tracking
 * @see {@link ./helpers/global-scope.js} for global value access
 * @see {@link ./helpers/auto-gear.js} for Auto Gear utilities
 * @see {@link ./helpers/icons.js} for icon utilities
 * @see {@link ./helpers/connectors.js} for connector utilities
 *
 * Created during Vite migration (Step 24) to consolidate environment helpers.
 */

import {
    detectGlobalScope,
    collectCandidateScopes,
    tryRequire,
    resolveFromScopes,
    getCachedGlobalValue
} from './helpers/scope-utils.js';

import {
    createFreezeRegistry,
    freezeRegistryHas,
    freezeRegistryAdd,
    getSharedFreezeRegistry,
    sharedFreezeRegistryHas,
    sharedFreezeRegistryAdd
} from './helpers/freeze-registry.js';

import {
    readGlobalScopeValue,
    writeGlobalScopeValue,
    ensureGlobalFallback,
    normaliseGlobalValue
} from './helpers/global-scope.js';

import {
    AUTO_GEAR_GLOBAL_FALLBACKS,
    ensureAutoGearGlobal,
    repairAutoGearGlobals,
    isAutoGearGlobalReferenceError
} from './helpers/auto-gear.js';

import {
    createFallbackIconFontKeys,
    formatSvgCoordinate,
    positionSvgMarkup,
    resolveIconGlyph,
    applyIconGlyph
} from './helpers/icons.js';

import {
    createFallbackSafeGenerateConnectorSummary
} from './helpers/connectors.js';

// --- Connector Summary Logic (Stateful) ---

let _connectorSummaryWarningIssued = false;

/**
 * Generates a connector summary using available strategies (Global, Shared, Fallback).
 * @param {object} device - The device object.
 * @returns {string} The connector summary.
 */
export function generateSafeConnectorSummary(device) {
    const candidates = [];

    // 1. Check for globally registered function
    const globalFn = readGlobalScopeValue('safeGenerateConnectorSummary');
    if (typeof globalFn === 'function') {
        candidates.push(globalFn);
    }

    // 2. Check for shared runtime state function (if available via global)
    const shared = readGlobalScopeValue('CORE_SHARED');
    if (shared && typeof shared.safeGenerateConnectorSummary === 'function') {
        candidates.push(shared.safeGenerateConnectorSummary);
    }

    // 3. Fallback
    candidates.push(createFallbackSafeGenerateConnectorSummary());

    for (const generator of candidates) {
        try {
            const summary = generator(device);
            if (typeof summary === 'string') {
                return summary;
            }
            if (summary === null || summary === undefined) {
                continue;
            }
            return String(summary);
        } catch (error) {
            if (!_connectorSummaryWarningIssued) {
                _connectorSummaryWarningIssued = true;
                if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                    console.warn('Failed to generate connector summary. Falling back.', error);
                }
            }
        }
    }

    return '';
}


// --- Export Namespace ---

export const Helpers = {
    detectGlobalScope,
    collectCandidateScopes,
    tryRequire,
    resolveFromScopes,
    getCachedGlobalValue,
};

export const Freeze = {
    createRegistry: createFreezeRegistry,
    has: freezeRegistryHas,
    add: freezeRegistryAdd,
    getShared: getSharedFreezeRegistry,
    sharedHas: sharedFreezeRegistryHas,
    sharedAdd: sharedFreezeRegistryAdd
};

export const Global = {
    read: readGlobalScopeValue,
    write: writeGlobalScopeValue,
    ensure: ensureGlobalFallback,
    normalise: normaliseGlobalValue
};

export const AutoGear = {
    FALLBACKS: AUTO_GEAR_GLOBAL_FALLBACKS,
    ensure: ensureAutoGearGlobal,
    repair: repairAutoGearGlobals,
    isReferenceError: isAutoGearGlobalReferenceError
};

export const Icons = {
    createFontKeys: createFallbackIconFontKeys,
    formatCoordinate: formatSvgCoordinate,
    positionMarkup: positionSvgMarkup,
    resolveGlyph: resolveIconGlyph,
    applyGlyph: applyIconGlyph
};

export const Connectors = {
    createFallbackSummary: createFallbackSafeGenerateConnectorSummary,
    generateSummary: generateSafeConnectorSummary
};

/**
 * Creates a lightweight runtime state fallback wrapper around candidate scopes.
 * Useful for embedded environments where direct usage of `window` might be unsafe.
 * @param {object[]} candidateScopes - The scopes to wrap.
 * @returns {object} The local runtime state fallback API.
 */
export function createLocalRuntimeStateFallback(candidateScopes) {
    var scopes = [];
    var seenScopes = typeof Set === 'function' ? new Set() : null;

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

    if (Array.isArray(candidateScopes)) {
        for (var initialIndex = 0; initialIndex < candidateScopes.length; initialIndex += 1) {
            try {
                registerScope(candidateScopes[initialIndex]);
            } catch (initialiseScopeError) {
                void initialiseScopeError;
            }
        }
    }

    return Object.freeze({
        getScopes: function getScopes() {
            return scopes.slice();
        },
        getPrimaryScope: function getPrimaryScope() {
            return scopes.length > 0 ? scopes[0] : null;
        },
        ensureValue: function ensureValue(name, fallbackValue) {
            var fallbackProvider =
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

            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
                var scope = scopes[scopeIndex];
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
        },
        normaliseValue: function normaliseValue(name, validator, fallbackValue) {
            var fallbackProvider =
                typeof fallbackValue === 'function'
                    ? fallbackValue
                    : function provideStaticFallback() {
                        return fallbackValue;
                    };

            for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
                var scope = scopes[scopeIndex];
                if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
                    continue;
                }

                try {
                    if (!validator(scope[name])) {
                        scope[name] = fallbackProvider();
                    }
                } catch (normaliseError) {
                    void normaliseError;
                }
            }
        }
    });
}

// Re-export individually for convenience if needed, or prefer the namespaces
export {
    // Scope
    detectGlobalScope,
    collectCandidateScopes,
    // Frozen
    createFreezeRegistry,
    freezeRegistryHas,
    freezeRegistryAdd,
    // Global
    readGlobalScopeValue,
    writeGlobalScopeValue,
    ensureGlobalFallback,
    normaliseGlobalValue,
    // Auto Gear
    ensureAutoGearGlobal,
    repairAutoGearGlobals,
    // Icons
    createFallbackIconFontKeys,
    applyIconGlyph,
    // Connectors
    createFallbackSafeGenerateConnectorSummary
};
