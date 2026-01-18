

// --- Core Helpers ---

function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
}

function ensureRequireFn(candidate) {
    if (typeof candidate === 'function') {
        return candidate;
    }
    if (typeof require === 'function') {
        return require;
    }
    return null;
}

function ensureArray(value) {
    return Array.isArray(value) ? value.slice() : [];
}

// --- Bootstrap Environment Logic ---

function normalizeBootstrapInvocationOptions(baseOrOverrides, overrides) {
    const hasOverrides = arguments.length > 1;
    const baseSource = hasOverrides ? baseOrOverrides : null;
    const overrideSource = hasOverrides ? overrides : baseOrOverrides;

    const normalized = {};

    if (baseSource && isObject(baseSource) && !Array.isArray(baseSource)) {
        const baseKeys = Object.keys(baseSource);
        for (let index = 0; index < baseKeys.length; index += 1) {
            const key = baseKeys[index];
            normalized[key] = baseSource[key];
        }
    }

    normalized.resolveCoreSupportModule =
        typeof normalized.resolveCoreSupportModule === 'function' ?
            normalized.resolveCoreSupportModule :
            null;
    normalized.requireFn = ensureRequireFn(normalized.requireFn);
    normalized.runtimeScope = normalized.runtimeScope && isObject(normalized.runtimeScope) ?
        normalized.runtimeScope :
        null;
    normalized.coreGlobalScope = normalized.coreGlobalScope && isObject(normalized.coreGlobalScope) ?
        normalized.coreGlobalScope :
        null;
    normalized.fallbackScopes = ensureArray(normalized.fallbackScopes);

    function applyOverrides(source) {
        if (!source) {
            return;
        }

        if (Array.isArray(source)) {
            normalized.fallbackScopes = source.slice();
            return;
        }

        if (!isObject(source)) {
            return;
        }

        if (Array.isArray(source.fallbackScopes)) {
            normalized.fallbackScopes = source.fallbackScopes.slice();
        } else if (source.fallbackScopes) {
            normalized.fallbackScopes = [source.fallbackScopes];
        }

        if (source.runtimeScope && isObject(source.runtimeScope)) {
            normalized.runtimeScope = source.runtimeScope;
        }

        if (source.coreGlobalScope && isObject(source.coreGlobalScope)) {
            normalized.coreGlobalScope = source.coreGlobalScope;
        }

        if (typeof source.requireFn === 'function') {
            normalized.requireFn = source.requireFn;
        } else if (Object.prototype.hasOwnProperty.call(source, 'requireFn')) {
            normalized.requireFn = ensureRequireFn(source.requireFn);
        }

        if (typeof source.resolveCoreSupportModule === 'function') {
            normalized.resolveCoreSupportModule = source.resolveCoreSupportModule;
        } else if (Object.prototype.hasOwnProperty.call(source, 'resolveCoreSupportModule')) {
            normalized.resolveCoreSupportModule = null;
        }

        const keys = Object.keys(source);
        for (let index = 0; index < keys.length; index += 1) {
            const key = keys[index];

            if (
                key === 'fallbackScopes' ||
                key === 'runtimeScope' ||
                key === 'coreGlobalScope' ||
                key === 'requireFn' ||
                key === 'resolveCoreSupportModule'
            ) {
                continue;
            }

            normalized[key] = source[key];
        }
    }

    applyOverrides(overrideSource);

    normalized.requireFn = ensureRequireFn(normalized.requireFn);
    normalized.fallbackScopes = ensureArray(normalized.fallbackScopes);

    return normalized;
}

function appendFallbackScopes(scopes, runtimeScope, coreGlobalScope) {
    if (!Array.isArray(scopes)) {
        return [];
    }

    const list = scopes.slice();

    if (runtimeScope && isObject(runtimeScope) && list.indexOf(runtimeScope) === -1) {
        list.push(runtimeScope);
    }

    if (coreGlobalScope && isObject(coreGlobalScope) && list.indexOf(coreGlobalScope) === -1) {
        list.push(coreGlobalScope);
    }

    const globalCandidates = [
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < globalCandidates.length; index += 1) {
        const scope = globalCandidates[index];
        if (!scope || !isObject(scope)) {
            continue;
        }
        if (list.indexOf(scope) === -1) {
            list.push(scope);
        }
    }

    return list;
}

