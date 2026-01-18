import { cineCoreAppCoreBootstrap } from '../../../modules/core/bootstrap.js';
import { cineCoreAppCoreBootstrapEnvironment } from '../../../modules/core/bootstrap-environment.js';
import { cineCoreAppCoreBootstrapResults } from '../../../modules/core/bootstrap-results.js';
import { safeAssign } from '../../../modules/helpers/scope-utils.js';

export { cineCoreAppCoreBootstrap };
export { cineCoreAppCoreBootstrapEnvironment };
export { cineCoreAppCoreBootstrapResults };

export const cineCoreAppCoreBootstrapFallbacks = {
  createLocalizationBootstrapFallback: cineCoreAppCoreBootstrap.createLocalizationBootstrapFallback,
  createRuntimeSharedBootstrapFallback: cineCoreAppCoreBootstrap.createRuntimeSharedBootstrapFallback
};

export const cineCoreAppCoreBootstrapResolver = {
  resolveBootstrapTools: cineCoreAppCoreBootstrap.resolveBootstrapTools,
  resolveBootstrapFallbackTools: cineCoreAppCoreBootstrap.resolveBootstrapFallbackTools,
  resolveBootstrapEnvironmentTools: cineCoreAppCoreBootstrap.resolveBootstrapEnvironmentTools,
  resolveBootstrapResultsTools: cineCoreAppCoreBootstrap.resolveBootstrapResultsTools,
  resolveBootstrapResolverTools: cineCoreAppCoreBootstrap.resolveBootstrapResolverTools,
  createInlineLocalizationFallback: cineCoreAppCoreBootstrap.createInlineLocalizationFallback,
  createInlineRuntimeSharedFallback: cineCoreAppCoreBootstrap.createInlineRuntimeSharedFallback,
  createBootstrapSuite: cineCoreAppCoreBootstrap.createBootstrapSuite,
  normalizeBootstrapInvocationOptions: cineCoreAppCoreBootstrap.normalizeBootstrapInvocationOptions,
  collectBootstrapFallbackScopes: cineCoreAppCoreBootstrap.collectBootstrapFallbackScopes
};

// Global Injection for backward compatibility
(function injectGlobals() {
  const globalScope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    {};

  safeAssign(globalScope, 'cineCoreAppCoreBootstrap', cineCoreAppCoreBootstrap);
  safeAssign(globalScope, 'cineCoreAppCoreBootstrapFallbacks', cineCoreAppCoreBootstrapFallbacks);
  safeAssign(globalScope, 'cineCoreAppCoreBootstrapEnvironment', cineCoreAppCoreBootstrapEnvironment);
  safeAssign(globalScope, 'cineCoreAppCoreBootstrapResults', cineCoreAppCoreBootstrapResults);
  safeAssign(globalScope, 'cineCoreAppCoreBootstrapResolver', cineCoreAppCoreBootstrapResolver);
})();

