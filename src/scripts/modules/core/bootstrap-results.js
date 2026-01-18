import {
    cineCoreAppCoreBootstrapEnvironment
} from './bootstrap-environment.js';

const {
    isObject,
    ensureArray,
    ensureRequireFn
} = cineCoreAppCoreBootstrapEnvironment;

// --- Helpers ---

function registerScope(scopes, scope) {
    if (!scope || !isObject(scope)) {
        return;
    }

    if (Array.isArray(scopes) && scopes.indexOf(scope) === -1) {
        scopes.push(scope);
    }
}

function attemptFactory(factory, factoryOptions) {
    if (typeof factory !== 'function') {
        return null;
    }

    try {
        const result = factory(factoryOptions);
        return result && typeof result === 'object' ? result : null;
    } catch (error) {
        void error;
    }

    return null;
}

// --- Results Logic ---

function collectResultsFallbackScopes(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopesInput = options ? options.fallbackScopes : null;

    if (options && typeof options.collectFallbackScopes === 'function') {
        try {
            const collected = options.collectFallbackScopes(fallbackScopesInput);

            if (Array.isArray(collected)) {
                const list = ensureArray(collected);
                registerScope(list, runtimeScope);
                registerScope(list, coreGlobalScope);
                registerScope(list, typeof globalThis !== 'undefined' ? globalThis : null);
                registerScope(list, typeof window !== 'undefined' ? window : null);
                registerScope(list, typeof self !== 'undefined' ? self : null);
                registerScope(list, typeof global !== 'undefined' ? global : null);
                return list;
            }
        } catch (collectorError) {
            void collectorError;
        }
    }

    const fallbackScopes = ensureArray(fallbackScopesInput);
    registerScope(fallbackScopes, runtimeScope);
    registerScope(fallbackScopes, coreGlobalScope);
    registerScope(fallbackScopes, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(fallbackScopes, typeof window !== 'undefined' ? window : null);
    registerScope(fallbackScopes, typeof self !== 'undefined' ? self : null);
    registerScope(fallbackScopes, typeof global !== 'undefined' ? global : null);
    return fallbackScopes;
}

function createLocalizationFallbackSkeleton() {
    return {
        localizationSupport: null,
        localizationRuntimeEnvironment: null,
        localizationBridge: null,
        localizationFallbacks: null,
        inlineLocalizationFallbacks: null,
        localizationFallbackSupport: null,
        createBasicLocalizationFallbackResolvers() {
            return null;
        },
        localizationFallbackRegistry: {
            createFallbackResolvers() {
                return null;
            },
        },
        localizationFallbackResolvers: null,
        localizationFallbackNamespace: null,
        fallbackResolveLocaleModule() {
            return null;
        },
        createLocaleFallbacks() {
            return null;
        },
    };
}

function createRuntimeSharedFallbackSkeleton(options) {
    const fallbackScopes = collectResultsFallbackScopes(options || null);
    const currentRuntimeShared =
        options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null;

    function fallbackResolveRuntimeSharedFromGlobal() {
        for (let index = 0; index < fallbackScopes.length; index += 1) {
            const scope = fallbackScopes[index];

            if (!isObject(scope)) {
                continue;
            }

            try {
                const candidate = scope.cineCoreRuntimeShared;
                if (candidate && typeof candidate === 'object') {
                    return candidate;
                }
            } catch (lookupError) {
                void lookupError;
            }
        }

        return null;
    }

    let runtimeShared = currentRuntimeShared;

    if (!runtimeShared || typeof runtimeShared !== 'object') {
        runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || typeof runtimeShared !== 'object') {
        try {
            runtimeShared = Object.create(null);
        } catch (creationError) {
            void creationError;
            runtimeShared = {};
        }
    }

    return {
        runtimeSharedNamespace: null,
        runtimeSharedResolver: null,
        existingRuntimeShared: runtimeShared,
        runtimeShared,
        fallbackResolveRuntimeSharedFromGlobal,
    };
}

function resolveBootstrapResultsTools(options) {
    const resolverOptions = options && typeof options === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};

    if (!resolverOptions.directNamespace && options && isObject(options.directBootstrapResultsNamespace)) {
        resolverOptions.directNamespace = options.directBootstrapResultsNamespace;
    }

    return cineCoreAppCoreBootstrapEnvironment.resolveNamespace(
        'cineCoreAppCoreBootstrapResults',
        './modules/app-core/bootstrap.js',
        resolverOptions
    );
}

function getBootstrapResultsTools(options) {
    if (options && isObject(options.bootstrapResultsTools)) {
        return options.bootstrapResultsTools;
    }

    if (options && isObject(options.resultsTools)) {
        return options.resultsTools;
    }

    return resolveBootstrapResultsTools(options);
}

