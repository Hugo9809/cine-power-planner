# legacy/scripts/core/modules/app-core/runtime.js

[← Back to Module](../modules/legacy-scripts-core-modules-app-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2920
- **Language:** JavaScript
- **Symbols:** 154
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | isObject | (private) | `function isObject(value) {` |
| 6 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 24 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 33 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 39 | fn | resolveRuntimeModuleLoader | (private) | `function resolveRuntimeModuleLoader() {` |
| 59 | fn | requireCoreRuntimeModule | (private) | `function requireCoreRuntimeModule(moduleId, opt...` |
| 70 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 110 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 118 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, s...` |
| 128 | fn | resolveRuntimeShared | (private) | `function resolveRuntimeShared(options) {` |
| 190 | fn | isObject | (private) | `function isObject(value) {` |
| 193 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 202 | fn | createFallbackScopeList | (private) | `function createFallbackScopeList(runtimeScope, ...` |
| 205 | fn | push | (private) | `function push(scope) {` |
| 230 | fn | attemptResolveRuntimeSharedNamespaceFromScope | (private) | `function attemptResolveRuntimeSharedNamespaceFr...` |
| 244 | fn | createInlineRuntimeSharedNamespace | (private) | `function createInlineRuntimeSharedNamespace(nam...` |
| 264 | fn | minimalFallbackResolveRuntimeSharedFromGlobal | (private) | `function minimalFallbackResolveRuntimeSharedFro...` |
| 290 | fn | createFallbackResolveRuntimeSharedFromGlobal | (private) | `function createFallbackResolveRuntimeSharedFrom...` |
| 320 | fn | createRuntimeSharedBootstrap | (private) | `function createRuntimeSharedBootstrap(options) {` |
| 404 | fn | isObject | (private) | `function isObject(value) {` |
| 407 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 425 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 434 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 440 | fn | registerScope | (private) | `function registerScope(scopes, scope) {` |
| 448 | fn | ensureFallbackScopes | (private) | `function ensureFallbackScopes(candidateScopes, ...` |
| 458 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 498 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 515 | fn | ensureRuntimeSharedBootstrapResolver | (private) | `function ensureRuntimeSharedBootstrapResolver(t...` |
| 521 | fn | createRuntimeSharedBootstrapContext | (private) | `function createRuntimeSharedBootstrapContext(op...` |
| 614 | fn | isObject | (private) | `function isObject(value) {` |
| 617 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 626 | fn | attemptRuntimeSharedBootstrap | (private) | `function attemptRuntimeSharedBootstrap(tools, r...` |
| 641 | fn | attemptRuntimeSharedBootstrapWithRequire | (private) | `function attemptRuntimeSharedBootstrapWithRequi...` |
| 662 | fn | appendScope | (private) | `function appendScope(scopes, scope) {` |
| 674 | fn | gatherFallbackScopes | (private) | `function gatherFallbackScopes(options) {` |
| 690 | fn | createScopedRuntimeSharedResolver | (private) | `function createScopedRuntimeSharedResolver(scop...` |
| 709 | fn | ensureRuntimeShared | (private) | `function ensureRuntimeShared(candidate, fallbac...` |
| 724 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primaryScope) {` |
| 742 | fn | ensureScope | (private) | `function ensureScope(candidate, fallbackScope) {` |
| 748 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 802 | fn | isObject | (private) | `function isObject(value) {` |
| 805 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 814 | fn | appendUniqueScope | (private) | `function appendUniqueScope(scopes, scope, seen) {` |
| 834 | fn | createRuntimeSharedBootstrapInlineFallback | (private) | `function createRuntimeSharedBootstrapInlineFall...` |
| 848 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 883 | fn | ensureBootstrapOptions | (private) | `function ensureBootstrapOptions(options, requir...` |
| 891 | fn | attemptResolveWithTools | (private) | `function attemptResolveWithTools(candidate, con...` |
| 912 | fn | ensureFallbackCreator | (private) | `function ensureFallbackCreator(resultTools, req...` |
| 926 | fn | resolveRuntimeSharedBootstrapResult | (private) | `function resolveRuntimeSharedBootstrapResult(op...` |
| 998 | fn | isObject | (private) | `function isObject(value) {` |
| 1001 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1010 | fn | createFallbackScopeList | (private) | `function createFallbackScopeList() {` |
| 1013 | fn | append | (private) | `function append(scope) {` |
| 1035 | fn | attemptResolveRuntimeSharedBootstrapResult | (private) | `function attemptResolveRuntimeSharedBootstrapRe...` |
| 1051 | fn | createInlineFallbackResult | (private) | `function createInlineFallbackResult(bootstrapOp...` |
| 1054 | fn | appendScope | (private) | `function appendScope(scope) {` |
| 1085 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 1120 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1141 | fn | requireModule | (private) | `function requireModule(modulePath) {` |
| 1239 | fn | isObject | (private) | `function isObject(value) {` |
| 1242 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1251 | fn | normalizeScope | (private) | `function normalizeScope(value) {` |
| 1254 | fn | createFallbackResolveRuntimeSharedFromGlobal | (private) | `function createFallbackResolveRuntimeSharedFrom...` |
| 1273 | fn | attemptResolveWithManager | (private) | `function attemptResolveWithManager(candidate, m...` |
| 1289 | fn | createInlineFallbackResult | (private) | `function createInlineFallbackResult(bootstrapOp...` |
| 1292 | fn | append | (private) | `function append(scope) {` |
| 1339 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1437 | fn | isObject | (private) | `function isObject(value) {` |
| 1440 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1458 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1467 | fn | appendUniqueScope | (private) | `function appendUniqueScope(scopes, scope, seen) {` |
| 1487 | fn | createRuntimeSharedBootstrapInlineFallback | (private) | `function createRuntimeSharedBootstrapInlineFall...` |
| 1501 | fn | fallbackResolveRuntimeSharedFromGlobal | (private) | `function fallbackResolveRuntimeSharedFromGlobal...` |
| 1536 | fn | createRuntimeSharedBootstrapResult | (private) | `function createRuntimeSharedBootstrapResult(opt...` |
| 1588 | fn | safeArrayMerge | (private) | `function safeArrayMerge(primary, secondary) {` |
| 1591 | fn | appendValues | (private) | `function appendValues(list) {` |
| 1607 | fn | collectFallbackScopes | (private) | `function collectFallbackScopes(options) {` |
| 1623 | fn | fallbackResolveRuntimeSharedFromScopes | (private) | `function fallbackResolveRuntimeSharedFromScopes...` |
| 1641 | fn | attemptResolveSupportModule | (private) | `function attemptResolveSupportModule(identifier...` |
| 1666 | fn | createMinimalRuntimeSharedNamespace | (private) | `function createMinimalRuntimeSharedNamespace(op...` |
| 1669 | fn | resolveFromScopes | (private) | `function resolveFromScopes() {` |
| 1680 | fn | createRuntimeSharedNamespace | (private) | `function createRuntimeSharedNamespace(options) {` |
| 1767 | fn | isObject | (private) | `function isObject(value) {` |
| 1770 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1788 | fn | ensureDocument | (private) | `function ensureDocument(candidate) {` |
| 1797 | fn | defaultCollectSelectedValues | (private) | `function defaultCollectSelectedValues() {` |
| 1800 | fn | defaultComputeMultiSelectSize | (private) | `function defaultComputeMultiSelectSize(optionCo...` |
| 1806 | fn | defaultGetCrewRoleEntries | (private) | `function defaultGetCrewRoleEntries() {` |
| 1809 | fn | defaultGetLocalizedTexts | (private) | `function defaultGetLocalizedTexts() {` |
| 1812 | fn | defaultGetDefaultLanguageTexts | (private) | `function defaultGetDefaultLanguageTexts() {` |
| 1815 | fn | createAutoGearCrewOptionHelpers | (private) | `function createAutoGearCrewOptionHelpers(option...` |
| 1823 | fn | refreshCrewOptions | (private) | `function refreshCrewOptions(selectElement, sele...` |
| 1861 | fn | getCrewRoleLabel | (private) | `function getCrewRoleLabel(value) {` |
| 1897 | fn | isObject | (private) | `function isObject(value) {` |
| 1900 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 1903 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 1921 | fn | ensureScope | (private) | `function ensureScope(candidate, fallback) {` |
| 1927 | fn | ensureRequireFn | (private) | `function ensureRequireFn(candidate) {` |
| 1936 | fn | ensureResolveCoreSupportModule | (private) | `function ensureResolveCoreSupportModule(candida...` |
| 1974 | fn | createFallbackRuntimeCandidateScopeSupport | (private) | `function createFallbackRuntimeCandidateScopeSup...` |
| 1977 | fn | registerScope | (private) | `function registerScope(scopes, seenScopes, scop...` |
| 1997 | fn | detectFallbackGlobalScope | (private) | `function detectFallbackGlobalScope(primaryScope) {` |
| 2000 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary...` |
| 2020 | fn | fallbackResolveCandidateScopes | (private) | `function fallbackResolveCandidateScopes(resolve...` |
| 2041 | fn | fallbackSyncCandidateScopes | (private) | `function fallbackSyncCandidateScopes(candidateS...` |
| 2070 | fn | fallbackEnsureCandidateScopes | (private) | `function fallbackEnsureCandidateScopes(ensureOp...` |
| 2082 | fn | resolveCoreCandidateScopeBridge | (private) | `function resolveCoreCandidateScopeBridge(resolv...` |
| 2123 | fn | resolveRuntimeCandidateScopeSupport | (private) | `function resolveRuntimeCandidateScopeSupport(op...` |
| 2135 | fn | mergeOptions | (private) | `function mergeOptions(baseOptions) {` |
| 2145 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope) {` |
| 2170 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(resolveOptions) {` |
| 2184 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, s...` |
| 2202 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(ensureOptions) {` |
| 2245 | fn | isObject | (private) | `function isObject(value) {` |
| 2248 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2266 | fn | tryCollectWithSupport | (private) | `function tryCollectWithSupport(support, primary...` |
| 2281 | fn | tryEnsureWithSupport | (private) | `function tryEnsureWithSupport(support, options) {` |
| 2296 | fn | createRuntimeCandidateScopeResolvers | (private) | `function createRuntimeCandidateScopeResolvers(o...` |
| 2299 | fn | inlineCollectCoreRuntimeCandidateScopes | (private) | `function inlineCollectCoreRuntimeCandidateScope...` |
| 2310 | fn | inlineEnsureCoreRuntimeCandidateScopes | (private) | `function inlineEnsureCoreRuntimeCandidateScopes...` |
| 2346 | fn | isObject | (private) | `function isObject(value) {` |
| 2349 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2367 | fn | createRuntimeCandidateScopeSupportFallback | (private) | `function createRuntimeCandidateScopeSupportFall...` |
| 2373 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 2376 | fn | ensureScopes | (private) | `function ensureScopes(primaryScope) {` |
| 2379 | fn | register | (private) | `function register(scope) {` |
| 2405 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope) {` |
| 2438 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(resolveOptions) {` |
| 2466 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, s...` |
| 2510 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(ensureOptions) {` |
| 2541 | fn | isObject | (private) | `function isObject(value) {` |
| 2544 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2562 | fn | createCandidateRegistry | (private) | `function createCandidateRegistry(options) {` |
| 2566 | fn | registerCandidate | (private) | `function registerCandidate(candidate) {` |
| 2606 | fn | createRuntimeScopeBridge | (private) | `function createRuntimeScopeBridge(options) {` |
| 2609 | fn | readValue | (private) | `function readValue(name) {` |
| 2631 | fn | writeValue | (private) | `function writeValue(name, value) {` |
| 2659 | fn | declareFallbackBinding | (private) | `function declareFallbackBinding(name, factory) {` |
| 2702 | fn | isObject | (private) | `function isObject(value) {` |
| 2705 | fn | detectScope | (private) | `function detectScope(primaryScope) {` |
| 2723 | fn | createInlineRuntimeToolFallbacks | (private) | `function createInlineRuntimeToolFallbacks(prima...` |
| 2724 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 2727 | fn | detectScopeLocal | (private) | `function detectScopeLocal(primary) {` |
| 2745 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 2794 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 2805 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 2837 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 2854 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 2879 | fn | getCoreGlobalObject | (private) | `function getCoreGlobalObject() {` |
| 2882 | fn | ensureCoreGlobalValue | (private) | `function ensureCoreGlobalValue(name, fallbackVa...` |
| 2885 | fn | resolveStructuredCloneForScope | (private) | `function resolveStructuredCloneForScope(scope) {` |
| 2888 | fn | createResilientDeepCloneForScope | (private) | `function createResilientDeepCloneForScope(scope) {` |
| 2891 | fn | ensureDeepCloneForScope | (private) | `function ensureDeepCloneForScope(scope) {` |

