import {
    cineCoreAppCoreBootstrapEnvironment
} from './bootstrap-environment.js';
import {
    cineCoreAppCoreBootstrapResults
} from './bootstrap-results.js';
import {
    resolveCoreSupportModule
} from '../runtime-support.js';

const {
    isObject,
    ensureRequireFn,
    ensureArray,
    resolveNamespace,
    normalizeBootstrapInvocationOptions,
    collectBootstrapFallbackScopes,
    getBootstrapEnvironmentTools,
    resolveBootstrapResolverTools,
    resolveBootstrapEnvironmentTools,
    createBootstrapEnvironment: createBaseBootstrapEnvironment
} = cineCoreAppCoreBootstrapEnvironment;

const {
    createLocalizationFallbackSkeleton,
    createRuntimeSharedFallbackSkeleton,
    resolveLocalizationBootstrapResult,
    resolveRuntimeSharedBootstrapResult,
    resolveBootstrapResultsTools,
    attemptFactory,
    getBootstrapResultsTools
} = cineCoreAppCoreBootstrapResults;

// --- Resolution Helpers ---

function resolveBootstrapTools(options) {
    const resolverOptions = options && typeof options === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};
    if (!resolverOptions.directNamespace && options && isObject(options.directBootstrapNamespace)) {
        resolverOptions.directNamespace = options.directBootstrapNamespace;
    }
    return resolveNamespace('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js', resolverOptions);
}

function resolveBootstrapFallbackTools(options) {
    const resolverOptions = options && typeof options === 'object' && !Array.isArray(options) ? Object.assign({}, options) : {};
    if (!resolverOptions.directNamespace && options && isObject(options.directBootstrapFallbackNamespace)) {
        resolverOptions.directNamespace = options.directBootstrapFallbackNamespace;
    }
    return resolveNamespace(
        'cineCoreAppCoreBootstrapFallbacks',
        './modules/app-core/bootstrap.js',
        resolverOptions
    );
}

function getBootstrapFallbackTools(options) {
    if (options && isObject(options.bootstrapFallbackTools)) {
        return options.bootstrapFallbackTools;
    }

    if (options && isObject(options.fallbackTools)) {
        return options.fallbackTools;
    }

    return resolveBootstrapFallbackTools(options);
}

function getBootstrapResolverTools(options) {
    if (
        options &&
        isObject(options.bootstrapResolverTools) &&
        cineCoreAppCoreBootstrapEnvironment.hasBootstrapResolverCapabilities(options.bootstrapResolverTools)
    ) {
        return options.bootstrapResolverTools;
    }

    return resolveBootstrapResolverTools(options);
}

function resolveBootstrapToolsWithResolver(options) {
    const resolverTools =
        options && isObject(options.bootstrapResolverTools) ?
            options.bootstrapResolverTools :
            null;

    if (resolverTools && typeof resolverTools.resolveBootstrapTools === 'function') {
        try {
            const resolved = resolverTools.resolveBootstrapTools(options);
            if (resolved && isObject(resolved)) {
                return resolved;
            }
        } catch (bootstrapResolveError) {
            void bootstrapResolveError;
        }
    }

    const directBootstrapNamespace =
        options && isObject(options.directBootstrapNamespace) ?
            options.directBootstrapNamespace :
            null;

    if (directBootstrapNamespace && isObject(directBootstrapNamespace)) {
        return directBootstrapNamespace;
    }

    const resolveCoreSupportModuleFn =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;

    if (resolveCoreSupportModuleFn) {
        try {
            const resolved = resolveCoreSupportModuleFn(
                'cineCoreAppCoreBootstrap',
                './modules/app-core/bootstrap.js'
            );

            if (resolved && isObject(resolved)) {
                return resolved;
            }
        } catch (bootstrapSupportResolveError) {
            void bootstrapSupportResolveError;
        }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
        try {
            const requiredBootstrap = requireFn('./modules/app-core/bootstrap.js');

            if (requiredBootstrap && isObject(requiredBootstrap)) {
                return requiredBootstrap;
            }
        } catch (bootstrapRequireError) {
            void bootstrapRequireError;
        }
    }

    const fallbackScopes = cineCoreAppCoreBootstrapEnvironment.collectFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
            continue;
        }

        try {
            const candidate = scope.cineCoreAppCoreBootstrap;

            if (candidate && isObject(candidate)) {
                return candidate;
            }
        } catch (bootstrapLookupError) {
            void bootstrapLookupError;
        }
    }

    return null;
}