function resolveLocalizationBootstrapResult(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectResultsFallbackScopes({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes: options && options.fallbackScopes,
        collectFallbackScopes: options && options.collectFallbackScopes,
    });
    const requireFn = ensureRequireFn(options && options.requireFn);
    const resolveCoreSupportModule =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;

    const bootstrapOptions = {
        localizationSupportTools: options && isObject(options.localizationSupportTools) ?
            options.localizationSupportTools :
            null,
        localizationBootstrapTools: options && isObject(options.localizationBootstrapTools) ?
            options.localizationBootstrapTools :
            null,
        localizationRuntimeTools: options && isObject(options.localizationRuntimeTools) ?
            options.localizationRuntimeTools :
            null,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
        currentLocalization: options && isObject(options.currentLocalization) ? options.currentLocalization : null,
    };

    const bootstrapTools =
        options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    let result = attemptFactory(
        bootstrapTools && bootstrapTools.createLocalizationBootstrapResult,
        bootstrapOptions
    );

    if (!result) {
        result = attemptFactory(
            bootstrapTools && bootstrapTools.createLocalizationBootstrapFallback,
            bootstrapOptions
        );
    }

    if (!result) {
        const inlineFactory =
            options && typeof options.createInlineLocalizationFallback === 'function' ?
                options.createInlineLocalizationFallback :
                null;

        result = attemptFactory(inlineFactory, {
            fallbackTools: options && isObject(options.bootstrapFallbackTools) ?
                options.bootstrapFallbackTools :
                null,
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
            fallbackScopes,
            localizationFallbackOptions: options && options.localizationFallbackOptions ?
                options.localizationFallbackOptions :
                null,
        });
    }

    if (!result) {
        result = createLocalizationFallbackSkeleton();
    }

    return result;
}

function resolveRuntimeSharedBootstrapResult(options) {
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope = options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = collectResultsFallbackScopes({
        runtimeScope,
        coreGlobalScope,
        fallbackScopes: options && options.fallbackScopes,
        collectFallbackScopes: options && options.collectFallbackScopes,
    });
    const requireFn = ensureRequireFn(options && options.requireFn);
    const resolveCoreSupportModule =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;

    const bootstrapOptions = {
        runtimeSharedBootstrapResolverTools: options && isObject(options.runtimeSharedBootstrapResolverTools) ?
            options.runtimeSharedBootstrapResolverTools :
            null,
        runtimeSharedBootstrapTools: options && isObject(options.runtimeSharedBootstrapTools) ?
            options.runtimeSharedBootstrapTools :
            null,
        runtimeSharedNamespaceTools: options && isObject(options.runtimeSharedNamespaceTools) ?
            options.runtimeSharedNamespaceTools :
            null,
        runtimeSharedBootstrapInlineTools: options && isObject(options.runtimeSharedBootstrapInlineTools) ?
            options.runtimeSharedBootstrapInlineTools :
            null,
        runtimeSharedBootstrapResultTools: options && isObject(options.runtimeSharedBootstrapResultTools) ?
            options.runtimeSharedBootstrapResultTools :
            null,
        runtimeSharedBootstrapLoaderTools: options && isObject(options.runtimeSharedBootstrapLoaderTools) ?
            options.runtimeSharedBootstrapLoaderTools :
            null,
        runtimeSharedBootstrapManagerTools: options && isObject(options.runtimeSharedBootstrapManagerTools) ?
            options.runtimeSharedBootstrapManagerTools :
            null,
        resolveCoreSupportModule,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        currentRuntimeShared: options && isObject(options.currentRuntimeShared) ? options.currentRuntimeShared : null,
        fallbackScopes,
        runtimeSharedBootstrapInlineRequirePath: options && options.runtimeSharedBootstrapInlineRequirePath ?
            options.runtimeSharedBootstrapInlineRequirePath :
            null,
        runtimeSharedBootstrapResultRequirePath: options && options.runtimeSharedBootstrapResultRequirePath ?
            options.runtimeSharedBootstrapResultRequirePath :
            null,
    };

    const bootstrapTools =
        options && isObject(options.bootstrapTools) ? options.bootstrapTools : null;

    let result = attemptFactory(
        bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapResult,
        bootstrapOptions
    );

    if (!result) {
        result = attemptFactory(
            bootstrapTools && bootstrapTools.createRuntimeSharedBootstrapFallback,
            bootstrapOptions
        );
    }

    if (!result) {
        const inlineFactory =
            options && typeof options.createInlineRuntimeSharedFallback === 'function' ?
                options.createInlineRuntimeSharedFallback :
                null;

        result = attemptFactory(inlineFactory, {
            fallbackTools: options && isObject(options.bootstrapFallbackTools) ?
                options.bootstrapFallbackTools :
                null,
            resolveCoreSupportModule,
            requireFn,
            runtimeScope,
            coreGlobalScope,
            fallbackScopes,
            currentRuntimeShared: options && isObject(options.currentRuntimeShared) ?
                options.currentRuntimeShared :
                null,
        });
    }

    if (!result) {
        result = createRuntimeSharedFallbackSkeleton({
            runtimeScope,
            coreGlobalScope,
            fallbackScopes,
            currentRuntimeShared: options && isObject(options.currentRuntimeShared) ?
                options.currentRuntimeShared :
                null,
        });
    }

    return result;
}

export const cineCoreAppCoreBootstrapResults = {
    resolveLocalizationBootstrapResult,
    resolveRuntimeSharedBootstrapResult,
    collectBootstrapFallbackScopes: function (options) {
        return collectResultsFallbackScopes(options || null);
    },
    createLocalizationFallbackSkeleton,
    createRuntimeSharedFallbackSkeleton,
    resolveBootstrapResultsTools,
    getBootstrapResultsTools,
    attemptFactory
};
