# src/scripts/core/modules/core/runtime.js

[← Back to Module](../modules/src-scripts-core-modules-core/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 4250
- **Language:** JavaScript
- **Symbols:** 155
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 3 | fn | getModuleDirectory | (private) | `function getModuleDirectory(moduleId) {` |
| 9 | fn | normalizeFromDir | (private) | `function normalizeFromDir(moduleDir, request) {` |
| 34 | fn | isScope | (private) | `function isScope(candidate) {` |
| 38 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(options) {` |
| 41 | fn | register | (private) | `function register(scope) {` |
| 81 | fn | readRuntimeNamespaceFromScope | (private) | `function readRuntimeNamespaceFromScope(scope) {` |
| 96 | fn | tryRequireRuntimeNamespace | (private) | `function tryRequireRuntimeNamespace() {` |
| 118 | fn | resolveCoreRuntimeModulesNamespace | (private) | `function resolveCoreRuntimeModulesNamespace(opt...` |
| 139 | fn | resolveCoreRuntimeModule | (private) | `function resolveCoreRuntimeModule(moduleId, opt...` |
| 197 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 201 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 205 | fn | registerScope | (private) | `function registerScope(scopes, seenScopes, scop...` |
| 231 | fn | detectFallbackGlobalScope | (private) | `function detectFallbackGlobalScope(primaryScope) {` |
| 255 | fn | collectCandidateScopesWithFallback | (private) | `function collectCandidateScopesWithFallback(pri...` |
| 289 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(options) {` |
| 327 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, o...` |
| 375 | fn | ensureCandidateScopes | (private) | `function ensureCandidateScopes(options) {` |
| 416 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 420 | fn | detectGlobalScope | (private) | `function detectGlobalScope(primary) {` |
| 444 | fn | toArray | (private) | `function toArray(value) {` |
| 456 | fn | normaliseLanguageInput | (private) | `function normaliseLanguageInput(lang) {` |
| 471 | fn | createLocalizationRuntime | (private) | `function createLocalizationRuntime(options) {` |
| 495 | fn | resolveLocaleModule | (private) | `function resolveLocaleModule() {` |
| 754 | fn | collectTranslationScopeCandidates | (private) | `function collectTranslationScopeCandidates() {` |
| 758 | fn | register | (private) | `function register(scope) {` |
| 797 | fn | resolveTranslationDataset | (private) | `function resolveTranslationDataset() {` |
| 835 | fn | fallbackGetLanguageTexts | (private) | `function fallbackGetLanguageTexts(lang) {` |
| 894 | fn | resolveExistingGetLanguageTexts | (private) | `function resolveExistingGetLanguageTexts() {` |
| 942 | fn | ensureGlobalGetLanguageTextsAvailability | (private) | `function ensureGlobalGetLanguageTextsAvailabili...` |
| 1015 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 1019 | fn | readCoreGlobalScope | (private) | `function readCoreGlobalScope() {` |
| 1043 | fn | getPrimaryScopeCandidate | (private) | `function getPrimaryScopeCandidate(explicitCandi...` |
| 1056 | fn | appendCandidate | (private) | `function appendCandidate(target, candidate) {` |
| 1070 | fn | readDefaultGlobalScopes | (private) | `function readDefaultGlobalScopes() {` |
| 1092 | fn | getScopeCandidates | (private) | `function getScopeCandidates(options) {` |
| 1129 | fn | detectFirstAvailableScope | (private) | `function detectFirstAvailableScope(primaryCandi...` |
| 1147 | fn | resolveAttachmentScope | (private) | `function resolveAttachmentScope() {` |
| 1195 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 1219 | fn | registerCandidateScope | (private) | `function registerCandidateScope(scopes, scope) {` |
| 1237 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(primaryScope, e...` |
| 1285 | fn | isScopeList | (private) | `function isScopeList(candidate) {` |
| 1289 | fn | readCandidateScopesFromScope | (private) | `function readCandidateScopesFromScope(scope) {` |
| 1306 | fn | syncCandidateScopes | (private) | `function syncCandidateScopes(candidateScopes, p...` |
| 1334 | fn | resolveCandidateScopes | (private) | `function resolveCandidateScopes(primaryScope, e...` |
| 1352 | fn | registerScope | (private) | `function registerScope(runtimeState, scope) {` |
| 1364 | fn | registerScopes | (private) | `function registerScopes(runtimeState, candidate...` |
| 1374 | fn | getScopesSnapshot | (private) | `function getScopesSnapshot(runtimeState, candid...` |
| 1393 | fn | ensurePrimaryScope | (private) | `function ensurePrimaryScope(runtimeState, candi...` |
| 1417 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(runtimeState...` |
| 1433 | fn | readValue | (private) | `function readValue(runtimeState, name, candidat...` |
| 1462 | fn | ensureValue | (private) | `function ensureValue(runtimeState, name, fallba...` |
| 1513 | fn | normaliseValue | (private) | `function normaliseValue(runtimeState, name, val...` |
| 1599 | fn | isObject | (private) | `function isObject(value) {` |
| 1603 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 1627 | fn | readResolutionFromScope | (private) | `function readResolutionFromScope(namespaceName,...` |
| 1642 | fn | loadRuntimeSupportResolution | (private) | `function loadRuntimeSupportResolution(primarySc...` |
| 1681 | fn | ensureFallbackDetectRuntimeScope | (private) | `function ensureFallbackDetectRuntimeScope(resol...` |
| 1711 | fn | ensureFallbackResolveCoreSupportModule | (private) | `function ensureFallbackResolveCoreSupportModule...` |
| 1745 | fn | readRuntimeSupportTools | (private) | `function readRuntimeSupportTools(primaryScope) {` |
| 1788 | fn | resolveBootstrap | (private) | `function resolveBootstrap(primaryScope) {` |
| 1796 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 1805 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 1861 | fn | isScopeCandidate | (private) | `function isScopeCandidate(value) {` |
| 1865 | fn | getRuntimeScopeCandidates | (private) | `function getRuntimeScopeCandidates(primaryScope) {` |
| 1908 | fn | fallbackDetectRuntimeScope | (private) | `function fallbackDetectRuntimeScope(primaryScop...` |
| 1921 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 1950 | fn | readRuntimeSupportResolver | (private) | `function readRuntimeSupportResolver(primaryScop...` |
| 1953 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(scopeCandidate) {` |
| 1959 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 2011 | fn | fallbackDetectRuntimeScope | (private) | `function fallbackDetectRuntimeScope(primaryScop...` |
| 2038 | fn | fallbackResolveCoreSupportModule | (private) | `function fallbackResolveCoreSupportModule(names...` |
| 2067 | fn | ensureCoreSupportResolver | (private) | `function ensureCoreSupportResolver(primaryScope) {` |
| 2070 | fn | readFromScope | (private) | `function readFromScope(candidateScope) {` |
| 2126 | fn | readRuntimeSupportResolver | (private) | `function readRuntimeSupportResolver(primaryScop...` |
| 2187 | fn | isValidScope | (private) | `function isValidScope(scope) {` |
| 2191 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 2215 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 2277 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 2291 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 2328 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 2350 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 2379 | fn | createRuntimeToolFallbacks | (private) | `function createRuntimeToolFallbacks(primary) {` |
| 2382 | fn | getCoreGlobalObject | (private) | `function getCoreGlobalObject() {` |
| 2386 | fn | ensureCoreGlobalValue | (private) | `function ensureCoreGlobalValue(name, fallbackVa...` |
| 2390 | fn | resolveStructuredCloneForScope | (private) | `function resolveStructuredCloneForScope(scope) {` |
| 2394 | fn | createResilientDeepCloneForScope | (private) | `function createResilientDeepCloneForScope(scope) {` |
| 2398 | fn | ensureDeepCloneForScope | (private) | `function ensureDeepCloneForScope(scope) {` |
| 2452 | fn | detectGlobalScope | (private) | `function detectGlobalScope() {` |
| 2469 | fn | collectEnvironmentHelperScopes | (private) | `function collectEnvironmentHelperScopes(primary) {` |
| 2472 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 2493 | fn | resolveEnvironmentHelpers | (private) | `function resolveEnvironmentHelpers() {` |
| 2539 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 2570 | fn | jsonDeepClone | (private) | `function jsonDeepClone(value) {` |
| 2584 | fn | resolveStructuredClone | (private) | `function resolveStructuredClone(primary) {` |
| 2621 | fn | createResilientDeepClone | (private) | `function createResilientDeepClone(primary) {` |
| 2643 | fn | ensureGlobalValue | (private) | `function ensureGlobalValue(name, fallbackValue,...` |
| 2703 | fn | ensureDeepClone | (private) | `function ensureDeepClone(primary) {` |
| 2771 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 2791 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 2799 | fn | fallbackHasArrayEntry | (private) | `function fallbackHasArrayEntry(array, value) {` |
| 2813 | fn | fallbackRegisterSafeFreezeEntry | (private) | `function fallbackRegisterSafeFreezeEntry(regist...` |
| 2834 | fn | fallbackCreateSafeFreezeRegistry | (private) | `function fallbackCreateSafeFreezeRegistry(initi...` |
| 2850 | fn | fallbackEnsureSafeFreezeRegistry | (private) | `function fallbackEnsureSafeFreezeRegistry(regis...` |
| 2858 | fn | fallbackHasSafeFreezeEntry | (private) | `function fallbackHasSafeFreezeEntry(registry, v...` |
| 2875 | fn | fallbackResolveTemperatureKeyDefaults | (private) | `function fallbackResolveTemperatureKeyDefaults() {` |
| 2905 | fn | fallbackCreateLocalRuntimeState | (private) | `function fallbackCreateLocalRuntimeState(candid...` |
| 2925 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 2956 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 2970 | fn | getScopes | (private) | `function getScopes() {` |
| 2974 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 2978 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 3019 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 3045 | fn | readValue | (private) | `function readValue(name) {` |
| 3066 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 3117 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 3130 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 3159 | fn | loadModuleFromRegistry | (private) | `function loadModuleFromRegistry(name) {` |
| 3180 | fn | loadModule | (private) | `function loadModule(name, requirePath) {` |
| 3283 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 3303 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 3311 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 3347 | fn | resolveTemperatureKeysModule | (private) | `function resolveTemperatureKeysModule() {` |
| 3411 | fn | createLocalRuntimeState | (private) | `function createLocalRuntimeState(candidateScope...` |
| 3426 | fn | registerScope | (private) | `function registerScope(scope) {` |
| 3457 | fn | withEachScope | (private) | `function withEachScope(callback) {` |
| 3471 | fn | getScopes | (private) | `function getScopes() {` |
| 3475 | fn | getPrimaryScope | (private) | `function getPrimaryScope() {` |
| 3479 | fn | ensureValue | (private) | `function ensureValue(name, fallbackValue) {` |
| 3520 | fn | normaliseValue | (private) | `function normaliseValue(name, validator, fallba...` |
| 3546 | fn | readValue | (private) | `function readValue(name) {` |
| 3567 | fn | assignTemperatureRenderer | (private) | `function assignTemperatureRenderer(renderer) {` |
| 3618 | fn | getAssignedTemperatureRenderer | (private) | `function getAssignedTemperatureRenderer() {` |
| 3631 | fn | setAutoGearGuards | (private) | `function setAutoGearGuards(nextGuards) {` |
| 3660 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 3696 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 3716 | fn | fallbackHasArrayEntry | (private) | `function fallbackHasArrayEntry(array, value) {` |
| 3730 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 3766 | fn | registerSafeFreezeEntry | (private) | `function registerSafeFreezeEntry(registry, valu...` |
| 3787 | fn | createSafeFreezeRegistry | (private) | `function createSafeFreezeRegistry(initialValues) {` |
| 3803 | fn | ensureSafeFreezeRegistry | (private) | `function ensureSafeFreezeRegistry(registry, ini...` |
| 3811 | fn | hasSafeFreezeEntry | (private) | `function hasSafeFreezeEntry(registry, value) {` |
| 3828 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 3867 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 3887 | fn | detectScope | (private) | `function detectScope(primary) {` |
| 3895 | fn | hasArrayEntry | (private) | `function hasArrayEntry(array, value) {` |
| 3909 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 3946 | fn | detectAmbientScope | (private) | `function detectAmbientScope() {` |
| 3966 | fn | fallbackDetectScope | (private) | `function fallbackDetectScope(primary) {` |
| 3974 | fn | resolveScopeUtils | (private) | `function resolveScopeUtils() {` |
| 4010 | fn | resolveTemperatureKeyDefaults | (private) | `function resolveTemperatureKeyDefaults() {` |
| 4040 | fn | assignToGlobal | (private) | `function assignToGlobal(namespace) {` |
| 4076 | fn | detectRuntimeScope | (private) | `function detectRuntimeScope(primaryScope) {` |
| 4114 | fn | resolveCoreSupportModule | (private) | `function resolveCoreSupportModule(namespaceName...` |
| 4180 | fn | loadModule | (private) | `function loadModule(moduleId) {` |
| 4195 | fn | localRequire | (private) | `function localRequire(request) {` |