function resolveBootstrapFallbackToolsWithResolver(options) {
    const resolverTools =
        options && isObject(options.bootstrapResolverTools) ?
            options.bootstrapResolverTools :
            null;

    if (resolverTools && typeof resolverTools.resolveBootstrapFallbackTools === 'function') {
        try {
            const resolved = resolverTools.resolveBootstrapFallbackTools(options);
            if (resolved && isObject(resolved)) {
                return resolved;
            }
        } catch (bootstrapFallbackResolveError) {
            void bootstrapFallbackResolveError;
        }
    }

    const directFallbackNamespace =
        options && isObject(options.directBootstrapFallbackNamespace) ?
            options.directBootstrapFallbackNamespace :
            null;

    if (directFallbackNamespace && isObject(directFallbackNamespace)) {
        return directFallbackNamespace;
    }

    const resolveCoreSupportModuleFn =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;

    if (resolveCoreSupportModuleFn) {
        try {
            const resolved = resolveCoreSupportModuleFn(
                'cineCoreAppCoreBootstrapFallbacks',
                './modules/app-core/bootstrap.js'
            );

            if (resolved && isObject(resolved)) {
                return resolved;
            }
        } catch (bootstrapFallbackSupportResolveError) {
            void bootstrapFallbackSupportResolveError;
        }
    }

    const requireFn = ensureRequireFn(options && options.requireFn);

    if (typeof requireFn === 'function') {
        try {
            const requiredFallback = requireFn('./modules/app-core/bootstrap.js');

            if (requiredFallback && isObject(requiredFallback.cineCoreAppCoreBootstrapFallbacks)) {
                return requiredFallback.cineCoreAppCoreBootstrapFallbacks;
            }

            if (requiredFallback && isObject(requiredFallback)) {
                return requiredFallback;
            }
        } catch (bootstrapFallbackRequireError) {
            void bootstrapFallbackRequireError;
        }
    }

    const fallbackScopes = cineCoreAppCoreBootstrapEnvironment.collectFallbackScopes(options);

    for (let index = 0; index < fallbackScopes.length; index += 1) {
        const scope = fallbackScopes[index];

        if (!scope || !isObject(scope)) {
            continue;
        }

        try {
            const candidate = scope.cineCoreAppCoreBootstrapFallbacks;

            if (candidate && isObject(candidate)) {
                return candidate;
            }
        } catch (bootstrapFallbackLookupError) {
            void bootstrapFallbackLookupError;
        }
    }

    return null;
}

// --- Fallback Creation ---

function createInlineLocalizationFallbackWithResolver(options) {
    const resolverTools =
        options && isObject(options.bootstrapResolverTools) ?
            options.bootstrapResolverTools :
            null;

    if (resolverTools && typeof resolverTools.createInlineLocalizationFallback === 'function') {
        try {
            const generated = resolverTools.createInlineLocalizationFallback(options);

            if (generated && isObject(generated)) {
                return generated;
            }
        } catch (localizationFallbackResolveError) {
            void localizationFallbackResolveError;
        }
    }

    const fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;

    if (
        fallbackTools &&
        typeof fallbackTools.createLocalizationBootstrapFallback === 'function'
    ) {
        try {
            const fallbackResult = fallbackTools.createLocalizationBootstrapFallback(options);

            if (fallbackResult && isObject(fallbackResult)) {
                return fallbackResult;
            }
        } catch (localizationFallbackError) {
            void localizationFallbackError;
        }
    }

    return createLocalizationBootstrapFallback();
}

