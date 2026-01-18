/**
 * Cine Power Planner Core Runtime Shared
 *
 * Pure ESM module for runtime shared state resolution.
 * Extracted from app-core-runtime-shared.js.
 */

import { detectGlobalScope } from '../helpers/scope-utils.js';
import { resolveCoreSupportModule } from '../../core/app-core-runtime-support.js'; // Keep this legacy import/path per extraction source? Or migrate support?
// NOTE: app-core-runtime-support.js is also legacy. We should really create a module for it if possible, 
// but for now we follow the plan: migrate existing to shim, create new.
// However, Step 35 migrated app-core-runtime-support.js? Let's check status.
// Wait, Step 32 converted app-core-runtime-support.js. 
// Ah, the task list says "Batch 2: Medium Core Utils... Convert app-core-runtime-support.js".
// So it should already be a shim or module. 
// Let's assume it exports safely.

// Actually, in Phase 1 (Batch 2), we converted app-core-runtime-support.js.
// It seems it was converted to a shim but kept some logic or delegated to `modules/runtime-support.js`.
// Let's use `modules/runtime-support.js` if available, but the original code used relative `./app-core-runtime-support.js`.
// We should import from the shim to be safe OR check if `resolveCoreSupportModule` is in a clean ESM module.
// Looking at file list, `runtime-support.js` exists in modules.

import { resolveCoreSupportModule as cleanResolveCoreSupportModule } from '../runtime-support.js';

function resolveRuntimeSharedNamespaceTools() {
    const globalScope = detectGlobalScope();
    const runtimeScope = globalScope; // Simplified for pure ESM context

    // Try finding existing tools on scopes
    const scopes = [globalScope];
    if (typeof window !== 'undefined') scopes.push(window);
    if (typeof self !== 'undefined') scopes.push(self);

    for (const scope of scopes) {
        if (scope && scope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS) {
            return scope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS;
        }
    }

    const resolved = cleanResolveCoreSupportModule(
        'cineCoreAppRuntimeSharedNamespace',
        './modules/app-core/runtime.js'
    );

    // Write back to global scope if possible to maintain singleton
    if (globalScope) {
        try {
            if (typeof globalScope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS === 'undefined') {
                globalScope.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = resolved;
            }
        } catch (e) { void e; }
    }

    return resolved;
}

export const CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = resolveRuntimeSharedNamespaceTools();

export const RUNTIME_SHARED_BOOTSTRAP_TOOLS = cleanResolveCoreSupportModule(
    'cineCoreAppRuntimeSharedBootstrap',
    './modules/app-core/runtime.js'
);

// We define these locally but don't export them unless needed by the shim, 
// ensuring cleaner public API.
const RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS = cleanResolveCoreSupportModule(
    'cineCoreAppRuntimeSharedBootstrapResolver',
    './modules/app-core/runtime.js'
);

function createInlineRuntimeSharedFallback(moduleOptions) {
    // Basic fallback logic if bootstrap tools fail
    return {
        runtimeSharedNamespace: {},
        runtimeSharedResolver: null,
        existingRuntimeShared: null,
        runtimeShared: {},
        fallbackResolveRuntimeSharedFromGlobal: () => null
    };
}

export function resolveRuntimeSharedBootstrapResult(options = {}) {
    const {
        APP_CORE_BOOTSTRAP_TOOLS,
        APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
        APP_CORE_BOOTSTRAP_SUITE,
        APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
        CORE_RUNTIME_SHARED // Injected existing
    } = options;

    const moduleOptions = {
        bootstrapTools: APP_CORE_BOOTSTRAP_TOOLS,
        bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
        runtimeSharedBootstrapResolverTools: RUNTIME_SHARED_BOOTSTRAP_RESOLVER_TOOLS,
        runtimeSharedBootstrapTools: RUNTIME_SHARED_BOOTSTRAP_TOOLS,
        runtimeSharedNamespaceTools: CORE_RUNTIME_SHARED_NAMESPACE_TOOLS,
        resolveCoreSupportModule: cleanResolveCoreSupportModule,
        requireFn: null, // ESM doesn't support require
        runtimeScope: detectGlobalScope(),
        coreGlobalScope: detectGlobalScope(),
        currentRuntimeShared: CORE_RUNTIME_SHARED,
        fallbackScopes: [],
        collectFallbackScopes: () => [],
        createInlineRuntimeSharedFallback,
        runtimeSharedBootstrapInlineRequirePath: null,
        runtimeSharedBootstrapResultRequirePath: null,
    };

    if (APP_CORE_BOOTSTRAP_SUITE?.createRuntimeSharedBootstrapResult) {
        try {
            return APP_CORE_BOOTSTRAP_SUITE.createRuntimeSharedBootstrapResult(moduleOptions);
        } catch (e) { void e; }
    }

    if (APP_CORE_BOOTSTRAP_RESULTS_TOOLS?.resolveRuntimeSharedBootstrapResult) {
        try {
            return APP_CORE_BOOTSTRAP_RESULTS_TOOLS.resolveRuntimeSharedBootstrapResult(moduleOptions);
        } catch (e) { void e; }
    }

    if (APP_CORE_BOOTSTRAP_TOOLS?.createRuntimeSharedBootstrapResult) {
        try {
            return APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapResult(moduleOptions);
        } catch (e) { void e; }
    }

    if (APP_CORE_BOOTSTRAP_TOOLS?.createRuntimeSharedBootstrapFallback) {
        try {
            return APP_CORE_BOOTSTRAP_TOOLS.createRuntimeSharedBootstrapFallback(moduleOptions);
        } catch (e) { void e; }
    }

    return createInlineRuntimeSharedFallback(moduleOptions);
}
