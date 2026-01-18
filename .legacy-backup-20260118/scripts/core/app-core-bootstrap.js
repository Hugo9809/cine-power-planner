var APP_CORE_BOOTSTRAP_TOOLS = resolveCoreSupportModule('cineCoreAppCoreBootstrap', './modules/app-core/bootstrap.js');
var APP_CORE_LOCALIZATION_RUNTIME_TOOLS = resolveCoreSupportModule('cineCoreAppRuntimeLocalization', './modules/app-core/localization.js');
var APP_CORE_LOCALIZATION_SUPPORT_TOOLS = resolveCoreSupportModule('cineCoreAppLocalizationSupport', './modules/app-core/localization.js');
var APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS = resolveCoreSupportModule('cineCoreAppLocalizationBootstrap', './modules/app-core/localization.js');
var APP_CORE_BOOTSTRAP_RESOLVER_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapResolver', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_FALLBACK_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapFallbacks', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapEnvironment', './modules/app-core/bootstrap.js');
var APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT = resolveCoreSupportModule('cineCoreAppCoreBootstrapResults', './modules/app-core/bootstrap.js');
function getDefaultRuntimeScope() {
  return typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE ? CORE_PART1_RUNTIME_SCOPE : null;
}
function getDefaultCoreGlobalScope() {
  return typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE ? CORE_GLOBAL_SCOPE : null;
}
var APP_CORE_BOOTSTRAP_SUITE = APP_CORE_BOOTSTRAP_TOOLS && typeof APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite === 'function' ? APP_CORE_BOOTSTRAP_TOOLS.createBootstrapSuite({
  directResolverNamespace: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
  directBootstrapNamespace: APP_CORE_BOOTSTRAP_TOOLS,
  directBootstrapFallbackNamespace: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
  directBootstrapEnvironmentNamespace: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
  directBootstrapResultsNamespace: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT,
  resolveCoreSupportModule: resolveCoreSupportModule,
  requireFn: typeof require === 'function' ? require : null,
  runtimeScope: getDefaultRuntimeScope(),
  coreGlobalScope: getDefaultCoreGlobalScope()
}) : null;
var APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironmentTools || APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT || null;
var APP_CORE_BOOTSTRAP_RESULTS_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapResultsTools || APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT || null;
var APP_CORE_BOOTSTRAP_ENVIRONMENT = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment || null;
var APP_CORE_BOOTSTRAP_RESOLVER_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment && APP_CORE_BOOTSTRAP_SUITE.bootstrapEnvironment.bootstrapResolverTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapResolverTools || APP_CORE_BOOTSTRAP_RESOLVER_DIRECT || null;
var APP_CORE_BOOTSTRAP_FALLBACK_TOOLS = APP_CORE_BOOTSTRAP_SUITE && APP_CORE_BOOTSTRAP_SUITE.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_ENVIRONMENT && APP_CORE_BOOTSTRAP_ENVIRONMENT.bootstrapFallbackTools || APP_CORE_BOOTSTRAP_FALLBACK_DIRECT || null;
var localizationBootstrapResult = function resolveLocalizationBootstrapResult() {
  if (APP_CORE_BOOTSTRAP_SUITE && typeof APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult === 'function') {
    var moduleOptions = {
      bootstrapTools: APP_CORE_BOOTSTRAP_TOOLS,
      bootstrapFallbackTools: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
      localizationSupportTools: APP_CORE_LOCALIZATION_SUPPORT_TOOLS,
      localizationBootstrapTools: APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS,
      localizationRuntimeTools: APP_CORE_LOCALIZATION_RUNTIME_TOOLS,
      resolveCoreSupportModule: resolveCoreSupportModule,
      requireFn: typeof require === 'function' ? require : null,
      runtimeScope: getDefaultRuntimeScope(),
      coreGlobalScope: getDefaultCoreGlobalScope(),
      fallbackScopes: []
    };
    return APP_CORE_BOOTSTRAP_SUITE.createLocalizationBootstrapResult(moduleOptions);
  }
  return null;
}();
var localizationBootstrapWiring = APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS && typeof APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring === 'function' && APP_CORE_LOCALIZATION_BOOTSTRAP_TOOLS.createLocalizationBootstrapWiring({
  localizationBootstrapResult: localizationBootstrapResult
}) || null;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    localizationBootstrapWiring: localizationBootstrapWiring,
    APP_CORE_BOOTSTRAP_SUITE: APP_CORE_BOOTSTRAP_SUITE,
    APP_CORE_BOOTSTRAP_TOOLS: APP_CORE_BOOTSTRAP_TOOLS,
    APP_CORE_BOOTSTRAP_ENVIRONMENT: APP_CORE_BOOTSTRAP_ENVIRONMENT,
    APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS,
    APP_CORE_BOOTSTRAP_RESULTS_TOOLS: APP_CORE_BOOTSTRAP_RESULTS_TOOLS,
    APP_CORE_BOOTSTRAP_RESOLVER_TOOLS: APP_CORE_BOOTSTRAP_RESOLVER_TOOLS,
    APP_CORE_BOOTSTRAP_FALLBACK_TOOLS: APP_CORE_BOOTSTRAP_FALLBACK_TOOLS,
    APP_CORE_BOOTSTRAP_RESOLVER_DIRECT: APP_CORE_BOOTSTRAP_RESOLVER_DIRECT,
    APP_CORE_BOOTSTRAP_FALLBACK_DIRECT: APP_CORE_BOOTSTRAP_FALLBACK_DIRECT,
    APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT: APP_CORE_BOOTSTRAP_ENVIRONMENT_TOOLS_DIRECT,
    APP_CORE_BOOTSTRAP_RESULTS_DIRECT: APP_CORE_BOOTSTRAP_RESULTS_TOOLS_DIRECT
  };
}
if (typeof globalThis !== 'undefined') {
  globalThis.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof window !== 'undefined') {
  window.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof self !== 'undefined') {
  self.localizationBootstrapWiring = localizationBootstrapWiring;
} else if (typeof global !== 'undefined') {
  global.localizationBootstrapWiring = localizationBootstrapWiring;
}