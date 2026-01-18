# legacy/scripts/core/modules/core/localization.js

[← Back to Module](../modules/legacy-scripts-core-modules-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3263
- **Language:** JavaScript
- **Symbols:** 165
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | getModuleDirectory | (private) | `function getModuleDirectory(moduleId) {` |
| 8 | fn | normalizeFromDir | (private) | `function normalizeFromDir(moduleDir, request) {` |
| 29 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 47 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primary) {` |
| 50 | fn | push | (private) | `function push(scope) {` |
| 71 | fn | tryRequireLocaleModule | (private) | `function tryRequireLocaleModule() {` |
| 83 | fn | resolveLocaleModule | (private) | `function resolveLocaleModule(primary) {` |
| 108 | fn | fallbackNormalizeLanguageCode | (private) | `function fallbackNormalizeLanguageCode(lang, de...` |
| 119 | fn | getDefaultLanguage | (private) | `function getDefaultLanguage(primary) {` |
| 126 | fn | getRtlLanguageCodes | (private) | `function getRtlLanguageCodes(primary) {` |
| 133 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang, primary) {` |
| 145 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang, primary) {` |
| 151 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang, primary) {` |
| 172 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 230 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 233 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 241 | fn | collectDefaultGlobalScopes | (private) | `function collectDefaultGlobalScopes(scopes) {` |
| 255 | fn | fallbackNormalizeLanguageCodeValue | (private) | `function fallbackNormalizeLanguageCodeValue(lan...` |
| 267 | fn | fallbackResolveRtlCodes | (private) | `function fallbackResolveRtlCodes(config) {` |
| 283 | fn | fallbackCreateLocaleFallbackHelpers | (private) | `function fallbackCreateLocaleFallbackHelpers(ba...` |
| 287 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 290 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 295 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 308 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 343 | fn | fallbackCreateBasicLocalizationFallbackResolvers | (private) | `function fallbackCreateBasicLocalizationFallbac...` |
| 362 | fn | fallbackCreateLegacyLocalizationFallbackContext | (private) | `function fallbackCreateLegacyLocalizationFallba...` |
| 385 | fn | setupLocalizationFallbacks | (private) | `function setupLocalizationFallbacks(options) {` |
| 409 | fn | fallbackRegisterLocalizationScope | (private) | `function fallbackRegisterLocalizationScope(scop...` |
| 412 | fn | fallbackCollectLocalizationFactoryScopes | (private) | `function fallbackCollectLocalizationFactoryScop...` |
| 420 | fn | fallbackEnsureLocalizationFallbackFactories | (private) | `function fallbackEnsureLocalizationFallbackFact...` |
| 458 | fn | fallbackResolveLocalizationFallbackContextNamespace | (private) | `function fallbackResolveLocalizationFallbackCon...` |
| 493 | fn | fallbackCreateFallbackFactoryAccessor | (private) | `function fallbackCreateFallbackFactoryAccessor(...` |
| 614 | fn | resolveAttachmentScope | (private) | `function resolveAttachmentScope() {` |
| 655 | fn | isObject | (private) | `function isObject(value) {` |
| 658 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 676 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 688 | fn | ensureRequireLocalizationFallbackRegistry | (private) | `function ensureRequireLocalizationFallbackRegis...` |
| 703 | fn | ensureRequireInlineLocalizationFallbackNamespace | (private) | `function ensureRequireInlineLocalizationFallbac...` |
| 718 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(config) {` |
| 734 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(baseOption...` |
| 738 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 741 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 746 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 759 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 794 | fn | createBasicLocalizationFallbackResolvers | (private) | `function createBasicLocalizationFallbackResolve...` |
| 812 | fn | createLegacyLocalizationFallbackContext | (private) | `function createLegacyLocalizationFallbackContex...` |
| 839 | fn | createMethodProxy | (private) | `function createMethodProxy(methodName, fallback...` |
| 880 | fn | createLocalizationFallbackRuntimeContext | (private) | `function createLocalizationFallbackRuntimeConte...` |
| 923 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(primaryScope) {` |
| 941 | fn | resolveRuntimeModuleLoader | (private) | `function resolveRuntimeModuleLoader(scopeCandid...` |
| 965 | fn | requireCoreRuntimeModule | (private) | `function requireCoreRuntimeModule(moduleId, opt...` |
| 976 | fn | resolveSupportResolver | (private) | `function resolveSupportResolver(primaryScope) {` |
| 1000 | fn | createFallbackResolver | (private) | `function createFallbackResolver(resolverCandida...` |
| 1008 | fn | createLocalizationFallbackEnvironment | (private) | `function createLocalizationFallbackEnvironment(...` |
| 1183 | fn | isObject | (private) | `function isObject(value) {` |
| 1186 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 1192 | fn | collectScopeCandidates | (private) | `function collectScopeCandidates(primaryScope) {` |
| 1215 | fn | resolveLocalizationFallbackContextNamespace | (private) | `function resolveLocalizationFallbackContextName...` |
| 1251 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 1263 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(config) {` |
| 1279 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(baseOption...` |
| 1283 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 1286 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 1291 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 1304 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 1339 | fn | createBasicLocalizationFallbackResolversFallback | (private) | `function createBasicLocalizationFallbackResolve...` |
| 1358 | fn | createLegacyLocalizationFallbackContextFallback | (private) | `function createLegacyLocalizationFallbackContex...` |
| 1381 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 1426 | fn | isObject | (private) | `function isObject(value) {` |
| 1429 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 1435 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primaryCandidate) {` |
| 1465 | fn | configure | (private) | `function configure(options) {` |
| 1492 | fn | collectLocalizationFactoryScopes | (private) | `function collectLocalizationFactoryScopes(prima...` |
| 1511 | fn | ensureLocalizationFallbackFactories | (private) | `function ensureLocalizationFallbackFactories(pr...` |
| 1546 | fn | inlineResolveLocalizationFallbackContextNamespace | (private) | `function inlineResolveLocalizationFallbackConte...` |
| 1600 | fn | inlineNormalizeLanguageCodeValue | (private) | `function inlineNormalizeLanguageCodeValue(lang,...` |
| 1612 | fn | inlineResolveRtlCodes | (private) | `function inlineResolveRtlCodes(config) {` |
| 1628 | fn | inlineCreateLocaleFallbackHelpers | (private) | `function inlineCreateLocaleFallbackHelpers(base...` |
| 1632 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 1635 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 1640 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 1653 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 1688 | fn | inlineCreateBasicLocalizationFallbackResolvers | (private) | `function inlineCreateBasicLocalizationFallbackR...` |
| 1707 | fn | inlineCreateLegacyLocalizationFallbackContext | (private) | `function inlineCreateLegacyLocalizationFallback...` |
| 1730 | fn | createFallbackFactoryAccessor | (private) | `function createFallbackFactoryAccessor(methodNa...` |
| 1780 | fn | resolveLocalizationFallbackNamespaceFromCandidate | (private) | `function resolveLocalizationFallbackNamespaceFr...` |
| 1809 | fn | createMinimalLocalizationFallbackNamespace | (private) | `function createMinimalLocalizationFallbackNames...` |
| 1810 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 1822 | fn | normalizeRtlCodes | (private) | `function normalizeRtlCodes(options) {` |
| 1838 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 1873 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(options) {` |
| 1876 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 1879 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 1884 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 1897 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 1943 | fn | resolveInlineFallbackNamespace | (private) | `function resolveInlineFallbackNamespace(options) {` |
| 1960 | fn | resolveLocalizationFallbackNamespace | (private) | `function resolveLocalizationFallbackNamespace(o...` |
| 1976 | fn | createFallbackResolvers | (private) | `function createFallbackResolvers(options) {` |
| 1978 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 1988 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 2004 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 2047 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 2068 | fn | resolveLocalizationFallbackRegistryFromScopes | (private) | `function resolveLocalizationFallbackRegistryFro...` |
| 2086 | fn | createInlineLocalizationFallbackResolversFallback | (private) | `function createInlineLocalizationFallbackResolv...` |
| 2087 | fn | resolveLocalizationFallbackNamespaceFromCandidate | (private) | `function resolveLocalizationFallbackNamespaceFr...` |
| 2116 | fn | createMinimalLocalizationFallbackNamespace | (private) | `function createMinimalLocalizationFallbackNames...` |
| 2117 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 2129 | fn | normalizeRtlCodes | (private) | `function normalizeRtlCodes(fallbackOptions) {` |
| 2145 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 2180 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(fallbackOptions) {` |
| 2183 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 2186 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 2191 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 2204 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 2248 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 2258 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 2274 | fn | tryRequireLocalizationFallbackRegistry | (private) | `function tryRequireLocalizationFallbackRegistry...` |
| 2297 | fn | resolveInlineFallbackNamespace | (private) | `function resolveInlineFallbackNamespace(options) {` |
| 2320 | fn | createInlineFallbackRegistry | (private) | `function createInlineFallbackRegistry() {` |
| 2327 | fn | createLocalizationFallbackSupport | (private) | `function createLocalizationFallbackSupport(opti...` |
| 2341 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 2351 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 2395 | fn | createBasicLocalizationFallbackResolvers | (private) | `function createBasicLocalizationFallbackResolve...` |
| 2396 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 2408 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(fallbackOptions) {` |
| 2424 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(fallbackOp...` |
| 2427 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 2430 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 2435 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 2448 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 2502 | fn | createLocalizationFallbackContext | (private) | `function createLocalizationFallbackContext(conf...` |
| 2539 | fn | createMethodProxy | (private) | `function createMethodProxy(methodName, fallback...` |
| 2609 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 2624 | fn | toLowerCaseSafe | (private) | `function toLowerCaseSafe(value) {` |
| 2635 | fn | normaliseDefaultLanguage | (private) | `function normaliseDefaultLanguage(options) {` |
| 2639 | fn | normaliseRtlCodes | (private) | `function normaliseRtlCodes(options) {` |
| 2655 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 2693 | fn | fallbackNormalizeLanguageCode | (private) | `function fallbackNormalizeLanguageCode(lang, op...` |
| 2706 | fn | fallbackIsRtlLanguage | (private) | `function fallbackIsRtlLanguage(lang, options) {` |
| 2712 | fn | fallbackResolveDocumentDirection | (private) | `function fallbackResolveDocumentDirection(lang,...` |
| 2725 | fn | fallbackApplyLocaleMetadata | (private) | `function fallbackApplyLocaleMetadata(target, la...` |
| 2744 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(options) {` |
| 2808 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope() {` |
| 2826 | fn | createInlineLocalizationFallbackImplementation | (private) | `function createInlineLocalizationFallbackImplem...` |
| 2827 | fn | inlineFallbackResolveLocaleModule | (private) | `function inlineFallbackResolveLocaleModule(scop...` |
| 2865 | fn | inlineCreateLocaleFallbacks | (private) | `function inlineCreateLocaleFallbacks(options) {` |
| 2899 | fn | inlineNormalizeLanguageCode | (private) | `function inlineNormalizeLanguageCode(lang) {` |
| 2911 | fn | inlineIsRtlLanguage | (private) | `function inlineIsRtlLanguage(lang) {` |
| 2916 | fn | inlineResolveDocumentDirection | (private) | `function inlineResolveDocumentDirection(lang) {` |
| 2929 | fn | inlineApplyLocaleMetadata | (private) | `function inlineApplyLocaleMetadata(target, lang...` |
| 2977 | fn | resolveFallbackModule | (private) | `function resolveFallbackModule() {` |
| 2994 | fn | createInlineLocalizationFallbackNamespace | (private) | `function createInlineLocalizationFallbackNamesp...` |
| 3030 | fn | isObject | (private) | `function isObject(value) {` |
| 3033 | fn | safeRequire | (private) | `function safeRequire(requireFn, requirePath) {` |
| 3045 | fn | readOption | (private) | `function readOption(options, key) {` |
| 3051 | fn | resolveModule | (private) | `function resolveModule(resolver, requireFn, nam...` |
| 3070 | fn | ensureInlineSupport | (private) | `function ensureInlineSupport(options) {` |
| 3090 | fn | readLocalizationFallbackEnvironment | (private) | `function readLocalizationFallbackEnvironment(op...` |
| 3114 | fn | createLocalizationRuntimeEnvironment | (private) | `function createLocalizationRuntimeEnvironment(u...` |
| 3149 | fn | createBasicLocalizationFallbackResolversProxy | (private) | `function createBasicLocalizationFallbackResolve...` |
| 3167 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy() {` |
| 3171 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy() {` |
| 3211 | fn | loadModule | (private) | `function loadModule(moduleId) {` |
| 3224 | fn | localRequire | (private) | `function localRequire(request) {` |