function collectBootstrapFallbackScopes(options) {
    const invocationOptions = normalizeBootstrapInvocationOptions(options);
    const runtimeScope = invocationOptions.runtimeScope;
    const coreGlobalScope = invocationOptions.coreGlobalScope;
    const fallbackScopeList = ensureArray(invocationOptions.fallbackScopes);
    const bootstrapEnvironmentTools =
        invocationOptions.bootstrapEnvironmentTools ||
        invocationOptions.bootstrapEnvironment ||
        (!invocationOptions._isResolvingEnvironment ? getBootstrapEnvironmentTools(invocationOptions) : null);
    const bootstrapResultsTools =
        invocationOptions.bootstrapResultsTools ||
        (options && options.getBootstrapResultsTools ? options.getBootstrapResultsTools(invocationOptions) : null);

    if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.collectBootstrapFallbackScopes === 'function'
    ) {
        const collectAdditionalFallbackScopes =
            bootstrapEnvironmentTools &&
                typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function' ?
                function collectAdditionalFallbackScopes(scopes) {
                    try {
                        const collected = bootstrapEnvironmentTools.collectFallbackScopes({
                            fallbackScopes: Array.isArray(scopes) ? scopes : ensureArray(scopes),
                            runtimeScope,
                            coreGlobalScope,
                        });

                        if (Array.isArray(collected)) {
                            return collected;
                        }
                    } catch (environmentCollectError) {
                        void environmentCollectError;
                    }

                    if (Array.isArray(scopes)) {
                        try {
                            const legacyCollected = bootstrapEnvironmentTools.collectFallbackScopes(scopes);

                            if (Array.isArray(legacyCollected)) {
                                return legacyCollected;
                            }
                        } catch (legacyEnvironmentCollectError) {
                            void legacyEnvironmentCollectError;
                        }
                    }

                    return null;
                } :
                null;

        try {
            const collected = bootstrapResultsTools.collectBootstrapFallbackScopes({
                fallbackScopes: fallbackScopeList,
                runtimeScope,
                coreGlobalScope,
                collectFallbackScopes: collectAdditionalFallbackScopes,
            });

            if (Array.isArray(collected)) {
                return collected;
            }
        } catch (resultsCollectError) {
            void resultsCollectError;
        }
    }

    if (
        bootstrapEnvironmentTools &&
        typeof bootstrapEnvironmentTools.collectFallbackScopes === 'function'
    ) {
        try {
            const environmentCollected = bootstrapEnvironmentTools.collectFallbackScopes({
                fallbackScopes: fallbackScopeList,
                runtimeScope,
                coreGlobalScope,
            });

            if (Array.isArray(environmentCollected)) {
                return environmentCollected;
            }
        } catch (environmentCollectError) {
            void environmentCollectError;
        }

        if (Array.isArray(fallbackScopeList)) {
            try {
                const legacyEnvironmentCollected =
                    bootstrapEnvironmentTools.collectFallbackScopes(fallbackScopeList);

                if (Array.isArray(legacyEnvironmentCollected)) {
                    return legacyEnvironmentCollected;
                }
            } catch (legacyEnvironmentCollectError) {
                void legacyEnvironmentCollectError;
            }
        }
    }

    return appendFallbackScopes(fallbackScopeList, runtimeScope, coreGlobalScope);
}

function resolveNamespace(namespaceName, requirePath, options) {
    const directNamespace =
        options && isObject(options.directNamespace) ? options.directNamespace : null;

    if (directNamespace) {
        return directNamespace;
    }

    const resolveCoreSupportModule =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;

    if (resolveCoreSupportModule) {
        try {
            const resolved = resolveCoreSupportModule(namespaceName, requirePath);
            if (resolved && isObject(resolved)) {
                return resolved;
            }
        } catch (resolveError) {
            void resolveError;
        }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function' && requirePath) {
        try {
            const required = requireFn(requirePath);
            if (required && isObject(required)) {
                return required;
            }
        } catch (requireError) {
            void requireError;
        }
    }

    const fallbackScopes = collectBootstrapFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
            continue;
        }

        try {
            const candidate = scope[namespaceName];
            if (candidate && isObject(candidate)) {
                return candidate;
            }
        } catch (lookupError) {
            void lookupError;
        }
    }

    return null;
}

function getBootstrapEnvironmentTools(options) {
    if (options && isObject(options.bootstrapEnvironmentTools)) {
        return options.bootstrapEnvironmentTools;
    }

    if (options && isObject(options.bootstrapEnvironment)) {
        return options.bootstrapEnvironment;
    }

    return resolveBootstrapEnvironmentTools(options);
}

