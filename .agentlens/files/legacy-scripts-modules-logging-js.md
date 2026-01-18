# legacy/scripts/modules/logging.js

[← Back to Module](../modules/root/MODULE.md) | [← Back to INDEX](../INDEX.md)

## Overview

- **Lines:** 3363
- **Language:** JavaScript
- **Symbols:** 109
- **Public symbols:** 0

## Symbol Table

| Line | Kind | Name | Visibility | Signature |
| ---- | ---- | ---- | ---------- | --------- |
| 1 | fn | _typeof | (private) | `function _typeof(o) { "@babel/helpers - typeof"...` |
| 3 | fn | fallbackDetectGlobalScope | (private) | `function fallbackDetectGlobalScope() {` |
| 18 | fn | fallbackCollectCandidateScopes | (private) | `function fallbackCollectCandidateScopes(primary) {` |
| 20 | fn | pushScope | (private) | `function pushScope(scope) {` |
| 35 | fn | loggingResolveStructuredClone | (private) | `function loggingResolveStructuredClone(scope) {` |
| 66 | fn | loggingJsonDeepClone | (private) | `function loggingJsonDeepClone(value) {` |
| 98 | fn | fallbackLoadModuleEnvironment | (private) | `function fallbackLoadModuleEnvironment(scope) {` |
| 115 | fn | fallbackLoadEnvironmentBridge | (private) | `function fallbackLoadEnvironmentBridge(scope) {` |
| 132 | fn | fallbackResolveModuleGlobals | (private) | `function fallbackResolveModuleGlobals(scope) {` |
| 152 | fn | fallbackTryRequire | (private) | `function fallbackTryRequire(modulePath) {` |
| 185 | fn | addCandidate | (private) | `function addCandidate(fn, scope) {` |
| 252 | fn | tryStructuredCloneValue | (private) | `function tryStructuredCloneValue(value) {` |
| 286 | fn | resolveModuleRegistry | (private) | `function resolveModuleRegistry(scope) {` |
| 443 | fn | isNodeProcessReference | (private) | `function isNodeProcessReference(value) {` |
| 483 | fn | shouldBypassDeepFreeze | (private) | `function shouldBypassDeepFreeze(value) {` |
| 531 | fn | fallbackFreezeDeep | (private) | `function fallbackFreezeDeep(value, seen) {` |
| 606 | fn | fallbackSafeWarn | (private) | `function fallbackSafeWarn(message, detail) {` |
| 688 | fn | informModuleGlobals | (private) | `function informModuleGlobals(name, api) {` |
| 718 | fn | createLevelCounters | (private) | `function createLevelCounters() {` |
| 726 | fn | resetLevelCounters | (private) | `function resetLevelCounters(counters) {` |
| 735 | fn | resolveLevelKey | (private) | `function resolveLevelKey(level) {` |
| 747 | fn | getCounterValue | (private) | `function getCounterValue(counters, key) {` |
| 754 | fn | applyLevelCounterDelta | (private) | `function applyLevelCounterDelta(counters, level...` |
| 766 | fn | applyLevelCounterDeltaForEntries | (private) | `function applyLevelCounterDeltaForEntries(count...` |
| 779 | fn | summariseEntriesByLevel | (private) | `function summariseEntriesByLevel(entries) {` |
| 784 | fn | accumulateLevelSummary | (private) | `function accumulateLevelSummary(target, summary) {` |
| 797 | fn | cloneLevelSummary | (private) | `function cloneLevelSummary(summary) {` |
| 802 | fn | freezeLevelSummary | (private) | `function freezeLevelSummary(summary) {` |
| 829 | fn | cloneDefaultConfig | (private) | `function cloneDefaultConfig() {` |
| 865 | fn | normalizeLevel | (private) | `function normalizeLevel(value, fallbackLevel) {` |
| 890 | fn | getLevelPriority | (private) | `function getLevelPriority(level) {` |
| 895 | fn | booleanFromValue | (private) | `function booleanFromValue(value, fallback) {` |
| 922 | fn | clampHistoryLimit | (private) | `function clampHistoryLimit(value, options) {` |
| 940 | fn | coerceMessage | (private) | `function coerceMessage(value) {` |
| 969 | fn | sanitizeForLog | (private) | `function sanitizeForLog(value, depth, seen) {` |
| 1302 | fn | normaliseStackTrace | (private) | `function normaliseStackTrace(stackValue) {` |
| 1335 | fn | normaliseOriginSnapshot | (private) | `function normaliseOriginSnapshot(origin) {` |
| 1379 | fn | getSessionStorage | (private) | `function getSessionStorage() {` |
| 1397 | fn | clearStoredHistory | (private) | `function clearStoredHistory() {` |
| 1408 | fn | persistConfigSafe | (private) | `function persistConfigSafe() {` |
| 1436 | fn | persistHistorySafe | (private) | `function persistHistorySafe() {` |
| 1460 | fn | getEffectiveHistoryLimit | (private) | `function getEffectiveHistoryLimit() {` |
| 1464 | fn | recordHistoryDrop | (private) | `function recordHistoryDrop(removedEntries, limi...` |
| 1515 | fn | enforceHistoryLimit | (private) | `function enforceHistoryLimit(options) {` |
| 1529 | fn | shouldRecord | (private) | `function shouldRecord(level) {` |
| 1532 | fn | shouldOutputToConsole | (private) | `function shouldOutputToConsole(level) {` |
| 1538 | fn | _getLevelState | (private) | `function _getLevelState(level) {` |
| 1553 | fn | _isLevelEnabled | (private) | `function _isLevelEnabled(level, options) {` |
| 1580 | fn | createEntryId | (private) | `function createEntryId(timestamp) {` |
| 1583 | fn | pushEntryToHistory | (private) | `function pushEntryToHistory(entry) {` |
| 1595 | fn | appendEntry | (private) | `function appendEntry(entry) {` |
| 1604 | fn | notifyLogSubscribers | (private) | `function notifyLogSubscribers(entry) {` |
| 1621 | fn | getHistorySnapshot | (private) | `function getHistorySnapshot(limit) {` |
| 1630 | fn | notifyConfigSubscribers | (private) | `function notifyConfigSubscribers(snapshot) {` |
| 1647 | fn | arrayFromArrayLike | (private) | `function arrayFromArrayLike(value) {` |
| 1658 | fn | safeArrayPush | (private) | `function safeArrayPush(target, value) {` |
| 1673 | fn | getConsoleLevelForMethod | (private) | `function getConsoleLevelForMethod(method) {` |
| 1685 | fn | getStoredConsoleFunction | (private) | `function getStoredConsoleFunction(method) {` |
| 1731 | fn | invokeConsoleMethod | (private) | `function invokeConsoleMethod(method, args) {` |
| 1750 | fn | recordConsoleMessage | (private) | `function recordConsoleMessage(method, args, met...` |
| 1943 | fn | installConsoleProxies | (private) | `function installConsoleProxies() {` |
| 2051 | fn | removeConsoleProxies | (private) | `function removeConsoleProxies() {` |
| 2093 | fn | syncConsoleCaptureState | (private) | `function syncConsoleCaptureState() {` |
| 2155 | fn | isConsoleCaptureActive | (private) | `function isConsoleCaptureActive() {` |
| 2158 | fn | buildConsoleCaptureDetail | (private) | `function buildConsoleCaptureDetail(overrides) {` |
| 2177 | fn | enableConsoleCapture | (private) | `function enableConsoleCapture(options) {` |
| 2184 | fn | disableConsoleCapture | (private) | `function disableConsoleCapture(options) {` |
| 2191 | fn | shouldCaptureOrigin | (private) | `function shouldCaptureOrigin(level, detail, con...` |
| 2207 | fn | captureLogOrigin | (private) | `function captureLogOrigin(level, message, detai...` |
| 2248 | fn | logInternal | (private) | `function logInternal(level, message, detail, co...` |
| 2308 | fn | debug | (private) | `function debug(message, detail, context) {` |
| 2311 | fn | info | (private) | `function info(message, detail, context) {` |
| 2314 | fn | warn | (private) | `function warn(message, detail, context) {` |
| 2317 | fn | error | (private) | `function error(message, detail, context) {` |
| 2320 | fn | getConfigSnapshot | (private) | `function getConfigSnapshot() {` |
| 2332 | fn | getHistory | (private) | `function getHistory(options) {` |
| 2336 | fn | cloneLastDropSnapshot | (private) | `function cloneLastDropSnapshot() {` |
| 2355 | fn | getStats | (private) | `function getStats() {` |
| 2375 | fn | clearHistory | (private) | `function clearHistory(options) {` |
| 2383 | fn | subscribe | (private) | `function subscribe(listener) {` |
| 2395 | fn | subscribeConfig | (private) | `function subscribeConfig(listener) {` |
| 2407 | fn | mergeMeta | (private) | `function mergeMeta(baseMeta, meta) {` |
| 2433 | fn | createLogger | (private) | `function createLogger(namespace, options) {` |
| 2436 | fn | logWithNamespace | (private) | `function logWithNamespace(level, message, detai...` |
| 2469 | fn | markEventHandled | (private) | `function markEventHandled(event) {` |
| 2497 | fn | handleGlobalError | (private) | `function handleGlobalError(event) {` |
| 2518 | fn | handleUnhandledRejection | (private) | `function handleUnhandledRejection(event) {` |
| 2538 | fn | markTargetAttached | (private) | `function markTargetAttached(target) {` |
| 2557 | fn | attachGlobalErrorListeners | (private) | `function attachGlobalErrorListeners() {` |
| 2582 | fn | applyConfig | (private) | `function applyConfig(overrides) {` |
| 2667 | fn | setConfig | (private) | `function setConfig(overrides, options) {` |
| 2694 | fn | resolveConfigPresetFromScopes | (private) | `function resolveConfigPresetFromScopes() {` |
| 2718 | fn | applyConfigFromStorage | (private) | `function applyConfigFromStorage() {` |
| 2740 | fn | applyConfigFromQuery | (private) | `function applyConfigFromQuery() {` |
| 2764 | fn | assignUpdate | (private) | `function assignUpdate(key, value) {` |
| 2827 | fn | normaliseStoredEntry | (private) | `function normaliseStoredEntry(entry) {` |
| 2859 | fn | getGlobalNavigator | (private) | `function getGlobalNavigator() {` |
| 2871 | fn | getNavigatorServiceWorker | (private) | `function getNavigatorServiceWorker() {` |
| 2881 | fn | markServiceWorkerEntrySeen | (private) | `function markServiceWorkerEntrySeen(id) {` |
| 2901 | fn | mergeServiceWorkerEntryMeta | (private) | `function mergeServiceWorkerEntryMeta(entry, sna...` |
| 2940 | fn | importServiceWorkerLogEntries | (private) | `function importServiceWorkerLogEntries(entries,...` |
| 2972 | fn | finalizeServiceWorkerLogRequest | (private) | `function finalizeServiceWorkerLogRequest(reques...` |
| 2990 | fn | scheduleServiceWorkerLogPoll | (private) | `function scheduleServiceWorkerLogPoll() {` |
| 3006 | fn | ensureServiceWorkerBroadcastChannel | (private) | `function ensureServiceWorkerBroadcastChannel() {` |
| 3036 | fn | handleServiceWorkerLogMessage | (private) | `function handleServiceWorkerLogMessage(event) {` |
| 3072 | fn | requestServiceWorkerLogSnapshot | (private) | `function requestServiceWorkerLogSnapshot(reason) {` |
| 3225 | fn | setupServiceWorkerLogBridge | (private) | `function setupServiceWorkerLogBridge() {` |
| 3254 | fn | loadPersistedHistory | (private) | `function loadPersistedHistory() {` |
| 3290 | fn | initialiseConfig | (private) | `function initialiseConfig() {` |

