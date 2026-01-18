/* global CORE_PART1_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, CORE_RUNTIME_SHARED: true */

/*
 * Cine Power Planner core runtime shared (Shim).
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/core/runtime-shared.js`.
 * This file remains as a backwards-compatibility shim to expose
 * global variables.
 */

import {
  APP_CORE_BOOTSTRAP_TOOLS,
  APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
  APP_CORE_BOOTSTRAP_SUITE,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
} from './app-core-bootstrap.js';

import {
  CORE_RUNTIME_SHARED_NAMESPACE_TOOLS as CORE_RUNTIME_SHARED_NAMESPACE_TOOLS_ESM,
  RUNTIME_SHARED_BOOTSTRAP_TOOLS as RUNTIME_SHARED_BOOTSTRAP_TOOLS_ESM,
  resolveRuntimeSharedBootstrapResult
} from '../modules/core/runtime-shared.js';

import { resolveCoreSupportModule } from './app-core-runtime-support.js';

export var CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = CORE_RUNTIME_SHARED_NAMESPACE_TOOLS_ESM;
export var RUNTIME_SHARED_BOOTSTRAP_TOOLS = RUNTIME_SHARED_BOOTSTRAP_TOOLS_ESM;

// Resolve the bootstrap result using injected legacy globals
var runtimeSharedBootstrapResult = resolveRuntimeSharedBootstrapResult({
  APP_CORE_BOOTSTRAP_TOOLS,
  APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
  APP_CORE_BOOTSTRAP_SUITE,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
  CORE_RUNTIME_SHARED: typeof CORE_RUNTIME_SHARED !== 'undefined' ? CORE_RUNTIME_SHARED : null
});

export var CORE_RUNTIME_SHARED_NAMESPACE =
  runtimeSharedBootstrapResult && runtimeSharedBootstrapResult.runtimeSharedNamespace
    ? runtimeSharedBootstrapResult.runtimeSharedNamespace
    : null;

export var CORE_RUNTIME_SHARED_RESOLVER =
  runtimeSharedBootstrapResult &&
    typeof runtimeSharedBootstrapResult.runtimeSharedResolver === 'function'
    ? runtimeSharedBootstrapResult.runtimeSharedResolver
    : null;

export var EXISTING_CORE_RUNTIME_SHARED =
  (runtimeSharedBootstrapResult &&
    runtimeSharedBootstrapResult.existingRuntimeShared &&
    typeof runtimeSharedBootstrapResult.existingRuntimeShared === 'object'
    ? runtimeSharedBootstrapResult.existingRuntimeShared
    : null) ||
  (typeof CORE_RUNTIME_SHARED !== 'undefined' && CORE_RUNTIME_SHARED
    ? CORE_RUNTIME_SHARED
    : null);

var fallbackResolveRuntimeSharedFromGlobal =
  runtimeSharedBootstrapResult &&
    typeof runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal ===
    'function'
    ? runtimeSharedBootstrapResult.fallbackResolveRuntimeSharedFromGlobal
    : function fallbackResolveRuntimeSharedFromGlobal() {
      return null;
    };


export var CORE_RUNTIME_SHARED =
  (runtimeSharedBootstrapResult &&
    runtimeSharedBootstrapResult.runtimeShared &&
    typeof runtimeSharedBootstrapResult.runtimeShared === 'object'
    ? runtimeSharedBootstrapResult.runtimeShared
    : null) ||
  (EXISTING_CORE_RUNTIME_SHARED && typeof EXISTING_CORE_RUNTIME_SHARED === 'object'
    ? EXISTING_CORE_RUNTIME_SHARED
    : null) ||
  (CORE_RUNTIME_SHARED_RESOLVER
    ? (function resolveRuntimeSharedWithResolver() {
      try {
        const resolved = CORE_RUNTIME_SHARED_RESOLVER({
          currentShared: EXISTING_CORE_RUNTIME_SHARED,
          resolveCoreSupportModule,
          requireFn: typeof require === 'function' ? require : null,
          runtimeScope:
            typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' ? CORE_PART1_RUNTIME_SCOPE : null,
          coreGlobalScope: typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null,
        });

        if (resolved && typeof resolved === 'object') {
          return resolved;
        }
      } catch (runtimeSharedResolverError) {
        void runtimeSharedResolverError;
      }

      return null;
    })()
    : null) ||
  fallbackResolveRuntimeSharedFromGlobal() ||
  Object.create(null);

if (typeof window !== 'undefined') {
  window.CORE_RUNTIME_SHARED_NAMESPACE_TOOLS = CORE_RUNTIME_SHARED_NAMESPACE_TOOLS;
  window.RUNTIME_SHARED_BOOTSTRAP_TOOLS = RUNTIME_SHARED_BOOTSTRAP_TOOLS;
  window.CORE_RUNTIME_SHARED_NAMESPACE = CORE_RUNTIME_SHARED_NAMESPACE;
  window.CORE_RUNTIME_SHARED_RESOLVER = CORE_RUNTIME_SHARED_RESOLVER;
  window.EXISTING_CORE_RUNTIME_SHARED = EXISTING_CORE_RUNTIME_SHARED;
  window.CORE_RUNTIME_SHARED = CORE_RUNTIME_SHARED;
  window.cineCoreRuntimeShared = CORE_RUNTIME_SHARED;
}
