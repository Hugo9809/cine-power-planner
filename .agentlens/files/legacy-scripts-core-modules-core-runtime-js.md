# legacy/scripts/core/modules/core/runtime.js

[← Back to Module](../modules/legacy-scripts-core-modules-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3132
- **Language:** JavaScript
- **Symbols:** 156
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | getModuleDirectory | (private) | `function getModuleDirectory(moduleId) {` |
| 8 | fn | normalizeFromDir | (private) | `function normalizeFromDir(moduleDir, request) {` |
| 30 | fn | isScope | (private) | `function isScope(candidate) {` |
| 33 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(options) {` |
| 35 | fn | register | (private) | `function register(scope) {` |
| 65 | fn | readRuntimeNamespaceFromScope | (private) | `function readRuntimeNamespaceFromScope(scope) {` |
| 77 | fn | tryRequireRuntimeNamespace | (private) | `function tryRequireRuntimeNamespace() {` |
| 95 | fn | resolveCoreRuntimeModulesNamespace | (private) | `function resolveCoreRuntimeModulesNamespace(opt...` |
| 108 | fn | resolveCoreRuntimeModule | (private) | `function resolveCoreRuntimeModule(moduleId, opt...` |
| 154 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 157 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 160 | fn | registerScope | (private) | `function registerScope(scopes, seenScopes, scop...` |
| 180 | fn | detectFallbackGlobalScope | (private) | `function detectFallbackGlobalScope(primaryScope) {` |
| 198 | fn | collectCandidateScopesWithFallback | (private) | `function collectCandidateScopesWithFallback(pri...` |
| 218 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(options) {` |
| 240 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, o...` |
| 270 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(options) {` |
| 302 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 305 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primary) {` |
| 323 | fn | toArray | (private) | `function toArray(value) {` |
| 332 | fn | normaliseLanguageInput | (private) | `function normaliseLanguageInput(lang) {` |
| 345 | fn | createLocalizationRuntime | (private) | `function createLocalizationRuntime(options) {` |
| 358 | fn | resolveLocaleModule | (private) | `function resolveLocaleModule() {` |
| 515 | fn | collectTranslationScopeCandidates | (private) | `function collectTranslationScopeCandidates() {` |
| 518 | fn | register | (private) | `function register(scope) {` |
| 548 | fn | resolveTranslationDataset | (private) | `function resolveTranslationDataset() {` |
| 573 | fn | fallbackGetLanguageTexts | (private) | `function fallbackGetLanguageTexts(lang) {` |
| 610 | fn | resolveExistingGetLanguageTexts | (private) | `function resolveExistingGetLanguageTexts() {` |
| 645 | fn | ensureGlobalGetLanguageTextsAvailability | (private) | `function ensureGlobalGetLanguageTextsAvailabili...` |
| 704 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 707 | fn | readCoreGlobalScope | (private) | `function readCoreGlobalScope() {` |
| 724 | fn | getPrimaryScopeCandidate | (private) | `function getPrimaryScopeCandidate(explicitCandi...` |
| 734 | fn | appendCandidate | (private) | `function appendCandidate(target, candidate) {` |
| 745 | fn | readDefaultGlobalScopes | (private) | `function readDefaultGlobalScopes() {` |
| 761 | fn | getScopeCandidates | (private) | `function getScopeCandidates(options) {` |
| 787 | fn | detectFirstAvailableScope | (private) | `function detectFirstAvailableScope(primaryCandi...` |
| 802 | fn | resolveAttachmentScope | (private) | `function resolveAttachmentScope() {` |
| 841 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 859 | fn | registerCandidateScope | (private) | `function registerCandidateScope(scopes, scope) {` |
| 873 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, e...` |
| 907 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 910 | fn | readCandidateScopesFromScope | (private) | `function readCandidateScopesFromScope(scope) {` |
| 923 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, p...` |
| 945 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(primaryScope, e...` |
| 954 | fn | registerScope | (private) | `function registerScope(runtimeState, scope) {` |
| 964 | fn | registerScopes | (private) | `function registerScopes(runtimeState, candidate...` |
| 972 | fn | getScopesSnapshot | (private) | `function getScopesSnapshot(runtimeState, candid...` |
| 988 | fn | ensurePrimaryScope | (private) | `function ensurePrimaryScope(runtimeState, candi...` |
| 1009 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(runtimeState...` |
| 1022 | fn | readValue | (private) | `function readValue(runtimeState, name, candidat...` |
| 1046 | fn | ensureValue | (private) | `function ensureValue(runtimeState, name, fallba...` |
| 1087 | fn | normaliseValue | (private) | `function normaliseValue(runtimeState, name, val...` |
| 1152 | fn | isObject | (private) | `function isObject(value) {` |
| 1155 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 1173 | fn | readResolutionFromScope | (private) | `function readResolutionFromScope(namespaceName,...` |
| 1185 | fn | loadRuntimeSupportResolution | (private) | `function loadRuntimeSupportResolution(primarySc...` |
| 1212 | fn | ensureFallbackDetectRuntimeScope | (private) | `function ensureFallbackDetectRuntimeScope(resol...` |
| 1235 | fn | ensureFallbackResolveCoreSupportModule | (private) | `function ensureFallbackResolveCoreSupportModule...` |
| 1260 | fn | readRuntimeSupportTools | (private) | `function readRuntimeSupportTools(primaryScope) {` |
| 1278 | fn | resolveBootstrap | (private) | `function resolveBootstrap(primaryScope) {` |
| 1284 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 1288 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 1331 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 1334 | fn | getRuntimeScopeCandidates | (private) | `function getRuntimeScopeCandidates(primaryScope) {` |
| 1369 | fn | fallbackDetectRuntimeScope | (private) | `function fallbackDetectRuntimeScope(primaryScop...` |
| 1379 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 1399 | fn | readRuntimeSupportResolver | (private) | `function readRuntimeSupportResolver(primaryScop...` |
| 1401 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(scopeCandidate) {` |
| 1404 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 1444 | fn | fallbackDetectRuntimeScope | (private) | `function fallbackDetectRuntimeScope(primaryScop...` |
| 1462 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 1482 | fn | ensureCoreSupportResolver | (private) | `function ensureCoreSupportResolver(primaryScope) {` |
| 1484 | fn | readFromScope | (private) | `function readFromScope(candidateScope) {` |
| 1522 | fn | readRuntimeSupportResolver | (private) | `function readRuntimeSupportResolver(primaryScop...` |
| 1565 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 1568 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 1586 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 1635 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 1646 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 1678 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 1695 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 1719 | fn | createRuntimeToolFallbacks | (private) | `function createRuntimeToolFallbacks(primary) {` |
| 1721 | fn | getCoreGlobalObject | (private) | `function getCoreGlobalObject() {` |
| 1724 | fn | ensureCoreGlobalValue | (private) | `function ensureCoreGlobalValue(name, fallbackVa...` |
| 1727 | fn | resolveStructuredCloneForScope | (private) | `function resolveStructuredCloneForScope(scope) {` |
| 1730 | fn | createResilientDeepCloneForScope | (private) | `function createResilientDeepCloneForScope(scope) {` |
| 1733 | fn | ensureDeepCloneForScope | (private) | `function ensureDeepCloneForScope(scope) {` |
| 1775 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 1790 | fn | collectEnvironmentHelperScopes | (private) | `function collectEnvironmentHelperScopes(primary) {` |
| 1792 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 1808 | fn | resolveEnvironmentHelpers | (private) | `function resolveEnvironmentHelpers() {` |
| 1841 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 1863 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 1874 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 1906 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 1923 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 1972 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 2027 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2042 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 2048 | fn | fallbackHasArrayEntry | (private) | `function fallbackHasArrayEntry(array, value) {` |
| 2059 | fn | fallbackRegisterSafeFreezeEntry | (private) | `function fallbackRegisterSafeFreezeEntry(regist...` |
| 2076 | fn | fallbackCreateSafeFreezeRegistry | (private) | `function fallbackCreateSafeFreezeRegistry(initi...` |
| 2089 | fn | fallbackEnsureSafeFreezeRegistry | (private) | `function fallbackEnsureSafeFreezeRegistry(regis...` |
| 2095 | fn | fallbackHasSafeFreezeEntry | (private) | `function fallbackHasSafeFreezeEntry(registry, v...` |
| 2109 | fn | fallbackResolveTemperatureKeyDefaults | (private) | `function fallbackResolveTemperatureKeyDefaults() {` |
| 2134 | fn | fallbackCreateLocalRuntimeState | (private) | `function fallbackCreateLocalRuntimeState(candid...` |
| 2142 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 2168 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 2180 | fn | getScopes | (private) | `function getScopes() {` |
| 2183 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 2186 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 2219 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 2236 | fn | readValue | (private) | `function readValue(name) {` |
| 2253 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 2292 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 2303 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 2328 | fn | loadModuleFromRegistry | (private) | `function loadModuleFromRegistry(name) {` |
| 2346 | fn | loadModule | (private) | `function loadModule(name, requirePath) {` |
| 2404 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2419 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 2425 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 2452 | fn | resolveTemperatureKeysModule | (private) | `function resolveTemperatureKeysModule() {` |
| 2503 | fn | createLocalRuntimeState | (private) | `function createLocalRuntimeState(candidateScope...` |
| 2510 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 2536 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 2548 | fn | getScopes | (private) | `function getScopes() {` |
| 2551 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 2554 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 2587 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 2604 | fn | readValue | (private) | `function readValue(name) {` |
| 2621 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 2660 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 2671 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 2696 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 2721 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2736 | fn | fallbackHasArrayEntry | (private) | `function fallbackHasArrayEntry(array, value) {` |
| 2747 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 2774 | fn | registerSafeFreezeEntry | (private) | `function registerSafeFreezeEntry(registry, valu...` |
| 2791 | fn | createSafeFreezeRegistry | (private) | `function createSafeFreezeRegistry(initialValues) {` |
| 2804 | fn | ensureSafeFreezeRegistry | (private) | `function ensureSafeFreezeRegistry(registry, ini...` |
| 2810 | fn | hasSafeFreezeEntry | (private) | `function hasSafeFreezeEntry(registry, value) {` |
| 2824 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 2852 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2867 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 2873 | fn | hasArrayEntry | (private) | `function hasArrayEntry(array, value) {` |
| 2884 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 2910 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2925 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 2931 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 2958 | fn | resolveTemperatureKeyDefaults | (private) | `function resolveTemperatureKeyDefaults() {` |
| 2983 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 3008 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(primaryScope) {` |
| 3034 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 3080 | fn | loadModule | (private) | `function loadModule(moduleId) {` |
| 3093 | fn | localRequire | (private) | `function localRequire(request) {` |

