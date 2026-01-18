# src/scripts/core/modules/core/localization.js

[← Back to Module](../modules/src-scripts-core-modules-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4425
- **Language:** JavaScript
- **Symbols:** 164
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 3 | fn | getModuleDirectory | (private) | `function getModuleDirectory(moduleId) {` |
| 9 | fn | normalizeFromDir | (private) | `function normalizeFromDir(moduleDir, request) {` |
| 34 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 55 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primary) {` |
| 59 | fn | push | (private) | `function push(scope) {` |
| 85 | fn | tryRequireLocaleModule | (private) | `function tryRequireLocaleModule() {` |
| 100 | fn | resolveLocaleModule | (private) | `function resolveLocaleModule(primary) {` |
| 131 | fn | fallbackNormalizeLanguageCode | (private) | `function fallbackNormalizeLanguageCode(lang, de...` |
| 145 | fn | getDefaultLanguage | (private) | `function getDefaultLanguage(primary) {` |
| 155 | fn | getRtlLanguageCodes | (private) | `function getRtlLanguageCodes(primary) {` |
| 169 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang, primary) {` |
| 184 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang, primary) {` |
| 192 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang, primary) {` |
| 217 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 287 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 291 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 301 | fn | collectDefaultGlobalScopes | (private) | `function collectDefaultGlobalScopes(scopes) {` |
| 319 | fn | fallbackNormalizeLanguageCodeValue | (private) | `function fallbackNormalizeLanguageCodeValue(lan...` |
| 334 | fn | fallbackResolveRtlCodes | (private) | `function fallbackResolveRtlCodes(config) {` |
| 355 | fn | fallbackCreateLocaleFallbackHelpers | (private) | `function fallbackCreateLocaleFallbackHelpers(ba...` |
| 363 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 367 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 373 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 388 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 427 | fn | fallbackCreateBasicLocalizationFallbackResolvers | (private) | `function fallbackCreateBasicLocalizationFallbac...` |
| 448 | fn | fallbackCreateLegacyLocalizationFallbackContext | (private) | `function fallbackCreateLegacyLocalizationFallba...` |
| 478 | fn | setupLocalizationFallbacks | (private) | `function setupLocalizationFallbacks(options) {` |
| 494 | fn | fallbackRegisterLocalizationScope | (private) | `function fallbackRegisterLocalizationScope(scop...` |
| 498 | fn | fallbackCollectLocalizationFactoryScopes | (private) | `function fallbackCollectLocalizationFactoryScop...` |
| 510 | fn | fallbackEnsureLocalizationFallbackFactories | (private) | `function fallbackEnsureLocalizationFallbackFact...` |
| 559 | fn | fallbackResolveLocalizationFallbackContextNamespace | (private) | `function fallbackResolveLocalizationFallbackCon...` |
| 604 | fn | fallbackCreateFallbackFactoryAccessor | (private) | `function fallbackCreateFallbackFactoryAccessor(...` |
| 840 | fn | resolveAttachmentScope | (private) | `function resolveAttachmentScope() {` |
| 895 | fn | isObject | (private) | `function isObject(value) {` |
| 899 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 923 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 938 | fn | ensureRequireLocalizationFallbackRegistry | (private) | `function ensureRequireLocalizationFallbackRegis...` |
| 956 | fn | ensureRequireInlineLocalizationFallbackNamespace | (private) | `function ensureRequireInlineLocalizationFallbac...` |
| 974 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(config) {` |
| 994 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(baseOption...` |
| 999 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 1003 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 1009 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 1024 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 1063 | fn | createBasicLocalizationFallbackResolvers | (private) | `function createBasicLocalizationFallbackResolve...` |
| 1082 | fn | createLegacyLocalizationFallbackContext | (private) | `function createLegacyLocalizationFallbackContex...` |
| 1144 | fn | createMethodProxy | (private) | `function createMethodProxy(methodName, fallback...` |
| 1187 | fn | createLocalizationFallbackRuntimeContext | (private) | `function createLocalizationFallbackRuntimeConte...` |
| 1247 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(primaryScope) {` |
| 1274 | fn | resolveRuntimeModuleLoader | (private) | `function resolveRuntimeModuleLoader(scopeCandid...` |
| 1312 | fn | requireCoreRuntimeModule | (private) | `function requireCoreRuntimeModule(moduleId, opt...` |
| 1329 | fn | resolveSupportResolver | (private) | `function resolveSupportResolver(primaryScope) {` |
| 1366 | fn | createFallbackResolver | (private) | `function createFallbackResolver(resolverCandida...` |
| 1379 | fn | createLocalizationFallbackEnvironment | (private) | `function createLocalizationFallbackEnvironment(...` |
| 1676 | fn | isObject | (private) | `function isObject(value) {` |
| 1680 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 1688 | fn | collectScopeCandidates | (private) | `function collectScopeCandidates(primaryScope) {` |
| 1720 | fn | resolveLocalizationFallbackContextNamespace | (private) | `function resolveLocalizationFallbackContextName...` |
| 1763 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 1778 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(config) {` |
| 1798 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(baseOption...` |
| 1803 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 1807 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 1813 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 1828 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 1867 | fn | createBasicLocalizationFallbackResolversFallback | (private) | `function createBasicLocalizationFallbackResolve...` |
| 1888 | fn | createLegacyLocalizationFallbackContextFallback | (private) | `function createLegacyLocalizationFallbackContex...` |
| 1916 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 1976 | fn | isObject | (private) | `function isObject(value) {` |
| 1980 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 1988 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primaryCandidate) {` |
| 2026 | fn | configure | (private) | `function configure(options) {` |
| 2062 | fn | collectLocalizationFactoryScopes | (private) | `function collectLocalizationFactoryScopes(prima...` |
| 2088 | fn | ensureLocalizationFallbackFactories | (private) | `function ensureLocalizationFallbackFactories(pr...` |
| 2136 | fn | inlineResolveLocalizationFallbackContextNamespace | (private) | `function inlineResolveLocalizationFallbackConte...` |
| 2208 | fn | inlineNormalizeLanguageCodeValue | (private) | `function inlineNormalizeLanguageCodeValue(lang,...` |
| 2223 | fn | inlineResolveRtlCodes | (private) | `function inlineResolveRtlCodes(config) {` |
| 2246 | fn | inlineCreateLocaleFallbackHelpers | (private) | `function inlineCreateLocaleFallbackHelpers(base...` |
| 2254 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 2258 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 2264 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 2279 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 2318 | fn | inlineCreateBasicLocalizationFallbackResolvers | (private) | `function inlineCreateBasicLocalizationFallbackR...` |
| 2339 | fn | inlineCreateLegacyLocalizationFallbackContext | (private) | `function inlineCreateLegacyLocalizationFallback...` |
| 2369 | fn | createFallbackFactoryAccessor | (private) | `function createFallbackFactoryAccessor(methodNa...` |
| 2431 | fn | resolveLocalizationFallbackNamespaceFromCandidate | (private) | `function resolveLocalizationFallbackNamespaceFr...` |
| 2468 | fn | createMinimalLocalizationFallbackNamespace | (private) | `function createMinimalLocalizationFallbackNames...` |
| 2469 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 2484 | fn | normalizeRtlCodes | (private) | `function normalizeRtlCodes(options) {` |
| 2504 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 2545 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(options) {` |
| 2552 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 2556 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 2562 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 2577 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 2628 | fn | resolveInlineFallbackNamespace | (private) | `function resolveInlineFallbackNamespace(options) {` |
| 2648 | fn | resolveLocalizationFallbackNamespace | (private) | `function resolveLocalizationFallbackNamespace(o...` |
| 2678 | fn | createFallbackResolvers | (private) | `function createFallbackResolvers(options) {` |
| 2681 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 2696 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 2715 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 2770 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 2798 | fn | resolveLocalizationFallbackRegistryFromScopes | (private) | `function resolveLocalizationFallbackRegistryFro...` |
| 2832 | fn | createInlineLocalizationFallbackResolversFallback | (private) | `function createInlineLocalizationFallbackResolv...` |
| 2833 | fn | resolveLocalizationFallbackNamespaceFromCandidate | (private) | `function resolveLocalizationFallbackNamespaceFr...` |
| 2870 | fn | createMinimalLocalizationFallbackNamespace | (private) | `function createMinimalLocalizationFallbackNames...` |
| 2871 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 2886 | fn | normalizeRtlCodes | (private) | `function normalizeRtlCodes(fallbackOptions) {` |
| 2906 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 2947 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(fallbackOptions) {` |
| 2954 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 2958 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 2964 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 2979 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 3040 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 3052 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 3071 | fn | tryRequireLocalizationFallbackRegistry | (private) | `function tryRequireLocalizationFallbackRegistry...` |
| 3097 | fn | resolveInlineFallbackNamespace | (private) | `function resolveInlineFallbackNamespace(options) {` |
| 3123 | fn | createInlineFallbackRegistry | (private) | `function createInlineFallbackRegistry() {` |
| 3131 | fn | createLocalizationFallbackSupport | (private) | `function createLocalizationFallbackSupport(opti...` |
| 3164 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy(scope) {` |
| 3176 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy(fallbackOpt...` |
| 3230 | fn | createBasicLocalizationFallbackResolvers | (private) | `function createBasicLocalizationFallbackResolve...` |
| 3231 | fn | normalizeLanguageCodeValue | (private) | `function normalizeLanguageCodeValue(lang, defau...` |
| 3246 | fn | resolveRtlCodes | (private) | `function resolveRtlCodes(fallbackOptions) {` |
| 3266 | fn | createLocaleFallbackHelpers | (private) | `function createLocaleFallbackHelpers(fallbackOp...` |
| 3273 | fn | normalizeLanguageCode | (private) | `function normalizeLanguageCode(lang) {` |
| 3277 | fn | isRtlLanguage | (private) | `function isRtlLanguage(lang) {` |
| 3283 | fn | resolveDocumentDirection | (private) | `function resolveDocumentDirection(lang) {` |
| 3298 | fn | applyLocaleMetadata | (private) | `function applyLocaleMetadata(target, lang, dire...` |
| 3358 | fn | createLocalizationFallbackContext | (private) | `function createLocalizationFallbackContext(conf...` |
| 3431 | fn | createMethodProxy | (private) | `function createMethodProxy(methodName, fallback...` |
| 3519 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 3535 | fn | toLowerCaseSafe | (private) | `function toLowerCaseSafe(value) {` |
| 3549 | fn | normaliseDefaultLanguage | (private) | `function normaliseDefaultLanguage(options) {` |
| 3558 | fn | normaliseRtlCodes | (private) | `function normaliseRtlCodes(options) {` |
| 3578 | fn | fallbackResolveLocaleModule | (private) | `function fallbackResolveLocaleModule(scope) {` |
| 3626 | fn | fallbackNormalizeLanguageCode | (private) | `function fallbackNormalizeLanguageCode(lang, op...` |
| 3642 | fn | fallbackIsRtlLanguage | (private) | `function fallbackIsRtlLanguage(lang, options) {` |
| 3649 | fn | fallbackResolveDocumentDirection | (private) | `function fallbackResolveDocumentDirection(lang,...` |
| 3664 | fn | fallbackApplyLocaleMetadata | (private) | `function fallbackApplyLocaleMetadata(target, la...` |
| 3686 | fn | createLocaleFallbacks | (private) | `function createLocaleFallbacks(options) {` |
| 3762 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope() {` |
| 3790 | fn | createInlineLocalizationFallbackImplementation | (private) | `function createInlineLocalizationFallbackImplem...` |
| 3791 | fn | inlineFallbackResolveLocaleModule | (private) | `function inlineFallbackResolveLocaleModule(scop...` |
| 3839 | fn | inlineCreateLocaleFallbacks | (private) | `function inlineCreateLocaleFallbacks(options) {` |
| 3875 | fn | inlineNormalizeLanguageCode | (private) | `function inlineNormalizeLanguageCode(lang) {` |
| 3890 | fn | inlineIsRtlLanguage | (private) | `function inlineIsRtlLanguage(lang) {` |
| 3896 | fn | inlineResolveDocumentDirection | (private) | `function inlineResolveDocumentDirection(lang) {` |
| 3911 | fn | inlineApplyLocaleMetadata | (private) | `function inlineApplyLocaleMetadata(target, lang...` |
| 3964 | fn | resolveFallbackModule | (private) | `function resolveFallbackModule() {` |
| 3988 | fn | createInlineLocalizationFallbackNamespace | (private) | `function createInlineLocalizationFallbackNamesp...` |
| 4041 | fn | isObject | (private) | `function isObject(value) {` |
| 4045 | fn | safeRequire | (private) | `function safeRequire(requireFn, requirePath) {` |
| 4060 | fn | readOption | (private) | `function readOption(options, key) {` |
| 4068 | fn | resolveModule | (private) | `function resolveModule(resolver, requireFn, nam...` |
| 4090 | fn | ensureInlineSupport | (private) | `function ensureInlineSupport(options) {` |
| 4119 | fn | readLocalizationFallbackEnvironment | (private) | `function readLocalizationFallbackEnvironment(op...` |
| 4155 | fn | createLocalizationRuntimeEnvironment | (private) | `function createLocalizationRuntimeEnvironment(u...` |
| 4239 | fn | createBasicLocalizationFallbackResolversProxy | (private) | `function createBasicLocalizationFallbackResolve...` |
| 4277 | fn | fallbackResolveLocaleModuleProxy | (private) | `function fallbackResolveLocaleModuleProxy() {` |
| 4286 | fn | createLocaleFallbacksProxy | (private) | `function createLocaleFallbacksProxy() {` |
| 4355 | fn | loadModule | (private) | `function loadModule(moduleId) {` |
| 4370 | fn | localRequire | (private) | `function localRequire(request) {` |