function resolveBootstrapEnvironmentTools(options) {
    const resolverOptions = options && typeof options === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};

    if (!resolverOptions.directNamespace && options && isObject(options.directBootstrapEnvironmentNamespace)) {
        resolverOptions.directNamespace = options.directBootstrapEnvironmentNamespace;
    }

    resolverOptions._isResolvingEnvironment = true;

    return resolveNamespace(
        'cineCoreAppCoreBootstrapEnvironment',
        './modules/app-core/bootstrap.js',
        resolverOptions
    );
}

function collectEnvironmentFallbackScopes(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;

    return appendFallbackScopes(
        ensureArray(options && options.fallbackScopes),
        runtimeScope,
        coreGlobalScope
    );
}

function hasBootstrapResolverCapabilities(candidate) {
    return (
        !!candidate &&
        typeof candidate === 'object' &&
        typeof candidate.resolveBootstrapTools === 'function' &&
        typeof candidate.resolveBootstrapFallbackTools === 'function' &&
        typeof candidate.createInlineLocalizationFallback === 'function' &&
        typeof candidate.createInlineRuntimeSharedFallback === 'function'
    );
}

function resolveBootstrapResolverTools(options) {
    const directResolverNamespace =
        options && isObject(options.directResolverNamespace) ?
            options.directResolverNamespace :
            null;

    if (hasBootstrapResolverCapabilities(directResolverNamespace)) {
        return directResolverNamespace;
    }

    const resolverOptions = {
        resolveCoreSupportModule: options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null,
        requireFn: ensureRequireFn(options && options.requireFn),
        runtimeScope: options && isObject(options.runtimeScope) ? options.runtimeScope : null,
        coreGlobalScope: options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null,
        fallbackScopes: ensureArray(options && options.fallbackScopes),
    };

    const resolvedNamespace = resolveNamespace(
        'cineCoreAppCoreBootstrapResolver',
        './modules/app-core/bootstrap.js',
        Object.assign({}, resolverOptions, {
            directNamespace: directResolverNamespace
        })
    );

    if (hasBootstrapResolverCapabilities(resolvedNamespace)) {
        return resolvedNamespace;
    }

    if (
        resolvedNamespace &&
        isObject(resolvedNamespace.cineCoreAppCoreBootstrapResolver) &&
        hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrapResolver)
    ) {
        return resolvedNamespace.cineCoreAppCoreBootstrapResolver;
    }

    if (
        resolvedNamespace &&
        isObject(resolvedNamespace.cineCoreAppCoreBootstrap) &&
        hasBootstrapResolverCapabilities(resolvedNamespace.cineCoreAppCoreBootstrap)
    ) {
        return resolvedNamespace.cineCoreAppCoreBootstrap;
    }

    const fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
            continue;
        }

        try {
            const resolverCandidate = scope.cineCoreAppCoreBootstrapResolver;

            if (hasBootstrapResolverCapabilities(resolverCandidate)) {
                return resolverCandidate;
            }

            const bootstrapCandidate = scope.cineCoreAppCoreBootstrap;

            if (hasBootstrapResolverCapabilities(bootstrapCandidate)) {
                return bootstrapCandidate;
            }
        } catch (resolverLookupError) {
            void resolverLookupError;
        }
    }

    return null;
}

// --- Bootstrap Environment Functionality ---

function createBootstrapEnvironment(options) {
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
        options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectEnvironmentFallbackScopes({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes: options && options.fallbackScopes,
    });

    const resolverTools = resolveBootstrapResolverTools({
        directResolverNamespace: options && options.directResolverNamespace,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
    });

    // NOTE: resolveBootstrapToolsWithResolver and resolveBootstrapFallbackToolsWithResolver
    // are circular dependencies if defined here directly.
    // They are primarily used in the full suite or by the legacy system.
    // In this module, we export them, but they might need to be passed in or resolved dynamically.
    // For now we will include the implementation but note that they interact with other parts.

    return {
        fallbackScopes,
        bootstrapResolverTools: resolverTools,
        // Detailed implementations of tools creation moved to main bootstrap orchestrator
        // or handled via callback to avoid cyclic dependency on 'resolveBootstrapTools' etc.
    };
}

export const cineCoreAppCoreBootstrapEnvironment = {
    createBootstrapEnvironment,
    resolveBootstrapResolverTools,
    resolveBootstrapEnvironmentTools,
    collectFallbackScopes: collectEnvironmentFallbackScopes,
    normalizeBootstrapInvocationOptions,
    collectBootstrapFallbackScopes,
    resolveNamespace,
    ensureRequireFn,
    ensureArray,
    isObject,
    appendFallbackScopes,
    hasBootstrapResolverCapabilities,
    getBootstrapEnvironmentTools
};
