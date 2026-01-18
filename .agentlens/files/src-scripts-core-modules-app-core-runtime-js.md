# src/scripts/core/modules/app-core/runtime.js

[← Back to Module](../modules/src-scripts-core-modules-app-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4285
- **Language:** JavaScript
- **Symbols:** 154
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 18 | fn | isObject | (private) | `function isObject(value) {` |
| 22 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 46 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 58 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 66 | fn | resolveRuntimeModuleLoader | (private) | `function resolveRuntimeModuleLoader() {` |
| 98 | fn | requireCoreRuntimeModule | (private) | `function requireCoreRuntimeModule(moduleId, opt...` |
| 114 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 169 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 179 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, s...` |
| 190 | fn | resolveRuntimeShared | (private) | `function resolveRuntimeShared(options) {` |
| 290 | fn | isObject | (private) | `function isObject(value) {` |
| 294 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 306 | fn | createFallbackScopeList | (private) | `function createFallbackScopeList(runtimeScope, ...` |
| 310 | fn | push | (private) | `function push(scope) {` |
| 342 | fn | attemptResolveRuntimeSharedNamespaceFromScope | (private) | `function attemptResolveRuntimeSharedNamespaceFr...` |
| 362 | fn | createInlineRuntimeSharedNamespace | (private) | `function createInlineRuntimeSharedNamespace(nam...` |
| 394 | fn | minimalFallbackResolveRuntimeSharedFromGlobal | (private) | `function minimalFallbackResolveRuntimeSharedFro...` |
| 432 | fn | createFallbackResolveRuntimeSharedFromGlobal | (private) | `function createFallbackResolveRuntimeSharedFrom...` |
| 475 | fn | createRuntimeSharedBootstrap | (private) | `function createRuntimeSharedBootstrap(options) {` |
| 629 | fn | isObject | (private) | `function isObject(value) {` |
| 633 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 657 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 669 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 677 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 687 | fn | ensureFallbackScopes | (private) | `function ensureFallbackScopes(candidateScopes, ...` |
| 698 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 753 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 774 | fn | ensureRuntimeSharedBootstrapResolver | (private) | `function ensureRuntimeSharedBootstrapResolver(t...` |
| 782 | fn | createRuntimeSharedBootstrapContext | (private) | `function createRuntimeSharedBootstrapContext(op...` |
| 936 | fn | isObject | (private) | `function isObject(value) {` |
| 940 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 952 | fn | attemptRuntimeSharedBootstrap | (private) | `function attemptRuntimeSharedBootstrap(tools, r...` |
| 972 | fn | attemptRuntimeSharedBootstrapWithRequire | (private) | `function attemptRuntimeSharedBootstrapWithRequi...` |
| 1005 | fn | appendScope | (private) | `function appendScope(scopes, scope) {` |
| 1021 | fn | gatherFallbackScopes | (private) | `function gatherFallbackScopes(options) {` |
| 1043 | fn | createScopedRuntimeSharedResolver | (private) | `function createScopedRuntimeSharedResolver(scop...` |
| 1067 | fn | ensureRuntimeShared | (private) | `function ensureRuntimeShared(candidate, fallbac...` |
| 1089 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primaryScope) {` |
| 1113 | fn | ensureScope | (private) | `function ensureScope(candidate, fallbackScope) {` |
| 1121 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1197 | fn | isObject | (private) | `function isObject(value) {` |
| 1201 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1213 | fn | appendUniqueScope | (private) | `function appendUniqueScope(scopes, scope, seen) {` |
| 1239 | fn | createRuntimeSharedBootstrapInlineFallback | (private) | `function createRuntimeSharedBootstrapInlineFall...` |
| 1257 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 1302 | fn | ensureBootstrapOptions | (private) | `function ensureBootstrapOptions(options, requir...` |
| 1313 | fn | attemptResolveWithTools | (private) | `function attemptResolveWithTools(candidate, con...` |
| 1340 | fn | ensureFallbackCreator | (private) | `function ensureFallbackCreator(resultTools, req...` |
| 1364 | fn | resolveRuntimeSharedBootstrapResult | (private) | `function resolveRuntimeSharedBootstrapResult(op...` |
| 1471 | fn | isObject | (private) | `function isObject(value) {` |
| 1475 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1487 | fn | createFallbackScopeList | (private) | `function createFallbackScopeList() {` |
| 1491 | fn | append | (private) | `function append(scope) {` |
| 1520 | fn | attemptResolveRuntimeSharedBootstrapResult | (private) | `function attemptResolveRuntimeSharedBootstrapRe...` |
| 1544 | fn | createInlineFallbackResult | (private) | `function createInlineFallbackResult(bootstrapOp...` |
| 1548 | fn | appendScope | (private) | `function appendScope(scope) {` |
| 1591 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 1641 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1717 | fn | requireModule | (private) | `function requireModule(modulePath) {` |
| 1889 | fn | isObject | (private) | `function isObject(value) {` |
| 1893 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1905 | fn | normalizeScope | (private) | `function normalizeScope(value) {` |
| 1909 | fn | createFallbackResolveRuntimeSharedFromGlobal | (private) | `function createFallbackResolveRuntimeSharedFrom...` |
| 1933 | fn | attemptResolveWithManager | (private) | `function attemptResolveWithManager(candidate, m...` |
| 1957 | fn | createInlineFallbackResult | (private) | `function createInlineFallbackResult(bootstrapOp...` |
| 1961 | fn | append | (private) | `function append(scope) {` |
| 2026 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 2178 | fn | isObject | (private) | `function isObject(value) {` |
| 2182 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2206 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 2218 | fn | appendUniqueScope | (private) | `function appendUniqueScope(scopes, scope, seen) {` |
| 2244 | fn | createRuntimeSharedBootstrapInlineFallback | (private) | `function createRuntimeSharedBootstrapInlineFall...` |
| 2266 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 2311 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 2395 | fn | safeArrayMerge | (private) | `function safeArrayMerge(primary, secondary) {` |
| 2399 | fn | appendValues | (private) | `function appendValues(list) {` |
| 2419 | fn | collectFallbackScopes | (private) | `function collectFallbackScopes(options) {` |
| 2451 | fn | fallbackResolveRuntimeSharedFromScopes | (private) | `function fallbackResolveRuntimeSharedFromScopes...` |
| 2473 | fn | attemptResolveSupportModule | (private) | `function attemptResolveSupportModule(identifier...` |
| 2505 | fn | createMinimalRuntimeSharedNamespace | (private) | `function createMinimalRuntimeSharedNamespace(op...` |
| 2510 | fn | resolveFromScopes | (private) | `function resolveFromScopes() {` |
| 2530 | fn | createRuntimeSharedNamespace | (private) | `function createRuntimeSharedNamespace(options) {` |
| 2671 | fn | isObject | (private) | `function isObject(value) {` |
| 2675 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2699 | fn | ensureDocument | (private) | `function ensureDocument(candidate) {` |
| 2711 | fn | defaultCollectSelectedValues | (private) | `function defaultCollectSelectedValues() {` |
| 2715 | fn | defaultComputeMultiSelectSize | (private) | `function defaultComputeMultiSelectSize(optionCo...` |
| 2722 | fn | defaultGetCrewRoleEntries | (private) | `function defaultGetCrewRoleEntries() {` |
| 2726 | fn | defaultGetLocalizedTexts | (private) | `function defaultGetLocalizedTexts() {` |
| 2730 | fn | defaultGetDefaultLanguageTexts | (private) | `function defaultGetDefaultLanguageTexts() {` |
| 2734 | fn | createAutoGearCrewOptionHelpers | (private) | `function createAutoGearCrewOptionHelpers(option...` |
| 2761 | fn | refreshCrewOptions | (private) | `function refreshCrewOptions(selectElement, sele...` |
| 2774 | fn | appendOption | (private) | `const appendOption = (value, label) => {` |
| 2803 | fn | getCrewRoleLabel | (private) | `function getCrewRoleLabel(value) {` |
| 2861 | fn | isObject | (private) | `function isObject(value) {` |
| 2865 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 2869 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2893 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 2901 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 2913 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 2966 | fn | createFallbackRuntimeCandidateScopeSupport | (private) | `function createFallbackRuntimeCandidateScopeSup...` |
| 2970 | fn | registerScope | (private) | `function registerScope(scopes, seenScopes, scop...` |
| 2996 | fn | detectFallbackGlobalScope | (private) | `function detectFallbackGlobalScope(primaryScope) {` |
| 3006 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary...` |
| 3036 | fn | fallbackResolveCandidateScopes | (private) | `function fallbackResolveCandidateScopes(resolve...` |
| 3069 | fn | fallbackSyncCandidateScopes | (private) | `function fallbackSyncCandidateScopes(candidateS...` |
| 3116 | fn | fallbackEnsureCandidateScopes | (private) | `function fallbackEnsureCandidateScopes(ensureOp...` |
| 3130 | fn | resolveCoreCandidateScopeBridge | (private) | `function resolveCoreCandidateScopeBridge(` |
| 3191 | fn | resolveRuntimeCandidateScopeSupport | (private) | `function resolveRuntimeCandidateScopeSupport(op...` |
| 3216 | fn | mergeOptions | (private) | `function mergeOptions(baseOptions) {` |
| 3230 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope) {` |
| 3266 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(resolveOptions) {` |
| 3283 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, s...` |
| 3310 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(ensureOptions) {` |
| 3370 | fn | isObject | (private) | `function isObject(value) {` |
| 3374 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 3398 | fn | tryCollectWithSupport | (private) | `function tryCollectWithSupport(support, primary...` |
| 3417 | fn | tryEnsureWithSupport | (private) | `function tryEnsureWithSupport(support, options) {` |
| 3436 | fn | createRuntimeCandidateScopeResolvers | (private) | `function createRuntimeCandidateScopeResolvers(o...` |
| 3446 | fn | inlineCollectCoreRuntimeCandidateScopes | (private) | `function inlineCollectCoreRuntimeCandidateScope...` |
| 3460 | fn | inlineEnsureCoreRuntimeCandidateScopes | (private) | `function inlineEnsureCoreRuntimeCandidateScopes...` |
| 3513 | fn | isObject | (private) | `function isObject(value) {` |
| 3517 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 3541 | fn | createRuntimeCandidateScopeSupportFallback | (private) | `function createRuntimeCandidateScopeSupportFall...` |
| 3548 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 3552 | fn | ensureScopes | (private) | `function ensureScopes(primaryScope) {` |
| 3556 | fn | register | (private) | `function register(scope) {` |
| 3589 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope) {` |
| 3644 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(resolveOptions) {` |
| 3683 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, s...` |
| 3750 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(ensureOptions) {` |
| 3801 | fn | isObject | (private) | `function isObject(value) {` |
| 3805 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 3829 | fn | createCandidateRegistry | (private) | `function createCandidateRegistry(options) {` |
| 3834 | fn | registerCandidate | (private) | `function registerCandidate(candidate) {` |
| 3883 | fn | createRuntimeScopeBridge | (private) | `function createRuntimeScopeBridge(options) {` |
| 3887 | fn | readValue | (private) | `function readValue(name) {` |
| 3913 | fn | writeValue | (private) | `function writeValue(name, value) {` |
| 3946 | fn | declareFallbackBinding | (private) | `function declareFallbackBinding(name, factory) {` |
| 4011 | fn | isObject | (private) | `function isObject(value) {` |
| 4015 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 4039 | fn | createInlineRuntimeToolFallbacks | (private) | `function createInlineRuntimeToolFallbacks(prima...` |
| 4040 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 4044 | fn | detectScopeLocal | (private) | `function detectScopeLocal(primary) {` |
| 4068 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 4130 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 4144 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 4181 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 4203 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 4234 | fn | getCoreGlobalObject | (private) | `function getCoreGlobalObject() {` |
| 4238 | fn | ensureCoreGlobalValue | (private) | `function ensureCoreGlobalValue(name, fallbackVa...` |
| 4242 | fn | resolveStructuredCloneForScope | (private) | `function resolveStructuredCloneForScope(scope) {` |
| 4246 | fn | createResilientDeepCloneForScope | (private) | `function createResilientDeepCloneForScope(scope) {` |
| 4250 | fn | ensureDeepCloneForScope | (private) | `function ensureDeepCloneForScope(scope) {` |

