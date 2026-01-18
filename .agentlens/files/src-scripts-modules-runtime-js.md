# src/scripts/modules/runtime.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2500
- **Language:** JavaScript
- **Symbols:** 57
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 5 | fn | detectHelperScope | (private) | `function detectHelperScope() {` |
| 21 | fn | resolveRuntimeEnvironmentHelpers | (private) | `function resolveRuntimeEnvironmentHelpers() {` |
| 34 | fn | pushCandidate | (private) | `function pushCandidate(scope) {` |
| 82 | fn | invokeEnvironmentHelper | (private) | `function invokeEnvironmentHelper(helperName, ar...` |
| 108 | fn | fallbackDetectGlobalScope | (private) | `function fallbackDetectGlobalScope() {` |
| 137 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 153 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 171 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 175 | fn | localFallback | (private) | `function localFallback() {` |
| 195 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 199 | fn | localFallback | (private) | `function localFallback() {` |
| 219 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals(scope) {` |
| 223 | fn | localFallback | (private) | `function localFallback() {` |
| 243 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 247 | fn | localFallback | (private) | `function localFallback() {` |
| 262 | fn | resolveModuleLinker | (private) | `function resolveModuleLinker(scope) {` |
| 266 | fn | localFallback | (private) | `function localFallback() {` |
| 295 | fn | resolveModuleSystem | (private) | `function resolveModuleSystem(scope) {` |
| 299 | fn | localFallback | (private) | `function localFallback() {` |
| 318 | fn | resolveEnvironmentContext | (private) | `function resolveEnvironmentContext(scope) {` |
| 322 | fn | localFallback | (private) | `function localFallback() {` |
| 341 | fn | detectWithContext | (private) | `function detectWithContext() {` |
| 404 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(scope) {` |
| 502 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 555 | fn | fallbackResolveModuleRegistry | (private) | `function fallbackResolveModuleRegistry(scope) {` |
| 612 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 742 | fn | cloneOptions | (private) | `function cloneOptions(options) {` |
| 757 | fn | normalizeModuleName | (private) | `function normalizeModuleName(name) {` |
| 761 | fn | removePendingQueueEntries | (private) | `function removePendingQueueEntries(queue, modul...` |
| 781 | fn | queueModuleRegistration | (private) | `function queueModuleRegistration(name, api, opt...` |
| 869 | fn | attemptRegistryRegistration | (private) | `function attemptRegistryRegistration(name, api,...` |
| 908 | fn | fallbackRegisterOrQueue | (private) | `function fallbackRegisterOrQueue(name, api, opt...` |
| 1016 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 1073 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 1135 | fn | fallbackResolveSeenTracker | (private) | `function fallbackResolveSeenTracker(seen) {` |
| 1174 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 1324 | fn | enforceShallowFreeze | (private) | `function enforceShallowFreeze(target) {` |
| 1413 | fn | ensureDeepFrozen | (private) | `function ensureDeepFrozen(value) {` |
| 1432 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 1475 | fn | ensureRegistryBinding | (private) | `function ensureRegistryBinding(scope, registry) {` |
| 1514 | fn | getPendingQueueFromScope | (private) | `function getPendingQueueFromScope(scope, queueK...` |
| 1528 | fn | requeuePendingEntry | (private) | `function requeuePendingEntry(queue, entry) {` |
| 1546 | fn | flushPendingModuleQueues | (private) | `function flushPendingModuleQueues(options = {}) {` |
| 1650 | fn | synchronizeModuleLinks | (private) | `function synchronizeModuleLinks(options = {}) {` |
| 1725 | fn | inspectModuleConnections | (private) | `function inspectModuleConnections(options = {}) {` |
| 1834 | fn | fallbackExposeGlobal | (private) | `function fallbackExposeGlobal(name, value) {` |
| 2008 | fn | resolveModule | (private) | `function resolveModule(name) {` |
| 2047 | fn | ensureModule | (private) | `function ensureModule(name, options = {}) {` |
| 2058 | fn | parsePath | (private) | `function parsePath(path) {` |
| 2068 | fn | inspectFunctionPath | (private) | `function inspectFunctionPath(root, path, missin...` |
| 2092 | fn | inspectPersistenceModule | (private) | `function inspectPersistenceModule(persistenceMo...` |
| 2144 | fn | inspectOfflineFunctions | (private) | `function inspectOfflineFunctions(module, missin...` |
| 2157 | fn | inspectUiControllers | (private) | `function inspectUiControllers(uiModule, missing...` |
| 2203 | fn | inspectUiInteractions | (private) | `function inspectUiInteractions(uiModule, missin...` |
| 2235 | fn | inspectUiHelp | (private) | `function inspectUiHelp(uiModule, missing, detai...` |
| 2267 | fn | listCriticalChecks | (private) | `function listCriticalChecks() {` |
| 2282 | fn | verifyCriticalFlows | (private) | `function verifyCriticalFlows(options = {}) {` |