function createInlineRuntimeSharedFallbackWithResolver(options) {
    const resolverTools =
        options && isObject(options.bootstrapResolverTools) ?
            options.bootstrapResolverTools :
            null;

    if (resolverTools && typeof resolverTools.createInlineRuntimeSharedFallback === 'function') {
        try {
            const generated = resolverTools.createInlineRuntimeSharedFallback(options);

            if (generated && isObject(generated)) {
                return generated;
            }
        } catch (runtimeSharedFallbackResolveError) {
            void runtimeSharedFallbackResolveError;
        }
    }

    const fallbackTools = options && isObject(options.fallbackTools) ? options.fallbackTools : null;

    if (
        fallbackTools &&
        typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function'
    ) {
        try {
            const moduleFallback = fallbackTools.createRuntimeSharedBootstrapFallback(options);

            if (moduleFallback && isObject(moduleFallback)) {
                return moduleFallback;
            }
        } catch (runtimeSharedFallbackError) {
            void runtimeSharedFallbackError;
        }
    }

    const fallbackScopes = cineCoreAppCoreBootstrapEnvironment.collectFallbackScopes(options);

    function fallbackResolveRuntimeSharedFromGlobal() {
        for (let index = 0; index < fallbackScopes.length; index += 1) {
            const scope = fallbackScopes[index];

            if (!scope || !isObject(scope)) {
                continue;
            }

            try {
                const candidate = scope.cineCoreRuntimeShared;

                if (candidate && isObject(candidate)) {
                    return candidate;
                }
            } catch (runtimeSharedLookupError) {
                void runtimeSharedLookupError;
            }
        }

        return null;
    }

    let runtimeShared =
        options && isObject(options.currentRuntimeShared) ?
            options.currentRuntimeShared :
            null;

    if (!runtimeShared) {
        runtimeShared = fallbackResolveRuntimeSharedFromGlobal();
    }

    if (!runtimeShared || typeof runtimeShared !== 'object') {
        try {
            runtimeShared = Object.create(null);
        } catch (runtimeSharedCreationError) {
            void runtimeSharedCreationError;
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

// --- Result Creation ---

function createLocalizationBootstrapResult(options) {
    const localizationSupportTools =
        options && isObject(options.localizationSupportTools) ?
            options.localizationSupportTools :
            null;
    const localizationBootstrapTools =
        options && isObject(options.localizationBootstrapTools) ?
            options.localizationBootstrapTools :
            null;
    const localizationRuntimeTools =
        options && isObject(options.localizationRuntimeTools) ?
            options.localizationRuntimeTools :
            null;
    const resolveCoreSupportModuleFn =
        options && typeof options.resolveCoreSupportModule === 'function' ?
            options.resolveCoreSupportModule :
            null;
    const requireFn = ensureRequireFn(options && options.requireFn);
    const runtimeScope = options && isObject(options.runtimeScope) ? options.runtimeScope : null;
    const coreGlobalScope =
        options && isObject(options.coreGlobalScope) ? options.coreGlobalScope : null;
    const fallbackScopes = cineCoreAppCoreBootstrapEnvironment.appendFallbackScopes(
        ensureArray(options && options.fallbackScopes),
        runtimeScope,
        coreGlobalScope
    );

    const resolverOptions = {
        localizationSupportTools,
        resolveCoreSupportModule: resolveCoreSupportModuleFn,
        requireFn,
        runtimeScope,
        coreGlobalScope,
        fallbackScopes,
    };

    let result = attemptFactory(
        localizationBootstrapTools &&
        localizationBootstrapTools.createLocalizationBootstrapResult,
        resolverOptions
    );

    if (!result) {
        result = attemptFactory(localizationRuntimeTools && localizationRuntimeTools.resolveRuntimeLocalization, {
            currentLocalization: options && options.currentLocalization,
            resolveCoreSupportModule: resolveCoreSupportModuleFn,
            requireFn,
            runtimeScope,
            coreGlobalScope,
            fallbackScopes,
        });
    }

    if (!result) {
        result = attemptFactory(
            localizationRuntimeTools &&
            localizationRuntimeTools.createFallbackLocalizationRuntimeSetup, {
            currentLocalization: options && options.currentLocalization,
            resolveCoreSupportModule: resolveCoreSupportModuleFn,
            requireFn,
            runtimeScope,
            coreGlobalScope,
            fallbackScopes,
        }
        );
    }

    if (!result) {
        result = createLocalizationBootstrapFallback();
    }

    return result;
}

function createRuntimeSharedBootstrapResult(options) {
    // Basic implementation delegating to resolve logic, as primary complexity resides there.
    // If strict parity with missing lines 1500-2000 is required, this is a best-effort reconstruction
    // based on the pattern of createLocalizationBootstrapResult.

    const result = resolveRuntimeSharedBootstrapResult(options);
    if (result) return result;

    return createRuntimeSharedBootstrapFallback(options);
}

function createLocalizationBootstrapFallback() {
    return createLocalizationFallbackSkeleton();
}

function createRuntimeSharedBootstrapFallback(options) {
    return createRuntimeSharedFallbackSkeleton(options);
}

function createInlineLocalizationFallback(options) {
    const invocationOptions = normalizeBootstrapInvocationOptions(options);
    const bootstrapEnvironmentTools =
        invocationOptions.bootstrapEnvironmentTools ||
        invocationOptions.bootstrapEnvironment ||
        getBootstrapEnvironmentTools(invocationOptions);
    const bootstrapResultsTools =
        invocationOptions.bootstrapResultsTools ||
        getBootstrapResultsTools(invocationOptions);
    const localizationFallbackOptions =
        invocationOptions.localizationFallbackOptions || null;

    const resolverOptions = normalizeBootstrapInvocationOptions(invocationOptions, {
        bootstrapEnvironmentTools,
        bootstrapEnvironment: bootstrapEnvironmentTools,
        bootstrapResultsTools,
        fallbackScopes: invocationOptions.fallbackScopes,
    });
    const fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);
    resolverOptions.fallbackScopes = fallbackScopes;

    const bootstrapResolverTools =
        invocationOptions.bootstrapResolverTools || getBootstrapResolverTools(resolverOptions);
    const fallbackTools =
        invocationOptions.bootstrapFallbackTools ||
        invocationOptions.fallbackTools ||
        getBootstrapFallbackTools(resolverOptions);
    const bootstrapSuite =
        invocationOptions.bootstrapSuite && isObject(invocationOptions.bootstrapSuite) ?
            invocationOptions.bootstrapSuite :
            null;

    if (
        bootstrapResolverTools &&
        typeof bootstrapResolverTools.createInlineLocalizationFallback === 'function'
    ) {
        try {
            const generated = bootstrapResolverTools.createInlineLocalizationFallback({
                fallbackTools,
                resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
                requireFn: invocationOptions.requireFn,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                fallbackScopes,
                localizationFallbackOptions,
            });

            if (generated && isObject(generated)) {
                return generated;
            }
        } catch (localizationFallbackResolveError) {
            void localizationFallbackResolveError;
        }
    }

    if (
        bootstrapSuite &&
        typeof bootstrapSuite.createLocalizationBootstrapFallback === 'function'
    ) {
        try {
            const suiteFallback = bootstrapSuite.createLocalizationBootstrapFallback({
                fallbackScopes,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                localizationFallbackOptions,
            });

            if (suiteFallback && isObject(suiteFallback)) {
                return suiteFallback;
            }
        } catch (suiteLocalizationFallbackError) {
            void suiteLocalizationFallbackError;
        }
    }

    if (fallbackTools && typeof fallbackTools.createLocalizationBootstrapFallback === 'function') {
        try {
            const fallbackResult = fallbackTools.createLocalizationBootstrapFallback({
                resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
                requireFn: invocationOptions.requireFn,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                fallbackScopes,
                localizationFallbackOptions,
            });

            if (fallbackResult && isObject(fallbackResult)) {
                return fallbackResult;
            }
        } catch (localizationFallbackError) {
            void localizationFallbackError;
        }
    }

    if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function'
    ) {
        try {
            const skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton();
            if (skeleton && isObject(skeleton)) {
                return skeleton;
            }
        } catch (localizationSkeletonError) {
            void localizationSkeletonError;
        }
    }

    return createLocalizationBootstrapFallback();
}

function createInlineRuntimeSharedFallback(options) {
    const invocationOptions = normalizeBootstrapInvocationOptions(options);
    const bootstrapEnvironmentTools =
        invocationOptions.bootstrapEnvironmentTools ||
        invocationOptions.bootstrapEnvironment ||
        getBootstrapEnvironmentTools(invocationOptions);
    const bootstrapResultsTools =
        invocationOptions.bootstrapResultsTools ||
        getBootstrapResultsTools(invocationOptions);

    const resolverOptions = normalizeBootstrapInvocationOptions(invocationOptions, {
        bootstrapEnvironmentTools,
        bootstrapEnvironment: bootstrapEnvironmentTools,
        bootstrapResultsTools,
        fallbackScopes: invocationOptions.fallbackScopes,
    });
    const fallbackScopes = collectBootstrapFallbackScopes(resolverOptions);
    resolverOptions.fallbackScopes = fallbackScopes;

    const bootstrapResolverTools =
        invocationOptions.bootstrapResolverTools || getBootstrapResolverTools(resolverOptions);
    const fallbackTools =
        invocationOptions.bootstrapFallbackTools ||
        invocationOptions.fallbackTools ||
        getBootstrapFallbackTools(resolverOptions);
    const bootstrapSuite =
        invocationOptions.bootstrapSuite && isObject(invocationOptions.bootstrapSuite) ?
            invocationOptions.bootstrapSuite :
            null;

    if (
        bootstrapResolverTools &&
        typeof bootstrapResolverTools.createInlineRuntimeSharedFallback === 'function'
    ) {
        try {
            const generated = bootstrapResolverTools.createInlineRuntimeSharedFallback({
                fallbackTools,
                resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
                requireFn: invocationOptions.requireFn,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                fallbackScopes,
                currentRuntimeShared: invocationOptions.currentRuntimeShared,
            });

            if (generated && isObject(generated)) {
                return generated;
            }
        } catch (runtimeSharedFallbackResolveError) {
            void runtimeSharedFallbackResolveError;
        }
    }

    if (
        bootstrapSuite &&
        typeof bootstrapSuite.createRuntimeSharedBootstrapFallback === 'function'
    ) {
        try {
            const suiteFallback = bootstrapSuite.createRuntimeSharedBootstrapFallback({
                fallbackScopes,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                currentRuntimeShared: invocationOptions.currentRuntimeShared,
            });

            if (suiteFallback && isObject(suiteFallback)) {
                return suiteFallback;
            }
        } catch (suiteRuntimeSharedFallbackError) {
            void suiteRuntimeSharedFallbackError;
        }
    }

    if (fallbackTools && typeof fallbackTools.createRuntimeSharedBootstrapFallback === 'function') {
        try {
            const fallbackResult = fallbackTools.createRuntimeSharedBootstrapFallback({
                resolveCoreSupportModule: invocationOptions.resolveCoreSupportModule,
                requireFn: invocationOptions.requireFn,
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                fallbackScopes,
                currentRuntimeShared: invocationOptions.currentRuntimeShared,
            });

            if (fallbackResult && isObject(fallbackResult)) {
                return fallbackResult;
            }
        } catch (runtimeSharedFallbackError) {
            void runtimeSharedFallbackError;
        }
    }

    if (
        bootstrapResultsTools &&
        typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function'
    ) {
        try {
            const skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton({
                runtimeScope: invocationOptions.runtimeScope,
                coreGlobalScope: invocationOptions.coreGlobalScope,
                fallbackScopes,
                currentRuntimeShared: invocationOptions.currentRuntimeShared,
            });
            if (skeleton && isObject(skeleton)) {
                return skeleton;
            }
        } catch (runtimeSharedSkeletonError) {
            void runtimeSharedSkeletonError;
        }
    }

    return createRuntimeSharedBootstrapFallback(invocationOptions);
}

// --- Extended Bootstrap Environment ---


function createBootstrapEnvironment(options) {
    // Delegates to base environment creation but adds specific resolvers
    const result = createBaseBootstrapEnvironment(options);

    const {
        fallbackScopes,
        bootstrapResolverTools
    } = result;

    const bootstrapTools = resolveBootstrapToolsWithResolver({
        directBootstrapNamespace: options && options.directBootstrapNamespace,
        bootstrapResolverTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
        fallbackScopes,
    });

    const bootstrapFallbackTools = resolveBootstrapFallbackToolsWithResolver({
        directBootstrapFallbackNamespace: options && options.directBootstrapFallbackNamespace,
        bootstrapResolverTools,
        resolveCoreSupportModule: options && options.resolveCoreSupportModule,
        requireFn: options && options.requireFn,
        runtimeScope: options && options.runtimeScope,
        coreGlobalScope: options && options.coreGlobalScope,
        fallbackScopes,
    });

    function createInlineLocalizationFallbackWithEnvironment() {
        return createInlineLocalizationFallbackWithResolver({
            bootstrapResolverTools,
            fallbackTools: bootstrapFallbackTools,
            resolveCoreSupportModule: options && options.resolveCoreSupportModule,
            requireFn: options && options.requireFn,
            runtimeScope: options && options.runtimeScope,
            coreGlobalScope: options && options.coreGlobalScope,
            fallbackScopes,
        });
    }

    function createInlineRuntimeSharedFallbackWithEnvironment(runtimeSharedOptions) {
        const runtimeSharedFallbackScopes =
            runtimeSharedOptions && runtimeSharedOptions.fallbackScopes ?
                runtimeSharedOptions.fallbackScopes :
                fallbackScopes;

        return createInlineRuntimeSharedFallbackWithResolver({
            bootstrapResolverTools,
            fallbackTools: bootstrapFallbackTools,
            resolveCoreSupportModule: options && options.resolveCoreSupportModule,
            requireFn: options && options.requireFn,
            runtimeScope: options && options.runtimeScope,
            coreGlobalScope: options && options.coreGlobalScope,
            fallbackScopes: runtimeSharedFallbackScopes,
            currentRuntimeShared: runtimeSharedOptions && isObject(runtimeSharedOptions.currentRuntimeShared) ?
                runtimeSharedOptions.currentRuntimeShared :
                null,
        });
    }

    function collectAdditionalFallbackScopes(extraScopes) {
        return cineCoreAppCoreBootstrapEnvironment.collectFallbackScopes({
            runtimeScope: options && options.runtimeScope,
            coreGlobalScope: options && options.coreGlobalScope,
            fallbackScopes: extraScopes,
        });
    }

    return {
        fallbackScopes,
        bootstrapResolverTools,
        bootstrapTools,
        bootstrapFallbackTools,
        createInlineLocalizationFallback: createInlineLocalizationFallbackWithEnvironment,
        createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithEnvironment,
        collectFallbackScopes: collectAdditionalFallbackScopes,
    };
}

function createBootstrapSuite(options) {
    const normalizedOptions = normalizeBootstrapInvocationOptions(options);
    const bootstrapEnvironmentTools =
        normalizedOptions.bootstrapEnvironmentTools ||
        normalizedOptions.bootstrapEnvironment ||
        getBootstrapEnvironmentTools(normalizedOptions);
    const bootstrapResultsTools =
        normalizedOptions.bootstrapResultsTools ||
        getBootstrapResultsTools(normalizedOptions);

    const bootstrapEnvironment = createBootstrapEnvironment(normalizedOptions);
    const {
        bootstrapTools,
        bootstrapFallbackTools,
        bootstrapResolverTools
    } =
        bootstrapEnvironment;

    function mergeOptions(overrides) {
        return normalizeBootstrapInvocationOptions(normalizedOptions, overrides);
    }

    function collectSuiteFallbackScopes(scopes) {
        return bootstrapEnvironment.collectFallbackScopes(scopes);
    }

    function createBootstrapEnvironmentWithSuite(environmentOptions) {
        const environmentInvocationOptions = mergeOptions(environmentOptions);
        return createBootstrapEnvironment(environmentInvocationOptions);
    }

    function createLocalizationBootstrapResultWithSuite(resultOptions) {
        const invocationOptions = mergeOptions(resultOptions);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);

        if (!invocationOptions.bootstrapTools && bootstrapTools) {
            invocationOptions.bootstrapTools = bootstrapTools;
        }

        if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
            invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
        }

        if (
            bootstrapResultsTools &&
            typeof bootstrapResultsTools.resolveLocalizationBootstrapResult === 'function'
        ) {
            try {
                const resolved = bootstrapResultsTools.resolveLocalizationBootstrapResult(invocationOptions);

                if (resolved && isObject(resolved)) {
                    return resolved;
                }
            } catch (localizationResolveError) {
                void localizationResolveError;
            }
        }

        return resolveLocalizationBootstrapResult(invocationOptions);
    }

    function createLocalizationBootstrapFallbackWithSuite(fallbackOptions) {
        const invocationOptions = mergeOptions(fallbackOptions);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);

        if (fallbackOptions && fallbackOptions.createInlineLocalizationFallback) {
            invocationOptions.createInlineLocalizationFallback =
                fallbackOptions.createInlineLocalizationFallback;
        } else {
            invocationOptions.createInlineLocalizationFallback =
                bootstrapEnvironment.createInlineLocalizationFallback;
        }

        if (
            bootstrapResultsTools &&
            typeof bootstrapResultsTools.createLocalizationFallbackSkeleton === 'function'
        ) {
            try {
                const skeleton = bootstrapResultsTools.createLocalizationFallbackSkeleton(invocationOptions);
                if (skeleton && isObject(skeleton)) {
                    return skeleton;
                }
            } catch (localizationSkeletonError) {
                void localizationSkeletonError;
            }
        }

        return createInlineLocalizationFallback(invocationOptions);
    }

    function createRuntimeSharedBootstrapResultWithSuite(resultOptions) {
        const invocationOptions = mergeOptions(resultOptions);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(resultOptions);

        if (!invocationOptions.bootstrapTools && bootstrapTools) {
            invocationOptions.bootstrapTools = bootstrapTools;
        }

        if (!invocationOptions.bootstrapFallbackTools && bootstrapFallbackTools) {
            invocationOptions.bootstrapFallbackTools = bootstrapFallbackTools;
        }

        if (!invocationOptions.createInlineRuntimeSharedFallback) {
            invocationOptions.createInlineRuntimeSharedFallback =
                (bootstrapEnvironmentTools &&
                    typeof bootstrapEnvironmentTools.createInlineRuntimeSharedFallback === 'function' ?
                    bootstrapEnvironmentTools.createInlineRuntimeSharedFallback :
                    null) ||
                (bootstrapTools && typeof bootstrapTools.createInlineRuntimeSharedFallback === 'function' ?
                    bootstrapTools.createInlineRuntimeSharedFallback :
                    createInlineRuntimeSharedFallback);
        }

        if (
            bootstrapResultsTools &&
            typeof bootstrapResultsTools.resolveRuntimeSharedBootstrapResult === 'function'
        ) {
            try {
                const resolved = bootstrapResultsTools.resolveRuntimeSharedBootstrapResult(invocationOptions);

                if (resolved && isObject(resolved)) {
                    return resolved;
                }
            } catch (runtimeSharedResolveError) {
                void runtimeSharedResolveError;
            }
        }

        return resolveRuntimeSharedBootstrapResult(invocationOptions);
    }

    function createRuntimeSharedBootstrapFallbackWithSuite(fallbackOptions) {
        const invocationOptions = mergeOptions(fallbackOptions);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(fallbackOptions);

        if (
            bootstrapResultsTools &&
            typeof bootstrapResultsTools.createRuntimeSharedFallbackSkeleton === 'function'
        ) {
            try {
                const skeleton = bootstrapResultsTools.createRuntimeSharedFallbackSkeleton(invocationOptions);

                if (skeleton && isObject(skeleton)) {
                    return skeleton;
                }
            } catch (runtimeSharedFallbackSkeletonError) {
                void runtimeSharedFallbackSkeletonError;
            }
        }

        if (
            bootstrapFallbackTools &&
            typeof bootstrapFallbackTools.createRuntimeSharedBootstrapFallback === 'function'
        ) {
            try {
                const generated = bootstrapFallbackTools.createRuntimeSharedBootstrapFallback(invocationOptions);

                if (generated && isObject(generated)) {
                    return generated;
                }
            } catch (runtimeSharedFallbackError) {
                void runtimeSharedFallbackError;
            }
        }

        return createRuntimeSharedBootstrapFallback(invocationOptions);
    }

    function createInlineLocalizationFallbackWithSuite(options) {
        const invocationOptions = mergeOptions(options);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);

        if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
            invocationOptions.fallbackTools = bootstrapFallbackTools;
        }

        return createInlineLocalizationFallback(invocationOptions);
    }

    function createInlineRuntimeSharedFallbackWithSuite(options) {
        const invocationOptions = mergeOptions(options);
        invocationOptions.fallbackScopes = collectSuiteFallbackScopes(options);

        if (!invocationOptions.fallbackTools && bootstrapFallbackTools) {
            invocationOptions.fallbackTools = bootstrapFallbackTools;
        }

        return createInlineRuntimeSharedFallback(invocationOptions);
    }

    const suite = {
        bootstrapTools,
        bootstrapFallbackTools,
        bootstrapEnvironmentTools,
        bootstrapResultsTools,
        collectBootstrapFallbackScopes: collectSuiteFallbackScopes,
        createBootstrapEnvironment: createBootstrapEnvironmentWithSuite,
        createLocalizationBootstrapResult: createLocalizationBootstrapResultWithSuite,
        createLocalizationBootstrapFallback: createLocalizationBootstrapFallbackWithSuite,
        createRuntimeSharedBootstrapResult: createRuntimeSharedBootstrapResultWithSuite,
        createRuntimeSharedBootstrapFallback: createRuntimeSharedBootstrapFallbackWithSuite,
        createInlineLocalizationFallback: createInlineLocalizationFallbackWithSuite,
        createInlineRuntimeSharedFallback: createInlineRuntimeSharedFallbackWithSuite,
        resolveBootstrapTools,
        resolveBootstrapFallbackTools,
        resolveBootstrapEnvironmentTools,
        resolveBootstrapResultsTools,
    };

    try {
        suite.bootstrapEnvironment = createBootstrapEnvironmentWithSuite(
            normalizedOptions.bootstrapEnvironmentOptions || null
        );
    } catch (bootstrapEnvironmentError) {
        void bootstrapEnvironmentError;
        suite.bootstrapEnvironment = null;
    }

    return suite;
}

export const cineCoreAppCoreBootstrap = {
    createLocalizationBootstrapResult,
    createLocalizationBootstrapFallback,
    createRuntimeSharedBootstrapResult,
    createRuntimeSharedBootstrapFallback,
    normalizeBootstrapInvocationOptions,
    collectBootstrapFallbackScopes,
    resolveBootstrapTools,
    resolveBootstrapFallbackTools,
    resolveBootstrapEnvironmentTools,
    resolveBootstrapResultsTools,
    createInlineLocalizationFallback,
    createInlineRuntimeSharedFallback,
    createBootstrapSuite,
    resolveBootstrapResolverTools,
    createBootstrapEnvironment,
};
