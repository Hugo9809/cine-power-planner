# legacy/scripts/modules/runtime.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 2009
- **Language:** JavaScript
- **Symbols:** 54
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _createForOfIteratorHelper | (private) | `function _createForOfIteratorHelper(r, e) { var...` |
| 2 | fn | _unsupportedIterableToArray | (private) | `function _unsupportedIterableToArray(r, a) { if...` |
| 3 | fn | _arrayLikeToArray | (private) | `function _arrayLikeToArray(r, a) { (null == a |...` |
| 4 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 6 | fn | detectHelperScope | (private) | `function detectHelperScope() {` |
| 21 | fn | resolveRuntimeEnvironmentHelpers | (private) | `function resolveRuntimeEnvironmentHelpers() {` |
| 33 | fn | pushCandidate | (private) | `function pushCandidate(scope) {` |
| 61 | fn | invokeEnvironmentHelper | (private) | `function invokeEnvironmentHelper(helperName, ar...` |
| 77 | fn | fallbackDetectGlobalScope | (private) | `function fallbackDetectGlobalScope() {` |
| 102 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 114 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 129 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 145 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 161 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals(scope) {` |
| 177 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 190 | fn | resolveModuleLinker | (private) | `function resolveModuleLinker(scope) {` |
| 213 | fn | resolveModuleSystem | (private) | `function resolveModuleSystem(scope) {` |
| 227 | fn | resolveEnvironmentContext | (private) | `function resolveEnvironmentContext(scope) {` |
| 241 | fn | detectWithContext | (private) | `function detectWithContext() {` |
| 290 | fn | collectCandidateScopes | (private) | `function collectCandidateScopes(scope) {` |
| 356 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 399 | fn | fallbackResolveModuleRegistry | (private) | `function fallbackResolveModuleRegistry(scope) {` |
| 447 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 562 | fn | cloneOptions | (private) | `function cloneOptions(options) {` |
| 574 | fn | normalizeModuleName | (private) | `function normalizeModuleName(name) {` |
| 577 | fn | removePendingQueueEntries | (private) | `function removePendingQueueEntries(queue, modul...` |
| 594 | fn | queueModuleRegistration | (private) | `function queueModuleRegistration(name, api, opt...` |
| 670 | fn | attemptRegistryRegistration | (private) | `function attemptRegistryRegistration(name, api,...` |
| 727 | fn | fallbackRegisterOrQueue | (private) | `function fallbackRegisterOrQueue(name, api, opt...` |
| 812 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 852 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 894 | fn | fallbackResolveSeenTracker | (private) | `function fallbackResolveSeenTracker(seen) {` |
| 929 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 1057 | fn | enforceShallowFreeze | (private) | `function enforceShallowFreeze(target) {` |
| 1129 | fn | ensureDeepFrozen | (private) | `function ensureDeepFrozen(value) {` |
| 1145 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 1181 | fn | ensureRegistryBinding | (private) | `function ensureRegistryBinding(scope, registry) {` |
| 1237 | fn | getPendingQueueFromScope | (private) | `function getPendingQueueFromScope(scope, queueK...` |
| 1249 | fn | requeuePendingEntry | (private) | `function requeuePendingEntry(queue, entry) {` |
| 1264 | fn | flushPendingModuleQueues | (private) | `function flushPendingModuleQueues() {` |
| 1350 | fn | synchronizeModuleLinks | (private) | `function synchronizeModuleLinks() {` |
| 1407 | fn | _inspectModuleConnections | (private) | `function _inspectModuleConnections() {` |
| 1510 | fn | fallbackExposeGlobal | (private) | `function fallbackExposeGlobal(name, value) {` |
| 1592 | fn | resolveModule | (private) | `function resolveModule(name) {` |
| 1627 | fn | ensureModule | (private) | `function ensureModule(name) {` |
| 1638 | fn | parsePath | (private) | `function parsePath(path) {` |
| 1647 | fn | inspectFunctionPath | (private) | `function inspectFunctionPath(root, path, missin...` |
| 1668 | fn | inspectPersistenceModule | (private) | `function inspectPersistenceModule(persistenceMo...` |
| 1707 | fn | inspectOfflineFunctions | (private) | `function inspectOfflineFunctions(module, missin...` |
| 1719 | fn | inspectUiControllers | (private) | `function inspectUiControllers(uiModule, missing...` |
| 1756 | fn | inspectUiInteractions | (private) | `function inspectUiInteractions(uiModule, missin...` |
| 1781 | fn | inspectUiHelp | (private) | `function inspectUiHelp(uiModule, missing, detai...` |
| 1806 | fn | listCriticalChecks | (private) | `function listCriticalChecks() {` |
| 1822 | fn | verifyCriticalFlows | (private) | `function verifyCriticalFlows() {` |

