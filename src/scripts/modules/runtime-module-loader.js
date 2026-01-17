/**
 * Cine Power Planner Runtime Module Loader
 * 
 * Pure ESM module for resolving runtime dependencies across scopes.
 * Extracted from core/modules/core/runtime-module-loader.js during Vite migration.
 */

function isScope(candidate) {
    return !!candidate && (typeof candidate === 'object' || typeof candidate === 'function');
}

export function createFallbackLoader() {
    const HAS = Object.prototype.hasOwnProperty;

    function collectCandidateScopes(options) {
        const scopes = [];

        function register(scope) {
            if (!isScope(scope)) {
                return;
            }

            if (scopes.indexOf(scope) === -1) {
                scopes.push(scope);
            }
        }

        const primaryScope = options && options.primaryScope;
        const additionalScopes = options && options.candidateScopes;

        register(primaryScope);

        if (Array.isArray(additionalScopes)) {
            for (let index = 0; index < additionalScopes.length; index += 1) {
                register(additionalScopes[index]);
            }
        }

        if (typeof globalThis !== 'undefined') {
            register(globalThis);
        }

        if (typeof window !== 'undefined') {
            register(window);
        }

        if (typeof self !== 'undefined') {
            register(self);
        }

        if (typeof global !== 'undefined') {
            register(global);
        }

        return scopes;
    }

    function readRuntimeNamespaceFromScope(scope) {
        if (!isScope(scope)) {
            return null;
        }

        try {
            const namespace = scope.cineCoreRuntimeModules;
            return namespace && typeof namespace === 'object' ? namespace : null;
        } catch (scopeLookupError) {
            void scopeLookupError;
        }

        return null;
    }

    // NOTE: Stubbed out require logic for ESM environment
    function tryRequireRuntimeNamespace() {
        return null;
    }

    function resolveCoreRuntimeModulesNamespace(options) {
        const candidates = collectCandidateScopes(options || {});

        for (let index = 0; index < candidates.length; index += 1) {
            const namespace = readRuntimeNamespaceFromScope(candidates[index]);
            if (namespace) {
                return namespace;
            }
        }

        return tryRequireRuntimeNamespace();
    }

    function resolveCoreRuntimeModule(moduleId, options) {
        if (typeof moduleId !== 'string' || !moduleId) {
            return null;
        }

        const namespace = resolveCoreRuntimeModulesNamespace(options || {});
        if (!namespace || typeof namespace !== 'object') {
            return null;
        }

        if (HAS.call(namespace, moduleId)) {
            return namespace[moduleId];
        }

        return null;
    }

    return {
        resolveCoreRuntimeModulesNamespace,
        resolveCoreRuntimeModule,
    };
}

export const cineCoreRuntimeModuleLoader = (() => {
    // In ESM we don't have automagic global availability of this instance usually,
    // but we can check if it was already shimmed globally.
    if (typeof window !== 'undefined' && window.cineCoreRuntimeModuleLoader) {
        return window.cineCoreRuntimeModuleLoader;
    }
    return createFallbackLoader();
})();
