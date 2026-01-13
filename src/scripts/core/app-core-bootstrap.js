

/*
 * Thin wrapper around modules/app-core/bootstrap.js
 * Redundancy removed in Phase 5 Refactor.
 */

/*
 * DEEP DIVE: The Core Wiring Harness
 *
 * This file may look like simple boilerplate, but it serves a critical architectural purpose:
 * **Environment Agnostic Wiring**.
 *
 * It uses `resolveCoreSupportModule` to dynamically locate the actual implementation of core systems
 * (Bootstrap, Localization) depending on whether we are running in:
 * 1. The Main Browser Window (bundled)
 * 2. A Web Worker (standalone)
 * 3. A Node.js Test Environment (mocked/polyfilled)
 *
 * This separation allows the Core logic to stay pure while this "harness" handles the plumbing.
 */
import { resolveCoreSupportModule } from './app-core-runtime-support.js';
import {
  cineCoreAppCoreBootstrap,
  cineCoreAppCoreBootstrapResolver,
  cineCoreAppCoreBootstrapFallbacks,
  cineCoreAppCoreBootstrapEnvironment,
  cineCoreAppCoreBootstrapResults,
} from './modules/app-core/bootstrap.js';
import {
  cineCoreAppLocalizationSupport,
  cineCoreAppLocalizationBootstrap,
  cineCoreAppRuntimeLocalization,
} from './modules/app-core/localization-fixed.js';

const APP_CORE_BOOTSTRAP_TOOLS = cineCoreAppCoreBootstrap;

const APP_CORE_LOCALIZATION_RUNTIME_TOOLS = cineCoreAppRuntimeLocalization;

const APP_CORE_LOCALIZATION_SUPPORT_TOOLS = cineCoreAppLocalizationSupport;

const APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS = cineCoreAppLocalizationBootstrap;

const APP_CORE_BOOTSTRAP_RESOLVER_DIRECT = cineCoreAppCoreBootstrapResolver;

const APP_CORE_BOOTSTRAP_FALLBACK_DIRECT = cineCoreAppCoreBootstrapFallbacks;

const APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT = cineCoreAppCoreBootstrapEnvironment;

const APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT = cineCoreAppCoreBootstrapResults;

function getDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE
    ? CORE_PART1_RUNTIME_SCOPE
    : null;
}

function getDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE
    ? CORE_GLOBAL_SCOPE
    : null;
}

const APP_CORE_BOOTSTRAP_SUITE =
  APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite === 'function'
    ? APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite({
      directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
      directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
      directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
      directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
      directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT,
      resolveCoreSupportModule,
      requireFn: typeof require === 'function' ? require : null,
      runtimeScope: getDefaultRuntimeScope(),
      coreGlobalScope: getDefaultCoreGlobalScope(),
    })
    : null;

const APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools) ||
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT ||
  null;

const APP_CORE_BOOTSTRAP_RESULTS_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapResultsTools) ||
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT ||
  null;

const APP_CORE_BOOTSTRAP_ENVIRONMENT = (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment) || null;

const APP_CORE_BOOTSTRAP_RESOLVER_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE &&
    APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment &&
    APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment.bootstrapResolverTools) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools) ||
  APP_CORE_BOOTSTRAP_RESOLVER_DIRECT ||
  null;

const APP_CORE_BOOTSTRAP_FALLBACK_TOOLS =
  (APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools) ||
  (APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools) ||
  APP_CORE_BOOTSTRAP_FALLBACK_DIRECT ||
  null;

const localizationBootstrapResult = (function resolveLocalizationBootstrapResult() {
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult === 'function') {
    const moduleOptions = {
      bootstrapTools: APP_CORE_BOOTSTRAP_TOOLS,
      bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
      localizationSupportTools: APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
      localizationBootstrapTools: APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
      localizationRuntimeTools: APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
      resolveCoreSupportModule,
      requireFn: typeof require === 'function' ? require : null,
      runtimeScope: getDefaultRuntimeScope(),
      coreGlobalScope: getDefaultCoreGlobalScope(),
      fallbackScopes: [], // Simplified for thin wrapper
    };
    return APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult(moduleOptions);
  }
  return null;
})();

const localizationBootstrapWiring =
  (APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS &&
    typeof APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring === 'function' &&
    APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring({
      localizationBootstrapResult,
    })) || null;

export {
  localizationBootstrapWiring,
  APP_CORE_BOOTSTRAP_SUITE,
  APP_CORE_BOOTSTRAP_TOOLS,
  APP_CORE_BOOTSTRAP_ENVIRONMENT,
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
  APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
  APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
  APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
  APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
  APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
  APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT as APP_CORE_BOOTSTRAP_RESULTS_DIRECT,
};

if (typeof globalThis !== 'undefined') {
  globalThis.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof window !== 'undefined') {
  window.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof self !== 'undefined') {
  self.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof global !== 'undefined') {
  global.localizationBootstrapWiring = localizationBootstrapWiring;
}
